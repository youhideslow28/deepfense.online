import { BookOpen, ShieldCheck, Target, Award, Brain, Zap, AlertTriangle, Clock, CheckCircle2 } from 'lucide-react';

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
    explanation?: string;
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
    explanation?: string;
  }[];
  locked?: boolean;
}

const lesson = (id: string, title: string, paragraphs: string[], takeaways: string[]): Lesson => ({
  id, title, paragraphs, takeaways, type: 'interactive', duration: 5
});

const q = (text: string, options: string[], answer: number, explanation?: string) => ({ text, options, answer, explanation });

const checkpoint = (label: string, questions: any[]): Checkpoint => ({ label, questions });

export const basicsCourse = {
  title: "DEEPFENSE BASICS",
  credential: "DEEPFENSE AWARE",
  reward: "500 DPF coin",
  modules: [
    {
      id: 0,
      part: "foundation",
      title: "Một ngày bình thường trên không gian số",
      duration: "75 phút",
      level: "Foundation",
      scenario: "Một ngày của An bắt đầu rất bình thường: một video đầu tư có người nổi tiếng, một tin nhắn mượn tiền gấp, một hình ảnh nhạy cảm trong nhóm chat, rồi một cuộc gọi video giống người thân. Không tình huống nào tự nhận mình là deepfake. Tất cả đều chỉ yêu cầu An phản ứng thật nhanh.",
      outcomes: [
        "Hiểu vì sao deepfake không còn là chuyện xa lạ của người nổi tiếng hay phim ảnh.",
        "Nhận ra bất kỳ người dùng Internet nào cũng có thể gặp nội dung giả mạo, lừa đảo hoặc gây hiểu nhầm.",
        "Làm quen với cách học của DEEPFENSE BASIC: câu chuyện, quan sát, quyết định và phản hồi.",
        "Nắm quy trình Deepfense Check: Pause, Observe, Verify, Trace, Decide."
      ],
      sections: [
        {
          title: "0.1 Chào mừng và đặt vấn đề",
          lessons: [
            lesson("0.1.1", "Chào mừng đến với DEEPFENSE BASIC", [
              "Chào mừng bạn đến với DEEPFENSE BASIC. Đây là khóa học nền tảng về deepfake và phòng vệ trước nội dung giả mạo trên không gian số. Bạn không cần biết lập trình, không cần hiểu sâu về trí tuệ nhân tạo, cũng không cần là chuyên gia an toàn thông tin.",
              "Bạn chỉ cần là một người đang sống trong thế giới số: có điện thoại, dùng mạng xã hội, xem video ngắn, nhận tin nhắn, nghe cuộc gọi, tham gia nhóm chat và đôi khi tự hỏi: nội dung này có thật không?",
              "Trong khóa học này, chúng ta không học cách tạo deepfake. Chúng ta học cách nhận ra rủi ro, kiểm chứng thông tin, bảo vệ bản thân, bảo vệ người khác và ra quyết định bình tĩnh hơn trước những nội dung có thể đánh lừa mắt, tai và cảm xúc."
            ], [
              "Deepfake là vấn đề của niềm tin số, không chỉ là một video giả.",
              "Mục tiêu của khóa học là giúp bạn không hoảng sợ, không tin vội và không chia sẻ vội."
            ]),
            lesson("0.1.2", "Từ 'có hình là thật' đến thời đại cần kiểm chứng", [
              "Trước đây, nhiều người nghĩ: có hình thì chắc là thật. Sau đó, chúng ta học rằng ảnh có thể bị chỉnh sửa. Rồi video trở thành bằng chứng mạnh hơn: có video thì chắc khó mà giả.",
              "Bây giờ, hình ảnh, video và giọng nói đều có thể được tạo ra hoặc biến đổi bằng AI theo cách rất thuyết phục. Một gương mặt quen, một giọng nói đúng tông, một biểu cảm có vẻ tự nhiên vẫn chưa đủ để kết luận.",
              "Điều đó không có nghĩa là phải nghi ngờ mọi thứ. Nếu cái gì cũng bị xem là giả, chúng ta sẽ mệt mỏi và mất phương hướng. Điều cần học là cách nghi ngờ hợp lý: biết khi nào nên dừng lại, hỏi thêm và kiểm chứng."
            ], [
              "Không tin vội không có nghĩa là phủ nhận tất cả.",
              "Người an toàn là người biết kiểm chứng trước khi hành động."
            ]),
            lesson("0.1.3", "Một ngày của An", [
              "Buổi sáng, An thấy một video người nổi tiếng giới thiệu kênh đầu tư lợi nhuận cao. Gương mặt đúng là người đó. Giọng nói cũng giống. Video có nhiều lượt xem và bình luận ủng hộ.",
              "Đến trưa, An nhận tin nhắn từ một người bạn cũ nói cần mượn tiền gấp vì tài khoản ngân hàng bị khóa. Ảnh đại diện đúng là bạn của An, tài khoản cũng đúng tên, chỉ có cách nhắn hơi khác mọi ngày.",
              "Chiều hôm đó, trong nhóm chat xuất hiện một hình ảnh nhạy cảm được cho là của một học sinh trong trường. Có người nói đó là ảnh AI, có người lại bảo cứ lưu lại đã. Buổi tối, An nhận cuộc gọi video ngắn từ người thân nói đang gặp chuyện khẩn cấp. Hình hơi mờ, âm thanh không rõ, nhưng giọng nghe rất quen."
            ], [
              "Deepfake thường xuất hiện trong bối cảnh đời thường, không phải trong phòng thí nghiệm.",
              "Áp lực phải hành động ngay là tín hiệu cần chậm lại."
            ])
          ]
        },
        {
          title: "0.2 Vì sao khóa học này cần thiết?",
          lessons: [
            lesson("0.2.1", "Vì sao khóa học này cần thiết?", [
              "Deepfake nguy hiểm không chỉ vì nó giả. Nó nguy hiểm vì nó xuất hiện đúng lúc con người ít phòng bị nhất: khi lo cho người thân, sợ mất tiền, xấu hổ, giận dữ, muốn giúp ai đó hoặc tin rằng mình đang nhìn thấy bằng chứng.",
              "Deepfake cũng hiếm khi hoạt động một mình. Nó thường đi cùng tài khoản bị chiếm quyền, tin nhắn thúc ép, link giả mạo, website giả, danh tính giả và sự lan truyền quá nhanh trong nhóm chat.",
              "Vì vậy, học về deepfake không chỉ là học nhìn mặt méo, mắt lạ hay giọng đều đều. Học về deepfake là học cách tự hỏi: ai gửi nội dung này, họ muốn mình làm gì, vì sao phải làm ngay, nếu mình sai ai sẽ bị hại, và có cách nào kiểm chứng độc lập không?"
            ], [
              "Deepfake là rủi ro truyền thông, tâm lý, tài chính và danh tính.",
              "Câu hỏi đúng thường quan trọng hơn cảm giác 'trông thật hay trông giả'."
            ]),
            lesson("0.2.2", "Bạn sẽ học như thế nào?", [
              "Mỗi phần học thường bắt đầu bằng một tình huống giống đời thật. Sau đó bạn học khái niệm, quan sát dấu hiệu, chọn hành động và nhận phản hồi.",
              "Quiz trong khóa học không nhằm bắt lỗi bạn. Quiz giúp bạn kiểm tra xem mình đã hiểu đủ để dùng kiến thức trong đời thật chưa.",
              "Cuối khóa, hệ thống chọn 50 câu từ ngân hàng câu hỏi lớn hơn. Bạn cần đạt từ 70% trở lên, hoàn thành đánh giá khóa học và đủ tiến độ để mở certificate DEEPFENSE AWARE."
            ], [
              "Khóa học ưu tiên phản xạ an toàn, không học vẹt thuật ngữ.",
              "Hoàn thành khóa học nghĩa là biết dùng kiến thức trong tình huống thực tế."
            ])
          ]
        },
        {
          title: "0.3 Deepfense Check",
          lessons: [
            lesson("0.3.1", "Năm bước kiểm chứng cơ bản", [
              "DEEPFENSE BASIC dùng một quy trình ngắn gọi là Deepfense Check. Bạn chưa cần thuộc lòng mọi chi tiết, nhưng cần nhớ logic: đừng để cảm xúc quyết định thay bạn.",
              "Pause: dừng lại trước khi phản ứng. Observe: quan sát dấu hiệu kỹ thuật và ngữ cảnh. Verify: xác minh qua kênh độc lập. Trace: truy nguồn nội dung. Decide: ra quyết định ít gây hại nhất.",
              "Quy trình này không biến bạn thành chuyên gia pháp chứng. Nó giúp bạn có một khoảng dừng đủ tốt để tránh chuyển tiền, chia sẻ, kết luận hoặc làm tổn thương người khác khi chưa có bằng chứng."
            ], [
              "Pause, Observe, Verify, Trace, Decide là xương sống của khóa học.",
              "Một khoảng dừng đúng lúc có thể ngăn một thiệt hại lớn."
            ])
          ],
          checkpoint: checkpoint("0.3", [
            q("Mục tiêu chính của DEEPFENSE BASIC là gì?", ["Học cách tạo deepfake", "Học cách nhận diện và phòng vệ an toàn", "Học mẹo vượt detector", "Tăng lượt xem nội dung"], 1),
            q("Trong Deepfense Check, 'Verify' có nghĩa là gì?", ["Xác minh qua kênh độc lập", "Tin nếu video rõ nét", "Tải video về ngay", "Chia sẻ để hỏi cộng đồng"], 0)
          ])
        },
        {
          title: "0.4 Pre-check (Đánh giá ban đầu)",
          lessons: [
            lesson("0.4.1", "Tự đánh giá kiến thức nền tảng", [
              "Trước khi bắt đầu các module chuyên sâu, hãy cùng thực hiện một bài kiểm tra ngắn. Bài thi này không tính vào kết quả cuối khóa, nhưng sẽ giúp bạn nhận ra mình đang ở đâu trên bản đồ an toàn số.",
              "Bạn sẽ gặp 8 câu hỏi về các tình huống giả định. Hãy chọn đáp án mà bạn cho là an toàn nhất."
            ], [
              "Pre-check giúp bạn nhận diện các lỗ hổng kiến thức hiện có.",
              "Kết quả này là điểm mốc để so sánh sau khi hoàn thành khóa học."
            ])
          ],
          checkpoint: checkpoint("0.4", [
            q("Bạn nhận video gọi trực tiếp từ người thân nói đang bị tai nạn và cần tiền gấp. Hình ảnh hơi mờ, tiếng bị giật. Bạn làm gì?", ["Chuyển tiền ngay", "Hỏi tài khoản rồi chuyển", "Dừng cuộc gọi, gọi lại số điện thoại đã lưu", "Bấm vào link 'vị trí' họ gửi"], 2),
            q("Thấy video người nổi tiếng quảng cáo ứng dụng đầu tư 'chắc chắn sinh lời 100%', bạn nên làm gì?", ["Đăng ký ngay", "Nạp thử một ít", "Kiểm tra kênh chính thức của người đó", "Chia sẻ cho bạn bè"], 2),
            q("Một hình ảnh nhạy cảm nghi là của một người quen bị lan truyền trong nhóm. Bạn làm gì?", ["Lưu lại để làm bằng chứng", "Gửi cho người khác hỏi thật giả", "Không lan truyền và báo cáo nội dung", "Bình luận trêu đùa"], 2),
            q("Bạn nhận email từ 'Ngân hàng' yêu cầu đăng nhập qua link để 'xác minh tài khoản'. Bạn làm gì?", ["Bấm link đăng nhập ngay", "Tự mở ứng dụng ngân hàng hoặc gõ đúng địa chỉ web của ngân hàng", "Gửi mã OTP cho họ", "Cài ứng dụng đính kèm"], 1),
            q("Ai có thể là nạn nhân của Deepfake?", ["Chỉ người nổi tiếng", "Chỉ người giàu", "Bất kỳ ai sử dụng Internet", "Chỉ người không biết công nghệ"], 2),
            q("Deepfake có thể giả mạo những gì?", ["Hình ảnh và video", "Giọng nói", "Cả hình ảnh, video và giọng nói", "Chỉ văn bản"], 2),
            q("Dấu hiệu nào ĐÁNG NGHI nhất trong một yêu cầu chuyển tiền?", ["Người đó nói đang rất gấp và bảo đừng nói với ai", "Video có màu sắc đẹp", "Tin nhắn có dấu câu đúng", "Gửi vào buổi sáng"], 0),
            q("Khi một nội dung làm bạn rất giận hoặc rất sợ, bạn nên làm gì đầu tiên?", ["Chia sẻ để cảnh báo", "Bình luận phản đối", "Dừng lại 30 giây để kiểm chứng", "Tải video về máy"], 2)
          ])
        }
      ],
      quiz: [
        q("Khi nhận cuộc gọi giống người thân yêu cầu chuyển tiền gấp, bước an toàn nhất là gì?", ["Ngắt cuộc gọi và xác minh qua số/kênh đã biết trước", "Chuyển tiền ngay", "Gửi OTP để họ xử lý", "Hỏi số tài khoản rồi chuyển thử"], 0),
        q("Deepfense Check gồm các bước nào?", ["Pause, Observe, Verify, Trace, Decide", "Post, Like, Share, Comment", "Copy, Paste, Upload", "Scan, Delete, Ignore"], 0),
        q("Vì sao nội dung gây phẫn nộ cần được kiểm chứng kỹ?", ["Vì cảm xúc mạnh thường làm người xem phản ứng nhanh và chia sẻ vội", "Vì video gây phẫn nộ luôn giả", "Vì chỉ nội dung chính trị mới nguy hiểm", "Vì bình luận nhiều là bằng chứng thật"], 0),
        q("Deepfake có thể xuất hiện ở dạng nào?", ["Hình ảnh, video, giọng nói hoặc avatar", "Chỉ video", "Chỉ văn bản", "Chỉ ảnh tĩnh"], 0),
        q("Điều gì KHÔNG nên làm with hình ảnh nhạy cảm nghi bị AI tạo hoặc ghép?", ["Lưu và chuyển tiếp để hỏi ý kiến nhóm", "Không lan truyền", "Báo cáo nội dung", "Tìm người có trách nhiệm hỗ trợ"], 0)
      ]
    },
    {
      id: 1,
      part: "foundation",
      title: "Deepfake là gì?",
      duration: "80-90 phút",
      level: "Foundation",
      scenario: "Module 1 giúp bạn hiểu deepfake và các loại nội dung giả mạo khác. Bạn sẽ biết vì sao chúng ngày càng khó nhận ra và giới hạn của mắt thường là ở đâu.",
      outcomes: [
        "Phân biệt được Deepfake, Deepvoice, Synthetic Media và các loại nội dung chỉnh sửa.",
        "Hiểu 4 lý do khiến nội dung giả mạo ngày càng thuyết phục.",
        "Nhận diện được giới hạn của mắt thường và công cụ phát hiện AI.",
        "Biết cách phân loại rủi ro dựa trên mục đích và bối cảnh sử dụng."
      ],
      sections: [
        {
          title: "1.1 Deepfake và các 'họ hàng'",
          lessons: [
            lesson("1.1.1", "Khái niệm và phân loại", [
              "Deepfake là nội dung hình ảnh, video hoặc âm thanh được tạo ra hoặc chỉnh sửa bằng công nghệ số, thường có sử dụng AI, để khiến người xem tin rằng một người đã nói hoặc làm điều mà họ không thực sự nói hoặc làm. Deepfake không nhất thiết phải hoàn hảo mới nguy hiểm. Trong nhiều vụ lừa đảo, kẻ xấu chỉ cần tạo ra đủ giống trong vài giây, kết hợp với sự khẩn cấp, sợ hãi hoặc tin tưởng, để nạn nhân hành động trước khi kịp suy nghĩ.",
              "Synthetic media là nội dung được tạo ra hoàn toàn hoặc một phần bằng công nghệ số, đặc biệt là AI. Tất cả deepfake đều có thể được xem là một dạng synthetic hoặc manipulated media, nhưng không phải mọi synthetic media đều là deepfake. Ví dụ: Một bức tranh phong cảnh do AI tạo ra không phải deepfake. Nhưng một video giả mạo một người thật đang nói điều họ chưa từng nói thì có thể là deepfake.",
              "Deepvoice là dạng giả lập hoặc chỉnh sửa giọng nói bằng AI, khiến âm thanh nghe giống một người thật. Deepvoice đặc biệt nguy hiểm trong các tình huống có áp lực thời gian, ví dụ: 'Con đang bị tai nạn, chuyển tiền ngay', 'Anh là sếp đây, xử lý khoản này trước 3 giờ'. Một đoạn giọng nói ngắn không còn đủ để xác minh danh tính.",
              "Face swap là kỹ thuật thay khuôn mặt của một người vào hình ảnh hoặc video của người khác. Không nên đánh giá mức độ nghiêm trọng chỉ dựa trên câu 'đó chỉ là ảnh giả'. Một hình ảnh giả vẫn có thể gây tổn thương thật. Một người bị gán mặt vào nội dung nhạy cảm vẫn có thể bị ảnh hưởng danh dự, tâm lý, học tập, công việc và các mối quan hệ.",
              "Lip sync là kỹ thuật làm cho chuyển động môi trong video khớp với một đoạn âm thanh khác. Dấu hiệu có thể nghi ngờ: Khẩu hình không khớp hoàn toàn với âm thanh, cử động môi hơi cứng hoặc trễ, biểu cảm khuôn mặt không phù hợp với nội dung lời nói, âm thanh quá sạch hoặc quá đều so với môi trường xung quanh.",
              "Edited media là nội dung đã bị chỉnh sửa bằng các công cụ truyền thống hoặc công cụ AI. Ví dụ: Cắt một câu nói ra khỏi phần giải thích phía sau, ghép hai đoạn video từ hai thời điểm khác nhau để tạo cảm giác liên quan, thêm phụ đề sai, làm mờ hoặc che phần quan trọng.",
              "Repurposed media là nội dung thật nhưng bị đặt sai bối cảnh. Ví dụ: Một video lũ lụt ở nước khác từ nhiều năm trước được đăng lại như thể vừa xảy ra tại Việt Nam. Repurposed media nguy hiểm vì nó dùng 'chất liệu thật' để tạo ra kết luận sai.",
              "AI-generated image là hình ảnh do AI tạo ra từ mô tả, dữ liệu mẫu hoặc yêu cầu của người dùng. Khi nhìn một hình ảnh, đừng chỉ hỏi: 'Ảnh này có bị AI tạo không?' Hãy hỏi thêm: 'Ảnh này đang được dùng để khiến mình tin điều gì?' Một hình ảnh AI có thể vô hại nếu nó là minh họa rõ ràng. Nhưng cũng hình ảnh đó có thể nguy hiểm nếu nó được trình bày như bằng chứng thật."
            ], [
              "Deepfake thường mạo danh danh tính thật.",
              "Không phải mọi nội dung AI đều là deepfake.",
              "Nội dung thật bị đặt sai bối cảnh vẫn có thể gây lừa dối.",
              "Nghe giống không có nghĩa là đúng người.",
              "Nội dung thật đặt sai bối cảnh vẫn có thể dẫn đến niềm tin sai."
            ]),
            lesson("1.1.2", "Vì sao deepfake ngày càng khó nhận ra?", [
              "Công nghệ tốt hơn, chi phí thấp hơn: Trước đây, để tạo một video giả thuyết phục, người ta cần nhiều kỹ năng, thiết bị và thời gian. Bây giờ, nhiều công cụ AI đã làm cho việc tạo ảnh, giọng nói và video trở nên dễ tiếp cận hơn. Khi công cụ mạnh hơn và rẻ hơn, kỹ năng phòng vệ của người dùng cũng cần tốt hơn.",
              "Dữ liệu cá nhân của chúng ta quá dễ tìm: AI cần dữ liệu để mô phỏng. Trong đời sống số, nhiều người vô tình để lại rất nhiều dữ liệu: ảnh chân dung, video nói chuyện, livestream, story hằng ngày, giọng nói trong clip, thông tin gia đình, trường học, công việc. Khi dữ liệu cá nhân quá công khai, kẻ xấu có nhiều nguyên liệu hơn để tạo tài khoản giả, giả giọng nói, dựng kịch bản lừa đảo có vẻ rất riêng tư.",
              "Nội dung lan nhanh hơn khả năng kiểm chứng: Chỉ cần vài phút, một video có thể xuất hiện trong nhóm gia đình, nhóm lớp, nhóm công việc, trang cá nhân. Trong khi đó, kiểm chứng cần thời gian. Kẻ xấu hiểu điều đó và thường thêm vào các câu như: 'Chia sẻ ngay trước khi bị xóa', 'Cơ hội chỉ còn hôm nay', 'Ai không chia sẻ là vô cảm'.",
              "Mắt thường có giới hạn: Một video thật cũng có thể trông lạ vì mạng yếu, camera kém, ánh sáng xấu, video bị nén, người nói mệt hoặc căng thẳng. Ngược lại, một video giả có thể trông rất mượt. Nếu bạn chỉ dựa vào cảm giác 'trông thật' hoặc 'trông giả', bạn có thể bị sai theo cả hai hướng: tin nhầm nội dung giả, hoặc phủ nhận nhầm nội dung thật.",
              "Công cụ phát hiện cũng có giới hạn: Kết quả từ detector nên được xem là một tín hiệu, không phải kết luận cuối cùng. Nếu công cụ nói 'có thể là deepfake', bạn cần kiểm chứng thêm. Nếu công cụ nói 'không phát hiện deepfake', bạn vẫn cần kiểm chứng thêm nếu nội dung có rủi ro cao.",
              "Vấn đề không chỉ là thật hay giả: Trong thực tế, có nhiều trạng thái hơn: có bằng chứng tốt cho thấy nội dung là thật, có bằng chứng tốt cho thấy nội dung là giả, nội dung thật nhưng bị đặt sai bối cảnh, nội dung bị cắt ghép làm đổi nghĩa, nội dung có một phần thật một phần chưa rõ, chưa đủ dữ liệu để kết luận.",
              "Một rủi ro ngược - Liar's dividend: Deepfake không chỉ làm người ta tin vào điều giả. Nó còn có thể làm người ta nghi ngờ điều thật. Khi công chúng biết rằng video và âm thanh có thể bị giả, một người có thể phủ nhận nội dung thật bằng cách nói 'Đó là deepfake'. Mục tiêu là kiểm chứng tốt hơn, không phải nghi ngờ tất cả."
            ], [
              "Deepfake không chỉ dùng hình ảnh của bạn. Nó có thể dùng cả thói quen, quan hệ và thông tin bạn để lộ.",
              "Dữ liệu cá nhân của bạn là nguyên liệu của deepfake.",
              "Áp lực thời gian là đồng minh của kẻ lừa đảo.",
              "Trong thời đại deepfake, người an toàn không phải người đoán nhanh nhất. Người an toàn là người biết kiểm chứng trước khi hành động."
            ])
          ]
        },
        {
          title: "1.2 Thực hành: Phân loại nội dung",
          lessons: [
            lesson("1.2.1", "Tình huống thực tế", [
              "Bạn sẽ gặp 12 loại nội dung thường thấy trên mạng. Hãy thử phân loại chúng:",
              "1. Video người nổi tiếng kêu gọi đầu tư tài chính lạ.\n2. Ảnh chân dung chuyên gia không có thật trên mạng.\n3. Tin nhắn thoại gọng giống người thân mượn tiền.",
              "4. Clip 10 giây cắt từ bài phat biểu 1 tiếng làm đổi nghĩa.\n5. Video tai nạn cũ được chia sẻ như mới xảy ra.\n6. Ảnh minh họa AI ghi rõ 'đây là ảnh AI'.",
              "7. Video call bị lag, người gọi yêu cầu đọc OTP.\n8. Ảnh học sinh bị ghép mặt vào nội dung nhạy cảm.\n9. Video người thật nói thật nhưng phụ đề bị dịch sai hoàn toàn.\n10. Tài khoản mới dùng ảnh AI đẹp để kết bạn lừa đảo.\n11. Nhân vật ảo (Virtual Influencer) trò chuyện với fan.\n12. Clip sự kiện nóng không rõ nguồn gốc, gọng thuyết minh AI."
            ], [
              "Nhận diện đúng loại rủi ro giúp bạn chọn cách kiểm chứng đúng.",
              "Nội dung minh bạch (có ghi rõ AI) thường có rủi ro thấp nhất.",
              "Yêu cầu về tiền và OTP luôn là rủi ro cao nhất."
            ])
          ],
          checkpoint: checkpoint("1.1", [
            q("Deepfake là gì?", ["Mọi nội dung sai trên Internet", "Nội dung hình ảnh, video hoặc âm thanh được tạo/chỉnh sửa để khiến người xem tin một người đã nói hoặc làm điều họ không thực sự nói/làm", "Chỉ là ảnh chỉnh màu", "Chỉ là tin nhắn lừa đảo không có hình ảnh"], 1, "Deepfake thường liên quan đến việc mạo danh hoặc làm sai lệch hành động/lời nói của một người."),
            q("Điều nào sau đây là ví dụ về deepvoice?", ["Một ảnh phong cảnh do AI tạo", "Một đoạn giọng nói giả giống người thân yêu cầu chuyển tiền", "Một bài viết sai chính tả", "Một video thật được đăng lại từ năm trước"], 1, "Deepvoice liên quan đến giả lập hoặc chỉnh sửa giọng nói."),
            q("Repurposed media là gì?", ["Nội dung thật nhưng bị đặt sai bối cảnh", "Nội dung luôn do AI tạo ra", "Nội dung không có âm thanh", "Nội dung được đăng bởi tài khoản chính thức"], 0, "Nội dung có thể thật, nhưng chú thích, thời gian, địa điểm hoặc ý nghĩa đi kèm có thể sai."),
            q("Tất cả synthetic media đều là deepfake. Đúng hay sai?", ["Đúng", "Sai"], 1, "Synthetic media có thể dùng cho mục đích sáng tạo, giáo dục hoặc minh họa. Nó trở thành vấn đề khi bị dùng để mạo danh, đánh lừa hoặc gây hại."),
            q("Một video bị cắt ngắn làm thay đổi ý nghĩa câu nói ban đầu. Đây phù hợp nhất là:", ["Edited media", "Deepvoice", "Mã độc", "Mật khẩu yếu"], 0, "Cắt ghép hoặc biên tập gây hiểu nhầm là một dạng edited media."),
            q("Một hình ảnh người không tồn tại do AI tạo ra, được dùng làm ảnh đại diện cho tài khoản lừa đảo. Rủi ro chính là gì?", ["Ảnh quá đẹp", "Người xem có thể tin vào một danh tính giả", "Ảnh không có âm thanh", "Ảnh tải chậm"], 1, "Hình ảnh AI có thể được dùng để dựng hồ sơ hoặc danh tính giả."),
            q("Vì sao không nên kết luận 'video thật' chỉ vì gương mặt và giọng nói giống?", ["Vì gương mặt và giọng nói có thể bị tạo hoặc chỉnh sửa bằng AI", "Vì video nào trên mạng cũng giả", "Vì chỉ ảnh mới có thể bị giả", "Vì âm thanh luôn đáng tin hơn hình ảnh"], 0, "Deepfake và deepvoice có thể mạo phỏng cả khuôn mặt lẫn giọng nói."),
            q("Một video thật từ quốc gia khác được đăng với chú thích 'đang xảy ra tại thành phố của bạn'. Bạn nên nghi ngờ điều gì?", ["Sai bối cảnh", "Máy tính bị virus", "Mật khẩu bị lộ", "Điện thoại bị hỏng"], 0, "Đây là dấu hiệu của repurposed media."),
            q("Điều nào đúng nhất?", ["Deepfake chỉ nguy hiểm nếu hoàn hảo 100%", "Deepfake có thể nguy hiểm ngay cả khi chỉ đủ giống trong vài giây và đi kèm áp lực khẩn cấp", "Deepfake chỉ xuất hiện trong phim", "Người bình thường không bao giờ là mục tiêu của deepfake"], 1, "Trong lừa đảo, kẻ xấu thường kết hợp mạo danh với cảm xúc và thời gian gấp."),
            q("Câu hỏi nào hữu ích nhất khi xem một hình ảnh nghi do AI tạo?", ["Ảnh này có nhiều màu không?", "Ảnh này đang được dùng để khiến mình tin điều gì?", "Ảnh này có kích thước bao nhiêu?", "Ảnh này có được đăng buổi sáng không?"], 1, "Mục đích sử dụng và ngữ cảnh quyết định mức độ rủi ro của nội dung.")
          ])
        }
      ],
      quiz: [
        q("Deepfake là gì?", ["Mọi nội dung sai trên mạng", "Nội dung dùng AI để khiến người ta tin một người làm/nói điều họ không thực sự làm/nói", "Chỉ là ảnh chỉnh màu", "Một loại mã độc"], 1),
        q("Synthetic media là gì?", ["Nội dung được tạo hoàn toàn hoặc một phần bằng công nghệ số/AI", "Nội dung bắt buộc là lừa đảo", "Nội dung chỉ có văn bản", "Chỉ là ảnh chụp"], 0),
        q("Vì sao deepfake ngày càng thuyết phục?", ["Dữ liệu cá nhân công khai quá nhiều làm nguyên liệu", "Mọi video đều sắc nét", "Internet ngày càng chậm", "AI luôn thông minh hơn người"], 0),
        q("Nội dung thật nhưng chú thích sai địa điểm/thời gian là gì?", ["Deepvoice", "Edited media", "Repurposed media", "Metadata"], 2),
        q("Detector AI báo '80% khả năng là AI' có nghĩa là gì?", ["Chắc chắn giả", "Chắc chắn thật", "Một tín hiệu cần tham khảo cùng với nguồn và bối cảnh", "Nên chia sẻ ngay"], 2)
      ]
    },
    {
      id: 2,
      part: "foundation",
      title: "Vì sao con người dễ bị lừa?",
      duration: "85-95 phút",
      level: "Foundation",
      scenario: "Kẻ xấu không tấn công máy tính của bạn, chúng tấn công cảm xúc của bạn. Module này giúp bạn nhận diện các 'nút bấm' tâm lý trong lừa đảo.",
      outcomes: [
        "Nhận diện 4 nhóm cảm xúc bị lợi dụng: Khẩn cấp, Thân quen, Quyền lực, Lợi ích.",
        "Hiểu về hiệu ứng 'Thấy tận mắt' và giới hạn của nó.",
        "Phát hiện 6 dấu hiệu ngôn ngữ thao túng trong tin nhắn/cuộc gọi.",
        "Biết cách làm chủ cảm xúc khi đối diện với nội dung gây sốc."
      ],
      sections: [
        {
          title: "2.1 Bốn nút bấm cảm xúc",
          lessons: [
            lesson("2.1.1", "Khẩn cấp và Thân quen", [
              "Khẩn cấp: Tạo áp lực thời gian (Ngay bây giờ, Chỉ còn 5 phút, Gấp lắm...). Khi bạn vội, não bộ sẽ bỏ qua các bước kiểm chứng logic.",
              "Thân quen: Lợi dụng niềm tin của bạn vào người thân, bạn bè. Bạn thường hạ thấp cảnh giác khi thấy một gương mặt quen thuộc hoặc gọng nói giống người nhà."
            ], [
              "Càng vội vàng, càng dễ mắc sai lầm.",
              "Niềm tin cá nhân là 'lỗ hổng' mà deepfake khai thác triệt để."
            ]),
            lesson("2.1.2", "Quyền lực và Lợi ích", [
              "Quyền lực: Giả danh công an, bác sĩ, sếp, cán bộ ngân hàng... để đe dọa hoặc yêu cầu bạn làm điều sai quy trình.",
              "Lợi ích: Hứa hẹn quà tặng, lợi nhuận cao, học bổng... để đánh vào sự ham muốn hoặc hy vọng của bạn."
            ], [
              "Quy trình thật không bao giờ yêu cầu bạn bỏ qua các bước an toàn.",
              "Lời hứa 'quá tốt để là thật' thường là lừa đảo."
            ])
          ]
        },
        {
          title: "2.2 Ngôn ngữ thao túng",
          lessons: [
            lesson("2.2.1", "Dấu hiệu trong câu chữ", [
              "Kẻ lừa đảo thường dùng các cụm từ thiết kế sẵn:\n- 'Làm ngay': Áp lực.\n- 'Nếu không thì...': Đe dọa.\n- 'Chỉ mình bạn biết': Cô lập.",
              "- 'Chắc chắn 100%': Cam kết ảo.\n- 'Quá tốt để bỏ lỡ': Dụ dỗ.\n- 'Vì sự an toàn của bạn': Giả nhân nghĩa."
            ], [
              "Ngôn ngữ thao túng luôn hướng bạn đến hành động vội vàng.",
              "Nhận diện ngôn ngữ là bước quan trọng của Observe."
            ])
          ],
          checkpoint: checkpoint("2.1", [
            q("Kẻ xấu nói 'Đừng nói với ai, đây là bí mật' nhằm mục đích gì?", ["Bảo vệ bạn", "Cô lập bạn khỏi sự giúp đỡ và kiểm chứng", "Tạo sự bất ngờ", "Tuân thủ pháp luật"], 1),
            q("Cụm từ nào là dấu hiệu của sự đe dọa?", ["Bạn có thể suy nghĩ thêm", "Nếu không chuyển tiền, tài khoản sẽ bị khóa vĩnh viễn", "Hãy gọi lại khi rảnh", "Kiểm tra kỹ thông tin nhé"], 1)
          ])
        }
      ],
      quiz: [
        q("Vì sao deepfake kết hợp với Social Engineering lại nguy hiểm?", ["Vì nó đánh vào cả mắt, tai và cảm xúc của nạn nhân", "Vì nó làm video nét hơn", "Vì nó làm tăng dung lượng file", "Vì nó làm video có phụ đề"], 0),
        q("Khi nhận được tin nhắn mượn tiền từ người quen, điều đầu tiên nên làm là gì?", ["Chuyển ngay", "Dừng lại và xác minh qua kênh độc lập (như gọi điện trực tiếp)", "Gửi mã OTP cho họ", "Chia sẻ cho người khác"], 1),
        q("Nút bấm 'Quyền lực' thường đi kèm với cảm xúc nào?", ["Sợ hãi và phục tùng", "Vui vẻ", "Hào hứng", "Buồn bã"], 0),
        q("Liar's dividend là rủi ro gì?", ["Nội dung thật bị phủ nhận bằng cách gọi nó là deepfake", "Lợi nhuận từ việc nói dối", "Quà tặng từ AI", "Phí đăng ký khóa học"], 0),
        q("Mục tiêu của Module 2 là gì?", ["Dạy cách lừa người khác", "Giúp nhận diện các bẫy cảm xúc để phản ứng bình tĩnh hơn", "Dạy lập trình AI", "Dạy cách xóa ảnh trên mạng"], 1)
      ]
    },
    {
      id: 3,
      part: "foundation",
      title: "Nhìn, Nghe, Đọc: Dấu hiệu nghi vấn",
      duration: "100-110 phút",
      level: "Foundation",
      scenario: "Module 3 cung cấp cho bạn 'kính hiển vi' để soi các lỗi kỹ thuật và sự phi lý trong nội dung. Bạn sẽ học cách quan sát từ chi tiết đến bối cảnh tổng thể.",
      outcomes: [
        "Sử dụng Checklist 3 lớp: Hình ảnh - Âm thanh - Ngữ cảnh.",
        "Phát hiện lỗi kỹ thuật ở mắt, miệng, ánh sáng và vùng biên.",
        "Nhận diện dấu hiệu của Deepvoice và âm thanh AI.",
        "Biết cách đánh giá sự phù hợp của bối cảnh nội dung."
      ],
      sections: [
        {
          title: "3.1 Dấu hiệu Hình ảnh và Video",
          lessons: [
            lesson("3.1.1", "Soi lỗi khuôn mặt và chuyển động", [
              "Khuôn mặt: Da quá mịn, vùng rìa mặt bị nhòe hoặc rung khi người đó quay đầu nhanh.",
              "Mắt và Miệng: Nhịp nháy mắt không tự nhiên, ánh mắt không khớp hướng nhìn, răng bị mờ hoặc méo khi nói.",
              "Vật thể che mặt: Khi tay hoặc vật thể đi ngang qua mặt, khuôn mặt có thể bị biến dạng hoặc để lộ 'mặt thật' bên dưới trong khoảnh khắc."
            ], [
              "Tập trung vào những chi tiết AI khó xử lý: tóc, tai, kẽ răng và vùng biên.",
              "Lỗi kỹ thuật là tín hiệu, không phải kết luận duy nhất."
            ]),
            lesson("3.1.2", "Ánh sáng và Nền", [
              "Ánh sáng: Bóng trên mặt không khớp với nguồn sáng trong nền. Da mặt có độ sáng khác hẳn với cổ.",
              "Nền: Các đường thẳng (cạnh tường, bảng hiệu) bị méo, logo bị sai chính tả, hoặc vật thể ở nền thay đổi kỳ lạ khi video phát."
            ], [
              "Quan sát sự nhất quán giữa người và cảnh.",
              "Logo và chữ viết thường là điểm yếu của các mô hình AI tạo hình."
            ])
          ]
        },
        {
          title: "3.2 Dấu hiệu Âm thanh và Ngữ cảnh",
          lessons: [
            lesson("3.2.1", "Nghe ra Deepvoice", [
              "Giọng nói đều đều: Thiếu nhịp thở tự nhiên, thiếu cảm xúc hoặc các âm điệu đặc trưng của người đó.",
              "Phát âm lạ: Sai tên riêng, địa danh, hoặc có các âm thanh nhiễu kỹ thuật không giống tiếng ồn môi trường.",
              "Tiếng nền: Âm thanh nền quá sạch hoặc bị ngắt quãng đột ngột."
            ], [
              "Giọng nói giống không đủ để tin danh tính.",
              "Hỏi những câu hỏi bất ngờ để kiểm tra phản ứng của người gọi."
            ]),
            lesson("3.2.2", "Đánh giá Ngữ cảnh", [
              "Sự phù hợp: Nội dung có khớp với tính cách, thói quen và địa điểm thường thấy của người đó không?",
              "Nguồn gửi: Tài khoản gửi có dấu xác minh không? Có phải tài khoản bạn đã kết bạn từ lâu không?",
              "Hành động yêu cầu: Có yêu cầu tiền, OTP, mật khẩu, hay giữ bí mật không?"
            ], [
              "Ngữ cảnh rủi ro cao quan trọng hơn cả lỗi kỹ thuật.",
              "Bạn không cần chứng minh deepfake mới có quyền từ chối yêu cầu đáng nghi."
            ])
          ],
          checkpoint: checkpoint("3.1", [
            q("Dấu hiệu nào thường thấy ở mắt trong video deepfake?", ["Mắt chớp quá nhiều", "Nhịp nháy mắt không tự nhiên hoặc ánh mắt không khớp hướng đầu", "Mắt luôn nhắm", "Mắt có màu lạ"], 1),
            q("Điều gì ĐÁNG NGHI nhất trong một tin nhắn thoại?", ["Tiếng chim hót ở nền", "Giọng nói đều đều thiếu nhịp thở tự nhiên và yêu cầu tiền gấp", "Nói tiếng Việt chuẩn", "Nói nhanh"], 1)
          ])
        }
      ],
      quiz: [
        q("Bước đầu tiên khi xem một video gây sốc là gì?", ["Chia sẻ ngay", "Dừng lại và quan sát chậm hơn", "Kết luận là giả", "Tải về máy"], 1),
        q("Checklist 3 lớp quan sát gồm những gì?", ["Hình ảnh, Âm thanh, Ngữ cảnh", "Sáng, Trưa, Tối", "Tên, Tuổi, Địa chỉ", "Like, Share, Comment"], 0),
        q("Tại sao video thật cũng có thể trông giống deepfake?", ["Do mạng yếu, nén video hoặc dùng filter làm đẹp", "Vì AI luôn sao chép video thật", "Vì mọi video đều là AI", "Vì màn hình bị hỏng"], 0),
        q("Dấu hiệu nào thuộc lớp 'Ngữ cảnh'?", ["Mắt chớp lạ", "Yêu cầu chuyển tiền vào tài khoản lạ và giữ bí mật", "Giọng nói đều đều", "Nền bị méo"], 1),
        q("Mục tiêu của quan sát là để làm gì?", ["Để kết luận ngay thật giả", "Để thu thập tín hiệu xem có cần kiểm chứng thêm không", "Để tìm cách tạo video tương tự", "Để báo cáo mọi video"], 1)
      ]
    },
    {
      id: 4,
      part: "recognition",
      title: "Quy trình Deepfense Check",
      duration: "115-125 phút",
      level: "Recognition",
      scenario: "Dù video trông thật đến đâu, bạn vẫn cần một quy trình an toàn để ra quyết định. Deepfense Check là 5 bước bảo vệ bạn trước mọi nội dung nghi vấn.",
      outcomes: [
        "Thực hành thành thạo 5 bước: Pause - Observe - Verify - Trace - Decide.",
        "Biết cách sử dụng Kênh độc lập để xác minh thông tin.",
        "Sử dụng các công cụ kiểm chứng (Reverse search, Detector) đúng cách.",
        "Xây dựng thói quen 'kiểm tra trước khi tin'."
      ],
      sections: [
        {
          title: "4.1 Năm bước kiểm chứng",
          lessons: [
            lesson("4.1.1", "Pause và Observe", [
              "Pause: Dừng lại 30 giây. Đừng để cảm xúc (sợ, lo, hưng phấn) điều khiển ngón tay bạn.",
              "Observe: Sử dụng checklist 3 lớp đã học ở Module 3. Ghi nhận các tín hiệu nghi vấn về kỹ thuật và hành vi."
            ], [
              "Dừng lại là kỹ năng quan trọng nhất.",
              "Quan sát không chỉ là tìm lỗi, mà là thu thập dữ kiện."
            ]),
            lesson("4.1.2", "Verify và Trace", [
              "Verify: Xác minh qua KÊNH ĐỘC LẬP. Nếu người thân nhắn tin, hãy gọi vào số điện thoại bạn đã lưu. Nếu ngân hàng gọi, hãy tự mở app chính thức.",
              "Trace: Truy tìm nguồn gốc. Ai đăng đầu tiên? Video này có từ bao giờ? Có nguồn tin chính thống nào xác nhận không?"
            ], [
              "Kênh độc lập phải là kênh bạn đã biết và tin tưởng từ trước.",
              "Không dùng link hoặc số điện thoại mới được cung cấp trong chính tin nhắn nghi vấn."
            ]),
            lesson("4.1.3", "Decide", [
              "Decide: Ra quyết định. Có 3 hướng: 1. Tin và hành động (nếu đã xác minh 100%). 2. Không tin và bỏ qua. 3. Cảnh báo và báo cáo (nếu thấy dấu hiệu lừa đảo rõ ràng)."
            ], [
              "An toàn là ưu tiên số 1.",
              "Nếu không chắc chắn, hãy chọn phương án không hành động."
            ])
          ]
        },
        {
          title: "4.2 Công cụ hỗ trợ",
          lessons: [
            lesson("4.2.1", "Reverse Search và Detector", [
              "Reverse Image Search: Giúp tìm xem ảnh này đã từng xuất hiện ở đâu, có bị lấy từ một sự kiện cũ không.",
              "AI Detector: Công cụ giúp dự đoán khả năng can thiệp của AI. Lưu ý: Kết quả chỉ mang tính tham khảo, không phải phán quyết cuối cùng.",
              "Provenance (Content Credentials): Một số nội dung số hiện nay có đính kèm 'giấy khai sinh' ghi lại lịch sử tạo và chỉnh sửa."
            ], [
              "Công cụ hỗ trợ tư duy, không thay thế tư duy.",
              "Luôn kết hợp kết quả công cụ với phân tích bối cảnh."
            ])
          ],
          checkpoint: checkpoint("4.1", [
            q("Trong Deepfense Check, 'Verify' có nghĩa là gì?", ["Hỏi lại chính người gửi", "Xác minh qua một kênh độc lập mà bạn đã biết từ trước", "Tin vào cảm giác", "Chờ 1 ngày"], 1),
            q("Điều nào ĐÚNG về AI Detector?", ["Luôn chính xác 100%", "Chỉ là một tín hiệu tham khảo, có thể sai", "Dùng để thay thế mọi bước kiểm tra khác", "Chỉ dùng được cho ảnh"], 1)
          ])
        }
      ],
      quiz: [
        q("Thứ tự đúng của Deepfense Check là gì?", ["Pause, Observe, Verify, Trace, Decide", "Observe, Pause, Trace, Verify, Decide", "Verify, Trace, Observe, Pause, Decide", "Like, Share, Comment, Post"], 0),
        q("Kênh nào là KÊNH ĐỘC LẬP an toàn?", ["Link người lạ gửi", "Số điện thoại bạn đã lưu từ trước trong danh bạ", "Số điện thoại mới trong tin nhắn mượn tiền", "Phòng chat mà bạn vừa được mời vào"], 1),
        q("Tại sao cần Trace (Truy nguồn)?", ["Để biết video đẹp không", "Để tìm bối cảnh thực sự và nguồn gốc đầu tiên của nội dung", "Để tăng lượt xem", "Để tải video nhanh hơn"], 1),
        q("Khi nào bạn có thể bỏ qua bước Verify?", ["Khi video rất nét", "Khi người gửi nói đang rất gấp", "Khi bạn đã xác minh chắc chắn 100% qua kênh độc lập khác", "Không bao giờ"], 2),
        q("Quyết định an toàn nhất khi chưa chắc chắn là gì?", ["Cứ làm theo yêu cầu", "Không hành động, không chuyển tiền, không chia sẻ", "Hỏi ý kiến cộng đồng mạng", "Chia sẻ link để mọi người kiểm tra giúp"], 1)
      ]
    },
    {
      id: 5,
      part: "recognition",
      title: "Deepfake len lỏi vào mọi vấn đề số",
      duration: "125-135 phút",
      level: "Recognition",
      scenario: "Deepfake không đứng một mình. Nó len lỏi vào tài chính, danh dự, tin tức và các mối quan hệ xã hội. Module này giúp bạn ứng phó với các kịch bản thực tế.",
      outcomes: [
        "Nhận diện 5 kịch bản lừa đảo tài chính dùng Deepfake.",
        "Biết cách xử lý đúng khi gặp nội dung nhạy cảm hoặc mạo danh.",
        "Hiểu về rủi ro của tin giả và sai bối cảnh trong xã hội.",
        "Xây dựng phản xạ bảo vệ nạn nhân và cộng đồng số."
      ],
      sections: [
        {
          title: "5.1 Tài chính và Mạo danh",
          lessons: [
            lesson("5.1.1", "Kịch bản mượn tiền và giả danh sếp", [
              "Người thân cần tiền gấp: Video call mờ, tiếng giật, câu chuyện cảm động/khẩn cấp. Yêu cầu chuyển tiền vào tài khoản lạ.",
              "Giả danh sếp/lãnh đạo: Yêu cầu chuyển khoản gấp ngoài quy trình, yêu cầu giữ bí mật, dùng gọng nói/video giống sếp để tạo áp lực."
            ], [
              "Tiền đi là khó quay lại. Hãy chậm lại để xác minh.",
              "Quy trình chuyển tiền của công ty phải luôn được tôn trọng."
            ]),
            lesson("5.1.2", "Giả danh cơ quan chức năng và đầu tư", [
              "Công an/Tòa án giả: Gọi video call đe dọa, yêu cầu đọc OTP hoặc chuyển tiền 'để điều tra'.",
              "Người nổi tiếng quảng cáo đầu tư: Dùng deepfake để giả mạo người nổi tiếng hứa hẹn lợi nhuận cao. Mục tiêu là dụ bạn nạp tiền hoặc bấm vào link lừa đảo."
            ], [
              "Cơ quan chức năng không làm việc qua video call yêu cầu tiền/OTP.",
              "Lợi nhuận 'trên trời' thường đi kèm với bẫy lừa đảo."
            ])
          ]
        },
        {
          title: "5.2 Danh dự và Trách nhiệm xã hội",
          lessons: [
            lesson("5.2.1", "Xử lý nội dung nhạy cảm và mạo danh", [
              "Nếu thấy ảnh/video nhạy cảm nghi bị ghép: Không xem thêm, không lan truyền, báo cáo nền tảng và hỗ trợ nạn nhân.",
              "Nếu bị mạo danh: Thông báo cho bạn bè qua kênh chính thức, lưu bằng chứng và báo cáo tài khoản giả."
            ], [
              "Sự im lặng của cộng đồng trước cái xấu giúp nạn nhân bớt đau thương.",
              "Bảo vệ người khác cũng là bảo vệ chính mình."
            ]),
            lesson("5.2.2", "Tin giả và Trách nhiệm chia sẻ", [
              "Video gây phẫn nộ: Thường bị cắt gọt bối cảnh để định hướng dư luận. Hãy tìm bản đầy đủ.",
              "Trách nhiệm số: Trước khi nhấn 'Share', hãy tự hỏi: Nếu thông tin này sai, ai sẽ bị hại?"
            ], [
              "Cảm xúc mạnh là kẻ thù của sự thật.",
              "Chia sẻ có trách nhiệm là góp phần xây dựng mạng lưới an toàn."
            ])
          ],
          checkpoint: checkpoint("5.1", [
            q("Dấu hiệu đỏ mạnh nhất trong một cuộc gọi mượn tiền là gì?", ["Video bị lag", "Yêu cầu chuyển tiền vào một tài khoản không phải tên người thân và bảo giữ bí mật", "Nói chuyện lâu", "Chào hỏi thân mật"], 1),
            q("Liar's dividend gây hại gì?", ["Giúp kẻ xấu phủ nhận những sự thật hiển nhiên bằng cách gọi nó là deepfake", "Làm tăng giá trị đồng tiền", "Làm đẹp video", "Làm tăng tốc độ mạng"], 0)
          ])
        }
      ],
      quiz: [
        q("Ngân hàng yêu cầu đọc OTP qua video call để 'xác minh', bạn làm gì?", ["Đọc ngay", "Từ chối và tự gọi tổng đài chính thức của ngân hàng", "Gửi qua tin nhắn", "Cung cấp mật khẩu thay thế"], 1),
        q("Quy tắc vàng về tiền trong thời đại deepfake là gì?", ["Chuyển trước hỏi sau", "Không chuyển tiền/đọc OTP khi đang bị ép thời gian; luôn xác minh qua kênh độc lập", "Chỉ chuyển vào buổi sáng", "Tin vào mặt gọng giống"], 1),
        q("Nếu lỡ chuyển tiền cho kẻ lừa đảo, bạn nên làm gì sớm nhất?", ["Xóa hết dấu vết", "Liên hệ ngân hàng, lưu bằng chứng và báo cáo cơ quan chức năng", "Im lặng chờ may mắn", "Nạp thêm để lấy lại"], 1),
        q("Mục tiêu của kẻ xấu khi giả danh sếp là gì?", ["Ép bạn bỏ qua quy trình an toàn của tổ chức", "Để làm quen với bạn", "Để dạy bạn cách dùng AI", "Để kiểm tra tốc độ làm việc"], 0),
        q("Tại sao không nên chia sẻ video gây sốc khi chưa rõ nguồn?", ["Vì nó làm tốn băng thông", "Vì bạn có thể đang lan truyền tin giả hoặc gây hại cho nạn nhân", "Vì nó làm nặng máy", "Vì nó không có nhạc"], 1)
      ]
    },
    {
      id: 6,
      part: "response",
      title: "Phòng vệ cá nhân và cộng đồng",
      duration: "95-110 phút",
      level: "Response",
      scenario: "Sau 5 module, An nhận ra phòng vệ không chỉ là kỹ năng cá nhân, mà là thói quen cộng đồng. Hãy thiết lập 'lá chắn' cho bạn và những người thân yêu.",
      outcomes: [
        "Thiết lập được bộ quy tắc Deepfense Shield cho bản thân và gia đình.",
        "Biết cách vệ sinh dữ liệu cá nhân để giảm rủi ro bị mạo danh.",
        "Biết cách lưu bằng chứng và báo cáo sự cố đúng quy trình.",
        "Hoàn thành Capstone tổng hợp để đạt chứng chỉ."
      ],
      sections: [
        {
          title: "6.1 Bộ quy tắc Deepfense Shield",
          lessons: [
            lesson("6.1.1", "Năm lớp bảo vệ (Deepfense Shield)", [
              "1. Family Code: Có câu xác minh riêng cho gia đình.\n2. Money Delay: Trì hoãn bắt buộc trước mọi yêu cầu tiền bất thường.\n3. Two-Channel Rule: Xác minh qua ít nhất hai kênh độc lập.",
              "4. No Shame Reporting: Báo cáo sớm mà không làm nạn nhân xấu hổ.\n5. Evidence First: Ưu tiên lưu bằng chứng an toàn trước khi xóa/chặn."
            ], [
              "Phòng vệ tốt nhất là có quy tắc đã thống nhất trước.",
              "Gia đình là pháo đài đầu tiên chống lại lừa đảo."
            ]),
            lesson("6.1.2", "Vệ sinh dữ liệu cá nhân", [
              "Hạn chế công khai: Số điện thoại, địa chỉ, ảnh giấy tờ, lịch trình chi tiết, video riêng tư ghi rõ giọng nói.",
              "Cài đặt riêng tư: Giới hạn người xem bài viết, kiểm tra quyền ứng dụng, bật xác thực 2 lớp (2FA) cho mọi tài khoản."
            ], [
              "Bạn không cần xóa hết cuộc sống online, nhưng hãy đăng có chọn lọc.",
              "Tài khoản mạnh bảo vệ cả danh dự của bạn."
            ])
          ]
        },
        {
          title: "6.2 Capstone: Hồ sơ sự việc của An",
          lessons: [
            lesson("6.2.1", "Capstone: Phân tích tình huống tổng hợp", [
              "Tình huống: An nhận video người nổi tiếng đầu tư (link lạ), tin nhắn bạn cũ dụ dỗ (né gọi điện), ảnh chụp bình luận khen ngợi, tin nhắn thoại giọng giống.",
              "Nhiệm vụ: Phân loại rủi ro, chỉ ra các Red Flags, áp dụng Deepfense Check và đưa ra kết luận hành động.",
              "Gợi ý: Rủi ro CAO. Hành động: Không bấm link, không nạp tiền, xác minh qua kênh chính thức, báo cáo tài khoản giả."
            ], [
              "Khi nhiều tín hiệu nhỏ cùng chỉ về rủi ro, hãy tin vào quy trình an toàn.",
              "Không cần chứng minh deepfake 100% để bảo vệ tiền của mình."
            ])
          ],
          checkpoint: checkpoint("6.1", [
            q("Family Code nên dựa trên thông tin nào?", ["Ngày sinh", "Tên trường học", "Một cụm từ riêng tư, dễ nhớ với người nhà nhưng không có trên mạng", "Địa chỉ nhà"], 2),
            q("Trong Capstone, tín hiệu nào là Red Flag mạnh nhất?", ["Video có độ phân giải thấp", "Yêu cầu nạp tiền ngay hôm nay kèm link rút gọn và né xác minh trực tiếp", "Bạn cũ nhắn tin vào buổi tối", "Có nhiều bình luận khen"], 1)
          ])
        }
      ],
      quiz: [
        q("Family Code dùng để làm gì?", ["Xác minh danh tính trong tình huống khẩn cấp giữa những người tin cậy", "Để đăng lên Facebook", "Thay thế mật khẩu ngân hàng", "Tăng lượt xem"], 0),
        q("Money Delay nghĩa là gì?", ["Chuyển tiền càng nhanh càng tốt", "Trì hoãn bắt buộc để xác minh trước yêu cầu tiền bất thường", "Không bao giờ chuyển tiền cho ai", "Chỉ chuyển tiền vào ban đêm"], 1),
        q("Khi thấy bạn bè bị lừa, câu nói nào thể hiện tinh thần No Shame Reporting?", ["'Sao bạn dễ tin thế?'", "'Để mình cùng bạn lưu bằng chứng và báo cáo nhé, chuyện này ai cũng có thể gặp.'", "'Bạn thật ngốc.'", "'Đừng nói với ai nhé.'"], 1),
        q("Evidence First ưu tiên điều gì?", ["Lưu bằng chứng an toàn trước khi xóa, chặn hoặc tranh cãi", "Xóa hết tin nhắn ngay", "Đăng bằng chứng lên mọi nhóm", "Cãi nhau với kẻ lừa đảo"], 0),
        q("Phòng vệ tốt nhất bắt đầu từ đâu?", ["Từ khi sự cố xảy ra", "Từ quy tắc đã thống nhất trước và thói quen kiểm chứng", "Từ việc mua máy tính đắt tiền", "Từ việc không dùng Internet"], 1)
      ]
    },
    {
      id: 99,
      part: "final",
      title: "BÀI THI CUỐI KHÓA (FINAL EXAM)",
      duration: "45-60 phút",
      level: "Assessment",
      scenario: "Bài kiểm tra tổng hợp kiến thức từ Module 0 đến Module 6. Bạn cần đạt ít nhất 70% (35/50 câu đúng) để nhận chứng chỉ DEEPFENSE AWARE.",
      outcomes: [
        "Chứng minh khả năng nhận diện rủi ro Deepfake.",
        "Áp dụng thành thạo quy trình Deepfense Check.",
        "Mở khóa chứng chỉ và phần thưởng DPF.",
        "Trở thành một phần của cộng đồng phòng vệ số."
      ],
      sections: [],
      quiz: [
        q("Deepfake là gì?", ["Mọi nội dung sai trên mạng", "Nội dung dùng AI để khiến người ta tin một người làm/nói điều họ không thực sự làm/nói", "Chỉ là ảnh chỉnh màu", "Một loại mã độc"], 1, "Deepfake là nội dung giả mạo danh tính bằng AI."),
        q("Deepvoice là gì?", ["Giọng nói âm lượng lớn", "Giọng nói được giả lập/chỉnh sửa bằng AI để giống người thật", "Tin nhắn không âm thanh", "Video không mặt"], 1, "Deepvoice là giả mạo giọng nói bằng AI."),
        q("Synthetic media là gì?", ["Nội dung được tạo hoàn toàn hoặc một phần bằng công nghệ số/AI", "Nội dung bắt buộc là lừa đảo", "Nội dung chỉ có văn bản", "Chỉ là ảnh chụp"], 0, "Nội dung do AI tạo ra nói chung."),
        q("Tất cả synthetic media đều là deepfake. Đúng hay Sai?", ["Đúng", "Sai", "Chỉ đúng với video", "Chỉ đúng với ảnh"], 1, "Nhiều nội dung AI mang tính minh bạch, không mạo danh."),
        q("Video thật từ 5 năm trước bị đăng lại với chú thích 'vừa xảy ra' là gì?", ["Deepfake", "Repurposed media", "Edited media", "Deepvoice"], 1, "Nội dung thật nhưng bị đặt sai bối cảnh."),
        q("Cắt một đoạn ngắn từ bài phát biểu dài làm đổi nghĩa là gì?", ["Edited media", "Deepfake", "Metadata", "Family Code"], 0, "Chỉnh sửa nội dung gốc gây hiểu lầm."),
        q("Thay mặt người này vào ảnh người kia bằng AI gọi là gì?", ["Face swap / Deepfake image", "Metadata", "Edited media", "Reverse search"], 0, "Đây là một dạng phổ biến của deepfake hình ảnh."),
        q("Vì sao deepfake nguy hiểm kể cả khi không hoàn hảo?", ["Vì nó đánh vào cảm xúc và áp lực thời gian của nạn nhân", "Vì nó luôn nét", "Vì nó miễn phí", "Vì nó có nhạc"], 0, "Yếu tố tâm lý và ngữ cảnh làm tăng độ tin cậy."),
        q("Dữ liệu cá nhân công khai làm tăng rủi ro deepfake như thế nào?", ["Làm máy tính chạy chậm", "Cung cấp nguyên liệu để AI mô phỏng bạn chính xác hơn", "Làm video mờ đi", "Không có rủi ro"], 1, "Càng nhiều ảnh/video của bạn, AI càng dễ bắt chước."),
        q("Liar's dividend là rủi ro gì?", ["Giúp kẻ xấu phủ nhận sự thật bằng cách gọi nó là deepfake", "Lợi nhuận từ việc nói dối", "Quà tặng AI", "Phí đăng ký mạng"], 0, "Lợi dụng sự tồn tại của deepfake để gieo rắc sự nghi ngờ sự thật."),
        q("Khi nhận được yêu cầu tiền 'gấp' từ người thân, bước đầu tiên là gì?", ["Chuyển ngay", "Dừng lại và xác minh qua kênh độc lập (gọi điện số cũ)", "Gửi mã OTP", "Hỏi tài khoản"], 1, "Pause và Verify là quy trình an toàn."),
        q("'Money Delay' nghĩa là gì?", ["Chuyển tiền thật nhanh", "Trì hoãn bắt buộc để kiểm chứng các yêu cầu tiền bất thường", "Không bao giờ dùng tiền", "Chỉ dùng tiền mặt"], 1, "Khoảng dừng giúp bạn tránh hành động theo cảm xúc."),
        q("Nút bấm cảm xúc 'Khẩn cấp' khai thác điều gì?", ["Khả năng ghi nhớ", "Phản xạ bản năng bỏ qua logic khi bị ép thời gian", "Thị lực", "Lòng tốt"], 1, "Áp lực thời gian làm giảm khả năng kiểm chứng."),
        q("Vì sao kẻ xấu dặn bạn 'đừng nói với ai'?", ["Để bảo vệ bạn", "Để cô lập bạn khỏi sự giúp đỡ và kiểm chứng", "Để tạo bất ngờ", "Vi quy định ngân hàng"], 1, "Cô lập nạn nhân là kỹ thuật thao túng tâm lý."),
        q("'Thấy tận mắt' trên mạng hiện nay còn đủ tin cậy không?", ["Luôn đủ", "Không đủ, vì hình ảnh và video có thể bị AI tạo hoặc chỉnh sửa", "Chỉ đủ với video dài", "Chỉ đủ với người nổi tiếng"], 1, "Công nghệ AI đã làm thay đổi niềm tin vào hình ảnh."),
        q("Dấu hiệu kỹ thuật nào nghi là deepfake?", ["Rìa khuôn mặt bị nhòe khi quay đầu, nháy mắt lạ, răng bị mờ", "Màu áo xanh", "Video có phụ đề", "Âm thanh quá lớn"], 0, "Các lỗi pixel và chuyển động là tín hiệu nghi vấn."),
        q("Quan sát ánh sáng giúp phát hiện điều gì?", ["Màu sắc đẹp không", "Sự không nhất quán giữa mặt người và bối cảnh xung quanh", "Độ phân giải video", "Thời tiết"], 1, "Sự không đồng nhất về ánh sáng thường lộ dấu hiệu chỉnh sửa."),
        q("Checklist 3 lớp quan sát là gì?", ["Hình ảnh, Âm thanh, Ngữ cảnh", "Sáng, Trưa, Tối", "Tên, Tuổi, Địa chỉ", "Like, Share, Follow"], 0, "Phân tích đa chiều giúp đánh giá rủi ro tốt hơn."),
        q("Kênh độc lập an toàn là kênh nào?", ["Số điện thoại người lạ mới gọi", "Link trong email khẩn cấp", "Số điện thoại đã lưu từ lâu trong danh bạ của bạn", "Nhóm chat lạ"], 2, "Kênh độc lập phải là kênh tin cậy có từ trước."),
        q("Trace (Truy nguồn) giúp bạn biết điều gì?", ["Mật khẩu người gửi", "Nguồn gốc đầu tiên và bối cảnh thực sự của nội dung", "Video có bao nhiêu like", "Địa chỉ nhà nạn nhân"], 1, "Truy nguồn giúp phát hiện tin giả và nội dung sai bối cảnh."),
        q("Detector AI nên được dùng như thế nào?", ["Tín hiệu tham khảo, không phải phán quyết cuối cùng", "Phán quyết tuyệt đối", "Để bôi nhọ người khác", "Thay thế mọi bước kiểm chứng"], 0, "Detector có thể sai và cần kết hợp với tư duy con người."),
        q("Family Code là gì?", ["Mã vùng điện thoại", "Câu xác minh bí mật chỉ gia đình biết để dùng khi khẩn cấp", "Mã giảm giá mua sắm", "Số thứ tự thành viên"], 1, "Mật khẩu gia đình giúp xác minh nhanh trong video call/ghi âm."),
        q("Khi thấy video người nổi tiếng quảng cáo đầu tư 'lợi nhuận 100%', bạn nên làm gì?", ["Đăng ký ngay", "Kiểm tra kênh chính thức của họ, không bấm link lạ", "Nạp thử ít tiền", "Chia sẻ cho bạn bè"], 1, "Cẩn trọng với các lời hứa lợi ích bất thường."),
        q("Trách nhiệm của người chứng kiến khi thấy ảnh nhạy cảm phát tán?", ["Lưu lại xem", "Không lan truyền, báo cáo và hỗ trợ nạn nhân", "Gửi cho nhóm khác hỏi thật giả", "Bình luận trêu đùa"], 1, "Giảm hại là ưu tiên hàng đầu."),
        q("Tại sao không nên chia sẻ clip gây phẫn nộ khi chưa rõ nguồn?", ["Làm tốn pin", "Có thể đang tiếp tay cho tin giả hoặc kịch bản thao túng", "Làm video bị mờ", "Không có nhạc"], 1, "Cảm xúc phẫn nộ thường bị lợi dụng để lan truyền nội dung sai."),
        q("Mục tiêu cuối cùng của Deepfense Shield là gì?", ["Làm bạn sợ Internet", "Biến kiến thức thành thói quen phòng vệ an toàn cho bạn và cộng đồng", "Dạy tạo AI", "Tăng tốc độ mạng"], 1, "Xây dựng cộng đồng số an toàn."),
        q("Nội dung AI có ghi rõ 'đây là ảnh minh họa' được đánh giá rủi ro thế nào?", ["Rủi ro cao", "Rủi ro thấp vì tính minh bạch cao", "Luôn là lừa đảo", "Chắc chắn là thật"], 1, "Sự minh bạch làm giảm khả năng lừa dối."),
        q("Bạn nhận email từ ngân hàng yêu cầu đọc OTP để khóa thẻ. Bạn làm gì?", ["Đọc ngay", "Từ chối và tự gọi hotline ngân hàng hoặc dùng app chính thức", "Gửi qua SMS", "Gửi mật khẩu thay thế"], 1, "Xác minh qua kênh chính thức độc lập."),
        q("Nếu tài khoản mạng xã hội của bạn bị mạo danh, bạn nên làm gì?", ["Tranh cãi với nó", "Cảnh báo bạn bè qua kênh chính thức, lưu bằng chứng và báo cáo", "Im lặng", "Xóa tài khoản thật"], 1, "Thông báo rộng rãi để ngăn chặn lừa đảo bạn bè."),
        q("Chứng chỉ DEEPFENSE AWARE chứng nhận điều gì?", ["Bạn là lập trình viên AI", "Bạn đã nắm vững kiến thức nền tảng và có phản xạ phòng vệ deepfake", "Bạn có thể hack tài khoản", "Bạn đã đóng tiền học"], 1, "Xác nhận năng lực phòng vệ số cơ bản."),
        q("Lip sync (khớp lệnh miệng) AI thường gặp khó khăn nhất ở chi tiết nào?", ["Màu môi", "Răng bị mờ hoặc méo khi nói nhanh", "Độ dài của tóc", "Màu áo"], 1, "Chi tiết nhỏ bên trong miệng thường bị lỗi kỹ thuật."),
        q("Reverse image search đặc biệt hiệu ích để phát hiện loại nội dung nào?", ["Deepvoice", "Repurposed media (nội dung thật đăng sai bối cảnh)", "Tin nhắn văn bản", "Mật khẩu"], 1, "Tìm ra nguồn gốc và thời điểm xuất hiện đầu tiên của ảnh."),
        q("Câu nói nào là 'nút bấm' Thân quen?", ["'Mẹ ơi, con đang gặp nạn, đừng báo bố nhé.'", "'Chuyển tiền trong 2 phút.'", "'Đọc mã OTP cho tôi.'", "'Bạn trúng thưởng 1 tỷ.'"], 0, "Lợi dụng tình cảm gia đình để gây áp lực."),
        q("Cụm từ 'Chỉ mình bạn được nhận cơ hội này' thuộc nhóm nào?", ["Khẩn cấp", "Lợi ích và đánh vào cảm giác đặc biệt", "Quyền lực", "Thân quen"], 1, "Dùng lợi ích riêng biệt để dụ dỗ nạn nhân."),
        q("Tại sao không nên hỏi 'Có phải AI không?' trong cùng cuộc gọi đáng nghi?", ["Kẻ xấu có thể dùng AI trả lời rất thuyết phục để trấn an bạn", "Vì nó tốn tiền điện thoại", "Vì nó làm video nét hơn", "Vì quy định pháp luật"], 0, "Phải xác minh qua kênh hoàn toàn khác biệt."),
        q("Dấu hiệu nào nghi vấn về âm thanh?", ["Tiếng ồn môi trường tự nhiên", "Giọng nói đều đều thiếu nhịp thở và âm điệu cá nhân", "Nói tiếng Việt chuẩn", "Nói to rõ"], 1, "Âm thanh AI thường thiếu sự sống động tự nhiên."),
        q("Một video video call có hình ảnh người thân nhưng chỉ hiện 5 giây rồi tắt là dấu hiệu gì?", ["Mạng yếu bình thường", "Có thể là deepfake ngắn dùng để lừa bạn tin rồi chuyển sang nhắn tin", "Máy hết pin thật", "Người đó bận"], 1, "Kỹ thuật 'mồi nhử' để tạo niềm tin."),
        q("Provenance giúp gì cho việc kiểm chứng?", ["Lưu vết lịch sử tạo và chỉnh sửa của file", "Xóa deepfake tự động", "Tăng độ sáng ảnh", "Chọn filter đẹp"], 0, "Giúp truy tìm nguồn gốc kỹ thuật của nội dung."),
        q("Hành động 'No Shame Reporting' có ý nghĩa gì?", ["Nạn nhân báo cáo sớm mà không sợ bị mắng hay cười chê", "Không báo cáo vì sợ", "Báo cáo nặc danh", "Báo cáo sau 1 tháng"], 0, "Tạo môi trường hỗ trợ để xử lý sự cố nhanh nhất."),
        q("Evidence First yêu cầu bạn lưu những gì?", ["Link, ảnh chụp màn hình, số tài khoản, thời gian, tên tài khoản đăng", "Chỉ lưu link", "Chỉ nhớ trong đầu", "Chỉ lưu ảnh đại diện"], 0, "Cung cấp đầy đủ bằng chứng cho cơ quan chức năng/nền tảng."),
        q("Trong Deepfense Check, Decide dựa trên nguyên tắc nào?", ["Tin mọi video mượt", "Chọn hành động ít gây hại nhất cho bản thân và cộng đồng", "Chia sẻ trước rồi tính sau", "Làm theo đám đông"], 1, "Đánh giá tác động trước khi quyết định."),
        q("Cơ quan công an có yêu cầu chuyển tiền 'tạm giữ' qua điện thoại không?", ["Có, để bảo mật", "Không bao giờ", "Chỉ với số tiền lớn", "Chỉ với người ở xa"], 1, "Mọi yêu cầu tài chính từ 'công an' qua mạng đều là lừa đảo."),
        q("Tại sao cần vệ sinh dữ liệu cá nhân (Data Hygiene)?", ["Để máy tính sạch hơn", "Để giảm bớt 'nguyên liệu' mà AI có thể dùng để mạo danh bạn", "Để tăng lượt theo dõi", "Để tiết kiệm dung lượng"], 1, "Bảo vệ danh tính số ngay từ đầu."),
        q("2FA (Xác thực 2 lớp) giúp ích gì?", ["Làm video đẹp hơn", "Ngăn kẻ xấu chiếm quyền tài khoản kể cả khi họ có mật khẩu", "Tăng tốc độ tải trang", "Không có tác dụng"], 1, "Thêm một lớp bảo vệ vững chắc cho tài khoản."),
        q("Nếu video mượt nhưng gọng nói và ngữ cảnh đáng nghi, bạn tin vào đâu?", ["Tin hình ảnh", "Tin vào sự nghi ngờ từ ngữ cảnh và gọng nói (Verify ngay)", "Tin vào số lượt like", "Tin vào bình luận"], 1, "Sự mượt mà của hình ảnh không đảm bảo tính xác thực."),
        q("Mục tiêu của Capstone An là gì?", ["Dạy An cách kiếm tiền", "Tổng hợp toàn bộ kỹ năng để xử lý một tình huống đa diện như đời thật", "Dạy An cách dùng TikTok", "Dạy An cách mua sắm"], 1, "Thực hành phản xạ phòng vệ tổng hợp."),
        q("Nội dung deepfake nào gây tổn hại danh dự nhất hiện nay?", ["Deepfake mạo danh kêu gọi từ thiện", "Deepfake khiêu dâm/nhạy cảm mạo danh (NCII)", "Deepfake đọc truyện", "Deepfake chơi game"], 1, "Gây ảnh hưởng nghiêm trọng đến tâm lý và đời sống nạn nhân."),
        q("Khi thấy lỗi ở răng hoặc tóc trong video, bạn kết luận gì?", ["Giả 100%", "Là một tín hiệu nghi vấn mạnh, cần kiểm chứng bối cảnh và nguồn", "Thật 100%", "Video bị lỗi mạng"], 1, "Dấu hiệu kỹ thuật cần đi kèm với phân tích ngữ cảnh."),
        q("Tại sao 'Pause' 30 giây lại quan trọng?", ["Để chờ máy nguội", "Để nhường chỗ cho lý trí thay vì hành động theo cảm xúc vội vàng", "Để tăng lượt xem", "Để người gửi chờ lâu"], 1, "Khoảng dừng giúp kích hoạt tư duy phản biện."),
        q("Khóa học DEEPFENSE BASIC dành cho ai?", ["Chỉ lập trình viên", "Bất kỳ người dùng Internet nào muốn bảo vệ mình trên không gian số", "Chỉ người già", "Chỉ trẻ em"], 1, "Kỹ năng an toàn số là cần thiết cho tất cả mọi người.")
      ]
    }
  ]
};
