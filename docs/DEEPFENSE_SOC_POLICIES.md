# Deepfense SOC-Style Academy Policies

Tai lieu nay bien blueprint `deepfense-soc-style-academy-blueprint.md` thanh bo policy co the dung de trien khai admin dashboard, Firestore data model va quy trinh van hanh.

## 1. Role-Based Access Control Policy

### User

User la nguoi hoc/nguoi choi binh thuong.

Duoc phep:

- Lam challenge va simulator.
- Xem diem, tien do hoc, badge va ket qua cua chinh minh.
- Gui Help Center Case.
- Gui survey neu dong y.
- Yeu cau xem, sua hoac xoa du lieu ca nhan cua minh.

Khong duoc phep:

- Xem dashboard admin.
- Xem du lieu cua user khac.
- Sua challenge, lesson, case, role hoac log.

### Editor

Editor la thanh vien phu trach noi dung dao tao.

Duoc phep:

- Tao/sua lesson va challenge.
- Them video/link YouTube, explanation, skill tags va difficulty.
- Chuyen challenge giua `draft`, `published`, `archived` neu duoc admin cap quyen.
- Xem thong ke tong hop cua challenge.

Khong duoc phep:

- Xoa user.
- Doi role.
- Ban/unban user.
- Xem du lieu nhay cam khong can thiet.
- Xoa `activity_logs` hoac `security_events`.

### Admin

Admin la nguoi van hanh he thong.

Duoc phep:

- Quan ly user/editor/admin.
- Ban/unban tai khoan.
- Quan ly Help Center Cases.
- Xem SOC Overview, User Monitoring, Content Studio, Activity Log va Security Events.
- Cap nhat policy, retention va quy trinh xu ly du lieu.

Rang buoc:

- Moi thao tac quan tri quan trong phai ghi `activity_logs`.
- Moi thay doi role phai tao them `security_events` voi `eventType = role_changed`.
- Admin khong nen xoa log tru khi co ly do retention hoac yeu cau hop le.

## 2. Help Center Case Handling Policy

Deepfense la nen tang giao duc va ho tro nhan dien rui ro. Deepfense khong phai co quan dieu tra, co quan phap ly hay don vi phan xu tranh chap.

Trang thai case:

- `new`: vua tiep nhan.
- `reviewing`: dang xem xet va phan loai.
- `replied`: da phan hoi nguoi dung.
- `closed`: da ket thuc xu ly.
- `archived`: luu tru, khong hien trong hang doi mac dinh.

Severity:

- `low`: thong tin tham khao, rui ro thap.
- `medium`: co dau hieu can xac minh them.
- `high`: co kha nang gay thiet hai tai chinh, danh du, an toan ca nhan hoac lan truyen rong.

Ngon ngu phan hoi nen dung:

- "Noi dung co mot so dau hieu can xac minh them."
- "Chua du du kien de ket luan."
- "Khuyen nghi lien he truc tiep nguoi lien quan qua kenh khac."
- "Khong chuyen tien/chia se ma OTP/thong tin ca nhan khi chua xac minh."
- "Deepfense chi ho tro giao duc va nhan dien rui ro, khong thay the ket luan phap ly."

Ngon ngu nen tranh:

- Khong khang dinh "that/gia" khi chua co bang chung.
- Khong ket luan ai "co toi", "lua dao" hoac "vi pham phap luat".
- Khong hua rang Deepfense co kha nang dieu tra phap ly.

## 3. Activity Logging Policy

`activity_logs` ghi lai cac thao tac van hanh va hoc tap quan trong.

Nen ghi:

- `user.login`
- `user.challenge_completed`
- `user.help_case_submitted`
- `user.survey_submitted`
- `editor.challenge_created`
- `editor.challenge_updated`
- `admin.role_changed`
- `admin.user_banned`
- `admin.user_unbanned`
- `admin.case_replied`
- `admin.case_status_changed`
- `admin.data_deleted`

Schema:

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

- `info`: hanh dong binh thuong.
- `notice`: thay doi dang chu y.
- `warning`: can theo doi.
- `critical`: tac dong lon hoac lien quan du lieu nhay cam.

## 4. Security Event Policy

`security_events` tach rieng khoi activity log de dashboard co lop giam sat an toan ro rang.

Nen ghi:

- `login_failed`
- `repeated_login_failed`
- `permission_denied`
- `role_changed`
- `suspicious_help_case`
- `suspicious_upload_or_link`
- `admin_session_expired`
- `high_frequency_submission`

Schema:

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

Nguong goi y:

- 5 lan dang nhap that bai trong 10 phut: `repeated_login_failed`.
- 3 case/link tu cung mot user trong 5 phut: `high_frequency_submission`.
- Link co domain rut gon, file la, hoac noi dung kich dong chuyen tien: `suspicious_help_case`.
- User/editor truy cap route admin bi tu choi: `permission_denied`.

