/**
 * DEEPFENSE.ONLINE — Navbar v3.0
 * World-class navigation with announcement bar, animated logo, premium effects.
 * Inspired by: Linear.app, Vercel.com
 * @copyright 2025 Ho Xuan Nguyen (25NS039)
 */

import React, { useState, useEffect } from 'react';
import { Language, Season } from '@/types';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, Home, Cpu, Swords, Bot, Info, Sun, Power, LogIn, LogOut, UserCircle, GraduationCap } from 'lucide-react';
import type { User } from 'firebase/auth';

interface NavbarProps {
  lang: Language;
  setLang: (l: Language) => void;
  season: Season;
  setSeason: (s: Season) => void;
  user: User | null;
  authBusy: boolean;
  authError: string;
  onGoogleAuth: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ lang, setLang, season, setSeason, user, authBusy, authError, onGoogleAuth }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 30);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems: { path: string; label: string; icon: React.ReactNode }[] = [
    { path: '/',           label: lang === 'vi' ? 'TRANG CHỦ' : 'HOME',      icon: <Home size={13} /> },
    { path: '/academy',    label: 'ACADEMY',                                  icon: <GraduationCap size={13} /> },
    { path: '/tools',      label: lang === 'vi' ? 'CÔNG CỤ'   : 'TOOLS',     icon: <Cpu size={13} /> },
    { path: '/challenge',  label: lang === 'vi' ? 'THỬ THÁCH' : 'CHALLENGE', icon: <Swords size={13} /> },
    { path: '/ai-project', label: lang === 'vi' ? 'DỰ ÁN AI'  : 'AI PROJECT',icon: <Bot size={13} /> },
    { path: '/contact',    label: lang === 'vi' ? 'VỀ CHÚNG TÔI' : 'ABOUT', icon: <Info size={13} /> },
  ];

  const toggleSeason = () => setSeason(season === 'SUMMER' ? 'NORMAL' : 'SUMMER');

  const handleNavClick = (path: string) => {
    navigate(path);
    setIsMenuOpen(false);
  };

  const welcomeText = lang === 'vi'
    ? 'Chào mừng bạn đến với DEEPFENSE 3.0 - nền tảng huấn luyện nhận diện deepfake và tự vệ trước lừa đảo AI'
    : 'Welcome to DEEPFENSE 3.0 - a gamified training platform for deepfake awareness and AI scam defense';

  const authLabel = user
    ? (user.displayName?.split(' ')[0] || user.email?.split('@')[0] || 'Gmail')
    : (lang === 'vi' ? 'Đăng nhập Gmail' : 'Sign in Gmail');

  return (
    <>
      {/* ── WELCOME BAR ── */}
      <div className="relative z-[101] w-full bg-gradient-to-r from-black via-[#07111f] to-black border-b border-primary/10 h-8 flex items-center overflow-hidden">
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent pointer-events-none" />
        <div className="absolute left-0 top-0 z-10 h-full w-20 bg-gradient-to-r from-black to-transparent pointer-events-none" />
        <div className="absolute right-0 top-0 z-10 h-full w-20 bg-gradient-to-l from-black to-transparent pointer-events-none" />
        <div className="announcement-ticker">
          <span className="text-[10px] md:text-[11px] font-mono tracking-[0.18em] uppercase text-primary/70 pr-10">
            {welcomeText} &nbsp;&nbsp;&nbsp;•&nbsp;&nbsp;&nbsp; {welcomeText} &nbsp;&nbsp;&nbsp;•&nbsp;&nbsp;&nbsp;
          </span>
          <span className="text-[10px] md:text-[11px] font-mono tracking-[0.18em] uppercase text-primary/70 pr-10">
            {welcomeText} &nbsp;&nbsp;&nbsp;•&nbsp;&nbsp;&nbsp; {welcomeText} &nbsp;&nbsp;&nbsp;•&nbsp;&nbsp;&nbsp;
          </span>
        </div>
      </div>

      {/* ── MAIN NAVBAR ── */}
      <div
        className={`sticky top-0 z-[100] w-full border-b transition-all duration-500
          ${isScrolled
            ? 'bg-black/95 backdrop-blur-2xl border-white/[0.08] shadow-[0_4px_40px_rgba(0,0,0,0.6)]'
            : 'bg-black/70 backdrop-blur-xl border-white/[0.04]'
          }`}
      >
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className={`flex items-center justify-between transition-all duration-500 ${isScrolled ? 'h-14 md:h-16' : 'h-16 md:h-20'}`}>

            {/* ── LOGO ── */}
            <Link to="/" className="flex items-center gap-3 group cursor-pointer shrink-0">
              <div className="relative h-9 w-9 md:h-10 md:w-10">
                <div className="absolute inset-0 rounded-2xl bg-primary/20 blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <img
                  src="/logo/android-chrome-192x192.png"
                  alt="DEEPFENSE"
                  className="relative h-full w-full rounded-2xl object-contain drop-shadow-[0_0_14px_rgba(0,240,255,0.28)] transition-transform duration-500 group-hover:scale-110"
                />
              </div>
              <div className="flex flex-col leading-none">
                <span
                  className="font-black text-xl md:text-2xl tracking-tight text-white"
                  style={{ fontFamily: "'Outfit', 'Inter', Arial, 'Helvetica Neue', sans-serif" }}
                >
                  DEEPFENSE
                </span>
                <div className="hidden md:flex items-center gap-1.5 mt-1">
                  <div className="w-1 h-1 rounded-full bg-primary animate-pulse" />
                  <span className="font-mono text-[0.55rem] text-primary/40 tracking-[0.35em] uppercase font-bold">
                    DEEPFAKE SHIELD
                  </span>
                </div>
              </div>
            </Link>

            {/* ── DESKTOP NAV ── */}
            <nav className="hidden lg:flex items-center gap-1">
              {navItems.map((item) => {
                const isActive = location.pathname === item.path
                  || (item.path === '/tools' && location.pathname.startsWith('/tools'))
                  || (item.path === '/academy' && location.pathname.startsWith('/academy'));
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`
                      relative flex items-center gap-1.5 px-3 py-2 rounded-lg
                      text-[10px] font-black font-mono uppercase tracking-[0.12em]
                      transition-all duration-300
                      ${isActive
                        ? 'text-primary bg-primary/8'
                        : 'text-gray-500 hover:text-gray-200 hover:bg-white/[0.04]'
                      }
                    `}
                  >
                    <span className={`transition-colors ${isActive ? 'text-primary' : 'text-gray-600'}`}>
                      {item.icon}
                    </span>
                    <span>{item.label}</span>
                    {/* Active underline glow */}
                    {isActive && (
                      <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-6 h-[2px] rounded-full bg-primary shadow-[0_0_6px_rgba(0,240,255,0.8)]" />
                    )}
                  </Link>
                );
              })}
            </nav>

            {/* ── CONTROLS ── */}
            <div className="relative flex items-center gap-2 md:gap-3">

              {/* Language Switcher */}
              <div className="h-8 flex items-center bg-zinc-900/80 border border-white/8 rounded-full p-1">
                {(['vi', 'en'] as const).map((l) => (
                  <button
                    key={l}
                    onClick={() => setLang(l)}
                    className={`h-full px-2.5 flex items-center justify-center text-[9px] font-black rounded-full transition-all duration-300
                      ${lang === l
                        ? 'bg-primary text-black shadow-[0_0_8px_rgba(0,240,255,0.5)]'
                        : 'text-gray-500 hover:text-gray-300'
                      }`}
                  >
                    {l.toUpperCase()}
                  </button>
                ))}
              </div>

              {/* Season Toggle */}
              <button
                onClick={toggleSeason}
                className="relative group outline-none select-none touch-manipulation z-50"
                title={season === 'SUMMER' ? 'Summer Off' : 'Summer On'}
              >
                <div className={`absolute inset-0 rounded-full blur-md transition-opacity duration-500 ${season === 'SUMMER' ? 'bg-orange-500/50 opacity-100' : 'opacity-0'}`} />
                <div className={`
                  relative h-8 w-8 md:h-9 md:w-9 rounded-full flex items-center justify-center
                  border shadow-xl transition-all duration-700 ease-[cubic-bezier(0.34,1.56,0.64,1)] z-10
                  ${season === 'SUMMER'
                    ? 'bg-gradient-to-br from-orange-400 to-red-500 border-orange-500 rotate-[360deg]'
                    : 'bg-zinc-900 border-white/10 rotate-0 hover:border-white/30 hover:bg-zinc-800'
                  }
                `}>
                  {season === 'SUMMER'
                    ? <Sun size={15} className="text-yellow-200 drop-shadow-md animate-[spin_10s_linear_infinite]" />
                    : <Power size={15} className="text-gray-500 group-hover:text-gray-300 transition-colors" />
                  }
                </div>
              </button>

              {/* Google Auth CTA (desktop only) */}
              <button
                onClick={onGoogleAuth}
                disabled={authBusy}
                title={user?.email || (lang === 'vi' ? 'Đăng nhập bằng tài khoản Gmail' : 'Sign in with Gmail')}
                className="hidden lg:flex items-center gap-1.5 px-4 py-2 rounded-lg bg-primary/10 border border-primary/20 text-primary text-[10px] font-black font-mono uppercase tracking-widest hover:bg-primary/20 hover:border-primary/40 disabled:opacity-60 disabled:cursor-wait transition-all duration-300 max-w-[190px]"
              >
                {user ? <UserCircle size={12} /> : <LogIn size={12} />}
                <span className="truncate">{authBusy ? (lang === 'vi' ? 'ĐANG XỬ LÝ' : 'WORKING') : authLabel}</span>
                {user && <LogOut size={11} className="opacity-60" />}
              </button>

              {authError && (
                <div className="absolute right-10 lg:right-0 top-[calc(100%+10px)] w-56 rounded-lg border border-red-500/20 bg-red-950/90 px-3 py-2 text-[10px] font-mono font-bold text-red-200 shadow-xl">
                  {authError}
                </div>
              )}

              {/* Mobile Menu Toggle */}
              <button
                className="lg:hidden p-2 text-gray-400 hover:text-white transition-colors"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                {isMenuOpen ? <X size={22} /> : <Menu size={22} />}
              </button>
            </div>
          </div>
        </div>

        {/* ── MOBILE MENU ── */}
        {isMenuOpen && (
          <div className="lg:hidden border-t border-white/5 bg-black/98 backdrop-blur-2xl animate-in slide-in-from-top-3 duration-200">
            <div className="flex flex-col p-3 gap-1">
              {navItems.map((item) => {
                const isActive = location.pathname === item.path
                  || (item.path === '/academy' && location.pathname.startsWith('/academy'))
                  || (item.path === '/tools' && location.pathname.startsWith('/tools'));
                return (
                  <button
                    key={item.path}
                    onClick={() => handleNavClick(item.path)}
                    className={`flex items-center gap-3 px-4 py-3.5 rounded-xl text-[11px] font-black font-mono transition-all uppercase tracking-widest
                      ${isActive
                        ? 'bg-primary/10 text-primary border border-primary/20'
                        : 'text-gray-400 hover:bg-white/5 hover:text-white'
                      }`}
                  >
                    <span className={isActive ? 'text-primary' : 'text-gray-600'}>{item.icon}</span>
                    {item.label}
                  </button>
                );
              })}
              <div className="mt-2 pt-2 border-t border-white/5">
                <button
                  onClick={onGoogleAuth}
                  disabled={authBusy}
                  className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-primary/10 border border-primary/20 text-primary text-[11px] font-black font-mono uppercase tracking-widest disabled:opacity-60"
                >
                  {user ? <UserCircle size={13} /> : <LogIn size={13} />}
                  <span className="truncate">{authBusy ? (lang === 'vi' ? 'ĐANG XỬ LÝ' : 'WORKING') : authLabel}</span>
                  {user && <LogOut size={12} className="opacity-60" />}
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
