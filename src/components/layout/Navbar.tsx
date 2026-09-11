/**
 * DEEPFENSE.ONLINE - Navbar v3.0
 */

import React, { useEffect, useRef, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Bot, Coins, Cpu, GraduationCap, HeartHandshake, Home, Info, LogIn, Menu, Moon, Power, Scale, ScanLine, Smartphone, Snowflake, Sun, Swords, Target, UserCircle, X } from 'lucide-react';
import type { User } from 'firebase/auth';
import type { SiteConfig } from '@/config/siteConfig';
import { Language, Season } from '@/types';
import type { PerfMode } from '@/hooks/usePerfMode';
import type { ThemeMode } from '@/hooks/useTheme';
import { useDpfBalance } from '@/features/dpf/useDpfWallet';
import { getFamilyPath, getFamilyRootPath, type FamilyAudience } from '@/config/domainRouting';

interface NavbarProps {
  lang: Language;
  setLang: (l: Language) => void;
  siteConfig: SiteConfig;
  theme: ThemeMode;
  toggleTheme: () => void;
  perfMode: PerfMode;
  togglePerfMode: () => void;
  user: User | null;
  authBusy: boolean;
  authError: string;
  onGoogleAuth: () => void;
  season: Season;
  setSeason: (s: Season) => void;
  showTicker?: boolean;
  isFamilyShell?: boolean;
  familyAudience?: FamilyAudience | null;
}

