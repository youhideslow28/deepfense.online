/**
 * DEEPFENSE ACADEMY — certificate.js
 * Cấp và vẽ chứng chỉ DEEPFENSE AWARE bằng Canvas API.
 *
 * Eligibility: completedModules ⊇ [1..6] AND completedMidterms ⊇ [midterm1, midterm2]
 * Storage:     academy_learners/{uid}.certificateId / certificateIssuedAt / certificateName
 * Output:      Canvas 1200×850 → download PNG hoặc in PDF từ browser
 *
 * @copyright 2025 Ho Xuan Nguyen (25NS039)
 */

import { auth, db } from './firebase-init.js';
import {
  doc,
  getDoc,
  setDoc,
  updateDoc,
  serverTimestamp,
  runTransaction,
  increment,
} from 'https://www.gstatic.com/firebasejs/11.8.1/firebase-firestore.js';

// ── Constants ──────────────────────────────────────────────────
const REQUIRED_MODULES  = [1, 2, 3, 4, 5, 6];
const REQUIRED_MIDTERMS = ['midterm1', 'midterm2'];
const DPF_CERT_REWARD   = 100;   // DPF khi nhận chứng chỉ lần đầu
const DPF_SEASON        = 'genesis-2026';
const CERT_W            = 1200;
const CERT_H            = 850;

// ── Check eligibility ──────────────────────────────────────────
export const checkCertEligibility = (progress) => {
  if (!progress) return false;
  const modules  = Array.isArray(progress.completedModules)  ? progress.completedModules  : [];
  const midterms = Array.isArray(progress.completedMidterms) ? progress.completedMidterms : [];
  const hasModules   = REQUIRED_MODULES.every((id) => modules.includes(id));
  const hasMidterms  = REQUIRED_MIDTERMS.every((id) => midterms.includes(id));
  const hasFinalExam = progress.completedFinalExam === true;
  return hasModules && hasMidterms && hasFinalExam;
};

// ── Generate certificate ID ────────────────────────────────────
const genCertId = (uid) => {
  const year = new Date().getFullYear();
  const uidPart = uid.slice(0, 6).toUpperCase().replace(/[^A-Z0-9]/g, 'X');
  const rand = Math.random().toString(16).slice(2, 6).toUpperCase();
  return `DF-AWARE-${year}-${uidPart}-${rand}`;
};

// ── Issue certificate (Firestore) ──────────────────────────────
export const issueCertificate = async (customName) => {
  const user = auth.currentUser;
  if (!user) return { ok: false, message: 'Chưa đăng nhập.' };

  const ref  = doc(db, 'academy_learners', user.uid);
  const snap = await getDoc(ref);
  const data = snap.exists() ? snap.data() : {};

  // Kiểm tra eligibility
  if (!checkCertEligibility(data)) {
    return { ok: false, message: 'Chưa đủ điều kiện nhận chứng chỉ.' };
  }

  // Đã có cert rồi → trả về cert cũ
  if (data.certificateIssued && data.certificateId) {
    return {
      ok: true,
      certId:    data.certificateId,
      certName:  customName || data.certificateName || user.displayName || '',
      issuedAt:  data.certificateIssuedAt?.toDate?.() ?? new Date(),
      alreadyIssued: true,
    };
  }

  const certId   = genCertId(user.uid);
  const certName = customName || user.displayName || '';
  const now      = new Date();

  try {
    await updateDoc(ref, {
      certificateIssued:   true,
      certificateId:       certId,
      certificateName:     certName,
      certificateIssuedAt: serverTimestamp(),
      updatedAt:           serverTimestamp(),
    });

    // Claim DPF cho certificate
    const dpfEarned = await claimCertDpf(user, certId);

    return { ok: true, certId, certName, issuedAt: now, dpfEarned };
  } catch (err) {
    console.error('[Certificate] issueCertificate failed:', err);
    return { ok: false, message: 'Lỗi khi cấp chứng chỉ. Thử lại sau.' };
  }
};

