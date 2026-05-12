# DEEPFENSE BASICS - Giáo án hoàn chỉnh

## 0. Tổng quan khóa học

### Tên khóa học

`DEEPFENSE BASICS`

### Chứng chỉ sau khi hoàn thành

`DEEPFENSE AWARE`

### Đối tượng học viên

Khóa học dành cho người mới bắt đầu, học sinh/sinh viên, nhân viên văn phòng, người dùng mạng xã hội, người làm truyền thông, giáo viên, phụ huynh và bất kỳ ai muốn hiểu deepfake ở mức nền tảng.

Khóa học không yêu cầu học viên biết lập trình, machine learning, cybersecurity hoặc pháp chứng số trước đó. Các khái niệm chuyên môn sẽ được giải thích bằng tiếng Việt trước, sau đó ghi kèm thuật ngữ tiếng Anh khi cần.

### Ngôn ngữ và học liệu

- Ngôn ngữ chính: tiếng Việt.
- Video bài giảng: tiếng Việt.
- Phụ đề video: tiếng Anh.
- Thuật ngữ đặc biệt giữ tiếng Anh khi cần, ví dụ: `deepfake`, `synthetic media`, `generative AI`, `metadata`, `social engineering`, `incident response`, `chain of custody`.

### Mục tiêu tổng quát

Sau khi hoàn thành khóa học, học viên có thể:

1. Hiểu deepfake là gì và vì sao deepfake trở thành rủi ro trong xã hội số.
2. Nhận biết các dạng deepfake phổ biến ở mức cơ bản.
3. Phân tích tác động của deepfake với cá nhân, tổ chức và xã hội.
4. Nhận diện một số dấu hiệu nghi ngờ trong hình ảnh, video, âm thanh và bối cảnh.
5. Biết cách kiểm chứng thông tin trước khi tin hoặc chia sẻ.
6. Biết cách phòng ngừa, lưu bằng chứng và báo cáo khi gặp nội dung nghi ngờ.
7. Hình thành tư duy an toàn thông tin phù hợp với hướng Network Security, SOC và GRC ở mức nhập môn.

### Cấu trúc khóa học

Khóa học gồm 3 phần lớn, 9 module:

#### Phần I - Nền tảng

- Module 1: Deepfake là gì?
- Module 2: Deepfake tác động như thế nào?
- Module 3: Rủi ro, đạo đức và niềm tin số

#### Phần II - Nhận diện

- Module 4: Nhận diện dấu hiệu hình ảnh và video
- Module 5: Nhận diện giọng nói và âm thanh giả mạo
- Module 6: Kiểm chứng bối cảnh, nguồn tin và metadata cơ bản

#### Phần III - Phòng ngừa và ứng phó

- Module 7: Phòng ngừa deepfake cho cá nhân
- Module 8: Ứng phó khi gặp hoặc trở thành nạn nhân của deepfake
- Module 9: Deepfake trong tổ chức: góc nhìn SOC, GRC và security awareness

### Cấu trúc đánh giá

- Đầu khóa: bài đánh giá năng lực đầu vào 10 câu, không dùng để đánh rớt.
- Cuối mỗi mục lớn trong module, ví dụ `1.1`, `1.2`, `1.3`: 3 câu trắc nghiệm nắm key.
- Cuối mỗi module: quiz 10-15 câu.
- Sau mỗi 3 module: bài kiểm tra trung bình 20-30 câu.
- Cuối khóa: bài kiểm tra lớn 50 câu.
- Final exam có 3 đề thay phiên/random từ ngân hàng 150 câu.
- Câu hỏi nhỏ sau mục lớn không cần random.
- Quiz cuối module giữ nguyên ngân hàng câu hỏi nhưng random thứ tự câu hỏi và đáp án.

### Quy tắc final exam

Nếu học viên không đạt final exam:

- Lần 1: khóa 1 giờ.
- Lần 2: khóa 24 giờ.
- Lần 3: khóa 3 ngày.
- Lần 4: khóa 1 tuần.
- Sau mức 1 tuần, hệ thống reset chu kỳ, không khóa vĩnh viễn.

### Anti-cheat

Các cơ chế đề xuất:

- Chống copy văn bản trong quiz/final exam.
- Ghi nhận chuyển tab trong lúc làm bài.
- Random thứ tự câu hỏi và đáp án ở quiz module/final.
- Ghi nhận thời gian bắt đầu, thời gian nộp bài, số lần rời tab.
- Không dùng anti-cheat như công cụ trừng phạt quá nặng; mục tiêu chính là khuyến khích học thật.

### Gợi ý trải nghiệm giao diện

Giao diện nên lấy cảm hứng từ cấu trúc học của Cisco/CCNA: có scenario, module roadmap, bài kiểm tra, tiến độ, certificate. Tuy nhiên giao diện nên hiện đại hơn, gọn hơn, ít rối hơn, tập trung vào học viên phổ thông.

Mỗi lesson nên có:

- Kịch bản hoặc câu hỏi dẫn nhập.
- Video tiếng Việt, phụ đề tiếng Anh.
- Ảnh hoặc infographic.
- Nội dung text rõ ràng.
- Khung “Điểm cần nhớ”.
- Hoạt động tương tác nhẹ.
- Checkpoint hoặc quiz ở đúng cấp học.

---

## 1. Mở đầu khóa học

### 1.1 Bài đánh giá năng lực đầu vào

#### Mục đích

Bài đánh giá đầu vào giúp hệ thống biết học viên đang hiểu deepfake ở mức nào. Bài này không dùng để đánh rớt, không khóa tài khoản và không ảnh hưởng đến chứng chỉ. Kết quả chỉ dùng để gợi ý lộ trình học.

#### Số câu

10 câu trắc nghiệm.

#### Nội dung cần bao phủ

- Deepfake là gì.
- AI có liên quan gì đến deepfake.
- Deepfake có thể xuất hiện ở video, ảnh, âm thanh.
- Dấu hiệu nghi ngờ cơ bản.
- Thói quen kiểm chứng thông tin.
- Cách phản ứng khi thấy nội dung gây sốc.

#### Kết quả gợi ý

- 0-4 câu đúng: Beginner - nên học kỹ từng mục.
- 5-7 câu đúng: Aware - đã có nhận thức cơ bản.
- 8-10 câu đúng: Ready - có nền tảng tốt, vẫn nên học để hệ thống hóa kiến thức.

### 1.2 Màn cảm ơn đăng ký

#### Nội dung hiển thị

Cảm ơn bạn đã đăng ký `DEEPFENSE BASICS`.

Khóa học này sẽ giúp bạn hiểu deepfake là gì, deepfake có thể ảnh hưởng đến cá nhân và xã hội như thế nào, cách nhận biết dấu hiệu đáng nghi và cách phản ứng an toàn khi gặp nội dung giả mạo.

Sau khi hoàn thành khóa học và vượt qua bài kiểm tra cuối khóa, bạn sẽ nhận chứng chỉ `DEEPFENSE AWARE` và phần thưởng học tập bằng `DPF` theo chính sách của nền tảng.

#### Gợi ý UI

- Hiển thị lộ trình 3 phần lớn.
- Hiển thị chứng chỉ mục tiêu.
- Hiển thị điểm tiến độ ban đầu.
- Nút bắt đầu Module 1.

---

# Phần I - Nền tảng

## Module 1: Deepfake là gì?

### Mục tiêu Module 1

Sau khi hoàn thành Module 1, học viên có thể:

- Giải thích deepfake là gì bằng ngôn ngữ phổ thông nhưng đúng bản chất.
- Phân biệt deepfake với chỉnh sửa ảnh/video thông thường.
- Hiểu vai trò cơ bản của `generative AI` và `machine learning`.
- Gọi tên các dạng deepfake phổ biến.
- Nhận ra vì sao deepfake là vấn đề an toàn thông tin và niềm tin số.

### Kịch bản mở đầu Module 1

Bạn thấy một video người nổi tiếng phát ngôn gây sốc. Video được chia sẻ hàng nghìn lần, bình luận rất căng thẳng, nhiều người đã tin đó là thật. Trước khi chia sẻ, bạn cần tự hỏi: video này có chắc là thật không, nguồn đầu tiên là ai, có nguồn độc lập xác nhận không, và nếu đây là deepfake thì hậu quả sẽ là gì?

### 1.1 Giới thiệu và định nghĩa

#### 1.1.1 Giới thiệu vấn đề deepfake

Deepfake trở thành vấn đề vì AI tạo sinh ngày càng dễ tiếp cận. Trước đây, việc tạo nội dung giả chất lượng cao thường cần kỹ năng chỉnh sửa chuyên nghiệp. Hiện nay, nhiều công cụ AI có thể hỗ trợ tạo ảnh, video và âm thanh giống thật nhanh hơn.

Điều nguy hiểm không chỉ nằm ở việc nội dung “giống thật”, mà nằm ở khả năng khiến người xem tin rằng một người đã nói hoặc làm điều họ chưa từng làm. Khi nội dung giả được đặt vào đúng bối cảnh xã hội, đúng thời điểm và đánh trúng cảm xúc, nó có thể lan truyền rất nhanh.

Ví dụ phổ thông:

- Một video giả mạo người nổi tiếng phát ngôn gây tranh cãi.
- Một đoạn ghi âm giả giọng người thân để yêu cầu chuyển tiền.
- Một cuộc gọi video giả mạo cấp trên trong công ty.
- Một hình ảnh bị ghép mặt để bôi nhọ danh dự cá nhân.

Học liệu:

- Video: `module-1/1-1-1-deepfake-problem.vi.mp4`
- Phụ đề: `module-1/1-1-1-deepfake-problem.en.vtt`
- Ảnh: sơ đồ một video viral lan truyền qua mạng xã hội.
- Hoạt động: học viên chọn nên “tin ngay”, “chia sẻ”, “kiểm chứng” hay “báo cáo”.

Điểm cần nhớ:

- Deepfake không chỉ là trò công nghệ.
- Deepfake là rủi ro về thông tin, danh tính và niềm tin.
- Người học cần hình thành thói quen nghi ngờ hợp lý.

#### 1.1.2 Định nghĩa deepfake

Định nghĩa ngắn gọn: Deepfake là nội dung hình ảnh, video hoặc âm thanh được tạo, biến đổi hoặc tổng hợp bằng AI để khiến người xem hoặc người nghe tin rằng một người đã nói hoặc làm điều nào đó.

