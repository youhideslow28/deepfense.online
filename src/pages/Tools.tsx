import React, { useState, useRef, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  ScanLine, 
  ShieldCheck, 
  AlertTriangle, 
  CheckCircle2,
  UploadCloud, 
  Download, 
  Activity, 
  FileText,
  HeartHandshake,
  MapPin,
  Scale,
  BrainCircuit,
  Lock,
  BookOpen,
  Globe,
  Zap,
  Binary,
  LifeBuoy,
  BadgeCheck,
} from 'lucide-react';
import { Language } from '@/types';
import { TRANSLATIONS, KNOWLEDGE_BASE } from '@/data';
import CrisisHub from './CrisisHub';
import GlowButton from '@/components/ui/GlowButton';
import type { FamilyAudience } from '@/config/domainRouting';

interface ToolsProps {
  lang: Language;
  familyAudience?: FamilyAudience | null;
}

type ToolsTab = 'SCAN' | 'PROTECT' | 'CRISIS' | 'KNOWLEDGE';

interface BehaviorQuestion {
  q: string;
  risk: number;
  dimension: string;
  action: string;
}

const behaviorQuestions: Record<Language, BehaviorQuestion[]> = {
  vi: [
    {
      q: 'Người liên hệ có tạo áp lực phải chuyển tiền, cung cấp OTP, mã đăng nhập hoặc dữ liệu cá nhân ngay lập tức không?',
      risk: 22,
      dimension: 'Áp lực khẩn cấp',
      action: 'Dừng tương tác, không chuyển tiền/OTP và gọi lại bằng số liên hệ đã lưu từ trước.',
    },
    {
      q: 'Họ có yêu cầu giữ bí mật, không cho người thân/bạn bè/cơ quan biết về cuộc gọi hoặc tin nhắn này không?',
      risk: 18,
      dimension: 'Cô lập nạn nhân',
      action: 'Mở kênh xác minh thứ hai với người thân hoặc đơn vị chính thức trước khi làm tiếp.',
    },
    {
      q: 'Tài khoản, số điện thoại, link họ gửi hoặc cách xưng hô có khác với thói quen bình thường của người thật không?',
      risk: 17,
      dimension: 'Sai lệch định danh',
      action: 'Kiểm tra lại số/tài khoản gốc, không bấm link lạ và lưu ảnh chụp màn hình làm bằng chứng.',
    },
    {
      q: 'Nội dung có câu chuyện quá kịch tính như tai nạn, bị bắt, cấp cứu, đầu tư gấp hoặc đe dọa phát tán hình ảnh không?',
      risk: 15,
      dimension: 'Kích hoạt cảm xúc mạnh',
      action: 'Chuyển sang chế độ xác minh bình tĩnh: hỏi câu chỉ người thật biết hoặc gọi lại qua kênh khác.',
    },
    {
      q: 'Video/giọng nói có dấu hiệu lạ như khẩu hình lệch, ngắt quãng bất thường, nền âm thanh méo hoặc ánh mắt thiếu tự nhiên không?',
      risk: 14,
      dimension: 'Tín hiệu kỹ thuật',
      action: 'Yêu cầu hành động xác minh trực tiếp như quay đầu, che mặt bằng tay, nói mã gia đình hoặc gọi video lại.',
    },
    {
      q: 'Bạn chưa tìm thấy nguồn độc lập xác nhận câu chuyện, nhưng đối phương vẫn thúc giục bạn hành động ngay?',
      risk: 14,
      dimension: 'Thiếu nguồn độc lập',
      action: 'Tạm dừng tối thiểu 10 phút, tìm nguồn xác nhận độc lập và báo cho người tin cậy.',
    },
  ],
  en: [
    {
      q: 'Does the contact pressure you to transfer money, share OTP codes, login codes, or personal data immediately?',
      risk: 22,
      dimension: 'Urgency pressure',
      action: 'Stop the interaction, do not send money/codes, and call back using a saved trusted contact.',
    },
    {
      q: 'Do they ask you to keep the call or message secret from family, friends, or an official organization?',
      risk: 18,
      dimension: 'Victim isolation',
      action: 'Open a second verification channel with family or the official organization before continuing.',
    },
    {
      q: 'Is the account, phone number, link, or wording different from the real person’s normal behavior?',
      risk: 17,
      dimension: 'Identity mismatch',
      action: 'Check the original number/account, avoid unfamiliar links, and save screenshots as evidence.',
    },
    {
      q: 'Is the story emotionally extreme, such as an accident, arrest, emergency care, urgent investment, or image leak threat?',
      risk: 15,
      dimension: 'Emotional trigger',
      action: 'Switch to calm verification: ask a private question or call back through another trusted channel.',
    },
    {
      q: 'Do the video or voice show odd lip sync, strange pauses, distorted background audio, or unnatural eye movement?',
      risk: 14,
      dimension: 'Technical signal',
      action: 'Request live verification such as turning the head, covering the face, saying a family code, or restarting the video call.',
    },
    {
      q: 'Have you found no independent source confirming the story while they still push you to act now?',
      risk: 14,
      dimension: 'No independent source',
      action: 'Pause for at least 10 minutes, check independent sources, and notify a trusted person.',
    },
  ],
};

