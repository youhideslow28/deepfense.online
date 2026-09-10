# Deepfense — kế hoạch Khiên Nguồn gốc & Quyền dùng

Ngày nghiên cứu: 08/09/2026

## Quyết định sản phẩm

Deepfense nên chuyển từ tên gọi “Fawkes Shield” sang **Provenance & Use-Rights Shield**. Mục tiêu không phải hứa rằng một ảnh sẽ không thể bị sao chép hoặc không thể bị nhận diện, mà là tạo một chuỗi tín hiệu có thể kiểm tra:

1. Ảnh được tạo/chụp/chỉnh sửa như thế nào?
2. Ai hoặc hệ thống nào đã ký xác nhận các thông tin đó?
3. Ảnh có được phép dùng cho data mining, suy luận AI, huấn luyện AI thường hoặc huấn luyện AI tạo sinh không?
4. Người xem cần thấy nhãn ngắn nào, và có thể mở phần chi tiết nào?

## Chuẩn nên dùng

### 1. C2PA 2.4 / Content Credentials — nguồn gốc và tính toàn vẹn

C2PA 2.4 là bản kỹ thuật mới nhất tìm được tại thời điểm nghiên cứu (phát hành tháng 04/2026). Một C2PA Manifest gắn nội dung với hash, assertion, claim và chữ ký số. Validator có thể phân biệt manifest hợp lệ, được tin cậy, không hợp lệ, hoặc không có provenance.

C2PA **không tự kết luận “thật/giả”** và không tự cấp/thu hồi quyền sử dụng. Nó cung cấp trust signals để con người và hệ thống tiêu thụ nội dung tự đánh giá. Manifest có thể nằm trong file, trong sidecar `.c2pa`, hoặc được truy hồi từ manifest từ xa.

