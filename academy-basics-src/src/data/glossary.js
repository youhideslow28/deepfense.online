/**
 * glossary.js — Deepfake & cybersecurity glossary for DEEPFENSE BASIC.
 * Each entry: { id, term, module, category, definition }
 * module: which module introduces/uses the term (for contextual display)
 * category: 'concept' | 'technique' | 'threat' | 'rule' | 'tool'
 */

export const GLOSSARY = [
  // ── Module 1 — Concepts ────────────────────────────────────────
  {
    id: 'deepfake',
    term: 'Deepfake',
    module: 1,
    category: 'concept',
    definition:
      'Nội dung hình ảnh, âm thanh hoặc video được tạo ra hoặc chỉnh sửa bằng AI để mô phỏng người thật một cách giả mạo. Deepfake có thể đặt lời nói, khuôn mặt hoặc hành động vào miệng và thân thể của người không hề nói hay làm những điều đó.',
  },
  {
    id: 'synthetic-media',
    term: 'Synthetic media (Nội dung tổng hợp)',
    module: 1,
    category: 'concept',
    definition:
      'Bất kỳ nội dung âm thanh, hình ảnh hoặc video nào được tạo ra hoàn toàn hoặc một phần bởi AI, không nhất thiết là giả mạo người thật. Synthetic media bao gồm deepfake, ảnh AI-generated, giọng nói tổng hợp, và nhiều loại khác.',
  },
  {
    id: 'deepvoice',
    term: 'Deepvoice (Giọng nói nhân tạo)',
    module: 1,
    category: 'technique',
    definition:
      'Công nghệ AI tổng hợp hoặc nhái giọng nói của một người dựa trên mẫu giọng gốc. Chỉ cần vài giây ghi âm, AI có thể tạo ra giọng giả mạo nói bất kỳ điều gì. Đây là công cụ phổ biến trong các vụ lừa đảo giả danh người thân.',
  },
  {
    id: 'face-swap',
    term: 'Face swap (Hoán đổi khuôn mặt)',
    module: 1,
    category: 'technique',
    definition:
      'Kỹ thuật ghép khuôn mặt của một người vào khuôn mặt của người khác trong ảnh hoặc video theo thời gian thực. Face swap thường tạo ra hiện tượng nhấp nháy, mờ viền, hoặc ánh sáng không khớp tại vùng khuôn mặt.',
  },
  {
    id: 'lip-sync',
    term: 'Lip sync (Đồng bộ môi)',
    module: 1,
    category: 'technique',
    definition:
      'Kỹ thuật AI làm cho miệng của một người trong video khớp với âm thanh được tạo ra hoặc chỉnh sửa. Thường kết hợp với deepvoice để tạo ra video giả mạo toàn diện, rất khó phân biệt bằng mắt thường.',
  },
  {
    id: 'edited-media',
    term: 'Edited media (Nội dung chỉnh sửa)',
    module: 1,
    category: 'concept',
    definition:
      'Nội dung thật được cắt ghép, chỉnh sửa hoặc thay đổi để bóp méo bối cảnh hoặc ý nghĩa ban đầu. Ví dụ: cắt bỏ đoạn quan trọng trong phát biểu, thay đổi phụ đề, hoặc ghép ảnh không liên quan.',
  },
  {
    id: 'repurposed-media',
    term: 'Repurposed media (Nội dung tái sử dụng)',
    module: 1,
    category: 'concept',
    definition:
      'Nội dung thật nhưng được lấy ra khỏi bối cảnh gốc và dùng cho mục đích khác. Ví dụ: video lũ lụt cũ được đăng lại như thể đang xảy ra ở địa điểm khác, hoặc ảnh biểu tình nước ngoài bị gán nhãn là sự kiện trong nước.',
  },
  {
    id: 'ai-generated-image',
    term: 'AI-generated image (Ảnh tạo bởi AI)',
    module: 1,
    category: 'technique',
    definition:
      'Hình ảnh được tạo hoàn toàn bởi AI từ văn bản hoặc dữ liệu đầu vào, không dựa trên ảnh thật nào. Các công cụ như Midjourney, Stable Diffusion, DALL·E tạo ra ảnh có chất lượng cực kỳ cao nhưng thường có dấu hiệu như bàn tay biến dạng, nền không đồng nhất.',
  },
  {
    id: 'gan',
    term: 'GAN (Mạng đối sinh)',
    module: 1,
    category: 'tool',
    definition:
      'Generative Adversarial Network — kiến trúc AI gồm hai mạng đối lập nhau: một mạng tạo ra nội dung giả, một mạng cố phát hiện ra nội dung giả. Quá trình "thi đấu" này làm cho nội dung giả ngày càng hoàn thiện hơn. GAN là nền tảng của nhiều công nghệ deepfake.',
  },

  // ── Module 2 — Manipulation triggers ───────────────────────────
  {
    id: 'social-engineering',
    term: 'Social engineering (Thao túng xã hội)',
    module: 2,
    category: 'threat',
    definition:
      'Chiến thuật lợi dụng tâm lý con người — sợ hãi, tham lam, tin tưởng, vội vàng — để thao túng nạn nhân thực hiện hành động có lợi cho kẻ tấn công. Deepfake là công cụ khuếch đại social engineering vì chúng tạo ra bằng chứng giả mạo rất thuyết phục.',
  },
  {
    id: 'urgency-trigger',
    term: 'Urgency trigger (Nút bấm khẩn cấp)',
    module: 2,
    category: 'threat',
    definition:
      'Chiến thuật tạo ra cảm giác cấp bách giả tạo — "chỉ còn 10 phút", "ngay bây giờ hoặc không bao giờ" — để buộc nạn nhân hành động trước khi kịp suy nghĩ hoặc kiểm chứng. Khẩn cấp là dấu hiệu đỏ quan trọng nhất trong mọi yêu cầu liên quan đến tiền.',
  },
  {
    id: 'authority-trigger',
    term: 'Authority trigger (Nút bấm quyền lực)',
    module: 2,
    category: 'threat',
    definition:
      'Chiến thuật giả danh người có quyền lực — công an, giám đốc, ngân hàng, giáo viên — để tạo áp lực phục tùng. Kết hợp với deepvoice hoặc deepfake hình ảnh, đây là chiến thuật cực kỳ hiệu quả vì con người có xu hướng phục tùng người có thẩm quyền.',
  },
  {
    id: 'confirmation-bias',
    term: 'Confirmation bias (Thiên kiến xác nhận)',
    module: 2,
    category: 'concept',
    definition:
      'Xu hướng tâm lý chỉ tìm kiếm và tin vào thông tin xác nhận những gì mình đã tin sẵn. Kẻ tấn công khai thác điều này bằng cách gửi nội dung phù hợp với định kiến của nạn nhân, khiến họ ít cảnh giác hơn.',
  },
  {
    id: 'liars-dividend',
    term: "Liar's dividend (Lợi thế của kẻ nói dối)",
    module: 2,
    category: 'concept',
    definition:
      'Nghịch lý nguy hiểm: khi deepfake trở nên phổ biến, người ta bắt đầu nghi ngờ cả nội dung thật. Kẻ gian có thể phủ nhận bằng chứng thật bằng cách gọi chúng là "deepfake", làm suy yếu lòng tin vào sự thật.',
  },

  // ── Module 3 — Detection ────────────────────────────────────────
  {
    id: 'artifacts',
    term: 'Artifacts (Dấu vết kỹ thuật số)',
    module: 3,
    category: 'concept',
    definition:
      'Các lỗi kỹ thuật còn lại trong nội dung AI-generated: nhấp nháy quanh viền khuôn mặt, ánh sáng không khớp, bàn tay biến dạng, tai không đối xứng, phông nền mờ không đồng nhất. Artifacts là manh mối quan trọng khi quan sát chậm deepfake.',
  },
  {
    id: 'deepfake-detector',
    term: 'Deepfake detector (Công cụ phát hiện)',
    module: 3,
    category: 'tool',
    definition:
      'Phần mềm hoặc dịch vụ phân tích nội dung để xác định xác suất nội dung đó là deepfake. Các detector hiện tại không hoàn hảo — có thể báo sai (false positive/negative) và chạy sau công nghệ tạo deepfake. Cần dùng kết hợp với phán đoán ngữ cảnh.',
  },
  {
    id: 'metadata',
    term: 'Metadata (Siêu dữ liệu)',
    module: 3,
    category: 'concept',
    definition:
      'Dữ liệu ẩn kèm theo file ảnh/video: thời gian, địa điểm, thiết bị, phần mềm chỉnh sửa. Metadata có thể tiết lộ nội dung đã qua chỉnh sửa hoặc được tạo bởi AI, nhưng cũng có thể bị xóa hoặc làm giả.',
  },
  {
    id: 'context-analysis',
    term: 'Phân tích ngữ cảnh',
    module: 3,
    category: 'tool',
    definition:
      'Đặt câu hỏi về bối cảnh xung quanh nội dung: Ai gửi? Từ kênh nào? Nội dung muốn mình làm gì? Thông tin có thể xác minh qua nguồn độc lập không? Đây là lớp phòng vệ quan trọng nhất, mạnh hơn bất kỳ detector nào.',
  },
  {
    id: 'reverse-image-search',
    term: 'Reverse image search (Tìm ảnh ngược)',
    module: 3,
    category: 'tool',
    definition:
      'Kỹ thuật tải ảnh lên công cụ tìm kiếm (Google Images, TinEye) để tìm nguồn gốc và các phiên bản khác của ảnh. Giúp phát hiện ảnh tái sử dụng sai bối cảnh hoặc ảnh được tạo bởi AI không có nguồn gốc thật.',
  },

  // ── Module 4 — Financial threats ───────────────────────────────
  {
    id: 'investment-fraud',
    term: 'Investment fraud (Lừa đảo đầu tư)',
    module: 4,
    category: 'threat',
    definition:
      'Hình thức lừa đảo sử dụng lời hứa lợi nhuận cao bất thường để dụ nạn nhân đầu tư. Deepfake người nổi tiếng quảng cáo sản phẩm tài chính là biến thể phổ biến và nguy hiểm nhất của loại lừa đảo này.',
  },
  {
    id: 'pig-butchering',
    term: 'Pig butchering (Scam đầu tư dài hạn)',
    module: 4,
    category: 'threat',
    definition:
      'Kịch bản lừa đảo: kẻ gian xây dựng mối quan hệ tin tưởng dài hạn (thậm chí tình cảm), dẫn dụ nạn nhân vào nền tảng đầu tư giả. Nạn nhân thắng nhỏ ban đầu, sau đó bị "giết thịt" khi đã đầu tư lớn.',
  },
  {
    id: 'otp',
    term: 'OTP (Mã xác thực một lần)',
    module: 4,
    category: 'concept',
    definition:
      'One-Time Password — mã số dùng một lần gửi qua SMS hoặc ứng dụng để xác minh danh tính. KHÔNG BAO GIỜ chia sẻ OTP với bất kỳ ai, kể cả người tự xưng là nhân viên ngân hàng hay cơ quan chức năng.',
  },
  {
    id: 'impersonation',
    term: 'Impersonation (Mạo danh)',
    module: 4,
    category: 'threat',
    definition:
      'Giả mạo danh tính của người hoặc tổ chức khác để lừa đảo. Deepfake giúp mạo danh trực quan và thuyết phục hơn bao giờ hết — không chỉ qua văn bản mà còn qua hình ảnh, giọng nói và video.',
  },

  // ── Module 5 — Response ─────────────────────────────────────────
  {
    id: 'phishing',
    term: 'Phishing (Lừa đảo qua liên kết)',
    module: 5,
    category: 'threat',
    definition:
      'Chiến thuật gửi đường link hoặc file giả mạo giao diện trang web hợp pháp (ngân hàng, mạng xã hội) để đánh cắp thông tin đăng nhập hoặc cài malware. QR code giả là biến thể phổ biến hiện nay (QR phishing).',
  },
  {
    id: 'two-channel-rule',
    term: 'Two-Channel Rule (Quy tắc hai kênh)',
    module: 5,
    category: 'rule',
    definition:
      'Khi nhận yêu cầu liên quan đến tiền, OTP, tài khoản hoặc thông tin nhạy cảm qua một kênh, xác minh qua kênh hoàn toàn khác và độc lập. Ví dụ: nhận tin nhắn qua Zalo → gọi điện trực tiếp qua số đã lưu để xác nhận.',
  },
  {
    id: 'responsible-sharing',
    term: 'Chia sẻ có trách nhiệm',
    module: 5,
    category: 'rule',
    definition:
      'Trước khi chia sẻ thông tin: kiểm chứng nguồn gốc, xem xét tác hại tiềm tàng, và tự hỏi liệu việc chia sẻ có ích không. Dừng lại 10 giây trước khi nhấn "Chia sẻ" — đặc biệt với nội dung gây phẫn nộ hoặc kêu gọi hành động ngay.',
  },
  {
    id: 'digital-identity',
    term: 'Digital identity (Danh tính số)',
    module: 5,
    category: 'concept',
    definition:
      'Toàn bộ thông tin về bạn hiện diện trên internet: ảnh, giọng nói, video, thông tin cá nhân, tài khoản mạng xã hội. Dữ liệu này là nguyên liệu để kẻ xấu xây dựng deepfake hoặc kịch bản lừa đảo nhắm vào bạn.',
  },

  // ── Module 6 — Protection rules ────────────────────────────────
  {
    id: 'family-code',
    term: 'Family Code (Mã gia đình)',
    module: 6,
    category: 'rule',
    definition:
      'Từ khóa bí mật thống nhất trước trong gia đình để xác minh danh tính khi có tình huống khẩn cấp hoặc yêu cầu tiền. Không lưu trong tin nhắn, không dựa trên thông tin công khai, thay đổi ngay khi nghi đã lộ.',
  },
  {
    id: 'money-delay',
    term: 'Money Delay (Trì hoãn chuyển tiền)',
    module: 6,
    category: 'rule',
    definition:
      'Quy tắc cố tình chờ ít nhất 10–30 phút trước khi thực hiện bất kỳ giao dịch nào được yêu cầu qua điện thoại/tin nhắn. Lừa đảo thắng nhờ tốc độ — Money Delay lấy lại thời gian để kiểm chứng.',
  },
  {
    id: 'no-shame-reporting',
    term: 'No Shame Reporting (Báo cáo không xấu hổ)',
    module: 6,
    category: 'rule',
    definition:
      'Nguyên tắc khuyến khích nạn nhân báo cáo sớm mà không đổ lỗi hay xấu hổ. Xấu hổ là vũ khí của kẻ lừa đảo — nó giữ nạn nhân im lặng và cho kẻ xấu thêm thời gian. Báo cáo sớm bảo vệ chính bạn và người khác.',
  },
  {
    id: 'evidence-first',
    term: 'Evidence First (Bằng chứng trước)',
    module: 6,
    category: 'rule',
    definition:
      'Lưu lại bằng chứng an toàn (chụp màn hình, lưu link, ghi âm) trước khi báo cáo hoặc bất kỳ hành động nào khác. Bằng chứng phục vụ việc báo cáo đúng kênh — KHÔNG để lan truyền vì có thể gây thêm hại.',
  },
  {
    id: 'deepfense-shield',
    term: 'Deepfense Shield (Khiên phòng thủ)',
    module: 6,
    category: 'rule',
    definition:
      'Bộ 5 quy tắc phòng vệ cá nhân và cộng đồng: Family Code · Money Delay · Two-Channel Rule · No Shame Reporting · Evidence First. Mỗi quy tắc giải quyết một điểm yếu cụ thể mà deepfake khai thác.',
  },
  {
    id: '2fa',
    term: 'Two-factor authentication / 2FA (Xác thực hai lớp)',
    module: 6,
    category: 'tool',
    definition:
      'Lớp bảo mật bổ sung yêu cầu hai hình thức xác minh để đăng nhập: mật khẩu + OTP/ứng dụng xác thực. Bật 2FA trên tất cả tài khoản quan trọng để ngăn chặn truy cập trái phép ngay cả khi mật khẩu bị lộ.',
  },
  {
    id: 'digital-footprint',
    term: 'Digital footprint (Dấu vết số)',
    module: 6,
    category: 'concept',
    definition:
      'Tất cả thông tin bạn để lại khi hoạt động trực tuyến: bài đăng, ảnh, video, bình luận, dữ liệu vị trí. Footprint quá lớn và công khai tạo ra nhiều nguyên liệu hơn cho kẻ xấu xây dựng kịch bản lừa đảo.',
  },
  {
    id: 'deepfense-aware',
    term: 'DEEPFENSE AWARE',
    module: 6,
    category: 'concept',
    definition:
      'Chứng chỉ hoàn thành khoá học DEEPFENSE BASIC, cấp sau khi hoàn thành tất cả 6 module và vượt qua Final Exam. Xác nhận người học đã nắm vững kiến thức cơ bản về nhận diện, phản ứng và phòng vệ trước deepfake.',
  },
];

/** Returns glossary entries matching a query (case-insensitive, term + definition) */
export function searchGlossary(query) {
  if (!query.trim()) return GLOSSARY;
  const q = query.toLowerCase();
  return GLOSSARY.filter(
    e => e.term.toLowerCase().includes(q) || e.definition.toLowerCase().includes(q),
  );
}

/** Category label map */
export const CATEGORY_LABELS = {
  concept:   'Khái niệm',
  technique: 'Kỹ thuật',
  threat:    'Mối đe doạ',
  rule:      'Quy tắc',
  tool:      'Công cụ',
};
