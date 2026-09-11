'use strict';
const fs = require('fs');
const path = require('path');

const fp = path.join(__dirname, 'src', 'data', 'course.js');
let src = fs.readFileSync(fp, 'utf8');

const S = '      // ── M5-55-S ──────────────────────────────────────────────────';
const E = '      // ── M5-55-E ──────────────────────────────────────────────────';

const si = src.indexOf(S);
const ei = src.indexOf(E);
if (si === -1) throw new Error('Start marker M5-55-S not found');
if (ei === -1) throw new Error('End marker M5-55-E not found');

const before = src.slice(0, si);
const after  = src.slice(ei + E.length);

const section = `      // ── M5-55-S ──────────────────────────────────────────────────
      {
        title: '5.5 Thực hành: Bản đồ rủi ro đời sống số',
        lessons: [
          lesson('5.5.0', 'Hướng dẫn thực hành', [
            'Bạn sẽ nhận 5 tình huống. Với mỗi tình huống, hãy xác định: vùng rủi ro chính, dấu hiệu đỏ, bước Deepfense Check quan trọng nhất, và hành động an toàn.',
            'Mục tiêu: giúp người học áp dụng Deepfense Check vào nhiều bối cảnh đời sống thực tế.',
          ], [
            'Deepfake không phải một vấn đề riêng lẻ. Nó là lớp mạo danh có thể phủ lên tiền bạc, danh dự, tình cảm, học tập, việc làm và niềm tin xã hội.',
          ]),
          lesson('5.5.1', 'Tình huống 1: Video đầu tư của người nổi tiếng', [
            'Tình huống: Một video người nổi tiếng kêu gọi tham gia ứng dụng đầu tư. Link đăng ký nằm trong mô tả. Tài khoản đăng không phải tài khoản chính thức.',
            'Vùng rủi ro: lừa đảo tài chính/đầu tư. Dấu hiệu đỏ: người nổi tiếng, link lạ, tài khoản không chính thức, lời hứa tài chính.',
            'Bước quan trọng nhất: Verify và Trace. Hành động an toàn: không bấm link, kiểm tra kênh chính thức, cảnh báo người thân nếu cần.',
          ], [
            'Video đầu tư từ tài khoản không chính thức: không bấm link, kiểm tra kênh chính thức trước.',
          ]),
          lesson('5.5.2', 'Tình huống 2: Ảnh nhạy cảm trong nhóm lớp', [
            'Tình huống: Một ảnh nhạy cảm được nói là của bạn học. Nhiều người đang xin ảnh và gửi tiếp.',
            'Vùng rủi ro: học đường/danh dự/hình ảnh nhạy cảm. Dấu hiệu đỏ: nội dung nhạy cảm, lan truyền trong nhóm, có thể gây hại người trong ảnh.',
            'Bước quan trọng nhất: Pause và Decide. Hành động an toàn: không lưu, không gửi tiếp, báo cáo, nhắc dừng lan truyền, tìm người có trách nhiệm.',
          ], [
            'Ảnh nhạy cảm trong nhóm: dừng ngay, không gửi tiếp, báo người có trách nhiệm.',
          ]),
          lesson('5.5.3', 'Tình huống 3: Clip gây phẫn nộ', [
            'Tình huống: Một clip 10 giây được chia sẻ với chú thích "vừa xảy ra ở thành phố mình". Không có nguồn gốc, nhưng nhiều người kêu gọi bêu tên người trong clip.',
            'Vùng rủi ro: tin giả xã hội/sai bối cảnh. Dấu hiệu đỏ: clip ngắn, không nguồn, gây phẫn nộ, kêu gọi bêu tên.',
            'Bước quan trọng nhất: Trace và Decide. Hành động an toàn: không chia sẻ, tìm nguồn và bản đầy đủ nếu cần, không bêu tên.',
          ], [
            'Clip ngắn gây phẫn nộ không rõ nguồn: không chia sẻ, không bêu tên — truy nguồn trước.',
          ]),
          lesson('5.5.4', 'Tình huống 4: Người quen online xin tiền', [
            'Tình huống: Một người quen qua mạng được 2 tuần nói đang gặp sự cố và cần bạn chuyển tiền. Hồ sơ của họ có ảnh đẹp, ít bạn bè thật và thường né gặp mặt.',
            'Vùng rủi ro: tình cảm/danh tính giả. Dấu hiệu đỏ: tạo thân thiết nhanh, xin tiền, né gặp, hồ sơ đáng nghi.',
            'Bước quan trọng nhất: Verify. Hành động an toàn: không chuyển tiền, không gửi thông tin nhạy cảm, trao đổi với người tin cậy.',
          ], [
            'Người quen online 2 tuần xin tiền: dừng lại, xác minh danh tính qua kênh độc lập trước khi làm bất cứ điều gì.',
          ]),
          lesson('5.5.5', 'Tình huống 5: Việc làm lương cao + Chấm điểm gợi ý', [
            'Tình huống: Một tài khoản tuyển dụng gửi lời mời việc nhẹ lương cao, yêu cầu nộp phí giữ chỗ và gửi ảnh căn cước.',
            'Vùng rủi ro: việc làm/hồ sơ giả/thu thập dữ liệu. Dấu hiệu đỏ: việc nhẹ lương cao, phí trước, giấy tờ cá nhân, tài khoản không rõ.',
            'Bước quan trọng nhất: Verify và Decide. Hành động an toàn: kiểm tra tổ chức chính thức, không nộp phí hoặc gửi giấy tờ khi chưa xác minh.',
            'Chấm điểm gợi ý — mỗi tình huống tối đa 4 điểm: xác định đúng vùng rủi ro (1đ), chọn được ít nhất 2 dấu hiệu đỏ (1đ), chọn bước Deepfense Check phù hợp (1đ), chọn hành động an toàn (1đ). Tổng điểm tối đa: 20.',
          ], [
            'Deepfake nguy hiểm không chỉ vì nó giả. Nó nguy hiểm vì nó xuất hiện trong những việc rất thật: tiền thật, danh dự thật, nỗi sợ thật, tình cảm thật và hậu quả thật.',
            'Module 6 tiếp theo: Deepfense Shield, family code, money delay, two-channel rule, no shame reporting, evidence first và capstone cuối khóa.',
          ]),
        ],
        checkpoint: null,
      },
      // ── M5-55-E ──────────────────────────────────────────────────`;

fs.writeFileSync(fp, before + section + after, 'utf8');
console.log('Done. File length:', (before + section + after).length);
