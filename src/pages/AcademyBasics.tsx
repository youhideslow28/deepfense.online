import React from 'react';
import type { User } from 'firebase/auth';
import { Award, CheckCircle2, Clock3, GraduationCap, LockKeyhole, LogIn, PlayCircle, ShieldCheck } from 'lucide-react';
import GlowButton from '@/components/ui/GlowButton';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import { Language } from '@/types';

interface AcademyBasicsProps {
  lang: Language;
  user: User | null;
  authBusy: boolean;
  onGoogleAuth: () => void;
}

const academyIndexUrl = '/academy/deepfense-basics-preview/index.html';

const roadmap = [
  {
    code: '01',
    titleVi: 'Module 1 - Deepfake la gi?',
    titleEn: 'Module 1 - What is a deepfake?',
    metaVi: 'Pre-assessment, bai hoc ngan, checkpoint inline',
    metaEn: 'Pre-assessment, short lessons, inline checkpoints',
    active: true,
  },
  {
    code: '02',
    titleVi: 'Nhan dien dau hieu',
    titleEn: 'Recognition signals',
    metaVi: 'Hinh anh, video, giong noi, nguon tin',
    metaEn: 'Image, video, voice, source checks',
    active: true,
  },
  {
    code: '03',
    titleVi: 'Phong ve va ung pho',
    titleEn: 'Prevention and response',
    metaVi: 'Thoi quen an toan, bao cao, final exam',
    metaEn: 'Safer habits, reporting, final exam',
    active: true,
  },
];

