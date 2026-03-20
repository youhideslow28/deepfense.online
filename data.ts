
import { EnhancedLevelData, ChecklistItem, NewsItem, FunFact, PersonalityQuestion, Language } from './types';

// --- DIGITAL SIGNATURE / CHỮ KÝ SỐ ---
// Chế độ Solo Developer: Hồ Xuân Nguyễn - 25NS039
export const PROJECT_METADATA = {
  name: "DEEPFENSE.ONLINE",
  version: "1.1.0-Team-Release",
  build_date: new Date().toLocaleDateString('vi-VN'),
  authors: [
    { name: "Hồ Xuân Nguyễn", id: "25NS039", role: "Fullstack Developer / Project Lead" },
    { name: "Nguyễn Nhất Huy", id: "25NS020", role: "Frontend Developer / Security Analyst" }
  ],
  university: "Vietnam-Korea University of Information and Communication Technology (VKU)",
  department: "Khoa Kỹ thuật Máy tính & Điện tử (Computer Engineering & Electronics)",
  instructor: "", // Đã xóa theo yêu cầu
  license: "Copyright © 2025 Hồ Xuân Nguyễn (25NS039) & Nguyễn Nhất Huy (25NS020)",
  email: "deepfense@gmail.com"
};

export const TRANSLATIONS: Record<Language, any> = {
  vi: {
    hero_badge: "HỆ THỐNG GIÁM SÁT AN NINH AI",
    hero_title: "DỰ ÁN HUẤN LUYỆN NHẬN DẠNG DEEPFAKE",
    hero_desc: "Dự án huấn luyện cộng đồng về Deepfake. Hãy trang bị kiến thức để bảo vệ bản thân và gia đình trước các cuộc tấn công AI tinh vi.",
    btn_scan: "QUÉT RỦI RO",
    btn_challenge: "THỬ THÁCH",
    btn_ai: "MOBILE APP & DATA",
    warning_center: "TRUNG TÂM CẢNH BÁO",
    hotline: "HOTLINE PHẢN ỨNG NHANH",
    knowledge: "BẠN CÓ BIẾT?",
    about_us: "VỀ CHÚNG TÔI & LIÊN HỆ",
    mission: "SỨ MỆNH",
    vision: "TẦM NHÌN",
    team: "NHÓM TÁC GIẢ DỰ ÁN", 
    report_form: "BÁO CÁO SỰ CỐ",
    send_report: "GỬI BÁO CÁO",
    success_msg: "GỬI THÀNH CÔNG!",
    contact_support: "KÊNH HỖ TRỢ",
    police: "CẢNH SÁT 113",
    cyber_security: "AN NINH MẠNG",
    footer_rights: "BẢO LƯU MỌI QUYỀN.",
    agent_welcome: "Xin chào! Tôi là DEEPFENSE AGENT. Tôi có thể giúp gì cho bạn?",
    agent_placeholder: "Hỏi về dấu hiệu lừa đảo...",
    result_pass: "AN TOÀN",
    result_fail: "NGUY HIỂM",
    label_name: "Tên gọi (Nickname)",
    label_email: "Địa chỉ Email",
    label_attachment: "Đính kèm (Ảnh/Video)",
    label_desc: "Chi tiết sự cố"
  },
  en: {
    hero_badge: "AI SECURITY MONITORING SYSTEM",
    hero_title: "DEEPFAKE DETECTION TRAINING PROJECT",
    hero_desc: "Community training project on Deepfakes. Empower yourself with knowledge to protect your family against sophisticated AI attacks.",
    btn_scan: "RISK SCAN",
    btn_challenge: "CHALLENGE",
    btn_ai: "MOBILE APP & DATA",
    warning_center: "WARNING CENTER",
    hotline: "EMERGENCY HOTLINE",
    knowledge: "DID YOU KNOW?",
    about_us: "ABOUT US & CONTACT",
    mission: "MISSION",
    vision: "VISION",
    team: "PROJECT AUTHORS",
    report_form: "REPORT AN INCIDENT",
    send_report: "SEND REPORT",
    success_msg: "SENT SUCCESSFULLY!",
    contact_support: "SUPPORT CHANNELS",
    police: "POLICE 113",
    cyber_security: "CYBER SECURITY",
    footer_rights: "ALL RIGHTS RESERVED.",
    agent_welcome: "Hello! I am DEEPFENSE AGENT. How can I assist you?",
    agent_placeholder: "Ask about scam signs...",
    result_pass: "SECURE",
    result_fail: "DANGER",
    label_name: "Display Name",
    label_email: "Email Address",
    label_attachment: "Attachment (Image/Video)",
    label_desc: "Incident Details"
  }
};

