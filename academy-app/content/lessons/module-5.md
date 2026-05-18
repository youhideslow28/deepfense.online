# Module 5 — OTP và ứng dụng độc hại
> **Thời lượng:** 35 phút &nbsp;|&nbsp; **Cấp độ:** Defense

---

## 5.1 OTP, 2FA và tấn công SIM Swap

### OTP là gì và tại sao nó quan trọng?

**OTP** (One-Time Password — Mật khẩu một lần) là dãy số thường gồm 6 chữ số, chỉ có giá trị trong một khoảng thời gian ngắn (thường 30 giây đến vài phút). Ngân hàng, mạng xã hội và các dịch vụ trực tuyến dùng OTP như một lớp bảo vệ thứ hai — bên cạnh mật khẩu thông thường.

Đây chính là nền tảng của **xác thực hai yếu tố (2FA)**: để đăng nhập, bạn cần cung cấp hai thứ:
- **Thứ bạn biết** — mật khẩu
- **Thứ bạn có** — điện thoại nhận OTP hoặc ứng dụng xác thực

Ý tưởng rất đơn giản: dù kẻ xấu đánh cắp được mật khẩu của bạn, chúng vẫn cần có điện thoại của bạn mới vào được tài khoản.

### OTP qua SMS và ứng dụng xác thực — khác nhau như thế nào?

Hầu hết ngân hàng Việt Nam hiện nay vẫn dùng **OTP qua SMS**. Cách này tiện lợi nhưng có một điểm yếu nghiêm trọng: tin nhắn SMS có thể bị chặn hoặc chuyển hướng.

**Ứng dụng xác thực** như Google Authenticator hay Authy hoạt động khác hẳn — chúng tạo mã OTP ngay trên thiết bị của bạn, không cần kết nối mạng, không đi qua nhà mạng. Kẻ tấn công không thể chặn thứ không truyền qua không khí.

> **Lưu ý quan trọng:** Nếu dịch vụ bạn dùng hỗ trợ ứng dụng xác thực, hãy ưu tiên dùng thay cho OTP SMS. Đây là bước nâng cấp bảo mật đơn giản nhất bạn có thể làm ngay hôm nay.

### Tấn công SIM Swap — khi số điện thoại của bạn bị đánh cắp

**SIM Swap** là kỹ thuật tấn công mà kẻ xấu gọi điện đến nhà mạng của bạn, giả vờ là bạn, và yêu cầu chuyển số điện thoại sang SIM mới của chúng. Chúng thường đã có sẵn một số thông tin cá nhân của bạn — tên, ngày sinh, địa chỉ — thu thập từ mạng xã hội hoặc các vụ rò rỉ dữ liệu.

Sau khi thành công, mọi tin nhắn SMS — bao gồm tất cả OTP ngân hàng — sẽ chạy vào điện thoại của kẻ tấn công. Chúng có thể đặt lại mật khẩu và vào thẳng tài khoản của bạn.

**Dấu hiệu cảnh báo SIM Swap:**
- SIM đột ngột mất sóng mà không rõ lý do
- Không gọi được, không nhắn tin được trong khi người xung quanh vẫn có sóng bình thường
- Nhận được email thông báo thay đổi tài khoản mà bạn không thực hiện
- Không nhận được OTP dù đã yêu cầu nhiều lần

⚠️ Nếu SIM đột ngột mất sóng, hãy gọi ngay cho ngân hàng từ điện thoại khác để tạm khóa giao dịch trực tuyến.

### Quy tắc vàng về OTP

**Không bao giờ chia sẻ OTP với bất kỳ ai** — dù họ tự xưng là nhân viên ngân hàng, nhân viên hỗ trợ Microsoft, công an, hay thậm chí người thân trong gia đình.

Không có tổ chức hợp pháp nào cần bạn đọc OTP cho họ nghe qua điện thoại. Đây là ranh giới tuyệt đối, không có ngoại lệ.

---

## 5.2 Ứng dụng độc hại và quyền truy cập

### Ứng dụng xin quá nhiều quyền — dấu hiệu đỏ

Khi cài ứng dụng, hệ thống thường hỏi bạn có đồng ý cấp một số quyền truy cập không. Đây là cơ chế bảo vệ quan trọng — nhưng nhiều người bấm "Đồng ý" mà không đọc kỹ.

**Ứng dụng độc hại** thường xin quyền **READ_SMS** (đọc tin nhắn), **quyền truy cập danh bạ**, hay **quyền chồng màn hình** (screen overlay). Với quyền READ_SMS, ứng dụng có thể đọc toàn bộ OTP ngân hàng gửi đến điện thoại bạn và tự động gửi về cho kẻ tấn công — mà bạn không hề hay biết.

Hãy tự hỏi: ứng dụng đèn pin cần đọc tin nhắn SMS của tôi để làm gì? Trò chơi xếp hình cần truy cập danh bạ để làm gì? Nếu quyền không liên quan đến chức năng ứng dụng, đó là dấu hiệu đáng ngờ.

