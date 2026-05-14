
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

// Lazy loading các trang để giảm tải ban đầu
const Home = lazy(() => import('@/pages/Home'));
const Academy = lazy(() => import('@/pages/Academy'));
const AcademyBasics = lazy(() => import('@/pages/AcademyBasics'));
const CertificateVerify = lazy(() => import('@/pages/CertificateVerify'));
const Login = lazy(() => import('@/pages/Login'));
const Profile = lazy(() => import('@/pages/Profile'));
const Challenge = lazy(() => import('@/pages/Challenge'));
const Tools = lazy(() => import('@/pages/Tools'));
const AboutContact = lazy(() => import('@/pages/AboutContact'));
const AiComingSoon = lazy(() => import('@/pages/AiComingSoon'));
const Admin = lazy(() => import('@/pages/Admin'));
const Policy = lazy(() => import('@/pages/Policy'));

// Component tự động cuộn lên đầu trang khi chuyển Route
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
      ? (lang === 'vi' ? `Lỗi (${code}): ${fallbackVi}` : `Error (${code}): ${fallbackEn}`)
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
          setAuthError(lang === 'vi' ? 'Tài khoản này chưa được cấp quyền.' : 'This account is not allowed.');
          return;
        }

        await registerAcademyLearner(result.user);
      } catch (error) {
        console.error('Google redirect auth error:', error);
        setAuthError(getAuthErrorMessage(error, 'Không thể hoàn tất đăng nhập Google.', 'Unable to finish Google sign-in.'));
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
  // Khi giáo viên mở Console (F12), họ sẽ thấy thông tin bản quyền này.
  useEffect(() => {
    const styleTitle = "color: #00F0FF; font-size: 20px; font-weight: bold; background: #000; padding: 10px; border: 2px solid #00F0FF; border-radius: 5px;";
    const styleText = "color: #E0E0E0; font-size: 12px; background: #111; padding: 4px;";
    
    // --- ANTI SELF-XSS WARNING ---
    console.log("%cDỪNG LẠI! / STOP!", "color: red; font-size: 45px; font-weight: 900; text-shadow: 2px 2px 0 #000, -2px -2px 0 #000, 2px -2px 0 #000, -2px 2px 0 #000; font-family: sans-serif;");
    console.log("%cĐây là tính năng dành cho nhà phát triển. Nếu ai đó bảo bạn sao chép-dán mã (code) vào đây để mở khóa tính năng ẩn, đó 100% là LỪA ĐẢO (Self-XSS) nhằm chiếm đoạt tài khoản và dữ liệu của bạn.", "color: white; font-size: 16px; background: red; padding: 12px; border-radius: 6px; font-weight: bold;");
    console.log("%cThis is a browser feature intended for developers. If someone told you to copy-paste something here to enable a feature, it is a scam and will give them access to your account.", "color: white; font-size: 14px; background: #333; padding: 10px; border-radius: 6px; margin-top: 5px;");
    console.log("--------------------------------------------------");

    console.log(`%c🛡️ DEEPFENSE.AI - SYSTEM INITIALIZED`, styleTitle);
    console.log(`%cBuild Version: ${PROJECT_METADATA.version}`, styleText);
    console.log(`%cBuild Date: ${PROJECT_METADATA.build_date}`, styleText);
    console.log(`%cOrganization: ${PROJECT_METADATA.university}`, styleText);
    console.log(`%cAuthor:`, styleText);
    PROJECT_METADATA.authors.forEach(author => {
        console.log(`%c - ${author.name} (${author.id}) - ${author.role}`, "color: #FF2A6D; font-style: italic; font-weight: bold;");
    });
    console.log(`%cWARNING: This project is the intellectual property of Ho Xuan Nguyen (25NS039).`, "color: red; font-weight: bold;");
  }, []);

  // Tiêu đề động tùy theo trang đang mở
  const getPageTitle = () => {
    switch (location.pathname) {
      case '/': return lang === 'vi' ? 'Trang chủ' : 'Home';
      case '/login': return lang === 'vi' ? 'Đăng nhập' : 'Sign In';
      case '/tools': return lang === 'vi' ? 'Hệ thống Quét Rủi Ro' : 'Risk Scanner';
      case '/profile': return lang === 'vi' ? 'Hồ sơ người học' : 'Profile';
      case '/academy': return lang === 'vi' ? 'DEEPFENSE Academy' : 'DEEPFENSE Academy';
      case '/academy/basics': return lang === 'vi' ? 'DEEPFENSE Basics' : 'DEEPFENSE Basics';
      case '/academy/verify': return lang === 'vi' ? 'Xac minh chung chi' : 'Verify Certificate';
      case '/challenge': return lang === 'vi' ? 'Thử thách Thám tử' : 'Detective Challenge';
      case '/ai-project': return lang === 'vi' ? 'Dự án AI Deepfense' : 'AI Project';
      case '/contact': return lang === 'vi' ? 'Liên hệ & Báo cáo' : 'Contact & Report';
      case '/privacy':
      case '/terms':
      case '/policy': return lang === 'vi' ? 'Chính sách Deepfense' : 'Deepfense Policies';
      default: 
        if (location.pathname.startsWith('/tools')) {
          if (location.pathname.includes('crisis')) return lang === 'vi' ? 'Trung tâm Ứng cứu' : 'Crisis Hub';
          if (location.pathname.includes('protect')) return lang === 'vi' ? 'Khiên bảo vệ' : 'AI Shield';
          if (location.pathname.includes('knowledge')) return lang === 'vi' ? 'Kiến thức & Pháp luật' : 'Law & Knowledge';
          return lang === 'vi' ? 'Hệ thống Quét Rủi ro' : 'Risk Scanner';
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
      <div className="min-h-screen flex flex-col font-sans selection:bg-primary/30 selection:text-white relative bg-[#03080F]">
        <SEO title={getPageTitle()} lang={lang} />

        <ScrollToTop />
        <Suspense fallback={null}><CyberField /></Suspense>
        {/* Chỉ hiện hiệu ứng Hè khi là mùa Hè và ở trang chủ */}
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
        
        <main className="flex-grow container mx-auto px-4 py-8 md:py-12 max-w-7xl z-10">
          <ErrorBoundary>
            <Suspense fallback={<LoadingFallback />}>
                <Routes>
                  <Route path="/" element={<Home lang={lang} season={season} />} />
                  <Route path="/login" element={<Login lang={lang} user={user} />} />
                  <Route path="/profile" element={<Profile lang={lang} user={user} authBusy={authBusy || roleBusy} />} />
                  <Route path="/academy/verify" element={<CertificateVerify lang={lang} />} />
                  <Route path="/academy" element={<Academy lang={lang} />} />
                  <Route path="/academy/basics" element={<AcademyBasics lang={lang} user={user} authBusy={authBusy} onGoogleAuth={handleGoogleAuth} />} />
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
