/**
 * DEEPFENSE.ONLINE — Academy Mini-Games
 * @copyright 2025 Ho Xuan Nguyen (25NS039)
 *
 * Renders all 5 mini-game types inline inside a lesson checkpoint:
 *   tag-the-trick | sort-cards | order-steps | shield-match | risk-meter
 */

import React, { useState, useMemo } from 'react';
import { CheckCircle2, XCircle, Trophy, ChevronRight, RotateCcw } from 'lucide-react';
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

// ─── Shared sub-components ────────────────────────────────────────────────────

const GameHeader: React.FC<{ title: string; instruction: string }> = ({ title, instruction }) => (
  <div className="mb-6">
    <h3 className="text-lg font-bold text-amber-400 mb-2">{title}</h3>
    <p className="text-sm text-zinc-300 leading-relaxed">{instruction}</p>
  </div>
);

const ResultBanner: React.FC<{ score: number; total: number; label: string }> = ({ score, total, label }) => {
  const pct = Math.round((score / total) * 100);
  const color = pct >= 80 ? 'text-green-400' : pct >= 50 ? 'text-amber-400' : 'text-red-400';
  return (
    <div className="flex items-center gap-3 p-3 bg-zinc-800 rounded-lg mb-4">
      <Trophy className="w-5 h-5 text-amber-400 shrink-0" />
      <span className="text-sm text-zinc-300">{label}:</span>
      <span className={`text-lg font-bold ${color}`}>{score}/{total}</span>
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

  // Parse message into segments: { text, id? }
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

  const handleSubmit = () => setSubmitted(true);
  const handleReset = () => { setSelected(new Set()); setSubmitted(false); };

  const getSegmentStyle = (id?: number) => {
    if (!id) return '';
    if (!submitted) return selected.has(id)
      ? 'bg-amber-500/30 text-amber-300 border border-amber-500 rounded px-1 cursor-pointer'
      : 'border border-dashed border-zinc-600 rounded px-1 cursor-pointer hover:border-amber-400 hover:text-amber-300 transition-colors';
    const isTarget = data.targets.some(t => t.id === id);
    const wasSelected = selected.has(id);
    if (isTarget && wasSelected) return 'bg-green-500/20 text-green-300 border border-green-500 rounded px-1';
    if (isTarget && !wasSelected) return 'bg-red-500/20 text-red-300 border border-red-500 border-dashed rounded px-1';
    if (!isTarget && wasSelected) return 'bg-red-500/20 text-red-300 border border-red-500 rounded px-1';
    return '';
  };

  return (
    <div>
      <GameHeader
        title={lang === 'vi' ? data.message.vi.replace(/\[\[.+?\|\d+\]\]/g, '…') : ''}
        instruction={t.minigame_select_phrase}
      />

      {/* Message bubble */}
      <div className="bg-zinc-800 border border-zinc-700 rounded-xl p-4 mb-4 text-sm text-zinc-200 leading-loose">
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
            {data.targets.map(target => (
              <div key={target.id} className={`p-3 rounded-lg text-sm border ${
                selected.has(target.id) ? 'border-green-600 bg-green-900/20' : 'border-red-700 bg-red-900/20'
              }`}>
                <div className="flex items-center gap-2 mb-1">
                  {selected.has(target.id)
                    ? <CheckCircle2 className="w-4 h-4 text-green-400 shrink-0" />
                    : <XCircle className="w-4 h-4 text-red-400 shrink-0" />}
                  <span className="font-semibold text-amber-300">{lang === 'vi' ? target.tag.vi : target.tag.en}</span>
                </div>
                <p className="text-zinc-400 text-xs pl-6">{lang === 'vi' ? target.explanation.vi : target.explanation.en}</p>
              </div>
            ))}
          </div>
        </>
      )}

      <div className="flex gap-3">
        {!submitted ? (
          <button
            onClick={handleSubmit}
            disabled={selected.size === 0}
            className="flex-1 py-2 rounded-lg bg-amber-500 hover:bg-amber-400 disabled:opacity-40 disabled:cursor-not-allowed text-black font-semibold text-sm transition-colors"
          >
            {t.minigame_check}
          </button>
        ) : (
          <>
            <button onClick={handleReset} className="py-2 px-4 rounded-lg bg-zinc-700 hover:bg-zinc-600 text-zinc-300 text-sm transition-colors">
              <RotateCcw className="w-4 h-4" />
            </button>
            <button
              onClick={() => onDone(score)}
              className="flex-1 py-2 rounded-lg bg-green-600 hover:bg-green-500 text-white font-semibold text-sm transition-colors flex items-center justify-center gap-2"
            >
              {t.minigame_continue} <ChevronRight className="w-4 h-4" />
            </button>
          </>
        )}
      </div>
    </div>
  );
};

