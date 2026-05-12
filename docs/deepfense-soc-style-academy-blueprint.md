# Deepfense SOC-Style Academy Blueprint

## 1. Dinh Vi San Pham

Deepfense van la mot web dao tao nguoi dung phong chong deepfake va AI scam. Muc dich chinh khong phai la xay mot nen tang SOC/GRC doanh nghiep, ma la xay mot academy co dashboard quan tri chuyen nghiep, mang ngon ngu va tu duy SOC de phuc vu dinh huong nghe nghiep tuong lai cua nguoi phat trien.

Thong diep san pham:

> Deepfense la nen tang huan luyen cong dong nhan dien deepfake va AI scam thong qua thu thach, mo phong tinh huong, gamification va trung tam ho tro.

Thong diep ky thuat/portfolio:

> Deepfense ap dung cac nguyen tac security operations, access control, activity logging, data governance va privacy-by-design o muc phu hop voi mot web giao duc.

## 2. Nguyen Tac Thiet Ke

- Khong bien Deepfense thanh SIEM/SOC enterprise.
- Giao dien admin co cam giac SOC: dark dashboard, risk cards, case queue, activity timeline, event severity.
- Nguoi dung cuoi van thay san pham don gian: hoc, lam challenge, xem ket qua, gui ho tro.
- Admin/editor thay he thong co cau truc: quan ly user, content, challenge, help center case, log.
- Moi du lieu thu thap phai co muc dich ro rang.
- Khong dung ngon ngu phan xet phap ly nhu "ben dung/ben sai". Dung ngon ngu trung gian: "co dau hieu", "can xac minh them", "khuyen nghi phong tranh".

## 3. Vai Tro He Thong

### User

Nguoi hoc/nguoi choi binh thuong.

Quyen:

- Lam challenge deepfake.
- Tham gia scam simulator.
- Xem ket qua, diem, phan tich loi sai.
- Gui van de qua Trung tam giup do.
- Hoan thanh khao sat neu dong y.

### Editor

Thanh vien nhom phu trach noi dung.

Quyen:

- Tao/sua academy lesson.
- Tao/sua challenge.
- Them link YouTube hoac video challenge.
- Viet explanation cho cau tra loi.
- Gan skill tag va do kho.
- Chuyen challenge giua draft/published/archived neu duoc admin cho phep.

Khong nen co quyen:

- Xoa user.
- Doi role.
- Xem du lieu nhay cam khong can thiet.
- Xoa activity/security log.

### Admin

Quan tri he thong.

Quyen:

- Quan ly user.
- Quan ly role user/editor/admin.
- Quan ly challenge, lesson, help center case.
- Xem dashboard SOC-style.
- Xem activity log va security events.
- Khoa/mo tai khoan.
- Xu ly bao cao tu Trung tam giup do.

### Khong Can Tester Role

Tester chi la nguoi dung binh thuong hoac thanh vien duoc gui link preview de thu noi dung. Khong can tao role rieng vi se lam phuc tap he thong.

## 4. Cac Khu Vuc Chinh Cua Admin Dashboard

### 4.1 SOC Overview

Man hinh tong quan, tao cam giac "operations console" cho Deepfense.

Thanh phan giao dien:

- Header: Deepfense Control Center / SOC Console.
- Time range filter: Today, 7 days, 30 days, all time.
- Status cards.
- Chart nho.
- Recent activity timeline.
- Case queue.
- Top weak skills.

Chi so nen hien thi:

- Active Learners: so user hoat dong gan day.
- Training Events: tong luot lam challenge.
- Detection Accuracy: ty le dung trung binh.
- Help Center Cases: so case moi/chua xu ly.
- High-Risk Misjudgments: so luot sai o challenge kho hoac noi dung nhay cam.
- Content Review Queue: challenge dang draft/cho publish.
- Recent Signals: log hoat dong moi.

Ngon ngu UI goi y:

- Training Events
- Detection Accuracy
- Help Center Cases
- Content Review Queue
- Recent Signals
- User Monitoring
- Security Events
- Risk Level
- Case Status

### 4.2 User Monitoring

Muc tieu: quan ly nguoi dung va hanh vi hoc tap, khong phai giam sat doi tu.

