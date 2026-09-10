import { ArrowRight, HeartHandshake, Home, Moon, ShieldCheck, Sun, Users } from 'lucide-react';
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
  domain: string;
  description: string;
  cta: string;
  icon: typeof ShieldCheck;
  accent: string;
  featured?: boolean;
}

const cards: PortalCard[] = [
  {
    id: 'main',
    title: 'Main',
    domain: DEEPFENSE_DOMAINS.main,
    description: 'Bản đầy đủ của DEEPFENSE: Academy, Challenge, công cụ an toàn, chính sách và lộ trình phát triển AI.',
    cta: 'Vào bản chính',
    icon: ShieldCheck,
    accent: 'from-blue-500 to-fuchsia-500',
    featured: true,
  },
  {
    id: 'family',
    title: 'Family',
    domain: DEEPFENSE_DOMAINS.family,
    description: 'Chế độ Lite cho gia đình và thiết bị yếu, có 2 luồng riêng: Người trẻ và Người lớn tuổi.',
    cta: 'Vào Family',
    icon: HeartHandshake,
    accent: 'from-emerald-400 to-cyan-500',
  },
];

const DomainPortal = ({ lang, setLang, theme, toggleTheme }: DomainPortalProps) => {
  return (
    <section className="relative min-h-screen overflow-hidden bg-slate-50 text-slate-950 dark:bg-[#07111f] dark:text-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(14,165,233,0.2),transparent_35%),radial-gradient(circle_at_bottom_right,rgba(16,185,129,0.14),transparent_34%)] dark:bg-[radial-gradient(circle_at_top_left,rgba(6,182,212,0.18),transparent_35%),radial-gradient(circle_at_bottom_right,rgba(59,130,246,0.16),transparent_34%)]" />
      <div className="relative z-10 flex min-h-screen flex-col">
        <header className="mx-auto flex w-full max-w-7xl items-center justify-between px-5 py-5 sm:px-8">
          <a href={getExperienceHref('portal')} className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-cyan-400 text-lg font-black text-white shadow-lg shadow-cyan-400/25">
              DF
            </div>
            <div>
              <p className="text-xl font-black tracking-normal">DEEPFENSE</p>
              <p className="text-[10px] font-bold uppercase tracking-[0.32em] text-blue-500 dark:text-cyan-300">Deepfake Defense</p>
            </div>
          </a>

          <div className="flex items-center gap-2">
            <div className="flex rounded-full border border-blue-200 bg-white/80 p-1 text-xs font-bold shadow-sm dark:border-cyan-400/20 dark:bg-white/10">
              <button
                type="button"
                onClick={() => setLang('vi')}
                className={`rounded-full px-3 py-1.5 ${lang === 'vi' ? 'bg-blue-600 text-white shadow-sm' : 'text-slate-500 dark:text-slate-300'}`}
              >
                VI
              </button>
              <button
                type="button"
                onClick={() => setLang('en')}
                className={`rounded-full px-3 py-1.5 ${lang === 'en' ? 'bg-blue-600 text-white shadow-sm' : 'text-slate-500 dark:text-slate-300'}`}
              >
                EN
              </button>
            </div>
            <button
              type="button"
              onClick={toggleTheme}
              className="flex h-11 w-11 items-center justify-center rounded-full border border-blue-200 bg-white/80 text-slate-700 shadow-sm transition hover:border-blue-400 dark:border-cyan-400/20 dark:bg-white/10 dark:text-cyan-100"
              aria-label="Đổi giao diện sáng tối"
            >
              {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
            </button>
          </div>
        </header>

        <main className="mx-auto flex w-full max-w-7xl flex-1 flex-col justify-center px-5 pb-12 pt-6 sm:px-8">
          <div className="max-w-3xl">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-blue-200 bg-white/75 px-4 py-2 text-xs font-extrabold uppercase tracking-[0.18em] text-blue-600 shadow-sm dark:border-cyan-400/20 dark:bg-white/10 dark:text-cyan-200">
              <Home size={15} />
              deepfense.online
            </div>
            <h1 className="text-4xl font-black leading-tight tracking-normal text-slate-950 dark:text-white sm:text-5xl lg:text-6xl">
              Chọn chế độ DEEPFENSE phù hợp
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-7 text-slate-600 dark:text-slate-300 sm:text-lg">
              Cổng chính chỉ dùng để điều hướng. Bản Main giữ đầy đủ tính năng, còn Family là chế độ nhẹ hơn cho gia đình, người mới và thiết bị cấu hình thấp.
            </p>
          </div>

          <div className="mt-9 grid max-w-5xl gap-4 md:grid-cols-2">
            {cards.map((card) => {
              const Icon = card.icon;
              return (
                <a
                  key={card.id}
                  href={getExperienceHref(card.id)}
                  className={`group flex min-h-[300px] flex-col rounded-[8px] border bg-white/86 p-6 shadow-lg shadow-slate-900/5 transition hover:-translate-y-1 hover:border-blue-400 hover:shadow-xl hover:shadow-blue-500/10 dark:bg-[#0b1627]/88 ${
                    card.featured
                      ? 'border-blue-400 ring-2 ring-blue-200/70 dark:border-cyan-300 dark:ring-cyan-400/25'
                      : 'border-slate-200 dark:border-white/10'
                  }`}
                >
                  <div className={`flex h-12 w-12 items-center justify-center rounded-[8px] bg-gradient-to-br ${card.accent} text-white shadow-lg`}>
                    <Icon size={24} />
                  </div>
                  <div className="mt-6 flex items-start justify-between gap-4">
                    <div>
                      <h2 className="text-2xl font-black tracking-normal text-slate-950 dark:text-white">DEEPFENSE {card.title}</h2>
                      <p className="mt-1 text-xs font-extrabold uppercase tracking-[0.18em] text-blue-500 dark:text-cyan-300">{card.domain}</p>
                    </div>
                    {card.featured && (
                      <span className="rounded-full bg-blue-100 px-3 py-1 text-[10px] font-black uppercase tracking-[0.12em] text-blue-700 dark:bg-cyan-400/15 dark:text-cyan-200">
                        Chính
                      </span>
                    )}
                  </div>
                  <p className="mt-5 flex-1 text-sm leading-6 text-slate-600 dark:text-slate-300">{card.description}</p>
                  <div className="mt-7 flex items-center justify-between border-t border-slate-200 pt-5 text-sm font-black text-blue-600 dark:border-white/10 dark:text-cyan-200">
                    <span>{card.cta}</span>
                    <ArrowRight className="transition group-hover:translate-x-1" size={18} />
                  </div>
                </a>
              );
            })}
          </div>

          <div className="mt-6 flex flex-wrap items-center gap-3 text-xs font-bold uppercase tracking-[0.14em] text-slate-500 dark:text-slate-400">
            <span>Portal</span>
            <span className="h-1 w-1 rounded-full bg-blue-400" />
            <span>Main</span>
            <span className="h-1 w-1 rounded-full bg-blue-400" />
            <span>Family Lite</span>
          </div>
        </main>
      </div>
      <Users className="pointer-events-none absolute bottom-6 right-6 text-blue-100 dark:text-white/5" size={180} />
    </section>
  );
};

export default DomainPortal;
