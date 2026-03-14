
import React, { useState, useEffect } from 'react';
import { PageType, Language, Season } from '../types';
import { NEWS_DATA, FUN_FACTS, TRANSLATIONS } from '../data';
import { Activity, Play, AlertTriangle, Lightbulb, PhoneCall, Cpu, ShieldCheck, Gift, Scan, XOctagon, CheckCircle2, User, Search, Smartphone, Siren, Globe, Database, Server, ExternalLink } from 'lucide-react';
import AnalyticsChart from '../components/AnalyticsChart';
import { db } from '../firebase';
import { collection, onSnapshot, query, where } from 'firebase/firestore';

interface HomeProps {
  setPage: (page: PageType) => void;
  setToolTab: (tab: 'SCAN' | 'KNOWLEDGE') => void;
  lang: Language;
  season: Season;
}

const Home: React.FC<HomeProps> = ({ setPage, setToolTab, lang, season }) => {
  const t = TRANSLATIONS[lang];
  const facts = FUN_FACTS[lang];
  
  // --- SUMMER MINIGAME STATE ---
  const [gamePhase, setGamePhase] = useState<'INTRO' | 'SCANNING' | 'RESULT_WIN' | 'RESULT_LOSE'>('INTRO');
  const [cluesFound, setCluesFound] = useState<string[]>([]);
  const [scanProgress, setScanProgress] = useState(0);
  const [protectedUsers, setProtectedUsers] = useState(0); // Đổi tên biến cho rõ nghĩa
  const [totalAttempts, setTotalAttempts] = useState(0);   // Biến mới: Tổng số lượt chơi
  
  const [factIndex, setFactIndex] = useState(0);
  const [liveNews, setLiveNews] = useState<any[]>(NEWS_DATA[lang]); // State lưu tin tức realtime
  const [displayedNews, setDisplayedNews] = useState<any[]>([]);
  const [flippingIndex, setFlippingIndex] = useState<number | null>(null);

  // --- FETCH REAL-TIME NEWS (TỰ ĐỘNG HÓA) ---
  useEffect(() => {
    setLiveNews(NEWS_DATA[lang]); // Reset về tin mặc định khi đổi ngôn ngữ
    setDisplayedNews(Array.from({ length: 6 }).map((_, i) => NEWS_DATA[lang][i % NEWS_DATA[lang].length]));

    const fetchLiveNews = async () => {
      try {
        // Tìm kiếm trên Google News theo ngôn ngữ
        const query = lang === 'vi' ? 'deepfake lừa đảo' : 'deepfake scam';
        const langCode = lang === 'vi' ? 'vi' : 'en-US';
        const gl = lang === 'vi' ? 'VN' : 'US';
        
        // Dùng rss2json API (miễn phí) để chuyển RSS thành JSON và vượt qua CORS
        const rssUrl = `https://news.google.com/rss/search?q=${encodeURIComponent(query)}&hl=${langCode}&gl=${gl}&ceid=${gl}:${langCode}`;
        const apiUrl = `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(rssUrl)}`;
        
        const response = await fetch(apiUrl);
        const data = await response.json();
        
        if (data.status === 'ok' && data.items && data.items.length > 0) {
          const formattedNews = data.items.map((item: any) => {
            const pubDate = new Date(item.pubDate);
            const dateStr = `${pubDate.getDate()}/${pubDate.getMonth() + 1}/${pubDate.getFullYear()}`;
            const cleanDesc = item.description.replace(/<[^>]*>?/gm, '').substring(0, 110) + '...'; // Lọc bỏ HTML

            return {
              tag: lang === 'vi' ? "TIN MỚI (LIVE)" : "LATEST",
              title: item.title.split(' - ')[0], // Cắt bỏ tên tòa soạn ở đuôi
              date: dateStr,
              loss: lang === 'vi' ? "Chưa xác định" : "TBD",
              desc: cleanDesc,
              url: item.link
            };
          });
          setLiveNews(formattedNews); // Cập nhật tin thực tế vào hệ thống
          setDisplayedNews(Array.from({ length: 6 }).map((_, i) => formattedNews[i % formattedNews.length]));
        }
      } catch (error) {
        console.error("Lỗi lấy tin tức tự động, sử dụng dữ liệu dự phòng.", error);
      }
    };

    fetchLiveNews();
  }, [lang]);

  // --- FIREBASE: LẮNG NGHE SỐ LƯỢNG NGƯỜI THAM GIA (REAL-TIME) ---
  useEffect(() => {
    // Chỉ tính là "Đã được bảo vệ" nếu đạt điểm >= 9 (trên 85% của 10 câu)
    const qProtected = query(collection(db, "game_results"), where("score", ">=", 9));
    const unsubscribeProtected = onSnapshot(qProtected, (snapshot) => {
        setProtectedUsers(snapshot.size);
    });

    // Tính tổng số lượt tham gia (kể cả chưa đạt)
    const qTotal = collection(db, "game_results");
    const unsubscribeTotal = onSnapshot(qTotal, (snapshot) => {
        setTotalAttempts(snapshot.size);
    });

    return () => {
        unsubscribeProtected();
        unsubscribeTotal();
    };
  }, []);

  // --- AUTO TICKER EFFECT CẢNH BÁO & KIẾN THỨC ---
  useEffect(() => {
    const newsTimer = setInterval(() => {
        if (liveNews.length <= 1) return;
        const slotToUpdate = Math.floor(Math.random() * 6);
        const nextNewsIndex = Math.floor(Math.random() * liveNews.length);
        
        setFlippingIndex(slotToUpdate);
        
        setTimeout(() => {
            setDisplayedNews(prev => {
                const newDisplay = [...prev];
                newDisplay[slotToUpdate] = liveNews[nextNewsIndex];
                return newDisplay;
            });
        }, 300); // Đổi data giữa lúc lật thẻ (300ms)
        
        setTimeout(() => {
            setFlippingIndex(null); // Kết thúc hiệu ứng lật
        }, 600);
    }, 4000); // Cứ 4s lật 1 thẻ ngẫu nhiên

    const factTimer = setInterval(() => setFactIndex(prev => (prev + 1) % facts.length), 6000); // 6s đổi 1 kiến thức
    
    return () => {
      clearInterval(newsTimer);
      clearInterval(factTimer);
    };
  }, [liveNews, facts.length]);

  // Reset game
  const resetGame = () => {
    setGamePhase('INTRO');
    setCluesFound([]);
    setScanProgress(0);
  };

  // Logic khi hover/touch vào điểm nghi vấn
  const handleInteractClue = (clueType: string) => {
    if (gamePhase !== 'SCANNING') return;
    
    if (!cluesFound.includes(clueType)) {
        const newClues = [...cluesFound, clueType];
        setCluesFound(newClues);
        setScanProgress((newClues.length / 3) * 100);
    }
  };

  const handleDecision = (choice: 'TRANSFER' | 'VERIFY') => {
      if (choice === 'VERIFY') setGamePhase('RESULT_WIN');
      else setGamePhase('RESULT_LOSE');
  };

  // Dữ liệu Kiến thức 1 items/lượt
  const currentFact = facts[factIndex % facts.length];

  return (
    <div className="animate-in fade-in duration-500">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-16 items-center">
        <div className="lg:col-span-7 text-center lg:text-left">
          <h1 className="text-4xl md:text-6xl font-black text-white leading-tight mb-4 italic uppercase">
            {lang === 'vi' ? 'NỀN TẢNG ' : 'THE '}
            <span className="text-primary block md:inline">{lang === 'vi' ? 'PHÒNG CHỐNG DEEPFAKE' : 'DEEPFAKE DEFENSE'}</span>
          </h1>
          {/* LIVE COUNTER BADGE */}
          <div className="flex flex-wrap gap-3 mb-6">
            {protectedUsers > 0 && (
                <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/30 text-primary px-4 py-1.5 rounded-full text-xs font-bold animate-pulse">
                <ShieldCheck size={14} /> {protectedUsers} {lang === 'vi' ? 'NGƯỜI DÙNG ĐÃ ĐƯỢC BẢO VỆ' : 'USERS PROTECTED'}
                </div>
            )}
            {totalAttempts > 0 && (
                <div className="inline-flex items-center gap-2 bg-secondary/10 border border-secondary/30 text-secondary px-4 py-1.5 rounded-full text-xs font-bold">
                <Scan size={14} /> {totalAttempts} {lang === 'vi' ? 'LƯỢT KIỂM TRA RỦI RO' : 'RISK SCANS COMPLETED'}
                </div>
            )}
          </div>

          <p className="text-base md:text-lg text-gray-400 mb-8 max-w-lg mx-auto lg:mx-0 leading-relaxed border-l-0 lg:border-l-2 border-primary lg:pl-4">{t.hero_desc}</p>
          <div className="flex flex-col sm:flex-row flex-wrap gap-3 justify-center lg:justify-start">
            <button onClick={() => { setPage('TOOLS'); setToolTab('SCAN'); }} className="bg-primary text-black hover:bg-white px-8 py-4 rounded-xl font-bold text-xs transition-all flex items-center justify-center gap-2 uppercase tracking-widest shadow-lg shadow-primary/20">
              <Activity size={16} /> {t.btn_scan}
            </button>
            <button onClick={() => setPage('AI_PROJECT')} className="bg-purple-600 text-white hover:bg-purple-500 px-8 py-4 rounded-xl font-bold text-xs transition-all flex items-center justify-center gap-2 uppercase tracking-widest shadow-lg shadow-purple-500/20">
              <Cpu size={16} /> {t.btn_ai}
            </button>
            <button onClick={() => setPage('CHALLENGE')} className="bg-black border border-secondary text-secondary hover:bg-secondary hover:text-white px-8 py-4 rounded-xl font-bold text-xs transition-all flex items-center justify-center gap-2 uppercase tracking-widest">
              <Play size={16} /> {t.btn_challenge}
            </button>
          </div>
        </div>
        <div className="lg:col-span-5 h-[300px] md:h-[380px] w-full"><AnalyticsChart lang={lang} /></div>
      </div>

      {/* --- PARTNERS TICKER (NEW) --- */}
      <div className="mb-16 overflow-hidden relative group">
          <div className="text-center mb-4 text-[10px] text-gray-500 uppercase tracking-[0.3em] font-mono">{t.partners_title}</div>
          <div className="flex justify-center flex-wrap gap-6 opacity-60 group-hover:opacity-100 transition-opacity duration-500">
             <div className="flex items-center gap-2 border border-white/10 px-4 py-2 rounded-full bg-white/5">
                 <Database size={14} className="text-blue-400"/>
                 <span className="text-xs font-bold text-gray-300">PHISHTANK</span>
             </div>
             <div className="flex items-center gap-2 border border-white/10 px-4 py-2 rounded-full bg-white/5">
                 <Globe size={14} className="text-green-400"/>
                 <span className="text-xs font-bold text-gray-300">APWG</span>
             </div>
             <div className="flex items-center gap-2 border border-white/10 px-4 py-2 rounded-full bg-white/5">
                 <ShieldCheck size={14} className="text-primary"/>
                 <span className="text-xs font-bold text-gray-300">CHONGLUADAO.VN</span>
             </div>
             <div className="flex items-center gap-2 border border-white/10 px-4 py-2 rounded-full bg-white/5">
                 <Server size={14} className="text-yellow-400"/>
                 <span className="text-xs font-bold text-gray-300">OPENPHISH</span>
             </div>
          </div>
      </div>

      {/* --- INTERACTIVE SUMMER MINIGAME --- */}
      {season === 'SUMMER' && (
        <div className="mb-20 relative group animate-in slide-in-from-bottom-8 duration-700">
             <div className="absolute inset-0 bg-gradient-to-r from-orange-900/40 to-red-900/40 rounded-3xl blur-xl opacity-75 group-hover:opacity-100 transition-opacity"></div>
             <div className="bg-black/80 border border-orange-500/30 rounded-3xl p-6 md:p-8 relative overflow-hidden flex flex-col lg:flex-row gap-8 shadow-[0_0_50px_rgba(249,115,22,0.15)]">
                
                {/* Left Side: Game Info */}
                <div className="lg:w-1/3 flex flex-col justify-center z-10 text-center lg:text-left">
                    <div className="inline-flex items-center gap-2 bg-red-600 text-white w-fit px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest mb-3 animate-pulse mx-auto lg:mx-0">
                        <Gift size={12}/> {lang === 'vi' ? 'MINIGAME MÙA HÈ' : 'SUMMER MINIGAME'}
                    </div>
                    <h2 className="text-2xl md:text-3xl font-black text-orange-500 uppercase italic mb-2 tracking-tighter">
                        {lang === 'vi' ? 'THÁM TỬ CYBER: VÉ DU LỊCH ẢO' : 'CYBER DETECTIVE: FAKE TICKETS'}
                    </h2>
                    <p className="text-gray-300 italic text-sm mb-6 leading-relaxed">
                        {lang === 'vi' 
                            ? 'Có một cuộc gọi Video mời mua combo du lịch hè giá siêu rẻ. Hãy dùng "Kính lúp AI" để soi ra các điểm bất thường trên khuôn mặt người gọi!' 
                            : 'Incoming Video Call offering super cheap summer travel combo. Use "AI Magnifier" to spot facial anomalies!'}
                    </p>
                    
                    {gamePhase === 'SCANNING' && (
                        <div className="bg-gray-900/80 p-4 rounded-xl border border-white/10">
                            <div className="text-[10px] text-gray-400 uppercase mb-2 flex justify-between">
                                <span>{lang === 'vi' ? 'TIẾN ĐỘ SOI LỖI' : 'SCAN PROGRESS'}</span>
                                <span className="text-primary">{cluesFound.length}/3 {lang === 'vi' ? 'LỖI' : 'ERRORS'}</span>
                            </div>
                            <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                                <div className="h-full bg-primary transition-all duration-300" style={{width: `${scanProgress}%`}}></div>
                            </div>
                            <div className="mt-3 text-xs text-primary font-mono italic space-y-1 text-left">
                                {cluesFound.length === 0 && (lang === 'vi' ? "> Gợi ý: Chạm vào Mắt, Miệng và Bóng mũi..." : "> Hint: Tap on Eyes, Mouth and Nose Shadows...")}
                                {cluesFound.includes('EYES') && <div>{lang === 'vi' ? "> Đã phát hiện: Mắt không chớp!" : "> Detected: No blinking!"}</div>}
                                {cluesFound.includes('MOUTH') && <div>{lang === 'vi' ? "> Đã phát hiện: Miệng lệch tiếng!" : "> Detected: Lip sync error!"}</div>}
                                {cluesFound.includes('NOSE') && <div>{lang === 'vi' ? "> Đã phát hiện: Bóng mũi bất thường!" : "> Detected: Unnatural nose shadow!"}</div>}
                            </div>
                        </div>
                    )}
                </div>

                {/* Right Side: Interactive Game Area */}
                <div className="lg:w-2/3 relative bg-black rounded-2xl border-2 border-gray-800 overflow-hidden min-h-[350px] md:min-h-[400px] flex items-center justify-center">
                    
                    {/* PHASE 1: INTRO */}
                    {gamePhase === 'INTRO' && (
                        <div className="text-center p-6 animate-in zoom-in">
                            <div className="w-20 h-20 bg-orange-500/20 rounded-full flex items-center justify-center mx-auto mb-4 animate-bounce">
                                <Smartphone size={40} className="text-orange-500" />
                            </div>
                            <h3 className="text-white font-bold text-xl uppercase mb-2">{lang === 'vi' ? 'CUỘC GỌI TỪ "ĐẠI LÝ DU LỊCH"' : 'CALL FROM "TRAVEL AGENT"'}</h3>
                            <p className="text-gray-500 text-sm mb-6 max-w-xs mx-auto">"{lang === 'vi' ? 'Chào chị, bên em đang xả kho vé đi Phú Quốc chỉ 999k, chị chuyển khoản cọc giữ chỗ luôn nhé!' : 'Hi, we have clearance tickets to Phu Quoc for only $40, please wire the deposit now!'}"</p>
                            <button onClick={() => setGamePhase('SCANNING')} className="bg-primary text-black px-8 py-3 rounded-xl font-black uppercase text-xs tracking-widest hover:scale-105 transition-transform flex items-center gap-2 mx-auto shadow-[0_0_20px_rgba(0,240,255,0.4)]">
                                <Search size={16}/> {lang === 'vi' ? 'BẮT ĐẦU SOI' : 'START SCANNING'}
                            </button>
                        </div>
                    )}

                    {/* PHASE 2: SCANNING INTERFACE */}
                    {gamePhase === 'SCANNING' && (
                        <div className="relative w-full h-full bg-gray-900 flex flex-col min-h-[400px]">
                            {/* Fake Video Header */}
                            <div className="absolute top-0 w-full bg-gradient-to-b from-black/80 to-transparent p-4 flex justify-between items-start z-20">
                                <div className="flex items-center gap-2">
                                    <div className="w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center border border-white"><User size={16} className="text-white"/></div>
                                    <div className="text-white text-xs font-bold drop-shadow-md">ĐẠI LÝ VÉ TÀU XE</div>
                                </div>
                                <div className="bg-red-600/90 text-white text-[10px] px-2 py-0.5 rounded animate-pulse font-bold">LIVE</div>
                            </div>

                            {/* FAKE DEEPFAKE VIDEO SIMULATION */}
                            <div className="relative flex-1 flex items-center justify-center bg-[#1a1a1a] overflow-hidden cursor-crosshair">
                                {/* Abstract Background (Static now) */}
                                <div 
                                    className="absolute inset-0 opacity-20 pointer-events-none"
                                    style={{
                                        backgroundImage: 'linear-gradient(#333 1px, transparent 1px), linear-gradient(90deg, #333 1px, transparent 1px)',
                                        backgroundSize: '40px 40px',
                                        transform: 'perspective(500px) rotateX(5deg)'
                                    }}
                                ></div>

                                {/* Face Representation (Abstract) */}
                                <div className="relative w-48 h-64 bg-gray-800 rounded-3xl flex flex-col items-center pt-8 border border-gray-700 shadow-2xl z-10">
                                    {/* Eyes - Clue 1: No Blink */}
                                    <div 
                                        className="flex gap-4 mb-2 pointer-events-auto p-4 hover:bg-white/5 active:bg-white/10 rounded-lg transition-colors cursor-pointer"
                                        onClick={() => handleInteractClue('EYES')}
                                        onMouseEnter={() => handleInteractClue('EYES')}
                                    >
                                        <div className="w-8 h-3 bg-white/80 rounded-full shadow-[0_0_10px_white]"></div>
                                        <div className="w-8 h-3 bg-white/80 rounded-full shadow-[0_0_10px_white]"></div>
                                        {cluesFound.includes('EYES') && (
                                             <div className="absolute top-4 left-1/2 -translate-x-1/2 bg-red-500 text-white text-[9px] px-2 py-1 font-bold whitespace-nowrap z-50">⚠ UNNATURAL BLINK</div>
                                        )}
                                    </div>
                                    
                                    {/* Nose - Clue 3: Shadow Mismatch (NEW) */}
                                    <div 
                                        className="w-10 h-12 mt-1 pointer-events-auto hover:bg-white/5 active:bg-white/10 rounded-lg transition-colors relative flex justify-center group cursor-pointer"
                                        onClick={() => handleInteractClue('NOSE')}
                                        onMouseEnter={() => handleInteractClue('NOSE')}
                                    >
                                        {/* Nose Shape */}
                                        <div className="w-3 h-full bg-gray-600/50 rounded-full blur-[1px]"></div>
                                        {/* Weird Shadow (The Clue: Skewed & Wrong Direction) */}
                                        <div className="absolute right-0 top-3 w-4 h-6 bg-black/80 blur-md skew-x-12 opacity-80"></div>

                                        {cluesFound.includes('NOSE') && (
                                                <div className="absolute top-8 left-1/2 -translate-x-1/2 bg-red-500 text-white text-[9px] px-2 py-1 font-bold whitespace-nowrap z-50">⚠ BAD SHADOW</div>
                                        )}
                                    </div>

                                    {/* Mouth - Clue 2: Lip Sync */}
                                    <div 
                                        className="w-16 h-8 bg-red-400/50 rounded-full mt-4 pointer-events-auto hover:scale-110 active:scale-95 transition-transform cursor-pointer"
                                        onClick={() => handleInteractClue('MOUTH')}
                                        onMouseEnter={() => handleInteractClue('MOUTH')}
                                    >
                                        <div className="w-full h-full animate-[pulse_0.2s_ease-in-out_infinite] bg-red-500/50 rounded-full"></div>
                                        {cluesFound.includes('MOUTH') && (
                                             <div className="absolute bottom-20 left-1/2 -translate-x-1/2 bg-red-500 text-white text-[9px] px-2 py-1 font-bold whitespace-nowrap z-50">⚠ LIP SYNC ERROR</div>
                                        )}
                                    </div>
                                </div>

                                {/* Scanlines Effect */}
                                <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] z-20 bg-[length:100%_2px,3px_100%]"></div>
                            </div>

                            {/* Controls */}
                            <div className="p-4 bg-black/90 border-t border-gray-800 flex flex-col sm:flex-row justify-center gap-3 z-20">
                                <button onClick={() => handleDecision('TRANSFER')} className="bg-red-600 hover:bg-red-700 active:scale-95 text-white px-4 py-3 rounded-lg text-xs font-bold uppercase tracking-wide w-full sm:w-auto transition-transform">
                                    {lang === 'vi' ? '💸 CHUYỂN TIỀN CỌC' : '💸 SEND DEPOSIT'}
                                </button>
                                <button onClick={() => handleDecision('VERIFY')} className="bg-green-600 hover:bg-green-700 active:scale-95 text-white px-4 py-3 rounded-lg text-xs font-bold uppercase tracking-wide shadow-[0_0_15px_rgba(22,163,74,0.5)] w-full sm:w-auto transition-transform">
                                    {lang === 'vi' ? '🛡️ CÚP MÁY CHẠY NGAY' : '🛡️ HANG UP NOW'}
                                </button>
                            </div>
                        </div>
                    )}

                    {/* PHASE 3: RESULT WIN */}
                    {gamePhase === 'RESULT_WIN' && (
                        <div className="text-center p-8 animate-in zoom-in bg-success/10 w-full h-full flex flex-col items-center justify-center">
                            <CheckCircle2 size={64} className="text-success mb-4" />
                            <h3 className="text-success font-black text-2xl uppercase italic mb-2">{lang === 'vi' ? 'RẤT TỈNH TÁO!' : 'STAY SHARP!'}</h3>
                            <p className="text-white font-bold text-sm mb-6 max-w-md">
                                {lang === 'vi' 
                                    ? 'Bạn đã giữ an toàn cho chuyến đi hè của mình! Kẻ gian dùng AI giả mạo đại lý nhưng không qua mắt được bạn.'
                                    : 'You saved your summer vacation! The scammer used AI but couldn\'t fool you.'}
                            </p>
                            <div className="bg-black/40 p-3 rounded-lg border border-success/30 mb-6">
                                <div className="text-[10px] text-gray-400 uppercase tracking-widest mb-1">{lang === 'vi' ? 'ĐIỂM THÁM TỬ' : 'DETECTIVE SCORE'}</div>
                                <div className="text-3xl font-black text-white">{cluesFound.length * 33 + 1}%</div>
                            </div>
                            <button onClick={resetGame} className="text-gray-400 hover:text-white underline text-xs p-2">{lang === 'vi' ? 'Chơi lại' : 'Play Again'}</button>
                        </div>
                    )}

                    {/* PHASE 4: RESULT LOSE */}
                    {gamePhase === 'RESULT_LOSE' && (
                        <div className="text-center p-8 animate-in zoom-in bg-red-900/20 w-full h-full flex flex-col items-center justify-center">
                            <Siren size={64} className="text-red-500 mb-4 animate-pulse" />
                            <h3 className="text-red-500 font-black text-2xl uppercase italic mb-2">{lang === 'vi' ? 'MẤT TIỀN OAN RỒI!' : 'MONEY LOST!'}</h3>
                            <p className="text-gray-300 text-sm mb-6 max-w-md">
                                {lang === 'vi' 
                                    ? 'Đó là Deepfake! Bạn đã vội vàng chuyển tiền mà không kiểm tra kỹ các dấu hiệu mắt và giọng nói.'
                                    : 'That was a Deepfake! You transferred money without checking eye and voice signs.'}
                            </p>
                            <button onClick={resetGame} className="bg-white text-black px-6 py-3 rounded-lg font-bold uppercase text-xs hover:bg-gray-200">{lang === 'vi' ? 'Thử lại ngay' : 'Try Again'}</button>
                        </div>
                    )}
                </div>
             </div>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-16">
        <div className="lg:col-span-8 bg-surface border border-white/5 rounded-3xl overflow-hidden flex flex-col shadow-2xl">
             <div className="p-6 border-b border-white/5 flex items-center justify-between bg-black/40">
                <div className="flex items-center gap-3">
                    <div className="bg-secondary/20 p-2 rounded-lg"><AlertTriangle className="text-secondary" size={20} /></div>
                    <div>
                      <h2 className="text-white font-black text-sm tracking-widest uppercase italic leading-none">{t.warning_center}</h2>
                      <p className="text-[9px] text-gray-500 font-mono uppercase tracking-tighter mt-1 flex items-center gap-2">
                          <span className="w-1.5 h-1.5 bg-red-500 rounded-full animate-pulse"></span>
                          LIVE_NETWORK_THREATS_MONITOR
                      </p>
                    </div>
                </div>
             </div>
             <div className="grid grid-cols-1 md:grid-cols-2">
                {displayedNews.map((news, index) => {
                  if (!news) return null;
                  return (
                    <a href={news.url} target="_blank" rel="noopener noreferrer" key={index} className={`p-6 border-b border-r border-white/5 relative flex flex-col hover:bg-white/5 group/news cursor-pointer transition-all duration-300 transform origin-center min-h-[140px] ${flippingIndex === index ? 'scale-x-0 opacity-0' : 'scale-x-100 opacity-100'}`}>
                        <div className="flex items-center justify-between mb-3">
                            <span className="bg-secondary/10 text-secondary text-[8px] font-black px-2 py-0.5 rounded tracking-widest border border-secondary/20 uppercase flex items-center gap-1"><span className="w-1.5 h-1.5 bg-secondary rounded-full animate-pulse"></span>{news.tag}</span>
                            <span className="text-[9px] text-gray-500 font-mono italic">{news.date}</span>
                        </div>
                        <h3 className="text-md font-bold text-white mb-2 leading-tight group-hover/news:text-secondary transition-colors line-clamp-2">{news.title}</h3>
                        <p className="text-[11px] text-gray-400 line-clamp-2 italic leading-relaxed mb-4">{news.desc}</p>
                        <div className="mt-auto flex items-center justify-between">
                          <div className="text-[10px] text-secondary font-black uppercase tracking-tight">{lang === 'vi' ? 'THIỆT HẠI' : 'LOSS'}: {news.loss}</div>
                          <ExternalLink size={12} className="text-gray-600 group-hover/news:text-white transition-colors" />
                        </div>
                    </a>
                  )
                })}
             </div>
        </div>
        <div className="lg:col-span-4 flex flex-col gap-6">
             <div className="bg-secondary/5 border border-secondary/20 rounded-3xl p-6 shadow-xl relative overflow-hidden group">
                 <h4 className="text-secondary font-black text-[10px] mb-6 uppercase tracking-widest border-b border-secondary/10 pb-3 flex items-center gap-2">
                    <PhoneCall size={14} /> {t.hotline}
                 </h4>
                 <div className="space-y-4">
                    <div className="flex justify-between items-center bg-black/60 p-4 rounded-2xl border border-white/5 hover:border-secondary/30 transition-colors">
                        <span className="text-[10px] text-gray-400 font-bold uppercase">{t.police}</span>
                        <span className="text-secondary font-black text-2xl tracking-tighter">113</span>
                    </div>
                    <div className="flex justify-between items-center bg-black/60 p-4 rounded-2xl border border-white/5 hover:border-secondary/30 transition-colors">
                        <span className="text-[10px] text-gray-400 font-bold uppercase">{t.cyber_security}</span>
                        <span className="text-secondary font-black text-md tracking-tighter">069.219.4053</span>
                    </div>
                 </div>
             </div>
             <div className="bg-primary/5 border border-primary/20 rounded-3xl p-6 flex-1 shadow-xl relative overflow-hidden flex flex-col">
                 <h4 className="text-primary font-black text-[10px] mb-4 uppercase tracking-widest border-b border-primary/10 pb-3 flex items-center justify-between shrink-0">
                    <span className="flex items-center gap-2"><Lightbulb size={14} /> {t.knowledge}</span>
                    <span className="text-[8px] bg-primary/10 text-primary px-2 py-0.5 rounded-full animate-pulse">AUTO-REFRESH</span>
                 </h4>
                 <div key={`fact-ticker-${factIndex}`} className="animate-in fade-in slide-in-from-right-4 duration-500 flex-1 flex flex-col justify-center">
                    <div className="text-[13px] text-gray-400 flex flex-col gap-4 bg-black/40 p-6 rounded-2xl border border-white/5 shadow-inner">
                        <div className="flex items-center gap-4">
                            <div className="bg-primary/20 h-12 w-12 rounded-xl flex items-center justify-center shrink-0">
                                <ShieldCheck size={24} className="text-primary" />
                            </div>
                            <strong className="text-gray-200 uppercase tracking-widest text-sm leading-tight">{currentFact?.title}</strong>
                        </div>
                        <p className="leading-relaxed italic text-[12px]">{currentFact?.content}</p>
                    </div>
                 </div>
             </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
