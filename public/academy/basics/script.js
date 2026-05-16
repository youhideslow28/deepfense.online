const course = {
  title: "DEEPFENSE BASICS",
  credential: "DEEPFENSE AWARE",
  reward: "500 DPF coin",
  parts: [
    {
      id: "intro",
      title: "Module 0 — Mở đầu",
      description: "Câu chuyện, bối cảnh và phản xạ ban đầu trước nội dung số.",
      modules: [0],
    },
    {
      id: "foundation",
      title: "Phần I - Nền tảng",
      description: "Hiểu deepfake, tác động, rủi ro, đạo đức và niềm tin số.",
      modules: [1, 2, 3],
    },
    {
      id: "recognition",
      title: "Phần II - Nhận diện",
      description: "Quan sát dấu hiệu hình ảnh, video, âm thanh, bối cảnh và nguồn tin.",
      modules: [4, 5, 6],
    },
    {
      id: "response",
      title: "Phần III - Phòng ngừa và ứng phó",
      description: "Xây dựng thói quen phòng vệ, lưu bằng chứng và phản ứng có trách nhiệm.",
      modules: [7, 8, 9],
    },
  ],
};

const modules = [
  // ─── MODULE 0 ───────────────────────────────────────────────
  {
    id: 0,
    part: "intro",
    title: "Một ngày bình thường trên không gian số",
    duration: "25-30 phút",
    level: "Mở đầu",
    scenario: "Một ngày của An bắt đầu rất bình thường — cho đến khi xuất hiện một video đầu tư, một tin nhắn mượn tiền, một hình ảnh nhạy cảm trong nhóm chat và một cuộc gọi giống người thân. Nếu bạn là An, bạn sẽ làm gì?",
    outcomes: [
      "Hiểu vì sao deepfake không còn là chuyện xa lạ của người nổi tiếng hay phim ảnh.",
      "Nhận ra rằng bất kỳ người dùng Internet nào cũng có thể gặp nội dung giả mạo.",
      "Làm quen với cách học của DEEPFENSE BASIC: câu chuyện, quan sát, quyết định, phản hồi.",
      "Tự kiểm tra phản xạ ban đầu trước các tình huống nghi vấn trên không gian số.",
    ],
    sections: [
      {
        title: "0.0-0.3 Giới thiệu khóa học",
        lessons: [
          lesson("0.0", "Chào mừng đến với DEEPFENSE BASIC", [
            "Đây là khóa học cơ bản về deepfake và phòng vệ trước nội dung giả mạo trên không gian số. Khóa học không yêu cầu bạn biết lập trình, không yêu cầu hiểu sâu về AI, cũng không yêu cầu phải là chuyên gia an toàn thông tin. Bạn chỉ cần là một người đang sống trong thế giới số.",
            "Nếu bạn từng dùng mạng xã hội, từng nhận tin nhắn từ người lạ, từng xem video ngắn, từng nghe lời kêu gọi chuyển tiền, từng thấy hình ảnh gây sốc trong nhóm chat, hay từng băn khoăn \"cái này có thật không?\" — thì khóa học này dành cho bạn.",
            "Trong khóa học này, chúng ta sẽ không học cách tạo deepfake. Chúng ta học cách nhận ra rủi ro, kiểm chứng thông tin, bảo vệ bản thân, bảo vệ người khác và ra quyết định bình tĩnh hơn trước những nội dung có thể đánh lừa mắt, tai và cảm xúc của con người.",
            "Deepfake không chỉ là một video giả. Nó là một phần của một vấn đề lớn hơn: niềm tin của con người trên không gian số đang bị thử thách. Trước đây nhiều người nghĩ \"có hình thì chắc là thật\", rồi \"ảnh có thể bị chỉnh sửa\", rồi \"có video thì khó giả\". Nhưng bây giờ, ngay cả hình ảnh, video và giọng nói cũng có thể được tạo ra bằng AI theo cách rất thuyết phục.",
            "Mục tiêu của DEEPFENSE BASIC: Không hoảng sợ. Không tin vội. Không chia sẻ vội. Không chuyển tiền khi đang bị gây áp lực. Biết cách kiểm chứng trước khi hành động.",
          ], [
            "Khóa học dành cho mọi người dùng Internet, không cần kiến thức kỹ thuật.",
            "Mục tiêu là biết kiểm chứng, không phải trở thành chuyên gia pháp y số.",
          ]),
          lesson("0.1", "Câu chuyện mở đầu: Một ngày của An", [
            "Trong khóa học này, bạn sẽ đi cùng một nhân vật tên là An. An không phải chuyên gia công nghệ. An là người dùng Internet bình thường: có điện thoại, có mạng xã hội, có tài khoản ngân hàng, có gia đình, bạn bè, nhóm lớp, nhóm làm việc.",
            "Buổi sáng, An thấy video người nổi tiếng giới thiệu kênh đầu tư \"lợi nhuận cao, rủi ro thấp\". Gương mặt đúng là người đó. Giọng nói cũng giống. Video có hàng nghìn lượt xem. Đến trưa, An nhận tin nhắn từ bạn cũ nói cần mượn tiền gấp vì tài khoản bị khóa. Ảnh đại diện đúng, nhưng cách nhắn hơi khác.",
            "Chiều, trong nhóm chat xuất hiện hình ảnh nhạy cảm của một học sinh. Một số người cười cợt, một số nói là ảnh AI, một số bảo \"không biết thật giả nhưng cứ lưu lại\". Buổi tối, An nhận cuộc gọi video ngắn — người gọi trông giống người thân, nói đang gặp chuyện khẩn cấp.",
            "Nếu là An, bạn sẽ làm gì? Bạn sẽ tin video người nổi tiếng không? Chuyển tiền cho bạn cũ không? Xử lý hình ảnh trong nhóm chat thế nào? Không có câu trả lời nào hoàn hảo nếu không có phương pháp. Khóa học này sẽ giúp bạn xây dựng phương pháp đó — gọi là Deepfense Check: Pause (Dừng lại), Observe (Quan sát), Verify (Xác minh), Trace (Truy nguồn), Decide (Ra quyết định).",
            "Khi nội dung khiến bạn sợ, giận, xấu hổ, thương hại hoặc muốn hành động ngay — đó là lúc bạn cần chậm lại nhất.",
          ], [
            "Deepfake nguy hiểm nhất khi xuất hiện đúng lúc ta đang vội, đang sợ, đang giận hoặc đang thương ai đó.",
            "Phương pháp Deepfense Check: Pause → Observe → Verify → Trace → Decide.",
          ]),
          lesson("0.2", "Vì sao khóa học này cần thiết?", [
            "Deepfake nguy hiểm không phải chỉ vì nó \"giả\". Nó nguy hiểm vì có thể xuất hiện đúng lúc con người ít phòng bị nhất: khi lo cho người thân, khi sợ mất tiền, khi xấu hổ, khi giận dữ, khi muốn giúp ai đó, khi tin rằng mình đang nhìn thấy bằng chứng.",
            "Deepfake cũng không hoạt động một mình. Nó thường đi cùng: tài khoản mạng xã hội bị chiếm quyền, tin nhắn thúc ép, link giả mạo, trang web giả, giả danh công an/ngân hàng/nhà trường/lãnh đạo, sự lan truyền quá nhanh trong nhóm chat.",
            "Vì vậy, học về deepfake không chỉ là học nhìn mặt méo, mắt lạ hay giọng nói đều đều. Học về deepfake là học cách tự hỏi: Ai đang gửi nội dung này? Họ muốn mình làm gì? Vì sao mình phải làm ngay? Nếu mình sai, ai sẽ bị hại? Có cách nào kiểm chứng độc lập không?",
            "Đây là khóa học về nhận thức, kỹ năng số và trách nhiệm số.",
          ], [
            "Deepfake nguy hiểm khi kết hợp với áp lực thời gian, cảm xúc mạnh và yêu cầu nhạy cảm.",
            "Câu hỏi quan trọng: ai gửi, mục đích gì, tại sao phải làm ngay?",
          ]),
          lesson("0.3", "Bạn sẽ học như thế nào?", [
            "DEEPFENSE BASIC được thiết kế theo kiểu học ngắn, tương tác và thực tế. Mỗi phần học thường có 5 thành phần: Câu chuyện (gặp tình huống thực tế), Kiến thức (học khái niệm/quy trình), Quan sát (xem dấu hiệu và ngữ cảnh), Quyết định (chọn hành động), Phản hồi (hệ thống giải thích vì sao đúng/sai).",
            "Một số phần sẽ có quiz ngắn. Quiz không nhằm \"bắt lỗi\" bạn — quiz giúp bạn kiểm tra xem mình đã hiểu đủ để dùng kiến thức trong đời thật chưa.",
            "Cuối khóa, bạn sẽ làm bài kiểm tra 50 câu, lấy ngẫu nhiên từ ngân hàng 150 câu. Đạt từ 70% trở lên thì đủ điều kiện nhận chứng chỉ DEEPFENSE BASIC.",
          ], [
            "Học qua câu chuyện → quan sát → quyết định → phản hồi là cách học chủ động nhất.",
            "Quiz trong bài là công cụ học, không phải bài thi áp lực.",
          ]),
        ],
        checkpoint: checkpoint("0", [
          q("Mục tiêu chính của DEEPFENSE BASIC là gì?", ["Giúp nhận ra rủi ro, kiểm chứng thông tin và ra quyết định an toàn hơn", "Dạy tạo deepfake", "Dạy lập trình AI", "Chỉ dành cho chuyên gia bảo mật"], 0),
          q("Khi nội dung gây cảm xúc mạnh (sợ, giận, muốn hành động ngay), bạn nên làm gì?", ["Chậm lại và kiểm chứng trước khi hành động", "Chia sẻ ngay để cảnh báo mọi người", "Tin ngay vì cảm xúc thật", "Bỏ qua hoàn toàn"], 0),
          q("Phương pháp Deepfense Check gồm các bước nào?", ["Pause, Observe, Verify, Trace, Decide", "Like, Share, Comment, Report", "Download, Edit, Post, Delete", "Scan, Block, Delete, Ignore"], 0),
        ]),
      },
    ],
    quiz: [
      q("Bạn nhận cuộc gọi video từ người thân nói gặp tai nạn, cần chuyển tiền trong 5 phút. Nên làm gì trước tiên?", ["Tắt cuộc gọi và gọi lại qua số đã lưu trước đó", "Chuyển tiền ngay vì người thân có thể nguy hiểm", "Hỏi số tài khoản rồi chuyển khoản nhỏ trước", "Gửi OTP để người đó tự xử lý"], 0),
      q("Bạn thấy video người nổi tiếng kêu gọi đầu tư, cam kết lợi nhuận cao. Gương mặt và giọng giống người thật. Nên nghĩ gì?", ["Video có thể thật, giả hoặc bị cắt ghép; cần kiểm chứng nguồn chính thức", "Người nổi tiếng đã nói thì đáng tin", "Chỉ cần đọc bình luận là biết thật giả", "Nhiều người chia sẻ thì chắc là thật"], 0),
      q("Trong nhóm lớp xuất hiện ảnh nhạy cảm được cho là của bạn học. Nên làm gì?", ["Không lan truyền, báo cáo nội dung và tìm người có trách nhiệm hỗ trợ", "Lưu lại để xem sau", "Chuyển tiếp cho bạn thân để hỏi ý kiến", "Bình luận đùa vì có thể chỉ là ảnh giả"], 0),
      q("Tài khoản giống bạn của bạn nhắn mượn tiền, cách nhắn hơi lạ nhưng ảnh đại diện đúng. Nên làm gì?", ["Gọi xác minh qua số điện thoại cũ hoặc kênh khác đã biết", "Chuyển tiền nếu số tiền nhỏ", "Hỏi số tài khoản rồi chuyển sau", "Tin vì tài khoản đúng tên"], 0),
      q("Bạn thấy video gây phẫn nộ kèm dòng chữ \"chia sẻ ngay trước khi bị xóa\". Nên làm gì?", ["Chờ kiểm chứng nguồn, thời gian, bối cảnh trước khi chia sẻ", "Chia sẻ ngay để cảnh báo mọi người", "Tải về và đăng lại ở nhiều nơi", "Bình luận mạnh để tăng tương tác"], 0),
      q("Công cụ online báo video \"90% là deepfake\". Nên hiểu kết quả này thế nào?", ["Chỉ là tín hiệu tham khảo, cần thêm kiểm chứng bằng nguồn và bối cảnh", "Video chắc chắn là giả", "Công cụ luôn chính xác hơn con người", "Không cần xem nguồn nữa"], 0),
      q("Bạn nghi mình vừa bị lừa chuyển tiền qua cuộc gọi giả mạo. Việc nào nên làm sớm?", ["Liên hệ ngân hàng, lưu bằng chứng và báo cáo với cơ quan phù hợp", "Xóa hết tin nhắn vì xấu hổ", "Im lặng để tránh bị người khác biết", "Đăng toàn bộ thông tin cá nhân của người nghi lừa lên mạng"], 0),
      q("Bạn nghe ghi âm giống giọng lãnh đạo nói điều gây sốc. Nên kết luận thế nào?", ["Giọng nói có thể bị giả lập hoặc cắt ghép; cần kiểm chứng nguồn và bối cảnh", "Giọng giống thì chắc là thật", "File âm thanh ngắn thì chắc thật", "Nghe trên điện thoại thì không thể giả"], 0),
    ],
  },
  // ─── MODULE 1 ───────────────────────────────────────────────
  {
    id: 1,
    part: "foundation",
    title: "Deepfake là gì?",
    duration: "80-90 phút",
    level: "Foundation",
    scenario: "Buổi sáng, An đang ăn sáng và lướt điện thoại. Một video hiện lên — người nổi tiếng An biết đang giới thiệu kênh đầu tư. Gương mặt giống. Giọng nói giống. Khẩu hình có vẻ khớp. An hơi phân vân. Nếu bạn là An, bạn có thể hỏi: Đây có phải video thật không? Nếu video giả, nó là deepfake hay chỉ là cắt ghép?",
    outcomes: [
      "Giải thích được deepfake bằng ngôn ngữ đơn giản.",
      "Phân biệt được deepfake với AI-generated media, edited media và repurposed media.",
      "Hiểu vì sao nội dung giả mạo ngày càng dễ tạo, dễ lan truyền và khó nhận ra.",
      "Biết không phải nội dung 'trông giả' nào cũng là deepfake, và 'trông thật' chưa chắc đáng tin.",
      "Thực hành phân loại các tình huống nội dung số thường gặp.",
    ],
    sections: [
      {
        title: "1.1 Deepfake và các họ hàng của nó",
        lessons: [
          lesson("1.0.0", "Câu chuyện dẫn nhập: Video đầu tư của người nổi tiếng", [
            "Buổi sáng, An đang ăn sáng và lướt điện thoại. Một video hiện lên trên bảng tin. Trong video, một người nổi tiếng mà An biết đang nói: 'Tôi đã dùng nền tảng này để tạo thêm thu nhập mỗi ngày. Chỉ cần bắt đầu với một số tiền nhỏ, bạn có thể nhận lợi nhuận ổn định. Hãy đăng ký ngay hôm nay.'",
            "Video khá thuyết phục. Gương mặt giống. Giọng nói giống. Khẩu hình có vẻ khớp. Bên dưới có nhiều bình luận: 'Em đã nhận tiền rồi', 'Ban đầu em cũng nghi ngờ, nhưng thử xong thấy thật.' An hơi phân vân. Người nổi tiếng này thường không quảng cáo kiểu đó. Nhưng video thì nhìn rất thật.",
            "Nếu bạn là An, bạn có thể hỏi: Đây có phải video thật không? Người đó có thực sự nói vậy không? Nếu video giả, nó là deepfake hay chỉ là cắt ghép? Nếu không biết chắc, mình nên làm gì? Để trả lời, chúng ta cần bắt đầu từ câu hỏi cơ bản nhất.",
          ], [
            "Câu hỏi quan trọng không chỉ là 'thật hay giả' mà là: ai được lợi nếu mình tin vào nội dung này?",
            "Áp lực thời gian và cảm xúc tích cực (ham lợi) là hai công cụ phổ biến trong lừa đảo qua video giả.",
          ]),
          lesson("1.1.1", "Khái niệm 1: Deepfake là gì?", [
            "Deepfake là nội dung hình ảnh, video hoặc âm thanh được tạo ra hoặc chỉnh sửa bằng công nghệ số, thường có sử dụng AI, để khiến người xem tin rằng một người đã nói hoặc làm điều mà họ không thực sự nói hoặc làm.",
            "Deepfake có thể xuất hiện dưới nhiều dạng: một video thay khuôn mặt người A vào cơ thể người B; một đoạn âm thanh giả giọng người thân để yêu cầu chuyển tiền; một video người nổi tiếng kêu gọi đầu tư dù họ chưa từng nói vậy; một đoạn clip chỉnh khẩu hình để trông như ai đó đang phát biểu điều gây sốc; một hình ảnh nhạy cảm giả mạo nhằm bôi nhọ hoặc tống tiền.",
            "Deepfake không nhất thiết phải hoàn hảo mới nguy hiểm. Kẻ xấu chỉ cần tạo ra đủ giống trong vài giây, kết hợp với sự khẩn cấp, sợ hãi hoặc tin tưởng, để nạn nhân hành động trước khi kịp suy nghĩ.",
          ], [
            "Deepfake là khi công nghệ làm cho một người 'xuất hiện', 'nói' hoặc 'hành động' theo cách chưa từng xảy ra.",
            "Deepfake không cần hoàn hảo để nguy hiểm — chỉ cần đủ giống kết hợp với cảm xúc và áp lực.",
          ]),
          lesson("1.1.2", "Khái niệm 2: Synthetic media là gì?", [
            "Synthetic media là nội dung được tạo ra hoàn toàn hoặc một phần bằng công nghệ số, đặc biệt là AI. Synthetic media có thể là ảnh một người không có thật, giọng nói được AI tạo ra, nhạc, hình minh họa, video hoặc nhân vật ảo.",
            "Synthetic media không phải lúc nào cũng xấu — nó có thể được dùng trong giáo dục, phim ảnh, truyền thông sáng tạo hoặc dịch thuật giọng nói. Vấn đề bắt đầu khi synthetic media được dùng để đánh lừa, mạo danh, bôi nhọ hoặc thao túng nhận thức.",
            "Tất cả deepfake đều có thể xem là một dạng synthetic media, nhưng không phải mọi synthetic media đều là deepfake. Một bức tranh phong cảnh AI tạo ra không phải deepfake. Nhưng một video giả mạo người thật đang nói điều họ chưa từng nói thì có thể là deepfake.",
          ], [
            "Synthetic media không phải lúc nào cũng xấu — vấn đề là mục đích và mức độ gây hiểu nhầm.",
            "Không phải mọi nội dung AI đều là deepfake; nhưng deepfake luôn là một dạng nội dung tổng hợp hoặc biến đổi.",
          ]),
          lesson("1.1.3", "Khái niệm 3: Deepvoice là gì?", [
            "Deepvoice là dạng giả lập hoặc chỉnh sửa giọng nói bằng AI, khiến âm thanh nghe giống một người thật. Deepvoice có thể dùng để đọc văn bản bằng giọng giống người cụ thể, tạo cuộc gọi giả, làm tin nhắn thoại giả hoặc ghép giọng vào video.",
            "Deepvoice đặc biệt nguy hiểm trong tình huống có áp lực thời gian: 'Con đang bị tai nạn, chuyển tiền ngay', 'Anh là sếp, xử lý khoản này trước 3 giờ', 'Tôi là nhân viên ngân hàng, đọc mã xác thực để khóa giao dịch lạ.' Một đoạn giọng nói ngắn không còn đủ để xác minh danh tính.",
            "Nếu yêu cầu liên quan đến tiền, mật khẩu, OTP, tài khoản hoặc thông tin nhạy cảm, bạn cần xác minh bằng kênh khác — không chỉ dựa vào giọng nói.",
          ], [
            "Nghe giống không có nghĩa là đúng người.",
            "Yêu cầu nhạy cảm qua điện thoại hoặc tin nhắn thoại cần xác minh qua kênh độc lập.",
          ]),
          lesson("1.1.4", "Khái niệm 4: Face swap là gì?", [
            "Face swap là kỹ thuật thay khuôn mặt của một người vào hình ảnh hoặc video của người khác. Ví dụ: thay mặt người nổi tiếng vào video quảng cáo; thay mặt học sinh vào ảnh nhạy cảm; thay mặt người quen vào cảnh quay xúc phạm.",
            "Face swap có thể trở thành hành vi gây hại nếu dùng để bôi nhọ danh dự, bắt nạt, quấy rối, tống tiền, lừa đảo hoặc gây hiểu nhầm rằng một người đã xuất hiện ở nơi họ chưa từng đến.",
            "Không nên đánh giá mức độ nghiêm trọng chỉ dựa trên câu 'đó chỉ là ảnh giả'. Một hình ảnh giả vẫn có thể gây tổn thương thật, ảnh hưởng danh dự, tâm lý, học tập và công việc.",
          ], [
            "Ảnh giả vẫn có thể gây tổn thương thật.",
            "Face swap gây hại khi được dùng mà không có sự đồng ý hoặc nhằm mục đích làm hại.",
          ]),
          lesson("1.1.5", "Khái niệm 5: Lip sync là gì?", [
            "Lip sync là kỹ thuật làm cho chuyển động môi trong video khớp với một đoạn âm thanh khác. Ví dụ: lấy video thật của một người rồi chỉnh khẩu hình để trông như họ đang nói câu khác, hoặc ghép giọng AI vào video có sẵn.",
            "Dấu hiệu có thể nghi ngờ: khẩu hình không khớp hoàn toàn với âm thanh, cử động môi hơi cứng hoặc trễ, biểu cảm khuôn mặt không phù hợp nội dung lời nói, âm thanh quá sạch hoặc quá đều so với môi trường.",
            "Tuy nhiên, không nên chỉ dựa vào các dấu hiệu này. Video bị nén, mạng yếu hoặc ánh sáng kém cũng có thể tạo cảm giác 'lạ'. Cần kết hợp quan sát với kiểm chứng nguồn.",
          ], [
            "Lip sync có thể khiến người xem nghĩ 'tôi thấy họ nói câu đó mà' — nhưng điều bạn thấy có thể là kết quả chỉnh sửa.",
            "Quan sát dấu hiệu kỹ thuật luôn cần đi kèm kiểm chứng nguồn gốc.",
          ]),
          lesson("1.1.6", "Khái niệm 6: Edited media là gì?", [
            "Edited media là nội dung đã bị chỉnh sửa bằng các công cụ truyền thống hoặc AI. Không phải edited media nào cũng xấu — hầu hết ảnh và video trên mạng đều đã được chỉnh màu, cắt ngắn hoặc biên tập. Vấn đề nằm ở mục đích và mức độ gây hiểu nhầm.",
            "Ví dụ edited media có thể gây hại: cắt một câu nói ra khỏi phần giải thích phía sau; ghép hai đoạn video từ hai thời điểm khác nhau tạo cảm giác liên quan; thêm phụ đề sai; chỉnh ảnh để thêm hoặc xóa người.",
            "Ví dụ: nếu ai đó cắt từ 'Nếu chỉ nhìn một phía, chúng ta có thể nghĩ người đó sai' thành 'Người đó sai', người xem có thể hiểu hoàn toàn khác. Đây có thể không phải deepfake, nhưng vẫn là nội dung gây hiểu nhầm.",
          ], [
            "Cắt ghép có thể làm thay đổi ý nghĩa mà không cần AI.",
            "Luôn cố gắng tìm bản gốc đầy đủ trước khi tin vào đoạn trích ngắn.",
          ]),
          lesson("1.1.7", "Khái niệm 7: Repurposed media là gì?", [
            "Repurposed media là nội dung thật nhưng bị đặt sai bối cảnh. Đây là dạng gây hiểu nhầm rất phổ biến. Ví dụ: video lũ lụt ở nước khác từ nhiều năm trước được đăng lại như vừa xảy ra tại Việt Nam; hình ảnh tai nạn cũ gán vào sự kiện mới; clip hậu trường phim được chia sẻ như 'bằng chứng' thật.",
            "Repurposed media nguy hiểm vì dùng 'chất liệu thật' để tạo ra kết luận sai. Người xem có thể nghĩ: 'Video này là thật, vậy thông tin đi kèm chắc cũng thật.' Nhưng một video thật không đảm bảo chú thích của nó là thật.",
          ], [
            "Nội dung thật đặt sai bối cảnh vẫn có thể dẫn đến niềm tin sai.",
            "Câu hỏi cần hỏi: video này xuất hiện lần đầu khi nào, ở đâu?",
          ]),
          lesson("1.1.8", "Khái niệm 8: AI-generated image là gì?", [
            "AI-generated image là hình ảnh do AI tạo ra từ mô tả, dữ liệu mẫu hoặc yêu cầu của người dùng. Ví dụ: ảnh chân dung người không tồn tại, cảnh đường phố chưa từng được chụp, ảnh sản phẩm giả, ảnh hiện trường được dàn dựng.",
            "AI-generated image có thể hữu ích khi dùng làm minh họa rõ ràng, nhưng cũng có thể gây rủi ro khi dùng để tạo hồ sơ giả, giả ảnh hiện trường, minh họa sai cho tin tức hoặc tạo bằng chứng giả.",
            "Khi nhìn một hình ảnh, đừng chỉ hỏi: 'Ảnh này có bị AI tạo không?' Hãy hỏi thêm: 'Ảnh này đang được dùng để khiến mình tin điều gì?' Một hình ảnh AI có thể vô hại nếu là minh họa rõ ràng, nhưng cũng có thể nguy hiểm nếu được trình bày như bằng chứng thật.",
          ], [
            "Câu hỏi quan trọng: ảnh này đang được dùng để khiến mình tin điều gì?",
            "AI-generated image rủi ro nhất khi được trình bày như ảnh thật hoặc bằng chứng.",
          ]),
        ],
        checkpoint: checkpoint("1.1", [
          q("Deepfake là gì?", ["Nội dung hình ảnh, video hoặc âm thanh được tạo/chỉnh sửa để khiến người xem tin một người đã nói hoặc làm điều họ không thực sự làm", "Mọi nội dung sai trên Internet", "Chỉ là ảnh chỉnh màu", "Chỉ là tin nhắn lừa đảo không có hình ảnh"], 0),
          q("Điều nào sau đây là ví dụ về deepvoice?", ["Ảnh phong cảnh do AI tạo", "Đoạn giọng nói giả giống người thân yêu cầu chuyển tiền", "Bài viết sai chính tả", "Video thật được đăng lại từ năm trước"], 1),
          q("Repurposed media là gì?", ["Nội dung thật nhưng bị đặt sai bối cảnh", "Nội dung luôn do AI tạo ra", "Nội dung không có âm thanh", "Nội dung được đăng bởi tài khoản chính thức"], 0),
          q("Tất cả synthetic media đều là deepfake. Đúng hay sai?", ["Đúng", "Sai — synthetic media có thể dùng cho mục đích sáng tạo hợp lệ; chỉ thành vấn đề khi dùng để mạo danh hoặc đánh lừa", "Đúng, vì AI tạo ra là giả", "Sai, vì deepfake không liên quan đến AI"], 1),
          q("Video bị cắt ngắn làm thay đổi ý nghĩa câu nói ban đầu. Đây là:", ["Edited media", "Deepvoice", "Mã độc", "Mật khẩu yếu"], 0),
          q("Hình ảnh người không tồn tại do AI tạo được dùng làm ảnh đại diện lừa đảo. Rủi ro chính là gì?", ["Ảnh quá đẹp", "Người xem có thể tin vào danh tính giả", "Ảnh không có âm thanh", "Ảnh tải chậm"], 1),
          q("Vì sao không nên kết luận 'video thật' chỉ vì gương mặt và giọng nói giống?", ["Vì gương mặt và giọng nói có thể bị tạo hoặc chỉnh sửa bằng AI", "Vì video nào trên mạng cũng giả", "Vì chỉ ảnh mới có thể bị giả", "Vì âm thanh luôn đáng tin hơn hình ảnh"], 0),
          q("Video thật từ quốc gia khác được đăng với chú thích 'đang xảy ra tại thành phố của bạn'. Bạn nên nghi ngờ điều gì?", ["Sai bối cảnh — repurposed media", "Máy tính bị virus", "Mật khẩu bị lộ", "Điện thoại bị hỏng"], 0),
          q("Deepfake có thể nguy hiểm ngay cả khi không hoàn hảo vì:", ["Chỉ video hoàn hảo mới lừa được người", "Kẻ xấu kết hợp mạo danh với cảm xúc và áp lực thời gian để nạn nhân hành động trước khi kịp suy nghĩ", "Deepfake chỉ xuất hiện trong phim ảnh", "Người bình thường không bao giờ là mục tiêu"], 1),
          q("Câu hỏi hữu ích nhất khi xem hình ảnh nghi do AI tạo là:", ["Ảnh có nhiều màu không?", "Ảnh này đang được dùng để khiến mình tin điều gì?", "Kích thước file bao nhiêu?", "Ảnh được đăng vào buổi sáng không?"], 1),
        ]),
      },
      {
        title: "1.1.1 Vì sao deepfake ngày càng khó nhận ra?",
        lessons: [
          lesson("1.1.1.1", "Công nghệ tốt hơn, chi phí thấp hơn", [
            "Trước đây, để tạo một video giả thuyết phục, người ta cần nhiều kỹ năng, thiết bị và thời gian. Bây giờ, nhiều công cụ AI đã làm cho việc tạo ảnh, giọng nói và video trở nên dễ tiếp cận hơn rất nhiều.",
            "Mặt tích cực: người sáng tạo có thêm công cụ, doanh nghiệp tạo nội dung nhanh hơn, người khuyết tật có thể dùng công nghệ giọng nói tốt hơn. Mặt rủi ro: kẻ xấu có thể mạo danh nhanh hơn, nội dung lừa đảo có thể được tạo hàng loạt, giọng nói và khuôn mặt cá nhân có thể bị lợi dụng.",
            "Khi công cụ mạnh hơn và rẻ hơn, kỹ năng phòng vệ của người dùng cũng cần tốt hơn.",
          ], [
            "Công nghệ tạo nội dung AI ngày càng dễ tiếp cận — đây là lý do kỹ năng phòng vệ trở nên quan trọng hơn.",
          ]),
          lesson("1.1.1.2", "Dữ liệu cá nhân của chúng ta quá dễ tìm", [
            "AI cần dữ liệu để mô phỏng. Trong đời sống số, nhiều người vô tình để lại dữ liệu: ảnh chân dung, video nói chuyện, livestream, story hằng ngày, giọng nói trong clip, thông tin gia đình, trường học, sinh nhật và lịch trình.",
            "Không phải cứ đăng ảnh hay video là nguy hiểm. Nhưng khi dữ liệu cá nhân quá công khai, kẻ xấu có thêm nguyên liệu để tạo tài khoản giả, giả giọng nói, dựng kịch bản lừa đảo có vẻ rất riêng tư, hoặc chọn đúng thời điểm để gây áp lực.",
          ], [
            "Deepfake không chỉ dùng hình ảnh của bạn — nó có thể dùng cả thói quen, quan hệ và thông tin bạn để lộ.",
          ]),
          lesson("1.1.1.3", "Nội dung lan nhanh hơn khả năng kiểm chứng", [
            "Một nội dung gây sốc có thể lan đi rất nhanh — chỉ cần vài phút, một video có thể xuất hiện trong nhóm gia đình, nhóm lớp, nhóm công việc và nền tảng video ngắn. Trong khi đó, kiểm chứng cần thời gian: tìm nguồn đầu tiên, xem bối cảnh, so sánh nguồn khác, kiểm tra tài khoản đăng.",
            "Đây là khoảng cách nguy hiểm: nội dung giả thường chạy nhanh hơn sự thật. Kẻ xấu thường thêm vào câu 'chia sẻ ngay trước khi bị xóa', 'cơ hội chỉ còn hôm nay', 'nếu không làm ngay sẽ mất tiền'. Những câu này tạo áp lực. Khi bạn thấy áp lực phải hành động ngay, hãy xem đó là dấu hiệu cảnh báo.",
          ], [
            "Tốc độ lan truyền thường nhanh hơn tốc độ kiểm chứng — đây là lợi thế của kẻ xấu.",
            "Áp lực hành động ngay là dấu hiệu cảnh báo, không phải lý do để hành động nhanh hơn.",
          ]),
          lesson("1.1.1.4", "Mắt thường có giới hạn", [
            "Nhiều hướng dẫn nói deepfake có thể bị nhận ra qua: mắt chớp kỳ lạ, răng méo, tóc không tự nhiên, bóng đổ sai, khẩu hình lệch, giọng nói đều đều. Những dấu hiệu này có thể hữu ích và sẽ được học kỹ hơn ở Module 4.",
            "Nhưng có một vấn đề: công nghệ ngày càng tốt hơn, còn môi trường xem nội dung ngày càng phức tạp. Video thật cũng có thể trông lạ vì mạng yếu, camera kém, ánh sáng xấu, video bị nén, hoặc người nói đang mệt. Ngược lại, một video giả có thể trông rất mượt.",
            "Nếu chỉ dựa vào cảm giác 'trông thật' hoặc 'trông giả', bạn có thể bị sai theo cả hai hướng: tin nhầm nội dung giả, hoặc phủ nhận nhầm nội dung thật. DEEPFENSE BASIC không dạy bạn trở thành 'máy dò deepfake bằng mắt' — khóa học này dạy bạn trở thành người ra quyết định tốt hơn.",
          ], [
            "Mắt thường có giới hạn — 'trông thật' không đồng nghĩa là thật.",
            "Quan sát dấu hiệu kỹ thuật chỉ là một phần; kiểm chứng nguồn và bối cảnh quan trọng không kém.",
          ]),
          lesson("1.1.1.5", "Công cụ phát hiện cũng có giới hạn", [
            "Các công cụ phát hiện deepfake có thể hữu ích, nhưng không nên xem là phán quyết cuối cùng. Một công cụ có thể báo: '70% có khả năng là AI', 'Có dấu hiệu chỉnh sửa', hoặc 'Không phát hiện dấu hiệu bất thường'. Nhưng những kết quả này không đồng nghĩa với 'chắc chắn giả' hay 'chắc chắn thật'.",
            "Vì sao? Vì công cụ phát hiện phụ thuộc vào dữ liệu huấn luyện, loại deepfake đã thấy, chất lượng file đầu vào, và kỹ thuật tạo giả mới chưa được cập nhật. Kết quả từ detector nên được xem là một tín hiệu tham khảo, không phải kết luận cuối cùng.",
            "Cách dùng hợp lý: quan sát nội dung → kiểm tra nguồn → xác minh qua kênh độc lập → dùng công cụ nếu phù hợp → tổng hợp nhiều tín hiệu trước khi quyết định.",
          ], [
            "Công cụ phát hiện deepfake cho tín hiệu tham khảo, không phải kết luận cuối cùng.",
            "Nếu công cụ báo 'không phát hiện deepfake', bạn vẫn cần kiểm chứng thêm nếu nội dung liên quan đến tiền, danh dự hoặc an toàn.",
          ]),
          lesson("1.1.1.6", "Vấn đề không chỉ là thật hay giả", [
            "Khi gặp nội dung nghi vấn, nhiều người muốn câu trả lời ngay: 'Thật hay giả?' Nhưng trong thực tế, có nhiều trạng thái hơn: (1) Có bằng chứng tốt nội dung là thật; (2) Có bằng chứng tốt nội dung là giả; (3) Nội dung thật nhưng sai bối cảnh; (4) Nội dung bị cắt ghép làm đổi nghĩa; (5) Một phần thật, một phần chưa rõ; (6) Chưa đủ dữ liệu để kết luận.",
            "Trạng thái số 6 rất quan trọng. Nhiều khi câu trả lời an toàn nhất không phải là 'Tôi biết chắc đây là giả' mà là 'Tôi chưa đủ bằng chứng để tin, chia sẻ hoặc hành động.' Trong thế giới số, biết nói 'chưa đủ dữ liệu' là một kỹ năng mạnh.",
          ], [
            "'Chưa đủ dữ liệu để kết luận' là một lập trường an toàn và hợp lý.",
            "Không ép bản thân phải kết luận ngay khi chưa đủ thông tin.",
          ]),
          lesson("1.1.1.7", "Một rủi ro ngược: Khi sự thật bị gọi là deepfake", [
            "Deepfake không chỉ làm người ta tin vào điều giả — nó còn có thể làm người ta nghi ngờ điều thật. Khi công chúng biết rằng video và âm thanh có thể bị làm giả, một người có thể phủ nhận nội dung thật bằng cách nói: 'Đó là deepfake.' Hiện tượng này đôi khi được gọi là 'liar's dividend': kẻ nói dối có thêm lợi thế vì mọi người biết nội dung số có thể bị làm giả.",
            "Vì vậy, mục tiêu không phải là nghi ngờ tất cả — mục tiêu là kiểm chứng tốt hơn. Một xã hội khỏe mạnh là nơi con người biết hỏi: Bằng chứng đến từ đâu? Có nguồn độc lập không? Có ai có động cơ làm sai lệch không? Có đủ cơ sở để kết luận chưa?",
          ], [
            "Deepfake có thể bị dùng để phủ nhận cả nội dung thật ('liar's dividend').",
            "Mục tiêu là kiểm chứng tốt hơn, không phải nghi ngờ tất cả.",
          ]),
          lesson("1.1.1.8", "Bài học lớn: Tại sao deepfake ngày càng khó nhận ra", [
            "Deepfake ngày càng khó nhận ra vì 4 lý do chính: (1) Công nghệ tạo giả tốt hơn và dễ tiếp cận hơn; (2) Dữ liệu cá nhân của chúng ta quá sẵn trên mạng; (3) Nội dung lan nhanh hơn khả năng kiểm chứng; (4) Cả mắt thường lẫn công cụ phát hiện đều có giới hạn.",
            "Vì vậy, kỹ năng quan trọng nhất không phải là nhìn một video rồi đoán thật giả trong 3 giây. Kỹ năng quan trọng nhất là biết dừng lại, đặt câu hỏi đúng và kiểm chứng qua nhiều tín hiệu.",
          ], [
            "Trong thời đại deepfake, người an toàn không phải người đoán nhanh nhất — mà là người biết kiểm chứng trước khi hành động.",
          ]),
        ],
        checkpoint: null,
      },
      {
        title: "1.2 Thực hành: Phân loại nội dung số",
        lessons: [
          lesson("1.2.0", "Hướng dẫn thực hành", [
            "Trong phần này, bạn sẽ xem các thẻ tình huống và phân loại mỗi tình huống vào nhóm phù hợp nhất: Deepfake, Deepvoice, Synthetic media/AI-generated, Edited media, Repurposed media, hoặc Chưa đủ dữ liệu để kết luận.",
            "Một số tình huống có thể thuộc nhiều nhóm. Trong trường hợp đó, hãy chọn nhóm phù hợp nhất với rủi ro chính. Không phải nhiệm vụ của bạn là trở thành chuyên gia pháp y số — điều quan trọng là biết khi nào cần chậm lại, kiểm chứng và không để cảm xúc quyết định thay mình.",
          ], [
            "Nhận diện loại nội dung giúp bạn đặt câu hỏi đúng, không phải để trở thành chuyên gia.",
          ]),
          lesson("1.2.1", "Thẻ tình huống 1–6", [
            "Thẻ 1: Video người nổi tiếng mời đầu tư vào ứng dụng lạ — người này chưa đăng thông tin đó trên kênh chính thức. → Deepfake hoặc chưa đủ dữ liệu: Cần kiểm tra kênh chính thức và dấu hiệu mạo danh.",
            "Thẻ 2: Ảnh chân dung 'chuyên gia tài chính' trông rất thật, nhưng tìm kiếm không thấy người này tồn tại ngoài website quảng cáo. → AI-generated: Có thể là danh tính giả dùng ảnh AI.",
            "Thẻ 3: Ghi âm giống giọng người thân yêu cầu chuyển tiền ngay, nhưng không qua kênh thường dùng. → Deepvoice: Xác minh bằng số đã lưu hoặc gặp trực tiếp.",
            "Thẻ 4: Clip 7 giây cắt từ bài phát biểu dài, làm người nói có vẻ nói ngược ý ban đầu. → Edited media: Cần xem bản đầy đủ và bối cảnh.",
            "Thẻ 5: Video tai nạn từ năm trước được đăng lại như vừa xảy ra hôm nay. → Repurposed media: Nội dung thật nhưng bối cảnh sai.",
            "Thẻ 6: Ảnh sản phẩm do AI tạo được ghi rõ là 'ảnh minh họa'. → AI-generated, rủi ro thấp khi minh bạch: Không phải mọi nội dung AI đều xấu — vấn đề là minh bạch và mục đích sử dụng.",
          ], [
            "Cùng loại hình ảnh AI có thể vô hại (minh họa rõ ràng) hoặc nguy hiểm (trình bày như bằng chứng thật).",
          ]),
          lesson("1.2.2", "Thẻ tình huống 7–12", [
            "Thẻ 7: Video gọi trực tiếp bị giật, hình mờ, người gọi yêu cầu đọc OTP. → Chưa đủ dữ liệu xác nhận deepfake, nhưng rủi ro cao: Dù có phải deepfake hay không, yêu cầu OTP là dấu hiệu nguy hiểm — không cần chờ xác nhận deepfake mới dừng lại.",
            "Thẻ 8: Ảnh học sinh bị ghép vào nội dung nhạy cảm và lan truyền trong nhóm chat. → Face swap/deepfake image: Không lan truyền, báo cáo và hỗ trợ người bị hại.",
            "Thẻ 9: Video thật của người đang cười được ghép phụ đề sai để tạo cảm giác họ chế giễu nạn nhân. → Edited media: Phụ đề cũng có thể làm sai lệch ý nghĩa.",
            "Thẻ 10: Tài khoản mới, ảnh đẹp, ít bạn bè, nhắn tin rủ đầu tư và gửi video 'bằng chứng lợi nhuận'. → Chưa đủ dữ liệu về loại media, nhưng có dấu hiệu lừa đảo rõ ràng: Quan trọng là nhận diện rủi ro, không nhất thiết phải gọi đúng tên công nghệ.",
            "Thẻ 11: Video nhân vật ảo dạy tiếng Anh, được ghi rõ là nhân vật AI. → AI-generated, rủi ro thấp: AI có thể hữu ích khi người xem biết rõ đó là nội dung mô phỏng.",
            "Thẻ 12: Video chính trị gây sốc từ tài khoản không rõ nguồn, không có bản gốc, không có nguồn độc lập. → Chưa đủ dữ liệu để kết luận: Không chia sẻ khi chưa đủ bằng chứng, đặc biệt với nội dung có thể gây phẫn nộ xã hội.",
          ], [
            "Nhận diện dấu hiệu rủi ro quan trọng hơn gọi đúng tên công nghệ.",
            "Hành động an toàn nhất khi chưa chắc: dừng lại, không chia sẻ.",
          ]),
          lesson("1.2.3", "Phản hồi tổng kết", [
            "Nếu bạn phân loại chưa đúng hết, điều đó bình thường. Trong đời thật, ranh giới giữa các loại nội dung có thể không rõ ràng. Một video có thể vừa là deepfake, vừa có phụ đề sai, vừa được đăng sai bối cảnh.",
            "Điều quan trọng không phải là gọi tên hoàn hảo ngay từ đầu. Điều quan trọng là bạn bắt đầu biết hỏi: Nội dung này đang khiến mình tin điều gì? Có ai đang bị mạo danh không? Có ai có thể bị hại không? Mình có đủ bằng chứng để tin hoặc chia sẻ chưa? Hành động an toàn nhất bây giờ là gì?",
          ], [
            "Kỹ năng đặt câu hỏi đúng quan trọng hơn kỹ năng phân loại chính xác 100%.",
            "Module 2 sẽ đi sâu vào: vì sao con người dễ bị lừa ngay cả khi đã biết deepfake tồn tại?",
          ]),
        ],
        checkpoint: null,
      },
    ],
    quiz: [
      q("Deepfake là gì?", ["Nội dung hình ảnh, video hoặc âm thanh được tạo/biến đổi để khiến người xem tin một người đã nói hoặc làm điều họ không làm", "Một loại tường lửa mạng", "Cách tăng độ phân giải video", "Một định dạng âm thanh mới"], 0),
      q("Điều nào là ví dụ về deepvoice?", ["Ảnh phong cảnh do AI tạo", "Đoạn giọng nói giả giống người thân yêu cầu chuyển tiền", "Bài viết sai chính tả", "Video thật được đăng lại từ năm trước"], 1),
      q("Repurposed media là gì?", ["Nội dung thật nhưng bị đặt sai bối cảnh", "Nội dung luôn do AI tạo ra toàn bộ", "Nội dung không có âm thanh", "Nội dung được đăng bởi tài khoản chính thức"], 0),
      q("Không phải mọi synthetic media đều là deepfake vì:", ["Synthetic media chỉ là ảnh tĩnh", "Synthetic media có thể dùng cho mục đích hợp lệ như giáo dục hoặc sáng tạo", "Deepfake chỉ liên quan đến âm thanh", "Synthetic media luôn minh bạch"], 1),
      q("Video bị cắt ngắn làm thay đổi ý nghĩa câu nói ban đầu là ví dụ về:", ["Edited media", "Deepvoice", "Repurposed media", "Synthetic media"], 0),
      q("Hình ảnh người không tồn tại do AI tạo dùng làm ảnh đại diện lừa đảo. Rủi ro chính là:", ["Ảnh quá đẹp khiến người chú ý", "Người xem có thể tin vào danh tính giả", "Ảnh tải chậm làm mất kiên nhẫn", "Ảnh không có âm thanh"], 1),
      q("Vì sao không nên kết luận 'thật' chỉ vì gương mặt và giọng nói giống?", ["Gương mặt và giọng nói có thể bị tạo hoặc chỉnh sửa bằng AI", "Vì video nào trên mạng cũng giả", "Vì chỉ ảnh mới có thể bị giả", "Vì âm thanh luôn đáng tin hơn hình ảnh"], 0),
      q("Video thật từ quốc gia khác được đăng kèm chú thích 'đang xảy ra tại thành phố của bạn'. Đây là dấu hiệu của:", ["Sai bối cảnh — repurposed media", "Máy tính bị virus", "Mật khẩu bị lộ", "Video bị nén xấu"], 0),
      q("Deepfake có thể nguy hiểm ngay cả khi không hoàn hảo vì:", ["Chỉ video hoàn hảo mới lừa được người xem", "Kẻ xấu kết hợp mạo danh với cảm xúc và áp lực thời gian để nạn nhân hành động trước khi kịp suy nghĩ", "Deepfake chỉ xuất hiện trong phim ảnh", "Người bình thường không bao giờ là mục tiêu"], 1),
      q("Câu hỏi hữu ích nhất khi xem hình ảnh nghi do AI tạo là:", ["Ảnh có nhiều màu không?", "Ảnh này đang được dùng để khiến mình tin điều gì?", "Kích thước file bao nhiêu?", "Ảnh được đăng vào buổi sáng không?"], 1),
    ],
  },
  // ─── MODULE 2 ───────────────────────────────────────────────
  {
    id: 2,
    part: "foundation",
    title: "Vì sao con người dễ bị lừa?",
    duration: "85-95 phút",
    level: "Foundation",
    scenario: "An đã biết deepfake là gì sau Module 1. Nhưng buổi tối, điện thoại reo — màn hình hiện tên người thân. Ở đầu dây là giọng nói quen thuộc, hơi run: 'An ơi, giúp với. Đừng hỏi nhiều. Chuyển giúp một khoản ngay bây giờ. Gấp lắm.' Biết một điều và làm đúng trong lúc căng thẳng là hai chuyện khác nhau.",
    outcomes: [
      "Hiểu vì sao con người có thể bị lừa ngay cả khi đã biết deepfake tồn tại.",
      "Nhận diện được các 'nút bấm cảm xúc' thường dùng trong lừa đảo: khẩn cấp, thân quen, quyền lực và lợi ích.",
      "Biết vì sao hình ảnh, video và giọng nói tạo cảm giác rất thuyết phục.",
      "Hiểu rằng phản ứng vội vàng thường nguy hiểm hơn 'không biết công nghệ'.",
      "Thực hành xử lý một cuộc gọi khẩn cấp nghi giả mạo.",
    ],
    sections: [
      {
        title: "2.1 Bốn nút bấm cảm xúc",
        lessons: [
          lesson("2.0.0", "Câu chuyện dẫn nhập: An nghĩ mình đủ tỉnh táo", [
            "Sau Module 1, An đã biết deepfake là gì. An biết video có thể bị giả, giọng nói có thể bị mô phỏng, ảnh thật vẫn có thể bị đặt sai bối cảnh. An cũng biết không nên tin mọi thứ chỉ vì nó trông thuyết phục.",
            "Nhưng biết một điều và làm đúng trong lúc căng thẳng là hai chuyện khác nhau. Buổi tối, An đang chuẩn bị đi ngủ. Điện thoại reo. Màn hình hiện tên một người thân. An bắt máy. Ở đầu dây là một giọng nói quen thuộc, hơi run: 'An ơi, giúp với. Đừng hỏi nhiều. Chuyển giúp một khoản ngay bây giờ. Gấp lắm.' Người kia nói tiếp: 'Máy sắp hết pin. Không gọi ai khác được. Chuyển nhanh giúp nhé.'",
            "Trong vài giây đầu tiên, An không nghĩ đến deepfake. An nghĩ đến người thân. Đó là điều rất con người. Kẻ xấu không cần bạn ngu ngốc — chúng chỉ cần bạn đang lo, đang vội, đang tin, đang sợ hoặc đang muốn giúp.",
          ], [
            "Biết về deepfake không đủ để bảo vệ bạn — kỹ năng phản ứng đúng trong lúc căng thẳng mới quan trọng.",
          ]),
          lesson("2.1.1", "Nút bấm 1: Khẩn cấp", [
            "Khẩn cấp là một trong những công cụ mạnh nhất của lừa đảo. Khi con người cảm thấy thời gian sắp hết, não có xu hướng chuyển sang chế độ phản ứng nhanh để giảm căng thẳng. Kẻ xấu hiểu điều này.",
            "Chúng thường nói: 'Chỉ còn 5 phút', 'Nếu không làm ngay sẽ mất tiền', 'Tài khoản của bạn sắp bị khóa', 'Người thân của bạn đang gặp nguy hiểm', 'Đừng tắt máy', 'Không được nói với ai.' Khẩn cấp làm bạn ít kiểm tra hơn, ngại hỏi lại, và thấy việc dừng lại giống một sự chậm trễ nguy hiểm.",
            "Ví dụ: một cuộc gọi video ngắn hiện gương mặt giống người thân nói cần tiền ngay. Nếu bạn chuyển tiền trong 2 phút, bạn có thể mất tiền. Nếu bạn dừng lại 2 phút để gọi lại số đã lưu, bạn có thể phát hiện người thân vẫn an toàn.",
          ], [
            "Càng bị ép phải làm ngay, càng cần chậm lại.",
            "Trong an toàn số, dừng lại thường chính là hành động nhanh nhất để tránh thiệt hại.",
          ]),
          lesson("2.1.2", "Nút bấm 2: Thân quen", [
            "Con người có xu hướng tin người quen hơn người lạ — đây là điều bình thường. Nhưng trên không gian số, sự thân quen có thể bị giả mạo. Kẻ xấu có thể dùng: ảnh đại diện quen thuộc, tên tài khoản giống thật, tài khoản thật đã bị chiếm quyền, giọng nói mô phỏng, video ngắn giả mạo, thông tin cá nhân lấy từ mạng xã hội.",
            "Một tin nhắn từ tài khoản của bạn bè không luôn đồng nghĩa với bạn bè đang nhắn. Một giọng nói giống người thân không luôn đồng nghĩa với đúng người thân. Ví dụ: 'Mình đang kẹt chút việc. Chuyển giúp mình 2 triệu vào tài khoản này. Tối mình gửi lại.' Ảnh đại diện đúng là bạn của bạn. Nhưng cách nhắn hơi khác. Người đó né gọi điện.",
            "Câu hỏi không phải là 'Mình có quen tài khoản này không?' mà là 'Mình có chắc đúng người đang điều khiển tài khoản này không?'",
          ], [
            "Tài khoản quen không đảm bảo người dùng thật đang ở phía sau.",
          ]),
          lesson("2.1.3", "Nút bấm 3: Quyền lực", [
            "Con người thường phản ứng nhanh hơn khi người yêu cầu có vẻ có thẩm quyền: công an, tòa án, ngân hàng, nhà trường, lãnh đạo, cơ quan nhà nước, người nổi tiếng hoặc chuyên gia. Kẻ xấu có thể giả danh những vai trò này để khiến bạn sợ hoặc phục tùng.",
            "Chúng có thể nói: 'Bạn liên quan đến một vụ án', 'Tài khoản có giao dịch bất thường', 'Bạn phải làm theo hướng dẫn để chứng minh trong sạch', 'Không được tiết lộ với ai vì đang điều tra', 'Nếu không hợp tác sẽ chịu trách nhiệm.'",
            "Khi deepfake hoặc deepvoice được thêm vào, cảm giác quyền lực càng mạnh hơn. Một giọng nói giống lãnh đạo có thể khiến nhân viên chuyển tiền. Một cuộc gọi giống cơ quan chức năng có thể khiến nạn nhân cung cấp thông tin cá nhân.",
          ], [
            "Người có thẩm quyền thật không cần bạn bỏ qua mọi quy trình an toàn.",
          ]),
          lesson("2.1.4", "Nút bấm 4: Lợi ích", [
            "Không phải lừa đảo nào cũng dùng nỗi sợ — nhiều lừa đảo dùng hy vọng. Kẻ xấu có thể hứa: lợi nhuận cao, việc làm tốt, học bổng, quà tặng, mã giảm giá, cơ hội đầu tư, cách kiếm tiền dễ. Deepfake có thể làm lời hứa trông đáng tin hơn.",
            "Ví dụ: một video người nổi tiếng nói 'Tôi cũng đang dùng nền tảng này'; một 'chuyên gia' có gương mặt đẹp, giọng tự tin nói 'Tôi sẽ hướng dẫn bạn đạt lợi nhuận ổn định'; một tài khoản giả dùng ảnh AI nói 'Mình đã nhận được học bổng này, bạn đăng ký nhanh đi.'",
            "Lợi ích làm chúng ta muốn tin. Khi một nội dung hứa hẹn điều quá tốt, quá nhanh, quá dễ — hãy kiểm tra kỹ hơn.",
          ], [
            "Cơ hội thật không cần bạn tắt khả năng nghi ngờ.",
          ]),
          lesson("2.1.5", "Deepfake thường không đi một mình", [
            "Deepfake hiếm khi là toàn bộ cuộc tấn công — nó thường chỉ là một mảnh trong một kịch bản lớn hơn. Một vụ lừa đảo có thể gồm: (1) Thu thập thông tin cá nhân từ mạng xã hội; (2) Tạo tài khoản giả hoặc chiếm quyền tài khoản thật; (3) Dùng ảnh, giọng nói hoặc video giả để tạo niềm tin; (4) Gây áp lực bằng thời gian, tiền bạc, xấu hổ hoặc sợ hãi; (5) Dẫn nạn nhân sang kênh riêng; (6) Yêu cầu chuyển tiền, gửi OTP, cài app hoặc cung cấp thông tin.",
            "Vì vậy, câu hỏi đúng không chỉ là 'Video này có phải deepfake không?' mà là 'Toàn bộ tình huống này có đang đẩy mình vào một hành động nguy hiểm không?' Một cuộc gọi có thể không phải deepfake, nhưng vẫn là lừa đảo. Một hình ảnh có thể không phải AI, nhưng vẫn bị dùng sai bối cảnh. Một tài khoản có thể thật, nhưng đã bị chiếm quyền.",
          ], [
            "Mục tiêu của bạn không phải là gọi tên chính xác công nghệ trong 10 giây — mà là phát hiện rủi ro đủ sớm để không làm điều nguy hiểm.",
          ]),
          lesson("2.1.6", "Sáu dấu hiệu ngôn ngữ cần cảnh giác", [
            "Kẻ xấu thường để lại dấu hiệu trong cách nói hoặc cách viết. Dấu hiệu 1 — 'Làm ngay': 'Chuyển ngay', 'Xác nhận ngay', 'Gửi mã ngay' → áp lực thời gian. Dấu hiệu 2 — 'Đừng nói với ai': 'Việc này đang bí mật', 'Đừng gọi ai khác', 'Đừng báo gia đình' → cô lập nạn nhân.",
            "Dấu hiệu 3 — 'Nếu không thì...': 'Tài khoản sẽ bị khóa', 'Người thân sẽ nguy hiểm' → đe dọa. Dấu hiệu 4 — 'Chỉ bạn được chọn': 'Suất này chỉ dành cho bạn' → đánh vào cảm giác đặc biệt. Dấu hiệu 5 — 'Quá tốt để bỏ lỡ': 'Lợi nhuận chắc chắn', 'Không có rủi ro' → hứa hẹn bất thường. Dấu hiệu 6 — 'Xấu hổ nên đừng hỏi': 'Nếu không muốn ảnh này lan ra thì làm theo' → tống tiền hoặc thao túng bằng xấu hổ.",
          ], [
            "Kẻ xấu không chỉ giả hình ảnh và giọng nói — chúng còn thiết kế câu chữ để điều khiển phản ứng của bạn.",
          ]),
        ],
        checkpoint: checkpoint("2.1", [
          q("Một người gọi nói giống người thân yêu cầu chuyển tiền trong 5 phút. 'Nút bấm' chính đang được dùng là gì?", ["Khẩn cấp", "Giải trí", "Học thuật", "Tò mò"], 0),
          q("Một tài khoản giống bạn thân nhắn mượn tiền, nhưng né gọi điện và bảo đang rất bận. Rủi ro lớn nhất là gì?", ["Tài khoản có thể bị chiếm quyền hoặc bị giả mạo", "Điện thoại của bạn chắc chắn bị hỏng", "Bạn thân chắc chắn đã đổi tính cách", "Tin nhắn ngắn thì luôn an toàn"], 0),
          q("Câu nào sau đây là dấu hiệu cô lập nạn nhân?", ["Bạn có thể kiểm tra thêm", "Đừng nói với ai, việc này bí mật", "Hãy gọi tổng đài chính thức", "Bạn có thể suy nghĩ rồi trả lời sau"], 1),
          q("Một video người nổi tiếng hứa lợi nhuận cao, không rủi ro, chỉ cần đăng ký ngay. 'Nút bấm' chính là gì?", ["Lợi ích", "Lịch sử", "Thể thao", "Âm nhạc"], 0),
          q("Một người tự xưng là cơ quan chức năng yêu cầu bạn cài app lạ để 'chứng minh trong sạch'. Dấu hiệu nào đáng lo nhất?", ["Dùng quyền lực để ép bạn bỏ qua quy trình an toàn", "Người đó nói chuyện nghiêm túc", "Cuộc gọi diễn ra vào buổi sáng", "Bạn không thích app mới"], 0),
          q("Điều nào đúng nhất?", ["Nếu cuộc gọi không phải deepfake thì chắc chắn an toàn", "Một cuộc gọi có thể không phải deepfake nhưng vẫn là lừa đảo", "Chỉ deepfake mới nguy hiểm", "Tin nhắn không có video thì không thể lừa đảo"], 1),
          q("Khi thấy câu 'chia sẻ ngay trước khi bị xóa', bạn nên hiểu gì?", ["Đây là tín hiệu cần kiểm chứng trước khi chia sẻ", "Đây luôn là tin chính xác", "Đây là bằng chứng nội dung quan trọng", "Đây là lý do phải chia sẻ nhanh"], 0),
          q("Một yêu cầu liên quan đến OTP nên được xử lý thế nào?", ["Gửi nếu người yêu cầu nghe giống người quen", "Gửi nếu đang vội", "Không cung cấp OTP qua cuộc gọi/tin nhắn; xác minh qua kênh chính thức", "Gửi một phần mã để kiểm tra"], 2),
          q("Vì sao kẻ xấu thường yêu cầu 'đừng nói với ai'?", ["Để bạn không nhận được lời khuyên hoặc kiểm chứng từ người khác", "Vì chúng muốn bảo vệ quyền riêng tư của bạn", "Vì mọi tình huống khẩn cấp đều phải bí mật", "Vì nói với người khác sẽ làm điện thoại chậm hơn"], 0),
          q("Khi một nội dung làm bạn sợ, giận hoặc muốn hành động ngay, phản xạ an toàn nhất là gì?", ["Dừng lại và kiểm chứng", "Chia sẻ ngay", "Chuyển tiền trước, kiểm tra sau", "Làm theo cảm xúc đầu tiên"], 0),
        ]),
      },
      {
        title: "2.1.1 Hiệu ứng 'tôi thấy tận mắt'",
        lessons: [
          lesson("2.1.1.1", "Vì sao chúng ta tin thứ mình nhìn thấy?", [
            "Con người dựa vào giác quan để hiểu thế giới. Nếu thấy trời mưa, ta tin là trời đang mưa. Nếu thấy một người nói trong video, ta thường tin người đó đã nói như vậy. Trong đời sống bình thường, phản xạ này rất hữu ích.",
            "Nhưng trên không gian số, hình ảnh và âm thanh không còn là 'dấu vết trực tiếp' đơn giản như trước. Một video có thể là: quay thật; quay thật nhưng bị cắt; đăng sai bối cảnh; ghép thêm phụ đề sai; chỉnh khẩu hình; thay mặt; thêm giọng giả; hoặc tạo hoàn toàn bằng AI.",
            "Vì vậy, câu 'tôi thấy tận mắt' trong môi trường số chỉ có nghĩa là: 'Tôi đã thấy một nội dung được hiển thị trên màn hình.' Nó chưa đủ để kết luận: 'Sự việc đó chắc chắn đã xảy ra đúng như nội dung thể hiện.'",
          ], [
            "Trong môi trường số, 'thấy tận mắt' chỉ có nghĩa là thấy một nội dung trên màn hình — chưa đủ để kết luận sự việc.",
          ]),
          lesson("2.1.1.2", "Video có sức nặng cảm xúc", [
            "Video kết hợp hình ảnh, chuyển động, giọng nói, biểu cảm và bối cảnh. Vì vậy, video thường tạo cảm giác 'thật' mạnh hơn văn bản. Một đoạn video 10 giây có thể khiến người xem tin, giận, sợ, thương, xấu hổ, muốn chia sẻ hoặc muốn hành động ngay.",
            "Kẻ xấu có thể lợi dụng điều này bằng cách tạo nội dung ngắn, dễ lan truyền và đánh mạnh vào cảm xúc. Ví dụ: clip 'người nổi tiếng thú nhận bí mật', video 'học sinh làm điều sai trái', đoạn 'lãnh đạo phát ngôn gây sốc', cảnh 'tai nạn vừa xảy ra', cuộc gọi 'người thân đang nguy hiểm'.",
            "Khi video càng ngắn và càng gây sốc, bạn càng có ít bối cảnh để đánh giá.",
          ], [
            "Video ngắn có thể tạo cảm xúc dài.",
          ]),
          lesson("2.1.1.3", "Giọng nói chạm vào niềm tin cá nhân", [
            "Giọng nói có một vai trò đặc biệt. Ta nhận ra người thân qua giọng. Ta cảm nhận sự lo lắng qua giọng. Ta tin một người quen vì 'đúng giọng đó mà'. Deepvoice nguy hiểm vì nó chạm vào lớp niềm tin rất cá nhân này. Một câu nói ngắn như 'Con ơi, giúp mẹ với' có thể mạnh hơn một tin nhắn dài.",
            "Nhưng giọng nói cũng có thể bị: cắt từ ngữ cảnh khác, ghép lại, giả lập bằng AI, phát qua cuộc gọi chất lượng thấp để che lỗi, hoặc kết hợp với thông tin cá nhân để tăng độ tin.",
            "Vì vậy, với các yêu cầu rủi ro cao, hãy đổi câu hỏi. Không hỏi 'Giọng này có giống không?' mà hỏi 'Yêu cầu này có cần xác minh độc lập không?' Nếu yêu cầu liên quan đến tiền, tài khoản, OTP, giấy tờ hoặc thông tin nhạy cảm, câu trả lời gần như luôn là có.",
          ], [
            "Với yêu cầu nhạy cảm, đừng hỏi 'giọng này có giống không?' — hãy hỏi 'có cần xác minh độc lập không?'",
          ]),
          lesson("2.1.1.4", "Niềm tin nhóm có thể làm nội dung trông thật hơn", [
            "Một nội dung thường thuyết phục hơn khi nhiều người xung quanh cũng tin: video có nhiều lượt thích, bình luận xác nhận, bạn bè chia sẻ, nhóm chat đang bàn tán sôi nổi, một người có uy tín trong nhóm nói 'chắc thật'.",
            "Đây là áp lực xã hội. Nhưng lượt thích, bình luận và chia sẻ không phải bằng chứng chắc chắn. Chúng có thể đến từ người thật nhưng cũng bị nhầm, tài khoản giả, bình luận seeding, hoặc người chia sẻ vì cảm xúc.",
            "Nếu một nội dung sai được nhiều người tin, nó vẫn sai. Nếu một nội dung chưa được kiểm chứng được nhiều người chia sẻ, nó vẫn chưa được kiểm chứng.",
          ], [
            "Đám đông có thể làm nội dung lan xa, nhưng không tự động làm nội dung đúng hơn.",
          ]),
          lesson("2.1.1.5", "Khi nào cần nghiêm túc kiểm chứng?", [
            "Không phải mọi nội dung trên mạng đều cần bạn điều tra kỹ. Nếu một ảnh AI được ghi rõ là minh họa cho bài học, rủi ro có thể thấp. Nếu một video giải trí được đăng rõ là parody, bạn không cần phản ứng như với một vụ lừa đảo.",
            "Nhưng bạn cần kiểm chứng nghiêm túc khi nội dung: yêu cầu chuyển tiền; yêu cầu OTP, mật khẩu, mã xác minh; yêu cầu cài ứng dụng; liên quan đến danh dự hoặc hình ảnh nhạy cảm của một người; kêu gọi chia sẻ gấp; gây phẫn nộ xã hội; hoặc mạo danh người thân, giáo viên, lãnh đạo, cơ quan chức năng.",
            "Nguyên tắc đơn giản: rủi ro càng cao, bằng chứng càng phải chắc.",
          ], [
            "Rủi ro càng cao, bằng chứng càng phải chắc.",
          ]),
          lesson("2.1.1.6", "Câu trả lời trưởng thành: 'Tôi chưa đủ dữ liệu'", [
            "Trong nhiều tình huống, người khác sẽ hỏi bạn: 'Theo bạn cái này thật hay giả?' Bạn có thể thấy áp lực phải trả lời ngay. Nhưng câu trả lời tốt nhất đôi khi là: 'Tôi chưa đủ dữ liệu để kết luận.' Đây không phải là né tránh — đây là tư duy có trách nhiệm.",
            "Bạn có thể nói tiếp: 'Cần xem nguồn gốc video', 'Cần kiểm tra kênh chính thức', 'Cần hỏi người liên quan qua kênh khác', 'Cần xem bản đầy đủ', 'Hiện tại không nên chia sẻ thêm.' Câu 'chưa đủ dữ liệu' giúp bạn tránh hai lỗi: tin nhầm nội dung giả, và phủ nhận nhầm nội dung thật.",
            "Trong thời đại deepfake, sự thận trọng không làm bạn yếu đi — nó làm bạn đáng tin hơn.",
          ], [
            "Thấy, nghe và thấy nhiều người chia sẻ vẫn chưa đủ. Với nội dung rủi ro cao, hãy kiểm chứng trước khi tin, chia sẻ hoặc hành động.",
          ]),
        ],
        checkpoint: null,
      },
      {
        title: "2.2 Case tương tác: Cuộc gọi lúc 22:47",
        lessons: [
          lesson("2.2.0", "Bối cảnh: An nhận cuộc gọi nghi vấn", [
            "Đã 22:47. An đang chuẩn bị đi ngủ thì điện thoại reo. Màn hình hiển thị tên: Minh Anh — em họ của An, hai người thỉnh thoảng nhắn tin, không gọi video thường xuyên.",
            "Màn hình hiện khuôn mặt Minh Anh. Hình hơi mờ, ánh sáng yếu. Âm thanh có lúc bị vỡ. Người gọi nói rất nhanh: 'Anh An, giúp em với. Em vừa va chạm xe. Em cần chuyển khoản gấp để xử lý. Điện thoại em sắp hết pin. Anh chuyển giúp em 5 triệu vào số tài khoản này được không?' Khi An hỏi 'Em đang ở đâu?', người kia đáp: 'Em không nói rõ được. Gấp lắm. Anh đừng gọi cho mẹ em, mẹ em sẽ hoảng. Anh chuyển trước đi rồi em nói sau.' Sau đó người kia gửi số tài khoản qua tin nhắn.",
            "Các dấu hiệu đáng chú ý trong tình huống này: yêu cầu chuyển tiền gấp; yêu cầu không báo người khác; số tài khoản nhận tiền là tên người lạ; hình ảnh hơi mờ; giọng nói khá giống nhưng âm thanh bị vỡ; né câu hỏi về địa điểm; cuộc gọi diễn ra muộn.",
          ], [
            "Dấu hiệu mạnh nhất không nằm ở việc hình ảnh mờ — mà là yêu cầu chuyển tiền, áp lực thời gian, cô lập nạn nhân, tài khoản lạ và né xác minh.",
          ]),
          lesson("2.2.1", "Phân tích tình huống và các lựa chọn", [
            "Câu hỏi 1 — Bạn làm gì trước? (A) Chuyển tiền ngay vì có thể Minh Anh đang nguy hiểm — rủi ro cao; kẻ xấu đang dùng khẩn cấp, thân quen và cô lập. (B) Hỏi lại vài câu riêng tư — không đủ chắc, thông tin cá nhân có thể bị lấy từ mạng xã hội. (C) Kết thúc cuộc gọi, gọi lại số điện thoại đã lưu của Minh Anh hoặc người thân khác để xác minh — đây là lựa chọn an toàn nhất. (D) Nhắn 'đợi chút' rồi gửi trước 1 triệu — chuyển 'một ít trước' vẫn là chuyển tiền cho tình huống chưa xác minh.",
            "Câu hỏi 2 — Dấu hiệu nào đáng nghi nhất? → Yêu cầu chuyển tiền gấp; yêu cầu không báo người khác; số tài khoản nhận tiền là tên người lạ; né câu hỏi về địa điểm. (Hình ảnh mờ và cuộc gọi muộn là tín hiệu cần chú ý nhưng không đủ để kết luận.)",
            "Câu hỏi 3 — Kênh độc lập nào tốt nhất? Thứ tự từ an toàn đến kém an toàn hơn: (1) Gọi số điện thoại đã lưu từ trước của Minh Anh; (2) Gọi mẹ hoặc người thân của Minh Anh bằng số đã lưu; (3) Nhắn lại trong cuộc gọi đang nghi vấn; (4) Gọi số mới người kia vừa gửi; (5) Bấm vào link 'vị trí bệnh viện' người kia gửi. Kênh độc lập là kênh bạn đã biết từ trước, không phải kênh do người đang bị nghi vấn cung cấp trong lúc khẩn cấp.",
          ], [
            "Xác minh qua kênh độc lập (số bạn đã lưu từ trước) là bước an toàn nhất trước khi chuyển tiền.",
          ]),
          lesson("2.2.2", "Nếu đã lỡ chuyển tiền và bài học rút ra", [
            "Nếu An lỡ chuyển 5 triệu và sau đó phát hiện bị lừa, cần làm ngay: (A) Liên hệ ngân hàng càng sớm càng tốt; (B) Lưu bằng chứng: tin nhắn, số tài khoản, thời gian, ảnh chụp màn hình; (C) Báo cho người thân và bạn bè để tránh người khác bị lừa tiếp; (E) Báo cáo tài khoản nghi giả mạo trên nền tảng. Không nên xóa hết vì xấu hổ (làm việc xử lý khó hơn) hay đăng thông tin cá nhân nghi phạm tràn lan (có thể gây rủi ro pháp lý).",
            "Điều nguy hiểm nhất trong case này không phải là video có hoàn hảo hay không — mà là kịch bản đánh vào nhiều nút bấm cùng lúc: thân quen (người gọi giống Minh Anh), khẩn cấp (cần tiền ngay), sợ hãi (tai nạn), cô lập (đừng gọi cho mẹ em), né xác minh (không nói rõ địa điểm).",
            "Mẫu phản hồi an toàn khi gặp tình huống tương tự: 'Anh/chị sẽ gọi lại em bằng số cũ ngay bây giờ.', 'Nếu thật sự khẩn cấp, anh/chị cần xác minh để giúp đúng cách.', 'Anh/chị không chuyển tiền qua tài khoản lạ khi chưa xác nhận.', 'Anh/chị không thể đọc OTP hoặc gửi mã xác minh.'",
          ], [
            "Lo lắng cho người thân là phản ứng tốt. Nhưng trước khi chuyển tiền, phải xác minh.",
            "Một cuộc gọi giống người thân vẫn cần xác minh nếu nó yêu cầu tiền, OTP, mật khẩu hoặc hành động khẩn cấp.",
          ]),
          lesson("2.2.3", "Checklist sau case và tổng kết Module 2", [
            "Trước mọi cuộc gọi/tin nhắn khẩn cấp yêu cầu tiền hoặc thông tin nhạy cảm, hãy hỏi bản thân: (1) Người này có đang yêu cầu mình làm điều rủi ro không? (2) Có áp lực thời gian bất thường không? (3) Có yêu cầu giữ bí mật hoặc không nói với ai không? (4) Có kênh độc lập nào để xác minh không? (5) Thông tin tài khoản/link/số điện thoại có phải được gửi ngay trong tình huống nghi vấn không? (6) Nếu mình chậm lại 2 phút, điều gì tốt hơn có thể xảy ra?",
            "Tổng kết Module 2: deepfake không chỉ là vấn đề công nghệ. Deepfake nguy hiểm vì thường đi cùng các kỹ thuật tác động tâm lý: khẩn cấp, thân quen, quyền lực, lợi ích, cô lập, xấu hổ, phẫn nộ. Hình ảnh, video và giọng nói có sức thuyết phục mạnh, nhưng không còn là bằng chứng tuyệt đối trong môi trường số.",
            "Điều quan trọng nhất của Module 2: khi cảm xúc bị đẩy lên cao, khả năng kiểm chứng thường bị kéo xuống thấp. Vì vậy, kỹ năng đầu tiên của Deepfense Check là Pause — Dừng lại. Dừng lại không làm bạn chậm hơn. Dừng lại giúp bạn không bị người khác điều khiển nhịp phản ứng.",
          ], [
            "Khi cảm xúc bị đẩy lên cao, khả năng kiểm chứng thường bị kéo xuống thấp.",
            "Dừng lại không làm bạn chậm hơn — nó giúp bạn không bị người khác điều khiển nhịp phản ứng.",
          ]),
        ],
        checkpoint: null,
      },
    ],
    quiz: [
      q("Một người gọi nói giống người thân yêu cầu chuyển tiền trong 5 phút. 'Nút bấm' cảm xúc chính đang được dùng là gì?", ["Khẩn cấp", "Giải trí", "Học thuật", "Tò mò"], 0),
      q("Một tài khoản giống bạn thân nhắn mượn tiền nhưng né gọi điện và bảo đang rất bận. Rủi ro lớn nhất là gì?", ["Tài khoản có thể bị chiếm quyền hoặc bị giả mạo", "Điện thoại của bạn chắc chắn bị hỏng", "Bạn thân chắc chắn đã đổi tính cách", "Tin nhắn ngắn thì luôn an toàn"], 0),
      q("Câu nào sau đây là dấu hiệu cô lập nạn nhân?", ["Bạn có thể kiểm tra thêm", "Đừng nói với ai, việc này bí mật", "Hãy gọi tổng đài chính thức", "Bạn có thể suy nghĩ rồi trả lời sau"], 1),
      q("Điều nào đúng nhất về deepfake và lừa đảo?", ["Nếu cuộc gọi không phải deepfake thì chắc chắn an toàn", "Một cuộc gọi có thể không phải deepfake nhưng vẫn là lừa đảo", "Chỉ deepfake mới nguy hiểm", "Tin nhắn không có video thì không thể lừa đảo"], 1),
      q("Khi thấy câu 'chia sẻ ngay trước khi bị xóa', bạn nên hiểu gì?", ["Đây là tín hiệu cần kiểm chứng trước khi chia sẻ", "Đây luôn là tin chính xác", "Đây là bằng chứng nội dung quan trọng", "Đây là lý do phải chia sẻ nhanh"], 0),
      q("Yêu cầu OTP qua cuộc gọi nên được xử lý thế nào?", ["Gửi nếu người yêu cầu nghe giống người quen", "Gửi nếu đang vội", "Không cung cấp OTP qua cuộc gọi/tin nhắn; xác minh qua kênh chính thức", "Gửi một phần mã để kiểm tra"], 2),
      q("Vì sao kẻ xấu thường yêu cầu 'đừng nói với ai'?", ["Để bạn không nhận được lời khuyên hoặc kiểm chứng từ người khác", "Vì chúng muốn bảo vệ quyền riêng tư của bạn", "Vì mọi tình huống khẩn cấp đều phải bí mật", "Vì nói với người khác sẽ làm điện thoại chậm hơn"], 0),
      q("Khi một nội dung làm bạn sợ, giận hoặc muốn hành động ngay, phản xạ an toàn nhất là gì?", ["Dừng lại và kiểm chứng", "Chia sẻ ngay", "Chuyển tiền trước, kiểm tra sau", "Làm theo cảm xúc đầu tiên"], 0),
      q("Trong case cuộc gọi lúc 22:47, dấu hiệu đáng nghi nhất là gì?", ["Hình ảnh hơi mờ do mạng yếu", "Cuộc gọi diễn ra vào buổi tối", "Yêu cầu chuyển tiền gấp + không báo người khác + số tài khoản lạ + né địa điểm", "Người gọi nói nhanh"], 2),
      q("Điều quan trọng nhất của Module 2 là gì?", ["Khi cảm xúc bị đẩy lên cao, khả năng kiểm chứng thường bị kéo xuống thấp", "Chỉ cần nhìn hình ảnh là biết deepfake", "Không bao giờ bắt điện thoại từ người thân", "Chỉ tin tưởng cuộc gọi video có độ phân giải cao"], 0),
    ],
  },
  buildModule(3, "foundation", "Rủi ro, đạo đức và niềm tin số", "Module 3 đặt deepfake trong khung đạo đức, pháp lý nhận thức và trách nhiệm xã hội.", "Một người bạn gửi video nghi ngờ ghép mặt một bạn học vào nội dung xấu. Nhóm chat muốn đăng lên mạng để \"cảnh báo\". Bạn nên làm gì?", [
    ["3.1 Quyền riêng tư và sự đồng ý", [["3.1.1", "Danh tính số", "Danh tính số gồm hình ảnh, giọng nói, tên, tài khoản và các dấu hiệu nhận diện trực tuyến."], ["3.1.2", "Sự đồng ý", "Dùng khuôn mặt hoặc giọng nói người khác khi chưa được phép có thể gây hại nghiêm trọng."], ["3.1.3", "Bảo vệ nạn nhân", "Nạn nhân cần được hỗ trợ, không bị đổ lỗi hoặc biến thành nội dung giải trí."]]],
    ["3.2 Đạo đức chia sẻ", [["3.2.1", "Trách nhiệm người xem", "Người xem không tạo deepfake nhưng vẫn có trách nhiệm nếu chia sẻ nội dung chưa kiểm chứng."], ["3.2.2", "Dừng trước khi chia sẻ", "Hãy hỏi: nguồn là ai, có xác nhận độc lập không, nếu sai ai bị hại?"], ["3.2.3", "Không giải trí hóa nạn nhân", "Bình luận xúc phạm hoặc lan truyền vì tò mò có thể làm nạn nhân tổn thương thêm."]]],
    ["3.3 Pháp lý nhận thức", [["3.3.1", "Hiểu rủi ro pháp lý", "Không cần học luật sâu, nhưng cần hiểu tạo hoặc phát tán deepfake gây hại có thể dẫn đến hậu quả pháp lý."], ["3.3.2", "Nhóm vấn đề thường gặp", "Quyền riêng tư, danh dự, lừa đảo tài chính, bản quyền và trách nhiệm khi phát tán thông tin sai."], ["3.3.3", "Khi cần hỗ trợ", "Nếu có tống tiền, đe dọa, bôi nhọ nghiêm trọng hoặc xâm hại trẻ vị thành niên, cần tìm hỗ trợ phù hợp."]]],
  ], ["Hiểu danh tính số và sự đồng ý.", "Chia sẻ thông tin có trách nhiệm.", "Biết khi nào cần lưu bằng chứng và tìm hỗ trợ."]),
  buildModule(4, "recognition", "Nhận diện dấu hiệu hình ảnh và video", "Nhận diện cần kết hợp nhiều dấu hiệu, không kết luận từ một chi tiết đơn lẻ.", "Một video có khuôn mặt hơi mượt, ánh sáng trên mặt khác nền, môi có vẻ không khớp lời nói. Đây có chắc là deepfake không?", [
    ["4.1 Dấu hiệu khuôn mặt", [["4.1.1", "Viền mặt và vùng ghép", "Quan sát vùng da gần tóc, tai, cổ và ranh giới mặt-cổ, nhưng không kết luận chỉ từ một lỗi."], ["4.1.2", "Mắt và chớp mắt", "Mắt thiếu tự nhiên, phản chiếu ánh sáng lạ hoặc nhịp chớp bất thường là dấu hiệu cần kiểm tra thêm."], ["4.1.3", "Miệng và răng", "Môi không khớp âm thanh, răng thiếu chi tiết hoặc vùng miệng méo là điểm quan sát quan trọng."]]],
    ["4.2 Ánh sáng và chất lượng", [["4.2.1", "Ánh sáng không nhất quán", "Mặt và môi trường có nguồn sáng khác nhau là điểm đáng chú ý."], ["4.2.2", "Bóng đổ và phản chiếu", "Bóng trên mặt, kính, mắt hoặc nền có thể tiết lộ thiếu nhất quán."], ["4.2.3", "Lỗi nén", "Video chất lượng thấp có thể tạo artifact giống deepfake, nên cần phân biệt lỗi nén với dấu hiệu gia mạo."]]],
    ["4.3 Chuyển động và bối cảnh", [["4.3.1", "Đầu, cổ và vai", "Khuôn mặt có thể di chuyển hơi lệch so với cơ thể."], ["4.3.2", "Tay, tóc và vật nhỏ", "AI thường gặp khó với vùng che khuất, tóc, tay và phụ kiện."], ["4.3.3", "Bối cảnh thiếu logic", "Chữ méo, vật thể biến dạng hoặc chi tiết thay đổi giữa khung hình là dấu hiệu cần kiểm tra."]]],
  ], ["Kết hợp nhiều dấu hiệu hình ảnh/video.", "Phân biệt artifact do nén với nghi vấn deepfake.", "Không kết luận tuyệt đối từ một dấu hiệu."]),
  buildModule(5, "recognition", "Nhận diện giọng nói và âm thanh giả mạo", "Hiểu voice deepfake, dấu hiệu âm thanh và cách xác minh cuộc gọi đáng ngờ.", "Bạn nhận cuộc gọi từ người thân nói cần chuyển tiền ngay. Giọng rất giống, nhưng câu chuyện gấp gáp và không cho bạn kiểm tra.", [
    ["5.1 Voice deepfake", [["5.1.1", "Giả giọng và tổng hợp", "Voice deepfake là âm thanh được tạo hoặc biến đổi để nghe giống giọng của một người."], ["5.1.2", "Vì sao dễ tạo niềm tin", "Con người thường liên kết giọng nói quen thuộc với danh tính thật."], ["5.1.3", "Rủi ro lừa đảo", "Kẻ tấn công có thể yêu cầu tiền, OTP, thông tin hoặc hành động khẩn cấp."]]],
    ["5.2 Dấu hiệu âm thanh", [["5.2.1", "Nhịp nói và cảm xúc", "Giọng giả có thể thiếu cảm xúc tự nhiên, ngắt nghỉ lạ hoặc nhấn nhá không phù hợp."], ["5.2.2", "Tạp âm và môi trường", "Âm nền quá sạch, lặp hoặc không khớp bối cảnh là dấu hiệu cần xác minh."], ["5.2.3", "Câu chuyện gấp gáp", "Áp lực thời gian là dấu hiệu social engineering, không chỉ là dấu hiệu âm thanh."]]],
    ["5.3 Xác minh cuộc gọi", [["5.3.1", "Gọi lại kênh độc lập", "Ngắt cuộc gọi và gọi lại qua số đã biết trước, không dùng số hoặc link do người gọi gửi."], ["5.3.2", "Câu hỏi xác minh", "Dùng câu hỏi chỉ người thật biết, tránh thông tin dễ đoán từ mạng xã hội."], ["5.3.3", "Quy trình doanh nghiệp", "Yêu cầu nhạy cảm cần xác minh qua kênh thứ hai."]]],
  ], ["Nhận diện dấu hiệu voice deepfake.", "Xác minh qua kênh độc lập.", "Hiểu áp lực thời gian trong social engineering."]),
  buildModule(6, "recognition", "Kiểm chứng bối cảnh, nguồn tin và metadata cơ bản", "Nhận diện không chỉ nhìn vào khuôn mặt hoặc giọng nói; nguồn, bối cảnh và metadata cũng quan trọng.", "Một video từ tài khoản mới tạo, không rõ nguồn gốc, tiêu đề gây sốc và kêu gọi chia sẻ ngay. Video trông khá thật. Bạn kiểm tra điều gì trước?", [
    ["6.1 Kiểm chứng nguồn", [["6.1.1", "Nguồn đầu tiên", "Nội dung đăng lại nhiều lần có thể mất bối cảnh ban đầu."], ["6.1.2", "Uy tín nguồn", "Nguồn đáng tin có lịch sử rõ ràng, thông tin liên hệ và trách nhiệm biên tập."], ["6.1.3", "Nguồn độc lập", "Cần xác nhận từ nguồn khác, đặc biệt với nội dung gây sốc."]]],
    ["6.2 Kiểm chứng bối cảnh", [["6.2.1", "Thời gian", "Video cũ có thể bị đăng lại như sự kiện mới."], ["6.2.2", "Địa điểm", "Biển báo, ngôn ngữ, thời tiết, kiến trúc giúp xác minh địa điểm."], ["6.2.3", "Mục đích lan truyền", "Hỏi ai được lợi nếu nội dung này được tin là thật."]]],
    ["6.3 Metadata cơ bản", [["6.3.1", "Metadata là gì", "Metadata là dữ liệu mô tả dữ liệu: thời gian tạo, thiết bị, định dạng hoặc phần mềm xử lý."], ["6.3.2", "Giới hạn metadata", "Metadata có thể bị xóa hoặc sửa khi tải qua mạng xã hội."], ["6.3.3", "Không phá hủy bằng chứng", "Lưu bản gốc, ghi nguồn, thời gian tải và nơi tìm thấy."]]],
  ], ["Kiểm tra nguồn đầu tiên và nguồn độc lập.", "Đọc bối cảnh thời gian, địa điểm, mục đích lan truyền.", "Hiểu metadata và giới hạn của metadata."]),
  buildModule(7, "response", "Phòng ngừa deepfake cho cá nhân", "Xây dựng thói quen giảm khả năng bị mạo danh và giảm tác hại khi gặp deepfake.", "Bạn thường đăng ảnh, video và giọng nói công khai. Một ngày có người dùng chúng để tạo nội dung giả. Bạn có thể giảm rủi ro từ trước bằng cách nào?", [
    ["7.1 Dấu vết số cá nhân", [["7.1.1", "Dấu vết số", "Ảnh, video, giọng nói, bài đăng và bình luận đều có thể trở thành dữ liệu nhận diện."], ["7.1.2", "Dữ liệu công khai", "Càng nhiều dữ liệu công khai, nguy cơ bị mô phỏng càng tăng."], ["7.1.3", "Quyền riêng tư", "Cài đặt riêng tư giúp giảm bề mặt thu thập dữ liệu."]]],
    ["7.2 Thói quen xác minh", [["7.2.1", "Yêu cầu nhạy cảm", "Tiền, OTP, dữ liệu cá nhân phải xác minh qua kênh thứ hai."], ["7.2.2", "Mật khẩu và MFA", "Tài khoản mạnh giúp giảm nguy cơ bị kết hợp deepfake và chiếm quyền."], ["7.2.3", "Mã bí mật nhóm", "Gia đình hoặc nhóm có thể thống nhất câu xác minh khi có tình huống khẩn."]]],
    ["7.3 Chia sẻ có trách nhiệm", [["7.3.1", "Không chia sẻ nghi ngờ", "Không tiếp tay lan truyền nội dung chưa kiểm chứng."], ["7.3.2", "Cảnh báo đúng cách", "Cảnh báo bằng cách chia nguồn kiểm chứng, không đăng lại nội dung gây hại."], ["7.3.3", "Tôn trọng nạn nhân", "Không biến nạn nhân thành chủ đề bàn tán."]]],
  ], ["Quản lý dấu vết số cá nhân.", "Tạo thói quen xác minh yêu cầu nhạy cảm.", "Chia sẻ có trách nhiệm khi gặp nội dung nghi ngờ."]),
  buildModule(8, "response", "Ứng phó khi gặp hoặc trở thành nạn nhân", "Biết cách dừng lan truyền, lưu bằng chứng và tìm hỗ trợ phù hợp.", "Bạn phát hiện một nội dung giả mạo bản thân hoặc người quen đang lan truyền. Bạn nên làm gì trong 30 phút đầu?", [
    ["8.1 Khi gặp nội dung nghi ngờ", [["8.1.1", "Dừng lại", "Không chia sẻ, không kết luận vội, không kích động thêm."], ["8.1.2", "Kiểm chứng", "Kiểm tra nguồn, bối cảnh, dấu hiệu kỹ thuật và nguồn xác nhận độc lập."], ["8.1.3", "Báo cáo nền tảng", "Dùng công cụ report chính thức và mô tả rõ lý do."]]],
    ["8.2 Lưu bằng chứng", [["8.2.1", "Cần lưu gì", "Link, ảnh chụp màn hình, tài khoản đăng, thời gian và nội dung liên quan."], ["8.2.2", "Không sửa bản gốc", "Tránh chỉnh sửa file gốc nếu có thể cần đối chiếu sau này."], ["8.2.3", "Ghi chuỗi sự kiện", "Ghi lại mốc thời gian giúp hỗ trợ báo cáo và xử lý."]]],
    ["8.3 Tìm hỗ trợ", [["8.3.1", "Hỗ trợ cá nhân", "Tìm người tin cậy, gia đình, giáo viên hoặc quản lý."], ["8.3.2", "Hỗ trợ nền tảng", "Liên hệ nền tảng để gỡ nội dung hoặc khóa tài khoản vi phạm."], ["8.3.3", "Hỗ trợ tổ chức/cơ quan", "Với tống tiền, đe dọa hoặc lừa đảo tài chính, cần kênh hỗ trợ phù hợp."]]],
  ], ["Phản ứng bình tĩnh khi gặp nội dung nghi ngờ.", "Lưu bằng chứng có cấu trúc.", "Biết tìm hỗ trợ phù hợp theo mức độ sự cố."]),
  buildModule(9, "response", "Deepfake trong tổ chức: SOC, GRC và security awareness", "Đưa học viên đến gần định hướng Network Security, SOC và GRC ở mức nhập môn.", "Một tổ chức nhận nhiều cuộc gọi giả mạo lãnh đạo kết hợp email phishing. Đội ngũ cần đào tạo, quy trình và phản ứng sự cố ra sao?", [
    ["9.1 Security awareness", [["9.1.1", "Đào tạo nhận thức", "Nhân viên cần hiểu deepfake là một rủi ro trong chuỗi tấn công, không chỉ là hiện tượng mạng xã hội."], ["9.1.2", "Quy trình xác minh", "Yêu cầu nhạy cảm cần quy trình phê duyệt và xác minh độc lập."], ["9.1.3", "Văn hóa không đổ lỗi", "Tổ chức nên khuyến khích báo cáo sớm thay vì trừng phạt người nghi ngờ."]]],
    ["9.2 SOC và incident response", [["9.2.1", "SOC là gì", "SOC theo dõi, phân tích và phản ứng với tín hiệu rủi ro an ninh."], ["9.2.2", "Incident response", "Phản ứng sự cố là quy trình nhận diện, cô lập, xử lý và rút kinh nghiệm."], ["9.2.3", "Deepfake trong chuỗi tấn công", "Deepfake có thể kết hợp phishing, chiếm quyền tài khoản hoặc lừa chuyển tiền."]]],
    ["9.3 GRC và chính sách", [["9.3.1", "GRC là gì", "Governance, Risk, Compliance giúp tổ chức quản trị rủi ro và tuân thủ."], ["9.3.2", "Chính sách xác minh", "Quy định xác minh danh tính cho giao dịch, dữ liệu và phát ngôn chính thức."], ["9.3.3", "Bài học sau sự cố", "Sau sự cố cần cập nhật đào tạo, quy trình và kịch bản phản ứng."]]],
  ], ["Hiểu security awareness trong tổ chức.", "Nhìn deepfake như một tín hiệu trong chuỗi tấn công.", "Kết nối SOC, GRC và quy trình xác minh danh tính."]),
];

