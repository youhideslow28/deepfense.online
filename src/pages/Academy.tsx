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
      reward: '500 DPF coin',
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
      status: isVi ? 'Sắp cập nhật' : 'Coming soon',
      title: 'DEEPFENSE ADVANCE',
      credential: 'DEEPFENSE ADVANCE',
      reward: isVi ? 'Reward nâng cao' : 'Advanced reward',
      hours: '10-12h',
      available: false,
      desc: isVi
        ? 'Đi sâu hơn vào phân tích bằng chứng, metadata, chuỗi lưu giữ, attribution và phản ứng sự cố.'
        : 'The advanced track after BASIC: scenario analysis, verification workflow, organizational risk, incident response, and guided practice.',
      bullets: isVi
        ? ['Yêu cầu hoàn thành BASIC', 'Case study nâng cao', 'Bài thi thực hành']
        : ['Requires BASIC completion', 'Advanced case studies', 'Practical assessment'],
      path: '#',
    },
    {
      level: 'DEEPFENSE EXPERT',
      status: isVi ? 'Sắp cập nhật' : 'Coming soon',
      title: 'DEEPFENSE EXPERT',
      credential: 'DEEPFENSE EXPERT',
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

  const hallOfFame = [
    {
      rank: '01',
      name: 'Ho Xuan Nguyen',
      credential: 'DEEPFENSE AWARE',
      note: isVi ? 'Hoàn thành chương trình nền tảng' : 'Completed the foundation program',
    },
    {
      rank: '02',
      name: 'Nguyen Nhat Huy',
      credential: 'DEEPFENSE AWARE',
      note: isVi ? 'Hoàn thành chương trình nền tảng' : 'Completed the foundation program',
    },
    {
      rank: '03',
      name: isVi ? 'Học viên tiếp theo' : 'Next learner',
      credential: isVi ? 'Đang cập nhật' : 'Updating',
      note: isVi ? 'Sẽ hiển thị khi hoàn thành đủ điều kiện' : 'Shown after completion requirements are met',
    },
  ];

  return (
    <div ref={pageRef as React.RefObject<HTMLDivElement>} className="animate-in fade-in duration-500">
      <section data-reveal className="relative overflow-hidden rounded-2xl border border-blue-500/25 bg-[#07111f]/95 p-6 md:p-10 mb-8 shadow-[0_24px_90px_rgba(0,0,0,0.42)] backdrop-blur-xl">
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-blue-400/60 to-transparent" />
        <div className="absolute right-0 top-0 h-full w-1/2 bg-[radial-gradient(circle_at_top_right,rgba(29,111,232,0.16),transparent_45%)] pointer-events-none" />
        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-8">
            <div className="inline-flex items-center gap-2 rounded-full border border-blue-500/20 bg-blue-500/10 px-4 py-1.5 text-[10px] font-mono tracking-widest text-blue-300 mb-5">
              <GraduationCap size={12} /> DEEPFENSE ACADEMY
            </div>
            <h1 className="text-4xl md:text-6xl font-black uppercase leading-tight text-white" style={{ fontFamily:"'Outfit', 'Inter', Arial, 'Helvetica Neue', sans-serif" }}>
              {isVi ? 'Học để không bị dẫn dắt bởi nội dung giả' : 'Train before synthetic media trains you'}
            </h1>
            <p className="mt-5 max-w-3xl text-base md:text-lg leading-relaxed text-gray-400">
              {isVi
                ? 'Academy là hệ thống khóa học và chứng nhận của DEEPFENSE. Mỗi khóa có lộ trình, quiz, tiến độ học, điều kiện cấp certificate và reward DPF coin để biến việc học an toàn số thành một hành trình có thể đo lường.'
                : "Academy is DEEPFENSE's course and certification system. Each course includes a path, quizzes, learning progress, certificate conditions, and DPF coin rewards to make digital safety measurable."}
            </p>
          </div>

          <div className="lg:col-span-4 rounded-2xl border border-white/12 bg-[#07111f]/80 p-5 shadow-[0_18px_55px_rgba(0,0,0,0.26)] backdrop-blur-xl">
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
                [<Sparkles size={18} />, 'DPF coin'],
              ].map(([icon, label]) => (
                <div key={String(label)} className="rounded-xl border border-white/12 bg-white/[0.075] p-3 text-center">
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

      <section data-reveal className="mb-8 rounded-2xl border border-amber-400/20 bg-[#07111f]/82 p-5 md:p-6 shadow-[0_18px_55px_rgba(0,0,0,0.24)] backdrop-blur-xl">
        <div className="mb-5 flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
          <div>
            <div className="text-[10px] font-mono font-black uppercase tracking-[0.22em] text-amber-300">
              {isVi ? 'Bảng vinh danh' : 'Hall of Fame'}
            </div>
            <h2 className="mt-2 text-2xl md:text-3xl font-black uppercase text-white" style={{ fontFamily:"'Outfit', 'Inter', Arial, 'Helvetica Neue', sans-serif" }}>
              {isVi ? 'Học viên đã hoàn thành chương trình' : 'Learners who completed the program'}
            </h2>
          </div>
          <div className="text-xs leading-relaxed text-gray-500 md:max-w-sm md:text-right">
            {isVi ? 'Khu vực này ghi nhận những học viên đạt chứng nhận DEEPFENSE AWARE và đủ điều kiện nhận reward.' : 'This area recognizes learners who earned DEEPFENSE AWARE and met reward conditions.'}
          </div>
        </div>

        <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
          {hallOfFame.map((learner) => (
            <article key={learner.rank} className="rounded-xl border border-white/10 bg-black/30 p-4">
              <div className="mb-3 flex items-center justify-between gap-3">
                <div className="font-mono text-[10px] font-black text-amber-300">#{learner.rank}</div>
                <Trophy size={15} className="text-amber-300/70" />
              </div>
              <div className="truncate text-sm font-black text-white">{learner.name}</div>
              <div className="mt-1 text-[10px] font-mono uppercase tracking-widest text-amber-300/80">{learner.credential}</div>
              <p className="mt-3 text-xs leading-relaxed text-gray-500">{learner.note}</p>
            </article>
          ))}
        </div>
      </section>

      <section data-reveal className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        {[
          [<Target size={20} />, isVi ? 'Lộ trình rõ' : 'Clear path', isVi ? 'Biết mình học gì, đang ở đâu, cần hoàn thành gì tiếp theo.' : 'Know what to learn, where you are, and what comes next.'],
          [<ShieldCheck size={20} />, isVi ? 'Phản xạ thực tế' : 'Practical reflex', isVi ? 'Học bằng tình huống, không chỉ đọc lý thuyết khô.' : 'Scenario-led learning, beyond dry theory.'],
          [<Award size={20} />, isVi ? 'Chứng nhận có điều kiện' : 'Conditional credential', isVi ? 'Certificate chỉ mở khi hoàn thành yêu cầu khóa học.' : 'Certificates unlock only after course requirements are met.'],
        ].map(([icon, title, text]) => (
          <article key={String(title)} className="rounded-2xl border border-white/12 bg-[#07111f]/78 p-5 shadow-[0_14px_42px_rgba(0,0,0,0.22)] backdrop-blur-xl">
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
            <h2 className="text-2xl md:text-3xl font-black text-white uppercase" style={{ fontFamily:"'Outfit', 'Inter', Arial, 'Helvetica Neue', sans-serif" }}>
              {isVi ? 'Bạn sẽ học gì trong Academy?' : 'What will you learn?'}
            </h2>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          {courses.map((course) => {
            const isAdvancedDemo = course.title === 'DEEPFENSE ADVANCE';
            const canOpen = course.available || (isAdvancedDemo && advancedDemoUnlocked);

            return (
            <article key={course.title} className={`relative flex min-h-full flex-col rounded-2xl border p-5 md:p-6 overflow-hidden shadow-[0_18px_55px_rgba(0,0,0,0.24)] backdrop-blur-xl ${course.available ? 'border-blue-400/35 bg-[#08213a]/88' : 'border-white/12 bg-[#07111f]/78'}`}>
              <div className="flex items-center justify-between gap-3 mb-5">
                <div className={`rounded-full px-3 py-1 text-[9px] font-mono font-black uppercase tracking-widest ${course.available ? 'bg-success/10 text-success' : 'bg-white/5 text-gray-500'}`}>
                  {course.status}
                </div>
              </div>
              <h3 className="text-white text-xl font-black uppercase mb-3" style={{ fontFamily:"'Outfit', 'Inter', Arial, 'Helvetica Neue', sans-serif" }}>{course.title}</h3>
              <p className="text-gray-400 text-sm leading-relaxed mb-5 lg:min-h-[120px]">{course.desc}</p>
              <div className="space-y-2 mb-5 lg:min-h-[84px]">
                {course.bullets.map((item) => (
                  <div key={item} className="flex items-start gap-2 text-sm text-gray-500">
                    {course.available ? <CheckCircle2 size={15} className="text-blue-300 mt-0.5 shrink-0" /> : <LockKeyhole size={14} className="text-gray-600 mt-0.5 shrink-0" />}
                    <span>{item}</span>
                  </div>
                ))}
              </div>
              <div className="mt-auto grid grid-cols-2 gap-2 mb-5">
                <div className="rounded-xl border border-white/12 bg-black/38 p-3">
                  <div className="text-[10px] text-gray-500 uppercase font-mono mb-1">Credential</div>
                  <div className="text-white text-xs font-black uppercase leading-snug">{course.credential}</div>
                </div>
                <div className="rounded-xl border border-white/12 bg-black/38 p-3">
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
                    {unlocking ? (isVi ? 'DANG MO KHOA...' : 'UNLOCKING...') : (isVi ? 'MO KHOA DEMO - 250 DPF coin' : 'UNLOCK DEMO - 250 DPF coin')}
                  </button>
                  <DpfRewardNotice result={unlockResult} successPrefix={isVi ? 'Da mo khoa' : 'Unlocked'} />
                </div>
              ) : (
                <button disabled className="w-full rounded-lg border border-white/12 bg-white/[0.07] px-4 py-3 text-[10px] font-black font-mono uppercase tracking-widest text-gray-500 cursor-not-allowed">
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