export const LEVELS: Record<Language, EnhancedLevelData[]> = {
  vi: [
    { id: "v1", title: "Video 1 (Gia đình Lego)", difficulty: "Dễ", desc: "Soi kỹ bàn tay và khuôn mặt nhân vật.", hint: "AI nằm bên: Phải (Right).", fake_pos: 2, advice: "Dấu hiệu: Ngón tay người ông bị dính vào nhau, khuôn mặt bé gái bị biến dạng mờ nhòe khi quay đầu.", video_url: "https://youtu.be/UOaKSgHVARM", technical_flaws: [] },
    { id: "v2", title: "Video 2 (Nhóm người chụm tay)", difficulty: "Khó", desc: "Quan sát bề mặt da tay.", hint: "AI nằm bên: Trái (Left).", fake_pos: 1, advice: "Dấu hiệu: Da tay quá mịn như sáp, thiếu độ trong mờ tự nhiên (subsurface scattering) và chi tiết lỗ chân lông/nếp nhăn.", video_url: "https://youtu.be/OO8p3jN7TBQ", technical_flaws: [] },
    { id: "v3", title: "Video 3 (Hươu cao cổ)", difficulty: "Trung bình", desc: "Để ý chân hươu khi di chuyển.", hint: "AI nằm bên: Trái (Left).", fake_pos: 1, advice: "Dấu hiệu: Chân hươu bước đi trượt trên cỏ (moonwalking), tách nền (background separation) giữa hươu và núi bị lỗi.", video_url: "https://youtu.be/hglX1Q93en8", technical_flaws: [] },
    { id: "v4", title: "Video 4 (Chuồn chuồn)", difficulty: "Dễ", desc: "Quan sát kỹ đôi cánh.", hint: "AI nằm bên: Phải (Right).", fake_pos: 2, advice: "Dấu hiệu: Cánh chuồn chuồn nhìn như nhựa đục, thiếu chi tiết gân cánh sắc nét, đôi khi hòa lẫn vào thân.", video_url: "https://youtu.be/-wenF_aW-gM", technical_flaws: [] },
    { id: "v5", title: "Video 5 (Thiên nga)", difficulty: "Trung bình", desc: "Nhìn vào phần hình ảnh phản chiếu.", hint: "AI nằm bên: Phải (Right).", fake_pos: 2, advice: "Dấu hiệu: Hình phản chiếu dưới nước bị méo mó, sóng nước di chuyển không khớp với hướng bơi của thiên nga.", video_url: "https://youtu.be/pP3-hpkg6Ps", technical_flaws: [] },
    { id: "v6", title: "Video 6 (Thác nước)", difficulty: "Khó", desc: "Quan sát dòng nước chảy.", hint: "AI nằm bên: Phải (Right).", fake_pos: 2, advice: "Dấu hiệu: Dòng nước đổ xuống nhìn giống sương khói mờ ảo, chuyển động lặp lại (loop) thiếu sức nặng của nước.", video_url: "https://youtu.be/J52kFGgVMpc", technical_flaws: [] },
    { id: "v7", title: "Video 7 (Hoàng hôn)", difficulty: "Khó", desc: "Để ý các đám mây.", hint: "AI nằm bên: Trái (Left).", fake_pos: 1, advice: "Dấu hiệu: Các đám mây di chuyển bất thường, tự tan chảy hoặc biến hình (morphing) tại chỗ thay vì trôi theo gió.", video_url: "https://youtu.be/jLXuTEAd0eY", technical_flaws: [] },
    { id: "v8", title: "Video 8 (Cắt cát dưa hấu)", difficulty: "Dễ", desc: "Nhìn vào kết cấu cát khi bị cắt.", hint: "AI nằm bên: Trái (Left).", fake_pos: 1, advice: "Dấu hiệu: Khối cát bị cắt trông dẻo như cao su/đất sét, không có độ tơi xốp và rơi vụn tự nhiên của cát động lực.", video_url: "https://youtu.be/7T0pGbJJcnE", technical_flaws: [] },
    { id: "v9", title: "Video 9 (Múc cát xanh)", difficulty: "Dễ", desc: "Để ý vết lõm sau khi múc.", hint: "AI nằm bên: Trái (Left).", fake_pos: 1, advice: "Dấu hiệu: Cát sau khi múc để lại vết lõm bị méo mó, hoặc cát tự động \"liền\" lại một cách phi vật lý.", video_url: "https://youtu.be/AQ8VkGH9hk0", technical_flaws: [] },
    { id: "v10", title: "Video 10 (Máy ép thủy lực)", difficulty: "Dễ", desc: "Quan sát nước khi bị ép mạnh.", hint: "AI nằm bên: Phải (Right).", fake_pos: 2, advice: "Dấu hiệu: Chất lỏng bắn ra quá dữ dội hoặc có hình dáng/màu sắc thiếu tự nhiên so với lực ép thực tế, các mảnh vỡ bay ra không theo quy luật vật lý.", video_url: "https://youtu.be/8Kmnc2jGE74", technical_flaws: [] }
  ],
  en: [
    { id: "v1", title: "Video 1 (Lego Family)", difficulty: "Easy", desc: "Check hands and faces.", hint: "AI Position: Right.", fake_pos: 2, advice: "Sign: Grandfather's fingers are fused, girl's face distorts/blurs when turning.", video_url: "https://youtu.be/UOaKSgHVARM", technical_flaws: [] },
    { id: "v2", title: "Video 2 (Hand Cluster)", difficulty: "Hard", desc: "Observe hand skin surface.", hint: "AI Position: Left.", fake_pos: 1, advice: "Sign: Skin is too waxy, missing natural subsurface scattering and pore/wrinkle details.", video_url: "https://youtu.be/OO8p3jN7TBQ", technical_flaws: [] },
    { id: "v3", title: "Video 3 (Giraffe)", difficulty: "Medium", desc: "Watch feet during movement.", hint: "AI Position: Left.", fake_pos: 1, advice: "Sign: Giraffe slides on grass (moonwalking), background separation is glitched.", video_url: "https://youtu.be/hglX1Q93en8", technical_flaws: [] },
    { id: "v4", title: "Video 4 (Dragonfly)", difficulty: "Easy", desc: "Observe wings closely.", hint: "AI Position: Right.", fake_pos: 2, advice: "Sign: Wings look like opaque plastic, missing sharp vein details, blending into body.", video_url: "https://youtu.be/-wenF_aW-gM", technical_flaws: [] },
    { id: "v5", title: "Video 5 (Swan)", difficulty: "Medium", desc: "Look at the water reflection.", hint: "AI Position: Right.", fake_pos: 2, advice: "Sign: Water reflection is distorted, waves don't match swimming direction.", video_url: "https://youtu.be/pP3-hpkg6Ps", technical_flaws: [] },
    { id: "v6", title: "Video 6 (Waterfall)", difficulty: "Hard", desc: "Observe flowing water.", hint: "AI Position: Right.", fake_pos: 2, advice: "Sign: Falling water looks like blurry mist, repetitive loops lack natural weight.", video_url: "https://youtu.be/J52kFGgVMpc", technical_flaws: [] },
    { id: "v7", title: "Video 7 (Sunset)", difficulty: "Hard", desc: "Watch the clouds.", hint: "AI Position: Left.", fake_pos: 1, advice: "Sign: Clouds move abnormally, melting or morphing instead of drifting with wind.", video_url: "https://youtu.be/jLXuTEAd0eY", technical_flaws: [] },
    { id: "v8", title: "Video 8 (Sand Cutting)", difficulty: "Easy", desc: "Observe sand texture when cut.", hint: "AI Position: Left.", fake_pos: 1, advice: "Sign: Sand block looks rubbery like clay, missing natural crumble of kinetic sand.", video_url: "https://youtu.be/7T0pGbJJcnE", technical_flaws: [] },
    { id: "v9", title: "Video 9 (Blue Sand Scoop)", difficulty: "Easy", desc: "Observe scoop depression.", hint: "AI Position: Left.", fake_pos: 1, advice: "Sign: Scoop depression is distorted, or sand 'heals' physically impossible way.", video_url: "https://youtu.be/AQ8VkGH9hk0", technical_flaws: [] },
    { id: "v10", title: "Video 10 (Hydraulic Press)", difficulty: "Easy", desc: "Observe liquid under pressure.", hint: "AI Position: Right.", fake_pos: 2, advice: "Sign: Splashes are too violent or unnaturally, debris ignores physics laws.", video_url: "https://youtu.be/8Kmnc2jGE74", technical_flaws: [] }
  ]
};

