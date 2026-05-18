import React from 'react';
import { MODULES } from '../data/course.js';

export default function HomePage({ onStart, onSelectModule, completedLessons }) {
  const totalLessons = MODULES.reduce((sum, m) =>
    sum + m.sections.reduce((s2, sec) => s2 + sec.lessons.length, 0), 0);
  const totalDone = completedLessons.size;
  const pct = totalLessons > 0 ? Math.round((totalDone / totalLessons) * 100) : 0;

  const PART_LABELS = { intro: 'Khởi động', foundation: 'Nền tảng', recognition: 'Nhận diện', response: 'Ứng phó' };

  return (
    <div className="content">
      <div className="home-hero">
        {/* Badge */}
        <div className="home-badge">
          🛡️ DEEPFENSE BASICS v2
        </div>

        {/* Title */}
        <h1 className="home-title">
          Nhận diện &amp; phòng ngừa<br />
          <span>deepfake</span>
        </h1>

        <p className="home-desc">
          Khoá học {MODULES.length} module giúp bạn hiểu deepfake là gì, nhận diện các dấu hiệu nghi vấn
          trong hình ảnh, video và âm thanh, và bảo vệ bản thân trước các kịch bản lừa đảo phổ biến.
        </p>

        {/* Stats */}
        <div className="home-stats">
          <div className="home-stat">
            <span className="home-stat-num">{MODULES.length}</span>
            <span className="home-stat-label">Module</span>
          </div>
          <div className="home-stat">
            <span className="home-stat-num">{totalLessons}</span>
            <span className="home-stat-label">Bài học</span>
          </div>
          <div className="home-stat">
            <span className="home-stat-num">~9h</span>
            <span className="home-stat-label">Thời lượng</span>
          </div>
          {totalDone > 0 && (
            <div className="home-stat">
              <span className="home-stat-num" style={{ color: 'var(--green)' }}>{pct}%</span>
              <span className="home-stat-label">Hoàn thành</span>
            </div>
          )}
        </div>

        {/* CTA */}
        <button className="home-cta" onClick={onStart}>
          {totalDone > 0 ? 'Tiếp tục học →' : 'Bắt đầu khoá học →'}
        </button>
      </div>

      {/* Module grid */}
      <div className="home-modules">
        <div className="home-modules-title">Danh sách module</div>
        <div className="home-module-grid">
          {MODULES.map(mod => {
            const modLessons = mod.sections.reduce((s, sec) => s + sec.lessons.length, 0);
            const modDone = mod.sections.reduce((s, sec) =>
              s + sec.lessons.filter(l => completedLessons.has(l.id)).length, 0);
            const modPct = modLessons > 0 ? Math.round((modDone / modLessons) * 100) : 0;

            return (
              <div key={mod.id} className="home-module-card" onClick={() => onSelectModule(mod.id)}>
                <div className="home-module-card-num">
                  Module {mod.id} · {PART_LABELS[mod.part]}
                </div>
                <div className="home-module-card-title">{mod.title}</div>
                <div className="home-module-card-meta">
                  <span className="home-module-card-tag">⏱ {mod.duration}</span>
                  <span className="home-module-card-tag">{mod.level}</span>
                  {modDone > 0 && (
                    <span className="home-module-card-tag" style={{ color: 'var(--green)' }}>
                      {modPct}%
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
