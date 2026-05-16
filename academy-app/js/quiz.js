/**
 * DEEPFENSE ACADEMY — quiz.js
 * Quiz engine: render, chấm điểm, lưu Firestore, claim DPF
 *
 * Luồng:
 *   showQuizView(mod, course) → render câu hỏi →
 *   submitAnswer() → showExplanation() → nextQuestion() →
 *   showQuizResult() → saveResult() + claimDpf()
 *
 * @copyright 2025 Ho Xuan Nguyen (25NS039)
 */

import { auth, db } from './firebase-init.js';
import {
  doc,
  getDoc,
  setDoc,
  updateDoc,
  arrayUnion,
  serverTimestamp,
  runTransaction,
  increment,
  collection,
} from 'https://www.gstatic.com/firebasejs/11.8.1/firebase-firestore.js';

// ── Constants ──────────────────────────────────────────────────
const DPF_PER_MODULE_QUIZ = 50;   // DPF cho lần đầu pass quiz module
const DPF_SEASON          = 'genesis-2026';
const MAX_REWARD_AMOUNT   = 250;

// ── Quiz state ─────────────────────────────────────────────────
let qState = {
  mod:          null,   // module object từ manifest
  course:       null,   // full course manifest
  questions:    [],     // mảng câu hỏi đã shuffle
  current:      0,      // index câu hỏi đang làm
  answers:      [],     // câu trả lời người dùng (index option, hoặc null)
  answered:     false,  // đã trả lời câu hiện tại chưa
  onComplete:   null,   // callback(passed) sau khi quiz xong
};

// ── DOM helpers ────────────────────────────────────────────────
const $ = (id) => document.getElementById(id);

// ── Load câu hỏi từ JSON ────────────────────────────────────────
const loadQuizData = async (moduleId) => {
  const res = await fetch(`../content/quizzes/module-${moduleId}-quiz.json`);
  if (!res.ok) throw new Error(`Quiz data not found for module ${moduleId}`);
  return res.json();
};

// ── Shuffle array (Fisher-Yates) ───────────────────────────────
const shuffle = (arr) => {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
};

// ── Render progress bar (câu X / Y) ───────────────────────────
const renderQuizProgress = () => {
  const total   = qState.questions.length;
  const current = qState.current + 1;
  $('quiz-progress-label').textContent = `Câu ${current} / ${total}`;
};

// ── Render một câu hỏi ─────────────────────────────────────────
const renderQuestion = () => {
  const q        = qState.questions[qState.current];
  const keys     = ['A', 'B', 'C', 'D'];
  const answered = qState.answered;
  const chosen   = qState.answers[qState.current];

  renderQuizProgress();

  $('quiz-content').innerHTML = `
    <div class="question-card">
      <div class="question-num">Câu ${qState.current + 1} / ${qState.questions.length}</div>
      <div class="question-text">${q.text}</div>
      <div class="answer-list" id="answer-list">
        ${q.options.map((opt, i) => {
          let extra = '';
          if (answered) {
            if (i === q.correct)          extra = 'is-correct';
            else if (i === chosen)        extra = 'is-wrong';
          } else if (i === chosen)        extra = 'is-selected';

          return `
            <button class="answer-option ${extra}"
                    data-idx="${i}"
                    ${answered ? 'disabled' : ''}>
              <span class="answer-key">${keys[i]}</span>
              <span>${opt}</span>
            </button>`;
        }).join('')}
      </div>

      ${answered && q.explanation ? `
        <div class="quiz-explanation">
          💡 ${q.explanation}
        </div>` : ''}
    </div>

    <div class="quiz-actions">
      ${answered ? `
        <button id="btn-quiz-next" class="btn btn--primary">
          ${qState.current < qState.questions.length - 1 ? 'Câu tiếp theo →' : 'Xem kết quả →'}
        </button>` : `
        <span style="font-size:.8rem;color:var(--clr-text-3)">Chọn một đáp án để tiếp tục</span>
      `}
    </div>`;

  // Gắn event nếu chưa trả lời
  if (!answered) {
    document.querySelectorAll('.answer-option').forEach((btn) => {
      btn.addEventListener('click', () => submitAnswer(Number(btn.dataset.idx)));
    });
  } else {
    $('btn-quiz-next')?.addEventListener('click', nextQuestion);
  }
};

