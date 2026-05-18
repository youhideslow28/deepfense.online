/**
 * DEEPFENSE ACADEMY — app.js
 * Router + screen logic + module navigation
 * Vanilla ES Modules, no framework, no build step
 *
 * @copyright 2025 Ho Xuan Nguyen (25NS039)
 */

import {
  loginWithGoogle,
  logout,
  listenAuth,
  ensureAcademyLearner,
  listenProgress,
  listenDpfBalance,
  adminCompleteAll,
  adminResetProgress,
} from './firebase-init.js';

import { startQuiz } from './quiz.js';
import { startMidterm, getMidtermConfig } from './midterm.js';
import { checkCertEligibility, showCertView } from './certificate.js';
import { startFinalExam, getFinalExamStatus } from './final-exam.js';
import { startMinigame } from './minigame.js';

// ── State ──────────────────────────────────────────────────────
const state = {
  user:             null,
  progress:         null,   // doc từ academy_learners/{uid}
  dpfBalance:       0,
  manifest:         null,   // course-manifest.json
  currentView:      'dashboard',
  currentModuleId:  null,
  currentMidtermId: null,
  unsubs:           [],
};

// ── DOM refs ───────────────────────────────────────────────────
const $ = (id) => document.getElementById(id);

const dom = {
  screenLoading:  $('screen-loading'),
  screenLogin:    $('screen-login'),
  screenApp:      $('screen-app'),
  btnGoogleLogin: $('btn-google-login'),
  loginError:     $('login-error'),
  sidebar:        $('sidebar'),
  sidebarOverlay: $('sidebar-overlay'),
  sidebarAvatar:  $('sidebar-avatar'),
  sidebarName:    $('sidebar-name'),
  sidebarEmail:   $('sidebar-email'),
  progressPercent:$('progress-percent'),
  progressFill:   $('progress-fill'),
  moduleNav:      $('module-nav'),
  btnLogout:      $('btn-logout'),
  btnSidebarToggle:$('btn-sidebar-toggle'),
  btnMenuMobile:  $('btn-menu-mobile'),
  breadcrumb:     $('breadcrumb'),
  topbarDpf:      $('topbar-dpf'),
  topbarDpfVal:   $('topbar-dpf-val'),
  contentArea:    $('content-area'),
  // Views
  viewDashboard:    $('view-dashboard'),
  viewLesson:       $('view-lesson'),
  viewQuiz:         $('view-quiz'),
  viewExam:         $('view-exam'),
  viewCertificate:  $('view-certificate'),
  btnViewCert:      $('btn-view-cert'),
  // Dashboard
  statCompleted:   $('stat-completed'),
  statDpfEarned:   $('stat-dpf-earned'),
  dashboardModules: $('dashboard-modules'),
  dashboardAdmin:  $('dashboard-admin'),
};

// ── Screens ────────────────────────────────────────────────────

const showScreen = (name) => {
  ['screenLoading', 'screenLogin', 'screenApp'].forEach((k) => {
    dom[k].classList.toggle('hidden', k !== name);
  });
};

// ── Login ──────────────────────────────────────────────────────

dom.btnGoogleLogin.addEventListener('click', async () => {
  dom.btnGoogleLogin.disabled = true;
  dom.btnGoogleLogin.textContent = 'Đang đăng nhập…';
  dom.loginError.classList.add('hidden');

  const result = await loginWithGoogle();

  dom.btnGoogleLogin.disabled = false;
  dom.btnGoogleLogin.innerHTML = `
    <svg class="btn-icon" viewBox="0 0 24 24" fill="none">
      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/>
      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
    </svg>
    Đăng nhập bằng Google`;

  if (!result.ok && result.message) {
    dom.loginError.textContent = result.message;
    dom.loginError.classList.remove('hidden');
  }
});

// ── Logout ─────────────────────────────────────────────────────

dom.btnLogout.addEventListener('click', () => {
  cleanupSubscriptions();
  logout();
});

// ── Mobile sidebar toggle ──────────────────────────────────────

const openSidebar = () => {
  dom.sidebar.classList.add('is-open');
  dom.sidebarOverlay.classList.remove('hidden');
};

const closeSidebar = () => {
  dom.sidebar.classList.remove('is-open');
  dom.sidebarOverlay.classList.add('hidden');
};

dom.btnMenuMobile.addEventListener('click', openSidebar);
dom.btnSidebarToggle.addEventListener('click', closeSidebar);
dom.sidebarOverlay.addEventListener('click', closeSidebar);

// ── Manifest loader ────────────────────────────────────────────

const loadManifest = async () => {
  if (state.manifest) return state.manifest;
  const res = await fetch('../content/course-manifest.json');
  const json = await res.json();
  state.manifest = json.course;
  return state.manifest;
};

// ── Progress helpers ───────────────────────────────────────────

const getCompletedModules = () =>
  Array.isArray(state.progress?.completedModules)
    ? state.progress.completedModules : [];

const getCompletedMidterms = () =>
  Array.isArray(state.progress?.completedMidterms)
    ? state.progress.completedMidterms : [];

const isModuleDone    = (id) => getCompletedModules().includes(id);
const isMidtermDone   = (id) => getCompletedMidterms().includes(id);

// Tất cả modules của một part đã xong chưa?
const isPartDone = (partId, allModules) =>
  allModules.filter((m) => m.part === partId).every((m) => isModuleDone(m.id));

