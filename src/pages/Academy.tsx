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
      level: 'BASIC',
      status: isVi ? 'Đã mở full course' : 'Full course available',
      title: 'DEEPFENSE BASIC',
      credential: 'DEEPFENSE AWARE',
      reward: '500 DPF',
      hours: '8-10h',
      available: true,
      desc: isVi
        ? 'Khóa nền tảng đầy đủ gồm 9 module: hiểu deepfake, phân tích tác động, nhận diện hình ảnh/video/giọng nói, kiểm chứng nguồn tin và ứng phó an toàn.'
        : 'A complete 9-module foundation covering deepfake concepts, impact, visual/audio recognition, source verification, and safe response.',
      bullets: isVi
        ? ['Pre-assessment đầu vào', '9 module theo 3 phần học', 'Checkpoint, midterm, final exam và certificate khi đạt']
        : ['Entry pre-assessment', '9 modules across 3 learning parts', 'Checkpoints, midterms, final exam, and certificate after completion'],
      path: '/academy/basics',
    },
    {
      level: 'DEEPFENSE ADVANCE',
      status: isVi ? 'Sáº¯p cáº­p nháº­t' : 'Coming soon',
      title: 'FORENSIC ANALYST',
      credential: 'DEEPFENSE FORENSIC ANALYST',
      reward: isVi ? 'Reward nÃ¢ng cao' : 'Advanced reward',
      hours: '10-12h',
      available: false,
      desc: isVi
        ? 'Äi sÃ¢u hÆ¡n vÃ o phÃ¢n tÃ­ch báº±ng chá»©ng, metadata, chuá»—i lÆ°u giá»¯, attribution vÃ  pháº£n á»©ng sá»± cá»‘.'
        : 'A deeper track for evidence analysis, metadata, chain of custody, attribution, and incident response.',
      bullets: isVi
        ? ['YÃªu cáº§u hoÃ n thÃ nh Basics', 'Case study forensic', 'BÃ i thi thá»±c hÃ nh']
        : ['Requires Basics completion', 'Forensic case studies', 'Practical assessment'],
      path: '#',
    },
    {
      level: 'DEEPFENSE EXPERT',
      status: isVi ? 'Sáº¯p cáº­p nháº­t' : 'Coming soon',
      title: 'SECURITY EXPERT',
      credential: 'DEEPFENSE SECURITY EXPERT',
      reward: isVi ? 'Expert reward' : 'Expert reward',
      hours: '12-15h',
      available: false,
      desc: isVi
        ? 'DÃ nh cho hÆ°á»›ng chuyÃªn sÃ¢u: cÃ´ng nghá»‡ phÃ¡t hiá»‡n, phÃ²ng thá»§ tá»• chá»©c, phÃ¡p lÃ½/Ä‘áº¡o Ä‘á»©c vÃ  xu hÆ°á»›ng nghiÃªn cá»©u.'
        : 'A specialist track for detection technology, organizational defense, legal/ethics, and research trends.',
      bullets: isVi
        ? ['YÃªu cáº§u Level 2', 'Advanced challenges', 'Credential thá»i háº¡n dÃ i hÆ¡n']
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
            <h1 className="text-4xl md:text-6xl font-black uppercase leading-tight text-white" style={{ fontFamily:"'Outfit', 'Inter', Arial, 'Helvetica Neue', sans-serif" }}>
              {isVi ? 'Há»c Ä‘á»ƒ khÃ´ng bá»‹ dáº«n dáº¯t bá»Ÿi ná»™i dung giáº£' : 'Train before synthetic media trains you'}
            </h1>
            <p className="mt-5 max-w-3xl text-base md:text-lg leading-relaxed text-gray-400">
              {isVi
                ? 'Academy lÃ  há»‡ thá»‘ng khÃ³a há»c vÃ  chá»©ng nháº­n cá»§a DEEPFENSE. Má»—i khÃ³a cÃ³ lá»™ trÃ¬nh, quiz, tiáº¿n Ä‘á»™ há»c, Ä‘iá»u kiá»‡n cáº¥p certificate vÃ  reward DPF Ä‘á»ƒ biáº¿n viá»‡c há»c an toÃ n sá»‘ thÃ nh má»™t hÃ nh trÃ¬nh cÃ³ thá»ƒ Ä‘o lÆ°á»ng.'
                : 'Academy is DEEPFENSEâ€™s course and certification system. Each course includes a path, quizzes, learning progress, certificate conditions, and DPF rewards to make digital safety measurable.'}
            </p>
          </div>

          <div className="lg:col-span-4 rounded-2xl border border-white/10 bg-black/30 p-5">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-11 h-11 rounded-xl bg-amber-400/10 border border-amber-400/25 text-amber-300 flex items-center justify-center">
                <Trophy size={22} />
              </div>
              <div>
                <div className="text-[10px] font-mono uppercase tracking-[0.22em] text-gray-500">
                  {isVi ? 'Há»‡ thá»‘ng há»c táº­p' : 'Learning system'}
                </div>
                <div className="text-white font-black uppercase">{isVi ? 'Há»c - kiá»ƒm tra - nháº­n thÆ°á»Ÿng' : 'Learn - prove - earn'}</div>
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
          [<Target size={20} />, isVi ? 'Lá»™ trÃ¬nh rÃµ' : 'Clear path', isVi ? 'Biáº¿t mÃ¬nh há»c gÃ¬, Ä‘ang á»Ÿ Ä‘Ã¢u, cáº§n hoÃ n thÃ nh gÃ¬ tiáº¿p theo.' : 'Know what to learn, where you are, and what comes next.'],
          [<ShieldCheck size={20} />, isVi ? 'Pháº£n xáº¡ thá»±c táº¿' : 'Practical reflex', isVi ? 'Há»c báº±ng tÃ¬nh huá»‘ng, khÃ´ng chá»‰ Ä‘á»c lÃ½ thuyáº¿t khÃ´.' : 'Scenario-led learning, beyond dry theory.'],
          [<Award size={20} />, isVi ? 'Chá»©ng nháº­n cÃ³ Ä‘iá»u kiá»‡n' : 'Conditional credential', isVi ? 'Certificate chá»‰ má»Ÿ khi hoÃ n thÃ nh yÃªu cáº§u khÃ³a há»c.' : 'Certificates unlock only after course requirements are met.'],
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
              {isVi ? 'Danh sÃ¡ch khÃ³a há»c' : 'Course catalog'}
            </div>
            <h2 className="text-2xl md:text-3xl font-black text-white uppercase" style={{ fontFamily:"'Outfit', 'Inter', Arial, 'Helvetica Neue', sans-serif" }}>
              {isVi ? 'Báº¡n sáº½ há»c gÃ¬ trong Academy?' : 'What will you learn?'}
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
              <h3 className="text-white text-xl font-black uppercase mb-3" style={{ fontFamily:"'Outfit', 'Inter', Arial, 'Helvetica Neue', sans-serif" }}>{course.title}</h3>
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
                  <div className="text-[10px] text-gray-500 uppercase font-mono mb-1">{isVi ? 'Thá»i lÆ°á»£ng' : 'Hours'}</div>
                  <div className="text-white text-xs font-black uppercase flex items-center gap-1"><Clock3 size={12} /> {course.hours}</div>
                </div>
              </div>
              {canOpen ? (
                <GlowButton color="primary" size="md" icon={<GraduationCap size={16} />} onClick={() => course.available ? navigate(course.path) : window.alert(isVi ? 'Advanced Starter Pack demo da duoc mo khoa. Noi dung giao an se duoc cap nhat sau.' : 'Advanced Starter Pack demo is unlocked. Course content will be added later.')}>
                  {isVi ? 'VÃ€O KHÃ“A Há»ŒC' : 'OPEN COURSE'}
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
                  {isVi ? 'Sáº¯p má»Ÿ' : 'Coming soon'}
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
