'use strict';
const fs = require('fs');
const path = require('path');

const fp = path.join(__dirname, 'src', 'data', 'course.js');
let src = fs.readFileSync(fp, 'utf8');

const S = '      // ── M6-62-S ──────────────────────────────────────────────────';
const E = '      // ── M6-62-E ──────────────────────────────────────────────────';

const si = src.indexOf(S);
const ei = src.indexOf(E);
if (si === -1) throw new Error('Start marker M6-62-S not found');
if (ei === -1) throw new Error('End marker M6-62-E not found');

const before = src.slice(0, si);
const after  = src.slice(ei + E.length);

const section = `      // ── M6-62-S ──────────────────────────────────────────────────
      {
        title: '6.2 Capstone: Hồ sơ sự việc của An',
        lessons: [
          lesson('6.2.0', 'Bối cảnh: Một chuỗi thông tin trong cùng một buổi tối', [
            'An nhận được một chuỗi thông tin trong cùng một buổi tối. Tài liệu A — Video ngắn: một video 18 giây cho thấy người nổi tiếng nói "Tôi đang hợp tác với nền tảng này để giúp mọi người có thêm thu nhập. Chỉ cần đăng ký hôm nay, bạn sẽ nhận được tài khoản ưu tiên." Video được đăng bởi tài khoản có tên gần giống tài khoản chính thức, không có dấu xác minh, mô tả có link rút gọn.',
            'Tài liệu B — Tin nhắn từ bạn cũ: "Mình vừa tham gia cái này, nhận tiền thật rồi. Cậu đăng ký nhanh đi, đừng bỏ lỡ." Tài khoản đúng ảnh đại diện nhưng An đã lâu không nói chuyện. Khi An hỏi gọi điện được không, người đó nói: "Mình đang bận, cứ bấm link đi."',
            'Tài liệu C — Ảnh chụp màn hình bình luận: nhiều bình luận như "Mình đã nhận 2 triệu", "Ban đầu tưởng lừa, ai ngờ thật", "Cơ hội này quá tốt". Không có link bài gốc trong ảnh chụp.',
            'Tài liệu D — Tin nhắn thoại: giọng nghe khá giống bạn cũ: "Tin mình đi, cơ hội này chỉ còn tối nay. Cậu nạp trước 1 triệu là được." Tài liệu E — Kết quả công cụ phát hiện AI: "Không phát hiện dấu hiệu deepfake rõ ràng." Tài liệu F — Dữ kiện bổ sung: kênh chính thức của người nổi tiếng không có thông tin về nền tảng này; tìm tên nền tảng thấy vài bài cảnh báo lừa đảo từ người dùng.',
          ], [
            'Capstone tổng hợp toàn bộ khóa học: deepfake, deepvoice, social engineering, sai bối cảnh, giới hạn detector và Deepfense Check.',
          ]),
          lesson('6.2.1', 'Nhiệm vụ: 5 phần phân tích', [
            'Bạn hãy hoàn thành 5 phần phân tích hồ sơ trên.',
            'Phần 1 — Phân loại nội dung: tài liệu nào có thể là deepfake, deepvoice, edited media, repurposed media, social engineering hoặc chưa đủ dữ liệu?',
            'Phần 2 — Đánh dấu red flags: chọn ít nhất 5 dấu hiệu đỏ từ hồ sơ.',
            'Phần 3 — Áp dụng Deepfense Check: điền Pause — Observe — Verify — Trace — Decide.',
            'Phần 4 — Đánh giá rủi ro: thấp, trung bình, cao hoặc khẩn cấp.',
            'Phần 5 — Kết luận và hành động: viết 3-5 câu — bạn sẽ làm gì và vì sao?',
          ], [
            'Capstone không yêu cầu chứng minh 100% video là deepfake. Mục tiêu là nhận ra tổng hợp các tín hiệu rủi ro và chọn hành động an toàn.',
          ]),
          lesson('6.2.2', 'Gợi ý phân tích', [
            'Phân loại nội dung: Tài liệu A — có thể là deepfake hoặc video mạo danh, chưa đủ dữ liệu kết luận tuyệt đối. Tài liệu B — có thể là tài khoản bị chiếm quyền hoặc social engineering. Tài liệu C — ảnh chụp bình luận không phải bằng chứng, có thể bị chọn lọc hoặc dàn dựng. Tài liệu D — có thể là deepvoice hoặc tin nhắn thoại thật từ tài khoản bị chiếm quyền, vẫn rủi ro cao. Tài liệu E — detector không phát hiện rõ không đồng nghĩa nội dung an toàn. Tài liệu F — kênh chính thức không xác nhận và có cảnh báo người dùng, làm rủi ro tăng.',
            'Red flags: người nổi tiếng kêu gọi đầu tư; tài khoản gần giống chính thức nhưng không xác minh; link rút gọn; yêu cầu đăng ký hoặc nạp tiền hôm nay; bạn cũ thúc giục nhưng né gọi điện; tin nhắn thoại tạo áp lực; bình luận tích cực không có nguồn gốc; kênh chính thức không có thông tin; có cảnh báo lừa đảo từ người dùng; lời hứa thu nhập dễ dàng.',
            'Deepfense Check — Pause: nội dung liên quan đến tiền, người nổi tiếng, link và áp lực thời gian. Observe: có nhiều dấu hiệu ngữ cảnh rủi ro — tài khoản không chính thức, link rút gọn, lời hứa lợi ích, bạn cũ né xác minh, giọng nói không đủ tin. Verify: kiểm tra kênh chính thức của người nổi tiếng, liên hệ bạn cũ qua số hoặc kênh khác, kiểm tra nền tảng qua nguồn đáng tin. Trace: tìm nguồn video gốc, kiểm tra tài khoản đăng đầu tiên, kiểm tra tên miền và link, tìm cảnh báo từ nguồn độc lập. Decide: không bấm link, không nạp tiền, cảnh báo bạn cũ và người thân nếu có nguy cơ, báo cáo tài khoản hoặc link nếu nghi lừa đảo.',
            'Đánh giá rủi ro: rủi ro cao. Không cần chứng minh chắc chắn video là deepfake để từ chối nạp tiền. Các tín hiệu ngữ cảnh đã đủ để không hành động theo yêu cầu.',
          ], [
            'Khi nhiều tín hiệu nhỏ cùng chỉ về một hướng rủi ro, bạn không cần đợi bằng chứng tuyệt đối mới chọn phương án an toàn.',
          ]),
          lesson('6.2.3', 'Rubric và phản hồi mẫu', [
            'Rubric capstone — tổng điểm đề xuất 20 điểm: phân loại nội dung (4đ) — nhận ra nhiều khả năng deepfake, deepvoice, social engineering hoặc chưa đủ dữ liệu; red flags (4đ) — nêu ít nhất 5 dấu hiệu đỏ phù hợp; Deepfense Check (5đ) — điền đủ 5 bước, hành động hợp lý; đánh giá rủi ro (3đ) — chọn mức cao hoặc khẩn cấp và giải thích được; kết luận và hành động (4đ) — không bấm link, không nạp tiền, xác minh kênh độc lập, báo cáo hoặc cảnh báo phù hợp.',
            'Điều kiện hoàn thành gợi ý: từ 14/20 điểm trở lên hoặc hoàn thành đầy đủ với phản hồi sửa lỗi.',
            'Phản hồi mẫu — nếu chọn không bấm link, không nạp tiền: đây là hướng xử lý an toàn. Bạn không cần chứng minh 100% video là deepfake. Khi nội dung liên quan đến tiền, người nổi tiếng, link rút gọn và áp lực thời gian, rủi ro đã đủ cao để dừng lại và xác minh.',
            'Nếu chọn nạp thử số tiền nhỏ: đây là lựa chọn rủi ro. Kẻ lừa đảo thường bắt đầu bằng số tiền nhỏ để tạo niềm tin hoặc mở đường cho yêu cầu lớn hơn. Nếu tin detector hoàn toàn: detector chỉ là một tín hiệu tham khảo — kết quả "không phát hiện deepfake rõ ràng" không có nghĩa là nội dung an toàn khi ngữ cảnh có nhiều dấu hiệu lừa đảo. Nếu muốn chia sẻ video để hỏi mọi người: chia sẻ lại video có thể giúp nội dung lừa đảo lan rộng hơn — cách tốt hơn là gửi riêng cho người có trách nhiệm.',
          ], [
            'Phòng vệ tốt không phải là sống trong nghi ngờ. Phòng vệ tốt là có quy tắc đủ rõ để bạn vẫn bình tĩnh khi nội dung trên màn hình cố làm bạn mất bình tĩnh.',
            'Sau Module 6, bạn đã sẵn sàng làm bài kiểm tra cuối khóa DEEPFENSE BASIC.',
          ]),
        ],
        checkpoint: null,
      },
      // ── M6-62-E ──────────────────────────────────────────────────`;

fs.writeFileSync(fp, before + section + after, 'utf8');
console.log('Done. File length:', (before + section + after).length);