export const CHECKLIST_DATA: Record<Language, ChecklistItem[]> = {
  vi: [
    { category: "👁️ MẮT & KHUÔN MẶT", items: ["Nháy mắt bất thường (quá ít hoặc quá nhanh)", "Mắt không di chuyển tự nhiên theo hướng nhìn", "Da mặt trông quá mịn hoặc quá bết so với cổ"] },
    { category: "👄 MIỆNG & ÂM THANH", items: ["Khẩu hình không khớp hoàn toàn với lời nói", "Âm thanh bị vang hoặc có tạp âm lạ", "Giọng nói nghe máy móc, thiếu cảm xúc"] },
    { category: "✋ CHI TIẾT CƠ THỂ", items: ["Bàn tay có số lượng ngón bất thường hoặc dính nhau", "Trang sức (khuyên tai, kính) bị nhấp nháy", "Chuyển động đầu bị giật lag hoặc méo mó"] },
    { category: "🖼️ BỐI CẢNH & ÁNH SÁNG", items: ["Phông nền bị biến dạng khi nhân vật di chuyển", "Bóng đổ trên mặt không khớp với hướng sáng", "Vật thể ở xa bị nhòe hoặc rung lắc bất thường"] }
  ],
  en: [
    { category: "👁️ EYES & FACE", items: ["Abnormal blinking (too little or too fast)", "Eyes don't move naturally with gaze direction", "Facial skin looks too smooth or blurry"] },
    { category: "👄 MOUTH & AUDIO", items: ["Lip movements don't perfectly match speech", "Audio is echoey or has strange background noise", "Voice sounds robotic or lacks emotion"] },
    { category: "✋ BODY DETAILS", items: ["Hands have unusual finger counts or merged fingers", "Jewelry (earrings, glasses) flickers", "Head movements are glitchy or distorted"] },
    { category: "🖼️ CONTEXT & LIGHTING", items: ["Background distorts when the person moves", "Shadows on face don't match light source", "Distant objects are blurry or shake unnaturally"] }
  ]
};

export const FUN_FACTS: Record<Language, FunFact[]> = {
  vi: [
    { title: "3 GIÂY", content: "AI thế hệ mới chỉ cần 3 giây âm thanh gốc để nhân bản giọng nói của bạn với độ chính xác 95%." },
    { title: "NHỊP THỞ", content: "Deepfake hiếm khi mô phỏng được nhịp thở nhẹ nhàng làm rung vai của con người." },
    { title: "GÓC NGHIÊNG", content: "AI gặp khó khăn nhất khi nhân vật quay nghiêng mặt 90 độ, thường gây mờ nhòe." },
    { title: "RĂNG DÍNH LIỀN", content: "Nhiều AI chưa thể vẽ kẽ răng, khiến hàm răng trông như một dải trắng liền mạch." },
    { title: "MẮT VUÔNG", content: "Các mẫu AI cũ thường tạo ra con ngươi hình vuông hoặc hình lục giác thay vì tròn." },
    { title: "CHỚP MẮT", content: "Nhân vật do AI tạo ra thường chớp mắt quá ít hoặc chớp với tốc độ bất thường." },
    { title: "MÀU DA KHÔNG KHỚP", content: "Da mặt và da cổ đôi khi có sự chênh lệch màu sắc rõ rệt do lỗi ghép nối." },
    { title: "ÁNH SÁNG KÍNH", content: "Bóng đèn phản chiếu trên tròng kính thường không di chuyển đúng quy luật vật lý." },
    { title: "TRANG SỨC DÍNH", content: "Khuyên tai, vòng cổ thường bị mờ, tan chảy hoặc dính liền vào da thịt." },
    { title: "TÓC BAY", content: "Các sợi tóc con mỏng thường bị xóa mờ hoặc hòa lẫn vào phông nền phía sau." },
    { title: "ĐỘ TRỄ ÂM", content: "Khẩu hình miệng và âm thanh thường trễ nhau vài mili-giây, không khớp hoàn hảo." },
    { title: "BÀN TAY SÁP", content: "Da tay trong video Deepfake thường trông quá mịn như sáp, thiếu nếp nhăn." },
    { title: "MẠCH MÁU DA", content: "AI hiện tại chưa thể giả lập được sự thay đổi màu sắc vi mô của da theo nhịp đập của tim (rPPG)." },
    { title: "CẢM XÚC ĐỘT NGỘT", content: "Deepfake âm thanh rất tệ trong việc tạo ra tiếng thở dốc, tiếng khóc hoặc các biểu cảm gắt gỏng bất ngờ." }
  ],
  en: [
    { title: "3 SECONDS", content: "Modern AI only needs 3 seconds of original audio to clone your voice with 95% accuracy." },
    { title: "BREATHING", content: "Deepfakes rarely simulate the subtle shoulder movements of human breathing." },
    { title: "SIDE PROFILE", content: "AI struggles most when a character turns their face 90 degrees, causing blurring." },
    { title: "MERGED TEETH", content: "Many AIs cannot draw gaps between teeth, making them look like a seamless white band." },
    { title: "SQUARE EYES", content: "Older AI models often created square or hexagonal pupils instead of natural circular ones." },
    { title: "BLINK RATE", content: "AI-generated characters often blink too infrequently or at unnatural speeds." },
    { title: "SKIN TONE", content: "Facial and neck skin sometimes show distinct color differences due to blending errors." },
    { title: "GLASSES GLARE", content: "Light reflections on glasses often defy the laws of physics and don't track correctly." },
    { title: "JEWELRY", content: "Earrings and necklaces often appear blurry, melted, or fused to the skin." },
    { title: "HAIR BLENDING", content: "Fine hair strands are often blurred out or merged completely with the background." },
    { title: "AUDIO DELAY", content: "Lip movements and audio are often a few milliseconds out of sync." },
    { title: "WAX HANDS", content: "Hand skin in Deepfake videos often looks too smooth, like wax, missing wrinkles." },
    { title: "SKIN PULSE", content: "Current AI cannot simulate micro skin color changes caused by human heartbeats (rPPG)." },
    { title: "SUDDEN EMOTIONS", content: "Audio deepfakes are terrible at generating heavy breathing, crying, or sudden emotional outbursts." }
  ]
};

