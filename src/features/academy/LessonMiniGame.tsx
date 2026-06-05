/**
 * DEEPFENSE.ONLINE — Academy Mini-Games
 * @copyright 2025 Ho Xuan Nguyen (25NS039)
 *
 * Renders all 5 mini-game types inline inside a lesson checkpoint:
 *   tag-the-trick | sort-cards | order-steps | shield-match | risk-meter
 */

import React, { useState, useMemo, useEffect, useRef } from 'react';
import { CheckCircle2, XCircle, Trophy, ChevronRight, RotateCcw, Sparkles } from 'lucide-react';
import type {
  MiniGameConfig,
  TagTheTrickData,
  SortCardsData,
  OrderStepsData,
  ShieldMatchData,
  RiskMeterData,
} from '@/data/basicsCourseData';
import { TRANSLATIONS } from '@/data/translations';
import type { Language } from '@/types';

// ─── Props ────────────────────────────────────────────────────────────────────

interface LessonMiniGameProps {
  config: MiniGameConfig;
  lang: Language;
  onComplete: (score: number) => void;
}

// ─── Animated Score Counter ───────────────────────────────────────────────────

const AnimatedScore: React.FC<{ score: number; total: number }> = ({ score, total }) => {
  const [displayed, setDisplayed] = useState(0);
  useEffect(() => {
    let frame = 0;
    const duration = 600;
    const steps = 20;
    const increment = score / steps;
    const interval = duration / steps;
    const timer = setInterval(() => {
      frame++;
      setDisplayed(Math.min(Math.round(increment * frame), score));
      if (frame >= steps) clearInterval(timer);
    }, interval);
    return () => clearInterval(timer);
  }, [score]);

  const pct = total > 0 ? Math.round((score / total) * 100) : 0;
  const color = pct >= 80 ? 'text-green-400' : pct >= 50 ? 'text-amber-400' : 'text-red-400';
  return <span className={`text-2xl font-black tabular-nums ${color}`}>{displayed}/{total}</span>;
};

// ─── Result Banner ─────────────────────────────────────────────────────────────

const ResultBanner: React.FC<{ score: number; total: number; label: string }> = ({ score, total, label }) => {
  const pct = total > 0 ? Math.round((score / total) * 100) : 0;
  const perfect = pct >= 80;
  return (
    <div className={`flex items-center gap-3 p-4 rounded-xl mb-4 transition-all ${
      perfect ? 'bg-green-900/30 border border-green-500/40' : 'bg-zinc-800 border border-zinc-700'
    }`}>
      {perfect
        ? <Sparkles className="w-5 h-5 text-amber-400 shrink-0 animate-pulse" />
        : <Trophy className="w-5 h-5 text-amber-400 shrink-0" />}
      <div className="flex-1">
        <p className="text-xs text-slate-300">{label}</p>
        {perfect && <p className="text-xs text-green-400 font-semibold">
          {label.includes('Score') ? '🎉 Great job!' : '🎉 Xuất sắc!'}
        </p>}
      </div>
      <AnimatedScore score={score} total={total} />
    </div>
  );
};

// ─── 1. TAG THE TRICK ─────────────────────────────────────────────────────────

