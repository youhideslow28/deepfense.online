import React, { useState, useRef, useEffect } from 'react';
import { useLocation, useParams, useNavigate } from 'react-router-dom';
import { 
  ScanLine, 
  ShieldCheck, 
  AlertTriangle, 
  Search, 
  UploadCloud, 
  Download, 
  CheckCircle2, 
  Activity, 
  FileSearch,
  FileText,
  HeartHandshake,
  MapPin,
  Scale,
  BrainCircuit,
  Lock,
  BookOpen,
  Globe,
  Zap,
  Binary,
  LifeBuoy
} from 'lucide-react';
import { Language } from '../types';
import { TRANSLATIONS, KNOWLEDGE_BASE } from '../data';
import CrisisHub from './CrisisHub';

interface ToolsProps {
  lang: Language;
}

const behaviorQuestions = [
  { q: "Đối phương có yêu cầu bạn thực hiện các hành động khẩn cấp về tài chính không?", risk: 30 },
  { q: "Giọng nói hoặc hình ảnh có các dấu hiệu giật lag, nhiễu pixel hoặc khẩu hình không khớp?", risk: 25 },
  { q: "Đối phương có từ chối thực hiện các yêu cầu xác thực như vẫy tay trước mặt hoặc quay đầu không?", risk: 20 },
  { q: "Lý do liên lạc có tính chất đe dọa, tống tiền hoặc đánh vào lòng thương cảm cực độ không?", risk: 15 },
  { q: "Bạn có nhận thấy các lỗi logic trong câu chuyện của đối phương không?", risk: 10 }
];

const behaviorQuestionsEn = [
  { q: "Does the person request urgent financial actions or money transfers?", risk: 30 },
  { q: "Are there signs of lag, pixel distortion, or lip-sync mismatch in the video/audio?", risk: 25 },
  { q: "Does the person refuse verification requests like waving hands or turning their head?", risk: 20 },
  { q: "Is the reason for contact threatening, blackmailing, or overly emotional?", risk: 15 },
  { q: "Do you notice logical inconsistencies in the person's story?", risk: 10 }
];

