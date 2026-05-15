import React, { useMemo, useState } from 'react';
import { Award, CheckCircle2, Copy, ExternalLink, ShieldCheck } from 'lucide-react';
import { Language } from '@/types';

type CertificateVerifyProps = {
  lang: Language;
};

const readJson = <T,>(key: string, fallback: T): T => {
  try {
    return JSON.parse(window.localStorage.getItem(key) || 'null') || fallback;
  } catch {
    return fallback;
  }
};

const CertificateVerify: React.FC<CertificateVerifyProps> = ({ lang }) => {
  const isVi = lang === 'vi';
  const params = new URLSearchParams(window.location.search);
  const id = (params.get('id') || '').trim();
  const [manualId, setManualId] = useState(id);
  const activeId = manualId.trim();

  const finalExam = useMemo(() => readJson<{
    examId?: string;
    passed?: boolean;
    passedAt?: string;
  }>('deepfense-basics-final-exam', {}), []);

  const certificateName = window.localStorage.getItem('deepfense-basics-certificate-name') || '';
  const auth = useMemo(() => readJson<{ displayName?: string; email?: string }>('deepfenseAcademyAuth', {}), []);
  const matchesLocalRecord = !!activeId && finalExam.examId === activeId && finalExam.passed;
  const hasValidFormat = /^(DPF|DEEPFENSE)-BASIC-[A-Z0-9-]{8,32}$/.test(activeId);
  const verified = matchesLocalRecord || hasValidFormat;

  const issuedDate = finalExam.passedAt
    ? new Date(finalExam.passedAt).toLocaleDateString(isVi ? 'vi-VN' : 'en-GB', { day: '2-digit', month: 'short', year: 'numeric' })
    : isVi ? 'Được xác minh qua mã chứng chỉ' : 'Verified by certificate ID';

  const copyLink = async () => {
    const url = `${window.location.origin}/academy/verify?id=${encodeURIComponent(activeId)}`;
    await navigator.clipboard?.writeText(url);
  };

  return (
    <section className="max-w-4xl mx-auto">
      <div className="relative overflow-hidden rounded-2xl border border-emerald-400/25 bg-[#07111f]/95 p-6 md:p-10 shadow-[0_24px_90px_rgba(0,0,0,0.42)] backdrop-blur-xl">
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-emerald-300/60 to-transparent" />
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-emerald-400/25 bg-emerald-400/10 px-3 py-1 text-[10px] font-black uppercase tracking-[0.22em] text-emerald-300 mb-5">
              <ShieldCheck size={13} /> DEEPFENSE VERIFY
            </div>
            <h1 className="text-3xl md:text-5xl font-black uppercase leading-tight text-white" style={{ fontFamily: "'Outfit', 'Inter', Arial, sans-serif" }}>
              {verified ? (isVi ? 'Chứng chỉ hợp lệ' : 'Certificate Verified') : (isVi ? 'Cần mã chứng chỉ' : 'Certificate ID Required')}
            </h1>
            <p className="mt-4 max-w-2xl text-sm md:text-base leading-relaxed text-gray-400">
              {isVi
                ? 'Trang này dùng để kiểm tra chứng chỉ DEEPFENSE BASIC bằng mã định danh duy nhất in trên certificate.'
                : 'Use this page to verify a DEEPFENSE BASIC certificate using the unique ID printed on the certificate.'}
            </p>
            <form
              className="mt-6 flex flex-col gap-3 sm:flex-row"
              onSubmit={(event) => {
                event.preventDefault();
                const next = manualId.trim();
                if (next) window.history.replaceState(null, '', `/academy/verify?id=${encodeURIComponent(next)}`);
              }}
            >
              <input
                value={manualId}
                onChange={(event) => setManualId(event.target.value.toUpperCase())}
                placeholder={isVi ? 'Nhập Certificate ID' : 'Enter Certificate ID'}
                className="min-h-12 flex-1 rounded-lg border border-white/12 bg-black/35 px-4 text-sm font-bold text-white outline-none placeholder:text-gray-600"
              />
              <button className="rounded-lg bg-emerald-400 px-5 py-3 text-xs font-black uppercase tracking-widest text-black">
                Verify ID
              </button>
            </form>
          </div>

          <div className={`rounded-2xl border p-5 min-w-[220px] ${verified ? 'border-emerald-400/25 bg-emerald-400/10' : 'border-amber-400/25 bg-amber-400/10'}`}>
            <div className={`${verified ? 'text-emerald-300' : 'text-amber-300'} mb-3`}>
              {verified ? <CheckCircle2 size={34} /> : <Award size={34} />}
            </div>
            <div className="text-[10px] font-mono uppercase tracking-[0.2em] text-gray-500 mb-1">
              {isVi ? 'Trạng thái' : 'Status'}
            </div>
            <div className="text-white text-xl font-black uppercase">
              {verified ? 'VERIFIED' : 'PENDING'}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
          <div className="rounded-xl border border-white/12 bg-black/35 p-4">
            <div className="text-[10px] font-mono uppercase tracking-[0.2em] text-gray-500 mb-2">Certificate ID</div>
            <div className="text-white font-black break-all">{activeId || 'N/A'}</div>
          </div>
          <div className="rounded-xl border border-white/12 bg-black/35 p-4">
            <div className="text-[10px] font-mono uppercase tracking-[0.2em] text-gray-500 mb-2">{isVi ? 'Khóa học' : 'Course'}</div>
            <div className="text-white font-black">DEEPFENSE BASIC</div>
          </div>
          <div className="rounded-xl border border-white/12 bg-black/35 p-4">
            <div className="text-[10px] font-mono uppercase tracking-[0.2em] text-gray-500 mb-2">{isVi ? 'Tên hiển thị' : 'Display name'}</div>
            <div className="text-white font-black">{certificateName || auth.displayName || (isVi ? 'Không công khai' : 'Not public')}</div>
          </div>
          <div className="rounded-xl border border-white/12 bg-black/35 p-4">
            <div className="text-[10px] font-mono uppercase tracking-[0.2em] text-gray-500 mb-2">{isVi ? 'Ngày cấp' : 'Issued'}</div>
            <div className="text-white font-black">{issuedDate}</div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 mt-7">
          <button onClick={copyLink} className="inline-flex items-center justify-center gap-2 rounded-lg border border-white/12 bg-white/[0.08] px-4 py-3 text-xs font-black uppercase tracking-widest text-white">
            <Copy size={15} /> {isVi ? 'Sao chép link' : 'Copy link'}
          </button>
          <a href="/academy/certificate-template/certificate-template.html" className="inline-flex items-center justify-center gap-2 rounded-lg border border-emerald-400/20 bg-emerald-400/10 px-4 py-3 text-xs font-black uppercase tracking-widest text-emerald-200">
            <ExternalLink size={15} /> Certificate
          </a>
        </div>
      </div>
    </section>
  );
};

export default CertificateVerify;
