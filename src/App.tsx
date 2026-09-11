import React, { Suspense, lazy, useEffect, useState } from 'react';
import { BrowserRouter as Router, Navigate, Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';
import type { User } from 'firebase/auth';
import { collection, doc, getDoc, getDocs, limit, query, serverTimestamp, setDoc, where } from 'firebase/firestore';

import '@/styles/design-tokens.css';

import ErrorBoundary from '@/components/common/ErrorBoundary';
import SEO from '@/components/common/SEO';
import Footer from '@/components/layout/Footer';
import LoadingFallback from '@/components/layout/LoadingFallback';
import Navbar from '@/components/layout/Navbar';
import SmoothScroll, { getLenis } from '@/lib/smooth-scroll';
import WinterEffects from '@/components/effects/WinterEffects';
import AiChat from '@/features/chat/AiChat';
import { auth, db } from '@/config/firebase';
import { PROJECT_METADATA } from '@/data';
import { logger, initSecurityConsole } from '@/lib/logger';
import { Language, Season } from '@/types';
import { usePerfMode } from '@/hooks/usePerfMode';
import { useSiteConfig } from '@/hooks/useSiteConfig';
import { useTheme } from '@/hooks/useTheme';
import {
  getFamilyAudienceFromPath,
  getFamilyAudienceFromSearch,
  resolveDeepfenseExperience,
  type FamilyAudience,
} from '@/config/domainRouting';

const CyberField = lazy(() => import('@/components/effects/CyberField'));
const CookieConsent = lazy(() => import('@/components/common/CookieConsent'));
const Home = lazy(() => import('@/pages/Home'));
const DomainPortal = lazy(() => import('@/pages/DomainPortal'));
const FamilyLanding = lazy(() => import('@/pages/FamilyLanding'));
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

type AppRole = 'owner' | 'admin' | 'editor' | 'support' | 'user';

const ADMIN_CONSOLE_ROLES = new Set<AppRole>(['owner', 'admin', 'editor', 'support']);

const resolveAppRole = (email: string, storedRole: string): AppRole => {
  if (email === 'deepfense@gmail.com') return 'owner';
  if (storedRole === 'owner' || storedRole === 'admin' || storedRole === 'editor' || storedRole === 'support') {
    return storedRole;
  }
  return 'user';
};

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    const lenis = getLenis();
    if (lenis) {
      lenis.scrollTo(0, { immediate: true });
    } else {
      window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
    }
  }, [pathname]);
  return null;
};