Định nghĩa học thuật mở rộng: Deepfake là một dạng `synthetic media` sử dụng các kỹ thuật `machine learning` hoặc `deep learning` để mô phỏng danh tính, khuôn mặt, giọng nói, biểu cảm, chuyển động hoặc hành vi của một cá nhân trong một ngữ cảnh cụ thể.

Phân tích định nghĩa:

- Nội dung: ảnh, video, âm thanh, livestream, avatar.
- Tạo/biến đổi/tổng hợp: có thể là nội dung giả hoàn toàn hoặc nội dung thật bị chỉnh sửa một phần.
- AI: công nghệ học đặc điểm khuôn mặt, giọng nói, biểu cảm, hành vi.
- Danh tính: người bị mô phỏng hoặc bị gán lời nói/hành động.
- Ngữ cảnh: cùng một nội dung có thể ít nguy hiểm hoặc rất nguy hiểm tùy hoàn cảnh.

Phân biệt nhanh:

| Khái niệm | Mô tả | Có phải deepfake không? |
| --- | --- | --- |
| Chỉnh màu ảnh | Thay đổi ánh sáng, màu sắc | Không |
| Filter làm đẹp | Làm mịn da, thêm hiệu ứng | Thường không |
| Cắt ghép thủ công | Ghép ảnh/video bằng phần mềm | Có thể giả mạo, nhưng không nhất thiết là deepfake |
| Synthetic media | Nội dung tổng hợp bằng công nghệ số/AI | Nhóm rộng hơn |
| Deepfake | Mô phỏng hoặc gia mạo danh tính bằng AI | Có |

Học liệu:

- Video: `module-1/1-1-2-definition.vi.mp4`
- Phụ đề: `module-1/1-1-2-definition.en.vtt`
- Ảnh: bảng so sánh chỉnh sửa thường, synthetic media và deepfake.
- Glossary: `synthetic media`, `identity manipulation`, `generative AI`.

#### 1.1.3 Deepfake và AI tạo sinh

`Generative AI` là nhóm công nghệ có thể tạo nội dung mới dựa trên dữ liệu đã học. Với deepfake, dữ liệu có thể là ảnh khuôn mặt, video chuyển động, mẫu giọng nói hoặc biểu cảm của một người.

AI có thể học các mẫu như:

- Hình dạng khuôn mặt.
- Cách miệng chuyển động khi nói.
- Hướng mắt và biểu cảm.
- Âm sắc và nhịp điệu giọng nói.
- Ánh sáng, bóng đổ và bối cảnh.

Tuy vậy, AI không “hiểu” con người như con người hiểu nhau. Vì vậy nội dung tạo ra có thể có lỗi: ánh sáng lệch, môi không khớp âm thanh, da quá mịn, mắt thiếu tự nhiên, âm thanh thiếu cảm xúc hoặc nhịp nói kỳ lạ.

Giới hạn an toàn của khóa học:

- Không hướng dẫn tạo deepfake.
- Không hướng dẫn dùng công cụ tạo deepfake.
- Không hướng dẫn vượt hệ thống phát hiện.
- Chỉ giải thích để học viên hiểu rủi ro và biết phòng vệ.

Học liệu:

- Video: `module-1/1-1-3-generative-ai.vi.mp4`
- Phụ đề: `module-1/1-1-3-generative-ai.en.vtt`
- Infographic: dữ liệu mẫu -> mô hình AI -> nội dung tổng hợp -> kiểm chứng.

#### 1.1.4 Các dạng deepfake phổ biến

Các dạng cơ bản:

1. `Face Swap`: hoán đổi khuôn mặt người này sang người khác.
2. `Face Reenactment`: điều khiển biểu cảm, miệng, hướng mặt.
3. `Voice Deepfake`: giả lập hoặc tổng hợp giọng nói.
4. `Full-body/Avatar Deepfake`: mô phỏng cử chỉ, dáng đi, avatar.
5. `AI-generated Video`: tạo video mới từ mô tả hoặc dữ liệu đầu vào.

Mỗi dạng có rủi ro khác nhau. Face Swap thường ảnh hưởng đến hình ảnh cá nhân. Voice Deepfake thường dùng trong lừa đảo qua cuộc gọi. AI-generated Video có thể tạo cảnh hoặc sự kiện chưa từng xảy ra.

Học liệu:

- Video: `module-1/1-1-4-types.vi.mp4`
- Phụ đề: `module-1/1-1-4-types.en.vtt`
- Ảnh: bảng minh họa các dạng deepfake.
- Audio: ví dụ giọng tổng hợp hợp pháp, không dùng giọng người thật nếu chưa có quyền.

#### 1.1.5 Phạm vi của khóa Basics

`DEEPFENSE BASICS` tập trung vào nhận thức, nhận diện cơ bản, phòng ngừa và ứng phó. Khóa này không biến học viên thành chuyên gia pháp chứng hoặc kỹ sư AI ngay lập tức.

Khóa này dạy:

- Hiểu deepfake.
- Nhận biết rủi ro cơ bản.
- Nhận diện dấu hiệu đáng nghi.
- Phòng ngừa và ứng phó ban đầu.
- Xây dựng thói quen kiểm chứng thông tin.

Khóa này không dạy:

- Tạo deepfake.
- Huấn luyện mô hình AI.
- Tấn công detector.
- Điều tra pháp chứng chuyên sâu.

Checkpoint cuối 1.1 - 3 câu:

1. Deepfake khác chỉnh sửa ảnh/video thông thường chủ yếu ở điểm nào?
   - A. Deepfake thường dùng AI để mô phỏng hoặc gia mạo danh tính.
   - B. Deepfake chỉ là ảnh có màu đẹp hơn.
   - C. Deepfake luôn làm file nặng hơn.
   - D. Deepfake chỉ xuất hiện trong phim.
   - Đáp án: A

2. Mục tiêu chính của `DEEPFENSE BASICS` là gì?
   - A. Dạy cách tạo deepfake.
   - B. Giúp người học hiểu, nhận biết và phòng ngừa deepfake ở mức cơ bản.
   - C. Dạy cách vượt qua hệ thống phát hiện.
   - D. Dạy lập trình AI nâng cao.
   - Đáp án: B

3. Dạng nào sau đây là ví dụ của voice deepfake?
   - A. Tăng độ sáng một bức ảnh.
   - B. Giả lập giọng nói của một người để yêu cầu chuyển tiền.
   - C. Thêm phụ đề vào video.
   - D. Cắt bỏ đoạn im lặng trong file âm thanh.
   - Đáp án: B

### 1.2 Tác động của deepfake

#### 1.2.1 Tác động đến niềm tin số

Niềm tin số là cách con người tin vào nội dung, danh tính và thông tin trong môi trường trực tuyến. Deepfake làm suy yếu niềm tin số vì nó khiến người dùng khó phân biệt giữa nội dung thật và giả.

Hai rủi ro trái ngược có thể xảy ra:

- Người dùng tin nhầm nội dung giả là thật.
- Người dùng phủ nhận nội dung thật bằng cách nói “có thể đó là deepfake”.

Hiện tượng thứ hai nguy hiểm vì bằng chứng thật cũng có thể bị nghi ngờ, dẫn đến khủng hoảng niềm tin.

#### 1.2.2 Tác động đến cá nhân

Với cá nhân, deepfake có thể gây tổn hại danh dự, quyền riêng tư, tâm lý và an toàn. Một người có thể bị gán vào nội dung họ không tạo ra hoặc bị giả giọng để lừa người thân.

Tác động:

- Bôi nhọ danh tiếng.
- Xâm phạm quyền riêng tư.
- Quấy rối, bắt nạt, đe dọa.
- Lừa đảo bạn bè hoặc người thân.
- Gây áp lực tâm lý cho nạn nhân.

#### 1.2.3 Tác động đến tổ chức

Trong doanh nghiệp, deepfake có thể trở thành công cụ `social engineering`. Kẻ tấn công có thể giả giọng lãnh đạo, tạo video yêu cầu chuyển tiền hoặc giả mạo thông báo nội bộ.

Rủi ro:

- Lừa đảo tài chính.
- Giả mạo CEO hoặc quản lý.
- Khủng hoảng truyền thông.
- Mất niềm tin khách hàng.
- Tăng chi phí điều tra và khôi phục uy tín.

Liên hệ cybersecurity:

- SOC cần xem deepfake như một tín hiệu trong chuỗi tấn công.
- GRC cần chính sách xác minh danh tính và phê duyệt giao dịch.
- Network Security liên quan đến log, email, nguồn gửi, tài khoản bị chiếm quyền và bằng chứng số.

#### 1.2.4 Tác động đến xã hội

Ở cấp độ xã hội, deepfake có thể làm nhiễu loạn thông tin, thao túng dư luận và làm suy giảm niềm tin vào truyền thông. Nội dung giả thường lan nhanh khi nó gây sốc, kích động cảm xúc hoặc liên quan đến nhân vật có ảnh hưởng.

Tác động:

- Tin giả và thông tin sai lệch.
- Thao túng chính trị hoặc xã hội.
- Kích động xung đột.
- Làm giảm niềm tin vào báo chí và bằng chứng số.
- Gây khủng hoảng nhận thức: người dân không biết tin vào đâu.

#### 1.2.5 Case studies an toàn

Mỗi case deepfake nên được phân tích bằng các câu hỏi:

- Nội dung gì bị giả mạo?
- Ai là nạn nhân?
- Mục tiêu của người tạo/phát tán là gì?
- Dấu hiệu nghi ngờ ban đầu là gì?
- Hậu quả có thể xảy ra?
- Người xem nên phản ứng thế nào?

Không nên trình bày case theo hướng hướng dẫn tạo hoặc khai thác deepfake.

Checkpoint cuối 1.2 - 3 câu:

1. Deepfake có thể làm suy yếu niềm tin số vì sao?
   - A. Nó làm người dùng khó phân biệt nội dung thật và giả.
   - B. Nó luôn làm máy tính mất mạng.
   - C. Nó chỉ thay đổi màu sắc video.
   - D. Nó chỉ ảnh hưởng đến trò chơi.
   - Đáp án: A

2. Trong doanh nghiệp, deepfake có thể được dùng trong kiểu tấn công nào?
   - A. Social engineering.
   - B. Tăng tốc ổ cứng.
   - C. Nén dữ liệu.
   - D. Cài đặt trình duyệt.
   - Đáp án: A

3. Khi phân tích case deepfake, yếu tố nào quan trọng?
   - A. Nạn nhân, mục tiêu, bối cảnh, dấu hiệu nghi ngờ và hậu quả.
   - B. Chỉ số lượt thích.
   - C. Màu nền video.
   - D. Tên file dài hay ngắn.
   - Đáp án: A

