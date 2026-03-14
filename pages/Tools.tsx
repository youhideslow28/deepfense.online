
import React, { useState } from 'react';
import { CHECKLIST_DATA, KNOWLEDGE_BASE } from '../data';
import { Language } from '../types';
import { ChevronDown, ChevronUp, ShieldCheck, Search, Zap, Brain, Activity, Info, Gavel, HeartHandshake, Laptop } from 'lucide-react';

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
        <div className="bg-surface border border-white/5 rounded-2xl overflow-hidden transition-all duration-300 hover:border-primary/50 shadow-lg mb-6">
            <button 
                onClick={() => setIsOpen(!isOpen)}
                className="w-full flex items-center justify-between p-6 hover:bg-white/5 transition-colors text-left"
            >
                <div className="flex items-center gap-4">
                    <div className="text-primary">{icon}</div>
                    <span className="font-black text-white text-sm uppercase tracking-widest">{title}</span>
                </div>
                {isOpen ? <ChevronUp size={18} className="text-primary" /> : <ChevronDown size={18} className="text-gray-500" />}
            </button>
            {isOpen && (
                <div className="p-8 border-t border-white/5 bg-black/40 animate-in slide-in-from-top-2 duration-200">
                    {children}
                </div>
            )}
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

  const toggleCheck = (item: string) => {
    const newChecks = new Set(checks);
    if (newChecks.has(item)) newChecks.delete(item);
    else newChecks.add(item);
    setChecks(newChecks);
  };

  const analyzeRisk = () => {
    setResult(checks.size);
    setTimeout(() => {
        const el = document.getElementById('risk-result');
        el?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  const getKnowledgeIcon = (category: string) => {
    if (category.includes('PHÁP LUẬT') || category.includes('LAW')) return <Gavel size={20}/>;
    if (category.includes('ĐỜI SỐNG') || category.includes('LIFE')) return <HeartHandshake size={20}/>;
    if (category.includes('DẤU HIỆU') || category.includes('SIGNS')) return <Activity size={20}/>;
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
                <h2 className="text-5xl font-black mb-4 text-white uppercase tracking-tighter leading-none">{lang === 'vi' ? 'QUÉT RỦI RO' : 'RISK SCAN'}</h2>
                <p className="text-gray-400 text-sm">{lang === 'vi'
                    ? 'Hãy đánh dấu các biểu hiện bất thường mà bạn quan sát được trong video call.'
                    : 'Check the abnormal signs observed during the video call.'}
                </p>
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
                    className="bg-primary text-black px-12 py-5 rounded-2xl font-black text-xs uppercase tracking-[0.3em] transition-all shadow-xl shadow-primary/20 hover:scale-105 active:scale-95 flex items-center gap-3 mx-auto"
                >
                    <ActivityIcon size={18} /> {lang === 'vi' ? 'BẮT ĐẦU PHÂN TÍCH RỦI RO' : 'START RISK ANALYSIS'}
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
        <div className="animate-in slide-in-from-bottom-4 duration-500">
            <div className="text-center mb-12">
                <h2 className="text-5xl font-black mb-4 text-white uppercase tracking-tighter leading-none">{lang === 'vi' ? 'KIẾN THỨC NỀN TẢNG' : 'CORE KNOWLEDGE'}</h2>
                <p className="text-gray-400 text-sm">{lang === 'vi' ? 'Nâng cao nhận thức để tự bảo vệ mình trong không gian số' : 'Raise awareness to protect yourself in the digital space'}</p>
            </div>
            
            {KNOWLEDGE_BASE[lang] ? KNOWLEDGE_BASE[lang].map((cat: any, idx: number) => (
                <KnowledgeItem key={idx} title={cat.category} icon={getKnowledgeIcon(cat.category)}>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {cat.items.map((item: any, i: number) => (
                            <div key={i} className="bg-black/40 p-6 rounded-2xl border border-white/5 hover:border-primary/20 transition-all group">
                                <h4 className="text-primary font-black text-[10px] uppercase tracking-widest mb-3">{item.title}</h4>
                                <p className="text-xs text-gray-300 leading-relaxed">{item.content}</p>
                            </div>
                        ))}
                    </div>
                </KnowledgeItem>
            )) : (
               <div className="text-center py-20 text-gray-600 italic">Dữ liệu đang được cập nhật...</div>
            )}

            {/* Default Hardcoded knowledge for safety */}
            <KnowledgeItem title={lang === 'vi' ? "🛡️ CHIẾN LƯỢC PHÒNG VỆ" : "🛡️ DEFENSE STRATEGY"} icon={<ShieldCheck size={20}/>}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-[12px] text-gray-300 leading-relaxed">
                    <div className="bg-black/60 p-8 rounded-3xl border border-white/5 hover:border-primary/20 transition-all">
                        <div className="text-primary font-black text-xs mb-6 uppercase tracking-widest flex items-center gap-2">
                           <Brain size={14}/> {lang === 'vi' ? 'QUY TẮC "CHẬM LẠI 1 NHỊP"' : '"SLOW DOWN" RULE'}
                        </div>
                        <ul className="space-y-4">
                            <li className="flex gap-4 items-start"><span className="text-primary font-black mt-1">•</span> {lang === 'vi' ? 'Luôn dành ít nhất 30 giây suy nghĩ trước khi thực hiện bất kỳ giao dịch nào.' : 'Always take at least 30 seconds to think before any transaction.'}</li>
                            <li className="flex gap-4 items-start"><span className="text-primary font-black mt-1">•</span> {lang === 'vi' ? 'Kiểm tra chéo: Dùng sim thường gọi lại cho người thân để xác nhận.' : 'Cross-check: Use normal SIM to call back relatives for confirmation.'}</li>
                        </ul>
                    </div>
                    <div className="bg-black/60 p-8 rounded-3xl border border-white/5 hover:border-success/20 transition-all">
                        <div className="text-success font-black text-xs mb-6 uppercase tracking-widest flex items-center gap-2">
                           <HeartHandshake size={14}/> {lang === 'vi' ? 'MẬT MÃ GIA ĐÌNH' : 'FAMILY CODE'}
                        </div>
                        <ul className="space-y-4">
                            <li className="flex gap-4 items-start"><span className="text-success font-black mt-1">•</span> {lang === 'vi' ? 'Thiết lập một từ khóa bí mật hoặc một câu hỏi riêng tư mà chỉ người thân mới trả lời được.' : 'Establish a keyword or private question only family members can answer.'}</li>
                            <li className="flex gap-4 items-start"><span className="text-success font-black mt-1">•</span> {lang === 'vi' ? 'Cập nhật mật mã định kỳ 3 tháng một lần để đảm bảo an toàn.' : 'Update the code every 3 months for safety.'}</li>
                        </ul>
                    </div>
                </div>
            </KnowledgeItem>
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
