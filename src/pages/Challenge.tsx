
import React, { useState, useEffect, useRef } from 'react';
import { LEVELS, TRANSLATIONS, SURVEY_SCALE } from '@/data';
import { GameState, Language, LevelData } from '@/types';
import { useNavigate } from 'react-router-dom';
import { CheckCircle2, XCircle, Zap, ShieldCheck, ArrowRight, ArrowLeft, RotateCcw, AlertCircle, ClipboardList, Send, Brain, Eye, ShieldAlert, ChevronRight, BarChart2, ShieldQuestion, Share2, Facebook, Twitter, Users, Play } from 'lucide-react';
import { db } from '@/config/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import Simulator from './Simulator';
import { claimDpfReward, DpfClaimResult } from '@/features/dpf/dpf';
import DpfRewardNotice from '@/features/dpf/DpfRewardNotice';

interface ChallengeProps {
  lang: Language;
}

const shuffleLevels = <T,>(items: T[]) => {
  const shuffled = [...items];
  for (let i = shuffled.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

const getDetectionLevel = (level: LevelData) => {
  const match = level.difficulty.match(/(?:Mức|Level)\s*(\d)/i);
  return match ? Number(match[1]) : 0;
};

const selectBalancedChallenge = (levels: LevelData[]) => {
  const selected = [1, 2, 3, 4, 5].flatMap((difficulty) => {
    const pool = levels.filter((level) => getDetectionLevel(level) === difficulty);
    return shuffleLevels(pool).slice(0, 2);
  });

  return shuffleLevels(selected);
};

const DetectiveGame: React.FC<ChallengeProps> = ({ lang }) => {
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
  const [sessionId, setSessionId] = useState('');
  const [rewardResult, setRewardResult] = useState<DpfClaimResult | null>(null);
  const [videoStarted, setVideoStarted] = useState(false);
  const [videoEnded, setVideoEnded] = useState(false);
  const [challengeFeedback, setChallengeFeedback] = useState<Record<string, string>>({});
  const [surveyDeclineCount, setSurveyDeclineCount] = useState(0);
  const [surveyDismissed, setSurveyDismissed] = useState(false);

  // Anti-Bot States
  const [captchaObj, setCaptchaObj] = useState({ num1: 0, num2: 0 });
  const [captchaInput, setCaptchaInput] = useState('');
  const [captchaError, setCaptchaError] = useState(false);
  const navigate = useNavigate();
  const videoRef = useRef<HTMLVideoElement | null>(null);
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
    const nextSessionId = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
    const challengeLevels = selectBalancedChallenge(LEVELS[lang]);
    const newState: GameState = { 
      levels: challengeLevels, 
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
    setSurveyDeclineCount(0);
    setSurveyDismissed(false);
    setDemoAge('');
    setShowDemo(true);
    setIsSubmitting(false);
    setRewardResult(null);
    setVideoStarted(false);
    setVideoEnded(false);
    setChallengeFeedback({});
    setSessionId(nextSessionId);
  };

  useEffect(() => {
    setVideoStarted(false);
    setVideoEnded(false);
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  }, [gameState?.current, gameState?.levels[gameState?.current ?? 0]?.video_url]);

  const startChallengeVideo = async () => {
    setVideoStarted(true);
    setVideoEnded(false);
    try {
      await videoRef.current?.play();
    } catch (error) {
      console.error('Unable to start challenge video:', error);
    }
  };

  const claimDetectiveReward = async (score: number, totalLevels: number) => {
    const percent = Math.round((score / totalLevels) * 100);
    const result = await claimDpfReward({
      source: 'challenge',
      activityId: `detective-${sessionId}`,
      amount: percent >= 80 ? 25 : 15,
      reason: lang === 'vi' ? 'Hoan thanh thu thach Tham tu Deepfake' : 'Completed Deepfake Detective Challenge',
      dailyLimit: 3,
      minScore: 70,
      score: percent,
      metadata: {
        rawScore: score,
        totalLevels,
        challengeType: 'deepfake_detective',
      },
    });
    if (isMountedRef.current) setRewardResult(result);
  };

  const handleChoice = (choice: 1 | 2) => {
    // BẢO MẬT: Chặn Double-Click spam để hack vượt mốc điểm tuyệt đối
    if (!gameState || gameState.show_result || !videoEnded) return;
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
        const finalScore = gameState.score;
        const totalLevels = gameState.levels.length;
        setGameState(prev => prev ? ({ ...prev, finished: true }) : null);
        setShowSurvey(false);

        // --- FIREBASE: LƯU KẾT QUẢ GAME ---
          const gameResult = {
            score: finalScore,
            wrong_count: gameState.wrong_count,
            played_at: serverTimestamp(),
            lang: lang,
            device_info: navigator.userAgent, // Lưu thông tin thiết bị cơ bản
            details: {
               wrong_levels: wrongLevels.map(l => l.id), // Lưu ID các câu sai
               total_levels: gameState.levels.length,
               challenge_feedback: Object.entries(challengeFeedback)
                 .filter(([, note]) => note.trim().length > 0)
                 .map(([levelId, note]) => ({
                   level_id: levelId,
                   note: note.trim(),
                 }))
            }
          };
          addDoc(collection(db, "game_results"), gameResult)
            .catch(e => console.error("Error saving game result: ", e));

          if (Math.round((finalScore / totalLevels) * 100) >= 70) {
            void claimDetectiveReward(finalScore, totalLevels);
          } else {
            setRewardResult({
              ok: false,
              code: 'not_eligible',
              message: lang === 'vi' ? 'Can dat toi thieu 70 diem de nhan DPF coin.' : 'Score at least 70 to earn DPF coin.',
            });
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

  const declineSurvey = () => {
    if (surveyDeclineCount === 0) {
      setSurveyDeclineCount(1);
      return;
    }

    setShowSurvey(false);
    setSurveyDismissed(true);
  };


  if (gameState && gameState.finished) {
    const score = gameState.score;
    const totalQuestions = gameState.levels.length;
    const accuracyPercent = Math.round((score / totalQuestions) * 100);
    const scales = SURVEY_SCALE[lang];

    // Phân tích dữ liệu kết quả (Năng lực nhận diện chia theo nhóm)
    const morphologicalIds = ["v1", "v2", "v3", "v4", "v11", "v13", "v14", "v15", "v17", "v19", "v23", "v25", "v26", "v27", "v28", "v29", "v30"];
    const contextIds = ["v5", "v7", "v12", "v16", "v18", "v21", "v24"];
    const physicsIds = ["v6", "v8", "v9", "v10", "v20", "v22"];

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

    if (accuracyPercent >= 80) {
        statusTitle = lang === 'vi' ? "BẬC THẦY GIÁM ĐỊNH" : "MASTER DETECTIVE";
        statusDesc = lang === 'vi' ? "Kỹ năng của bạn rất tuyệt vời. Hãy chia sẻ kiến thức này để bảo vệ người thân!" : "Excellent skills. Share this knowledge to protect your loved ones!";
        statusIcon = <ShieldCheck size={48} className="text-success" />;
        statusColor = "border-success bg-success/5";
    } else if (accuracyPercent >= 50) {
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
    
    const handleShare = async (platform: 'facebook' | 'twitter' | 'native') => {
        const text = lang === 'vi' 
            ? `🎮 Tôi vừa đạt ${score}/${totalQuestions} điểm trong Thử thách Thám tử Deepfake! 🛡️\nCông nghệ AI thật đáng sợ, mọi người vào kiểm tra trình độ nhận diện của mình nhé!` 
            : `🎮 I just scored ${score}/${totalQuestions} in the Deepfake Detective Challenge! 🛡️\nAI is getting scary. Test your detection skills now!`;
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
                                ? 'Chúc mừng bạn đã xuất sắc vượt qua thử thách! Để xem bảng điểm chi tiết và phân tích các lỗi sai bạn vừa mắc phải, xin vui lòng dành ít phút hoàn thành khảo sát dưới đây. Mọi ý kiến đóng góp của bạn đều ẩn danh và vô cùng quý giá để xây dựng bộ dữ liệu bảo vệ cộng đồng.' 
                                : 'Congratulations on completing the challenge! To view your detailed score and analyze the mistakes you made, please take a few minutes to complete the survey below. Your anonymous input is highly valuable for building our community defense dataset.'}
                        </p>
                        <div className="flex flex-col sm:flex-row justify-center gap-4">
                            <button 
                                onClick={() => setShowIntro(false)}
                                className="bg-primary text-black px-8 py-4 rounded-xl font-black text-xs uppercase transition-all hover:scale-105 shadow-lg shadow-primary/20 w-full sm:w-auto"
                            >
                                {lang === 'vi' ? 'ĐỒNG Ý ĐÓNG GÓP Ý KIẾN' : 'AGREE TO CONTRIBUTE'}
                            </button>
                            <button
                                onClick={declineSurvey}
                                className="bg-white/5 text-gray-400 border border-white/10 px-8 py-4 rounded-xl font-black text-xs uppercase transition-all hover:bg-white/10 hover:text-white w-full sm:w-auto"
                            >
                                {lang === 'vi' ? 'BO QUA KHAO SAT' : 'SKIP SURVEY'}
                            </button>
                        </div>
                        {surveyDeclineCount > 0 && (
                            <p className="mt-5 text-gray-400 text-xs leading-relaxed">
                                {lang === 'vi'
                                  ? 'Neu co the, chung toi rat mong ban danh khoang mot phut de gop y an danh. Du lieu chi dung de cai thien thu thach va khong bat buoc.'
                                  : 'If possible, we would really appreciate one minute of anonymous feedback. It is optional and only helps improve the challenge.'}
                            </p>
                        )}
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
                       <div className="text-white/40 font-mono text-sm tracking-[0.4em] uppercase">{score}/{totalQuestions} {lang === 'vi' ? 'ĐIỂM CHÍNH XÁC' : 'ACCURACY SCORE'}</div>
                    </div>

                    <p className="text-gray-300 max-w-xl mb-10 leading-relaxed text-base">{statusDesc}</p>
                    <DpfRewardNotice
                      result={rewardResult}
                      successPrefix={lang === 'vi' ? 'Da nhan thuong' : 'Reward claimed'}
                    />

                    {!surveySent && !surveyDismissed && (
                      <div className="w-full max-w-xl mb-8 rounded-2xl border border-primary/20 bg-primary/5 p-6 text-left">
                        <div className="text-primary text-[10px] font-black uppercase tracking-widest mb-3">
                          {lang === 'vi' ? 'KHAO SAT TUY CHON' : 'OPTIONAL SURVEY'}
                        </div>
                        <p className="text-gray-300 text-sm leading-relaxed mb-5">
                          {surveyDeclineCount > 0
                            ? (lang === 'vi'
                                ? 'Chung toi xin phep hoi lai mot lan nua: neu ban co the, hay danh khoang mot phut gop y an danh de giup DEEPFENSE cai thien bo thu thach. Ban co quyen bo qua va khong bi anh huong diem.'
                                : 'One gentle last ask: if you can spare about a minute, anonymous feedback helps DEEPFENSE improve this challenge. You can skip it and your score is unaffected.')
                            : (lang === 'vi'
                                ? 'Cam on ban da hoan thanh thu thach. Khao sat ngan nay la tu nguyen, an danh, va chi dung de cai thien noi dung dao tao.'
                                : 'Thank you for completing the challenge. This short survey is optional, anonymous, and only used to improve the training experience.')}
                        </p>
                        <div className="flex flex-col sm:flex-row gap-3">
                          <button
                            onClick={() => {
                              setShowSurvey(true);
                              setShowIntro(true);
                            }}
                            className="bg-primary text-black px-6 py-3 rounded-xl font-black text-xs uppercase transition-all hover:scale-105"
                          >
                            {lang === 'vi' ? 'LAM KHAO SAT' : 'TAKE SURVEY'}
                          </button>
                          <button
                            onClick={declineSurvey}
                            className="bg-white/5 text-gray-400 border border-white/10 px-6 py-3 rounded-xl font-black text-xs uppercase transition-all hover:bg-white/10 hover:text-white"
                          >
                            {surveyDeclineCount > 0
                              ? (lang === 'vi' ? 'KHONG, CAM ON' : 'NO, THANKS')
                              : (lang === 'vi' ? 'BO QUA' : 'SKIP')}
                          </button>
                        </div>
                      </div>
                    )}

                    {surveyDismissed && (
                      <div className="w-full max-w-xl mb-8 rounded-2xl border border-white/10 bg-white/5 p-5 text-gray-300 text-sm leading-relaxed">
                        {lang === 'vi'
                          ? 'Cam on ban da tham gia dung thu thach. Y kien cua ban trong phan choi da giup chung toi cai thien DEEPFENSE.'
                          : 'Thank you for taking the challenge. Your participation already helps us improve DEEPFENSE.'}
                      </div>
                    )}
                    
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
            <video
                ref={videoRef}
                key={lvl.video_url}
                src={lvl.video_url}
                className="w-full h-full object-contain"
                controls={gameState.show_result || videoEnded}
                playsInline
                preload="metadata"
                onEnded={() => setVideoEnded(true)}
                onPlay={() => setVideoStarted(true)}
            />

            {!videoStarted && !gameState.show_result && (
                <div className="absolute inset-0 z-20 bg-black flex flex-col items-center justify-center text-center px-6">
                    <button
                        onClick={startChallengeVideo}
                        className="bg-primary text-black px-8 py-4 rounded-xl font-black text-xs uppercase tracking-widest shadow-lg hover:scale-105 transition-all flex items-center gap-3"
                    >
                        <Play size={18} fill="currentColor" /> {lang === 'vi' ? 'BAT DAU XEM VIDEO' : 'START VIDEO'}
                    </button>
                    <p className="mt-4 text-gray-500 text-[10px] font-bold uppercase tracking-widest max-w-sm">
                        {lang === 'vi' ? 'Xem het video roi moi dua ra nhan dinh.' : 'Watch the full video before making a judgment.'}
                    </p>
                </div>
            )}

            {videoStarted && !videoEnded && !gameState.show_result && (
                <div className="absolute bottom-4 inset-x-4 z-10 pointer-events-none flex justify-center">
                    <div className="bg-black/80 backdrop-blur px-4 py-2 rounded-lg border border-white/10 text-gray-300 text-[10px] font-black uppercase tracking-widest">
                        {lang === 'vi' ? 'Dang quan sat...' : 'Observing...'}
                    </div>
                </div>
            )}
            
            {!gameState.show_result && (
                <div className="absolute top-4 inset-x-4 flex justify-between pointer-events-none">
                    <div className="bg-black/80 backdrop-blur px-3 py-1 rounded-lg border border-primary/20 text-primary text-[9px] font-black uppercase italic">MẪU_A</div>
                    <div className="bg-black/80 backdrop-blur px-3 py-1 rounded-lg border border-secondary/20 text-secondary text-[9px] font-black uppercase italic">MẪU_B</div>
                </div>
            )}
          </div>
          
          {!gameState.show_result ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <button disabled={!videoEnded} onClick={() => handleChoice(1)} className={`py-6 border border-white/10 bg-surface font-black rounded-2xl transition-all uppercase text-xs tracking-widest shadow-xl flex items-center justify-center gap-3 group active:scale-95 ${videoEnded ? 'text-white hover:border-primary hover:text-primary' : 'text-gray-700 cursor-not-allowed opacity-60'}`}>
                    <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" /> {lang === 'vi' ? 'BÊN TRÁI LÀ GIẢ' : 'LEFT IS FAKE'}
                  </button>
                  <button disabled={!videoEnded} onClick={() => handleChoice(2)} className={`py-6 border border-white/10 bg-surface font-black rounded-2xl transition-all uppercase text-xs tracking-widest shadow-xl flex items-center justify-center gap-3 group active:scale-95 ${videoEnded ? 'text-white hover:border-secondary hover:text-secondary' : 'text-gray-700 cursor-not-allowed opacity-60'}`}>
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
                        {!gameState.last_correct && (
                            <div className="mt-4 rounded-xl border border-secondary/20 bg-black/30 p-4 text-left">
                                <div className="mb-2 text-[10px] font-black uppercase tracking-widest text-secondary">
                                    {lang === 'vi' ? 'VI SAO DAP AN CHUA DUNG?' : 'WHY WAS THIS NOT CORRECT?'}
                                </div>
                                <p className="text-sm leading-relaxed text-gray-300">{lvl.advice}</p>
                            </div>
                        )}
                    </div>
                    <button onClick={nextLevel} className="shrink-0 bg-white text-black px-10 py-4 rounded-xl font-black hover:bg-primary transition-all text-xs uppercase shadow-xl flex items-center gap-2 w-full sm:w-auto justify-center">
                      {lang === 'vi' ? 'TIẾP THEO' : 'NEXT'} <ArrowRight size={14} />
                    </button>
                </div>
                <div className="mt-4 bg-surface border border-white/10 rounded-2xl p-5 shadow-xl">
                    <label htmlFor={`challenge-feedback-${lvl.id}`} className="block text-primary text-[10px] font-black uppercase tracking-widest mb-3">
                        {lang === 'vi' ? 'Ban co thay diem gi khac chung toi khong?' : 'Did you notice anything we missed?'}
                    </label>
                    <textarea
                        id={`challenge-feedback-${lvl.id}`}
                        value={challengeFeedback[lvl.id] ?? ''}
                        onChange={(event) => setChallengeFeedback(prev => ({ ...prev, [lvl.id]: event.target.value }))}
                        maxLength={500}
                        rows={3}
                        className="w-full resize-none rounded-xl border border-white/10 bg-black/40 px-4 py-3 text-sm text-white outline-none transition-colors placeholder:text-gray-600 focus:border-primary"
                        placeholder={lang === 'vi' ? 'Hay gop y neu ban thay dau hieu khac, video bi loi, hoac dap an/giai thich can xem lai.' : 'Share any other clues you noticed, video issues, or answer/explanation concerns.'}
                    />
                    <div className="mt-2 text-right text-[10px] font-mono text-gray-600">{(challengeFeedback[lvl.id] ?? '').length}/500</div>
                </div>
            </div>
          )}
      </div>
    </div>
  );
};

const Challenge: React.FC<ChallengeProps> = ({ lang }) => {
  const [activeTab, setActiveTab] = useState<'DETECTIVE' | 'SIMULATOR'>('DETECTIVE');
  
  return (
    <div className="animate-in fade-in duration-500">
       <div className="flex flex-wrap justify-center bg-surface p-2 rounded-2xl border border-white/5 mb-8 w-fit mx-auto shadow-xl gap-2 mt-4 px-2">
        <button 
          onClick={() => setActiveTab('DETECTIVE')}
          className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-xs uppercase tracking-widest transition-all ${activeTab === 'DETECTIVE' ? 'bg-primary text-black' : 'text-gray-500 hover:text-white hover:bg-white/5'}`}
        >
          <Eye size={16} /> {lang === 'vi' ? 'THÁM TỬ DEEPFAKE' : 'DEEPFAKE DETECTIVE'}
        </button>
        <button 
          onClick={() => setActiveTab('SIMULATOR')}
          className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-xs uppercase tracking-widest transition-all ${activeTab === 'SIMULATOR' ? 'bg-secondary text-white shadow-[0_0_20px_rgba(255,42,109,0.3)]' : 'text-gray-500 hover:text-white hover:bg-white/5'}`}
        >
          <Brain size={16} /> {lang === 'vi' ? 'MÔ PHỎNG LỪA ĐẢO' : 'SCAM SIMULATOR'}
        </button>
      </div>

      {activeTab === 'DETECTIVE' ? <DetectiveGame lang={lang} /> : <Simulator lang={lang} />}
    </div>
  );
};

export default Challenge;