type ContentCredentialUse = 'allowed' | 'notAllowed' | 'constrained';

type ProtectionUseKey =
  | 'cawg.data_mining'
  | 'cawg.ai_inference'
  | 'cawg.ai_training'
  | 'cawg.ai_generative_training';

interface ProtectionPolicy {
  entries: Record<ProtectionUseKey, ContentCredentialUse>;
  constraints: string;
}

interface ProtectionReceipt {
  format: 'deepfense.protection-receipt';
  version: '1.0';
  generatedAt: string;
  asset: {
    name: string;
    mimeType: string;
    size: number;
    sha256: string;
  };
  requestedPolicy: {
    target: 'cawg.training-mining@1.1';
    entries: Record<ProtectionUseKey, { use: ContentCredentialUse; constraint_info?: string }>;
  };
  identityDisclosure: 'not-asserted';
  readers: string[];
  enforcement: 'consumer-enforced';
  plannedCloaking: {
    method: 'fawkes-style-cloaking';
    status: 'planned';
    note: string;
  };
  signed: false;
  warning: string;
}


const defaultProtectionPolicy: ProtectionPolicy = {
  entries: {
    'cawg.data_mining': 'notAllowed',
    'cawg.ai_inference': 'notAllowed',
    'cawg.ai_training': 'notAllowed',
    'cawg.ai_generative_training': 'notAllowed',
  },
  constraints: '',
};

const formatBytes = (bytes: number) => {
  if (!bytes) return '0 B';
  const units = ['B', 'KB', 'MB', 'GB'];
  const sizeIndex = Math.min(Math.floor(Math.log(bytes) / Math.log(1024)), units.length - 1);
  return `${(bytes / Math.pow(1024, sizeIndex)).toFixed(sizeIndex === 0 ? 0 : 2)} ${units[sizeIndex]}`;
};

const hashFileSha256 = async (targetFile: File) => {
  const buffer = await targetFile.arrayBuffer();
  const digest = await crypto.subtle.digest('SHA-256', buffer);
  return Array.from(new Uint8Array(digest))
    .map((byte) => byte.toString(16).padStart(2, '0'))
    .join('');
};

const downloadJson = (payload: unknown, fileName: string) => {
  const blob = new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = fileName;
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
};

const buildProtectionReceipt = (
  targetFile: File,
  sha256: string,
): ProtectionReceipt => ({
  format: 'deepfense.protection-receipt',
  version: '1.0',
  generatedAt: new Date().toISOString(),
  asset: {
    name: targetFile.name,
    mimeType: targetFile.type || 'application/octet-stream',
    size: targetFile.size,
    sha256,
  },
  requestedPolicy: {
    target: 'cawg.training-mining@1.1',
    entries: Object.fromEntries(
      Object.entries(defaultProtectionPolicy.entries).map(([key, use]) => [
        key,
        {
          use,
        },
      ])
    ) as ProtectionReceipt['requestedPolicy']['entries'],
  },
  identityDisclosure: 'not-asserted',
  readers: [
    'C2PA/CAWG-aware media platforms and validators',
    'Deepfense Trust Center',
    'Human reviewers who inspect the sidecar receipt',
  ],
  enforcement: 'consumer-enforced',
  plannedCloaking: {
    method: 'fawkes-style-cloaking',
    status: 'planned',
    note: 'Fawkes is kept as the next photo-protection upgrade. This receipt does not modify image pixels yet.',
  },
  signed: false,
  warning: 'This is an unsigned user-intent receipt. It does not run Fawkes, enforce rights, or replace a signed C2PA Content Credential.',
});

