# Module 1 — Deepfake Video
> **Thời lượng:** 40 phút &nbsp;|&nbsp; **Cấp độ:** Foundation

---

## 1.1 Deepfake là gì và hoạt động thế nào

**Deepfake** là thuật ngữ ghép từ "deep learning" (học sâu) và "fake" (giả mạo), dùng để chỉ các video, hình ảnh hoặc âm thanh bị tạo ra hoặc chỉnh sửa bằng trí tuệ nhân tạo nhằm mục đích lừa đảo hoặc tuyên truyền sai lệch.

### Công nghệ đứng sau deepfake

Có hai hướng công nghệ chính đang được sử dụng phổ biến:

- **GAN (Generative Adversarial Network — Mạng đối kháng sinh tạo):** Hai mô hình AI "thi đấu" với nhau — một mô hình tạo ra hình ảnh giả, mô hình kia cố phát hiện ra sự giả mạo. Qua nhiều vòng lặp, hình ảnh giả ngày càng tinh vi hơn, đủ để đánh lừa mắt người thường.

- **Diffusion Model (Mô hình khuếch tán):** Kỹ thuật mới hơn, hoạt động bằng cách "thêm nhiễu" vào ảnh thật rồi học cách khôi phục từ đó. Kết quả là các hình ảnh cực kỳ chân thực. Đây là nền tảng của nhiều công cụ tạo ảnh AI phổ biến hiện nay.

Trong thực tế, kẻ gian thường dùng kỹ thuật **face swap (hoán đổi khuôn mặt)** — tức là ghép khuôn mặt của một người (thường là lãnh đạo doanh nghiệp hoặc người nổi tiếng) lên thân hình của người khác trong video. Chỉ cần vài chục tấm ảnh thu thập từ mạng xã hội là AI đã có đủ dữ liệu để tạo ra một video giả mạo thuyết phục.

> ⚠️ **Lưu ý quan trọng:** Tại Việt Nam, các vụ lừa đảo dùng deepfake đã xảy ra trong thực tế — từ việc giả mạo gương mặt giám đốc công ty trong cuộc gọi video để chỉ đạo nhân viên chuyển tiền, đến các video quảng cáo giả mạo người nổi tiếng để bán sản phẩm kém chất lượng hoặc kêu gọi đầu tư tài chính lừa đảo. Đây không còn là mối đe dọa trên lý thuyết.

---

## 1.2 Dấu hiệu nhận biết video giả

Dù công nghệ ngày càng tinh vi, video deepfake vẫn thường để lại các dấu hiệu có thể nhận biết nếu bạn biết cách quan sát cẩn thận.

### Vấn đề về mắt và khuôn mặt

- **Nháy mắt bất thường:** Các mô hình AI đời đầu gặp khó khăn trong việc tái tạo chuyển động chớp mắt tự nhiên. Video giả có thể không có cảnh nháy mắt, hoặc nháy mắt quá nhanh, quá chậm, hay không đồng đều giữa hai mắt.
- **Ranh giới khuôn mặt mờ hoặc nhòe:** Quan sát kỹ vùng tiếp giáp giữa khuôn mặt và tóc, tai, hoặc cổ. Video deepfake thường có đường viền khuôn mặt bị mờ, nhòe, hoặc "lung linh" — đặc biệt khi nhân vật quay đầu sang ngang.
- **Biểu cảm khuôn mặt thiếu tự nhiên:** Các cảm xúc phức tạp như lo lắng, hài hước hay bất ngờ thường không được tái tạo tốt. Nụ cười có thể trông cứng nhắc, và đặc biệt, mắt không "cười" cùng với miệng.

### Ánh sáng và màu sắc

- **Ánh sáng không nhất quán:** Khuôn mặt được ghép vào có thể bị chiếu sáng theo hướng khác so với phần còn lại của khung hình — ví dụ, nguồn sáng trên mặt đến từ bên trái trong khi bóng đổ của cơ thể lại cho thấy nguồn sáng ở bên phải.
- **Màu da không khớp:** Màu sắc da ở vùng mặt trông khác biệt rõ rệt so với cổ, tai và tay — đây là dấu hiệu điển hình của kỹ thuật face swap thực hiện chưa hoàn chỉnh.

### Hiện tượng nhấp nháy theo thời gian

**Temporal flickering (nhấp nháy theo thời gian)** là hiện tượng các chi tiết nhỏ trên khuôn mặt — như nếp nhăn, lông mày, hoặc kết cấu da — thay đổi hoặc biến mất đột ngột giữa các khung hình liên tiếp. Mắt thường khó nhận ra khi xem video ở tốc độ bình thường, nhưng nếu xem ở tốc độ 0.5x hoặc tua từng khung hình, hiện tượng này trở nên rõ ràng hơn nhiều.

### Không đồng bộ âm thanh và hình ảnh

- Môi chuyển động không khớp với tiếng nói, đặc biệt ở các phụ âm như "b", "p", "m" — những âm đòi hỏi chuyển động môi rõ ràng và dễ đối chiếu.
- Giọng nói có thể có chất lượng âm thanh hoặc âm lượng khác biệt so với tiếng ồn nền xung quanh trong video.
- ✅ Mẹo nhanh: Thử tắt âm thanh và chỉ xem hình — bạn có cảm thấy cử động miệng trông giả tạo không?

