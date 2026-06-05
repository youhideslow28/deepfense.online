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
      <div className="glass-dark group relative overflow-hidden rounded-2xl border border-blue-500/30 p-6 shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
        {/* Animated background glow */}
        <div className="absolute -right-10 -top-10 w-32 h-32 bg-blue-500/10 rounded-full blur-3xl group-hover:bg-blue-500/20 transition-colors" />
        
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400">
              <Shield size={20} />
            </div>
            <div>
              <h3 className="text-sm font-black uppercase tracking-[0.12em] text-white">
                {isVi ? 'QUYỀN RIÊNG TƯ' : 'PRIVACY PREFERENCE'}
              </h3>
              <p className="font-mono text-[10px] uppercase tracking-[0.08em] text-blue-300">
                {isVi ? 'BẢO VỆ DỮ LIỆU CỦA BẠN' : 'PROTECTING YOUR DATA'}
              </p>
            </div>
            <button 
              onClick={() => setIsVisible(false)}
              className="ml-auto rounded-lg p-1.5 text-slate-400 transition-colors hover:bg-white/5 hover:text-white"
            >
              <X size={16} />
            </button>
          </div>

          <p className="mb-6 text-xs leading-relaxed text-slate-300/85">
            {isVi 
              ? 'Deepfense sử dụng cookie để tối ưu hóa trải nghiệm học tập, lưu tiến độ và bảo mật tài khoản. Bạn có đồng ý cho phép chúng tôi sử dụng cookie không?' 
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
              {isVi ? 'ĐỒNG Ý TẤT CẢ' : 'ACCEPT ALL'}
            </GlowButton>
            <button 
              onClick={() => handleConsent(false)}
              className="flex w-full items-center justify-center gap-2 rounded-xl border border-white/10 py-2.5 text-[10px] font-black uppercase tracking-[0.12em] text-slate-400 transition-all hover:bg-white/5 hover:text-slate-200"
            >
              <Info size={12} />
              {isVi ? 'TÙY CHỈNH / TỪ CHỐI' : 'CUSTOMIZE / DECLINE'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CookieConsent;
