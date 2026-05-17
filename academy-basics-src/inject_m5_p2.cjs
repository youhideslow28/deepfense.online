'use strict';
const fs = require('fs');
const path = require('path');

const fp = path.join(__dirname, 'src', 'data', 'course.js');
let src = fs.readFileSync(fp, 'utf8');

const S = '      // ── M5-511-S ─────────────────────────────────────────────────';
const E = '      // ── M5-511-E ─────────────────────────────────────────────────';

const si = src.indexOf(S);
const ei = src.indexOf(E);
if (si === -1) throw new Error('Start marker M5-511-S not found');
if (ei === -1) throw new Error('End marker M5-511-E not found');

const before = src.slice(0, si);
const after  = src.slice(ei + E.length); // keep everything after end marker

const section = `      // ── M5-511-S ─────────────────────────────────────────────────
      {
        title: '5.1.1 Quy tắc vàng về tiền',
        lessons: [
          lesson('5.1.1.0', 'Mục tiêu bài học 5.1.1', [
            'Sau phần 5.1.1, bạn sẽ ghi nhớ các quy tắc an toàn khi gặp yêu cầu tiền.',
            'Bạn sẽ biết cách xử lý yêu cầu chuyển khoản gấp, và biết làm gì nếu đã lỡ chuyển tiền hoặc lộ thông tin.',
          ], [
            'Năm quy tắc vàng: không chuyển khi bị ép thời gian, không gửi OTP, gọi lại số đã lưu, không xử lý một mình khi hoảng, hành động nhanh nếu đã lỡ.',
          ]),
          lesson('5.1.1.1', 'Quy tắc 1: Không chuyển tiền khi đang bị ép thời gian', [
            'Nếu ai đó nói "Chỉ còn 5 phút.", "Chuyển ngay.", "Không kịp giải thích.", "Nếu không chuyển bây giờ sẽ có chuyện." — hãy xem đó là tín hiệu cần dừng.',
            'Tình huống khẩn cấp thật vẫn có thể được xác minh. Nếu bạn cần giúp người thân, xác minh giúp bạn giúp đúng người.',
          ], [
            'Gấp không có nghĩa là bỏ kiểm chứng.',
          ]),
          lesson('5.1.1.2', 'Quy tắc 2: Không gửi OTP, mật khẩu, mã xác minh', [
            'OTP, mật khẩu, mã xác minh và mã khôi phục tài khoản là chìa khóa vào tài khoản của bạn.',
            'Không gửi các thông tin này qua cuộc gọi, tin nhắn, link lạ, form lạ, người tự xưng hỗ trợ, hoặc người quen đang nhắn từ tài khoản bất thường.',
            'Kể cả khi người yêu cầu nghe giống người quen, vẫn không gửi.',
          ], [
            'Người thật không cần OTP của bạn qua chat.',
          ]),
          lesson('5.1.1.3', 'Quy tắc 3: Gọi lại bằng số đã lưu', [
            'Nếu người thân, bạn bè, sếp, giáo viên hoặc đồng nghiệp yêu cầu tiền hoặc dữ liệu gấp, hãy thoát khỏi kênh nghi vấn.',
            'Nên: gọi số đã lưu từ trước, gọi người thân khác, dùng kênh nội bộ chính thức, gặp trực tiếp nếu có thể.',
            'Không nên: gọi số mới họ vừa gửi, bấm link xác minh họ vừa gửi, chuyển tiền chỉ vì ảnh đại diện đúng.',
          ], [
            'Xác minh danh tính qua kênh độc lập — không qua kênh mà người nghi vấn vừa cung cấp.',
          ]),
          lesson('5.1.1.4', 'Quy tắc 4: Không tự xử lý một mình khi hoảng', [
            'Kẻ xấu thường muốn bạn cô lập: "Đừng nói với ai.", "Đừng gọi người khác.", "Chuyện này xấu hổ lắm.", "Nếu nói ra sẽ rắc rối."',
            'Khi thấy các câu này, hãy tìm người tin cậy: người thân, giáo viên, bạn bè đáng tin, quản lý, bộ phận IT, ngân hàng, hoặc cơ quan có trách nhiệm.',
            'Không phải vì bạn yếu, mà vì kiểm chứng tốt thường cần người thứ hai.',
          ], [
            'Khi bị yêu cầu giữ bí mật trong tình huống tài chính, đó là dấu hiệu đỏ cần tìm người hỗ trợ.',
          ]),
          lesson('5.1.1.5', 'Quy tắc 5: Nếu đã lỡ chuyển tiền, hành động nhanh', [
            'Nếu bạn nghi mình vừa bị lừa: liên hệ ngân hàng càng sớm càng tốt; lưu bằng chứng gồm số tài khoản, nội dung chat, số điện thoại, link, thời gian, ảnh chụp màn hình.',
            'Báo người thân hoặc bạn bè nếu tài khoản của bạn hay người quen có thể bị lợi dụng tiếp. Đổi mật khẩu và bật xác thực hai lớp nếu tài khoản bị nghi lộ.',
            'Báo cáo tài khoản, bài đăng hoặc website giả mạo trên nền tảng. Trình báo hoặc liên hệ cơ quan có trách nhiệm khi cần.',
            'Không nên: xóa bằng chứng vì xấu hổ, im lặng nếu kẻ xấu có thể lừa thêm người khác, đăng thông tin cá nhân chưa kiểm chứng của nghi phạm lên mạng.',
          ], [
            'Tiền có thể chuyển trong vài giây, nhưng hậu quả có thể kéo dài rất lâu. Hãy xác minh trước khi chuyển.',
            'Nếu đã lỡ: hành động nhanh — ngân hàng, bằng chứng, báo cáo.',
          ]),
        ],
        checkpoint: null,
      },
      // ── M5-511-E ─────────────────────────────────────────────────`;

fs.writeFileSync(fp, before + section + after, 'utf8');
console.log('Done. File length:', (before + section + after).length);
