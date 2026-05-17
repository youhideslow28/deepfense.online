'use strict';
const fs = require('fs');
const path = require('path');

const fp = path.join(__dirname, 'src', 'data', 'exam-bank.js');
let src = fs.readFileSync(fp, 'utf8');

const S = '  // ── M4-EXAM-S ──────────────────────────────────────────────────────────────';
const E = '  // ── M4-EXAM-E ──────────────────────────────────────────────────────────────';

const si = src.indexOf(S);
const ei = src.indexOf(E);
if (si === -1) throw new Error('Start marker M4-EXAM-S not found');
if (ei === -1) throw new Error('End marker M4-EXAM-E not found');

const before = src.slice(0, si);
const after  = src.slice(ei + E.length);

const section = `  // ── M4-EXAM-S ──────────────────────────────────────────────────────────────
  // MODULE 4 — Deepfense Check (Q076–Q105)
  eq('Q076', 4, 'verification', 'Thứ tự đúng của Deepfense Check là gì?', [
    'Pause - Observe - Verify - Trace - Decide.',
    'Decide - Trace - Verify - Observe - Pause.',
    'Observe - Pay - Share - Delete - Decide.',
    'Trace - Share - Believe - Pay - Pause.',
  ], 0, 'Đây là quy trình cốt lõi của khóa học.'),

  eq('Q077', 4, 'verification', 'Bước Pause giúp bạn làm gì?', [
    'Không để cảm xúc và áp lực điều khiển hành động.',
    'Kết luận ngay là giả.',
    'Tăng lượt chia sẻ.',
    'Bỏ qua xác minh.',
  ], 0, 'Pause lấy lại quyền kiểm soát tốc độ phản ứng.'),

  eq('Q078', 4, 'verification', 'Observe nên bao gồm các lớp nào?', [
    'Hình ảnh/video, âm thanh, ngữ cảnh.',
    'Chỉ khuôn mặt.',
    'Chỉ bình luận.',
    'Chỉ số lượt xem.',
  ], 0, 'Quan sát đủ ba lớp giúp giảm bỏ sót rủi ro.'),

  eq('Q079', 4, 'verification', 'Verify tốt nhất với tài khoản quen mượn tiền là gì?', [
    'Gọi số đã lưu hoặc kênh độc lập đã biết.',
    'Hỏi lại trong cùng tài khoản.',
    'Chuyển tiền nhỏ trước.',
    'Tin vì ảnh đại diện đúng.',
  ], 0, 'Nếu tài khoản bị chiếm quyền, hỏi trong cùng kênh không đủ.'),

  eq('Q080', 4, 'verification', 'Trace đặc biệt hữu ích với nội dung nào?', [
    'Clip lan truyền gây phẫn nộ hoặc ảnh sự kiện nghi sai bối cảnh.',
    'OTP cá nhân.',
    'Mật khẩu Wi-Fi nhà bạn.',
    'Ảnh minh họa có ghi AI rõ ràng.',
  ], 0, 'Trace giúp tìm nguồn đầu tiên, bản đầy đủ và bối cảnh.'),

  eq('Q081', 4, 'verification', 'Decide có thể là gì?', [
    'Không chia sẻ, không chuyển tiền, báo cáo, lưu bằng chứng, kiểm chứng thêm.',
    'Luôn tin hoặc luôn phủ nhận.',
    'Chỉ bấm link.',
    'Chỉ xem bình luận.',
  ], 0, 'Quyết định an toàn có nhiều dạng, không chỉ thật/giả.'),

  eq('Q082', 4, 'verification', 'Có phải tình huống nào cũng cần đủ 5 bước cứng nhắc không?', [
    'Không, tùy rủi ro; ví dụ OTP có thể quyết định ngay là không gửi.',
    'Có, luôn đủ 5 bước trước mọi việc.',
    'Chỉ cần bước Trace.',
    'Chỉ cần detector.',
  ], 0, 'Quy trình là bản đồ linh hoạt, không phải thủ tục cứng.'),

  eq('Q083', 4, 'verification', 'Kênh độc lập tốt có đặc điểm gì?', [
    'Đã biết từ trước, không do người nghi vấn cung cấp trong lúc khẩn cấp.',
    'Link mới gửi trong chat.',
    'Số mới người gọi vừa đưa.',
    'QR lạ trong tin nhắn.',
  ], 0, 'Kênh độc lập giúp thoát khỏi vùng kẻ xấu có thể kiểm soát.'),

  eq('Q084', 4, 'verification', 'Kênh nào không nên tin ngay?', [
    'Link xác minh do người đang yêu cầu tiền vừa gửi.',
    'Số điện thoại đã lưu lâu.',
    'App chính thức tự mở.',
    'Người thân khác đã biết.',
  ], 0, 'Link trong tình huống nghi vấn có thể là mồi lừa.'),

  eq('Q085', 4, 'response', 'Family code nên dựa trên gì?', [
    'Cụm từ riêng, không công khai, khó đoán từ mạng xã hội.',
    'Ngày sinh công khai.',
    'Tên thú cưng đã đăng.',
    'Địa chỉ nhà.',
  ], 0, 'Family code cần tránh thông tin công khai.'),

  eq('Q086', 4, 'response', 'Sếp yêu cầu đổi tài khoản nhận tiền qua tin nhắn lạ. Nên làm gì?', [
    'Xác minh qua quy trình/kênh nội bộ chính thức.',
    'Đổi ngay.',
    'Gửi OTP.',
    'Tin nếu giọng giống.',
  ], 0, 'Thay đổi tài khoản nhận tiền là rủi ro cao.'),

  eq('Q087', 4, 'verification', 'Trước khi dùng công cụ kiểm chứng, điều gì cần nhớ?', [
    'Không tải dữ liệu nhạy cảm lên công cụ lạ.',
    'Tải mọi thứ lên càng nhiều càng tốt.',
    'Công cụ nào cũng bảo mật.',
    'Công cụ luôn đúng.',
  ], 0, 'Kiểm chứng không được tạo thêm rủi ro.'),

  eq('Q088', 4, 'verification', 'Reverse image search dùng để làm gì?', [
    'Tìm xem ảnh đã xuất hiện ở đâu, khi nào, trong bối cảnh nào.',
    'Tăng độ sáng ảnh.',
    'Đổi mật khẩu.',
    'Xóa bình luận.',
  ], 0, 'Tìm kiếm ngược giúp phát hiện ảnh cũ/sai bối cảnh.'),

  eq('Q089', 4, 'verification', 'Cắt frame từ video giúp gì?', [
    'Dùng khung hình đặc trưng để tìm nguồn/bối cảnh video.',
    'Chắc chắn phát hiện mọi deepfake.',
    'Tự động lấy lại tiền.',
    'Đổi giọng nói.',
  ], 0, 'Khung hình rõ có thể dùng để reverse search.'),

  eq('Q090', 4, 'verification', 'Với video người nổi tiếng quảng cáo đầu tư, nên kiểm tra gì?', [
    'Kênh chính thức của người nổi tiếng/tổ chức và nguồn độc lập.',
    'Chỉ bình luận tích cực.',
    'Chỉ số lượt xem.',
    'Chỉ nhạc nền.',
  ], 0, 'Kênh chính thức là tín hiệu xác minh quan trọng.'),

  eq('Q091', 4, 'verification', 'Khi nhận link đăng nhập ngân hàng qua tin nhắn nghi vấn, nên làm gì?', [
    'Tự mở app/trang chính thức, không đăng nhập qua link đó.',
    'Đăng nhập ngay.',
    'Gửi link cho nhiều người bấm thử.',
    'Nhập OTP để kiểm tra.',
  ], 0, 'Link giả có thể đánh cắp tài khoản.'),

  eq('Q092', 4, 'verification', 'Không có metadata/content credentials có nghĩa là nội dung chắc chắn giả?', [
    'Không.',
    'Có.',
    'Chỉ với ảnh màu.',
    'Chỉ với video dài.',
  ], 0, 'Metadata có thể bị xóa khi đăng/chụp màn hình/nén.'),

  eq('Q093', 4, 'verification', 'Detector báo "AI 90%" nên được hiểu thế nào?', [
    'Tín hiệu nghi vấn cần kiểm chứng thêm, không phải phán quyết cuối cùng.',
    'Chắc chắn có thể bêu tên.',
    'Chắc chắn phải chia sẻ.',
    'Không cần nguồn.',
  ], 0, 'Kết quả detector cần đặt trong quy trình kiểm chứng.'),

  eq('Q094', 4, 'response', 'Ảnh nhạy cảm nghi của bạn học xuất hiện. Bước Decide an toàn là gì?', [
    'Không lan truyền, báo cáo, tìm người có trách nhiệm hỗ trợ.',
    'Gửi tiếp để hỏi.',
    'Phân tích công khai.',
    'Lưu vào máy.',
  ], 0, 'Giảm lan truyền là ưu tiên.'),

  eq('Q095', 4, 'verification', '"Không cần biết chắc 100% mới được chọn phương án an toàn" nghĩa là gì?', [
    'Nếu rủi ro cao và chưa xác minh, bạn có thể từ chối hành động.',
    'Có thể kết luận bừa.',
    'Không cần học nữa.',
    'Luôn coi mọi thứ là giả.',
  ], 0, 'An toàn không đòi hỏi bằng chứng tuyệt đối về deepfake.'),

  eq('Q096', 4, 'verification', 'Ảnh chụp màn hình bình luận không có link gốc nên được xem thế nào?', [
    'Chưa đủ bằng chứng, cần nguồn gốc/bài gốc.',
    'Chứng cứ tuyệt đối.',
    'Luôn là thật.',
    'Không bao giờ bị chỉnh sửa.',
  ], 0, 'Ảnh chụp màn hình dễ bị chọn lọc/chỉnh sửa.'),

  eq('Q097', 4, 'verification', 'Gọi số mới do người nghi vấn vừa gửi có phải kênh độc lập tốt không?', [
    'Không.',
    'Có.',
    'Chỉ nếu số đẹp.',
    'Chỉ nếu gọi ban ngày.',
  ], 0, 'Kênh do người nghi vấn cung cấp có thể là bẫy.'),

  eq('Q098', 4, 'ethics', 'Với hình ảnh nhạy cảm, không nên làm gì để "kiểm chứng"?', [
    'Tải lên công cụ lạ hoặc gửi cho nhiều người phân tích.',
    'Báo cáo nền tảng.',
    'Hỗ trợ nạn nhân.',
    'Giảm lan truyền.',
  ], 0, 'Kiểm chứng không được làm hại thêm.'),

  eq('Q099', 4, 'response', 'Hồ sơ video đầu tư có link lạ và không có trên kênh chính thức. Hành động an toàn nhất?', [
    'Không bấm link/nạp tiền, kiểm tra thêm và cảnh báo nếu cần.',
    'Nạp thử.',
    'Tin detector.',
    'Chia sẻ link cho mọi người thử.',
  ], 0, 'Ngữ cảnh tài chính và link lạ là rủi ro cao.'),

  eq('Q100', 4, 'response', 'Tin nhắn thoại người thân yêu cầu chuyển tiền và không gọi lại. Bước nào ưu tiên?', [
    'Verify qua số đã lưu/người thân khác.',
    'Trace video gốc.',
    'Tìm bình luận.',
    'Đổi ảnh đại diện.',
  ], 0, 'Xác minh danh tính là ưu tiên.'),

  eq('Q101', 4, 'response', 'Clip 12 giây gây phẫn nộ không có nguồn. Nên làm gì?', [
    'Không chia sẻ, tìm nguồn/bản đầy đủ nếu cần, không bêu tên.',
    'Chia sẻ ngay.',
    'Bêu tên người trong clip.',
    'Kết luận ngay.',
  ], 0, 'Clip ngắn thiếu bối cảnh dễ gây hại.'),

  eq('Q102', 4, 'verification', 'Bước Trace hỏi câu nào?', [
    'Nội dung xuất hiện lần đầu ở đâu?',
    'Mình có thích nội dung không?',
    'Video có nhạc không?',
    'Ảnh có đẹp không?',
  ], 0, 'Trace tìm nguồn gốc và bối cảnh.'),

  eq('Q103', 4, 'verification', 'Bước Observe không nên mắc lỗi nào?', [
    'Không thấy lỗi kỹ thuật rồi tin ngay là thật.',
    'Quan sát ngữ cảnh.',
    'Xem nguồn gửi.',
    'Ghi nhận tín hiệu.',
  ], 0, 'Nội dung giả có thể trông rất thật.'),

  eq('Q104', 4, 'concept', 'Deepfense Check phù hợp với ai?', [
    'Người dùng phổ thông, không cần là chuyên gia.',
    'Chỉ lập trình viên.',
    'Chỉ cơ quan điều tra.',
    'Chỉ nhà làm phim.',
  ], 0, 'Quy trình được thiết kế cho công dân số bình thường.'),

  eq('Q105', 4, 'concept', 'Mục tiêu của Deepfense Check là gì?', [
    'Giảm rủi ro khi gặp nội dung nghi vấn.',
    'Tạo deepfake.',
    'Tăng lượt chia sẻ.',
    'Thay thế mọi luật pháp.',
  ], 0, 'Quy trình giúp ra quyết định an toàn hơn.'),
  // ── M4-EXAM-E ──────────────────────────────────────────────────────────────`;

fs.writeFileSync(fp, before + section + after, 'utf8');
console.log('Done. EXAM_BANK entries so far:', (before + section + after).match(/eq\('/g)?.length || 0);
