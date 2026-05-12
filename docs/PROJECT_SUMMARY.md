# 🛡️ TỔNG QUAN DỰ ÁN DEEPFENSE.ONLINE

**DEEPFENSE.ONLINE** là một nền tảng trực tuyến chuyên biệt về an toàn thông tin, tập trung vào việc huấn luyện nhận diện Deepfake và các hình thức lừa đảo AI tinh vi. Dự án được phát triển nhằm mục đích giáo dục cộng đồng, nâng cao nhận thức và kỹ năng tự bảo vệ trong kỷ nguyên số.

*   **Tác giả:** Hồ Xuân Nguyễn (25NS039) & Nguyễn Nhất Huy (25NS020).
*   **Đơn vị:** Lớp 25NS - Trường Đại học Công nghệ Thông tin và Truyền thông Việt - Hàn (VKU).
*   **Phiên bản hiện tại:** 1.1.0

---

## 🛠️ 1. CÔNG NGHỆ SỬ DỤNG (TECH STACK)

Dự án sử dụng một stack công nghệ hiện đại, tập trung vào hiệu năng, trải nghiệm người dùng (UX) và tích hợp AI:

*   **Frontend Framework:** React 19 kết hợp với Vite.
*   **Styling & UI:** Tailwind CSS để tối ưu hóa thiết kế đáp ứng (responsive), kết hợp với `lucide-react` cho hệ thống icon.
*   **3D & Animation (Wow Factor):** 
    *   `three.js`, `@react-three/fiber`, `@react-three/drei` cho các thành phần đồ họa 3D tương tác.
    *   `gsap` (GreenSock) và `lenis` để tạo các hiệu ứng chuyển động mượt mà và Smooth Scrolling chuẩn điện ảnh.
*   **Backend & API:** Vercel Serverless Functions (Node.js) cho các tác vụ xử lý độc lập và nhẹ.
*   **AI Engine:** Google Gemini API (`@google/genai`) phiên bản 2.5 Flash, phục vụ việc phân tích Deepfake và trợ lý ảo thời gian thực.
*   **Database & Auth:** Firebase (Firestore, Authentication) lưu trữ dữ liệu người dùng và điểm số.
*   **Ngôn ngữ chính:** TypeScript (`.tsx`, `.ts`).

---

## 📂 2. CẤU TRÚC THƯ MỤC CHÍNH

Dự án được tổ chức theo cấu trúc module rõ ràng, giúp dễ dàng mở rộng và bảo trì:

```text
DEEPFENSE/
├── api/                    # Vercel Serverless Functions (Backend API)
│   ├── chat.js             # API xử lý luồng tin nhắn cho AI Agent
│   ├── health.js           # API kiểm tra trạng thái máy chủ
│   └── scan-media.js       # API nhận file (ảnh/âm thanh), gửi tới Gemini AI để phân tích Deepfake
├── public/                 # Các tài nguyên tĩnh (Images, 3D Models, Favicon)
├── src/                    # Mã nguồn chính của React (Frontend)
│   ├── components/         # Các UI component có thể tái sử dụng (Layout, Buttons, Effects...)
│   │   ├── common/         # Các component chung (SEO, ErrorBoundary...)
│   │   ├── effects/        # Hiệu ứng 3D, Particle, Hạt rơi (CyberField, SummerEffects...)
│   │   └── layout/         # Header, Footer, Navbar
│   ├── config/             # Cấu hình dự án (Firebase config...)
│   ├── data/               # Dữ liệu tĩnh, nội dung dịch vụ (Translations EN/VI)
│   ├── features/           # Các tính năng nghiệp vụ cốt lõi
│   │   ├── chat/           # Logic và giao diện của Trợ lý AI (AiChat)
│   │   ├── dashboard/      # Bảng điều khiển người dùng
│   │   └── deepfake/       # Xử lý logic Thử thách phân biệt Deepfake (DeepfakeRunner.tsx)
│   ├── hooks/              # Custom React Hooks
│   ├── lib/                # Thư viện tiện ích (SmoothScroll...)
│   ├── pages/              # Các trang giao diện chính của hệ thống (Views)
│   │   ├── Home.tsx        # Trang chủ với hiệu ứng Landing Page
│   │   ├── Tools.tsx       # Trang Công cụ (Risk Scanner)
│   │   ├── Challenge.tsx   # Trang Thử thách Thám tử Deepfake
│   │   ├── CrisisHub.tsx   # Trung tâm ứng cứu khẩn cấp
│   │   ├── MiniGame.tsx    # Minigame giáo dục
│   │   ├── Simulator.tsx   # Trình giả lập các tình huống lừa đảo
│   │   └── Admin.tsx       # Bảng điều khiển dành cho Quản trị viên
│   ├── styles/             # Global CSS, Design Tokens
│   ├── types/              # Định nghĩa TypeScript Interfaces/Types
│   ├── App.tsx             # Component gốc, cấu hình Routing
│   └── main.tsx            # Điểm vào (Entry point) của ứng dụng React
├── package.json            # Quản lý thư viện và scripts
├── tailwind.config.js      # (Được định nghĩa trực tiếp hoặc qua file) Cấu hình Tailwind
└── vite.config.ts          # Cấu hình Vite builder
```

