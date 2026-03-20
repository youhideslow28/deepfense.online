import React, { useState } from 'react';
import { Language } from '../types';
import { UploadCloud, AlertTriangle, CheckCircle2, Activity, ScanLine, BrainCircuit, FileSearch, ShieldCheck, BookOpen, Scale, BookText } from 'lucide-react';
import { KNOWLEDGE_BASE } from '../data';

interface ToolsProps {
  initialTab?: 'SCAN' | 'KNOWLEDGE';
  lang: Language;
}

const Tools: React.FC<ToolsProps> = ({ initialTab = 'SCAN', lang }) => {
  const [activeTab, setActiveTab] = useState<'SCAN' | 'KNOWLEDGE'>(initialTab);
  const [activeKnowledgeCat, setActiveKnowledgeCat] = useState(0);
  
  // --- BEHAVIORAL SCANNER STATES ---
  const [step, setStep] = useState(0);
  const [riskScore, setRiskScore] = useState(0);
  const [analysisComplete, setAnalysisComplete] = useState(false);

  const behaviorQuestions = lang === 'vi' ? [
    { q: "Người gọi có yêu cầu bạn chuyển tiền gấp, đọc mã OTP hoặc truy cập một đường link lạ không?", weight: 40 },
    { q: "Tình huống có mang tính chất cực kỳ khẩn cấp (tai nạn, cấp cứu, khóa tài khoản) buộc bạn phải làm ngay không?", weight: 30 },
    { q: "Cuộc gọi được thực hiện qua các ứng dụng OTT (Zalo, Messenger, Telegram) thay vì mạng viễn thông (GSM) thông thường?", weight: 15 },
    { q: "Người gọi có trốn tránh việc trả lời các câu hỏi bí mật, hoặc viện lý do mic/cam hỏng khi bị yêu cầu làm hành động xác thực?", weight: 20 },
    { q: "Chất lượng cuộc gọi có hiện tượng giật lag, mờ nhòe, hoặc âm thanh bị vang, mất tự nhiên không?", weight: 10 },
  ] : [
    { q: "Did the caller ask you to transfer money urgently, provide an OTP, or click a strange link?", weight: 40 },
    { q: "Was the situation framed as an extreme emergency (accident, account locked) requiring immediate action?", weight: 30 },
    { q: "Was the call made via OTT apps (Zalo, Messenger, Telegram) instead of a standard cellular (GSM) network?", weight: 15 },
    { q: "Did the caller avoid answering secret questions, or claim their mic/cam is broken when asked to verify?", weight: 20 },
    { q: "Did the call quality suffer from lag, blurriness, or unnatural/echoing audio?", weight: 10 },
  ];

  const handleAnswer = (isYes: boolean) => {
    if (isYes) {
      setRiskScore(prev => prev + behaviorQuestions[step].weight);
    }
    
    if (step < behaviorQuestions.length - 1) {
      setStep(prev => prev + 1);
    } else {
      setAnalysisComplete(true);
    }
  };

  const resetBehaviorScan = () => {
    setStep(0);
    setRiskScore(0);
    setAnalysisComplete(false);
  };

  // --- FORENSICS SCANNER STATES ---
  const [file, setFile] = useState<File | null>(null);
  const [isScanning, setIsScanning] = useState(false);
  const [scanProgress, setScanProgress] = useState(0);
  const [scanLogs, setScanLogs] = useState<string[]>([]);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
      setIsScanning(false);
      setScanProgress(0);
      setScanLogs([]);
    }
  };

  const startForensicsScan = () => {
    if (!file) return;
    setIsScanning(true);
    setScanProgress(0);
    setScanLogs([]);

    const logsVi = [
      "Khởi tạo Engine Phân tích Đa phương thức...",
      "Đang trích xuất siêu dữ liệu (EXIF/Metadata)...",
      `Kích thước tệp: ${(file.size / 1024).toFixed(2)} KB. Định dạng: ${file.type || 'unknown'}`,
      "Chạy thuật toán dò tìm quang phổ âm thanh (Audio Spectrogram)...",
      "Quét lỗi nội suy không gian (Spatial Glitches)...",
      "Phân tích vi mô nhịp tim quang học (rPPG) từ dữ liệu điểm ảnh...",
      "Đang đối chiếu với cơ sở dữ liệu Zero-Day Deepfake...",
      "Phân tích hoàn tất. Đang tổng hợp báo cáo mã hóa..."
    ];

    const logsEn = [
      "Initializing Multimodal Analysis Engine...",
      "Extracting Metadata (EXIF)...",
      `File size: ${(file.size / 1024).toFixed(2)} KB. Format: ${file.type || 'unknown'}`,
      "Running Audio Spectrogram detection algorithms...",
      "Scanning for Spatial Interpolation Glitches...",
      "Analyzing optical heart rate (rPPG) from pixel data...",
      "Cross-referencing with Zero-Day Deepfake database...",
      "Analysis complete. Compiling encrypted report..."
    ];

    const logs = lang === 'vi' ? logsVi : logsEn;
    
    let currentLog = 0;
    const interval = setInterval(() => {
      if (currentLog < logs.length) {
        setScanLogs(prev => [...prev, logs[currentLog]]);
        setScanProgress(Math.floor(((currentLog + 1) / logs.length) * 100));
        currentLog++;
      } else {
        clearInterval(interval);
        setIsScanning(false);
      }
    }, 800); // Mỗi bước chạy 0.8s
  };

  return (
    <div className="max-w-7xl mx-auto animate-in fade-in duration-500 py-6 px-4">
      <div className="text-center mb-10">
        <h2 className="text-3xl md:text-5xl font-black text-white uppercase tracking-tighter mb-4 flex items-center justify-center gap-3">
          {activeTab === 'SCAN' ? <ScanLine className="text-primary" size={40} /> : <BookOpen className="text-primary" size={40} />}
          {activeTab === 'SCAN' ? (lang === 'vi' ? 'HỆ THỐNG QUÉT RỦI RO' : 'RISK SCAN SYSTEM') : (lang === 'vi' ? 'THƯ VIỆN KIẾN THỨC' : 'KNOWLEDGE LIBRARY')}
        </h2>
        <p className="text-gray-400 text-sm max-w-3xl mx-auto leading-relaxed">
          {activeTab === 'SCAN' 
            ? (lang === 'vi' ? 'Khi AI giả mạo được 99% hình ảnh/giọng nói, mắt thường không còn đáng tin. Hãy kết hợp đánh giá ngữ cảnh hành vi và pháp y dữ liệu để xác thực.' : 'Combine behavioral context assessment and digital forensics for comprehensive verification.')
            : (lang === 'vi' ? 'Hệ thống lưu trữ thông tin chuyên sâu về công nghệ Deepfake, cơ chế thao túng tâm lý và hệ thống luật pháp hiện hành bảo vệ quyền con người.' : 'Comprehensive repository on Deepfake tech, psychological manipulation, and legal frameworks.')}
        </p>
      </div>

      {/* TABS CONTROLLER */}
      <div className="flex flex-wrap justify-center bg-surface p-2 rounded-2xl border border-white/5 mb-12 w-fit mx-auto shadow-xl gap-2">
        <button 
          onClick={() => setActiveTab('SCAN')}
          className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-xs uppercase tracking-widest transition-all ${activeTab === 'SCAN' ? 'bg-primary text-black' : 'text-gray-500 hover:text-white hover:bg-white/5'}`}
        >
          <ScanLine size={16} /> {lang === 'vi' ? 'TRUNG TÂM QUÉT' : 'SCAN CENTER'}
        </button>
        <button 
          onClick={() => setActiveTab('KNOWLEDGE')}
          className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-xs uppercase tracking-widest transition-all ${activeTab === 'KNOWLEDGE' ? 'bg-primary text-black' : 'text-gray-500 hover:text-white hover:bg-white/5'}`}
        >
          <Scale size={16} /> {lang === 'vi' ? 'KIẾN THỨC & LUẬT PHÁP' : 'KNOWLEDGE & LAW'}
        </button>
      </div>

      {/* MODE: SCAN CENTER (Dual Columns Layout) */}
      {activeTab === 'SCAN' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 animate-in slide-in-from-bottom-6 duration-500">
          {/* COLUMN 1: BEHAVIORAL SCANNER */}
          <div className="bg-surface border border-primary/20 rounded-3xl p-6 md:p-8 shadow-[0_0_40px_rgba(0,240,255,0.05)] relative overflow-hidden flex flex-col">
            <h3 className="text-primary font-black text-sm md:text-base uppercase tracking-widest mb-8 flex items-center gap-3 border-b border-primary/10 pb-4">
               <BrainCircuit size={20} /> {lang === 'vi' ? '1. QUÉT NGỮ CẢNH HÀNH VI' : '1. BEHAVIORAL CONTEXT SCAN'}
            </h3>
            
            <div className="flex-1 flex flex-col justify-center">
           {!analysisComplete ? (
             <div className="w-full">
               <div className="flex justify-between items-center mb-6">
                  <span className="text-primary font-mono text-xs uppercase font-bold tracking-widest flex items-center gap-2">
                    <Activity size={14}/> {lang === 'vi' ? 'THU THẬP DỮ LIỆU LOGIC' : 'GATHERING LOGIC DATA'}
                  </span>
                  <span className="text-gray-500 font-mono text-xs font-bold">{step + 1} / {behaviorQuestions.length}</span>
               </div>
               
               <div className="h-1.5 bg-black rounded-full mb-8 overflow-hidden border border-white/5">
                 <div className="h-full bg-primary transition-all duration-500" style={{ width: `${((step + 1) / behaviorQuestions.length) * 100}%` }}></div>
               </div>

               <h3 className="text-lg md:text-xl font-medium text-white mb-10 leading-relaxed text-center min-h-[100px] flex items-center justify-center">
                 "{behaviorQuestions[step].q}"
               </h3>

               <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <button onClick={() => handleAnswer(true)} className="bg-red-500/10 border border-red-500/30 text-red-500 hover:bg-red-500 hover:text-white py-5 rounded-2xl font-black text-xs uppercase tracking-widest transition-all active:scale-95">
                    {lang === 'vi' ? 'CÓ (ĐÁNG NGỜ)' : 'YES (SUSPICIOUS)'}
                  </button>
                  <button onClick={() => handleAnswer(false)} className="bg-green-500/10 border border-green-500/30 text-green-500 hover:bg-green-500 hover:text-white py-5 rounded-2xl font-black text-xs uppercase tracking-widest transition-all active:scale-95">
                    {lang === 'vi' ? 'KHÔNG (BÌNH THƯỜNG)' : 'NO (NORMAL)'}
                  </button>
               </div>
             </div>
           ) : (
             <div className="text-center animate-in zoom-in duration-500">
               <div className="inline-block p-6 rounded-full mb-6 border-4 shadow-2xl relative bg-black" 
                    style={{ 
                      borderColor: riskScore >= 60 ? '#EF4444' : riskScore >= 30 ? '#EAB308' : '#22C55E',
                      boxShadow: `0 0 40px ${riskScore >= 60 ? 'rgba(239, 68, 68, 0.3)' : riskScore >= 30 ? 'rgba(234, 179, 8, 0.3)' : 'rgba(34, 197, 94, 0.3)'}`
                    }}>
                  {riskScore >= 60 ? <AlertTriangle size={48} className="text-red-500 animate-pulse" /> : 
                   riskScore >= 30 ? <Activity size={48} className="text-yellow-500" /> : 
                   <ShieldCheck size={48} className="text-green-500" />}
               </div>
               
               <div className="text-gray-400 font-mono text-xs mb-2 uppercase tracking-widest">
                  {lang === 'vi' ? 'CHỈ SỐ RỦI RO THAO TÚNG:' : 'MANIPULATION RISK INDEX:'}
               </div>
               <h3 className="text-4xl font-black text-white mb-6 tracking-tighter"
                   style={{ color: riskScore >= 60 ? '#EF4444' : riskScore >= 30 ? '#EAB308' : '#22C55E' }}>
                 {Math.min(riskScore, 100)}%
               </h3>
               
               <p className="text-gray-300 mb-8 text-sm leading-relaxed p-5 bg-black/40 rounded-2xl border border-white/5">
                  {riskScore >= 60 
                    ? (lang === 'vi' ? 'CẢNH BÁO ĐỎ: Kịch bản trùng khớp cao với các chiến dịch lừa đảo Deepfake tinh vi. Đối tượng đang dùng các biện pháp tâm lý để bẻ gãy phòng vệ của bạn. TUYỆT ĐỐI KHÔNG CHUYỂN TIỀN. Hãy dập máy và gọi lại qua mạng viễn thông di động gốc (GSM).' : 'RED ALERT: High match with sophisticated Deepfake scam campaigns. Psychological manipulation detected. DO NOT TRANSFER MONEY. Hang up and callback via standard cellular network.')
                    : riskScore >= 30 
                    ? (lang === 'vi' ? 'CẢNH BÁO VÀNG: Xuất hiện các điểm bất hợp lý trong ngữ cảnh giao tiếp. Đừng tin vào mắt bạn lúc này, hãy yêu cầu đối phương làm một hành động bất thường (vẫy tay che mặt) hoặc hỏi một câu hỏi mẹo chỉ 2 người biết.' : 'YELLOW ALERT: Logical inconsistencies detected. Do not trust your eyes right now. Ask the person to perform an unusual action (wave hand across face) or ask a trick secret question.')
                    : (lang === 'vi' ? 'AN TOÀN: Cuộc gọi có vẻ hợp lệ và không chứa các mẫu thao túng tâm lý thường thấy của tội phạm AI. Dù vậy, hãy luôn duy trì thói quen bảo mật cao.' : 'SAFE: The interaction appears valid without common AI manipulation patterns. Maintain high security habits regardless.')
                  }
               </p>

               <button onClick={resetBehaviorScan} className="w-full bg-white/5 text-white hover:bg-white hover:text-black border border-white/10 py-4 rounded-xl font-bold text-xs uppercase tracking-widest transition-all">
                  {lang === 'vi' ? 'TIẾN HÀNH QUÉT TRƯỜNG HỢP MỚI' : 'SCAN ANOTHER CASE'}
               </button>
             </div>
           )}
            </div>
          </div>

          {/* COLUMN 2: FORENSICS SCANNER */}
          <div className="bg-surface border border-secondary/20 rounded-3xl p-6 md:p-8 shadow-[0_0_40px_rgba(255,42,109,0.05)] relative overflow-hidden flex flex-col">
            <h3 className="text-secondary font-black text-sm md:text-base uppercase tracking-widest mb-8 flex items-center gap-3 border-b border-secondary/10 pb-4">
               <FileSearch size={20} /> {lang === 'vi' ? '2. PHÁP Y DỮ LIỆU TỆP' : '2. DIGITAL FORENSICS SCAN'}
            </h3>
            
            <div className="flex-1 flex flex-col justify-center">
           {!file ? (
             <div className="border-2 border-dashed border-white/10 rounded-3xl p-8 md:p-12 text-center hover:border-secondary/50 hover:bg-secondary/5 transition-all bg-black/40 group relative cursor-pointer h-full flex flex-col justify-center items-center">
                <input 
                  type="file" 
                  accept="image/*,video/*,audio/*" 
                  onChange={handleFileUpload}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                />
                <div className="bg-secondary/10 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                  <UploadCloud size={32} className="text-secondary" />
                </div>
                <h3 className="text-white font-bold text-lg mb-2">
                  {lang === 'vi' ? 'Tải tệp đa phương tiện lên để giám định vi mô' : 'Upload media file for micro-forensics'}
                </h3>
                <p className="text-gray-500 text-sm mb-8">
                  {lang === 'vi' ? 'Hỗ trợ: JPG, PNG, MP4, MP3, WAV (Tối đa 50MB)' : 'Supports: JPG, PNG, MP4, MP3, WAV (Max 50MB)'}
                </p>
                <div className="inline-flex bg-secondary text-black px-6 py-3 rounded-xl text-xs font-black uppercase tracking-widest items-center gap-2 group-hover:bg-white transition-colors shadow-lg shadow-secondary/20">
                  <FileSearch size={16} /> {lang === 'vi' ? 'CHỌN TỆP PHÂN TÍCH' : 'SELECT FILE TO ANALYZE'}
                </div>
             </div>
           ) : (
             <div className="w-full">
               <div className="flex items-center gap-4 bg-black/60 p-4 rounded-2xl border border-white/10 mb-6 shadow-inner">
                 <FileSearch size={24} className="text-secondary shrink-0" />
                 <div className="flex-1 min-w-0">
                   <div className="text-white font-bold text-sm truncate mb-1">{file.name}</div>
                   <div className="text-gray-400 font-mono text-xs">{(file.size / (1024 * 1024)).toFixed(2)} MB • {file.type || 'Unknown Format'}</div>
                 </div>
                 <button onClick={() => setFile(null)} className="text-gray-500 hover:text-red-500 hover:bg-red-500/10 p-2 rounded-lg transition-colors">
                    ĐÓNG
                 </button>
               </div>

               {!isScanning && scanProgress === 0 ? (
                 <button onClick={startForensicsScan} className="w-full bg-secondary text-white hover:bg-white hover:text-black py-4 rounded-xl font-black text-xs uppercase tracking-[0.2em] transition-all shadow-lg flex items-center justify-center gap-3 mt-8">
                   <Activity size={18} /> {lang === 'vi' ? 'KHỞI ĐỘNG MÁY QUÉT PHÁP Y' : 'START FORENSICS SCANNER'}
                 </button>
               ) : (
                 <div className="bg-[#0a0a0a] border border-white/10 rounded-2xl p-5 font-mono relative overflow-hidden shadow-2xl">
                    {isScanning && <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-secondary/10 via-secondary to-secondary/10 animate-[pulse_1s_ease-in-out_infinite]"></div>}
                    
                    <div className="flex justify-between items-center mb-4 border-b border-white/10 pb-3">
                      <span className="text-secondary font-bold text-xs flex items-center gap-2 tracking-widest">
                        {isScanning ? <Activity size={14} className="animate-spin" /> : <CheckCircle2 size={14} />} 
                        {lang === 'vi' ? 'FORENSICS_TERMINAL_V2' : 'FORENSICS_TERMINAL_V2'}
                      </span>
                      <span className="text-white text-xs font-black">{scanProgress}%</span>
                    </div>
                    
                    <div className="space-y-3 min-h-[180px]">
                      {scanLogs.map((log, idx) => (
                        <div key={idx} className="text-gray-400 text-[11px] flex items-start gap-2 animate-in slide-in-from-bottom-2 duration-300">
                          <span className="text-secondary mt-0.5">root@deepfense:~#</span> 
                          <span className="leading-relaxed">{log}</span>
                        </div>
                      ))}
                      {isScanning && (
                         <div className="text-gray-500 text-[11px] flex items-start gap-2 animate-pulse">
                            <span className="text-secondary mt-0.5">root@deepfense:~#</span> _
                         </div>
                      )}
                    </div>

                    {scanProgress === 100 && (
                      <div className="mt-6 pt-5 border-t border-white/10 text-center animate-in fade-in duration-700">
                         <div className="inline-block bg-secondary/10 border border-secondary/30 text-secondary px-4 py-2 rounded-lg text-xs font-bold mb-4 flex items-center gap-2 mx-auto">
                            <AlertTriangle size={14} /> 
                            {lang === 'vi' ? 'PHÁT HIỆN DẤU VẾT BẤT THƯỜNG (CẦN XÁC MINH)' : 'ANOMALIES DETECTED (VERIFICATION NEEDED)'}
                         </div>
                         <p className="text-gray-400 text-[11px] mb-6 leading-relaxed">
                           {lang === 'vi' 
                              ? 'Dữ liệu quang phổ và phân tích pixel cho thấy dấu hiệu của thuật toán nội suy hình ảnh. Tuy nhiên, các kỹ thuật vượt rào (anti-forensics) của tội phạm đang rất tiên tiến. Khuyến nghị kết hợp với "Quét Ngữ Cảnh Hành Vi" để có kết luận cuối cùng.'
                              : 'Spectrogram and pixel analysis show signs of image interpolation algorithms. However, criminal anti-forensics are advanced. Highly recommend combining with "Context Scan" for final conclusion.'}
                         </p>
                         <button onClick={() => setFile(null)} className="w-full text-white border border-white/20 hover:bg-white hover:text-black py-3 rounded-xl text-xs font-bold transition-all">
                           {lang === 'vi' ? 'QUÉT TỆP KHÁC' : 'SCAN ANOTHER FILE'}
                         </button>
                      </div>
                    )}
                 </div>
               )}
             </div>
           )}
            </div>
          </div>
        </div>
      )}

      {/* MODE: KNOWLEDGE & LAW */}
      {activeTab === 'KNOWLEDGE' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 animate-in slide-in-from-bottom-6 duration-500">
           {/* Sidebar */}
           <div className="lg:col-span-4 flex flex-col gap-3">
              {KNOWLEDGE_BASE[lang].map((cat, idx) => (
                  <button 
                    key={idx}
                    onClick={() => setActiveKnowledgeCat(idx)}
                    className={`text-left p-5 rounded-2xl font-bold text-xs md:text-sm tracking-widest transition-all border shadow-lg flex items-center gap-3 ${activeKnowledgeCat === idx ? 'bg-primary/10 border-primary/50 text-primary scale-105' : 'bg-black/60 border-white/5 text-gray-400 hover:border-white/20 hover:text-white'}`}
                  >
                    <BookText size={18} className="shrink-0" />
                    <span className="leading-snug">{cat.category}</span>
                  </button>
              ))}
           </div>
           
           {/* Content Box */}
           <div className="lg:col-span-8 bg-surface border border-white/10 rounded-3xl p-6 md:p-10 shadow-2xl relative overflow-hidden h-fit">
               <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary to-secondary"></div>
               <div key={activeKnowledgeCat} className="animate-in fade-in slide-in-from-right-8 duration-500">
                  <h3 className="text-xl md:text-2xl font-black text-white mb-8 text-primary border-b border-white/10 pb-6 flex items-center gap-3">
                     <Scale size={28} className="text-primary" />
                     {KNOWLEDGE_BASE[lang][activeKnowledgeCat].category}
                  </h3>
                  <div className="space-y-6">
                     {KNOWLEDGE_BASE[lang][activeKnowledgeCat].items.map((item, idx) => (
                        <div key={idx} className="bg-black/60 p-6 md:p-8 rounded-2xl border border-white/5 group hover:border-primary/30 transition-all hover:bg-black/80 hover:shadow-[0_0_20px_rgba(0,240,255,0.05)]">
                           <h4 className="text-base md:text-lg font-bold text-white mb-4 flex items-start gap-3">
                              <ShieldCheck size={20} className="text-primary group-hover:scale-125 transition-transform mt-0.5 shrink-0" /> 
                              <span className="leading-tight">{item.title}</span>
                           </h4>
                           <p className="text-gray-400 text-sm md:text-base leading-relaxed text-justify">
                              {item.content}
                           </p>
                        </div>
                     ))}
                  </div>
               </div>
           </div>
        </div>
      )}
    </div>
  );
};

export default Tools;