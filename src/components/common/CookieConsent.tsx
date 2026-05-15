import React, { useState, useEffect } from 'react';
import { Shield, X, Check, Info } from 'lucide-react';
import GlowButton from '../ui/GlowButton';

interface CookieConsentProps {
  lang: 'vi' | 'en';
}

const CookieConsent: React.FC<CookieConsentProps> = ({ lang }) => {
  const [isVisible, setIsVisible] = useState(false);
  const isVi = lang === 'vi';

  useEffect(() => {
    const consent = localStorage.getItem('deepfense_cookie_consent');
    if (!consent) {
      // Show after a short delay for better UX
      const timer = setTimeout(() => setIsVisible(true), 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleConsent = (accepted: boolean) => {
    localStorage.setItem('deepfense_cookie_consent', accepted ? 'accepted' : 'declined');
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-6 right-6 z-[9999] max-w-sm w-full animate-in slide-in-from-right-10 duration-500">
      <div className="glass-dark border border-blue-500/30 rounded-2xl p-6 shadow-[0_20px_50px_rgba(0,0,0,0.5)] relative overflow-hidden group">
        {/* Animated background glow */}
        <div className="absolute -right-10 -top-10 w-32 h-32 bg-blue-500/10 rounded-full blur-3xl group-hover:bg-blue-500/20 transition-colors" />
        
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400">
              <Shield size={20} />
            </div>
            <div>
              <h3 className="text-white font-black uppercase tracking-widest text-sm italic">
                {isVi ? 'QUYá»€N RIÃŠNG TÆ¯' : 'PRIVACY PREFERENCE'}
              </h3>
              <p className="text-[10px] text-blue-400 font-mono uppercase tracking-tighter">
                {isVi ? 'Báº¢O Vá»† Dá»® LIá»†U Cá»¦A Báº N' : 'PROTECTING YOUR DATA'}
              </p>
            </div>
            <button 
              onClick={() => setIsVisible(false)}
              className="ml-auto p-1.5 rounded-lg hover:bg-white/5 text-gray-500 hover:text-white transition-colors"
            >
              <X size={16} />
            </button>
          </div>

          <p className="text-gray-400 text-xs leading-relaxed mb-6 italic">
            {isVi 
              ? 'Deepfense sá»­ dá»¥ng cookie Ä‘á»ƒ tá»‘i Æ°u hÃ³a tráº£i nghiá»‡m há»c táº­p, lÆ°u tiáº¿n Ä‘á»™ vÃ  báº£o máº­t tÃ i khoáº£n. Báº¡n cÃ³ Ä‘á»“ng Ã½ cho phÃ©p chÃºng tÃ´i sá»­ dá»¥ng cookie khÃ´ng?' 
              : 'Deepfense uses cookies to optimize your learning experience, save progress, and secure your account. Do you agree to allow us to use cookies?'}
          </p>

          <div className="flex flex-col gap-2">
            <GlowButton 
              color="primary" 
              size="sm" 
              className="w-full justify-center"
              icon={<Check size={14} />}
              onClick={() => handleConsent(true)}
            >
              {isVi ? 'Äá»’NG Ã Táº¤T Cáº¢' : 'ACCEPT ALL'}
            </GlowButton>
            <button 
              onClick={() => handleConsent(false)}
              className="w-full py-2.5 rounded-xl border border-white/5 text-gray-500 text-[10px] font-black uppercase tracking-widest hover:bg-white/5 hover:text-gray-300 transition-all flex items-center justify-center gap-2"
            >
              <Info size={12} />
              {isVi ? 'TÃ™Y CHá»ˆNH / Tá»ª CHá»I' : 'CUSTOMIZE / DECLINE'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CookieConsent;
