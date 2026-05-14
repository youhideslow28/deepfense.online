import admin from 'firebase-admin';

const rateLimitMap = new Map();
const RATE_LIMIT_WINDOW_MS = 60_000;
const RATE_LIMIT_MAX_REQUESTS = 30;
const DPF_SEASON = 'genesis-2026';
const MAX_REWARD_AMOUNT = 250;
const MAX_UNLOCK_COST = 2_000;
const MAX_ADMIN_GRANT_AMOUNT = 1_000_000;

function getFirebaseAdmin() {
  if (admin.apps.length) return admin.app();

  const encodedServiceAccount = process.env.FIREBASE_SERVICE_ACCOUNT_BASE64;
  const rawServiceAccount = process.env.FIREBASE_SERVICE_ACCOUNT_JSON;

  if (!encodedServiceAccount && !rawServiceAccount) {
    throw new Error('Missing Firebase Admin service account env.');
  }

  const serviceAccount = JSON.parse(
    rawServiceAccount || Buffer.from(encodedServiceAccount, 'base64').toString('utf8'),
  );

  return admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
}

const toSafeId = (value) => String(value).replace(/[^a-zA-Z0-9_-]/g, '_').slice(0, 180);

const todayKey = () => {
  const now = new Date();
  const yyyy = now.getFullYear();
  const mm = String(now.getMonth() + 1).padStart(2, '0');
  const dd = String(now.getDate()).padStart(2, '0');
  return `${yyyy}-${mm}-${dd}`;
};

const numberOrZero = (value) => (typeof value === 'number' && Number.isFinite(value) ? value : 0);

function withoutUndefined(value) {
  if (Array.isArray(value)) {
    return value.map((item) => withoutUndefined(item)).filter((item) => item !== undefined);
  }

  if (value && typeof value === 'object') {
    return Object.fromEntries(
      Object.entries(value)
        .filter(([, item]) => item !== undefined)
        .map(([key, item]) => [key, withoutUndefined(item)]),
    );
  }

  return value;
}

function isRateLimited(key) {
  const now = Date.now();
  const current = rateLimitMap.get(key) || [];
  const timestamps = current.filter((time) => now - time < RATE_LIMIT_WINDOW_MS);
  timestamps.push(now);
  rateLimitMap.set(key, timestamps);
  return timestamps.length > RATE_LIMIT_MAX_REQUESTS;
}

async function requireUser(req) {
  const authHeader = req.headers.authorization || '';
  const token = authHeader.startsWith('Bearer ') ? authHeader.slice(7) : '';

  if (!token) {
    const error = new Error('Missing auth token.');
    error.statusCode = 401;
    throw error;
  }

  getFirebaseAdmin();
  return admin.auth().verifyIdToken(token);
}

async function requireAdmin(user) {
  const adminEmails = new Set(
    String(process.env.DPF_ADMIN_EMAILS || 'deepfense@gmail.com')
      .split(',')
      .map((email) => email.trim().toLowerCase())
      .filter(Boolean),
  );

  if (user.admin === true || adminEmails.has(String(user.email || '').toLowerCase())) {
    return;
  }

  const profile = await admin.firestore().collection('users').doc(user.uid).get();
  const role = profile.exists ? profile.data()?.role : '';
  if (role === 'admin') return;

  const error = new Error('Admin permission required.');
  error.statusCode = 403;
  throw error;
}

async function resolveTargetUser(target) {
  const value = String(target || '').trim();
  if (!value) {
    const error = new Error('Missing target user.');
    error.statusCode = 400;
    throw error;
  }

  if (value.includes('@')) {
    return admin.auth().getUserByEmail(value.toLowerCase());
  }

  return admin.auth().getUser(value);
}