// ── Claim DPF certificate reward ───────────────────────────────
const claimCertDpf = async (user, certId) => {
  const amount         = DPF_CERT_REWARD;
  const idempotencyKey = `${user.uid}:certificate:deepfense-aware:${DPF_SEASON}`;
  const ledgerId       = idempotencyKey.replace(/[^a-zA-Z0-9_-]/g, '_').slice(0, 180);
  const day            = new Date().toISOString().slice(0, 10);
  const quotaId        = `${user.uid}_course_${day}`.replace(/[^a-zA-Z0-9_-]/g, '_');

  const userRef   = doc(db, 'users', user.uid);
  const ledgerRef = doc(db, 'dpf_ledger', ledgerId);
  const quotaRef  = doc(db, 'dpf_daily_quotas', quotaId);

  try {
    return await runTransaction(db, async (tx) => {
      const [userSnap, ledgerSnap] = await Promise.all([tx.get(userRef), tx.get(ledgerRef)]);
      if (ledgerSnap.exists()) return 0;

      const userData      = userSnap.exists() ? userSnap.data() : {};
      const balanceBefore = typeof userData.webBalance === 'number' ? userData.webBalance : 0;
      const balanceAfter  = balanceBefore + amount;

      tx.set(userRef, {
        uid: user.uid, email: user.email || '',
        displayName: user.displayName || '', photoURL: user.photoURL || '',
        webBalance:    balanceAfter,
        earnedBalance: (typeof userData.earnedBalance === 'number' ? userData.earnedBalance : 0) + amount,
        badges: [...new Set([...(Array.isArray(userData.badges) ? userData.badges : []), 'deepfense-aware'])],
        updatedAt: serverTimestamp(),
        createdAt: userSnap.exists() && userData.createdAt ? userData.createdAt : serverTimestamp(),
      }, { merge: true });

      tx.set(ledgerRef, {
        uid: user.uid, direction: 'credit', source: 'certificate', amount,
        balanceBefore, balanceAfter, status: 'confirmed',
        reason: 'Nhận chứng chỉ DEEPFENSE AWARE — DEEPFENSE BASIC',
        activityId: 'deepfense-aware-certificate',
        metadata: { season: DPF_SEASON, day, certId, courseId: 'deepfense-basics' },
        idempotencyKey, createdAt: serverTimestamp(), confirmedAt: serverTimestamp(),
      });

      tx.set(quotaRef, {
        uid: user.uid, source: 'certificate', day,
        count: increment(1), amount: increment(amount), updatedAt: serverTimestamp(),
      }, { merge: true });

      return amount;
    });
  } catch (err) {
    console.error('[Certificate] claimCertDpf failed:', err);
    return 0;
  }
};

