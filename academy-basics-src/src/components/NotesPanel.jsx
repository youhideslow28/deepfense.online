/**
 * NotesPanel.jsx — Slide-in notes drawer (right side).
 *
 * Storage: localStorage key `dfb_notes_v1` → { [lessonId]: string }
 *
 * Props:
 *   isOpen      boolean
 *   onClose     () => void
 *   lessonId    string | null
 *   lessonTitle string
 *   moduleId    number | null
 */
import React, { useState, useEffect, useRef, useCallback } from 'react';

const STORAGE_KEY = 'dfb_notes_v1';
const MAX_CHARS   = 2000;

function loadAllNotes() {
  try { return JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}'); }
  catch { return {}; }
}

function persistNote(lessonId, text) {
  const all = loadAllNotes();
  if (text.trim()) all[lessonId] = text;
  else             delete all[lessonId];
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify(all)); } catch {}
}

/** Returns all saved notes as { [lessonId]: string } */
export function getAllNotes() { return loadAllNotes(); }

/** Returns true if a non-empty note exists for the given lessonId */
export function hasNoteFor(lessonId) {
  if (!lessonId) return false;
  const all = loadAllNotes();
  return !!all[lessonId]?.trim();
}

// ── Component ──────────────────────────────────────────────────
export default function NotesPanel({ isOpen, onClose, lessonId, lessonTitle, moduleId, onNoteChange }) {
  const [text,    setText]    = useState('');
  const [saved,   setSaved]   = useState(false);   // brief "saved" flash
  const textareaRef           = useRef(null);
  const saveTimerRef          = useRef(null);

  // Load note for this lesson whenever lessonId changes
  useEffect(() => {
    if (!lessonId) { setText(''); return; }
    const all  = loadAllNotes();
    setText(all[lessonId] || '');
  }, [lessonId]);

  // Auto-focus textarea when panel opens
  useEffect(() => {
    if (isOpen && lessonId) {
      setTimeout(() => textareaRef.current?.focus(), 120);
    }
  }, [isOpen, lessonId]);

  // Debounced auto-save + "saved" flash
  const handleChange = useCallback((e) => {
    const val = e.target.value;
    if (val.length > MAX_CHARS) return;
    setText(val);
    clearTimeout(saveTimerRef.current);
    saveTimerRef.current = setTimeout(() => {
      if (lessonId) {
        persistNote(lessonId, val);
        setSaved(true);
        setTimeout(() => setSaved(false), 1400);
        onNoteChange?.(lessonId, !!val.trim());
      }
    }, 400);
  }, [lessonId]);

  function handleClear() {
    if (!lessonId) return;
    setText('');
    persistNote(lessonId, '');
    onNoteChange?.(lessonId, false);
  }

  const charCount = text.length;
  const isEmpty   = !text.trim();

  return (
    <>
      {/* Overlay — click outside to close */}
      {isOpen && (
        <div
          className="notes-overlay"
          onClick={onClose}
          aria-hidden="true"
        />
      )}

      {/* Panel */}
      <aside
        className={`notes-panel${isOpen ? ' is-open' : ''}`}
        aria-label="Ghi chú bài học"
        aria-hidden={!isOpen}
      >
        {/* Header */}
        <div className="notes-header">
          <div className="notes-header-left">
            <span className="notes-header-icon">📝</span>
            <div className="notes-header-info">
              <span className="notes-header-title">Ghi chú</span>
              {lessonId && (
                <span className="notes-header-sub">
                  {moduleId != null ? `Module ${moduleId} · ` : ''}{lessonTitle}
                </span>
              )}
            </div>
          </div>
          <button className="notes-close-btn" onClick={onClose} aria-label="Đóng ghi chú">✕</button>
        </div>

        {/* Body */}
        <div className="notes-body">
          {lessonId ? (
            <textarea
              ref={textareaRef}
              className="notes-textarea"
              value={text}
              onChange={handleChange}
              placeholder="Ghi chú của bạn cho bài học này…"
              maxLength={MAX_CHARS}
              aria-label="Nội dung ghi chú"
            />
          ) : (
            <div className="notes-empty-state">
              <div className="notes-empty-icon">📖</div>
              <div className="notes-empty-text">Chọn một bài học để bắt đầu ghi chú.</div>
            </div>
          )}
        </div>

        {/* Footer */}
        {lessonId && (
          <div className="notes-footer">
            <span className={`notes-saved ${saved ? 'visible' : ''}`}>✓ Đã lưu</span>
            <span className={`notes-charcount ${charCount > MAX_CHARS * 0.9 ? 'warn' : ''}`}>
              {charCount} / {MAX_CHARS}
            </span>
            <button
              className="notes-clear-btn"
              onClick={handleClear}
              disabled={isEmpty}
              title="Xoá toàn bộ ghi chú"
            >
              Xoá
            </button>
          </div>
        )}
      </aside>
    </>
  );
}
