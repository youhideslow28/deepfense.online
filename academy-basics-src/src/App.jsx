import React, { useState, useEffect, useMemo } from 'react';
import { MODULES, buildLessonIndex } from './data/course.js';
import Sidebar from './components/Sidebar.jsx';
import LessonView from './components/LessonView.jsx';
import HomePage from './components/HomePage.jsx';
import NotesPanel, { hasNoteFor } from './components/NotesPanel.jsx';
import SearchModal from './components/SearchModal.jsx';

const STORAGE_KEY = 'dfb_progress_v2';
const THEME_KEY   = 'dfb_theme_v1';

function initTheme() {
  const saved = localStorage.getItem(THEME_KEY) || 'dark';
  document.documentElement.setAttribute('data-theme', saved);
  return saved;
}

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
  const [notesOpen,   setNotesOpen]   = useState(false);
  const [noteExists,  setNoteExists]  = useState(false);
  const [searchOpen,  setSearchOpen]  = useState(false);
  const [theme,       setTheme]       = useState(initTheme);

  function toggleTheme() {
    setTheme(t => {
      const next = t === 'dark' ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', next);
      try { localStorage.setItem(THEME_KEY, next); } catch {}
      return next;
    });
  }

  const currentEntry = currentIdx !== null ? lessonIndex[currentIdx] : null;

  useEffect(() => {
    saveProgress(completed, currentEntry?.lesson?.id || null);
  }, [completed, currentEntry]);

  // Refresh note-exists indicator whenever the current lesson changes
  useEffect(() => {
    setNoteExists(hasNoteFor(currentEntry?.lesson?.id ?? null));
  }, [currentEntry]);

  // Global '/' shortcut to open search
  useEffect(() => {
    function onKey(e) {
      if (e.key !== '/') return;
      // Don't hijack if user is typing in an input/textarea
      const tag = document.activeElement?.tagName;
      if (tag === 'INPUT' || tag === 'TEXTAREA') return;
      e.preventDefault();
      setSearchOpen(true);
    }
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

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

      {/* Search modal */}
      <SearchModal
        isOpen={searchOpen}
        onClose={() => setSearchOpen(false)}
        lessonIndex={lessonIndex}
        onSelectLesson={(moduleId, lessonId) => {
          handleSelectLesson(moduleId, lessonId);
          setSearchOpen(false);
        }}
      />

      {/* Notes panel */}
      <NotesPanel
        isOpen={notesOpen}
        onClose={() => setNotesOpen(false)}
        lessonId={currentEntry?.lesson?.id ?? null}
        lessonTitle={currentEntry?.lesson?.title ?? ''}
        moduleId={currentEntry?.moduleId ?? null}
        onNoteChange={(id, hasContent) => {
          if (id === currentEntry?.lesson?.id) setNoteExists(hasContent);
        }}
      />

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
          {/* Search button */}
          <button
            className="topbar-search-btn"
            onClick={() => setSearchOpen(true)}
            title="Tìm kiếm (phím /)"
            aria-label="Mở tìm kiếm"
          >
            🔍 <span className="topbar-search-label">Tìm kiếm</span>
            <kbd className="topbar-search-kbd">/</kbd>
          </button>

          {/* Theme toggle */}
          <button
            className="topbar-theme-btn"
            onClick={toggleTheme}
            title={theme === 'dark' ? 'Chuyển sang chế độ sáng' : 'Chuyển sang chế độ tối'}
            aria-label={theme === 'dark' ? 'Chế độ sáng' : 'Chế độ tối'}
          >
            {theme === 'dark' ? '☀️' : '🌙'}
          </button>

          {/* Notes toggle — only when viewing a lesson */}
          {currentEntry && (
            <button
              className={`topbar-notes-btn${notesOpen ? ' active' : ''}`}
              onClick={() => setNotesOpen(o => !o)}
              title={notesOpen ? 'Đóng ghi chú' : 'Mở ghi chú'}
              aria-pressed={notesOpen}
            >
              📝 <span className="topbar-notes-label">Ghi chú</span>
              {noteExists && !notesOpen && <span className="notes-dot" aria-hidden="true" />}
            </button>
          )}

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
