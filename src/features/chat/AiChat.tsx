
import React, { useState, useRef, useEffect, useCallback } from 'react';
import { MessageSquare, X, Send, Bot, ScanLine, Sparkles, Copy, Check } from 'lucide-react';
import { Language } from '@/types';
import { TRANSLATIONS, KNOWLEDGE_BASE, CHECKLIST_DATA } from '@/data';
import ReactMarkdown from 'react-markdown';

const AiChat: React.FC<{ lang: Language }> = ({ lang }) => {
  const t = TRANSLATIONS[lang];
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{role: 'user' | 'model', text: string}[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [copiedIdx, setCopiedIdx] = useState<number | null>(null);
  const [reactions, setReactions] = useState<Record<number, 'up' | 'down'>>({});
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const abortControllerRef = useRef<AbortController | null>(null);
  const isMountedRef = useRef(true);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const STORAGE_KEY = `deepfense_chat_${lang}`;

  // CHỐNG BÀO MÒN CPU: Tính toán Context 1 lần duy nhất thay vì mỗi lần bấm Gửi
  const websiteContextString = React.useMemo(() => {
      const context = {
          introduction: "DEEPFENSE.ONLINE is a cybersecurity platform protecting users against Deepfakes.",
          features: { scan_tool: "Checklist to detect deepfake signs.", challenge: "10 levels to spot fake videos." },
          database: {
              knowledge_base: KNOWLEDGE_BASE[lang].map((cat) => ({
                  category: cat.category,
                  topics: cat.items.map((i) => i.title)
              })),
              checklist: CHECKLIST_DATA[lang],
          }
      };
      return JSON.stringify(context, null, 2);
  }, [lang]);

  // Load lịch sử từ localStorage khi mở, fallback về welcome message
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      const parsed = saved ? JSON.parse(saved) : null;
      setMessages(parsed?.length ? parsed : [{ role: 'model', text: t.agent_welcome }]);
    } catch {
      setMessages([{ role: 'model', text: t.agent_welcome }]);
    }
  }, [lang]);

  // Lưu lịch sử mỗi khi messages thay đổi
  useEffect(() => {
    if (messages.length > 1) {
      try { localStorage.setItem(STORAGE_KEY, JSON.stringify(messages)); } catch {}
    }
  }, [messages, STORAGE_KEY]);

  const clearHistory = useCallback(() => {
    localStorage.removeItem(STORAGE_KEY);
    setMessages([{ role: 'model', text: t.agent_welcome }]);
  }, [STORAGE_KEY, t.agent_welcome]);

  const copyMessage = useCallback((text: string, idx: number) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopiedIdx(idx);
      setTimeout(() => setCopiedIdx(null), 2000);
    });
  }, []);

  const reactToMessage = useCallback((idx: number, reaction: 'up' | 'down') => {
    setReactions(prev => ({ ...prev, [idx]: prev[idx] === reaction ? undefined as any : reaction }));
  }, []);

  // Auto-resize textarea as content grows
  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInput(e.target.value);
    const el = e.target;
    el.style.height = 'auto';
    el.style.height = Math.min(el.scrollHeight, 96) + 'px'; // max ~4 rows
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // TỐI ƯU HIỆU NĂNG: Đóng băng object components để React không phá hủy chat history mỗi khi gõ phím
  const markdownComponents = React.useMemo<any>(() => ({
      p: ({node, ...props}: {node?: unknown, [key: string]: unknown}) => <p className="mb-2 last:mb-0 leading-relaxed" {...props} />,
      ul: ({node, ...props}: {node?: unknown, [key: string]: unknown}) => <ul className="list-disc pl-4 mb-2 space-y-1" {...props} />,
      li: ({node, ...props}: {node?: unknown, [key: string]: unknown}) => <li className="pl-1 marker:text-primary" {...props} />,
      strong: ({node, ...props}: {node?: unknown, [key: string]: unknown}) => <strong className="font-bold text-primary" {...props} />,
  }), []);

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

    // Dọn dẹp request cũ nếu người dùng spam liên tục
    if (abortControllerRef.current) abortControllerRef.current.abort();
    abortControllerRef.current = new AbortController();

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        signal: abortControllerRef.current.signal,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: newHistory,
          lang,
          context: websiteContextString,
          stream: true,            // ← Kích hoạt chế độ SSE
        })
      });

      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      if (!response.body) throw new Error('No response body');

      // --- STREAMING MODE: Đọc từng token SSE và append vào tin nhắn ---
      const reader = response.body.getReader();
      const decoder = new TextDecoder();

      // Thêm tin nhắn AI trống vào cuối để cập nhật in-place
      setMessages(prev => [...prev, { role: 'model' as const, text: '' }]);
      setLoading(false); // Tắt spinner ngay — text sẽ xuất hiện dần

      let buffer = '';
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split('\n');
        buffer = lines.pop() ?? ''; // Giữ lại dòng chưa kết thúc

        for (const line of lines) {
          if (!line.startsWith('data: ')) continue;
          const raw = line.slice(6).trim();
          if (raw === '[DONE]') break;

          try {
            const chunk = JSON.parse(raw) as { text?: string; error?: string };
            if (chunk.text) {
              // Append token mới vào tin nhắn cuối cùng
              setMessages(prev => {
                const updated = [...prev];
                updated[updated.length - 1] = {
                  ...updated[updated.length - 1],
                  text: updated[updated.length - 1].text + chunk.text,
                };
                return updated;
              });
            }
          } catch {
            // JSON parse lỗi — bỏ qua chunk không hợp lệ
          }
        }
      }

    } catch (clientError: any) {
      if (clientError.name === 'AbortError') return;

      console.error("Chat Error:", clientError);
      const errorMsg = lang === 'vi'
        ? "Hệ thống đang bảo trì, vui lòng thử lại sau."
        : "System maintenance, please try again later.";

      setMessages(prev => [...prev, { role: 'model', text: errorMsg }]);
    } finally {
      if (isMountedRef.current) setLoading(false);
    }
  };

  // Dọn rác khi Component unmount (Đóng Chat)
  useEffect(() => {
      return () => {
          isMountedRef.current = false;
          abortControllerRef.current?.abort();
      };
  }, []);

  const handleKeyPress = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.nativeEvent.isComposing) return;
    // Enter gửi, Shift+Enter xuống dòng
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="fixed bottom-4 right-4 md:bottom-6 md:right-6 z-50 flex flex-col items-end pointer-events-none">
      {isOpen && (
        <div
          data-lenis-prevent
          onWheel={(event) => event.stopPropagation()}
          onTouchMove={(event) => event.stopPropagation()}
          className="pointer-events-auto bg-surface border border-primary/30 rounded-xl shadow-[0_0_30px_rgba(0,0,0,0.5)] w-[280px] h-[380px] md:w-[350px] md:h-[500px] flex flex-col mb-3 md:mb-4 overflow-hidden animate-in slide-in-from-bottom-10 duration-300"
        >
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
                <div className="flex items-center gap-2">
                  {messages.length > 1 && (
                    <button
                      onClick={clearHistory}
                      title={lang === 'vi' ? 'Xóa lịch sử' : 'Clear history'}
                      className="text-gray-600 hover:text-red-400 transition-colors text-[9px] font-mono tracking-wider uppercase"
                    >
                      {lang === 'vi' ? 'Xóa' : 'Clear'}
                    </button>
                  )}
                  <button onClick={() => setIsOpen(false)} className="text-gray-400 hover:text-white"><X size={18} className="md:w-5 md:h-5" /></button>
                </div>
            </div>

            <div data-lenis-prevent className="flex-1 overflow-y-auto overscroll-contain custom-scrollbar p-3 md:p-4 space-y-3 md:space-y-4 bg-black/40">
                {messages.map((msg, idx) => (
                    <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} group`}>
                        <div className={`relative max-w-[85%] rounded-lg p-2.5 md:p-3 text-xs md:text-sm ${msg.role === 'user' ? 'bg-primary/20 border border-primary/50 text-white rounded-tr-none' : 'bg-gray-800/80 border border-gray-700 text-gray-200 rounded-tl-none'}`}>
                            {msg.role === 'model' ? (
                                <>
                                  <ReactMarkdown components={markdownComponents}>{msg.text}</ReactMarkdown>
                                  {msg.text && (
                                    <div className="absolute -bottom-6 right-0 opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1">
                                      {/* Reactions */}
                                      <button
                                        onClick={() => reactToMessage(idx, 'up')}
                                        className={`text-[11px] px-1 py-0.5 rounded transition-all ${reactions[idx] === 'up' ? 'bg-green-500/20 text-green-400' : 'text-gray-600 hover:text-green-400'}`}
                                        title="Hữu ích"
                                      >👍</button>
                                      <button
                                        onClick={() => reactToMessage(idx, 'down')}
                                        className={`text-[11px] px-1 py-0.5 rounded transition-all ${reactions[idx] === 'down' ? 'bg-red-500/20 text-red-400' : 'text-gray-600 hover:text-red-400'}`}
                                        title="Không hữu ích"
                                      >👎</button>
                                      {/* Copy */}
                                      <button
                                        onClick={() => copyMessage(msg.text, idx)}
                                        className="flex items-center gap-1 text-[9px] text-gray-500 hover:text-primary bg-black/60 px-1.5 py-0.5 rounded"
                                      >
                                        {copiedIdx === idx ? <Check size={9} className="text-green-400" /> : <Copy size={9} />}
                                        {copiedIdx === idx ? (lang === 'vi' ? 'Đã sao chép' : 'Copied!') : (lang === 'vi' ? 'Sao chép' : 'Copy')}
                                      </button>
                                    </div>
                                  )}
                                </>
                            ) : (
                                msg.text
                            )}
                        </div>
                    </div>
                ))}
                {loading && (
                    <div className="flex justify-start">
                        <div className="bg-gray-800/80 border border-primary/30 rounded-lg p-2.5 md:p-3 rounded-tl-none">
                            <div className="flex gap-1.5 items-center">
                                <ScanLine size={12} className="text-primary animate-pulse" />
                                <span className="text-[10px] text-primary/80 italic font-mono tracking-wider">
                                    {lang === 'vi' ? 'Đang phân tích...' : 'Analyzing threat...'}
                                </span>
                                <span className="w-1.5 h-1.5 bg-primary rounded-full animate-bounce"></span>
                                <span className="w-1.5 h-1.5 bg-primary rounded-full animate-bounce [animation-delay:75ms]"></span>
                                <span className="w-1.5 h-1.5 bg-primary rounded-full animate-bounce [animation-delay:150ms]"></span>
                            </div>
                        </div>
                    </div>
                )}
                <div ref={messagesEndRef} />
            </div>

            <div className="p-2 md:p-3 bg-surface border-t border-gray-800 space-y-2">
                <div className="flex gap-2 items-end">
                    <textarea
                      ref={textareaRef}
                      rows={1}
                      value={input}
                      onChange={handleInputChange}
                      onKeyDown={handleKeyPress}
                      placeholder={t.agent_placeholder}
                      className="flex-1 bg-black/50 border border-gray-700 rounded px-2 py-1.5 md:px-3 md:py-2 text-xs md:text-sm text-white outline-none focus:border-primary resize-none overflow-hidden leading-relaxed"
                      style={{ minHeight: '34px', maxHeight: '96px' }}
                    />
                    <button onClick={handleSend} disabled={loading || !input.trim()} className="bg-primary text-black p-1.5 md:p-2 rounded hover:bg-white disabled:opacity-50 flex-shrink-0 mb-0.5"><Send size={16} className="md:w-[18px] md:h-[18px]" /></button>
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
