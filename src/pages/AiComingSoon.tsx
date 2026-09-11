import React, { useState } from 'react';
import { 
  Cpu, 
  Fingerprint, 
  ScanEye, 
  Shield, 
  Smartphone, 
  ArrowRight, 
  ArrowDown, 
  Video, 
  Mic, 
  UploadCloud, 
  BrainCircuit, 
  Map, 
  GraduationCap, 
  MonitorSmartphone, 
  SmartphoneNfc, 
  BadgeDollarSign, 
  Coins, 
  School, 
  Building2, 
  Rocket, 
  ShieldCheck, 
  Users, 
  CheckCircle2, 
  Check, 
  X, 
  ShieldAlert, 
  BookOpen, 
  Activity,
  Lock
} from 'lucide-react';
import { Language } from '@/types';

interface AiComingSoonProps {
  lang: Language;
}

type TabType = 'overview' | 'products' | 'roadmap' | 'commercialization';

const AiComingSoon: React.FC<AiComingSoonProps> = ({ lang }) => {
  const [activeTab, setActiveTab] = useState<TabType>('overview');

  const handleTabChange = (tab: TabType) => {
    setActiveTab(tab);
    requestAnimationFrame(() => {
      window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
    });
  };

  // Comparison table data
  const comparisonFeatures = [
    {
      nameVi: 'Học nhận diện cơ bản',
      nameEn: 'Basic Detection Learning',
      free: true,
      pro: true,
      proMax: true,
    },
    {
      nameVi: 'Khóa học nâng cao',
      nameEn: 'Advanced Courses',
      free: false,
      pro: true,
      proMax: true,
    },
    {
      nameVi: 'Cấp chứng chỉ hoàn thành',
      nameEn: 'Completion Certificates',
      free: false,
      pro: true,
      proMax: true,
    },
    {
      nameVi: 'Báo cáo tiến độ học tập',
      nameEn: 'Learning Progress Reports',
      free: false,
      pro: true,
      proMax: true,
    },
    {
      nameVi: 'Máy quét AI (đang khóa)',
      nameEn: 'AI Scanner (locked)',
      free: false,
      pro: false,
      proMax: false,
    },
    {
      nameVi: 'Quét AI nâng cao (sau benchmark)',
      nameEn: 'Advanced AI Scanning (post-benchmark)',
      free: false,
      pro: false,
      proMax: false,
    },
    {
      nameVi: 'Phân tích Video/Audio/Link (2027-2028)',
      nameEn: 'Video/Audio/Link Analysis (2027-2028)',
      free: false,
      pro: false,
      proMax: false,
    },
    {
      nameVi: 'Dashboard theo dõi rủi ro',
      nameEn: 'Risk Monitoring Dashboard',
      free: false,
      pro: false,
      proMax: true,
    },
    {
      nameVi: 'Phòng thực hành ảo (Labs)',
      nameEn: 'Hands-on Security Labs',
      free: false,
      pro: false,
      proMax: true,
    },
    {
      nameVi: 'Tích hợp tiện ích DPF Token',
      nameEn: 'DPF Token Utility Integration',
      free: false,
      pro: false,
      proMax: true,
    },
    {
      nameVi: 'Gói lớp học & gia đình',
      nameEn: 'Classroom & Family Packages',
      free: false,
      pro: true,
      proMax: true,
    },
  ];

  return (
    <div className="max-w-7xl mx-auto animate-in fade-in duration-500">
      
      {/* Header */}
      <div className="tab-copy-reveal text-center mb-10 px-4">
        <div className="mb-4 inline-flex animate-pulse items-center gap-2 rounded-full border border-blue-400/25 bg-blue-400/10 px-4 py-1 text-xs font-bold text-blue-200">
            <Cpu size={14} /> {lang === 'vi' ? 'DỰ ÁN ĐANG PHÁT TRIỂN' : 'PROJECT UNDER DEVELOPMENT'}
        </div>
        <h1 className="text-4xl md:text-6xl font-black text-slate-900 dark:text-white mb-4 tracking-tight">
          DEEPFENSE<span className="text-blue-400"> AI</span>
        </h1>
        <p className="mb-6 inline-block rounded border border-black/10 dark:border-white/10 bg-surface px-4 py-2 font-mono text-lg text-slate-900 dark:text-white md:text-xl">
             {lang === 'vi' ? '"Khi AI tấn công, hãy dùng AI để phòng thủ."' : '"When AI attacks, use AI to defend."'}
        </p>
        <p className="mx-auto max-w-2xl text-base leading-7 text-slate-600 dark:text-slate-300/85 md:text-lg">
          {lang === 'vi' 
            ? 'Dự án AI của Deepfense đang ở giai đoạn tìm dataset, chuẩn hóa dữ liệu và chuẩn bị train model. Máy quét công khai sẽ chỉ mở khi có benchmark và quy trình đánh giá rõ ràng.'
            : 'Deepfense AI is currently sourcing datasets, normalizing samples, and preparing model training. Public scanning will only open after clear benchmarks and evaluation procedures are in place.'}
        </p>
      </div>

      {/* Modern Glassmorphic Tab Switcher */}
      <div className="mb-12 px-4 flex justify-center">
        <div className="flex flex-wrap items-center justify-center gap-1.5 md:gap-2 rounded-xl border border-black/10 dark:border-white/10 bg-slate-900/60 p-1.5 backdrop-blur-md">
          {[
            { id: 'overview', labelVi: 'Tổng quan', labelEn: 'Overview', icon: Cpu },
            { id: 'products', labelVi: 'Sản phẩm', labelEn: 'Products', icon: ShieldCheck },
            { id: 'roadmap', labelVi: 'Lộ trình', labelEn: 'Roadmap', icon: Map },
            { id: 'commercialization', labelVi: 'Thương mại hóa', labelEn: 'Commercialization', icon: BadgeDollarSign }
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => handleTabChange(tab.id as TabType)}
                className={`flex items-center gap-2 rounded-lg px-4 py-2.5 text-xs md:text-sm font-bold transition-all duration-300 ${
                  isActive
                    ? 'bg-blue-500/20 text-blue-300 border border-blue-500/30 shadow-[0_0_15px_rgba(59,130,246,0.15)]'
                    : 'text-slate-500 dark:text-slate-400 hover:text-slate-200 hover:bg-black/5 dark:bg-white/5 border border-transparent'
                }`}
              >
                <Icon size={16} />
                <span>{lang === 'vi' ? tab.labelVi : tab.labelEn}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* TAB CONTENT: OVERVIEW */}
      {activeTab === 'overview' && (
        <div key="ai-overview" className="tab-panel-reveal tab-copy-reveal animate-in fade-in duration-300">
          {/* Logic Flowchart Diagram */}
          <div className="mb-24 px-4">
            <h3 className="mb-10 flex items-center justify-center gap-2 text-center font-mono font-bold uppercase tracking-[0.12em] text-slate-500 dark:text-slate-400">
                 <BrainCircuit /> {lang === 'vi' ? 'CƠ CHẾ HOẠT ĐỘNG TỔNG THỂ' : 'OVERALL OPERATING MECHANISM'}
            </h3>
            
            {/* Flex container for flow */}
            <div className="flex flex-col lg:flex-row items-center justify-center gap-6 md:gap-8">
                
                {/* STEP 1: INPUTS */}
                <div className="flex flex-col gap-4 w-full md:w-auto">
                    <div className="mb-2 text-center text-xs font-bold uppercase tracking-[0.12em] text-slate-500 dark:text-slate-400">{lang === 'vi' ? 'NGUỒN DỮ LIỆU TRAIN' : 'TRAINING DATA SOURCES'}</div>
                    
                    <div className="group flex w-full items-center gap-4 rounded-xl border border-black/10 dark:border-white/10 bg-surface p-4 shadow-lg transition-colors hover:border-blue-500 md:w-56">
                        <div className="bg-blue-500/20 p-3 rounded-lg text-blue-400 group-hover:scale-110 transition-transform"><Smartphone size={24}/></div>
                        <div className="flex flex-col">
                            <span className="text-sm font-bold text-slate-900 dark:text-white">FACE / VIDEO</span>
                            <span className="text-[10px] text-slate-500 dark:text-slate-400">{lang === 'vi' ? 'Mẫu thật, mẫu giả, nguồn rõ' : 'Real/fake samples with provenance'}</span>
                        </div>
                    </div>

                    <div className="group flex w-full items-center gap-4 rounded-xl border border-black/10 dark:border-white/10 bg-surface p-4 shadow-lg transition-colors hover:border-green-500 md:w-56">
                        <div className="bg-green-500/20 p-3 rounded-lg text-green-400 group-hover:scale-110 transition-transform"><UploadCloud size={24}/></div>
                        <div className="flex flex-col">
                            <span className="text-sm font-bold text-slate-900 dark:text-white">MEDIA DATASET</span>
                            <span className="text-[10px] text-slate-500 dark:text-slate-400">{lang === 'vi' ? 'Video, ảnh, metadata' : 'Video, images, metadata'}</span>
                        </div>
                    </div>

                    <div className="group flex w-full items-center gap-4 rounded-xl border border-black/10 dark:border-white/10 bg-surface p-4 shadow-lg transition-colors hover:border-yellow-500 md:w-56">
                        <div className="bg-yellow-500/20 p-3 rounded-lg text-yellow-400 group-hover:scale-110 transition-transform"><Mic size={24}/></div>
                        <div className="flex flex-col">
                            <span className="text-sm font-bold text-slate-900 dark:text-white">{lang === 'vi' ? 'ÂM THANH' : 'AUDIO'}</span>
                            <span className="text-[10px] text-slate-500 dark:text-slate-400">{lang === 'vi' ? 'Giọng thật, giọng tổng hợp' : 'Human and synthetic voices'}</span>
                        </div>
                    </div>
                </div>

                {/* Connector 1 */}
                <div className="flex flex-col items-center justify-center">
                     <div className="relative hidden h-1 w-12 rounded-full bg-gradient-to-r from-slate-700 to-primary lg:block">
                        <div className="absolute -right-2 top-1/2 -translate-y-1/2 animate-pulse text-primary"><ArrowRight /></div>
                     </div>
                     <div className="relative block h-12 w-1 rounded-full bg-gradient-to-b from-slate-700 to-primary lg:hidden">
                        <div className="absolute bottom-[-10px] left-1/2 -translate-x-1/2 animate-pulse text-primary"><ArrowDown /></div>
                     </div>
                </div>

                {/* STEP 2: AI PROCESSING CORE */}
                <div className="relative flex flex-col items-center w-full md:w-auto">
                    <div className="mb-4 text-center text-xs font-bold uppercase tracking-[0.12em] text-blue-300">DEEPFENSE AI LAB</div>
                    
                    <div className="w-full rounded-2xl border-2 border-primary/70 bg-white/90 dark:bg-black/80 p-1 shadow-[0_0_50px_rgba(29,111,232,0.18)] backdrop-blur-xl md:w-auto">
                        <div className="bg-slate-50 dark:bg-gray-900 rounded-xl p-6 w-full md:w-80 flex flex-col gap-4 relative overflow-hidden">
                            {/* Scan effect inside */}
                            <div className="absolute left-0 top-0 h-1 w-full animate-[scan_2s_ease-in-out_infinite] bg-primary shadow-[0_0_10px_#1d6fe8]"></div>
                            
                            <div className="flex items-center gap-3 rounded border border-primary/30 bg-white/80 dark:bg-black/60 p-3">
                                <BrainCircuit className="text-blue-300" size={20} />
                                <div>
                                    <div className="text-xs font-bold text-slate-900 dark:text-white">{lang === 'vi' ? 'DATASET & NHÃN DỮ LIỆU' : 'DATASET & LABELING'}</div>
                                    <div className="text-[9px] text-slate-500 dark:text-slate-400">{lang === 'vi' ? 'Đang tìm dữ liệu để train AI' : 'Sourcing data for model training'}</div>
                                </div>
                            </div>

                            <div className="bg-white/80 dark:bg-black/60 p-3 rounded border border-blue-500/30 flex items-center gap-3">
                                <Fingerprint className="text-blue-400" size={20} />
                                <div>
                                    <div className="text-xs font-bold text-slate-900 dark:text-white">{lang === 'vi' ? 'NGUỒN GỐC & WATERMARK' : 'PROVENANCE & WATERMARKS'}</div>
                                    <div className="text-[9px] text-slate-500 dark:text-slate-400">{lang === 'vi' ? 'Định hướng C2PA, Content Credentials, SynthID' : 'C2PA, Content Credentials, SynthID direction'}</div>
                                </div>
                            </div>

                            <div className="bg-white/80 dark:bg-black/60 p-3 rounded border border-green-500/30 flex items-center gap-3">
                                <Activity className="text-green-400" size={20} />
                                <div>
                                    <div className="text-xs font-bold text-slate-900 dark:text-white">{lang === 'vi' ? 'MODEL DETECTOR' : 'MODEL DETECTOR'}</div>
                                    <div className="text-[9px] text-slate-500 dark:text-slate-400">{lang === 'vi' ? 'Khóa cho tới khi có benchmark' : 'Locked until benchmark validation'}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Connector 2 */}
                 <div className="flex flex-col items-center justify-center">
                     <div className="relative hidden h-1 w-12 rounded-full bg-gradient-to-r from-primary to-red-500 lg:block">
                         <div className="absolute -right-2 top-1/2 -translate-y-1/2 text-red-500 animate-pulse"><ArrowRight /></div>
                     </div>
                     <div className="relative block h-12 w-1 rounded-full bg-gradient-to-b from-primary to-red-500 lg:hidden">
                         <div className="absolute bottom-[-10px] left-1/2 -translate-x-1/2 text-red-500 animate-pulse"><ArrowDown /></div>
                     </div>
                </div>

                {/* STEP 3: OUTPUT */}
                <div className="flex flex-col gap-4 w-full md:w-auto items-center md:items-start">
                    <div className="mb-2 text-center text-xs font-bold uppercase tracking-[0.12em] text-slate-500 dark:text-slate-400">{lang === 'vi' ? 'ĐẦU RA DỰ KIẾN' : 'PLANNED OUTPUT'}</div>
                    
                    <div className="bg-white dark:bg-gradient-to-br dark:from-gray-900 dark:to-black p-6 rounded-2xl border-2 border-red-500/50 w-full md:w-64 text-center relative overflow-hidden shadow-[0_0_30px_rgba(255,0,0,0.15)] group">
                        <div className="absolute inset-0 bg-red-500/5 animate-pulse"></div>
                        
                        <div className="flex justify-center mb-4">
                            <div className="bg-red-500/10 p-4 rounded-full border border-red-500/50 group-hover:scale-110 transition-transform">
                                 <Shield className="text-red-500" size={48} />
                            </div>
                        </div>
                        
                        <div className="text-4xl font-black text-slate-900 dark:text-white mb-1">AI</div>
                        <div className="text-xs font-bold text-red-500 dark:text-red-400 tracking-wider mb-4">{lang === 'vi' ? 'CHƯA MỞ CÔNG KHAI' : 'NOT PUBLIC YET'}</div>
                        
                        <div className="flex flex-col gap-2 text-[10px] text-left bg-white/80 dark:bg-black/60 p-3 rounded border border-slate-200 dark:border-gray-800">
                            <div className="flex items-center gap-2 text-red-500 dark:text-red-300"><ArrowRight size={10}/> {lang === 'vi' ? 'Báo cáo rủi ro sau benchmark' : 'Risk report after benchmarks'}</div>
                            <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400"><ArrowRight size={10}/> {lang === 'vi' ? 'Khuyến nghị kiểm chứng theo quy trình' : 'Process-based verification guidance'}</div>
                        </div>
                    </div>
                </div>

            </div>
          </div>

          {/* Vision Statement */}
          <div className="mx-4 rounded-2xl border border-black/10 dark:border-white/10 bg-surface p-6 text-center backdrop-blur-sm md:p-10 shadow-lg">
             <Fingerprint className="mx-auto mb-4 text-slate-500" size={48} />
             <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">{lang === 'vi' ? 'TẦM NHÌN TƯƠNG LAI' : 'FUTURE VISION'}</h2>
             <p className="mx-auto max-w-3xl text-sm italic leading-7 text-slate-600 dark:text-slate-300/85 md:text-base">
                {lang === 'vi' 
                  ? '"Trong tương lai, Deepfense sẽ không chỉ là một website, mà là một tiêu chuẩn an toàn bắt buộc trên mọi thiết bị thông minh, giống như dây an toàn trên xe hơi vậy."'
                  : '"In the future, Deepfense will not just be a website, but a mandatory safety standard on every smart device, just like seatbelts in cars."'}
             </p>
          </div>
        </div>
      )}

      {/* TAB CONTENT: PRODUCTS */}
      {activeTab === 'products' && (
        <div key="ai-products" className="tab-panel-reveal tab-copy-reveal animate-in fade-in duration-300 px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
              
              {/* Product 1: Kids & Adults (Main Portal) */}
              <div className="group relative overflow-hidden rounded-xl border border-black/10 dark:border-white/10 bg-surface p-6 transition-all hover:border-blue-500/50 md:p-8">
                  <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
                      <GraduationCap size={150} />
                  </div>
                  <div className="flex items-center gap-4 mb-6">
                      <div className="shrink-0 rounded-full bg-blue-500/15 p-3 text-blue-300">
                          <GraduationCap size={32} />
                      </div>
                      <div>
                          <h3 className="text-xl md:text-2xl font-bold text-slate-900 dark:text-white">DEEPFENSE KIDS & MAIN</h3>
                          <p className="font-mono text-xs text-blue-300">{lang === 'vi' ? 'CỔNG HỌC TẬP TƯƠNG TÁC' : 'INTERACTIVE LEARNING PORTAL'}</p>
                      </div>
                  </div>
                  <p className="mb-6 text-sm leading-7 text-slate-600 dark:text-slate-300 md:text-base">
                      {lang === 'vi' 
                        ? 'Nền tảng học tập chủ động, giúp học sinh, phụ huynh và sinh viên học cách nhận biết deepfake, phishing và các hình thức lừa đảo qua mạng xã hội bằng các tình huống mô phỏng thực tế sinh động.'
                        : 'Active learning platform helping students, parents, and academic users recognize deepfakes, phishing, and online scams through vivid interactive simulator exercises.'}
                  </p>
                  <ul className="space-y-3 text-sm text-slate-500 dark:text-slate-400">
                      <li className="flex items-center gap-2"><span className="h-1.5 w-1.5 shrink-0 rounded-full bg-blue-500"></span> {lang === 'vi' ? 'Học lý thuyết song song với thực hành tình huống trực quan' : 'Learn concepts alongside hands-on real-world simulations'}</li>
                      <li className="flex items-center gap-2"><span className="h-1.5 w-1.5 shrink-0 rounded-full bg-blue-500"></span> {lang === 'vi' ? 'Dashboard theo dõi tiến trình của trẻ dành cho phụ huynh' : 'Parent dashboard to track child safety awareness progress'}</li>
                      <li className="flex items-center gap-2"><span className="h-1.5 w-1.5 shrink-0 rounded-full bg-blue-500"></span> {lang === 'vi' ? 'Hệ thống chứng chỉ số bảo mật cấp học sinh & sinh viên' : 'Digital security certificates tailored for school & college students'}</li>
                  </ul>
              </div>

              {/* Product 2: AI Scan Core */}
              <div className="group relative overflow-hidden rounded-xl border border-black/10 dark:border-white/10 bg-surface p-6 transition-all hover:border-cyan-500/50 md:p-8">
                  <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
                      <Cpu size={150} />
                  </div>
                  <div className="flex items-center gap-4 mb-6">
                      <div className="bg-cyan-500/20 p-3 rounded-full text-cyan-400 shrink-0">
                          <Cpu size={32} />
                      </div>
                      <div>
                          <h3 className="text-xl md:text-2xl font-bold text-slate-900 dark:text-white">DEEPFENSE AI SCAN</h3>
                          <p className="text-xs text-cyan-400 font-mono">{lang === 'vi' ? 'LOCKED - ĐANG TRAIN AI' : 'LOCKED - AI TRAINING'}</p>
                      </div>
                  </div>
                  <p className="mb-6 text-sm leading-7 text-slate-600 dark:text-slate-300 md:text-base">
                      {lang === 'vi' 
                        ? 'Tính năng quét đa phương tiện được khóa trong giai đoạn hiện tại. Deepfense đang tập trung tìm dataset, chuẩn hóa nhãn, kiểm tra nguồn gốc dữ liệu và chuẩn bị benchmark trước khi cho phép người dùng upload hoặc nhận điểm rủi ro AI.'
                        : 'The multimedia scanner is locked in the current phase. Deepfense is focused on dataset sourcing, label normalization, data provenance checks, and benchmark preparation before uploads or AI risk scores are made available.'}
                  </p>
                  <ul className="space-y-3 text-sm text-slate-500 dark:text-slate-400">
                      <li className="flex items-center gap-2"><Lock size={14} className="shrink-0 text-cyan-500" /> {lang === 'vi' ? 'Không mở upload/quét công khai khi chưa có benchmark' : 'No public upload/scanning before benchmarks'}</li>
                      <li className="flex items-center gap-2"><span className="h-1.5 w-1.5 shrink-0 rounded-full bg-cyan-500"></span> {lang === 'vi' ? 'Định hướng kết hợp model detector với C2PA/SynthID/Content Credentials' : 'Planned combination of model detection with C2PA/SynthID/Content Credentials'}</li>
                      <li className="flex items-center gap-2"><span className="h-1.5 w-1.5 shrink-0 rounded-full bg-cyan-500"></span> {lang === 'vi' ? 'API chỉ xem là hạng mục tương lai sau kiểm thử có kiểm soát' : 'API remains a future item after controlled evaluation'}</li>
                  </ul>
              </div>

              {/* Product 3: Assistive Touch */}
              <div className="group relative overflow-hidden rounded-xl border border-black/10 dark:border-white/10 bg-surface p-6 transition-all hover:border-primary/50 md:p-8">
                  <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
                      <Smartphone size={150} />
                  </div>
                  <div className="flex items-center gap-4 mb-6">
                      <div className="shrink-0 rounded-full bg-primary/15 p-3 text-blue-300">
                          <ScanEye size={32} />
                      </div>
                      <div>
                          <h3 className="text-xl md:text-2xl font-bold text-slate-900 dark:text-white">DEEPFENSE TOUCH</h3>
                          <p className="font-mono text-xs text-blue-300">{lang === 'vi' ? 'Ý TƯỞNG MOBILE TƯƠNG LAI' : 'FUTURE MOBILE CONCEPT'}</p>
                      </div>
                  </div>
                  <p className="mb-6 text-sm leading-7 text-slate-600 dark:text-slate-300 md:text-base">
                      {lang === 'vi' 
                        ? 'Đây là hướng nghiên cứu cho phiên bản mobile/lite sau này, ưu tiên cảnh báo, checklist xác minh và hướng dẫn phản ứng nhanh trước khi nghĩ tới quét real-time trên thiết bị.'
                        : 'This is a research direction for a future mobile/lite version, prioritizing alerts, verification checklists, and quick response guidance before any on-device real-time scanning.'}
                  </p>
                  <ul className="space-y-3 text-sm text-slate-500 dark:text-slate-400">
                      <li className="flex items-center gap-2"><Lock size={14} className="shrink-0 text-primary" /> {lang === 'vi' ? 'Không đưa lên roadmap gần khi AI chưa train xong' : 'Not scheduled near-term before AI training is complete'}</li>
                      <li className="flex items-center gap-2"><span className="h-1.5 w-1.5 shrink-0 rounded-full bg-primary"></span> {lang === 'vi' ? 'Tập trung vào mobile lite, đọc nhanh, ít hiệu ứng' : 'Focus on lite mobile, fast reading, fewer effects'}</li>
                      <li className="flex items-center gap-2"><span className="h-1.5 w-1.5 shrink-0 rounded-full bg-primary"></span> {lang === 'vi' ? 'Checklist chống lừa đảo khi gọi video là ưu tiên thực tế hơn' : 'Video-call scam checklists are the practical priority'}</li>
                  </ul>
              </div>

              {/* Product 4: Browser Extension */}
              <div className="group relative overflow-hidden rounded-xl border border-black/10 dark:border-white/10 bg-surface p-6 transition-all hover:border-emerald-500/50 md:p-8">
                  <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
                      <MonitorSmartphone size={150} />
                  </div>
                  <div className="flex items-center gap-4 mb-6">
                      <div className="bg-emerald-500/20 p-3 rounded-full text-emerald-400 shrink-0">
                          <MonitorSmartphone size={32} />
                      </div>
                      <div>
                          <h3 className="text-xl md:text-2xl font-bold text-slate-900 dark:text-white">DEEPFENSE EXTENSION</h3>
                          <p className="text-xs text-emerald-400 font-mono">{lang === 'vi' ? 'ROADMAP SAU BENCHMARK' : 'POST-BENCHMARK ROADMAP'}</p>
                      </div>
                  </div>
                  <p className="mb-6 text-sm leading-7 text-slate-600 dark:text-slate-300 md:text-base">
                      {lang === 'vi' 
                        ? 'Extension chưa được đưa lên sản phẩm hiện tại. Sau khi model có benchmark, nhánh này có thể bắt đầu từ kiểm tra nguồn gốc nội dung, cảnh báo website rủi ro và hướng dẫn xác minh thay vì quét mọi nội dung tự động.'
                        : 'The extension is not part of the current product. After benchmarked models are available, this branch can begin with provenance checks, risky-site warnings, and verification guidance instead of automatic analysis of all content.'}
                  </p>
                  <ul className="space-y-3 text-sm text-slate-500 dark:text-slate-400">
                      <li className="flex items-center gap-2"><Lock size={14} className="shrink-0 text-emerald-500" /> {lang === 'vi' ? 'Không triển khai quét tự động khi chưa có model đáng tin' : 'No automatic scanning before a reliable model exists'}</li>
                      <li className="flex items-center gap-2"><span className="h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-500"></span> {lang === 'vi' ? 'Cảnh báo Website giả mạo cơ quan nhà nước & trang lừa đảo' : 'Anti-Phishing: Alerts for fake government & scam websites'}</li>
                      <li className="flex items-center gap-2"><span className="h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-500"></span> {lang === 'vi' ? 'Tích hợp kiểm tra nguồn gốc hình ảnh qua chữ ký số C2PA' : 'Integrated provenance check via C2PA digital signatures'}</li>
                  </ul>
              </div>
          </div>
        </div>
      )}

      {/* TAB CONTENT: ROADMAP */}
      {activeTab === 'roadmap' && (
        <div key="ai-roadmap" className="tab-panel-reveal tab-copy-reveal animate-in fade-in duration-300">
          <div className="mb-24 max-w-[100vw] overflow-hidden">
            <h3 className="mb-8 flex items-center justify-center gap-3 px-4 text-center font-mono font-bold uppercase tracking-[0.12em] text-slate-500 dark:text-slate-400 md:mb-12">
                 <Map size={24} className="text-blue-300" />
                 {lang === 'vi' ? 'LỘ TRÌNH PHÁT TRIỂN (Q4/2025 - 2028)' : 'DEVELOPMENT ROADMAP (Q4/2025 - 2028)'}
            </h3>
            
            {/* Responsive Container: Vertical on Mobile, Horizontal on Desktop */}
            <div className="pb-12 pt-4 px-4 md:px-8">
                <div className="flex flex-col md:flex-row gap-8 md:gap-5 relative items-stretch max-w-5xl mx-auto">
                    {/* Continuous Connecting Line */}
                    <div className="absolute bottom-0 left-[90px] top-0 w-0.5 bg-gradient-to-b from-primary via-yellow-500 to-green-500 opacity-40 md:hidden"></div>
                    <div className="absolute left-[90px] right-[90px] top-[9px] hidden h-0.5 bg-gradient-to-r from-primary via-yellow-500 to-green-500 opacity-40 md:block"></div>

                    {[
                        {
                            time: "Q4/2025",
                            title: lang === 'vi' ? 'Dự án Giáo dục' : 'Edu Project',
                            desc: lang === 'vi' ? 'Ra mắt nền tảng học nhận diện deepfake và an toàn AI.' : 'Launch deepfake awareness and AI safety learning platform.',
                            icon: <GraduationCap size={16} className="text-blue-400"/>,
                            borderClass: "border-blue-500",
                            textClass: "text-blue-400",
                            hoverClass: "hover:border-blue-500/50",
                            hoverBg: "group-hover:bg-blue-500",
                            shadowHover: "group-hover:shadow-[0_0_15px_#3b82f6]"
                        },
                        {
                            time: "Q1-Q2/2026",
                            title: lang === 'vi' ? 'Nội dung & mẫu dữ liệu' : 'Content & Samples',
                            desc: lang === 'vi' ? 'Hoàn thiện học liệu, tình huống mô phỏng và mẫu dữ liệu ban đầu.' : 'Improve lessons, simulations, and early data samples.',
                            icon: <Video size={16} className="text-blue-400"/>,
                            borderClass: "border-blue-500",
                            textClass: "text-blue-400",
                            hoverClass: "hover:border-blue-500/50",
                            hoverBg: "group-hover:bg-blue-500",
                            shadowHover: "group-hover:shadow-[0_0_15px_#3b82f6]"
                        },
                        {
                            time: "Q4/2026",
                            title: lang === 'vi' ? 'Tìm dataset & học train AI' : 'Dataset & AI Training',
                            desc: lang === 'vi' ? 'Hiện tại: Đang tìm kiếm dataset chuẩn và học cách train AI nhận diện, kiểm tra nhãn dữ liệu.' : 'Current: sourcing datasets for AI training, learning model training and checking label criteria.',
                            icon: <BrainCircuit size={16} className="text-cyan-400"/>,
                            borderClass: "border-cyan-500",
                            textClass: "text-cyan-400",
                            hoverClass: "hover:border-cyan-500/50",
                            hoverBg: "group-hover:bg-cyan-500",
                            shadowHover: "group-hover:shadow-[0_0_15px_#06b6d4]"
                        },
                        {
                            time: "2027",
                            title: lang === 'vi' ? 'Train & benchmark' : 'Train & Benchmark',
                            desc: lang === 'vi' ? 'Train model, đánh giá sai số, kiểm thử có kiểm soát và chưa public máy quét.' : 'Train models, evaluate error rates, run controlled tests, and keep public scanning locked.',
                            icon: <MonitorSmartphone size={16} className="text-yellow-400"/>,
                            borderClass: "border-yellow-500",
                            textClass: "text-yellow-400",
                            hoverClass: "hover:border-yellow-500/50",
                            hoverBg: "group-hover:bg-yellow-500",
                            shadowHover: "group-hover:shadow-[0_0_15px_#eab308]"
                        },
                        {
                            time: "2028",
                            title: lang === 'vi' ? 'Mở theo giai đoạn' : 'Phased Release',
                            desc: lang === 'vi' ? 'Chỉ mở beta/public sau khi benchmark đạt yêu cầu; ưu tiên mobile lite và provenance.' : 'Open beta/public only after benchmark targets; prioritize mobile lite and provenance.',
                            icon: <SmartphoneNfc size={16} className="text-pink-400"/>,
                            borderClass: "border-pink-500",
                            textClass: "text-pink-400",
                            hoverClass: "hover:border-pink-500/50",
                            hoverBg: "group-hover:bg-pink-500",
                            shadowHover: "group-hover:shadow-[0_0_15px_#ec4899]"
                        }
                    ].map((phase, index) => {
                        const isCurrent = index === 2; // Highlight Q3/2026
                        return (
                            <div key={index} className="w-full md:w-[220px] relative group flex flex-row md:flex-col items-center md:items-stretch gap-6 md:gap-0">
                                {/* Dot Point */}
                                <div className={`w-5 h-5 rounded-full bg-white dark:bg-black border-4 ${phase.borderClass} absolute left-[81px] md:left-1/2 md:-translate-x-1/2 top-1/2 -translate-y-1/2 md:top-0 md:translate-y-0 z-10 ${phase.hoverBg} ${phase.shadowHover} transition-all duration-300 ${isCurrent ? '!w-6 !h-6 flex items-center justify-center' : ''}`}>
                                    {isCurrent && <div className="w-1.5 h-1.5 bg-white rounded-full animate-ping"></div>}
                                </div>
                                
                                {/* Card Content */}
                                <div className={`md:mt-8 ml-28 md:ml-0 bg-surface ${isCurrent ? 'border border-blue-500/30' : 'border border-slate-200 dark:border-gray-800'} p-4 md:p-6 rounded-2xl ${phase.hoverClass} transition-colors flex-1 md:h-full flex flex-col items-center text-center justify-center ${isCurrent ? 'relative overflow-hidden shadow-[0_0_30px_rgba(59,130,246,0.15)]' : ''}`}>
                                    {isCurrent && (
                                        <div className="inline-flex bg-blue-500/20 text-blue-300 px-2 py-0.5 rounded-full text-[8px] font-black uppercase tracking-[0.12em] mb-2">
                                            {lang === 'vi' ? 'HIỆN TẠI' : 'CURRENT'}
                                        </div>
                                    )}
                                    
                                    <h4 className={`text-lg md:text-xl font-black text-slate-900 dark:text-white mb-2 tracking-tight ${isCurrent ? 'flex items-center gap-1.5' : ''}`}>
                                        {phase.time} {isCurrent && <BrainCircuit className="text-blue-500" size={16}/>}
                                    </h4>
                                    
                                    <h5 className={`text-[10px] md:text-[11px] font-bold ${phase.textClass} mb-3 uppercase tracking-[0.12em] flex items-center justify-center gap-1.5 leading-tight`}>
                                        {!isCurrent && phase.icon} {phase.title}
                                    </h5>
                                    
                                    <p className={`text-balance text-[10px] leading-relaxed text-slate-500 dark:text-slate-400 md:text-xs ${isCurrent ? 'font-bold !text-slate-600 dark:text-slate-300' : ''}`}>
                                        {phase.desc}
                                    </p>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB CONTENT: COMMERCIALIZATION */}
      {activeTab === 'commercialization' && (
        <div key="ai-commercialization" className="tab-panel-reveal tab-copy-reveal animate-in fade-in duration-300 px-4">
          
          {/* Main Title */}
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-black text-slate-900 dark:text-white mb-2 tracking-tight flex items-center justify-center gap-2">
              <BadgeDollarSign className="text-blue-400" />
              {lang === 'vi' ? 'KẾ HOẠCH PHÁT TRIỂN & THƯƠNG MẠI HÓA' : 'DEVELOPMENT & COMMERCIALIZATION MODEL'}
            </h2>
            <p className="mx-auto max-w-2xl text-xs md:text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
              {lang === 'vi'
                ? 'Mô hình hiện tại ưu tiên giáo dục, chứng chỉ, dashboard theo dõi và hợp tác trường học. API, Extension và AI scanner chỉ là nhánh tương lai sau khi dataset, model và benchmark đạt tiêu chuẩn.'
                : 'The current model prioritizes education, certificates, progress dashboards, and school partnerships. API, Extension, and AI scanner remain future branches after datasets, models, and benchmarks meet the required standard.'}
            </p>
          </div>

          {/* Pricing & Monetization Model Grid */}
          <div className="mb-16">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-2 border-l-2 border-blue-400 pl-3">
              {lang === 'vi' ? 'Các Kênh Doanh Thu Cốt Lõi' : 'Core Monetization Channels'}
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
              {[
                {
                  titleVi: 'Freemium',
                  titleEn: 'Freemium',
                  icon: <Users className="text-slate-600 dark:text-slate-300" />,
                  descVi: 'Miễn phí để tăng trưởng cộng đồng. Cho phép học sinh, phụ huynh và sinh viên học nhận thức, làm quiz và thực hành tình huống mô phỏng.',
                  descEn: 'Free access to grow community. Designed for students, parents, and academic users to learn, take quizzes, and practice simulated scenarios.',
                  badgeVi: 'Thu Hút Dùng Thử',
                  badgeEn: 'User Acquisition'
                },
                {
                  titleVi: 'Gói Pro',
                  titleEn: 'Pro Plan',
                  icon: <CheckCircle2 className="text-blue-400" />,
                  descVi: 'Gói trả phí nhẹ cho Kids & Adults: khóa nâng cao, cấp chứng chỉ số, báo cáo tiến độ và dashboard giám sát của cha mẹ/thầy cô.',
                  descEn: 'Affordable tier for Kids & Adults: advanced courses, digital certs, progress reports, and parent/teacher dashboards.',
                  badgeVi: 'Gia Đình & Cá Nhân',
                  badgeEn: 'Family & Indiv.'
                },
                {
                  titleVi: 'Gói Pro Max',
                  titleEn: 'Pro Max Plan',
                  icon: <Rocket className="text-cyan-400" />,
                  descVi: 'Gói cao cấp trong tương lai cho creators và sinh viên chuyên ngành: labs nâng cao, case study, rubric giám định và DPF points. AI scan chỉ thêm sau benchmark.',
                  descEn: 'Future premium tier for creators and cybersecurity students: advanced labs, case studies, forensic rubrics, and DPF rewards. AI scanning is added only after benchmarks.',
                  badgeVi: 'Sau Kiểm Định',
                  badgeEn: 'Post-Validation'
                },
                {
                  titleVi: 'B2B / B2School',
                  titleEn: 'Enterprise/Edu',
                  icon: <Building2 className="text-emerald-400" />,
                  descVi: 'Bán sỉ theo lớp học/trường/doanh nghiệp. Cung cấp workshop thực tế, dashboard quản trị và báo cáo đánh giá rủi ro hệ thống.',
                  descEn: 'Bulk licenses for schools & SMBs. Provides hands-on workshops, admin console, and institutional security reports.',
                  badgeVi: 'Doanh Thu Ổn Định',
                  badgeEn: 'Bulk Licensing'
                },
                {
                  titleVi: 'API & Extension',
                  titleEn: 'API & Extension',
                  icon: <MonitorSmartphone className="text-yellow-400" />,
                  descVi: 'Nhánh nghiên cứu 2027-2028. Chưa thương mại hóa khi máy quét AI còn khóa; ưu tiên chuẩn nguồn gốc nội dung và kiểm thử có kiểm soát.',
                  descEn: 'A 2027-2028 research branch. Not commercialized while the AI scanner is locked; priority is content provenance and controlled evaluation.',
                  badgeVi: 'Future Roadmap',
                  badgeEn: 'Future Roadmap'
                }
              ].map((tier, idx) => (
                <div key={idx} className="group relative overflow-hidden rounded-2xl border border-black/10 dark:border-white/10 bg-slate-900/40 p-5 transition-all duration-300 hover:border-blue-500/50 hover:bg-slate-900/60 hover:-translate-y-1 flex flex-col justify-between">
                  <div>
                    <div className="mb-4 inline-flex items-center justify-center p-3 bg-black/5 dark:bg-white/5 rounded-xl group-hover:scale-110 transition-transform">
                      {tier.icon}
                    </div>
                    <h4 className="text-base font-bold text-slate-900 dark:text-white mb-2">{lang === 'vi' ? tier.titleVi : tier.titleEn}</h4>
                    <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed mb-6">{lang === 'vi' ? tier.descVi : tier.descEn}</p>
                  </div>
                  <div className="text-[10px] font-mono font-bold tracking-wider text-blue-300 uppercase py-1 border-t border-black/10 dark:border-white/5">
                    {lang === 'vi' ? tier.badgeVi : tier.badgeEn}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Pricing / Feature Comparison Component */}
          <div className="mb-16">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-2 border-l-2 border-blue-400 pl-3">
              {lang === 'vi' ? 'Bảng So Sánh Các Gói Dịch Vụ' : 'Service Tier Feature Comparison'}
            </h3>

            {/* Desktop Comparison Table (Hidden on Mobile) */}
            <div className="hidden lg:block overflow-hidden rounded-2xl border border-black/10 dark:border-white/10 bg-slate-900/40 backdrop-blur-sm">
              <table className="w-full border-collapse text-left">
                <thead>
                  <tr className="border-b border-black/10 dark:border-white/10 bg-white/70 dark:bg-black/40">
                    <th className="p-4 text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">{lang === 'vi' ? 'Tính Năng' : 'Feature'}</th>
                    <th className="p-4 text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 text-center w-48 bg-slate-800/10">Free / Main</th>
                    <th className="p-4 text-xs font-bold uppercase tracking-wider text-blue-300 text-center w-48 bg-blue-500/5">Pro</th>
                    <th className="p-4 text-xs font-bold uppercase tracking-wider text-cyan-300 text-center w-48 bg-cyan-500/5">Pro Max</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {comparisonFeatures.map((row, index) => (
                    <tr key={index} className="hover:bg-black/5 dark:bg-white/5 transition-colors">
                      <td className="p-4 text-sm font-medium text-slate-200">
                        {lang === 'vi' ? row.nameVi : row.nameEn}
                      </td>
                      <td className="p-4 text-center bg-slate-800/5">
                        <div className="flex justify-center">
                          {row.free ? (
                            <Check size={18} className="text-emerald-500 bg-emerald-500/10 p-0.5 rounded-full" />
                          ) : (
                            <X size={18} className="text-slate-600" />
                          )}
                        </div>
                      </td>
                      <td className="p-4 text-center bg-blue-500/5">
                        <div className="flex justify-center">
                          {row.pro ? (
                            <Check size={18} className="text-blue-400 bg-blue-500/10 p-0.5 rounded-full" />
                          ) : (
                            <X size={18} className="text-slate-600" />
                          )}
                        </div>
                      </td>
                      <td className="p-4 text-center bg-cyan-500/5">
                        <div className="flex justify-center">
                          {row.proMax ? (
                            <Check size={18} className="text-cyan-400 bg-cyan-500/10 p-0.5 rounded-full" />
                          ) : (
                            <X size={18} className="text-slate-600" />
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile Comparison Cards (Hidden on Desktop) */}
            <div className="block lg:hidden space-y-6">
              {[
                { title: 'Free / Main', key: 'free', border: 'border-slate-800', badgeColor: 'bg-slate-800/40 text-slate-600 dark:text-slate-300', activeClass: 'text-slate-600 dark:text-slate-300 bg-slate-500/10' },
                { title: 'Pro', key: 'pro', border: 'border-blue-500/30 shadow-[0_0_20px_rgba(59,130,246,0.1)]', badgeColor: 'bg-blue-500/20 text-blue-300', activeClass: 'text-blue-400 bg-blue-500/10' },
                { title: 'Pro Max', key: 'proMax', border: 'border-cyan-500/30 shadow-[0_0_20px_rgba(6,182,212,0.1)]', badgeColor: 'bg-cyan-500/20 text-cyan-300', activeClass: 'text-cyan-400 bg-cyan-500/10' }
              ].map((tier, idx) => (
                <div key={idx} className={`rounded-xl border bg-slate-900/60 p-5 ${tier.border}`}>
                  <div className="flex justify-between items-center mb-4 border-b border-black/10 dark:border-white/10 pb-3">
                    <span className="text-lg font-bold text-slate-900 dark:text-white">{tier.title}</span>
                    <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${tier.badgeColor}`}>
                      {idx === 0 ? (lang === 'vi' ? 'Miễn phí' : 'Free') : (idx === 1 ? 'PRO' : 'PRO MAX')}
                    </span>
                  </div>
                  <ul className="space-y-2.5">
                    {comparisonFeatures.map((feat, fIdx) => {
                      const isAvailable = feat[tier.key as 'free' | 'pro' | 'proMax'];
                      return (
                        <li key={fIdx} className="flex items-center justify-between text-xs">
                          <span className="text-slate-500 dark:text-slate-400">{lang === 'vi' ? feat.nameVi : feat.nameEn}</span>
                          <div>
                            {isAvailable ? (
                              <div className={`flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10px] font-semibold ${tier.activeClass}`}>
                                <Check size={12} /> {lang === 'vi' ? 'Có' : 'Yes'}
                              </div>
                            ) : (
                              <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10px] text-slate-500 bg-black/5 dark:bg-white/5">
                                <X size={12} /> {lang === 'vi' ? 'Không' : 'No'}
                              </div>
                            )}
                          </div>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* DPF Loyalty Coin/Points Compliance Section */}
          <div className="mb-16 relative overflow-hidden rounded-2xl border border-yellow-500/20 bg-slate-900/60 p-6 md:p-8 shadow-[0_0_30px_rgba(234,179,8,0.05)]">
            <div className="absolute top-0 right-0 p-8 opacity-5">
              <Coins size={120} className="text-yellow-400" />
            </div>
            
            <div className="flex flex-col md:flex-row gap-6 items-start md:items-center">
              <div className="p-4 bg-yellow-500/10 rounded-2xl border border-yellow-500/30 text-yellow-400">
                <Coins size={40} />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2 flex items-center gap-2">
                  {lang === 'vi' ? 'TIỆN ÍCH DPF COIN (Hệ Thống Điểm Thưởng Ecosystem)' : 'DPF COIN UTILITY (Ecosystem Loyalty Points)'}
                </h3>
                <p className="text-xs md:text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-4">
                  {lang === 'vi'
                    ? 'DPF được định vị thuần túy là Điểm thưởng/Utility Token dùng để tăng tương tác và thưởng học tập trong Deepfense. Người dùng tích lũy DPF khi hoàn thành các thử thách bảo mật hoặc nhiệm vụ hàng ngày để đổi lấy các tiện ích nội bộ.'
                    : 'DPF is structurally positioned as an internal Reward/Utility Point system designed to boost learning engagement. Users accumulate DPF by completing security challenges and tasks to unlock digital ecosystem features.'}
                </p>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                  {[
                    { labelVi: 'Mở khóa phòng thực hành (Labs)', labelEn: 'Unlock Simulated Labs' },
                    { labelVi: 'Đăng ký cấp chứng chỉ số', labelEn: 'Register Digital Credentials' },
                    { labelVi: 'Đổi huy hiệu & Badge an toàn', labelEn: 'Claim Security Badges' },
                    { labelVi: 'Tham gia sự kiện đặc biệt', labelEn: 'Access Premium Cyber Events' }
                  ].map((item, idx) => (
                    <div key={idx} className="bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-lg p-2.5 text-center">
                      <div className="text-[10px] font-semibold text-slate-600 dark:text-slate-300">{lang === 'vi' ? item.labelVi : item.labelEn}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Strict Regulatory Legal Disclaimer */}
            <div className="mt-4 border border-red-500/20 bg-red-500/5 rounded-xl p-4 flex gap-3 items-start">
              <ShieldAlert className="text-red-400 shrink-0 mt-0.5" size={18} />
              <div>
                <span className="text-[10px] font-bold text-red-400 uppercase tracking-wider block mb-1">
                  {lang === 'vi' ? 'VÔ CÙNG QUAN TRỌNG: CAM KẾT TUÂN THỦ PHÁP LÝ' : 'CRITICAL LEGAL COMPLIANCE DISCLAIMER'}
                </span>
                <span className="text-[10px] md:text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                  {lang === 'vi'
                    ? 'DPF Coin KHÔNG phải sản phẩm đầu cơ, không cam kết sinh lời, không đảm bảo tăng giá trị và không có khả năng chuyển đổi trực tiếp thành tài sản tài chính/tiền mặt bên ngoài nền tảng. Điều này loại bỏ hoàn toàn các rủi ro pháp lý về tài sản ảo bất hợp pháp và tạo dựng niềm tin bền vững với các tổ chức giáo dục cũng như giám khảo.'
                    : 'DPF is NOT a speculative asset, guarantees no returns or appreciation, and carries no cash convertibility outside the platform. This removes financial compliance risks (utility token vs security token) and builds absolute trust with institutional partners and judges.'}
                </span>
              </div>
            </div>
          </div>

          {/* Target Customers Section */}
          <div className="mb-16">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-2 border-l-2 border-blue-400 pl-3">
              {lang === 'vi' ? 'Khách Hàng & Phân Khúc Mục Tiêu' : 'Target Audience & Market Segments'}
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  icon: <GraduationCap className="text-blue-300" />,
                  titleVi: 'Học Sinh / Học Viên',
                  titleEn: 'Students / Learners',
                  descVi: 'Học cách nhận diện Deepfake, Phishing, Scam thông qua simulator thực chiến sinh động và trực quan.',
                  descEn: 'Learn to detect deepfakes, phishing, and online fraud via active, visual simulator practice.'
                },
                {
                  icon: <Users className="text-cyan-300" />,
                  titleVi: 'Phụ Huynh Học Sinh',
                  titleEn: 'Parents & Guardians',
                  descVi: 'Theo dõi tiến trình học an toàn mạng của con và nhận cảnh báo rủi ro bảo mật qua Dashboard phụ huynh.',
                  descEn: 'Track children\'s online safety training progress and view active vulnerability alerts on parent screens.'
                },
                {
                  icon: <BookOpen className="text-emerald-300" />,
                  titleVi: 'Sinh Viên Ngành CNTT / An Ninh',
                  titleEn: 'CyberSecurity Students',
                  descVi: 'Thực hành nâng cao trong các phòng lab giả lập chuyên sâu và sở hữu chứng chỉ số uy tín làm hành trang sự nghiệp.',
                  descEn: 'Access hands-on simulated training labs and secure verifiable credentials to build professional resumes.'
                },
                {
                  icon: <Video className="text-red-300" />,
                  titleVi: 'Creators / KOLs / Influencers',
                  titleEn: 'Digital Content Creators',
                  descVi: 'Quét và kiểm định chất lượng hình ảnh/âm thanh/video tránh rủi ro bản quyền và nội dung bị chỉnh sửa độc hại.',
                  descEn: 'Verify video, image, and voice tracks prior to publishing to guard against malicious editing or copyright fraud.'
                },
                {
                  icon: <School className="text-purple-300" />,
                  titleVi: 'Trường Học & Tổ Chức Giáo Dục',
                  titleEn: 'Schools & Edu Institutions',
                  descVi: 'Mua sỉ trọn gói tài khoản lớp học phục vụ giáo trình an toàn số kết hợp dashboard báo cáo tổng quan.',
                  descEn: 'Bulk licenses for entire classes, featuring tailored digital curricula and school-wide assessment panels.'
                },
                {
                  icon: <Building2 className="text-yellow-300" />,
                  titleVi: 'Doanh Nghiệp SMBs',
                  titleEn: 'SMBs & Businesses',
                  descVi: 'Đào tạo và kiểm tra nhận thức nhân viên thường xuyên nhằm phòng chống lừa đảo giả mạo giám đốc hoặc scam nội bộ.',
                  descEn: 'Conduct regular employee cybersecurity drills to protect corporate assets against CEO impersonation calls.'
                }
              ].map((seg, idx) => (
                <div key={idx} className="bg-slate-900/40 border border-black/10 dark:border-white/10 rounded-2xl p-5 hover:border-blue-500/30 transition-colors flex gap-4">
                  <div className="p-3 bg-black/5 dark:bg-white/5 rounded-xl self-start">
                    {seg.icon}
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-900 dark:text-white mb-1">{lang === 'vi' ? seg.titleVi : seg.titleEn}</h4>
                    <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">{lang === 'vi' ? seg.descVi : seg.descEn}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Commercialization Timeline (Phased Rollout) */}
          <div className="mb-12">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-8 flex items-center gap-2 border-l-2 border-blue-400 pl-3">
              {lang === 'vi' ? 'Lộ Trình Thương Mại Hóa (Phased Rollout)' : 'Commercialization & Launch Roadmap'}
            </h3>

            {/* Horizontal Timeline (Desktop) & Vertical (Mobile) */}
            <div className="relative border-l border-black/10 dark:border-white/10 ml-4 pl-8 md:border-l-0 md:ml-0 md:pl-0 md:grid md:grid-cols-4 md:gap-6">
              
              {/* Connector line for desktop */}
              <div className="absolute top-[28px] left-0 right-0 hidden md:block h-0.5 bg-gradient-to-r from-blue-500 via-cyan-500 to-emerald-500 opacity-20"></div>

              {[
                {
                  phase: 'Phase 1',
                  titleVi: 'MVP Giáo Dục',
                  titleEn: 'Education MVP',
                  descVi: 'Xây dựng cộng đồng, nội dung học tập, quiz, mô phỏng tình huống và chứng chỉ cơ bản.',
                  descEn: 'Build community, learning content, quizzes, scenario simulations, and basic certificates.',
                  statusVi: 'Bắt đầu',
                  statusEn: 'Genesis',
                  color: 'border-blue-500'
                },
                {
                  phase: 'Phase 2',
                  titleVi: 'Tìm Dataset & Học Train AI',
                  titleEn: 'Dataset & AI Training Learning',
                  descVi: 'Q4/2026: Đang tìm kiếm nguồn dataset uy tín và học cách train AI nhận diện; các tính năng tập trung vào học tập, dashboard và chứng chỉ.',
                  descEn: 'Q4/2026: Actively sourcing datasets and learning AI training methods; features focus on learning, dashboards, and certificates.',
                  statusVi: 'Q4/2026',
                  statusEn: 'Q4/2026',
                  color: 'border-blue-400'
                },
                {
                  phase: 'Phase 3',
                  titleVi: 'Train & Beta Có Kiểm Soát',
                  titleEn: 'Training & Controlled Beta',
                  descVi: 'Năm 2027 dành cho train model, kiểm thử sai số, quy trình giám định và beta nội bộ, chưa mở máy quét public.',
                  descEn: '2027 is for model training, error testing, forensic process design, and internal beta, without public scanner release.',
                  statusVi: '2027',
                  statusEn: '2027',
                  color: 'border-cyan-400'
                },
                {
                  phase: 'Phase 4',
                  titleVi: 'Mở Rộng Sau Benchmark',
                  titleEn: 'Post-Benchmark Expansion',
                  descVi: 'Từ 2028 mới cân nhắc scanner, API, extension và hợp tác B2B nếu benchmark đạt yêu cầu và pháp lý rõ ràng.',
                  descEn: 'From 2028, consider scanner, API, extension, and B2B only if benchmarks and legal boundaries are clear.',
                  statusVi: '2028',
                  statusEn: '2028',
                  color: 'border-emerald-500'
                }
              ].map((step, idx) => (
                <div key={idx} className="relative mb-8 md:mb-0 group flex flex-col">
                  {/* Dot */}
                  <div className={`absolute -left-[41px] md:left-1/2 md:-translate-x-1/2 top-1.5 md:top-4 w-5 h-5 rounded-full bg-white dark:bg-black border-4 ${step.color} z-10 transition-transform group-hover:scale-125`}></div>
                  
                  {/* Card Content */}
                  <div className="md:mt-12 bg-slate-900/40 border border-black/10 dark:border-white/10 rounded-2xl p-5 hover:border-blue-500/30 transition-colors flex-1">
                    <span className="text-[10px] font-mono font-bold tracking-wider text-blue-300 uppercase block mb-1">
                      {step.phase} - {lang === 'vi' ? step.statusVi : step.statusEn}
                    </span>
                    <h4 className="text-sm font-bold text-slate-900 dark:text-white mb-2">{lang === 'vi' ? step.titleVi : step.titleEn}</h4>
                    <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">{lang === 'vi' ? step.descVi : step.descEn}</p>
                  </div>
                </div>
              ))}

            </div>
          </div>

        </div>
      )}

    </div>
  );
};

export default AiComingSoon;
