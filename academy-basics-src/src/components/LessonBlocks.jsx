/**
 * LessonBlocks.jsx — Rich content block renderer for lessons.
 *
 * Supported block types (used in paragraphs array alongside plain strings):
 *   callout | table | comparison | process | cards | scenario | image | stats
 */
import React from 'react';
import {
  VISUAL_ASSET_GROUPS,
  VISUAL_ASSET_KIT_RESOURCE,
  VISUAL_ASSET_STYLE_GUIDE,
} from '../data/visualAssetPromptKit.js';

// ── CALLOUT ───────────────────────────────────────────────────────────────────
// variant: 'info' | 'warning' | 'danger' | 'tip' | 'quote'
export function Callout({ icon, title, text, variant = 'info' }) {
  return (
    <div className={`lb-callout lb-callout--${variant}`}>
      {icon && <span className="lb-callout-icon">{icon}</span>}
      <div className="lb-callout-body">
        {title && <p className="lb-callout-title">{title}</p>}
        {text && <p className="lb-callout-text" dangerouslySetInnerHTML={{ __html: text }} />}
      </div>
    </div>
  );
}

// ── TABLE ─────────────────────────────────────────────────────────────────────
export function LessonTable({ caption, headers, rows }) {
  return (
    <div className="lb-table-wrap">
      {caption && <p className="lb-table-caption">{caption}</p>}
      <div className="lb-table-scroll">
        <table className="lb-table">
          {headers && (
            <thead>
              <tr>{headers.map((h, i) => <th key={i} dangerouslySetInnerHTML={{ __html: h }} />)}</tr>
            </thead>
          )}
          <tbody>
            {rows.map((row, i) => (
              <tr key={i}>
                {row.map((cell, j) => (
                  <td key={j} dangerouslySetInnerHTML={{ __html: cell }} />
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// ── COMPARISON ────────────────────────────────────────────────────────────────
// left/right: { label, icon?, color?, items: string[] }
export function Comparison({ title, left, right }) {
  return (
    <div className="lb-comparison">
      {title && <p className="lb-comparison-title">{title}</p>}
      <div className="lb-comparison-cols">
        <div className="lb-comparison-col lb-comparison-col--left" style={left.color ? { borderTopColor: left.color } : {}}>
          {left.icon && <span className="lb-comparison-col-icon">{left.icon}</span>}
          <p className="lb-comparison-col-label" style={left.color ? { color: left.color } : {}}>{left.label}</p>
          <ul className="lb-comparison-list">
            {left.items.map((item, i) => (
              <li key={i} dangerouslySetInnerHTML={{ __html: item }} />
            ))}
          </ul>
        </div>
        <div className="lb-comparison-col lb-comparison-col--right" style={right.color ? { borderTopColor: right.color } : {}}>
          {right.icon && <span className="lb-comparison-col-icon">{right.icon}</span>}
          <p className="lb-comparison-col-label" style={right.color ? { color: right.color } : {}}>{right.label}</p>
          <ul className="lb-comparison-list">
            {right.items.map((item, i) => (
              <li key={i} dangerouslySetInnerHTML={{ __html: item }} />
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

// ── PROCESS STEPS ─────────────────────────────────────────────────────────────
// steps: [{ icon, title, description }]
export function Process({ title, subtitle, steps, direction = 'horizontal' }) {
  return (
    <div className="lb-process">
      {title && <p className="lb-process-title">{title}</p>}
      {subtitle && <p className="lb-process-subtitle">{subtitle}</p>}
      <div className={`lb-process-steps lb-process-steps--${direction}`}>
        {steps.map((step, i) => (
          <div key={i} className="lb-process-step">
            <div className="lb-process-step-icon-wrap">
              <div className="lb-process-step-icon">{step.icon}</div>
              {direction === 'horizontal' && i < steps.length - 1 && (
                <div className="lb-process-arrow">→</div>
              )}
            </div>
            <div className="lb-process-step-num">{i + 1}</div>
            <p className="lb-process-step-title">{step.title}</p>
            {step.description && (
              <p className="lb-process-step-desc" dangerouslySetInnerHTML={{ __html: step.description }} />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

// ── CARDS GRID ────────────────────────────────────────────────────────────────
// items: [{ icon, title, text, color? }]
export function Cards({ title, items, cols = 2 }) {
  return (
    <div className="lb-cards">
      {title && <p className="lb-cards-title">{title}</p>}
      <div className="lb-cards-grid" style={{ '--lb-cols': cols }}>
        {items.map((item, i) => (
          <div key={i} className="lb-card" style={item.color ? { borderTopColor: item.color } : {}}>
            {item.icon && <span className="lb-card-icon">{item.icon}</span>}
            {item.title && <p className="lb-card-title">{item.title}</p>}
            {item.text && <p className="lb-card-text" dangerouslySetInnerHTML={{ __html: item.text }} />}
          </div>
        ))}
      </div>
    </div>
  );
}

// ── SCENARIO CARD ─────────────────────────────────────────────────────────────
// time: 'Buổi sáng' etc, icon, title, description, question, risk: 'high'|'medium'|'unknown'
export function ScenarioCard({ time, icon, title, description, question, risk = 'unknown' }) {
  const riskColor = { high: '#ef4444', medium: '#f59e0b', unknown: '#6366f1', low: '#22c55e' }[risk];
  return (
    <div className="lb-scenario" style={{ borderLeftColor: riskColor }}>
      <div className="lb-scenario-header">
        <span className="lb-scenario-icon">{icon}</span>
        <div className="lb-scenario-meta">
          {time && <span className="lb-scenario-time">{time}</span>}
          <span className="lb-scenario-title">{title}</span>
        </div>
        <span className="lb-scenario-risk-dot" style={{ background: riskColor }} />
      </div>
      <p className="lb-scenario-desc">{description}</p>
      {question && (
        <div className="lb-scenario-question">
          <span className="lb-scenario-q-icon">💭</span>
          <span className="lb-scenario-q-text">{question}</span>
        </div>
      )}
    </div>
  );
}

// ── IMAGE ─────────────────────────────────────────────────────────────────────
// Shows image if src provided, placeholder with description if not
export function LessonImage({ src, alt, caption, placeholderHint }) {
  return (
    <figure className="lb-image-figure">
      {src ? (
        <img src={src} alt={alt || caption || ''} className="lb-image" loading="lazy" />
      ) : (
        <div className="lb-image-placeholder">
          <span className="lb-image-placeholder-icon">🖼️</span>
          <p className="lb-image-placeholder-hint">{placeholderHint || alt || 'Hình ảnh'}</p>
          {alt && <code className="lb-image-placeholder-alt">{alt}</code>}
        </div>
      )}
      {caption && <figcaption className="lb-image-caption">{caption}</figcaption>}
    </figure>
  );
}

// ── STATS ROW ─────────────────────────────────────────────────────────────────
// stats: [{ value, label, icon?, color? }]
export function StatsRow({ title, stats }) {
  return (
    <div className="lb-stats">
      {title && <p className="lb-stats-title">{title}</p>}
      <div className="lb-stats-row">
        {stats.map((s, i) => (
          <div key={i} className="lb-stat">
            {s.icon && <span className="lb-stat-icon">{s.icon}</span>}
            <span className="lb-stat-value" style={s.color ? { color: s.color } : {}}>{s.value}</span>
            <span className="lb-stat-label">{s.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── MAIN DISPATCHER ───────────────────────────────────────────────────────────
export function VisualAssetKit({ title, subtitle }) {
  const total = VISUAL_ASSET_GROUPS.reduce((sum, group) => sum + group.items.length, 0);

  return (
    <section className="lb-asset-kit">
      <div className="lb-asset-kit-head">
        <div>
          <p className="lb-asset-kit-kicker">DEEPFENSE BASIC</p>
          <h3>{title || 'Visual Asset Prompt Kit'}</h3>
          {subtitle && <p>{subtitle}</p>}
        </div>
        <a className="lb-asset-kit-link" href={VISUAL_ASSET_KIT_RESOURCE} target="_blank" rel="noreferrer">
          Mở file gốc
        </a>
      </div>

      <div className="lb-asset-kit-rules">
        <div>
          <span>Style chung</span>
          <p>{VISUAL_ASSET_STYLE_GUIDE.requiredStyle}</p>
        </div>
        <div>
          <span>Nhân vật An</span>
          <p>{VISUAL_ASSET_STYLE_GUIDE.anCharacter}</p>
        </div>
        <div>
          <span>Negative prompt</span>
          <p>{VISUAL_ASSET_STYLE_GUIDE.negativePrompt}</p>
        </div>
      </div>

      <div className="lb-asset-kit-summary">
        <span>{VISUAL_ASSET_GROUPS.length} nhóm asset</span>
        <span>{total} prompt đã gom</span>
        <span>Không tạo chữ trong ảnh</span>
      </div>

      <div className="lb-asset-kit-groups">
        {VISUAL_ASSET_GROUPS.map((group) => (
          <article className="lb-asset-kit-group" key={group.label}>
            <div className="lb-asset-kit-group-head">
              <h4>{group.label}</h4>
              <span>{group.items.length} mục</span>
            </div>
            <p className="lb-asset-kit-purpose">{group.purpose}</p>
            <div className="lb-asset-kit-items">
              {group.items.map((item) => (
                <details className="lb-asset-kit-item" key={item.id}>
                  <summary>
                    <span className="lb-asset-kit-id">{item.id}</span>
                    <strong>{item.title}</strong>
                    <small>{item.format}</small>
                  </summary>
                  <div className="lb-asset-kit-item-body">
                    <p><b>Vị trí dùng:</b> {item.placement}</p>
                    <pre>{item.prompt}</pre>
                  </div>
                </details>
              ))}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

export default function LessonBlock({ block }) {
  if (typeof block === 'string') return null; // handled by caller
  switch (block.type) {
    case 'callout':    return <Callout {...block} />;
    case 'table':      return <LessonTable {...block} />;
    case 'comparison': return <Comparison {...block} />;
    case 'process':    return <Process {...block} />;
    case 'cards':      return <Cards {...block} />;
    case 'scenario':   return <ScenarioCard {...block} />;
    case 'image':      return <LessonImage {...block} />;
    case 'stats':      return <StatsRow {...block} />;
    case 'asset-kit':  return <VisualAssetKit {...block} />;
    default:           return null;
  }
}
