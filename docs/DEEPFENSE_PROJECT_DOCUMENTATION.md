# DEEPFENSE.ONLINE — Tài liệu Mô tả Dự án Chi tiết

> **Phiên bản:** 3.0 &nbsp;|&nbsp; **Tác giả:** Hồ Xuân Nguyễn (25NS039) & Nguyễn Nhất Huy (25NS020) &nbsp;|&nbsp; **Đơn vị:** Lớp 25NS, Trường Đại học CNTT & TT Việt–Hàn (VKU) &nbsp;|&nbsp; **Email:** deepfense@gmail.com

---

## 1. Tổng quan hệ thống

### Dự án làm gì?

**DEEPFENSE.ONLINE** là nền tảng huấn luyện nhận diện deepfake và tự vệ trước lừa đảo AI dành cho cộng đồng. Dự án tiếp cận bài toán an toàn thông tin từ góc độ **giáo dục người dùng cuối** — không đơn thuần là công cụ phát hiện deepfake mà là một hệ sinh thái học tập có cấu trúc, giúp người dùng xây dựng thói quen: **quan sát → xác minh → phản ứng đúng** trước các nội dung tổng hợp bằng AI.

### Mục tiêu chính

| Mục tiêu | Mô tả |
|---|---|
| **Giáo dục cộng đồng** | Xây dựng nhận thức về deepfake cho mọi đối tượng, từ học sinh phổ thông đến nhân viên văn phòng |
| **Gamification học tập** | Tăng tỷ lệ hoàn thành khóa học thông qua cơ chế XP, huy hiệu, bảng xếp hạng và token DPF |
| **Công cụ phân tích thực tế** | Cung cấp bộ quét rủi ro AI hỗ trợ phân tích ảnh, video, âm thanh nghi ngờ |
| **Hệ sinh thái chứng chỉ** | Cấp chứng chỉ có thể xác minh (DEEPFENSE AWARE → ANALYST → EXPERT) |
| **Tích hợp Web3** | Gắn kết DPF token (ERC-20 trên Polygon Amoy) vào hoạt động học tập |

---

## 2. Tech Stack

### Frontend

| Công nghệ | Phiên bản / Chi tiết | Vai trò |
|---|---|---|
| **React** | v19 | UI framework chính |
| **TypeScript** | `.tsx`, `.ts` | Ngôn ngữ lập trình — type safety toàn bộ codebase |
| **Vite** | — | Build tool, HMR, code splitting |
| **Tailwind CSS** | — | Utility-first styling, responsive design |
| **React Router DOM** | v6 | Client-side routing (SPA) |
| **Three.js** | — | Đồ họa 3D — CyberField particle network trên trang chủ |
| **@react-three/fiber** | — | React wrapper cho Three.js |
| **@react-three/drei** | — | Helper components cho React Three Fiber |
| **GSAP (GreenSock)** | — | Animation engine cho các hiệu ứng phức tạp |
| **Lenis** | — | Smooth scrolling library |
| **Lucide React** | — | Icon system thống nhất |
| **ethers.js / wagmi** | — | Web3 library — đọc balance DPF on-chain từ MetaMask |

### Backend (Serverless API)

| Công nghệ | File | Vai trò |
|---|---|---|
| **Vercel Serverless Functions** | `api/*.js` | Node.js serverless — xử lý AI, DPF, scan media |
| **Google Gemini API** | `gemini-2.5-flash` | AI engine cho chat agent và phân tích media deepfake |
| **VirusTotal API v3** | `api/chat.js` | Quét URL thực tế kiểm tra malicious link |
| **Firebase Admin SDK** | `api/dpf.js` | Xác thực Firebase ID token phía server |

### Database & Auth

| Công nghệ | Vai trò |
|---|---|
| **Firebase Firestore** | NoSQL document database — lưu user, DPF ledger, tiến độ học tập, báo cáo |
| **Firebase Authentication** | Xác thực người dùng qua Google OAuth |
| **Firebase Storage** | Lưu trữ PDF chứng chỉ, file đa phương tiện |

### Blockchain / Web3

| Công nghệ | Chi tiết |
|---|---|
| **Polygon Amoy Testnet** | Mạng blockchain sử dụng |
| **ERC-20 DPF Token** | Contract: `0xFB5605c397257267C6E90C6224D5F4826A4A742D` |
| **Tổng cung** | 2,014,000,000 DPF (ý nghĩa: năm 2014 — mốc phát triển GAN) |

