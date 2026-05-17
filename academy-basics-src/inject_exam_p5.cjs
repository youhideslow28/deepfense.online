'use strict';
const fs = require('fs');
const path = require('path');

const fp = path.join(__dirname, 'src', 'data', 'exam-bank.js');
let src = fs.readFileSync(fp, 'utf8');

const S = '  // ── M5-EXAM-S ──────────────────────────────────────────────────────────────';
const E = '  // ── M5-EXAM-E ──────────────────────────────────────────────────────────────';

const si = src.indexOf(S);
const ei = src.indexOf(E);
if (si === -1) throw new Error('Start marker M5-EXAM-S not found');
if (ei === -1) throw new Error('End marker M5-EXAM-E not found');

const before = src.slice(0, si);
const after  = src.slice(ei + E.length);

const section = `  // ── M5-EXAM-S ──────────────────────────────────────────────────────────────
  // MODULE 5 — Rủi ro đời sống số (Q106–Q135)
  eq('Q106', 5, 'red_flags', 'Người thân gọi video mờ, yêu cầu chuyển tiền vào tài khoản lạ. Dấu hiệu đỏ mạnh nhất là gì?', [
    'Yêu cầu chuyển tiền gấp vào tài khoản lạ.',
    'Video hơi mờ.',
    'Cuộc gọi ngắn.',
    'Màn hình nhỏ.',
  ], 0, 'Ngữ cảnh tài chính và tài khoản lạ là rủi ro cao.'),

  eq('Q107', 5, 'response', 'Với yêu cầu tiền từ người thân, hành động an toàn là gì?', [
    'Gọi lại số đã lưu/người thân khác trước khi chuyển.',
    'Chuyển ngay.',
    'Gửi OTP.',
    'Bấm link họ gửi.',
  ], 0, 'Xác minh qua kênh độc lập là then chốt.'),

  eq('Q108', 5, 'red_flags', 'Dấu hiệu đỏ khi "sếp" yêu cầu xử lý tiền là gì?', [
    'Bỏ qua quy trình vì gấp.',
    'Gửi đúng giờ hành chính.',
    'Dùng câu chào.',
    'Không có ảnh.',
  ], 0, 'Bỏ quy trình là dấu hiệu rủi ro.'),

  eq('Q109', 5, 'response', 'Người tự xưng công an/ngân hàng yêu cầu chuyển vào "tài khoản an toàn". Bạn nên làm gì?', [
    'Không chuyển, xác minh qua kênh chính thức.',
    'Chuyển ngay.',
    'Chuyển một nửa.',
    'Gửi thêm giấy tờ.',
  ], 0, 'Đây là kịch bản lừa đảo nguy hiểm.'),

  eq('Q110', 5, 'response', 'OTP nên được xử lý thế nào?', [
    'Không cung cấp qua cuộc gọi/tin nhắn/link lạ.',
    'Gửi nếu người gọi biết tên bạn.',
    'Gửi một nửa.',
    'Đăng công khai để hỏi.',
  ], 0, 'OTP là chìa khóa tài khoản.'),

  eq('Q111', 5, 'red_flags', 'Video người nổi tiếng hứa lợi nhuận cao, rủi ro thấp có dấu hiệu gì?', [
    'Lừa đảo đầu tư tiềm tàng.',
    'Chắc chắn chính thức.',
    'Luôn hợp pháp.',
    'Không cần kiểm tra.',
  ], 0, 'Lời hứa tài chính quá tốt cần cảnh giác.'),

  eq('Q112', 5, 'response', 'Mã QR/link trong video lạ yêu cầu đăng nhập nhận quà nên được xử lý thế nào?', [
    'Không quét/không đăng nhập; kiểm tra kênh chính thức.',
    'Quét ngay.',
    'Nhập OTP để nhận nhanh.',
    'Gửi cho bạn bè nhập thử.',
  ], 0, 'QR/link có thể dẫn đến phishing.'),

  eq('Q113', 5, 'verification', 'Quy tắc "không chuyển tiền khi bị ép thời gian" thuộc phần nào?', [
    'Quy tắc vàng về tiền/Money Delay.',
    'Edited media.',
    'Lip sync.',
    'Metadata.',
  ], 0, 'Trì hoãn giúp có thời gian xác minh.'),

  eq('Q114', 5, 'response', 'Nếu đã lỡ chuyển tiền nghi bị lừa, việc nên làm sớm là gì?', [
    'Liên hệ ngân hàng, lưu bằng chứng, báo cáo.',
    'Xóa hết tin nhắn.',
    'Im lặng vì xấu hổ.',
    'Chuyển thêm để lấy lại tiền.',
  ], 0, 'Hành động nhanh có thể giảm thiệt hại.'),

  eq('Q115', 5, 'ethics', '"Ảnh giả thì không gây hại thật" đúng hay sai?', [
    'Sai.',
    'Đúng.',
    'Chỉ đúng nếu ảnh nhỏ.',
    'Chỉ đúng trong nhóm lớp.',
  ], 0, 'Hình ảnh giả vẫn có thể gây tổn thương, bắt nạt, tống tiền.'),

  eq('Q116', 5, 'response', 'Thấy ảnh nhạy cảm của bạn học trong nhóm, hành động đúng là gì?', [
    'Không lan truyền, báo cáo, hỗ trợ người bị hại.',
    'Xin bản gốc.',
    'Gửi cho bạn thân.',
    'Bình luận đùa.',
  ], 0, 'Giảm lan truyền là ưu tiên.'),

  eq('Q117', 5, 'ethics', 'Nếu bạn là người chứng kiến vụ lan truyền ảnh nhạy cảm, câu nào hữu ích?', [
    '"Đừng gửi tiếp nữa, dù thật hay giả cũng đang làm hại người khác."',
    '"Gửi mình xem với."',
    '"Ai có bản rõ hơn không?"',
    '"Tag người đó vào."',
  ], 0, 'Người chứng kiến có thể giúp chặn lan truyền.'),

  eq('Q118', 5, 'response', 'Nếu bạn là người bị hại trong ảnh/video giả mạo, điều nên làm là gì?', [
    'Tìm người tin cậy, lưu bằng chứng an toàn, báo cáo.',
    'Tự thương lượng trong hoảng loạn.',
    'Xóa hết và im lặng.',
    'Gửi thêm ảnh để giải thích.',
  ], 0, 'Không nên xử lý một mình khi bị tống tiền/xâm hại.'),

  eq('Q119', 5, 'verification', 'Clip xã hội 10 giây gây phẫn nộ cần kiểm tra gì?', [
    'Nguồn gốc, bản đầy đủ, thời gian, địa điểm, nguồn độc lập.',
    'Chỉ số like.',
    'Nhạc nền.',
    'Màu áo người quay.',
  ], 0, 'Clip ngắn dễ thiếu bối cảnh.'),

  eq('Q120', 5, 'concept', 'Nội dung thật nhưng đặt sai địa điểm/thời gian nguy hiểm vì sao?', [
    'Dẫn đến kết luận sai dù "chất liệu" là thật.',
    'Luôn vô hại.',
    'Không thể lan truyền.',
    'Chỉ xảy ra với ảnh đen trắng.',
  ], 0, 'Sai bối cảnh có thể nguy hiểm như nội dung giả.'),

  eq('Q121', 5, 'ethics', 'Cách nói có trách nhiệm khi chưa chắc một video thật/giả là gì?', [
    '"Tôi chưa thấy nguồn rõ, cần kiểm chứng thêm."',
    '"Giả hết."',
    '"Thật 100%."',
    '"Cứ chia sẻ đã."',
  ], 0, 'Tránh phủ nhận/tin tuyệt đối khi chưa đủ bằng chứng.'),

  eq('Q122', 5, 'ethics', 'Trước khi chia sẻ nội dung xã hội gây sốc, nên hỏi gì?', [
    'Nếu sai, ai có thể bị hại?',
    'Có nhiều emoji không?',
    'Mình có thích không?',
    'Video có dài không?',
  ], 0, 'Chia sẻ sai có thể gây hại thật.'),

  eq('Q123', 5, 'red_flags', 'Người quen online 2 tuần xin tiền và né gặp mặt. Dấu hiệu gì?', [
    'Romance scam/danh tính giả tiềm tàng.',
    'Chắc chắn đáng tin.',
    'Không cần xác minh.',
    'Chỉ là lỗi mạng.',
  ], 0, 'Tạo thân thiết nhanh rồi xin tiền là red flag.'),

  eq('Q124', 5, 'response', 'Với người mới quen online, không nên gửi gì?', [
    'Tiền, giấy tờ, ảnh nhạy cảm, thông tin tài khoản.',
    'Một lời chào lịch sự.',
    'Câu hỏi chung chung.',
    'Lịch học đã công khai.',
  ], 0, 'Đây là dữ liệu/tài sản rủi ro cao.'),

  eq('Q125', 5, 'red_flags', 'Việc nhẹ lương cao yêu cầu phí giữ chỗ và ảnh căn cước có dấu hiệu gì?', [
    'Lừa đảo việc làm/thu thập dữ liệu.',
    'Cơ hội chắc chắn.',
    'Học bổng chính thức.',
    'Không cần kiểm tra.',
  ], 0, 'Phí trước và giấy tờ cá nhân quá sớm là red flag.'),

  eq('Q126', 5, 'verification', 'Kiểm tra học bổng/việc làm an toàn bằng cách nào?', [
    'Kiểm tra nguồn/tổ chức chính thức và liên hệ qua thông tin tự tìm được.',
    'Chỉ tin người nhắn.',
    'Gửi giấy tờ trước.',
    'Đóng phí giữ chỗ ngay.',
  ], 0, 'Không chỉ dùng thông tin trong tin nhắn nghi vấn.'),

  eq('Q127', 5, 'red_flags', '"Chuyên gia AI" trong video có biểu đồ lợi nhuận và cam kết không rủi ro. Điều cần nhớ?', [
    'Video chuyên nghiệp không biến lời hứa tài chính thành đáng tin.',
    'Cứ có biểu đồ là thật.',
    'Cứ có giọng tự tin là đúng.',
    'Không cần nguồn.',
  ], 0, 'Cần kiểm tra năng lực, pháp lý, nguồn và red flags.'),

  eq('Q128', 5, 'response', 'Cách bảo vệ danh tính số là gì?', [
    'Hạn chế công khai số điện thoại, giấy tờ, lịch trình; bật 2FA.',
    'Đăng mọi thông tin để minh bạch.',
    'Dùng cùng mật khẩu mọi nơi.',
    'Chấp nhận mọi kết bạn.',
  ], 0, 'Giảm dữ liệu công khai và bảo vệ tài khoản làm giảm rủi ro.'),

  eq('Q129', 5, 'concept', 'Vì sao video giọng nói dài công khai có thể tăng rủi ro?', [
    'Có thể cung cấp nguyên liệu cho mạo danh/deepvoice.',
    'Vì âm thanh dài luôn xấu.',
    'Vì không ai nghe.',
    'Vì không liên quan bảo mật.',
  ], 0, 'Giọng nói là dữ liệu cá nhân có thể bị lợi dụng.'),

  eq('Q130', 5, 'response', 'Tình huống ảnh nhạy cảm trong nhóm lớp, bước quan trọng nhất thường là gì?', [
    'Pause và Decide để không lan truyền, báo cáo.',
    'Trace công khai trong nhóm.',
    'Chia sẻ sang nhóm khác.',
    'Bình luận vui.',
  ], 0, 'Giảm hại trước khi thỏa mãn tò mò.'),

  eq('Q131', 5, 'verification', 'Tình huống clip gây phẫn nộ không nguồn, bước quan trọng là gì?', [
    'Trace và Decide.',
    'Chuyển tiền.',
    'Gửi OTP.',
    'Tạo family code.',
  ], 0, 'Cần truy nguồn và quyết định không lan truyền/bêu tên.'),

  eq('Q132', 5, 'response', 'Người quen online xin tiền, bước quan trọng là gì?', [
    'Verify và không chuyển tiền khi chưa xác minh.',
    'Chuyển tiền để thử lòng.',
    'Gửi giấy tờ.',
    'Bấm link nhận quà.',
  ], 0, 'Danh tính online có thể bị dựng giả.'),

  eq('Q133', 5, 'ethics', 'Với hình ảnh nhạy cảm nghi deepfake, vì sao "không biết thật giả" không phải lý do để chia sẻ?', [
    'Vì lan truyền vẫn có thể gây hại danh dự/tâm lý và hậu quả pháp lý.',
    'Vì ảnh không có âm thanh.',
    'Vì người khác sẽ tự hiểu.',
    'Vì chia sẻ giúp kiểm chứng tốt hơn.',
  ], 0, 'Tác hại có thể xảy ra dù nội dung là giả.'),

  eq('Q134', 5, 'red_flags', '"Nạp trước 1 triệu để mở tài khoản ưu tiên" trong video đầu tư là dấu hiệu gì?', [
    'Yêu cầu tiền trước trong bối cảnh rủi ro.',
    'Bằng chứng chính thức.',
    'Nội dung giáo dục.',
    'Không liên quan lừa đảo.',
  ], 0, 'Nạp tiền trước và áp lực thời gian là red flags.'),

  eq('Q135', 5, 'concept', 'Bài học lớn của Module 5 là gì?', [
    'Deepfake nguy hiểm vì xuất hiện trong tiền thật, danh dự thật, nỗi sợ thật và hậu quả thật.',
    'Deepfake chỉ là trò vui.',
    'Chỉ người nổi tiếng mới bị ảnh hưởng.',
    'Không cần quy trình khi gặp rủi ro.',
  ], 0, 'Deepfake là lớp mạo danh phủ lên nhiều vấn đề đời sống.'),
  // ── M5-EXAM-E ──────────────────────────────────────────────────────────────`;

fs.writeFileSync(fp, before + section + after, 'utf8');
console.log('Done. EXAM_BANK entries so far:', (before + section + after).match(/eq\('/g)?.length || 0);
