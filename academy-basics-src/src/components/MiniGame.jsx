/**
 * MiniGame.jsx — Inline mini-game component for DEEPFENSE BASICS checkpoints.
 * 5 game types: sort-cards | order-steps | tag-the-trick | shield-match | risk-meter
 */
import React, { useState, useMemo, useEffect } from 'react';

// ── Animated score count-up ──────────────────────────────────────────────────
function AnimatedScore({ score, total }) {
  const [displayed, setDisplayed] = useState(0);
  useEffect(() => {
    let frame = 0;
    const steps = 20;
    const inc = score / steps;
    const t = setInterval(() => {
      frame++;
      setDisplayed(Math.min(Math.round(inc * frame), score));
      if (frame >= steps) clearInterval(t);
    }, 30);
    return () => clearInterval(t);
  }, [score]);
  const pct = total > 0 ? Math.round((score / total) * 100) : 0;
  const color = pct >= 80 ? 'var(--green)' : pct >= 50 ? '#f59e0b' : 'var(--red)';
  return <span style={{ color, fontWeight: 800, fontSize: 22, fontVariantNumeric: 'tabular-nums' }}>{displayed}/{total}</span>;
}

// ── Result banner ─────────────────────────────────────────────────────────────
function ResultBanner({ score, total }) {
  const pct = total > 0 ? Math.round((score / total) * 100) : 0;
  const pass = pct >= 80;
  return (
    <div className={`mg-result-banner${pass ? ' pass' : ''}`}>
      <span className="mg-result-icon">{pass ? '🎉' : '📊'}</span>
      <div className="mg-result-text">
        <span className="mg-result-label">Điểm của bạn</span>
        {pass && <span className="mg-result-pass">Xuất sắc!</span>}
      </div>
      <AnimatedScore score={score} total={total} />
    </div>
  );
}

