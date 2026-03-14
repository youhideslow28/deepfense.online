
import React, { useState, useEffect } from 'react';
import { Brain, Users, BarChart3 } from 'lucide-react';
import { Language } from '../types';
import { db } from '../firebase';
import { collection, getDocs } from 'firebase/firestore';

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
    const fetchData = async () => {
      try {
        // 1. Lấy dữ liệu GAME RESULTS
        const gameSnap = await getDocs(collection(db, "game_results"));
        const totalGames = gameSnap.size;
        let totalScore = 0;

        gameSnap.forEach(doc => {
            const data = doc.data();
            const score = data.score || 0;
            totalScore += score;
        });

        // 2. Lấy dữ liệu SURVEYS
        const surveySnap = await getDocs(collection(db, "surveys"));
        const totalSurveys = surveySnap.size;
        
        let threatPerceptionSum = 0;
        let proactiveStanceSum = 0;
        let selfEfficacySum = 0;
        let behavioralIntentSum = 0;
        let techStanceSum = 0;
        let validSurveyCount = 0;

        surveySnap.forEach(doc => {
            const data = doc.data();
            const answers = data.answers || [];
            // Chỉ xử lý các khảo sát có đủ 13 câu trả lời (format mới)
            if (answers.length >= 13) {
                validSurveyCount++;
                // Dimension 1: Threat Perception (q1, q2)
                threatPerceptionSum += (answers[1] || 0) + (answers[2] || 0);
                // Dimension 2: Proactive Stance (q3, q9)
                proactiveStanceSum += (answers[3] || 0) + (answers[9] || 0);
                // Dimension 3: Self Efficacy (q7, q8)
                selfEfficacySum += (answers[7] || 0) + (answers[8] || 0);
                // Dimension 4: Behavioral Intent (q12, q10)
                behavioralIntentSum += (answers[12] || 0) + (answers[10] || 0);
                // Dimension 5: Tech Stance (q5, q6-inverted)
                techStanceSum += (answers[5] || 0) + (4 - (answers[6] || 0));
            }
        });

        // 3. Tính toán
        setStats({
            totalParticipants: totalGames,
            blocked: totalScore, // Mỗi câu đúng coi như chặn được 1 scam
            // Giả sử 1 game có 10 levels
            accuracy: totalGames > 0 ? Math.round((totalScore / (totalGames * 10)) * 100) : 0,
        });

        if (validSurveyCount > 0) {
            const maxScorePerDim = 8; // 2 câu hỏi/chiều, mỗi câu max 4 điểm
            setPsychoStats({
                threatPerception: Math.round((threatPerceptionSum / (validSurveyCount * maxScorePerDim)) * 100),
                proactiveStance: Math.round((proactiveStanceSum / (validSurveyCount * maxScorePerDim)) * 100),
                selfEfficacy: Math.round((selfEfficacySum / (validSurveyCount * maxScorePerDim)) * 100),
                behavioralIntent: Math.round((behavioralIntentSum / (validSurveyCount * maxScorePerDim)) * 100),
                techStance: Math.round((techStanceSum / (validSurveyCount * maxScorePerDim)) * 100),
            });
        }

      } catch (error) {
        console.error("Error fetching analytics:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
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
            <div className="text-center mb-4">
                <div className="text-[10px] text-gray-400 uppercase tracking-widest">{lang === 'vi' ? 'PHÂN TÍCH TÂM LÝ HÀNH VI' : 'BEHAVIORAL PSYCHOLOGY ANALYSIS'}</div>
                <p className="text-[8px] text-gray-600">{lang === 'vi' ? '(Dữ liệu tổng hợp từ khảo sát người dùng)' : '(Aggregated from user surveys)'}</p>
            </div>
            <RadarChart data={psychoStats} lang={lang} />
            <div className="mt-4 text-center text-[10px] text-gray-500 italic max-w-xs">
                {lang === 'vi' ? 'Biểu đồ mạng nhện thể hiện điểm trung bình của cộng đồng trên 5 khía cạnh tâm lý cốt lõi.' : 'Radar chart showing community average scores across 5 core psychological dimensions.'}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const RadarChart = ({ data, lang }: { data: any, lang: Language }) => {
    const size = 240;
    const center = size / 2;
    const radius = size * 0.35;
    const numSides = 5;
    const angleSlice = (Math.PI * 2) / numSides;

    const labels = lang === 'vi' 
        ? ['Nhận thức Rủi ro', 'Lập trường Chủ động', 'Năng lực Tự vệ', 'Ý định Hành vi', 'Niềm tin Công nghệ']
        : ['Threat Perception', 'Proactive Stance', 'Self-Efficacy', 'Behavioral Intent', 'Tech Stance'];
    
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
                    return <circle key={i} cx={x} cy={y} r="3" fill="#00F0FF" />;
                })}

                {/* Labels */}
                {labels.map((label, i) => {
                    const { x, y } = getPoint(125, i); // Position labels outside the grid
                    return (
                        <text key={i} x={x} y={y} fill="#888" fontSize="8" textAnchor="middle" dominantBaseline="middle" className="font-mono uppercase">
                            {label}
                        </text>
                    );
                })}
            </g>
        </svg>
    );
};

export default AnalyticsChart;
