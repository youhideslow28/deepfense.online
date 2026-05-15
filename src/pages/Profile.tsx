import React, { useMemo, useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import type { User } from 'firebase/auth';
import {
  GoogleAuthProvider,
  linkWithPopup,
  reload,
  sendEmailVerification,
  sendPasswordResetEmail,
  signOut,
  updateProfile,
} from 'firebase/auth';
import { doc, serverTimestamp, setDoc } from 'firebase/firestore';
import { AlertTriangle, BadgeCheck, Coins, Link as LinkIcon, LogOut, MailCheck, RefreshCw, Save, ShieldCheck, UserCircle } from 'lucide-react';
import GlowButton from '@/components/ui/GlowButton';
import { auth, db } from '@/config/firebase';
import { useDpfWallet } from '@/features/dpf/useDpfWallet';
import { Language } from '@/types';

interface ProfileProps {
  lang: Language;
  user: User | null;
  authBusy: boolean;
}

const Profile: React.FC<ProfileProps> = ({ lang, user, authBusy }) => {
  const isVi = lang === 'vi';
  const navigate = useNavigate();
  const { wallet, loading: walletLoading } = useDpfWallet();
  const [displayName, setDisplayName] = useState(user?.displayName || '');
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState('');

  const linkedProviders = useMemo(
    () => new Set(user?.providerData.map((provider) => provider.providerId) || []),
    [user],
  );
  const hasGoogle = linkedProviders.has('google.com');
  const hasPassword = linkedProviders.has('password');

  if (!authBusy && !user) {
    return <Navigate to="/login" replace />;
  }

  const authMessage = (error: unknown, fallback: string) => {
    const code = typeof error === 'object' && error && 'code' in error ? String((error as { code?: unknown }).code) : '';
    return code ? `${fallback} (${code})` : fallback;
  };

  const syncUserDocuments = async (currentUser: User) => {
    const payload = {
      uid: currentUser.uid,
      email: currentUser.email || '',
      displayName: currentUser.displayName || '',
      photoURL: currentUser.photoURL || '',
      emailVerified: currentUser.emailVerified,
      authProviders: currentUser.providerData.map((provider) => provider.providerId),
      updatedAt: serverTimestamp(),
    };

    await Promise.all([
      setDoc(doc(db, 'users', currentUser.uid), payload, { merge: true }),
      setDoc(doc(db, 'academy_learners', currentUser.uid), payload, { merge: true }),
    ]);
  };

  const handleSaveProfile = async () => {
    if (!auth.currentUser) return;
    setBusy(true);
    setMessage('');

    try {
      await updateProfile(auth.currentUser, { displayName: displayName.trim() || auth.currentUser.displayName || '' });
      await syncUserDocuments(auth.currentUser);
      setMessage(isVi ? 'Đã cập nhật hồ sơ.' : 'Profile updated.');
    } catch (error) {
      setMessage(authMessage(error, isVi ? 'Không thể cập nhật hồ sơ.' : 'Unable to update profile.'));
    } finally {
      setBusy(false);
    }
  };

  const handleVerifyEmail = async () => {
    if (!auth.currentUser) return;
    setBusy(true);
    setMessage('');

    try {
      await sendEmailVerification(auth.currentUser);
      setMessage(isVi
        ? 'Đã gửi email xác minh. Hãy kiểm tra hộp thư VÀ THƯ RÁC (SPAM).'
        : 'Verification email sent. Check your inbox AND SPAM folder.');
    } catch (error) {
      setMessage(authMessage(error, isVi ? 'Không thể gửi email xác minh.' : 'Unable to send verification email.'));
    } finally {
      setBusy(false);
    }
  };

  const handleRefreshVerification = async () => {
    if (!auth.currentUser) return;
    setBusy(true);
    setMessage('');

    try {
      await reload(auth.currentUser);
      await syncUserDocuments(auth.currentUser);
      setMessage(auth.currentUser.emailVerified
        ? (isVi ? 'Email đã được xác minh.' : 'Email is verified.')
        : (isVi ? 'Email vẫn chưa được xác minh.' : 'Email is still not verified.'));
    } catch (error) {
      setMessage(authMessage(error, isVi ? 'Không thể kiểm tra trạng thái email.' : 'Unable to refresh email status.'));
    } finally {
      setBusy(false);
    }
  };


  const handleResetPassword = async () => {
    if (!user?.email) return;
    setBusy(true);
    setMessage('');

    try {
      await sendPasswordResetEmail(auth, user.email);
      setMessage(isVi 
        ? 'Đã gửi email đặt lại mật khẩu. Hãy kiểm tra hộp thư VÀ THƯ RÁC (SPAM).' 
        : 'Password reset email sent. Check your inbox AND SPAM folder.');
    } catch (error) {
      setMessage(authMessage(error, isVi ? 'Không thể gửi email đặt lại mật khẩu.' : 'Unable to send password reset email.'));
    } finally {
      setBusy(false);
    }
  };

  const handleSignOut = async () => {
    await signOut(auth);
    navigate('/login', { replace: true });
  };

  if (authBusy || !user) {
    return (
      <div className="mx-auto max-w-4xl rounded-2xl border border-white/10 bg-black/30 p-8 text-sm text-gray-400">
        {isVi ? 'Đang tải hồ sơ...' : 'Loading profile...'}
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-5xl animate-in fade-in slide-in-from-bottom-4 duration-700">
      <section className="glass-dark relative overflow-hidden rounded-3xl border border-white/10 p-5 shadow-[0_32px_120px_rgba(0,0,0,0.5)] md:p-10">
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-blue-500/50 to-transparent" />
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-blue-400/25 bg-blue-400/10 px-4 py-1.5 text-[10px] font-mono uppercase tracking-widest text-blue-300">
              <UserCircle size={13} /> {isVi ? 'Hồ sơ người học' : 'Learner profile'}
            </div>
            <h1 className="text-3xl font-black leading-tight text-white md:text-4xl" style={{ fontFamily: "'Outfit', 'Inter', Arial, sans-serif" }}>
              {user.displayName || user.email?.split('@')[0] || 'Deepfense learner'}
            </h1>
            <p className="mt-3 text-sm leading-relaxed text-gray-400">
              {isVi
                ? 'Quản lý tài khoản, xác minh email và theo dõi DPF coin của bạn.'
                : 'Manage your account, verify email, and track your DPF coin.'}
            </p>

            <div className="mt-6 grid grid-cols-2 gap-3">
              <div className="rounded-xl border border-cyan-400/20 bg-cyan-400/10 p-4">
                <div className="flex items-center gap-2 text-[10px] font-mono font-black uppercase tracking-widest text-cyan-200">
                  <Coins size={13} /> DPF Coin
                </div>
                <div className="mt-2 text-3xl font-black text-white">{walletLoading ? '...' : wallet?.webBalance ?? 0}</div>
              </div>
              <div className={`rounded-xl border p-4 ${user.emailVerified ? 'border-emerald-400/20 bg-emerald-400/10' : 'border-amber-400/20 bg-amber-400/10'}`}>
                <div className="flex items-center gap-2 text-[10px] font-mono font-black uppercase tracking-widest text-white/70">
                  <MailCheck size={13} /> Email
                </div>
                <div className="mt-3 text-xs font-black uppercase tracking-widest text-white">
                  {user.emailVerified ? (isVi ? 'Đã xác minh' : 'Verified') : (isVi ? 'Chưa xác minh' : 'Unverified')}
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7">
            <div className="glass-dark rounded-2xl border border-white/10 p-5 md:p-8">
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <label className="block md:col-span-2">
                  <span className="mb-1 block text-[10px] font-mono uppercase tracking-widest text-gray-500">{isVi ? 'Tên hiển thị' : 'Display name'}</span>
                  <input value={displayName} onChange={(event) => setDisplayName(event.target.value)} className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-3 text-sm text-white outline-none focus:border-blue-500/50 focus:bg-white/10 transition-all" />
                </label>
                <label className="block md:col-span-2">
                  <span className="mb-1 block text-[10px] font-mono uppercase tracking-widest text-gray-500">Email</span>
                  <input value={user.email || ''} readOnly className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-3 text-sm text-gray-400 outline-none" />
                </label>

                <button onClick={handleSaveProfile} disabled={busy} className="inline-flex items-center justify-center gap-2 rounded-lg border border-blue-400/20 bg-blue-400/10 px-4 py-3 text-xs font-black uppercase tracking-widest text-blue-200 hover:bg-blue-400/15 disabled:opacity-60">
                  <Save size={14} /> {isVi ? 'Lưu hồ sơ' : 'Save profile'}
                </button>
                <button onClick={handleResetPassword} disabled={busy || !hasPassword} className="inline-flex items-center justify-center gap-2 rounded-lg border border-amber-400/20 bg-amber-400/10 px-4 py-3 text-xs font-black uppercase tracking-widest text-amber-200 hover:bg-amber-400/15 disabled:opacity-40">
                  <ShieldCheck size={14} /> {isVi ? 'Đổi mật khẩu' : 'Reset password'}
                </button>
                <button onClick={handleVerifyEmail} disabled={busy || user.emailVerified} className="inline-flex items-center justify-center gap-2 rounded-lg border border-emerald-400/20 bg-emerald-400/10 px-4 py-3 text-xs font-black uppercase tracking-widest text-emerald-200 hover:bg-emerald-400/15 disabled:opacity-40">
                  <MailCheck size={14} /> {isVi ? 'Gửi xác minh' : 'Verify email'}
                </button>
                <button onClick={handleRefreshVerification} disabled={busy} className="inline-flex items-center justify-center gap-2 rounded-lg border border-white/10 bg-white/[0.04] px-4 py-3 text-xs font-black uppercase tracking-widest text-gray-300 hover:bg-white/[0.08] disabled:opacity-60">
                  <RefreshCw size={14} /> {isVi ? 'Kiểm tra lại' : 'Refresh'}
                </button>
                <button onClick={handleSignOut} className="inline-flex items-center justify-center gap-2 rounded-lg border border-red-400/20 bg-red-500/10 px-4 py-3 text-xs font-black uppercase tracking-widest text-red-100 hover:bg-red-500/15 md:col-span-2">
                  <LogOut size={14} /> {isVi ? 'Đăng xuất' : 'Sign out'}
                </button>
              </div>

              {message && (
                <div className="mt-5 flex gap-3 rounded-xl border border-white/10 bg-white/[0.04] p-4 text-xs leading-relaxed text-gray-200">
                  {message.toLowerCase().includes('không') || message.toLowerCase().includes('unable')
                    ? <AlertTriangle size={16} className="mt-0.5 shrink-0 text-amber-300" />
                    : <BadgeCheck size={16} className="mt-0.5 shrink-0 text-emerald-300" />}
                  <span>{message}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Profile;
