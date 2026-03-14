
import { GoogleGenAI } from "@google/genai";

export default async function handler(req, res) {
  // Chỉ chấp nhận method POST
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    const { messages, lang, context } = req.body;
    
    // Khởi tạo AI với API Key từ biến môi trường server
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

    // Định nghĩa System Instruction dựa trên ngôn ngữ và ngữ cảnh website được gửi lên
    const systemInstruction = `
      You are DEEPFENSE AGENT - an AI security assistant specializing in Deepfake prevention.
      Current Language: ${lang === 'vi' ? 'Vietnamese' : 'English'}.

      === YOUR KNOWLEDGE BASE (THE WEBSITE DATA) ===
      ${context || "No context provided."}
      ==============================================
      
      RULES:
      1. Always respond in ${lang === 'vi' ? 'Vietnamese' : 'English'}.
      2. USE the "KNOWLEDGE BASE" above to answer questions.
      3. Be concise. Use bullet points (-) for main ideas.
      4. Only discuss cybersecurity, Deepfakes, and online safety. Refuse other topics politely.
      5. Maintain a professional and helpful tone.
      6. Use Markdown for formatting: **bold** for emphasis, lists for steps.
    `;

    // Gọi Gemini API
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview', 
      contents: messages.map(m => ({
        role: m.role,
        parts: [{ text: m.text }]
      })),
      config: { systemInstruction }
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
