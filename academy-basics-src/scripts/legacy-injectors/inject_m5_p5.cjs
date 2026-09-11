'use strict';
const fs = require('fs');
const path = require('path');

const fp = path.join(__dirname, 'src', 'data', 'course.js');
let src = fs.readFileSync(fp, 'utf8');

const S = '      // ── M5-54-S ──────────────────────────────────────────────────';
const E = '      // ── M5-54-E ──────────────────────────────────────────────────';

const si = src.indexOf(S);
const ei = src.indexOf(E);
if (si === -1) throw new Error('Start marker M5-54-S not found');
if (ei === -1) throw new Error('End marker M5-54-E not found');

const before = src.slice(0, si);
const after  = src.slice(ei + E.length);

const section = `      // ── M5-54-S ──────────────────────────────────────────────────
      {
        title: '5.4 Tình cảm, việc làm, học bổng, đầu tư và danh tính số',
        lessons: [
          lesson('5.4.0', 'Mục tiêu bài học 5.4', [
            'Sau phần 5.4, bạn sẽ nhận diện rủi ro deepfake và AI trong tình cảm và danh tính giả.',
            'Bạn sẽ biết cảnh giác với hồ sơ việc làm, học bổng, tuyển dụng và đầu tư giả; biết kiểm tra danh tính số ở mức cơ bản; và biết bảo vệ dữ liệu cá nhân khi tương tác với người hoặc tổ chức mới trên mạng.',
          ], [
            'Rủi ro deepfake không dừng ở tiền bạc và tin tức — nó còn len vào tình cảm, việc làm và danh tính số.',
          ]),
          lesson('5.4.1', 'Tình cảm và danh tính giả', [
            'Không phải mọi người bạn gặp online đều là người họ nói. Kẻ xấu có thể dùng ảnh AI, video ngắn dựng sẵn, giọng nói giả, hồ sơ mạng xã hội giả, câu chuyện đời tư cảm động, hoặc tài khoản có vẻ hoạt động lâu nhưng thực ra được xây dựng để lừa.',
            'Kịch bản thường gặp: làm quen → tạo cảm giác thân thiết nhanh → tâm sự chuyện khó khăn → hứa hẹn tình cảm hoặc cơ hội → xin tiền, nhờ nhận hộ tiền, gửi link, yêu cầu ảnh nhạy cảm hoặc giấy tờ.',
            'Dấu hiệu đỏ: quá hoàn hảo, quá nhanh, quá bí mật; né gọi video thật hoặc chỉ gọi rất ngắn; có nhiều lý do không gặp trực tiếp; xin tiền vì sự cố liên tục; yêu cầu giữ bí mật; yêu cầu ảnh nhạy cảm; gửi link nhận quà hoặc phí hải quan.',
            'Phản ứng an toàn: không gửi tiền cho người chỉ quen online; không gửi ảnh nhạy cảm hoặc giấy tờ cá nhân; không bấm link nhận quà; nói chuyện với người tin cậy nếu bị gây áp lực; nếu bị tống tiền, lưu bằng chứng và tìm hỗ trợ — không tự xử lý một mình.',
          ], [
            'Mối quan hệ online phát triển quá nhanh, quá bí mật và kết thúc bằng yêu cầu tiền — là dấu hiệu đỏ rõ ràng.',
          ]),
          lesson('5.4.2', 'Việc làm và học bổng giả', [
            'AI có thể làm các lời mời việc làm hoặc học bổng trông chuyên nghiệp hơn: website đẹp, người tư vấn có ảnh đại diện AI, video giới thiệu giả, email trông giống tổ chức thật, giấy mời và logo bị làm giả.',
            'Kịch bản thường gặp: việc nhẹ lương cao, học bổng dễ nhận, phí giữ chỗ, phí xử lý hồ sơ, yêu cầu gửi giấy tờ cá nhân trước khi xác minh tổ chức, yêu cầu tải app hoặc tham gia nhóm riêng.',
            'Dấu hiệu đỏ: cam kết quá dễ; không có website hoặc tổ chức rõ ràng; email dùng tên miền lạ; không có địa chỉ, người phụ trách hoặc điều khoản minh bạch; yêu cầu phí trước; yêu cầu giấy tờ nhạy cảm quá sớm; gây áp lực "chỉ còn hôm nay".',
            'Phản ứng an toàn: kiểm tra website chính thức của tổ chức; tìm thông tin tuyển dụng từ nguồn chính thức; gọi hoặc email theo thông tin tự tìm được — không chỉ dùng thông tin trong tin nhắn; không gửi giấy tờ cá nhân khi chưa xác minh; không đóng phí qua tài khoản cá nhân lạ.',
          ], [
            'Việc nhẹ lương cao cộng với phí trước và giấy tờ cá nhân sớm — là bộ ba dấu hiệu đỏ của việc làm hoặc học bổng giả.',
          ]),
          lesson('5.4.3', 'Đầu tư, khóa học và "chuyên gia" AI', [
            'Deepfake có thể làm "chuyên gia" giả trông rất thật. Một người có thể xuất hiện trong video với gương mặt đáng tin, giọng nói tự tin, biểu đồ lợi nhuận, ảnh chụp tài khoản, học viên và bình luận khen ngợi, hoặc video người nổi tiếng "ủng hộ".',
            'Nhưng các dấu hiệu đỏ vẫn quen thuộc: lợi nhuận chắc chắn, không rủi ro, bảo mật công thức, không cho hỏi nhiều, ép nạp tiền, khoe kết quả quá tốt, tạo nhóm kín để thúc ép, dùng người nổi tiếng làm mồi.',
          ], [
            'Một video chuyên nghiệp không biến một lời hứa tài chính thành đáng tin.',
          ]),
          lesson('5.4.4', 'Bảo vệ danh tính số của bạn', [
            'Bạn không thể biến mình thành vô hình trên Internet. Nhưng bạn có thể giảm dữ liệu mà kẻ xấu dùng để mạo danh hoặc lừa người khác.',
            'Hãy cân nhắc: không công khai số điện thoại, email chính hoặc địa chỉ nhà; hạn chế đăng giấy tờ, thẻ học sinh hoặc sinh viên, vé máy bay, lịch trình; cẩn thận với video giọng nói dài công khai; kiểm tra quyền riêng tư của tài khoản mạng xã hội.',
            'Không chấp nhận kết bạn bừa bãi nếu tài khoản chứa nhiều thông tin cá nhân. Bật xác thực hai lớp cho tài khoản quan trọng. Dùng mật khẩu mạnh, không dùng lại mật khẩu. Cảnh báo người thân nếu tài khoản của bạn bị chiếm quyền.',
          ], [
            'Danh tính số của bạn là tài sản. Bảo vệ nó không phải vì sợ Internet, mà vì bạn muốn Internet khó bị dùng để chống lại mình.',
          ]),
        ],
        checkpoint: null,
      },
      // ── M5-54-E ──────────────────────────────────────────────────`;

fs.writeFileSync(fp, before + section + after, 'utf8');
console.log('Done. File length:', (before + section + after).length);
