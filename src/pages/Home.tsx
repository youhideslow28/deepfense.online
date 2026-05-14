/**
 * DEEPFENSE.ONLINE — Home Page v3.0
 * Core mission: DẠY HỌC + GAMIFICATION — huấn luyện nhận dạng deepfake
 * Palette: Ocean Blue primary, Red alerts, Amber achievements
 * @copyright 2025 Ho Xuan Nguyen (25NS039)
 */

import React, { useState, useEffect, useRef } from 'react';
import { Language, Season, NewsItem } from '@/types';
import { useNavigate } from 'react-router-dom';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import gsap from 'gsap';
import { NEWS_DATA, FUN_FACTS, TRANSLATIONS } from '@/data';
import {
  BookOpen, Trophy, Swords, AlertTriangle, Lightbulb,
  PhoneCall, ShieldCheck, ExternalLink,
  GraduationCap,
} from 'lucide-react';
import AnalyticsChart from '@/features/dashboard/AnalyticsChart';
import { db } from '@/config/firebase';
import { collection, getCountFromServer, query, where } from 'firebase/firestore';
import AnimatedCounter from '@/components/ui/AnimatedCounter';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import MagneticWrapper from '@/components/ui/MagneticWrapper';
import GlowButton from '@/components/ui/GlowButton';
import TypewriterText from '@/components/ui/TypewriterText';
import ThreatPulse from '@/components/effects/ThreatPulse';
import RadarPing from '@/components/ui/RadarPing';
import DeepfakeTimeline from '@/components/effects/DeepfakeTimeline';

gsap.registerPlugin(ScrollTrigger);

interface HomeProps { lang: Language; season: Season; }

