/**
 * DEEPFENSE.ONLINE - DEEPFENSE BASICS Connector
 * The main site only handles identity and routing. Learning runs in the
 * standalone course index under /public/academy.
 */

import React from 'react';
import type { User } from 'firebase/auth';
import { Language } from '@/types';
import {
  Award, CheckCircle2, Clock3, GraduationCap, LockKeyhole, LogIn,
  PlayCircle, ShieldCheck, Target,
} from 'lucide-react';
import GlowButton from '@/components/ui/GlowButton';
import { useScrollReveal } from '@/hooks/useScrollReveal';

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
    metaVi: 'Pre-assessment + 5 bài học + quiz 10 câu',
    metaEn: 'Pre-assessment + 5 lessons + 10-question quiz',
    active: true,
  },
  {
    code: '02',
    titleVi: 'Recognition Lab',
    titleEn: 'Recognition Lab',
    metaVi: 'Sắp cập nhật',
    metaEn: 'Coming soon',
    active: false,
  },
  {
    code: '03',
    titleVi: 'Prevention & Response',
    titleEn: 'Prevention & Response',
    metaVi: 'Sắp cập nhật',
    metaEn: 'Coming soon',
    active: false,
  },
];

const AcademyBasics: React.FC<AcademyBasicsProps> = ({ lang, user, authBusy, onGoogleAuth }) => {
  const isVi = lang === 'vi';
  const isSignedIn = !!user;
  const pageRef = useScrollReveal({ selector: '[data-reveal]', preset: 'fade-up', stagger: 0.08 });

  const openCourseIndex = () => {
    window.location.href = academyIndexUrl;
  };

  return (
    <div ref={pageRef as React.RefObject<HTMLDivElement>} className="animate-in fade-in duration-500">
      <section data-reveal className="relative overflow-hidden rounded-2xl border border-blue-500/20 bg-[#07111f]/90 p-6 md:p-10 mb-8 shadow-[0_24px_90px_rgba(0,0,0,0.35)]">
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-blue-400/60 to-transparent" />
        <div className="absolute right-0 top-0 h-full w-2/3 bg-[radial-gradient(circle_at_top_right,rgba(29,111,232,0.16),transparent_45%)] pointer-events-none" />
        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-8">
            <div className="inline-flex items-center gap-2 rounded-full border border-blue-500/20 bg-blue-500/10 px-4 py-1.5 text-[10px] font-mono tracking-widest text-blue-300 mb-5">
              <GraduationCap size={12} /> DEEPFENSE BASICS
            </div>
            <h1 className="text-4xl md:text-6xl font-black uppercase leading-tight text-white" style={{ fontFamily: "'Outfit', 'Inter', Arial, 'Helvetica Neue', sans-serif" }}>
              {isVi ? 'Cổng kết nối khóa học' : 'Course access gateway'}
            </h1>
            <p className="mt-5 max-w-3xl text-base md:text-lg leading-relaxed text-gray-400">
              {isVi
                ? 'Trang này không phải nơi học trực tiếp. DEEPFENSE dùng trang này để xác thực Google, ghi nhận học viên cho admin và sau đó chuyển bạn sang hệ thống học riêng của khóa DEEPFENSE BASICS.'
                : 'This page is not where lessons run. DEEPFENSE uses it to verify Google identity, register the learner for admin tracking, then send you to the standalone DEEPFENSE BASICS learning system.'}
            </p>
          </div>

          <div className="lg:col-span-4 rounded-2xl border border-amber-400/20 bg-amber-400/[0.06] p-5">
            <div className="flex items-center gap-3 mb-5">
              <Award size={28} className="text-amber-300" />
              <div>
                <div className="text-[10px] font-mono uppercase tracking-[0.22em] text-amber-300">
                  {isVi ? 'Sau khi hoàn thành' : 'After completion'}
                </div>
                <div className="text-white font-black uppercase">DEEPFENSE AWARE</div>
              </div>
            </div>
            <div className="rounded-xl border border-white/10 bg-black/20 p-4">
              <div className="flex items-center gap-2 text-gray-400 text-sm">
                <LockKeyhole size={16} className="text-amber-300" />
                {isVi ? 'Certificate chỉ mở trong hệ thống học khi đủ điều kiện.' : 'Certificate unlocks inside the learning system after requirements are met.'}
              </div>
              <div className="mt-3 text-[11px] font-mono uppercase tracking-widest text-amber-300">
                500 DPF {isVi ? 'reward dự kiến' : 'planned reward'}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="grid grid-cols-1 xl:grid-cols-12 gap-6 mb-8">
        <div data-reveal className="xl:col-span-7 rounded-2xl border border-white/10 bg-[#07111f]/90 p-6 md:p-8 overflow-hidden relative">
          <div className="absolute right-0 top-0 h-full w-2/3 bg-[radial-gradient(circle_at_top_right,rgba(29,111,232,0.14),transparent_45%)] pointer-events-none" />
          <div className="relative z-10 max-w-2xl">
            <div className={`inline-flex items-center gap-2 rounded-full border px-4 py-1.5 text-[10px] font-mono tracking-widest mb-5 ${isSignedIn ? 'border-emerald-400/25 bg-emerald-400/10 text-emerald-300' : 'border-amber-400/25 bg-amber-400/10 text-amber-300'}`}>
              {isSignedIn ? <CheckCircle2 size={12} /> : <LockKeyhole size={12} />}
              {isSignedIn ? (isVi ? 'ĐÃ KẾT NỐI GOOGLE' : 'GOOGLE CONNECTED') : (isVi ? 'CẦN ĐĂNG NHẬP GOOGLE' : 'GOOGLE SIGN-IN REQUIRED')}
            </div>
            <h2 className="text-2xl md:text-4xl font-black text-white uppercase leading-tight" style={{ fontFamily: "'Outfit', 'Inter', Arial, 'Helvetica Neue', sans-serif" }}>
              {isVi ? 'Xác thực xong là chuyển sang hệ thống học.' : 'Verify once, then enter the learning system.'}
            </h2>
            <p className="text-gray-400 text-sm md:text-base leading-relaxed mt-4">
              {isVi
                ? 'Google login giúp hệ thống biết đúng học viên, lưu hồ sơ cho admin, đối soát điểm quiz và chuẩn bị trả thưởng DPF. Sau bước này, toàn bộ bài học sẽ chạy ở trang index riêng của khóa học.'
                : 'Google login ties the learner profile to the right account for admin review, quiz matching, and DPF reward preparation. After that, all lessons run in the course index.'}
            </p>

            <div className="mt-7 flex flex-col sm:flex-row gap-3">
              {!isSignedIn ? (
                <GlowButton color="primary" size="lg" icon={<LogIn size={16} />} onClick={onGoogleAuth}>
                  {authBusy ? (isVi ? 'ĐANG MỞ GOOGLE...' : 'OPENING GOOGLE...') : (isVi ? 'ĐĂNG NHẬP GOOGLE ĐỂ VÀO HỌC' : 'SIGN IN WITH GOOGLE TO LEARN')}
                </GlowButton>
              ) : (
                <GlowButton color="primary" size="lg" icon={<PlayCircle size={16} />} onClick={openCourseIndex}>
                  {isVi ? 'CHUYỂN SANG HỆ THỐNG HỌC' : 'GO TO LEARNING SYSTEM'}
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

        <aside data-reveal className="xl:col-span-5 flex flex-col gap-5">
          <div className="rounded-2xl border border-white/10 bg-white/[0.025] p-6">
            <div className="flex items-center gap-2 mb-5">
              <Target size={15} className="text-primary" />
              <h2 className="text-white font-black uppercase tracking-widest text-sm">
                {isVi ? 'Nội dung khóa học' : 'Course outline'}
              </h2>
            </div>
            <div className="space-y-3">
              {roadmap.map((module) => (
                <div key={module.code} className={`rounded-xl border p-4 ${module.active ? 'border-blue-400/30 bg-blue-500/10' : 'border-white/8 bg-white/[0.02] opacity-70'}`}>
                  <div className="flex items-start gap-3">
                    <div className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 font-mono text-xs font-black ${module.active ? 'bg-blue-500/20 text-blue-300' : 'bg-white/5 text-gray-500'}`}>
                      {module.active ? <CheckCircle2 size={17} /> : <LockKeyhole size={16} />}
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
              {isVi ? 'Vai trò của trang này' : 'What this page does'}
            </div>
            <ul className="space-y-3 text-sm text-gray-400">
              {(isVi
                ? ['Xác thực người học bằng Google trước khi vào khóa.', 'Ghi nhận hồ sơ để admin kiểm soát học viên.', 'Điều hướng sang index riêng, nơi bài học và quiz thật sự diễn ra.']
                : ['Verifies the learner with Google before course access.', 'Registers the learner profile for admin control.', 'Routes to the course index where lessons and quizzes actually happen.']
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
