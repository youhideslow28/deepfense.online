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

  const currentEntry = currentIdx !== null ? lessonIndex[currentIdx] : null;

  useEffect(() => {
    saveProgress(completed, currentEntry?.lesson?.id || null);
  }, [completed, currentEntry]);

  function goToLesson(idx) {
    setCurrentIdx(idx);
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
        currentLesson={currentEntry}
        completedLessons={completed}
        onSelectLesson={handleSelectLesson}
        lessonIndex={lessonIndex}
      />

      {/* Main */}
      <main className="main">
        {/* Top bar */}
        <header className="topbar">
          <button className="topbar-back" onClick={() => setCurrentIdx(null)}>
            ← Tổng quan
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
          <div className="topbar-progress">
            <div className="topbar-progress-bar">
              <div className="topbar-progress-fill" style={{ width: `${pct}%` }} />
            </div>
            <span className="topbar-progress-text">
              <strong>{totalDone}</strong>/{totalLessons} bài
            </span>
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
