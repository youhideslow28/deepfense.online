import admin from 'firebase-admin';

const args = new Map(
  process.argv
    .slice(2)
    .map((arg) => {
      const [key, ...valueParts] = arg.replace(/^--/, '').split('=');
      return [key, valueParts.join('=') || 'true'];
    }),
);

const email = String(args.get('email') || '').trim().toLowerCase();
const amount = Number(args.get('amount') || 0);
const reason = String(args.get('reason') || 'Manual admin DPF grant');
const grantId = String(args.get('grant-id') || `${email}:admin_bonus:${amount}:manual-2026-05-13`);

if (!email || !email.includes('@')) {
  throw new Error('Missing --email=user@example.com');
}

if (!Number.isFinite(amount) || amount <= 0 || amount > 1_000_000) {
  throw new Error('Missing or invalid --amount. Amount must be between 1 and 1,000,000 DPF.');
}

function getServiceAccount() {
  if (process.env.FIREBASE_SERVICE_ACCOUNT_JSON) {
    return JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_JSON);
  }

  if (process.env.FIREBASE_SERVICE_ACCOUNT_BASE64) {
    return JSON.parse(Buffer.from(process.env.FIREBASE_SERVICE_ACCOUNT_BASE64, 'base64').toString('utf8'));
  }

  throw new Error('Missing FIREBASE_SERVICE_ACCOUNT_JSON or FIREBASE_SERVICE_ACCOUNT_BASE64.');
}

function safeId(value) {
  return String(value).replace(/[^a-zA-Z0-9_-]/g, '_').slice(0, 180);
}

function numberOrZero(value) {
  return typeof value === 'number' && Number.isFinite(value) ? value : 0;
}

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(getServiceAccount()),
  });
}

const auth = admin.auth();
const db = admin.firestore();
const user = await auth.getUserByEmail(email);
const userRef = db.collection('users').doc(user.uid);
const ledgerRef = db.collection('dpf_ledger').doc(safeId(grantId));
const now = admin.firestore.FieldValue.serverTimestamp();

const result = await db.runTransaction(async (transaction) => {
  const [userSnap, ledgerSnap] = await Promise.all([
    transaction.get(userRef),
    transaction.get(ledgerRef),
  ]);

  if (ledgerSnap.exists) {
    return {
      granted: false,
      message: 'Grant already exists. Balance was not changed.',
      ledgerId: ledgerRef.id,
    };
  }

  const data = userSnap.exists ? userSnap.data() : {};
  const balanceBefore = numberOrZero(data.webBalance);
  const balanceAfter = balanceBefore + amount;

  transaction.set(userRef, {
    uid: user.uid,
    email: user.email || email,
    displayName: user.displayName || '',
    photoURL: user.photoURL || '',
    webBalance: balanceAfter,
    bonusBalance: numberOrZero(data.bonusBalance) + amount,
    updatedAt: now,
    createdAt: userSnap.exists ? data.createdAt : now,
  }, { merge: true });

  transaction.set(ledgerRef, {
    uid: user.uid,
    direction: 'credit',
    source: 'admin_bonus',
    amount,
    balanceBefore,
    balanceAfter,
    status: 'confirmed',
    reason,
    metadata: {
      email,
      grantId,
      grantedBy: 'manual_script',
    },
    idempotencyKey: grantId,
    createdAt: now,
    confirmedAt: now,
  });

  return {
    granted: true,
    message: `Granted ${amount} DPF to ${email}.`,
    ledgerId: ledgerRef.id,
    balanceBefore,
    balanceAfter,
  };
});

console.log(JSON.stringify(result, null, 2));
