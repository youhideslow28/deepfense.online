/**
 * DEEPFENSE.ONLINE - Academy Learning Platform
 * Integrated e-learning dashboard, course, and lesson management.
 */

import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { 
  AlertCircle, CheckCircle2, Clock, Users, Award, Play, BookOpen, 
  Eye, EyeOff, Zap, TrendingUp, GraduationCap, ChevronLeft,
  Trophy, ShieldCheck, Target, Sparkles, LayoutDashboard
} from 'lucide-react';
import { Language } from '@/types';
import GlowButton from '@/components/ui/GlowButton';
import { useScrollReveal } from '@/hooks/useScrollReveal';

interface AcademyProps { lang: Language; }

export default function Academy({ lang }: AcademyProps) {
  const isVi = lang === 'vi';
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [currentView, setCurrentView] = useState('dashboard');
  const [selectedCourseId, setSelectedCourseId] = useState<string | null>(null);
  const [selectedLessonId, setSelectedLessonId] = useState<string | null>(null);
  const [completedLessons, setCompletedLessons] = useState(['lesson-1', 'lesson-2']);
  const [showAnswers, setShowAnswers] = useState<Record<string, boolean>>({});
  const pageRef = useScrollReveal({ selector: '[data-reveal]', preset: 'fade-up', stagger: 0.08 });

  // Sync view from search params if needed
  useEffect(() => {
    const courseId = searchParams.get('course');
    if (courseId) {
      setSelectedCourseId(courseId);
      setCurrentView('course');
    }
  }, [searchParams]);

  const courses = [
    {
      id: 'basics',
      title: 'DEEPFENSE BASIC',
      subtitle: isVi ? 'Khóa nền tảng đầy đủ' : 'Complete foundation course',
      progress: 0,
      modules: 9,
      completedModules: 0,
      reward: '500 DPF',
      difficulty: isVi ? 'Cơ bản' : 'Basic',
      lessons: [
        { id: 'lesson-1', title: isVi ? 'Deepfake là gì?' : 'What is a deepfake?', duration: 12, type: 'video', completed: false },
        { id: 'lesson-2', title: isVi ? 'Nhận diện hình ảnh AI' : 'Identifying AI Images', duration: 15, type: 'video', completed: false },
        { id: 'lesson-3', title: isVi ? 'Dấu hiệu âm thanh giả mạo' : 'Audio Deepfake Signals', duration: 18, type: 'interactive', completed: false },
        { id: 'lesson-4', title: isVi ? 'Kiểm chứng nguồn tin' : 'Source Verification', duration: 20, type: 'video', completed: false },
        { id: 'lesson-5', title: isVi ? 'Phòng thí nghiệm nhận diện' : 'Detection Lab', duration: 22, type: 'lab', completed: false },
      ],
    },
    {
      id: 'advance',
      title: 'DEEPFENSE ADVANCE',
      subtitle: isVi ? 'Phân tích bằng chứng' : 'Evidence Analysis',
      progress: 0,
      modules: 6,
      completedModules: 0,
      reward: '750 DPF',
      difficulty: isVi ? 'Nâng cao' : 'Advanced',
      lessons: [],
      locked: true
    },
    {
      id: 'expert',
      title: 'DEEPFENSE EXPERT',
      subtitle: isVi ? 'Phòng thủ tổ chức' : 'Organizational Defense',
      progress: 0,
      modules: 8,
      completedModules: 0,
      reward: '1000 DPF',
      difficulty: isVi ? 'Chuyên gia' : 'Expert',
      lessons: [],
      locked: true
    },
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
    { label: isVi ? 'Khóa học đã đăng ký' : 'Courses Enrolled', value: 1, icon: BookOpen, color: 'text-blue-400' },
    { label: isVi ? 'Giờ học tích lũy' : 'Hours Learned', value: 0, icon: Clock, color: 'text-cyan-400' },
    { label: isVi ? 'Bài học hoàn thành' : 'Lessons Completed', value: 0, icon: CheckCircle2, color: 'text-emerald-400' },
    { label: isVi ? 'Chứng chỉ đạt được' : 'Certificates Earned', value: 0, icon: Award, color: 'text-amber-400' },
  ];

  const Dashboard = () => (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, idx) => (
          <div key={idx} className="glass-dark rounded-xl p-5 border border-white/10 hover:border-blue-500/30 transition-all group">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-xs font-bold uppercase tracking-wider text-gray-500">{stat.label}</h3>
              <stat.icon className={`w-5 h-5 ${stat.color} group-hover:scale-110 transition-transform`} />
            </div>
            <p className="text-2xl font-black text-white">{stat.value}</p>
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
            {courses.map((course) => (
              <div
                key={course.id}
                className={`glass-dark rounded-2xl p-6 border transition-all relative overflow-hidden group ${course.locked ? 'border-white/5 opacity-60 grayscale cursor-not-allowed' : 'border-white/10 hover:border-blue-500/40 cursor-pointer'}`}
                onClick={() => {
                  if (!course.locked) {
                    setSelectedCourseId(course.id);
                    setCurrentView('course');
                  }
                }}
              >
                <div className="flex items-start justify-between mb-4 relative z-10">
                  <div>
                    <div className="inline-flex items-center gap-2 px-2 py-0.5 rounded bg-blue-500/10 border border-blue-500/20 text-[10px] font-mono text-blue-300 mb-2 uppercase tracking-widest">
                      {course.difficulty}
                    </div>
                    <h3 className="text-xl font-black text-white mb-1 group-hover:text-blue-400 transition-colors">{course.title}</h3>
                    <p className="text-sm text-gray-400">{course.subtitle}</p>
                  </div>
                  <div className="text-right">
                    <span className="text-2xl font-black text-blue-400">{course.progress}%</span>
                    <p className="text-[10px] uppercase tracking-tighter text-gray-500 mt-1">Reward: {course.reward}</p>
                  </div>
                </div>

                <div className="w-full bg-white/5 rounded-full h-1.5 overflow-hidden relative z-10">
                  <div
                    className="h-full bg-gradient-to-r from-blue-500 to-cyan-400 transition-all duration-700 ease-out"
                    style={{ width: `${course.progress}%` }}
                  />
                </div>
                {course.locked && (
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
          <div className="glass-dark border border-blue-500/20 rounded-2xl p-6 relative overflow-hidden">
             <div className="absolute top-0 right-0 p-4 opacity-10">
               <Zap size={80} className="text-blue-400" />
             </div>
             <h3 className="font-black text-white uppercase tracking-widest text-sm mb-4 flex items-center gap-2">
               <Zap className="text-amber-400" size={16} /> 
               {isVi ? 'Mẹo phát hiện nhanh' : 'Quick Tips'}
             </h3>
             <ul className="space-y-4">
               {[
                 isVi ? 'Luôn xác minh nguồn tin qua các kênh chính thống' : 'Always verify sources through official channels',
                 isVi ? 'Kiểm tra bóng đổ và ánh sáng không đồng nhất' : 'Check for inconsistent lighting and shadows',
                 isVi ? 'Chú ý các lỗi biến dạng ở bàn tay và phụ kiện' : 'Look for artifacts in hands and accessories',
                 isVi ? 'Sử dụng nhiều công cụ kiểm chứng cùng lúc' : 'Use multiple verification tools for confirmation'
               ].map((tip, i) => (
                 <li key={i} className="flex gap-3 text-sm text-gray-400 leading-relaxed">
                   <span className="text-blue-400 font-mono font-bold">{i+1}.</span>
                   {tip}
                 </li>
               ))}
             </ul>
          </div>

          <div className="glass-dark border border-amber-500/20 rounded-2xl p-6">
            <h3 className="font-black text-white uppercase tracking-widest text-sm mb-4 flex items-center gap-2">
              <Trophy className="text-amber-400" size={16} /> 
              {isVi ? 'Thành tựu' : 'Recent Badges'}
            </h3>
            <div className="flex flex-wrap gap-3">
              {[1, 2, 3].map(i => (
                <div key={i} className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-gray-600 grayscale">
                  <Award size={24} />
                </div>
              ))}
            </div>
            <p className="mt-4 text-[10px] text-gray-500 italic">
              {isVi ? 'Hoàn thành khóa học đầu tiên để nhận Badge!' : 'Complete your first course to earn badges!'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );

  const CourseView = () => {
    const course = courses.find((c) => c.id === selectedCourseId);
    if (!course) return null;

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
            <h1 className="text-3xl md:text-5xl font-black text-white mb-6 uppercase leading-tight">{course.title}</h1>
            <div className="flex flex-col md:flex-row md:items-center gap-8">
              <div className="shrink-0">
                <p className="text-gray-500 text-[10px] uppercase tracking-[0.2em] mb-1">{isVi ? 'Tiến độ tổng thể' : 'Overall Progress'}</p>
                <p className="text-5xl font-black text-blue-400">{course.progress}%</p>
              </div>
              <div className="flex-1 h-2 bg-white/10 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-blue-500 to-cyan-400 transition-all duration-1000"
                  style={{ width: `${course.progress}%` }}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-3">
          <h2 className="text-xl font-black text-white uppercase tracking-widest mb-4 flex items-center gap-2">
            <BookOpen size={20} className="text-blue-400" />
            {isVi ? 'Nội dung bài học' : 'Lessons'}
          </h2>
          {course.lessons.map((lesson) => (
            <div
              key={lesson.id}
              className={`p-5 rounded-2xl border transition-all cursor-pointer group ${
                completedLessons.includes(lesson.id)
                  ? 'bg-emerald-500/5 border-emerald-500/20 hover:border-emerald-500/40'
                  : 'glass-dark border-white/10 hover:border-blue-500/30'
              }`}
              onClick={() => {
                setSelectedLessonId(lesson.id);
                setCurrentView('lesson');
              }}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4 flex-1">
                  <div className="flex-shrink-0">
                    {completedLessons.includes(lesson.id) ? (
                      <CheckCircle2 className="w-6 h-6 text-emerald-500" />
                    ) : (
                      <div className="w-6 h-6 rounded-full border-2 border-white/10 group-hover:border-blue-400/50 transition-colors" />
                    )}
                  </div>
                  <div>
                    <h3 className="font-bold text-white group-hover:text-blue-400 transition-colors">{lesson.title}</h3>
                    <div className="flex items-center gap-4 mt-1 text-[10px] font-mono text-gray-500">
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" /> {lesson.duration} min
                      </span>
                      <span className="px-2 py-0.5 bg-blue-500/10 text-blue-300 rounded uppercase tracking-widest border border-blue-500/20">
                        {lesson.type}
                      </span>
                    </div>
                  </div>
                </div>
                <Play className="w-5 h-5 text-blue-400 group-hover:scale-125 transition-transform" />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const LessonView = () => {
    const course = courses.find((c) => c.id === selectedCourseId);
    const lesson = course?.lessons.find((l) => l.id === selectedLessonId);

    if (!course || !lesson) return null;

    const isLab = lesson.type === 'lab';
    const labData = labContent[lesson.id];

    return (
      <div className="space-y-6 animate-in fade-in duration-500">
        <button
          onClick={() => setCurrentView('course')}
          className="inline-flex items-center gap-2 text-blue-400 hover:text-white transition-colors font-black uppercase text-xs tracking-widest"
        >
          <ChevronLeft size={16} /> {isVi ? 'Quay lại khóa học' : 'Back to Course'}
        </button>

        <div className="glass-dark border border-white/10 rounded-3xl p-8 md:p-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-blue-500/10 border border-blue-500/20 text-[10px] font-mono text-blue-300 mb-4 uppercase tracking-widest">
            {lesson.type}
          </div>
          <h1 className="text-3xl md:text-4xl font-black text-white mb-4 uppercase">{lesson.title}</h1>
          <div className="flex items-center gap-4 text-gray-500 text-xs font-mono">
            <span className="flex items-center gap-2"><Clock className="w-4 h-4" /> {lesson.duration} minutes</span>
            <span className="flex items-center gap-2"><Users className="w-4 h-4" /> 1.2k active learners</span>
          </div>
        </div>

        {isLab && labData ? (
          <div className="space-y-6">
            <div className="bg-red-500/5 border border-red-500/20 rounded-2xl p-6 flex gap-4">
              <AlertCircle className="w-8 h-8 text-red-500 flex-shrink-0" />
              <div>
                <h3 className="font-black text-red-400 uppercase tracking-widest text-sm mb-1">{isVi ? 'Thử thách LAB' : 'Lab Challenge'}</h3>
                <p className="text-sm text-gray-400 leading-relaxed">{labData.description}</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {labData.samples.map((sample: any) => (
                <div key={sample.id} className="glass-dark border border-white/10 rounded-3xl overflow-hidden hover:border-blue-500/30 transition-all">
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h4 className="font-black text-white uppercase text-sm tracking-wide">{sample.label}</h4>
                      <button
                        onClick={() => setShowAnswers((prev) => ({ ...prev, [sample.id]: !prev[sample.id] }))}
                        className="flex items-center gap-2 text-[10px] font-black uppercase text-blue-400 hover:text-white transition-colors"
                      >
                        {showAnswers[sample.id] ? <><EyeOff size={14} /> Hide Analysis</> : <><Eye size={14} /> Show Analysis</>}
                      </button>
                    </div>

                    <div className="aspect-square bg-black/40 rounded-2xl mb-6 flex items-center justify-center text-8xl border border-white/5 select-none hover:bg-black/20 transition-colors">
                      {sample.image}
                    </div>

                    <div className="bg-blue-500/5 border border-blue-500/10 rounded-xl p-4 mb-4">
                       <p className="text-xs text-blue-300 italic">💡 {sample.hint}</p>
                    </div>

                    {showAnswers[sample.id] && (
                      <div className="animate-in fade-in slide-in-from-top-2 duration-300 mb-6 space-y-3">
                        <p className="text-[10px] font-black uppercase text-gray-500 tracking-widest">{isVi ? 'Các lỗi được phát hiện:' : 'Identified issues:'}</p>
                        <ul className="space-y-2">
                          {sample.errors.map((error: string, idx: number) => (
                            <li key={idx} className="flex items-start gap-2 text-sm text-gray-400">
                              <span className="text-red-500">⚠</span>
                              <span>{error}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    <GlowButton 
                      color="primary" 
                      className="w-full" 
                      onClick={() => {
                        if (!completedLessons.includes(lesson.id)) {
                          setCompletedLessons([...completedLessons, lesson.id]);
                        }
                      }}
                    >
                      {completedLessons.includes(lesson.id) ? '✓ ANALYSIS COMPLETE' : 'MARK AS ANALYZED'}
                    </GlowButton>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="glass-dark border border-white/10 rounded-3xl p-8 md:p-12 text-center max-w-4xl mx-auto">
            <div className="w-24 h-24 bg-blue-500/10 rounded-full flex items-center justify-center text-5xl mx-auto mb-8 border border-blue-500/20">
              {lesson.type === 'video' ? '▶️' : '🎓'}
            </div>
            <div className="prose prose-invert mx-auto">
              <h2 className="text-white font-black uppercase">{isVi ? 'Sẵn sàng bắt đầu?' : 'Ready to start?'}</h2>
              <p className="text-gray-400 mb-8">
                {isVi ? 'Bài học này bao gồm nội dung video và các câu hỏi tương tác để giúp bạn nắm vững kiến thức.' : 'This lesson includes video content and interactive questions to help you master the material.'}
              </p>
              <GlowButton
                color="primary"
                size="lg"
                onClick={() => {
                  if (!completedLessons.includes(lesson.id)) {
                    setCompletedLessons([...completedLessons, lesson.id]);
                  }
                  setCurrentView('course');
                }}
              >
                {completedLessons.includes(lesson.id) ? '✓ COMPLETED' : 'START LESSON'}
              </GlowButton>
            </div>
          </div>
        )}
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
            <p className="text-gray-400 max-w-2xl leading-relaxed">
              {isVi 
                ? 'Hệ thống đào tạo nhận thức an toàn số chuyên sâu. Hoàn thành các bài học, vượt qua bài Lab để nhận DPF và chứng chỉ.' 
                : 'Advanced digital safety awareness training system. Complete lessons, pass Lab challenges to earn DPF and certificates.'}
            </p>
          </div>
          
          <div className="flex items-center gap-3 glass-dark border border-white/10 p-4 rounded-2xl">
            <div className="w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center text-blue-400">
              <Trophy size={24} />
            </div>
            <div>
              <p className="text-[10px] font-mono uppercase tracking-[0.2em] text-gray-500 mb-1">Academy Status</p>
              <p className="text-white font-black uppercase tracking-widest">Enrolled</p>
            </div>
          </div>
        </div>
      </header>

      <main>
        {currentView === 'dashboard' && <Dashboard />}
        {currentView === 'course' && <CourseView />}
        {currentView === 'lesson' && <LessonView />}
      </main>
    </div>
  );
}
