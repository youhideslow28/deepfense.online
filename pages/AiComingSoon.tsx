
import React from 'react';
import { Cpu, Fingerprint, ScanEye, Shield, Smartphone, FileSearch, ArrowRight, ArrowDown, Video, Mic, UploadCloud, Eye, BrainCircuit, Play, Map, GraduationCap, MonitorSmartphone, SmartphoneNfc, Rocket } from 'lucide-react';
import { Language } from '../types';

interface AiComingSoonProps {
  lang: Language;
}

const AiComingSoon: React.FC<AiComingSoonProps> = ({ lang }) => {
  return (
    <div className="max-w-7xl mx-auto animate-in fade-in duration-500">
      
      {/* Header */}
      <div className="text-center mb-16 px-4">
        <div className="inline-flex items-center gap-2 bg-purple-500/10 text-purple-400 border border-purple-500/30 px-4 py-1 rounded-full text-xs font-bold mb-4 animate-pulse">
            <Cpu size={14} /> {lang === 'vi' ? 'DỰ ÁN ĐANG PHÁT TRIỂN' : 'PROJECT UNDER DEVELOPMENT'}
        </div>
        <h1 className="text-4xl md:text-6xl font-black text-white mb-4 tracking-tight">
          DEEPFENSE<span className="text-purple-500"> AI</span>
        </h1>
        <p className="text-lg md:text-xl text-white font-mono mb-6 bg-surface inline-block px-4 py-2 rounded border border-gray-800">
             {lang === 'vi' ? '"Khi AI tấn công, hãy dùng AI để phòng thủ."' : '"When AI attacks, use AI to defend."'}
        </p>
        <p className="text-gray-400 max-w-2xl mx-auto text-base md:text-lg">
          {lang === 'vi' 
            ? 'Hệ thống phòng thủ chủ động sử dụng trí tuệ nhân tạo để quét, phân tích và ngăn chặn các cuộc tấn công Deepfake theo thời gian thực.'
            : 'Active defense system using artificial intelligence to scan, analyze and prevent Deepfake attacks in real-time.'}
        </p>
      </div>

      {/* Logic Flowchart Diagram (Responsive: Vertical on Mobile, Horizontal on Desktop) */}
      <div className="mb-24 px-4">
        <h3 className="text-center font-bold text-gray-500 mb-10 font-mono tracking-widest uppercase flex items-center justify-center gap-2">
             <BrainCircuit /> {lang === 'vi' ? 'CƠ CHẾ HOẠT ĐỘNG TỔNG THỂ' : 'OVERALL OPERATING MECHANISM'}
        </h3>
        
        {/* Flex container for flow */}
        <div className="flex flex-col lg:flex-row items-center justify-center gap-6 md:gap-8">
            
            {/* STEP 1: INPUTS */}
            <div className="flex flex-col gap-4 w-full md:w-auto">
                <div className="text-xs font-bold text-gray-500 text-center mb-2 tracking-widest uppercase">{lang === 'vi' ? 'NGUỒN DỮ LIỆU' : 'DATA SOURCES'}</div>
                
                <div className="bg-surface p-4 rounded-xl border border-gray-700 w-full md:w-56 hover:border-blue-500 transition-colors flex items-center gap-4 shadow-lg group">
                    <div className="bg-blue-500/20 p-3 rounded-lg text-blue-400 group-hover:scale-110 transition-transform"><Smartphone size={24}/></div>
                    <div className="flex flex-col">
                        <span className="text-sm font-bold text-white">VIDEO CALL</span>
                        <span className="text-[10px] text-gray-500">Zalo/Messenger/Tele</span>
                    </div>
                </div>

                <div className="bg-surface p-4 rounded-xl border border-gray-700 w-full md:w-56 hover:border-green-500 transition-colors flex items-center gap-4 shadow-lg group">
                    <div className="bg-green-500/20 p-3 rounded-lg text-green-400 group-hover:scale-110 transition-transform"><UploadCloud size={24}/></div>
                    <div className="flex flex-col">
                        <span className="text-sm font-bold text-white">VIDEO FILE</span>
                        <span className="text-[10px] text-gray-500">Upload MP4/MOV</span>
                    </div>
                </div>

                <div className="bg-surface p-4 rounded-xl border border-gray-700 w-full md:w-56 hover:border-yellow-500 transition-colors flex items-center gap-4 shadow-lg group">
                    <div className="bg-yellow-500/20 p-3 rounded-lg text-yellow-400 group-hover:scale-110 transition-transform"><Mic size={24}/></div>
                    <div className="flex flex-col">
                        <span className="text-sm font-bold text-white">{lang === 'vi' ? 'ÂM THANH' : 'AUDIO'}</span>
                        <span className="text-[10px] text-gray-500">Voice Chat/Ghi âm</span>
                    </div>
                </div>
            </div>

            {/* Connector 1 */}
            <div className="flex flex-col items-center justify-center">
                 {/* Show arrow right on Desktop, arrow down on Mobile */}
                 <div className="hidden lg:block w-12 h-1 bg-gradient-to-r from-gray-700 to-purple-500 rounded-full relative">
                    <div className="absolute -right-2 top-1/2 -translate-y-1/2 text-purple-500 animate-pulse"><ArrowRight /></div>
                 </div>
                 <div className="block lg:hidden h-12 w-1 bg-gradient-to-b from-gray-700 to-purple-500 rounded-full relative">
                    <div className="absolute bottom-[-10px] left-1/2 -translate-x-1/2 text-purple-500 animate-pulse"><ArrowDown /></div>
                 </div>
            </div>

            {/* STEP 2: AI PROCESSING CORE */}
            <div className="relative flex flex-col items-center w-full md:w-auto">
                <div className="text-xs font-bold text-purple-500 text-center mb-4 tracking-widest uppercase">DEEPFENSE CORE ENGINE</div>
                
                <div className="bg-black/80 backdrop-blur-xl p-1 rounded-2xl border-2 border-purple-500 shadow-[0_0_50px_rgba(168,85,247,0.2)] w-full md:w-auto">
                    <div className="bg-gray-900 rounded-xl p-6 w-full md:w-80 flex flex-col gap-4 relative overflow-hidden">
                        {/* Scan effect inside */}
                        <div className="absolute top-0 left-0 w-full h-1 bg-purple-500 shadow-[0_0_10px_#a855f7] animate-[scan_2s_ease-in-out_infinite]"></div>
                        
                        <div className="bg-black/60 p-3 rounded border border-purple-500/30 flex items-center gap-3">
                            <BrainCircuit className="text-purple-400" size={20} />
                            <div>
                                <div className="text-xs font-bold text-white">{lang === 'vi' ? 'PHÂN TÍCH MẠNG NƠ-RON' : 'NEURAL DISCRIMINATOR'}</div>
                                <div className="text-[9px] text-gray-500">{lang === 'vi' ? 'Quét nhiễu không gian tiềm ẩn (Latent Space)' : 'Detecting GAN & Diffusion artifacts'}</div>
                            </div>
                        </div>

                        <div className="bg-black/60 p-3 rounded border border-blue-500/30 flex items-center gap-3">
                            <Fingerprint className="text-blue-400" size={20} />
                            <div>
                                <div className="text-xs font-bold text-white">{lang === 'vi' ? 'XÁC THỰC C2PA & WATERMARK' : 'C2PA & WATERMARK AUTH'}</div>
                                <div className="text-[9px] text-gray-500">{lang === 'vi' ? 'Truy xuất chữ ký số và nguồn gốc tệp' : 'Cryptographic provenance verification'}</div>
                            </div>
                        </div>

                        <div className="bg-black/60 p-3 rounded border border-green-500/30 flex items-center gap-3">
                            <ActivityIcon className="text-green-400" size={20} />
                            <div>
                                <div className="text-xs font-bold text-white">{lang === 'vi' ? 'BIỂU HIỆN TRUNG THỰC' : 'PHYSIOLOGICAL TRUTH'}</div>
                                <div className="text-[9px] text-gray-500">{lang === 'vi' ? 'Quét mạch máu rPPG & Vi rung động' : 'rPPG heart-rate & Micro-vibrations'}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Connector 2 */}
             <div className="flex flex-col items-center justify-center">
                 {/* Show arrow right on Desktop, arrow down on Mobile */}
                 <div className="hidden lg:block w-12 h-1 bg-gradient-to-r from-purple-500 to-red-500 rounded-full relative">
                     <div className="absolute -right-2 top-1/2 -translate-y-1/2 text-red-500 animate-pulse"><ArrowRight /></div>
                 </div>
                 <div className="block lg:hidden h-12 w-1 bg-gradient-to-b from-purple-500 to-red-500 rounded-full relative">
                     <div className="absolute bottom-[-10px] left-1/2 -translate-x-1/2 text-red-500 animate-pulse"><ArrowDown /></div>
                 </div>
            </div>

            {/* STEP 3: OUTPUT */}
            <div className="flex flex-col gap-4 w-full md:w-auto items-center md:items-start">
                <div className="text-xs font-bold text-gray-500 text-center mb-2 tracking-widest uppercase">{lang === 'vi' ? 'KẾT QUẢ & HÀNH ĐỘNG' : 'RESULTS & ACTIONS'}</div>
                
                <div className="bg-gradient-to-br from-gray-900 to-black p-6 rounded-2xl border-2 border-red-500/50 w-full md:w-64 text-center relative overflow-hidden shadow-[0_0_30px_rgba(255,0,0,0.15)] group">
                    <div className="absolute inset-0 bg-red-500/5 animate-pulse"></div>
                    
                    <div className="flex justify-center mb-4">
                        <div className="bg-red-500/10 p-4 rounded-full border border-red-500/50 group-hover:scale-110 transition-transform">
                             <Shield className="text-red-500" size={48} />
                        </div>
                    </div>
                    
                    <div className="text-4xl font-black text-white mb-1">99.9%</div>
                    <div className="text-xs font-bold text-red-400 tracking-wider mb-4">{lang === 'vi' ? 'PHÁT HIỆN GIẢ MẠO' : 'FAKE DETECTION'}</div>
                    
                    <div className="flex flex-col gap-2 text-[10px] text-left bg-black/60 p-3 rounded border border-gray-800">
                        <div className="flex items-center gap-2 text-red-300"><ArrowRight size={10}/> {lang === 'vi' ? 'Cảnh báo người dùng ngay lập tức' : 'Alert user immediately'}</div>
                        <div className="flex items-center gap-2 text-gray-400"><ArrowRight size={10}/> {lang === 'vi' ? 'Tự động ngắt kết nối (Tùy chọn)' : 'Auto-disconnect (Optional)'}</div>
                    </div>
                </div>
            </div>

        </div>
      </div>

      {/* Hero Solutions Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20 px-4">
          
          {/* Solution 1: Assistive Touch */}
          <div className="bg-surface border border-gray-800 rounded-xl p-6 md:p-8 hover:border-purple-500 transition-colors group relative overflow-hidden">
              <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
                  <Smartphone size={150} />
              </div>
              <div className="flex items-center gap-4 mb-6">
                  <div className="bg-purple-500/20 p-3 rounded-full text-purple-400 shrink-0">
                      <ScanEye size={32} />
                  </div>
                  <div>
                      <h3 className="text-xl md:text-2xl font-bold text-white">DEEPFENSE TOUCH</h3>
                      <p className="text-xs text-purple-400 font-mono">ON-SCREEN SHIELD</p>
                  </div>
              </div>
              <p className="text-gray-300 mb-6 leading-relaxed text-sm md:text-base">
                  {lang === 'vi' 
                    ? 'Một nút ảo (Assistive Touch) luôn hiện diện trên màn hình điện thoại của bạn. Khi có cuộc gọi video đến, chỉ cần 1 chạm, AI sẽ quét toàn bộ màn hình theo thời gian thực để tìm kiếm dấu hiệu giả mạo mà mắt thường không thấy.'
                    : 'A virtual button (Assistive Touch) always present on your phone screen. When a video call arrives, with just 1 tap, AI scans the entire screen in real-time to find deepfake signs invisible to the naked eye.'}
              </p>
              <ul className="space-y-3 text-sm text-gray-400">
                  <li className="flex gap-2 items-center"><span className="w-1.5 h-1.5 bg-purple-500 rounded-full shrink-0"></span> {lang === 'vi' ? 'Tự động kích hoạt khi có cuộc gọi Zalo/Messenger' : 'Auto-activate for Zalo/Messenger calls'}</li>
                  <li className="flex gap-2 items-center"><span className="w-1.5 h-1.5 bg-purple-500 rounded-full shrink-0"></span> {lang === 'vi' ? 'Phân tích vi biểu cảm (Micro-expressions)' : 'Micro-expressions analysis'}</li>
                  <li className="flex gap-2 items-center"><span className="w-1.5 h-1.5 bg-purple-500 rounded-full shrink-0"></span> {lang === 'vi' ? 'Cảnh báo đỏ ngay trên khuôn mặt giả' : 'Red alert directly on fake face'}</li>
              </ul>
          </div>

          {/* Solution 2: File Analysis Agent */}
          <div className="bg-surface border border-gray-800 rounded-xl p-6 md:p-8 hover:border-blue-500 transition-colors group relative overflow-hidden">
              <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
                  <Shield size={150} />
              </div>
              <div className="flex items-center gap-4 mb-6">
                  <div className="bg-blue-500/20 p-3 rounded-full text-blue-400 shrink-0">
                      <FileSearch size={32} />
                  </div>
                  <div>
                      <h3 className="text-xl md:text-2xl font-bold text-white">SMART AGENT</h3>
                      <p className="text-xs text-blue-400 font-mono">{lang === 'vi' ? 'PHÂN TÍCH CHUYÊN SÂU' : 'IN-DEPTH ANALYSIS'}</p>
                  </div>
              </div>
              <p className="text-gray-300 mb-6 leading-relaxed text-sm md:text-base">
                  {lang === 'vi' 
                    ? 'Bạn nhận được một video tống tiền? Một đoạn ghi âm đáng ngờ? Hãy gửi nó cho Smart Agent. AI sẽ phân tích quang phổ âm thanh và metadata để xác định nguồn gốc file là thật hay do máy tạo.'
                    : 'Received a blackmail video? A suspicious recording? Send it to Smart Agent. AI analyzes acoustic spectrum and metadata to determine if the file is real or AI-generated.'}
              </p>
              <ul className="space-y-3 text-sm text-gray-400">
                  <li className="flex gap-2 items-center"><span className="w-1.5 h-1.5 bg-blue-500 rounded-full shrink-0"></span> {lang === 'vi' ? 'Truy xuất nguồn gốc & Chữ ký số C2PA' : 'Provenance & C2PA Digital Signature Auth'}</li>
                  <li className="flex gap-2 items-center"><span className="w-1.5 h-1.5 bg-blue-500 rounded-full shrink-0"></span> {lang === 'vi' ? 'Giải mã Artifacts không gian tiềm ẩn (Latent Space)' : 'Latent Space Artifact Decoding'}</li>
                  <li className="flex gap-2 items-center"><span className="w-1.5 h-1.5 bg-blue-500 rounded-full shrink-0"></span> {lang === 'vi' ? 'Trợ lý AI Expert & Phân tích Forensic 2026' : '2026 Expert AI & Forensic Analysis'}</li>
              </ul>
          </div>
      </div>

      {/* Roadmap Section */}
      <div className="mb-24 max-w-[100vw] overflow-hidden">
        <h3 className="text-center font-bold text-gray-500 mb-8 md:mb-12 font-mono tracking-widest uppercase flex items-center justify-center gap-3 px-4">
             <Map size={24} className="text-purple-500" /> 
             {lang === 'vi' ? 'LỘ TRÌNH PHÁT TRIỂN (Q4/2025 - Q4/2027)' : 'DEVELOPMENT ROADMAP (Q4/2025 - Q4/2027)'}
        </h3>
        
        {/* Hint for mobile users */}
        <div className="text-center text-gray-600 text-[10px] uppercase tracking-widest mb-6 animate-pulse flex justify-center items-center gap-2 md:hidden">
            <ArrowRight size={12}/> {lang === 'vi' ? 'Vuốt ngang để xem tiếp' : 'Swipe to see more'} <ArrowRight size={12}/>
        </div>

        {/* Horizontal Scrollable Container */}
        <div 
            className="flex overflow-x-auto pb-12 pt-4 px-4 md:px-8 snap-x snap-mandatory [&::-webkit-scrollbar]:hidden"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
            <div className="flex gap-4 md:gap-5 relative min-w-max mx-auto items-stretch">
                {/* Continuous Horizontal Connecting Line */}
                <div className="absolute top-[9px] left-[90px] right-[90px] md:left-[110px] md:right-[110px] h-0.5 bg-gradient-to-r from-purple-500 via-yellow-500 to-green-500 opacity-40"></div>

                {[
                    {
                        time: "Q4/2025",
                        title: lang === 'vi' ? 'Dự án Giáo dục' : 'Edu Project',
                        desc: lang === 'vi' ? 'Ra mắt dự án & công cụ kiểm tra rủi ro.' : 'Launch project & risk detection tools.',
                        icon: <GraduationCap size={16} className="text-purple-400"/>,
                        borderClass: "border-purple-500",
                        textClass: "text-purple-400",
                        hoverClass: "hover:border-purple-500/50",
                        hoverBg: "group-hover:bg-purple-500",
                        shadowHover: "group-hover:shadow-[0_0_15px_#a855f7]"
                    },
                    {
                        time: "Q1/2026",
                        title: lang === 'vi' ? 'Dữ liệu Thực tế' : 'Real Dataset',
                        desc: lang === 'vi' ? 'Xây dựng kho video Deepfake & cảnh báo.' : 'Build Deepfake video library & alerts.',
                        icon: <Video size={16} className="text-blue-400"/>,
                        borderClass: "border-blue-500",
                        textClass: "text-blue-400",
                        hoverClass: "hover:border-blue-500/50",
                        hoverBg: "group-hover:bg-blue-500",
                        shadowHover: "group-hover:shadow-[0_0_15px_#3b82f6]"
                    },
                    {
                        time: "Q3/2026",
                        title: lang === 'vi' ? 'Huấn luyện AI' : 'AI Training',
                        desc: lang === 'vi' ? 'Huấn luyện Core Engine tối ưu độ chính xác.' : 'Train Core Engine for high accuracy.',
                        icon: <BrainCircuit size={16} className="text-cyan-400"/>,
                        borderClass: "border-cyan-500",
                        textClass: "text-cyan-400",
                        hoverClass: "hover:border-cyan-500/50",
                        hoverBg: "group-hover:bg-cyan-500",
                        shadowHover: "group-hover:shadow-[0_0_15px_#06b6d4]"
                    },
                    {
                        time: "Q1/2027",
                        title: lang === 'vi' ? 'Tiện ích Trình duyệt' : 'Browser Ext.',
                        desc: lang === 'vi' ? 'Extension quét video & cảnh báo web ảo.' : 'Browser extensions for quick scanning.',
                        icon: <MonitorSmartphone size={16} className="text-yellow-400"/>,
                        borderClass: "border-yellow-500",
                        textClass: "text-yellow-400",
                        hoverClass: "hover:border-yellow-500/50",
                        hoverBg: "group-hover:bg-yellow-500",
                        shadowHover: "group-hover:shadow-[0_0_15px_#eab308]"
                    },
                    {
                        time: "Q4/2027",
                        title: lang === 'vi' ? 'AI Trợ lý ảo' : 'Virtual AI Assistant',
                        desc: lang === 'vi' ? 'Smart Agent phân tích chuyên sâu file media.' : 'Smart Agent for media authentication.',
                        icon: <Cpu size={16} className="text-pink-400"/>,
                        borderClass: "border-pink-500",
                        textClass: "text-pink-400",
                        hoverClass: "hover:border-pink-500/50",
                        hoverBg: "group-hover:bg-pink-500",
                        shadowHover: "group-hover:shadow-[0_0_15px_#ec4899]"
                    }
                ].map((phase, index) => {
                    const isCurrent = index === 1; // Nhấn mạnh vào Q1/2026
                    return (
                        <div key={index} className="w-[180px] md:w-[220px] shrink-0 snap-center relative group flex flex-col">
                            {/* Dot Point */}
                            <div className={`w-5 h-5 rounded-full bg-black border-4 ${phase.borderClass} absolute top-0 left-1/2 -translate-x-1/2 z-10 ${phase.hoverBg} ${phase.shadowHover} transition-all duration-300 ${isCurrent ? '!w-6 !h-6 -top-0.5 flex items-center justify-center' : ''}`}>
                                {isCurrent && <div className="w-1.5 h-1.5 bg-white rounded-full animate-ping"></div>}
                            </div>
                            
                            {/* Card Content */}
                            <div className={`mt-8 bg-surface ${isCurrent ? 'border border-blue-500/30' : 'border border-gray-800'} p-4 md:p-6 rounded-2xl ${phase.hoverClass} transition-colors h-full flex flex-col items-center text-center justify-center ${isCurrent ? 'relative overflow-hidden shadow-[0_0_30px_rgba(59,130,246,0.15)]' : ''}`}>
                                {isCurrent && (
                                    <div className="inline-flex bg-blue-500/20 text-blue-400 px-2 py-0.5 rounded-full text-[8px] font-black uppercase tracking-widest mb-2">
                                        {lang === 'vi' ? 'HIỆN TẠI' : 'CURRENT'}
                                    </div>
                                )}
                                
                                <h4 className={`text-lg md:text-xl font-black text-white mb-2 tracking-tight ${isCurrent ? 'flex items-center gap-1.5' : ''}`}>
                                    {phase.time} {isCurrent && <Video className="text-blue-500" size={16}/>}
                                </h4>
                                
                                <h5 className={`text-[10px] md:text-[11px] font-bold ${phase.textClass} mb-3 uppercase tracking-widest flex items-center justify-center gap-1.5 leading-tight`}>
                                    {!isCurrent && phase.icon} {phase.title}
                                </h5>
                                
                                <p className={`text-gray-400 text-[10px] md:text-xs leading-relaxed text-balance ${isCurrent ? 'font-bold !text-gray-300' : ''}`}>
                                    {phase.desc}
                                </p>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
      </div>

      {/* Vision Statement */}
      <div className="text-center bg-gray-900/50 border border-gray-800 rounded-2xl p-6 md:p-10 backdrop-blur-sm mx-4">
         <Fingerprint className="mx-auto text-gray-600 mb-4" size={48} />
         <h2 className="text-2xl font-bold text-white mb-4">{lang === 'vi' ? 'TẦM NHÌN TƯƠNG LAI' : 'FUTURE VISION'}</h2>
         <p className="text-gray-400 max-w-3xl mx-auto italic text-sm md:text-base">
            {lang === 'vi' 
              ? '"Trong tương lai, Deepfense sẽ không chỉ là một website, mà là một tiêu chuẩn an toàn bắt buộc trên mọi thiết bị thông minh, giống như dây an toàn trên xe hơi vậy."'
              : '"In the future, Deepfense will not just be a website, but a mandatory safety standard on every smart device, just like seatbelts in cars."'}
         </p>
      </div>

    </div>
  );
};

const ActivityIcon = ({size, className}: any) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></svg>
)

export default AiComingSoon;
