const fs = require('fs');
const path = require('path');
const file = path.join(__dirname, 'src/data/course.js');
let src = fs.readFileSync(file, 'utf8');

const MODULE3 = `  // ── MODULE 3 ─────────────────────────────────────────────────
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

`;

const startMarker = '  // ── MODULE 3 ─────────────────────────────────────────────────';
const endMarker = '\n  // ── MODULE 4 ─────────────────────────────────────────────────';

const startIdx = src.indexOf(startMarker);
const endIdx = src.indexOf(endMarker);

if (startIdx === -1 || endIdx === -1) {
  console.error('Could not find boundaries! startIdx:', startIdx, 'endIdx:', endIdx);
  process.exit(1);
}

const before = src.slice(0, startIdx);
const after = src.slice(endIdx);

src = before + MODULE3 + after;

fs.writeFileSync(file, src, 'utf8');
console.log('Done. Module 3 replaced successfully.');
console.log('File length:', src.length, 'chars');