// Midterm config mapping: partId → midtermId
const PART_MIDTERM = { foundation: 'midterm1', recognition: 'midterm2' };

// Midterm mở được khi tất cả modules trong part đã xong
const isMidtermUnlocked = (midtermId, course) => {
  const cfg = getMidtermConfig(midtermId);
  if (!cfg) return false;
  return cfg.modules.every((id) => isModuleDone(id));
};

// Final Exam mở khi cả 2 midterm đã pass
const isFinalExamUnlocked = () =>
  isMidtermDone('midterm1') && isMidtermDone('midterm2');
const isFinalExamDone = () =>
  state.progress?.completedFinalExam === true;

// Minigame helpers
const isMiniDone = (gameId) =>
  Array.isArray(state.progress?.completedMinigames) &&
  state.progress.completedMinigames.includes(gameId);

/**
 * Một module mở được khi:
 *  - Là module đầu tiên (id = 1), hoặc
 *  - Module trước đó đã hoàn thành
 */
const isModuleUnlocked = (module, allModules) => {
  if (module.id === 1) return true;
  const idx = allModules.findIndex((m) => m.id === module.id);
  if (idx <= 0) return true;
  return isModuleDone(allModules[idx - 1].id);
};

// ── Render sidebar nav ─────────────────────────────────────────

const renderModuleNav = (course) => {
  const completed       = getCompletedModules();
  const feUnlocked      = isFinalExamUnlocked();
  const feDone          = isFinalExamDone();
  const feActive        = state.currentView === 'finalexam';
  const parts = course.parts.map((part) => ({
    ...part,
    modules: course.modules.filter((m) => m.part === part.id),
  }));

  dom.moduleNav.innerHTML = parts.map((part) => {
    const midtermId = PART_MIDTERM[part.id];
    const mtCfg     = midtermId ? getMidtermConfig(midtermId) : null;
    const mtDone    = midtermId ? isMidtermDone(midtermId) : false;
    const mtUnlocked = midtermId ? isMidtermUnlocked(midtermId, course) : false;
    const mtActive  = state.currentMidtermId === midtermId;

    return `
      <div class="nav-part-title">${part.title}</div>
      ${part.modules.map((mod) => {
        const done     = completed.includes(mod.id);
        const unlocked = isModuleUnlocked(mod, course.modules);
        const active   = state.currentModuleId === mod.id;
        const cls = ['nav-module-item',
          done ? 'is-done' : '', active ? 'is-active' : '',
          !unlocked ? 'is-locked' : ''].filter(Boolean).join(' ');

        return `
          <div class="${cls}" data-module-id="${mod.id}" role="button" tabindex="0">
            <span class="nav-module-num">${String(mod.id).padStart(2, '0')}</span>
            <span class="nav-module-name">${mod.title}</span>
            <svg class="nav-module-check" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
              <polyline points="20 6 9 17 4 12"/>
            </svg>
          </div>`;
      }).join('')}

      ${mtCfg ? `
        <div class="nav-module-item nav-midterm-item ${mtDone ? 'is-done' : ''} ${mtActive ? 'is-active' : ''} ${!mtUnlocked ? 'is-locked' : ''}"
             data-midterm-id="${midtermId}" role="button" tabindex="0"
             style="border-left-color:${mtDone ? '' : mtUnlocked ? 'var(--clr-warning)' : ''}">
          <span class="nav-module-num" style="color:var(--clr-warning)">🎯</span>
          <span class="nav-module-name" style="font-weight:600">${mtCfg.title}</span>
          <svg class="nav-module-check" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
            <polyline points="20 6 9 17 4 12"/>
          </svg>
        </div>` : ''}
    `;
  }).join('') + `
    <div class="nav-part-title">Final</div>
    <div class="nav-module-item nav-exam-item ${feDone ? 'is-done' : ''} ${feActive ? 'is-active' : ''} ${!feUnlocked ? 'is-locked' : ''}"
         id="nav-final-exam" role="button" tabindex="${feUnlocked ? 0 : -1}"
         style="border-left-color:${feDone ? '' : feUnlocked ? 'var(--clr-danger)' : ''}">
      <span class="nav-module-num" style="color:var(--clr-danger)">🏁</span>
      <span class="nav-module-name" style="font-weight:600">Final Exam</span>
      <svg class="nav-module-check" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
        <polyline points="20 6 9 17 4 12"/>
      </svg>
    </div>`;

  // Click: module items
  dom.moduleNav.querySelectorAll('.nav-module-item[data-module-id]').forEach((el) => {
    el.addEventListener('click', () => {
      const moduleId = Number(el.dataset.moduleId);
      const mod = course.modules.find((m) => m.id === moduleId);
      if (!mod) return;
      if (!isModuleUnlocked(mod, course.modules)) {
        showToast('Hãy hoàn thành module trước để mở khóa.', 'info');
        return;
      }
      closeSidebar();
      navigateToModule(moduleId);
    });
    el.addEventListener('keydown', (e) => { if (e.key === 'Enter' || e.key === ' ') el.click(); });
  });

  // Click: midterm items
  dom.moduleNav.querySelectorAll('.nav-midterm-item[data-midterm-id]').forEach((el) => {
    el.addEventListener('click', () => {
      const midtermId = el.dataset.midtermId;
      if (!isMidtermUnlocked(midtermId, course)) {
        showToast('Hãy hoàn thành tất cả module trước để mở khóa midterm.', 'info');
        return;
      }
      closeSidebar();
      navigateToMidterm(midtermId);
    });
    el.addEventListener('keydown', (e) => { if (e.key === 'Enter' || e.key === ' ') el.click(); });
  });

  // Click: final exam item
  const navExamEl = dom.moduleNav.querySelector('#nav-final-exam');
  navExamEl?.addEventListener('click', () => {
    if (!isFinalExamUnlocked()) {
      showToast('Hoàn thành cả 2 Midterm để mở khóa Final Exam.', 'info');
      return;
    }
    navigateToFinalExam();
  });
  navExamEl?.addEventListener('keydown', (e) => { if (e.key === 'Enter' || e.key === ' ') navExamEl.click(); });
};