Chuc nang:

- Danh sach user.
- Tim kiem theo email/name/user id.
- Loc theo role: user/editor/admin.
- Loc theo status: active/inactive/flagged/banned.
- Xem diem, so challenge da lam, accuracy.
- Xem lan hoat dong gan nhat.
- Xem so help center case da gui.
- Xem user detail.
- Khoa/mo tai khoan.
- Doi role.

Cot bang goi y:

- User
- Role
- Status
- Challenges
- Accuracy
- Score
- Last Active
- Flags
- Actions

User detail nen co:

- Profile summary.
- Learning progress.
- Challenge history.
- Survey participation status, uu tien chi hien thi tong quan.
- Help center case history.
- Activity timeline cua user.

### 4.3 Help Center Cases

Day la noi tiep nhan van de nguoi dung gui den. Deepfense la ben trung gian ho tro nhan dien va huong dan phong tranh, khong phai co quan phan xu.

Chuc nang:

- Nhan link/video/tinh huong nghi ngo deepfake.
- Xem danh sach case.
- Phan loai case.
- Gan severity.
- Cap nhat trang thai.
- Gui email phan hoi.
- Luu lich su xu ly.

Loai case:

- deepfake_video
- ai_voice_scam
- impersonation
- phishing_or_scam
- harassment
- misinformation
- other

Trang thai:

- new
- reviewing
- replied
- closed
- archived

Severity:

- low
- medium
- high

Ngon ngu phan hoi nen dung:

- "Noi dung co mot so dau hieu can xac minh them."
- "Chua du du kien de ket luan."
- "Khuyen nghi lien he truc tiep nguoi lien quan qua kenh khac."
- "Khong chuyen tien/chia se ma OTP/thong tin ca nhan khi chua xac minh."
- "Deepfense chi ho tro giao duc va nhan dien rui ro, khong thay the ket luan phap ly."

### 4.4 Challenge & Content Studio

Danh cho admin/editor quan ly noi dung dao tao.

Chuc nang:

- Tao challenge moi.
- Nhap title, description.
- Them link YouTube hoac video.
- Chon kieu challenge.
- Chon dap an dung.
- Viet explanation sau khi user tra loi.
- Gan skill tags.
- Gan difficulty.
- Dat status draft/published/archived.
- Xem thong ke challenge.

Challenge type:

- compare_ab: so sanh ben trai/ben phai.
- single_video_detect: nhan dien video that/gia.
- scam_scenario: tinh huong lua dao.
- quiz: cau hoi kien thuc.

Skill tags:

- face_artifacts
- lighting
- motion
- context
- voice
- behavior
- verification

Difficulty:

- easy
- medium
- hard

Status:

- draft
- published
- archived

Thong ke moi challenge:

- total plays
- correct rate
- average completion time
- wrong answer count
- most failed skill

### 4.5 Activity Log

Day la phan rat quan trong de dashboard co dau an SOC.

Nen ghi lai:

- Admin/editor dang nhap.
- Admin dang xuat.
- Editor tao/sua challenge.
- Admin doi role.
- Admin khoa/mo user.
- User gui help center case.
- User hoan thanh challenge.
- User gui survey.
- Admin xu ly case.
- Admin xoa/sua du lieu.

Schema goi y:

```txt
activity_logs
- actorId
- actorRole
- action
- targetType
- targetId
- severity
- ipAddress
- userAgent
- metadata
- createdAt
```

Severity:

- info
- notice
- warning
- critical

Action examples:

- user.login
- user.challenge_completed
- user.help_case_submitted
- editor.challenge_created
- editor.challenge_updated
- admin.role_changed
- admin.user_banned
- admin.case_replied
- admin.data_deleted

### 4.6 Security Events

Co the tach rieng voi activity log de chuyen nghiep hon.

Nen ghi:

- login_failed
- repeated_login_failed
- permission_denied
- role_changed
- suspicious_help_case
- suspicious_upload_or_link
- admin_session_expired
- high_frequency_submission

Schema goi y:

```txt
security_events
- eventType
- actorId
- actorRole
- severity
- sourceIp
- userAgent
- details
- createdAt
```

