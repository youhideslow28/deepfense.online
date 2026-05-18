import React, { useState, useEffect, useMemo } from 'react';
import { MODULES, buildLessonIndex } from './data/course.js';
import Sidebar from './components/Sidebar.jsx';
import LessonView from './components/LessonView.jsx';
import HomePage from './components/HomePage.jsx';

const STORAGE_KEY = 'dfb_progress_v2';

function loadProgress() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const { completed, currentLessonId } = JSON.parse(raw);
      return { completed: new Set(completed || []), currentLessonId: currentLessonId || null };
    }
  } catch {}
  return { completed: new Set(), currentLessonId: null };
}

function saveProgress(completed, currentLessonId) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({
      completed: [...completed],
      currentLessonId,
    }));
  } catch {}
}

export default function App() {
  const lessonIndex = useMemo(() => buildLessonIndex(), []);
  const [completed, setCompleted] = useState(() => loadProgress().completed);
  const [currentIdx, setCurrentIdx] = useState(() => {
    const { currentLessonId } = loadProgress();
    if (currentLessonId) {
      const idx = lessonIndex.findIndex(e => e.lesson.id === currentLessonId);
      if (idx >= 0) return idx;
    }
    return null; // null = home page
  });
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const currentEntry = currentIdx !== null ? lessonIndex[currentIdx] : null;

  useEffect(() => {
    saveProgress(completed, currentEntry?.lesson?.id || null);
  }, [completed, currentEntry]);

  function goToLesson(idx) {
    setCurrentIdx(idx);
    setSidebarOpen(false); // auto-close on mobile after picking a lesson
    window.scrollTo(0, 0);
  }

  function handleSelectLesson(moduleId, lessonId) {
    const idx = lessonIndex.findIndex(e => e.moduleId === moduleId && e.lesson.id === lessonId);
    if (idx >= 0) goToLesson(idx);
  }

  function handleSelectModule(moduleId) {
    const idx = lessonIndex.findIndex(e => e.moduleId === moduleId);
    if (idx >= 0) goToLesson(idx);
  }

  function handleStart() {
    // Resume or start from beginning
    const { currentLessonId } = loadProgress();
    if (currentLessonId) {
      const idx = lessonIndex.findIndex(e => e.lesson.id === currentLessonId);
      if (idx >= 0) { goToLesson(idx); return; }
    }
    goToLesson(0);
  }

  function handleNext() {
    if (currentIdx !== null && currentIdx < lessonIndex.length - 1) {
      goToLesson(currentIdx + 1);
    }
  }

  function handlePrev() {
    if (currentIdx !== null && currentIdx > 0) {
      goToLesson(currentIdx - 1);
    }
  }

  function handleComplete(lessonId) {
    setCompleted(prev => {
      const next = new Set(prev);
      next.add(lessonId);
      return next;
    });
  }

  const totalLessons = lessonIndex.length;
  const totalDone = completed.size;
  const pct = totalLessons > 0 ? Math.round((totalDone / totalLessons) * 100) : 0;

  const currentMod = currentEntry
    ? MODULES.find(m => m.id === currentEntry.moduleId)
    : null;

  return (
    <div className="layout">
      {/* Sidebar */}
      <Sidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        currentLesson={currentEntry}
        completedLessons={completed}
        onSelectLesson={handleSelectLesson}
        lessonIndex={lessonIndex}
        onHome={() => { setCurrentIdx(null); setSidebarOpen(false); }}
      />

      {/* Mobile overlay behind sidebar */}
      {sidebarOpen && (
        <div className="sidebar-mob-overlay" onClick={() => setSidebarOpen(false)} aria-hidden="true" />
      )}

      {/* Main */}
      <main className="main">
        {/* Top bar */}
        <header className="topbar">
          {/* Hamburger — mobile only */}
          <button
            className="topbar-menu-btn"
            onClick={() => setSidebarOpen(true)}
            aria-label="Mở menu điều hướng"
            title="Mở menu"
          >
            ☰
          </button>

          <button className="topbar-home" onClick={() => setCurrentIdx(null)} title="Về trang chủ">
            ⌂ <span className="topbar-home-label">Trang chủ</span>
          </button>
          <div className="topbar-breadcrumb">
            {currentEntry ? (
              <>
                <span>Module {currentEntry.moduleId} · </span>
                {currentEntry.sectionTitle}
              </>
            ) : (
              'DEEPFENSE BASICS'
            )}
          </div>
          <div className="topbar-ext">
            <a className="topbar-ext-link" href="https://deepfense.online/academy/" target="_blank" rel="noopener noreferrer" title="Trang Academy">🎓 Academy</a>
            <a className="topbar-ext-link" href="https://deepfense.online" target="_blank" rel="noopener noreferrer" title="deepfense.online">🌐 Trang chủ</a>
          </div>
          <div className="topbar-progress">
            <div className="topbar-progress-bar">
              <div className="topbar-progress-fill" style={{ width: `${pct}%` }} />
            </div>
            <span className="topbar-progress-text">{pct}%</span>
          </div>
        </header>

        {/* Content */}
        {currentIdx === null || currentEntry === null ? (
          <HomePage
            onStart={handleStart}
            onSelectModule={handleSelectModule}
            completedLessons={completed}
          />
        ) : (
          <LessonView
            lessonIndex={lessonIndex}
            currentIdx={currentIdx}
            currentEntry={currentEntry}
            completedLessons={completed}
            onNext={handleNext}
            onPrev={handlePrev}
            onComplete={handleComplete}
          />
        )}
      </main>
    </div>
  );
}