### 1.3 Rủi ro và tư duy phòng vệ ban đầu

#### 1.3.1 Rủi ro cá nhân

Rủi ro cá nhân xảy ra khi deepfake tác động trực tiếp đến danh tính, danh dự, quan hệ, công việc hoặc tâm lý của một người.

Ví dụ:

- Mạo danh để lừa người thân.
- Ghép mặt vào nội dung xúc phạm.
- Giả giọng để yêu cầu tiền.
- Làm mất uy tín trong trường học hoặc nơi làm việc.

#### 1.3.2 Rủi ro tổ chức

Tổ chức có thể bị tấn công bằng deepfake qua email, chat, cuộc gọi, họp trực tuyến hoặc mạng xã hội. Rủi ro tăng khi nhân viên tin vào danh tính người gửi mà không xác minh.

Ví dụ:

- Giả giọng CEO yêu cầu chuyển tiền.
- Video giả đại diện công ty phát ngôn sai.
- Tin nhắn thoại giả yêu cầu gửi tài liệu nhạy cảm.
- Deepfake kết hợp phishing.

#### 1.3.3 Rủi ro xã hội và thông tin

Deepfake có thể làm xã hội khó phân biệt thật giả, đặc biệt khi nội dung liên quan đến chính trị, thảm họa, người nổi tiếng hoặc sự kiện nhạy cảm.

Rủi ro:

- Gây hoang mang.
- Kích động cảm xúc.
- Tạo tin giả có vẻ đáng tin.
- Làm giảm niềm tin vào bằng chứng thật.

#### 1.3.4 Rủi ro pháp lý và đạo đức

Deepfake liên quan đến quyền riêng tư, danh dự, sự đồng ý, bản quyền, trách nhiệm nền tảng và trách nhiệm người phát tán.

Nguyên tắc đạo đức:

- Không tạo hoặc phát tán nội dung giả mạo người khác khi chưa có sự đồng ý.
- Không chia sẻ nội dung nghi ngờ chỉ vì tò mò.
- Tôn trọng nạn nhân.
- Ưu tiên kiểm chứng và báo cáo.

#### 1.3.5 Nguyên tắc ứng phó ban đầu

Quy tắc 5 bước:

1. Dừng lại: không chia sẻ vội.
2. Kiểm chứng: kiểm tra nguồn và nguồn xác nhận độc lập.
3. Quan sát: tìm dấu hiệu bất thường ở hình ảnh, âm thanh, bối cảnh.
4. Lưu bằng chứng: link, ảnh chụp, thời gian, tài khoản đăng.
5. Báo cáo: nền tảng, người bị ảnh hưởng, tổ chức/cơ quan phù hợp.

Checkpoint cuối 1.3 - 3 câu:

1. Khi gặp video nghi ngờ là deepfake, bước đầu tiên nên làm gì?
   - A. Dừng lại và chưa chia sẻ vội.
   - B. Chia sẻ ngay.
   - C. Xóa trình duyệt.
   - D. Kết luận ngay là giả.
   - Đáp án: A

2. Vì sao cần lưu bằng chứng khi bị deepfake tấn công?
   - A. Để hỗ trợ báo cáo, xác minh và xử lý sau này.
   - B. Để chỉnh sửa lại video.
   - C. Để tăng lượt xem.
   - D. Để tránh phải kiểm chứng.
   - Đáp án: A

3. Hành động nào phù hợp với nguyên tắc đạo đức?
   - A. Không phát tán nội dung nghi ngờ và tôn trọng nạn nhân.
   - B. Chia sẻ vì tò mò.
   - C. Gắn thẻ thêm nhiều người.
   - D. Tải lại lên nền tảng khác.
   - Đáp án: A

### Quiz cuối Module 1 - 10 câu

1. Deepfake là gì?
   - A. Nội dung hình ảnh, video hoặc âm thanh được tạo/biến đổi bằng AI để mô phỏng hoặc gia mạo người/sự kiện.
   - B. Một loại tường lửa mạng.
   - C. Một cách tăng độ phân giải video.
   - D. Một định dạng file âm thanh.
   - Đáp án: A

2. Vì sao deepfake có thể gây nguy hiểm?
   - A. Vì nó có thể làm sai lệch niềm tin, danh tính, uy tín và quyết định.
   - B. Vì nó luôn làm hỏng thiết bị.
   - C. Vì nó chỉ làm video nặng hơn.
   - D. Vì nó chỉ xuất hiện trong game.
   - Đáp án: A

3. Dạng nào sau đây là Face Swap?
   - A. Thay khuôn mặt người này bằng khuôn mặt người khác trong ảnh/video.
   - B. Tăng âm lượng video.
   - C. Thêm nhạc nền vào video.
   - D. Cắt bỏ đoạn thừa.
   - Đáp án: A

4. Voice deepfake thường liên quan đến điều gì?
   - A. Giả lập hoặc tổng hợp giọng nói của một người.
   - B. Tạo mật khẩu mạnh.
   - C. Tăng tốc mạng.
   - D. Xóa lịch sử trình duyệt.
   - Đáp án: A

5. Deepfake khác filter làm đẹp ở điểm nào?
   - A. Deepfake thường liên quan đến gia mạo hoặc mô phỏng danh tính bằng AI.
   - B. Filter làm đẹp luôn là tội phạm.
   - C. Deepfake chỉ đổi màu ảnh.
   - D. Không có điểm khác nhau.
   - Đáp án: A

6. Khi thấy video gây sốc đang lan truyền, hành động phù hợp nhất là gì?
   - A. Kiểm chứng nguồn và bối cảnh trước khi tin hoặc chia sẻ.
   - B. Chia sẻ ngay vì nhiều người đang nói về nó.
   - C. Bình luận kết luận ngay.
   - D. Tải lại video lên trang khác.
   - Đáp án: A

7. Deepfake có thể ảnh hưởng đến doanh nghiệp bằng cách nào?
   - A. Giả mạo lãnh đạo để lừa chuyển tiền hoặc yêu cầu thông tin nhạy cảm.
   - B. Tự động tăng doanh thu.
   - C. Làm website đẹp hơn.
   - D. Tăng tốc độ mạng nội bộ.
   - Đáp án: A

8. Một tác động xã hội của deepfake là gì?
   - A. Làm suy giảm niềm tin vào thông tin và bằng chứng số.
   - B. Làm mọi tin tức chính xác hơn.
   - C. Loại bỏ hoàn toàn tin giả.
   - D. Chỉ ảnh hưởng đến phần mềm chỉnh sửa ảnh.
   - Đáp án: A

9. Khi nghi ngờ bản thân là nạn nhân của deepfake, điều nào nên làm?
   - A. Lưu bằng chứng, báo cáo nền tảng và tìm hỗ trợ phù hợp.
   - B. Chia sẻ rộng hơn để mọi người xem.
   - C. Xóa mọi dấu vết ngay lập tức.
   - D. Bỏ qua trong mọi trường hợp.
   - Đáp án: A

10. Mục tiêu chính của Module 1 là gì?
    - A. Hiểu khái niệm deepfake, tác động, rủi ro và tư duy phòng vệ ban đầu.
    - B. Dạy cách tạo deepfake.
    - C. Dạy cách vượt qua hệ thống phát hiện.
    - D. Dạy lập trình mô hình AI nâng cao.
    - Đáp án: A

---

## Module 2: Deepfake tác động như thế nào?

### Mục tiêu Module 2

Học viên hiểu sâu hơn về tác động của deepfake trong các lĩnh vực đời sống, từ cá nhân đến doanh nghiệp và xã hội. Module này mở rộng nhận thức từ “deepfake là gì” sang “deepfake có thể gây hậu quả gì”.

### Kịch bản mở đầu Module 2

Một nhân viên kế toán nhận được cuộc gọi video từ “giám đốc”. Người trong video yêu cầu chuyển tiền gấp cho đối tác vì “hợp đồng đang chờ”. Hình ảnh và giọng nói có vẻ rất giống. Nếu bạn là nhân viên đó, bạn sẽ làm gì?

### 2.1 Tác động đến cá nhân

#### 2.1.1 Danh dự và uy tín

Deepfake có thể làm tổn hại danh dự khi một người bị gán vào nội dung họ không tạo ra. Với học sinh/sinh viên, điều này có thể dẫn đến bắt nạt, cô lập xã hội hoặc áp lực tinh thần. Với người đi làm, nó có thể ảnh hưởng đến quan hệ nghề nghiệp và cơ hội công việc.

#### 2.1.2 Quyền riêng tư và sự đồng ý

Một vấn đề cốt lõi của deepfake là sự đồng ý. Nếu hình ảnh, giọng nói hoặc khuôn mặt của một người bị sử dụng để tạo nội dung giả mà họ không đồng ý, đó là xâm phạm quyền riêng tư và danh tính.

#### 2.1.3 Tâm lý nạn nhân

Nạn nhân có thể cảm thấy xấu hổ, tức giận, lo sợ hoặc bất lực. Trong nhiều trường hợp, họ còn phải tự chứng minh rằng nội dung đó là giả, trong khi nội dung đã lan truyền rất nhanh.

#### 2.1.4 Rủi ro lừa đảo người thân

Voice deepfake có thể giả giọng người thân để yêu cầu chuyển tiền, gửi mã OTP hoặc tiết lộ thông tin cá nhân. Đây là rủi ro rất thực tế vì người nghe thường tin vào giọng nói quen thuộc.

Checkpoint cuối 2.1 - 3 câu:

1. Vì sao deepfake có thể gây tổn hại danh dự cá nhân?
   - A. Vì nó có thể gán một người vào nội dung họ không tạo ra.
   - B. Vì nó luôn làm máy tính hỏng.
   - C. Vì nó chỉ đổi màu ảnh.
   - D. Vì nó làm video ngắn hơn.
   - Đáp án: A

2. Yếu tố đạo đức quan trọng khi dùng hình ảnh/giọng nói của người khác là gì?
   - A. Sự đồng ý.
   - B. Độ dài video.
   - C. Số lượng bình luận.
   - D. Tốc độ mạng.
   - Đáp án: A

3. Voice deepfake có thể dùng để lừa người thân bằng cách nào?
   - A. Giả giọng để yêu cầu tiền hoặc thông tin nhạy cảm.
   - B. Tăng âm lượng chuông điện thoại.
   - C. Dịch phụ đề tự động.
   - D. Chặn wifi.
   - Đáp án: A

### 2.2 Tác động đến doanh nghiệp và tổ chức