export const KNOWLEDGE_BASE: Record<Language, any[]> = {
  vi: [
    {
      category: " CƠ BẢN VỀ DEEPFAKE & AI TẠO SINH",
      items: [
        { title: "Định nghĩa Deepfake", content: "Là sự kết hợp giữa 'Deep learning' (Học sâu) và 'Fake' (Giả mạo). Kỹ thuật này sử dụng AI để thay thế khuôn mặt, giọng nói hoặc cử chỉ của một người bằng người khác một cách chân thực." },
        { title: "Nguyên lý hoạt động (GANs)", content: "Mạng đối nghịch sinh (Generative Adversarial Networks) gồm 2 phần: 'Generator' (Kẻ tạo giả) cố gắng tạo ra ảnh thật nhất có thể, và 'Discriminator' (Cảnh sát) cố gắng phân biệt ảnh thật/giả. Chúng huấn luyện lẫn nhau đến khi ảnh giả không thể bị phát hiện." },
        { title: "Mô hình Khuếch tán (Diffusion Models)", content: "Công nghệ mới thay thế GANs (như Midjourney, Stable Diffusion), hoạt động bằng cách thêm nhiễu vào dữ liệu rồi học cách khử nhiễu để tạo ra hình ảnh/video mới hoàn toàn từ văn bản mô tả." }
      ]
    },
    {
      category: "🚀 CÔNG NGHỆ DEEPFAKE MỚI NHẤT 2026",
      items: [
        { title: "Real-time Deepfake (Độ trễ bằng 0)", content: "Các công cụ trên Dark Web hiện cho phép hoán đổi khuôn mặt và giọng nói trực tiếp trên các cuộc gọi video Zalo/Messenger/Teams mà không bị giật lag, vượt qua cả các bước kiểm tra vẫy tay cơ bản." },
        { title: "Zero-Shot Voice Cloning", content: "Công nghệ AI âm thanh thế hệ mới chỉ cần 3-5 giây mẫu âm thanh gốc để nhân bản hoàn hảo giọng nói của bất kỳ ai, bao gồm cả nhịp thở, ngữ điệu và các biểu cảm phức tạp như cười, khóc." },
        { title: "AI Text-to-Video (Sora & beyond)", content: "Khả năng tạo ra các video dài vài phút với độ chân thực vật lý hoàn hảo chỉ từ một dòng văn bản mô tả, đe dọa trực tiếp đến tính xác thực của camera an ninh và bằng chứng video trước tòa." }
      ]
    },
    {
      category: "🧠 THAO TÚNG TÂM LÝ & KỊCH BẢN",
      items: [
        { title: "Tam giác thao túng: Khẩn cấp - Thẩm quyền - Cô lập", content: "Tội phạm không chỉ dùng AI. Chúng tạo tình huống cấp bách (tai nạn cấp cứu), giả danh quyền lực (Công an, Cơ quan Thuế), và yêu cầu nạn nhân ra chỗ vắng để gọi điện nhằm cô lập hoàn toàn." },
        { title: "Đánh cắp ngữ cảnh (Context Hijacking)", content: "Sử dụng dữ liệu rò rỉ từ mạng xã hội, hacker dùng AI để nhại lại chính xác thói quen, cách xưng hô và những bí mật nhỏ nhất của người thân bạn để phá vỡ sự hoài nghi." },
        { title: "Hội chứng mù quáng kỹ thuật số", content: "Khi não bộ tiếp nhận hình ảnh khuôn mặt người quen qua video, cơ chế phòng vệ sinh học tự động hạ xuống, khiến chúng ta bỏ qua các điểm vô lý rành rành về mặt logic hình ảnh." }
      ]
    },
    {
      category: "🇻🇳 LUẬT PHÁP VIỆT NAM VỀ AI & AN NINH",
      items: [
        { title: "Luật An ninh mạng (2018) & Bộ luật Hình sự", content: "Sử dụng Deepfake để lừa đảo chiếm đoạt tài sản cấu thành tội phạm theo Điều 290 Bộ luật Hình sự. Khung hình phạt cao nhất có thể lên đến 20 năm tù hoặc tù chung thân." },
        { title: "Nghị định 13/2023/NĐ-CP (Dữ liệu cá nhân)", content: "Khuôn mặt và giọng nói được xếp vào nhóm 'Dữ liệu cá nhân nhạy cảm'. Việc thu thập, sử dụng hình ảnh người khác để huấn luyện AI hoặc cắt ghép mà không có sự đồng ý là vi phạm pháp luật nghiêm trọng." },
        { title: "Luật Viễn thông (sửa đổi 2023)", content: "Tăng cường định danh chính chủ (eKYC) đối với thuê bao di động. Tội phạm sử dụng Deepfake để qua mặt eKYC mở tài khoản ngân hàng rác sẽ bị truy cứu trách nhiệm hình sự về tội làm giả tài liệu của cơ quan, tổ chức." }
      ]
    },
    {
      category: "⚖️ LUẬT QUỐC TẾ & QUYỀN CON NGƯỜI",
      items: [
        { title: "Đạo luật EU AI Act (Châu Âu 2024)", content: "Đạo luật AI toàn diện đầu tiên trên thế giới. Bắt buộc mọi nội dung tạo bởi AI (Deepfake) phải được dán nhãn (Watermark) rõ ràng. Cấm hoàn toàn AI nhận diện cảm xúc tại nơi làm việc và AI lừa đảo. Phạt vi phạm lên đến 35 triệu Euro hoặc 7% doanh thu toàn cầu." },
        { title: "Liên Hợp Quốc (UN) & Quyền con người", content: "Hội đồng Nhân quyền LHQ nhấn mạnh việc sử dụng Deepfake vi phạm nghiêm trọng Điều 12 Tuyên ngôn Quốc tế Nhân quyền (Quyền riêng tư) và Điều 19 (Tự do ngôn luận) khi bị lạm dụng để tạo tin giả, can thiệp bầu cử hoặc khiêu dâm không đồng thuận." },
        { title: "Luật pháp Hoa Kỳ & Tiêu chuẩn NIST", content: "Khung quản lý rủi ro AI (AI RMF) của NIST yêu cầu các công nghệ tạo sinh phải có cơ chế xác thực đầu ra. Nhiều bang tại Mỹ (California, Texas) đã hình sự hóa hành vi sử dụng Deepfake trong bầu cử và trả thù cá nhân." }
      ]
    },
    {
      category: "🔬 KỸ THUẬT GIÁM ĐỊNH PHÁP Y (FORENSICS)",
      items: [
        { title: "Công nghệ rPPG (Nhịp tim quang học)", content: "Mắt người không thể thấy, nhưng máy quét pháp y có thể phân tích sự thay đổi vi mô của màu da theo mỗi nhịp đập của tim. Deepfake hiện tại hoàn toàn thất bại trong việc giả lập rPPG tự nhiên của con người." },
        { title: "Quang phổ âm thanh (Audio Spectrogram)", content: "Dưới lăng kính quang phổ, giọng người thật rất mượt mà. Trong khi đó, giọng tạo bởi AI Voice thường để lại các 'cặn âm' (artifacts) và những vết đứt gãy hình khối rõ rệt ở dải tần số cao." },
        { title: "Phân tích siêu dữ liệu mã hóa (C2PA/EXIF)", content: "Tiêu chuẩn C2PA cho phép đính kèm 'chữ ký số' mã hóa vào hình ảnh/video ngay từ lúc được chụp bằng camera vật lý. Nếu một tệp bị AI can thiệp chỉnh sửa, chuỗi chữ ký số nguồn gốc này sẽ bị gãy vỡ." }
      ]
    },
    {
      category: "🛡️ BẢO VỆ DỮ LIỆU CÁ NHÂN & PHÒNG NGỪA",
      items: [
        { title: "Nguyên tắc Zero-Trust (Không tin tưởng ai)", content: "Không tin tưởng bất cứ ai trên không gian mạng, kể cả người thân, nếu có yêu cầu liên quan đến tài chính hoặc dữ liệu nhạy cảm. Luôn xác thực chéo qua kênh khác (gọi điện thoại di động trực tiếp bằng mạng viễn thông GSM)." },
        { title: "Từ khóa an toàn (Family Password)", content: "Thiết lập một mật mã hoặc câu hỏi bí mật riêng biệt với người thân trong gia đình. Kẻ lừa đảo dù có AI tạo giọng nói giống đến đâu cũng không thể biết trước từ khóa này." },
        { title: "Hạn chế dấu chân kỹ thuật số (Digital Footprint)", content: "Hạn chế đăng tải hình ảnh khuôn mặt rõ nét, video có giọng nói gốc và thông tin cá nhân lên mạng xã hội ở chế độ công khai để tránh bị AI của tin tặc thu thập làm dữ liệu huấn luyện (Training Data)." }
      ]
    },
    {
      category: "🦹 CÁC NHÓM TỘI PHẠM MẠNG ĐIỂN HÌNH",
      items: [
        { title: "Tội phạm mạng có tổ chức (Organized Cybercrime)", content: "Các băng đảng lừa đảo xuyên quốc gia hiện nay vận hành như một tập đoàn, chia nhỏ các khâu: thu thập dữ liệu (data broker), tạo Deepfake, viết kịch bản thao túng tâm lý và mạng lưới rửa tiền tiền ảo." },
        { title: "Mô hình CaaS (Cybercrime-as-a-Service)", content: "Lừa đảo đã trở thành một 'dịch vụ'. Một người không có chút kiến thức lập trình nào vẫn có thể lên Dark Web thuê bộ công cụ AI Deepfake và kịch bản lừa đảo với giá chỉ từ vài chục USD/tháng." },
        { title: "Tấn công phi tập trung qua SIP Spoofing", content: "Hacker sử dụng các trạm trung chuyển tín hiệu ảo (SIP Spoofing) để ngụy trang địa chỉ IP và số điện thoại hiển thị trên màn hình, khiến việc điều tra và truy vết của cơ quan chức năng gặp rất nhiều khó khăn." }
      ]
    },
    {
      category: "📉 TÁC ĐỘNG ĐẾN XÃ HỘI VÀ KINH TẾ",
      items: [
        { title: "Khủng hoảng niềm tin (Trust Crisis)", content: "Khi ranh giới giữa thật và giả bị xóa nhòa, con người có xu hướng nghi ngờ mọi thông tin. Điều này làm suy yếu sự gắn kết xã hội, phá vỡ các mối quan hệ kỹ thuật số và gây tâm lý hoang mang đám đông." },
        { title: "Thiệt hại tài chính khổng lồ", content: "Chỉ trong vài năm, các vụ lừa đảo mạo danh bằng Deepfake đã gây thiệt hại hàng chục tỷ USD cho các tập đoàn tài chính, ngân hàng và người dùng cá nhân trên toàn cầu." },
        { title: "Nguy cơ với an ninh quốc gia & chính trị", content: "Deepfake đang được sử dụng làm vũ khí thông tin để bôi nhọ chính trị gia, thao túng kết quả bầu cử, tạo tin giả về thị trường chứng khoán và kích động bạo loạn, đe dọa trực tiếp đến sự ổn định của một quốc gia." }
      ]
    },
    {
      category: "🔮 TƯƠNG LAI CỦA AN NINH MẠNG VÀ AI",
      items: [
        { title: "Cuộc chiến AI đối kháng AI", content: "Một cuộc chạy đua vũ trang không hồi kết giữa các mô hình AI tạo sinh (như Deepfake) và mô hình phân tích pháp y (như Deepfense). Các hệ thống phòng thủ sẽ phải liên tục cập nhật theo thời gian thực để đối phó với Zero-day Deepfake." },
        { title: "Tiêu chuẩn xác thực phần cứng", content: "Các nhà sản xuất máy ảnh và điện thoại di động trong tương lai sẽ bắt buộc tích hợp chip mã hóa phần cứng để đóng dấu nguồn gốc (Cryptography Watermark) trực tiếp vào file ảnh/video ngay tại khoảnh khắc bấm máy." },
        { title: "Trợ lý bảo mật cá nhân ảo", content: "Mỗi người dùng số sẽ được trang bị một AI Agent (như dự án Deepfense đang xây dựng) hoạt động ngầm trên thiết bị, tự động phân tích và chặn các tín hiệu lừa đảo đa phương tiện ngay lập tức trước khi người dùng kịp bị thao túng." }
      ]
    }
  ],
  en: [
    {
      category: " DEEPFAKE & GENERATIVE AI BASICS",
      items: [
        { title: "Deepfake Definition", content: "A portmanteau of 'Deep learning' and 'Fake'. It uses Artificial Intelligence to replace a person's face, voice, or gestures with someone else's with extreme realism." },
        { title: "How it works (GANs)", content: "Generative Adversarial Networks consist of two parts: a 'Generator' trying to create the most realistic fake images, and a 'Discriminator' acting as a detective to distinguish real from fake. They train against each other until fakes become undetectable." },
        { title: "Diffusion Models", content: "The new technology replacing GANs (used in Midjourney, Stable Diffusion). It works by adding noise to data and learning to denoise it to create entirely new, highly detailed media from text prompts." }
      ]
    },
    {
      category: "🚀 LATEST DEEPFAKE TECHNOLOGIES 2026",
      items: [
        { title: "Real-time Deepfake (Zero Latency)", content: "Dark Web tools now allow seamless, live face and voice swapping on Zoom, Teams, and Zalo without lag, bypassing even basic 'wave hand in front of face' security checks." },
        { title: "Zero-Shot Voice Cloning", content: "Next-generation audio AI requires only 3 to 5 seconds of original voice samples to perfectly clone anyone's voice, replicating breathing patterns, intonations, and complex emotions (laughing, crying)." },
        { title: "AI Text-to-Video (Sora & Beyond)", content: "The capability to generate multi-minute videos with perfect physical realism from a single text prompt. This directly threatens the legal authenticity of security cameras and video evidence in court." }
      ]
    },
    {
      category: "🧠 PSYCHOLOGICAL MANIPULATION & SCAMS",
      items: [
        { title: "Manipulation Triangle: Urgency, Authority, Isolation", content: "Criminals don't just rely on AI. They engineer extreme urgency (accidents), spoof authority figures (Police, Tax officials), and demand victims move to a quiet place to ensure complete isolation." },
        { title: "Context Hijacking", content: "Exploiting leaked social media data, hackers use AI to accurately mimic habits, speaking styles, nicknames, and the smallest secrets of your loved ones to completely disarm your skepticism." },
        { title: "Digital Blindness Syndrome", content: "When the human brain perceives the face of a loved one on video, biological defense mechanisms instinctively drop, causing victims to completely ignore blatant logical flaws in the visual data." }
      ]
    },
    {
      category: "🇻🇳 VIETNAM LAWS ON AI & CYBERSECURITY",
      items: [
        { title: "Cybersecurity Law (2018) & Penal Code", content: "Using Deepfakes for fraudulent property appropriation constitutes a severe crime under Article 290 of the Penal Code. The maximum penalty can range up to 20 years in prison or life imprisonment." },
        { title: "Decree 13/2023/ND-CP (Personal Data)", content: "Faces and voices are legally classified as 'Sensitive Personal Data'. Collecting or using someone's image to train AI or for manipulation without explicit consent is a severe violation." },
        { title: "Telecommunications Law (Amended 2023)", content: "Mandates strict biometric identity verification (eKYC) for SIM cards. Criminals caught using Deepfakes to bypass eKYC for 'burner' bank accounts will face criminal prosecution for forging official documents." }
      ]
    },
    {
      category: "⚖️ INTERNATIONAL LAW & HUMAN RIGHTS",
      items: [
        { title: "EU AI Act (Europe 2024)", content: "The world's first comprehensive AI legislation. Mandates that all AI-generated content (Deepfakes) must be clearly watermarked. Scam AIs and workplace emotion-recognition AIs are outright banned. Fines reach up to €35M or 7% of global turnover." },
        { title: "United Nations (UN) & Human Rights", content: "The UN Human Rights Council stresses that malicious Deepfakes severely violate Article 12 (Right to Privacy) and Article 19 (Freedom of Expression) of the Universal Declaration of Human Rights, especially regarding election disinformation and non-consensual imagery." },
        { title: "US Laws & NIST Standards", content: "The NIST AI Risk Management Framework demands tech giants integrate output authentication mechanisms. Multiple US states (CA, TX) have criminalized Deepfake usage in political campaigns and for personal revenge." }
      ]
    },
    {
      category: "🔬 DIGITAL FORENSICS TECHNIQUES",
      items: [
        { title: "rPPG Technology (Optical Heart Rate)", content: "Invisible to the naked eye, forensic scanners analyze micro-changes in pixel colors corresponding to human heartbeats. Current Deepfakes completely fail to simulate this natural biological rPPG pulse." },
        { title: "Audio Spectrogram Analysis", content: "Under a spectrogram, a genuine human voice flows smoothly. AI-generated cloned voices leave noticeable high-frequency 'artifacts' and blocky discontinuities that machines can easily detect." },
        { title: "Encrypted Metadata Analysis (C2PA/EXIF)", content: "The C2PA standard embeds a cryptographic 'digital signature' into media at the exact moment of physical camera capture. If AI tampers with the file, this provenance signature chain shatters." }
      ]
    },
    {
      category: "🛡️ PERSONAL DATA PROTECTION & PREVENTION",
      items: [
        { title: "Zero-Trust Principle", content: "Never trust anyone online automatically, even family members, if requests involve finance or sensitive data. Always cross-verify via a different channel (e.g., a direct cellular GSM call)." },
        { title: "Family Safe Keyword", content: "Establish a unique secret password or trick question with family members. Scammers, no matter how perfectly their AI clones a voice, will not know this predetermined keyword." },
        { title: "Minimize Digital Footprint", content: "Restrict posting high-res facial images, original voice videos, and personal info publicly on social media to prevent hackers' AI from harvesting your data for training." }
      ]
    },
    {
      category: "🦹 PROMINENT CYBERCRIME THREAT ACTORS",
      items: [
        { title: "Organized Cybercrime Syndicates", content: "Transnational gangs now operate like modern corporations, compartmentalizing tasks: data brokers, Deepfake generation, psychological scriptwriters, and crypto money laundering networks." },
        { title: "Cybercrime-as-a-Service (CaaS)", content: "Scam tools are offered as services on the Dark Web. Even individuals with no IT knowledge can rent Deepfake kits and scam scripts for a low monthly fee." },
        { title: "Decentralized Attacks via SIP Spoofing", content: "Hackers use virtual signal relays (SIP Spoofing) to mask their IP and caller ID, making tracking and investigation by law enforcement extremely difficult." }
      ]
    },
    {
      category: "📉 SOCIO-ECONOMIC IMPACTS",
      items: [
        { title: "Crisis of Trust", content: "When the boundary between real and fake blurs, society tends to doubt all information. This undermines social cohesion, fractures digital relationships, and causes mass paranoia." },
        { title: "Massive Financial Losses", content: "In just a few years, Deepfake impersonation scams have caused tens of billions of dollars in losses to financial corporations, banks, and individual users globally." },
        { title: "National Security & Political Threats", content: "Deepfakes are weaponized as information warfare to smear politicians, manipulate elections, fake stock market news, and incite riots, directly threatening national stability." }
      ]
    },
    {
      category: "🔮 FUTURE OF CYBERSECURITY & AI",
      items: [
        { title: "AI vs. AI Arms Race", content: "An ongoing war between generative models (Deepfakes) and forensic analysis models (Deepfense). Defense systems must continuously update in real-time to combat Zero-day fakes." },
        { title: "Hardware Authentication Standards", content: "Future camera and smartphone manufacturers will integrate hardware encryption chips to embed cryptographic watermarks directly into media at the exact moment of physical capture." },
        { title: "Personal Security AI Agents", content: "Every digital user will be equipped with a background AI Agent (like the Deepfense project) on their devices, automatically analyzing and blocking multimedia scam signals before psychological manipulation occurs." }
      ]
    }
  ]
};