// ── Draw certificate on Canvas ────────────────────────────────
// certData: { certId, certName, issuedAt: Date }
export const drawCertificate = async (canvas, certData) => {
  await document.fonts.ready;   // Đảm bảo fonts đã load

  canvas.width  = CERT_W;
  canvas.height = CERT_H;
  const ctx = canvas.getContext('2d');

  const { certId, certName, issuedAt } = certData;
  const dateStr = (issuedAt instanceof Date ? issuedAt : new Date())
    .toLocaleDateString('vi-VN', { day: '2-digit', month: '2-digit', year: 'numeric' });

  // ── Background ────────────────────────────────────────────────
  const bgGrad = ctx.createLinearGradient(0, 0, CERT_W, CERT_H);
  bgGrad.addColorStop(0,   '#050505');
  bgGrad.addColorStop(0.5, '#0a0f14');
  bgGrad.addColorStop(1,   '#050505');
  ctx.fillStyle = bgGrad;
  ctx.fillRect(0, 0, CERT_W, CERT_H);

  // ── Subtle grid ───────────────────────────────────────────────
  ctx.strokeStyle = 'rgba(0, 240, 255, 0.04)';
  ctx.lineWidth   = 1;
  for (let x = 0; x < CERT_W; x += 40) {
    ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, CERT_H); ctx.stroke();
  }
  for (let y = 0; y < CERT_H; y += 40) {
    ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(CERT_W, y); ctx.stroke();
  }

  // ── Corner decorations ────────────────────────────────────────
  const drawCorner = (cx, cy, rot) => {
    ctx.save();
    ctx.translate(cx, cy);
    ctx.rotate(rot);
    ctx.strokeStyle = 'rgba(0, 240, 255, 0.5)';
    ctx.lineWidth   = 2;
    ctx.beginPath(); ctx.moveTo(0, 0); ctx.lineTo(50, 0); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(0, 0); ctx.lineTo(0, 50); ctx.stroke();
    // inner corner
    ctx.strokeStyle = 'rgba(0, 240, 255, 0.25)';
    ctx.lineWidth   = 1;
    ctx.beginPath(); ctx.moveTo(8, 8); ctx.lineTo(38, 8); ctx.lineTo(38, 8); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(8, 8); ctx.lineTo(8, 38); ctx.stroke();
    ctx.restore();
  };
  drawCorner(30, 30,   0);
  drawCorner(CERT_W - 30, 30,   Math.PI / 2);
  drawCorner(CERT_W - 30, CERT_H - 30, Math.PI);
  drawCorner(30, CERT_H - 30, -Math.PI / 2);

  // ── Outer border ──────────────────────────────────────────────
  ctx.strokeStyle = 'rgba(0, 240, 255, 0.2)';
  ctx.lineWidth   = 1;
  roundRect(ctx, 20, 20, CERT_W - 40, CERT_H - 40, 4);
  ctx.stroke();

  // ── Top glow line ─────────────────────────────────────────────
  const glowGrad = ctx.createLinearGradient(200, 0, CERT_W - 200, 0);
  glowGrad.addColorStop(0,   'transparent');
  glowGrad.addColorStop(0.3, 'rgba(0,240,255,0.7)');
  glowGrad.addColorStop(0.7, 'rgba(0,240,255,0.7)');
  glowGrad.addColorStop(1,   'transparent');
  ctx.strokeStyle = glowGrad;
  ctx.lineWidth   = 2;
  ctx.beginPath(); ctx.moveTo(200, 76); ctx.lineTo(CERT_W - 200, 76); ctx.stroke();

  // ── DF Badge ──────────────────────────────────────────────────
  const badgeX = CERT_W / 2 - 22;
  const badgeY = 90;
  ctx.fillStyle = '#00F0FF';
  roundRect(ctx, badgeX, badgeY, 44, 44, 8);
  ctx.fill();
  ctx.font      = 'bold 18px "JetBrains Mono", monospace';
  ctx.fillStyle = '#000000';
  ctx.textAlign = 'center';
  ctx.fillText('DF', CERT_W / 2, badgeY + 28);

  // ── DEEPFENSE ACADEMY ─────────────────────────────────────────
  ctx.font      = '700 13px "Inter", sans-serif';
  ctx.fillStyle = 'rgba(0, 240, 255, 0.9)';
  ctx.letterSpacing = '0.2em';
  ctx.textAlign = 'center';
  ctx.fillText('DEEPFENSE  ACADEMY', CERT_W / 2, badgeY + 68);
  ctx.letterSpacing = '0';

  // ── Title ─────────────────────────────────────────────────────
  ctx.font      = '300 14px "Inter", sans-serif';
  ctx.fillStyle = 'rgba(160, 160, 160, 0.9)';
  ctx.textAlign = 'center';
  ctx.fillText('CHỨNG NHẬN HOÀN THÀNH  ·  CERTIFICATE OF COMPLETION', CERT_W / 2, 202);

  // ── Divider ───────────────────────────────────────────────────
  const divGrad = ctx.createLinearGradient(300, 0, CERT_W - 300, 0);
  divGrad.addColorStop(0,   'transparent');
  divGrad.addColorStop(0.4, 'rgba(0,240,255,0.3)');
  divGrad.addColorStop(0.6, 'rgba(0,240,255,0.3)');
  divGrad.addColorStop(1,   'transparent');
  ctx.strokeStyle = divGrad;
  ctx.lineWidth   = 1;
  ctx.beginPath(); ctx.moveTo(300, 220); ctx.lineTo(CERT_W - 300, 220); ctx.stroke();

  // ── "Được cấp cho" ────────────────────────────────────────────
  ctx.font      = '400 13px "Inter", sans-serif';
  ctx.fillStyle = 'rgba(120, 120, 120, 1)';
  ctx.textAlign = 'center';
  ctx.fillText('được trao tặng cho', CERT_W / 2, 258);

  // ── Student name ──────────────────────────────────────────────
  // Auto-scale font size to fit name
  const maxNameW = CERT_W - 200;
  let nameFontSize = 56;
  ctx.font = `700 ${nameFontSize}px "Inter", sans-serif`;
  while (ctx.measureText(certName).width > maxNameW && nameFontSize > 28) {
    nameFontSize -= 2;
    ctx.font = `700 ${nameFontSize}px "Inter", sans-serif`;
  }
  ctx.fillStyle = '#ffffff';
  ctx.textAlign = 'center';
  ctx.fillText(certName, CERT_W / 2, 320);

  // ── Name underline ────────────────────────────────────────────
  const nameW = Math.min(ctx.measureText(certName).width + 60, CERT_W - 200);
  const nameLineX = (CERT_W - nameW) / 2;
  ctx.strokeStyle = 'rgba(0, 240, 255, 0.4)';
  ctx.lineWidth   = 1;
  ctx.beginPath(); ctx.moveTo(nameLineX, 334); ctx.lineTo(nameLineX + nameW, 334); ctx.stroke();

  // ── "đã hoàn thành khóa học" ──────────────────────────────────
  ctx.font      = '300 14px "Inter", sans-serif';
  ctx.fillStyle = 'rgba(160, 160, 160, 0.9)';
  ctx.textAlign = 'center';
  ctx.fillText('đã hoàn thành toàn bộ chương trình học', CERT_W / 2, 374);

  // ── Course name ───────────────────────────────────────────────
  ctx.font      = '800 36px "JetBrains Mono", monospace';
  ctx.fillStyle = '#00F0FF';
  ctx.textAlign = 'center';
  ctx.fillText('DEEPFENSE BASIC', CERT_W / 2, 426);

  // ── Credential ────────────────────────────────────────────────
  // Badge background
  const credW = 260; const credH = 36; const credX = (CERT_W - credW) / 2; const credY = 444;
  ctx.fillStyle = 'rgba(0, 240, 255, 0.08)';
  ctx.strokeStyle = 'rgba(0, 240, 255, 0.3)';
  ctx.lineWidth   = 1;
  roundRect(ctx, credX, credY, credW, credH, 18);
  ctx.fill(); ctx.stroke();

  ctx.font      = '700 13px "Inter", sans-serif';
  ctx.fillStyle = '#00F0FF';
  ctx.textAlign = 'center';
  ctx.fillText('⬡  DEEPFENSE AWARE', CERT_W / 2, credY + 23);

  // ── Bottom divider ────────────────────────────────────────────
  ctx.strokeStyle = 'rgba(0, 240, 255, 0.15)';
  ctx.lineWidth   = 1;
  ctx.beginPath(); ctx.moveTo(100, 530); ctx.lineTo(CERT_W - 100, 530); ctx.stroke();

  // ── Bottom info row ───────────────────────────────────────────
  const infoY = 600;

  // Left: Ngày cấp
  ctx.textAlign = 'left';
  ctx.font      = '400 11px "Inter", sans-serif';
  ctx.fillStyle = 'rgba(100, 100, 100, 1)';
  ctx.fillText('NGÀY CẤP', 120, infoY);
  ctx.font      = '600 16px "Inter", sans-serif';
  ctx.fillStyle = 'rgba(220, 220, 220, 1)';
  ctx.fillText(dateStr, 120, infoY + 22);

  // Center: DEEPFENSE seal
  ctx.textAlign = 'center';
  // Outer circle
  ctx.beginPath();
  ctx.arc(CERT_W / 2, infoY + 6, 38, 0, Math.PI * 2);
  ctx.strokeStyle = 'rgba(0, 240, 255, 0.3)';
  ctx.lineWidth   = 1.5;
  ctx.stroke();
  // Inner circle
  ctx.beginPath();
  ctx.arc(CERT_W / 2, infoY + 6, 30, 0, Math.PI * 2);
  ctx.strokeStyle = 'rgba(0, 240, 255, 0.15)';
  ctx.lineWidth   = 1;
  ctx.stroke();
  // DF text in seal
  ctx.font      = 'bold 14px "JetBrains Mono", monospace';
  ctx.fillStyle = '#00F0FF';
  ctx.fillText('DF', CERT_W / 2, infoY + 13);

  // Curved text "DEEPFENSE ACADEMY" around seal
  drawArcText(ctx, 'DEEPFENSE ACADEMY', CERT_W / 2, infoY + 6, 44, -Math.PI * 0.75, 11);

  // Right: Cert ID
  ctx.textAlign = 'right';
  ctx.font      = '400 11px "Inter", sans-serif';
  ctx.fillStyle = 'rgba(100, 100, 100, 1)';
  ctx.fillText('MÃ CHỨNG CHỈ', CERT_W - 120, infoY);
  ctx.font      = '600 13px "JetBrains Mono", monospace';
  ctx.fillStyle = 'rgba(0, 240, 255, 0.8)';
  ctx.fillText(certId, CERT_W - 120, infoY + 22);

  // ── Signature line ────────────────────────────────────────────
  ctx.strokeStyle = 'rgba(100, 100, 100, 0.4)';
  ctx.lineWidth   = 1;
  ctx.beginPath(); ctx.moveTo(CERT_W / 2 - 60, infoY + 54); ctx.lineTo(CERT_W / 2 + 60, infoY + 54); ctx.stroke();
  ctx.font      = '400 10px "Inter", sans-serif';
  ctx.fillStyle = 'rgba(80, 80, 80, 1)';
  ctx.textAlign = 'center';
  ctx.fillText('DEEPFENSE ACADEMY', CERT_W / 2, infoY + 68);

  // ── Bottom glow line ──────────────────────────────────────────
  const bottomGlow = ctx.createLinearGradient(200, 0, CERT_W - 200, 0);
  bottomGlow.addColorStop(0,   'transparent');
  bottomGlow.addColorStop(0.3, 'rgba(0,240,255,0.5)');
  bottomGlow.addColorStop(0.7, 'rgba(0,240,255,0.5)');
  bottomGlow.addColorStop(1,   'transparent');
  ctx.strokeStyle = bottomGlow;
  ctx.lineWidth   = 2;
  ctx.beginPath(); ctx.moveTo(200, CERT_H - 76); ctx.lineTo(CERT_W - 200, CERT_H - 76); ctx.stroke();

  // ── Verification URL (đáy certificate) ───────────────────────
  ctx.textAlign = 'center';
  ctx.font      = '600 11px "Inter", sans-serif';
  ctx.fillStyle = 'rgba(60, 60, 60, 0.9)';
  ctx.fillText('Deepfense.online', CERT_W / 2, CERT_H - 58);
  ctx.font      = '400 10px "JetBrains Mono", monospace';
  ctx.fillStyle = 'rgba(80, 80, 80, 0.7)';
  ctx.fillText(`Deepfense.online Academic Board  ·  ${certId}`, CERT_W / 2, CERT_H - 44);
};