#### 2.2.1 CEO fraud và giả mạo lãnh đạo

`CEO fraud` là tình huống kẻ tấn công giả mạo lãnh đạo để yêu cầu nhân viên thực hiện hành động nhạy cảm, ví dụ chuyển tiền hoặc gửi tài liệu mật. Deepfake làm kiểu lừa đảo này thuyết phục hơn vì có thể giả giọng hoặc giả video.

#### 2.2.2 Social engineering

`Social engineering` là kỹ thuật thao túng con người thay vì tấn công trực tiếp vào hệ thống kỹ thuật. Deepfake có thể tăng độ tin cậy của social engineering bằng cách tạo cảm giác “người thật đang yêu cầu”.

#### 2.2.3 Khủng hoảng truyền thông

Một video giả mạo phát ngôn của đại diện công ty có thể làm cổ đông, khách hàng hoặc cộng đồng phản ứng tiêu cực. Dù sau đó được đính chính, thiệt hại ban đầu vẫn có thể rất lớn.

#### 2.2.4 Chi phí xử lý sự cố

Doanh nghiệp có thể phải chi tiền cho điều tra, truyền thông khủng hoảng, pháp lý, hỗ trợ nạn nhân, nâng cấp quy trình xác minh và đào tạo nhân viên.

Checkpoint cuối 2.2 - 3 câu:

1. CEO fraud là gì?
   - A. Giả mạo lãnh đạo để yêu cầu hành động nhạy cảm.
   - B. Tăng tốc độ máy chủ.
   - C. Một loại chứng chỉ SSL.
   - D. Một hệ điều hành.
   - Đáp án: A

2. Deepfake hỗ trợ social engineering bằng cách nào?
   - A. Làm yêu cầu giả mạo trông hoặc nghe đáng tin hơn.
   - B. Tự động vá lỗi phần mềm.
   - C. Xóa log hệ thống.
   - D. Tạo mật khẩu mạnh.
   - Đáp án: A

3. Một video giả đại diện công ty có thể gây ra điều gì?
   - A. Khủng hoảng truyền thông và mất niềm tin.
   - B. Tự động tăng bảo mật.
   - C. Giảm mọi rủi ro pháp lý.
   - D. Làm website chạy nhanh hơn.
   - Đáp án: A

### 2.3 Tác động đến xã hội

#### 2.3.1 Tin giả và thao túng cảm xúc

Deepfake thường nguy hiểm khi nó kích thích cảm xúc mạnh: giận dữ, sợ hãi, thương hại hoặc phẫn nộ. Khi cảm xúc cao, người dùng dễ chia sẻ trước khi kiểm chứng.

#### 2.3.2 Thao túng dư luận

Trong các sự kiện xã hội hoặc chính trị, deepfake có thể được dùng để tạo bằng chứng giả, làm sai lệch nhận thức của cộng đồng hoặc làm giảm uy tín của một nhóm/người.

#### 2.3.3 Khủng hoảng nhận thức

Nếu mọi người liên tục nghi ngờ mọi nội dung là giả, xã hội có thể rơi vào trạng thái khó tin vào bằng chứng. Đây là rủi ro dài hạn của deepfake.

#### 2.3.4 Vai trò của giáo dục cộng đồng

Giáo dục không thể loại bỏ hoàn toàn deepfake, nhưng giúp người dùng phản ứng chậm hơn, cẩn trọng hơn và có trách nhiệm hơn khi tiếp nhận thông tin.

Checkpoint cuối 2.3 - 3 câu:

1. Vì sao nội dung gây cảm xúc mạnh dễ lan truyền?
   - A. Vì người dùng dễ chia sẻ trước khi kiểm chứng.
   - B. Vì nó luôn chính xác hơn.
   - C. Vì thuật toán tự xác minh.
   - D. Vì nó không thể bị giả mạo.
   - Đáp án: A

2. Khủng hoảng nhận thức là gì trong bối cảnh deepfake?
   - A. Khi người dùng khó biết nên tin vào bằng chứng nào.
   - B. Khi máy tính thiếu RAM.
   - C. Khi video không có phụ đề.
   - D. Khi ảnh quá sáng.
   - Đáp án: A

3. Giáo dục cộng đồng giúp gì?
   - A. Giúp người dùng kiểm chứng và chia sẻ có trách nhiệm hơn.
   - B. Loại bỏ hoàn toàn mọi deepfake.
   - C. Biến mọi người thành lập trình viên AI.
   - D. Tự động xóa video giả.
   - Đáp án: A

### Quiz cuối Module 2

Nội dung quiz 10-15 câu nên bao phủ:

- Tác động cá nhân.
- Tác động doanh nghiệp.
- Social engineering.
- CEO fraud.
- Tác động xã hội.
- Khủng hoảng niềm tin.
- Vai trò giáo dục cộng đồng.

---

## Module 3: Rủi ro, đạo đức và niềm tin số

### Mục tiêu Module 3

Module 3 giúp học viên hiểu deepfake trong khung đạo đức, pháp lý ở mức phổ thông và niềm tin số. Đây là cầu nối giữa nhận thức cá nhân và trách nhiệm xã hội.

### Kịch bản mở đầu Module 3

Một người bạn gửi cho bạn video nghi ngờ ghép mặt một bạn học vào nội dung xấu. Nhóm chat bắt đầu bàn tán và có người muốn đăng lên mạng để “cảnh báo”. Bạn nên làm gì để vừa bảo vệ nạn nhân vừa không tiếp tay lan truyền?

### 3.1 Quyền riêng tư và sự đồng ý

#### 3.1.1 Danh tính số

Danh tính số bao gồm hình ảnh, giọng nói, tên, tài khoản, hành vi trực tuyến và các dấu hiệu giúp người khác nhận ra một người. Deepfake tấn công vào danh tính số bằng cách mô phỏng hoặc bóp méo những dấu hiệu này.

#### 3.1.2 Sự đồng ý

Một nội dung dùng khuôn mặt hoặc giọng nói của người khác mà không có sự đồng ý có thể gây tổn hại nghiêm trọng. Với deepfake, sự đồng ý càng quan trọng vì nội dung tạo ra có thể khiến người xem hiểu sai về nạn nhân.

#### 3.1.3 Nạn nhân không có nghĩa vụ chịu đựng

Khi bị deepfake tấn công, nạn nhân cần được hỗ trợ, không bị đổ lỗi. Người xem cần tránh bình luận, chia sẻ hoặc lưu trữ nội dung gây hại.

Checkpoint cuối 3.1 - 3 câu:

1. Danh tính số gồm gì?
   - A. Hình ảnh, giọng nói, tài khoản và dấu hiệu nhận diện trực tuyến.
   - B. Chỉ mật khẩu wifi.
   - C. Chỉ màu nền điện thoại.
   - D. Chỉ tên file.
   - Đáp án: A

2. Vì sao sự đồng ý quan trọng?
   - A. Vì sử dụng hình ảnh/giọng nói người khác có thể gây hại nếu không được phép.
   - B. Vì nó làm video dài hơn.
   - C. Vì nó tăng độ phân giải.
   - D. Vì nó đổi font chữ.
   - Đáp án: A

3. Khi thấy nội dung deepfake gây hại cho nạn nhân, nên làm gì?
   - A. Không phát tán thêm và hỗ trợ báo cáo.
   - B. Chia sẻ để nhiều người biết.
   - C. Lưu lại để xem sau.
   - D. Bình luận chế giễu.
   - Đáp án: A

### 3.2 Đạo đức khi tiếp nhận và chia sẻ thông tin

#### 3.2.1 Trách nhiệm của người xem

Người xem không tạo deepfake nhưng vẫn có trách nhiệm nếu chia sẻ nội dung chưa kiểm chứng. Mỗi lượt chia sẻ có thể làm thiệt hại lớn hơn.

#### 3.2.2 Tư duy “dừng lại trước khi chia sẻ”

Trước khi chia sẻ nội dung gây sốc, hãy hỏi:

- Nguồn là ai?
- Có nguồn đáng tin xác nhận không?
- Nội dung có kích động cảm xúc quá mạnh không?
- Nếu sai, ai bị hại?

#### 3.2.3 Không biến nạn nhân thành nội dung giải trí

Nội dung deepfake gây hại không nên bị xem như trò đùa. Việc cười cợt, lan truyền hoặc bình luận xúc phạm có thể làm nạn nhân tổn thương thêm.

Checkpoint cuối 3.2 - 3 câu:

1. Người xem có trách nhiệm gì?
   - A. Kiểm chứng trước khi chia sẻ.
   - B. Chia sẻ nhanh nhất có thể.
   - C. Luôn tin nội dung viral.
   - D. Bỏ qua mọi nguồn tin.
   - Đáp án: A

2. Câu hỏi nào nên đặt ra trước khi chia sẻ nội dung gây sốc?
   - A. Nếu nội dung sai, ai có thể bị hại?
   - B. Video có đủ hài không?
   - C. Có nhiều emoji không?
   - D. File có dung lượng thấp không?
   - Đáp án: A

3. Vì sao không nên biến nạn nhân thành trò đùa?
   - A. Vì điều đó có thể làm tổn thương và lan truyền thiệt hại.
   - B. Vì video sẽ bị giảm chất lượng.
   - C. Vì mạng sẽ chậm hơn.
   - D. Vì phụ đề sẽ lỗi.
   - Đáp án: A

### 3.3 Pháp lý ở mức nhận thức

#### 3.3.1 Không cần học luật sâu nhưng cần hiểu rủi ro

Học viên phổ thông không cần học toàn bộ luật, nhưng cần hiểu rằng tạo, phát tán hoặc sử dụng deepfake để bôi nhọ, lừa đảo, xâm phạm quyền riêng tư có thể dẫn đến hậu quả pháp lý.

#### 3.3.2 Những nhóm vấn đề pháp lý thường gặp

- Quyền riêng tư.
- Danh dự và nhân phẩm.
- Lừa đảo tài chính.
- Bản quyền và quyền hình ảnh.
- Trách nhiệm khi phát tán thông tin sai.

#### 3.3.3 Khi nào cần tìm hỗ trợ

Nếu nội dung liên quan đến tống tiền, đe dọa, bôi nhọ nghiêm trọng, lừa đảo tài chính hoặc xâm hại trẻ vị thành niên, cần tìm hỗ trợ từ gia đình, nhà trường, tổ chức, nền tảng hoặc cơ quan phù hợp.

Checkpoint cuối 3.3 - 3 câu:

