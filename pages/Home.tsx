import React, { useState, useEffect } from 'react';
import { Language, Season } from '../types';
import { useNavigate } from 'react-router-dom';
import { NEWS_DATA, FUN_FACTS, TRANSLATIONS } from '../data';
import { Activity, Play, AlertTriangle, Lightbulb, PhoneCall, Cpu, ShieldCheck, Scan, ExternalLink } from 'lucide-react';
import AnalyticsChart from '../components/AnalyticsChart';
import { db } from '../firebase';
import { collection, getCountFromServer, query, where } from 'firebase/firestore';
import DeepfakeRunner from '../components/DeepfakeRunner';

interface HomeProps {
  lang: Language;
  season: Season;
}

const Home: React.FC<HomeProps> = ({ lang, season }) => {
  const t = TRANSLATIONS[lang];
  const facts = FUN_FACTS[lang];
  const navigate = useNavigate();
  
  const [protectedUsers, setProtectedUsers] = useState(0); // Đổi tên biến cho rõ nghĩa
  const [totalAttempts, setTotalAttempts] = useState(0);   // Biến mới: Tổng số lượt chơi
  
  const [factIndex, setFactIndex] = useState(0);
  const [showMiniGame, setShowMiniGame] = useState(false);
  const [liveNews, setLiveNews] = useState<any[]>(NEWS_DATA[lang]); // State lưu tin tức realtime
  const [displayedNews, setDisplayedNews] = useState<any[]>([]);
  const [flippingIndex, setFlippingIndex] = useState<number | null>(null);

  // --- FETCH REAL-TIME NEWS (TỰ ĐỘNG HÓA) ---
  useEffect(() => {
    setLiveNews(NEWS_DATA[lang]); // Reset về tin mặc định khi đổi ngôn ngữ
    setDisplayedNews(Array.from({ length: 6 }).map((_, i) => NEWS_DATA[lang][i % NEWS_DATA[lang].length]));

    const fetchLiveNews = async () => {
      try {
        // --- BỘ NHỚ ĐỆM (CACHE) ĐỂ CHỐNG DDOS API MIỄN PHÍ ---
        const cachedNews = sessionStorage.getItem(`news_cache_${lang}`);
        if (cachedNews) {
            const parsedData = JSON.parse(cachedNews);
            setLiveNews(parsedData);
            setDisplayedNews(Array.from({ length: 6 }).map((_, i) => parsedData[i % parsedData.length]));
            return;
        }

        // Tìm kiếm trên Google News theo ngôn ngữ
        const query = lang === 'vi' ? 'deepfake lừa đảo' : 'deepfake scam';
        const langCode = lang === 'vi' ? 'vi' : 'en-US';
        const gl = lang === 'vi' ? 'VN' : 'US';
        const ceid = lang === 'vi' ? 'VN:vi' : 'US:en';
        
        // Dùng rss2json API (miễn phí) để chuyển RSS thành JSON và vượt qua CORS
        const rssUrl = `https://news.google.com/rss/search?q=${encodeURIComponent(query)}&hl=${langCode}&gl=${gl}&ceid=${ceid}`;
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
          // Lưu vào Session Storage
          sessionStorage.setItem(`news_cache_${lang}`, JSON.stringify(formattedNews));
        }
      } catch (error) {
        console.error("Lỗi lấy tin tức tự động, sử dụng dữ liệu dự phòng.", error);
      }
    };

    fetchLiveNews();
  }, [lang]);

  // --- FIREBASE: LẮNG NGHE SỐ LƯỢNG NGƯỜI THAM GIA (REAL-TIME) ---
  useEffect(() => {
    const fetchStats = async () => {
      try {
        const qProtected = query(collection(db, "game_results"), where("score", ">=", 9));
        const snapProtected = await getCountFromServer(qProtected);
        setProtectedUsers(snapProtected.data().count);
        
        const qTotal = collection(db, "game_results");
        const snapTotal = await getCountFromServer(qTotal);
        setTotalAttempts(snapTotal.data().count);
      } catch (error) {
        console.error("Lỗi đếm số liệu:", error);
      }
    };
    fetchStats();
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

    const factTimer = setInterval(() => setFactIndex(prev => (prev + 2) % facts.length), 6000); // 6s đổi 2 kiến thức
    
    return () => {
      clearInterval(newsTimer);
      clearInterval(factTimer);
    };
  }, [liveNews, facts.length]);

  // --- XỬ LÝ HIỂN THỊ MINI GAME KHI BẬT MÙA HÈ ---
  useEffect(() => {
    if (season === 'SUMMER') {
      setShowMiniGame(true); // Đem mini game trở lại
    } else {
      setShowMiniGame(false);
    }
  }, [season]);

  // Dữ liệu Kiến thức (Lấy 2 items/lượt)
  const displayFacts = [
      facts[factIndex % facts.length],
      facts[(factIndex + 1) % facts.length]
  ];

  return (
    <div className="animate-in fade-in duration-500">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-16 items-center">
        <div className="lg:col-span-7 text-center lg:text-left">
          <h1 className="text-4xl md:text-6xl font-black text-white leading-tight mb-4 uppercase">
            {lang === 'vi' ? 'DỰ ÁN HUẤN LUYỆN ' : 'DEEPFAKE DETECTION '}
            <span className="text-primary block md:inline">{lang === 'vi' ? 'NHẬN DẠNG DEEPFAKE' : 'TRAINING PROJECT'}</span>
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
            <button onClick={() => navigate('/tools', { state: { tab: 'SCAN' }})} className="bg-primary text-black hover:bg-white px-8 py-4 rounded-xl font-bold text-xs transition-all flex items-center justify-center gap-2 uppercase tracking-widest shadow-lg shadow-primary/20">
              <Activity size={16} /> {t.btn_scan}
            </button>
            <button onClick={() => navigate('/ai-project')} className="bg-purple-600 text-white hover:bg-purple-500 px-8 py-4 rounded-xl font-bold text-xs transition-all flex items-center justify-center gap-2 uppercase tracking-widest shadow-lg shadow-purple-500/20">
              <Cpu size={16} /> {t.btn_ai}
            </button>
            <button onClick={() => navigate('/challenge')} className="bg-black border border-secondary text-secondary hover:bg-secondary hover:text-white px-8 py-4 rounded-xl font-bold text-xs transition-all flex items-center justify-center gap-2 uppercase tracking-widest">
              <Play size={16} /> {t.btn_challenge}
            </button>
          </div>
        </div>
        <div className="lg:col-span-5 h-[300px] md:h-[380px] w-full max-w-full overflow-hidden"><AnalyticsChart lang={lang} /></div>
      </div>

      {/* MINI GAME (HIỂN THỊ KHI BẬT MÙA HÈ VÀ CHƯA BỊ TẮT) */}
      {season === 'SUMMER' && showMiniGame && (
          <DeepfakeRunner lang={lang} onClose={() => setShowMiniGame(false)} />
      )}

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-16">
        <div className="lg:col-span-8 bg-surface border border-white/5 rounded-3xl overflow-hidden flex flex-col shadow-2xl">
             <div className="p-6 border-b border-white/5 flex items-center justify-between bg-black/40">
                <div className="flex items-center gap-3">
                    <div className="bg-secondary/20 p-2 rounded-lg"><AlertTriangle className="text-secondary" size={20} /></div>
                    <div>
                      <h2 className="text-white font-black text-sm tracking-widest uppercase leading-none">{t.warning_center}</h2>
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
                    <a href={news.url} target="_blank" rel="noopener noreferrer" key={`${news.url}-${index}`} className={`p-6 border-b border-r border-white/5 relative flex flex-col hover:bg-white/5 group/news cursor-pointer transition-all duration-300 transform origin-center min-h-[140px] ${flippingIndex === index ? 'scale-x-0 opacity-0' : 'scale-x-100 opacity-100'}`}>
                        <div className="flex items-center justify-between mb-3">
                            <span className="bg-secondary/10 text-secondary text-[8px] font-black px-2 py-0.5 rounded tracking-widest border border-secondary/20 uppercase flex items-center gap-1"><span className="w-1.5 h-1.5 bg-secondary rounded-full animate-pulse"></span>{news.tag}</span>
                            <span className="text-[9px] text-gray-500 font-mono italic">{news.date}</span>
                        </div>
                        <h3 className="text-base font-bold text-white mb-2 leading-snug group-hover/news:text-secondary transition-colors line-clamp-2">{news.title}</h3>
                        <p className="text-xs text-gray-400 line-clamp-2 leading-relaxed mb-4">{news.desc}</p>
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
                        <span className="text-secondary font-black text-md tracking-tighter">113</span>
                    </div>
                    <div className="flex justify-between items-center bg-black/60 p-4 rounded-2xl border border-white/5 hover:border-secondary/30 transition-colors">
                        <span className="text-[10px] text-gray-400 font-bold uppercase">{t.cyber_security}</span>
                        <span className="text-secondary font-black text-md tracking-tighter">069.219.4053</span>
                    </div>
                 </div>
             </div>
             <div className="bg-primary/5 border border-primary/20 rounded-3xl p-6 flex-1 shadow-xl relative overflow-hidden flex flex-col">
                 <h4 className="text-primary font-black text-[10px] mb-4 uppercase tracking-widest border-b border-primary/10 pb-3 flex items-center shrink-0">
                    <span className="flex items-center gap-2"><Lightbulb size={14} /> {t.knowledge}</span>
                 </h4>
                 <div key={`fact-ticker-${factIndex}`} className="animate-in fade-in slide-in-from-right-4 duration-500 flex-1 flex flex-col justify-center gap-4">
                    {displayFacts.map((fact, idx) => (
                        <div key={idx} className="text-[13px] text-gray-400 flex flex-col gap-3 bg-black/40 p-5 rounded-2xl border border-white/5 shadow-inner">
                            <div className="flex items-center gap-4">
                                <div className="bg-primary/20 h-10 w-10 rounded-xl flex items-center justify-center shrink-0">
                                    <ShieldCheck size={20} className="text-primary" />
                                </div>
                                <strong className="text-gray-200 uppercase tracking-widest text-sm leading-tight">{fact?.title}</strong>
                            </div>
                            <p className="leading-relaxed text-xs text-gray-300">{fact?.content}</p>
                        </div>
                    ))}
                 </div>
             </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
