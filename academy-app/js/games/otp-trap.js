/**
 * OTP Trap — game renderer
 * Nhận biết và xử lý đúng các bẫy OTP, SIM Swap, quyền ứng dụng
 * Renders inside #view-quiz → #quiz-content
 *
 * Mechanics: 8 tình huống, mỗi tình huống 4 lựa chọn hành động (1 đúng).
 * Scoring: số lựa chọn đúng / tổng số tình huống
 *
 * @copyright 2025 Ho Xuan Nguyen (25NS039)
 */

const esc = (s) => String(s ?? '')
  .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

// Chuyển \n → <br> sau khi escape
const escLines = (s) => esc(s).replace(/\\n|\n/g, '<br>');

// Icon theo loại tình huống
const TYPE_ICON = {
  call: '📞',
  sms:  '💬',
  web:  '🌐',
  app:  '📱',
};

// Màu accent theo loại
const TYPE_COLOR = {
  call: '#f59e0b',   // warning/amber
  sms:  '#3b82f6',   // blue
  web:  '#ef4444',   // red
  app:  '#8b5cf6',   // purple
};

// ── Main renderer ──────────────────────────────────────────────
/**
 * @param {object} gameData  — parsed otp-trap.json
 * @param {function} onDone  — callback(score: number, passed: boolean)
 */
