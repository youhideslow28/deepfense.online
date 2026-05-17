import React, { useState } from 'react';
import { MODULES } from '../data/course.js';

export default function Sidebar({ currentLesson, completedLessons, onSelectLesson, lessonIndex, onHome }) {
  const [openModules, setOpenModules] = useState(() => {
    const init = {};
    if (currentLesson) init[currentLesson.moduleId] = true;
    else init[0] = true;
    return init;
  });

  function toggleModule(id) {
    setOpenModules(prev => ({ ...prev, [id]: !prev[id] }));
  }

  function getModuleStats(mod) {
    let total = 0, done = 0;
    for (const sec of mod.sections) {
      for (const les of sec.lessons) {
        total++;
        if (completedLessons.has(les.id)) done++;
      }
    }
    return { total, done };
  }

  const totalLessons = lessonIndex.length;
  const totalDone = completedLessons.size;
  const pct = totalLessons > 0 ? Math.round((totalDone / totalLessons) * 100) : 0;

  return (
    <aside className="sidebar">
      {/* Logo — clickable home */}
      <button className="sidebar-logo" onClick={onHome} title="Về trang chủ">
        <div className="sidebar-logo-icon">DF</div>
        <div className="sidebar-logo-text">
          Deepfense
          <span>BASICS</span>
        </div>
      </button>

      {/* Global progress */}
      <div className="sidebar-progress-wrap">
        <div className="sidebar-progress-label">
          <span>Tiến độ khoá học</span>
          <strong>{pct}%</strong>
        </div>
        <div className="sidebar-progress-bar">
          <div className="sidebar-progress-fill" style={{ width: `${pct}%` }} />
        </div>
      </div>

      {/* Module nav */}
      <nav className="sidebar-nav" aria-label="Course navigation">
        {MODULES.map(mod => {
          const { total, done } = getModuleStats(mod);
          const isModActive = currentLesson?.moduleId === mod.id;
          const isOpen = openModules[mod.id];
          const statusCls = done === total && total > 0 ? 'done' : 'empty';
          const statusIcon = done === total && total > 0 ? '✓' : '';

          return (
            <div className="sidebar-module" key={mod.id}>
              <button
                className={`sidebar-module-header ${isModActive ? 'active' : ''}`}
                onClick={() => toggleModule(mod.id)}
                aria-expanded={isOpen}
              >
                <span className="sidebar-module-num">{mod.id}</span>
                <span className="sidebar-module-title">{mod.title}</span>
                <span className={`sidebar-module-status ${statusCls}`}>{statusIcon}</span>
                <span className={`sidebar-module-chevron ${isOpen ? 'open' : ''}`}>▶</span>
              </button>

              {isOpen && (
                <div className="sidebar-lessons">
                  {mod.sections.map((sec, si) => (
                    <div key={si}>
                      <div className="sidebar-section-label">{sec.title}</div>
                      {sec.lessons.map(les => {
                        const isDone = completedLessons.has(les.id);
                        const isActive = currentLesson?.lesson?.id === les.id;
                        return (
                          <button
                            key={les.id}
                            className={`sidebar-lesson ${isActive ? 'active' : ''} ${isDone ? 'done' : ''}`}
                            onClick={() => onSelectLesson(mod.id, les.id)}
                          >
                            <span className="sidebar-lesson-dot" />
                            <span className="sidebar-lesson-title">{les.title}</span>
                          </button>
                        );
                      })}
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </nav>
    </aside>
  );
}