## 5. Data Retention Policy

Retention mac dinh:

- `activity_logs`: 90-180 ngay.
- `security_events`: 180 ngay.
- `help_center_cases`: 180-365 ngay tuy severity.
- `surveys`: uu tien giu dang tong hop/an danh.
- `challenge_submissions`: giu theo tai khoan de phuc vu tien do hoc.
- File dinh kem Help Center: xoa khi case het retention hoac khi nguoi dung yeu cau hop le.

Quy tac:

- Khong giu du lieu chi vi "co the can sau nay".
- Du lieu nhay cam can co muc dich xu ly ro rang.
- Khi xoa case co attachment, xoa ca document Firestore va file Storage.

## 6. Privacy And Data Handling Policy

Deepfense co the thu thap:

- Thong tin tai khoan: email, ten hien thi, role.
- Du lieu hoc tap: diem, challenge, accuracy, badge.
- Du lieu survey: nhom tuoi, cau tra loi nhan thuc, y kien dong gop.
- Du lieu Help Center: ten, email, mo ta, link, tep dinh kem neu co.
- Du lieu ky thuat: thoi gian truy cap, trinh duyet, user agent, IP/log neu duoc backend ghi nhan.

Muc dich:

- Van hanh academy, challenge va gamification.
- Cai thien noi dung phong chong deepfake va AI scam.
- Phan hoi Help Center Cases.
- Phat hien spam, lam dung va hanh vi bat thuong.
- Bao ve tai khoan va he thong.

Cam ket:

- Khong ban du lieu ca nhan.
- Khong dung survey de phan biet doi xu ca nhan.
- Uu tien tong hop/an danh khi phan tich cong dong.
- Chi chia se du lieu khi co su dong y, can thiet de van hanh dich vu, bao ve he thong/nguoi dung, hoac theo yeu cau hop le cua phap luat.

## 7. Content Studio Policy

Challenge va lesson can co:

- `title`
- `description`
- `type`
- `correctAnswer`
- `explanation`
- `skillTags`
- `difficulty`
- `status`
- `createdBy`
- `updatedBy`

Trang thai:

- `draft`: dang soan.
- `published`: hien voi user.
- `archived`: khong hien voi user, giu de tham chieu.

Nguyen tac noi dung:

- Khong su dung hinh anh/video cua ca nhan that neu chua co quyen.
- Khong dua noi dung gay xau ho, boi nho hoac ket luan phap ly ve ca nhan/to chuc.
- Explanation phai giai thich dau hieu nhan dien va buoc xac minh an toan.
- Challenge hard hoac noi dung nhay cam nen duoc admin review truoc khi publish.

## 8. Firestore Rules Direction

Huong rules muc tieu:

```txt
users
- user doc: owner read limited fields
- admin: read/write
- editor: no role/status write

challenges
- published: public read
- draft/archived: editor/admin read
- write: editor/admin

help_center_cases
- create: signed-in user or public form with validation/rate limit through backend
- read/update: admin only
- limited own-case read: optional, if user portal exists

activity_logs
- create: backend/admin service only
- read: admin
- delete: service retention job only

security_events
- create: backend/admin service only
- read: admin
- delete: service retention job only
```

Nen uu tien Cloud Functions/API cho cac thao tac nhay cam:

- Doi role.
- Ban/unban user.
- Ghi security event co IP/userAgent.
- Xoa case kem attachment.
- Rate limit Help Center submission.

## 9. Implementation Phases

### Phase 1: Role Va Dashboard Foundation

- Them role `user/editor/admin` vao `users`.
- Nang cap `/admin` thanh SOC-style dashboard co sidebar.
- Tao SOC Overview va User Monitoring.
- Ghi `activity_logs` co ban cho thao tac admin/editor.

### Phase 2: Help Center Cases

- Nang cap `incident_reports` sang `help_center_cases`.
- Them `caseType`, `severity`, `status`, `assignedTo`, `responseNote`.
- Them trang chi tiet case va response template.
- Ghi history xu ly case.

### Phase 3: Challenge & Content Studio

- Tao collection `challenges`.
- Tao form editor tao/sua challenge.
- Gan `type`, `skillTags`, `difficulty`, `status`.
- Hien thi thong ke tung challenge.

### Phase 4: Security Events Va Policy Public Page

- Tach `security_events`.
- Ghi `login_failed`, `permission_denied`, `role_changed`, `high_frequency_submission`.
- Them tab Security Events trong admin.
- Dua Privacy/Data Handling Policy len web.

### Phase 5: Infrastructure Hardening

- HTTPS/HSTS.
- CSP va `frame-ancestors`.
- Rate limit.
- Upload validation.
- Cloudflare/WAF neu trien khai production.