### Deployment & DevOps

| Công nghệ | Vai trò |
|---|---|
| **Vercel** | Hosting frontend + serverless functions |
| **Firebase** | Auth + Firestore + Storage |
| **GitHub** | Version control, CI/CD qua Vercel integration |

---

## 3. Kiến trúc hệ thống

```
┌─────────────────────────────────────────────────────────────────┐
│                        NGƯỜI DÙNG (Browser)                     │
│              React 19 + TypeScript + Vite SPA                   │
│    Three.js │ GSAP │ Lenis │ React Router │ Tailwind CSS         │
└──────────────────────────┬──────────────────────────────────────┘
                           │ HTTPS
          ┌────────────────┼────────────────┐
          ▼                ▼                ▼
┌──────────────┐  ┌─────────────┐  ┌──────────────┐
│ Vercel       │  │  Firebase   │  │  Polygon     │
│ Serverless   │  │  Backend    │  │  Amoy (Web3) │
│ Functions    │  │             │  │              │
│              │  │ Firestore   │  │  ERC-20 DPF  │
│ /api/chat    │  │ Auth        │  │  Contract    │
│ /api/scan-   │  │ Storage     │  │  (read-only  │
│   media      │  │             │  │  từ frontend)│
│ /api/dpf     │  └──────┬──────┘  └──────────────┘
└──────┬───────┘         │
       │                 │
       ▼                 ▼
┌─────────────────────────────────┐
│      External APIs              │
│  Google Gemini 2.5 Flash (AI)   │
│  VirusTotal API v3 (URL scan)   │
│  Google News RSS (tin tức)      │
└─────────────────────────────────┘
```

### Luồng dữ liệu chính

**Reward DPF (dual-path):**
```
Frontend hành động hợp lệ
  → Kiểm tra VITE_DPF_USE_SERVER_REWARDS
    → [Server mode] POST /api/dpf + Bearer token → Firebase Admin SDK → Firestore transaction
    → [Client mode] Firestore runTransaction() trực tiếp từ frontend SDK
  → Cập nhật webBalance + ghi dpf_ledger + cập nhật dpf_daily_quotas
  → Firestore onSnapshot() → Navbar DPF balance cập nhật real-time
```

**AI Media Scan:**
```
Frontend upload file → Base64 encode
  → POST /api/scan-media (CORS check + Rate limit + MIME validate + Size check)
  → Gửi inlineData tới Gemini 2.5 Flash với system instruction pháp y số
  → Gemini trả về JSON: { riskScore, analysisLines }
  → Frontend render kết quả
```

**AI Chat Agent:**
```
User nhập tin nhắn
  → Regex extract URLs
  → [Nếu có URL] VirusTotal API v3 scan → heuristics fallback
  → POST /api/chat với messages + liveScanData + context
  → Gemini 2.5 Flash (streaming SSE) → Server-Sent Events
  → Frontend nhận từng chunk text → render real-time
```

---

## 4. Các chức năng chính

### 4.1 Trang chủ (/)

- **Timeline tương tác "Du hành thời gian":** Scroll-triggered animation bằng GSAP + Lenis, hiển thị lịch sử phát triển deepfake từ 2014 đến nay.
- **Particle network 3D (CyberField):** Ba scene Three.js — hạt floating, mạng lưới dots-lines, cuộc chiến hạt — phản ứng theo vị trí chuột.
- **Ticker tin tức real-time:** RSS feed từ Google News, cập nhật liên tục các sự kiện deepfake/lừa đảo mới nhất.
- **Hiệu ứng mùa hè (SummerEffects):** Toggled qua nav, hiệu ứng hạt rơi kiểu mùa hè.
- **Dashboard nhanh:** Links trực tiếp đến Scanner, Challenge, Academy.

### 4.2 DEEPFENSE Academy (/academy)

Hệ thống học tập theo cấu trúc Cisco/CCNA-inspired:

**Khóa học hiện có:**

| Khóa | Reward | Mục tiêu |
|---|---|---|
| DEEPFENSE BASIC | 500 DPF | Nhận thức cơ bản về deepfake, phòng ngừa, ứng phó |
| DEEPFENSE ADVANCE | 750 DPF | Phân tích bằng chứng kỹ thuật số, case study nâng cao |

