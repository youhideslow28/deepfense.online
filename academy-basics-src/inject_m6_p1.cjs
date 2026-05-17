'use strict';
const fs = require('fs');
const path = require('path');

const fp = path.join(__dirname, 'src', 'data', 'course.js');
let src = fs.readFileSync(fp, 'utf8');

const START = '  // ── MODULES 6–9: Placeholder ──────────────────────';
const si = src.indexOf(START);
if (si === -1) throw new Error('Start marker not found');

const before = src.slice(0, si);

const newContent = `  // ── MODULE 6 ─────────────────────────────────────────────────────
  {
    id: 6, part: 'recognition',
    title: 'Phòng vệ cá nhân và cộng đồng',
    duration: '95-110 phút', level: 'Recognition',
    scenario: 'Sau 5 module, An đã thay đổi cách nhìn nhận nội dung số. Nhưng An nhận ra: nếu chỉ một mình An biết cách phòng vệ, rủi ro vẫn còn. Gia đình, bạn bè, đồng nghiệp và người thân vẫn có thể bị lừa. Phòng vệ trước deepfake không chỉ là kỹ năng cá nhân — đó là thói quen cộng đồng.',
    outcomes: [
      'Thiết lập được bộ quy tắc Deepfense Shield cho bản thân và gia đình hoặc nhóm của mình.',
      'Biết giảm rủi ro từ dữ liệu cá nhân, hình ảnh, giọng nói và tài khoản.',
      'Biết lưu bằng chứng và báo cáo khi gặp nội dung giả mạo hoặc lừa đảo.',
      'Biết hỗ trợ người khác mà không làm tăng lan truyền nội dung gây hại.',
      'Hoàn thành capstone tổng hợp bằng cách đánh giá một hồ sơ sự việc có nhiều tín hiệu.',
    ],
    sections: [
      {
        title: '6.0 Câu chuyện dẫn nhập: An không muốn chỉ học cho mình',
        lessons: [
          lesson('6.0.0', 'An không muốn chỉ học cho mình', [
            'Sau 5 module, An đã thay đổi. An không còn nhìn một video gây sốc như trước. An không còn nghe một giọng quen rồi lập tức tin. An không còn muốn chia sẻ ngay khi thấy một clip khiến mình phẫn nộ. An cũng biết rằng hình ảnh nhạy cảm, dù thật hay giả, có thể gây tổn thương thật.',
            'Nhưng An nhận ra một điều: nếu chỉ một mình An biết cách phòng vệ, rủi ro vẫn còn. Gia đình An vẫn có thể bị gọi điện giả giọng. Bạn bè An vẫn có thể chuyển tiền vì một tài khoản bị chiếm quyền. Nhóm lớp vẫn có thể lan truyền hình ảnh gây hại. Đồng nghiệp vẫn có thể bấm link từ một video giả mạo sếp.',
            'Phòng vệ trước deepfake không chỉ là kỹ năng cá nhân. Nó là thói quen cộng đồng.',
            'Module 6 sẽ giúp bạn biến những điều đã học thành bộ quy tắc Deepfense Shield đơn giản có thể áp dụng ngay: Family Code, Money Delay, Two-Channel Rule, No Shame Reporting và Evidence First.',
          ], [
            'Phòng vệ cá nhân là khởi đầu. Phòng vệ cộng đồng là mục tiêu.',
          ]),
        ],
        checkpoint: null,
      },
      {
        title: '6.1 Bộ quy tắc Deepfense Shield',
        lessons: [
          lesson('6.1.0', 'Mục tiêu bài học 6.1', [
            'Sau phần 6.1, bạn sẽ hiểu 5 quy tắc Deepfense Shield và biết áp dụng từng quy tắc vào gia đình, trường học, công việc và mạng xã hội.',
            'Bạn sẽ biết thiết kế phản xạ phòng vệ trước khi sự cố xảy ra và biết hỗ trợ người khác mà không làm họ xấu hổ.',
          ], [
            '5 quy tắc Deepfense Shield: Family Code, Money Delay, Two-Channel Rule, No Shame Reporting, Evidence First.',
          ]),
          lesson('6.1.1', 'Quy tắc 1: Family Code', [
            'Family Code là câu hoặc từ xác minh riêng giữa những người tin cậy. Nó dùng cho tình huống khẩn cấp, đặc biệt khi có giọng nói hoặc video giống người thân. Ví dụ: một câu hỏi gia đình tự đặt, một cụm từ chỉ người trong nhà hiểu, một quy ước "nếu cần tiền gấp, phải gọi lại số cũ và nói đúng câu xác minh".',
            'Family Code tốt nên: dễ nhớ, không đăng lên mạng, không dựa vào thông tin công khai, có thể thay đổi nếu nghi đã lộ, được thống nhất trước với người thân.',
            'Không nên dùng: ngày sinh, tên thú cưng đã đăng công khai, địa chỉ nhà, tên trường hoặc công ty, câu hỏi mà người ngoài có thể đoán từ mạng xã hội.',
            'Ví dụ ứng dụng: người gọi nói giống em bạn — "Anh ơi chuyển tiền gấp." Bạn có thể nói: "Anh sẽ gọi lại số cũ. Nếu đúng là em, mình dùng câu xác minh như đã thống nhất." Family Code không phải để làm khó người thân — nó giúp cả nhà an toàn hơn.',
          ], [
            'Family Code: câu xác minh riêng, dễ nhớ, không công khai, thống nhất trước với người thân.',
          ]),
          lesson('6.1.2', 'Quy tắc 2: Money Delay', [
            'Money Delay là quy tắc trì hoãn bắt buộc trước mọi yêu cầu tiền bất thường. Nói đơn giản: không chuyển tiền trong trạng thái bị thúc ép.',
            'Bạn có thể đặt quy tắc: mọi yêu cầu tiền bất thường phải chờ ít nhất 5-10 phút để xác minh; mọi yêu cầu chuyển vào tài khoản lạ phải gọi lại kênh độc lập; mọi yêu cầu tiền từ người quen online phải kiểm tra với người tin cậy; mọi yêu cầu đầu tư phải kiểm tra nguồn chính thức và không quyết định trong cùng ngày.',
            'Lừa đảo thường thắng nhờ tốc độ. Money Delay lấy lại tốc độ đó từ tay kẻ xấu. Nếu tình huống là thật, 5-10 phút xác minh giúp bạn giúp đúng người. Nếu tình huống là giả, 5-10 phút có thể cứu bạn khỏi mất tiền.',
          ], [
            'Tiền đi nhanh, khó quay lại. Hãy cho mình một khoảng dừng.',
          ]),
          lesson('6.1.3', 'Quy tắc 3: Two-Channel Rule', [
            'Two-Channel Rule nghĩa là với tình huống rủi ro cao, bạn cần xác minh qua ít nhất hai kênh hoặc hai tín hiệu đáng tin. Ví dụ: tin nhắn mượn tiền + gọi lại số đã lưu; video người nổi tiếng đầu tư + kiểm tra kênh chính thức; email đổi tài khoản nhận tiền + gọi xác nhận với người phụ trách; cuộc gọi từ "ngân hàng" + tự mở app hoặc gọi tổng đài chính thức.',
            'Cần Two-Channel Rule khi nội dung liên quan đến: tiền, OTP hoặc mật khẩu, tài khoản, giấy tờ cá nhân, hình ảnh nhạy cảm, danh dự người khác, tin tức xã hội gây phẫn nộ, yêu cầu cài app hoặc bấm link, yêu cầu giữ bí mật.',
          ], [
            'Một kênh có thể bị giả. Hai kênh độc lập làm kịch bản giả khó hơn nhiều.',
          ]),
          lesson('6.1.4', 'Quy tắc 4: No Shame Reporting', [
            'No Shame Reporting nghĩa là báo cáo sớm mà không làm người bị hại xấu hổ. Nhiều người im lặng sau khi bị lừa hoặc bị mạo danh vì: sợ bị chê ngốc, sợ gia đình mắng, sợ bạn bè cười, sợ bị đổ lỗi, sợ chuyện lan rộng hơn. Kẻ xấu rất thích sự im lặng đó.',
            'Nếu bạn thấy người khác bị lừa, đừng nói "Sao bạn dễ tin thế?" — hãy nói "Mình xử lý từng bước nhé. Lưu bằng chứng trước, rồi báo nền tảng, ngân hàng hoặc người có trách nhiệm."',
            'Nếu bạn thấy hình ảnh nhạy cảm của ai đó, đừng hỏi "Có thật không?" — hãy nói "Đừng gửi tiếp. Mình tìm cách báo cáo và hỗ trợ người đó."',
          ], [
            'Xấu hổ làm nạn nhân im lặng. Im lặng làm kẻ xấu mạnh hơn.',
          ]),
          lesson('6.1.5', 'Quy tắc 5: Evidence First', [
            'Evidence First nghĩa là ưu tiên lưu bằng chứng an toàn trước khi xóa, chặn hoặc tranh cãi. Bằng chứng có thể gồm: ảnh chụp màn hình, link bài đăng, tên tài khoản, số điện thoại, số tài khoản, thời gian, nội dung tin nhắn, mã giao dịch, website hoặc link nghi vấn.',
            'Bằng chứng giúp: báo cáo nền tảng, liên hệ ngân hàng, trình báo khi cần, chứng minh tài khoản bị mạo danh, ngăn người khác bị lừa tiếp.',
            'Nên: chụp màn hình vừa đủ thông tin, lưu link nếu có, ghi lại thời gian, không chỉnh sửa ảnh chụp màn hình. Không nên: đăng tràn lan thông tin cá nhân người khác, lưu hoặc phát tán hình ảnh nhạy cảm, tự điều tra công khai trong nhóm đông người, đối đầu với kẻ xấu khi đang hoảng.',
            'Với hình ảnh nhạy cảm, nếu bạn không phải người có trách nhiệm xử lý, ưu tiên báo cáo nền tảng hoặc người có trách nhiệm — không lưu trữ hoặc chia sẻ thêm.',
          ], [
            'Lưu bằng chứng để xử lý, không phải để lan truyền.',
          ]),
          lesson('6.1.6', 'Deepfense Shield trong 4 môi trường', [
            'Gia đình: thống nhất Family Code; dặn người lớn tuổi không chuyển tiền khi bị gọi gấp; lưu số điện thoại quan trọng; quy ước ai cần tiền gấp cũng phải chấp nhận gọi lại.',
            'Trường học: không lan truyền hình ảnh nhạy cảm; báo giáo viên hoặc người phụ trách khi có nội dung gây hại; không bêu tên người trong clip chưa xác minh; học sinh được khuyến khích báo sớm mà không sợ bị mắng.',
            'Công việc: không chuyển tiền ngoài quy trình; không gửi dữ liệu nhạy cảm qua kênh lạ; xác minh yêu cầu từ lãnh đạo qua kênh nội bộ; cảnh báo bộ phận IT hoặc an toàn thông tin khi có nghi vấn.',
            'Mạng xã hội: không chia sẻ clip gây sốc khi chưa rõ nguồn; không bấm link đầu tư, quà tặng hoặc tài khoản từ video lạ; báo cáo tài khoản mạo danh; cảnh báo bạn bè bằng thông tin đã kiểm chứng.',
          ], [
            'Phòng vệ tốt không bắt đầu khi sự cố xảy ra. Phòng vệ tốt bắt đầu từ quy tắc đã thống nhất trước.',
          ]),
        ],
        checkpoint: checkpoint('Quiz 6.1 — Quy tắc phòng vệ', [
          q('Family Code dùng để làm gì?', ['Tăng lượt thích trên mạng xã hội.', 'Xác minh nhanh trong tình huống khẩn cấp giữa những người tin cậy.', 'Thay thế hoàn toàn ngân hàng.', 'Đăng công khai để mọi người biết.'], 1),
          q('Money Delay nghĩa là gì?', ['Chuyển tiền càng nhanh càng tốt.', 'Trì hoãn bắt buộc để xác minh trước yêu cầu tiền bất thường.', 'Không bao giờ chuyển tiền cho ai.', 'Chỉ chuyển tiền vào ban đêm.'], 1),
          q('Tình huống nào cần Two-Channel Rule?', ['Xem ảnh minh họa được ghi rõ là AI.', 'Người quen nhắn mượn tiền qua tài khoản có hành vi lạ.', 'Đổi hình nền điện thoại.', 'Đọc bài viết giải trí không yêu cầu hành động.'], 1),
          q('No Shame Reporting nghĩa là gì?', ['Không báo cáo vì xấu hổ.', 'Báo cáo sớm, không đổ lỗi hoặc làm nạn nhân xấu hổ.', 'Đăng mọi thứ lên mạng để mọi người biết.', 'Chỉ báo cáo khi đã chắc chắn 100%.'], 1),
          q('Evidence First nghĩa là gì?', ['Lưu bằng chứng an toàn trước khi xóa, chặn hoặc tranh cãi.', 'Đăng bằng chứng lên mọi nhóm.', 'Xóa hết tin nhắn ngay.', 'Chỉ nhớ trong đầu.'], 0),
          q('Điều nào KHÔNG nên dùng làm Family Code?', ['Một cụm từ riêng gia đình tự đặt.', 'Một câu xác minh không công khai.', 'Ngày sinh đã đăng công khai trên mạng xã hội.', 'Một quy ước gọi lại số cũ.'], 2),
          q('Bạn thấy hình ảnh nhạy cảm của một bạn học trong nhóm chat. Theo Deepfense Shield, hành động đúng là gì?', ['Gửi tiếp để hỏi thật giả.', 'Không lan truyền, báo cáo và hỗ trợ người bị hại.', 'Bình luận đùa nếu nghĩ là AI.', 'Lưu lại để phân tích.'], 1),
          q('Nếu đã lỡ chuyển tiền cho kẻ lừa đảo, việc nào nên làm sớm?', ['Xóa hết vì xấu hổ.', 'Liên hệ ngân hàng, lưu bằng chứng và báo cáo.', 'Im lặng chờ may mắn.', 'Chuyển thêm để lấy lại khoản đầu.'], 1),
          q('Trong công việc, một "sếp" gửi tin nhắn yêu cầu bỏ qua quy trình chuyển tiền vì đang gấp. Quy tắc nào phù hợp nhất?', ['Two-Channel Rule và Money Delay.', 'Chia sẻ công khai lên mạng xã hội ngay.', 'Chuyển trước rồi hỏi sau.', 'Tin nếu ảnh đại diện đúng.'], 0),
          q('Mục tiêu của Deepfense Shield là gì?', ['Làm người học sợ Internet.', 'Biến kiến thức thành quy tắc phòng vệ dễ áp dụng trong đời sống.', 'Dạy tạo deepfake.', 'Thay thế mọi cơ quan chức năng.'], 1),
        ]),
      },
      // ── M6-611-S ─────────────────────────────────────────────────
      { title: '6.1.1 Vệ sinh dữ liệu cá nhân', lessons: [lesson('6.1.1.ph', 'Đang xây dựng', ['Nội dung phần 6.1.1 sẽ được cập nhật ở Phiên 2.'], ['Sắp có.'])], checkpoint: null },
      // ── M6-611-E ─────────────────────────────────────────────────
      // ── M6-62-S ──────────────────────────────────────────────────
      { title: '6.2 Capstone: Hồ sơ sự việc của An', lessons: [lesson('6.2.ph', 'Đang xây dựng', ['Nội dung phần 6.2 sẽ được cập nhật ở Phiên 3.'], ['Sắp có.'])], checkpoint: null },
      // ── M6-62-E ──────────────────────────────────────────────────
    ],
    quiz: [
      q('Family Code dùng để làm gì?', ['Tăng lượt thích trên mạng xã hội.', 'Xác minh nhanh trong tình huống khẩn cấp giữa những người tin cậy.', 'Thay thế hoàn toàn ngân hàng.', 'Đăng công khai để mọi người biết.'], 1),
      q('Money Delay nghĩa là gì?', ['Chuyển tiền càng nhanh càng tốt.', 'Trì hoãn bắt buộc để xác minh trước yêu cầu tiền bất thường.', 'Không bao giờ chuyển tiền cho ai.', 'Chỉ chuyển tiền vào ban đêm.'], 1),
      q('Tình huống nào cần Two-Channel Rule?', ['Xem ảnh minh họa được ghi rõ là AI.', 'Người quen nhắn mượn tiền qua tài khoản có hành vi lạ.', 'Đổi hình nền điện thoại.', 'Đọc bài viết giải trí không yêu cầu hành động.'], 1),
      q('No Shame Reporting nghĩa là gì?', ['Không báo cáo vì xấu hổ.', 'Báo cáo sớm, không đổ lỗi hoặc làm nạn nhân xấu hổ.', 'Đăng mọi thứ lên mạng để mọi người biết.', 'Chỉ báo cáo khi đã chắc chắn 100%.'], 1),
      q('Evidence First nghĩa là gì?', ['Lưu bằng chứng an toàn trước khi xóa, chặn hoặc tranh cãi.', 'Đăng bằng chứng lên mọi nhóm.', 'Xóa hết tin nhắn ngay.', 'Chỉ nhớ trong đầu.'], 0),
      q('Điều nào KHÔNG nên dùng làm Family Code?', ['Một cụm từ riêng gia đình tự đặt.', 'Một câu xác minh không công khai.', 'Ngày sinh đã đăng công khai trên mạng xã hội.', 'Một quy ước gọi lại số cũ.'], 2),
      q('Bạn thấy hình ảnh nhạy cảm của một bạn học trong nhóm chat. Theo Deepfense Shield, hành động đúng là gì?', ['Gửi tiếp để hỏi thật giả.', 'Không lan truyền, báo cáo và hỗ trợ người bị hại.', 'Bình luận đùa nếu nghĩ là AI.', 'Lưu lại để phân tích.'], 1),
      q('Nếu đã lỡ chuyển tiền cho kẻ lừa đảo, việc nào nên làm sớm?', ['Xóa hết vì xấu hổ.', 'Liên hệ ngân hàng, lưu bằng chứng và báo cáo.', 'Im lặng chờ may mắn.', 'Chuyển thêm để lấy lại khoản đầu.'], 1),
      q('Trong công việc, một "sếp" gửi tin nhắn yêu cầu bỏ qua quy trình chuyển tiền vì đang gấp. Quy tắc nào phù hợp nhất?', ['Two-Channel Rule và Money Delay.', 'Chia sẻ công khai lên mạng xã hội ngay.', 'Chuyển trước rồi hỏi sau.', 'Tin nếu ảnh đại diện đúng.'], 0),
      q('Mục tiêu của Deepfense Shield là gì?', ['Làm người học sợ Internet.', 'Biến kiến thức thành quy tắc phòng vệ dễ áp dụng trong đời sống.', 'Dạy tạo deepfake.', 'Thay thế mọi cơ quan chức năng.'], 1),
    ],
  },

  // ── MODULES 7–9: Placeholder ──────────────────────────────
  ...[7, 8, 9].map(id => ({
    id, part: 'response',
    title: [
      'Phòng ngừa deepfake cho cá nhân',
      'Ứng phó khi gặp hoặc trở thành nạn nhân',
      'Deepfake trong tổ chức: SOC, GRC và security awareness',
    ][id - 7],
    duration: '90-100 phút', level: 'Response',
    scenario: 'Nội dung đang được xây dựng. Sẽ cập nhật sớm.',
    outcomes: ['Nội dung đang được phát triển.'],
    sections: [
      {
        title: \`\${id}.1 Nội dung đang được xây dựng\`,
        lessons: [
          lesson(\`\${id}.0.0\`, 'Module đang được phát triển', [
            \`Module \${id} đang trong quá trình xây dựng. Nội dung sẽ được cập nhật sớm.\`,
            'Bạn có thể tiếp tục với các module đã hoàn thành và quay lại đây sau.',
          ], ['Nội dung module này sẽ sớm được cập nhật.']),
        ],
        checkpoint: null,
      },
    ],
    quiz: [q('Module này đang được xây dựng.', ['OK', 'Hiểu rồi', 'Sẽ quay lại', 'Cảm ơn'], 0)],
  })),
];

// ── HELPERS FOR NAVIGATION ───────────────────────────────────────
export function buildLessonIndex() {
  const index = [];
  for (const mod of MODULES) {
    for (const sec of mod.sections) {
      for (const les of sec.lessons) {
        index.push({ moduleId: mod.id, sectionTitle: sec.title, lesson: les, checkpoint: sec.checkpoint });
      }
    }
  }
  return index;
}`;

fs.writeFileSync(fp, before + newContent, 'utf8');
console.log('Done. File length:', (before + newContent).length);
