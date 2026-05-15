
import React, { useState, Suspense, lazy, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation, useNavigate } from 'react-router-dom';
import { GoogleAuthProvider, getRedirectResult, onAuthStateChanged, signOut } from 'firebase/auth';
import type { User } from 'firebase/auth';
import { doc, getDoc, serverTimestamp, setDoc } from 'firebase/firestore';

// Design System
import '@/styles/design-tokens.css';

// Layout & Common Components
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import LoadingFallback from '@/components/layout/LoadingFallback';
import ErrorBoundary from '@/components/common/ErrorBoundary';
import SEO from '@/components/common/SEO';
import SmoothScroll from '@/lib/smooth-scroll';

// Effects
const CyberField = lazy(() => import('@/components/effects/CyberField'));
import SummerEffects from '@/components/effects/SummerEffects';

// Features
import AiChat from '@/features/chat/AiChat';

// Data & Types
import { Language, Season } from '@/types';
import { TRANSLATIONS, PROJECT_METADATA } from '@/data';
import { auth, db, isFirebaseConfigured, missingFirebaseEnvKeys } from '@/config/firebase';
import { ensureDpfWallet } from '@/features/dpf/dpf';

// Lazy loading cÃ¡c trang Ä‘á»ƒ giáº£m táº£i ban Ä‘áº§u
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
const CookieConsent = lazy(() => import('@/components/common/CookieConsent'));

// Component tá»± Ä‘á»™ng cuá»™n lÃªn Ä‘áº§u trang khi chuyá»ƒn Route
const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [pathname]);
  return null;
};

