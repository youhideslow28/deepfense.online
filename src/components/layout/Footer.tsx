/**
 * DEEPFENSE.ONLINE — Footer v3.0
 * Complete project footer for training, support, attribution, and trust.
 * @copyright 2025 Ho Xuan Nguyen (25NS039)
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
  Shield,
  ShieldCheck,
  Swords,
  Trophy,
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

  return (
    <footer className="relative z-10 mt-20 overflow-hidden border-t border-[#1E3A5F]/40 bg-[#020710]/95 backdrop-blur-xl">
      <div className="absolute left-0 top-0 h-px w-full bg-gradient-to-r from-transparent via-[#1D6FE8]/50 to-transparent" />
      <div className="absolute -left-24 top-10 h-64 w-64 rounded-full bg-[#1D6FE8]/5 blur-3xl" />
      <div className="absolute -right-24 bottom-0 h-72 w-72 rounded-full bg-[#FF2A6D]/5 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-4 py-12 md:px-6 md:py-14">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Link to="/" className="mb-5 inline-flex items-center gap-3 group">
              <div className="relative flex h-11 w-11 items-center justify-center rounded-2xl border border-[#1D6FE8]/25 bg-[#1D6FE8]/10">
                <Shield className="text-[#60A5FA] transition-transform duration-300 group-hover:scale-110" size={23} />
              </div>
              <div>
                <div className="font-black text-2xl tracking-tight text-white" style={{ fontFamily: "'Outfit', 'Inter', Arial, 'Helvetica Neue', sans-serif" }}>
                  DEEPFENSE
                </div>
                <div className="font-mono text-[9px] font-bold uppercase tracking-[0.28em] text-[#60A5FA]/45">
                  {PROJECT_METADATA.version}
                </div>
              </div>
            </Link>

            <p className="max-w-md text-sm leading-relaxed text-gray-400">
              {isVi
                ? 'Nền tảng huấn luyện nhận diện deepfake và tự vệ trước lừa đảo AI, xây dựng cho mục tiêu giáo dục cộng đồng thông qua gamification, mô phỏng và phản hồi tức thì.'
                : 'A gamified deepfake awareness and AI scam defense training platform built for community education through challenges, simulations, and instant feedback.'}
            </p>

            <div className="mt-6 grid grid-cols-2 gap-3 max-w-md">
              <div className="rounded-2xl border border-white/5 bg-white/[0.025] p-4">
                <div className="flex items-center gap-2 text-[#60A5FA]">
                  <Trophy size={15} />
                  <span className="font-mono text-[10px] font-black uppercase tracking-widest">
                    {isVi ? 'Huấn luyện' : 'Training'}
                  </span>
                </div>
                <div className="mt-2 text-xs leading-relaxed text-gray-500">
                  {isVi ? 'Thử thách, điểm số, phản hồi.' : 'Challenges, scores, feedback.'}
                </div>
              </div>
              <div className="rounded-2xl border border-white/5 bg-white/[0.025] p-4">
                <div className="flex items-center gap-2 text-green-400">
                  <ShieldCheck size={15} />
                  <span className="font-mono text-[10px] font-black uppercase tracking-widest">
                    {isVi ? 'Phòng vệ' : 'Defense'}
                  </span>
                </div>
                <div className="mt-2 text-xs leading-relaxed text-gray-500">
                  {isVi ? 'Xác minh, báo cáo, ứng cứu.' : 'Verify, report, respond.'}
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-2">
            <h3 className="mb-4 font-mono text-[10px] font-black uppercase tracking-[0.22em] text-[#60A5FA]/70">
              {isVi ? 'Luyện tập' : 'Train'}
            </h3>
            <div className="flex flex-col gap-3">
              {trainingLinks.map((item) => (
                <Link key={item.path} to={item.path} className="group flex items-center justify-between rounded-xl border border-transparent py-1.5 text-xs text-gray-500 transition-colors hover:text-[#60A5FA]">
                  <span className="flex items-center gap-2">
                    <span className="text-gray-700 transition-colors group-hover:text-[#60A5FA]">{item.icon}</span>
                    {item.label}
                  </span>
                  <ChevronRight size={12} className="opacity-0 transition-all group-hover:translate-x-1 group-hover:opacity-100" />
                </Link>
              ))}
            </div>
          </div>

          <div className="lg:col-span-2">
            <h3 className="mb-4 font-mono text-[10px] font-black uppercase tracking-[0.22em] text-[#60A5FA]/70">
              {isVi ? 'Hỗ trợ' : 'Support'}
            </h3>
            <div className="flex flex-col gap-3">
              {supportLinks.map((item) => (
                item.external ? (
                  <a key={item.path} href={item.path} target="_blank" rel="noopener noreferrer" className="group flex items-center justify-between py-1.5 text-xs text-gray-500 transition-colors hover:text-[#60A5FA]">
                    <span className="flex items-center gap-2">
                      <span className="text-gray-700 transition-colors group-hover:text-[#60A5FA]">{item.icon}</span>
                      {item.label}
                    </span>
                    <ExternalLink size={11} className="opacity-50" />
                  </a>
                ) : (
                  <Link key={item.path} to={item.path} className="group flex items-center justify-between py-1.5 text-xs text-gray-500 transition-colors hover:text-[#60A5FA]">
                    <span className="flex items-center gap-2">
                      <span className="text-gray-700 transition-colors group-hover:text-[#60A5FA]">{item.icon}</span>
                      {item.label}
                    </span>
                    <ChevronRight size={12} className="opacity-0 transition-all group-hover:translate-x-1 group-hover:opacity-100" />
                  </Link>
                )
              ))}
            </div>
          </div>

          <div className="lg:col-span-2">
            <h3 className="mb-4 font-mono text-[10px] font-black uppercase tracking-[0.22em] text-[#60A5FA]/70">
              {isVi ? 'Pháp lý & tin cậy' : 'Legal & Trust'}
            </h3>
            <div className="flex flex-col gap-3">
              {legalLinks.map((item) => (
                <Link key={item.path} to={item.path} className="group flex items-center justify-between py-1.5 text-xs text-gray-500 transition-colors hover:text-[#60A5FA]">
                  <span className="flex items-center gap-2">
                    <span className="text-gray-700 transition-colors group-hover:text-[#60A5FA]">{item.icon}</span>
                    {item.label}
                  </span>
                  <ChevronRight size={12} className="opacity-0 transition-all group-hover:translate-x-1 group-hover:opacity-100" />
                </Link>
              ))}
            </div>
          </div>

          <div className="lg:col-span-2">
            <h3 className="mb-4 font-mono text-[10px] font-black uppercase tracking-[0.22em] text-[#60A5FA]/70">
              {isVi ? 'Dự án' : 'Project'}
            </h3>
            <div className="space-y-3 rounded-3xl border border-white/5 bg-black/25 p-5">
              <div className="flex items-start gap-3 text-xs text-gray-500">
                <GraduationCap className="mt-0.5 shrink-0 text-[#60A5FA]" size={15} />
                <span>25NS - VKU, Da Nang, Viet Nam</span>
              </div>
              <div className="flex items-start gap-3 text-xs text-gray-500">
                <MapPin className="mt-0.5 shrink-0 text-[#60A5FA]" size={15} />
                <span>{PROJECT_METADATA.university}</span>
              </div>
              <a href={`mailto:${PROJECT_METADATA.email}`} className="flex items-start gap-3 text-xs text-gray-500 transition-colors hover:text-[#60A5FA]">
                <Mail className="mt-0.5 shrink-0 text-[#60A5FA]" size={15} />
                <span>{PROJECT_METADATA.email}</span>
              </a>
              <div className="flex items-start gap-3 text-xs text-gray-500">
                <Scale className="mt-0.5 shrink-0 text-[#60A5FA]" size={15} />
                <span>{isVi ? 'Sản phẩm phục vụ học tập, nghiên cứu và nâng cao nhận thức cộng đồng.' : 'Built for learning, research, and public awareness.'}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-10 border-t border-[#1E3A5F]/30 pt-6">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="text-[10px] leading-relaxed text-gray-700 font-mono">
              © 2025 DEEPFENSE · Ho Xuan Nguyen (25NS039) & Nguyen Nhat Huy (25NS020). {isVi ? 'Bảo lưu mọi quyền.' : 'All rights reserved.'}
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