// ── Helper: rounded rect ──────────────────────────────────────
const roundRect = (ctx, x, y, w, h, r) => {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.lineTo(x + w - r, y);
  ctx.quadraticCurveTo(x + w, y, x + w, y + r);
  ctx.lineTo(x + w, y + h - r);
  ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
  ctx.lineTo(x + r, y + h);
  ctx.quadraticCurveTo(x, y + h, x, y + h - r);
  ctx.lineTo(x, y + r);
  ctx.quadraticCurveTo(x, y, x + r, y);
  ctx.closePath();
};

// ── Helper: text along arc ────────────────────────────────────
const drawArcText = (ctx, text, cx, cy, radius, startAngle, fontSize) => {
  ctx.save();
  ctx.font      = `600 ${fontSize}px "Inter", sans-serif`;
  ctx.fillStyle = 'rgba(0, 240, 255, 0.5)';
  ctx.textAlign = 'center';

  const angleStep = (Math.PI * 1.5) / (text.length - 1);
  for (let i = 0; i < text.length; i++) {
    const angle = startAngle + i * angleStep;
    ctx.save();
    ctx.translate(cx + radius * Math.cos(angle), cy + radius * Math.sin(angle));
    ctx.rotate(angle + Math.PI / 2);
    ctx.fillText(text[i], 0, 0);
    ctx.restore();
  }
  ctx.restore();
};

