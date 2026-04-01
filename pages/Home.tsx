import React, { useState, useEffect } from 'react';
import { Language, Season, NewsItem } from '../types';
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
  
  const [protectedUsers, setProtectedUsers] = useState(0); 
  const [totalAttempts, setTotalAttempts] = useState(0);   
  
  const [factIndex, setFactIndex] = useState(0);
  const [showMiniGame, setShowMiniGame] = useState(false);
  const [liveNews, setLiveNews] = useState<NewsItem[]>(NEWS_DATA[lang]); 
  const [displayedNews, setDisplayedNews] = useState<NewsItem[]>([]);
  const [flippingIndex, setFlippingIndex] = useState<number | null>(null);

  // --- FETCH REAL-TIME NEWS ---
  useEffect(() => {
    let ignore = false;
    setLiveNews(NEWS_DATA[lang]); 
    setDisplayedNews(NEWS_DATA[lang].slice(0, 6)); 

    const fetchLiveNews = async () => {
      try {
        const cacheKey = `news_cache_${lang}`;
        const cacheTimeKey = `news_cache_time_${lang}`;
        const cachedNews = sessionStorage.getItem(cacheKey);
        const cachedTime = sessionStorage.getItem(cacheTimeKey);
        
        if (cachedNews && cachedTime && (Date.now() - parseInt(cachedTime) < 900000)) {
             const parsedData = JSON.parse(cachedNews);
             setLiveNews(parsedData);
             setDisplayedNews(parsedData.slice(0, 6));
             return;
        }

        const queryStr = lang === 'vi' ? 'deepfake lừa đảo' : 'deepfake scam';
        const langCode = lang === 'vi' ? 'vi' : 'en-US';
        const gl = lang === 'vi' ? 'VN' : 'US';
        const ceid = lang === 'vi' ? 'VN:vi' : 'US:en';
        
        const rssUrl = `https://news.google.com/rss/search?q=${encodeURIComponent(queryStr)}&hl=${langCode}&gl=${gl}&ceid=${ceid}`;
        const apiUrl = `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(rssUrl)}`;
        
        const response = await fetch(apiUrl);
        const data = await response.json();
        
        if (data.status === 'ok' && data.items && data.items.length > 0) {
          const formattedNews = data.items.map((item: { pubDate: string; description: string; title: string; link: string }) => {
            const pubDate = new Date(item.pubDate);
            const dateStr = `${pubDate.getDate()}/${pubDate.getMonth() + 1}/${pubDate.getFullYear()}`;
            const cleanDesc = item.description.replace(/<[^>]*>?/gm, '').substring(0, 110) + '...';

            return {
              tag: t.latest_live,
              title: item.title.split(' - ')[0], 
              date: dateStr,
              loss: t.tbd,
              desc: cleanDesc,
              url: item.link
            };
          });

          if (ignore) return;
          
          const sortedNews = [...formattedNews].sort((a, b) => {
              const dateA = a.date.split('/').reverse().join('');
              const dateB = b.date.split('/').reverse().join('');
              return dateB.localeCompare(dateA);
          });

          setLiveNews(sortedNews);
          setDisplayedNews(sortedNews.slice(0, 6)); 
          try {
            sessionStorage.setItem(cacheKey, JSON.stringify(formattedNews));
            sessionStorage.setItem(cacheTimeKey, Date.now().toString());
          } catch (storageError) {
            console.warn("Cache storage error.");
          }
        }
      } catch (error) {
        console.error("News fetch error.", error);
      }
    };

    fetchLiveNews();
    return () => {
      ignore = true;
    };
  }, [lang, t.latest_live, t.tbd]);

  // --- FIREBASE STATS ---
  useEffect(() => {
    let isMounted = true;
    const fetchStats = async () => {
      try {
        const qProtected = query(collection(db, "game_results"), where("score", ">=", 9));
        const snapProtected = await getCountFromServer(qProtected);
        if (!isMounted) return;
        setProtectedUsers(snapProtected.data().count);
        
        const qTotal = collection(db, "game_results");
        const snapTotal = await getCountFromServer(qTotal);
        if (!isMounted) return;
        setTotalAttempts(snapTotal.data().count);
      } catch (error) {
        console.error("Stats count error:", error);
      }
    };
    fetchStats();
    return () => {
      isMounted = false;
    };
  }, []);

  // --- AUTO TICKER EFFECT ---
  useEffect(() => {
    let isMounted = true;
    let currentSlot = 0;
    let newsPoolIndex = 6; 

    const newsTimer = setInterval(() => {
        if (!isMounted || liveNews.length <= 6) return;
        
        const slotToUpdate = currentSlot % 6;
        const nextNewsItem = liveNews[newsPoolIndex % liveNews.length];
        
        setFlippingIndex(slotToUpdate);
        
        setTimeout(() => {
            if (!isMounted) return;
            setDisplayedNews(prev => {
                const newDisplay = [...prev];
                newDisplay[slotToUpdate] = nextNewsItem;
                return newDisplay;
            });
        }, 300);
        
        setTimeout(() => {
            if (!isMounted) return;
            setFlippingIndex(null);
        }, 600);

        currentSlot++;
        newsPoolIndex++;
    }, 5000);

    const factTimer = setInterval(() => {
        if (!isMounted) return;
        setFactIndex(prev => (prev + 2) % facts.length);
    }, 10000); 
    
    return () => {
      isMounted = false;
      clearInterval(newsTimer);
      clearInterval(factTimer);
    };
  }, [liveNews, facts.length]);

  useEffect(() => {
    if (season === 'SUMMER') {
      setShowMiniGame(true);
    } else {
      setShowMiniGame(false);
    }
  }, [season]);

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
            <button onClick={() => navigate('/tools/scan')} className="bg-primary text-black hover:bg-white px-8 py-4 rounded-xl font-bold text-xs transition-all flex items-center justify-center gap-2 uppercase tracking-widest shadow-lg shadow-primary/20">
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
                {displayedNews.map((item, idx) => (
                  <a 
                    key={idx} 
                    href={item.url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className={`p-6 border-b border-white/5 hover:bg-white/[0.02] transition-all flex flex-col gap-3 group relative overflow-hidden ${flippingIndex === idx ? 'animate-pulse opacity-50' : ''}`}
                  >
                    <div className="flex items-center justify-between">
                       <span className="bg-red-500/10 text-red-500 text-[9px] font-bold px-2 py-0.5 rounded tracking-widest uppercase">{item.tag}</span>
                       <span className="text-gray-600 text-[10px] font-mono">{item.date}</span>
                    </div>
                    <h3 className="text-white font-bold text-sm leading-snug group-hover:text-primary transition-colors line-clamp-2">{item.title}</h3>
                    <p className="text-gray-500 text-[11px] leading-relaxed line-clamp-2">{item.desc}</p>
                    <div className="flex items-center justify-between mt-auto pt-2">
                       <span className="text-[9px] text-gray-400 uppercase tracking-tighter">{lang === 'vi' ? 'Thiệt hại:' : 'Loss:'} <span className="text-red-400 font-bold">{item.loss}</span></span>
                       <ExternalLink size={12} className="text-gray-700 group-hover:text-primary" />
                    </div>
                  </a>
                ))}
             </div>
        </div>

        <div className="lg:col-span-4 flex flex-col gap-6">
             <div onClick={() => navigate('/tools/crisis')} className="bg-red-600 rounded-3xl p-8 flex items-center justify-between group cursor-pointer hover:bg-red-500 transition-all shadow-lg shadow-red-600/20">
                <div className="flex items-center gap-4">
                    <div className="bg-white/20 p-4 rounded-2xl text-white group-hover:scale-110 transition-transform"><PhoneCall size={32} /></div>
                    <div>
                        <div className="text-white font-black text-lg tracking-widest uppercase leading-none">{t.hotline}</div>
                        <div className="text-white/80 text-[10px] mt-2 font-mono uppercase tracking-tighter italic">24/7 EMERGENCY RESPONSE</div>
                    </div>
                </div>
                <div className="text-white/40 group-hover:text-white transition-colors"><AlertTriangle size={32} /></div>
             </div>

             <div className="bg-surface border border-white/5 rounded-3xl p-8 flex-grow shadow-2xl relative overflow-hidden group min-h-[400px]">
                <div className="relative z-10 w-full h-full flex flex-col">
                    <div className="flex items-center gap-3 mb-10 pb-4 border-b border-white/5">
                        <div className="bg-primary/20 p-2.5 rounded-xl"><Lightbulb className="text-primary" size={24} /></div>
                        <div>
                            <h2 className="text-white font-black text-sm tracking-[0.2em] uppercase leading-none">{t.knowledge}</h2>
                            <div className="h-1 w-8 bg-primary/40 mt-2"></div>
                        </div>
                    </div>
                    
                    <div className="flex-1 flex flex-col justify-around gap-8">
                        {displayFacts.map((fact, idx) => (
                           <div key={`${factIndex}-${idx}`} className="animate-in slide-in-from-right duration-700 delay-150 relative pl-6 border-l-2 border-primary/20 hover:border-primary transition-colors">
                                <div className="absolute -left-[5px] top-0 w-2 h-2 bg-primary rounded-full shadow-[0_0_8px_rgba(0,240,255,0.8)]"></div>
                                <div className="text-[10px] text-primary/60 font-mono font-bold tracking-widest uppercase mb-2">FACT #{ (factIndex + idx) % facts.length + 1 }</div>
                                <h4 className="text-white font-black text-lg mb-3 uppercase leading-tight italic">{fact.title}</h4>
                                <p className="text-gray-400 text-xs leading-relaxed line-clamp-3">{fact.content}</p>
                           </div>
                        ))}
                    </div>

                    <div className="mt-10 flex gap-1 items-center justify-center opacity-30">
                        {Array.from({ length: Math.ceil(facts.length / 2) }).map((_, i) => (
                            <div key={i} className={`h-1 rounded-full transition-all duration-500 ${Math.floor(factIndex / 2) === i ? 'w-6 bg-primary' : 'w-2 bg-white/20'}`}></div>
                        ))}
                    </div>
                </div>
                <div className="absolute -bottom-16 -right-16 opacity-[0.03] group-hover:opacity-[0.07] transition-all duration-1000 group-hover:rotate-12 group-hover:scale-110">
                    <Lightbulb size={280} />
                </div>
             </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
