import { auth, db } from '@/config/firebase';
import type { User } from 'firebase/auth';
import {
  collection,
  doc,
  getDoc,
  increment,
  limit,
  onSnapshot,
  orderBy,
  query,
  runTransaction,
  serverTimestamp,
  setDoc,
  Timestamp,
  where,
} from 'firebase/firestore';

export type DpfLedgerSource =
  | 'challenge'
  | 'simulator'
  | 'course'
  | 'certificate'
  | 'admin_bonus'
  | 'unlock'
  | 'withdrawal'
  | 'sync';

export type DpfLedgerEntry = {
  id: string;
  uid: string;
  direction: 'credit' | 'debit';
  source: DpfLedgerSource;
  amount: number;
  balanceBefore: number;
  balanceAfter: number;
  status: 'pending' | 'confirmed' | 'failed' | 'cancelled';
  reason: string;
  activityId?: string;
  itemId?: string;
  metadata?: Record<string, unknown>;
  idempotencyKey: string;
  createdAt?: Timestamp;
  confirmedAt?: Timestamp;
};

export type DpfWallet = {
  uid: string;
  email: string;
  displayName: string;
  photoURL: string;
  webBalance: number;
  earnedBalance: number;
  bonusBalance: number;
  spentBalance: number;
  pendingWithdrawal: number;
  withdrawnBalance: number;
  onchainSyncedBalance: number;
  badges: string[];
  unlockedItems: string[];
};

export type DpfClaimConfig = {
  source: Extract<DpfLedgerSource, 'challenge' | 'simulator' | 'course' | 'certificate'>;
  activityId: string;
  amount: number;
  reason: string;
  dailyLimit: number;
  minScore?: number;
  score?: number;
  metadata?: Record<string, unknown>;
};

export type DpfClaimResult =
  | { ok: true; amount: number; balanceAfter: number; ledgerId: string }
  | { ok: false; code: 'auth_required' | 'not_eligible' | 'already_claimed' | 'quota_exceeded' | 'invalid_amount' | 'firebase_error'; message: string };

export type DpfUnlockResult =
  | { ok: true; cost: number; balanceAfter: number; ledgerId: string }
  | { ok: false; code: 'auth_required' | 'already_unlocked' | 'insufficient_balance' | 'invalid_cost' | 'firebase_error'; message: string };

const DPF_SEASON = 'genesis-2026';
const MAX_REWARD_AMOUNT = 250;
const MAX_UNLOCK_COST = 2_000;
const USE_SERVER_DPF = import.meta.env.VITE_DPF_USE_SERVER_REWARDS === 'true';

const toSafeId = (value: string) => value.replace(/[^a-zA-Z0-9_-]/g, '_').slice(0, 180);

const todayKey = () => {
  const now = new Date();
  const yyyy = now.getFullYear();
  const mm = String(now.getMonth() + 1).padStart(2, '0');
  const dd = String(now.getDate()).padStart(2, '0');
  return `${yyyy}-${mm}-${dd}`;
};

const numberOrZero = (value: unknown) => (typeof value === 'number' && Number.isFinite(value) ? value : 0);

export const getCurrentUser = () => auth.currentUser;

const postDpfAction = async <T>(action: string, payload: unknown): Promise<T | null> => {
  const user = auth.currentUser;
  if (!user || !USE_SERVER_DPF) return null;

  const token = await user.getIdToken();
  const response = await fetch('/api/dpf', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ action, payload }),
  });

  const data = await response.json();
  return data as T;
};

export const ensureDpfWallet = async (user: User) => {
  const userRef = doc(db, 'users', user.uid);
  const snapshot = await getDoc(userRef);
  const data = snapshot.exists() ? snapshot.data() : {};

  const defaults: Partial<DpfWallet> & {
    updatedAt: ReturnType<typeof serverTimestamp>;
    createdAt?: ReturnType<typeof serverTimestamp>;
  } = {
    uid: user.uid,
    email: user.email || '',
    displayName: user.displayName || '',
    photoURL: user.photoURL || '',
    updatedAt: serverTimestamp(),
  };

  if (!snapshot.exists()) defaults.createdAt = serverTimestamp();
  if (typeof data.webBalance !== 'number') defaults.webBalance = 0;
  if (typeof data.earnedBalance !== 'number') defaults.earnedBalance = 0;
  if (typeof data.bonusBalance !== 'number') defaults.bonusBalance = 0;
  if (typeof data.spentBalance !== 'number') defaults.spentBalance = 0;
  if (typeof data.pendingWithdrawal !== 'number') defaults.pendingWithdrawal = 0;
  if (typeof data.withdrawnBalance !== 'number') defaults.withdrawnBalance = 0;
  if (typeof data.onchainSyncedBalance !== 'number') defaults.onchainSyncedBalance = 0;
  if (!Array.isArray(data.badges)) defaults.badges = [];
  if (!Array.isArray(data.unlockedItems)) defaults.unlockedItems = [];

  await setDoc(userRef, defaults, { merge: true });
};

