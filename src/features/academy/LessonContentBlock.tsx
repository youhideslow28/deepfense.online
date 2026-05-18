/**
 * DEEPFENSE.ONLINE — Academy Rich Content Block Renderer
 * @copyright 2025 Ho Xuan Nguyen (25NS039)
 *
 * Dispatcher component for all ContentBlock types:
 *   Phiên 1: text | image | compare | callout
 *   Phiên 2: audio | table
 *   Phiên 3: exercise | sandbox | annotate
 */

import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Play, Pause, Volume2, CheckCircle2, XCircle, ZoomIn } from 'lucide-react';
import type {
  ContentBlock,
  TextBlock,
  ImageBlock,
  CompareBlock,
  CalloutBlock,
  AudioBlock,
  TableBlock,
  ExerciseBlock,
  SandboxBlock,
  AnnotateBlock,
  AnnotateTarget,
} from '@/data/basicsCourseData';
import { TRANSLATIONS } from '@/data/translations';
import type { Language } from '@/types';

// ─── Props ────────────────────────────────────────────────────────────────────

interface LessonContentBlockProps {
  block: ContentBlock;
  lang: Language;
  lessonId?: string;
  blockIndex?: number;
}

// ─── Inline text parser (** bold **, * italic *) ──────────────────────────────

function parseInline(text: string): React.ReactNode[] {
  const parts = text.split(/(\*\*[^*]+\*\*|\*[^*]+\*)/g);
  return parts.map((part, i) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return <strong key={i} className="text-white font-bold">{part.slice(2, -2)}</strong>;
    }
    if (part.startsWith('*') && part.endsWith('*')) {
      return <em key={i} className="text-zinc-300 italic">{part.slice(1, -1)}</em>;
    }
    return part;
  });
}

// ─── 1. TEXT BLOCK ────────────────────────────────────────────────────────────

const TextRenderer: React.FC<{ block: TextBlock; lang: Language }> = ({ block, lang }) => {
  const text = lang === 'vi' ? block.content.vi : block.content.en;
  const variant = block.variant ?? 'normal';
  return (
    <p className={
      variant === 'lead'    ? 'text-gray-200 text-lg leading-relaxed font-medium' :
      variant === 'caption' ? 'text-gray-500 text-xs leading-relaxed italic' :
                              'text-gray-300 text-base leading-relaxed'
    }>
      {parseInline(text)}
    </p>
  );
};

// ─── 2. IMAGE BLOCK ───────────────────────────────────────────────────────────

const ImageRenderer: React.FC<{ block: ImageBlock; lang: Language }> = ({ block, lang }) => {
  const [loaded, setLoaded] = useState(false);
  const [zoom, setZoom] = useState(false);
  const alt = lang === 'vi' ? block.alt.vi : block.alt.en;
  const caption = block.caption ? (lang === 'vi' ? block.caption.vi : block.caption.en) : null;

  const widthClass =
    block.width === 'medium' ? 'max-w-md mx-auto' :
    block.width === 'wide'   ? 'max-w-2xl mx-auto' :
                               'w-full';

  return (
    <figure className={widthClass}>
      <div className="relative rounded-xl overflow-hidden bg-zinc-800 group cursor-zoom-in" onClick={() => setZoom(true)}>
        {!loaded && (
          <div className="w-full h-48 bg-zinc-800 animate-pulse flex items-center justify-center">
            <ZoomIn className="w-6 h-6 text-zinc-600" />
          </div>
        )}
        <img
          src={block.src}
          alt={alt}
          onLoad={() => setLoaded(true)}
          className={`w-full object-cover transition-opacity duration-300 ${loaded ? 'opacity-100' : 'opacity-0'}`}
        />
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
          <ZoomIn className="w-6 h-6 text-white opacity-0 group-hover:opacity-80 transition-opacity" />
        </div>
      </div>
      {caption && (
        <figcaption className="mt-2 text-center text-xs text-zinc-500 leading-relaxed px-2">
          {caption}
        </figcaption>
      )}

      {/* Lightbox */}
      {zoom && (
        <div
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4 cursor-zoom-out"
          onClick={() => setZoom(false)}
        >
          <img src={block.src} alt={alt} className="max-w-full max-h-full object-contain rounded-lg shadow-2xl" />
        </div>
      )}
    </figure>
  );
};

// ─── 3. COMPARE BLOCK ────────────────────────────────────────────────────────

