import React, { useState, useEffect, useMemo } from 'react';
import { buildLessonIndex } from './data/course.js';
import Sidebar from './components/Sidebar.jsx';
import LessonView from './components/LessonView.jsx';
import HomePage from './components/HomePage.jsx';
import NotesPanel, { hasNoteFor } from './components/NotesPanel.jsx';
import SearchModal from './components/SearchModal.jsx';

const STORAGE_KEY     = 'dfb_progress_v2';
const ACADEMY_LESSONS_KEY = 'df_completed_lessons';
const THEME_KEY       = 'dfb_theme_v1';
const MODULE_SYNC_KEY = 'dfb_module_sync_v1';
const SESSION_KEY     = 'dfb_session_v1';
const SESSION_TTL     = 30 * 24 * 60 * 60 * 1000; // 30 ngày
const LEGACY_PROGRESS_KEYS = [
  'df_completed_modules',
  'df_completed_lessons',
  'dfb_progress_v2',
  'dfb_module_sync_v1',
  'dfb_exam_v1',
  'dfb_cert_name',
  'dfb_cert_claimed_v1',
  'dfb_cert_id_v1',
  'deepfense-basics-course-evaluation',
  'deepfense-basics-final-exam',
];

function scrollLessonToTop() {
  const behavior = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth';
  requestAnimationFrame(() => {
    const content = document.querySelector('.content');
    if (content) {
      content.scrollTo({ top: 0, left: 0, behavior });
      return;
    }
    window.scrollTo({ top: 0, left: 0, behavior });
  });
}

function readSession() {
  try {
    const raw = localStorage.getItem(SESSION_KEY);
    if (!raw) return null;
    const session = JSON.parse(raw);
    if (typeof session?.loginAt !== 'number' || Date.now() - session.loginAt >= SESSION_TTL) return null;
    if (typeof session?.uid !== 'string' || !session.uid) return null;
    return session;
  } catch { return null; }
}

function isSessionValid() {
  return !!readSession();
}

function cleanupLegacyProgressForNonAdmin() {
  const session = readSession();
  if (!session || session.email === 'deepfense@gmail.com' || session.isAdmin === true) return;
  try {
    LEGACY_PROGRESS_KEYS.forEach(key => localStorage.removeItem(key));
  } catch {}
}

function scopedKey(baseKey) {
  const uid = readSession()?.uid;
  return uid ? `${baseKey}:${uid}` : baseKey;
}

function readModuleSync() {
  const session = readSession();
  try {
    const scoped = JSON.parse(localStorage.getItem(scopedKey(MODULE_SYNC_KEY)) || '{}');
    if (!scoped.uid || scoped.uid === session?.uid) return scoped;
  } catch {}
  return {};
}

function writeModuleSync(completedModuleNums) {
  const session = readSession();
  if (!session?.uid) return;
  try {
    const prev = readModuleSync();
    const merged = {
      uid: session.uid,
      completedModules: [...new Set([...(prev.completedModules || []), ...completedModuleNums])],
      updatedAt: Date.now(),
    };
    localStorage.setItem(scopedKey(MODULE_SYNC_KEY), JSON.stringify(merged));
  } catch {}
}

function initTheme() {
  const saved = localStorage.getItem(THEME_KEY) || 'dark';
  document.documentElement.setAttribute('data-theme', saved);
  return saved;
}

function loadProgress() {
  try {
    const raw = localStorage.getItem(scopedKey(STORAGE_KEY));
    if (raw) {
      const { completed, currentLessonId } = JSON.parse(raw);
      return { completed: new Set(completed || []), currentLessonId: currentLessonId || null };
    }
  } catch {}
  return { completed: new Set(), currentLessonId: null };
}

function saveProgress(completed, currentLessonId) {
  const session = readSession();
  if (!session?.uid) return;
  try {
    const completedList = [...completed];
    localStorage.setItem(scopedKey(STORAGE_KEY), JSON.stringify({
      uid: session.uid,
      completed: completedList,
      currentLessonId,
    }));
    localStorage.setItem(scopedKey(ACADEMY_LESSONS_KEY), JSON.stringify(completedList));
  } catch {}
}

