import { useState } from 'react';
import {
  ArrowRight,
  BookOpen,
  CheckCircle2,
  HeartHandshake,
  Link as LinkIcon,
  PhoneCall,
  ShieldCheck,
  Smartphone,
  Users,
  type LucideIcon,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import type { Language } from '@/types/common';
import { DEEPFENSE_DOMAINS, getExperienceHref } from '@/config/domainRouting';

interface FamilyLandingProps {
  lang: Language;
}

type FamilyMode = 'young' | 'senior';

interface FamilyModeContent {
  label: string;
  title: string;
  description: string;
  primary: { label: string; to: string; icon: LucideIcon };
  secondary: { label: string; to: string; icon: LucideIcon };
  checklist: string[];
  panels: Array<{ icon: LucideIcon; title: string; text: string }>;
}

const modes: Record<FamilyMode, FamilyModeContent> = {
  young: {
    label: 'Người trẻ',
    title: 'Chế độ người trẻ',
    description: 'Dành cho học sinh, sinh viên và người dùng mạng xã hội nhiều: học nhanh, luyện tình huống, kiểm tra link lạ và phản xạ trước nội dung viral.',
    primary: { label: 'Luyện thử thách', to: '/challenge', icon: ArrowRight },
    secondary: { label: 'Học Academy', to: '/academy', icon: BookOpen },
    checklist: [
      'Dừng trước khi chia sẻ nội dung gây sốc',
      'Kiểm tra tài khoản đăng bài và nguồn gốc ảnh/video',
      'Không bấm link nhận quà, vote, học bổng hoặc tuyển dụng lạ',
      'Báo người thân/giáo viên khi bị ép gửi ảnh, tiền hoặc OTP',
    ],
    panels: [
      {
        icon: Smartphone,
        title: 'Mạng xã hội & tin nhắn',
        text: 'Tập trung vào DM, nhóm chat, tài khoản giả, link rút gọn và nội dung được gửi kèm áp lực phản hồi nhanh.',
      },
      {
        icon: LinkIcon,
        title: 'Link lạ & lời mời',
        text: 'Ưu tiên kiểm tra dấu hiệu lừa đảo trong học bổng, việc làm online, mini game, quà tặng và trang đăng nhập giả.',
      },
      {
        icon: ShieldCheck,
        title: 'Phản xạ an toàn',
        text: 'Rèn thói quen chụp màn hình, hỏi lại nguồn độc lập, không chuyển tiếp nội dung nhạy cảm và không tự xử lý một mình.',
      },
    ],
  },
  senior: {
    label: 'Người lớn tuổi',
    title: 'Chế độ người lớn tuổi',
    description: 'Dành cho phụ huynh, ông bà và người ít rành công nghệ: xác minh cuộc gọi, chống giả giọng người thân, đặt mật mã gia đình và ứng cứu khi lỡ chuyển tiền.',
    primary: { label: 'Quét ngữ cảnh', to: '/tools/scan', icon: ArrowRight },
    secondary: { label: 'Trung tâm ứng cứu', to: '/tools/crisis', icon: PhoneCall },
    checklist: [
      'Không gửi OTP, mật khẩu hoặc ảnh giấy tờ',
      'Dừng 10 phút khi bị thúc ép chuyển tiền',
      'Gọi lại người thân bằng số đã lưu từ trước',
      'Báo ngân hàng ngay khi đã lỡ chuyển tiền',
    ],
    panels: [
      {
        icon: PhoneCall,
        title: 'Xác minh cuộc gọi',
        text: 'Gọi lại bằng số đã lưu, hỏi câu xác nhận riêng và tránh làm theo yêu cầu chuyển tiền gấp qua cuộc gọi lạ.',
      },
      {
        icon: HeartHandshake,
        title: 'Mật mã gia đình',
        text: 'Thiết lập một cụm xác minh riêng trong nhà để chống giả giọng, mạo danh người thân hoặc cấp cứu giả.',
      },
      {
        icon: ShieldCheck,
        title: 'Ứng cứu rõ bước',
        text: 'Giữ bằng chứng, khóa tài khoản, gọi ngân hàng và báo cáo đúng kênh khi đã lỡ cung cấp thông tin nhạy cảm.',
      },
    ],
  },
};

const FamilyLanding = ({ lang }: FamilyLandingProps) => {
  const [activeMode, setActiveMode] = useState<FamilyMode>('young');
  const isVi = lang === 'vi';
  const active = modes[activeMode];
  const PrimaryIcon = active.primary.icon;
  const SecondaryIcon = active.secondary.icon;

  return (
    <section className="min-h-screen bg-slate-50 text-slate-950 dark:bg-[#07111f] dark:text-white">
      <div className="border-b border-slate-200 bg-white/80 dark:border-white/10 dark:bg-[#07111f]/85">
        <div className="mx-auto flex max-w-7xl flex-col gap-8 px-5 py-10 sm:px-8 lg:flex-row lg:items-center lg:justify-between lg:py-14">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-4 py-2 text-xs font-black uppercase tracking-[0.16em] text-blue-700 dark:border-cyan-400/20 dark:bg-cyan-400/10 dark:text-cyan-200">
              <Users size={15} />
              Family Lite
            </div>
            <h1 className="mt-5 text-4xl font-black leading-tight tracking-normal sm:text-5xl">DEEPFENSE Family</h1>
            <p className="mt-4 max-w-2xl text-base leading-7 text-slate-600 dark:text-slate-300">
              {isVi
                ? 'Một subdomain nhẹ cho gia đình, có 2 chế độ nội bộ: Người trẻ và Người lớn tuổi. Mỗi chế độ giữ đúng nội dung cần thiết, giảm hiệu ứng nặng và ưu tiên thao tác dễ làm.'
                : 'One lightweight family subdomain with two internal modes: younger users and older adults. Each mode keeps only the practical steps needed for that audience.'}
            </p>

            <div className="mt-7 grid w-full max-w-xl grid-cols-2 gap-2 rounded-[8px] border border-blue-100 bg-white p-2 shadow-sm dark:border-white/10 dark:bg-white/10" role="tablist" aria-label="Chọn chế độ Family">
              {(Object.keys(modes) as FamilyMode[]).map((mode) => {
                const isActive = activeMode === mode;
                return (
                  <button
                    key={mode}
                    type="button"
                    onClick={() => setActiveMode(mode)}
                    role="tab"
                    aria-selected={isActive}
                    className={`rounded-[8px] px-3 py-3 text-sm font-black transition ${
                      isActive
                        ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/20 dark:bg-cyan-400 dark:text-slate-950'
                        : 'text-slate-600 hover:bg-slate-100 hover:text-slate-950 dark:text-slate-300 dark:hover:bg-white/10 dark:hover:text-white'
                    }`}
                  >
                    {modes[mode].label}
                  </button>
                );
              })}
            </div>

            <div className="mt-7 flex flex-wrap gap-3">
              <Link
                to={active.primary.to}
                className="inline-flex items-center gap-2 rounded-full bg-blue-600 px-5 py-3 text-sm font-black text-white shadow-lg shadow-blue-600/20 transition hover:bg-blue-700 dark:bg-cyan-400 dark:text-slate-950 dark:hover:bg-cyan-300"
              >
                {active.primary.label}
                <PrimaryIcon size={17} />
              </Link>
              <Link
                to={active.secondary.to}
                className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-white px-5 py-3 text-sm font-black text-blue-700 transition hover:border-blue-500 dark:border-cyan-400/20 dark:bg-white/10 dark:text-cyan-100"
              >
                <SecondaryIcon size={17} />
                {active.secondary.label}
              </Link>
            </div>
          </div>

          <div className="w-full max-w-sm rounded-[8px] border border-slate-200 bg-white p-5 shadow-lg shadow-slate-900/5 dark:border-white/10 dark:bg-white/10">
            <p className="text-xs font-black uppercase tracking-[0.2em] text-blue-500 dark:text-cyan-300">{DEEPFENSE_DOMAINS.family}</p>
            <h2 className="mt-4 text-2xl font-black tracking-normal">{active.title}</h2>
            <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-300">{active.description}</p>
            <div className="mt-5 space-y-3">
              {active.checklist.map((item) => (
                <div key={item} className="flex items-start gap-3 rounded-[8px] bg-slate-50 p-3 text-sm font-bold text-slate-700 dark:bg-slate-950/35 dark:text-slate-200">
                  <CheckCircle2 className="mt-0.5 shrink-0 text-emerald-500" size={18} />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto grid max-w-7xl gap-4 px-5 py-8 sm:px-8 lg:grid-cols-3">
        {active.panels.map((panel) => {
          const PanelIcon = panel.icon;
          return (
            <article key={panel.title} className="rounded-[8px] border border-slate-200 bg-white p-5 shadow-sm dark:border-white/10 dark:bg-white/8">
              <div className="flex h-11 w-11 items-center justify-center rounded-[8px] bg-blue-100 text-blue-700 dark:bg-cyan-400/12 dark:text-cyan-200">
                <PanelIcon size={22} />
              </div>
              <h2 className="mt-5 text-lg font-black tracking-normal">{panel.title}</h2>
              <p className="mt-3 text-sm leading-6 text-slate-600 dark:text-slate-300">{panel.text}</p>
            </article>
          );
        })}
      </div>

      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-3 px-5 pb-10 sm:px-8">
        <a href={getExperienceHref('portal')} className="text-sm font-black text-blue-700 hover:text-blue-900 dark:text-cyan-200 dark:hover:text-cyan-100">
          Về cổng deepfense.online
        </a>
        <a href={getExperienceHref('main')} className="text-sm font-black text-slate-600 hover:text-slate-950 dark:text-slate-300 dark:hover:text-white">
          Mở bản đầy đủ tại main.deepfense.online
        </a>
      </div>
    </section>
  );
};

export default FamilyLanding;