// ── Admin panel (chỉ deepfense@gmail.com) ─────────────────────

const renderAdminPanel = () => {
  if (!dom.dashboardAdmin) return;

  const isAdmin = state.user?.email === 'deepfense@gmail.com';
  if (!isAdmin) { dom.dashboardAdmin.innerHTML = ''; return; }

  dom.dashboardAdmin.innerHTML = `
    <div style="background:rgba(239,68,68,.06);border:1px solid rgba(239,68,68,.2);
                border-radius:14px;padding:18px 20px;margin-bottom:18px">
      <div style="display:flex;align-items:center;gap:8px;margin-bottom:4px">
        <span style="font-size:.65rem;font-weight:800;letter-spacing:.12em;text-transform:uppercase;
                     color:#f87171">⚙ DEV TOOLS</span>
        <span style="font-size:.65rem;font-weight:600;color:var(--clr-text-3);letter-spacing:.08em">
          ADMIN ONLY
        </span>
      </div>
      <p style="font-size:.8rem;color:var(--clr-text-3);margin-bottom:14px;line-height:1.5">
        Hoàn thành toàn bộ khóa học trong Firestore để test luồng Certificate.
      </p>
      <div style="display:flex;gap:10px;flex-wrap:wrap">
        <button id="btn-admin-complete"
                style="padding:8px 18px;border-radius:10px;font-size:.78rem;font-weight:700;
                       letter-spacing:.06em;background:rgba(239,68,68,.15);
                       border:1px solid rgba(239,68,68,.3);color:#f87171;cursor:pointer;
                       transition:background .2s">
          ✅ Hoàn thành tất cả
        </button>
        <button id="btn-admin-reset"
                style="padding:8px 18px;border-radius:10px;font-size:.78rem;font-weight:700;
                       letter-spacing:.06em;background:rgba(255,255,255,.04);
                       border:1px solid rgba(255,255,255,.08);color:var(--clr-text-3);
                       cursor:pointer;transition:background .2s">
          🔄 Reset tiến độ
        </button>
      </div>
    </div>`;

  document.getElementById('btn-admin-complete')?.addEventListener('click', async (e) => {
    e.currentTarget.disabled   = true;
    e.currentTarget.textContent = '⏳ Đang ghi…';
    try {
      await adminCompleteAll(state.user.uid);
      showToast('✅ Đã ghi dữ liệu hoàn thành vào Firestore!', 'success');
    } catch (err) {
      console.error('[Admin] adminCompleteAll failed:', err);
      showToast('❌ Lỗi: ' + err.message, 'info');
    } finally {
      e.currentTarget.disabled   = false;
      e.currentTarget.textContent = '✅ Hoàn thành tất cả';
    }
  });

  document.getElementById('btn-admin-reset')?.addEventListener('click', async (e) => {
    if (!confirm('Reset toàn bộ tiến độ trong Firestore?')) return;
    e.currentTarget.disabled   = true;
    e.currentTarget.textContent = '⏳ Đang reset…';
    try {
      await adminResetProgress(state.user.uid);
      showToast('🔄 Đã reset tiến độ.', 'info');
    } catch (err) {
      console.error('[Admin] adminResetProgress failed:', err);
      showToast('❌ Lỗi: ' + err.message, 'info');
    } finally {
      e.currentTarget.disabled   = false;
      e.currentTarget.textContent = '🔄 Reset tiến độ';
    }
  });
};

// ── Render dashboard ───────────────────────────────────────────

