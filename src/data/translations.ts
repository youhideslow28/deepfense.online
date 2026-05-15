/**
 * DEEPFENSE.ONLINE â€” Translation Data (i18n)
 * @copyright 2025 H? Xuân Nguy?n & VKU Project Team
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
    hero_badge: "Há»† THá»NG GIÃM SÃT AN NINH AI",
    hero_title: "Dá»° ÃN HUáº¤N LUYá»†N NHáº¬N Dáº NG DEEPFAKE",
    hero_desc: "Dá»± Ã¡n huáº¥n luyá»‡n cá»™ng Ä‘á»“ng vá» Deepfake. HÃ£y trang bá»‹ kiáº¿n thá»©c Ä‘á»ƒ báº£o vá»‡ báº£n thÃ¢n vÃ  gia Ä‘Ã¬nh trÆ°á»›c cÃ¡c cuá»™c táº¥n cÃ´ng AI tinh vi.",
    btn_scan: "QUÃ‰T Rá»¦I RO",
    btn_challenge: "THá»¬ THÃCH",
    btn_ai: "MOBILE APP & DATA",
    warning_center: "TRUNG TÃ‚M Cáº¢NH BÃO",
    hotline: "BÃO CÃO Lá»ªA Äáº¢O",
    knowledge: "Báº N CÃ“ BIáº¾T?",
    about_us: "Vá»€ CHÃšNG TÃ”I & LIÃŠN Há»†",
    mission: "Sá»¨ Má»†NH",
    vision: "Táº¦M NHÃŒN",
    team: "NHÃ“M TÃC GIáº¢ Dá»° ÃN", 
    report_form: "BÃO CÃO Sá»° Cá»",
    send_report: "Gá»¬I BÃO CÃO",
    success_msg: "Gá»¬I THÃ€NH CÃ”NG!",
    contact_support: "KÃŠNH Há»– TRá»¢",
    police: "Cáº¢NH SÃT 113",
    cyber_security: "AN NINH Máº NG",
    footer_rights: "Báº¢O LÆ¯U Má»ŒI QUYá»€N.",
    agent_welcome: "**Xin chÃ o! TÃ´i lÃ  trá»£ lÃ½ áº£o DEEPFENSE AGENT.**\n\n**TÃ´i cÃ³ thá»ƒ há»— trá»£ báº¡n cÃ¡c chá»©c nÄƒng sau:**\n- **QuÃ©t Äa phÆ°Æ¡ng thá»©c:** Nháº­n diá»‡n lá»—i AI trong hÃ¬nh áº£nh, video (Báº¡n cÃ³ thá»ƒ gá»­i Ä‘Æ°á»ng link).\n- **PhÃ¢n tÃ­ch Ká»‹ch báº£n:** Váº¡ch tráº§n thá»§ Ä‘oáº¡n lá»«a Ä‘áº£o qua tin nháº¯n tá»‘ng tiá»n, kÃªu gá»i Ä‘áº§u tÆ°.\n- **SÆ¡ cá»©u TÃ¢m lÃ½:** HÆ°á»›ng dáº«n tá»«ng bÆ°á»›c xá»­ lÃ½ kháº©n cáº¥p khi bá»‹ lá»™ lá»t dá»¯ liá»‡u.\n\n*HÃ£y nháº¯n tin hoáº·c dÃ¡n Ä‘Æ°á»ng link vÃ o Ä‘Ã¢y Ä‘á»ƒ tÃ´i kiá»ƒm tra nhÃ©!*",
    agent_placeholder: "DÃ¡n link hoáº·c há»i vá» AI lá»«a Ä‘áº£o...",
    result_pass: "AN TOÃ€N",
    result_fail: "NGUY HIá»‚M",
    label_name: "TÃªn gá»i (Nickname)",
    label_email: "Äá»‹a chá»‰ Email",
    label_attachment: "ÄÃ­nh kÃ¨m (áº¢nh/Video)",
    label_desc: "Chi tiáº¿t sá»± cá»‘",
    simulator_title: "BáºªY NHáº¬N THá»¨C (MÃ” PHá»ŽNG)",
    simulator_desc: "Äo lÆ°á»ng thá»i gian sáº­p báº«y cá»§a báº¡n. Há»‡ thá»‘ng sáº½ Ä‘Ã³ng vai káº» lá»«a Ä‘áº£o báº±ng ká»‹ch báº£n AI táº¡o ra.",
    detection_time: "THá»œI GIAN NHáº¬N DIá»†N",
    start_sim: "Báº¯t Ä‘áº§u MÃ´ phá»ng",
    trap_msg: "Báº N ÄÃƒ Máº®C BáºªY",
    trap_lesson: "Káº» lá»«a Ä‘áº£o táº¡o ra Ã¡p lá»±c thá»i gian vÃ  sá»± uy quyá»n khiáº¿n nÃ£o bá»™ bá» qua bÆ°á»›c xÃ¡c minh.",
    verify_msg: "XÃC MINH THÃ€NH CÃ”NG",
    verify_reason: "Báº¡n khÃ´ng bá»‹ Ã¡p lá»±c thá»i gian khá»‘ng cháº¿ vÃ  bÃ¡o cÃ¡o ká»‹p thá»i thá»§ Ä‘oáº¡n láº¡.",
    retest: "Thá»­ láº¡i (Retest)",
    replay: "ChÆ¡i láº¡i (Replay)",
    report_scam: "BÃ¡o cÃ¡o Scam",
    chat_placeholder: "TrÃ² chuyá»‡n hoáº·c báº¯t báº»...",
    transfer_btn: "XÃC NHáº¬N CHUYá»‚N",
    reject_btn: "Tá»ª CHá»I / BÃO CÃO",
    chat_inactive: "KHUNG CHAT CHÆ¯A KÃCH HOáº T",
    session_ended: "PHIÃŠN GIAO Dá»ŠCH ÄÃƒ Káº¾T THÃšC",
    crisis_title: "TRUNG TÃ‚M á»¨NG Cá»¨U",
    crisis_desc: "Cá»•ng há»— trá»£ kháº©n cáº¥p náº¡n nhÃ¢n cá»§a tá»™i pháº¡m cÃ´ng nghá»‡ cao vÃ  lá»«a Ä‘áº£o Deepfake.",
    btn_report_pdf: "ÄÆ¡n Tá»‘ GiÃ¡c (PDF)",
    btn_first_aid: "SÆ¡ Cá»©u TÃ¢m LÃ½",
    report_locked: "TÃ­nh nÄƒng nÃ y hiá»‡n chá»‰ há»— trá»£ cÃ¡c vÄƒn báº£n phÃ¡p lÃ½ tiáº¿ng Viá»‡t.",
    latest_live: "TIN Má»šI (LIVE)",
    tbd: "ChÆ°a xÃ¡c Ä‘á»‹nh",
    tools_scan_title: "QUÃ‰T & GIÃM Äá»ŠNH",
    tools_protect_title: "KHIÃŠN Báº¢O Vá»†",
    tools_knowledge_title: "PHÃP LUáº¬T & KIáº¾N THá»¨C",
    tools_scan_desc: "Há»‡ thá»‘ng phÃ¢n tÃ­ch Ä‘a táº§ng giÃºp phÃ¡t hiá»‡n cÃ¡c dáº¥u hiá»‡u can thiá»‡p cá»§a AI trong dá»¯ liá»‡u nghe nhÃ¬n vÃ  ká»‹ch báº£n hÃ nh vi.",
    tools_protect_desc: "CÃ´ng nghá»‡ Fawkes giÃºp tiÃªm cÃ¡c Ä‘iá»ƒm nhiá»…u tÃ ng hÃ¬nh vÃ o áº£nh cÃ¡ nhÃ¢n, khiáº¿n cÃ¡c mÃ´ hÃ¬nh AI khÃ´ng thá»ƒ nháº­n diá»‡n hoáº·c huáº¥n luyá»‡n trÃ¡i phÃ©p trÃªn khuÃ´n máº·t báº¡n.",
    tools_knowledge_desc: "ThÃ´ng tin tá»•ng há»£p vá» cÃ¡c Ä‘áº¡o luáº­t AI má»›i nháº¥t, quyá»n con ngÆ°á»i trong ká»· nguyÃªn sá»‘ vÃ  cÃ¡c nguyÃªn lÃ½ ká»¹ thuáº­t cá»§a Deepfake.",
    tools_protect_btn: "KHIÃŠN AI",
    crisis_hub: "TRUNG TÃ‚M GIÃšP Äá» ",
    btn_ncsc_report: "BÃO CÃO NCSC (VIá»†T NAM)",
    btn_chongluadao_report: "CHá»NG Lá»ªA Äáº¢O (VIá»†T NAM)",
    btn_safebrowsing_report: "LIÃŠN Káº¾T Äá»˜C Háº I (GOOGLE)",
    btn_ic3_report: "Tá» GIÃC QUá»C Táº¾ (FBI - IC3)",
    btn_a05_hotline: "HOTLINE A05 - Bá»˜ CÃ”NG AN",
    vneid_desc: "Sá»­ dá»¥ng tÃ­nh nÄƒng Tá»‘ giÃ¡c tá»™i pháº¡m ngay trÃªn á»©ng dá»¥ng VNeID chÃ­nh thá»©c.",
    zalo_oa_desc: "TÃ¬m vÃ  quan tÃ¢m Zalo OA cá»§a CÃ´ng an tá»‰nh/thÃ nh phá»‘ Ä‘á»ƒ nháº­n há»— trá»£ nhanh.",
    hotline_subtext: "HÃ€NH Äá»˜NG Sá»šM NGAY"
  },
  en: {
    hero_badge: "AI SECURITY MONITORING SYSTEM",
    hero_title: "DEEPFAKE DETECTION TRAINING PROJECT",
    hero_desc: "Community training project on Deepfakes. Empower yourself with knowledge to protect your family against sophisticated AI attacks.",
    btn_scan: "RISK SCAN",
    btn_challenge: "CHALLENGE",
    btn_ai: "MOBILE APP & DATA",
    warning_center: "WARNING CENTER",
    hotline: "REPORT SCAM NOW",
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