1. Deepfake có thể liên quan đến vấn đề pháp lý nào?
   - A. Quyền riêng tư, danh dự, lừa đảo.
   - B. Chỉ tốc độ mạng.
   - C. Chỉ kích thước màn hình.
   - D. Chỉ chất lượng loa.
   - Đáp án: A

2. Khi bị tống tiền bằng deepfake, nên làm gì?
   - A. Lưu bằng chứng và tìm hỗ trợ phù hợp.
   - B. Chuyển tiền ngay.
   - C. Chia sẻ rộng rãi.
   - D. Xóa mọi thứ không lưu lại gì.
   - Đáp án: A

3. Vì sao khóa basics chỉ dạy pháp lý ở mức nhận thức?
   - A. Vì mục tiêu là giúp người học biết rủi ro và phản ứng ban đầu.
   - B. Vì pháp lý không liên quan.
   - C. Vì mọi deepfake đều hợp pháp.
   - D. Vì luật chỉ áp dụng cho doanh nghiệp.
   - Đáp án: A

### Quiz cuối Module 3

Nội dung quiz 10-15 câu nên bao phủ:

- Danh tính số.
- Quyền riêng tư.
- Sự đồng ý.
- Đạo đức chia sẻ.
- Hỗ trợ nạn nhân.
- Rủi ro pháp lý ở mức nhận thức.

---

## Midterm 1 - Sau Module 1, 2, 3

### Mục tiêu

Kiểm tra nền tảng nhận thức trước khi học phần nhận diện.

### Quy mô

20-30 câu.

### Nội dung

- Khái niệm deepfake.
- Dạng deepfake.
- Tác động cá nhân, tổ chức, xã hội.
- Niềm tin số.
- Quyền riêng tư và đạo đức chia sẻ.
- Phản ứng ban đầu.

---

# Phần II - Nhận diện

## Module 4: Nhận diện dấu hiệu hình ảnh và video

### Mục tiêu Module 4

Học viên hiểu rằng không có một dấu hiệu nào đảm bảo 100% nội dung là deepfake. Nhận diện cần kết hợp nhiều dấu hiệu: khuôn mặt, ánh sáng, chuyển động, bối cảnh và nguồn tin.

### Kịch bản mở đầu

Bạn thấy một video trong đó khuôn mặt nhân vật hơi “mượt”, ánh sáng trên mặt khác với ánh sáng nền, môi có vẻ không khớp lời nói. Đây có phải deepfake không? Bạn cần quan sát thêm gì?

### 4.1 Dấu hiệu ở khuôn mặt

#### 4.1.1 Viền mặt và vùng ghép

Một số deepfake có viền mặt bất thường, vùng da gần tóc hoặc tai bị mờ, hoặc ranh giới mặt-cổ không tự nhiên. Tuy nhiên, video chất lượng thấp cũng có thể gây lỗi tương tự, nên không kết luận chỉ dựa vào một dấu hiệu.

#### 4.1.2 Mắt và chớp mắt

Mắt có thể nhìn thiếu tự nhiên, phản chiếu ánh sáng không nhất quán hoặc chớp mắt quá ít/quá lạ. Với deepfake hiện đại, dấu hiệu này không còn luôn rõ ràng, nhưng vẫn là điểm quan sát cơ bản.

#### 4.1.3 Miệng và răng

Vùng miệng có thể bị méo, răng thiếu chi tiết, chuyển động môi không khớp âm thanh. Đây là dấu hiệu quan trọng trong video nói chuyện.

Checkpoint cuối 4.1 - 3 câu:

1. Vì sao không nên kết luận deepfake chỉ từ một dấu hiệu khuôn mặt?
   - A. Vì lỗi nén video hoặc ánh sáng cũng có thể tạo dấu hiệu tương tự.
   - B. Vì khuôn mặt không quan trọng.
   - C. Vì mọi video đều giả.
   - D. Vì mắt người luôn sai.
   - Đáp án: A

2. Vùng nào thường cần quan sát trong video nói chuyện?
   - A. Miệng, răng và chuyển động môi.
   - B. Tên wifi.
   - C. Dung lượng pin.
   - D. Màu nút phát.
   - Đáp án: A

3. Dấu hiệu ở mắt có thể là gì?
   - A. Chớp mắt hoặc phản chiếu ánh sáng bất thường.
   - B. Video có phụ đề.
   - C. File có tên ngắn.
   - D. Âm lượng nhỏ.
   - Đáp án: A

### 4.2 Ánh sáng, bóng đổ và chất lượng hình ảnh

#### 4.2.1 Ánh sáng không nhất quán

Nếu mặt sáng theo một hướng nhưng môi trường lại có nguồn sáng khác, đó là điểm cần chú ý. Tuy vậy, quay phim trong môi trường phức tạp cũng có thể tạo ánh sáng lạ.

#### 4.2.2 Bóng đổ và phản chiếu

Bóng trên mặt, cổ, kính, mắt hoặc nền có thể không khớp. Phản chiếu trên kính hoặc mắt đôi khi tiết lộ sự thiếu nhất quán.

#### 4.2.3 Lỗi nén và chất lượng thấp

Video bị nén mạnh có thể tạo artifact giống deepfake. Người học cần biết phân biệt giữa “lỗi kỹ thuật do nén” và “dấu hiệu gia mạo có chủ ý”.

Checkpoint cuối 4.2 - 3 câu:

1. Ánh sáng không nhất quán có thể gợi ý điều gì?
   - A. Nội dung cần được kiểm tra kỹ hơn.
   - B. Chắc chắn là thật.
   - C. Chắc chắn là giả.
   - D. Không liên quan.
   - Đáp án: A

2. Video chất lượng thấp có thể gây nhầm lẫn vì sao?
   - A. Lỗi nén có thể tạo artifact giống dấu hiệu deepfake.
   - B. Video thấp luôn là deepfake.
   - C. Video thấp luôn là thật.
   - D. Không thể xem được.
   - Đáp án: A

3. Phản chiếu trên kính/mắt có thể giúp gì?
   - A. Kiểm tra sự nhất quán ánh sáng và bối cảnh.
   - B. Tăng âm lượng.
   - C. Xóa metadata.
   - D. Dịch phụ đề.
   - Đáp án: A

### 4.3 Chuyển động và bối cảnh trong video

#### 4.3.1 Chuyển động đầu và cổ

Một số deepfake có chuyển động đầu, cổ hoặc vai không tự nhiên. Khuôn mặt có thể di chuyển hơi lệch so với cơ thể.

#### 4.3.2 Tay, tóc và vật thể nhỏ

AI thường gặp khó với chi tiết nhỏ, vật che khuất, tóc, tay hoặc phụ kiện. Khi tay đi qua mặt hoặc vật che một phần khuôn mặt, lỗi có thể xuất hiện.

#### 4.3.3 Bối cảnh thiếu logic

Bối cảnh có thể có chữ bị méo, vật thể biến dạng, chi tiết thay đổi giữa các khung hình hoặc không khớp với câu chuyện.

Checkpoint cuối 4.3 - 3 câu:

1. Vì sao tay hoặc vật che mặt là điểm cần chú ý?
   - A. Vì AI có thể xử lý kém các vùng che khuất/phức tạp.
   - B. Vì tay luôn chứng minh video thật.
   - C. Vì vật che mặt không liên quan.
   - D. Vì chỉ âm thanh quan trọng.
   - Đáp án: A

2. Bối cảnh thiếu logic có thể là gì?
   - A. Chữ méo, vật thể biến dạng, chi tiết thay đổi lạ.
   - B. Video có tiêu đề.
   - C. Người nói mặc áo xanh.
   - D. Video có thời lượng dài.
   - Đáp án: A

3. Chuyển động đầu-cổ bất thường nên được hiểu thế nào?
   - A. Là một dấu hiệu cần kiểm tra cùng các yếu tố khác.
   - B. Là bằng chứng tuyệt đối.
   - C. Không bao giờ quan trọng.
   - D. Chỉ do màn hình nhỏ.
   - Đáp án: A

### Quiz cuối Module 4

Nội dung quiz 10-15 câu nên bao phủ:

- Dấu hiệu khuôn mặt.
- Mắt, miệng, răng.
- Ánh sáng, bóng đổ.
- Lỗi nén video.
- Chuyển động và bối cảnh.
- Nguyên tắc không kết luận từ một dấu hiệu.

---

## Module 5: Nhận diện giọng nói và âm thanh giả mạo

### Mục tiêu Module 5

Học viên hiểu voice deepfake là gì, vì sao nó nguy hiểm trong lừa đảo và cách quan sát các dấu hiệu âm thanh ở mức cơ bản.

### Kịch bản mở đầu

Bạn nhận cuộc gọi từ người thân nói rằng họ đang gặp sự cố và cần chuyển tiền ngay. Giọng nói rất giống, nhưng câu chuyện gấp gáp và không cho bạn thời gian kiểm tra. Bạn nên làm gì?

### 5.1 Voice deepfake là gì?

#### 5.1.1 Giả giọng và tổng hợp giọng nói

Voice deepfake là nội dung âm thanh được tạo hoặc biến đổi để nghe giống giọng của một người. Nó có thể dùng trong cuộc gọi, tin nhắn thoại hoặc video.

#### 5.1.2 Vì sao giọng nói dễ tạo niềm tin

Con người thường tin vào giọng nói quen thuộc. Nếu nghe giống người thân hoặc lãnh đạo, người nghe dễ bỏ qua quy trình xác minh.

#### 5.1.3 Rủi ro trong lừa đảo

Kẻ tấn công có thể giả giọng để yêu cầu chuyển tiền, gửi mã OTP, tiết lộ thông tin hoặc thực hiện hành động gấp.

Checkpoint cuối 5.1 - 3 câu:

1. Voice deepfake là gì?
   - A. Âm thanh được tạo/biến đổi để giống giọng một người.
   - B. Loa bị hỏng.
   - C. Nhạc nền lớn hơn.
   - D. Phụ đề tự động.
   - Đáp án: A

2. Vì sao giọng nói quen thuộc dễ tạo niềm tin?
   - A. Vì người nghe thường liên kết giọng nói với danh tính.
   - B. Vì mọi giọng nói đều xác thực.
   - C. Vì điện thoại không thể bị lừa.
   - D. Vì âm thanh không thể giả.
   - Đáp án: A

3. Rủi ro thường gặp của voice deepfake là gì?
   - A. Lừa chuyển tiền hoặc tiết lộ thông tin.
   - B. Tăng độ sáng màn hình.
   - C. Xóa ảnh nền.
   - D. Nén tài liệu.
   - Đáp án: A