const pretestQuestions = [
  q("Deepfake thường liên quan đến công nghệ nào?", ["AI hoặc học máy", "Nén file ZIP", "Sao lưu dữ liệu", "Tường lửa mạng"], 0),
  q("Một video nhìn thật có chắc chắn là thật không?", ["Không, cần kiểm chứng thêm", "Có, vì mắt người luôn chính xác", "Có, nếu độ phân giải cao", "Có, nếu được chia sẻ nhiều"], 0),
  q("Deepfake có thể xuất hiện ở dạng nào?", ["Video, hình ảnh, giọng nói", "Chỉ video", "Chỉ văn bản", "Chỉ ảnh tĩnh"], 0),
  q("Dấu hiệu nào có thể đáng nghi trong video khuôn mặt?", ["Chớp mắt, ánh sáng, viền mặt bất thường", "Âm lượng loa lớn", "File có tên dài", "Video có phụ đề"], 0),
  q("Khi thấy nội dung gây sốc, bước đầu nên làm gì?", ["Dừng lại và xác minh nguồn", "Chia sẻ ngay", "Bình luận kết luận", "Tải lại video"], 0),
  q("Deepfake nguy hiểm vì điều gì?", ["Có thể làm sai lệch niềm tin và danh tiếng", "Luôn làm máy tính hỏng", "Chỉ gây lỗi mạng", "Không có nguy hiểm"], 0),
  q("Voice deepfake là gì?", ["Giả mạo hoặc tổng hợp giọng nói", "Tăng âm lượng giọng thật", "Dịch phụ đề", "Cắt ghép nhạc nền"], 0),
  q("Nguồn đáng tin hơn thường có đặc điểm nào?", ["Có ngữ cảnh, dẫn chứng, lịch sử uy tín", "Tiêu đề càng sốc càng tốt", "Không cần tác giả", "Chỉ đăng ở một trang lạ"], 0),
  q("DEEPFENSE BASICS giúp người học điều gì?", ["Hiểu, nhận biết và phòng ngừa cơ bản", "Tạo deepfake nâng cao", "Hack tài khoản", "Vượt bài kiểm tra"], 0),
  q("Khi nghi ngờ bị deepfake tấn công, nên làm gì?", ["Lưu bằng chứng và báo người/cơ quan phù hợp", "Xóa hết mọi thứ ngay", "Im lặng hoàn toàn", "Chia sẻ để mọi người xem"], 0),
];

