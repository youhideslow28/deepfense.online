
import React, { useState, useEffect } from 'react';
import { LEVELS, TRANSLATIONS, SURVEY_SCALE } from '../data';
import { GameState, Language } from '../types';
import { CheckCircle2, XCircle, Zap, ShieldCheck, ArrowRight, ArrowLeft, RotateCcw, AlertCircle, ClipboardList, Send, Brain, Eye, ShieldAlert, ChevronRight } from 'lucide-react';
import { db } from '../firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

interface ChallengeProps {
  lang: Language;
}

const Challenge: React.FC<ChallengeProps> = ({ lang }) => {
  const [gameState, setGameState] = useState<GameState | null>(null);
  const [wrongLevels, setWrongLevels] = useState<any[]>([]);
  const [showSurvey, setShowSurvey] = useState(false);
  const [surveyStep, setSurveyStep] = useState(0);
  const [surveyAnswers, setSurveyAnswers] = useState<number[]>([]);
  const [surveySent, setSurveySent] = useState(false);

  const surveyQuestions = [
    {
        id: 'emotion',
        vi: 'Cảm xúc hiện tại của bạn về hiểm họa Deepfake?',
        en: 'Your current emotion regarding Deepfake threats?'
    },
    {
        id: 'confidence',
        vi: 'Mức độ tự tin của bạn trong việc bảo vệ gia đình?',
        en: 'How confident are you in protecting your family?'
    },
    {
        id: 'sophistication',
        vi: 'Bạn đánh giá thế nào về độ tinh vi của AI hiện nay?',
        en: 'How do you rate the current sophistication of AI?'
    },
    {
        id: 'readiness',
        vi: 'Mức độ sẵn sàng áp dụng các quy tắc phòng vệ vào thực tế?',
        en: 'How ready are you to apply defense rules in reality?'
    },
    {
        id: 'sharing',
        vi: 'Bạn có thường xuyên chia sẻ thông tin cá nhân lên mạng xã hội không?',
        en: 'Do you frequently share personal information on social media?'
    },
    {
        id: 'security_habit',
        vi: 'Bạn có thói quen thay đổi mật khẩu định kỳ không?',
        en: 'Do you have the habit of changing passwords periodically?'
    },
    {
        id: 'stranger_trust',
        vi: 'Mức độ tin tưởng của bạn đối với các cuộc gọi video từ số lạ?',
        en: 'Your trust level towards video calls from strangers?'
    },
    {
        id: 'ai_optimism',
        vi: 'Bạn có tin AI sẽ mang lại nhiều lợi ích hơn là rủi ro không?',
        en: 'Do you believe AI brings more benefits than risks?'
    },
    {
        id: 'education',
        vi: 'Bạn có sẵn lòng tham gia các lớp học kỹ năng phòng chống tội phạm mạng không?',
        en: 'Are you willing to participate in cybercrime prevention skills classes?'
    },
    {
        id: 'advocate',
        vi: 'Bạn sẽ chia sẻ kiến thức này với ít nhất 3 người thân chứ?',
        en: 'Will you share this knowledge with at least 3 relatives?'
    },
    {
        id: 'invulnerability',
        vi: 'Bạn có tin rằng mình sẽ không bao giờ bị lừa bởi Deepfake không?',
        en: 'Do you believe you will never be fooled by Deepfake?'
    },
    {
        id: 'aftermath',
        vi: 'Bạn có cảm thấy an toàn hơn sau khi tham gia thử thách này không?',
        en: 'Do you feel safer after participating in this challenge?'
    },
    {
        id: 'action',
        vi: 'Bạn có dự định thiết lập "mật mã gia đình" ngay hôm nay không?',
        en: 'Do you plan to set up a "family password" today?'
    }
  ];

  useEffect(() => {
    startNewGame();
  }, [lang]);

  const startNewGame = () => {
    const newState: GameState = { 
      levels: [...LEVELS[lang]], 
      current: 0, 
      score: 0, 
      wrong_count: 0, 
      wrong_topics: [], 
      finished: false, 
      show_result: false, 
      last_correct: null 
    };
    setGameState(newState);
    setWrongLevels([]);
    setShowSurvey(false);
    setSurveyStep(0);
    setSurveyAnswers([]);
    setSurveySent(false);
  };

  const handleChoice = (choice: 1 | 2) => {
    if (!gameState) return;
    const currentLevel = gameState.levels[gameState.current];
    const isCorrect = currentLevel.fake_pos === choice;
    
    if (!isCorrect) {
      setWrongLevels(prev => [...prev, currentLevel]);
    }

    setGameState(prev => prev ? ({
        ...prev,
        show_result: true,
        last_correct: isCorrect,
        score: isCorrect ? prev.score + 1 : prev.score,
        wrong_count: !isCorrect ? prev.wrong_count + 1 : prev.wrong_count,
    }) : null);
  };

  const nextLevel = () => {
    if (!gameState) return;
    if (gameState.current >= gameState.levels.length - 1) {
        setGameState(prev => prev ? ({ ...prev, finished: true }) : null);
        setShowSurvey(true);

        // --- FIREBASE: LƯU KẾT QUẢ GAME ---
        try {
          const gameResult = {
            score: gameState.score,
            wrong_count: gameState.wrong_count,
            played_at: serverTimestamp(),
            lang: lang,
            device_info: navigator.userAgent, // Lưu thông tin thiết bị cơ bản
            details: {
               wrong_levels: wrongLevels.map(l => l.id), // Lưu ID các câu sai
               total_levels: gameState.levels.length
            }
          };
          addDoc(collection(db, "game_results"), gameResult);
        } catch (e) {
          console.error("Error saving game result: ", e);
        }
    } else {
        setGameState(prev => prev ? ({ ...prev, current: prev.current + 1, show_result: false }) : null);
    }
  };

  const handleSurveySelect = (val: number) => {
    const newAnswers = [...surveyAnswers];
    newAnswers[surveyStep] = val;
    setSurveyAnswers(newAnswers);
    
    if (surveyStep < surveyQuestions.length - 1) {
        setSurveyStep(prev => prev + 1);
    }
  };

  const submitSurvey = () => {
    if (surveyAnswers.length < surveyQuestions.length) return;
    setSurveySent(true);
    
    // --- FIREBASE: LƯU KẾT QUẢ KHẢO SÁT ---
    try {
      const surveyData = {
        answers: surveyAnswers, // Mảng các câu trả lời (0-4)
        questions_map: surveyQuestions.map(q => q.id), // Map thứ tự câu hỏi
        created_at: serverTimestamp(),
        lang: lang,
        // Có thể link với game result trước đó nếu muốn phức tạp hơn
      };
      addDoc(collection(db, "surveys"), surveyData);
    } catch (e) {
      console.error("Error saving survey: ", e);
    }

    setTimeout(() => {
        setShowSurvey(false);
    }, 2000);
  };

  const getEmbedUrl = (url: string) => {
    if (!url) return "";
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=|shorts\/)([^#&?]*).*/;
    const match = url.match(regExp);
    const videoId = (match && match[2].length === 11) ? match[2] : null;
    return videoId ? `https://www.youtube.com/embed/${videoId}?autoplay=0&rel=0` : url;
  };

  if (gameState && gameState.finished) {
    const score = gameState.score;
    const scales = SURVEY_SCALE[lang];

    // Status logic
    let statusTitle = "";
    let statusDesc = "";
    let statusIcon = null;
    let statusColor = "";

    if (score >= 8) {
        statusTitle = lang === 'vi' ? "BẬC THẦY GIÁM ĐỊNH" : "MASTER DETECTIVE";
        statusDesc = lang === 'vi' ? "Kỹ năng của bạn rất tuyệt vời. Hãy chia sẻ kiến thức này để bảo vệ người thân!" : "Excellent skills. Share this knowledge to protect your loved ones!";
        statusIcon = <ShieldCheck size={48} className="text-success" />;
        statusColor = "border-success bg-success/5";
    } else if (score >= 5) {
        statusTitle = lang === 'vi' ? "HỌC VIÊN TIỀM NĂNG" : "POTENTIAL TRAINEE";
        statusDesc = lang === 'vi' ? "Bạn có khả năng nhận diện cơ bản, nhưng cần luyện tập thêm các chi tiết nhỏ." : "Good baseline awareness, but need more practice on micro-details.";
        statusIcon = <Eye size={48} className="text-warning" />;
        statusColor = "border-warning bg-warning/5";
    } else {
        statusTitle = lang === 'vi' ? "MỨC ĐỘ RỦI RO CAO" : "HIGH RISK LEVEL";
        statusDesc = lang === 'vi' ? "AI đang dần tinh vi hơn bạn nghĩ. Hãy xem lại phần kiến thức và thử thách lại!" : "AI is more sophisticated than you think. Review the knowledge base and retry!";
        statusIcon = <ShieldAlert size={48} className="text-secondary" />;
        statusColor = "border-secondary bg-secondary/5";
    }

    return (
      <div className="max-w-4xl mx-auto py-6 md:py-10 animate-in zoom-in duration-500 px-4">
        {showSurvey ? (
            <div className="bg-surface border border-primary/20 p-6 md:p-12 rounded-3xl text-center shadow-2xl mb-12 relative overflow-hidden flex flex-col items-center">
                <div className="absolute top-0 left-0 w-full h-1 bg-primary"></div>
                
                <div className="flex items-center gap-3 mb-8">
                    <ClipboardList className="text-primary" size={24} />
                    <h3 className="text-lg md:text-xl font-black text-white uppercase italic tracking-widest">
                        {lang === 'vi' ? 'ĐÁNH GIÁ CHỈ SỐ AN NINH TÂM LÝ' : 'PSYCHOLOGICAL SECURITY INDEX'}
                    </h3>
                </div>

                <div className="flex gap-2 mb-10 flex-wrap justify-center">
                    {surveyQuestions.map((_, idx) => (
                        <div key={idx} className={`h-1.5 w-6 md:w-8 rounded-full transition-all duration-500 ${idx <= surveyStep ? 'bg-primary' : 'bg-gray-800'}`}></div>
                    ))}
                </div>

                {surveySent ? (
                    <div className="animate-in fade-in py-10">
                        <CheckCircle2 size={64} className="text-success mx-auto mb-4" />
                        <div className="text-success font-black text-xl uppercase italic">
                            {lang === 'vi' ? 'DỮ LIỆU ĐÃ ĐƯỢC GHI NHẬN!' : 'DATA RECORDED SUCCESSFULLY!'}
                        </div>
                    </div>
                ) : (
                    <div className="w-full max-w-2xl animate-in slide-in-from-right-4 duration-300">
                        <h4 className="text-base md:text-lg text-white font-bold italic mb-10 leading-relaxed">
                            {surveyQuestions[surveyStep][lang]}
                        </h4>

                        {/* Responsive Grid for Survey Options */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-3 mb-12">
                            {scales.map((s, idx) => (
                                <button 
                                    key={idx}
                                    onClick={() => handleSurveySelect(idx)}
                                    className={`p-5 rounded-xl border transition-all flex flex-col items-center gap-3 group active:scale-95 ${surveyAnswers[surveyStep] === idx ? 'bg-primary border-primary text-black scale-105' : 'bg-black/40 border-white/10 text-gray-400 hover:border-primary/50'}`}
                                >
                                    <span className="text-3xl group-hover:scale-110 transition-transform">{s.split(' ')[0]}</span>
                                    <span className="text-[10px] font-black uppercase text-center leading-tight tracking-tighter">{s.split(' ').slice(1).join(' ')}</span>
                                </button>
                            ))}
                        </div>

                        {surveyStep === surveyQuestions.length - 1 && surveyAnswers.length === surveyQuestions.length && (
                             <button 
                                onClick={submitSurvey}
                                className="bg-primary text-black px-12 md:px-16 py-5 rounded-xl font-black text-xs uppercase shadow-lg shadow-primary/20 hover:scale-105 transition-all flex items-center gap-3 mx-auto mt-4 w-full md:w-auto justify-center"
                            >
                                {lang === 'vi' ? 'XEM PHÂN TÍCH CUỐI CÙNG' : 'VIEW FINAL ANALYSIS'} <ChevronRight size={16}/>
                            </button>
                        )}
                        
                        {surveyStep > 0 && (
                            <button onClick={() => setSurveyStep(prev => prev - 1)} className="mt-8 text-[10px] font-black text-gray-600 uppercase tracking-widest hover:text-gray-400 transition-colors">
                                {lang === 'vi' ? 'QUAY LẠI CÂU TRƯỚC' : 'BACK TO PREVIOUS'}
                            </button>
                        )}
                    </div>
                )}
            </div>
        ) : (
            <div className="animate-in fade-in duration-700">
                <div className={`border-2 p-6 md:p-12 rounded-3xl text-center shadow-2xl mb-12 relative overflow-hidden flex flex-col items-center ${statusColor}`}>
                    <div className="mb-6">{statusIcon}</div>
                    
                    <div className="mb-8">
                       <h2 className="text-2xl md:text-4xl font-black text-white mb-2 uppercase italic tracking-tighter leading-tight">{statusTitle}</h2>
                       <div className="text-white/40 font-mono text-sm tracking-[0.4em] uppercase">{score}/10 {lang === 'vi' ? 'ĐIỂM CHÍNH XÁC' : 'ACCURACY SCORE'}</div>
                    </div>

                    <p className="text-gray-300 italic max-w-xl mb-10 leading-relaxed text-sm md:text-base">{statusDesc}</p>
                    
                    <div className="flex flex-col sm:flex-row justify-center gap-4 w-full">
                        <button onClick={startNewGame} className="bg-primary text-black px-12 py-4 rounded-xl font-black text-xs uppercase shadow-lg hover:scale-105 transition-all flex items-center justify-center gap-2">
                            <RotateCcw size={14} /> {lang === 'vi' ? 'LUYỆN TẬP LẠI' : 'PRACTICE AGAIN'}
                        </button>
                        <button onClick={() => window.location.reload()} className="bg-white/5 text-white border border-white/10 px-12 py-4 rounded-xl font-black text-xs uppercase hover:bg-white/10 transition-all">
                            {lang === 'vi' ? 'KẾT THÚC CHIẾN DỊCH' : 'END CAMPAIGN'}
                        </button>
                    </div>
                </div>

                {wrongLevels.length > 0 && (
                  <div className="space-y-6">
                    <h3 className="text-secondary font-black text-lg uppercase italic tracking-widest flex items-center gap-3">
                      <AlertCircle /> {lang === 'vi' ? 'CÁC LỖI CẦN KHẮC PHỤC' : 'ERRORS TO FIX'}
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                       {wrongLevels.map((lvl, idx) => (
                         <div key={idx} className="bg-secondary/5 border border-secondary/20 p-6 rounded-2xl flex flex-col">
                            <div className="text-[10px] text-secondary font-black mb-2 uppercase tracking-tighter italic">{lvl.title}</div>
                            <p className="text-white text-sm font-bold italic leading-relaxed">"{lvl.advice}"</p>
                         </div>
                       ))}
                    </div>
                  </div>
                )}
            </div>
        )}

        {!showSurvey && (
            <div className="mt-12 bg-primary/5 border border-primary/20 p-8 rounded-3xl">
               <h3 className="text-primary font-black text-lg uppercase italic tracking-widest mb-6 flex items-center gap-3">
                  <ShieldCheck /> {lang === 'vi' ? 'CẨM NANG PHÒNG VỆ NHANH' : 'QUICK DEFENSE HANDBOOK'}
               </h3>
               <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm">
                  <div className="bg-black/40 p-5 rounded-xl border border-white/5">
                     <div className="text-primary font-bold mb-2 uppercase italic text-xs tracking-widest">
                        {lang === 'vi' ? '1. Quan sát' : '1. Observe'}
                     </div>
                     <p className="text-gray-400 text-[11px] italic">
                        {lang === 'vi' ? 'Nếu khuôn mặt quá mịn hoặc ánh sáng bóng loáng bất thường, hãy nghi ngờ ngay.' : 'If the face is too smooth or the lighting is unnaturally shiny, be suspicious immediately.'}
                     </p>
                  </div>
                  <div className="bg-black/40 p-5 rounded-xl border border-white/5">
                     <div className="text-primary font-bold mb-2 uppercase italic text-xs tracking-widest">
                        {lang === 'vi' ? '2. Thử thách' : '2. Challenge'}
                     </div>
                     <p className="text-gray-400 text-[11px] italic">
                        {lang === 'vi' ? 'Yêu cầu người gọi vẫy tay trước mặt. AI sẽ bị lỗi hiển thị khi có vật che.' : 'Ask the caller to wave their hand in front of their face. AI glitches when obstructed.'}
                     </p>
                  </div>
                  <div className="bg-black/40 p-5 rounded-xl border border-white/5">
                     <div className="text-primary font-bold mb-2 uppercase italic text-xs tracking-widest">
                        {lang === 'vi' ? '3. Xác minh' : '3. Verify'}
                     </div>
                     <p className="text-gray-400 text-[11px] italic">
                        {lang === 'vi' ? 'Gọi lại sim chính của người thân. Kẻ lừa đảo không thể nhận cuộc gọi GSM.' : 'Call back using the primary SIM number. Scammers cannot receive GSM calls.'}
                     </p>
                  </div>
               </div>
            </div>
        )}
      </div>
    );
  }

  if (!gameState) return null;

  const lvl = gameState.levels[gameState.current] as any;
  const progress = ((gameState.current) / gameState.levels.length) * 100;

  return (
    <div className="max-w-4xl mx-auto py-4 px-4 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row justify-between items-end mb-6 gap-4">
          <div className="w-full">
              <div className="flex items-center gap-2 mb-2">
                 <Zap size={14} className="text-primary" />
                 <span className="text-[10px] text-primary font-black uppercase tracking-[0.2em]">{lang === 'vi' ? 'NHIỆM VỤ' : 'MISSION'} {gameState.current + 1}</span>
              </div>
              <h3 className="text-white text-2xl md:text-3xl font-black italic uppercase tracking-tighter leading-none">{lvl.title}</h3>
          </div>
          <div className="text-right shrink-0">
              <div className="text-primary font-mono font-bold text-2xl leading-none">{gameState.current + 1}<span className="text-gray-800">/{gameState.levels.length}</span></div>
          </div>
      </div>

      <div className="h-1 bg-gray-900 rounded-full overflow-hidden mb-10">
            <div className="h-full bg-primary transition-all duration-1000" style={{ width: `${progress}%` }}></div>
      </div>

      <div className="space-y-6">
          <div className="relative bg-black border border-white/10 rounded-3xl overflow-hidden aspect-video shadow-2xl">
            <iframe 
                src={getEmbedUrl(lvl.video_url)} 
                className="w-full h-full" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
            ></iframe>
            
            {!gameState.show_result && (
                <div className="absolute top-4 inset-x-4 flex justify-between pointer-events-none">
                    <div className="bg-black/80 backdrop-blur px-3 py-1 rounded-lg border border-primary/20 text-primary text-[9px] font-black uppercase italic">MẪU_A</div>
                    <div className="bg-black/80 backdrop-blur px-3 py-1 rounded-lg border border-secondary/20 text-secondary text-[9px] font-black uppercase italic">MẪU_B</div>
                </div>
            )}
          </div>
          
          {!gameState.show_result ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <button onClick={() => handleChoice(1)} className="py-6 border border-white/10 bg-surface text-white font-black rounded-2xl hover:border-primary hover:text-primary transition-all uppercase text-xs tracking-widest shadow-xl flex items-center justify-center gap-3 group active:scale-95">
                    <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" /> {lang === 'vi' ? 'BÊN TRÁI LÀ GIẢ' : 'LEFT IS FAKE'}
                  </button>
                  <button onClick={() => handleChoice(2)} className="py-6 border border-white/10 bg-surface text-white font-black rounded-2xl hover:border-secondary hover:text-secondary transition-all uppercase text-xs tracking-widest shadow-xl flex items-center justify-center gap-3 group active:scale-95">
                    {lang === 'vi' ? 'BÊN PHẢI LÀ GIẢ' : 'RIGHT IS FAKE'} <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                  </button>
              </div>
          ) : (
            <div className="animate-in slide-in-from-bottom-6 duration-500">
                <div className={`p-6 md:p-8 rounded-3xl border-2 flex flex-col sm:flex-row items-center gap-8 ${gameState.last_correct ? 'bg-success/5 border-success/30' : 'bg-secondary/5 border-secondary/30'}`}>
                    <div className="shrink-0">
                        {gameState.last_correct ? <CheckCircle2 className="text-success" size={48} /> : <XCircle className="text-secondary" size={48} />}
                    </div>
                    <div className="flex-1 text-center sm:text-left">
                        <h4 className={`text-xl font-black mb-1 uppercase italic ${gameState.last_correct ? 'text-success' : 'text-secondary'}`}>
                            {gameState.last_correct 
                              ? (lang === 'vi' ? "XÁC THỰC CHÍNH XÁC" : "ACCURATE VALIDATION") 
                              : (lang === 'vi' ? "PHÁT HIỆN SAI LỆCH" : "MISMATCH DETECTED")}
                        </h4>
                        <p className="text-gray-400 text-sm italic">
                            {lang === 'vi' ? "Cảm quan của bạn đang ngày càng nhạy bén hơn." : "Your senses are becoming sharper."}
                        </p>
                    </div>
                    <button onClick={nextLevel} className="shrink-0 bg-white text-black px-10 py-4 rounded-xl font-black hover:bg-primary transition-all text-xs uppercase shadow-xl flex items-center gap-2 w-full sm:w-auto justify-center">
                      {lang === 'vi' ? 'TIẾP THEO' : 'NEXT'} <ArrowRight size={14} />
                    </button>
                </div>
            </div>
          )}
      </div>
    </div>
  );
};

export default Challenge;