// ── Download PNG ──────────────────────────────────────────────
export const downloadCertificate = (canvas, certName) => {
  const link    = document.createElement('a');
  const safeName = (certName || 'certificate').replace(/[^a-zA-Z0-9_-]/g, '-').slice(0, 40);
  link.download = `DEEPFENSE-AWARE-${safeName}.png`;
  link.href     = canvas.toDataURL('image/png', 1.0);
  link.click();
};

// ── Print / Save as PDF ───────────────────────────────────────
export const printCertificate = (canvas) => {
  const dataUrl = canvas.toDataURL('image/png', 1.0);
  const win     = window.open('', '_blank');
  win.document.write(`
    <!DOCTYPE html>
    <html>
    <head>
      <title>DEEPFENSE AWARE — Certificate</title>
      <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { background: #000; display: flex; justify-content: center; align-items: center; min-height: 100vh; }
        img  { max-width: 100%; height: auto; display: block; }
        @media print {
          body { background: white; }
          img  { width: 100%; page-break-inside: avoid; }
        }
      </style>
    </head>
    <body>
      <img src="${dataUrl}" alt="DEEPFENSE AWARE Certificate" />
      <script>setTimeout(() => window.print(), 500);<\/script>
    </body>
    </html>`);
  win.document.close();
};