**Cấu trúc DEEPFENSE BASICS:**
```
Pre-assessment (10 câu) → Chào mừng
├── PHẦN I — FUNDAMENTALS (3-4 giờ)
│   ├── Module 1: Deepfake là gì?
│   │   ├── 1.1 Giới thiệu & Định nghĩa
│   │   │   ├── 1.1.1 Giới thiệu vấn đề deepfake
│   │   │   ├── 1.1.2 Định nghĩa học thuật
│   │   │   ├── 1.1.3 Deepfake & AI tạo sinh
│   │   │   ├── 1.1.4 Các dạng deepfake phổ biến
│   │   │   └── 1.1.5 Phạm vi & giới hạn khóa basics
│   │   │   [→ Checkpoint 3 câu trắc nghiệm cuối 1.1]
│   │   ├── 1.2 Tác động của deepfake
│   │   └── 1.3 Rủi ro và tư duy phòng vệ ban đầu
│   ├── Module 2: [Fundamentals mở rộng]
│   └── Module 3: [Fundamentals mở rộng]
│   [→ Mid-term 20-30 câu sau 3 module]
├── PHẦN II — RECOGNITION (3-4 giờ)
│   ├── Module 4-6: Nhận biết visual/audio artifacts
│   [→ Mid-term]
└── PHẦN III — PREVENTION & RESPONSE (2-3 giờ)
    ├── Module 7-9: Phòng ngừa và ứng phó
    └── Final Exam: 50 câu / 150 câu pool (random mỗi lần thi)
        [Khóa sau khi fail: 1h → 24h → 3 ngày → 1 tuần → reset]
```

**Anti-cheat:** Tab switching detection, randomization câu hỏi, time limit, chống copy văn bản.

**Luồng hoàn thành:**
1. Đăng nhập Google → `ensureDpfWallet()` tạo ví DPF
2. Đăng ký vào `academy_learners/{uid}`
3. Theo dõi tiến độ qua `completedModules[]` + `progressPercent`
4. Pass final exam → cấp certificate + nhận 500 DPF

### 4.3 Thử thách Thám tử Deepfake (/challenge)

Hệ thống gamification nhận diện deepfake 10 cấp độ:

**Mode 1 — Thám tử Deepfake:**
- Người dùng xem cặp video (MẪU_A vs MẪU_B) được nhúng từ YouTube
- Phân tích dấu hiệu bất thường: ánh sáng, da, tay, mắt, chuyển động môi
- Chọn video nào là deepfake
- Nhận điểm + DPF reward (nếu đạt ngưỡng): 10–40 DPF/lần, giới hạn 1–3 lần/ngày

**Mode 2 — Mô phỏng lừa đảo (Scam Simulator):**
- AI roleplay CEO giả (Trần Văn Hoàng, Giám đốc ABC) qua Gemini API
- Yêu cầu chuyển tiền 50 triệu VND khẩn cấp
- Người dùng luyện tập từ chối, xác minh danh tính
- Huấn luyện phản xạ trước CEO fraud / vishing scam

**Reward flow Challenge:**
```
Kết thúc thử thách → claimDpfReward({
  source: 'challenge',
  activityId: `challenge-level-${level}`,
  amount: rewardAmount,
  minScore: 70,
  score: userScore,
  dailyLimit: 3
})
```

### 4.4 Công cụ Quét & Giám định (/tools)

Giao diện 4 tab:

**Tab 1 — Quét rủi ro:**
- *Quét ngữ cảnh hành vi:* Bộ câu hỏi 5 bước thu thập logic ("Đối phương có yêu cầu hành động khẩn cấp về tài chính không?") → đưa ra risk level
- *Quét media (ảnh/video/audio):* Upload file → Base64 → POST `/api/scan-media` → Gemini phân tích → trả về `riskScore` (0-100) + 4 dòng phân tích pháp y

**Tab 2 — Khiên AI:**
- Trình diễn cơ chế phòng thủ AI, hướng dẫn sử dụng công cụ

**Tab 3 — Pháp luật & Kiến thức:**
- Cơ sở pháp lý về deepfake tại Việt Nam và quốc tế
- Hướng dẫn bảo vệ quyền lợi

**Tab 4 — Trung tâm giúp đỡ:**
- Hotline và hướng dẫn ứng phó khẩn cấp khi bị lừa đảo
- Quy trình: dừng lại → lưu bằng chứng → báo cáo → liên hệ ngân hàng

### 4.5 Trợ lý AI (AI Agent Chat)

Floating chatbot xuất hiện trên mọi trang:

