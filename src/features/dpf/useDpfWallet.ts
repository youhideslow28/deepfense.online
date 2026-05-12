import { useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import type { User } from 'firebase/auth';
import { auth } from '@/config/firebase';
import { DpfLedgerEntry, DpfWallet, listenDpfLedger, listenDpfWallet } from './dpf';

export const useDpfWallet = () => {
  const [user, setUser] = useState<User | null>(auth.currentUser);
  const [wallet, setWallet] = useState<DpfWallet | null>(null);
  const [ledger, setLedger] = useState<DpfLedgerEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => onAuthStateChanged(auth, (currentUser) => {
    setUser(currentUser);
    if (!currentUser) {
      setWallet(null);
      setLedger([]);
      setLoading(false);
    }
  }), []);

  useEffect(() => {
    if (!user) return undefined;

    setLoading(true);
    setError('');

    const unsubscribeWallet = listenDpfWallet(user, (nextWallet) => {
      setWallet(nextWallet);
      setLoading(false);
    }, (err) => {
      console.error('DPF wallet listener failed:', err);
      setError('Unable to load DPF wallet.');
      setLoading(false);
    });

    const unsubscribeLedger = listenDpfLedger(user, setLedger, (err) => {
      console.error('DPF ledger listener failed:', err);
      setError('Unable to load DPF history.');
    });

    return () => {
      unsubscribeWallet();
      unsubscribeLedger();
    };
  }, [user]);

  return {
    user,
    wallet,
    ledger,
    loading,
    error,
    signedIn: !!user,
  };
};
