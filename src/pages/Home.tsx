/**
 * DEEPFENSE.ONLINE - Home Page v3.0
 * Core mission: gamified deepfake awareness and user training.
 */

import React, { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { collection, getCountFromServer, query, where } from 'firebase/firestore';
import {
  AlertTriangle,
  ArrowRight,
  BookOpen,
  ExternalLink,
  GraduationCap,
  Lightbulb,
  PhoneCall,
  ShieldCheck,
  Swords,
  Trophy,
} from 'lucide-react';
import { db } from '@/config/firebase';
import { FUN_FACTS, NEWS_DATA, TRANSLATIONS } from '@/data';
import { Language, NewsItem, Season } from '@/types';
import AnalyticsChart from '@/features/dashboard/AnalyticsChart';
import DeepfakeTimeline from '@/components/effects/DeepfakeTimeline';
import ThreatPulse from '@/components/effects/ThreatPulse';
import AnimatedCounter from '@/components/ui/AnimatedCounter';
import GlowButton from '@/components/ui/GlowButton';
import MagneticWrapper from '@/components/ui/MagneticWrapper';
import OptionalVisualAsset from '@/components/ui/OptionalVisualAsset';
import RadarPing from '@/components/ui/RadarPing';
import TypewriterText from '@/components/ui/TypewriterText';
import { visualAssetManifest } from '@/data/visualAssetManifest';
import { useScrollReveal } from '@/hooks/useScrollReveal';

interface HomeProps {
  lang: Language;
  season: Season;
}

const Home: React.FC<HomeProps> = ({ lang, season }) => {
  const t = TRANSLATIONS[lang];
  const facts = FUN_FACTS[lang];
  const navigate = useNavigate();
  const isVi = lang === 'vi';
  const [protectedUsers, setProtectedUsers] = useState(0);
  const [totalAttempts, setTotalAttempts] = useState(0);
  const [factIndex, setFactIndex] = useState(0);
  const [displayedNews, setDisplayedNews] = useState<NewsItem[]>(NEWS_DATA[lang].slice(0, 6));
  const [flippingIndex, setFlippingIndex] = useState<number | null>(null);
  const [liveNews, setLiveNews] = useState<NewsItem[]>(NEWS_DATA[lang]);

  const heroRef = useScrollReveal({ selector: '[data-reveal]', preset: 'fade-up', stagger: 0.1 });
  const academyRef = useScrollReveal({ selector: '[data-reveal]', preset: 'scale-in', stagger: 0.08 });
  const newsRef = useScrollReveal({ selector: '[data-reveal]', preset: 'fade-up', stagger: 0.06 });

  useEffect(() => {
    let ok = true;
    (async () => {
      try {
        const protectedQuery = query(collection(db, 'game_results'), where('score', '>=', 9));
        const [protectedSnapshot, totalSnapshot] = await Promise.all([
          getCountFromServer(protectedQuery),
          getCountFromServer(collection(db, 'game_results')),
        ]);
        if (!ok) return;
        setProtectedUsers(protectedSnapshot.data().count);
        setTotalAttempts(totalSnapshot.data().count);
      } catch {
        // Keep demo counters when Firebase stats are unavailable.
      }
    })();
    return () => { ok = false; };
  }, []);

  useEffect(() => {
    let ignore = false;
    setLiveNews(NEWS_DATA[lang]);
    setDisplayedNews(NEWS_DATA[lang].slice(0, 6));

    (async () => {
      try {
        const search = isVi ? 'deepfake lừa đảo' : 'deepfake scam';
        const rssUrl = `https://news.google.com/rss/search?q=${encodeURIComponent(search)}&hl=${isVi ? 'vi' : 'en-US'}&gl=${isVi ? 'VN' : 'US'}`;
        const response = await fetch(`https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(rssUrl)}`);
        const { status, items } = await response.json();
        if (ignore || status !== 'ok' || !items?.length) return;
        const nextNews: NewsItem[] = items.map((item: any) => {
          const date = new Date(item.pubDate);
          return {
            tag: t.latest_live,
            title: String(item.title || '').split(' - ')[0],
            date: `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`,
            loss: t.tbd,
            desc: String(item.description || '').replace(/<[^>]*>/g, '').substring(0, 118) + '...',
            url: item.link,
          };
        });
        setLiveNews(nextNews);
        setDisplayedNews(nextNews.slice(0, 6));
      } catch {
        // Static news remains available.
      }
    })();

    return () => { ignore = true; };
  }, [lang, isVi, t.latest_live, t.tbd]);

  useEffect(() => {
    let ok = true;
    let slot = 0;
    let pool = 6;
    const newsTimer = window.setInterval(() => {
      if (!ok || liveNews.length <= 6) return;
      const index = slot % 6;
      const nextItem = liveNews[pool % liveNews.length];
      setFlippingIndex(index);
      window.setTimeout(() => {
        if (!ok) return;
        setDisplayedNews((previous) => {
          const next = [...previous];
          next[index] = nextItem;
          return next;
        });
      }, 260);
      window.setTimeout(() => { if (ok) setFlippingIndex(null); }, 540);
      slot += 1;
      pool += 1;
    }, 5200);

    const factTimer = window.setInterval(() => {
      if (ok) setFactIndex((previous) => (previous + 3) % facts.length);
    }, 10000);

    return () => {
      ok = false;
      window.clearInterval(newsTimer);
      window.clearInterval(factTimer);
    };
  }, [liveNews, facts.length]);

  const displayFacts = useMemo(
    () => [0, 1, 2].map((offset) => facts[(factIndex + offset) % facts.length]),
    [facts, factIndex],
  );

  const journeyItems = [
    {
      step: '01',
      title: isVi ? 'Học dấu hiệu nhận diện' : 'Learn the signals',
      text: isVi ? 'Bài học ngắn, dễ bắt đầu, tập trung vào video, ảnh và giọng nói giả.' : 'Short lessons focused on fake videos, images, and voices.',
    },
    {
      step: '02',
      title: isVi ? 'Luyện trong tình huống thật' : 'Practice real scenarios',
      text: isVi ? 'Thử thách mô phỏng tin nhắn, cuộc gọi, video gấp gáp và yêu cầu chuyển tiền.' : 'Simulated messages, calls, urgent videos, and payment requests.',
    },
    {
      step: '03',
      title: isVi ? 'Nhận chứng nhận & DPF' : 'Earn certificate & DPF',
      text: isVi ? 'Hoàn thành khóa học để mở certificate, bảng vinh danh và điểm thưởng.' : 'Complete the course to unlock certificate, hall of fame, and rewards.',
    },
  ];

  return (
    <div className="animate-in fade-in duration-500">
      <DeepfakeTimeline lang={lang} />

      <div className="container mx-auto max-w-7xl px-4 py-8 md:py-12">
        <section ref={heroRef as React.RefObject<HTMLDivElement>} className="relative mb-16 grid min-h-[520px] grid-cols-1 items-center gap-7 overflow-visible lg:grid-cols-12 lg:gap-9">
          <div className="pointer-events-none absolute inset-x-0 top-6 h-[300px] overflow-hidden opacity-80">
            <div className="absolute left-1/2 top-8 h-56 w-[min(760px,90vw)] -translate-x-1/2 rounded-full bg-[radial-gradient(ellipse_at_center,rgba(29,111,232,0.075),transparent_68%)] blur-2xl" />
            {season === 'SUMMER' && <div className="absolute right-[12%] top-16 h-24 w-24 rounded-full bg-orange-500/8 blur-3xl" />}
          </div>

          <div className="relative z-10 text-center lg:col-span-7 lg:text-left">
            <div data-reveal className="mb-5 inline-flex items-center gap-2 rounded-full border border-blue-500/20 bg-blue-500/10 px-4 py-1.5 font-mono text-[10px] tracking-widest text-blue-300">
              <img src="/logo/favicon-32x32.png" alt="" className="h-4 w-4 rounded-md object-contain" />
              <TypewriterText
                text={isVi ? 'CHƯƠNG TRÌNH HUẤN LUYỆN DEEPFAKE // SẴN SÀNG' : 'DEEPFAKE TRAINING PROGRAM // READY'}
                speed={40}
                delay={400}
                showCursor
              />
            </div>

            <div data-reveal className="overflow-visible py-3">
              <h1
                className="mx-auto max-w-[760px] text-[2.45rem] font-black uppercase leading-[1.18] text-white [text-wrap:balance] sm:text-[3rem] md:text-[3.6rem] lg:mx-0 lg:text-[3.9rem]"
                style={{ fontFamily: "'Outfit', 'Inter', Arial, sans-serif" }}
              >
                {isVi ? 'Huấn luyện' : 'Train your'}<br />
                <span className="inline-block pb-1 text-shimmer">{isVi ? 'nhận diện deepfake' : 'deepfake eye'}</span>
              </h1>
            </div>

            <p data-reveal className="mx-auto mb-6 max-w-xl text-base leading-8 text-gray-400 md:text-lg lg:mx-0 lg:border-l-2 lg:border-blue-500/40 lg:pl-4">
              {isVi
                ? 'Học cách nhận biết video, hình ảnh và giọng nói giả mạo AI. Trang bị kỹ năng tự vệ trước lừa đảo số bằng bài học ngắn, thử thách mô phỏng và điểm thưởng DPF.'
                : 'Learn to spot AI-generated videos, images, and voices. Build practical self-defense skills through short lessons, simulations, and DPF rewards.'}
            </p>

            <div data-reveal className="mb-7 flex flex-wrap justify-center gap-3 lg:justify-start">
              <div className="stat-badge">
                <ShieldCheck size={12} />
                <AnimatedCounter target={protectedUsers || 1250} duration={2.5} /> {isVi ? 'HỌC VIÊN VƯỢT QUA' : 'LEARNERS PASSED'}
              </div>
              <div className="stat-badge" style={{ borderColor: 'rgba(245,158,11,0.25)', color: '#F59E0B', background: 'rgba(245,158,11,0.06)' }}>
                <Trophy size={12} />
                <AnimatedCounter target={totalAttempts || 4820} duration={2.5} /> {isVi ? 'LƯỢT LUYỆN TẬP' : 'TRAINING SESSIONS'}
              </div>
            </div>

            <div data-reveal className="flex flex-col justify-center gap-3 sm:flex-row lg:justify-start">
              <MagneticWrapper>
                <GlowButton color="primary" size="lg" icon={<GraduationCap size={16} />} onClick={() => navigate('/academy')}>
                  {isVi ? 'BẮT ĐẦU HỌC' : 'START LEARNING'}
                </GlowButton>
              </MagneticWrapper>
              <MagneticWrapper>
                <GlowButton color="secondary" size="lg" icon={<Swords size={16} />} onClick={() => navigate('/challenge')}>
                  {isVi ? 'THỬ THÁCH NGAY' : 'TAKE CHALLENGE'}
                </GlowButton>
              </MagneticWrapper>
              <MagneticWrapper>
                <GlowButton color="ghost" size="lg" icon={<BookOpen size={16} />} onClick={() => navigate('/tools')}>
                  {isVi ? 'MỞ CÔNG CỤ' : 'OPEN TOOLS'}
                </GlowButton>
              </MagneticWrapper>
            </div>
          </div>

          <div className="relative z-10 lg:col-span-5">
            <div data-reveal className="relative h-[300px] overflow-hidden rounded-3xl border border-white/10 bg-black/40 shadow-[0_0_40px_rgba(29,111,232,0.15)] backdrop-blur-xl transition-all duration-500 hover:border-blue-500/50 md:h-[360px]">
              <OptionalVisualAsset
                src={visualAssetManifest.website.hero}
                alt=""
                className="pointer-events-none absolute inset-0 opacity-35 mix-blend-screen"
                imgClassName="h-full w-full object-cover"
              />
              <AnalyticsChart lang={lang} />
              <ThreatPulse />
            </div>
          </div>
        </section>

        <section ref={academyRef as React.RefObject<HTMLDivElement>} data-reveal className="mx-auto mb-16 max-w-6xl overflow-hidden rounded-3xl border border-white/10 bg-black/40 shadow-[0_0_40px_rgba(29,111,232,0.12)] backdrop-blur-xl transition-all duration-500 hover:border-blue-500/35">
          <div className="border-b border-white/10 bg-white/[0.025] px-5 py-4 md:px-7">
            <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
              <div className="flex w-fit items-center gap-2 rounded-full border border-blue-400/25 bg-blue-400/10 px-3 py-1.5 font-mono text-[10px] tracking-widest text-blue-300">
                <GraduationCap size={12} /> DEEPFENSE ACADEMY
              </div>
              <button onClick={() => navigate('/academy')} className="group inline-flex w-fit items-center gap-2 font-mono text-[10px] font-black uppercase tracking-widest text-blue-300 transition-colors hover:text-blue-100">
                {isVi ? 'Bảng vinh danh' : 'Hall of fame'} <ArrowRight size={13} className="transition-transform group-hover:translate-x-1" />
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6 p-5 md:p-7 lg:grid-cols-12 lg:items-center">
            <div className="lg:col-span-6">
              <OptionalVisualAsset
                src={visualAssetManifest.website.academy}
                alt=""
                className="mb-5 overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03]"
                imgClassName="aspect-[16/9] w-full object-cover"
              />
              <h2 className="text-left text-2xl font-black leading-tight text-white md:text-3xl" style={{ fontFamily: "'Outfit', 'Inter', Arial, sans-serif" }}>
                {isVi ? 'Học cách bình tĩnh trước một nội dung quá giống thật.' : 'Learn to stay calm when fake looks real.'}
              </h2>
              <p className="mt-4 max-w-2xl text-left text-sm leading-7 text-gray-400">
                {isVi
                  ? 'Một giọng nói quen thuộc, một video gấp gáp, một tin nhắn đòi chuyển tiền. Chỉ vài phút học đúng cách có thể giúp bạn dừng lại, kiểm chứng và không tiếp tay cho nội dung giả.'
                  : 'A familiar voice, an urgent video, a payment request. A few focused lessons can help you pause, verify, and avoid amplifying synthetic media.'}
              </p>
              <div className="mt-5 flex flex-col gap-3 sm:flex-row">
                <GlowButton color="primary" size="md" icon={<GraduationCap size={16} />} onClick={() => navigate('/academy')}>
                  {isVi ? 'VÀO KHÓA HỌC' : 'OPEN COURSE'}
                </GlowButton>
                <GlowButton color="ghost" size="md" icon={<Trophy size={16} />} onClick={() => navigate('/academy')}>
                  {isVi ? 'BẢNG VINH DANH' : 'HALL OF FAME'}
                </GlowButton>
              </div>
            </div>

            <div className="grid gap-3 lg:col-span-6">
              <OptionalVisualAsset
                src={visualAssetManifest.moduleHeaders.deepfenseCheck}
                alt={isVi ? 'Minh họa quy trình Deepfense Check' : 'Deepfense Check path illustration'}
                className="overflow-hidden rounded-2xl border border-blue-400/20 bg-blue-500/10"
                imgClassName="aspect-[16/9] w-full object-cover"
              />
              {journeyItems.map((item) => (
                <div key={item.step} className="grid grid-cols-[42px_1fr] gap-3 rounded-2xl border border-white/10 bg-white/[0.035] p-4 text-left transition-all duration-300 hover:border-blue-400/25 hover:bg-white/[0.055]">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-blue-400/20 bg-blue-400/10 text-xs font-black text-blue-200">{item.step}</div>
                  <div>
                    <div className="text-sm font-black text-white">{item.title}</div>
                    <div className="mt-1 text-xs leading-relaxed text-gray-500">{item.text}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section ref={newsRef as React.RefObject<HTMLDivElement>} className="mb-16 grid grid-cols-1 gap-6 lg:grid-cols-12">
          <div data-reveal className="overflow-hidden rounded-3xl border border-white/10 bg-black/40 shadow-[0_0_40px_rgba(29,111,232,0.1)] backdrop-blur-xl transition-all duration-500 hover:border-blue-500/35 lg:col-span-8">
            <div className="flex items-center justify-between border-b border-white/10 bg-black/40 p-6">
              <div className="flex items-center gap-3">
                <div className="rounded-lg bg-secondary/20 p-2"><AlertTriangle className="text-secondary" size={18} /></div>
                <div>
                  <h2 className="text-sm font-bold uppercase tracking-wide text-white">{t.warning_center}</h2>
                  <p className="mt-1 flex items-center gap-2 font-mono text-[9px] uppercase tracking-tighter text-gray-400">
                    <RadarPing size={6} color="secondary" speed="slow" /> LIVE_THREAT_AWARENESS
                  </p>
                </div>
              </div>
            </div>
            <div className="grid min-h-[400px] grid-cols-1 md:grid-cols-2">
              {displayedNews.length > 0 ? displayedNews.map((item, index) => (
                <a key={`${item.title}-${index}`} href={item.url} target="_blank" rel="noopener noreferrer" className={`news-card group flex flex-col gap-2.5 border-b border-white/5 p-5 ${flippingIndex === index ? 'animate-pulse opacity-50' : ''}`}>
                  <div className="flex items-center justify-between">
                    <span className="rounded bg-red-500/10 px-2 py-0.5 text-[9px] font-bold uppercase tracking-widest text-red-400">{item.tag}</span>
                    <span className="font-mono text-[10px] text-gray-600">{item.date}</span>
                  </div>
                  <h3 className="line-clamp-2 text-sm font-bold leading-snug text-white transition-colors group-hover:text-blue-400">{item.title}</h3>
                  <p className="line-clamp-2 text-[11px] leading-relaxed text-gray-500">{item.desc}</p>
                  <div className="mt-auto flex items-center justify-end">
                    <ExternalLink size={11} className="text-gray-700 transition-colors group-hover:text-blue-400" />
                  </div>
                </a>
              )) : (
                <div className="col-span-2 p-10 text-center font-mono text-xs uppercase tracking-widest text-gray-500">
                  <RadarPing size={8} className="mx-auto mb-4" />
                  Initializing Threat Database...
                </div>
              )}
            </div>
          </div>

          <div className="flex flex-col gap-5 lg:col-span-4">
            <button data-reveal onClick={() => navigate('/tools/crisis')} className="group flex items-center gap-4 rounded-2xl bg-secondary p-6 text-left shadow-lg shadow-secondary/20 transition-all hover:bg-red-500">
              <div className="rounded-xl bg-white/20 p-3.5 text-white transition-transform group-hover:scale-110"><PhoneCall size={28} /></div>
              <div>
                <div className="text-base font-bold uppercase leading-none tracking-wide text-white">{t.hotline}</div>
                <div className="mt-1.5 font-mono text-[10px] uppercase tracking-tighter text-white/70">{t.hotline_subtext}</div>
              </div>
            </button>

            <div data-reveal className="group relative flex-grow overflow-hidden rounded-3xl border border-white/10 bg-black/40 p-6 shadow-[0_0_40px_rgba(29,111,232,0.1)] backdrop-blur-xl transition-all duration-500 hover:border-blue-500/35">
              <div className="mb-6 flex items-center gap-3 border-b border-white/10 pb-4">
                <div className="rounded-xl bg-blue-500/20 p-2.5"><Lightbulb className="text-blue-400" size={22} /></div>
                <div>
                  <h2 className="text-sm font-bold uppercase tracking-wider text-white">{t.knowledge}</h2>
                  <div className="mt-2 h-1 w-8 rounded-full bg-blue-500/40" />
                </div>
              </div>
              <div className="flex flex-col gap-5">
                {displayFacts.map((fact, index) => (
                  <div key={`${factIndex}-${index}`} className="animate-in slide-in-from-right relative border-l-2 border-blue-500/20 pl-5 duration-700 hover:border-blue-400">
                    <div className="absolute -left-[5px] top-0 h-2 w-2 rounded-full bg-blue-400 shadow-[0_0_8px_rgba(29,111,232,0.8)]" />
                    <div className="mb-1.5 font-mono text-[10px] font-bold uppercase tracking-widest text-blue-400/60">FACT #{(factIndex + index) % facts.length + 1}</div>
                    <h4 className="mb-2 text-base font-black uppercase italic leading-tight text-white">{fact.title}</h4>
                    <p className="line-clamp-3 text-xs leading-relaxed text-gray-400">{fact.content}</p>
                  </div>
                ))}
              </div>
              <div className="pointer-events-none absolute -bottom-12 -right-12 opacity-[0.03] transition-all duration-1000 group-hover:opacity-[0.06]">
                <Lightbulb size={240} />
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Home;
