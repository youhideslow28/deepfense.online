# Module 2 — Deepfake Audio
> **Thời lượng:** 35 phút &nbsp;|&nbsp; **Cấp độ:** Foundation

---

## 2.1 Voice cloning và TTS giả mạo

### Voice cloning là gì?

**Voice cloning (nhân bản giọng nói)** là công nghệ sử dụng AI để tái tạo giọng nói của một người cụ thể, bao gồm cả âm sắc, nhịp điệu và cách phát âm đặc trưng. Điều đáng lo ngại là các công cụ hiện đại chỉ cần từ 30 giây đến vài phút âm thanh làm mẫu — đủ để tạo ra một bản sao giọng nói có thể nói bất kỳ câu gì theo ý kẻ gian.

Các dịch vụ thương mại như ElevenLabs hay nhiều nền tảng tương tự đang ngày càng phổ biến và dễ tiếp cận. Mặc dù các nền tảng này có điều khoản sử dụng hợp lệ, công nghệ nền tảng tương tự đã bị khai thác để tạo ra nội dung lừa đảo bởi những kẻ xấu.

### TTS giả mạo là gì?

**TTS (Text-to-Speech — Chuyển văn bản thành giọng nói)** thế hệ mới không chỉ đọc chữ một cách máy móc nữa. Các mô hình AI hiện đại có thể tổng hợp giọng nói nghe gần như người thật, với ngữ điệu lên xuống, nhấn mạnh, và ngắt nghỉ tự nhiên. Kẻ gian có thể gõ bất kỳ nội dung nào — từ lệnh chuyển tiền đến yêu cầu cung cấp thông tin nhạy cảm — và hệ thống AI sẽ đọc bằng giọng của người mà chúng đã sao chép.

> ⚠️ **Lưu ý quan trọng:** Chỉ cần một đoạn video ngắn đăng trên Facebook, một clip phỏng vấn trên YouTube, hay thậm chí vài tin nhắn thoại trên Zalo cũng đã đủ để kẻ xấu tạo ra bản sao giọng nói của bạn — hoặc của sếp bạn, của bố mẹ bạn. Đây là lý do tại sao hạn chế đăng âm thanh cá nhân công khai cũng là một biện pháp bảo mật.

---

## 2.2 Dấu hiệu giọng nói AI

Dù công nghệ voice cloning ngày càng hoàn thiện, giọng nói tổng hợp bằng AI vẫn thường để lại một số dấu hiệu tinh tế mà tai người có thể nhận ra khi chú ý.

### Vấn đề về cảm xúc và ngữ điệu

- **Cảm xúc phẳng hoặc không phù hợp:** Giọng nói AI thường thiếu chiều sâu cảm xúc thực sự. Khi người thật nói về tình huống khẩn cấp — như bị tai nạn, đang bị giữ con tin, hoặc đang cần tiền gấp — giọng nói sẽ run rẩy, gấp gáp hoặc bất ổn một cách rất tự nhiên. Giọng AI tổng hợp thường nghe "quá bình tĩnh" so với tình huống được mô tả.
- **Ngữ điệu robot hoặc đều đều:** Ngay cả khi AI tái tạo đúng âm sắc, nhịp lên xuống của câu thường vẫn có chút cứng nhắc — như đọc theo kịch bản sẵn thay vì nói tự nhiên theo luồng suy nghĩ.
- **Thiếu tiếng ừ, à, ừm:** Người thật khi nói chuyện tự nhiên thường có những tiếng đệm, ngập ngừng, chỗ tìm từ. Giọng AI tổng hợp từ văn bản viết sẵn thường chạy trơn tru bất thường.

### Vấn đề về ngắt nghỉ và nhịp điệu

- **Ngắt nghỉ bất thường:** AI đôi khi ngắt sai chỗ — dừng lại giữa chừng một câu không có lý do ngữ pháp, hoặc không ngắt ở những chỗ người thật thường thở.
- **Tốc độ đều đặn quá mức:** Người thật thay đổi tốc độ nói theo cảm xúc và nội dung — nhanh lên khi hào hứng, chậm lại khi muốn nhấn mạnh. Giọng AI thường duy trì tốc độ gần như không đổi trong toàn bộ đoạn nói.

### Vấn đề về chất lượng âm thanh

- **Tiếng nền thiếu tự nhiên:** Cuộc gọi thật có tiếng ồn nền thay đổi theo môi trường — tiếng xe cộ, tiếng điều hòa, tiếng người xung quanh. Cuộc gọi lừa đảo bằng AI thường có tiếng nền quá sạch hoặc có tiếng ồn đều đặn một cách đáng ngờ.
- **Giọng nghe "trong" bất thường:** Một số hệ thống voice cloning tạo ra giọng nghe quá rõ, quá "studio" so với điều kiện cuộc gọi điện thoại thông thường.

> ⚠️ **Lưu ý quan trọng:** Trong tình huống căng thẳng — khi nghe giọng con mình nói bị tai nạn, hay giọng sếp yêu cầu chuyển tiền gấp — não người có xu hướng "tự điền" những gì còn thiếu và tin vào điều mình muốn tin. Đây chính là điểm yếu tâm lý mà kẻ lừa đảo khai thác.

---

## 2.3 Xác minh cuộc gọi nghi ngờ

### Các kịch bản lừa đảo phổ biến tại Việt Nam