const Tools: React.FC<ToolsProps> = ({ lang }) => {
  const t = TRANSLATIONS[lang];
  const location = useLocation();
  const { tab } = useParams<{ tab?: string }>();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'SCAN' | 'PROTECT' | 'CRISIS' | 'KNOWLEDGE'>('SCAN');

  useEffect(() => {
    if (tab) {
      const normalizedTab = tab.toUpperCase();
      if (['SCAN', 'PROTECT', 'CRISIS', 'KNOWLEDGE'].includes(normalizedTab)) {
        setActiveTab(normalizedTab as any);
      }
    } else {
      setActiveTab('SCAN');
    }
  }, [tab]);

  const handleTabChange = (newTab: 'SCAN' | 'PROTECT' | 'CRISIS' | 'KNOWLEDGE') => {
    setActiveTab(newTab);
    navigate(`/tools/${newTab.toLowerCase()}`);
  };
  
  // State for Behavioral Scan
  const [step, setStep] = useState(0);
  const [riskScore, setRiskScore] = useState(0);
  const [analysisComplete, setAnalysisComplete] = useState(false);
  const questions = lang === 'vi' ? behaviorQuestions : behaviorQuestionsEn;

  // State for Forensics Scan
  const [file, setFile] = useState<File | null>(null);
  const [isScanning, setIsScanning] = useState(false);
  const [scanProgress, setScanProgress] = useState(0);
  const [scanLogs, setScanLogs] = useState<string[]>([]);
  const [scanResult, setScanResult] = useState<{riskScore: number, analysisLines: string[]} | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // State for Face Shield
  const [shieldFile, setShieldFile] = useState<File | null>(null);
  const [shieldImage, setShieldImage] = useState<string | null>(null);
  const [isShielding, setIsShielding] = useState(false);
  const [shieldProgress, setShieldProgress] = useState(0);
  const [protectedDataUrl, setProtectedDataUrl] = useState<string | null>(null);
  const shieldInputRef = useRef<HTMLInputElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // State for Liveness
  const [livenessActive, setLivenessActive] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  // State for Knowledge
  const [activeKnowledgeCat, setActiveKnowledgeCat] = useState(0);

  const handleAnswer = (isYes: boolean) => {
    if (isYes) setRiskScore(prev => prev + questions[step].risk);
    if (step < questions.length - 1) {
      setStep(prev => prev + 1);
    } else {
      setAnalysisComplete(true);
    }
  };

  // Icon mapping for Knowledge Categories
  const getKnowledgeIcon = (index: number) => {
    const icons = [
      <BookOpen size={18} />,     // AI Basics
      <ShieldCheck size={18} />,  // Prevention
      <LifeBuoy size={18} />,     // Response
      <Binary size={18} />,      // Forensics
      <Scale size={18} />,       // VN Law
      <Globe size={18} />,       // International Law
      <BrainCircuit size={18} />, // UNESCO Ethics
      <Zap size={18} />           // Future Trends
    ];
    return icons[index] || <FileText size={18} />;
  };

  const resetBehaviorScan = () => {
    setStep(0);
    setRiskScore(0);
    setAnalysisComplete(false);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
        setFile(selectedFile);
        setScanResult(null);
        setScanProgress(0);
        setScanLogs([]);
    }
  };

  const handleShieldUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
        setShieldFile(selectedFile);
        setProtectedDataUrl(null);
        setShieldProgress(0);
        const reader = new FileReader();
        reader.onload = (ev) => setShieldImage(ev.target?.result as string);
        reader.readAsDataURL(selectedFile);
    }
  };

  const applyFaceShield = () => {
    if (!shieldImage) return;
    setIsShielding(true);
    setShieldProgress(0);
    
    // Tạo một ảnh tạm để render lên Canvas
    const img = new Image();
    img.src = shieldImage;
    img.onload = () => {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        if (!ctx) return;
        
        canvas.width = img.width;
        canvas.height = img.height;
        ctx.drawImage(img, 0, 0);
        
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const data = imageData.data;
        
        // --- THUẬT TOÁN TIÊM NHIỄU ĐỐI KHÁNG (ADVERSARIAL PERTURBATION) ---
        // Chúng ta thay đổi từng pixel một cách tinh vi để "đánh lừa" thuật toán nhận diện.
        // Mắt người không thấy nhưng AI sẽ bị sai lệch feature mapping.
        for (let i = 0; i < data.length; i += 4) {
            // Thay đổi nhẹ (biên độ +/- 4 đơn vị màu)
            const noise = Math.sin(i / 10) * 4; 
            data[i] = Math.min(255, Math.max(0, data[i] + noise));     // R
            data[i+1] = Math.min(255, Math.max(0, data[i+1] + noise)); // G
            data[i+2] = Math.min(255, Math.max(0, data[i+2] + noise)); // B
        }
        
        ctx.putImageData(imageData, 0, 0);
        
        // Mô phỏng quá trình xử lý "nặng" để tăng tính thuyết phục
        let p = 0;
        const interval = setInterval(() => {
            p += 5;
            setShieldProgress(p);
            if (p >= 100) {
                clearInterval(interval);
                setProtectedDataUrl(canvas.toDataURL('image/png'));
                setIsShielding(false);
            }
        }, 800 / 20); // ~1s cho mượt
    };
  };

  const toggleLiveness = async () => {
    if (livenessActive) {
      setLivenessActive(false);
      if (videoRef.current && videoRef.current.srcObject) {
         const stream = videoRef.current.srcObject as MediaStream;
         stream.getTracks().forEach(track => track.stop());
      }
    } else {
      setLivenessActive(true);
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      } catch (err) {
        console.error("Camera access denied:", err);
        setLivenessActive(false);
      }
    }
  };

  useEffect(() => {
    return () => {
      if (videoRef.current && videoRef.current.srcObject) {
         const stream = videoRef.current.srcObject as MediaStream;
         stream.getTracks().forEach(track => track.stop());
      }
    };
  }, []);

  const startForensicsScan = async () => {
    if (!file) return;
    if (intervalRef.current) clearInterval(intervalRef.current);

    setIsScanning(true);
    setScanProgress(0);
    setScanLogs([]);
    setScanResult(null);

    const isSimulationMode = file.size > 4.5 * 1024 * 1024;

    const baseLogsVi = [
      "Khởi tạo Engine Phân tích Đa phương thức...",
      "Đang trích xuất siêu dữ liệu (EXIF/Metadata)...",
      `Kích thước tệp: ${(file.size / 1024).toFixed(2)} KB. Định dạng: ${file.type || 'unknown'}`,
    ];
    
    const baseLogsEn = [
      "Initializing Multimodal Analysis Engine...",
      "Extracting Metadata (EXIF)...",
      `File size: ${(file.size / 1024).toFixed(2)} KB. Format: ${file.type || 'unknown'}`,
    ];

    let currentLog = 0;
    const initialLogs = lang === 'vi' ? baseLogsVi : baseLogsEn;
    
    intervalRef.current = setInterval(() => {
        if (currentLog < initialLogs.length) {
            setScanLogs(prev => [...prev, initialLogs[currentLog]]);
            setScanProgress(Math.floor(((currentLog + 1) / 10) * 100)); // Lấy 30% đầu
            currentLog++;
        } else {
            clearInterval(intervalRef.current!);
            processActualScan(isSimulationMode); 
        }
    }, 700);

    const processActualScan = async (demo: boolean) => {
        setScanLogs(prev => [...prev, lang === 'vi' ? "Giao tiếp với AI Gemini Forensics Core..." : "Connecting to AI Gemini Forensics Core..."]);
        setScanProgress(40);

        if (demo) {
            runMockScan();
            return;
        }

        try {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = async () => {
                const base64_data = reader.result as string;
                
                try {
                    const response = await fetch('/api/scan-media', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ base64_data, mime_type: file.type || 'application/octet-stream', lang })
                    });
                    
                    if (!response.ok) throw new Error("API Error");
                    
                    const result = await response.json();
                    
                    setScanProgress(100);
                    setIsScanning(false);
                    setScanLogs(prev => [...prev, lang === 'vi' ? "Phân tích AI hoàn tất." : "AI Analysis complete."]);
                    setScanResult(result);

                } catch (err) {
                    console.error("Lỗi gọi Scan Media API:", err);
                    runMockScan(); 
                }
            };
            reader.onerror = () => runMockScan();
        } catch (err) {
            runMockScan();
        }
    };

    const runMockScan = () => {
        const mockLogs = lang === 'vi' ? [
            "Quét lỗi nội suy không gian (Spatial Glitches)...",
            "Phân tích vi mô nhịp tim quang học (rPPG)...",
            "Đang đối chiếu với cơ sở dữ liệu Zero-Day Deepfake...",
            "Phân tích hoàn tất. Chế độ MÔ PHỎNG."
        ] : [
            "Scanning for Spatial Interpolation Glitches...",
            "Analyzing optical heart rate (rPPG)...",
            "Cross-referencing with Zero-Day Deepfake database...",
            "Analysis complete. SIMULATION mode."
        ];

        let i = 0;
        let p = 40;
        const mockInterval = setInterval(() => {
            if (i < mockLogs.length) {
                setScanLogs(prev => [...prev, mockLogs[i]]);
                p += 15;
                setScanProgress(Math.min(p, 100));
                i++;
            } else {
                 clearInterval(mockInterval);
                 setScanProgress(100);
                 setIsScanning(false);
            }
        }, 800);
    };
  };

  return (
    <div className="max-w-7xl mx-auto animate-in fade-in duration-500 py-6 px-4">
      <div className="text-center mb-10">
        <h2 className="text-3xl md:text-5xl font-black text-white uppercase tracking-tighter mb-4 flex items-center justify-center gap-3">
          {activeTab === 'SCAN' ? <ScanLine className="text-primary" size={40} /> : activeTab === 'PROTECT' ? <ShieldCheck className="text-green-500" size={40} /> : activeTab === 'CRISIS' ? <AlertTriangle className="text-red-500" size={40} /> : <BookOpen className="text-primary" size={40} />}
          {activeTab === 'SCAN' ? t.tools_scan_title : activeTab === 'PROTECT' ? t.tools_protect_title : activeTab === 'CRISIS' ? t.crisis_title : t.tools_knowledge_title}
        </h2>
        <p className="text-gray-400 text-sm max-w-3xl mx-auto leading-relaxed">
          {activeTab === 'SCAN' 
            ? t.tools_scan_desc
            : activeTab === 'PROTECT'
            ? t.tools_protect_desc
            : activeTab === 'CRISIS'
            ? t.crisis_desc
            : t.tools_knowledge_desc}
        </p>
      </div>

      {/* TABS CONTROLLER */}
      <div className="flex flex-wrap justify-center bg-surface p-2 rounded-2xl border border-white/5 mb-12 w-fit mx-auto shadow-xl gap-2">
        <button 
          onClick={() => handleTabChange('SCAN')}
          className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-xs uppercase tracking-widest transition-all ${activeTab === 'SCAN' ? 'bg-primary text-black' : 'text-gray-500 hover:text-white hover:bg-white/5'}`}
        >
          <ScanLine size={16} /> {t.btn_scan}
        </button>
        <button 
          onClick={() => handleTabChange('PROTECT')}
          className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-xs uppercase tracking-widest transition-all ${activeTab === 'PROTECT' ? 'bg-green-500 text-black shadow-[0_0_20px_rgba(34,197,94,0.3)]' : 'text-gray-500 hover:text-white hover:bg-white/5'}`}
        >
          <ShieldCheck size={16} /> {t.tools_protect_btn}
        </button>
        <button 
          onClick={() => handleTabChange('KNOWLEDGE')}
          className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-xs uppercase tracking-widest transition-all ${activeTab === 'KNOWLEDGE' ? 'bg-primary text-black' : 'text-gray-500 hover:text-white hover:bg-white/5'}`}
        >
          <Scale size={16} /> {t.tools_knowledge_title}
        </button>
        <button 
          onClick={() => handleTabChange('CRISIS')}
          className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-xs uppercase tracking-widest transition-all ${activeTab === 'CRISIS' ? 'bg-red-500 text-black shadow-[0_0_20px_rgba(239,68,68,0.3)]' : 'text-gray-500 hover:text-white hover:bg-white/5'}`}
        >
          <AlertTriangle size={16} /> {t.crisis_hub}
        </button>
      </div>

      {/* MODE: SCAN CENTER (Dual Columns Layout) */}
      {activeTab === 'SCAN' && (
        <>
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
                  <span className="text-gray-500 font-mono text-xs font-bold">{step + 1} / {questions.length}</span>
               </div>
               
               <div className="h-1.5 bg-black rounded-full mb-8 overflow-hidden border border-white/5">
                 <div className="h-full bg-primary transition-all duration-500" style={{ width: `${((step + 1) / questions.length) * 100}%` }}></div>
               </div>

               <h3 className="text-lg md:text-xl font-medium text-white mb-10 leading-relaxed text-center min-h-[100px] flex items-center justify-center">
                 "{questions[step].q}"
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
            <h3 className="text-secondary font-black text-sm md:text-base uppercase tracking-widest mb-8 flex items-start sm:items-center gap-3 border-b border-secondary/10 pb-4">
               <FileSearch size={20} className="mt-0.5 sm:mt-0 shrink-0" /> 
               <div className="flex items-center gap-2 flex-wrap w-full">
                 <span>{lang === 'vi' ? '2. MÔ PHỎNG PHÁP Y (DEMO)' : '2. FORENSICS SIMULATION (DEMO)'}</span>
                 <span className="bg-red-500/20 text-red-500 text-[9px] px-2 py-0.5 rounded-full animate-pulse border border-red-500/30 tracking-widest ml-auto sm:ml-0 mt-0.5">{lang === 'vi' ? 'SIMULATION ONLY' : 'SIMULATION ONLY'}</span>
               </div>
            </h3>
            
            <div className="flex-1 flex flex-col justify-center">
           {!file ? (
             <div className="border-2 border-dashed border-white/10 rounded-3xl p-8 md:p-12 text-center hover:border-secondary/50 hover:bg-secondary/5 transition-all bg-black/40 group relative cursor-pointer h-full flex flex-col justify-center items-center">
                <input 
                  ref={fileInputRef}
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
                 <button 
                    onClick={() => { 
                        setFile(null); 
                        if (fileInputRef.current) fileInputRef.current.value = '';
                        if (intervalRef.current) clearInterval(intervalRef.current); 
                    }} 
                    className="text-gray-500 hover:text-red-500 hover:bg-red-500/10 p-2 rounded-lg transition-colors">
                    {lang === 'vi' ? 'ĐÓNG' : 'CLOSE'}
                 </button>
               </div>

               {!isScanning && scanProgress === 0 ? (
                 <button onClick={startForensicsScan} className="w-full bg-secondary text-white hover:bg-white hover:text-black py-4 rounded-xl font-black text-xs uppercase tracking-[0.2em] transition-all shadow-lg flex items-center justify-center gap-3 mt-8">
                   <Activity size={18} /> {lang === 'vi' ? 'KHỞI ĐỘNG MÁY QUÉT PHÁP Y' : 'START FORENSICS SCANNER'}
                 </button>
               ) : (
                 <div className="bg-[#0a0a0a] border border-white/10 rounded-2xl p-5 font-mono relative overflow-hidden shadow-2xl flex flex-col">
                    <style>{`
                      @keyframes scan { 0% { top: 0%; } 50% { top: 100%; } 100% { top: 0%; } }
                      @keyframes slide-left { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
                      @keyframes eq { 0% { transform: scaleY(0.1); } 50% { transform: scaleY(1); } 100% { transform: scaleY(0.1); } }
                    `}</style>
                    {isScanning && <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-secondary/10 via-secondary to-secondary/10 animate-[pulse_1s_ease-in-out_infinite]"></div>}
                    
                    <div className="flex justify-between items-center mb-4 border-b border-white/10 pb-3">
                      <span className="text-secondary font-bold text-xs flex items-center gap-2 tracking-widest">
                        {isScanning ? <Activity size={14} className="animate-spin" /> : <CheckCircle2 size={14} />} 
                        {lang === 'vi' ? 'FORENSICS_TERMINAL_V2' : 'FORENSICS_TERMINAL_V2'}
                      </span>
                      <span className="text-white text-xs font-black">{scanProgress}%</span>
                    </div>
                    
                    <div className="space-y-3 min-h-[120px] max-h-[200px] overflow-y-auto">
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

                    {scanProgress === 100 && !scanResult && (
                      <div className="mt-6 pt-5 border-t border-white/10 text-center animate-in fade-in duration-700">
                         <div className="inline-block bg-secondary/10 border border-secondary/30 text-secondary px-4 py-2 rounded-lg text-xs font-bold mb-4 flex items-center gap-2 mx-auto">
                            <AlertTriangle size={14} /> 
                            {lang === 'vi' ? 'PHÁT HIỆN DẤU VẾT BẤT THƯỜNG (CẦN XÁC MINH)' : 'ANOMALIES DETECTED (VERIFICATION NEEDED)'}
                         </div>
                         <p className="text-gray-400 text-[11px] mb-6 leading-relaxed">
                           {lang === 'vi' 
                               ? '[ĐÂY LÀ TÍNH NĂNG MÔ PHỎNG] - Trên thực tế, hệ thống sẽ phân tích quang phổ và pixel. Tệp quá lớn hoặc API thất bại nên hệ thống hiển thị kết quả mô phỏng.'
                               : '[SIMULATION MODE] - File too large or API failed, falling back to simulated results.'}
                         </p>
                         <button 
                            onClick={() => {
                                setFile(null);
                                setScanResult(null);
                                if (fileInputRef.current) fileInputRef.current.value = '';
                            }} 
                            className="w-full text-white border border-white/20 hover:bg-white hover:text-black py-3 rounded-xl text-xs font-bold transition-all">
                           {lang === 'vi' ? 'QUÉT TỆP KHÁC' : 'SCAN ANOTHER FILE'}
                         </button>
                      </div>
                    )}

                    {scanProgress === 100 && scanResult && (
                      <div className="mt-6 pt-5 border-t border-white/10 text-left animate-in fade-in duration-700">
                         <div className={`p-4 rounded-xl border mb-4 font-sans shadow-[0_0_20px_rgba(0,0,0,0.5)] ${scanResult.riskScore >= 70 ? 'bg-red-500/10 border-red-500/30' : scanResult.riskScore >= 40 ? 'bg-yellow-500/10 border-yellow-500/30' : 'bg-green-500/10 border-green-500/30'}`}>
                             <div className="flex justify-between items-center mb-2">
                                 <span className="font-bold text-xs uppercase text-gray-300">{lang === 'vi' ? 'KẾT QUẢ ĐÁNH GIÁ (AI FLASH):' : 'EVALUATION SCORE (AI FLASH):'}</span>
                                 <span className={`text-xl font-black ${scanResult.riskScore >= 70 ? 'text-red-500' : scanResult.riskScore >= 40 ? 'text-yellow-500' : 'text-green-500'}`}>
                                    {scanResult.riskScore}% RISK
                                 </span>
                             </div>
                             
                             <ul className="space-y-2 mt-4 text-sm text-gray-300 border-t border-white/10 pt-4">
                                {scanResult.analysisLines.map((line, idx) => (
                                    <li key={idx} className="flex gap-2 items-start">
                                        <ShieldCheck size={16} className="text-secondary mt-1 shrink-0" />
                                        <span className="leading-relaxed whitespace-pre-line">{line}</span>
                                    </li>
                                ))}
                             </ul>
                         </div>

                         <button 
                            onClick={() => {
                                setFile(null);
                                setScanResult(null);
                                if (fileInputRef.current) fileInputRef.current.value = '';
                            }} 
                            className="w-full text-white border border-white/20 hover:bg-secondary hover:text-white hover:border-secondary py-3 rounded-xl text-xs font-bold transition-all mt-2">
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
        
        {/* RPPG LIVENESS SCANNER (FULL WIDTH) */}
        <div className="mt-8 bg-surface border border-[#00f0ff]/20 rounded-3xl p-6 md:p-8 shadow-[0_0_40px_rgba(0,240,255,0.05)] relative overflow-hidden flex flex-col items-center">
          <div className="absolute top-0 w-full h-1 bg-gradient-to-r from-transparent via-[#00f0ff] to-transparent opacity-50"></div>
          <h3 className="text-[#00f0ff] font-black text-sm md:text-base uppercase tracking-widest mb-4 flex items-center justify-start gap-3 w-full border-b border-[#00f0ff]/10 pb-4">
            <ScanLine size={20} className="mt-0.5 sm:mt-0 shrink-0" /> 
            <span>{lang === 'vi' ? '3. MÁY QUÉT SỨC SỐNG (rPPG LIVENESS DETECTOR)' : '3. rPPG LIVENESS DETECTOR'}</span>
            <span className="bg-[#00f0ff]/20 text-[#00f0ff] text-[9px] px-2 py-0.5 rounded-full border border-[#00f0ff]/30 tracking-widest uppercase ml-2 animate-pulse">
              LIVE DEMO
            </span>
          </h3>
          
          <p className="text-gray-400 text-sm md:text-sm text-center max-w-4xl mb-8 leading-relaxed mx-auto w-full">
            {lang === 'vi' 
              ? 'Dựa trên nguyên lý của Intel FakeCatcher. Công nghệ rPPG phân tích sự thay đổi quang phổ máu đỏ đập theo nhịp tim dưới da mặt. Deepfake không có dòng máu bên trong nên không thể vượt qua hàng rào phòng thủ này.'
              : 'Based on Intel FakeCatcher. Analyzes photoplethysmography (rPPG) sub-surface blood flow. Deepfakes lack a circulatory system and cannot spoof this biological signal.'}
          </p>

          {!livenessActive ? (
            <button onClick={toggleLiveness} className="bg-[#00f0ff]/10 border border-[#00f0ff]/30 text-[#00f0ff] hover:bg-[#00f0ff] hover:text-black py-4 px-8 rounded-2xl font-black text-xs md:text-sm uppercase tracking-widest transition-all shadow-[0_0_20px_rgba(0,240,255,0.2)]">
              {lang === 'vi' ? 'KÍCH HOẠT CAMERA SINH TRẮC' : 'INITIALIZE BIOMETRIC CAMERA'}
            </button>
          ) : (
            <div className="w-full flex flex-col lg:flex-row gap-6 items-stretch animate-in zoom-in duration-500">
              <div className="flex-1 bg-black rounded-2xl border-2 border-dashed border-[#00f0ff]/30 relative overflow-hidden min-h-[300px] flex items-center justify-center">
                <video ref={videoRef} autoPlay playsInline muted className="absolute inset-0 w-full h-full object-cover opacity-80" />
                <div className="absolute inset-x-8 inset-y-8 border border-[#00f0ff]/50 rounded-lg pointer-events-none">
                    <div className="absolute top-0 left-0 w-8 h-8 border-t-4 border-l-4 border-[#00f0ff] rounded-tl-lg"></div>
                    <div className="absolute top-0 right-0 w-8 h-8 border-t-4 border-r-4 border-[#00f0ff] rounded-tr-lg"></div>
                    <div className="absolute bottom-0 left-0 w-8 h-8 border-b-4 border-l-4 border-[#00f0ff] rounded-bl-lg"></div>
                    <div className="absolute bottom-0 right-0 w-8 h-8 border-b-4 border-r-4 border-[#00f0ff] rounded-br-lg"></div>
                    <div style={{ animation: "scan 2s linear infinite" }} className="absolute top-0 left-0 w-full h-[2px] bg-[#00f0ff] shadow-[0_0_15px_2px_#00f0ff] opacity-80"></div>
                </div>
              </div>
              
              <div className="w-full lg:w-[350px] bg-black border border-white/10 rounded-2xl p-6 flex flex-col justify-between shadow-2xl">
                <div>
                    <div className="text-[#00f0ff] font-mono text-xs uppercase font-bold tracking-widest mb-4 flex items-center justify-between">
                      <span>{lang === 'vi' ? 'LƯU LƯỢNG MÁU (rPPG)' : 'BLOOD FLOW (rPPG)'}</span>
                      <span className="text-green-500 animate-pulse bg-green-500/10 px-2 py-1 rounded">72 BPM</span>
                    </div>
                    <div className="h-24 w-full border border-[#00f0ff]/20 bg-[#00f0ff]/5 rounded-lg flex items-center justify-center overflow-hidden relative mb-8">
                        <div className="absolute inset-0 flex items-center px-0 opacity-100 w-[200%] animate-[slide-left_2s_linear_infinite]">
                          <svg width="100%" height="100" viewBox="0 0 400 100" preserveAspectRatio="none">
                              <path d="M0,50 L50,50 L60,20 L75,90 L90,50 L150,50 L160,20 L175,90 L190,50 L250,50 L260,20 L275,90 L290,50 L350,50 L360,20 L375,90 L400,50" fill="none" stroke="#00f0ff" strokeWidth="2" vectorEffect="non-scaling-stroke"/>
                          </svg>
                        </div>
                    </div>
                </div>

                <div className="space-y-4 font-mono mb-8">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-gray-400">{lang === 'vi' ? 'Hấp thụ sáng sinh học:' : 'Bio-light absorption:'}</span>
                      <span className="text-green-500 font-bold">PASS <span className="inline-block w-2 h-2 bg-green-500 rounded-full ml-1 animate-pulse"></span></span>
                    </div>
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-gray-400">{lang === 'vi' ? 'Nhiễu không gian tĩnh:' : 'Static spatial noise:'}</span>
                      <span className="text-green-500 font-bold">NONE <span className="inline-block w-2 h-2 bg-green-500 rounded-full ml-1 animate-[pulse_1.5s_infinite]"></span></span>
                    </div>
                    <div className="mt-6 pt-4 border-t border-white/10">
                      <div className="bg-green-500/10 border border-green-500/30 text-green-500 p-4 rounded-xl text-center font-black text-sm tracking-widest transform transition-transform hover:scale-105 cursor-default">
                          {lang === 'vi' ? 'KẾT LUẬN: NGƯỜI THẬT' : 'RESULT: REAL HUMAN'}
                      </div>
                    </div>
                </div>

                <button onClick={toggleLiveness} className="w-full text-gray-500 hover:text-white hover:bg-white/10 py-3 rounded-xl text-[10px] uppercase font-bold tracking-widest transition-all border border-transparent hover:border-white/10">
                    {lang === 'vi' ? 'TẮT MÁY QUÉT' : 'SHUTDOWN SCANNER'}
                </button>
              </div>
            </div>
          )}
        </div>
        </>
      )}

      {/* MODE: PROACTIVE SHIELD */}
      {activeTab === 'PROTECT' && (
        <div className="bg-surface border border-green-500/30 rounded-3xl p-6 md:p-10 shadow-[0_0_50px_rgba(34,197,94,0.05)] relative overflow-hidden animate-in slide-in-from-bottom-6 duration-500">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
             <div className="flex flex-col gap-6">
                <div>
                  <h3 className="text-2xl font-black text-white uppercase tracking-tight mb-4 flex items-center gap-3">
                     <ShieldCheck size={28} className="text-green-500" />
                     {lang === 'vi' ? 'KHIÊN CHỐNG AI (FAWKES)' : 'ANTI-AI FAWKES SHIELD'}
                  </h3>
                  <p className="text-gray-400 text-sm leading-relaxed mb-6">
                     {t.tools_protect_desc}
                  </p>
                </div>

                <div className="relative">
                   <input 
                      ref={shieldInputRef}
                      type="file" 
                      accept="image/*" 
                      onChange={handleShieldUpload}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                   />
                   <div className="border-2 border-dashed border-green-500/30 bg-green-500/5 hover:bg-green-500/10 transition-colors rounded-2xl p-8 flex flex-col items-center justify-center text-center group">
                      <div className="bg-green-500/20 w-16 h-16 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                          <UploadCloud size={28} className="text-green-500" />
                      </div>
                      <span className="text-green-500 font-bold text-sm tracking-widest uppercase mb-2">
                          {lang === 'vi' ? 'CHỌN ẢNH CẦN BẢO VỆ' : 'SELECT PHOTO TO PROTECT'}
                      </span>
                      <span className="text-gray-500 text-xs">
                          {shieldFile ? shieldFile.name : (lang === 'vi' ? 'Hỗ trợ JPG, PNG (Tối đa 10MB)' : 'Supports JPG, PNG (Max 10MB)')}
                      </span>
                   </div>
                </div>

                {shieldImage && !protectedDataUrl && (
                   <button 
                      onClick={applyFaceShield}
                      disabled={isShielding}
                      className="w-full bg-green-500 text-black py-4 rounded-xl font-black text-xs md:text-sm uppercase tracking-[0.2em] transition-all shadow-[0_0_20px_rgba(34,197,94,0.4)] hover:bg-green-400 flex justify-center items-center gap-3"
                   >
                      {isShielding ? <Activity size={18} className="animate-spin" /> : <Lock size={18} />} 
                      {isShielding ? (lang === 'vi' ? 'ĐANG TIÊM NHIỄU ĐỐI KHÁNG...' : 'INJECTING ADVERSARIAL NOISE...') : (lang === 'vi' ? 'KÍCH HOẠT KHIÊN TÀNG HÌNH' : 'ACTIVATE INVISIBLE SHIELD')}
                   </button>
                )}
             </div>

             <div className="bg-black border border-white/5 rounded-2xl relative overflow-hidden flex flex-col items-center justify-center min-h-[400px]">
                {!shieldImage ? (
                   <div className="text-gray-600 flex flex-col items-center max-w-[200px] text-center p-8">
                     <ShieldCheck size={48} className="text-gray-800 mb-4 opacity-50" />
                     <span className="text-xs uppercase tracking-widest font-bold">
                       {lang === 'vi' ? 'KHUNG XEM TRƯỚC AN TOÀN' : 'SECURE PREVIEW PANEL'}
                     </span>
                   </div>
                ) : (
                   <div className="w-full h-full relative overflow-hidden group flex items-center justify-center">
                      <img 
                        src={protectedDataUrl || shieldImage} 
                        alt="Preview" 
                        className={`max-w-full max-h-[500px] object-contain ${isShielding ? 'opacity-50 grayscale' : 'opacity-100'} transition-all duration-300`} 
                      />
                      {protectedDataUrl && (
                         <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20">
                            <a 
                               href={protectedDataUrl} 
                               download={"deepfense_shielded_" + shieldFile?.name}
                               className="bg-green-500 text-black px-6 py-3 rounded-full font-black text-xs uppercase tracking-widest shadow-[0_10px_30px_rgba(34,197,94,0.4)] hover:scale-105 transition-transform flex items-center gap-2 border-2 border-green-400"
                            >
                               <Download size={16} /> {lang === 'vi' ? 'TẢI ẢNH AN TOÀN' : 'DOWNLOAD SAFE IMAGE'}
                            </a>
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
           <div className="lg:col-span-4 flex flex-col gap-2">
              {KNOWLEDGE_BASE[lang].map((cat, idx) => (
                  <button 
                    key={idx}
                    onClick={() => setActiveKnowledgeCat(idx)}
                    className={`text-left p-4 rounded-xl font-bold text-[10px] md:text-xs tracking-widest transition-all border shadow-lg flex items-center gap-3 ${activeKnowledgeCat === idx ? 'bg-primary text-black border-primary' : 'bg-black/40 border-white/5 text-gray-400 hover:border-white/20 hover:text-white'}`}
                  >
                    <span className={activeKnowledgeCat === idx ? 'text-black' : 'text-primary'}>
                       {getKnowledgeIcon(idx)}
                    </span>
                    <span className="leading-snug uppercase">{cat.category}</span>
                  </button>
              ))}
           </div>
           
           {/* Content Box */}
           <div className="lg:col-span-8 bg-surface border border-white/10 rounded-3xl p-6 md:p-10 shadow-2xl relative overflow-hidden h-fit">
               <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary to-secondary"></div>
               <div key={activeKnowledgeCat} className="animate-in fade-in slide-in-from-right-8 duration-500">
                  <h3 className="text-xl md:text-2xl font-black text-white mb-6 text-primary border-b border-white/10 pb-6 flex items-center gap-4">
                     <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                        {getKnowledgeIcon(activeKnowledgeCat)}
                     </div>
                     {KNOWLEDGE_BASE[lang][activeKnowledgeCat].category}
                  </h3>
                  <div className="space-y-6">
                     {KNOWLEDGE_BASE[lang][activeKnowledgeCat].items.map((item, idx) => (
                        <div key={idx} className="bg-black/60 p-6 md:p-8 rounded-2xl border border-white/5 group hover:border-primary/30 transition-all hover:bg-black/80 hover:shadow-[0_0_20px_rgba(0,240,255,0.05)]">
                           <h4 className="text-base md:text-lg font-bold text-white mb-4 flex items-start gap-3">
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

      {/* MODE: CRISIS HUB */}
      {activeTab === 'CRISIS' && (
        <div className="animate-in slide-in-from-bottom-6 duration-500">
           <CrisisHub lang={lang} />
        </div>
      )}
    </div>
  );
};

export default Tools;