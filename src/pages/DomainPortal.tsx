import { ArrowRight, HeartHandshake, Moon, ShieldCheck, Sun } from 'lucide-react';
import type { Language } from '@/types/common';
import type { ThemeMode } from '@/hooks/useTheme';
import { DEEPFENSE_DOMAINS, getExperienceHref, type DeepfenseExperience } from '@/config/domainRouting';

interface DomainPortalProps {
  lang: Language;
  setLang: (lang: Language) => void;
  theme: ThemeMode;
  toggleTheme: () => void;
}

interface PortalCard {
  id: Exclude<DeepfenseExperience, 'portal'>;
  title: string;
  badge: string;
  domain: string;
  description: string;
  cta: string;
  icon: typeof ShieldCheck;
  accent: string;
  featured?: boolean;
  chips: string[];
}

const DomainPortal = ({ lang, setLang, theme, toggleTheme }: DomainPortalProps) => {
  const isVi = lang === 'vi';
  const cards: PortalCard[] = [
    {
      id: 'main',
      title: isVi ? 'Bản chính' : 'Main',
      badge: isVi ? 'Toàn diện' : 'Full Suite',
      domain: DEEPFENSE_DOMAINS.main,
      description: isVi
        ? 'Dành cho học sinh, sinh viên và người dùng muốn học tập, luyện tập và sử dụng trọn bộ công cụ an toàn số.'
        : 'For students and general users seeking learning, challenges, and full security tools.',
      cta: isVi ? 'Truy cập bản chính' : 'Open main platform',
      icon: ShieldCheck,
      accent: 'from-blue-500 to-cyan-400',
      featured: true,
      chips: isVi
        ? [
            'Học viện Academy & Cấp chứng chỉ số',
            'Thử thách thám tử & Phòng mô phỏng bẫy mạng',
            'Bộ công cụ giám định AI & Báo cáo sự cố'
          ]
        : [
            'Academy courses & Digital verification',
            'Detective challenges & Scam simulator',
            'Forensic tools & Crisis report center'
          ]
    },
    {
      id: 'family',
      title: isVi ? 'Gia đình' : 'Family',
      badge: isVi ? 'Gọn nhẹ' : 'Lite Mode',
      domain: DEEPFENSE_DOMAINS.family,
      description: isVi
        ? 'Không gian tinh gọn cho từng thế hệ trong gia đình: Thiếu niên lướt mạng an toàn và Người lớn 40+ phòng ngừa lừa đảo.'
        : 'Tailored environment by generation: Teens safe browsing and Adults 40+ fraud defense.',
      cta: isVi ? 'Vào cổng Gia đình' : 'Open Family portal',
      icon: HeartHandshake,
      accent: 'from-emerald-400 to-teal-500',
      chips: isVi
        ? [
            'Giao diện trực quan, chữ to, dễ thao tác',
            '2 Luồng riêng: Thiếu niên & Người lớn 40+',
            'Cẩm nang tình huống & Hotline 113, 156'
          ]
        : [
            'Large text, simple controls, zero jargon',
            '2 Separate paths: Teens & Adults 40+',
            'Scenario handbook & 113, 156 Hotlines'
          ]
    },
  ];

  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden bg-slate-50 px-5 py-6 text-slate-950 dark:bg-[#050b14] dark:text-white sm:px-8">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_10%,rgba(14,165,233,0.16),transparent_34%),radial-gradient(circle_at_50%_100%,rgba(16,185,129,0.12),transparent_34%)] dark:bg-[radial-gradient(circle_at_50%_10%,rgba(6,182,212,0.18),transparent_34%),radial-gradient(circle_at_50%_100%,rgba(37,99,235,0.14),transparent_36%)]" />
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-400/50 to-transparent" />

      <div className="relative z-10 flex w-full max-w-5xl flex-col items-center">
        <header className="mb-10 flex w-full items-center justify-between">
          <a href={getExperienceHref('portal')} className="flex items-center gap-3" aria-label="DEEPFENSE Portal">
            <img
              src="/logo/android-chrome-192x192.png"
              alt="DEEPFENSE"
              className="h-11 w-11 rounded-full shadow-lg shadow-cyan-400/20"
            />
            <div className="hidden sm:block">
              <p className="text-lg font-black tracking-normal">DEEPFENSE</p>
              <p className="text-[10px] font-bold uppercase tracking-[0.26em] text-blue-500 dark:text-cyan-300">
                {isVi ? 'Phòng vệ Deepfake' : 'Deepfake Defense'}
              </p>
            </div>
          </a>

          <div className="flex items-center gap-2">
            <div className="flex rounded-full border border-blue-200 bg-white/80 p-1 text-xs font-bold shadow-sm backdrop-blur dark:border-cyan-400/20 dark:bg-white/10">
              <button
                type="button"
                onClick={() => setLang('vi')}
                className={`rounded-full px-3 py-1.5 transition ${lang === 'vi' ? 'bg-blue-600 text-white shadow-sm' : 'text-slate-500 hover:text-slate-950 dark:text-slate-300 dark:hover:text-white'}`}
              >
                VI
              </button>
              <button
                type="button"
                onClick={() => setLang('en')}
                className={`rounded-full px-3 py-1.5 transition ${lang === 'en' ? 'bg-blue-600 text-white shadow-sm' : 'text-slate-500 hover:text-slate-950 dark:text-slate-300 dark:hover:text-white'}`}
              >
                EN
              </button>
            </div>
            <button
              type="button"
              onClick={toggleTheme}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-blue-200 bg-white/80 text-slate-700 shadow-sm backdrop-blur transition hover:border-blue-400 dark:border-cyan-400/20 dark:bg-white/10 dark:text-cyan-100"
              aria-label="Đổi giao diện sáng tối"
            >
              {theme === 'dark' ? <Sun size={17} /> : <Moon size={17} />}
            </button>
          </div>
        </header>

        <main className="w-full text-center">
          <div className="mx-auto flex max-w-2xl flex-col items-center">
            <img
              src="/logo/android-chrome-192x192.png"
              alt=""
              className="h-16 w-16 rounded-full shadow-xl shadow-cyan-400/20"
              aria-hidden="true"
            />
            <p className="mt-4 text-xs font-black uppercase tracking-[0.24em] text-blue-600 dark:text-cyan-300">
              deepfense.online
            </p>
            <h1 className="mt-3 text-4xl font-black leading-tight tracking-normal text-slate-950 dark:text-white sm:text-5xl">
              {isVi ? 'Chọn cổng Deepfense' : 'Choose your Deepfense gateway'}
            </h1>
            <p className="mt-4 max-w-2xl text-base leading-7 text-slate-600 dark:text-slate-300">
              {isVi
                ? 'Bản chính giữ đầy đủ tính năng. Bản Gia đình tối giản hơn cho thiếu niên, người lớn 40+ và thiết bị cấu hình thấp.'
                : 'Main keeps the full feature set. Family is simplified for teens, adults 40+, and lower-powered devices.'}
            </p>
          </div>

          <div className="mx-auto mt-8 grid w-full max-w-4xl gap-4 md:grid-cols-2">
            {cards.map((card) => {
              const Icon = card.icon;

              return (
                <a
                  key={card.id}
                  href={getExperienceHref(card.id)}
                  className={`group relative flex flex-col justify-between overflow-hidden rounded-2xl border bg-white/90 p-6 text-left shadow-lg shadow-slate-900/5 backdrop-blur-xl transition duration-300 hover:-translate-y-1.5 hover:shadow-2xl dark:bg-[#0b1627]/90 ${
                    card.featured
                      ? 'border-blue-400/80 ring-2 ring-blue-200/70 hover:border-blue-500 hover:shadow-blue-500/20 dark:border-cyan-400/40 dark:ring-cyan-400/20 dark:hover:border-cyan-300 dark:hover:shadow-cyan-500/20'
                      : 'border-emerald-300/80 ring-2 ring-emerald-200/70 hover:border-emerald-500 hover:shadow-emerald-500/20 dark:border-emerald-500/40 dark:ring-emerald-400/20 dark:hover:border-emerald-300 dark:hover:shadow-emerald-500/20'
                  }`}
                >
                  <div>
                    <div className="flex items-start justify-between gap-4">
                      <div className={`flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br ${card.accent} text-white shadow-lg transition-transform duration-300 group-hover:scale-110`}>
                        <Icon size={24} />
                      </div>
                      <span
                        className={`rounded-full px-3 py-1 text-xs font-black uppercase tracking-[0.12em] ${
                          card.featured
                            ? 'bg-blue-100 text-blue-700 dark:bg-cyan-400/15 dark:text-cyan-200'
                            : 'bg-emerald-100 text-emerald-700 dark:bg-emerald-400/15 dark:text-emerald-200'
                        }`}
                      >
                        {card.badge}
                      </span>
                    </div>

                    <div className="mt-5">
                      <h2 className="text-2xl font-black tracking-tight text-slate-950 dark:text-white sm:text-3xl">
                        DEEPFENSE {card.title}
                      </h2>
                      <p className="mt-1 font-mono text-xs font-bold uppercase tracking-[0.16em] text-blue-600 dark:text-cyan-300">
                        {card.domain}
                      </p>
                    </div>

                    <p className="mt-3.5 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
                      {card.description}
                    </p>

                    {/* Chips */}
                    <div className="mt-5 space-y-2.5 border-t border-slate-100 pt-4 dark:border-white/10">
                      {card.chips.map((chip, idx) => (
                        <div key={idx} className="flex items-center gap-2.5 text-xs font-semibold text-slate-700 dark:text-slate-200">
                          <div className={`h-1.5 w-1.5 rounded-full shrink-0 ${card.featured ? 'bg-blue-500 dark:bg-cyan-400' : 'bg-emerald-500'}`} />
                          <span>{chip}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className={`mt-8 flex items-center justify-between rounded-xl px-5 py-3.5 text-sm font-black text-white shadow-md transition-colors ${
                    card.featured
                      ? 'bg-blue-600 hover:bg-blue-700 shadow-blue-500/20 dark:bg-cyan-500 dark:text-slate-950 dark:hover:bg-cyan-400'
                      : 'bg-emerald-600 hover:bg-emerald-700 shadow-emerald-500/20 dark:bg-emerald-500 dark:text-slate-950 dark:hover:bg-emerald-400'
                  }`}>
                    <span>{card.cta}</span>
                    <ArrowRight className="transition-transform duration-300 group-hover:translate-x-1.5" size={18} />
                  </div>
                </a>
              );
            })}
          </div>
        </main>
      </div>
    </section>
  );
};

export default DomainPortal;