- **Normal mode:** DEEPFENSE AGENT — chuyên gia bảo mật, trả lời về deepfake, lừa đảo, hướng dẫn sử dụng website
- **Simulator mode:** CEO Trần Văn Hoàng — roleplay kẻ lừa đảo để training
- **URL scanning:** Tự động detect URL trong tin nhắn → gọi VirusTotal API v3 → fallback heuristics → đính kèm kết quả vào context Gemini
- **Streaming:** Server-Sent Events (SSE), text render real-time từng chunk
- **Rate limit:** 20 request/phút/IP, payload max 8KB
- **Google Search tool:** Gemini có thể tìm kiếm Google để trả lời tin tức mới nhất

### 4.6 Dự án AI (/ai-project)

Showcase trang giới thiệu dự án DEEPFENSE AI đang phát triển:

- **DEEPFENSE TOUCH:** Nút Assistive Touch trên điện thoại — 1 chạm quét video call Zalo/Messenger (Q4/2025)
- **DEEPFENSE EXTENSION:** Extension trình duyệt quét deepfake real-time khi duyệt web (Q1/2027)
- **Core Engine dự kiến:** Phân tích mạng nơ-ron, xác thực C2PA & Watermark, biểu hiện sinh lý học trung thực (rPPG)

### 4.7 Trang Liên hệ & Báo cáo (/contact hoặc /about)

- Thông tin nhóm tác giả, sứ mệnh, tầm nhìn
- Form báo cáo sự cố (incident report) tích hợp Firestore: hỗ trợ đính kèm ảnh/video lên đến 5MB
- XSS protection, sanitize input trước khi lưu
- Contact: `deepfense@gmail.com` | `0828250475`

### 4.8 Hồ sơ người học (/profile)

- Hiển thị DPF Coin balance hiện tại
- Trạng thái xác minh email
- Chỉnh sửa tên hiển thị, đổi mật khẩu
- Lịch sử DPF (8 giao dịch gần nhất qua `listenDpfLedger`)

### 4.9 Admin Dashboard (/admin)

Chỉ accessible khi `userRole === 'admin'` (email `deepfense@gmail.com` hardcoded):

- Quản lý báo cáo sự cố (status: new → reviewing → replied → closed → archived)
- Quản lý người dùng, gắn cờ tài khoản nghi ngờ
- Xem kết quả game/challenge toàn bộ người dùng
- Cấp DPF bonus cho user/campaign (`adminGrant`)
- Duyệt withdrawal request
- Xem ledger & risk flags

### 4.10 Xác minh chứng chỉ (/academy/verify)

Trang public cho phép bất kỳ ai verify chứng chỉ qua `certificateId`:
- `DPF-CERT-[LEVEL]-[YYYY]-[SHORT_UID]-[RANDOM]`
- Ví dụ: `DPF-CERT-BASIC-2026-A91F-7KQ2`
- Hiển thị: tên người nhận, cấp độ, ngày cấp, điểm, QR code

### 4.11 Hệ thống DPF Token

**Kiến trúc dual-layer:**

```
DPF Web (off-chain)          DPF On-chain (ERC-20)
──────────────────           ──────────────────────
Lưu trong Firestore          Polygon Amoy Testnet
Dùng để reward/unlock        Rút về MetaMask khi muốn
Tất cả user đều có           Chỉ user kết nối ví mới thấy
```

**Reward table:**

| Hoạt động | Điều kiện | Reward | Giới hạn |
|---|---|---:|---|
| Hoàn thành bài học Basic | Checkpoint hợp lệ | 5 DPF | 1 lần/khóa |
| Quiz Basic pass | ≥ 70 điểm | 15 DPF | 1/season |
| Simulator Basic pass | ≥ 70 điểm | 10 DPF | 3 lần/ngày |
| Simulator Advanced pass | ≥ 75 điểm | 20 DPF | 2 lần/ngày |
| Simulator Expert pass | ≥ 80 điểm | 40 DPF | 1 lần/ngày |
| Hoàn thành BASIC | Pass final | 50 DPF | 1 lần |
| Certificate Basic | Đủ điều kiện | 30 DPF | 1 lần |

**Unlock cost:**

| Nội dung | Chi phí |
|---|---:|
| Advanced starter pack | 250 DPF |
| 1 mini-lab Advanced | 80 DPF |
| Advanced full course | 600 DPF |
| Expert case study | 250 DPF |
| Certificate visual upgrade | 50 DPF |

---

