'use strict';
const fs = require('fs');
const path = require('path');

const fp = path.join(__dirname, 'src', 'data', 'course.js');
let src = fs.readFileSync(fp, 'utf8');

const S = '      // ── M5-52-S ──────────────────────────────────────────────────';
const E = '      // ── M5-52-E ──────────────────────────────────────────────────';

const si = src.indexOf(S);
const ei = src.indexOf(E);
if (si === -1) throw new Error('Start marker M5-52-S not found');
if (ei === -1) throw new Error('End marker M5-52-E not found');

const before = src.slice(0, si);
const after  = src.slice(ei + E.length);

const section = `      // ── M5-52-S ──────────────────────────────────────────────────
      {
        title: '5.2 Học đường, danh dự và hình ảnh nhạy cảm',
        lessons: [
          lesson('5.2.0', 'Mục tiêu bài học 5.2', [
            'Sau phần 5.2, bạn sẽ hiểu vì sao deepfake nhạy cảm có thể gây hại nghiêm trọng dù "không phải ảnh thật".',
            'Bạn sẽ biết cách phản ứng khi thấy hình ảnh hoặc video nhạy cảm trong nhóm chat hoặc mạng xã hội, biết ưu tiên giảm lan truyền và bảo vệ người bị hại.',
            'Bạn cũng sẽ hiểu trách nhiệm của người xem, người chia sẻ và người quản trị nhóm.',
          ], [
            'Mục tiêu chính: giảm lan truyền, bảo vệ người bị hại, không đứng xem.',
          ]),
          lesson('5.2.1', '"Ảnh giả" vẫn có thể gây đau thật', [
            'Trong học đường hoặc cộng đồng trẻ, một hình ảnh nhạy cảm giả mạo có thể bị dùng để bắt nạt, bôi nhọ, trêu chọc, tống tiền, ép im lặng, làm người khác xấu hổ, hoặc phá hoại quan hệ bạn bè, gia đình, trường học.',
            'Một câu rất nguy hiểm là: "Có phải ảnh thật đâu mà nghiêm trọng." — Sai. Nếu hình ảnh khiến người khác bị xấu hổ, bị đe dọa, bị xa lánh hoặc bị tổn thương, hậu quả là thật.',
            'Người bị hại có thể: lo sợ, mất ngủ, không dám đến lớp, bị trêu chọc, bị gia đình hiểu lầm, bị ảnh hưởng danh dự, bị áp lực tâm lý nặng.',
          ], [
            'Không lan truyền nội dung nhạy cảm, dù bạn nghĩ nó thật hay giả.',
          ]),
          lesson('5.2.2', 'Nếu thấy hình ảnh nhạy cảm trong nhóm chat', [
            'Việc cần làm: không lưu về nếu không có lý do báo cáo an toàn; không chuyển tiếp; không bình luận đùa, chấm điểm, suy đoán hoặc bêu tên; báo cáo nội dung trên nền tảng nếu có thể.',
            'Báo cho người có trách nhiệm: giáo viên, phụ huynh, quản trị viên, cố vấn, người lớn đáng tin. Nếu bạn biết người bị hại, hãy hỗ trợ bằng cách bình tĩnh, không tra hỏi gây áp lực. Nếu bạn là quản trị nhóm, hãy xóa nội dung và nhắc quy tắc không lan truyền.',
            'Việc không nên làm: "Gửi mình xem với.", "Ai có bản gốc không?", "Không biết thật giả, lưu lại đã.", "Phóng to xem có lỗi AI không.", "Tag người đó vào cho vui.", "Đăng lên nhóm khác để cảnh báo." — những hành động này có thể làm tổn hại lan rộng hơn.',
          ], [
            'Khi thấy nội dung nhạy cảm trong nhóm: không lưu, không gửi, không bình luận — báo người có trách nhiệm.',
          ]),
          lesson('5.2.3', 'Deepfense Check trong hình ảnh nhạy cảm', [
            'Với hình ảnh nhạy cảm, thứ tự ưu tiên khác với video đầu tư. Bạn không cần phân tích công khai xem ảnh có phải deepfake không. Bạn cần giảm hại trước.',
            'Pause: dừng trước khi lưu, gửi, bình luận. Observe: đây là nội dung nhạy cảm, có thể làm hại người trong ảnh. Verify: không xác minh bằng cách lan truyền — nếu cần, báo người có trách nhiệm xử lý riêng tư.',
            'Trace: chỉ truy nguồn nếu bạn có vai trò phù hợp và làm theo quy trình an toàn. Decide: không lan truyền, báo cáo, hỗ trợ người bị hại.',
          ], [
            'Với nội dung nhạy cảm, giảm lan truyền quan trọng hơn thỏa mãn tò mò.',
          ]),
          lesson('5.2.4', 'Nếu bạn là người bị hại', [
            'Nếu hình ảnh hoặc video giả mạo hoặc nhạy cảm liên quan đến bạn bị lan truyền — bạn không đáng bị đổ lỗi.',
            'Bạn nên: tìm một người lớn hoặc người tin cậy để nói chuyện; không thương lượng một mình nếu bị tống tiền; lưu bằng chứng an toàn gồm ảnh chụp màn hình, link, tài khoản, thời gian; báo cáo nội dung trên nền tảng; yêu cầu quản trị viên nhóm xóa nội dung.',
            'Báo nhà trường, gia đình hoặc cơ quan có trách nhiệm khi cần. Chăm sóc sức khỏe tinh thần của mình — chuyện này không nên được xử lý một mình.',
            'Nếu bạn thấy quá căng thẳng, hãy tìm người ở cạnh mình ngay. Không cần đợi đến khi "có đủ bằng chứng" mới được tìm hỗ trợ.',
          ], [
            'Bạn không đáng bị đổ lỗi. Tìm người tin cậy, lưu bằng chứng, báo cáo — không xử lý một mình.',
          ]),
          lesson('5.2.5', 'Nếu bạn là bạn bè hoặc người chứng kiến', [
            'Bạn có thể giúp bằng cách: không xin xem, không gửi tiếp, không đùa, nhắc người khác dừng lan truyền, báo cáo nội dung, hỏi người bị hại cần hỗ trợ gì, báo người có trách nhiệm nếu người bị hại đang bị tấn công.',
            'Một câu đơn giản có thể rất có ích: "Đừng gửi tiếp nữa. Dù thật hay giả thì cũng đang làm hại người khác." — Đó là hành động bảo vệ cộng đồng.',
          ], [
            'Người tử tế không đứng xem. Người tử tế giúp giảm lan truyền.',
          ]),
          lesson('5.2.6', 'Nếu bạn là giáo viên, phụ huynh hoặc quản trị viên nhóm', [
            'Ưu tiên đầu tiên là an toàn và giảm lan truyền. Nên: gỡ nội dung khỏi nhóm hoặc kênh nếu có quyền; nhắc rõ quy tắc không chia sẻ tiếp; lưu bằng chứng ở mức cần thiết và an toàn; hỗ trợ người bị hại riêng tư; tránh chất vấn công khai; không biến nạn nhân thành người phải tự chứng minh.',
            'Không nên: chiếu nội dung cho nhiều người xem để "xác minh"; hỏi trước lớp; đổ lỗi người bị hại; yêu cầu người bị hại tự đi tìm từng người đã chia sẻ.',
            'Chuyển vụ việc đến người hoặc cơ quan phù hợp nếu nghiêm trọng.',
          ], [
            'Vai trò của người có trách nhiệm: gỡ nội dung, hỗ trợ riêng tư, không chất vấn công khai, không đổ lỗi nạn nhân.',
          ]),
        ],
        checkpoint: null,
      },
      // ── M5-52-E ──────────────────────────────────────────────────`;

fs.writeFileSync(fp, before + section + after, 'utf8');
console.log('Done. File length:', (before + section + after).length);