// ─── 2. SORT CARDS ────────────────────────────────────────────────────────────

const SortCards: React.FC<{ data: SortCardsData; lang: Language; onDone: (score: number) => void }> = ({
  data, lang, onDone,
}) => {
  const t = TRANSLATIONS[lang];
  const [assignments, setAssignments] = useState<Record<number, string>>({}); // cardId → bucketId
  const [selectedCard, setSelectedCard] = useState<number | null>(null);
  const [submitted, setSubmitted] = useState(false);

  const unassigned = data.cards.filter(c => !assignments[c.id]);
  const score = submitted
    ? data.cards.filter(c => assignments[c.id] === c.correctBucket).length
    : 0;

  const handleCardClick = (id: number) => {
    if (submitted) return;
    setSelectedCard(prev => prev === id ? null : id);
  };

  const handleBucketClick = (bucketId: string) => {
    if (!selectedCard || submitted) return;
    setAssignments(prev => ({ ...prev, [selectedCard]: bucketId }));
    setSelectedCard(null);
  };

  const handleUnassign = (cardId: number) => {
    if (submitted) return;
    setAssignments(prev => { const n = { ...prev }; delete n[cardId]; return n; });
  };

  return (
    <div>
      {/* Buckets */}
      <div className="grid grid-cols-2 gap-2 mb-4">
        {data.buckets.map(bucket => (
          <button
            key={bucket.id}
            onClick={() => handleBucketClick(bucket.id)}
            className={`p-3 rounded-xl border text-xs font-semibold transition-all ${
              selectedCard
                ? 'border-amber-500 bg-amber-500/10 text-amber-300 hover:bg-amber-500/20 cursor-pointer'
                : 'border-zinc-700 bg-zinc-800 text-zinc-400 cursor-default'
            }`}
          >
            <div className="text-base mb-1">{bucket.icon}</div>
            <div>{lang === 'vi' ? bucket.label.vi : bucket.label.en}</div>
            <div className="mt-1 text-zinc-500 font-normal">
              {data.cards.filter(c => assignments[c.id] === bucket.id).length} kịch bản
            </div>
          </button>
        ))}
      </div>

      {/* Unassigned cards */}
      {!submitted && unassigned.length > 0 && (
        <div className="space-y-2 mb-4">
          {unassigned.map(card => (
            <div
              key={card.id}
              onClick={() => handleCardClick(card.id)}
              className={`p-3 rounded-lg border text-sm cursor-pointer transition-all ${
                selectedCard === card.id
                  ? 'border-amber-500 bg-amber-500/15 text-amber-200'
                  : 'border-zinc-700 bg-zinc-800/60 text-zinc-300 hover:border-zinc-500'
              }`}
            >
              {lang === 'vi' ? card.text.vi : card.text.en}
            </div>
          ))}
        </div>
      )}

      {/* Assigned cards (not yet submitted) */}
      {!submitted && Object.keys(assignments).length > 0 && (
        <div className="space-y-1 mb-4">
          {data.cards.filter(c => assignments[c.id]).map(card => {
            const bucket = data.buckets.find(b => b.id === assignments[card.id]);
            return (
              <div
                key={card.id}
                onClick={() => handleUnassign(card.id)}
                className="flex items-center gap-2 p-2 rounded-lg bg-zinc-800/40 border border-zinc-700 text-xs text-zinc-400 cursor-pointer hover:border-red-700 hover:text-red-400 transition-colors"
              >
                <span className="text-amber-400 shrink-0">{bucket?.icon}</span>
                <span className="flex-1 truncate">{lang === 'vi' ? card.text.vi : card.text.en}</span>
                <XCircle className="w-3.5 h-3.5 shrink-0" />
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
            {data.cards.map(card => {
              const correct = assignments[card.id] === card.correctBucket;
              const assignedBucket = data.buckets.find(b => b.id === assignments[card.id]);
              const correctBucket = data.buckets.find(b => b.id === card.correctBucket);
              return (
                <div key={card.id} className={`p-3 rounded-lg text-xs border ${correct ? 'border-green-700 bg-green-900/20' : 'border-red-700 bg-red-900/20'}`}>
                  <div className="flex items-start gap-2">
                    {correct ? <CheckCircle2 className="w-4 h-4 text-green-400 mt-0.5 shrink-0" /> : <XCircle className="w-4 h-4 text-red-400 mt-0.5 shrink-0" />}
                    <div>
                      <p className="text-zinc-300 mb-1">{lang === 'vi' ? card.text.vi : card.text.en}</p>
                      {!correct && (
                        <p className="text-red-400">✗ {assignedBucket ? (lang === 'vi' ? assignedBucket.label.vi : assignedBucket.label.en) : '—'}</p>
                      )}
                      <p className="text-green-400">✓ {lang === 'vi' ? correctBucket?.label.vi : correctBucket?.label.en}</p>
                      <p className="text-zinc-500 mt-1">{lang === 'vi' ? card.explanation.vi : card.explanation.en}</p>
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
            className="flex-1 py-2 rounded-lg bg-amber-500 hover:bg-amber-400 disabled:opacity-40 disabled:cursor-not-allowed text-black font-semibold text-sm transition-colors"
          >
            {t.minigame_check}
          </button>
        ) : (
          <button
            onClick={() => onDone(score)}
            className="flex-1 py-2 rounded-lg bg-green-600 hover:bg-green-500 text-white font-semibold text-sm transition-colors flex items-center justify-center gap-2"
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

  const correctOrder = data.steps.map(s => s.id); // already in correct order (1→5)
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

  return (
    <div>
      {/* Slots */}
      <div className="flex gap-2 mb-4">
        {data.steps.map((_, i) => {
          const id = ordered[i];
          const step = id ? getStep(id) : null;
          const correct = submitted && id && correctOrder[i] === id;
          const wrong = submitted && id && correctOrder[i] !== id;
          return (
            <div
              key={i}
              onClick={() => id && removeFromOrder(id)}
              className={`flex-1 min-h-[64px] rounded-xl border flex flex-col items-center justify-center text-center p-1 text-xs transition-all ${
                !id ? 'border-dashed border-zinc-600 bg-zinc-800/30 text-zinc-600'
                : correct ? 'border-green-500 bg-green-900/20 cursor-pointer'
                : wrong ? 'border-red-500 bg-red-900/20 cursor-pointer'
                : 'border-amber-500 bg-amber-500/10 cursor-pointer hover:border-red-500'
              }`}
            >
              <span className="text-base">{step?.icon ?? (i + 1)}</span>
              {step && <span className="text-[10px] mt-0.5 font-semibold text-zinc-300 leading-tight">
                {lang === 'vi' ? step.label.vi.replace(/^[^ ]+ /, '') : step.label.en.replace(/^[^ ]+ /, '')}
              </span>}
              {!id && <span className="text-[10px]">{i + 1}</span>}
            </div>
          );
        })}
      </div>

      {/* Pool */}
      {!submitted && pool.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-4">
          {pool.map(id => {
            const s = getStep(id);
            return (
              <button
                key={id}
                onClick={() => addToOrder(id)}
                className="flex items-center gap-2 px-3 py-2 rounded-lg bg-zinc-800 border border-zinc-600 hover:border-amber-500 hover:text-amber-300 text-zinc-300 text-sm transition-colors"
              >
                <span>{s.icon}</span>
                <span>{lang === 'vi' ? s.label.vi : s.label.en}</span>
              </button>
            );
          })}
        </div>
      )}

      {/* Submitted results */}
      {submitted && (
        <>
          <ResultBanner score={score} total={data.steps.length} label={t.minigame_score} />
          <div className="space-y-2 mb-4">
            {data.steps.map((step, i) => {
              const placedId = ordered[i];
              const correct = placedId === step.id;
              return (
                <div key={step.id} className={`flex items-start gap-3 p-3 rounded-lg border text-sm ${correct ? 'border-green-700 bg-green-900/20' : 'border-red-700 bg-red-900/20'}`}>
                  <span className="text-lg">{step.icon}</span>
                  <div>
                    <p className="font-semibold text-zinc-200">{i + 1}. {lang === 'vi' ? step.label.vi : step.label.en}</p>
                    <p className="text-xs text-zinc-400 mt-0.5">{lang === 'vi' ? step.description.vi : step.description.en}</p>
                  </div>
                  {correct
                    ? <CheckCircle2 className="w-4 h-4 text-green-400 shrink-0 ml-auto mt-0.5" />
                    : <XCircle className="w-4 h-4 text-red-400 shrink-0 ml-auto mt-0.5" />}
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
            className="flex-1 py-2 rounded-lg bg-amber-500 hover:bg-amber-400 disabled:opacity-40 disabled:cursor-not-allowed text-black font-semibold text-sm transition-colors"
          >
            {t.minigame_check}
          </button>
        ) : (
          <button
            onClick={() => onDone(score)}
            className="flex-1 py-2 rounded-lg bg-green-600 hover:bg-green-500 text-white font-semibold text-sm transition-colors flex items-center justify-center gap-2"
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
  const [pairs, setPairs] = useState<Record<number, string>>({}); // scenarioId → ruleId
  const [selectedScenario, setSelectedScenario] = useState<number | null>(null);
  const [submitted, setSubmitted] = useState(false);

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
    setSelectedScenario(null);
  };

  const unpairedScenarios = data.scenarios.filter(s => !pairs[s.id]);
  const usedRules = new Set(Object.values(pairs));

  return (
    <div>
      {/* Rules (always visible) */}
      <div className="flex flex-wrap gap-2 mb-4">
        {data.rules.map(rule => {
          const isUsed = usedRules.has(rule.id);
          return (
            <button
              key={rule.id}
              onClick={() => handleRuleClick(rule.id)}
              disabled={isUsed && !submitted}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold border transition-all ${
                selectedScenario && !isUsed
                  ? 'border-amber-500 bg-amber-500/15 text-amber-300 hover:bg-amber-500/25 cursor-pointer'
                  : isUsed && !submitted
                    ? 'border-zinc-700 bg-zinc-800 text-zinc-500 cursor-not-allowed opacity-50'
                    : 'border-zinc-700 bg-zinc-800 text-zinc-400'
              }`}
            >
              <span>{rule.icon}</span>
              <span>{lang === 'vi' ? rule.label.vi : rule.label.en}</span>
            </button>
          );
        })}
      </div>

      {/* Unpaired scenarios */}
      {!submitted && unpairedScenarios.length > 0 && (
        <div className="space-y-2 mb-4">
          {unpairedScenarios.map(scenario => (
            <div
              key={scenario.id}
              onClick={() => handleScenarioClick(scenario.id)}
              className={`p-3 rounded-lg border text-sm cursor-pointer transition-all ${
                selectedScenario === scenario.id
                  ? 'border-amber-500 bg-amber-500/10 text-amber-200'
                  : 'border-zinc-700 bg-zinc-800/50 text-zinc-300 hover:border-zinc-500'
              }`}
            >
              {lang === 'vi' ? scenario.text.vi : scenario.text.en}
            </div>
          ))}
        </div>
      )}

      {/* Paired (before submit) */}
      {!submitted && Object.keys(pairs).length > 0 && (
        <div className="space-y-1 mb-4">
          {data.scenarios.filter(s => pairs[s.id]).map(scenario => {
            const rule = data.rules.find(r => r.id === pairs[scenario.id]);
            return (
              <div
                key={scenario.id}
                onClick={() => {
                  setPairs(p => { const n = { ...p }; delete n[scenario.id]; return n; });
                  setSelectedScenario(scenario.id);
                }}
                className="flex items-center gap-2 p-2 rounded-lg bg-zinc-800/40 border border-zinc-700 text-xs text-zinc-400 cursor-pointer hover:border-red-700 transition-colors"
              >
                <span className="text-amber-400 shrink-0">{rule?.icon}</span>
                <span className="flex-1 truncate">{lang === 'vi' ? scenario.text.vi : scenario.text.en}</span>
                <XCircle className="w-3.5 h-3.5 shrink-0" />
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
            {data.scenarios.map(scenario => {
              const correct = pairs[scenario.id] === scenario.correctRule;
              const assignedRule = data.rules.find(r => r.id === pairs[scenario.id]);
              const correctRule = data.rules.find(r => r.id === scenario.correctRule);
              return (
                <div key={scenario.id} className={`p-3 rounded-lg text-xs border ${correct ? 'border-green-700 bg-green-900/20' : 'border-red-700 bg-red-900/20'}`}>
                  <div className="flex items-start gap-2">
                    {correct ? <CheckCircle2 className="w-4 h-4 text-green-400 shrink-0" /> : <XCircle className="w-4 h-4 text-red-400 shrink-0" />}
                    <div>
                      <p className="text-zinc-300 mb-1">{lang === 'vi' ? scenario.text.vi : scenario.text.en}</p>
                      {!correct && assignedRule && (
                        <p className="text-red-400">✗ {lang === 'vi' ? assignedRule.label.vi : assignedRule.label.en}</p>
                      )}
                      <p className="text-green-400">✓ {lang === 'vi' ? correctRule?.label.vi : correctRule?.label.en}</p>
                      <p className="text-zinc-500 mt-1">{lang === 'vi' ? scenario.explanation.vi : scenario.explanation.en}</p>
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
            className="flex-1 py-2 rounded-lg bg-amber-500 hover:bg-amber-400 disabled:opacity-40 disabled:cursor-not-allowed text-black font-semibold text-sm transition-colors"
          >
            {t.minigame_check}
          </button>
        ) : (
          <button
            onClick={() => onDone(score)}
            className="flex-1 py-2 rounded-lg bg-green-600 hover:bg-green-500 text-white font-semibold text-sm transition-colors flex items-center justify-center gap-2"
          >
            {t.minigame_continue} <ChevronRight className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  );
};

// ─── 5. RISK METER ────────────────────────────────────────────────────────────

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
    const diff = Math.abs(ratings[i] - s.expertRating);
    return acc + (diff === 0 ? 1 : 0);
  }, 0);

  const revealCurrent = () => {
    setRevealed(r => r.map((v, i) => i === currentIdx ? true : v));
  };

  return (
    <div>
      {/* Progress */}
      <div className="flex gap-1 mb-4">
        {data.scenarios.map((_, i) => (
          <div
            key={i}
            onClick={() => setCurrentIdx(i)}
            className={`flex-1 h-1.5 rounded-full cursor-pointer transition-colors ${
              revealed[i] ? 'bg-green-500' : i === currentIdx ? 'bg-amber-500' : 'bg-zinc-700'
            }`}
          />
        ))}
      </div>

      {/* Current scenario */}
      <div className="bg-zinc-800 border border-zinc-700 rounded-xl p-4 mb-4">
        <p className="text-sm text-zinc-300 leading-relaxed">{lang === 'vi' ? scenario.text.vi : scenario.text.en}</p>
      </div>

      {/* Slider */}
      <div className="mb-4">
        <div className="flex justify-between text-xs text-zinc-500 mb-1">
          <span>{riskLabel(1)}</span>
          <span className="text-amber-400 font-semibold">{t.minigame_your_rating}: {riskLabel(ratings[currentIdx])}</span>
          <span>{riskLabel(5)}</span>
        </div>
        <input
          type="range"
          min={1}
          max={5}
          step={1}
          value={ratings[currentIdx]}
          onChange={e => {
            const v = Number(e.target.value);
            setRatings(r => r.map((x, i) => i === currentIdx ? v : x));
          }}
          disabled={revealed[currentIdx]}
          className="w-full accent-amber-500 disabled:opacity-70"
        />
        <div className="flex justify-between text-xs text-zinc-600 mt-1">
          {[1, 2, 3, 4, 5].map(n => <span key={n}>{n}</span>)}
        </div>
      </div>

      {/* Reveal result */}
      {revealed[currentIdx] && (
        <div className="bg-zinc-800/60 border border-zinc-700 rounded-xl p-3 mb-4">
          <div className="flex items-center gap-3 mb-2">
            <div>
              <div className="text-xs text-zinc-400">{t.minigame_expert_says}</div>
              <div className="font-bold text-amber-400">{scenario.expertRating}/5 — {riskLabel(scenario.expertRating)}</div>
            </div>
            <div className="ml-auto">
              <span className={`text-sm font-bold ${diffLabel(Math.abs(ratings[currentIdx] - scenario.expertRating)).color}`}>
                {diffLabel(Math.abs(ratings[currentIdx] - scenario.expertRating)).text}
              </span>
            </div>
          </div>
          <p className="text-xs text-zinc-400">{lang === 'vi' ? scenario.explanation.vi : scenario.explanation.en}</p>
        </div>
      )}

      {/* Controls */}
      <div className="flex gap-2">
        {!revealed[currentIdx] ? (
          <button
            onClick={revealCurrent}
            className="flex-1 py-2 rounded-lg bg-amber-500 hover:bg-amber-400 text-black font-semibold text-sm transition-colors"
          >
            {t.minigame_check}
          </button>
        ) : currentIdx < data.scenarios.length - 1 ? (
          <button
            onClick={() => setCurrentIdx(i => i + 1)}
            className="flex-1 py-2 rounded-lg bg-zinc-700 hover:bg-zinc-600 text-zinc-200 text-sm font-semibold transition-colors flex items-center justify-center gap-2"
          >
            {lang === 'vi' ? 'Kịch bản tiếp theo' : 'Next Scenario'} <ChevronRight className="w-4 h-4" />
          </button>
        ) : null}
        {allRevealed && (
          <button
            onClick={() => onDone(totalScore)}
            className="flex-1 py-2 rounded-lg bg-green-600 hover:bg-green-500 text-white font-semibold text-sm transition-colors flex items-center justify-center gap-2"
          >
            {t.minigame_continue} <ChevronRight className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  );
};

// ─── Main dispatcher ──────────────────────────────────────────────────────────

const LessonMiniGame: React.FC<LessonMiniGameProps> = ({ config, lang, onComplete }) => {
  const t = TRANSLATIONS[lang];

  const handleDone = (score: number) => {
    onComplete(score);
  };

  const gameContent = () => {
    switch (config.type) {
      case 'tag-the-trick':
        return <TagTheTrick data={config.data as TagTheTrickData} lang={lang} onDone={handleDone} />;
      case 'sort-cards':
        return <SortCards data={config.data as SortCardsData} lang={lang} onDone={handleDone} />;
      case 'order-steps':
        return <OrderSteps data={config.data as OrderStepsData} lang={lang} onDone={handleDone} />;
      case 'shield-match':
        return <ShieldMatch data={config.data as ShieldMatchData} lang={lang} onDone={handleDone} />;
      case 'risk-meter':
        return <RiskMeter data={config.data as RiskMeterData} lang={lang} onDone={handleDone} />;
      default:
        return null;
    }
  };

  return (
    <div className="border border-amber-500/30 rounded-2xl bg-amber-500/5 p-5">
      {/* Header */}
      <div className="flex items-start gap-3 mb-4">
        <div className="w-8 h-8 rounded-full bg-amber-500/20 flex items-center justify-center shrink-0">
          <Trophy className="w-4 h-4 text-amber-400" />
        </div>
        <div>
          <h3 className="font-bold text-amber-400 leading-tight">
            {lang === 'vi' ? config.title.vi : config.title.en}
          </h3>
          <p className="text-xs text-zinc-400 mt-0.5">
            {lang === 'vi' ? config.instruction.vi : config.instruction.en}
          </p>
        </div>
        <div className="ml-auto shrink-0 text-right">
          <div className="text-xs text-zinc-500">{t.minigame_reward}</div>
          <div className="text-sm font-bold text-amber-400">+{config.reward} DPF</div>
        </div>
      </div>

      {/* Game area */}
      {gameContent()}
    </div>
  );
};

export default LessonMiniGame;