const assessments = [
  { title: "Midterm 1", scope: "Sau Module 1, 2, 3", detail: "Kiểm tra nền tảng: khái niệm, tác động, đạo đức và phản ứng ban đầu.", questions: "20-30 câu" },
  { title: "Midterm 2", scope: "Sau Module 4, 5, 6", detail: "Kiểm tra khả năng nhận diện dấu hiệu và kiểm chứng nguồn, bối cảnh, metadata.", questions: "20-30 câu" },
  { title: "Midterm 3", scope: "Sau Module 7, 8, 9", detail: "Kiểm tra phòng ngừa, lưu bằng chứng, ứng phó và góc nhìn tổ chức.", questions: "20-30 câu" },
  { title: "Final Exam", scope: "Cuối khóa", detail: "50 câu, phân bổ trên toàn bộ 9 module. Đây là điều kiện chính để mở certificate.", questions: "50 câu" },
];

// ============================================================
// MINIGAMES — lồng ghép vào bài học (7 loại)
// ============================================================
const MINIGAMES = {
  "4.3.3": {
    type: "artifact_spotter",
    title: "🔍 Thực hành: Spot the Artifact",
    intro: "Bạn đang xem mô tả một video call đáng nghi. Bấm vào TẤT CẢ các dấu hiệu bất thường bạn nhận ra.",
    zones: [
      { id: "z1", label: "Viền khuôn mặt hơi mờ, không khớp với cổ", suspicious: true },
      { id: "z2", label: "Miệng đôi khi không khớp lời nói", suspicious: true },
      { id: "z3", label: "Ánh sáng trên mặt khác hướng với nền phòng", suspicious: true },
      { id: "z4", label: "Mắt chớp theo nhịp bình thường", suspicious: false },
      { id: "z5", label: "Tóc trông tự nhiên và rõ nét", suspicious: false },
      { id: "z6", label: "Giọng có âm nền quá sạch, thiếu tiếng động phòng", suspicious: true },
      { id: "z7", label: "Video giật ở vùng vai khi đầu xoay", suspicious: true },
      { id: "z8", label: "Màu da trên trán và cằm hơi khác nhau", suspicious: true },
    ],
    minRequired: 4,
    feedback: {
      good: "Bạn đã phát hiện đủ dấu hiệu. Không có một tín hiệu nào là kết luận tuyệt đối — nhưng khi gom nhiều tín hiệu, bạn có cơ sở để kiểm chứng thêm.",
      poor: "Bạn bỏ sót một số dấu hiệu. Hãy nhớ: không chỉ nhìn khuôn mặt — quan sát cả ánh sáng, viền, giọng nói và chuyển động.",
    },
  },
  "5.3.3": {
    type: "verification_call",
    title: "📞 Thực hành: Cuộc gọi xác minh",
    intro: "Bạn nhận video call từ 'ba/mẹ' yêu cầu chuyển tiền gấp vì tai nạn. Giọng nghe rất giống. Bạn sẽ làm gì?",
    steps: [
      {
        q: "Phản ứng đầu tiên của bạn?",
        opts: [
          { t: "Chuyển tiền ngay — giọng quá giống", s: 0, f: "❌ Không bao giờ chuyển tiền dưới áp lực, dù giọng giống đến đâu. Voice deepfake có thể tái tạo giọng rất chính xác." },
          { t: "Hỏi thêm thông tin rồi quyết định", s: 5, f: "⚠️ Tốt hơn, nhưng chưa đủ. Hỏi thêm trong cùng cuộc gọi chưa phải là xác minh độc lập." },
          { t: "Xin ngắt máy để gọi lại qua số đã lưu sẵn", s: 10, f: "✅ Đúng! Gọi lại qua kênh bạn đã biết là cách xác minh hiệu quả nhất." },
          { t: "Nhờ người khác nghe xem giọng có giống không", s: 3, f: "⚠️ Có thể hỗ trợ tâm lý, nhưng cách tốt nhất vẫn là xác minh qua kênh độc lập." },
        ],
      },
      {
        q: "Người gọi nói không có thời gian chờ, cần tiền ngay. Bạn làm gì?",
        opts: [
          { t: "Chuyển tiền trước, hỏi sau", s: 0, f: "❌ Áp lực thời gian là kỹ thuật social engineering. Đây là dấu hiệu lừa đảo, không phải khẩn cấp thật." },
          { t: "Hỏi câu chỉ người thật mới biết (kỷ niệm riêng, tên thú cưng)", s: 10, f: "✅ Câu hỏi xác minh cá nhân rất hiệu quả — kẻ giả mạo không thể biết." },
          { t: "Gọi người thân khác để xác nhận độc lập", s: 10, f: "✅ Gọi kênh khác để xác nhận là phản xạ đúng và an toàn nhất." },
          { t: "Tin vào cảm giác vì giọng quá giống", s: 0, f: "❌ Cảm giác không phải xác minh. Voice deepfake được thiết kế để đánh lừa cảm xúc." },
        ],
      },
    ],
    maxScore: 20,
  },
  "6.1.3": {
    type: "url_detective",
    title: "🔗 Thực hành: URL Detective",
    intro: "Phân loại từng đường link: An toàn, Đáng nghi, hay Nguy hiểm. Nhìn kỹ tên miền, ký tự và cấu trúc.",
    urls: [
      { id: "u1", url: "vietcombank.com.vn/dang-nhap", ans: "safe", hint: "Domain chính thức .com.vn của Vietcombank" },
      { id: "u2", url: "vietc0mbank-login.net/verify", ans: "danger", hint: "Số 0 thay chữ o, domain .net lạ" },
      { id: "u3", url: "facebook.com/security/checkpoint", ans: "safe", hint: "Subdomain hợp lệ của facebook.com" },
      { id: "u4", url: "faceb00k-support.info/login", ans: "danger", hint: "00 thay oo, domain .info lạ" },
      { id: "u5", url: "bit.ly/xacminh-tk-vcb-2025", ans: "suspicious", hint: "Link rút gọn che giấu đích thực" },
      { id: "u6", url: "moh.gov.vn/thong-bao", ans: "safe", hint: "Domain .gov.vn của chính phủ Việt Nam" },
      { id: "u7", url: "moh-gov-vn.com/thong-bao", ans: "danger", hint: "Dùng gạch ngang giả domain gov.vn" },
      { id: "u8", url: "tinyurl.com/nhan-qua-zalo", ans: "suspicious", hint: "Link rút gọn + nội dung hấp dẫn nghi ngờ" },
    ],
  },
  "7.2.1": {
    type: "otp_trap",
    title: "🔐 Thực hành: OTP Trap",
    scenario: "Số lạ nhắn tin: \"Anh/chị ơi, em gửi nhầm mã OTP về số anh/chị rồi ạ. Anh/chị đọc giúp em số đó với, em đang cấp bách lắm 🙏\"",
    q: "Bạn sẽ phản ứng như thế nào?",
    opts: [
      { t: "Đọc OTP cho họ — thấy họ cấp bách nên giúp", s: 0, f: "❌ Đây là kỹ thuật social engineering cổ điển. OTP về SIM của bạn là để bảo vệ TÀI KHOẢN CỦA BẠN — không bao giờ chia sẻ với ai." },
      { t: "Hỏi thêm họ cần OTP cho dịch vụ gì", s: 3, f: "⚠️ Tốt hơn nhưng chưa đủ an toàn. Không có lý do hợp lệ nào để chia sẻ OTP với người lạ dù họ giải thích thế nào." },
      { t: "Không trả lời và chặn số lạ đó", s: 8, f: "✅ Phản xạ đúng! OTP không bao giờ được chia sẻ với bất kỳ ai." },
      { t: "Liên hệ ngân hàng/dịch vụ để báo cáo số lạ này", s: 10, f: "✅ Xuất sắc! Báo cáo giúp bảo vệ người dùng khác khỏi cùng kịch bản lừa đảo." },
    ],
  },
  "7.3.3": {
    type: "scam_chat_triage",
    title: "💬 Thực hành: Phân tích chat lừa đảo",
    intro: "Đọc đoạn chat bên dưới. Bấm vào từng tin nhắn có dấu hiệu lừa đảo để đánh dấu. Sau đó nộp để xem kết quả.",
    chat: [
      { id: "c1", sender: "Chị Lan — Kế toán trưởng", text: "Em ơi, chị đang họp với đối tác nước ngoài.", flag: false, tactic: null },
      { id: "c2", sender: "Chị Lan — Kế toán trưởng", text: "Anh Giám đốc cần thanh toán hợp đồng GẤP trong 15 phút.", flag: true, tactic: "⏱ Tạo áp lực thời gian" },
      { id: "c3", sender: "Chị Lan — Kế toán trưởng", text: "Chuyển ngay 80 triệu vào STK: 9988776655 - NGUYEN VAN A - BIDV.", flag: true, tactic: "💸 Yêu cầu chuyển tiền ngay" },
      { id: "c4", sender: "Chị Lan — Kế toán trưởng", text: "Đừng hỏi ai nhé, đây là thông tin bảo mật công ty.", flag: true, tactic: "🤫 Yêu cầu giữ bí mật / cô lập" },
      { id: "c5", sender: "Chị Lan — Kế toán trưởng", text: "Chuyển xong chị hoàn lại ngay, anh GĐ đã xác nhận rồi.", flag: true, tactic: "👤 Giả danh thẩm quyền" },
      { id: "c6", sender: "Chị Lan — Kế toán trưởng", text: "Chờ chị một chút nhé.", flag: false, tactic: null },
      { id: "c7", sender: "Chị Lan — Kế toán trưởng", text: "Nếu không chuyển kịp, hợp đồng bị huỷ — em chịu trách nhiệm đấy.", flag: true, tactic: "⚠️ Đe dọa và đổ lỗi" },
      { id: "c8", sender: "Chị Lan — Kế toán trưởng", text: "Gọi cho chị thì đang họp kín, không nghe được.", flag: true, tactic: "🚫 Chặn xác minh qua kênh khác" },
    ],
    minCorrect: 4,
  },
  "8.2.1": {
    type: "evidence_collector",
    title: "🗂️ Thực hành: Thu thập bằng chứng",
    intro: "Bạn vừa nghi bị lừa qua mạng. Hãy chọn TẤT CẢ những gì cần lưu lại trước khi báo cáo.",
    items: [
      { id: "e1", text: "Ảnh chụp màn hình toàn bộ đoạn chat", keep: true, reason: "Bằng chứng chính về nội dung giao tiếp." },
      { id: "e2", text: "Số tài khoản ngân hàng kẻ lừa đảo cung cấp", keep: true, reason: "Dùng để truy vết và báo cáo ngân hàng." },
      { id: "e3", text: "Tên tài khoản mạng xã hội của đối tượng", keep: true, reason: "Giúp nền tảng xác minh và gỡ tài khoản." },
      { id: "e4", text: "Link bài đăng hoặc tin nhắn gốc", keep: true, reason: "URL giúp xác minh nguồn và báo cáo chính xác." },
      { id: "e5", text: "Thời gian xảy ra (ngày, giờ)", keep: true, reason: "Mốc thời gian hỗ trợ điều tra." },
      { id: "e6", text: "Số điện thoại đối tượng đã gọi", keep: true, reason: "Dùng để báo cáo nhà mạng và cơ quan chức năng." },
      { id: "e7", text: "Mã giao dịch ngân hàng (nếu đã chuyển tiền)", keep: true, reason: "Bằng chứng tài chính quan trọng nhất." },
      { id: "e8", text: "Xóa đoạn chat để người khác không nhìn thấy", keep: false, reason: "SAI — xóa là mất bằng chứng. Cần giữ nguyên để báo cáo." },
      { id: "e9", text: "Đăng ngay lên mạng xã hội để cảnh báo mọi người", keep: false, reason: "Sai — chia sẻ vội có thể lộ thông tin cá nhân và gây hại thêm." },
      { id: "e10", text: "Email hoặc file đính kèm kẻ tấn công gửi", keep: true, reason: "File/email là bằng chứng kỹ thuật quan trọng." },
    ],
  },
  "9.1.2": {
    type: "pressure_meter",
    title: "🎯 Thực hành: Nhận diện thao túng tâm lý",
    intro: "Đọc kịch bản dưới đây và bấm vào từng câu chứa kỹ thuật thao túng tâm lý.",
    scene: "Cuộc gọi từ người tự xưng 'Thiếu tá Bùi Văn Minh — Công an thành phố':",
    segs: [
      { id: "p1", text: "Tôi là Thiếu tá Bùi Văn Minh, Công an thành phố.", isTactic: true, label: "Giả danh quyền lực" },
      { id: "p2", text: "Tài khoản ngân hàng của anh/chị liên quan đến vụ rửa tiền đang điều tra.", isTactic: true, label: "Tạo nỗi sợ hãi" },
      { id: "p3", text: "Chúng tôi sẽ phong tỏa tài sản trong 24 giờ nếu không hợp tác ngay.", isTactic: true, label: "Đe dọa" },
      { id: "p4", text: "Để bảo vệ tài sản, anh/chị cần chuyển tiền vào tài khoản 'tạm giữ an toàn' ngay.", isTactic: true, label: "Tạo áp lực hành động ngay" },
      { id: "p5", text: "Tuyệt đối không được kể với ai — kể cả gia đình — vì điều tra bí mật.", isTactic: true, label: "Cô lập nạn nhân" },
      { id: "p6", text: "Nếu không làm theo, sẽ bắt giữ ngay trong hôm nay.", isTactic: true, label: "Đe dọa bắt giữ" },
      { id: "p7", text: "Thời gian còn 10 phút để anh/chị quyết định.", isTactic: true, label: "Tạo áp lực thời gian" },
    ],
  },
};

