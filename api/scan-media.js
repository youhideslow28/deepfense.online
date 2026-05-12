/**
 * DEEPFENSE.ONLINE — /api/scan-media
 * PA6 Backend Fortress: MIME validation, rate limiting, timeout protection.
 * @copyright 2025 Ho Xuan Nguyen (25NS039)
 */

import { GoogleGenAI } from "@google/genai";

// === RATE LIMITER (in-memory, shared across requests trong same instance) ===
const RATE_LIMIT_WINDOW_MS = 60_000;
const RATE_LIMIT_MAX = 10; // Scan nặng hơn chat → giới hạn thấp hơn
const ipRequests = new Map(); // { ip: [timestamp, ...] }

function checkRateLimit(ip) {
  const now = Date.now();
  const timestamps = (ipRequests.get(ip) || []).filter(t => now - t < RATE_LIMIT_WINDOW_MS);
  if (timestamps.length >= RATE_LIMIT_MAX) {
    return false;
  }
  timestamps.push(now);
  ipRequests.set(ip, timestamps);
  return true;
}

// === ALLOWED MIME TYPES ===
const ALLOWED_MIME_TYPES = new Set([
  'image/jpeg', 'image/png', 'image/webp', 'image/gif', 'image/bmp',
  'video/mp4', 'video/webm', 'video/quicktime', 'video/avi',
  'audio/mpeg', 'audio/mp3', 'audio/wav', 'audio/ogg', 'audio/webm', 'audio/mp4',
]);

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  // --- SECURITY: CORS Origin Validation ---
  const origin = req.headers.origin || req.headers.referer || '';
  const allowedDomains = ['localhost', '127.0.0.1', 'deepfense.online', 'www.deepfense.online'];
  const isAllowed = allowedDomains.some(d =>
    origin === `http://${d}` || origin === `https://${d}` || origin.startsWith(`http://${d}:`)
  );
  if (!origin || !isAllowed) {
    console.warn(`Blocked Scan API from unauthorized origin: ${origin}`);
    return res.status(403).json({ error: 'Forbidden: Unauthorized Origin.' });
  }

  // --- RATE LIMITING ---
  const ip = req.headers['x-forwarded-for']?.split(',')[0]?.trim() || req.socket?.remoteAddress || 'unknown';
  if (!checkRateLimit(ip)) {
    return res.status(429).json({
      error: 'Too Many Requests. Bạn đã gửi quá nhiều yêu cầu. Vui lòng thử lại sau 1 phút.',
    });
  }

  try {
    const { base64_data, mime_type, lang } = req.body;

    // --- INPUT VALIDATION ---
    if (!base64_data || !mime_type) {
      return res.status(400).json({ error: 'Bad Request: Missing media data or mime_type.' });
    }

    // --- MIME TYPE VALIDATION (PA6) ---
    const normalizedMime = mime_type.toLowerCase().split(';')[0].trim();
    if (!ALLOWED_MIME_TYPES.has(normalizedMime)) {
      return res.status(415).json({
        error: `Unsupported Media Type: "${mime_type}". Chỉ chấp nhận ảnh, video, và audio.`,
      });
    }

    // --- PAYLOAD SIZE ENFORCEMENT (Server-side, ~4MB binary = ~5.3MB base64) ---
    if (base64_data.length > 6_000_000) {
      return res.status(413).json({
        error: 'Payload Too Large. Kích thước tập tin vượt quá giới hạn 4MB.',
      });
    }

    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

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

    // Strip data URI prefix if present
    const base64Pure = base64_data.includes('base64,')
      ? base64_data.split('base64,')[1]
      : base64_data;

    // --- TIMEOUT PROTECTION (PA6): Max 25s ---
    const timeoutPromise = new Promise((_, reject) =>
      setTimeout(() => reject(new Error('TIMEOUT')), 25_000)
    );

    const apiPromise = ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: [{
        role: 'user',
        parts: [
          { inlineData: { data: base64Pure, mimeType: normalizedMime } },
          { text: 'Analyze this media file for deepfake artifacts or malicious alterations.' }
        ]
      }],
      config: {
        systemInstruction,
        responseMimeType: 'application/json',
      }
    });

    const response = await Promise.race([apiPromise, timeoutPromise]);

    try {
      const jsonText = response.text || '{}';
      const parsedData = JSON.parse(jsonText);
      return res.status(200).json(parsedData);
    } catch (e) {
      console.error('Failed to parse Gemini JSON:', response.text);
      return res.status(500).json({ error: 'AI response parse failed.', details: response.text });
    }

  } catch (error) {
    if (error.message === 'TIMEOUT') {
      console.error('Scan API timeout after 25s');
      return res.status(504).json({ error: 'Gateway Timeout. Phân tích mất quá nhiều thời gian, vui lòng thử với tập tin nhỏ hơn.' });
    }
    console.error('Media Scan Error:', error);
    return res.status(500).json({ error: 'Internal Server Error', details: error.message });
  }
}
