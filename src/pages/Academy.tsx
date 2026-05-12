/**
 * DEEPFENSE.ONLINE - Academy Overview
 * Catalog-style academy page. Actual learning happens in course routes.
 */

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Language } from '@/types';
import {
  Award, BookOpen, CheckCircle2, Clock3, GraduationCap, LockKeyhole,
  ShieldCheck, Sparkles, Target, Trophy,
} from 'lucide-react';
import GlowButton from '@/components/ui/GlowButton';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import DpfRewardNotice from '@/features/dpf/DpfRewardNotice';
import DpfWalletPanel from '@/features/dpf/DpfWalletPanel';
import { DpfUnlockResult, unlockWithDpf } from '@/features/dpf/dpf';
import { useDpfWallet } from '@/features/dpf/useDpfWallet';

interface AcademyProps { lang: Language; }

const Academy: React.FC<AcademyProps> = ({ lang }) => {
  const isVi = lang === 'vi';
  const navigate = useNavigate();
  const { wallet } = useDpfWallet();
  const [unlockResult, setUnlockResult] = useState<DpfUnlockResult | null>(null);
  const [unlocking, setUnlocking] = useState(false);
  const pageRef = useScrollReveal({ selector: '[data-reveal]', preset: 'fade-up', stagger: 0.08 });
  const advancedDemoUnlocked = wallet?.unlockedItems?.includes('advanced-starter-pack') ?? false;

  const handleAdvancedUnlock = async () => {
    if (unlocking) return;
    setUnlocking(true);
    const result = await unlockWithDpf({
      itemId: 'advanced-starter-pack',
      itemType: 'course',
      title: 'Advanced Starter Pack',
      cost: 250,
    });
    setUnlockResult(result);
    setUnlocking(false);
  };

  const courses = [
    {
      level: 'Level 1',
      status: isVi ? 'Đang mở chương 1' : 'Chapter 1 available',
      title: 'DEEPFENSE BASICS',
      credential: 'DEEPFENSE AWARE',
      reward: '500 DPF',
      hours: '8-10h',
      available: true,
      desc: isVi
        ? 'Khóa nền tảng cho người mới: hiểu deepfake là gì, vì sao nguy hiểm, cách kiểm chứng nội dung đáng ngờ và phản ứng an toàn.'
        : 'A beginner foundation: what deepfakes are, why they matter, how to verify suspicious media, and how to respond safely.',
      bullets: isVi
        ? ['Pre-assessment đầu vào', 'Module 1: Deepfake là gì?', 'Quiz, tiến độ, certificate khi hoàn thành']
        : ['Entry pre-assessment', 'Module 1: What is a deepfake?', 'Quizzes, progress, certificate after completion'],
      path: '/academy/basics',
    },
    {
      level: 'Level 2',
      status: isVi ? 'Sắp cập nhật' : 'Coming soon',
      title: 'FORENSIC ANALYST',
      credential: 'DEEPFENSE FORENSIC ANALYST',
      reward: isVi ? 'Reward nâng cao' : 'Advanced reward',
      hours: '10-12h',
      available: false,
      desc: isVi
        ? 'Đi sâu hơn vào phân tích bằng chứng, metadata, chuỗi lưu giữ, attribution và phản ứng sự cố.'
        : 'A deeper track for evidence analysis, metadata, chain of custody, attribution, and incident response.',
      bullets: isVi
        ? ['Yêu cầu hoàn thành Basics', 'Case study forensic', 'Bài thi thực hành']
        : ['Requires Basics completion', 'Forensic case studies', 'Practical assessment'],
      path: '#',
    },
    {
      level: 'Level 3',
      status: isVi ? 'Sắp cập nhật' : 'Coming soon',
      title: 'SECURITY EXPERT',
      credential: 'DEEPFENSE SECURITY EXPERT',
      reward: isVi ? 'Expert reward' : 'Expert reward',
      hours: '12-15h',
      available: false,
      desc: isVi
        ? 'Dành cho hướng chuyên sâu: công nghệ phát hiện, phòng thủ tổ chức, pháp lý/đạo đức và xu hướng nghiên cứu.'
        : 'A specialist track for detection technology, organizational defense, legal/ethics, and research trends.',
      bullets: isVi
        ? ['Yêu cầu Level 2', 'Advanced challenges', 'Credential thời hạn dài hơn']
        : ['Requires Level 2', 'Advanced challenges', 'Longer-validity credential'],
      path: '#',
    },
  ];

  return (
    <div ref={pageRef as React.RefObject<HTMLDivElement>} className="animate-in fade-in duration-500">
      <section data-reveal className="relative overflow-hidden rounded-2xl border border-blue-500/20 bg-[#07111f]/90 p-6 md:p-10 mb-8 shadow-[0_24px_90px_rgba(0,0,0,0.35)]">
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-blue-400/60 to-transparent" />
        <div className="absolute right-0 top-0 h-full w-1/2 bg-[radial-gradient(circle_at_top_right,rgba(29,111,232,0.16),transparent_45%)] pointer-events-none" />
        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-8">
            <div className="inline-flex items-center gap-2 rounded-full border border-blue-500/20 bg-blue-500/10 px-4 py-1.5 text-[10px] font-mono tracking-widest text-blue-300 mb-5">
              <GraduationCap size={12} /> DEEPFENSE ACADEMY
            </div>
            <h1 className="text-4xl md:text-6xl font-black uppercase leading-tight text-white" style={{ fontFamily:"'Outfit',sans-serif" }}>
              {isVi ? 'Học để không bị dẫn dắt bởi nội dung giả' : 'Train before synthetic media trains you'}
            </h1>
            <p className="mt-5 max-w-3xl text-base md:text-lg leading-relaxed text-gray-400">
              {isVi
                ? 'Academy là hệ thống khóa học và chứng nhận của DEEPFENSE. Mỗi khóa có lộ trình, quiz, tiến độ học, điều kiện cấp certificate và reward DPF để biến việc học an toàn số thành một hành trình có thể đo lường.'
                : 'Academy is DEEPFENSE’s course and certification system. Each course includes a path, quizzes, learning progress, certificate conditions, and DPF rewards to make digital safety measurable.'}
            </p>
          </div>

          <div className="lg:col-span-4 rounded-2xl border border-white/10 bg-black/30 p-5">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-11 h-11 rounded-xl bg-amber-400/10 border border-amber-400/25 text-amber-300 flex items-center justify-center">
                <Trophy size={22} />
              </div>
              <div>
                <div className="text-[10px] font-mono uppercase tracking-[0.22em] text-gray-500">
                  {isVi ? 'Hệ thống học tập' : 'Learning system'}
                </div>
                <div className="text-white font-black uppercase">{isVi ? 'Học - kiểm tra - nhận thưởng' : 'Learn - prove - earn'}</div>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-2">
              {[
                [<BookOpen size={18} />, isVi ? 'Module' : 'Modules'],
                [<Award size={18} />, 'Credential'],
                [<Sparkles size={18} />, 'DPF'],
              ].map(([icon, label]) => (
                <div key={String(label)} className="rounded-xl border border-white/10 bg-white/[0.03] p-3 text-center">
                  <div className="text-blue-300 flex justify-center mb-2">{icon}</div>
                  <div className="text-[10px] leading-snug text-gray-500 uppercase font-mono">{label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section data-reveal className="mb-8">
        <DpfWalletPanel lang={lang} />
      </section>

      <section data-reveal className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        {[
          [<Target size={20} />, isVi ? 'Lộ trình rõ' : 'Clear path', isVi ? 'Biết mình học gì, đang ở đâu, cần hoàn thành gì tiếp theo.' : 'Know what to learn, where you are, and what comes next.'],
          [<ShieldCheck size={20} />, isVi ? 'Phản xạ thực tế' : 'Practical reflex', isVi ? 'Học bằng tình huống, không chỉ đọc lý thuyết khô.' : 'Scenario-led learning, beyond dry theory.'],
          [<Award size={20} />, isVi ? 'Chứng nhận có điều kiện' : 'Conditional credential', isVi ? 'Certificate chỉ mở khi hoàn thành yêu cầu khóa học.' : 'Certificates unlock only after course requirements are met.'],
        ].map(([icon, title, text]) => (
          <article key={String(title)} className="rounded-2xl border border-white/10 bg-white/[0.025] p-5">
            <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/20 text-blue-300 flex items-center justify-center mb-4">{icon}</div>
            <h2 className="text-white font-black uppercase text-sm tracking-widest mb-3">{title}</h2>
            <p className="text-gray-500 text-sm leading-relaxed">{text}</p>
          </article>
        ))}
      </section>

      <section data-reveal className="mb-8">
        <div className="flex items-end justify-between gap-4 mb-5">
          <div>
            <div className="text-[10px] font-mono uppercase tracking-[0.22em] text-blue-300 mb-2">
              {isVi ? 'Danh sách khóa học' : 'Course catalog'}
            </div>
            <h2 className="text-2xl md:text-3xl font-black text-white uppercase" style={{ fontFamily:"'Outfit',sans-serif" }}>
              {isVi ? 'Bạn sẽ học gì trong Academy?' : 'What will you learn?'}
            </h2>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          {courses.map((course) => {
            const isAdvancedDemo = course.title === 'FORENSIC ANALYST';
            const canOpen = course.available || (isAdvancedDemo && advancedDemoUnlocked);

            return (
            <article key={course.title} className={`relative rounded-2xl border p-5 md:p-6 overflow-hidden ${course.available ? 'border-blue-400/30 bg-blue-500/[0.08]' : 'border-white/10 bg-white/[0.025]'}`}>
              <div className="flex items-center justify-between gap-3 mb-5">
                <div className="text-[10px] font-mono uppercase tracking-[0.2em] text-gray-500">{course.level}</div>
                <div className={`rounded-full px-3 py-1 text-[9px] font-mono font-black uppercase tracking-widest ${course.available ? 'bg-success/10 text-success' : 'bg-white/5 text-gray-500'}`}>
                  {course.status}
                </div>
              </div>
              <h3 className="text-white text-xl font-black uppercase mb-3" style={{ fontFamily:"'Outfit',sans-serif" }}>{course.title}</h3>
              <p className="text-gray-400 text-sm leading-relaxed mb-5">{course.desc}</p>
              <div className="space-y-2 mb-5">
                {course.bullets.map((item) => (
                  <div key={item} className="flex items-start gap-2 text-sm text-gray-500">
                    {course.available ? <CheckCircle2 size={15} className="text-blue-300 mt-0.5 shrink-0" /> : <LockKeyhole size={14} className="text-gray-600 mt-0.5 shrink-0" />}
                    <span>{item}</span>
                  </div>
                ))}
              </div>
              <div className="grid grid-cols-2 gap-2 mb-5">
                <div className="rounded-xl border border-white/10 bg-black/20 p-3">
                  <div className="text-[10px] text-gray-500 uppercase font-mono mb-1">Credential</div>
                  <div className="text-white text-xs font-black uppercase leading-snug">{course.credential}</div>
                </div>
                <div className="rounded-xl border border-white/10 bg-black/20 p-3">
                  <div className="text-[10px] text-gray-500 uppercase font-mono mb-1">{isVi ? 'Thời lượng' : 'Hours'}</div>
                  <div className="text-white text-xs font-black uppercase flex items-center gap-1"><Clock3 size={12} /> {course.hours}</div>
                </div>
              </div>
              {canOpen ? (
                <GlowButton color="primary" size="md" icon={<GraduationCap size={16} />} onClick={() => course.available ? navigate(course.path) : window.alert(isVi ? 'Advanced Starter Pack demo da duoc mo khoa. Noi dung giao an se duoc cap nhat sau.' : 'Advanced Starter Pack demo is unlocked. Course content will be added later.')}>
                  {isVi ? 'VÀO KHÓA HỌC' : 'OPEN COURSE'}
                </GlowButton>
              ) : isAdvancedDemo ? (
                <div>
                  <button
                    onClick={handleAdvancedUnlock}
                    disabled={unlocking}
                    className="w-full rounded-lg border border-amber-400/20 bg-amber-400/10 px-4 py-3 text-[10px] font-black font-mono uppercase tracking-widest text-amber-300 hover:bg-amber-400/15 disabled:opacity-60 disabled:cursor-wait transition-colors"
                  >
                    {unlocking ? (isVi ? 'DANG MO KHOA...' : 'UNLOCKING...') : (isVi ? 'MO KHOA DEMO - 250 DPF' : 'UNLOCK DEMO - 250 DPF')}
                  </button>
                  <DpfRewardNotice result={unlockResult} successPrefix={isVi ? 'Da mo khoa' : 'Unlocked'} />
                </div>
              ) : (
                <button disabled className="w-full rounded-lg border border-white/10 bg-white/[0.03] px-4 py-3 text-[10px] font-black font-mono uppercase tracking-widest text-gray-600 cursor-not-allowed">
                  {isVi ? 'Sắp mở' : 'Coming soon'}
                </button>
              )}
            </article>
          )})}
        </div>
      </section>
    </div>
  );
};

export default Academy;