const renderDashboard = (course) => {
  renderAdminPanel();

  const completed    = getCompletedModules();
  const feUnlocked   = isFinalExamUnlocked();
  const feDone       = isFinalExamDone();
  const feStatus     = getFinalExamStatus(state.progress);
  dom.statCompleted.textContent = completed.length;
  dom.statDpfEarned.textContent = state.progress?.dpfEarned ?? 0;

  const parts = course.parts.map((part) => ({
    ...part,
    modules: course.modules.filter((m) => m.part === part.id),
  }));

  const finalExamCard = `
    <div style="margin-bottom:6px">
      <div style="font-size:.7rem;font-weight:700;letter-spacing:.1em;text-transform:uppercase;
                  color:var(--clr-text-3);padding:12px 0 6px">Final</div>
      <div class="dash-module-card ${feDone ? 'is-done' : ''} ${!feUnlocked ? 'is-locked' : ''}"
           id="dash-final-exam" role="button" tabindex="${feUnlocked ? 0 : -1}"
           style="border-color:${feDone ? 'rgba(34,197,94,.25)' : feUnlocked ? 'rgba(239,68,68,.3)' : ''};
                  background:${feUnlocked && !feDone ? 'rgba(239,68,68,.04)' : ''}">
        <span class="dash-module-num" style="color:var(--clr-danger)">🏁</span>
        <div class="dash-module-info">
          <div class="dash-module-title"
               style="color:${feUnlocked ? 'var(--clr-text)' : 'var(--clr-text-3)'}">
            Final Exam
          </div>
          <div class="dash-module-meta">
            <span>50 câu · tối đa 3 lần thi</span>
            <span class="dash-module-level"
                  style="background:rgba(239,68,68,.15);color:#f87171">Final</span>
          </div>
          ${feDone && feStatus.bestScore !== null ? `
            <div style="font-size:.72rem;color:var(--clr-success);margin-top:3px">
              Điểm cao nhất: ${Math.round(feStatus.bestScore * 100)}%
            </div>` : ''}
          ${!feDone && feStatus.attempts > 0 ? `
            <div style="font-size:.72rem;color:var(--clr-warning);margin-top:3px">
              Đã thi ${feStatus.attempts} lần · còn ${feStatus.remaining} lượt
            </div>` : ''}
        </div>
        <span class="dash-module-status ${feDone ? 'status-done' : feUnlocked ? '' : 'status-locked'}"
              style="${feUnlocked && !feDone ? 'background:rgba(239,68,68,.12);color:#f87171' : ''}">
          ${feDone ? 'Hoàn thành' : feUnlocked ? (feStatus.attempts > 0 ? 'Thi lại' : 'Thi ngay') : 'Khóa'}
        </span>
      </div>
    </div>`;

  dom.dashboardModules.innerHTML = parts.map((part) => {
    const midtermId  = PART_MIDTERM[part.id];
    const mtCfg      = midtermId ? getMidtermConfig(midtermId) : null;
    const mtDone     = midtermId ? isMidtermDone(midtermId) : false;
    const mtUnlocked = midtermId ? isMidtermUnlocked(midtermId, course) : false;

    const moduleCards = part.modules.map((mod) => {
      const done     = completed.includes(mod.id);
      const unlocked = isModuleUnlocked(mod, course.modules);
      const isPrimaryGame = mod.minigame?.primary === true;
      const levelCls = `level-${(mod.level ?? '').toLowerCase()}`;

      // Status label / class
      let statusLabel, statusCls, statusStyle = '';
      if (done) {
        statusLabel = 'Hoàn thành'; statusCls = 'status-done';
      } else if (!unlocked) {
        statusLabel = 'Khóa'; statusCls = 'status-locked';
      } else if (isPrimaryGame) {
        statusLabel = '🎮 Chơi ngay'; statusCls = '';
        statusStyle = 'background:rgba(0,240,255,.1);color:var(--clr-primary)';
      } else {
        statusLabel = 'Bắt đầu'; statusCls = 'status-active';
      }

      // Bonus minigame sub-card (chỉ hiện sau khi module done)
      const bonusCard = (mod.minigame && !mod.minigame.primary && done) ? (() => {
        const g    = mod.minigame;
        const gDone = isMiniDone(g.id);
        return `
          <div class="dash-module-card dash-bonus-card ${gDone ? 'is-done' : ''}"
               data-game-id="${g.id}" data-module-id="${mod.id}"
               role="button" tabindex="0"
               style="border-color:${gDone ? 'rgba(34,197,94,.2)' : 'rgba(0,240,255,.2)'};
                      background:${gDone ? '' : 'rgba(0,240,255,.03)'}">
            <span class="dash-module-num" style="color:var(--clr-primary);font-size:.95rem">🎮</span>
            <div class="dash-module-info">
              <div class="dash-module-title" style="font-size:.88rem;color:var(--clr-text-2)">
                ${g.label}
              </div>
              <div class="dash-module-meta">
                <span>Bonus · Module ${mod.id}</span>
                <span class="dash-module-level"
                      style="background:rgba(0,240,255,.1);color:var(--clr-primary)">+${g.dpf} DPF</span>
              </div>
            </div>
            <span class="dash-module-status ${gDone ? 'status-done' : ''}"
                  style="${!gDone ? 'background:rgba(0,240,255,.1);color:var(--clr-primary)' : ''}">
              ${gDone ? 'Hoàn thành' : 'Chơi ngay'}
            </span>
          </div>`;
      })() : '';

      return `
        <div class="dash-module-card ${done ? 'is-done' : ''} ${!unlocked ? 'is-locked' : ''}"
             data-module-id="${mod.id}" role="button" tabindex="${unlocked ? 0 : -1}">
          <span class="dash-module-num">${String(mod.id).padStart(2, '0')}</span>
          <div class="dash-module-info">
            <div class="dash-module-title">${mod.title}</div>
            <div class="dash-module-meta">
              <span>${mod.duration ?? ''}</span>
              <span class="dash-module-level ${levelCls}">${mod.level ?? ''}</span>
            </div>
          </div>
          <span class="dash-module-status ${statusCls}" style="${statusStyle}">${statusLabel}</span>
        </div>
        ${bonusCard}`;
    }).join('');

    // Midterm card sau mỗi part (nếu có)
    const midtermCard = mtCfg ? `
      <div class="dash-module-card ${mtDone ? 'is-done' : ''} ${!mtUnlocked ? 'is-locked' : ''}"
           data-midterm-id="${midtermId}" role="button" tabindex="${mtUnlocked ? 0 : -1}"
           style="border-color:${mtDone ? 'rgba(34,197,94,.25)' : mtUnlocked ? 'rgba(245,158,11,.3)' : ''};
                  background:${mtUnlocked && !mtDone ? 'rgba(245,158,11,.04)' : ''}">
        <span class="dash-module-num" style="color:var(--clr-warning)">🎯</span>
        <div class="dash-module-info">
          <div class="dash-module-title" style="color:${mtUnlocked ? 'var(--clr-text)' : 'var(--clr-text-3)'}">
            ${mtCfg.title}
          </div>
          <div class="dash-module-meta">
            <span>${mtCfg.subtitle}</span>
            <span class="dash-module-level"
                  style="background:rgba(245,158,11,.15);color:#fbbf24">Milestone</span>
          </div>
        </div>
        <span class="dash-module-status ${mtDone ? 'status-done' : mtUnlocked ? '' : 'status-locked'}"
              style="${mtUnlocked && !mtDone ? 'background:rgba(245,158,11,.12);color:#fbbf24' : ''}">
          ${mtDone ? 'Hoàn thành' : mtUnlocked ? 'Thi ngay' : 'Khóa'}
        </span>
      </div>` : '';

    return `
      <div style="margin-bottom:6px">
        <div style="font-size:.7rem;font-weight:700;letter-spacing:.1em;text-transform:uppercase;
                    color:var(--clr-text-3);padding:12px 0 6px">${part.title}</div>
        ${moduleCards}
        ${midtermCard}
      </div>`;
  }).join('') + finalExamCard;

  // Click: module cards
  dom.dashboardModules.querySelectorAll('[data-module-id]').forEach((el) => {
    el.addEventListener('click', () => {
      const moduleId = Number(el.dataset.moduleId);
      const mod = course.modules.find((m) => m.id === moduleId);
      if (!mod) return;
      if (!isModuleUnlocked(mod, course.modules)) {
        showToast('Hãy hoàn thành module trước để mở khóa.', 'info'); return;
      }
      navigateToModule(moduleId);
    });
  });

  // Click: midterm cards
  dom.dashboardModules.querySelectorAll('[data-midterm-id]').forEach((el) => {
    el.addEventListener('click', () => {
      const midtermId = el.dataset.midtermId;
      if (!isMidtermUnlocked(midtermId, course)) {
        showToast('Hãy hoàn thành tất cả module trong phần này trước.', 'info'); return;
      }
      navigateToMidterm(midtermId);
    });
  });

  // Click: bonus minigame cards
  dom.dashboardModules.querySelectorAll('[data-game-id]').forEach((el) => {
    el.addEventListener('click', () => {
      const moduleId = Number(el.dataset.moduleId);
      const mod = course.modules.find((m) => m.id === moduleId);
      if (!mod?.minigame) return;
      navigateToMinigame(mod, course);
    });
  });

  // Click: final exam card
  document.getElementById('dash-final-exam')?.addEventListener('click', () => {
    if (!isFinalExamUnlocked()) {
      showToast('Hoàn thành cả 2 Midterm để mở khóa Final Exam.', 'info'); return;
    }
    navigateToFinalExam();
  });
};

