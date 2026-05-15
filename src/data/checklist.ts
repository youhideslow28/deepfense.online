/**
 * DEEPFENSE.ONLINE â€” Checklist Data
 * @copyright 2025 H? Xuân Nguy?n & VKU Project Team
 */

import { Language, ChecklistItem } from '@/types';

export const CHECKLIST_DATA: Record<Language, ChecklistItem[]> = {
  vi: [
    { category: "ðŸ‘ï¸ Máº®T & KHUÃ”N Máº¶T", items: ["NhÃ¡y máº¯t báº¥t thÆ°á»ng (quÃ¡ Ã­t hoáº·c quÃ¡ nhanh)", "Máº¯t khÃ´ng di chuyá»ƒn tá»± nhiÃªn theo hÆ°á»›ng nhÃ¬n", "Da máº·t trÃ´ng quÃ¡ má»‹n hoáº·c quÃ¡ báº¿t so vá»›i cá»•"] },
    { category: "ðŸ‘„ MIá»†NG & Ã‚M THANH", items: ["Kháº©u hÃ¬nh khÃ´ng khá»›p hoÃ n toÃ n vá»›i lá»i nÃ³i", "Ã‚m thanh bá»‹ vang hoáº·c cÃ³ táº¡p Ã¢m láº¡", "Giá»ng nÃ³i nghe mÃ¡y mÃ³c, thiáº¿u cáº£m xÃºc"] },
    { category: "âœ‹ CHI TIáº¾T CÆ  THá»‚", items: ["BÃ n tay cÃ³ sá»‘ lÆ°á»£ng ngÃ³n báº¥t thÆ°á»ng hoáº·c dÃ­nh nhau", "Trang sá»©c (khuyÃªn tai, kÃ­nh) bá»‹ nháº¥p nhÃ¡y", "Chuyá»ƒn Ä‘á»™ng Ä‘áº§u bá»‹ giáº­t lag hoáº·c mÃ©o mÃ³"] },
    { category: "ðŸ–¼ï¸ Bá»I Cáº¢NH & ÃNH SÃNG", items: ["PhÃ´ng ná»n bá»‹ biáº¿n dáº¡ng khi nhÃ¢n váº­t di chuyá»ƒn", "BÃ³ng Ä‘á»• trÃªn máº·t khÃ´ng khá»›p vá»›i hÆ°á»›ng sÃ¡ng", "Váº­t thá»ƒ á»Ÿ xa bá»‹ nhÃ²e hoáº·c rung láº¯c báº¥t thÆ°á»ng"] }
  ],
  en: [
    { category: "ðŸ‘ï¸ EYES & FACE", items: ["Abnormal blinking (too little or too fast)", "Eyes don't move naturally with gaze direction", "Facial skin looks too smooth or blurry"] },
    { category: "ðŸ‘„ MOUTH & AUDIO", items: ["Lip movements don't perfectly match speech", "Audio is echoey or has strange background noise", "Voice sounds robotic or lacks emotion"] },
    { category: "âœ‹ BODY DETAILS", items: ["Hands have unusual finger counts or merged fingers", "Jewelry (earrings, glasses) flickers", "Head movements are glitchy or distorted"] },
    { category: "ðŸ–¼ï¸ CONTEXT & LIGHTING", items: ["Background distorts when the person moves", "Shadows on face don't match light source", "Distant objects are blurry or shake unnaturally"] }
  ]
};