const Tools: React.FC<ToolsProps> = ({ lang, familyAudience = null }) => {
  const t = TRANSLATIONS[lang];
  const { tab } = useParams<{ tab?: string }>();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<ToolsTab>('SCAN');
  const allowedTabs: ToolsTab[] = familyAudience ? ['SCAN', 'KNOWLEDGE', 'CRISIS'] : ['SCAN', 'PROTECT', 'KNOWLEDGE', 'CRISIS'];

  const buildToolsPath = (newTab: ToolsTab) => {
    const basePath = `/tools/${newTab.toLowerCase()}`;
    return familyAudience ? `${basePath}?audience=${familyAudience}` : basePath;
  };

  const scrollPageToTop = () => {
    requestAnimationFrame(() => {
      window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
    });
  };

  useEffect(() => {
    const fallbackTab = allowedTabs[0];
    if (tab) {
      const normalizedTab = tab.toUpperCase();
      if (['SCAN', 'PROTECT', 'CRISIS', 'KNOWLEDGE'].includes(normalizedTab) && allowedTabs.includes(normalizedTab as ToolsTab)) {
        setActiveTab(normalizedTab as ToolsTab);
        return;
      }

      setActiveTab(fallbackTab);
      navigate(buildToolsPath(fallbackTab), { replace: true });
    } else {
      setActiveTab(fallbackTab);
    }
  }, [tab, familyAudience]);

  const handleTabChange = (newTab: ToolsTab) => {
    setActiveTab(newTab);
    navigate(buildToolsPath(newTab));
    scrollPageToTop();
  };

  // State for Behavioral Context Scan
  const [step, setStep] = useState(0);
  const [riskScore, setRiskScore] = useState(0);
  const [analysisComplete, setAnalysisComplete] = useState(false);
  const [flaggedBehaviorIndexes, setFlaggedBehaviorIndexes] = useState<number[]>([]);
  const questions = behaviorQuestions[lang];
  const currentQuestion = questions[Math.min(step, questions.length - 1)];
  const riskProfile = riskScore >= 60
    ? {
      label: lang === 'vi' ? 'Rủi ro cao' : 'High risk',
      tone: 'text-red-500',
      border: '#ef4444',
      glow: 'rgba(239, 68, 68, 0.28)',
      summary: lang === 'vi'
        ? 'Mẫu tương tác có nhiều dấu hiệu thao túng thường gặp trong lừa đảo deepfake/AI voice. Không thực hiện yêu cầu, ưu tiên xác minh độc lập.'
        : 'This interaction matches several manipulation signals seen in deepfake or AI-voice scams. Do not comply; prioritize independent verification.',
    }
    : riskScore >= 30
      ? {
        label: lang === 'vi' ? 'Cần xác minh' : 'Verification needed',
        tone: 'text-amber-500',
        border: '#f59e0b',
        glow: 'rgba(245, 158, 11, 0.26)',
        summary: lang === 'vi'
          ? 'Có dấu hiệu bất thường trong bối cảnh hoặc hành vi. Chưa nên tin nội dung nghe/nhìn thấy cho đến khi kiểm tra bằng kênh khác.'
          : 'There are unusual context or behavior signals. Do not trust what you see or hear until another channel confirms it.',
      }
      : {
        label: lang === 'vi' ? 'Rủi ro thấp' : 'Lower risk',
        tone: 'text-green-500',
        border: '#22c55e',
        glow: 'rgba(34, 197, 94, 0.24)',
        summary: lang === 'vi'
          ? 'Chưa thấy nhiều dấu hiệu thao túng trong checklist này. Vẫn nên giữ thói quen xác minh khi có yêu cầu tiền, tài khoản hoặc dữ liệu riêng tư.'
          : 'This checklist found few manipulation signals. Still verify any request involving money, accounts, or private data.',
      };
  
  // State for Face Shield
  const [shieldFile, setShieldFile] = useState<File | null>(null);
  const [shieldImage, setShieldImage] = useState<string | null>(null);
  const [isShielding, setIsShielding] = useState(false);
  const [shieldReceipt, setShieldReceipt] = useState<ProtectionReceipt | null>(null);
  const shieldInputRef = useRef<HTMLInputElement>(null);

  // State for Knowledge
  const [activeKnowledgeCat, setActiveKnowledgeCat] = useState(0);

  const handleBehaviorAnswer = (isYes: boolean) => {
    if (isYes) {
      setRiskScore((prev) => Math.min(prev + currentQuestion.risk, 100));
      setFlaggedBehaviorIndexes((prev) => [...prev, step]);
    }

    if (step < questions.length - 1) {
      setStep((prev) => prev + 1);
    } else {
      setAnalysisComplete(true);
    }
  };

  const resetBehaviorScan = () => {
    setStep(0);
    setRiskScore(0);
    setAnalysisComplete(false);
    setFlaggedBehaviorIndexes([]);
  };

  // Icon mapping for Knowledge Categories
  const getKnowledgeIcon = (index: number) => {
    const icons = [
      <BookOpen size={18} />,     // AI Basics
      <ShieldCheck size={18} />,  // Prevention
      <LifeBuoy size={18} />,     // Response
      <Binary size={18} />,      // Forensics
      <Scale size={18} />,       // VN Law
      <Globe size={18} />,       // International Law
      <BrainCircuit size={18} />, // UNESCO Ethics
      <Zap size={18} />           // Future Trends
    ];
    return icons[index] || <FileText size={18} />;
  };

  const handleShieldUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
        setShieldFile(selectedFile);
        setShieldReceipt(null);
        const reader = new FileReader();
        reader.onload = (ev) => setShieldImage(ev.target?.result as string);
        reader.readAsDataURL(selectedFile);
    }
  };

  const publishProtectedPhoto = async () => {
    if (!shieldImage || !shieldFile) return;
    setIsShielding(true);

    try {
      const sha256 = await hashFileSha256(shieldFile);
      setShieldReceipt(buildProtectionReceipt(shieldFile, sha256));
    } catch (error) {
      console.warn('Unable to create protection receipt:', error);
    } finally {
      setIsShielding(false);
    }
  };

  const tabOptions: Array<{ id: ToolsTab; label: string; icon: React.ReactNode; activeClass: string }> = [
    {
      id: 'SCAN' as const,
      label: t.btn_scan,
      icon: <ScanLine size={16} />,
      activeClass: 'bg-primary text-white shadow-[0_0_18px_rgba(29,111,232,0.24)]',
    },
    {
      id: 'PROTECT' as const,
      label: t.tools_protect_btn,
      icon: <ShieldCheck size={16} />,
      activeClass: 'bg-green-500 text-white shadow-[0_0_20px_rgba(34,197,94,0.22)]',
    },
    {
      id: 'KNOWLEDGE' as const,
      label: t.tools_knowledge_title,
      icon: <Scale size={16} />,
      activeClass: 'bg-primary text-white shadow-[0_0_18px_rgba(29,111,232,0.24)]',
    },
    {
      id: 'CRISIS' as const,
      label: t.crisis_hub,
      icon: <AlertTriangle size={16} />,
      activeClass: 'bg-red-500 text-white shadow-[0_0_20px_rgba(239,68,68,0.22)]',
    },
  ].filter((option) => allowedTabs.includes(option.id));

  return (
    <div className="max-w-7xl mx-auto animate-in fade-in duration-500 py-6 px-4">
      <div key={`tools-heading-${activeTab}`} className="tab-copy-reveal mb-10 text-center">
        <h2 className="font-display flex items-center justify-center gap-3 text-3xl font-black uppercase tracking-tight text-slate-900 dark:text-white md:text-5xl">
          {activeTab === 'SCAN' ? <ScanLine className="text-primary" size={40} /> : activeTab === 'PROTECT' ? <ShieldCheck className="text-green-500" size={40} /> : activeTab === 'CRISIS' ? <AlertTriangle className="text-red-500" size={40} /> : <BookOpen className="text-primary" size={40} />}
          {activeTab === 'SCAN' ? t.tools_scan_title : activeTab === 'PROTECT' ? t.tools_protect_title : activeTab === 'CRISIS' ? t.crisis_title : t.tools_knowledge_title}
        </h2>
        <p className="mx-auto mt-4 max-w-3xl text-sm leading-7 text-slate-600 dark:text-slate-300/85">
          {activeTab === 'SCAN' 
            ? t.tools_scan_desc
            : activeTab === 'PROTECT'
            ? t.tools_protect_desc
            : activeTab === 'CRISIS'
            ? t.crisis_desc
            : t.tools_knowledge_desc}
        </p>
      </div>

      {/* TABS CONTROLLER */}
      <div className="transparent-panel-soft mx-auto mb-12 flex w-fit flex-wrap justify-center gap-2 rounded-2xl border border-black/10 dark:border-white/10 p-2 shadow-xl">
        {tabOptions.map((option) => (
          <button
            key={option.id}
            onClick={() => handleTabChange(option.id)}
            className={`flex items-center gap-2 rounded-xl px-6 py-3 text-xs font-bold uppercase tracking-[0.12em] transition-all ${
              activeTab === option.id
                ? option.activeClass
                : 'text-slate-500 dark:text-slate-400 hover:bg-white/[0.06] hover:text-slate-900 dark:text-white'
            }`}
          >
            {option.icon} {option.label}
          </button>
        ))}
      </div>

      {/* MODE: SCAN CENTER */}
      {activeTab === 'SCAN' && (
        <div key="scan-panel" className="tab-panel-reveal tab-copy-reveal space-y-8 animate-in slide-in-from-bottom-6 duration-500">
          <section className="transparent-panel relative overflow-hidden rounded-3xl border border-primary/20 p-5 shadow-xl md:p-8">
            <div>
              <div className="rounded-2xl border border-primary/15 bg-white/80 p-5 shadow-sm dark:border-primary/20 dark:bg-black/25 md:p-7">
                <div className="mb-6 flex flex-wrap items-center justify-between gap-3 border-b border-black/10 pb-5 dark:border-white/10">
                  <div>
                    <h3 className="font-display flex items-center gap-3 text-xl font-black uppercase tracking-tight text-slate-900 dark:text-white md:text-2xl">
                      <BrainCircuit size={22} className="text-primary" />
                      {lang === 'vi' ? 'Quét ngữ cảnh hành vi' : 'Behavioral context scan'}
                    </h3>
                    <p className="mt-2 text-xs leading-5 text-slate-500 dark:text-slate-400">
                      {lang === 'vi'
                        ? 'Công cụ checklist thực tế: không cần upload file, không dùng kết luận AI.'
                        : 'A practical checklist: no file upload and no AI verdict.'}
                    </p>
                  </div>
                  <div className="rounded-xl border border-primary/20 bg-primary/10 px-3 py-2 text-center">
                    <p className="text-[9px] font-black uppercase tracking-[0.14em] text-primary">
                      {lang === 'vi' ? 'Bước' : 'Step'}
                    </p>
                    <p className="font-mono text-sm font-black text-slate-900 dark:text-white">
                      {analysisComplete ? questions.length : step + 1}/{questions.length}
                    </p>
                  </div>
                </div>

                {!analysisComplete ? (
                  <div className="min-h-[360px]">
                    <div className="mb-8 h-2 overflow-hidden rounded-full border border-black/10 bg-slate-200 dark:border-white/10 dark:bg-black/40">
                      <div
                        className="h-full bg-gradient-to-r from-primary to-cyan-400 transition-all duration-500"
                        style={{ width: `${((step + 1) / questions.length) * 100}%` }}
                      />
                    </div>

                    <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5 dark:border-white/10 dark:bg-white/[0.035] md:p-6">
                      <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.14em] text-primary">
                        <Activity size={13} />
                        {currentQuestion.dimension}
                      </div>
                      <h3 className="text-lg font-bold leading-relaxed text-slate-900 dark:text-white md:text-xl">
                        {currentQuestion.q}
                      </h3>
                    </div>

                    <div className="mt-6 grid gap-3 sm:grid-cols-2">
                      <button
                        onClick={() => handleBehaviorAnswer(true)}
                        className="rounded-2xl border border-red-500/30 bg-red-500/10 px-4 py-5 text-xs font-black uppercase tracking-[0.12em] text-red-600 transition-all hover:bg-red-500 hover:text-white active:scale-[0.99] dark:text-red-300"
                      >
                        {lang === 'vi' ? 'Có dấu hiệu này' : 'Signal found'}
                      </button>
                      <button
                        onClick={() => handleBehaviorAnswer(false)}
                        className="rounded-2xl border border-green-500/30 bg-green-500/10 px-4 py-5 text-xs font-black uppercase tracking-[0.12em] text-green-700 transition-all hover:bg-green-500 hover:text-white active:scale-[0.99] dark:text-green-300"
                      >
                        {lang === 'vi' ? 'Không thấy dấu hiệu' : 'No signal'}
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="min-h-[360px] animate-in zoom-in duration-500">
                    <div className="flex flex-col items-center text-center">
                      <div
                        className="mb-5 flex h-28 w-28 items-center justify-center rounded-full border-4 bg-white shadow-2xl dark:bg-black"
                        style={{ borderColor: riskProfile.border, boxShadow: `0 0 38px ${riskProfile.glow}` }}
                      >
                        <span className={`font-display text-3xl font-black ${riskProfile.tone}`}>
                          {Math.min(riskScore, 100)}%
                        </span>
                      </div>
                      <p className={`text-xs font-black uppercase tracking-[0.16em] ${riskProfile.tone}`}>
                        {riskProfile.label}
                      </p>
                      <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-600 dark:text-slate-300">
                        {riskProfile.summary}
                      </p>
                    </div>

                    <div className="mt-7 rounded-2xl border border-black/10 bg-slate-50 p-5 dark:border-white/10 dark:bg-white/[0.035]">
                      <h4 className="mb-4 flex items-center gap-2 text-sm font-black uppercase tracking-[0.12em] text-slate-900 dark:text-white">
                        <ShieldCheck size={16} className="text-primary" />
                        {lang === 'vi' ? 'Hành động nên làm tiếp' : 'Recommended next actions'}
                      </h4>
                      <ul className="space-y-3 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
                        {(flaggedBehaviorIndexes.length > 0
                          ? flaggedBehaviorIndexes.map((index) => questions[index].action)
                          : [
                            lang === 'vi'
                              ? 'Giữ nguyên thói quen xác minh: gọi lại qua số đã lưu, không gửi OTP/tài khoản qua chat.'
                              : 'Keep verification habits: call back through a saved number and never send OTP/account data in chat.',
                            lang === 'vi'
                              ? 'Nếu có yêu cầu tiền hoặc dữ liệu riêng tư, vẫn cần xác nhận bằng ít nhất một kênh độc lập.'
                              : 'If money or private data is requested, confirm through at least one independent channel.',
                          ]).map((action) => (
                            <li key={action} className="flex gap-3">
                              <CheckCircle2 size={16} className="mt-1 shrink-0 text-green-500" />
                              <span>{action}</span>
                            </li>
                          ))}
                      </ul>
                    </div>

                    <button
                      onClick={resetBehaviorScan}
                      className="mt-6 w-full rounded-xl border border-primary/30 bg-primary/10 px-4 py-4 text-xs font-black uppercase tracking-[0.12em] text-primary transition-all hover:bg-primary hover:text-white dark:hover:text-white"
                    >
                      {lang === 'vi' ? 'Quét trường hợp mới' : 'Scan another case'}
                    </button>
                  </div>
                )}
              </div>
            </div>
          </section>

          <section className="grid gap-4 md:grid-cols-3">
            {[
              {
                icon: <UploadCloud size={20} />,
                title: lang === 'vi' ? 'Quét media deepfake' : 'Deepfake media scan',
                desc: lang === 'vi'
                  ? 'Nhận ảnh, video, âm thanh và trả điểm rủi ro bằng model đã train.'
                  : 'Accepts image, video, and audio files, then returns a validated model risk score.',
              },
              {
                icon: <Activity size={20} />,
                title: lang === 'vi' ? 'Giám định giọng nói' : 'Voice-clone forensics',
                desc: lang === 'vi'
                  ? 'Soát nhịp nói, khoảng dừng, nền âm và tín hiệu tổng hợp trong cuộc gọi.'
                  : 'Reviews speaking rhythm, pauses, background audio, and synthetic voice signals.',
              },
              {
                icon: <ScanLine size={20} />,
                title: lang === 'vi' ? 'rPPG liveness' : 'rPPG liveness',
                desc: lang === 'vi'
                  ? 'Nghiên cứu tín hiệu sinh học từ video khuôn mặt cho bước xác minh trực tiếp.'
                  : 'Researches face-video biological signals for live verification workflows.',
              },
            ].map((item) => (
              <article key={item.title} className="relative flex min-h-[240px] flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white/85 p-5 shadow-sm dark:border-white/10 dark:bg-white/[0.035]">
                <div className="absolute inset-0 bg-slate-950/[0.02] backdrop-blur-[1px] dark:bg-black/20" />
                <div className="relative flex h-full flex-col">
                  <div className="mb-4 flex items-start justify-between gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                      {item.icon}
                    </div>
                    <span className="inline-flex items-center gap-1 rounded-full border border-amber-400/35 bg-amber-400/10 px-2.5 py-1 text-[9px] font-black uppercase tracking-[0.14em] text-amber-700 dark:text-amber-200">
                      <Lock size={11} />
                      {lang === 'vi' ? 'AI đang phát triển' : 'AI in development'}
                    </span>
                  </div>
                  <h3 className="font-display text-lg font-black text-slate-900 dark:text-white">{item.title}</h3>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-600 dark:text-slate-300">{item.desc}</p>
                  <button
                    type="button"
                    disabled
                    className="mt-5 inline-flex w-full cursor-not-allowed items-center justify-center gap-2 rounded-xl border border-slate-200 bg-slate-100 px-4 py-3 text-[10px] font-black uppercase tracking-[0.12em] text-slate-400 dark:border-white/10 dark:bg-white/[0.04] dark:text-slate-500"
                  >
                    <Lock size={14} />
                    {lang === 'vi' ? 'Khóa đến khi AI train xong' : 'Locked until AI training completes'}
                  </button>
                </div>
              </article>
            ))}
          </section>
        </div>
      )}

      {/* MODE: PROACTIVE SHIELD */}
      {activeTab === 'PROTECT' && (
        <div key="protect-panel" className="tab-panel-reveal tab-copy-reveal transparent-panel relative overflow-hidden rounded-3xl border border-green-500/20 p-5 shadow-xl md:p-8 animate-in slide-in-from-bottom-6 duration-500">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-[minmax(0,0.95fr)_minmax(360px,1.05fr)]">
            <div className="flex flex-col gap-5">
              <div className="flex items-start gap-3">
                <div className="mt-1 flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-green-500/12 text-green-600 dark:text-green-300">
                  <ShieldCheck size={24} />
                </div>
                <div>
                  <h3 className="font-display text-2xl font-black tracking-tight text-slate-900 dark:text-white md:text-3xl">
                    {lang === 'vi' ? 'KHIÊN CHỐNG AI (FAWKES)' : 'ANTI-AI FAWKES SHIELD'}
                  </h3>
                </div>
              </div>

              <div className="relative">
                <input
                  ref={shieldInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleShieldUpload}
                  className="absolute inset-0 z-10 h-full w-full cursor-pointer opacity-0"
                />
                <div className="group flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-green-500/30 bg-green-500/5 p-6 text-center transition-colors hover:bg-green-500/10">
                  <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-green-500/15 transition-transform group-hover:scale-105">
                    <UploadCloud size={24} className="text-green-600 dark:text-green-300" />
                  </div>
                  <span className="text-sm font-bold text-green-700 dark:text-green-300">
                    {shieldFile ? shieldFile.name : (lang === 'vi' ? 'CHỌN ẢNH CẦN BẢO VỆ' : 'SELECT PHOTO TO PROTECT')}
                  </span>
                  <span className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                    {lang === 'vi' ? 'Hỗ trợ JPG, PNG · tối đa 10 MB' : 'Supports JPG, PNG · max 10 MB'}
                  </span>
                </div>
              </div>

              {shieldImage && !shieldReceipt && (
                <GlowButton
                  color="success"
                  size="lg"
                  icon={isShielding ? <Activity size={18} className="animate-spin" /> : <Lock size={18} />}
                  onClick={publishProtectedPhoto}
                  disabled={isShielding}
                  className="w-full"
                >
                  {isShielding
                    ? (lang === 'vi' ? 'ĐANG ĐĂNG...' : 'PUBLISHING...')
                    : (lang === 'vi' ? 'ĐĂNG ẢNH' : 'PUBLISH PHOTO')}
                </GlowButton>
              )}

              {shieldReceipt && (
                <div className="rounded-2xl border border-green-500/30 bg-green-500/10 p-4">
                  <div className="flex flex-wrap items-center gap-2 text-sm font-bold text-green-700 dark:text-green-300">
                    <BadgeCheck size={17} />
                    {lang === 'vi' ? 'Đã đăng ảnh' : 'Photo published'}
                    <span className="rounded-full border border-amber-400/40 bg-amber-400/10 px-2 py-0.5 text-[10px] font-bold text-amber-700 dark:text-amber-200">
                      {lang === 'vi' ? 'AI không được dùng' : 'AI use not allowed'}
                    </span>
                  </div>
                  <p className="mt-2 text-xs leading-5 text-slate-600 dark:text-slate-300">
                    {lang === 'vi'
                      ? 'Bạn có thể xuất tờ khai để chứng minh ảnh này đã được đánh dấu không cho AI dùng. Bản này chưa thay đổi pixel của ảnh.'
                      : 'You can export the note to show this photo has been marked as not for AI use. This version does not change the image pixels yet.'}
                  </p>
                  <button
                    onClick={() => downloadJson(shieldReceipt, `deepfense-rights-note-${Date.now()}.json`)}
                    className="mt-4 inline-flex items-center gap-2 rounded-xl bg-green-600 px-4 py-3 text-xs font-bold text-white transition-colors hover:bg-green-500"
                  >
                    <Download size={15} /> {lang === 'vi' ? 'XUẤT' : 'EXPORT'}
                  </button>
                </div>
              )}
            </div>

            <div className="transparent-panel-strong relative flex min-h-[360px] flex-col items-center justify-center overflow-hidden rounded-2xl border border-black/10 dark:border-white/10">
              {!shieldImage ? (
                <div className="flex max-w-[260px] flex-col items-center p-8 text-center text-slate-500">
                  <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-green-500/10 text-green-600 dark:text-green-300">
                    <ShieldCheck size={34} />
                  </div>
                  <span className="text-sm font-bold text-slate-700 dark:text-slate-200">
                    {lang === 'vi' ? 'KHUNG XEM TRƯỚC AN TOÀN' : 'SECURE PREVIEW PANEL'}
                  </span>
                  <span className="mt-2 text-xs leading-5 text-slate-500 dark:text-slate-400">
                    {lang === 'vi' ? 'Ảnh bạn chọn sẽ hiện ở đây trước khi đăng.' : 'Your selected photo will appear here before publishing.'}
                  </span>
                </div>
              ) : (
                <div className="group relative flex h-full w-full items-center justify-center overflow-hidden">
                  <img
                    src={shieldImage}
                    alt={lang === 'vi' ? 'Ảnh gốc của bạn' : 'Your original photo'}
                    className={`max-h-[500px] max-w-full object-contain ${isShielding ? 'opacity-50 grayscale' : 'opacity-100'} transition-all duration-300`}
                  />
                  <div className="absolute bottom-4 left-1/2 z-20 w-[calc(100%-2rem)] -translate-x-1/2 rounded-xl border border-white/20 bg-black/70 px-4 py-3 text-center text-xs font-bold text-white backdrop-blur">
                    {shieldReceipt
                      ? (lang === 'vi' ? 'Tờ khai đã sẵn sàng · bấm Xuất để tải về' : 'Note ready · press Export to download')
                      : (lang === 'vi' ? 'Ảnh gốc của bạn · chưa đăng' : 'Your original photo · not published yet')}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* MODE: KNOWLEDGE & LAW */}
      {activeTab === 'KNOWLEDGE' && (
        <div key="knowledge-panel" className="tab-panel-reveal tab-copy-reveal grid grid-cols-1 lg:grid-cols-12 gap-8 animate-in slide-in-from-bottom-6 duration-500">
           {/* Sidebar */}
           <div className="lg:col-span-4 flex flex-col gap-2">
              {KNOWLEDGE_BASE[lang].map((cat, idx) => (
                  <button 
                    key={idx}
                    onClick={() => setActiveKnowledgeCat(idx)}
                    className={`flex items-center gap-3 rounded-xl border p-4 text-left text-[10px] font-bold tracking-[0.12em] shadow-lg transition-all md:text-xs ${activeKnowledgeCat === idx ? 'border-primary bg-primary text-slate-900 dark:text-white' : 'transparent-panel-soft border-black/10 dark:border-white/10 text-slate-500 dark:text-slate-400 hover:border-black/20 dark:border-white/20 hover:text-slate-900 dark:text-white'}`}
                  >
                    <span className={activeKnowledgeCat === idx ? 'text-slate-900 dark:text-white' : 'text-blue-300'}>
                       {getKnowledgeIcon(idx)}
                    </span>
                    <span className="leading-snug uppercase">{cat.category}</span>
                  </button>
              ))}
           </div>
           
           {/* Content Box */}
           <div className="transparent-panel relative h-fit overflow-hidden rounded-3xl border border-black/10 dark:border-white/10 p-6 shadow-2xl lg:col-span-8 md:p-10">
               <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary to-secondary"></div>
               <div key={activeKnowledgeCat} className="animate-in fade-in slide-in-from-right-8 duration-500">
                  <h3 className="mb-6 flex items-center gap-4 border-b border-black/10 dark:border-white/10 pb-6 text-xl font-black text-blue-100 md:text-2xl">
                     <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                        {getKnowledgeIcon(activeKnowledgeCat)}
                     </div>
                     {KNOWLEDGE_BASE[lang][activeKnowledgeCat].category}
                  </h3>
                  <div className="space-y-6">
                     {KNOWLEDGE_BASE[lang][activeKnowledgeCat].items.map((item, idx) => (
                        <div key={idx} className="transparent-panel-soft p-6 md:p-8 rounded-2xl border border-black/10 dark:border-white/10 group hover:border-primary/30 transition-all hover:shadow-[0_0_20px_rgba(0,240,255,0.05)]">
                           <h4 className="text-base md:text-lg font-bold text-slate-900 dark:text-white mb-4 flex items-start gap-3">
                              <span className="leading-tight">{item.title}</span>
                           </h4>
                           <p className="text-justify text-sm leading-7 text-slate-600 dark:text-slate-300/85 md:text-base">
                              {item.content}
                           </p>
                        </div>
                     ))}
                  </div>
               </div>
           </div>
        </div>
      )}

      {/* MODE: CRISIS HUB */}
      {activeTab === 'CRISIS' && (
        <div key="crisis-panel" className="tab-panel-reveal tab-copy-reveal animate-in slide-in-from-bottom-6 duration-500">
           <CrisisHub lang={lang} />
        </div>
      )}
    </div>
  );
};

export default Tools;
