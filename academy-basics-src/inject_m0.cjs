// inject_m0.cjs — replaces Module 0 in course.js from DEEPFENSE_BASIC_Module_0_1_Content_v1.md
const fs = require('fs');
const path = require('path');

const file = path.join(__dirname, 'src', 'data', 'course.js');
let src = fs.readFileSync(file, 'utf8');

const MODULE0 = `  // ── MODULE 0 ─────────────────────────────────────────────────
  {
    id: 0, part: 'intro',
    title: 'Một ngày bình thường trên không gian số',
    duration: '25-30 phút', level: 'Intro',
    scenario: 'An trải qua một ngày bình thường: thấy video đầu tư của người nổi tiếng, nhận tin nhắn mượn tiền từ bạn cũ, thấy ảnh nhạy cảm trong nhóm chat, nhận cuộc gọi giống người thân, rồi thấy clip gây phẫn nộ trước khi ngủ. Nếu là An, bạn sẽ làm gì?',
    outcomes: [
      'Hiểu vì sao deepfake không còn là chuyện xa lạ của người nổi tiếng hay phim ảnh.',
      'Nhận ra rằng bất kỳ người dùng Internet nào cũng có thể gặp nội dung giả mạo, lừa đảo hoặc gây hiểu nhầm.',
      'Làm quen với cách học của DEEPFENSE BASIC: qua câu chuyện, tình huống, quan sát, quyết định và phản hồi.',
      'Tự kiểm tra phản xạ ban đầu của mình trước các tình huống nghi vấn trên không gian số.',
    ],
    sections: [
      {
        title: '0.0 Chào mừng đến với DEEPFENSE BASIC',
        lessons: [
          lesson('0.0.0', 'Chào mừng và điều quan trọng đầu tiên', [
            'Chào mừng bạn đến với DEEPFENSE BASIC — khóa học cơ bản về deepfake và phòng vệ trước nội dung giả mạo. Khóa học này không yêu cầu bạn biết lập trình, không yêu cầu hiểu sâu về trí tuệ nhân tạo, cũng không yêu cầu phải là chuyên gia an toàn thông tin.',
            'Bạn chỉ cần là một người đang sống trong thế giới số. Nếu bạn từng dùng mạng xã hội, từng nhận tin nhắn từ người lạ, từng xem video ngắn, từng nghe lời kêu gọi chuyển tiền, từng thấy hình ảnh gây sốc trong nhóm chat, từng băn khoăn "cái này có thật không?" — thì khóa học này dành cho bạn.',
            'Trong khóa học này, chúng ta không học cách tạo deepfake. Chúng ta học cách nhận ra rủi ro, kiểm chứng thông tin, bảo vệ bản thân, bảo vệ người khác và ra quyết định bình tĩnh hơn.',
            'Điều quan trọng đầu tiên: Deepfake không chỉ là một video giả — đó là một phần của vấn đề lớn hơn. Trước đây nhiều người nghĩ "Có hình thì chắc là thật." Sau đó học thêm "Ảnh có thể bị chỉnh sửa." Rồi video trở thành bằng chứng mạnh hơn. Nhưng bây giờ ngay cả hình ảnh, video và giọng nói cũng có thể được tạo ra hoặc chỉnh sửa bằng AI theo cách rất thuyết phục.',
            'Mục tiêu của DEEPFENSE BASIC: không hoảng sợ, không tin vội, không chia sẻ vội, không chuyển tiền khi đang bị gây áp lực, biết cách kiểm chứng trước khi hành động.',
          ], [
            'DEEPFENSE BASIC dành cho mọi người dùng Internet — không cần kiến thức kỹ thuật.',
            'Mục tiêu: không hoảng sợ, không tin vội, biết kiểm chứng trước khi hành động.',
          ]),
        ],
        checkpoint: null,
      },
      {
        title: '0.1 Câu chuyện mở đầu: Một ngày của An',
        lessons: [
          lesson('0.1.0', 'Một ngày bình thường và quy trình Deepfense Check', [
            'Trong khóa học này, bạn sẽ đi cùng nhân vật tên An — không phải chuyên gia công nghệ mà là người dùng Internet bình thường: có điện thoại, mạng xã hội, tài khoản ngân hàng, gia đình, bạn bè và lịch sử xem video khá giống chúng ta.',
            'Buổi sáng: An thấy video người nổi tiếng giới thiệu kênh đầu tư "lợi nhuận cao, rủi ro thấp". Gương mặt đúng là người đó, giọng nói cũng giống, video có hàng nghìn lượt xem, hàng trăm bình luận.',
            'Đến trưa: An nhận tin nhắn từ người bạn cũ cần mượn tiền gấp vì tài khoản ngân hàng bị khóa. Ảnh đại diện đúng là bạn của An, nhưng cách nhắn tin hơi khác.',
            'Chiều: trong nhóm chat xuất hiện hình ảnh nhạy cảm được cho là của một học sinh. Một số người cười cợt, một số nói đó là ảnh AI, một số bảo "không biết thật giả nhưng cứ lưu lại đã".',
            'Buổi tối: An nhận cuộc gọi video ngắn từ người trông giống người thân, nói đang gặp chuyện khẩn cấp. Cuộc gọi hơi giật, âm thanh không rõ, nhưng giọng rất quen.',
            'Trước khi ngủ: một đoạn clip chính trị gây phẫn nộ được chia sẻ dày đặc, nhiều người kêu gọi "chia sẻ ngay để mọi người biết sự thật".',
            'Không có câu trả lời hoàn hảo nếu không có phương pháp. Vì vậy, khóa học giúp bạn xây dựng quy trình Deepfense Check: (1) Pause — Dừng lại trước khi phản ứng. (2) Observe — Quan sát dấu hiệu kỹ thuật và ngữ cảnh. (3) Verify — Xác minh qua kênh độc lập. (4) Trace — Truy nguồn nội dung. (5) Decide — Ra quyết định an toàn.',
            'Câu cần nhớ từ Module 0: Khi nội dung khiến bạn sợ, giận, xấu hổ, thương hại hoặc muốn hành động ngay — đó là lúc bạn cần chậm lại.',
          ], [
            'An trải qua 5 tình huống deepfake/lừa đảo trong một ngày bình thường.',
            'Deepfense Check: Pause → Observe → Verify → Trace → Decide.',
            'Khi muốn hành động ngay — đó là lúc cần chậm lại.',
          ]),
        ],
        checkpoint: null,
      },
      {
        title: '0.2-0.3 Vì sao khóa học này cần thiết và cách học',
        lessons: [
          lesson('0.2.0', 'Tại sao và cách học DEEPFENSE BASIC', [
            'Deepfake nguy hiểm không phải chỉ vì nó giả. Nó nguy hiểm vì xuất hiện đúng lúc con người ít phòng bị nhất: khi ta lo cho người thân, sợ mất tiền, xấu hổ, giận dữ, muốn giúp ai đó, hoặc tin rằng mình đang nhìn thấy bằng chứng.',
            'Deepfake cũng không hoạt động một mình — thường đi cùng: tài khoản mạng xã hội bị chiếm quyền, tin nhắn thúc ép, link giả mạo, trang web giả, giả danh công an/ngân hàng/nhà trường/lãnh đạo/người nổi tiếng, sự lan truyền quá nhanh trong nhóm chat.',
            'Vì vậy, học về deepfake là học cách tự hỏi: Ai đang gửi nội dung này? Họ muốn mình làm gì? Vì sao mình phải làm ngay? Nếu mình sai, ai sẽ bị hại? Có cách nào kiểm chứng độc lập không?',
            'Cách học: mỗi phần thường có 5 thành phần — câu chuyện (tình huống giống đời thật), kiến thức (khái niệm/quy trình), quan sát (dấu hiệu/dữ kiện), quyết định (chọn hành động), phản hồi (giải thích vì sao an toàn hay rủi ro).',
            'Cuối khóa: bài kiểm tra 50 câu hỏi, ngẫu nhiên từ ngân hàng 150 câu. Đạt từ 70% trở lên: đủ điều kiện nhận chứng chỉ hoàn thành DEEPFENSE BASIC.',
          ], [
            'Deepfake nguy hiểm khi xuất hiện đúng lúc ta đang lo, sợ, giận hoặc muốn giúp.',
            '5 bước học: câu chuyện → kiến thức → quan sát → quyết định → phản hồi.',
            'Final exam: 50 câu từ ngân hàng 150 câu, đạt 70% để nhận chứng chỉ.',
          ]),
        ],
        checkpoint: null,
      },
      {
        title: '0.4 Pre-check: Phản xạ ban đầu của bạn',
        lessons: [
          lesson('0.4.0', 'Hướng dẫn pre-check', [
            'Trước khi bắt đầu, hãy trả lời 8 câu hỏi tình huống để tự kiểm tra phản xạ ban đầu. Đây không phải bài thi — không hiển thị đáp án đúng/sai theo kiểu chấm điểm. Sau khi hoàn thành, hệ thống hiển thị nhóm phản xạ và lời khuyên học tập.',
            'Pre-check không tính vào chứng chỉ. Mục tiêu là giúp bạn biết điểm xuất phát của mình.',
            'Nhóm 1 — Phản xạ nhanh, cần thêm lớp phòng vệ: bạn có xu hướng hành động nhanh khi gặp tình huống khẩn cấp hay cảm xúc mạnh. Khóa học sẽ giúp bạn thêm bước "dừng lại". Nhóm 2 — Đã biết nghi ngờ, cần quy trình rõ hơn: bạn đã có cảm giác cảnh giác tốt, bước tiếp là biến cảm giác đó thành quy trình kiểm chứng có thể lặp lại. Nhóm 3 — Phản xạ phòng vệ tốt: bạn đã chọn nhiều hành động an toàn, khóa học giúp bạn hiểu sâu hơn tại sao và cách hướng dẫn người khác.',
          ], [
            'Pre-check 8 câu — không tính vào chứng chỉ, giúp biết điểm xuất phát.',
            '3 nhóm phản xạ: hành động nhanh / đã biết nghi ngờ / phòng vệ tốt.',
          ]),
        ],
        checkpoint: checkpoint('0.4', [
          q('Bạn nhận cuộc gọi video từ người thân — hình hơi mờ, giọng khá giống, yêu cầu chuyển tiền trong 5 phút. Bạn nên làm gì trước tiên?', ['Chuyển tiền ngay vì có thể người thân đang nguy hiểm', 'Hỏi số tài khoản rồi chuyển một khoản nhỏ trước', 'Tắt cuộc gọi và gọi lại bằng số điện thoại đã lưu trước đó', 'Gửi OTP ngân hàng để người đó tự xử lý cho nhanh'], 2,
            'Xác minh qua kênh độc lập — gọi lại số đã lưu — là lựa chọn an toàn nhất.'),
          q('Bạn thấy video người nổi tiếng kêu gọi đầu tư, cam kết lợi nhuận cao mỗi ngày. Bạn nên nghĩ gì?', ['Người nổi tiếng đã nói thì chắc đáng tin', 'Video có thể là thật, giả hoặc bị cắt ghép; cần kiểm chứng nguồn chính thức', 'Chỉ cần đọc bình luận là biết thật giả', 'Nếu nhiều người chia sẻ thì chắc là thật'], 1,
            'Gương mặt và giọng nói không đủ để xác minh một lời kêu gọi tài chính.'),
          q('Trong nhóm lớp xuất hiện hình ảnh nhạy cảm được cho là của một bạn học. Có người bảo gửi tiếp đi. Bạn nên làm gì?', ['Lưu lại để xem sau', 'Chuyển tiếp cho bạn thân để hỏi ý kiến', 'Không lan truyền, báo cáo nội dung và tìm người có trách nhiệm hỗ trợ', 'Bình luận đùa vì có thể chỉ là ảnh giả'], 2,
            'Dù thật hay giả, việc lan truyền hình ảnh nhạy cảm đều có thể gây hại nghiêm trọng.'),
          q('Một tài khoản giống bạn của bạn nhắn tin mượn tiền. Cách nhắn hơi lạ nhưng ảnh đại diện đúng và tài khoản đúng tên. Bạn nên làm gì?', ['Chuyển tiền nếu số tiền nhỏ', 'Gọi xác minh qua số điện thoại cũ hoặc kênh khác đã biết', 'Hỏi số tài khoản rồi chuyển sau', 'Tin vì tài khoản đúng tên'], 1,
            'Tài khoản có thể bị chiếm quyền — cần xác minh qua kênh độc lập.'),
          q('Bạn thấy đoạn video gây phẫn nộ và dòng chữ "chia sẻ ngay trước khi bị xóa". Bạn nên làm gì?', ['Chia sẻ ngay để cảnh báo mọi người', 'Chờ kiểm chứng nguồn, thời gian, bối cảnh trước khi chia sẻ', 'Tải về và đăng lại ở nhiều nơi', 'Bình luận thật mạnh để tăng tương tác'], 1,
            'Cảm xúc mạnh là tín hiệu cần chậm lại — không phải lý do để chia sẻ ngay.'),
          q('Một công cụ online báo video "90% là deepfake". Bạn nên hiểu kết quả này thế nào?', ['Video chắc chắn là giả', 'Công cụ chỉ là một tín hiệu tham khảo, cần thêm kiểm chứng', 'Công cụ luôn chính xác hơn con người', 'Không cần xem nguồn nữa'], 1,
            'Công cụ phát hiện có thể sai, đặc biệt trong môi trường thực tế.'),
          q('Bạn nghi mình vừa bị lừa chuyển tiền qua cuộc gọi giả mạo. Việc nào nên làm sớm nhất?', ['Xóa hết tin nhắn vì xấu hổ', 'Im lặng để tránh bị người khác biết', 'Liên hệ ngân hàng, lưu bằng chứng và báo cáo', 'Đăng toàn bộ thông tin cá nhân của người nghi lừa đảo lên mạng'], 2,
            'Cần hành động nhanh, lưu bằng chứng và hạn chế gây thêm rủi ro.'),
          q('Bạn nghe bản ghi âm có giọng nói giống lãnh đạo nói một điều gây sốc. Bạn nên kết luận thế nào?', ['Giọng giống thì chắc là thật', 'Giọng nói có thể bị giả lập hoặc cắt ghép; cần kiểm chứng nguồn và bối cảnh', 'Nếu file âm thanh ngắn thì chắc thật', 'Nếu nghe trên điện thoại thì không thể giả'], 1,
            'Giọng nói ngày nay không còn là bằng chứng tuyệt đối.'),
        ]),
      },
    ],
    quiz: [
      q('Câu cần nhớ từ Module 0 là gì?', ['Khi nội dung khiến bạn sợ, giận, muốn hành động ngay — đó là lúc cần chậm lại', 'Hình ảnh và video luôn là bằng chứng đáng tin', 'Chỉ người nổi tiếng mới bị deepfake nhắm đến', 'Cần học lập trình mới hiểu được deepfake'], 0),
      q('Bước đầu tiên của quy trình Deepfense Check là gì?', ['Pause — Dừng lại trước khi phản ứng', 'Verify — Xác minh qua kênh độc lập', 'Observe — Quan sát dấu hiệu', 'Decide — Ra quyết định an toàn'], 0),
      q('Deepfake nguy hiểm nhất khi nào?', ['Khi chất lượng video 4K hoàn hảo', 'Khi xuất hiện đúng lúc ta đang lo, sợ, giận hoặc muốn giúp ai đó', 'Khi chỉ xuất hiện trên các nền tảng lớn', 'Khi được đăng bởi tài khoản chính thức'], 1),
    ],
  },
`;

const startMarker = '  // ── MODULE 0 ─────────────────────────────────────────────────';
const endMarker = '\n  // ── MODULE 1 ─────────────────────────────────────────────────';

const startIdx = src.indexOf(startMarker);
const endIdx = src.indexOf(endMarker);

if (startIdx === -1) { console.error('START marker not found'); process.exit(1); }
if (endIdx === -1) { console.error('END marker not found'); process.exit(1); }

const before = src.slice(0, startIdx);
const after = src.slice(endIdx);
src = before + MODULE0 + after;

fs.writeFileSync(file, src, 'utf8');
console.log('Done. Module 0 replaced successfully.');
console.log('File length:', src.length, 'chars');
