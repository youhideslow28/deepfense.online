/**
 * DEEPFENSE ACADEMY — midterm.js
 * Engine cho các bài thi Midterm (25 câu / bank 30, pass 70%)
 * Giống quiz.js về UX nhưng dành cho milestone giữa khoá.
 *
 * DPF: 50 DPF mỗi midterm, chỉ nhận 1 lần (idempotency key).
 *
 * @copyright 2025 Ho Xuan Nguyen (25NS039)
 */

import { auth, db } from './firebase-init.js';
import {
  doc,
  getDoc,
  setDoc,
  updateDoc,
  serverTimestamp,
  runTransaction,
  increment,
} from 'https://www.gstatic.com/firebasejs/11.8.1/firebase-firestore.js';

// ── Constants ──────────────────────────────────────────────────
const DPF_PER_MIDTERM = 50;
const DPF_SEASON      = 'genesis-2026';
const MIDTERM_CONFIG  = {
  midterm1: { id: 'midterm1', title: 'Midterm 1', subtitle: 'Phần I — Nhận diện Deepfake (Module 1, 2)', questions: 20, passThreshold: 0.7, bankFile: 'midterm-1-bank.json', modules: [1, 2] },
  midterm2: { id: 'midterm2', title: 'Midterm 2', subtitle: 'Phần II — Nhận diện Tấn công (Module 3, 4)', questions: 20, passThreshold: 0.7, bankFile: 'midterm-2-bank.json', modules: [3, 4] },
};

export const getMidtermConfig = (id) => MIDTERM_CONFIG[id] ?? null;

// ── Midterm state ──────────────────────────────────────────────
let mt = {
  config:     null,
  questions:  [],
  current:    0,
  answers:    [],
  answered:   false,
  onComplete: null,
};

// ── DOM helpers ────────────────────────────────────────────────
const $ = (id) => document.getElementById(id);

// ── Shuffle ────────────────────────────────────────────────────
const shuffle = (arr) => {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
};

// ── Load bank ──────────────────────────────────────────────────
const loadBank = async (bankFile) => {
  const res = await fetch(`../content/midterms/${bankFile}`);
  if (!res.ok) throw new Error(`Không tải được ngân hàng câu hỏi: ${bankFile}`);
  return res.json();
};

// ── Render progress ────────────────────────────────────────────
const renderProgress = () => {
  $('quiz-progress-label').textContent =
    `Câu ${mt.current + 1} / ${mt.questions.length}`;
};

// ── Render câu hỏi ─────────────────────────────────────────────
const renderQuestion = () => {
  const q    = mt.questions[mt.current];
  const keys = ['A', 'B', 'C', 'D'];

  renderProgress();

  $('quiz-content').innerHTML = `
    <div class="question-card">
      <div class="question-num" style="color:var(--clr-warning)">
        🎯 MIDTERM · Câu ${mt.current + 1} / ${mt.questions.length}
      </div>
      <div class="question-text">${q.text}</div>
      <div class="answer-list">
        ${q.options.map((opt, i) => {
          let extra = '';
          if (mt.answered) {
            if (i === q.correct)            extra = 'is-correct';
            else if (i === mt.answers[mt.current]) extra = 'is-wrong';
          } else if (i === mt.answers[mt.current]) extra = 'is-selected';

          return `
            <button class="answer-option ${extra}"
                    data-idx="${i}"
                    ${mt.answered ? 'disabled' : ''}>
              <span class="answer-key">${keys[i]}</span>
              <span>${opt}</span>
            </button>`;
        }).join('')}
      </div>

      ${mt.answered && q.explanation ? `
        <div class="quiz-explanation">💡 ${q.explanation}</div>` : ''}
    </div>

    <div class="quiz-actions">
      ${mt.answered ? `
        <button id="btn-mt-next" class="btn btn--primary">
          ${mt.current < mt.questions.length - 1 ? 'Câu tiếp theo →' : 'Xem kết quả →'}
        </button>` : `
        <span style="font-size:.8rem;color:var(--clr-text-3)">Chọn một đáp án để tiếp tục</span>
      `}
    </div>`;

  if (!mt.answered) {
    document.querySelectorAll('.answer-option').forEach((btn) =>
      btn.addEventListener('click', () => submitAnswer(Number(btn.dataset.idx))));
  } else {
    $('btn-mt-next')?.addEventListener('click', nextQuestion);
  }
};