## 5. Cơ chế hoạt động kỹ thuật — Phát hiện Deepfake

### 5.1 Phương pháp phân tích

DEEPFENSE 3.0 sử dụng **Generative AI (Gemini 2.5 Flash)** làm lớp phân tích chính, không dùng model phát hiện deepfake chuyên biệt hay dataset riêng. Đây là **AI-assisted forensic analysis**, không phải binary classifier.

**System instruction cho Gemini khi phân tích media:**

```
Vai trò: Digital Forensics Expert chuyên deepfake detection

Tìm kiếm các artifacts:
- Audio: Robotic artifacts, unnatural pauses, thiếu cảm xúc,
         breathing irregularities, metadata glitches
- Image/Video: Weird lighting, bad blending, unnatural skin texture,
               asymmetrical eyes, weird fingers, missing reflections

Output bắt buộc (JSON):
{
  "riskScore": 0-100,
  "analysisLines": [
    "High level summary...",
    "Technical observation 1 (spectrogram anomalies, visual artifacts)...",
    "Technical observation 2...",
    "Conclusion and recommendation..."
  ]
}
```

### 5.2 Pipeline phân tích media

```
User upload file (ảnh/video/âm thanh)
  ↓
Frontend: Đọc file → FileReader.readAsDataURL() → Base64
  ↓
POST /api/scan-media
  ├── CORS origin check (deepfense.online + localhost)
  ├── Rate limit: 10 requests/phút/IP
  ├── MIME validation (whitelist 18 types: jpeg/png/webp/gif/bmp/mp4/webm/avi/mov/mp3/wav/ogg...)
  ├── Size check: max ~4MB binary (~6MB base64)
  └── Timeout: 25 giây
  ↓
Gemini 2.5 Flash
  ├── model: gemini-2.5-flash
  ├── contents: [{ inlineData: { data: base64, mimeType } }]
  └── responseMimeType: 'application/json'
  ↓
Parse JSON → trả về riskScore + analysisLines
```

### 5.3 Phát hiện URL độc hại

```
User gửi tin nhắn có URL
  ↓
Regex: /((?:https?:\/\/)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z]{1,6}\b(?:...))/g
  ↓
VirusTotal API v3:
  GET /api/v3/urls/{base64-url-id}
  → stats.malicious > 0: CẢNH BÁO ĐỘC HẠI
  → stats.harmless > 0: AN TOÀN
  ↓
[Fallback khi không có key hoặc 404]:
  → Pattern matching: nganhang|nhanqua|khuyenmai + .xyz|.top|.pw|.cc|.tk
  → Shortlink detection: bit.ly|tinyurl.com|cutt.ly
  ↓
Kết quả đính kèm vào Gemini context → AI trả lời có context bảo mật thực tế
```

### 5.4 Giới hạn kỹ thuật hiện tại

| Giới hạn | Chi tiết |
|---|---|
| **Không có model riêng** | Phụ thuộc vào Gemini 2.5 Flash, không có benchmark chính thức |
| **Không có dataset riêng** | Không train/fine-tune trên dữ liệu deepfake chuyên biệt |
| **File size max 4MB** | Giới hạn bởi Vercel Free tier (serverless function) |
| **Video không phân tích frame-by-frame** | Gemini nhận video nhưng không đảm bảo phân tích từng frame |
| **Kết quả là tham khảo** | Không thể dùng làm bằng chứng pháp lý |
| **Không có real-time detection** | Chỉ phân tích file upload, chưa scan live video call |

---

## 6. Luồng người dùng

### Luồng người dùng phổ thông (chưa đăng nhập)

```
Vào deepfense.online
  ↓
Xem homepage → Timeline deepfake lịch sử → Animation 3D
  ↓
[Tùy chọn] Thử thách Thám tử (không cần đăng nhập)
  ↓
[Tùy chọn] Công cụ Quét rủi ro (hành vi + media)
  ↓
Chat với AI Agent (không cần đăng nhập)
  ↓
Đọc Dự án AI / Liên hệ
```

### Luồng người dùng đã đăng nhập

