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
import { AlertTriangle, BadgeCheck, KeyRound, Mail, ShieldCheck, UserPlus } from 'lucide-react';
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
    const viMessages: Record<string, string> = {
      'auth/email-already-in-use': 'Email này đã có tài khoản. Hãy đăng nhập hoặc dùng quên mật khẩu.',
      'auth/invalid-credential': 'Email hoặc mật khẩu chưa đúng.',
      'auth/weak-password': 'Mật khẩu cần mạnh hơn, tối thiểu 8 ký tự.',
      'auth/operation-not-allowed': 'Firebase chưa bật Email/Password trong Authentication.',
      'auth/too-many-requests': 'Bạn thử quá nhiều lần. Hãy chờ một lát rồi đăng nhập lại.',
      'auth/user-not-found': 'Không tìm thấy tài khoản với email này.',
    };
    const enMessages: Record<string, string> = {
      'auth/email-already-in-use': 'This email already has an account. Sign in or reset the password.',
      'auth/invalid-credential': 'Email or password is incorrect.',
      'auth/weak-password': 'Password should be stronger, at least 8 characters.',
      'auth/operation-not-allowed': 'Email/Password provider is not enabled in Firebase Authentication.',
      'auth/too-many-requests': 'Too many attempts. Please wait and try again.',
      'auth/user-not-found': 'No account was found for this email.',
    };

    if (!code) return fallback;
    return (isVi ? viMessages[code] : enMessages[code]) || `${fallback} (${code})`;
  };

  const registerLearner = async (currentUser: User) => {
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

    await Promise.all([
      setDoc(userRef, {
        uid: currentUser.uid,
        email: emailValue,
        displayName: currentUser.displayName || currentUser.email?.split('@')[0] || 'Deepfense learner',
        photoURL: currentUser.photoURL || '',
        authProvider: currentUser.providerData[0]?.providerId || 'password',
        ...initialUserState,
        ...(isAdmin ? { role: 'admin' } : {}),
        updatedAt: serverTimestamp(),
      }, { merge: true }),
      setDoc(learnerRef, {
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
      }, { merge: true }),
    ]);
  };

  useEffect(() => {
    if (!user) return;
    registerLearner(user).catch((error) => console.error('Unable to sync learner:', error));
  }, [user]);

  const validateEmailPassword = () => {
    if (!isFirebaseConfigured) {
      setMessage(isVi
        ? `Firebase chưa được cấu hình: ${missingFirebaseEnvKeys.join(', ')}`
        : `Firebase is not configured: ${missingFirebaseEnvKeys.join(', ')}`);
      return false;
    }
    if (!email.trim()) {
      setMessage(isVi ? 'Vui lòng nhập email.' : 'Please enter your email.');
      return false;
    }
    if (!password) {
      setMessage(isVi ? 'Vui lòng nhập mật khẩu.' : 'Please enter your password.');
      return false;
    }
    return true;
  };

  const handleCreateAccount = async (event: React.FormEvent) => {
    event.preventDefault();
    setBusy(true);
    setMessage('');

    try {
      if (!validateEmailPassword()) return;
      if (!displayName.trim()) {
        setMessage(isVi ? 'Vui lòng nhập tên hiển thị.' : 'Please enter a display name.');
        return;
      }
      if (password.length < 8) {
        setMessage(isVi ? 'Mật khẩu cần ít nhất 8 ký tự.' : 'Password must be at least 8 characters.');
        return;
      }
      if (password !== confirmPassword) {
        setMessage(isVi ? 'Mật khẩu xác nhận chưa khớp.' : 'Password confirmation does not match.');
        return;
      }

      const result = await createUserWithEmailAndPassword(auth, email.trim().toLowerCase(), password);
      await updateProfile(result.user, { displayName: displayName.trim() });
      await registerLearner(result.user);
      navigate('/profile', { replace: true });
    } catch (error) {
      setMessage(authMessage(error, isVi ? 'Không thể tạo tài khoản.' : 'Unable to create account.'));
    } finally {
      setBusy(false);
    }
  };

  const handleEmailPassword = async (event: React.FormEvent) => {
    event.preventDefault();
    setBusy(true);
    setMessage('');

    try {
      if (!validateEmailPassword()) return;
      const result = await signInWithEmailAndPassword(auth, email.trim().toLowerCase(), password);
      await registerLearner(result.user);
      navigate('/profile', { replace: true });
    } catch (error) {
      setMessage(authMessage(error, isVi ? 'Không thể đăng nhập.' : 'Unable to sign in.'));
    } finally {
      setBusy(false);
    }
  };

  const handleForgotPassword = async () => {
    setBusy(true);
    setMessage('');

    try {
      if (!email.trim()) {
        setMessage(isVi ? 'Nhập email trước, rồi bấm quên mật khẩu.' : 'Enter your email first, then request a reset link.');
        return;
      }

      await sendPasswordResetEmail(auth, email.trim().toLowerCase());
      setMessage(isVi
        ? 'Đã gửi email đặt lại mật khẩu. Hãy kiểm tra hộp thư và thư rác.'
        : 'Password reset email sent. Check your inbox and spam folder.');
    } catch (error) {
      setMessage(authMessage(error, isVi ? 'Không thể gửi email đặt lại mật khẩu.' : 'Unable to send password reset email.'));
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
        <div className="absolute -right-20 -bottom-20 h-64 w-64 rounded-full bg-cyan-500/8 blur-[100px]" />

        <div className="relative z-10 grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-center">
          <div className="lg:col-span-6">
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-blue-400/25 bg-blue-400/10 px-4 py-1.5 text-[10px] font-mono uppercase tracking-widest text-blue-300">
              <ShieldCheck size={13} /> DEEPFENSE AUTH
            </div>
            <h1 className="text-3xl font-black uppercase leading-tight text-white md:text-5xl" style={{ fontFamily: "'Outfit', 'Inter', Arial, sans-serif" }}>
              {isVi ? 'Đăng nhập để lưu tiến độ học.' : 'Sign in to save your learning progress.'}
            </h1>
            <p className="mt-5 max-w-xl text-sm leading-relaxed text-gray-400 md:text-base">
              {isVi
                ? 'Tạo tài khoản bằng email và mật khẩu để lưu bài học, thử thách, chứng nhận và DPF coin. Tài khoản admin được phân quyền riêng, người dùng thường không thể vào dashboard quản trị.'
                : 'Create an email/password account to save lessons, challenges, certificates, and DPF coin. Admin accounts use a separate role, so regular users cannot access the admin dashboard.'}
            </p>
            <div className="mt-6 grid max-w-xl grid-cols-1 gap-3 sm:grid-cols-3">
              {[
                [isVi ? 'Lưu tiến độ' : 'Progress saved', isVi ? 'Quiz và bài học đi theo tài khoản.' : 'Lessons and quizzes follow your account.'],
                [isVi ? 'Nhận DPF' : 'Earn DPF', isVi ? 'Điểm thưởng hiển thị nhanh trên thanh trên.' : 'Rewards appear in the top bar.'],
                [isVi ? 'An toàn' : 'Safer access', isVi ? 'Admin được khóa bằng role riêng.' : 'Admin is protected by role gates.'],
              ].map(([title, text]) => (
                <div key={title} className="rounded-2xl border border-white/10 bg-white/[0.035] p-3">
                  <div className="text-xs font-black uppercase tracking-wide text-white">{title}</div>
                  <div className="mt-1 text-[11px] leading-relaxed text-gray-500">{text}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-6">
            <div className="glass-dark rounded-2xl border border-white/10 p-5 md:p-8">
              {user ? (
                <div className="space-y-5">
                  <div className="rounded-xl border border-emerald-400/20 bg-emerald-400/10 p-4">
                    <div className="flex items-center gap-2 text-sm font-black text-white"><BadgeCheck size={16} /> {user.displayName || user.email}</div>
                    <div className="mt-1 text-xs text-emerald-200/80">{user.email}</div>
                  </div>
                  <div className="flex flex-col gap-3 sm:flex-row">
                    <GlowButton color="primary" size="md" icon={<ShieldCheck size={16} />} onClick={() => navigate('/profile')}>
                      {isVi ? 'MỞ HỒ SƠ' : 'OPEN PROFILE'}
                    </GlowButton>
                    <button onClick={handleSignOut} disabled={busy} className="rounded-lg border border-white/10 px-4 py-3 text-xs font-black uppercase tracking-widest text-gray-300 hover:border-red-400/30 hover:text-red-200">
                      {isVi ? 'Đăng xuất' : 'Sign out'}
                    </button>
                  </div>
                </div>
              ) : (
                <div className="space-y-5">
                  <div className="grid grid-cols-2 gap-2 rounded-xl border border-white/10 bg-black/25 p-1">
                    <button type="button" onClick={() => { setMode('login'); setMessage(''); }} className={`rounded-lg px-3 py-2 text-[10px] font-black uppercase tracking-widest transition-colors ${mode === 'login' ? 'bg-blue-500 text-black' : 'text-gray-500 hover:text-white'}`}>
                      {isVi ? 'Đăng nhập' : 'Sign in'}
                    </button>
                    <button type="button" onClick={() => { setMode('register'); setMessage(''); }} className={`rounded-lg px-3 py-2 text-[10px] font-black uppercase tracking-widest transition-colors ${mode === 'register' ? 'bg-emerald-400 text-black' : 'text-gray-500 hover:text-white'}`}>
                      {isVi ? 'Tạo tài khoản' : 'Create account'}
                    </button>
                  </div>

                  <div className="pt-2">
                    <div className="mb-3 flex items-center gap-2 text-[10px] font-mono font-black uppercase tracking-widest text-gray-500">
                      {mode === 'login' ? <KeyRound size={13} /> : <UserPlus size={13} />}
                      {mode === 'login' ? (isVi ? 'Đăng nhập email' : 'Email sign in') : (isVi ? 'Tạo tài khoản mới' : 'Create a new account')}
                    </div>
                    <form onSubmit={mode === 'login' ? handleEmailPassword : handleCreateAccount} className="space-y-3">
                      {mode === 'register' && (
                        <label className="block">
                          <span className="mb-1 block text-[10px] font-mono uppercase tracking-widest text-gray-500">{isVi ? 'Tên hiển thị' : 'Display name'}</span>
                          <input value={displayName} onChange={(event) => setDisplayName(event.target.value)} type="text" className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-3 text-sm text-white outline-none transition-all focus:border-blue-500/50 focus:bg-white/10" placeholder={isVi ? 'Nguyễn Văn A' : 'Your name'} />
                        </label>
                      )}
                      <label className="block">
                        <span className="mb-1 block text-[10px] font-mono uppercase tracking-widest text-gray-500">Email</span>
                        <div className="flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-3 transition-all focus-within:border-blue-500/50 focus-within:bg-white/10">
                          <Mail size={14} className="text-gray-500" />
                          <input value={email} onChange={(event) => setEmail(event.target.value)} type="email" className="w-full bg-transparent py-3 text-sm text-white outline-none" placeholder="you@example.com" />
                        </div>
                      </label>
                      <label className="block">
                        <span className="mb-1 block text-[10px] font-mono uppercase tracking-widest text-gray-500">{isVi ? 'Mật khẩu' : 'Password'}</span>
                        <input value={password} onChange={(event) => setPassword(event.target.value)} type="password" className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-3 text-sm text-white outline-none transition-all focus:border-blue-500/50 focus:bg-white/10" placeholder="••••••••" />
                      </label>
                      {mode === 'register' && (
                        <label className="block">
                          <span className="mb-1 block text-[10px] font-mono uppercase tracking-widest text-gray-500">{isVi ? 'Xác nhận mật khẩu' : 'Confirm password'}</span>
                          <input value={confirmPassword} onChange={(event) => setConfirmPassword(event.target.value)} type="password" className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-3 text-sm text-white outline-none transition-all focus:border-blue-500/50 focus:bg-white/10" placeholder="••••••••" />
                        </label>
                      )}
                      {mode === 'login' && (
                        <button type="button" onClick={handleForgotPassword} disabled={busy} className="text-[10px] font-mono font-black uppercase tracking-widest text-blue-400 transition-colors hover:text-blue-200 disabled:opacity-60">
                          {isVi ? 'Quên mật khẩu?' : 'Forgot password?'}
                        </button>
                      )}
                      <button disabled={busy} className={`w-full rounded-lg border px-4 py-3 text-xs font-black uppercase tracking-widest disabled:opacity-60 ${mode === 'login' ? 'border-amber-400/20 bg-amber-400/10 text-amber-200 hover:bg-amber-400/15' : 'border-emerald-400/20 bg-emerald-400/10 text-emerald-200 hover:bg-emerald-400/15'}`}>
                        {busy
                          ? (isVi ? 'Đang xử lý...' : 'Processing...')
                          : mode === 'login'
                            ? (isVi ? 'Đăng nhập' : 'Sign in')
                            : (isVi ? 'Tạo tài khoản' : 'Create account')}
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