const submitAnswer = (idx) => {
  if (mt.answered) return;
  mt.answers[mt.current] = idx;
  mt.answered = true;
  renderQuestion();
};

const nextQuestion = () => {
  if (mt.current < mt.questions.length - 1) {
    mt.current++;
    mt.answered = mt.answers[mt.current] !== undefined;
    renderQuestion();
  } else {
    showResult();
  }
  document.getElementById('content-area')?.scrollTo({ top: 0, behavior: 'smooth' });
};

// ── Kết quả ────────────────────────────────────────────────────
const showResult = async () => {
  const total   = mt.questions.length;
  const correct = mt.questions.filter((q, i) => mt.answers[i] === q.correct).length;
  const score   = correct / total;
  const pct     = Math.round(score * 100);
  const passed  = score >= mt.config.passThreshold;
  const user    = auth.currentUser;

  let dpfAwarded = 0;
  if (user) {
    const [, dpf] = await Promise.all([
      saveMidtermResult(user.uid, mt.config.id, score, passed),
      passed ? claimMidtermDpf(user, mt.config.id) : Promise.resolve(0),
    ]);
    dpfAwarded = dpf;
  }

  $('quiz-progress-label').textContent = 'Kết quả';
  $('quiz-content').innerHTML = `
    <div class="quiz-result">
      <div style="font-size:.7rem;font-weight:700;letter-spacing:.12em;text-transform:uppercase;
                  color:var(--clr-warning);margin-bottom:10px">
        🎯 ${mt.config.title.toUpperCase()}
      </div>

      <div style="font-size:2.8rem;margin-bottom:10px">${passed ? '🏆' : '📚'}</div>
      <div class="quiz-result-score">${pct}%</div>
      <div class="quiz-result-label">${correct} / ${total} câu đúng</div>

      <div class="${passed ? 'quiz-result-pass' : 'quiz-result-fail'}" style="margin:16px 0 6px">
        ${passed
          ? `✓ Đạt — Bạn đã vượt qua ${mt.config.title}!`
          : `✗ Chưa đạt — Cần ${Math.round(mt.config.passThreshold * 100)}% để qua`}
      </div>

      ${dpfAwarded > 0 ? `
        <div style="display:inline-flex;align-items:center;gap:6px;
                    background:rgba(0,240,255,.1);border:1px solid rgba(0,240,255,.2);
                    border-radius:99px;padding:6px 14px;font-size:.85rem;font-weight:700;
                    color:#00F0FF;margin-bottom:16px;font-family:'JetBrains Mono',monospace">
          +${dpfAwarded} DPF
        </div>` : ''}

      <div style="margin:8px 0 24px;font-size:.84rem;color:var(--clr-text-3)">
        ${passed
          ? `Xuất sắc! Bạn đã nắm vững kiến thức ${mt.config.subtitle}.`
          : `Ôn lại các module ${mt.config.modules.join(', ')} rồi thử lại.`}
      </div>

      <!-- Phân tích theo module -->
      <div id="mt-breakdown" style="text-align:left;margin-bottom:24px"></div>

      <div style="display:flex;gap:10px;justify-content:center;flex-wrap:wrap">
        ${!passed ? `<button id="btn-mt-retry" class="btn btn--ghost">Làm lại</button>` : ''}
        <button id="btn-mt-review" class="btn btn--ghost">Xem đáp án</button>
        <button id="btn-mt-done" class="btn btn--primary">
          ${passed ? 'Tiếp tục →' : 'Về Dashboard'}
        </button>
      </div>
    </div>`;

  renderBreakdown(correct, total);

  $('btn-mt-retry')?.addEventListener('click',
    () => startMidterm(mt.config.id, mt.onComplete));
  $('btn-mt-review')?.addEventListener('click', showReview);
  $('btn-mt-done')?.addEventListener('click', () => mt.onComplete?.(passed));
};

