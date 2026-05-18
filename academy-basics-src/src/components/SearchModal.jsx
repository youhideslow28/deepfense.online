/**
 * SearchModal.jsx — Command-palette search over lessons + glossary.
 *
 * Keyboard:  ↑ ↓ navigate · Enter select · Escape close
 * Trigger:   "/" key globally (wired in App.jsx) or search button
 *
 * Props:
 *   isOpen        boolean
 *   onClose       () => void
 *   lessonIndex   array of { lesson, moduleId, sectionTitle }
 *   onSelectLesson (moduleId, lessonId) => void
 */
import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import { GLOSSARY, searchGlossary, CATEGORY_LABELS } from '../data/glossary.js';

const MAX_LESSONS   = 8;
const MAX_GLOSSARY  = 10;

// ── helpers ──────────────────────────────────────────────────────
function searchLessons(lessonIndex, query) {
  if (!query.trim()) return lessonIndex.slice(0, MAX_LESSONS);
  const q = query.toLowerCase();
  return lessonIndex
    .filter(e =>
      e.lesson.title.toLowerCase().includes(q) ||
      e.lesson.id.toLowerCase().includes(q) ||
      e.sectionTitle?.toLowerCase().includes(q),
    )
    .slice(0, MAX_LESSONS);
}

function highlight(text, query) {
  if (!query.trim()) return text;
  const idx = text.toLowerCase().indexOf(query.toLowerCase());
  if (idx === -1) return text;
  return (
    <>
      {text.slice(0, idx)}
      <mark className="search-highlight">{text.slice(idx, idx + query.length)}</mark>
      {text.slice(idx + query.length)}
    </>
  );
}

