import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import {
  ShieldAlert,
  FileText,
  HeartHandshake,
  Download,
  AlertTriangle,
  CheckCircle2,
  Lock,
  ShieldCheck,
  Globe,
  Phone,
  ExternalLink,
  Search,
  Scale,
  UserRound,
  Building2,
  ListChecks,
  ReceiptText
} from 'lucide-react';
import { Language } from '@/types';
import { TRANSLATIONS } from '@/data';

interface CrisisHubProps {
  lang: Language;
}

type CrisisTab = 'report' | 'first-aid';

type ReportOption = {
  id: string;
  label: string;
  hint?: string;
};

type MultiSelectField = 'scamTypes' | 'contactChannels' | 'actionsTaken';

type ReportFormData = {
  fullName: string;
  reporterId: string;
  reporterAddress: string;
  reporterPhone: string;
  reporterEmail: string;
  reporterRole: string;
  victimName: string;
  authority: string;
  authorityDetail: string;
  reportPlace: string;
  incidentDate: string;
  incidentLocation: string;
  urgentRisk: string;
  lossAmount: string;
  recipientAccounts: string;
  scammerInfo: string;
  suspiciousLinks: string;
  evidenceList: string;
  description: string;
  scamTypes: string[];
  contactChannels: string[];
  actionsTaken: string[];
};

const initialReportForm: ReportFormData = {
  fullName: '',
  reporterId: '',
  reporterAddress: '',
  reporterPhone: '',
  reporterEmail: '',
  reporterRole: 'victim',
  victimName: '',
  authority: 'local-police',
  authorityDetail: '',
  reportPlace: '',
  incidentDate: '',
  incidentLocation: '',
  urgentRisk: 'ongoing',
  lossAmount: '',
  recipientAccounts: '',
  scammerInfo: '',
  suspiciousLinks: '',
  evidenceList: '',
  description: '',
  scamTypes: [],
  contactChannels: [],
  actionsTaken: []
};

const authorityOptions: ReportOption[] = [
  { id: 'local-police', label: 'Công an cấp xã/phường nơi cư trú hoặc nơi xảy ra vụ việc' },
  { id: 'investigation', label: 'Cơ quan Cảnh sát điều tra có thẩm quyền' },
  { id: 'vneid', label: 'Gửi qua VNeID - Kiến nghị, phản ánh về ANTT' },
  { id: 'other', label: 'Cơ quan khác' }
];

const reporterRoleOptions: ReportOption[] = [
  { id: 'victim', label: 'Người bị hại trực tiếp' },
  { id: 'representative', label: 'Người thân hoặc người đại diện hợp pháp' },
  { id: 'witness', label: 'Người phát hiện hoặc người cung cấp tin báo' }
];

const urgentRiskOptions: ReportOption[] = [
  { id: 'ongoing', label: 'Đối tượng vẫn đang liên hệ hoặc đe dọa' },
  { id: 'fresh-transfer', label: 'Vừa chuyển tiền, cần tra soát nhanh' },
  { id: 'stopped', label: 'Vụ việc đã dừng nhưng cần xác minh' }
];

const scamTypeOptions: ReportOption[] = [
  {
    id: 'deepfake-family',
    label: 'Deepfake giả mạo người thân, lãnh đạo hoặc đồng nghiệp',
    hint: 'Video, giọng nói, hình ảnh giống thật để yêu cầu tiền hoặc thông tin.'
  },
  {
    id: 'fake-authority',
    label: 'Giả danh Công an, Tòa án, Viện kiểm sát, Hải quan, Thuế',
    hint: 'Dọa liên quan vụ án, yêu cầu giữ bí mật, cài app hoặc chuyển tiền.'
  },
  {
    id: 'job-investment',
    label: 'Việc làm, nhiệm vụ online, đầu tư hoặc vay tiền giả',
    hint: 'Yêu cầu nạp tiền, đóng phí, nâng cấp gói hoặc chuyển khoản nhiều lần.'
  },
  {
    id: 'account-otp',
    label: 'Chiếm OTP, tài khoản ngân hàng, ví điện tử hoặc mạng xã hội',
    hint: 'Dụ bấm link, cài ứng dụng, đọc mã xác thực hoặc chia sẻ màn hình.'
  },
  {
    id: 'marketplace-other',
    label: 'Mua bán online, tình cảm, tống tiền hoặc dạng khác',
    hint: 'Chọn mục này nếu vụ việc không thuộc các nhóm trên hoặc còn chưa rõ.'
  }
];

const contactChannelOptions: ReportOption[] = [
  { id: 'phone-sms', label: 'Cuộc gọi điện thoại, SMS' },
  { id: 'zalo', label: 'Zalo' },
  { id: 'facebook', label: 'Facebook, Messenger' },
  { id: 'social-video', label: 'TikTok, Telegram, WhatsApp' },
  { id: 'website-app', label: 'Website, app giả mạo' },
  { id: 'bank-wallet', label: 'Tài khoản ngân hàng, ví điện tử' }
];

const actionOptions: ReportOption[] = [
  { id: 'stop-contact', label: 'Đã dừng liên lạc với đối tượng' },
  { id: 'bank-called', label: 'Đã liên hệ ngân hàng, ví điện tử hoặc tổng đài thẻ' },
  { id: 'account-locked', label: 'Đã khóa thẻ, đổi mật khẩu hoặc bật xác thực hai lớp' },
  { id: 'evidence-saved', label: 'Đã lưu ảnh chụp, link, số điện thoại, biên lai hoặc mã giao dịch' },
  { id: 'reported', label: 'Đã trình báo trực tiếp, gọi cơ quan Công an hoặc gửi qua VNeID' }
];

