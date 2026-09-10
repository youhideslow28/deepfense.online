/**
 * DEEPFENSE.ONLINE - /api/scan-media
 * Public AI scanning is intentionally locked while the model is trained and benchmarked.
 */

const ALLOWED_DOMAINS = [
  'localhost',
  '127.0.0.1',
  'deepfense.online',
  'www.deepfense.online',
  'main.deepfense.online',
  'family.deepfense.online',
];

const isAllowedOrigin = (origin) => ALLOWED_DOMAINS.some((domain) => (
  origin === `http://${domain}`
  || origin === `https://${domain}`
  || origin.startsWith(`http://${domain}:`)
));

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const origin = req.headers.origin || req.headers.referer || '';
  if (!origin || !isAllowedOrigin(origin)) {
    console.warn(`Blocked Scan API from unauthorized origin: ${origin}`);
    return res.status(403).json({ error: 'Forbidden: Unauthorized Origin.' });
  }

  const requestLang = req.body?.lang;

  return res.status(423).json({
    status: 'LOCKED_AI_TRAINING',
    error: requestLang === 'en'
      ? 'Deepfense Scanner is locked while the AI model is being trained and benchmarked.'
      : 'Máy quét Deepfense đang được khóa trong giai đoạn tìm dataset, train AI và kiểm định benchmark.',
    next: requestLang === 'en'
      ? 'Public scanning will reopen only after controlled evaluation.'
      : 'Tính năng quét công khai chỉ mở lại sau khi có đánh giá kiểm soát rõ ràng.',
  });
}