```
Đăng nhập Google (Firebase Auth)
  ↓
ensureDpfWallet() → Tạo users/{uid} với webBalance = 0
  ↓
registerAcademyLearner() → Tạo academy_learners/{uid}
  ↓
Academy: Chọn khóa DEEPFENSE BASIC
  ↓
Học Module 1 → Checkpoint 3 câu → Module 2 → ... → Module 9
  ↓
Mid-term test (sau mỗi 3 module)
  ↓
Final Exam (50/150 câu random)
  ↓
[Pass ≥ 70%] → Nhận Certificate DEEPFENSE AWARE
             → Nhận 500 DPF vào webBalance
             → DPF hiển thị real-time trên navbar
  ↓
Làm Challenge/Simulator → Nhận thêm DPF
  ↓
Dùng DPF unlock Advanced course (250 DPF starter)
  ↓
[Tùy chọn Web3] Kết nối MetaMask → Rút DPF về Polygon Amoy
```

### Luồng Admin

```
Đăng nhập deepfense@gmail.com
  ↓
emailRole = 'admin' → setDoc users/{uid} role = 'admin'
  ↓
/admin → renderAdminRoute() → <Admin />
  ↓
Xem dashboard: báo cáo sự cố, user list, ledger
  ↓
Cấp DPF bonus: POST /api/dpf { action: 'adminGrant', payload: { target, amount, reason } }
  ↓
Duyệt withdrawal: nhập txHash sau khi chuyển thủ công
```

---

## 7. Kết quả đạt được

### Tính năng đã hoàn thiện ✅

| Tính năng | Trạng thái | Ghi chú |
|---|---|---|
| Trang chủ với timeline + 3D animation | ✅ Hoàn thiện | Three.js, GSAP, Lenis |
| Firebase Auth (Google OAuth) | ✅ Hoàn thiện | Role-based: admin/editor/user |
| Academy dashboard + lộ trình học | ✅ Hoàn thiện | BASIC + ADVANCE listing |
| Nội dung khóa DEEPFENSE BASICS | ✅ Hoàn thiện | 9 module + mid-terms + final exam 150 câu |
| Challenge Thám tử Deepfake (10 cấp) | ✅ Hoàn thiện | Side-by-side video so sánh |
| Mô phỏng lừa đảo (Simulator) | ✅ Hoàn thiện | Gemini roleplay CEO fraud |
| Quét rủi ro hành vi (5 bước) | ✅ Hoàn thiện | Form questionnaire |
| Quét media deepfake (ảnh/audio) | ✅ Hoàn thiện | Gemini 2.5 Flash + JSON output |
| AI Chat Agent (streaming SSE) | ✅ Hoàn thiện | Normal + Simulator mode |
| URL scanning (VirusTotal + heuristics) | ✅ Hoàn thiện | Tích hợp vào chat context |
| DPF web/off-chain system | ✅ Hoàn thiện | Reward + unlock + ledger + quota |
| Firestore transaction + idempotency | ✅ Hoàn thiện | Chống double-claim |
| Admin dashboard | ✅ Hoàn thiện | Case management, user, ledger |
| Profile + DPF balance real-time | ✅ Hoàn thiện | onSnapshot live update |
| Navbar DPF balance | ✅ Hoàn thiện | useDpfBalance hook |
| Chính sách bảo mật / điều khoản | ✅ Hoàn thiện | /privacy, /terms, /policy |
| Certificate verify page | ✅ Hoàn thiện | /academy/verify |
| Trang 404 riêng | ✅ Hoàn thiện | NotFound.tsx với nav shortcuts |
| Route /about alias | ✅ Hoàn thiện | Alias cho /contact |
| Multilingual (VI/EN) | ✅ Hoàn thiện | TRANSLATIONS data object |
| Anti-XSS console warning | ✅ Hoàn thiện | Cảnh báo đỏ trong DevTools |
| Cookie consent | ✅ Hoàn thiện | GDPR-style |

### Tính năng còn hạn chế / chưa triển khai ⚠️

| Tính năng | Trạng thái | Lý do |
|---|---|---|
| DPF on-chain withdrawal tự động | ⚠️ Thủ công | Cần private key reward wallet trên server — an toàn hơn khi duyệt tay giai đoạn đầu |
| MetaMask Amoy integration đầy đủ | ⚠️ Một phần | Đọc balance được, withdraw tự động chưa |
| Certificate PDF generation | ⚠️ Chưa hoàn chỉnh | Cần Firebase Storage + PDF library |
| DEEPFENSE Advanced course content | ⚠️ Placeholder | Khung đã có, nội dung chưa đầy đủ |
| Leaderboard toàn cầu | ⚠️ Thiếu | Schema có, UI chưa render |
| Huy hiệu (badges) hiển thị | ⚠️ Thiếu | Dữ liệu có, UI profile chưa hiển thị |
| DEEPFENSE TOUCH (mobile app) | 🔮 Roadmap | Q4/2025 — chưa phát triển |
| DEEPFENSE Extension (browser) | 🔮 Roadmap | Q1/2027 — chưa phát triển |
| Model AI deepfake riêng | 🔮 Roadmap | Hiện tại dùng Gemini |
| NFT Certificate on-chain | 🔮 Roadmap | Sau khi hệ thống PDF ổn định |
| Real-time video call scanning | 🔮 Roadmap | Cần WebRTC + model edge |

