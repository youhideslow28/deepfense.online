/**
 * QuizModal.jsx — Enhanced checkpoint quiz modal.
 *
 * Features (Phiên F):
 *  - Keyboard shortcuts: 1/2/3/4 select · Enter confirm/next · Esc close
 *  - Best score tracking per checkpoint (localStorage dfb_quiz_best_v1)
 *  - Answer review panel after finishing
 *  - Animated score count-up on result screen
 *  - Retry button — restart the same quiz from scratch
 *  - Question slide transition animation
 */
import React, { useState, useEffect, useRef, useCallback } from 'react';
import Confetti from './Confetti.jsx';

const LETTERS = ['A', 'B', 'C', 'D'];
const BEST_KEY = 'dfb_quiz_best_v1';

// ── Persistence helpers ────────────────────────────────────────────
function loadBest() {
  try { return JSON.parse(localStorage.getItem(BEST_KEY) || '{}'); }
  catch { return {}; }
}
function saveBestScore(label, pct) {
  const all = loadBest();
  if (all[label] == null || pct > all[label]) {
    all[label] = pct;
    try { localStorage.setItem(BEST_KEY, JSON.stringify(all)); } catch {}
  }
}

// ── Component ──────────────────────────────────────────────────────
export default function QuizModal({ quiz, label, onClose, onComplete }) {
  const [idx,        setIdx]        = useState(0);
  const [selected,   setSelected]   = useState(null);
  const [answered,   setAnswered]   = useState(false);
  const [score,      setScore]      = useState(0);
  const [answers,    setAnswers]    = useState([]); // { q, selected, correct }
  const [done,       setDone]       = useState(false);
  const [showReview, setShowReview] = useState(false);
  const [animScore,  setAnimScore]  = useState(0);
  const [slideDir,   setSlideDir]   = useState('right'); // 'right' | 'left'
  const [sliding,    setSliding]    = useState(false);

  const prevBest  = useRef(loadBest()[label] ?? null);
  const scoreRef  = useRef(score); // keep ref in sync for keyboard handler
  scoreRef.current = score;

  if (!quiz || quiz.length === 0) return null;

  const current  = quiz[idx];
  const progress = (idx / quiz.length) * 100;

  // ── Animated score count-up when done ─────────────────────────────
  useEffect(() => {
    if (!done) return;
    const finalScore = scoreRef.current;
    const pct = Math.round((finalScore / quiz.length) * 100);
    saveBestScore(label, pct);
    let val = 0;
    const step = Math.max(1, Math.ceil(pct / 35));
    const timer = setInterval(() => {
      val = Math.min(val + step, pct);
      setAnimScore(val);
      if (val >= pct) clearInterval(timer);
    }, 28);
    return () => clearInterval(timer);
  }, [done]);

  // ── Keyboard shortcuts ─────────────────────────────────────────────
  useEffect(() => {
    function onKey(e) {
      // Always: Esc closes
      if (e.key === 'Escape') { onClose(); return; }

      if (done) return;

      // 1-4: select option
      if (['1', '2', '3', '4'].includes(e.key)) {
        const i = parseInt(e.key, 10) - 1;
        if (!answered && i < current.options.length) setSelected(i);
        return;
      }

      // Enter: confirm or advance
      if (e.key === 'Enter') {
        e.preventDefault();
        if (!answered) {
          if (selected !== null) doSubmit();
        } else {
          doNext();
        }
      }
    }
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [done, answered, selected, idx]);

  // ── Quiz logic ─────────────────────────────────────────────────────
  function doSubmit() {
    if (selected === null) return;
    const correct = selected === current.answer;
    setAnswered(true);
    if (correct) setScore(s => s + 1);
    setAnswers(prev => [...prev, { q: current, selected, correct }]);
  }

  function doNext() {
    if (idx + 1 >= quiz.length) {
      setDone(true);
      return;
    }
    // slide animation
    setSlideDir('right');
    setSliding(true);
    setTimeout(() => {
      setIdx(i => i + 1);
      setSelected(null);
      setAnswered(false);
      setSliding(false);
    }, 200);
  }

  function doRetry() {
    setIdx(0);
    setSelected(null);
    setAnswered(false);
    setScore(0);
    setAnswers([]);
    setDone(false);
    setShowReview(false);
    setAnimScore(0);
    scoreRef.current = 0;
  }

  function optionCls(i) {
    if (!answered) return selected === i ? 'selected' : '';
    if (i === current.answer) return 'correct';
    if (i === selected && i !== current.answer) return 'wrong';
    return '';
  }

  // ── Result screen ──────────────────────────────────────────────────
  if (done) {
    const pct      = Math.round((score / quiz.length) * 100);
    const pass     = pct >= 70;
    const bestPrev = prevBest.current;
    const isNewBest = bestPrev == null || pct > bestPrev;

    return (
      <div className="modal-overlay" onClick={e => e.target === e.currentTarget && onClose()}>
        {pass && <Confetti count={60} duration={3500} />}
        <div className="modal modal-result">

          {/* Header */}
          <div className="modal-header">
            <div className="modal-header-left">
              <span className="modal-header-label">Checkpoint {label}</span>
              <span className="modal-header-title">Kết quả</span>
            </div>
            <button className="modal-close-btn" onClick={onClose} aria-label="Đóng">✕</button>
          </div>

          <div className="modal-body">
            {/* Score card */}
            <div className={`quiz-result-card ${pass ? 'pass' : 'fail'}`}>
              <div className="quiz-result-icon">{pass ? '🎉' : '📚'}</div>
              <div className={`quiz-result-score ${pass ? 'pass' : 'fail'}`}>{animScore}%</div>
              <div className="quiz-result-label">
                {pass ? 'Vượt qua checkpoint!' : 'Hãy ôn lại và thử lại nhé.'}
              </div>
              {isNewBest && bestPrev !== null && (
                <div className="quiz-new-best">🏆 Kỷ lục mới!</div>
              )}
            </div>

            {/* Stats row */}
            <div className="quiz-result-detail">
              <div className="quiz-result-stat">
                <div className="quiz-result-stat-num" style={{ color: 'var(--green)' }}>{score}</div>
                <div className="quiz-result-stat-label">Câu đúng</div>
              </div>
              <div className="quiz-result-stat">
                <div className="quiz-result-stat-num" style={{ color: 'var(--red)' }}>{quiz.length - score}</div>
                <div className="quiz-result-stat-label">Câu sai</div>
              </div>
              <div className="quiz-result-stat">
                <div className="quiz-result-stat-num" style={{ color: 'var(--cyan)' }}>
                  {bestPrev != null ? `${Math.max(pct, bestPrev)}%` : `${pct}%`}
                </div>
                <div className="quiz-result-stat-label">Cao nhất</div>
              </div>
            </div>

            {/* Review toggle */}
            <button
              className="quiz-review-toggle"
              onClick={() => setShowReview(r => !r)}
            >
              {showReview ? '▲ Ẩn xem lại' : '▼ Xem lại đáp án'}
            </button>

            {/* Answer review panel */}
            {showReview && (
              <div className="quiz-review-panel">
                {answers.map((a, i) => (
                  <div key={i} className={`quiz-review-item ${a.correct ? 'correct' : 'wrong'}`}>
                    <div className="quiz-review-item-header">
                      <span className="quiz-review-num">Câu {i + 1}</span>
                      <span className={`quiz-review-badge ${a.correct ? 'correct' : 'wrong'}`}>
                        {a.correct ? '✓ Đúng' : '✗ Sai'}
                      </span>
                    </div>
                    <div className="quiz-review-question">{a.q.text}</div>
                    {!a.correct && (
                      <div className="quiz-review-answers">
                        <div className="quiz-review-yours">
                          Bạn chọn: <strong>{LETTERS[a.selected]}. {a.q.options[a.selected]}</strong>
                        </div>
                        <div className="quiz-review-correct">
                          Đáp án đúng: <strong>{LETTERS[a.q.answer]}. {a.q.options[a.q.answer]}</strong>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="modal-footer">
            <button className="modal-footer-skip quiz-retry-btn" onClick={doRetry}>
              ↺ Làm lại
            </button>
            <button className="btn-primary" onClick={() => onComplete(score, quiz.length)}>
              {pass ? 'Tiếp tục học →' : 'Quay lại bài học'}
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ── Question screen ────────────────────────────────────────────────
  return (
    <div className="modal-overlay" onClick={e => e.target === e.currentTarget && onClose()}>
      <div className="modal">

        {/* Header */}
        <div className="modal-header">
          <div className="modal-header-left">
            <span className="modal-header-label">Checkpoint {label}</span>
            <span className="modal-header-title">Câu hỏi {idx + 1}</span>
          </div>
          <span className="modal-header-progress">{idx + 1} / {quiz.length}</span>
        </div>

        <div className="modal-body">
          {/* Progress bar */}
          <div className="quiz-progress-bar">
            <div className="quiz-progress-fill" style={{ width: `${progress}%` }} />
          </div>

          {/* Question + options with slide class */}
          <div className={`quiz-question-wrap${sliding ? ' sliding' : ''}`}>
            <p className="quiz-question">{current.text}</p>

            <div className="quiz-options">
              {current.options.map((opt, i) => (
                <button
                  key={i}
                  className={`quiz-option ${optionCls(i)}`}
                  onClick={() => !answered && setSelected(i)}
                  disabled={answered}
                >
                  <span className="quiz-option-letter">{LETTERS[i]}</span>
                  <span className="quiz-option-text">{opt}</span>
                  {!answered && selected !== i && (
                    <kbd className="quiz-option-kbd">{i + 1}</kbd>
                  )}
                </button>
              ))}
            </div>

            {answered && (
              <div className={`quiz-feedback ${selected === current.answer ? 'correct-fb' : 'wrong-fb'}`}>
                {selected === current.answer
                  ? '✓ Chính xác!'
                  : `✗ Đáp án đúng là: ${LETTERS[current.answer]}. ${current.options[current.answer]}`}
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="modal-footer">
          <button className="modal-footer-skip" onClick={onClose}>Bỏ qua</button>
          <div className="modal-footer-right">
            <span className="quiz-kbd-hint">
              {!answered
                ? <><kbd>1</kbd>–<kbd>{current.options.length}</kbd> chọn · <kbd>Enter</kbd> xác nhận</>
                : <><kbd>Enter</kbd> {idx + 1 >= quiz.length ? 'xem kết quả' : 'câu tiếp'}</>
              }
            </span>
            {!answered ? (
              <button
                className="btn-primary"
                onClick={doSubmit}
                disabled={selected === null}
                style={{ opacity: selected === null ? 0.5 : 1 }}
              >
                Xác nhận
              </button>
            ) : (
              <button className="btn-primary" onClick={doNext}>
                {idx + 1 >= quiz.length ? 'Xem kết quả →' : 'Câu tiếp →'}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
