'use strict';
const fs = require('fs');
const path = require('path');

const fp = path.join(__dirname, 'src', 'data', 'exam-bank.js');
let src = fs.readFileSync(fp, 'utf8');

const S = '  // ── M2-EXAM-S ──────────────────────────────────────────────────────────────';
const E = '  // ── M2-EXAM-E ──────────────────────────────────────────────────────────────';

const si = src.indexOf(S);
const ei = src.indexOf(E);
if (si === -1) throw new Error('Start marker M2-EXAM-S not found');
if (ei === -1) throw new Error('End marker M2-EXAM-E not found');

const before = src.slice(0, si);
const after  = src.slice(ei + E.length);

const section = `  // ── M2-EXAM-S ──────────────────────────────────────────────────────────────
  // MODULE 2 — Vì sao con người dễ bị lừa? (Q026–Q050)
  eq('Q026', 2, 'red_flags', '"Chuyển tiền trong 5 phút nếu không sẽ có chuyện" khai thác nút bấm nào?', [
    'Khẩn cấp.',
    'Giải trí.',
    'Trang trí.',
    'Kỷ niệm.',
  ], 0, 'Áp lực thời gian làm người học dễ hành động trước khi xác minh.'),

  eq('Q027', 2, 'red_flags', 'Tài khoản quen nhắn tin mượn tiền nhưng cách nhắn là lạ. Rủi ro chính là gì?', [
    'Tài khoản có thể bị chiếm quyền hoặc giả mạo.',
    'Mạng nhà bạn quá nhanh.',
    'Tin ngắn luôn an toàn.',
    'Không có rủi ro nếu ảnh đại diện đúng.',
  ], 0, 'Tài khoản quen không đảm bảo đúng người đang điều khiển.'),

  eq('Q028', 2, 'red_flags', '"Đây là yêu cầu từ cơ quan chức năng, không được nói với ai" khai thác gì?', [
    'Quyền lực và cô lập.',
    'Giải trí.',
    'Tự học.',
    'Thời tiết.',
  ], 0, 'Giả danh quyền lực và cô lập nạn nhân là kỹ thuật lừa đảo phổ biến.'),

  eq('Q029', 2, 'red_flags', 'Video hứa "lợi nhuận chắc chắn, không rủi ro" khai thác nút bấm nào?', [
    'Lợi ích.',
    'Đạo đức.',
    'Âm nhạc.',
    'Chính tả.',
  ], 0, 'Lời hứa quá tốt để tin là dấu hiệu cần cảnh giác.'),

  eq('Q030', 2, 'red_flags', 'Vì sao kẻ xấu hay nói "đừng nói với ai"?', [
    'Để cô lập nạn nhân khỏi người có thể giúp kiểm chứng.',
    'Để bảo vệ bạn hoàn toàn.',
    'Vì mọi giao dịch hợp pháp đều bí mật.',
    'Để tăng chất lượng âm thanh.',
  ], 0, 'Cô lập làm nạn nhân dễ bị điều khiển hơn.'),

  eq('Q031', 2, 'concept', '"Tôi thấy tận mắt" trong môi trường số chưa đủ vì sao?', [
    'Vì bạn chỉ thấy một nội dung trên màn hình, chưa chắc sự việc đúng như vậy.',
    'Vì mắt người không nhìn được video.',
    'Vì mọi video đều giả.',
    'Vì âm thanh luôn thật.',
  ], 0, 'Nội dung trên màn hình có thể bị cắt ghép, giả mạo hoặc sai bối cảnh.'),

  eq('Q032', 2, 'concept', 'Video ngắn gây phẫn nộ có rủi ro gì?', [
    'Thiếu bối cảnh và dễ kích hoạt cảm xúc mạnh.',
    'Luôn đầy đủ thông tin.',
    'Luôn được kiểm chứng.',
    'Không bao giờ bị cắt ghép.',
  ], 0, 'Clip ngắn dễ cắt mất phần trước/sau làm đổi nghĩa.'),

  eq('Q033', 2, 'verification', 'Với yêu cầu chuyển tiền qua giọng nói quen, câu hỏi tốt nhất là gì?', [
    'Yêu cầu này có cần xác minh độc lập không?',
    'Giọng có hay không?',
    'Âm lượng có lớn không?',
    'Tin nhắn có dài không?',
  ], 0, 'Nếu liên quan tiền/OTP/thông tin nhạy cảm, cần xác minh độc lập.'),

  eq('Q034', 2, 'concept', 'Nhiều lượt thích và bình luận có phải bằng chứng nội dung đúng không?', [
    'Không.',
    'Có, luôn đúng.',
    'Chỉ đúng nếu bình luận ngắn.',
    'Chỉ đúng vào buổi tối.',
  ], 0, 'Tương tác có thể đến từ người chưa kiểm chứng, tài khoản giả hoặc seeding.'),

  eq('Q035', 2, 'red_flags', 'Câu nào là dấu hiệu đe dọa?', [
    '"Nếu không hợp tác, bạn sẽ gặp rắc rối."',
    '"Bạn có thể kiểm tra thêm."',
    '"Hãy gọi tổng đài chính thức."',
    '"Bạn có thể suy nghĩ."',
  ], 0, 'Đe dọa là một cách tạo áp lực hành động.'),

  eq('Q036', 2, 'red_flags', 'Câu nào là dấu hiệu đánh vào cảm giác đặc biệt?', [
    '"Chỉ bạn được chọn."',
    '"Cần kiểm chứng thêm."',
    '"Hãy hỏi người thân."',
    '"Đừng chia sẻ khi chưa rõ."',
  ], 0, 'Cảm giác "được chọn riêng" thường dùng trong lừa đảo lợi ích.'),

  eq('Q037', 2, 'red_flags', 'Câu nào đánh vào xấu hổ/tống tiền?', [
    '"Nếu không muốn ảnh này lan ra thì làm theo."',
    '"Hãy báo cáo nền tảng."',
    '"Đừng gửi tiếp."',
    '"Hãy lưu bằng chứng an toàn."',
  ], 0, 'Đây là dấu hiệu ép buộc bằng xấu hổ.'),

  eq('Q038', 2, 'concept', 'Deepfake thường nguy hiểm hơn khi kết hợp với điều gì?', [
    'Social engineering: áp lực, mạo danh, lợi ích, đe dọa.',
    'Nhạc nền nhẹ.',
    'Màu sắc đẹp.',
    'Màn hình lớn.',
  ], 0, 'Kỹ thuật giả mạo thường là một phần trong kịch bản tấn công lớn hơn.'),

  eq('Q039', 2, 'response', 'Người gọi giống người thân nói "máy sắp hết pin, đừng gọi ai khác". Bạn nên nhận diện dấu hiệu nào?', [
    'Khẩn cấp và cô lập.',
    'Nội dung giải trí.',
    'Tin an toàn.',
    'Không có rủi ro.',
  ], 0, 'Đây là hai dấu hiệu đỏ mạnh trong lừa đảo.'),

  eq('Q040', 2, 'response', 'Khi nội dung làm bạn sợ, giận hoặc muốn hành động ngay, phản xạ an toàn nhất là gì?', [
    'Dừng lại và kiểm chứng.',
    'Chia sẻ ngay.',
    'Chuyển tiền trước.',
    'Bình luận mạnh.',
  ], 0, 'Cảm xúc mạnh là tín hiệu cần Pause.'),

  eq('Q041', 2, 'concept', '"Video ngắn có thể tạo cảm xúc dài" nghĩa là gì?', [
    'Video ngắn có thể tác động mạnh dù thiếu bối cảnh.',
    'Video ngắn luôn đúng.',
    'Video ngắn không thể giả.',
    'Video ngắn không cần nguồn.',
  ], 0, 'Định dạng ngắn dễ lan truyền và kích hoạt phản ứng nhanh.'),

  eq('Q042', 2, 'verification', 'Khi nào cần kiểm chứng nghiêm túc hơn?', [
    'Khi nội dung liên quan tiền, OTP, danh dự, pháp lý, sức khỏe, an toàn.',
    'Khi nội dung là ảnh minh họa rõ ràng.',
    'Khi đọc truyện cười.',
    'Khi xem sticker.',
  ], 0, 'Rủi ro càng cao, bằng chứng cần càng chắc.'),

  eq('Q043', 2, 'ethics', 'Câu trả lời trưởng thành khi chưa đủ bằng chứng là gì?', [
    '"Tôi chưa đủ dữ liệu để kết luận."',
    '"Thật 100%."',
    '"Giả hết."',
    '"Cứ chia sẻ đi."',
  ], 0, 'Nói chưa đủ dữ liệu giúp tránh tin sai và phủ nhận sai.'),

  eq('Q044', 2, 'ethics', '"Liar\'s dividend" là rủi ro nào?', [
    'Nội dung thật có thể bị phủ nhận bằng cách gọi là deepfake.',
    'Lợi nhuận đầu tư cao.',
    'Ưu đãi ngân hàng.',
    'Giảm giá sản phẩm.',
  ], 0, 'Biết deepfake tồn tại có thể bị lợi dụng để phủ nhận sự thật.'),

  eq('Q045', 2, 'response', 'Một người tự xưng là ngân hàng biết tên bạn và tạo áp lực đọc OTP. Yếu tố "biết tên" có đủ tin không?', [
    'Không, thông tin cá nhân có thể bị lộ/thu thập.',
    'Có, chắc chắn là ngân hàng.',
    'Có, nếu nói nhanh.',
    'Không cần xác minh.',
  ], 0, 'Biết một vài thông tin không chứng minh danh tính.'),

  eq('Q046', 2, 'red_flags', 'Dấu hiệu nào thuộc nhóm "lợi ích"?', [
    '"Lợi nhuận đảm bảo, không rủi ro."',
    '"Đừng gửi OTP."',
    '"Kiểm tra nguồn gốc."',
    '"Báo cáo nền tảng."',
  ], 0, 'Lời hứa quá tốt là một dấu hiệu lừa đảo.'),

  eq('Q047', 2, 'verification', 'Vì sao hỏi câu riêng tư không phải lúc nào cũng đủ?', [
    'Kẻ xấu có thể biết thông tin từ mạng xã hội hoặc tài khoản bị chiếm quyền.',
    'Vì câu hỏi riêng tư luôn vô nghĩa.',
    'Vì người thật không bao giờ trả lời.',
    'Vì câu hỏi dài hơn 10 từ.',
  ], 0, 'Xác minh qua kênh độc lập vẫn an toàn hơn.'),

  eq('Q048', 2, 'response', 'Bạn nhận video giống giáo viên yêu cầu nộp thông tin cá nhân qua link lạ. Nên làm gì?', [
    'Xác minh qua kênh nhà trường/giáo viên đã biết, không bấm link vội.',
    'Điền ngay vì video giống.',
    'Gửi cho cả lớp để điền.',
    'Đăng nhập thử bằng tài khoản chính.',
  ], 0, 'Yêu cầu dữ liệu qua link lạ cần kiểm chứng độc lập.'),

  eq('Q049', 2, 'concept', 'Bốn nút bấm cảm xúc chính trong Module 2 là gì?', [
    'Khẩn cấp, thân quen, quyền lực, lợi ích.',
    'Màu sắc, âm thanh, tốc độ, kích thước.',
    'Ảnh, video, chữ, link.',
    'Sáng, trưa, chiều, tối.',
  ], 0, 'Bốn nhóm này thường được dùng để thao túng phản ứng.'),

  eq('Q050', 2, 'ethics', 'Mục tiêu của Module 2 không phải là gì?', [
    'Hiểu tâm lý bị lừa để chống lại phản ứng vội.',
    'Tự do lỗi nạn nhân vì bị lừa.',
    'Nhận diện áp lực và cô lập.',
    'Biết dừng lại khi cảm xúc mạnh.',
  ], 1, 'Khóa học hướng tới phòng vệ và hỗ trợ, không đổ lỗi nạn nhân.'),
  // ── M2-EXAM-E ──────────────────────────────────────────────────────────────`;

fs.writeFileSync(fp, before + section + after, 'utf8');
console.log('Done. EXAM_BANK entries so far:', (before + section + after).match(/eq\('/g)?.length || 0);