---

## 8. Cơ sở dữ liệu (Firestore Collections)

### 8.1 `users/{uid}`

Ví DPF và profile người dùng:

```typescript
{
  uid: string,
  email: string,
  displayName: string,
  photoURL: string,
  role: 'admin' | 'editor' | 'user',
  status: 'active' | 'suspended',

  // DPF Wallet
  webBalance: number,         // DPF khả dụng hiện tại
  earnedBalance: number,      // Tổng DPF kiếm được từ hoạt động
  bonusBalance: number,       // DPF admin cấp thêm
  spentBalance: number,       // DPF đã dùng để unlock
  pendingWithdrawal: number,  // DPF đang chờ rút on-chain
  withdrawnBalance: number,   // DPF đã rút về ví crypto
  onchainSyncedBalance: number, // Balance ERC-20 đã đọc từ ví

  badges: string[],           // ['basic', 'advanced', 'expert']
  unlockedItems: string[],    // ['advanced-starter', 'mini-lab-01', ...]

  createdAt: Timestamp,
  updatedAt: Timestamp
}
```

### 8.2 `dpf_ledger/{ledgerId}`

Lịch sử mọi giao dịch DPF (idempotency key làm document ID):

```typescript
{
  uid: string,
  direction: 'credit' | 'debit',
  source: 'challenge' | 'simulator' | 'course' | 'certificate'
        | 'admin_bonus' | 'unlock' | 'withdrawal' | 'sync',
  amount: number,
  balanceBefore: number,
  balanceAfter: number,
  status: 'pending' | 'confirmed' | 'failed' | 'cancelled',
  reason: string,             // VD: "Vuot kich ban Phishing Email Basic"
  activityId?: string,
  itemId?: string,
  metadata: {
    season: string,           // 'genesis-2026'
    day: string,              // '2026-05-15'
    score?: number,
    itemType?: string,
    title?: string
  },
  idempotencyKey: string,     // `{uid}:{source}:{activityId}:{season}`
  createdAt: Timestamp,
  confirmedAt: Timestamp
}
```

### 8.3 `dpf_daily_quotas/{quotaId}`

Kiểm soát giới hạn reward mỗi ngày:

```typescript
{
  uid: string,
  source: DpfLedgerSource,
  day: string,     // '2026-05-15'
  count: number,   // số lần đã claim trong ngày
  amount: number,  // tổng DPF đã nhận trong ngày
  updatedAt: Timestamp
}
// Document ID: `{uid}:{source}:{day}`
```

### 8.4 `unlocks/{unlockId}`

Ghi nhận quyền truy cập vĩnh viễn vào nội dung trả phí:

```typescript
{
  uid: string,
  itemId: string,
  itemType: 'course' | 'lab' | 'case_study' | 'certificate_upgrade',
  title: string,
  cost: number,
  ledgerId: string,   // tham chiếu tới dpf_ledger
  unlockedAt: Timestamp
}
// Document ID: `{uid}:{itemId}`
```

### 8.5 `academy_learners/{uid}`

Tiến độ học tập:

```typescript
{
  uid: string,
  email: string,
  displayName: string,
  photoURL: string,
  provider: 'google',
  course: 'DEEPFENSE BASICS',
  credentialTarget: 'DEEPFENSE AWARE',
  rewardTarget: { amount: 500, symbol: 'DPF' },
  status: 'signed_in' | 'in_progress' | 'completed',
  progressPercent: number,          // 0-100
  completedModules: string[],       // ['module-1', 'module-2', ...]
  courseEvaluationSubmitted: boolean,
  finalExam: {
    score: number,
    passed: boolean,
    attemptCount: number,
    lastAttemptAt: Timestamp
  } | null,
  certificateUnlocked: boolean,
  certificateId: string,
  completedAt: Timestamp | null,
  updatedAt: Timestamp
}
```

