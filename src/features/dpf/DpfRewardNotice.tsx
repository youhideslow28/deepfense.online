import React from 'react';
import { AlertCircle, CheckCircle2, Coins } from 'lucide-react';
import { DpfClaimResult, DpfUnlockResult } from './dpf';

interface DpfRewardNoticeProps {
  result: DpfClaimResult | DpfUnlockResult | null;
  successPrefix?: string;
}

const DpfRewardNotice: React.FC<DpfRewardNoticeProps> = ({ result, successPrefix = 'DPF' }) => {
  if (!result) return null;

  if (result.ok) {
    const amount = 'amount' in result ? result.amount : result.cost;
    return (
      <div className="mt-4 rounded-xl border border-success/25 bg-success/10 px-4 py-3 text-success flex items-center gap-2 text-xs font-bold">
        <CheckCircle2 size={15} />
        <span>{successPrefix}: {amount} DPF</span>
      </div>
    );
  }

  const isAuth = result.code === 'auth_required';
  return (
    <div className={`mt-4 rounded-xl border px-4 py-3 flex items-center gap-2 text-xs font-bold ${isAuth ? 'border-amber-400/25 bg-amber-400/10 text-amber-300' : 'border-red-400/25 bg-red-400/10 text-red-300'}`}>
      {isAuth ? <Coins size={15} /> : <AlertCircle size={15} />}
      <span>{result.message}</span>
    </div>
  );
};

export default DpfRewardNotice;