// ── Progress bar ───────────────────────────────────────────────

const updateProgressBar = (course) => {
  const total     = course.modules.length;
  const completed = getCompletedModules().length;
  const pct       = total > 0 ? Math.round((completed / total) * 100) : 0;
  dom.progressPercent.textContent = `${pct}%`;
  dom.progressFill.style.width    = `${pct}%`;
};

// ── Views ──────────────────────────────────────────────────────

const VIEWS = ['viewDashboard', 'viewLesson', 'viewQuiz', 'viewExam', 'viewCertificate'];

const showView = (viewKey) => {
  VIEWS.forEach((k) => dom[k].classList.toggle('hidden', k !== viewKey));
  state.currentView = viewKey.replace('view', '').toLowerCase();
};

// ── Navigation ─────────────────────────────────────────────────

const navigateToDashboard = async () => {
  const course = await loadManifest();
  state.currentModuleId  = null;
  state.currentMidtermId = null;
  renderModuleNav(course);
  renderDashboard(course);
  updateBreadcrumb([course.title]);
  showView('viewDashboard');
};

const navigateToCertificate = async () => {
  const course = await loadManifest();
  state.currentModuleId  = null;
  state.currentMidtermId = null;
  updateBreadcrumb([course.title, 'Chứng chỉ']);
  showView('viewCertificate');
  dom.contentArea.scrollTo({ top: 0, behavior: 'smooth' });
  closeSidebar();
  await showCertView(state.progress);
};
window.navigateToCertificate = navigateToCertificate;

// Cert button trong sidebar — cũng ghi dữ liệu vào localStorage cho basics SPA
// để certificate-template.html unlock được, rồi redirect sang đó.
dom.btnViewCert?.addEventListener('click', () => {
  // Ghi exam completion vào localStorage cho /academy/basics/
  try {
    const existing = JSON.parse(localStorage.getItem('dfb_exam_v1') || 'null');
    if (!existing?.passed) {
      localStorage.setItem('dfb_exam_v1', JSON.stringify({
        passed:    true,
        passedAt:  Date.now(),
        bestScore: 50,
        attempts:  1,
      }));
    }
    // Ghi tên từ tài khoản Google vào dfb_cert_name nếu chưa có
    if (!localStorage.getItem('dfb_cert_name') && state.user?.displayName) {
      localStorage.setItem('dfb_cert_name', state.user.displayName);
    }
  } catch {}

  // Redirect sang trang chứng chỉ của /academy/basics/
  window.location.href = '/academy/certificate-template/certificate-template.html';
});