const AppContent: React.FC = () => {
  const [lang, setLang] = useState<Language>('vi');
  const [season, setSeason] = useState<Season>('SUMMER');
  const [user, setUser] = useState<User | null>(null);
  const [authBusy, setAuthBusy] = useState(true);
  const [authError, setAuthError] = useState('');
  const [userRole, setUserRole] = useState<'admin' | 'editor' | 'user' | null>(null);
  const [roleBusy, setRoleBusy] = useState(false);
  const t = TRANSLATIONS[lang];
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

        if (emailRole === 'admin') {
          await setDoc(userRef, {
            uid: user.uid,
            email: user.email || '',
            displayName: user.displayName || '',
            photoURL: user.photoURL || '',
            role: 'admin',
            status: 'active',
            updatedAt: serverTimestamp(),
          }, { merge: true });
        }

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
    if (!user) {
      window.localStorage.removeItem('deepfenseAcademyAuth');
      return;
    }

    const email = (user.email || '').toLowerCase();
    window.localStorage.setItem('deepfenseAcademyAuth', JSON.stringify({
      uid: user.uid,
      email,
      displayName: user.displayName || '',
      photoURL: user.photoURL || '',
      signedInAt: Date.now(),
      isAdmin: email === 'deepfense@gmail.com',
    }));

    if (email === 'deepfense@gmail.com' && !window.localStorage.getItem('deepfense-basics-admin-reset-v3')) {
      [
        'deepfense-basics-progress',
        'deepfense-basics-last-location',
        'deepfense-basics-course-evaluation',
        'deepfense-basics-final-exam',
        'deepfense-basics-certificate-name',
      ].forEach((key) => window.localStorage.removeItem(key));
      window.localStorage.setItem('deepfense-basics-admin-reset-v3', 'true');
    }
  }, [user]);

  useEffect(() => {
    if (!authError) return;
    const timer = window.setTimeout(() => setAuthError(''), 3600);
    return () => window.clearTimeout(timer);
  }, [authError]);

  const allowedAuthEmails = (import.meta.env.VITE_ALLOWED_AUTH_EMAILS || '')
    .split(',')
    .map((email: string) => email.trim().toLowerCase())
    .filter(Boolean);

  const isAllowedUser = (email?: string | null) => {
    if (!allowedAuthEmails.length) return true;
    return !!email && allowedAuthEmails.includes(email.toLowerCase());
  };

  const createGoogleProvider = () => {
    const provider = new GoogleAuthProvider();
    provider.setCustomParameters({ prompt: 'select_account' });
    return provider;
  };

  const registerAcademyLearner = async (currentUser: User) => {
    try {
      await ensureDpfWallet(currentUser);
      const learnerRef = doc(db, 'academy_learners', currentUser.uid);
      const learnerSnap = await getDoc(learnerRef);
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

      await setDoc(learnerRef, {
        uid: currentUser.uid,
        email: currentUser.email || '',
        displayName: currentUser.displayName || '',
        photoURL: currentUser.photoURL || '',
        provider: 'google',
        course: 'DEEPFENSE BASICS',
        credentialTarget: 'DEEPFENSE AWARE',
        rewardTarget: { amount: 500, symbol: 'DPF' },
        ...initialLearningState,
        updatedAt: serverTimestamp(),
      }, { merge: true });
    } catch (error) {
      console.error('Academy learner registration error:', error);
    }
  };

  const getAuthErrorMessage = (error: unknown, fallbackVi: string, fallbackEn: string) => {
    const code = typeof error === 'object' && error && 'code' in error ? String((error as { code?: unknown }).code) : '';
    return code
      ? (lang === 'vi' ? `Lá»—i (${code}): ${fallbackVi}` : `Error (${code}): ${fallbackEn}`)
      : (lang === 'vi' ? fallbackVi : fallbackEn);
  };

  useEffect(() => {
    if (!isFirebaseConfigured) return;

    let ignore = false;
    (async () => {
      try {
        // Remove the 7s timeout as it can cause race conditions or silent failures
        const result = await getRedirectResult(auth);
        if (ignore || !result?.user) return;

        if (!isAllowedUser(result.user.email)) {
          await signOut(auth);
          setAuthError(lang === 'vi' ? 'TÃ i khoáº£n nÃ y chÆ°a Ä‘Æ°á»£c cáº¥p quyá»n.' : 'This account is not allowed.');
          return;
        }

        await registerAcademyLearner(result.user);
      } catch (error) {
        console.error('Google redirect auth error:', error);
        setAuthError(getAuthErrorMessage(error, 'KhÃ´ng thá»ƒ hoÃ n táº¥t Ä‘Äƒng nháº­p Google.', 'Unable to finish Google sign-in.'));
      } finally {
        if (!ignore) setAuthBusy(false);
      }
    })();

    return () => { ignore = true; };
  }, []);

  const handleGoogleAuth = async () => {
    if (authBusy) return;
    
    if (user) {
      navigate('/profile');
      return;
    }

    navigate('/login');
  };

  // --- DIGITAL SIGNATURE (CONSOLE WATERMARK) ---
  // Khi giÃ¡o viÃªn má»Ÿ Console (F12), há» sáº½ tháº¥y thÃ´ng tin báº£n quyá»n nÃ y.
  useEffect(() => {
    const styleTitle = "color: #00F0FF; font-size: 20px; font-weight: bold; background: #000; padding: 10px; border: 2px solid #00F0FF; border-radius: 5px;";
    const styleText = "color: #E0E0E0; font-size: 12px; background: #111; padding: 4px;";
    
    // --- ANTI SELF-XSS WARNING ---
    console.log("%cDá»ªNG Láº I! / STOP!", "color: red; font-size: 45px; font-weight: 900; text-shadow: 2px 2px 0 #000, -2px -2px 0 #000, 2px -2px 0 #000, -2px 2px 0 #000; font-family: sans-serif;");
    console.log("%cÄÃ¢y lÃ  tÃ­nh nÄƒng dÃ nh cho nhÃ  phÃ¡t triá»ƒn. Náº¿u ai Ä‘Ã³ báº£o báº¡n sao chÃ©p-dÃ¡n mÃ£ (code) vÃ o Ä‘Ã¢y Ä‘á»ƒ má»Ÿ khÃ³a tÃ­nh nÄƒng áº©n, Ä‘Ã³ 100% lÃ  Lá»ªA Äáº¢O (Self-XSS) nháº±m chiáº¿m Ä‘oáº¡t tÃ i khoáº£n vÃ  dá»¯ liá»‡u cá»§a báº¡n.", "color: white; font-size: 16px; background: red; padding: 12px; border-radius: 6px; font-weight: bold;");
    console.log("%cThis is a browser feature intended for developers. If someone told you to copy-paste something here to enable a feature, it is a scam and will give them access to your account.", "color: white; font-size: 14px; background: #333; padding: 10px; border-radius: 6px; margin-top: 5px;");
    console.log("--------------------------------------------------");

    console.log(`%cðŸ›¡ï¸ DEEPFENSE.AI - SYSTEM INITIALIZED`, styleTitle);
    console.log(`%cBuild Version: ${PROJECT_METADATA.version}`, styleText);
    console.log(`%cBuild Date: ${PROJECT_METADATA.build_date}`, styleText);
    console.log(`%cOrganization: ${PROJECT_METADATA.university}`, styleText);
    console.log(`%cAuthor:`, styleText);
    PROJECT_METADATA.authors.forEach(author => {
        console.log(`%c - ${author.name} (${author.id}) - ${author.role}`, "color: #FF2A6D; font-style: italic; font-weight: bold;");
    });
    console.log(`%cWARNING: This project is the intellectual property of Há»“ XuÃ¢n Nguyá»…n & VKU Project Team.`, "color: red; font-weight: bold;");
  }, []);

  // TiÃªu Ä‘á» Ä‘á»™ng tÃ¹y theo trang Ä‘ang má»Ÿ
  const getPageTitle = () => {
    switch (location.pathname) {
      case '/': return lang === 'vi' ? 'Trang chá»§' : 'Home';
      case '/login': return lang === 'vi' ? 'ÄÄƒng nháº­p' : 'Sign In';
      case '/tools': return lang === 'vi' ? 'Há»‡ thá»‘ng QuÃ©t Rá»§i Ro' : 'Risk Scanner';
      case '/profile': return lang === 'vi' ? 'Há»“ sÆ¡ ngÆ°á»i há»c' : 'Profile';
      case '/academy': return lang === 'vi' ? 'DEEPFENSE Academy' : 'DEEPFENSE Academy';
      case '/academy/verify': return lang === 'vi' ? 'XÃ¡c minh chá»©ng chá»‰' : 'Verify Certificate';
      case '/challenge': return lang === 'vi' ? 'Thá»­ thÃ¡ch ThÃ¡m tá»­' : 'Detective Challenge';
      case '/ai-project': return lang === 'vi' ? 'Dá»± Ã¡n AI Deepfense' : 'AI Project';
      case '/contact': return lang === 'vi' ? 'LiÃªn há»‡ & BÃ¡o cÃ¡o' : 'Contact & Report';
      case '/privacy':
      case '/terms':
      case '/policy': return lang === 'vi' ? 'ChÃ­nh sÃ¡ch Deepfense' : 'Deepfense Policies';
      default: 
        if (location.pathname.startsWith('/tools')) {
          if (location.pathname.includes('crisis')) return lang === 'vi' ? 'Trung tÃ¢m á»¨ng cá»©u' : 'Crisis Hub';
          if (location.pathname.includes('protect')) return lang === 'vi' ? 'KhiÃªn báº£o vá»‡' : 'AI Shield';
          if (location.pathname.includes('knowledge')) return lang === 'vi' ? 'Kiáº¿n thá»©c & PhÃ¡p luáº­t' : 'Law & Knowledge';
          return lang === 'vi' ? 'Há»‡ thá»‘ng QuÃ©t Rá»§i ro' : 'Risk Scanner';
        }
        return '';
    }
  };

  const renderAdminRoute = () => {
    if (authBusy || roleBusy) return <LoadingFallback />;
    if (!user) return <Navigate to="/login" replace />;
    if (userRole !== 'admin') return <Navigate to="/profile" replace />;
    return <Admin />;
  };

  return (
    <SmoothScroll>
      <div className="min-h-screen flex flex-col font-sans selection:bg-primary/30 selection:text-white relative">
        <SEO title={getPageTitle()} lang={lang} />

        <ScrollToTop />
        <Suspense fallback={null}><CyberField /></Suspense>
        {/* Chá»‰ hiá»‡n hiá»‡u á»©ng HÃ¨ khi lÃ  mÃ¹a HÃ¨ vÃ  á»Ÿ trang chá»§ */}
        {location.pathname === '/' && season === 'SUMMER' && <SummerEffects />}
        
        <Navbar 
          lang={lang} 
          setLang={setLang} 
          season={season}
          setSeason={setSeason}
          user={user}
          authBusy={authBusy}
          authError={authError}
          onGoogleAuth={handleGoogleAuth}
        />
        
        <main className={`flex-grow z-10 ${location.pathname === '/' ? 'w-full' : 'container mx-auto px-4 py-8 md:py-12 max-w-7xl'}`}>
          <ErrorBoundary>
            <Suspense fallback={<LoadingFallback />}>
                <Routes>
                  <Route path="/" element={<Home lang={lang} season={season} />} />
                  <Route path="/login" element={<Login lang={lang} user={user} />} />
                  <Route path="/profile" element={<Profile lang={lang} user={user} authBusy={authBusy || roleBusy} />} />
                  <Route path="/academy/verify" element={<CertificateVerify lang={lang} />} />
                  <Route path="/academy" element={<Academy lang={lang} user={user} authBusy={authBusy} onGoogleAuth={handleGoogleAuth} />} />
                  <Route path="/tools/:tab?" element={<Tools lang={lang} />} />
                  <Route path="/challenge" element={<Challenge lang={lang} />} />
                  <Route path="/ai-project" element={<AiComingSoon lang={lang} />} />
                  <Route path="/contact" element={<AboutContact lang={lang} />} />
                  <Route path="/privacy" element={<Policy lang={lang} />} />
                  <Route path="/terms" element={<Policy lang={lang} />} />
                  <Route path="/policy" element={<Policy lang={lang} />} />
                  <Route path="/admin" element={renderAdminRoute()} />
                  <Route path="*" element={<Home lang={lang} season={season} />} />
                </Routes>
            </Suspense>
          </ErrorBoundary>
        </main>
        
        <AiChat lang={lang} />
        <CookieConsent lang={lang} />
        
        <Footer lang={lang} />
      </div>
    </SmoothScroll>
  );
};

const App: React.FC = () => (
  <Router>
    <AppContent />
  </Router>
);

export default App;
