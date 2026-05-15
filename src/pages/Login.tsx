import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import type { User } from 'firebase/auth';
import {
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from 'firebase/auth';
import { doc, getDoc, serverTimestamp, setDoc } from 'firebase/firestore';
import { AlertTriangle, KeyRound, LogIn, Mail, ShieldCheck, UserPlus } from 'lucide-react';
import GlowButton from '@/components/ui/GlowButton';
import { auth, db, isFirebaseConfigured, missingFirebaseEnvKeys } from '@/config/firebase';
import { ensureDpfWallet } from '@/features/dpf/dpf';
import { Language } from '@/types';

interface LoginProps {
  lang: Language;
  user: User | null;
}

const Login: React.FC<LoginProps> = ({ lang, user }) => {
  const isVi = lang === 'vi';
  const navigate = useNavigate();
  const [mode, setMode] = useState<'login' | 'register'>('login');
  const [displayName, setDisplayName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState('');

  const authMessage = (error: unknown, fallback: string) => {
    const code = typeof error === 'object' && error && 'code' in error ? String((error as { code?: unknown }).code) : '';
    
    if (code === 'auth/popup-blocked') {
      return isVi 
        ? 'TrÃ¬nh duyá»‡t Ä‘Ã£ cháº·n cá»­a sá»• báº­t lÃªn. Vui lÃ²ng cho phÃ©p popup cho trang web nÃ y.' 
        : 'Browser blocked the popup. Please allow popups for this site.';
    }
    if (code === 'auth/unauthorized-domain') {
      return isVi 
        ? 'TÃªn miá»n (Domain) nÃ y chÆ°a Ä‘Æ°á»£c cáº¥p quyá»n trong Firebase Console (Authorized Domains). HÃ£y thÃªm 127.0.0.1 hoáº·c localhost vÃ o danh sÃ¡ch.' 
        : 'This domain is not authorized in Firebase Console. Please add 127.0.0.1 or localhost to Authorized Domains.';
    }
    if (code === 'auth/popup-closed-by-user') {
      return isVi 
        ? 'Cá»­a sá»• Ä‘Äƒng nháº­p Ä‘Ã£ bá»‹ Ä‘Ã³ng trÆ°á»›c khi hoÃ n táº¥t.' 
        : 'The login popup was closed before completion.';
    }
    
    return code ? `${fallback} [MÃ£ lá»—i: ${code}]` : fallback;
  };

  const registerLearner = async (currentUser: User) => {
    try {
      await ensureDpfWallet(currentUser);
      const userRef = doc(db, 'users', currentUser.uid);
      const learnerRef = doc(db, 'academy_learners', currentUser.uid);
      const [userSnap, learnerSnap] = await Promise.all([getDoc(userRef), getDoc(learnerRef)]);
      const emailValue = currentUser.email || '';
      const isAdmin = emailValue.toLowerCase() === 'deepfense@gmail.com';

      const initialUserState = userSnap.exists() ? {} : {
        role: isAdmin ? 'admin' : 'user',
        status: 'active',
        score: 0,
        totalChallenges: 0,
        correctAnswers: 0,
        accuracy: 0,
        flags: 0,
        createdAt: serverTimestamp(),
        lastActiveAt: serverTimestamp(),
      };
      const initialLearningState = learnerSnap.exists() ? {} : {
        status: 'signed_in',
        progressPercent: 0,
        completedModules: [],
        courseEvaluationSubmitted: false,
        finalExam: null,
        certificateUnlocked: false,
        certificateId: '',
        completedAt: null,
      };

      await setDoc(userRef, {
        uid: currentUser.uid,
        email: emailValue,
        displayName: currentUser.displayName || currentUser.email?.split('@')[0] || 'Deepfense learner',
        photoURL: currentUser.photoURL || '',
        authProvider: currentUser.providerData[0]?.providerId || 'password',
        ...initialUserState,
        ...(isAdmin ? { role: 'admin' } : {}),
        updatedAt: serverTimestamp(),
      }, { merge: true });

      await setDoc(learnerRef, {
        uid: currentUser.uid,
        email: emailValue,
        displayName: currentUser.displayName || '',
        photoURL: currentUser.photoURL || '',
        provider: currentUser.providerData[0]?.providerId || 'firebase',
        course: 'DEEPFENSE BASICS',
        credentialTarget: 'DEEPFENSE AWARE',
        rewardTarget: { amount: 500, symbol: 'DPF' },
        ...initialLearningState,
        updatedAt: serverTimestamp(),
      }, { merge: true });
    } catch (e) {
      console.error('Registration failed:', e);
    }
  };

  useEffect(() => {
    if (!user) return;
    registerLearner(user).catch(() => undefined);
  }, [user]);


  const handleCreateAccount = async (event: React.FormEvent) => {
    event.preventDefault();
    setBusy(true);
    setMessage('');

    try {
      if (!isFirebaseConfigured) {
        setMessage(isVi
          ? `Firebase chÆ°a Ä‘Æ°á»£c cáº¥u hÃ¬nh: ${missingFirebaseEnvKeys.join(', ')}`
          : `Firebase is not configured: ${missingFirebaseEnvKeys.join(', ')}`);
        return;
      }

      if (!displayName.trim()) {
        setMessage(isVi ? 'Vui lÃ²ng nháº­p tÃªn hiá»ƒn thá»‹.' : 'Please enter a display name.');
        return;
      }

      if (!email.trim()) {
        setMessage(isVi ? 'Vui lÃ²ng nháº­p email.' : 'Please enter an email.');
        return;
      }

      if (password.length < 8) {
        setMessage(isVi ? 'Máº­t kháº©u cáº§n Ã­t nháº¥t 8 kÃ½ tá»±.' : 'Password must be at least 8 characters.');
        return;
      }

      if (password !== confirmPassword) {
        setMessage(isVi ? 'Máº­t kháº©u xÃ¡c nháº­n chÆ°a khá»›p.' : 'Password confirmation does not match.');
        return;
      }

      const result = await createUserWithEmailAndPassword(auth, email.trim().toLowerCase(), password);
      await updateProfile(result.user, { displayName: displayName.trim() });
      await registerLearner(result.user);
      navigate('/profile', { replace: true });
    } catch (error) {
      setMessage(authMessage(error, isVi ? 'KhÃ´ng thá»ƒ táº¡o tÃ i khoáº£n.' : 'Unable to create account.'));
    } finally {
      setBusy(false);
    }
  };

  const handleEmailPassword = async (event: React.FormEvent) => {
    event.preventDefault();
    setBusy(true);
    setMessage('');

    try {
      const result = await signInWithEmailAndPassword(auth, email.trim().toLowerCase(), password);
      await registerLearner(result.user);
      navigate('/profile', { replace: true });
    } catch (error) {
      setMessage(authMessage(error, isVi ? 'KhÃ´ng thá»ƒ Ä‘Äƒng nháº­p báº±ng email/password.' : 'Unable to sign in with email/password.'));
    } finally {
      setBusy(false);
    }
  };

  const handleForgotPassword = async () => {
    setBusy(true);
    setMessage('');

    try {
      if (!email.trim()) {
        setMessage(isVi ? 'Nháº­p email trÆ°á»›c, rá»“i báº¥m quÃªn máº­t kháº©u.' : 'Enter your email first, then request a reset link.');
        return;
      }

      await sendPasswordResetEmail(auth, email.trim().toLowerCase());
      setMessage(isVi
        ? 'ÄÃ£ gá»­i email Ä‘áº·t láº¡i máº­t kháº©u. HÃ£y kiá»ƒm tra há»™p thÆ° VÃ€ THÆ¯ RÃC (SPAM).'
        : 'Password reset email sent. Check your inbox AND SPAM folder.');
    } catch (error) {
      setMessage(authMessage(error, isVi ? 'KhÃ´ng thá»ƒ gá»­i email Ä‘áº·t láº¡i máº­t kháº©u.' : 'Unable to send password reset email.'));
    } finally {
      setBusy(false);
    }
  };

  const handleSignOut = async () => {
    setBusy(true);
    await signOut(auth);
    setBusy(false);
  };

  return (
    <div className="mx-auto max-w-5xl animate-in fade-in slide-in-from-bottom-4 duration-700">
      <section className="glass-dark relative overflow-hidden rounded-3xl border border-white/10 p-6 shadow-[0_32px_120px_rgba(0,0,0,0.5)] md:p-10">
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-blue-500/50 to-transparent" />
        <div className="absolute -left-20 -top-20 h-64 w-64 rounded-full bg-blue-600/10 blur-[100px]" />
        <div className="absolute -right-20 -bottom-20 h-64 w-64 rounded-full bg-purple-600/10 blur-[100px]" />
        <div className="relative z-10 grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-center">
          <div className="lg:col-span-6">
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-blue-400/25 bg-blue-400/10 px-4 py-1.5 text-[10px] font-mono uppercase tracking-widest text-blue-300">
              <ShieldCheck size={13} /> DEEPFENSE AUTH
            </div>
            <h1 className="text-3xl font-black uppercase leading-tight text-white md:text-5xl" style={{ fontFamily: "'Outfit', 'Inter', Arial, sans-serif" }}>
              {isVi ? 'ÄÄƒng nháº­p Ä‘á»ƒ lÆ°u tiáº¿n Ä‘á»™ há»c.' : 'Sign in to save your learning progress.'}
            </h1>
            <p className="mt-5 max-w-xl text-sm leading-relaxed text-gray-400 md:text-base">
              {isVi
                ? 'NgÆ°á»i há»c cÃ³ thá»ƒ Ä‘Äƒng nháº­p hoáº·c tá»± táº¡o tÃ i khoáº£n báº±ng email vÃ  máº­t kháº©u Ä‘á»ƒ lÆ°u quiz, chá»©ng nháº­n vÃ  DPF coin. TÃ i khoáº£n admin Ä‘Æ°á»£c phÃ¢n quyá»n riÃªng trong há»‡ thá»‘ng.'
                : 'Learners can sign in or create an email/password account for quizzes, certificates, and DPF coin. Admin accounts are handled through a separate role.'}
            </p>
          </div>

          <div className="lg:col-span-6">
            <div className="glass-dark rounded-2xl border border-white/10 p-5 md:p-8">
              {user ? (
                <div className="space-y-5">
                  <div className="rounded-xl border border-emerald-400/20 bg-emerald-400/10 p-4">
                    <div className="text-sm font-black text-white">{user.displayName || user.email}</div>
                    <div className="mt-1 text-xs text-emerald-200/80">{user.email}</div>
                  </div>
                  <div className="flex flex-col gap-3 sm:flex-row">
                    <GlowButton color="primary" size="md" icon={<ShieldCheck size={16} />} onClick={() => navigate('/profile')}>
                      {isVi ? 'Má»ž Há»’ SÆ ' : 'OPEN PROFILE'}
                    </GlowButton>
                    <button onClick={handleSignOut} disabled={busy} className="rounded-lg border border-white/10 px-4 py-3 text-xs font-black uppercase tracking-widest text-gray-300 hover:border-red-400/30 hover:text-red-200">
                      {isVi ? 'ÄÄƒng xuáº¥t' : 'Sign out'}
                    </button>
                  </div>
                </div>
              ) : (
                <div className="space-y-5">
                  <div className="grid grid-cols-2 gap-2 rounded-xl border border-white/10 bg-black/25 p-1">
                    <button
                      type="button"
                      onClick={() => { setMode('login'); setMessage(''); }}
                      className={`rounded-lg px-3 py-2 text-[10px] font-black uppercase tracking-widest transition-colors ${mode === 'login' ? 'bg-blue-500 text-black' : 'text-gray-500 hover:text-white'}`}
                    >
                      {isVi ? 'ÄÄƒng nháº­p' : 'Sign in'}
                    </button>
                    <button
                      type="button"
                      onClick={() => { setMode('register'); setMessage(''); }}
                      className={`rounded-lg px-3 py-2 text-[10px] font-black uppercase tracking-widest transition-colors ${mode === 'register' ? 'bg-emerald-400 text-black' : 'text-gray-500 hover:text-white'}`}
                    >
                      {isVi ? 'Táº¡o tÃ i khoáº£n' : 'Create account'}
                    </button>
                  </div>


                  <div className="pt-2">
                    <div className="mb-3 flex items-center gap-2 text-[10px] font-mono font-black uppercase tracking-widest text-gray-500">
                      {mode === 'login' ? <KeyRound size={13} /> : <UserPlus size={13} />}
                      {mode === 'login' ? (isVi ? 'ÄÄƒng nháº­p email' : 'Email sign in') : (isVi ? 'Táº¡o tÃ i khoáº£n má»›i' : 'Create a new account')}
                    </div>
                    <form onSubmit={mode === 'login' ? handleEmailPassword : handleCreateAccount} className="space-y-3">
                      {mode === 'register' && (
                        <label className="block">
                          <span className="mb-1 block text-[10px] font-mono uppercase tracking-widest text-gray-500">{isVi ? 'TÃªn hiá»ƒn thá»‹' : 'Display name'}</span>
                        <input value={displayName} onChange={(event) => setDisplayName(event.target.value)} type="text" className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-3 text-sm text-white outline-none focus:border-blue-500/50 focus:bg-white/10 transition-all" placeholder={isVi ? 'Nguyá»…n VÄƒn A' : 'Your name'} />
                        </label>
                      )}
                      <label className="block">
                        <span className="mb-1 block text-[10px] font-mono uppercase tracking-widest text-gray-500">Email</span>
                        <div className="flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-3 focus-within:border-blue-500/50 focus-within:bg-white/10 transition-all">
                          <Mail size={14} className="text-gray-500" />
                          <input value={email} onChange={(event) => setEmail(event.target.value)} type="email" className="w-full bg-transparent py-3 text-sm text-white outline-none" placeholder="you@example.com" />
                        </div>
                      </label>
                      <label className="block">
                        <span className="mb-1 block text-[10px] font-mono uppercase tracking-widest text-gray-500">{isVi ? 'Máº­t kháº©u' : 'Password'}</span>
                        <input value={password} onChange={(event) => setPassword(event.target.value)} type="password" className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-3 text-sm text-white outline-none focus:border-blue-500/50 focus:bg-white/10 transition-all" placeholder="â€¢â€¢â€¢â€¢â€¢â€¢â€¢â€¢" />
                      </label>
                      {mode === 'register' && (
                        <label className="block">
                          <span className="mb-1 block text-[10px] font-mono uppercase tracking-widest text-gray-500">{isVi ? 'XÃ¡c nháº­n máº­t kháº©u' : 'Confirm password'}</span>
                          <input value={confirmPassword} onChange={(event) => setConfirmPassword(event.target.value)} type="password" className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-3 text-sm text-white outline-none focus:border-blue-500/50 focus:bg-white/10 transition-all" placeholder="â€¢â€¢â€¢â€¢â€¢â€¢â€¢â€¢" />
                        </label>
                      )}
                      {mode === 'login' && (
                        <button type="button" onClick={handleForgotPassword} disabled={busy} className="text-[10px] font-mono font-black uppercase tracking-widest text-blue-400 hover:text-blue-200 disabled:opacity-60 transition-colors">
                          {isVi ? 'QuÃªn máº­t kháº©u?' : 'Forgot password?'}
                        </button>
                      )}
                      <button disabled={busy} className={`w-full rounded-lg border px-4 py-3 text-xs font-black uppercase tracking-widest disabled:opacity-60 ${mode === 'login' ? 'border-amber-400/20 bg-amber-400/10 text-amber-200 hover:bg-amber-400/15' : 'border-emerald-400/20 bg-emerald-400/10 text-emerald-200 hover:bg-emerald-400/15'}`}>
                        {busy
                          ? (isVi ? 'Äang xá»­ lÃ½...' : 'Processing...')
                          : mode === 'login'
                            ? (isVi ? 'ÄÄƒng nháº­p' : 'Sign in')
                            : (isVi ? 'Táº¡o tÃ i khoáº£n' : 'Create account')}
                      </button>
                    </form>
                  </div>

                  {message && (
                    <div className="flex gap-3 rounded-xl border border-red-400/20 bg-red-500/10 p-4 text-xs leading-relaxed text-red-100">
                      <AlertTriangle size={16} className="mt-0.5 shrink-0" />
                      <span>{message}</span>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Login;
