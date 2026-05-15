/**
 * DEEPFENSE.ONLINE - Footer v3.0
 * Complete project footer for training, support, attribution, and trust.
 * @copyright 2025 Hồ Xuân Nguyễn & VKU Project Team
 */

import React from 'react';
import { Link } from 'react-router-dom';
import {
  AlertTriangle,
  BookOpen,
  Bot,
  ChevronRight,
  ExternalLink,
  GraduationCap,
  Mail,
  MapPin,
  Scale,
  ShieldCheck,
  Swords,
  Lock,
  FileText,
} from 'lucide-react';
import { PROJECT_METADATA } from '@/data';
import { Language } from '@/types';

interface FooterProps {
  lang: Language;
}

const Footer: React.FC<FooterProps> = ({ lang }) => {
  const isVi = lang === 'vi';

  const trainingLinks = [
    { path: '/challenge', label: isVi ? 'Thử thách Thám tử' : 'Detective Challenge', icon: <Swords size={13} /> },
    { path: '/tools/knowledge', label: isVi ? 'Kiến thức & Pháp luật' : 'Knowledge & Law', icon: <BookOpen size={13} /> },
    { path: '/tools/scan', label: isVi ? 'Quét rủi ro' : 'Risk Scanner', icon: <ShieldCheck size={13} /> },
    { path: '/ai-project', label: isVi ? 'Trợ lý AI' : 'AI Assistant', icon: <Bot size={13} /> },
  ];

  const supportLinks = [
    { path: '/tools/crisis', label: isVi ? 'Trung tâm ứng cứu' : 'Crisis Hub', icon: <AlertTriangle size={13} /> },
    { path: '/contact', label: isVi ? 'Liên hệ nhóm dự án' : 'Contact Project Team', icon: <Mail size={13} /> },
    { path: 'https://amoy.polygonscan.com/address/0xFB5605c397257267C6E90C6224D5F4826A4A742D#code', label: isVi ? 'DPF coin contract verified' : 'Verified DPF coin contract', icon: <ShieldCheck size={13} />, external: true },
    { path: 'https://deepfense.online', label: 'deepfense.online', icon: <ExternalLink size={13} />, external: true },
  ];

  const legalLinks = [
    { path: '/privacy', label: isVi ? 'Chính sách bảo mật' : 'Privacy Policy', icon: <Lock size={13} /> },
    { path: '/terms', label: isVi ? 'Điều khoản sử dụng' : 'Terms of Use', icon: <Scale size={13} /> },
    { path: '/policy#help-center', label: isVi ? 'Chính sách Help Center' : 'Help Center Policy', icon: <ShieldCheck size={13} /> },
    { path: '/policy#retention', label: isVi ? 'Lưu trữ dữ liệu' : 'Data Retention', icon: <FileText size={13} /> },
  ];

  const renderLink = (item: typeof trainingLinks[number] | typeof supportLinks[number] | typeof legalLinks[number]) => {
    const className = 'group flex items-center justify-between gap-3 py-1.5 text-xs text-gray-500 transition-colors hover:text-[#60A5FA]';
    const content = (
      <>
        <span className="flex items-center gap-2">
          <span className="text-gray-700 transition-colors group-hover:text-[#60A5FA]">{item.icon}</span>
          {item.label}
        </span>
        {'external' in item && item.external ? (
          <ExternalLink size={11} className="opacity-50" />
        ) : (
          <ChevronRight size={12} className="opacity-0 transition-all group-hover:translate-x-1 group-hover:opacity-100" />
        )}
      </>
    );

    if ('external' in item && item.external) {
      return <a key={item.path} href={item.path} target="_blank" rel="noopener noreferrer" className={className}>{content}</a>;
    }

    return <Link key={item.path} to={item.path} className={className}>{content}</Link>;
  };

  return (
    <footer className="relative z-10 mt-20 overflow-hidden border-t border-[#1E3A5F]/40 bg-[#020710]/95 backdrop-blur-xl">
      <div className="absolute left-0 top-0 h-px w-full bg-gradient-to-r from-transparent via-[#1D6FE8]/50 to-transparent" />
      <div className="absolute -left-24 top-10 h-64 w-64 rounded-full bg-[#1D6FE8]/5 blur-3xl" />
      <div className="absolute -right-24 bottom-0 h-72 w-72 rounded-full bg-[#FF2A6D]/5 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-4 py-12 md:px-6 md:py-14">
        <div className="grid grid-cols-1 gap-9 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <Link to="/" className="mb-5 inline-flex items-center gap-3 group">
              <div className="relative h-12 w-12">
                <div className="absolute inset-0 rounded-2xl bg-[#1D6FE8]/20 blur-md opacity-70 transition-opacity duration-300 group-hover:opacity-100" />
                <img src="/logo/android-chrome-192x192.png" alt="DEEPFENSE" className="relative h-full w-full rounded-2xl object-contain" />
              </div>
              <div>
                <div className="font-black text-2xl tracking-tight text-white" style={{ fontFamily: "'Outfit', 'Inter', Arial, 'Helvetica Neue', sans-serif" }}>
                  DEEPFENSE
                </div>
                <div className="font-mono text-[9px] font-bold uppercase tracking-[0.24em] text-[#60A5FA]/55">
                  DEEPFAKE - DEFENSE
                </div>
              </div>
            </Link>

            <p className="max-w-2xl text-sm leading-relaxed text-gray-400 md:text-justify">
              {isVi
                ? 'DEEPFENSE là nền tảng huấn luyện nhận diện deepfake và tự vệ trước lừa đảo AI, tập trung vào học qua thử thách, mô phỏng tình huống, phản hồi tức thì và chứng nhận năng lực số cho cộng đồng học sinh, sinh viên.'
                : 'DEEPFENSE is a gamified deepfake awareness and AI scam defense training platform focused on challenges, scenario simulation, instant feedback, and digital-safety certification for learners.'}
            </p>

            <div className="mt-6 rounded-2xl border border-white/10 bg-white/[0.025] p-5">
              <div className="grid gap-4 md:grid-cols-3">
                <div>
                  <div className="font-mono text-[10px] font-black uppercase tracking-widest text-[#60A5FA]">Core</div>
                  <div className="mt-1 text-xs leading-relaxed text-gray-500">
                    {isVi ? 'Gamification và huấn luyện người dùng.' : 'Gamification and user training.'}
                  </div>
                </div>
                <div>
                  <div className="font-mono text-[10px] font-black uppercase tracking-widest text-[#60A5FA]">Academy</div>
                  <div className="mt-1 text-xs leading-relaxed text-gray-500">
                    {isVi ? 'Lộ trình học, quiz, chứng nhận.' : 'Learning path, quizzes, certificates.'}
                  </div>
                </div>
                <div>
                  <div className="font-mono text-[10px] font-black uppercase tracking-widest text-[#60A5FA]">Trust</div>
                  <div className="mt-1 text-xs leading-relaxed text-gray-500">
                    {isVi ? 'Minh bạch dữ liệu và hỗ trợ ứng cứu.' : 'Transparent data and response support.'}
                  </div>
                </div>
              </div>
              
              {/* VKU Attribution */}
              <div className="mt-5 pt-4 border-t border-white/5 flex items-center gap-3">
                <div className="h-8 w-8 rounded-lg bg-white/10 flex items-center justify-center p-1.5 overflow-hidden">
                   <img src="https://vku.udn.vn/vku-logo.png" alt="VKU" className="h-full w-full object-contain opacity-80" onError={(e) => { (e.target as any).src = "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Logo_VKU.png/800px-Logo_VKU.png"; }} />
                </div>
                <div className="text-[11px] font-bold tracking-wider text-gray-400 uppercase">
                  {isVi ? 'Sản phẩm sinh viên trường Đại học Công nghệ thông tin và Truyền thông Việt - Hàn (VKU)' : 'Student product at Vietnam-Korea University of Information and Communication Technology (VKU)'}
                </div>
              </div>
            </div>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:col-span-4">
            <div>
              <h3 className="mb-4 font-mono text-[10px] font-black uppercase tracking-[0.22em] text-[#60A5FA]/70">
                {isVi ? 'Luyện tập' : 'Train'}
              </h3>
              <div className="flex flex-col gap-3">{trainingLinks.map(renderLink)}</div>
            </div>

            <div>
              <h3 className="mb-4 font-mono text-[10px] font-black uppercase tracking-[0.22em] text-[#60A5FA]/70">
                {isVi ? 'Hỗ trợ' : 'Support'}
              </h3>
              <div className="flex flex-col gap-3">{supportLinks.map(renderLink)}</div>
            </div>

            <div className="md:col-span-2">
              <h3 className="mb-4 font-mono text-[10px] font-black uppercase tracking-[0.22em] text-[#60A5FA]/70">
                {isVi ? 'Pháp lý & tin cậy' : 'Legal & Trust'}
              </h3>
              <div className="grid grid-cols-1 gap-x-8 gap-y-3 md:grid-cols-2">
                {legalLinks.map(renderLink)}
              </div>
            </div>
          </div>

          <div className="lg:col-span-3">
            <div>
              <h3 className="mb-4 font-mono text-[10px] font-black uppercase tracking-[0.22em] text-[#60A5FA]/70">
                {isVi ? 'Dự án' : 'Project'}
              </h3>
              <div className="space-y-3">
                <div className="flex items-start gap-3 text-xs leading-relaxed text-gray-500">
                  <GraduationCap className="mt-0.5 shrink-0 text-[#60A5FA]" size={15} />
                  <span>25NS - VKU, Da Nang, Viet Nam</span>
                </div>
                <div className="flex items-start gap-3 text-xs leading-relaxed text-gray-500">
                  <MapPin className="mt-0.5 shrink-0 text-[#60A5FA]" size={15} />
                  <span>{PROJECT_METADATA.university}</span>
                </div>
                <a href={`mailto:${PROJECT_METADATA.email}`} className="flex items-start gap-3 text-xs leading-relaxed text-gray-500 transition-colors hover:text-[#60A5FA]">
                  <Mail className="mt-0.5 shrink-0 text-[#60A5FA]" size={15} />
                  <span>{PROJECT_METADATA.email}</span>
                </a>
                <div className="flex items-start gap-3 text-xs leading-relaxed text-gray-500">
                  <Scale className="mt-0.5 shrink-0 text-[#60A5FA]" size={15} />
                  <span>{isVi ? 'Phục vụ học tập, nghiên cứu và nâng cao nhận thức cộng đồng.' : 'Built for learning, research, and public awareness.'}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-10 border-t border-[#1E3A5F]/30 pt-6">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="text-[10px] leading-relaxed text-gray-700 font-mono">
              © 2025 DEEPFENSE · {isVi ? 'Nhóm dự án VKU (Nguyễn, Huy, Pháp, Nhất)' : 'VKU Project Team (Nguyen, Huy, Phap, Nhat)'}. {isVi ? 'Bảo lưu mọi quyền.' : 'All rights reserved.'}
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <span className="inline-flex items-center gap-2 rounded-full border border-green-500/15 bg-green-500/5 px-3 py-1.5 font-mono text-[9px] font-bold uppercase tracking-widest text-green-400/70">
                <span className="h-1.5 w-1.5 rounded-full bg-green-400 animate-pulse" />
                System Online
              </span>
              <Link to="/admin" className="font-mono text-[9px] uppercase tracking-widest text-gray-800 transition-colors hover:text-[#1D6FE8]">
                System Admin
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