---

## 🎯 3. PHÂN TÍCH CÁC TÍNH NĂNG CỐT LÕI

### 3.1. Hệ thống Quét Rủi Ro (Risk Scanner) - `src/pages/Tools.tsx` & `api/scan-media.js`
Đây là công cụ cho phép người dùng tải lên các file đa phương tiện (ảnh, âm thanh) nghi ngờ để hệ thống phân tích.
*   **Luồng hoạt động:** File ở frontend được chuyển thành định dạng Base64, sau đó gửi POST request đến endpoint `/api/scan-media`.
*   **Bảo mật:** API `scan-media.js` kiểm tra Header `origin` để chặn các request từ domain lạ, chống lạm dụng (Spam API). Nó cũng chặn các file quá lớn (>4MB do giới hạn của Vercel Free).
*   **AI Phân tích:** Sử dụng `systemInstruction` nghiêm ngặt yêu cầu Gemini đóng vai chuyên gia pháp y kỹ thuật số (Digital Forensics Expert). AI sẽ tìm kiếm các lỗi (artifacts) như lỗi ánh sáng, da không tự nhiên, lỗi âm thanh robot... và trả về kết quả dưới định dạng JSON bao gồm: Điểm rủi ro (Risk Score) và các dòng phân tích chi tiết.

### 3.2. Thử thách Thám tử Deepfake (Detective Challenge) - `src/pages/Challenge.tsx` & `src/features/deepfake/DeepfakeRunner.tsx`
Một khóa huấn luyện tương tác (Gamification).
*   Bao gồm **10 cấp độ** có độ khó tăng dần.
*   Người chơi sẽ xem các đoạn video/hình ảnh và phải tự suy luận, chỉ ra xem đó là nội dung thật hay do AI tạo ra (Deepfake).
*   Điểm số được lưu lại và đồng bộ hóa, tạo động lực cạnh tranh để nâng cao nhận thức.

### 3.3. Trợ lý Bảo mật AI (AI Agent) - `src/features/chat/AiChat` & `api/chat.js`
*   Một Chatbot luôn túc trực trên giao diện (Floating Chatbot).
*   Hỗ trợ người dùng giải đáp các thắc mắc về bảo mật, hướng dẫn cách phòng chống lừa đảo trực tuyến.
*   Hoạt động dựa trên Google Gemini API để đưa ra các câu trả lời tự nhiên, chính xác và bám sát ngữ cảnh an ninh mạng.

### 3.4. Trung tâm Ứng cứu (Crisis Hub) - `src/pages/CrisisHub.tsx`
*   Cung cấp các quy trình xử lý khẩn cấp khi người dùng bị lừa đảo (ví dụ: bị chiếm đoạt tài khoản, lừa tiền).
*   Giao diện thiết kế theo phong cách cảnh báo cao, hướng dẫn từng bước rõ ràng để giảm thiểu rủi ro cho nạn nhân.

### 3.5. Trải nghiệm Điện ảnh & Hiệu ứng 3D (UX/UI)
*   **CyberField / SummerEffects:** Sử dụng Three.js để tạo ra các không gian 3D nền (background) tương tác được với chuột, mang lại cảm giác công nghệ cao (High-tech) và chuyên nghiệp.
*   Sử dụng màu sắc nhận diện mạnh mẽ: Đen (`#050505`), Xanh Neon (`#00F0FF`), Hồng Đỏ (`#FF2A6D`) tạo phong cách Cyberpunk/Hacker đặc trưng của các dự án Security.

---

## 🛡️ 4. CƠ CHẾ BẢO MẬT & CHỐNG GIAN LẬN

Dự án không chỉ dạy về bảo mật mà còn áp dụng các biện pháp bảo mật thực tế:
1.  **CORS & Origin Validation:** Các API (`/api/*`) đều kiểm tra nghiêm ngặt `req.headers.origin`, chỉ cho phép các domain được ủy quyền (`deepfense.online`, `localhost`) gọi API.
2.  **Anti Self-XSS:** Trong `App.tsx`, có một đoạn mã in ra Console cảnh báo người dùng màu đỏ cực lớn, khuyên họ KHÔNG được dán bất kỳ mã lạ nào vào Console để tránh bị tấn công Self-XSS (chiếm phiên đăng nhập).
3.  **Digital Signature:** Ghi thông tin bản quyền và tác giả rõ ràng trong Console log, khẳng định quyền sở hữu trí tuệ của tác giả Hồ Xuân Nguyễn.

---

## 📝 5. TỔNG KẾT
**DEEPFENSE.ONLINE** là một dự án ứng dụng Web hoàn chỉnh, kết hợp xuất sắc giữa kỹ thuật lập trình Frontend hiện đại (React, Three.js) và trí tuệ nhân tạo (Generative AI). Dự án giải quyết một bài toán xã hội vô cùng cấp thiết (phòng chống Deepfake) thông qua trải nghiệm người dùng cực kỳ cuốn hút và có tính giáo dục cao. Cấu trúc code sạch, phân tách rõ ràng giữa UI, Logic và API, rất phù hợp cho việc đánh giá đồ án học thuật ở mức xuất sắc.
