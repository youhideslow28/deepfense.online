/**
 * DEEPFENSE.ONLINE â€” Fun Facts Data
 * @copyright 2025 H? Xuân Nguy?n & VKU Project Team
 */

import { Language, FunFact } from '@/types';

export const FUN_FACTS: Record<Language, FunFact[]> = {
  vi: [
    { title: "3 GIÃ‚Y", content: "AI tháº¿ há»‡ má»›i chá»‰ cáº§n 3 giÃ¢y Ã¢m thanh gá»‘c Ä‘á»ƒ nhÃ¢n báº£n giá»ng nÃ³i cá»§a báº¡n vá»›i Ä‘á»™ chÃ­nh xÃ¡c 95%." },
    { title: "NHá»ŠP THá»ž", content: "Deepfake hiáº¿m khi mÃ´ phá»ng Ä‘Æ°á»£c nhá»‹p thá»Ÿ nháº¹ nhÃ ng lÃ m rung vai cá»§a con ngÆ°á»i." },
    { title: "GÃ“C NGHIÃŠNG", content: "AI gáº·p khÃ³ khÄƒn nháº¥t khi nhÃ¢n váº­t quay nghiÃªng máº·t 90 Ä‘á»™, thÆ°á»ng gÃ¢y má» nhÃ²e." },
    { title: "RÄ‚NG DÃNH LIá»€N", content: "Nhiá»u AI chÆ°a thá»ƒ váº½ káº½ rÄƒng, khiáº¿n hÃ m rÄƒng trÃ´ng nhÆ° má»™t dáº£i tráº¯ng liá»n máº¡ch." },
    { title: "Máº®T VUÃ”NG", content: "CÃ¡c máº«u AI cÅ© thÆ°á»ng táº¡o ra con ngÆ°Æ¡i hÃ¬nh vuÃ´ng hoáº·c hÃ¬nh lá»¥c giÃ¡c thay vÃ¬ trÃ²n." },
    { title: "CHá»šP Máº®T", content: "NhÃ¢n váº­t do AI táº¡o ra thÆ°á»ng chá»›p máº¯t quÃ¡ Ã­t hoáº·c chá»›p vá»›i tá»‘c Ä‘á»™ báº¥t thÆ°á»ng." },
    { title: "MÃ€U DA KHÃ”NG KHá»šP", content: "Da máº·t vÃ  da cá»• Ä‘Ã´i khi cÃ³ sá»± chÃªnh lá»‡ch mÃ u sáº¯c rÃµ rá»‡t do lá»—i ghÃ©p ná»‘i." },
    { title: "ÃNH SÃNG KÃNH", content: "BÃ³ng Ä‘Ã¨n pháº£n chiáº¿u trÃªn trÃ²ng kÃ­nh thÆ°á»ng khÃ´ng di chuyá»ƒn Ä‘Ãºng quy luáº­t váº­t lÃ½." },
    { title: "TRANG Sá»¨C DÃNH", content: "KhuyÃªn tai, vÃ²ng cá»• thÆ°á»ng bá»‹ má», tan cháº£y hoáº·c dÃ­nh liá»n vÃ o da thá»‹t." },
    { title: "TÃ“C BAY", content: "CÃ¡c sá»£i tÃ³c con má»ng thÆ°á»ng bá»‹ xÃ³a má» hoáº·c hÃ²a láº«n vÃ o phÃ´ng ná»n phÃ­a sau." },
    { title: "Äá»˜ TRá»„ Ã‚M", content: "Kháº©u hÃ¬nh miá»‡ng vÃ  Ã¢m thanh thÆ°á»ng trá»… nhau vÃ i mili-giÃ¢y, khÃ´ng khá»›p hoÃ n háº£o." },
    { title: "BÃ€N TAY SÃP", content: "Da tay trong video Deepfake thÆ°á»ng trÃ´ng quÃ¡ má»‹n nhÆ° sÃ¡p, thiáº¿u náº¿p nhÄƒn." },
    { title: "Máº CH MÃU DA", content: "AI hiá»‡n táº¡i chÆ°a thá»ƒ giáº£ láº­p Ä‘Æ°á»£c sá»± thay Ä‘á»•i mÃ u sáº¯c vi mÃ´ cá»§a da theo nhá»‹p Ä‘áº­p cá»§a tim (rPPG)." },
    { title: "Cáº¢M XÃšC Äá»˜T NGá»˜T", content: "Deepfake Ã¢m thanh ráº¥t tá»‡ trong viá»‡c táº¡o ra tiáº¿ng thá»Ÿ dá»‘c, tiáº¿ng khÃ³c hoáº·c cÃ¡c biá»ƒu cáº£m gáº¯t gá»ng báº¥t ngá»." },
    { title: "Máº¬T MÃƒ GIA ÄÃŒNH", content: "Má»™t máº­t mÃ£ ngáº¯n chá»‰ ngÆ°á»i thÃ¢n biáº¿t cÃ³ thá»ƒ cháº·n nhiá»u cuá»™c gá»i giáº£ giá»ng nhá» xÃ¡c minh nhanh trong vÃ i giÃ¢y." },
    { title: "Gá»ŒI Láº I", content: "Khi nháº­n cuá»™c gá»i chuyá»ƒn tiá»n kháº©n cáº¥p, hÃ£y táº¯t mÃ¡y vÃ  gá»i láº¡i sá»‘ cÅ© Ä‘Ã£ lÆ°u thay vÃ¬ sá»‘ vá»«a gá»i Ä‘áº¿n." },
    { title: "ÃP Lá»°C THá»œI GIAN", content: "Káº» lá»«a Ä‘áº£o thÆ°á»ng Ã©p báº¡n quyáº¿t Ä‘á»‹nh ngay vÃ¬ nÃ£o ngÆ°á»i dá»… bá» qua bÆ°á»›c kiá»ƒm chá»©ng khi bá»‹ cÄƒng tháº³ng." }
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
    { title: "SUDDEN EMOTIONS", content: "Audio deepfakes are terrible at generating heavy breathing, crying, or sudden emotional outbursts." },
    { title: "FAMILY PASSCODE", content: "A short family-only passcode can stop many cloned-voice calls by giving you a fast verification step." },
    { title: "CALL BACK", content: "When a money request feels urgent, hang up and call the saved contact number instead of trusting the incoming caller ID." },
    { title: "TIME PRESSURE", content: "Scammers push instant decisions because stressed people are more likely to skip verification." }
  ]
};