Nguồn: [C2PA 2.4 Technical Specification](https://spec.c2pa.org/specifications/specifications/2.4/specs/C2PA_Specification.html), [Understanding manifests](https://opensource.contentauthenticity.org/docs/manifest/understanding-manifest/).

### 2. CAWG Training & Data Mining 1.1 — ý định quyền dùng cho AI

Assertion `cawg.training-mining` phiên bản 1.1 cho phép ghi bốn nhóm chính:

- `cawg.data_mining`
- `cawg.ai_inference`
- `cawg.ai_training`
- `cawg.ai_generative_training`

Mỗi nhóm có `allowed`, `notAllowed` hoặc `constrained`. Giá trị `constrained` không được mặc định coi là được phép nếu chưa đọc điều kiện. Assertion phải nằm trong Content Credential đã ký để có giá trị provenance; JSON tải riêng do Deepfense tạo ở giai đoạn hiện tại chỉ là **unsigned user-intent receipt**, không phải C2PA Credential.

Nguồn: [CAWG Training and Data Mining Assertion 1.1](https://cawg.io/training-and-data-mining/1.1/).

### 3. CAWG Identity và Consent — danh tính người trong ảnh, nếu thực sự cần

Không nên dùng computer vision để đoán hoặc tự ghi “ai ở sau ảnh”. C2PA có thể ghi danh tính của claim signer/creator khi họ chủ động khai báo; điều đó không đồng nghĩa với việc xác định danh tính của người xuất hiện trong ảnh.

CAWG Consent Assertion 1.0 hiện vẫn là **working draft**. Nó mô hình hóa một liên kết có chữ ký tới consent authority, trong đó quyền đồng ý có thể thay đổi hoặc bị rút lại ở nguồn tham chiếu. Bản nháp cũng nói rõ assertion không tự lưu consent, không giải quyết xung đột và không tự thực thi điều khoản.

Nguồn: [C2PA Human and Organizational Identity Recommendation](https://spec.c2pa.org/specifications/specifications/2.4/identity/identity.html), [CAWG Consent Assertion 1.0 draft](https://cawg.io/consent/1.0-draft%2Binitial-version/).

### 4. IPTC Photo Metadata 2025.1 — ngữ cảnh AI bổ sung

IPTC 2025.1 bổ sung các trường cho prompt, tên người viết prompt, hệ thống AI và phiên bản hệ thống AI. Đây là metadata mô tả, nên dùng cùng C2PA chứ không thay thế chữ ký C2PA.

Nguồn: [IPTC Photo Metadata Standard](https://iptc.org/standards/photo-metadata/iptc-standard/).

## Ai sẽ đọc nhãn?

| Người đọc | Đọc gì | Deepfense nên hiển thị |
|---|---|---|
| Người xem phổ thông | Nhãn L1 ở cạnh ảnh/video | “Content Credentials”, “AI-generated”, “AI-edited”, “Provenance unavailable” |
| Người dùng cần kiểm tra | L2/L3 | signer, claim generator, nguồn số, các action, trạng thái chữ ký, chuỗi ingredients |
| Trình duyệt/app/nền tảng có SDK | Manifest và assertion máy đọc được | `cawg.training-mining` và validation results |
| AI/data consumer | Chính sách sử dụng | notAllowed/constrained/allowed; phải tự xây enforcement |
| Deepfense Trust Center | Toàn bộ bằng chứng cục bộ | SHA-256, metadata, C2PA report, AI scan, ngữ cảnh rủi ro |

C2PA UX khuyến nghị L1 là tín hiệu ngắn, dễ nhận biết; nhấp vào đó mở L2, rồi L3 cho chi tiết. Không nên đặt icon như một phần pixel ảnh vì dễ bị giả mạo hoặc bị hiểu là watermark của nội dung.

Nguồn: [C2PA User Experience Guidance](https://spec.c2pa.org/specifications/specifications/2.2/ux/UX_Recommendations.html).

## Điều “không có quyền được dùng” có thực sự chặn được không?

Chưa. Cần nói chính xác trong sản phẩm:

- `notAllowed` là một **tuyên bố quyền/ý định có thể kiểm tra**, không phải firewall.
- File có thể bị screenshot, re-encode, xóa metadata hoặc tải lại qua nền tảng không hỗ trợ C2PA.
- Một nền tảng tuân thủ phải đọc assertion, áp dụng policy của mình, từ chối pipeline tương ứng hoặc yêu cầu xin phép.
- Quyền pháp lý không phát sinh chỉ vì có một trường metadata; quyền đó phải dựa trên rights holder, hợp đồng, consent authority và pháp luật áp dụng.
- Khi không có consent authority hoặc không thể resolve quyền đối với khuôn mặt/giọng nói, luồng rủi ro cao nên mặc định **tạm dừng để xác minh**, không coi im lặng là được phép.

EU AI Act Article 50 cũng đi theo hướng đánh dấu machine-readable và công khai nội dung deepfake; đây là nghĩa vụ minh bạch của provider/deployer, không phải cơ chế DRM tuyệt đối.

Nguồn: [EU AI Act — Article 50](https://eur-lex.europa.eu/eli/reg/2024/1689/oj?locale=en).

## Kiến trúc Deepfense đề xuất

```text
User selects media
       |
       +--> Local SHA-256 + EXIF/IPTC/XMP
       |
       +--> C2PA Reader (browser, read-only)
       |       +--> validation state
       |       +--> source type/actions/signer
       |       +--> training-mining policy
       |       +--> consent reference (nếu có)
       |
       +--> Manual verification checklist
       |
       +--> L1/L2/L3 UI + evidence package after benchmark

Publishing path (giai đoạn sau):
  source -> C2PA Builder -> KMS/HSM signer -> signed asset / .c2pa sidecar
                          -> platform validator -> policy enforcement
```

## Lộ trình phát triển

### P0 — trạng thái hiện tại trong repo này

- Khóa máy quét AI công khai, upload media, điểm rủi ro AI và giám định tự động cho tới khi có dataset, model và benchmark rõ ràng.
- Endpoint scan trả trạng thái khóa, không xử lý file và không đưa kết luận thật/giả.
- Đổi Protective Shield thành tờ khai quyền dùng ảnh; mặc định bốn loại dùng AI là `notAllowed`.
- Tạo JSON sidecar có SHA-256 và trạng thái `signed: false`, ghi rõ ai đọc được và giới hạn enforcement.
- Chưa bundle trình đọc/ký C2PA trong frontend. Phần Content Credentials/C2PA là hướng P1 sau kiểm thử hiệu năng, quyền riêng tư và pháp lý.
- Không tự nhận diện người trong ảnh và không công khai danh tính không được người dùng khai báo.

### P1 — phát hành bản C2PA ký thật

1. Dựng endpoint server-side hoặc job worker dùng SDK/tooling C2PA phù hợp, ưu tiên kiểm thử với `c2patool` trước khi chọn package production.
2. Xin certificate phù hợp trust model; private key phải nằm trong KMS/HSM, không nằm trong bundle frontend.
3. Ký manifest cho các format ưu tiên: JPEG/PNG/WebP trước, MP4 sau.
4. Ghi `digitalSourceType` đúng ngữ cảnh: digital capture, composite, trained algorithmic media, không gán nhãn AI chỉ vì kết quả detector.
5. Ghi `cawg.training-mining@1.1` cùng chính sách người dùng chọn.
6. Trả về asset đã ký và/hoặc `.c2pa` sidecar; lưu bản gốc và bản đã ký riêng.

### P2 — quyền khuôn mặt/giọng nói có thể thu hồi

- Tạo consent authority của Deepfense với record ID bền vững, lịch sử thay đổi và trạng thái hiện hành.
- Chỉ dùng Consent Assertion khi người có quyền đồng ý trực tiếp hoặc có đại diện hợp lệ.
- Tách `identity consent` (likeness/voice/persona) khỏi `asset consent` (quyền dùng file).
- Hiển thị rõ “reference resolved / unresolved / revoked”; không gọi bản draft này là giấy phép pháp lý.

### P3 — enforcement và kiểm thử chống tháo nhãn

- Validator trong upload pipeline, moderation queue và browser extension.
- Kiểm tra cả embedded manifest, `.c2pa` sidecar, remote manifest và soft binding khi manifest bị tách khỏi file.
- Test bộ biến đổi: screenshot, resize, JPEG re-encode, crop, metadata strip, transcoding video, screen-record.
- Đo false positive/false negative của AI detector riêng với provenance; không trộn “có chữ ký” thành “an toàn tuyệt đối”.

## Tiêu chí nghiệm thu

- Một ảnh có C2PA hợp lệ hiển thị signer và validation state chính xác.
- Một ảnh bị sửa sau khi ký hiển thị `invalid` hoặc trạng thái validation tương ứng.
- Một ảnh không có C2PA hiển thị “chưa có provenance có chữ ký”, không hiển thị “deepfake”.
- `notAllowed` của `cawg.ai_generative_training` được đọc thành nhãn dễ hiểu cho người dùng và flag máy đọc được.
- Không một đường dẫn frontend nào chứa private key hoặc certificate secret.
- Người dùng có thể tải ảnh gốc, JSON receipt và báo cáo evidence riêng biệt; không nhầm JSON unsigned với Content Credential đã ký.
- UI có L1 rõ ràng, L2/L3 có giải thích và link tới nguồn; không đặt biểu tượng C2PA giả lên pixel ảnh.

## Rủi ro cần nói thẳng

1. Provenance có thể bị xóa; cần soft binding/manifest recovery và vẫn phải giữ bản gốc.
2. Metadata có thể bị giả nếu không có chữ ký/trust chain.
3. Content Credentials mô tả provenance, không phải detector deepfake; cần giữ AI forensics và xác minh hành vi độc lập.
4. “Không cấp phép AI” là tín hiệu policy; enforcement phụ thuộc nền tảng và hợp đồng/quy định pháp lý.
5. Consent Assertion hiện còn draft; không nên làm dependency bắt buộc cho MVP.