async function adminGrant(uid, adminUser, payload) {
  await requireAdmin(adminUser);

  const amount = Number(payload.amount);
  if (!Number.isFinite(amount) || amount <= 0 || amount > MAX_ADMIN_GRANT_AMOUNT) {
    return { ok: false, code: 'invalid_amount', message: 'Invalid admin DPF coin grant amount.' };
  }

  const targetUser = await resolveTargetUser(payload.target);
  const reason = String(payload.reason || 'Admin bonus DPF coin').trim() || 'Admin bonus DPF coin';
  const grantId = String(payload.grantId || `${targetUser.uid}:admin_bonus:${amount}:${Date.now()}`);
  const ledgerId = toSafeId(grantId);
  const db = admin.firestore();
  const now = admin.firestore.FieldValue.serverTimestamp();
  const userRef = db.collection('users').doc(targetUser.uid);
  const ledgerRef = db.collection('dpf_ledger').doc(ledgerId);
  const activityRef = db.collection('activity_logs').doc();

  return db.runTransaction(async (transaction) => {
    const [userSnap, ledgerSnap] = await Promise.all([
      transaction.get(userRef),
      transaction.get(ledgerRef),
    ]);

    if (ledgerSnap.exists) {
      const data = ledgerSnap.data() || {};
      return {
        ok: true,
        amount: numberOrZero(data.amount),
        balanceAfter: numberOrZero(data.balanceAfter),
        ledgerId,
        alreadyGranted: true,
      };
    }

    const userData = userSnap.exists ? userSnap.data() : {};
    const balanceBefore = numberOrZero(userData.webBalance);
    const balanceAfter = balanceBefore + amount;

    const userUpdate = {
      uid: targetUser.uid,
      email: targetUser.email || String(payload.target || '').toLowerCase(),
      displayName: targetUser.displayName || userData.displayName || targetUser.email || targetUser.uid,
      photoURL: targetUser.photoURL || userData.photoURL || '',
      role: userData.role || 'user',
      status: userData.status || 'active',
      webBalance: balanceAfter,
      bonusBalance: numberOrZero(userData.bonusBalance) + amount,
      updatedAt: now,
      createdAt: userSnap.exists && userData.createdAt ? userData.createdAt : now,
    };

    transaction.set(userRef, userUpdate, { merge: true });

    transaction.set(ledgerRef, {
      uid: targetUser.uid,
      direction: 'credit',
      source: 'admin_bonus',
      amount,
      balanceBefore,
      balanceAfter,
      status: 'confirmed',
      reason,
      metadata: withoutUndefined({
        targetEmail: targetUser.email || '',
        grantedBy: adminUser.email || adminUser.uid,
      }),
      idempotencyKey: grantId,
      createdAt: now,
      confirmedAt: now,
    });

    transaction.set(activityRef, {
      actorId: adminUser.uid,
      actorEmail: adminUser.email || '',
      actorRole: 'admin',
      action: 'admin.dpf_coin_granted',
      targetType: 'users',
      targetId: targetUser.uid,
      severity: amount >= 1000 ? 'warning' : 'notice',
      metadata: withoutUndefined({
        amount,
        reason,
        target: targetUser.email || targetUser.uid,
        ledgerId,
      }),
      createdAt: now,
    });

    return { ok: true, amount, balanceAfter, ledgerId, alreadyGranted: false };
  });
}