## 5. Data Model De Xay Tiep Tren Firebase/Firestore

Hien Deepfense dang co cac collection dang dung:

- game_results
- surveys
- incident_reports
- minigame_leaderboard

Nen mo rong theo huong sau:

### users

```txt
users
- uid
- email
- displayName
- role
- status
- score
- createdAt
- lastActiveAt
```

### user_profiles

```txt
user_profiles
- uid
- ageGroup
- totalChallenges
- correctAnswers
- accuracy
- badges
- consentVersion
- updatedAt
```

### challenges

```txt
challenges
- title
- description
- type
- videoUrl
- thumbnailUrl
- correctAnswer
- explanation
- skillTags
- difficulty
- status
- createdBy
- updatedBy
- publishedAt
- createdAt
- updatedAt
```

### challenge_submissions

```txt
challenge_submissions
- userId
- challengeId
- answer
- isCorrect
- score
- completionTime
- createdAt
```

### help_center_cases

Co the thay the hoac nang cap tu incident_reports.

```txt
help_center_cases
- name
- email
- userId
- title
- description
- caseType
- severity
- status
- url
- attachmentUrl
- assignedTo
- responseNote
- submittedAt
- updatedAt
- closedAt
```

### activity_logs

```txt
activity_logs
- actorId
- actorRole
- action
- targetType
- targetId
- severity
- ipAddress
- userAgent
- metadata
- createdAt
```

### security_events

```txt
security_events
- eventType
- actorId
- actorRole
- severity
- sourceIp
- userAgent
- details
- createdAt
```

### content_lessons

```txt
content_lessons
- title
- slug
- body
- category
- status
- createdBy
- updatedBy
- createdAt
- updatedAt
```

## 6. Policy Quan Trong Nhat Can Co

Tai lieu uu tien viet truoc:

# Chinh Sach Bao Mat Va Xu Ly Du Lieu Nguoi Dung

## 6.1 Muc Dich

Chinh sach nay giai thich cach Deepfense thu thap, su dung, luu tru va bao ve du lieu nguoi dung trong qua trinh nguoi dung tham gia hoc tap, lam thu thach, gui khao sat va su dung Trung tam giup do.

## 6.2 Du Lieu Chung Toi Thu Thap

Deepfense co the thu thap cac nhom du lieu sau:

- Thong tin tai khoan: email, ten hien thi, vai tro tai khoan.
- Du lieu hoc tap: diem so, ket qua challenge, ty le dung, tien do hoc.
- Du lieu khao sat: nhom tuoi, cau tra loi ve nhan thuc an toan so, y kien dong gop.
- Du lieu Trung tam giup do: ho ten, email, mo ta van de, duong dan, tep dinh kem neu co.
- Du lieu ky thuat: thoi gian truy cap, thiet bi, trinh duyet, dia chi IP, log hoat dong.

## 6.3 Muc Dich Su Dung Du Lieu

Du lieu duoc su dung de:

- Van hanh he thong challenge va gamification.
- Hien thi diem, ket qua va phan tich loi sai cho nguoi dung.
- Cai thien noi dung dao tao phong chong deepfake va AI scam.
- Phan tich tong hop nhan thuc cong dong ve rui ro deepfake.
- Phan hoi cac yeu cau gui qua Trung tam giup do.
- Phat hien spam, lam dung va hanh vi bat thuong.
- Bao ve an toan he thong va tai khoan nguoi dung.

## 6.4 Du Lieu Khao Sat

Du lieu khao sat duoc uu tien xu ly o dang an danh hoac tong hop. Deepfense khong su dung cau tra loi khao sat de phan biet doi xu voi ca nhan nguoi dung. Du lieu nay phuc vu muc dich nghien cuu, giao duc va cai thien noi dung dao tao.

## 6.5 Du Lieu Gui Qua Trung Tam Giup Do

Nguoi dung can dam bao noi dung gui len khong vi pham quyen rieng tu, ban quyen hoac phap luat hien hanh. Deepfense dong vai tro ho tro nhan dien rui ro va huong dan phong tranh, khong phai co quan dieu tra, co quan phap ly hay don vi phan xu tranh chap.

