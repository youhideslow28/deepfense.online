
import React, { useState, useEffect } from 'react';
import { Brain, Users, BarChart3 } from 'lucide-react';
import { Language } from '@/types';
import { db } from '@/config/firebase';
import { collection, getDocs, getCountFromServer, getAggregateFromServer, sum, query, limit, orderBy } from 'firebase/firestore';

const AnalyticsChart: React.FC<{ lang: Language }> = ({ lang }) => {
  const [activeTab, setActiveTab] = useState<'METRICS' | 'PSYCHOLOGY'>('METRICS');
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalParticipants: 0,
    accuracy: 0,
    blocked: 0,
  });
  const [psychoStats, setPsychoStats] = useState({
    threatPerception: 0,
    proactiveStance: 0,
    selfEfficacy: 0,
    behavioralIntent: 0,
    techStance: 0,
  });
  
  useEffect(() => {
    let isMounted = true;
    const fetchData = async () => {
      try {
        // 1. Lấy dữ liệu GAME RESULTS
        const gameCacheKey = 'deepfense_game_stats_cache';
        const gameCacheTime = sessionStorage.getItem(gameCacheKey + '_time');
        let totalGames = 0;
        let totalScore = 0;
        let fetchGameFromFirebase = false;

        if (sessionStorage.getItem(gameCacheKey) && gameCacheTime && (Date.now() - parseInt(gameCacheTime) < 5 * 60 * 1000)) {
            try {
                const cachedData = JSON.parse(sessionStorage.getItem(gameCacheKey)!);
                totalGames = cachedData.totalGames;
                totalScore = cachedData.totalScore;
            } catch (error) {
                console.warn("Lỗi đọc cache Game Stats, xóa cache.");
                sessionStorage.removeItem(gameCacheKey);
                fetchGameFromFirebase = true;
            }
        } else {
            fetchGameFromFirebase = true;
        }
        
        if (fetchGameFromFirebase) {
            const gameRef = collection(db, "game_results");
            const [countSnap, aggrSnap] = await Promise.all([
              getCountFromServer(gameRef),
              getAggregateFromServer(gameRef, { totalScore: sum('score') })
            ]);
            totalGames = countSnap.data().count;
            totalScore = aggrSnap.data().totalScore || 0;
            sessionStorage.setItem(gameCacheKey, JSON.stringify({ totalGames, totalScore }));
            sessionStorage.setItem(gameCacheKey + '_time', Date.now().toString());
        }

        // 2. Lấy dữ liệu SURVEYS
        // BẢO VỆ TÀI NGUYÊN: Caching dữ liệu để không đốt cháy 50.000 reads/ngày của Firebase
        const cacheKey = 'deepfense_psycho_cache';
        const cacheTime = sessionStorage.getItem(cacheKey + '_time');
        let finalPsychoStats = { ...psychoStats };
        let fetchPsychoFromFirebase = false;

        if (sessionStorage.getItem(cacheKey) && cacheTime && (Date.now() - parseInt(cacheTime) < 5 * 60 * 1000)) {
            // Tái sử dụng dữ liệu nếu chưa qua 5 phút
            try {
                finalPsychoStats = JSON.parse(sessionStorage.getItem(cacheKey)!);
                setPsychoStats(finalPsychoStats);
            } catch (error) {
                console.warn("Lỗi đọc cache Psycho Stats, xóa cache.");
                sessionStorage.removeItem(cacheKey);
                fetchPsychoFromFirebase = true;
            }
        } else {
            fetchPsychoFromFirebase = true;
        }
        
        if (fetchPsychoFromFirebase) {
            const qSurveys = query(collection(db, "surveys"), orderBy("created_at", "desc"), limit(200));
            const surveySnap = await getDocs(qSurveys);
            
            let threatPerceptionSum = 0;
            let proactiveStanceSum = 0;
            let selfEfficacySum = 0;
            let behavioralIntentSum = 0;
            let techStanceSum = 0;
            let validSurveyCount = 0;

            surveySnap.forEach(doc => {
                const data = doc.data();
                const answers = data.answers || [];
                if (answers.length >= 13) {
                    validSurveyCount++;
                    threatPerceptionSum += (answers[1] || 0) + (answers[2] || 0);
                    proactiveStanceSum += (answers[3] || 0) + (answers[9] || 0);
                    selfEfficacySum += (answers[7] || 0) + (answers[8] || 0);
                    behavioralIntentSum += (answers[12] || 0) + (answers[10] || 0);
                    techStanceSum += (answers[5] || 0) + (4 - (answers[6] || 0));
                }
            });

            if (validSurveyCount > 0) {
                const maxScorePerDim = 8;
                finalPsychoStats = {
                    threatPerception: Math.round((threatPerceptionSum / (validSurveyCount * maxScorePerDim)) * 100),
                    proactiveStance: Math.round((proactiveStanceSum / (validSurveyCount * maxScorePerDim)) * 100),
                    selfEfficacy: Math.round((selfEfficacySum / (validSurveyCount * maxScorePerDim)) * 100),
                    behavioralIntent: Math.round((behavioralIntentSum / (validSurveyCount * maxScorePerDim)) * 100),
                    techStance: Math.round((techStanceSum / (validSurveyCount * maxScorePerDim)) * 100),
                };
                setPsychoStats(finalPsychoStats);
                sessionStorage.setItem(cacheKey, JSON.stringify(finalPsychoStats));
                sessionStorage.setItem(cacheKey + '_time', Date.now().toString());
            }
        }

        // 3. Tính toán
        if (!isMounted) return;
        setStats({
            totalParticipants: totalGames,
            blocked: totalScore, // Mỗi câu đúng coi như chặn được 1 scam
            // Giả sử 1 game có 10 levels
            accuracy: totalGames > 0 ? Math.round((totalScore / (totalGames * 10)) * 100) : 0,
        });

      } catch (error) {
        if (!isMounted) return;
        console.error("Error fetching analytics:", error);
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchData();
    return () => {
      isMounted = false;
    };
  }, []);

  const metricsLabels = lang === 'vi'
    ? { participation: 'NGƯỜI LÀM THỬ THÁCH', blocked: 'SỐ CÂU TRẢ LỜI ĐÚNG', title: 'THỐNG KÊ THỬ THÁCH', status: 'DỮ LIỆU TỪ FIREBASE' }
    : { participation: 'CHALLENGE PARTICIPANTS', blocked: 'CORRECT ANSWERS', title: 'CHALLENGE STATS', status: 'FIREBASE DATA' };

  const psychologyItems = [
    { label: lang === 'vi' ? 'Nhận thức' : 'Awareness', value: psychoStats.threatPerception },
    { label: lang === 'vi' ? 'Chủ động' : 'Proactive', value: psychoStats.proactiveStance },
    { label: lang === 'vi' ? 'Tự vệ' : 'Defense', value: psychoStats.selfEfficacy },
    { label: lang === 'vi' ? 'Hành vi' : 'Intent', value: psychoStats.behavioralIntent },
    { label: lang === 'vi' ? 'Niềm tin' : 'Trust', value: psychoStats.techStance },
  ];

  return (
    <div data-testid="analytics-chart" className="relative z-10 flex h-full w-full flex-col overflow-hidden rounded-3xl border border-blue-200/80 bg-white/95 font-mono shadow-[0_18px_46px_rgba(15,50,100,0.14)] ring-1 ring-blue-100/70 dark:border-primary/15 dark:bg-[#05070d]/95 dark:shadow-[0_18px_60px_rgba(0,0,0,0.34)] dark:ring-white/[0.03]">
      <div className="relative z-10 flex shrink-0 items-center justify-between border-b border-blue-100/80 bg-white/85 px-4 py-3 backdrop-blur-md dark:border-white/5 dark:bg-black/45">
        <div className="flex items-center gap-2">
          <BarChart3 className="text-primary" size={16} />
          <div className="flex flex-col">
            <span className="text-[9px] font-black uppercase leading-none tracking-[0.12em] text-slate-900 dark:text-white">{metricsLabels.title}</span>
            <span className="mt-0.5 font-mono text-[7px] uppercase tracking-[0.08em] text-primary/70 dark:text-primary/60">{metricsLabels.status}</span>
          </div>
        </div>
        <div className="flex gap-1.5 rounded-xl border border-blue-100 bg-blue-50/80 p-1 dark:border-white/10 dark:bg-white/5">
          <button
            type="button"
            aria-label={lang === 'vi' ? 'Xem thống kê thử thách' : 'View challenge stats'}
            title={lang === 'vi' ? 'Thống kê thử thách' : 'Challenge stats'}
            onClick={() => setActiveTab('METRICS')}
            className={`rounded-lg p-1.5 transition-all ${activeTab === 'METRICS' ? 'bg-primary text-white shadow-sm' : 'text-slate-500 hover:bg-white hover:text-slate-800 dark:text-slate-300 dark:hover:bg-white/10 dark:hover:text-white'}`}
          >
            <Users size={12} />
          </button>
          <button
            type="button"
            aria-label={lang === 'vi' ? 'Xem chỉ số tâm lý' : 'View behavioral index'}
            title={lang === 'vi' ? 'Chỉ số tâm lý' : 'Behavioral index'}
            onClick={() => setActiveTab('PSYCHOLOGY')}
            className={`rounded-lg p-1.5 transition-all ${activeTab === 'PSYCHOLOGY' ? 'bg-primary text-white shadow-sm' : 'text-slate-500 hover:bg-white hover:text-slate-800 dark:text-slate-300 dark:hover:bg-white/10 dark:hover:text-white'}`}
          >
            <Brain size={12} />
          </button>
        </div>
      </div>

      <div className="relative flex flex-1 flex-col items-center justify-center overflow-hidden bg-[radial-gradient(circle_at_50%_20%,rgba(29,111,232,0.10),transparent_42%),linear-gradient(180deg,rgba(248,250,252,0.96),rgba(239,246,255,0.82))] p-4 dark:bg-[radial-gradient(circle_at_50%_10%,rgba(29,111,232,0.16),transparent_42%),linear-gradient(180deg,rgba(5,7,13,0.96),rgba(8,13,23,0.98))] md:p-5">
        {loading ? (
            <div className="flex w-full flex-col items-center gap-5 animate-pulse" aria-label="Loading analytics">
                <div className="h-36 w-36 rounded-full border-4 border-blue-100 bg-blue-50 dark:border-white/10 dark:bg-white/5" />
                <div className="grid w-full grid-cols-2 gap-3">
                    <div className="h-20 rounded-2xl bg-blue-50 dark:bg-white/5" />
                    <div className="h-20 rounded-2xl bg-blue-50 dark:bg-white/5" />
                </div>
            </div>
        ) : activeTab === 'METRICS' ? (
          <div className="grid h-full w-full grid-cols-1 items-center gap-3 md:grid-cols-[minmax(150px,190px)_1fr] md:gap-4">
            <div className="relative mx-auto flex h-32 w-32 items-center justify-center sm:h-36 sm:w-36 md:h-40 md:w-40">
              <svg className="absolute inset-0 h-full w-full -rotate-90" viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="46" fill="none" stroke="rgba(29,111,232,0.14)" strokeWidth="1" />
                <circle cx="50" cy="50" r="46" fill="none" stroke="#00F0FF" strokeWidth="4" strokeDasharray={`${(stats.accuracy / 100) * 289}, 289`} strokeLinecap="round" className="transition-all duration-1000 ease-out" />
              </svg>
              <div className="relative z-10 text-center">
                <div className="mb-1 text-[10px] font-black uppercase tracking-[0.26em] text-primary/70 dark:text-primary/65">ACCURACY</div>
                <div className="text-[2.35rem] font-black italic leading-none tracking-tight text-slate-950 dark:text-white sm:text-[2.55rem] md:text-[2.85rem]">{stats.accuracy}%</div>
              </div>
            </div>
            <div className="grid w-full grid-cols-2 gap-2 md:grid-cols-1 md:gap-3">
              {[
                  { label: metricsLabels.participation, val: stats.totalParticipants.toLocaleString(), className: 'text-cyan-500 dark:text-cyan-300' },
                  { label: metricsLabels.blocked, val: stats.blocked.toLocaleString(), className: 'text-rose-500 dark:text-rose-300' }
              ].map((s, i) => (
                <div key={i} className="relative overflow-hidden rounded-2xl border border-blue-100 bg-white/80 px-2 py-2.5 text-center shadow-sm dark:border-white/[0.08] dark:bg-white/[0.055] md:px-4 md:py-3">
                  <div className="mb-1 text-[7px] font-black uppercase tracking-[0.08em] text-slate-500 dark:text-slate-400 md:mb-1.5 md:text-[8px] md:tracking-[0.12em]">{s.label}</div>
                  <div className={`text-xl font-black leading-none md:text-2xl ${s.className}`}>{s.val}</div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="grid h-full w-full grid-cols-1 items-center gap-3 animate-in fade-in duration-500 sm:grid-cols-[minmax(178px,220px)_1fr]">
            <div className="flex flex-col items-center justify-center">
              <div className="mb-0.5 text-center">
                  <div className="text-[10px] font-bold uppercase tracking-[0.12em] text-primary/85">{lang === 'vi' ? 'CHỈ SỐ TÂM LÝ' : 'BEHAVIORAL INDEX'}</div>
              </div>
              <div className="flex w-full max-w-[190px] items-center justify-center sm:max-w-[210px] md:max-w-[220px]">
                  <RadarChart data={psychoStats} lang={lang} />
              </div>
            </div>
            <div className="hidden w-full grid-cols-1 gap-1.5 sm:grid">
              {psychologyItems.map((item) => (
                <div key={item.label} className="rounded-xl border border-blue-100 bg-white/75 px-3 py-1.5 shadow-sm dark:border-white/[0.08] dark:bg-white/[0.05]">
                  <div className="mb-1 flex items-center justify-between gap-2">
                    <span className="text-[9px] font-black uppercase tracking-[0.08em] text-slate-600 dark:text-slate-300">{item.label}</span>
                    <span className="text-xs font-black text-primary">{item.value}%</span>
                  </div>
                  <div className="h-1.5 overflow-hidden rounded-full bg-slate-200 dark:bg-white/10">
                    <div className="h-full rounded-full bg-primary transition-all duration-700" style={{ width: `${Math.min(Math.max(item.value, 0), 100)}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const RadarChart = ({ data, lang }: { data: Record<string, number>, lang: Language }) => {
    const [hoveredIndex, setHoveredIndex] = React.useState<number | null>(null);

    const size = 220;
    const center = size / 2;
    const radius = size * 0.31;
    const numSides = 5;
    const angleSlice = (Math.PI * 2) / numSides;

    const labels = lang === 'vi' 
        ? ['NHẬN THỨC', 'CHỦ ĐỘNG', 'TỰ VỆ', 'HÀNH VI', 'NIỀM TIN']
        : ['AWARENESS', 'PROACTIVE', 'DEFENSE', 'INTENT', 'TRUST'];
    
    const values = [
        data.threatPerception,
        data.proactiveStance,
        data.selfEfficacy,
        data.behavioralIntent,
        data.techStance
    ];

    const getPoint = (value: number, index: number, r = radius) => {
        const angle = angleSlice * index - Math.PI / 2;
        const x = center + r * (value / 100) * Math.cos(angle);
        const y = center + r * (value / 100) * Math.sin(angle);
        return { x, y };
    };

    const points = values.map((val, i) => {
        const { x, y } = getPoint(val, i);
        return `${x},${y}`;
    }).join(' ');

    return (
        <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="aspect-square w-full max-w-[190px] overflow-visible sm:max-w-[210px] md:max-w-[220px]">
            <g>
                {/* Grid lines and axes */}
                {[0.25, 0.5, 0.75, 1].map((val, i) => (
                    <polygon 
                        key={i}
                        points={Array.from({ length: numSides }).map((_, j) => {
                            const { x, y } = getPoint(100, j, radius * val);
                            return `${x},${y}`;
                        }).join(' ')}
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1"
                        className="text-blue-200/80 dark:text-white/10"
                    />
                ))}
                {Array.from({ length: numSides }).map((_, i) => {
                    const { x, y } = getPoint(100, i);
                    return <line key={i} x1={center} y1={center} x2={x} y2={y} stroke="currentColor" strokeWidth="1" className="text-blue-200/80 dark:text-white/10" />
                })}

                {/* Data Polygon */}
                <polygon points={points} fill="rgba(0, 240, 255, 0.2)" stroke="#00F0FF" strokeWidth="2" className="transition-all duration-1000" />

                {/* Data Points */}
                {values.map((val, i) => {
                    const { x, y } = getPoint(val, i);
                    return (
                        <g key={i}>
                            <circle 
                                cx={x} cy={y} 
                                r={hoveredIndex === i ? "6" : "3"} 
                                fill={hoveredIndex === i ? "#fff" : "#00F0FF"} 
                                className="transition-all duration-300 shadow-[0_0_10px_#00F0FF]" 
                            />
                            {/* Vùng vô hình to hơn để dễ dàng bắt sự kiện rê chuột */}
                            <circle cx={x} cy={y} r="15" fill="transparent" className="cursor-pointer outline-none" onMouseEnter={() => setHoveredIndex(i)} onMouseLeave={() => setHoveredIndex(null)} />
                        </g>
                    );
                })}

                {/* Labels */}
                {labels.map((label, i) => {
                    const { x, y } = getPoint(100, i, radius + 28);
                    return (
                        <text key={i} x={x} y={y} fill="currentColor" fontSize="9" fontWeight="bold" textAnchor="middle" dominantBaseline="middle" className="font-sans tracking-[0.08em] text-slate-600 dark:text-slate-300">
                            {label}
                        </text>
                    );
                })}

                {/* Tooltip hiển thị số liệu */}
                {hoveredIndex !== null && (
                    <g className="pointer-events-none animate-in zoom-in duration-200">
                        <rect 
                            x={getPoint(values[hoveredIndex], hoveredIndex).x - 22} 
                            y={getPoint(values[hoveredIndex], hoveredIndex).y - 32} 
                            width="44" height="20" rx="4"
                            fill="rgba(15, 23, 42, 0.92)" stroke="#00F0FF" strokeWidth="1"
                        />
                        <text 
                            x={getPoint(values[hoveredIndex], hoveredIndex).x} 
                            y={getPoint(values[hoveredIndex], hoveredIndex).y - 18} 
                            fill="#fff" fontSize="11" fontWeight="bold" textAnchor="middle" className="font-mono tracking-wider"
                        >
                            {values[hoveredIndex]}%
                        </text>
                    </g>
                )}
            </g>
        </svg>
    );
};

export default AnalyticsChart;
