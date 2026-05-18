/**
 * Pressure Meter — game renderer
 * Đọc kịch bản → tích chọn kỹ thuật thao túng → xem đáp án
 * Renders inside #view-quiz → #quiz-content
 *
 * Scoring: (đúng − 0.5×sai) / tổng tactic có trong kịch bản
 *
 * @copyright 2025 Ho Xuan Nguyen (25NS039)
 */

const esc = (s) => String(s ?? '')
  .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

// ── Main renderer ──────────────────────────────────────────────
/**
 * @param {object} gameData  — parsed pressure-meter.json
 * @param {function} onDone  — callback(score, passed)
 */
export const startPressureMeter = (gameData, onDone) => {
  const scripts    = gameData.scripts ?? [];
  const tacticDefs = gameData.tacticDefs ?? [];

  let scriptIdx    = 0;
  let checked      = new Set();    // tactics the player checked for current script
  let submitted    = false;

  let totalScore   = 0;            // cumulative raw score
  let maxScore     = 0;            // max possible (number of present tactics across all scripts)

  // ── Render current script ──────────────────────────────────
  const render = () => {
    const sc = scripts[scriptIdx];

    document.getElementById('quiz-progress-label').textContent =
      `Kịch bản ${scriptIdx + 1} / ${scripts.length}`;

    document.getElementById('quiz-content').innerHTML = `
      <div class="question-card">
        <div class="question-num" style="color:var(--clr-danger)">
          🎯 Pressure Meter · Kịch bản ${scriptIdx + 1} / ${scripts.length}
        </div>
        <div class="pm-script-title">${esc(sc.title)}</div>
        <div class="pm-scene">${esc(sc.scene)}</div>

        <div class="pm-dialogue">
          ${sc.dialogue.map((line) => `
            <div class="pm-line ${line.from === 'caller' ? 'pm-line--caller' : 'pm-line--me'}">
              <span class="pm-line-speaker">
                ${line.from === 'caller' ? '👤' : '🧑'}
              </span>
              <span class="pm-line-text">${esc(line.text)}</span>
            </div>`).join('')}
        </div>

        <div class="pm-tactic-header">
          <span>Tích vào các kỹ thuật thao túng bạn nhận ra:</span>
          <span class="pm-checked-count">${checked.size} đã chọn</span>
        </div>

        <div class="pm-tactic-grid">
          ${tacticDefs.map((t) => {
            const isChecked = checked.has(t.id);
            return `
              <label class="pm-tactic-item ${isChecked ? 'is-checked' : ''} ${submitted ? 'is-disabled' : ''}">
                <input type="checkbox" data-tactic="${t.id}"
                       ${isChecked ? 'checked' : ''}
                       ${submitted ? 'disabled' : ''} />
                <div class="pm-tactic-body">
                  <div class="pm-tactic-label">${esc(t.label)}</div>
                  <div class="pm-tactic-desc">${esc(t.desc)}</div>
                </div>
              </label>`;
          }).join('')}
        </div>
      </div>

      <div class="quiz-actions">
        ${!submitted ? `
          <span style="font-size:.8rem;color:var(--clr-text-3)">
            Chọn tất cả kỹ thuật bạn tìm thấy trong kịch bản này
          </span>
          <button id="btn-pm-submit" class="btn btn--primary"
                  ${checked.size === 0 ? 'disabled style="opacity:.5"' : ''}>
            Kiểm tra →
          </button>` : `
          <span></span>
          <button id="btn-pm-next" class="btn btn--primary">
            ${scriptIdx < scripts.length - 1 ? `Kịch bản ${scriptIdx + 2} →` : 'Xem kết quả cuối →'}
          </button>`}
      </div>`;

    // Checkbox change
    if (!submitted) {
      document.querySelectorAll('[data-tactic]').forEach((cb) =>
        cb.addEventListener('change', () => {
          if (cb.checked) checked.add(cb.dataset.tactic);
          else            checked.delete(cb.dataset.tactic);
          render();
        }));

      document.getElementById('btn-pm-submit')?.addEventListener('click', () => {
        submitted = true;
        showScriptResult(sc);
      });
    } else {
      document.getElementById('btn-pm-next')?.addEventListener('click', () => {
        document.getElementById('content-area')?.scrollTo({ top: 0, behavior: 'smooth' });
        scriptIdx++;
        checked    = new Set();
        submitted  = false;
        if (scriptIdx < scripts.length) {
          render();
        } else {
          showFinalResult();
        }
      });
    }
  };

  // ── Show result for current script ────────────────────────
  const showScriptResult = (sc) => {
    const present  = sc.presentTactics  ?? [];
    const absent   = sc.absentTactics   ?? [];

    // Scoring:
    // +1 for each correctly identified present tactic
    // −0.5 for each false positive (checked but absent)
    let rawScore = 0;
    present.forEach((id) => { if (checked.has(id)) rawScore += 1; });
    absent.forEach((id)  => { if (checked.has(id)) rawScore -= 0.5; });
    rawScore = Math.max(0, rawScore);

    totalScore += rawScore;
    maxScore   += present.length;

    // Re-render with result overlay on tactics
    document.getElementById('quiz-content').innerHTML = `
      <div class="question-card">
        <div class="question-num" style="color:var(--clr-danger)">
          🎯 Pressure Meter · Kết quả Kịch bản ${scriptIdx + 1}
        </div>
        <div class="pm-script-title">${esc(sc.title)}</div>

        <div class="pm-tactic-grid">
          ${tacticDefs.map((t) => {
            const wasChecked  = checked.has(t.id);
            const isPresent   = present.includes(t.id);

            let state = 'neutral';
            if (wasChecked && isPresent)   state = 'correct';    // TP
            if (wasChecked && !isPresent)  state = 'false-pos';  // FP
            if (!wasChecked && isPresent)  state = 'missed';     // FN

            const stateStyle = {
              correct:   'background:rgba(34,197,94,.12);border-color:rgba(34,197,94,.4);color:#4ade80',
              'false-pos':'background:rgba(239,68,68,.12);border-color:rgba(239,68,68,.4);color:#f87171',
              missed:    'background:rgba(245,158,11,.08);border-color:rgba(245,158,11,.3);color:#fbbf24',
              neutral:   '',
            }[state];

            const badge = {
              correct:   '<span class="pm-badge pm-badge--correct">✓ Có trong kịch bản</span>',
              'false-pos':'<span class="pm-badge pm-badge--fp">✗ Không có — −0.5đ</span>',
              missed:    '<span class="pm-badge pm-badge--missed">⚠ Bị bỏ sót</span>',
              neutral:   '',
            }[state];

            return `
              <div class="pm-tactic-item is-disabled is-result" style="${stateStyle}">
                <div class="pm-tactic-body">
                  <div class="pm-tactic-label">${esc(t.label)} ${badge}</div>
                  <div class="pm-tactic-desc">${esc(t.desc)}</div>
                </div>
              </div>`;
          }).join('')}
        </div>

        <div class="pm-analysis-box">
          <div class="pm-analysis-title">Phân tích kịch bản</div>
          <div class="pm-analysis-text">${esc(sc.analysis)}</div>
        </div>

        <div style="display:flex;justify-content:space-between;align-items:center;
                    font-size:.83rem;color:var(--clr-text-3);margin-top:4px">
          <span>Điểm kịch bản này: <strong style="color:var(--clr-text)">${rawScore.toFixed(1)} / ${present.length}</strong></span>
          <span>Tổng tích lũy: <strong style="color:var(--clr-text)">${totalScore.toFixed(1)} / ${maxScore}</strong></span>
        </div>
      </div>

      <div class="quiz-actions">
        <span></span>
        <button id="btn-pm-next2" class="btn btn--primary">
          ${scriptIdx < scripts.length - 1 ? `Kịch bản ${scriptIdx + 2} →` : 'Xem kết quả cuối →'}
        </button>
      </div>`;

    document.getElementById('btn-pm-next2')?.addEventListener('click', () => {
      document.getElementById('content-area')?.scrollTo({ top: 0, behavior: 'smooth' });
      scriptIdx++;
      checked   = new Set();
      submitted = false;
      if (scriptIdx < scripts.length) {
        render();
      } else {
        showFinalResult();
      }
    });
  };

  // ── Final result screen ────────────────────────────────────
  const showFinalResult = () => {
    const score  = maxScore > 0 ? totalScore / maxScore : 0;
    const pct    = Math.round(score * 100);
    const passed = score >= (gameData.passThreshold ?? 0.6);
    const needed = Math.ceil((gameData.passThreshold ?? 0.6) * 100);

    document.getElementById('quiz-progress-label').textContent = 'Kết quả cuối';
    document.getElementById('quiz-content').innerHTML = `
      <div class="quiz-result">
        <div style="font-size:.72rem;font-weight:700;letter-spacing:.12em;text-transform:uppercase;
                    color:var(--clr-danger);margin-bottom:10px">🎯 PRESSURE METER</div>
        <div style="font-size:2.5rem;margin-bottom:8px">${passed ? '🧠' : '📖'}</div>
        <div class="quiz-result-score">${pct}%</div>
        <div class="quiz-result-label">${totalScore.toFixed(1)} / ${maxScore} điểm</div>
        <div class="${passed ? 'quiz-result-pass' : 'quiz-result-fail'}" style="margin:14px 0 6px">
          ${passed ? '✓ Đạt — Bạn nhận diện được thao túng tâm lý!'
                   : `✗ Chưa đạt — Cần đạt ${needed}% trở lên`}
        </div>
        ${passed ? `<div class="mg-reward-badge">🎮 +${gameData.dpf ?? 25} DPF</div>` : ''}

        <div style="background:var(--clr-surface);border:1px solid var(--clr-border);
                    border-radius:10px;padding:14px 16px;margin:16px 0;text-align:left">
          <div style="font-size:.7rem;font-weight:700;text-transform:uppercase;
                      letter-spacing:.08em;color:var(--clr-text-3);margin-bottom:10px">
            Ghi nhớ
          </div>
          <div style="font-size:.82rem;color:var(--clr-text-2);line-height:1.7">
            ${tacticDefs.map((t) =>
              `<div>• <strong>${esc(t.label)}</strong>: ${esc(t.desc)}</div>`
            ).join('')}
          </div>
        </div>

        <div style="display:flex;gap:10px;justify-content:center;flex-wrap:wrap;margin-top:16px">
          ${!passed ? `<button id="btn-pm-retry" class="btn btn--ghost">🔄 Thử lại</button>` : ''}
          <button id="btn-pm-done" class="btn btn--primary">
            ${passed ? 'Tiếp tục →' : '← Dashboard'}
          </button>
        </div>
      </div>`;

    document.getElementById('btn-pm-retry')?.addEventListener('click', () => {
      scriptIdx = 0; checked = new Set(); submitted = false;
      totalScore = 0; maxScore = 0;
      document.getElementById('quiz-progress-label').textContent = gameData.subtitle ?? '';
      render();
    });
    document.getElementById('btn-pm-done')?.addEventListener('click', () =>
      onDone(score, passed));
  };

  // ── Start ──────────────────────────────────────────────────
  render();
};