export const startOtpTrap = (gameData, onDone) => {
  const rounds   = gameData.rounds ?? [];
  let current    = 0;
  let answered   = false;
  let chosen     = null;     // index of chosen option
  let correctCount = 0;

  // ── Render current round ─────────────────────────────────────
  const render = () => {
    const r     = rounds[current];
    const color = TYPE_COLOR[r.type] ?? '#00F0FF';

    document.getElementById('quiz-progress-label').textContent =
      `Tình huống ${current + 1} / ${rounds.length}`;

    document.getElementById('quiz-content').innerHTML = `
      <div class="question-card">
        <div class="question-num" style="color:${color}">
          📱 OTP Trap · Tình huống ${current + 1} / ${rounds.length}
        </div>

        <!-- Type badge + context -->
        <div style="display:flex;align-items:flex-start;gap:10px;margin-bottom:14px">
          <span class="ot-type-badge" style="background:${color}22;color:${color};border-color:${color}44">
            ${esc(r.typeLabel)}
          </span>
        </div>
        <div class="ot-context">${esc(r.context)}</div>

        <!-- Phone / device mockup -->
        <div class="ot-device-frame ot-type-${r.type}" style="border-color:${color}44">
          <div class="ot-device-header" style="background:${color}15;border-color:${color}30">
            <span class="ot-device-icon">${TYPE_ICON[r.type] ?? '📱'}</span>
            <div>
              <div class="ot-sender-name">${esc(r.sender)}</div>
              ${r.senderLabel && r.senderLabel !== r.sender
                ? `<div class="ot-sender-label">${esc(r.senderLabel)}</div>`
                : ''}
            </div>
          </div>
          <div class="ot-device-body">
            <div class="ot-message-bubble ot-bubble-${r.type}">${escLines(r.content)}</div>
          </div>
        </div>

        <!-- Action options -->
        <div style="margin-top:18px;margin-bottom:4px;font-size:.78rem;font-weight:700;
                    color:var(--clr-text-3);letter-spacing:.06em;text-transform:uppercase">
          Bạn sẽ làm gì?
        </div>
        <div class="answer-list">
          ${r.options.map((opt, i) => {
            let extra = '';
            if (answered) {
              if (opt.correct)       extra = 'is-correct';
              else if (i === chosen) extra = 'is-wrong';
            } else if (i === chosen) {
              extra = 'is-selected';
            }
            return `
              <button class="answer-option ${extra}" data-opt-idx="${i}"
                      ${answered ? 'disabled' : ''}>
                <span class="answer-key">${['A','B','C','D'][i]}</span>
                <span>${esc(opt.label)}</span>
              </button>`;
          }).join('')}
        </div>

        ${answered ? `
          <!-- Explanation + flags -->
          <div class="quiz-explanation" style="margin-top:14px">
            ${r.options[chosen]?.correct
              ? `<span style="color:var(--clr-success);font-weight:800">✓ Đúng!</span>`
              : `<span style="color:var(--clr-danger);font-weight:800">✗ Chưa đúng.</span>`}
            ${esc(r.explanation)}
            ${r.flags?.length ? `
              <div class="ot-flags">
                ${r.flags.map((f) => `<div class="ot-flag">⚑ ${esc(f)}</div>`).join('')}
              </div>` : ''}
          </div>` : ''}
      </div>

      <div class="quiz-actions">
        ${answered ? `
          <span style="font-size:.8rem;color:var(--clr-text-3)">
            ${current + 1} / ${rounds.length} tình huống đã xử lý
          </span>
          <button id="btn-ot-next" class="btn btn--primary">
            ${current < rounds.length - 1 ? 'Tình huống tiếp →' : 'Xem kết quả →'}
          </button>` : `
          <span style="font-size:.8rem;color:var(--clr-text-3)">
            Đọc kỹ rồi chọn hành động phù hợp nhất
          </span>`}
      </div>`;

    if (!answered) {
      document.querySelectorAll('[data-opt-idx]').forEach((btn) =>
        btn.addEventListener('click', () => {
          chosen   = Number(btn.dataset.optIdx);
          answered = true;
          if (rounds[current].options[chosen]?.correct) correctCount++;
          render();
        }));
    } else {
      document.getElementById('btn-ot-next')?.addEventListener('click', () => {
        if (current < rounds.length - 1) {
          current++;
          answered = false;
          chosen   = null;
        } else {
          showResult();
          return;
        }
        render();
        document.getElementById('content-area')?.scrollTo({ top: 0, behavior: 'smooth' });
      });
    }
  };

  // ── Result screen ─────────────────────────────────────────────
  const showResult = () => {
    const total  = rounds.length;
    const score  = correctCount / total;
    const pct    = Math.round(score * 100);
    const passed = score >= (gameData.passThreshold ?? 0.7);
    const needed = Math.ceil((gameData.passThreshold ?? 0.7) * total);

    document.getElementById('quiz-progress-label').textContent = 'Kết quả';
    document.getElementById('quiz-content').innerHTML = `
      <div class="quiz-result">
        <div style="font-size:.72rem;font-weight:700;letter-spacing:.12em;text-transform:uppercase;
                    color:#8b5cf6;margin-bottom:10px">📱 OTP TRAP</div>
        <div style="font-size:2.5rem;margin-bottom:8px">${passed ? '🛡️' : '📖'}</div>
        <div class="quiz-result-score">${pct}%</div>
        <div class="quiz-result-label">${correctCount} / ${total} tình huống xử lý đúng</div>
        <div class="${passed ? 'quiz-result-pass' : 'quiz-result-fail'}" style="margin:14px 0 6px">
          ${passed
            ? '✓ Đạt — Bạn biết cách bảo vệ OTP của mình!'
            : `✗ Chưa đạt — Cần ít nhất ${needed}/${total} đúng`}
        </div>
        ${passed ? `<div class="mg-reward-badge">🎮 +${gameData.dpf ?? 20} DPF</div>` : ''}

        <!-- Summary: tóm tắt quy tắc vàng -->
        <div style="background:var(--clr-surface);border:1px solid var(--clr-border);
                    border-radius:10px;padding:14px 16px;margin:16px 0;text-align:left">
          <div style="font-size:.7rem;font-weight:700;text-transform:uppercase;
                      letter-spacing:.08em;color:var(--clr-text-3);margin-bottom:10px">
            🔐 Quy tắc vàng về OTP
          </div>
          <div style="font-size:.82rem;color:var(--clr-text-2);line-height:1.8">
            <div>• <strong>Không bao giờ</strong> chia sẻ OTP với bất kỳ ai — kể cả nhân viên ngân hàng, Microsoft, Google</div>
            <div>• OTP đến mà không yêu cầu → <strong>đổi mật khẩu ngay</strong></div>
            <div>• SIM mất sóng đột ngột → <strong>đến cửa hàng nhà mạng ngay với CMND</strong></div>
            <div>• App yêu cầu quyền đọc SMS → <strong>từ chối và gỡ cài đặt</strong></div>
            <div>• Cập nhật app ngân hàng → <strong>chỉ qua CH Play / App Store</strong></div>
          </div>
        </div>

        <div style="display:flex;gap:10px;justify-content:center;flex-wrap:wrap;margin-top:20px">
          <button id="btn-ot-review" class="btn btn--ghost">Xem lại đáp án</button>
          ${!passed ? `<button id="btn-ot-retry" class="btn btn--ghost">🔄 Thử lại</button>` : ''}
          <button id="btn-ot-done" class="btn btn--primary">
            ${passed ? 'Tiếp tục →' : '← Dashboard'}
          </button>
        </div>
      </div>`;

    document.getElementById('btn-ot-review')?.addEventListener('click', showReview);
    document.getElementById('btn-ot-retry')?.addEventListener('click', () => {
      current      = 0;
      answered     = false;
      chosen       = null;
      correctCount = 0;
      document.getElementById('quiz-progress-label').textContent = gameData.subtitle ?? '';
      render();
    });
    document.getElementById('btn-ot-done')?.addEventListener('click', () => onDone(score, passed));
  };

  // ── Review screen ─────────────────────────────────────────────
  const showReview = () => {
    // Re-run to collect final answers per round
    // Since we process linearly, re-simulate with a tracking array
    // (Answers are tracked via correctCount; for review we show all rounds)
    document.getElementById('quiz-content').innerHTML = `
      <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:16px">
        <h3 style="font-size:1rem;font-weight:700;color:var(--clr-text)">
          Xem lại — OTP Trap
        </h3>
        <button id="btn-ot-back" class="btn btn--ghost" style="padding:6px 14px;font-size:.8rem">
          ← Quay lại
        </button>
      </div>

      ${rounds.map((r, i) => {
        const correctOpt = r.options.find((o) => o.correct);
        const color = TYPE_COLOR[r.type] ?? '#00F0FF';
        return `
          <div style="background:var(--clr-surface);border:1px solid ${color}33;
                      border-radius:12px;padding:16px;margin-bottom:10px">
            <div style="display:flex;align-items:center;gap:8px;margin-bottom:8px">
              <span class="ot-type-badge" style="background:${color}22;color:${color};border-color:${color}44;font-size:.65rem">
                ${esc(r.typeLabel)}
              </span>
              <span style="font-size:.72rem;font-weight:700;color:var(--clr-text-3);
                           font-family:'JetBrains Mono',monospace">
                Tình huống ${i + 1}
              </span>
            </div>
            <div style="font-size:.82rem;font-weight:600;color:var(--clr-text);margin-bottom:8px">
              ${esc(r.context)}
            </div>
            <div style="font-size:.8rem;margin-bottom:6px">
              <span style="color:var(--clr-text-3)">Hành động đúng:</span>
              <strong style="color:var(--clr-success)">${esc(correctOpt?.label ?? '—')}</strong>
            </div>
            <div style="font-size:.78rem;color:var(--clr-text-3);line-height:1.5">
              ${esc(r.explanation)}
            </div>
            ${r.flags?.length ? `
              <div class="ot-flags" style="margin-top:8px">
                ${r.flags.map((f) => `<div class="ot-flag">⚑ ${esc(f)}</div>`).join('')}
              </div>` : ''}
          </div>`;
      }).join('')}`;

    document.getElementById('btn-ot-back')?.addEventListener('click', showResult);
    document.getElementById('content-area')?.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // ── Start ──────────────────────────────────────────────────────
  render();
};
