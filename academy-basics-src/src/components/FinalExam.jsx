import React, { useState, useMemo } from 'react';
import { EXAM_CONFIG, drawExam } from '../data/exam-bank.js';

const STORAGE_KEY  = 'dfb_exam_v1';
const PAGE_SIZE    = 10;

function loadStore() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw);
  } catch {}
  return { attempts: 0, passed: false, bestScore: 0 };
}

function saveStore(s) {
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify(s)); } catch {}
}

// ── helpers ──────────────────────────────────────────────────────────────────
const LABELS = ['A', 'B', 'C', 'D'];

export default function FinalExam({ onComplete, completedLessons }) {
  const [store,     setStore]     = useState(() => loadStore());
  const [phase,     setPhase]     = useState('intro');   // intro | exam | result
  const [questions, setQuestions] = useState([]);
  const [answers,   setAnswers]   = useState({});        // { id: idx }
  const [page,      setPage]      = useState(0);
  const [result,    setResult]    = useState(null);

  const { questionsPerAttempt, passingScore, passingPercent, maxAttempts } = EXAM_CONFIG;
  const totalPages  = Math.ceil(questionsPerAttempt / PAGE_SIZE);
  const answeredCnt = Object.keys(answers).length;
  const allAnswered = answeredCnt === questionsPerAttempt;
  const alreadyPassed = completedLessons?.has('final-exam') || store.passed;

  // ── actions ────────────────────────────────────────────────────────────────
  function handleStart() {
    setQuestions(drawExam());
    setAnswers({});
    setPage(0);
    setPhase('exam');
  }

  function handleAnswer(id, idx) {
    setAnswers(prev => ({ ...prev, [id]: idx }));
  }

  function handleSubmit() {
    const score = questions.reduce(
      (sum, q) => sum + (answers[q.id] === q.answer ? 1 : 0), 0,
    );
    const passed    = score >= passingScore;
    const newStore  = {
      attempts:  store.attempts + 1,
      passed:    store.passed || passed,
      bestScore: Math.max(store.bestScore || 0, score),
      // Store passedAt only on first pass so the certificate shows correct date
      ...(passed && !store.passed ? { passedAt: Date.now() } : {}),
      ...(store.passedAt ? { passedAt: store.passedAt } : {}),
    };
    saveStore(newStore);
    setStore(newStore);
    setResult({ score, passed });
    setPhase('result');
    if (passed) onComplete?.('final-exam');
  }

  // ── page slice ─────────────────────────────────────────────────────────────
  const pageQuestions = useMemo(() => {
    const start = page * PAGE_SIZE;
    return questions.slice(start, start + PAGE_SIZE);
  }, [questions, page]);

  const pageAnswered = pageQuestions.filter(q => answers[q.id] !== undefined).length;

  // ── INTRO ──────────────────────────────────────────────────────────────────
  if (phase === 'intro') {
    const canRetry  = store.attempts < maxAttempts && !store.passed;
    const exhausted = store.attempts >= maxAttempts && !store.passed;

    return (
      <div className="content">
        <div className="exam-intro-wrap">
          <div className="exam-intro-badge">🎓 Bài kiểm tra cuối khóa</div>
          <h1 className="exam-intro-title">DEEPFENSE BASIC<br /><span>Final Exam</span></h1>

          {alreadyPassed && (
            <div className="exam-passed-card">
              <div className="exam-passed-icon">🏅</div>
              <div className="exam-passed-text">
                <strong>Bạn đã hoàn thành khoá học!</strong>
                <span>Điểm cao nhất: {store.bestScore}/{questionsPerAttempt} · {Math.round(store.bestScore / questionsPerAttempt * 100)}%</span>
              </div>
            </div>
          )}

          <div className="exam-rules">
            <div className="exam-rule"><span className="exam-rule-icon">📋</span><span><strong>{questionsPerAttempt} câu hỏi</strong> chọn ngẫu nhiên từ ngân hàng 150 câu</span></div>
            <div className="exam-rule"><span className="exam-rule-icon">✅</span><span>Đạt khi trả lời đúng <strong>≥ {passingScore}/{questionsPerAttempt}</strong> câu ({passingPercent}%)</span></div>
            <div className="exam-rule"><span className="exam-rule-icon">🔄</span><span>Tối đa <strong>{maxAttempts} lần</strong> thử · đã thử <strong>{store.attempts}</strong> lần</span></div>
            <div className="exam-rule"><span className="exam-rule-icon">💡</span><span>Giải thích hiện sau khi nộp bài</span></div>
          </div>

          {exhausted && !store.passed ? (
            <div className="exam-exhausted">
              Bạn đã dùng hết {maxAttempts} lần thử. Hãy ôn lại các module và thử lại sau.
            </div>
          ) : (
            <button className="exam-start-btn" onClick={handleStart}>
              {store.attempts === 0 ? 'Bắt đầu thi →' : alreadyPassed ? 'Thi lại →' : `Thi lần ${store.attempts + 1} →`}
            </button>
          )}
        </div>
      </div>
    );
  }

  // ── EXAM ───────────────────────────────────────────────────────────────────
  if (phase === 'exam') {
    return (
      <div className="content">
        <div className="exam-wrap">
          {/* Header */}
          <div className="exam-header">
            <div className="exam-header-title">DEEPFENSE BASIC — Final Exam</div>
            <div className="exam-header-progress">
              <span className="exam-header-count">{answeredCnt}/{questionsPerAttempt} đã trả lời</span>
              <div className="exam-progress-bar">
                <div className="exam-progress-fill" style={{ width: `${(answeredCnt / questionsPerAttempt) * 100}%` }} />
              </div>
            </div>
          </div>

          {/* Questions */}
          <div className="exam-questions">
            {pageQuestions.map((q, qi) => {
              const globalIdx = page * PAGE_SIZE + qi;
              const chosen    = answers[q.id];
              return (
                <div key={q.id} className="exam-question">
                  <div className="exam-q-num">Câu {globalIdx + 1}</div>
                  <div className="exam-q-text">{q.text}</div>
                  <div className="exam-options">
                    {q.options.map((opt, oi) => (
                      <label
                        key={oi}
                        className={`exam-option ${chosen === oi ? 'selected' : ''}`}
                      >
                        <input
                          type="radio"
                          name={q.id}
                          checked={chosen === oi}
                          onChange={() => handleAnswer(q.id, oi)}
                        />
                        <span className="exam-option-label">{LABELS[oi]}</span>
                        <span className="exam-option-text">{opt}</span>
                      </label>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Pagination */}
          <div className="exam-pagination">
            <button
              className="exam-page-btn"
              onClick={() => setPage(p => p - 1)}
              disabled={page === 0}
            >← Trang trước</button>

            <div className="exam-page-dots">
              {Array.from({ length: totalPages }, (_, i) => {
                const start  = i * PAGE_SIZE;
                const pSlice = questions.slice(start, start + PAGE_SIZE);
                const done   = pSlice.filter(q => answers[q.id] !== undefined).length;
                const full   = done === pSlice.length;
                return (
                  <button
                    key={i}
                    className={`exam-page-dot ${i === page ? 'active' : ''} ${full ? 'full' : ''}`}
                    onClick={() => setPage(i)}
                  >
                    {i + 1}
                  </button>
                );
              })}
            </div>

            {page < totalPages - 1 ? (
              <button className="exam-page-btn" onClick={() => setPage(p => p + 1)}>
                Trang sau →
              </button>
            ) : (
              <button
                className={`exam-page-btn submit ${allAnswered ? 'ready' : ''}`}
                onClick={handleSubmit}
                disabled={!allAnswered}
                title={!allAnswered ? `Còn ${questionsPerAttempt - answeredCnt} câu chưa trả lời` : ''}
              >
                {allAnswered ? 'Nộp bài ✓' : `Nộp bài (còn ${questionsPerAttempt - answeredCnt} câu)`}
              </button>
            )}
          </div>

          <div className="exam-page-info">
            Trang {page + 1}/{totalPages} · {pageAnswered}/{pageQuestions.length} câu trên trang này đã trả lời
          </div>
        </div>
      </div>
    );
  }

  // ── RESULT ─────────────────────────────────────────────────────────────────
  if (phase === 'result' && result) {
    const pct = Math.round((result.score / questionsPerAttempt) * 100);
    return (
      <div className="content">
        <div className="exam-result-wrap">
          {/* Score card */}
          <div className={`exam-score-card ${result.passed ? 'pass' : 'fail'}`}>
            <div className="exam-score-badge">{result.passed ? '🎉 Đạt!' : '📚 Chưa đạt'}</div>
            <div className="exam-score-num">{result.score}<span>/{questionsPerAttempt}</span></div>
            <div className="exam-score-pct">{pct}%</div>
            <div className="exam-score-sub">
              {result.passed
                ? 'Chúc mừng! Bạn đã hoàn thành DEEPFENSE BASIC.'
                : `Cần đạt ${passingScore}/${questionsPerAttempt} (${passingPercent}%) để qua. Còn ${maxAttempts - store.attempts} lần thử.`}
            </div>
          </div>

          {/* Action buttons */}
          <div className="exam-result-actions">
            <button className="exam-result-btn secondary" onClick={() => setPhase('intro')}>
              ← Về màn hình thi
            </button>
            {!result.passed && store.attempts < maxAttempts && (
              <button className="exam-result-btn primary" onClick={handleStart}>
                Thi lại →
              </button>
            )}
          </div>

          {/* Certificate CTA — only when passed */}
          {result.passed && (
            <div className="exam-cert-cta">
              <div className="exam-cert-cta-inner">
                <div className="exam-cert-cta-icon">🎓</div>
                <div className="exam-cert-cta-body">
                  <div className="exam-cert-cta-title">Chứng chỉ DEEPFENSE AWARE</div>
                  <div className="exam-cert-cta-sub">Nhận và tải về chứng chỉ hoàn thành khoá học của bạn.</div>
                </div>
                <a
                  className="exam-cert-cta-btn"
                  href="../certificate-template/certificate-template.html"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Xem chứng chỉ →
                </a>
              </div>
            </div>
          )}

          {/* Review */}
          <div className="exam-review">
            <div className="exam-review-title">Xem lại kết quả</div>
            {questions.map((q, i) => {
              const chosen  = result ? answers[q.id] : undefined;
              const correct = chosen === q.answer;
              return (
                <div key={q.id} className={`exam-review-item ${correct ? 'correct' : 'wrong'}`}>
                  <div className="exam-review-header">
                    <span className="exam-review-num">Câu {i + 1}</span>
                    <span className="exam-review-status">{correct ? '✓ Đúng' : '✗ Sai'}</span>
                  </div>
                  <div className="exam-review-q">{q.text}</div>
                  <div className="exam-review-options">
                    {q.options.map((opt, oi) => {
                      const isChosen  = chosen === oi;
                      const isCorrect = q.answer === oi;
                      let cls = 'exam-review-opt';
                      if (isCorrect) cls += ' correct-ans';
                      else if (isChosen && !isCorrect) cls += ' wrong-ans';
                      return (
                        <div key={oi} className={cls}>
                          <span className="exam-review-opt-lbl">{LABELS[oi]}</span>
                          <span>{opt}</span>
                          {isCorrect && <span className="exam-review-tick">✓</span>}
                          {isChosen && !isCorrect && <span className="exam-review-cross">✗</span>}
                        </div>
                      );
                    })}
                  </div>
                  {!correct && (
                    <div className="exam-review-explain">💡 {q.explanation}</div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }

  return null;
}
