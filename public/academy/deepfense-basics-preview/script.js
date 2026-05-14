const course = {
  title: "DEEPFENSE BASICS",
  credential: "DEEPFENSE AWARE",
  reward: "500 DPF coin",
  parts: [
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
  {
    id: 1,
    part: "foundation",
    title: "Khởi động: Một ngày bình thường trên không gian số",
    duration: "75 phút",
    level: "Foundation",
    scenario:
      "Một ngày của An bắt đầu rất bình thường: một video đầu tư có người nổi tiếng, một tin nhắn mượn tiền gấp, một hình ảnh nhạy cảm trong nhóm chat, rồi một cuộc gọi video giống người thân. Không tình huống nào tự nhận mình là deepfake. Tất cả đều chỉ yêu cầu An phản ứng thật nhanh.",
    outcomes: [
      "Hiểu vì sao deepfake không còn là chuyện xa lạ của người nổi tiếng hay phim ảnh.",
      "Nhận ra bất kỳ người dùng Internet nào cũng có thể gặp nội dung giả mạo, lừa đảo hoặc gây hiểu nhầm.",
      "Làm quen với cách học của DEEPFENSE BASIC: câu chuyện, quan sát, quyết định và phản hồi.",
      "Nắm quy trình Deepfense Check: Pause, Observe, Verify, Trace, Decide.",
    ],
    sections: [
      {
        title: "0.1 Chào mừng và đặt vấn đề",
        lessons: [
          lesson("0.1.1", "Chào mừng đến với DEEPFENSE BASIC", [
            "Chào mừng bạn đến với DEEPFENSE BASIC. Đây là khóa học nền tảng về deepfake và phòng vệ trước nội dung giả mạo trên không gian số. Bạn không cần biết lập trình, không cần hiểu sâu về trí tuệ nhân tạo, cũng không cần là chuyên gia an toàn thông tin.",
            "Bạn chỉ cần là một người đang sống trong thế giới số: có điện thoại, dùng mạng xã hội, xem video ngắn, nhận tin nhắn, nghe cuộc gọi, tham gia nhóm chat và đôi khi tự hỏi: nội dung này có thật không?",
            "Trong khóa học này, chúng ta không học cách tạo deepfake. Chúng ta học cách nhận ra rủi ro, kiểm chứng thông tin, bảo vệ bản thân, bảo vệ người khác và ra quyết định bình tĩnh hơn trước những nội dung có thể đánh lừa mắt, tai và cảm xúc.",
          ], ["Deepfake là vấn đề của niềm tin số, không chỉ là một video giả.", "Mục tiêu của khóa học là giúp bạn không hoảng sợ, không tin vội và không chia sẻ vội."]),
          lesson("0.1.2", "Từ 'có hình là thật' đến thời đại cần kiểm chứng", [
            "Trước đây, nhiều người nghĩ: có hình thì chắc là thật. Sau đó, chúng ta học rằng ảnh có thể bị chỉnh sửa. Rồi video trở thành bằng chứng mạnh hơn: có video thì chắc khó mà giả.",
            "Bây giờ, hình ảnh, video và giọng nói đều có thể được tạo ra hoặc biến đổi bằng AI theo cách rất thuyết phục. Một gương mặt quen, một giọng nói đúng tông, một biểu cảm có vẻ tự nhiên vẫn chưa đủ để kết luận.",
            "Điều đó không có nghĩa là phải nghi ngờ mọi thứ. Nếu cái gì cũng bị xem là giả, chúng ta sẽ mệt mỏi và mất phương hướng. Điều cần học là cách nghi ngờ hợp lý: biết khi nào nên dừng lại, hỏi thêm và kiểm chứng.",
          ], ["Không tin vội không có nghĩa là phủ nhận tất cả.", "Người an toàn là người biết kiểm chứng trước khi hành động."]),
          lesson("0.1.3", "Một ngày của An", [
            "Buổi sáng, An thấy một video người nổi tiếng giới thiệu kênh đầu tư lợi nhuận cao. Gương mặt đúng là người đó. Giọng nói cũng giống. Video có nhiều lượt xem và bình luận ủng hộ.",
            "Đến trưa, An nhận tin nhắn từ một người bạn cũ nói cần mượn tiền gấp vì tài khoản ngân hàng bị khóa. Ảnh đại diện đúng là bạn của An, tài khoản cũng đúng tên, chỉ có cách nhắn hơi khác mọi ngày.",
            "Chiều hôm đó, trong nhóm chat xuất hiện một hình ảnh nhạy cảm được cho là của một học sinh trong trường. Có người nói đó là ảnh AI, có người lại bảo cứ lưu lại đã. Buổi tối, An nhận cuộc gọi video ngắn từ người thân nói đang gặp chuyện khẩn cấp. Hình hơi mờ, âm thanh không rõ, nhưng giọng nghe rất quen.",
            "Nếu là An, bạn sẽ làm gì trước? Tin video đầu tư? Chuyển tiền? Lưu ảnh? Chia sẻ clip gây phẫn nộ? Không có câu trả lời an toàn nếu chúng ta không có phương pháp.",
          ], ["Deepfake thường xuất hiện trong bối cảnh đời thường, không phải trong phòng thí nghiệm.", "Áp lực phải hành động ngay là tín hiệu cần chậm lại."]),
        ],
        checkpoint: checkpoint("0.1", [
          q("Mục tiêu chính của DEEPFENSE BASIC là gì?", ["Học cách tạo deepfake", "Học cách nhận ra rủi ro, kiểm chứng và phản ứng an toàn", "Học mẹo vượt detector", "Tăng lượt xem nội dung"], 1),
          q("Khi nội dung khiến bạn muốn hành động ngay, điều đầu tiên nên làm là gì?", ["Chia sẻ ngay", "Dừng lại và kiểm chứng", "Bình luận thật mạnh", "Xóa hết dấu vết"], 1),
          q("Deepfake nguy hiểm nhất khi nào?", ["Khi nó xuất hiện đúng lúc người xem bị cảm xúc hoặc áp lực chi phối", "Khi file có dung lượng lớn", "Khi video có phụ đề", "Khi màn hình quá sáng"], 0),
        ]),
      },
      {
        title: "0.2 Deepfense Check",
        lessons: [
          lesson("0.2.1", "Năm bước kiểm chứng cơ bản", [
            "DEEPFENSE BASIC dùng một quy trình ngắn gọi là Deepfense Check. Bạn chưa cần thuộc lòng mọi chi tiết, nhưng cần nhớ logic: đừng để cảm xúc quyết định thay bạn.",
            "Pause: dừng lại trước khi phản ứng. Observe: quan sát dấu hiệu kỹ thuật và ngữ cảnh. Verify: xác minh qua kênh độc lập. Trace: truy nguồn nội dung. Decide: ra quyết định ít gây hại nhất.",
            "Quy trình này không biến bạn thành chuyên gia pháp chứng. Nó giúp bạn có một khoảng dừng đủ tốt để tránh chuyển tiền, chia sẻ, kết luận hoặc làm tổn thương người khác khi chưa có bằng chứng.",
          ], ["Pause, Observe, Verify, Trace, Decide là xương sống của khóa học.", "Một khoảng dừng đúng lúc có thể ngăn một thiệt hại lớn."]),
          lesson("0.2.2", "Vì sao khóa học này cần thiết?", [
            "Deepfake nguy hiểm không chỉ vì nó giả. Nó nguy hiểm vì nó xuất hiện đúng lúc con người ít phòng bị nhất: khi lo cho người thân, sợ mất tiền, xấu hổ, giận dữ, muốn giúp ai đó hoặc tin rằng mình đang nhìn thấy bằng chứng.",
            "Deepfake cũng hiếm khi hoạt động một mình. Nó thường đi cùng tài khoản bị chiếm quyền, tin nhắn thúc ép, link giả mạo, website giả, danh tính giả và sự lan truyền quá nhanh trong nhóm chat.",
            "Vì vậy, học về deepfake không chỉ là học nhìn mặt méo, mắt lạ hay giọng đều đều. Học về deepfake là học cách tự hỏi: ai gửi nội dung này, họ muốn mình làm gì, vì sao phải làm ngay, nếu mình sai ai sẽ bị hại, và có cách nào kiểm chứng độc lập không?",
          ], ["Deepfake là rủi ro truyền thông, tâm lý, tài chính và danh tính.", "Câu hỏi đúng thường quan trọng hơn cảm giác 'trông thật hay trông giả'."]),
          lesson("0.2.3", "Bạn sẽ học như thế nào?", [
            "Mỗi phần học thường bắt đầu bằng một tình huống giống đời thật. Sau đó bạn học khái niệm, quan sát dấu hiệu, chọn hành động và nhận phản hồi.",
            "Quiz trong khóa học không nhằm bắt lỗi bạn. Quiz giúp bạn kiểm tra xem mình đã hiểu đủ để dùng kiến thức trong đời thật chưa.",
            "Cuối khóa, hệ thống chọn 50 câu từ ngân hàng câu hỏi lớn hơn. Bạn cần đạt từ 70% trở lên, hoàn thành đánh giá khóa học và đủ tiến độ để mở certificate DEEPFENSE AWARE.",
          ], ["Khóa học ưu tiên phản xạ an toàn, không học vẹt thuật ngữ.", "Hoàn thành khóa học nghĩa là biết dùng kiến thức trong tình huống thực tế."]),
        ],
        checkpoint: checkpoint("0.2", [
          q("Trong Deepfense Check, Verify có nghĩa là gì?", ["Xác minh qua kênh độc lập", "Tin nếu video rõ nét", "Tải video về ngay", "Chia sẻ để hỏi cộng đồng"], 0),
          q("Deepfake thường đi cùng yếu tố nào?", ["Tin nhắn thúc ép, tài khoản giả hoặc link giả", "Chỉ đi cùng file PDF", "Chỉ xuất hiện trong phim", "Chỉ xảy ra khi mất mạng"], 0),
          q("Quiz trong khóa học chủ yếu để làm gì?", ["Kiểm tra khả năng áp dụng kiến thức", "Bắt lỗi người học", "Ẩn nội dung", "Tạo áp lực điểm số"], 0),
        ]),
      },
      {
        title: "1.1 Nhập môn deepfake",
        lessons: [
          lesson("1.1.1", "Deepfake là gì?", [
            "Deepfake là nội dung hình ảnh, video hoặc âm thanh được tạo, biến đổi hoặc tổng hợp bằng AI để khiến người xem hoặc người nghe tin rằng một người đã nói hoặc làm điều nào đó.",
            "Nói đơn giản, deepfake không chỉ là 'video giả'. Nó là nội dung mô phỏng danh tính: khuôn mặt, giọng nói, biểu cảm, chuyển động hoặc hành vi của một người.",
            "Điểm nguy hiểm nằm ở chỗ người xem thường không chỉ nhìn nội dung, mà còn gắn nội dung đó với niềm tin về con người thật phía sau: người thân, giáo viên, lãnh đạo, người nổi tiếng hoặc một nhân vật có ảnh hưởng.",
          ], ["Deepfake mô phỏng danh tính, không chỉ chỉnh sửa hình ảnh.", "Cần xem cả nội dung, ngữ cảnh và mục đích lan truyền."]),
          lesson("1.1.2", "Deepfake khác gì chỉnh sửa thông thường?", [
            "Một ảnh được tăng sáng, cắt khung hoặc thêm filter không nhất thiết là deepfake. Một video bị cắt ngắn cũng chưa chắc là deepfake, dù nó vẫn có thể gây hiểu nhầm.",
            "Deepfake thường liên quan đến việc mô phỏng hoặc thay thế một phần danh tính bằng AI: thay mặt, điều khiển miệng, giả giọng, tạo avatar, hoặc dựng cảnh như thể một người thật đã xuất hiện.",
            "Tuy nhiên, trong đời thật, rủi ro không nằm ở việc gọi tên công nghệ thật chuẩn ngay từ đầu. Rủi ro nằm ở việc bạn tin, chia sẻ hoặc hành động khi chưa đủ bằng chứng.",
          ], ["Không phải nội dung chỉnh sửa nào cũng là deepfake.", "Nhưng mọi nội dung có nguy cơ gây hại đều cần được kiểm chứng."]),
          lesson("1.1.3", "Vì sao ngày càng khó nhận ra?", [
            "Công nghệ tạo giả ngày càng tốt hơn và dễ tiếp cận hơn. Một người không cần phòng thu lớn vẫn có thể dùng công cụ AI để tạo hình ảnh, video hoặc giọng nói thuyết phục.",
            "Dữ liệu cá nhân của chúng ta cũng quá sẵn trên mạng: ảnh đại diện, video ngắn, giọng nói, bài đăng, mối quan hệ, nơi học, nơi làm. Kẻ xấu có thể dùng những mảnh dữ liệu đó để tạo một câu chuyện có vẻ đáng tin.",
            "Trong khi đó, nội dung lan nhanh hơn khả năng kiểm chứng. Một clip gây sốc có thể đi qua nhóm gia đình, nhóm lớp, mạng xã hội và tin nhắn riêng trước khi ai đó kịp tìm nguồn gốc.",
          ], ["Deepfake khó nhận ra vì công nghệ tốt hơn, dữ liệu cá nhân nhiều hơn và tốc độ lan truyền quá nhanh.", "Đừng chỉ dựa vào cảm giác 'trông thật'."]),
          lesson("1.1.4", "Mắt thường và công cụ đều có giới hạn", [
            "Nhiều hướng dẫn nói deepfake có thể bị nhận ra qua mắt chớp lạ, răng méo, tóc bất thường, bóng đổ sai, khẩu hình lệch hoặc giọng nói đều đều. Những dấu hiệu này hữu ích, nhưng không đủ để kết luận.",
            "Video thật cũng có thể trông lạ vì mạng yếu, camera kém, ánh sáng xấu, nén video hoặc ứng dụng gọi video bị trễ. Ngược lại, video giả có thể rất mượt.",
            "Công cụ phát hiện cũng chỉ là tín hiệu tham khảo. Một kết quả '90% nghi ngờ' không đồng nghĩa chắc chắn giả; một kết quả 'không phát hiện bất thường' cũng không chứng minh chắc chắn thật.",
          ], ["Cả mắt thường lẫn detector đều có thể sai.", "Hãy tổng hợp nhiều tín hiệu trước khi quyết định."]),
          lesson("1.1.5", "Không chỉ là thật hay giả", [
            "Khi gặp nội dung nghi vấn, nhiều người muốn trả lời ngay: thật hay giả. Nhưng thực tế có nhiều trạng thái hơn: thật, giả, thật nhưng sai bối cảnh, bị cắt ghép làm đổi nghĩa, có một phần thật một phần chưa rõ, hoặc chưa đủ dữ liệu để kết luận.",
            "Trạng thái 'chưa đủ dữ liệu' rất quan trọng. Nhiều khi câu trả lời an toàn nhất không phải là 'tôi biết chắc đây là giả', mà là 'tôi chưa đủ bằng chứng để tin, chia sẻ hoặc hành động'.",
            "Deepfake cũng tạo ra một rủi ro ngược: sự thật có thể bị phủ nhận bằng câu 'đó là deepfake'. Vì vậy mục tiêu không phải là nghi ngờ tất cả, mà là kiểm chứng tốt hơn.",
          ], ["Biết nói 'chưa đủ dữ liệu' là một kỹ năng mạnh.", "Mục tiêu của DEEPFENSE BASIC là ra quyết định an toàn hơn, không đoán nhanh hơn."]),
        ],
        checkpoint: checkpoint("1.1", [
          q("Deepfake khác chỉnh sửa thông thường chủ yếu ở điểm nào?", ["Thường dùng AI để mô phỏng hoặc giả mạo danh tính", "Chỉ làm ảnh đẹp hơn", "Luôn làm file nặng hơn", "Chỉ xuất hiện trong phim"], 0),
          q("Khi công cụ báo video '90% là deepfake', nên hiểu thế nào?", ["Đó là một tín hiệu cần kiểm chứng thêm", "Video chắc chắn giả", "Không cần xem nguồn nữa", "Có thể chia sẻ ngay"], 0),
          q("Câu nào an toàn nhất khi chưa đủ bằng chứng?", ["Tôi chưa đủ dữ liệu để tin, chia sẻ hoặc hành động", "Chắc chắn giả", "Chắc chắn thật", "Cứ chia sẻ để mọi người tự biết"], 0),
        ]),
      },
      {
        title: "1.2 Thực hành: Phân loại nội dung số",
        lessons: [
          lesson("1.2.1", "Vì sao cần phân loại?", [
            "Trong đời thật, không phải nội dung nào cũng rơi gọn vào một nhãn duy nhất. Một video có thể là deepfake, nhưng cũng có thể là video thật bị cắt sai bối cảnh, bị thêm phụ đề sai hoặc được đăng lại như một sự kiện mới.",
            "Mục tiêu của phần thực hành này không phải là gọi tên công nghệ hoàn hảo ngay lập tức. Mục tiêu là nhận ra rủi ro chính: có ai đang bị mạo danh không, có ai có thể bị hại không, người xem đang bị thúc ép làm gì, và có đủ bằng chứng để tin hoặc chia sẻ chưa.",
            "Bạn sẽ gặp các thẻ tình huống. Với mỗi thẻ, hãy chọn nhóm phù hợp nhất: deepfake, deepvoice, synthetic media, edited media, repurposed media hoặc chưa đủ dữ liệu để kết luận.",
          ], ["Phân loại giúp bạn nhìn rõ loại rủi ro trước khi quyết định.", "Không cần đoán thật/giả ngay khi chưa đủ dữ liệu."]),
          lesson("1.2.2", "Các nhóm nội dung thường gặp", [
            "Deepfake thường mô phỏng khuôn mặt, biểu cảm hoặc hành động của một người. Deepvoice mô phỏng hoặc tổng hợp giọng nói. Synthetic media là nội dung AI tạo ra, có thể vô hại nếu được ghi rõ là minh họa.",
            "Edited media là nội dung thật bị chỉnh sửa, cắt ghép, thêm phụ đề hoặc thay đổi âm thanh làm lệch nghĩa. Repurposed media là nội dung thật nhưng bị đặt vào sai thời gian, sai địa điểm hoặc sai bối cảnh.",
            "Nhóm 'chưa đủ dữ liệu' rất quan trọng. Khi chưa có nguồn gốc, chưa có xác nhận độc lập hoặc chưa rõ bối cảnh, lựa chọn an toàn nhất thường là chưa tin, chưa chia sẻ và tiếp tục kiểm chứng.",
          ], ["AI tạo ra không phải lúc nào cũng xấu; vấn đề nằm ở minh bạch và mục đích sử dụng.", "Nội dung thật đặt sai bối cảnh vẫn có thể gây hại như nội dung giả."]),
          lesson("1.2.3", "12 thẻ tình huống", [
            "Thẻ 1: video người nổi tiếng mời đầu tư nhưng không xuất hiện trên kênh chính thức. Hướng xử lý: kiểm tra nguồn chính thức, nguồn đầu tiên và dấu hiệu mạo danh.",
            "Thẻ 2: ảnh chuyên gia tài chính trông thật nhưng không tìm thấy danh tính ngoài website quảng cáo. Hướng xử lý: xem xét khả năng synthetic media hoặc danh tính giả.",
            "Thẻ 3: ghi âm giống giọng người thân yêu cầu chuyển tiền ngay. Hướng xử lý: xem là rủi ro deepvoice và xác minh qua số đã lưu trước đó.",
            "Thẻ 4: clip 7 giây cắt từ bài phát biểu dài làm người nói có vẻ nói ngược ý ban đầu. Hướng xử lý: xem bản đầy đủ và bối cảnh trước khi kết luận.",
            "Thẻ 5: video tai nạn từ năm trước được đăng lại như vừa xảy ra hôm nay. Hướng xử lý: kiểm tra thời gian, nguồn gốc và dấu hiệu repurposed media.",
            "Thẻ 6: ảnh sản phẩm do AI tạo nhưng ghi rõ là ảnh minh họa. Hướng xử lý: rủi ro thấp nếu minh bạch, không đánh đồng mọi nội dung AI với lừa đảo.",
            "Thẻ 7: cuộc gọi video bị giật, hình mờ, người gọi yêu cầu đọc OTP. Hướng xử lý: dù có phải deepfake hay không, yêu cầu OTP là dấu hiệu nguy hiểm.",
            "Thẻ 8: ảnh học sinh bị ghép vào nội dung nhạy cảm và lan trong nhóm chat. Hướng xử lý: không lan truyền, báo cáo, hỗ trợ người bị hại.",
            "Thẻ 9: video thật được ghép phụ đề sai để làm lệch ý nghĩa. Hướng xử lý: kiểm tra bản gốc và phụ đề, không chỉ nhìn hình ảnh.",
            "Thẻ 10: tài khoản mới dùng ảnh đẹp, ít bạn bè, rủ đầu tư và gửi video lợi nhuận. Hướng xử lý: chưa đủ dữ liệu để gọi tên loại media, nhưng có dấu hiệu lừa đảo.",
            "Thẻ 11: nhân vật AI dạy tiếng Anh được ghi rõ là nhân vật ảo. Hướng xử lý: synthetic media minh bạch có thể hữu ích.",
            "Thẻ 12: video chính trị gây sốc từ tài khoản không rõ nguồn, không có bản gốc và không có nguồn độc lập xác nhận. Hướng xử lý: chưa đủ dữ liệu, không chia sẻ khi chưa kiểm chứng.",
          ], ["Tình huống thực tế thường pha trộn nhiều rủi ro.", "Hành động an toàn nhất có thể là dừng lan truyền, lưu nguồn và kiểm chứng thêm."]),
          lesson("1.2.4", "Phản hồi sau thực hành", [
            "Nếu bạn phân loại chưa đúng hết, điều đó bình thường. Ranh giới giữa các loại nội dung đôi khi không rõ. Một video có thể vừa là deepfake, vừa có phụ đề sai, vừa được đăng trong bối cảnh gây hiểu nhầm.",
            "Điều quan trọng không phải là gọi tên hoàn hảo ngay từ đầu. Điều quan trọng là bạn bắt đầu biết hỏi: nội dung này đang khiến mình tin điều gì, có ai bị mạo danh không, có ai có thể bị hại không, mình có đủ bằng chứng để tin hoặc chia sẻ chưa?",
            "Trong Module 1, bài học lớn nhất là: không phải nhiệm vụ của bạn là trở thành chuyên gia pháp y số. Nhiệm vụ của bạn là biết khi nào cần chậm lại, kiểm chứng và không để cảm xúc quyết định thay mình.",
          ], ["Phân loại là công cụ để ra quyết định, không phải cuộc thi đoán nhãn.", "Người học tốt là người biết hỏi đúng câu hỏi trước khi hành động."]),
        ],
        checkpoint: checkpoint("1.2", [
          q("Video thật từ năm trước bị đăng lại như sự kiện hôm nay thuộc nhóm nào?", ["Repurposed media", "Voice deepfake", "Filter làm đẹp", "Không có rủi ro"], 0),
          q("Một clip thật bị cắt ngắn làm đổi nghĩa nên được xem là gì?", ["Edited media", "Chắc chắn deepvoice", "Không cần kiểm chứng", "Synthetic media minh bạch"], 0),
          q("Khi chưa đủ nguồn gốc và xác nhận độc lập, lựa chọn an toàn là gì?", ["Chưa tin, chưa chia sẻ và tiếp tục kiểm chứng", "Chia sẻ để hỏi cộng đồng", "Kết luận là giả", "Kết luận là thật"], 0),
        ]),
      },
    ],
    quiz: [
      q("Khi nhận cuộc gọi giống người thân yêu cầu chuyển tiền gấp, bước an toàn nhất là gì?", ["Ngắt cuộc gọi và xác minh qua số/kênh đã biết trước", "Chuyển tiền ngay", "Gửi OTP để họ xử lý", "Hỏi số tài khoản rồi chuyển thử"], 0),
      q("Deepfense Check gồm các bước nào?", ["Pause, Observe, Verify, Trace, Decide", "Post, Like, Share, Comment", "Copy, Paste, Upload", "Scan, Delete, Ignore"], 0),
      q("Vì sao nội dung gây phẫn nộ cần được kiểm chứng kỹ?", ["Vì cảm xúc mạnh thường làm người xem phản ứng nhanh và chia sẻ vội", "Vì video gây phẫn nộ luôn giả", "Vì chỉ nội dung chính trị mới nguy hiểm", "Vì bình luận nhiều là bằng chứng thật"], 0),
      q("Deepfake có thể xuất hiện ở dạng nào?", ["Hình ảnh, video, giọng nói hoặc avatar", "Chỉ video", "Chỉ văn bản", "Chỉ ảnh tĩnh"], 0),
      q("Điều gì KHÔNG nên làm với hình ảnh nhạy cảm nghi bị AI tạo hoặc ghép?", ["Lưu và chuyển tiếp để hỏi ý kiến nhóm", "Không lan truyền", "Báo cáo nội dung", "Tìm người có trách nhiệm hỗ trợ"], 0),
      q("Kết quả từ detector nên được xem là gì?", ["Một tín hiệu tham khảo", "Phán quyết cuối cùng", "Bằng chứng pháp lý tuyệt đối", "Lý do để bỏ qua nguồn"], 0),
      q("Tài khoản đúng tên và đúng ảnh đại diện có đủ để tin yêu cầu chuyển tiền không?", ["Không, tài khoản có thể bị chiếm quyền hoặc giả mạo", "Có, vì ảnh đúng", "Có, nếu số tiền nhỏ", "Có, nếu họ nhắn gấp"], 0),
      q("Mục tiêu chính của Module khởi động là gì?", ["Tạo phản xạ dừng lại, quan sát và kiểm chứng", "Dạy tạo deepfake", "Dạy vượt bài thi", "Dạy xóa bằng chứng"], 0),
      q("Khi chưa đủ dữ liệu để kết luận, lựa chọn nào phù hợp nhất?", ["Chưa tin, chưa chia sẻ, chưa hành động", "Kết luận theo cảm giác", "Chia sẻ để hỏi mọi người", "Tin nếu video nét"], 0),
      q("Deepfake nguy hiểm vì điều gì?", ["Có thể tác động đến niềm tin, danh tính, tiền bạc và danh dự", "Luôn làm hỏng thiết bị", "Chỉ làm mạng chậm", "Chỉ là trò đùa vô hại"], 0),
    ],
  },
  {
    id: 2,
    part: "foundation",
    title: "Vì sao con người dễ bị lừa?",
    duration: "90 phút",
    level: "Foundation",
    scenario: "An đã biết deepfake tồn tại, nhưng lúc 22:47 một cuộc gọi video mờ, giọng nói giống người thân và lời nhờ chuyển tiền gấp vẫn khiến An hoảng. Bài học này cho thấy kẻ xấu không cần bạn ngốc; chúng chỉ cần bạn đang lo, vội, tin, sợ hoặc muốn giúp.",
    outcomes: [
      "Hiểu vì sao con người có thể bị lừa ngay cả khi đã biết deepfake tồn tại.",
      "Nhận diện bốn nút bấm cảm xúc: khẩn cấp, thân quen, quyền lực và lợi ích.",
      "Biết vì sao hình ảnh, video, giọng nói và niềm tin nhóm tạo cảm giác rất thuyết phục.",
      "Thực hành xử lý một cuộc gọi khẩn cấp nghi giả mạo bằng kênh độc lập."
    ],
    sections: [
      {
        title: "2.1 Bốn nút bấm cảm xúc",
        lessons: [
          lesson("2.1.1", "Khẩn cấp", [
            "Khẩn cấp là công cụ mạnh vì nó làm não chuyển sang chế độ phản ứng nhanh. Khi nghe 'chỉ còn 5 phút', 'đừng tắt máy', 'nếu không làm ngay sẽ mất tiền', nhiều người hành động để giảm căng thẳng thay vì kiểm chứng.",
            "Trong an toàn số, dừng lại thường là hành động nhanh nhất để tránh thiệt hại. Một cuộc gọi yêu cầu chuyển tiền trong 2 phút có thể được kiểm chứng bằng cách gọi lại số đã lưu hoặc hỏi một người thân khác.",
            "Khẩn cấp thật vẫn chịu được một bước xác minh tối thiểu. Khẩn cấp giả thường sợ bạn có thêm 30 giây để hỏi lại."
          ], ["Càng bị ép làm ngay, càng cần chậm lại.", "Không chuyển tiền, đọc OTP hoặc cài app chỉ vì người kia nói đang gấp.", "Pause là kỹ năng đầu tiên của Deepfense Check."]),
          lesson("2.1.2", "Thân quen", [
            "Con người có xu hướng tin tài khoản quen, ảnh đại diện quen và giọng nói quen. Nhưng tài khoản thật có thể bị chiếm quyền, ảnh đại diện có thể bị sao chép, giọng nói có thể bị mô phỏng.",
            "Câu hỏi an toàn không phải là 'mình có quen tài khoản này không', mà là 'mình có chắc đúng người đang điều khiển tài khoản này không'.",
            "Nếu người quen nhờ chuyển tiền nhưng né gọi lại, gửi tài khoản lạ, đổi cách xưng hô hoặc thúc giục bất thường, hãy coi đó là tín hiệu rủi ro."
          ], ["Tài khoản quen không đảm bảo người thật đang ở phía sau.", "Xác minh qua kênh đã biết từ trước.", "Thân quen là cảm giác, không phải bằng chứng cuối cùng."]),
          lesson("2.1.3", "Quyền lực", [
            "Kẻ xấu có thể giả danh công an, ngân hàng, nhà trường, lãnh đạo, giáo viên, cơ quan nhà nước, nền tảng công nghệ, người nổi tiếng hoặc chuyên gia để tạo áp lực phục tùng.",
            "Các câu như 'bạn liên quan đến một vụ án', 'tài khoản có giao dịch bất thường', 'không được tiết lộ vì đang điều tra' thường nhằm đưa bạn ra khỏi quy trình an toàn.",
            "Khi deepvoice hoặc video giả được thêm vào, cảm giác quyền lực mạnh hơn. Một giọng giống lãnh đạo có thể khiến nhân viên xử lý giao dịch gấp; một video giống chuyên gia có thể khiến người xem đầu tư."
          ], ["Người có thẩm quyền thật không cần bạn bỏ qua quy trình an toàn.", "Yêu cầu nghiêm trọng càng cần kênh chính thức.", "Không chứng minh sự trong sạch bằng OTP, tiền hoặc app lạ."]),
          lesson("2.1.4", "Lợi ích", [
            "Không phải lừa đảo nào cũng dùng nỗi sợ. Nhiều kịch bản dùng hy vọng: lợi nhuận cao, việc làm tốt, học bổng, quà tặng, vé sự kiện, mã giảm giá, cơ hội đầu tư hoặc khóa học bí mật.",
            "Deepfake có thể làm lời hứa trông đáng tin hơn: người nổi tiếng xuất hiện trong video, chuyên gia có giọng tự tin, livestream có nhiều bình luận khen ngợi.",
            "Cơ hội thật thường chịu được kiểm chứng. Cơ hội lừa đảo thường sợ bạn hỏi thêm, đọc điều khoản, so sánh nguồn hoặc chờ đến ngày mai."
          ], ["Quá tốt để là thật thì cần kiểm chứng kỹ hơn.", "Lợi ích càng lớn, rủi ro càng cần đọc chậm.", "Đừng để hy vọng tắt đi khả năng nghi ngờ hợp lý."]),
          lesson("2.1.5", "Deepfake không đi một mình", [
            "Deepfake thường là một mắt xích trong social engineering: thu thập thông tin, giả hoặc chiếm tài khoản, tạo media thuyết phục, gây áp lực, kéo sang kênh riêng, yêu cầu tiền/mã/app/dữ liệu rồi xóa dấu vết.",
            "Sáu dấu hiệu ngôn ngữ cần cảnh giác là: làm ngay, đừng nói với ai, nếu không thì, chỉ bạn được chọn, quá tốt để bỏ lỡ, xấu hổ nên đừng hỏi.",
            "Khi đánh giá nội dung đáng ngờ, đừng chỉ hỏi video có giả không. Hãy hỏi nó đang muốn bạn làm gì, trong bao lâu, qua kênh nào và nếu sai thì ai bị hại."
          ], ["Nhìn cả kịch bản, không chỉ nhìn file media.", "Bí mật, thời gian và yêu cầu rủi ro là tổ hợp nguy hiểm.", "Ngôn ngữ ép hành động là dấu hiệu cần dừng lại."])
        ],
        checkpoint: checkpoint("2.1", [
          q("Một cuộc gọi giống người thân yêu cầu chuyển tiền trong 5 phút. Nút bấm chính là gì?", ["Lợi ích", "Khẩn cấp", "Giải trí", "Tò mò"], 1),
          q("Tin nhắn từ tài khoản bạn bè nhưng né gọi lại và gửi số tài khoản lạ. Cách hiểu an toàn là gì?", ["Chắc chắn bạn mình đang nhắn", "Có thể tài khoản bị chiếm quyền hoặc giả mạo", "Chỉ cần ảnh đại diện đúng", "Nên chuyển ít tiền trước"], 1),
          q("Câu 'đừng nói với ai' nguy hiểm vì điều gì?", ["Giúp bảo mật tốt hơn", "Cô lập bạn khỏi người có thể giúp kiểm chứng", "Làm giao dịch nhanh hơn", "Chứng minh người kia thật sự khẩn cấp"], 1)
        ])
      },
      {
        title: "2.2 Hiệu ứng tôi thấy tận mắt",
        lessons: [
          lesson("2.2.1", "Vì sao chúng ta tin thứ mình nhìn thấy?", [
            "Video và hình ảnh tạo cảm giác như ta đã chứng kiến sự việc. Bộ não xử lý khuôn mặt, biểu cảm và chuyển động rất nhanh nên cảm xúc thường đến trước lý trí.",
            "Nhìn thấy chỉ có nghĩa là bạn đang nhìn thấy một nội dung được trình bày. Nó chưa trả lời nguồn ở đâu, bối cảnh là gì, có bị cắt ghép không và có đang bị dùng để thao túng không.",
            "Deepfense không yêu cầu bạn phủ nhận mọi thứ. Deepfense yêu cầu phân biệt giữa cảm giác thuyết phục và bằng chứng đã được kiểm chứng."
          ], ["Thấy là dữ kiện, không phải kết luận.", "Video càng kích động cảm xúc, càng cần đọc bối cảnh.", "Câu an toàn là: tôi chưa đủ dữ liệu để kết luận."]),
          lesson("2.2.2", "Giọng nói và niềm tin cá nhân", [
            "Giọng nói gắn với ký ức về người thật. Khi nghe giọng giống người thân, giáo viên, đồng nghiệp hoặc lãnh đạo, nhiều người phản ứng như đang nghe chính người đó.",
            "Deepvoice nguy hiểm nhất khi đi cùng yêu cầu hành động nhanh: chuyển tiền, đọc mã, mở link, gửi tài liệu, xác nhận danh tính hoặc giữ bí mật.",
            "Cách phòng vệ không phải là tự tin rằng mình nhận ra mọi giọng giả. Cách phòng vệ là đặt quy tắc: yêu cầu rủi ro phải xác minh qua kênh độc lập."
          ], ["Giọng giống không đủ để xác minh danh tính.", "Yêu cầu rủi ro cần kênh độc lập.", "Không đọc OTP qua cuộc gọi bất ngờ."]),
          lesson("2.2.3", "Niềm tin nhóm", [
            "Nhiều lượt thích, bình luận và chia sẻ có thể làm nội dung trông thật hơn. Nhưng bình luận có thể được mua, tài khoản có thể giả và cộng đồng có thể cùng bị dẫn dắt.",
            "Trong lừa đảo đầu tư hoặc tin giả, kẻ xấu thường dựng cảm giác 'ai cũng tin rồi' để tạo FOMO và làm người xem ngại kiểm chứng.",
            "Câu hỏi hữu ích là: nếu bỏ hết lượt thích và bình luận, bằng chứng còn lại là gì?"
          ], ["Đông người tin không làm nội dung thành đúng.", "Social proof có thể là một phần của thao túng.", "Bằng chứng tốt phải đứng được khi bỏ lớp bình luận."])
        ],
        checkpoint: checkpoint("2.2", [
          q("Vì sao video thường thuyết phục mạnh?", ["Vì video luôn đúng", "Vì não xử lý hình ảnh nhanh và dễ phản ứng cảm xúc", "Vì video không thể chỉnh sửa", "Vì có âm thanh là đủ"], 1),
          q("Một video có nhiều bình luận khen và thúc giục đầu tư. Điều đúng nhất là gì?", ["Đó là bằng chứng chắc chắn", "Niềm tin nhóm có thể bị dựng lên", "Nên đầu tư ít trước", "Không cần kiểm tra nguồn"], 1),
          q("Khi chưa đủ dữ liệu, phản ứng trưởng thành là gì?", ["Kết luận ngay", "Chia sẻ để hỏi mọi người", "Tạm dừng và kiểm chứng", "Tin vào cảm giác đầu tiên"], 2)
        ])
      },
      {
        title: "2.3 Case: Cuộc gọi lúc 22:47",
        lessons: [
          lesson("2.3.1", "Bối cảnh", [
            "22:47, An nhận cuộc gọi video từ người giống Minh Anh, một người chị họ. Hình ảnh hơi mờ, giọng nói run, câu đầu tiên là: chị giúp em với, chuyển gấp 5 triệu, máy em sắp hết pin.",
            "Người kia nói không được gọi mẹ vì sợ mẹ hoảng, gửi số tài khoản có tên chủ tài khoản lạ và né câu hỏi đang ở đâu.",
            "Đây là tình huống có nhiều nút bấm cùng lúc: thân quen, khẩn cấp, sợ hãi, cô lập và yêu cầu tài chính."
          ], ["Nhiều dấu hiệu cộng lại tạo thành rủi ro rõ ràng.", "Không để cảm giác thương người thân thay thế xác minh.", "Tình huống càng cảm xúc, càng cần quy trình đơn giản."]),
          lesson("2.3.2", "Hành động đầu tiên", [
            "Hành động an toàn là kết thúc cuộc gọi và gọi lại qua số đã lưu từ trước, hoặc gọi một người thân khác bằng kênh độc lập.",
            "Kênh độc lập là kênh bạn đã biết trước khi sự cố xảy ra: số đã lưu, người thân đã biết, website chính thức, email chính thức hoặc app ngân hàng do bạn tự mở.",
            "Số điện thoại, tài khoản, link hoặc hướng dẫn do người kia vừa gửi trong tình huống khẩn cấp không được xem là độc lập."
          ], ["Gọi lại số đã lưu tốt hơn bấm số mới.", "Không chuyển tiền qua tài khoản lạ khi chưa xác nhận.", "Xác minh là cách giúp đúng người, đúng cách."]),
          lesson("2.3.3", "Nếu đã lỡ chuyển tiền", [
            "Nếu đã chuyển tiền, hãy liên hệ ngân hàng càng sớm càng tốt, lưu ảnh chụp màn hình, thời gian giao dịch, số tài khoản, nội dung chat, số điện thoại và liên kết liên quan.",
            "Cảnh báo người thân hoặc bạn bè để tránh người khác tiếp tục bị lừa. Nếu tài khoản quen bị chiếm quyền, chủ tài khoản thật cần biết để khóa hoặc khôi phục.",
            "Đừng xóa bằng chứng vì xấu hổ và đừng tự đăng thông tin cá nhân của người nghi vấn lên mạng. Mục tiêu là giảm thiệt hại, hỗ trợ xử lý và ngăn lan rộng."
          ], ["Liên hệ ngân hàng sớm có thể tăng cơ hội xử lý.", "Bằng chứng cần được giữ nguyên.", "Xấu hổ là cảm giác bình thường, nhưng xóa dấu vết làm xử lý khó hơn."])
        ],
        checkpoint: checkpoint("2.3", [
          q("Trong case 22:47, hành động đầu tiên an toàn nhất là gì?", ["Chuyển tiền trước", "Kết thúc cuộc gọi và xác minh qua số đã lưu hoặc người thân khác", "Tiếp tục hỏi trong cùng cuộc gọi", "Bấm số mới người kia gửi"], 1),
          q("Dấu hiệu rủi ro mạnh trong case là gì?", ["Tài khoản nhận tiền có tên lạ", "Cuộc gọi buổi tối", "Video hơi mờ", "Người kia nói nhỏ"], 0),
          q("Kênh nào độc lập hơn?", ["Số điện thoại đã lưu từ trước", "Số mới người kia vừa gửi", "Link trong tin nhắn khẩn cấp", "Tài khoản lạ vừa kết bạn"], 0)
        ])
      }
    ],
    quiz: [
      q("Mục tiêu chính của Module 2 là gì?", ["Học cách tạo deepfake", "Hiểu vì sao con người dễ bị thao túng và biết cách phản ứng an toàn", "Ghi nhớ mọi lỗi kỹ thuật", "Tắt toàn bộ mạng xã hội"], 1),
      q("Bốn nút bấm cảm xúc là gì?", ["Ảnh, video, âm thanh, bình luận", "Khẩn cấp, thân quen, quyền lực, lợi ích", "Tin tức, giải trí, mua sắm, học tập", "Mật khẩu, OTP, email, ví điện tử"], 1),
      q("Vì sao câu 'chỉ còn 5 phút' nguy hiểm?", ["Làm giảm thời gian kiểm chứng", "Làm bạn suy nghĩ kỹ hơn", "Luôn là cơ hội thật", "Chứng minh nội dung đúng"], 0),
      q("Tài khoản quen nhắn vay tiền nhưng né gọi lại. Bạn nên hiểu thế nào?", ["Chắc chắn người quen đang bận", "Có thể tài khoản bị chiếm quyền hoặc giả mạo", "Cứ chuyển vì ảnh đúng", "Hỏi trong cùng chat là đủ"], 1),
      q("Người tự xưng ngân hàng yêu cầu đọc OTP. Phản ứng đúng là gì?", ["Đọc ngay", "Từ chối và tự gọi kênh chính thức", "Gửi mã qua tin nhắn", "Đọc sai mã để thử"], 1),
      q("Deepfake thường đi cùng social engineering vì sao?", ["Vì cần bối cảnh, áp lực và yêu cầu hành động", "Vì file giả một mình luôn đủ", "Vì chỉ dùng cho giải trí", "Vì không liên quan con người"], 0),
      q("Nhiều bình luận 'uy tín, đã nhận tiền' chứng minh điều gì?", ["Chắc chắn thật", "Có thể là hiệu ứng niềm tin nhóm bị dựng lên", "Nên tham gia nhanh", "Không cần kiểm tra"], 1),
      q("Nghe giọng giống người thân yêu cầu chuyển tiền, nguyên tắc an toàn là gì?", ["Giọng giống là đủ", "Xác minh qua kênh độc lập trước khi hành động", "Chuyển một phần để thử", "Hỏi người đó có phải deepfake không"], 1),
      q("'Tôi chưa đủ dữ liệu để kết luận' thể hiện điều gì?", ["Thiếu trách nhiệm", "Kỹ năng giữ an toàn khi thông tin chưa rõ", "Không quan tâm", "Không hiểu công nghệ"], 1),
      q("Nếu đã lỡ chuyển tiền trong tình huống nghi lừa đảo, nên làm gì?", ["Xóa hết tin nhắn", "Liên hệ ngân hàng, giữ bằng chứng và cảnh báo người liên quan", "Đăng mọi thông tin lên mạng", "Im lặng chờ trả lại"], 1)
    ]
  },
  {
    id: 3,
    part: "foundation",
    title: "Nhìn, nghe, đọc: dấu hiệu nghi vấn",
    duration: "95 phút",
    level: "Foundation",
    scenario: "An xem lại video đầu tư của người nổi tiếng. Video trông khá thật, bình luận rất tích cực, giọng nói tự tin. Nhưng thay vì kết luận ngay, An học cách quan sát ba lớp: hình ảnh/video, âm thanh và ngữ cảnh.",
    outcomes: [
      "Biết quan sát hình ảnh và video theo nhiều vùng thay vì bám vào một lỗi nhỏ.",
      "Hiểu giới hạn của mắt thường, video thật có thể trông lạ và video giả có thể rất mượt.",
      "Nhận diện dấu hiệu âm thanh, deepvoice và các kịch bản cuộc gọi đáng ngờ.",
      "Đọc ngữ cảnh: ai gửi, muốn bạn làm gì, nguồn đầu tiên ở đâu và ai có thể bị hại."
    ],
    sections: [
      {
        title: "3.1 Dấu hiệu hình ảnh và video",
        lessons: [
          lesson("3.1.1", "Quan sát chậm lại", [
            "Nguyên tắc đầu tiên là quan sát chậm. Video gây sốc thường được thiết kế để bạn phản ứng trước khi kiểm tra. Hãy tạm dừng, tua lại, xem từng vùng và tách cảm xúc khỏi bằng chứng.",
            "Đừng tìm một lỗi duy nhất để kết luận. Một dấu hiệu nhỏ có thể do nén video, ánh sáng xấu hoặc camera kém. Điều cần làm là gom nhiều tín hiệu và đặt chúng trong bối cảnh.",
            "Quan sát tốt không phải để trở thành máy phát hiện deepfake, mà để biết khi nào cần kiểm chứng sâu hơn."
          ], ["Chậm lại trước khi kết luận.", "Một lỗi nhỏ không đủ để kết luận.", "Quan sát là bước Observe, không phải Decide."]),
          lesson("3.1.2", "Khuôn mặt, mắt và miệng", [
            "Khuôn mặt có thể quá mượt, da thiếu chi tiết, ranh giới mặt/cổ lạ, biểu cảm không khớp tình huống hoặc chuyển đổi thiếu tự nhiên.",
            "Mắt có thể nhìn lệch, chớp không tự nhiên, ánh phản chiếu không nhất quán. Miệng có thể lệch khẩu hình, răng/lưỡi biến dạng hoặc âm thanh đến chậm hơn chuyển động môi.",
            "Tuy vậy, mạng yếu và nén video cũng có thể làm môi lệch hoặc hình méo. Vì thế hãy kết hợp với nguồn, yêu cầu hành động và dấu hiệu khác."
          ], ["Quan sát khuôn mặt, mắt, miệng theo cụm dấu hiệu.", "Lip-sync lệch là tín hiệu nghi vấn, không phải phán quyết.", "Luôn kết hợp kỹ thuật với bối cảnh."]),
          lesson("3.1.3", "Ánh sáng, tóc, tay và nền", [
            "Ánh sáng và bóng có thể không khớp: mặt sáng khác nền, bóng đổ sai hướng, da sáng bất thường hoặc vật thể xung quanh bị méo.",
            "Tóc, tai, kính, tay và phụ kiện thường khó tạo tự nhiên. Hãy chú ý viền tóc, gọng kính, khuyên tai, ngón tay, logo áo, chữ trên bảng và vật thể nền.",
            "Chuyển động cơ thể cũng quan trọng: đầu, vai, tay và biểu cảm có khớp nhau không, hay chỉ khuôn mặt hoạt động còn phần thân cứng bất thường."
          ], ["Quan sát cả nền và vật thể xung quanh.", "Tay, kính, tóc và chữ thường để lộ bất thường.", "Dấu hiệu tổng hợp mạnh hơn một chi tiết đơn lẻ."])
        ],
        checkpoint: checkpoint("3.1", [
          q("Khi thấy video đáng ngờ, nguyên tắc quan sát đầu tiên là gì?", ["Kết luận ngay", "Quan sát chậm và gom nhiều tín hiệu", "Chỉ nhìn mắt", "Chỉ tin bình luận"], 1),
          q("Lip-sync lệch nên được hiểu thế nào?", ["Luôn là deepfake", "Là tín hiệu nghi vấn cần kiểm chứng thêm", "Không bao giờ quan trọng", "Chứng minh video thật"], 1),
          q("Vùng nào cũng nên quan sát ngoài khuôn mặt?", ["Nền, chữ, tay, kính, ánh sáng", "Chỉ số lượt xem", "Tên file", "Màu nút like"], 0)
        ])
      },
      {
        title: "3.2 Giới hạn của quan sát",
        lessons: [
          lesson("3.2.1", "Video thật cũng có thể trông lạ", [
            "Video thật có thể bị mờ, giật, lệch âm, vỡ hình hoặc méo vì camera kém, mạng yếu, nén video, ánh sáng xấu hoặc ứng dụng gọi video bị trễ.",
            "Nếu chỉ dựa vào một lỗi kỹ thuật, bạn có thể kết luận nhầm và gây hại cho người thật. Đây là lý do DEEPFENSE luôn đặt quan sát sau Pause và trước Verify.",
            "Người học cần phân biệt: 'tôi thấy điều lạ' khác với 'tôi chắc chắn đây là giả'."
          ], ["Video thật có thể có lỗi kỹ thuật.", "Quan sát không thay thế xác minh.", "Nói 'có dấu hiệu nghi vấn' an toàn hơn kết luận vội."]),
          lesson("3.2.2", "Video giả cũng có thể rất thật", [
            "Công cụ tạo giả ngày càng tốt hơn. Nhiều deepfake không còn có lỗi rõ ràng như mắt không chớp hay mặt méo. Một video mượt vẫn có thể bị dựng, cắt ghép, sai bối cảnh hoặc dùng danh tính giả.",
            "Detector cũng không thay thế phán đoán. Kết quả nghi ngờ cao không phải bằng chứng tuyệt đối; kết quả không phát hiện bất thường cũng không chứng minh nội dung thật.",
            "Cách nghĩ đúng là dùng nhiều lớp: dấu hiệu kỹ thuật, nguồn, bối cảnh, yêu cầu hành động, rủi ro và kênh xác minh."
          ], ["Video mượt không chứng minh thật.", "Detector chỉ là tín hiệu tham khảo.", "Kết luận an toàn cần nhiều lớp dữ kiện."]),
          lesson("3.2.3", "Ba mức kết luận an toàn", [
            "Mức 1: chưa thấy dấu hiệu rõ nhưng vẫn cần nguồn. Mức 2: có dấu hiệu nghi vấn, cần kiểm chứng thêm. Mức 3: rủi ro cao, không hành động theo yêu cầu.",
            "Ba mức này giúp bạn không bị kẹt giữa hai lựa chọn quá cực đoan: tin ngay hoặc phủ nhận ngay. Trong đời thật, nhiều tình huống nằm ở vùng chưa đủ dữ liệu.",
            "Nếu nội dung yêu cầu tiền, OTP, cài app, chia sẻ dữ liệu hoặc làm hại danh dự người khác, hãy nâng mức thận trọng dù video trông khá thật."
          ], ["Có thể kết luận theo mức rủi ro.", "Chưa đủ dữ liệu là một kết luận hợp lệ.", "Yêu cầu rủi ro làm tiêu chuẩn kiểm chứng cao hơn."])
        ],
        checkpoint: checkpoint("3.2", [
          q("Vì sao không nên kết luận deepfake chỉ từ một lỗi hình ảnh?", ["Vì video thật cũng có thể lỗi do kỹ thuật", "Vì lỗi nào cũng không quan trọng", "Vì deepfake luôn hoàn hảo", "Vì chỉ cần hỏi bình luận"], 0),
          q("Detector deepfake nên được dùng như thế nào?", ["Là tín hiệu tham khảo", "Là phán quyết tuyệt đối", "Để thay thế kiểm chứng nguồn", "Để bỏ qua bối cảnh"], 0),
          q("Mức kết luận an toàn nhất khi dữ liệu thiếu là gì?", ["Chắc chắn thật", "Chắc chắn giả", "Chưa đủ dữ liệu, cần kiểm chứng", "Chia sẻ ngay"], 2)
        ])
      },
      {
        title: "3.3 Dấu hiệu âm thanh và ngữ cảnh",
        lessons: [
          lesson("3.3.1", "Âm thanh và deepvoice", [
            "Giọng nói là tín hiệu mạnh nhưng không tuyệt đối. Deepvoice có thể mô phỏng âm sắc, nhịp nói và cảm xúc đủ giống để người nghe phản ứng theo niềm tin cá nhân.",
            "Dấu hiệu cần chú ý gồm giọng đều bất thường, cảm xúc không khớp câu chuyện, khoảng ngắt lạ, né câu hỏi bất ngờ, âm nền thiếu tự nhiên hoặc yêu cầu bạn làm việc nhạy cảm ngay.",
            "Câu hỏi bất ngờ có thể hữu ích nhưng chưa đủ. Kẻ xấu có thể chuẩn bị thông tin cá nhân từ mạng xã hội. Kênh độc lập vẫn là bước quan trọng hơn."
          ], ["Giọng giống không đủ xác minh danh tính.", "Deepvoice nguy hiểm khi đi cùng yêu cầu gấp.", "Câu hỏi bất ngờ chỉ hỗ trợ, không thay thế kênh độc lập."]),
          lesson("3.3.2", "Đọc ngữ cảnh", [
            "Ngữ cảnh gồm người gửi, kênh gửi, thời điểm, nguồn đầu tiên, mục đích lan truyền và hành động mà nội dung muốn bạn làm.",
            "Dấu hiệu tài khoản đáng nghi gồm tài khoản mới tạo, đổi tên gần đây, ít lịch sử, ảnh đại diện sao chép, tên gần giống tài khoản thật, chỉ nhắn một chiều hoặc kéo bạn sang kênh riêng.",
            "Hãy hỏi: ai gửi, họ muốn mình làm gì, có nguồn đầu tiên không, có nguồn độc lập không, và nếu mình tin sai thì ai bị hại."
          ], ["Ngữ cảnh thường quan trọng hơn một lỗi hình ảnh nhỏ.", "Tài khoản gửi không đồng nghĩa với nguồn đầu tiên.", "Nội dung muốn bạn làm gì là câu hỏi trung tâm."]),
          lesson("3.3.3", "Checklist 3 lớp", [
            "Lớp 1: nội dung. Quan sát hình ảnh, video, âm thanh, lời nói, cảm xúc và dấu hiệu kỹ thuật. Lớp 2: nguồn. Kiểm tra người gửi, nguồn đầu tiên, kênh chính thức và nguồn độc lập.",
            "Lớp 3: hành động. Nội dung có yêu cầu chuyển tiền, gửi mã, cài app, chia sẻ gấp, tấn công ai đó hoặc giữ bí mật không?",
            "Ba tình huống cần luyện là video đầu tư, tin nhắn thoại từ người thân và hình ảnh trong nhóm lớp. Mỗi tình huống phải được đọc cả ba lớp trước khi quyết định."
          ], ["Nội dung, nguồn, hành động là ba lớp kiểm tra.", "Bình luận không phải bằng chứng.", "Ai có thể bị hại là câu hỏi đạo đức quan trọng."])
        ],
        checkpoint: checkpoint("3.3", [
          q("Ngữ cảnh bao gồm yếu tố nào?", ["Người gửi, nguồn, thời điểm, mục đích và yêu cầu hành động", "Chỉ độ phân giải video", "Chỉ số lượt thích", "Chỉ màu nền"], 0),
          q("Tài khoản mới tạo, tên gần giống tài khoản thật là dấu hiệu gì?", ["Đáng nghi", "Chắc chắn chính chủ", "Không cần quan tâm", "Bằng chứng video thật"], 0),
          q("Checklist 3 lớp gồm gì?", ["Nội dung, nguồn, hành động", "Mắt, mũi, miệng", "Like, share, comment", "Tên, tuổi, nghề"], 0)
        ])
      }
    ],
    quiz: [
      q("Module 3 tập trung vào điều gì?", ["Tạo deepfake", "Nhìn, nghe, đọc dấu hiệu nghi vấn theo nhiều lớp", "Xóa tài khoản", "Tăng lượt xem"], 1),
      q("Quan sát chậm có tác dụng gì?", ["Giúp tách cảm xúc khỏi bằng chứng", "Làm video thật hơn", "Tăng tốc chia sẻ", "Thay thế mọi kiểm chứng"], 0),
      q("Một lỗi hình ảnh đơn lẻ có đủ kết luận deepfake không?", ["Không", "Có", "Luôn đủ", "Chỉ khi nhiều like"], 0),
      q("Detector deepfake nên được xem là gì?", ["Tín hiệu tham khảo", "Tòa án cuối cùng", "Nguồn chính thức", "Công cụ thay thế tư duy"], 0),
      q("Dấu hiệu âm thanh đáng nghi là gì?", ["Giọng né câu hỏi và yêu cầu hành động gấp", "Giọng nghe quen", "Có tiếng nền", "Nói tiếng Việt"], 0),
      q("Kênh độc lập quan trọng vì sao?", ["Giúp xác minh ngoài kênh đáng ngờ", "Làm cuộc gọi dài hơn", "Tăng tương tác", "Ẩn bằng chứng"], 0),
      q("Bình luận đông chứng minh điều gì?", ["Không chứng minh sự thật", "Chắc chắn đúng", "Không cần nguồn", "Phải chia sẻ ngay"], 0),
      q("Ba mức kết luận an toàn giúp tránh điều gì?", ["Kết luận cực đoan khi thiếu dữ liệu", "Việc đọc nguồn", "Lưu bằng chứng", "Xác minh độc lập"], 0),
      q("Một nội dung yêu cầu OTP làm tiêu chuẩn kiểm chứng thế nào?", ["Cao hơn", "Thấp hơn", "Không cần", "Chỉ hỏi bình luận"], 0),
      q("Câu hỏi trung tâm khi đọc ngữ cảnh là gì?", ["Nội dung muốn mình làm gì?", "Video dài bao lâu?", "Màu nền là gì?", "Có nhạc không?"], 0)
    ]
  },
  {
    id: 4,
    part: "recognition",
    title: "Quy trình Deepfense Check",
    duration: "100 phút",
    level: "Recognition",
    scenario: "Sau nhiều tình huống rối rắm, An nhận ra mình cần một quy trình ngắn để không bị cảm xúc kéo đi. Deepfense Check gồm Pause, Observe, Verify, Trace và Decide.",
    outcomes: ["Áp dụng được quy trình Deepfense Check 5 bước.", "Hiểu kênh độc lập và biết chọn kênh xác minh đáng tin hơn.", "Biết dùng công cụ kiểm chứng cơ bản mà không phụ thuộc mù quáng.", "Thực hành điền mẫu Deepfense Check cho các hồ sơ đời thật."],
    sections: [
      {
        title: "4.1 Quy trình 5 bước",
        lessons: [
          lesson("4.1.1", "Pause - Dừng lại", ["Pause là khoảng dừng trước khi phản ứng. Nó cần xuất hiện khi nội dung gây sợ, giận, xấu hổ, ham lợi, yêu cầu giữ bí mật hoặc thúc ép thời gian.", "Câu tự nhắc là: mình có đang bị ép hành động ngay không? Nếu dừng 2 phút, điều tốt hơn có thể xảy ra là gì?", "Với An, Pause giúp không chuyển tiền ngay trong cuộc gọi giống người thân."], ["Dừng lại là kỹ năng, không phải chậm chạp.", "Càng gấp càng cần Pause.", "Pause mở đường cho các bước sau."]),
          lesson("4.1.2", "Observe - Quan sát", ["Observe là quan sát nội dung, hành vi và bối cảnh: khuôn mặt, giọng nói, ánh sáng, nguồn gửi, lời thúc ép và yêu cầu hành động.", "Lỗi phổ biến là chỉ tìm một dấu hiệu kỹ thuật rồi kết luận. Observe đúng là ghi nhận tín hiệu và mức rủi ro, chưa ra phán quyết cuối cùng.", "Câu tự nhắc là: mình đang thấy dữ kiện nào, và dữ kiện nào còn thiếu?"], ["Observe là thu thập tín hiệu.", "Không kết luận từ một chi tiết.", "Cần ghi cả dấu hiệu kỹ thuật lẫn ngữ cảnh."]),
          lesson("4.1.3", "Verify - Xác minh", ["Verify là kiểm chứng bằng kênh độc lập. Nếu người thân nhắn vay tiền, hãy gọi số đã lưu; nếu ngân hàng gọi, tự mở app hoặc gọi tổng đài chính thức; nếu trường học thông báo, kiểm tra kênh chính thức.", "Xác minh không phải là hỏi lại chính tài khoản đang đáng ngờ. Kẻ xấu có thể tiếp tục đóng vai nếu bạn ở nguyên trong kênh đó.", "Câu tự nhắc là: mình có một kênh đã biết từ trước để kiểm tra không?"], ["Verify cần kênh độc lập.", "Không dùng link/số mới được gửi trong tình huống khẩn cấp.", "Xác minh là cách giúp đúng hơn."]),
          lesson("4.1.4", "Trace - Truy nguồn", ["Trace là tìm nguồn đầu tiên hoặc nguồn đáng tin gần nhất: ai đăng đầu tiên, có kênh chính thức không, nội dung từng xuất hiện ở đâu, có bị cắt ngữ cảnh không.", "Truy nguồn đặc biệt quan trọng với video viral, ảnh gây phẫn nộ và lời kêu gọi đầu tư. Một nội dung có thể thật nhưng sai thời điểm, sai địa điểm hoặc sai lời dẫn.", "Câu tự nhắc là: nguồn đầu tiên ở đâu và có nguồn độc lập xác nhận không?"], ["Nguồn gửi không luôn là nguồn đầu tiên.", "Sai bối cảnh có thể nguy hiểm như giả.", "Trace giúp giảm chia sẻ nhầm."]),
          lesson("4.1.5", "Decide - Quyết định", ["Decide là chọn hành động ít gây hại nhất. Có ba mức: không hành động theo yêu cầu, kiểm chứng thêm trước khi quyết định, hoặc báo cáo/lưu bằng chứng/cảnh báo người liên quan.", "Không phải tình huống nào cũng cần đủ 5 bước. Nội dung rủi ro thấp có thể kiểm tra nhẹ; nội dung liên quan tiền, danh tính, danh dự hoặc an toàn cần quy trình đầy đủ.", "Câu tự nhắc là: nếu mình sai, ai bị hại và thiệt hại có đảo ngược được không?"], ["Quyết định theo mức rủi ro.", "Ưu tiên hành động ít gây hại.", "Tiền, mã, danh dự và an toàn cần mức kiểm chứng cao."])
        ],
        checkpoint: checkpoint("4.1", [
          q("Bước đầu tiên của Deepfense Check là gì?", ["Pause", "Decide", "Share", "Delete"], 0),
          q("Verify yêu cầu điều gì?", ["Kênh độc lập", "Hỏi lại tài khoản đáng ngờ", "Tin vào bình luận", "Chỉ dùng detector"], 0),
          q("Trace nhằm trả lời câu hỏi nào?", ["Nguồn đầu tiên ở đâu?", "Video đẹp không?", "Có bao nhiêu like?", "Ai bình luận đầu?"], 0)
        ])
      },
      {
        title: "4.2 Kênh độc lập và công cụ kiểm chứng",
        lessons: [
          lesson("4.2.1", "Kênh độc lập", ["Kênh độc lập là kênh không do tình huống đáng ngờ vừa cung cấp. Đó có thể là số đã lưu, website tự gõ, app chính thức tự mở, email trường/công ty đã biết hoặc người thân khác.", "Kênh không nên tin ngay gồm số mới gửi trong chat, link rút gọn, tài khoản mới kết bạn, nhóm lạ, QR lạ hoặc file cài đặt được gửi kèm yêu cầu khẩn cấp.", "Family Code là mật khẩu gia đình cho tình huống khẩn cấp. Nó nên dễ nhớ với người trong nhà, khó đoán với người ngoài và không đăng công khai."], ["Kênh độc lập phải tồn tại trước sự cố.", "Link/số mới trong tình huống khẩn cấp không độc lập.", "Family Code giúp xác minh nhanh trong gia đình."]),
          lesson("4.2.2", "Reverse search và cắt frame", ["Reverse image search giúp tìm xem ảnh đã xuất hiện ở đâu, có bị lấy từ sự kiện cũ hoặc gắn sai bối cảnh không. Với video, bạn có thể cắt một khung hình rõ rồi tìm ngược.", "Công cụ này có giới hạn: ảnh mới tạo có thể chưa có dấu vết, ảnh bị chỉnh sửa mạnh khó tìm, và kết quả tìm kiếm không thay thế phân tích bối cảnh.", "Khi video gây phẫn nộ, tìm nguồn trước khi chia sẻ là bước giảm hại rất quan trọng."], ["Reverse search hữu ích để kiểm tra nguồn cũ/sai bối cảnh.", "Không tìm thấy không có nghĩa là thật.", "Cắt frame giúp truy nguồn video."]),
          lesson("4.2.3", "Website, metadata, provenance và detector", ["Kiểm tra website bằng cách nhìn tên miền, lỗi chính tả, HTTPS, trang liên hệ, lịch sử thương hiệu và việc có yêu cầu đăng nhập/cài app bất thường không.", "Metadata và provenance có thể hỗ trợ, nhưng nhiều nền tảng xóa metadata. Người học BASIC chỉ cần hiểu đây là tín hiệu tham khảo, không phải bằng chứng tuyệt đối.", "Detector deepfake nên dùng như một nguồn tín hiệu phụ. Không dùng detector để bôi nhọ người khác hoặc thay thế việc kiểm chứng nguồn chính thức."], ["Công cụ hỗ trợ tư duy, không thay thế tư duy.", "Tên miền nhái là dấu hiệu phổ biến.", "Detector không phải phán quyết cuối cùng."])
        ],
        checkpoint: checkpoint("4.2", [
          q("Kênh nào là độc lập nhất?", ["Số đã lưu từ trước", "Số mới trong tin nhắn", "Link rút gọn", "QR lạ"], 0),
          q("Reverse image search giúp gì?", ["Tìm nguồn/phiên bản cũ của ảnh", "Chứng minh tuyệt đối ảnh thật", "Tự xóa deepfake", "Tạo ảnh mới"], 0),
          q("Detector nên dùng như thế nào?", ["Tín hiệu phụ", "Phán quyết tuyệt đối", "Công cụ bôi nhọ", "Thay thế nguồn chính thức"], 0)
        ])
      },
      {
        title: "4.3 Lab: Điền mẫu Deepfense Check",
        lessons: [
          lesson("4.3.1", "Hồ sơ người nổi tiếng và đầu tư", ["Hồ sơ gồm video người nổi tiếng kêu gọi tải ứng dụng đầu tư, bình luận khen lợi nhuận và đường link đăng ký. Người học cần điền Pause, Observe, Verify, Trace, Decide.", "Dấu hiệu cần ghi: lợi nhuận cao, thúc giục đăng ký, nguồn không rõ, link ngoài, bình luận có thể bị dựng và rủi ro tài chính.", "Quyết định an toàn là không chuyển tiền, không cài app, kiểm tra kênh chính thức của nhân vật/nền tảng và cảnh báo người liên quan nếu cần."], ["Điền đủ 5 bước giúp tránh bỏ sót rủi ro.", "Đầu tư cần kiểm chứng nguồn chính thức.", "Không cài app từ link quảng cáo đáng ngờ."]),
          lesson("4.3.2", "Tin nhắn thoại từ người thân", ["Hồ sơ gồm tin nhắn thoại giống người thân nhờ chuyển tiền gấp. Người học cần xác định nút bấm cảm xúc, kênh độc lập và quyết định ít gây hại nhất.", "Dấu hiệu mạnh là yêu cầu tiền, thời gian gấp, tài khoản lạ, né xác minh và lời dặn giữ bí mật.", "Quyết định an toàn là gọi số đã lưu, hỏi người thân khác, không chuyển tiền qua tài khoản mới và lưu bằng chứng nếu nghi lừa đảo."], ["Tiền + giọng quen + gấp là tình huống rủi ro cao.", "Kênh độc lập quan trọng hơn hỏi tiếp trong chat.", "Lưu bằng chứng trước khi xóa hoặc chặn."]),
          lesson("4.3.3", "Clip gây phẫn nộ trong nhóm chat", ["Hồ sơ gồm clip ngắn gây phẫn nộ, lời kêu gọi chia sẻ và bình luận đòi trừng phạt. Người học cần đọc cả rủi ro thông tin và rủi ro gây hại cho người trong clip.", "Dấu hiệu quan trọng là clip ngắn thiếu nguồn, lời dẫn cảm xúc, không có bối cảnh thời gian/địa điểm và có thể làm tổn hại danh dự người khác.", "Quyết định an toàn là không chia sẻ tiếp, tìm nguồn, báo quản trị viên/giáo viên nếu liên quan học đường và ưu tiên bảo vệ nạn nhân."], ["Phẫn nộ làm giảm kiểm chứng.", "Không giải trí hóa nạn nhân.", "Chia sẻ sai có thể gây hại thật."])
        ],
        checkpoint: checkpoint("4.3", [
          q("Trong hồ sơ đầu tư, hành động an toàn nhất là gì?", ["Cài app ngay", "Không cài app/chuyển tiền và kiểm tra nguồn chính thức", "Chuyển ít tiền thử", "Tin bình luận"], 1),
          q("Tin nhắn thoại vay tiền cần xác minh bằng gì?", ["Kênh độc lập", "Hỏi lại trong cùng chat", "Tin vì giọng quen", "Link người kia gửi"], 0),
          q("Clip gây phẫn nộ nên làm gì trước khi chia sẻ?", ["Dừng lại và kiểm chứng nguồn/bối cảnh", "Chia sẻ ngay", "Bình luận công kích", "Tải lại lên nơi khác"], 0)
        ])
      }
    ],
    quiz: [
      q("Deepfense Check gồm những bước nào?", ["Pause, Observe, Verify, Trace, Decide", "Like, Share, Comment", "Cut, Paste, Upload", "Hide, Delete, Forget"], 0),
      q("Pause cần khi nào?", ["Khi bị ép hành động ngay", "Chỉ khi rảnh", "Sau khi chuyển tiền", "Khi video đã viral"], 0),
      q("Observe đúng là gì?", ["Ghi nhận nhiều tín hiệu", "Kết luận từ một lỗi", "Tin cảm giác đầu tiên", "Bỏ qua bối cảnh"], 0),
      q("Verify không nên làm bằng gì?", ["Link/số mới người đáng ngờ vừa gửi", "Số đã lưu", "App chính thức tự mở", "Website tự gõ"], 0),
      q("Trace giúp phát hiện điều gì?", ["Nguồn đầu tiên và sai bối cảnh", "Mật khẩu mạnh", "Tốc độ mạng", "Dung lượng file"], 0),
      q("Decide ưu tiên điều gì?", ["Hành động ít gây hại nhất", "Phản ứng nhanh nhất", "Chia sẻ rộng nhất", "Tin người nổi tiếng"], 0),
      q("Family Code dùng để làm gì?", ["Xác minh nhanh trong gia đình", "Đăng công khai", "Thay mật khẩu ngân hàng", "Tạo video"], 0),
      q("Reverse search có giới hạn nào?", ["Không tìm thấy không chứng minh ảnh thật", "Luôn tìm được mọi ảnh", "Thay thế nguồn chính thức", "Xóa metadata"], 0),
      q("Detector deepfake không nên dùng để làm gì?", ["Bôi nhọ hoặc kết luận tuyệt đối", "Tham khảo thêm", "Kết hợp với nguồn", "Đọc thận trọng"], 0),
      q("Lab Deepfense Check yêu cầu gì?", ["Điền đủ các bước để ra quyết định an toàn", "Tạo deepfake", "Chia sẻ clip", "Cài app lạ"], 0)
    ]
  },
  {
    id: 5,
    part: "recognition",
    title: "Deepfake len lỏi vào mọi vấn đề số",
    duration: "105 phút",
    level: "Recognition",
    scenario: "Một ngày của An chưa kết thúc: video đầu tư, tin nhắn người thân, ảnh nhạy cảm trong nhóm lớp, clip gây phẫn nộ và lời mời việc làm lương cao. Deepfake không đứng riêng; nó len vào tài chính, danh dự, tin giả, tình cảm, việc làm và danh tính số.",
    outcomes: ["Nhận diện các kịch bản deepfake trong lừa đảo tài chính và mạo danh.", "Biết xử lý hình ảnh nhạy cảm, danh dự học đường và vai trò người chứng kiến.", "Hiểu tin giả, sai bối cảnh và rủi ro sự thật bị gọi là giả.", "Lập bản đồ rủi ro đời sống số cho bản thân."],
    sections: [
      {
        title: "5.1 Lừa đảo tài chính và mạo danh",
        lessons: [
          lesson("5.1.1", "Người thân cần tiền gấp", ["Kịch bản phổ biến là giọng nói hoặc video giống người thân nói đang gặp nạn, máy sắp hết pin, không gọi ai khác được và cần chuyển tiền ngay.", "Dấu hiệu đỏ gồm thời gian gấp, tài khoản nhận tiền lạ, dặn giữ bí mật, né gọi lại và câu chuyện nhiều cảm xúc nhưng ít dữ kiện xác minh.", "Deepfense Check: Pause trước khi chuyển tiền, Observe dấu hiệu cảm xúc, Verify bằng số đã lưu/người thân khác, Trace tài khoản nhận tiền, Decide không chuyển khi chưa xác minh."], ["Không chuyển tiền khi đang bị ép thời gian.", "Tài khoản nhận tiền lạ là dấu hiệu mạnh.", "Gọi lại số đã lưu trước khi hành động."]),
          lesson("5.1.2", "Sếp, giáo viên hoặc người phụ trách", ["Kẻ xấu có thể giả giọng/video của lãnh đạo, giáo viên hoặc người phụ trách để yêu cầu xử lý gấp: chuyển khoản, gửi file, đổi mật khẩu, mua thẻ, chia sẻ dữ liệu.", "Dấu hiệu đỏ là yêu cầu ngoài quy trình, giờ bất thường, bảo đừng hỏi ai, dùng kênh riêng hoặc thúc ép vì 'cấp trên đang chờ'.", "Quy trình an toàn là xác minh qua kênh công việc/trường học chính thức và tuân thủ quy trình phê duyệt, kể cả khi giọng nói rất giống."], ["Quy trình chính thức bảo vệ cả cá nhân và tổ chức.", "Lãnh đạo thật không cần bạn bỏ qua kiểm soát.", "Yêu cầu ngoài luồng cần xác minh thêm."]),
          lesson("5.1.3", "Ngân hàng, công an, cơ quan chức năng", ["Kẻ xấu có thể dùng giọng/video giả để nói bạn liên quan vụ án, tài khoản có giao dịch lạ hoặc cần cài app để chứng minh trong sạch.", "Dấu hiệu đỏ là yêu cầu OTP, mật khẩu, chuyển tiền vào tài khoản an toàn, cài app lạ, bật chia sẻ màn hình hoặc giữ bí mật vì đang điều tra.", "Phản ứng an toàn là kết thúc liên hệ, tự gọi kênh chính thức, không đọc mã, không cài app và lưu bằng chứng nếu có đe dọa."], ["Không có tài khoản an toàn do người lạ chỉ định.", "Không đọc OTP/mật khẩu cho bất kỳ ai.", "Cơ quan thật không xác minh bằng cách yêu cầu chuyển tiền."]),
          lesson("5.1.4", "Người nổi tiếng, QR, link và app giả", ["Video người nổi tiếng kêu gọi đầu tư, QR giảm giá, link nhận thưởng hoặc app lạ thường đánh vào lợi ích và FOMO.", "Dấu hiệu đỏ là lợi nhuận cao không rủi ro, link rút gọn, tên miền nhái, bình luận đồng loạt khen, yêu cầu nạp tiền/cấp quyền/cài file ngoài kho chính thức.", "Deepfense Check là không quét QR/cài app vội, tự tìm kênh chính thức, kiểm tra tên miền và không nhập thông tin tài chính vào trang lạ."], ["QR và link cũng cần kiểm chứng.", "App ngoài nguồn chính thức là rủi ro lớn.", "Người nổi tiếng trong video không đảm bảo cơ hội thật."])
        ],
        checkpoint: checkpoint("5.1", [
          q("Quy tắc vàng khi bị yêu cầu chuyển tiền gấp là gì?", ["Chuyển ngay", "Dừng lại và xác minh", "Chuyển một phần", "Hỏi bình luận"], 1),
          q("Ngân hàng/cơ quan chức năng yêu cầu OTP thì nên làm gì?", ["Từ chối và tự gọi kênh chính thức", "Đọc OTP", "Cài app theo hướng dẫn", "Bật chia sẻ màn hình"], 0),
          q("Link/app đầu tư từ video người nổi tiếng cần được xử lý thế nào?", ["Kiểm chứng kênh chính thức trước", "Cài ngay", "Nạp ít tiền thử", "Tin vì nhiều comment"], 0)
        ])
      },
      {
        title: "5.2 Danh dự, học đường và hình ảnh nhạy cảm",
        lessons: [
          lesson("5.2.1", "Ảnh giả vẫn gây đau thật", ["Một hình ảnh nhạy cảm dù bị tạo bằng AI vẫn có thể gây tổn thương thật: xấu hổ, cô lập, bắt nạt, mất danh dự và ảnh hưởng học tập/công việc.", "Không được lưu, chia sẻ, chế giễu hoặc yêu cầu nạn nhân chứng minh ngay. Người chứng kiến có trách nhiệm giảm lan truyền và hỗ trợ đúng cách.", "Trong trường học, quản trị viên nhóm, giáo viên và phụ huynh cần ưu tiên bảo vệ người bị hại, lưu bằng chứng phù hợp và báo cáo theo kênh an toàn."], ["Giả không có nghĩa là vô hại.", "Không giải trí hóa hình ảnh nhạy cảm.", "Bảo vệ nạn nhân trước khi tranh luận thật/giả."]),
          lesson("5.2.2", "Nếu thấy hình ảnh nhạy cảm trong nhóm chat", ["Hành động an toàn là không lưu, không gửi tiếp, không bình luận xúc phạm, chụp/lưu bằng chứng ở mức cần thiết nếu bạn có vai trò hỗ trợ và báo cho người có trách nhiệm.", "Deepfense Check: Pause để không phản ứng theo tò mò; Observe xem ai gửi, yêu cầu gì; Verify qua người có trách nhiệm; Trace nguồn phát tán nếu an toàn; Decide giảm lan truyền.", "Nếu bạn là nạn nhân, hãy lưu bằng chứng, nhờ người tin cậy hỗ trợ, báo cáo nền tảng/trường học/cơ quan phù hợp và không tự trách mình."], ["Không chia sẻ tiếp là bước bảo vệ đầu tiên.", "Người chứng kiến có thể giảm hại rất nhiều.", "Nạn nhân cần hỗ trợ, không bị đổ lỗi."])
        ],
        checkpoint: checkpoint("5.2", [
          q("Ảnh giả nhạy cảm có thể gây hại thật không?", ["Có", "Không", "Chỉ nếu video dài", "Chỉ nếu nhiều like"], 0),
          q("Khi thấy ảnh nhạy cảm trong nhóm, việc nên làm là gì?", ["Không lan truyền và báo người có trách nhiệm", "Gửi tiếp để hỏi", "Chế giễu", "Lưu để xem sau"], 0),
          q("Nạn nhân cần gì trước tiên?", ["Hỗ trợ và bảo vệ", "Bị yêu cầu tự chứng minh ngay", "Bị đổ lỗi", "Bị lan truyền thêm"], 0)
        ])
      },
      {
        title: "5.3 Tin giả, sai bối cảnh và liar's dividend",
        lessons: [
          lesson("5.3.1", "Tin giả không chỉ là thông tin sai", ["Tin giả thường dùng cảm xúc: phẫn nộ, sợ hãi, thương xót, tự hào hoặc ghét bỏ. Deepfake có thể cung cấp 'bằng chứng' giả cho cảm xúc đó.", "Clip ngắn gây phẫn nộ đặc biệt nguy hiểm vì thiếu bối cảnh trước/sau, thiếu nguồn, dễ bị cắt ghép và dễ kích hoạt đám đông.", "Quy tắc là không chia sẻ nội dung gây phẫn nộ khi chưa biết nguồn, thời điểm, địa điểm và người có thể bị hại."], ["Cảm xúc mạnh làm giảm kiểm chứng.", "Clip ngắn cần bối cảnh dài hơn.", "Không biến mình thành mắt xích lan truyền sai."]),
          lesson("5.3.2", "Sai bối cảnh và sự thật bị gọi là giả", ["Một nội dung thật nhưng bị gắn sai thời gian, địa điểm hoặc lời dẫn có thể gây hại như nội dung giả. Đây là lý do Trace quan trọng.", "Liar's dividend là rủi ro ngược: người có lỗi có thể phủ nhận bằng cách nói 'đó là deepfake'. Khi xã hội mất niềm tin vào bằng chứng, cả sự thật cũng khó được bảo vệ.", "Người học cần tránh hai cực đoan: tin mọi video và phủ nhận mọi video. Cách đúng là kiểm chứng có trách nhiệm."], ["Sai bối cảnh có thể nguy hiểm như giả.", "Không dùng deepfake như cái cớ phủ nhận mọi bằng chứng.", "Kiểm chứng bảo vệ cả người bị hại và sự thật."])
        ],
        checkpoint: checkpoint("5.3", [
          q("Clip gây phẫn nộ cần gì trước khi chia sẻ?", ["Nguồn và bối cảnh", "Nhiều emoji", "Nhạc nền", "Caption mạnh"], 0),
          q("Liar's dividend là gì?", ["Khi sự thật bị phủ nhận bằng lý do 'đó là deepfake'", "Tiền thưởng học tập", "Lợi nhuận đầu tư", "Tên một detector"], 0),
          q("Sai bối cảnh có thể gây hại như giả không?", ["Có", "Không", "Chỉ trong phim", "Chỉ khi không có âm thanh"], 0)
        ])
      },
      {
        title: "5.4 Tình cảm, việc làm và danh tính số",
        lessons: [
          lesson("5.4.1", "Tình cảm và danh tính giả", ["Kẻ xấu có thể dùng ảnh, video, giọng nói hoặc hồ sơ giả để xây dựng quan hệ tình cảm online, tạo niềm tin rồi xin tiền, ảnh nhạy cảm hoặc thông tin cá nhân.", "Dấu hiệu đỏ là yêu quá nhanh, né gặp mặt/xác minh, câu chuyện bi kịch, xin hỗ trợ tài chính, muốn giữ bí mật và tạo cảm giác bạn là người duy nhất hiểu họ.", "Phản ứng an toàn là giữ ranh giới, xác minh danh tính, không gửi tiền/ảnh nhạy cảm và tìm hỗ trợ khi bị đe dọa."], ["Tình cảm online cũng cần an toàn danh tính.", "Không gửi ảnh nhạy cảm dưới áp lực.", "Bị đe dọa cần lưu bằng chứng và tìm hỗ trợ."]),
          lesson("5.4.2", "Việc làm, học bổng, đầu tư và danh tính số", ["Việc làm lương cao, học bổng dễ, khóa học bí mật hoặc chuyên gia AI có thể là mồi nhử. Deepfake làm lời mời trông chuyên nghiệp và đáng tin hơn.", "Dấu hiệu đỏ là phí giữ chỗ, yêu cầu giấy tờ nhạy cảm quá sớm, phỏng vấn qua kênh lạ, email/tên miền nhái, hứa chắc chắn trúng tuyển hoặc lợi nhuận cao không rủi ro.", "Bảo vệ danh tính số bằng cách hạn chế công khai thông tin nhạy cảm, kiểm soát ảnh/giọng nói, cài riêng tư, bảo vệ tài khoản và theo dõi dấu hiệu mạo danh."], ["Cơ hội thật chịu được kiểm chứng.", "Không gửi giấy tờ nhạy cảm quá sớm.", "Danh tính số là tài sản cần bảo vệ."]),
          lesson("5.4.3", "Bản đồ rủi ro đời sống số", ["Hãy lập bản đồ các nơi bạn dễ gặp deepfake: gia đình, trường học, công việc, mạng xã hội, tài chính, tình cảm, việc làm và đầu tư.", "Với mỗi tình huống, ghi rủi ro chính, dấu hiệu đỏ, kênh độc lập, người hỗ trợ và hành động an toàn đầu tiên.", "Bản đồ rủi ro giúp bạn chuẩn bị trước, thay vì chỉ cố nghĩ khi đã bị hoảng."
          ], ["Chuẩn bị trước giúp phản ứng tốt hơn.", "Mỗi môi trường cần kênh hỗ trợ riêng.", "Rủi ro đời sống số không chỉ là vấn đề kỹ thuật."])
        ],
        checkpoint: checkpoint("5.4", [
          q("Dấu hiệu đỏ trong tình cảm online là gì?", ["Yêu quá nhanh, né xác minh và xin tiền", "Nói chuyện lịch sự", "Có ảnh đại diện", "Nhắn đúng giờ"], 0),
          q("Việc làm/học bổng giả thường yêu cầu gì đáng ngờ?", ["Phí giữ chỗ hoặc giấy tờ nhạy cảm quá sớm", "Mô tả công việc rõ", "Email chính thức", "Quy trình minh bạch"], 0),
          q("Bản đồ rủi ro giúp gì?", ["Chuẩn bị kênh xác minh và hành động an toàn", "Tạo deepfake", "Tăng like", "Ẩn mọi thông tin"], 0)
        ])
      }
    ],
    quiz: [
      q("Module 5 cho thấy deepfake xuất hiện ở đâu?", ["Nhiều vấn đề đời sống số", "Chỉ trong phim", "Chỉ trong phòng lab", "Chỉ trong game"], 0),
      q("Quy tắc vàng về tiền là gì?", ["Không chuyển tiền khi bị ép thời gian", "Chuyển trước hỏi sau", "Đọc OTP nếu giọng quen", "Cài app theo hướng dẫn"], 0),
      q("Cơ quan chức năng yêu cầu chuyển tiền vào tài khoản an toàn có đáng tin không?", ["Không", "Có", "Tùy bình luận", "Nếu video rõ thì có"], 0),
      q("Ảnh nhạy cảm AI nên được xử lý thế nào?", ["Không lan truyền, bảo vệ nạn nhân", "Gửi tiếp", "Chế giễu", "Lưu giải trí"], 0),
      q("Clip gây phẫn nộ dễ nguy hiểm vì sao?", ["Kích hoạt cảm xúc trước kiểm chứng", "Luôn dài", "Không ai xem", "Không có caption"], 0),
      q("Sai bối cảnh là gì?", ["Nội dung thật bị gắn sai thời gian/địa điểm/lời dẫn", "Video quá sáng", "Ảnh dung lượng thấp", "Bình luận ít"], 0),
      q("Liar's dividend gây hại vì sao?", ["Làm sự thật dễ bị phủ nhận", "Tăng bảo mật", "Giảm lừa đảo", "Tạo chứng chỉ"], 0),
      q("Việc làm giả thường có dấu hiệu nào?", ["Phí giữ chỗ, email nhái, yêu cầu giấy tờ sớm", "Quy trình rõ", "Tên miền chính thức", "Phỏng vấn minh bạch"], 0),
      q("Bảo vệ danh tính số gồm gì?", ["Hạn chế công khai dữ liệu nhạy cảm và bảo vệ tài khoản", "Đăng mọi thứ công khai", "Dùng một mật khẩu", "Bỏ qua mạo danh"], 0),
      q("Bản đồ rủi ro nên có gì?", ["Rủi ro, dấu hiệu đỏ, kênh độc lập, người hỗ trợ", "Màu nền", "Số like", "Tên filter"], 0)
    ]
  },
  {
    id: 6,
    part: "recognition",
    title: "Phòng vệ cá nhân và cộng đồng",
    duration: "95 phút",
    level: "Recognition",
    scenario: "An không muốn chỉ học cho mình. Nếu gia đình, lớp học, công ty và nhóm chat đều có quy tắc rõ, deepfake khó khiến mọi người hoảng loạn hơn. Module này xây Deepfense Shield cho cá nhân và cộng đồng.",
    outcomes: ["Áp dụng bộ quy tắc Deepfense Shield.", "Thiết lập Family Code, Money Delay, Two-Channel Rule, No Shame Reporting và Evidence First.", "Vệ sinh dữ liệu cá nhân để giảm nguy cơ bị mạo danh.", "Hoàn thành capstone hồ sơ sự việc của An."],
    sections: [
      {
        title: "6.1 Bộ quy tắc Deepfense Shield",
        lessons: [
          lesson("6.1.1", "Family Code", ["Family Code là một câu/mật khẩu gia đình dùng để xác minh nhanh khi có cuộc gọi hoặc tin nhắn khẩn cấp. Nó không cần phức tạp như mật khẩu ngân hàng, nhưng phải khó đoán với người ngoài.", "Family Code tốt nên dễ nhớ, không đăng công khai, không liên quan thông tin dễ đoán như ngày sinh, tên thú cưng, trường học, địa chỉ và nên được cập nhật khi nghi lộ.", "Ví dụ: khi người thân gọi nhờ chuyển tiền gấp, bạn có thể yêu cầu nói Family Code hoặc gọi lại người thân khác trước khi hành động."], ["Family Code giúp xác minh nhanh trong gia đình.", "Không dùng thông tin công khai làm code.", "Code không thay thế hoàn toàn kênh độc lập nhưng rất hữu ích."]),
          lesson("6.1.2", "Money Delay", ["Money Delay là quy tắc trì hoãn giao dịch khi có áp lực thời gian. Với yêu cầu tiền bất ngờ, hãy đặt khoảng dừng tối thiểu để xác minh.", "Kẻ xấu muốn tiền đi nhanh hơn khả năng bạn kiểm tra. Money Delay biến sự chậm lại thành quy tắc đã thống nhất, giúp bạn không phải tranh luận với cảm xúc trong lúc hoảng.", "Câu cần nhớ: tiền đi nhanh, bằng chứng đi chậm; hãy để bằng chứng kịp tới trước tiền."], ["Không chuyển tiền khi đang bị ép thời gian.", "Money Delay nên được thống nhất trước trong gia đình/công việc.", "Trì hoãn có thể cứu thiệt hại lớn."]),
          lesson("6.1.3", "Two-Channel Rule", ["Two-Channel Rule yêu cầu xác minh qua ít nhất hai kênh khi có yêu cầu rủi ro: gọi lại số đã lưu, hỏi người thân khác, kiểm tra app chính thức, email công ty hoặc kênh trường học.", "Quy tắc này cần dùng khi có tiền, OTP, mật khẩu, cài app, dữ liệu cá nhân, ảnh nhạy cảm, quyết định công việc hoặc yêu cầu giữ bí mật.", "Nếu hai kênh mâu thuẫn, hãy dừng hành động rủi ro và nâng cấp cho người có trách nhiệm."], ["Một kênh có thể bị chiếm; hai kênh giảm rủi ro.", "Kênh thứ hai phải độc lập.", "Mâu thuẫn thông tin là lý do để dừng lại."]),
          lesson("6.1.4", "No Shame Reporting", ["No Shame Reporting nghĩa là tạo môi trường để người lỡ bấm link, lỡ chuyển tiền hoặc nghi bị mạo danh có thể báo sớm mà không bị mắng nhiếc.", "Sự xấu hổ làm nạn nhân im lặng, xóa bằng chứng và khiến thiệt hại lan rộng. Cộng đồng an toàn cần phản ứng bằng hỗ trợ, không chế giễu.", "Trong gia đình, trường học và công ty, hãy thống nhất câu: báo sớm quan trọng hơn đúng/sai lúc đầu."], ["Không làm nạn nhân sợ báo cáo.", "Báo sớm giảm thiệt hại.", "Văn hóa hỗ trợ là một lớp phòng vệ."]),
          lesson("6.1.5", "Evidence First", ["Evidence First là lưu bằng chứng trước khi xóa, chặn hoặc rời khỏi cuộc trò chuyện. Bằng chứng gồm ảnh chụp màn hình, đường link, số tài khoản, thời gian, số điện thoại, nội dung chat, file và tên tài khoản.", "Lưu bằng chứng an toàn nghĩa là không phát tán lại nội dung nhạy cảm, che thông tin riêng tư khi cần, lưu ở nơi bảo mật và gửi cho đúng người có trách nhiệm.", "Bằng chứng giúp ngân hàng, nền tảng, nhà trường, công ty hoặc cơ quan chức năng xử lý nhanh hơn."], ["Lưu bằng chứng trước khi xóa/chặn.", "Không lan truyền lại nội dung nhạy cảm.", "Bằng chứng cần thời gian, nguồn và ngữ cảnh."])
        ],
        checkpoint: checkpoint("6.1", [
          q("Family Code dùng để làm gì?", ["Xác minh nhanh trong gia đình", "Đăng công khai", "Thay mật khẩu ngân hàng", "Tăng like"], 0),
          q("Money Delay giúp gì?", ["Trì hoãn giao dịch để có thời gian xác minh", "Chuyển tiền nhanh hơn", "Ẩn bằng chứng", "Tạo QR"], 0),
          q("No Shame Reporting quan trọng vì sao?", ["Giúp nạn nhân báo sớm", "Để mắng người bị lừa", "Để xóa hết bằng chứng", "Để chia sẻ công khai"], 0)
        ])
      },
      {
        title: "6.2 Vệ sinh dữ liệu cá nhân",
        lessons: [
          lesson("6.2.1", "Dữ liệu cá nhân là nguyên liệu", ["Ảnh, video, giọng nói, ngày sinh, nơi học, nơi làm, quan hệ gia đình, lịch trình, sở thích và cách xưng hô đều có thể trở thành nguyên liệu cho kịch bản lừa đảo.", "Kẻ xấu không cần biết mọi thứ. Chỉ vài chi tiết đúng cũng đủ làm một cuộc gọi giả trông đáng tin hơn.", "Vệ sinh dữ liệu không phải biến mất khỏi Internet, mà là giảm lượng thông tin công khai giúp người khác mạo danh bạn."], ["Dữ liệu cá nhân là nguyên liệu của social engineering.", "Một vài chi tiết đúng có thể làm kịch bản thuyết phục.", "Giảm công khai giúp giảm rủi ro."]),
          lesson("6.2.2", "Những gì nên hạn chế công khai", ["Nên hạn chế công khai số điện thoại, địa chỉ, lịch trình, giấy tờ, ảnh trẻ em, thông tin tài chính, hình ảnh/giọng nói chất lượng cao nếu không cần thiết và các mối quan hệ nhạy cảm.", "Cài đặt riêng tư cho mạng xã hội, kiểm soát ai có thể xem bài cũ, ai có thể tải ảnh, ai có thể tag bạn và ai có thể nhắn tin.", "Bảo vệ tài khoản bằng mật khẩu mạnh, quản lý mật khẩu, xác thực hai lớp và cảnh giác với email/link đăng nhập giả."], ["Không phải mọi dữ liệu đều nên công khai.", "Cài đặt riêng tư cần được kiểm tra định kỳ.", "Tài khoản bị chiếm quyền làm tăng rủi ro mạo danh."]),
          lesson("6.2.3", "Khi bị mạo danh", ["Nếu bị mạo danh, hãy lưu bằng chứng, báo cáo nền tảng, cảnh báo người quen, đổi mật khẩu nếu tài khoản bị ảnh hưởng và thông báo cho tổ chức liên quan nếu có rủi ro tài chính/danh dự.", "Không nên tranh cãi dài với tài khoản giả hoặc phát tán lại nội dung nhạy cảm để thanh minh. Hãy tập trung vào bằng chứng, kênh báo cáo và người hỗ trợ.", "Nếu có tống tiền, đe dọa hoặc hình ảnh nhạy cảm, hãy tìm người tin cậy và kênh hỗ trợ phù hợp sớm."], ["Lưu bằng chứng và báo cáo sớm.", "Cảnh báo mạng lưới quen biết để giảm lây lan.", "Không tự xử lý một mình khi bị đe dọa."])
        ],
        checkpoint: checkpoint("6.2", [
          q("Dữ liệu cá nhân nguy hiểm vì sao?", ["Có thể làm nguyên liệu cho mạo danh và lừa đảo", "Luôn vô hại", "Chỉ dùng để trang trí", "Không ai dùng được"], 0),
          q("Biện pháp bảo vệ tài khoản là gì?", ["Mật khẩu mạnh và xác thực hai lớp", "Một mật khẩu cho mọi nơi", "Bấm mọi link", "Tắt cảnh báo"], 0),
          q("Khi bị mạo danh, việc nên làm là gì?", ["Lưu bằng chứng, báo cáo và cảnh báo người quen", "Im lặng", "Xóa hết dấu vết", "Chuyển tiền cho kẻ đe dọa"], 0)
        ])
      },
      {
        title: "6.3 Capstone: Hồ sơ sự việc của An",
        lessons: [
          lesson("6.3.1", "Bộ hồ sơ", ["Capstone đưa người học vào một hồ sơ tổng hợp: video ngắn người nổi tiếng, tin nhắn từ bạn cũ, ảnh chụp bình luận, tin nhắn thoại, kết quả kiểm tra nhanh và dữ kiện bổ sung.", "Mục tiêu không phải đoán thật/giả trong 10 giây, mà là phân loại nội dung, ghi red flags, áp dụng Deepfense Check, đánh giá rủi ro và đề xuất hành động.", "Người học cần nhớ: một kết quả detector hoặc một bình luận không đủ để kết luận. Hồ sơ cần được đọc như một chuỗi sự kiện."], ["Capstone kiểm tra năng lực tổng hợp.", "Đọc hồ sơ theo chuỗi, không đọc từng mảnh rời.", "Detector chỉ là một dữ kiện trong hồ sơ."]),
          lesson("6.3.2", "Gợi ý phân tích", ["Phân loại nội dung: video có thể là deepfake/sai bối cảnh/quảng cáo lừa đảo; tin nhắn có thể là mạo danh; bình luận có thể là social proof; tin nhắn thoại có thể là deepvoice.", "Red flags gồm lợi nhuận cao, link/app lạ, tài khoản mới, yêu cầu tiền, né xác minh, thúc giục, bình luận đồng loạt và nguồn đầu tiên không rõ.", "Deepfense Check: Pause trước khi hành động; Observe dấu hiệu; Verify kênh chính thức/người quen; Trace nguồn; Decide không chuyển tiền, không cài app, lưu bằng chứng và cảnh báo người liên quan."], ["Phân loại đúng giúp chọn phản ứng đúng.", "Red flags thường xuất hiện thành cụm.", "Decide phải giảm hại, không chỉ trả lời đúng/sai."]),
          lesson("6.3.3", "Rubric và phản hồi mẫu", ["Rubric capstone đánh giá bốn nhóm: nhận diện dấu hiệu, xác minh nguồn/kênh độc lập, đánh giá rủi ro và đề xuất hành động an toàn.", "Phản hồi tốt không cần dài, nhưng phải rõ: chưa đủ dữ liệu để kết luận thật/giả; có rủi ro tài chính/mạo danh; không cài app/chuyển tiền; kiểm tra kênh chính thức; lưu bằng chứng; cảnh báo người liên quan.", "Sau capstone, người học nên có một bộ phản xạ: dừng, quan sát, xác minh, truy nguồn, quyết định và báo cáo không xấu hổ."], ["Rubric ưu tiên hành động an toàn.", "Phản hồi ngắn nhưng đủ dữ kiện tốt hơn kết luận giật gân.", "Hoàn thành capstone là bước chuyển sang phòng vệ chủ động."])
        ],
        checkpoint: checkpoint("6.3", [
          q("Capstone yêu cầu năng lực chính nào?", ["Tổng hợp dấu hiệu, nguồn, rủi ro và hành động", "Tạo video", "Đoán nhanh", "Tăng điểm bằng mẹo"], 0),
          q("Một kết quả detector có đủ kết luận không?", ["Không", "Có", "Luôn đủ", "Không cần nguồn"], 0),
          q("Phản hồi mẫu tốt nên ưu tiên gì?", ["Giảm hại và xác minh", "Kết luận giật gân", "Chia sẻ rộng", "Xóa hết bằng chứng"], 0)
        ])
      }
    ],
    quiz: [
      q("Deepfense Shield gồm nhóm quy tắc nào?", ["Family Code, Money Delay, Two-Channel Rule, No Shame Reporting, Evidence First", "Like, Share, Subscribe", "Cut, Copy, Paste", "Upload, Promote, Sell"], 0),
      q("Family Code tốt nên như thế nào?", ["Dễ nhớ với người nhà, khó đoán với người ngoài", "Là ngày sinh công khai", "Đăng lên mạng", "Giống mật khẩu ngân hàng"], 0),
      q("Money Delay áp dụng khi nào?", ["Yêu cầu tiền bất ngờ có áp lực thời gian", "Mọi lúc mua cà phê", "Sau khi đã chuyển", "Khi không có rủi ro"], 0),
      q("Two-Channel Rule cần gì?", ["Kênh thứ hai độc lập", "Hai link từ cùng người lạ", "Hai bình luận", "Hai lượt like"], 0),
      q("No Shame Reporting giúp gì?", ["Báo sớm và giảm thiệt hại", "Che giấu sự cố", "Đổ lỗi nạn nhân", "Xóa bằng chứng"], 0),
      q("Evidence First nghĩa là gì?", ["Lưu bằng chứng trước khi xóa/chặn", "Đăng công khai mọi thứ", "Không lưu gì", "Chỉ tin trí nhớ"], 0),
      q("Dữ liệu nào nên hạn chế công khai?", ["Số điện thoại, lịch trình, giấy tờ, quan hệ nhạy cảm", "Mọi kiến thức học tập", "Tên khóa học", "Màu nền"], 0),
      q("Bảo vệ tài khoản cần gì?", ["Mật khẩu mạnh và xác thực hai lớp", "Một mật khẩu yếu", "Bấm mọi link", "Chia sẻ mã"], 0),
      q("Khi bị mạo danh, nên làm gì?", ["Lưu bằng chứng, báo cáo, cảnh báo người quen", "Im lặng", "Trả tiền ngay", "Xóa hết mọi thứ"], 0),
      q("Capstone của Module 6 kiểm tra điều gì?", ["Khả năng áp dụng toàn bộ quy trình vào hồ sơ sự việc", "Khả năng tạo deepfake", "Khả năng né quiz", "Khả năng tăng follow"], 0)
    ]
  },
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

let state = {
  route: "overview",
  moduleIndex: 0,
  sectionIndex: 0,
  lessonIndex: 0,
  quiz: null,
  inlineAnswers: {},
  inlineSubmitted: false,
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
    window.location.replace("/academy/basics?auth=required");
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
        `Theo Module ${module.id}, kết quả học tập nào là trọng tâm của mục ${index + 1}?`,
        [outcome, "Chia sẻ nội dung đáng nghi trước khi kiểm chứng", "Kết luận deepfake chỉ từ một dấu hiệu đơn lẻ", "Bỏ qua nguồn tin và bối cảnh"],
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
          `Trong bài ${lessonItem.id} - ${lessonItem.title}, hành động nào phù hợp nhất với tư duy phòng vệ?`,
          [lessonItem.takeaways[0] || "Dừng lại và kiểm chứng trước khi kết luận", "Chia sẻ ngay nếu nội dung gây sốc", "Tin vào cảm xúc đầu tiên", "Xóa dấu vết mà không lưu bằng chứng"],
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
      `Tình huống tổng hợp ${fillerIndex}: khi gặp nội dung nghi deepfake liên quan ${module.title}, lựa chọn nào an toàn nhất?`,
      ["Dừng lại, kiểm chứng nguồn và bối cảnh, lưu bằng chứng nếu có rủi ro", "Chia sẻ rộng rãi để hỏi ý kiến", "Kết luận ngay dựa trên cảm giác", "Làm theo yêu cầu gấp mà không xác minh"],
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
  renderOverview();
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
  return `<section class="inline-quiz" aria-label="Checkpoint ${checkpointData.label}"><p class="eyebrow">Checkpoint ${checkpointData.label}</p><h3>Kiểm tra nhanh trước khi sang phần tiếp theo</h3><p>Chọn đáp án tốt nhất cho từng câu. Phần này giúp bạn khóa lại ý chính ngay tại cuối mục học.</p>${checkpointData.questions.map((question, questionIndex) => `<div class="inline-question"><strong>${questionIndex + 1}. ${question.text}</strong><div class="inline-options">${question.options.map((option, optionIndex) => `<label><input type="radio" name="checkpoint-${questionIndex}" value="${optionIndex}" data-inline-answer="${questionIndex}" ${state.inlineAnswers[questionIndex] === optionIndex ? "checked" : ""} /><span>${option}</span></label>`).join("")}</div></div>`).join("")}<button class="primary-btn" type="button" data-submit-inline-checkpoint="${checkpointData.label}">Nộp checkpoint</button><div class="inline-result" id="inlineCheckpointResult">${state.inlineSubmitted ? renderInlineCheckpointResult() : ""}</div></section>`;
}

function renderInlineCheckpointResult() {
  const questions = currentSection().checkpoint.questions;
  const score = questions.reduce((total, question, index) => total + (state.inlineAnswers[index] === question.answer ? 1 : 0), 0);
  return score === questions.length ? `Đạt ${score}/${questions.length}. Bạn đã nắm phần này.` : `${score}/${questions.length}. Hãy đọc lại điểm cần nhớ rồi thử lại.`;
}

function renderOverview() {
  const saved = readProgress();
  const doneModules = modules.filter((module) => saved[`module-${module.id}`]).length;
  const percent = Math.min(100, Math.round((doneModules / modules.length) * 85 + (hasCompletedCourseEvaluation() ? 5 : 0) + (hasPassedFinalExam() ? 10 : 0)));
  const stats = [["Module", `${doneModules}/${modules.length}`], ["Thời lượng", "10-12h"], ["Final Exam", "50 câu"], ["Điểm đạt", "70%"]];
  const statsNode = document.querySelector("#overviewStats");
  if (statsNode) statsNode.innerHTML = stats.map(([label, value]) => `<article class="stat-card"><span>${label}</span><strong>${value}</strong></article>`).join("");
  const progressValue = document.querySelector("#overviewProgressValue");
  const progressBar = document.querySelector("#overviewProgressBar");
  if (progressValue) progressValue.textContent = `${percent}%`;
  if (progressBar) progressBar.style.width = `${percent}%`;
  const grid = document.querySelector("#overviewGrid");
  if (!grid) return;
  grid.innerHTML = modules.map((module, index) => {
    const done = !!saved[`module-${module.id}`];
    const unlocked = isModuleUnlocked(index);
    const action = done ? "Ôn lại" : unlocked ? "Vào học" : "Đang khóa";
    const status = done ? "Hoàn tất" : unlocked ? "Đang mở" : "Hoàn thành module trước để mở";
    return `<article class="overview-module ${done ? "done" : ""} ${!unlocked ? "locked" : ""}"><div class="number">${done ? "✓" : module.id}</div><div><h3>${module.title}</h3><p>${status} · ${module.duration} · ${module.sections.length} mục học</p></div><button class="ghost-btn" data-open-module="${module.id}" ${!unlocked ? "disabled" : ""}>${action}</button></article>`;
  }).join("");
}

function renderModuleStrip() {
  const saved = readProgress();
  document.querySelector("#moduleStrip").innerHTML = modules.map((module, index) => {
    const done = !!saved[`module-${module.id}`];
    const unlocked = isModuleUnlocked(index);
    const label = done ? "Hoàn tất" : !unlocked ? "Đang khóa" : index === state.moduleIndex ? "Đang học" : `Module ${module.id}`;
    return `<button class="module-tab ${index === state.moduleIndex ? "active" : ""} ${!unlocked ? "locked" : ""} ${done ? "done" : ""}" data-module-index="${index}" ${!unlocked ? "disabled" : ""}><span class="module-index">${done ? "✓" : module.id}</span><span>${label}</span><strong>${module.title}</strong></button>`;
  }).join("");
}

function renderLearning() {
  const module = currentModule();
  renderModuleStrip();
  const learnHero = document.querySelector("#learnHero");
  if (learnHero) learnHero.innerHTML = `<div><p class="eyebrow">Module ${module.id}</p><h2>${module.title}</h2><p>${module.outcomes[0] || module.scenario}</p></div><div class="learn-hero-meta"><span class="meta-pill">${module.duration}</span><span class="meta-pill">${module.level}</span><span class="meta-pill">${module.sections.length} mục</span></div>`;
  document.querySelector("#sectionTabs").innerHTML = module.sections.map((section, index) => `<button class="section-tab ${index === state.sectionIndex ? "active" : ""}" data-section-index="${index}">${section.title}</button>`).join("");
  document.querySelector("#lessonTabs").innerHTML = currentSection().lessons.map((lessonItem, index) => `<button class="lesson-tab ${index === state.lessonIndex ? "active" : ""}" data-lesson-index="${index}"><span>${lessonItem.id}</span><strong>${lessonItem.title}</strong></button>`).join("");
  const lessonItem = currentLesson();
  document.querySelector("#lessonCard").innerHTML = `<p class="eyebrow">${lessonItem.id} · ${currentSection().title}</p><h2>${lessonItem.title}</h2><div class="lesson-meta-row"><span class="meta-pill">Tự học</span><span class="meta-pill">Lưu tiến độ tự động</span><span class="meta-pill">Checkpoint cuối mục</span></div><p class="lead">${module.scenario}</p>${lessonItem.paragraphs.map((paragraph) => `<p>${paragraph}</p>`).join("")}<div class="takeaway-box"><h3>Điểm cần nhớ</h3><ul>${lessonItem.takeaways.map((item) => `<li>${item}</li>`).join("")}</ul></div>${renderInlineCheckpoint()}`;
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
      <div><h3>${item.title}</h3><strong>${item.scope}</strong><p>${item.detail}</p></div>
      <button class="ghost-btn" data-assessment="${item.title}">Xem cấu trúc</button>
    </article>`).join("");
  const finalButton = document.querySelector('[data-assessment="Final Exam"]');
  if (!finalButton) return;
  const finalCard = finalButton.closest(".assessment-card");
  const result = readFinalExamResult();
  if (!hasCompletedCourseEvaluation()) {
    finalButton.disabled = true;
    finalButton.textContent = "Hoàn thành đánh giá để mở";
    finalCard?.classList.add("locked");
  } else if (result?.passed) {
    finalButton.textContent = "Final Exam đã đạt";
    finalCard?.classList.add("passed");
  } else if (result && !result.passed) {
    finalButton.textContent = `Thi lại Final Exam (${result.percent}%)`;
  } else {
    finalButton.textContent = "Bắt đầu Final Exam";
  }
}

function renderCourseEvaluation() {
  const panel = document.querySelector("#courseEvaluationPanel");
  if (!panel) return;
  if (!isCourseComplete()) {
    panel.innerHTML = `<div class="evaluation-card locked"><p class="eyebrow">Course evaluation</p><h3>Đánh giá khóa học sẽ mở sau khi hoàn thành 9 module.</h3><p>Hoàn tất toàn bộ module và quiz module trước khi vào bước đánh giá cuối khóa.</p></div>`;
    return;
  }
  if (hasCompletedCourseEvaluation()) {
    const finalResult = readFinalExamResult();
    panel.innerHTML = `<div class="evaluation-card done"><p class="eyebrow">Course evaluation</p><h3>Đã ghi nhận đánh giá khóa học.</h3><p>${finalResult?.passed ? `Final Exam đã đạt ${finalResult.percent}%. Certificate đã sẵn sàng.` : "Cảm ơn phản hồi của bạn. Final Exam đã được mở khóa."}</p></div>`;
    return;
  }
  panel.innerHTML = `<form class="evaluation-card" id="courseEvaluationForm"><div><p class="eyebrow">Required before Final Exam</p><h3>Đánh giá khóa học</h3><p>Phần này giúp DEEPFENSE cải thiện chất lượng bài học, nhịp độ và trải nghiệm thi cuối khóa.</p></div><label>Mức hài lòng tổng thể<select name="rating" required><option value="">Chọn đánh giá</option><option value="5">5 - Rất tốt</option><option value="4">4 - Tốt</option><option value="3">3 - Tạm ổn</option><option value="2">2 - Cần cải thiện</option><option value="1">1 - Chưa phù hợp</option></select></label><label>Nhịp độ khóa học<select name="pace" required><option value="">Chọn nhịp độ</option><option value="right">Vừa phù hợp</option><option value="fast">Hơi nhanh</option><option value="slow">Hơi chậm</option></select></label><label>Sau khóa học, bạn tự tin nhận diện deepfake ở mức nào?<select name="confidence" required><option value="">Chọn mức tự tin</option><option value="high">Tự tin</option><option value="medium">Tạm ổn, cần luyện thêm</option><option value="low">Chưa tự tin</option></select></label><label>Góp ý cải thiện (nếu có)<textarea name="feedback" rows="4" placeholder="Nội dung nào nên thêm, bỏ, làm rõ hơn hoặc thiết kế lại?"></textarea></label><button class="primary-btn" type="submit">Gửi đánh giá và mở Final Exam</button></form>`;
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
  document.querySelector("#quizCard").innerHTML = `<h3>${question.text}</h3><div class="answer-list">${question.options.map((item, index) => `<label class="${quiz.answers[quiz.index] === item.original ? "selected" : ""}"><input type="radio" name="quiz-answer" value="${item.original}" ${quiz.answers[quiz.index] === item.original ? "checked" : ""} /><span>${String.fromCharCode(65 + index)}</span>${item.option}</label>`).join("")}</div>`;
  document.querySelector("#prevQuestion").disabled = quiz.index === 0;
  document.querySelector("#nextQuestion").textContent = quiz.index === quiz.questions.length - 1 ? "Nộp bài" : "Câu sau →";
  document.querySelector("#quizResult").innerHTML = "";
}

function submitQuiz() {
  const quiz = state.quiz;
  if (quiz.submitted) return;
  let score = 0;
  quiz.questions.forEach((question, index) => { if (quiz.answers[index] === question.answer) score += 1; });
  const percent = Math.round((score / quiz.questions.length) * 100);
  quiz.submitted = true;
  document.querySelector("#quizResult").innerHTML = `<strong>${percent >= 70 ? "Đạt" : "Chưa đạt"}: ${score}/${quiz.questions.length} (${percent}%)</strong><p>${percent >= 70 ? "Bạn đã nắm được trọng tâm. Hãy tiếp tục sang phần học tiếp theo." : "Hãy đọc lại các điểm cần nhớ rồi thử lại để củng cố kiến thức."}</p>`;
  trackLearningEvent("quiz_submitted", { title: quiz.title, type: quiz.type, score, total: quiz.questions.length, percent });
  if (quiz.type === "Final Exam") {
    const result = { score, total: quiz.questions.length, percent, passed: percent >= 70, examId: buildExamId(), questionSources: quiz.questions.map((question) => question.source || ""), submittedAt: new Date().toISOString(), passedAt: percent >= 70 ? new Date().toISOString() : "" };
    localStorage.setItem(FINAL_EXAM_KEY, JSON.stringify(result));
    document.querySelector("#quizResult").innerHTML = `<strong>${result.passed ? "Đạt Final Exam" : "Chưa đạt Final Exam"}: ${score}/${quiz.questions.length} (${percent}%)</strong><p>${result.passed ? "Bạn đã đạt điều kiện tốt nghiệp. Certificate và reward DPF sẽ được mở theo trạng thái xét duyệt." : "Điểm đạt là 70%. Hãy ôn lại các module còn yếu và thi lại khi sẵn sàng."}</p>`;
    renderAssessments();
    updateProgress();
  } else if (percent >= 70 && quiz.type === "Module Quiz") completeCurrentModule();
  else updateProgress();
}

function markProgress() {
  completeCurrentModule();
}

function updateProgress() {
  const saved = readProgress();
  const done = modules.filter((module) => saved[`module-${module.id}`]).length;
  const percent = Math.min(100, Math.round((done / modules.length) * 85 + (hasCompletedCourseEvaluation() ? 5 : 0) + (hasPassedFinalExam() ? 10 : 0)));
  document.querySelector("#courseProgressText").textContent = `${percent}%`;
  document.querySelector("#courseProgressBar").style.width = `${percent}%`;
  const overviewValue = document.querySelector("#overviewProgressValue");
  const overviewBar = document.querySelector("#overviewProgressBar");
  if (overviewValue) overviewValue.textContent = `${percent}%`;
  if (overviewBar) overviewBar.style.width = `${percent}%`;
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
  document.querySelector("#pretestStage").innerHTML = `<div class="pretest-card"><p class="eyebrow">Pre-assessment</p><h3>10 câu · Không đánh rớt · Gợi ý nhịp học</h3><p>Bài đánh giá nhanh giúp bạn làm quen cách ra quyết định trước khi bước vào khóa học chính.</p><button class="primary-btn" id="startPretest">Bắt đầu đánh giá</button></div>`;
  document.querySelector("#startPretest").addEventListener("click", () => startQuiz("Đánh giá đầu vào", "Pre-assessment", pretestQuestions));
  routeTo(state.route || "overview");
}

init();
