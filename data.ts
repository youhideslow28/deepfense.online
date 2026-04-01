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

export interface TranslationData {
  hero_badge: string; hero_title: string; hero_desc: string; btn_scan: string;
  btn_challenge: string; btn_ai: string; warning_center: string; hotline: string;
  knowledge: string; about_us: string; mission: string; vision: string; team: string;
  report_form: string; send_report: string; success_msg: string; contact_support: string;
  police: string; cyber_security: string; footer_rights: string; agent_welcome: string;
  agent_placeholder: string; result_pass: string; result_fail: string; label_name: string;
  label_email: string; label_attachment: string; label_desc: string;
  simulator_title: string; simulator_desc: string; detection_time: string; start_sim: string;
  trap_msg: string; trap_lesson: string; verify_msg: string; verify_reason: string;
  retest: string; replay: string; report_scam: string; chat_placeholder: string;
  transfer_btn: string; reject_btn: string; chat_inactive: string; session_ended: string;
  crisis_title: string; crisis_desc: string; btn_report_pdf: string; btn_first_aid: string;
  btn_hotspot: string; report_locked: string; latest_live: string; tbd: string;
}

export const TRANSLATIONS: Record<Language, TranslationData> = {
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
    agent_welcome: "**Xin chào! Tôi là trợ lý ảo DEEPFENSE AGENT.**\n\n**Tôi có thể hỗ trợ bạn các chức năng sau:**\n- **Quét Đa phương thức:** Nhận diện lỗi AI trong hình ảnh, video (Bạn có thể gửi đường link).\n- **Phân tích Kịch bản:** Vạch trần thủ đoạn lừa đảo qua tin nhắn tống tiền, kêu gọi đầu tư.\n- **Sơ cứu Tâm lý:** Hướng dẫn từng bước xử lý khẩn cấp khi bị lộ lọt dữ liệu.\n\n*Hãy nhắn tin hoặc dán đường link vào đây để tôi kiểm tra nhé!*",
    agent_placeholder: "Dán link hoặc hỏi về AI lừa đảo...",
    result_pass: "AN TOÀN",
    result_fail: "NGUY HIỂM",
    label_name: "Tên gọi (Nickname)",
    label_email: "Địa chỉ Email",
    label_attachment: "Đính kèm (Ảnh/Video)",
    label_desc: "Chi tiết sự cố",
    simulator_title: "BẪY NHẬN THỨC (MÔ PHỎNG)",
    simulator_desc: "Đo lường thời gian sập bẫy của bạn. Hệ thống sẽ đóng vai kẻ lừa đảo bằng kịch bản AI tạo ra.",
    detection_time: "THỜI GIAN NHẬN DIỆN",
    start_sim: "Bắt đầu Mô phỏng",
    trap_msg: "BẠN ĐÃ MẮC BẪY",
    trap_lesson: "Kẻ lừa đảo tạo ra áp lực thời gian và sự uy quyền khiến não bộ bỏ qua bước xác minh.",
    verify_msg: "XÁC MINH THÀNH CÔNG",
    verify_reason: "Bạn không bị áp lực thời gian khống chế và báo cáo kịp thời thủ đoạn lạ.",
    retest: "Thử lại (Retest)",
    replay: "Chơi lại (Replay)",
    report_scam: "Báo cáo Scam",
    chat_placeholder: "Trò chuyện hoặc bắt bẻ...",
    transfer_btn: "XÁC NHẬN CHUYỂN",
    reject_btn: "TỪ CHỐI / BÁO CÁO",
    chat_inactive: "KHUNG CHAT CHƯA KÍCH HOẠT",
    session_ended: "PHIÊN GIAO DỊCH ĐÃ KẾT THÚC",
    crisis_title: "TRUNG TÂM ỨNG CỨU",
    crisis_desc: "Cổng hỗ trợ khẩn cấp nạn nhân của tội phạm công nghệ cao và lừa đảo Deepfake.",
    btn_report_pdf: "Đơn Tố Giác (PDF)",
    btn_first_aid: "Sơ Cứu Tâm Lý",
    btn_hotspot: "Bản Đồ Điểm Nóng",
    report_locked: "Tính năng này hiện chỉ hỗ trợ các văn bản pháp lý tiếng Việt.",
    latest_live: "TIN MỚI (LIVE)",
    tbd: "Chưa xác định"
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
    agent_welcome: "**Hello! I am your DEEPFENSE AGENT.**\n\n**I can assist you with the following:**\n- **Multi-modal Scanning:** Detect AI flaws in images or videos (You can send me a link).\n- **Scam Script Analysis:** Expose fraud tactics in spam messages and fake investments.\n- **Emergency First Aid:** Provide step-by-step guidance when data is compromised.\n\n*Please send a message or paste a suspicious link here for me to check!*",
    agent_placeholder: "Paste a link or ask questions...",
    result_pass: "SECURE",
    result_fail: "DANGER",
    label_name: "Display Name",
    label_email: "Email Address",
    label_attachment: "Attachment (Image/Video)",
    label_desc: "Incident Details",
    simulator_title: "CONFIDENCE SIMULATOR",
    simulator_desc: "Measure your reaction time to scams. The AI will play the role of a scammer with generated scripts.",
    detection_time: "DETECTION TIME",
    start_sim: "Start Simulation",
    trap_msg: "YOU FELL FOR THE TRAP",
    trap_lesson: "Scammers create time pressure and authority to bypass your verification logic.",
    verify_msg: "VERIFIED SUCCESSFULLY",
    verify_reason: "You were not manipulated by time pressure and reported the anomaly promptly.",
    retest: "Retest",
    replay: "Replay",
    report_scam: "Report Scam",
    chat_placeholder: "Chat or challenge them...",
    transfer_btn: "CONFIRM TRANSFER",
    reject_btn: "REJECT / REPORT",
    chat_inactive: "CHAT BOX INACTIVE",
    session_ended: "SESSION ENDED",
    crisis_title: "CRISIS HUB",
    crisis_desc: "Emergency support portal for victims of high-tech crimes and Deepfake fraud.",
    btn_report_pdf: "Report Form (PDF)",
    btn_first_aid: "Psychological First Aid",
    btn_hotspot: "Hotspot Map",
    report_locked: "This feature currently only supports Vietnamese legal documents.",
    latest_live: "LATEST NEWS (LIVE)",
    tbd: "TBD"
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

interface KnowledgeCategory {
  category: string;
  items: { title: string; content: string; }[];
}

export const KNOWLEDGE_BASE: Record<Language, KnowledgeCategory[]> = {
  vi: [
    {
      category: "LUẬT PHÁP QUỐC TẾ & LIÊN HỢP QUỐC",
      items: [
        { title: "Nghị quyết Liên Hợp Quốc về AI (2024)", content: "Đây là văn bản lịch sử mang tính toàn cầu đầu tiên, thúc đẩy việc phát triển các hệ thống AI an toàn, bảo mật và đáng tin cậy. Nghị quyết nhấn mạnh rằng việc phát triển AI phải đi đôi với bảo vệ quyền con người, bất kể là trong môi trường thực hay không gian số." },
        { title: "Đạo luật Trí tuệ Nhân tạo của EU (EU AI Act)", content: "Bộ luật toàn diện nhất thế giới phân loại AI theo mức độ rủi ro. Deepfake được xếp vào nhóm bắt buộc phải minh bạch: Mọi nội dung do AI tạo ra phải được dán nhãn rõ ràng để người dân không bị nhầm lẫn." },
        { title: "Tuyên bố Bletchley (2023)", content: "Sự cam kết của 28 quốc gia hàng đầu về công nghệ nhằm kiểm soát rủi ro từ các mô hình AI tiên tiến nhất (Frontier AI), tập trung vào việc ngăn chặn AI bị lợi dụng cho tội phạm mạng và lừa đảo quy mô lớn." }
      ]
    },
    {
      category: "QUYỀN CON NGƯỜI TRONG KỶ NGUYÊN SỐ",
      items: [
        { title: "Quyền bảo vệ danh dự & phẩm giá", content: "Tuyên ngôn Quốc tế về Nhân quyền khẳng định không ai bị xâm phạm đời tư hoặc bị tấn công vào danh dự. Deepfake khiêu dâm hoặc bôi nhọ là hành vi vi phạm nhân quyền nghiêm trọng nhất hiện nay." },
        { title: "Quyền bất khả xâm phạm về hình ảnh", content: "Mỗi cá nhân có quyền kiểm soát tuyệt đối việc sử dụng khuôn mặt và giọng nói của mình. Việc thu thập dữ liệu trái phép để huấn luyện AI mà không được sự đồng ý là hành vi xâm phạm quyền tự do cá nhân." },
        { title: "Quyền được biết (Right to Know)", content: "Trong một xã hội dân chủ, mọi người có quyền được thông báo nếu họ đang giao tiếp với một thực thể trí tuệ nhân tạo, nhằm đảm bảo tính minh bạch và tránh các hành vi thao túng tâm lý." }
      ]
    },
    {
      category: "BẢN QUYỀN & SỞ HỮU TRÍ TUỆ",
      items: [
        { title: "Quyền sở hữu đặc điểm cá nhân (Right of Publicity)", content: "Pháp luật hiện đại bắt đầu công nhận hình ảnh, giọng nói và phong cách cá nhân là một loại tài sản trí tuệ. Nghệ sĩ và người dùng có quyền ngăn chặn việc AI sao chép thần thái của mình để trục lợi." },
        { title: "Dữ liệu huấn luyện trái phép", content: "Hầu hết các AI Deepfake được huấn luyện trên hàng tỷ hình ảnh quét từ Internet mà không xin phép. Đây được coi là hành vi vi phạm bản quyền dữ liệu quy mô lớn nhất trong lịch sử nhân loại." },
        { title: "Tiêu chuẩn xác thực nội dung (C2PA)", content: "Một liên minh công nghệ toàn cầu (Adobe, Microsoft...) đã tạo ra tiêu chuẩn C2PA - nhúng 'chữ ký số' vào metadata của ảnh chụp thực tế để phân biệt tệp tin gốc với tệp tin đã qua xử lý AI." }
      ]
    },
    {
      category: "TÂM LÝ HỌC DEEPFAKE & TÁC ĐỘNG XÃ HỘI",
      items: [
        { title: "Xói mòn niềm tin (The Liar's Dividend)", content: "Khi Deepfake phổ biến, người ta bắt đầu nghi ngờ ngay cả những video thật. Điều này tạo cơ hội cho kẻ gian phủ nhận các bằng chứng phạm tội thực sự bằng cách tuyên bố: 'Đó chỉ là Deepfake'." },
        { title: "Hội chứng PTSD kỹ thuật số", content: "Các nghiên cứu tâm lý học chỉ ra rằng nạn nhân của Deepfake chịu đựng những tổn thương tinh thần, sự trầm cảm và lo âu tương đương với các vụ bạo lực thể xác ngoài đời thực." },
        { title: "Cơ chế mù quáng kỹ thuật số", content: "Bộ não con người có xu hướng tự động tin vào hình ảnh khuôn mặt người quen qua màn hình. Tội phạm lợi dụng điểm yếu sinh học này để thực hiện các cuộc gọi lừa đảo 'chớp nhoáng' khiến nạn nhân không kịp nghi ngờ." }
      ]
    },
    {
      category: "CƠ BẢN VỀ DEEPFAKE & AI TẠO SINH",
      items: [
        { title: "Định nghĩa Deepfake", content: "Là sự kết hợp giữa 'Deep learning' (Học sâu) và 'Fake' (Giả mạo). Kỹ thuật này sử dụng AI để thay thế khuôn mặt, giọng nói hoặc cử chỉ của một người bằng người khác một cách chân thực." },
        { title: "Nguyên lý hoạt động (GANs)", content: "Mạng đối nghịch sinh (Generative Adversarial Networks) gồm 2 phần: 'Generator' (Kẻ tạo giả) cố gắng tạo ra ảnh thật nhất có thể, và 'Discriminator' (Cảnh sát) cố gắng phân biệt ảnh thật/giả. Chúng huấn luyện lẫn nhau đến khi ảnh giả không thể bị phát hiện." },
        { title: "Mô hình Khuếch tán (Diffusion Models)", content: "Công nghệ mới thay thế GANs (như Midjourney, Stable Diffusion), hoạt động bằng cách thêm nhiễu vào dữ liệu rồi học cách khử nhiễu để tạo ra hình ảnh/video mới hoàn toàn từ văn bản mô tả." }
      ]
    },
    {
      category: "CÔNG NGHỆ DEEPFAKE MỚI NHẤT 2026",
      items: [
        { title: "Real-time Deepfake (Độ trễ bằng 0)", content: "Các công cụ trên Dark Web hiện cho phép hoán đổi khuôn mặt và giọng nói trực tiếp trên các cuộc gọi video Zalo/Messenger/Teams mà không bị giật lag, vượt qua cả các bước kiểm tra vẫy tay cơ bản." },
        { title: "Zero-Shot Voice Cloning", content: "Công nghệ AI âm thanh thế hệ mới chỉ cần 3-5 giây mẫu âm thanh gốc để nhân bản hoàn hảo giọng nói của bất kỳ ai, bao gồm cả nhịp thở, ngữ điệu và các biểu cảm phức tạp như cười, khóc." },
        { title: "AI Text-to-Video (Sora & beyond)", content: "Khả năng tạo ra các video dài vài phút với độ chân thực vật lý hoàn hảo chỉ từ một dòng văn bản mô tả, đe dọa trực tiếp đến tính xác thực của camera an ninh và bằng chứng video trước tòa." }
      ]
    }
  ],
  en: [
    {
      category: "INTERNATIONAL LAW & UNITED NATIONS",
      items: [
        { title: "UN Resolution on AI (2024)", content: "The first global landmark document promoting safe, secure, and trustworthy AI systems. It emphasizes that human rights must be protected alongside AI development, both online and offline." },
        { title: "European Union AI Act", content: "The world's first comprehensive legal framework for AI. Deepfakes are classified under transparency obligations: all AI-generated content must be clearly labeled to prevent public deception." },
        { title: "The Bletchley Declaration (2023)", content: "A commitment by 28 nations to manage risks from 'Frontier AI' models, focusing on preventing AI from being exploited for cybercrime and large-scale fraud." }
      ]
    },
    {
      category: "HUMAN RIGHTS IN THE DIGITAL AGE",
      items: [
        { title: "Right to Honor & Dignity", content: "The Universal Declaration of Human Rights affirms that no one shall be subjected to attacks on their reputation. Non-consensual deepfakes are among the most severe violations of digital dignity today." },
        { title: "Inviolability of Personal Image", content: "Every individual has the right to control the use of their face and voice. Scraping biometric data without consent to train AI models is a direct violation of personal freedom." },
        { title: "Right to Know", content: "In a democratic society, individuals have the right to be informed when they are interacting with an AI entity, ensuring transparency and preventing psychological manipulation." }
      ]
    },
    {
      category: "COPYRIGHT & INTELLECTUAL PROPERTY",
      items: [
        { title: "Right of Publicity", content: "Modern law is recognizing personal traits (face, voice, style) as a type of intellectual property. Creators have the legal right to prevent AI from mimicking their persona for profit." },
        { title: "Unauthorized Training Data", content: "Most Deepfake engines are trained on billions of scraped images without permission. This is considered the largest-scale data copyright infringement in human history." },
        { title: "C2PA Verification Standard", content: "A tech alliance (Adobe, Microsoft...) created C2PA - embedding digital provenance into camera metadata to distinguish original files from AI-manipulated ones." }
      ]
    },
    {
      category: "DEEPFAKE PSYCHOLOGY & SOCIAL IMPACT",
      items: [
        { title: "Erosion of Trust (The Liar's Dividend)", content: "When deepfakes become common, people start doubting real videos. This allows criminals to deny true evidence of wrongdoing by simply claiming: 'It's just a deepfake'." },
        { title: "Digital PTSD", content: "Psychological studies indicate that deepfake victims suffer emotional trauma, depression, and anxiety levels comparable to victims of physical violence in the real world." },
        { title: "Digital Blindness Mechanism", content: "The human brain is biologically wired to trust familiar faces on screens. Scammers exploit this exploit to conduct 'lightning-fast' fraud calls before the victim can question logic." }
      ]
    },
    {
      category: "DEEPFAKE & GENERATIVE AI BASICS",
      items: [
        { title: "Deepfake Definition", content: "A portmanteau of 'Deep learning' and 'Fake'. It uses Artificial Intelligence to replace a person's face, voice, or gestures with someone else's with extreme realism." },
        { title: "How it works (GANs)", content: "Generative Adversarial Networks consist of two parts: a 'Generator' trying to create the most realistic fake images, and a 'Discriminator' acting as a detective to distinguish real from fake. They train against each other until fakes become undetectable." },
        { title: "Diffusion Models", content: "The new technology replacing GANs (used in Midjourney, Stable Diffusion). It works by adding noise to data and learning to denoise it to create entirely new, highly detailed media from text prompts." }
      ]
    },
    {
      category: "LATEST DEEPFAKE TECHNOLOGIES 2026",
      items: [
        { title: "Real-time Deepfake (Zero Latency)", content: "Dark Web tools now allow seamless, live face and voice swapping on Zoom, Teams, and Zalo without lag, bypassing even basic 'wave hand in front of face' security checks." },
        { title: "Zero-Shot Voice Cloning", content: "Next-generation audio AI requires only 3 to 5 seconds of original voice samples to perfectly clone anyone's voice, replicating breathing patterns, intonations, and complex emotions (laughing, crying)." },
        { title: "AI Text-to-Video (Sora & Beyond)", content: "The capability to generate multi-minute videos with perfect physical realism from a single text prompt. This directly threatens the legal authenticity of security cameras and video evidence in court." }
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
    { tag: "CHỨNG KHOÁN", title: "Deepfake lùa gà đầu tư tài chính ảo", date: "25/03/2026", loss: "Hàng trăm tỷ VNĐ", desc: "Tạo video giả mạo các chuyên gia kinh tế nổi tiếng để kêu gọi chuyển tiền đầu tư.", url: "https://cafef.vn/tim-kiem.htm?keywords=deepfake" },
    { tag: "TOÀN CẦU", title: "Video Deepfake Chủ tịch FED gây chao đảo thị trường", date: "24/03/2026", loss: "Hàng tỷ USD", desc: "Video giả mạo Chủ tịch FED tuyên bố tăng lãi suất khẩn cấp khiến thị trường chứng khoán hoảng loạn bán tháo.", url: "https://www.bloomberg.com/search?q=deepfake" },
    { tag: "MỸ", title: "Lừa đảo hoàn thuế IRS bằng giọng nói AI", date: "23/03/2026", loss: "Hàng chục triệu USD", desc: "Hàng triệu người Mỹ nhận được cuộc gọi giả giọng nhân viên sở thuế đe dọa thu hồi tài sản.", url: "https://www.wsj.com/search?q=deepfake" },
    { tag: "TÀI CHÍNH", title: "Deepfake CEO sàn Crypto lừa đảo Airdrop 15 triệu USD", date: "22/03/2026", loss: "15 Triệu USD", desc: "Livestream dùng AI tạo hình ảnh CEO nổi tiếng để dụ dỗ người dùng kết nối ví và chiếm đoạt tài sản.", url: "https://cointelegraph.com/search?q=deepfake" },
    { tag: "NHẬT BẢN", title: "Bê bối video giả mạo ứng cử viên chính trị", date: "21/03/2026", loss: "Uy tín chính trị", desc: "Video Deepfake quay cảnh ứng cử viên nhận hối lộ bị phát tán diện rộng ngay trước thềm bầu cử.", url: "https://japantoday.com/search?q=deepfake" },
    { tag: "CÔNG NGHỆ", title: "Công cụ Deepfake Live thế hệ mới trên Dark Web", date: "20/03/2026", loss: "Mối đe dọa toàn cầu", desc: "Phát hiện phần mềm cho phép biến đổi khuôn mặt và giọng nói ngay lập tức trên Zoom/Teams với độ trễ bằng 0.", url: "https://www.wired.com/search?q=deepfake" },
    { tag: "GIÁO DỤC", title: "Lừa đảo học phí sinh viên bằng video ảo", date: "15/02/2026", loss: "Hàng chục triệu VNĐ", desc: "Giả mạo giáo viên gọi điện trực tiếp yêu cầu phụ huynh đóng học phí khẩn cấp.", url: "https://giaoduc.net.vn/tim-kiem.htm?keywords=deepfake" },
    { tag: "TÌNH CẢM", title: "Mất trắng sau cuộc gọi với 'người yêu Tây'", date: "10/02/2026", loss: "Toàn bộ gia sản", desc: "Kẻ gian dùng AI tạo khuôn mặt nam giới ngoại quốc gọi điện hẹn hò qua Telegram.", url: "https://vietnamnet.vn/tim-kiem.htm?keywords=deepfake" },
    { tag: "CHÂU ÂU", title: "Hội đồng quản trị ảo lừa công ty 40 triệu Euro", date: "05/02/2026", loss: "40 Triệu Euro", desc: "Giám đốc tài chính bị lừa chuyển tiền sau cuộc họp video với 5 thành viên HĐQT đều là Deepfake.", url: "https://www.bbc.com/search?q=deepfake" },
    { tag: "SINGAPORE", title: "Tấn công vượt rào eKYC ngân hàng bằng Deepfake 3D", date: "01/02/2026", loss: "Nghiêm trọng", desc: "Tội phạm mạng sử dụng mặt nạ Deepfake 3D thời gian thực để vượt qua hệ thống nhận diện khuôn mặt.", url: "https://www.straitstimes.com/search?q=deepfake" },
    { tag: "TÍN DỤNG", title: "Giả mạo nhân viên ngân hàng qua Zalo", date: "15/01/2026", loss: "Toàn bộ số dư", desc: "Dùng Deepfake mặc đồng phục ngân hàng yêu cầu khách hàng đọc mã OTP.", url: "https://vneconomy.vn/tim-kiem.htm?keywords=deepfake" },
    { tag: "DOANH NGHIỆP", title: "Kế toán chuyển nhầm 5 tỷ do sếp gọi video", date: "10/01/2026", loss: "Nhiều tỷ VNĐ", desc: "Cuộc họp nội bộ bị giả mạo hoàn toàn từ hình ảnh đến giọng nói của Giám đốc.", url: "https://vtv.vn/tim-kiem.htm?keywords=deepfake" },
    { tag: "HÀN QUỐC", title: "Streamer AI bán hàng hiệu giả mạo trên nền tảng lớn", date: "05/01/2026", loss: "Hàng triệu Won", desc: "Sử dụng Deepfake tạo ra các KOL nổi tiếng livestream bán hàng giả mạo, lừa đảo hàng chục ngàn người.", url: "https://koreajoongangdaily.hankooki.com/search?q=deepfake" },
    { tag: "CẢNH BÁO", title: "Cuộc gọi video vay tiền bùng phát cuối năm", date: "25/12/2025", loss: "Hàng tỷ VNĐ/nạn nhân", desc: "Tội phạm lợi dụng dịp lễ tết để giả mạo người thân vay tiền, mượn vốn khẩn cấp.", url: "https://dantri.com.vn/tim-kiem.htm?keywords=deepfake" },
    { tag: "HÀ NỘI", title: "Giả mạo Công an lừa đảo chiếm đoạt tài sản", date: "15/11/2025", loss: "Hàng tỷ VNĐ", desc: "Đối tượng dùng Deepfake mặc quân phục để gọi video lừa đảo người dân qua Zalo.", url: "https://vtv.vn/tim-kiem.htm?keywords=deepfake" },
    { tag: "TP.HCM", title: "Chiêu trò 'người thân cấp cứu' bằng Deepfake", date: "20/10/2025", loss: "Hàng trăm triệu VNĐ", desc: "Kẻ xấu giả giọng và mặt con cái đang cấp cứu để hối thúc cha mẹ chuyển tiền gấp.", url: "https://tuoitre.vn/tim-kiem.htm?keywords=deepfake" },
    { tag: "NGÂN HÀNG", title: "Cảnh báo lừa đảo qua mặt eKYC khuôn mặt", date: "15/07/2025", loss: "Dữ liệu sinh trắc học", desc: "Tội phạm dùng Deepfake vượt qua hệ thống xác thực của một số tổ chức tài chính.", url: "https://vnexpress.net/tim-kiem.htm?keywords=deepfake" },
    { tag: "GIẢI TRÍ", title: "Làn sóng ghép mặt nghệ sĩ vào video nhạy cảm", date: "10/06/2025", loss: "Danh dự & Sự nghiệp", desc: "Công nghệ Deepfake khiêu dâm tấn công các nghệ sĩ gây bức xúc dư luận.", url: "https://thanhnien.vn/tim-kiem.htm?keywords=deepfake" }
  ],
  en: [
    { tag: "STOCK", title: "Deepfake scams luring financial investors", date: "25/03/2026", loss: "Hundreds of billions VND", desc: "AI-generated videos of famous economic experts urged people to invest in fake platforms.", url: "https://cafef.vn/tim-kiem.htm?keywords=deepfake" },
    { tag: "GLOBAL", title: "Deepfake FED Chair Video Crashes Markets", date: "24/03/2026", loss: "Billions USD", desc: "A highly realistic AI video of the FED Chair announcing emergency rate hikes caused panic selling.", url: "https://www.bloomberg.com/search?q=deepfake" },
    { tag: "USA", title: "IRS Tax Scam Using AI Voice Cloning", date: "23/03/2026", loss: "Tens of Millions USD", desc: "Millions of Americans received cloned voice calls from fake tax agents threatening asset seizure.", url: "https://www.wsj.com/search?q=deepfake" },
    { tag: "CRYPTO", title: "Deepfake Crypto CEO Drains $15M via Fake Airdrop", date: "22/03/2026", loss: "$15 Million", desc: "An AI-generated livestream of a prominent CEO tricked users into connecting wallets and losing funds.", url: "https://cointelegraph.com/search?q=deepfake" },
    { tag: "JAPAN", title: "Political Candidate Deepfake Scandal", date: "21/03/2026", loss: "Political Reputation", desc: "A hyper-realistic video showing a candidate accepting bribes went viral days before a major election.", url: "https://japantoday.com/search?q=deepfake" },
    { tag: "TECH", title: "Zero-Latency Live Deepfake Tool on Dark Web", date: "20/03/2026", loss: "Global Threat", desc: "A new software enables instant face and voice swapping on Zoom/Teams with virtually zero latency.", url: "https://www.wired.com/search?q=deepfake" },
    { tag: "EDUCATION", title: "Student tuition fraud via virtual video calls", date: "15/02/2026", loss: "Tens of millions VND", desc: "Fake teachers called parents directly via video to demand urgent tuition payments.", url: "https://giaoduc.net.vn/tim-kiem.htm?keywords=deepfake" },
    { tag: "ROMANCE", title: "Lost everything to a fake 'Foreign Lover' call", date: "10/02/2026", loss: "Life Savings", desc: "Scammers used AI to generate attractive foreign faces for romance scams on Telegram.", url: "https://vietnamnet.vn/tim-kiem.htm?keywords=deepfake" },
    { tag: "EUROPE", title: "Virtual Board Meeting Scams Company of €40M", date: "05/02/2026", loss: "€40 Million", desc: "A CFO wired funds after attending a video call where five board members were actually real-time Deepfakes.", url: "https://www.bbc.com/search?q=deepfake" },
    { tag: "SINGAPORE", title: "3D Deepfake Bypasses Bank eKYC Systems", date: "01/02/2026", loss: "Critical", desc: "Cybercriminals utilized real-time 3D Deepfake masks to successfully bypass bank facial recognition protocols.", url: "https://www.straitstimes.com/search?q=deepfake" },
    { tag: "CREDIT", title: "Fake bank staff requesting OTP via Zalo", date: "15/01/2026", loss: "Entire Bank Balance", desc: "Scammers wore Deepfaked bank uniforms to trick victims into sharing their OTP codes.", url: "https://vneconomy.vn/tim-kiem.htm?keywords=deepfake" },
    { tag: "CORP", title: "Accountant wires $200k after fake boss video call", date: "10/01/2026", loss: "Billions of VND", desc: "An internal corporate meeting was entirely faked, including the image and voice of the Director.", url: "https://vtv.vn/tim-kiem.htm?keywords=deepfake" },
    { tag: "KOREA", title: "AI Streamers Scam Millions in Fake Luxury Sales", date: "05/01/2026", loss: "Millions of Won", desc: "Deepfaked popular KOLs were used in live commerce to sell counterfeit luxury goods to thousands.", url: "https://koreajoongangdaily.hankooki.com/search?q=deepfake" },
    { tag: "WARNING", title: "End-of-year video call loan scams surge", date: "25/12/2025", loss: "Billions of VND/victim", desc: "Criminals exploit the holiday season to impersonate relatives and ask for urgent loans.", url: "https://dantri.com.vn/tim-kiem.htm?keywords=deepfake" },
    { tag: "HANOI", title: "Fake Police impersonation to steal property", date: "15/11/2025", loss: "Billions of VND", desc: "Subjects used Deepfake uniforms to make scam video calls to citizens via Zalo.", url: "https://vtv.vn/tim-kiem.htm?keywords=deepfake" },
    { tag: "HCMC", title: "'Relative in ER' scam using Deepfake", date: "20/10/2025", loss: "Hundreds of millions VND", desc: "Scammers spoofed a child's voice and face in an emergency to rush parents into wiring money.", url: "https://tuoitre.vn/tim-kiem.htm?keywords=deepfake" },
    { tag: "BANKING", title: "Warning on Deepfakes bypassing eKYC systems", date: "15/07/2025", loss: "Biometric Data", desc: "Criminals successfully used Deepfakes to bypass facial authentication systems of several banks.", url: "https://vnexpress.net/tim-kiem.htm?keywords=deepfake" },
    { tag: "ENT", title: "Wave of celebrities mapped into explicit videos", date: "10/06/2025", loss: "Honor & Career", desc: "Pornographic Deepfake wave attacking artists caused public outrage and legal action.", url: "https://thanhnien.vn/tim-kiem.htm?keywords=deepfake" }
  ]
};