const CompareRenderer: React.FC<{ block: CompareBlock; lang: Language }> = ({ block, lang }) => {
  const t = TRANSLATIONS[lang];
  const [sliderPos, setSliderPos] = useState(50); // 0-100
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const beforeLabel = lang === 'vi' ? block.before.label.vi : block.before.label.en;
  const afterLabel  = lang === 'vi' ? block.after.label.vi  : block.after.label.en;
  const caption     = block.caption ? (lang === 'vi' ? block.caption.vi : block.caption.en) : null;
  const mode        = block.mode ?? 'side-by-side';

  // Slider drag logic
  const handleMove = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const pos = Math.max(5, Math.min(95, ((clientX - rect.left) / rect.width) * 100));
    setSliderPos(pos);
  }, []);

  useEffect(() => {
    if (!isDragging) return;
    const onMove = (e: MouseEvent | TouchEvent) => {
      handleMove('touches' in e ? e.touches[0].clientX : e.clientX);
    };
    const onUp = () => setIsDragging(false);
    window.addEventListener('mousemove', onMove);
    window.addEventListener('touchmove', onMove);
    window.addEventListener('mouseup', onUp);
    window.addEventListener('touchend', onUp);
    return () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('touchmove', onMove);
      window.removeEventListener('mouseup', onUp);
      window.removeEventListener('touchend', onUp);
    };
  }, [isDragging, handleMove]);

  if (mode === 'slider') {
    return (
      <figure>
        <div
          ref={containerRef}
          className="relative rounded-xl overflow-hidden bg-zinc-800 select-none cursor-col-resize"
          style={{ aspectRatio: '4/3' }}
          onMouseDown={(e) => { setIsDragging(true); handleMove(e.clientX); }}
          onTouchStart={(e) => { setIsDragging(true); handleMove(e.touches[0].clientX); }}
        >
          {/* After (bottom layer — full width) */}
          <img src={block.after.src} alt={afterLabel} className="absolute inset-0 w-full h-full object-cover" />

          {/* Before (top layer — clipped) */}
          <div className="absolute inset-0 overflow-hidden" style={{ clipPath: `inset(0 ${100 - sliderPos}% 0 0)` }}>
            <img src={block.before.src} alt={beforeLabel} className="w-full h-full object-cover" />
          </div>

          {/* Divider line */}
          <div
            className="absolute top-0 bottom-0 w-0.5 bg-white shadow-[0_0_8px_rgba(0,0,0,0.8)] z-10"
            style={{ left: `${sliderPos}%` }}
          >
            <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-white shadow-lg flex items-center justify-center">
              <span className="text-zinc-800 text-xs font-bold select-none">⇔</span>
            </div>
          </div>

          {/* Labels */}
          <div className="absolute top-2 left-2 bg-black/60 text-white text-xs px-2 py-1 rounded font-semibold backdrop-blur-sm">{beforeLabel}</div>
          <div className="absolute top-2 right-2 bg-black/60 text-white text-xs px-2 py-1 rounded font-semibold backdrop-blur-sm">{afterLabel}</div>
          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 text-white/60 text-[10px] select-none">{lang === 'vi' ? 'Kéo để so sánh' : 'Drag to compare'}</div>
        </div>
        {caption && <figcaption className="mt-2 text-center text-xs text-zinc-500 leading-relaxed">{caption}</figcaption>}
      </figure>
    );
  }

  // Side-by-side mode
  return (
    <figure>
      <div className="grid grid-cols-2 gap-3">
        {[
          { src: block.before.src, label: beforeLabel, badge: t.block_compare_before },
          { src: block.after.src,  label: afterLabel,  badge: t.block_compare_after  },
        ].map(({ src, label, badge }) => (
          <div key={badge} className="relative rounded-xl overflow-hidden bg-zinc-800">
            <img src={src} alt={label} className="w-full object-cover" />
            <div className="absolute top-2 left-2 flex items-center gap-1.5">
              <span className="bg-black/70 text-white text-[10px] px-2 py-0.5 rounded font-bold backdrop-blur-sm">{badge}</span>
              <span className="bg-black/50 text-white text-[10px] px-2 py-0.5 rounded backdrop-blur-sm">{label}</span>
            </div>
          </div>
        ))}
      </div>
      {caption && <figcaption className="mt-2 text-center text-xs text-zinc-500 leading-relaxed">{caption}</figcaption>}
    </figure>
  );
};