export const SURVEY_SCALE: Record<Language, string[]> = {
  vi: ["1 HOÀN TOÀN KHÔNG", "2 KHÔNG TÁN THÀNH", "3 TRUNG LẬP", "4 TÁN THÀNH", "5 HOÀN TOÀN ĐỒNG Ý"],
  en: ["1 STRONGLY DISAGREE", "2 DISAGREE", "3 NEUTRAL", "4 AGREE", "5 STRONGLY AGREE"]
};

export const PERSONALITY_QUESTIONS: Record<Language, PersonalityQuestion[]> = {
  vi: [
    { id: "q1", text: "Tôi thường tin vào những video có hình ảnh người thân mà không cần kiểm chứng thêm.", trait: "AWARENESS" },
    { id: "q2", text: "Tôi cảm thấy lo lắng khi nhận được cuộc gọi từ số lạ yêu cầu chuyển tiền gấp.", trait: "ANXIETY" },
    { id: "q3", text: "Tôi tự tin rằng mình có thể phân biệt được video thật và giả bằng mắt thường.", trait: "CONFIDENCE" },
    { id: "q4", text: "Tôi luôn nghi ngờ tính xác thực của các thông tin gây sốc trên mạng xã hội.", trait: "SKEPTICISM" }
  ],
  en: [
    { id: "q1", text: "I often trust videos showing relatives without further verification.", trait: "AWARENESS" },
    { id: "q2", text: "I feel anxious when receiving calls from strangers asking for urgent money transfers.", trait: "ANXIETY" },
    { id: "q3", text: "I am confident that I can distinguish between real and fake videos with the naked eye.", trait: "CONFIDENCE" },
    { id: "q4", text: "I always doubt the authenticity of shocking information on social media.", trait: "SKEPTICISM" }
  ]
};

