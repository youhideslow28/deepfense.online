
import React, { useState, useRef, useEffect, useCallback } from 'react';
import { MessageSquare, X, Send, Bot, ScanLine, Sparkles, Copy, Check, ExternalLink } from 'lucide-react';
import { Language } from '@/types';
import { logger } from '@/lib/logger';
import { TRANSLATIONS, KNOWLEDGE_BASE, CHECKLIST_DATA, FUN_FACTS, NEWS_DATA, LEVELS, PROJECT_METADATA } from '@/data';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { atomDark } from 'react-syntax-highlighter/dist/esm/styles/prism';

const AiChat: React.FC<{ lang: Language }> = ({ lang }) => {
  const t = TRANSLATIONS[lang];
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{role: 'user' | 'model', text: string}[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [copiedIdx, setCopiedIdx] = useState<number | null>(null);
  const [reactions, setReactions] = useState<Record<number, 'up' | 'down'>>({});
  const [unreadCount, setUnreadCount] = useState(0);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const abortControllerRef = useRef<AbortController | null>(null);
  const isMountedRef = useRef(true);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const STORAGE_KEY = `deepfense_chat_${lang}`;

  // NẠP TOÀN BỘ DỮ LIỆU NỀN TẢNG DEEPFENSE VÀO CONTEXT CỦA AI CHATBOT
  const websiteContextString = React.useMemo(() => {
    const context = {
      platform: {
        name: PROJECT_METADATA?.name || "DEEPFENSE.ONLINE",
        version: PROJECT_METADATA?.version || "3.0.0",
        mission: lang === 'vi' 
          ? "Nền tảng giáo dục phòng chống lừa đảo trực tuyến & nhận diện Deepfake" 
          : "Educational platform for Deepfake prevention and cybersecurity awareness",
        authors: "Hồ Xuân Nguyễn (25NS039) & Nguyễn Nhất Huy (25NS020) - Đại học Công nghệ Thông tin & Truyền thông Việt - Hàn (VKU)",
        contact_email: "deepfense@gmail.com",
        current_route: typeof window !== 'undefined' ? window.location.pathname : '/',
      },
      routes_and_features: {
        home: "/ (Trang chủ: Tin tức thời gian thực, số liệu thống kê lừa đảo, timeline Deepfake 2017-2026)",
        tools: "/tools (Bộ công cụ: Check 12 dấu hiệu Deepfake, cẩm nang phòng thủ, trung tâm khủng hoảng)",
        crisis_hub: "/tools/crisis (Trung tâm ứng cứu khủng hoảng: Tạo đơn tố giác tội phạm gửi Công an, hotline 111 & A05, quy trình 15 phút vàng)",
        family_portal: "/family (Cổng Gia Đình an toàn số)",
        family_young: "/family/young (Chế độ Thiếu niên: Bẫy vote ảnh, nạp thẻ game, dụ chat riêng tư tống tiền, việc làm online lừa đảo)",
        family_old: "/family/old (Chế độ Người lớn 40+: Deepfake video con cháu tai nạn mượn tiền, mạo danh công an/viện kiểm sát, đầu tư tài chính ảo)",
        challenge: "/challenge (Thử thách 10 cấp độ phân biệt video thật vs Deepfake AI)",
        simulator: "/simulator (Giả lập tình huống tấn công lừa đảo công nghệ cao tương tác trực tiếp)",
        academy: "/academy (Học viện đào tạo an toàn số và thi sát hạch cấp chứng chỉ số xác thực tại /verify)",
        ai_roadmap: "/ai (Lộ trình phát triển công nghệ AI phòng thủ 2025-2028)",
        about: "/about (Về chúng tôi, đội ngũ VKU, tiếp nhận phản ánh sự cố lừa đảo)",
      },
      emergency_contacts: {
        police_a05: "069.234.3636 (Cục An ninh mạng & PCTP sử dụng công nghệ cao - Bộ Công An)",
        child_helpline_111: "111 (Tổng đài Quốc gia Bảo vệ Trẻ em - Trực 24/7, miễn phí)",
        ncsc_vncert: "024.3640.4421 - Trang web báo cáo: chongthurac.vn / canhsatso.gov.vn",
        golden_protocol_15m: lang === 'vi'
          ? "1. Ngắt ngay kết nối kẻ gian -> 2. Gọi ngân hàng phong tỏa tài khoản/thẻ khẩn cấp -> 3. Lưu toàn bộ tin nhắn/sao kê làm bằng chứng -> 4. Nộp đơn tố giác tại /tools/crisis cho Công an xã/phường hoặc PA05"
          : "1. Disconnect immediately -> 2. Call bank hotline to freeze accounts/cards -> 3. Save chat logs and bank receipts -> 4. Submit police report at /tools/crisis",
      },
      knowledge_base: KNOWLEDGE_BASE[lang] || [],
      checklist: CHECKLIST_DATA[lang] || [],
      fun_facts: FUN_FACTS[lang] || [],
      recent_news: NEWS_DATA[lang]?.slice(0, 10) || [],
      challenge_levels_guide: LEVELS[lang]?.map(l => ({
        id: l.id,
        title: l.title,
        difficulty: l.difficulty,
        advice: l.advice
      })) || []
    };
    return JSON.stringify(context);
  }, [lang]);

  // Load lịch sử từ localStorage khi mở, fallback về welcome message
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      const parsed = saved ? JSON.parse(saved) : null;
      if (Array.isArray(parsed) && parsed.length > 0) {
        // Làm sạch nếu tin chào đầu tiên còn lưu text train model cũ trong cache
        let hasUpdated = false;
        const cleaned = parsed.map((msg, idx) => {
          if (idx === 0 && msg.role === 'model' && (
            msg.text?.includes('train model') ||
            msg.text?.includes('dataset') ||
            msg.text?.includes('máy quét AI đang khóa') ||
            msg.text?.includes('AI scanner is currently locked')
          )) {
            hasUpdated = true;
            return { ...msg, text: t.agent_welcome };
          }
          return msg;
        });
        if (hasUpdated) {
          try { localStorage.setItem(STORAGE_KEY, JSON.stringify(cleaned)); } catch {}
        }
        setMessages(cleaned);
      } else {
        setMessages([{ role: 'model', text: t.agent_welcome }]);
      }
    } catch {
      setMessages([{ role: 'model', text: t.agent_welcome }]);
    }
  }, [lang, t.agent_welcome]);

  // Lưu lịch sử mỗi khi messages thay đổi
  useEffect(() => {
    if (messages.length > 1) {
      try { localStorage.setItem(STORAGE_KEY, JSON.stringify(messages)); } catch {}
    }
    // Tăng badge khi có tin AI mới + chat đang đóng
    const last = messages[messages.length - 1];
    if (last?.role === 'model' && last.text && !isOpen) {
      setUnreadCount(prev => prev + 1);
    }
  }, [messages, STORAGE_KEY, isOpen]);

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
    // Paragraphs
    p: ({ node, ...props }: any) => <p className="mb-2 last:mb-0 leading-relaxed break-words [overflow-wrap:anywhere]" {...props} />,
    // Lists
    ul: ({ node, ...props }: any) => <ul className="list-disc pl-4 mb-2 space-y-1 break-words [overflow-wrap:anywhere]" {...props} />,
    ol: ({ node, ...props }: any) => <ol className="list-decimal pl-4 mb-2 space-y-1 break-words [overflow-wrap:anywhere]" {...props} />,
    li: ({ node, ...props }: any) => <li className="pl-1 marker:text-primary break-words [overflow-wrap:anywhere]" {...props} />,
    // Inline
    strong: ({ node, ...props }: any) => <strong className="font-bold text-primary break-words" {...props} />,
    em: ({ node, ...props }: any) => <em className="italic text-slate-600 dark:text-slate-300" {...props} />,
    // Headings
    h1: ({ node, ...props }: any) => <h1 className="text-sm font-black text-slate-900 dark:text-white uppercase tracking-wider mb-2 mt-3 border-b border-primary/20 pb-1 break-words" {...props} />,
    h2: ({ node, ...props }: any) => <h2 className="text-xs font-black text-primary uppercase tracking-wider mb-1.5 mt-2 break-words" {...props} />,
    h3: ({ node, ...props }: any) => <h3 className="mb-1 mt-2 text-xs font-bold text-slate-700 dark:text-slate-200 break-words" {...props} />,
    // Links — open in new tab
    a: ({ node, href, children, ...props }: any) => (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-0.5 text-primary underline underline-offset-2 transition-colors hover:text-slate-900 dark:text-blue-200 dark:hover:text-white break-all"
        {...props}
      >
        {children}
        <ExternalLink size={9} className="opacity-70 shrink-0 ml-0.5" />
      </a>
    ),
    // Blockquote — cyberpunk style
    blockquote: ({ node, ...props }: any) => (
      <blockquote
        className="my-2 rounded-r border-l-2 border-primary/50 bg-primary/5 py-1.5 pl-3 pr-2 italic text-slate-600 dark:text-slate-300 break-words"
        {...props}
      />
    ),
    // Horizontal rule
    hr: ({ node, ...props }: any) => <hr className="border-slate-300 dark:border-gray-700 my-2.5" {...props} />,
    // Tables (GFM)
    table: ({ node, ...props }: any) => (
      <div className="overflow-x-auto my-2 rounded max-w-full">
        <table className="text-[10px] w-full border-collapse" {...props} />
      </div>
    ),
    thead: ({ node, ...props }: any) => <thead className="bg-primary/10" {...props} />,
    th: ({ node, ...props }: any) => <th className="border border-slate-300 dark:border-gray-700 px-2 py-1 text-left text-primary font-bold uppercase tracking-wider" {...props} />,
    td: ({ node, ...props }: any) => <td className="border border-slate-300 dark:border-gray-700/60 px-2 py-1 text-slate-600 dark:text-gray-300" {...props} />,
    tr: ({ node, ...props }: any) => <tr className="hover:bg-white/[0.03] transition-colors" {...props} />,
    // Inline code
    code: ({ node, inline, className, children, ...props }: any) => {
      const match = /language-(\w+)/.exec(className || '');
      const language = match ? match[1] : '';
      // Block code — use SyntaxHighlighter
      if (!inline && language) {
        return (
          <div className="my-2 rounded-lg overflow-hidden text-[10px] border border-slate-300 dark:border-gray-700/60 max-w-full">
            <div className="flex items-center justify-between bg-slate-50 dark:bg-gray-900 px-3 py-1.5 border-b border-slate-300 dark:border-gray-700/60">
              <span className="font-mono text-[9px] uppercase tracking-[0.12em] text-primary/70">{language}</span>
              <span className="flex gap-1">
                <span className="w-2 h-2 rounded-full bg-red-500/60" />
                <span className="w-2 h-2 rounded-full bg-yellow-500/60" />
                <span className="w-2 h-2 rounded-full bg-green-500/60" />
              </span>
            </div>
            <SyntaxHighlighter
              style={atomDark}
              language={language}
              PreTag="div"
              customStyle={{ margin: 0, padding: '10px 12px', background: '#0d1117', fontSize: '10px', lineHeight: '1.6', overflowX: 'auto', maxWidth: '100%' }}
              {...props}
            >
              {String(children).replace(/\n$/, '')}
            </SyntaxHighlighter>
          </div>
        );
      }
      // Inline code
      return (
        <code
          className="bg-primary/10 text-primary border border-primary/20 px-1 py-0.5 rounded text-[10px] font-mono break-all"
          {...props}
        >
          {children}
        </code>
      );
    },
  }), []);

  useEffect(() => {
    scrollToBottom();
    if (isOpen) {
      const t1 = setTimeout(scrollToBottom, 60);
      const t2 = setTimeout(scrollToBottom, 320);
      return () => { clearTimeout(t1); clearTimeout(t2); };
    }
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

      logger.error("Chat Error:", clientError);
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
    <div className="ai-chat-shell fixed bottom-4 right-4 md:bottom-6 md:right-6 z-50 flex flex-col items-end pointer-events-none">
      {isOpen && (
        <div
          data-lenis-prevent
          onWheel={(event) => event.stopPropagation()}
          onTouchMove={(event) => event.stopPropagation()}
          className="df-chat-panel pointer-events-auto mb-3 flex h-[520px] w-[min(calc(100vw-24px),420px)] sm:w-[400px] md:w-[420px] md:h-[580px] flex-col overflow-hidden rounded-2xl border border-blue-200/90 bg-white/95 text-slate-900 shadow-[0_20px_50px_rgba(15,50,100,0.22)] ring-1 ring-white/80 animate-in slide-in-from-bottom-10 duration-300 dark:border-primary/30 dark:bg-[#07111f]/95 dark:text-white dark:shadow-[0_0_35px_rgba(0,0,0,0.6)] dark:ring-white/[0.04] md:mb-4"
        >
            <div className="df-chat-header shrink-0 relative flex items-center justify-between overflow-hidden border-b border-blue-100 bg-gradient-to-r from-white via-sky-50 to-blue-50 p-3 dark:border-primary/20 dark:bg-none dark:bg-primary/10 md:p-3.5">
                <div className="flex items-center gap-2 relative z-10">
                    <div className="rounded-full bg-primary p-1 text-white shadow-[0_0_14px_rgba(29,111,232,0.28)] md:p-1.5"><Bot size={16} className="md:w-[18px] md:h-[18px]" /></div>
                    <div>
                        <h3 className="font-mono text-xs font-bold tracking-[0.12em] text-slate-900 dark:text-white md:text-sm">DEEPFENSE AGENT</h3>
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
                      className="font-mono text-[9px] uppercase tracking-[0.12em] text-slate-500 transition-colors hover:text-red-500 dark:text-slate-400 dark:hover:text-red-300"
                    >
                      {lang === 'vi' ? 'Xóa' : 'Clear'}
                    </button>
                  )}
                  <button onClick={() => setIsOpen(false)} className="rounded-full p-1 text-slate-500 transition-colors hover:bg-slate-100 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-white/10 dark:hover:text-white"><X size={18} className="md:w-5 md:h-5" /></button>
                </div>
            </div>

            <div data-lenis-prevent className="df-chat-body custom-scrollbar flex-1 space-y-3.5 overflow-y-auto overscroll-contain bg-slate-50/80 p-3.5 dark:bg-black/40 md:p-4">
                {messages.map((msg, idx) => (
                    <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start items-start gap-2'} group`}>
                        {msg.role === 'model' && (
                          <div className="shrink-0 mt-0.5 w-6 h-6 rounded-full bg-primary/10 border border-primary/25 text-primary flex items-center justify-center">
                            <Bot size={13} />
                          </div>
                        )}
                        <div
                          className={`relative max-w-[85%] rounded-2xl p-3 text-xs shadow-sm md:p-3.5 md:text-sm leading-relaxed ${
                            msg.role === 'user'
                              ? 'df-chat-user-message rounded-tr-xs border border-primary/35 bg-blue-50 text-slate-900 dark:border-primary/50 dark:bg-primary/20 dark:text-white ml-auto'
                              : 'df-chat-agent-message rounded-tl-xs border border-blue-100 bg-white text-slate-700 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200'
                          }`}
                        >
                            {msg.role === 'model' ? (
                                <>
                                  <div className="break-words [overflow-wrap:anywhere]">
                                    <ReactMarkdown components={markdownComponents} remarkPlugins={[remarkGfm]}>{msg.text}</ReactMarkdown>
                                  </div>
                                  {msg.text && (
                                    <div className="mt-2.5 flex items-center justify-between border-t border-slate-100 pt-1.5 dark:border-white/5">
                                      <div className="flex items-center gap-1">
                                        {/* Reactions */}
                                        <button
                                          onClick={() => reactToMessage(idx, 'up')}
                                          className={`text-xs px-1.5 py-0.5 rounded transition-colors ${reactions[idx] === 'up' ? 'bg-emerald-500/20 text-emerald-600 dark:text-emerald-400' : 'text-slate-400 hover:bg-slate-100 hover:text-slate-600 dark:hover:bg-white/10 dark:hover:text-slate-300'}`}
                                          title={lang === 'vi' ? 'Hữu ích' : 'Helpful'}
                                        >👍</button>
                                        <button
                                          onClick={() => reactToMessage(idx, 'down')}
                                          className={`text-xs px-1.5 py-0.5 rounded transition-colors ${reactions[idx] === 'down' ? 'bg-rose-500/20 text-rose-600 dark:text-rose-400' : 'text-slate-400 hover:bg-slate-100 hover:text-slate-600 dark:hover:bg-white/10 dark:hover:text-slate-300'}`}
                                          title={lang === 'vi' ? 'Không hữu ích' : 'Not helpful'}
                                        >👎</button>
                                      </div>
                                      {/* Copy */}
                                      <button
                                        onClick={() => copyMessage(msg.text, idx)}
                                        className="flex items-center gap-1 rounded px-1.5 py-0.5 text-[10px] font-medium text-slate-400 hover:bg-slate-100 hover:text-primary dark:hover:bg-white/10 dark:hover:text-cyan-300 transition-colors"
                                      >
                                        {copiedIdx === idx ? <Check size={10} className="text-emerald-500" /> : <Copy size={10} />}
                                        <span>{copiedIdx === idx ? (lang === 'vi' ? 'Đã sao chép' : 'Copied!') : (lang === 'vi' ? 'Sao chép' : 'Copy')}</span>
                                      </button>
                                    </div>
                                  )}
                                </>
                            ) : (
                                <div className="whitespace-pre-wrap break-words [overflow-wrap:anywhere]">
                                  {msg.text}
                                </div>
                            )}
                        </div>
                    </div>
                ))}
                {loading && (
                    <div className="flex justify-start items-start gap-2">
                        <div className="shrink-0 mt-0.5 w-6 h-6 rounded-full bg-primary/10 border border-primary/25 text-primary flex items-center justify-center">
                            <Bot size={13} />
                        </div>
                        <div className="rounded-2xl rounded-tl-xs border border-primary/25 bg-white p-2.5 shadow-sm dark:border-primary/30 dark:bg-gray-800/80 md:p-3">
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

            <div className="df-chat-footer shrink-0 space-y-2 border-t border-blue-100 bg-white/95 p-2.5 dark:border-slate-800 dark:bg-[#07111f] md:p-3">
                {/* Quick Prompts */}
                <div className="flex gap-1.5 overflow-x-auto pb-1 custom-scrollbar-none">
                  <button
                    type="button"
                    onClick={() => {
                      setInput(lang === 'vi' ? 'Tôi vừa nhận được một tin nhắn lạ yêu cầu chuyển tiền gấp...' : 'I just received an urgent message asking for money...');
                      textareaRef.current?.focus();
                    }}
                    className="shrink-0 rounded-full border border-primary/25 bg-primary/10 px-2.5 py-1 text-[10px] font-semibold text-primary hover:bg-primary/20 transition-colors"
                  >
                    {lang === 'vi' ? '⚡ Phân tích tin nhắn lạ' : '⚡ Analyze suspicious msg'}
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setInput(lang === 'vi' ? 'Kiểm tra giúp tôi đường link này có an toàn không: ' : 'Check if this link is safe: ');
                      textareaRef.current?.focus();
                    }}
                    className="shrink-0 rounded-full border border-slate-200 dark:border-slate-700 bg-slate-100 dark:bg-slate-800/80 px-2.5 py-1 text-[10px] font-semibold text-slate-600 dark:text-slate-300 hover:border-primary/40 transition-colors"
                  >
                    {lang === 'vi' ? '🔗 Kiểm tra link' : '🔗 Check link'}
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setInput(lang === 'vi' ? 'Tôi bị lộ mật khẩu và nghi ngờ bị chiếm tài khoản, phải làm sao?' : 'I leaked my password and suspect account compromise, what should I do?');
                      textareaRef.current?.focus();
                    }}
                    className="shrink-0 rounded-full border border-rose-500/25 bg-rose-500/10 px-2.5 py-1 text-[10px] font-semibold text-rose-500 hover:bg-rose-500/20 transition-colors"
                  >
                    {lang === 'vi' ? '🚨 Cấp cứu sự cố' : '🚨 Emergency help'}
                  </button>
                </div>

                <div className="flex gap-2 items-center">
                    <textarea
                      ref={textareaRef}
                      rows={1}
                      value={input}
                      onChange={handleInputChange}
                      onKeyDown={handleKeyPress}
                      placeholder={t.agent_placeholder}
                      className="df-chat-input flex-1 resize-none rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs leading-normal text-slate-900 outline-none placeholder:text-slate-400 placeholder:truncate focus:border-primary focus:ring-2 focus:ring-primary/10 dark:border-slate-700 dark:bg-black/50 dark:text-white dark:placeholder:text-slate-500 md:py-2.5 md:text-sm"
                      style={{ minHeight: '40px', maxHeight: '96px' }}
                    />
                    <button onClick={handleSend} disabled={loading || !input.trim()} className="h-10 w-10 bg-primary text-white rounded-xl hover:bg-blue-500 disabled:opacity-50 flex items-center justify-center flex-shrink-0 shadow-sm transition-transform active:scale-95"><Send size={16} className="md:w-[18px] md:h-[18px]" /></button>
                </div>
            </div>
        </div>
      )}

      {/* CTA Label */}
      {!isOpen && (
        <div className="pointer-events-auto mb-2 mr-1 md:mb-3 md:mr-2 animate-bounce cursor-pointer" onClick={() => setIsOpen(true)}>
            <div className="bg-secondary text-white font-bold text-[10px] md:text-xs px-3 py-1.5 md:px-4 md:py-2 rounded-xl shadow-[0_0_20px_rgba(255,42,109,0.6)] relative flex items-center gap-2 border border-black/20 dark:border-white/20">
               <Sparkles size={12} className="animate-spin-slow md:w-[14px] md:h-[14px]" />
               {lang === 'vi' ? 'Hỏi trợ lý DEEPFENSE' : 'Ask DEEPFENSE Assistant'}
               <div className="absolute top-full right-4 w-0 h-0 border-l-8 border-r-8 border-t-8 border-l-transparent border-r-transparent border-t-secondary"></div>
            </div>
        </div>
      )}

      <button
        onClick={() => { setIsOpen(!isOpen); setUnreadCount(0); }}
        className="pointer-events-auto bg-primary text-white p-3 md:p-4 rounded-full shadow-[0_0_20px_rgba(0,240,255,0.4)] hover:scale-110 transition-all relative group"
      >
        <span className="absolute inset-0 rounded-full bg-primary opacity-50 animate-ping group-hover:opacity-75"></span>
        <span className="relative">{isOpen ? <X className="w-5 h-5 md:w-6 md:h-6" /> : <MessageSquare className="w-5 h-5 md:w-6 md:h-6" />}</span>
        {/* Notification badge */}
        {unreadCount > 0 && !isOpen && (
          <span className="absolute -top-1 -right-1 min-w-[18px] h-[18px] bg-secondary text-white text-[9px] font-black rounded-full flex items-center justify-center px-1 shadow-[0_0_8px_rgba(255,42,109,0.8)] animate-bounce border border-black/30">
            {unreadCount > 9 ? '9+' : unreadCount}
          </span>
        )}
      </button>
    </div>
  );
};

export default AiChat;