const navigateToFinalExam = async () => {
  const course = await loadManifest();
  state.currentModuleId  = null;
  state.currentMidtermId = null;
  state.currentView      = 'finalexam';
  renderModuleNav(course);
  updateBreadcrumb([course.title, 'Final Exam']);
  closeSidebar();
  dom.contentArea.scrollTo({ top: 0, behavior: 'smooth' });

  startFinalExam(async (passed) => {
    state.currentView = 'dashboard';
    if (passed) {
      showToast('🏆 Vượt qua Final Exam! Chứng chỉ đã mở khóa.', 'success');
      await navigateToCertificate();
    } else {
      navigateToDashboard();
    }
  });
};
window.navigateToFinalExam = navigateToFinalExam;

const navigateToMinigame = async (mod, course) => {
  const gameCfg = mod.minigame;
  if (!gameCfg) return;

  state.currentModuleId  = mod.id;
  state.currentMidtermId = null;
  state.currentView      = 'minigame';
  renderModuleNav(course);
  updateBreadcrumb([course.title, mod.title, gameCfg.label ?? 'Minigame']);
  closeSidebar();
  dom.contentArea.scrollTo({ top: 0, behavior: 'smooth' });

  startMinigame(gameCfg, gameCfg.primary ? mod.id : null, async (passed, score, dpfEarned) => {
    state.currentModuleId = null;
    state.currentView     = 'dashboard';
    if (passed) {
      const msg = gameCfg.primary
        ? `🎮 ${gameCfg.label ?? 'Minigame'} hoàn thành! +${dpfEarned} DPF`
        : `🎯 Bonus hoàn thành! +${dpfEarned} DPF`;
      showToast(msg, 'success');
    } else {
      showToast('Ôn lại rồi thử lại nhé!', 'info');
    }
    navigateToDashboard();
  });
};
window.navigateToMinigame = navigateToMinigame;

const navigateToMidterm = async (midtermId) => {
  const course = await loadManifest();
  const cfg    = getMidtermConfig(midtermId);
  if (!cfg) return;

  state.currentModuleId  = null;
  state.currentMidtermId = midtermId;
  renderModuleNav(course);
  updateBreadcrumb([course.title, cfg.title]);

  startMidterm(midtermId, async (passed) => {
    state.currentMidtermId = null;
    if (passed) {
      showToast(`🏆 ${cfg.title} hoàn thành! +50 DPF`, 'success');
    } else {
      showToast('Ôn lại các module rồi thử lại nhé!', 'info');
    }
    navigateToDashboard();
  });
};

const navigateToModule = async (moduleId) => {
  const course = await loadManifest();
  const mod = course.modules.find((m) => m.id === moduleId);
  if (!mod) return;

  state.currentModuleId  = moduleId;
  state.currentMidtermId = null;
  renderModuleNav(course);

  if (mod.sourceFile) {
    showLessonView(mod, course);
  } else if (mod.minigame?.primary) {
    // Module dùng minigame làm bài thi chính (không có lesson text)
    navigateToMinigame(mod, course);
  } else {
    showToast(`Module ${mod.id}: Nội dung đang được cập nhật.`, 'info');
  }
};

// ── Lesson view ────────────────────────────────────────────────

const showLessonView = async (mod, course) => {
  const partInfo = course.parts.find((p) => p.id === mod.part);
  $('lesson-part-label').textContent = partInfo?.title ?? '';
  $('lesson-title').textContent      = mod.title ?? '';
  $('lesson-duration').textContent   = mod.duration ?? '';

  const levelBadge = $('lesson-level');
  levelBadge.textContent  = mod.level ?? '';
  levelBadge.className    = `lesson-level-badge level-${(mod.level ?? '').toLowerCase()}`;

  updateBreadcrumb([course.title, mod.title]);

  // Tải nội dung markdown
  const contentEl = $('lesson-content');
  contentEl.innerHTML = `<p style="color:var(--clr-text-3)">Đang tải nội dung…</p>`;

  try {
    const res = await fetch(`../content/${mod.sourceFile}`);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const md = await res.text();
    contentEl.innerHTML = renderMarkdown(md);
  } catch (err) {
    contentEl.innerHTML = `
      <div style="padding:24px;background:var(--clr-surface);border-radius:10px;text-align:center;color:var(--clr-text-3)">
        <p style="margin-bottom:8px">Không thể tải nội dung module.</p>
        <p style="font-size:.8rem">${err.message}</p>
      </div>`;
  }

  // Prev / Next buttons
  const allMods  = course.modules;
  const idx      = allMods.findIndex((m) => m.id === mod.id);
  const prevMod  = allMods[idx - 1] ?? null;
  const nextMod  = allMods[idx + 1] ?? null;

  const btnPrev = $('btn-prev-lesson');
  const btnNext = $('btn-next-lesson');

  btnPrev.disabled = !prevMod;
  btnPrev.onclick  = prevMod ? () => navigateToModule(prevMod.id) : null;

  // Next: quiz → minigame bonus → next module / dashboard
  if (mod.quiz) {
    btnNext.textContent = 'Làm Quiz →';
    btnNext.onclick = () => showQuizView(mod, course);
  } else if (mod.minigame) {
    btnNext.textContent = `${mod.minigame.label ?? '🎮 Minigame'} →`;
    btnNext.onclick = () => navigateToMinigame(mod, course);
  } else if (nextMod) {
    btnNext.textContent = 'Tiếp theo →';
    btnNext.onclick = () => navigateToModule(nextMod.id);
  } else {
    btnNext.textContent = 'Về Dashboard';
    btnNext.onclick = navigateToDashboard;
  }

  showView('viewLesson');
  dom.contentArea.scrollTo({ top: 0, behavior: 'smooth' });
};