// ── Chọn đáp án ────────────────────────────────────────────────
const submitAnswer = (optionIdx) => {
  if (qState.answered) return;
  qState.answers[qState.current] = optionIdx;
  qState.answered = true;
  renderQuestion(); // re-render để hiện màu đúng/sai + explanation
};

// ── Câu tiếp theo ──────────────────────────────────────────────
const nextQuestion = () => {
  if (qState.current < qState.questions.length - 1) {
    qState.current++;
    qState.answered = qState.answers[qState.current] !== undefined;
    renderQuestion();
  } else {
    showQuizResult();
  }
  document.getElementById('content-area')?.scrollTo({ top: 0, behavior: 'smooth' });
};

// ── Kết quả quiz ───────────────────────────────────────────────
const showQuizResult = async () => {
  const total   = qState.questions.length;
  const correct = qState.questions.filter((q, i) => qState.answers[i] === q.correct).length;
  const score   = correct / total;
  const pct     = Math.round(score * 100);
  const threshold = qState.mod.quiz?.passThreshold ?? 0.7;
  const passed  = score >= threshold;

  const user = auth.currentUser;

  // Lưu kết quả và xử lý DPF song song
  let dpfAwarded = 0;
  if (user) {
    const [, dpf] = await Promise.all([
      saveQuizResult(user.uid, qState.mod.id, score, passed),
      passed ? claimModuleQuizDpf(user, qState.mod.id) : Promise.resolve(0),
    ]);
    dpfAwarded = dpf;
  }

  // Render màn hình kết quả
  $('quiz-content').innerHTML = `
    <div class="quiz-result">
      <div style="font-size:2.8rem;margin-bottom:12px">${passed ? '🎉' : '📚'}</div>

      <div class="quiz-result-score">${pct}%</div>
      <div class="quiz-result-label">${correct} / ${total} câu đúng</div>

      <div class="${passed ? 'quiz-result-pass' : 'quiz-result-fail'}" style="margin:16px 0 6px">
        ${passed ? '✓ Đã qua — Module hoàn thành!' : '✗ Chưa đạt — Cần ' + Math.round(threshold * 100) + '%'}
      </div>

      ${dpfAwarded > 0 ? `
        <div style="display:inline-flex;align-items:center;gap:6px;
                    background:rgba(0,240,255,.1);border:1px solid rgba(0,240,255,.2);
                    border-radius:99px;padding:6px 14px;font-size:.85rem;
                    font-weight:700;color:#00F0FF;margin-bottom:16px;font-family:'JetBrains Mono',monospace">
          +${dpfAwarded} DPF
        </div>` : ''}

      <div style="margin:8px 0 24px;font-size:.84rem;color:var(--clr-text-3)">
        ${passed
          ? 'Tốt lắm! Bạn đã nắm vững kiến thức module này.'
          : 'Hãy ôn lại bài học và thử lại. Không có giới hạn số lần làm lại.'}
      </div>

      <div style="display:flex;gap:10px;justify-content:center;flex-wrap:wrap">
        ${!passed ? `
          <button id="btn-quiz-retry" class="btn btn--ghost">Làm lại</button>
        ` : ''}
        <button id="btn-quiz-review" class="btn btn--ghost">Xem đáp án</button>
        <button id="btn-quiz-done" class="btn btn--primary">
          ${passed ? 'Tiếp theo →' : 'Về dashboard'}
        </button>
      </div>
    </div>`;

  $('quiz-progress-label').textContent = `Kết quả`;

  // Event buttons
  $('btn-quiz-retry')?.addEventListener('click', () => startQuiz(qState.mod, qState.course, qState.onComplete));
  $('btn-quiz-review')?.addEventListener('click', showReview);
  $('btn-quiz-done')?.addEventListener('click', () => {
    if (qState.onComplete) qState.onComplete(passed);
  });
};

