
import React, { useState } from 'react';
import { CHECKLIST_DATA, KNOWLEDGE_BASE } from '../data';
import { Language } from '../types';
import { ChevronDown, ChevronUp, ShieldCheck, Search, Zap, Brain, Activity, Info, Gavel, HeartHandshake, Laptop, Terminal, Link2, AlertOctagon, ScanLine, Fingerprint, Lock } from 'lucide-react';

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
  const [checks, setChecks] = useState<Set<string>>(new Set());
  const [result, setResult] = useState<number | null>(null);
  
  // State cho bộ quét văn bản/Link
  const [textInput, setTextInput] = useState('');
  const [isScanningText, setIsScanningText] = useState(false);
  const [textLogs, setTextLogs] = useState<string[]>([]);
  const [textResult, setTextResult] = useState<'SAFE' | 'WARNING' | 'DANGER' | null>(null);

  const toggleCheck = (item: string) => {
    const newChecks = new Set(checks);
    if (newChecks.has(item)) newChecks.delete(item);
    else newChecks.add(item);
    setChecks(newChecks);
  };

  const handleTextScan = () => {
      if (!textInput.trim()) return;
      setIsScanningText(true);
      setTextLogs([]);
      setTextResult(null);

      const mockLogs = [
          "INITIALIZING THREAT INTELLIGENCE ENGINE...",
          "EXTRACTING ENTITIES AND URLS...",
          "CROSS-REFERENCING GLOBAL BLACKLISTS (APWG, PHISHTANK)...",
          "ANALYZING NATURAL LANGUAGE PROCESSING (NLP) PATTERNS...",
          "CHECKING URGENCY/MANIPULATION VECTORS..."
      ];

      mockLogs.forEach((log, index) => {
          setTimeout(() => {
              setTextLogs(prev => [...prev, log]);
              if (index === mockLogs.length - 1) {
                  setTimeout(() => {
                      setIsScanningText(false);
                      // Logic mô phỏng: Chứa chữ "ngân hàng", "chuyển tiền", "http" -> Nguy hiểm
                      const lowerText = textInput.toLowerCase();
                      if (lowerText.includes('http') || lowerText.includes('chuyển') || lowerText.includes('bank') || lowerText.includes('wire') || lowerText.includes('cấp cứu')) {
                          setTextResult('DANGER');
                      } else if (lowerText.includes('vay') || lowerText.includes('mượn') || lowerText.includes('loan')) {
                          setTextResult('WARNING');
                      } else {
                          setTextResult('SAFE');
                      }
                  }, 800);
              }
          }, index * 600); // Mỗi 0.6s hiện 1 log
      });
  };

  const analyzeRisk = () => {
    setResult(checks.size);
    setTimeout(() => {
        const el = document.getElementById('risk-result');
        el?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

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
                <Search size={14} /> QUICK SCAN
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
                <h2 className="text-5xl font-black mb-4 text-white uppercase tracking-tighter leading-none">{lang === 'vi' ? 'TRUNG TÂM PHÂN TÍCH' : 'THREAT HUB'}</h2>
                <p className="text-gray-400 text-sm">{lang === 'vi'
                    ? 'Công cụ phân tích ngữ nghĩa và sinh trắc học video chuyên sâu.'
                    : 'Deep semantics and video biometric analysis tool.'}
                </p>
            </div>

            {/* NEW MODULE: QUICK TEXT/LINK ANALYZER */}
            <div className="bg-surface border border-white/5 rounded-3xl p-6 md:p-8 shadow-2xl mb-16 relative overflow-hidden">
                <div className="absolute top-0 right-0 opacity-5"><Terminal size={150} /></div>
                <h3 className="text-white font-black text-sm uppercase tracking-[0.2em] mb-4 flex items-center gap-2 relative z-10">
                    <ScanLine className="text-primary" size={18}/> {lang === 'vi' ? 'MÔ ĐUN QUÉT VĂN BẢN / LIÊN KẾT ĐÁNG NGỜ' : 'SUSPICIOUS TEXT/LINK SCANNER'}
                </h3>
                
                <div className="flex flex-col md:flex-row gap-4 relative z-10">
                    <div className="relative flex-1">
                        <Link2 className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
                        <input 
                            type="text" 
                            value={textInput}
                            onChange={(e) => setTextInput(e.target.value)}
                            placeholder={lang === 'vi' ? "Dán tin nhắn, đường link hoặc email nghi ngờ vào đây..." : "Paste suspicious message, link, or email here..."}
                            className="w-full bg-black/50 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-sm text-white focus:border-primary outline-none transition-colors"
                        />
                    </div>
                    <button 
                        onClick={handleTextScan}
                        disabled={isScanningText || !textInput.trim()}
                        className="bg-primary text-black px-8 py-4 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed shrink-0 flex items-center justify-center gap-2"
                    >
                        {isScanningText ? <ScanLine className="animate-spin" size={16}/> : <Terminal size={16}/>}
                        {lang === 'vi' ? 'QUÉT DỮ LIỆU' : 'SCAN DATA'}
                    </button>
                </div>

                {/* Scanner Terminal Output */}
                {(textLogs.length > 0 || textResult) && (
                    <div className="mt-6 bg-[#0a0a0a] border border-gray-800 rounded-xl p-4 font-mono text-[10px] sm:text-xs">
                        <div className="flex items-center gap-2 mb-3 pb-3 border-b border-gray-800 text-gray-500">
                            <Lock size={12} /> SECURE_TERMINAL_V2.0
                        </div>
                        <div className="space-y-2 mb-4">
                            {textLogs.map((log, i) => (
                                <div key={i} className="text-primary animate-in fade-in flex items-start gap-2">
                                    <span className="text-gray-600">&gt;</span> {log}
                                </div>
                            ))}
                            {isScanningText && <div className="text-gray-500 animate-pulse flex items-start gap-2"><span className="text-gray-600">&gt;</span> _</div>}
                        </div>
                        
                        {textResult && (
                            <div className={`p-4 rounded-lg border flex items-center justify-between animate-in slide-in-from-bottom-2 ${textResult === 'DANGER' ? 'bg-red-900/20 border-red-500/50 text-red-500' : textResult === 'WARNING' ? 'bg-yellow-900/20 border-yellow-500/50 text-yellow-500' : 'bg-green-900/20 border-green-500/50 text-green-500'}`}>
                                <div className="flex items-center gap-3">
                                    <AlertOctagon size={24} />
                                    <div>
                                        <div className="font-black tracking-widest uppercase">
                                            {textResult === 'DANGER' ? (lang === 'vi' ? 'PHÁT HIỆN RỦI RO CAO' : 'HIGH RISK DETECTED') : 
                                             textResult === 'WARNING' ? (lang === 'vi' ? 'CÓ DẤU HIỆU THAO TÚNG' : 'MANIPULATION SIGNS DETECTED') : 
                                             (lang === 'vi' ? 'CHƯA THẤY BẤT THƯỜNG' : 'NO ANOMALIES FOUND')}
                                        </div>
                                        <div className="text-[10px] mt-1 opacity-80">
                                            {textResult === 'DANGER' ? (lang === 'vi' ? 'Dữ liệu có chứa các từ khóa lừa đảo phổ biến hoặc liên kết độc hại.' : 'Data contains common scam keywords or malicious links.') : 
                                             textResult === 'WARNING' ? (lang === 'vi' ? 'Ngôn từ mang tính thúc giục, vay mượn. Cần xác minh chéo.' : 'Urgent/borrowing language. Cross-verification needed.') : 
                                             (lang === 'vi' ? 'Dữ liệu an toàn ở mức độ phân tích văn bản cơ bản.' : 'Data is safe at the basic text analysis level.')}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                )}
            </div>

            {/* VISUAL CHECKLIST SECTION */}
            <div className="flex items-center gap-4 mb-8">
                <div className="h-px bg-white/10 flex-1"></div>
                <h3 className="text-gray-400 font-mono text-[10px] uppercase tracking-[0.3em] px-4">
                    {lang === 'vi' ? 'MÔ ĐUN GIÁM ĐỊNH VIDEO TRỰC TIẾP' : 'LIVE VIDEO FORENSICS MODULE'}
                </h3>
                <div className="h-px bg-white/10 flex-1"></div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
                {CHECKLIST_DATA[lang].map((cat) => (
                    <div key={cat.category} className="bg-surface border border-white/5 rounded-3xl overflow-hidden shadow-xl hover:border-primary/20 transition-all group">
                        <div className="bg-white/5 border-b border-white/5 p-6 flex items-center gap-3">
                            <div className="h-2.5 w-2.5 bg-primary rounded-full animate-pulse"></div>
                            <span className="font-black text-white text-xs uppercase tracking-[0.2em]">{cat.category}</span>
                        </div>
                        <div className="p-8 space-y-4">
                            {cat.items.map((item) => (
                                <label key={item} className="flex items-center gap-4 p-3 rounded-xl hover:bg-white/5 cursor-pointer group transition-colors">
                                    <div className={`shrink-0 w-6 h-6 rounded-lg border-2 flex items-center justify-center transition-all duration-300 ${checks.has(item) ? 'bg-primary border-primary rotate-90 shadow-[0_0_10px_rgba(0,240,255,0.4)]' : 'border-gray-700 group-hover:border-primary/50'}`}>
                                        {checks.has(item) && <div className="w-2 h-2 bg-black rounded-sm" />}
                                    </div>
                                    <input type="checkbox" className="hidden" checked={checks.has(item)} onChange={() => toggleCheck(item)} />
                                    <span className={`text-[13px] transition-colors leading-relaxed ${checks.has(item) ? 'text-white font-bold' : 'text-gray-400'}`}>{item}</span>
                                </label>
                            ))}
                        </div>
                    </div>
                ))}
            </div>

            <div className="text-center mb-16">
                <button 
                    onClick={analyzeRisk}
                    className="bg-white text-black hover:bg-primary px-12 py-5 rounded-2xl font-black text-xs uppercase tracking-[0.3em] transition-all shadow-xl hover:shadow-primary/20 hover:scale-105 active:scale-95 flex items-center gap-3 mx-auto"
                >
                    <ActivityIcon size={18} /> {lang === 'vi' ? 'TỔNG HỢP & PHÂN TÍCH VIDEO' : 'COMPILE & ANALYZE VIDEO'}
                </button>
            </div>

            {result !== null && (
                <div id="risk-result" className="animate-in slide-in-from-bottom-8 duration-700 scroll-mt-24">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                        <div className="lg:col-span-5">
                            {result === 0 ? (
                                <div className="bg-success/5 border-2 border-success/30 rounded-3xl p-12 text-center relative overflow-hidden shadow-2xl">
                                    <div className="text-6xl mb-8">✅</div>
                                    <h3 className="text-success font-black text-3xl mb-4 uppercase tracking-tighter">{lang === 'vi' ? 'HỆ THỐNG AN TOÀN' : 'SYSTEM SECURE'}</h3>
                                    <p className="text-gray-300 text-sm leading-relaxed">{lang === 'vi' ? 'Không phát hiện dấu hiệu giả mạo rõ rệt. Tuy nhiên, hãy luôn duy trì sự cảnh giác trước các yêu cầu chuyển tiền.' : 'No clear signs of deepfake detected. However, remain high vigilance regarding money transfers.'}</p>
                                </div>
                            ) : result <= 2 ? (
                                <div className="bg-warning/5 border-2 border-warning/30 rounded-3xl p-12 text-center relative overflow-hidden shadow-2xl">
                                    <div className="text-6xl mb-8">⚠️</div>
                                    <h3 className="text-warning font-black text-3xl mb-4 uppercase tracking-tighter">{lang === 'vi' ? 'RỦI RO TIỀM ẨN' : 'POTENTIAL RISK'}</h3>
                                    <p className="text-gray-300 text-sm leading-relaxed">{lang === 'vi' ? `Ghi nhận ${result} biểu hiện bất thường. Chúng tôi khuyến nghị bạn thực hiện xác minh chéo qua cuộc gọi GSM.` : `${result} anomalies recorded. Cross-verification via GSM call recommended.`}</p>
                                </div>
                            ) : (
                                <div className="bg-secondary/5 border-2 border-secondary/30 rounded-3xl p-12 text-center relative overflow-hidden shadow-2xl">
                                    <div className="text-6xl mb-8 animate-pulse">🚨</div>
                                    <h3 className="text-secondary font-black text-3xl mb-4 uppercase tracking-tighter">{lang === 'vi' ? 'NGUY HIỂM CỰC ĐỘ' : 'EXTREME DANGER'}</h3>
                                    <p className="text-white font-bold text-sm leading-relaxed">{lang === 'vi' ? 'DẤU HIỆU LỪA ĐẢO RÕ RỆT. NGẮT KẾT NỐI NGAY LẬP TỨC VÀ KHÔNG CHUYỂN TIỀN!' : 'CLEAR DEEPFAKE SIGNS. DISCONNECT IMMEDIATELY AND DO NOT TRANSFER MONEY!'}</p>
                                </div>
                            )}
                        </div>

                        <div className="lg:col-span-7 bg-surface border border-white/5 rounded-3xl p-10 shadow-2xl">
                            <h3 className="text-white font-black text-[10px] mb-8 flex items-center gap-3 uppercase tracking-[0.3em] border-b border-white/5 pb-6">
                                <ShieldCheck className="text-primary" size={20}/> {lang === 'vi' ? 'KẾ HOẠCH HÀNH ĐỘNG KHẨN CẤP' : 'EMERGENCY ACTION PLAN'}
                            </h3>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                                {[
                                    { step: 1, title: lang === 'vi' ? 'DỪNG CUỘC GỌI' : 'STOP CALL', desc: lang === 'vi' ? 'Ngắt kết nối video ngay lập tức khi phát hiện nghi vấn.' : 'End the video connection immediately upon suspicion.' },
                                    { step: 2, title: lang === 'vi' ? 'XÁC THỰC NGOẠI TUYẾN' : 'OFFLINE VERIFY', desc: lang === 'vi' ? 'Gọi lại bằng sim điện thoại truyền thống hoặc gặp mặt trực tiếp.' : 'Call back via traditional SIM or meet in person.' },
                                    { step: 3, title: lang === 'vi' ? 'KIỂM TRA SINH TRẮC' : 'BIOMETRIC TEST', desc: lang === 'vi' ? 'Yêu cầu người gọi đưa tay ngang mặt hoặc quay nghiêng 90 độ.' : 'Ask caller to wave hand across face or turn head 90 degrees.' },
                                    { step: 4, title: lang === 'vi' ? 'BÁO CÁO NHÀ CHỨC TRÁCH' : 'REPORT', desc: lang === 'vi' ? 'Thông báo cho ngân hàng và cơ quan công an gần nhất.' : 'Inform your bank and the nearest police department.' },
                                ].map((item) => (
                                    <div key={item.step} className="flex gap-6 items-start">
                                        <div className="h-10 w-10 bg-black border border-white/10 rounded-xl flex items-center justify-center shrink-0 text-primary font-mono font-bold text-sm shadow-inner">{item.step}</div>
                                        <div>
                                            <div className="text-white font-black text-xs uppercase tracking-widest mb-1.5">{item.title}</div>
                                            <p className="text-gray-400 text-xs leading-relaxed">{item.desc}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            )}
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
                    {lang === 'vi' ? 'THƯ VIỆN LƯU TRỮ HOLOGRAM' : 'HOLOGRAM DATABANK'}
                </h2>
                <p className="text-primary/80 text-sm font-mono tracking-widest relative z-10">
                    {lang === 'vi' ? 'TRUY CẬP DỮ LIỆU... ĐÃ MỞ KHÓA' : 'ACCESSING DATA... UNLOCKED'}
                </p>
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