### 5.2 Dấu hiệu âm thanh đáng nghi

#### 5.2.1 Nhịp nói và cảm xúc

Giọng giả có thể thiếu cảm xúc tự nhiên, ngắt nghỉ lạ hoặc nhấn nhá không phù hợp với tình huống.

#### 5.2.2 Tạp âm và môi trường

Âm nền có thể không khớp với bối cảnh. Ví dụ người nói bảo đang ngoài đường nhưng âm thanh lại quá sạch hoặc lặp.

#### 5.2.3 Câu chuyện gấp gáp bất thường

Trong lừa đảo, kẻ tấn công thường tạo áp lực thời gian: “chuyển ngay”, “đừng gọi lại”, “đừng nói với ai”. Đây là dấu hiệu social engineering, không chỉ là dấu hiệu âm thanh.

Checkpoint cuối 5.2 - 3 câu:

1. Dấu hiệu nào có thể đáng nghi trong voice deepfake?
   - A. Nhịp nói, cảm xúc hoặc ngắt nghỉ bất thường.
   - B. Người nói dùng điện thoại.
   - C. Cuộc gọi dài hơn 1 phút.
   - D. Có số điện thoại.
   - Đáp án: A

2. Câu chuyện quá gấp gáp có thể là dấu hiệu gì?
   - A. Social engineering.
   - B. Tín hiệu mạng tốt.
   - C. Phụ đề sai.
   - D. File quá nặng.
   - Đáp án: A

3. Âm nền không khớp bối cảnh có thể gợi ý điều gì?
   - A. Cần xác minh thêm.
   - B. Chắc chắn là thật.
   - C. Không bao giờ quan trọng.
   - D. Chỉ do màn hình.
   - Đáp án: A

### 5.3 Cách xác minh cuộc gọi đáng ngờ

#### 5.3.1 Gọi lại qua kênh độc lập

Nếu nhận yêu cầu nhạy cảm, hãy ngắt cuộc gọi và gọi lại qua số đã biết trước, không dùng số lạ hoặc link do người gọi gửi.

#### 5.3.2 Dùng câu hỏi xác minh

Có thể dùng câu hỏi mà chỉ người thật biết, nhưng không nên dùng thông tin quá dễ đoán từ mạng xã hội.

#### 5.3.3 Quy trình cho doanh nghiệp

Doanh nghiệp nên có quy tắc: mọi yêu cầu chuyển tiền, gửi dữ liệu hoặc thay đổi tài khoản phải xác minh qua kênh thứ hai.

Checkpoint cuối 5.3 - 3 câu:

1. Khi nhận cuộc gọi yêu cầu chuyển tiền gấp, nên làm gì?
   - A. Gọi lại qua kênh độc lập đã biết trước.
   - B. Chuyển ngay.
   - C. Gửi mã OTP.
   - D. Không cần kiểm tra.
   - Đáp án: A

2. Kênh xác minh thứ hai giúp gì?
   - A. Giảm nguy cơ tin vào cuộc gọi giả mạo.
   - B. Tăng âm lượng.
   - C. Làm video đẹp hơn.
   - D. Xóa phụ đề.
   - Đáp án: A

3. Câu hỏi xác minh nên tránh điều gì?
   - A. Thông tin quá dễ đoán từ mạng xã hội.
   - B. Nội dung chỉ người thật biết.
   - C. Quy trình xác minh.
   - D. Gọi lại người liên quan.
   - Đáp án: A

### Quiz cuối Module 5

Nội dung quiz 10-15 câu nên bao phủ:

- Voice deepfake.
- Dấu hiệu âm thanh.
- Social engineering qua giọng nói.
- Kênh xác minh độc lập.
- Quy trình xác minh trong doanh nghiệp.

---

## Module 6: Kiểm chứng bối cảnh, nguồn tin và metadata cơ bản

### Mục tiêu Module 6

Học viên hiểu rằng nhận diện deepfake không chỉ nhìn vào khuôn mặt hoặc giọng nói. Bối cảnh, nguồn đăng, lịch sử lan truyền và metadata cũng rất quan trọng.

### Kịch bản mở đầu

Một video được đăng bởi tài khoản mới tạo, không có nguồn gốc rõ ràng, tiêu đề gây sốc và yêu cầu người xem chia sẻ ngay. Video trông khá thật. Bạn sẽ kiểm tra điều gì trước?

### 6.1 Kiểm chứng nguồn tin

#### 6.1.1 Nguồn đầu tiên

Cần tìm nguồn đăng đầu tiên hoặc nguồn đáng tin nhất. Nội dung bị đăng lại nhiều lần có thể mất bối cảnh ban đầu.

#### 6.1.2 Uy tín nguồn

Nguồn đáng tin thường có lịch sử rõ ràng, thông tin liên hệ, trách nhiệm biên tập và đính chính khi sai.

#### 6.1.3 Nguồn độc lập

Không nên chỉ dựa vào một nguồn. Hãy tìm xác nhận từ nguồn độc lập, đặc biệt với nội dung gây sốc.

Checkpoint cuối 6.1 - 3 câu:

1. Vì sao cần tìm nguồn đầu tiên?
   - A. Vì nội dung đăng lại có thể mất bối cảnh.
   - B. Vì nguồn đầu tiên luôn sai.
   - C. Vì video sẽ sáng hơn.
   - D. Vì file sẽ nhỏ hơn.
   - Đáp án: A

2. Nguồn đáng tin thường có gì?
   - A. Lịch sử rõ ràng và trách nhiệm biên tập.
   - B. Tiêu đề càng sốc càng tốt.
   - C. Không cần tác giả.
   - D. Chỉ có bình luận.
   - Đáp án: A

3. Vì sao cần nguồn độc lập?
   - A. Để giảm nguy cơ tin vào thông tin sai từ một nguồn duy nhất.
   - B. Để tăng lượt xem.
   - C. Để đổi màu video.
   - D. Để xóa âm thanh.
   - Đáp án: A

### 6.2 Kiểm chứng bối cảnh

#### 6.2.1 Thời gian

Video cũ có thể bị đăng lại như sự kiện mới. Cần kiểm tra ngày đăng, bối cảnh sự kiện và các dấu hiệu thời gian.

#### 6.2.2 Địa điểm

Địa điểm trong video có thể không khớp với mô tả. Biển báo, ngôn ngữ, thời tiết, kiến trúc và cảnh nền có thể giúp xác minh.

#### 6.2.3 Mục đích lan truyền

Hãy hỏi: ai được lợi nếu nội dung này được tin là thật? Nội dung có đang kích động cảm xúc quá mạnh không?

Checkpoint cuối 6.2 - 3 câu:

1. Video cũ đăng lại như sự kiện mới là vấn đề gì?
   - A. Sai bối cảnh thời gian.
   - B. Tăng chất lượng video.
   - C. Không liên quan.
   - D. Tự động xác minh.
   - Đáp án: A

2. Dấu hiệu nào giúp kiểm chứng địa điểm?
   - A. Biển báo, ngôn ngữ, thời tiết, kiến trúc.
   - B. Số lượt thích.
   - C. Tên wifi.
   - D. Dung lượng pin.
   - Đáp án: A

3. Câu hỏi “ai được lợi?” giúp gì?
   - A. Hiểu mục đích lan truyền.
   - B. Tăng độ phân giải.
   - C. Xóa phụ đề.
   - D. Chỉnh màu ảnh.
   - Đáp án: A

### 6.3 Metadata cơ bản

#### 6.3.1 Metadata là gì?

`Metadata` là dữ liệu mô tả dữ liệu. Với ảnh/video, metadata có thể gồm thời gian tạo, thiết bị, định dạng file, phần mềm xử lý hoặc vị trí nếu có.

#### 6.3.2 Giới hạn của metadata

Metadata có thể bị xóa, sửa hoặc không tồn tại khi nội dung được tải qua mạng xã hội. Vì vậy metadata hữu ích nhưng không phải bằng chứng tuyệt đối.

#### 6.3.3 Kiểm chứng không phá hủy bằng chứng

Nếu nội dung liên quan đến sự cố nghiêm trọng, không nên chỉnh sửa file gốc. Nên lưu bản gốc, ghi lại nguồn, thời gian tải và nơi tìm thấy.

Checkpoint cuối 6.3 - 3 câu:

1. Metadata là gì?
   - A. Dữ liệu mô tả dữ liệu.
   - B. Một loại virus.
   - C. Mật khẩu wifi.
   - D. Màu nền video.
   - Đáp án: A

2. Vì sao metadata không phải bằng chứng tuyệt đối?
   - A. Vì có thể bị xóa hoặc sửa.
   - B. Vì luôn chính xác 100%.
   - C. Vì không bao giờ tồn tại.
   - D. Vì chỉ dùng cho âm thanh.
   - Đáp án: A

3. Khi cần giữ bằng chứng, nên làm gì?
   - A. Lưu bản gốc và ghi lại nguồn/thời gian.
   - B. Chỉnh sửa file gốc.
   - C. Đổi tên nhiều lần.
   - D. Xóa nguồn đăng.
   - Đáp án: A

### Quiz cuối Module 6

Nội dung quiz 10-15 câu nên bao phủ:

- Nguồn đầu tiên.
- Nguồn độc lập.
- Bối cảnh thời gian/địa điểm.
- Mục đích lan truyền.
- Metadata và giới hạn của metadata.
- Lưu bằng chứng cơ bản.

---

## Midterm 2 - Sau Module 4, 5, 6

### Mục tiêu

Kiểm tra khả năng nhận diện dấu hiệu và kiểm chứng bối cảnh.

### Quy mô

20-30 câu.

### Nội dung

- Dấu hiệu hình ảnh/video.
- Dấu hiệu âm thanh.
- Voice deepfake.
- Kiểm chứng nguồn.
- Kiểm chứng bối cảnh.
- Metadata cơ bản.
- Không kết luận từ một dấu hiệu duy nhất.

---

# Phần III - Phòng ngừa và ứng phó

## Module 7: Phòng ngừa deepfake cho cá nhân

### Mục tiêu Module 7

Học viên biết cách giảm rủi ro bị giả mạo, giảm khả năng bị lừa và xây dựng thói quen an toàn thông tin cá nhân.

### Kịch bản mở đầu

Bạn đăng rất nhiều ảnh, video, story và giọng nói công khai trên mạng. Một ngày, có người dùng hình ảnh của bạn để tạo nội dung giả. Làm sao giảm rủi ro từ trước?

### 7.1 Quản lý dấu vết số cá nhân

#### 7.1.1 Dấu vết số là gì?