// ── Phân tích kết quả theo vùng kiến thức ─────────────────────
const renderBreakdown = (correct, total) => {
  const el = document.getElementById('mt-breakdown');
  if (!el) return;

  // Nhóm câu hỏi theo tag (nếu có)
  const byTag = {};
  mt.questions.forEach((q, i) => {
    const tag = q.tag || 'Tổng hợp';
    if (!byTag[tag]) byTag[tag] = { total: 0, correct: 0 };
    byTag[tag].total++;
    if (mt.answers[i] === q.correct) byTag[tag].correct++;
  });

  const tags = Object.entries(byTag);
  if (tags.length <= 1) { el.remove(); return; }

  el.innerHTML = `
    <div style="background:var(--clr-surface);border:1px solid var(--clr-border);
                border-radius:10px;padding:16px;font-size:.84rem">
      <div style="font-weight:700;color:var(--clr-text-2);margin-bottom:10px;
                  font-size:.72rem;text-transform:uppercase;letter-spacing:.08em">
        Phân tích theo chủ đề
      </div>
      ${tags.map(([tag, data]) => {
        const pct = Math.round((data.correct / data.total) * 100);
        const clr = pct >= 70 ? 'var(--clr-success)' : pct >= 50 ? 'var(--clr-warning)' : 'var(--clr-danger)';
        return `
          <div style="display:flex;align-items:center;gap:10px;margin-bottom:8px">
            <span style="flex:1;color:var(--clr-text-2)">${tag}</span>
            <div style="width:80px;height:5px;background:var(--clr-border-2);border-radius:99px;overflow:hidden">
              <div style="width:${pct}%;height:100%;background:${clr};border-radius:99px"></div>
            </div>
            <span style="font-family:'JetBrains Mono',monospace;font-size:.75rem;color:${clr};
                         min-width:40px;text-align:right">${pct}%</span>
          </div>`;
      }).join('')}
    </div>`;
};

