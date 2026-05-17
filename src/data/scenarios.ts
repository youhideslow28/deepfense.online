/**
 * DEEPFENSE.ONLINE — Phishing Simulation Scenarios
 * @copyright 2025 Ho Xuan Nguyen (25NS039)
 */

export interface ScenarioDefinition {
  id: string;
  level: 'basic' | 'medium' | 'advanced';
  category: 'financial' | 'family' | 'romance' | 'authority';
  reward: { fast: number; slow: number };
  fastThreshold: number;
  senderName: { vi: string; en: string };
  senderRole: { vi: string; en: string };
  senderInitials: string;
  avatarColor: string;
  icon: string;
  initialMessage: { vi: string; en: string };
  actionLabel: { vi: string; en: string };
  actionColor: string;
  failLesson: { vi: string; en: string };
  successLesson: { vi: string; en: string };
}

export const SCENARIOS: ScenarioDefinition[] = [
  {
    id: 'ceo-transfer-scam',
    level: 'basic',
    category: 'financial',
    reward: { fast: 10, slow: 5 },
    fastThreshold: 180,
    senderName: { vi: 'Trần Văn Hoàng (CEO)', en: 'Hoang Tran (CEO)' },
    senderRole: { vi: 'Giám đốc — ABC Company', en: 'Director — ABC Company' },
    senderInitials: 'TVH',
    avatarColor: 'from-blue-500 to-indigo-500',
    icon: '🏢',
    initialMessage: {
      vi: 'Chào em, anh là Hoàng (Giám đốc). Vẫn giữ quỹ cty đúng ko? Anh đang họp kẹt tiền thanh toán đối tác. Chuyển gấp 50 triệu vào STK: 123456789 - TRAN VAN HOANG - Vietcombank. Nhanh lên nhé.',
      en: "Hi, it's Hoang (CEO). Need 50M VND urgently to pay a partner invoice, I'm in a meeting. Transfer to: 123456789 - TRAN VAN HOANG - Vietcombank right now.",
    },
    actionLabel: { vi: 'XÁC NHẬN CHUYỂN', en: 'CONFIRM TRANSFER' },
    actionColor: 'bg-red-600 hover:bg-red-500',
    failLesson: {
      vi: 'Kẻ lừa đảo tạo ra áp lực thời gian và sự uy quyền khiến não bộ bỏ qua bước xác minh. CEO thật không bao giờ nhắn tin yêu cầu chuyển tiền gấp.',
      en: 'Scammers create time pressure and authority to bypass your verification logic. Real CEOs never text-demand urgent transfers.',
    },
    successLesson: {
      vi: 'Đúng rồi! Bất kỳ yêu cầu chuyển tiền qua tin nhắn đều phải xác minh bằng cuộc gọi thoại trực tiếp qua số điện thoại đã lưu.',
      en: 'Correct! Any money transfer request via text must be verified by a direct voice call to a known, saved number.',
    },
  },
  {
    id: 'bank-otp-scam',
    level: 'medium',
    category: 'financial',
    reward: { fast: 15, slow: 10 },
    fastThreshold: 180,
    senderName: { vi: 'Nguyễn Thu Hằng — BIDV', en: 'Thu Hang Nguyen — BIDV' },
    senderRole: { vi: 'Nhân viên hỗ trợ khách hàng 24/7', en: 'Customer Support — 24/7 Hotline' },
    senderInitials: 'NTH',
    avatarColor: 'from-emerald-500 to-teal-500',
    icon: '🏦',
    initialMessage: {
      vi: 'Chào anh/chị, em là Hằng từ bộ phận hỗ trợ BIDV. Hệ thống phát hiện tài khoản của anh/chị có giao dịch bất thường từ thiết bị lạ lúc 02:14 sáng nay. Để bảo vệ tài khoản, anh/chị vui lòng cung cấp mã OTP vừa được gửi để em khóa lệnh rút tiền đang chờ xử lý ngay ạ.',
      en: "Hello, this is Hang from BIDV Support. Our system detected suspicious activity on your account from an unknown device at 2:14 AM. To protect your funds, please share the OTP you just received so I can block the pending withdrawal immediately.",
    },
    actionLabel: { vi: 'CUNG CẤP OTP', en: 'PROVIDE OTP' },
    actionColor: 'bg-emerald-700 hover:bg-emerald-600',
    failLesson: {
      vi: 'Ngân hàng KHÔNG BAO GIỜ yêu cầu OTP qua điện thoại hay Zalo. OTP là mật khẩu một lần chỉ dành cho bạn — chia sẻ là mất tài khoản ngay lập tức.',
      en: 'Banks NEVER ask for your OTP over the phone or chat. OTP is a one-time password for your eyes only — sharing it means instant account takeover.',
    },
    successLesson: {
      vi: 'Chính xác! Ngân hàng thật không bao giờ hỏi OTP qua tin nhắn. Khi nghi ngờ, cúp máy và gọi lại số hotline chính thức ghi trên thẻ ngân hàng.',
      en: "Correct! Real banks never ask for OTP via message. When in doubt, hang up and call the official hotline printed on your bank card.",
    },
  },
  {
    id: 'family-emergency-scam',
    level: 'medium',
    category: 'family',
    reward: { fast: 15, slow: 10 },
    fastThreshold: 180,
    senderName: { vi: 'Bệnh viện Bạch Mai — Cấp cứu', en: 'Bach Mai Hospital — ER' },
    senderRole: { vi: 'Khoa Cấp Cứu — Phòng C12', en: 'Emergency Department — Ward C12' },
    senderInitials: 'BVM',
    avatarColor: 'from-rose-500 to-pink-600',
    icon: '🚨',
    initialMessage: {
      vi: 'Xin lỗi vì đã làm phiền. Đây là điều dưỡng khoa cấp cứu BV Bạch Mai. Người thân của anh/chị vừa được đưa vào cấp cứu do tai nạn giao thông, tình trạng nặng. Bác sĩ yêu cầu đặt cọc 15 triệu để mổ khẩn trước 30 phút nữa. Xin anh/chị chuyển gấp vào STK: 9988776655 - NGUYEN VAN AN - MB Bank. Ký tên phẫu thuật xong mới liên lạc được qua điện thoại ạ.',
      en: "Sorry to disturb you. This is a nurse from Bach Mai Hospital Emergency Room. Your family member was just brought in after a traffic accident — critical condition. The doctor requires a 15M VND deposit for emergency surgery within 30 minutes. Please transfer to: 9988776655 - NGUYEN VAN AN - MB Bank. The surgical team can't take calls until after prep.",
    },
    actionLabel: { vi: 'CHUYỂN TIỀN CỨU', en: 'TRANSFER TO SAVE THEM' },
    actionColor: 'bg-rose-700 hover:bg-rose-600',
    failLesson: {
      vi: 'Đây là kịch bản cổ điển đánh vào tình thương gia đình. Bệnh viện công không yêu cầu đặt cọc trước qua chuyển khoản tin nhắn. Luôn gọi lại cho người thân hoặc đến trực tiếp để xác minh.',
      en: 'This is a classic script targeting family bonds. Public hospitals never demand pre-payment deposits via text message. Always call the family member directly or go in person to verify.',
    },
    successLesson: {
      vi: 'Đúng! Kịch bản "người thân cấp cứu" khai thác tâm lý hoảng loạn. Hãy luôn gọi thẳng cho người thân đó và liên hệ bệnh viện qua số chính thức trước khi làm bất cứ điều gì.',
      en: 'Correct! The "family emergency" script exploits panic. Always call the family member directly and contact the hospital via their official number before taking any action.',
    },
  },
  {
    id: 'romance-scam',
    level: 'advanced',
    category: 'romance',
    reward: { fast: 20, slow: 15 },
    fastThreshold: 240,
    senderName: { vi: 'Alex Morgan', en: 'Alex Morgan' },
    senderRole: { vi: 'Kỹ sư dầu khí — đang công tác tại UAE', en: 'Petroleum Engineer — Currently in UAE' },
    senderInitials: 'AM',
    avatarColor: 'from-pink-500 to-rose-400',
    icon: '💌',
    initialMessage: {
      vi: 'Em yêu, anh nhớ em nhiều lắm. Anh đang gom hết tiền tiết kiệm để về Việt Nam gặp em tháng sau. Nhưng hải quan UAE vừa giữ lại gói quà anh gửi về cho em — họ yêu cầu nộp 20 triệu phí thông quan rồi mới được chuyển phát. Anh đang kẹt tiền vì đổi dự án. Em có thể chuyển tạm giúp anh không? Anh về là hoàn lại ngay, anh hứa.',
      en: "My love, I miss you so much. I've been saving up to come see you next month. But UAE customs just held my package — they're demanding 20M VND in clearance fees before releasing it. I'm short on cash because of a project change. Could you transfer it temporarily? I'll pay you back the moment I land, I promise.",
    },
    actionLabel: { vi: 'GỬI TIỀN GIÚP', en: 'SEND MONEY TO HELP' },
    actionColor: 'bg-pink-700 hover:bg-pink-600',
    failLesson: {
      vi: 'Romance scam xây dựng mối quan hệ giả tạo hàng tuần/tháng trước khi yêu cầu tiền. Không ai nên chuyển tiền cho người chưa gặp mặt trực tiếp, dù tình cảm có sâu đến đâu.',
      en: 'Romance scammers build fake relationships over weeks/months before asking for money. Never send money to someone you have never met in person, no matter how deep the emotional bond feels.',
    },
    successLesson: {
      vi: 'Xuất sắc! Đây là kịch bản romance scam điển hình — tình cảm giả, vấn đề bịa đặt, yêu cầu tiền khẩn. Không bao giờ gửi tiền cho người chưa gặp mặt trong thực tế.',
      en: 'Excellent! This is a classic romance scam — fake affection, fabricated problems, urgent money request. Never send money to someone you have not met in real life.',
    },
  },
  {
    id: 'fake-authority-scam',
    level: 'advanced',
    category: 'authority',
    reward: { fast: 20, slow: 15 },
    fastThreshold: 240,
    senderName: { vi: 'Thượng úy Trần Đức Minh', en: 'Lt. Tran Duc Minh' },
    senderRole: { vi: 'Cục An ninh mạng — Bộ Công an Việt Nam', en: 'Cybersecurity Division — Vietnam Ministry of Public Security' },
    senderInitials: 'TDM',
    avatarColor: 'from-red-700 to-red-500',
    icon: '🚔',
    initialMessage: {
      vi: 'Căn cứ Điều 48 Bộ luật Tố tụng hình sự, tài khoản ngân hàng và số điện thoại của anh/chị đã bị liên đới trong vụ án rửa tiền xuyên quốc gia mã số PA-2026-1104. Anh/chị CÓ QUYỀN nộp khoản bảo lãnh tạm thời 30 triệu để tránh lệnh tạm giam trong vòng 2 tiếng tới. Không hợp tác đồng nghĩa với việc chúng tôi sẽ phát lệnh bắt khẩn cấp. Bí mật điều tra — TUYỆT ĐỐI không được tiết lộ với ai.',
      en: "Pursuant to Article 48 of the Criminal Procedure Code, your bank account and phone number have been implicated in transnational money laundering case PA-2026-1104. You MAY post a 30M VND temporary bond to avoid a detention order within the next 2 hours. Non-cooperation will result in an emergency arrest warrant. This is a confidential investigation — DO NOT disclose this to anyone.",
    },
    actionLabel: { vi: 'NỘP TIỀN BẢO LÃNH', en: 'PAY BAIL BOND' },
    actionColor: 'bg-red-800 hover:bg-red-700',
    failLesson: {
      vi: 'Cơ quan công an KHÔNG BAO GIỜ yêu cầu nộp tiền qua chuyển khoản, không liên lạc qua Zalo/Messenger, và không yêu cầu giữ bí mật. Đây là thủ đoạn cực kỳ nguy hiểm khai thác nỗi sợ pháp luật.',
      en: "The police NEVER collect bail money via bank transfer, never contact via Zalo/Messenger, and never demand secrecy. This tactic exploits your fear of legal consequences.",
    },
    successLesson: {
      vi: 'Xuất sắc! Giả mạo công an là một trong những kịch bản nguy hiểm nhất. Cơ quan điều tra thật sẽ làm việc trực tiếp có giấy tờ, không bao giờ yêu cầu chuyển khoản hay giữ bí mật.',
      en: 'Outstanding! Impersonating law enforcement is one of the most dangerous scam types. Real investigators work in person with official documents — they never request wire transfers or demand secrecy.',
    },
  },
];
