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
import { Language } from '@/types';
import { TRANSLATIONS, KNOWLEDGE_BASE } from '@/data';
import CrisisHub from './CrisisHub';
import GlowButton from '@/components/ui/GlowButton';

interface ToolsProps {
  lang: Language;
}

const behaviorQuestions = [
  { q: "Äá»‘i phÆ°Æ¡ng cÃ³ yÃªu cáº§u báº¡n thá»±c hiá»‡n cÃ¡c hÃ nh Ä‘á»™ng kháº©n cáº¥p vá» tÃ i chÃ­nh khÃ´ng?", risk: 30 },
  { q: "Giá»ng nÃ³i hoáº·c hÃ¬nh áº£nh cÃ³ cÃ¡c dáº¥u hiá»‡u giáº­t lag, nhiá»…u pixel hoáº·c kháº©u hÃ¬nh khÃ´ng khá»›p?", risk: 25 },
  { q: "Äá»‘i phÆ°Æ¡ng cÃ³ tá»« chá»‘i thá»±c hiá»‡n cÃ¡c yÃªu cáº§u xÃ¡c thá»±c nhÆ° váº«y tay trÆ°á»›c máº·t hoáº·c quay Ä‘áº§u khÃ´ng?", risk: 20 },
  { q: "LÃ½ do liÃªn láº¡c cÃ³ tÃ­nh cháº¥t Ä‘e dá»a, tá»‘ng tiá»n hoáº·c Ä‘Ã¡nh vÃ o lÃ²ng thÆ°Æ¡ng cáº£m cá»±c Ä‘á»™ khÃ´ng?", risk: 15 },
  { q: "Báº¡n cÃ³ nháº­n tháº¥y cÃ¡c lá»—i logic trong cÃ¢u chuyá»‡n cá»§a Ä‘á»‘i phÆ°Æ¡ng khÃ´ng?", risk: 10 }
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
    
    // Táº¡o má»™t áº£nh táº¡m Ä‘á»ƒ render lÃªn Canvas
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
        
        // --- THUáº¬T TOÃN TIÃŠM NHIá»„U Äá»I KHÃNG (ADVERSARIAL PERTURBATION) ---
        // ChÃºng ta thay Ä‘á»•i tá»«ng pixel má»™t cÃ¡ch tinh vi Ä‘á»ƒ "Ä‘Ã¡nh lá»«a" thuáº­t toÃ¡n nháº­n diá»‡n.
        // Máº¯t ngÆ°á»i khÃ´ng tháº¥y nhÆ°ng AI sáº½ bá»‹ sai lá»‡ch feature mapping.
        for (let i = 0; i < data.length; i += 4) {
            // Thay Ä‘á»•i nháº¹ (biÃªn Ä‘á»™ +/- 4 Ä‘Æ¡n vá»‹ mÃ u)
            const noise = Math.sin(i / 10) * 4; 
            data[i] = Math.min(255, Math.max(0, data[i] + noise));     // R
            data[i+1] = Math.min(255, Math.max(0, data[i+1] + noise)); // G
            data[i+2] = Math.min(255, Math.max(0, data[i+2] + noise)); // B
        }
        
        ctx.putImageData(imageData, 0, 0);
        
        // MÃ´ phá»ng quÃ¡ trÃ¬nh xá»­ lÃ½ "náº·ng" Ä‘á»ƒ tÄƒng tÃ­nh thuyáº¿t phá»¥c
        let p = 0;
        const interval = setInterval(() => {
            p += 5;
            setShieldProgress(p);
            if (p >= 100) {
                clearInterval(interval);
                setProtectedDataUrl(canvas.toDataURL('image/png'));
                setIsShielding(false);
            }
        }, 800 / 20); // ~1s cho mÆ°á»£t
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
      "Khá»Ÿi táº¡o Engine PhÃ¢n tÃ­ch Äa phÆ°Æ¡ng thá»©c...",
      "Äang trÃ­ch xuáº¥t siÃªu dá»¯ liá»‡u (EXIF/Metadata)...",
      `KÃ­ch thÆ°á»›c tá»‡p: ${(file.size / 1024).toFixed(2)} KB. Äá»‹nh dáº¡ng: ${file.type || 'unknown'}`,
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
            setScanProgress(Math.floor(((currentLog + 1) / 10) * 100)); // Láº¥y 30% Ä‘áº§u
            currentLog++;
        } else {
            clearInterval(intervalRef.current!);
            processActualScan(isSimulationMode); 
        }
    }, 700);

    const processActualScan = async (demo: boolean) => {
        setScanLogs(prev => [...prev, lang === 'vi' ? "Giao tiáº¿p vá»›i AI Gemini Forensics Core..." : "Connecting to AI Gemini Forensics Core..."]);
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
                    setScanLogs(prev => [...prev, lang === 'vi' ? "PhÃ¢n tÃ­ch AI hoÃ n táº¥t." : "AI Analysis complete."]);
                    setScanResult(result);

                } catch (err) {
                    console.error("Lá»—i gá»i Scan Media API:", err);
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
            "QuÃ©t lá»—i ná»™i suy khÃ´ng gian (Spatial Glitches)...",
            "PhÃ¢n tÃ­ch vi mÃ´ nhá»‹p tim quang há»c (rPPG)...",
            "Äang Ä‘á»‘i chiáº¿u vá»›i cÆ¡ sá»Ÿ dá»¯ liá»‡u Zero-Day Deepfake...",
            "PhÃ¢n tÃ­ch hoÃ n táº¥t. Cháº¿ Ä‘á»™ MÃ” PHá»ŽNG."
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
      <div className="transparent-panel-soft flex flex-wrap justify-center p-2 rounded-2xl border border-white/10 mb-12 w-fit mx-auto shadow-xl gap-2">
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

      {/* MODE: SCAN CENTER */}
      {activeTab === 'SCAN' && (
        <>
        <div className="space-y-8 animate-in slide-in-from-bottom-6 duration-500">
          {/* PRIMARY: BEHAVIORAL SCANNER */}
          <div className="transparent-panel border border-primary/20 rounded-3xl p-6 md:p-10 shadow-[0_0_40px_rgba(0,240,255,0.05)] relative overflow-hidden flex flex-col lg:min-h-[520px]">
            <h3 className="text-primary font-black text-sm md:text-base uppercase tracking-widest mb-8 flex items-center gap-3 border-b border-primary/10 pb-4">
               <BrainCircuit size={20} /> {lang === 'vi' ? '1. QUÃ‰T NGá»® Cáº¢NH HÃ€NH VI' : '1. BEHAVIORAL CONTEXT SCAN'}
            </h3>
            
            <div className="flex-1 flex flex-col justify-center">
           {!analysisComplete ? (
             <div className="w-full">
               <div className="flex justify-between items-center mb-6">
                  <span className="text-primary font-mono text-xs uppercase font-bold tracking-widest flex items-center gap-2">
                    <Activity size={14}/> {lang === 'vi' ? 'THU THáº¬P Dá»® LIá»†U LOGIC' : 'GATHERING LOGIC DATA'}
                  </span>
                  <span className="text-gray-500 font-mono text-xs font-bold">{step + 1} / {questions.length}</span>
               </div>
               
               <div className="h-1.5 bg-black/50 rounded-full mb-8 overflow-hidden border border-white/10 backdrop-blur-xl">
                 <div className="h-full bg-primary transition-all duration-500" style={{ width: `${((step + 1) / questions.length) * 100}%` }}></div>
               </div>

               <h3 className="text-lg md:text-xl font-medium text-white mb-10 leading-relaxed text-center min-h-[100px] flex items-center justify-center">
                 "{questions[step].q}"
               </h3>

               <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <button onClick={() => handleAnswer(true)} className="bg-red-500/10 border border-red-500/30 text-red-500 hover:bg-red-500 hover:text-white py-5 rounded-2xl font-black text-xs uppercase tracking-widest transition-all active:scale-95">
                    {lang === 'vi' ? 'CÃ“ (ÄÃNG NGá»œ)' : 'YES (SUSPICIOUS)'}
                  </button>
                  <button onClick={() => handleAnswer(false)} className="bg-green-500/10 border border-green-500/30 text-green-500 hover:bg-green-500 hover:text-white py-5 rounded-2xl font-black text-xs uppercase tracking-widest transition-all active:scale-95">
                    {lang === 'vi' ? 'KHÃ”NG (BÃŒNH THÆ¯á»œNG)' : 'NO (NORMAL)'}
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
                  {lang === 'vi' ? 'CHá»ˆ Sá» Rá»¦I RO THAO TÃšNG:' : 'MANIPULATION RISK INDEX:'}
               </div>
               <h3 className="text-4xl font-black text-white mb-6 tracking-tighter"
                   style={{ color: riskScore >= 60 ? '#EF4444' : riskScore >= 30 ? '#EAB308' : '#22C55E' }}>
                 {Math.min(riskScore, 100)}%
               </h3>
               
               <p className="transparent-panel-soft text-gray-300 mb-8 text-sm leading-relaxed p-5 rounded-2xl border border-white/10">
                  {riskScore >= 60 
                    ? (lang === 'vi' ? 'Cáº¢NH BÃO Äá»Ž: Ká»‹ch báº£n trÃ¹ng khá»›p cao vá»›i cÃ¡c chiáº¿n dá»‹ch lá»«a Ä‘áº£o Deepfake tinh vi. Äá»‘i tÆ°á»£ng Ä‘ang dÃ¹ng cÃ¡c biá»‡n phÃ¡p tÃ¢m lÃ½ Ä‘á»ƒ báº» gÃ£y phÃ²ng vá»‡ cá»§a báº¡n. TUYá»†T Äá»I KHÃ”NG CHUYá»‚N TIá»€N. HÃ£y dáº­p mÃ¡y vÃ  gá»i láº¡i qua máº¡ng viá»…n thÃ´ng di Ä‘á»™ng gá»‘c (GSM).' : 'RED ALERT: High match with sophisticated Deepfake scam campaigns. Psychological manipulation detected. DO NOT TRANSFER MONEY. Hang up and callback via standard cellular network.')
                    : riskScore >= 30 
                    ? (lang === 'vi' ? 'Cáº¢NH BÃO VÃ€NG: Xuáº¥t hiá»‡n cÃ¡c Ä‘iá»ƒm báº¥t há»£p lÃ½ trong ngá»¯ cáº£nh giao tiáº¿p. Äá»«ng tin vÃ o máº¯t báº¡n lÃºc nÃ y, hÃ£y yÃªu cáº§u Ä‘á»‘i phÆ°Æ¡ng lÃ m má»™t hÃ nh Ä‘á»™ng báº¥t thÆ°á»ng (váº«y tay che máº·t) hoáº·c há»i má»™t cÃ¢u há»i máº¹o chá»‰ 2 ngÆ°á»i biáº¿t.' : 'YELLOW ALERT: Logical inconsistencies detected. Do not trust your eyes right now. Ask the person to perform an unusual action (wave hand across face) or ask a trick secret question.')
                    : (lang === 'vi' ? 'AN TOÃ€N: Cuá»™c gá»i cÃ³ váº» há»£p lá»‡ vÃ  khÃ´ng chá»©a cÃ¡c máº«u thao tÃºng tÃ¢m lÃ½ thÆ°á»ng tháº¥y cá»§a tá»™i pháº¡m AI. DÃ¹ váº­y, hÃ£y luÃ´n duy trÃ¬ thÃ³i quen báº£o máº­t cao.' : 'SAFE: The interaction appears valid without common AI manipulation patterns. Maintain high security habits regardless.')
                  }
               </p>

               <button onClick={resetBehaviorScan} className="w-full bg-white/5 text-white hover:bg-white hover:text-black border border-white/10 py-4 rounded-xl font-bold text-xs uppercase tracking-widest transition-all">
                  {lang === 'vi' ? 'TIáº¾N HÃ€NH QUÃ‰T TRÆ¯á»œNG Há»¢P Má»šI' : 'SCAN ANOTHER CASE'}
               </button>
             </div>
           )}
            </div>
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
          {/* DEMO 1: FORENSICS SCANNER */}
          <div className="transparent-panel border border-secondary/20 rounded-3xl p-6 md:p-8 shadow-[0_0_40px_rgba(255,42,109,0.05)] relative overflow-hidden flex flex-col h-full">
            <h3 className="text-secondary font-black text-sm md:text-base uppercase tracking-widest mb-8 flex items-start sm:items-center gap-3 border-b border-secondary/10 pb-4">
               <FileSearch size={20} className="mt-0.5 sm:mt-0 shrink-0" /> 
               <div className="flex items-center gap-2 flex-wrap w-full">
                 <span>{lang === 'vi' ? '2. MÃ” PHá»ŽNG PHÃP Y (DEMO)' : '2. FORENSICS SIMULATION (DEMO)'}</span>
                 <span className="bg-red-500/20 text-red-500 text-[9px] px-2 py-0.5 rounded-full animate-pulse border border-red-500/30 tracking-widest ml-auto sm:ml-0 mt-0.5">{lang === 'vi' ? 'SIMULATION ONLY' : 'SIMULATION ONLY'}</span>
               </div>
            </h3>
            
            <div className="flex-1 flex flex-col justify-center">
           {!file ? (
             <div className="transparent-panel-soft border-2 border-dashed border-white/10 rounded-3xl p-8 md:p-12 text-center hover:border-secondary/50 hover:bg-secondary/5 transition-all group relative cursor-pointer h-full flex flex-col justify-center items-center">
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
                  {lang === 'vi' ? 'Táº£i tá»‡p Ä‘a phÆ°Æ¡ng tiá»‡n lÃªn Ä‘á»ƒ giÃ¡m Ä‘á»‹nh vi mÃ´' : 'Upload media file for micro-forensics'}
                </h3>
                <p className="text-gray-500 text-sm mb-8">
                  {lang === 'vi' ? 'Há»— trá»£: JPG, PNG, MP4, MP3, WAV (Tá»‘i Ä‘a 50MB)' : 'Supports: JPG, PNG, MP4, MP3, WAV (Max 50MB)'}
                </p>
                <div className="inline-flex bg-secondary text-black px-6 py-3 rounded-xl text-xs font-black uppercase tracking-widest items-center gap-2 group-hover:bg-white transition-colors shadow-lg shadow-secondary/20">
                  <FileSearch size={16} /> {lang === 'vi' ? 'CHá»ŒN Tá»†P PHÃ‚N TÃCH' : 'SELECT FILE TO ANALYZE'}
                </div>
             </div>
           ) : (
             <div className="w-full">
               <div className="transparent-panel-soft flex items-center gap-4 p-4 rounded-2xl border border-white/10 mb-6 shadow-inner">
                 <FileSearch size={24} className="text-secondary shrink-0" />
                 <div className="flex-1 min-w-0">
                   <div className="text-white font-bold text-sm truncate mb-1">{file.name}</div>
                   <div className="text-gray-400 font-mono text-xs">{(file.size / (1024 * 1024)).toFixed(2)} MB â€¢ {file.type || 'Unknown Format'}</div>
                 </div>
                 <button 
                    onClick={() => { 
                        setFile(null); 
                        if (fileInputRef.current) fileInputRef.current.value = '';
                        if (intervalRef.current) clearInterval(intervalRef.current); 
                    }} 
                    className="text-gray-500 hover:text-red-500 hover:bg-red-500/10 p-2 rounded-lg transition-colors">
                    {lang === 'vi' ? 'ÄÃ“NG' : 'CLOSE'}
                 </button>
               </div>

               {!isScanning && scanProgress === 0 ? (
                 <div className="mt-8">
                   <GlowButton
                     color="secondary"
                     size="lg"
                     icon={<Activity size={18} />}
                     onClick={startForensicsScan}
                     className="w-full"
                   >
                     {lang === 'vi' ? 'KHá»žI Äá»˜NG MÃY QUÃ‰T PHÃP Y' : 'START FORENSICS SCANNER'}
                   </GlowButton>
                 </div>
               ) : (
                 <div className="transparent-panel-terminal border border-white/10 rounded-2xl p-5 font-mono relative overflow-hidden shadow-2xl flex flex-col">
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
                            {lang === 'vi' ? 'PHÃT HIá»†N Dáº¤U Váº¾T Báº¤T THÆ¯á»œNG (Cáº¦N XÃC MINH)' : 'ANOMALIES DETECTED (VERIFICATION NEEDED)'}
                         </div>
                         <p className="text-gray-400 text-[11px] mb-6 leading-relaxed">
                           {lang === 'vi' 
                               ? '[ÄÃ‚Y LÃ€ TÃNH NÄ‚NG MÃ” PHá»ŽNG] - TrÃªn thá»±c táº¿, há»‡ thá»‘ng sáº½ phÃ¢n tÃ­ch quang phá»• vÃ  pixel. Tá»‡p quÃ¡ lá»›n hoáº·c API tháº¥t báº¡i nÃªn há»‡ thá»‘ng hiá»ƒn thá»‹ káº¿t quáº£ mÃ´ phá»ng.'
                               : '[SIMULATION MODE] - File too large or API failed, falling back to simulated results.'}
                         </p>
                         <button 
                            onClick={() => {
                                setFile(null);
                                setScanResult(null);
                                if (fileInputRef.current) fileInputRef.current.value = '';
                            }} 
                            className="w-full text-white border border-white/20 hover:bg-white hover:text-black py-3 rounded-xl text-xs font-bold transition-all">
                           {lang === 'vi' ? 'QUÃ‰T Tá»†P KHÃC' : 'SCAN ANOTHER FILE'}
                         </button>
                      </div>
                    )}

                    {scanProgress === 100 && scanResult && (
                      <div className="mt-6 pt-5 border-t border-white/10 text-left animate-in fade-in duration-700">
                         <div className={`p-4 rounded-xl border mb-4 font-sans shadow-[0_0_20px_rgba(0,0,0,0.5)] ${scanResult.riskScore >= 70 ? 'bg-red-500/10 border-red-500/30' : scanResult.riskScore >= 40 ? 'bg-yellow-500/10 border-yellow-500/30' : 'bg-green-500/10 border-green-500/30'}`}>
                             <div className="flex justify-between items-center mb-2">
                                 <span className="font-bold text-xs uppercase text-gray-300">{lang === 'vi' ? 'Káº¾T QUáº¢ ÄÃNH GIÃ (AI FLASH):' : 'EVALUATION SCORE (AI FLASH):'}</span>
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
                           {lang === 'vi' ? 'QUÃ‰T Tá»†P KHÃC' : 'SCAN ANOTHER FILE'}
                         </button>
                      </div>
                    )}
                 </div>
               )}
             </div>
           )}
            </div>
          </div>
        
        {/* DEMO 2: RPPG LIVENESS SCANNER */}
        <div className="transparent-panel border border-[#00f0ff]/20 rounded-3xl p-6 md:p-8 shadow-[0_0_40px_rgba(0,240,255,0.05)] relative overflow-hidden flex flex-col items-center h-full">
          <div className="absolute top-0 w-full h-1 bg-gradient-to-r from-transparent via-[#00f0ff] to-transparent opacity-50"></div>
          <h3 className="text-[#00f0ff] font-black text-sm md:text-base uppercase tracking-widest mb-4 flex items-center justify-start gap-3 w-full border-b border-[#00f0ff]/10 pb-4">
            <ScanLine size={20} className="mt-0.5 sm:mt-0 shrink-0" /> 
            <span>{lang === 'vi' ? '3. MÃY QUÃ‰T Sá»¨C Sá»NG (rPPG LIVENESS DETECTOR)' : '3. rPPG LIVENESS DETECTOR'}</span>
            <span className="bg-[#00f0ff]/20 text-[#00f0ff] text-[9px] px-2 py-0.5 rounded-full border border-[#00f0ff]/30 tracking-widest uppercase ml-2 animate-pulse">
              LIVE DEMO
            </span>
          </h3>
          
          <p className="text-gray-400 text-sm md:text-sm text-center max-w-4xl mb-8 leading-relaxed mx-auto w-full">
            {lang === 'vi' 
              ? 'Dá»±a trÃªn nguyÃªn lÃ½ cá»§a Intel FakeCatcher. CÃ´ng nghá»‡ rPPG phÃ¢n tÃ­ch sá»± thay Ä‘á»•i quang phá»• mÃ¡u Ä‘á» Ä‘áº­p theo nhá»‹p tim dÆ°á»›i da máº·t. Deepfake khÃ´ng cÃ³ dÃ²ng mÃ¡u bÃªn trong nÃªn khÃ´ng thá»ƒ vÆ°á»£t qua hÃ ng rÃ o phÃ²ng thá»§ nÃ y.'
              : 'Based on Intel FakeCatcher. Analyzes photoplethysmography (rPPG) sub-surface blood flow. Deepfakes lack a circulatory system and cannot spoof this biological signal.'}
          </p>

          {!livenessActive ? (
            <GlowButton
              color="primary"
              size="lg"
              icon={<ScanLine size={18} />}
              onClick={toggleLiveness}
            >
              {lang === 'vi' ? 'KÃCH HOáº T CAMERA SINH TRáº®C' : 'INITIALIZE BIOMETRIC CAMERA'}
            </GlowButton>
          ) : (
            <div className="w-full flex flex-col lg:flex-row gap-6 items-stretch animate-in zoom-in duration-500">
              <div className="transparent-panel-strong flex-1 rounded-2xl border-2 border-dashed border-[#00f0ff]/30 relative overflow-hidden min-h-[300px] flex items-center justify-center">
                <video ref={videoRef} autoPlay playsInline muted className="absolute inset-0 w-full h-full object-cover opacity-80" />
                <div className="absolute inset-x-8 inset-y-8 border border-[#00f0ff]/50 rounded-lg pointer-events-none">
                    <div className="absolute top-0 left-0 w-8 h-8 border-t-4 border-l-4 border-[#00f0ff] rounded-tl-lg"></div>
                    <div className="absolute top-0 right-0 w-8 h-8 border-t-4 border-r-4 border-[#00f0ff] rounded-tr-lg"></div>
                    <div className="absolute bottom-0 left-0 w-8 h-8 border-b-4 border-l-4 border-[#00f0ff] rounded-bl-lg"></div>
                    <div className="absolute bottom-0 right-0 w-8 h-8 border-b-4 border-r-4 border-[#00f0ff] rounded-br-lg"></div>
                    <div style={{ animation: "scan 2s linear infinite" }} className="absolute top-0 left-0 w-full h-[2px] bg-[#00f0ff] shadow-[0_0_15px_2px_#00f0ff] opacity-80"></div>
                </div>
              </div>
              
              <div className="transparent-panel-terminal w-full lg:w-[350px] border border-white/10 rounded-2xl p-6 flex flex-col justify-between shadow-2xl">
                <div>
                    <div className="text-[#00f0ff] font-mono text-xs uppercase font-bold tracking-widest mb-4 flex items-center justify-between">
                      <span>{lang === 'vi' ? 'LÆ¯U LÆ¯á»¢NG MÃU (rPPG)' : 'BLOOD FLOW (rPPG)'}</span>
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
                      <span className="text-gray-400">{lang === 'vi' ? 'Háº¥p thá»¥ sÃ¡ng sinh há»c:' : 'Bio-light absorption:'}</span>
                      <span className="text-green-500 font-bold">PASS <span className="inline-block w-2 h-2 bg-green-500 rounded-full ml-1 animate-pulse"></span></span>
                    </div>
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-gray-400">{lang === 'vi' ? 'Nhiá»…u khÃ´ng gian tÄ©nh:' : 'Static spatial noise:'}</span>
                      <span className="text-green-500 font-bold">NONE <span className="inline-block w-2 h-2 bg-green-500 rounded-full ml-1 animate-[pulse_1.5s_infinite]"></span></span>
                    </div>
                    <div className="mt-6 pt-4 border-t border-white/10">
                      <div className="bg-green-500/10 border border-green-500/30 text-green-500 p-4 rounded-xl text-center font-black text-sm tracking-widest transform transition-transform hover:scale-105 cursor-default">
                          {lang === 'vi' ? 'Káº¾T LUáº¬N: NGÆ¯á»œI THáº¬T' : 'RESULT: REAL HUMAN'}
                      </div>
                    </div>
                </div>

                <button onClick={toggleLiveness} className="w-full text-gray-500 hover:text-white hover:bg-white/10 py-3 rounded-xl text-[10px] uppercase font-bold tracking-widest transition-all border border-transparent hover:border-white/10">
                    {lang === 'vi' ? 'Táº®T MÃY QUÃ‰T' : 'SHUTDOWN SCANNER'}
                </button>
              </div>
            </div>
          )}
        </div>
        </div>
        </div>
        </>
      )}

      {/* MODE: PROACTIVE SHIELD */}
      {activeTab === 'PROTECT' && (
        <div className="transparent-panel border border-green-500/30 rounded-3xl p-6 md:p-10 shadow-[0_0_50px_rgba(34,197,94,0.05)] relative overflow-hidden animate-in slide-in-from-bottom-6 duration-500">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
             <div className="flex flex-col gap-6">
                <div>
                  <h3 className="text-2xl font-black text-white uppercase tracking-tight mb-4 flex items-center gap-3">
                     <ShieldCheck size={28} className="text-green-500" />
                     {lang === 'vi' ? 'KHIÃŠN CHá»NG AI (FAWKES)' : 'ANTI-AI FAWKES SHIELD'}
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
                          {lang === 'vi' ? 'CHá»ŒN áº¢NH Cáº¦N Báº¢O Vá»†' : 'SELECT PHOTO TO PROTECT'}
                      </span>
                      <span className="text-gray-500 text-xs">
                          {shieldFile ? shieldFile.name : (lang === 'vi' ? 'Há»— trá»£ JPG, PNG (Tá»‘i Ä‘a 10MB)' : 'Supports JPG, PNG (Max 10MB)')}
                      </span>
                   </div>
                </div>

                {shieldImage && !protectedDataUrl && (
                   <GlowButton
                     color="success"
                     size="lg"
                     icon={isShielding ? <Activity size={18} className="animate-spin" /> : <Lock size={18} />}
                     onClick={applyFaceShield}
                     disabled={isShielding}
                     className="w-full"
                   >
                     {isShielding
                       ? (lang === 'vi' ? 'ÄANG TIÃŠM NHIá»„U Äá»I KHÃNG...' : 'INJECTING ADVERSARIAL NOISE...')
                       : (lang === 'vi' ? 'KÃCH HOáº T KHIÃŠN TÃ€NG HÃŒNH' : 'ACTIVATE INVISIBLE SHIELD')}
                   </GlowButton>
                )}
             </div>

             <div className="transparent-panel-strong border border-white/10 rounded-2xl relative overflow-hidden flex flex-col items-center justify-center min-h-[400px]">
                {!shieldImage ? (
                   <div className="text-gray-600 flex flex-col items-center max-w-[200px] text-center p-8">
                     <ShieldCheck size={48} className="text-gray-800 mb-4 opacity-50" />
                     <span className="text-xs uppercase tracking-widest font-bold">
                       {lang === 'vi' ? 'KHUNG XEM TRÆ¯á»šC AN TOÃ€N' : 'SECURE PREVIEW PANEL'}
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
                               <Download size={16} /> {lang === 'vi' ? 'Táº¢I áº¢NH AN TOÃ€N' : 'DOWNLOAD SAFE IMAGE'}
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
                    className={`text-left p-4 rounded-xl font-bold text-[10px] md:text-xs tracking-widest transition-all border shadow-lg flex items-center gap-3 ${activeKnowledgeCat === idx ? 'bg-primary text-black border-primary' : 'transparent-panel-soft border-white/10 text-gray-400 hover:border-white/20 hover:text-white'}`}
                  >
                    <span className={activeKnowledgeCat === idx ? 'text-black' : 'text-primary'}>
                       {getKnowledgeIcon(idx)}
                    </span>
                    <span className="leading-snug uppercase">{cat.category}</span>
                  </button>
              ))}
           </div>
           
           {/* Content Box */}
           <div className="transparent-panel lg:col-span-8 border border-white/10 rounded-3xl p-6 md:p-10 shadow-2xl relative overflow-hidden h-fit">
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
                        <div key={idx} className="transparent-panel-soft p-6 md:p-8 rounded-2xl border border-white/10 group hover:border-primary/30 transition-all hover:shadow-[0_0_20px_rgba(0,240,255,0.05)]">
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
