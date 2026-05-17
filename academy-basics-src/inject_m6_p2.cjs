'use strict';
const fs = require('fs');
const path = require('path');

const fp = path.join(__dirname, 'src', 'data', 'course.js');
let src = fs.readFileSync(fp, 'utf8');

const S = '      // ── M6-611-S ─────────────────────────────────────────────────';
const E = '      // ── M6-611-E ─────────────────────────────────────────────────';

const si = src.indexOf(S);
const ei = src.indexOf(E);
if (si === -1) throw new Error('Start marker M6-611-S not found');
if (ei === -1) throw new Error('End marker M6-611-E not found');

const before = src.slice(0, si);
const after  = src.slice(ei + E.length);

const section = `      // ── M6-611-S ─────────────────────────────────────────────────
      {
        title: '6.1.1 Vệ sinh dữ liệu cá nhân',
        lessons: [
          lesson('6.1.1.0', 'Mục tiêu bài học 6.1.1', [
            'Sau phần 6.1.1, bạn sẽ hiểu dữ liệu cá nhân có thể bị dùng để mạo danh hoặc dựng kịch bản lừa đảo.',
            'Bạn sẽ biết giảm thông tin công khai không cần thiết, bảo vệ tài khoản quan trọng bằng các thói quen cơ bản, và biết cách phản ứng nếu tài khoản bị chiếm quyền hoặc bị mạo danh.',
          ], [
            'Bạn không thể kiểm soát toàn bộ Internet, nhưng bạn có thể giảm nguyên liệu mà kẻ xấu dùng để mạo danh bạn.',
          ]),
          lesson('6.1.1.1', 'Dữ liệu cá nhân là nguyên liệu của kịch bản lừa đảo', [
            'Kẻ xấu không chỉ cần khuôn mặt hoặc giọng nói. Chúng có thể dùng nhiều mảnh dữ liệu nhỏ để dựng một câu chuyện đáng tin: tên người thân, trường học hoặc công ty, lịch đi chơi, ngày sinh, số điện thoại, ảnh giấy tờ, video có giọng nói, ảnh nhà, xe, thẻ, vé máy bay, thói quen sinh hoạt, bạn bè thường tương tác.',
            'Mỗi mảnh riêng lẻ có vẻ vô hại. Nhưng khi ghép lại, chúng có thể tạo thành bản đồ về bạn.',
            'Ví dụ: nếu một người công khai tên trường, tên lớp, tên giáo viên, lịch học và nhiều video nói chuyện, kẻ xấu có thể dùng thông tin đó để giả làm người quen trong môi trường học tập. Nếu một người thường xuyên đăng lịch đi vắng, địa điểm và số điện thoại, rủi ro không chỉ là deepfake mà còn là an toàn cá nhân.',
          ], [
            'Dữ liệu nhỏ lẻ tưởng vô hại — nhưng ghép lại có thể trở thành công cụ mạo danh.',
          ]),
          lesson('6.1.1.2', 'Những gì nên hạn chế công khai', [
            'Bạn không cần xóa hết cuộc sống khỏi Internet. Nhưng nên cân nhắc trước khi công khai: số điện thoại cá nhân, email chính, địa chỉ nhà, ảnh căn cước hoặc hộ chiếu hoặc thẻ học sinh hoặc thẻ sinh viên.',
            'Cũng nên cân nhắc: vé máy bay và mã đặt chỗ, thẻ ngân hàng và mã QR cá nhân, lịch trình chi tiết, ảnh hoặc video trẻ em kèm trường lớp cụ thể, video dài ghi rõ giọng nói trong bối cảnh riêng tư, thông tin về người thân không có sự đồng ý.',
          ], [
            'Không phải thứ gì đăng được cũng nên đăng công khai.',
          ]),
          lesson('6.1.1.3', 'Cài đặt riêng tư', [
            'Hãy kiểm tra định kỳ: ai có thể xem bài viết của bạn? Ai có thể xem danh sách bạn bè? Ai có thể tìm bạn bằng số điện thoại hoặc email? Ai có thể tải hoặc chia sẻ lại nội dung của bạn? Ứng dụng nào đang có quyền truy cập tài khoản? Tài khoản nào đang đăng nhập trên thiết bị lạ?',
            'Nên: giới hạn bài viết cá nhân cho bạn bè hoặc người tin cậy; tắt hiển thị thông tin nhạy cảm không cần thiết; gỡ quyền ứng dụng không còn dùng; đăng xuất khỏi thiết bị lạ; cẩn trọng với lời mời kết bạn từ tài khoản lạ.',
          ], [
            'Kiểm tra cài đặt riêng tư định kỳ — không chỉ một lần khi tạo tài khoản.',
          ]),
          lesson('6.1.1.4', 'Bảo vệ tài khoản', [
            'Tài khoản bị chiếm quyền có thể được dùng để lừa người khác. Hãy: dùng mật khẩu mạnh; không dùng lại mật khẩu cho nhiều dịch vụ; bật xác thực hai lớp; cẩn thận với link đăng nhập giả; không nhập mật khẩu qua link trong tin nhắn nghi vấn; cập nhật email và số điện thoại khôi phục; kiểm tra cảnh báo đăng nhập lạ.',
            'Nếu tài khoản bị chiếm quyền: thử khôi phục tài khoản qua kênh chính thức; đổi mật khẩu email liên quan; đăng xuất khỏi thiết bị lạ nếu có thể; báo bạn bè và người thân không tin tin nhắn mượn tiền từ tài khoản đó; báo cáo tài khoản bị chiếm quyền với nền tảng.',
          ], [
            'Mật khẩu mạnh + xác thực hai lớp là lớp bảo vệ đầu tiên và quan trọng nhất.',
          ]),
          lesson('6.1.1.5', 'Khi bị mạo danh', [
            'Nếu ai đó tạo tài khoản giả dùng tên, ảnh hoặc giọng và hình ảnh của bạn: chụp màn hình tài khoản hoặc bài đăng; lưu link; báo cáo tài khoản mạo danh trên nền tảng; cảnh báo người thân và bạn bè bằng kênh chính thức của bạn.',
            'Nếu liên quan đến lừa đảo, danh dự, hình ảnh nhạy cảm hoặc đe dọa, tìm hỗ trợ từ người hoặc cơ quan có trách nhiệm.',
            'Không nên: tranh cãi dài với tài khoản giả; đăng dữ liệu cá nhân của người bạn nghi ngờ nếu chưa chắc; tự xử lý một mình nếu vụ việc nghiêm trọng.',
          ], [
            'Khi bị mạo danh: chụp màn hình, lưu link, báo cáo nền tảng, cảnh báo người thân — không tranh cãi hay tự xử lý một mình.',
          ]),
        ],
        checkpoint: null,
      },
      // ── M6-611-E ─────────────────────────────────────────────────`;

fs.writeFileSync(fp, before + section + after, 'utf8');
console.log('Done. File length:', (before + section + after).length);