let state = {
  route: "overview",
  moduleIndex: 0,
  sectionIndex: 0,
  lessonIndex: 0,
  quiz: null,
  inlineAnswers: {},
  inlineSubmitted: false,
  minigameState: {},
};

const AUTH_KEY = "deepfenseAcademyAuth";
const PROGRESS_KEY = "deepfense-basics-progress";
const LOCATION_KEY = "deepfense-basics-last-location";
const EVENT_KEY = "deepfense-basics-learning-events";
const EVALUATION_KEY = "deepfense-basics-course-evaluation";
const FINAL_EXAM_KEY = "deepfense-basics-final-exam";
const ADMIN_RESET_KEY = "deepfense-basics-admin-reset-v2";

function getAuthSession() {
  try {
    return JSON.parse(localStorage.getItem(AUTH_KEY) || "null");
  } catch {
    return null;
  }
}

function requireAcademyAuth() {
  const session = getAuthSession();
  if (session?.email) return session;
  document.querySelector("#authWall").hidden = false;
  window.setTimeout(() => {
    window.location.replace("/academy");
  }, 900);
  return null;
}

function readProgress() {
  try {
    return JSON.parse(localStorage.getItem(PROGRESS_KEY) || "{}");
  } catch {
    return {};
  }
}

function writeProgress(progress) {
  localStorage.setItem(PROGRESS_KEY, JSON.stringify(progress));
}

