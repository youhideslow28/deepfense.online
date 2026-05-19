/**
 * DEEPFENSE.ONLINE — Translation Data (i18n)
 * @copyright 2025 Ho Xuan Nguyen (25NS039)
 */

import { Language } from '@/types';

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
  scenario_select_title: string; scenario_filter_all: string; scenario_filter_financial: string;
  scenario_filter_family: string; scenario_filter_romance: string; scenario_filter_authority: string;
  difficulty_basic: string; difficulty_medium: string; difficulty_advanced: string;
  change_scenario: string; reward_preview: string;
  minigame_check: string; minigame_continue: string; minigame_score: string;
  minigame_reward: string; minigame_correct: string; minigame_incorrect: string;
  minigame_expert_says: string; minigame_your_rating: string; minigame_select_phrase: string;
  block_compare_before: string; block_compare_after: string;
  block_audio_play: string; block_audio_pause: string;
  block_exercise_check: string; block_exercise_correct: string; block_exercise_wrong: string;
  block_sandbox_choose: string;
  block_annotate_hint: string; block_annotate_check: string;
  crisis_title: string; crisis_desc: string; btn_report_pdf: string; btn_first_aid: string;
  report_locked: string; latest_live: string; tbd: string;
  tools_scan_title: string; tools_protect_title: string; tools_knowledge_title: string;
  tools_scan_desc: string; tools_protect_desc: string; tools_knowledge_desc: string;
  tools_protect_btn: string; crisis_hub: string;
  btn_ncsc_report: string; btn_chongluadao_report: string; btn_safebrowsing_report: string;
  btn_ic3_report: string; btn_a05_hotline: string; vneid_desc: string; zalo_oa_desc: string;
  hotline_subtext: string;
}