const Navbar: React.FC<NavbarProps> = ({
  lang,
  setLang,
  siteConfig,
  theme,
  toggleTheme,
  perfMode,
  togglePerfMode,
  user,
  authBusy,
  authError,
  onGoogleAuth,
  season,
  setSeason,
  showTicker = true,
  isFamilyShell = false,
  familyAudience = null,
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { balance: dpfBalance, loading: dpfLoading } = useDpfBalance(user);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 30);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const withAudience = (path: string) => {
    if (!familyAudience) return path;
    const separator = path.includes('?') ? '&' : '?';
    return `${path}${separator}audience=${familyAudience}`;
  };

  const navItems: { path: string; label: string; icon: React.ReactNode }[] = isFamilyShell
    ? familyAudience === 'old'
      ? [
        { path: getFamilyPath('old'), label: lang === 'vi' ? 'Người lớn 40+' : 'Adults 40+', icon: <HeartHandshake size={14} /> },
        { path: withAudience('/challenge?mode=simulator'), label: lang === 'vi' ? 'Kịch bản bẫy' : 'Scenarios', icon: <Target size={14} /> },
        { path: withAudience('/tools/scan'), label: lang === 'vi' ? 'Giám định' : 'Forensics', icon: <ScanLine size={14} /> },
        { path: withAudience('/tools/crisis'), label: lang === 'vi' ? 'Ứng cứu' : 'Crisis', icon: <Cpu size={14} /> },
        { path: withAudience('/tools/knowledge'), label: lang === 'vi' ? 'Pháp luật' : 'Law', icon: <Scale size={14} /> },
      ]
      : familyAudience === 'young'
        ? [
          { path: getFamilyPath('young'), label: lang === 'vi' ? 'Thiếu niên' : 'Teens', icon: <GraduationCap size={14} /> },
          { path: withAudience('/challenge'), label: lang === 'vi' ? 'Thám tử nhí' : 'Detective', icon: <Swords size={14} /> },
          { path: withAudience('/challenge?mode=simulator'), label: lang === 'vi' ? 'Kịch bản bẫy' : 'Scenarios', icon: <Target size={14} /> },
          { path: withAudience('/tools/scan'), label: lang === 'vi' ? 'Giám định' : 'Forensics', icon: <ScanLine size={14} /> },
          { path: withAudience('/tools/crisis'), label: lang === 'vi' ? 'Ứng cứu' : 'Crisis', icon: <Cpu size={14} /> },
        ]
        : [
          { path: getFamilyRootPath(), label: lang === 'vi' ? 'Cổng gia đình' : 'Family', icon: <Home size={14} /> },
          { path: getFamilyPath('young'), label: lang === 'vi' ? 'Thiếu niên' : 'Teens', icon: <GraduationCap size={14} /> },
          { path: getFamilyPath('old'), label: lang === 'vi' ? 'Người lớn 40+' : 'Adults 40+', icon: <HeartHandshake size={14} /> },
          { path: '/contact', label: lang === 'vi' ? 'Về chúng tôi' : 'About', icon: <Info size={14} /> },
        ]
    : [
      { path: '/', label: lang === 'vi' ? 'Trang chủ' : 'Home', icon: <Home size={14} /> },
      { path: '/academy', label: 'Academy', icon: <GraduationCap size={14} /> },
      { path: '/tools', label: lang === 'vi' ? 'Công cụ' : 'Tools', icon: <Cpu size={14} /> },
      { path: '/challenge', label: lang === 'vi' ? 'Thử thách' : 'Challenge', icon: <Swords size={14} /> },
      { path: '/ai-project', label: lang === 'vi' ? 'Dự án AI' : 'AI Project', icon: <Bot size={14} /> },
      { path: '/contact', label: lang === 'vi' ? 'Về chúng tôi' : 'About', icon: <Info size={14} /> },
    ];

  const mobileNavItems: { path: string; label: string; icon: React.ReactNode }[] = isFamilyShell
    ? familyAudience === 'young'
      ? [
        { path: getFamilyPath('young'), label: lang === 'vi' ? 'Trang chủ thiếu niên' : 'Teens Home', icon: <GraduationCap size={14} /> },
        { path: withAudience('/challenge'), label: lang === 'vi' ? 'Thử thách thám tử' : 'Detective Challenge', icon: <Swords size={14} /> },
        { path: withAudience('/challenge?mode=simulator'), label: lang === 'vi' ? 'Kịch bản bẫy mạng' : 'Scam Scenarios', icon: <Target size={14} /> },
        { path: withAudience('/tools/scan'), label: lang === 'vi' ? 'Quét giám định pháp y' : 'Forensics Scan', icon: <ScanLine size={14} /> },
        { path: withAudience('/tools/crisis'), label: lang === 'vi' ? 'Trung tâm ứng cứu khẩn' : 'Crisis Center', icon: <Cpu size={14} /> },
        { path: withAudience('/academy'), label: 'Học viện Academy', icon: <GraduationCap size={14} /> },
        { path: withAudience('/tools/knowledge'), label: lang === 'vi' ? 'Kiến thức & Pháp luật' : 'Law & Knowledge', icon: <Scale size={14} /> },
        { path: withAudience('/contact'), label: lang === 'vi' ? 'Về chúng tôi' : 'About Us', icon: <Info size={14} /> },
      ]
      : familyAudience === 'old'
        ? [
          { path: getFamilyPath('old'), label: lang === 'vi' ? 'Trang chủ người lớn 40+' : 'Adults 40+ Home', icon: <HeartHandshake size={14} /> },
          { path: withAudience('/challenge?mode=simulator'), label: lang === 'vi' ? 'Kịch bản lừa đảo' : 'Scam Scenarios', icon: <Target size={14} /> },
          { path: withAudience('/tools/scan'), label: lang === 'vi' ? 'Kiểm tra & Giám định' : 'Forensic Scan', icon: <ScanLine size={14} /> },
          { path: withAudience('/tools/crisis'), label: lang === 'vi' ? 'Ứng cứu khẩn cấp' : 'Crisis Center', icon: <Cpu size={14} /> },
          { path: withAudience('/tools/knowledge'), label: lang === 'vi' ? 'Kiến thức an toàn & Pháp luật' : 'Law & Safety', icon: <Scale size={14} /> },
          { path: withAudience('/contact'), label: lang === 'vi' ? 'Về chúng tôi' : 'About Us', icon: <Info size={14} /> },
        ]
        : [
          { path: getFamilyRootPath(), label: lang === 'vi' ? 'Cổng gia đình' : 'Family Portal', icon: <Home size={14} /> },
          { path: getFamilyPath('young'), label: lang === 'vi' ? 'Chế độ thiếu niên' : 'Teens Mode', icon: <GraduationCap size={14} /> },
          { path: getFamilyPath('old'), label: lang === 'vi' ? 'Chế độ người lớn 40+' : 'Adults 40+ Mode', icon: <HeartHandshake size={14} /> },
          { path: '/contact', label: lang === 'vi' ? 'Về chúng tôi' : 'About Us', icon: <Info size={14} /> },
        ]
    : navItems;

  const isLite = perfMode === 'lite';
  const isWinter = season === 'WINTER';
  const themeLabel = lang === 'vi'
    ? `Đổi sang giao diện ${theme === 'dark' ? 'sáng' : 'tối'}`
    : `Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`;
  const perfLabel = lang === 'vi'
    ? `Sự kiện mùa đông ${isWinter ? 'Bật' : 'Tắt'} (chạm để đổi · giữ 4s để ${isLite ? 'tắt' : 'bật'} chế độ cấu hình thấp)`
    : `Winter event ${isWinter ? 'On' : 'Off'} (tap to toggle · hold 4s for Lite mode)`;

  // === Tap = đổi sự kiện mùa đông · Giữ 4s = đổi chế độ cấu hình thấp ===
  const HOLD_MS = 4000;
  const TAP_MAX_MS = 350; // chạm dưới 350ms được coi là tap
  const [holdProgress, setHoldProgress] = useState(0); // 0..1
  const [perfToast, setPerfToast] = useState<{ msg: string; lite: boolean } | null>(null);
  const [showPerfHint, setShowPerfHint] = useState(false);
  const holdTimerRef = useRef<number | null>(null);
  const holdRafRef = useRef<number | null>(null);
  const holdStartRef = useRef<number>(0);
  const holdFiredRef = useRef<boolean>(false); // đã đạt 4s và đổi perf mode chưa

  // Hint "Giữ 4s..." auto-hiện lần đầu trên mobile
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const isMobile = window.matchMedia?.('(pointer: coarse)').matches || window.innerWidth < 768;
    if (!isMobile) return;
    try {
      if (window.localStorage.getItem('df_perf_hint_seen') === '1') return;
    } catch { /* ignore */ }
    const id = window.setTimeout(() => setShowPerfHint(true), 1200);
    return () => window.clearTimeout(id);
  }, []);

  // Auto-dismiss hint sau 8s, ghi localStorage
  useEffect(() => {
    if (!showPerfHint) return;
    const id = window.setTimeout(() => {
      setShowPerfHint(false);
      try { window.localStorage.setItem('df_perf_hint_seen', '1'); } catch { /* ignore */ }
    }, 8000);
    return () => window.clearTimeout(id);
  }, [showPerfHint]);

  const dismissPerfHint = () => {
    setShowPerfHint(false);
    try { window.localStorage.setItem('df_perf_hint_seen', '1'); } catch { /* ignore */ }
  };

  const clearHold = () => {
    if (holdTimerRef.current !== null) {
      window.clearTimeout(holdTimerRef.current);
      holdTimerRef.current = null;
    }
    if (holdRafRef.current !== null) {
      cancelAnimationFrame(holdRafRef.current);
      holdRafRef.current = null;
    }
    setHoldProgress(0);
  };

  const isMobileDevice = () => {
    if (typeof window === 'undefined') return false;
    return window.matchMedia?.('(pointer: coarse)').matches || window.innerWidth < 768;
  };

  const startHold = () => {
    if (holdTimerRef.current !== null) return; // đang giữ
    dismissPerfHint();
    holdFiredRef.current = false;
    holdStartRef.current = performance.now();
    const tick = () => {
      const elapsed = performance.now() - holdStartRef.current;
      setHoldProgress(Math.min(1, elapsed / HOLD_MS));
      if (elapsed < HOLD_MS) {
        holdRafRef.current = requestAnimationFrame(tick);
      }
    };
    holdRafRef.current = requestAnimationFrame(tick);
    holdTimerRef.current = window.setTimeout(() => {
      holdFiredRef.current = true;
      togglePerfMode();
      const willBeLite = !isLite;
      if (isMobileDevice()) {
        setPerfToast({
          msg: willBeLite
            ? (lang === 'vi'
                ? 'Đã bật chế độ cấu hình thấp — tắt hiệu ứng 3D, tuyết rơi và smooth scroll để web mượt hơn trên điện thoại.'
                : 'Lite mode enabled — disabled 3D effects, falling snow and smooth scroll for a smoother mobile experience.')
            : (lang === 'vi'
                ? 'Đã tắt chế độ cấu hình thấp — bật lại đầy đủ hiệu ứng.'
                : 'Lite mode disabled — all effects restored.'),
          lite: willBeLite,
        });
      }
      // Haptic feedback nếu thiết bị hỗ trợ
      try { (navigator as any).vibrate?.(40); } catch { /* ignore */ }
      clearHold();
    }, HOLD_MS);
  };

  // Pointer up: tap nhanh = toggle winter event · giữ 4s = toggle lite mode
  const endHold = () => {
    if (holdTimerRef.current === null && holdRafRef.current === null) {
      if (holdFiredRef.current) {
        holdFiredRef.current = false;
        return;
      }
    }
    const elapsed = holdStartRef.current ? performance.now() - holdStartRef.current : 0;
    const wasHoldFired = holdFiredRef.current;
    clearHold();
    if (!wasHoldFired && elapsed > 0 && elapsed < TAP_MAX_MS) {
      // Tap nhanh → bật/tắt sự kiện mùa đông
      setSeason(season === 'WINTER' ? 'NORMAL' : 'WINTER');
    }
    holdFiredRef.current = false;
  };

  // Cancel (rời nút khi đang giữ giữa chừng): không tap, không toggle perf
  const cancelHold = () => {
    holdFiredRef.current = false;
    clearHold();
  };

  // Auto-dismiss toast sau 5s
  useEffect(() => {
    if (!perfToast) return;
    const id = window.setTimeout(() => setPerfToast(null), 5000);
    return () => window.clearTimeout(id);
  }, [perfToast]);

  // Dọn timer khi unmount
  useEffect(() => () => clearHold(), []);

  const handleNavClick = (path: string) => {
    navigate(path);
    setIsMenuOpen(false);
  };

  const welcomeText = lang === 'vi'
    ? siteConfig.marquee
    : 'Welcome to DEEPFENSE 3.0 - a gamified training platform for deepfake awareness and AI scam defense';

  const authLabel = user
    ? (user.displayName?.split(' ')[0] || user.email?.split('@')[0] || 'Profile')
    : (lang === 'vi' ? 'Đăng nhập' : 'Sign in');
  const dpfBalanceLabel = dpfLoading ? '...' : dpfBalance.toLocaleString('en-US');
  const mobileMenuSurface = theme === 'dark'
    ? 'border-white/[0.10] bg-[#020710]/[0.98] shadow-[0_20px_46px_rgba(0,0,0,0.44)]'
    : 'border-slate-200/90 bg-white/[0.98] shadow-[0_18px_38px_rgba(15,50,100,0.16)]';
  const mobileMenuInactive = theme === 'dark'
    ? 'text-slate-200 hover:bg-white/[0.07] hover:text-white'
    : 'text-slate-700 hover:bg-slate-100 hover:text-slate-950';
  const mobileMenuActive = theme === 'dark'
    ? 'border border-primary/25 bg-primary/14 text-blue-100'
    : 'border border-primary/25 bg-primary/12 text-primary';
  const mobileMenuIcon = theme === 'dark' ? 'text-slate-400' : 'text-slate-500';
  const tickerBarClass = theme === 'dark'
    ? 'border-primary/15 bg-gradient-to-r from-[#020710] via-[#071426] to-[#020710]'
    : 'border-blue-100/80 bg-gradient-to-r from-white via-sky-50 to-white shadow-[0_1px_10px_rgba(15,50,100,0.06)]';
  const tickerEdgeLeft = theme === 'dark' ? 'from-black' : 'from-white';
  const tickerEdgeRight = theme === 'dark' ? 'from-black' : 'from-white';
  const tickerTextClass = theme === 'dark' ? 'text-blue-200/75' : 'text-slate-700';

  const isActivePath = (path: string) => {
    const target = new URL(path, 'https://deepfense.local');
    const currentMode = new URLSearchParams(location.search).get('mode');
    const targetMode = target.searchParams.get('mode');
    const targetAudience = target.searchParams.get('audience');
    const currentAudience = new URLSearchParams(location.search).get('audience');

    if (target.pathname === '/challenge') {
      if (targetMode) {
        return location.pathname === '/challenge'
          && currentMode === targetMode
          && (!targetAudience || currentAudience === targetAudience || familyAudience === targetAudience);
      }
      return location.pathname === '/challenge' && currentMode !== 'simulator';
    }

    return (
      location.pathname === target.pathname
      || (target.pathname === '/tools' && location.pathname.startsWith('/tools'))
      || (target.pathname === '/academy' && location.pathname.startsWith('/academy'))
    );
  };

  return (
    <>
      {showTicker && (
        <div className={`relative z-[101] flex h-8 w-full max-w-[100vw] items-center overflow-hidden border-b transition-colors duration-300 ${tickerBarClass}`}>
          <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
          <div className={`pointer-events-none absolute left-0 top-0 z-10 h-full w-20 bg-gradient-to-r ${tickerEdgeLeft} to-transparent`} />
          <div className={`pointer-events-none absolute right-0 top-0 z-10 h-full w-20 bg-gradient-to-l ${tickerEdgeRight} to-transparent`} />
          <div className="announcement-ticker">
            {[0, 1].map((item) => (
              <span key={item} className={`pr-10 font-sans text-[11px] font-semibold tracking-[0.02em] md:text-[12px] ${tickerTextClass}`}>
                {welcomeText} &nbsp;&nbsp;&nbsp;•&nbsp;&nbsp;&nbsp; {welcomeText} &nbsp;&nbsp;&nbsp;•&nbsp;&nbsp;&nbsp;
              </span>
            ))}
          </div>
        </div>
      )}

      <div
        className={`sticky top-0 z-[100] w-full border-b transition-all duration-500 ${
          isScrolled
            ? 'border-black/[0.08] dark:border-white/[0.10] bg-white/95 dark:bg-[#020710]/95 shadow-[0_4px_34px_rgba(0,0,0,0.12)] dark:shadow-[0_4px_34px_rgba(0,0,0,0.52)] backdrop-blur-2xl'
            : 'border-black/[0.05] dark:border-white/[0.06] bg-white/82 dark:bg-[#020710]/82 backdrop-blur-xl'
        }`}
      >
        <div className="mx-auto max-w-7xl px-3 sm:px-4 md:px-6">
          <div className={`flex items-center justify-between flex-nowrap min-w-0 transition-all duration-500 ${isScrolled ? 'h-14 md:h-16' : 'h-16 md:h-20'}`}>
            <Link to={isFamilyShell ? getFamilyRootPath() : '/'} className="group flex shrink-0 cursor-pointer items-center gap-2 md:gap-3">
              <div className="relative h-8 w-8 shrink-0 sm:h-9 sm:w-9 md:h-10 md:w-10">
                <div className="absolute inset-0 rounded-2xl bg-primary/20 opacity-0 blur-md transition-opacity duration-500 group-hover:opacity-100" />
                <img
                  src="/logo/android-chrome-192x192.png"
                  alt="DEEPFENSE"
                  className="relative h-full w-full rounded-2xl object-contain drop-shadow-[0_0_14px_rgba(0,240,255,0.28)] transition-transform duration-500 group-hover:scale-110"
                />
              </div>
              <div className="flex flex-col leading-none">
                <span className="font-display truncate text-lg font-black tracking-tight text-slate-900 dark:text-white sm:text-xl md:text-2xl">
                  DEEPFENSE
                </span>
                <div className="mt-1 hidden items-center gap-1.5 md:flex">
                  <div className="h-1 w-1 animate-pulse rounded-full bg-primary" />
                  <span className="font-mono text-[0.55rem] font-bold uppercase tracking-[0.24em] text-blue-300/55">
                    {lang === 'vi' ? 'PHÒNG VỆ DEEPFAKE' : 'DEEPFAKE DEFENSE'}
                  </span>
                </div>
              </div>
            </Link>

            <nav className={`hidden items-center flex-nowrap whitespace-nowrap shrink-0 ${isFamilyShell ? 'gap-0.5 xl:gap-1.5' : 'gap-1'} lg:flex`}>
              {navItems.map((item) => {
                const isActive = isActivePath(item.path);
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`group relative flex shrink-0 items-center gap-1.5 whitespace-nowrap rounded-lg py-2 text-[13px] font-semibold tracking-normal transition-all duration-300 ${isFamilyShell ? 'px-2 xl:px-3' : 'px-3'} ${
                      isActive ? 'bg-primary/15 text-primary dark:text-blue-100 shadow-[inset_0_0_0_1px_rgba(96,165,250,0.18)]' : 'text-slate-600 dark:text-slate-300/85 hover:bg-black/[0.04] dark:hover:bg-white/[0.06] hover:text-slate-900 dark:hover:text-white'
                    }`}
                  >
                    <span className={`transition-colors shrink-0 ${isActive ? 'text-primary dark:text-blue-300' : 'text-slate-500 group-hover:text-slate-600 dark:text-slate-300'}`}>{item.icon}</span>
                    <span className="shrink-0">{item.label}</span>
                    {isActive && (
                      <span className="absolute bottom-0 left-1/2 h-[2px] w-7 -translate-x-1/2 rounded-full bg-blue-300 shadow-[0_0_8px_rgba(96,165,250,0.72)]" />
                    )}
                  </Link>
                );
              })}
            </nav>

            <div className="relative flex shrink-0 items-center gap-1 sm:gap-2 md:gap-3">
              <div className="flex h-7 items-center rounded-full border border-black/10 dark:border-white/10 bg-white/[0.045] p-0.5 sm:h-8 sm:p-1">
                {(['vi', 'en'] as const).map((l) => (
                  <button
                    key={l}
                    onClick={() => setLang(l)}
                    className={`flex h-full items-center justify-center rounded-full px-2 text-[10px] font-bold transition-all duration-300 sm:px-2.5 ${
                      lang === l ? 'bg-primary text-white shadow-[0_0_8px_rgba(29,111,232,0.42)]' : 'text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-100'
                    }`}
                  >
                    {l.toUpperCase()}
                  </button>
                ))}
              </div>

              <button
                type="button"
                onClick={toggleTheme}
                className="relative flex h-7 w-7 items-center justify-center rounded-full border border-black/10 bg-white/80 text-slate-700 shadow-sm transition-all duration-300 hover:border-primary/30 hover:text-primary dark:border-white/10 dark:bg-white/[0.045] dark:text-slate-300 dark:hover:text-white sm:h-8 sm:w-8 md:h-9 md:w-9"
                title={themeLabel}
                aria-label={themeLabel}
                aria-pressed={theme === 'dark'}
              >
                {theme === 'dark' ? <Sun size={15} /> : <Moon size={15} />}
              </button>


              {!isFamilyShell && (
                <div className="relative">
                <button
                  onPointerDown={startHold}
                  onPointerUp={endHold}
                  onPointerLeave={cancelHold}
                  onPointerCancel={cancelHold}
                  onContextMenu={(e) => e.preventDefault()}
                  className="group relative z-50 select-none outline-none touch-manipulation"
                  title={perfLabel}
                  aria-label={perfLabel}
                  aria-pressed={isWinter}
                >
                  <div className={`absolute inset-0 rounded-full blur-md transition-opacity duration-500 ${
                    isLite ? 'bg-emerald-500/40 opacity-100'
                    : isWinter ? 'bg-cyan-400/45 opacity-100'
                    : 'bg-primary/30 opacity-0 group-hover:opacity-60'
                  }`} />
                  {/* Progress ring trong khi giữ */}
                  {holdProgress > 0 && (
                    <svg className="absolute inset-0 z-20 h-full w-full -rotate-90" viewBox="0 0 36 36" aria-hidden="true">
                      <circle cx="18" cy="18" r="16" fill="none" stroke="rgba(16,185,129,0.18)" strokeWidth="2.5" />
                      <circle
                        cx="18" cy="18" r="16" fill="none"
                        stroke={isLite ? '#fbbf24' : '#10b981'}
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeDasharray={`${holdProgress * 100.53} 100.53`}
                        className="drop-shadow-[0_0_4px_rgba(16,185,129,0.7)]"
                      />
                    </svg>
                  )}
                  <div className={`relative z-10 flex h-7 w-7 items-center justify-center rounded-full border shadow-xl transition-all duration-700 ease-[cubic-bezier(0.34,1.56,0.64,1)] sm:h-8 sm:w-8 md:h-9 md:w-9 ${
                    isLite
                      ? 'border-emerald-400/70 bg-gradient-to-br from-emerald-500 to-teal-600'
                      : isWinter
                        ? 'border-cyan-300/80 bg-gradient-to-br from-cyan-400 to-blue-700'
                        : 'rotate-0 border-black/10 dark:border-white/10 bg-zinc-900 hover:border-cyan-500/40 hover:bg-zinc-800'
                  } ${holdProgress > 0 ? 'scale-95' : ''}`}
                  >
                    {isLite
                      ? <Smartphone size={15} className="text-white drop-shadow-md" />
                      : isWinter
                        ? <Snowflake size={15} className="text-cyan-50 drop-shadow-md" />
                        : <Snowflake size={15} className="text-slate-400 transition-colors group-hover:text-cyan-300" />}
                  </div>
                </button>

              {/* Tooltip hướng dẫn — chỉ trên mobile, lần đầu */}
              {showPerfHint && !perfToast && (
                <div className="pointer-events-none absolute right-0 top-full z-[110] mt-3 w-64 origin-top-right animate-in fade-in slide-in-from-top-2 duration-300 lg:hidden">
                  {/* Mũi tên trỏ lên nút */}
                  <div className="absolute -top-1.5 right-3 h-3 w-3 rotate-45 border-l border-t border-emerald-400/40 bg-emerald-950/95" />
                  <div className="pointer-events-auto relative flex items-start gap-2 rounded-xl border border-emerald-400/40 bg-emerald-950/95 px-3 py-2.5 shadow-2xl">
                    <Smartphone size={14} className="mt-0.5 shrink-0 text-emerald-300" />
                    <div className="flex-1 font-mono text-[11px] leading-snug text-emerald-50">
                      {lang === 'vi'
                        ? 'Giữ nút này 4 giây để bật chế độ cấu hình thấp — web sẽ mượt hơn trên điện thoại.'
                        : 'Hold this button for 4s to enable Lite mode — smoother on mobile.'}
                    </div>
                    <button
                      type="button"
                      onClick={dismissPerfHint}
                      className="ml-1 -mr-1 -mt-1 shrink-0 rounded-full p-1 text-emerald-300/70 transition-colors hover:bg-black/10 hover:text-white dark:bg-white/10"
                      aria-label={lang === 'vi' ? 'Đóng' : 'Close'}
                    >
                      <X size={12} />
                    </button>
                  </div>
                </div>
              )}

              {/* Toast kết quả — chỉ trên mobile, neo cạnh nút */}
              {perfToast && (
                <div className="pointer-events-none absolute right-0 top-full z-[110] mt-3 w-64 origin-top-right animate-in fade-in slide-in-from-top-2 duration-300 lg:hidden">
                  <div className={`absolute -top-1.5 right-3 h-3 w-3 rotate-45 border-l border-t ${perfToast.lite ? 'border-emerald-400/40 bg-emerald-950/95' : 'border-primary/30 bg-zinc-900/95'}`} />
                  <div className={`pointer-events-auto relative flex items-start gap-2 rounded-xl border px-3 py-2.5 shadow-2xl ${
                    perfToast.lite
                      ? 'border-emerald-400/40 bg-emerald-950/95 text-emerald-50'
                      : 'border-primary/30 bg-zinc-900/95 text-gray-100'
                  }`}>
                    {perfToast.lite
                      ? <Smartphone size={14} className="mt-0.5 shrink-0 text-emerald-300" />
                      : <Power size={14} className="mt-0.5 shrink-0 text-primary" />}
                    <div className="flex-1 font-mono text-[11px] leading-snug">{perfToast.msg}</div>
                    <button
                      type="button"
                      onClick={() => setPerfToast(null)}
                      className="ml-1 -mr-1 -mt-1 shrink-0 rounded-full p-1 text-slate-600 dark:text-slate-300/85 transition-colors hover:bg-black/10 dark:bg-white/10 hover:text-slate-900 dark:text-white"
                      aria-label={lang === 'vi' ? 'Đóng' : 'Close'}
                    >
                      <X size={12} />
                    </button>
                  </div>
                </div>
              )}
                </div>
              )}

              <button
                onClick={onGoogleAuth}
                disabled={authBusy}
                title={user?.email || (lang === 'vi' ? 'Đăng nhập hoặc tạo tài khoản' : 'Sign in or create account')}
                className="hidden max-w-[250px] items-center gap-1.5 rounded-lg border border-primary/25 bg-primary/12 px-3 py-2 text-[12px] font-bold text-primary transition-all duration-300 hover:border-primary/45 hover:bg-primary/20 disabled:cursor-wait disabled:opacity-60 dark:text-blue-100 lg:flex"
              >
                {user ? <UserCircle size={12} /> : <LogIn size={12} />}
                <span className="truncate">{authBusy ? (lang === 'vi' ? 'Đang xử lý' : 'Working') : authLabel}</span>
                {user && (
                  <span className="ml-1 inline-flex items-center gap-1 rounded-md border border-amber-300/25 bg-amber-300/10 px-1.5 py-0.5 text-[10px] text-amber-200">
                    <Coins size={10} /> {dpfBalanceLabel}
                  </span>
                )}
              </button>

              {authError && (
                <div className="absolute right-10 top-[calc(100%+10px)] w-56 rounded-lg border border-red-500/20 bg-red-950/90 px-3 py-2 font-mono text-[11px] font-bold text-red-200 shadow-xl lg:right-0">
                  {authError}
                </div>
              )}

              <button
                type="button"
                  className={`rounded-lg p-1.5 transition-colors sm:p-2 lg:hidden ${
                  theme === 'dark'
                    ? 'text-slate-200 hover:bg-white/[0.07] hover:text-white'
                    : 'text-slate-700 hover:bg-slate-100 hover:text-slate-950'
                }`}
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                aria-label={isMenuOpen ? (lang === 'vi' ? 'Đóng điều hướng' : 'Close navigation') : (lang === 'vi' ? 'Mở điều hướng' : 'Open navigation')}
                aria-expanded={isMenuOpen}
              >
                {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>
          </div>
        </div>

        {isMenuOpen && (
          <div className={`animate-in slide-in-from-top-3 border-t backdrop-blur-2xl duration-200 lg:hidden ${mobileMenuSurface}`}>
            <div className="flex flex-col gap-1 p-3">
              {mobileNavItems.map((item) => {
                const isActive = isActivePath(item.path);
                return (
                  <button
                    key={item.path}
                    onClick={() => handleNavClick(item.path)}
                    className={`flex items-center gap-3 rounded-xl px-4 py-3.5 text-[14px] font-semibold tracking-normal transition-all ${
                      isActive ? mobileMenuActive : mobileMenuInactive
                    }`}
                  >
                    <span className={isActive ? (theme === 'dark' ? 'text-blue-300' : 'text-primary') : mobileMenuIcon}>{item.icon}</span>
                    {item.label}
                  </button>
                );
              })}

              <div className={`mt-2 border-t pt-2 ${theme === 'dark' ? 'border-white/[0.08]' : 'border-slate-200'}`}>
                <button
                  onClick={onGoogleAuth}
                  disabled={authBusy}
                  className={`flex w-full items-center justify-center gap-2 rounded-xl border border-primary/25 bg-primary/12 px-4 py-3 text-[13px] font-bold disabled:opacity-60 ${
                    theme === 'dark' ? 'text-blue-100' : 'text-primary'
                  }`}
                >
                  {user ? <UserCircle size={13} /> : <LogIn size={13} />}
                  <span className="truncate">{authBusy ? (lang === 'vi' ? 'Đang xử lý' : 'Working') : authLabel}</span>
                  {user && (
                    <span className="inline-flex items-center gap-1 rounded-md border border-amber-300/25 bg-amber-300/10 px-1.5 py-0.5 text-[10px] text-amber-200">
                      <Coins size={10} /> {dpfBalanceLabel} DPF
                    </span>
                  )}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

    </>
  );
};

export default Navbar;
