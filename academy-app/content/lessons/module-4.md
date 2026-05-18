# Module 4 — Phishing và URL giả mạo
> **Thời lượng:** 35 phút &nbsp;|&nbsp; **Cấp độ:** Recognition

---

## 4.1 Phishing là gì và các hình thức

**Phishing** (tấn công giả mạo) là hình thức lừa đảo mà kẻ tấn công giả vờ là tổ chức uy tín để dụ nạn nhân tự nguyện cung cấp thông tin nhạy cảm — mật khẩu, thông tin thẻ ngân hàng, hoặc dữ liệu cá nhân. Không giống như virus hay malware phá vào hệ thống từ bên ngoài, phishing khai thác chính sự tin tưởng và mất cảnh giác của con người.

### Email phishing

Đây là hình thức phishing lâu đời và vẫn còn rất hiệu quả. Bạn nhận được email trông giống hệt thông báo từ ngân hàng, dịch vụ bưu chính, hay nền tảng mạng xã hội — có logo, màu sắc, và cả chữ ký chuyên nghiệp. Bên trong là link dẫn đến trang giả mạo yêu cầu đăng nhập hoặc xác nhận thông tin.

### Smishing (SMS phishing)

Như đã đề cập ở Module 3, **smishing** là phishing qua tin nhắn SMS. Tin nhắn thường ngắn gọn, có link rút gọn hoặc số điện thoại giả mạo. Hình thức này đang tăng mạnh tại Việt Nam vì nhiều người cảnh giác với email nhưng lại tin SMS hơn.

### Vishing (Voice phishing)

**Vishing** là phishing qua cuộc gọi điện thoại. Kẻ tấn công gọi điện, tự xưng là nhân viên ngân hàng, công an, hoặc cán bộ thuế, và dùng áp lực để buộc nạn nhân cung cấp thông tin hoặc chuyển tiền ngay. Giọng nói tạo cảm giác "người thật" khiến nạn nhân khó nghi ngờ hơn so với tin nhắn.

### Spear phishing

**Spear phishing** là phiên bản tinh vi hơn: thay vì gửi đại trà, kẻ tấn công nghiên cứu kỹ nạn nhân cụ thể — tên, chức vụ, tên sếp, dự án đang làm — rồi tạo ra tin nhắn/email cực kỳ thuyết phục, đúng ngữ cảnh. Hình thức này thường nhắm vào nhân viên doanh nghiệp hoặc cá nhân có tài sản lớn.

---

## 4.2 Giải mã URL đáng ngờ

Một trong những kỹ năng quan trọng nhất trong an toàn thông tin là biết đọc và phân tích một địa chỉ URL. Nhiều cuộc tấn công phishing chỉ cần bạn không chú ý đến thanh địa chỉ trình duyệt là thành công.

### Cấu trúc của một URL

Lấy ví dụ: `https://secure.vietcombank.com.vn/login`

- `https://` — **giao thức** (protocol): cách dữ liệu được truyền đi
- `vietcombank.com.vn` — **tên miền chính** (domain): đây là phần quan trọng nhất cần kiểm tra
- `secure` — **tên miền phụ** (subdomain): đứng trước tên miền chính
- `/login` — **đường dẫn** (path): trang cụ thể trong website

### Bẫy tên miền phụ (Subdomain trick)

⚠️ Đây là chiêu phổ biến nhất. Hãy so sánh:

- `secure.vietcombank.com.vn` — hợp lệ (subdomain của vietcombank.com.vn)
- `vietcombank.com.vn.verify-login.tk` — **GIẢ MẠO** (tên miền thực là verify-login.tk, không phải vietcombank.com.vn)

Quy tắc đọc URL: **tên miền thực là phần đứng ngay trước dấu gạch chéo đầu tiên**, không phải tên thương hiệu xuất hiện ở đâu đó trong URL.

### Homograph attack (Chữ nhìn giống nhau)

**Homograph attack** là kỹ thuật thay một hoặc vài ký tự trong tên miền bằng ký tự trông giống hệt từ bảng chữ cái khác. Ví dụ, chữ "і" (chữ i Cyrillic) trông gần như giống hệt chữ "i" tiếng Latin. Mắt thường hầu như không phân biệt được:

- `vietcombank.com.vn` — thật
- `vіetcombank.com.vn` — giả (chứa ký tự Cyrillic)

### Typosquatting (Đánh máy sai tên miền)

**Typosquatting** là đăng ký tên miền gần giống tên thật nhưng có lỗi đánh máy nhỏ, trông đủ quen để bạn không chú ý:

- `vietcornbank.com` (thêm chữ r)
- `vietcombnk.com` (bỏ chữ a)
- `viet-combank.com` (thêm dấu gạch ngang)

### HTTPS không đồng nghĩa với an toàn

