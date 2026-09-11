import React from 'react';
import { Link } from 'react-router-dom';
import {
  Cookie,
  CreditCard,
  Database,
  FileText,
  HelpCircle,
  Lock,
  Mail,
  Scale,
  ShieldCheck,
  UserCheck,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { Language } from '@/types';
import { PROJECT_METADATA } from '@/data';

interface PolicyProps {
  lang: Language;
}

type Copy = {
  vi: string;
  en: string;
};

type PolicySection = {
  id: string;
  icon: LucideIcon;
  title: Copy;
  body: Copy[];
};

const copy = (lang: Language, item: Copy) => item[lang];

const trustHighlights: Copy[] = [
  {
    vi: 'Không bán dữ liệu cá nhân',
    en: 'No sale of personal data',
  },
  {
    vi: 'Máy quét AI đang khóa đến khi có benchmark',
    en: 'AI scanner locked until benchmark validation',
  },
  {
    vi: 'Không kết luận pháp lý thay cơ quan có thẩm quyền',
    en: 'No legal findings on behalf of authorities',
  },
  {
    vi: 'Ưu tiên dữ liệu tối thiểu và có mục đích',
    en: 'Purpose-limited data minimization',
  },
  {
    vi: 'Dùng ngôn ngữ trung lập trong hỗ trợ',
    en: 'Neutral language in support workflows',
  },
  {
    vi: 'Tách quyền user, editor và admin',
    en: 'Separated user, editor, and admin roles',
  },
];

const references: Copy[] = [
  {
    vi: 'Provenance và watermark: định hướng theo C2PA, Content Credentials và SynthID, đồng thời luôn nêu rõ giới hạn của từng tín hiệu.',
    en: 'Provenance and watermarking: aligned with C2PA, Content Credentials, and SynthID while clearly explaining signal limitations.',
  },
  {
    vi: 'Responsible AI: thiết kế quanh minh bạch, riêng tư, an toàn, trách nhiệm giải trình và kiểm thử trước khi mở tính năng nhạy cảm.',
    en: 'Responsible AI: designed around transparency, privacy, safety, accountability, and testing before sensitive capabilities launch.',
  },
  {
    vi: 'Digital forensics: ưu tiên chuỗi bằng chứng, metadata, nguồn gốc nội dung và khuyến nghị xác minh, không đưa phán quyết tuyệt đối.',
    en: 'Digital forensics: prioritize chain of evidence, metadata, provenance, and verification guidance rather than absolute verdicts.',
  },
];

const policySections: PolicySection[] = [
  {
    id: 'scope',
    icon: FileText,
    title: {
      vi: 'Phạm Vi Và Cam Kết Minh Bạch',
      en: 'Scope And Transparency',
    },
    body: [
      {
        vi: 'Deepfense là nền tảng giáo dục, huấn luyện và nâng cao năng lực tự vệ trước deepfake, AI scam, giả mạo danh tính và thao túng nội dung số. Mục tiêu hiện tại là giúp người dùng học cách nhận diện rủi ro, xử lý tình huống và lưu bằng chứng đúng cách.',
        en: 'Deepfense is an education, training, and self-defense platform for deepfakes, AI scams, impersonation, and manipulated digital content. The current goal is to help users recognize risk, respond to incidents, and preserve evidence properly.',
      },
      {
        vi: 'Deepfense không phải cơ quan điều tra, tổ chức giám định tư pháp, đơn vị thực thi pháp luật hoặc bên có thẩm quyền kết luận tranh chấp. Nội dung trên website là thông tin giáo dục, hướng dẫn xác minh và khuyến nghị an toàn.',
        en: 'Deepfense is not an investigative authority, court-appointed forensic body, law-enforcement agency, or legal decision maker. Website content is educational information, verification guidance, and safety advice.',
      },
      {
        vi: 'Các chức năng AI liên quan đến quét deepfake, upload media, chấm điểm rủi ro và giám định tự động đang được khóa trong giai đoạn tìm dataset, train model và benchmark. Deepfense sẽ không mở công khai các chức năng này trước khi có đánh giá kiểm soát rõ ràng.',
        en: 'AI capabilities related to deepfake scanning, media uploads, risk scoring, and automated forensics are locked while datasets are sourced, models are trained, and benchmarks are validated. Deepfense will not release them publicly before controlled evaluation is complete.',
      },
    ],
  },
  {
    id: 'privacy',
    icon: Lock,
    title: {
      vi: 'Quyền Riêng Tư Và Dữ Liệu Cá Nhân',
      en: 'Privacy And Personal Data',
    },
    body: [
      {
        vi: 'Deepfense chỉ thu thập dữ liệu cần thiết để vận hành nền tảng: thông tin tài khoản, tiến độ học tập, kết quả challenge, phản hồi khảo sát tự nguyện, nội dung gửi qua kênh hỗ trợ và log kỹ thuật phục vụ bảo mật hệ thống.',
        en: 'Deepfense only collects data needed to operate the platform: account information, learning progress, challenge results, voluntary survey responses, support submissions, and technical logs for system security.',
      },
      {
        vi: 'Deepfense không bán dữ liệu cá nhân. Khi dùng dữ liệu cho báo cáo, nghiên cứu hoặc cải thiện nội dung, nhóm vận hành ưu tiên dạng tổng hợp, ẩn danh hoặc giảm định danh nếu phù hợp.',
        en: 'Deepfense does not sell personal data. When data is used for reporting, research, or content improvement, the operations team prioritizes aggregated, anonymized, or de-identified forms where appropriate.',
      },
      {
        vi: 'Người dùng không nên gửi dữ liệu nhạy cảm của người khác nếu chưa có quyền phù hợp. Nếu gửi file, hình ảnh, âm thanh hoặc video qua kênh hỗ trợ trong tương lai, người gửi chịu trách nhiệm về quyền sử dụng nội dung đó.',
        en: 'Users should not submit sensitive data about others without appropriate rights. If files, images, audio, or video are submitted through support channels in the future, the sender is responsible for having the right to use that content.',
      },
    ],
  },
  {
    id: 'provenance',
    icon: Database,
    title: {
      vi: 'Nguồn Gốc Nội Dung, Watermark Và Giới Hạn AI',
      en: 'Provenance, Watermarks, And AI Limits',
    },
    body: [
      {
        vi: 'Deepfense định hướng theo cách tiếp cận nhiều lớp: kiểm tra nguồn gốc nội dung, metadata, tín hiệu watermark, Content Credentials, C2PA/SynthID khi có thể, cộng với checklist hành vi và xác minh qua kênh độc lập.',
        en: 'Deepfense follows a layered approach: content provenance, metadata, watermark signals, Content Credentials, C2PA/SynthID where available, behavior checklists, and independent-channel verification.',
      },
      {
        vi: 'Không có tín hiệu đơn lẻ nào là bằng chứng tuyệt đối. Việc không tìm thấy watermark, metadata hoặc Content Credentials không chứng minh rằng nội dung là thật; ngược lại, một tín hiệu đáng ngờ cũng không tự động chứng minh một người đã gian lận.',
        en: 'No single signal is absolute proof. Not finding a watermark, metadata, or Content Credentials does not prove content is authentic; likewise, a suspicious signal does not automatically prove a person acted fraudulently.',
      },
      {
        vi: 'Khi máy quét AI được mở trong tương lai, Deepfense phải hiển thị mức độ chắc chắn, giới hạn của model, cảnh báo sai số và hướng dẫn kiểm chứng, thay vì đưa phán quyết tuyệt đối như “thật” hoặc “giả” mà không có ngữ cảnh.',
        en: 'When the AI scanner opens in the future, Deepfense must show confidence levels, model limitations, error warnings, and verification guidance instead of presenting absolute real/fake verdicts without context.',
      },
    ],
  },
  {
    id: 'help-center',
    icon: HelpCircle,
    title: {
      vi: 'Trung Tâm Trợ Giúp Và Quy Trình Ứng Cứu',
      en: 'Help Center And Response Process',
    },
    body: [
      {
        vi: 'Trung tâm trợ giúp hỗ trợ người dùng mô tả sự việc, phân loại rủi ro, lưu bằng chứng, tránh lan truyền nội dung nhạy cảm và chọn kênh báo cáo phù hợp như ngân hàng, nền tảng mạng xã hội, NCSC, VNeID hoặc cơ quan chức năng.',
        en: 'The Help Center helps users describe incidents, classify risk, preserve evidence, avoid spreading sensitive material, and choose proper reporting channels such as banks, platforms, NCSC, VNeID, or relevant authorities.',
      },
      {
        vi: 'Deepfense sử dụng ngôn ngữ trung lập: “có dấu hiệu cần xác minh”, “chưa đủ dữ kiện”, “khuyến nghị liên hệ qua kênh độc lập”, “không chuyển tiền/chia sẻ OTP trước khi xác minh”.',
        en: 'Deepfense uses neutral language: “signals require verification,” “insufficient information,” “contact through an independent channel,” and “do not transfer money or share OTPs before verification.”',
      },
      {
        vi: 'Trong các tình huống có rủi ro tài chính, danh dự, an toàn cá nhân hoặc pháp lý, người dùng nên giữ bằng chứng gốc, ghi lại thời gian, tài khoản liên quan, mã giao dịch và liên hệ chuyên gia hoặc cơ quan có thẩm quyền.',
        en: 'For financial, reputational, personal-safety, or legal risks, users should preserve original evidence, record timestamps, related accounts, transaction IDs, and contact specialists or competent authorities.',
      },
    ],
  },
  {
    id: 'security',
    icon: ShieldCheck,
    title: {
      vi: 'Bảo Mật Hệ Thống Và Vận Hành Tin Cậy',
      en: 'Security And Trustworthy Operations',
    },
    body: [
      {
        vi: 'Deepfense áp dụng nguyên tắc phân quyền vừa đủ giữa user, editor và admin. Các thao tác quản trị quan trọng như đổi role, khóa tài khoản, xử lý case, xóa dữ liệu hoặc chỉnh nội dung công khai cần có dấu vết trong log.',
        en: 'Deepfense applies least-privilege access between users, editors, and admins. Important administrative actions such as role changes, account locks, case handling, data deletion, or public content edits should be logged.',
      },
      {
        vi: 'Khi triển khai production, nền tảng cần HTTPS/HSTS, Content Security Policy, bảo vệ form khỏi spam, kiểm tra tệp tải lên, giới hạn kích thước file, rate limit và giám sát truy cập bất thường.',
        en: 'In production, the platform should use HTTPS/HSTS, Content Security Policy, spam protection, upload checks, file-size limits, rate limiting, and monitoring for unusual access.',
      },
      {
        vi: 'Các tính năng nhạy cảm như AI scanner, file upload và automated forensics chỉ nên bật theo từng giai đoạn sau khi có kiểm thử, benchmark, cảnh báo giới hạn và quy trình xử lý sai số.',
        en: 'Sensitive features such as AI scanning, file uploads, and automated forensics should only be enabled in stages after testing, benchmarks, limitation notices, and error-handling procedures exist.',
      },
    ],
  },
  {
    id: 'use',
    icon: Scale,
    title: {
      vi: 'Điều Khoản Sử Dụng Và Chống Lạm Dụng',
      en: 'Terms Of Use And Misuse Prevention',
    },
    body: [
      {
        vi: 'Người dùng sử dụng Deepfense cho mục đích học tập, tự bảo vệ và nâng cao nhận thức an toàn số. Không được dùng nền tảng để quấy rối, bôi nhọ, phát tán dữ liệu cá nhân, phát triển thủ đoạn lừa đảo hoặc hướng dẫn tạo deepfake gây hại.',
        en: 'Users must use Deepfense for learning, self-protection, and digital safety awareness. The platform must not be used for harassment, defamation, personal-data exposure, scam development, or harmful deepfake creation guidance.',
      },
      {
        vi: 'Deepfense có thể giới hạn tính năng, ẩn nội dung, khóa tài khoản hoặc ghi nhận sự kiện bảo mật khi phát hiện spam, lạm dụng, truy cập trái phép, nội dung gây hại hoặc hành vi có thể làm rủi ro cho cộng đồng.',
        en: 'Deepfense may limit features, hide content, lock accounts, or record security events when spam, abuse, unauthorized access, harmful content, or community-risk behavior is detected.',
      },
      {
        vi: 'Các bài học và challenge cần hướng tới phòng tránh. Nội dung mô phỏng phải tránh cung cấp hướng dẫn vận hành chi tiết cho hành vi xấu, đặc biệt là deepfake, phishing, đánh cắp tài khoản hoặc tống tiền.',
        en: 'Lessons and challenges must focus on prevention. Simulated content should avoid operational instructions for wrongdoing, especially deepfakes, phishing, account theft, or extortion.',
      },
    ],
  },
  {
    id: 'retention',
    icon: Database,
    title: {
      vi: 'Lưu Trữ, Xóa Và Vòng Đời Dữ Liệu',
      en: 'Retention, Deletion, And Data Lifecycle',
    },
    body: [
      {
        vi: 'Deepfense chỉ lưu dữ liệu trong thời gian cần thiết cho vận hành, học tập, hỗ trợ người dùng, thống kê tổng hợp và bảo vệ hệ thống. Không nên giữ dữ liệu chỉ vì “có thể cần sau này” nếu không có mục đích rõ ràng.',
        en: 'Deepfense retains data only as long as needed for operations, learning, user support, aggregated statistics, and system protection. Data should not be kept merely because it “might be useful later” without a clear purpose.',
      },
      {
        vi: 'Khuyến nghị vận hành: activity logs từ 90 đến 180 ngày, security events khoảng 180 ngày, Help Center cases từ 180 đến 365 ngày tùy mức độ, dữ liệu khảo sát ưu tiên dạng tổng hợp hoặc ẩn danh.',
        en: 'Operational guidance: activity logs for 90 to 180 days, security events around 180 days, Help Center cases for 180 to 365 days depending on severity, and survey data preferably aggregated or anonymized.',
      },
      {
        vi: 'Người dùng có thể yêu cầu xem, chỉnh sửa hoặc xóa dữ liệu cá nhân của mình khi phù hợp với điều kiện kỹ thuật, an toàn hệ thống và nghĩa vụ pháp lý.',
        en: 'Users may request access, correction, or deletion of their personal data where compatible with technical constraints, system safety, and legal obligations.',
      },
    ],
  },
  {
    id: 'cookies',
    icon: Cookie,
    title: {
      vi: 'Chính Sách Cookie Và Lưu Trữ Cục Bộ',
      en: 'Cookie Policy And Local Storage',
    },
    body: [
      {
        vi: 'Deepfense sử dụng cookie thiết yếu và Web Storage (localStorage/sessionStorage) để lưu tùy chọn giao diện (sáng/tối), ngôn ngữ hiển thị, trạng thái phiên đăng nhập và tiến độ học tập trên thiết bị. Toàn bộ phục vụ mục đích kỹ thuật và trải nghiệm người dùng.',
        en: 'Deepfense uses essential cookies and Web Storage (localStorage/sessionStorage) to retain theme preferences, display language, auth session state, and learning progress on your device. These are strictly used for technical operation and user experience.',
      },
      {
        vi: 'Nền tảng không sử dụng cookie theo dõi quảng cáo của bên thứ ba, không bán hoặc chia sẻ hồ sơ hành vi người dùng cho bất kỳ mạng lưới tiếp thị nào. Người dùng có quyền từ chối hoặc xóa cookie bất cứ lúc nào thông qua biểu ngữ quyền riêng tư hoặc cài đặt trình duyệt.',
        en: 'The platform does not use third-party advertising tracking cookies, nor does it sell or share behavioral profiles with marketing networks. Users can decline or clear cookies at any time via the privacy banner or browser settings.',
      },
    ],
  },
  {
    id: 'refund',
    icon: CreditCard,
    title: {
      vi: 'Chính Sách Dịch Vụ Miễn Phí & Điểm Thưởng DPF',
      en: 'Free Service Policy And DPF Rewards',
    },
    body: [
      {
        vi: 'Deepfense là một nền tảng phi lợi nhuận phục vụ cộng đồng, hoàn toàn miễn phí cho mọi đối tượng người học. Nền tảng không bán gói đăng ký, không thu phí dịch vụ, không cung cấp tính năng thương mại có phí, do đó không phát sinh chính sách hoàn tiền (Refund).',
        en: 'Deepfense is a non-profit community platform that is 100% free for all learners. We do not sell subscriptions, charge fees, or provide commercial paid features; therefore, no financial transactions or refund obligations apply.',
      },
      {
        vi: 'Điểm thưởng DPF Coin trên website là cơ chế trò chơi hóa (Gamification) nội bộ nhằm khuyến khích rèn luyện kiến thức, không phải công cụ đầu tư, không đại diện cho quyền sở hữu tài chính và không có giá trị quy đổi ra tiền pháp định.',
        en: 'DPF Coin rewards on the platform are an internal gamification mechanism designed to motivate learning; they are not an investment vehicle, do not represent financial ownership, and have no monetary fiat exchange value.',
      },
    ],
  },
  {
    id: 'access',
    icon: UserCheck,
    title: {
      vi: 'Phân Quyền Nội Bộ Và Trách Nhiệm Quản Trị',
      en: 'Internal Access And Admin Responsibility',
    },
    body: [
      {
        vi: 'User là người học/người chơi bình thường, có quyền xem tiến độ, điểm số, kết quả của chính mình, tham gia challenge và gửi yêu cầu hỗ trợ.',
        en: 'Users can view their own progress, scores, results, participate in challenges, and submit support requests.',
      },
      {
        vi: 'Editor phụ trách nội dung như lesson, challenge, explanation, skill tags và difficulty. Editor không nên có quyền đổi role, xóa user, xem dữ liệu nhạy cảm không cần thiết hoặc xóa log hệ thống.',
        en: 'Editors manage content such as lessons, challenges, explanations, skill tags, and difficulty. Editors should not change roles, delete users, access unnecessary sensitive data, or delete system logs.',
      },
      {
        vi: 'Admin chịu trách nhiệm quản trị user, role, trạng thái tài khoản, Help Center cases, Content Studio, Activity Log và Security Events. Mọi thao tác quan trọng cần có trách nhiệm giải trình.',
        en: 'Admins manage users, roles, account states, Help Center cases, Content Studio, Activity Log, and Security Events. Important actions require accountability.',
      },
    ],
  },
];

const Policy: React.FC<PolicyProps> = ({ lang }) => {
  const isVi = lang === 'vi';

  return (
    <div className="mx-auto max-w-6xl animate-in fade-in">
      <section className="rounded-2xl border border-black/10 bg-white/90 p-6 shadow-[0_18px_50px_rgba(15,50,100,0.10)] dark:border-white/10 dark:bg-[#07111f]/95 dark:shadow-black/30 md:p-8">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-primary/25 bg-primary/10 px-3 py-1.5 text-xs font-bold uppercase tracking-[0.12em] text-primary dark:text-blue-200">
              <FileText size={14} />
              {isVi ? 'Trung Tâm Chính Sách & Niềm Tin' : 'Policy & Trust Center'}
            </div>
            <h1 className="font-display text-3xl font-black text-slate-900 dark:text-white md:text-5xl">
              {isVi ? 'Chính Sách Deepfense' : 'Deepfense Policies'}
            </h1>
            <p className="mt-4 max-w-3xl text-sm leading-7 text-slate-600 dark:text-slate-300/85 md:text-base">
              {isVi
                ? 'Chính sách này được viết theo hướng minh bạch năng lực thật, bảo vệ dữ liệu cá nhân và vận hành có trách nhiệm. Deepfense hiện ưu tiên giáo dục và quy trình xác minh; các tính năng AI scanner/giám định tự động vẫn đang khóa.'
                : 'These policies prioritize truthful capability claims, personal-data protection, and responsible operations. Deepfense currently focuses on education and verification workflows; AI scanner and automated forensics remain locked.'}
            </p>
          </div>
          <div className="rounded-xl border border-black/10 bg-slate-50 p-4 text-xs leading-relaxed text-slate-600 dark:border-white/10 dark:bg-black/30 dark:text-slate-400">
            <p className="font-mono font-bold uppercase tracking-[0.12em] text-slate-900 dark:text-slate-200">{isVi ? 'Cập nhật' : 'Updated'}</p>
            <p className="mt-1">{isVi ? 'Tháng 9, 2026' : 'September 2026'}</p>
            <p className="mt-3 text-slate-700 dark:text-slate-300">{PROJECT_METADATA.university}</p>
          </div>
        </div>
      </section>

      <section className="mt-5 rounded-2xl border border-primary/20 bg-primary/10 p-5">
        <h2 className="font-black text-slate-900 dark:text-white">
          {isVi ? 'Cam Kết Tin Cậy' : 'Trust Commitments'}
        </h2>
        <div className="mt-4 grid gap-3 md:grid-cols-2 lg:grid-cols-3">
          {trustHighlights.map((item) => (
            <div key={item.vi} className="flex items-center gap-3 rounded-xl border border-black/10 bg-white/75 p-3 text-sm font-bold text-slate-700 dark:border-white/10 dark:bg-black/30 dark:text-slate-200">
              <ShieldCheck className="shrink-0 text-emerald-500 dark:text-emerald-300" size={17} />
              {copy(lang, item)}
            </div>
          ))}
        </div>
      </section>

      <section className="mt-5 rounded-2xl border border-slate-200 bg-white/85 p-5 dark:border-white/10 dark:bg-white/[0.035]">
        <div className="mb-4 flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-400/12 text-amber-700 dark:text-amber-200">
            <Lock size={19} />
          </div>
          <div>
            <h2 className="font-black text-slate-900 dark:text-white">
              {isVi ? 'Tuyên Bố Trạng Thái AI' : 'AI Status Statement'}
            </h2>
            <p className="text-sm text-slate-600 dark:text-slate-400">
              {isVi
                ? 'Q3/2026: Deepfense đang tìm dataset để train AI; máy quét và giám định tự động chưa mở.'
                : 'Q3/2026: Deepfense is sourcing datasets for AI training; scanner and automated forensics are not public.'}
            </p>
          </div>
        </div>
      </section>

      <div className="mt-5 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {policySections.map((section) => {
          const Icon = section.icon;
          return (
            <a key={section.id} href={`#${section.id}`} className="rounded-xl border border-black/10 bg-white/75 p-4 text-sm font-bold text-slate-600 transition-colors hover:border-primary/40 hover:bg-white hover:text-slate-900 dark:border-white/10 dark:bg-white/[0.035] dark:text-slate-300 dark:hover:bg-white/[0.055] dark:hover:text-white">
              <Icon className="mb-3 text-primary" size={20} />
              {copy(lang, section.title)}
            </a>
          );
        })}
      </div>

      <div className="mt-6 space-y-5">
        {policySections.map((section) => {
          const Icon = section.icon;
          return (
            <section id={section.id} key={section.id} className="scroll-mt-28 rounded-2xl border border-black/10 bg-white/90 p-6 dark:border-white/10 dark:bg-[#07111f]/95">
              <div className="mb-4 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-primary/25 bg-primary/10 text-primary">
                  <Icon size={20} />
                </div>
                <h2 className="text-xl font-black text-slate-900 dark:text-white">{copy(lang, section.title)}</h2>
              </div>
              <div className="space-y-3 text-sm leading-7 text-slate-600 dark:text-slate-300/85">
                {section.body.map((item) => <p key={item.vi}>{copy(lang, item)}</p>)}
              </div>
            </section>
          );
        })}
      </div>

      <section className="mt-6 rounded-2xl border border-slate-200 bg-white/85 p-6 dark:border-white/10 dark:bg-white/[0.035]">
        <h2 className="font-black text-slate-900 dark:text-white">
          {isVi ? 'Chuẩn Tham Chiếu Khi Phát Triển Tính Năng' : 'Reference Principles For Feature Development'}
        </h2>
        <div className="mt-4 grid gap-3 md:grid-cols-3">
          {references.map((item) => (
            <div key={item.vi} className="rounded-xl border border-black/10 bg-slate-50 p-4 text-sm leading-6 text-slate-600 dark:border-white/10 dark:bg-black/25 dark:text-slate-300">
              {copy(lang, item)}
            </div>
          ))}
        </div>
      </section>

      <section className="mt-6 rounded-2xl border border-primary/20 bg-primary/10 p-6">
        <h2 className="font-black text-slate-900 dark:text-white">
          {isVi ? 'Liên Hệ Về Chính Sách' : 'Policy Contact'}
        </h2>
        <p className="mt-2 text-sm leading-7 text-slate-600 dark:text-slate-300">
          {isVi
            ? 'Mọi câu hỏi về dữ liệu cá nhân, bảo mật, quyền người dùng, Trung tâm trợ giúp hoặc yêu cầu xem/sửa/xóa dữ liệu có thể gửi qua kênh liên hệ chính thức của Deepfense.'
            : 'Questions about personal data, security, user rights, the Help Center, or access/correction/deletion requests can be sent through the official Deepfense contact channel.'}
        </p>
        <div className="mt-4 flex flex-wrap gap-3">
          <a href={`mailto:${PROJECT_METADATA.email}`} className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-3 text-sm font-bold text-white hover:bg-blue-500">
            <Mail size={16} /> {PROJECT_METADATA.email}
          </a>
          <Link to="/contact" className="inline-flex items-center gap-2 rounded-lg border border-black/10 px-4 py-3 text-sm font-bold text-slate-600 hover:border-primary hover:text-slate-900 dark:border-white/10 dark:text-slate-300 dark:hover:text-white">
            {isVi ? 'Mở trang liên hệ' : 'Open contact page'}
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Policy;
