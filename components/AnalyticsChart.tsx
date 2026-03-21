
import React, { useState, useEffect } from 'react';
import { Brain, Users, BarChart3 } from 'lucide-react';
import { Language } from '../types';
import { db } from '../firebase';
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
        setLoading(false);
      }
    };

    fetchData();
    return () => {
      isMounted = false;
    };
  }, []);

  const metricsLabels = lang === 'vi' 
    ? { participation: 'NGƯỜI LÀM THỬ THÁCH', blocked: 'SỐ CÂU TRẢ LỜI ĐÚNG', title: 'THỐNG KÊ THỬ THÁCH', status: 'DỮ LIỆU THỜI GIAN THỰC' }
    : { participation: 'CHALLENGE PARTICIPANTS', blocked: 'CORRECT ANSWERS', title: 'CHALLENGE STATS', status: 'REAL-TIME DATA' };

  return (
    <div className="bg-[#050505] border border-primary/20 rounded-3xl shadow-2xl h-full w-full flex flex-col font-mono relative overflow-hidden">
      <div className="relative z-10 bg-black/40 backdrop-blur-md border-b border-white/5 p-4 flex justify-between items-center shrink-0">
        <div className="flex items-center gap-2">
          <BarChart3 className="text-primary" size={16} />
          <div className="flex flex-col">
            <span className="text-[9px] font-black text-white uppercase tracking-widest leading-none">{metricsLabels.title}</span>
            <span className="text-[7px] text-primary/60 font-mono uppercase mt-0.5">{metricsLabels.status}</span>
          </div>
        </div>
        <div className="flex gap-1.5 p-1 bg-white/5 rounded-xl border border-white/10">
          <button onClick={() => setActiveTab('METRICS')} className={`p-1.5 rounded-lg transition-all ${activeTab === 'METRICS' ? 'bg-primary text-black' : 'text-gray-500'}`}><Users size={12} /></button>
          <button onClick={() => setActiveTab('PSYCHOLOGY')} className={`p-1.5 rounded-lg transition-all ${activeTab === 'PSYCHOLOGY' ? 'bg-primary text-black' : 'text-gray-500'}`}><Brain size={12} /></button>
        </div>
      </div>

      <div className="flex-1 relative p-6 flex flex-col items-center justify-center overflow-y-auto custom-scrollbar">
        {loading ? (
            <div className="w-full flex flex-col items-center gap-6 animate-pulse" aria-label="Loading analytics">
                <div className="w-36 h-36 rounded-full bg-white/5 border-4 border-white/10" />
                <div className="grid grid-cols-2 gap-4 w-full">
                    <div className="h-20 bg-white/5 rounded-2xl" />
                    <div className="h-20 bg-white/5 rounded-2xl" />
                </div>
            </div>
        ) : activeTab === 'METRICS' ? (
          <div className="w-full flex flex-col items-center">
            <div className="relative w-36 h-36 flex items-center justify-center mb-8">
              <svg className="absolute inset-0 w-full h-full -rotate-90" viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="46" fill="none" stroke="rgba(255,255,255,0.03)" strokeWidth="1" />
                <circle cx="50" cy="50" r="46" fill="none" stroke="#00F0FF" strokeWidth="4" strokeDasharray={`${(stats.accuracy / 100) * 289}, 289`} strokeLinecap="round" className="transition-all duration-1000 ease-out" />
              </svg>
              <div className="text-center relative z-10">
                <div className="text-[8px] font-black text-primary/60 tracking-[0.3em] uppercase mb-1">ACCURACY</div>
                <div className="text-4xl font-black text-white italic tracking-tighter">{stats.accuracy}%</div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4 w-full">
              {[
                  { label: metricsLabels.participation, val: stats.totalParticipants.toLocaleString(), color: '#00F0FF' },
                  { label: metricsLabels.blocked, val: stats.blocked.toLocaleString(), color: '#FF2A6D' }
              ].map((s, i) => (
                <div key={i} className="bg-white/5 border border-white/5 rounded-2xl p-4 relative overflow-hidden text-center">
                  <div className="text-[8px] text-gray-500 font-black mb-2 uppercase tracking-widest">{s.label}</div>
                  <div className="text-xl font-black text-white" style={{ color: s.color }}>{s.val}</div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="w-full flex flex-col items-center justify-center animate-in fade-in duration-500">
            <div className="text-center mb-2">
                <div className="text-[10px] text-primary/80 font-bold uppercase tracking-widest">{lang === 'vi' ? 'CHỈ SỐ TÂM LÝ' : 'BEHAVIORAL INDEX'}</div>
            </div>
            <div className="w-full max-w-[240px] flex items-center justify-center">
                <RadarChart data={psychoStats} lang={lang} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const RadarChart = ({ data, lang }: { data: Record<string, number>, lang: Language }) => {
    const [hoveredIndex, setHoveredIndex] = React.useState<number | null>(null);

    const size = 240;
    const center = size / 2;
    const radius = size * 0.35;
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
        <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
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
                        stroke="rgba(255,255,255,0.05)"
                        strokeWidth="1"
                    />
                ))}
                {Array.from({ length: numSides }).map((_, i) => {
                    const { x, y } = getPoint(100, i);
                    return <line key={i} x1={center} y1={center} x2={x} y2={y} stroke="rgba(255,255,255,0.05)" strokeWidth="1" />
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
                    const { x, y } = getPoint(120, i); // Bring labels slightly closer to chart
                    return (
                        <text key={i} x={x} y={y} fill="#aaa" fontSize="9" fontWeight="bold" textAnchor="middle" dominantBaseline="middle" className="font-mono tracking-widest">
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
                            fill="rgba(0, 0, 0, 0.85)" stroke="#00F0FF" strokeWidth="1"
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
