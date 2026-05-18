import React, { useState, useEffect, useRef } from 'react';
import { Target, Timer, ShieldCheck, XCircle, Play, ArrowLeft } from 'lucide-react';
import { Language } from '@/types';
import { TRANSLATIONS } from '@/data';
import { SCENARIOS, ScenarioDefinition } from '@/data/scenarios';
import { claimDpfReward, DpfClaimResult } from '@/features/dpf/dpf';
import DpfRewardNotice from '@/features/dpf/DpfRewardNotice';

interface SimulatorProps {
  lang: Language;
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

const Simulator: React.FC<SimulatorProps> = ({ lang }) => {
  const t = TRANSLATIONS[lang];

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
    setStatus('playing');
    setTimer(0);
    setSessionId(`${Date.now()}-${Math.random().toString(36).slice(2, 8)}`);
    setRewardResult(null);
    setMessages([
      { id: Date.now(), sender: 'ai', text: scenario.initialMessage[lang] },
    ]);
  };

  const handleSend = async () => {
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

  const handleTransfer = () => setStatus('failed');

  const handleReport = async () => {
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
    if (selectedScenario) {
      startSimulation(selectedScenario);
      setStatus('playing');
    }
  };

  const handleChangeScenario = () => {
    setSelectedScenario(null);
    setStatus('idle');
    setMessages([]);
    setTimer(0);
    setRewardResult(null);
  };

  // ── SCENARIO SELECTOR VIEW ──────────────────────────────────────────
  if (!selectedScenario) {
    return (
      <div className="space-y-8 animate-in mt-8 fade-in duration-500 pb-16">
        <div className="border-l-4 border-purple-500 pl-4 mb-8">
          <h1 className="text-4xl font-black text-white uppercase tracking-wider flex items-center gap-3">
            <Target className="text-purple-500" size={36} />
            {t.simulator_title}
          </h1>
        </div>

        <h2 className="text-xl font-bold text-white uppercase tracking-widest">
          {t.scenario_select_title}
        </h2>

        {/* Scenario cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {SCENARIOS.map((scenario) => (
            <div
              key={scenario.id}
              onClick={() => {
                setSelectedScenario(scenario);
                startSimulation(scenario);
              }}
              className="group cursor-pointer bg-black/40 border border-white/10 hover:border-purple-500/60 rounded-2xl p-5 backdrop-blur-xl transition-all duration-200 hover:bg-purple-900/10 flex flex-col gap-3"
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
                <h3 className="font-bold text-white text-sm leading-tight">
                  {scenario.senderName[lang]}
                </h3>
                <p className="text-xs text-gray-400 mt-0.5">{scenario.senderRole[lang]}</p>
              </div>

              <p className="text-xs text-gray-500 line-clamp-2 flex-grow">
                {scenario.initialMessage[lang]}
              </p>

              <div className="flex items-center justify-between pt-1 border-t border-white/5">
                <span className="text-xs text-gray-500">
                  {t.reward_preview}:{' '}
                  <span className="text-purple-400 font-bold">
                    {scenario.reward.slow}–{scenario.reward.fast} DPF
                  </span>
                </span>
                <span className="text-xs text-purple-400 opacity-0 group-hover:opacity-100 transition-opacity font-bold uppercase">
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

  return (
    <div className="space-y-8 animate-in mt-8 fade-in duration-500 pb-16">
      <div className="border-l-4 border-purple-500 pl-4 mb-8 flex items-center justify-between gap-4">
        <h1 className="text-4xl font-black text-white uppercase tracking-wider flex items-center gap-3">
          <Target className="text-purple-500" size={36} />
          {t.simulator_title}
        </h1>
        <button
          onClick={handleChangeScenario}
          className="flex items-center gap-1.5 text-xs text-gray-400 hover:text-purple-400 uppercase font-bold tracking-wide border border-white/10 hover:border-purple-500/50 rounded-xl px-3 py-2 transition-colors shrink-0"
        >
          <ArrowLeft size={14} />
          {t.change_scenario}
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

        {/* LEFT PANEL */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-black/40 border border-white/10 rounded-2xl p-6 backdrop-blur-xl flex flex-col items-center">
            <Timer
              size={48}
              className={status === 'playing' ? 'text-yellow-500 animate-pulse' : 'text-gray-500'}
            />
            <div className="text-6xl font-mono mt-4 mb-2 font-black text-white">{timer}s</div>
            <p className="text-gray-400 text-sm uppercase tracking-widest text-center">
              {t.detection_time}
            </p>
          </div>

          {/* Scenario info badge */}
          <div className="bg-black/30 border border-white/10 rounded-2xl p-4 flex items-center gap-3">
            <span className="text-2xl">{scenario.icon}</span>
            <div className="flex-grow min-w-0">
              <p className="text-white text-sm font-bold truncate">{scenario.senderName[lang]}</p>
              <p className="text-gray-500 text-xs truncate">{scenario.senderRole[lang]}</p>
            </div>
            <span
              className={`text-xs font-bold uppercase px-2 py-0.5 rounded-full border shrink-0 ${
                DIFFICULTY_COLORS[scenario.level]
              }`}
            >
              {difficultyLabel(scenario.level)}
            </span>
          </div>

          {status === 'idle' && (
            <div className="bg-purple-900/20 border border-purple-500/30 rounded-2xl p-6 text-center">
              <h3 className="font-bold text-white mb-2">
                {lang === 'vi' ? 'Sẵn sàng thử thách?' : 'Ready for the challenge?'}
              </h3>
              <p className="text-sm text-gray-300 mb-6">
                {lang === 'vi'
                  ? 'Bạn sẽ nhận được tin nhắn từ kẻ giả mạo. Hãy tỉnh táo quyết định bước tiếp theo.'
                  : 'You will receive a message from an impersonator. Stay sharp and decide your next move.'}
              </p>
              <button
                onClick={() => startSimulation(scenario)}
                className="w-full bg-purple-600 hover:bg-purple-500 text-white p-4 rounded-xl font-bold uppercase tracking-widest transition-colors flex items-center justify-center gap-2"
              >
                <Play size={20} />
                {t.start_sim}
              </button>
            </div>
          )}

          {status === 'failed' && (
            <div className="bg-red-900/20 border border-red-500/30 rounded-2xl p-6 text-center animate-in zoom-in fade-in">
              <XCircle size={48} className="text-red-500 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-white mb-2">{t.trap_msg}</h3>
              <p className="text-gray-300 mb-4">
                {lang === 'vi' ? 'Bạn mất' : 'It took you'}{' '}
                <strong className="text-red-400">
                  {timer} {lang === 'vi' ? 'giây' : 'seconds'}
                </strong>{' '}
                {lang === 'vi' ? 'để quy hàng trước kịch bản tâm lý.' : 'to fall for the script.'}
              </p>
              <div className="bg-black/50 p-4 rounded-xl text-left border border-white/10 text-sm text-gray-400">
                ⚠️{' '}
                <strong>{lang === 'vi' ? 'Bài học:' : 'Lesson:'}</strong>{' '}
                {scenario.failLesson[lang]}
              </div>
              <button
                onClick={handleRestart}
                className="mt-4 text-purple-400 hover:text-white underline underline-offset-4 text-sm font-bold uppercase"
              >
                {t.retest}
              </button>
            </div>
          )}

          {status === 'success' && (
            <div className="bg-green-900/20 border border-green-500/30 rounded-2xl p-6 text-center animate-in zoom-in fade-in">
              <ShieldCheck size={48} className="text-green-500 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-white mb-2">{t.verify_msg}</h3>
              <p className="text-gray-300 mb-4">
                {lang === 'vi' ? 'Bạn chỉ mất' : 'It only took you'}{' '}
                <strong className="text-green-400">
                  {timer} {lang === 'vi' ? 'giây' : 'seconds'}
                </strong>{' '}
                {lang === 'vi'
                  ? 'để nhận diện ra đây là lừa đảo.'
                  : 'to recognize this scam script.'}
              </p>
              <div className="bg-black/50 p-4 rounded-xl text-left border border-white/10 text-sm text-gray-400">
                ✅{' '}
                <strong>{lang === 'vi' ? 'Lý do đúng:' : 'Reason:'}</strong>{' '}
                {scenario.successLesson[lang]}
              </div>
              <DpfRewardNotice
                result={rewardResult}
                successPrefix={lang === 'vi' ? 'Da nhan thuong' : 'Reward claimed'}
              />
              <button
                onClick={handleRestart}
                className="mt-4 text-purple-400 hover:text-white underline underline-offset-4 text-sm font-bold uppercase"
              >
                {t.replay}
              </button>
            </div>
          )}
        </div>

        {/* RIGHT PANEL: CHAT */}
        <div className="lg:col-span-2 flex flex-col bg-black/40 border border-white/10 rounded-2xl backdrop-blur-xl h-[600px] overflow-hidden">

          {/* Chat header */}
          <div className="bg-black/80 p-4 border-b border-white/10 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div
                className={`w-10 h-10 rounded-full bg-gradient-to-br ${scenario.avatarColor} flex items-center justify-center font-bold text-white text-xs`}
              >
                {scenario.senderInitials}
              </div>
              <div>
                <h3 className="font-bold text-white">{scenario.senderName[lang]}</h3>
                <p className="text-xs text-green-400">Online</p>
              </div>
            </div>
            {status === 'playing' && messages.length >= 1 + scenario.minExchanges * 2 && (
              <button
                onClick={handleReport}
                className="bg-green-600/20 hover:bg-green-600 text-green-500 hover:text-white border border-green-500/50 hover:border-green-600 text-xs px-3 py-1.5 rounded uppercase font-bold transition-colors animate-in fade-in duration-300"
              >
                {t.report_scam}
              </button>
            )}
          </div>

          {/* Messages */}
          <div className="flex-grow p-6 overflow-y-auto space-y-4">
            {messages.map((m) => (
              <div
                key={m.id}
                className={`flex ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {m.sender === 'ai' && (
                  <div
                    className={`w-8 h-8 rounded-full bg-gradient-to-br ${scenario.avatarColor} text-white flex items-center justify-center font-bold text-xs mr-2 mt-1 shrink-0`}
                  >
                    {scenario.senderInitials}
                  </div>
                )}
                <div
                  className={`max-w-[75%] p-3 rounded-2xl ${
                    m.sender === 'user'
                      ? 'bg-purple-600 text-white rounded-br-none'
                      : 'bg-gray-800 text-gray-200 rounded-bl-none'
                  }`}
                >
                  {m.text}
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-gray-800 text-gray-400 text-xs p-2 rounded-2xl">
                  {lang === 'vi' ? '...đang gõ' : '...typing'}
                </div>
              </div>
            )}
            <div ref={chatEndRef} />
          </div>

          {/* Input area */}
          <div className="p-4 bg-black/60 border-t border-white/10">
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
                    className="flex-grow bg-[#1a1a1a] border border-white/10 text-white px-4 py-3 rounded-xl focus:outline-none focus:border-purple-500 transition-colors"
                  />
                  <button
                    onClick={handleSend}
                    disabled={isTyping}
                    className="absolute right-4 text-purple-500 hover:text-purple-400 uppercase text-xs font-bold"
                  >
                    {lang === 'vi' ? 'GỬI' : 'SEND'}
                  </button>
                </div>

                <div className="flex flex-col gap-2">
                  <div className="flex gap-2 justify-end">
                    {/* Transfer button — always visible so user can fall for the trap */}
                    <button
                      onClick={handleTransfer}
                      className={`${scenario.actionColor} text-white px-6 py-2 rounded-xl text-sm font-bold uppercase transition-colors`}
                    >
                      {scenario.actionLabel[lang]}
                    </button>
                    {/* Reject button — unlocks after enough exchanges */}
                    {messages.length >= 1 + scenario.minExchanges * 2 && (
                      <button
                        onClick={handleReport}
                        className="bg-black border border-white/20 hover:border-green-500 text-gray-300 hover:text-green-500 px-6 py-2 rounded-xl text-sm font-bold uppercase transition-colors animate-in fade-in duration-300"
                      >
                        {t.reject_btn}
                      </button>
                    )}
                  </div>
                  {messages.length < 1 + scenario.minExchanges * 2 && (
                    <p className="text-right text-gray-600 text-xs uppercase tracking-widest">
                      {(() => {
                        const exchangesDone = Math.floor((messages.length - 1) / 2);
                        const remaining = scenario.minExchanges - exchangesDone;
                        return lang === 'vi'
                          ? `💬 Còn ${remaining} lượt trao đổi nữa để mở khoá nút từ chối...`
                          : `💬 ${remaining} more exchange${remaining > 1 ? 's' : ''} to unlock the reject button...`;
                      })()}
                    </p>
                  )}
                </div>
              </div>
            ) : (
              <div className="text-center text-gray-500 text-sm p-2 uppercase font-mono tracking-wider">
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
