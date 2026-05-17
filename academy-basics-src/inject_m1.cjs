// inject_m1.cjs — replaces Module 1 in course.js from DEEPFENSE_BASIC_Module_0_1_Content_v1.md
const fs = require('fs');
const path = require('path');

const file = path.join(__dirname, 'src', 'data', 'course.js');
let src = fs.readFileSync(file, 'utf8');

const MODULE1 = `  // ── MODULE 1 ─────────────────────────────────────────────────
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
            'Hiện tượng này đôi khi được gọi là "liar\\'s dividend": kẻ nói dối có thêm lợi thế vì mọi người biết nội dung số có thể bị làm giả.',
            'Vì vậy, mục tiêu của chúng ta không phải là nghi ngờ tất cả. Mục tiêu là kiểm chứng tốt hơn. Một xã hội khỏe mạnh là nơi con người biết hỏi: Bằng chứng đến từ đâu? Có nguồn độc lập không? Có ai có động cơ làm sai lệch không? Có đủ cơ sở để kết luận chưa?',
          ], [
            'Liar\\'s dividend: deepfake cũng có thể được dùng để phủ nhận nội dung thật.',
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
      q('Liar\\'s dividend trong bối cảnh deepfake là gì?', ['Người ta có thể dùng cáo buộc "deepfake" để phủ nhận bằng chứng thật', 'Lợi nhuận từ việc tạo deepfake', 'Tiền thưởng phát hiện deepfake', 'Thuật ngữ marketing'], 0),
      q('Câu trả lời an toàn nhất khi chưa đủ dữ liệu về nội dung nghi vấn là gì?', ['Tôi chưa đủ bằng chứng để tin, chia sẻ hoặc hành động', 'Chia sẻ ngay để người khác giúp đánh giá', 'Kết luận dựa trên cảm giác', 'Im lặng không làm gì'], 0),
      q('Trong thời đại deepfake, người an toàn nhất là người như thế nào?', ['Người biết kiểm chứng trước khi hành động, không phải người đoán nhanh nhất', 'Người có thiết bị công nghệ cao nhất', 'Người không dùng mạng xã hội', 'Người luôn nghi ngờ mọi thứ'], 0),
    ],
  },
`;

const startMarker = '  // ── MODULE 1 ─────────────────────────────────────────────────';
const endMarker = '\n  // ── MODULE 2 ─────────────────────────────────────────────────';

const startIdx = src.indexOf(startMarker);
const endIdx = src.indexOf(endMarker);

if (startIdx === -1) { console.error('START marker not found'); process.exit(1); }
if (endIdx === -1) { console.error('END marker not found'); process.exit(1); }

const before = src.slice(0, startIdx);
const after = src.slice(endIdx);
src = before + MODULE1 + after;

fs.writeFileSync(file, src, 'utf8');
console.log('Done. Module 1 replaced successfully.');
console.log('File length:', src.length, 'chars');
