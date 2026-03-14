
import React, { useState, useEffect } from 'react';
import { Brain, Users, BarChart3, Loader2 } from 'lucide-react';
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
    hardPassRate: 0, // Tỉ lệ qua màn khó
    familyCodeRate: 0, // Tỉ lệ dùng mật mã gia đình
    vigilanceAvg: 0 // Mức độ cảnh giác
  });
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        // 1. Lấy dữ liệu GAME RESULTS
        const gameSnap = await getDocs(collection(db, "game_results"));
        const totalGames = gameSnap.size;
        let totalScore = 0;
        let hardPassCount = 0;

        gameSnap.forEach(doc => {
            const data = doc.data();
            const score = data.score || 0;
            totalScore += score;
            // Giả sử > 8/10 là vượt qua cấp độ khó/xuất sắc
            if (score >= 8) hardPassCount++;
        });

        // 2. Lấy dữ liệu SURVEYS
        const surveySnap = await getDocs(collection(db, "surveys"));
        const totalSurveys = surveySnap.size;
        let familyCodeHigh = 0;
        let vigilanceSum = 0;

        surveySnap.forEach(doc => {
            const data = doc.data();
            const answers = data.answers || [];
            // Dựa vào Challenge.tsx:
            // Index 12 là câu hỏi về "Mật mã gia đình" (Action)
            // Index 3 là câu hỏi về "Sẵn sàng áp dụng" (Readiness)
            // Giả sử thang đo 0-4, chọn mức 3 hoặc 4 là Tốt
            if (answers[12] >= 3) familyCodeHigh++;
            if (answers[3] !== undefined) vigilanceSum += answers[3]; 
        });

        // 3. Tính toán
        setStats({
            totalParticipants: totalGames,
            blocked: totalScore, // Mỗi câu đúng coi như chặn được 1 scam
            // Giả sử 1 game có 10 levels
            accuracy: totalGames > 0 ? Math.round((totalScore / (totalGames * 10)) * 100) : 0,
            hardPassRate: totalGames > 0 ? Math.round((hardPassCount / totalGames) * 100) : 0,
            familyCodeRate: totalSurveys > 0 ? Math.round((familyCodeHigh / totalSurveys) * 100) : 0,
            // Chuyển thang điểm 0-4 sang phần trăm (val * 25)
            vigilanceAvg: totalSurveys > 0 ? Math.round(((vigilanceSum / totalSurveys) / 4) * 100) : 0
        });

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

  // Dữ liệu hiển thị dựa trên State đã tính toán
  const displayData = {
    metrics: [
      { label: metricsLabels.participation, val: stats.totalParticipants.toLocaleString(), color: '#00F0FF' },
      { label: metricsLabels.blocked, val: stats.blocked.toLocaleString(), color: '#FF2A6D' }
    ],
    psychology: [
      { label: lang === 'vi' ? 'SỐ NGƯỜI VƯỢT QUA CẤP ĐỘ KHÓ' : 'HARD LEVEL COMPLETION', val: stats.hardPassRate },
      { label: lang === 'vi' ? 'DỰ ĐỊNH DÙNG MẬT MÃ GIA ĐÌNH' : 'PLAN TO USE FAMILY CODE', val: stats.familyCodeRate },
      { label: lang === 'vi' ? 'MỨC ĐỘ CẢNH GIÁC TRUNG BÌNH' : 'AVG VIGILANCE LEVEL', val: stats.vigilanceAvg }
    ]
  };

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
            <div className="flex flex-col items-center gap-2 text-gray-500 animate-pulse">
                <Loader2 className="animate-spin" size={32}/>
                <span className="text-[10px] uppercase tracking-widest">Loading Data...</span>
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
              {displayData.metrics.map((s, i) => (
                <div key={i} className="bg-white/5 border border-white/5 rounded-2xl p-4 relative overflow-hidden text-center">
                  <div className="text-[8px] text-gray-500 font-black mb-2 uppercase tracking-widest">{s.label}</div>
                  <div className="text-xl font-black text-white" style={{ color: s.color }}>{s.val}</div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="w-full space-y-5">
             <div className="text-center mb-4">
                <div className="text-[10px] text-gray-500 uppercase tracking-widest">{lang === 'vi' ? 'DỮ LIỆU TỪ BÀI KHẢO SÁT' : 'DATA FROM USER SURVEYS'}</div>
             </div>
             {displayData.psychology.map((t, i) => (
                <div key={i} className="space-y-2">
                    <div className="flex justify-between text-[9px] font-mono text-gray-400 uppercase tracking-widest font-black">
                        <span>{t.label}</span>
                        <span>{t.val}%</span>
                    </div>
                    <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                        <div className="h-full bg-primary transition-all duration-1000" style={{ width: `${t.val}%` }}></div>
                    </div>
                </div>
             ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AnalyticsChart;
