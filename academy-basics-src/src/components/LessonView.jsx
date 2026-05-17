import React, { useState } from 'react';
import QuizModal from './QuizModal.jsx';

export default function LessonView({
  lessonIndex, currentIdx, currentEntry,
  completedLessons, onNext, onPrev, onComplete,
}) {
  const [showQuiz, setShowQuiz] = useState(false);
  const [quizDone, setQuizDone] = useState(false);

  const { lesson, moduleId, sectionTitle, checkpoint } = currentEntry;
  const isFirst = currentIdx === 0;
  const isLast = currentIdx === lessonIndex.length - 1;

  // Last lesson in this section (regardless of checkpoint)
  const isLastInSection = (() => {
    const next = lessonIndex[currentIdx + 1];
    if (!next) return true;
    return next.sectionTitle !== sectionTitle || next.moduleId !== moduleId;
  })();

  // Show takeaways only: module >= 1, last lesson of section, data exists
  const showTakeaways = moduleId >= 1 && isLastInSection
    && lesson.takeaways && lesson.takeaways.length > 0;

  const isDone = completedLessons.has(lesson.id);

  function handleNext() {
    onComplete(lesson.id);
    if (isLastInSection && checkpoint && !quizDone) {
      setShowQuiz(true);
    } else {
      onNext();
    }
  }

  function handleQuizComplete(score, total) {
    setQuizDone(true);
    setShowQuiz(false);
    onNext();
  }

  return (
    <div className="content">
      <div className="lesson-wrap">
        {/* Meta */}
        <div className="lesson-meta">
          <span className="lesson-module-tag">Module {moduleId}</span>
          <span className="lesson-id-tag">{lesson.id}</span>
        </div>

        {/* Title */}
        <h1 className="lesson-title">{lesson.title}</h1>
        <div className="lesson-divider" />

        {/* Body */}
        <div className="lesson-body">
          {lesson.paragraphs.map((p, i) => (
            <p key={i} className="lesson-para" dangerouslySetInnerHTML={{ __html: p }} />
          ))}
        </div>

        {/* Takeaways — only last lesson of section, module 1+ */}
        {showTakeaways && (
          <div className="lesson-takeaways">
            <div className="lesson-takeaways-title">Điểm ghi nhớ</div>
            {lesson.takeaways.map((t, i) => (
              <div key={i} className="lesson-takeaway-item">{t}</div>
            ))}
          </div>
        )}

        {/* Checkpoint notice */}
        {isLastInSection && checkpoint && !quizDone && (
          <div className="checkpoint-notice">
            <span className="checkpoint-icon">📝</span>
            <div className="checkpoint-info">
              <h4>Checkpoint {checkpoint.label}</h4>
              <p>{checkpoint.questions.length} câu hỏi kiểm tra kiến thức section này.</p>
            </div>
            <button className="checkpoint-btn" onClick={() => setShowQuiz(true)}>
              Làm checkpoint →
            </button>
          </div>
        )}

        {/* Nav */}
        <div className="lesson-nav">
          <button className="lesson-nav-btn" onClick={onPrev} disabled={isFirst}>
            ← Bài trước
          </button>
          <button
            className={`lesson-nav-btn ${isLast ? '' : 'primary'}`}
            onClick={handleNext}
            disabled={isLast && isDone}
          >
            {isLast ? (isDone ? '✓ Hoàn thành' : 'Hoàn thành khoá học') : 'Bài tiếp →'}
          </button>
        </div>
      </div>

      {/* Quiz modal */}
      {showQuiz && checkpoint && (
        <QuizModal
          quiz={checkpoint.questions}
          label={checkpoint.label}
          onClose={() => setShowQuiz(false)}
          onComplete={handleQuizComplete}
        />
      )}
    </div>
  );
}