// ─── 4. CALLOUT BLOCK ────────────────────────────────────────────────────────

const calloutStyles = {
  tip:     { border: 'border-green-500/40',  bg: 'bg-green-500/5',  text: 'text-green-400',  iconBg: 'bg-green-500/15'  },
  info:    { border: 'border-blue-500/40',   bg: 'bg-blue-500/5',   text: 'text-blue-400',   iconBg: 'bg-blue-500/15'   },
  warning: { border: 'border-amber-500/40',  bg: 'bg-amber-500/5',  text: 'text-amber-400',  iconBg: 'bg-amber-500/15'  },
  danger:  { border: 'border-red-500/40',    bg: 'bg-red-500/5',    text: 'text-red-400',    iconBg: 'bg-red-500/15'    },
};

const CalloutRenderer: React.FC<{ block: CalloutBlock; lang: Language }> = ({ block, lang }) => {
  const s = calloutStyles[block.variant];
  const title   = block.title   ? (lang === 'vi' ? block.title.vi   : block.title.en)   : null;
  const content = lang === 'vi' ? block.content.vi : block.content.en;

  return (
    <div className={`rounded-xl border-l-4 ${s.border} ${s.bg} px-4 py-3 flex gap-3`}>
      {block.icon && (
        <div className={`w-8 h-8 rounded-lg ${s.iconBg} flex items-center justify-center shrink-0 text-base`}>
          {block.icon}
        </div>
      )}
      <div>
        {title && <p className={`text-sm font-bold ${s.text} mb-1`}>{title}</p>}
        <p className="text-sm text-zinc-300 leading-relaxed">{parseInline(content)}</p>
      </div>
    </div>
  );
};

// ─── 5. AUDIO BLOCK (Phiên 2) ────────────────────────────────────────────────