const TagTheTrick: React.FC<{ data: TagTheTrickData; lang: Language; onDone: (score: number) => void }> = ({
  data, lang, onDone,
}) => {
  const t = TRANSLATIONS[lang];
  const [selected, setSelected] = useState<Set<number>>(new Set());
  const [submitted, setSubmitted] = useState(false);

  const segments = useMemo(() => {
    const raw = lang === 'vi' ? data.message.vi : data.message.en;
    const parts: Array<{ text: string; id?: number }> = [];
    const re = /\[\[(.+?)\|(\d+)\]\]/g;
    let last = 0;
    let match: RegExpExecArray | null;
    while ((match = re.exec(raw)) !== null) {
      if (match.index > last) parts.push({ text: raw.slice(last, match.index) });
      parts.push({ text: match[1], id: Number(match[2]) });
      last = match.index + match[0].length;
    }
    if (last < raw.length) parts.push({ text: raw.slice(last) });
    return parts;
  }, [data.message, lang]);

  const totalTargets = data.targets.length;
  const correctSelected = [...selected].filter(id => data.targets.some(t => t.id === id));
  const score = submitted ? correctSelected.length : 0;

  const toggle = (id: number) => {
    if (submitted) return;
    setSelected(prev => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  const getSegmentStyle = (id?: number) => {
    if (!id) return '';
    if (!submitted) return selected.has(id)
      ? 'bg-amber-500/30 text-amber-200 border border-amber-400 rounded px-1.5 py-0.5 cursor-pointer scale-105 shadow-sm shadow-amber-500/30 transition-all'
      : 'border border-dashed border-zinc-500 rounded px-1.5 py-0.5 cursor-pointer hover:border-amber-400 hover:text-amber-300 hover:bg-amber-500/10 transition-all';
    const isTarget = data.targets.some(t => t.id === id);
    const wasSelected = selected.has(id);
    if (isTarget && wasSelected) return 'bg-green-500/25 text-green-300 border border-green-400 rounded px-1.5 py-0.5';
    if (isTarget && !wasSelected) return 'bg-red-500/25 text-red-300 border border-red-400 border-dashed rounded px-1.5 py-0.5 animate-pulse';
    if (!isTarget && wasSelected) return 'bg-red-500/25 text-red-300 border border-red-400 rounded px-1.5 py-0.5';
    return '';
  };

  const foundCount = selected.size;

  return (
    <div>
      {/* Live counter */}
      {!submitted && (
        <div className="flex items-center gap-2 mb-3 text-xs text-slate-300">
          <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
          <span>{lang === 'vi' ? `Đã chọn: ${foundCount} / ${totalTargets} thủ thuật` : `Selected: ${foundCount} / ${totalTargets} tricks`}</span>
        </div>
      )}

      {/* Message bubble */}
      <div className="bg-zinc-800/80 border border-zinc-600 rounded-xl p-4 mb-4 text-sm text-zinc-200 leading-loose shadow-inner">
        {segments.map((seg, i) =>
          seg.id ? (
            <span key={i} className={getSegmentStyle(seg.id)} onClick={() => toggle(seg.id!)}>
              {seg.text}
            </span>
          ) : (
            <span key={i}>{seg.text}</span>
          )
        )}
      </div>

      {submitted && (
        <>
          <ResultBanner score={score} total={totalTargets} label={t.minigame_score} />
          <div className="space-y-2 mb-4">
            {data.targets.map((target, i) => (
              <div
                key={target.id}
                className={`p-3 rounded-lg text-sm border transition-all ${
                  selected.has(target.id) ? 'border-green-600/60 bg-green-900/20' : 'border-red-700/60 bg-red-900/20'
                }`}
                style={{ animationDelay: `${i * 80}ms` }}
              >
                <div className="flex items-center gap-2 mb-1">
                  {selected.has(target.id)
                    ? <CheckCircle2 className="w-4 h-4 text-green-400 shrink-0" />
                    : <XCircle className="w-4 h-4 text-red-400 shrink-0" />}
                  <span className="font-semibold text-amber-300">{lang === 'vi' ? target.tag.vi : target.tag.en}</span>
                </div>
                <p className="text-slate-300 text-xs pl-6 leading-relaxed">{lang === 'vi' ? target.explanation.vi : target.explanation.en}</p>
              </div>
            ))}
          </div>
        </>
      )}

      <div className="flex gap-3">
        {!submitted ? (
          <button
            onClick={() => setSubmitted(true)}
            disabled={selected.size === 0}
            className="flex-1 py-2.5 rounded-lg bg-amber-500 hover:bg-amber-400 active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed text-white font-bold text-sm transition-all"
          >
            {t.minigame_check}
          </button>
        ) : (
          <>
            <button onClick={() => { setSelected(new Set()); setSubmitted(false); }} className="py-2.5 px-4 rounded-lg bg-zinc-700 hover:bg-zinc-600 active:scale-95 text-zinc-300 text-sm transition-all">
              <RotateCcw className="w-4 h-4" />
            </button>
            <button
              onClick={() => onDone(score)}
              className="flex-1 py-2.5 rounded-lg bg-green-600 hover:bg-green-500 active:scale-95 text-white font-bold text-sm transition-all flex items-center justify-center gap-2"
            >
              {t.minigame_continue} <ChevronRight className="w-4 h-4" />
            </button>
          </>
        )}
      </div>
    </div>
  );
};

// ─── 2. SORT CARDS (with drag-and-drop) ───────────────────────────────────────

const SortCards: React.FC<{ data: SortCardsData; lang: Language; onDone: (score: number) => void }> = ({
  data, lang, onDone,
}) => {
  const t = TRANSLATIONS[lang];
  const [assignments, setAssignments] = useState<Record<number, string>>({});
  const [selectedCard, setSelectedCard] = useState<number | null>(null);
  const [dragging, setDragging] = useState<number | null>(null);
  const [dragOver, setDragOver] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);

  const unassigned = data.cards.filter(c => !assignments[c.id]);
  const score = submitted
    ? data.cards.filter(c => assignments[c.id] === c.correctBucket).length
    : 0;

  const handleAssign = (cardId: number, bucketId: string) => {
    setAssignments(prev => ({ ...prev, [cardId]: bucketId }));
    setSelectedCard(null);
    setDragging(null);
    setDragOver(null);
  };

  const handleUnassign = (cardId: number) => {
    if (submitted) return;
    setAssignments(prev => { const n = { ...prev }; delete n[cardId]; return n; });
  };

  // Click flow (mobile fallback)
  const handleCardClick = (id: number) => {
    if (submitted) return;
    setSelectedCard(prev => prev === id ? null : id);
  };
  const handleBucketClick = (bucketId: string) => {
    if (!selectedCard || submitted) return;
    handleAssign(selectedCard, bucketId);
  };

  // Drag flow (desktop)
  const handleDragStart = (e: React.DragEvent, cardId: number) => {
    e.dataTransfer.setData('cardId', String(cardId));
    e.dataTransfer.effectAllowed = 'move';
    setDragging(cardId);
    setSelectedCard(null);
  };
  const handleDragEnd = () => { setDragging(null); setDragOver(null); };
  const handleDragOver = (e: React.DragEvent, bucketId: string) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    setDragOver(bucketId);
  };
  const handleDragLeave = () => setDragOver(null);
  const handleDrop = (e: React.DragEvent, bucketId: string) => {
    e.preventDefault();
    const cardId = Number(e.dataTransfer.getData('cardId'));
    if (cardId) handleAssign(cardId, bucketId);
  };

  const bucketCount = (id: string) => data.cards.filter(c => assignments[c.id] === id).length;

  return (
    <div>
      {/* Hint */}
      {!submitted && (
        <p className="text-[11px] text-slate-400 mb-3 flex items-center gap-1.5">
          <span>🖱️</span>
          <span>{lang === 'vi' ? 'Kéo thẻ vào nhóm hoặc nhấn thẻ rồi nhấn nhóm' : 'Drag cards to groups, or tap a card then tap a group'}</span>
        </p>
      )}

      {/* Buckets */}
      <div className="grid grid-cols-3 gap-2 mb-4">
        {data.buckets.map(bucket => {
          const isOver = dragOver === bucket.id;
          const isActive = selectedCard !== null && !submitted;
          const count = bucketCount(bucket.id);
          return (
            <button
              key={bucket.id}
              onClick={() => handleBucketClick(bucket.id)}
              onDragOver={e => handleDragOver(e, bucket.id)}
              onDragLeave={handleDragLeave}
              onDrop={e => handleDrop(e, bucket.id)}
              className={`p-3 rounded-xl border text-xs font-semibold transition-all select-none ${
                isOver
                  ? 'border-amber-400 bg-amber-500/20 scale-105 shadow-lg shadow-amber-500/20'
                  : isActive
                    ? 'border-amber-500/60 bg-amber-500/8 text-amber-300 cursor-pointer hover:bg-amber-500/15'
                    : 'border-zinc-700 bg-zinc-800/60 text-slate-300 cursor-default'
              }`}
            >
              <div className="text-xl mb-1">{bucket.icon}</div>
              <div className="leading-tight">{lang === 'vi' ? bucket.label.vi : bucket.label.en}</div>
              {count > 0 && (
                <div className="mt-1.5 px-1.5 py-0.5 bg-zinc-700 rounded-full text-[10px] text-zinc-300 inline-block">
                  {count} thẻ
                </div>
              )}
            </button>
          );
        })}
      </div>

      {/* Unassigned cards */}
      {!submitted && unassigned.length > 0 && (
        <div className="space-y-2 mb-4">
          {unassigned.map((card, i) => (
            <div
              key={card.id}
              draggable={!submitted}
              onDragStart={e => handleDragStart(e, card.id)}
              onDragEnd={handleDragEnd}
              onClick={() => handleCardClick(card.id)}
              className={`p-3 rounded-lg border text-sm cursor-grab active:cursor-grabbing select-none transition-all ${
                dragging === card.id
                  ? 'opacity-40 scale-95 border-amber-500 bg-amber-500/10'
                  : selectedCard === card.id
                    ? 'border-amber-500 bg-amber-500/15 text-amber-200 shadow-md shadow-amber-500/20'
                    : 'border-zinc-600 bg-zinc-800/70 text-zinc-300 hover:border-zinc-400 hover:bg-zinc-800'
              }`}
              style={{ animationDelay: `${i * 60}ms` }}
            >
              {lang === 'vi' ? card.text.vi : card.text.en}
            </div>
          ))}
        </div>
      )}

      {/* Assigned cards (pre-submit) */}
      {!submitted && Object.keys(assignments).length > 0 && (
        <div className="space-y-1.5 mb-4">
          {data.cards.filter(c => assignments[c.id]).map(card => {
            const bucket = data.buckets.find(b => b.id === assignments[card.id]);
            return (
              <div
                key={card.id}
                onClick={() => handleUnassign(card.id)}
                className="flex items-center gap-2 p-2.5 rounded-lg bg-zinc-800/50 border border-zinc-700/60 text-xs text-slate-300 cursor-pointer hover:border-red-700/60 hover:text-red-400 transition-all group"
              >
                <span className="text-base shrink-0">{bucket?.icon}</span>
                <span className="flex-1 truncate text-zinc-300">{lang === 'vi' ? card.text.vi : card.text.en}</span>
                <XCircle className="w-3.5 h-3.5 shrink-0 opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            );
          })}
        </div>
      )}

      {/* Results */}
      {submitted && (
        <>
          <ResultBanner score={score} total={data.cards.length} label={t.minigame_score} />
          <div className="space-y-2 mb-4">
            {data.cards.map((card, i) => {
              const correct = assignments[card.id] === card.correctBucket;
              const assignedBucket = data.buckets.find(b => b.id === assignments[card.id]);
              const correctBucket = data.buckets.find(b => b.id === card.correctBucket);
              return (
                <div
                  key={card.id}
                  className={`p-3 rounded-lg text-xs border transition-all ${correct ? 'border-green-700/60 bg-green-900/20' : 'border-red-700/60 bg-red-900/20'}`}
                  style={{ animationDelay: `${i * 60}ms` }}
                >
                  <div className="flex items-start gap-2">
                    {correct ? <CheckCircle2 className="w-4 h-4 text-green-400 mt-0.5 shrink-0" /> : <XCircle className="w-4 h-4 text-red-400 mt-0.5 shrink-0" />}
                    <div>
                      <p className="text-zinc-300 mb-1 leading-relaxed">{lang === 'vi' ? card.text.vi : card.text.en}</p>
                      {!correct && (
                        <p className="text-red-400 mb-0.5">✗ {assignedBucket ? (lang === 'vi' ? assignedBucket.label.vi : assignedBucket.label.en) : '—'}</p>
                      )}
                      <p className="text-green-400 mb-0.5">✓ {lang === 'vi' ? correctBucket?.label.vi : correctBucket?.label.en}</p>
                      <p className="text-slate-400 mt-1 leading-relaxed">{lang === 'vi' ? card.explanation.vi : card.explanation.en}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </>
      )}

      <div className="flex gap-3">
        {!submitted ? (
          <button
            onClick={() => setSubmitted(true)}
            disabled={Object.keys(assignments).length < data.cards.length}
            className="flex-1 py-2.5 rounded-lg bg-amber-500 hover:bg-amber-400 active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed text-white font-bold text-sm transition-all"
          >
            {t.minigame_check}
          </button>
        ) : (
          <button
            onClick={() => onDone(score)}
            className="flex-1 py-2.5 rounded-lg bg-green-600 hover:bg-green-500 active:scale-95 text-white font-bold text-sm transition-all flex items-center justify-center gap-2"
          >
            {t.minigame_continue} <ChevronRight className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  );
};

// ─── 3. ORDER STEPS ───────────────────────────────────────────────────────────

const OrderSteps: React.FC<{ data: OrderStepsData; lang: Language; onDone: (score: number) => void }> = ({
  data, lang, onDone,
}) => {
  const t = TRANSLATIONS[lang];
  const shuffled = useMemo(() => [...data.steps].sort(() => Math.random() - 0.5), [data.steps]);
  const [pool, setPool] = useState(shuffled.map(s => s.id));
  const [ordered, setOrdered] = useState<number[]>([]);
  const [submitted, setSubmitted] = useState(false);

  const correctOrder = data.steps.map(s => s.id);
  const score = submitted
    ? ordered.filter((id, i) => id === correctOrder[i]).length
    : 0;

  const addToOrder = (id: number) => {
    if (submitted) return;
    setPool(p => p.filter(x => x !== id));
    setOrdered(o => [...o, id]);
  };

  const removeFromOrder = (id: number) => {
    if (submitted) return;
    setOrdered(o => o.filter(x => x !== id));
    setPool(p => [...p, id]);
  };

  const getStep = (id: number) => data.steps.find(s => s.id === id)!;
  const hasSelection = pool.length < data.steps.length || ordered.length > 0;

  return (
    <div>
      {/* Slots */}
      <div className="flex gap-1.5 mb-5">
        {data.steps.map((_, i) => {
          const id = ordered[i];
          const step = id ? getStep(id) : null;
          const correct = submitted && id !== undefined && correctOrder[i] === id;
          const wrong = submitted && id !== undefined && correctOrder[i] !== id;
          const isEmpty = !id;
          const isNextSlot = !submitted && ordered.length === i;
          return (
            <div
              key={i}
              onClick={() => id && removeFromOrder(id)}
              className={`flex-1 min-h-[72px] rounded-xl border-2 flex flex-col items-center justify-center text-center p-1.5 text-xs transition-all ${
                isEmpty
                  ? isNextSlot
                    ? 'border-dashed border-amber-500/50 bg-amber-500/5 text-amber-500/50'
                    : 'border-dashed border-zinc-600/50 bg-zinc-800/20 text-zinc-600'
                  : correct
                    ? 'border-green-500 bg-green-900/25 cursor-pointer'
                    : wrong
                      ? 'border-red-500 bg-red-900/25 cursor-pointer'
                      : 'border-amber-500/70 bg-amber-500/10 cursor-pointer hover:border-red-500/70 hover:bg-red-500/10'
              }`}
            >
              <span className="text-lg leading-none mb-0.5">{step?.icon ?? (i + 1)}</span>
              {step ? (
                <span className="text-[10px] font-semibold text-zinc-300 leading-tight">
                  {lang === 'vi' ? step.label.vi.replace(/^[^ ]+ /, '') : step.label.en.replace(/^[^ ]+ /, '')}
                </span>
              ) : (
                <span className="text-[10px] opacity-60">{i + 1}</span>
              )}
            </div>
          );
        })}
      </div>

      {/* Pool */}
      {!submitted && pool.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-4">
          {pool.map((id, i) => {
            const s = getStep(id);
            return (
              <button
                key={id}
                onClick={() => addToOrder(id)}
                className="flex items-center gap-2 px-3 py-2 rounded-lg bg-zinc-800 border border-zinc-600 hover:border-amber-500/70 hover:bg-amber-500/8 hover:text-amber-300 active:scale-95 text-zinc-300 text-sm transition-all"
                style={{ animationDelay: `${i * 50}ms` }}
              >
                <span className="text-base">{s.icon}</span>
                <span>{lang === 'vi' ? s.label.vi : s.label.en}</span>
              </button>
            );
          })}
        </div>
      )}

      {/* Pool empty hint */}
      {!submitted && pool.length === 0 && !submitted && (
        <p className="text-xs text-slate-400 mb-4 text-center">
          {lang === 'vi' ? '✓ Đã sắp xếp hết — nhấn "Kiểm tra" để xem kết quả' : '✓ All placed — click "Check" to see results'}
        </p>
      )}

      {/* Results */}
      {submitted && (
        <>
          <ResultBanner score={score} total={data.steps.length} label={t.minigame_score} />
          <div className="space-y-2 mb-4">
            {data.steps.map((step, i) => {
              const placedId = ordered[i];
              const correct = placedId === step.id;
              return (
                <div
                  key={step.id}
                  className={`flex items-start gap-3 p-3 rounded-lg border text-sm transition-all ${correct ? 'border-green-700/60 bg-green-900/20' : 'border-red-700/60 bg-red-900/20'}`}
                  style={{ animationDelay: `${i * 60}ms` }}
                >
                  <span className="text-xl shrink-0">{step.icon}</span>
                  <div className="flex-1">
                    <p className="font-bold text-zinc-200">{i + 1}. {lang === 'vi' ? step.label.vi : step.label.en}</p>
                    <p className="text-xs text-slate-300 mt-0.5 leading-relaxed">{lang === 'vi' ? step.description.vi : step.description.en}</p>
                  </div>
                  {correct
                    ? <CheckCircle2 className="w-4 h-4 text-green-400 shrink-0 mt-0.5" />
                    : <XCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />}
                </div>
              );
            })}
          </div>
        </>
      )}

      <div className="flex gap-3">
        {!submitted ? (
          <button
            onClick={() => setSubmitted(true)}
            disabled={ordered.length < data.steps.length}
            className="flex-1 py-2.5 rounded-lg bg-amber-500 hover:bg-amber-400 active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed text-white font-bold text-sm transition-all"
          >
            {t.minigame_check}
          </button>
        ) : (
          <button
            onClick={() => onDone(score)}
            className="flex-1 py-2.5 rounded-lg bg-green-600 hover:bg-green-500 active:scale-95 text-white font-bold text-sm transition-all flex items-center justify-center gap-2"
          >
            {t.minigame_continue} <ChevronRight className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  );
};

// ─── 4. SHIELD MATCH ──────────────────────────────────────────────────────────

const ShieldMatch: React.FC<{ data: ShieldMatchData; lang: Language; onDone: (score: number) => void }> = ({
  data, lang, onDone,
}) => {
  const t = TRANSLATIONS[lang];
  const [pairs, setPairs] = useState<Record<number, string>>({});
  const [selectedScenario, setSelectedScenario] = useState<number | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [justPaired, setJustPaired] = useState<number | null>(null);

  const score = submitted
    ? data.scenarios.filter(s => pairs[s.id] === s.correctRule).length
    : 0;

  const handleScenarioClick = (id: number) => {
    if (submitted) return;
    setSelectedScenario(prev => prev === id ? null : id);
  };

  const handleRuleClick = (ruleId: string) => {
    if (!selectedScenario || submitted) return;
    setPairs(prev => ({ ...prev, [selectedScenario]: ruleId }));
    setJustPaired(selectedScenario);
    setSelectedScenario(null);
    setTimeout(() => setJustPaired(null), 400);
  };

  const unpairedScenarios = data.scenarios.filter(s => !pairs[s.id]);
  const usedRules = new Set(Object.values(pairs));

  return (
    <div>
      {/* Instruction hint */}
      {!submitted && (
        <p className="text-[11px] text-slate-400 mb-3 flex items-center gap-1.5">
          <span>💡</span>
          <span>{lang === 'vi' ? 'Nhấn một tình huống, rồi nhấn lá chắn phòng vệ phù hợp nhất' : 'Tap a scenario, then tap the best matching defence rule'}</span>
        </p>
      )}

      {/* Rules */}
      <div className="flex flex-wrap gap-2 mb-4">
        {data.rules.map(rule => {
          const isUsed = usedRules.has(rule.id);
          const isAvailable = selectedScenario !== null && !isUsed && !submitted;
          return (
            <button
              key={rule.id}
              onClick={() => handleRuleClick(rule.id)}
              disabled={(isUsed && !submitted) || (!selectedScenario && !submitted)}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold border transition-all ${
                isAvailable
                  ? 'border-amber-400 bg-amber-500/15 text-amber-300 hover:bg-amber-500/25 hover:scale-105 cursor-pointer shadow-sm shadow-amber-500/20 animate-pulse'
                  : isUsed && !submitted
                    ? 'border-zinc-700/50 bg-zinc-800/40 text-zinc-600 cursor-not-allowed opacity-40'
                    : 'border-zinc-700 bg-zinc-800/60 text-slate-300'
              }`}
            >
              <span className="text-sm">{rule.icon}</span>
              <span>{lang === 'vi' ? rule.label.vi : rule.label.en}</span>
            </button>
          );
        })}
      </div>

      {/* Unpaired scenarios */}
      {!submitted && unpairedScenarios.length > 0 && (
        <div className="space-y-2 mb-4">
          {unpairedScenarios.map((scenario, i) => (
            <div
              key={scenario.id}
              onClick={() => handleScenarioClick(scenario.id)}
              className={`p-3 rounded-lg border text-sm cursor-pointer transition-all ${
                selectedScenario === scenario.id
                  ? 'border-amber-500 bg-amber-500/12 text-amber-100 shadow-md shadow-amber-500/15'
                  : 'border-zinc-600/70 bg-zinc-800/60 text-zinc-300 hover:border-zinc-500 hover:bg-zinc-800'
              }`}
              style={{ animationDelay: `${i * 60}ms` }}
            >
              {lang === 'vi' ? scenario.text.vi : scenario.text.en}
            </div>
          ))}
        </div>
      )}

      {/* Paired (pre-submit) */}
      {!submitted && Object.keys(pairs).length > 0 && (
        <div className="space-y-1.5 mb-4">
          {data.scenarios.filter(s => pairs[s.id]).map(scenario => {
            const rule = data.rules.find(r => r.id === pairs[scenario.id]);
            const isNew = justPaired === scenario.id;
            return (
              <div
                key={scenario.id}
                onClick={() => {
                  setPairs(p => { const n = { ...p }; delete n[scenario.id]; return n; });
                  setSelectedScenario(scenario.id);
                }}
                className={`flex items-center gap-2 p-2.5 rounded-lg border text-xs cursor-pointer hover:border-red-700/60 transition-all group ${
                  isNew ? 'border-green-500/60 bg-green-900/20 scale-[1.02]' : 'bg-zinc-800/40 border-zinc-700/60 text-slate-300'
                }`}
              >
                <span className="text-base shrink-0">{rule?.icon}</span>
                <span className="flex-1 truncate text-zinc-300">{lang === 'vi' ? scenario.text.vi : scenario.text.en}</span>
                <XCircle className="w-3.5 h-3.5 shrink-0 opacity-0 group-hover:opacity-100 transition-opacity text-red-400" />
              </div>
            );
          })}
        </div>
      )}

      {/* Results */}
      {submitted && (
        <>
          <ResultBanner score={score} total={data.scenarios.length} label={t.minigame_score} />
          <div className="space-y-2 mb-4">
            {data.scenarios.map((scenario, i) => {
              const correct = pairs[scenario.id] === scenario.correctRule;
              const assignedRule = data.rules.find(r => r.id === pairs[scenario.id]);
              const correctRule = data.rules.find(r => r.id === scenario.correctRule);
              return (
                <div
                  key={scenario.id}
                  className={`p-3 rounded-lg text-xs border transition-all ${correct ? 'border-green-700/60 bg-green-900/20' : 'border-red-700/60 bg-red-900/20'}`}
                  style={{ animationDelay: `${i * 60}ms` }}
                >
                  <div className="flex items-start gap-2">
                    {correct ? <CheckCircle2 className="w-4 h-4 text-green-400 shrink-0" /> : <XCircle className="w-4 h-4 text-red-400 shrink-0" />}
                    <div>
                      <p className="text-zinc-300 mb-1 leading-relaxed">{lang === 'vi' ? scenario.text.vi : scenario.text.en}</p>
                      {!correct && assignedRule && (
                        <p className="text-red-400 mb-0.5">✗ {lang === 'vi' ? assignedRule.label.vi : assignedRule.label.en}</p>
                      )}
                      <p className="text-green-400 mb-0.5">✓ {lang === 'vi' ? correctRule?.label.vi : correctRule?.label.en}</p>
                      <p className="text-slate-400 mt-1 leading-relaxed">{lang === 'vi' ? scenario.explanation.vi : scenario.explanation.en}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </>
      )}

      <div className="flex gap-3">
        {!submitted ? (
          <button
            onClick={() => setSubmitted(true)}
            disabled={Object.keys(pairs).length < data.scenarios.length}
            className="flex-1 py-2.5 rounded-lg bg-amber-500 hover:bg-amber-400 active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed text-white font-bold text-sm transition-all"
          >
            {t.minigame_check}
          </button>
        ) : (
          <button
            onClick={() => onDone(score)}
            className="flex-1 py-2.5 rounded-lg bg-green-600 hover:bg-green-500 active:scale-95 text-white font-bold text-sm transition-all flex items-center justify-center gap-2"
          >
            {t.minigame_continue} <ChevronRight className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  );
};

// ─── 5. RISK METER ────────────────────────────────────────────────────────────

const RISK_EMOJIS = ['', '😌', '🤔', '😐', '😰', '🚨'];
const RISK_COLORS = ['', '#10b981', '#84cc16', '#f59e0b', '#f97316', '#ef4444'];

const RiskMeter: React.FC<{ data: RiskMeterData; lang: Language; onDone: (score: number) => void }> = ({
  data, lang, onDone,
}) => {
  const t = TRANSLATIONS[lang];
  const [currentIdx, setCurrentIdx] = useState(0);
  const [ratings, setRatings] = useState<number[]>(data.scenarios.map(() => 3));
  const [revealed, setRevealed] = useState<boolean[]>(data.scenarios.map(() => false));

  const scenario = data.scenarios[currentIdx];
  const allRevealed = revealed.every(Boolean);

  const diffLabel = (diff: number) => {
    if (diff === 0) return { text: lang === 'vi' ? '🎯 Chính xác!' : '🎯 Spot on!', color: 'text-green-400' };
    if (diff <= 1) return { text: lang === 'vi' ? '👍 Gần đúng' : '👍 Close', color: 'text-amber-400' };
    return { text: lang === 'vi' ? '⚠️ Chênh lệch nhiều' : '⚠️ Off by a lot', color: 'text-red-400' };
  };

  const riskLabel = (r: number) => {
    const labels = lang === 'vi'
      ? ['', 'Rất thấp', 'Thấp', 'Trung bình', 'Cao', 'Rất cao']
      : ['', 'Very Low', 'Low', 'Medium', 'High', 'Very High'];
    return labels[r] ?? '';
  };

  const totalScore = data.scenarios.reduce((acc, s, i) => {
    return acc + (Math.abs(ratings[i] - s.expertRating) === 0 ? 1 : 0);
  }, 0);

  const currentRating = ratings[currentIdx];
  const sliderColor = RISK_COLORS[currentRating] || '#f59e0b';

  return (
    <div>
      {/* Scenario progress dots */}
      <div className="flex gap-1.5 mb-4">
        {data.scenarios.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrentIdx(i)}
            className={`flex-1 h-2 rounded-full transition-all ${
              revealed[i] ? 'bg-green-500' : i === currentIdx ? 'bg-amber-500 shadow-sm shadow-amber-500/50' : 'bg-zinc-700 hover:bg-zinc-600'
            }`}
          />
        ))}
      </div>

      {/* Scenario number */}
      <p className="text-[11px] text-slate-400 mb-2 font-bold uppercase tracking-[0.12em]">
        {lang === 'vi' ? `Kịch bản ${currentIdx + 1} / ${data.scenarios.length}` : `Scenario ${currentIdx + 1} / ${data.scenarios.length}`}
      </p>

      {/* Scenario text */}
      <div className="bg-zinc-800/80 border border-zinc-600/70 rounded-xl p-4 mb-5 shadow-inner">
        <p className="text-sm text-zinc-200 leading-relaxed">{lang === 'vi' ? scenario.text.vi : scenario.text.en}</p>
      </div>

      {/* Slider + visual */}
      <div className="mb-5">
        {/* Emoji + label display */}
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs text-slate-400">{riskLabel(1)}</span>
          <div className="flex items-center gap-2">
            <span className="text-2xl transition-all">{RISK_EMOJIS[currentRating]}</span>
            <span className="text-sm font-bold" style={{ color: sliderColor }}>
              {currentRating}/5 — {riskLabel(currentRating)}
            </span>
          </div>
          <span className="text-xs text-slate-400">{riskLabel(5)}</span>
        </div>

        {/* Gradient track background */}
        <div className="relative mb-1">
          <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-2 rounded-full bg-gradient-to-r from-green-500 via-amber-400 to-red-500 opacity-30" />
          <input
            type="range"
            min={1} max={5} step={1}
            value={currentRating}
            onChange={e => {
              if (revealed[currentIdx]) return;
              const v = Number(e.target.value);
              setRatings(r => r.map((x, i) => i === currentIdx ? v : x));
            }}
            disabled={revealed[currentIdx]}
            className="relative w-full h-2 appearance-none bg-transparent cursor-pointer disabled:cursor-not-allowed [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-white [&::-webkit-slider-thumb]:shadow-lg [&::-webkit-slider-thumb]:transition-all [&::-webkit-slider-runnable-track]:rounded-full [&::-webkit-slider-runnable-track]:h-2 [&::-webkit-slider-runnable-track]:bg-zinc-700"
            style={{
              accentColor: sliderColor,
            }}
          />
        </div>

        {/* Tick marks */}
        <div className="flex justify-between text-[10px] text-zinc-600 px-1">
          {[1, 2, 3, 4, 5].map(n => (
            <span key={n} className={n === currentRating ? 'font-bold text-slate-300' : ''}>{n}</span>
          ))}
        </div>
      </div>

      {/* Reveal result */}
      {revealed[currentIdx] && (
        <div className="bg-zinc-800/70 border border-zinc-600/60 rounded-xl p-4 mb-4 animate-in fade-in slide-in-from-bottom-2 duration-300">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-full flex items-center justify-center text-xl shrink-0" style={{ backgroundColor: `${RISK_COLORS[scenario.expertRating]}20`, border: `1px solid ${RISK_COLORS[scenario.expertRating]}40` }}>
              {RISK_EMOJIS[scenario.expertRating]}
            </div>
            <div className="flex-1">
              <div className="text-xs text-slate-300 mb-0.5">{t.minigame_expert_says}</div>
              <div className="font-bold" style={{ color: RISK_COLORS[scenario.expertRating] }}>
                {scenario.expertRating}/5 — {riskLabel(scenario.expertRating)}
              </div>
            </div>
            <span className={`text-sm font-bold ${diffLabel(Math.abs(ratings[currentIdx] - scenario.expertRating)).color}`}>
              {diffLabel(Math.abs(ratings[currentIdx] - scenario.expertRating)).text}
            </span>
          </div>
          <p className="text-xs text-slate-300 leading-relaxed">{lang === 'vi' ? scenario.explanation.vi : scenario.explanation.en}</p>
        </div>
      )}

      {/* Controls */}
      <div className="flex gap-2">
        {!revealed[currentIdx] ? (
          <button
            onClick={() => setRevealed(r => r.map((v, i) => i === currentIdx ? true : v))}
            className="flex-1 py-2.5 rounded-lg bg-amber-500 hover:bg-amber-400 active:scale-95 text-white font-bold text-sm transition-all"
          >
            {t.minigame_check}
          </button>
        ) : currentIdx < data.scenarios.length - 1 ? (
          <button
            onClick={() => setCurrentIdx(i => i + 1)}
            className="flex-1 py-2.5 rounded-lg bg-zinc-700 hover:bg-zinc-600 active:scale-95 text-zinc-200 text-sm font-semibold transition-all flex items-center justify-center gap-2"
          >
            {lang === 'vi' ? 'Kịch bản tiếp theo' : 'Next Scenario'} <ChevronRight className="w-4 h-4" />
          </button>
        ) : null}
        {allRevealed && (
          <button
            onClick={() => onDone(totalScore)}
            className="flex-1 py-2.5 rounded-lg bg-green-600 hover:bg-green-500 active:scale-95 text-white font-bold text-sm transition-all flex items-center justify-center gap-2"
          >
            {t.minigame_continue} <ChevronRight className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* All revealed summary */}
      {allRevealed && (
        <div className="mt-3">
          <ResultBanner score={totalScore} total={data.scenarios.length} label={t.minigame_score} />
        </div>
      )}
    </div>
  );
};

// ─── Main dispatcher ──────────────────────────────────────────────────────────

const LessonMiniGame: React.FC<LessonMiniGameProps> = ({ config, lang, onComplete }) => {
  const t = TRANSLATIONS[lang];
  const containerRef = useRef<HTMLDivElement>(null);

  // Scroll into view on mount
  useEffect(() => {
    setTimeout(() => containerRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' }), 100);
  }, []);

  const gameContent = () => {
    switch (config.type) {
      case 'tag-the-trick':
        return <TagTheTrick data={config.data as TagTheTrickData} lang={lang} onDone={onComplete} />;
      case 'sort-cards':
        return <SortCards data={config.data as SortCardsData} lang={lang} onDone={onComplete} />;
      case 'order-steps':
        return <OrderSteps data={config.data as OrderStepsData} lang={lang} onDone={onComplete} />;
      case 'shield-match':
        return <ShieldMatch data={config.data as ShieldMatchData} lang={lang} onDone={onComplete} />;
      case 'risk-meter':
        return <RiskMeter data={config.data as RiskMeterData} lang={lang} onDone={onComplete} />;
      default:
        return null;
    }
  };

  return (
    <div
      ref={containerRef}
      className="border border-amber-500/30 rounded-2xl bg-gradient-to-b from-amber-500/5 to-transparent p-5 animate-in fade-in slide-in-from-bottom-4 duration-500"
    >
      {/* Header */}
      <div className="flex items-start gap-3 mb-5 pb-4 border-b border-amber-500/15">
        <div className="w-9 h-9 rounded-full bg-amber-500/20 flex items-center justify-center shrink-0 shadow-inner">
          <Trophy className="w-4 h-4 text-amber-400" />
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-black text-amber-400 leading-tight text-base">
            {lang === 'vi' ? config.title.vi : config.title.en}
          </h3>
          <p className="text-xs text-slate-300 mt-1 leading-relaxed">
            {lang === 'vi' ? config.instruction.vi : config.instruction.en}
          </p>
        </div>
        <div className="shrink-0 text-right">
          <div className="text-[10px] text-slate-400 uppercase tracking-wide">{t.minigame_reward}</div>
          <div className="text-sm font-black text-amber-400">+{config.reward} DPF</div>
        </div>
      </div>

      {/* Game area */}
      {gameContent()}
    </div>
  );
};

export default LessonMiniGame;
