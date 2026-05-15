/**
 * DEEPFENSE.ONLINE — Fun Facts Data
 * @copyright 2025 Ho Xuan Nguyen (25NS039)
 */

import { Language, FunFact } from '@/types';

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
    { title: "CẢM XÚC ĐỘT NGỘT", content: "Deepfake âm thanh rất tệ trong việc tạo ra tiếng thở dốc, tiếng khóc hoặc các biểu cảm gắt gỏng bất ngờ." },
    { title: "MẬT MÃ GIA ĐÌNH", content: "Một mật mã ngắn chỉ người thân biết có thể chặn nhiều cuộc gọi giả giọng nhờ xác minh nhanh trong vài giây." },
    { title: "GỌI LẠI", content: "Khi nhận cuộc gọi chuyển tiền khẩn cấp, hãy tắt máy và gọi lại số cũ đã lưu thay vì số vừa gọi đến." },
    { title: "ÁP LỰC THỜI GIAN", content: "Kẻ lừa đảo thường ép bạn quyết định ngay vì não người dễ bỏ qua bước kiểm chứng khi bị căng thẳng." }
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
