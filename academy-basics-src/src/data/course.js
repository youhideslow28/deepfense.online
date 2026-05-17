// ── HELPERS ────────────────────────────────────────────────────
export const lesson = (id, title, paragraphs, takeaways) => ({ id, title, paragraphs, takeaways });
export const q = (text, options, answer) => ({ text, options, answer });
export const checkpoint = (label, questions) => ({ label, questions });

// ── COURSE META ─────────────────────────────────────────────────
export const COURSE = {
  title: 'DEEPFENSE BASICS',
  subtitle: 'Nhận diện & phòng ngừa deepfake',
  totalModules: 10,
};

// ── MODULES ─────────────────────────────────────────────────────
export const MODULES = [
  // ── MODULE 0 ─────────────────────────────────────────────────
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

  // ── MODULE 1 ─────────────────────────────────────────────────
  {
    id: 1, part: 'foundation',
    title: 'Deepfake là gì?',
    duration: '80-90 phút', level: 'Foundation',
    scenario: 'Buổi sáng An đang ăn sáng và lướt điện thoại. Một video hiện lên: người nổi tiếng đang giới thiệu kênh đầu tư "lợi nhuận cao, rủi ro thấp". Gương mặt giống, giọng nói giống, khẩu hình có vẻ khớp, bên dưới nhiều bình luận ủng hộ. Nhưng An phân vân — người này thường không quảng cáo kiểu đó...',
    outcomes: [
      'Giải thích được deepfake bằng ngôn ngữ đơn giản.',
      'Phân biệt được deepfake với AI-generated media, edited media và repurposed media.',
      'Hiểu vì sao nội dung giả mạo ngày càng dễ tạo, dễ lan truyền và khó nhận ra.',
      'Biết rằng không phải nội dung nào "trông giả" cũng là deepfake, và không phải nội dung nào "trông thật" cũng đáng tin.',
      'Thực hành phân loại các tình huống nội dung số thường gặp.',
    ],
    sections: [
      {
        title: '1.0 Câu chuyện dẫn nhập: Video đầu tư của người nổi tiếng',
        lessons: [
          lesson('1.0.0', 'An và video đầu tư buổi sáng', [
            'Buổi sáng, An đang ăn sáng và lướt điện thoại. Một video hiện lên trên bảng tin. Trong video, một người nổi tiếng mà An biết đang nói: "Tôi đã dùng nền tảng này để tạo thêm thu nhập mỗi ngày. Chỉ cần bắt đầu với một số tiền nhỏ, bạn có thể nhận lợi nhuận ổn định. Cơ hội này không dành cho tất cả mọi người, nên hãy đăng ký ngay hôm nay."',
            'Video khá thuyết phục. Gương mặt giống. Giọng nói giống. Khẩu hình có vẻ khớp. Bên dưới có nhiều bình luận: "Em đã nhận tiền rồi, cảm ơn anh." / "Ban đầu em cũng nghi ngờ, nhưng thử xong thấy thật." / "Cơ hội tốt quá, may mà biết sớm."',
            'An hơi phân vân. Người nổi tiếng này thường không quảng cáo kiểu đó. Nhưng video thì nhìn rất thật.',
            'Nếu bạn là An, bạn có thể hỏi: Đây có phải video thật không? Có phải người nổi tiếng đó thực sự nói vậy không? Nếu video giả, nó là deepfake hay chỉ là cắt ghép? Nếu không biết chắc, mình nên làm gì? Để trả lời, cần bắt đầu từ câu hỏi cơ bản nhất.',
          ], [
            'Video trông thuyết phục chưa đủ để kết luận là thật.',
            'Câu hỏi đúng: người này có thật sự nói/làm vậy không? Và làm sao xác minh?',
          ]),
        ],
        checkpoint: null,
      },
      {
        title: '1.1 Deepfake và các họ hàng của nó',
        lessons: [
          lesson('1.1.0', 'Mục tiêu và tổng quan các khái niệm', [
            'Sau phần 1.1, bạn sẽ: hiểu khái niệm deepfake; biết các dạng nội dung giả mạo và gây hiểu nhầm phổ biến; dùng đúng một số thuật ngữ cơ bản; tránh nhầm lẫn giữa "AI tạo ra", "deepfake", "cắt ghép" và "đặt sai ngữ cảnh".',
            'Hệ sinh thái nội dung giả mạo gồm nhiều loại khác nhau — mỗi loại có đặc điểm, rủi ro và cách kiểm chứng riêng. Hiểu đúng tên gọi giúp bạn đặt câu hỏi đúng và chọn cách xử lý phù hợp.',
          ], [
            '4 mục tiêu phần 1.1: hiểu deepfake, biết các dạng nội dung giả mạo, dùng đúng thuật ngữ, tránh nhầm lẫn.',
            'Hiểu đúng tên → đặt câu hỏi đúng → xử lý phù hợp.',
          ]),
          lesson('1.1.1', 'Khái niệm 1: Deepfake là gì?', [
            'Deepfake là nội dung hình ảnh, video hoặc âm thanh được tạo ra hoặc chỉnh sửa bằng công nghệ số, thường có sử dụng AI, để khiến người xem tin rằng một người đã nói hoặc làm điều mà họ không thực sự nói hoặc làm.',
            'Nói đơn giản: Deepfake là khi công nghệ làm cho một người "xuất hiện", "nói" hoặc "hành động" theo cách có thể không hề xảy ra trong đời thật.',
            'Deepfake có thể là: video thay khuôn mặt người A vào cơ thể người B; đoạn âm thanh giả giọng người thân để yêu cầu chuyển tiền; video người nổi tiếng kêu gọi đầu tư dù họ chưa từng nói vậy; clip chỉnh khẩu hình để một chính trị gia/giáo viên có vẻ phát biểu điều gây sốc; hình ảnh nhạy cảm giả mạo nhằm bôi nhọ hoặc tống tiền.',
            'Deepfake không nhất thiết phải hoàn hảo mới nguy hiểm. Trong nhiều vụ lừa đảo, kẻ xấu không cần video hoàn hảo — chỉ cần đủ giống trong vài giây, kết hợp với sự khẩn cấp và tin tưởng, để nạn nhân hành động trước khi kịp suy nghĩ.',
            'Ví dụ: Bạn nhận tin nhắn thoại nghe giống mẹ bạn: "Con ơi, mẹ đang cần tiền gấp, chuyển vào số này giúp mẹ." Nếu bạn nghe vội, đang ở ngoài đường, lại thấy người gửi là tài khoản quen — bạn có thể bị cuốn vào cảm giác phải giúp ngay. Đó là lúc deepfake/deepvoice nguy hiểm: không chỉ đánh vào tai, mà còn đánh vào tình cảm và phản xạ.',
          ], [
            'Deepfake = nội dung khiến người xem tin một người đã nói/làm điều họ không làm.',
            'Không cần hoàn hảo mới nguy hiểm — chỉ cần đủ giống + áp lực cảm xúc.',
          ]),
          lesson('1.1.2', 'Khái niệm 2: Synthetic media là gì?', [
            'Synthetic media là nội dung được tạo ra hoàn toàn hoặc một phần bằng công nghệ số, đặc biệt là AI. Synthetic media có thể là: ảnh một người không có thật; giọng nói được AI tạo ra; nhạc, hình minh họa, video hoặc nhân vật ảo; cảnh quay được AI tạo từ câu lệnh văn bản.',
            'Synthetic media không phải lúc nào cũng xấu. Nó có thể được dùng trong giáo dục, phim ảnh, truyền thông sáng tạo, hỗ trợ người khuyết tật, dịch thuật giọng nói, tạo nhân vật mô phỏng trong đào tạo. Vấn đề bắt đầu khi nó được dùng để đánh lừa, mạo danh, bôi nhọ, lừa tiền hoặc thao túng nhận thức.',
            'Điểm cần nhớ: Tất cả deepfake đều có thể được xem là một dạng synthetic hoặc manipulated media, nhưng không phải mọi synthetic media đều là deepfake. Ví dụ: một bức tranh phong cảnh do AI tạo ra không phải deepfake. Nhưng một video giả mạo một người thật đang nói điều họ chưa từng nói thì có thể là deepfake.',
          ], [
            'Synthetic media = nội dung AI tạo ra — không phải lúc nào cũng xấu.',
            'Deepfake là tập con của synthetic media: có mạo danh người thật cụ thể.',
          ]),
          lesson('1.1.3', 'Khái niệm 3: Deepvoice là gì?', [
            'Deepvoice là dạng giả lập hoặc chỉnh sửa giọng nói bằng AI, khiến âm thanh nghe giống một người thật. Deepvoice có thể dùng để: đọc văn bản bằng giọng giống người cụ thể; tạo cuộc gọi giả; làm tin nhắn thoại giả; ghép giọng nói vào video.',
            'Deepvoice đặc biệt nguy hiểm trong các tình huống có áp lực thời gian: "Con đang bị tai nạn, chuyển tiền ngay." / "Anh là sếp đây, xử lý khoản này trước 3 giờ." / "Tôi là nhân viên ngân hàng, đọc mã xác thực để khóa giao dịch lạ."',
            'Một đoạn giọng nói ngắn không còn đủ để xác minh danh tính. Nếu yêu cầu liên quan đến tiền, mật khẩu, OTP, tài khoản hoặc thông tin nhạy cảm — cần xác minh bằng kênh khác.',
            'Câu cần nhớ: Nghe giống không có nghĩa là đúng người.',
          ], [
            'Deepvoice giả lập giọng nói bằng AI — nguy hiểm nhất trong tình huống áp lực thời gian.',
            'Nghe giống không có nghĩa là đúng người — cần xác minh qua kênh độc lập.',
          ]),
          lesson('1.1.4', 'Khái niệm 4: Face swap là gì?', [
            'Face swap là kỹ thuật thay khuôn mặt của một người vào hình ảnh hoặc video của người khác. Có thể dùng để: thay mặt người nổi tiếng vào video quảng cáo; thay mặt học sinh vào ảnh nhạy cảm; thay mặt người quen vào cảnh quay gây xúc phạm.',
            'Face swap có thể được dùng để giải trí nếu có sự đồng ý và bối cảnh rõ ràng. Nhưng cũng có thể trở thành hành vi gây hại để bôi nhọ danh dự, bắt nạt, quấy rối, tống tiền, lừa đảo hoặc gây hiểu nhầm.',
            'Điểm cần nhớ: Không nên đánh giá mức độ nghiêm trọng chỉ dựa vào câu "đó chỉ là ảnh giả". Một hình ảnh giả vẫn có thể gây tổn thương thật — ảnh hưởng danh dự, tâm lý, học tập, công việc và các mối quan hệ.',
          ], [
            'Face swap = thay khuôn mặt vào video/ảnh của người khác.',
            'Hình ảnh giả vẫn có thể gây tổn thương thật — đừng xem nhẹ vì "chỉ là ảnh giả".',
          ]),
          lesson('1.1.5', 'Khái niệm 5: Lip sync là gì?', [
            'Lip sync là kỹ thuật làm cho chuyển động môi trong video khớp với một đoạn âm thanh khác. Ví dụ: lấy video thật của một người đang nói, sau đó chỉnh khẩu hình để trông như đang nói câu khác; tạo video một nhân vật đọc thông điệp do người khác viết.',
            'Lip sync có thể khiến người xem nghĩ "Tôi thấy họ nói câu đó mà." Nhưng điều bạn thấy có thể là kết quả của chỉnh sửa.',
            'Dấu hiệu có thể nghi ngờ: khẩu hình không khớp hoàn toàn với âm thanh; cử động môi hơi cứng hoặc trễ; biểu cảm khuôn mặt không phù hợp với nội dung; âm thanh quá sạch hoặc quá đều so với môi trường.',
            'Lưu ý: không nên chỉ dựa vào các dấu hiệu này. Video bị nén, mạng yếu hoặc ánh sáng kém cũng có thể tạo cảm giác lạ. Cần kết hợp quan sát với kiểm chứng nguồn.',
          ], [
            'Lip sync = chỉ thay chuyển động miệng để người thật "nói" điều giả.',
            'Các dấu hiệu kỹ thuật hữu ích nhưng không đủ — cần kết hợp kiểm chứng nguồn.',
          ]),
          lesson('1.1.6', 'Khái niệm 6: Edited media là gì?', [
            'Edited media là nội dung đã bị chỉnh sửa bằng các công cụ truyền thống hoặc AI. Không phải edited media nào cũng xấu — hầu hết ảnh và video đã được chỉnh màu, cắt ngắn, thêm chữ, thêm nhạc để dễ xem hơn.',
            'Vấn đề nằm ở mục đích và mức độ gây hiểu nhầm. Ví dụ: cắt một câu nói ra khỏi phần giải thích phía sau; ghép hai đoạn video từ hai thời điểm khác nhau; thêm phụ đề sai; chỉnh ảnh để thêm người, xóa người hoặc thay bối cảnh.',
            'Ví dụ: Một video dài 20 phút có đoạn: "Nếu chỉ nhìn một phía, chúng ta có thể nghĩ rằng người đó sai. Nhưng khi xem đầy đủ, câu chuyện phức tạp hơn." Nếu ai đó chỉ cắt phần "Người đó sai." rồi đăng lên mạng — người xem có thể hiểu hoàn toàn khác. Đây có thể không phải deepfake, nhưng vẫn là nội dung gây hiểu nhầm.',
          ], [
            'Edited media = nội dung thật bị cắt/ghép/chỉnh sửa để thay đổi nghĩa.',
            'Không cần AI vẫn có thể gây hại lớn — phổ biến hơn deepfake trong thực tế.',
          ]),
          lesson('1.1.7', 'Khái niệm 7: Repurposed media là gì?', [
            'Repurposed media là nội dung thật nhưng bị đặt sai bối cảnh. Đây là dạng gây hiểu nhầm rất phổ biến. Ví dụ: video lũ lụt ở nước khác từ nhiều năm trước được đăng lại như vừa xảy ra tại Việt Nam; ảnh tai nạn cũ gán vào sự kiện mới; clip hậu trường phim chia sẻ như "bằng chứng" của vụ việc thật; video biểu tình quốc gia khác bị chú thích sai địa điểm.',
            'Repurposed media nguy hiểm vì nó dùng "chất liệu thật" để tạo kết luận sai. Người xem có thể nghĩ "Video này là thật, vậy thông tin đi kèm chắc cũng thật." Nhưng một video thật không đảm bảo chú thích của nó là thật.',
            'Câu cần nhớ: Nội dung thật đặt sai bối cảnh vẫn có thể dẫn đến niềm tin sai.',
          ], [
            'Repurposed media = nội dung thật + bối cảnh sai — nguy hiểm vì không có lỗi kỹ thuật.',
            'Cần kiểm tra thời gian, địa điểm, nguồn gốc — không chỉ kiểm tra kỹ thuật.',
          ]),
          lesson('1.1.8', 'Khái niệm 8: AI-generated image và bảng phân biệt', [
            'AI-generated image là hình ảnh do AI tạo ra từ mô tả hoặc dữ liệu mẫu. Ví dụ: ảnh chân dung người không tồn tại; cảnh đường phố chưa từng được chụp; hình minh họa cho bài viết; ảnh sản phẩm giả.',
            'Rủi ro: tạo hồ sơ giả; giả ảnh hiện trường; minh họa sai cho tin tức; tạo bằng chứng giả; dàn dựng hình ảnh nhạy cảm. Câu hỏi quan trọng: không chỉ hỏi "Ảnh này có bị AI tạo không?" mà hỏi thêm "Ảnh này đang được dùng để khiến mình tin điều gì?"',
            'Bảng phân biệt nhanh: Deepfake = làm người thật có vẻ nói/làm điều họ không làm | Deepvoice = giả giọng nói người thật | Synthetic media = nội dung tạo bằng AI, không nhất thiết mạo danh | Edited media = nội dung bị cắt ghép/chỉnh sửa | Repurposed media = nội dung thật + bối cảnh sai | AI-generated image = ảnh AI tạo hoàn toàn.',
            'Mini Check — Gọi đúng tên: (A) Video ca sĩ nổi tiếng nói mở lớp đầu tư, ca sĩ phủ nhận → Deepfake. (B) Ảnh lũ lụt chia sẻ với chú thích "vừa xảy ra hôm nay" nhưng ảnh 5 năm trước → Repurposed media. (C) Âm thanh giống giám đốc yêu cầu chuyển tiền trong 10 phút → Deepvoice. (D) Bài đăng dùng ảnh AI của chuyên gia không có thật để quảng cáo khóa đầu tư → AI-generated image. (E) Video bài phát biểu bị cắt còn 8 giây, làm người nói có vẻ ủng hộ điều họ thực ra đang phản đối → Edited media.',
          ], [
            'AI-generated image: hỏi "Ảnh đang được dùng để khiến mình tin điều gì?" — không chỉ "có phải AI không?"',
            'Bảng 6 loại: Deepfake / Deepvoice / Synthetic / Edited / Repurposed / AI-generated.',
          ]),
        ],
        checkpoint: checkpoint('1.1', [
          q('Deepfake là gì?', ['Mọi nội dung sai trên Internet', 'Nội dung hình ảnh, video hoặc âm thanh được tạo/chỉnh sửa để khiến người xem tin một người đã nói hoặc làm điều họ không thực sự nói/làm', 'Chỉ là ảnh chỉnh màu', 'Chỉ là tin nhắn lừa đảo không có hình ảnh'], 1,
            'Deepfake thường liên quan đến việc mạo danh hoặc làm sai lệch hành động/lời nói của một người.'),
          q('Điều nào sau đây là ví dụ về deepvoice?', ['Một ảnh phong cảnh do AI tạo', 'Một đoạn giọng nói giả giống người thân yêu cầu chuyển tiền', 'Một bài viết sai chính tả', 'Một video thật được đăng lại từ năm trước'], 1,
            'Deepvoice liên quan đến giả lập hoặc chỉnh sửa giọng nói.'),
          q('Repurposed media là gì?', ['Nội dung thật nhưng bị đặt sai bối cảnh', 'Nội dung luôn do AI tạo ra', 'Nội dung không có âm thanh', 'Nội dung được đăng bởi tài khoản chính thức'], 0,
            'Nội dung có thể thật, nhưng chú thích, thời gian, địa điểm hoặc ý nghĩa đi kèm có thể sai.'),
          q('Tất cả synthetic media đều là deepfake — đúng hay sai?', ['Đúng', 'Sai'], 1,
            'Synthetic media có thể dùng cho mục đích sáng tạo, giáo dục hoặc minh họa. Nó trở thành vấn đề khi bị dùng để mạo danh, đánh lừa hoặc gây hại.'),
          q('Một video bị cắt ngắn làm thay đổi ý nghĩa câu nói ban đầu. Đây phù hợp nhất là:', ['Edited media', 'Deepvoice', 'Mã độc', 'Mật khẩu yếu'], 0,
            'Cắt ghép hoặc biên tập gây hiểu nhầm là một dạng edited media.'),
          q('Một hình ảnh người không tồn tại do AI tạo ra được dùng làm ảnh đại diện cho tài khoản lừa đảo. Rủi ro chính là gì?', ['Ảnh quá đẹp', 'Người xem có thể tin vào một danh tính giả', 'Ảnh không có âm thanh', 'Ảnh tải chậm'], 1,
            'Hình ảnh AI có thể được dùng để dựng hồ sơ hoặc danh tính giả.'),
          q('Vì sao không nên kết luận "video thật" chỉ vì gương mặt và giọng nói giống?', ['Vì gương mặt và giọng nói có thể bị tạo hoặc chỉnh sửa bằng AI', 'Vì video nào trên mạng cũng giả', 'Vì chỉ ảnh mới có thể bị giả', 'Vì âm thanh luôn đáng tin hơn hình ảnh'], 0,
            'Deepfake và deepvoice có thể mạo phỏng cả khuôn mặt lẫn giọng nói.'),
          q('Một video thật từ quốc gia khác được đăng với chú thích "đang xảy ra tại thành phố của bạn". Bạn nên nghi ngờ điều gì?', ['Sai bối cảnh — repurposed media', 'Máy tính bị virus', 'Mật khẩu bị lộ', 'Điện thoại bị hỏng'], 0,
            'Đây là dấu hiệu của repurposed media — nội dung thật, bối cảnh sai.'),
          q('Điều nào đúng nhất về deepfake và mức độ nguy hiểm?', ['Deepfake chỉ nguy hiểm nếu hoàn hảo 100%', 'Deepfake có thể nguy hiểm ngay cả khi chỉ đủ giống trong vài giây và đi kèm áp lực khẩn cấp', 'Deepfake chỉ xuất hiện trong phim', 'Người bình thường không bao giờ là mục tiêu của deepfake'], 1,
            'Trong lừa đảo, kẻ xấu thường kết hợp mạo danh với cảm xúc và thời gian gấp.'),
          q('Câu hỏi nào hữu ích nhất khi xem một hình ảnh nghi do AI tạo?', ['Ảnh này có nhiều màu không?', 'Ảnh này đang được dùng để khiến mình tin điều gì?', 'Ảnh này có kích thước bao nhiêu?', 'Ảnh này có được đăng buổi sáng không?'], 1,
            'Mục đích sử dụng và ngữ cảnh quyết định mức độ rủi ro của nội dung.'),
        ]),
      },
      {
        title: '1.1.1 Vì sao deepfake ngày càng khó nhận ra?',
        lessons: [
          lesson('1.1.1.1', 'Công nghệ tốt hơn, chi phí thấp hơn', [
            'Trước đây, để tạo một video giả thuyết phục, người ta cần nhiều kỹ năng, thiết bị và thời gian. Bây giờ, nhiều công cụ AI đã làm cho việc tạo ảnh, giọng nói và video trở nên dễ tiếp cận hơn.',
            'Mặt tích cực: người sáng tạo có thêm công cụ làm phim và giáo dục; người khuyết tật có thể dùng công nghệ giọng nói để giao tiếp tốt hơn; việc dịch, lồng tiếng và mô phỏng trở nên dễ hơn.',
            'Mặt rủi ro: kẻ xấu có thể mạo danh người khác nhanh hơn; nội dung lừa đảo có thể được tạo hàng loạt; giọng nói, khuôn mặt và phong cách cá nhân có thể bị lợi dụng; người xem khó phân biệt thật giả.',
            'Khi công cụ mạnh hơn và rẻ hơn, kỹ năng phòng vệ của người dùng cũng cần tốt hơn.',
          ], [
            'Công nghệ tạo deepfake ngày càng dễ tiếp cận — rào cản kỹ thuật gần như biến mất.',
            'Hai mặt của coin: sáng tạo vs. lừa đảo hàng loạt.',
          ]),
          lesson('1.1.1.2', 'Dữ liệu cá nhân của chúng ta quá dễ tìm', [
            'AI cần dữ liệu để mô phỏng. Trong đời sống số, nhiều người vô tình để lại rất nhiều dữ liệu: ảnh chân dung, video nói chuyện, livestream, story hằng ngày, giọng nói trong clip, thông tin gia đình, sinh nhật, địa điểm, lịch trình và thói quen.',
            'Không phải cứ đăng ảnh hay video là nguy hiểm. Mạng xã hội là nơi con người kết nối. Nhưng khi dữ liệu cá nhân quá công khai, kẻ xấu có nhiều nguyên liệu hơn để tạo tài khoản giả, giả giọng nói, dựng kịch bản lừa đảo có vẻ rất riêng tư, đoán câu trả lời bảo mật.',
            'Ví dụ, nếu một người thường xuyên đăng tên trường, tên lớp, tên người thân, lịch đi du lịch, video nói chuyện dài, số điện thoại công khai — một kẻ lừa đảo có thể dùng các mảnh thông tin đó để tạo câu chuyện có vẻ đáng tin.',
            'Takeaway: Deepfake không chỉ dùng hình ảnh của bạn. Nó có thể dùng cả thói quen, quan hệ và thông tin bạn để lộ.',
          ], [
            'Dữ liệu cá nhân công khai là nguyên liệu cho deepfake — không chỉ hình ảnh mà cả thói quen và quan hệ.',
            'Hạn chế thông tin nhạy cảm công khai = giảm nguyên liệu cho kẻ xấu.',
          ]),
          lesson('1.1.1.3', 'Nội dung lan nhanh hơn khả năng kiểm chứng', [
            'Một nội dung gây sốc có thể lan đi rất nhanh — chỉ trong vài phút có thể xuất hiện trong nhóm gia đình, nhóm lớp, nhóm công việc, trang cá nhân, nền tảng video ngắn và tin nhắn riêng.',
            'Trong khi đó, kiểm chứng cần thời gian: tìm nguồn đầu tiên, xem bối cảnh, so sánh nguồn khác, kiểm tra tài khoản đăng, hỏi người liên quan, xem thông tin chính thức.',
            'Đây là khoảng cách nguy hiểm: nội dung giả hoặc sai bối cảnh thường chạy nhanh hơn sự thật. Kẻ xấu hiểu điều đó — thường thêm vào câu "Chia sẻ ngay trước khi bị xóa", "Đừng nói với ai", "Nếu không làm ngay sẽ mất tiền". Những câu này không chỉ truyền thông tin — chúng tạo áp lực. Khi thấy áp lực phải hành động ngay, hãy xem đó là dấu hiệu cảnh báo.',
          ], [
            'Nội dung lan nhanh hơn khả năng kiểm chứng — đây là lợi thế của kẻ lừa đảo.',
            'Áp lực "làm ngay" = dấu hiệu cảnh báo, không phải lý do để hành động.',
          ]),
          lesson('1.1.1.4', 'Mắt thường có giới hạn', [
            'Nhiều hướng dẫn nói deepfake có thể bị nhận ra qua: mắt chớp kỳ lạ, răng bị méo, tóc không tự nhiên, bóng đổ sai, tay bị lỗi, khẩu hình lệch, giọng nói đều đều. Những dấu hiệu này có thể hữu ích — chúng ta sẽ học kỹ hơn ở Module 3.',
            'Nhưng có một vấn đề: công nghệ ngày càng tốt hơn, môi trường xem nội dung ngày càng phức tạp hơn. Một video thật cũng có thể trông lạ vì mạng yếu, camera kém, ánh sáng xấu, video bị nén, người nói mệt, ứng dụng gọi video bị trễ. Ngược lại, một video giả có thể trông rất mượt.',
            'Nếu chỉ dựa vào cảm giác "trông thật" hay "trông giả", bạn có thể bị sai theo cả hai hướng: tin nhầm nội dung giả hoặc phủ nhận nhầm nội dung thật.',
            'DEEPFENSE BASIC không dạy bạn trở thành "máy dò deepfake bằng mắt". Khóa học dạy bạn trở thành người ra quyết định tốt hơn.',
          ], [
            'Mắt thường có giới hạn — video thật có thể trông lạ, video giả có thể trông mượt.',
            'Mục tiêu: ra quyết định tốt hơn, không phải đoán deepfake bằng mắt trong 3 giây.',
          ]),
          lesson('1.1.1.5', 'Công cụ phát hiện cũng có giới hạn', [
            'Các công cụ phát hiện deepfake có thể hữu ích, nhưng không nên được xem là phán quyết cuối cùng. Một công cụ có thể báo "Có khả năng là AI", "Có dấu hiệu chỉnh sửa", "Tỷ lệ nghi ngờ cao" hoặc "Không phát hiện dấu hiệu bất thường". Nhưng những kết quả này không đồng nghĩa với chắc chắn giả, chắc chắn thật hay chắc chắn vô hại.',
            'Vì sao? Công cụ phát hiện phụ thuộc vào dữ liệu đã được huấn luyện, loại deepfake từng thấy, chất lượng file đầu vào, việc video đã bị nén/cắt/quay lại màn hình chưa, và kỹ thuật tạo giả mới chưa cập nhật.',
            'Cách dùng công cụ hợp lý: quan sát nội dung → kiểm tra nguồn → xác minh qua kênh độc lập → dùng công cụ nếu phù hợp → tổng hợp nhiều tín hiệu trước khi quyết định. Kết quả từ detector nên được xem là một tín hiệu, không phải kết luận cuối cùng.',
          ], [
            'Công cụ phát hiện deepfake hữu ích nhưng không hoàn hảo — chỉ là một tín hiệu.',
            '5 bước dùng công cụ hợp lý: quan sát → kiểm tra nguồn → xác minh độc lập → dùng công cụ → tổng hợp.',
          ]),
          lesson('1.1.1.6', 'Vấn đề không chỉ là thật hay giả', [
            'Khi gặp nội dung nghi vấn, nhiều người muốn có câu trả lời ngay: "Thật hay giả?" Nhưng trong thực tế có nhiều trạng thái hơn: (1) Có bằng chứng tốt nội dung là thật. (2) Có bằng chứng tốt nội dung là giả. (3) Nội dung thật nhưng bị đặt sai bối cảnh. (4) Nội dung bị cắt ghép làm đổi nghĩa. (5) Nội dung có một phần thật, một phần chưa rõ. (6) Chưa đủ dữ liệu để kết luận.',
            'Trạng thái số 6 rất quan trọng. Nhiều khi câu trả lời an toàn nhất không phải là "Tôi biết chắc đây là giả." mà là "Tôi chưa đủ bằng chứng để tin, chia sẻ hoặc hành động." Trong thế giới số, biết nói "chưa đủ dữ liệu" là một kỹ năng mạnh.',
          ], [
            '6 trạng thái nội dung: thật / giả / thật sai bối cảnh / cắt ghép / một phần / chưa đủ dữ liệu.',
            '"Chưa đủ dữ liệu" là câu trả lời an toàn và trưởng thành nhất.',
          ]),
          lesson('1.1.1.7', 'Một rủi ro ngược: Khi sự thật bị gọi là deepfake', [
            'Deepfake không chỉ làm người ta tin vào điều giả — nó còn có thể làm người ta nghi ngờ điều thật. Khi công chúng biết rằng video và âm thanh có thể bị giả, một người có thể phủ nhận nội dung thật bằng cách nói "Đó là deepfake."',
            'Hiện tượng này đôi khi được gọi là "liar\'s dividend": kẻ nói dối có thêm lợi thế vì mọi người biết nội dung số có thể bị làm giả.',
            'Vì vậy, mục tiêu của chúng ta không phải là nghi ngờ tất cả. Mục tiêu là kiểm chứng tốt hơn. Một xã hội khỏe mạnh là nơi con người biết hỏi: Bằng chứng đến từ đâu? Có nguồn độc lập không? Có ai có động cơ làm sai lệch không? Có đủ cơ sở để kết luận chưa?',
          ], [
            'Liar\'s dividend: deepfake cũng có thể được dùng để phủ nhận nội dung thật.',
            'Mục tiêu: kiểm chứng tốt hơn — không phải tin hết, cũng không phải nghi ngờ hết.',
          ]),
          lesson('1.1.1.8', 'Bài học lớn của phần 1.1.1', [
            'Deepfake ngày càng khó nhận ra vì 4 lý do chính: (1) Công nghệ tạo giả tốt hơn và dễ tiếp cận hơn. (2) Dữ liệu cá nhân của chúng ta quá sẵn trên mạng. (3) Nội dung lan nhanh hơn khả năng kiểm chứng. (4) Cả mắt thường lẫn công cụ phát hiện đều có giới hạn.',
            'Vì vậy, kỹ năng quan trọng nhất không phải là nhìn một video rồi đoán thật giả trong 3 giây. Kỹ năng quan trọng nhất là biết dừng lại, đặt câu hỏi đúng và kiểm chứng qua nhiều tín hiệu.',
            'Takeaway: Trong thời đại deepfake, người an toàn không phải người đoán nhanh nhất. Người an toàn là người biết kiểm chứng trước khi hành động.',
          ], [
            '4 lý do deepfake khó nhận ra: công nghệ tiến bộ, dữ liệu sẵn, lan nhanh hơn kiểm chứng, mắt thường có giới hạn.',
            'Người an toàn không phải người đoán nhanh — mà là người biết kiểm chứng trước khi hành động.',
          ]),
        ],
        checkpoint: null,
      },
      {
        title: '1.2 Thực hành: Phân loại nội dung số',
        lessons: [
          lesson('1.2.0', 'Hướng dẫn và cách tiếp cận', [
            'Bạn sẽ thấy 12 thẻ tình huống. Hãy phân loại mỗi nội dung vào nhóm phù hợp nhất: (1) Deepfake. (2) Deepvoice. (3) Synthetic media/AI-generated. (4) Edited media. (5) Repurposed media. (6) Chưa đủ dữ liệu để kết luận.',
            'Một số tình huống có thể thuộc nhiều nhóm — trong trường hợp đó, chọn nhóm phù hợp nhất với rủi ro chính.',
            'Điều quan trọng không phải là phân loại chính xác ngay từ đầu. Điều quan trọng là bắt đầu biết hỏi: Nội dung này đang khiến mình tin điều gì? Có ai đang bị mạo danh không? Có ai có thể bị hại không? Mình có đủ bằng chứng để tin hoặc chia sẻ chưa? Hành động an toàn nhất bây giờ là gì?',
          ], [
            '6 nhóm phân loại: Deepfake / Deepvoice / Synthetic AI / Edited / Repurposed / Chưa đủ dữ liệu.',
            'Mục tiêu: biết đặt câu hỏi đúng — không phải phân loại hoàn hảo.',
          ]),
          lesson('1.2.1', 'Thẻ tình huống 1–6', [
            'Thẻ 1: Video người nổi tiếng mời đầu tư vào ứng dụng lạ — người này chưa từng đăng thông tin đó trên kênh chính thức. → Khuyến nghị: Deepfake hoặc Chưa đủ dữ liệu. Cần kiểm tra kênh chính thức và nguồn video đầu tiên.',
            'Thẻ 2: Ảnh chân dung chuyên gia tài chính trông rất thật, nhưng tìm kiếm không thấy người này tồn tại ngoài website quảng cáo. → Khuyến nghị: AI-generated image — có thể là danh tính giả.',
            'Thẻ 3: Ghi âm giống giọng người thân yêu cầu chuyển tiền ngay, nhưng người đó không nhắn qua kênh thường dùng. → Khuyến nghị: Deepvoice. Xác minh bằng số đã lưu.',
            'Thẻ 4: Clip 7 giây cắt từ bài phát biểu dài, làm người nói có vẻ nói ngược ý ban đầu. → Khuyến nghị: Edited media. Cần xem bản đầy đủ và bối cảnh.',
            'Thẻ 5: Video tai nạn từ năm trước được đăng lại như vừa xảy ra hôm nay. → Khuyến nghị: Repurposed media. Nội dung thật, bối cảnh sai.',
            'Thẻ 6: Ảnh sản phẩm do AI tạo được ghi rõ là "ảnh minh họa". → Khuyến nghị: AI-generated, rủi ro thấp nếu minh bạch. Không phải mọi nội dung AI đều xấu — vấn đề là minh bạch.',
          ], [
            'Thẻ 1-6: Deepfake / AI-generated / Deepvoice / Edited / Repurposed / AI minh bạch.',
            'Phân loại giúp bạn chọn đúng cách kiểm chứng tiếp theo.',
          ]),
          lesson('1.2.2', 'Thẻ tình huống 7–12 và phản hồi tổng kết', [
            'Thẻ 7: Cuộc gọi video bị giật, hình hơi mờ, người gọi yêu cầu đọc OTP. → Khuyến nghị: Chưa đủ dữ liệu để kết luận deepfake, nhưng rủi ro cao. Dù có phải deepfake hay không, yêu cầu OTP là dấu hiệu nguy hiểm.',
            'Thẻ 8: Ảnh học sinh bị ghép vào nội dung nhạy cảm và lan truyền trong nhóm chat. → Khuyến nghị: Face swap/deepfake image. Không lan truyền, báo cáo và hỗ trợ người bị hại.',
            'Thẻ 9: Video thật của một người đang cười được ghép phụ đề sai để tạo cảm giác họ chế giễu nạn nhân. → Khuyến nghị: Edited media. Phụ đề cũng có thể làm sai lệch ý nghĩa.',
            'Thẻ 10: Tài khoản mới, ảnh đại diện đẹp, ít bạn bè, nhắn tin rủ đầu tư và gửi video "bằng chứng lợi nhuận". → Khuyến nghị: Chưa đủ dữ liệu, nhưng có dấu hiệu lừa đảo. Không phải tình huống nào cũng cần gọi tên đúng công nghệ — quan trọng là nhận diện rủi ro.',
            'Thẻ 11: Đoạn video nhân vật ảo dạy tiếng Anh được ghi rõ là nhân vật AI. → Khuyến nghị: Synthetic media, rủi ro thấp nếu minh bạch.',
            'Thẻ 12: Video chính trị gây sốc chia sẻ từ tài khoản không rõ nguồn, không có bản gốc, không có nguồn độc lập xác nhận. → Khuyến nghị: Chưa đủ dữ liệu. Không chia sẻ khi chưa đủ bằng chứng.',
            'Phản hồi tổng kết: Nếu bạn phân loại chưa đúng hết, điều đó bình thường. Trong đời thật, ranh giới giữa các loại nội dung có thể không rõ ràng. Mục tiêu là biết bắt đầu hỏi: Nội dung này đang khiến mình tin điều gì? Có ai đang bị mạo danh không? Mình có đủ bằng chứng để tin hoặc chia sẻ chưa?',
          ], [
            'Thẻ 7-12: Rủi ro cao dù không rõ loại / Face swap / Edited / Lừa đảo không cần gọi tên công nghệ / Synthetic minh bạch / Chưa đủ dữ liệu.',
            'Phân loại chưa hoàn hảo là bình thường — điều quan trọng là đặt câu hỏi đúng.',
          ]),
        ],
        checkpoint: null,
      },
    ],
    quiz: [
      q('Deepfake khác gì với photoshop hoặc chỉnh sửa thủ công?', ['Deepfake dùng AI tự động để mạo danh người thật — không phải chỉnh sửa tay', 'Deepfake chỉ dùng cho video, photoshop chỉ dùng cho ảnh', 'Photoshop mới hơn deepfake', 'Không có sự khác biệt'], 0),
      q('Điều nào đúng nhất về mức độ nguy hiểm của deepfake?', ['Chỉ nguy hiểm nếu chất lượng video hoàn hảo', 'Có thể nguy hiểm ngay cả khi chỉ đủ giống trong vài giây và đi kèm áp lực cảm xúc', 'Chỉ người nổi tiếng mới là mục tiêu', 'Chỉ nguy hiểm trong phim ảnh'], 1),
      q('Repurposed media là gì?', ['Nội dung thật nhưng bị đặt sai bối cảnh', 'Video AI tạo hoàn toàn', 'Ảnh photoshop', 'Giọng nói nhân bản'], 0),
      q('Vì sao mắt thường khó phát hiện deepfake?', ['Não người không tiến hóa để phát hiện nội dung AI — đây là giới hạn sinh học', 'Deepfake luôn có chất lượng 8K', 'Mắt người quá tốt', 'Deepfake phát sáng'], 0),
      q('Kết quả từ công cụ phát hiện deepfake nên được hiểu như thế nào?', ['Là một tín hiệu tham khảo, không phải kết luận cuối cùng', 'Là phán quyết tuyệt đối', 'Chỉ dùng được bởi chuyên gia', 'Không có giá trị'], 0),
      q('Deepvoice nguy hiểm nhất ở điểm nào?', ['Có thể dùng trong cuộc gọi điện thoại thời gian thực, không cần hình ảnh', 'Cần hàng nghìn giờ dữ liệu', 'Chỉ hoạt động với video', 'Dễ phát hiện bằng tai thường'], 0),
      q('Câu hỏi hữu ích nhất khi xem hình ảnh nghi do AI tạo là gì?', ['Ảnh này đang được dùng để khiến mình tin điều gì?', 'Ảnh có nhiều màu không?', 'File nặng bao nhiêu?', 'Ảnh được đăng lúc mấy giờ?'], 0),
      q('Liar\'s dividend trong bối cảnh deepfake là gì?', ['Người ta có thể dùng cáo buộc "deepfake" để phủ nhận bằng chứng thật', 'Lợi nhuận từ việc tạo deepfake', 'Tiền thưởng phát hiện deepfake', 'Thuật ngữ marketing'], 0),
      q('Câu trả lời an toàn nhất khi chưa đủ dữ liệu về nội dung nghi vấn là gì?', ['Tôi chưa đủ bằng chứng để tin, chia sẻ hoặc hành động', 'Chia sẻ ngay để người khác giúp đánh giá', 'Kết luận dựa trên cảm giác', 'Im lặng không làm gì'], 0),
      q('Trong thời đại deepfake, người an toàn nhất là người như thế nào?', ['Người biết kiểm chứng trước khi hành động, không phải người đoán nhanh nhất', 'Người có thiết bị công nghệ cao nhất', 'Người không dùng mạng xã hội', 'Người luôn nghi ngờ mọi thứ'], 0),
    ],
  },

  // ── MODULE 2 ─────────────────────────────────────────────────
  {
    id: 2, part: 'foundation',
    title: 'Vì sao con người dễ bị lừa?',
    duration: '85-95 phút', level: 'Foundation',
    scenario: 'An đã biết deepfake là gì. Nhưng tối đó điện thoại reo — giọng người thân, hơi run, yêu cầu chuyển tiền gấp. Trong vài giây đầu An không nghĩ đến deepfake nữa. Tại sao?',
    outcomes: [
      'Hiểu vì sao con người có thể bị lừa ngay cả khi đã biết deepfake tồn tại.',
      'Nhận diện 4 nút bấm cảm xúc thường bị lợi dụng: khẩn cấp, thân quen, quyền lực, lợi ích.',
      'Biết vì sao hình ảnh, video và giọng nói tạo cảm giác rất thuyết phục.',
      'Hiểu rằng phản ứng vội vàng thường nguy hiểm hơn việc không biết công nghệ.',
      'Thực hành xử lý một cuộc gọi khẩn cấp nghi giả mạo.',
    ],
    sections: [
      {
        title: '2.0 Câu chuyện dẫn nhập',
        lessons: [
          lesson('2.0.0', 'An nghĩ mình đủ tỉnh táo', [
            'Sau Module 1, An đã biết deepfake là gì. An biết rằng video có thể bị giả, giọng nói có thể bị mô phỏng, ảnh thật vẫn có thể bị đặt sai bối cảnh. An cũng biết rằng không nên tin mọi thứ chỉ vì nó trông thuyết phục.',
            'Nhưng biết một điều và làm đúng trong lúc căng thẳng là hai chuyện khác nhau.',
            'Buổi tối chuẩn bị đi ngủ, điện thoại An reo. Màn hình hiện tên một người thân. An bắt máy. Ở đầu dây: giọng quen, hơi run — "An ơi, giúp với. Đừng hỏi nhiều. Chuyển giúp một khoản ngay bây giờ. Gấp lắm." Rồi: "Máy sắp hết pin. Không gọi ai khác được. Chuyển nhanh giúp nhé."',
            'Trong vài giây đầu tiên, An không nghĩ đến deepfake. An nghĩ đến người thân. Đó là điều rất con người.',
            'Kẻ xấu không cần bạn ngu ngốc. Chúng chỉ cần bạn đang lo, đang vội, đang tin, đang sợ hoặc đang muốn giúp. Module 2 sẽ giúp bạn hiểu các cơ chế đó.',
          ], [
            'Biết về deepfake chưa đủ — cần hiểu cơ chế tâm lý để xây phản xạ an toàn.',
            'Kẻ xấu không cần bạn ngu ngốc, chỉ cần bạn đang lo, sợ hoặc muốn giúp.',
          ]),
        ],
        checkpoint: null,
      },
      {
        title: '2.1 Bốn nút bấm cảm xúc',
        lessons: [
          lesson('2.1.0', 'Mục tiêu và tổng quan', [
            'Sau phần 2.1, bạn sẽ: nhận diện được 4 nhóm cảm xúc thường bị lợi dụng (khẩn cấp, thân quen, quyền lực, lợi ích); hiểu cách deepfake và deepvoice được kết hợp với social engineering; biết các câu nói và tình huống thường xuất hiện trong lừa đảo; tập phản xạ đặt câu hỏi trước khi hành động.',
            'Deepfake hiếm khi là toàn bộ cuộc tấn công — nó thường chỉ là một mảnh trong kịch bản lớn hơn, kết hợp với các đòn tâm lý. Trong đời thật, mục tiêu không phải gọi tên công nghệ trong 10 giây mà là phát hiện rủi ro đủ sớm để không làm điều nguy hiểm.',
          ], [
            '4 nút bấm cảm xúc: khẩn cấp, thân quen, quyền lực, lợi ích.',
            'Deepfake thường kết hợp với đòn tâm lý — nhận diện toàn kịch bản, không chỉ công nghệ.',
          ]),
          lesson('2.1.1', 'Nút bấm 1: Khẩn cấp', [
            'Khẩn cấp là một trong những công cụ mạnh nhất của lừa đảo. Khi cảm thấy thời gian sắp hết, não chuyển sang chế độ phản ứng nhanh — muốn xử lý ngay để giảm căng thẳng.',
            'Kẻ xấu thường nói: "Chỉ còn 5 phút." / "Nếu không làm ngay sẽ mất tiền." / "Tài khoản của bạn sắp bị khóa." / "Người thân của bạn đang gặp nguy hiểm." / "Đừng tắt máy." / "Không được nói với ai."',
            'Khẩn cấp làm bạn ít kiểm tra hơn, ngại hỏi lại, và thấy việc dừng lại giống một sự chậm trễ nguy hiểm. Nhưng trong an toàn số, dừng lại thường chính là hành động nhanh nhất để tránh thiệt hại.',
            'Ví dụ: Một cuộc gọi video ngắn hiện gương mặt giống người thân, nói đang cần tiền ngay để giải quyết tai nạn. Nếu bạn chuyển tiền trong 2 phút, bạn có thể mất tiền. Nếu bạn dừng lại 2 phút để gọi lại số đã lưu, bạn có thể phát hiện người thân vẫn an toàn.',
            'Câu cần nhớ: Càng bị ép phải làm ngay, càng cần chậm lại.',
          ], [
            'Khẩn cấp tắt khả năng phân tích — đây là mục tiêu của kẻ xấu.',
            'Càng bị ép làm ngay, càng cần dừng lại.',
          ]),
          lesson('2.1.2', 'Nút bấm 2: Thân quen', [
            'Con người có xu hướng tin người quen hơn người lạ. Trên không gian số, sự thân quen có thể bị giả mạo bằng: ảnh đại diện quen thuộc, tên tài khoản giống thật, tài khoản thật đã bị chiếm quyền, giọng nói mô phỏng, video ngắn giả mạo, thông tin cá nhân lấy từ mạng xã hội.',
            'Một tin nhắn từ tài khoản bạn bè không luôn đồng nghĩa với việc bạn bè đang nhắn. Một giọng nói giống người thân không luôn đồng nghĩa với đúng người thân.',
            'Ví dụ: Bạn nhận tin nhắn "Mình đang kẹt chút việc. Chuyển giúp mình 2 triệu vào tài khoản này. Tối mình gửi lại." Ảnh đại diện đúng là bạn của bạn — nhưng cách nhắn hơi khác, người đó né gọi điện và bảo đang họp. Câu hỏi không phải là "Mình có quen tài khoản này không?" mà là "Mình có chắc đúng người đang điều khiển tài khoản này không?"',
            'Câu cần nhớ: Tài khoản quen không đảm bảo người dùng thật đang ở phía sau.',
          ], [
            'Sự thân quen có thể bị giả mạo hoàn toàn trên không gian số.',
            'Tài khoản quen ≠ đúng người đang điều khiển.',
          ]),
          lesson('2.1.3', 'Nút bấm 3: Quyền lực', [
            'Con người thường phản ứng nhanh hơn khi người yêu cầu có vẻ có thẩm quyền: công an, tòa án, ngân hàng, nhà trường, lãnh đạo, cơ quan nhà nước, người nổi tiếng.',
            'Kẻ xấu có thể nói: "Bạn liên quan đến một vụ án." / "Bạn phải làm theo hướng dẫn để chứng minh trong sạch." / "Đây là yêu cầu từ cấp trên." / "Không được tiết lộ với ai vì đang điều tra." / "Nếu không hợp tác sẽ chịu trách nhiệm."',
            'Khi deepfake hoặc deepvoice được thêm vào, cảm giác quyền lực càng mạnh hơn. Một giọng nói giống lãnh đạo có thể khiến nhân viên chuyển tiền. Một video giống người nổi tiếng có thể khiến người xem đầu tư.',
            'Câu cần nhớ: Người có thẩm quyền thật không cần bạn bỏ qua mọi quy trình an toàn.',
          ], [
            'Quyền lực có thể bị giả mạo — deepfake làm cảm giác này càng mạnh hơn.',
            'Người có thẩm quyền thật không ép bạn bỏ qua quy trình an toàn.',
          ]),
          lesson('2.1.4', 'Nút bấm 4: Lợi ích', [
            'Không phải lừa đảo nào cũng dùng nỗi sợ — nhiều lừa đảo dùng hy vọng. Kẻ xấu có thể hứa: lợi nhuận cao, học bổng, quà tặng, mã giảm giá, cơ hội đầu tư, cách kiếm tiền dễ.',
            'Deepfake có thể làm lời hứa trông đáng tin hơn. Ví dụ, một video người nổi tiếng nói "Tôi cũng đang dùng nền tảng này." Hoặc một chuyên gia có gương mặt đẹp, giọng tự tin, video chuyên nghiệp hứa "hướng dẫn bạn đạt lợi nhuận ổn định."',
            'Lợi ích làm chúng ta muốn tin. Khi một nội dung hứa hẹn điều quá tốt, quá nhanh, quá dễ, hãy kiểm tra kỹ hơn.',
            'Câu cần nhớ: Cơ hội thật không cần bạn tắt khả năng nghi ngờ.',
          ], [
            'Lừa đảo lợi ích dùng hy vọng thay vì nỗi sợ — deepfake làm lời hứa trông thật hơn.',
            'Cơ hội thật không cần bạn tắt khả năng nghi ngờ.',
          ]),
          lesson('2.1.5', 'Deepfake thường không đi một mình', [
            'Deepfake hiếm khi là toàn bộ cuộc tấn công. Một vụ lừa đảo thường gồm nhiều bước: thu thập thông tin cá nhân từ mạng xã hội; tạo tài khoản giả hoặc chiếm quyền tài khoản thật; dùng ảnh, giọng nói hoặc video giả để tạo niềm tin; gây áp lực bằng thời gian, tiền bạc, xấu hổ hoặc sợ hãi; dẫn nạn nhân sang kênh riêng; yêu cầu chuyển tiền, gửi OTP hoặc cung cấp thông tin.',
            'Vì vậy, khi học cách phòng vệ, bạn không chỉ hỏi "Video này có phải deepfake không?" mà cần hỏi "Toàn bộ tình huống này có đang đẩy mình vào một hành động nguy hiểm không?"',
            'Một cuộc gọi có thể không phải deepfake nhưng vẫn là lừa đảo. Một tài khoản có thể là thật nhưng đã bị chiếm quyền. Một lời nhắn không chứa mã độc nhưng đang dụ bạn tự gửi OTP.',
          ], [
            'Deepfake chỉ là một mảnh trong kịch bản lớn hơn.',
            'Hỏi "toàn bộ tình huống có đẩy mình vào hành động nguy hiểm không?" — không chỉ "đây có phải deepfake không?"',
          ]),
          lesson('2.1.6', 'Sáu dấu hiệu ngôn ngữ cần cảnh giác', [
            'Kẻ xấu thường để lại dấu hiệu trong cách nói hoặc cách viết. Hãy chú ý 6 mẫu sau:',
            '1. "Làm ngay" — "Chuyển ngay", "Xác nhận ngay", "Gửi mã ngay". Đây là dấu hiệu áp lực thời gian.',
            '2. "Đừng nói với ai" — "Việc này đang bí mật", "Đừng gọi ai khác", "Không được nói với đồng nghiệp". Đây là dấu hiệu cô lập nạn nhân.',
            '3. "Nếu không thì..." — "Nếu không làm, tài khoản sẽ bị khóa", "Nếu không hợp tác, bạn sẽ gặp rắc rối". Đây là dấu hiệu đe dọa.',
            '4. "Chỉ bạn được chọn" — "Suất này chỉ dành cho bạn", "Không công khai đâu". Đây là dấu hiệu đánh vào cảm giác đặc biệt.',
            '5. "Quá tốt để bỏ lỡ" — "Lợi nhuận chắc chắn", "Không có rủi ro", "Làm ít nhận nhiều". Đây là dấu hiệu hứa hẹn bất thường.',
            '6. "Xấu hổ nên đừng hỏi" — "Nếu không muốn ảnh này lan ra thì làm theo", "Đừng làm lớn". Đây là dấu hiệu tống tiền hoặc thao túng bằng xấu hổ.',
            'Kẻ xấu không chỉ giả hình ảnh và giọng nói — chúng còn thiết kế câu chữ để điều khiển phản ứng của bạn.',
          ], [
            '6 mẫu ngôn ngữ cảnh báo: làm ngay, đừng nói ai, nếu không thì, chỉ bạn được chọn, quá tốt để bỏ lỡ, xấu hổ đừng hỏi.',
            'Câu chữ được thiết kế để điều khiển phản ứng — nhận ra chúng là bước phòng thủ đầu tiên.',
          ]),
        ],
        checkpoint: checkpoint('2.1', [
          q('Một người gọi nói giống người thân và yêu cầu bạn chuyển tiền trong 5 phút. Nút bấm chính đang được dùng là gì?', ['Khẩn cấp', 'Giải trí', 'Học thuật', 'Tò mò'], 0,
            'Áp lực thời gian khiến bạn dễ hành động trước khi kiểm chứng.'),
          q('Một tài khoản giống bạn thân nhắn mượn tiền, nhưng né gọi điện và bảo đang rất bận. Rủi ro lớn nhất là gì?', ['Tài khoản có thể bị chiếm quyền hoặc bị giả mạo', 'Điện thoại của bạn chắc chắn bị hỏng', 'Bạn thân chắc chắn đã đổi tính cách', 'Tin nhắn ngắn thì luôn an toàn'], 0,
            'Tài khoản quen không đảm bảo đúng người đang điều khiển tài khoản.'),
          q('Câu nào sau đây là dấu hiệu cô lập nạn nhân?', ['Bạn có thể kiểm tra thêm', 'Đừng nói với ai, việc này bí mật', 'Hãy gọi tổng đài chính thức', 'Bạn có thể suy nghĩ rồi trả lời sau'], 1,
            'Kẻ xấu thường không muốn bạn hỏi người khác hoặc xác minh độc lập.'),
          q('Một video người nổi tiếng hứa lợi nhuận cao, không rủi ro, chỉ cần đăng ký ngay. Nút bấm chính là gì?', ['Lợi ích', 'Lịch sử', 'Thể thao', 'Âm nhạc'], 0,
            'Lời hứa lợi nhuận cao, dễ dàng và gấp gáp là dấu hiệu cần cảnh giác.'),
          q('Một người tự xưng là cơ quan chức năng yêu cầu bạn cài app lạ để chứng minh trong sạch. Dấu hiệu nào đáng lo nhất?', ['Dùng quyền lực để ép bạn bỏ qua quy trình an toàn', 'Người đó nói chuyện nghiêm túc', 'Cuộc gọi diễn ra vào buổi sáng', 'Bạn không thích app mới'], 0,
            'Vai trò có thẩm quyền có thể bị giả mạo để gây áp lực.'),
          q('Điều nào đúng nhất về deepfake và lừa đảo?', ['Nếu một cuộc gọi không phải deepfake thì chắc chắn an toàn', 'Một cuộc gọi có thể không phải deepfake nhưng vẫn là lừa đảo', 'Chỉ deepfake mới nguy hiểm', 'Tin nhắn không có video thì không thể lừa đảo'], 1,
            'Deepfake chỉ là một phần của hệ sinh thái lừa đảo và thao túng.'),
          q('Khi thấy câu "chia sẻ ngay trước khi bị xóa", bạn nên hiểu gì?', ['Đây là tín hiệu cần kiểm chứng trước khi chia sẻ', 'Đây luôn là tin chính xác', 'Đây là bằng chứng nội dung quan trọng', 'Đây là lý do phải chia sẻ nhanh'], 0,
            'Câu này tạo áp lực và có thể làm nội dung sai lan nhanh.'),
          q('Một yêu cầu liên quan đến OTP nên được xử lý thế nào?', ['Gửi nếu người yêu cầu nghe giống người quen', 'Gửi nếu đang vội', 'Không cung cấp OTP qua cuộc gọi hoặc tin nhắn; xác minh qua kênh chính thức', 'Gửi một phần mã để kiểm tra'], 2,
            'OTP là thông tin nhạy cảm, không chia sẻ qua cuộc gọi hoặc tin nhắn.'),
          q('Vì sao kẻ xấu thường yêu cầu đừng nói với ai?', ['Để bạn không nhận được lời khuyên hoặc kiểm chứng từ người khác', 'Vì chúng muốn bảo vệ quyền riêng tư của bạn', 'Vì mọi tình huống khẩn cấp đều phải bí mật', 'Vì nói với người khác sẽ làm điện thoại chậm hơn'], 0,
            'Cô lập nạn nhân giúp kẻ xấu kiểm soát tình huống.'),
          q('Khi một nội dung làm bạn sợ, giận hoặc muốn hành động ngay, phản xạ an toàn nhất là gì?', ['Dừng lại và kiểm chứng', 'Chia sẻ ngay', 'Chuyển tiền trước, kiểm tra sau', 'Làm theo cảm xúc đầu tiên'], 0,
            'Cảm xúc mạnh là tín hiệu cần chậm lại.'),
        ]),
      },
      {
        title: '2.1.1 Hiệu ứng "tôi thấy tận mắt"',
        lessons: [
          lesson('2.1.1.1', 'Vì sao chúng ta tin thứ mình nhìn thấy?', [
            'Con người dựa vào giác quan để hiểu thế giới. Nếu thấy trời mưa, ta tin là trời đang mưa. Nếu thấy một người nói trong video, ta thường tin người đó đã nói như vậy. Trong đời sống bình thường, phản xạ này rất hữu ích.',
            'Nhưng trên không gian số, hình ảnh và âm thanh không còn là dấu vết trực tiếp đơn giản như trước. Một video có thể là: quay thật; quay thật nhưng bị cắt; quay thật nhưng bị đăng sai bối cảnh; ghép thêm phụ đề sai; chỉnh khẩu hình; thay mặt; thêm giọng giả; hoặc tạo hoàn toàn bằng AI.',
            'Vì vậy, câu "tôi thấy tận mắt" cần được cập nhật. Trong môi trường số, thấy tận mắt chỉ có nghĩa là: tôi đã thấy một nội dung được hiển thị trên màn hình. Nó chưa đủ để kết luận: sự việc đó chắc chắn đã xảy ra đúng như nội dung thể hiện.',
          ], [
            '"Tôi thấy tận mắt" trong môi trường số chỉ nghĩa là thấy nội dung trên màn hình — chưa đủ để kết luận.',
            'Một video có thể bị cắt, đặt sai bối cảnh, chỉnh khẩu hình hoặc tạo hoàn toàn bằng AI.',
          ]),
          lesson('2.1.1.2', 'Video có sức nặng cảm xúc', [
            'Video kết hợp hình ảnh, chuyển động, giọng nói, biểu cảm và bối cảnh. Vì vậy, video tạo cảm giác thật mạnh hơn văn bản. Một đoạn video 10 giây có thể khiến người xem tin, giận, sợ, thương, xấu hổ hoặc muốn chia sẻ ngay.',
            'Kẻ xấu có thể lợi dụng điều này bằng cách tạo nội dung ngắn, dễ lan truyền và đánh mạnh vào cảm xúc. Ví dụ: clip "người nổi tiếng thú nhận bí mật", video "học sinh làm điều sai trái", đoạn "lãnh đạo phát ngôn gây sốc", cuộc gọi "người thân đang nguy hiểm".',
            'Khi video càng ngắn và càng gây sốc, bạn càng có ít bối cảnh để đánh giá.',
            'Câu cần nhớ: Video ngắn có thể tạo cảm xúc dài.',
          ], [
            'Video kết hợp nhiều kênh cảm xúc — gây phản ứng trước khi lý trí kịp phân tích.',
            'Video ngắn càng gây sốc = càng ít bối cảnh để đánh giá.',
          ]),
          lesson('2.1.1.3', 'Giọng nói chạm vào niềm tin cá nhân', [
            'Ta nhận ra người thân qua giọng. Ta cảm nhận sự lo lắng qua giọng. Ta tin một người quen vì "đúng giọng đó mà". Deepvoice nguy hiểm vì nó chạm vào lớp niềm tin rất cá nhân này. Một câu nói ngắn như "Con ơi, giúp mẹ với" có thể mạnh hơn một tin nhắn dài.',
            'Nhưng giọng nói cũng có thể bị: cắt từ ngữ cảnh khác; ghép lại; giả lập bằng AI; phát qua cuộc gọi chất lượng thấp để che lỗi; kết hợp với thông tin cá nhân để tăng độ tin.',
            'Vì vậy, với các yêu cầu rủi ro cao, không hỏi "Giọng này có giống không?" mà hỏi "Yêu cầu này có cần xác minh độc lập không?" Nếu yêu cầu liên quan đến tiền, tài khoản, OTP, giấy tờ hoặc thông tin cá nhân, câu trả lời gần như luôn là có.',
          ], [
            'Giọng người thân chạm vào niềm tin cá nhân sâu nhất — deepvoice khai thác điều này.',
            'Đổi câu hỏi: không hỏi "giọng giống không?" mà hỏi "yêu cầu cần xác minh độc lập không?"',
          ]),
          lesson('2.1.1.4', 'Niềm tin nhóm có thể làm nội dung trông thật hơn', [
            'Một nội dung thường thuyết phục hơn khi nhiều người xung quanh cũng tin. Ví dụ: video có nhiều lượt thích; bình luận có vẻ xác nhận; bạn bè chia sẻ; nhóm chat đang bàn tán sôi nổi; một người có uy tín trong nhóm nói "chắc thật".',
            'Nhưng lượt thích, bình luận và chia sẻ không phải bằng chứng chắc chắn. Chúng có thể đến từ: người thật nhưng cũng bị nhầm; tài khoản giả; bình luận seeding; người chia sẻ vì cảm xúc; người không kiểm chứng nguồn.',
            'Nếu một nội dung sai được nhiều người tin, nó vẫn sai. Nếu một nội dung chưa được kiểm chứng được nhiều người chia sẻ, nó vẫn chưa được kiểm chứng.',
            'Câu cần nhớ: Đám đông có thể làm nội dung lan xa, nhưng không tự động làm nội dung đúng hơn.',
          ], [
            'Nhiều người tin không bằng chứng cho nội dung là thật — lượt thích và bình luận có thể giả.',
            'Đám đông lan nội dung, không xác thực nội dung.',
          ]),
          lesson('2.1.1.5', 'Khi nào cần nghiêm túc kiểm chứng?', [
            'Không phải mọi nội dung đều cần điều tra kỹ. Nếu một ảnh AI được ghi rõ là minh họa, rủi ro thấp. Nhưng bạn cần kiểm chứng nghiêm túc khi nội dung: yêu cầu chuyển tiền; yêu cầu OTP, mật khẩu, mã xác minh; yêu cầu cài ứng dụng; liên quan đến danh dự hoặc hình ảnh nhạy cảm; kêu gọi chia sẻ gấp; gây phẫn nộ xã hội; gắn với sức khỏe, pháp lý, tài chính hoặc an toàn cá nhân; mạo danh người thân, lãnh đạo hoặc cơ quan chức năng.',
            'Nguyên tắc đơn giản: Rủi ro càng cao, bằng chứng càng phải chắc.',
          ], [
            '8 loại nội dung cần kiểm chứng nghiêm túc: yêu cầu tiền, OTP, cài app, danh dự nhạy cảm, chia sẻ gấp, phẫn nộ xã hội, sức khỏe/pháp lý/tài chính, mạo danh.',
            'Rủi ro càng cao, bằng chứng càng phải chắc.',
          ]),
          lesson('2.1.1.6', 'Câu trả lời trưởng thành: Tôi chưa đủ dữ liệu', [
            'Trong nhiều tình huống, người khác sẽ hỏi "Theo bạn cái này thật hay giả?" và bạn có thể thấy áp lực phải trả lời ngay. Nhưng câu trả lời tốt nhất đôi khi là: "Tôi chưa đủ dữ liệu để kết luận."',
            'Đây không phải là né tránh. Đây là tư duy có trách nhiệm. Bạn có thể nói tiếp: "Cần xem nguồn gốc video." / "Cần kiểm tra kênh chính thức." / "Cần hỏi người liên quan qua kênh khác." / "Hiện tại không nên chia sẻ thêm."',
            'Câu "chưa đủ dữ liệu" giúp bạn tránh hai lỗi: tin nhầm nội dung giả và phủ nhận nhầm nội dung thật. Trong thời đại deepfake, sự thận trọng không làm bạn yếu đi — nó làm bạn đáng tin hơn.',
            'Takeaway: Thấy, nghe và thấy nhiều người chia sẻ vẫn chưa đủ. Với nội dung rủi ro cao, hãy kiểm chứng trước khi tin, chia sẻ hoặc hành động.',
          ], [
            '"Tôi chưa đủ dữ liệu" — câu trả lời trưởng thành, tránh hai lỗi: tin nhầm và phủ nhận nhầm.',
            'Thận trọng không làm bạn yếu — nó làm bạn đáng tin hơn.',
          ]),
        ],
        checkpoint: null,
      },
      {
        title: '2.2 Case tương tác: Cuộc gọi lúc 22:47',
        lessons: [
          lesson('2.2.0', 'Bối cảnh: Đã 22:47', [
            'Đã 22:47. An đang chuẩn bị đi ngủ thì điện thoại reo. Màn hình hiển thị tên: Minh Anh — em họ của An, hai người thỉnh thoảng nhắn tin, không gọi video thường xuyên.',
            'An bắt máy. Màn hình hiện khuôn mặt Minh Anh — hình hơi mờ, ánh sáng yếu, âm thanh có lúc bị vỡ. Minh Anh nói rất nhanh: "Anh An, giúp em với. Em vừa va chạm xe. Em cần chuyển khoản gấp để xử lý. Điện thoại em sắp hết pin. Anh chuyển giúp em 5 triệu vào số tài khoản này được không?"',
            'An hỏi "Em đang ở đâu?" — người kia đáp: "Em không nói rõ được. Gấp lắm. Anh đừng gọi cho mẹ em, mẹ em sẽ hoảng. Anh chuyển trước đi rồi em nói sau." Sau đó người kia gửi số tài khoản qua tin nhắn — tên người lạ.',
            'Các dữ kiện: cuộc gọi từ tài khoản có tên Minh Anh; hình ảnh giống nhưng hơi mờ; giọng nói khá giống; yêu cầu chuyển tiền gấp; yêu cầu không báo người khác; số tài khoản là tên người lạ; cuộc gọi diễn ra muộn; người gọi né câu hỏi về địa điểm.',
          ], [
            'Case 2.2: Minh Anh (em họ) gọi lúc 22:47 — va chạm xe, cần 5 triệu, đừng gọi mẹ, số tài khoản tên người lạ.',
            'Nhận diện bao nhiêu nút bấm trong 30 giây đầu?',
          ]),
          lesson('2.2.1', 'Câu hỏi tương tác 1 và 2', [
            'Câu hỏi 1 — Bạn làm gì trước? (A) Chuyển tiền ngay vì có thể Minh Anh đang nguy hiểm. (B) Hỏi lại vài câu riêng tư và nếu trả lời đúng thì chuyển. (C) Kết thúc cuộc gọi, gọi lại số điện thoại đã lưu của Minh Anh hoặc gọi người thân khác. (D) Nhắn "đợi chút" rồi gửi trước 1 triệu để giúp tạm.',
            'Đáp án khuyến nghị: C. Thoát khỏi kênh đang bị nghi vấn và xác minh bằng kênh đã biết trước là lựa chọn an toàn nhất. Hỏi câu riêng tư (B) không đủ chắc — thông tin cá nhân có thể bị lấy từ mạng xã hội. Chuyển "một ít trước" (D) vẫn là chuyển tiền cho tình huống chưa xác minh.',
            'Câu hỏi 2 — Dấu hiệu nào đáng nghi? (Chọn nhiều): A. Yêu cầu chuyển tiền gấp. B. Yêu cầu không báo người khác. C. Số tài khoản là tên người lạ. D. Hình ảnh hơi mờ. E. Né câu hỏi về địa điểm. F. Cuộc gọi diễn ra muộn.',
            'Đáp án khuyến nghị: A, B, C, E. Dấu hiệu mạnh nhất không phải hình ảnh mờ (D — video mờ có thể do mạng yếu). Dấu hiệu mạnh hơn là yêu cầu chuyển tiền, áp lực thời gian, cô lập nạn nhân, tài khoản lạ và né xác minh.',
          ], [
            'Đáp án Q1: gọi lại số đã lưu — thoát kênh nghi vấn, xác minh qua kênh độc lập.',
            'Đáp án Q2: A+B+C+E là dấu hiệu mạnh; D và F là bối cảnh cần chú ý nhưng chưa đủ kết luận.',
          ]),
          lesson('2.2.2', 'Câu hỏi tương tác 3 và 4', [
            'Câu hỏi 3 — Kênh độc lập nào tốt nhất? Sắp xếp từ an toàn hơn đến kém an toàn hơn: (1) Gọi số điện thoại đã lưu từ trước của Minh Anh. (2) Gọi mẹ hoặc người thân của Minh Anh bằng số đã lưu. (3) Nhắn lại ngay trong cuộc gọi/tài khoản đang nghi vấn. (4) Gọi số điện thoại mới mà người kia vừa gửi. (5) Bấm vào link "vị trí bệnh viện" người kia gửi.',
            'Thứ tự khuyến nghị: 1 > 2 > 3 > 4 > 5. Kênh độc lập là kênh bạn đã biết từ trước, không phải kênh do người đang bị nghi vấn cung cấp trong lúc khẩn cấp.',
            'Câu hỏi 4 — Nếu đã lỡ chuyển tiền, An nên làm gì? (Chọn nhiều): A. Liên hệ ngân hàng càng sớm càng tốt. B. Lưu bằng chứng: tin nhắn, số tài khoản, thời gian, ảnh chụp màn hình. C. Báo cho người thân để tránh người khác bị lừa tiếp. D. Xóa hết vì xấu hổ. E. Báo cáo tài khoản nghi giả mạo trên nền tảng. F. Đăng thông tin cá nhân nghi phạm lên mọi nhóm.',
            'Đáp án khuyến nghị: A, B, C, E. Xóa bằng chứng (D) làm việc xử lý khó hơn. Đăng thông tin cá nhân tràn lan (F) có thể gây rủi ro pháp lý nếu thông tin chưa chắc chắn.',
          ], [
            'Kênh an toàn nhất: số điện thoại đã lưu từ trước — không phải kênh do người nghi vấn cung cấp.',
            'Nếu lỡ chuyển: A+B+C+E — hành động nhanh, lưu bằng chứng, báo cáo, không xóa.',
          ]),
          lesson('2.2.3', 'Phân tích, mẫu phản hồi và checklist', [
            'Điều nguy hiểm nhất trong case này không phải video có hoàn hảo hay không — mà là kịch bản đánh vào nhiều nút bấm cùng lúc: Thân quen (giống Minh Anh) + Khẩn cấp (cần tiền ngay) + Sợ hãi (tai nạn) + Cô lập (đừng gọi mẹ) + Né xác minh (không nói địa điểm) + Tài chính (chuyển khoản). Một người bình thường hoàn toàn có thể hoảng trong tình huống này. Lo lắng cho người thân là phản ứng tốt. Mục tiêu là thêm một bước an toàn: lo lắng thì được — nhưng trước khi chuyển tiền, phải xác minh.',
            'Mẫu phản hồi an toàn khi gặp tình huống tương tự: "Anh/chị sẽ gọi lại em bằng số cũ ngay bây giờ." / "Nếu thật sự khẩn cấp, anh/chị cần xác minh để giúp đúng cách." / "Anh/chị không chuyển tiền qua tài khoản lạ khi chưa xác nhận." / "Anh/chị không thể đọc OTP hoặc gửi mã xác minh."',
            'Checklist trước mọi cuộc gọi/tin nhắn khẩn cấp yêu cầu tiền hoặc thông tin nhạy cảm: 1. Người này có đang yêu cầu mình làm điều rủi ro không? 2. Có áp lực thời gian bất thường không? 3. Có yêu cầu giữ bí mật không? 4. Có kênh độc lập để xác minh không? 5. Thông tin tài khoản/link/số điện thoại có phải được gửi ngay trong tình huống nghi vấn không? 6. Nếu mình chậm lại 2 phút, điều gì tốt hơn có thể xảy ra?',
            'Takeaway: Một cuộc gọi giống người thân vẫn cần xác minh nếu nó yêu cầu tiền, OTP, mật khẩu hoặc hành động khẩn cấp.',
          ], [
            'Kịch bản nguy hiểm khi kết hợp nhiều nút bấm: thân quen + khẩn cấp + sợ hãi + cô lập.',
            'Checklist 6 câu hỏi + mẫu phản hồi an toàn — dùng trước khi hành động trong mọi tình huống khẩn cấp.',
          ]),
        ],
        checkpoint: null,
      },
    ],
    quiz: [
      q('Bốn nút bấm cảm xúc trong Module 2 gồm những gì?', ['Khẩn cấp, thân quen, quyền lực, lợi ích', 'Vui, buồn, giận, sợ', 'Tham lam, lười biếng, kiêu ngạo, đố kỵ', 'Tình cảm, lý trí, bản năng, tư duy'], 0),
      q('Điều quan trọng nhất của Module 2 là gì?', ['Khi cảm xúc bị đẩy lên cao, khả năng kiểm chứng bị kéo xuống thấp', 'Luôn tin vào thứ mình nhìn thấy', 'Chỉ tin người lạ, không tin người quen', 'Mọi deepfake đều dễ nhận ra'], 0),
      q('Trong case 2.2, tên người gọi cho An là ai và yêu cầu gì?', ['Minh Anh — em họ, cần chuyển 5 triệu vì va chạm xe', 'Em Linh — em gái, cần chuyển 15 triệu vì bệnh viện', 'Bạn học, cần chuyển 3 triệu vì thi rớt', 'Đồng nghiệp, cần mượn thẻ tín dụng gấp'], 0),
      q('Câu "tôi thấy tận mắt" trong môi trường số thực sự có nghĩa gì?', ['Tôi đã thấy nội dung hiển thị trên màn hình — chưa đủ để kết luận sự việc', 'Sự việc đó chắc chắn đã xảy ra đúng như thể hiện', 'Video là bằng chứng không thể làm giả', 'Giọng nói xác nhận mọi thứ'], 0),
      q('Người có thẩm quyền thật khác người giả quyền lực ở điểm nào?', ['Người có thẩm quyền thật không cần bạn bỏ qua mọi quy trình an toàn', 'Người có thẩm quyền thật luôn gọi điện', 'Người giả quyền lực luôn dùng email', 'Không có sự khác biệt rõ ràng'], 0),
      q('Nếu đã lỡ chuyển tiền trong tình huống nghi lừa đảo, bước đầu tiên là gì?', ['Liên hệ ngân hàng càng sớm càng tốt', 'Im lặng và chờ', 'Xóa toàn bộ tin nhắn vì xấu hổ', 'Đăng thông tin nghi phạm lên mọi nhóm'], 0),
      q('Câu trả lời trưởng thành khi chưa đủ thông tin để kết luận là gì?', ['Tôi chưa đủ dữ liệu để kết luận — cần kiểm chứng thêm', 'Tôi tin vì trông có vẻ đúng', 'Tôi không tin gì hết', 'Nhờ người khác quyết định hộ'], 0),
      q('Kênh nào là kênh độc lập an toàn nhất để xác minh trong case 2.2?', ['Gọi lại số điện thoại đã lưu từ trước của Minh Anh', 'Nhắn lại ngay trong cuộc gọi đang nghi vấn', 'Gọi số điện thoại mới mà người kia vừa gửi', 'Bấm vào link người kia gửi'], 0),
    ],
  },

  // ── MODULE 3 ─────────────────────────────────────────────────
  {
    id: 3, part: 'foundation',
    title: 'Nhìn, nghe, đọc: dấu hiệu nghi vấn',
    duration: '100-110 phút', level: 'Foundation',
    scenario: 'Sau cuộc gọi lúc 22:47, An bắt đầu cẩn thận hơn. Sáng hôm sau, An mở lại video người nổi tiếng kêu gọi đầu tư. Lần này, An không vội tin — An nhìn kỹ hơn và đặt câu hỏi: khuôn mặt có gì lạ không? Khẩu hình có khớp với giọng nói không? Video được đăng từ tài khoản chính thức hay tài khoản lạ? An nhận ra: quan sát không chỉ là nhìn mặt — quan sát là xem toàn bộ tình huống.',
    outcomes: [
      'Biết quan sát các dấu hiệu nghi vấn trong hình ảnh và video.',
      'Nhận diện một số dấu hiệu thường gặp của deepvoice hoặc âm thanh bị chỉnh sửa.',
      'Hiểu giới hạn của việc nhìn và nghe bằng cảm giác.',
      'Sử dụng được checklist 3 lớp: hình ảnh — âm thanh — ngữ cảnh.',
    ],
    sections: [
      {
        title: '3.0 Câu chuyện dẫn nhập',
        lessons: [
          lesson('3.0.0', 'An xem lại video đầu tư', [
            'Sau cuộc gọi lúc 22:47, An bắt đầu cẩn thận hơn. Sáng hôm sau, An mở lại video người nổi tiếng kêu gọi đầu tư đã thấy ở Module 1. Lần này, An không vội tin. An bật video chậm hơn, nhìn kỹ hơn và tự hỏi: Khuôn mặt có gì lạ không? Khẩu hình có khớp với giọng nói không? Ánh sáng trên mặt có hợp với bối cảnh không? Giọng nói có tự nhiên không? Nội dung có hứa lợi nhuận quá cao không? Video được đăng từ tài khoản chính thức hay tài khoản lạ? Có nguồn nào khác xác nhận không?',
            'An nhận ra một điều: quan sát không chỉ là nhìn mặt. Quan sát là xem toàn bộ tình huống. Một video có thể trông mượt nhưng ngữ cảnh rất đáng ngờ. Một video có thể hơi mờ nhưng lại hoàn toàn thật. Một giọng nói có thể giống nhưng yêu cầu đi kèm lại nguy hiểm.',
            'Module 3 sẽ giúp bạn học cách quan sát theo ba lớp: (1) Lớp hình ảnh/video — mắt nhìn thấy gì? (2) Lớp âm thanh/giọng nói — tai nghe thấy gì? (3) Lớp ngữ cảnh/hành vi — nội dung đang yêu cầu bạn tin hoặc làm gì?',
          ], null),
        ],
        checkpoint: null,
      },
      {
        title: '3.1 Dấu hiệu hình ảnh và video',
        lessons: [
          lesson('3.1.0', 'Nguyên tắc đầu tiên: quan sát chậm lại', [
            'Khi một video gây sốc, con người thường phản ứng trước khi quan sát. Ta nhìn thấy gương mặt quen, nghe một câu gây choáng, đọc bình luận bên dưới và lập tức cảm thấy tin, giận, sợ hoặc muốn chia sẻ. Vì vậy, bước quan sát đầu tiên không phải là tìm lỗi kỹ thuật — bước đầu tiên là chậm lại.',
            'Bạn có thể tự nhắc: <em>Mình đang xem một nội dung trên màn hình. Mình chưa cần kết luận ngay.</em> Sau đó, hãy quan sát theo vòng: (1) Nhìn tổng thể. (2) Nhìn khuôn mặt. (3) Nhìn miệng và âm thanh. (4) Nhìn ánh sáng và bóng. (5) Nhìn tay, tóc, tai, phụ kiện. (6) Nhìn nền và vật thể xung quanh. (7) Nhìn nguồn đăng và chú thích.',
            'Trong phần 3.1, chúng ta tập trung vào hình ảnh và video. Ngữ cảnh sẽ được học kỹ hơn ở phần 3.3.',
          ], null),
          lesson('3.1.1', 'Quan sát khuôn mặt và mắt', [
            'Deepfake thường tập trung vào khuôn mặt, vì khuôn mặt là nơi con người nhận diện danh tính và cảm xúc. Khi quan sát khuôn mặt, bạn có thể chú ý: da mặt có quá mịn, quá bóng hoặc khác chất lượng với cổ/tay không? Rìa khuôn mặt có bị nhòe, rung hoặc méo khi người đó quay đầu không? Hai bên mặt có ánh sáng hợp lý không? Biểu cảm có khớp với nội dung lời nói không? Kính, tóc, tai hoặc vật che mặt có bị biến dạng không?',
            'Về mắt: nhiều hướng dẫn cũ nói rằng deepfake thường chớp mắt bất thường. Điều này từng hữu ích hơn trong giai đoạn đầu của công nghệ. Hiện nay, dấu hiệu này không còn đủ tin cậy. Bạn vẫn có thể quan sát: ánh mắt có khớp với hướng đầu không? Mắt có phản chiếu ánh sáng hợp lý không? Cảm xúc trong mắt có khớp với giọng nói và nội dung không?',
            'Điểm cần nhớ: một người thật cũng có thể chớp mắt ít khi đang đọc kịch bản hoặc căng thẳng. Một deepfake tốt cũng có thể chớp mắt rất tự nhiên. Vì vậy: <em>mắt là nơi để quan sát, không phải nơi để phán quyết.</em>',
          ], null),
          lesson('3.1.2', 'Quan sát miệng, ánh sáng và chi tiết nhỏ', [
            'Miệng là vùng quan trọng khi video có lời nói. Bạn có thể quan sát: khẩu hình có khớp với âm thanh không? Có độ trễ lạ giữa môi và tiếng không? Răng có bị méo, biến dạng hoặc thay đổi bất thường không? Khi người nói quay đầu, miệng có bị nhòe hoặc lệch không? Lưu ý: video thật cũng có thể bị lệch tiếng do đường truyền kém, file bị nén hoặc ứng dụng phát video lỗi. Vì vậy, khẩu hình lệch là tín hiệu, không phải kết luận.',
            'Ánh sáng giúp phát hiện sự không nhất quán. Hãy hỏi: nguồn sáng chính đến từ đâu? Bóng trên mặt có hợp với bóng trong nền không? Mặt có sáng hơn hoặc tối hơn bất thường so với cổ/tay không? Kính, mắt, trang sức có phản chiếu hợp lý không? Có vùng nào trông như được dán lên không?',
            'Chi tiết nhỏ thường khó xử lý hơn khuôn mặt chính diện: tóc có bị nhòe, dính vào nền không? Tai có biến mất hoặc méo không? Gọng kính có bị cong hoặc phản chiếu sai không? Tay khi đưa lên mặt có làm khuôn mặt bị méo không? Ngón tay có số lượng hoặc hình dạng lạ không? Lưu ý: video nén trên mạng xã hội cũng có thể làm chi tiết nhỏ bị vỡ.',
          ], null),
          lesson('3.1.3', 'Chuyển động, nền và dấu hiệu tổng hợp', [
            'Con người chuyển động bằng cả cơ thể, không chỉ bằng khuôn mặt. Khi quan sát video, hãy để ý: đầu, cổ và vai có chuyển động tự nhiên cùng nhau không? Biểu cảm mặt có khớp với cử chỉ không? Người nói có quá cứng, ít chớp mắt, ít thay đổi tư thế không? Deepfake kém chất lượng có thể lộ lỗi khi nhân vật quay đầu nhanh, cúi xuống, che mặt hoặc cười lớn.',
            'Nhiều người chỉ nhìn mặt mà quên nhìn nền. Nền có thể cho bạn biết nhiều điều: có chữ nào bị méo, sai chính tả không? Logo có đúng không? Đồng hồ, biển số, màn hình có bất thường không? Vật thể trong nền có thay đổi hình dạng giữa các khung hình không? Có chi tiết nào không hợp với địa điểm được nói đến không?',
            'Quan trọng nhất: một dấu hiệu đơn lẻ hiếm khi đủ. Nhưng khi bạn thấy nhiều dấu hiệu cùng lúc — video từ tài khoản lạ, người nổi tiếng kêu gọi chuyển tiền, khẩu hình hơi lệch, không có trên kênh chính thức, bình luận giống seeding, link dẫn đến trang lạ — thì mức rủi ro tăng lên rất nhiều. Bạn không cần kết luận "100% deepfake" để hành động an toàn. Bạn chỉ cần kết luận: <em>Rủi ro đủ cao để không tin, không chuyển tiền, không chia sẻ và cần kiểm chứng thêm.</em>',
          ], [
            'Bước đầu tiên khi xem video đáng ngờ là chậm lại — không kết luận ngay.',
            'Quan sát theo vòng: khuôn mặt → miệng → ánh sáng → chi tiết nhỏ → chuyển động → nền → nguồn đăng.',
            'Nhiều dấu hiệu cùng lúc tăng mức rủi ro — không cần chứng minh deepfake mới được hành động an toàn.',
          ]),
        ],
        checkpoint: checkpoint('3.1', [
          q('Bước đầu tiên khi xem một video gây sốc là gì?', ['Dừng lại và quan sát chậm hơn', 'Chia sẻ ngay để hỏi mọi người', 'Kết luận ngay là deepfake', 'Tin nếu video có nhiều lượt thích'], 0),
          q('Khẩu hình lệch trong video có nghĩa là gì?', ['Là một tín hiệu cần chú ý, nhưng cần thêm kiểm chứng', 'Chắc chắn deepfake', 'Chắc chắn video thật', 'Không bao giờ quan trọng'], 0),
          q('Dấu hiệu nào sau đây thuộc lớp hình ảnh/video?', ['Rìa khuôn mặt bị nhòe khi quay đầu', 'Yêu cầu chuyển tiền trong 5 phút', 'Người gửi bảo đừng nói với ai', 'Link dẫn đến trang lạ'], 0),
          q('Điều nào đúng nhất về dấu hiệu chớp mắt?', ['Mắt là vùng nên quan sát, nhưng không đủ để kết luận một mình', 'Chớp mắt lạ luôn chứng minh video là deepfake', 'Không chớp mắt luôn chứng minh video là giả', 'Không cần quan sát mắt'], 0),
          q('Khi thấy khuôn mặt sáng khác hẳn cổ và nền, bạn nên làm gì?', ['Ghi nhận là dấu hiệu cần kiểm tra thêm', 'Kết luận ngay là giả', 'Bỏ qua hoàn toàn', 'Chia sẻ để người khác tự kiểm tra'], 0),
          q('Vì sao cần quan sát nền và vật thể xung quanh?', ['Nền có thể tiết lộ sai bối cảnh, chữ méo, logo sai hoặc địa điểm không khớp', 'Vì deepfake chỉ lỗi ở nền', 'Vì khuôn mặt luôn đáng tin', 'Vì vật thể trong nền không bao giờ bị chỉnh sửa'], 0),
          q('Một video người nổi tiếng kêu gọi đầu tư xuất hiện từ tài khoản lạ, không có trên kênh chính thức, có link đăng ký lạ. Dù video trông khá thật, bạn nên đánh giá thế nào?', ['Rủi ro cao, cần kiểm chứng và không bấm link/chuyển tiền', 'An toàn vì video trông thật', 'An toàn nếu có nhiều bình luận tích cực', 'Chỉ cần xem mắt người đó chớp có đều không'], 0),
          q('Một dấu hiệu đơn lẻ như video mờ thường nên được hiểu như thế nào?', ['Chưa đủ để kết luận', 'Chắc chắn giả', 'Chắc chắn thật', 'Không cần quan tâm đến nguồn nữa'], 0),
          q('Khi tay đi qua mặt trong video và khuôn mặt bị biến dạng, đây có thể là dấu hiệu gì?', ['Dấu hiệu hình ảnh cần chú ý', 'Dấu hiệu chắc chắn tài khoản ngân hàng bị khóa', 'Dấu hiệu video luôn an toàn', 'Dấu hiệu không liên quan'], 0),
          q('Mục tiêu đúng của quan sát hình ảnh/video là gì?', ['Tìm tín hiệu ban đầu để quyết định có cần kiểm chứng thêm không', 'Kết luận thật giả trong 3 giây', 'Tin vào cảm giác đầu tiên', 'Thay thế hoàn toàn việc kiểm tra nguồn'], 0),
        ]),
      },
      {
        title: '3.1.1 Giới hạn của quan sát',
        lessons: [
          lesson('3.1.1.0', 'Video thật có thể trông lạ', [
            'Không phải mọi thứ trông lạ đều là giả. Một video thật có thể có: ánh sáng xấu, camera kém, mạng yếu, âm thanh trễ, hình ảnh bị nén, người nói mệt hoặc ngại camera, góc quay kỳ lạ, bộ lọc làm đẹp, ứng dụng gọi video làm mịn da, hoặc video bị quay lại từ màn hình khác.',
            'Những yếu tố này có thể tạo ra cảm giác "sai sai". Nếu bạn thấy một dấu hiệu lạ, hãy ghi nhận nó. Nhưng đừng biến nó thành kết luận duy nhất.',
            'Ví dụ: Một giáo viên trong buổi học online có giọng bị lệch so với hình — có thể do mạng yếu, không nhất thiết là deepfake. Một người trong video có mặt quá mịn — có thể do bộ lọc làm đẹp, không nhất thiết là mạo danh. Một video bị vỡ nét khi chuyển động — có thể do nền tảng nén video, không nhất thiết là chỉnh sửa.',
          ], null),
          lesson('3.1.1.1', 'Video giả có thể trông rất thật', [
            'Ngược lại, không thấy lỗi không có nghĩa là thật. Công nghệ tạo hình ảnh, video và giọng nói đang tiến nhanh. Một số nội dung giả có thể: khẩu hình khá khớp, giọng nói khá tự nhiên, gương mặt ít lỗi, ánh sáng hợp lý, chất lượng sản xuất tốt, được đăng kèm bình luận tạo niềm tin.',
            'Nếu bạn chỉ hỏi: <em>Tôi có thấy lỗi kỹ thuật không?</em> — bạn có thể bỏ qua rủi ro lớn hơn. Hãy hỏi thêm: Ai đăng? Đăng ở đâu? Đăng lúc nào? Có nguồn chính thức không? Nội dung muốn mình làm gì? Có yêu cầu tiền, OTP, thông tin cá nhân hoặc chia sẻ gấp không?',
          ], null),
          lesson('3.1.1.2', 'Detector không thay thế được phán đoán', [
            'Một công cụ phát hiện deepfake có thể hỗ trợ bạn, nhưng không thay thế được quy trình kiểm chứng. Công cụ có thể sai theo hai hướng: báo giả với nội dung thật, hoặc báo thật với nội dung giả. Nguyên nhân có thể đến từ chất lượng file thấp, video đã bị nén nhiều lần, công nghệ giả mạo mới, hoặc dữ liệu huấn luyện của công cụ còn hạn chế.',
            'Vì vậy, nếu detector báo nghi ngờ, bạn không nên xem đó là bản án cuối cùng. Nếu detector báo không nghi ngờ, bạn cũng không nên xem đó là giấy chứng nhận an toàn.',
            'Cách nghĩ đúng: Detector là một chiếc đèn pin — nó giúp bạn soi thêm một góc, nhưng không phải toàn bộ căn phòng.',
          ], null),
          lesson('3.1.1.3', 'Ba mức kết luận an toàn', [
            'Khi quan sát nội dung, thay vì chỉ chọn thật hoặc giả, bạn có thể dùng 3 mức kết luận. Mức 1 — Chưa thấy dấu hiệu rõ, nhưng vẫn cần nguồn: video trông bình thường, nhưng mình cần xem nó có từ nguồn chính thức không. Mức 2 — Có dấu hiệu nghi vấn, cần kiểm chứng thêm: khẩu hình hơi lệch và tài khoản đăng khá lạ — mình chưa kết luận, nhưng không nên chia sẻ ngay.',
            'Mức 3 — Rủi ro cao, không hành động theo yêu cầu: dù video thật hay giả, yêu cầu chuyển tiền qua tài khoản lạ là rủi ro cao — mình sẽ xác minh qua kênh khác. Điểm mấu chốt: bạn không cần chứng minh deepfake mới được quyền từ chối chuyển tiền, bấm link hoặc chia sẻ.',
          ], [
            'Video thật có thể trông lạ vì nhiều lý do kỹ thuật — đừng kết luận vội.',
            'Video giả có thể trông rất thật — không thấy lỗi không có nghĩa là an toàn.',
            'Dùng 3 mức kết luận thay vì chỉ thật/giả: chưa đủ dữ liệu → nghi vấn → rủi ro cao.',
          ]),
        ],
        checkpoint: null,
      },
      {
        title: '3.2 Dấu hiệu âm thanh và deepvoice',
        lessons: [
          lesson('3.2.0', 'Giọng nói là tín hiệu mạnh nhưng không tuyệt đối', [
            'Ta thường nhận ra người quen qua giọng. Chỉ cần nghe vài từ, nhiều người đã biết đó là mẹ, bạn thân, giáo viên hoặc sếp. Vì vậy, khi nghe một giọng nói quen thuộc yêu cầu giúp đỡ, ta dễ tin. Nhưng trong thời đại deepvoice, giọng nói không còn là bằng chứng tuyệt đối.',
            'Điều này không có nghĩa là bạn phải nghi ngờ mọi cuộc gọi của người thân. Nó có nghĩa là: nếu cuộc gọi yêu cầu điều rủi ro, bạn cần xác minh. Điều rủi ro bao gồm: chuyển tiền, gửi OTP, cung cấp mật khẩu, gửi ảnh giấy tờ, cài app, bấm link, giữ bí mật với người khác, gửi hình ảnh nhạy cảm.',
          ], null),
          lesson('3.2.1', 'Dấu hiệu âm thanh cần chú ý', [
            'Bạn có thể để ý: giọng nói đều đều, thiếu nhịp thở tự nhiên; cảm xúc không khớp với tình huống; ngắt nghỉ kỳ lạ; phát âm sai tên riêng, biệt danh hoặc địa danh quen thuộc; trả lời vòng vo khi bị hỏi câu bất ngờ; né gọi lại; có tiếng nền không khớp với câu chuyện; âm thanh quá sạch so với môi trường được mô tả; câu trả lời lặp lại hoặc giống kịch bản.',
            'Ví dụ: người gọi nói đang ở hiện trường tai nạn, nhưng âm thanh nền lại rất yên tĩnh. Hoặc người gọi nói đang ở bệnh viện nhưng không trả lời được bệnh viện nào. Đây là dấu hiệu cần chú ý.',
            'Nhưng giống như video, âm thanh cũng có thể bị ảnh hưởng bởi mạng, micro, tiếng ồn, tâm trạng và môi trường. Vì vậy, dấu hiệu âm thanh cần đi cùng xác minh.',
          ], null),
          lesson('3.2.2', 'Câu hỏi bất ngờ và kịch bản deepvoice thường gặp', [
            'Một số người khuyên hãy hỏi câu riêng tư để xác minh, ví dụ: tên con chó nhà mình là gì? Hôm qua mình ăn ở đâu? Cách này có thể hữu ích trong một số tình huống. Nhưng không nên phụ thuộc hoàn toàn, vì kẻ xấu có thể biết thông tin từ mạng xã hội, tài khoản của người quen có thể đã bị chiếm quyền, hoặc người thật trong lúc hoảng loạn có thể trả lời không rõ. Với yêu cầu rủi ro cao, cách tốt nhất vẫn là: dừng cuộc gọi nghi vấn và xác minh qua kênh độc lập.',
            'Bốn kịch bản deepvoice thường gặp: (1) Người thân gặp nạn — giọng giống, nói nhanh hoảng, cần tiền gấp, không muốn bạn gọi người khác. Phản ứng: gọi lại số đã lưu, không chuyển tiền khi chưa xác minh. (2) Sếp yêu cầu xử lý gấp — yêu cầu chuyển khoản hoặc gửi dữ liệu, bảo bỏ qua quy trình. Phản ứng: tuân thủ quy trình xác nhận nội bộ.',
            '(3) Ngân hàng/cơ quan chức năng — tự xưng có thẩm quyền, đe dọa khóa tài khoản, yêu cầu đọc OTP. Phản ứng: không đọc OTP, tự tìm số tổng đài chính thức. (4) Tống tiền bằng giọng nói/hình ảnh — nói có hình ảnh nhạy cảm của bạn, yêu cầu tiền. Phản ứng: không thương lượng một mình trong hoảng loạn, lưu bằng chứng, báo cơ quan có trách nhiệm.',
          ], null),
          lesson('3.2.3', 'Checklist nghe an toàn', [
            'Khi nghe một giọng nói quen nhưng yêu cầu bất thường, hãy hỏi: (1) Người này có yêu cầu tiền, OTP, mật khẩu, giấy tờ hoặc ảnh nhạy cảm không? (2) Có yêu cầu hành động ngay không? (3) Có yêu cầu giữ bí mật không? (4) Có né gọi lại hoặc né kênh chính thức không? (5) Có dùng số/tài khoản/link mới không? (6) Có trả lời được các câu hỏi bất ngờ không? (7) Có thể xác minh qua số đã lưu hoặc người thứ ba đáng tin không?',
            'Nếu nhiều câu trả lời đều đáng lo, đây là dấu hiệu mạnh cần dừng lại và xác minh qua kênh độc lập.',
          ], [
            'Giọng quen không đủ để xác minh danh tính — chỉ giọng kèm yêu cầu rủi ro mới cần xác minh.',
            'Bốn kịch bản phổ biến: người thân gặp nạn, sếp gấp, ngân hàng/cơ quan, tống tiền.',
            'Dấu hiệu mạnh nhất: yêu cầu không gọi lại và hành động ngay.',
          ]),
        ],
        checkpoint: checkpoint('3.2', [
          q('Trong thời đại deepvoice, khi nào cần xác minh dù giọng nghe quen thuộc?', ['Khi cuộc gọi yêu cầu điều rủi ro như chuyển tiền, OTP, mật khẩu hoặc cài app', 'Luôn luôn, mọi cuộc gọi đều cần xác minh', 'Chỉ khi giọng nghe khác hơn bình thường', 'Chỉ khi gọi từ số lạ'], 0),
          q('Dấu hiệu nào trong cuộc gọi đáng lo ngại nhất?', ['Yêu cầu không gọi lại kết hợp với yêu cầu chuyển tiền gấp', 'Giọng nói hơi nhỏ do mạng yếu', 'Người gọi hỏi thăm sức khỏe', 'Cuộc gọi vào buổi tối'], 0),
          q('Câu hỏi bất ngờ để xác minh danh tính có giới hạn nào?', ['Kẻ xấu có thể biết thông tin từ mạng xã hội hoặc tài khoản bị chiếm', 'Không có giới hạn, luôn hiệu quả 100%', 'Chỉ hiệu quả với người lạ', 'Chỉ dùng được qua cuộc gọi thoại, không dùng được qua video'], 0),
        ]),
      },
      {
        title: '3.3 Dấu hiệu ngữ cảnh',
        lessons: [
          lesson('3.3.0', 'Ngữ cảnh là gì và tại sao quan trọng?', [
            'Ngữ cảnh là mọi thứ xung quanh nội dung: ai gửi? Gửi qua kênh nào? Gửi khi nào? Nội dung muốn bạn tin điều gì? Nội dung muốn bạn làm gì? Có nguồn gốc rõ không? Có ai được lợi nếu bạn tin không? Ai có thể bị hại nếu bạn chia sẻ sai?',
            'Trong nhiều trường hợp, ngữ cảnh cho thấy rủi ro rõ hơn lỗi kỹ thuật. Ví dụ: một video người nổi tiếng kêu gọi đầu tư có thể trông rất thật. Nhưng nếu nó được đăng từ tài khoản mới lập, dẫn đến website lạ, hứa lợi nhuận cao và không xuất hiện trên kênh chính thức, thì rủi ro đã rất cao.',
            'Bạn không cần chứng minh video là deepfake mới có quyền từ chối bấm link.',
          ], null),
          lesson('3.3.1', 'Ai là người gửi? Nguồn ở đâu?', [
            'Hãy kiểm tra người gửi: tài khoản có phải chính thức không? Tên tài khoản có bị nhái không? Tài khoản có lịch sử hoạt động đáng tin không? Dấu hiệu tài khoản đáng nghi: mới tạo, ít lịch sử, tên gần giống tài khoản thật, dùng ký tự lạ để bắt chước tên, đột nhiên nhắn mượn tiền hoặc gửi link, né cuộc gọi xác minh.',
            'Về nguồn nội dung: nếu bạn chỉ thấy nội dung qua ảnh chụp màn hình, video tải lại hoặc tin nhắn chuyển tiếp, hãy cẩn thận. Nội dung càng xa nguồn gốc, càng dễ bị cắt, ghép, đổi chú thích, đăng sai thời gian hoặc thêm bình luận dẫn dắt. Hãy kiểm tra: có link bài gốc không? Bài gốc từ tài khoản nào? Có nguồn chính thức không? Có bản đầy đủ thay vì đoạn cắt ngắn không?',
          ], null),
          lesson('3.3.2', 'Nội dung muốn bạn làm gì? Bình luận có phải bằng chứng không?', [
            'Đây là câu hỏi rất mạnh: nội dung này đang muốn mình làm gì? Nếu nội dung chỉ muốn bạn xem một trò đùa rõ ràng, rủi ro có thể thấp. Nếu nội dung muốn bạn chuyển tiền, bấm link, cài app, gửi OTP, gửi mật khẩu, chia sẻ gấp, hay tấn công/bôi nhọ ai đó — thì rủi ro cao hơn nhiều. Nội dung càng thúc đẩy hành động mạnh, bạn càng cần kiểm chứng kỹ.',
            'Về bình luận: bình luận có thể giúp bạn tham khảo phản ứng của người khác, nhưng không phải bằng chứng chắc chắn. Một phần bình luận có thể là tài khoản giả, bình luận seeding, người bị cuốn theo cảm xúc, hoặc người cố tình dẫn dắt. Các câu như "Mình nhận tiền rồi" hay "Bạn mình cũng làm được" không đủ để xác minh.',
          ], null),
          lesson('3.3.3', 'Ai có thể bị hại? Checklist ngữ cảnh', [
            'Trước khi chia sẻ một nội dung nghi vấn, hãy hỏi: nếu nội dung này sai, ai có thể bị hại? Có thể là người bị mạo danh, nạn nhân trong hình ảnh nhạy cảm, người bị vu khống, gia đình của người liên quan, người chuyển tiền theo lời kêu gọi, hoặc chính bạn nếu chia sẻ nội dung vi phạm. Câu hỏi này giúp bạn chuyển từ tâm lý "xem cho biết" sang trách nhiệm số.',
            'Đặc biệt với hình ảnh nhạy cảm: không biết thật giả không phải lý do để lưu, gửi tiếp hoặc bình luận.',
            'Checklist ngữ cảnh — trước khi tin, chia sẻ hoặc hành động, hãy hỏi: (1) Ai gửi và có đáng tin không? (2) Nội dung có nguồn gốc rõ không? (3) Có nguồn chính thức xác nhận không? (4) Nội dung có yêu cầu tiền, OTP, cài app hoặc bấm link không? (5) Nội dung có tạo áp lực khẩn cấp, sợ hãi hoặc phẫn nộ không? (6) Ai có thể bị hại nếu nội dung sai? (7) Hành động an toàn nhất bây giờ là gì?',
          ], [
            'Ngữ cảnh thường quan trọng hơn lỗi kỹ thuật — không cần chứng minh deepfake để từ chối hành động.',
            'Câu hỏi mạnh nhất: nội dung này đang muốn mình làm gì?',
            'Bình luận tích cực không phải bằng chứng — có thể là seeding hoặc tài khoản giả.',
          ]),
        ],
        checkpoint: checkpoint('3.3', [
          q('Tại sao ngữ cảnh thường quan trọng hơn lỗi kỹ thuật?', ['Nhiều nội dung giả không có lỗi kỹ thuật rõ ràng — ngữ cảnh tiết lộ rủi ro sớm hơn', 'Lỗi kỹ thuật luôn dễ thấy bằng mắt thường', 'Ngữ cảnh không liên quan đến deepfake', 'Chỉ chuyên gia mới phân tích được lỗi kỹ thuật'], 0),
          q('Bình luận tích cực dưới video đầu tư có phải bằng chứng tin cậy không?', ['Không — có thể là seeding hoặc tài khoản giả', 'Có — nhiều người tin là đáng tin', 'Có nếu trên 500 bình luận', 'Tùy thuộc vào nền tảng đăng'], 0),
          q('Câu hỏi quan trọng nhất khi gặp nội dung nghi vấn là gì?', ['Nội dung này đang muốn mình làm gì?', 'Video có độ phân giải cao không?', 'Người đăng có nhiều follower không?', 'Bao nhiêu người đã chia sẻ?'], 0),
        ]),
      },
      {
        title: '3.4 Thực hành: Checklist 3 lớp',
        lessons: [
          lesson('3.4.0', 'Hướng dẫn thực hành', [
            'Trong phần thực hành này, bạn sẽ áp dụng checklist 3 lớp vào 3 tình huống mô phỏng. Với mỗi tình huống, hãy điền: (1) Hình ảnh/video — có dấu hiệu gì cần chú ý? (2) Âm thanh/giọng nói — có dấu hiệu gì cần chú ý? (3) Ngữ cảnh/hành vi — nội dung đang yêu cầu gì? ai gửi? rủi ro là gì? (4) Kết luận tạm thời — tin, không tin, hay chưa đủ dữ liệu? (5) Hành động an toàn — bạn sẽ làm gì tiếp?',
            'Câu cần nhớ: <em>Quan sát tốt là quan sát đủ ba lớp: nhìn gì, nghe gì, và tình huống đang đẩy mình làm gì.</em>',
          ], null),
          lesson('3.4.1', 'Tình huống 1: Video đầu tư người nổi tiếng', [
            'Tình huống: Bạn thấy một video người nổi tiếng nói về một ứng dụng đầu tư. Video trông khá thật. Tài khoản đăng không có dấu xác minh, tên gần giống tài khoản chính thức. Mô tả có link đăng ký. Bình luận có nhiều người nói đã nhận lợi nhuận.',
            'Hình ảnh/video: Chưa đủ dữ liệu; cần quan sát khẩu hình, ánh sáng, dấu hiệu chỉnh sửa nếu có. Âm thanh: Giọng giống chưa đủ để xác minh. Ngữ cảnh: Rủi ro cao vì đầu tư, link lạ, tài khoản không chính thức, bình luận có thể seeding.',
            'Kết luận tạm thời: Chưa đủ dữ liệu để tin; rủi ro cao. Hành động an toàn: Không bấm link, kiểm tra kênh chính thức của người nổi tiếng, tìm cảnh báo lừa đảo nếu có.',
          ], null),
          lesson('3.4.2', 'Tình huống 2: Tin nhắn thoại từ người thân', [
            'Tình huống: Bạn nhận tin nhắn thoại từ tài khoản của người thân. Giọng nói nghe giống, nhưng nội dung yêu cầu chuyển tiền ngay vào tài khoản tên người lạ. Người đó nhắn thêm: đừng gọi lại, đang rất rối.',
            'Hình ảnh/video: Không có. Âm thanh: Giọng giống nhưng là yêu cầu rủi ro cao. Ngữ cảnh: Chuyển tiền gấp, tài khoản lạ, yêu cầu không gọi lại — đây là kịch bản lừa đảo deepvoice điển hình.',
            'Kết luận tạm thời: Rủi ro cao. Hành động an toàn: Gọi số đã lưu, hỏi người thân khác, không chuyển tiền khi chưa xác minh qua kênh độc lập.',
          ], null),
          lesson('3.4.3', 'Tình huống 3: Hình ảnh trong nhóm lớp', [
            'Tình huống: Một hình ảnh nhạy cảm được chia sẻ trong nhóm lớp, kèm chú thích là của một bạn học. Một số người nói ảnh bị AI tạo, một số người nói thật. Không có nguồn rõ ràng.',
            'Hình ảnh/video: Không nên phân tích công khai hay phóng to lan truyền thêm. Âm thanh: Không có. Ngữ cảnh: Hình ảnh nhạy cảm, có nguy cơ xâm hại danh dự và bắt nạt — dù thật hay giả, rủi ro gây hại rất cao.',
            'Kết luận tạm thời: Rủi ro cao, không đủ dữ liệu để kết luận thật/giả. Hành động an toàn: Không lưu, không chuyển tiếp, báo cáo nền tảng hoặc nhà trường, hỗ trợ người bị hại. Lưu ý: không biết thật giả không phải lý do để lan truyền.',
          ], [
            'Tình huống 1: Ngữ cảnh đầu tư + tài khoản không chính thức = rủi ro cao dù video trông thật.',
            'Tình huống 2: Yêu cầu không gọi lại là dấu hiệu mạnh nhất của lừa đảo deepvoice.',
            'Tình huống 3: Hình ảnh nhạy cảm không rõ nguồn — không lan truyền, không phân tích công khai.',
          ]),
        ],
        checkpoint: checkpoint('3.4', [
          q('Trong tình huống video đầu tư, dấu hiệu ngữ cảnh nguy hiểm nhất là gì?', ['Tài khoản không chính thức kết hợp với link đăng ký và lời hứa lợi nhuận cao', 'Video có độ phân giải thấp', 'Người nổi tiếng nói chậm hơn bình thường', 'Bình luận dùng nhiều emoji'], 0),
          q('Với tình huống tin nhắn thoại yêu cầu chuyển tiền và đừng gọi lại, bước đầu tiên nên là gì?', ['Gọi lại số đã lưu hoặc liên hệ người thân khác để xác minh', 'Chuyển số tiền nhỏ trước để thử', 'Hỏi lại qua tin nhắn trong cùng tài khoản', 'Phân tích giọng nói bằng detector'], 0),
          q('Với hình ảnh nhạy cảm không rõ nguồn trong nhóm chat, hành động nào đúng nhất?', ['Không lưu, không chuyển tiếp, báo cáo và hỗ trợ người bị hại', 'Phân tích công khai để xác định thật giả', 'Chia sẻ rộng để cảnh báo mọi người', 'Chờ xác nhận thật giả trước khi hành động'], 0),
        ]),
      },
    ],
    quiz: [
      q('Module 3 dạy quan sát theo mấy lớp?', ['3 lớp: hình ảnh/video, âm thanh/giọng nói, ngữ cảnh/hành vi', '2 lớp: hình ảnh và âm thanh', '5 lớp: khuôn mặt, mắt, miệng, tay, nền', '1 lớp: kỹ thuật hình ảnh'], 0),
      q('Mục tiêu của quan sát hình ảnh là gì?', ['Tìm tín hiệu để quyết định có cần kiểm chứng thêm không', 'Kết luận ngay video là deepfake', 'Thay thế hoàn toàn việc kiểm tra nguồn', 'Xác nhận video thật bằng mắt thường'], 0),
      q('Tại sao video thật có thể trông lạ?', ['Vì nhiều yếu tố kỹ thuật như ánh sáng, mạng, nén video và bộ lọc', 'Vì người quay không biết làm video', 'Vì chỉ deepfake mới trông tự nhiên', 'Vì camera điện thoại luôn kém chất lượng'], 0),
      q('Khi nào cần xác minh dù giọng nghe giống người quen?', ['Khi cuộc gọi yêu cầu điều rủi ro như tiền, OTP hoặc giữ bí mật', 'Luôn luôn, mọi cuộc gọi đều cần xác minh', 'Chỉ khi gọi từ số lạ hoàn toàn', 'Chỉ khi cuộc gọi vào ban đêm'], 0),
      q('Câu hỏi mạnh nhất khi đánh giá ngữ cảnh là gì?', ['Nội dung này đang muốn mình làm gì?', 'Video có độ phân giải cao không?', 'Có bao nhiêu lượt xem?', 'Người đăng có nổi tiếng không?'], 0),
      q('Bình luận tích cực dưới video có phải bằng chứng đáng tin không?', ['Không — có thể là seeding, tài khoản giả hoặc người bị cuốn theo cảm xúc', 'Có — số đông không thể sai', 'Có nếu bình luận bằng tiếng Việt', 'Tùy thuộc vào số lượng bình luận'], 0),
      q('Khi thấy hình ảnh nhạy cảm không rõ nguồn trong nhóm chat, nên làm gì?', ['Không lưu, không chuyển tiếp, báo cáo và hỗ trợ người bị hại', 'Phân tích công khai để xác định thật giả', 'Chia sẻ để cảnh báo thêm nhiều người', 'Chờ xác nhận từ ban quản trị nhóm'], 0),
      q('Điều quan trọng nhất của Module 3 là gì?', ['Đừng chỉ hỏi nó có giả không — hãy hỏi nó có đủ đáng tin để mình hành động không', 'Luôn dùng detector deepfake trước khi tin bất kỳ video nào', 'Chỉ tin video từ nguồn chính thức 100%', 'Không bao giờ chia sẻ bất kỳ nội dung nào'], 0),
    ],
  },


  // ── MODULE 4 ─────────────────────────────────────────────────
  {
    id: 4, part: 'recognition',
    title: 'Quy trình Deepfense Check',
    duration: '115-125 phút', level: 'Intermediate',
    scenario: 'An đã học được nhiều điều: deepfake là gì, kẻ xấu dùng cảm xúc và áp lực như thế nào, cách quan sát hình ảnh và âm thanh. Nhưng khi nội dung thật sự xuất hiện trên màn hình, An vẫn bối rối. Một video đầu tư thì làm gì trước? Một cuộc gọi giống người thân thì kiểm tra thế nào? An cần một quy trình.',
    outcomes: [
      'Ghi nhớ và áp dụng quy trình 5 bước: Pause — Observe — Verify — Trace — Decide.',
      'Biết xác minh qua kênh độc lập trong các tình huống rủi ro.',
      'Biết truy nguồn cơ bản với hình ảnh, video, bài đăng và tài khoản.',
      'Biết dùng công cụ kiểm chứng ở mức phổ thông và hiểu giới hạn của chúng.',
    ],
    sections: [
      {
        title: '4.0 Câu chuyện dẫn nhập',
        lessons: [
          lesson('4.0.0', 'An cần một quy trình', [
            'Đến lúc này, An đã học được khá nhiều điều. An biết deepfake là gì. An biết kẻ xấu thường dùng cảm xúc và áp lực. An biết cách quan sát hình ảnh, âm thanh và ngữ cảnh. An cũng biết rằng mắt thường và công cụ phát hiện đều có giới hạn.',
            'Nhưng khi nội dung thật sự xuất hiện trên màn hình, An vẫn có thể bối rối. Một video đầu tư thì cần làm gì trước? Một cuộc gọi giống người thân thì kiểm tra thế nào? Một hình ảnh trong nhóm lớp thì có nên phân tích không? Một clip xã hội gây phẫn nộ thì có nên chia sẻ để cảnh báo không?',
            'Kiến thức rời rạc chưa đủ. An cần một quy trình. Một quy trình tốt giúp bạn không phải nghĩ lại từ đầu trong từng tình huống. Nó giống như dây an toàn: bạn dùng trước khi tai nạn xảy ra, không phải sau đó mới tìm.',
          ], null),
          lesson('4.0.1', 'Deepfense Check: 5 bước tổng quan', [
            'Trong DEEPFENSE BASIC, quy trình kiểm chứng cốt lõi là Deepfense Check, gồm 5 bước: (1) Pause — Dừng lại. (2) Observe — Quan sát. (3) Verify — Xác minh. (4) Trace — Truy nguồn. (5) Decide — Quyết định.',
            'Năm bước này không biến bạn thành chuyên gia pháp y số. Nhưng chúng giúp bạn trở thành người dùng Internet khó bị kéo đi bởi cảm xúc, áp lực và nội dung giả mạo.',
            'Module 4 sẽ đi sâu vào từng bước, giải thích kênh độc lập là gì, hướng dẫn các công cụ kiểm chứng phổ thông, và cho bạn thực hành qua các hồ sơ tình huống thực tế.',
          ], null),
        ],
        checkpoint: null,
      },
      {
        title: '4.1 Quy trình 5 bước Deepfense Check',
        lessons: [
          lesson('4.1.0', 'Bước 1 — Pause: Dừng lại', [
            'Pause là bước đơn giản nhất, nhưng thường khó nhất. Pause nghĩa là bạn tạm dừng trước khi: chuyển tiền, bấm link, gửi OTP, cài ứng dụng, chia sẻ bài đăng, bình luận tấn công ai đó, lưu hoặc chuyển tiếp hình ảnh nhạy cảm, hay tin một kết luận gây sốc.',
            'Pause không có nghĩa là bạn thờ ơ. Pause có nghĩa là bạn không để người khác điều khiển tốc độ phản ứng của mình. Hãy Pause ngay khi nội dung gây sợ hãi, gây phẫn nộ, khiến bạn thương hại và muốn giúp ngay, hứa lợi ích quá tốt, yêu cầu hành động gấp, hoặc liên quan đến tiền, tài khoản, danh dự, pháp lý hoặc an toàn.',
            'Câu lệnh tự nhắc: <em>Dừng 30 giây trước khi làm điều không thể rút lại.</em> Khi An nhận cuộc gọi giống Minh Anh yêu cầu chuyển tiền, việc đầu tiên không phải là phân tích khuôn mặt — việc đầu tiên là dừng lại. Nếu An không dừng, các bước sau không có cơ hội xảy ra.',
          ], null),
          lesson('4.1.1', 'Bước 2 — Observe: Quan sát', [
            'Observe nghĩa là xem xét nội dung theo ba lớp: (1) Hình ảnh/video, (2) Âm thanh/giọng nói, (3) Ngữ cảnh/hành vi. Bạn đã học ba lớp này ở Module 3. Trong bước Observe, bạn không cố kết luận ngay — bạn chỉ thu thập tín hiệu.',
            'Với hình ảnh/video: khuôn mặt, miệng, mắt, ánh sáng, tay, nền có gì lạ không? Video có bị cắt quá ngắn không? Với âm thanh: giọng có tự nhiên không? Có né trả lời câu hỏi bất ngờ không? Với ngữ cảnh: ai gửi? Gửi từ tài khoản nào? Nội dung muốn mình làm gì? Có link lạ, yêu cầu OTP hoặc chuyển tiền không?',
            'Bốn lỗi phổ biến khi Observe: (1) Chỉ nhìn mặt, quên nhìn nguồn. (2) Thấy một lỗi kỹ thuật rồi kết luận ngay là giả. (3) Không thấy lỗi kỹ thuật rồi tin ngay là thật. (4) Quên rằng ngữ cảnh có thể nguy hiểm hơn hình ảnh. Câu lệnh tự nhắc: <em>Quan sát để tìm tín hiệu, không phải để phán quyết vội.</em>',
          ], null),
          lesson('4.1.2', 'Bước 3 — Verify: Xác minh', [
            'Verify nghĩa là kiểm tra thông tin bằng một kênh đáng tin hơn hoặc độc lập hơn. Đây là bước quan trọng nhất trong các tình huống liên quan đến người quen, tiền bạc, tài khoản, OTP hoặc danh dự cá nhân.',
            'Xác minh không phải là hỏi lại trong cùng kênh đang nghi vấn. Nếu một tài khoản đang bị nghi mạo danh nhắn tin mượn tiền, hỏi lại chính tài khoản đó không đủ an toàn — vì nếu kẻ xấu đang điều khiển tài khoản, chúng sẽ trả lời ngay rằng đúng rồi.',
            'Xác minh tốt hơn là dùng kênh độc lập: gọi số điện thoại đã lưu từ trước, gọi người thân khác, kiểm tra website chính thức, gọi tổng đài chính thức tự tìm từ nguồn đáng tin, hỏi trực tiếp nếu có thể. Câu lệnh tự nhắc: <em>Xác minh bằng kênh mình đã biết, không phải kênh kẻ nghi vấn vừa đưa.</em>',
          ], null),
          lesson('4.1.3', 'Bước 4 — Trace: Truy nguồn', [
            'Trace nghĩa là tìm nguồn gốc và bối cảnh của nội dung. Bước này đặc biệt hữu ích với: video gây phẫn nộ, ảnh sự kiện, bài đăng lan truyền, lời kêu gọi đầu tư, ảnh chụp màn hình, nội dung liên quan người nổi tiếng, xã hội, chính trị, thiên tai, tai nạn.',
            'Truy nguồn là hỏi: Nội dung này xuất hiện lần đầu ở đâu? Ai đăng đầu tiên? Đăng khi nào? Có bản đầy đủ không? Có nguồn chính thức không? Có dấu hiệu bị đăng lại từ sự kiện cũ không? Có bị cắt khỏi bối cảnh không?',
            'Ví dụ: Một clip ghi "vừa xảy ra hôm nay" có thể đã xuất hiện từ nhiều năm trước. Một câu nói gây sốc có thể được cắt từ bài phát biểu dài. Một ảnh hiện trường có thể là ảnh AI hoặc ảnh từ quốc gia khác. Trace giúp bạn phát hiện các trường hợp nội dung thật nhưng chú thích sai. Câu lệnh tự nhắc: <em>Trước khi tin câu chuyện đi kèm, hãy tìm nguồn của nội dung.</em>',
          ], null),
          lesson('4.1.4', 'Bước 5 — Decide: Quyết định', [
            'Decide nghĩa là chọn hành động an toàn dựa trên những gì bạn đã quan sát, xác minh và truy nguồn. Kết quả không nhất thiết phải là "thật" hoặc "giả". Bạn có thể quyết định: tin ở mức thận trọng, chưa đủ dữ liệu, không chia sẻ, không chuyển tiền, không bấm link, báo cáo nội dung, cảnh báo người thân, lưu bằng chứng.',
            'Ba mức quyết định: Mức 1 — Rủi ro thấp: nội dung rõ ràng là minh họa, parody hoặc có nguồn minh bạch. Mức 2 — Chưa đủ dữ liệu: không có đủ cơ sở để tin hoặc bác bỏ, hành động an toàn là không chia sẻ và kiểm chứng thêm. Mức 3 — Rủi ro cao: nội dung yêu cầu tiền, OTP, mật khẩu, cài app, lan truyền hình ảnh nhạy cảm, hoặc kích động hành động gây hại.',
            'Câu lệnh tự nhắc: <em>Không cần biết chắc 100% mới được chọn phương án an toàn.</em>',
          ], null),
          lesson('4.1.5', 'Tóm tắt Deepfense Check và lưu ý thực tế', [
            'Bảng tóm tắt 5 bước: Pause — Nội dung có đang đẩy mình hành động nhanh không? Dừng lại trước khi bấm, chuyển, gửi, chia sẻ. Observe — Mình thấy/nghe/đọc được tín hiệu gì? Quan sát hình ảnh, âm thanh, ngữ cảnh. Verify — Có kênh độc lập nào để xác minh không? Gọi số đã lưu, kiểm tra kênh chính thức. Trace — Nguồn gốc nội dung ở đâu? Tìm bài gốc, nguồn đầu tiên, bản đầy đủ. Decide — Hành động an toàn nhất là gì? Không chia sẻ, báo cáo, lưu bằng chứng.',
            'Lưu ý quan trọng: Không phải tình huống nào cũng cần đủ 5 bước theo thứ tự cứng nhắc. Nếu ai đó yêu cầu OTP, bạn có thể quyết định ngay: không gửi. Nếu một video người nổi tiếng quảng cáo đầu tư, bạn cần Pause, Observe, Verify và Trace trước khi Decide. Nếu tin nhắn từ người thân yêu cầu chuyển tiền, Verify có thể quan trọng hơn Trace.',
            'Quy trình là bản đồ, không phải cái còng tay. Mục tiêu là giúp bạn không bỏ qua bước quan trọng nhất trong từng tình huống.',
          ], [
            'Deepfense Check: Pause → Observe → Verify → Trace → Decide.',
            'Pause là bước khó nhất vì cảm xúc và áp lực luôn muốn bạn hành động ngay.',
            'Decide không cần chắc 100% thật/giả — chỉ cần chọn hành động an toàn nhất.',
          ]),
        ],
        checkpoint: checkpoint('4.1', [
          q('Thứ tự đúng của Deepfense Check là gì?', ['Pause — Observe — Verify — Trace — Decide', 'Decide — Trace — Verify — Observe — Pause', 'Observe — Share — Believe — Delete — Decide', 'Trace — Pay — Verify — Pause — Share'], 0),
          q('Mục tiêu chính của bước Pause là gì?', ['Không để cảm xúc và áp lực khiến bạn hành động vội', 'Kéo dài thời gian cho vui', 'Kết luận nội dung là giả', 'Tìm lỗi trong khuôn mặt'], 0),
          q('Trong bước Observe, điều nào đúng?', ['Quan sát hình ảnh/video, âm thanh và ngữ cảnh', 'Chỉ cần nhìn mặt', 'Chỉ cần nghe giọng', 'Không cần xem người gửi'], 0),
          q('Một tài khoản quen nhắn mượn tiền. Cách Verify an toàn nhất là gì?', ['Gọi số điện thoại đã lưu từ trước hoặc dùng kênh độc lập đã biết', 'Hỏi lại trong cùng tài khoản đang nhắn', 'Chuyển khoản nhỏ trước để thử', 'Tin vì ảnh đại diện đúng'], 0),
          q('Trace đặc biệt hữu ích trong tình huống nào?', ['Kiểm tra nguồn gốc một video lan truyền gây phẫn nộ', 'Gửi OTP cho ngân hàng', 'Đổi hình nền điện thoại', 'Chọn nhạc chuông'], 0),
          q('Nếu một nội dung yêu cầu OTP, bạn nên quyết định thế nào?', ['Không gửi OTP qua cuộc gọi hoặc tin nhắn', 'Gửi nếu giọng nói giống người quen', 'Gửi nếu người gọi nói gấp', 'Gửi một nửa mã'], 0),
          q('Câu nào thể hiện đúng tinh thần Decide?', ['Nếu rủi ro cao, có thể chọn không hành động dù chưa chứng minh được deepfake', 'Phải biết chắc 100% thật/giả mới được hành động an toàn', 'Nếu video trông thật thì luôn chia sẻ được', 'Nếu nhiều người bình luận tích cực thì không cần kiểm chứng'], 0),
          q('Kênh nào KHÔNG phải kênh độc lập an toàn?', ['Link do người đang yêu cầu chuyển tiền vừa gửi', 'Số điện thoại đã lưu từ trước', 'Website chính thức tự tìm từ nguồn đáng tin', 'Người thân khác mà bạn đã biết'], 0),
          q('Một hình ảnh nhạy cảm nghi là của bạn học xuất hiện trong nhóm chat. Bạn nên làm gì?', ['Không lan truyền, báo cáo và tìm người có trách nhiệm hỗ trợ', 'Lưu lại và gửi cho nhiều người để hỏi thật giả', 'Bình luận đùa nếu có thể là ảnh AI', 'Phóng to phân tích công khai'], 0),
          q('Điều nào đúng nhất về Deepfense Check?', ['Là quy trình giúp giảm rủi ro khi gặp nội dung nghi vấn', 'Là công cụ đảm bảo phát hiện mọi deepfake', 'Chỉ dùng cho chuyên gia công nghệ', 'Chỉ dùng khi có video, không dùng cho âm thanh hoặc tin nhắn'], 0),
        ]),
      },
      {
        title: '4.2 Kênh độc lập là gì?',
        lessons: [
          lesson('4.2.0', 'Vì sao cần kênh độc lập?', [
            'Khi một kênh đang bị nghi vấn, bạn không nên dùng chính kênh đó làm bằng chứng duy nhất. Ví dụ: bạn nhận tin nhắn từ tài khoản Facebook của bạn thân nhắn mượn tiền gấp. Nếu bạn hỏi lại trong cùng cuộc chat và nhận được câu xác nhận, bạn vẫn chưa xác minh được.',
            'Vì nếu tài khoản đã bị chiếm quyền, kẻ xấu cũng đang đọc và trả lời tin nhắn đó. Kênh độc lập giúp bạn thoát khỏi vùng mà kẻ xấu có thể kiểm soát.',
            'Đây là lý do tại sao Verify yêu cầu một kênh khác — không phải kênh đang bị nghi vấn.',
          ], null),
          lesson('4.2.1', 'Kênh độc lập tốt là gì?', [
            'Một kênh độc lập tốt thường có 3 đặc điểm: (1) Bạn đã biết nó từ trước. (2) Nó không được cung cấp bởi người đang bị nghi vấn trong lúc khẩn cấp. (3) Nó cho phép bạn xác minh với người thật, tổ chức thật hoặc nguồn chính thức.',
            'Ví dụ kênh độc lập tốt: số điện thoại người thân đã lưu từ lâu, gặp trực tiếp, gọi người thân khác, email nội bộ công ty đã biết, hệ thống phê duyệt chuyển khoản của công ty, website chính thức tự tìm qua nguồn đáng tin, tổng đài ngân hàng lấy từ thẻ hoặc app chính thức.',
            'Kênh mạng xã hội có dấu xác minh và lịch sử rõ ràng cũng có thể là kênh độc lập — nhưng chỉ khi bạn tự tìm đến, không phải click từ link do người nghi vấn gửi.',
          ], null),
          lesson('4.2.2', 'Kênh không nên tin ngay', [
            'Hãy cẩn trọng với: số điện thoại mới được gửi trong tin nhắn khẩn cấp, link xác minh do người lạ gửi, website có tên miền gần giống trang thật, tài khoản mới lập, tài khoản quen nhưng hành vi bất thường, ảnh chụp màn hình không có link gốc, mã QR không rõ nguồn, file cài đặt gửi qua chat, nhóm chat vừa được tạo để xử lý việc gấp.',
            'Những kênh này không phải lúc nào cũng xấu. Nhưng chúng không nên là cơ sở duy nhất để bạn chuyển tiền, gửi OTP hoặc chia sẻ thông tin nhạy cảm.',
          ], null),
          lesson('4.2.3', 'Family code — mật khẩu gia đình', [
            'Một cách đơn giản để phòng trường hợp giả giọng người thân là tạo family code: một câu hoặc từ khóa bí mật chỉ các thành viên thân thiết biết, dùng trong tình huống khẩn cấp để xác minh nhanh. Ví dụ: một câu hỏi riêng mà người ngoài khó biết, một cụm từ gia đình tự đặt, hoặc một quy tắc gọi lại trước khi chuyển tiền.',
            'Family code nên: dễ nhớ với người trong gia đình, không đăng lên mạng, không dựa vào thông tin công khai như ngày sinh hay tên thú cưng đã đăng, và được cập nhật nếu nghi đã lộ.',
            'Lưu ý: Family code hữu ích nhưng không thay thế hoàn toàn kênh độc lập. Nếu tình huống liên quan đến tiền lớn hoặc rủi ro an toàn, vẫn nên gọi lại bằng số đã lưu hoặc xác minh qua người thân khác.',
          ], null),
          lesson('4.2.4', 'Quy tắc xác minh cho công việc và trường học', [
            'Trong công việc và trường học, xác minh không nên phụ thuộc vào cảm giác cá nhân. Nên có quy trình rõ: yêu cầu chuyển tiền phải qua kênh phê duyệt chính thức, yêu cầu thay đổi tài khoản nhận tiền phải xác minh bằng cuộc gọi hoặc văn bản chính thức, yêu cầu dữ liệu nhạy cảm phải có người phụ trách xác nhận.',
            'Trong trường học: giáo viên và học sinh không xử lý hình ảnh nhạy cảm trong nhóm chat công khai. Khi có nội dung nghi xâm hại, ưu tiên báo người có trách nhiệm và giảm lan truyền.',
            'Nếu một sếp hoặc giáo viên yêu cầu bỏ qua quy trình vì đang gấp, đó là dấu hiệu cần cảnh giác — không phải lý do để tuân theo. Kẻ tấn công thường dùng áp lực thời gian để vô hiệu hóa quy trình xác minh.',
          ], [
            'Kênh độc lập là kênh bạn đã biết từ trước — không phải kênh do người nghi vấn vừa cung cấp.',
            'Family code là lớp xác minh nhanh cho gia đình, không thay thế kênh độc lập trong rủi ro lớn.',
            'Áp lực gấp là dấu hiệu cảnh giác, không phải lý do để bỏ qua quy trình xác minh.',
          ]),
        ],
        checkpoint: null,
      },
      {
        title: '4.3 Công cụ kiểm chứng cơ bản',
        lessons: [
          lesson('4.3.0', 'Nguyên tắc trước khi dùng công cụ', [
            'Công cụ kiểm chứng có thể hữu ích, nhưng trước khi dùng hãy nhớ: (1) Không tải lên hình ảnh nhạy cảm của người khác vào công cụ lạ. (2) Không tải lên giấy tờ cá nhân, ảnh riêng tư, dữ liệu công ty hoặc thông tin mật. (3) Không tin tuyệt đối vào một kết quả tự động. (4) Không cài extension hoặc app lạ chỉ vì một bài viết hướng dẫn. (5) Ưu tiên công cụ và nguồn có uy tín.',
            'Với nội dung nghi xâm hại, mục tiêu đầu tiên là giảm lan truyền và báo cáo an toàn — không phải phân tích công khai.',
            'Câu cần nhớ: <em>Kiểm chứng không được tạo thêm rủi ro cho nạn nhân hoặc chính bạn.</em>',
          ], null),
          lesson('4.3.1', 'Reverse image search — tìm kiếm ngược bằng hình ảnh', [
            'Reverse image search là tìm kiếm ngược bằng hình ảnh: thay vì nhập từ khóa, bạn dùng một hình ảnh để tìm xem nó đã từng xuất hiện ở đâu. Phương pháp này hữu ích khi bạn muốn biết: ảnh có cũ không, ảnh có bị gán sai địa điểm không, ảnh đại diện có bị lấy từ nơi khác không.',
            'Các bước cơ bản: (1) Lưu ảnh hoặc chụp màn hình phần cần kiểm tra. (2) Dùng tính năng tìm kiếm bằng hình ảnh trên các công cụ tìm kiếm phổ biến. (3) Xem các kết quả cũ hơn. (4) So sánh ngày đăng, nguồn đăng và bối cảnh. (5) Không chỉ xem một kết quả đầu tiên; hãy so sánh nhiều nguồn.',
            'Giới hạn: Reverse image search có thể không tìm được nếu ảnh mới hoàn toàn, đã bị cắt/làm mờ/lật ngang, hoặc là ảnh AI chưa từng xuất hiện trước đó. Vì vậy, không tìm thấy kết quả không có nghĩa là ảnh thật.',
          ], null),
          lesson('4.3.2', 'Cắt frame từ video để truy nguồn', [
            'Video khó tìm kiếm hơn ảnh, nhưng bạn có thể kiểm tra bằng cách lấy một hoặc vài khung hình đặc trưng: khung hình có mặt người, có bảng hiệu, có địa điểm, có logo, hoặc có vật thể đặc biệt. Sau đó dùng reverse image search với khung hình đó.',
            'Cách làm: (1) Tạm dừng video tại một khung hình rõ. (2) Chụp màn hình. (3) Cắt bớt phần giao diện nền tảng nếu cần. (4) Tìm kiếm bằng hình ảnh. (5) So sánh kết quả với chú thích hiện tại.',
            'Ví dụ: Một video được đăng với chú thích "Vụ việc vừa xảy ra tối nay" — nhưng khi tìm khung hình, bạn thấy video đã xuất hiện từ 2 năm trước ở một quốc gia khác. Khi đó vấn đề có thể không phải deepfake — mà là sai bối cảnh.',
          ], null),
          lesson('4.3.3', 'Kiểm tra kênh chính thức và tài khoản nhái', [
            'Với người nổi tiếng, cơ quan, trường học, ngân hàng hoặc doanh nghiệp, hãy kiểm tra kênh chính thức: Nội dung này có trên website chính thức không? Có trên fanpage hoặc kênh đã xác minh không? Có thông báo từ app chính thức không? Có báo chí uy tín hoặc nguồn độc lập xác nhận không?',
            'Tài khoản nhái có thể: dùng ảnh đại diện giống, dùng tên gần giống, thêm dấu chấm hoặc ký tự lạ, mua tương tác hoặc bình luận, ghim bài viết giả tạo uy tín.',
            'Nếu một video đầu tư chỉ xuất hiện ở tài khoản lạ mà không có trên kênh chính thức, rủi ro rất cao — dù khuôn mặt và giọng nói trong video trông có vẻ thật đến đâu.',
          ], null),
          lesson('4.3.4', 'Kiểm tra website, đường link và metadata', [
            'Nhiều vụ lừa đảo dùng website giả. Hãy chú ý: tên miền có gần giống trang thật không, có ký tự lạ không, có yêu cầu đăng nhập hoặc OTP không. Nguyên tắc: không đăng nhập tài khoản quan trọng qua link được gửi trong tin nhắn nghi vấn. Nếu cần kiểm tra ngân hàng, hãy tự mở app chính thức hoặc tự nhập địa chỉ website đã biết.',
            'Một số nội dung số có thể chứa metadata: thông tin về thời gian tạo, thiết bị, phần mềm hoặc quá trình chỉnh sửa. Nếu một nội dung có thông tin provenance rõ ràng, đó là tín hiệu tốt. Nhưng nếu không có metadata, không thể kết luận ngay là giả — vì metadata có thể bị xóa khi đăng lên mạng xã hội hoặc khi chụp màn hình.',
            'Provenance là một lớp hỗ trợ niềm tin, không phải phép màu.',
          ], null),
          lesson('4.3.5', 'Detector deepfake — dùng như thế nào cho đúng?', [
            'Detector là công cụ cố gắng phát hiện nội dung do AI tạo hoặc bị chỉnh sửa. Nên dùng detector như thế nào: dùng như một tín hiệu phụ, đọc kỹ mức độ chắc chắn và giới hạn của công cụ, không tải nội dung nhạy cảm lên công cụ không rõ chính sách dữ liệu, kết hợp với nguồn, ngữ cảnh và xác minh độc lập.',
            'Không nên dùng detector như thế nào: không xem "AI 90%" là phán quyết cuối cùng, không xem "không phát hiện AI" là chứng nhận thật, không dùng để phân tích hình ảnh nhạy cảm của người khác trong nhóm chat.',
            'Câu cần nhớ: <em>Detector có thể giúp bạn nghi ngờ có cơ sở hơn, nhưng không thay bạn chịu trách nhiệm cho quyết định.</em>',
          ], [
            'Reverse image search giúp phát hiện ảnh cũ bị gán sai bối cảnh — nhưng không tìm thấy không có nghĩa là thật.',
            'Kiểm tra kênh chính thức: nếu nội dung không xuất hiện trên kênh chính thức, rủi ro rất cao.',
            'Detector deepfake chỉ là tín hiệu hỗ trợ, không phải phán quyết cuối cùng.',
          ]),
        ],
        checkpoint: checkpoint('4.3', [
          q('Reverse image search không thể phát hiện điều gì?', ['Ảnh AI hoàn toàn mới chưa từng xuất hiện trước đó', 'Ảnh bị lấy từ sự kiện cũ', 'Ảnh bị gán sai địa điểm', 'Ảnh đại diện bị lấy từ nơi khác'], 0),
          q('Khi nghi ngờ một tài khoản mạo danh người nổi tiếng, bước kiểm tra đầu tiên nên là gì?', ['Tìm kênh chính thức của người đó và xem có cùng nội dung không', 'Bấm vào link trong video để xem sản phẩm', 'Hỏi bình luận trong video', 'Dùng detector deepfake ngay'], 0),
          q('Điều nào đúng về detector deepfake?', ['Kết quả là tín hiệu hỗ trợ, không phải phán quyết cuối cùng', 'Kết quả AI 90% chứng minh chắc chắn nội dung là giả', 'Không phát hiện AI nghĩa là nội dung thật 100%', 'Nên dùng để phân tích hình ảnh nhạy cảm trong nhóm chat'], 0),
        ]),
      },
      {
        title: '4.4 Thực hành: Deepfense Check',
        lessons: [
          lesson('4.4.0', 'Hướng dẫn điền mẫu Deepfense Check', [
            'Trong phần thực hành này, bạn sẽ áp dụng quy trình Pause — Observe — Verify — Trace — Decide vào 3 hồ sơ tình huống thực tế. Với mỗi hồ sơ, hãy suy nghĩ: Điều gì khiến bạn cần Pause? Bạn Observe được tín hiệu gì? Bạn sẽ Verify qua kênh nào? Bạn sẽ Trace nguồn gì? Hành động Decide an toàn nhất là gì?',
            'Không phải hồ sơ nào cũng cần tất cả các bước ở mức độ như nhau. Hãy chọn bước phù hợp với rủi ro của từng tình huống.',
            'Câu cần nhớ: <em>Một quy trình tốt không cần làm bạn chậm mãi. Nó chỉ cần làm bạn chậm đúng lúc.</em>',
          ], null),
          lesson('4.4.1', 'Hồ sơ 1: Người nổi tiếng và ứng dụng đầu tư', [
            'Tình huống: Bạn thấy một video người nổi tiếng nói rằng đang dùng một ứng dụng đầu tư. Video được đăng bởi tài khoản tên gần giống tài khoản chính thức. Mô tả có link đăng ký. Bình luận rất tích cực. Kênh chính thức của người nổi tiếng không có video này.',
            'Phân tích: Pause — nội dung liên quan đến đầu tư, tiền, link đăng ký và người nổi tiếng. Observe — tài khoản không chính thức, lời hứa tài chính, bình luận có thể là seeding. Verify — kiểm tra kênh chính thức của người nổi tiếng, nguồn báo chí uy tín. Trace — tìm video gốc, kiểm tra tài khoản đăng đầu tiên, kiểm tra tên miền của link.',
            'Decide: Không bấm link, không chuyển tiền, không đăng ký. Cảnh báo người thân nếu họ đang định tham gia. Đây là kịch bản lừa đảo đầu tư deepfake phổ biến nhất hiện nay tại Việt Nam.',
          ], null),
          lesson('4.4.2', 'Hồ sơ 2: Tin nhắn thoại từ người thân', [
            'Tình huống: Tài khoản của người thân gửi tin nhắn thoại nghe giống giọng thật: "Chuyển giúp 3 triệu vào tài khoản này ngay, đừng gọi lại, đang rối lắm." Số tài khoản nhận tiền là tên người lạ.',
            'Phân tích: Pause — có yêu cầu chuyển tiền gấp và yêu cầu không gọi lại — đây là hai dấu hiệu áp lực cổ điển. Observe — giọng giống nhưng hành vi bất thường; tài khoản nhận tiền lạ; có dấu hiệu cô lập (đừng gọi lại). Verify — gọi số điện thoại đã lưu, gọi người thân khác, dùng family code nếu có.',
            'Decide: Không chuyển tiền khi chưa xác minh qua kênh độc lập. Lưu ý: yêu cầu không gọi lại là dấu hiệu rất mạnh của lừa đảo — người thân thật không cần bạn tránh xác minh.',
          ], null),
          lesson('4.4.3', 'Hồ sơ 3: Clip gây phẫn nộ trong nhóm chat', [
            'Tình huống: Một clip 12 giây được chia sẻ trong nhóm chat với chú thích "Vừa xảy ra ở gần trường mình, chia sẻ để mọi người biết." Clip gây phẫn nộ. Không có link gốc. Có người trong nhóm kêu gọi tìm danh tính người trong clip.',
            'Phân tích: Pause — nội dung gây phẫn nộ, kêu gọi chia sẻ và có nguy cơ làm hại người trong clip. Observe — clip rất ngắn, thiếu bối cảnh, không có nguồn gốc rõ, có lời kêu gọi hành động tập thể. Trace — tìm nguồn đầu tiên, kiểm tra clip có cũ hoặc sai địa điểm không.',
            'Decide: Không chia sẻ thêm, không truy tìm hoặc bêu tên cá nhân, báo người có trách nhiệm nếu có rủi ro thật. Lưu ý quan trọng: dù clip thật hay deepfake, lan truyền và truy tìm danh tính đều có thể gây hại nghiêm trọng cho nạn nhân.',
          ], [
            'Hồ sơ 1: Video đầu tư người nổi tiếng trên tài khoản không chính thức — không bấm link, không chuyển tiền.',
            'Hồ sơ 2: Yêu cầu không gọi lại là dấu hiệu lừa đảo mạnh — luôn xác minh qua kênh độc lập.',
            'Hồ sơ 3: Clip ngắn gây phẫn nộ không rõ nguồn — không chia sẻ, không truy tìm danh tính.',
          ]),
        ],
        checkpoint: checkpoint('4.4', [
          q('Trong Hồ sơ 1, dấu hiệu nghi vấn quan trọng nhất là gì?', ['Video chỉ xuất hiện ở tài khoản không chính thức, không có trên kênh chính thức', 'Bình luận quá tích cực', 'Video có chất lượng cao', 'Người nổi tiếng nói chậm'], 0),
          q('Trong Hồ sơ 2, tại sao yêu cầu đừng gọi lại là dấu hiệu cảnh giác mạnh?', ['Người thân thật không cần bạn tránh xác minh — chỉ kẻ xấu mới muốn bạn không kiểm tra', 'Vì gọi lại tốn tiền', 'Vì người thân đang bận', 'Vì cuộc gọi có thể bị nghe lén'], 0),
          q('Trong Hồ sơ 3, tại sao không nên chia sẻ hoặc truy tìm danh tính ngay cả khi nghi là deepfake?', ['Dù thật hay giả, hành động đó vẫn có thể gây hại nghiêm trọng cho người trong clip', 'Vì deepfake không vi phạm pháp luật', 'Vì chỉ nên chia sẻ khi clip đã xác nhận là thật', 'Vì truy tìm danh tính cần kỹ năng chuyên gia'], 0),
        ]),
      },
    ],
    quiz: [
      q('Deepfense Check gồm mấy bước và theo thứ tự nào?', ['5 bước: Pause — Observe — Verify — Trace — Decide', '3 bước: Stop — Check — Share', '4 bước: Scan — Analyze — Report — Delete', '5 bước: Detect — Verify — Block — Report — Ignore'], 0),
      q('Khi nào cần Pause ngay lập tức?', ['Khi nội dung yêu cầu hành động gấp liên quan đến tiền, OTP hoặc chia sẻ', 'Khi video có độ phân giải thấp', 'Khi người gửi là người lạ hoàn toàn', 'Chỉ khi nội dung bằng tiếng nước ngoài'], 0),
      q('Kênh độc lập an toàn nhất để Verify là gì?', ['Số điện thoại người thân đã lưu từ trước — không phải kênh do người nghi vấn vừa cung cấp', 'Link do người đang nhắn tin vừa gửi', 'Hỏi lại ngay trong cùng cuộc chat', 'Bình luận công khai trong video'], 0),
      q('Trace đặc biệt quan trọng trong tình huống nào?', ['Video lan truyền gây phẫn nộ không rõ nguồn gốc', 'Khi nhận OTP từ ngân hàng', 'Khi thay đổi hình nền điện thoại', 'Khi cài ứng dụng từ kho ứng dụng chính thức'], 0),
      q('Decide yêu cầu bạn phải làm gì?', ['Chọn hành động an toàn nhất dù chưa chứng minh được deepfake', 'Xác nhận 100% là deepfake trước khi từ chối', 'Hỏi ý kiến số đông trước khi quyết định', 'Đợi báo chí đưa tin rồi mới hành động'], 0),
      q('Family code nên có đặc điểm nào?', ['Dễ nhớ với gia đình, không đăng công khai, không dựa vào thông tin có thể tra được', 'Càng phức tạp càng tốt', 'Nên dùng ngày sinh để dễ nhớ', 'Nên chia sẻ rộng để nhiều người biết'], 0),
      q('Reverse image search không giúp phát hiện điều gì?', ['Ảnh AI mới hoàn toàn chưa từng xuất hiện trên internet', 'Ảnh bị tái sử dụng từ sự kiện cũ', 'Ảnh bị gán sai bối cảnh', 'Ảnh đại diện bị lấy từ nguồn khác'], 0),
      q('Khi clip gây phẫn nộ xuất hiện trong nhóm chat, hành động nào đúng nhất?', ['Không chia sẻ thêm, không truy tìm danh tính, báo người có trách nhiệm', 'Chia sẻ ngay để cảnh báo mọi người', 'Phân tích công khai trong nhóm', 'Dùng detector để xác nhận thật giả rồi mới quyết định'], 0),
    ],
  },


  // ── MODULES 5–9: Placeholder ──────────────────────────────────
  ...[5, 6, 7, 8, 9].map(id => ({
    id, part: id <= 6 ? 'recognition' : 'response',
    title: [
      'Nhận diện giọng nói và âm thanh giả mạo',
      'Kiểm chứng bối cảnh, nguồn tin và metadata',
      'Phòng ngừa deepfake cho cá nhân',
      'Ứng phó khi gặp hoặc trở thành nạn nhân',
      'Deepfake trong tổ chức: SOC, GRC và security awareness',
    ][id - 5],
    duration: '90-100 phút', level: id <= 6 ? 'Recognition' : 'Response',
    scenario: 'Nội dung đang được xây dựng. Sẽ cập nhật sớm.',
    outcomes: ['Nội dung đang được phát triển.'],
    sections: [
      {
        title: `${id}.1 Nội dung đang được xây dựng`,
        lessons: [
          lesson(`${id}.0.0`, 'Module đang được phát triển', [
            `Module ${id} đang trong quá trình xây dựng. Nội dung sẽ được cập nhật sớm.`,
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
}
