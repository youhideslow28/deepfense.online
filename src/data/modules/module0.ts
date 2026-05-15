import type { Module } from '../basicsCourseData';
const q = (text: string, options: string[], answer: number, explanation?: string) => ({ text, options, answer, explanation });
const lesson = (id: string, title: string, paragraphs: string[], takeaways: string[]) => ({ id, title, paragraphs, takeaways, type: 'interactive' as const, duration: 5 });
const checkpoint = (label: string, questions: any[]) => ({ label, questions });

export const module0: Module = {
  id: 0, part: "foundation", title: "Một ngày bình thường trên không gian số",
  duration: "25-30 phút", level: "Foundation",
  scenario: "Mở đầu, tạo động lực, kiểm tra nhận thức ban đầu. Hình thức: Tự học trên deepfense.online. Điều kiện hoàn thành: Xem hết nội dung, hoàn thành pre-check, đọc kết quả phản hồi. Điểm số: Pre-check không tính vào chứng chỉ.",
  outcomes: [
    "Hiểu vì sao deepfake không còn là chuyện xa lạ của người nổi tiếng hay phim ảnh.",
    "Nhận ra rằng bất kỳ người dùng Internet nào cũng có thể gặp nội dung giả mạo, lừa đảo hoặc gây hiểu nhầm.",
    "Làm quen với cách học của DEEPFENSE BASIC: học qua câu chuyện, tình huống, quan sát, quyết định và phản hồi.",
    "Tự kiểm tra phản xạ ban đầu của mình trước các tình huống nghi vấn trên không gian số."
  ],
  sections: [
    {
      title: "0.0 Chào mừng đến với DEEPFENSE BASIC",
      lessons: [
        lesson("0.0.1", "Chào mừng đến với DEEPFENSE BASIC", [
          "Chào mừng bạn đến với DEEPFENSE BASIC.",
          "Đây là khóa học cơ bản về deepfake và phòng vệ trước nội dung giả mạo trên không gian số. Khóa học này không yêu cầu bạn biết lập trình, không yêu cầu bạn hiểu sâu về trí tuệ nhân tạo, cũng không yêu cầu bạn phải là chuyên gia an toàn thông tin.",
          "Bạn chỉ cần là một người đang sống trong thế giới số.",
          "Nếu bạn từng dùng mạng xã hội, từng nhận tin nhắn từ người lạ, từng xem video ngắn, từng nghe một lời kêu gọi chuyển tiền, từng thấy một hình ảnh gây sốc trong nhóm chat, từng băn khoăn \"cái này có thật không?\", thì khóa học này dành cho bạn.",
          "Trong khóa học này, chúng ta sẽ không học cách tạo deepfake.",
          "Chúng ta học cách nhận ra rủi ro, kiểm chứng thông tin, bảo vệ bản thân, bảo vệ người khác và ra quyết định bình tĩnh hơn trước những nội dung có thể đánh lừa mắt, tai và cảm xúc của con người."
        ], []),
        lesson("0.0.2", "Điều quan trọng đầu tiên", [
          "Deepfake không chỉ là một video giả.",
          "Deepfake là một phần của một vấn đề lớn hơn: niềm tin của con người trên không gian số đang bị thử thách.",
          "Trước đây, nhiều người nghĩ: \"Có hình thì chắc là thật.\" Sau đó, chúng ta học thêm: \"Ảnh có thể bị chỉnh sửa.\" Rồi video trở thành bằng chứng mạnh hơn: \"Có video thì chắc khó mà giả.\"",
          "Nhưng bây giờ, ngay cả hình ảnh, video và giọng nói cũng có thể được tạo ra hoặc chỉnh sửa bằng AI theo cách rất thuyết phục.",
          "Điều đó không có nghĩa là chúng ta phải nghi ngờ mọi thứ. Nếu cái gì cũng bị xem là giả, chúng ta sẽ mệt mỏi và mất phương hướng.",
          "Mục tiêu của DEEPFENSE BASIC là giúp bạn có một cách tiếp cận cân bằng:\n- Không hoảng sợ.\n- Không tin vội.\n- Không chia sẻ vội.\n- Không chuyển tiền khi đang bị gây áp lực.\n- Biết cách kiểm chứng trước khi hành động."
        ], [])
      ]
    },
    {
      title: "0.1 Câu chuyện mở đầu: Một ngày của An",
      lessons: [
        lesson("0.1.1", "Một ngày của An", [
          "Trong khóa học này, bạn sẽ đi cùng một nhân vật tên là An.",
          "An không phải chuyên gia công nghệ. An là một người dùng Internet bình thường: có điện thoại, có mạng xã hội, có tài khoản ngân hàng, có gia đình, bạn bè, nhóm lớp, nhóm làm việc và một lịch sử xem video khá giống chúng ta.",
          "Một ngày của An bắt đầu rất bình thường.",
          "Buổi sáng, An mở điện thoại và thấy một video của một người nổi tiếng đang giới thiệu một kênh đầu tư \"lợi nhuận cao, rủi ro thấp\". Gương mặt đúng là người đó. Giọng nói cũng giống. Video có hàng nghìn lượt xem, hàng trăm bình luận.",
          "Đến trưa, An nhận được tin nhắn từ một người bạn cũ. Người bạn nói đang cần mượn tiền gấp vì tài khoản ngân hàng bị khóa. Ảnh đại diện đúng là bạn của An. Cách nhắn tin thì hơi khác một chút, nhưng người kia bảo đang rất vội.",
          "Chiều hôm đó, trong một nhóm chat, An thấy một hình ảnh nhạy cảm được cho là của một học sinh trong trường. Một số người trong nhóm cười cợt. Một số người nói đó là ảnh AI. Một số người lại bảo \"không biết thật giả nhưng cứ lưu lại đã\".",
          "Buổi tối, An nhận một cuộc gọi video ngắn. Người gọi trông giống người thân của An và nói đang gặp chuyện khẩn cấp. Cuộc gọi hơi giật, âm thanh không rõ lắm, nhưng giọng nghe rất quen.",
          "Trước khi đi ngủ, An thấy một đoạn clip chính trị - xã hội gây phẫn nộ được chia sẻ dày đặc. Nhiều người kêu gọi chia sẻ ngay để \"mọi người biết sự thật\".",
          "Nếu là An, bạn sẽ làm gì? Bạn sẽ tin video người nổi tiếng không? Bạn sẽ chuyển tiền cho người bạn cũ không? Bạn sẽ xử lý hình ảnh nhạy cảm trong nhóm chat ra sao? Bạn sẽ làm gì với cuộc gọi giống người thân? Bạn sẽ chia sẻ đoạn clip gây phẫn nộ không?",
          "Không có câu trả lời nào hoàn hảo nếu chúng ta không có phương pháp. Vì vậy, khóa học này sẽ giúp bạn xây dựng một phương pháp."
        ], []),
        lesson("0.1.2", "Deepfense Check", [
          "Chúng ta gọi phương pháp đó là: Deepfense Check.",
          "Trong các module sau, bạn sẽ học từng phần của quy trình này:\n1. Pause: Dừng lại trước khi phản ứng.\n2. Observe: Quan sát dấu hiệu kỹ thuật và ngữ cảnh.\n3. Verify: Xác minh qua kênh độc lập.\n4. Trace: Truy nguồn nội dung.\n5. Decide: Ra quyết định an toàn.",
          "Ở Module 0, bạn chưa cần nhớ hết quy trình. Bạn chỉ cần nhớ một câu:",
          "Khi nội dung khiến bạn sợ, giận, xấu hổ, thương hại hoặc muốn hành động ngay, đó là lúc bạn cần chậm lại."
        ], [
          "Pause, Observe, Verify, Trace, Decide là xương sống của khóa học.",
          "Khi nội dung khiến bạn sợ, giận, xấu hổ, thương hại hoặc muốn hành động ngay, đó là lúc bạn cần chậm lại."
        ])
      ]
    },
    {
      title: "0.2 Vì sao khóa học này cần thiết?",
      lessons: [
        lesson("0.2.1", "Vì sao khóa học này cần thiết?", [
          "Deepfake nguy hiểm không phải chỉ vì nó \"giả\".",
          "Nó nguy hiểm vì nó có thể xuất hiện đúng lúc con người ít phòng bị nhất:\n- Khi ta lo cho người thân.\n- Khi ta sợ mất tiền.\n- Khi ta xấu hổ.\n- Khi ta giận dữ.\n- Khi ta muốn giúp ai đó.\n- Khi ta tin rằng mình đang nhìn thấy bằng chứng.",
          "Deepfake cũng không hoạt động một mình. Nó thường đi cùng các yếu tố khác:\n- Tài khoản mạng xã hội bị chiếm quyền.\n- Tin nhắn thúc ép.\n- Link giả mạo.\n- Trang web giả.\n- Giả danh công an, ngân hàng, nhà trường, lãnh đạo, người nổi tiếng.\n- Sự lan truyền quá nhanh trong nhóm chat.",
          "Vì vậy, học về deepfake không chỉ là học nhìn mặt méo, mắt lạ hay giọng nói đều đều.",
          "Học về deepfake là học cách tự hỏi:\n- Ai đang gửi nội dung này?\n- Họ muốn mình làm gì?\n- Vì sao mình phải làm ngay?\n- Nếu mình sai, ai sẽ bị hại?\n- Có cách nào kiểm chứng độc lập không?",
          "Đây là khóa học về nhận thức, kỹ năng số và trách nhiệm số."
        ], [])
      ]
    },
    {
      title: "0.3 Bạn sẽ học như thế nào?",
      lessons: [
        lesson("0.3.1", "Bạn sẽ học như thế nào?", [
          "DEEPFENSE BASIC được thiết kế theo kiểu học ngắn, tương tác và thực tế.",
          "Mỗi phần học thường có 5 thành phần:\n1. Câu chuyện: Bạn gặp một tình huống giống đời thật.\n2. Kiến thức: Bạn học khái niệm hoặc quy trình cần thiết.\n3. Quan sát: Bạn xem dấu hiệu, dữ kiện, hành vi hoặc ngữ cảnh.\n4. Quyết định: Bạn chọn hành động.\n5. Phản hồi: Hệ thống giải thích vì sao lựa chọn đó an toàn hoặc rủi ro.",
          "Một số phần sẽ có quiz ngắn. Quiz không nhằm \"bắt lỗi\" bạn. Quiz giúp bạn kiểm tra xem mình đã hiểu đủ để dùng kiến thức trong đời thật chưa.",
          "Cuối khóa, bạn sẽ làm bài kiểm tra gồm 50 câu hỏi. Hệ thống sẽ lấy ngẫu nhiên từ ngân hàng 150 câu. Nếu đạt từ 70% trở lên, bạn đủ điều kiện nhận chứng chỉ hoàn thành DEEPFENSE BASIC."
        ], [])
      ]
    },
    {
      title: "0.4 Pre-check: Phản xạ ban đầu của bạn",
      lessons: [
        lesson("0.4.1", "Pre-check: Phản xạ ban đầu", [
          "Người học trả lời 8 câu hỏi tình huống. Không hiển thị đáp án đúng/sai theo kiểu thi. Sau khi hoàn thành, hệ thống hiển thị nhóm phản xạ và lời khuyên học tập.",
          "Hệ thống có thể phân loại người học thành 3 nhóm:\n\nNhóm 1: Phản xạ nhanh, cần thêm lớp phòng vệ - Bạn có xu hướng hành động nhanh khi gặp tình huống khẩn cấp hoặc cảm xúc mạnh. Khóa học này sẽ giúp bạn thêm một bước \"dừng lại\" trước khi quyết định.\n\nNhóm 2: Đã biết nghi ngờ, cần quy trình rõ hơn - Bạn đã có cảm giác cảnh giác tốt. Bước tiếp theo là biến cảm giác đó thành quy trình kiểm chứng có thể lặp lại.\n\nNhóm 3: Phản xạ phòng vệ tốt - Bạn đã chọn nhiều hành động an toàn. Khóa học này sẽ giúp bạn hiểu sâu hơn vì sao các hành động đó đúng và cách hướng dẫn người khác."
        ], [
          "Deepfake không đáng sợ nhất khi nó trông hoàn hảo. Nó đáng sợ nhất khi nó xuất hiện đúng lúc chúng ta đang vội, đang sợ, đang giận hoặc đang thương ai đó."
        ])
      ],
      checkpoint: checkpoint("0.4", [
        q("Bạn nhận được cuộc gọi video từ một người thân. Người đó nói đang gặp tai nạn, cần bạn chuyển tiền ngay trong 5 phút. Hình ảnh hơi mờ, giọng nói khá giống. Bạn nên làm gì trước tiên?", ["Chuyển tiền ngay vì có thể người thân đang nguy hiểm", "Hỏi số tài khoản rồi chuyển một khoản nhỏ trước", "Tắt cuộc gọi và gọi lại bằng số điện thoại đã lưu trước đó", "Gửi OTP ngân hàng để người đó tự xử lý cho nhanh"], 2, "C là lựa chọn an toàn nhất. Khi có yêu cầu tiền khẩn cấp, hãy xác minh qua kênh độc lập."),
        q("Bạn thấy một video người nổi tiếng kêu gọi đầu tư, cam kết lợi nhuận cao mỗi ngày. Video có gương mặt và giọng nói rất giống người thật. Bạn nên nghĩ gì?", ["Người nổi tiếng đã nói thì chắc đáng tin", "Video có thể là thật, giả hoặc bị cắt ghép; cần kiểm chứng nguồn chính thức", "Chỉ cần đọc bình luận là biết thật giả", "Nếu nhiều người chia sẻ thì chắc là thật"], 1, "Gương mặt và giọng nói không đủ để xác minh một lời kêu gọi tài chính."),
        q("Trong nhóm lớp xuất hiện một hình ảnh nhạy cảm được cho là của một bạn học. Một người nói \"không biết thật hay AI nhưng gửi tiếp đi\". Bạn nên làm gì?", ["Lưu lại để xem sau", "Chuyển tiếp cho bạn thân để hỏi ý kiến", "Không lan truyền, báo cáo nội dung và tìm người có trách nhiệm hỗ trợ", "Bình luận đùa vì có thể chỉ là ảnh giả"], 2, "Dù thật hay giả, việc lan truyền hình ảnh nhạy cảm đều có thể gây hại nghiêm trọng."),
        q("Một tài khoản giống bạn của bạn nhắn tin mượn tiền. Cách nhắn hơi lạ, nhưng ảnh đại diện đúng và tài khoản đúng tên. Bạn nên làm gì?", ["Chuyển tiền nếu số tiền nhỏ", "Gọi xác minh qua số điện thoại cũ hoặc kênh khác đã biết", "Hỏi số tài khoản rồi chuyển sau", "Tin vì tài khoản đúng tên"], 1, "Tài khoản có thể bị chiếm quyền."),
        q("Bạn thấy một đoạn video gây phẫn nộ và dòng chữ \"chia sẻ ngay trước khi bị xóa\". Bạn nên làm gì?", ["Chia sẻ ngay để cảnh báo mọi người", "Chờ kiểm chứng nguồn, thời gian, bối cảnh trước khi chia sẻ", "Tải về và đăng lại ở nhiều nơi", "Bình luận thật mạnh để tăng tương tác"], 1, "Cảm xúc mạnh là một tín hiệu cần chậm lại."),
        q("Một công cụ online báo video \"90% là deepfake\". Bạn nên hiểu kết quả này thế nào?", ["Video chắc chắn là giả", "Công cụ chỉ là một tín hiệu tham khảo, cần thêm kiểm chứng", "Công cụ luôn chính xác hơn con người", "Không cần xem nguồn nữa"], 1, "Công cụ phát hiện có thể sai, đặc biệt trong môi trường thực tế."),
        q("Bạn nghi mình vừa bị lừa chuyển tiền qua cuộc gọi giả mạo. Việc nào nên làm sớm?", ["Xóa hết tin nhắn vì xấu hổ", "Im lặng để tránh bị người khác biết", "Liên hệ ngân hàng, lưu bằng chứng và báo cáo", "Đăng toàn bộ thông tin cá nhân của người nghi lừa đảo lên mạng"], 2, "Cần hành động nhanh, lưu bằng chứng và hạn chế gây thêm rủi ro."),
        q("Bạn nghe một bản ghi âm có giọng nói giống giáo viên/lãnh đạo/người nổi tiếng nói một điều gây sốc. Bạn nên kết luận thế nào?", ["Giọng giống thì chắc là thật", "Giọng nói có thể bị giả lập hoặc cắt ghép; cần kiểm chứng nguồn và bối cảnh", "Nếu file âm thanh ngắn thì chắc thật", "Nếu nghe trên điện thoại thì không thể giả"], 1, "Giọng nói ngày nay không còn là bằng chứng tuyệt đối.")
      ])
    }
  ],
  quiz: [
    q("Mục tiêu chính của DEEPFENSE BASIC là gì?", ["Học cách tạo deepfake", "Học cách nhận diện rủi ro và phòng vệ an toàn trước nội dung giả mạo", "Học mẹo vượt detector", "Tăng lượt xem nội dung"], 1),
    q("Deepfense Check gồm các bước nào?", ["Pause, Observe, Verify, Trace, Decide", "Post, Like, Share, Comment", "Copy, Paste, Upload", "Scan, Delete, Ignore"], 0),
    q("Khi nhận cuộc gọi giống người thân yêu cầu chuyển tiền gấp, bước an toàn nhất là gì?", ["Chuyển tiền ngay", "Ngắt cuộc gọi và xác minh qua số/kênh đã biết trước", "Gửi OTP để họ xử lý", "Hỏi số tài khoản rồi chuyển thử"], 1)
  ]
};