export default function App() {
  // Auth gate — phải đăng nhập tại /academy/ trước
  const [authed] = useState(() => isSessionValid());

  useEffect(() => {
    if (!authed) window.location.replace('/academy/');
    cleanupLegacyProgressForNonAdmin();
  }, [authed]);

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
  const [theme,        setTheme]        = useState(initTheme);
  const [installEvt,   setInstallEvt]   = useState(null);  // BeforeInstallPromptEvent
  const [showInstall,  setShowInstall]  = useState(false);

  // Capture PWA install prompt
  useEffect(() => {
    function onBeforeInstall(e) {
      e.preventDefault();
      setInstallEvt(e);
      setShowInstall(true);
    }
    window.addEventListener('beforeinstallprompt', onBeforeInstall);
    // Hide banner if app is already installed
    window.addEventListener('appinstalled', () => setShowInstall(false));
    return () => {
      window.removeEventListener('beforeinstallprompt', onBeforeInstall);
    };
  }, []);

  async function handleInstall() {
    if (!installEvt) return;
    installEvt.prompt();
    const { outcome } = await installEvt.userChoice;
    if (outcome === 'accepted') setShowInstall(false);
    setInstallEvt(null);
  }

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

  // Seed from shared sync key and keep in sync when other tab (Academy.tsx) updates it
  const applyModuleSync = (prevSet) => {
    const { completedModules } = readModuleSync();
    if (!Array.isArray(completedModules) || completedModules.length === 0) return prevSet;
    const next = new Set(prevSet);
    for (const entry of lessonIndex) {
      if (completedModules.includes(entry.moduleId)) next.add(entry.lesson.id);
    }
    return next;
  };

  useEffect(() => {
    // Apply on mount
    setCompleted(prev => applyModuleSync(prev));
    // Re-apply whenever Academy.tsx (same origin, other tab) writes the sync key
    const onStorage = (e) => {
      if (e.key === scopedKey(MODULE_SYNC_KEY)) setCompleted(prev => applyModuleSync(prev));
    };
    window.addEventListener('storage', onStorage);
    return () => window.removeEventListener('storage', onStorage);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // Whenever lesson progress changes: compute fully-done modules and write to shared key
  useEffect(() => {
    const counts = {}, done = {};
    for (const entry of lessonIndex) {
      const mid = entry.moduleId;
      counts[mid] = (counts[mid] || 0) + 1;
      if (completed.has(entry.lesson.id)) done[mid] = (done[mid] || 0) + 1;
    }
    const doneModules = Object.keys(counts)
      .filter(mid => done[mid] === counts[mid])
      .map(Number);
    writeModuleSync(doneModules);
  }, [completed]); // eslint-disable-line react-hooks/exhaustive-deps

  function goToLesson(idx) {
    setCurrentIdx(idx);
    setSidebarOpen(false); // auto-close on mobile after picking a lesson
    scrollLessonToTop();
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

  // Chưa xác thực → không render gì, useEffect sẽ redirect
  if (!authed) return null;

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

      {/* PWA install banner */}
      {showInstall && (
        <div className="install-banner">
          <span className="install-banner-icon">📲</span>
          <span className="install-banner-text">
            Cài <strong>DEEPFENSE BASICS</strong> lên thiết bị — học offline bất cứ lúc nào!
          </span>
          <button className="install-banner-btn" onClick={handleInstall}>Cài ngay</button>
          <button className="install-banner-dismiss" onClick={() => setShowInstall(false)} aria-label="Đóng">✕</button>
        </div>
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

          {/* Ext links — left side (moved from right) */}
          <div className="topbar-ext">
            <a className="topbar-ext-link" href="https://deepfense.online/academy/" target="_blank" rel="noopener noreferrer" title="Trang Academy">🎓 Academy</a>
            <a className="topbar-ext-link" href="https://deepfense.online" target="_blank" rel="noopener noreferrer" title="deepfense.online">🌐 Trang chủ</a>
          </div>

          {/* Breadcrumb — only visible when inside a lesson */}
          <div className="topbar-breadcrumb">
            {currentEntry && (
              <>
                <span>Module {currentEntry.moduleId} · </span>
                {currentEntry.sectionTitle}
              </>
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
