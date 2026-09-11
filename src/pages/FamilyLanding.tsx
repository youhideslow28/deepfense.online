import React from 'react';
import {
  AlertTriangle,
  ArrowRight,
  BookOpen,
  CheckCircle2,
  ChevronRight,
  FileSearch,
  Gamepad2,
  GraduationCap,
  HeartHandshake,
  Home,
  LifeBuoy,
  Link as LinkIcon,
  Lock,
  Moon,
  Phone,
  PhoneCall,
  Scale,
  ShieldAlert,
  ShieldCheck,
  Smartphone,
  Sparkles,
  Sun,
  Swords,
  Target,
  Users,
  type LucideIcon,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import type { Language } from '@/types/common';
import type { ThemeMode } from '@/hooks/useTheme';
import {
  DEEPFENSE_DOMAINS,
  getExperienceHref,
  getFamilyHref,
  getFamilyPath,
  type FamilyAudience,
} from '@/config/domainRouting';

interface FamilyLandingProps {
  lang: Language;
  setLang?: (lang: Language) => void;
  theme?: ThemeMode;
  toggleTheme?: () => void;
  mode?: FamilyAudience | null;
}

interface LocalizedCopy {
  vi: string;
  en: string;
}

interface FeatureLink {
  icon: LucideIcon;
  title: LocalizedCopy;
  text: LocalizedCopy;
  to: string;
  accent: string;
}

interface ScamCard {
  id: string;
  icon: LucideIcon;
  title: LocalizedCopy;
  situation: LocalizedCopy;
  safeMove: LocalizedCopy;
}

interface FamilyModeContent {
  badge: LocalizedCopy;
  navLabel: LocalizedCopy;
  title: LocalizedCopy;
  description: LocalizedCopy;
  primary: { label: LocalizedCopy; to: string; icon: LucideIcon };
  secondary: { label: LocalizedCopy; to: string; icon: LucideIcon };
  metrics: Array<{ value: string; label: LocalizedCopy }>;
  principles: Array<{ title: LocalizedCopy; detail: LocalizedCopy }>;
  features: FeatureLink[];
  scams: ScamCard[];
}

const tr = (copy: LocalizedCopy, lang: Language) => copy[lang];

const withAudience = (path: string, mode: FamilyAudience) => {
  const separator = path.includes('?') ? '&' : '?';
  return `${path}${separator}audience=${mode}`;
};

const content: Record<FamilyAudience, FamilyModeContent> = {
  young: {
    badge: {
      vi: 'Chế độ Thiếu niên & Học sinh (Dưới 18)',
      en: 'Teens & Students Mode (Under 18)',
    },
    navLabel: { vi: 'Thiếu niên', en: 'Teens' },
    title: {
      vi: 'Bí kíp giữ an toàn khi lướt mạng, chơi game & dùng mạng xã hội',
      en: 'Safe habits for browsing, gaming, and social networks',
    },
    description: {
      vi: 'Không còn sợ bị hack nick game, không lo bị lừa nạp thẻ ảo hay dính bẫy nhận quà trúng thưởng. Tự tin nhận diện tin nhắn lừa đảo, bảo vệ ảnh cá nhân và luôn có người lớn đồng hành khi gặp rắc rối.',
      en: 'Protect your game accounts, avoid fake top-ups and prize traps. Spot online scams, secure your private photos, and always know who to turn to when pressured.',
    },
    primary: {
      label: { vi: 'Luyện thám tử nhí', en: 'Detective challenge' },
      to: withAudience('/challenge', 'young'),
      icon: Swords,
    },
    secondary: {
      label: { vi: '6 Bẫy mạng hay gặp', en: '6 Common traps' },
      to: '#kich-ban',
      icon: Target,
    },
    metrics: [
      {
        value: '0',
        label: {
          vi: 'lần nạp thẻ / gửi OTP ngoài app chính thức',
          en: 'credentials or OTP shared outside apps',
        },
      },
      {
        value: '3s',
        label: {
          vi: 'dừng lại kiểm tra trước khi bấm link lạ',
          en: 'seconds pause before clicking strange links',
        },
      },
      {
        value: '100%',
        label: {
          vi: 'bố mẹ & thầy cô luôn sẵn sàng giúp đỡ bạn',
          en: 'trusted adults ready to protect you',
        },
      },
    ],
    principles: [
      {
        title: {
          vi: 'Tuyệt đối KHÔNG gửi ảnh riêng tư hay mật khẩu',
          en: 'NEVER share private photos or passwords',
        },
        detail: {
          vi: 'Bất kể người khác hứa tặng quà xịn hay dọa nạt, tuyệt đối KHÔNG gửi mật khẩu hoặc ảnh riêng tư. Kẻ xấu chỉ lợi dụng điều đó để tiếp tục ép buộc bạn.',
          en: 'No matter what rewards are promised or threats are made, never send private photos or passwords.',
        },
      },
      {
        title: {
          vi: 'Không có quà tặng, skin hay Kim cương/Robux miễn phí',
          en: 'No free skins, Robux, or diamonds exist on external links',
        },
        detail: {
          vi: 'Mọi đường link lạ ngoài app chính thức hứa hẹn tặng quà miễn phí đều là bẫy hack tài khoản hoặc cài mã độc vào điện thoại.',
          en: 'Any unfamiliar link promising free game currency is a phishing trap designed to steal your account.',
        },
      },
      {
        title: {
          vi: 'Khi bị đe dọa hoặc ép buộc, hãy báo ngay cho người lớn',
          en: 'If pressured or threatened, tell a trusted adult immediately',
        },
        detail: {
          vi: 'Bố mẹ, thầy cô hoặc anh chị lớn luôn ở bên bạn. Bạn không có lỗi gì khi bị kẻ xấu quấy rối hay lừa gạt trên mạng.',
          en: 'Parents and teachers are always there to help. You did nothing wrong when targeted by online predators.',
        },
      },
    ],
    features: [
      {
        icon: Swords,
        title: { vi: 'Thử thách Thám tử nhí', en: 'Detective Challenge' },
        text: {
          vi: 'Luyện mắt tinh tường soi video và hình ảnh thật - giả, nhận biết các chi tiết Deepfake bất thường.',
          en: 'Train observation skills spotting real vs fake videos and subtle Deepfake clues.',
        },
        to: withAudience('/challenge', 'young'),
        accent: 'bg-amber-400/15 text-amber-500 dark:text-amber-300',
      },
      {
        icon: Target,
        title: { vi: 'Phòng giả lập kịch bản bẫy', en: 'Scam Simulator Room' },
        text: {
          vi: 'Tự mình đối thoại thử với tài khoản lừa đảo để rèn luyện phản xạ từ chối và bảo vệ tài khoản.',
          en: 'Practice chatting with simulated scammers to build natural resistance and safe reflexes.',
        },
        to: withAudience('/challenge?mode=simulator', 'young'),
        accent: 'bg-emerald-400/15 text-emerald-600 dark:text-emerald-300',
      },
      {
        icon: FileSearch,
        title: { vi: 'Kiểm tra & Giám định nhanh', en: 'Forensic Check' },
        text: {
          vi: 'Bảng kiểm tra xem tin nhắn trúng thưởng, tài khoản lạ hay link nhận quà có an toàn hay không.',
          en: 'Quick checklist to analyze if a giveaway, DM, or link is safe or suspicious.',
        },
        to: withAudience('/tools/scan', 'young'),
        accent: 'bg-cyan-400/15 text-cyan-600 dark:text-cyan-300',
      },
      {
        icon: LifeBuoy,
        title: { vi: 'Trung tâm ứng cứu khẩn cấp', en: 'Crisis Center' },
        text: {
          vi: 'Các bước cần làm ngay lập tức khi lỡ bị hack nick, bị ép chuyển tiền hoặc bị đe dọa tung ảnh.',
          en: 'Immediate action steps if your account was compromised or if you face online blackmail.',
        },
        to: withAudience('/tools/crisis', 'young'),
        accent: 'bg-rose-400/15 text-rose-600 dark:text-rose-300',
      },
      {
        icon: GraduationCap,
        title: { vi: 'Học viện An toàn số', en: 'Academy' },
        text: {
          vi: 'Các bài học ngắn, sinh động về bí quyết dùng mạng xã hội thông minh và văn minh.',
          en: 'Short, engaging lessons on smart and safe social media habits.',
        },
        to: withAudience('/academy', 'young'),
        accent: 'bg-blue-400/15 text-blue-600 dark:text-blue-300',
      },
      {
        icon: Scale,
        title: { vi: 'Hiểu luật để tự bảo vệ', en: 'Law & Rights' },
        text: {
          vi: 'Quyền riêng tư trẻ em, cách tố cáo hành vi bắt nạt qua mạng và quy định an toàn mạng dễ hiểu.',
          en: 'Child privacy rights, cyberbullying reporting channels, and simple digital laws.',
        },
        to: withAudience('/tools/knowledge', 'young'),
        accent: 'bg-violet-400/15 text-violet-600 dark:text-violet-300',
      },
    ],
    scams: [
      {
        id: 'teen-free-game-items',
        icon: Gamepad2,
        title: {
          vi: 'Bẫy tặng Skin, Robux & Nạp thẻ game miễn phí',
          en: 'Free game skin & top-up traps',
        },
        situation: {
          vi: 'Tin nhắn trên Discord, TikTok, Roblox hứa tặng kim cương, Robux hoặc skin súng/nhân vật hot nếu bạn đăng nhập tài khoản vào một trang web lạ.',
          en: 'Messages promise free Robux, diamonds, or rare skins if you log in through an external website link.',
        },
        safeMove: {
          vi: 'Tuyệt đối không nhập tài khoản hay mật khẩu ngoài ứng dụng game chính thức; chụp màn hình lại và chặn tài khoản gửi tin nhắn.',
          en: 'Never enter your credentials outside official game apps; take a screenshot and block the sender immediately.',
        },
      },
      {
        id: 'teen-fake-idol-giveaway',
        icon: Sparkles,
        title: {
          vi: 'Mạo danh Idol, Streamer tổ chức Giveaway tặng quà',
          en: 'Fake idol & streamer giveaway scams',
        },
        situation: {
          vi: 'Tài khoản có tên và avatar giống hệt streamer bạn thích nhắn tin riêng báo bạn trúng iPhone/iPad, yêu cầu chuyển trước 50k-200k "phí vận chuyển".',
          en: 'An account pretending to be a famous streamer DMs you saying you won an iPhone, asking for an upfront 50k-200k shipping fee.',
        },
        safeMove: {
          vi: 'Idol và Streamer thật không bao giờ nhắn riêng đòi tiền ship hay mã xác thực. Đừng gửi tiền hay mã thẻ cào cho bất kỳ ai!',
          en: 'Real creators never DM asking for shipping fees or OTP codes. Never send money or scratch cards to anyone!',
        },
      },
      {
        id: 'teen-vote-link-hijack',
        icon: LinkIcon,
        title: {
          vi: 'Nhờ bấm link bình chọn cuộc thi để cướp nick',
          en: 'Contest voting link account hijack',
        },
        situation: {
          vi: 'Tài khoản bạn học nhắn: "Vote giúp em mình thi tài năng với nhé", bấm vào xuất hiện trang yêu cầu đăng nhập lại Facebook, Zalo hoặc TikTok.',
          en: 'A classmate’s account asks you to vote in a talent contest; clicking opens a fake page asking for your social login.',
        },
        safeMove: {
          vi: 'Gọi điện thoại hoặc hỏi trực tiếp người bạn đó; nếu lỡ nhập thông tin, hãy đổi mật khẩu tài khoản ngay và bật xác thực 2 lớp.',
          en: 'Call or ask your friend in person; if you already entered details, change your password immediately and turn on 2FA.',
        },
      },
      {
        id: 'teen-private-chat-grooming',
        icon: Users,
        title: {
          vi: 'Người lạ làm quen, gạ rời nhóm để chat riêng',
          en: 'Stranger invites you to private chats',
        },
        situation: {
          vi: 'Người mới quen trên game khen bạn chơi hay, rủ sang Telegram/Zalo chat kín, sau đó gạ hỏi địa chỉ nhà, trường học, lịch học hoặc xin ảnh cá nhân.',
          en: 'A stranger on a game praises your skills, asks to chat on Telegram/Zalo, then inquires about your address, school, or photos.',
        },
        safeMove: {
          vi: 'Không bao giờ chia sẻ đời tư với người lạ qua mạng; hãy chặn tài khoản ngay khi thấy bị thúc ép và kể cho bố mẹ hoặc thầy cô.',
          en: 'Never share private details with online strangers; block them as soon as you feel pressured and inform your parents.',
        },
      },
      {
        id: 'teen-edited-image-threat',
        icon: ShieldAlert,
        title: {
          vi: 'Bị đe dọa bằng ảnh ghép AI (Deepfake)',
          en: 'Blackmail with AI-generated or edited photos',
        },
        situation: {
          vi: 'Kẻ xấu lấy ảnh mặt của bạn trên Facebook ghép vào hình ảnh xấu rồi dọa gửi cho bạn bè cùng lớp nếu bạn không chuyển tiền hoặc gửi thẻ nạp.',
          en: 'Scammers take your social photos, edit them into inappropriate contexts, and threaten to show classmates unless you pay.',
        },
        safeMove: {
          vi: 'Tuyệt đối KHÔNG chuyển tiền và KHÔNG thương lượng! Chụp màn hình bằng chứng, khóa trang cá nhân và nhờ bố mẹ/thầy cô can thiệp ngay.',
          en: 'NEVER pay or negotiate! Screenshot the evidence, lock your profile, and ask parents or teachers for help immediately.',
        },
      },
      {
        id: 'teen-fake-school-contest',
        icon: BookOpen,
        title: {
          vi: 'Cuộc thi, câu lạc bộ online đòi nộp lệ phí lạ',
          en: 'Fake online competitions & club fees',
        },
        situation: {
          vi: 'Lời mời tham gia thử giọng, mẫu ảnh nhí hoặc giải đấu game yêu cầu nộp ảnh giấy khai sinh/CCCD của bố mẹ hoặc đóng tiền cọc giữ chỗ.',
          en: 'Invitations to auditions, model contests, or gaming tournaments ask for parents’ IDs or a deposit fee to secure a spot.',
        },
        safeMove: {
          vi: 'Đưa thông tin cho bố mẹ kiểm tra với nhà trường hoặc ban tổ chức chính thống; tuyệt đối không tự chuyển tiền vào tài khoản cá nhân.',
          en: 'Show the invitation to your parents to verify with official organizers; never transfer money to personal bank accounts.',
        },
      },
    ],
  },
  old: {
    badge: {
      vi: 'Chế độ Người lớn 40+ (Phụ huynh & Người cao tuổi)',
      en: 'Adults 40+ Mode (Parents & Seniors)',
    },
    navLabel: { vi: 'Người lớn 40+', en: 'Adults 40+' },
    title: {
      vi: 'Cẩm nang phòng vệ lừa đảo trực tuyến & cuộc gọi mạo danh',
      en: 'Online fraud & phone impersonation defense handbook',
    },
    description: {
      vi: 'Thiết kế chữ to, dễ đọc, thao tác đơn giản, loại bỏ hoàn toàn các thuật ngữ khó hiểu. Bình tĩnh dừng lại 3 phút trước mọi cuộc gọi đe dọa, giục chuyển tiền hoặc báo tin người thân gặp nạn.',
      en: 'Large readable text, simple actions, zero technical jargon. Pause for 3 minutes before any threatening call, urgent transfer request, or emergency alert.',
    },
    primary: {
      label: { vi: 'Đường dây nóng khẩn cấp', en: 'Emergency hotlines' },
      to: '#hotline',
      icon: PhoneCall,
    },
    secondary: {
      label: { vi: '6 Kịch bản lừa đảo', en: '6 Scam scenarios' },
      to: '#kich-ban',
      icon: Target,
    },
    metrics: [
      {
        value: '0',
        label: {
          vi: 'cuộc làm việc của Công an qua điện thoại hay Zalo',
          en: 'official police investigations over phone',
        },
      },
      {
        value: '3 phút',
        label: {
          vi: 'bình tĩnh cúp máy và gọi lại kiểm tra con cháu',
          en: 'minutes to hang up and call back family',
        },
      },
      {
        value: '113 & 156',
        label: {
          vi: 'đường dây nóng ứng cứu & tố giác 24/7',
          en: 'official 24/7 emergency hotlines',
        },
      },
    ],
    principles: [
      {
        title: {
          vi: 'Công an, Viện kiểm sát KHÔNG BAO GIỜ làm việc qua điện thoại',
          en: 'Police & Prosecutors NEVER investigate over the phone',
        },
        detail: {
          vi: 'Cơ quan nhà nước không bao giờ gọi điện yêu cầu chuyển tiền vào "tài khoản an toàn" để điều tra. Mọi cuộc gọi như vậy đều là lừa đảo 100%!',
          en: 'Law enforcement agencies never call or use Zalo to demand transfers into "safe accounts". It is 100% fraud!',
        },
      },
      {
        title: {
          vi: 'Nghe giọng con cháu gặp nạn đòi tiền: CÚP MÁY VÀ GỌI LẠI NGAY',
          en: 'Urgent family emergency calls: HANG UP AND CALL BACK',
        },
        detail: {
          vi: 'Kẻ xấu dùng AI giả giọng giống hệt người thân đang khóc lóc, hoảng loạn. Hãy cúp máy, dùng số điện thoại thường ngày của con cháu để gọi lại kiểm tra.',
          en: 'Scammers clone voices using AI. Hang up immediately and dial your relative’s usual phone number to confirm.',
        },
      },
      {
        title: {
          vi: 'Tuyệt đối KHÔNG đọc mã OTP, KHÔNG cài app theo lời hướng dẫn',
          en: 'NEVER share OTP codes or install apps recommended over calls',
        },
        detail: {
          vi: 'Ngân hàng không bao giờ hỏi mã OTP. Tuyệt đối không bấm link lạ hay tải các ứng dụng (VNeID giả, Dịch vụ công giả) từ tin nhắn hay cuộc gọi.',
          en: 'Banks never request OTP. Never click strange links or install fake public service apps sent by strangers.',
        },
      },
    ],
    features: [
      {
        icon: Target,
        title: { vi: 'Kịch bản lừa đảo thực tế', en: 'Real Scam Scenarios' },
        text: {
          vi: 'Tập nhận diện các cuộc gọi giả danh công an, ngân hàng, người thân cấp cứu và bẫy cài app độc hại.',
          en: 'Practice recognizing fake police, bank, hospital emergency calls, and malware app traps.',
        },
        to: withAudience('/challenge?mode=simulator', 'old'),
        accent: 'bg-emerald-500/15 text-emerald-700 dark:text-emerald-300',
      },
      {
        icon: FileSearch,
        title: { vi: 'Bảng kiểm tra dấu hiệu nghi vấn', en: 'Suspicion Checklist' },
        text: {
          vi: 'Checklist hỏi nhanh từng dấu hiệu hối thúc, sai lệch thông tin và giọng nói giả mạo.',
          en: 'Quick questionnaire to spot urgency pressure, fake claims, and cloned voice indicators.',
        },
        to: withAudience('/tools/scan', 'old'),
        accent: 'bg-blue-500/15 text-blue-700 dark:text-blue-300',
      },
      {
        icon: PhoneCall,
        title: { vi: 'Hướng dẫn ứng cứu & Khóa thẻ', en: 'Emergency Help & Card Lock' },
        text: {
          vi: 'Các bước gọi ngay ngân hàng khóa tài khoản và liên hệ cơ quan chức năng khi lỡ chuyển tiền.',
          en: 'Step-by-step instructions to lock bank cards and report incidents if money was sent.',
        },
        to: withAudience('/tools/crisis', 'old'),
        accent: 'bg-rose-500/15 text-rose-700 dark:text-rose-300',
      },
      {
        icon: Scale,
        title: { vi: 'Kiến thức an toàn & Kênh tố giác', en: 'Safety Knowledge & Reporting' },
        text: {
          vi: 'Danh sách các số điện thoại tiếp nhận tố giác lừa đảo của Cục An toàn thông tin và Bộ Công an.',
          en: 'Official hotlines of the Ministry of Public Security and Cyber Security Bureau.',
        },
        to: withAudience('/tools/knowledge', 'old'),
        accent: 'bg-violet-500/15 text-violet-700 dark:text-violet-300',
      },
      {
        icon: Users,
        title: { vi: 'Về dự án phòng vệ DEEPFENSE', en: 'About DEEPFENSE Project' },
        text: {
          vi: 'Dự án phi lợi nhuận hướng tới bảo vệ cộng đồng và người cao tuổi trước hiểm họa lừa đảo số.',
          en: 'Non-profit project protecting families and seniors from digital fraud and deepfake risks.',
        },
        to: withAudience('/contact', 'old'),
        accent: 'bg-slate-500/15 text-slate-700 dark:text-slate-300',
      },
    ],
    scams: [
      {
        id: 'old-police-bank-impersonation',
        icon: Scale,
        title: {
          vi: 'Mạo danh Công an, Viện Kiểm sát dọa dính án ma túy/rửa tiền',
          en: 'Police or prosecutor impersonation demanding funds',
        },
        situation: {
          vi: 'Cuộc gọi tự xưng điều tra viên, đọc đúng họ tên và số CCCD, dọa có lệnh bắt giam và ép cô chú chuyển toàn bộ tiền tiết kiệm vào "tài khoản cơ quan điều tra" để chứng minh vô tội.',
          en: 'Callers pose as investigators, recite your ID, threaten arrest, and demand your savings transferred to an "investigation account" to prove innocence.',
        },
        safeMove: {
          vi: 'Cúp máy ngay lập tức! Cơ quan nhà nước chỉ gửi giấy mời hoặc làm việc trực tiếp tại trụ sở. Đến ngay Công an phường/xã gần nhất nếu thấy lo lắng.',
          en: 'Hang up immediately! Government agencies only send written notices and meet in person at headquarters. Visit your local police station if concerned.',
        },
      },
      {
        id: 'old-ai-voice-family-emergency',
        icon: PhoneCall,
        title: {
          vi: 'Cuộc gọi AI giả giọng con cháu tai nạn, cấp cứu bệnh viện',
          en: 'AI voice clone family emergency calls',
        },
        situation: {
          vi: 'Giọng nói khóc mếu máo giống hệt con cháu báo bị tai nạn giao thông nặng hoặc bị giữ ở đồn, bác sĩ giả yêu cầu gia đình chuyển tiền tạm ứng mổ gấp.',
          en: 'A voice crying just like your child reports a severe accident, with a fake doctor demanding immediate hospital surgery deposits.',
        },
        safeMove: {
          vi: 'Bình tĩnh cúp máy ngay! Dùng số điện thoại thường ngày của con cháu hoặc gọi cho người thân khác trong nhà để xác minh trước khi làm bất cứ việc gì.',
          en: 'Stay calm and hang up! Call your relative directly on their familiar number or contact another family member before taking any action.',
        },
      },
      {
        id: 'old-remote-support-app',
        icon: Smartphone,
        title: {
          vi: 'Mạo danh cán bộ hướng dẫn cài đặt VNeID, dịch vụ công mức 2',
          en: 'Fake public service & VNeID installation apps',
        },
        situation: {
          vi: 'Người tự xưng cán bộ phường/thuế gọi điện giục cập nhật dữ liệu dân cư, gửi đường link tải app lạ (.apk) khiến điện thoại bị chiếm quyền điều khiển và rút sạch tiền.',
          en: 'A caller claiming to be a civil servant urges an identity update, sending a link to an APK app that takes remote control and drains bank funds.',
        },
        safeMove: {
          vi: 'Tuyệt đối không bấm link lạ và không cài app theo hướng dẫn qua điện thoại. Chỉ cập nhật định danh trực tiếp tại trụ sở Công an.',
          en: 'Never tap strange links or install apps by phone instruction. Only update identity documents in person at police offices.',
        },
      },
      {
        id: 'old-investment-profit-scam',
        icon: ShieldCheck,
        title: {
          vi: 'Rủ rê đầu tư chứng khoán quốc tế, sinh lời 30-50%/ngày',
          en: 'High-yield investment & fake trading platforms',
        },
        situation: {
          vi: 'Nhóm chat khoe lãi tiền tỷ mỗi ngày, "chuyên gia tài chính" cam kết bao lãi khủng, ban đầu cho rút ít tiền rồi dụ nạp thêm số tiền lớn và khóa luôn tài khoản.',
          en: 'Chat groups show huge fake profits with "experts" guaranteeing returns, letting you withdraw small amounts before seizing large deposits.',
        },
        safeMove: {
          vi: 'Không có kênh đầu tư hợp pháp nào cam kết sinh lời cao bất thường. Tuyệt đối không chuyển tiền vào tài khoản cá nhân của người tự xưng là chuyên gia.',
          en: 'No legitimate investment promises abnormal returns. Never transfer money to personal accounts of online "experts".',
        },
      },
      {
        id: 'old-romance-charity-prize',
        icon: HeartHandshake,
        title: {
          vi: 'Làm quen tình cảm, gửi bưu phẩm quà tặng từ nước ngoài',
          en: 'Romance & foreign customs package fee scams',
        },
        situation: {
          vi: 'Người quen qua mạng tự xưng là bác sĩ/kỹ sư nước ngoài gửi thùng quà giá trị lớn về Việt Nam, sau đó yêu cầu cô chú đóng "tiền phí hải quan/phí thông quan".',
          en: 'An online contact claiming to be an overseas professional sends valuable gifts, then demands payments for customs clearance fees.',
        },
        safeMove: {
          vi: 'Tuyệt đối không gửi tiền cho người quen qua mạng xã hội. Cơ quan Hải quan không bao giờ thu phí qua tài khoản ngân hàng cá nhân.',
          en: 'Never send money to anyone met on social media. Customs departments never collect fees via personal bank accounts.',
        },
      },
      {
        id: 'old-deepfake-livestream-shopping',
        icon: LinkIcon,
        title: {
          vi: 'Quảng cáo thần dược, sữa non trị xương khớp ghép mặt bác sĩ nổi tiếng',
          en: 'Fake doctor endorsement & miracle cure ads',
        },
        situation: {
          vi: 'Video dùng công nghệ Deepfake cắt ghép mặt các giáo sư, bác sĩ đầu ngành để bán thuốc đông y, sữa tiểu đường, cam kết trị dứt điểm bách bệnh với giá cao.',
          en: 'Deepfake videos use faces of renowned doctors to sell unverified supplements claiming to cure all ailments at steep prices.',
        },
        safeMove: {
          vi: 'Chỉ khám chữa bệnh và mua thuốc tại bệnh viện, nhà thuốc được cấp phép theo đơn của bác sĩ thật.',
          en: 'Only seek treatment and buy medicine from licensed hospitals and pharmacies with genuine doctor prescriptions.',
        },
      },
    ],
  },
};

const SelectorCard = ({ mode, lang }: { mode: FamilyAudience; lang: Language }) => {
  const isYoung = mode === 'young';
  const Icon = isYoung ? GraduationCap : HeartHandshake;
  const isVi = lang === 'vi';

  const title = isYoung
    ? { vi: 'Thiếu Niên (Dưới 18)', en: 'Teens (Under 18)' }
    : { vi: 'Người Lớn (40+)', en: 'Adults (40+)' };

  const badgeText = isYoung
    ? { vi: 'Thiếu nhi và thanh thiếu niên', en: 'Kids & Teens' }
    : { vi: 'Phụ huynh, Cô Chú & Ông Bà', en: 'Parents & Seniors' };

  const chips = isYoung
    ? [
        { icon: Gamepad2, label: isVi ? 'Bảo vệ nick game & tránh bẫy nạp thẻ ảo' : 'Protect gaming accounts & fake top-ups' },
        { icon: Swords, label: isVi ? 'Thử thách thám tử soi video & ảnh ghép AI' : 'Detective challenge: spot AI fakes' },
        { icon: ShieldAlert, label: isVi ? 'Ứng cứu khi bị đe dọa hoặc ép gửi ảnh' : 'Crisis help: blackmail & threat defense' },
      ]
    : [
        { icon: PhoneCall, label: isVi ? 'Nhận diện cuộc gọi AI giả giọng con cháu' : 'Detect AI voice clone emergency calls' },
        { icon: Scale, label: isVi ? 'Cảnh giác bẫy mạo danh công an, tòa án dọa án' : 'Police & court extortion defense' },
        { icon: ShieldCheck, label: isVi ? 'Hotline 113, 156 & khóa thẻ ngân hàng 24/7' : '113, 156 & 24/7 bank card lock hotlines' },
      ];

  const buttonText = isYoung
    ? (isVi ? 'Vào Chế Độ Thiếu Niên' : 'Enter Teens Mode')
    : (isVi ? 'Vào Chế Độ Người Lớn 40+' : 'Enter Adults 40+ Mode');

  return (
    <Link
      to={getFamilyPath(mode)}
      className={`group relative flex flex-col justify-between overflow-hidden rounded-2xl border p-7 text-left transition-all duration-300 hover:-translate-y-1.5 hover:shadow-2xl sm:p-8 ${
        isYoung
          ? 'border-blue-300/60 bg-white/90 shadow-blue-500/10 hover:border-blue-500 hover:shadow-blue-500/20 dark:border-cyan-500/30 dark:bg-[#0b192e]/90 dark:hover:border-cyan-400 dark:hover:shadow-cyan-500/20'
          : 'border-emerald-300/60 bg-white/90 shadow-emerald-500/10 hover:border-emerald-500 hover:shadow-emerald-500/20 dark:border-emerald-500/30 dark:bg-[#081f1d]/90 dark:hover:border-emerald-400 dark:hover:shadow-emerald-500/20'
      }`}
    >
      {/* Subtle background glow */}
      <div
        className={`pointer-events-none absolute -right-16 -top-16 h-44 w-44 rounded-full blur-3xl transition-opacity duration-500 group-hover:opacity-100 ${
          isYoung ? 'bg-cyan-500/15 opacity-60' : 'bg-emerald-500/15 opacity-60'
        }`}
      />

      <div>
        <div className="flex items-center justify-between gap-4">
          <div
            className={`flex h-14 w-14 items-center justify-center rounded-2xl shadow-lg transition-transform duration-300 group-hover:scale-110 ${
              isYoung
                ? 'bg-gradient-to-br from-blue-500 to-cyan-500 text-white shadow-cyan-500/30'
                : 'bg-gradient-to-br from-emerald-600 to-teal-500 text-white shadow-emerald-500/30'
            }`}
          >
            <Icon size={28} />
          </div>
          <span
            className={`rounded-full px-3 py-1 text-xs font-black uppercase tracking-wider ${
              isYoung
                ? 'border border-blue-200 bg-blue-50 text-blue-700 dark:border-cyan-400/30 dark:bg-cyan-400/10 dark:text-cyan-300'
                : 'border border-emerald-200 bg-emerald-50 text-emerald-800 dark:border-emerald-400/30 dark:bg-emerald-400/10 dark:text-emerald-300'
            }`}
          >
            {tr(badgeText, lang)}
          </span>
        </div>

        <h3 className="mt-6 text-2xl font-black tracking-tight text-slate-900 dark:text-white sm:text-3xl">
          {tr(title, lang)}
        </h3>

        {/* Carefully curated highlights */}
        <div className="mt-6 space-y-3 border-t border-slate-100 pt-5 dark:border-white/10">
          {chips.map((chip, idx) => {
            const ChipIcon = chip.icon;
            return (
              <div
                key={idx}
                className="flex items-center gap-3 text-sm font-semibold text-slate-700 dark:text-slate-200"
              >
                <div
                  className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-lg ${
                    isYoung ? 'bg-blue-100/70 text-blue-600 dark:bg-cyan-500/20 dark:text-cyan-300' : 'bg-emerald-100/70 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-300'
                  }`}
                >
                  <ChipIcon size={15} />
                </div>
                <span>{chip.label}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Prominent CTA button */}
      <div
        className={`mt-8 flex items-center justify-between rounded-xl px-5 py-3.5 text-sm font-black transition-colors ${
          isYoung
            ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20 group-hover:bg-blue-700 dark:bg-cyan-500 dark:text-slate-950 dark:group-hover:bg-cyan-400'
            : 'bg-emerald-600 text-white shadow-md shadow-emerald-500/20 group-hover:bg-emerald-700 dark:bg-emerald-500 dark:text-slate-950 dark:group-hover:bg-emerald-400'
        }`}
      >
        <span>{buttonText}</span>
        <ArrowRight className="transition-transform duration-300 group-hover:translate-x-1.5" size={18} />
      </div>
    </Link>
  );
};

const FamilySelector = ({
  lang,
  setLang,
  theme,
  toggleTheme,
}: {
  lang: Language;
  setLang?: (lang: Language) => void;
  theme?: ThemeMode;
  toggleTheme?: () => void;
}) => {
  const isVi = lang === 'vi';

  return (
    <section className="relative flex min-h-screen flex-col justify-between overflow-hidden bg-slate-50 px-4 py-6 text-slate-950 dark:bg-[#050c18] dark:text-white sm:px-6 lg:px-8">
      {/* Decorative ambient background glows */}
      <div className="pointer-events-none absolute left-1/2 top-10 -translate-x-1/2 -translate-y-1/2 h-96 w-[700px] rounded-full bg-blue-500/10 blur-[120px] dark:bg-cyan-500/10" />
      <div className="pointer-events-none absolute left-10 top-1/2 h-80 w-80 rounded-full bg-cyan-500/10 blur-[100px]" />
      <div className="pointer-events-none absolute right-10 top-1/2 h-80 w-80 rounded-full bg-emerald-500/10 blur-[100px]" />

      {/* Top minimal header: Brand logo on left, Language & Theme toggle on right (NO tab header) */}
      <header className="relative z-15 mx-auto flex w-full max-w-6xl items-center justify-between pb-4">
        <a href={getExperienceHref('portal')} className="flex items-center gap-3">
          <img
            src="/logo/android-chrome-192x192.png"
            alt="DEEPFENSE"
            className="h-10 w-10 rounded-2xl shadow-lg shadow-cyan-400/20"
          />
          <div>
            <span className="text-lg font-black tracking-tight text-slate-950 dark:text-white">DEEPFENSE</span>
            <span className="ml-2 hidden text-xs font-bold text-slate-500 dark:text-slate-400 sm:inline">
              family.deepfense.online
            </span>
          </div>
        </a>

        <div className="flex items-center gap-2">
          {setLang && (
            <div className="flex rounded-full border border-slate-200 bg-white/80 p-0.5 text-xs font-bold shadow-sm backdrop-blur dark:border-white/10 dark:bg-white/10">
              <button
                type="button"
                onClick={() => setLang('vi')}
                className={`rounded-full px-2.5 py-1 transition ${
                  lang === 'vi' ? 'bg-blue-600 text-white shadow-sm' : 'text-slate-500 hover:text-slate-950 dark:text-slate-400 dark:hover:text-white'
                }`}
              >
                VI
              </button>
              <button
                type="button"
                onClick={() => setLang('en')}
                className={`rounded-full px-2.5 py-1 transition ${
                  lang === 'en' ? 'bg-blue-600 text-white shadow-sm' : 'text-slate-500 hover:text-slate-950 dark:text-slate-400 dark:hover:text-white'
                }`}
              >
                EN
              </button>
            </div>
          )}

          {toggleTheme && (
            <button
              type="button"
              onClick={toggleTheme}
              className="flex h-8 w-8 items-center justify-center rounded-full border border-slate-200 bg-white/80 text-slate-700 shadow-sm backdrop-blur transition hover:border-blue-400 dark:border-white/10 dark:bg-white/10 dark:text-slate-200"
              aria-label="Toggle Theme"
            >
              {theme === 'dark' ? <Sun size={15} /> : <Moon size={15} />}
            </button>
          )}
        </div>
      </header>

      {/* Main Centered Simulated Gateway Canvas */}
      <main className="relative z-10 mx-auto my-auto flex w-full max-w-5xl flex-col items-center py-6 text-center">
        {/* Gateway Tag */}
        <div className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-white/80 px-4 py-1.5 text-xs font-black uppercase tracking-wider text-blue-700 shadow-sm backdrop-blur-md dark:border-cyan-500/30 dark:bg-white/10 dark:text-cyan-300">
          <HeartHandshake size={15} />
          <span>{isVi ? 'CỔNG GIẢ LẬP GIA ĐÌNH • FAMILY GATEWAY' : 'FAMILY SIMULATOR GATEWAY'}</span>
        </div>

        {/* Headline */}
        <h1 className="mt-5 max-w-3xl text-3xl font-black tracking-tight text-slate-950 dark:text-white sm:text-4xl lg:text-5xl">
          {isVi ? 'Chọn chế độ' : 'Select Experience'}
        </h1>

        {/* Subtitle */}
        <p className="mt-3.5 max-w-2xl text-base leading-relaxed text-slate-600 dark:text-slate-300 sm:text-lg">
          {isVi ? (
            <>
              Không gian phòng vệ mạng được tối ưu riêng biệt cho từng thế hệ.
              <br />
              Vui lòng chọn chế độ phù hợp để bắt đầu:
            </>
          ) : (
            <>
              Tailored cyber defense environment by generation.
              <br />
              Please select your mode to begin:
            </>
          )}
        </p>

        {/* Exactly 2 carefully curated cards */}
        <div className="mt-9 grid w-full max-w-4xl gap-6 md:grid-cols-2">
          <SelectorCard mode="young" lang={lang} />
          <SelectorCard mode="old" lang={lang} />
        </div>

        {/* Centered Trust Indicators */}
        <div className="mt-10 flex flex-wrap items-center justify-center gap-6 text-xs font-bold text-slate-500 dark:text-slate-400">
          <div className="flex items-center gap-2">
            <CheckCircle2 size={16} className="text-emerald-500" />
            <span>{isVi ? '100% Phi lợi nhuận & Miễn phí' : '100% Free & Non-profit'}</span>
          </div>
          <span className="hidden sm:inline">•</span>
          <div className="flex items-center gap-2">
            <Lock size={16} className="text-blue-500" />
            <span>{isVi ? 'Không thu thập dữ liệu cá nhân' : 'Zero personal data collection'}</span>
          </div>
          <span className="hidden sm:inline">•</span>
          <div className="flex items-center gap-2">
            <ShieldCheck size={16} className="text-cyan-500" />
            <span>{isVi ? 'Bảo trợ bởi dự án DEEPFENSE' : 'Powered by DEEPFENSE'}</span>
          </div>
        </div>
      </main>

      {/* Gateway footer */}
      <footer className="relative z-10 mx-auto flex w-full max-w-6xl flex-wrap items-center justify-center gap-4 border-t border-slate-200/80 pt-4 text-xs font-bold text-slate-500 dark:border-white/10 dark:text-slate-400">
        <div className="flex items-center gap-3">
          <a
            href={getExperienceHref('portal')}
            className="text-blue-600 transition hover:underline dark:text-cyan-300"
          >
            {isVi ? '← Về cổng deepfense.online' : '← Back to deepfense.online'}
          </a>
          <span>•</span>
          <a
            href={getExperienceHref('main')}
            className="transition hover:text-slate-900 dark:hover:text-white"
          >
            {isVi ? 'Mở bản chính đầy đủ' : 'Open full main version'}
          </a>
        </div>
      </footer>
    </section>
  );
};

const FamilyLanding = ({
  lang,
  setLang,
  theme,
  toggleTheme,
  mode = null,
}: FamilyLandingProps) => {
  if (!mode) {
    return (
      <FamilySelector
        lang={lang}
        setLang={setLang}
        theme={theme}
        toggleTheme={toggleTheme}
      />
    );
  }

  const isVi = lang === 'vi';
  const isYoung = mode === 'young';
  const active = content[mode];
  const PrimaryIcon = active.primary.icon;
  const SecondaryIcon = active.secondary.icon;
  const otherMode: FamilyAudience = isYoung ? 'old' : 'young';

  return (
    <section className="min-h-screen bg-slate-50 text-slate-950 dark:bg-[#07111f] dark:text-white">
      {/* Hero Section */}
      <div className="border-b border-slate-200/80 bg-white/80 dark:border-white/10 dark:bg-[#07111f]/90">
        <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
          <div className="grid gap-8 lg:grid-cols-[minmax(0,1.25fr)_1fr] lg:items-center">
            <div>
              <div
                className={`inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 text-xs font-black uppercase tracking-wider ${
                  isYoung
                    ? 'border border-blue-200 bg-blue-50 text-blue-700 dark:border-cyan-400/30 dark:bg-cyan-400/10 dark:text-cyan-300'
                    : 'border border-emerald-200 bg-emerald-50 text-emerald-800 dark:border-emerald-400/30 dark:bg-emerald-400/10 dark:text-emerald-300'
                }`}
              >
                {isYoung ? <Gamepad2 size={15} /> : <ShieldCheck size={15} />}
                {tr(active.badge, lang)}
              </div>

              <h1 className="mt-4 text-3xl font-black leading-tight tracking-tight text-slate-900 dark:text-white sm:text-4xl lg:text-5xl">
                {tr(active.title, lang)}
              </h1>

              <p className="mt-4 max-w-2xl text-base leading-relaxed text-slate-600 dark:text-slate-300 sm:text-lg">
                {tr(active.description, lang)}
              </p>

              {/* Action buttons */}
              <div className="mt-7 flex flex-wrap items-center gap-3">
                {active.primary.to.startsWith('#') ? (
                  <a
                    href={active.primary.to}
                    className={`inline-flex min-h-[48px] items-center justify-center gap-2 rounded-xl px-5 py-3 text-sm font-black text-white shadow-lg transition ${
                      isYoung
                        ? 'bg-blue-600 shadow-blue-600/25 hover:bg-blue-700 dark:bg-cyan-500 dark:text-slate-950 dark:hover:bg-cyan-400'
                        : 'bg-emerald-600 shadow-emerald-600/25 hover:bg-emerald-700 dark:bg-emerald-500 dark:text-slate-950 dark:hover:bg-emerald-400'
                    }`}
                  >
                    <PrimaryIcon size={18} />
                    {tr(active.primary.label, lang)}
                  </a>
                ) : (
                  <Link
                    to={active.primary.to}
                    className={`inline-flex min-h-[48px] items-center justify-center gap-2 rounded-xl px-5 py-3 text-sm font-black text-white shadow-lg transition ${
                      isYoung
                        ? 'bg-blue-600 shadow-blue-600/25 hover:bg-blue-700 dark:bg-cyan-500 dark:text-slate-950 dark:hover:bg-cyan-400'
                        : 'bg-emerald-600 shadow-emerald-600/25 hover:bg-emerald-700 dark:bg-emerald-500 dark:text-slate-950 dark:hover:bg-emerald-400'
                    }`}
                  >
                    <PrimaryIcon size={18} />
                    {tr(active.primary.label, lang)}
                  </Link>
                )}

                {active.secondary.to.startsWith('#') ? (
                  <a
                    href={active.secondary.to}
                    className="inline-flex min-h-[48px] items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-black text-slate-800 shadow-sm transition hover:border-slate-400 dark:border-white/10 dark:bg-white/10 dark:text-white dark:hover:border-white/30"
                  >
                    <SecondaryIcon size={18} />
                    {tr(active.secondary.label, lang)}
                  </a>
                ) : (
                  <Link
                    to={active.secondary.to}
                    className="inline-flex min-h-[48px] items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-black text-slate-800 shadow-sm transition hover:border-slate-400 dark:border-white/10 dark:bg-white/10 dark:text-white dark:hover:border-white/30"
                  >
                    <SecondaryIcon size={18} />
                    {tr(active.secondary.label, lang)}
                  </Link>
                )}

                <Link
                  to={withAudience('/tools/crisis', mode)}
                  className="inline-flex min-h-[48px] items-center justify-center gap-2 rounded-xl border border-rose-300/60 bg-rose-50 px-5 py-3 text-sm font-black text-rose-700 transition hover:bg-rose-100 dark:border-rose-400/30 dark:bg-rose-500/10 dark:text-rose-200 dark:hover:bg-rose-500/20"
                >
                  <AlertTriangle size={18} />
                  {isVi ? 'Ứng cứu khẩn cấp' : 'Crisis Help'}
                </Link>
              </div>

              {/* Metrics: Equal height cards without dropped text */}
              <div className="mt-8 grid max-w-2xl grid-cols-3 gap-3">
                {active.metrics.map((metric, idx) => (
                  <div
                    key={idx}
                    className="flex flex-col justify-between min-h-[94px] rounded-2xl border border-slate-200/90 bg-white/90 p-4 shadow-sm backdrop-blur-md dark:border-white/10 dark:bg-white/[0.04]"
                  >
                    <div
                      className={`text-2xl sm:text-3xl font-black tracking-tight ${
                        isYoung ? 'text-blue-600 dark:text-cyan-300' : 'text-emerald-700 dark:text-emerald-300'
                      }`}
                    >
                      {metric.value}
                    </div>
                    <div className="mt-1 text-xs font-bold leading-snug text-slate-500 dark:text-slate-400">
                      {tr(metric.label, lang)}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 3 Golden Rules Box */}
            <aside
              className={`rounded-3xl border p-6 sm:p-7 shadow-xl backdrop-blur-xl ${
                isYoung
                  ? 'border-blue-200/80 bg-blue-50/70 dark:border-cyan-500/20 dark:bg-[#0b1b31]/90 shadow-blue-500/5'
                  : 'border-emerald-200/80 bg-emerald-50/70 dark:border-emerald-500/20 dark:bg-[#07211d]/90 shadow-emerald-500/5'
              }`}
            >
              <div className="flex items-center gap-2 pb-4 border-b border-slate-200/60 dark:border-white/10 text-xs font-black uppercase tracking-wider text-slate-800 dark:text-slate-200">
                <CheckCircle2 size={18} className={isYoung ? 'text-blue-600 dark:text-cyan-400' : 'text-emerald-600 dark:text-emerald-400'} />
                <span>{isVi ? '3 NGUYÊN TẮC VÀNG PHÒNG VỆ' : '3 GOLDEN SAFETY RULES'}</span>
              </div>

              <div className="mt-4 space-y-3.5">
                {active.principles.map((rule, idx) => (
                  <div
                    key={idx}
                    className="rounded-2xl border border-white/80 bg-white/95 p-4 shadow-xs transition-all duration-200 hover:shadow-sm dark:border-white/10 dark:bg-white/[0.05]"
                  >
                    <div className="flex items-start gap-3">
                      <span
                        className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-xl text-xs font-black text-white shadow-sm ${
                          isYoung ? 'bg-blue-600 dark:bg-cyan-500 dark:text-slate-950' : 'bg-emerald-600 dark:bg-emerald-500 dark:text-slate-950'
                        }`}
                      >
                        {idx + 1}
                      </span>
                      <div className="flex-1">
                        <h4 className="text-sm font-black leading-snug text-slate-900 dark:text-white">
                          {tr(rule.title, lang)}
                        </h4>
                        <p className="mt-1.5 text-xs font-medium leading-relaxed text-slate-600 dark:text-slate-300">
                          {tr(rule.detail, lang)}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </aside>
          </div>
        </div>
      </div>

      {/* Emergency Hotline for 40+ */}
      {!isYoung && (
        <div id="hotline" className="border-b border-rose-200/70 bg-gradient-to-b from-rose-50/80 via-white/80 to-rose-50/60 py-8 dark:border-rose-500/20 dark:bg-gradient-to-b dark:from-rose-950/25 dark:via-[#07111f] dark:to-transparent">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
              <div className="flex items-center gap-4 text-left">
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-rose-600 text-white shadow-lg shadow-rose-600/30">
                  <PhoneCall size={26} />
                </div>
                <div>
                  <span className="text-xs font-black uppercase tracking-wider text-rose-700 dark:text-rose-400">
                    {isVi ? 'ĐƯỜNG DÂY NÓNG ỨNG CỨU KHẨN CẤP 24/7' : '24/7 EMERGENCY ASSISTANCE HOTLINES'}
                  </span>
                  <h3 className="text-xl font-black text-slate-900 dark:text-white sm:text-2xl mt-0.5">
                    {isVi ? 'Nghi ngờ bị lừa hoặc lỡ chuyển tiền? Gọi ngay!' : 'Suspect fraud or already transferred funds? Call now!'}
                  </h3>
                </div>
              </div>

              <div className="flex flex-wrap gap-3 w-full md:w-auto">
                <a
                  href="tel:113"
                  className="inline-flex min-h-[46px] items-center justify-center gap-2 rounded-xl bg-rose-600 px-5 py-2.5 text-sm font-black text-white shadow-md shadow-rose-600/20 transition hover:bg-rose-700"
                >
                  <Phone size={16} />
                  <span>113 (Cảnh sát khẩn cấp)</span>
                </a>
                <a
                  href="tel:156"
                  className="inline-flex min-h-[46px] items-center justify-center gap-2 rounded-xl border border-rose-300 bg-white px-5 py-2.5 text-sm font-black text-rose-700 shadow-sm transition hover:bg-rose-50 dark:border-rose-400/30 dark:bg-white/10 dark:text-rose-200"
                >
                  <Phone size={16} />
                  <span>156 (Phản ánh lừa đảo)</span>
                </a>
              </div>
            </div>

            {/* Bank emergency hotlines: Equal height clean pill cards */}
            <div className="mt-6 grid grid-cols-2 gap-3 border-t border-rose-200/50 pt-5 text-xs sm:grid-cols-4 dark:border-rose-500/20">
              {[
                { bank: 'Vietcombank', phone: '1900 545413', tel: '1900545413' },
                { bank: 'Agribank', phone: '1900 558818', tel: '1900558818' },
                { bank: 'BIDV', phone: '1900 9247', tel: '19009247' },
                { bank: 'VietinBank', phone: '1900 558868', tel: '1900558868' },
              ].map((item, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between rounded-xl border border-rose-200/60 bg-white/90 px-3.5 py-2.5 shadow-2xs backdrop-blur-sm dark:border-rose-500/20 dark:bg-white/[0.04]"
                >
                  <span className="font-bold text-slate-700 dark:text-slate-300">{item.bank}:</span>
                  <a
                    href={`tel:${item.tel}`}
                    className="font-black text-rose-600 hover:underline dark:text-rose-400"
                  >
                    {item.phone}
                  </a>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Tools Section */}
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="mb-8">
          <p
            className={`text-xs font-black uppercase tracking-wider ${
              isYoung ? 'text-blue-600 dark:text-cyan-300' : 'text-emerald-700 dark:text-emerald-300'
            }`}
          >
            {isVi ? 'CÔNG CỤ HỮU ÍCH' : 'AVAILABLE SAFETY TOOLS'}
          </p>
          <h2 className="mt-1.5 text-2xl font-black tracking-tight text-slate-950 dark:text-white sm:text-3xl">
            {isVi ? 'Chức năng cần thiết đã được chọn lọc' : 'Essential tools tailored for this mode'}
          </h2>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {active.features.map((feature, idx) => {
            const FeatureIcon = feature.icon;
            return (
              <Link
                key={idx}
                to={feature.to}
                className="group flex flex-col justify-between rounded-3xl border border-slate-200/90 bg-white/90 p-6 shadow-sm backdrop-blur-md transition-all duration-300 hover:-translate-y-1.5 hover:border-blue-400 hover:shadow-xl dark:border-white/10 dark:bg-white/[0.045] dark:hover:border-cyan-400"
              >
                <div>
                  <div className={`flex h-13 w-13 items-center justify-center rounded-2xl ${feature.accent}`}>
                    <FeatureIcon size={24} />
                  </div>
                  <h3 className="mt-5 text-lg font-black tracking-tight text-slate-900 dark:text-white min-h-[3.25rem] flex items-center leading-snug">
                    {tr(feature.title, lang)}
                  </h3>
                  <p className="mt-2.5 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
                    {tr(feature.text, lang)}
                  </p>
                </div>
                <div
                  className={`mt-6 flex items-center justify-between border-t border-slate-100 pt-4 text-sm font-black dark:border-white/5 ${
                    isYoung ? 'text-blue-600 dark:text-cyan-300' : 'text-emerald-700 dark:text-emerald-300'
                  }`}
                >
                  <span>{isVi ? 'Mở chức năng' : 'Open tool'}</span>
                  <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-slate-100 text-slate-600 transition group-hover:bg-blue-600 group-hover:text-white dark:bg-white/10 dark:text-slate-300 dark:group-hover:bg-cyan-500 dark:group-hover:text-slate-950">
                    <ArrowRight size={14} className="transition-transform group-hover:translate-x-0.5" />
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>

      {/* 6 Scenarios Section */}
      <div id="kich-ban" className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8">
        <div className="mb-8">
          <div
            className={`inline-flex items-center gap-2 rounded-full px-3.5 py-1 text-xs font-black uppercase tracking-wider ${
              isYoung
                ? 'bg-amber-100 text-amber-800 dark:bg-amber-400/20 dark:text-amber-300'
                : 'bg-emerald-100 text-emerald-800 dark:bg-emerald-400/20 dark:text-emerald-300'
            }`}
          >
            <Target size={14} />
            <span>{isVi ? '6 KỊCH BẢN PHỔ BIẾN CẦN LUYỆN' : '6 SCENARIOS TO PRACTICE'}</span>
          </div>
          <h2 className="mt-2.5 text-2xl font-black tracking-tight text-slate-950 dark:text-white sm:text-3xl">
            {isYoung
              ? (isVi ? 'Các cạm bẫy mạng thường gặp với thiếu niên' : 'Common online traps targeting teens')
              : (isVi ? 'Các cạm bẫy thường nhắm vào người lớn 40+' : 'Common fraud traps targeting adults 40+')}
          </h2>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {active.scams.map((scam) => {
            const ScamIcon = scam.icon;
            return (
              <article
                key={scam.id}
                className="flex flex-col justify-between rounded-3xl border border-slate-200/90 bg-white/90 p-6 shadow-sm backdrop-blur-md transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl dark:border-white/10 dark:bg-white/[0.045] dark:hover:border-cyan-400/40"
              >
                {/* Header: Fixed min-height so titles never misalign following content */}
                <div className="flex items-center gap-3.5 pb-4 border-b border-slate-100 dark:border-white/5 min-h-[70px]">
                  <div
                    className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl shadow-xs ${
                      isYoung
                        ? 'bg-blue-100 text-blue-700 dark:bg-cyan-500/20 dark:text-cyan-300'
                        : 'bg-emerald-100 text-emerald-800 dark:bg-emerald-500/20 dark:text-emerald-300'
                    }`}
                  >
                    <ScamIcon size={24} />
                  </div>
                  <h3 className="text-base font-black leading-snug text-slate-900 dark:text-white">
                    {tr(scam.title, lang)}
                  </h3>
                </div>

                {/* Situation: flexible space absorption */}
                <div className="py-4 flex-1 flex flex-col justify-start">
                  <span className="text-[10px] font-black uppercase tracking-wider text-slate-400 dark:text-slate-500">
                    {isVi ? 'Tình huống lừa đảo:' : 'Scam situation:'}
                  </span>
                  <p className="mt-1 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
                    {tr(scam.situation, lang)}
                  </p>
                </div>

                {/* Safe Move Box: Unified styling, never floats */}
                <div
                  className={`rounded-2xl border p-4 shadow-2xs ${
                    isYoung
                      ? 'border-blue-200/80 bg-blue-50/80 text-blue-950 dark:border-cyan-500/20 dark:bg-cyan-950/30 dark:text-cyan-100'
                      : 'border-emerald-200/80 bg-emerald-50/80 text-emerald-950 dark:border-emerald-500/20 dark:bg-emerald-950/30 dark:text-emerald-100'
                  }`}
                >
                  <div className="flex items-center gap-1.5">
                    <ShieldCheck size={14} className={isYoung ? 'text-blue-600 dark:text-cyan-400' : 'text-emerald-600 dark:text-emerald-400'} />
                    <p
                      className={`text-[10px] font-black uppercase tracking-wider ${
                        isYoung ? 'text-blue-700 dark:text-cyan-300' : 'text-emerald-800 dark:text-emerald-300'
                      }`}
                    >
                      {isVi ? 'Cách xử lý an toàn:' : 'Safe response:'}
                    </p>
                  </div>
                  <p className="mt-1.5 text-xs font-bold leading-relaxed">
                    {tr(scam.safeMove, lang)}
                  </p>
                </div>

                {/* Action button */}
                <Link
                  to={`${withAudience('/challenge?mode=simulator', mode)}&scenario=${scam.id}`}
                  className={`mt-4 inline-flex min-h-[46px] w-full items-center justify-center gap-2 rounded-xl text-sm font-black shadow-xs transition-all duration-200 ${
                    isYoung
                      ? 'border border-blue-300 bg-blue-50 text-blue-700 hover:bg-blue-600 hover:text-white hover:shadow-md hover:shadow-blue-500/20 dark:border-cyan-500/30 dark:bg-cyan-500/10 dark:text-cyan-300 dark:hover:bg-cyan-500 dark:hover:text-slate-950'
                      : 'border border-emerald-300 bg-emerald-50 text-emerald-800 hover:bg-emerald-700 hover:text-white hover:shadow-md hover:shadow-emerald-500/20 dark:border-emerald-500/30 dark:bg-emerald-500/10 dark:text-emerald-300 dark:hover:bg-emerald-500 dark:hover:text-slate-950'
                  }`}
                >
                  <span>{isVi ? 'Luyện kịch bản này ngay' : 'Practice this scenario'}</span>
                  <ArrowRight size={16} />
                </Link>
              </article>
            );
          })}
        </div>
      </div>

      {/* Bottom Mode Switch & Return */}
      <div className="border-t border-slate-200/80 bg-white/80 py-6 backdrop-blur-md dark:border-white/10 dark:bg-[#07111f]/90">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 px-4 sm:px-6 lg:px-8 text-xs font-bold text-slate-500 dark:text-slate-400">
          <Link
            to="/family"
            className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 dark:text-cyan-300 dark:hover:text-cyan-200 font-black transition"
          >
            ← {isVi ? 'Quay lại Cổng chọn Gia đình' : 'Back to Family Gateway'}
          </Link>

          <div className="flex flex-wrap items-center gap-3">
            <span className="text-slate-500 dark:text-slate-400">
              {isVi ? 'Đang xem:' : 'Viewing:'}{' '}
              <span className={`inline-block rounded-md px-2 py-0.5 text-xs font-black ${
                isYoung
                  ? 'bg-blue-100 text-blue-700 dark:bg-cyan-500/20 dark:text-cyan-300'
                  : 'bg-emerald-100 text-emerald-800 dark:bg-emerald-500/20 dark:text-emerald-300'
              }`}>
                {isYoung ? (isVi ? '🧒 Thiếu niên' : '🧒 Teens') : (isVi ? '👨‍👩‍👧 Người lớn 40+' : '👨‍👩‍👧 Adults 40+')}
              </span>
            </span>
            <span>•</span>
            <Link
              to={getFamilyPath(otherMode)}
              className="inline-flex items-center gap-1 font-bold text-blue-600 hover:text-blue-700 dark:text-cyan-300 dark:hover:text-cyan-200 transition"
            >
              <span>{isYoung ? (isVi ? 'Đổi sang Người lớn 40+' : 'Switch to Adults 40+') : (isVi ? 'Đổi sang Thiếu niên' : 'Switch to Teens')}</span>
              <ChevronRight size={13} />
            </Link>
            <span>•</span>
            <a
              href={getExperienceHref('main')}
              className="hover:text-slate-900 dark:hover:text-white transition"
            >
              {isVi ? 'Bản chính deepfense.online' : 'Main deepfense.online'}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FamilyLanding;
