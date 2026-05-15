import { BookOpen, ShieldCheck, Target, Award } from 'lucide-react';

export interface Lesson {
  id: string;
  title: string;
  paragraphs: string[];
  takeaways: string[];
  type?: 'video' | 'interactive' | 'lab';
  duration?: number;
}

export interface Checkpoint {
  label: string;
  questions: {
    text: string;
    options: string[];
    answer: number;
  }[];
}

export interface Section {
  title: string;
  lessons: Lesson[];
  checkpoint?: Checkpoint;
}

export interface Module {
  id: number;
  part: string;
  title: string;
  duration: string;
  level: string;
  scenario: string;
  outcomes: string[];
  sections: Section[];
  quiz: {
    text: string;
    options: string[];
    answer: number;
  }[];
  locked?: boolean;
}

const lesson = (id: string, title: string, paragraphs: string[], takeaways: string[]): Lesson => ({
  id, title, paragraphs, takeaways, type: 'interactive', duration: 5
});

const q = (text: string, options: string[], answer: number) => ({ text, options, answer });

const checkpoint = (label: string, questions: any[]): Checkpoint => ({ label, questions });

const buildModule = (id: number, part: string, title: string, summary: string, scenario: string, sectionRows: any[], outcomes: string[]): Module => {
  return {
    id,
    part,
    title,
    duration: id < 4 ? "45 phút" : id < 7 ? "50 phút" : "40 phút",
    level: part === "foundation" ? "Foundation" : part === "recognition" ? "Recognition" : "Response",
    scenario,
    outcomes,
    sections: sectionRows.map(([sectionTitle, rows]: any) => ({
      title: sectionTitle,
      lessons: rows.map(([code, lessonTitle, body]: any) =>
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

export const basicsCourse = {
  title: "DEEPFENSE BASICS",
  credential: "DEEPFENSE AWARE",
  reward: "500 DPF coin",
  modules: [
    {
      id: 1,
      part: "foundation",
      title: "Khởi động: Một ngày bình thường trên không gian số",
      duration: "75 phút",
      level: "Foundation",
      scenario: "Một ngày của An bắt đầu rất bình thường: một video đầu tư có người nổi tiếng, một tin nhắn mượn tiền gấp, một hình ảnh nhạy cảm trong nhóm chat, rồi một cuộc gọi video giống người thân. Không tình huống nào tự nhận mình là deepfake. Tất cả đều chỉ yêu cầu An phản ứng thật nhanh.",
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
      ],
      quiz: [
        q("Khi nhận cuộc gọi giống người thân yêu cầu chuyển tiền gấp, bước an toàn nhất là gì?", ["Ngắt cuộc gọi và xác minh qua số/kênh đã biết trước", "Chuyển tiền ngay", "Gửi OTP để họ xử lý", "Hỏi số tài khoản rồi chuyển thử"], 0),
        q("Deepfense Check gồm các bước nào?", ["Pause, Observe, Verify, Trace, Decide", "Post, Like, Share, Comment", "Copy, Paste, Upload", "Scan, Delete, Ignore"], 0),
        q("Vì sao nội dung gây phẫn nộ cần được kiểm chứng kỹ?", ["Vì cảm xúc mạnh thường làm người xem phản ứng nhanh và chia sẻ vội", "Vì video gây phẫn nộ luôn giả", "Vì chỉ nội dung chính trị mới nguy hiểm", "Vì bình luận nhiều là bằng chứng thật"], 0),
        q("Deepfake có thể xuất hiện ở dạng nào?", ["Hình ảnh, video, giọng nói hoặc avatar", "Chỉ video", "Chỉ văn bản", "Chỉ ảnh tĩnh"], 0),
        q("Điều gì KHÔNG nên làm với hình ảnh nhạy cảm nghi bị AI tạo hoặc ghép?", ["Lưu và chuyển tiếp để hỏi ý kiến nhóm", "Không lan truyền", "Báo cáo nội dung", "Tìm người có trách nhiệm hỗ trợ"], 0),
      ]
    },
    {
      id: 2,
      part: "foundation",
      title: "Vì sao con người dễ bị lừa?",
      duration: "90 phút",
      level: "Foundation",
      scenario: "An đã biết deepfake tồn tại, nhưng lúc 22:47 một cuộc gọi video mờ, giọng nói giống người thân và lời nhờ chuyển tiền gấp vẫn khiến An hoảng.",
      outcomes: ["Nhận diện bốn nút bấm cảm xúc: khẩn cấp, thân quen, quyền lực và lợi ích."],
      sections: [],
      quiz: []
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
            lesson("4.1.2", "Observe - Quan sát", ["Observe là quan sát nội dung, hành vi và bối cảnh: khuôn mặt, giọng nói, ánh sáng, nguồn gửi, lời thúc ép và yêu cầu hành động.", "Lỗi phổ biến là chỉ tìm một dấu hiệu kỹ thuật rồi kết luận. Observe đúng là ghi nhận tín hiệu và mức rủi ro, chưa ra phán quyết cuối cùng.", "Câu tự nhắc là: mình đang thấy dữ kiện nào, và dữ kiện nào còn thiếu?"], ["Observe là thu thập tín hiệu.", "Không kết luận từ một chi tiết.", "Cần ghi cả dấu hiệu kỹ thuật lẫn ngữ cảnh bitumen."]),
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
        }
      ],
      quiz: [
        q("Deepfense Check gồm những bước nào?", ["Pause, Observe, Verify, Trace, Decide", "Like, Share, Comment", "Cut, Paste, Upload", "Hide, Delete, Forget"], 0),
        q("Pause cần khi nào?", ["Khi bị ép hành động ngay", "Chỉ khi rảnh", "Sau khi chuyển tiền", "Khi video đã viral"], 0),
        q("Observe đúng là gì?", ["Ghi nhận nhiều tín hiệu", "Kết luận từ một lỗi", "Tin cảm giác đầu tiên", "Bỏ qua bối cảnh"], 0),
        q("Verify không nên làm bằng gì?", ["Link/số mới người đáng ngờ vừa gửi", "Số đã lưu", "App chính thức tự mở", "Website tự gõ"], 0),
        q("Trace giúp phát hiện điều gì?", ["Nguồn đầu tiên và sai bối cảnh", "Mật khẩu mạnh", "Tốc độ mạng", "Dung lượng file"], 0),
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
          ],
          checkpoint: checkpoint("5.1", [
            q("Quy tắc vàng khi bị yêu cầu chuyển tiền gấp là gì?", ["Chuyển ngay", "Dừng lại và xác minh", "Chuyển một phần", "Hỏi bình luận"], 1),
            q("Ngân hàng/cơ quan chức năng yêu cầu OTP thì nên làm gì?", ["Từ chối và tự gọi kênh chính thức", "Đọc OTP", "Cài app theo hướng dẫn", "Bật chia sẻ màn hình"], 0),
          ])
        }
      ],
      quiz: [
        q("Module 5 cho thấy deepfake xuất hiện ở đâu?", ["Nhiều vấn đề đời sống số", "Chỉ trong phim", "Chỉ trong phòng lab", "Chỉ trong game"], 0),
        q("Quy tắc vàng về tiền là gì?", ["Không chuyển tiền khi bị ép thời gian", "Chuyển trước hỏi sau", "Đọc OTP nếu giọng quen", "Cài app theo hướng dẫn"], 0),
      ]
    },
    buildModule(7, "response", "Phòng ngừa deepfake cho cá nhân", "Xây dựng thói quen giảm khả năng bị mạo danh và giảm tác hại khi gặp deepfake.", "Bạn thường đăng ảnh, video và giọng nói công khai. Một ngày có người dùng chúng để tạo nội dung giả. Bạn có thể giảm rủi ro từ trước bằng cách nào?", [
      ["7.1 Dấu vết số cá nhân", [["7.1.1", "Dấu vết số", "Ảnh, video, giọng nói, bài đăng và bình luận đều có thể trở thành dữ liệu nhận diện."], ["7.1.2", "Dữ liệu công khai", "Càng nhiều dữ liệu công khai, nguy cơ bị mô phỏng càng tăng."], ["7.1.3", "Quyền riêng tư", "Cài đặt riêng tư giúp giảm bề mặt thu thập dữ liệu."]]],
      ["7.2 Thói quen xác minh", [["7.2.1", "Yêu cầu nhạy cảm", "Tiền, OTP, dữ liệu cá nhân phải xác minh qua kênh thứ hai."], ["7.2.2", "Mật khẩu và MFA", "Tài khoản mạnh giúp giảm nguy cơ bị kết hợp deepfake và chiếm quyền."], ["7.2.3", "Mã bí mật nhóm", "Gia đình hoặc nhóm có thể thống nhất câu xác minh khi có tình huống khẩn."]]],
    ], ["Quản lý dấu vết số cá nhân.", "Tạo thói quen xác minh yêu cầu nhạy cảm.", "Chia sẻ có trách nhiệm khi gặp nội dung nghi ngờ."]),
    buildModule(8, "response", "Ứng phó khi gặp hoặc trở thành nạn nhân", "Biết cách dừng lan truyền, lưu bằng chứng và tìm hỗ trợ phù hợp.", "Bạn phát hiện một nội dung giả mạo bản thân hoặc người quen đang lan truyền. Bạn nên làm gì trong 30 phút đầu?", [
      ["8.1 Khi gặp nội dung nghi ngờ", [["8.1.1", "Dừng lại", "Không chia sẻ, không kết luận vội, không kích động thêm."], ["8.1.2", "Kiểm chứng", "Kiểm tra nguồn, bối cảnh, dấu hiệu kỹ thuật và nguồn xác nhận độc lập."]]],
      ["8.2 Lưu bằng chứng", [["8.2.1", "Cần lưu gì", "Link, ảnh chụp màn hình, tài khoản đăng, thời gian và nội dung liên quan."], ["8.2.2", "Không sửa bản gốc", "Tránh chỉnh sửa file gốc nếu có thể cần đối chiếu sau này."]]],
    ], ["Phản ứng bình tĩnh khi gặp nội dung nghi ngờ.", "Lưu bằng chứng có cấu trúc.", "Biết tìm hỗ trợ phù hợp theo mức độ sự cố."]),
    buildModule(9, "response", "Deepfake trong tổ chức", "Đưa học viên đến gần định hướng Network Security, SOC và GRC ở mức nhập môn.", "Một tổ chức nhận nhiều cuộc gọi giả mạo lãnh đạo kết hợp email phishing. Đội ngũ cần đào tạo, quy trình và phản ứng sự cố ra sao?", [
      ["9.1 Security awareness", [["9.1.1", "Đào tạo nhận thức", "Nhân viên cần hiểu deepfake là một rủi ro trong chuỗi tấn công."], ["9.1.2", "Quy trình xác minh", "Yêu cầu nhạy cảm cần quy trình phê duyệt và xác minh độc lập."]]],
      ["9.2 SOC và incident response", [["9.2.1", "SOC là gì", "SOC theo dõi, phân tích và phản ứng với tín hiệu rủi ro an ninh."], ["9.2.2", "Incident response", "Phản ứng sự cố là quy trình nhận diện, cô lập, xử lý và rút kinh nghiệm."]]],
    ], ["Hiểu security awareness trong tổ chức.", "Nhìn deepfake như một tín hiệu trong chuỗi tấn công.", "Kết nối SOC, GRC và quy trình xác minh danh tính."]),
  ]
};
