
import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldAlert, Home, Swords, GraduationCap } from 'lucide-react';
import { Language } from '@/types';

interface NotFoundProps {
  lang?: Language;
}

const NotFound: React.FC<NotFoundProps> = ({ lang = 'vi' }) => {
  const isVi = lang === 'vi';

  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4 animate-in fade-in duration-500">
      <div className="mb-6 text-primary/60">
        <ShieldAlert size={80} strokeWidth={1} />
      </div>

      <div className="text-6xl md:text-8xl font-black text-white mb-2 tracking-tighter">
        404
      </div>
      <div className="text-lg md:text-xl font-bold text-primary mb-2 font-mono tracking-[0.12em] uppercase">
        {isVi ? 'Trang không tồn tại' : 'Page Not Found'}
      </div>
      <p className="text-slate-300/85 max-w-md mb-10 text-sm md:text-base">
        {isVi
          ? 'Địa chỉ bạn truy cập không tồn tại hoặc đã bị di chuyển. Hãy quay lại và tiếp tục huấn luyện.'
          : 'The page you requested does not exist or has been moved. Head back and keep training.'}
      </p>

      <div className="flex flex-wrap gap-3 justify-center">
        <Link
          to="/"
          className="flex items-center gap-2 bg-primary text-white font-bold px-5 py-2.5 rounded-lg text-sm hover:bg-blue-500 transition-colors"
        >
          <Home size={15} />
          {isVi ? 'Trang chủ' : 'Home'}
        </Link>
        <Link
          to="/challenge"
          className="flex items-center gap-2 border border-primary/40 text-primary font-bold px-5 py-2.5 rounded-lg text-sm hover:border-primary transition-colors"
        >
          <Swords size={15} />
          {isVi ? 'Thử thách' : 'Challenge'}
        </Link>
        <Link
          to="/academy"
          className="flex items-center gap-2 border border-white/15 text-slate-200 font-bold px-5 py-2.5 rounded-lg text-sm hover:border-primary/60 hover:text-white transition-colors"
        >
          <GraduationCap size={15} />
          Academy
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
