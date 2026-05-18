/**
 * Scam Chat Triage — game renderer
 * Đọc đoạn chat → gán nhãn từng tin nhắn → xem đáp án
 * Renders inside #view-quiz → #quiz-content
 *
 * @copyright 2025 Ho Xuan Nguyen (25NS039)
 */

const esc = (s) => String(s ?? '')
  .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

// ── Main renderer ──────────────────────────────────────────────
/**
 * @param {object} gameData  — parsed scam-chat-triage.json
 * @param {function} onDone  — callback(score, passed)
 */
export const startScamChatTriage = (gameData, onDone) => {
  const scenarios  = gameData.scenarios ?? [];
  const labelDefs  = gameData.labelDefs ?? [
    { key: 'normal',     label: 'Bình thường', color: '#6b7280', bg: 'rgba(107,114,128,.1)' },
    { key: 'suspicious', label: '⚠ Đáng nghi', color: '#f59e0b', bg: 'rgba(245,158,11,.1)'  },
    { key: 'scam',       label: '🚫 Scam!',     color: '#ef4444', bg: 'rgba(239,68,68,.1)'   },
  ];

  let scenarioIdx  = 0;
  let msgAnswers   = {};     // { msgId: labelKey }
  let totalCorrect = 0;
  let totalMsgs    = 0;

  // ── Render current scenario ────────────────────────────────
  const renderScenario = () => {
    const sc = scenarios[scenarioIdx];
    const allLabeled = sc.messages.every((m) => msgAnswers[m.id] !== undefined);

    document.getElementById('quiz-progress-label').textContent =
      `Scenario ${scenarioIdx + 1} / ${scenarios.length}`;

    document.getElementById('quiz-content').innerHTML = `
      <div class="question-card">
        <div class="question-num" style="color:var(--clr-warning)">
          💬 Scam Chat Triage · ${scenarioIdx + 1} / ${scenarios.length}
        </div>
        <div class="sct-scenario-title">${esc(sc.title)}</div>
        <div class="sct-context">${esc(sc.context)}</div>

        <div class="sct-chat">
          ${sc.messages.map((msg) => {
            const chosen = msgAnswers[msg.id];
            const def    = labelDefs.find((l) => l.key === chosen);
            const isMe   = msg.from === 'me';
            return `
              <div class="sct-msg-wrap ${isMe ? 'sct-msg-wrap--me' : ''}">
                ${!isMe ? `<div class="sct-sender">${esc(sc.sender)}</div>` : ''}
                <div class="sct-bubble ${isMe ? 'sct-bubble--me' : 'sct-bubble--them'}"
                     style="${def ? `border-color:${def.color};background:${def.bg}` : ''}">
                  ${esc(msg.text)}
                  ${chosen ? `<span class="sct-chosen-badge" style="color:${def?.color}">
                    ${def?.label}
                  </span>` : ''}
                </div>
                <div class="sct-label-row" data-msg-id="${msg.id}">
                  ${labelDefs.map((l) => `
                    <button class="sct-label-btn ${chosen === l.key ? 'is-selected' : ''}"
                            data-msg="${msg.id}" data-label="${l.key}"
                            style="${chosen === l.key
                              ? `background:${l.bg};color:${l.color};border-color:${l.color}`
                              : ''}">
                      ${l.label}
                    </button>`).join('')}
                </div>
              </div>`;
          }).join('')}
        </div>
      </div>

      <div class="quiz-actions">
        ${allLabeled ? `
          <span style="font-size:.8rem;color:var(--clr-text-3)">
            Đã gán nhãn ${sc.messages.length}/${sc.messages.length} tin nhắn
          </span>
          <button id="btn-sct-check" class="btn btn--primary">
            Xem đáp án →
          </button>` : `
          <span style="font-size:.8rem;color:var(--clr-text-3)">
            Gán nhãn tất cả tin nhắn để tiếp tục
          </span>`}
      </div>`;

    // Label button click handlers
    document.querySelectorAll('.sct-label-btn').forEach((btn) => {
      btn.addEventListener('click', () => {
        msgAnswers[btn.dataset.msg] = btn.dataset.label;
        renderScenario();  // re-render to update badges
      });
    });

    document.getElementById('btn-sct-check')?.addEventListener('click', () =>
      showScenarioResult(sc));
  };

  // ── Show result for current scenario ──────────────────────
  const showScenarioResult = (sc) => {
    const correct = sc.messages.filter((m) => msgAnswers[m.id] === m.label).length;
    totalCorrect += correct;
    totalMsgs    += sc.messages.length;

    const pct    = Math.round((correct / sc.messages.length) * 100);
    const isLast = scenarioIdx === scenarios.length - 1;

    document.getElementById('quiz-content').innerHTML = `
      <div class="question-card">
        <div class="question-num" style="color:var(--clr-warning)">
          💬 Scam Chat Triage · Kết quả Scenario ${scenarioIdx + 1}
        </div>
        <div class="sct-scenario-title">${esc(sc.title)}</div>

        <div class="sct-result-summary">
          <div class="sct-result-score">${pct}%</div>
          <div style="font-size:.85rem;color:var(--clr-text-3)">
            ${correct} / ${sc.messages.length} nhãn đúng
          </div>
        </div>

        <div class="sct-chat">
          ${sc.messages.map((msg) => {
            const chosen     = msgAnswers[msg.id];
            const isRight    = chosen === msg.label;
            const correctDef = gameData.labelDefs?.find((l) => l.key === msg.label) ??
              { label: msg.label, color: '#6b7280', bg: 'rgba(107,114,128,.1)' };
            const isMe = msg.from === 'me';
            return `
              <div class="sct-msg-wrap ${isMe ? 'sct-msg-wrap--me' : ''}">
                <div class="sct-bubble ${isMe ? 'sct-bubble--me' : 'sct-bubble--them'}"
                     style="border-color:${isRight ? '#22c55e' : '#ef4444'};
                            background:${isRight ? 'rgba(34,197,94,.06)' : 'rgba(239,68,68,.06)'}">
                  ${esc(msg.text)}
                  <span class="sct-chosen-badge" style="color:${correctDef.color}">
                    ${isRight ? '✓' : '✗'} ${correctDef.label}
                  </span>
                </div>
                ${!isRight ? `
                  <div class="sct-correction">
                    Bạn chọn: <strong>${gameData.labelDefs?.find(l=>l.key===chosen)?.label ?? chosen}</strong>
                    &nbsp;→&nbsp; Đúng: <strong style="color:${correctDef.color}">${correctDef.label}</strong>
                  </div>` : ''}
                <div class="sct-explanation">💡 ${esc(msg.explanation)}</div>
              </div>`;
          }).join('')}
        </div>
      </div>

      <div class="quiz-actions">
        <span style="font-size:.8rem;color:var(--clr-text-3)">
          Tổng: ${totalCorrect} / ${totalMsgs} đúng
        </span>
        <button id="btn-sct-next" class="btn btn--primary">
          ${isLast ? 'Xem kết quả cuối →' : `Scenario ${scenarioIdx + 2} →`}
        </button>
      </div>`;

    document.getElementById('btn-sct-next')?.addEventListener('click', () => {
      document.getElementById('content-area')?.scrollTo({ top: 0, behavior: 'smooth' });
      if (isLast) {
        showFinalResult();
      } else {
        scenarioIdx++;
        msgAnswers = {};
        renderScenario();
      }
    });
  };

  // ── Final result screen ────────────────────────────────────
  const showFinalResult = () => {
    const score  = totalCorrect / totalMsgs;
    const pct    = Math.round(score * 100);
    const passed = score >= (gameData.passThreshold ?? 0.65);
    const needed = Math.ceil((gameData.passThreshold ?? 0.65) * totalMsgs);

    document.getElementById('quiz-progress-label').textContent = 'Kết quả cuối';
    document.getElementById('quiz-content').innerHTML = `
      <div class="quiz-result">
        <div style="font-size:.72rem;font-weight:700;letter-spacing:.12em;text-transform:uppercase;
                    color:var(--clr-warning);margin-bottom:10px">💬 SCAM CHAT TRIAGE</div>
        <div style="font-size:2.5rem;margin-bottom:8px">${passed ? '🕵️' : '📚'}</div>
        <div class="quiz-result-score">${pct}%</div>
        <div class="quiz-result-label">${totalCorrect} / ${totalMsgs} nhãn đúng</div>
        <div class="${passed ? 'quiz-result-pass' : 'quiz-result-fail'}" style="margin:14px 0 6px">
          ${passed ? '✓ Đạt — Bạn có thể nhận diện kịch bản scam!'
                   : `✗ Chưa đạt — Cần ít nhất ${needed}/${totalMsgs} nhãn đúng`}
        </div>
        ${passed ? `<div class="mg-reward-badge">🎮 +${gameData.dpf ?? 25} DPF</div>` : ''}

        <div style="background:var(--clr-surface);border:1px solid var(--clr-border);
                    border-radius:10px;padding:14px 16px;margin:16px 0;text-align:left">
          <div style="font-size:.7rem;font-weight:700;text-transform:uppercase;
                      letter-spacing:.08em;color:var(--clr-text-3);margin-bottom:10px">
            Điểm từng scenario
          </div>
          ${scenarios.map((sc, i) => {
            const c = sc.messages.filter((m) => msgAnswers[m.id] === m.label).length;
            // Note: msgAnswers was reset after each scenario — use stored totals
            const p = Math.round((c / sc.messages.length) * 100);
            return '';
          }).join('')}
          <div style="font-size:.83rem;color:var(--clr-text-2)">
            ${scenarios.map((sc) => `<div style="margin-bottom:4px">• ${esc(sc.title)}</div>`).join('')}
          </div>
        </div>

        <div style="display:flex;gap:10px;justify-content:center;flex-wrap:wrap;margin-top:16px">
          ${!passed ? `<button id="btn-sct-retry" class="btn btn--ghost">🔄 Thử lại</button>` : ''}
          <button id="btn-sct-done" class="btn btn--primary">
            ${passed ? 'Tiếp tục →' : '← Dashboard'}
          </button>
        </div>
      </div>`;

    document.getElementById('btn-sct-retry')?.addEventListener('click', () => {
      scenarioIdx = 0; msgAnswers = {}; totalCorrect = 0; totalMsgs = 0;
      document.getElementById('quiz-progress-label').textContent = gameData.subtitle ?? '';
      renderScenario();
    });
    document.getElementById('btn-sct-done')?.addEventListener('click', () =>
      onDone(score, passed));
  };

  // ── Start ──────────────────────────────────────────────────
  renderScenario();
};