// ── 1. SORT CARDS ─────────────────────────────────────────────────────────────
function SortCards({ data, onDone }) {
  const [assignments, setAssignments] = useState({});
  const [selected, setSelected] = useState(null);
  const [dragging, setDragging] = useState(null);
  const [dragOver, setDragOver] = useState(null);
  const [submitted, setSubmitted] = useState(false);

  const unassigned = data.cards.filter(c => !assignments[c.id]);
  const score = submitted ? data.cards.filter(c => assignments[c.id] === c.correctBucket).length : 0;

  function assign(cardId, bucketId) {
    setAssignments(prev => ({ ...prev, [cardId]: bucketId }));
    setSelected(null);
    setDragging(null);
    setDragOver(null);
  }
  function unassign(cardId) {
    if (submitted) return;
    setAssignments(prev => { const n = { ...prev }; delete n[cardId]; return n; });
  }

  // Click flow
  function onCardClick(id) {
    if (submitted) return;
    setSelected(prev => prev === id ? null : id);
  }
  function onBucketClick(bucketId) {
    if (!selected || submitted) return;
    assign(selected, bucketId);
  }

  // Drag flow
  function onDragStart(e, cardId) {
    e.dataTransfer.setData('cardId', String(cardId));
    e.dataTransfer.effectAllowed = 'move';
    setDragging(cardId);
    setSelected(null);
  }
  function onDragEnd() { setDragging(null); setDragOver(null); }
  function onDragOver(e, bucketId) { e.preventDefault(); setDragOver(bucketId); }
  function onDragLeave() { setDragOver(null); }
  function onDrop(e, bucketId) {
    e.preventDefault();
    const id = Number(e.dataTransfer.getData('cardId'));
    if (id) assign(id, bucketId);
  }

  return (
    <div className="mg-sort-cards">
      {!submitted && (
        <p className="mg-hint">🖱️ Kéo thẻ vào nhóm, hoặc nhấn thẻ rồi nhấn nhóm</p>
      )}

      {/* Buckets */}
      <div className="mg-buckets">
        {data.buckets.map(bucket => {
          const isOver = dragOver === bucket.id;
          const isActive = selected !== null && !submitted;
          const assignedCards = data.cards.filter(c => assignments[c.id] === bucket.id);
          const count = assignedCards.length;
          return (
            <div
              key={bucket.id}
              className={`mg-bucket${isOver ? ' drag-over' : isActive ? ' active' : ''}`}
              onClick={() => onBucketClick(bucket.id)}
              onDragOver={e => onDragOver(e, bucket.id)}
              onDragLeave={onDragLeave}
              onDrop={e => onDrop(e, bucket.id)}
              role="button"
              tabIndex={0}
            >
              <div className="mg-bucket-head">
                <span className="mg-bucket-icon">{bucket.icon}</span>
                <span className="mg-bucket-label">{bucket.label}</span>
                {count > 0 && <span className="mg-bucket-count">{count}</span>}
              </div>
              {!submitted && assignedCards.length > 0 && (
                <div className="mg-bucket-cards">
                  {assignedCards.map(card => (
                    <button
                      key={card.id}
                      type="button"
                      className="mg-bucket-card"
                      onClick={(e) => {
                        e.stopPropagation();
                        unassign(card.id);
                      }}
                      title="Nhan de bo phan loai"
                    >
                      <span>{card.text}</span>
                      <span className="mg-bucket-card-remove">x</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Unassigned cards */}
      {!submitted && unassigned.length > 0 && (
        <div className="mg-cards-pool">
          {unassigned.map(card => (
            <div
              key={card.id}
              draggable={!submitted}
              onDragStart={e => onDragStart(e, card.id)}
              onDragEnd={onDragEnd}
              onClick={() => onCardClick(card.id)}
              className={`mg-card${dragging === card.id ? ' dragging' : selected === card.id ? ' selected' : ''}`}
            >
              {card.text}
            </div>
          ))}
        </div>
      )}

      {/* Assigned cards (pre-submit) */}
      {submitted && false && Object.keys(assignments).length > 0 && (
        <div className="mg-assigned-list">
          {data.cards.filter(c => assignments[c.id]).map(card => {
            const bucket = data.buckets.find(b => b.id === assignments[card.id]);
            return (
              <div key={card.id} className="mg-assigned-item" onClick={() => unassign(card.id)} title="Nhấn để bỏ phân loại">
                <span className="mg-assigned-icon">{bucket?.icon}</span>
                <span className="mg-assigned-text">{card.text}</span>
                <span className="mg-assigned-remove">✕</span>
              </div>
            );
          })}
        </div>
      )}

      {/* Results */}
      {submitted && (
        <>
          <ResultBanner score={score} total={data.cards.length} />
          <div className="mg-results-list">
            {data.cards.map(card => {
              const correct = assignments[card.id] === card.correctBucket;
              const assigned = data.buckets.find(b => b.id === assignments[card.id]);
              const correctB = data.buckets.find(b => b.id === card.correctBucket);
              return (
                <div key={card.id} className={`mg-result-item${correct ? ' correct' : ' wrong'}`}>
                  <span className="mg-result-item-icon">{correct ? '✓' : '✗'}</span>
                  <div className="mg-result-item-body">
                    <p className="mg-result-item-text">{card.text}</p>
                    {!correct && <p className="mg-result-wrong-answer">✗ {assigned ? assigned.label : '—'}</p>}
                    <p className="mg-result-correct-answer">✓ {correctB?.label}</p>
                    {card.explanation && <p className="mg-result-explanation">{card.explanation}</p>}
                  </div>
                </div>
              );
            })}
          </div>
        </>
      )}

      <div className="mg-actions">
        {!submitted ? (
          <button
            className="mg-btn-primary"
            onClick={() => setSubmitted(true)}
            disabled={Object.keys(assignments).length < data.cards.length}
          >
            Kiểm tra kết quả
          </button>
        ) : (
          <button className="mg-btn-success" onClick={() => onDone(score)}>
            Tiếp tục học →
          </button>
        )}
      </div>
    </div>
  );
}

// ── 2. ORDER STEPS ────────────────────────────────────────────────────────────
function OrderSteps({ data, onDone }) {
  const shuffled = useMemo(() => [...data.steps].sort(() => Math.random() - 0.5), []);
  const [pool, setPool] = useState(shuffled.map(s => s.id));
  const [ordered, setOrdered] = useState([]);
  const [submitted, setSubmitted] = useState(false);

  const correctOrder = data.steps.map(s => s.id);
  const score = submitted ? ordered.filter((id, i) => id === correctOrder[i]).length : 0;

  function addStep(id) {
    if (submitted) return;
    setPool(p => p.filter(x => x !== id));
    setOrdered(o => [...o, id]);
  }
  function removeStep(id) {
    if (submitted) return;
    setOrdered(o => o.filter(x => x !== id));
    setPool(p => [...p, id]);
  }

  const getStep = id => data.steps.find(s => s.id === id);

  return (
    <div className="mg-order-steps">
      {/* Slots */}
      <div className="mg-slots">
        {data.steps.map((_, i) => {
          const id = ordered[i];
          const step = id ? getStep(id) : null;
          const isNext = !submitted && ordered.length === i;
          const correct = submitted && id !== undefined && correctOrder[i] === id;
          const wrong = submitted && id !== undefined && correctOrder[i] !== id;
          return (
            <div
              key={i}
              onClick={() => id && removeStep(id)}
              className={`mg-slot${!id ? (isNext ? ' next' : ' empty') : correct ? ' correct' : wrong ? ' wrong' : ' filled'}`}
            >
              <span className="mg-slot-icon">{step?.icon ?? (i + 1)}</span>
              {step && <span className="mg-slot-label">{step.label.replace(/^[^\s]+ /, '')}</span>}
              {!step && <span className="mg-slot-num">{i + 1}</span>}
            </div>
          );
        })}
      </div>

      {/* Pool */}
      {!submitted && pool.length > 0 && (
        <div className="mg-step-pool">
          {pool.map(id => {
            const s = getStep(id);
            return (
              <button key={id} className="mg-step-btn" onClick={() => addStep(id)}>
                <span>{s.icon}</span>
                <span>{s.label}</span>
              </button>
            );
          })}
        </div>
      )}

      {!submitted && pool.length === 0 && (
        <p className="mg-pool-done">✓ Đã sắp xếp hết — nhấn Kiểm tra để xem kết quả</p>
      )}

      {/* Results */}
      {submitted && (
        <>
          <ResultBanner score={score} total={data.steps.length} />
          <div className="mg-results-list">
            {data.steps.map((step, i) => {
              const correct = ordered[i] === step.id;
              return (
                <div key={step.id} className={`mg-result-item${correct ? ' correct' : ' wrong'}`}>
                  <span className="mg-result-item-icon">{correct ? '✓' : '✗'}</span>
                  <div className="mg-result-item-body">
                    <p style={{ fontWeight: 700 }}>{i + 1}. {step.label}</p>
                    {step.description && <p className="mg-result-explanation">{step.description}</p>}
                  </div>
                </div>
              );
            })}
          </div>
        </>
      )}

      <div className="mg-actions">
        {!submitted ? (
          <button className="mg-btn-primary" onClick={() => setSubmitted(true)} disabled={ordered.length < data.steps.length}>
            Kiểm tra kết quả
          </button>
        ) : (
          <button className="mg-btn-success" onClick={() => onDone(score)}>Tiếp tục học →</button>
        )}
      </div>
    </div>
  );
}

// ── 3. TAG THE TRICK ──────────────────────────────────────────────────────────
function TagTheTrick({ data, onDone }) {
  const [selected, setSelected] = useState(new Set());
  const [submitted, setSubmitted] = useState(false);

  const segments = useMemo(() => {
    const parts = [];
    const re = /\[\[(.+?)\|(\d+)\]\]/g;
    let last = 0, match;
    while ((match = re.exec(data.message)) !== null) {
      if (match.index > last) parts.push({ text: data.message.slice(last, match.index) });
      parts.push({ text: match[1], id: Number(match[2]) });
      last = match.index + match[0].length;
    }
    if (last < data.message.length) parts.push({ text: data.message.slice(last) });
    return parts;
  }, [data.message]);

  const totalTargets = data.targets.length;
  const score = submitted ? [...selected].filter(id => data.targets.some(t => t.id === id)).length : 0;

  function toggle(id) {
    if (submitted) return;
    setSelected(prev => {
      const n = new Set(prev);
      n.has(id) ? n.delete(id) : n.add(id);
      return n;
    });
  }

  function segClass(id) {
    if (!id) return '';
    const isTarget = data.targets.some(t => t.id === id);
    const wasSelected = selected.has(id);
    if (!submitted) return selected.has(id) ? 'mg-tag-seg selected' : 'mg-tag-seg';
    if (isTarget && wasSelected) return 'mg-tag-seg correct';
    if (isTarget && !wasSelected) return 'mg-tag-seg missed';
    if (!isTarget && wasSelected) return 'mg-tag-seg wrong';
    return '';
  }

  return (
    <div className="mg-tag-trick">
      {!submitted && (
        <div className="mg-tag-counter">
          <span className="mg-tag-dot" /> Đã chọn: {selected.size} / {totalTargets} thủ thuật
        </div>
      )}

      <div className="mg-tag-message">
        {segments.map((seg, i) =>
          seg.id ? (
            <span key={i} className={segClass(seg.id)} onClick={() => toggle(seg.id)}>{seg.text}</span>
          ) : (
            <span key={i}>{seg.text}</span>
          )
        )}
      </div>

      {submitted && (
        <>
          <ResultBanner score={score} total={totalTargets} />
          <div className="mg-results-list">
            {data.targets.map(target => (
              <div key={target.id} className={`mg-result-item${selected.has(target.id) ? ' correct' : ' wrong'}`}>
                <span className="mg-result-item-icon">{selected.has(target.id) ? '✓' : '✗'}</span>
                <div className="mg-result-item-body">
                  <p style={{ fontWeight: 700, color: '#f59e0b' }}>{target.tag}</p>
                  <p className="mg-result-explanation">{target.explanation}</p>
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      <div className="mg-actions">
        {!submitted ? (
          <button className="mg-btn-primary" onClick={() => setSubmitted(true)} disabled={selected.size === 0}>
            Kiểm tra kết quả
          </button>
        ) : (
          <>
            <button className="mg-btn-ghost" onClick={() => { setSelected(new Set()); setSubmitted(false); }}>↺ Làm lại</button>
            <button className="mg-btn-success" onClick={() => onDone(score)}>Tiếp tục học →</button>
          </>
        )}
      </div>
    </div>
  );
}

// ── 4. SHIELD MATCH ───────────────────────────────────────────────────────────
function ShieldMatch({ data, onDone }) {
  const [pairs, setPairs] = useState({});
  const [selectedScenario, setSelectedScenario] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [justPaired, setJustPaired] = useState(null);

  const score = submitted ? data.scenarios.filter(s => pairs[s.id] === s.correctRule).length : 0;
  const usedRules = new Set(Object.values(pairs));

  function onScenarioClick(id) {
    if (submitted) return;
    setSelectedScenario(prev => prev === id ? null : id);
  }
  function onRuleClick(ruleId) {
    if (!selectedScenario || submitted) return;
    setPairs(prev => ({ ...prev, [selectedScenario]: ruleId }));
    setJustPaired(selectedScenario);
    setSelectedScenario(null);
    setTimeout(() => setJustPaired(null), 400);
  }

  const unpaired = data.scenarios.filter(s => !pairs[s.id]);

  return (
    <div className="mg-shield-match">
      {!submitted && (
        <p className="mg-hint">💡 Nhấn một tình huống, rồi nhấn lá chắn phù hợp nhất</p>
      )}

      {/* Rules */}
      <div className="mg-rules">
        {data.rules.map(rule => {
          const isUsed = usedRules.has(rule.id);
          const isAvailable = selectedScenario !== null && !isUsed && !submitted;
          const pairedScenario = data.scenarios.find(s => pairs[s.id] === rule.id);
          return (
            <div
              key={rule.id}
              className={`mg-rule${isAvailable ? ' available' : isUsed && !submitted ? ' used' : ''}${pairedScenario ? ' filled' : ''}`}
              onClick={() => isAvailable && onRuleClick(rule.id)}
              role="button"
              tabIndex={0}
            >
              <div className="mg-rule-head">
                <span>{rule.icon}</span>
                <span>{rule.label}</span>
              </div>
              {!submitted && pairedScenario && (
                <button
                  type="button"
                  className={`mg-rule-card${justPaired === pairedScenario.id ? ' just-paired' : ''}`}
                  onClick={(e) => {
                    e.stopPropagation();
                    setPairs(p => { const n = {...p}; delete n[pairedScenario.id]; return n; });
                    setSelectedScenario(pairedScenario.id);
                  }}
                  title="Nhan de doi"
                >
                  <span>{pairedScenario.text}</span>
                  <span className="mg-rule-card-remove">x</span>
                </button>
              )}
            </div>
          );
        })}
      </div>

      {/* Unpaired scenarios */}
      {!submitted && unpaired.length > 0 && (
        <div className="mg-cards-pool">
          {unpaired.map(scenario => (
            <div
              key={scenario.id}
              onClick={() => onScenarioClick(scenario.id)}
              className={`mg-card${selectedScenario === scenario.id ? ' selected' : ''}`}
            >
              {scenario.text}
            </div>
          ))}
        </div>
      )}

      {/* Paired (pre-submit) */}
      {submitted && false && Object.keys(pairs).length > 0 && (
        <div className="mg-assigned-list">
          {data.scenarios.filter(s => pairs[s.id]).map(scenario => {
            const rule = data.rules.find(r => r.id === pairs[scenario.id]);
            return (
              <div
                key={scenario.id}
                className={`mg-assigned-item${justPaired === scenario.id ? ' just-paired' : ''}`}
                onClick={() => { setPairs(p => { const n = {...p}; delete n[scenario.id]; return n; }); setSelectedScenario(scenario.id); }}
                title="Nhấn để đổi"
              >
                <span className="mg-assigned-icon">{rule?.icon}</span>
                <span className="mg-assigned-text">{scenario.text}</span>
                <span className="mg-assigned-remove">✕</span>
              </div>
            );
          })}
        </div>
      )}

      {/* Results */}
      {submitted && (
        <>
          <ResultBanner score={score} total={data.scenarios.length} />
          <div className="mg-results-list">
            {data.scenarios.map(scenario => {
              const correct = pairs[scenario.id] === scenario.correctRule;
              const assigned = data.rules.find(r => r.id === pairs[scenario.id]);
              const correctRule = data.rules.find(r => r.id === scenario.correctRule);
              return (
                <div key={scenario.id} className={`mg-result-item${correct ? ' correct' : ' wrong'}`}>
                  <span className="mg-result-item-icon">{correct ? '✓' : '✗'}</span>
                  <div className="mg-result-item-body">
                    <p className="mg-result-item-text">{scenario.text}</p>
                    {!correct && assigned && <p className="mg-result-wrong-answer">✗ {assigned.label}</p>}
                    <p className="mg-result-correct-answer">✓ {correctRule?.label}</p>
                    {scenario.explanation && <p className="mg-result-explanation">{scenario.explanation}</p>}
                  </div>
                </div>
              );
            })}
          </div>
        </>
      )}

      <div className="mg-actions">
        {!submitted ? (
          <button className="mg-btn-primary" onClick={() => setSubmitted(true)} disabled={Object.keys(pairs).length < data.scenarios.length}>
            Kiểm tra kết quả
          </button>
        ) : (
          <button className="mg-btn-success" onClick={() => onDone(score)}>Tiếp tục học →</button>
        )}
      </div>
    </div>
  );
}

// ── 5. RISK METER ─────────────────────────────────────────────────────────────
const RISK_EMOJIS = ['', '😌', '🤔', '😐', '😰', '🚨'];
const RISK_COLORS = ['', '#10b981', '#84cc16', '#f59e0b', '#f97316', '#ef4444'];
const RISK_LABELS = ['', 'Rất thấp', 'Thấp', 'Trung bình', 'Cao', 'Rất cao'];

function RiskMeter({ data, onDone }) {
  const [idx, setIdx] = useState(0);
  const [ratings, setRatings] = useState(data.scenarios.map(() => 3));
  const [revealed, setRevealed] = useState(data.scenarios.map(() => false));

  const scenario = data.scenarios[idx];
  const allRevealed = revealed.every(Boolean);
  const totalScore = data.scenarios.reduce((acc, s, i) => acc + (Math.abs(ratings[i] - s.expertRating) === 0 ? 1 : 0), 0);
  const currentRating = ratings[idx];
  const sliderColor = RISK_COLORS[currentRating] || '#f59e0b';

  function diffLabel(diff) {
    if (diff === 0) return { text: '🎯 Chính xác!', color: 'var(--green)' };
    if (diff <= 1) return { text: '👍 Gần đúng', color: '#f59e0b' };
    return { text: '⚠️ Chênh lệch nhiều', color: 'var(--red)' };
  }

  return (
    <div className="mg-risk-meter">
      {/* Progress dots */}
      <div className="mg-risk-dots">
        {data.scenarios.map((_, i) => (
          <button
            key={i}
            onClick={() => setIdx(i)}
            className={`mg-risk-dot${revealed[i] ? ' done' : i === idx ? ' active' : ''}`}
          />
        ))}
      </div>

      <p className="mg-risk-counter">Kịch bản {idx + 1} / {data.scenarios.length}</p>

      <div className="mg-risk-scenario">
        <p>{scenario.text}</p>
      </div>

      {/* Slider */}
      <div className="mg-risk-slider-wrap">
        <div className="mg-risk-slider-header">
          <span className="mg-risk-slider-label-lo">{RISK_LABELS[1]}</span>
          <div className="mg-risk-slider-center">
            <span className="mg-risk-emoji">{RISK_EMOJIS[currentRating]}</span>
            <span style={{ color: sliderColor, fontWeight: 700 }}>{currentRating}/5 — {RISK_LABELS[currentRating]}</span>
          </div>
          <span className="mg-risk-slider-label-hi">{RISK_LABELS[5]}</span>
        </div>
        <div className="mg-risk-track-wrap">
          <div className="mg-risk-gradient-track" />
          <input
            type="range" min={1} max={5} step={1}
            value={currentRating}
            disabled={revealed[idx]}
            onChange={e => {
              if (revealed[idx]) return;
              setRatings(r => r.map((x, i) => i === idx ? Number(e.target.value) : x));
            }}
            className="mg-risk-slider"
            style={{ accentColor: sliderColor }}
          />
        </div>
        <div className="mg-risk-ticks">
          {[1,2,3,4,5].map(n => <span key={n} style={{ fontWeight: n === currentRating ? 700 : 400, color: n === currentRating ? 'var(--text-1)' : 'var(--text-3)' }}>{n}</span>)}
        </div>
      </div>

      {/* Reveal result */}
      {revealed[idx] && (
        <div className="mg-risk-reveal">
          <div className="mg-risk-expert">
            <div className="mg-risk-expert-icon" style={{ borderColor: RISK_COLORS[scenario.expertRating] + '40', background: RISK_COLORS[scenario.expertRating] + '20' }}>
              {RISK_EMOJIS[scenario.expertRating]}
            </div>
            <div>
              <p className="mg-risk-expert-label">Đánh giá chuyên gia</p>
              <p style={{ fontWeight: 700, color: RISK_COLORS[scenario.expertRating] }}>
                {scenario.expertRating}/5 — {RISK_LABELS[scenario.expertRating]}
              </p>
            </div>
            <span style={{ fontWeight: 700, color: diffLabel(Math.abs(ratings[idx] - scenario.expertRating)).color }}>
              {diffLabel(Math.abs(ratings[idx] - scenario.expertRating)).text}
            </span>
          </div>
          <p className="mg-risk-explanation">{scenario.explanation}</p>
        </div>
      )}

      {/* Controls */}
      <div className="mg-actions">
        {!revealed[idx] && (
          <button className="mg-btn-primary" onClick={() => setRevealed(r => r.map((v, i) => i === idx ? true : v))}>
            Xem đánh giá chuyên gia
          </button>
        )}
        {revealed[idx] && idx < data.scenarios.length - 1 && (
          <button className="mg-btn-ghost" onClick={() => setIdx(i => i + 1)}>
            Kịch bản tiếp →
          </button>
        )}
        {allRevealed && (
          <button className="mg-btn-success" onClick={() => onDone(totalScore)}>
            Tiếp tục học →
          </button>
        )}
      </div>

      {allRevealed && (
        <div style={{ marginTop: 12 }}>
          <ResultBanner score={totalScore} total={data.scenarios.length} />
        </div>
      )}
    </div>
  );
}

// ── Main dispatcher ───────────────────────────────────────────────────────────
export default function MiniGame({ config, onComplete }) {
  function renderGame() {
    switch (config.type) {
      case 'sort-cards':   return <SortCards   data={config.data} onDone={onComplete} />;
      case 'order-steps':  return <OrderSteps  data={config.data} onDone={onComplete} />;
      case 'tag-the-trick':return <TagTheTrick data={config.data} onDone={onComplete} />;
      case 'shield-match': return <ShieldMatch data={config.data} onDone={onComplete} />;
      case 'risk-meter':   return <RiskMeter   data={config.data} onDone={onComplete} />;
      default: return null;
    }
  }

  return (
    <div className="mg-container">
      <div className="mg-header">
        <div className="mg-header-icon">🏆</div>
        <div className="mg-header-body">
          <h3 className="mg-title">{config.title}</h3>
          <p className="mg-instruction">{config.instruction}</p>
        </div>
        {config.reward && (
          <div className="mg-reward">
            <span className="mg-reward-label">Phần thưởng</span>
            <span className="mg-reward-value">+{config.reward} DPF</span>
          </div>
        )}
      </div>
      <div className="mg-body">
        {renderGame()}
      </div>
    </div>
  );
}