export const TRANSLATIONS: Record<Language, TranslationData> = {
  vi: {
    hero_badge: "HỆ THỐNG GIÁM SÁT AN NINH AI",
    hero_title: "DỰ ÁN HUẤN LUYỆN NHẬN DẠNG DEEPFAKE",
    hero_desc: "Dự án huấn luyện cộng đồng về Deepfake của nhóm 2HAND. Hãy trang bị kiến thức để bảo vệ bản thân và gia đình trước các cuộc tấn công AI tinh vi.",
    btn_scan: "QUÉT RỦI RO",
    btn_challenge: "THỬ THÁCH",
    btn_ai: "MOBILE APP & DATA",
    warning_center: "TRUNG TÂM CẢNH BÁO",
    hotline: "BÁO CÁO LỪA ĐẢO",
    knowledge: "BẠN CÓ BIẾT?",
    about_us: "VỀ CHÚNG TÔI & LIÊN HỆ",
    mission: "SỨ MỆNH",
    vision: "TẦM NHÌN",
    team: "NHÓM TÁC GIẢ 2HAND (VKU)", 
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
    simulator_title: "BẪY NHẬN THỨC (MÔ PHỎNG VÀO VAI NẠN NHÂN)",
    simulator_desc: "Đo lường thời gian sập bẫy của bạn. Hệ thống sẽ đóng vai kẻ lừa đảo bằng kịch bản AI tạo ra.",
    detection_time: "THỜI GIAN NHẬN DIỆN",
    start_sim: "Bắt đầu mô phỏng vào vai nạn nhân",
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
    scenario_select_title: "CHỌN KỊCH BẢN MÔ PHỎNG",
    scenario_filter_all: "Tất cả",
    scenario_filter_financial: "Tài chính",
    scenario_filter_family: "Gia đình",
    scenario_filter_romance: "Tình cảm",
    scenario_filter_authority: "Công an",
    difficulty_basic: "Cơ bản",
    difficulty_medium: "Trung bình",
    difficulty_advanced: "Nâng cao",
    change_scenario: "Đổi kịch bản",
    reward_preview: "Thưởng tối đa",
    minigame_check: "Kiểm tra đáp án",
    minigame_continue: "Tiếp tục →",
    minigame_score: "Kết quả",
    minigame_reward: "Thưởng mini-game",
    minigame_correct: "Chính xác!",
    minigame_incorrect: "Chưa đúng",
    minigame_expert_says: "Chuyên gia đánh giá",
    minigame_your_rating: "Đánh giá của bạn",
    minigame_select_phrase: "Nhấn vào cụm từ đáng ngờ",
    block_compare_before: "Trước",
    block_compare_after: "Sau",
    block_audio_play: "Phát",
    block_audio_pause: "Dừng",
    block_exercise_check: "Kiểm tra",
    block_exercise_correct: "Chính xác!",
    block_exercise_wrong: "Chưa đúng",
    block_sandbox_choose: "Bạn chọn:",
    block_annotate_hint: "Nhấn vào vùng nghi vấn",
    block_annotate_check: "Phân tích",
    crisis_title: "TRUNG TÂM ỨNG CỨU",
    crisis_desc: "Cổng hỗ trợ khẩn cấp nạn nhân của tội phạm công nghệ cao và lừa đảo Deepfake.",
    btn_report_pdf: "Đơn Tố Giác (PDF)",
    btn_first_aid: "Sơ Cứu Tâm Lý",
    report_locked: "Tính năng này hiện chỉ hỗ trợ các văn bản pháp lý tiếng Việt.",
    latest_live: "TIN MỚI (LIVE)",
    tbd: "Chưa xác định",
    tools_scan_title: "QUÉT & GIÁM ĐỊNH",
    tools_protect_title: "KHIÊN BẢO VỆ",
    tools_knowledge_title: "PHÁP LUẬT & KIẾN THỨC",
    tools_scan_desc: "Hệ thống phân tích đa tầng giúp phát hiện các dấu hiệu can thiệp của AI trong dữ liệu nghe nhìn và kịch bản hành vi.",
    tools_protect_desc: "Công nghệ Fawkes giúp tiêm các điểm nhiễu tàng hình vào ảnh cá nhân, khiến các mô hình AI không thể nhận diện hoặc huấn luyện trái phép trên khuôn mặt bạn.",
    tools_knowledge_desc: "Thông tin tổng hợp về các đạo luật AI mới nhất, quyền con người trong kỷ nguyên số và các nguyên lý kỹ thuật của Deepfake.",
    tools_protect_btn: "KHIÊN AI",
    crisis_hub: "TRUNG TÂM GIÚP ĐỠ",
    btn_ncsc_report: "BÁO CÁO NCSC (VIỆT NAM)",
    btn_chongluadao_report: "CHỐNG LỪA ĐẢO (VIỆT NAM)",
    btn_safebrowsing_report: "LIÊN KẾT ĐỘC HẠI (GOOGLE)",
    btn_ic3_report: "TỐ GIÁC QUỐC TẾ (FBI - IC3)",
    btn_a05_hotline: "HOTLINE A05 - BỘ CÔNG AN",
    vneid_desc: "Sử dụng tính năng Tố giác tội phạm ngay trên ứng dụng VNeID chính thức.",
    zalo_oa_desc: "Tìm và quan tâm Zalo OA của Công an tỉnh/thành phố để nhận hỗ trợ nhanh.",
    hotline_subtext: "HÀNH ĐỘNG SỚM NGAY"
  },
  en: {
    hero_badge: "AI SECURITY MONITORING SYSTEM",
    hero_title: "DEEPFAKE DETECTION TRAINING PROJECT",
    hero_desc: "Community training project on Deepfakes by Team 2HAND. Empower yourself with knowledge to protect your family against sophisticated AI attacks.",
    btn_scan: "RISK SCAN",
    btn_challenge: "CHALLENGE",
    btn_ai: "MOBILE APP & DATA",
    warning_center: "WARNING CENTER",
    hotline: "REPORT SCAM NOW",
    knowledge: "DID YOU KNOW?",
    about_us: "ABOUT US & CONTACT",
    mission: "MISSION",
    vision: "VISION",
    team: "AUTHORS - TEAM 2HAND (VKU)",
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
    scenario_select_title: "SELECT SIMULATION SCENARIO",
    scenario_filter_all: "All",
    scenario_filter_financial: "Financial",
    scenario_filter_family: "Family",
    scenario_filter_romance: "Romance",
    scenario_filter_authority: "Authority",
    difficulty_basic: "Basic",
    difficulty_medium: "Medium",
    difficulty_advanced: "Advanced",
    change_scenario: "Change Scenario",
    reward_preview: "Max Reward",
    minigame_check: "Check Answers",
    minigame_continue: "Continue →",
    minigame_score: "Score",
    minigame_reward: "Mini-game Reward",
    minigame_correct: "Correct!",
    minigame_incorrect: "Not quite",
    minigame_expert_says: "Expert says",
    minigame_your_rating: "Your rating",
    minigame_select_phrase: "Tap the suspicious phrases",
    block_compare_before: "Before",
    block_compare_after: "After",
    block_audio_play: "Play",
    block_audio_pause: "Pause",
    block_exercise_check: "Check",
    block_exercise_correct: "Correct!",
    block_exercise_wrong: "Not quite",
    block_sandbox_choose: "You choose:",
    block_annotate_hint: "Tap suspicious areas",
    block_annotate_check: "Analyse",
    crisis_title: "CRISIS HUB",
    crisis_desc: "Emergency support portal for victims of high-tech crimes and Deepfake fraud.",
    btn_report_pdf: "Report Form (PDF)",
    btn_first_aid: "Psychological First Aid",
    report_locked: "This feature currently only supports Vietnamese legal documents.",
    latest_live: "LATEST NEWS (LIVE)",
    tbd: "TBD",
    tools_scan_title: "SCAN & FORENSICS",
    tools_protect_title: "PROTECTIVE SHIELD",
    tools_knowledge_title: "LAW & KNOWLEDGE",
    tools_scan_desc: "Multi-layered analysis system to detect AI intervention in audiovisual data and behavioral scripts.",
    tools_protect_desc: "Fawkes technology injects invisible adversarial noise into personal photos, preventing AI models from recognizing or unauthorized training on your face.",
    tools_knowledge_desc: "Comprehensive information on the latest AI laws, human rights in the digital age, and technical principles of Deepfakes.",
    tools_protect_btn: "AI SHIELD",
    crisis_hub: "CRISIS HUB",
    btn_ncsc_report: "NCSC REPORT (VIETNAM)",
    btn_chongluadao_report: "CHONG LUA DAO (VIETNAM)",
    btn_safebrowsing_report: "MALICIOUS LINK (GOOGLE)",
    btn_ic3_report: "INTERNATIONAL REPORT (FBI - IC3)",
    btn_a05_hotline: "A05 HOTLINE - VIETNAM POLICE",
    vneid_desc: "Use the Crime Reporting feature directly on the official VNeID app.",
    zalo_oa_desc: "Search for and follow the Zalo OA of Provincial/City Police for quick support.",
    hotline_subtext: "ACT EARLY NOW"
  }
};