const AppContent: React.FC = () => {
  const [lang, setLang] = useState<Language>('vi');
  const { mode: perfMode, toggle: togglePerfMode, isLite } = usePerfMode();
  const { theme, toggleTheme } = useTheme();
  const siteConfig = useSiteConfig();
  const [season, setSeason] = useState<Season>('WINTER');
  const [user, setUser] = useState<User | null>(null);
  const [authBusy, setAuthBusy] = useState(true);
  const [authError, setAuthError] = useState('');
  const [userRole, setUserRole] = useState<AppRole | null>(null);
  const [roleBusy, setRoleBusy] = useState(false);
  const [storedFamilyAudience, setStoredFamilyAudience] = useState<FamilyAudience | null>(() => {
    if (typeof window === 'undefined') return null;
    const saved = window.localStorage.getItem('df_family_audience');
    return saved === 'young' || saved === 'old' ? saved : null;
  });
  const location = useLocation();
  const navigate = useNavigate();
  const domainExperience = resolveDeepfenseExperience();
  const familyAudienceFromPath = getFamilyAudienceFromPath(location.pathname);
  const familyAudienceFromSearch = getFamilyAudienceFromSearch(location.search);
  const isLocalFamilyRoute = location.pathname === '/family' || location.pathname.startsWith('/family/');
  const hasFamilyAudienceQuery = Boolean(familyAudienceFromSearch) && location.pathname !== '/' && location.pathname !== '/portal';
  const isFamilyShell = domainExperience === 'family' || isLocalFamilyRoute || hasFamilyAudienceQuery;
  const familyAudience = isFamilyShell ? (familyAudienceFromPath ?? familyAudienceFromSearch ?? storedFamilyAudience) : null;
  const isPortalRoute = (domainExperience === 'portal' && location.pathname === '/') || location.pathname === '/portal';
  const isFamilyLandingRoute = (
    (domainExperience === 'family' && ['/', '/young', '/old'].includes(location.pathname))
    || ['/family', '/family/young', '/family/old'].includes(location.pathname)
  );
  const isFamilyPortalRoute = (
    (domainExperience === 'family' && location.pathname === '/')
    || location.pathname === '/family'
  );
  const isStandalonePortal = isPortalRoute || isFamilyPortalRoute;
  const familyAudienceForShell = isFamilyLandingRoute ? familyAudienceFromPath : (isFamilyShell ? (familyAudience ?? 'young') : null);
  const usesLiteShell = isLite || isStandalonePortal || isFamilyShell;
  const isFullWidthRoute = location.pathname === '/' || location.pathname === '/portal' || isFamilyLandingRoute;

  useEffect(() => {
    const nextAudience = familyAudienceFromPath ?? familyAudienceFromSearch;
    if (!nextAudience) return;
    setStoredFamilyAudience(nextAudience);
    try { window.localStorage.setItem('df_family_audience', nextAudience); } catch { /* ignore */ }
  }, [familyAudienceFromPath, familyAudienceFromSearch]);

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

      try {
        const userRef = doc(db, 'users', user.uid);
        const userSnap = await getDoc(userRef);
        let storedRole = userSnap.exists() ? String(userSnap.data().role || '') : '';
        if (!storedRole && email) {
          const emailSnap = await getDocs(query(collection(db, 'users'), where('email', '==', email), limit(1)));
          storedRole = emailSnap.empty ? '' : String(emailSnap.docs[0].data().role || '');
        }
        const nextRole = resolveAppRole(email, storedRole);

        await setDoc(userRef, {
          uid: user.uid,
          email: user.email || '',
          displayName: user.displayName || '',
          photoURL: user.photoURL || '',
          role: nextRole,
          canAccessAdmin: ADMIN_CONSOLE_ROLES.has(nextRole),
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
          role: nextRole,
          isAdmin: nextRole === 'owner' || nextRole === 'admin',
          canAccessAdmin: ADMIN_CONSOLE_ROLES.has(nextRole),
        }));

        if (!ignore) setUserRole(nextRole);
      } catch (error) {
        logger.error('Unable to load user role:', error);
        if (!ignore) setUserRole(resolveAppRole(email, ''));
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
    initSecurityConsole(PROJECT_METADATA);
  }, []);

  const getPageTitle = () => {
    if (isPortalRoute) return lang === 'vi' ? 'Cổng Deepfense' : 'Deepfense Portal';
    if (isFamilyLandingRoute) {
      if (familyAudienceFromPath === 'young') return lang === 'vi' ? 'DEEPFENSE Family - Thiếu niên' : 'DEEPFENSE Family - Teens';
      if (familyAudienceFromPath === 'old') return lang === 'vi' ? 'DEEPFENSE Family - Người lớn 40+' : 'DEEPFENSE Family - Adults 40+';
      return 'DEEPFENSE Family';
    }

    switch (location.pathname) {
      case '/': return lang === 'vi' ? 'Trang chủ' : 'Home';
      case '/login': return lang === 'vi' ? 'Đăng nhập' : 'Sign In';
      case '/profile': return lang === 'vi' ? 'Hồ sơ người học' : 'Profile';
      case '/academy': return 'DEEPFENSE Academy';
      case '/academy/basics': return 'DEEPFENSE Academy';
      case '/academy/verify': return lang === 'vi' ? 'Xác minh chứng chỉ' : 'Verify Certificate';
      case '/challenge': return lang === 'vi' ? 'Thử thách thám tử' : 'Detective Challenge';
      case '/tools': return lang === 'vi' ? 'Công cụ an toàn' : 'Safety Tools';
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
          return lang === 'vi' ? 'Công cụ an toàn' : 'Safety Tools';
        }
        return lang === 'vi' ? 'Trang không tồn tại' : 'Page Not Found';
    }
  };

  const renderAdminRoute = () => {
    if (authBusy || roleBusy) return <LoadingFallback />;
    if (!user) return <Navigate to="/login" replace />;
    if (!userRole || !ADMIN_CONSOLE_ROLES.has(userRole)) return <Navigate to="/profile" replace />;
    return <Admin />;
  };

  const appContent = (
    <div className="relative flex min-h-screen flex-col font-sans selection:bg-primary/30 text-slate-900 dark:text-white">
        <SEO title={getPageTitle()} lang={lang} />
        <ScrollToTop />
        {usesLiteShell ? (
          // Fallback gradient tĩnh — cực nhẹ cho mobile / máy yếu
          <div className="fixed inset-0 z-0 pointer-events-none">
            <div className="absolute inset-0 bg-gradient-to-br from-[#1D6FE8]/5 via-transparent to-[#A855F7]/5" />
          </div>
        ) : (
          <Suspense fallback={null}><CyberField /></Suspense>
        )}
        {siteConfig.seasonalEnabled && season === 'WINTER' && domainExperience === 'main' && location.pathname === '/' && <WinterEffects isLite={isLite} />}

        {!isStandalonePortal && (
          <Navbar
            lang={lang}
            setLang={setLang}
            siteConfig={siteConfig}
            theme={theme}
            toggleTheme={toggleTheme}
            perfMode={perfMode}
            togglePerfMode={togglePerfMode}
            user={user}
            authBusy={authBusy}
            authError={authError}
            onGoogleAuth={handleGoogleAuth}
            season={season}
            setSeason={setSeason}
            showTicker={!usesLiteShell}
            isFamilyShell={isFamilyShell}
            familyAudience={familyAudienceForShell}
          />
        )}

        <main className={`z-10 flex-grow ${isFullWidthRoute ? 'w-full' : 'container mx-auto max-w-7xl px-4 py-8 md:py-12'}`}>
          <ErrorBoundary>
            <Suspense fallback={<LoadingFallback />}>
              <Routes>
                <Route
                  path="/"
                  element={
                    isPortalRoute
                      ? <DomainPortal lang={lang} setLang={setLang} theme={theme} toggleTheme={toggleTheme} />
                      : isFamilyLandingRoute
                        ? <FamilyLanding lang={lang} setLang={setLang} theme={theme} toggleTheme={toggleTheme} mode={familyAudienceFromPath} />
                        : <Home lang={lang} siteConfig={siteConfig} />
                  }
                />
                <Route path="/portal" element={<DomainPortal lang={lang} setLang={setLang} theme={theme} toggleTheme={toggleTheme} />} />
                <Route path="/young" element={domainExperience === 'family' ? <FamilyLanding lang={lang} setLang={setLang} theme={theme} toggleTheme={toggleTheme} mode="young" /> : <Navigate to="/family/young" replace />} />
                <Route path="/old" element={domainExperience === 'family' ? <FamilyLanding lang={lang} setLang={setLang} theme={theme} toggleTheme={toggleTheme} mode="old" /> : <Navigate to="/family/old" replace />} />
                <Route path="/family" element={<FamilyLanding lang={lang} setLang={setLang} theme={theme} toggleTheme={toggleTheme} mode={null} />} />
                <Route path="/family/young" element={<FamilyLanding lang={lang} setLang={setLang} theme={theme} toggleTheme={toggleTheme} mode="young" />} />
                <Route path="/family/old" element={<FamilyLanding lang={lang} setLang={setLang} theme={theme} toggleTheme={toggleTheme} mode="old" />} />
                <Route path="/login" element={<Login lang={lang} user={user} />} />
                <Route path="/profile" element={<Profile lang={lang} user={user} authBusy={authBusy || roleBusy} />} />
                <Route path="/academy" element={<Academy lang={lang} user={user} authBusy={authBusy} onGoogleAuth={handleGoogleAuth} />} />
                <Route path="/academy/verify" element={<CertificateVerify lang={lang} />} />
                <Route path="/tools/:tab?" element={<Tools lang={lang} familyAudience={familyAudienceForShell} />} />
                <Route path="/challenge" element={<Challenge lang={lang} familyAudience={familyAudienceForShell} />} />
                <Route path="/ai-project" element={<AiComingSoon lang={lang} />} />
                <Route path="/contact" element={<AboutContact lang={lang} />} />
                <Route path="/about" element={<AboutContact lang={lang} />} />
                <Route path="/privacy" element={<Policy lang={lang} />} />
                <Route path="/terms" element={<Policy lang={lang} />} />
                <Route path="/terms-of-service" element={<Policy lang={lang} />} />
                <Route path="/policy" element={<Policy lang={lang} />} />
                <Route path="/cookies" element={<Policy lang={lang} />} />
                <Route path="/cookie-policy" element={<Policy lang={lang} />} />
                <Route path="/refund" element={<Policy lang={lang} />} />
                <Route path="/refund-policy" element={<Policy lang={lang} />} />
                <Route path="/admin" element={renderAdminRoute()} />
                <Route path="*" element={<NotFound lang={lang} />} />
              </Routes>
            </Suspense>
          </ErrorBoundary>
        </main>

        {!isStandalonePortal && siteConfig.aiAgentEnabled && <AiChat lang={lang} />}
        {!isStandalonePortal && <CookieConsent lang={lang} />}
        {!isStandalonePortal && <Footer lang={lang} siteConfig={siteConfig} isFamilyShell={isFamilyShell} familyAudience={familyAudienceForShell} />}
      </div>
  );

  return usesLiteShell ? appContent : <SmoothScroll>{appContent}</SmoothScroll>;
};
const App: React.FC = () => (
  <Router>
    <AppContent />
  </Router>
);

export default App;
