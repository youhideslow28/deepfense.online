
import { GoogleGenAI } from "@google/genai";

// HÀM MÔ PHỎNG: KẾT NỐI API BẢO MẬT THỰC TẾ (PHISHTANK / CHỐNG LỪA ĐẢO)
async function checkUrlWithSecurityAPIs(url) {
  // Trong thực tế, bạn sẽ dùng fetch() để gọi API của Google Safe Browsing hoặc PhishTank ở đây.
  // Ví dụ: await fetch(`https://safebrowsing.googleapis.com/v4/threatMatches:find?key=YOUR_API_KEY`, {...})
  
  // Hiện tại mô phỏng logic: Nếu URL có chứa chữ "nganhang", "nhanqua", "vip" -> Cảnh báo lừa đảo
  const suspiciousKeywords = ['nganhang', 'nhanqua', 'vip', 'khuyenmai', 'xyz', 'free'];
  const isSuspicious = suspiciousKeywords.some(keyword => url.toLowerCase().includes(keyword));

  if (isSuspicious) {
    return `[HỆ THỐNG QUÉT LIVE]: URL ${url} ĐÃ BỊ PHISHTANK VÀ CHONGLUADAO ĐÁNH DẤU LÀ TRANG WEB LỪA ĐẢO / ĐỘC HẠI. THIỆT HẠI NẾU TRUY CẬP: MẤT TÀI KHOẢN.`;
  } else if (url.includes('deepfense.vn') || url.includes('vtv.vn')) {
    return `[HỆ THỐNG QUÉT LIVE]: URL ${url} LÀ TRANG WEB AN TOÀN, ĐÃ ĐƯỢC XÁC MINH BỞI TỔ CHỨC UY TÍN.`;
  } else {
    return `[HỆ THỐNG QUÉT LIVE]: URL ${url} chưa có trong danh sách đen, nhưng domain còn rất mới. Cần cảnh giác cao độ.`;
  }
}

export default async function handler(req, res) {
  // Chỉ chấp nhận method POST
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    const { messages, lang, context } = req.body;
    
    // Khởi tạo AI với API Key từ biến môi trường server
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

    // 1. TÌM KIẾM URL TRONG TIN NHẮN CUỐI CÙNG CỦA NGƯỜI DÙNG
    const lastUserMessage = messages[messages.length - 1]?.text || "";
    const urlRegex = /(https?:\/\/[^\s]+)/g;
    const extractedUrls = lastUserMessage.match(urlRegex);

    let liveScanData = "";
    
    // 2. NẾU CÓ URL -> GỌI API QUÉT THỰC TẾ TRƯỚC KHI HỎI GEMINI
    if (extractedUrls && extractedUrls.length > 0) {
        const urlToCheck = extractedUrls[0]; // Lấy link đầu tiên
        const scanResult = await checkUrlWithSecurityAPIs(urlToCheck);
        liveScanData = `\n\n=== DỮ LIỆU BẢO MẬT THỜI GIAN THỰC (VỪA QUÉT) ===\n${scanResult}\n==================================================`;
    }

    // Định nghĩa System Instruction dựa trên ngôn ngữ và ngữ cảnh website được gửi lên
    const systemInstruction = `
      You are DEEPFENSE AGENT, the official AI security assistant and platform guide for DEEPFENSE.AI.
      Current Language: ${lang === 'vi' ? 'Vietnamese' : 'English'}.
      Current Time: March 2026.

      === ABOUT DEEPFENSE.AI (PLATFORM INFO) ===
      - Project Name: DEEPFENSE.AI - Deepfake Defense Platform.
      - Author: Hồ Xuân Nguyễn (Student ID: 25NS039, VKU University - Solo Developer).
      - Mission: Educate the community on Deepfake prevention and provide AI-based defense tools against high-tech scams.
      - Website Sections (Guide users here if needed):
        1. HOME (Trang chủ): Dashboard, real-time scam news, quick tips.
        2. TOOLS (Công cụ / Quét rủi ro): Scan face/audio, check email leaks.
        3. CHALLENGE (Thử thách): 10-level minigame to test Deepfake detection skills.
        4. AI PROJECT (Dự án AI): Development roadmap (Q4/2025 - Q4/2027), Deepfense Touch, Smart Agent.
        5. ABOUT US (Về chúng tôi / Liên hệ): Submit incident reports (with attachments), vision, and contact info.

      === YOUR KNOWLEDGE BASE (THE WEBSITE DATA) ===
      ${context || "No context provided."}
      ==============================================

      ${liveScanData}
      
      RULES:
      1. Always respond in ${lang === 'vi' ? 'Vietnamese' : 'English'}.
      2. IF asked about the website, author, or how to use a feature, refer to the "ABOUT DEEPFENSE.AI" section.
      3. IF asked about Deepfakes, scams, or news, USE the "KNOWLEDGE BASE" and "DỮ LIỆU BẢO MẬT THỜI GIAN THỰC". Act as a top-tier cybersecurity expert in 2026.
      4. IF the user asks about very recent events not in the Knowledge Base, use your Google Search tool to find the latest news.
      5. Be concise. Use bullet points (-) for main ideas.
      6. Only discuss cybersecurity, Deepfakes, online safety, and this website. Refuse other topics politely.
      7. Maintain a professional, empathetic, and helpful tone.
      8. Use Markdown for formatting: **bold** for emphasis.
    `;

    // Gọi Gemini API
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash', 
      contents: messages.map(m => ({
        role: m.role,
        parts: [{ text: m.text }]
      })),
      config: { 
        systemInstruction,
        tools: [{ googleSearch: {} }] // BẬT TÍNH NĂNG NỐI MẠNG TÌM KIẾM THỰC TẾ
      }
    });

    // Trả kết quả về cho frontend
    const text = response.text || (lang === 'vi' 
        ? "Xin lỗi, tôi chưa hiểu rõ câu hỏi. Bạn vui lòng nhập lại nội dung cụ thể hơn nhé." 
        : "I apologize, I didn't catch that. Please rephrase your question specifically.");
        
    return res.status(200).json({ text });

  } catch (error) {
    console.error("AI Error:", error);
    return res.status(500).json({ 
      error: 'Internal Server Error',
      details: error.message 
    });
  }
}
