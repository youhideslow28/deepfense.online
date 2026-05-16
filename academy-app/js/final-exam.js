/**
 * DEEPFENSE ACADEMY — final-exam.js
 * Final Exam engine: tổng hợp toàn bộ ngân hàng câu hỏi,
 * chọn 50 ngẫu nhiên, tối đa 3 lần thi, pass 70%.
 *
 * Bank: 8 file JSON (module quizzes + midterm banks) → ~132 câu → pick 50
 * On pass: completedFinalExam = true → cert eligibility unlocked
 *
 * @copyright 2025 Ho Xuan Nguyen (25NS039)
 */

import { auth, db } from './firebase-init.js';
import {
  doc,
  getDoc,
  updateDoc,
  serverTimestamp,
} from 'https://www.gstatic.com/firebasejs/11.8.1/firebase-firestore.js';

// ── Constants ──────────────────────────────────────────────────
const EXAM_QUESTIONS    = 50;
const PASS_THRESHOLD    = 0.70;
const MAX_ATTEMPTS      = 3;

const BANK_SOURCES = [
  '../content/quizzes/module-1-quiz.json',
  '../content/quizzes/module-2-quiz.json',
  '../content/quizzes/module-3-quiz.json',
  '../content/quizzes/module-4-quiz.json',
  '../content/quizzes/module-5-quiz.json',
  '../content/quizzes/module-6-quiz.json',
  '../content/midterms/midterm-1-bank.json',
  '../content/midterms/midterm-2-bank.json',
];