const fieldClass = 'w-full bg-white/80 dark:bg-black/60 border border-black/10 dark:border-white/10 rounded-lg px-3 py-2 text-sm text-slate-900 dark:text-white focus:outline-none focus:border-red-500 transition-colors';
const textAreaClass = `${fieldClass} leading-relaxed resize-none`;

const getOptionLabel = (value: string, options: ReportOption[], fallback: string) => {
  return options.find((option) => option.id === value)?.label || fallback;
};

const getSelectedLabels = (values: string[], options: ReportOption[], fallback: string) => {
  const selected = values
    .map((value) => options.find((option) => option.id === value)?.label)
    .filter(Boolean);

  return selected.length > 0 ? selected.join('; ') : fallback;
};

const formatDate = (value: string, fallback: string) => {
  if (!value) return fallback;
  const [year, month, day] = value.split('-');
  if (!year || !month || !day) return value;
  return `${day}/${month}/${year}`;
};

const SelectionGrid: React.FC<{
  title: string;
  subtitle?: string;
  options: ReportOption[];
  selected: string[];
  field: MultiSelectField;
  onToggle: (field: MultiSelectField, value: string) => void;
}> = ({ title, subtitle, options, selected, field, onToggle }) => (
  <div className="space-y-2">
    <div>
      <p className="text-slate-700 dark:text-slate-200 text-xs font-black uppercase tracking-[0.08em]">{title}</p>
      {subtitle && <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">{subtitle}</p>}
    </div>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
      {options.map((option) => {
        const isActive = selected.includes(option.id);

        return (
          <button
            key={option.id}
            type="button"
            onClick={() => onToggle(field, option.id)}
            className={`text-left rounded-lg border p-2.5 transition-all ${
              isActive
                ? 'border-red-400/70 bg-red-500/15 text-slate-950 dark:text-white'
                : 'border-black/10 dark:border-white/10 bg-white/50 dark:bg-black/30 text-slate-700 dark:text-slate-300 hover:border-red-400/40'
            }`}
          >
            <span className="flex items-start gap-2">
              <CheckCircle2 className={isActive ? 'text-red-500 mt-0.5 shrink-0' : 'text-slate-400 mt-0.5 shrink-0'} size={15} />
              <span>
                <span className="block text-[13px] font-bold leading-snug">{option.label}</span>
                {option.hint && <span className="block text-[11px] text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">{option.hint}</span>}
              </span>
            </span>
          </button>
        );
      })}
    </div>
  </div>
);

const FieldLabel: React.FC<{ children: React.ReactNode; hint?: string }> = ({ children, hint }) => (
  <label className="block text-slate-500 dark:text-slate-400 text-[11px] mb-1.5 font-bold uppercase tracking-[0.08em]">
    {children}
    {hint && <span className="block normal-case tracking-normal font-medium text-[11px] text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">{hint}</span>}
  </label>
);

const CrisisHub: React.FC<CrisisHubProps> = ({ lang }) => {
  const t = TRANSLATIONS[lang];
  const location = useLocation();
  const [activeTab, setActiveTab] = useState<CrisisTab>('first-aid');

  const handleTabChange = (tab: CrisisTab) => {
    setActiveTab(tab);
    requestAnimationFrame(() => {
      window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
    });
  };

  useEffect(() => {
    if (location.state?.subTab === 'report' || location.state?.subTab === 'first-aid') {
      handleTabChange(location.state.subTab);
    }
  }, [location.state]);

  const [formData, setFormData] = useState<ReportFormData>(initialReportForm);

  const handlePrintPdf = () => {
    window.print();
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleMultiSelect = (field: MultiSelectField, value: string) => {
    setFormData((current) => {
      const selected = current[field];
      const nextSelected = selected.includes(value)
        ? selected.filter((item) => item !== value)
        : [...selected, value];

      return { ...current, [field]: nextSelected };
    });
  };

  const authorityLabel =
    formData.authority === 'other'
      ? formData.authorityDetail || '(Ghi rõ cơ quan tiếp nhận)'
      : `${getOptionLabel(formData.authority, authorityOptions, '(Cơ quan tiếp nhận)')}${formData.authorityDetail ? ` - ${formData.authorityDetail}` : ''}`;
  const reporterRoleLabel = getOptionLabel(formData.reporterRole, reporterRoleOptions, '(Tư cách người làm đơn)');
  const scamTypeLabel = getSelectedLabels(formData.scamTypes, scamTypeOptions, '(Chưa chọn dạng lừa đảo)');
  const channelLabel = getSelectedLabels(formData.contactChannels, contactChannelOptions, '(Chưa chọn kênh liên hệ)');
  const actionLabel = getSelectedLabels(formData.actionsTaken, actionOptions, '(Chưa ghi nhận biện pháp đã thực hiện)');
  const urgentRiskLabel = getOptionLabel(formData.urgentRisk, urgentRiskOptions, '(Tình trạng vụ việc)');

  return (
    <div className="space-y-8 animate-in fade-in duration-500 pb-16 print:m-0 print:p-0">
      <div className="print:hidden border-l-4 border-red-500 pl-4 mb-8">
        <h1 className="text-4xl font-black text-slate-900 dark:text-white uppercase tracking-wider mb-2 flex items-center gap-3">
          <ShieldAlert className="text-red-500" size={36} />
          {t.crisis_title}
        </h1>
        <p className="text-slate-600 dark:text-slate-300/85 max-w-2xl">
          {t.crisis_desc}
        </p>
      </div>

      <div className="print:hidden flex flex-wrap gap-4 border-b border-black/10 dark:border-white/10 pb-4">
        <button
          onClick={() => handleTabChange('first-aid')}
          className={`px-6 py-3 rounded-xl font-bold uppercase tracking-[0.12em] text-sm transition-all focus:outline-none flex items-center gap-2 ${activeTab === 'first-aid' ? 'bg-blue-500/20 text-blue-200 border border-blue-500/50' : 'bg-white/70 dark:bg-black/40 text-slate-600 dark:text-slate-300 border border-black/10 dark:border-white/10 hover:border-white/30 hover:text-slate-900 dark:text-white'}`}
        >
          <HeartHandshake size={18} />
          {t.btn_first_aid}
        </button>
        <button
          onClick={() => handleTabChange('report')}
          className={`px-6 py-3 rounded-xl font-bold uppercase tracking-[0.12em] text-sm transition-all focus:outline-none flex items-center gap-2 ${activeTab === 'report' ? 'bg-red-500/20 text-red-200 border border-red-500/50' : 'bg-white/70 dark:bg-black/40 text-slate-600 dark:text-slate-300 border border-black/10 dark:border-white/10 hover:border-white/30 hover:text-slate-900 dark:text-white'}`}
        >
          <FileText size={18} />
          {t.btn_report_pdf}
        </button>
      </div>

      <div key={activeTab} className="tab-panel-reveal tab-copy-reveal mt-8">
        {activeTab === 'first-aid' && (
           <div className="grid grid-cols-1 md:grid-cols-2 gap-8 print:hidden">
              <div className="bg-blue-900/20 border border-blue-500/30 p-8 rounded-2xl backdrop-blur-md">
                <HeartHandshake className="text-blue-400 mb-6" size={48} />
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
                  {lang === 'vi' ? 'Bạn không đơn độc. Đây không phải lỗi của bạn.' : 'You are not alone. This is not your fault.'}
                </h2>
                <p className="text-slate-600 dark:text-gray-300 mb-6 leading-relaxed">
                  {lang === 'vi'
                    ? 'Tội phạm công nghệ cao sử dụng các kỹ thuật thao túng tâm lý tinh vi (Deepfake, tống tiền nhân dạng) khiến bộ não con người không thể phản ứng kịp. Bị lừa đảo là một chấn thương tâm lý thực sự.'
                    : 'High-tech criminals use sophisticated psychological manipulation techniques (Deepfake, identity blackmail) that make it impossible for the human brain to react in time. Being scammed is a real psychological trauma.'}
                </p>

                <div className="space-y-4">
                   <div className="bg-black/50 p-4 rounded-xl border-l-4 border-blue-500">
                     <h3 className="font-bold text-blue-400 mb-1">{lang === 'vi' ? '1. Dừng mọi liên lạc' : '1. Stop all contact'}</h3>
                     <p className="text-sm text-slate-600 dark:text-slate-300/85">
                        {lang === 'vi' ? 'Không cố gắng tranh cãi hay đáp ứng yêu cầu chuyển thêm tiền. Block thủ phạm ngay lập tức.' : 'Do not try to argue or meet requests for more money. Block the perpetrator immediately.'}
                     </p>
                   </div>
                   <div className="bg-black/50 p-4 rounded-xl border-l-4 border-emerald-500">
                     <h3 className="font-bold text-emerald-400 mb-1">{lang === 'vi' ? '2. Bảo vệ tài sản còn lại' : '2. Protect remaining assets'}</h3>
                     <p className="text-sm text-slate-600 dark:text-slate-300/85">
                        {lang === 'vi' ? 'Khoá thẻ ngân hàng, đổi mật khẩu email và tài khoản MXH quan trọng từ thiết bị khác.' : 'Lock bank cards, change passwords for email and important social accounts from another device.'}
                     </p>
                   </div>
                   <div className="bg-black/50 p-4 rounded-xl border-l-4 border-blue-500">
                     <h3 className="font-bold text-blue-300 mb-1">{lang === 'vi' ? '3. Tìm điểm tựa an toàn' : '3. Find a safe support'}</h3>
                     <p className="text-sm text-slate-600 dark:text-slate-300/85">
                        {lang === 'vi' ? 'Hãy nói chuyện với người mà bạn tin tưởng nhất. Chia sẻ để giảm bớt gánh nặng cảm giác tội lỗi.' : 'Talk to the person you trust the most. Share to reduce the burden of guilt.'}
                     </p>
                   </div>
                </div>
              </div>

               <div className="space-y-6">
                 <h3 className="text-xl font-bold text-slate-900 dark:text-white uppercase tracking-[0.12em] flex items-center gap-2">
                   <ShieldCheck className="text-primary" size={24} />
                   {t.contact_support}
                 </h3>

                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                   <a href="https://canhbao.ncsc.gov.vn" target="_blank" rel="noopener noreferrer" className="bg-blue-500/10 border border-blue-500/20 p-5 rounded-2xl hover:bg-blue-500/20 transition-all group">
                      <div className="flex items-center justify-between mb-3">
                         <div className="flex items-center gap-3">
                            <div className="bg-blue-500/20 p-2 rounded-lg text-blue-500">
                               <ShieldAlert size={20} />
                            </div>
                            <h4 className="font-bold text-blue-400 text-sm uppercase">{t.btn_ncsc_report}</h4>
                         </div>
                         <ExternalLink size={14} className="text-slate-500 group-hover:text-blue-500" />
                      </div>
                      <p className="text-xs text-slate-600 dark:text-slate-300/85">{lang === 'vi' ? 'Cổng cảnh báo an toàn thông tin Việt Nam (NCSC Việt Nam).' : 'Vietnam Information Security Warning Portal (NCSC Vietnam).'}</p>
                   </a>

                   <a href="https://chongluadao.vn" target="_blank" rel="noopener noreferrer" className="bg-green-500/10 border border-green-500/20 p-5 rounded-2xl hover:bg-green-500/20 transition-all group">
                      <div className="flex items-center justify-between mb-3">
                         <div className="flex items-center gap-3">
                            <div className="bg-green-500/20 p-2 rounded-lg text-green-500">
                               <ShieldCheck size={20} />
                            </div>
                            <h4 className="font-bold text-green-400 text-sm uppercase">{t.btn_chongluadao_report}</h4>
                         </div>
                         <ExternalLink size={14} className="text-slate-500 group-hover:text-green-500" />
                      </div>
                      <p className="text-xs text-slate-600 dark:text-slate-300/85">{lang === 'vi' ? 'Dự án cộng đồng bảo vệ người dùng khỏi website độc hại và lừa đảo.' : 'Community project protecting users from malicious and scam websites.'}</p>
                   </a>

                   <div className="bg-red-500/10 border border-red-500/30 p-5 rounded-2xl hover:bg-red-500/20 transition-all">
                      <div className="flex items-center gap-3 mb-3">
                         <div className="bg-red-500/20 p-2 rounded-lg text-red-600">
                            <Phone size={20} />
                         </div>
                         <h4 className="font-bold text-red-500 text-sm uppercase">{t.btn_a05_hotline}</h4>
                      </div>
                      <p className="text-xs text-slate-600 dark:text-slate-300/85 mb-4">{lang === 'vi' ? 'Đường dây nóng Cục An ninh mạng & Phòng chống tội phạm công nghệ cao.' : 'Hotline of the Cyber Security and High-Tech Crime Prevention Department.'}</p>
                      <a href="tel:0692194053" className="text-slate-900 dark:text-white font-black text-lg tracking-[0.12em] hover:text-red-500 transition-colors">069.219.4053</a>
                   </div>

                   <a href="https://safebrowsing.google.com/safebrowsing/report_phish/" target="_blank" rel="noopener noreferrer" className="bg-black/5 dark:bg-white/5 border border-black/20 dark:border-white/20 p-5 rounded-2xl hover:bg-black/10 dark:bg-white/10 transition-all group">
                      <div className="flex items-center justify-between mb-3">
                         <div className="flex items-center gap-3">
                            <div className="bg-black/20 dark:bg-white/20 p-2 rounded-lg text-slate-900 dark:text-white">
                               <Globe size={20} />
                            </div>
                            <h4 className="font-bold text-slate-700 dark:text-gray-200 text-sm uppercase">{t.btn_safebrowsing_report}</h4>
                         </div>
                         <ExternalLink size={14} className="text-slate-600 dark:text-slate-300/85 group-hover:text-slate-900 dark:text-white" />
                      </div>
                      <p className="text-xs text-slate-600 dark:text-slate-300/85">{lang === 'vi' ? 'Báo cáo website lừa đảo trực tiếp cho Google để bảo vệ người dùng toàn cầu.' : 'Report phishing sites directly to Google to protect global users.'}</p>
                   </a>

                   <a href="https://vneid.gov.vn/" target="_blank" rel="noopener noreferrer" className="bg-yellow-500/10 border border-yellow-500/20 p-5 rounded-2xl hover:bg-yellow-500/20 transition-all group">
                      <div className="flex items-center justify-between mb-3">
                         <div className="flex items-center gap-3">
                            <div className="bg-yellow-500/20 p-2 rounded-lg text-yellow-500">
                               <FileText size={20} />
                            </div>
                            <h4 className="font-bold text-yellow-400 text-sm uppercase">VNeID PORTAL</h4>
                         </div>
                         <ExternalLink size={14} className="text-slate-500 group-hover:text-yellow-500" />
                      </div>
                      <p className="text-xs text-slate-500 dark:text-slate-400 italic">{t.vneid_desc}</p>
                   </a>

                   <a href="https://zalo.me/ncscvn" target="_blank" rel="noopener noreferrer" className="bg-cyan-500/10 border border-cyan-500/20 p-5 rounded-2xl hover:bg-cyan-500/20 transition-all group">
                      <div className="flex items-center justify-between mb-3">
                         <div className="flex items-center gap-3">
                            <div className="bg-cyan-500/20 p-2 rounded-lg text-cyan-500">
                               <Search size={20} />
                            </div>
                            <h4 className="font-bold text-cyan-400 text-sm uppercase">ZALO OA NCSC</h4>
                         </div>
                         <ExternalLink size={14} className="text-slate-500 group-hover:text-cyan-500" />
                      </div>
                      <p className="text-xs text-slate-500 dark:text-slate-400 italic">{t.zalo_oa_desc}</p>
                   </a>

                   <a href="https://www.ic3.gov/" target="_blank" rel="noopener noreferrer" className="bg-slate-100 dark:bg-gray-800/40 border border-white/30 p-5 rounded-2xl hover:border-primary transition-all group sm:col-span-2">
                      <div className="flex items-center justify-between mb-3">
                         <div className="flex items-center gap-3">
                            <div className="bg-gray-700 p-2 rounded-lg text-slate-900 dark:text-white">
                               <Search size={20} />
                            </div>
                            <h4 className="font-bold text-slate-900 dark:text-white text-sm uppercase">{t.btn_ic3_report}</h4>
                         </div>
                         <ExternalLink size={14} className="text-slate-900 dark:text-white group-hover:text-primary" />
                      </div>
                      <p className="text-xs text-slate-600 dark:text-gray-300 font-medium">{lang === 'vi' ? 'Trung tâm Khiếu nại Tội phạm Internet của FBI. Chuyên tiếp nhận các vụ lừa đảo xuyên biên giới quy mô lớn.' : 'FBI Internet Crime Complaint Center. Specialized in large-scale cross-border fraud.'}</p>
                   </a>
                 </div>
               </div>
           </div>
        )}

        {activeTab === 'report' && (
          <div className="relative">
            {lang === 'en' && (
              <div className="absolute inset-0 z-50 backdrop-blur-md bg-white/70 dark:bg-black/40 rounded-2xl flex items-center justify-center p-8 text-center border border-black/10 dark:border-white/10">
                <div className="max-w-md">
                   <Lock className="mx-auto text-yellow-500 mb-4" size={48} />
                   <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2 uppercase">{t.btn_report_pdf}</h3>
                   <p className="text-slate-600 dark:text-gray-300 font-medium">{t.report_locked}</p>
                </div>
              </div>
            )}

            <div className={`mx-auto grid max-w-6xl grid-cols-1 xl:grid-cols-[minmax(0,0.92fr)_minmax(390px,0.62fr)] gap-5 ${lang === 'en' ? 'pointer-events-none select-none blur-sm' : ''}`}>
              <div className="print:hidden bg-white/70 dark:bg-black/40 border border-black/10 dark:border-white/10 p-5 md:p-6 rounded-xl backdrop-blur-xl">
                <div className="mb-5 flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between">
                  <div>
                    <h2 className="text-xl font-black text-slate-900 dark:text-white mb-1.5 flex items-center gap-2">
                       <AlertTriangle className="text-yellow-500" size={20} />
                       {lang === 'vi' ? 'Soạn nhanh đơn tố giác/tin báo' : 'Enter incident details'}
                    </h2>
                    <p className="text-xs text-slate-600 dark:text-slate-300/85 leading-relaxed max-w-2xl">
                      Chỉ điền thông tin cốt lõi. Bỏ trống mục chưa rõ, in ra rồi bổ sung với cán bộ tiếp nhận.
                    </p>
                  </div>
                  <div className="rounded-lg border border-red-500/25 bg-red-500/10 p-2.5 text-[11px] text-red-700 dark:text-red-200 leading-relaxed lg:max-w-[240px]">
                    Không tự kết luận tội danh. Chỉ trình bày sự việc có dấu hiệu vi phạm và tài liệu đang có.
                  </div>
                </div>

                <div className="mb-5 rounded-xl border border-blue-500/20 bg-blue-500/10 p-3">
                  <div className="flex items-start gap-3">
                    <Scale className="text-blue-500 mt-0.5 shrink-0" size={18} />
                    <div>
                      <p className="font-black text-slate-900 dark:text-white uppercase tracking-[0.08em] text-xs">Căn cứ soạn thảo</p>
                      <p className="text-xs text-slate-600 dark:text-slate-300/85 mt-1 leading-relaxed">
                        Tố giác, tin báo về tội phạm có thể trình bày bằng lời hoặc văn bản. Mẫu này giúp sắp xếp thông tin ban đầu để cơ quan có thẩm quyền tiếp nhận, kiểm tra và xác minh.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="space-y-6">
                  <section className="space-y-3">
                    <div className="flex items-center gap-2 text-sm text-slate-900 dark:text-white font-black uppercase tracking-[0.08em]">
                      <UserRound className="text-primary" size={17} />
                      1. Người làm đơn
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <div>
                        <FieldLabel>Họ và tên người tố giác</FieldLabel>
                        <input type="text" name="fullName" value={formData.fullName} onChange={handleInputChange} className={fieldClass} placeholder="Nguyễn Văn A" />
                      </div>
                      <div>
                        <FieldLabel>Tư cách làm đơn</FieldLabel>
                        <select name="reporterRole" value={formData.reporterRole} onChange={handleInputChange} className={fieldClass}>
                          {reporterRoleOptions.map((option) => <option key={option.id} value={option.id}>{option.label}</option>)}
                        </select>
                      </div>
                      <div>
                        <FieldLabel>CCCD/CMND/Hộ chiếu</FieldLabel>
                        <input type="text" name="reporterId" value={formData.reporterId} onChange={handleInputChange} className={fieldClass} placeholder="Số giấy tờ tùy thân" />
                      </div>
                      <div>
                        <FieldLabel>Số điện thoại</FieldLabel>
                        <input type="tel" name="reporterPhone" value={formData.reporterPhone} onChange={handleInputChange} className={fieldClass} placeholder="Số đang dùng để cơ quan tiếp nhận liên hệ" />
                      </div>
                      <div>
                        <FieldLabel>Email</FieldLabel>
                        <input type="email" name="reporterEmail" value={formData.reporterEmail} onChange={handleInputChange} className={fieldClass} placeholder="email@example.com" />
                      </div>
                      <div>
                        <FieldLabel>Người bị hại nếu khác người làm đơn</FieldLabel>
                        <input type="text" name="victimName" value={formData.victimName} onChange={handleInputChange} className={fieldClass} placeholder="Bỏ trống nếu chính là người làm đơn" />
                      </div>
                      <div className="md:col-span-2">
                        <FieldLabel>Địa chỉ liên hệ</FieldLabel>
                        <input type="text" name="reporterAddress" value={formData.reporterAddress} onChange={handleInputChange} className={fieldClass} placeholder="Số nhà, đường, xã/phường, tỉnh/thành phố" />
                      </div>
                    </div>
                  </section>

                  <section className="space-y-3">
                    <div className="flex items-center gap-2 text-sm text-slate-900 dark:text-white font-black uppercase tracking-[0.08em]">
                      <Building2 className="text-yellow-500" size={17} />
                      2. Vụ việc chính
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <div>
                        <FieldLabel>Cơ quan dự kiến gửi</FieldLabel>
                        <select name="authority" value={formData.authority} onChange={handleInputChange} className={fieldClass}>
                          {authorityOptions.map((option) => <option key={option.id} value={option.id}>{option.label}</option>)}
                        </select>
                      </div>
                      <div>
                        <FieldLabel>Ghi rõ địa phương/đơn vị</FieldLabel>
                        <input type="text" name="authorityDetail" value={formData.authorityDetail} onChange={handleInputChange} className={fieldClass} placeholder="Ví dụ: Công an phường..., tỉnh/thành phố..." />
                      </div>
                      <div>
                        <FieldLabel>Nơi lập đơn</FieldLabel>
                        <input type="text" name="reportPlace" value={formData.reportPlace} onChange={handleInputChange} className={fieldClass} placeholder="Ví dụ: Đà Nẵng" />
                      </div>
                      <div>
                        <FieldLabel>Tình trạng khẩn cấp</FieldLabel>
                        <select name="urgentRisk" value={formData.urgentRisk} onChange={handleInputChange} className={fieldClass}>
                          {urgentRiskOptions.map((option) => <option key={option.id} value={option.id}>{option.label}</option>)}
                        </select>
                      </div>
                      <div>
                        <FieldLabel>Ngày xảy ra sự việc</FieldLabel>
                        <input type="date" name="incidentDate" value={formData.incidentDate} onChange={handleInputChange} className={`${fieldClass} [color-scheme:dark]`} />
                      </div>
                      <div className="md:col-span-2">
                        <FieldLabel>Nơi/nền tảng xảy ra vụ việc</FieldLabel>
                        <input type="text" name="incidentLocation" value={formData.incidentLocation} onChange={handleInputChange} className={fieldClass} placeholder="Ví dụ: Zalo, Facebook, website..., tài khoản ngân hàng..., địa chỉ thực tế..." />
                      </div>
                    </div>
                    <SelectionGrid
                      title="Dạng vụ việc"
                      subtitle="Chọn gần đúng, không cần tự xác định tội danh."
                      options={scamTypeOptions}
                      selected={formData.scamTypes}
                      field="scamTypes"
                      onToggle={handleMultiSelect}
                    />
                    <SelectionGrid
                      title="Kênh liên hệ hoặc nền tảng liên quan"
                      options={contactChannelOptions}
                      selected={formData.contactChannels}
                      field="contactChannels"
                      onToggle={handleMultiSelect}
                    />
                  </section>

                  <section className="space-y-3">
                    <div className="flex items-center gap-2 text-sm text-slate-900 dark:text-white font-black uppercase tracking-[0.08em]">
                      <ReceiptText className="text-emerald-500" size={17} />
                      3. Đối tượng, thiệt hại và chứng cứ ban đầu
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <div className="md:col-span-2">
                        <FieldLabel>Số tiền/tài sản thiệt hại</FieldLabel>
                        <input type="text" name="lossAmount" value={formData.lossAmount} onChange={handleInputChange} className={fieldClass} placeholder="Ví dụ: 50.000.000 VNĐ, 0.2 BTC, tài khoản..." />
                      </div>
                      <div className="md:col-span-2">
                        <FieldLabel>Tài khoản nhận tiền/ví điện tử/ví crypto nếu có</FieldLabel>
                        <textarea name="recipientAccounts" value={formData.recipientAccounts} onChange={handleInputChange} rows={2} className={textAreaClass} placeholder="Ghi ngân hàng, số tài khoản, chủ tài khoản, ví điện tử, địa chỉ ví, sàn giao dịch, tên người nhận..." />
                      </div>
                      <div className="md:col-span-2">
                        <FieldLabel>Thông tin người/tổ chức/tài khoản bị tố giác</FieldLabel>
                        <textarea name="scammerInfo" value={formData.scammerInfo} onChange={handleInputChange} rows={2} className={textAreaClass} placeholder="Tên hiển thị, số điện thoại, UID, link profile, email, biển số, địa chỉ, nhóm chat, fanpage, app..." />
                      </div>
                      <div className="md:col-span-2">
                        <FieldLabel>Link, tài khoản, website hoặc nội dung đáng ngờ</FieldLabel>
                        <textarea name="suspiciousLinks" value={formData.suspiciousLinks} onChange={handleInputChange} rows={2} className={textAreaClass} placeholder="Dán URL, ID bài viết, số điện thoại, email, link nhóm chat, link tải app, tên miền..." />
                      </div>
                      <div className="md:col-span-2">
                        <FieldLabel>Chứng cứ gửi kèm</FieldLabel>
                        <textarea name="evidenceList" value={formData.evidenceList} onChange={handleInputChange} rows={2} className={textAreaClass} placeholder="Ảnh chụp màn hình, bản ghi âm, video call, sao kê, biên lai, email, log cuộc gọi..." />
                      </div>
                    </div>
                  </section>

                  <section className="space-y-3">
                    <div className="flex items-center gap-2 text-sm text-slate-900 dark:text-white font-black uppercase tracking-[0.08em]">
                      <ListChecks className="text-blue-500" size={17} />
                      4. Tóm tắt diễn biến và việc đã làm
                    </div>
                    <div>
                      <FieldLabel hint="Ghi ngắn theo thời gian: ai liên hệ, nói gì, yêu cầu gì, đã chuyển/gửi gì, sau đó đối tượng phản ứng ra sao.">Diễn biến sự việc</FieldLabel>
                      <textarea name="description" value={formData.description} onChange={handleInputChange} rows={4} className={textAreaClass} placeholder="Ví dụ: Ngày..., tài khoản/số điện thoại... liên hệ qua..., tự xưng..., yêu cầu..., tôi đã..., sau đó đối tượng..." />
                    </div>
                    <SelectionGrid
                      title="Biện pháp đã thực hiện"
                      options={actionOptions}
                      selected={formData.actionsTaken}
                      field="actionsTaken"
                      onToggle={handleMultiSelect}
                    />
                  </section>
                </div>

                <div className="mt-6 flex gap-3">
                  <button
                    onClick={handlePrintPdf}
                    className="flex-1 bg-red-600 hover:bg-red-500 text-white px-4 py-3 rounded-lg text-sm font-black uppercase tracking-[0.12em] transition-colors flex items-center justify-center gap-2"
                  >
                    <Download size={17} />
                    {lang === 'vi' ? 'IN / XUẤT ĐƠN' : 'DOWNLOAD PDF / PRINT'}
                  </button>
                </div>
              </div>

              <div className="bg-white text-black p-4 md:p-6 print:p-0 min-h-[560px] shadow-xl relative">
                <style dangerouslySetInnerHTML={{__html: `
                  @page { margin: 16mm; }
                  @media print {
                    body * { visibility: hidden; }
                    .print-area, .print-area * { visibility: visible; }
                    .print-area {
                      position: absolute;
                      left: 0;
                      top: 0;
                      width: 100%;
                      color: black;
                      background: white;
                      font-size: 12.5px;
                      line-height: 1.5;
                    }
                    .print-block { break-inside: avoid; }
                  }
                `}}/>

                <div className="print-area font-serif max-w-2xl mx-auto text-[11px] md:text-[12px] leading-relaxed">
                  <div className="text-center font-bold mb-5">
                    <h2 className="text-base md:text-lg uppercase">CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM</h2>
                    <h3 className="text-sm md:text-base underline underline-offset-4">Độc lập - Tự do - Hạnh phúc</h3>
                  </div>

                  <div className="text-center font-bold mb-5">
                    <h1 className="text-lg md:text-xl uppercase">ĐƠN TỐ GIÁC / TIN BÁO VỀ TỘI PHẠM</h1>
                    <p className="italic font-normal mt-1.5">
                      V/v: Trình báo vụ việc có dấu hiệu vi phạm pháp luật
                    </p>
                  </div>

                  <div className="mb-4 font-bold print-block">
                    <p>Kính gửi: {authorityLabel}</p>
                  </div>

                  <div className="space-y-3 text-justify">
                    <p>
                      Tôi làm đơn này trình báo vụ việc có dấu hiệu vi phạm pháp luật, kính đề nghị Quý cơ quan tiếp nhận, kiểm tra, xác minh và xử lý theo thẩm quyền.
                    </p>

                    <div className="print-block">
                      <p className="font-bold">1. Người làm đơn/người báo tin</p>
                      <p>Họ và tên: <span className="font-bold">{formData.fullName || '(họ tên người làm đơn)'}</span>.</p>
                      <p>Tư cách làm đơn: {reporterRoleLabel}.</p>
                      <p>Số CCCD/CMND/Hộ chiếu: {formData.reporterId || '(số giấy tờ tùy thân nếu có)'}.</p>
                      <p>Địa chỉ liên hệ: {formData.reporterAddress || '(địa chỉ liên hệ)'}.</p>
                      <p>Số điện thoại: {formData.reporterPhone || '(số điện thoại)'}; email: {formData.reporterEmail || '(email nếu có)'}.</p>
                      <p>Người bị hại nếu khác người làm đơn: {formData.victimName || '(không có hoặc chính là người làm đơn)'}.</p>
                    </div>

                    <div className="print-block">
                      <p className="font-bold">2. Vụ việc trình báo</p>
                      <p>Dạng vụ việc nghi vấn: {scamTypeLabel}.</p>
                      <p>Kênh liên hệ/nền tảng liên quan: {channelLabel}.</p>
                      <p>Thời gian xảy ra: {formatDate(formData.incidentDate, '(ngày xảy ra sự việc nếu nhớ)')}.</p>
                      <p>Nơi hoặc nền tảng xảy ra vụ việc: {formData.incidentLocation || '(địa điểm thực tế, nền tảng số, website, ứng dụng, nhóm chat hoặc tài khoản liên quan)'}.</p>
                      <p>Tình trạng cần lưu ý: {urgentRiskLabel}.</p>
                    </div>

                    <div className="print-block">
                      <p className="font-bold">3. Người/tài khoản bị tố giác và thiệt hại</p>
                      <div className="border border-gray-300 p-2 min-h-[48px] whitespace-pre-wrap">
                        {formData.scammerInfo || '(Ghi tên hiển thị, số điện thoại, tài khoản mạng xã hội, email, website, app, số tài khoản ngân hàng, nhóm chat hoặc thông tin nhận diện khác nếu có.)'}
                      </div>
                      <p className="mt-2">Thiệt hại ước tính: <span className="font-bold">{formData.lossAmount || '(số tiền hoặc tài sản nếu có)'}</span>.</p>
                      <p>Tài khoản nhận tiền/ví điện tử/ví tài sản số:</p>
                      <div className="border border-gray-300 p-2 min-h-[48px] whitespace-pre-wrap">
                        {formData.recipientAccounts || '(Ngân hàng, số tài khoản, chủ tài khoản, ví điện tử, địa chỉ ví, sàn giao dịch hoặc thông tin người nhận nếu có.)'}
                      </div>
                    </div>

                    <div className="print-block">
                      <p className="font-bold">4. Diễn biến tóm tắt</p>
                      <div className="border border-gray-300 p-2 min-h-[84px] whitespace-pre-wrap">
                        {formData.description || '(Trình bày ngắn theo trình tự thời gian: đối tượng tiếp cận bằng cách nào, đã nói/yêu cầu gì, người bị hại đã chuyển tiền/cung cấp thông tin gì, sau đó đối tượng phản ứng ra sao.)'}
                      </div>
                    </div>

                    <div className="print-block">
                      <p className="font-bold">5. Chứng cứ kèm theo và đề nghị</p>
                      <p>Link/tài khoản/nội dung đáng ngờ:</p>
                      <div className="border border-gray-300 p-2 min-h-[44px] whitespace-pre-wrap">
                        {formData.suspiciousLinks || '(URL, ID bài viết, link nhóm, link tải ứng dụng, tên miền, số điện thoại, email hoặc dữ liệu định danh số nếu có.)'}
                      </div>
                      <p className="mt-2">Chứng cứ gửi kèm:</p>
                      <div className="border border-gray-300 p-2 min-h-[48px] whitespace-pre-wrap">
                        {formData.evidenceList || '(Ảnh chụp màn hình, bản ghi âm, video call, sao kê, biên lai, email, log cuộc gọi, file gốc hoặc đường dẫn lưu trữ chứng cứ.)'}
                      </div>
                      <p className="mt-2">Biện pháp đã thực hiện: {actionLabel}.</p>
                      <p>
                        Tôi kính đề nghị Quý cơ quan tiếp nhận, kiểm tra, xác minh nguồn tin; hướng dẫn tôi bổ sung hồ sơ; phối hợp ngăn chặn thiệt hại tiếp diễn nếu còn khả năng; và thông báo kết quả xử lý theo quy định.
                      </p>
                    </div>

                    <p className="print-block">
                      Tôi cam đoan nội dung trình bày và tài liệu gửi kèm là đúng theo hiểu biết của tôi, không cố ý tố giác hoặc báo tin sai sự thật. Tôi chịu trách nhiệm trước pháp luật về nội dung trình báo và sẵn sàng phối hợp khi được yêu cầu.
                    </p>
                    <p className="print-block">
                      Tôi đề nghị bảo mật thông tin cá nhân của người tố giác, người bị hại và người liên quan trong quá trình tiếp nhận, xác minh, xử lý vụ việc theo quy định pháp luật.
                    </p>
                  </div>

                  <div className="mt-8 flex justify-between gap-6 px-3 print-block">
                    <div>
                      <p className="font-bold">Tài liệu gửi kèm:</p>
                      <p>- Chứng cứ tại mục 5 của đơn;</p>
                      <p>- Sao kê, biên lai hoặc giấy tờ tùy thân nếu có;</p>
                      <p>- Tài liệu khác sẽ bổ sung khi được yêu cầu.</p>
                    </div>
                    <div className="text-center min-w-[190px]">
                      <p>{formData.reportPlace || '......'}, ngày ..... tháng ..... năm 20...</p>
                      <p className="font-bold mt-2">NGƯỜI LÀM ĐƠN</p>
                      <p className="italic">(Ký và ghi rõ họ tên)</p>
                      <div className="h-16"></div>
                      <p className="font-bold">{formData.fullName || '(Họ và tên)'}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default CrisisHub;
