# Security Policy — DEEPFENSE.ONLINE

## Reporting a Vulnerability

If you discover a security vulnerability in this project, please report it responsibly:

1. **DO NOT** create a public GitHub Issue.
2. Send an email to **deepfense@gmail.com** with:
   - Description of the vulnerability
   - Steps to reproduce
   - Potential impact assessment
3. We will acknowledge receipt within **48 hours** and provide a fix timeline.

## Supported Versions

| Version | Supported          |
| ------- | ------------------ |
| 1.1.x   | ✅ Active support  |
| < 1.0   | ❌ No longer supported |

## Security Practices

- All API keys are stored as environment variables (never hardcoded).
- Serverless API endpoints enforce strict CORS origin checking.
- Firebase security rules restrict unauthorized data access.
- Content Security Policy headers are enforced in `index.html`.
- User inputs are sanitized before processing.

## Acknowledgments

We appreciate the security research community's efforts in making the internet safer.

---
*© 2025 Hồ Xuân Nguyễn (25NS039) & Nguyễn Nhất Huy (25NS020). All rights reserved.*