// ── Quiz view ──────────────────────────────────────────────────

const showQuizView = (mod, course) => {
  updateBreadcrumb([course.title, mod.title, 'Quiz']);

  // Gọi engine quiz thật; callback xử lý sau khi xong
  startQuiz(mod, course, async (passed) => {
    if (passed) {
      // Có bonus minigame → gợi ý chơi
      if (mod.minigame && !mod.minigame.primary && !isMiniDone(mod.minigame.id)) {
        showToast(`🎮 Mở khóa bonus: ${mod.minigame.label} (+${mod.minigame.dpf} DPF)`, 'success', 4500);
      } else {
        showToast('🎉 Module hoàn thành! Tiếp tục nào.', 'success');
      }
      const allMods = course.modules;
      const idx     = allMods.findIndex((m) => m.id === mod.id);
      const nextMod = allMods[idx + 1] ?? null;
      if (nextMod && isModuleUnlocked(nextMod, allMods)) {
        navigateToModule(nextMod.id);
      } else {
        navigateToDashboard();
      }
    } else {
      showToast('Ôn lại bài học và thử lại nhé!', 'info');
      showLessonView(mod, course);
    }
  });
};

// Expose for inline onclick (quiz view placeholder button)
window.navigateToDashboard = navigateToDashboard;

// ── Breadcrumb ─────────────────────────────────────────────────

const updateBreadcrumb = (items) => {
  dom.breadcrumb.innerHTML = items.map((item, i) => `
    <span class="breadcrumb-item ${i === 0 ? 'breadcrumb-home' : ''}">${item}</span>
  `).join('');
};

// ── DPF balance in topbar ──────────────────────────────────────

const updateTopbarDpf = (balance) => {
  state.dpfBalance = balance;
  if (balance > 0) {
    dom.topbarDpfVal.textContent = balance.toLocaleString('vi-VN');
    dom.topbarDpf.classList.remove('hidden');
  } else {
    dom.topbarDpf.classList.add('hidden');
  }
};

// ── Minimal Markdown renderer ──────────────────────────────────
// Đủ để hiển thị nội dung .md của khóa học.
// (Không dùng thư viện ngoài để giữ app nhẹ)

const escHtml = (s) => s
  .replace(/&/g, '&amp;')
  .replace(/</g, '&lt;')
  .replace(/>/g, '&gt;');

const renderMarkdown = (md) => {
  const lines   = md.split('\n');
  const out     = [];
  let inCode    = false;
  let codeLang  = '';
  let codeBuf   = [];
  let inTable   = false;
  let tableHead = false;

  const flushTable = () => {
    if (inTable) { out.push('</tbody></table>'); inTable = false; tableHead = false; }
  };

  const inline = (s) => s
    .replace(/`([^`]+)`/g, '<code>$1</code>')
    .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
    .replace(/\*([^*]+)\*/g, '<em>$1</em>')
    .replace(/~~([^~]+)~~/g, '<del>$1</del>')
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" rel="noopener">$1</a>');

  for (let i = 0; i < lines.length; i++) {
    const raw  = lines[i];
    const line = raw.trimEnd();

    // Fenced code block
    if (line.startsWith('```')) {
      if (!inCode) {
        flushTable();
        inCode = true;
        codeLang = line.slice(3).trim();
        codeBuf  = [];
      } else {
        const cls = codeLang ? ` class="language-${escHtml(codeLang)}"` : '';
        out.push(`<pre><code${cls}>${escHtml(codeBuf.join('\n'))}</code></pre>`);
        inCode = false;
        codeLang = '';
        codeBuf  = [];
      }
      continue;
    }

    if (inCode) { codeBuf.push(raw); continue; }

    // Horizontal rule
    if (/^(-{3,}|\*{3,}|_{3,})$/.test(line.trim())) {
      flushTable();
      out.push('<hr>');
      continue;
    }

    // Headings
    const hMatch = line.match(/^(#{1,6})\s+(.*)/);
    if (hMatch) {
      flushTable();
      const level = hMatch[1].length;
      out.push(`<h${level}>${inline(hMatch[2])}</h${level}>`);
      continue;
    }

    // Blockquote
    if (line.startsWith('> ')) {
      flushTable();
      out.push(`<blockquote>${inline(line.slice(2))}</blockquote>`);
      continue;
    }

    // Unordered list item
    if (/^[-*+] /.test(line)) {
      flushTable();
      // Simple single-level — check prev/next for wrapping
      const prev = out[out.length - 1] ?? '';
      if (!prev.endsWith('</li>') && !prev.endsWith('<ul>')) out.push('<ul>');
      out.push(`<li>${inline(line.slice(2))}</li>`);
      const next = lines[i + 1]?.trimEnd() ?? '';
      if (!/^[-*+] /.test(next)) out.push('</ul>');
      continue;
    }

    // Ordered list item
    if (/^\d+\. /.test(line)) {
      flushTable();
      const prev = out[out.length - 1] ?? '';
      if (!prev.endsWith('</li>') && !prev.endsWith('<ol>')) out.push('<ol>');
      out.push(`<li>${inline(line.replace(/^\d+\. /, ''))}</li>`);
      const next = lines[i + 1]?.trimEnd() ?? '';
      if (!/^\d+\. /.test(next)) out.push('</ol>');
      continue;
    }

    // Table row
    if (line.startsWith('|')) {
      const cells = line.split('|').slice(1, -1).map((c) => c.trim());
      const isSep = cells.every((c) => /^:?-+:?$/.test(c));
      if (isSep) { tableHead = false; continue; }

      if (!inTable) {
        out.push('<table><thead><tr>');
        cells.forEach((c) => out.push(`<th>${inline(c)}</th>`));
        out.push('</tr></thead><tbody>');
        inTable   = true;
        tableHead = true;
      } else {
        out.push('<tr>');
        cells.forEach((c) => out.push(`<td>${inline(c)}</td>`));
        out.push('</tr>');
      }
      continue;
    } else {
      flushTable();
    }

    // Empty line → paragraph break
    if (line.trim() === '') {
      out.push('');
      continue;
    }

    // Plain paragraph
    out.push(`<p>${inline(line)}</p>`);
  }

  // Flush any open code block
  if (inCode && codeBuf.length) {
    out.push(`<pre><code>${escHtml(codeBuf.join('\n'))}</code></pre>`);
  }
  flushTable();

  return out.join('\n');
};

