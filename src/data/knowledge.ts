/**
 * DEEPFENSE.ONLINE — Knowledge Base Data
 * @copyright 2025 Ho Xuan Nguyen (25NS039)
 */

import { Language } from '@/types';

export interface KnowledgeCategory {
  category: string;
  items: { title: string; content: string; }[];
}

export const KNOWLEDGE_BASE: Record<Language, KnowledgeCategory[]> = {
  vi: [
    {
      category: "AI & DEEPFAKE CĂN BẢN",
      items: [
        { title: "Deepfake là gì?", content: "Sự kết hợp giữa 'Deep learning' và 'Fake'. AI sử dụng dữ liệu hình ảnh/giọng nói để tạo ra các nội dung giả mạo nhưng cực kỳ chân thực." },
        { title: "Cơ chế GANs", content: "Sử dụng hai mạng AI đấu với nhau: một mạng tạo giả và một mạng kiểm định, giúp tạo ra sản phẩm hoàn hảo nhất." },
        { title: "Diffusion Models", content: "Công nghệ tạo ảnh/video từ văn bản (Text-to-Video), nền tảng cho các công cụ như Sora và Midjourney hiện nay." }
      ]
    },
    {
      category: "CẨM NANG PHÒNG CHỐNG",
      items: [
        { title: "Thiết lập Mật mã Gia đình", content: "Thỏa thuận một từ khóa bí mật chỉ người thân biết để xác thực danh tính khi nhận cuộc gọi yêu cầu chuyển tiền gấp." },
        { title: "Quy tắc 10 giây", content: "Khi nhận cuộc gọi video nghi vấn, hãy yêu cầu đối phương vẫy tay trước mặt hoặc quay đầu sang trái/phải để kiểm tra lỗi pixel." },
        { title: "Xác thực Đa kênh", content: "Khi nhận tin nhắn mượn tiền, hãy gọi trực tiếp qua số SIM truyền thống hoặc liên lạc qua một kênh thứ ba để kiểm tra giọng nói thật." }
      ]
    },
    {
      category: "QUY TRÌNH ỨNG CỨU",
      items: [
        { title: "Cách xử lý tức thì", content: "Ngắt kết nối, không chuyển tiền, thông báo cho người thân và báo cáo ngay cho cơ quan chức năng qua VNeID hoặc NCSC." },
        { title: "Bảo vệ bằng chứng", content: "Chụp ảnh màn hình, lưu ghi âm cuộc gọi và giữ lại các thông tin tài khoản ngân hàng của kẻ lừa đảo để phục vụ điều tra." },
        { title: "Thu thập Log giao dịch", content: "Lưu lại toàn bộ mã giao dịch ngân hàng và biên lai để làm cơ sở cho ngân hàng phong tỏa tài khoản lừa đảo kịp thời." }
      ]
    },
    {
      category: "CÔNG NGHỆ GIÁM ĐỊNH AI",
      items: [
        { title: "rPPG (Nhịp tim từ xa)", content: "Mắt người không thấy được, nhưng AI có thể quét sự thay đổi màu sắc vi mô của da theo nhịp tim để xác định đó là người thật." },
        { title: "C2PA (Hộ chiếu Nội dung)", content: "Tiêu chuẩn toàn cầu giúp dán nhãn 'nguồn gốc' cho hình ảnh, giúp biết được ảnh chụp từ camera hay tạo ra từ AI." },
        { title: "Phân tích Phổ âm", content: "AI lừa đảo thường có dải tần số âm thanh không đều, để lại các vết nhiễu đặc trưng khi biểu diễn trên biểu đồ phổ tần số (Spectrogram)." }
      ]
    },
    {
      category: "PHÁP LUẬT VIỆT NAM",
      items: [
        { title: "Nghị định 13/2023/NĐ-CP", content: "Văn bản cao nhất về bảo vệ dữ liệu cá nhân. Xử lý dữ liệu sinh trắc học trái phép là hành vi vi phạm pháp luật đặc biệt nghiêm trọng." },
        { title: "Điều 174 Bộ luật Hình sự", content: "Tội lừa đảo chiếm đoạt tài sản bằng công nghệ cao có khung hình phạt lên đến 20 năm tù hoặc tù chung thân." },
        { title: "Thông tư 03/2024/TT", content: "Quy định mới về việc gỡ bỏ thông tin sai sự thật trên không gian mạng trong vòng 24 giờ sau khi có yêu cầu từ cơ quan chức năng." }
      ]
    },
    {
      category: "LUẬT PHÁP QUỐC TẾ",
      items: [
        { title: "Đạo luật AI của EU", content: "Luật AI đầu tiên thế giới, yêu cầu mọi nội dung do AI tạo ra (Deepfake) phải được dán nhãn minh bạch 'AI-generated'." },
        { title: "Tiêu chuẩn Trung Quốc & Mỹ", content: "Cả hai quốc gia đều bắt buộc nhúng watermark (thủy vân) ẩn vào các sản phẩm của các mô hình AI lớn như ChatGPT hay Sora." },
        { title: "Trách nhiệm của Big Tech", content: "Các nền tảng xuyên biên giới (Facebook, TikTok) bắt buộc phải có hệ thống lọc tự động Deepfake trước khi chúng tiếp cận người dùng." }
      ]
    },
    {
      category: "ĐẠO ĐỨC AI (UNESCO)",
      items: [
        { title: "Khung Đạo đức UNESCO", content: "Khẳng định AI phải phục vụ con người, không được xâm phạm quyền riêng tư và phải chịu sự kiểm soát của con người (Human Agency)." },
        { title: "Quyền bảo vệ Danh tính", content: "Coi khuôn mặt kỹ thuật số là một phần của nhân phẩm, mọi hành vi bôi nhọ bằng AI là vi phạm nhân quyền nghiêm trọng." },
        { title: "Minh bạch Thuật toán", content: "Người dùng có quyền được biết tại sao một nội dung AI được gợi ý cho họ và mục đích đằng sau các thuật toán định hướng hành vi." }
      ]
    },
    {
      category: "XU HƯỚNG & TƯƠNG LAI",
      items: [
        { title: "Dự báo 2027", content: "Thiệt hại do lừa đảo AI có thể vượt 40 tỷ USD toàn cầu. Tin tặc sẽ sử dụng AI tự động để 'tấn công theo dây chuyền'." },
        { title: "Niềm tin Kỹ thuật số", content: "Xu hướng chuyển dịch sang các giải pháp bảo mật phi tập trung (Blockchain) để xác thực 'Con người thật' thay vì chỉ dùng mật khẩu." },
        { title: "Sự trỗi dậy của AGI", content: "AI tương lai (AGI) sẽ có khả năng tự tư duy và lập kế hoạch tấn công lừa đảo phức tạp, đòi hỏi sự phòng thủ chủ động hơn từ con người." }
      ]
    }
  ],
  en: [
    {
      category: "AI & DEEPFAKE BASICS",
      items: [
        { title: "What is Deepfake?", content: "A blend of 'Deep learning' and 'Fake'. AI uses audiovisual data to create highly realistic synthetic content." },
        { title: "How GANs Work", content: "Two AI networks (Generator & Discriminator) compete to create and verify images until they reach perfection." },
        { title: "Diffusion Models", content: "The core technology behind modern text-to-image and video systems like Sora, DALL-E and Midjourney." }
      ]
    },
    {
      category: "PREVENTION GUIDE",
      items: [
        { title: "Family Security Codeword", content: "Establish a secret word known only to your family to verify identities during urgent money requests." },
        { title: "The 10-Second Rule", content: "During suspicious video calls, ask the person to wave their hand or turn their head to check for pixel glitches." },
        { title: "Multi-channel Verification", content: "When receiving of loan requests, call directly via traditional SIM or contact through a third channel to check the real voice." }
      ]
    },
    {
      category: "RESPONSE PLAYBOOK",
      items: [
        { title: "Immediate Actions", content: "Disconnect, do not transfer money, notify relatives, and report via official channels like VNeID or NCSC." },
        { title: "Preserving Evidence", content: "Take screenshots, save call recordings, and keep the fraudster's bank account details for investigation." },
        { title: "Collect Transaction Logs", content: "Save all bank transaction codes and receipts as a basis for the bank to freeze the fraudster's account in time." }
      ]
    },
    {
      category: "FORENSICS TECHNOLOGY",
      items: [
        { title: "rPPG (Remote Heartbeat)", content: "Invisible to humans, AI can scan micro-skin color changes driven by heartbeats to verify real-life status." },
        { title: "C2PA Standards", content: "A global standard for media provenance, labeling whether content is camera-original or AI-generated." },
        { title: "Spectrogram Analysis", content: "Scam AI often has irregular frequency bands, leaving characteristic noise patterns on a spectrogram." }
      ]
    },
    {
      category: "VIETNAM LAW",
      items: [
        { title: "Decree 13/2023/ND-CP", content: "The core legal framework for personal data protection. Unauthorized biometric data processing is a severe violation." },
        { title: "Criminal Code Art 174", content: "Fraudulent property appropriation via high-tech carries penalties up to 20 years or life imprisonment." },
        { title: "Circular 03/2024/TT", content: "New regulation on removing false information online within 24 hours of a Request from authorities." }
      ]
    },
    {
      category: "INTERNATIONAL LAW",
      items: [
        { title: "EU AI Act", content: "The world's first AI law requiring all AI-generated content (Deepfakes) to be transparently labeled." },
        { title: "US & China Labeling Laws", content: "Both nations mandate embedding invisible watermarks into products from major AI models like ChatGPT or Sora." },
        { title: "Big Tech Responsibility", content: "Platforms like Facebook and TikTok are mandated to have automated Deepfake filtering systems before they reach users." }
      ]
    },
    {
      category: "AI ETHICS (UNESCO)",
      items: [
        { title: "UNESCO Framework", content: "Affirms that AI must serve humanity, respect privacy, and remain under human agency and oversight." },
        { title: "Identity Integrity Rights", content: "Treats the digital face as part of human dignity; AI defamation is seen as a major human rights violation." },
        { title: "Algorithm Transparency", content: "Users have the right to know why AI content is suggested to them and the purpose behind the behavioral targeting algorithms." }
      ]
    },
    {
      category: "FUTURE TRENDS",
      items: [
        { title: "2027 Projections", content: "AI fraud losses may exceed $40 billion globally. Hackers will use automated AI for 'chain-reaction' attacks." },
        { title: "Digital Trust Era", content: "A shift toward decentralized security (Blockchain) to verify 'Real Human' status instead of relying solely on passwords." },
        { title: "The Rise of AGI", content: "Future AI (AGI) will have autonomous reasoning and planning capabilities for complex scams, requiring more proactive defense." }
      ]
    }
  ]
};
