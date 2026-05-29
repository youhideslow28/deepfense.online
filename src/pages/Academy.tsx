import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { 
  AlertCircle, CheckCircle2, Clock, Users, Award, Play, BookOpen, 
  Eye, EyeOff, Zap, TrendingUp, GraduationCap, ChevronLeft,
  Trophy, ShieldCheck, Target, Sparkles, LayoutDashboard, LogIn, LockKeyhole, Brain, ExternalLink,
  Clock3
} from 'lucide-react';
import { Language } from '@/types';
import type { User } from 'firebase/auth';
import GlowButton from '@/components/ui/GlowButton';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import { basicsCourse, Module, Section, Lesson } from '@/data/basicsCourseData';
import LessonMiniGame from '@/features/academy/LessonMiniGame';
import LessonContentBlock from '@/features/academy/LessonContentBlock';

interface AcademyProps { 
  lang: Language; 
  user: User | null;
  authBusy: boolean;
  onGoogleAuth: () => void;
}

const storageKey = (baseKey: string, uid?: string | null) => (uid ? `${baseKey}:${uid}` : baseKey);

const readJson = <T,>(key: string, fallback: T): T => {
  try {
    const raw = window.localStorage.getItem(key);
    return raw ? JSON.parse(raw) as T : fallback;
  } catch {
    return fallback;
  }
};

const readUserModuleSync = (uid?: string | null) => {
  if (!uid) return [] as number[];
  const scoped = readJson<{ uid?: string; completedModules?: number[] }>(storageKey('dfb_module_sync_v1', uid), {});
  if (!scoped.uid || scoped.uid === uid) return scoped.completedModules ?? [];
  return [];
};

const readUserBasicsProgress = (uid?: string | null) => {
  if (!uid) return [] as string[];
  const scoped = readJson<{ uid?: string; completed?: string[] }>(storageKey('dfb_progress_v2', uid), {});
  if (!scoped.uid || scoped.uid === uid) return scoped.completed ?? [];
  return [];
};

const readUserCompletedLessons = (uid?: string | null) => {
  if (!uid) return [] as string[];
  const academyLessons = readJson<string[]>(storageKey('df_completed_lessons', uid), []);
  return [...new Set([...academyLessons, ...readUserBasicsProgress(uid)])];
};

const legacyProgressKeys = [
  'df_completed_modules',
  'df_completed_lessons',
  'dfb_progress_v2',
  'dfb_module_sync_v1',
  'dfb_exam_v1',
  'dfb_cert_name',
  'dfb_cert_claimed_v1',
  'dfb_cert_id_v1',
  'deepfense-basics-course-evaluation',
  'deepfense-basics-final-exam',
];

const readOwnedJson = <T extends { uid?: string }>(baseKey: string, uid?: string | null): T | null => {
  if (!uid) return null;
  const value = readJson<T | null>(storageKey(baseKey, uid), null);
  if (!value) return null;
  return !value.uid || value.uid === uid ? value : null;
};

const refreshAcademyBasicsCache = () => {
  if (!('serviceWorker' in navigator)) return;
  navigator.serviceWorker.getRegistrations()
    .then((registrations) => {
      registrations
        .filter((registration) => registration.scope.includes('/academy/basics/'))
        .forEach((registration) => {
          registration.update();
          registration.waiting?.postMessage({ type: 'SKIP_WAITING' });
        });
    })
    .catch(() => {});
  if ('caches' in window) {
    window.caches.keys()
      .then((keys) => {
        keys
          .filter((key) => key.includes('workbox') || key.includes('academy') || key.includes('precache'))
          .forEach((key) => window.caches.delete(key));
      })
      .catch(() => {});
  }
};

