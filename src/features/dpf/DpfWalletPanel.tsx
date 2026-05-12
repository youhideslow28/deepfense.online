import React from 'react';
import { Coins, History, LockKeyhole, Sparkles } from 'lucide-react';
import { Language } from '@/types';
import { useDpfWallet } from './useDpfWallet';

interface DpfWalletPanelProps {
  lang: Language;
  compact?: boolean;
}

const formatAmount = (amount: number) => new Intl.NumberFormat('en-US', { maximumFractionDigits: 0 }).format(amount);

const DpfWalletPanel: React.FC<DpfWalletPanelProps> = ({ lang, compact = false }) => {
  const { signedIn, wallet, ledger, loading, error } = useDpfWallet();
  const isVi = lang === 'vi';

  if (!signedIn) {
    return (
      <div className="rounded-2xl border border-amber-400/20 bg-amber-400/[0.06] p-4 md:p-5">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-xl border border-amber-400/20 bg-amber-400/10 text-amber-300 flex items-center justify-center">
            <Coins size={20} />
          </div>
          <div>
            <div className="text-[10px] font-mono uppercase tracking-[0.2em] text-amber-300">DPF Wallet</div>
            <p className="text-sm text-gray-400">
              {isVi ? 'Dang nhap Gmail de nhan va dung DPF web.' : 'Sign in with Gmail to earn and spend web DPF.'}
            </p>
          </div>
        </div>
      </div>
    );
  }

  const balance = wallet?.webBalance ?? 0;

  return (
    <div className="rounded-2xl border border-primary/20 bg-primary/[0.06] p-4 md:p-5">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-3">
          <div className="h-11 w-11 rounded-xl border border-primary/25 bg-primary/10 text-primary flex items-center justify-center">
            <Coins size={22} />
          </div>
          <div>
            <div className="text-[10px] font-mono uppercase tracking-[0.2em] text-primary">DPF Web Balance</div>
            <div className="text-2xl font-black text-white leading-tight">
              {loading ? '...' : formatAmount(balance)} <span className="text-sm text-primary">DPF</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2 md:w-[260px]">
          <div className="rounded-xl border border-white/10 bg-black/20 p-3">
            <div className="flex items-center gap-1.5 text-[10px] font-mono uppercase text-gray-500"><Sparkles size={12} /> Earned</div>
            <div className="text-white font-black">{formatAmount(wallet?.earnedBalance ?? 0)}</div>
          </div>
          <div className="rounded-xl border border-white/10 bg-black/20 p-3">
            <div className="flex items-center gap-1.5 text-[10px] font-mono uppercase text-gray-500"><LockKeyhole size={12} /> Spent</div>
            <div className="text-white font-black">{formatAmount(wallet?.spentBalance ?? 0)}</div>
          </div>
        </div>
      </div>

      {!compact && (
        <div className="mt-4 border-t border-white/10 pt-4">
          <div className="mb-3 flex items-center gap-2 text-[10px] font-mono font-black uppercase tracking-widest text-gray-500">
            <History size={13} /> {isVi ? 'Lich su gan day' : 'Recent activity'}
          </div>
          {error ? (
            <div className="text-xs text-red-300">{error}</div>
          ) : ledger.length ? (
            <div className="space-y-2">
              {ledger.slice(0, 4).map((entry) => (
                <div key={entry.id} className="flex items-center justify-between gap-3 rounded-xl border border-white/8 bg-black/20 px-3 py-2">
                  <span className="min-w-0 truncate text-xs text-gray-400">{entry.reason}</span>
                  <span className={`shrink-0 text-xs font-black ${entry.direction === 'credit' ? 'text-success' : 'text-amber-300'}`}>
                    {entry.direction === 'credit' ? '+' : '-'}{formatAmount(entry.amount)} DPF
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-xs text-gray-500">
              {isVi ? 'Chua co giao dich DPF. Hay thu mot thu thach.' : 'No DPF activity yet. Try a challenge.'}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default DpfWalletPanel;