export const listenDpfWallet = (user: User, onChange: (wallet: DpfWallet | null) => void, onError?: (error: Error) => void) => {
  void ensureDpfWallet(user).catch((error) => onError?.(error as Error));
  return onSnapshot(doc(db, 'users', user.uid), (snapshot) => {
    if (!snapshot.exists()) {
      onChange(null);
      return;
    }
    const data = snapshot.data();
    onChange({
      uid: user.uid,
      email: String(data.email || user.email || ''),
      displayName: String(data.displayName || user.displayName || ''),
      photoURL: String(data.photoURL || user.photoURL || ''),
      webBalance: numberOrZero(data.webBalance),
      earnedBalance: numberOrZero(data.earnedBalance),
      bonusBalance: numberOrZero(data.bonusBalance),
      spentBalance: numberOrZero(data.spentBalance),
      pendingWithdrawal: numberOrZero(data.pendingWithdrawal),
      withdrawnBalance: numberOrZero(data.withdrawnBalance),
      onchainSyncedBalance: numberOrZero(data.onchainSyncedBalance),
      badges: Array.isArray(data.badges) ? data.badges : [],
      unlockedItems: Array.isArray(data.unlockedItems) ? data.unlockedItems : [],
    });
  }, (error) => onError?.(error));
};

export const listenDpfLedger = (user: User, onChange: (entries: DpfLedgerEntry[]) => void, onError?: (error: Error) => void) => {
  const ledgerQuery = query(
    collection(db, 'dpf_ledger'),
    where('uid', '==', user.uid),
    orderBy('createdAt', 'desc'),
    limit(8),
  );

  return onSnapshot(ledgerQuery, (snapshot) => {
    onChange(snapshot.docs.map((entry) => ({
      id: entry.id,
      ...(entry.data() as Omit<DpfLedgerEntry, 'id'>),
    })));
  }, (error) => onError?.(error));
};

export const claimDpfReward = async (config: DpfClaimConfig): Promise<DpfClaimResult> => {
  const user = auth.currentUser;
  if (!user) {
    return { ok: false, code: 'auth_required', message: 'Sign in with Gmail to receive DPF coin.' };
  }

  try {
    const serverResult = await postDpfAction<DpfClaimResult>('claimReward', config);
    if (serverResult) return serverResult;
  } catch (error) {
    console.error('DPF server reward failed, falling back to client transaction:', error);
  }

  if (!Number.isFinite(config.amount) || config.amount <= 0 || config.amount > MAX_REWARD_AMOUNT) {
    return { ok: false, code: 'invalid_amount', message: 'Invalid DPF coin reward amount.' };
  }

  if (typeof config.minScore === 'number' && typeof config.score === 'number' && config.score < config.minScore) {
    return { ok: false, code: 'not_eligible', message: 'Score is not high enough for this DPF coin reward.' };
  }

  const day = todayKey();
  const safeActivityId = toSafeId(config.activityId);
  const idempotencyKey = `${user.uid}:${config.source}:${safeActivityId}:${DPF_SEASON}`;
  const ledgerId = toSafeId(idempotencyKey);
  const quotaId = toSafeId(`${user.uid}:${config.source}:${day}`);
  const userRef = doc(db, 'users', user.uid);
  const ledgerRef = doc(db, 'dpf_ledger', ledgerId);
  const quotaRef = doc(db, 'dpf_daily_quotas', quotaId);

  try {
    return await runTransaction(db, async (transaction): Promise<DpfClaimResult> => {
      const [userSnap, ledgerSnap, quotaSnap] = await Promise.all([
        transaction.get(userRef),
        transaction.get(ledgerRef),
        transaction.get(quotaRef),
      ]);

      if (ledgerSnap.exists()) {
        return { ok: false, code: 'already_claimed', message: 'This DPF coin reward was already claimed.' };
      }

      const quotaCount = quotaSnap.exists() ? numberOrZero(quotaSnap.data().count) : 0;
      if (quotaCount >= config.dailyLimit) {
        return { ok: false, code: 'quota_exceeded', message: 'Daily DPF coin reward limit reached. Practice still counts, rewards resume tomorrow.' };
      }

      const userData = userSnap.exists() ? userSnap.data() : {};
      const balanceBefore = numberOrZero(userData.webBalance);
      const balanceAfter = balanceBefore + config.amount;

      transaction.set(userRef, {
        uid: user.uid,
        email: user.email || '',
        displayName: user.displayName || '',
        photoURL: user.photoURL || '',
        webBalance: balanceAfter,
        earnedBalance: numberOrZero(userData.earnedBalance) + config.amount,
        updatedAt: serverTimestamp(),
        createdAt: userSnap.exists() && userData.createdAt ? userData.createdAt : serverTimestamp(),
      }, { merge: true });

      transaction.set(ledgerRef, {
        uid: user.uid,
        direction: 'credit',
        source: config.source,
        amount: config.amount,
        balanceBefore,
        balanceAfter,
        status: 'confirmed',
        reason: config.reason,
        activityId: config.activityId,
        metadata: {
          season: DPF_SEASON,
          day,
          score: config.score ?? null,
          ...config.metadata,
        },
        idempotencyKey,
        createdAt: serverTimestamp(),
        confirmedAt: serverTimestamp(),
      });

      transaction.set(quotaRef, {
        uid: user.uid,
        source: config.source,
        day,
        count: increment(1),
        amount: increment(config.amount),
        updatedAt: serverTimestamp(),
      }, { merge: true });

      return { ok: true, amount: config.amount, balanceAfter, ledgerId };
    });
  } catch (error) {
    console.error('DPF reward claim failed:', error);
    return { ok: false, code: 'firebase_error', message: 'Unable to claim DPF coin right now.' };
  }
};