### 8.6 `certificates/{certificateId}`

```typescript
{
  id: string,
  certificateId: string,     // 'DPF-CERT-BASIC-2026-A91F-7KQ2'
  uid: string,
  level: 'basic' | 'advanced' | 'expert',
  title: string,
  holderName: string,
  score: number,
  status: 'issued' | 'revoked',
  pdfUrl: string,
  verifyUrl: string,         // 'https://deepfense.online/academy/verify?id=...'
  qrUrl: string,
  rewardLedgerId: string,
  txHash?: string,           // nếu reward DPF on-chain
  issuedAt: Timestamp,
  revokedAt?: Timestamp,
  revokedReason?: string
}
```

### 8.7 `withdrawal_requests/{id}`

```typescript
{
  uid: string,
  walletAddress: string,     // Polygon Amoy address
  amount: number,
  status: 'requested' | 'admin_approved' | 'processing' | 'paid' | 'rejected' | 'failed',
  reviewedBy?: string,
  reviewNote?: string,
  txHash?: string,
  createdAt: Timestamp,
  reviewedAt?: Timestamp,
  paidAt?: Timestamp
}
```

### 8.8 `activity_logs/{id}`

Log mọi hành động admin (audit trail):

```typescript
{
  actorId: string,
  actorEmail: string,
  actorRole: 'admin',
  action: string,            // VD: 'admin.dpf_coin_granted'
  targetType: string,        // 'users'
  targetId: string,
  severity: 'notice' | 'warning',
  metadata: Record<string, unknown>,
  createdAt: Timestamp
}
```

### 8.9 `help_center_reports/{id}`

Báo cáo sự cố từ người dùng:

```typescript
{
  uid?: string,
  email: string,
  name: string,
  incidentType: string,      // 'deepfake_video' | 'voice_clone' | 'scam' | ...
  description: string,
  evidenceUrls?: string[],
  status: 'new' | 'reviewing' | 'replied' | 'closed' | 'archived' | 'processed',
  adminNote?: string,
  createdAt: Timestamp,
  updatedAt: Timestamp
}
```

### Sơ đồ quan hệ giữa các collections

```
users/{uid}
    │
    ├──→ dpf_ledger/{idempotencyKey}     (1 user : N giao dịch)
    ├──→ dpf_daily_quotas/{uid:source:day} (1 user : N quota entries)
    ├──→ unlocks/{uid:itemId}            (1 user : N unlock)
    ├──→ academy_learners/{uid}          (1 user : 1 learner record)
    ├──→ certificates/{certId}           (1 user : N certificates)
    ├──→ withdrawal_requests/{id}        (1 user : N withdrawal)
    └──→ activity_logs/{id}             (admin actions)
```

---

## Ghi chú kỹ thuật bổ sung

### Bảo mật API

| Cơ chế | Áp dụng ở đâu |
|---|---|
| CORS origin check (strict) | `/api/chat`, `/api/scan-media`, `/api/dpf` |
| Rate limiting (in-memory sliding window) | Tất cả API endpoints |
| Firebase ID Token verification | `/api/dpf` |
| Admin email whitelist | `/api/dpf` → `DPF_ADMIN_EMAILS` env var |
| Idempotency key | Mọi giao dịch DPF |
| Firestore runTransaction() | Atomic balance update |
| Anti-XSS console warning | `App.tsx` — cảnh báo đỏ trong DevTools |
| MIME type whitelist | `/api/scan-media` — 18 loại được phép |
| Payload size limit | Chat: 8KB / Scan: ~4MB binary |
| Timeout protection | Scan API: 25 giây hard timeout |

### Biến môi trường quan trọng

| Biến | Bên | Mô tả |
|---|---|---|
| `API_KEY` | Server | Google Gemini API key |
| `VIRUSTOTAL_API_KEY` | Server | VirusTotal API key (optional) |
| `FIREBASE_SERVICE_ACCOUNT_BASE64` | Server | Firebase Admin credentials |
| `DPF_ADMIN_EMAILS` | Server | Danh sách email admin |
| `VITE_DPF_USE_SERVER_REWARDS` | Client | `'true'` → dùng `/api/dpf`, `'false'` → client Firestore |
| `VITE_ALLOWED_AUTH_EMAILS` | Client | Whitelist email được phép đăng nhập (dev mode) |

---

*© 2025 Hồ Xuân Nguyễn (25NS039) & Nguyễn Nhất Huy (25NS020). All rights reserved.*
