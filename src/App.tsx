import React, { Suspense, lazy, useEffect, useState } from 'react';
import { BrowserRouter as Router, Navigate, Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';
import type { User } from 'firebase/auth';
import { doc, getDoc, serverTimestamp, setDoc } from 'firebase/firestore';

import '@/styles/design-tokens.css';

import ErrorBoundary from '@/components/common/ErrorBoundary';
import SEO from '@/components/common/SEO';
import Footer from '@/components/layout/Footer';
import LoadingFallback from '@/components/layout/LoadingFallback';
import Navbar from '@/components/layout/Navbar';
import SmoothScroll from '@/lib/smooth-scroll';
import SummerEffects from '@/components/effects/SummerEffects';
import AiChat from '@/features/chat/AiChat';
import { auth, db } from '@/config/firebase';
import { PROJECT_METADATA } from '@/data';
import { Language } from '@/types';
import { usePerfMode } from '@/hooks/usePerfMode';

const CyberField = lazy(() => import('@/components/effects/CyberField'));
const CookieConsent = lazy(() => import('@/components/common/CookieConsent'));
const Home = lazy(() => import('@/pages/Home'));
const Academy = lazy(() => import('@/pages/Academy'));
const CertificateVerify = lazy(() => import('@/pages/CertificateVerify'));
const Login = lazy(() => import('@/pages/Login'));
const Profile = lazy(() => import('@/pages/Profile'));
const Challenge = lazy(() => import('@/pages/Challenge'));
const Tools = lazy(() => import('@/pages/Tools'));
const AboutContact = lazy(() => import('@/pages/AboutContact'));
const AiComingSoon = lazy(() => import('@/pages/AiComingSoon'));
const Admin = lazy(() => import('@/pages/Admin'));
const Policy = lazy(() => import('@/pages/Policy'));
const NotFound = lazy(() => import('@/pages/NotFound'));

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [pathname]);
  return null;
};

