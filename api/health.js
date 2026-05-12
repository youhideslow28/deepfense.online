/**
 * DEEPFENSE.ONLINE — Health Check API
 * Endpoint: GET /api/health
 * @copyright 2025 Ho Xuan Nguyen (25NS039)
 */

export default function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  return res.status(200).json({
    status: 'OK',
    service: 'DEEPFENSE API',
    version: '2.0.0',
    timestamp: new Date().toISOString(),
    uptime: process.uptime ? Math.round(process.uptime()) : 'N/A',
    endpoints: {
      chat: '/api/chat',
      scan: '/api/scan-media',
      health: '/api/health'
    }
  });
}
