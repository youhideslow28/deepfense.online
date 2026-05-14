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
      setError('Unable to load DPF coin wallet.');
      setLoading(false);
    });

    const unsubscribeLedger = listenDpfLedger(user, setLedger, (err) => {
      console.error('DPF ledger listener failed:', err);
      setError('Unable to load DPF coin history.');
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

export const useDpfBalance = (currentUser: User | null) => {
  const [wallet, setWallet] = useState<DpfWallet | null>(null);
  const [loading, setLoading] = useState(!!currentUser);

  useEffect(() => {
    if (!currentUser) {
      setWallet(null);
      setLoading(false);
      return undefined;
    }

    setLoading(true);
    const unsubscribe = listenDpfWallet(currentUser, (nextWallet) => {
      setWallet(nextWallet);
      setLoading(false);
    }, (err) => {
      console.error('DPF balance listener failed:', err);
      setWallet(null);
      setLoading(false);
    });

    return unsubscribe;
  }, [currentUser]);

  return {
    wallet,
    balance: wallet?.webBalance ?? 0,
    loading,
  };
};
