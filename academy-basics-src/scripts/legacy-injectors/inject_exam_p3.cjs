'use strict';
const fs = require('fs');
const path = require('path');

const fp = path.join(__dirname, 'src', 'data', 'exam-bank.js');
let src = fs.readFileSync(fp, 'utf8');

const S = '  // ── M3-EXAM-S ──────────────────────────────────────────────────────────────';
const E = '  // ── M3-EXAM-E ──────────────────────────────────────────────────────────────';

const si = src.indexOf(S);
const ei = src.indexOf(E);
if (si === -1) throw new Error('Start marker M3-EXAM-S not found');
if (ei === -1) throw new Error('End marker M3-EXAM-E not found');

const before = src.slice(0, si);
const after  = src.slice(ei + E.length);

const section = `  // ── M3-EXAM-S ──────────────────────────────────────────────────────────────
  // MODULE 3 — Dấu hiệu nghi vấn (Q051–Q075)
  eq('Q051', 3, 'response', 'Bước đầu tiên khi xem video gây sốc là gì?', [
    'Dừng lại và quan sát chậm hơn.',
    'Chia sẻ ngay.',
    'Kết luận giả.',
    'Chuyển tiền nếu có link.',
  ], 0, 'Pause giúp bạn không bị cảm xúc kéo đi.'),

  eq('Q052', 3, 'red_flags', 'Rìa khuôn mặt bị nhòe khi quay đầu là gì?', [
    'Một tín hiệu cần chú ý, không phải kết luận cuối cùng.',
    'Chứng minh chắc chắn giả.',
    'Chứng minh chắc chắn thật.',
    'Không bao giờ liên quan.',
  ], 0, 'Video thật cũng có thể nhòe do nén, ánh sáng hoặc mạng.'),

  eq('Q053', 3, 'red_flags', 'Chớp mắt lạ có đủ kết luận deepfake không?', [
    'Không, chỉ là một vùng quan sát.',
    'Có, luôn đủ.',
    'Có, nếu video ngắn.',
    'Không cần quan sát mắt.',
  ], 0, 'Một dấu hiệu đơn lẻ không đủ.'),

  eq('Q054', 3, 'verification', 'Khẩu hình lệch có thể do nguyên nhân nào ngoài deepfake?', [
    'Mạng yếu, nén video, lỗi phát.',
    'Family code.',
    'OTP.',
    'Chứng chỉ.',
  ], 0, 'Lệch tiếng không luôn đồng nghĩa giả.'),

  eq('Q055', 3, 'red_flags', 'Vì sao cần quan sát ánh sáng và bóng?', [
    'Để xem có sự không nhất quán giữa mặt, cổ, nền và nguồn sáng.',
    'Để chọn màu đẹp.',
    'Để tăng lượt xem.',
    'Để đổi mật khẩu.',
  ], 0, 'Ánh sáng không khớp có thể là tín hiệu chỉnh sửa.'),

  eq('Q056', 3, 'red_flags', 'Chi tiết nào thường cần quan sát ngoài khuôn mặt?', [
    'Tóc, tai, kính, tay, phụ kiện, nền.',
    'Chỉ số pin.',
    'Tên nhà mạng.',
    'Độ sáng màn hình của bạn.',
  ], 0, 'Chi tiết nhỏ và nền có thể lộ dấu hiệu hoặc sai bối cảnh.'),

  eq('Q057', 3, 'red_flags', 'Khi tay đi qua mặt và vùng mặt bị méo, nên hiểu thế nào?', [
    'Là dấu hiệu cần kiểm tra thêm.',
    'Chắc chắn thật.',
    'Luôn vô hại.',
    'Phải chia sẻ ngay.',
  ], 0, 'Một số video giả dễ lỗi khi vật thể che mặt, nhưng cần kiểm chứng thêm.'),

  eq('Q058', 3, 'red_flags', 'Nền video có bảng hiệu không khớp địa điểm được chú thích có thể gợi ý điều gì?', [
    'Sai bối cảnh/repurposed media.',
    'OTP bị lộ.',
    'Mật khẩu mạnh.',
    'Family code tốt.',
  ], 0, 'Nền giúp phát hiện địa điểm/thời gian không khớp.'),

  eq('Q059', 3, 'verification', 'Video thật có thể trông lạ vì lý do nào?', [
    'Camera kém, mạng yếu, bộ lọc, nén video.',
    'Vì mọi video thật đều hoàn hảo.',
    'Vì chỉ deepfake mới bị mờ.',
    'Vì bình luận nhiều.',
  ], 0, 'Chất lượng kỹ thuật thấp không đồng nghĩa giả.'),

  eq('Q060', 3, 'verification', 'Video giả có thể trông rất thật. Điều này nhắc bạn điều gì?', [
    'Không thấy lỗi kỹ thuật chưa đủ để tin.',
    'Cứ thấy mượt là thật.',
    'Không cần kiểm tra nguồn.',
    'Detector luôn đúng.',
  ], 0, 'Cần kết hợp nguồn, ngữ cảnh và xác minh.'),

  eq('Q061', 3, 'verification', 'Detector nên được xem là gì?', [
    'Một tín hiệu hỗ trợ.',
    'Phán quyết cuối cùng.',
    'Chứng chỉ thật.',
    'Thay thế kênh độc lập.',
  ], 0, 'Detector có thể sai và có giới hạn.'),

  eq('Q062', 3, 'verification', 'Mức kết luận an toàn khi có vài dấu hiệu nghi vấn là gì?', [
    'Có dấu hiệu nghi vấn, cần kiểm chứng thêm.',
    'Chắc chắn thật.',
    'Chắc chắn giả và bêu tên ngay.',
    'Không cần làm gì.',
  ], 0, 'Kết luận thận trọng giúp tránh sai cả hai hướng.'),

  eq('Q063', 3, 'red_flags', 'Giọng nói giống người thân có đủ để chuyển tiền không?', [
    'Không, cần xác minh khi yêu cầu rủi ro cao.',
    'Có, nếu giống 80%.',
    'Có, nếu tin nhắn ngắn.',
    'Có, nếu buổi tối.',
  ], 0, 'Giọng giống không đủ cho tiền/OTP/thông tin nhạy cảm.'),

  eq('Q064', 3, 'red_flags', 'Dấu hiệu âm thanh nào cần chú ý?', [
    'Ngắt nghỉ kỳ lạ, giọng đều, né câu hỏi bất ngờ, cảm xúc không khớp.',
    'Âm lượng vừa phải.',
    'Tin nhắn có emoji.',
    'Cuộc gọi dưới 1 phút luôn an toàn.',
  ], 0, 'Các tín hiệu âm thanh chỉ là dấu hiệu, cần đi cùng xác minh.'),

  eq('Q065', 3, 'response', 'Cách an toàn khi nhận giọng nói giống sếp yêu cầu chuyển khoản là gì?', [
    'Xác minh qua quy trình/kênh nội bộ chính thức.',
    'Chuyển ngay.',
    'Gửi OTP cho sếp.',
    'Hỏi lại đúng không trong cùng cuộc gọi rồi chuyển.',
  ], 0, 'Yêu cầu tài chính cần quy trình xác nhận độc lập.'),

  eq('Q066', 3, 'concept', 'Ngữ cảnh bao gồm điều gì?', [
    'Ai gửi, gửi ở đâu, muốn bạn tin/làm gì, ai có thể bị hại.',
    'Chỉ màu sắc video.',
    'Chỉ độ phân giải.',
    'Chỉ âm lượng.',
  ], 0, 'Ngữ cảnh thường quyết định mức rủi ro.'),

  eq('Q067', 3, 'red_flags', 'Nội dung yêu cầu OTP qua link lạ thuộc lớp dấu hiệu nào mạnh nhất?', [
    'Ngữ cảnh/hành vi rủi ro.',
    'Tóc.',
    'Ánh sáng.',
    'Nền.',
  ], 0, 'Yêu cầu OTP là red flag mạnh dù hình ảnh trông thật.'),

  eq('Q068', 3, 'concept', 'Bình luận "mình nhận tiền rồi" dưới video đầu tư có phải bằng chứng chắc chắn không?', [
    'Không.',
    'Có.',
    'Chỉ nếu viết hoa.',
    'Chỉ nếu có nhiều dấu chấm than.',
  ], 0, 'Bình luận có thể là seeding hoặc người chưa kiểm chứng.'),

  eq('Q069', 3, 'ethics', 'Trước khi chia sẻ nội dung nghi vấn, câu hỏi quan trọng là gì?', [
    'Nếu nội dung sai, ai có thể bị hại?',
    'Mình có được nhiều like không?',
    'Video có nhạc hay không?',
    'Nền có màu gì?',
  ], 0, 'Trách nhiệm số bắt đầu từ đánh giá hậu quả.'),

  eq('Q070', 3, 'ethics', 'Với hình ảnh nhạy cảm trong nhóm lớp, điều không nên làm là gì?', [
    'Lưu/gửi tiếp/phóng to phân tích công khai.',
    'Báo cáo.',
    'Không lan truyền.',
    'Tìm người có trách nhiệm hỗ trợ.',
  ], 0, 'Phân tích công khai có thể làm tăng tổn hại.'),

  eq('Q071', 3, 'verification', 'Checklist 3 lớp gồm gì?', [
    'Hình ảnh/video, âm thanh/giọng nói, ngữ cảnh/hành vi.',
    'Sáng, trưa, tối.',
    'Tên, tuổi, màu áo.',
    'Like, share, follow.',
  ], 0, 'Ba lớp giúp quan sát toàn diện hơn.'),

  eq('Q072', 3, 'red_flags', 'Một dấu hiệu yếu trở nên đáng lo hơn khi nào?', [
    'Khi đi cùng nhiều dấu hiệu khác và ngữ cảnh rủi ro.',
    'Khi đứng một mình.',
    'Khi video có nhạc nền.',
    'Khi màn hình sáng.',
  ], 0, 'Tập hợp tín hiệu làm mức rủi ro tăng.'),

  eq('Q073', 3, 'response', 'Nếu video người nổi tiếng đầu tư trông mượt nhưng tài khoản/link đáng nghi, nên làm gì?', [
    'Không bấm link, kiểm tra kênh chính thức.',
    'Tin vì video mượt.',
    'Nạp thử.',
    'Chỉ xem mắt chớp.',
  ], 0, 'Ngữ cảnh rủi ro cao có thể quan trọng hơn lỗi kỹ thuật.'),

  eq('Q074', 3, 'verification', 'Hỏi câu riêng tư qua cuộc gọi nghi deepvoice có đủ không?', [
    'Có thể hữu ích nhưng chưa đủ; vẫn nên xác minh kênh độc lập.',
    'Luôn đủ.',
    'Không bao giờ được hỏi.',
    'Chỉ cần hỏi một câu là chuyển tiền được.',
  ], 0, 'Thông tin riêng có thể bị thu thập hoặc đoán.'),

  eq('Q075', 3, 'verification', 'Mục tiêu đúng của quan sát là gì?', [
    'Tìm tín hiệu để biết có cần kiểm chứng thêm không.',
    'Phán quyết thật/giả trong 3 giây.',
    'Thay thế hoàn toàn nguồn chính thức.',
    'Chỉ tìm lỗi ở mắt.',
  ], 0, 'Quan sát là một bước trong quy trình, không phải toàn bộ xác minh.'),
  // ── M3-EXAM-E ──────────────────────────────────────────────────────────────`;

fs.writeFileSync(fp, before + section + after, 'utf8');
console.log('Done. EXAM_BANK entries so far:', (before + section + after).match(/eq\('/g)?.length || 0);