Deepfense co the phan loai noi dung theo muc do rui ro va gui khuyen nghi nhu:

- Can xac minh them.
- Co dau hieu rui ro.
- Khuyen nghi lien he nguoi lien quan qua kenh khac.
- Khuyen nghi khong chuyen tien hoac chia se thong tin nhay cam khi chua xac minh.

## 6.6 Chia Se Du Lieu

Deepfense khong ban du lieu ca nhan cua nguoi dung. Du lieu chi duoc chia se trong cac truong hop:

- Co su dong y cua nguoi dung.
- Can thiet de van hanh dich vu.
- Can thiet de bao ve he thong va nguoi dung.
- Theo yeu cau hop le cua phap luat.

## 6.7 Luu Tru Va Xoa Du Lieu

Deepfense chi luu tru du lieu trong thoi gian can thiet cho muc dich van hanh, dao tao, thong ke va bao ve he thong. Nguoi dung co the yeu cau xem, chinh sua hoac xoa du lieu ca nhan cua minh neu phu hop voi dieu kien ky thuat va phap ly.

Goi y retention:

- Activity log: 90-180 ngay.
- Security events: 180 ngay.
- Help center cases: 180-365 ngay tuy muc do.
- Survey data: uu tien giu dang tong hop/an danh.
- Challenge results: giu theo tai khoan cho muc dich hoc tap.

## 6.8 Bao Mat Du Lieu

Deepfense ap dung cac bien phap bao mat phu hop:

- Phan quyen admin/editor/user.
- Gioi han truy cap noi bo.
- Ghi log thao tac quan tri.
- Bao ve dang nhap.
- Kiem soat quyen doc/ghi du lieu.
- Su dung HTTPS khi trien khai production.

## 6.9 Quyen Cua Nguoi Dung

Nguoi dung co quyen:

- Yeu cau xem du lieu lien quan den tai khoan cua minh.
- Yeu cau chinh sua thong tin chua chinh xac.
- Yeu cau xoa tai khoan hoac mot so du lieu ca nhan.
- Rut lai su dong y doi voi mot so hoat dong xu ly du lieu neu ap dung.

## 6.10 Lien He

Moi cau hoi ve chinh sach bao mat, du lieu ca nhan hoac Trung tam giup do co the gui qua email/form lien he chinh thuc cua Deepfense.

## 7. Thu Tu Uu Tien Xay Dung

### Phase 1: Nen Tang Role Va Dashboard

- Them role user/editor/admin.
- Nang cap admin UI thanh dashboard co sidebar.
- Tao SOC Overview.
- Tao User Monitoring.
- Ghi activity log co ban.

### Phase 2: Help Center Cases

- Nang cap incident_reports thanh help_center_cases.
- Them case type, severity, status.
- Them trang chi tiet case.
- Them response note va lich su xu ly.

### Phase 3: Challenge & Content Studio

- Tao collection challenges.
- Tao form editor tao/sua challenge.
- Gan type, skill tag, difficulty, status.
- Hien thi thong ke tung challenge.

### Phase 4: Security Events Va Policy

- Tach security_events.
- Ghi login_failed, permission_denied, role_changed.
- Them trang xem security events.
- Dua Chinh sach bao mat va xu ly du lieu nguoi dung len web.

### Phase 5: Bao Mat Ha Tang

De sau theo yeu cau hien tai:

- Cloudflare.
- HTTPS/HSTS.
- CSP.
- X-Frame-Options/frame-ancestors.
- Rate limit.
- Upload validation.

## 8. Ket Luan Chien Luoc

Huong di dung cua Deepfense:

- Ben ngoai: web academy gamification giup nguoi dung phong chong deepfake va AI scam.
- Ben trong: admin dashboard co ngon ngu SOC de quan ly user, challenge, help center case, activity log va security events.
- Ve portfolio: the hien tu duy SOC/GRC thong qua RBAC, logging, case management, privacy policy va data governance vua du.

Khong can lam qua nang. Diem manh cua Deepfense nam o viec ket hop giao duc cong dong voi tu duy van hanh bao mat mot cach gon, ro va co the trien khai that.
