/**
 * URL Detective — game renderer
 * Phân loại links: Thật / Đáng nghi / Giả
 * Renders inside #view-quiz → #quiz-content
 *
 * @copyright 2025 Ho Xuan Nguyen (25NS039)
 */

const VERDICTS = [
  { key: 'real',       label: '✅ Thật',      cls: 'ud-btn--safe'   },
  { key: 'suspicious', label: '⚠️ Đáng nghi', cls: 'ud-btn--warn'   },
  { key: 'fake',       label: '🚫 Giả',       cls: 'ud-btn--danger' },
];

const esc = (s) => String(s)
  .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

// Highlight the "dangerous" part of a URL (domain after last subdomain trick)
const renderUrl = (url) => {
  // Find domain: everything before first /
  const [domainPart, ...rest] = url.split('/');
  const pathPart = rest.length ? '/' + rest.join('/') : '';

  // Split domain by dots to find TLD and highlight root domain
  const segments = domainPart.split('.');
  let highlighted = esc(domainPart);

  // If domain has 3+ segments, the real root is the last 2 (or last 3 for .com.vn etc.)
  if (segments.length >= 3) {
    // Check for country-code second level like .com.vn, .edu.vn, .org.vn
    const lastTwo = segments.slice(-2).join('.');
    const isCC    = ['com.vn', 'edu.vn', 'org.vn', 'net.vn', 'gov.vn'].includes(lastTwo);
    const rootIdx = isCC ? segments.length - 3 : segments.length - 2;

    const before = segments.slice(0, rootIdx).join('.');
    const root   = isCC
      ? segments.slice(rootIdx).join('.')
      : segments.slice(rootIdx).join('.');

    if (before) {
      highlighted = `<span class="ud-url-sub">${esc(before)}.</span><span class="ud-url-root">${esc(root)}</span>`;
    } else {
      highlighted = `<span class="ud-url-root">${esc(root)}</span>`;
    }
  }

  return highlighted + `<span class="ud-url-path">${esc(pathPart)}</span>`;
};

// ── Main renderer ──────────────────────────────────────────────
/**
 * @param {object} gameData  — parsed url-detective.json
 * @param {function} onDone  — callback(score: number, passed: boolean)
 */
