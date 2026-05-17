'use strict';
const fs = require('fs');
const path = require('path');

const fp = path.join(__dirname, 'src', 'data', 'exam-bank.js');
let src = fs.readFileSync(fp, 'utf8');

const S = '  // ── M6-EXAM-S ──────────────────────────────────────────────────────────────';
const E = '  // ── M6-EXAM-E ──────────────────────────────────────────────────────────────';

const si = src.indexOf(S);
const ei = src.indexOf(E);
if (si === -1) throw new Error('Start marker M6-EXAM-S not found');
if (ei === -1) throw new Error('End marker M6-EXAM-E not found');

const before = src.slice(0, si);
const after  = src.slice(ei + E.length);

const section = `  // ── M6-EXAM-S ──────────────────────────────────────────────────────────────
  // MODULE 6 — Phòng vệ cá nhân và cộng đồng (Q136–Q150)
  eq('Q136', 6, 'concept', 'Deepfense Shield gồm những nhóm quy tắc nào?', [
    'Family Code, Money Delay, Two-Channel Rule, No Shame Reporting, Evidence First.',
    'Like, Share, Follow, Comment, Subscribe.',
    'Eye, Mouth, Nose, Ear, Hair.',
    'Download, Upload, Delete, Print, Save.',
  ], 0, 'Đây là bộ quy tắc phòng vệ cuối khóa.'),

  eq('Q137', 6, 'response', 'Family Code không nên được lưu/truyền thế nào?', [
    'Đăng công khai hoặc dựa trên thông tin công khai.',
    'Thống nhất riêng với gia đình.',
    'Thay đổi nếu nghi đã lộ.',
    'Dễ nhớ với người trong nhà.',
  ], 0, 'Family Code cần riêng tư và khó đoán.'),

  eq('Q138', 6, 'verification', 'Money Delay giúp gì?', [
    'Tạo khoảng dừng để xác minh trước yêu cầu tiền bất thường.',
    'Tăng tốc chuyển khoản.',
    'Bỏ qua ngân hàng.',
    'Thay thế mật khẩu.',
  ], 0, 'Lừa đảo thường thắng bằng tốc độ; Money Delay lấy lại tốc độ.'),

  eq('Q139', 6, 'response', 'Two-Channel Rule nên dùng khi nào?', [
    'Khi liên quan tiền, OTP, tài khoản, danh dự, hình ảnh nhạy cảm hoặc rủi ro cao.',
    'Khi đổi nhạc chuông.',
    'Khi xem meme rõ ràng.',
    'Khi đọc truyện cười.',
  ], 0, 'Rủi ro cao cần xác minh qua nhiều tín hiệu/kênh.'),

  eq('Q140', 6, 'ethics', 'No Shame Reporting nhấn mạnh điều gì?', [
    'Báo cáo sớm, không đổ lỗi nạn nhân.',
    'Im lặng vì xấu hổ.',
    'Cười người bị lừa.',
    'Đăng mọi thứ lên mạng.',
  ], 0, 'Xấu hổ làm nạn nhân im lặng và kẻ xấu có thêm thời gian.'),

  eq('Q141', 6, 'response', 'Evidence First nghĩa là gì?', [
    'Lưu bằng chứng an toàn để xử lý, không phải để lan truyền.',
    'Gửi bằng chứng cho mọi nhóm.',
    'Xóa hết ngay.',
    'Chỉ kể miệng.',
  ], 0, 'Bằng chứng giúp báo cáo, nhưng phải lưu/chia sẻ đúng nơi.'),

  eq('Q142', 6, 'response', 'Dữ liệu nào nên hạn chế công khai?', [
    'Số điện thoại, địa chỉ, giấy tờ, lịch trình, video giọng nói riêng tư.',
    'Câu chào chung.',
    'Sở thích không nhạy cảm.',
    'Bài học công khai.',
  ], 0, 'Các dữ liệu này có thể dùng để dựng kịch bản lừa đảo.'),

  eq('Q143', 6, 'response', 'Cách bảo vệ tài khoản cơ bản là gì?', [
    'Mật khẩu mạnh, không dùng lại, bật xác thực hai lớp.',
    'Dùng cùng mật khẩu dễ nhớ mọi nơi.',
    'Gửi mật khẩu cho bạn bè.',
    'Nhập mật khẩu qua link lạ.',
  ], 0, 'Tài khoản bị chiếm quyền có thể dùng để lừa người khác.'),

  eq('Q144', 6, 'response', 'Nếu bị tạo tài khoản giả mạo, nên làm gì?', [
    'Chụp màn hình, lưu link, báo cáo nền tảng, cảnh báo người thân qua kênh chính thức.',
    'Tranh cãi dài với tài khoản giả.',
    'Đăng dữ liệu cá nhân nghi phạm chưa kiểm chứng.',
    'Im lặng hoàn toàn.',
  ], 0, 'Cần lưu bằng chứng và báo cáo đúng kênh.'),

  eq('Q145', 6, 'ethics', 'Trong trường học, quy tắc cộng đồng quan trọng là gì?', [
    'Không lan truyền hình ảnh nhạy cảm và báo người có trách nhiệm.',
    'Gửi ảnh cho nhiều người xác minh.',
    'Bêu tên công khai khi chưa rõ.',
    'Chế giễu người bị hại.',
  ], 0, 'Trường học cần giảm lan truyền và bảo vệ người bị hại.'),

  eq('Q146', 6, 'response', 'Detector không phát hiện deepfake rõ ràng nhưng có link đầu tư lạ và kênh chính thức không xác nhận. Kết luận an toàn là gì?', [
    'Rủi ro cao, không bấm link/nạp tiền.',
    'An toàn tuyệt đối.',
    'Nạp thử tiền nhỏ.',
    'Chia sẻ link rộng rãi.',
  ], 0, 'Detector không thay thế ngữ cảnh và xác minh nguồn.'),

  eq('Q147', 6, 'red_flags', 'Bạn cũ gửi tin nhắn thoại thúc giục nạp tiền và né gọi điện. Red flag là gì?', [
    'Né xác minh, áp lực thời gian, yêu cầu tiền.',
    'Tin nhắn có âm thanh.',
    'Bạn cũ có ảnh đại diện.',
    'Âm lượng thấp.',
  ], 0, 'Các dấu hiệu ngữ cảnh cho thấy rủi ro cao.'),

  eq('Q148', 6, 'verification', 'Ảnh chụp bình luận tích cực trong hồ sơ sự việc nên được xem thế nào?', [
    'Không đủ bằng chứng; có thể bị chọn lọc/dàn dựng.',
    'Bằng chứng chắc chắn.',
    'Giấy chứng nhận chính thức.',
    'Thay thế nguồn gốc.',
  ], 0, 'Cần link gốc và nguồn độc lập.'),

  eq('Q149', 6, 'ethics', 'Phòng vệ tốt trước deepfake không phải là gì?', [
    'Sống trong nghi ngờ với mọi thứ.',
    'Có quy tắc rõ để bình tĩnh khi gặp rủi ro.',
    'Xác minh kênh độc lập.',
    'Không lan truyền nội dung gây hại.',
  ], 0, 'Mục tiêu là cân bằng: không hoảng sợ, không tin vội.'),

  eq('Q150', 6, 'concept', 'Bài học lớn nhất của DEEPFENSE BASIC là gì?', [
    'Không tin vội, không chia sẻ vội, không chuyển tiền khi bị ép; hãy kiểm chứng trước khi hành động.',
    'Mọi thứ trên Internet đều giả.',
    'Detector luôn đủ.',
    'Chỉ chuyên gia mới tự bảo vệ được.',
  ], 0, 'Khóa học hướng tới phản xạ kiểm chứng và hành động an toàn cho mọi người.'),
  // ── M6-EXAM-E ──────────────────────────────────────────────────────────────`;

fs.writeFileSync(fp, before + section + after, 'utf8');
console.log('Done. EXAM_BANK entries so far:', (before + section + after).match(/eq\('/g)?.length || 0);