Kẻ gian thường sử dụng voice cloning để thực hiện các kịch bản sau:

- **Giả mạo công an / cơ quan nhà nước:** Gọi điện thông báo bạn liên quan đến vụ án rửa tiền, tội phạm ma túy hoặc vi phạm pháp luật. Yêu cầu chuyển tiền vào tài khoản "tạm giữ" để phối hợp điều tra hoặc để chứng minh tài sản hợp pháp.
- **Giả mạo sếp / giám đốc:** Gọi điện (đôi khi kèm video deepfake qua Zalo) giả danh lãnh đạo cấp cao, yêu cầu nhân viên chuyển tiền khẩn cấp cho hợp đồng bí mật, không được báo cáo lên ai khác.
- **Giả mạo người thân gặp nạn:** Gọi điện với giọng con, em hoặc bố mẹ nói đang bị tai nạn, đang ở bệnh viện, hay đang bị giữ và cần tiền ngay lập tức. Kịch bản này đặc biệt hiệu quả vì khai thác bản năng bảo vệ người thân.

### Quy tắc vàng: Cúp máy và gọi lại

Đây là nguyên tắc quan trọng nhất bạn cần ghi nhớ và chia sẻ với cả gia đình:

> **Khi nhận bất kỳ cuộc gọi nào yêu cầu chuyển tiền hoặc cung cấp thông tin nhạy cảm — dù giọng nghe quen đến đâu — hãy cúp máy và chủ động gọi lại theo số điện thoại bạn đã lưu từ trước.**

Không gọi lại theo số vừa gọi đến. Không nhắn tin qua ứng dụng trong cùng cuộc trò chuyện đang diễn ra. Tìm số điện thoại của người đó từ danh bạ cá nhân của bạn, hoặc liên hệ qua kênh khác hoàn toàn.

### Câu hỏi thách thức và mã an toàn gia đình

Hãy thiết lập trước với gia đình và đồng nghiệp thân thiết một **câu hỏi thách thức (challenge question)** — đây là câu hỏi mà chỉ người thật mới biết câu trả lời, không phải thông tin có thể tìm thấy trên mạng xã hội:

- Ví dụ: "Kỷ niệm hè năm ngoái chúng mình đã đi đâu?" hay "Tên con mèo nhà mình là gì?"
- Tránh dùng ngày sinh, tên đệm hay thông tin có thể tra cứu công khai.

Tương tự, hãy đề xuất với gia đình một **mã an toàn (safe word)** — một từ hoặc cụm từ bí mật mà ai trong gia đình cũng biết. Nếu người gọi không nói được từ đó khi được hỏi, đó là dấu hiệu đỏ rõ ràng.

### Ngân hàng và chuyển tiền — không bao giờ chỉ dựa vào một cuộc gọi

- ✅ Các ngân hàng Việt Nam (Vietcombank, BIDV, Techcombank, VPBank...) **không bao giờ** gọi điện yêu cầu bạn cung cấp mã OTP, số tài khoản đầy đủ, hay yêu cầu chuyển tiền qua điện thoại.
- ✅ Công an **không bao giờ** yêu cầu chuyển tiền vào tài khoản cá nhân để "phục vụ điều tra".
- Nếu ai đó — dù giọng nghe như sếp, như bố, hay như con bạn — yêu cầu bạn chuyển tiền qua điện thoại mà không thể xác minh bằng kênh khác, hãy từ chối và kiểm tra lại.

> ⚠️ **Lưu ý quan trọng:** Kẻ lừa đảo cố tình tạo ra áp lực thời gian — "chuyển ngay bây giờ, không thì muộn", "đừng nói với ai, sẽ gây rắc rối". Sự khẩn cấp giả tạo đó chính là công cụ để chúng ngăn bạn dừng lại và suy nghĩ. Hãy nhớ: **bất kỳ yêu cầu nào đòi hỏi bạn hành động gấp mà không cho thời gian xác minh đều là dấu hiệu lừa đảo.**

---

## Tóm tắt

Sau khi hoàn thành Module 2, bạn đã nắm được:

- **Voice cloning** chỉ cần vài chục giây âm thanh mẫu để tạo ra bản sao giọng nói thuyết phục. Các video, clip ngắn và tin nhắn thoại đăng công khai đều có thể bị khai thác.
- Dấu hiệu nhận biết giọng nói AI gồm: **cảm xúc phẳng không phù hợp ngữ cảnh**, thiếu tiếng đệm tự nhiên, ngắt nghỉ sai chỗ, tốc độ đều đặn bất thường, và chất lượng âm thanh quá sạch.
- Ba kịch bản lừa đảo phổ biến tại Việt Nam: **giả mạo công an**, **giả mạo sếp/giám đốc**, và **giả mạo người thân gặp nạn**.
- **Quy tắc vàng:** Cúp máy và chủ động gọi lại theo số đã lưu sẵn — không gọi lại số vừa gọi đến.
- Thiết lập **câu hỏi thách thức** và **mã an toàn gia đình** để xác minh danh tính qua điện thoại.
- **Không bao giờ** chuyển tiền chỉ dựa trên một cuộc gọi điện thoại, dù giọng nghe quen đến đâu.

> ✅ Bài học tiếp theo: **Module 3**, nơi bạn sẽ tiếp tục xây dựng khả năng phòng thủ trước các mối đe dọa AI trong thực tế.