export const NEWS_DATA: Record<Language, NewsItem[]> = {
  vi: [
    { tag: "HÀ NỘI", title: "Giả mạo Công an lừa đảo chiếm đoạt tài sản", date: "11/2025", loss: "Hàng tỷ VNĐ", desc: "Đối tượng dùng Deepfake mặc quân phục để gọi video lừa đảo người dân qua Zalo.", url: "https://vtv.vn/tim-kiem.htm?keywords=deepfake" },
    { tag: "TP.HCM", title: "Chiêu trò 'người thân cấp cứu' bằng Deepfake", date: "10/2025", loss: "Hàng trăm triệu VNĐ", desc: "Kẻ xấu giả giọng và mặt con cái đang cấp cứu để hối thúc cha mẹ chuyển tiền gấp.", url: "https://tuoitre.vn/tim-kiem.htm?keywords=deepfake" },
    { tag: "CẢNH BÁO", title: "Cuộc gọi video vay tiền bùng phát cuối năm", date: "12/2025", loss: "Hàng tỷ VNĐ/nạn nhân", desc: "Tội phạm lợi dụng dịp lễ tết để giả mạo người thân vay tiền, mượn vốn khẩn cấp.", url: "https://dantri.com.vn/tim-kiem.htm?keywords=deepfake" },
    { tag: "TÍN DỤNG", title: "Giả mạo nhân viên ngân hàng qua Zalo", date: "01/2026", loss: "Toàn bộ số dư", desc: "Dùng Deepfake mặc đồng phục ngân hàng yêu cầu khách hàng đọc mã OTP.", url: "https://vneconomy.vn/tim-kiem.htm?keywords=deepfake" },
    { tag: "GIÁO DỤC", title: "Lừa đảo học phí sinh viên bằng video ảo", date: "02/2026", loss: "Hàng chục triệu VNĐ", desc: "Giả mạo giáo viên gọi điện trực tiếp yêu cầu phụ huynh đóng học phí khẩn cấp.", url: "https://giaoduc.net.vn/tim-kiem.htm?keywords=deepfake" },
    { tag: "CHỨNG KHOÁN", title: "Deepfake lùa gà đầu tư tài chính ảo", date: "03/2026", loss: "Hàng trăm tỷ VNĐ", desc: "Tạo video giả mạo các chuyên gia kinh tế nổi tiếng để kêu gọi chuyển tiền đầu tư.", url: "https://cafef.vn/tim-kiem.htm?keywords=deepfake" },
    { tag: "TÌNH CẢM", title: "Mất trắng sau cuộc gọi với 'người yêu Tây'", date: "02/2026", loss: "Toàn bộ gia sản", desc: "Kẻ gian dùng AI tạo khuôn mặt nam giới ngoại quốc gọi điện hẹn hò qua Telegram.", url: "https://vietnamnet.vn/tim-kiem.htm?keywords=deepfake" },
    { tag: "DOANH NGHIỆP", title: "Kế toán chuyển nhầm 5 tỷ do sếp gọi video", date: "01/2026", loss: "Nhiều tỷ VNĐ", desc: "Cuộc họp nội bộ bị giả mạo hoàn toàn từ hình ảnh đến giọng nói của Giám đốc.", url: "https://vtv.vn/tim-kiem.htm?keywords=deepfake" },
    { tag: "NGÂN HÀNG", title: "Cảnh báo lừa đảo qua mặt eKYC khuôn mặt", date: "07/2025", loss: "Dữ liệu sinh trắc học", desc: "Tội phạm dùng Deepfake vượt qua hệ thống xác thực của một số tổ chức tài chính.", url: "https://vnexpress.net/tim-kiem.htm?keywords=deepfake" },
    { tag: "GIẢI TRÍ", title: "Làn sóng ghép mặt nghệ sĩ vào video nhạy cảm", date: "06/2025", loss: "Danh dự & Sự nghiệp", desc: "Công nghệ Deepfake khiêu dâm tấn công các nghệ sĩ gây bức xúc dư luận.", url: "https://thanhnien.vn/tim-kiem.htm?keywords=deepfake" },
    { tag: "TOÀN CẦU", title: "Video Deepfake Chủ tịch FED gây chao đảo thị trường", date: "03/2026", loss: "Hàng tỷ USD", desc: "Video giả mạo Chủ tịch FED tuyên bố tăng lãi suất khẩn cấp khiến thị trường chứng khoán hoảng loạn bán tháo.", url: "https://www.bloomberg.com/search?q=deepfake" },
    { tag: "MỸ", title: "Lừa đảo hoàn thuế IRS bằng giọng nói AI", date: "03/2026", loss: "Hàng chục triệu USD", desc: "Hàng triệu người Mỹ nhận được cuộc gọi giả giọng nhân viên sở thuế đe dọa thu hồi tài sản.", url: "https://www.wsj.com/search?q=deepfake" },
    { tag: "CHÂU ÂU", title: "Hội đồng quản trị ảo lừa công ty 40 triệu Euro", date: "02/2026", loss: "40 Triệu Euro", desc: "Giám đốc tài chính bị lừa chuyển tiền sau cuộc họp video với 5 thành viên HĐQT đều là Deepfake.", url: "https://www.bbc.com/search?q=deepfake" },
    { tag: "TÀI CHÍNH", title: "Deepfake CEO sàn Crypto lừa đảo Airdrop 15 triệu USD", date: "03/2026", loss: "15 Triệu USD", desc: "Livestream dùng AI tạo hình ảnh CEO nổi tiếng để dụ dỗ người dùng kết nối ví và chiếm đoạt tài sản.", url: "https://cointelegraph.com/search?q=deepfake" },
    { tag: "HÀN QUỐC", title: "Streamer AI bán hàng hiệu giả mạo trên nền tảng lớn", date: "01/2026", loss: "Hàng triệu Won", desc: "Sử dụng Deepfake tạo ra các KOL nổi tiếng livestream bán hàng giả mạo, lừa đảo hàng chục ngàn người.", url: "https://koreajoongangdaily.hankooki.com/search?q=deepfake" },
    { tag: "NHẬT BẢN", title: "Bê bối video giả mạo ứng cử viên chính trị", date: "03/2026", loss: "Uy tín chính trị", desc: "Video Deepfake quay cảnh ứng cử viên nhận hối lộ bị phát tán diện rộng ngay trước thềm bầu cử.", url: "https://japantoday.com/search?q=deepfake" },
    { tag: "SINGAPORE", title: "Tấn công vượt rào eKYC ngân hàng bằng Deepfake 3D", date: "02/2026", loss: "Nghiêm trọng", desc: "Tội phạm mạng sử dụng mặt nạ Deepfake 3D thời gian thực để vượt qua hệ thống nhận diện khuôn mặt.", url: "https://www.straitstimes.com/search?q=deepfake" },
    { tag: "CÔNG NGHỆ", title: "Công cụ Deepfake Live thế hệ mới trên Dark Web", date: "03/2026", loss: "Mối đe dọa toàn cầu", desc: "Phát hiện phần mềm cho phép biến đổi khuôn mặt và giọng nói ngay lập tức trên Zoom/Teams với độ trễ bằng 0.", url: "https://www.wired.com/search?q=deepfake" }
  ],
  en: [
    { tag: "HANOI", title: "Fake Police impersonation to steal property", date: "11/2025", loss: "Billions of VND", desc: "Subjects used Deepfake uniforms to make scam video calls to citizens via Zalo.", url: "https://vtv.vn/tim-kiem.htm?keywords=deepfake" },
    { tag: "HCMC", title: "'Relative in ER' scam using Deepfake", date: "10/2025", loss: "Hundreds of millions VND", desc: "Scammers spoofed a child's voice and face in an emergency to rush parents into wiring money.", url: "https://tuoitre.vn/tim-kiem.htm?keywords=deepfake" },
    { tag: "WARNING", title: "End-of-year video call loan scams surge", date: "12/2025", loss: "Billions of VND/victim", desc: "Criminals exploit the holiday season to impersonate relatives and ask for urgent loans.", url: "https://dantri.com.vn/tim-kiem.htm?keywords=deepfake" },
    { tag: "CREDIT", title: "Fake bank staff requesting OTP via Zalo", date: "01/2026", loss: "Entire Bank Balance", desc: "Scammers wore Deepfaked bank uniforms to trick victims into sharing their OTP codes.", url: "https://vneconomy.vn/tim-kiem.htm?keywords=deepfake" },
    { tag: "EDUCATION", title: "Student tuition fraud via virtual video calls", date: "02/2026", loss: "Tens of millions VND", desc: "Fake teachers called parents directly via video to demand urgent tuition payments.", url: "https://giaoduc.net.vn/tim-kiem.htm?keywords=deepfake" },
    { tag: "STOCK", title: "Deepfake scams luring financial investors", date: "03/2026", loss: "Hundreds of billions VND", desc: "AI-generated videos of famous economic experts urged people to invest in fake platforms.", url: "https://cafef.vn/tim-kiem.htm?keywords=deepfake" },
    { tag: "ROMANCE", title: "Lost everything to a fake 'Foreign Lover' call", date: "02/2026", loss: "Life Savings", desc: "Scammers used AI to generate attractive foreign faces for romance scams on Telegram.", url: "https://vietnamnet.vn/tim-kiem.htm?keywords=deepfake" },
    { tag: "CORP", title: "Accountant wires $200k after fake boss video call", date: "01/2026", loss: "Billions of VND", desc: "An internal corporate meeting was entirely faked, including the image and voice of the Director.", url: "https://vtv.vn/tim-kiem.htm?keywords=deepfake" },
    { tag: "BANKING", title: "Warning on Deepfakes bypassing eKYC systems", date: "07/2025", loss: "Biometric Data", desc: "Criminals successfully used Deepfakes to bypass facial authentication systems of several banks.", url: "https://vnexpress.net/tim-kiem.htm?keywords=deepfake" },
    { tag: "ENT", title: "Wave of celebrities mapped into explicit videos", date: "06/2025", loss: "Honor & Career", desc: "Pornographic Deepfake wave attacking artists caused public outrage and legal action.", url: "https://thanhnien.vn/tim-kiem.htm?keywords=deepfake" },
    { tag: "GLOBAL", title: "Deepfake FED Chair Video Crashes Markets", date: "03/2026", loss: "Billions USD", desc: "A highly realistic AI video of the FED Chair announcing emergency rate hikes caused panic selling.", url: "https://www.bloomberg.com/search?q=deepfake" },
    { tag: "USA", title: "IRS Tax Scam Using AI Voice Cloning", date: "03/2026", loss: "Tens of Millions USD", desc: "Millions of Americans received cloned voice calls from fake tax agents threatening asset seizure.", url: "https://www.wsj.com/search?q=deepfake" },
    { tag: "EUROPE", title: "Virtual Board Meeting Scams Company of €40M", date: "02/2026", loss: "€40 Million", desc: "A CFO wired funds after attending a video call where five board members were actually real-time Deepfakes.", url: "https://www.bbc.com/search?q=deepfake" },
    { tag: "CRYPTO", title: "Deepfake Crypto CEO Drains $15M via Fake Airdrop", date: "03/2026", loss: "$15 Million", desc: "An AI-generated livestream of a prominent CEO tricked users into connecting wallets and losing funds.", url: "https://cointelegraph.com/search?q=deepfake" },
    { tag: "KOREA", title: "AI Streamers Scam Millions in Fake Luxury Sales", date: "01/2026", loss: "Millions of Won", desc: "Deepfaked popular KOLs were used in live commerce to sell counterfeit luxury goods to thousands.", url: "https://koreajoongangdaily.hankooki.com/search?q=deepfake" },
    { tag: "JAPAN", title: "Political Candidate Deepfake Scandal", date: "03/2026", loss: "Political Reputation", desc: "A hyper-realistic video showing a candidate accepting bribes went viral days before a major election.", url: "https://japantoday.com/search?q=deepfake" },
    { tag: "SINGAPORE", title: "3D Deepfake Bypasses Bank eKYC Systems", date: "02/2026", loss: "Critical", desc: "Cybercriminals utilized real-time 3D Deepfake masks to successfully bypass bank facial recognition protocols.", url: "https://www.straitstimes.com/search?q=deepfake" },
    { tag: "TECH", title: "Zero-Latency Live Deepfake Tool on Dark Web", date: "03/2026", loss: "Global Threat", desc: "A new software enables instant face and voice swapping on Zoom/Teams with virtually zero latency.", url: "https://www.wired.com/search?q=deepfake" }
  ]
};
