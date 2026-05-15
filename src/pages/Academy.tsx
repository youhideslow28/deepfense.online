import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { 
  AlertCircle, CheckCircle2, Clock, Users, Award, Play, BookOpen, 
  Eye, EyeOff, Zap, TrendingUp, GraduationCap, ChevronLeft,
  Trophy, ShieldCheck, Target, Sparkles, LayoutDashboard, LogIn, LockKeyhole
} from 'lucide-react';
import { Language } from '@/types';
import type { User } from 'firebase/auth';
import GlowButton from '@/components/ui/GlowButton';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import { basicsCourse, Module, Section, Lesson } from '@/data/basicsCourseData';

interface AcademyProps { 
  lang: Language; 
  user: User | null;
  authBusy: boolean;
  onGoogleAuth: () => void;
}

export default function Academy({ lang, user, authBusy, onGoogleAuth }: AcademyProps) {
  const isVi = lang === 'vi';
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [currentView, setCurrentView] = useState('dashboard');
  const [selectedCourseId, setSelectedCourseId] = useState<string | null>(null);
  const [activeModule, setActiveModule] = useState<Module | null>(null);
  const [activeSectionIdx, setActiveSectionIdx] = useState(0);
  const [activeLessonIdx, setActiveLessonIdx] = useState(0);
  
  const [completedLessons, setCompletedLessons] = useState<string[]>([]);
  const [showAnswers, setShowAnswers] = useState<Record<string, boolean>>({});
  const [checkpointAnswers, setCheckpointAnswers] = useState<Record<number, number>>({});
  const [checkpointSubmitted, setCheckpointSubmitted] = useState(false);
  const [quizAnswers, setQuizAnswers] = useState<Record<number, number>>({});
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  
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

  const hallOfFame = [
    { rank: '01', name: 'Ho Xuan Nguyen', credential: 'DEEPFENSE AWARE' },
    { rank: '02', name: 'Nguyen Nhat Huy', credential: 'DEEPFENSE AWARE' },
    { rank: '03', name: isVi ? 'Học viên tiếp theo' : 'Next learner', credential: '...' },
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
    { label: isVi ? 'Khóa học đã đăng ký' : 'Enrolled', value: isSignedIn ? 1 : 0, icon: BookOpen, color: 'text-blue-400' },
    { label: isVi ? 'Giờ học' : 'Hours', value: 0, icon: Clock, color: 'text-cyan-400' },
    { label: isVi ? 'Bài đã xong' : 'Finished', value: 0, icon: CheckCircle2, color: 'text-emerald-400' },
    { label: isVi ? 'Chứng chỉ' : 'Certs', value: 0, icon: Award, color: 'text-amber-400' },
  ];

  const Dashboard = () => (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
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
                  if (!track.locked) {
                    setSelectedCourseId(track.id);
                    setCurrentView('course');
                  }
                }}
              >
                <div className="flex items-start justify-between mb-4 relative z-10">
                  <div>
                    <div className="inline-flex items-center gap-2 px-2 py-0.5 rounded bg-blue-500/10 border border-blue-500/20 text-[10px] font-mono text-blue-300 mb-2 uppercase tracking-widest">
                      {track.difficulty}
                    </div>
                    <h3 className="text-xl font-black text-white mb-1 group-hover:text-blue-400 transition-colors">{track.title}</h3>
                    <p className="text-sm text-gray-400">{track.subtitle}</p>
                  </div>
                  <div className="text-right">
                    <span className="text-2xl font-black text-blue-400">{track.progress}%</span>
                    <p className="text-[10px] uppercase tracking-tighter text-gray-500 mt-1">Reward: {track.reward}</p>
                  </div>
                </div>

                <div className="w-full bg-white/5 rounded-full h-1.5 overflow-hidden relative z-10">
                  <div
                    className="h-full bg-gradient-to-r from-blue-500 to-cyan-400 transition-all duration-700 ease-out"
                    style={{ width: `${track.progress}%` }}
                  />
                </div>
                {track.locked && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black/20 backdrop-blur-[2px]">
                    <span className="bg-black/60 px-4 py-2 rounded-full border border-white/10 text-[10px] font-black uppercase tracking-widest text-gray-400">
                      Locked
                    </span>
                  </div>
                )}
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
          {!isSignedIn && (
            <div className="glass-dark border border-blue-500/20 rounded-2xl p-6">
              <h3 className="font-black text-white uppercase tracking-widest text-[10px] mb-2 flex items-center gap-2">
                <LockKeyhole className="text-blue-400" size={14} />
                {isVi ? 'Yêu cầu đăng nhập' : 'Sign-in required'}
              </h3>
              <p className="text-[11px] text-gray-500 mb-4 leading-relaxed">
                {isVi ? 'Đăng nhập Google để lưu tiến độ và nhận DPF.' : 'Sign in with Google to save progress and earn DPF.'}
              </p>
              <GlowButton color="primary" size="sm" className="w-full" onClick={onGoogleAuth} icon={<LogIn size={14} />}>
                {authBusy ? '...' : (isVi ? 'ĐĂNG NHẬP' : 'SIGN IN')}
              </GlowButton>
            </div>
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
            <h1 className="text-3xl md:text-5xl font-black text-white mb-6 uppercase leading-tight">{track.title}</h1>
            <div className="flex flex-col md:flex-row md:items-center gap-8">
              <div className="shrink-0">
                <p className="text-gray-500 text-[10px] uppercase tracking-[0.2em] mb-1">{isVi ? 'Tiến độ tổng thể' : 'Overall Progress'}</p>
                <p className="text-5xl font-black text-blue-400">{track.progress}%</p>
              </div>
              <div className="flex-1 h-2 bg-white/10 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-blue-500 to-cyan-400 transition-all duration-1000"
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
              const isLocked = idx > 0 && module.sections.length === 0; // Simplified lock logic
              return (
                <div
                  key={module.id}
                  className={`p-6 rounded-2xl border transition-all cursor-pointer group relative overflow-hidden ${
                    isLocked ? 'opacity-50 grayscale border-white/5 bg-white/5' : 'glass-dark border-white/10 hover:border-blue-500/30'
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
                    setCurrentView('lesson');
                  }}
                >
                  <div className="flex items-center justify-between relative z-10">
                    <div className="flex items-center gap-5">
                      <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400 font-black text-sm">
                        {module.id}
                      </div>
                      <div>
                        <h3 className="font-bold text-white text-lg group-hover:text-blue-400 transition-colors">{module.title}</h3>
                        <div className="flex items-center gap-4 mt-1 text-[10px] font-mono text-gray-500">
                          <span className="flex items-center gap-1">
                            <Clock className="w-3 h-3" /> {module.duration}
                          </span>
                          <span className="px-2 py-0.5 bg-blue-500/10 text-blue-300 rounded uppercase tracking-widest border border-blue-500/20">
                            {module.level}
                          </span>
                          <span className="text-gray-600">
                            {module.sections.length} {isVi ? 'Mục học' : 'Sections'}
                          </span>
                        </div>
                      </div>
                    </div>
                    {isLocked ? (
                      <LockKeyhole size={18} className="text-gray-600" />
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
    const questions = activeModule.quiz;
    
    if (questions.length === 0) {
      return (
        <div className="text-center py-20 glass-dark rounded-3xl border border-white/10">
          <CheckCircle2 size={64} className="text-emerald-500 mx-auto mb-6" />
          <h2 className="text-2xl font-black text-white uppercase mb-2">{isVi ? 'Hoàn thành Module!' : 'Module Completed!'}</h2>
          <p className="text-gray-400 mb-8">{isVi ? 'Module này chưa có bài trắc nghiệm.' : 'This module does not have a quiz yet.'}</p>
          <GlowButton color="primary" onClick={() => setCurrentView('course')}>
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
                {q.options.map((opt, oIdx) => {
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
                <GlowButton color="primary" size="lg" onClick={() => setCurrentView('course')}>
                  {isVi ? 'TIẾP TỤC LỘ TRÌNH' : 'CONTINUE LEARNING'}
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

    const isLastLesson = activeLessonIdx === section.lessons.length - 1;
    const hasCheckpoint = !!section.checkpoint;

    return (
      <div className="space-y-6 animate-in fade-in duration-500 pb-20">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <button
            onClick={() => setCurrentView('course')}
            className="inline-flex items-center gap-2 text-blue-400 hover:text-white transition-colors font-black uppercase text-xs tracking-widest"
          >
            <ChevronLeft size={16} /> {isVi ? 'Quay lại Module' : 'Back to Module'}
          </button>
          
          <div className="flex items-center gap-1 overflow-x-auto pb-2 md:pb-0 no-scrollbar">
            {activeModule.sections.map((s, idx) => (
              <button
                key={idx}
                onClick={() => {
                  setActiveSectionIdx(idx);
                  setActiveLessonIdx(0);
                  setCheckpointSubmitted(false);
                }}
                className={`px-3 py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-widest border whitespace-nowrap transition-all ${
                  idx === activeSectionIdx 
                    ? 'bg-blue-500 text-white border-blue-400' 
                    : 'bg-white/5 text-gray-500 border-white/5 hover:border-white/20'
                }`}
              >
                {s.title}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-8 space-y-6">
            <div className="glass-dark border border-white/10 rounded-3xl p-8 md:p-10 relative overflow-hidden">
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
                
                <h1 className="text-3xl md:text-4xl font-black text-white mb-8 uppercase leading-tight">{lesson.title}</h1>
                
                <div className="prose prose-invert prose-blue max-w-none">
                  {lesson.paragraphs.map((p, i) => (
                    <p key={i} className="text-gray-300 text-base leading-relaxed mb-6 last:mb-0">
                      {p}
                    </p>
                  ))}
                </div>

                <div className="mt-10 p-6 rounded-2xl bg-blue-500/5 border border-blue-500/10">
                  <h3 className="text-xs font-black text-blue-400 uppercase tracking-widest mb-4 flex items-center gap-2">
                    <Zap size={14} /> {isVi ? 'Điểm cần nhớ' : 'Key Takeaways'}
                  </h3>
                  <ul className="space-y-3">
                    {lesson.takeaways.map((t, i) => (
                      <li key={i} className="flex items-start gap-3 text-sm text-gray-400">
                        <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-1.5 shrink-0 shadow-[0_0_8px_rgba(59,130,246,0.5)]" />
                        {t}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {isLastLesson && hasCheckpoint && (
              <div className="glass-dark border border-cyan-500/20 rounded-3xl p-8 animate-in slide-in-from-bottom-4 duration-700">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400">
                    <ShieldCheck size={24} />
                  </div>
                  <div>
                    <h3 className="font-black text-white uppercase tracking-widest text-sm">
                      Checkpoint {section.checkpoint?.label}
                    </h3>
                    <p className="text-[10px] text-gray-500 font-bold uppercase tracking-tighter">
                      {isVi ? 'Kiểm tra nhanh kiến thức' : 'Quick knowledge check'}
                    </p>
                  </div>
                </div>

                <div className="space-y-8">
                  {section.checkpoint?.questions.map((q, qIdx) => (
                    <div key={qIdx} className="space-y-4">
                      <p className="text-white font-bold leading-relaxed">
                        <span className="text-cyan-400 mr-2">#{qIdx + 1}</span> {q.text}
                      </p>
                      <div className="grid grid-cols-1 gap-2">
                        {q.options.map((opt, oIdx) => {
                          const isSelected = checkpointAnswers[qIdx] === oIdx;
                          const isCorrect = oIdx === q.answer;
                          const showResult = checkpointSubmitted;
                          
                          return (
                            <button
                              key={oIdx}
                              disabled={checkpointSubmitted}
                              onClick={() => setCheckpointAnswers(prev => ({ ...prev, [qIdx]: oIdx }))}
                              className={`p-4 rounded-xl text-left text-sm transition-all border ${
                                showResult
                                  ? isCorrect
                                    ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300'
                                    : isSelected
                                      ? 'bg-red-500/10 border-red-500/30 text-red-300'
                                      : 'bg-white/5 border-white/5 opacity-50'
                                  : isSelected
                                    ? 'bg-blue-500/10 border-blue-500/30 text-blue-300 ring-1 ring-blue-500/20'
                                    : 'bg-white/5 border-white/5 hover:border-white/20 text-gray-400'
                              }`}
                            >
                              <div className="flex items-center justify-between">
                                <span>{opt}</span>
                                {showResult && isCorrect && <CheckCircle2 size={14} className="text-emerald-500" />}
                                {showResult && isSelected && !isCorrect && <AlertCircle size={14} className="text-red-500" />}
                              </div>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  ))}
                </div>

                {!checkpointSubmitted ? (
                  <GlowButton
                    color="primary"
                    className="w-full mt-10"
                    disabled={Object.keys(checkpointAnswers).length < (section.checkpoint?.questions.length || 0)}
                    onClick={() => setCheckpointSubmitted(true)}
                  >
                    {isVi ? 'NỘP CHECKPOINT' : 'SUBMIT CHECKPOINT'}
                  </GlowButton>
                ) : (
                  <div className="mt-8 p-4 rounded-xl bg-white/5 border border-white/10 flex items-center justify-between">
                    <p className="text-xs text-gray-400">
                      {isVi ? 'Đã hoàn thành phần này.' : 'Section completed.'}
                    </p>
                    <button 
                      onClick={() => {
                        setCheckpointSubmitted(false);
                        setCheckpointAnswers({});
                      }}
                      className="text-[10px] font-black text-blue-400 uppercase tracking-widest hover:text-white transition-colors"
                    >
                      {isVi ? 'Thử lại' : 'Retry'}
                    </button>
                  </div>
                )}
              </div>
            )}

            <div className="flex items-center justify-between gap-4 mt-8">
              <button
                disabled={activeLessonIdx === 0 && activeSectionIdx === 0}
                onClick={() => {
                  if (activeLessonIdx > 0) setActiveLessonIdx(activeLessonIdx - 1);
                  else if (activeSectionIdx > 0) {
                    setActiveSectionIdx(activeSectionIdx - 1);
                    setActiveLessonIdx(activeModule.sections[activeSectionIdx - 1].lessons.length - 1);
                  }
                }}
                className="px-6 py-3 rounded-xl bg-white/5 border border-white/10 text-gray-400 text-xs font-black uppercase tracking-widest hover:bg-white/10 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
              >
                {isVi ? 'Trước' : 'Prev'}
              </button>
              
              <GlowButton
                color="primary"
                onClick={() => {
                  if (!completedLessons.includes(lesson.id)) {
                    setCompletedLessons([...completedLessons, lesson.id]);
                  }
                  
                  if (activeLessonIdx < section.lessons.length - 1) {
                    setActiveLessonIdx(activeLessonIdx + 1);
                  } else if (activeSectionIdx < activeModule.sections.length - 1) {
                    setActiveSectionIdx(activeSectionIdx + 1);
                    setActiveLessonIdx(0);
                    setCheckpointSubmitted(false);
                    setCheckpointAnswers({});
                    setQuizAnswers({});
                    setQuizSubmitted(false);
                    setCurrentView('quiz');
                  } else {
                    setCurrentView('course');
                  }
                }}
              >
                {isLastLesson && activeSectionIdx === activeModule.sections.length - 1 
                  ? (isVi ? 'VÀO BÀI KIỂM TRA' : 'TAKE QUIZ') 
                  : (isVi ? 'TIẾP THEO' : 'NEXT')}
              </GlowButton>
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
                    onClick={() => setActiveLessonIdx(idx)}
                    className={`w-full p-3 rounded-xl text-left transition-all border flex items-center justify-between ${
                      idx === activeLessonIdx
                        ? 'bg-blue-500/10 border-blue-500/20 text-blue-400'
                        : 'bg-white/5 border-white/5 text-gray-500 hover:border-white/10'
                    }`}
                  >
                    <span className="text-[11px] font-bold truncate pr-2">{l.title}</span>
                    {completedLessons.includes(l.id) && <CheckCircle2 size={12} className="text-emerald-500 shrink-0" />}
                  </button>
                ))}
              </div>
            </div>

            <div className="glass-dark border border-white/10 rounded-2xl p-6 bg-gradient-to-br from-blue-500/5 to-transparent">
              <h4 className="text-[10px] font-black text-blue-400 uppercase tracking-widest mb-3 flex items-center gap-2">
                <Target size={12} /> {isVi ? 'Bối cảnh Module' : 'Module Scenario'}
              </h4>
              <p className="text-[11px] text-gray-400 leading-relaxed italic">
                "{activeModule.scenario}"
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
              <button 
                onClick={() => navigate('/academy/basics')}
                className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-blue-400 hover:text-white transition-colors"
              >
                {isVi ? 'Thông tin khóa học' : 'Course Info'} <ChevronLeft size={14} className="rotate-180" />
              </button>
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
        {currentView === 'dashboard' && <Dashboard />}
        {currentView === 'course' && <CourseView />}
        {currentView === 'lesson' && <LessonView />}
        {currentView === 'quiz' && <QuizView />}
      </main>
    </div>
  );
}
