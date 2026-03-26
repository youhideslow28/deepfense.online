import { GoogleGenAI } from "@google/genai";

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  // --- BẢO MẬT: CHỐNG SPAM API TỪ TRANG WEB KHÁC ---
  const origin = req.headers.origin || req.headers.referer || '';
  const allowedDomains = [
    'localhost', 
    '127.0.0.1',
    'deepfense.online',
    'www.deepfense.online',
  ]; 
  
  const isStrictlyAllowed = allowedDomains.some(domain => origin === `http://${domain}` || origin === `https://${domain}` || origin.startsWith(`http://${domain}:`));
  if (!origin || !isStrictlyAllowed) {
    console.warn(`Blocked Media Scan API request from unauthorized origin: ${origin}`);
    return res.status(403).json({ error: 'Forbidden: Unauthorized Origin. DEEPFENSE Security System Blocked This Request.' });
  }

  try {
    const { base64_data, mime_type, lang } = req.body;

    if (!base64_data || !mime_type) {
      return res.status(400).json({ error: 'Bad Request: Missing media data.' });
    }

    // Khởi tạo AI với API Key từ biến môi trường
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    
    // Đảm bảo payload size logic: Vercel Free có limit 4.5MB
    // Chuỗi base64 có độ dài khoảng 1.33x so với dung lượng nhị phân. 4MB binary = ~5.3MB text.
    if (base64_data.length > 6000000) {
       return res.status(413).json({ error: 'Payload Too Large. Kích thước tập tin vượt quá giới hạn 4MB của máy chủ.' });
    }

    const systemInstruction = `
      You are an elite Digital Forensics and Cyber Security Expert specializing in Deepfake detection.
      Your task is to analyze the provided media file (image, audio, or video frame).
      Language: ${lang === 'vi' ? 'Vietnamese' : 'English'}.
      
      Look for anomalies such as:
      - Audio: Robotic artifacts, unnatural pauses, lack of emotion, breathing irregularities, metadata glitches.
      - Image/Video: Weird lighting, bad blending, unnatural skin texture, asymmetrical eyes, weird fingers, missing reflections.
      
      You MUST output your result STRICTLY in JSON format without markdown code blocks.
      Format:
      {
        "riskScore": (integer between 0 and 100, where 100 means definitely deepfake/malicious),
        "analysisLines": [
           "(Line 1: High level summary of the analysis...)",
           "(Line 2: Deep technical observation 1 (e.g., spectrogram anomalies, visual artifacts)...)",
           "(Line 3: Deep technical observation 2...)",
           "(Line 4: Conclusion and recommendation...)"
        ]
      }
      Do NOT include any other text except the raw JSON string. Do NOT use markdown format "\`\`\`json".
    `;

    // Strip prefix like "data:audio/mp3;base64," if it exists
    let base64Pure = base64_data;
    if (base64_data.includes('base64,')) {
      base64Pure = base64_data.split('base64,')[1];
    }

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash', 
      contents: [
         {
           role: 'user',
           parts: [
              {
                inlineData: {
                  data: base64Pure,
                  mimeType: mime_type,
                }
              },
              { text: "Analyze this media file for deepfake artifacts or malicious alterations." }
           ]
         }
      ],
      config: { 
        systemInstruction,
        responseMimeType: "application/json"
      }
    });

    try {
      const jsonText = response.text || "{}";
      const parsedData = JSON.parse(jsonText);
      return res.status(200).json(parsedData);
    } catch(e) {
      console.error("Failed to parse Gemini JSON:", response.text);
      return res.status(500).json({ error: "AI response parse failed.", details: response.text });
    }

  } catch (error) {
    console.error("Media Scan Error:", error);
    return res.status(500).json({ 
      error: 'Internal Server Error',
      details: error.message 
    });
  }
}
