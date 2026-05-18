/**
 * DEEPFENSE ACADEMY — minigame.js
 * Engine: load game data, route to renderer, save Firestore, claim DPF
 *
 * Usage:
 *   startMinigame({ id, dpf, primary }, moduleId, onComplete)
 *   onComplete(passed: boolean)
 *
 * @copyright 2025 Ho Xuan Nguyen (25NS039)
 */

import { auth, db } from './firebase-init.js';
import {
  doc, getDoc, updateDoc, serverTimestamp,
  runTransaction, increment, arrayUnion,
} from 'https://www.gstatic.com/firebasejs/11.8.1/firebase-firestore.js';

import { startUrlDetective  } from './games/url-detective.js';
import { startScamChatTriage } from './games/scam-chat-triage.js';
import { startPressureMeter  } from './games/pressure-meter.js';
import { startOtpTrap        } from './games/otp-trap.js';

// ── Constants ──────────────────────────────────────────────────
const DPF_SEASON = 'genesis-2026';

// ── Game registry ──────────────────────────────────────────────
const REGISTRY = {
  'url-detective':    startUrlDetective,
  'scam-chat-triage': startScamChatTriage,
  'pressure-meter':   startPressureMeter,
  'otp-trap':          startOtpTrap,
};

// ── Load game JSON ─────────────────────────────────────────────
const loadGameData = async (gameId) => {
  const res = await fetch(`../content/games/${gameId}.json`);
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return res.json();
};

// ── Save to Firestore ──────────────────────────────────────────
const saveResult = async (uid, gameId, moduleId, score, passed) => {
  const ref = doc(db, 'academy_learners', uid);
  const updates = {
    [`minigameScores.${gameId}`]: { score, passed, completedAt: serverTimestamp(), moduleId },
    updatedAt: serverTimestamp(),
  };
  if (passed) {
    updates.completedMinigames = arrayUnion(gameId);
    if (moduleId != null) updates.completedModules = arrayUnion(moduleId);
  }
  await updateDoc(ref, updates);
};

// ── Claim DPF (idempotent) ─────────────────────────────────────
const claimDpf = async (user, gameId, amount) => {
  const idKey   = `${user.uid}:minigame:${gameId}:${DPF_SEASON}`;
  const ledgerId = idKey.replace(/[^a-zA-Z0-9_-]/g, '_').slice(0, 180);
  const day      = new Date().toISOString().slice(0, 10);
  const quotaId  = `${user.uid}_course_${day}`.replace(/[^a-zA-Z0-9_-]/g, '_');

  const userRef   = doc(db, 'users', user.uid);
  const ledgerRef = doc(db, 'dpf_ledger', ledgerId);
  const quotaRef  = doc(db, 'dpf_daily_quotas', quotaId);

  try {
    return await runTransaction(db, async (tx) => {
      const [uSnap, lSnap] = await Promise.all([tx.get(userRef), tx.get(ledgerRef)]);
      if (lSnap.exists()) return 0;

      const ud  = uSnap.exists() ? uSnap.data() : {};
      const bal = typeof ud.webBalance === 'number' ? ud.webBalance : 0;

      tx.set(userRef, {
        uid: user.uid, email: user.email || '',
        displayName: user.displayName || '', photoURL: user.photoURL || '',
        webBalance:    bal + amount,
        earnedBalance: (typeof ud.earnedBalance === 'number' ? ud.earnedBalance : 0) + amount,
        updatedAt: serverTimestamp(),
        createdAt: uSnap.exists() && ud.createdAt ? ud.createdAt : serverTimestamp(),
      }, { merge: true });

      tx.set(ledgerRef, {
        uid: user.uid, direction: 'credit', source: 'minigame', amount,
        balanceBefore: bal, balanceAfter: bal + amount, status: 'confirmed',
        reason: `Hoàn thành minigame: ${gameId}`,
        activityId: `minigame-${gameId}`,
        metadata: { season: DPF_SEASON, day, gameId },
        idempotencyKey: idKey, createdAt: serverTimestamp(), confirmedAt: serverTimestamp(),
      });

      tx.set(quotaRef, {
        uid: user.uid, source: 'minigame', day,
        count: increment(1), amount: increment(amount), updatedAt: serverTimestamp(),
      }, { merge: true });

      return amount;
    });
  } catch (err) {
    console.error('[Minigame] claimDpf failed:', err);
    return 0;
  }
};

