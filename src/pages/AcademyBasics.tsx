import React from 'react';
import type { User } from 'firebase/auth';
import { useSearchParams, useNavigate } from 'react-router-dom';
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
    titleVi: 'Module 1 - Deepfake là gì?',
    titleEn: 'Module 1 - What is a deepfake?',
    metaVi: 'Khởi động, kiến thức nền và checkpoint ngay trong bài',
    metaEn: 'Intro, foundation concepts, and inline checkpoints',
  },
  {
    code: '02',
    titleVi: 'Nhận diện dấu hiệu đáng ngờ',
    titleEn: 'Recognition signals',
    metaVi: 'Hình ảnh, video, giọng nói và nguồn tin',
    metaEn: 'Image, video, voice, and source checks',
  },
  {
    code: '03',
    titleVi: 'Phòng vệ và ứng phó',
    titleEn: 'Prevention and response',
    metaVi: 'Thói quen an toàn, báo cáo, đánh giá và bài thi cuối khóa',
    metaEn: 'Safer habits, reporting, evaluation, and final exam',
  },
];

const AcademyBasics: React.FC<AcademyBasicsProps> = ({ lang, user, authBusy, onGoogleAuth }) => {
  const isVi = lang === 'vi';
  const isSignedIn = !!user;
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const authRequired = searchParams.get('auth') === 'required';
  const pageRef = useScrollReveal({ selector: '[data-reveal]', preset: 'fade-up', stagger: 0.08 });

  const openCourseIndex = () => {
    navigate('/academy?course=basics');
  };

  return (
    <div ref={pageRef as React.RefObject<HTMLDivElement>} className="animate-in fade-in duration-500">
      <section data-reveal className="relative overflow-hidden rounded-2xl border border-blue-500/20 bg-[#07111f]/90 p-6 md:p-10 mb-8 shadow-[0_24px_90px_rgba(0,0,0,0.35)]">
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-blue-400/60 to-transparent" />
        <div className="relative z-10 grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-center">
          <div className="lg:col-span-8">
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-blue-500/20 bg-blue-500/10 px-4 py-1.5 text-[10px] font-mono tracking-widest text-blue-300">
              <GraduationCap size={12} /> DEEPFENSE BASIC
            </div>
            <h1 className="text-4xl md:text-6xl font-black uppercase leading-tight text-white" style={{ fontFamily: "'Outfit', 'Inter', Arial, sans-serif" }}>
              DEEPFENSE BASIC
            </h1>
            <p className="mt-5 max-w-3xl text-base md:text-lg leading-relaxed text-gray-400">
              {isVi
                ? 'Khóa nền tảng giúp bạn hiểu deepfake, nhận ra tín hiệu bất thường và biết cách kiểm chứng trước khi tin, chia sẻ hoặc chuyển tiền. Đăng nhập Google để lưu tiến độ, kết quả quiz và điều kiện mở certificate.'
                : 'A foundation course that helps you understand deepfakes, notice suspicious signals, and verify before trusting, sharing, or sending money. Sign in with Google so progress, quiz results, and certificate eligibility are saved.'}
            </p>
          </div>

          <div className="lg:col-span-4 rounded-2xl border border-amber-400/20 bg-amber-400/[0.06] p-5">
            <div className="mb-5 flex items-center gap-3">
              <Award size={28} className="text-amber-300" />
              <div>
                <div className="text-[10px] font-mono uppercase tracking-[0.22em] text-amber-300">
                  {isVi ? 'Sau khi hoàn thành' : 'After completion'}
                </div>
                <div className="text-white font-black uppercase">Certificate + DPF</div>
              </div>
            </div>
            <div className="rounded-xl border border-white/10 bg-black/20 p-4 text-sm leading-relaxed text-gray-400">
              {isVi
                ? 'Certificate chỉ mở khi bạn học xong, gửi đánh giá khóa học và đạt bài thi cuối khóa.'
                : 'Certificate unlocks only after lessons, course evaluation, and Final Exam are completed.'}
            </div>
          </div>
        </div>
      </section>

      <section className="grid grid-cols-1 gap-6 mb-8 xl:grid-cols-12">
        <div data-reveal className="relative overflow-hidden rounded-2xl border border-white/10 bg-[#07111f]/90 p-6 md:p-8 xl:col-span-7">
          <div className="relative z-10 max-w-2xl">
            <div className={`mb-5 inline-flex items-center gap-2 rounded-full border px-4 py-1.5 text-[10px] font-mono tracking-widest ${isSignedIn ? 'border-emerald-400/25 bg-emerald-400/10 text-emerald-300' : 'border-amber-400/25 bg-amber-400/10 text-amber-300'}`}>
              {isSignedIn ? <CheckCircle2 size={12} /> : <LockKeyhole size={12} />}
              {isSignedIn ? (isVi ? 'ĐÃ ĐĂNG NHẬP GOOGLE' : 'GOOGLE CONNECTED') : (isVi ? 'CẦN ĐĂNG NHẬP GOOGLE' : 'GOOGLE SIGN-IN REQUIRED')}
            </div>
            <h2 className="text-2xl md:text-4xl font-black text-white uppercase leading-tight" style={{ fontFamily: "'Outfit', 'Inter', Arial, sans-serif" }}>
              {isVi ? 'Sẵn sàng vào bài học đầu tiên.' : 'Ready for your first lesson.'}
            </h2>
            <p className="mt-4 text-gray-400 text-sm md:text-base leading-relaxed">
              {isVi
                ? 'Khi đã đăng nhập, bạn sẽ được chuyển sang hệ thống học riêng. Tiến độ đọc, checkpoint và bài thi được lưu lại để bạn có thể tiếp tục đúng vị trí.'
                : 'After sign-in, you will enter the course reader. Reading progress, checkpoints, and exams are saved so you can continue from the right place.'}
            </p>

            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              {!isSignedIn ? (
                <div className="w-full max-w-xl">
                  <div className={`mb-3 rounded-xl border p-4 text-sm leading-relaxed ${authRequired ? 'border-amber-400/25 bg-amber-400/10 text-amber-100' : 'border-blue-400/20 bg-blue-500/10 text-blue-100'}`}>
                    {isVi
                      ? 'Bạn cần đăng nhập bằng Google để vào hệ thống học, lưu tiến độ, làm quiz và mở certificate sau khi hoàn thành.'
                      : 'Please sign in with Google to enter the course system, save progress, take quizzes, and unlock the certificate after completion.'}
                  </div>
                  <GlowButton color="primary" size="lg" icon={<LogIn size={16} />} onClick={onGoogleAuth}>
                    {authBusy ? (isVi ? 'ĐANG MỞ GOOGLE...' : 'OPENING GOOGLE...') : (isVi ? 'ĐĂNG NHẬP GOOGLE ĐỂ BẮT ĐẦU' : 'SIGN IN WITH GOOGLE')}
                  </GlowButton>
                </div>
              ) : (
                <GlowButton color="primary" size="lg" icon={<PlayCircle size={16} />} onClick={openCourseIndex}>
                  {isVi ? 'VÀO HỆ THỐNG HỌC' : 'ENTER COURSE'}
                </GlowButton>
              )}
            </div>

            {isSignedIn && (
              <div className="mt-4 rounded-xl border border-white/10 bg-black/25 p-4 text-sm text-gray-400">
                {isVi ? 'Đang kết nối bằng: ' : 'Connected as: '}
                <span className="font-semibold text-white">{user.displayName || user.email || 'Google learner'}</span>
              </div>
            )}
          </div>
        </div>

        <aside data-reveal className="xl:col-span-5">
          <div className="rounded-2xl border border-white/10 bg-white/[0.025] p-6">
            <div className="mb-5 flex items-center gap-2">
              <ShieldCheck size={15} className="text-primary" />
              <h2 className="text-white font-black uppercase tracking-widest text-sm">
                {isVi ? 'Lộ trình khóa học' : 'Course path'}
              </h2>
            </div>
            <div className="space-y-3">
              {roadmap.map((module) => (
                <div key={module.code} className="rounded-xl border border-blue-400/20 bg-blue-500/10 p-4">
                  <div className="flex items-start gap-3">
                    <div className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0 font-mono text-xs font-black bg-blue-500/20 text-blue-300">
                      {module.code}
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
        </aside>
      </section>
    </div>
  );
};

export default AcademyBasics;