// ── Component ─────────────────────────────────────────────────────
export default function SearchModal({ isOpen, onClose, lessonIndex, onSelectLesson }) {
  const [query,      setQuery]      = useState('');
  const [activeIdx,  setActiveIdx]  = useState(0);
  const [expandedG,  setExpandedG]  = useState(null); // expanded glossary entry id
  const inputRef = useRef(null);
  const listRef  = useRef(null);

  // Auto-focus on open
  useEffect(() => {
    if (isOpen) {
      setQuery('');
      setActiveIdx(0);
      setExpandedG(null);
      setTimeout(() => inputRef.current?.focus(), 60);
    }
  }, [isOpen]);

  // Filtered results
  const lessons  = useMemo(() => searchLessons(lessonIndex, query), [lessonIndex, query]);
  const glossary = useMemo(() => {
    const results = searchGlossary(query);
    return query.trim() ? results.slice(0, MAX_GLOSSARY) : results.slice(0, MAX_GLOSSARY);
  }, [query]);

  // Flat navigation list: lessons then glossary
  const navItems = useMemo(() => [
    ...lessons.map(e => ({ type: 'lesson', data: e })),
    ...glossary.map(g => ({ type: 'glossary', data: g })),
  ], [lessons, glossary]);

  const clamp = useCallback(
    idx => Math.max(0, Math.min(idx, navItems.length - 1)),
    [navItems.length],
  );

  // Keyboard handler
  useEffect(() => {
    if (!isOpen) return;

    function onKey(e) {
      if (e.key === 'Escape') { onClose(); return; }
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setActiveIdx(i => clamp(i + 1));
      }
      if (e.key === 'ArrowUp') {
        e.preventDefault();
        setActiveIdx(i => clamp(i - 1));
      }
      if (e.key === 'Enter') {
        e.preventDefault();
        const item = navItems[activeIdx];
        if (!item) return;
        if (item.type === 'lesson') {
          onSelectLesson(item.data.moduleId, item.data.lesson.id);
          onClose();
        } else {
          setExpandedG(id => id === item.data.id ? null : item.data.id);
        }
      }
    }

    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [isOpen, activeIdx, navItems, clamp, onClose, onSelectLesson]);

  // Scroll active item into view
  useEffect(() => {
    const el = listRef.current?.querySelector(`[data-nav="${activeIdx}"]`);
    el?.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
  }, [activeIdx]);

  if (!isOpen) return null;

  const showLessons  = lessons.length > 0;
  const showGlossary = glossary.length > 0;
  let lessonOffset = 0;
  let glossaryOffset = lessons.length;

  return (
    <div className="search-overlay" onClick={e => e.target === e.currentTarget && onClose()}>
      <div className="search-modal" role="dialog" aria-label="Tìm kiếm">

        {/* Input */}
        <div className="search-input-wrap">
          <span className="search-icon" aria-hidden="true">🔍</span>
          <input
            ref={inputRef}
            className="search-input"
            type="text"
            value={query}
            onChange={e => { setQuery(e.target.value); setActiveIdx(0); }}
            placeholder="Tìm bài học, thuật ngữ…"
            autoComplete="off"
            spellCheck={false}
          />
          {query && (
            <button className="search-clear-btn" onClick={() => { setQuery(''); inputRef.current?.focus(); }}>
              ✕
            </button>
          )}
        </div>

        {/* Results */}
        <div className="search-results" ref={listRef}>

          {/* ── Lessons ── */}
          {showLessons && (
            <div className="search-group">
              <div className="search-group-label">
                Bài học {query && <span className="search-group-count">({lessons.length})</span>}
              </div>
              {lessons.map((e, i) => {
                const navI = lessonOffset + i;
                return (
                  <button
                    key={e.lesson.id}
                    data-nav={navI}
                    className={`search-item lesson-item ${navI === activeIdx ? 'active' : ''}`}
                    onClick={() => { onSelectLesson(e.moduleId, e.lesson.id); onClose(); }}
                    onMouseEnter={() => setActiveIdx(navI)}
                  >
                    <span className="search-item-module">M{e.moduleId}</span>
                    <div className="search-item-body">
                      <span className="search-item-title">
                        {highlight(e.lesson.title, query)}
                      </span>
                      <span className="search-item-sub">{e.sectionTitle}</span>
                    </div>
                    <span className="search-item-arrow">→</span>
                  </button>
                );
              })}
            </div>
          )}

          {/* ── Glossary ── */}
          {showGlossary && (
            <div className="search-group">
              <div className="search-group-label">
                Thuật ngữ {query && <span className="search-group-count">({glossary.length})</span>}
              </div>
              {glossary.map((g, i) => {
                const navI = glossaryOffset + i;
                const isExpanded = expandedG === g.id;
                return (
                  <div key={g.id}>
                    <button
                      data-nav={navI}
                      className={`search-item glossary-item ${navI === activeIdx ? 'active' : ''}`}
                      onClick={() => setExpandedG(id => id === g.id ? null : g.id)}
                      onMouseEnter={() => setActiveIdx(navI)}
                    >
                      <span className={`search-cat-badge cat-${g.category}`}>
                        {CATEGORY_LABELS[g.category]}
                      </span>
                      <div className="search-item-body">
                        <span className="search-item-title">
                          {highlight(g.term, query)}
                        </span>
                        {!isExpanded && (
                          <span className="search-item-sub search-item-def">
                            {g.definition.slice(0, 90)}{g.definition.length > 90 ? '…' : ''}
                          </span>
                        )}
                      </div>
                      <span className="search-item-expand">{isExpanded ? '▲' : '▼'}</span>
                    </button>
                    {isExpanded && (
                      <div className="search-glossary-expand">
                        <p className="search-glossary-def">{g.definition}</p>
                        <div className="search-glossary-meta">
                          Module {g.module} · {CATEGORY_LABELS[g.category]}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}

          {/* Empty state */}
          {!showLessons && !showGlossary && (
            <div className="search-empty">
              <div className="search-empty-icon">🔎</div>
              <div className="search-empty-text">Không tìm thấy kết quả cho "<strong>{query}</strong>"</div>
              <div className="search-empty-hint">Thử tìm theo tên bài học hoặc thuật ngữ khác.</div>
            </div>
          )}
        </div>

        {/* Footer hint */}
        <div className="search-footer">
          <span><kbd>↑</kbd><kbd>↓</kbd> di chuyển</span>
          <span><kbd>Enter</kbd> chọn</span>
          <span><kbd>Esc</kbd> đóng</span>
        </div>

      </div>
    </div>
  );
}