const AudioRenderer: React.FC<{ block: AudioBlock; lang: Language }> = ({ block, lang }) => {
  const t = TRANSLATIONS[lang];
  const audioRef = useRef<HTMLAudioElement>(null);
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(0); // 0-100
  const [currentTime, setCurrentTime] = useState('0:00');
  const [totalTime, setTotalTime] = useState(block.duration ?? '0:00');

  const title = lang === 'vi' ? block.title.vi : block.title.en;
  const desc  = block.description ? (lang === 'vi' ? block.description.vi : block.description.en) : null;

  const formatTime = (s: number) => `${Math.floor(s / 60)}:${String(Math.floor(s % 60)).padStart(2, '0')}`;

  const togglePlay = () => {
    const a = audioRef.current;
    if (!a) return;
    if (playing) { a.pause(); setPlaying(false); }
    else { a.play().then(() => setPlaying(true)).catch(() => {}); }
  };

  const onTimeUpdate = () => {
    const a = audioRef.current;
    if (!a || !a.duration) return;
    setProgress((a.currentTime / a.duration) * 100);
    setCurrentTime(formatTime(a.currentTime));
  };

  const onLoadedMetadata = () => {
    const a = audioRef.current;
    if (a) setTotalTime(formatTime(a.duration));
  };

  const onEnded = () => setPlaying(false);

  const seekTo = (e: React.MouseEvent<HTMLDivElement>) => {
    const a = audioRef.current;
    if (!a) return;
    const rect = e.currentTarget.getBoundingClientRect();
    a.currentTime = ((e.clientX - rect.left) / rect.width) * a.duration;
  };

  return (
    <div className="glass-dark border border-white/10 rounded-xl p-4">
      <audio
        ref={audioRef}
        src={block.src}
        onTimeUpdate={onTimeUpdate}
        onLoadedMetadata={onLoadedMetadata}
        onEnded={onEnded}
      />
      <div className="flex items-center gap-3">
        <button
          onClick={togglePlay}
          className="w-10 h-10 rounded-full bg-amber-500/15 hover:bg-amber-500/25 border border-amber-500/30 flex items-center justify-center transition-colors shrink-0"
        >
          {playing
            ? <Pause className="w-4 h-4 text-amber-400" />
            : <Play  className="w-4 h-4 text-amber-400 ml-0.5" />}
        </button>

        <div className="flex-1 min-w-0">
          <p className="text-sm font-semibold text-zinc-200 truncate flex items-center gap-1.5">
            <Volume2 className="w-3.5 h-3.5 text-amber-400 shrink-0" />
            {title}
          </p>
          {desc && <p className="text-xs text-zinc-500 mt-0.5 truncate italic">{desc}</p>}

          {/* Progress bar */}
          <div
            className="mt-2 h-1.5 bg-zinc-700 rounded-full cursor-pointer group relative"
            onClick={seekTo}
          >
            <div
              className="h-full bg-amber-500 rounded-full transition-all"
              style={{ width: `${progress}%` }}
            />
            <div
              className="absolute top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-amber-400 opacity-0 group-hover:opacity-100 transition-opacity shadow"
              style={{ left: `${progress}%`, transform: 'translate(-50%, -50%)' }}
            />
          </div>

          <div className="flex justify-between text-[10px] text-zinc-600 mt-1">
            <span>{currentTime}</span>
            <span>{totalTime}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

// ─── 6. TABLE BLOCK (Phiên 2) ────────────────────────────────────────────────

const TableRenderer: React.FC<{ block: TableBlock; lang: Language }> = ({ block, lang }) => {
  const caption = block.caption ? (lang === 'vi' ? block.caption.vi : block.caption.en) : null;

  return (
    <figure>
      {caption && (
        <figcaption className="text-xs text-amber-400 font-semibold uppercase tracking-wide mb-2">{caption}</figcaption>
      )}
      <div className="overflow-x-auto rounded-xl border border-white/10">
        <table className="w-full text-sm border-collapse">
          <thead>
            <tr className="bg-white/10">
              {block.headers.map((h, i) => (
                <th key={i} className="px-4 py-2.5 text-left text-xs font-black text-zinc-300 uppercase tracking-wider border-b border-white/10">
                  {lang === 'vi' ? h.vi : h.en}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {block.rows.map((row, ri) => (
              <tr key={ri} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                {row.map((cell, ci) => (
                  <td key={ci} className="px-4 py-3 text-zinc-300 text-sm">
                    {lang === 'vi' ? cell.vi : cell.en}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </figure>
  );
};

// ─── 7. EXERCISE BLOCK (Phiên 3) ─────────────────────────────────────────────

const ExerciseRenderer: React.FC<{ block: ExerciseBlock; lang: Language }> = ({ block, lang }) => {
  const t = TRANSLATIONS[lang];
  const [selected, setSelected] = useState<number | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [blankValue, setBlankValue] = useState<number | null>(null);

  const question = lang === 'vi' ? block.question.vi : block.question.en;
  const explanation = lang === 'vi' ? block.explanation.vi : block.explanation.en;
  const isCorrect = (idx: number) => idx === block.correctIndex;

  const chosenIdx = block.variant === 'fill-blank' ? blankValue : selected;
  const correct = submitted && chosenIdx === block.correctIndex;

  if (block.variant === 'fill-blank' && block.template) {
    const tmpl = lang === 'vi' ? block.template.vi : block.template.en;
    const [before, after] = tmpl.split('[[BLANK]]');
    return (
      <div className="border border-blue-500/30 bg-blue-500/5 rounded-xl p-4">
        <div className="flex items-center gap-2 mb-3">
          <span className="text-base">💡</span>
          <span className="text-xs font-bold text-blue-400 uppercase tracking-wide">{lang === 'vi' ? 'Điền vào chỗ trống' : 'Fill in the blank'}</span>
        </div>
        <p className="text-sm text-zinc-300 leading-relaxed mb-3 flex flex-wrap items-center gap-1">
          {before}
          <select
            disabled={submitted}
            value={blankValue ?? ''}
            onChange={e => setBlankValue(Number(e.target.value))}
            className="bg-zinc-800 border border-zinc-600 rounded px-2 py-0.5 text-sm text-zinc-200 focus:outline-none focus:border-amber-500"
          >
            <option value="">___</option>
            {block.options.map((o, i) => (
              <option key={i} value={i}>{lang === 'vi' ? o.vi : o.en}</option>
            ))}
          </select>
          {after}
        </p>
        {!submitted
          ? <button disabled={blankValue === null} onClick={() => setSubmitted(true)} className="text-xs px-3 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-400 disabled:opacity-40 text-black font-bold transition-colors">{t.block_exercise_check}</button>
          : <div className={`text-sm font-semibold mt-2 ${correct ? 'text-green-400' : 'text-red-400'}`}>
              {correct ? `✅ ${t.block_exercise_correct}` : `❌ ${t.block_exercise_wrong}`}
              <p className="text-zinc-400 text-xs mt-1 font-normal">{explanation}</p>
            </div>}
      </div>
    );
  }

  // Single-choice
  return (
    <div className="border border-blue-500/30 bg-blue-500/5 rounded-xl p-4">
      <div className="flex items-center gap-2 mb-3">
        <span className="text-base">💡</span>
        <span className="text-xs font-bold text-blue-400 uppercase tracking-wide">{lang === 'vi' ? 'Bài tập nhanh' : 'Quick exercise'}</span>
        {block.reward && <span className="ml-auto text-xs text-amber-400 font-bold">+{block.reward} DPF</span>}
      </div>
      <p className="text-sm text-zinc-200 font-semibold mb-3 leading-relaxed">{question}</p>
      <div className="space-y-2 mb-3">
        {block.options.map((opt, i) => {
          const label = lang === 'vi' ? opt.vi : opt.en;
          const showResult = submitted;
          return (
            <button
              key={i}
              disabled={submitted}
              onClick={() => setSelected(i)}
              className={`w-full text-left px-3 py-2 rounded-lg border text-sm transition-all flex items-center justify-between ${
                showResult
                  ? isCorrect(i) ? 'border-green-500/50 bg-green-500/10 text-green-300'
                  : selected === i ? 'border-red-500/50 bg-red-500/10 text-red-300'
                  : 'border-white/5 text-zinc-500 opacity-50'
                  : selected === i ? 'border-amber-500/50 bg-amber-500/10 text-amber-300'
                  : 'border-white/10 text-zinc-400 hover:border-white/20'
              }`}
            >
              <span>{label}</span>
              {showResult && isCorrect(i) && <CheckCircle2 className="w-4 h-4 text-green-400 shrink-0" />}
              {showResult && !isCorrect(i) && selected === i && <XCircle className="w-4 h-4 text-red-400 shrink-0" />}
            </button>
          );
        })}
      </div>
      {!submitted
        ? <button disabled={selected === null} onClick={() => setSubmitted(true)} className="text-xs px-3 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-400 disabled:opacity-40 text-black font-bold transition-colors">{t.block_exercise_check}</button>
        : <div className={`text-sm font-semibold ${correct ? 'text-green-400' : 'text-red-400'}`}>
            {correct ? `✅ ${t.block_exercise_correct}` : `❌ ${t.block_exercise_wrong}`}
            <p className="text-zinc-400 text-xs mt-1 font-normal">{explanation}</p>
          </div>}
    </div>
  );
};

// ─── 8. SANDBOX BLOCK (Phiên 3) ──────────────────────────────────────────────

const SandboxRenderer: React.FC<{ block: SandboxBlock; lang: Language }> = ({ block, lang }) => {
  const t = TRANSLATIONS[lang];
  const [turnIdx, setTurnIdx] = useState(0);
  const [chosen, setChosen] = useState<Record<number, number>>({}); // turnIdx → choiceIdx
  const [done, setDone] = useState(false);

  const title = lang === 'vi' ? block.title.vi : block.title.en;
  const desc  = block.description ? (lang === 'vi' ? block.description.vi : block.description.en) : null;

  const visibleTurns = block.turns.slice(0, turnIdx + 1);

  const handleChoice = (tIdx: number, cIdx: number) => {
    if (chosen[tIdx] !== undefined) return;
    setChosen(prev => ({ ...prev, [tIdx]: cIdx }));
    // Advance after short delay
    setTimeout(() => {
      const nextTurn = tIdx + 1;
      if (nextTurn < block.turns.length) {
        setTurnIdx(nextTurn);
      } else {
        setDone(true);
      }
    }, 1200);
  };

  return (
    <div className="border border-purple-500/30 bg-purple-500/5 rounded-xl p-4">
      <div className="flex items-center gap-2 mb-3">
        <span className="text-base">🎭</span>
        <div>
          <p className="text-sm font-bold text-purple-400">{title}</p>
          {desc && <p className="text-xs text-zinc-500">{desc}</p>}
        </div>
      </div>

      <div className="space-y-3">
        {visibleTurns.map((turn, tIdx) => {
          const msg = lang === 'vi' ? turn.message.vi : turn.message.en;
          const selectedChoice = chosen[tIdx];

          return (
            <div key={tIdx} className="space-y-2">
              {/* Message bubble */}
              <div className={`flex ${turn.speaker === 'scammer' ? 'justify-start' : 'justify-center'}`}>
                <div className={`max-w-[85%] px-3 py-2 rounded-xl text-sm ${
                  turn.speaker === 'scammer'
                    ? 'bg-red-900/30 border border-red-700/30 text-zinc-200'
                    : 'bg-zinc-800 border border-zinc-700 text-zinc-400 text-center text-xs'
                }`}>
                  {turn.speaker === 'scammer' && <span className="text-red-400 text-xs font-bold block mb-0.5">⚠️ {lang === 'vi' ? 'Tin nhắn đáng ngờ' : 'Suspicious message'}</span>}
                  {msg}
                </div>
              </div>

              {/* Choices */}
              {turn.choices && (
                <div className="space-y-1.5 pl-2">
                  {turn.choices.map((choice, cIdx) => {
                    const label = lang === 'vi' ? choice.label.vi : choice.label.en;
                    const feedback = lang === 'vi' ? choice.feedback.vi : choice.feedback.en;
                    const isSelected = selectedChoice === cIdx;
                    const isLocked = selectedChoice !== undefined;

                    return (
                      <div key={cIdx}>
                        <button
                          disabled={isLocked}
                          onClick={() => handleChoice(tIdx, cIdx)}
                          className={`w-full text-left text-xs px-3 py-2 rounded-lg border transition-all ${
                            isLocked
                              ? isSelected
                                ? choice.outcome === 'good'
                                  ? 'border-green-500/50 bg-green-900/20 text-green-300'
                                  : 'border-red-500/50 bg-red-900/20 text-red-300'
                                : 'border-white/5 text-zinc-600 opacity-40'
                              : 'border-white/10 text-zinc-400 hover:border-purple-500/40 hover:text-purple-300 cursor-pointer'
                          }`}
                        >
                          {label}
                        </button>
                        {isSelected && (
                          <p className={`text-xs mt-1 pl-3 ${choice.outcome === 'good' ? 'text-green-400' : 'text-red-400'}`}>
                            {choice.outcome === 'good' ? '✅' : '❌'} {feedback}
                          </p>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {done && (
        <div className="mt-3 p-2 rounded-lg bg-purple-500/10 border border-purple-500/20 text-xs text-purple-300 text-center font-semibold">
          {lang === 'vi' ? '✅ Bài thực hành hoàn thành!' : '✅ Practice complete!'}
        </div>
      )}
    </div>
  );
};

// ─── 9. ANNOTATE BLOCK (Phiên 3) ─────────────────────────────────────────────

const AnnotateRenderer: React.FC<{ block: AnnotateBlock; lang: Language }> = ({ block, lang }) => {
  const t = TRANSLATIONS[lang];
  const [selected, setSelected] = useState<Set<number>>(new Set());
  const [submitted, setSubmitted] = useState(false);
  const [clickPos, setClickPos] = useState<{ x: number; y: number } | null>(null);

  const instruction = lang === 'vi' ? block.instruction.vi : block.instruction.en;
  const correctIds = new Set(block.targets.map(t => t.id));
  const score = submitted ? [...selected].filter(id => correctIds.has(id)).length : 0;

  const handleImageClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (submitted) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top)  / rect.height) * 100;
    setClickPos({ x, y });

    // Check if clicked near a target
    const hit = block.targets.find(t => {
      const dx = t.x - x;
      const dy = t.y - y;
      return Math.sqrt(dx * dx + dy * dy) <= t.radius * 1.5;
    });

    if (hit) {
      setSelected(prev => {
        const next = new Set(prev);
        next.has(hit.id) ? next.delete(hit.id) : next.add(hit.id);
        return next;
      });
      setClickPos(null);
    } else {
      setTimeout(() => setClickPos(null), 800);
    }
  };

  return (
    <div className="border border-cyan-500/30 bg-cyan-500/5 rounded-xl p-4">
      <div className="flex items-center gap-2 mb-3">
        <span className="text-base">🔍</span>
        <p className="text-sm font-bold text-cyan-400">{lang === 'vi' ? 'Phân tích ảnh' : 'Image Analysis'}</p>
        {block.reward && <span className="ml-auto text-xs text-amber-400 font-bold">+{block.reward} DPF</span>}
      </div>
      <p className="text-xs text-zinc-400 mb-3">{instruction}</p>

      {/* Image with overlays */}
      <div className="relative rounded-xl overflow-hidden bg-zinc-800 cursor-crosshair mb-3 select-none" onClick={handleImageClick}>
        <img src={block.src} alt={lang === 'vi' ? block.alt.vi : block.alt.en} className="w-full" draggable={false} />

        {/* Target circles */}
        {block.targets.map(target => {
          const isSelected = selected.has(target.id);
          const isCorrect  = submitted && isSelected;
          const isMissed   = submitted && !isSelected;
          return (
            <div
              key={target.id}
              className={`absolute rounded-full border-2 transition-all ${
                submitted
                  ? isCorrect ? 'border-green-400 bg-green-400/20' : 'border-red-400 bg-red-400/20'
                  : isSelected ? 'border-amber-400 bg-amber-400/20 animate-pulse' : 'border-white/0 bg-white/0'
              }`}
              style={{
                left: `${target.x}%`,
                top:  `${target.y}%`,
                width:  `${target.radius * 2}%`,
                height: `${target.radius * 2}%`,
                transform: 'translate(-50%, -50%)',
              }}
            />
          );
        })}

        {/* Miss indicator */}
        {clickPos && (
          <div
            className="absolute w-6 h-6 border-2 border-red-400/60 rounded-full bg-red-400/10 pointer-events-none"
            style={{ left: `${clickPos.x}%`, top: `${clickPos.y}%`, transform: 'translate(-50%, -50%)' }}
          />
        )}
      </div>

      {/* Results */}
      {submitted && (
        <div className="space-y-1.5 mb-3">
          {block.targets.map(target => {
            const found = selected.has(target.id);
            const label = lang === 'vi' ? target.label.vi : target.label.en;
            const explanation = lang === 'vi' ? target.explanation.vi : target.explanation.en;
            return (
              <div key={target.id} className={`flex items-start gap-2 text-xs p-2 rounded-lg ${found ? 'bg-green-900/20' : 'bg-red-900/20'}`}>
                {found ? <CheckCircle2 className="w-3.5 h-3.5 text-green-400 shrink-0 mt-0.5" /> : <XCircle className="w-3.5 h-3.5 text-red-400 shrink-0 mt-0.5" />}
                <div>
                  <span className="font-semibold text-zinc-200">{label}</span>
                  <span className="text-zinc-500 ml-1">— {explanation}</span>
                </div>
              </div>
            );
          })}
        </div>
      )}

      <div className="flex items-center gap-3">
        {!submitted ? (
          <button
            onClick={() => setSubmitted(true)}
            disabled={selected.size === 0}
            className="text-xs px-3 py-1.5 rounded-lg bg-cyan-600 hover:bg-cyan-500 disabled:opacity-40 text-white font-bold transition-colors"
          >
            {t.block_annotate_check}
          </button>
        ) : (
          <span className={`text-sm font-bold ${score === block.targets.length ? 'text-green-400' : 'text-amber-400'}`}>
            {score}/{block.targets.length} {lang === 'vi' ? 'vùng tìm thấy' : 'areas found'}
          </span>
        )}
        <span className="text-xs text-zinc-600">{t.block_annotate_hint}</span>
      </div>
    </div>
  );
};

// ─── Main dispatcher ──────────────────────────────────────────────────────────

const LessonContentBlock: React.FC<LessonContentBlockProps> = ({ block, lang, lessonId, blockIndex }) => {
  switch (block.type) {
    case 'text':     return <TextRenderer     block={block as TextBlock}     lang={lang} />;
    case 'image':    return <ImageRenderer    block={block as ImageBlock}    lang={lang} />;
    case 'compare':  return <CompareRenderer  block={block as CompareBlock}  lang={lang} />;
    case 'callout':  return <CalloutRenderer  block={block as CalloutBlock}  lang={lang} />;
    case 'audio':    return <AudioRenderer    block={block as AudioBlock}    lang={lang} />;
    case 'table':    return <TableRenderer    block={block as TableBlock}    lang={lang} />;
    case 'exercise': return <ExerciseRenderer block={block as ExerciseBlock} lang={lang} />;
    case 'sandbox':  return <SandboxRenderer  block={block as SandboxBlock}  lang={lang} />;
    case 'annotate': return <AnnotateRenderer block={block as AnnotateBlock} lang={lang} />;
    default:         return null;
  }
};

export default LessonContentBlock;
