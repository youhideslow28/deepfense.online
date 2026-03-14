
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
    label_name: "Tên người báo cáo",
    label_phone: "Số điện thoại",
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
    label_name: "Reporter Name",
    label_phone: "Phone Number",
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
    { title: "MẮT VUÔNG?", content: "Các mẫu AI cũ thường tạo ra con ngươi hình vuông thay vì hình tròn tự nhiên." },
    { title: "NHỊP THỞ", content: "Deepfake hiếm khi mô phỏng được nhịp thở nhẹ nhàng làm rung vai của con người." },
    { title: "GÓC NGHIÊNG", content: "AI gặp khó khăn nhất khi nhân vật quay nghiêng mặt 90 độ." },
    { title: "BÀN TAY", content: "AI thế hệ cũ thường xuyên vẽ sai số lượng ngón tay hoặc các khớp tay bị biến dạng." }
  ],
  en: [
    { title: "SQUARE EYES?", content: "Old AI models often created square pupils instead of natural circular ones." },
    { title: "BREATHING", content: "Deepfakes rarely simulate the subtle shoulder movements of human breathing." },
    { title: "SIDE PROFILE", content: "AI struggles most when a character turns their face 90 degrees." },
    { title: "HAND DETAILS", content: "Older AI generations frequently miscalculate the number of fingers or hand joints." }
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
  vi: ["😱 Rất lo sợ", "😟 Lo lắng", "😐 Bình thường", "🛡️ Cảnh giác", "⚡ Rất tự tin"],
  en: ["😱 Terrified", "😟 Anxious", "😐 Neutral", "🛡️ Vigilant", "⚡ Very Confident"]
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
    { tag: "HÀ NỘI", title: "Giả mạo Công an lừa đảo chiếm đoạt tài sản", date: "11/2025", loss: "2.3 Tỷ VNĐ", desc: "Đối tượng dùng Deepfake mặc quân phục để gọi video lừa đảo người dân qua Zalo.", url: "https://vtv.vn" },
    { tag: "QUỐC TẾ", title: "CEO giả mạo lừa công ty 25 triệu USD", date: "09/2025", loss: "25 Triệu USD", desc: "Nhân viên tài chính chuyển tiền sau cuộc họp video mà toàn bộ đồng nghiệp là Deepfake.", url: "https://cnn.com" },
    { tag: "TP.HCM", title: "Chiêu trò 'người thân cấp cứu' bằng Deepfake", date: "10/2025", loss: "500 Triệu VNĐ", desc: "Kẻ xấu giả giọng và mặt con cái đang cấp cứu để hối thúc cha mẹ chuyển tiền gấp.", url: "https://tuoitre.vn" },
    { tag: "CÔNG NGHỆ", title: "Phát hiện mã nguồn tạo Deepfake AI mới", date: "08/2025", loss: "N/A", desc: "Công cụ mới cho phép tạo video giả mạo chỉ với 1 bức ảnh và 3 giây âm thanh.", url: "https://tinhte.vn" },
    { tag: "NGÂN HÀNG", title: "Cảnh báo lừa đảo xác thực khuôn mặt", date: "07/2025", loss: "Chưa thống kê", desc: "Tội phạm dùng Deepfake vượt qua hệ thống eKYC của một số tổ chức tài chính.", url: "https://vnexpress.net" },
    { tag: "GIẢI TRÍ", title: "Người nổi tiếng bị gán ghép hình ảnh nhạy cảm", date: "06/2025", loss: "Uy tín", desc: "Làn sóng Deepfake khiêu dâm tấn công các nghệ sĩ gây bức xúc dư luận.", url: "https://zingnews.vn" }
  ],
  en: [
    { tag: "HANOI", title: "Fake Police Officer Property Fraud", date: "11/2025", loss: "$100k", desc: "Subjects used Deepfake uniforms for video call scams via Zalo.", url: "https://vtv.vn" },
    { tag: "INTL", title: "Fake CEO Scams Company for $25M", date: "09/2025", loss: "$25M", desc: "Finance employee transferred funds after a video call where all participants were Deepfakes.", url: "https://cnn.com" },
    { tag: "HCMC", title: "'Emergency' Scam using Deepfake Tech", date: "10/2025", loss: "$20k", desc: "Scammers spoof children's voices and faces in fake emergency situations to rush parents.", url: "https://tuoitre.vn" },
    { tag: "TECH", title: "New Deepfake AI Source Code Discovered", date: "08/2025", loss: "N/A", desc: "A new tool allows generating fake videos with just 1 photo and 3 seconds of audio.", url: "https://tinhte.vn" },
    { tag: "BANKING", title: "Facial Authentication Scam Warning", date: "07/2025", loss: "TBD", desc: "Criminals use Deepfake to bypass eKYC systems of several financial organizations.", url: "https://vnexpress.net" },
    { tag: "ENT", title: "Celebrities Targeted by Non-consensual Deepfakes", date: "06/2025", loss: "Reputation", desc: "Wave of pornographic Deepfakes attacking artists causes public outrage.", url: "https://zingnews.vn" }
  ]
};
