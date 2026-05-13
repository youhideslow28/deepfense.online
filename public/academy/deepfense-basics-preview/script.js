const course = {
  title: "DEEPFENSE BASICS",
  credential: "DEEPFENSE AWARE",
  reward: "500 DPF",
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
    title: "Deepfake là gì?",
    duration: "55 phút",
    level: "Foundation",
    scenario:
      "Bạn thấy một video người nổi tiếng phát ngôn gây sốc, được chia sẻ liên tục. Trước khi tin hoặc chia sẻ, bạn cần tự hỏi: nguồn đầu tiên là ai, có nguồn độc lập xác nhận không, và nếu đây là deepfake thì hậu quả sẽ là gì?",
    outcomes: [
      "Giải thích deepfake bằng ngôn ngữ phổ thông nhưng đúng bản chất.",
      "Phân biệt deepfake với chỉnh sửa ảnh/video thông thường.",
      "Hiểu vai trò cơ bản của generative AI và machine learning.",
      "Gọi tên các dạng deepfake phổ biến.",
    ],
    sections: [
      {
        title: "1.1 Giới thiệu và định nghĩa",
        lessons: [
          lesson("1.1.1", "Vấn đề deepfake", [
            "Deepfake trở thành vấn đề vì AI tạo sinh ngày càng dễ tiếp cận. Nội dung giả chất lượng cao không còn chỉ thuộc về các nhóm kỹ thuật chuyên nghiệp.",
            "Điều nguy hiểm không chỉ nằm ở việc nội dung trông thật, mà ở khả năng khiến người xem tin rằng một người đã nói hoặc làm điều họ chưa từng làm.",
            "Một nội dung giả đặt đúng bối cảnh, đúng thời điểm và đánh trúng cảm xúc có thể lan truyền rất nhanh.",
          ], ["Deepfake là rủi ro thông tin, danh tính và niềm tin.", "Cần hình thành thói quen nghi ngờ hợp lý, không kết luận vội."]),
          lesson("1.1.2", "Định nghĩa deepfake", [
            "Deepfake là nội dung hình ảnh, video hoặc âm thanh được tạo, biến đổi hoặc tổng hợp bằng AI để khiến người xem hoặc người nghe tin rằng một người đã nói hoặc làm điều nào đó.",
            "Về học thuật, deepfake là một dạng synthetic media dùng machine learning hoặc deep learning để mô phỏng danh tính, khuôn mặt, giọng nói, biểu cảm, chuyển động hoặc hành vi.",
            "Deepfake khác filter làm đẹp ở chỗ nó thường liên quan đến mô phỏng hoặc gia mạo danh tính.",
          ], ["Nội dung có thể là ảnh, video, âm thanh, livestream hoặc avatar.", "Ngữ cảnh quyết định mức độ nguy hiểm của nội dung."]),
          lesson("1.1.3", "Deepfake và AI tạo sinh", [
            "Generative AI tạo nội dung mới dựa trên dữ liệu đã học. Với deepfake, dữ liệu có thể là ảnh khuôn mặt, video chuyển động, mẫu giọng nói hoặc biểu cảm.",
            "AI có thể học hình dạng khuôn mặt, chuyển động môi, hướng mắt, ánh sáng, âm sắc và nhịp điệu giọng nói.",
            "AI không hiểu con người như con người hiểu nhau, vì vậy nội dung tạo ra vẫn có thể có lỗi: ánh sáng lệch, môi không khớp, da quá mịn hoặc âm thanh thiếu cảm xúc.",
          ], ["Khóa học chỉ giải thích để phòng vệ, không hướng dẫn tạo deepfake.", "Dấu hiệu kỹ thuật cần được kết hợp với kiểm chứng nguồn và bối cảnh."]),
          lesson("1.1.4", "Các dạng deepfake phổ biến", [
            "Face Swap hoán đổi khuôn mặt người này sang người khác. Face Reenactment điều khiển biểu cảm, miệng hoặc hướng mặt.",
            "Voice Deepfake giả lập hoặc tổng hợp giọng nói. Full-body hoặc Avatar Deepfake mô phỏng cử chỉ, dáng đi hoặc nhân vật ảo.",
            "AI-generated Video có thể tạo cảnh hoặc sự kiện chưa từng xảy ra từ mô tả hoặc dữ liệu đầu vào.",
          ], ["Mỗi dạng có rủi ro và cách nhận diện khác nhau.", "Gọi đúng dạng deepfake giúp phân tích chính xác hơn."]),
          lesson("1.1.5", "Phạm vi khóa Basics", [
            "DEEPFENSE BASICS tập trung vào nhận thức, nhận diện cơ bản, phòng ngừa và ứng phó ban đầu.",
            "Khóa học không biến học viên thành chuyên gia pháp chứng hoặc kỹ sư AI ngay lập tức.",
            "Mục tiêu là giúp học viên hiểu, kiểm chứng và phản ứng có trách nhiệm trước nội dung đáng ngờ.",
          ], ["Khóa học không dạy tạo deepfake, huấn luyện mô hình AI hoặc vượt detector.", "Học viên cần học cách kiểm chứng trước khi tin hoặc chia sẻ."]),
        ],
        checkpoint: checkpoint("1.1", [
          q("Deepfake khác chỉnh sửa ảnh/video thông thường chủ yếu ở điểm nào?", ["Thường dùng AI để mô phỏng hoặc gia mạo danh tính", "Chỉ làm ảnh đẹp hơn", "Luôn làm file nặng hơn", "Chỉ xuất hiện trong phim"], 0),
          q("Mục tiêu chính của DEEPFENSE BASICS là gì?", ["Dạy cách tạo deepfake", "Giúp hiểu, nhận biết và phòng ngừa deepfake ở mức cơ bản", "Dạy vượt hệ thống phát hiện", "Dạy lập trình AI nâng cao"], 1),
          q("Dạng nào sau đây là ví dụ voice deepfake?", ["Tăng độ sáng ảnh", "Giả giọng để yêu cầu chuyển tiền", "Thêm phụ đề", "Cắt đoạn im lặng"], 1),
        ]),
      },
      {
        title: "1.2 Tác động của deepfake",
        lessons: [
          lesson("1.2.1", "Niềm tin số", ["Deepfake làm suy yếu niềm tin số vì khiến người dùng khó phân biệt nội dung thật và giả.", "Hai rủi ro trái ngược có thể xảy ra: tin nhầm nội dung giả là thật, hoặc phủ nhận nội dung thật bằng cách nói có thể đó là deepfake."], ["Khủng hoảng niềm tin có thể nguy hiểm hơn một nội dung giả đơn lẻ."]),
          lesson("1.2.2", "Tác động cá nhân", ["Deepfake có thể gây tổn hại danh dự, quyền riêng tư, tâm lý và an toàn cá nhân.", "Một người có thể bị gán vào nội dung họ không tạo ra hoặc bị giả giọng để lừa người thân."], ["Tôn trọng nạn nhân là nguyên tắc nền tảng."]),
          lesson("1.2.3", "Tác động tổ chức", ["Trong doanh nghiệp, deepfake có thể trở thành công cụ social engineering.", "Kẻ tấn công có thể giả giọng lãnh đạo, tạo video yêu cầu chuyển tiền hoặc giả mạo thông báo nội bộ."], ["SOC, GRC và quy trình xác minh danh tính đều liên quan đến phòng vệ deepfake."]),
          lesson("1.2.4", "Tác động xã hội", ["Deepfake có thể làm nhiễu loạn thông tin, thao túng dư luận và làm suy giảm niềm tin vào truyền thông.", "Nội dung giả lan nhanh khi gây sốc, kích động cảm xúc hoặc liên quan nhân vật có ảnh hưởng."], ["Cảm xúc mạnh là tín hiệu cần chậm lại và kiểm chứng."]),
          lesson("1.2.5", "Phân tích case an toàn", ["Một case deepfake nên được phân tích bằng các câu hỏi: nội dung gì bị giả mạo, ai là nạn nhân, mục tiêu là gì, dấu hiệu nghi ngờ là gì, hậu quả có thể xảy ra thế nào.", "Không trình bày case theo hướng hướng dẫn tạo hoặc khai thác deepfake."], ["Case study tốt giúp học viên hiểu rủi ro mà không học cách lạm dụng."]),
        ],
        checkpoint: checkpoint("1.2", [
          q("Deepfake làm suy yếu niềm tin số vì sao?", ["Làm người dùng khó phân biệt thật và giả", "Luôn làm máy tính mất mạng", "Chỉ đổi màu video", "Chỉ ảnh hưởng đến game"], 0),
          q("Trong doanh nghiệp, deepfake có thể dùng trong kiểu tấn công nào?", ["Social engineering", "Tăng tốc ổ cứng", "Nén dữ liệu", "Cài trình duyệt"], 0),
          q("Khi phân tích case deepfake, yếu tố nào quan trọng?", ["Nạn nhân, mục tiêu, bối cảnh, dấu hiệu và hậu quả", "Chỉ số lượt thích", "Màu nền", "Tên file"], 0),
        ]),
      },
      {
        title: "1.3 Rủi ro và tư duy phòng vệ",
        lessons: [
          lesson("1.3.1", "Rủi ro cá nhân", ["Rủi ro cá nhân xảy ra khi deepfake tác động đến danh tính, danh dự, quan hệ, công việc hoặc tâm lý của một người.", "Ví dụ gồm mạo danh để lừa người thân, ghép mặt vào nội dung xúc phạm hoặc giả giọng để yêu cầu tiền."], ["Rủi ro cá nhân cần phản ứng bình tĩnh và có bằng chứng."]),
          lesson("1.3.2", "Rủi ro tổ chức", ["Tổ chức có thể bị tấn công qua email, chat, cuộc gọi, họp trực tuyến hoặc mạng xã hội.", "Rủi ro tăng khi nhân viên tin vào danh tính người gửi mà không xác minh qua kênh độc lập."], ["Quy trình xác minh là tuyến phòng vệ quan trọng."]),
          lesson("1.3.3", "Rủi ro xã hội", ["Deepfake làm xã hội khó phân biệt thật giả, đặc biệt với chính trị, thảm họa, người nổi tiếng hoặc sự kiện nhạy cảm.", "Nó có thể gây hoang mang, kích động cảm xúc và làm giảm niềm tin vào bằng chứng thật."], ["Cộng đồng cần phản ứng chậm hơn, có trách nhiệm hơn."]),
          lesson("1.3.4", "Pháp lý và đạo đức", ["Deepfake liên quan đến quyền riêng tư, danh dự, sự đồng ý, bản quyền và trách nhiệm khi phát tán thông tin sai.", "Không tạo hoặc phát tán nội dung giả mạo người khác khi chưa có sự đồng ý."], ["Không chia sẻ nội dung nghi ngờ chỉ vì tò mò."]),
          lesson("1.3.5", "5 bước ứng phó ban đầu", ["Dừng lại, kiểm chứng, quan sát, lưu bằng chứng và báo cáo.", "Các bước này giúp giảm lan truyền sai lệch và bảo vệ người bị ảnh hưởng trước khi có phân tích sâu hơn."], ["Không chia sẻ vội là hành động phòng vệ đầu tiên."]),
        ],
        checkpoint: checkpoint("1.3", [
          q("Khi gặp video nghi ngờ là deepfake, bước đầu tiên nên làm gì?", ["Dừng lại và chưa chia sẻ vội", "Chia sẻ ngay", "Xóa trình duyệt", "Kết luận ngay là giả"], 0),
          q("Vì sao cần lưu bằng chứng khi bị deepfake tấn công?", ["Để hỗ trợ báo cáo, xác minh và xử lý", "Để chỉnh sửa lại video", "Để tăng lượt xem", "Để khỏi kiểm chứng"], 0),
          q("Hành động nào phù hợp với nguyên tắc đạo đức?", ["Không phát tán nội dung nghi ngờ và tôn trọng nạn nhân", "Chia sẻ vì tò mò", "Gắn thẻ nhiều người", "Tải lên nền tảng khác"], 0),
        ]),
      },
    ],
    quiz: [
      q("Deepfake là gì?", ["Nội dung ảnh, video hoặc âm thanh được tạo/biến đổi bằng AI để mô phỏng hoặc gia mạo người/sự kiện", "Một loại tường lửa", "Một cách tăng độ phân giải", "Một định dạng âm thanh"], 0),
      q("Vì sao deepfake có thể gây nguy hiểm?", ["Làm sai lệch niềm tin, danh tính, uy tín và quyết định", "Luôn làm hỏng thiết bị", "Chỉ làm video nặng hơn", "Chỉ xuất hiện trong game"], 0),
      q("Dạng nào là Face Swap?", ["Thay khuôn mặt người này bằng người khác", "Tăng âm lượng video", "Thêm nhạc nền", "Cắt đoạn thừa"], 0),
      q("Voice deepfake liên quan đến điều gì?", ["Giả lập hoặc tổng hợp giọng nói", "Tạo mật khẩu mạnh", "Tăng tốc mạng", "Xóa lịch sử"], 0),
      q("Deepfake khác filter làm đẹp ở điểm nào?", ["Liên quan đến gia mạo hoặc mô phỏng danh tính bằng AI", "Filter luôn là tội phạm", "Deepfake chỉ đổi màu", "Không có điểm khác"], 0),
      q("Khi thấy video gây sốc đang lan truyền, nên làm gì?", ["Kiểm chứng nguồn và bối cảnh trước khi tin hoặc chia sẻ", "Chia sẻ ngay", "Bình luận kết luận", "Tải lại lên trang khác"], 0),
      q("Deepfake ảnh hưởng doanh nghiệp bằng cách nào?", ["Giả mạo lãnh đạo để lừa chuyển tiền hoặc lấy dữ liệu", "Tự động tăng doanh thu", "Làm website đẹp hơn", "Tăng tốc mạng nội bộ"], 0),
      q("Một tác động xã hội của deepfake là gì?", ["Làm suy giảm niềm tin vào thông tin và bằng chứng số", "Làm mọi tin tức chính xác hơn", "Loại bỏ tin giả", "Chỉ ảnh hưởng phần mềm ảnh"], 0),
      q("Khi nghi bản thân là nạn nhân, nên làm gì?", ["Lưu bằng chứng, báo cáo nền tảng và tìm hỗ trợ phù hợp", "Chia sẻ rộng hơn", "Xóa mọi dấu vết ngay", "Bỏ qua mọi trường hợp"], 0),
      q("Mục tiêu chính của Module 1 là gì?", ["Hiểu khái niệm, tác động, rủi ro và tư duy phòng vệ ban đầu", "Dạy tạo deepfake", "Dạy vượt detector", "Dạy lập trình AI nâng cao"], 0),
    ],
  },
  buildModule(2, "foundation", "Deepfake tác động như thế nào?", "Module này mở rộng từ “deepfake là gì” sang “deepfake có thể gây hậu quả gì” với cá nhân, doanh nghiệp và xã hội.", "Một nhân viên kế toán nhận cuộc gọi video từ “giám đốc” yêu cầu chuyển tiền gấp. Hình ảnh và giọng nói có vẻ rất giống. Nếu là nhân viên đó, bạn sẽ làm gì?", [
    ["2.1 Tác động đến cá nhân", [["2.1.1", "Danh dự và uy tín", "Deepfake có thể gán một người vào nội dung họ không tạo ra, gây tổn hại danh dự, cơ hội học tập và công việc."], ["2.1.2", "Quyền riêng tư và sự đồng ý", "Khuôn mặt, giọng nói và hình ảnh là một phần danh tính cá nhân; dùng chúng để tạo nội dung giả khi chưa được phép là xâm phạm nghiêm trọng."], ["2.1.3", "Tâm lý nạn nhân", "Nạn nhân có thể phải tự chứng minh nội dung là giả trong khi nội dung đã lan truyền rất nhanh."], ["2.1.4", "Lừa đảo người thân", "Voice deepfake có thể giả giọng để yêu cầu chuyển tiền, gửi OTP hoặc tiết lộ thông tin cá nhân."]]],
    ["2.2 Tác động đến doanh nghiệp", [["2.2.1", "CEO fraud", "Kẻ tấn công giả mạo lãnh đạo để yêu cầu nhân viên thực hiện hành động nhạy cảm."], ["2.2.2", "Social engineering", "Deepfake làm yêu cầu giả mạo trông hoặc nghe đáng tin hơn."], ["2.2.3", "Khủng hoảng truyền thông", "Video giả phát ngôn của đại diện công ty có thể làm mất niềm tin trước khi kịp đính chính."], ["2.2.4", "Chi phí xử lý sự cố", "Doanh nghiệp có thể mất chi phí điều tra, pháp lý, truyền thông và đào tạo lại quy trình."]]],
    ["2.3 Tác động đến xã hội", [["2.3.1", "Tin giả và cảm xúc", "Nội dung gây sợ hãi, tức giận hoặc phẫn nộ dễ được chia sẻ trước khi kiểm chứng."], ["2.3.2", "Thao túng dư luận", "Deepfake có thể tạo bằng chứng giả để làm sai lệch nhận thức cộng đồng."], ["2.3.3", "Khủng hoảng nhận thức", "Khi thật giả bị trộn lẫn, xã hội khó biết nên tin vào bằng chứng nào."], ["2.3.4", "Giáo dục cộng đồng", "Giáo dục giúp người dùng phản ứng chậm hơn, cẩn trọng hơn và có trách nhiệm hơn."]]],
  ], ["Phân tích tác động cá nhân, tổ chức và xã hội.", "Nhận diện áp lực cảm xúc trong nội dung viral.", "Hiểu social engineering và CEO fraud ở mức nhập môn."]),
  buildModule(3, "foundation", "Rủi ro, đạo đức và niềm tin số", "Module 3 đặt deepfake trong khung đạo đức, pháp lý nhận thức và trách nhiệm xã hội.", "Một người bạn gửi video nghi ngờ ghép mặt một bạn học vào nội dung xấu. Nhóm chat muốn đăng lên mạng để “cảnh báo”. Bạn nên làm gì?", [
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

let state = {
  route: "overview",
  moduleIndex: 0,
  sectionIndex: 0,
  lessonIndex: 0,
  quiz: null,
};

const AUTH_KEY = "deepfenseAcademyAuth";
const PROGRESS_KEY = "deepfense-basics-progress";
const LOCATION_KEY = "deepfense-basics-last-location";
const EVENT_KEY = "deepfense-basics-learning-events";
const EVALUATION_KEY = "deepfense-basics-course-evaluation";
const FINAL_EXAM_KEY = "deepfense-basics-final-exam";

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
    window.location.replace("/academy/basics");
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
  if (!isAdminSession()) return;
  const progress = readProgress();
  for (let index = 1; index <= modules.length; index += 1) {
    progress[`module-${index}`] = true;
  }
  writeProgress(progress);
  if (!hasCompletedCourseEvaluation()) {
    localStorage.setItem(EVALUATION_KEY, JSON.stringify({
      rating: "5",
      pace: "right",
      confidence: "high",
      feedback: "Admin test completion.",
      submittedAt: new Date().toISOString(),
      adminSeeded: true,
    }));
  }
  if (!hasPassedFinalExam()) {
    localStorage.setItem(FINAL_EXAM_KEY, JSON.stringify({
      score: 50,
      total: 50,
      percent: 100,
      passed: true,
      passedAt: new Date().toISOString(),
      examId: "DEEPFENSE-BASIC-ADMIN-TEST",
      adminSeeded: true,
    }));
  }
}

function highestUnlockedModuleIndex() {
  if (isAdminSession()) return modules.length - 1;
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
  const credentialStatus = document.querySelector(".credential-card span");
  if (credentialStatus) {
    credentialStatus.textContent = complete ? "Certificate đã mở khóa" : "Certificate mở khi hoàn thành";
  }
  if (link) link.hidden = !complete;
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
  const session = getAuthSession();
  const raw = `${session?.email || "learner"}-${Date.now()}`;
  let hash = 0;
  for (let index = 0; index < raw.length; index += 1) {
    hash = ((hash << 5) - hash) + raw.charCodeAt(index);
    hash |= 0;
  }
  return `DPF-BASIC-${new Date().getFullYear()}-${Math.abs(hash).toString(36).toUpperCase()}`;
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
  document.querySelectorAll(".side-link").forEach((node) => node.classList.toggle("active", node.dataset.route === route));
  const labels = {
    overview: ["Foundations Course", "DEEPFENSE BASICS"],
    pretest: ["Pre-assessment", "Đánh giá đầu vào"],
    learn: ["Learning Path", currentModule().title],
    exam: ["Assessments", "Midterm và Final Exam"],
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

function renderOverview() {
  const grid = document.querySelector("#overviewGrid");
  grid.innerHTML = course.parts.map((part) => `
    <article class="part-card">
      <p class="eyebrow">${part.title}</p>
      <h3>${part.description}</h3>
      <div class="part-modules">
        ${part.modules.map((id) => {
          const module = modules.find((item) => item.id === id);
          const moduleIndex = modules.findIndex((item) => item.id === id);
          const locked = !isModuleUnlocked(moduleIndex);
          return `<button data-open-module="${id}" ${locked ? "disabled" : ""} class="${locked ? "locked" : ""}"><span>Module ${id}</span>${module.title}</button>`;
        }).join("")}
      </div>
    </article>
  `).join("");
}

function renderModuleStrip() {
  document.querySelector("#moduleStrip").innerHTML = modules.map((module, index) => `
    <button class="module-tab ${index === state.moduleIndex ? "active" : ""} ${!isModuleUnlocked(index) ? "locked" : ""}" data-module-index="${index}" ${!isModuleUnlocked(index) ? "disabled" : ""}>
      <span>Module ${module.id}</span>
      <strong>${module.title}</strong>
    </button>
  `).join("");
}

function renderLearning() {
  const module = currentModule();
  renderModuleStrip();
  document.querySelector("#moduleHero").innerHTML = `
    <div>
      <p class="eyebrow">Module ${module.id} · ${module.level} · ${module.duration}</p>
      <h2>${module.title}</h2>
      <p>${module.scenario}</p>
    </div>
  `;

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
    <p class="eyebrow">${lessonItem.id}</p>
    <h2>${lessonItem.title}</h2>
    ${lessonItem.paragraphs.map((text) => `<p>${text}</p>`).join("")}
    <div class="takeaway-box">
      <h3>Điểm cần nhớ</h3>
      <ul>${lessonItem.takeaways.map((item) => `<li>${item}</li>`).join("")}</ul>
    </div>
    <div class="checkpoint-box">
      <div>
        <p class="eyebrow">Checkpoint ${currentSection().checkpoint.label}</p>
        <strong>3 câu kiểm tra nhanh sau mục này</strong>
      </div>
      <button class="ghost-btn" data-start-checkpoint="${state.sectionIndex}">Làm checkpoint</button>
    </div>
  `;

  document.querySelector("#moduleOutcomes").innerHTML = module.outcomes.map((item) => `<li>${item}</li>`).join("");
  document.querySelector("#quizTitle").textContent = `Quiz Module ${module.id}`;
  document.querySelector("#quizDescription").textContent = `10 câu kiểm tra trọng tâm của "${module.title}".`;
  updateReaderButtons();
  saveLastLocation();
}

function updateReaderButtons() {
  document.querySelector("#prevLesson").disabled = state.moduleIndex === 0 && state.sectionIndex === 0 && state.lessonIndex === 0;
  document.querySelector("#nextLesson").textContent =
    state.moduleIndex === modules.length - 1 &&
    state.sectionIndex === currentModule().sections.length - 1 &&
    state.lessonIndex === currentSection().lessons.length - 1
      ? "Hoàn tất nội dung →"
      : "Trang sau →";
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
    finalButton.textContent = `Da dat ${result.percent}% - Xem lai cau truc`;
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
      <p>${result.passed ? "Ban da dat dieu kien thi tot nghiep. Certificate va reward DPF se duoc mo theo trang thai xet duyet." : "Diem dat la 70%. Hay on lai cac module con yeu va thi lai khi san sang."}</p>
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
      renderLearning();
      routeTo("learn");
    }

    const sectionButton = event.target.closest("[data-section-index]");
    if (sectionButton) {
      state.sectionIndex = Number(sectionButton.dataset.sectionIndex);
      state.lessonIndex = 0;
      renderLearning();
    }

    const lessonButton = event.target.closest("[data-lesson-index]");
    if (lessonButton) {
      state.lessonIndex = Number(lessonButton.dataset.lessonIndex);
      renderLearning();
    }

    const checkpointButton = event.target.closest("[data-start-checkpoint]");
    if (checkpointButton) {
      startQuiz(`Checkpoint ${currentSection().checkpoint.label}`, "Checkpoint", currentSection().checkpoint.questions);
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

  document.querySelector("#continueLearning").addEventListener("click", () => routeTo("learn"));
  document.querySelector("#backToAcademy").addEventListener("click", () => { window.location.href = "/academy"; });
  document.querySelector("#prevLesson").addEventListener("click", () => moveLesson(-1));
  document.querySelector("#nextLesson").addEventListener("click", () => moveLesson(1));
  document.querySelector("#startModuleQuiz").addEventListener("click", () => startQuiz(`Quiz Module ${currentModule().id}`, "Module Quiz", currentModule().quiz));
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
  routeTo(state.route || "overview");
}

init();