// ── Review — xem lại tất cả câu hỏi + đáp án ──────────────────
const showReview = () => {
  const keys = ['A', 'B', 'C', 'D'];

  $('quiz-content').innerHTML = `
    <div style="margin-bottom:16px;display:flex;align-items:center;justify-content:space-between">
      <h3 style="font-size:1rem;font-weight:700;color:var(--clr-text)">Xem lại đáp án</h3>
      <button id="btn-review-back" class="btn btn--ghost" style="padding:6px 14px;font-size:.8rem">← Quay lại</button>
    </div>

    ${qState.questions.map((q, i) => {
      const chosen  = qState.answers[i];
      const correct = q.correct;
      const isRight = chosen === correct;

      return `
        <div style="background:var(--clr-surface);border:1px solid ${isRight ? 'rgba(34,197,94,.25)' : 'rgba(239,68,68,.25)'};
                    border-radius:12px;padding:20px;margin-bottom:12px">
          <div style="font-size:.72rem;font-weight:700;color:var(--clr-text-3);
                      font-family:'JetBrains Mono',monospace;margin-bottom:8px">
            Câu ${i + 1} · ${isRight ? '<span style="color:#22c55e">✓ Đúng</span>' : '<span style="color:#ef4444">✗ Sai</span>'}
          </div>
          <div style="font-size:.9rem;font-weight:600;color:var(--clr-text);margin-bottom:12px">
            ${q.text}
          </div>
          ${q.options.map((opt, j) => {
            let bg = 'transparent', clr = 'var(--clr-text-2)', border = 'var(--clr-border)';
            if (j === correct)          { bg = 'rgba(34,197,94,.1)';  clr = '#4ade80'; border = 'rgba(34,197,94,.3)'; }
            else if (j === chosen)      { bg = 'rgba(239,68,68,.1)';  clr = '#f87171'; border = 'rgba(239,68,68,.3)'; }

            return `
              <div style="display:flex;gap:10px;padding:8px 12px;background:${bg};
                          border:1px solid ${border};border-radius:8px;
                          margin-bottom:6px;font-size:.85rem;color:${clr}">
                <span style="font-family:'JetBrains Mono',monospace;font-size:.72rem;
                             font-weight:700;min-width:18px">${keys[j]}</span>
                <span>${opt}</span>
                ${j === correct ? '<span style="margin-left:auto;font-size:.75rem">✓ Đúng</span>' : ''}
              </div>`;
          }).join('')}
          ${q.explanation ? `
            <div style="margin-top:10px;padding:10px 12px;background:var(--clr-bg-3);
                        border-left:3px solid var(--clr-primary);border-radius:0 6px 6px 0;
                        font-size:.82rem;color:var(--clr-text-2)">
              💡 ${q.explanation}
            </div>` : ''}
        </div>`;
    }).join('')}`;

  $('btn-review-back')?.addEventListener('click', showQuizResult);
};

// ── Lưu kết quả vào Firestore ──────────────────────────────────
const saveQuizResult = async (uid, moduleId, score, passed) => {
  try {
    const ref    = doc(db, 'academy_learners', uid);
    const key    = `quizScores.module_${moduleId}`;
    const update = {
      [`quizScores.module_${moduleId}`]: {
        score,
        passed,
        attempts: increment(1),
        lastAttemptAt: serverTimestamp(),
        ...(passed ? { passedAt: serverTimestamp() } : {}),
      },
      updatedAt: serverTimestamp(),
    };

    // Nếu passed và chưa có trong completedModules → thêm vào
    if (passed) {
      const snap = await getDoc(ref);
      const data = snap.exists() ? snap.data() : {};
      const completed = Array.isArray(data.completedModules) ? data.completedModules : [];
      if (!completed.includes(moduleId)) {
        update.completedModules = arrayUnion(moduleId);
      }
    }

    await updateDoc(ref, update);
  } catch (err) {
    console.error('[Quiz] saveQuizResult failed:', err);
  }
};

