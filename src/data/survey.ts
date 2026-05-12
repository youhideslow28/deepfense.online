/**
 * DEEPFENSE.ONLINE — Survey & Personality Questions Data
 * @copyright 2025 Ho Xuan Nguyen (25NS039)
 */

import { Language, PersonalityQuestion } from '@/types';

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