export const startUrlDetective = (gameData, onDone) => {
  const rounds  = gameData.rounds ?? [];
  let current   = 0;
  let answered  = false;
  let answers   = [];

  // ── Render current round ───────────────────────────────────
  const render = () => {
    const r = rounds[current];

    document.getElementById('quiz-progress-label').textContent =
      `Link ${current + 1} / ${rounds.length}`;

    document.getElementById('quiz-content').innerHTML = `
      <div class="question-card">
        <div class="question-num" style="color:var(--clr-primary)">
          🔍 URL Detective · Link ${current + 1} / ${rounds.length}
        </div>

        <div class="ud-context">${esc(r.context)}</div>

        <div class="ud-url-box">
          <span class="ud-url-scheme">https://</span>${renderUrl(r.url)}
        </div>

        <div class="answer-list">
          ${VERDICTS.map((v) => {
            let extra = '';
            if (answered) {
              if (v.key === r.verdict)           extra = 'is-correct';
              else if (v.key === answers[current]) extra = 'is-wrong';
            } else if (v.key === answers[current]) {
              extra = 'is-selected';
            }
            return `
              <button class="answer-option ${extra}" data-verdict="${v.key}"
                      ${answered ? 'disabled' : ''}>
                <span class="answer-key">${{ real: 'A', suspicious: 'B', fake: 'C' }[v.key]}</span>
                <span>${v.label}</span>
              </button>`;
          }).join('')}
        </div>

        ${answered ? `
          <div class="quiz-explanation">
            ${r.verdict === 'real' ? '✅' : r.verdict === 'fake' ? '🚫' : '⚠️'}
            ${esc(r.explanation)}
            ${r.flags?.length ? `
              <div class="ud-flags">
                ${r.flags.map((f) => `<span class="ud-flag">⚑ ${esc(f)}</span>`).join('')}
              </div>` : ''}
          </div>` : ''}
      </div>

      <div class="quiz-actions">
        ${answered ? `
          <span style="font-size:.8rem;color:var(--clr-text-3)">
            ${current + 1} / ${rounds.length} đã phân tích
          </span>
          <button id="btn-ud-next" class="btn btn--primary">
            ${current < rounds.length - 1 ? 'Link tiếp →' : 'Xem kết quả →'}
          </button>` : `
          <span style="font-size:.8rem;color:var(--clr-text-3)">
            Quan sát kỹ URL rồi chọn đánh giá
          </span>`}
      </div>`;

    if (!answered) {
      document.querySelectorAll('[data-verdict]').forEach((btn) =>
        btn.addEventListener('click', () => {
          answers[current] = btn.dataset.verdict;
          answered = true;
          render();
        }));
    } else {
      document.getElementById('btn-ud-next')?.addEventListener('click', () => {
        if (current < rounds.length - 1) {
          current++;
          answered = answers[current] !== undefined;
        } else {
          showResult();
          return;
        }
        render();
        document.getElementById('content-area')?.scrollTo({ top: 0, behavior: 'smooth' });
      });
    }
  };

  // ── Result screen ──────────────────────────────────────────
  const showResult = () => {
    const total   = rounds.length;
    const correct = rounds.filter((r, i) => answers[i] === r.verdict).length;
    const score   = correct / total;
    const pct     = Math.round(score * 100);
    const passed  = score >= (gameData.passThreshold ?? 0.7);
    const needed  = Math.ceil((gameData.passThreshold ?? 0.7) * total);

    document.getElementById('quiz-progress-label').textContent = 'Kết quả';
    document.getElementById('quiz-content').innerHTML = `
      <div class="quiz-result">
        <div style="font-size:.72rem;font-weight:700;letter-spacing:.12em;text-transform:uppercase;
                    color:var(--clr-primary);margin-bottom:10px">🔍 URL DETECTIVE</div>
        <div style="font-size:2.5rem;margin-bottom:8px">${passed ? '🎯' : '🔍'}</div>
        <div class="quiz-result-score">${pct}%</div>
        <div class="quiz-result-label">${correct} / ${total} đúng</div>
        <div class="${passed ? 'quiz-result-pass' : 'quiz-result-fail'}" style="margin:14px 0 6px">
          ${passed ? '✓ Đạt — Bạn biết cách soi link giả!'
                   : `✗ Chưa đạt — Cần ít nhất ${needed}/${total} đúng`}
        </div>
        ${passed ? `<div class="mg-reward-badge">🎮 +${gameData.dpf ?? 20} DPF</div>` : ''}
        <div style="display:flex;gap:10px;justify-content:center;flex-wrap:wrap;margin-top:20px">
          <button id="btn-ud-review" class="btn btn--ghost">Xem lại đáp án</button>
          ${!passed ? `<button id="btn-ud-retry" class="btn btn--ghost">🔄 Thử lại</button>` : ''}
          <button id="btn-ud-done" class="btn btn--primary">
            ${passed ? 'Tiếp tục →' : '← Dashboard'}
          </button>
        </div>
      </div>`;

    document.getElementById('btn-ud-review')?.addEventListener('click', showReview);
    document.getElementById('btn-ud-retry')?.addEventListener('click', () => {
      current = 0; answered = false; answers = [];
      document.getElementById('quiz-progress-label').textContent = gameData.subtitle ?? '';
      render();
    });
    document.getElementById('btn-ud-done')?.addEventListener('click', () => onDone(score, passed));
  };

  // ── Review screen ──────────────────────────────────────────
  const showReview = () => {
    document.getElementById('quiz-content').innerHTML = `
      <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:16px">
        <h3 style="font-size:1rem;font-weight:700;color:var(--clr-text)">
          Xem lại — URL Detective
        </h3>
        <button id="btn-ud-back" class="btn btn--ghost" style="padding:6px 14px;font-size:.8rem">
          ← Quay lại
        </button>
      </div>

      ${rounds.map((r, i) => {
        const chosen  = answers[i];
        const isRight = chosen === r.verdict;
        const correctV = VERDICTS.find((v) => v.key === r.verdict);
        const chosenV  = VERDICTS.find((v) => v.key === chosen);
        return `
          <div style="background:var(--clr-surface);
                      border:1px solid ${isRight ? 'rgba(34,197,94,.2)' : 'rgba(239,68,68,.2)'};
                      border-radius:12px;padding:16px;margin-bottom:10px">
            <div style="font-size:.7rem;font-weight:700;color:var(--clr-text-3);
                        font-family:'JetBrains Mono',monospace;margin-bottom:8px">
              Link ${i + 1} · ${isRight
                ? '<span style="color:#22c55e">✓ Đúng</span>'
                : '<span style="color:#ef4444">✗ Sai</span>'}
            </div>
            <div class="ud-url-box" style="font-size:.8rem;margin-bottom:10px">
              <span class="ud-url-scheme">https://</span>${renderUrl(r.url)}
            </div>
            <div style="font-size:.82rem;margin-bottom:6px">
              <span style="color:var(--clr-text-3)">Đúng:</span>
              <strong style="color:var(--clr-text)">${correctV?.label ?? r.verdict}</strong>
              ${!isRight ? `&nbsp;·&nbsp;<span style="color:var(--clr-text-3)">Bạn chọn:</span>
                <strong style="color:#f87171">${chosenV?.label ?? '—'}</strong>` : ''}
            </div>
            <div style="font-size:.8rem;color:var(--clr-text-3)">${esc(r.explanation)}</div>
            ${r.flags?.length ? `
              <div class="ud-flags" style="margin-top:8px">
                ${r.flags.map((f) => `<span class="ud-flag">⚑ ${esc(f)}</span>`).join('')}
              </div>` : ''}
          </div>`;
      }).join('')}`;

    document.getElementById('btn-ud-back')?.addEventListener('click', showResult);
    document.getElementById('content-area')?.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // ── Start ──────────────────────────────────────────────────
  render();
};