// ── "Already passed" screen ────────────────────────────────────
const renderAlreadyPassed = (prev, dpf) => {
  document.getElementById('quiz-progress-label').textContent = 'Đã hoàn thành';
  document.getElementById('quiz-content').innerHTML = `
    <div style="background:var(--clr-surface);border:1px solid rgba(34,197,94,.2);
                border-radius:16px;padding:36px;text-align:center;max-width:480px;margin:0 auto">
      <div style="font-size:2.5rem;margin-bottom:12px">✅</div>
      <div style="font-size:1.1rem;font-weight:700;color:var(--clr-success);margin-bottom:8px">
        Bạn đã hoàn thành!
      </div>
      <div style="font-size:.85rem;color:var(--clr-text-3);margin-bottom:20px">
        Điểm trước: <strong style="color:var(--clr-text)">${Math.round((prev.score ?? 0) * 100)}%</strong>
        · <span style="color:var(--clr-primary)">+${dpf} DPF đã nhận</span>
      </div>
      <div style="display:flex;gap:10px;justify-content:center;flex-wrap:wrap">
        <button id="btn-mg-replay" class="btn btn--ghost">🔄 Chơi lại</button>
        <button id="btn-mg-skip"  class="btn btn--primary">Tiếp tục →</button>
      </div>
    </div>`;
};

// ── Public entry point ─────────────────────────────────────────
/**
 * @param {object} gameCfg  — { id, dpf, primary?, label? } từ course-manifest
 * @param {number|null} moduleId — module ID để ghi vào completedModules khi pass
 * @param {function} onComplete — callback(passed: boolean)
 */
export const startMinigame = async (gameCfg, moduleId, onComplete) => {
  const { id: gameId } = gameCfg;
  const renderer = REGISTRY[gameId];

  if (!renderer) {
    console.error('[Minigame] Unknown game:', gameId);
    onComplete?.(false);
    return;
  }

  // Switch to quiz view
  document.querySelectorAll('.view').forEach((v) => v.classList.add('hidden'));
  document.getElementById('view-quiz')?.classList.remove('hidden');
  document.getElementById('content-area')?.scrollTo({ top: 0, behavior: 'smooth' });

  // Load data
  let gameData;
  try {
    gameData = await loadGameData(gameId);
  } catch (err) {
    document.getElementById('quiz-title').textContent = 'Minigame';
    document.getElementById('quiz-content').innerHTML = `
      <div style="text-align:center;padding:40px">
        <p style="color:var(--clr-danger);margin-bottom:16px">Không tải được game. Thử lại sau.</p>
        <p style="font-size:.8rem;color:var(--clr-text-3);margin-bottom:16px">${err.message}</p>
        <button class="btn btn--ghost" onclick="window.navigateToDashboard()">← Dashboard</button>
      </div>`;
    return;
  }

  document.getElementById('quiz-title').textContent = gameData.title ?? 'Minigame';
  document.getElementById('quiz-progress-label').textContent = gameData.subtitle ?? '';

  // Check if already passed → show replay option
  const user = auth.currentUser;
  if (user) {
    try {
      const snap = await getDoc(doc(db, 'academy_learners', user.uid));
      const prev = snap.exists() ? snap.data()?.minigameScores?.[gameId] : null;
      if (prev?.passed) {
        renderAlreadyPassed(prev, gameCfg.dpf ?? 20);
        const replay = document.getElementById('btn-mg-replay');
        const skip   = document.getElementById('btn-mg-skip');
        replay?.addEventListener('click', () => runGame(renderer, gameData, gameCfg, moduleId, onComplete, user));
        skip?.addEventListener('click', () => onComplete?.(true));
        return;
      }
    } catch (_) { /* proceed normally */ }
  }

  runGame(renderer, gameData, gameCfg, moduleId, onComplete, user);
};

// ── Internal: run + handle save/DPF on finish ──────────────────
const runGame = (renderer, gameData, gameCfg, moduleId, onComplete, user) => {
  renderer(gameData, async (score, passed) => {
    let dpfEarned = 0;
    if (user) {
      try {
        await saveResult(user.uid, gameCfg.id, moduleId, score, passed);
        if (passed) dpfEarned = await claimDpf(user, gameCfg.id, gameCfg.dpf ?? 20);
      } catch (err) {
        console.error('[Minigame] persist failed:', err);
      }
    }
    onComplete?.(passed, score, dpfEarned);
  });
};
