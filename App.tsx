
import React, { useState, Suspense, lazy, useEffect } from 'react';
import Navbar from './components/Navbar';
import MatrixBackground from './components/MatrixBackground';
import SummerEffects from './components/SummerEffects';
import AiChat from './components/AiChat';
import { PageType, Language, Season } from './types';
import { TRANSLATIONS, PROJECT_METADATA } from './data';
import { Shield } from 'lucide-react';
import SEO from './components/SEO';

// Lazy loading các trang để giảm tải ban đầu
const Home = lazy(() => import('./pages/Home'));
const Challenge = lazy(() => import('./pages/Challenge'));
const Tools = lazy(() => import('./pages/Tools'));
const AboutContact = lazy(() => import('./pages/AboutContact'));
const AiComingSoon = lazy(() => import('./pages/AiComingSoon'));
const Admin = lazy(() => import('./pages/Admin'));

const LoadingFallback = () => (
  <div className="flex items-center justify-center min-h-[60vh]">
    <div className="flex flex-col items-center gap-4">
       <Shield className="text-primary animate-pulse" size={48} />
       <div className="text-primary font-mono text-xs tracking-widest uppercase">Initializing System...</div>
    </div>
  </div>
);

const App: React.FC = () => {
  const [page, setPage] = useState<PageType>('HOME');
  const [lang, setLang] = useState<Language>('vi');
  const [season, setSeason] = useState<any>('SUMMER'); 
  const [toolTab, setToolTab] = useState<'SCAN' | 'KNOWLEDGE'>('SCAN');
  const t = TRANSLATIONS[lang];

  // --- DIGITAL SIGNATURE (CONSOLE WATERMARK) ---
  // Khi giáo viên mở Console (F12), họ sẽ thấy thông tin bản quyền này.
  useEffect(() => {
    console.clear();
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

  const renderPage = () => {
    switch (page) {
      case 'HOME': return <Home setPage={setPage} setToolTab={setToolTab} lang={lang} season={season} />;
      case 'TOOLS': return <Tools initialTab={toolTab} lang={lang} />;
      case 'CHALLENGE': return <Challenge lang={lang} />;
      case 'AI_PROJECT': return <AiComingSoon lang={lang} />;
      case 'ABOUT_CONTACT': return <AboutContact lang={lang} />;
      case 'ADMIN' as any: return <Admin />; 
      default: return <Home setPage={setPage} setToolTab={setToolTab} lang={lang} season={season} />;
    }
  };

  // Tiêu đề động tùy theo trang đang mở
  const getPageTitle = () => {
    switch (page) {
      case 'HOME': return lang === 'vi' ? 'Trang chủ' : 'Home';
      case 'TOOLS': return lang === 'vi' ? 'Hệ thống Quét Rủi Ro' : 'Risk Scanner';
      case 'CHALLENGE': return lang === 'vi' ? 'Thử thách Thám tử' : 'Detective Challenge';
      case 'AI_PROJECT': return lang === 'vi' ? 'Dự án AI Deepfense' : 'AI Project';
      case 'ABOUT_CONTACT': return lang === 'vi' ? 'Liên hệ & Báo cáo' : 'Contact & Report';
      default: return '';
    }
  };

  return (
    <div className="min-h-screen flex flex-col font-sans selection:bg-primary/30 selection:text-white relative bg-[#050505]">
      <SEO title={getPageTitle()} lang={lang} />

      <MatrixBackground />
      {/* Chỉ hiện hiệu ứng Hè khi là mùa Hè và ở trang chủ */}
      {page === 'HOME' && season === 'SUMMER' && <SummerEffects />}
      
      <Navbar 
        currentPage={page} 
        setPage={setPage} 
        lang={lang} 
        setLang={setLang} 
        season={season}
        setSeason={setSeason}
      />
      
      <main className="flex-grow container mx-auto px-4 py-8 md:py-12 max-w-7xl z-10">
        <Suspense fallback={<LoadingFallback />}>
            {renderPage()}
        </Suspense>
      </main>
      
      <AiChat lang={lang} />
      
      <footer className="border-t border-white/5 py-12 mt-12 bg-black/80 text-center z-10 backdrop-blur-md relative overflow-hidden">
        <div className="font-serif font-black tracking-widest text-2xl text-white/10 mb-2 italic">DEEPFENSE</div>
        <div className="text-[10px] text-gray-600 uppercase tracking-[0.3em] mb-4 font-mono leading-loose">
            DEEPFENSE FINAL VER | PROJECT 2025<br/>
            NEURAL DEFENSE PROTOCOL ACTIVE
        </div>
        <div className="text-[9px] text-gray-700 font-mono flex flex-col items-center gap-2">
            <button onClick={() => setPage('ADMIN' as any)} className="hover:text-primary transition-colors opacity-50 hover:opacity-100">
               [ SYSTEM_ADMIN_ACCESS ]
            </button>
            © 2025 DEEPFENSE. Developed by Ho Xuan Nguyen (25NS039).<br/>
            {PROJECT_METADATA.license}
        </div>
      </footer>
    </div>
  );
};

export default App;
