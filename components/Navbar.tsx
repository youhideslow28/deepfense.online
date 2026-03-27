import React, { useState } from 'react';
import { Language, Season } from '../types';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Shield, Menu, X, Home, Cpu, Swords, Bot, Info, Sun, Power, HeartPulse, Target } from 'lucide-react';
import { TRANSLATIONS } from '../data';

interface NavbarProps {
  lang: Language;
  setLang: (l: Language) => void;
  season: Season;
  setSeason: (s: Season) => void;
}

const Navbar: React.FC<NavbarProps> = ({ lang, setLang, season, setSeason }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  const location = useLocation();
  const navigate = useNavigate();

  const navItems: { path: string; label: string; icon: React.ReactNode }[] = [
    { path: '/', label: lang === 'vi' ? 'TRANG CHỦ' : 'HOME', icon: <Home size={14} /> },
    { path: '/tools', label: lang === 'vi' ? 'CÔNG CỤ' : 'TOOLS', icon: <Cpu size={14} /> },
    { path: '/challenge', label: lang === 'vi' ? 'THỬ THÁCH' : 'CHALLENGE', icon: <Swords size={14} /> },
    { path: '/ai-project', label: lang === 'vi' ? 'DỰ ÁN AI' : 'AI PROJECT', icon: <Bot size={14} /> },
    { path: '/contact', label: lang === 'vi' ? 'VỀ CHÚNG TÔI' : 'ABOUT US', icon: <Info size={14} /> },
  ];

  // Logic chuyển đổi: Chỉ toggle giữa SUMMER và NORMAL
  const toggleSeason = () => {
    if (season === 'SUMMER') {
        setSeason('NORMAL');
    } else {
        setSeason('SUMMER');
    }
  };

  const handleNavClick = (path: string) => {
    navigate(path);
    setIsMenuOpen(false);
  };

  return (
    <>
      {/* --- MAIN NAVBAR --- */}
      <div className="sticky top-0 z-[100] w-full bg-black/80 backdrop-blur-xl border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="flex items-center justify-between h-16 md:h-24">
            
            {/* LOGO AREA */}
            <Link to="/" className="flex items-center gap-3 md:gap-4 cursor-pointer group">
              <Shield className="text-primary group-hover:scale-110 transition-transform duration-500 shrink-0" size={28} />
              <div className="flex flex-col">
                <h1 className="font-serif text-xl md:text-3xl font-black tracking-tighter text-white leading-none">DEEPFENSE</h1>
                <div className="hidden md:flex items-center gap-1.5 mt-1.5">
                    <span className="h-[1px] w-4 bg-primary/40"></span>
                    <span className="font-mono text-[0.6rem] text-primary tracking-[0.4em] uppercase font-bold opacity-60">DEEPFAKE PROTECTION</span>
                </div>
              </div>
            </Link>

            {/* DESKTOP NAV & CONTROLS */}
            <div className="flex items-center gap-2 md:gap-4">
              
              {/* Desktop Menu */}
              <nav className="hidden lg:flex items-center gap-2">
                {navItems.map((item) => (
                  <Link key={item.path} to={item.path}
                    className={`relative flex items-center gap-2 px-3 py-2 rounded-lg text-[10px] font-black font-mono transition-all duration-500 uppercase tracking-widest
                      ${location.pathname === item.path ? 'text-primary bg-primary/5' : 'text-gray-500 hover:text-white'}`}
                  >
                    {item.icon}
                    <span>{item.label}</span>
                    {location.pathname === item.path && <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-8 h-[2px] bg-primary"></span>}
                  </Link>
                ))}
              </nav>

              {/* Controls (Visible on both Mobile & Desktop) */}
              <div className="flex items-center gap-2 md:gap-3 ml-2 md:ml-4">
                 {/* Language Switcher */}
                 <div className="h-8 md:h-9 flex items-center bg-zinc-900 border border-white/10 rounded-full p-1 shadow-inner">
                    <button onClick={() => setLang('vi')} className={`h-full px-2 md:px-3 flex items-center justify-center text-[9px] font-black rounded-full transition-all duration-300 ${lang === 'vi' ? 'bg-primary text-black shadow-md' : 'text-gray-500 hover:text-gray-300'}`}>VI</button>
                    <button onClick={() => setLang('en')} className={`h-full px-2 md:px-3 flex items-center justify-center text-[9px] font-black rounded-full transition-all duration-300 ${lang === 'en' ? 'bg-primary text-black shadow-md' : 'text-gray-500 hover:text-gray-300'}`}>EN</button>
                 </div>

                 {/* Season Switcher - With Long Press Easter Egg */}
                 <button 
                     onClick={toggleSeason}
                     className="relative group outline-none ml-1 select-none touch-manipulation z-50"
                     title={season === 'SUMMER' ? 'Summer Off' : 'Summer On'}
                 >
                     {/* Glow effect for Summer */}
                     <div className={`absolute inset-0 rounded-full blur-md transition-opacity duration-500 ${season === 'SUMMER' ? 'bg-orange-500/50 opacity-100' : 'opacity-0'}`}></div>
                     
                     {/* Main Button */}
                     <div 
                          className={`
                              relative h-8 w-8 md:h-9 md:w-9 rounded-full flex items-center justify-center border shadow-xl transition-all duration-700 ease-[cubic-bezier(0.34,1.56,0.64,1)] z-10
                              ${season === 'SUMMER' 
                                  ? 'bg-gradient-to-br from-orange-400 to-red-500 border-orange-500 rotate-[360deg]' 
                                  : 'bg-zinc-900 border-white/10 rotate-0 hover:border-white/30 hover:bg-zinc-800'}
                          `}
                     >
                         {season === 'SUMMER' ? (
                             <Sun size={16} className="text-yellow-200 drop-shadow-md animate-[spin_10s_linear_infinite]" />
                         ) : (
                             <Power size={16} className="text-gray-500 group-hover:text-gray-300 transition-colors" />
                         )}
                     </div>
                 </button>

                 {/* Mobile Menu Toggle Button */}
                 <button 
                  className="lg:hidden p-2 text-gray-400 hover:text-white"
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                 >
                   {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                 </button>
              </div>
            </div>
          </div>
        </div>

        {/* MOBILE MENU DROPDOWN */}
        {isMenuOpen && (
          <div className="lg:hidden absolute top-full left-0 w-full bg-black/95 backdrop-blur-xl border-b border-white/10 animate-in slide-in-from-top-5 duration-300">
            <div className="flex flex-col p-4 space-y-2">
              {navItems.map((item) => (
                <button key={item.path} onClick={() => handleNavClick(item.path)}
                  className={`flex items-center gap-4 px-4 py-4 rounded-xl text-xs font-black font-mono transition-all uppercase tracking-widest
                    ${location.pathname === item.path ? 'bg-primary/10 text-primary border border-primary/20' : 'text-gray-400 hover:bg-white/5 hover:text-white'}`}
                >
                  {item.icon}
                  {item.label}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Navbar;
