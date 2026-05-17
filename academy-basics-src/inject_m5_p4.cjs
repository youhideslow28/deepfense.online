'use strict';
const fs = require('fs');
const path = require('path');

const fp = path.join(__dirname, 'src', 'data', 'course.js');
let src = fs.readFileSync(fp, 'utf8');

const S = '      // ── M5-53-S ──────────────────────────────────────────────────';
const E = '      // ── M5-53-E ──────────────────────────────────────────────────';

const si = src.indexOf(S);
const ei = src.indexOf(E);
if (si === -1) throw new Error('Start marker M5-53-S not found');
if (ei === -1) throw new Error('End marker M5-53-E not found');

const before = src.slice(0, si);
const after  = src.slice(ei + E.length);

// NOTE: 'liar\\'s' in template literal → outputs 'liar\'s' to file → valid escaped apostrophe in JS single-quoted string
const section = `      // ── M5-53-S ──────────────────────────────────────────────────
      {
        title: '5.3 Tin giả xã hội và "nội dung thật bị gọi là giả"',
        lessons: [
          lesson('5.3.0', 'Mục tiêu bài học 5.3', [
            'Sau phần 5.3, bạn sẽ hiểu cách deepfake và nội dung sai bối cảnh có thể tác động đến xã hội.',
            'Bạn sẽ biết vì sao clip ngắn gây phẫn nộ cần được kiểm chứng kỹ, hiểu hiện tượng "liar\\'s dividend" — nội dung thật bị phủ nhận là giả — và biết cách chia sẻ có trách nhiệm trong các vấn đề xã hội.',
          ], [
            'Tin giả có thể dùng deepfake để thuyết phục hơn. Chia sẻ nhanh có thể làm sai lan nhanh hơn đúng.',
          ]),
          lesson('5.3.1', 'Tin giả không chỉ là thông tin sai', [
            'Tin giả có thể gây hậu quả thật: làm người vô tội bị tấn công, kích động đám đông, gây hoang mang trong thiên tai hoặc dịch bệnh, làm người dân mất tiền, làm giảm niềm tin vào nguồn tin chính thống, khiến cộng đồng chia rẽ.',
            'Deepfake có thể làm tin giả thuyết phục hơn vì người xem nghĩ: "Tôi thấy người đó nói mà." Nhưng như bạn đã học, thấy một đoạn clip không có nghĩa là hiểu toàn bộ sự việc.',
          ], [
            'Deepfake không chỉ lừa cá nhân — nó có thể ảnh hưởng đến cả cộng đồng và xã hội.',
          ]),
          lesson('5.3.2', 'Clip ngắn gây phẫn nộ', [
            'Clip ngắn là định dạng rất dễ lan truyền. Nó có thể: cắt mất phần trước và sau, thiếu bối cảnh, dùng phụ đề dẫn dắt, gắn chú thích sai, ghép âm thanh khác, được đăng lại từ sự kiện cũ.',
            'Khi clip làm bạn giận ngay lập tức, hãy Pause. Hãy hỏi: clip dài bao nhiêu? Có bản đầy đủ không? Ai đăng đầu tiên? Sự việc xảy ra ở đâu, khi nào? Có nguồn độc lập xác nhận không? Có ai đang kêu gọi tấn công hoặc bêu tên không?',
          ], [
            'Phẫn nộ là cảm xúc thật, nhưng chưa chắc dựa trên bối cảnh thật.',
          ]),
          lesson('5.3.3', 'Sai bối cảnh có thể nguy hiểm như giả', [
            'Một video thật đặt sai bối cảnh có thể gây hiểu nhầm rất mạnh. Ví dụ: video cũ được đăng như sự kiện mới, video ở quốc gia khác được nói là ở Việt Nam, clip hậu trường được nói là vụ việc thật, ảnh thiên tai cũ được dùng để kêu gọi quyên góp giả, video xung đột cũ được dùng để kích động nhóm người hiện tại.',
            'Trong các tình huống này, câu hỏi "có phải deepfake không?" chưa đủ. Câu hỏi đúng hơn là: nội dung này có đang kể đúng câu chuyện về thời gian, địa điểm và người liên quan không?',
          ], [
            'Video thật bị dùng sai bối cảnh có thể gây hại không kém video giả.',
          ]),
          lesson('5.3.4', 'Liar\\'s dividend: khi sự thật bị gọi là deepfake', [
            'Deepfake còn tạo ra một rủi ro ngược. Khi mọi người biết rằng video và giọng nói có thể bị giả, một người có thể phủ nhận nội dung thật bằng cách nói: "Đó là deepfake." Hiện tượng này được gọi là liar\\'s dividend.',
            'Điều này làm việc tìm sự thật khó hơn. Vì vậy, chúng ta không nên dùng từ "deepfake" như một cách phủ nhận mọi nội dung mình không thích.',
            'Nếu muốn nói có trách nhiệm, hãy dùng các câu: "Tôi chưa thấy nguồn gốc rõ.", "Cần kiểm chứng thêm.", "Chưa có đủ bằng chứng để kết luận.", "Cần xem bản đầy đủ.", "Cần nguồn độc lập xác nhận." — thay vì "Giả hết." hoặc "Thật 100%."',
          ], [
            'Liar\\'s dividend: deepfake khiến người ta dễ phủ nhận cả nội dung thật. Không dùng "deepfake" như một cách phủ nhận mọi thứ mình không thích.',
          ]),
          lesson('5.3.5', 'Quy tắc chia sẻ có trách nhiệm', [
            'Trước khi chia sẻ một nội dung xã hội gây sốc, hãy hỏi: Mình có biết nguồn gốc không? Có nguồn độc lập xác nhận không? Nội dung có thể làm hại ai không? Có đang bêu tên, lộ mặt, lộ địa chỉ người chưa được xác minh không?',
            'Có lời kêu gọi tấn công, trả thù, xúc phạm không? Nếu nội dung sai, hậu quả là gì? Mình chia sẻ để giúp kiểm chứng hay để xả cảm xúc?',
            'Nếu chưa chắc, bạn có thể: không chia sẻ; chỉ gửi riêng cho người có chuyên môn hoặc người có trách nhiệm để hỏi; chia sẻ nguồn kiểm chứng thay vì clip gốc; viết rõ "chưa xác minh" nếu cần thảo luận — nhưng tốt nhất vẫn không lan truyền nội dung gây hại.',
          ], [
            'Trong vấn đề xã hội, chia sẻ nhanh có thể làm sai lan nhanh hơn đúng.',
            'Bảy câu hỏi trước khi chia sẻ: nguồn gốc, xác nhận độc lập, có gây hại không, có bêu tên không, có kêu gọi tấn công không, hậu quả nếu sai, chia sẻ để làm gì.',
          ]),
        ],
        checkpoint: null,
      },
      // ── M5-53-E ──────────────────────────────────────────────────`;

fs.writeFileSync(fp, before + section + after, 'utf8');
console.log('Done. File length:', (before + section + after).length);