const AppContent: React.FC = () => {
  const [lang, setLang] = useState<Language>('vi');
  const { mode: perfMode, toggle: togglePerfMode, isLite } = usePerfMode();
  const [user, setUser] = useState<User | null>(null);
  const [authBusy, setAuthBusy] = useState(true);
  const [authError, setAuthError] = useState('');
  const [userRole, setUserRole] = useState<'admin' | 'editor' | 'user' | null>(null);
  const [roleBusy, setRoleBusy] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => onAuthStateChanged(auth, (nextUser) => {
    setUser(nextUser);
    setAuthBusy(false);
  }), []);

  useEffect(() => {
    let ignore = false;

    const loadRole = async () => {
      if (!user) {
        setUserRole(null);
        setRoleBusy(false);
        window.localStorage.removeItem('deepfenseAcademyAuth');
        return;
      }

      setRoleBusy(true);
      const email = (user.email || '').toLowerCase();
      const emailRole = email === 'deepfense@gmail.com' ? 'admin' : null;

      try {
        const userRef = doc(db, 'users', user.uid);
        const userSnap = await getDoc(userRef);
        const storedRole = userSnap.exists() ? String(userSnap.data().role || '') : '';
        const nextRole = emailRole || (storedRole === 'admin' || storedRole === 'editor' ? storedRole : 'user');

        await setDoc(userRef, {
          uid: user.uid,
          email: user.email || '',
          displayName: user.displayName || '',
          photoURL: user.photoURL || '',
          role: nextRole,
          status: 'active',
          lastActiveAt: serverTimestamp(),
          updatedAt: serverTimestamp(),
        }, { merge: true });

        window.localStorage.setItem('deepfenseAcademyAuth', JSON.stringify({
          uid: user.uid,
          email,
          displayName: user.displayName || '',
          photoURL: user.photoURL || '',
          signedInAt: Date.now(),
          isAdmin: nextRole === 'admin',
        }));

        if (!ignore) setUserRole(nextRole as 'admin' | 'editor' | 'user');
      } catch (error) {
        console.error('Unable to load user role:', error);
        if (!ignore) setUserRole(emailRole || 'user');
      } finally {
        if (!ignore) setRoleBusy(false);
      }
    };

    void loadRole();
    return () => { ignore = true; };
  }, [user]);

  useEffect(() => {
    if (!authError) return;
    const timer = window.setTimeout(() => setAuthError(''), 3600);
    return () => window.clearTimeout(timer);
  }, [authError]);

  const handleGoogleAuth = async () => {
    if (authBusy) return;
    setAuthError('');

    if (user) {
      navigate('/profile');
      return;
    }

    navigate('/login');
  };

  useEffect(() => {
    const styleTitle = 'color: #00F0FF; font-size: 20px; font-weight: bold; background: #000; padding: 10px; border: 2px solid #00F0FF; border-radius: 5px;';
    const styleText = 'color: #E0E0E0; font-size: 12px; background: #111; padding: 4px;';

    console.log('%cDỪNG LẠI! / STOP!', 'color: red; font-size: 45px; font-weight: 900; text-shadow: 2px 2px 0 #000, -2px -2px 0 #000, 2px -2px 0 #000, -2px 2px 0 #000; font-family: sans-serif;');
    console.log('%cĐây là tính năng dành cho nhà phát triển. Nếu ai đó bảo bạn sao chép-dán mã vào đây để mở khóa tính năng ẩn, đó có thể là Self-XSS nhằm chiếm đoạt tài khoản.', 'color: white; font-size: 16px; background: red; padding: 12px; border-radius: 6px; font-weight: bold;');
    console.log('%cThis is a browser feature intended for developers. If someone told you to copy-paste something here, it may give them access to your account.', 'color: white; font-size: 14px; background: #333; padding: 10px; border-radius: 6px;');
    console.log('--------------------------------------------------');
    console.log('%cDEEPFENSE.AI - SYSTEM INITIALIZED', styleTitle);
    console.log(`%cBuild Version: ${PROJECT_METADATA.version}`, styleText);
    console.log(`%cBuild Date: ${PROJECT_METADATA.build_date}`, styleText);
    console.log(`%cOrganization: ${PROJECT_METADATA.university}`, styleText);
    PROJECT_METADATA.authors.forEach((author) => {
      console.log(`%c - ${author.name} (${author.id}) - ${author.role}`, 'color: #FF2A6D; font-style: italic; font-weight: bold;');
    });
    console.log('%cWARNING: This project is the intellectual property of Team 2HAND (VKU).', 'color: red; font-weight: bold;');
  }, []);

  const getPageTitle = () => {
    switch (location.pathname) {
      case '/': return lang === 'vi' ? 'Trang chủ' : 'Home';
      case '/login': return lang === 'vi' ? 'Đăng nhập' : 'Sign In';
      case '/profile': return lang === 'vi' ? 'Hồ sơ người học' : 'Profile';
      case '/academy': return 'DEEPFENSE Academy';
      case '/academy/basics': return 'DEEPFENSE Basics';
      case '/academy/verify': return lang === 'vi' ? 'Xác minh chứng chỉ' : 'Verify Certificate';
      case '/challenge': return lang === 'vi' ? 'Thử thách thám tử' : 'Detective Challenge';
      case '/tools': return lang === 'vi' ? 'Hệ thống quét rủi ro' : 'Risk Scanner';
      case '/ai-project': return lang === 'vi' ? 'Dự án AI Deepfense' : 'AI Project';
      case '/contact':
      case '/about': return lang === 'vi' ? 'Liên hệ & báo cáo' : 'Contact & Report';
      case '/privacy':
      case '/terms':
      case '/policy': return lang === 'vi' ? 'Chính sách Deepfense' : 'Deepfense Policies';
      default:
        if (location.pathname.startsWith('/tools')) {
          if (location.pathname.includes('crisis')) return lang === 'vi' ? 'Trung tâm ứng cứu' : 'Crisis Hub';
          if (location.pathname.includes('protect')) return lang === 'vi' ? 'Khiên bảo vệ' : 'AI Shield';
          if (location.pathname.includes('knowledge')) return lang === 'vi' ? 'Kiến thức & pháp luật' : 'Law & Knowledge';
          return lang === 'vi' ? 'Hệ thống quét rủi ro' : 'Risk Scanner';
        }
        return lang === 'vi' ? 'Trang không tồn tại' : 'Page Not Found';
    }
  };

  const renderAdminRoute = () => {
    if (authBusy || roleBusy) return <LoadingFallback />;
    if (!user) return <Navigate to="/login" replace />;
    if (userRole !== 'admin') return <Navigate to="/profile" replace />;
    return <Admin />;
  };

  const appContent = (
    <div className="relative flex min-h-screen flex-col font-sans selection:bg-primary/30 selection:text-white">
        <SEO title={getPageTitle()} lang={lang} />
        <ScrollToTop />
        {isLite ? (
          // Fallback gradient tĩnh — cực nhẹ cho mobile / máy yếu
          <div className="fixed inset-0 z-0 pointer-events-none">
            <div className="absolute inset-0 bg-gradient-to-br from-[#1D6FE8]/5 via-transparent to-[#A855F7]/5" />
          </div>
        ) : (
          <Suspense fallback={null}><CyberField /></Suspense>
        )}
        {!isLite && location.pathname === '/' && <SummerEffects />}

        <Navbar
          lang={lang}
          setLang={setLang}
          perfMode={perfMode}
          togglePerfMode={togglePerfMode}
          user={user}
          authBusy={authBusy}
          authError={authError}
          onGoogleAuth={handleGoogleAuth}
        />

        <main className={`z-10 flex-grow ${location.pathname === '/' ? 'w-full' : 'container mx-auto max-w-7xl px-4 py-8 md:py-12'}`}>
          <ErrorBoundary>
            <Suspense fallback={<LoadingFallback />}>
              <Routes>
                <Route path="/" element={<Home lang={lang} season={isLite ? 'NORMAL' : 'SUMMER'} />} />
                <Route path="/login" element={<Login lang={lang} user={user} />} />
                <Route path="/profile" element={<Profile lang={lang} user={user} authBusy={authBusy || roleBusy} />} />
                <Route path="/academy" element={<Academy lang={lang} user={user} authBusy={authBusy} onGoogleAuth={handleGoogleAuth} />} />
                <Route path="/academy/verify" element={<CertificateVerify lang={lang} />} />
                <Route path="/tools/:tab?" element={<Tools lang={lang} />} />
                <Route path="/challenge" element={<Challenge lang={lang} />} />
                <Route path="/ai-project" element={<AiComingSoon lang={lang} />} />
                <Route path="/contact" element={<AboutContact lang={lang} />} />
                <Route path="/about" element={<AboutContact lang={lang} />} />
                <Route path="/privacy" element={<Policy lang={lang} />} />
                <Route path="/terms" element={<Policy lang={lang} />} />
                <Route path="/policy" element={<Policy lang={lang} />} />
                <Route path="/admin" element={renderAdminRoute()} />
                <Route path="*" element={<NotFound lang={lang} />} />
              </Routes>
            </Suspense>
          </ErrorBoundary>
        </main>

        <AiChat lang={lang} />
        <CookieConsent lang={lang} />
        <Footer lang={lang} />
      </div>
  );

  return isLite ? appContent : <SmoothScroll>{appContent}</SmoothScroll>;
};

const App: React.FC = () => (
  <Router>
    <AppContent />
  </Router>
);

export default App;
