
import { EnhancedLevelData, ChecklistItem, NewsItem, FunFact, PersonalityQuestion, Language } from './types';

// --- DIGITAL SIGNATURE / CHỮ KÝ SỐ ---
// Chế độ Solo Developer: Hồ Xuân Nguyễn - 25NS039
export const PROJECT_METADATA = {
  name: "DEEPFENSE.AI",
  version: "1.0.0-Solo-Release",
  build_date: new Date().toLocaleDateString('vi-VN'),
  authors: [
    { name: "Hồ Xuân Nguyễn", id: "25NS039", role: "Fullstack Developer / Project Lead" }
  ],
  university: "Vietnam-Korea University of Information and Communication Technology (VKU)",
  department: "Khoa Kỹ thuật Máy tính & Điện tử (Computer Engineering & Electronics)",
  instructor: "", // Đã xóa theo yêu cầu
  license: "Copyright © 2025 Hồ Xuân Nguyễn (25NS039)"
};

export const TRANSLATIONS: Record<Language, any> = {
  vi: {
    hero_badge: "HỆ THỐNG GIÁM SÁT AN NINH AI",
    hero_title: "NỀN TẢNG PHÒNG CHỐNG DEEPFAKE",
    hero_desc: "Dự án giáo dục cộng đồng về Deepfake. Hãy trang bị kiến thức để bảo vệ bản thân và gia đình trước các cuộc tấn công AI tinh vi.",
    btn_scan: "QUÉT RỦI RO",
    btn_challenge: "THỬ THÁCH",
    btn_ai: "MOBILE APP & DATA",
    warning_center: "TRUNG TÂM CẢNH BÁO",
    hotline: "HOTLINE PHẢN ỨNG NHANH",
    knowledge: "BẠN CÓ BIẾT?",
    about_us: "VỀ CHÚNG TÔI & LIÊN HỆ",
    mission: "SỨ MỆNH",
    vision: "TẦM NHÌN",
    team: "TÁC GIẢ DỰ ÁN", 
    report_form: "BÁO CÁO SỰ CỐ",
    send_report: "GỬI BÁO CÁO",
    success_msg: "GỬI THÀNH CÔNG!",
    contact_support: "KÊNH HỖ TRỢ",
    police: "CẢNH SÁT 113",
    cyber_security: "AN NINH MẠNG",
    footer_rights: "BẢO LƯU MỌI QUYỀN.",
    agent_welcome: "Xin chào! Tôi là DEEPFENSE AGENT. Tôi được tích hợp dữ liệu tham khảo từ APWG, PhishTank và cộng đồng Chống Lừa Đảo. Tôi có thể giúp gì cho bạn?",
    agent_placeholder: "Hỏi về dấu hiệu lừa đảo...",
    result_pass: "AN TOÀN",
    result_fail: "NGUY HIỂM",
    label_name: "Tên gọi (Nickname)",
    label_email: "Địa chỉ Email",
    label_attachment: "Đính kèm (Ảnh/Video)",
    label_desc: "Chi tiết sự cố",
    partners_title: "THAM KHẢO DỮ LIỆU TỪ NHỮNG NGUỒN UY TÍN"
  },
  en: {
    hero_badge: "AI SECURITY MONITORING SYSTEM",
    hero_title: "DEEPFAKE DEFENSE PLATFORM",
    hero_desc: "Community education project on Deepfakes. Empower yourself with knowledge to protect your family against sophisticated AI attacks.",
    btn_scan: "RISK SCAN",
    btn_challenge: "CHALLENGE",
    btn_ai: "MOBILE APP & DATA",
    warning_center: "WARNING CENTER",
    hotline: "EMERGENCY HOTLINE",
    knowledge: "DID YOU KNOW?",
    about_us: "ABOUT US & CONTACT",
    mission: "MISSION",
    vision: "VISION",
    team: "PROJECT AUTHOR",
    report_form: "REPORT AN INCIDENT",
    send_report: "SEND REPORT",
    success_msg: "SENT SUCCESSFULLY!",
    contact_support: "SUPPORT CHANNELS",
    police: "POLICE 113",
    cyber_security: "CYBER SECURITY",
    footer_rights: "ALL RIGHTS RESERVED.",
    agent_welcome: "Hello! I am DEEPFENSE AGENT. Utilizing reference data from APWG, PhishTank, and Anti-Phishing community. How can I assist you?",
    agent_placeholder: "Ask about scam signs...",
    result_pass: "SECURE",
    result_fail: "DANGER",
    label_name: "Display Name",
    label_email: "Email Address",
    label_attachment: "Attachment (Image/Video)",
    label_desc: "Incident Details",
    partners_title: "DATA REFERENCED FROM REPUTABLE SOURCES"
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
      category: "🌐 NGUỒN DỮ LIỆU THAM KHẢO",
      items: [
        { title: "APWG & GASA", content: "Tham khảo dữ liệu và báo cáo từ Liên minh chống lừa đảo toàn cầu (GASA) và APWG. Cập nhật blacklist từ Facebook, Microsoft, Twitter." },
        { title: "PhishTank & OpenPhish", content: "Tra cứu thời gian thực với cơ sở dữ liệu URL lừa đảo lớn nhất thế giới, cập nhật liên tục các trang web giả mạo." },
        { title: "Chống Lừa Đảo (VN)", content: "Sử dụng dữ liệu từ cộng đồng 500.000+ thành viên, kết hợp AI Agent nhận diện trang web độc hại với độ chính xác 98%." }
      ]
    },
    {
      category: "🛡️ PHÒNG VỆ ĐỜI SỐNG (DỄ NHỚ)",
      items: [
        { title: "Quy tắc 30 giây", content: "Khi nhận cuộc gọi khẩn cấp, hãy im lặng 30 giây để quan sát kỹ cử động mắt và miệng của người gọi." },
        { title: "Mật mã gia đình", content: "Hãy cùng người thân thiết lập một 'từ khóa bí mật'. Nếu người gọi không biết từ này, đó chắc chắn là Deepfake." },
        { title: "Cử động bất ngờ", content: "Yêu cầu người gọi đưa tay ngang mặt hoặc xoay đầu. AI hiện tại thường bị lỗi nhòe hình khi có vật thể che mặt." }
      ]
    },
    {
      category: "⚙️ DẤU HIỆU KỸ THUẬT",
      items: [
        { title: "Inpainting là gì?", content: "Kỹ thuật AI cho phép xóa bỏ hoặc thêm thắt vật thể vào video gốc một cách hoàn hảo, làm thay đổi hoàn toàn bối cảnh sự việc." },
        { title: "Lỗi ánh sáng động", content: "AI thường gặp khó khăn trong việc mô phỏng ánh sáng phản chiếu từ môi trường lên mắt kính hoặc trang sức kim loại." },
        { title: "Ranh giới gương mặt", content: "Khu vực giữa mặt và tai, hoặc ranh giới tóc thường có hiện tượng mờ nhòe bất thường (blurring) khi đối tượng di chuyển nhanh." }
      ]
    },
    {
      category: "⚖️ PHÁP LUẬT VIỆT NAM",
      items: [
        { title: "Tội lừa đảo chiếm đoạt tài sản", content: "Theo Điều 174 Bộ luật Hình sự 2015, hành vi sử dụng công nghệ cao (Deepfake) để lừa đảo có thể bị phạt tù từ 2 năm đến chung thân tùy mức độ thiệt hại." },
        { title: "Nghị định 13/2023/NĐ-CP", content: "Quy định nghiêm ngặt về bảo vệ dữ liệu cá nhân. Việc sử dụng hình ảnh người khác tạo Deepfake khi chưa được phép là vi phạm pháp luật." },
        { title: "Xử phạt tin giả (NĐ 15/2020)", content: "Hành vi cung cấp, chia sẻ thông tin giả mạo, sai sự thật trên mạng xã hội có thể bị xử phạt hành chính từ 10 đến 20 triệu đồng." }
      ]
    }
  ],
  en: [
    {
      category: "🌐 REFERENCED DATA SOURCES",
      items: [
        { title: "APWG & GASA", content: "Referencing data and reports from Anti-Phishing Working Group (APWG) and GASA. Updating blacklists from Facebook, Microsoft, Twitter." },
        { title: "PhishTank & OpenPhish", content: "Real-time connection with the world's largest phishing URL databases." },
        { title: "ChongLuaDao (VN)", content: "Leveraging data from a 500,000+ member community, combined with AI Agents detecting malicious sites with 98% accuracy." }
      ]
    },
    {
      category: "🛡️ LIFE DEFENSE (EASY TO REMEMBER)",
      items: [
        { title: "30-Second Rule", content: "When receiving an emergency call, stay silent for 30 seconds to closely observe the caller's eye and mouth movements." },
        { title: "Family Password", content: "Establish a 'secret keyword' with relatives. If the caller doesn't know this word, it's definitely a Deepfake." },
        { title: "Unexpected Movement", content: "Ask the caller to wave their hand in front of their face or turn their head. Current AI often glitches when objects cover the face." }
      ]
    },
    {
      category: "⚙️ TECHNICAL SIGNS",
      items: [
        { title: "What is Inpainting?", content: "AI technique that allows seamlessly removing or adding objects to original videos, completely changing the context." },
        { title: "Dynamic Light Glitch", content: "AI often struggles to simulate environmental light reflecting off glasses or metallic jewelry." },
        { title: "Facial Boundaries", content: "The area between face and ears, or the hairline, often shows abnormal blurring when the subject moves fast." }
      ]
    },
    {
      category: "⚖️ VIETNAMESE LAW",
      items: [
        { title: "Property appropriation fraud", content: "Under Article 174 of the 2015 Penal Code, using Deepfake for fraud can lead to imprisonment from 2 years to life." },
        { title: "Decree 13/2023/ND-CP", content: "Strict personal data protection. Unauthorized Deepfake creation using others' images is illegal." },
        { title: "Fake news penalty (D 15/2020)", content: "Providing or sharing fake, untruthful information on social media can be fined 10 to 20 million VND." }
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
    { tag: "TOÀN CẦU", title: "Tập đoàn đa quốc gia mất trắng 25 triệu USD", date: "02/2024", loss: "25.6 Triệu USD", desc: "Nhân viên tài chính chuyển khoản sau cuộc họp video với 'Giám đốc' và 'đồng nghiệp' hoàn toàn do AI tạo ra.", url: "https://edition.cnn.com/2024/02/04/asia/deepfake-cfo-scam-hong-kong-intl-hnk/index.html" },
    { tag: "CHÍNH TRỊ", title: "Deepfake can thiệp bầu cử tổng thống Mỹ", date: "01/2024", loss: "An ninh bầu cử", desc: "Hàng ngàn cử tri nhận được cuộc gọi tự động giả giọng Tổng thống khuyên không đi bỏ phiếu.", url: "https://www.reuters.com/world/us/new-hampshire-investigates-fake-biden-robocall-meant-discourage-voters-2024-01-22/" },
    { tag: "TỶ PHÚ", title: "CEO Ferrari suýt sập bẫy lừa đảo qua WhatsApp", date: "07/2024", loss: "0 USD (Ngăn chặn kịp thời)", desc: "Kẻ gian dùng AI giả giọng CEO Ferrari nhắn tin và gọi điện yêu cầu thực hiện thương vụ thâu tóm bí mật.", url: "https://www.bloomberg.com/news/articles/2024-07-25/ferrari-s-ceo-was-targeted-by-a-deepfake-he-wasn-t-fooled" },
    { tag: "HÀN QUỐC", title: "Vấn nạn tống tiền bằng video khiêu dâm Deepfake", date: "08/2024", loss: "Tổn thương tinh thần", desc: "Hàng loạt sinh viên nữ tại đại học Hàn Quốc bị ghép mặt vào video nhạy cảm để tống tiền.", url: "https://koreajoongangdaily.hankooki.com/page/view/20240827170810" },
    { tag: "TÀI CHÍNH", title: "Livestream giả mạo CEO Binance lừa tiền ảo", date: "05/2024", loss: "Tài sản tiền mã hóa", desc: "Livestream dùng Deepfake người nổi tiếng quảng bá các dự án tiền mã hóa lừa đảo.", url: "https://cointelegraph.com/news/binance-co-founder-yi-he-deepfake-scams" },
    { tag: "SINGAPORE", title: "Giả mạo học sinh du học bị bắt cóc tống tiền", date: "11/2024", loss: "Hàng triệu SGD", desc: "Phụ huynh nhận được video call con mình đang bị trói và khóc lóc kêu cứu, thực chất do AI tạo ra.", url: "https://www.straitstimes.com/singapore/courts-crime/parents-of-overseas-students-fall-prey-to-scams-involving-fake-kidnappings-deepfakes" },
    { tag: "UAE", title: "Ngân hàng bị trộm 35 triệu USD bằng giọng nói ảo", date: "10/2021", loss: "35 Triệu USD", desc: "Băng nhóm dùng công nghệ nhân bản giọng nói của giám đốc công ty để yêu cầu ngân hàng chuyển tiền.", url: "https://www.forbes.com/sites/thomasbrewster/2021/10/14/huge-bank-fraud-uses-deep-fake-voice-tech-to-steal-millions/" },
    { tag: "CÔNG NGHỆ", title: "Mã nguồn AI tạo video giả chỉ với 3 giây âm thanh", date: "08/2025", loss: "Mối đe dọa toàn cầu", desc: "Công cụ mới cho phép tạo video giả mạo mượt mà chỉ với 1 bức ảnh và 3 giây âm thanh.", url: "https://tinhte.vn/search?q=deepfake" }
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
    { tag: "GLOBAL", title: "Multinational firm loses $25M in deepfake heist", date: "02/2024", loss: "$25.6 Million", desc: "Finance worker tricked into transferring funds after a video call with an AI-generated 'CFO'.", url: "https://edition.cnn.com/2024/02/04/asia/deepfake-cfo-scam-hong-kong-intl-hnk/index.html" },
    { tag: "POLITICS", title: "Deepfake audio of President interferes with election", date: "01/2024", loss: "Election Security", desc: "Thousands of voters received robocalls faking the US President's voice advising against voting.", url: "https://www.reuters.com/world/us/new-hampshire-investigates-fake-biden-robocall-meant-discourage-voters-2024-01-22/" },
    { tag: "BILLIONAIRE", title: "Ferrari CEO nearly falls for WhatsApp deepfake", date: "07/2024", loss: "$0 (Prevented via test)", desc: "Scammers used AI to fake the Ferrari CEO's voice requesting a secret business transfer.", url: "https://www.bloomberg.com/news/articles/2024-07-25/ferrari-s-ceo-was-targeted-by-a-deepfake-he-wasn-t-fooled" },
    { tag: "KOREA", title: "Sextortion epidemic using Deepfake porn videos", date: "08/2024", loss: "Psychological Trauma", desc: "Korean university students shocked as their faces were mapped onto explicit videos for extortion.", url: "https://koreajoongangdaily.hankooki.com/page/view/20240827170810" },
    { tag: "CRYPTO", title: "Fake Binance CEO livestream scams crypto investors", date: "05/2024", loss: "Crypto Assets", desc: "Livestreams used Deepfakes of the Binance CEO to promote fraudulent cryptocurrency projects.", url: "https://cointelegraph.com/news/binance-co-founder-yi-he-deepfake-scams" },
    { tag: "SINGAPORE", title: "Fake kidnapping of international student for ransom", date: "11/2024", loss: "Millions of SGD", desc: "Parents received a video call of their child crying and tied up, which was entirely AI-generated.", url: "https://www.straitstimes.com/singapore/courts-crime/parents-of-overseas-students-fall-prey-to-scams-involving-fake-kidnappings-deepfakes" },
    { tag: "UAE", title: "Bank robbed of $35M using AI voice cloning", date: "10/2021", loss: "$35 Million", desc: "Thieves used voice cloning tech to impersonate a company director and authorize massive transfers.", url: "https://www.forbes.com/sites/thomasbrewster/2021/10/14/huge-bank-fraud-uses-deep-fake-voice-tech-to-steal-millions/" },
    { tag: "TECH", title: "AI generates fake video with only 3 seconds of audio", date: "08/2025", loss: "Global Threat", desc: "A new tool allows generating seamless fake videos using just 1 photo and 3 seconds of audio.", url: "https://tinhte.vn/search?q=deepfake" }
  ]
};
