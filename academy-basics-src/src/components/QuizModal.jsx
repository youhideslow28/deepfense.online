import React, { useState } from 'react';
import Confetti from './Confetti.jsx';

const LETTERS = ['A', 'B', 'C', 'D'];

export default function QuizModal({ quiz, label, onClose, onComplete }) {
  const [idx, setIdx] = useState(0);
  const [selected, setSelected] = useState(null);
  const [answered, setAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [done, setDone] = useState(false);

  if (!quiz || quiz.length === 0) return null;

  const current = quiz[idx];
  const isCorrect = selected === current.answer;
  const progress = ((idx) / quiz.length) * 100;

  function handleSelect(i) {
    if (answered) return;
    setSelected(i);
  }

  function handleSubmit() {
    if (selected === null) return;
    setAnswered(true);
    if (isCorrect) setScore(s => s + 1);
  }

  function handleNext() {
    if (idx + 1 >= quiz.length) {
      setDone(true);
    } else {
      setIdx(i => i + 1);
      setSelected(null);
      setAnswered(false);
    }
  }

  function optionCls(i) {
    if (!answered) return selected === i ? 'selected' : '';
    if (i === current.answer) return 'correct';
    if (i === selected && i !== current.answer) return 'wrong';
    return '';
  }

  if (done) {
    const pct = Math.round((score / quiz.length) * 100);
    const pass = pct >= 70;
    return (
      <div className="modal-overlay" onClick={e => e.target === e.currentTarget && onClose()}>
        {pass && <Confetti count={60} duration={3500} />}
        <div className="modal">
          <div className="modal-header">
            <div className="modal-header-left">
              <span className="modal-header-label">Checkpoint {label}</span>
              <span className="modal-header-title">Kết quả</span>
            </div>
          </div>
          <div className="modal-body">
            <div className={`quiz-result-card ${pass ? 'pass' : 'fail'}`}>
              <div className="quiz-result-icon">{pass ? '🎉' : '📚'}</div>
              <div className={`quiz-result-score ${pass ? 'pass' : 'fail'}`}>{pct}%</div>
              <div className="quiz-result-label">
                {pass ? 'Vượt qua checkpoint!' : 'Hãy ôn lại và thử tiếp nhé.'}
              </div>
            </div>
            <div className="quiz-result-detail">
              <div className="quiz-result-stat">
                <div className="quiz-result-stat-num" style={{ color: 'var(--green)' }}>{score}</div>
                <div className="quiz-result-stat-label">Câu đúng</div>
              </div>
              <div className="quiz-result-stat">
                <div className="quiz-result-stat-num" style={{ color: 'var(--red)' }}>{quiz.length - score}</div>
                <div className="quiz-result-stat-label">Câu sai</div>
              </div>
            </div>
          </div>
          <div className="modal-footer">
            <button className="modal-footer-skip" onClick={onClose}>Đóng</button>
            <button className="btn-primary" onClick={() => onComplete(score, quiz.length)}>
              {pass ? 'Tiếp tục học →' : 'Quay lại bài học'}
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="modal-overlay" onClick={e => e.target === e.currentTarget && onClose()}>
      <div className="modal">
        <div className="modal-header">
          <div className="modal-header-left">
            <span className="modal-header-label">Checkpoint {label}</span>
            <span className="modal-header-title">Câu hỏi {idx + 1}</span>
          </div>
          <span className="modal-header-progress">{idx + 1} / {quiz.length}</span>
        </div>

        <div className="modal-body">
          <div className="quiz-progress-bar">
            <div className="quiz-progress-fill" style={{ width: `${progress}%` }} />
          </div>

          <p className="quiz-question">{current.text}</p>

          <div className="quiz-options">
            {current.options.map((opt, i) => (
              <button
                key={i}
                className={`quiz-option ${optionCls(i)}`}
                onClick={() => handleSelect(i)}
                disabled={answered}
              >
                <span className="quiz-option-letter">{LETTERS[i]}</span>
                {opt}
              </button>
            ))}
          </div>

          {answered && (
            <div className={`quiz-feedback ${isCorrect ? 'correct-fb' : 'wrong-fb'}`}>
              {isCorrect
                ? '✓ Chính xác!'
                : `✗ Đáp án đúng là: ${LETTERS[current.answer]}. ${current.options[current.answer]}`}
            </div>
          )}
        </div>

        <div className="modal-footer">
          <button className="modal-footer-skip" onClick={onClose}>Bỏ qua checkpoint</button>
          {!answered ? (
            <button
              className="btn-primary"
              onClick={handleSubmit}
              disabled={selected === null}
              style={{ opacity: selected === null ? 0.5 : 1 }}
            >
              Xác nhận
            </button>
          ) : (
            <button className="btn-primary" onClick={handleNext}>
              {idx + 1 >= quiz.length ? 'Xem kết quả →' : 'Câu tiếp →'}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