const Home: React.FC<HomeProps> = ({ lang, season }) => {
  const t = TRANSLATIONS[lang];
  const facts = FUN_FACTS[lang];
  const navigate = useNavigate();

  const [protectedUsers, setProtectedUsers] = useState(0);
  const [totalAttempts, setTotalAttempts] = useState(0);
  const [factIndex, setFactIndex] = useState(0);
  const [displayedNews, setDisplayedNews] = useState<NewsItem[]>([]);
  const [flippingIndex, setFlippingIndex] = useState<number | null>(null);
  const [liveNews, setLiveNews] = useState<NewsItem[]>(NEWS_DATA[lang]);

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
    // Refresh ScrollTrigger sau một khoảng nghỉ để đảm bảo DOM đã ổn định
    setTimeout(() => {
      ScrollTrigger.refresh();
    }, 1000);
    return () => { ok = false; };
  }, []);

  // News fetch
  useEffect(() => {
    let ignore = false;
    setLiveNews(NEWS_DATA[lang]);
    setDisplayedNews(NEWS_DATA[lang].slice(0, 6));
    (async () => {
      try {
        const q = lang === 'vi' ? 'deepfake lừa đảo' : 'deepfake scam';
        const url = `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(`https://news.google.com/rss/search?q=${encodeURIComponent(q)}&hl=${lang === 'vi' ? 'vi' : 'en-US'}&gl=${lang === 'vi' ? 'VN' : 'US'}`)}`;
        const { status, items } = await (await fetch(url)).json();
        if (ignore || status !== 'ok' || !items?.length) return;
        const news = items.map((i: any) => {
          const d = new Date(i.pubDate);
          return { tag: t.latest_live, title: i.title.split(' - ')[0], date: `${d.getDate()}/${d.getMonth() + 1}/${d.getFullYear()}`, loss: t.tbd, desc: i.description.replace(/<[^>]*>/g, '').substring(0, 110) + '...', url: i.link };
        });
        setLiveNews(news); setDisplayedNews(news.slice(0, 6));
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
      setTimeout(() => { if (!ok) return; setDisplayedNews(p => { const n = [...p]; n[s] = next; return n; }); }, 300);
      setTimeout(() => { if (!ok) return; setFlippingIndex(null); }, 600);
      slot++; pool++;
    }, 5000);
    const fact = setInterval(() => { if (!ok) return; setFactIndex(p => (p + 3) % facts.length); }, 10000);
    return () => { ok = false; clearInterval(news); clearInterval(fact); };
  }, [liveNews, facts.length]);

  const heroRef = useScrollReveal({ selector: '[data-reveal]', preset: 'fade-up', stagger: 0.12 });
  const featRef = useScrollReveal({ selector: '[data-reveal]', preset: 'scale-in', stagger: 0.1 });
  const newsRef = useScrollReveal({ selector: '[data-reveal]', preset: 'fade-up', stagger: 0.08 });

  // Mouse parallax
  const titleRef = useRef<HTMLDivElement>(null);
  const chartRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (window.matchMedia('(pointer: coarse)').matches) return;
    let mX = 0, mY = 0, cX = 0, cY = 0, raf = 0;
    const onMove = (e: MouseEvent) => {
      mX = (e.clientX / window.innerWidth - 0.5) * 2;
      mY = (e.clientY / window.innerHeight - 0.5) * 2;
    };
    const tick = () => {
      cX += (mX - cX) * 0.06; cY += (mY - cY) * 0.06;
      if (titleRef.current) titleRef.current.style.transform = `translate(${cX * -8}px,${cY * -5}px)`;
      if (chartRef.current) chartRef.current.style.transform = `translate(${cX * 8}px,${cY * 5}px)`;
      raf = requestAnimationFrame(tick);
    };
    window.addEventListener('mousemove', onMove, { passive: true });
    raf = requestAnimationFrame(tick);
    return () => { window.removeEventListener('mousemove', onMove); cancelAnimationFrame(raf); };
  }, []);

  const displayFacts = [0, 1, 2].map((offset) => facts[(factIndex + offset) % facts.length]);

  return (
    <div className="animate-in fade-in duration-500">
      {/* ═══ DEEPFAKE EVOLUTION TIMELINE (INTRO) ═══ */}
      <DeepfakeTimeline lang={lang} />

      <div className="container mx-auto px-4 py-8 md:py-12 max-w-7xl relative z-30 bg-[#03080F]">

      {/* ═══ HERO ═══ */}
      <div ref={heroRef as React.RefObject<HTMLDivElement>} className="relative grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 mb-16 items-center min-h-[440px] lg:min-h-[470px]">

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
              <img src="/logo/favicon-32x32.png" alt="" className="h-4 w-4 rounded-md object-contain" />
              <TypewriterText
                text={lang === 'vi' ? 'CHƯƠNG TRÌNH HUẤN LUYỆN DEEPFAKE // KHỞI ĐỘNG...' : 'DEEPFAKE TRAINING PROGRAM // INITIALIZING...'}
                speed={40} delay={400} showCursor
              />
            </div>

            {/* H1 */}
            <div data-reveal className="overflow-visible mb-3 py-3">
              <h1
                className="mx-auto max-w-[760px] text-[2.35rem] sm:text-[2.85rem] md:text-[3.35rem] lg:mx-0 lg:text-[3.65rem] xl:text-[3.9rem] font-black text-white leading-[1.22] uppercase [text-wrap:balance]"
                style={{ fontFamily: "'Outfit', 'Inter', Arial, 'Helvetica Neue', sans-serif", animation: 'fadeSlideUp 0.75s cubic-bezier(0.16,1,0.3,1) both', animationDelay: '0.2s' }}
              >
                {lang === 'vi' ? 'HUẤN LUYỆN' : 'TRAIN YOUR'}<br />
                <span className="inline-block pb-1 text-shimmer">{lang === 'vi' ? 'NHẬN DIỆN DEEPFAKE' : 'DEEPFAKE EYE'}</span>
              </h1>
            </div>

            {/* Tagline */}
            <p data-reveal className="text-gray-400 text-base md:text-lg leading-relaxed mb-6 max-w-lg mx-auto lg:mx-0 lg:border-l-2 lg:border-blue-500/40 lg:pl-4" style={{ fontFamily: "'Inter', Arial, 'Helvetica Neue', sans-serif" }}>
              {lang === 'vi'
                ? 'Học cách nhận biết video, hình ảnh, giọng nói giả mạo AI. Trang bị kỹ năng bảo vệ bản thân và cộng đồng trong kỷ nguyên số.'
                : 'Learn to spot AI-generated videos, images and voices. Build the skills to protect yourself in the age of synthetic media.'}
            </p>

            {/* Stats badges */}
            <div data-reveal className="flex flex-wrap gap-3 mb-7 justify-center lg:justify-start">
              <div className="stat-badge">
                <ShieldCheck size={12} />
                <AnimatedCounter target={protectedUsers || 1250} duration={2.5} /> {lang === 'vi' ? 'HỌC VIÊN VƯỢT QUA' : 'LEARNERS PASSED'}
              </div>
              <div className="stat-badge" style={{ borderColor: 'rgba(245,158,11,0.25)', color: '#F59E0B', background: 'rgba(245,158,11,0.06)' }}>
                <Trophy size={12} />
                <AnimatedCounter target={totalAttempts || 4820} duration={2.5} /> {lang === 'vi' ? 'LƯỢT LUYỆN TẬP' : 'TRAINING SESSIONS'}
              </div>
            </div>

            {/* CTAs */}
            <div data-reveal className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start">
              <MagneticWrapper>
                <GlowButton color="primary" size="lg" icon={<Swords size={16} />} onClick={() => navigate('/challenge')}>
                  {lang === 'vi' ? 'THỬ THÁCH NGAY' : 'TAKE CHALLENGE'}
                </GlowButton>
              </MagneticWrapper>
              <MagneticWrapper>
                <GlowButton color="ghost" size="lg" icon={<BookOpen size={16} />} onClick={() => navigate('/tools/knowledge')}>
                  {lang === 'vi' ? 'Bắt đầu học' : 'Start Learning'}
                </GlowButton>
              </MagneticWrapper>
            </div>
          </div>
        </div>

        {/* Right: chart with HUD */}
        <div ref={chartRef} style={{ willChange: 'transform' }} className="lg:col-span-5">
          <div data-reveal className="relative h-[280px] md:h-[340px] rounded-3xl overflow-hidden border border-white/10 bg-black/40 backdrop-blur-xl shadow-[0_0_40px_rgba(29,111,232,0.15)] hover:border-blue-500/50 transition-all duration-500">
            <AnalyticsChart lang={lang} />
            <ThreatPulse />
          </div>
        </div>
      </div>

      {/* DEEPFENSE ACADEMY INTRO */}
      <div ref={featRef as React.RefObject<HTMLDivElement>} className="mb-16">
        <section data-reveal className="mx-auto max-w-5xl relative overflow-hidden rounded-3xl border border-white/10 bg-black/40 shadow-[0_0_40px_rgba(29,111,232,0.15)] backdrop-blur-xl hover:border-blue-500/40 transition-all duration-500">
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-blue-400/60 to-transparent" />
          <div className="relative z-10 p-6 md:p-8 md:px-10">
            <div className="flex flex-col md:flex-row gap-8 md:items-center">
              <div className="flex-1 text-left">
                <div className="mb-3 flex w-fit items-center gap-2 rounded-full border border-blue-400/25 bg-blue-400/10 px-2.5 py-1 text-[10px] font-mono tracking-widest text-blue-300">
                  <GraduationCap size={12} /> DEEPFENSE ACADEMY
                </div>
                <h2 className="text-2xl md:text-3xl font-black text-white leading-snug uppercase tracking-wide" style={{ fontFamily: "'Outfit', 'Inter', Arial, sans-serif" }}>
                  {lang === 'vi' ? 'Học cách bình tĩnh trước sự dối trá' : 'Learn to stay calm when fake looks real'}
                </h2>
                <p className="mt-3 text-xs md:text-sm leading-relaxed text-gray-400 max-w-lg">
                  {lang === 'vi'
                    ? 'Chỉ vài phút học đúng cách có thể giúp bạn dừng lại, kiểm chứng và không trở thành nạn nhân của nội dung giả.'
                    : 'A few focused lessons can help you pause, verify, and avoid falling victim to synthetic media.'}
                </p>
                <div className="mt-5 flex flex-wrap gap-3">
                  <GlowButton color="primary" size="sm" icon={<GraduationCap size={14} />} onClick={() => navigate('/academy/basics')}>
                    {lang === 'vi' ? 'BẮT ĐẦU HỌC' : 'START COURSE'}
                  </GlowButton>
                  <GlowButton color="ghost" size="sm" icon={<Trophy size={14} />} onClick={() => navigate('/academy')}>
                    {lang === 'vi' ? 'BẢNG VINH DANH' : 'HALL OF FAME'}
                  </GlowButton>
                </div>
              </div>

              <div className="w-full md:w-[380px] flex flex-col gap-2">
                {[
                  [lang === 'vi' ? 'Khởi động nhanh' : 'Easy start', lang === 'vi' ? 'Bài ngắn, trực quan, tương tác trực tiếp.' : 'Short, visual, interactive lessons.'],
                  [lang === 'vi' ? 'Thực chiến' : 'Practical', lang === 'vi' ? 'Tình huống thật: Lừa đảo qua video call.' : 'Real cases: Video call scams.'],
                  [lang === 'vi' ? 'Phần thưởng' : 'Rewards', lang === 'vi' ? 'Hoàn thành để nhận chứng nhận & DPF.' : 'Finish to receive certificate & DPF.'],
                ].map(([title, text]) => (
                  <div key={title} className="rounded-2xl border border-white/5 bg-white/[0.02] hover:bg-white/[0.05] hover:border-blue-500/30 transition-all duration-300 p-3 flex items-center gap-3 text-left">
                    <div className="bg-blue-500/10 p-2 rounded-lg shrink-0"><BookOpen size={16} className="text-blue-400" /></div>
                    <div>
                      <div className="text-white text-[13px] font-bold mb-0.5 leading-none uppercase tracking-wide" style={{ fontFamily: "'Outfit', sans-serif" }}>{title}</div>
                      <div className="text-gray-500 text-[11px] leading-tight">{text}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </div>
      {/* ═══ NEWS + FACTS ═══ */}
      <div ref={newsRef as React.RefObject<HTMLDivElement>} className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-16">

        {/* News feed */}
        <div data-reveal className="lg:col-span-8 bg-black/40 backdrop-blur-xl border border-white/10 rounded-3xl overflow-hidden shadow-[0_0_40px_rgba(29,111,232,0.1)] hover:border-blue-500/40 transition-all duration-500">
          <div className="p-6 border-b border-white/10 bg-black/40 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-secondary/20 p-2 rounded-lg"><AlertTriangle className="text-secondary" size={18} /></div>
              <div>
                <h2 className="text-white font-black text-sm tracking-widest uppercase" style={{ fontFamily: "'Outfit', sans-serif" }}>{t.warning_center}</h2>
                <p className="text-[9px] text-gray-400 font-mono uppercase tracking-tighter mt-1 flex items-center gap-2">
                  <RadarPing size={6} color="secondary" speed="slow" /> LIVE_THREAT_AWARENESS
                </p>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 min-h-[400px]">
            {displayedNews.length > 0 ? displayedNews.map((item, idx) => (
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
            )) : (
              <div className="col-span-2 p-10 text-center text-gray-500 font-mono text-xs uppercase tracking-widest">
                <RadarPing size={8} className="mx-auto mb-4" />
                Initializing Threat Database...
              </div>
            )}
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
          <div className="bg-black/40 backdrop-blur-xl border border-white/10 rounded-3xl p-6 flex-grow relative overflow-hidden group shadow-[0_0_40px_rgba(29,111,232,0.1)] hover:border-blue-500/40 transition-all duration-500">
            <div className="flex items-center gap-3 mb-6 pb-4 border-b border-white/10">
              <div className="bg-blue-500/20 p-2.5 rounded-xl"><Lightbulb className="text-blue-400" size={22} /></div>
              <div>
                <h2 className="text-white font-black text-sm tracking-[0.2em] uppercase" style={{ fontFamily: "'Outfit', sans-serif" }}>{t.knowledge}</h2>
                <div className="h-1 w-8 bg-blue-500/40 mt-2 rounded-full" />
              </div>
            </div>
            <div className="flex flex-col gap-5">
              {displayFacts.map((fact, idx) => (
                <div key={`${factIndex}-${idx}`} className="animate-in slide-in-from-right duration-700 pl-5 border-l-2 border-blue-500/20 hover:border-blue-400 transition-colors relative">
                  <div className="absolute -left-[5px] top-0 w-2 h-2 bg-blue-400 rounded-full shadow-[0_0_8px_rgba(29,111,232,0.8)]" />
                  <div className="text-[10px] text-blue-400/60 font-mono font-bold tracking-widest uppercase mb-1.5">FACT #{(factIndex + idx) % facts.length + 1}</div>
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
      
    </div>
  );
};

export default Home;
