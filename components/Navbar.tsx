
import React, { useState, useRef } from 'react';
import { PageType, Language, Season } from '../types';
import { Shield, Home, Swords, Cpu, Info, Bot, Sun, Menu, X, Power, Heart, Stars, Sparkles } from 'lucide-react';
import { TRANSLATIONS } from '../data';

interface NavbarProps {
  currentPage: PageType;
  setPage: (page: PageType) => void;
  lang: Language;
  setLang: (l: Language) => void;
  season: Season;
  setSeason: (s: Season) => void;
}

const Navbar: React.FC<NavbarProps> = ({ currentPage, setPage, lang, setLang, season, setSeason }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showEasterEgg, setShowEasterEgg] = useState(false);
  
  // Refs cho việc xử lý Long Press
  const timerRef = useRef<any>(null);
  const isLongPress = useRef(false);
  const ignoreClick = useRef(false); // Flag để chặn sự kiện click nếu đã là long press

  const t = TRANSLATIONS[lang];
  
  const navItems: { id: PageType; label: string; icon: React.ReactNode }[] = [
    { id: 'HOME', label: lang === 'vi' ? 'TRANG CHỦ' : 'HOME', icon: <Home size={14} /> },
    { id: 'TOOLS', label: lang === 'vi' ? 'CÔNG CỤ' : 'TOOLS', icon: <Cpu size={14} /> },
    { id: 'CHALLENGE', label: lang === 'vi' ? 'THỬ THÁCH' : 'CHALLENGE', icon: <Swords size={14} /> },
    { id: 'AI_PROJECT', label: lang === 'vi' ? 'DỰ ÁN AI' : 'AI PROJECT', icon: <Bot size={14} /> },
    { id: 'ABOUT_CONTACT', label: lang === 'vi' ? 'VỀ CHÚNG TÔI' : 'ABOUT US', icon: <Info size={14} /> },
  ];

  // Logic chuyển đổi: Chỉ toggle giữa SUMMER và NORMAL
  const toggleSeason = () => {
    if (season === 'SUMMER') {
        setSeason('NORMAL');
    } else {
        setSeason('SUMMER' as any);
    }
  };

  const handleNavClick = (id: PageType) => {
    setPage(id);
    setIsMenuOpen(false); // Đóng menu khi chọn
  };

  // --- LONG PRESS LOGIC FOR EASTER EGG ---
  const startPress = () => {
    isLongPress.current = false;
    ignoreClick.current = false;
    timerRef.current = setTimeout(() => {
        isLongPress.current = true;
        ignoreClick.current = true; // Đánh dấu đây là long press để onClick bỏ qua
        setShowEasterEgg(true);
    }, 1800); // Nhấn giữ 1.8s sẽ kích hoạt
  };

  const endPress = () => {
    if (timerRef.current) {
        clearTimeout(timerRef.current);
    }
    // Không thực hiện toggle ở đây nữa để tránh xung đột touch/mouse
  };

  // Xử lý click: Chỉ chạy nếu không phải là kết quả của việc nhấn giữ
  const handleSeasonClick = (e: React.MouseEvent) => {
      if (ignoreClick.current) {
          // Reset flag và chặn toggle
          ignoreClick.current = false;
          e.preventDefault();
          e.stopPropagation();
          return;
      }
      toggleSeason();
  };

  return (
    <>
      {/* --- EASTER EGG MODAL (DEDICATED TO HUYỀN) --- */}
      {showEasterEgg && (
        <div className="fixed inset-0 z-[200] bg-black/95 backdrop-blur-xl flex items-center justify-center p-4 animate-in fade-in duration-1000">
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                {/* Background stars effect */}
                <div className="absolute top-10 left-10 text-pink-500/20 animate-pulse"><Stars size={40} /></div>
                <div className="absolute bottom-20 right-20 text-purple-500/20 animate-pulse delay-700"><Stars size={60} /></div>
                <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-pink-600/10 rounded-full blur-[100px] animate-pulse"></div>
            </div>

            <div className="relative max-w-md w-full bg-gradient-to-br from-gray-900 to-black border border-pink-500/30 rounded-3xl p-8 text-center shadow-[0_0_50px_rgba(236,72,153,0.3)] flex flex-col items-center">
                <button 
                    onClick={() => setShowEasterEgg(false)}
                    className="absolute top-4 right-4 text-gray-500 hover:text-white transition-colors"
                >
                    <X size={24} />
                </button>

                <div className="mb-6 relative">
                    <div className="absolute inset-0 bg-pink-500 blur-xl opacity-50 rounded-full animate-pulse"></div>
                    <Heart size={64} className="text-pink-500 relative z-10 fill-pink-500/20" />
                    <Sparkles size={24} className="text-yellow-200 absolute -top-2 -right-2 animate-spin-slow" />
                </div>

                <h2 className="text-3xl font-serif font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-purple-400 mb-2">
                    Gửi Huyền
                </h2>
                <div className="h-0.5 w-12 bg-pink-500/50 mx-auto mb-6"></div>

                <p className="text-gray-300 font-sans italic leading-relaxed mb-6 text-sm md:text-base">
                    "Cảm ơn cậu vì đã luôn ở bên cạnh, tiếp thêm động lực để mình hoàn thiện sản phẩm này. <br/><br/>
                    Dù là những việc ấy đối với cậu là nhỏ, nhưng tất cả đều trở nên ý nghĩa hơn khi có sự ủng hộ của cậu."
                </p>

                <div className="text-[10px] text-pink-400/60 uppercase tracking-[0.3em] font-mono">
                    SPECIAL THANKS TO YOU
                </div>
            </div>
        </div>
      )}

      {/* --- MAIN NAVBAR --- */}
      <div className="sticky top-0 z-[100] w-full bg-black/80 backdrop-blur-xl border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="flex items-center justify-between h-16 md:h-24">
            
            {/* LOGO AREA */}
            <div className="flex items-center gap-3 md:gap-4 cursor-pointer group" onClick={() => setPage('HOME')}>
              <Shield className="text-primary group-hover:scale-110 transition-transform duration-500 shrink-0" size={28} />
              <div className="flex flex-col">
                <h1 className="font-serif text-xl md:text-3xl font-black tracking-tighter text-white leading-none">DEEPFENSE</h1>
                <div className="hidden md:flex items-center gap-1.5 mt-1.5">
                    <span className="h-[1px] w-4 bg-primary/40"></span>
                    <span className="font-mono text-[0.6rem] text-primary tracking-[0.4em] uppercase font-bold opacity-60">DEEPFAKE PROTECTION</span>
                </div>
              </div>
            </div>

            {/* DESKTOP NAV & CONTROLS */}
            <div className="flex items-center gap-2 md:gap-4">
              
              {/* Desktop Menu */}
              <nav className="hidden lg:flex items-center gap-2">
                {navItems.map((item) => (
                  <button key={item.id} onClick={() => setPage(item.id)}
                    className={`relative flex items-center gap-2 px-3 py-2 rounded-lg text-[10px] font-black font-mono transition-all duration-500 uppercase tracking-widest
                      ${currentPage === item.id ? 'text-primary bg-primary/5' : 'text-gray-500 hover:text-white'}`}
                  >
                    {item.icon}
                    <span>{item.label}</span>
                    {currentPage === item.id && <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-8 h-[2px] bg-primary"></span>}
                  </button>
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
                     onMouseDown={startPress}
                     onMouseUp={endPress}
                     onMouseLeave={endPress}
                     onTouchStart={startPress}
                     onTouchEnd={endPress}
                     onClick={handleSeasonClick}
                     onContextMenu={(e) => e.preventDefault()} // Ngăn menu chuột phải trên mobile khi nhấn giữ
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
                <button key={item.id} onClick={() => handleNavClick(item.id)}
                  className={`flex items-center gap-4 px-4 py-4 rounded-xl text-xs font-black font-mono transition-all uppercase tracking-widest
                    ${currentPage === item.id ? 'bg-primary/10 text-primary border border-primary/20' : 'text-gray-400 hover:bg-white/5 hover:text-white'}`}
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