> **Lưu ý quan trọng:** Không một dấu hiệu đơn lẻ nào là bằng chứng tuyệt đối. Hãy xem xét tổng thể nhiều dấu hiệu cùng lúc và luôn dùng công cụ kiểm chứng để xác nhận trước khi kết luận.

---

## 1.3 Công cụ và quy trình kiểm chứng

### Các công cụ miễn phí bạn có thể dùng ngay

- **InVID / WeVerify (plugin trình duyệt):** Đây là bộ công cụ kiểm chứng video mạnh nhất dành cho người dùng thông thường. Cho phép trích xuất khung hình từ video, tìm kiếm ngược hình ảnh trên nhiều nền tảng cùng lúc, và xem metadata của tệp video. Cài đặt miễn phí cho Chrome và Firefox tại `invid-verify.appspot.com`.

- **FotoForensics:** Trang web phân tích hình ảnh dựa trên kỹ thuật **ELA (Error Level Analysis — Phân tích mức lỗi)**. Kỹ thuật này phát hiện các vùng trong ảnh đã bị chỉnh sửa bằng cách so sánh mức độ nén JPEG không đồng đều. Các vùng được chỉnh sửa sẽ hiện lên sáng hơn hoặc khác biệt so với phần còn lại. Truy cập tại `fotoforensics.com`.

- **Tìm kiếm ảnh ngược (Reverse Image Search):**
  - **Google Images:** Kéo thả ảnh hoặc dán URL ảnh vào ô tìm kiếm hình ảnh của Google để tìm xem ảnh đó đã xuất hiện ở đâu trên internet và lần đầu tiên được đăng từ khi nào.
  - **TinEye:** Chuyên tìm kiếm nguồn gốc hình ảnh với cơ sở dữ liệu riêng, cho biết thời điểm và nơi ảnh xuất hiện sớm nhất — rất hữu ích để phát hiện ảnh cũ bị tái sử dụng trong ngữ cảnh sai lệch.

### Quy trình kiểm chứng từng bước

Khi nhận được một video đáng ngờ — dù qua Zalo, Facebook hay Telegram — hãy làm theo quy trình sau:

1. **Dừng lại trước khi chia sẻ.** Cảm giác muốn chia sẻ ngay lập tức thường là dấu hiệu cho thấy nội dung đang cố tình thao túng cảm xúc của bạn — gây sốc, tức giận, hay lo lắng.

2. **Xác định nguồn gốc.** Video này được đăng đầu tiên ở đâu? Kênh hoặc tài khoản đó có uy tín không? Tài khoản đó được tạo từ bao giờ, có bao nhiêu người theo dõi?

3. **Trích xuất khung hình và tìm kiếm ngược.** Dùng InVID để trích xuất khung hình tại thời điểm quan trọng trong video, sau đó tìm kiếm ngược trên Google Images hoặc TinEye để xem hình ảnh đó đã từng xuất hiện ở đâu chưa.

4. **Quan sát kỹ các dấu hiệu kỹ thuật** đã nêu ở phần 1.2 — đặc biệt là ranh giới khuôn mặt, đồng bộ môi và tiếng, và sự nhất quán của ánh sáng.

5. **Tìm kiếm bằng chứng độc lập.** Nội dung trong video có được xác nhận bởi các nguồn tin đáng tin cậy không — như báo VnExpress, Tuổi Trẻ, Thanh Niên, hay trang web chính thức của cơ quan nhà nước?

6. **Khi còn nghi ngờ, không chia sẻ.** Nếu bạn chưa thể xác nhận tính xác thực, tốt nhất là không phát tán thêm. Chia sẻ thông tin sai lệch vô tình cũng gây hại thực sự.

> ⚠️ **Lưu ý quan trọng:** Khả năng nhận diện deepfake bằng mắt thường ngày càng khó hơn khi công nghệ phát triển. Thói quen kiểm chứng nguồn gốc và sử dụng công cụ hỗ trợ quan trọng hơn nhiều so với việc cố nhìn cho ra "điểm giả" bằng trực giác.

---

## Tóm tắt

Sau khi hoàn thành Module 1, bạn đã nắm được:

- **Deepfake** được tạo ra bằng công nghệ AI (GAN và diffusion model), có thể hoán đổi khuôn mặt và tạo video giả mạo thuyết phục chỉ từ vài chục tấm ảnh thu thập công khai trên mạng xã hội.
- Các **dấu hiệu nhận biết** cần chú ý: chớp mắt bất thường, ranh giới khuôn mặt mờ nhòe, ánh sáng không nhất quán, temporal flickering giữa các khung hình, và môi không đồng bộ với tiếng nói.
- Bộ công cụ kiểm chứng gồm: **InVID/WeVerify** (phân tích video), **FotoForensics** (phân tích ảnh qua ELA), và **tìm kiếm ảnh ngược** qua Google Images hoặc TinEye.
- **Quy trình 6 bước:** Dừng lại — Xác định nguồn — Tìm kiếm ngược — Kiểm tra kỹ thuật — Tìm bằng chứng độc lập — Không chia sẻ khi còn nghi ngờ.

> ✅ Bài học tiếp theo: **Module 2 — Deepfake Audio**, nơi bạn sẽ học cách nhận diện giọng nói AI tổng hợp và bảo vệ bản thân trước các cuộc gọi lừa đảo giả mạo công an, sếp, hoặc người thân đang gặp khó khăn.