const AcademyBasics: React.FC<AcademyBasicsProps> = ({ lang, user, authBusy, onGoogleAuth }) => {
  const isVi = lang === 'vi';
  const isSignedIn = !!user;
  const pageRef = useScrollReveal({ selector: '[data-reveal]', preset: 'fade-up', stagger: 0.08 });

  const openCourseIndex = () => {
    window.open(academyIndexUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <div ref={pageRef as React.RefObject<HTMLDivElement>} className="animate-in fade-in duration-500">
      <section data-reveal className="relative overflow-hidden rounded-2xl border border-blue-500/20 bg-[#07111f]/90 p-6 md:p-10 mb-8 shadow-[0_24px_90px_rgba(0,0,0,0.35)]">
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-blue-400/60 to-transparent" />
        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-8">
            <div className="inline-flex items-center gap-2 rounded-full border border-blue-500/20 bg-blue-500/10 px-4 py-1.5 text-[10px] font-mono tracking-widest text-blue-300 mb-5">
              <GraduationCap size={12} /> DEEPFENSE BASIC
            </div>
            <h1 className="text-4xl md:text-6xl font-black uppercase leading-tight text-white" style={{ fontFamily: "'Outfit', 'Inter', Arial, sans-serif" }}>
              DEEPFENSE BASIC
            </h1>
            <p className="mt-5 max-w-3xl text-base md:text-lg leading-relaxed text-gray-400">
              {isVi
                ? 'Khoa hoc nen tang giup ban nhan dien deepfake bang cach cham lai, doc boi canh, kiem tra nguon va phan ung dung luc. Dang nhap Google de luu tien do, ket qua quiz va dieu kien cap certificate.'
                : 'A foundation course that helps you spot deepfakes by slowing down, reading context, checking sources, and responding safely. Sign in with Google so progress, quiz results, and certificate eligibility are saved.'}
            </p>
          </div>

          <div className="lg:col-span-4 rounded-2xl border border-amber-400/20 bg-amber-400/[0.06] p-5">
            <div className="flex items-center gap-3 mb-5">
              <Award size={28} className="text-amber-300" />
              <div>
                <div className="text-[10px] font-mono uppercase tracking-[0.22em] text-amber-300">
                  {isVi ? 'Sau khi hoan thanh' : 'After completion'}
                </div>
                <div className="text-white font-black uppercase">Certificate + DPF</div>
              </div>
            </div>
            <div className="rounded-xl border border-white/10 bg-black/20 p-4 text-sm leading-relaxed text-gray-400">
              {isVi
                ? 'Certificate chi mo khi ban hoc xong, gui danh gia khoa hoc va dat Final Exam.'
                : 'Certificate unlocks only after lessons, course evaluation, and Final Exam are completed.'}
            </div>
          </div>
        </div>
      </section>

      <section className="grid grid-cols-1 xl:grid-cols-12 gap-6 mb-8">
        <div data-reveal className="xl:col-span-7 rounded-2xl border border-white/10 bg-[#07111f]/90 p-6 md:p-8 overflow-hidden relative">
          <div className="relative z-10 max-w-2xl">
            <div className={`inline-flex items-center gap-2 rounded-full border px-4 py-1.5 text-[10px] font-mono tracking-widest mb-5 ${isSignedIn ? 'border-emerald-400/25 bg-emerald-400/10 text-emerald-300' : 'border-amber-400/25 bg-amber-400/10 text-amber-300'}`}>
              {isSignedIn ? <CheckCircle2 size={12} /> : <LockKeyhole size={12} />}
              {isSignedIn ? (isVi ? 'DA DANG NHAP GOOGLE' : 'GOOGLE CONNECTED') : (isVi ? 'CAN DANG NHAP GOOGLE' : 'GOOGLE SIGN-IN REQUIRED')}
            </div>
            <h2 className="text-2xl md:text-4xl font-black text-white uppercase leading-tight" style={{ fontFamily: "'Outfit', 'Inter', Arial, sans-serif" }}>
              {isVi ? 'San sang vao bai hoc dau tien.' : 'Ready for your first lesson.'}
            </h2>
            <p className="text-gray-400 text-sm md:text-base leading-relaxed mt-4">
              {isVi
                ? 'Sau khi dang nhap, ban se duoc chuyen sang khong gian hoc rieng. Tung bai, checkpoint va bai thi deu duoc luu lai de ban hoc tiep tu dung vi tri.'
                : 'After sign-in, you will enter the course reader. Lessons, checkpoints, and exams are saved so you can continue from the right place.'}
            </p>

            <div className="mt-7 flex flex-col sm:flex-row gap-3">
              {!isSignedIn ? (
                <GlowButton color="primary" size="lg" icon={<LogIn size={16} />} onClick={onGoogleAuth}>
                  {authBusy ? (isVi ? 'DANG MO GOOGLE...' : 'OPENING GOOGLE...') : (isVi ? 'DANG NHAP GOOGLE DE BAT DAU' : 'SIGN IN WITH GOOGLE')}
                </GlowButton>
              ) : (
                <GlowButton color="primary" size="lg" icon={<PlayCircle size={16} />} onClick={openCourseIndex}>
                  {isVi ? 'VAO HE THONG HOC' : 'ENTER COURSE'}
                </GlowButton>
              )}
            </div>

            {isSignedIn && (
              <div className="mt-4 rounded-xl border border-white/10 bg-black/25 p-4 text-sm text-gray-400">
                {isVi ? 'Dang ket noi bang: ' : 'Connected as: '}
                <span className="font-semibold text-white">{user.displayName || user.email || 'Google learner'}</span>
              </div>
            )}
          </div>
        </div>

        <aside data-reveal className="xl:col-span-5 flex flex-col gap-5">
          <div className="rounded-2xl border border-white/10 bg-white/[0.025] p-6">
            <div className="flex items-center gap-2 mb-5">
              <ShieldCheck size={15} className="text-primary" />
              <h2 className="text-white font-black uppercase tracking-widest text-sm">
                {isVi ? 'Ban se hoc gi?' : 'What will you learn?'}
              </h2>
            </div>
            <div className="space-y-3">
              {roadmap.map((module) => (
                <div key={module.code} className="rounded-xl border border-blue-400/20 bg-blue-500/10 p-4">
                  <div className="flex items-start gap-3">
                    <div className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0 font-mono text-xs font-black bg-blue-500/20 text-blue-300">
                      <CheckCircle2 size={17} />
                    </div>
                    <div>
                      <h3 className="text-white font-black text-sm uppercase leading-snug">{isVi ? module.titleVi : module.titleEn}</h3>
                      <div className="mt-3 flex items-center gap-2 text-[10px] font-mono text-blue-300/70">
                        <Clock3 size={12} /> {isVi ? module.metaVi : module.metaEn}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-2xl border border-blue-400/20 bg-blue-500/[0.06] p-6">
            <div className="flex items-center gap-2 text-white font-black uppercase tracking-widest text-sm mb-4">
              <ShieldCheck size={16} className="text-blue-300" />
              {isVi ? 'Ban se nhan duoc gi?' : 'What you get'}
            </div>
            <ul className="space-y-3 text-sm text-gray-400">
              {(isVi
                ? ['Bai hoc ngan, de theo doi.', 'Quiz xuat hien dung luc de tu kiem tra.', 'Certificate mo khi hoan thanh du dieu kien.']
                : ['Short lessons that are easy to follow.', 'Quizzes appear at the right moment.', 'Certificate unlocks after requirements are met.']
              ).map((item) => (
                <li key={item} className="flex gap-2">
                  <CheckCircle2 size={15} className="mt-0.5 text-blue-300 shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </aside>
      </section>
    </div>
  );
};

export default AcademyBasics;