function readLastLocation() {
  try {
    return JSON.parse(localStorage.getItem(LOCATION_KEY) || "null");
  } catch {
    return null;
  }
}

function readEvaluation() {
  try {
    return JSON.parse(localStorage.getItem(EVALUATION_KEY) || "null");
  } catch {
    return null;
  }
}

function hasCompletedCourseEvaluation() {
  return !!readEvaluation()?.submittedAt;
}

function readFinalExamResult() {
  try {
    return JSON.parse(localStorage.getItem(FINAL_EXAM_KEY) || "null");
  } catch {
    return null;
  }
}

function hasPassedFinalExam() {
  return !!readFinalExamResult()?.passed;
}

function saveLastLocation() {
  if (!getAuthSession()?.email) return;
  localStorage.setItem(LOCATION_KEY, JSON.stringify({
    route: state.route,
    moduleIndex: state.moduleIndex,
    sectionIndex: state.sectionIndex,
    lessonIndex: state.lessonIndex,
    updatedAt: Date.now(),
  }));
}

function trackLearningEvent(type, metadata = {}) {
  let events = [];
  try {
    events = JSON.parse(localStorage.getItem(EVENT_KEY) || "[]");
  } catch {
    events = [];
  }
  events.push({
    type,
    metadata,
    route: state.route,
    moduleId: currentModule()?.id,
    sectionIndex: state.sectionIndex,
    lessonIndex: state.lessonIndex,
    at: new Date().toISOString(),
  });
  localStorage.setItem(EVENT_KEY, JSON.stringify(events.slice(-80)));
}