Dấu vết số là những dữ liệu bạn để lại trên môi trường trực tuyến: ảnh, video, bình luận, giọng nói, vị trí, thói quen và quan hệ.

#### 7.1.2 Dữ liệu công khai

Ảnh, video và giọng nói công khai có thể bị thu thập để giả mạo. Không phải mọi thứ đều cần để công khai.

#### 7.1.3 Cài đặt quyền riêng tư

Học viên nên biết kiểm tra quyền riêng tư trên mạng xã hội, giới hạn người xem, ẩn thông tin nhạy cảm và cân nhắc trước khi đăng.

Checkpoint cuối 7.1 - 3 câu:

1. Dấu vết số gồm gì?
   - A. Ảnh, video, bình luận, giọng nói và thông tin trực tuyến.
   - B. Chỉ mật khẩu wifi.
   - C. Chỉ dung lượng ổ cứng.
   - D. Chỉ màu màn hình.
   - Đáp án: A

2. Vì sao cần hạn chế dữ liệu công khai?
   - A. Vì dữ liệu có thể bị dùng để giả mạo.
   - B. Vì mạng xã hội không lưu gì.
   - C. Vì ảnh công khai luôn an toàn.
   - D. Vì video không thể tải xuống.
   - Đáp án: A

3. Cài đặt quyền riêng tư giúp gì?
   - A. Giảm người có thể truy cập dữ liệu cá nhân.
   - B. Tăng âm lượng.
   - C. Xóa mọi rủi ro hoàn toàn.
   - D. Tạo deepfake.
   - Đáp án: A

### 7.2 Thói quen xác minh cá nhân

#### 7.2.1 Xác minh yêu cầu nhạy cảm

Nếu ai đó yêu cầu chuyển tiền, gửi mã, gửi giấy tờ hoặc thông tin nhạy cảm, cần xác minh qua kênh độc lập.

#### 7.2.2 Mật khẩu và xác thực đa yếu tố

Deepfake có thể kết hợp với chiếm tài khoản. Vì vậy mật khẩu mạnh và `MFA` giúp giảm rủi ro tài khoản bị lạm dụng.

#### 7.2.3 Mã bí mật gia đình/nhóm

Gia đình hoặc nhóm thân thiết có thể thống nhất một câu xác minh trong tình huống khẩn cấp, nhưng cần tránh thông tin dễ đoán.

Checkpoint cuối 7.2 - 3 câu:

1. Yêu cầu chuyển tiền qua cuộc gọi đáng ngờ nên được xử lý thế nào?
   - A. Xác minh qua kênh độc lập.
   - B. Chuyển ngay.
   - C. Gửi thêm mã OTP.
   - D. Không cần hỏi lại.
   - Đáp án: A

2. MFA giúp gì?
   - A. Giảm rủi ro tài khoản bị chiếm quyền.
   - B. Tạo video đẹp hơn.
   - C. Xóa deepfake trên mạng.
   - D. Tăng lượt xem.
   - Đáp án: A

3. Câu xác minh nên tránh gì?
   - A. Thông tin dễ đoán từ mạng xã hội.
   - B. Thông tin chỉ nhóm biết.
   - C. Quy ước trước.
   - D. Dùng khi khẩn cấp.
   - Đáp án: A

### 7.3 Chia sẻ có trách nhiệm

#### 7.3.1 Không chia sẻ nội dung nghi ngờ

Ngay cả khi bạn viết “không biết thật hay giả”, việc chia sẻ vẫn có thể làm nội dung lan rộng.

#### 7.3.2 Cảnh báo đúng cách

Nếu muốn cảnh báo, hãy dùng ảnh che mờ, mô tả ngắn, link nguồn đáng tin hoặc hướng dẫn báo cáo, không đăng lại nội dung gây hại.

#### 7.3.3 Tôn trọng nạn nhân

Không hỏi xin link, không bình luận xúc phạm, không lưu trữ nội dung gây hại.

Checkpoint cuối 7.3 - 3 câu:

1. Vì sao không nên chia sẻ lại nội dung nghi ngờ?
   - A. Vì vẫn làm nội dung lan rộng.
   - B. Vì video sẽ ngắn hơn.
   - C. Vì không ai xem.
   - D. Vì luôn hợp pháp.
   - Đáp án: A

2. Cảnh báo đúng cách nên tránh gì?
   - A. Đăng lại nguyên nội dung gây hại.
   - B. Che mờ thông tin nhạy cảm.
   - C. Dẫn nguồn đáng tin.
   - D. Hướng dẫn báo cáo.
   - Đáp án: A

3. Tôn trọng nạn nhân nghĩa là gì?
   - A. Không phát tán, không chế giễu, hỗ trợ báo cáo.
   - B. Xin link để xem.
   - C. Bình luận cho vui.
   - D. Lưu lại nội dung.
   - Đáp án: A

### Quiz cuối Module 7

Nội dung quiz 10-15 câu nên bao phủ:

- Dấu vết số.
- Quyền riêng tư.
- Xác minh yêu cầu nhạy cảm.
- MFA.
- Chia sẻ có trách nhiệm.

---

## Module 8: Ứng phó khi gặp hoặc trở thành nạn nhân của deepfake

### Mục tiêu Module 8

Học viên biết các bước ứng phó cơ bản khi gặp deepfake hoặc khi bản thân/người quen là nạn nhân.

### Kịch bản mở đầu

Bạn phát hiện một tài khoản đăng video giả mạo bạn hoặc bạn bè. Nội dung đang được chia sẻ. Bạn đang rất hoảng. Việc đầu tiên nên làm là gì?

### 8.1 Ứng phó khi gặp nội dung nghi ngờ

#### 8.1.1 Dừng lại

Không chia sẻ, không kết luận vội, không tham gia đám đông công kích.

#### 8.1.2 Kiểm chứng

Tìm nguồn gốc, nguồn độc lập, bối cảnh, dấu hiệu bất thường và phản hồi từ người liên quan.

#### 8.1.3 Báo cáo nền tảng

Nếu nội dung có dấu hiệu giả mạo, quấy rối hoặc xâm hại, hãy dùng công cụ report của nền tảng.

Checkpoint cuối 8.1 - 3 câu:

1. Khi gặp nội dung nghi ngờ, bước đầu tiên là gì?
   - A. Dừng lại, không chia sẻ vội.
   - B. Đăng lại ngay.
   - C. Chế giễu.
   - D. Xóa trình duyệt.
   - Đáp án: A

2. Kiểm chứng gồm gì?
   - A. Nguồn gốc, nguồn độc lập, bối cảnh, dấu hiệu.
   - B. Chỉ số lượt thích.
   - C. Màu áo người nói.
   - D. Tên wifi.
   - Đáp án: A

3. Khi nội dung vi phạm, nên dùng công cụ nào?
   - A. Report/báo cáo của nền tảng.
   - B. Tải lại lên trang khác.
   - C. Chia sẻ trong nhóm lớn.
   - D. Bình luận thêm.
   - Đáp án: A

### 8.2 Lưu bằng chứng

#### 8.2.1 Cần lưu gì?

Lưu link, ảnh chụp màn hình, thời gian, tên tài khoản, nội dung mô tả, bình luận đe dọa nếu có.

#### 8.2.2 Không chỉnh sửa bản gốc

Nếu tải được file gốc, nên giữ nguyên. Không cắt, nén, đổi định dạng nếu chưa cần.

#### 8.2.3 Ghi chú chuỗi sự kiện

Ghi lại bạn phát hiện lúc nào, ai gửi, nội dung lan ở đâu, đã báo cáo cho ai. Đây là thói quen cơ bản của `chain of custody`.

Checkpoint cuối 8.2 - 3 câu:

1. Khi lưu bằng chứng, cần lưu gì?
   - A. Link, ảnh chụp, thời gian, tài khoản đăng.
   - B. Chỉ màu nền.
   - C. Chỉ số pin.
   - D. Chỉ tên thiết bị.
   - Đáp án: A

2. Vì sao không nên chỉnh sửa file gốc?
   - A. Vì có thể làm giảm giá trị bằng chứng.
   - B. Vì file sẽ đẹp hơn.
   - C. Vì file luôn vô dụng.
   - D. Vì không thể tải file.
   - Đáp án: A

3. Chain of custody ở mức cơ bản liên quan đến gì?
   - A. Ghi nhận quá trình thu thập và xử lý bằng chứng.
   - B. Tăng lượt xem.
   - C. Đổi màu video.
   - D. Dịch phụ đề.
   - Đáp án: A

### 8.3 Tìm hỗ trợ

#### 8.3.1 Hỗ trợ cá nhân

Nạn nhân nên nói với người tin cậy: gia đình, bạn thân, giáo viên, quản lý hoặc cố vấn.

#### 8.3.2 Hỗ trợ nền tảng

Các nền tảng thường có cơ chế báo cáo mạo danh, quấy rối, nội dung nhạy cảm hoặc thông tin sai lệch.

#### 8.3.3 Hỗ trợ tổ chức/cơ quan phù hợp

Nếu có tống tiền, đe dọa, lừa đảo tài chính hoặc xâm hại nghiêm trọng, cần tìm hỗ trợ từ tổ chức/cơ quan phù hợp.

Checkpoint cuối 8.3 - 3 câu:

1. Nạn nhân nên làm gì khi hoảng loạn?
   - A. Tìm người tin cậy hỗ trợ.
   - B. Tự chịu một mình.
   - C. Chia sẻ rộng hơn.
   - D. Xóa hết bằng chứng.
   - Đáp án: A

2. Nếu bị tống tiền, nên làm gì?
   - A. Lưu bằng chứng và tìm hỗ trợ phù hợp.
   - B. Chuyển tiền ngay.
   - C. Không nói với ai.
   - D. Xóa tài khoản ngay.
   - Đáp án: A

3. Báo cáo nền tảng có tác dụng gì?
   - A. Yêu cầu nền tảng xem xét/gỡ nội dung vi phạm.
   - B. Tạo thêm deepfake.
   - C. Tăng độ phân giải.
   - D. Làm nội dung viral hơn.
   - Đáp án: A

### Quiz cuối Module 8

Nội dung quiz 10-15 câu nên bao phủ:

- Dừng lại, kiểm chứng, báo cáo.
- Lưu bằng chứng.
- Chain of custody cơ bản.
- Hỗ trợ nạn nhân.
- Xử lý tống tiền/lừa đảo.

---

## Module 9: Deepfake trong tổ chức - góc nhìn SOC, GRC và security awareness

### Mục tiêu Module 9