const roadmapData = [
  {
    code: '01',
    titleVi: 'Deepfake là gì?',
    titleEn: 'What is a deepfake?',
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

export default function Academy({ lang, user, authBusy, onGoogleAuth }: AcademyProps) {
  const isVi = lang === 'vi';
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [currentView, setCurrentView] = useState('dashboard');
  const [selectedCourseId, setSelectedCourseId] = useState<string | null>(null);
  const [activeModule, setActiveModule] = useState<Module | null>(null);
  const [activeSectionIdx, setActiveSectionIdx] = useState(0);
  const [activeLessonIdx, setActiveLessonIdx] = useState(0);
  const [completedLessons, setCompletedLessons] = useState<string[]>(() => {
    return readUserCompletedLessons(user?.uid);
  });
  const [completedModules, setCompletedModules] = useState<number[]>(() => {
    const saved = readJson<number[]>(storageKey('df_completed_modules', user?.uid), []);
    return [...new Set([...saved, ...readUserModuleSync(user?.uid)])];
  });

  const [htmlCoursePassed, setHtmlCoursePassed] = useState<boolean>(() => {
    return !!readOwnedJson<{ uid?: string; passed?: boolean }>('deepfense-basics-final-exam', user?.uid)?.passed;
  });
  const [htmlCourseEvalDone, setHtmlCourseEvalDone] = useState<boolean>(() => {
    return !!readOwnedJson<{ uid?: string; submittedAt?: number }>('deepfense-basics-course-evaluation', user?.uid)?.submittedAt;
  });
  const [lessonStep, setLessonStep] = useState<'content' | 'review' | 'checkpoint'>('content');
  const [miniGameDone, setMiniGameDone] = useState(false);

  // Sync auth state to currentView
  useEffect(() => {
    if (authBusy) return;
    if (!user) {
      setCurrentView('welcome');
    } else if (currentView === 'welcome') {
      setCurrentView('dashboard');
    }
  }, [user, authBusy]);

  useEffect(() => {
    if (!user?.uid) return;
    localStorage.setItem(storageKey('df_completed_lessons', user.uid), JSON.stringify(completedLessons));
    try {
      const progressKey = storageKey('dfb_progress_v2', user.uid);
      const prev = readJson<{ uid?: string; completed?: string[]; currentLessonId?: string | null }>(progressKey, {});
      const merged = [...new Set([...(prev.completed ?? []), ...completedLessons])];
      localStorage.setItem(progressKey, JSON.stringify({
        uid: user.uid,
        completed: merged,
        currentLessonId: prev.currentLessonId ?? null,
      }));
    } catch {}
  }, [completedLessons, user?.uid]);

  useEffect(() => {
    if (!user?.uid) return;
    localStorage.setItem(storageKey('df_completed_modules', user.uid), JSON.stringify(completedModules));
    // Keep user-scoped sync key up-to-date so /academy/basics/ SPA can read it
    try {
      const syncKey = storageKey('dfb_module_sync_v1', user.uid);
      const prev = readJson<{ uid?: string; completedModules?: number[] }>(syncKey, {});
      const merged = [...new Set([...(prev.completedModules ?? []), ...completedModules])];
      localStorage.setItem(syncKey, JSON.stringify({ uid: user.uid, completedModules: merged, updatedAt: Date.now() }));
    } catch {}
  }, [completedModules, user?.uid]);

  useEffect(() => {
    if (!user?.uid) {
      setCompletedLessons([]);
      setCompletedModules([]);
      setHtmlCoursePassed(false);
      setHtmlCourseEvalDone(false);
      return;
    }
    if (user.email !== 'deepfense@gmail.com') {
      legacyProgressKeys.forEach(key => localStorage.removeItem(key));
    }
    refreshAcademyBasicsCache();
    setCompletedLessons(readUserCompletedLessons(user.uid));
    const savedModules = readJson<number[]>(storageKey('df_completed_modules', user.uid), []);
    setCompletedModules([...new Set([...savedModules, ...readUserModuleSync(user.uid)])]);
    setHtmlCoursePassed(!!readOwnedJson<{ uid?: string; passed?: boolean }>('deepfense-basics-final-exam', user.uid)?.passed);
    setHtmlCourseEvalDone(!!readOwnedJson<{ uid?: string; submittedAt?: number }>('deepfense-basics-course-evaluation', user.uid)?.submittedAt);
  }, [user?.uid, user?.email]);

  useEffect(() => {
    if (!user?.uid) return;
    const syncFromBasics = () => {
      setCompletedLessons(prev => [...new Set([...prev, ...readUserCompletedLessons(user.uid)])]);
      const savedModules = readJson<number[]>(storageKey('df_completed_modules', user.uid), []);
      setCompletedModules([...new Set([...savedModules, ...readUserModuleSync(user.uid)])]);
      setHtmlCoursePassed(!!readOwnedJson<{ uid?: string; passed?: boolean }>('deepfense-basics-final-exam', user.uid)?.passed);
      setHtmlCourseEvalDone(!!readOwnedJson<{ uid?: string; submittedAt?: number }>('deepfense-basics-course-evaluation', user.uid)?.submittedAt);
    };
    const onStorage = (event: StorageEvent) => {
      if (!event.key) return;
      if (
        event.key === storageKey('dfb_progress_v2', user.uid) ||
        event.key === storageKey('df_completed_lessons', user.uid) ||
        event.key === storageKey('dfb_module_sync_v1', user.uid) ||
        event.key === storageKey('deepfense-basics-final-exam', user.uid) ||
        event.key === storageKey('deepfense-basics-course-evaluation', user.uid)
      ) {
        syncFromBasics();
      }
    };
    const onFocus = () => syncFromBasics();
    const onVisibility = () => {
      if (!document.hidden) syncFromBasics();
    };
    window.addEventListener('storage', onStorage);
    window.addEventListener('focus', onFocus);
    document.addEventListener('visibilitychange', onVisibility);
    return () => {
      window.removeEventListener('storage', onStorage);
      window.removeEventListener('focus', onFocus);
      document.removeEventListener('visibilitychange', onVisibility);
    };
  }, [user?.uid]);
  const [showAnswers, setShowAnswers] = useState<Record<string, boolean>>({});
  const [checkpointAnswers, setCheckpointAnswers] = useState<Record<number, number>>({});
  const [checkpointSubmitted, setCheckpointSubmitted] = useState(false);
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [quizAnswers, setQuizAnswers] = useState<Record<number, number>>({});
  const [finalExamQuestions, setFinalExamQuestions] = useState<any[]>([]);

  // Mini-game completion handler
  const handleMiniGameComplete = (_score: number) => {
    if (!activeModule) return;
    const isLastSection = activeSectionIdx === activeModule.sections.length - 1;
    setMiniGameDone(false);
    if (isLastSection) {
      setLessonStep('content');
      setActiveSectionIdx(0);
      setActiveLessonIdx(0);
      setCurrentView('quiz');
      setQuizAnswers({});
      setQuizSubmitted(false);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      setLessonStep('content');
      setActiveSectionIdx(prev => prev + 1);
      setActiveLessonIdx(0);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // Effect to select 50 random questions for final exam
  useEffect(() => {
    if (currentView === 'quiz' && activeModule?.id === 99) {
      const allQuestions = [...activeModule.quiz];
      const shuffled = allQuestions.sort(() => 0.5 - Math.random());
      setFinalExamQuestions(shuffled.slice(0, 50));
    }
  }, [currentView, activeModule]);

  const tracks = [
    {
      id: 'basics',
      title: 'DEEPFENSE BASIC',
      subtitle: isVi ? 'Khóa nền tảng đầy đủ' : 'Complete foundation course',
      progress: (() => {
        const totalLessons = basicsCourse.modules.reduce((acc, m) => acc + m.sections.reduce((sAcc, s) => sAcc + s.lessons.length, 0), 0);
        return totalLessons > 0 ? Math.round((completedLessons.length / totalLessons) * 100) : 0;
      })(),
      modulesCount: basicsCourse.modules.length,
      reward: '500 DPF',
      difficulty: isVi ? 'Cơ bản' : 'Basic',
      data: basicsCourse
    },
    {
      id: 'advance',
      title: 'DEEPFENSE ADVANCE',
      subtitle: isVi ? 'Phân tích bằng chứng' : 'Evidence Analysis',
      progress: 0,
      modulesCount: 6,
      reward: '750 DPF',
      difficulty: isVi ? 'Nâng cao' : 'Advanced',
      locked: true
    },
    {
      id: 'expert',
      title: 'DEEPFENSE EXPERT',
      subtitle: isVi ? 'Phòng thủ tổ chức' : 'Organizational Defense',
      progress: 0,
      modulesCount: 8,
      reward: '1000 DPF',
      difficulty: isVi ? 'Chuyên gia' : 'Expert',
      locked: true
    },
  ];

  const activeTrack = tracks.find(t => t.id === selectedCourseId);
  
  const pageRef = useScrollReveal({ selector: '[data-reveal]', preset: 'fade-up', stagger: 0.08 });
  const isSignedIn = !!user;

  // Sync view from search params if needed
  useEffect(() => {
    const courseId = searchParams.get('course');
    if (courseId) {
      setSelectedCourseId(courseId);
      setCurrentView('course');
    }
  }, [searchParams]);

  const hallOfFame = [
    { rank: '01', name: 'Hồ Xuân Nguyễn', credential: 'DEEPFENSE AWARE' },
    { rank: '02', name: 'Nguyễn Nhất Huy', credential: 'DEEPFENSE AWARE' },
    { rank: '03', name: 'Võ Phan Pháp', credential: 'DEEPFENSE AWARE' },
    { rank: '04', name: 'Trần Minh Nhất', credential: 'DEEPFENSE AWARE' },
  ];

  const labContent: Record<string, any> = {
    'lesson-5': {
      title: isVi ? 'Lab: Truy tìm dấu vết Deepfake' : 'Lab: Spot the Deepfake',
      description: isVi ? 'Phân tích các mẫu dưới đây. Xác định mẫu nào do AI tạo ra và tìm các lỗi phổ biến.' : 'Analyze the images below. Identify which ones are AI-generated and find the telltale signs.',
      samples: [
        {
          id: 'sample-1',
          image: '👤',
          label: isVi ? 'Chân dung 1' : 'Portrait 1',
          errors: isVi ? ['Mắt không đối xứng', 'Rìa nền bị mờ', 'Vân da không đồng nhất'] : ['Asymmetrical eyes', 'Blurry background edges', 'Skin texture inconsistency'],
          hint: isVi ? 'Nhìn kỹ vào đôi mắt - chúng có khớp nhau không?' : 'Look closely at the eyes - do they match?',
        },
        {
          id: 'sample-2',
          image: '👥',
          label: isVi ? 'Ảnh nhóm 1' : 'Group Photo 1',
          errors: isVi ? ['Bàn tay có thừa ngón', 'Kết cấu quần áo bị gãy', 'Lỗi hòa trộn khuôn mặt'] : ['Hand has extra fingers', 'Clothing texture breaks', 'Face blend artifacts'],
          hint: isVi ? 'Đếm số ngón tay thật cẩn thận.' : 'Count the fingers carefully.',
        },
      ],
    },
  };

  const stats = [
    { label: isVi ? 'Khóa học' : 'Enrolled', value: isSignedIn ? 1 : 0, icon: BookOpen, color: 'text-blue-400' },
    { label: isVi ? 'Thời gian' : 'Total Time', value: '45m', icon: Clock, color: 'text-cyan-400' },
    { label: isVi ? 'Đã xong' : 'Finished', value: completedLessons.length, icon: CheckCircle2, color: 'text-emerald-400' },
    { label: isVi ? 'Chứng chỉ' : 'Certs', value: (completedModules.includes(99) || (htmlCoursePassed && htmlCourseEvalDone)) ? 1 : 0, icon: Award, color: 'text-amber-400' },
  ];

  const WelcomeView = () => (
    <div className="animate-in fade-in duration-500">
      <section data-reveal className="relative overflow-hidden rounded-3xl border border-blue-500/20 bg-[#07111f]/90 p-6 md:p-10 mb-8 shadow-[0_24px_90px_rgba(0,0,0,0.35)]">
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
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-amber-400/25 bg-amber-400/10 text-amber-300 px-4 py-1.5 text-[10px] font-mono tracking-widest">
              <LockKeyhole size={12} />
              {isVi ? 'CẦN ĐĂNG NHẬP GOOGLE' : 'GOOGLE SIGN-IN REQUIRED'}
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
              <div className="w-full max-w-xl">
                <div className="mb-3 rounded-xl border border-blue-400/20 bg-blue-500/10 text-blue-100 p-4 text-sm leading-relaxed">
                  {isVi
                    ? 'Bạn cần đăng nhập bằng Google để vào hệ thống học, lưu tiến độ, làm quiz và mở certificate sau khi hoàn thành.'
                    : 'Please sign in with Google to enter the course system, save progress, take quizzes, and unlock the certificate after completion.'}
                </div>
                <GlowButton color="primary" size="lg" icon={<LogIn size={16} />} onClick={onGoogleAuth}>
                  {authBusy ? (isVi ? 'ĐANG MỞ GOOGLE...' : 'OPENING GOOGLE...') : (isVi ? 'ĐĂNG NHẬP GOOGLE ĐỂ BẮT ĐẦU' : 'SIGN IN WITH GOOGLE')}
                </GlowButton>
              </div>
            </div>
          </div>
        </div>

        <aside data-reveal className="xl:col-span-5">
          <div className="rounded-2xl border border-white/10 bg-white/[0.025] p-6">
            <div className="mb-5 flex items-center gap-2">
              <ShieldCheck size={15} className="text-primary" />
              <h2 className="text-white font-black uppercase tracking-widest text-sm">
                {isVi ? 'Những thứ bạn sẽ được học' : 'What you will learn'}
              </h2>
            </div>
            <div className="space-y-3">
              {roadmapData.map((module) => (
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

  const Dashboard = () => (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Certificate Claim (Only if passed final exam - via React course or standalone HTML reader) */}
      {(completedModules.includes(99) || (htmlCoursePassed && htmlCourseEvalDone)) && (
        <div className="glass-dark border border-amber-400/30 rounded-2xl p-6 bg-amber-400/5 relative overflow-hidden animate-in fade-in slide-in-from-right-4 duration-1000">
          <div className="absolute top-0 right-0 p-4 opacity-10">
            <Award size={100} className="text-amber-400" />
          </div>
          <div className="relative z-10">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div className="flex items-center gap-4">
                <div className="bg-amber-400/20 p-3 rounded-xl text-amber-400 shadow-[0_0_20px_rgba(245,158,11,0.2)]">
                  <Award size={32} />
                </div>
                <div>
                  <h3 className="text-white font-black uppercase italic tracking-wider text-lg">CHỨNG CHỈ CỦA BẠN</h3>
                  <p className="text-[10px] text-amber-400 font-mono uppercase tracking-[0.2em]">{isVi ? 'ĐÃ HOÀN THÀNH DEEPFENSE BASIC' : 'DEEPFENSE BASIC CERTIFIED'}</p>
                </div>
              </div>
              
              <div className="flex flex-wrap gap-3">
                <a 
                  href="/academy/certificate-template/certificate-template.html" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-amber-400 px-6 py-3 text-xs font-black uppercase tracking-widest text-black hover:bg-amber-300 transition-all shadow-[0_0_20px_rgba(245,158,11,0.3)]"
                >
                  <Award size={16} /> {isVi ? 'TẢI CHỨNG CHỈ' : 'DOWNLOAD CERTIFICATE'}
                </a>
                <button 
                  onClick={() => navigate('/academy/verify')}
                  className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/5 px-6 py-3 text-xs font-black uppercase tracking-widest text-white hover:bg-white/10 transition-all"
                >
                  <ExternalLink size={16} /> {isVi ? 'TRANG XÁC MINH' : 'VERIFY PAGE'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
        {stats.map((stat, idx) => (
          <div key={idx} className="glass-dark rounded-xl p-4 md:p-5 border border-white/10 hover:border-blue-500/30 transition-all group">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-[10px] font-bold uppercase tracking-wider text-gray-500">{stat.label}</h3>
              <stat.icon className={`w-4 h-4 ${stat.color} group-hover:scale-110 transition-transform`} />
            </div>
            <p className="text-xl md:text-2xl font-black text-white">{stat.value}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-8 space-y-6">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-xl font-black uppercase text-white flex items-center gap-2">
              <LayoutDashboard className="text-blue-400" size={20} />
              {isVi ? 'Lộ trình của tôi' : 'My Courses'}
            </h2>
          </div>

          <div className="space-y-4">
            {tracks.map((track) => (
              <div
                key={track.id}
                className={`glass-dark rounded-2xl p-6 border transition-all relative overflow-hidden group ${track.locked ? 'border-white/5 opacity-60 grayscale cursor-not-allowed' : 'border-white/10 hover:border-blue-500/40 cursor-pointer'}`}
                onClick={() => {
                  if (track.locked) return;
                  if (track.id === 'basics') {
                    // Ghi session để /academy/basics/ auth gate cho qua
                    if (user) {
                      try {
                        localStorage.setItem('dfb_session_v1', JSON.stringify({
                          uid: user.uid,
                          loginAt: Date.now(),
                        }));
                      } catch {}
                    }
                    window.location.href = '/academy/basics/';
                  } else {
                    setSelectedCourseId(track.id);
                    setCurrentView('course');
                  }
                }}
              >
                <div className="flex items-start justify-between mb-4 relative z-10">
                  <div>
                    <div className="inline-flex items-center gap-2 px-2 py-0.5 rounded bg-blue-500/10 border border-blue-500/20 text-[10px] font-mono text-blue-300 mb-2 uppercase tracking-widest">
                      {isVi ? 'KHÓA HỌC' : 'COURSE'}
                    </div>
                    <h3 className="text-xl font-black text-white mb-1 group-hover:text-blue-400 transition-colors">{track.title}</h3>
                    <p className="text-sm text-gray-400">{track.subtitle}</p>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center gap-2 justify-end">
                      {track.progress === 100 && <CheckCircle2 size={20} className="text-emerald-400" />}
                      <span className="text-2xl font-black text-blue-400">{track.progress}%</span>
                    </div>
                    <p className="text-[10px] uppercase tracking-tighter text-gray-500 mt-1">Reward: {track.reward}</p>
                  </div>
                </div>

                <div className="w-full bg-white/5 rounded-full h-1.5 overflow-hidden relative z-10">
                  <div
                    className={`h-full transition-all duration-700 ease-out ${track.progress === 100 ? 'bg-emerald-500' : 'bg-gradient-to-r from-blue-500 to-cyan-400'}`}
                    style={{ width: `${track.progress}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="lg:col-span-4 space-y-6">
          {/* Course Info Section */}
          <div className="glass-dark border border-blue-500/20 rounded-2xl p-6 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-10">
              <GraduationCap size={80} className="text-blue-400" />
            </div>
            <h3 className="font-black text-white uppercase tracking-widest text-[10px] mb-4 flex items-center gap-2">
              <BookOpen className="text-blue-400" size={14} /> 
              {isVi ? 'Thông tin đào tạo' : 'Course Overview'}
            </h3>
            
            <div className="space-y-5 relative z-10">
              <div>
                <p className="text-[9px] font-black text-blue-400 uppercase tracking-widest mb-2">{isVi ? 'Bạn sẽ được học:' : "What you'll learn:"}</p>
                <ul className="space-y-1.5">
                  {[
                    isVi ? 'Khái niệm & Phân loại Deepfake' : 'Deepfake Concepts & Types',
                    isVi ? 'Tâm lý học hành vi lừa đảo' : 'Scam Behavior Psychology',
                    isVi ? 'Quy trình kiểm chứng 4 bước' : '4-Step Verification Workflow'
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-[11px] text-gray-400">
                      <div className="w-1 h-1 rounded-full bg-blue-500 mt-1.5 shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <p className="text-[9px] font-black text-emerald-400 uppercase tracking-widest mb-2">{isVi ? 'Bạn sẽ được thực hành:' : "What you'll practice:"}</p>
                <ul className="space-y-1.5">
                  {[
                    isVi ? 'Phân tích nhiễu ảnh & âm thanh' : 'Visual & Audio Artifact Analysis',
                    isVi ? 'Truy vết nguồn gốc metadata' : 'Metadata Origin Tracing',
                    isVi ? 'Lab nhận diện tình huống thực' : 'Real-world Scenario Labs'
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-[11px] text-gray-400">
                      <div className="w-1 h-1 rounded-full bg-emerald-500 mt-1.5 shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <p className="text-[9px] font-black text-amber-400 uppercase tracking-widest mb-2">{isVi ? 'Bạn sẽ nhận được:' : "What you'll earn:"}</p>
                <ul className="space-y-1.5">
                  {[
                    isVi ? 'Chứng chỉ DEEPFENSE AWARE' : 'DEEPFENSE AWARE Certificate',
                    isVi ? 'Thưởng DPF Coin (lên tới 1000)' : 'Up to 1000 DPF Reward Coins',
                    isVi ? 'Hồ sơ năng lực an toàn số' : 'Digital Safety Competency Profile'
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-[11px] text-gray-400">
                      <div className="w-1 h-1 rounded-full bg-amber-500 mt-1.5 shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Hall of Fame Section */}
          <div className="glass-dark border border-amber-400/20 rounded-2xl p-6 relative overflow-hidden">
             <h3 className="font-black text-white uppercase tracking-widest text-[10px] mb-4 flex items-center gap-2">
               <Trophy className="text-amber-400" size={14} /> 
               {isVi ? 'Bảng vinh danh' : 'Hall of Fame'}
             </h3>
             <div className="space-y-3">
               {hallOfFame.map((learner, i) => (
                 <div key={i} className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/5">
                   <div className="flex items-center gap-3">
                     <span className="text-[10px] font-mono text-amber-300">#{learner.rank}</span>
                     <div className="flex flex-col">
                       <span className="text-[11px] font-bold text-white truncate max-w-[120px]">{learner.name}</span>
                       <span className="text-[9px] text-gray-500 uppercase tracking-tighter">{learner.credential}</span>
                     </div>
                   </div>
                   <Trophy size={12} className="text-amber-400/50" />
                 </div>
               ))}
             </div>
          </div>

          {/* Sign In Prompt */}
          {!isSignedIn ? (
            <div className="glass-dark border border-blue-500/20 rounded-2xl p-6">
              <h3 className="font-black text-white uppercase tracking-widest text-[10px] mb-2 flex items-center gap-2">
                <LockKeyhole className="text-blue-400" size={14} />
                {isVi ? 'Yêu cầu đăng nhập' : 'Sign-in required'}
              </h3>
              <p className="text-[11px] text-gray-500 mb-4 leading-relaxed">
                {isVi ? 'Đăng nhập Google để lưu tiến độ và nhận DPF.' : 'Sign in with Google to save progress and earn DPF.'}
              </p>
              <GlowButton color="secondary" size="sm" className="w-full" onClick={onGoogleAuth} icon={<LogIn size={14} />}>
                {authBusy ? '...' : (isVi ? 'ĐĂNG NHẬP' : 'SIGN IN')}
              </GlowButton>
            </div>
          ) : (
            <>
              {user?.email === 'deepfense@gmail.com' && (
                <div className="glass-dark border border-blue-500/20 rounded-2xl p-6 mb-4">
                  <h3 className="font-black text-blue-400 uppercase tracking-widest text-[10px] mb-2 flex items-center gap-2">
                    <Sparkles size={14} />
                    DEV TOOLS (ADMIN ONLY)
                  </h3>
                  <p className="text-[11px] text-gray-500 mb-4 leading-relaxed">
                    Hoàn thành nhanh 100% khóa học để kiểm tra chứng chỉ (Certificate).
                  </p>
                  <div className="flex flex-col gap-2">
                    <button
                      onClick={() => {
                        if (!user?.uid || user.email !== 'deepfense@gmail.com') return;
                        const uid = user.uid;
                        const allModuleIds = basicsCourse.modules.map(m => m.id);
                        const allLessonIds: string[] = [];
                        basicsCourse.modules.forEach(m => {
                          m.sections.forEach(s => {
                            s.lessons.forEach(l => {
                              allLessonIds.push(l.id);
                            });
                          });
                        });

                        // ── Legacy keys (Academy.tsx internal state) ──
                        legacyProgressKeys.forEach(key => localStorage.removeItem(key));

                        setCompletedModules(allModuleIds);
                        setCompletedLessons(allLessonIds);
                        localStorage.setItem(storageKey('df_completed_modules', uid), JSON.stringify(allModuleIds));
                        localStorage.setItem(storageKey('df_completed_lessons', uid), JSON.stringify(allLessonIds));

                        // ── /academy/basics/ SPA keys ──
                        // Lesson + module progress
                        localStorage.setItem(storageKey('dfb_progress_v2', uid), JSON.stringify({
                          uid,
                          completed: allLessonIds,
                          currentLessonId: null,
                        }));
                        localStorage.setItem(storageKey('dfb_module_sync_v1', uid), JSON.stringify({
                          uid,
                          completedModules: allModuleIds,
                          updatedAt: Date.now(),
                        }));
                        // Final exam passed
                        localStorage.setItem(storageKey('dfb_exam_v1', uid), JSON.stringify({
                          uid,
                          passed: true,
                          passedAt: Date.now(),
                          bestScore: 50,
                          attempts: 1,
                        }));
                        // Certificate name
                        if (user?.displayName) {
                          localStorage.setItem(storageKey('dfb_cert_name', uid), user.displayName);
                        }
                        // Session (đảm bảo auth gate cho qua)
                        if (user) {
                          localStorage.setItem('dfb_session_v1', JSON.stringify({
                            uid,
                            email: user.email || '',
                            isAdmin: true,
                            loginAt: Date.now(),
                          }));
                        }

                        alert('AUTO COMPLETE: Đã ghi xong tất cả keys. Đang reload...');
                        window.location.reload();
                      }}
                      className="w-full py-2 rounded-xl bg-blue-500/10 border border-blue-500/20 text-blue-400 text-[10px] font-black uppercase tracking-widest hover:bg-blue-500/20 transition-all"
                    >
                      AUTO COMPLETE 100%
                    </button>
                    <button
                      onClick={() => {
                        if (!user?.uid || user.email !== 'deepfense@gmail.com') return;
                        legacyProgressKeys.forEach(key => {
                          localStorage.removeItem(storageKey(key, user.uid));
                          localStorage.removeItem(key);
                        });
                        window.location.reload();
                      }}
                      className="w-full py-2 rounded-xl bg-red-500/5 border border-red-500/10 text-red-500/50 text-[10px] font-black uppercase tracking-widest hover:bg-red-500/10 transition-all"
                    >
                      RESET ALL
                    </button>
                  </div>
                </div>
              )}

              {user?.email === 'deepfense@gmail.com' && (
                <div className="glass-dark border border-red-500/20 rounded-2xl p-6">
                  <h3 className="font-black text-red-400 uppercase tracking-widest text-[10px] mb-2 flex items-center gap-2">
                    <AlertCircle size={14} />
                    {isVi ? 'VÙNG NGUY HIỂM' : 'DANGER ZONE'}
                  </h3>
                  <p className="text-[11px] text-gray-500 mb-4">
                    {isVi ? 'Xóa toàn bộ tiến độ học tập của bạn?' : 'Reset all your learning progress?'}
                  </p>
                  <button 
                    onClick={() => {
                      if (window.confirm(isVi ? 'Bạn có chắc chắn muốn xóa hết tiến độ?' : 'Are you sure you want to reset all progress?')) {
                        setCompletedLessons([]);
                        setCompletedModules([]);
                      }
                    }}
                    className="w-full py-2 rounded-xl bg-red-500/10 border border-red-500/20 text-red-500 text-[10px] font-black uppercase tracking-widest hover:bg-red-500/20 transition-all"
                  >
                    {isVi ? 'RESET TIẾN ĐỘ' : 'RESET PROGRESS'}
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );

  const CourseView = () => {
    const track = tracks.find((t) => t.id === selectedCourseId);
    if (!track || !track.data) return null;

    return (
      <div className="space-y-6 animate-in fade-in duration-500">
        <button
          onClick={() => setCurrentView('dashboard')}
          className="inline-flex items-center gap-2 text-blue-400 hover:text-white transition-colors font-black uppercase text-xs tracking-widest"
        >
          <ChevronLeft size={16} /> {isVi ? 'Quay lại Dashboard' : 'Back to Dashboard'}
        </button>

        <div className="relative overflow-hidden rounded-3xl border border-blue-500/30 bg-gradient-to-br from-blue-900/40 to-black p-8 md:p-12 shadow-2xl">
          <div className="absolute -right-20 -top-20 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl" />
          <div className="relative z-10">
            <h1 className="text-3xl md:text-5xl font-black text-white mb-4 uppercase leading-tight italic">{track.title}</h1>
            <p className="text-gray-400 text-sm max-w-2xl mb-8 leading-relaxed italic">{basicsCourse.modules[0].scenario}</p>
            <div className="flex flex-col md:flex-row md:items-center gap-8">
              <div className="shrink-0">
                <p className="text-gray-500 text-[10px] uppercase tracking-[0.2em] mb-1">{isVi ? 'Tiến độ tổng thể' : 'Overall Progress'}</p>
                <p className="text-5xl font-black text-blue-400">{track.progress}%</p>
              </div>
              <div className="flex-1 h-2 bg-white/10 rounded-full overflow-hidden">
                <div
                  className={`h-full transition-all duration-1000 ${track.progress === 100 ? 'bg-emerald-500' : 'bg-gradient-to-r from-blue-500 to-cyan-400'}`}
                  style={{ width: `${track.progress}%` }}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <h2 className="text-xl font-black text-white uppercase tracking-widest mb-4 flex items-center gap-2">
            <BookOpen size={20} className="text-blue-400" />
            {isVi ? 'Các module đào tạo' : 'Training Modules'}
          </h2>
          
          <div className="grid grid-cols-1 gap-4">
            {track.data.modules.map((module, idx) => {
              const isDone = completedModules.includes(module.id);
              const prevModuleDone = idx === 0 || completedModules.includes(track.data.modules[idx-1].id);
              const isLocked = !prevModuleDone;

              return (
                <div
                  key={module.id}
                  className={`p-6 rounded-2xl border transition-all cursor-pointer group relative overflow-hidden ${
                    isLocked ? 'opacity-50 grayscale border-white/5 bg-white/5 cursor-not-allowed' : 
                    isDone ? 'bg-emerald-500/5 border-emerald-500/20 hover:border-emerald-500/40' :
                    'glass-dark border-white/10 hover:border-blue-500/30'
                  }`}
                  onClick={() => {
                    if (isLocked) return;
                    if (!isSignedIn) {
                      onGoogleAuth();
                      return;
                    }
                    setActiveModule(module);
                    setActiveSectionIdx(0);
                    setActiveLessonIdx(0);
                    setLessonStep('content');
                    setCurrentView('lesson');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                >
                  <div className="flex items-center justify-between relative z-10">
                    <div className="flex items-center gap-5">
                      <div className={`w-10 h-10 rounded-xl border flex items-center justify-center font-black text-sm ${
                        isDone ? 'bg-emerald-500/20 border-emerald-500/30 text-emerald-400' : 
                        isLocked ? 'bg-white/5 border-white/5 text-gray-600' :
                        'bg-blue-500/10 border-blue-500/20 text-blue-400'
                      }`}>
                        {isDone ? <CheckCircle2 size={20} /> : module.id}
                      </div>
                      <div>
                        <h3 className={`font-bold text-lg transition-colors ${isDone ? 'text-emerald-300' : 'text-white group-hover:text-blue-400'}`}>{module.title}</h3>
                        <div className="flex items-center gap-4 mt-1 text-[10px] font-mono text-gray-500">
                          <span className="flex items-center gap-1">
                            <Clock className="w-3 h-3" /> {module.duration}
                          </span>
                          <span className={`px-2 py-0.5 rounded uppercase tracking-widest border ${
                            module.level === 'Foundation' ? 'bg-blue-500/10 text-blue-300 border-blue-500/20' :
                            module.level === 'Recognition' ? 'bg-amber-500/10 text-amber-300 border-amber-500/20' :
                            'bg-red-500/10 text-red-300 border-red-500/20'
                          }`}>
                            {module.level}
                          </span>
                        </div>
                      </div>
                    </div>
                    {isLocked ? (
                      <LockKeyhole size={18} className="text-gray-600" />
                    ) : isDone ? (
                      <div className="text-[10px] font-black text-emerald-500 uppercase tracking-widest">{isVi ? 'HOÀN THÀNH' : 'COMPLETED'}</div>
                    ) : (
                      <div className="flex items-center gap-2 text-[10px] font-black uppercase text-blue-400 opacity-0 group-hover:opacity-100 transition-all transform translate-x-2 group-hover:translate-x-0">
                        {isVi ? 'VÀO HỌC' : 'ENTER'} <Play size={12} fill="currentColor" />
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  };

  const QuizView = () => {
    if (!activeModule) return null;
    const questions = activeModule.id === 99 ? finalExamQuestions : activeModule.quiz;
    
    if (questions.length === 0) {
      return (
        <div className="text-center py-20 glass-dark rounded-3xl border border-white/10">
          <CheckCircle2 size={64} className="text-emerald-500 mx-auto mb-6" />
          <h2 className="text-2xl font-black text-white uppercase mb-2">{isVi ? 'Hoàn thành Module!' : 'Module Completed!'}</h2>
          <p className="text-gray-400 mb-8">{isVi ? 'Module này chưa có bài trắc nghiệm.' : 'This module does not have a quiz yet.'}</p>
          <GlowButton color="primary" onClick={() => {
            setCurrentView('course');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}>
            {isVi ? 'QUAY LẠI LỘ TRÌNH' : 'BACK TO COURSE'}
          </GlowButton>
        </div>
      );
    }

    const score = Object.entries(quizAnswers).reduce((acc, [idx, ans]) => {
      return acc + (ans === questions[parseInt(idx)].answer ? 1 : 0);
    }, 0);
    const pass = score >= questions.length * 0.7;

    return (
      <div className="max-w-3xl mx-auto space-y-8 animate-in fade-in zoom-in-95 duration-500">
        <div className="text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-[10px] font-black text-amber-400 uppercase tracking-[0.2em] mb-4">
            <Zap size={12} /> {isVi ? 'Bài trắc nghiệm cuối module' : 'Module Final Quiz'}
          </div>
          <h1 className="text-3xl md:text-4xl font-black text-white mb-2 uppercase">{activeModule.title}</h1>
          <p className="text-gray-500 text-sm">{isVi ? 'Trả lời đúng 70% để vượt qua' : 'Score 70% to pass'}</p>
        </div>

        <div className="space-y-6">
          {questions.map((q, qIdx) => (
            <div key={qIdx} className="glass-dark border border-white/10 rounded-2xl p-6 md:p-8">
              <p className="text-white font-bold text-lg mb-6 leading-relaxed">
                <span className="text-blue-400 mr-2">Q{qIdx + 1}.</span> {q.text}
              </p>
              <div className="grid grid-cols-1 gap-3">
                {q.options.map((opt: string, oIdx: number) => {
                  const isSelected = quizAnswers[qIdx] === oIdx;
                  const isCorrect = oIdx === q.answer;
                  const showResult = quizSubmitted;
                  
                  return (
                    <button
                      key={oIdx}
                      disabled={quizSubmitted}
                      onClick={() => setQuizAnswers(prev => ({ ...prev, [qIdx]: oIdx }))}
                      className={`p-4 rounded-xl text-left transition-all border flex items-center justify-between ${
                        showResult
                          ? isCorrect
                            ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300'
                            : isSelected
                              ? 'bg-red-500/10 border-red-500/30 text-red-300'
                              : 'bg-white/5 border-white/5 opacity-40'
                          : isSelected
                            ? 'bg-blue-500/10 border-blue-500/30 text-blue-300 ring-1 ring-blue-500/20'
                            : 'bg-white/5 border-white/5 hover:border-white/20 text-gray-400'
                      }`}
                    >
                      <span className="text-sm font-medium">{opt}</span>
                      {showResult && isCorrect && <CheckCircle2 size={16} className="text-emerald-500" />}
                      {showResult && isSelected && !isCorrect && <AlertCircle size={16} className="text-red-500" />}
                    </button>
                  );
                })}
              </div>
              {quizSubmitted && q.explanation && (
                <div className="mt-4 p-4 rounded-xl bg-blue-500/5 border border-blue-500/10 text-xs text-blue-300 italic leading-relaxed">
                  <span className="font-black mr-2 uppercase tracking-widest">{isVi ? 'Giải thích:' : 'Explanation:'}</span>
                  {q.explanation}
                </div>
              )}
            </div>
          ))}
        </div>

        {!quizSubmitted ? (
          <div className="sticky bottom-6 p-4 glass-dark border border-blue-500/30 rounded-2xl shadow-2xl flex items-center justify-between gap-6">
            <p className="text-xs text-gray-400">
              {Object.keys(quizAnswers).length} / {questions.length} {isVi ? 'đã trả lời' : 'answered'}
            </p>
            <GlowButton
              color="primary"
              disabled={Object.keys(quizAnswers).length < questions.length}
              onClick={() => {
                setQuizSubmitted(true);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            >
              {isVi ? 'NỘP BÀI KIỂM TRA' : 'SUBMIT QUIZ'}
            </GlowButton>
          </div>
        ) : (
          <div className={`p-8 rounded-3xl border text-center space-y-6 ${pass ? 'bg-emerald-500/10 border-emerald-500/30' : 'bg-red-500/10 border-red-500/30'}`}>
            <div className={`w-20 h-20 rounded-full flex items-center justify-center mx-auto text-3xl mb-2 ${pass ? 'bg-emerald-500/20 text-emerald-400' : 'bg-red-500/20 text-red-400'}`}>
              {pass ? <Trophy size={40} /> : <AlertCircle size={40} />}
            </div>
            <div>
              <h2 className="text-3xl font-black text-white uppercase mb-2">
                {pass ? (isVi ? 'CHÚC MỪNG!' : 'CONGRATULATIONS!') : (isVi ? 'CHƯA ĐẠT' : 'KEEP TRYING')}
              </h2>
              <p className="text-xl font-bold text-white">
                {isVi ? 'Điểm của bạn:' : 'Your score:'} <span className={pass ? 'text-emerald-400' : 'text-red-400'}>{score}/{questions.length}</span>
              </p>
            </div>
            <p className="text-gray-400 max-w-md mx-auto">
              {pass 
                ? (isVi ? 'Bạn đã vượt qua bài kiểm tra và hoàn thành module này. Tiếp tục lộ trình để nhận chứng chỉ.' : 'You passed the quiz and completed this module. Continue your journey to earn your certificate.')
                : (isVi ? 'Rất tiếc, bạn cần ít nhất 70% điểm để vượt qua. Hãy xem lại bài học và thử lại nhé.' : 'Sorry, you need at least 70% to pass. Review the lessons and try again.')
              }
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              {pass ? (
                  <GlowButton color="primary" size="lg" onClick={() => {
                    setCompletedModules(prev => [...new Set([...prev, activeModule.id])]);
                    setCurrentView('course');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}>
                  {activeModule.id === 99 ? (isVi ? 'NHẬN CHỨNG CHỈ' : 'GET CERTIFICATE') : (isVi ? 'TIẾP TỤC LỘ TRÌNH' : 'CONTINUE LEARNING')}
                </GlowButton>
              ) : (
                <button 
                  onClick={() => {
                    setQuizSubmitted(false);
                    setQuizAnswers({});
                  }}
                  className="px-8 py-3 rounded-xl bg-white/10 border border-white/20 text-white font-black uppercase tracking-widest hover:bg-white/20 transition-all"
                >
                  {isVi ? 'THỬ LẠI' : 'TRY AGAIN'}
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    );
  };

  const LessonView = () => {
    if (!activeModule) return null;
    const section = activeModule.sections[activeSectionIdx];
    const lesson = section?.lessons[activeLessonIdx];

    if (!section || !lesson) return null;

    const hasCheckpoint = !!section.checkpoint;
    const isReview = lessonStep === 'review';
    const isCheckpoint = lessonStep === 'checkpoint';
    const hasMiniGame = !!(section.checkpoint?.miniGame);

    const isFirstLesson = activeSectionIdx === 0 && activeLessonIdx === 0;

    return (
      <div className="space-y-6 animate-in fade-in duration-500 pb-20">
        {isFirstLesson && (
          <div className="p-8 rounded-3xl border border-blue-500/30 bg-gradient-to-br from-blue-900/40 to-black relative overflow-hidden mb-10">
            <div className="absolute -right-20 -top-20 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl" />
            <div className="relative z-10">
              <h4 className="text-[10px] font-black text-blue-400 uppercase tracking-widest mb-4 flex items-center gap-2">
                <Brain size={14} /> {isVi ? 'BỐI CẢNH MODULE' : 'MODULE SCENARIO'}
              </h4>
              <p className="text-gray-300 italic leading-relaxed text-sm">"{activeModule.scenario}"</p>
            </div>
          </div>
        )}

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <button
            onClick={() => {
              setCurrentView('course');
              setLessonStep('content');
            }}
            className="inline-flex items-center gap-2 text-blue-400 hover:text-white transition-colors font-black uppercase text-xs tracking-widest"
          >
            <ChevronLeft size={16} /> {isVi ? 'Quay lại Module' : 'Back to Module'}
          </button>
          
          <div className="flex items-center gap-1 overflow-x-auto pb-2 md:pb-0 no-scrollbar">
            {activeModule.sections.map((s, idx) => {
              const sectionId = `${activeModule.id}-${idx}`;
              const isSectionDone = completedLessons.some(id => id.startsWith(sectionId));
              
              return (
                <button
                  key={idx}
                  disabled={isCheckpoint || isReview}
                  onClick={() => {
                    setActiveSectionIdx(idx);
                    setActiveLessonIdx(0);
                    setCheckpointSubmitted(false);
                    setLessonStep('content');
                  }}
                  className={`px-3 py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-widest border whitespace-nowrap transition-all flex items-center gap-2 ${
                    idx === activeSectionIdx 
                      ? 'bg-blue-500 text-white border-blue-400' 
                      : isSectionDone
                        ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
                        : 'bg-white/5 text-gray-500 border-white/5 hover:border-white/20'
                  } ${(isCheckpoint || isReview) ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                  {isSectionDone && <CheckCircle2 size={12} />}
                  {s.title}
                </button>
              );
            })}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-8 space-y-6">
            {lessonStep === 'content' && (
              <div className="glass-dark border border-white/10 rounded-3xl p-8 md:p-10 relative overflow-hidden min-h-[400px]">
                <div className="absolute top-0 right-0 p-8 opacity-5">
                  <BookOpen size={120} className="text-blue-400" />
                </div>
                
                <div className="relative z-10">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="px-2 py-0.5 rounded bg-blue-500/10 border border-blue-500/20 text-[9px] font-mono text-blue-400 uppercase tracking-widest">
                      {lesson.id}
                    </span>
                    <span className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">
                      {section.title}
                    </span>
                  </div>
                  
                  <h1 className="text-3xl md:text-4xl font-black text-white mb-8 uppercase leading-tight italic">{lesson.title}</h1>
                  
                  {lesson.blocks && lesson.blocks.length > 0 ? (
                    <div className="space-y-4">
                      {lesson.blocks.map((block, bi) => (
                        <LessonContentBlock
                          key={bi}
                          block={block}
                          lang={lang}
                          lessonId={lesson.id}
                          blockIndex={bi}
                        />
                      ))}
                    </div>
                  ) : (
                    <div className="prose prose-invert prose-blue max-w-none">
                      {lesson.paragraphs.map((p, i) => (
                        <p key={i} className="text-gray-300 text-base leading-relaxed mb-6 last:mb-0">
                          {p}
                        </p>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}

            {lessonStep === 'review' && (
              <div className="glass-dark border border-amber-500/30 rounded-3xl p-8 md:p-10 animate-in zoom-in-95 duration-500">
                <div className="text-center mb-8">
                  <div className="w-16 h-16 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 mx-auto mb-4 shadow-[0_0_20px_rgba(245,158,11,0.2)]">
                    <Brain size={32} />
                  </div>
                  <h2 className="text-2xl font-black text-white uppercase italic">{isVi ? 'ĐIỂM CẦN NHỚ' : 'KEY TAKEAWAYS'}</h2>
                  <p className="text-xs text-gray-500 font-mono mt-2 uppercase tracking-widest">
                    {isVi ? 'Tóm tắt kiến thức trước khi kiểm tra' : 'Summary before the checkpoint'}
                  </p>
                </div>

                <div className="space-y-4">
                  {section.lessons.flatMap(l => l.takeaways).map((tk, idx) => (
                    <div key={idx} className="flex items-start gap-4 p-5 rounded-2xl bg-white/5 border border-white/5 hover:border-amber-500/20 transition-all group">
                      <div className="w-8 h-8 rounded-lg bg-amber-500/10 flex items-center justify-center text-amber-500 shrink-0 group-hover:scale-110 transition-transform">
                        <Zap size={14} />
                      </div>
                      <p className="text-gray-300 text-sm font-bold leading-relaxed">{tk}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {lessonStep === 'checkpoint' && (
              <div className="space-y-6 animate-in slide-in-from-bottom-8 duration-500">
                {section.checkpoint?.miniGame ? (
                  /* ── Mini-game replaces quiz ── */
                  <LessonMiniGame
                    config={section.checkpoint.miniGame}
                    lang={lang}
                    onComplete={handleMiniGameComplete}
                  />
                ) : (
                  /* ── Standard quiz checkpoint ── */
                  <>
                    <div className="glass-dark border border-amber-500/20 rounded-2xl p-6 flex items-center gap-4 mb-4">
                      <ShieldCheck size={32} className="text-amber-400" />
                      <div>
                        <h3 className="text-lg font-black text-white uppercase italic">{isVi ? 'KIỂM TRA NHANH' : 'QUICK CHECK'}</h3>
                        <p className="text-[10px] text-gray-500 uppercase tracking-widest font-mono">{section.checkpoint?.label}</p>
                      </div>
                    </div>

                    {section.checkpoint?.questions.map((q, qIdx) => (
                      <div key={qIdx} className="glass-dark border border-white/10 rounded-2xl p-6 md:p-8">
                        <p className="text-white font-bold text-lg mb-6 leading-relaxed flex items-start gap-4">
                          <span className="text-amber-400 font-black italic shrink-0">#{qIdx + 1}</span>
                          <span>{q.text}</span>
                        </p>
                        <div className="grid grid-cols-1 gap-3">
                          {q.options.map((opt: string, oIdx: number) => {
                            const isSelected = checkpointAnswers[qIdx] === oIdx;
                            const isCorrect = oIdx === q.answer;
                            const showResult = checkpointSubmitted;

                            return (
                              <button
                                key={oIdx}
                                disabled={checkpointSubmitted}
                                onClick={() => setCheckpointAnswers(prev => ({ ...prev, [qIdx]: oIdx }))}
                                className={`p-4 rounded-xl text-left transition-all border flex items-center justify-between group ${
                                  showResult
                                    ? isCorrect
                                      ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400'
                                      : isSelected
                                        ? 'bg-red-500/10 border-red-500/30 text-red-400'
                                        : 'bg-white/5 border-white/5 opacity-40'
                                    : isSelected
                                      ? 'bg-amber-500/10 border-amber-500/30 text-amber-300 ring-1 ring-amber-500/20'
                                      : 'bg-white/5 border-white/5 hover:border-white/20 text-gray-400'
                                }`}
                              >
                                <span className="text-sm font-bold">{opt}</span>
                                {!showResult && isSelected && <Zap size={14} className="text-amber-400 animate-pulse" />}
                              </button>
                            );
                          })}
                        </div>
                        {checkpointSubmitted && q.explanation && (
                          <div className="mt-4 p-4 rounded-xl bg-amber-500/5 border border-amber-500/10 text-[11px] text-amber-300/80 italic leading-relaxed">
                            <span className="font-black mr-2 uppercase tracking-widest">{isVi ? 'Gợi ý:' : 'Hint:'}</span>
                            {q.explanation}
                          </div>
                        )}
                      </div>
                    ))}
                  </>
                )}
              </div>
            )}

            <div className="flex items-center justify-between gap-4 mt-8">
              <button 
                onClick={() => {
                  if (lessonStep === 'checkpoint') setLessonStep('review');
                  else if (lessonStep === 'review') setLessonStep('content');
                  else if (activeLessonIdx > 0) setActiveLessonIdx(prev => prev - 1);
                  else if (activeSectionIdx > 0) {
                    const prevSection = activeModule.sections[activeSectionIdx - 1];
                    setActiveSectionIdx(activeSectionIdx - 1);
                    setActiveLessonIdx(prevSection.lessons.length - 1);
                  }
                }}
                className={`px-6 py-3 rounded-xl border border-white/10 text-white font-black uppercase tracking-widest text-[10px] hover:bg-white/5 transition-all ${activeLessonIdx === 0 && activeSectionIdx === 0 && lessonStep === 'content' ? 'opacity-0 pointer-events-none' : ''}`}
              >
                {isVi ? 'TRƯỚC' : 'BACK'}
              </button>

              {!(isCheckpoint && hasMiniGame) && <GlowButton
                color={isCheckpoint ? 'secondary' : 'primary'}
                onClick={() => {
                  if (lessonStep === 'content') {
                    if (!completedLessons.includes(lesson.id)) {
                      setCompletedLessons(prev => [...new Set([...prev, lesson.id])]);
                    }
                    const isLastLesson = activeLessonIdx === section.lessons.length - 1;
                    if (isLastLesson && hasCheckpoint) {
                      setLessonStep('review');
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    } else if (isLastLesson) {
                      if (activeSectionIdx < activeModule.sections.length - 1) {
                        setActiveSectionIdx(prev => prev + 1);
                        setActiveLessonIdx(0);
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      } else {
                        setCurrentView('quiz');
                        setQuizAnswers({});
                        setQuizSubmitted(false);
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }
                    } else {
                      setActiveLessonIdx(prev => prev + 1);
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }
                  } else if (lessonStep === 'review') {
                    setLessonStep('checkpoint');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  } else if (lessonStep === 'checkpoint') {
                    if (!checkpointSubmitted) {
                      setCheckpointSubmitted(true);
                    } else {
                      const isLastSection = activeSectionIdx === activeModule.sections.length - 1;
                      if (isLastSection) {
                        setLessonStep('content');
                        setActiveSectionIdx(0);
                        setActiveLessonIdx(0);
                        setCheckpointSubmitted(false);
                        setCheckpointAnswers({});
                        setCurrentView('quiz');
                        setQuizAnswers({});
                        setQuizSubmitted(false);
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      } else {
                        setLessonStep('content');
                        setActiveSectionIdx(prev => prev + 1);
                        setActiveLessonIdx(0);
                        setCheckpointSubmitted(false);
                        setCheckpointAnswers({});
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }
                    }
                  }
                }}
              >
                {lessonStep === 'content' 
                  ? (activeLessonIdx === section.lessons.length - 1 && hasCheckpoint ? (isVi ? 'ĐIỂM CẦN NHỚ' : 'REVIEW') : (isVi ? 'TIẾP THEO' : 'NEXT'))
                  : lessonStep === 'review'
                    ? (isVi ? 'BẮT ĐẦU KIỂM TRA' : 'START TEST')
                    : !checkpointSubmitted
                      ? (isVi ? 'XÁC NHẬN' : 'SUBMIT')
                      : (activeSectionIdx === activeModule.sections.length - 1 ? (isVi ? 'VÀO BÀI THI MODULE' : 'MODULE QUIZ') : (isVi ? 'TIẾP TỤC' : 'CONTINUE'))}
              </GlowButton>}
            </div>
          </div>

          <div className="lg:col-span-4 space-y-6">
            <div className="glass-dark border border-white/10 rounded-2xl p-6">
              <h4 className="text-[10px] font-black text-gray-500 uppercase tracking-widest mb-4">
                {isVi ? 'Danh sách bài học' : 'Lesson List'}
              </h4>
              <div className="space-y-2">
                {section.lessons.map((l, idx) => (
                  <button
                    key={l.id}
                    disabled={isCheckpoint || isReview}
                    onClick={() => setActiveLessonIdx(idx)}
                    className={`w-full p-3 rounded-xl text-left transition-all border flex items-center justify-between ${
                      idx === activeLessonIdx
                        ? 'bg-blue-500/10 border-blue-500/20 text-blue-400'
                        : 'bg-white/5 border-white/5 text-gray-500 hover:border-white/10'
                    } ${(isCheckpoint || isReview) ? 'opacity-50 cursor-not-allowed' : ''}`}
                  >
                    <span className="text-[11px] font-bold truncate pr-2">{l.title}</span>
                    {completedLessons.includes(l.id) && <CheckCircle2 size={12} className="text-emerald-500 shrink-0" />}
                  </button>
                ))}
              </div>
            </div>

            <div className="glass-dark border border-white/10 rounded-2xl p-6">
              <h4 className="text-[10px] font-black text-gray-500 uppercase tracking-widest mb-4">
                {isVi ? 'HƯỚNG DẪN' : 'GUIDANCE'}
              </h4>
              <p className="text-xs text-gray-400 leading-relaxed font-bold">
                {lessonStep === 'content' 
                  ? (isVi ? 'Đọc kỹ nội dung và ghi nhớ các ý chính. Nút Tiếp theo sẽ đưa bạn đến bài học kế tiếp hoặc phần kiểm tra.' : 'Read carefully and memorize key points. The Next button will take you to the next lesson or checkpoint.')
                  : lessonStep === 'review'
                    ? (isVi ? 'Đây là những kiến thức cốt lõi. Hãy đảm bảo bạn đã nắm vững trước khi bước vào bài kiểm tra nhanh.' : 'These are the core concepts. Ensure you master them before entering the quick test.')
                    : (isVi ? 'Chọn đáp án đúng nhất cho mỗi câu hỏi. Bạn cần hoàn thành checkpoint để tiếp tục lộ trình.' : 'Choose the best answer for each question. You must complete the checkpoint to proceed.')}
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div ref={pageRef as React.RefObject<HTMLDivElement>} className="min-h-screen">
      <header data-reveal className="mb-10">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-blue-500/20 bg-blue-500/10 px-4 py-1.5 text-[10px] font-mono tracking-widest text-blue-300 mb-5">
              <GraduationCap size={12} /> DEEPFENSE ACADEMY
            </div>
            <h1 className="text-4xl md:text-6xl font-black uppercase leading-tight text-white mb-4" style={{ fontFamily: "'Outfit', 'Inter', Arial, sans-serif" }}>
              {isVi ? 'Hệ thống học tập' : 'Learning Platform'}
            </h1>
            <div className="flex flex-col sm:flex-row sm:items-center gap-4">
              <p className="text-gray-400 max-w-2xl leading-relaxed">
                {isVi 
                  ? 'Hệ thống đào tạo nhận thức an toàn số chuyên sâu. Hoàn thành các bài học, vượt qua bài Lab để nhận DPF và chứng chỉ.' 
                  : 'Advanced digital safety awareness training system. Complete lessons, pass Lab challenges to earn DPF and certificates.'}
              </p>
            </div>
          </div>
          
          <div className="flex items-center gap-3 glass-dark border border-white/10 p-4 rounded-2xl">
            {isSignedIn ? (
              <>
                <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-blue-500/20">
                  <img src={user.photoURL || '/logo/favicon-32x32.png'} alt={user.displayName || 'User'} className="w-full h-full object-cover" />
                </div>
                <div>
                  <p className="text-[10px] font-mono uppercase tracking-[0.2em] text-gray-500">Welcome back,</p>
                  <p className="text-white font-black uppercase tracking-widest text-xs truncate max-w-[120px]">{user.displayName?.split(' ')[0] || 'Learner'}</p>
                </div>
              </>
            ) : (
              <>
                <div className="w-10 h-10 bg-blue-500/20 rounded-xl flex items-center justify-center text-blue-400">
                  <Trophy size={20} />
                </div>
                <div>
                  <p className="text-[10px] font-mono uppercase tracking-[0.2em] text-gray-500 mb-1">Academy Status</p>
                  <p className="text-white font-black uppercase tracking-widest text-xs">Guest Mode</p>
                </div>
              </>
            )}
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4">
        {currentView === 'welcome' && <WelcomeView />}
        {currentView === 'dashboard' && <Dashboard />}
        {currentView === 'course' && <CourseView />}
        {currentView === 'lesson' && <LessonView />}
        {currentView === 'quiz' && <QuizView />}
      </main>
    </div>
  );
}
