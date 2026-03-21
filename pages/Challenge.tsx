
import React, { useState, useEffect, useRef } from 'react';
import { LEVELS, TRANSLATIONS, SURVEY_SCALE } from '../data';
import { GameState, Language, LevelData } from '../types';
import { useNavigate } from 'react-router-dom';
import { CheckCircle2, XCircle, Zap, ShieldCheck, ArrowRight, ArrowLeft, RotateCcw, AlertCircle, ClipboardList, Send, Brain, Eye, ShieldAlert, ChevronRight, BarChart2, ShieldQuestion, Share2, Facebook, Twitter, Users } from 'lucide-react';
import { db } from '../firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

interface ChallengeProps {
  lang: Language;
}

const Challenge: React.FC<ChallengeProps> = ({ lang }) => {
  const [gameState, setGameState] = useState<GameState | null>(null);
  const [wrongLevels, setWrongLevels] = useState<LevelData[]>([]);
  const [showSurvey, setShowSurvey] = useState(false);
  const [showIntro, setShowIntro] = useState(true);
  const [surveyStep, setSurveyStep] = useState(0);
  const [surveyAnswers, setSurveyAnswers] = useState<number[]>([]);
  const [surveySent, setSurveySent] = useState(false);
  const [demoAge, setDemoAge] = useState<string>('');
  const [showDemo, setShowDemo] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Anti-Bot States
  const [captchaObj, setCaptchaObj] = useState({ num1: 0, num2: 0 });
  const [captchaInput, setCaptchaInput] = useState('');
  const [captchaError, setCaptchaError] = useState(false);
  const navigate = useNavigate();
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const isMountedRef = useRef(true);

  const surveyQuestions = [
    {
        id: 'q0_usage',
        vi: 'Tôi thường xuyên sử dụng mạng xã hội và các ứng dụng gọi video (Zalo, Messenger, Telegram).',
        en: 'I frequently use social media and video calling apps (Zalo, Messenger, Telegram).'
    },
    {
        id: 'q1_threat_me',
        vi: 'Tôi tin rằng công nghệ Deepfake hiện nay có thể dễ dàng lừa đảo bản thân tôi hoặc gia đình.',
        en: 'I believe Deepfake tech today can easily deceive me or my family.'
    },
    {
        id: 'q2_threat_impact',
        vi: 'Hậu quả tài chính và tinh thần nếu bị lừa đảo bằng AI là vô cùng nghiêm trọng và khó khắc phục.',
        en: 'The financial and mental consequences of AI scams are extremely severe.'
    },
    {
        id: 'q3_proactive_learn',
        vi: 'Tôi luôn chủ động tìm hiểu và cập nhật các thủ đoạn lừa đảo công nghệ cao mới nhất.',
        en: 'I actively learn and update myself on the latest high-tech scam methods.'
    },
    {
        id: 'q4_anxiety',
        vi: 'Tôi cảm thấy vô cùng lo lắng và bất an trước sự phát triển mất kiểm soát của Trí tuệ nhân tạo.',
        en: 'I feel highly anxious about the uncontrolled development of AI.'
    },
    {
        id: 'q5_tech_regulate',
        vi: 'Tôi cho rằng cần có luật pháp kiểm soát chặt chẽ và đóng dấu bản quyền cho mọi video tạo bằng AI.',
        en: 'I believe AI-generated videos must be strictly regulated and watermarked.'
    },
    {
        id: 'q6_tech_blindness',
        vi: 'Tôi thường có xu hướng tin tưởng ngay vào những hình ảnh/video mắt mình nhìn thấy trên màn hình.',
        en: 'I tend to immediately trust the images/videos I see on my screen.'
    },
    {
        id: 'q7_efficacy_detect',
        vi: 'Sau thử thách này, tôi tự tin mình có khả năng nhận diện được các dấu hiệu lỗi của video Deepfake.',
        en: 'After this challenge, I am confident in my ability to detect Deepfake artifacts.'
    },
    {
        id: 'q8_efficacy_verify',
        vi: 'Tôi biết chính xác mình cần phải làm gì (hỏi câu hỏi mẹo, yêu cầu vẫy tay) khi nhận cuộc gọi nghi ngờ.',
        en: 'I know exactly what to do (ask trick questions, request hand waves) if a call is suspicious.'
    },
    {
        id: 'q9_proactive_pwd',
        vi: 'Gia đình tôi đã (hoặc cam kết sẽ) thiết lập một "Mật mã bí mật" để xác thực nhau khi có biến cố.',
        en: 'My family has established (or will establish) a secret password for emergencies.'
    },
    {
        id: 'q10_intent_gsm',
        vi: 'Nếu người thân gọi video mượn tiền, tôi sẽ lập tức cúp máy và gọi lại bằng mạng viễn thông di động (GSM).',
        en: 'If asked for money on video, I will hang up and call back via standard cellular network (GSM).'
    },
    {
        id: 'q11_footprint',
        vi: 'Tôi trước đây thường vô tư đăng tải hình ảnh khuôn mặt rõ nét và video có giọng nói lên mạng ở chế độ công khai.',
        en: 'I used to post clear face photos and voice videos publicly without second thoughts.'
    },
    {
        id: 'q12_intent_hide',
        vi: 'Tôi dự định sẽ hạn chế chia sẻ dữ liệu sinh trắc học (khuôn mặt, giọng nói) bừa bãi trên không gian mạng.',
        en: 'I plan to restrict sharing my biometric data (face, voice) carelessly online.'
    },
    {
        id: 'q13_share',
        vi: 'Tôi sẽ chia sẻ ứng dụng DEEPFENSE này cho bạn bè và người lớn tuổi trong gia đình để cùng phòng tránh.',
        en: 'I will share this DEEPFENSE app with friends and elderly family members.'
    }
  ];

  useEffect(() => {
    startNewGame();
  }, [lang]);

  useEffect(() => {
    return () => {
      isMountedRef.current = false;
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

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
    
    // Reset Anti-Bot
    setCaptchaObj({ num1: Math.floor(Math.random() * 10), num2: Math.floor(Math.random() * 10) });
    setCaptchaInput('');
    setCaptchaError(false);
    
    setGameState(newState);
    setWrongLevels([]);
    setShowSurvey(false);
    setShowIntro(true);
    setSurveyStep(0);
    setSurveyAnswers([]);
    setSurveySent(false);
    setDemoAge('');
    setShowDemo(true);
  };

  const handleChoice = (choice: 1 | 2) => {
    // BẢO MẬT: Chặn Double-Click spam để hack vượt mốc điểm tuyệt đối
    if (!gameState || gameState.show_result) return;
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
          addDoc(collection(db, "game_results"), gameResult)
            .catch(e => console.error("Error saving game result: ", e));
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

  const submitSurvey = async () => {
    if (surveyAnswers.length < surveyQuestions.length || isSubmitting) return;
    
    // Validate Human CAPTCHA
    if (parseInt(captchaInput) !== captchaObj.num1 + captchaObj.num2) {
        setCaptchaError(true);
        return;
    }
    setCaptchaError(false);
    setIsSubmitting(true);
    
    // --- FIREBASE: LƯU KẾT QUẢ KHẢO SÁT ---
    try {
      const surveyData = {
        age_group: demoAge,
        answers: surveyAnswers, // Mảng các câu trả lời (0-4)
        questions_map: surveyQuestions.map(q => q.id), // Map thứ tự câu hỏi
        created_at: serverTimestamp(),
        lang: lang,
        // Có thể link với game result trước đó nếu muốn phức tạp hơn
      };
      await addDoc(collection(db, "surveys"), surveyData);
      if (isMountedRef.current) setSurveySent(true);
    } catch (e) {
      console.error("Error saving survey: ", e);
    } finally {
      if (isMountedRef.current) setIsSubmitting(false);
    }

    if (isMountedRef.current) {
        timeoutRef.current = setTimeout(() => {
            if (isMountedRef.current) setShowSurvey(false);
        }, 2000);
    }
  };

  const getEmbedUrl = (url: string) => {
    if (!url) return "";
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=|shorts\/)([^#&?]*).*/;
    const match = url.match(regExp);
    const videoId = (match && match[2].length === 11) ? match[2] : null;
    // Thêm controls=0 và modestbranding=1 để giấu thanh tiến trình và logo, tránh lộ nội dung video
    return videoId ? `https://www.youtube.com/embed/${videoId}?autoplay=0&rel=0&controls=0&modestbranding=1` : url;
  };

  if (gameState && gameState.finished) {
    const score = gameState.score;
    const scales = SURVEY_SCALE[lang];

    // Phân tích dữ liệu kết quả (Năng lực nhận diện chia theo nhóm)
    const morphologicalIds = ["v1", "v2", "v4"]; // Tay, khuôn mặt, đôi cánh
    const contextIds = ["v3", "v5", "v7"];       // Chuyển động hươu, thiên nga, mây
    const physicsIds = ["v6", "v8", "v9", "v10"]; // Dòng nước, cát, áp lực

    const getScoreForCategory = (ids: string[]) => {
       const total = ids.length;
       const wrong = wrongLevels.filter(l => ids.includes(l.id)).length;
       return Math.round(((total - wrong) / total) * 100);
    };

    const morphScore = getScoreForCategory(morphologicalIds);
    const contextScore = getScoreForCategory(contextIds);
    const physicsScore = getScoreForCategory(physicsIds);

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
    setIsSubmitting(false);
    
    const handleShare = async (platform: 'facebook' | 'twitter' | 'native') => {
        const text = lang === 'vi' 
            ? `🎮 Tôi vừa đạt điểm tuyệt đối ${score}/10 trong Thử thách Thám tử Deepfake! 🛡️\nCông nghệ AI thật đáng sợ, mọi người vào kiểm tra trình độ nhận diện của mình nhé!` 
            : `🎮 I just scored ${score}/10 in the Deepfake Detective Challenge! 🛡️\nAI is getting scary. Test your detection skills now!`;
        const url = window.location.origin;

        if (platform === 'facebook') {
            window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`, '_blank');
        } else if (platform === 'twitter') {
            window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`, '_blank');
        } else {
            if (navigator.share) {
                try { await navigator.share({ title: 'DEEPFENSE.ONLINE', text, url }); } 
                catch (err) { console.error('Error sharing:', err); }
            } else {
                navigator.clipboard.writeText(`${text} ${url}`)
                    .then(() => alert(lang === 'vi' ? 'Đã sao chép liên kết để chia sẻ!' : 'Copied to clipboard!'))
                    .catch(() => alert(lang === 'vi' ? 'Lỗi trình duyệt: Không thể sao chép.' : 'Browser Error: Cannot copy.'));
            }
        }
    };

    return (
      <div className="max-w-4xl mx-auto py-6 md:py-10 animate-in zoom-in duration-500 px-4">
        {showSurvey ? (
            <div className="bg-surface border border-primary/20 p-6 md:p-12 rounded-3xl text-center shadow-2xl mb-12 relative overflow-hidden flex flex-col items-center">
                <div className="absolute top-0 left-0 w-full h-1 bg-primary"></div>
                
                <div className="flex items-center gap-3 mb-8">
                    <ClipboardList className="text-primary" size={24} />
                    <h3 className="text-lg md:text-xl font-black text-white uppercase tracking-widest">
                        {lang === 'vi' ? 'ĐÁNH GIÁ CHỈ SỐ AN NINH TÂM LÝ' : 'PSYCHOLOGICAL SECURITY INDEX'}
                    </h3>
                </div>

                <div className="flex gap-1.5 md:gap-2 mb-10 flex-wrap justify-center max-w-full">
                    {surveyQuestions.map((_, idx) => (
                        <div key={idx} className={`h-1.5 w-4 md:w-6 rounded-full transition-all duration-500 ${idx <= surveyStep ? 'bg-primary shadow-[0_0_8px_rgba(0,240,255,0.5)]' : 'bg-gray-800'}`}></div>
                    ))}
                </div>
                {!showIntro && !surveySent && (
                    <div className="flex gap-1.5 md:gap-2 mb-10 flex-wrap justify-center max-w-full">
                        {surveyQuestions.map((_, idx) => (
                            <div key={idx} className={`h-1.5 w-4 md:w-6 rounded-full transition-all duration-500 ${idx <= surveyStep ? 'bg-primary shadow-[0_0_8px_rgba(0,240,255,0.5)]' : 'bg-gray-800'}`}></div>
                        ))}
                    </div>
                )}

                {surveySent ? (
                    <div className="animate-in fade-in py-10">
                        <CheckCircle2 size={64} className="text-success mx-auto mb-4" />
                        <div className="text-success font-black text-xl uppercase">
                            {lang === 'vi' ? 'DỮ LIỆU ĐÃ ĐƯỢC GHI NHẬN!' : 'DATA RECORDED SUCCESSFULLY!'}
                        </div>
                    </div>
                ) : showIntro ? (
                    <div className="w-full max-w-xl animate-in slide-in-from-right-4 duration-300 py-4 mx-auto">
                        <div className="text-5xl md:text-6xl mb-6">🤝</div>
                        <h4 className="text-xl md:text-2xl text-white font-black mb-4 leading-relaxed uppercase tracking-widest text-primary">
                            {lang === 'vi' ? 'CHUNG TAY VÌ CỘNG ĐỒNG SỐ' : 'JOIN THE DIGITAL COMMUNITY'}
                        </h4>
                        <p className="text-gray-300 text-sm md:text-base leading-relaxed mb-8 px-4 text-justify md:text-center">
                            {lang === 'vi' 
                                ? 'Chúc mừng bạn đã xuất sắc vượt qua thử thách! Nhằm mục đích xây dựng một bộ dữ liệu nghiên cứu hành vi phòng chống lừa đảo mạng cho cộng đồng, rất mong bạn dành thêm ít phút để hoàn thành bảng khảo sát này. Mọi ý kiến đóng góp của bạn đều ẩn danh và vô cùng quý giá đối với dự án.' 
                                : 'Congratulations on completing the challenge! To build a behavioral research dataset for community cybersecurity, please take a few minutes to complete this survey. Your input is anonymous and highly valuable to our project.'}
                        </p>
                        <div className="flex flex-col sm:flex-row justify-center gap-4">
                            <button 
                                onClick={() => setShowIntro(false)}
                                className="bg-primary text-black px-8 py-4 rounded-xl font-black text-xs uppercase transition-all hover:scale-105 shadow-lg shadow-primary/20 w-full sm:w-auto"
                            >
                                {lang === 'vi' ? 'ĐỒNG Ý ĐÓNG GÓP Ý KIẾN' : 'AGREE TO CONTRIBUTE'}
                            </button>
                        </div>
                    </div>
                ) : showDemo ? (
                    <div className="w-full max-w-xl animate-in slide-in-from-right-4 duration-300">
                        <Users className="text-primary mx-auto mb-6" size={48} />
                        <h4 className="text-lg md:text-2xl text-white font-black mb-8 leading-relaxed">
                            {lang === 'vi' ? 'Vui lòng chọn nhóm tuổi của bạn để tiếp tục:' : 'Please select your age group to continue:'}
                        </h4>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                            {['Dưới 18 Tuổi', '18 - 24 Tuổi', '25 - 40 Tuổi', 'Trên 40 Tuổi'].map(age => (
                                <button 
                                    key={age}
                                    onClick={() => { setDemoAge(age); setShowDemo(false); }}
                                    className="bg-surface border-2 border-white/10 hover:border-primary text-gray-300 hover:text-white p-6 rounded-2xl font-black text-base transition-all active:scale-95 group"
                                >
                                    <span className="group-hover:scale-110 inline-block transition-transform">{age}</span>
                                </button>
                            ))}
                        </div>
                        <p className="text-gray-500 text-xs italic px-4">
                            {lang === 'vi' ? '*Dữ liệu nhân khẩu học được thu thập ẩn danh, phục vụ trực tiếp cho báo cáo phân tích nhận thức cộng đồng.' : '*Demographic data is collected anonymously for research purposes.'}
                        </p>
                    </div>
                ) : (
                    <div className="w-full max-w-2xl animate-in slide-in-from-right-4 duration-300">
                        <h4 className="text-lg md:text-xl text-white font-medium mb-10 leading-relaxed">
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
                             <div className="flex flex-col items-center mt-6 w-full max-w-sm mx-auto">
                                 <div className="bg-black/50 border border-white/10 rounded-xl p-4 w-full mb-4">
                                     <div className="text-xs text-gray-400 mb-2 font-mono flex items-center justify-center gap-2">
                                         <ShieldQuestion size={14} className="text-primary"/> 
                                         {lang === 'vi' ? 'XÁC THỰC NGƯỜI THẬT' : 'HUMAN VERIFICATION'}
                                     </div>
                                     <div className="flex items-center justify-center gap-3">
                                         <span className="text-xl font-bold text-white tracking-widest">{captchaObj.num1} + {captchaObj.num2} = </span>
                                         <input 
                                             type="number" 
                                             value={captchaInput} 
                                             onChange={(e) => setCaptchaInput(e.target.value)}
                                             className={`w-16 bg-transparent border-b-2 text-center text-xl font-bold text-primary outline-none transition-colors ${captchaError ? 'border-red-500' : 'border-primary/50 focus:border-primary'}`}
                                         />
                                     </div>
                                     {captchaError && <div className="text-red-500 text-[10px] mt-2 italic">{lang === 'vi' ? 'Kết quả chưa đúng!' : 'Incorrect answer!'}</div>}
                                 </div>
                                 <button 
                                    onClick={submitSurvey}
                                    disabled={isSubmitting}
                                    className={`px-12 md:px-16 py-5 rounded-xl font-black text-xs uppercase shadow-lg transition-all flex items-center gap-3 w-full justify-center ${isSubmitting ? 'bg-gray-600 text-gray-400 cursor-not-allowed' : 'bg-primary text-black hover:scale-105 shadow-primary/20'}`}
                                >
                                    {isSubmitting ? (lang === 'vi' ? 'ĐANG XỬ LÝ...' : 'PROCESSING...') : (lang === 'vi' ? 'XEM PHÂN TÍCH CUỐI CÙNG' : 'VIEW FINAL ANALYSIS')} <ChevronRight size={16}/>
                                </button>
                             </div>
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
                       <h2 className="text-2xl md:text-4xl font-black text-white mb-2 uppercase tracking-tighter leading-tight">{statusTitle}</h2>
                       <div className="text-white/40 font-mono text-sm tracking-[0.4em] uppercase">{score}/10 {lang === 'vi' ? 'ĐIỂM CHÍNH XÁC' : 'ACCURACY SCORE'}</div>
                    </div>

                    <p className="text-gray-300 max-w-xl mb-10 leading-relaxed text-base">{statusDesc}</p>
                    
                    <div className="flex flex-col sm:flex-row justify-center gap-4 w-full">
                        <button onClick={startNewGame} className="bg-primary text-black px-12 py-4 rounded-xl font-black text-xs uppercase shadow-lg hover:scale-105 transition-all flex items-center justify-center gap-2">
                            <RotateCcw size={14} /> {lang === 'vi' ? 'LUYỆN TẬP LẠI' : 'PRACTICE AGAIN'}
                        </button>
                        <button onClick={() => navigate('/')} className="bg-white/5 text-white border border-white/10 px-12 py-4 rounded-xl font-black text-xs uppercase hover:bg-white/10 transition-all">
                            {lang === 'vi' ? 'KẾT THÚC CHIẾN DỊCH' : 'END CAMPAIGN'}
                        </button>
                    </div>

                    <div className="mt-8 pt-8 border-t border-white/10 w-full max-w-sm mx-auto">
                        <p className="text-gray-400 text-[10px] uppercase tracking-widest font-bold mb-4">{lang === 'vi' ? 'CHIA SẺ KẾT QUẢ ĐỂ NÂNG CAO NHẬN THỨC' : 'SHARE RESULTS TO RAISE AWARENESS'}</p>
                        <div className="flex justify-center gap-4">
                            <button onClick={() => handleShare('facebook')} className="bg-[#1877F2]/20 text-[#1877F2] border border-[#1877F2]/30 p-3 rounded-full hover:bg-[#1877F2] hover:text-white hover:scale-110 transition-all shadow-lg" title="Share on Facebook">
                                <Facebook size={18} />
                            </button>
                            <button onClick={() => handleShare('twitter')} className="bg-[#1DA1F2]/20 text-[#1DA1F2] border border-[#1DA1F2]/30 p-3 rounded-full hover:bg-[#1DA1F2] hover:text-white hover:scale-110 transition-all shadow-lg" title="Share on Twitter">
                                <Twitter size={18} fill="currentColor" />
                            </button>
                            <button onClick={() => handleShare('native')} className="bg-white/10 text-white border border-white/20 p-3 rounded-full hover:bg-white hover:text-black hover:scale-110 transition-all shadow-lg" title={lang === 'vi' ? 'Chia sẻ / Copy' : 'Share / Copy'}>
                                <Share2 size={18} />
                            </button>
                        </div>
                    </div>
                </div>

                {/* BẢNG PHÂN TÍCH ĐỒ THỊ */}
                <div className="bg-surface border border-white/10 p-6 md:p-10 rounded-3xl mb-12 shadow-xl">
                   <h3 className="text-lg md:text-xl font-black text-white uppercase tracking-widest mb-8 flex items-center gap-3 border-b border-white/5 pb-6">
                      <BarChart2 size={24} className="text-primary" />
                      {lang === 'vi' ? 'PHÂN TÍCH ĐỒ THỊ NĂNG LỰC NHẬN DIỆN' : 'DETECTION COMPETENCY GRAPH ANALYSIS'}
                   </h3>
                   
                   <div className="space-y-8">
                      {/* Bar 1 */}
                      <div className="space-y-3">
                         <div className="flex justify-between text-xs md:text-sm font-bold uppercase tracking-widest">
                            <span className="text-gray-400">{lang === 'vi' ? 'NHẬN DIỆN HÌNH THỂ CHI TIẾT' : 'MORPHOLOGICAL DETAIL DETECTION'}</span>
                            <span className="text-primary">{morphScore}%</span>
                         </div>
                         <div className="h-4 w-full bg-black rounded-full overflow-hidden border border-white/5 shadow-inner p-0.5">
                            <div className="h-full bg-gradient-to-r from-primary/50 to-primary rounded-full transition-all duration-1000" style={{ width: `${morphScore}%` }}></div>
                         </div>
                      </div>
                      
                      {/* Bar 2 */}
                      <div className="space-y-3">
                         <div className="flex justify-between text-xs md:text-sm font-bold uppercase tracking-widest">
                            <span className="text-gray-400">{lang === 'vi' ? 'NHẬN THỨC BỐI CẢNH & KHÔNG GIAN' : 'CONTEXT & SPATIAL AWARENESS'}</span>
                            <span className="text-blue-400">{contextScore}%</span>
                         </div>
                         <div className="h-4 w-full bg-black rounded-full overflow-hidden border border-white/5 shadow-inner p-0.5">
                            <div className="h-full bg-gradient-to-r from-blue-500/50 to-blue-500 rounded-full transition-all duration-1000" style={{ width: `${contextScore}%` }}></div>
                         </div>
                      </div>

                      {/* Bar 3 */}
                      <div className="space-y-3">
                         <div className="flex justify-between text-xs md:text-sm font-bold uppercase tracking-widest">
                            <span className="text-gray-400">{lang === 'vi' ? 'PHÂN TÍCH CHUYỂN ĐỘNG VẬT LÝ' : 'PHYSICS MOTION ANALYSIS'}</span>
                            <span className="text-secondary">{physicsScore}%</span>
                         </div>
                         <div className="h-4 w-full bg-black rounded-full overflow-hidden border border-white/5 shadow-inner p-0.5">
                            <div className="h-full bg-gradient-to-r from-secondary/50 to-secondary rounded-full transition-all duration-1000" style={{ width: `${physicsScore}%` }}></div>
                         </div>
                      </div>
                   </div>
                </div>

                {wrongLevels.length > 0 && (
                  <div className="space-y-6">
                    <h3 className="text-secondary font-black text-lg uppercase tracking-widest flex items-center gap-3">
                      <AlertCircle /> {lang === 'vi' ? 'CÁC LỖI CẦN KHẮC PHỤC' : 'ERRORS TO FIX'}
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                       {wrongLevels.map((lvl, idx) => (
                         <div key={idx} className="bg-secondary/5 border border-secondary/20 p-6 rounded-2xl flex flex-col">
                            <div className="text-[10px] text-secondary font-black mb-2 uppercase tracking-tighter">{lvl.title}</div>
                            <p className="text-white text-sm font-medium leading-relaxed">"{lvl.advice}"</p>
                         </div>
                       ))}
                    </div>
                  </div>
                )}
            </div>
        )}

        {!showSurvey && (
            <div className="mt-12 bg-primary/5 border border-primary/20 p-8 rounded-3xl">
               <h3 className="text-primary font-black text-lg uppercase tracking-widest mb-6 flex items-center gap-3">
                  <ShieldCheck /> {lang === 'vi' ? 'CẨM NANG PHÒNG VỆ NHANH' : 'QUICK DEFENSE HANDBOOK'}
               </h3>
               <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm">
                  <div className="bg-black/40 p-5 rounded-xl border border-white/5">
                     <div className="text-primary font-bold mb-2 uppercase text-xs tracking-widest">
                        {lang === 'vi' ? '1. Quan sát' : '1. Observe'}
                     </div>
                     <p className="text-gray-400 text-xs leading-relaxed">
                        {lang === 'vi' ? 'Nếu khuôn mặt quá mịn hoặc ánh sáng bóng loáng bất thường, hãy nghi ngờ ngay.' : 'If the face is too smooth or the lighting is unnaturally shiny, be suspicious immediately.'}
                     </p>
                  </div>
                  <div className="bg-black/40 p-5 rounded-xl border border-white/5">
                     <div className="text-primary font-bold mb-2 uppercase text-xs tracking-widest">
                        {lang === 'vi' ? '2. Thử thách' : '2. Challenge'}
                     </div>
                     <p className="text-gray-400 text-xs leading-relaxed">
                        {lang === 'vi' ? 'Yêu cầu người gọi vẫy tay trước mặt. AI sẽ bị lỗi hiển thị khi có vật che.' : 'Ask the caller to wave their hand in front of their face. AI glitches when obstructed.'}
                     </p>
                  </div>
                  <div className="bg-black/40 p-5 rounded-xl border border-white/5">
                     <div className="text-primary font-bold mb-2 uppercase text-xs tracking-widest">
                        {lang === 'vi' ? '3. Xác minh' : '3. Verify'}
                     </div>
                     <p className="text-gray-400 text-xs leading-relaxed">
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

  const lvl = gameState.levels[gameState.current];
  const progress = ((gameState.current + 1) / gameState.levels.length) * 100;

  return (
    <div className="max-w-4xl mx-auto py-4 px-4 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row justify-between items-end mb-6 gap-4">
          <div className="w-full">
              <div className="flex items-center gap-2 mb-2">
                 <Zap size={14} className="text-primary" />
                 <span className="text-[10px] text-primary font-black uppercase tracking-[0.2em]">{lang === 'vi' ? 'NHIỆM VỤ' : 'MISSION'} {gameState.current + 1}</span>
              </div>
              <h3 className="text-white text-2xl md:text-3xl font-black uppercase tracking-tighter leading-none">{lvl.title}</h3>
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
                title={`Deepfake Challenge Level ${gameState.current + 1}`}
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