**Những quyền cần xem xét kỹ trước khi cấp:**
- Đọc tin nhắn SMS
- Truy cập danh bạ
- Chồng lên ứng dụng khác (overlay)
- Quản trị thiết bị (Device Administrator)
- Truy cập nhật ký cuộc gọi

### Rủi ro của APK tải ngoài CH Play

**Sideloading** — tức cài ứng dụng từ file APK tải bên ngoài Google Play Store hoặc App Store — là con đường ngắn nhất để ứng dụng độc hại vào thiết bị của bạn. Các kho ứng dụng chính thức có quy trình kiểm duyệt, dù không hoàn hảo, nhưng vẫn lọc được phần lớn mã độc.

File APK chia sẻ qua Zalo, Telegram, hay các trang web lạ không qua kiểm duyệt này. Chúng thường được ngụy trang thành ứng dụng ngân hàng, ứng dụng theo dõi giao hàng, thậm chí ứng dụng của cơ quan nhà nước hay công an.

> **Lưu ý quan trọng:** Nếu ai đó gửi cho bạn một file APK và yêu cầu cài vào điện thoại — dù họ là ai — hãy từ chối. Ngân hàng và cơ quan nhà nước không phân phối ứng dụng qua tin nhắn cá nhân.

### Nhận diện ứng dụng ngân hàng giả mạo

Kẻ xấu tạo ra các ứng dụng giả trông giống hệt ứng dụng ngân hàng thật để đánh cắp thông tin đăng nhập. Cách kiểm tra trước khi cài trên CH Play:

- **Tên nhà phát triển:** Phải là tên chính thức của ngân hàng, không phải tên lạ hay có lỗi chính tả nhỏ
- **Số lượt tải:** Ứng dụng ngân hàng lớn ở Việt Nam thường có hàng triệu lượt tải — con số vài nghìn là đáng ngờ
- **Đánh giá:** Đọc nội dung bình luận, không chỉ nhìn số sao tổng
- **Quyền truy cập:** Xem danh sách quyền trước khi bấm cài đặt
- **Ngày phát hành:** Ứng dụng mới xuất hiện mà chưa ai biết tên là dấu hiệu cảnh giác

✅ Cách an toàn nhất: truy cập website chính thức của ngân hàng và nhấn vào đường link tải ứng dụng từ đó.

---

## 5.3 Phòng vệ tài khoản

### Danh sách kiểm tra bảo mật cá nhân

Áp dụng những bước sau để bảo vệ tài khoản của bạn trước các mối đe dọa đã học trong module này:

- **Mật khẩu mạnh và độc nhất** cho mỗi tài khoản — không dùng lại mật khẩu giữa các dịch vụ khác nhau
- **Bật 2FA** cho email, ngân hàng, mạng xã hội — ưu tiên ứng dụng xác thực hơn OTP SMS nếu có lựa chọn
- **Rà soát quyền ứng dụng** định kỳ: vào Cài đặt > Ứng dụng > Quyền và xem ứng dụng nào đang có quyền đọc SMS hay truy cập danh bạ
- **Kiểm tra phiên đăng nhập** trên các tài khoản quan trọng — Google, Facebook đều cho phép xem thiết bị nào đang đăng nhập và đăng xuất khỏi thiết bị lạ
- **Không cài APK** từ nguồn ngoài kho ứng dụng chính thức
- **Xóa ứng dụng không dùng** — ứng dụng bỏ không cập nhật là điểm yếu bảo mật tiềm ẩn

> **Lưu ý quan trọng:** Dành 15 phút mỗi tháng để rà soát quyền ứng dụng và phiên đăng nhập đang hoạt động. Đây là thói quen vệ sinh số đơn giản nhưng rất hiệu quả.

---

## Tóm tắt

Module này trang bị cho bạn hiểu biết về hai mối đe dọa phổ biến nhắm vào điện thoại và tài khoản trực tuyến:

- **OTP và 2FA** là lớp bảo vệ quan trọng, nhưng OTP qua SMS có thể bị tấn công qua SIM Swap — ứng dụng xác thực an toàn hơn đáng kể
- **SIM Swap** xảy ra khi kẻ tấn công thuyết phục nhà mạng chuyển số của bạn — dấu hiệu chính: SIM đột ngột mất sóng không rõ lý do
- **Không bao giờ chia sẻ OTP** với bất kỳ ai, không có ngoại lệ — không ngân hàng, không công an, không ai cả
- **Ứng dụng độc hại** khai thác quyền truy cập quá mức, đặc biệt quyền đọc SMS để đánh cắp OTP trong nền
- **Không cài APK** từ nguồn không rõ ràng — chỉ dùng kho ứng dụng chính thức và kiểm tra kỹ nhà phát triển
- Thực hành bảo mật đều đặn: mật khẩu mạnh, bật 2FA, kiểm tra quyền ứng dụng và phiên đăng nhập định kỳ mỗi tháng
