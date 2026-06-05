/**
 * DEEPFENSE.ONLINE - Footer v3.0
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
    { path: '/contact', label: isVi ? 'Liên hệ nhóm 2HAND' : 'Contact Team 2HAND', icon: <Mail size={13} /> },
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
    const className = 'group flex items-center justify-between gap-3 rounded-md px-2 py-2 text-sm text-slate-400 transition-colors hover:bg-white/[0.035] hover:text-blue-200';
    const content = (
      <>
        <span className="flex items-center gap-2">
          <span className="text-slate-600 transition-colors group-hover:text-blue-300">{item.icon}</span>
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
    <footer className="relative z-10 mt-20 overflow-hidden border-t border-[#1E3A5F]/55 bg-[#020710]/97 backdrop-blur-xl">
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
                <div className="font-display text-2xl font-black tracking-tight text-white">
                  DEEPFENSE
                </div>
                <div className="font-mono text-[9px] font-bold uppercase tracking-[0.18em] text-blue-300/65">
                  DEEPFAKE - DEFENSE
                </div>
              </div>
            </Link>

            <p className="max-w-2xl text-sm leading-7 text-slate-300/82 md:text-justify">
              {isVi
                ? 'DEEPFENSE là nền tảng huấn luyện nhận diện deepfake và tự vệ trước lừa đảo AI, tập trung vào học qua thử thách, mô phỏng tình huống, phản hồi tức thì và chứng nhận năng lực số cho cộng đồng học sinh, sinh viên.'
                : 'DEEPFENSE is a gamified deepfake awareness and AI scam defense training platform focused on challenges, scenario simulation, instant feedback, and digital-safety certification for learners.'}
            </p>

            <div className="mt-6 rounded-xl border border-white/10 bg-white/[0.035] p-5">
              <div className="grid gap-4 md:grid-cols-3">
                <div>
                  <div className="font-mono text-[10px] font-black uppercase tracking-[0.12em] text-blue-300">Core</div>
                  <div className="mt-1 text-xs leading-relaxed text-slate-400">
                    {isVi ? 'Gamification và huấn luyện người dùng.' : 'Gamification and user training.'}
                  </div>
                </div>
                <div>
                  <div className="font-mono text-[10px] font-black uppercase tracking-[0.12em] text-blue-300">Academy</div>
                  <div className="mt-1 text-xs leading-relaxed text-slate-400">
                    {isVi ? 'Lộ trình học, quiz, chứng nhận.' : 'Learning path, quizzes, certificates.'}
                  </div>
                </div>
                <div>
                  <div className="font-mono text-[10px] font-black uppercase tracking-[0.12em] text-blue-300">Trust</div>
                  <div className="mt-1 text-xs leading-relaxed text-slate-400">
                    {isVi ? 'Minh bạch dữ liệu và hỗ trợ ứng cứu.' : 'Transparent data and response support.'}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:col-span-4">
            <div>
              <h3 className="mb-3 text-xs font-bold uppercase tracking-[0.12em] text-blue-300/85">
                {isVi ? 'Luyện tập' : 'Train'}
              </h3>
              <div className="flex flex-col gap-3">{trainingLinks.map(renderLink)}</div>
            </div>

            <div>
              <h3 className="mb-3 text-xs font-bold uppercase tracking-[0.12em] text-blue-300/85">
                {isVi ? 'Hỗ trợ' : 'Support'}
              </h3>
              <div className="flex flex-col gap-3">{supportLinks.map(renderLink)}</div>
            </div>

            <div className="md:col-span-2">
              <h3 className="mb-3 text-xs font-bold uppercase tracking-[0.12em] text-blue-300/85">
                {isVi ? 'Pháp lý & tin cậy' : 'Legal & Trust'}
              </h3>
              <div className="grid grid-cols-1 gap-x-8 gap-y-3 md:grid-cols-2">
                {legalLinks.map(renderLink)}
              </div>
            </div>
          </div>

          <div className="lg:col-span-3">
            <h3 className="mb-3 text-xs font-bold uppercase tracking-[0.12em] text-blue-300/85">
              {isVi ? 'Dự án' : 'Project'}
            </h3>
            <div className="space-y-3">
              <div className="flex items-start gap-3 text-sm leading-relaxed text-slate-400">
                <GraduationCap className="mt-0.5 shrink-0 text-[#60A5FA]" size={15} />
                <span>25NS - VKU, Da Nang, Viet Nam</span>
              </div>
              <div className="flex items-start gap-3 text-sm leading-relaxed text-slate-400">
                <MapPin className="mt-0.5 shrink-0 text-[#60A5FA]" size={15} />
                <span>{PROJECT_METADATA.university}</span>
              </div>
              <a href={`mailto:${PROJECT_METADATA.email}`} className="flex items-start gap-3 text-sm leading-relaxed text-slate-400 transition-colors hover:text-blue-200">
                <Mail className="mt-0.5 shrink-0 text-[#60A5FA]" size={15} />
                <span>{PROJECT_METADATA.email}</span>
              </a>
              <div className="flex items-start gap-3 text-sm leading-relaxed text-slate-400">
                <Scale className="mt-0.5 shrink-0 text-[#60A5FA]" size={15} />
                <span>{isVi ? 'Phục vụ học tập, nghiên cứu và nâng cao nhận thức cộng đồng.' : 'Built for learning, research, and public awareness.'}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-10 border-t border-[#1E3A5F]/30 pt-6">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="font-mono text-[10px] leading-relaxed text-slate-500">
              © 2025 DEEPFENSE · {isVi ? 'Nhóm 2HAND (VKU)' : 'Team 2HAND (VKU)'}. {isVi ? 'Bảo lưu mọi quyền.' : 'All rights reserved.'}
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <span className="inline-flex items-center gap-2 rounded-full border border-green-500/15 bg-green-500/5 px-3 py-1.5 font-mono text-[9px] font-bold uppercase tracking-[0.12em] text-green-400/70">
                <span className="h-1.5 w-1.5 rounded-full bg-green-400 animate-pulse" />
                System Online
              </span>
              <Link to="/admin" className="font-mono text-[9px] uppercase tracking-[0.14em] text-slate-600 transition-colors hover:text-blue-300">
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
