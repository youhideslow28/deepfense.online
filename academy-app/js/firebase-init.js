/**
 * DEEPFENSE ACADEMY — firebase-init.js
 * Khởi tạo Firebase SDK (ESM CDN) và Google Auth
 * Dùng chung Firebase project với deepfense.online (SSO)
 *
 * @copyright 2025 Ho Xuan Nguyen (25NS039)
 */

import { initializeApp, getApps } from 'https://www.gstatic.com/firebasejs/11.8.1/firebase-app.js';
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  onAuthStateChanged,
} from 'https://www.gstatic.com/firebasejs/11.8.1/firebase-auth.js';
import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
  updateDoc,
  onSnapshot,
  serverTimestamp,
} from 'https://www.gstatic.com/firebasejs/11.8.1/firebase-firestore.js';

// ── Firebase config ────────────────────────────────────────────
// Các giá trị này là PUBLIC (chỉ định danh project, không phải secret).
// Bảo mật thực sự nằm ở Firestore Security Rules phía server.
const FIREBASE_CONFIG = {
  apiKey:            'AIzaSyBKFzSIg4rLBe1IizKIEWGdBW6TbBkxaqM',
  authDomain:        'deepfense-online.firebaseapp.com',
  projectId:         'deepfense-online',
  storageBucket:     'deepfense-online.firebasestorage.app',
  messagingSenderId: '540319371040',
  appId:             '1:540319371040:web:d3c14bf63fd6d24b35eabf',
  measurementId:     'G-NFMMZ0Z0V9',
};

// ── Init (HMR-safe, tránh duplicate app) ──────────────────────
const app = getApps().length === 0
  ? initializeApp(FIREBASE_CONFIG)
  : getApps()[0];

const auth = getAuth(app);
const db   = getFirestore(app);

const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({ prompt: 'select_account' });

// ── Auth helpers ───────────────────────────────────────────────

/**
 * Đăng nhập bằng Google (popup).
 * Trả về { ok: true, user } hoặc { ok: false, code, message }
 */
export const loginWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    await ensureAcademyLearner(result.user);
    return { ok: true, user: result.user };
  } catch (err) {
    const code = err?.code ?? 'unknown';
    // Người dùng tự đóng popup — không phải lỗi thật
    if (code === 'auth/popup-closed-by-user' || code === 'auth/cancelled-popup-request') {
      return { ok: false, code, message: '' };
    }
    console.error('[Academy] loginWithGoogle error:', err);
    return { ok: false, code, message: err?.message ?? 'Đăng nhập thất bại.' };
  }
};

/**
 * Đăng xuất
 */
export const logout = () => signOut(auth);

/**
 * Lắng nghe trạng thái đăng nhập.
 * Gọi callback(user | null) mỗi khi thay đổi.
 * Trả về unsubscribe function.
 */
export const listenAuth = (callback) => onAuthStateChanged(auth, callback);

// ── Learner profile (Firestore) ───────────────────────────────

/**
 * Tạo/cập nhật bản ghi learner trong collection `academy_learners`
 * khi người dùng lần đầu đăng nhập (merge — không ghi đè tiến độ).
 */
export const ensureAcademyLearner = async (user) => {
  if (!user) return;
  const ref = doc(db, 'academy_learners', user.uid);
  const snap = await getDoc(ref);

  const baseData = {
    uid:         user.uid,
    email:       user.email ?? '',
    displayName: user.displayName ?? '',
    photoURL:    user.photoURL ?? '',
    updatedAt:   serverTimestamp(),
  };

  if (!snap.exists()) {
    await setDoc(ref, {
      ...baseData,
      createdAt:       serverTimestamp(),
      courseId:        'deepfense-basics',
      completedModules: [],
      quizScores:       {},
      dpfEarned:        0,
      certificateIssued: false,
    });
  } else {
    // Chỉ cập nhật thông tin profile, giữ nguyên tiến độ
    await setDoc(ref, baseData, { merge: true });
  }
};

/**
 * Lắng nghe tiến độ học của user trong Firestore (realtime).
 * Trả về unsubscribe function.
 *
 * @param {string} uid
 * @param {(data: object | null) => void} onChange
 */
export const listenProgress = (uid, onChange) => {
  const ref = doc(db, 'academy_learners', uid);
  return onSnapshot(ref, (snap) => {
    onChange(snap.exists() ? snap.data() : null);
  });
};

/**
 * Lắng nghe số dư DPF của user trong `users/{uid}` (cùng project với web chính).
 * Trả về unsubscribe function.
 *
 * @param {string} uid
 * @param {(balance: number) => void} onChange
 */
export const listenDpfBalance = (uid, onChange) => {
  const ref = doc(db, 'users', uid);
  return onSnapshot(ref, (snap) => {
    if (!snap.exists()) { onChange(0); return; }
    const val = snap.data().webBalance;
    onChange(typeof val === 'number' && Number.isFinite(val) ? val : 0);
  });
};

// ── Admin helpers (dev-only, visible only for deepfense@gmail.com) ────────────

/**
 * Ghi toàn bộ dữ liệu hoàn thành vào academy_learners/{uid}
 * Dùng để test certificate flow mà không cần học thật.
 */
export const adminCompleteAll = async (uid) => {
  const ref = doc(db, 'academy_learners', uid);
  const now = serverTimestamp();
  await setDoc(ref, {
    completedModules:  [1, 2, 3, 4, 5, 6, 7, 8, 9],
    completedMidterms: ['midterm1', 'midterm2'],
    completedFinalExam: true,
    completedMinigames: ['url-detective', 'scam-chat-triage', 'pressure-meter'],
    minigameScores: {
      'url-detective':    { score: 1, passed: true, moduleId: 6,    completedAt: now },
      'scam-chat-triage': { score: 1, passed: true, moduleId: 8,    completedAt: now },
      'pressure-meter':   { score: 1, passed: true, moduleId: 9,    completedAt: now },
    },
    quizScores: {
      1: { score: 1, passed: true, completedAt: now },
      2: { score: 1, passed: true, completedAt: now },
      3: { score: 1, passed: true, completedAt: now },
      4: { score: 1, passed: true, completedAt: now },
      5: { score: 1, passed: true, completedAt: now },
      6: { score: 1, passed: true, completedAt: now },
    },
    finalExam: {
      passed:    true,
      bestScore: 1,
      attempts:  1,
      lastAttemptAt: now,
      history: [{ score: 1, passed: true, completedAt: now }],
    },
    dpfEarned: 500,
    updatedAt: now,
  }, { merge: true });
};

/**
 * Xóa toàn bộ tiến độ về trạng thái ban đầu.
 */
export const adminResetProgress = async (uid) => {
  const ref = doc(db, 'academy_learners', uid);
  await updateDoc(ref, {
    completedModules:   [],
    completedMidterms:  [],
    completedFinalExam: false,
    completedMinigames: [],
    minigameScores:     {},
    quizScores:         {},
    finalExam:          {},
    dpfEarned:          0,
    updatedAt:          serverTimestamp(),
  });
};

// ── Exports ────────────────────────────────────────────────────
export { auth, db };