function isAdminSession() {
  const session = getAuthSession();
  return session?.email === "deepfense@gmail.com" || session?.isAdmin === true;
}

function seedAdminCompletion() {
  if (!isAdminSession() || localStorage.getItem(ADMIN_RESET_KEY)) return;
  localStorage.removeItem(PROGRESS_KEY);
  localStorage.removeItem(LOCATION_KEY);
  localStorage.removeItem(EVALUATION_KEY);
  localStorage.removeItem(FINAL_EXAM_KEY);
  localStorage.removeItem("deepfense-basics-certificate-name");
  localStorage.setItem(ADMIN_RESET_KEY, new Date().toISOString());
}

function highestUnlockedModuleIndex() {
  const progress = readProgress();
  let unlocked = 0;
  for (let index = 1; index <= modules.length; index += 1) {
    if (progress[`module-${index}`]) unlocked = index;
    else break;
  }
  return Math.min(unlocked, modules.length - 1);
}

function isModuleUnlocked(index) {
  return index <= highestUnlockedModuleIndex();
}

function isCourseComplete() {
  const progress = readProgress();
  return modules.every((module) => progress[`module-${module.id}`]);
}

function updateCertificateState() {
  const complete = isCourseComplete() && hasCompletedCourseEvaluation() && hasPassedFinalExam();
  const link = document.querySelector("#certificateLink");
  const certificateFinal = document.querySelector("#certificateFinal");
  if (link) link.hidden = !complete;
  if (certificateFinal) certificateFinal.hidden = !complete;
}

function restoreLastLocation() {
  const last = readLastLocation();
  if (!last || typeof last !== "object") return;
  const route = ["overview", "pretest", "learn", "exam"].includes(last.route) ? last.route : "overview";
  const moduleIndex = Math.max(0, Math.min(Number(last.moduleIndex) || 0, highestUnlockedModuleIndex()));
  const module = modules[moduleIndex];
  const sectionIndex = Math.max(0, Math.min(Number(last.sectionIndex) || 0, module.sections.length - 1));
  const lessonIndex = Math.max(0, Math.min(Number(last.lessonIndex) || 0, module.sections[sectionIndex].lessons.length - 1));
  state = { ...state, route, moduleIndex, sectionIndex, lessonIndex };
}

function completeCurrentModule() {
  const progress = readProgress();
  progress[`module-${currentModule().id}`] = true;
  writeProgress(progress);
  trackLearningEvent("module_completed", { moduleId: currentModule().id });
  updateProgress();
  renderOverview();
  renderModuleStrip();
}

function lesson(id, title, paragraphs, takeaways) {
  return { id, title, paragraphs, takeaways };
}

function q(text, options, answer) {
  return { text, options, answer };
}

function checkpoint(label, questions) {
  return { label, questions };
}

function buildModule(id, part, title, summary, scenario, sectionRows, outcomes) {
  return {
    id,
    part,
    title,
    duration: id < 4 ? "45 phút" : id < 7 ? "50 phút" : "40 phút",
    level: part === "foundation" ? "Foundation" : part === "recognition" ? "Recognition" : "Response",
    scenario,
    outcomes,
    sections: sectionRows.map(([sectionTitle, rows]) => ({
      title: sectionTitle,
      lessons: rows.map(([code, lessonTitle, body]) =>
        lesson(code, lessonTitle, [
          body,
          "Trong thực tế, hãy kết hợp kiến thức này với kiểm chứng nguồn, bối cảnh và mức độ rủi ro trước khi đưa ra kết luận.",
        ], [
          "Không kết luận chỉ từ một tín hiệu đơn lẻ.",
          "Ưu tiên phản ứng chậm, có kiểm chứng và có trách nhiệm.",
        ])
      ),
      checkpoint: checkpoint(sectionTitle.split(" ")[0], [
        q(`Ý chính của ${sectionTitle} là gì?`, ["Kiểm chứng và phản ứng có trách nhiệm", "Chia sẻ nhanh hơn", "Tin ngay nội dung viral", "Bỏ qua nạn nhân"], 0),
        q("Khi gặp yêu cầu nhạy cảm, nên làm gì?", ["Xác minh qua kênh độc lập", "Làm ngay vì gấp", "Gửi thêm dữ liệu", "Không cần lưu bằng chứng"], 0),
        q("Một dấu hiệu đáng nghi nên được hiểu thế nào?", ["Là tín hiệu cần kiểm tra thêm", "Là kết luận tuyệt đối", "Là bằng chứng không thể sai", "Không bao giờ quan trọng"], 0),
      ]),
    })),
    quiz: [
      q(`Mục tiêu chính của Module ${id} là gì?`, [summary, "Dạy tạo deepfake", "Dạy vượt hệ thống phát hiện", "Loại bỏ mọi kiểm chứng"], 0),
      q("Nguyên tắc học quan trọng nhất là gì?", ["Kết hợp dấu hiệu, nguồn và bối cảnh", "Tin vào cảm giác đầu tiên", "Chia sẻ trước rồi kiểm tra sau", "Chỉ nhìn độ phân giải"], 0),
      q("Khi có nội dung gây áp lực cảm xúc, nên làm gì?", ["Dừng lại và xác minh", "Chia sẻ ngay", "Bình luận kết luận", "Tải lại nội dung"], 0),
      q("Vì sao cần tôn trọng nạn nhân?", ["Vì lan truyền thêm có thể gây hại thêm", "Vì làm quiz dễ hơn", "Vì tăng lượt xem", "Vì không liên quan pháp lý"], 0),
      q("Kênh độc lập giúp gì?", ["Giảm nguy cơ tin vào yêu cầu giả mạo", "Tăng âm lượng", "Tăng độ sáng", "Xóa metadata"], 0),
      q("Điều gì nên tránh?", ["Kết luận từ một dấu hiệu duy nhất", "Kiểm tra nguồn", "Lưu bằng chứng", "Báo cáo nền tảng"], 0),
      q("Bằng chứng nên được xử lý ra sao?", ["Lưu bản gốc, nguồn và thời gian", "Chỉnh sửa tùy ý", "Xóa ngay", "Đăng lại để hỏi ý kiến"], 0),
      q("Giáo dục deepfake giúp gì?", ["Tạo phản xạ kiểm chứng và chia sẻ có trách nhiệm", "Loại bỏ hoàn toàn deepfake", "Biến mọi người thành kỹ sư AI", "Tự động chặn mọi lừa đảo"], 0),
      q("Một yêu cầu nhạy cảm thường liên quan đến gì?", ["Tiền, OTP, dữ liệu hoặc quyền truy cập", "Màu nền", "Tên file", "Độ dài video"], 0),
      q("Sau module này, học viên nên có khả năng gì?", ["Nhận diện rủi ro và chọn phản ứng an toàn hơn", "Tạo nội dung giả", "Vượt quiz bằng mẹo", "Bỏ qua nguồn tin"], 0),
    ],
  };
}

function normalizeQuestion(question, source) {
  return {
    ...question,
    source,
  };
}

function buildFinalQuestionBank() {
  const harvested = [];
  modules.forEach((module) => {
    module.quiz.forEach((question) => harvested.push(normalizeQuestion(question, `Module ${module.id}`)));
    module.sections.forEach((section) => {
      section.checkpoint.questions.forEach((question) => harvested.push(normalizeQuestion(question, `Module ${module.id} checkpoint`)));
    });
  });
  pretestQuestions.forEach((question) => harvested.push(normalizeQuestion(question, "Pre-assessment")));

  const unique = [];
  const seen = new Set();
  harvested.forEach((question) => {
    const key = question.text.trim().toLowerCase();
    if (seen.has(key)) return;
    seen.add(key);
    unique.push(question);
  });

  modules.forEach((module) => {
    module.outcomes.forEach((outcome, index) => {
      const question = normalizeQuestion(q(
        `Theo Module ${module.id}, ket qua hoc tap nao la trong tam cua muc ${index + 1}?`,
        [outcome, "Chia se noi dung dang nghi truoc khi kiem chung", "Ket luan deepfake chi tu mot dau hieu don le", "Bo qua nguon tin va boi canh"],
        0
      ), `Module ${module.id} outcome`);
      const key = question.text.trim().toLowerCase();
      if (!seen.has(key)) {
        seen.add(key);
        unique.push(question);
      }
    });

    module.sections.forEach((section) => {
      section.lessons.forEach((lessonItem) => {
        const question = normalizeQuestion(q(
          `Trong bai ${lessonItem.id} - ${lessonItem.title}, hanh dong nao phu hop nhat voi tu duy phong ve?`,
          [lessonItem.takeaways[0] || "Dung lai va kiem chung truoc khi ket luan", "Chia se ngay neu noi dung gay soc", "Tin vao cam xuc dau tien", "Xoa dau vet ma khong luu bang chung"],
          0
        ), `Lesson ${lessonItem.id}`);
        const key = question.text.trim().toLowerCase();
        if (!seen.has(key)) {
          seen.add(key);
          unique.push(question);
        }
      });
    });
  });

  let fillerIndex = 1;
  while (unique.length < 150) {
    const module = modules[(fillerIndex - 1) % modules.length];
    const question = normalizeQuestion(q(
      `Tinh huong tong hop ${fillerIndex}: khi gap noi dung nghi deepfake lien quan ${module.title}, lua chon nao an toan nhat?`,
      ["Dung lai, kiem chung nguon va boi canh, luu bang chung neu co rui ro", "Chia se rong rai de hoi y kien", "Ket luan ngay dua tren cam giac", "Lam theo yeu cau gap ma khong xac minh"],
      0
    ), `Final bank scenario ${fillerIndex}`);
    const key = question.text.trim().toLowerCase();
    if (!seen.has(key)) {
      seen.add(key);
      unique.push(question);
    }
    fillerIndex += 1;
  }

  return unique.slice(0, 150);
}

function shuffleItems(items) {
  return [...items].sort(() => Math.random() - 0.5);
}

function buildFinalExamQuestions() {
  const bank = buildFinalQuestionBank();
  return shuffleItems(bank).slice(0, 50);
}

function buildExamId() {
  const randomId = globalThis.crypto?.randomUUID?.() || `${Date.now()}-${Math.random().toString(36).slice(2)}`;
  return `DPF-BASIC-${new Date().getFullYear()}-${randomId.replace(/-/g, "").slice(0, 16).toUpperCase()}`;
}