// ── Toast notification ─────────────────────────────────────────

// Toast container — thêm vào body nếu chưa có
let toastContainer = document.getElementById('toast-container');
if (!toastContainer) {
  toastContainer = document.createElement('div');
  toastContainer.id = 'toast-container';
  document.body.appendChild(toastContainer);
}

const showToast = (message, type = 'info', duration = 3200) => {
  const el = document.createElement('div');
  el.className = `toast toast--${type}`;
  el.textContent = message;
  toastContainer.appendChild(el);
  setTimeout(() => el.remove(), duration);
};

// ── Firestore subscriptions ────────────────────────────────────

const cleanupSubscriptions = () => {
  state.unsubs.forEach((fn) => fn());
  state.unsubs = [];
};

// ── Shared localStorage bridge (syncs module progress with /academy/basics/) ──
const MODULE_SYNC_KEY = 'dfb_module_sync_v1';

function writeModuleSync(completedModuleNums) {
  try {
    const prev = JSON.parse(localStorage.getItem(MODULE_SYNC_KEY) || '{}');
    const merged = {
      completedModules: [...new Set([...(prev.completedModules || []), ...completedModuleNums])],
      updatedAt: Date.now(),
    };
    localStorage.setItem(MODULE_SYNC_KEY, JSON.stringify(merged));
  } catch {}
}

const startSubscriptions = (user) => {
  cleanupSubscriptions();

  // Lắng nghe tiến độ học
  const unsubProgress = listenProgress(user.uid, async (data) => {
    state.progress = data;

    // Show/hide cert button in sidebar
    if (dom.btnViewCert) {
      const eligible = checkCertEligibility(data);
      dom.btnViewCert.classList.toggle('hidden', !eligible);
    }

    // Sync completed modules → shared key (read by /academy/basics/ SPA)
    const completedMods = Array.isArray(data?.completedModules) ? data.completedModules : [];
    if (completedMods.length > 0) writeModuleSync(completedMods);

    if (state.manifest) {
      updateProgressBar(state.manifest);
      renderModuleNav(state.manifest);
      if (state.currentView === 'dashboard') renderDashboard(state.manifest);
    }
  });

  // Lắng nghe số dư DPF
  const unsubDpf = listenDpfBalance(user.uid, updateTopbarDpf);

  state.unsubs.push(unsubProgress, unsubDpf);
};

// ── Auth state listener ────────────────────────────────────────

// ── Auth session key (read by /academy/basics/ as access gate) ──
const SESSION_KEY = 'dfb_session_v1';

listenAuth(async (user) => {
  if (user) {
    // Đã đăng nhập
    state.user = user;

    // Ghi session để /academy/basics/ biết đã xác thực
    try {
      localStorage.setItem(SESSION_KEY, JSON.stringify({
        uid: user.uid,
        loginAt: Date.now(),
      }));
    } catch {}

    // Cập nhật sidebar user info
    dom.sidebarAvatar.src = user.photoURL || '';
    dom.sidebarAvatar.alt = user.displayName || 'Avatar';
    dom.sidebarName.textContent  = user.displayName || '---';
    dom.sidebarEmail.textContent = user.email || '---';

    // Đảm bảo có bản ghi learner
    await ensureAcademyLearner(user);

    // Bắt đầu realtime subscriptions
    startSubscriptions(user);

    // Load manifest + render dashboard
    try {
      const course = await loadManifest();
      updateProgressBar(course);
      renderModuleNav(course);
      renderDashboard(course);
      updateBreadcrumb([course.title]);
    } catch (err) {
      console.error('[Academy] Failed to load manifest:', err);
    }

    showScreen('screenApp');
  } else {
    // Đã đăng xuất — xoá session
    try { localStorage.removeItem(SESSION_KEY); } catch {}
    state.user    = null;
    state.progress = null;
    cleanupSubscriptions();
    updateTopbarDpf(0);
    showScreen('screenLogin');
  }
});
