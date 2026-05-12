/**
 * DEEPFENSE.ONLINE â€” Home Page v3.0
 * Core mission: Dáº Y Há»ŒC + GAMIFICATION â€” huáº¥n luyá»‡n nháº­n dáº¡ng deepfake
 * Palette: Ocean Blue primary, Red alerts, Amber achievements
 * @copyright 2025 Ho Xuan Nguyen (25NS039)
 */

import React, { useState, useEffect, useRef } from 'react';
import { Language, Season, NewsItem } from '@/types';
import { useNavigate } from 'react-router-dom';
import { NEWS_DATA, FUN_FACTS, TRANSLATIONS } from '@/data';
import {
  BookOpen, Trophy, Swords, AlertTriangle, Lightbulb,
  PhoneCall, Zap, ShieldCheck, ExternalLink,
  Terminal, GraduationCap, Award,
} from 'lucide-react';
import AnalyticsChart from '@/features/dashboard/AnalyticsChart';
import { db } from '@/config/firebase';
import { collection, getCountFromServer, query, where } from 'firebase/firestore';
import DeepfakeRunner from '@/features/deepfake/DeepfakeRunner';
import AnimatedCounter from '@/components/ui/AnimatedCounter';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import MagneticWrapper from '@/components/ui/MagneticWrapper';
import GlowButton from '@/components/ui/GlowButton';
import TypewriterText from '@/components/ui/TypewriterText';
import ThreatPulse from '@/components/effects/ThreatPulse';
import RadarPing from '@/components/ui/RadarPing';

interface HomeProps { lang: Language; season: Season; }