> **Lưu ý quan trọng:** Biểu tượng ổ khóa và tiền tố `https://` chỉ có nghĩa là kết nối được **mã hóa** — không có nghĩa là trang web đó hợp lệ hay đáng tin cậy. Kẻ tấn công hoàn toàn có thể tạo một trang phishing có HTTPS. Đừng để ổ khóa khiến bạn mất cảnh giác.

### Link rút gọn (URL shorteners)

Các dịch vụ như `bit.ly`, `tinyurl.com` hay `rb.gy` ẩn địa chỉ thực của trang đích. Kẻ tấn công lợi dụng điều này để che giấu URL đáng ngờ. Trước khi nhấn vào link rút gọn, hãy dùng công cụ kiểm tra như `checkshorturl.com` hoặc thêm `+` vào cuối link bit.ly để xem địa chỉ thực (ví dụ: `bit.ly/abc123+`).

### Kỹ thuật hover-before-click (Di chuột trước khi nhấn)

Trên máy tính, bạn có thể di chuột lên link mà **chưa nhấn** — góc dưới bên trái của trình duyệt sẽ hiển thị địa chỉ thực. Đây là thói quen đơn giản nhưng cực kỳ hiệu quả để phát hiện link giả mạo trước khi quá muộn.

---

## 4.3 Website giả mạo và trang đăng nhập

Trang đăng nhập giả là điểm đến cuối cùng của phần lớn các cuộc tấn công phishing. Kẻ tấn công sao chép y hệt giao diện của trang ngân hàng, Gmail, Facebook để tạo cảm giác quen thuộc.

### Cách nhận biết trang đăng nhập giả

Khi bạn được dẫn đến một trang yêu cầu đăng nhập, hãy kiểm tra:

- **Thanh địa chỉ (URL bar):** Đây là thứ đầu tiên và quan trọng nhất. Đọc kỹ tên miền — trang thật hay giả?
- **Chi tiết ổ khóa:** Nhấn vào biểu tượng ổ khóa để xem chứng chỉ SSL. Tên tổ chức trong chứng chỉ có khớp với trang bạn đang truy cập không?
- **Thông tin được điền sẵn:** ⚠️ Nếu trang đăng nhập đã điền sẵn tên đăng nhập hoặc mật khẩu của bạn mà bạn không nhớ đã lưu — đó có thể là dữ liệu bị thu thập từ trước để tạo cảm giác đây là trang quen.
- **Thiết kế có vẻ hơi lạ:** Font chữ hơi khác, màu sắc không đúng, hình ảnh bị vỡ, hoặc các link ở footer không hoạt động.

### Hành động sau khi bị phishing

Nếu bạn đã nhập thông tin vào một trang nghi là giả mạo, hãy hành động ngay lập tức:

1. **Đổi mật khẩu** của tài khoản liên quan ngay — và tất cả các nơi dùng mật khẩu giống nhau
2. **Bật xác thực hai yếu tố (2FA)** nếu chưa có, ngay bây giờ
3. **Kiểm tra các phiên đăng nhập đang hoạt động** — đăng xuất khỏi tất cả thiết bị lạ
4. **Liên hệ ngân hàng** ngay nếu thông tin tài chính bị lộ — yêu cầu tạm khóa tài khoản và phát hành thẻ mới
5. **Báo cáo** trang giả mạo cho tổ chức bị giả danh và cho Bộ Công An qua đường dây 1800.1566

> **Lưu ý quan trọng:** Đừng chờ đến khi thấy giao dịch lạ mới báo ngân hàng. Hành động ngay sau khi nghi ngờ sẽ giúp giảm thiểu thiệt hại đáng kể. Thời gian là yếu tố quyết định.

---

## Tóm tắt

Module này trang bị cho bạn khả năng nhận diện các hình thức phishing và phân tích URL để phân biệt trang web thật và giả.

**Những điểm cần nhớ:**

- Có bốn hình thức phishing chính: **email phishing**, **smishing** (SMS), **vishing** (điện thoại), và **spear phishing** (có nhắm mục tiêu cụ thể).
- Khi đọc URL, tên miền thực là phần đứng ngay trước dấu gạch chéo đầu tiên — không phải tên thương hiệu xuất hiện ở bất kỳ vị trí nào khác.
- Các kỹ thuật làm giả URL phổ biến: **subdomain trick**, **homograph attack**, và **typosquatting**.
- HTTPS và ổ khóa chỉ nghĩa là kết nối mã hóa — không đảm bảo trang web hợp lệ.
- Link rút gọn có thể ẩn địa chỉ thực — kiểm tra trước khi nhấn.
- Trên máy tính, di chuột lên link trước khi nhấn để xem địa chỉ thực ở góc dưới trình duyệt.
- Nếu đã nhập thông tin vào trang giả: đổi mật khẩu ngay, bật 2FA, kiểm tra phiên đăng nhập, liên hệ ngân hàng, và báo cáo 1800.1566.