// ── Claim DPF sau khi pass quiz ───────────────────────────────
// Dùng Firestore client transaction (idempotency key đảm bảo chỉ nhận 1 lần)
const claimModuleQuizDpf = async (user, moduleId) => {
  const amount        = DPF_PER_MODULE_QUIZ;
  const idempotencyKey = `${user.uid}:course:deepfense-basics-quiz-${moduleId}:${DPF_SEASON}`;
  const ledgerId      = idempotencyKey.replace(/[^a-zA-Z0-9_-]/g, '_').slice(0, 180);
  const day           = new Date().toISOString().slice(0, 10);
  const quotaId       = `${user.uid}_course_${day}`.replace(/[^a-zA-Z0-9_-]/g, '_');

  const userRef   = doc(db, 'users', user.uid);
  const ledgerRef = doc(db, 'dpf_ledger', ledgerId);
  const quotaRef  = doc(db, 'dpf_daily_quotas', quotaId);

  try {
    const result = await runTransaction(db, async (tx) => {
      const [userSnap, ledgerSnap, quotaSnap] = await Promise.all([
        tx.get(userRef),
        tx.get(ledgerRef),
        tx.get(quotaRef),
      ]);

      // Đã nhận rồi → bỏ qua
      if (ledgerSnap.exists()) return 0;

      // Quota ngày: tối đa 3 lần nhận DPF từ course mỗi ngày
      const quotaCount = quotaSnap.exists()
        ? (typeof quotaSnap.data().count === 'number' ? quotaSnap.data().count : 0)
        : 0;
      if (quotaCount >= 3) return 0;

      const userData      = userSnap.exists() ? userSnap.data() : {};
      const balanceBefore = typeof userData.webBalance === 'number' ? userData.webBalance : 0;
      const balanceAfter  = balanceBefore + amount;

      tx.set(userRef, {
        uid: user.uid,
        email:       user.email       || '',
        displayName: user.displayName || '',
        photoURL:    user.photoURL    || '',
        webBalance:    balanceAfter,
        earnedBalance: (typeof userData.earnedBalance === 'number' ? userData.earnedBalance : 0) + amount,
        updatedAt: serverTimestamp(),
        createdAt: userSnap.exists() && userData.createdAt ? userData.createdAt : serverTimestamp(),
      }, { merge: true });

      tx.set(ledgerRef, {
        uid:       user.uid,
        direction: 'credit',
        source:    'course',
        amount,
        balanceBefore,
        balanceAfter,
        status:    'confirmed',
        reason:    `Hoàn thành quiz Module ${moduleId} — DEEPFENSE BASIC`,
        activityId: `deepfense-basics-quiz-${moduleId}`,
        metadata:  { season: DPF_SEASON, day, moduleId, courseId: 'deepfense-basics' },
        idempotencyKey,
        createdAt:    serverTimestamp(),
        confirmedAt:  serverTimestamp(),
      });

      tx.set(quotaRef, {
        uid: user.uid,
        source: 'course',
        day,
        count:  increment(1),
        amount: increment(amount),
        updatedAt: serverTimestamp(),
      }, { merge: true });

      return amount;
    });

    return result;
  } catch (err) {
    console.error('[Quiz] claimModuleQuizDpf failed:', err);
    return 0;
  }
};

// ── Public: khởi động quiz ─────────────────────────────────────
/**
 * @param {object} mod       - module object từ manifest
 * @param {object} course    - full course manifest
 * @param {function} onComplete - callback(passed: boolean) sau khi xong
 */
export const startQuiz = async (mod, course, onComplete) => {
  // Reset state
  qState = { mod, course, questions: [], current: 0, answers: [], answered: false, onComplete };

  // Cập nhật header
  $('quiz-title').textContent = `Quiz — Module ${mod.id}`;
  $('quiz-progress-label').textContent = 'Đang tải…';
  $('quiz-content').innerHTML = `
    <div style="text-align:center;padding:48px;color:var(--clr-text-3)">
      <div class="loading-spinner" style="margin:0 auto 16px"></div>
      <p>Đang tải câu hỏi…</p>
    </div>`;

  // Chuyển sang view quiz
  document.querySelectorAll('.view').forEach((v) => v.classList.add('hidden'));
  document.getElementById('view-quiz').classList.remove('hidden');
  document.getElementById('content-area')?.scrollTo({ top: 0, behavior: 'smooth' });

  try {
    const data      = await loadQuizData(mod.id);
    const all       = data.questions ?? [];
    const count     = mod.quiz?.questions ?? 10;
    qState.questions = shuffle(all).slice(0, count);
    qState.answers   = new Array(qState.questions.length).fill(undefined);
    renderQuestion();
  } catch (err) {
    $('quiz-content').innerHTML = `
      <div style="background:var(--clr-surface);border:1px solid var(--clr-border);
                  border-radius:16px;padding:36px;text-align:center">
        <div style="font-size:2rem;margin-bottom:12px">⚠️</div>
        <p style="color:var(--clr-text-2);margin-bottom:20px">Không thể tải câu hỏi quiz.</p>
        <p style="font-size:.8rem;color:var(--clr-text-3);margin-bottom:20px">${err.message}</p>
        <button class="btn btn--ghost" onclick="window.navigateToDashboard()">← Về Dashboard</button>
      </div>`;
  }
};
