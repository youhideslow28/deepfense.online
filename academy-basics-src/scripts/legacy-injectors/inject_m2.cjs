// inject_m2.cjs — replaces Module 2 in course.js from DEEPFENSE_BASIC_Module_2_Content_v1.md
const fs = require('fs');
const path = require('path');

const file = path.join(__dirname, 'src', 'data', 'course.js');
let src = fs.readFileSync(file, 'utf8');

const MODULE2 = `  // ── MODULE 2 ─────────────────────────────────────────────────
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
`;

const startMarker = '  // ── MODULE 2 ─────────────────────────────────────────────────';
const endMarker = '\n  // ── MODULE 3 ─────────────────────────────────────────────────';

const startIdx = src.indexOf(startMarker);
const endIdx = src.indexOf(endMarker);

if (startIdx === -1) { console.error('START marker not found'); process.exit(1); }
if (endIdx === -1) { console.error('END marker not found'); process.exit(1); }

const before = src.slice(0, startIdx);
const after = src.slice(endIdx);
src = before + MODULE2 + after;

fs.writeFileSync(file, src, 'utf8');
console.log('Done. Module 2 replaced successfully.');
console.log('File length:', src.length, 'chars');
