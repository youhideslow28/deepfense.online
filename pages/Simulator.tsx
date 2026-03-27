import React, { useState, useEffect, useRef } from 'react';
import { Target, MessageSquare, Timer, AlertTriangle, ShieldCheck, XCircle, Send, Play } from 'lucide-react';
import { Language } from '../types';

interface SimulatorProps {
  lang: Language;
}

interface ChatMessage {
  id: number;
  sender: 'ai' | 'user';
  text: string;
}

const Simulator: React.FC<SimulatorProps> = ({ lang }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputStr, setInputStr] = useState('');
  const [started, setStarted] = useState(false);
  const [timer, setTimer] = useState(0);
  const [status, setStatus] = useState<'playing' | 'failed' | 'success' | 'idle'>('idle');
  const chatEndRef = useRef<HTMLDivElement>(null);

  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    if (messages.length > 0 || isTyping) {
      chatEndRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  }, [messages, isTyping]);

  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;
    if (status === 'playing') {
      interval = setInterval(() => {
        setTimer((prev) => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [status]);

  const startSimulation = () => {
    setStarted(true);
    setStatus('playing');
    setTimer(0);
    setMessages([
      { id: Date.now(), sender: 'ai', text: lang === 'vi' ? 'Chào em, anh là Hoàng (Giám đốc). Vẫn giữ quỹ cty đúng ko? Anh đang họp kẹt tiền thanh toán đối tác. Chuyển gấp 50 triệu vào STK: 123456789 - TRAN VAN HOANG - Vietcombank. Nhanh lên nhé.' : 'Hi, it\'s Hoang (CEO). Need 50M urgently to pay a partner invoice, I am in a meeting. Transfer to: 123456789 - TRAN VAN HOANG - Vietcombank right now.' }
    ]);
  };

  const handleSend = async () => {
    if (!inputStr.trim() || isTyping) return;
    
    const userMessage = inputStr;
    const newMessages: ChatMessage[] = [...messages, { id: Date.now(), sender: 'user', text: userMessage }];
    setMessages(newMessages);
    setInputStr('');
    setIsTyping(true);

    try {
        const apiMessages = newMessages.map(m => ({
            role: m.sender === 'ai' ? 'model' : 'user',
            text: m.text
        }));

        const response = await fetch('/api/chat', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                messages: apiMessages,
                lang,
                mode: 'simulator'
            })
        });

        if (response.ok) {
            const data = await response.json();
            setMessages(prev => [...prev, { id: Date.now() + 1, sender: 'ai', text: data.text }]);
        } else {
            setMessages(prev => [...prev, { id: Date.now() + 1, sender: 'ai', text: lang === 'vi' ? "Lỗi kết nối. Thử lại sau." : "Connection error." }]);
        }
    } catch (e) {
        setMessages(prev => [...prev, { id: Date.now() + 1, sender: 'ai', text: "Lỗi kết nối API." }]);
    } finally {
        setIsTyping(false);
    }
  };

  const handleTransfer = () => {
    setStatus('failed');
  };

  const handleReport = () => {
    setStatus('success');
  };

  return (
    <div className="space-y-8 animate-in mt-8 fade-in duration-500 pb-16">
      
      <div className="border-l-4 border-purple-500 pl-4 mb-8">
        <h1 className="text-4xl font-black text-white uppercase tracking-wider mb-2 flex items-center gap-3">
          <Target className="text-purple-500" size={36} />
          {lang === 'vi' ? 'BẪY NHẬN THỨC (MÔ PHỎNG)' : 'CONFIDENCE SIMULATOR'}
        </h1>
        <p className="text-gray-400 max-w-2xl">
          {lang === 'vi' 
            ? 'Đo lường thời gian sập bẫy của bạn. Hệ thống sẽ đóng vai kẻ lừa đảo bằng kịch bản AI tạo ra.' 
            : 'Measure your trap time. The system will act as a scammer using an AI-generated scenario.'}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* PANEL TRÁI: THỐNG KÊ & KẾT QUẢ */}
        <div className="lg:col-span-1 space-y-6">
           <div className="bg-black/40 border border-white/10 rounded-2xl p-6 backdrop-blur-xl flex flex-col items-center">
             <Timer size={48} className={status === 'playing' ? 'text-yellow-500 animate-pulse' : 'text-gray-500'} />
             <div className="text-6xl font-mono mt-4 mb-2 font-black text-white">{timer}s</div>
             <p className="text-gray-400 text-sm uppercase tracking-widest text-center">
                {lang === 'vi' ? 'THỜI GIAN NHẬN DIỆN' : 'DETECTION TIME'}
             </p>
           </div>

           {status === 'idle' && (
             <div className="bg-purple-900/20 border border-purple-500/30 rounded-2xl p-6 text-center">
               <h3 className="font-bold text-white mb-2">Sẵn sàng thử thách?</h3>
               <p className="text-sm text-gray-300 mb-6">Bạn sẽ nhận được tin nhắn từ "Sếp". Hãy tỉnh táo quyết định bước tiếp theo.</p>
               <button 
                 onClick={startSimulation}
                 className="w-full bg-purple-600 hover:bg-purple-500 text-white p-4 rounded-xl font-bold uppercase tracking-widest transition-colors flex items-center justify-center gap-2"
               >
                 <Play size={20} />
                 Start Simulation
               </button>
             </div>
           )}

           {status === 'failed' && (
             <div className="bg-red-900/20 border border-red-500/30 rounded-2xl p-6 text-center animate-in zoom-in fade-in">
               <XCircle size={48} className="text-red-500 mx-auto mb-4" />
               <h3 className="text-2xl font-bold text-white mb-2">BẠN ĐÃ MẮC BẪY</h3>
               <p className="text-gray-300 mb-4">Bạn mất <strong className="text-red-400">{timer} giây</strong> để quy hàng trước kịch bản tâm lý.</p>
               <div className="bg-black/50 p-4 rounded-xl text-left border border-white/10 text-sm text-gray-400">
                  ⚠️ <strong>Bài học:</strong> Kẻ lừa đảo tạo ra áp lực <strong className="text-red-400">thời gian</strong> và sự uy quyền (Giám đốc) khiến não bộ bỏ qua bước xác minh.
               </div>
               <button onClick={startSimulation} className="mt-4 text-purple-400 hover:text-white underline underline-offset-4 text-sm font-bold uppercase">Thử lại (Retest)</button>
             </div>
           )}

           {status === 'success' && (
             <div className="bg-green-900/20 border border-green-500/30 rounded-2xl p-6 text-center animate-in zoom-in fade-in">
               <ShieldCheck size={48} className="text-green-500 mx-auto mb-4" />
               <h3 className="text-2xl font-bold text-white mb-2">XÁC MINH THÀNH CÔNG</h3>
               <p className="text-gray-300 mb-4">Bạn chỉ mất <strong className="text-green-400">{timer} giây</strong> để nhận diện ra đây là một kịch bản lừa đảo qua mạng.</p>
               <div className="bg-black/50 p-4 rounded-xl text-left border border-white/10 text-sm text-gray-400">
                  ✅ <strong>Lý do đúng:</strong> Bạn không bị áp lực thời gian (tạo ra bởi đối tượng lừa đảo) khống chế và báo cáo kịp thời thủ đoạn lạ.
               </div>
               <button onClick={startSimulation} className="mt-4 text-purple-400 hover:text-white underline underline-offset-4 text-sm font-bold uppercase">Chơi lại (Replay)</button>
             </div>
           )}
        </div>

        {/* PANEL PHẢI: KHUNG CHAT MÔ PHỎNG */}
        <div className="lg:col-span-2 flex flex-col bg-black/40 border border-white/10 rounded-2xl backdrop-blur-xl h-[600px] overflow-hidden">
          
          <div className="bg-black/80 p-4 border-b border-white/10 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-indigo-500 flex items-center justify-center font-bold text-white">TVH</div>
              <div>
                <h3 className="font-bold text-white">Trần Văn Hoàng (CEO)</h3>
                <p className="text-xs text-green-400">Online</p>
              </div>
            </div>
            {status === 'playing' && (
              <div className="flex gap-2">
                 <button onClick={handleReport} className="bg-green-600/20 hover:bg-green-600 text-green-500 hover:text-white border border-green-500/50 hover:border-green-600 text-xs px-3 py-1.5 rounded uppercase font-bold transition-colors">Báo cáo Scam</button>
              </div>
            )}
          </div>

          <div className="flex-grow p-6 overflow-y-auto space-y-4">
             {messages.map((m) => (
                <div key={m.id} className={`flex ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                  {m.sender === 'ai' && (
                     <div className="w-8 h-8 rounded-full bg-blue-500 text-white flex items-center justify-center font-bold text-xs mr-2 mt-1">TVH</div>
                  )}
                  <div className={`max-w-[75%] p-3 rounded-2xl ${m.sender === 'user' ? 'bg-purple-600 text-white rounded-br-none' : 'bg-gray-800 text-gray-200 rounded-bl-none'}`}>
                     {m.text}
                  </div>
                </div>
             ))}
             {isTyping && (
                <div className="flex justify-start">
                   <div className="bg-gray-800 text-gray-400 text-xs p-2 rounded-2xl">...đang gõ</div>
                </div>
             )}
             <div ref={chatEndRef}></div>
          </div>

          <div className="p-4 bg-black/60 border-t border-white/10">
             {status === 'playing' ? (
                <div className="flex flex-col gap-3">
                  <div className="flex items-center gap-2 relative">
                    <input 
                      type="text" 
                      value={inputStr} 
                      onChange={(e) => setInputStr(e.target.value)} 
                      onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                      disabled={isTyping}
                      placeholder="Trò chuyện hoặc bắt bẻ..." 
                      className="flex-grow bg-[#1a1a1a] border border-white/10 text-white px-4 py-3 rounded-xl focus:outline-none focus:border-purple-500 transition-colors"
                    />
                    <button onClick={handleSend} disabled={isTyping} className="absolute right-4 text-purple-500 hover:text-purple-400 uppercase text-xs font-bold">GỬI</button>
                    {/* Fake typing protection for simulation feel */}
                  </div>
                  
                  {/* Action Buttons to test psychology */}
                  <div className="flex gap-2 justify-end">
                    <button 
                      onClick={handleTransfer}
                      className="bg-red-600 hover:bg-red-500 text-white px-6 py-2 rounded-xl text-sm font-bold uppercase transition-colors"
                    >
                      XÁC NHẬN CHUYỂN
                    </button>
                    <button 
                      onClick={handleReport}
                      className="bg-black border border-white/20 hover:border-green-500 text-gray-300 hover:text-green-500 px-6 py-2 rounded-xl text-sm font-bold uppercase transition-colors"
                    >
                      TỪ CHỐI / BÁO CÁO
                    </button>
                  </div>
                </div>
             ) : (
                <div className="text-center text-gray-500 text-sm p-2 uppercase font-mono tracking-wider">
                  {status === 'idle' ? 'KHUNG CHAT CHƯA KÍCH HOẠT' : 'PHIÊN GIAO DỊCH ĐÃ KẾT THÚC'}
                </div>
             )}
          </div>
          
        </div>

      </div>
    </div>
  );
};

export default Simulator;
