import React, { useState } from 'react';
import { CheckCircle2, ChevronRight, Coins, LockKeyhole } from 'lucide-react';
import type { User } from 'firebase/auth';
import type { Language } from '@/types';
import { claimDpfReward } from '@/features/dpf/dpf';

interface WinterCheckpointProps {
  lang: Language;
  user: User | null;
  completedLessons: number;
  onStartCourse: () => void;
}

type RewardState = 'idle' | 'claiming' | 'claimed' | 'already-claimed' | 'error';

const WINTER_CHECKPOINT_ID = 'winter-signal-academy-2026';

const WinterCheckpoint: React.FC<WinterCheckpointProps> = ({
  lang,
  user,
  completedLessons,
  onStartCourse,
}) => {
  const isVi = lang === 'vi';
  const [rewardState, setRewardState] = useState<RewardState>('idle');
  const [showRewardVisual, setShowRewardVisual] = useState(false);
  const hasLearningProgress = completedLessons > 0;
  const isResolved = rewardState === 'claimed' || rewardState === 'already-claimed';

  const claimReward = async () => {
    if (!user || !hasLearningProgress || rewardState === 'claiming' || isResolved) return;

    setRewardState('claiming');
    const result = await claimDpfReward({
      source: 'seasonal',
      activityId: WINTER_CHECKPOINT_ID,
      amount: 25,
      reason: isVi ? 'Hoàn thành Winter Checkpoint tại Academy' : 'Completed the Winter Checkpoint in Academy',
      dailyLimit: 3,
      metadata: {
        event: 'winter-signal',
        checkpoint: 'first-academy-lesson',
      },
    });

    if (result.ok) {
      setRewardState('claimed');
      setShowRewardVisual(true);
    } else if (result.code === 'already_claimed' || result.code === 'quota_exceeded') {
      setRewardState('already-claimed');
    } else {
      setRewardState('error');
    }
  };

  const detail = isResolved
    ? (isVi ? 'Mốc học tập này đã được ghi nhận.' : 'This learning milestone has been recorded.')
    : hasLearningProgress
      ? (isVi ? 'Bài học đầu tiên đã hoàn thành. Bạn có thể nhận phần thưởng.' : 'Your first lesson is complete. You can now claim the reward.')
      : (isVi ? 'Hoàn thành một bài học trong DEEPFENSE ACADEMY để mở phần thưởng.' : 'Complete one lesson in DEEPFENSE ACADEMY to unlock the reward.');

  return (
    <section className="winter-checkpoint relative overflow-hidden rounded-xl border border-cyan-300/20 bg-[#07111f]/[0.88] p-4 shadow-[0_18px_46px_rgba(0,0,0,0.18)] md:p-5">
      <div className="winter-checkpoint-line absolute inset-x-5 top-0 h-px" aria-hidden="true" />
      <div className="relative grid gap-4 md:grid-cols-[minmax(0,1fr)_auto] md:items-center md:gap-6">
        <div className="flex min-w-0 items-start gap-3">
          <div className={`mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border ${
            hasLearningProgress ? 'border-cyan-300/35 bg-cyan-300/10 text-cyan-200' : 'border-white/10 bg-white/[0.04] text-slate-400'
          }`}>
            {hasLearningProgress ? (
              <img
                className="winter-checkpoint-crystal"
                src="/assets/winter/ice-crystal.svg"
                alt=""
                draggable={false}
              />
            ) : <LockKeyhole size={16} />}
          </div>
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
              <span className="font-mono text-[10px] font-bold uppercase tracking-[0.12em] text-cyan-200/80">
                Winter Signal
              </span>
              <span className="text-[10px] font-semibold text-slate-500 dark:text-slate-400">
                {isVi ? 'Mốc học tập 01' : 'Learning milestone 01'}
              </span>
            </div>
            <h2 className="mt-1 text-base font-black text-slate-900 dark:text-white md:text-lg">
              {isVi ? 'Winter Checkpoint' : 'Winter Checkpoint'}
            </h2>
            <p className="mt-1 max-w-2xl text-sm leading-6 text-slate-600 dark:text-slate-300/85">
              {detail}
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3 md:justify-end">
          <div className="min-w-[5.5rem] border-l border-black/10 pl-3 text-left dark:border-white/10 md:text-right">
            <div className={`text-lg font-black ${hasLearningProgress ? 'text-cyan-300' : 'text-slate-500'}`}>
              {hasLearningProgress ? '1/1' : '0/1'}
            </div>
            <div className="text-[10px] font-bold uppercase tracking-[0.08em] text-slate-500 dark:text-slate-400">
              {isVi ? 'tiến độ' : 'progress'}
            </div>
          </div>

          {hasLearningProgress ? (
            <button
              type="button"
              onClick={claimReward}
              disabled={rewardState === 'claiming' || isResolved}
              className={`inline-flex min-h-10 items-center justify-center gap-2 rounded-lg border px-4 py-2 text-xs font-black uppercase tracking-[0.06em] transition-colors disabled:cursor-default ${
                isResolved
                  ? 'border-emerald-300/25 bg-emerald-400/10 text-emerald-200'
                  : 'border-cyan-300/35 bg-cyan-300/10 text-cyan-100 hover:border-cyan-200/60 hover:bg-cyan-300/15'
              }`}
            >
              {isResolved ? <CheckCircle2 size={15} /> : <Coins size={15} />}
              {rewardState === 'claiming'
                ? (isVi ? 'Đang ghi nhận' : 'Recording')
                : isResolved
                  ? (isVi ? 'Đã nhận' : 'Claimed')
                  : (isVi ? 'Nhận +25 DPF' : 'Claim +25 DPF')}
            </button>
          ) : (
            <button
              type="button"
              onClick={onStartCourse}
              className="inline-flex min-h-10 items-center justify-center gap-2 rounded-lg border border-cyan-300/25 bg-cyan-300/[0.07] px-4 py-2 text-xs font-black uppercase tracking-[0.06em] text-cyan-100 transition-colors hover:border-cyan-200/50 hover:bg-cyan-300/[0.12]"
            >
              {isVi ? 'Vào bài học' : 'Open lesson'} <ChevronRight size={15} />
            </button>
          )}

          {showRewardVisual && (
            <span className="winter-reward-visual pointer-events-none inline-flex h-10 w-10 shrink-0" aria-hidden="true">
              <video
                autoPlay
                muted
                playsInline
                preload="none"
                src="/assets/winter/security-shield.mp4"
                onEnded={() => setShowRewardVisual(false)}
              />
            </span>
          )}
        </div>
      </div>

      {rewardState === 'error' && (
        <p className="relative mt-3 text-xs font-medium text-amber-300">
          {isVi ? 'Chưa thể ghi nhận phần thưởng. Hãy thử lại sau.' : 'The reward could not be recorded. Please try again.'}
        </p>
      )}
    </section>
  );
};

export default WinterCheckpoint;
