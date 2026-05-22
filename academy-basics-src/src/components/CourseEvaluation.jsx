import React, { useMemo, useState } from 'react';

const SESSION_KEY = 'dfb_session_v1';
const EVALUATION_KEY = 'deepfense-basics-course-evaluation';

function readSession() {
  try {
    const session = JSON.parse(localStorage.getItem(SESSION_KEY) || 'null');
    return typeof session?.uid === 'string' && session.uid ? session : null;
  } catch {
    return null;
  }
}

function scopedKey(baseKey) {
  const uid = readSession()?.uid;
  return uid ? `${baseKey}:${uid}` : baseKey;
}

export function isCourseEvaluationDone() {
  try {
    const raw = localStorage.getItem(scopedKey(EVALUATION_KEY));
    if (!raw) return false;
    const parsed = JSON.parse(raw);
    const uid = readSession()?.uid;
    return !!parsed?.submittedAt && (!parsed.uid || parsed.uid === uid);
  } catch {
    return false;
  }
}

function saveEvaluation(payload) {
  try {
    const session = readSession();
    localStorage.setItem(scopedKey(EVALUATION_KEY), JSON.stringify({
      ...payload,
      uid: session?.uid,
      email: session?.email,
      submittedAt: Date.now(),
      course: 'DEEPFENSE BASIC',
      version: 1,
    }));
  } catch {}
}

const SCALE = [1, 2, 3, 4, 5];

export default function CourseEvaluation({ onComplete }) {
  const [ratings, setRatings] = useState({
    clarity: 0,
    usefulness: 0,
    confidence: 0,
    interface: 0,
  });
  const [pace, setPace] = useState('');
  const [mostUseful, setMostUseful] = useState('');
  const [improvement, setImprovement] = useState('');
  const [submitted, setSubmitted] = useState(() => isCourseEvaluationDone());

  const allRated = useMemo(
    () => Object.values(ratings).every(value => value > 0),
    [ratings],
  );
  const canSubmit = allRated && pace && mostUseful.trim().length >= 8;

  function setRating(key, value) {
    setRatings(prev => ({ ...prev, [key]: value }));
  }

  function handleSubmit(event) {
    event.preventDefault();
    if (!canSubmit) return;
    saveEvaluation({ ratings, pace, mostUseful: mostUseful.trim(), improvement: improvement.trim() });
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div className="content">
        <div className="course-eval-wrap">
          <div className="course-eval-complete">
            <div className="course-eval-complete-mark">✓</div>
            <h1>Đã ghi nhận đánh giá khóa học</h1>
            <p>Cảm ơn bạn. Bài kiểm tra tốt nghiệp đã được mở khóa.</p>
            <button className="exam-start-btn" onClick={onComplete}>
              Vào bài thi tốt nghiệp →
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="content">
      <form className="course-eval-wrap" onSubmit={handleSubmit}>
        <div className="course-eval-head">
          <div className="exam-intro-badge">Đánh giá bắt buộc trước Final Exam</div>
          <h1 className="course-eval-title">Trước khi tốt nghiệp</h1>
          <p className="course-eval-desc">
            Hãy dành một phút phản hồi về trải nghiệm học. Phần này giúp DEEPFENSE cải thiện khóa học và là điều kiện mở bài kiểm tra cuối khóa.
          </p>
        </div>

        <div className="course-eval-panel">
          <RatingRow
            label="Nội dung dễ hiểu"
            hint="Khái niệm, ví dụ và tình huống có rõ ràng không?"
            value={ratings.clarity}
            onChange={value => setRating('clarity', value)}
          />
          <RatingRow
            label="Có ích trong đời sống"
            hint="Bạn có thể áp dụng vào gia đình, học tập hoặc công việc không?"
            value={ratings.usefulness}
            onChange={value => setRating('usefulness', value)}
          />
          <RatingRow
            label="Tự tin xử lý tình huống"
            hint="Sau khóa học, bạn có tự tin dừng lại, kiểm chứng và báo cáo hơn không?"
            value={ratings.confidence}
            onChange={value => setRating('confidence', value)}
          />
          <RatingRow
            label="Trải nghiệm học tập"
            hint="Bố cục, quiz, điều hướng và tốc độ học có ổn không?"
            value={ratings.interface}
            onChange={value => setRating('interface', value)}
          />
        </div>

        <div className="course-eval-panel">
          <div className="course-eval-field">
            <label>Tốc độ khóa học phù hợp với bạn không?</label>
            <div className="course-eval-segments">
              {['Hơi nhanh', 'Vừa đủ', 'Hơi chậm'].map(option => (
                <button
                  type="button"
                  key={option}
                  className={`course-eval-segment${pace === option ? ' active' : ''}`}
                  onClick={() => setPace(option)}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>

          <div className="course-eval-field">
            <label>Phần nào hữu ích nhất với bạn?</label>
            <textarea
              value={mostUseful}
              onChange={event => setMostUseful(event.target.value)}
              placeholder="Ví dụ: quy trình Deepfense Check, Family Code, cách xử lý ảnh nhạy cảm..."
              rows={3}
            />
          </div>

          <div className="course-eval-field">
            <label>Góp ý cải thiện nếu có</label>
            <textarea
              value={improvement}
              onChange={event => setImprovement(event.target.value)}
              placeholder="Bạn muốn thêm ví dụ, video, bài tập hay cách giải thích nào?"
              rows={3}
            />
          </div>
        </div>

        <div className="course-eval-footer">
          <p>{canSubmit ? 'Bạn đã đủ điều kiện gửi đánh giá.' : 'Hãy chấm đủ 4 mục, chọn tốc độ học và viết phần hữu ích nhất.'}</p>
          <button className="exam-start-btn" type="submit" disabled={!canSubmit}>
            Gửi đánh giá và mở bài thi →
          </button>
        </div>
      </form>
    </div>
  );
}

function RatingRow({ label, hint, value, onChange }) {
  return (
    <div className="course-eval-rating">
      <div>
        <strong>{label}</strong>
        <span>{hint}</span>
      </div>
      <div className="course-eval-scale" aria-label={label}>
        {SCALE.map(score => (
          <button
            type="button"
            key={score}
            className={score <= value ? 'active' : ''}
            onClick={() => onChange(score)}
            aria-label={`${score} điểm`}
          >
            {score}
          </button>
        ))}
      </div>
    </div>
  );
}