async function claimReward(uid, userProfile, payload) {
  const { source, activityId, amount, reason, dailyLimit, minScore, score, metadata = {} } = payload;
  const allowedSources = new Set(['challenge', 'simulator', 'course', 'certificate']);

  if (!allowedSources.has(source)) {
    return { ok: false, code: 'invalid_source', message: 'Invalid reward source.' };
  }

  if (!Number.isFinite(amount) || amount <= 0 || amount > MAX_REWARD_AMOUNT) {
    return { ok: false, code: 'invalid_amount', message: 'Invalid DPF reward amount.' };
  }

  if (!Number.isFinite(dailyLimit) || dailyLimit <= 0 || dailyLimit > 10) {
    return { ok: false, code: 'invalid_quota', message: 'Invalid DPF quota.' };
  }

  if (typeof minScore === 'number' && typeof score === 'number' && score < minScore) {
    return { ok: false, code: 'not_eligible', message: 'Score is not high enough for this DPF reward.' };
  }

  const db = admin.firestore();
  const day = todayKey();
  const safeActivityId = toSafeId(activityId);
  const idempotencyKey = `${uid}:${source}:${safeActivityId}:${DPF_SEASON}`;
  const ledgerId = toSafeId(idempotencyKey);
  const quotaId = toSafeId(`${uid}:${source}:${day}`);
  const userRef = db.collection('users').doc(uid);
  const ledgerRef = db.collection('dpf_ledger').doc(ledgerId);
  const quotaRef = db.collection('dpf_daily_quotas').doc(quotaId);

  return db.runTransaction(async (transaction) => {
    const [userSnap, ledgerSnap, quotaSnap] = await Promise.all([
      transaction.get(userRef),
      transaction.get(ledgerRef),
      transaction.get(quotaRef),
    ]);

    if (ledgerSnap.exists) {
      return { ok: false, code: 'already_claimed', message: 'This DPF reward was already claimed.' };
    }

    const quotaCount = quotaSnap.exists ? numberOrZero(quotaSnap.data().count) : 0;
    if (quotaCount >= dailyLimit) {
      return { ok: false, code: 'quota_exceeded', message: 'Daily DPF reward limit reached. Practice still counts, rewards resume tomorrow.' };
    }

    const userData = userSnap.exists ? userSnap.data() : {};
    const balanceBefore = numberOrZero(userData.webBalance);
    const balanceAfter = balanceBefore + amount;
    const now = admin.firestore.FieldValue.serverTimestamp();

    transaction.set(userRef, {
      uid,
      email: userProfile.email || '',
      displayName: userProfile.name || '',
      photoURL: userProfile.picture || '',
      webBalance: balanceAfter,
      earnedBalance: numberOrZero(userData.earnedBalance) + amount,
      updatedAt: now,
      createdAt: userSnap.exists && userData.createdAt ? userData.createdAt : now,
    }, { merge: true });

    transaction.set(ledgerRef, {
      uid,
      direction: 'credit',
      source,
      amount,
      balanceBefore,
      balanceAfter,
      status: 'confirmed',
      reason,
      activityId,
      metadata: withoutUndefined({ season: DPF_SEASON, day, score: score ?? null, ...metadata }),
      idempotencyKey,
      createdAt: now,
      confirmedAt: now,
    });

    transaction.set(quotaRef, {
      uid,
      source,
      day,
      count: admin.firestore.FieldValue.increment(1),
      amount: admin.firestore.FieldValue.increment(amount),
      updatedAt: now,
    }, { merge: true });

    return { ok: true, amount, balanceAfter, ledgerId };
  });
}