function routeTo(route) {
  if (route === "learn" && !isModuleUnlocked(state.moduleIndex)) {
    state.moduleIndex = highestUnlockedModuleIndex();
    state.sectionIndex = 0;
    state.lessonIndex = 0;
    renderLearning();
  }
  if (route === "exam" && !isCourseComplete()) {
    route = "learn";
    state.moduleIndex = highestUnlockedModuleIndex();
    state.sectionIndex = currentModule().sections.length - 1;
    state.lessonIndex = currentSection().lessons.length - 1;
    renderLearning();
  }
  state.route = route;
  document.querySelectorAll(".route").forEach((node) => node.classList.toggle("active", node.id === `route-${route}`));
  const labels = {
    overview: ["Learning path", "DEEPFENSE BASIC"],
    pretest: ["Pre-assessment", "Đánh giá đầu vào"],
    learn: [`Module ${currentModule().id}`, currentModule().title],
    exam: ["Final steps", "Hoàn tất khóa học"],
  };
  document.querySelector("#topEyebrow").textContent = labels[route][0];
  document.querySelector("#topTitle").textContent = labels[route][1];
  updateProgress();
  saveLastLocation();
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function currentModule() {
  return modules[state.moduleIndex];
}

function currentSection() {
  return currentModule().sections[state.sectionIndex];
}

function currentLesson() {
  return currentSection().lessons[state.lessonIndex];
}

function resetInlineCheckpoint() {
  state.inlineAnswers = {};
  state.inlineSubmitted = false;
}

function isLastLessonInSection() {
  return state.lessonIndex === currentSection().lessons.length - 1;
}

function renderInlineCheckpoint() {
  if (!isLastLessonInSection()) return "";
  const checkpointData = currentSection().checkpoint;
  if (!checkpointData) return "";
  return `
    <section class="inline-quiz" aria-label="Checkpoint ${checkpointData.label}">
      <p class="eyebrow">Checkpoint ${checkpointData.label}</p>
      <h3>Kiểm tra nhanh trước khi sang phần tiếp theo</h3>
      <p>Chọn đáp án tốt nhất cho từng câu. Phần này giúp bạn tự khóa lại ý chính ngay tại cuối mục học, không cần mở cửa sổ riêng.</p>
      ${checkpointData.questions.map((question, questionIndex) => `
        <div class="inline-question">
          <strong>${questionIndex + 1}. ${question.text}</strong>
          <div class="inline-options">
            ${question.options.map((option, optionIndex) => `
              <label>
                <input type="radio" name="checkpoint-${questionIndex}" value="${optionIndex}" data-inline-answer="${questionIndex}" ${state.inlineAnswers[questionIndex] === optionIndex ? "checked" : ""} />
                <span>${option}</span>
              </label>
            `).join("")}
          </div>
        </div>
      `).join("")}
      <button class="primary-btn" type="button" data-submit-inline-checkpoint="${checkpointData.label}">Nộp checkpoint</button>
      <div class="inline-result" id="inlineCheckpointResult">${state.inlineSubmitted ? renderInlineCheckpointResult() : ""}</div>
    </section>
  `;
}

function renderInlineCheckpointResult() {
  const questions = currentSection().checkpoint.questions;
  const score = questions.reduce((total, question, index) => total + (state.inlineAnswers[index] === question.answer ? 1 : 0), 0);
  return score === questions.length
    ? `Đạt ${score}/${questions.length}. Bạn đã nắm phần này.`
    : `${score}/${questions.length}. Hãy đọc lại phần điểm cần nhớ rồi thử lại.`;
}

function renderOverview() {
  const grid = document.querySelector("#overviewGrid");
  if (!grid) return;
}

// ============================================================
// MINIGAME RENDER ENGINE
// ============================================================

function getMgState(lessonId) {
  if (!state.minigameState[lessonId]) {
    state.minigameState[lessonId] = { selected: [], answers: {}, step: 0, totalScore: 0, submitted: false, stepSubmitted: false };
  }
  return state.minigameState[lessonId];
}

function refreshMinigame(lessonId) {
  const block = document.querySelector(`.minigame-block[data-mg-lesson="${lessonId}"]`);
  if (!block) return;
  const mg = MINIGAMES[lessonId];
  const mgs = getMgState(lessonId);
  const html = renderMinigameHtml(mg, mgs, lessonId);
  block.outerHTML = html;
}

function renderLessonMinigame(lessonId) {
  const mg = MINIGAMES[lessonId];
  if (!mg) return "";
  const mgs = getMgState(lessonId);
  return renderMinigameHtml(mg, mgs, lessonId);
}

function renderMinigameHtml(mg, mgs, lid) {
  switch (mg.type) {
    case "artifact_spotter": return renderArtifactSpotter(mg, mgs, lid);
    case "verification_call": return renderVerificationCall(mg, mgs, lid);
    case "url_detective": return renderUrlDetective(mg, mgs, lid);
    case "otp_trap": return renderOtpTrap(mg, mgs, lid);
    case "scam_chat_triage": return renderScamChatTriage(mg, mgs, lid);
    case "evidence_collector": return renderEvidenceCollector(mg, mgs, lid);
    case "pressure_meter": return renderPressureMeter(mg, mgs, lid);
    default: return "";
  }
}

function mgResetBtn(lid) {
  return `<button class="mg-reset-btn" data-mg-reset="${lid}">↩ Thử lại</button>`;
}

// --- Artifact Spotter ---
function renderArtifactSpotter(mg, mgs, lid) {
  const susZones = mg.zones.filter(z => z.suspicious);
  if (mgs.submitted) {
    const found = susZones.filter(z => mgs.selected.includes(z.id)).length;
    const passed = found >= mg.minRequired;
    return `<section class="minigame-block" data-mg-lesson="${lid}">
      <p class="eyebrow">Minigame · Spot the Artifact</p>
      <h3 class="mg-title">${mg.title}</h3>
      <div class="mg-result ${passed ? "mg-pass" : "mg-fail"}">
        <strong>${passed ? "✅ Đạt!" : "⚠️ Chưa đủ"}</strong>
        <p>Bạn phát hiện <strong>${found}/${susZones.length}</strong> dấu hiệu bất thường.</p>
        <p>${passed ? mg.feedback.good : mg.feedback.poor}</p>
      </div>
      <div class="artifact-grid">
        ${mg.zones.map(z => `<div class="artifact-zone ${mgs.selected.includes(z.id) ? (z.suspicious ? "zone-correct" : "zone-wrong") : (z.suspicious ? "zone-missed" : "zone-ok")}">
          ${z.label}
          ${z.suspicious ? '<span class="zone-tag warn">⚠ Đáng nghi</span>' : '<span class="zone-tag ok">✓ Bình thường</span>'}
        </div>`).join("")}
      </div>
      ${mgResetBtn(lid)}
    </section>`;
  }
  return `<section class="minigame-block" data-mg-lesson="${lid}">
    <p class="eyebrow">Minigame · Spot the Artifact</p>
    <h3 class="mg-title">${mg.title}</h3>
    <p class="mg-intro">${mg.intro}</p>
    <div class="artifact-grid">
      ${mg.zones.map(z => `<button class="artifact-zone clickable ${mgs.selected.includes(z.id) ? "zone-selected" : ""}" data-mg-zone="${z.id}" data-mg-lesson="${lid}">${z.label}</button>`).join("")}
    </div>
    <p class="mg-hint">Đã chọn: ${mgs.selected.length} dấu hiệu · Cần ít nhất ${mg.minRequired} đúng</p>
    <button class="mg-submit-btn" data-mg-submit="${lid}">Nộp kết quả</button>
  </section>`;
}

// --- Verification Call ---
function renderVerificationCall(mg, mgs, lid) {
  if (mgs.submitted) {
    const total = mgs.totalScore || 0;
    const passed = total >= mg.maxScore * 0.6;
    return `<section class="minigame-block" data-mg-lesson="${lid}">
      <p class="eyebrow">Minigame · Verification Call</p>
      <h3 class="mg-title">${mg.title}</h3>
      <div class="mg-result ${passed ? "mg-pass" : "mg-fail"}">
        <strong>${passed ? "✅ Bạn biết cách xác minh!" : "⚠️ Cần luyện thêm kỹ năng xác minh"}</strong>
        <p>Điểm: <strong>${total}/${mg.maxScore}</strong></p>
      </div>
      ${mg.steps.map((step, si) => {
        const chosen = step.opts[mgs.answers[si] ?? -1];
        return `<div class="verification-step step-done">
          <p><strong>${step.q}</strong></p>
          ${chosen ? `<div class="mg-result ${chosen.s >= 8 ? "mg-pass" : chosen.s >= 3 ? "mg-partial" : "mg-fail"} mg-compact">${chosen.f}</div>` : ""}
        </div>`;
      }).join("")}
      ${mgResetBtn(lid)}
    </section>`;
  }
  const currentStep = mgs.step || 0;
  const stepData = mg.steps[currentStep];
  return `<section class="minigame-block" data-mg-lesson="${lid}">
    <p class="eyebrow">Minigame · Verification Call</p>
    <h3 class="mg-title">${mg.title}</h3>
    <p class="mg-intro">${mg.intro}</p>
    <div class="verification-step">
      <p class="mg-step-label">Bước ${currentStep + 1} / ${mg.steps.length}</p>
      <p><strong>${stepData.q}</strong></p>
      <div class="option-list">
        ${stepData.opts.map((o, i) => {
          const sel = mgs.answers[currentStep] === i;
          const showFb = sel && mgs.stepSubmitted;
          return `<button class="option-card ${sel ? "opt-selected" : ""} ${showFb ? (o.s >= 8 ? "opt-correct" : o.s >= 3 ? "opt-partial" : "opt-wrong") : ""}"
            data-mg-vcopt="${i}" data-mg-vclid="${lid}" data-mg-vcstep="${currentStep}">
            <span>${o.t}</span>
            ${showFb ? `<span class="opt-feedback">${o.f}</span>` : ""}
          </button>`;
        }).join("")}
      </div>
      ${mgs.answers[currentStep] !== undefined && !mgs.stepSubmitted
        ? `<button class="mg-submit-btn" data-mg-vcconfirm="${lid}">Xác nhận</button>`
        : ""}
      ${mgs.stepSubmitted && currentStep < mg.steps.length - 1
        ? `<button class="mg-submit-btn" data-mg-vcnext="${lid}">Bước tiếp theo →</button>`
        : ""}
      ${mgs.stepSubmitted && currentStep === mg.steps.length - 1
        ? `<button class="mg-submit-btn" data-mg-submit="${lid}">Xem kết quả</button>`
        : ""}
    </div>
  </section>`;
}

// --- URL Detective ---
function renderUrlDetective(mg, mgs, lid) {
  const labels = { safe: "An toàn", suspicious: "Đáng nghi", danger: "Nguy hiểm" };
  if (mgs.submitted) {
    const correct = mg.urls.filter(u => mgs.answers[u.id] === u.ans).length;
    const passed = correct >= 6;
    return `<section class="minigame-block" data-mg-lesson="${lid}">
      <p class="eyebrow">Minigame · URL Detective</p>
      <h3 class="mg-title">${mg.title}</h3>
      <div class="mg-result ${passed ? "mg-pass" : "mg-fail"}">
        <strong>${passed ? "✅ Đạt!" : "⚠️ Cần luyện thêm"}</strong>
        <p>Phân loại đúng <strong>${correct}/${mg.urls.length}</strong> đường link.</p>
      </div>
      <div class="url-list">
        ${mg.urls.map(u => `<div class="url-row ${mgs.answers[u.id] === u.ans ? "row-correct" : "row-wrong"}">
          <code class="url-code">${u.url}</code>
          <div class="url-row-meta">
            <span class="url-badge url-${u.ans}">${labels[u.ans]}</span>
            <span class="url-hint">${u.hint}</span>
          </div>
        </div>`).join("")}
      </div>
      ${mgResetBtn(lid)}
    </section>`;
  }
  const answered = Object.keys(mgs.answers).length;
  return `<section class="minigame-block" data-mg-lesson="${lid}">
    <p class="eyebrow">Minigame · URL Detective</p>
    <h3 class="mg-title">${mg.title}</h3>
    <p class="mg-intro">${mg.intro}</p>
    <div class="url-list">
      ${mg.urls.map(u => `<div class="url-row">
        <code class="url-code">${u.url}</code>
        <div class="url-choices">
          ${["safe", "suspicious", "danger"].map(c => `<button class="url-choice-btn url-${c} ${mgs.answers[u.id] === c ? "choice-selected" : ""}"
            data-mg-url="${u.id}" data-mg-choice="${c}" data-mg-lesson="${lid}">${labels[c]}</button>`).join("")}
        </div>
      </div>`).join("")}
    </div>
    <p class="mg-hint">Đã phân loại: ${answered}/${mg.urls.length} link</p>
    <button class="mg-submit-btn" data-mg-submit="${lid}">Nộp kết quả</button>
  </section>`;
}

// --- OTP Trap ---
function renderOtpTrap(mg, mgs, lid) {
  if (mgs.submitted) {
    const chosen = mg.opts[mgs.selected[0]];
    return `<section class="minigame-block" data-mg-lesson="${lid}">
      <p class="eyebrow">Minigame · OTP Trap</p>
      <h3 class="mg-title">${mg.title}</h3>
      <div class="mg-scenario">${mg.scenario}</div>
      <div class="mg-result ${chosen.s >= 8 ? "mg-pass" : chosen.s >= 3 ? "mg-partial" : "mg-fail"}">
        <p><strong>Bạn chọn:</strong> ${chosen.t}</p>
        <p>${chosen.f}</p>
      </div>
      <div class="option-list">
        ${mg.opts.map((o, i) => `<div class="option-card static ${i === mgs.selected[0] ? (o.s >= 8 ? "opt-correct" : o.s >= 3 ? "opt-partial" : "opt-wrong") : ""}"
          style="opacity:${i === mgs.selected[0] ? 1 : 0.45}">${o.t}</div>`).join("")}
      </div>
      ${mgResetBtn(lid)}
    </section>`;
  }
  return `<section class="minigame-block" data-mg-lesson="${lid}">
    <p class="eyebrow">Minigame · OTP Trap</p>
    <h3 class="mg-title">${mg.title}</h3>
    <div class="mg-scenario">${mg.scenario}</div>
    <p class="mg-intro"><strong>${mg.q}</strong></p>
    <div class="option-list">
      ${mg.opts.map((o, i) => `<button class="option-card ${mgs.selected.includes(i) ? "opt-selected" : ""}"
        data-mg-opt="${i}" data-mg-lesson="${lid}">${o.t}</button>`).join("")}
    </div>
    ${mgs.selected.length > 0 ? `<button class="mg-submit-btn" data-mg-submit="${lid}">Nộp kết quả</button>` : ""}
  </section>`;
}

// --- Scam Chat Triage ---
function renderScamChatTriage(mg, mgs, lid) {
  if (mgs.submitted) {
    const shouldFlag = mg.chat.filter(c => c.flag);
    const correctFlags = shouldFlag.filter(c => mgs.selected.includes(c.id)).length;
    const falseFlags = mgs.selected.filter(id => !mg.chat.find(c => c.id === id)?.flag).length;
    const passed = correctFlags >= mg.minCorrect && falseFlags <= 1;
    return `<section class="minigame-block" data-mg-lesson="${lid}">
      <p class="eyebrow">Minigame · Scam Chat Triage</p>
      <h3 class="mg-title">${mg.title}</h3>
      <div class="mg-result ${passed ? "mg-pass" : "mg-fail"}">
        <strong>${passed ? "✅ Tốt!" : "⚠️ Cần xem lại"}</strong>
        <p>Đánh dấu đúng <strong>${correctFlags}/${shouldFlag.length}</strong> dấu hiệu lừa đảo${falseFlags > 0 ? `, đánh nhầm ${falseFlags} tin nhắn bình thường` : ""}.</p>
      </div>
      <div class="chat-list">
        ${mg.chat.map(c => `<div class="chat-bubble ${c.flag ? (mgs.selected.includes(c.id) ? "bubble-correct" : "bubble-missed") : (mgs.selected.includes(c.id) ? "bubble-false" : "")}">
          <span class="chat-sender">${c.sender}</span>
          <p>${c.text}</p>
          ${c.flag ? `<span class="tactic-label">${c.tactic}</span>` : ""}
          ${!c.flag && mgs.selected.includes(c.id) ? `<span class="tactic-label tactic-wrong">✗ Tin nhắn bình thường</span>` : ""}
        </div>`).join("")}
      </div>
      ${mgResetBtn(lid)}
    </section>`;
  }
  return `<section class="minigame-block" data-mg-lesson="${lid}">
    <p class="eyebrow">Minigame · Scam Chat Triage</p>
    <h3 class="mg-title">${mg.title}</h3>
    <p class="mg-intro">${mg.intro}</p>
    <div class="chat-list">
      ${mg.chat.map(c => `<button class="chat-bubble clickable-bubble ${mgs.selected.includes(c.id) ? "bubble-flagged" : ""}"
        data-mg-chat="${c.id}" data-mg-lesson="${lid}">
        <span class="chat-sender">${c.sender}</span>
        <p>${c.text}</p>
        ${mgs.selected.includes(c.id) ? '<span class="flag-indicator">🚩 Đã đánh dấu</span>' : ""}
      </button>`).join("")}
    </div>
    <p class="mg-hint">Đã đánh dấu: ${mgs.selected.length} tin nhắn</p>
    <button class="mg-submit-btn" data-mg-submit="${lid}">Nộp kết quả</button>
  </section>`;
}

// --- Evidence Collector ---
function renderEvidenceCollector(mg, mgs, lid) {
  if (mgs.submitted) {
    const shouldKeep = mg.items.filter(i => i.keep);
    const correct = shouldKeep.filter(i => mgs.selected.includes(i.id)).length;
    const wrongSel = mgs.selected.filter(id => !mg.items.find(i => i.id === id)?.keep).length;
    const passed = correct >= shouldKeep.length - 1 && wrongSel === 0;
    return `<section class="minigame-block" data-mg-lesson="${lid}">
      <p class="eyebrow">Minigame · Evidence Collector</p>
      <h3 class="mg-title">${mg.title}</h3>
      <div class="mg-result ${passed ? "mg-pass" : "mg-fail"}">
        <strong>${passed ? "✅ Tốt!" : "⚠️ Cần xem lại"}</strong>
        <p>Chọn đúng <strong>${correct}/${shouldKeep.length}</strong> bằng chứng cần lưu${wrongSel > 0 ? `, chọn nhầm ${wrongSel} hành động sai` : ""}.</p>
      </div>
      <div class="evidence-list">
        ${mg.items.map(item => `<div class="evidence-item ${item.keep ? (mgs.selected.includes(item.id) ? "ev-correct" : "ev-missed") : (mgs.selected.includes(item.id) ? "ev-wrong" : "ev-ok")}">
          <span class="ev-text">${item.keep ? "✅" : "❌"} ${item.text}</span>
          <small class="ev-reason">${item.reason}</small>
        </div>`).join("")}
      </div>
      ${mgResetBtn(lid)}
    </section>`;
  }
  return `<section class="minigame-block" data-mg-lesson="${lid}">
    <p class="eyebrow">Minigame · Evidence Collector</p>
    <h3 class="mg-title">${mg.title}</h3>
    <p class="mg-intro">${mg.intro}</p>
    <div class="evidence-list">
      ${mg.items.map(item => `<button class="evidence-item ev-clickable ${mgs.selected.includes(item.id) ? "ev-selected" : ""}"
        data-mg-ev="${item.id}" data-mg-lesson="${lid}">
        <span class="ev-text">${item.text}</span>
      </button>`).join("")}
    </div>
    <p class="mg-hint">Đã chọn: ${mgs.selected.length} mục</p>
    <button class="mg-submit-btn" data-mg-submit="${lid}">Nộp kết quả</button>
  </section>`;
}

// --- Pressure Meter ---
function renderPressureMeter(mg, mgs, lid) {
  if (mgs.submitted) {
    const totalTactics = mg.segs.filter(s => s.isTactic).length;
    const found = mg.segs.filter(s => s.isTactic && mgs.selected.includes(s.id)).length;
    const falsePos = mgs.selected.filter(id => !mg.segs.find(s => s.id === id)?.isTactic).length;
    const passed = found >= totalTactics - 1 && falsePos === 0;
    return `<section class="minigame-block" data-mg-lesson="${lid}">
      <p class="eyebrow">Minigame · Pressure Meter</p>
      <h3 class="mg-title">${mg.title}</h3>
      <div class="mg-result ${passed ? "mg-pass" : "mg-fail"}">
        <strong>${passed ? "✅ Xuất sắc!" : "⚠️ Cần luyện thêm"}</strong>
        <p>Nhận ra <strong>${found}/${totalTactics}</strong> kỹ thuật thao túng tâm lý.</p>
      </div>
      <p class="mg-hint">${mg.scene}</p>
      <div class="pressure-list">
        ${mg.segs.map(s => `<div class="pressure-seg ${s.isTactic ? (mgs.selected.includes(s.id) ? "seg-correct" : "seg-missed") : (mgs.selected.includes(s.id) ? "seg-wrong" : "")}">
          <p class="seg-text">"${s.text}"</p>
          ${s.isTactic ? `<span class="tactic-label">${s.label}</span>` : ""}
        </div>`).join("")}
      </div>
      ${mgResetBtn(lid)}
    </section>`;
  }
  return `<section class="minigame-block" data-mg-lesson="${lid}">
    <p class="eyebrow">Minigame · Pressure Meter</p>
    <h3 class="mg-title">${mg.title}</h3>
    <p class="mg-intro">${mg.intro}</p>
    <p class="mg-hint">${mg.scene}</p>
    <div class="pressure-list">
      ${mg.segs.map(s => `<button class="pressure-seg seg-clickable ${mgs.selected.includes(s.id) ? "seg-flagged" : ""}"
        data-mg-seg="${s.id}" data-mg-lesson="${lid}">
        <p class="seg-text">"${s.text}"</p>
        ${mgs.selected.includes(s.id) ? '<span class="flag-indicator">🚩</span>' : ""}
      </button>`).join("")}
    </div>
    <p class="mg-hint">Đã đánh dấu: ${mgs.selected.length} câu</p>
    <button class="mg-submit-btn" data-mg-submit="${lid}">Nộp kết quả</button>
  </section>`;
}

function renderModuleStrip() {
  const saved = readProgress();
  document.querySelector("#moduleStrip").innerHTML = modules.map((module, index) => `
    <button class="module-tab ${index === state.moduleIndex ? "active" : ""} ${!isModuleUnlocked(index) ? "locked" : ""}" data-module-index="${index}" ${!isModuleUnlocked(index) ? "disabled" : ""}>
      <span>${saved[`module-${module.id}`] ? "Done" : !isModuleUnlocked(index) ? "Locked" : `Module ${module.id}`}</span>
      <strong>${module.title}</strong>
    </button>
  `).join("");
}

function renderLearning() {
  const module = currentModule();
  renderModuleStrip();

  document.querySelector("#sectionTabs").innerHTML = module.sections.map((section, index) => `
    <button class="section-tab ${index === state.sectionIndex ? "active" : ""}" data-section-index="${index}">
      ${section.title}
    </button>
  `).join("");

  document.querySelector("#lessonTabs").innerHTML = currentSection().lessons.map((lessonItem, index) => `
    <button class="lesson-tab ${index === state.lessonIndex ? "active" : ""}" data-lesson-index="${index}">
      <span>${lessonItem.id}</span>${lessonItem.title}
    </button>
  `).join("");

  const lessonItem = currentLesson();
  document.querySelector("#lessonCard").innerHTML = `
    <p class="eyebrow">${lessonItem.id} | ${currentSection().title}</p>
    <h2>${lessonItem.title}</h2>
    <div class="context-block">
      <h3>Bối cảnh học tập</h3>
      <p>${module.scenario}</p>
      <p>Ở cấp BASIC, mục tiêu không phải là kết luận thật/giả bằng cảm tính. Người học cần xây dựng thói quen đọc nguồn, hiểu bối cảnh, quan sát tín hiệu kỹ thuật và chọn phản ứng ít gây hại nhất trước khi chia sẻ hoặc hành động.</p>
    </div>
    ${lessonItem.paragraphs.map((paragraph) => `<p>${paragraph}</p>`).join("")}
    <div class="context-block">
      <h3>Phân tích sâu hơn</h3>
      <p>Hãy luôn tách ba lớp: nội dung đang nói gì, ai đang phát tán nó, và người xem bị thúc đẩy phải làm gì. Deepfake nguy hiểm nhất khi nó kết hợp hình ảnh/giọng nói có vẻ quen thuộc với áp lực thời gian, cảm xúc mạnh hoặc yêu cầu nhạy cảm như tiền, OTP, dữ liệu cá nhân và quyền truy cập.</p>
      <p>Khi luyện tập, đừng chỉ tìm một lỗi nhỏ trên khuôn mặt hay âm thanh. Một dấu hiệu đơn lẻ có thể đến từ nén video, ánh sáng kém hoặc thiết bị ghi. Cách học đúng là gom nhiều tín hiệu, kiểm tra nguồn độc lập, lưu bằng chứng nếu có rủi ro và phản hồi theo quy trình.</p>
    </div>
    <div class="takeaway-box">
      <h3>Điểm cần nhớ</h3>
      <ul>${lessonItem.takeaways.map((item) => `<li>${item}</li>`).join("")}</ul>
    </div>
    ${renderLessonMinigame(lessonItem.id)}
    ${renderInlineCheckpoint()}
  `;

  updateReaderButtons();
  saveLastLocation();
}

function updateReaderButtons() {
  document.querySelector("#prevLesson").disabled = state.moduleIndex === 0 && state.sectionIndex === 0 && state.lessonIndex === 0;
  const atLastLesson = state.sectionIndex === currentModule().sections.length - 1 && state.lessonIndex === currentSection().lessons.length - 1;
  const atLastModule = state.moduleIndex === modules.length - 1;
  const moduleDone = readProgress()[`module-${currentModule().id}`];
  if (atLastLesson && !moduleDone) document.querySelector("#nextLesson").textContent = "Làm quiz module";
  else if (atLastLesson && atLastModule) document.querySelector("#nextLesson").textContent = "Final steps";
  else document.querySelector("#nextLesson").textContent = "Tiếp theo";
}

function moveLesson(direction) {
  if (direction > 0) {
    if (state.lessonIndex < currentSection().lessons.length - 1) state.lessonIndex += 1;
    else if (state.sectionIndex < currentModule().sections.length - 1) { state.sectionIndex += 1; state.lessonIndex = 0; }
    else if (!readProgress()[`module-${currentModule().id}`]) {
      startQuiz(`Quiz Module ${currentModule().id}`, "Module Quiz", currentModule().quiz);
      return;
    }
    else if (state.moduleIndex < modules.length - 1 && isModuleUnlocked(state.moduleIndex + 1)) { state.moduleIndex += 1; state.sectionIndex = 0; state.lessonIndex = 0; }
    else routeTo("exam");
  } else {
    if (state.lessonIndex > 0) state.lessonIndex -= 1;
    else if (state.sectionIndex > 0) { state.sectionIndex -= 1; state.lessonIndex = currentSection().lessons.length - 1; }
    else if (state.moduleIndex > 0) {
      state.moduleIndex -= 1;
      state.sectionIndex = currentModule().sections.length - 1;
      state.lessonIndex = currentSection().lessons.length - 1;
    }
  }
  resetInlineCheckpoint();
  renderLearning();
  routeTo("learn");
}

function renderAssessments() {
  renderCourseEvaluation();
  document.querySelector("#assessmentGrid").innerHTML = assessments.map((item) => `
    <article class="assessment-card">
      <span>${item.questions}</span>
      <h3>${item.title}</h3>
      <strong>${item.scope}</strong>
      <p>${item.detail}</p>
      <button class="ghost-btn" data-assessment="${item.title}">Xem cấu trúc</button>
    </article>
  `).join("");
  const finalButton = document.querySelector('[data-assessment="Final Exam"]');
  if (!finalButton) return;
  const finalCard = finalButton.closest(".assessment-card");
  const result = readFinalExamResult();
  if (!hasCompletedCourseEvaluation()) {
    finalButton.disabled = true;
    finalButton.textContent = "Hoan thanh danh gia de mo";
    finalCard?.classList.add("locked");
  } else if (result?.passed) {
    finalButton.textContent = "Final Exam da dat";
    finalCard?.classList.add("passed");
  } else if (result && !result.passed) {
    finalButton.textContent = `Thi lai Final Exam (${result.percent}%)`;
  } else {
    finalButton.textContent = "Bat dau Final Exam";
  }
}

function renderCourseEvaluation() {
  const panel = document.querySelector("#courseEvaluationPanel");
  if (!panel) return;

  if (!isCourseComplete()) {
    panel.innerHTML = `
      <div class="evaluation-card locked">
        <p class="eyebrow">Course evaluation</p>
        <h3>Danh gia khoa hoc se mo sau khi hoan thanh 9 module.</h3>
        <p>Hoan tat toan bo module va quiz module truoc khi vao buoc danh gia cuoi khoa.</p>
      </div>
    `;
    return;
  }

  if (hasCompletedCourseEvaluation()) {
    const finalResult = readFinalExamResult();
    panel.innerHTML = `
      <div class="evaluation-card done">
        <p class="eyebrow">Course evaluation</p>
        <h3>Da ghi nhan danh gia khoa hoc.</h3>
        <p>${finalResult?.passed ? `Final Exam da dat ${finalResult.percent}%. Certificate da san sang.` : "Cam on phan hoi cua ban. Final Exam da duoc mo khoa."}</p>
      </div>
    `;
    return;
  }

  panel.innerHTML = `
    <form class="evaluation-card" id="courseEvaluationForm">
      <div>
        <p class="eyebrow">Required before Final Exam</p>
        <h3>Danh gia khoa hoc</h3>
        <p>Phan nay giup DEEPFENSE cai thien chat luong bai hoc, nhip do va trai nghiem thi cu.</p>
      </div>
      <label>
        Muc hai long tong the
        <select name="rating" required>
          <option value="">Chon danh gia</option>
          <option value="5">5 - Rat tot</option>
          <option value="4">4 - Tot</option>
          <option value="3">3 - Tam on</option>
          <option value="2">2 - Can cai thien</option>
          <option value="1">1 - Chua phu hop</option>
        </select>
      </label>
      <label>
        Nhip do khoa hoc
        <select name="pace" required>
          <option value="">Chon nhip do</option>
          <option value="right">Vua phu hop</option>
          <option value="fast">Hoi nhanh</option>
          <option value="slow">Hoi cham</option>
        </select>
      </label>
      <label>
        Sau khoa hoc, ban tu tin nhan dien deepfake o muc nao?
        <select name="confidence" required>
          <option value="">Chon muc tu tin</option>
          <option value="high">Tu tin</option>
          <option value="medium">Tam on, can luyen them</option>
          <option value="low">Chua tu tin</option>
        </select>
      </label>
      <label>
        Gop y cai thien (neu co)
        <textarea name="feedback" rows="4" placeholder="Noi dung nao nen them, bo, lam ro hon hoac thiet ke lai?"></textarea>
      </label>
      <button class="primary-btn" type="submit">Gui danh gia va mo Final Exam</button>
    </form>
  `;
}

function startQuiz(title, type, questions) {
  const shuffled = questions.map((question) => ({
    ...question,
    options: question.options.map((option, index) => ({ option, original: index })).sort(() => Math.random() - 0.5),
  }));
  state.quiz = {
    title,
    type,
    questions: shuffled,
    answers: new Array(questions.length).fill(null),
    index: 0,
    submitted: false,
  };
  trackLearningEvent("quiz_started", {
    title,
    type,
    order: shuffled.map((question) => question.options.map((option) => option.original)),
  });
  document.querySelector("#quizModal").classList.add("open");
  document.querySelector("#quizModal").setAttribute("aria-hidden", "false");
  renderQuizQuestion();
}

function startFinalExam() {
  startQuiz("Final Exam", "Final Exam", buildFinalExamQuestions());
}

function renderQuizQuestion() {
  const quiz = state.quiz;
  const question = quiz.questions[quiz.index];
  document.querySelector("#modalQuizType").textContent = quiz.type;
  document.querySelector("#modalQuizTitle").textContent = quiz.title;
  document.querySelector("#quizCounter").textContent = `${quiz.index + 1}/${quiz.questions.length}`;
  document.querySelector("#quizProgress").style.width = `${((quiz.index + 1) / quiz.questions.length) * 100}%`;
  document.querySelector("#quizCard").innerHTML = `
    <h3>${question.text}</h3>
    <div class="answer-list">
      ${question.options.map((item, index) => `
        <label class="${quiz.answers[quiz.index] === item.original ? "selected" : ""}">
          <input type="radio" name="quiz-answer" value="${item.original}" ${quiz.answers[quiz.index] === item.original ? "checked" : ""} />
          <span>${String.fromCharCode(65 + index)}</span>
          ${item.option}
        </label>
      `).join("")}
    </div>
  `;
  document.querySelector("#prevQuestion").disabled = quiz.index === 0;
  document.querySelector("#nextQuestion").textContent = quiz.index === quiz.questions.length - 1 ? "Nộp bài" : "Câu sau →";
  document.querySelector("#quizResult").innerHTML = "";
}

function submitQuiz() {
  const quiz = state.quiz;
  if (quiz.submitted) return;
  let score = 0;
  quiz.questions.forEach((question, index) => {
    if (quiz.answers[index] === question.answer) score += 1;
  });
  const percent = Math.round((score / quiz.questions.length) * 100);
  quiz.submitted = true;
  document.querySelector("#quizResult").innerHTML = `
    <strong>${percent >= 70 ? "Đạt" : "Chưa đạt"}: ${score}/${quiz.questions.length} (${percent}%)</strong>
    <p>${percent >= 70 ? "Bạn đã nắm được trọng tâm. Hãy tiếp tục sang phần học tiếp theo." : "Hãy đọc lại các điểm cần nhớ rồi thử lại để củng cố kiến thức."}</p>
  `;
  trackLearningEvent("quiz_submitted", { title: quiz.title, type: quiz.type, score, total: quiz.questions.length, percent });
  if (quiz.type === "Final Exam") {
    const result = {
      score,
      total: quiz.questions.length,
      percent,
      passed: percent >= 70,
      examId: buildExamId(),
      questionSources: quiz.questions.map((question) => question.source || ""),
      submittedAt: new Date().toISOString(),
      passedAt: percent >= 70 ? new Date().toISOString() : "",
    };
    localStorage.setItem(FINAL_EXAM_KEY, JSON.stringify(result));
    document.querySelector("#quizResult").innerHTML = `
      <strong>${result.passed ? "Dat Final Exam" : "Chua dat Final Exam"}: ${score}/${quiz.questions.length} (${percent}%)</strong>
      <p>${result.passed ? "Ban da dat dieu kien thi tot nghiep. Certificate va reward DPF coin se duoc mo theo trang thai xet duyet." : "Diem dat la 70%. Hay on lai cac module con yeu va thi lai khi san sang."}</p>
    `;
    renderAssessments();
    updateProgress();
  } else if (percent >= 70 && quiz.type === "Module Quiz") {
    completeCurrentModule();
  } else {
    updateProgress();
  }
}

function markProgress() {
  completeCurrentModule();
}

function updateProgress() {
  const saved = readProgress();
  const done = Object.keys(saved).filter((key) => saved[key]).length;
  const percent = Math.min(100, Math.round(
    (done / modules.length) * 85 +
    (hasCompletedCourseEvaluation() ? 5 : 0) +
    (hasPassedFinalExam() ? 10 : 0)
  ));
  document.querySelector("#courseProgressText").textContent = `${percent}%`;
  document.querySelector("#courseProgressBar").style.width = `${percent}%`;
  updateCertificateState();
}

function bindEvents() {
  document.querySelectorAll("[data-route]").forEach((button) => button.addEventListener("click", () => routeTo(button.dataset.route)));
  document.addEventListener("click", (event) => {
    const routeJump = event.target.closest("[data-route-jump]");
    if (routeJump) routeTo(routeJump.dataset.routeJump);

    const moduleButton = event.target.closest("[data-module-index]");
    if (moduleButton) {
      const nextIndex = Number(moduleButton.dataset.moduleIndex);
      if (!isModuleUnlocked(nextIndex)) {
        trackLearningEvent("locked_module_attempt", { moduleIndex: nextIndex });
        return;
      }
      state.moduleIndex = nextIndex;
      state.sectionIndex = 0;
      state.lessonIndex = 0;
      resetInlineCheckpoint();
      renderLearning();
      routeTo("learn");
    }

    const openModule = event.target.closest("[data-open-module]");
    if (openModule) {
      const nextIndex = modules.findIndex((module) => module.id === Number(openModule.dataset.openModule));
      if (!isModuleUnlocked(nextIndex)) {
        trackLearningEvent("locked_module_attempt", { moduleIndex: nextIndex });
        return;
      }
      state.moduleIndex = nextIndex;
      state.sectionIndex = 0;
      state.lessonIndex = 0;
      resetInlineCheckpoint();
      renderLearning();
      routeTo("learn");
    }

    const sectionButton = event.target.closest("[data-section-index]");
    if (sectionButton) {
      state.sectionIndex = Number(sectionButton.dataset.sectionIndex);
      state.lessonIndex = 0;
      resetInlineCheckpoint();
      renderLearning();
    }

    const lessonButton = event.target.closest("[data-lesson-index]");
    if (lessonButton) {
      state.lessonIndex = Number(lessonButton.dataset.lessonIndex);
      resetInlineCheckpoint();
      renderLearning();
    }

    const inlineAnswer = event.target.closest("[data-inline-answer]");
    if (inlineAnswer) {
      state.inlineAnswers[Number(inlineAnswer.dataset.inlineAnswer)] = Number(inlineAnswer.value);
      state.inlineSubmitted = false;
    }

    const inlineSubmit = event.target.closest("[data-submit-inline-checkpoint]");
    if (inlineSubmit) {
      state.inlineSubmitted = true;
      const result = document.querySelector("#inlineCheckpointResult");
      if (result) result.textContent = renderInlineCheckpointResult();
    }

    // ---- Minigame event handlers ----

    // Artifact Spotter: toggle zone
    const mgZone = event.target.closest("[data-mg-zone]");
    if (mgZone) {
      const lid = mgZone.dataset.mgLesson;
      const zid = mgZone.dataset.mgZone;
      const mgs = getMgState(lid);
      mgs.selected = mgs.selected.includes(zid) ? mgs.selected.filter(z => z !== zid) : [...mgs.selected, zid];
      refreshMinigame(lid);
    }

    // URL Detective: classify url
    const mgUrl = event.target.closest("[data-mg-url]");
    if (mgUrl) {
      const lid = mgUrl.dataset.mgLesson;
      const mgs = getMgState(lid);
      mgs.answers[mgUrl.dataset.mgUrl] = mgUrl.dataset.mgChoice;
      refreshMinigame(lid);
    }

    // OTP Trap: pick option
    const mgOpt = event.target.closest("[data-mg-opt]");
    if (mgOpt) {
      const lid = mgOpt.dataset.mgLesson;
      const mgs = getMgState(lid);
      mgs.selected = [Number(mgOpt.dataset.mgOpt)];
      refreshMinigame(lid);
    }

    // Scam Chat Triage: toggle flag
    const mgChat = event.target.closest("[data-mg-chat]");
    if (mgChat) {
      const lid = mgChat.dataset.mgLesson;
      const cid = mgChat.dataset.mgChat;
      const mgs = getMgState(lid);
      mgs.selected = mgs.selected.includes(cid) ? mgs.selected.filter(c => c !== cid) : [...mgs.selected, cid];
      refreshMinigame(lid);
    }

    // Evidence Collector: toggle item
    const mgEv = event.target.closest("[data-mg-ev]");
    if (mgEv) {
      const lid = mgEv.dataset.mgLesson;
      const eid = mgEv.dataset.mgEv;
      const mgs = getMgState(lid);
      mgs.selected = mgs.selected.includes(eid) ? mgs.selected.filter(e => e !== eid) : [...mgs.selected, eid];
      refreshMinigame(lid);
    }

    // Pressure Meter: toggle segment
    const mgSeg = event.target.closest("[data-mg-seg]");
    if (mgSeg) {
      const lid = mgSeg.dataset.mgLesson;
      const sid = mgSeg.dataset.mgSeg;
      const mgs = getMgState(lid);
      mgs.selected = mgs.selected.includes(sid) ? mgs.selected.filter(s => s !== sid) : [...mgs.selected, sid];
      refreshMinigame(lid);
    }

    // Verification Call: pick step option
    const mgVcOpt = event.target.closest("[data-mg-vcopt]");
    if (mgVcOpt) {
      const lid = mgVcOpt.dataset.mgVclid;
      const mgs = getMgState(lid);
      mgs.answers[Number(mgVcOpt.dataset.mgVcstep)] = Number(mgVcOpt.dataset.mgVcopt);
      mgs.stepSubmitted = false;
      refreshMinigame(lid);
    }

    // Verification Call: confirm step
    const mgVcConfirm = event.target.closest("[data-mg-vcconfirm]");
    if (mgVcConfirm) {
      const lid = mgVcConfirm.dataset.mgVcconfirm;
      const mgs = getMgState(lid);
      const mg = MINIGAMES[lid];
      const step = mgs.step || 0;
      const chosen = mg.steps[step].opts[mgs.answers[step]];
      if (chosen) mgs.totalScore = (mgs.totalScore || 0) + chosen.s;
      mgs.stepSubmitted = true;
      refreshMinigame(lid);
    }

    // Verification Call: go to next step
    const mgVcNext = event.target.closest("[data-mg-vcnext]");
    if (mgVcNext) {
      const lid = mgVcNext.dataset.mgVcnext;
      const mgs = getMgState(lid);
      mgs.step = (mgs.step || 0) + 1;
      mgs.stepSubmitted = false;
      refreshMinigame(lid);
    }

    // Submit minigame (all types)
    const mgSubmit = event.target.closest("[data-mg-submit]");
    if (mgSubmit) {
      const lid = mgSubmit.dataset.mgSubmit;
      const mgs = getMgState(lid);
      mgs.submitted = true;
      refreshMinigame(lid);
    }

    // Reset minigame
    const mgReset = event.target.closest("[data-mg-reset]");
    if (mgReset) {
      const lid = mgReset.dataset.mgReset;
      state.minigameState[lid] = { selected: [], answers: {}, step: 0, totalScore: 0, submitted: false, stepSubmitted: false };
      refreshMinigame(lid);
    }

    // ---- End minigame handlers ----

    const assessmentButton = event.target.closest("[data-assessment]");
    if (assessmentButton) {
      if (assessmentButton.dataset.assessment === "Final Exam" && !hasCompletedCourseEvaluation()) {
        trackLearningEvent("locked_final_attempt", { reason: "course_evaluation_required" });
        renderAssessments();
        return;
      }
      if (assessmentButton.dataset.assessment === "Final Exam") {
        startFinalExam();
        return;
      }
      startQuiz(assessmentButton.dataset.assessment, "Assessment Preview", currentModule().quiz);
    }
  });

  document.addEventListener("submit", (event) => {
    if (event.target.id !== "courseEvaluationForm") return;
    event.preventDefault();
    const form = event.target;
    const formData = new FormData(form);
    const evaluation = {
      rating: String(formData.get("rating") || ""),
      pace: String(formData.get("pace") || ""),
      confidence: String(formData.get("confidence") || ""),
      feedback: String(formData.get("feedback") || "").trim(),
      submittedAt: new Date().toISOString(),
    };
    if (!evaluation.rating || !evaluation.pace || !evaluation.confidence) return;
    localStorage.setItem(EVALUATION_KEY, JSON.stringify(evaluation));
    trackLearningEvent("course_evaluation_submitted", {
      rating: evaluation.rating,
      pace: evaluation.pace,
      confidence: evaluation.confidence,
      hasFeedback: !!evaluation.feedback,
    });
    renderAssessments();
    updateProgress();
  });

  document.addEventListener("change", (event) => {
    const inlineAnswer = event.target.closest?.("[data-inline-answer]");
    if (!inlineAnswer) return;
    state.inlineAnswers[Number(inlineAnswer.dataset.inlineAnswer)] = Number(inlineAnswer.value);
    state.inlineSubmitted = false;
    const result = document.querySelector("#inlineCheckpointResult");
    if (result) result.textContent = "";
  });

  document.querySelector("#continueLearning").addEventListener("click", () => routeTo("learn"));
  document.querySelector("#backToAcademy").addEventListener("click", () => { window.location.href = "/academy"; });
  document.querySelector("#sidebarToggle").addEventListener("click", () => {
    document.querySelector(".course-shell").classList.add("sidebar-collapsed");
    document.querySelector("#sidebarToggle").setAttribute("aria-expanded", "false");
    document.querySelector("#sidebarOpen").hidden = false;
  });
  document.querySelector("#sidebarOpen").addEventListener("click", () => {
    document.querySelector(".course-shell").classList.remove("sidebar-collapsed");
    document.querySelector("#sidebarToggle").setAttribute("aria-expanded", "true");
    document.querySelector("#sidebarOpen").hidden = true;
  });
  document.querySelector("#prevLesson").addEventListener("click", () => moveLesson(-1));
  document.querySelector("#nextLesson").addEventListener("click", () => moveLesson(1));
  document.querySelector("#closeQuiz").addEventListener("click", closeQuiz);
  document.querySelector("#quizModal").addEventListener("click", (event) => { if (event.target.id === "quizModal") closeQuiz(); });
  document.querySelector("#prevQuestion").addEventListener("click", () => {
    if (state.quiz.index > 0) {
      state.quiz.index -= 1;
      renderQuizQuestion();
    }
  });
  document.querySelector("#nextQuestion").addEventListener("click", () => {
    if (state.quiz.index < state.quiz.questions.length - 1) {
      state.quiz.index += 1;
      renderQuizQuestion();
    } else {
      submitQuiz();
    }
  });
  document.querySelector("#quizCard").addEventListener("change", (event) => {
    if (event.target.name === "quiz-answer") {
      state.quiz.answers[state.quiz.index] = Number(event.target.value);
      renderQuizQuestion();
    }
  });

  document.addEventListener("copy", (event) => {
    if (!state.quiz) return;
    event.preventDefault();
    trackLearningEvent("copy_blocked", { quizTitle: state.quiz.title, quizType: state.quiz.type });
  });

  document.addEventListener("visibilitychange", () => {
    if (document.hidden && state.quiz) {
      trackLearningEvent("visibility_hidden", { quizTitle: state.quiz.title, quizType: state.quiz.type });
    }
  });
}

function closeQuiz() {
  document.querySelector("#quizModal").classList.remove("open");
  document.querySelector("#quizModal").setAttribute("aria-hidden", "true");
  state.quiz = null;
}

function init() {
  if (!requireAcademyAuth()) return;
  seedAdminCompletion();
  restoreLastLocation();
  renderOverview();
  renderLearning();
  renderAssessments();
  bindEvents();
  startQuiz("Đánh giá đầu vào", "Pre-assessment", pretestQuestions);
  closeQuiz();
  document.querySelector("#pretestStage").innerHTML = `
    <div class="pretest-card">
      <h3>10 câu · Không đánh rớt · Có gợi ý trình độ</h3>
      <p>Hãy làm bài đánh giá nhanh trước khi bắt đầu để hệ thống gợi ý nhịp học phù hợp.</p>
      <button class="primary-btn" id="startPretest">Bắt đầu đánh giá</button>
    </div>
  `;
  document.querySelector("#startPretest").addEventListener("click", () => startQuiz("Đánh giá đầu vào", "Pre-assessment", pretestQuestions));
  routeTo(state.route && state.route !== "overview" ? state.route : "learn");
}

init();