// ── Public: show certificate view ─────────────────────────────
/**
 * Hiển thị màn hình chứng chỉ trong app.
 * @param {object} progress  - dữ liệu từ academy_learners/{uid}
 * @param {string} container - id của element để render vào (mặc định 'cert-view-inner')
 */
export const showCertView = async (progress, containerId = 'cert-view-inner') => {
  const container = document.getElementById(containerId);
  if (!container) return;

  const user = auth.currentUser;
  if (!user) return;

  const eligible = checkCertEligibility(progress);

  if (!eligible) {
    container.innerHTML = renderNotEligible(progress);
    return;
  }

  // Đã có cert chưa?
  const existingCertId   = progress?.certificateId;
  const existingCertName = progress?.certificateName || user.displayName || '';
  const issuedAt         = progress?.certificateIssuedAt?.toDate?.() ?? null;

  if (existingCertId) {
    // Cert đã có → render luôn
    container.innerHTML = renderCertReady(existingCertName);
    await renderCanvas(existingCertId, existingCertName, issuedAt || new Date());
  } else {
    // Chưa có → form nhập tên + nút cấp
    container.innerHTML = renderIssueForm(user.displayName || '');
    setupIssueForm(container, progress);
  }
};

// ── Render: chưa đủ điều kiện ─────────────────────────────────
const renderNotEligible = (progress) => {
  const mods  = Array.isArray(progress?.completedModules)  ? progress.completedModules  : [];
  const mts   = Array.isArray(progress?.completedMidterms) ? progress.completedMidterms : [];
  const modsDone     = REQUIRED_MODULES.filter((id) => mods.includes(id)).length;
  const mtDone       = REQUIRED_MIDTERMS.filter((id) => mts.includes(id)).length;
  const hasFinalExam = progress?.completedFinalExam === true;

  return `
    <div style="max-width:520px;margin:0 auto;text-align:center;padding:40px 24px">
      <div style="font-size:3rem;margin-bottom:16px">🏆</div>
      <h2 style="font-size:1.3rem;font-weight:700;color:var(--clr-text);margin-bottom:8px">
        Chứng chỉ DEEPFENSE AWARE
      </h2>
      <p style="color:var(--clr-text-3);font-size:.88rem;margin-bottom:28px">
        Hoàn thành toàn bộ khóa học để nhận chứng chỉ.
      </p>

      <div style="background:var(--clr-surface);border:1px solid var(--clr-border);
                  border-radius:12px;padding:20px;text-align:left;margin-bottom:24px">
        <div style="font-size:.72rem;font-weight:700;text-transform:uppercase;
                    letter-spacing:.08em;color:var(--clr-text-3);margin-bottom:12px">
          Tiến độ
        </div>

        <div style="display:flex;justify-content:space-between;align-items:center;
                    margin-bottom:10px;font-size:.88rem">
          <span style="color:var(--clr-text-2)">Modules hoàn thành</span>
          <span style="font-family:'JetBrains Mono',monospace;font-weight:700;
                       color:${modsDone === 6 ? 'var(--clr-success)' : 'var(--clr-text)'}">
            ${modsDone} / 6
          </span>
        </div>
        <div style="height:5px;background:var(--clr-border-2);border-radius:99px;
                    margin-bottom:14px;overflow:hidden">
          <div style="width:${Math.round((modsDone/6)*100)}%;height:100%;
                      background:${modsDone === 6 ? 'var(--clr-success)' : 'var(--clr-primary)'};
                      border-radius:99px"></div>
        </div>

        <div style="display:flex;justify-content:space-between;align-items:center;
                    margin-bottom:10px;font-size:.88rem">
          <span style="color:var(--clr-text-2)">Midterm đã qua</span>
          <span style="font-family:'JetBrains Mono',monospace;font-weight:700;
                       color:${mtDone === 2 ? 'var(--clr-success)' : 'var(--clr-text)'}">
            ${mtDone} / 2
          </span>
        </div>
        <div style="height:5px;background:var(--clr-border-2);border-radius:99px;
                    margin-bottom:14px;overflow:hidden">
          <div style="width:${Math.round((mtDone/2)*100)}%;height:100%;
                      background:${mtDone === 2 ? 'var(--clr-success)' : 'var(--clr-warning)'};
                      border-radius:99px"></div>
        </div>

        <div style="display:flex;justify-content:space-between;align-items:center;
                    font-size:.88rem">
          <span style="color:var(--clr-text-2)">Final Exam</span>
          <span style="font-family:'JetBrains Mono',monospace;font-weight:700;
                       color:${hasFinalExam ? 'var(--clr-success)' : 'var(--clr-text)'}">
            ${hasFinalExam ? '✓ Đạt' : '✗ Chưa thi'}
          </span>
        </div>
      </div>

      <button class="btn btn--ghost" onclick="window.navigateToDashboard()">← Về Dashboard</button>
      ${!hasFinalExam && mtDone === 2 && modsDone === 6 ? `
        <div style="margin-top:10px">
          <button class="btn btn--primary" onclick="window.navigateToFinalExam()">
            🏁 Thi Final Exam →
          </button>
        </div>` : ''}
    </div>`;
};