async function unlockItem(uid, userProfile, payload) {
  const { itemId, itemType, title, cost } = payload;
  const allowedTypes = new Set(['course', 'lab', 'case_study', 'certificate_upgrade']);

  if (!allowedTypes.has(itemType)) {
    return { ok: false, code: 'invalid_item', message: 'Invalid unlock item.' };
  }

  if (!Number.isFinite(cost) || cost <= 0 || cost > MAX_UNLOCK_COST) {
    return { ok: false, code: 'invalid_cost', message: 'Invalid DPF unlock cost.' };
  }

  const db = admin.firestore();
  const safeItemId = toSafeId(itemId);
  const ledgerId = toSafeId(`${uid}:unlock:${safeItemId}`);
  const unlockId = toSafeId(`${uid}:${safeItemId}`);
  const userRef = db.collection('users').doc(uid);
  const ledgerRef = db.collection('dpf_ledger').doc(ledgerId);
  const unlockRef = db.collection('unlocks').doc(unlockId);

  return db.runTransaction(async (transaction) => {
    const [userSnap, unlockSnap] = await Promise.all([
      transaction.get(userRef),
      transaction.get(unlockRef),
    ]);

    if (unlockSnap.exists) {
      return { ok: false, code: 'already_unlocked', message: 'This item is already unlocked.' };
    }

    const userData = userSnap.exists ? userSnap.data() : {};
    const balanceBefore = numberOrZero(userData.webBalance);
    if (balanceBefore < cost) {
      return { ok: false, code: 'insufficient_balance', message: 'Not enough DPF. Complete challenges or scam simulations to earn more.' };
    }

    const balanceAfter = balanceBefore - cost;
    const unlockedItems = Array.isArray(userData.unlockedItems) ? userData.unlockedItems : [];
    const now = admin.firestore.FieldValue.serverTimestamp();

    transaction.set(userRef, {
      uid,
      email: userProfile.email || '',
      displayName: userProfile.name || '',
      photoURL: userProfile.picture || '',
      webBalance: balanceAfter,
      spentBalance: numberOrZero(userData.spentBalance) + cost,
      unlockedItems: [...new Set([...unlockedItems, itemId])],
      updatedAt: now,
    }, { merge: true });

    transaction.set(ledgerRef, {
      uid,
      direction: 'debit',
      source: 'unlock',
      amount: cost,
      balanceBefore,
      balanceAfter,
      status: 'confirmed',
      reason: `Unlock ${title}`,
      itemId,
      metadata: withoutUndefined({ itemType, title, season: DPF_SEASON }),
      idempotencyKey: `${uid}:unlock:${safeItemId}`,
      createdAt: now,
      confirmedAt: now,
    });

    transaction.set(unlockRef, {
      uid,
      itemId,
      itemType,
      title,
      cost,
      ledgerId,
      unlockedAt: now,
    });

    return { ok: true, cost, balanceAfter, ledgerId };
  });
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ ok: false, message: 'Method not allowed.' });
  }

  try {
    const user = await requireUser(req);
    const action = req.body?.action;
    const rateKey = `${user.uid}:${action || 'unknown'}`;

    if (isRateLimited(rateKey)) {
      return res.status(429).json({ ok: false, code: 'rate_limited', message: 'Too many DPF requests. Try again later.' });
    }

    if (action === 'claimReward') {
      const result = await claimReward(user.uid, user, req.body?.payload || {});
      return res.status(result.ok ? 200 : 400).json(result);
    }

    if (action === 'adminGrant') {
      const result = await adminGrant(user.uid, user, req.body?.payload || {});
      return res.status(result.ok ? 200 : 400).json(result);
    }

    if (action === 'unlockItem') {
      const result = await unlockItem(user.uid, user, req.body?.payload || {});
      return res.status(result.ok ? 200 : 400).json(result);
    }

    return res.status(400).json({ ok: false, code: 'invalid_action', message: 'Invalid DPF action.' });
  } catch (error) {
    console.error('DPF API error:', error);
    const message = String(error?.message || '');
    const isConfigError = message.includes('Missing Firebase Admin service account env');
    const isAdminError = error.statusCode === 403;
    const isInputError = error.statusCode === 400;

    return res.status(error.statusCode || 500).json({
      ok: false,
      code: error.statusCode === 401
        ? 'auth_required'
        : isConfigError
          ? 'server_not_configured'
          : isAdminError
            ? 'admin_required'
            : isInputError
              ? 'invalid_request'
              : 'server_error',
      message: error.statusCode === 401
        ? 'Sign in with Gmail to use DPF.'
        : isConfigError
          ? 'DPF backend is missing FIREBASE_SERVICE_ACCOUNT_BASE64 or FIREBASE_SERVICE_ACCOUNT_JSON.'
          : isAdminError
            ? 'This account is not allowed to grant DPF coin. Check DPF_ADMIN_EMAILS.'
            : isInputError
              ? message
              : 'DPF server error. Check Vercel Function logs for /api/dpf.',
    });
  }
}
