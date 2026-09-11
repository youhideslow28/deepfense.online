import React, { useState, useEffect, useRef } from 'react';
import { Target, ShieldCheck, XCircle, Play, ArrowLeft } from 'lucide-react';
import { Language } from '@/types';
import { TRANSLATIONS } from '@/data';
import { SCENARIOS, ScenarioDefinition } from '@/data/scenarios';
import { claimDpfReward, DpfClaimResult } from '@/features/dpf/dpf';
import DpfRewardNotice from '@/features/dpf/DpfRewardNotice';
import type { FamilyAudience } from '@/config/domainRouting';

interface SimulatorProps {
  lang: Language;
  audience?: FamilyAudience | null;
}

interface ChatMessage {
  id: number;
  sender: 'ai' | 'user';
  text: string;
}

const DIFFICULTY_COLORS: Record<string, string> = {
  basic: 'bg-green-500/20 text-green-400 border-green-500/40',
  medium: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/40',
  advanced: 'bg-red-500/20 text-red-400 border-red-500/40',
};

const Simulator: React.FC<SimulatorProps> = ({ lang, audience = null }) => {
  const t = TRANSLATIONS[lang];
  const scenarioPool = audience
    ? SCENARIOS.filter((scenario) => scenario.audiences?.includes(audience))
    : SCENARIOS;

  // Scenario selection state
  const [selectedScenario, setSelectedScenario] = useState<ScenarioDefinition | null>(null);

  // Simulation state
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputStr, setInputStr] = useState('');
  const [timer, setTimer] = useState(0);
  const [status, setStatus] = useState<'playing' | 'failed' | 'success' | 'idle'>('idle');
  const [sessionId, setSessionId] = useState('');
  const [rewardResult, setRewardResult] = useState<DpfClaimResult | null>(null);
  const [isTyping, setIsTyping] = useState(false);

  const chatEndRef = useRef<HTMLDivElement>(null);
  const rushTimeoutsRef = useRef<ReturnType<typeof setTimeout>[]>([]);

  const clearRushTimeouts = () => {
    rushTimeoutsRef.current.forEach((t) => clearTimeout(t));
    rushTimeoutsRef.current = [];
  };

  useEffect(() => {
    return () => {
      clearRushTimeouts();
    };
  }, []);

  useEffect(() => {
    if (messages.length > 0 || isTyping) {
      chatEndRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  }, [messages, isTyping]);

  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;
    if (status === 'playing') {
      interval = setInterval(() => setTimer((prev) => prev + 1), 1000);
    }
    return () => clearInterval(interval);
  }, [status]);

  const difficultyLabel = (level: string) => {
    if (level === 'basic') return t.difficulty_basic;
    if (level === 'medium') return t.difficulty_medium;
    return t.difficulty_advanced;
  };

  const startSimulation = (scenario: ScenarioDefinition) => {
    clearRushTimeouts();
    setStatus('playing');
    setTimer(0);
    setSessionId(`${Date.now()}-${Math.random().toString(36).slice(2, 8)}`);
    setRewardResult(null);
    setIsTyping(false);

    setMessages([
      { id: Date.now(), sender: 'ai', text: scenario.initialMessage[lang] },
    ]);

    // Tự động kích hoạt chuỗi tin nhắn dồn dập (rush messages) kèm hiệu ứng đang gõ (...)
    const rush = scenario.rushMessages || [];
    if (rush.length > 0) {
      const schedule = [
        { typeAt: 1800, sendAt: 3400, msg: rush[0] },
        { typeAt: 5200, sendAt: 7000, msg: rush[1] },
        { typeAt: 8800, sendAt: 10600, msg: rush[2] },
      ];

      schedule.forEach(({ typeAt, sendAt, msg }) => {
        if (!msg) return;
        const tType = setTimeout(() => {
          setIsTyping(true);
        }, typeAt);

        const tSend = setTimeout(() => {
          setIsTyping(false);
          setMessages((prev) => [
            ...prev,
            {
              id: Date.now() + Math.random(),
              sender: 'ai',
              text: msg[lang] || msg.vi,
            },
          ]);
        }, sendAt);

        rushTimeoutsRef.current.push(tType, tSend);
      });
    }
  };

  const handleSend = async () => {
    clearRushTimeouts();
    if (!inputStr.trim() || isTyping || !selectedScenario) return;

    const userMessage = inputStr;
    const newMessages: ChatMessage[] = [
      ...messages,
      { id: Date.now(), sender: 'user', text: userMessage },
    ];
    setMessages(newMessages);
    setInputStr('');
    setIsTyping(true);

    try {
      const apiMessages = newMessages.map((m) => ({
        role: m.sender === 'ai' ? 'model' : 'user',
        text: m.text,
      }));

      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: apiMessages,
          lang,
          mode: 'simulator',
          scenarioId: selectedScenario.id,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        setMessages((prev) => [
          ...prev,
          { id: Date.now() + 1, sender: 'ai', text: data.text },
        ]);
      } else {
        setMessages((prev) => [
          ...prev,
          {
            id: Date.now() + 1,
            sender: 'ai',
            text: lang === 'vi' ? 'Lỗi kết nối. Thử lại sau.' : 'Connection error.',
          },
        ]);
      }
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now() + 1,
          sender: 'ai',
          text: lang === 'vi' ? 'Lỗi kết nối API.' : 'API Connection error.',
        },
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleTransfer = () => {
    clearRushTimeouts();
    setIsTyping(false);
    setStatus('failed');
  };

  const handleReport = async () => {
    clearRushTimeouts();
    setIsTyping(false);
    if (!selectedScenario) return;
    setStatus('success');
    const isFast = timer <= selectedScenario.fastThreshold;
    const reward = isFast ? selectedScenario.reward.fast : selectedScenario.reward.slow;
    const result = await claimDpfReward({
      source: 'simulator',
      activityId: `${selectedScenario.id}-${sessionId}`,
      amount: reward,
      reason:
        lang === 'vi'
          ? `Vuot qua mo phong lua dao: ${selectedScenario.id}`
          : `Passed scam simulation: ${selectedScenario.id}`,
      dailyLimit: 3,
      minScore: 70,
      score: isFast ? 100 : 75,
      metadata: {
        scenarioId: selectedScenario.id,
        level: selectedScenario.level,
        detectionSeconds: timer,
      },
    });
    setRewardResult(result);
  };

  const handleRestart = () => {
    clearRushTimeouts();
    if (selectedScenario) {
      startSimulation(selectedScenario);
      setStatus('playing');
    }
  };

  const handleChangeScenario = () => {
    clearRushTimeouts();
    setIsTyping(false);
    setSelectedScenario(null);
    setStatus('idle');
    setMessages([]);
    setTimer(0);
    setRewardResult(null);
  };

  // ── SCENARIO SELECTOR VIEW ──────────────────────────────────────────
  if (!selectedScenario) {
    return (
      <div className="animate-in mt-8 space-y-8 pb-16 duration-500 fade-in">
        <div className="mb-8 border-l-4 border-primary pl-4">
          <h1 className="font-display flex items-center gap-3 text-4xl font-black uppercase tracking-tight text-slate-900 dark:text-white">
            <Target className="text-primary" size={36} />
            {audience === 'young'
              ? (lang === 'vi' ? 'KỊCH BẢN THIẾU NIÊN' : 'TEEN SCENARIOS')
              : audience === 'old'
                ? (lang === 'vi' ? 'KỊCH BẢN NGƯỜI LỚN 40+' : 'ADULTS 40+ SCENARIOS')
                : t.simulator_title}
          </h1>
        </div>

        <h2 className="text-xl font-bold uppercase tracking-[0.12em] text-slate-900 dark:text-white">
          {t.scenario_select_title}
        </h2>

        {/* Scenario cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {scenarioPool.map((scenario) => (
            <div
              key={scenario.id}
              onClick={() => {
                setSelectedScenario(scenario);
                startSimulation(scenario);
              }}
              className="group flex cursor-pointer flex-col gap-3 rounded-2xl border border-black/10 dark:border-white/10 bg-white/70 dark:bg-black/40 p-5 backdrop-blur-xl transition-all duration-200 hover:border-primary/55 hover:bg-primary/8"
            >
              <div className="flex items-start justify-between">
                <span className="text-3xl">{scenario.icon}</span>
                <span
                  className={`text-xs font-bold uppercase px-2 py-0.5 rounded-full border ${
                    DIFFICULTY_COLORS[scenario.level]
                  }`}
                >
                  {difficultyLabel(scenario.level)}
                </span>
              </div>

              <div>
                <h3 className="font-bold text-slate-900 dark:text-white text-sm leading-tight">
                  {scenario.senderName[lang]}
                </h3>
                <p className="mt-0.5 text-xs text-slate-500 dark:text-slate-400">{scenario.senderRole[lang]}</p>
              </div>

              <p className="line-clamp-2 flex-grow text-xs leading-relaxed text-slate-500 dark:text-slate-400">
                {scenario.initialMessage[lang]}
              </p>

              <div className="flex items-center justify-between pt-1 border-t border-black/10 dark:border-white/5">
                <span className="text-xs text-slate-500 dark:text-slate-400">
                  {t.reward_preview}:{' '}
                  <span className="font-bold text-blue-600 dark:text-blue-300">
                    {scenario.reward.slow}–{scenario.reward.fast} DPF
                  </span>
                </span>
                <span className="text-xs font-bold uppercase text-blue-600 dark:text-blue-300 opacity-0 transition-opacity group-hover:opacity-100">
                  {t.start_sim} →
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // ── SIMULATION VIEW ─────────────────────────────────────────────────
  const scenario = selectedScenario;
  const userRepliesCount = messages.filter((m) => m.sender === 'user').length;
  const canReport = userRepliesCount >= scenario.minExchanges;
  const remainingExchanges = Math.max(0, scenario.minExchanges - userRepliesCount);

  return (
      <div className="animate-in mt-8 space-y-8 pb-16 duration-500 fade-in">
      <div className="mb-8 flex items-center justify-between gap-4 border-l-4 border-primary pl-4">
        <h1 className="font-display flex items-center gap-3 text-4xl font-black uppercase tracking-tight text-slate-900 dark:text-white">
          <Target className="text-primary" size={36} />
          {audience === 'young'
            ? (lang === 'vi' ? 'KỊCH BẢN THIẾU NIÊN' : 'TEEN SCENARIOS')
            : audience === 'old'
              ? (lang === 'vi' ? 'KỊCH BẢN NGƯỜI LỚN 40+' : 'ADULTS 40+ SCENARIOS')
              : t.simulator_title}
        </h1>
        <button
          onClick={handleChangeScenario}
          className="flex shrink-0 items-center gap-1.5 rounded-xl border border-black/10 dark:border-white/10 px-3 py-2 text-xs font-bold uppercase tracking-wide text-slate-600 dark:text-slate-400 transition-colors hover:border-primary/50 hover:text-blue-600 dark:hover:text-blue-300"
        >
          <ArrowLeft size={14} />
          {t.change_scenario}
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

        {/* LEFT PANEL */}
        <div className="lg:col-span-1 space-y-6">
          {/* Timer runs silently in background; seconds shown only in result panels */}

          {/* Scenario info badge */}
          <div className="bg-white/90 dark:bg-black/30 border border-black/10 dark:border-white/10 rounded-2xl p-4 flex items-center gap-3 shadow-sm">
            <span className="text-2xl">{scenario.icon}</span>
            <div className="flex-grow min-w-0">
              <p className="text-slate-900 dark:text-white text-sm font-bold truncate">{scenario.senderName[lang]}</p>
              <p className="truncate text-xs text-slate-500 dark:text-slate-400">{scenario.senderRole[lang]}</p>
            </div>
            <span
              className={`text-xs font-bold uppercase px-2 py-0.5 rounded-full border shrink-0 ${
                DIFFICULTY_COLORS[scenario.level]
              }`}
            >
              {difficultyLabel(scenario.level)}
            </span>
          </div>

          {/* Situation Context Badge */}
          {scenario.situationDesc && (
            <div className="rounded-2xl border border-amber-500/30 bg-amber-500/10 p-4 backdrop-blur-md">
              <div className="flex items-center gap-2 mb-2 text-amber-600 dark:text-amber-400 font-bold text-xs uppercase tracking-wider">
                <span>⚠️</span>
                <span>{lang === 'vi' ? 'Bối cảnh tình huống' : 'Simulation Context'}</span>
              </div>
              <p className="text-xs text-slate-700 dark:text-slate-200 leading-relaxed">
                {scenario.situationDesc[lang] || scenario.situationDesc.vi}
              </p>
            </div>
          )}

          {status === 'idle' && (
            <div className="rounded-2xl border border-primary/25 bg-primary/10 p-6 text-center">
              <h3 className="font-bold text-slate-900 dark:text-white mb-2">
                {lang === 'vi' ? 'Sẵn sàng thử thách?' : 'Ready for the challenge?'}
              </h3>
              <p className="mb-6 text-sm leading-6 text-slate-600 dark:text-slate-300">
                {lang === 'vi'
                  ? 'Bạn sẽ nhận được tin nhắn từ kẻ giả mạo. Hãy tỉnh táo quyết định bước tiếp theo.'
                  : 'You will receive a message from an impersonator. Stay sharp and decide your next move.'}
              </p>
              <button
                onClick={() => startSimulation(scenario)}
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-primary p-4 font-bold uppercase tracking-[0.12em] text-white transition-colors hover:bg-blue-600 shadow-md"
              >
                <Play size={20} />
                {t.start_sim}
              </button>
            </div>
          )}

          {status === 'failed' && (
            <div className="bg-red-900/20 border border-red-500/30 rounded-2xl p-6 text-center animate-in zoom-in fade-in">
              <XCircle size={48} className="text-red-500 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">{t.trap_msg}</h3>
              <p className="mb-4 text-slate-600 dark:text-slate-300">
                {lang === 'vi' ? 'Bạn mất' : 'It took you'}{' '}
                <strong className="text-red-400">
                  {timer} {lang === 'vi' ? 'giây' : 'seconds'}
                </strong>{' '}
                {lang === 'vi' ? 'để bấm chuyển tiền và rơi vào bẫy của kẻ gian.' : 'to fall for the scam.'}
              </p>
              <div className="rounded-xl border border-black/10 dark:border-white/10 bg-slate-100 dark:bg-black/50 p-4 text-left text-sm text-slate-700 dark:text-slate-300">
                <strong>{lang === 'vi' ? 'Bài học rút ra:' : 'Lesson learned:'}</strong>{' '}
                {scenario.failLesson[lang]}
              </div>
              <button
                onClick={handleRestart}
                className="mt-4 text-sm font-bold uppercase text-blue-600 dark:text-blue-300 underline underline-offset-4 hover:text-blue-800 dark:hover:text-white"
              >
                {t.retest}
              </button>
            </div>
          )}

          {status === 'success' && (
            <div className="bg-green-900/20 border border-green-500/30 rounded-2xl p-6 text-center animate-in zoom-in fade-in">
              <ShieldCheck size={48} className="text-green-500 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">{t.verify_msg}</h3>
              <p className="mb-4 text-slate-600 dark:text-slate-300">
                {lang === 'vi' ? 'Bạn chỉ mất' : 'It only took you'}{' '}
                <strong className="text-green-400">
                  {timer} {lang === 'vi' ? 'giây' : 'seconds'}
                </strong>{' '}
                {lang === 'vi'
                  ? 'để phát hiện chiêu trò lừa đảo và dừng lại kịp thời.'
                  : 'to recognize this scam script.'}
              </p>
              <div className="rounded-xl border border-black/10 dark:border-white/10 bg-slate-100 dark:bg-black/50 p-4 text-left text-sm text-slate-700 dark:text-slate-300">
                ✅{' '}
                <strong>{lang === 'vi' ? 'Điểm mấu chốt giúp bạn an toàn:' : 'Key takeaway:'}</strong>{' '}
                {scenario.successLesson[lang]}
              </div>
              <DpfRewardNotice
                result={rewardResult}
                successPrefix={lang === 'vi' ? 'Da nhan thuong' : 'Reward claimed'}
              />
              <button
                onClick={handleRestart}
                className="mt-4 text-sm font-bold uppercase text-blue-600 dark:text-blue-300 underline underline-offset-4 hover:text-blue-800 dark:hover:text-white"
              >
                {t.replay}
              </button>
            </div>
          )}
        </div>

        {/* RIGHT PANEL: CHAT */}
        <div className="flex h-[600px] flex-col overflow-hidden rounded-2xl border border-black/10 dark:border-white/10 bg-white/90 dark:bg-black/40 backdrop-blur-xl lg:col-span-2 shadow-lg">

          {/* Chat header */}
          <div className="bg-white dark:bg-black/80 p-4 border-b border-black/10 dark:border-white/10 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div
                className={`w-10 h-10 rounded-full bg-gradient-to-br ${scenario.avatarColor} flex items-center justify-center font-bold text-white text-xs shadow-sm`}
              >
                {scenario.senderInitials}
              </div>
              <div>
                <h3 className="font-bold text-slate-900 dark:text-white">{scenario.senderName[lang]}</h3>
                <p className="text-xs text-green-500 font-semibold">Online</p>
              </div>
            </div>
            {status === 'playing' && canReport && (
              <button
                onClick={handleReport}
                className="bg-green-600/20 hover:bg-green-600 text-green-700 dark:text-green-400 hover:text-white border border-green-500/50 hover:border-green-600 text-xs px-3 py-1.5 rounded uppercase font-bold transition-colors animate-in fade-in duration-300"
              >
                {t.report_scam}
              </button>
            )}
          </div>

          {/* Messages */}
          <div className="flex-grow p-6 overflow-y-auto space-y-4 bg-slate-50/70 dark:bg-transparent">
            {messages.map((m) => (
              <div
                key={m.id}
                className={`flex ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {m.sender === 'ai' && (
                  <div
                    className={`w-8 h-8 rounded-full bg-gradient-to-br ${scenario.avatarColor} text-white flex items-center justify-center font-bold text-xs mr-2 mt-1 shrink-0 shadow-sm`}
                  >
                    {scenario.senderInitials}
                  </div>
                )}
                <div
                  className={`max-w-[75%] p-3 rounded-2xl ${
                    m.sender === 'user'
                      ? 'rounded-br-none bg-primary text-white shadow-sm'
                      : 'rounded-bl-none bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 border border-slate-200/90 dark:border-transparent shadow-sm'
                  }`}
                >
                  {m.text}
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex items-end justify-start gap-2 animate-in fade-in duration-200">
                <div
                  className={`w-8 h-8 rounded-full bg-gradient-to-br ${scenario.avatarColor} text-white flex items-center justify-center font-bold text-xs mr-1 shrink-0 shadow-sm`}
                >
                  {scenario.senderInitials}
                </div>
                <div className="flex items-center gap-1.5 rounded-2xl rounded-bl-none bg-white dark:bg-slate-800/90 border border-slate-200 dark:border-slate-700/60 px-4 py-2.5 shadow-md">
                  <span className="w-2 h-2 rounded-full bg-blue-500 animate-bounce" style={{ animationDelay: '0ms' }} />
                  <span className="w-2 h-2 rounded-full bg-blue-500 animate-bounce" style={{ animationDelay: '150ms' }} />
                  <span className="w-2 h-2 rounded-full bg-blue-500 animate-bounce" style={{ animationDelay: '300ms' }} />
                  <span className="ml-2 text-xs font-medium text-slate-600 dark:text-slate-400 italic">
                    {scenario.senderName[lang]} {lang === 'vi' ? 'đang nhập...' : 'is typing...'}
                  </span>
                </div>
              </div>
            )}
            <div ref={chatEndRef} />
          </div>

          {/* Input area */}
          <div className="p-4 bg-white dark:bg-black/60 border-t border-black/10 dark:border-white/10">
            {status === 'playing' ? (
              <div className="flex flex-col gap-3">
                <div className="flex items-center gap-2 relative">
                  <input
                    type="text"
                    value={inputStr}
                    onChange={(e) => setInputStr(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                    disabled={isTyping}
                    placeholder={t.chat_placeholder}
                    className="flex-grow rounded-xl border border-slate-300 dark:border-white/10 bg-white dark:bg-[#101827] px-4 py-3 text-slate-900 dark:text-white transition-colors placeholder:text-slate-400 dark:placeholder:text-slate-600 focus:border-primary focus:outline-none shadow-sm"
                  />
                  <button
                    onClick={handleSend}
                    disabled={isTyping}
                    className="absolute right-4 text-xs font-bold uppercase text-blue-600 dark:text-blue-300 hover:text-blue-800 dark:hover:text-blue-100"
                  >
                    {lang === 'vi' ? 'GỬI' : 'SEND'}
                  </button>
                </div>

                <div className="flex flex-col gap-2">
                  <div className="flex gap-2 justify-end">
                    {/* Transfer button — always visible so user can fall for the trap */}
                    <button
                      onClick={handleTransfer}
                      className={`${scenario.actionColor} text-white px-6 py-2 rounded-xl text-sm font-bold uppercase transition-colors shadow-sm`}
                    >
                      {scenario.actionLabel[lang]}
                    </button>
                    {/* Reject button — unlocks after enough exchanges */}
                    {canReport && (
                      <button
                        onClick={handleReport}
                        className="animate-in rounded-xl border border-black/20 dark:border-white/20 bg-white dark:bg-black px-6 py-2 text-sm font-bold uppercase text-slate-700 dark:text-slate-300 transition-colors duration-300 fade-in hover:border-green-500 hover:text-green-600 dark:hover:text-green-400 shadow-sm"
                      >
                        {t.reject_btn}
                      </button>
                    )}
                  </div>
                  {!canReport && (
                    <p className="text-right text-xs uppercase tracking-[0.12em] text-slate-500">
                      {lang === 'vi'
                        ? `💬 Còn ${remainingExchanges} lượt đối đáp nữa để mở khóa nút từ chối / báo cáo...`
                        : `💬 ${remainingExchanges} more exchange${remainingExchanges > 1 ? 's' : ''} to unlock the reject button...`}
                    </p>
                  )}
                </div>
              </div>
            ) : (
              <div className="p-2 text-center font-mono text-sm uppercase tracking-[0.12em] text-slate-500">
                {status === 'idle' ? t.chat_inactive : t.session_ended}
              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  );
};

export default Simulator;
