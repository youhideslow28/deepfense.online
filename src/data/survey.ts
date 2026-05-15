/**
 * DEEPFENSE.ONLINE â€” Survey & Personality Questions Data
 * @copyright 2025 H? Xuân Nguy?n & VKU Project Team
 */

import { Language, PersonalityQuestion } from '@/types';

export const SURVEY_SCALE: Record<Language, string[]> = {
  vi: ["1 HOÃ€N TOÃ€N KHÃ”NG", "2 KHÃ”NG TÃN THÃ€NH", "3 TRUNG Láº¬P", "4 TÃN THÃ€NH", "5 HOÃ€N TOÃ€N Äá»’NG Ã"],
  en: ["1 STRONGLY DISAGREE", "2 DISAGREE", "3 NEUTRAL", "4 AGREE", "5 STRONGLY AGREE"]
};

export const PERSONALITY_QUESTIONS: Record<Language, PersonalityQuestion[]> = {
  vi: [
    { id: "q1", text: "TÃ´i thÆ°á»ng tin vÃ o nhá»¯ng video cÃ³ hÃ¬nh áº£nh ngÆ°á»i thÃ¢n mÃ  khÃ´ng cáº§n kiá»ƒm chá»©ng thÃªm.", trait: "AWARENESS" },
    { id: "q2", text: "TÃ´i cáº£m tháº¥y lo láº¯ng khi nháº­n Ä‘Æ°á»£c cuá»™c gá»i tá»« sá»‘ láº¡ yÃªu cáº§u chuyá»ƒn tiá»n gáº¥p.", trait: "ANXIETY" },
    { id: "q3", text: "TÃ´i tá»± tin ráº±ng mÃ¬nh cÃ³ thá»ƒ phÃ¢n biá»‡t Ä‘Æ°á»£c video tháº­t vÃ  giáº£ báº±ng máº¯t thÆ°á»ng.", trait: "CONFIDENCE" },
    { id: "q4", text: "TÃ´i luÃ´n nghi ngá» tÃ­nh xÃ¡c thá»±c cá»§a cÃ¡c thÃ´ng tin gÃ¢y sá»‘c trÃªn máº¡ng xÃ£ há»™i.", trait: "SKEPTICISM" }
  ],
  en: [
    { id: "q1", text: "I often trust videos showing relatives without further verification.", trait: "AWARENESS" },
    { id: "q2", text: "I feel anxious when receiving calls from strangers asking for urgent money transfers.", trait: "ANXIETY" },
    { id: "q3", text: "I am confident that I can distinguish between real and fake videos with the naked eye.", trait: "CONFIDENCE" },
    { id: "q4", text: "I always doubt the authenticity of shocking information on social media.", trait: "SKEPTICISM" }
  ]
};