// ── Exam state ─────────────────────────────────────────────────
let ex = {
  questions:  [],
  current:    0,
  answers:    [],
  answered:   false,
  onComplete: null,  // callback(passed: boolean)
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

// ── Load & merge all question banks ───────────────────────────
const loadAllBanks = async () => {
  const results = await Promise.allSettled(
    BANK_SOURCES.map((url) => fetch(url).then((r) => r.json())),
  );

  const pool = [];
  const seen = new Set();

  results.forEach((r) => {
    if (r.status !== 'fulfilled') return;
    const qs = r.value.questions ?? [];
    qs.forEach((q) => {
      if (!seen.has(q.id)) {
        seen.add(q.id);
        pool.push(q);
      }
    });
  });

  return pool;
};

// ── Render progress ────────────────────────────────────────────
const renderProgress = () => {
  $('quiz-progress-label').textContent =
    `Câu ${ex.current + 1} / ${ex.questions.length}`;
};

// ── Render câu hỏi ─────────────────────────────────────────────
const renderQuestion = () => {
  const q    = ex.questions[ex.current];
  const keys = ['A', 'B', 'C', 'D'];

  renderProgress();

  $('quiz-content').innerHTML = `
    <div class="question-card">
      <div class="question-num" style="color:var(--clr-danger)">
        🏁 FINAL EXAM · Câu ${ex.current + 1} / ${ex.questions.length}
        ${q.tag ? `<span style="color:var(--clr-text-3);margin-left:6px">· ${q.tag}</span>` : ''}
      </div>
      <div class="question-text">${q.text}</div>
      <div class="answer-list">
        ${q.options.map((opt, i) => {
          let extra = '';
          if (ex.answered) {
            if (i === q.correct)             extra = 'is-correct';
            else if (i === ex.answers[ex.current]) extra = 'is-wrong';
          } else if (i === ex.answers[ex.current]) extra = 'is-selected';

          return `
            <button class="answer-option ${extra}"
                    data-idx="${i}"
                    ${ex.answered ? 'disabled' : ''}>
              <span class="answer-key">${keys[i]}</span>
              <span>${opt}</span>
            </button>`;
        }).join('')}
      </div>

      ${ex.answered && q.explanation ? `
        <div class="quiz-explanation">💡 ${q.explanation}</div>` : ''}
    </div>

    <div class="quiz-actions">
      ${ex.answered ? `
        <span style="font-size:.8rem;color:var(--clr-text-3)">
          ${ex.current + 1}/${ex.questions.length} đã trả lời
        </span>
        <button id="btn-ex-next" class="btn btn--primary">
          ${ex.current < ex.questions.length - 1 ? 'Câu tiếp theo →' : 'Xem kết quả →'}
        </button>` : `
        <span style="font-size:.8rem;color:var(--clr-text-3)">Chọn một đáp án để tiếp tục</span>
      `}
    </div>`;

  if (!ex.answered) {
    document.querySelectorAll('.answer-option').forEach((btn) =>
      btn.addEventListener('click', () => submitAnswer(Number(btn.dataset.idx))));
  } else {
    $('btn-ex-next')?.addEventListener('click', nextQuestion);
  }
};

const submitAnswer = (idx) => {
  if (ex.answered) return;
  ex.answers[ex.current] = idx;
  ex.answered = true;
  renderQuestion();
};

const nextQuestion = () => {
  if (ex.current < ex.questions.length - 1) {
    ex.current++;
    ex.answered = ex.answers[ex.current] !== undefined;
    renderQuestion();
  } else {
    showResult();
  }
  document.getElementById('content-area')?.scrollTo({ top: 0, behavior: 'smooth' });
};

// ── Kết quả ────────────────────────────────────────────────────
const showResult = async () => {
  const total   = ex.questions.length;
  const correct = ex.questions.filter((q, i) => ex.answers[i] === q.correct).length;
  const score   = correct / total;
  const pct     = Math.round(score * 100);
  const passed  = score >= PASS_THRESHOLD;
  const user    = auth.currentUser;

  let attemptsLeft = MAX_ATTEMPTS;
  if (user) {
    attemptsLeft = await saveExamResult(user.uid, score, passed);
  }

  $('quiz-progress-label').textContent = 'Kết quả';

  // Phân tích theo tag
  const byTag = {};
  ex.questions.forEach((q, i) => {
    const tag = q.tag || 'Tổng hợp';
    if (!byTag[tag]) byTag[tag] = { total: 0, correct: 0 };
    byTag[tag].total++;
    if (ex.answers[i] === q.correct) byTag[tag].correct++;
  });

  const breakdownHtml = Object.entries(byTag).map(([tag, d]) => {
    const p   = Math.round((d.correct / d.total) * 100);
    const clr = p >= 70 ? 'var(--clr-success)' : p >= 50 ? 'var(--clr-warning)' : 'var(--clr-danger)';
    return `
      <div style="display:flex;align-items:center;gap:10px;margin-bottom:8px;font-size:.83rem">
        <span style="flex:1;color:var(--clr-text-2);overflow:hidden;white-space:nowrap;
                     text-overflow:ellipsis">${tag.replace(/^Module \d+ — /, '')}</span>
        <div style="width:70px;height:4px;background:var(--clr-border-2);border-radius:99px;
                    overflow:hidden;flex-shrink:0">
          <div style="width:${p}%;height:100%;background:${clr};border-radius:99px"></div>
        </div>
        <span style="font-family:'JetBrains Mono',monospace;font-size:.72rem;
                     color:${clr};min-width:34px;text-align:right;flex-shrink:0">${p}%</span>
      </div>`;
  }).join('');

  $('quiz-content').innerHTML = `
    <div class="quiz-result">
      <div style="font-size:.72rem;font-weight:700;letter-spacing:.12em;text-transform:uppercase;
                  color:var(--clr-danger);margin-bottom:10px">🏁 FINAL EXAM</div>

      <div style="font-size:2.8rem;margin-bottom:10px">${passed ? '🏆' : '📚'}</div>
      <div class="quiz-result-score">${pct}%</div>
      <div class="quiz-result-label">${correct} / ${total} câu đúng</div>

      <div class="${passed ? 'quiz-result-pass' : 'quiz-result-fail'}" style="margin:16px 0 6px">
        ${passed
          ? '✓ Đạt — Bạn đã hoàn thành DEEPFENSE BASIC!'
          : `✗ Chưa đạt — Cần ${Math.round(PASS_THRESHOLD * 100)}% (${Math.ceil(PASS_THRESHOLD * total)}/${total} câu)`}
      </div>

      ${passed ? `
        <div style="display:inline-flex;align-items:center;gap:8px;
                    background:rgba(0,240,255,.1);border:1px solid rgba(0,240,255,.2);
                    border-radius:12px;padding:12px 20px;margin-bottom:16px">
          <span style="font-size:1.3rem">🎓</span>
          <div style="text-align:left">
            <div style="font-size:.85rem;font-weight:700;color:#00F0FF">
              Chứng chỉ DEEPFENSE AWARE đã mở khóa!
            </div>
            <div style="font-size:.75rem;color:var(--clr-text-3)">
              Nhận ngay để nhận +100 DPF
            </div>
          </div>
        </div>` : ''}

      ${!passed && attemptsLeft > 0 ? `
        <p style="font-size:.82rem;color:var(--clr-text-3);margin-bottom:16px">
          Còn ${attemptsLeft} lần thử lại.
        </p>` : ''}

      ${!passed && attemptsLeft === 0 ? `
        <p style="font-size:.82rem;color:var(--clr-danger);
                  background:rgba(239,68,68,.08);border:1px solid rgba(239,68,68,.15);
                  border-radius:8px;padding:10px 14px;margin-bottom:16px">
          Đã hết lượt thi. Vui lòng ôn lại và liên hệ support để thi lại.
        </p>` : ''}

      <!-- Breakdown -->
      ${breakdownHtml ? `
        <div style="background:var(--clr-surface);border:1px solid var(--clr-border);
                    border-radius:10px;padding:14px 16px;margin:12px 0 20px;text-align:left">
          <div style="font-size:.7rem;font-weight:700;text-transform:uppercase;
                      letter-spacing:.08em;color:var(--clr-text-3);margin-bottom:10px">
            Kết quả theo chủ đề
          </div>
          ${breakdownHtml}
        </div>` : ''}

      <div style="display:flex;gap:10px;justify-content:center;flex-wrap:wrap">
        ${!passed && attemptsLeft > 0
          ? `<button id="btn-ex-retry" class="btn btn--ghost">Thi lại</button>` : ''}
        <button id="btn-ex-review" class="btn btn--ghost">Xem đáp án</button>
        ${passed
          ? `<button id="btn-ex-cert" class="btn btn--primary">🎓 Nhận chứng chỉ →</button>`
          : `<button id="btn-ex-done" class="btn btn--ghost">Về Dashboard</button>`}
      </div>
    </div>`;

  $('btn-ex-retry')?.addEventListener('click', () => startFinalExam(ex.onComplete));
  $('btn-ex-review')?.addEventListener('click', showReview);
  $('btn-ex-cert')?.addEventListener('click', () => ex.onComplete?.(true));
  $('btn-ex-done')?.addEventListener('click', () => ex.onComplete?.(false));
};

// ── Review ─────────────────────────────────────────────────────
const showReview = () => {
  const keys = ['A', 'B', 'C', 'D'];
  $('quiz-content').innerHTML = `
    <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:16px">
      <h3 style="font-size:1rem;font-weight:700;color:var(--clr-text)">
        Xem lại đáp án — Final Exam
      </h3>
      <button id="btn-ex-review-back" class="btn btn--ghost" style="padding:6px 14px;font-size:.8rem">
        ← Quay lại
      </button>
    </div>

    ${ex.questions.map((q, i) => {
      const chosen  = ex.answers[i];
      const correct = q.correct;
      const isRight = chosen === correct;
      return `
        <div style="background:var(--clr-surface);
                    border:1px solid ${isRight ? 'rgba(34,197,94,.25)' : 'rgba(239,68,68,.25)'};
                    border-radius:12px;padding:18px;margin-bottom:10px">
          <div style="font-size:.7rem;font-weight:700;color:var(--clr-text-3);
                      font-family:'JetBrains Mono',monospace;margin-bottom:8px">
            Câu ${i + 1}${q.tag ? ` · ${q.tag.replace(/^Module \d+ — /, '')}` : ''} ·
            ${isRight
              ? '<span style="color:#22c55e">✓ Đúng</span>'
              : '<span style="color:#ef4444">✗ Sai</span>'}
          </div>
          <div style="font-size:.88rem;font-weight:600;color:var(--clr-text);margin-bottom:10px">
            ${q.text}
          </div>
          ${q.options.map((opt, j) => {
            let bg = 'transparent', clr = 'var(--clr-text-2)', border = 'var(--clr-border)';
            if (j === correct)     { bg = 'rgba(34,197,94,.1)'; clr = '#4ade80'; border = 'rgba(34,197,94,.3)'; }
            else if (j === chosen) { bg = 'rgba(239,68,68,.1)'; clr = '#f87171'; border = 'rgba(239,68,68,.3)'; }
            return `
              <div style="display:flex;gap:10px;padding:7px 12px;background:${bg};
                          border:1px solid ${border};border-radius:7px;margin-bottom:5px;
                          font-size:.82rem;color:${clr}">
                <span style="font-family:'JetBrains Mono',monospace;font-size:.68rem;
                             font-weight:700;min-width:16px">${keys[j]}</span>
                <span>${opt}</span>
                ${j === correct ? '<span style="margin-left:auto;font-size:.72rem">✓</span>' : ''}
              </div>`;
          }).join('')}
          ${q.explanation ? `
            <div style="margin-top:8px;padding:8px 12px;background:var(--clr-bg-3);
                        border-left:3px solid var(--clr-primary);border-radius:0 5px 5px 0;
                        font-size:.8rem;color:var(--clr-text-2)">
              💡 ${q.explanation}
            </div>` : ''}
        </div>`;
    }).join('')}`;

  $('btn-ex-review-back')?.addEventListener('click', showResult);
};

// ── Lưu Firestore ─────────────────────────────────────────────
// Trả về số lần thử còn lại
const saveExamResult = async (uid, score, passed) => {
  try {
    const ref  = doc(db, 'academy_learners', uid);
    const snap = await getDoc(ref);
    const data = snap.exists() ? snap.data() : {};

    const prev       = data.finalExam ?? {};
    const attempts   = typeof prev.attempts === 'number' ? prev.attempts + 1 : 1;
    const bestScore  = Math.max(typeof prev.bestScore === 'number' ? prev.bestScore : 0, score);
    const attemptsLeft = Math.max(0, MAX_ATTEMPTS - attempts);

    const update = {
      'finalExam.attempts':      attempts,
      'finalExam.bestScore':     bestScore,
      'finalExam.passed':        passed || (prev.passed === true),
      'finalExam.lastAttemptAt': serverTimestamp(),
      updatedAt: serverTimestamp(),
    };

    if (passed && !prev.passed) {
      update['finalExam.passedAt']  = serverTimestamp();
      update['completedFinalExam']  = true;
    }

    await updateDoc(ref, update);
    return attemptsLeft;
  } catch (err) {
    console.error('[FinalExam] saveExamResult failed:', err);
    return MAX_ATTEMPTS - 1;
  }
};

// ── Check attempts remaining ───────────────────────────────────
export const getFinalExamStatus = (progress) => {
  const fe         = progress?.finalExam ?? {};
  const attempts   = typeof fe.attempts  === 'number' ? fe.attempts  : 0;
  const passed     = fe.passed === true;
  const bestScore  = typeof fe.bestScore === 'number' ? fe.bestScore : null;
  const remaining  = Math.max(0, MAX_ATTEMPTS - attempts);
  return { attempts, passed, bestScore, remaining, canRetry: !passed && remaining > 0 };
};

// ── Public: start final exam ───────────────────────────────────
export const startFinalExam = async (onComplete) => {
  ex = { questions: [], current: 0, answers: [], answered: false, onComplete };

  // Header
  $('quiz-title').textContent          = 'Final Exam';
  $('quiz-progress-label').textContent = 'Đang tải…';

  // Switch to quiz view
  document.querySelectorAll('.view').forEach((v) => v.classList.add('hidden'));
  document.getElementById('view-quiz').classList.remove('hidden');
  document.getElementById('content-area')?.scrollTo({ top: 0, behavior: 'smooth' });

  // Load progress để check attempts
  const user = auth.currentUser;
  let examStatus = { attempts: 0, passed: false, remaining: MAX_ATTEMPTS, canRetry: true };
  if (user) {
    try {
      const snap = await getDoc(doc(db, 'academy_learners', user.uid));
      examStatus = getFinalExamStatus(snap.exists() ? snap.data() : {});
    } catch (e) { /* ignore */ }
  }

  // Đã pass trước đó
  if (examStatus.passed) {
    $('quiz-content').innerHTML = alreadyPassedScreen(examStatus);
    $('quiz-progress-label').textContent = 'Final Exam';
    $('btn-ex-to-cert')?.addEventListener('click', () => onComplete?.(true));
    return;
  }

  // Hết lượt
  if (!examStatus.canRetry) {
    $('quiz-content').innerHTML = noAttemptsScreen(examStatus);
    $('quiz-progress-label').textContent = 'Final Exam';
    $('btn-ex-home')?.addEventListener('click', () => onComplete?.(false));
    return;
  }

  // Intro screen
  $('quiz-content').innerHTML = introScreen(examStatus);
  $('quiz-progress-label').textContent = 'Final Exam';

  $('btn-ex-begin')?.addEventListener('click', async () => {
    const btn = $('btn-ex-begin');
    btn.disabled    = true;
    btn.textContent = 'Đang tải câu hỏi…';

    try {
      const pool       = await loadAllBanks();
      ex.questions     = shuffle(pool).slice(0, EXAM_QUESTIONS);
      ex.answers       = new Array(ex.questions.length).fill(undefined);
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

// ── Screen templates ───────────────────────────────────────────
const introScreen = ({ attempts, remaining }) => `
  <div style="background:var(--clr-surface);border:1px solid rgba(239,68,68,.2);
              border-radius:16px;padding:36px;text-align:center;max-width:560px;margin:0 auto">
    <div style="font-size:2.5rem;margin-bottom:12px">🏁</div>
    <div style="font-size:1.3rem;font-weight:800;color:var(--clr-text);margin-bottom:6px">
      Final Exam
    </div>
    <div style="font-size:.85rem;color:var(--clr-text-3);margin-bottom:24px">
      DEEPFENSE BASIC — Tổng hợp toàn khóa
    </div>

    <div style="display:flex;justify-content:center;gap:28px;margin-bottom:24px">
      <div style="text-align:center">
        <div style="font-size:1.8rem;font-weight:800;color:var(--clr-danger);
                    font-family:'JetBrains Mono',monospace">${EXAM_QUESTIONS}</div>
        <div style="font-size:.73rem;color:var(--clr-text-3)">Câu hỏi</div>
      </div>
      <div style="text-align:center">
        <div style="font-size:1.8rem;font-weight:800;color:var(--clr-warning);
                    font-family:'JetBrains Mono',monospace">${Math.round(PASS_THRESHOLD * 100)}%</div>
        <div style="font-size:.73rem;color:var(--clr-text-3)">Cần để đạt</div>
      </div>
      <div style="text-align:center">
        <div style="font-size:1.8rem;font-weight:800;
                    color:${remaining <= 1 ? 'var(--clr-danger)' : 'var(--clr-text)'};
                    font-family:'JetBrains Mono',monospace">${remaining}</div>
        <div style="font-size:.73rem;color:var(--clr-text-3)">Lượt còn lại</div>
      </div>
    </div>

    ${attempts > 0 ? `
      <div style="background:rgba(245,158,11,.08);border:1px solid rgba(245,158,11,.2);
                  border-radius:8px;padding:10px 14px;font-size:.82rem;color:var(--clr-warning);
                  margin-bottom:16px">
        ⚠ Lần thi trước chưa đạt. Đây là lần thứ ${attempts + 1} / ${MAX_ATTEMPTS}.
      </div>` : ''}

    <div style="background:var(--clr-bg-3);border:1px solid var(--clr-border);
                border-radius:8px;padding:12px 16px;text-align:left;
                font-size:.82rem;color:var(--clr-text-3);margin-bottom:20px">
      <div style="font-weight:600;color:var(--clr-text-2);margin-bottom:6px">Lưu ý:</div>
      <ul style="padding-left:16px;line-height:1.8">
        <li>Câu hỏi lấy ngẫu nhiên từ toàn bộ nội dung khóa học</li>
        <li>Câu trả lời được ghi lại ngay khi chọn — không thể đổi</li>
        <li>Tối đa ${MAX_ATTEMPTS} lần thi — không giới hạn thời gian</li>
        <li>Đạt → nhận chứng chỉ DEEPFENSE AWARE + 100 DPF</li>
      </ul>
    </div>

    <button id="btn-ex-begin" class="btn btn--primary" style="padding:13px 36px;font-size:1rem">
      Bắt đầu thi →
    </button>
    <div>
      <button class="btn btn--ghost" style="margin-top:12px;font-size:.8rem"
              onclick="window.navigateToDashboard()">← Về Dashboard</button>
    </div>
  </div>`;

const alreadyPassedScreen = ({ bestScore }) => `
  <div style="background:var(--clr-surface);border:1px solid rgba(34,197,94,.2);
              border-radius:16px;padding:36px;text-align:center;max-width:520px;margin:0 auto">
    <div style="font-size:2.5rem;margin-bottom:12px">🏆</div>
    <div style="font-size:1.2rem;font-weight:700;color:var(--clr-success);margin-bottom:8px">
      Bạn đã vượt qua Final Exam!
    </div>
    <div style="font-size:.85rem;color:var(--clr-text-3);margin-bottom:20px">
      Điểm cao nhất: <strong style="color:var(--clr-text)">${Math.round((bestScore ?? 0) * 100)}%</strong>
    </div>
    <button id="btn-ex-to-cert" class="btn btn--primary" style="padding:12px 28px">
      🎓 Xem chứng chỉ →
    </button>
    <div>
      <button class="btn btn--ghost" style="margin-top:10px;font-size:.8rem"
              onclick="window.navigateToDashboard()">← Dashboard</button>
    </div>
  </div>`;

const noAttemptsScreen = ({ bestScore }) => `
  <div style="background:var(--clr-surface);border:1px solid rgba(239,68,68,.2);
              border-radius:16px;padding:36px;text-align:center;max-width:520px;margin:0 auto">
    <div style="font-size:2.5rem;margin-bottom:12px">⛔</div>
    <div style="font-size:1.1rem;font-weight:700;color:var(--clr-danger);margin-bottom:8px">
      Đã hết ${MAX_ATTEMPTS} lượt thi
    </div>
    <div style="font-size:.85rem;color:var(--clr-text-3);margin-bottom:8px">
      Điểm cao nhất đạt được: <strong style="color:var(--clr-text)">${Math.round((bestScore ?? 0) * 100)}%</strong>
    </div>
    <div style="font-size:.82rem;color:var(--clr-text-3);margin-bottom:24px">
      Vui lòng ôn lại toàn bộ nội dung và liên hệ
      <a href="mailto:support@deepfense.online">support@deepfense.online</a>
      để yêu cầu thi lại.
    </div>
    <button id="btn-ex-home" class="btn btn--ghost">← Về Dashboard</button>
  </div>`;