export const unlockWithDpf = async (item: {
  itemId: string;
  itemType: 'course' | 'lab' | 'case_study' | 'certificate_upgrade';
  cost: number;
  title: string;
}): Promise<DpfUnlockResult> => {
  const user = auth.currentUser;
  if (!user) {
    return { ok: false, code: 'auth_required', message: 'Sign in with Gmail to unlock this item.' };
  }

  try {
    const serverResult = await postDpfAction<DpfUnlockResult>('unlockItem', item);
    if (serverResult) return serverResult;
  } catch (error) {
    console.error('DPF server unlock failed, falling back to client transaction:', error);
  }

  if (!Number.isFinite(item.cost) || item.cost <= 0 || item.cost > MAX_UNLOCK_COST) {
    return { ok: false, code: 'invalid_cost', message: 'Invalid DPF coin unlock cost.' };
  }

  const safeItemId = toSafeId(item.itemId);
  const ledgerId = toSafeId(`${user.uid}:unlock:${safeItemId}`);
  const unlockId = toSafeId(`${user.uid}:${safeItemId}`);
  const userRef = doc(db, 'users', user.uid);
  const ledgerRef = doc(db, 'dpf_ledger', ledgerId);
  const unlockRef = doc(db, 'unlocks', unlockId);

  try {
    return await runTransaction(db, async (transaction): Promise<DpfUnlockResult> => {
      const [userSnap, unlockSnap] = await Promise.all([
        transaction.get(userRef),
        transaction.get(unlockRef),
      ]);

      if (unlockSnap.exists()) {
        const balance = userSnap.exists() ? numberOrZero(userSnap.data().webBalance) : 0;
        return { ok: false, code: 'already_unlocked', message: 'This item is already unlocked.', };
      }

      const userData = userSnap.exists() ? userSnap.data() : {};
      const balanceBefore = numberOrZero(userData.webBalance);
      if (balanceBefore < item.cost) {
        return { ok: false, code: 'insufficient_balance', message: 'Not enough DPF coin. Complete challenges or scam simulations to earn more.' };
      }

      const balanceAfter = balanceBefore - item.cost;
      const unlockedItems = Array.isArray(userData.unlockedItems) ? userData.unlockedItems : [];

      transaction.set(userRef, {
        uid: user.uid,
        email: user.email || '',
        displayName: user.displayName || '',
        photoURL: user.photoURL || '',
        webBalance: balanceAfter,
        spentBalance: numberOrZero(userData.spentBalance) + item.cost,
        unlockedItems: [...new Set([...unlockedItems, item.itemId])],
        updatedAt: serverTimestamp(),
      }, { merge: true });

      transaction.set(ledgerRef, {
        uid: user.uid,
        direction: 'debit',
        source: 'unlock',
        amount: item.cost,
        balanceBefore,
        balanceAfter,
        status: 'confirmed',
        reason: `Unlock ${item.title}`,
        itemId: item.itemId,
        metadata: {
          itemType: item.itemType,
          title: item.title,
          season: DPF_SEASON,
        },
        idempotencyKey: `${user.uid}:unlock:${safeItemId}`,
        createdAt: serverTimestamp(),
        confirmedAt: serverTimestamp(),
      });

      transaction.set(unlockRef, {
        uid: user.uid,
        itemId: item.itemId,
        itemType: item.itemType,
        title: item.title,
        cost: item.cost,
        ledgerId,
        unlockedAt: serverTimestamp(),
      });

      return { ok: true, cost: item.cost, balanceAfter, ledgerId };
    });
  } catch (error) {
    console.error('DPF unlock failed:', error);
    return { ok: false, code: 'firebase_error', message: 'Unable to unlock this item right now.' };
  }
};

export const hasUnlock = async (uid: string, itemId: string) => {
  const snapshot = await getDoc(doc(db, 'unlocks', toSafeId(`${uid}:${itemId}`)));
  return snapshot.exists();
};
