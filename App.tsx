
import React, { useState, Suspense, lazy, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, useNavigate, Link } from 'react-router-dom';
import Navbar from './components/Navbar';
import MatrixBackground from './components/MatrixBackground';
import SummerEffects from './components/SummerEffects';
import AiChat from './components/AiChat';
import { Language, Season } from './types';
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

// --- THÊM NGAY CÁI ERROR BOUNDARY VÀO ĐỂ CỨU APP KHỎI CRASH KHI LAZY LOAD LỖI ---
class ErrorBoundary extends React.Component<{children: React.ReactNode}, {hasError: boolean, errorMsg: string, isChunkError: boolean}> {
  constructor(props: {children: React.ReactNode}) {
    super(props);
    this.state = { hasError: false, errorMsg: '', isChunkError: false };
  }
  static getDerivedStateFromError(error: Error) {
    // Phân biệt rõ giữa lỗi tải mạng (Chunk) và lỗi sập code (Crash)
    const isChunkError = error.name === 'ChunkLoadError' || error.message.includes('dynamically imported module');
    return { hasError: true, errorMsg: error.message, isChunkError };
  }
  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error("🔥 REACT FATAL ERROR CAUGHT:", error, errorInfo);
    
    // Tự động tải lại trang nếu lỗi là do Chunk Load Failed (thường do cập nhật phiên bản mới)
    if (this.state.isChunkError) {
      // Dùng sessionStorage để tránh lặp vô tận nếu thực sự file bị lỗi 404 vĩnh viễn
      const reloadCount = parseInt(sessionStorage.getItem('chunk_reload_count') || '0', 10);
      if (reloadCount < 1) {
        sessionStorage.setItem('chunk_reload_count', '1');
        window.location.reload();
      }
    }
  }
  render() {
    if (this.state.hasError) {
      return (
        <div className="flex flex-col items-center justify-center py-20 font-mono text-center px-4 animate-in fade-in">
          <div className="text-red-500 text-xl font-bold mb-4">
            {this.state.isChunkError ? "⚠️ LỖI ĐỒNG BỘ PHIÊN BẢN" : "⚠️ ĐÃ XẢY RA LỖI HỆ THỐNG (CRASH)"}
          </div>
          <p className="text-gray-400 text-sm mb-8 max-w-md">
            {this.state.isChunkError 
              ? "Hệ thống vừa nhận được một bản cập nhật mới hoặc kết nối mạng của bạn bị gián đoạn. Vui lòng tải lại trang để tiếp tục." 
              : `Chi tiết lỗi: ${this.state.errorMsg}`}
          </p>
          <button 
            onClick={() => { sessionStorage.removeItem('chunk_reload_count'); window.location.reload(); }}
            className="bg-primary text-black px-8 py-3 rounded-xl font-bold uppercase tracking-widest hover:bg-white transition-colors"
          >
            TẢI LẠI TRANG
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}

const LoadingFallback = () => (
  <div className="flex items-center justify-center min-h-[60vh]">
    <div className="flex flex-col items-center gap-4">
       <Shield className="text-primary animate-pulse" size={48} />
       <div className="text-primary font-mono text-xs tracking-widest uppercase">Initializing System...</div>
    </div>
  </div>
);

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
  const [season, setSeason] = useState<Season>('SUMMER'); // Bỏ ngay cái <any> vô học này đi!
  const t = TRANSLATIONS[lang];
  const location = useLocation();

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
      case '/tools': return lang === 'vi' ? 'Hệ thống Quét Rủi Ro' : 'Risk Scanner';
      case '/challenge': return lang === 'vi' ? 'Thử thách Thám tử' : 'Detective Challenge';
      case '/ai-project': return lang === 'vi' ? 'Dự án AI Deepfense' : 'AI Project';
      case '/contact': return lang === 'vi' ? 'Liên hệ & Báo cáo' : 'Contact & Report';
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

  return (
    <div className="min-h-screen flex flex-col font-sans selection:bg-primary/30 selection:text-white relative bg-[#050505]">
      <SEO title={getPageTitle()} lang={lang} />

      <ScrollToTop />
      <MatrixBackground />
      {/* Chỉ hiện hiệu ứng Hè khi là mùa Hè và ở trang chủ */}
      {location.pathname === '/' && season === 'SUMMER' && <SummerEffects />}
      
      <Navbar 
        lang={lang} 
        setLang={setLang} 
        season={season}
        setSeason={setSeason}
      />
      
      <main className="flex-grow container mx-auto px-4 py-8 md:py-12 max-w-7xl z-10">
        <ErrorBoundary>
          <Suspense fallback={<LoadingFallback />}>
              <Routes>
                <Route path="/" element={<Home lang={lang} season={season} />} />
                <Route path="/tools/:tab?" element={<Tools lang={lang} />} />
                <Route path="/challenge" element={<Challenge lang={lang} />} />
                <Route path="/ai-project" element={<AiComingSoon lang={lang} />} />
                <Route path="/contact" element={<AboutContact lang={lang} />} />
                <Route path="/admin" element={<Admin />} />
                <Route path="*" element={<Home lang={lang} season={season} />} />
              </Routes>
          </Suspense>
        </ErrorBoundary>
      </main>
      
      <AiChat lang={lang} />
      
      <footer className="border-t border-white/5 py-12 mt-12 bg-black/80 text-center z-10 backdrop-blur-md relative overflow-hidden">
        <div className="font-serif font-black tracking-widest text-2xl text-white/10 mb-2 italic">DEEPFENSE</div>
        <div className="text-[9px] text-gray-700 font-mono flex flex-col items-center gap-2">
            <Link to="/admin" className="hover:text-primary transition-colors opacity-50 hover:opacity-100">
               [ SYSTEM_ADMIN_ACCESS ]
            </Link>
            © 2025 DEEPFENSE. Developed by Ho Xuan Nguyen (25NS039).<br/>
            {PROJECT_METADATA.license}
        </div>
      </footer>
    </div>
  );
};

const App: React.FC = () => (
  <Router>
    <AppContent />
  </Router>
);

export default App;