Module này đưa học viên phổ thông đến gần hơn với định hướng Network Security, SOC và GRC, nhưng vẫn giữ mức cơ bản. Học viên hiểu tổ chức cần quy trình, đào tạo và phối hợp để giảm rủi ro deepfake.

### Kịch bản mở đầu

Một công ty nhận được video giả mạo lãnh đạo phát ngôn sai lệch. Cùng lúc, nhân viên tài chính nhận cuộc gọi giả giọng yêu cầu chuyển tiền. Đội bảo mật, truyền thông, pháp lý và quản lý cần phối hợp như thế nào?

### 9.1 Security awareness trong tổ chức

#### 9.1.1 Đào tạo nhận thức

Nhân viên cần được đào tạo để nhận biết yêu cầu bất thường, đặc biệt là yêu cầu liên quan đến tiền, dữ liệu hoặc quyền truy cập.

#### 9.1.2 Quy trình xác minh

Tổ chức cần quy định rõ: yêu cầu nhạy cảm phải xác minh qua kênh thứ hai, không chỉ dựa vào giọng nói/video.

#### 9.1.3 Văn hóa không đổ lỗi

Nếu nhân viên báo cáo nghi ngờ, tổ chức nên khuyến khích thay vì trách phạt. Văn hóa sợ bị phạt khiến người dùng che giấu sự cố.

Checkpoint cuối 9.1 - 3 câu:

1. Security awareness giúp gì?
   - A. Giúp nhân viên nhận biết và báo cáo rủi ro.
   - B. Xóa mọi deepfake tự động.
   - C. Tăng tốc máy tính.
   - D. Tạo video mới.
   - Đáp án: A

2. Yêu cầu nhạy cảm nên được xác minh thế nào?
   - A. Qua kênh thứ hai độc lập.
   - B. Chỉ dựa vào giọng nói.
   - C. Chỉ dựa vào video.
   - D. Không cần xác minh.
   - Đáp án: A

3. Vì sao không nên đổ lỗi người báo cáo?
   - A. Vì sẽ làm nhân viên ngại báo cáo sự cố.
   - B. Vì báo cáo luôn sai.
   - C. Vì deepfake không nguy hiểm.
   - D. Vì tổ chức không cần quy trình.
   - Đáp án: A

### 9.2 SOC và incident response ở mức nhập môn

#### 9.2.1 SOC là gì?

`SOC` là Security Operations Center, nơi theo dõi, phân tích và phản ứng với sự cố an toàn thông tin. Với deepfake, SOC có thể phối hợp kiểm tra log, email, tài khoản, nguồn gửi và dấu hiệu lừa đảo liên quan.

#### 9.2.2 Incident response là gì?

`Incident response` là quy trình phản ứng với sự cố. Ở mức cơ bản gồm: phát hiện, xác minh, khoanh vùng, xử lý, khôi phục và rút kinh nghiệm.

#### 9.2.3 Deepfake như một phần của chuỗi tấn công

Deepfake có thể không đứng một mình. Nó có thể đi kèm phishing, chiếm tài khoản, giả mạo email hoặc lừa chuyển tiền.

Checkpoint cuối 9.2 - 3 câu:

1. SOC là gì?
   - A. Trung tâm vận hành an toàn thông tin.
   - B. Phần mềm chỉnh ảnh.
   - C. Một loại video.
   - D. Một nền tảng mạng xã hội.
   - Đáp án: A

2. Incident response là gì?
   - A. Quy trình phản ứng với sự cố an toàn thông tin.
   - B. Cách tăng âm lượng video.
   - C. Cách đổi màu ảnh.
   - D. Cách tạo phụ đề.
   - Đáp án: A

3. Deepfake có thể kết hợp với gì trong tấn công?
   - A. Phishing, chiếm tài khoản, giả mạo email.
   - B. Chỉ nhạc nền.
   - C. Chỉ filter ảnh.
   - D. Chỉ nén file.
   - Đáp án: A

### 9.3 GRC và chính sách phòng vệ

#### 9.3.1 GRC là gì?

`GRC` là Governance, Risk and Compliance: quản trị, rủi ro và tuân thủ. Với deepfake, GRC giúp tổ chức xây dựng chính sách, đánh giá rủi ro và tuân thủ quy định liên quan.

#### 9.3.2 Chính sách xác minh danh tính

Tổ chức nên có chính sách xác minh danh tính trong các tình huống nhạy cảm: chuyển tiền, thay đổi tài khoản ngân hàng, gửi dữ liệu, phát ngôn công khai.

#### 9.3.3 Bài học sau sự cố

Sau sự cố, tổ chức cần rút kinh nghiệm: quy trình nào thất bại, nhân viên cần đào tạo gì, log nào cần giữ, chính sách nào cần cập nhật.

Checkpoint cuối 9.3 - 3 câu:

1. GRC là gì?
   - A. Governance, Risk and Compliance.
   - B. Một loại camera.
   - C. Một định dạng video.
   - D. Một phần mềm nghe nhạc.
   - Đáp án: A

2. Chính sách xác minh danh tính cần cho tình huống nào?
   - A. Chuyển tiền, gửi dữ liệu, phát ngôn công khai.
   - B. Đổi hình nền.
   - C. Nghe nhạc.
   - D. Xem video giải trí.
   - Đáp án: A

3. Sau sự cố, tổ chức nên làm gì?
   - A. Rút kinh nghiệm, cập nhật quy trình và đào tạo lại.
   - B. Giấu hoàn toàn và không học gì.
   - C. Xóa mọi log.
   - D. Đổ lỗi cho người báo cáo.
   - Đáp án: A

### Quiz cuối Module 9

Nội dung quiz 10-15 câu nên bao phủ:

- Security awareness.
- Quy trình xác minh.
- SOC.
- Incident response.
- Deepfake trong chuỗi tấn công.
- GRC.
- Chính sách và bài học sau sự cố.

---

## Midterm 3 - Sau Module 7, 8, 9

### Mục tiêu

Kiểm tra khả năng phòng ngừa và ứng phó.

### Quy mô

20-30 câu.

### Nội dung

- Dấu vết số cá nhân.
- Xác minh yêu cầu nhạy cảm.
- Chia sẻ có trách nhiệm.
- Lưu bằng chứng.
- Báo cáo nền tảng.
- SOC/GRC ở mức nhập môn.
- Quy trình tổ chức.

---

# Final Exam - Bài kiểm tra cuối khóa

## Mục tiêu

Final exam đánh giá năng lực tổng hợp của học viên sau toàn bộ khóa `DEEPFENSE BASICS`.

## Cấu trúc

- Tổng ngân hàng: 150 câu.
- Chia thành 3 đề: Đề A, Đề B, Đề C.
- Mỗi đề: 50 câu.
- Hệ thống random một trong ba đề hoặc xoay vòng theo attempt.
- Mỗi đề bao phủ đủ 9 module.

## Phân bổ đề 50 câu

- Module 1: 6 câu.
- Module 2: 6 câu.
- Module 3: 5 câu.
- Module 4: 7 câu.
- Module 5: 6 câu.
- Module 6: 6 câu.
- Module 7: 5 câu.
- Module 8: 5 câu.
- Module 9: 4 câu.

## Mức độ câu hỏi

- 50% câu nhận biết/hiểu.
- 30% câu áp dụng tình huống.
- 20% câu phân tích lựa chọn phản ứng phù hợp.

## Quy tắc khóa khi không đạt

- Lần 1: khóa 1 giờ.
- Lần 2: khóa 24 giờ.
- Lần 3: khóa 3 ngày.
- Lần 4: khóa 1 tuần.
- Sau 1 tuần: reset chu kỳ.

## Điều kiện đạt

Đề xuất:

- Điểm đạt: 70%.
- Hoàn thành đủ 9 module.
- Hoàn thành 3 midterm.
- Không có hành vi anti-cheat nghiêm trọng.

## Certificate

Sau khi đạt final exam:

- Cấp chứng chỉ: `DEEPFENSE AWARE`.
- Reward: `500 DPF`.
- Certificate có `certificateId`.
- Có trang verify: `deepfense.online/verify/{certificateId}`.
- Có thể chia sẻ LinkedIn.

---

# Gợi ý cấu trúc dữ liệu để nhúng vào web

## Course

```json
{
  "id": "deepfense-basics",
  "title": "DEEPFENSE BASICS",
  "language": "vi",
  "subtitleLanguage": "en",
  "credential": "DEEPFENSE AWARE",
  "reward": { "amount": 500, "symbol": "DPF" }
}
```

## Module

```json
{
  "id": "module-1",
  "title": "Deepfake là gì?",
  "part": "fundamentals",
  "order": 1,
  "scenario": "...",
  "sections": ["1.1", "1.2", "1.3"],
  "quizId": "module-1-quiz"
}
```

## Section

```json
{
  "id": "1.1",
  "title": "Giới thiệu và định nghĩa",
  "lessons": ["1.1.1", "1.1.2", "1.1.3", "1.1.4", "1.1.5"],
  "checkpointId": "checkpoint-1.1"
}
```

## Lesson

```json
{
  "id": "1.1.1",
  "title": "Giới thiệu vấn đề deepfake",
  "video": "module-1/1-1-1-deepfake-problem.vi.mp4",
  "subtitle": "module-1/1-1-1-deepfake-problem.en.vtt",
  "image": "module-1/1-1-1-viral-flow.png",
  "contentMarkdown": "...",
  "hasQuiz": false
}
```

## Checkpoint

```json
{
  "id": "checkpoint-1.1",
  "randomize": false,
  "questions": ["q1", "q2", "q3"]
}
```

## Module Quiz

```json
{
  "id": "module-1-quiz",
  "randomizeQuestions": true,
  "randomizeAnswers": true,
  "questionCount": 10,
  "passingScore": 70
}
```

---

# Nguyên tắc biên tập nội dung

1. Viết tiếng Việt là chính.
2. Thuật ngữ tiếng Anh chỉ giữ khi là thuật ngữ chuyên môn phổ biến.
3. Mỗi khái niệm khó cần có ví dụ đời thường.
4. Không hướng dẫn tạo deepfake hoặc vượt hệ thống phát hiện.
5. Luôn nhấn mạnh học để bảo vệ bản thân, cộng đồng và tổ chức.
6. Không dùng nội dung minh họa nhạy cảm hoặc có thể làm hại nạn nhân.
7. Với ví dụ giọng nói/khuôn mặt, nên dùng dữ liệu tự tạo hoặc có sự đồng ý.
8. Tách rõ: raw lesson content, checkpoint, module quiz, midterm, final exam.

