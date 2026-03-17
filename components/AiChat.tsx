
import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send, Bot, ScanLine, Sparkles } from 'lucide-react';
import { Language } from '../types';
import { TRANSLATIONS, LEVELS, KNOWLEDGE_BASE, CHECKLIST_DATA, NEWS_DATA, FUN_FACTS } from '../data';
import ReactMarkdown from 'react-markdown';

const AiChat: React.FC<{ lang: Language }> = ({ lang }) => {
  const t = TRANSLATIONS[lang];
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{role: 'user' | 'model', text: string}[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMessages([{ role: 'model', text: t.agent_welcome }]);
  }, [lang]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen]);

  const handleSend = async () => {
    if (!input.trim() || loading) return;

    const userMsg = input;
    setInput('');
    const newHistory = [...messages, { role: 'user' as const, text: userMsg }];
    setMessages(newHistory);
    setLoading(true);

    // --- BƯỚC 1: CHUẨN BỊ DỮ LIỆU WEBSITE ĐỂ NẠP CHO AI ---
    const websiteContext = {
        introduction: "DEEPFENSE.AI is a cybersecurity platform protecting users against Deepfakes.",
        data_sources: {
            referenced_sources: "APWG, GASA, PhishTank, OpenPhish, URLHaus.",
            community: "ChongLuaDao.vn (500k+ members).",
            technology: "AI Real-time analysis + Community reporting."
        },
        features: {
            scan_tool: "Checklist to detect deepfake signs in video calls.",
            challenge: "A game with 10 levels to spot fake videos.",
            mobile_app: "Upcoming app with 'Deepfense Touch' overlay and real-time scanning."
        },
        database: {
            challenges: LEVELS[lang],
            knowledge_base: KNOWLEDGE_BASE[lang],
            checklist: CHECKLIST_DATA[lang],
            recent_scams: NEWS_DATA[lang]
        }
    };

    const contextString = JSON.stringify(websiteContext, null, 2);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          messages: newHistory,
          lang: lang,
          context: contextString
        })
      });

      if (!response.ok) throw new Error('Network response was not ok');
      
      const data = await response.json();
      const text = data.text;
          
      setMessages(prev => [...prev, { role: 'model', text }]);

    } catch (clientError: any) {
      console.error("Chat Error:", clientError);
      let errorMsg = lang === 'vi' ? "Hệ thống đang bảo trì, vui lòng thử lại sau." : "System maintenance, please try again later.";
      
      if (clientError.message?.includes('403') || clientError.message?.includes('API key')) {
           errorMsg = lang === 'vi' ? "Lỗi kết nối: Vui lòng kiểm tra lại API Key." : "Connection Error: Please check API Key.";
      }

      setMessages(prev => [...prev, { role: 'model', text: errorMsg }]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') handleSend();
  };

  return (
    <div className="fixed bottom-4 right-4 md:bottom-6 md:right-6 z-50 flex flex-col items-end pointer-events-none">
      {isOpen && (
        <div className="pointer-events-auto bg-surface border border-primary/30 rounded-xl shadow-[0_0_30px_rgba(0,0,0,0.5)] w-[280px] h-[380px] md:w-[350px] md:h-[500px] flex flex-col mb-3 md:mb-4 overflow-hidden animate-in slide-in-from-bottom-10 duration-300">
            <div className="bg-primary/10 border-b border-primary/20 p-3 md:p-4 flex justify-between items-center relative overflow-hidden">
                <div className="flex items-center gap-2 relative z-10">
                    <div className="bg-primary text-black p-1 md:p-1.5 rounded-full"><Bot size={16} className="md:w-[18px] md:h-[18px]" /></div>
                    <div>
                        <h3 className="text-white font-bold text-xs md:text-sm font-mono tracking-widest">DEEPFENSE AGENT</h3>
                        <div className="flex items-center gap-1 text-[9px] md:text-[10px] text-success">
                            <span className="w-1.5 h-1.5 bg-success rounded-full animate-pulse"></span> ONLINE
                        </div>
                    </div>
                </div>
                <button onClick={() => setIsOpen(false)} className="text-gray-400 hover:text-white"><X size={18} className="md:w-5 md:h-5" /></button>
            </div>

            <div className="flex-1 overflow-y-auto p-3 md:p-4 space-y-3 md:space-y-4 bg-black/40">
                {messages.map((msg, idx) => (
                    <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                        <div className={`max-w-[85%] rounded-lg p-2.5 md:p-3 text-xs md:text-sm ${msg.role === 'user' ? 'bg-primary/20 border border-primary/50 text-white rounded-tr-none' : 'bg-gray-800/80 border border-gray-700 text-gray-200 rounded-tl-none'}`}>
                            {msg.role === 'model' ? (
                                <ReactMarkdown
                                    components={{
                                        p: ({node, ...props}: any) => <p className="mb-2 last:mb-0 leading-relaxed" {...props} />,
                                        ul: ({node, ...props}: any) => <ul className="list-disc pl-4 mb-2 space-y-1" {...props} />,
                                        li: ({node, ...props}: any) => <li className="pl-1 marker:text-primary" {...props} />,
                                        strong: ({node, ...props}: any) => <strong className="font-bold text-primary" {...props} />,
                                    }}
                                >
                                    {msg.text}
                                </ReactMarkdown>
                            ) : (
                                msg.text
                            )}
                        </div>
                    </div>
                ))}
                {loading && (
                    <div className="flex justify-start">
                        <div className="bg-gray-800/80 border border-gray-700 rounded-lg p-2 md:p-3 rounded-tl-none">
                            <div className="flex gap-1 items-center">
                                <span className="text-[10px] text-gray-400 italic mr-2">Checking databases...</span>
                                <span className="w-1.5 h-1.5 bg-primary rounded-full animate-bounce"></span>
                                <span className="w-1.5 h-1.5 bg-primary rounded-full animate-bounce delay-75"></span>
                                <span className="w-1.5 h-1.5 bg-primary rounded-full animate-bounce delay-150"></span>
                            </div>
                        </div>
                    </div>
                )}
                <div ref={messagesEndRef} />
            </div>

            <div className="p-2 md:p-3 bg-surface border-t border-gray-800">
                <div className="flex gap-2">
                    <input type="text" value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={handleKeyPress} placeholder={t.agent_placeholder} className="flex-1 bg-black/50 border border-gray-700 rounded px-2 py-1.5 md:px-3 md:py-2 text-xs md:text-sm text-white outline-none focus:border-primary" />
                    <button onClick={handleSend} disabled={loading || !input.trim()} className="bg-primary text-black p-1.5 md:p-2 rounded hover:bg-white disabled:opacity-50"><Send size={16} className="md:w-[18px] md:h-[18px]" /></button>
                </div>
            </div>
        </div>
      )}

      {/* CTA Label */}
      {!isOpen && (
        <div className="pointer-events-auto mb-2 mr-1 md:mb-3 md:mr-2 animate-bounce cursor-pointer" onClick={() => setIsOpen(true)}>
            <div className="bg-secondary text-white font-bold text-[10px] md:text-xs px-3 py-1.5 md:px-4 md:py-2 rounded-xl shadow-[0_0_20px_rgba(255,42,109,0.6)] relative flex items-center gap-2 border border-white/20">
               <Sparkles size={12} className="animate-spin-slow md:w-[14px] md:h-[14px]" />
               {lang === 'vi' ? 'Chat với AI Agent' : 'Chat with AI Agent'}
               <div className="absolute top-full right-4 w-0 h-0 border-l-8 border-r-8 border-t-8 border-l-transparent border-r-transparent border-t-secondary"></div>
            </div>
        </div>
      )}

      <button onClick={() => setIsOpen(!isOpen)} className="pointer-events-auto bg-primary text-black p-3 md:p-4 rounded-full shadow-[0_0_20px_rgba(0,240,255,0.4)] hover:scale-110 transition-all relative group">
        <span className="absolute inset-0 rounded-full bg-primary opacity-50 animate-ping group-hover:opacity-75"></span>
        <span className="relative">{isOpen ? <X className="w-5 h-5 md:w-6 md:h-6" /> : <MessageSquare className="w-5 h-5 md:w-6 md:h-6" />}</span>
      </button>
    </div>
  );
};

export default AiChat;