const Home: React.FC<HomeProps> = ({ lang, season }) => {
  const t = TRANSLATIONS[lang];
  const facts = FUN_FACTS[lang];
  const navigate = useNavigate();

  const [protectedUsers, setProtectedUsers] = useState(0);
  const [totalAttempts, setTotalAttempts]   = useState(0);
  const [factIndex, setFactIndex]           = useState(0);
  const [showMiniGame, setShowMiniGame]     = useState(false);
  const [displayedNews, setDisplayedNews]   = useState<NewsItem[]>([]);
  const [flippingIndex, setFlippingIndex]   = useState<number | null>(null);
  const [liveNews, setLiveNews]             = useState<NewsItem[]>(NEWS_DATA[lang]);

  // Firebase stats
  useEffect(() => {
    let ok = true;
    (async () => {
      try {
        const qP = query(collection(db, 'game_results'), where('score', '>=', 9));
        const [sP, sT] = await Promise.all([
          getCountFromServer(qP),
          getCountFromServer(collection(db, 'game_results')),
        ]);
        if (!ok) return;
        setProtectedUsers(sP.data().count);
        setTotalAttempts(sT.data().count);
      } catch { /* silent */ }
    })();
    return () => { ok = false; };
  }, []);

  // News fetch
  useEffect(() => {
    let ignore = false;
    setLiveNews(NEWS_DATA[lang]);
    setDisplayedNews(NEWS_DATA[lang].slice(0, 6));
    (async () => {
      try {
        const q = lang === 'vi' ? 'deepfake lá»«a Ä‘áº£o' : 'deepfake scam';
        const url = `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(`https://news.google.com/rss/search?q=${encodeURIComponent(q)}&hl=${lang === 'vi' ? 'vi' : 'en-US'}&gl=${lang === 'vi' ? 'VN' : 'US'}`)}`;
        const { status, items } = await (await fetch(url)).json();
        if (ignore || status !== 'ok' || !items?.length) return;
        const news = items.map((i: any) => {
          const d = new Date(i.pubDate);
          return { tag: t.latest_live, title: i.title.split(' - ')[0], date: `${d.getDate()}/${d.getMonth()+1}/${d.getFullYear()}`, loss: t.tbd, desc: i.description.replace(/<[^>]*>/g,'').substring(0,110)+'...', url: i.link };
        });
        setLiveNews(news); setDisplayedNews(news.slice(0,6));
      } catch { /* silent */ }
    })();
    return () => { ignore = true; };
  }, [lang]);

  // Auto-ticker & facts
  useEffect(() => {
    let ok = true, slot = 0, pool = 6;
    const news = setInterval(() => {
      if (!ok || liveNews.length <= 6) return;
      const s = slot % 6; const next = liveNews[pool % liveNews.length];
      setFlippingIndex(s);
      setTimeout(() => { if (!ok) return; setDisplayedNews(p => { const n=[...p]; n[s]=next; return n; }); }, 300);
      setTimeout(() => { if (!ok) return; setFlippingIndex(null); }, 600);
      slot++; pool++;
    }, 5000);
    const fact = setInterval(() => { if (!ok) return; setFactIndex(p => (p+3) % facts.length); }, 10000);
    return () => { ok=false; clearInterval(news); clearInterval(fact); };
  }, [liveNews, facts.length]);

  useEffect(() => {
    if (season !== 'SUMMER') setShowMiniGame(false);
  }, [season]);

  const heroRef    = useScrollReveal({ selector: '[data-reveal]', preset: 'fade-up',   stagger: 0.12 });
  const featRef    = useScrollReveal({ selector: '[data-reveal]', preset: 'scale-in',  stagger: 0.1 });
  const newsRef    = useScrollReveal({ selector: '[data-reveal]', preset: 'fade-up',   stagger: 0.08 });

  // Mouse parallax
  const titleRef = useRef<HTMLDivElement>(null);
  const chartRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (window.matchMedia('(pointer: coarse)').matches) return;
    let mX=0,mY=0,cX=0,cY=0,raf=0;
    const onMove = (e: MouseEvent) => {
      mX = (e.clientX/window.innerWidth - 0.5)*2;
      mY = (e.clientY/window.innerHeight - 0.5)*2;
    };
    const tick = () => {
      cX += (mX-cX)*0.06; cY += (mY-cY)*0.06;
      if (titleRef.current) titleRef.current.style.transform = `translate(${cX*-16}px,${cY*-10}px)`;
      if (chartRef.current) chartRef.current.style.transform = `translate(${cX*12}px,${cY*8}px)`;
      raf = requestAnimationFrame(tick);
    };
    window.addEventListener('mousemove', onMove, { passive: true });
    raf = requestAnimationFrame(tick);
    return () => { window.removeEventListener('mousemove', onMove); cancelAnimationFrame(raf); };
  }, []);

  const displayFacts = [0, 1, 2].map((offset) => facts[(factIndex + offset) % facts.length]);

  return (
    <div className="animate-in fade-in duration-500">

      {/* â•â•â• HERO â•â•â• */}
      <div ref={heroRef as React.RefObject<HTMLDivElement>} className="relative grid grid-cols-1 lg:grid-cols-12 gap-8 mb-20 items-center min-h-[520px]">

        {/* Ambient glow */}
        <div className="absolute inset-x-0 top-0 h-[360px] pointer-events-none overflow-hidden opacity-70">
          <div className="absolute left-1/2 top-0 h-px w-[72%] -translate-x-1/2 bg-gradient-to-r from-transparent via-blue-400/15 to-transparent" />
          <div className="absolute left-1/2 top-8 h-56 w-[min(680px,90vw)] -translate-x-1/2 rounded-full bg-[radial-gradient(ellipse_at_center,rgba(29,111,232,0.055),transparent_68%)] blur-2xl" />
        </div>

        {/* Left content */}
        <div className="lg:col-span-7 text-center lg:text-left relative z-10">
          <div ref={titleRef} style={{ willChange: 'transform' }}>

            {/* Badge */}
            <div data-reveal className="inline-flex items-center gap-2 bg-blue-500/10 border border-blue-500/20 text-blue-400 px-4 py-1.5 rounded-full text-[10px] font-mono tracking-widest mb-5">
              <Terminal size={10} />
              <TypewriterText
                text={lang === 'vi' ? 'CHÆ¯Æ NG TRÃŒNH HUáº¤N LUYá»†N DEEPFAKE // KHá»žI Äá»˜NG...' : 'DEEPFAKE TRAINING PROGRAM // INITIALIZING...'}
                speed={40} delay={400} showCursor
              />
            </div>

            {/* H1 */}
            <div data-reveal className="overflow-hidden mb-2">
              <h1
                className="text-4xl md:text-6xl font-black text-white leading-tight uppercase"
                style={{ fontFamily:"'Outfit', 'Inter', Arial, 'Helvetica Neue', sans-serif", animation:'clipReveal 0.9s cubic-bezier(0.16,1,0.3,1) both', animationDelay:'0.2s' }}
              >
                {lang === 'vi' ? 'HUáº¤N LUYá»†N' : 'TRAIN YOUR'}<br />
                <span className="text-shimmer">{lang === 'vi' ? 'NHáº¬N DIá»†N DEEPFAKE' : 'DEEPFAKE EYE'}</span>
              </h1>
            </div>

            {/* Tagline */}
            <p data-reveal className="text-gray-400 text-base md:text-lg leading-relaxed mb-6 max-w-lg mx-auto lg:mx-0 lg:border-l-2 lg:border-blue-500/40 lg:pl-4" style={{ fontFamily:"'Inter', Arial, 'Helvetica Neue', sans-serif" }}>
              {lang === 'vi'
                ? 'Há»c cÃ¡ch nháº­n biáº¿t video, hÃ¬nh áº£nh, giá»ng nÃ³i giáº£ máº¡o AI. Trang bá»‹ ká»¹ nÄƒng báº£o vá»‡ báº£n thÃ¢n vÃ  cá»™ng Ä‘á»“ng trong ká»· nguyÃªn sá»‘.'
                : 'Learn to spot AI-generated videos, images and voices. Build the skills to protect yourself in the age of synthetic media.'}
            </p>

            {/* Stats badges */}
            {(protectedUsers > 0 || totalAttempts > 0) && (
              <div data-reveal className="flex flex-wrap gap-3 mb-7 justify-center lg:justify-start">
                {protectedUsers > 0 && (
                  <div className="stat-badge">
                    <ShieldCheck size={12} />
                    <AnimatedCounter target={protectedUsers} duration={2.5} /> {lang === 'vi' ? 'Há»ŒC VIÃŠN VÆ¯á»¢T QUA' : 'LEARNERS PASSED'}
                  </div>
                )}
                {totalAttempts > 0 && (
                  <div className="stat-badge" style={{ borderColor:'rgba(245,158,11,0.25)', color:'#F59E0B', background:'rgba(245,158,11,0.06)' }}>
                    <Trophy size={12} />
                    <AnimatedCounter target={totalAttempts} duration={2.5} /> {lang === 'vi' ? 'LÆ¯á»¢T LUYá»†N Táº¬P' : 'TRAINING SESSIONS'}
                  </div>
                )}
              </div>
            )}

            {/* CTAs */}
            <div data-reveal className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start">
              <MagneticWrapper>
                <GlowButton color="primary" size="lg" icon={<Swords size={16}/>} onClick={() => navigate('/challenge')}>
                  {lang === 'vi' ? 'THá»¬ THÃCH NGAY' : 'TAKE CHALLENGE'}
                </GlowButton>
              </MagneticWrapper>
              <MagneticWrapper>
                <GlowButton color="ghost" size="lg" icon={<BookOpen size={16}/>} onClick={() => navigate('/tools/knowledge')}>
                  {lang === 'vi' ? 'Báº¯t Ä‘áº§u há»c' : 'Start Learning'}
                </GlowButton>
              </MagneticWrapper>
            </div>
          </div>
        </div>

        {/* Right: chart with HUD */}
        <div ref={chartRef} style={{ willChange:'transform' }} className="lg:col-span-5">
          <div data-reveal className="relative h-[300px] md:h-[380px] rounded-2xl overflow-hidden border border-blue-500/10 bg-black/30 shadow-[0_18px_70px_rgba(0,0,0,0.32)]">
            <AnalyticsChart lang={lang} />
            <ThreatPulse />
          </div>
        </div>
      </div>

      {/* MiniGame */}
      {season === 'SUMMER' && !showMiniGame && (
        <section className="mb-16 rounded-3xl border border-amber-500/20 bg-gradient-to-r from-amber-500/10 via-black/30 to-primary/10 p-5 md:p-7 flex flex-col md:flex-row items-center justify-between gap-5">
          <div className="flex items-center gap-4 text-center md:text-left">
            <div className="w-12 h-12 rounded-2xl bg-amber-500/15 border border-amber-500/25 text-amber-300 flex items-center justify-center shrink-0">
              <Trophy size={24} />
            </div>
            <div>
              <h3 className="text-white font-black uppercase tracking-widest text-sm">
                {lang === 'vi' ? 'Cháº¿ Ä‘á»™ arcade mÃ¹a hÃ¨ Ä‘Ã£ sáºµn sÃ ng' : 'Summer arcade mode is ready'}
              </h3>
              <p className="text-gray-500 text-xs mt-1 max-w-xl">
                {lang === 'vi'
                  ? 'Khá»Ÿi Ä‘á»™ng Neural Defender khi cáº§n má»™t pháº§n chÆ¡i nhanh Ä‘á»ƒ tÄƒng tÆ°Æ¡ng tÃ¡c, khÃ´ng che máº¥t lá»™ trÃ¬nh huáº¥n luyá»‡n chÃ­nh.'
                  : 'Launch Neural Defender when you want a fast engagement boost without interrupting the main learning path.'}
              </p>
            </div>
          </div>
          <GlowButton color="primary" size="md" icon={<Zap size={16} />} onClick={() => setShowMiniGame(true)}>
            {lang === 'vi' ? 'Má»ž MINI GAME' : 'OPEN MINI GAME'}
          </GlowButton>
        </section>
      )}
      {season === 'SUMMER' && showMiniGame && <DeepfakeRunner lang={lang} onClose={() => setShowMiniGame(false)} />}

      {/* â•â•â• DEEPFENSE ACADEMY INTRO â•â•â• */}
      <div ref={featRef as React.RefObject<HTMLDivElement>} className="mb-20">
        <section data-reveal className="relative overflow-hidden rounded-2xl border border-amber-400/25 bg-[#07111f]/95 shadow-[0_24px_80px_rgba(0,0,0,0.34)]">
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-blue-400/50 to-transparent" />
          <div className="absolute right-0 top-0 h-full w-2/3 bg-[radial-gradient(circle_at_top_right,rgba(245,158,11,0.13),transparent_48%)] pointer-events-none" />
          <div className="relative z-10 p-6 md:p-9 lg:p-11">
            <div className="max-w-5xl">
              <div className="inline-flex items-center gap-2 bg-amber-400/10 border border-amber-400/25 text-amber-300 px-4 py-1.5 rounded-full text-[10px] font-mono tracking-widest mb-4">
                <Trophy size={12} /> 500 DPF + DEEPFENSE AWARE
              </div>
              <h2 className="text-3xl md:text-5xl font-black text-white uppercase leading-tight" style={{ fontFamily:"'Outfit', 'Inter', Arial, 'Helvetica Neue', sans-serif" }}>
                {lang === 'vi' ? 'Äá»«ng chá» tá»›i khi bá»‹ lá»«a má»›i há»c cÃ¡ch nháº­n ra deepfake.' : 'Do not wait for a scam to teach you deepfakes.'}
              </h2>
              <p className="text-gray-400 text-sm md:text-base leading-relaxed mt-4 max-w-3xl">
                {lang === 'vi'
                  ? 'Má»™t cuá»™c gá»i giáº£ giá»ng ngÆ°á»i thÃ¢n, má»™t video sáº¿p yÃªu cáº§u chuyá»ƒn tiá»n, hay má»™t áº£nh ghÃ©p lan trÃªn máº¡ng Ä‘á»u cÃ³ thá»ƒ xáº£y ra trÆ°á»›c khi báº¡n ká»‹p nghi ngá». DEEPFENSE ACADEMY biáº¿n 20 phÃºt tÃ² mÃ² hÃ´m nay thÃ nh pháº£n xáº¡ tá»± vá»‡ sá»‘ ngÃ y mai.'
                  : 'A cloned family voice, a fake boss video asking for payment, or a manipulated photo can hit before suspicion kicks in. DEEPFENSE ACADEMY turns todayâ€™s curiosity into tomorrowâ€™s digital defense reflex.'}
              </p>
              <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-3 max-w-4xl">
                {[
                  ['01', lang === 'vi' ? 'Học theo module' : 'Module learning', lang === 'vi' ? '9 module theo lộ trình nền tảng, nhận diện, phòng vệ.' : '9 modules across foundation, recognition, and response.'],
                  ['02', lang === 'vi' ? 'Kiểm tra từng bước' : 'Guided assessments', lang === 'vi' ? 'Checkpoint, quiz module, midterm và final exam.' : 'Checkpoints, module quizzes, midterms, and final exam.'],
                  ['03', lang === 'vi' ? 'Chứng nhận khi đạt' : 'Earn when qualified', lang === 'vi' ? 'DEEPFENSE AWARE + 500 DPF khi hoàn thành điều kiện.' : 'DEEPFENSE AWARE + 500 DPF after completion.'],
                ].map(([num, title, text]) => (
                  <div key={title} className="rounded-xl border border-white/10 bg-black/25 p-4">
                    <div className="text-amber-300 text-[10px] font-mono font-black mb-2">{num}</div>
                    <div className="text-white text-xs font-black uppercase mb-1">{title}</div>
                    <div className="text-gray-500 text-[11px] leading-snug">{text}</div>
                  </div>
                ))}
              </div>
              <div className="mt-6 flex flex-col sm:flex-row gap-3 items-start sm:items-center">
                <GlowButton color="primary" size="md" icon={<GraduationCap size={16} />} onClick={() => navigate('/academy/basics')}>
                  {lang === 'vi' ? 'ÄÄ‚NG NHáº¬P Äá»‚ Báº®T Äáº¦U Há»ŒC' : 'SIGN IN TO START LEARNING'}
                </GlowButton>
                <GlowButton color="ghost" size="md" icon={<BookOpen size={16} />} onClick={() => navigate('/academy')}>
                  {lang === 'vi' ? 'XEM Lá»˜ TRÃŒNH' : 'VIEW CATALOG'}
                </GlowButton>
              </div>
              <p className="mt-3 text-[11px] text-gray-500 leading-relaxed max-w-2xl">
                {lang === 'vi'
                  ? 'Muá»‘n há»c cáº§n Ä‘Äƒng nháº­p Google Ä‘á»ƒ lÆ°u tiáº¿n Ä‘á»™, cháº¥m quiz, admin kiá»ƒm soÃ¡t vÃ  tráº£ thÆ°á»Ÿng DPF Ä‘Ãºng ngÆ°á»i.'
                  : 'Learning requires Google sign-in so progress, quiz scores, admin tracking, and DPF rewards stay tied to the right learner.'}
              </p>
            </div>

          </div>
        </section>
      </div>

      {/* â•â•â• NEWS + FACTS â•â•â• */}
      <div ref={newsRef as React.RefObject<HTMLDivElement>} className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-16">

        {/* News feed */}
        <div data-reveal className="lg:col-span-8 bg-white/[0.02] backdrop-blur-sm border border-white/5 rounded-3xl overflow-hidden shadow-2xl">
          <div className="p-6 border-b border-white/5 bg-black/40 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-secondary/20 p-2 rounded-lg"><AlertTriangle className="text-secondary" size={18} /></div>
              <div>
                <h2 className="text-white font-black text-sm tracking-widest uppercase">{t.warning_center}</h2>
                <p className="text-[9px] text-gray-500 font-mono uppercase tracking-tighter mt-1 flex items-center gap-2">
                  <RadarPing size={6} color="secondary" speed="slow" /> LIVE_THREAT_AWARENESS
                </p>
              </div>
            </div>
            <div className="text-[9px] font-mono text-gray-600 hidden md:block">
              {lang === 'vi' ? 'âš ï¸ Táº¡i sao báº¡n cáº§n há»c' : 'âš ï¸ Why you need to train'}
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2">
            {displayedNews.map((item, idx) => (
              <a key={idx} href={item.url} target="_blank" rel="noopener noreferrer"
                className={`news-card p-5 border-b border-white/5 flex flex-col gap-2.5 group ${flippingIndex === idx ? 'animate-pulse opacity-50' : ''}`}>
                <div className="flex items-center justify-between">
                  <span className="bg-red-500/10 text-red-400 text-[9px] font-bold px-2 py-0.5 rounded tracking-widest uppercase">{item.tag}</span>
                  <span className="text-gray-600 text-[10px] font-mono">{item.date}</span>
                </div>
                <h3 className="text-white font-bold text-sm leading-snug group-hover:text-blue-400 transition-colors line-clamp-2">{item.title}</h3>
                <p className="text-gray-500 text-[11px] leading-relaxed line-clamp-2">{item.desc}</p>
                <div className="flex items-center justify-end mt-auto">
                  <ExternalLink size={11} className="text-gray-700 group-hover:text-blue-400 transition-colors" />
                </div>
              </a>
            ))}
          </div>
        </div>

        {/* Fun facts sidebar */}
        <div className="lg:col-span-4 flex flex-col gap-5">
          {/* Emergency */}
          <div onClick={() => navigate('/tools/crisis')} className="bg-secondary rounded-2xl p-6 flex items-center gap-4 group cursor-pointer hover:bg-red-500 transition-all shadow-lg shadow-secondary/20">
            <div className="bg-white/20 p-3.5 rounded-xl text-white group-hover:scale-110 transition-transform"><PhoneCall size={28} /></div>
            <div>
              <div className="text-white font-black text-base tracking-widest uppercase leading-none">{t.hotline}</div>
              <div className="text-white/70 text-[10px] mt-1.5 font-mono uppercase tracking-tighter">{t.hotline_subtext}</div>
            </div>
          </div>

          {/* Knowledge facts */}
          <div className="bg-surface border border-white/5 rounded-2xl p-6 flex-grow relative overflow-hidden group">
            <div className="flex items-center gap-3 mb-6 pb-4 border-b border-white/5">
              <div className="bg-blue-500/20 p-2.5 rounded-xl"><Lightbulb className="text-blue-400" size={22} /></div>
              <div>
                <h2 className="text-white font-black text-sm tracking-[0.2em] uppercase">{t.knowledge}</h2>
                <div className="h-1 w-8 bg-blue-500/40 mt-2 rounded-full" />
              </div>
            </div>
            <div className="flex flex-col gap-5">
              {displayFacts.map((fact, idx) => (
                <div key={`${factIndex}-${idx}`} className="animate-in slide-in-from-right duration-700 pl-5 border-l-2 border-blue-500/20 hover:border-blue-400 transition-colors relative">
                  <div className="absolute -left-[5px] top-0 w-2 h-2 bg-blue-400 rounded-full shadow-[0_0_8px_rgba(29,111,232,0.8)]" />
                  <div className="text-[10px] text-blue-400/60 font-mono font-bold tracking-widest uppercase mb-1.5">FACT #{(factIndex+idx) % facts.length + 1}</div>
                  <h4 className="text-white font-black text-base mb-2 uppercase leading-tight italic">{fact.title}</h4>
                  <p className="text-gray-400 text-xs leading-relaxed line-clamp-3">{fact.content}</p>
                </div>
              ))}
            </div>
            <div className="absolute -bottom-12 -right-12 opacity-[0.03] group-hover:opacity-[0.06] transition-all duration-1000 pointer-events-none">
              <Lightbulb size={240} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