// ── Render: form nhập tên ─────────────────────────────────────
const renderIssueForm = (defaultName) => `
  <div style="max-width:520px;margin:0 auto;text-align:center;padding:40px 24px">
    <div style="font-size:3rem;margin-bottom:16px">🎓</div>
    <h2 style="font-size:1.3rem;font-weight:700;color:var(--clr-text);margin-bottom:8px">
      Nhận chứng chỉ DEEPFENSE AWARE
    </h2>
    <p style="color:var(--clr-text-3);font-size:.88rem;margin-bottom:28px">
      Xuất sắc! Bạn đã hoàn thành DEEPFENSE BASIC.<br>
      Nhập tên để in lên chứng chỉ.
    </p>

    <div style="background:var(--clr-surface);border:1px solid var(--clr-border);
                border-radius:12px;padding:24px;margin-bottom:20px;text-align:left">
      <label style="display:block;font-size:.8rem;color:var(--clr-text-2);margin-bottom:8px;font-weight:600">
        Tên hiển thị trên chứng chỉ
      </label>
      <input id="cert-name-input"
             type="text"
             value="${defaultName}"
             maxlength="60"
             placeholder="Nhập tên của bạn"
             style="width:100%;background:var(--clr-bg-3);border:1px solid var(--clr-border-2);
                    color:var(--clr-text);padding:11px 14px;border-radius:8px;font-size:.95rem;
                    font-family:inherit;outline:none;transition:border-color .18s"
             onfocus="this.style.borderColor='var(--clr-primary)'"
             onblur="this.style.borderColor='var(--clr-border-2)'" />
      <p style="font-size:.75rem;color:var(--clr-text-3);margin-top:8px">
        Tên này sẽ được lưu vĩnh viễn trên chứng chỉ.
      </p>
    </div>

    <p id="cert-issue-error" style="font-size:.84rem;color:var(--clr-danger);
       background:rgba(239,68,68,.08);border:1px solid rgba(239,68,68,.2);
       border-radius:8px;padding:10px 14px;margin-bottom:14px;display:none"></p>

    <button id="btn-issue-cert" class="btn btn--primary" style="width:100%;padding:14px;font-size:1rem">
      Cấp chứng chỉ →
    </button>
    <div style="margin-top:12px">
      <button class="btn btn--ghost" style="font-size:.82rem"
              onclick="window.navigateToDashboard()">← Về Dashboard</button>
    </div>
  </div>`;

