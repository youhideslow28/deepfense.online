
import React, { useState } from 'react';
import { CHECKLIST_DATA, KNOWLEDGE_BASE } from '../data';
import { Language } from '../types';
import { ChevronDown, ChevronUp, ShieldCheck, Search, Zap, Brain, Activity, Info, Gavel, HeartHandshake, Laptop, AlertOctagon, ScanLine, Fingerprint, ShieldAlert, CheckCircle, PhoneCall, RotateCcw, PhoneOff } from 'lucide-react';

// Defined explicit interface for KnowledgeItem props
interface KnowledgeItemProps {
  title: string;
  children?: React.ReactNode;
  icon?: React.ReactNode;
}

// Updated KnowledgeItem to use React.FC for better type safety with reserved props like 'key'
const KnowledgeItem: React.FC<KnowledgeItemProps> = ({ title, children, icon }) => {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <div className={`relative group mb-8 transition-all duration-500 ${isOpen ? 'scale-[1.01]' : 'hover:scale-[1.01]'}`} style={{ perspective: '1000px' }}>
            {/* Hologram Glow & Grid */}
            <div className={`absolute inset-0 bg-gradient-to-r from-primary/20 via-transparent to-primary/20 rounded-2xl blur-xl transition-opacity duration-500 ${isOpen ? 'opacity-100' : 'opacity-0 group-hover:opacity-60'}`}></div>
            
            <div className={`relative bg-black/60 backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden transition-all duration-500 ${isOpen ? 'border-primary/50 shadow-[0_0_30px_rgba(0,240,255,0.15)]' : 'shadow-lg hover:border-primary/30'}`}>
                {/* Hologram Scanline Effect */}
                <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(0,240,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(0,240,255,0.05)_1px,transparent_1px)] bg-[size:40px_40px] opacity-20"></div>
                {isOpen && <div className="absolute top-0 left-0 w-full h-1 bg-primary/50 shadow-[0_0_15px_#00F0FF] animate-[scan_3s_linear_infinite] opacity-70 pointer-events-none"></div>}

                <button onClick={() => setIsOpen(!isOpen)} className="w-full flex items-center justify-between p-6 relative z-10 text-left bg-gradient-to-r from-black/80 to-transparent">
                    <div className="flex items-center gap-4">
                        <div className={`p-3 rounded-xl border transition-colors ${isOpen ? 'bg-primary/20 border-primary/50 text-primary shadow-[0_0_15px_rgba(0,240,255,0.4)]' : 'bg-white/5 border-white/10 text-gray-400 group-hover:text-primary group-hover:border-primary/30'}`}>
                            {icon}
                        </div>
                        <span className={`font-black text-sm md:text-base uppercase tracking-[0.2em] font-mono drop-shadow-md transition-colors ${isOpen ? 'text-primary' : 'text-white group-hover:text-primary/80'}`}>{title}</span>
                    </div>
                    <div className={`shrink-0 transition-transform duration-500 ${isOpen ? 'rotate-180 text-primary' : 'text-gray-500 group-hover:text-primary/50'}`}>
                        <ChevronDown size={24} />
                    </div>
                </button>
                <div className={`grid transition-all duration-500 ease-in-out ${isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}>
                    <div className="overflow-hidden">
                        <div className="p-6 md:p-8 border-t border-primary/20 bg-primary/[0.02] relative z-10">
                            {children}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

interface ToolsProps {
  initialTab?: 'SCAN' | 'KNOWLEDGE';
  lang: Language;
}

const Tools: React.FC<ToolsProps> = ({ initialTab = 'SCAN', lang }) => {
  const [activeTab, setActiveTab] = useState<'SCAN' | 'KNOWLEDGE'>(initialTab);

  // State cho In-Call Protocol (Thực tế & Hành động nhanh)
  const [test1, setTest1] = useState<'IDLE' | 'PASS' | 'FAIL'>('IDLE');
  const [test2, setTest2] = useState<'IDLE' | 'PASS' | 'FAIL'>('IDLE');
  const [test3, setTest3] = useState<'IDLE' | 'PASS' | 'FAIL'>('IDLE');
  const [test4, setTest4] = useState<'IDLE' | 'PASS' | 'FAIL'>('IDLE');
  const [test5, setTest5] = useState<'IDLE' | 'PASS' | 'FAIL'>('IDLE');

  const resetTests = () => {
      setTest1('IDLE');
      setTest2('IDLE');
      setTest3('IDLE');
      setTest4('IDLE');
      setTest5('IDLE');
  };

  const isDanger = test1 === 'FAIL' || test2 === 'FAIL' || test3 === 'FAIL' || test4 === 'FAIL' || test5 === 'FAIL';
  const isSafe = test1 === 'PASS' && test2 === 'PASS' && test3 === 'PASS' && test4 === 'PASS' && test5 === 'PASS';
  const progressCount = [test1, test2, test3, test4, test5].filter(t => t !== 'IDLE').length;

  const getKnowledgeIcon = (category: string) => {
    if (category.includes('PHÁP') || category.includes('LAW')) return <Gavel size={20}/>;
    if (category.includes('TÂM LÝ') || category.includes('PSYCH')) return <Brain size={20}/>;
    if (category.includes('PHÁP Y') || category.includes('FORENSICS')) return <Fingerprint size={20}/>;
    if (category.includes('TOÀN CẦU') || category.includes('GLOBAL')) return <Activity size={20}/>;
    return <Laptop size={20}/>;
  };

  return (
    <div className="animate-in fade-in duration-500 max-w-7xl mx-auto px-4 py-8">
      {/* Tabs */}
      <div className="flex justify-center mb-16">
          <div className="bg-surface p-1.5 rounded-2xl border border-white/5 inline-flex shadow-2xl">
            <button 
                onClick={() => setActiveTab('SCAN')}
                className={`px-10 py-3.5 rounded-xl font-black text-xs transition-all flex items-center gap-2 tracking-[0.2em] uppercase ${activeTab === 'SCAN' ? 'bg-primary text-black shadow-lg shadow-primary/20' : 'text-gray-500 hover:text-white'}`}
            >
                <PhoneCall size={14} /> LIVE VERIFICATION
            </button>
            <button 
                onClick={() => setActiveTab('KNOWLEDGE')}
                className={`px-10 py-3.5 rounded-xl font-black text-xs transition-all flex items-center gap-2 tracking-[0.2em] uppercase ${activeTab === 'KNOWLEDGE' ? 'bg-primary text-black shadow-lg shadow-primary/20' : 'text-gray-500 hover:text-white'}`}
            >
                <Zap size={14} /> {lang === 'vi' ? 'KIẾN THỨC NỀN TẢNG' : 'CORE KNOWLEDGE'}
            </button>
          </div>
      </div>

      {activeTab === 'SCAN' && (
        <div className="animate-in slide-in-from-bottom-4 duration-500">
            <div className="text-center mb-12">
                <h2 className="text-5xl font-black mb-4 text-white uppercase tracking-tighter leading-none">{lang === 'vi' ? 'GIAO THỨC KHẨN CẤP' : 'EMERGENCY PROTOCOL'}</h2>
                <p className="text-gray-400 text-sm max-w-2xl mx-auto">{lang === 'vi'
                    ? 'Bạn đang trong một cuộc gọi video có dấu hiệu mượn tiền? Đừng hoảng loạn. Bật loa ngoài và yêu cầu đối phương làm ngay 3 phép thử dưới đây!'
                    : 'Are you in a suspicious video call asking for money? Turn on speakerphone and ask the caller to perform these 3 live tests immediately!'}
                </p>
            </div>

            {/* BẢNG KỊCH BẢN THỰC CHIẾN MỚI */}
            <div className="bg-surface border border-white/5 rounded-3xl p-6 md:p-8 shadow-2xl mb-16 relative overflow-hidden">
                 {/* Header Giao thức */}
                 <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                     <h3 className="text-white font-black text-sm md:text-base uppercase tracking-[0.2em] flex items-center gap-2">
                         <PhoneCall className="text-primary" size={20}/> 
                         {lang === 'vi' ? 'KỊCH BẢN TƯƠNG TÁC TRỰC TIẾP' : 'LIVE VERIFICATION SCRIPT'}
                     </h3>
                     <div className="flex items-center gap-3">
                         <span className="text-[10px] md:text-xs text-gray-500 font-mono tracking-widest bg-black/50 px-3 py-1.5 rounded-full border border-white/10">
                             {progressCount}/5 {lang === 'vi' ? 'LƯỢT THỬ' : 'TESTS DONE'}
                         </span>
                         <button onClick={resetTests} className="text-gray-400 hover:text-white p-2 rounded-full bg-black/50 border border-white/10 hover:bg-white/10 transition-colors" title={lang === 'vi' ? 'Làm mới' : 'Reset'}>
                             <RotateCcw size={16}/>
                         </button>
                     </div>
                 </div>

                 {/* 3 Thẻ bài test Thực tiễn */}
                 <div className="space-y-4 relative z-10">
                     {/* TEST 1: CHUYỂN ĐỘNG KHÔNG GIAN */}
                     <div className={`p-5 md:p-6 rounded-2xl border transition-all duration-300 ${test1 === 'PASS' ? 'border-green-500/50 bg-green-900/10' : test1 === 'FAIL' ? 'border-red-500/50 bg-red-900/20' : 'border-white/10 bg-black/40 hover:border-white/20'}`}>
                         <div className="flex flex-col lg:flex-row gap-6 justify-between items-start lg:items-center">
                             <div className="flex-1">
                                 <div className="text-primary text-[10px] font-black uppercase tracking-widest mb-2 flex items-center gap-2">
                                     {lang === 'vi' ? 'PHÉP THỬ #1: RỐI LOẠN KHÔNG GIAN' : 'TEST #1: SPATIAL DISTURBANCE'}
                                 </div>
                                 <p className="text-white font-bold text-[15px] md:text-lg italic mb-2 leading-snug">
                                     🗣️ "{lang === 'vi' ? 'Màn hình bên em đang bị đứng hình, anh/chị đưa tay vẫy ngang mặt giúp em với?' : 'Could you wave your hand in front of your face? My screen is freezing.'}"
                                 </p>
                                 <p className="text-gray-400 text-xs font-mono">
                                     {lang === 'vi' ? 'Mục đích: AI lừa đảo thường bị lỗi (xuyên thấu, đứt ngón tay) khi có vật thể che khuất mặt.' : 'Purpose: AI face-swaps glitch (transparency, melting fingers) when obstructed.'}
                                 </p>
                             </div>
                             <div className="flex gap-2 w-full lg:w-auto shrink-0 mt-4 lg:mt-0">
                                 <button onClick={() => setTest1('FAIL')} className={`flex-1 lg:flex-none px-4 py-3 md:py-4 rounded-xl text-[10px] font-black uppercase tracking-wider transition-all border ${test1 === 'FAIL' ? 'bg-red-600 text-white border-red-500 shadow-[0_0_15px_rgba(220,38,38,0.4)] scale-105' : 'bg-black text-gray-400 border-gray-800 hover:border-red-500/50 hover:text-red-500'}`}>
                                     🚨 {lang === 'vi' ? 'Tay Bị Nhòe/Xuyên' : 'Hand Blurs/Melts'}
                                 </button>
                                 <button onClick={() => setTest1('PASS')} className={`flex-1 lg:flex-none px-4 py-3 md:py-4 rounded-xl text-[10px] font-black uppercase tracking-wider transition-all border ${test1 === 'PASS' ? 'bg-green-600 text-white border-green-500 shadow-[0_0_15px_rgba(22,163,74,0.4)] scale-105' : 'bg-black text-gray-400 border-gray-800 hover:border-green-500/50 hover:text-green-500'}`}>
                                     ✅ {lang === 'vi' ? 'Tự Nhiên' : 'Looks Natural'}
                                 </button>
                             </div>
                         </div>
                     </div>

                     {/* TEST 2: GÓC NGHIÊNG TỬ THẦN */}
                     <div className={`p-5 md:p-6 rounded-2xl border transition-all duration-300 ${test2 === 'PASS' ? 'border-green-500/50 bg-green-900/10' : test2 === 'FAIL' ? 'border-red-500/50 bg-red-900/20' : 'border-white/10 bg-black/40 hover:border-white/20'}`}>
                         <div className="flex flex-col lg:flex-row gap-6 justify-between items-start lg:items-center">
                             <div className="flex-1">
                                 <div className="text-blue-400 text-[10px] font-black uppercase tracking-widest mb-2 flex items-center gap-2">
                                     {lang === 'vi' ? 'PHÉP THỬ #2: GÓC NGHIÊNG TỬ THẦN' : 'TEST #2: THE DEADLY PROFILE'}
                                 </div>
                                 <p className="text-white font-bold text-[15px] md:text-lg italic mb-2 leading-snug">
                                     🗣️ "{lang === 'vi' ? 'Bên em loa bị vọng, anh/chị quay mặt hẳn sang ngang 90 độ nói lại giúp em với?' : 'Could you turn your head 90 degrees to the side? The connection is bad.'}"
                                 </p>
                                 <p className="text-gray-400 text-xs font-mono">
                                     {lang === 'vi' ? 'Mục đích: Khi quay nghiêng hẳn, thuật toán nội suy viền mặt sẽ bị vỡ, làm mặt móp méo.' : 'Purpose: Deepfakes train on frontal faces. Turning sideways completely breaks the face boundary.'}
                                 </p>
                             </div>
                             <div className="flex gap-2 w-full lg:w-auto shrink-0 mt-4 lg:mt-0">
                                 <button onClick={() => setTest2('FAIL')} className={`flex-1 lg:flex-none px-4 py-3 md:py-4 rounded-xl text-[10px] font-black uppercase tracking-wider transition-all border ${test2 === 'FAIL' ? 'bg-red-600 text-white border-red-500 shadow-[0_0_15px_rgba(220,38,38,0.4)] scale-105' : 'bg-black text-gray-400 border-gray-800 hover:border-red-500/50 hover:text-red-500'}`}>
                                     🚨 {lang === 'vi' ? 'Mặt Móp Méo' : 'Distorted Face'}
                                 </button>
                                 <button onClick={() => setTest2('PASS')} className={`flex-1 lg:flex-none px-4 py-3 md:py-4 rounded-xl text-[10px] font-black uppercase tracking-wider transition-all border ${test2 === 'PASS' ? 'bg-green-600 text-white border-green-500 shadow-[0_0_15px_rgba(22,163,74,0.4)] scale-105' : 'bg-black text-gray-400 border-gray-800 hover:border-green-500/50 hover:text-green-500'}`}>
                                     ✅ {lang === 'vi' ? 'Tự Nhiên' : 'Looks Natural'}
                                 </button>
                             </div>
                         </div>
                     </div>

                     {/* TEST 3: BẪY NGỮ CẢNH */}
                     <div className={`p-5 md:p-6 rounded-2xl border transition-all duration-300 ${test3 === 'PASS' ? 'border-green-500/50 bg-green-900/10' : test3 === 'FAIL' ? 'border-red-500/50 bg-red-900/20' : 'border-white/10 bg-black/40 hover:border-white/20'}`}>
                         <div className="flex flex-col lg:flex-row gap-6 justify-between items-start lg:items-center">
                             <div className="flex-1">
                                 <div className="text-yellow-400 text-[10px] font-black uppercase tracking-widest mb-2 flex items-center gap-2">
                                     {lang === 'vi' ? 'PHÉP THỬ #3: BẪY NGỮ CẢNH TÂM LÝ' : 'TEST #3: CONTEXT TRAP'}
                                 </div>
                                 <p className="text-white font-bold text-[15px] md:text-lg italic mb-2 leading-snug">
                                     🗣️ {lang === 'vi' ? 'Hỏi một câu có chi tiết sai sự thật. VD: "Hôm qua chó nhà chú bị ốm đã đỡ chưa?" (Dù nhà họ không nuôi chó).' : 'Ask a fake question: "Did your dog recover from yesterday?" (Even if they don\'t own a dog).'}
                                 </p>
                                 <p className="text-gray-400 text-xs font-mono">
                                     {lang === 'vi' ? 'Mục đích: Kẻ gian dùng AI sẽ không biết những bí mật nhỏ. Phản ứng ấp úng là dấu hiệu cảnh báo cao.' : 'Purpose: Scammers don\'t know micro-details. Hesitation or evasion is a major red flag.'}
                                 </p>
                             </div>
                             <div className="flex gap-2 w-full lg:w-auto shrink-0 mt-4 lg:mt-0">
                                 <button onClick={() => setTest3('FAIL')} className={`flex-1 lg:flex-none px-4 py-3 md:py-4 rounded-xl text-[10px] font-black uppercase tracking-wider transition-all border ${test3 === 'FAIL' ? 'bg-red-600 text-white border-red-500 shadow-[0_0_15px_rgba(220,38,38,0.4)] scale-105' : 'bg-black text-gray-400 border-gray-800 hover:border-red-500/50 hover:text-red-500'}`}>
                                     🚨 {lang === 'vi' ? 'Ấp Úng/Lảng Tránh' : 'Hesitates/Evades'}
                                 </button>
                                 <button onClick={() => setTest3('PASS')} className={`flex-1 lg:flex-none px-4 py-3 md:py-4 rounded-xl text-[10px] font-black uppercase tracking-wider transition-all border ${test3 === 'PASS' ? 'bg-green-600 text-white border-green-500 shadow-[0_0_15px_rgba(22,163,74,0.4)] scale-105' : 'bg-black text-gray-400 border-gray-800 hover:border-green-500/50 hover:text-green-500'}`}>
                                     ✅ {lang === 'vi' ? 'Phản Xạ Bác Bỏ Ngay' : 'Corrects Immediately'}
                                 </button>
                             </div>
                         </div>
                     </div>

                     {/* TEST 4: TƯƠNG TÁC VẬT LÝ (TÓC/MÁ) */}
                     <div className={`p-5 md:p-6 rounded-2xl border transition-all duration-300 ${test4 === 'PASS' ? 'border-green-500/50 bg-green-900/10' : test4 === 'FAIL' ? 'border-red-500/50 bg-red-900/20' : 'border-white/10 bg-black/40 hover:border-white/20'}`}>
                         <div className="flex flex-col lg:flex-row gap-6 justify-between items-start lg:items-center">
                             <div className="flex-1">
                                 <div className="text-purple-400 text-[10px] font-black uppercase tracking-widest mb-2 flex items-center gap-2">
                                     {lang === 'vi' ? 'BƯỚC 4: YÊU CẦU VUỐT TÓC / CHẠM MẶT' : 'STEP 4: THE HAIR/FACE TOUCH TEST'}
                                 </div>
                                 <p className="text-white font-bold text-[15px] md:text-lg italic mb-2 leading-snug">
                                     🗣️ "{lang === 'vi' ? 'Anh/chị vuốt tóc lên hoặc dùng ngón tay ấn nhẹ vào má xem camera bên em có bị giật không ạ?' : 'Could you run your fingers through your hair or press your cheek? I need to check the camera focus.'}"
                                 </p>
                                 <div className="text-gray-400 text-xs leading-relaxed">
                                     <span className="text-white font-bold">{lang === 'vi' ? 'Lý do:' : 'Why:'}</span> {lang === 'vi' ? 'Sự đan xen giữa các ngón tay và kết cấu phức tạp như sợi tóc là "điểm mù" lớn nhất của phần mềm Deepfake hiện tại.' : 'The intersection between fingers and complex textures like hair is currently a huge blind spot for Deepfakes.'}
                                     <br/>
                                     <span className="text-purple-400 font-bold">{lang === 'vi' ? '👉 Hãy nhìn kỹ xem:' : '👉 Look closely:'}</span> {lang === 'vi' ? 'Ngón tay của họ có bị mờ hoặc hòa tan vào tóc không? Chỗ má bị ấn vào có bị nhòe thay vì lõm xuống tự nhiên không?' : 'Do their fingers melt or blur into their hair? Does the pressed cheek glitch instead of naturally indenting?'}
                                 </div>
                             </div>
                             <div className="flex gap-2 w-full lg:w-auto shrink-0 mt-4 lg:mt-0">
                                 <button onClick={() => setTest4('FAIL')} className={`flex-1 lg:flex-none px-4 py-3 md:py-4 rounded-xl text-[10px] font-black uppercase tracking-wider transition-all border ${test4 === 'FAIL' ? 'bg-red-600 text-white border-red-500 shadow-[0_0_15px_rgba(220,38,38,0.4)] scale-105' : 'bg-black text-gray-400 border-gray-800 hover:border-red-500/50 hover:text-red-500'}`}>
                                     🚨 {lang === 'vi' ? 'Ngón Tay Bị Tan/Nhòe' : 'Fingers Melt/Blur'}
                                 </button>
                                 <button onClick={() => setTest4('PASS')} className={`flex-1 lg:flex-none px-4 py-3 md:py-4 rounded-xl text-[10px] font-black uppercase tracking-wider transition-all border ${test4 === 'PASS' ? 'bg-green-600 text-white border-green-500 shadow-[0_0_15px_rgba(22,163,74,0.4)] scale-105' : 'bg-black text-gray-400 border-gray-800 hover:border-green-500/50 hover:text-green-500'}`}>
                                     ✅ {lang === 'vi' ? 'Rõ Ràng, Tự Nhiên' : 'Clear & Natural'}
                                 </button>
                             </div>
                         </div>
                     </div>

                     {/* TEST 5: ÁNH SÁNG ĐỘNG (TRÙM CUỐI) */}
                     <div className={`p-5 md:p-6 rounded-2xl border transition-all duration-300 ${test5 === 'PASS' ? 'border-green-500/50 bg-green-900/10' : test5 === 'FAIL' ? 'border-red-500/50 bg-red-900/20' : 'border-white/10 bg-black/40 hover:border-white/20'}`}>
                         <div className="flex flex-col lg:flex-row gap-6 justify-between items-start lg:items-center">
                             <div className="flex-1">
                                 <div className="text-cyan-400 text-[10px] font-black uppercase tracking-widest mb-2 flex items-center gap-2">
                                     {lang === 'vi' ? 'BƯỚC 5 (TRÙM CUỐI): ÁNH SÁNG ĐỘNG' : 'STEP 5 (ULTIMATE): DYNAMIC LIGHTING'}
                                 </div>
                                 <p className="text-white font-bold text-[15px] md:text-lg italic mb-2 leading-snug">
                                     🗣️ "{lang === 'vi' ? 'Chỗ anh/chị hơi tối, anh/chị cầm điện thoại rọi đèn pin qua lại lên mặt, hoặc bật tắt công tắc đèn phòng giúp em với?' : 'Could you shine a flashlight on your face or quickly turn the room lights on and off?'}"
                                 </p>
                                 <div className="text-gray-400 text-xs leading-relaxed">
                                     <span className="text-white font-bold">{lang === 'vi' ? 'Lý do:' : 'Why:'}</span> {lang === 'vi' ? 'Khuôn mặt AI thường được "in" cứng ánh sáng từ video gốc. Khi ánh sáng môi trường thay đổi đột ngột, AI không thể tạo ra bóng đổ theo thời gian thực.' : 'AI faces have baked-in static lighting. They completely fail to react to sudden, real-world light changes.'}
                                     <br/>
                                     <span className="text-cyan-400 font-bold">{lang === 'vi' ? '👉 Hãy nhìn kỹ xem:' : '👉 Look closely:'}</span> {lang === 'vi' ? 'Bóng đổ trên mũi, gò má có di chuyển theo luồng sáng không? Hay khuôn mặt vẫn sáng đều ảo trân và không hề đổi màu?' : 'Do shadows on the nose and cheeks shift with the light? Or does the face remain uniformly lit and flat?'}
                                 </div>
                             </div>
                             <div className="flex gap-2 w-full lg:w-auto shrink-0 mt-4 lg:mt-0">
                                 <button onClick={() => setTest5('FAIL')} className={`flex-1 lg:flex-none px-4 py-3 md:py-4 rounded-xl text-[10px] font-black uppercase tracking-wider transition-all border ${test5 === 'FAIL' ? 'bg-red-600 text-white border-red-500 shadow-[0_0_15px_rgba(220,38,38,0.4)] scale-105' : 'bg-black text-gray-400 border-gray-800 hover:border-red-500/50 hover:text-red-500'}`}>
                                     🚨 {lang === 'vi' ? 'Mặt Trơ / Bóng Cố Định' : 'Static Light / Flat Face'}
                                 </button>
                                 <button onClick={() => setTest5('PASS')} className={`flex-1 lg:flex-none px-4 py-3 md:py-4 rounded-xl text-[10px] font-black uppercase tracking-wider transition-all border ${test5 === 'PASS' ? 'bg-green-600 text-white border-green-500 shadow-[0_0_15px_rgba(22,163,74,0.4)] scale-105' : 'bg-black text-gray-400 border-gray-800 hover:border-green-500/50 hover:text-green-500'}`}>
                                     ✅ {lang === 'vi' ? 'Bóng Di Chuyển Thật' : 'Dynamic Shadows'}
                                 </button>
                             </div>
                         </div>
                     </div>
                 </div>

                 {/* Trạng thái Kết quả (Dynamic Result Area) */}
                 {(isDanger || isSafe || progressCount > 0) && (
                     <div className="mt-8 pt-8 border-t border-white/10 animate-in slide-in-from-bottom-4">
                         {isDanger ? (
                              <div className="bg-red-500/10 border-2 border-red-500 rounded-3xl p-6 md:p-10 flex flex-col md:flex-row items-center gap-6 md:gap-8 text-center md:text-left shadow-[0_0_40px_rgba(220,38,38,0.2)]">
                                  <div className="bg-red-500 text-white p-5 rounded-full animate-pulse shrink-0 shadow-[0_0_20px_#ef4444]">
                                      <PhoneOff size={40} />
                                  </div>
                                  <div className="flex-1">
                                      <h3 className="text-red-500 font-black text-2xl md:text-3xl uppercase tracking-tighter mb-3 leading-tight">{lang === 'vi' ? '100% LÀ DEEPFAKE! CÚP MÁY NGAY!' : '100% DEEPFAKE! HANG UP NOW!'}</h3>
                                      <p className="text-red-200/90 text-sm md:text-base leading-relaxed">{lang === 'vi' ? 'Hình ảnh đã bộc lộ sơ hở đặc trưng của thuật toán AI. Tuyệt đối KHÔNG chuyển tiền và KHÔNG cung cấp mã OTP. Cúp máy, chặn số và tự gọi lại bằng SIM mạng bình thường để xác minh!' : 'The video exhibits distinct generative AI artifacts. DO NOT transfer any money or provide OTP codes. Hang up, block the number, and call back using a regular cellular network to verify!'}</p>
                                  </div>
                              </div>
                         ) : isSafe ? (
                              <div className="bg-green-500/10 border border-green-500/50 rounded-2xl p-6 flex flex-col md:flex-row items-center gap-5 text-center md:text-left">
                                  <CheckCircle className="text-green-500 shrink-0" size={32} />
                                  <div>
                                      <h3 className="text-green-500 font-black text-lg uppercase tracking-tight mb-2">{lang === 'vi' ? 'CÁC PHÉP THỬ ĐỀU THÔNG QUA' : 'ALL TESTS PASSED'}</h3>
                                      <p className="text-green-200/70 text-sm leading-relaxed">{lang === 'vi' ? 'Video có vẻ là thực tế. Tuy nhiên, nếu họ vẫn liên tục thúc giục bạn chuyển tiền gấp bằng mọi giá, hãy viện lý do và gọi lại xác minh.' : 'The video appears genuine. However, if they still forcefully urge you to transfer money, make an excuse and verify offline.'}</p>
                                  </div>
                              </div>
                         ) : (
                              <div className="text-center bg-black/30 py-4 rounded-xl border border-white/5 text-gray-500 text-xs font-mono animate-pulse flex items-center justify-center gap-3">
                                  <ScanLine size={16}/> {lang === 'vi' ? 'HỆ THỐNG ĐANG ĐỢI KẾT QUẢ TỪ PHÍA BẠN...' : 'WAITING FOR YOUR OBSERVATION RESULTS...'}
                              </div>
                         )}
                     </div>
                 )}
            </div>
        </div>
      )}

      {activeTab === 'KNOWLEDGE' && (
        <div className="animate-in fade-in duration-700 relative">
            <style>{`
              @keyframes scan {
                0% { transform: translateY(-100%); opacity: 0; }
                10% { opacity: 1; }
                90% { opacity: 1; }
                100% { transform: translateY(1000px); opacity: 0; }
              }
              @keyframes float {
                0%, 100% { transform: translateY(0); }
                50% { transform: translateY(-5px); }
              }
            `}</style>
            
            <div className="text-center mb-16 relative">
                {/* Hologram Header Decor */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-primary/20 rounded-full blur-[80px] pointer-events-none"></div>
                <h2 className="text-4xl md:text-5xl font-black mb-4 text-transparent bg-clip-text bg-gradient-to-r from-white via-primary to-white uppercase tracking-tighter leading-none relative z-10 animate-pulse">
                    {lang === 'vi' ? 'NỘI DUNG KIẾN THỨC' : 'KNOWLEDGE CONTENT'}
                </h2>
            </div>
            
            <div className="relative z-10 max-w-5xl mx-auto">
                {KNOWLEDGE_BASE[lang] ? KNOWLEDGE_BASE[lang].map((cat: any, idx: number) => (
                    <KnowledgeItem key={idx} title={cat.category} icon={getKnowledgeIcon(cat.category)}>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {cat.items.map((item: any, i: number) => (
                                <div key={i} className="relative group/card bg-black/80 p-6 rounded-xl border border-primary/20 hover:border-primary transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_10px_30px_rgba(0,240,255,0.2)] animate-[float_4s_ease-in-out_infinite]" style={{ animationDelay: `${i * 0.2}s` }}>
                                    {/* Decorator elements for sci-fi datacube look */}
                                    <div className="absolute top-0 left-0 w-2 h-2 border-t-2 border-l-2 border-primary rounded-tl-sm transition-all group-hover/card:w-4 group-hover/card:h-4"></div>
                                    <div className="absolute top-0 right-0 w-2 h-2 border-t-2 border-r-2 border-primary rounded-tr-sm transition-all group-hover/card:w-4 group-hover/card:h-4"></div>
                                    <div className="absolute bottom-0 left-0 w-2 h-2 border-b-2 border-l-2 border-primary rounded-bl-sm transition-all group-hover/card:w-4 group-hover/card:h-4"></div>
                                    <div className="absolute bottom-0 right-0 w-2 h-2 border-b-2 border-r-2 border-primary rounded-br-sm transition-all group-hover/card:w-4 group-hover/card:h-4"></div>
                                    
                                    <h4 className="text-primary font-black text-[12px] uppercase tracking-widest mb-4 font-mono group-hover/card:text-white transition-colors">{item.title}</h4>
                                    <p className="text-xs text-gray-400 leading-relaxed font-mono opacity-80 group-hover/card:opacity-100 transition-opacity group-hover/card:text-primary/90">{item.content}</p>
                                </div>
                            ))}
                        </div>
                    </KnowledgeItem>
                )) : (
                   <div className="text-center py-20 text-primary/50 italic font-mono animate-pulse">DOWNLOADING SECURE DATA...</div>
                )}

                {/* Default Hardcoded knowledge for safety */}
                <KnowledgeItem title={lang === 'vi' ? "🛡️ GIAO THỨC PHÒNG VỆ" : "🛡️ DEFENSE PROTOCOL"} icon={<ShieldCheck size={20}/>}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-[12px] text-gray-300 leading-relaxed">
                        <div className="relative group/card bg-black/80 p-8 rounded-2xl border border-primary/20 hover:border-primary transition-all duration-300 hover:shadow-[0_0_30px_rgba(0,240,255,0.15)] overflow-hidden">
                            <div className="absolute top-0 right-0 bg-primary text-black font-bold text-[8px] px-2 py-1 rounded-bl-lg font-mono">PROTOCOL_01</div>
                            <div className="text-primary font-black text-sm mb-6 uppercase tracking-widest flex items-center gap-3 font-mono">
                               <Brain size={18} className="animate-pulse"/> {lang === 'vi' ? 'QUY TẮC "CHẬM LẠI 1 NHỊP"' : '"SLOW DOWN" RULE'}
                            </div>
                            <ul className="space-y-4 font-mono text-xs">
                                <li className="flex gap-4 items-start"><span className="text-primary font-black mt-1 opacity-70">&gt;</span> {lang === 'vi' ? 'Luôn dành ít nhất 30 giây suy nghĩ trước khi thực hiện bất kỳ giao dịch nào.' : 'Always take at least 30 seconds to think before any transaction.'}</li>
                                <li className="flex gap-4 items-start"><span className="text-primary font-black mt-1 opacity-70">&gt;</span> {lang === 'vi' ? 'Kiểm tra chéo: Dùng sim thường gọi lại cho người thân để xác nhận.' : 'Cross-check: Use normal SIM to call back relatives for confirmation.'}</li>
                            </ul>
                        </div>
                        <div className="relative group/card bg-black/80 p-8 rounded-2xl border border-success/20 hover:border-success transition-all duration-300 hover:shadow-[0_0_30px_rgba(34,197,94,0.15)] overflow-hidden">
                            <div className="absolute top-0 right-0 bg-success text-black font-bold text-[8px] px-2 py-1 rounded-bl-lg font-mono">PROTOCOL_02</div>
                            <div className="text-success font-black text-sm mb-6 uppercase tracking-widest flex items-center gap-3 font-mono">
                               <HeartHandshake size={18} className="animate-pulse"/> {lang === 'vi' ? 'MẬT MÃ GIA ĐÌNH' : 'FAMILY CODE'}
                            </div>
                            <ul className="space-y-4 font-mono text-xs">
                                <li className="flex gap-4 items-start"><span className="text-success font-black mt-1 opacity-70">&gt;</span> {lang === 'vi' ? 'Thiết lập một từ khóa bí mật hoặc một câu hỏi riêng tư mà chỉ người thân mới trả lời được.' : 'Establish a keyword or private question only family members can answer.'}</li>
                                <li className="flex gap-4 items-start"><span className="text-success font-black mt-1 opacity-70">&gt;</span> {lang === 'vi' ? 'Cập nhật mật mã định kỳ 3 tháng một lần để đảm bảo an toàn.' : 'Update the code every 3 months for safety.'}</li>
                            </ul>
                        </div>
                    </div>
                </KnowledgeItem>
            </div>
        </div>
      )}
    </div>
  );
};

// Helper icon
const ActivityIcon = ({size, className}: any) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></svg>
)
export default Tools;