// ── Review ─────────────────────────────────────────────────────
const showReview = () => {
  const keys = ['A', 'B', 'C', 'D'];
  $('quiz-content').innerHTML = `
    <div style="margin-bottom:16px;display:flex;align-items:center;justify-content:space-between">
      <h3 style="font-size:1rem;font-weight:700;color:var(--clr-text)">Xem lại đáp án — ${mt.config.title}</h3>
      <button id="btn-mt-review-back" class="btn btn--ghost" style="padding:6px 14px;font-size:.8rem">← Quay lại</button>
    </div>

    ${mt.questions.map((q, i) => {
      const chosen  = mt.answers[i];
      const correct = q.correct;
      const isRight = chosen === correct;
      return `
        <div style="background:var(--clr-surface);border:1px solid ${isRight ? 'rgba(34,197,94,.25)' : 'rgba(239,68,68,.25)'};
                    border-radius:12px;padding:20px;margin-bottom:10px">
          <div style="font-size:.72rem;font-weight:700;color:var(--clr-text-3);
                      font-family:'JetBrains Mono',monospace;margin-bottom:8px">
            Câu ${i + 1}${q.tag ? ` · ${q.tag}` : ''} · ${isRight ? '<span style="color:#22c55e">✓ Đúng</span>' : '<span style="color:#ef4444">✗ Sai</span>'}
          </div>
          <div style="font-size:.9rem;font-weight:600;color:var(--clr-text);margin-bottom:12px">${q.text}</div>
          ${q.options.map((opt, j) => {
            let bg = 'transparent', clr = 'var(--clr-text-2)', border = 'var(--clr-border)';
            if (j === correct)       { bg = 'rgba(34,197,94,.1)'; clr = '#4ade80'; border = 'rgba(34,197,94,.3)'; }
            else if (j === chosen)   { bg = 'rgba(239,68,68,.1)'; clr = '#f87171'; border = 'rgba(239,68,68,.3)'; }
            return `
              <div style="display:flex;gap:10px;padding:8px 12px;background:${bg};
                          border:1px solid ${border};border-radius:8px;margin-bottom:6px;
                          font-size:.85rem;color:${clr}">
                <span style="font-family:'JetBrains Mono',monospace;font-size:.72rem;
                             font-weight:700;min-width:18px">${keys[j]}</span>
                <span>${opt}</span>
                ${j === correct ? '<span style="margin-left:auto;font-size:.75rem">✓</span>' : ''}
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

  $('btn-mt-review-back')?.addEventListener('click', showResult);
};

// ── Lưu kết quả Firestore ──────────────────────────────────────
const saveMidtermResult = async (uid, midtermId, score, passed) => {
  try {
    const ref    = doc(db, 'academy_learners', uid);
    const update = {
      [`midtermScores.${midtermId}`]: {
        score,
        passed,
        attempts: increment(1),
        lastAttemptAt: serverTimestamp(),
        ...(passed ? { passedAt: serverTimestamp() } : {}),
      },
      updatedAt: serverTimestamp(),
    };

    if (passed) {
      const snap = await getDoc(ref);
      const data = snap.exists() ? snap.data() : {};
      const done = Array.isArray(data.completedMidterms) ? data.completedMidterms : [];
      if (!done.includes(midtermId)) {
        // arrayUnion không nhập trực tiếp vào nested object, dùng spread
        update.completedMidterms = [...new Set([...done, midtermId])];
      }
    }

    await updateDoc(ref, update);
  } catch (err) {
    console.error('[Midterm] saveMidtermResult failed:', err);
  }
};

// ── Claim DPF ──────────────────────────────────────────────────
const claimMidtermDpf = async (user, midtermId) => {
  const amount         = DPF_PER_MIDTERM;
  const idempotencyKey = `${user.uid}:course:deepfense-basics-${midtermId}:${DPF_SEASON}`;
  const ledgerId       = idempotencyKey.replace(/[^a-zA-Z0-9_-]/g, '_').slice(0, 180);
  const day            = new Date().toISOString().slice(0, 10);
  const quotaId        = `${user.uid}_course_${day}`.replace(/[^a-zA-Z0-9_-]/g, '_');

  const userRef   = doc(db, 'users', user.uid);
  const ledgerRef = doc(db, 'dpf_ledger', ledgerId);
  const quotaRef  = doc(db, 'dpf_daily_quotas', quotaId);

  try {
    return await runTransaction(db, async (tx) => {
      const [userSnap, ledgerSnap, quotaSnap] = await Promise.all([
        tx.get(userRef), tx.get(ledgerRef), tx.get(quotaRef),
      ]);

      if (ledgerSnap.exists()) return 0;

      const quotaCount = quotaSnap.exists()
        ? (typeof quotaSnap.data().count === 'number' ? quotaSnap.data().count : 0) : 0;
      if (quotaCount >= 3) return 0;

      const userData      = userSnap.exists() ? userSnap.data() : {};
      const balanceBefore = typeof userData.webBalance === 'number' ? userData.webBalance : 0;
      const balanceAfter  = balanceBefore + amount;

      tx.set(userRef, {
        uid: user.uid, email: user.email || '',
        displayName: user.displayName || '', photoURL: user.photoURL || '',
        webBalance:    balanceAfter,
        earnedBalance: (typeof userData.earnedBalance === 'number' ? userData.earnedBalance : 0) + amount,
        updatedAt: serverTimestamp(),
        createdAt: userSnap.exists() && userData.createdAt ? userData.createdAt : serverTimestamp(),
      }, { merge: true });

      tx.set(ledgerRef, {
        uid: user.uid, direction: 'credit', source: 'course', amount,
        balanceBefore, balanceAfter, status: 'confirmed',
        reason: `Hoàn thành ${MIDTERM_CONFIG[midtermId]?.title ?? midtermId} — DEEPFENSE BASIC`,
        activityId: `deepfense-basics-${midtermId}`,
        metadata: { season: DPF_SEASON, day, midtermId, courseId: 'deepfense-basics' },
        idempotencyKey, createdAt: serverTimestamp(), confirmedAt: serverTimestamp(),
      });

      tx.set(quotaRef, {
        uid: user.uid, source: 'course', day,
        count: increment(1), amount: increment(amount), updatedAt: serverTimestamp(),
      }, { merge: true });

      return amount;
    });
  } catch (err) {
    console.error('[Midterm] claimMidtermDpf failed:', err);
    return 0;
  }
};

// ── Public: khởi động midterm ──────────────────────────────────
/**
 * @param {string}   midtermId  — 'midterm1' | 'midterm2'
 * @param {function} onComplete — callback(passed: boolean)
 */
export const startMidterm = async (midtermId, onComplete) => {
  const config = getMidtermConfig(midtermId);
  if (!config) { console.error('Unknown midterm:', midtermId); return; }

  mt = { config, questions: [], current: 0, answers: [], answered: false, onComplete };

  // Header
  $('quiz-title').textContent          = config.title;
  $('quiz-progress-label').textContent = 'Đang tải…';

  // Chuyển sang view quiz (dùng chung container)
  document.querySelectorAll('.view').forEach((v) => v.classList.add('hidden'));
  document.getElementById('view-quiz').classList.remove('hidden');
  document.getElementById('content-area')?.scrollTo({ top: 0, behavior: 'smooth' });

  // Intro screen
  $('quiz-content').innerHTML = `
    <div style="background:var(--clr-surface);border:1px solid rgba(245,158,11,.2);
                border-radius:16px;padding:36px;text-align:center">
      <div style="font-size:2.5rem;margin-bottom:12px">🎯</div>
      <div style="font-size:1.2rem;font-weight:800;color:var(--clr-text);margin-bottom:6px">
        ${config.title}
      </div>
      <div style="font-size:.85rem;color:var(--clr-text-3);margin-bottom:20px">
        ${config.subtitle}
      </div>
      <div style="display:flex;justify-content:center;gap:24px;margin-bottom:24px">
        <div style="text-align:center">
          <div style="font-size:1.5rem;font-weight:800;color:var(--clr-warning);
                      font-family:'JetBrains Mono',monospace">${config.questions}</div>
          <div style="font-size:.75rem;color:var(--clr-text-3)">Câu hỏi</div>
        </div>
        <div style="text-align:center">
          <div style="font-size:1.5rem;font-weight:800;color:var(--clr-warning);
                      font-family:'JetBrains Mono',monospace">${Math.round(config.passThreshold * 100)}%</div>
          <div style="font-size:.75rem;color:var(--clr-text-3)">Cần để đạt</div>
        </div>
        <div style="text-align:center">
          <div style="font-size:1.5rem;font-weight:800;color:#00F0FF;
                      font-family:'JetBrains Mono',monospace">+${DPF_PER_MIDTERM}</div>
          <div style="font-size:.75rem;color:var(--clr-text-3)">DPF khi đạt</div>
        </div>
      </div>
      <button id="btn-mt-start" class="btn btn--primary" style="padding:12px 32px;font-size:1rem">
        Bắt đầu thi →
      </button>
      <div>
        <button class="btn btn--ghost" style="margin-top:12px;font-size:.8rem"
                onclick="window.navigateToDashboard()">← Về Dashboard</button>
      </div>
    </div>`;

  $('quiz-progress-label').textContent = config.title;

  $('btn-mt-start').addEventListener('click', async () => {
    $('btn-mt-start').disabled  = true;
    $('btn-mt-start').textContent = 'Đang tải…';

    try {
      const data       = await loadBank(config.bankFile);
      const all        = data.questions ?? [];
      mt.questions     = shuffle(all).slice(0, config.questions);
      mt.answers       = new Array(mt.questions.length).fill(undefined);
      renderQuestion();
    } catch (err) {
      $('quiz-content').innerHTML = `
        <div style="background:var(--clr-surface);border:1px solid var(--clr-border);
                    border-radius:16px;padding:36px;text-align:center">
          <p style="color:var(--clr-text-2);margin-bottom:16px">Không tải được đề thi.</p>
          <p style="font-size:.8rem;color:var(--clr-text-3);margin-bottom:20px">${err.message}</p>
          <button class="btn btn--ghost" onclick="window.navigateToDashboard()">← Về Dashboard</button>
        </div>`;
    }
  });
};