// ── Render: cert đã có, hiện canvas ───────────────────────────
const renderCertReady = (certName) => `
  <div style="max-width:900px;margin:0 auto;padding:24px">
    <div style="display:flex;align-items:center;justify-content:space-between;
                flex-wrap:wrap;gap:12px;margin-bottom:20px">
      <div>
        <h2 style="font-size:1.2rem;font-weight:700;color:var(--clr-text)">
          🎓 Chứng chỉ DEEPFENSE AWARE
        </h2>
        <p style="font-size:.82rem;color:var(--clr-text-3);margin-top:4px">
          ${certName}
        </p>
      </div>
      <div style="display:flex;gap:8px;flex-wrap:wrap">
        <button id="btn-cert-download" class="btn btn--primary" style="font-size:.85rem">
          ↓ Tải PNG
        </button>
        <button id="btn-cert-print" class="btn btn--ghost" style="font-size:.85rem">
          🖨 In / PDF
        </button>
        <button class="btn btn--ghost" style="font-size:.85rem"
                onclick="window.navigateToDashboard()">← Dashboard</button>
      </div>
    </div>

    <div style="background:var(--clr-surface);border:1px solid var(--clr-border);
                border-radius:12px;overflow:hidden;line-height:0">
      <canvas id="cert-canvas"
              style="width:100%;height:auto;display:block;max-width:1200px"></canvas>
    </div>

    <p style="font-size:.75rem;color:var(--clr-text-3);text-align:center;margin-top:12px">
      Mã chứng chỉ có thể được xác minh tại Deepfense.online Academic Board
    </p>
  </div>`;

// ── Setup form events ─────────────────────────────────────────
const setupIssueForm = (container, progress) => {
  const btn      = container.querySelector('#btn-issue-cert');
  const input    = container.querySelector('#cert-name-input');
  const errEl    = container.querySelector('#cert-issue-error');
  if (!btn || !input) return;

  btn.addEventListener('click', async () => {
    const name = input.value.trim();
    if (!name) { showError(errEl, 'Vui lòng nhập tên.'); return; }

    btn.disabled    = true;
    btn.textContent = 'Đang cấp…';
    errEl.style.display = 'none';

    const result = await issueCertificate(name);
    if (!result.ok) {
      showError(errEl, result.message);
      btn.disabled    = false;
      btn.textContent = 'Cấp chứng chỉ →';
      return;
    }

    // Thành công → re-render với cert
    const certContainer = document.getElementById('cert-view-inner');
    if (certContainer) {
      certContainer.innerHTML = renderCertReady(result.certName);
      await renderCanvas(result.certId, result.certName, result.issuedAt);
    }

    if (result.dpfEarned > 0) {
      showToastGlobal(`🎓 Chứng chỉ đã cấp! +${result.dpfEarned} DPF`, 'success');
    }
  });
};

const showError = (el, msg) => {
  if (!el) return;
  el.textContent     = msg;
  el.style.display   = 'block';
};

// ── Render canvas + attach download/print buttons ─────────────
const renderCanvas = async (certId, certName, issuedAt) => {
  const canvas = document.getElementById('cert-canvas');
  if (!canvas) return;

  await drawCertificate(canvas, { certId, certName, issuedAt });

  document.getElementById('btn-cert-download')?.addEventListener('click', () =>
    downloadCertificate(canvas, certName));

  document.getElementById('btn-cert-print')?.addEventListener('click', () =>
    printCertificate(canvas));
};

// ── Global toast helper (dùng từ module ngoài) ────────────────
const showToastGlobal = (msg, type = 'info') => {
  const container = document.getElementById('toast-container');
  if (!container) return;
  const el = document.createElement('div');
  el.className = `toast toast--${type}`;
  el.textContent = msg;
  container.appendChild(el);
  setTimeout(() => el.remove(), 4000);
};
