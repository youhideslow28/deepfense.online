// ── HELPERS ────────────────────────────────────────────────────
export const lesson = (id, title, paragraphs, takeaways) => ({ id, title, paragraphs, takeaways });
export const q = (text, options, answer) => ({ text, options, answer });
export const checkpoint = (label, questions, miniGame) => ({ label, questions, ...(miniGame ? { miniGame } : {}) });

// ── COURSE META ─────────────────────────────────────────────────
export const COURSE = {
  title: 'DEEPFENSE BASICS',
  subtitle: 'Nhận diện & phòng ngừa deepfake',
  totalModules: 7,
};

// ── MODULES ─────────────────────────────────────────────────────
export const MODULES = [
  // ── MODULE 0 ─────────────────────────────────────────────────
  {
    id: 0, part: 'intro',
    title: 'Một ngày bình thường trên không gian số',
    duration: '25-30 phút', level: 'Intro',
    introVideo: {
      src: '/academy/media/module-intros/module-0/module%200.web.mp4',
    },
    scenario: 'An trải qua một ngày bình thường: thấy video đầu tư của người nổi tiếng, nhận tin nhắn mượn tiền từ bạn cũ, thấy ảnh nhạy cảm trong nhóm chat, nhận cuộc gọi giống người thân, rồi thấy clip gây phẫn nộ trước khi ngủ. Nếu là An, bạn sẽ làm gì?',
    outcomes: [
      'Hiểu vì sao deepfake không còn là chuyện xa lạ của người nổi tiếng hay phim ảnh.',
      'Nhận ra rằng bất kỳ người dùng Internet nào cũng có thể gặp nội dung giả mạo, lừa đảo hoặc gây hiểu nhầm.',
      'Làm quen với cách học của DEEPFENSE BASIC: qua câu chuyện, tình huống, quan sát, quyết định và phản hồi.',
      'Tự kiểm tra phản xạ ban đầu của mình trước các tình huống nghi vấn trên không gian số.',
    ],
    sections: [
      {
        title: '0.0 Bắt đầu khóa học',
        lessons: [
          lesson('0.0.0', 'Khóa học này dạy điều gì?', [
            'DEEPFENSE BASIC là khóa học nhập môn về deepfake, nội dung giả mạo và phản xạ an toàn trên không gian số. Khóa học không yêu cầu người học biết lập trình, không yêu cầu nền tảng trí tuệ nhân tạo và không biến người học thành chuyên gia pháp chứng số.',
            'Mục tiêu thực tế hơn: giúp người học nhận ra khi nào một nội dung có thể gây rủi ro, biết dừng lại trước khi hành động, biết kiểm chứng qua kênh độc lập và biết chọn phản ứng ít gây hại nhất.',
            { type: 'callout', variant: 'info', title: 'Phạm vi học tập', text: 'Chúng ta không học cách tạo deepfake. Chúng ta học cách nhận diện rủi ro, kiểm chứng thông tin và bảo vệ con người trước nội dung giả mạo.' },
            'Trong đời sống số, nguy cơ không chỉ đến từ video giả hoàn hảo. Nguy cơ thường đến từ một tình huống có vẻ quen thuộc: người thân cần tiền gấp, tài khoản bạn bè nhắn tin lạ, một video gây phẫn nộ lan rất nhanh, hoặc một hình ảnh nhạy cảm bị chia sẻ trong nhóm chat.',
          ], [
            'DEEPFENSE BASIC tập trung vào phản xạ phòng vệ, không dạy tạo deepfake.',
            'Người học cần biết dừng, kiểm chứng và quyết định an toàn hơn.',
          ]),
        ],
        checkpoint: null,
      },
      {
        title: '0.1 Một ngày bình thường của An',
        lessons: [
          lesson('0.1.0', 'Khi rủi ro xuất hiện trong việc rất quen', [
            'Nhân vật An trong khóa học không phải chuyên gia công nghệ. An là một người dùng Internet bình thường: dùng mạng xã hội, xem video ngắn, nhắn tin với bạn bè, có tài khoản ngân hàng và có người thân để lo lắng.',
            'Trong một ngày, An gặp nhiều tình huống tưởng như rời rạc nhưng có cùng một điểm chung: tất cả đều yêu cầu An tin nhanh, chia sẻ nhanh hoặc hành động nhanh.',
            { type: 'table', caption: 'Năm tình huống mở đầu', headers: ['Tình huống', 'Câu hỏi cần đặt ra'], rows: [
              ['Video người nổi tiếng giới thiệu đầu tư', 'Video có đến từ kênh chính thức không? Có ai đang mạo danh uy tín không?'],
              ['Bạn cũ nhắn mượn tiền gấp', 'Tài khoản này còn do đúng người đó kiểm soát không?'],
              ['Hình ảnh nhạy cảm trong nhóm chat', 'Dù thật hay giả, việc lan truyền có gây hại cho người trong ảnh không?'],
              ['Cuộc gọi video từ người thân', 'Có cần xác minh lại bằng số đã lưu không?'],
              ['Clip gây phẫn nộ kêu gọi chia sẻ', 'Nguồn gốc, thời gian và bối cảnh đã được kiểm chứng chưa?'],
            ] },
            'Điểm cần học không phải là đoán ngay nội dung thật hay giả. Điểm cần học là nhận ra thời điểm phải chậm lại. Khi một nội dung làm ta sợ, giận, thương, xấu hổ hoặc muốn hành động ngay, đó là lúc năng lực kiểm chứng dễ bị suy yếu.',
          ], [
            'Rủi ro deepfake thường xuất hiện trong những tình huống rất đời thường.',
            'Cảm xúc mạnh là tín hiệu cần dừng lại, không phải lý do để hành động ngay.',
          ]),
        ],
        checkpoint: null,
      },
      {
        title: '0.2 Quy trình Deepfense Check',
        lessons: [
          lesson('0.2.0', 'Một quy trình đơn giản để không phản ứng vội', [
            'Khi gặp nội dung nghi vấn, người học không cần bắt đầu bằng câu hỏi kỹ thuật phức tạp. Hãy bắt đầu bằng một quy trình ngắn, có thể lặp lại trong đời sống.',
            { type: 'table', caption: 'Deepfense Check', headers: ['Bước', 'Mục đích'], rows: [
              ['Pause', 'Dừng lại trước khi chuyển tiền, chia sẻ, kết luận hoặc gửi thông tin nhạy cảm.'],
              ['Observe', 'Quan sát dấu hiệu trong nội dung và trong bối cảnh: ai gửi, yêu cầu gì, vì sao gấp.'],
              ['Verify', 'Xác minh qua kênh độc lập, không phụ thuộc vào nguồn đang gây áp lực.'],
              ['Trace', 'Tìm nguồn gốc nội dung, bản gốc, thời gian, nơi đăng đầu tiên hoặc kênh chính thức.'],
              ['Decide', 'Chọn hành động ít gây hại nhất: từ chối, báo cáo, hỏi thêm, hoặc không lan truyền.'],
            ] },
            'Quy trình này không đảm bảo bạn luôn biết chắc thật hay giả. Nhưng nó giúp bạn tránh hành động nguy hiểm khi chưa đủ dữ liệu. Trong an toàn số, không hành động vội thường là một quyết định có giá trị.',
            { type: 'callout', variant: 'quote', title: 'Câu cần nhớ', text: 'Khi nội dung khiến tôi muốn hành động ngay, tôi cần dừng lại và kiểm chứng trước.' },
          ], [
            'Deepfense Check gồm Pause, Observe, Verify, Trace, Decide.',
            'Mục tiêu là tránh hành động rủi ro khi chưa đủ dữ liệu.',
          ]),
        ],
        checkpoint: null,
      },
      {
        title: '0.3 Pre-check: phản xạ ban đầu',
        lessons: [
          lesson('0.3.0', 'Tự kiểm tra trước khi học sâu', [
            'Pre-check giúp người học nhìn thấy phản xạ ban đầu của mình trước các tình huống nghi vấn. Đây không phải bài thi để đánh giá năng lực, cũng không ảnh hưởng đến chứng chỉ cuối khóa.',
            'Mục tiêu là tạo một điểm xuất phát trung thực: khi gặp cuộc gọi giống người thân, video đầu tư có vẻ thật, hình ảnh nhạy cảm hoặc clip gây phẫn nộ, người học thường phản ứng theo hướng nào?',
            { type: 'callout', variant: 'tip', title: 'Cách làm', text: 'Hãy trả lời theo phản xạ thật của bạn, không cần chọn câu trả lời “đẹp”. Khóa học có giá trị nhất khi bạn biết mình đang bắt đầu từ đâu.' },
          ], [
            'Pre-check không tính vào chứng chỉ.',
            'Mục tiêu là nhận diện phản xạ ban đầu trước khi học quy trình phòng vệ.',
          ]),
        ],
        checkpoint: checkpoint('0.3', [
          q('Bạn nhận cuộc gọi video từ người thân, giọng khá giống và yêu cầu chuyển tiền trong 5 phút. Việc nên làm trước tiên là gì?', ['Chuyển tiền ngay vì có thể họ đang nguy hiểm', 'Hỏi số tài khoản rồi chuyển một khoản nhỏ', 'Kết thúc cuộc gọi và gọi lại bằng số đã lưu từ trước', 'Gửi OTP để người đó tự xử lý'], 2),
          q('Bạn thấy video người nổi tiếng kêu gọi đầu tư, cam kết lợi nhuận cao mỗi ngày. Cách đánh giá an toàn nhất là gì?', ['Tin vì video nhìn thật', 'Kiểm tra kênh chính thức và không bấm link lạ', 'Đọc bình luận để quyết định', 'Chia sẻ cho nhiều người cùng xem'], 1),
          q('Trong nhóm chat xuất hiện hình ảnh nhạy cảm của một người khác. Bạn nên làm gì?', ['Không lan truyền, báo cáo và tìm người có trách nhiệm hỗ trợ', 'Lưu lại để phân tích', 'Gửi cho bạn thân để hỏi thật giả', 'Bình luận đùa nếu nghĩ là ảnh AI'], 0),
          q('Một clip gây phẫn nộ kêu gọi chia sẻ ngay. Bước an toàn là gì?', ['Chia sẻ ngay để cảnh báo', 'Tìm nguồn gốc, bối cảnh và nguồn độc lập trước khi chia sẻ', 'Tải về đăng lại', 'Bình luận mạnh để tăng cảnh báo'], 1),
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
    introVideo: {
      src: '/academy/media/module-intros/module-01/module%201.web.mp4',
    },
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
        title: '1.0 Từ hiện tượng đến khái niệm',
        lessons: [
          lesson('1.0.0', 'Khi hình ảnh không còn là bằng chứng tuyệt đối', [
            'Module 1 bắt đầu từ một tình huống quen thuộc: An nhìn thấy video một người nổi tiếng giới thiệu nền tảng đầu tư. Gương mặt giống, giọng nói giống, khẩu hình có vẻ khớp và bên dưới có nhiều bình luận tích cực.',
            'Nếu đây là mười năm trước, nhiều người có thể nghĩ: “Có video thì chắc là thật”. Nhưng trong môi trường số hiện nay, hình ảnh, giọng nói và ngữ cảnh đều có thể bị tạo mới, chỉnh sửa hoặc đặt sai bối cảnh.',
            { type: 'callout', variant: 'info', title: 'Mục tiêu của Module 1', text: 'Hiểu các loại nội dung giả mạo cơ bản để biết nên kiểm chứng theo hướng nào, thay vì chỉ dựa vào cảm giác.' },
            'Module này không yêu cầu người học phân tích kỹ thuật sâu. Điều cần nắm là ngôn ngữ cơ bản: deepfake, deepvoice, synthetic media, face swap, lip sync, edited media và repurposed media.',
          ], [
            'Hình ảnh và giọng nói không còn là bằng chứng tuyệt đối.',
            'Module 1 cung cấp từ vựng nền tảng để quan sát và kiểm chứng đúng hướng.',
          ]),
        ],
        checkpoint: null,
      },
      {
        title: '1.1 Các khái niệm nền tảng',
        lessons: [
          lesson('1.1.0', 'Deepfake là gì?', [
            'Deepfake là nội dung hình ảnh, video hoặc âm thanh được tạo ra hoặc chỉnh sửa bằng công nghệ số, thường có sử dụng AI, để khiến người xem tin rằng một người đã nói hoặc làm điều họ không thực sự nói hoặc làm.',
            'Điểm cốt lõi của deepfake không nằm ở việc “có dùng AI hay không” theo nghĩa kỹ thuật hẹp. Điểm cốt lõi là sự mạo danh: nội dung khiến người xem gán lời nói, hành động hoặc hình ảnh cho một người thật.',
            { type: 'table', caption: 'Nhận diện khái niệm', headers: ['Không phải trọng tâm', 'Trọng tâm cần nhớ'], rows: [
              ['Video có đẹp hay không', 'Người thật có bị làm như đã nói hoặc làm điều đó không'],
              ['Công cụ tạo ra tên gì', 'Nội dung có mạo danh hoặc gây hiểu sai về người thật không'],
              ['Có lỗi kỹ thuật rõ không', 'Nội dung đang thúc người xem tin hoặc làm gì'],
            ] },
          ], [
            'Deepfake là nội dung mạo danh người thật bằng hình ảnh, video hoặc âm thanh.',
            'Câu hỏi quan trọng: người này có thật sự nói hoặc làm điều đó không?',
          ]),
          lesson('1.1.1', 'Synthetic media và deepvoice', [
            'Synthetic media là nội dung được tạo hoặc biến đổi bằng công nghệ số. Nó có thể phục vụ mục đích hợp pháp như giáo dục, phim ảnh, mô phỏng, dịch thuật hoặc hỗ trợ giao tiếp. Vì vậy, không phải mọi synthetic media đều xấu.',
            'Deepvoice là một trường hợp rủi ro hơn: giọng nói của người thật bị mô phỏng, nhân bản hoặc chỉnh sửa để khiến người nghe tin rằng người đó đang nói. Deepvoice đặc biệt nguy hiểm trong cuộc gọi điện thoại vì người nghe không có hình ảnh để đối chiếu.',
            { type: 'callout', variant: 'warning', title: 'Câu cần nhớ', text: 'Nghe giống không có nghĩa là đúng người. Với yêu cầu tiền, OTP hoặc thông tin nhạy cảm, hãy gọi lại bằng số đã lưu trước đó.' },
            'Khi gặp một bản ghi âm hoặc cuộc gọi giống người quen, việc quan trọng không phải là đoán giọng có giả hay không. Việc quan trọng là xác minh yêu cầu qua kênh độc lập.',
          ], [
            'Synthetic media không mặc định xấu; rủi ro nằm ở minh bạch, ngữ cảnh và mạo danh.',
            'Deepvoice nguy hiểm vì có thể đánh vào niềm tin qua giọng nói quen thuộc.',
          ]),
          lesson('1.1.2', 'Face swap và lip sync', [
            'Face swap là kỹ thuật thay hoặc ghép khuôn mặt của một người vào ảnh/video khác. Lip sync là kỹ thuật làm khẩu hình có vẻ khớp với lời nói hoặc âm thanh mới. Hai kỹ thuật này có thể xuất hiện riêng hoặc kết hợp trong một video giả mạo.',
            'Người học không nên chỉ tìm lỗi như mặt méo, ánh sáng lạ hay khẩu hình lệch. Những dấu hiệu đó có ích, nhưng không ổn định. Công nghệ tốt hơn có thể làm các lỗi này khó thấy hơn, còn video thật đôi khi cũng có ánh sáng xấu hoặc âm thanh lệch do nén, mạng yếu, quay lại màn hình.',
            { type: 'table', caption: 'Cách quan sát thận trọng', headers: ['Dấu hiệu kỹ thuật', 'Câu hỏi bối cảnh'], rows: [
              ['Khẩu hình lệch, hình mờ, ánh sáng lạ', 'Video đến từ nguồn nào? Có bản gốc không?'],
              ['Gương mặt hơi cứng hoặc chuyển động bất thường', 'Nội dung yêu cầu người xem làm gì?'],
              ['Âm thanh không khớp hình', 'Có kênh chính thức xác nhận không?'],
            ] },
          ], [
            'Face swap và lip sync có thể tạo cảm giác người thật đang xuất hiện hoặc nói điều họ chưa nói.',
            'Dấu hiệu kỹ thuật cần đi cùng kiểm chứng bối cảnh.',
          ]),
          lesson('1.1.3', 'Edited media và repurposed media', [
            'Không phải nội dung gây hiểu sai nào cũng là deepfake. Edited media là nội dung thật bị cắt, ghép, chỉnh sửa hoặc thêm phụ đề theo cách làm thay đổi ý nghĩa. Repurposed media là nội dung thật nhưng bị đặt sai bối cảnh về thời gian, địa điểm hoặc sự kiện.',
            'Hai dạng này rất quan trọng vì chúng thường thuyết phục hơn deepfake. Người xem nhìn thấy một phần nội dung thật, nên dễ tin toàn bộ câu chuyện đi kèm. Một video tai nạn cũ có thể được đăng như vừa xảy ra hôm nay. Một câu nói dài có thể bị cắt còn bảy giây để làm người nói có vẻ nói ngược ý ban đầu.',
            { type: 'comparison', title: 'Ba dạng dễ nhầm', left: { label: 'Nội dung giả hoặc bị tạo', color: '#ef4444', items: ['Deepfake', 'Deepvoice', 'AI-generated image dùng để tạo danh tính giả'] }, right: { label: 'Nội dung thật nhưng gây hiểu sai', color: '#0ea5e9', items: ['Edited media', 'Repurposed media', 'Video thật bị chú thích sai'] } },
            'Điểm cần nhớ: xác minh không chỉ là hỏi “có phải AI không?”. Nhiều khi câu hỏi đúng hơn là: nội dung này có đang kể đúng câu chuyện về thời gian, địa điểm và người liên quan không?',
          ], [
            'Edited media làm đổi nghĩa bằng chỉnh sửa; repurposed media làm sai nghĩa bằng bối cảnh.',
            'Nội dung thật vẫn có thể gây hiểu sai nghiêm trọng.',
          ]),
          lesson('1.1.4', 'Công cụ phát hiện và giới hạn của chúng', [
            'Các công cụ phát hiện deepfake có thể hỗ trợ, nhưng không nên được xem như phán quyết cuối cùng. Kết quả của công cụ phụ thuộc vào dữ liệu huấn luyện, loại nội dung đầu vào, chất lượng file, mức nén và kỹ thuật tạo giả mới nhất.',
            'Một công cụ báo “có khả năng deepfake” không tự động chứng minh nội dung giả. Ngược lại, công cụ không phát hiện bất thường cũng không chứng minh nội dung thật. Công cụ là một tín hiệu trong quá trình đánh giá, không thay thế kiểm chứng nguồn.',
            { type: 'table', caption: 'Cách dùng công cụ hợp lý', headers: ['Không nên', 'Nên'], rows: [
              ['Dựa hoàn toàn vào một kết quả phần trăm', 'Dùng như một tín hiệu tham khảo'],
              ['Bỏ qua nguồn gốc video', 'Kiểm tra kênh chính thức, bản gốc và nguồn độc lập'],
              ['Kết luận ngay sau khi công cụ báo kết quả', 'Tổng hợp nhiều dấu hiệu trước khi quyết định'],
            ] },
          ], [
            'Detector hữu ích nhưng không tuyệt đối.',
            'Kết quả công cụ phải được đặt cạnh nguồn gốc, bối cảnh và kênh xác minh.',
          ]),
          lesson('1.1.5', 'Khi chưa đủ dữ liệu', [
            'Trong môi trường số, một câu trả lời trưởng thành là: “Tôi chưa đủ dữ liệu để kết luận”. Câu này giúp tránh hai lỗi cùng lúc: tin nhầm nội dung giả và phủ nhận nhầm nội dung thật.',
            'Trạng thái “chưa đủ dữ liệu” đặc biệt quan trọng với nội dung có rủi ro cao: tiền bạc, danh dự, hình ảnh nhạy cảm, pháp lý, sức khỏe, an toàn cá nhân hoặc lời kêu gọi chia sẻ hàng loạt.',
            { type: 'callout', variant: 'quote', title: 'Câu cần nhớ', text: 'Thấy, nghe và thấy nhiều người chia sẻ vẫn chưa đủ. Với nội dung rủi ro cao, hãy kiểm chứng trước khi tin, chia sẻ hoặc hành động.' },
          ], [
            '“Chưa đủ dữ liệu” là một kết luận hợp lệ và an toàn.',
            'Nội dung rủi ro cao cần tiêu chuẩn bằng chứng cao hơn.',
          ]),
        ],
        checkpoint: checkpoint('1.1', [
          q('Deepfake là gì?', ['Nội dung mạo danh người thật bằng hình ảnh, video hoặc âm thanh', 'Mọi nội dung sai trên Internet', 'Chỉ là ảnh chỉnh màu', 'Chỉ là tin nhắn lừa đảo'], 0),
          q('Synthetic media có luôn là deepfake không?', ['Có', 'Không'], 1),
          q('Deepvoice nguy hiểm ở điểm nào?', ['Có thể khiến người nghe tin vì giọng nói quen thuộc', 'Chỉ hoạt động với ảnh', 'Luôn dễ nhận ra', 'Không liên quan đến lừa đảo'], 0),
          q('Repurposed media là gì?', ['Nội dung thật nhưng bị đặt sai bối cảnh', 'Video AI tạo hoàn toàn', 'Ảnh phong cảnh', 'Mã độc'], 0),
          q('Kết quả từ công cụ phát hiện nên được hiểu thế nào?', ['Là tín hiệu tham khảo, không phải phán quyết cuối cùng', 'Là kết luận tuyệt đối', 'Không có giá trị nào', 'Chỉ dùng để chia sẻ công khai'], 0),
        ]),
      },
      {
        title: '1.2 Thực hành phân loại nội dung',
        lessons: [
          lesson('1.2.0', 'Phân loại để chọn cách kiểm chứng', [
            'Phân loại nội dung không nhằm biến người học thành chuyên gia kỹ thuật. Mục tiêu là chọn đúng hướng kiểm chứng. Một deepvoice cần xác minh người gọi. Một video bị cắt ghép cần tìm bản đầy đủ. Một nội dung thật sai bối cảnh cần truy nguồn thời gian và địa điểm.',
            { type: 'table', caption: 'Từ phân loại đến hành động', headers: ['Loại nghi vấn', 'Hướng kiểm chứng'], rows: [
              ['Deepfake hoặc deepvoice', 'Xác minh người bị mạo danh qua kênh độc lập'],
              ['Edited media', 'Tìm bản đầy đủ và bối cảnh trước/sau đoạn bị cắt'],
              ['Repurposed media', 'Kiểm tra thời gian, địa điểm và nguồn đăng đầu tiên'],
              ['AI-generated image', 'Hỏi ảnh đang được dùng để tạo niềm tin hay danh tính gì'],
              ['Chưa đủ dữ liệu', 'Không chia sẻ, không hành động, tiếp tục kiểm chứng'],
            ] },
            'Trong thực tế, ranh giới giữa các loại nội dung có thể không rõ. Điều quan trọng không phải là gọi tên hoàn hảo, mà là không để nội dung chưa xác minh đẩy mình vào hành động có hại.',
          ], [
            'Phân loại giúp chọn hướng kiểm chứng phù hợp.',
            'Không cần gọi tên hoàn hảo; cần tránh hành động rủi ro khi chưa đủ dữ liệu.',
          ]),
          lesson('1.2.1', 'Một số tình huống mẫu', [
            'Video người nổi tiếng mời đầu tư từ tài khoản lạ: nghi deepfake hoặc chưa đủ dữ liệu. Cần kiểm tra kênh chính thức và không bấm link trong video.',
            'Ghi âm giống người thân yêu cầu chuyển tiền: nghi deepvoice hoặc social engineering. Cần gọi lại số đã lưu trước đó.',
            'Clip bảy giây từ bài phát biểu dài: nghi edited media. Cần xem bản đầy đủ để biết ý nghĩa có bị đổi không.',
            'Video tai nạn cũ đăng như vừa xảy ra hôm nay: repurposed media. Cần kiểm tra thời gian, địa điểm và nguồn gốc.',
            'Hình ảnh nhạy cảm bị lan truyền trong nhóm chat: dù thật hay giả, hành động đúng là không lan truyền, báo cáo và hỗ trợ người bị hại.',
            { type: 'callout', variant: 'tip', title: 'Nguyên tắc thực hành', text: 'Câu hỏi quan trọng nhất không phải “nội dung này thuộc nhãn nào?”, mà là “mình nên làm gì để không gây thêm hại khi chưa đủ dữ liệu?”.' },
          ], [
            'Mỗi loại nghi vấn dẫn đến một cách kiểm chứng khác nhau.',
            'Với nội dung nhạy cảm, ưu tiên giảm hại trước khi tranh luận thật giả.',
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
    introVideo: {
      src: '/academy/media/module-intros/module-02/module%202.web.mp4',
    },
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
          lesson('2.0.0', 'Biết rồi vẫn có thể bị lừa', [
            'Sau Module 1, An hiểu rằng hình ảnh, video và giọng nói trên mạng có thể bị làm giả. An biết khái niệm deepfake, deepvoice, synthetic media và cũng hiểu rằng “nhìn thấy” chưa đủ để kết luận.',
            'Nhưng kiến thức không tự động biến thành phản xạ. Khi điện thoại reo lúc tối muộn, màn hình hiện tên người thân, giọng nói ở đầu dây run lên và yêu cầu chuyển tiền gấp, não người không bắt đầu bằng phân tích kỹ thuật. Nó bắt đầu bằng lo lắng.',
            { type: 'callout', variant: 'info', title: 'Ý chính của Module 2', text: 'Deepfake nguy hiểm không chỉ vì công nghệ giống thật, mà vì nó xuất hiện đúng lúc cảm xúc của con người bị đẩy lên cao.' },
            'Kẻ xấu không cần nạn nhân “kém hiểu biết”. Chúng chỉ cần tạo một tình huống khiến nạn nhân vội, sợ, tin, thương, xấu hổ hoặc kỳ vọng quá mức. Khi cảm xúc tăng nhanh, khả năng kiểm chứng thường giảm xuống.',
            'Vì vậy, Module 2 không tập trung vào việc nhìn lỗi kỹ thuật trên khuôn mặt hay âm thanh. Phần này tập trung vào cơ chế tâm lý: vì sao một người bình thường, có hiểu biết, vẫn có thể ra quyết định sai trong vài phút căng thẳng.',
          ], [
            'Biết deepfake tồn tại chưa đủ; cần hiểu cách cảm xúc làm suy yếu năng lực kiểm chứng.',
            'Mục tiêu của phòng vệ cá nhân là tạo một khoảng dừng trước khi hành động.',
          ]),
        ],
        checkpoint: null,
      },
      {
        title: '2.1 Cơ chế thuyết phục trong lừa đảo',
        lessons: [
          lesson('2.1.0', 'Deepfake thường chỉ là một phần của kịch bản', [
            'Trong nhiều vụ lừa đảo, deepfake không phải toàn bộ cuộc tấn công. Nó là một bằng chứng giả được đặt vào một kịch bản thuyết phục: một người quen đang gặp nạn, một lãnh đạo cần xử lý gấp, một cơ hội đầu tư sắp hết hạn, hoặc một cơ quan chức năng yêu cầu hợp tác.',
            'Nếu chỉ hỏi “video này có phải deepfake không?”, người học có thể bỏ sót câu hỏi quan trọng hơn: “tình huống này đang thúc mình làm điều gì?”. Một nội dung có thể không phải deepfake nhưng vẫn là lừa đảo. Một tài khoản có thể là tài khoản thật nhưng đã bị chiếm quyền. Một cuộc gọi có thể dùng giọng thật được cắt ghép hoặc giọng giả được dựng lại.',
            { type: 'table', caption: 'Cách nhìn đúng trong Module 2', headers: ['Câu hỏi hẹp', 'Câu hỏi tốt hơn'], rows: [
              ['Video này giả không?', 'Nội dung này đang muốn mình tin hoặc làm gì?'],
              ['Giọng này giống người quen không?', 'Mình đã xác minh qua kênh độc lập chưa?'],
              ['Tài khoản này có quen không?', 'Ai đang thực sự kiểm soát tài khoản này?'],
              ['Có dấu hiệu kỹ thuật lạ không?', 'Có yêu cầu tiền, OTP, mật khẩu, cài app hoặc giữ bí mật không?'],
            ] },
            'Điểm cần nhớ: rủi ro không nằm riêng trong file ảnh, video hay âm thanh. Rủi ro nằm trong toàn bộ bối cảnh truyền thông và hành động mà bối cảnh đó đang ép bạn thực hiện.',
          ], [
            'Deepfake thường là một mảnh trong social engineering, không phải toàn bộ vụ việc.',
            'Luôn nhìn cả bối cảnh, yêu cầu hành động và kênh xác minh.',
          ]),
          lesson('2.1.1', 'Nút bấm thứ nhất: Khẩn cấp', [
            'Khẩn cấp là kỹ thuật làm giảm thời gian suy nghĩ. Khi bị báo rằng “chỉ còn vài phút”, “tài khoản sắp bị khóa”, “người thân đang nguy hiểm”, não có xu hướng chuyển sang chế độ phản ứng nhanh để giảm căng thẳng.',
            'Trong trạng thái đó, việc kiểm chứng có thể bị cảm nhận như một sự chậm trễ nguy hiểm. Đây là điểm kẻ xấu muốn khai thác: chúng không cần bạn tin mãi mãi, chỉ cần bạn tin đủ lâu để chuyển tiền, đọc OTP hoặc bấm vào đường link.',
            { type: 'comparison', title: 'Khẩn cấp thật và khẩn cấp giả', left: { label: 'Khẩn cấp thật', color: '#0ea5e9', items: ['Vẫn cho phép xác minh qua kênh khác', 'Không yêu cầu bỏ qua mọi quy trình an toàn', 'Thông tin có thể được kiểm tra bằng nguồn độc lập'] }, right: { label: 'Khẩn cấp giả', color: '#ef4444', items: ['Ép hành động ngay', 'Cấm gọi người khác hoặc hỏi thêm', 'Chuyển tiền, gửi mã hoặc cài app trước rồi giải thích sau'] } },
            'Nguyên tắc học thuật ở đây rất đơn giản: áp lực thời gian càng cao, tiêu chuẩn xác minh càng phải cao. Nếu một yêu cầu liên quan đến tiền, tài khoản hoặc thông tin nhạy cảm, việc dừng lại hai phút không phải là chậm; đó là kiểm soát rủi ro.',
          ], [
            'Khẩn cấp làm giảm khả năng kiểm chứng.',
            'Càng bị ép làm ngay, càng cần xác minh độc lập.',
          ]),
          lesson('2.1.2', 'Nút bấm thứ hai: Thân quen', [
            'Con người tin người quen nhanh hơn người lạ. Đây là một cơ chế xã hội bình thường: nếu lần nào cũng nghi ngờ người thân, bạn bè, đồng nghiệp, đời sống sẽ rất khó vận hành. Nhưng trên môi trường số, dấu hiệu thân quen có thể bị sao chép.',
            'Tên tài khoản, ảnh đại diện, lịch sử trò chuyện, giọng nói, video ngắn và thông tin cá nhân đều có thể bị lợi dụng. Một tài khoản quen chưa chắc do đúng người quen đang điều khiển. Một giọng nói giống chưa chắc là giọng thật trong ngữ cảnh thật.',
            { type: 'callout', variant: 'warning', title: 'Câu hỏi cần thay đổi', text: 'Không hỏi: “Mình có quen tài khoản này không?”. Hãy hỏi: “Mình có chắc đúng người đang kiểm soát kênh này không?”.' },
            'Ví dụ: bạn nhận tin nhắn từ tài khoản bạn thân, nội dung là “mình đang kẹt việc, chuyển giúp 2 triệu vào tài khoản này, tối trả”. Ảnh đại diện đúng, cách xưng hô gần đúng, nhưng người đó tránh gọi điện và số tài khoản là người lạ. Dấu hiệu thân quen ở đây không đủ để hành động.',
          ], [
            'Sự thân quen có thể bị giả mạo bằng tài khoản, giọng nói, video hoặc dữ liệu cá nhân.',
            'Tài khoản quen không đồng nghĩa với người thật đang đứng sau.',
          ]),
          lesson('2.1.3', 'Nút bấm thứ ba: Quyền lực', [
            'Quyền lực làm con người ngại phản biện. Khi người yêu cầu có vẻ là công an, ngân hàng, lãnh đạo, nhà trường, cơ quan chức năng hoặc chuyên gia, nhiều người có xu hướng làm theo trước rồi mới kiểm tra sau.',
            'Deepfake và deepvoice có thể làm cảm giác quyền lực mạnh hơn: một giọng giống lãnh đạo yêu cầu chuyển khoản, một video giống chuyên gia tài chính khuyến nghị đầu tư, một cuộc gọi tự xưng cơ quan chức năng yêu cầu giữ bí mật để phục vụ điều tra.',
            { type: 'table', caption: 'Dấu hiệu giả quyền lực', headers: ['Dấu hiệu', 'Vì sao đáng ngờ'], rows: [
              ['Yêu cầu giữ bí mật tuyệt đối', 'Cô lập nạn nhân khỏi người có thể kiểm chứng'],
              ['Yêu cầu chuyển tiền hoặc cung cấp mã', 'Đẩy nạn nhân vào hành động rủi ro cao'],
              ['Dọa hậu quả pháp lý ngay lập tức', 'Tạo sợ hãi để giảm phản biện'],
              ['Không cho liên hệ kênh chính thức', 'Ngăn xác minh độc lập'],
            ] },
            'Người có thẩm quyền thật không cần bạn bỏ qua quy trình an toàn. Một tổ chức chuyên nghiệp càng liên quan đến tiền, pháp lý hoặc tài khoản thì càng phải có kênh xác minh rõ ràng.',
          ], [
            'Quyền lực giả thường đi cùng đe dọa, bí mật và yêu cầu bỏ qua quy trình.',
            'Thẩm quyền thật không sợ xác minh qua kênh chính thức.',
          ]),
          lesson('2.1.4', 'Nút bấm thứ tư: Lợi ích', [
            'Không phải lừa đảo nào cũng dùng nỗi sợ. Nhiều kịch bản dùng hy vọng: lợi nhuận cao, học bổng, quà tặng, ưu đãi hiếm, cơ hội đầu tư hoặc lời hứa “việc nhẹ thu nhập tốt”.',
            'Deepfake làm lời hứa có vẻ đáng tin hơn vì nó mượn khuôn mặt, giọng nói hoặc uy tín của người khác. Một video giống người nổi tiếng nói về nền tảng đầu tư có thể khiến người xem bỏ qua câu hỏi nền tảng đó được cấp phép ở đâu, ai vận hành, rủi ro là gì và vì sao lợi nhuận lại chắc chắn.',
            { type: 'callout', variant: 'tip', title: 'Nguyên tắc kiểm chứng lợi ích', text: 'Lợi ích càng lớn, càng nhanh, càng ít rủi ro thì càng cần kiểm tra nguồn gốc, giấy phép, điều khoản và kênh chính thức.' },
            'Cơ hội thật không cần bạn tắt khả năng nghi ngờ. Nếu một lời mời chỉ tồn tại trong vài phút, yêu cầu chuyển tiền trước, hoặc cấm bạn hỏi người có chuyên môn, đó không phải là cơ hội; đó là áp lực được đóng gói như cơ hội.',
          ], [
            'Lừa đảo lợi ích khai thác hy vọng thay vì nỗi sợ.',
            'Lời hứa “cao, nhanh, chắc chắn” cần được kiểm chứng kỹ hơn bình thường.',
          ]),
          lesson('2.1.5', 'Sáu mẫu ngôn ngữ cần cảnh giác', [
            'Kẻ xấu thường để lại dấu hiệu trong cách nói. Những dấu hiệu này quan trọng vì chúng xuất hiện ngay cả khi hình ảnh hoặc giọng nói được làm rất thuyết phục.',
            { type: 'table', caption: 'Mẫu ngôn ngữ thao túng thường gặp', headers: ['Mẫu câu', 'Tác động tâm lý'], rows: [
              ['“Làm ngay”, “gửi ngay”, “xác nhận ngay”', 'Tạo áp lực thời gian'],
              ['“Đừng nói với ai”, “đừng gọi người khác”', 'Cô lập nạn nhân'],
              ['“Nếu không thì…”', 'Kích hoạt nỗi sợ hậu quả'],
              ['“Chỉ bạn được chọn”', 'Tạo cảm giác đặc biệt'],
              ['“Không có rủi ro”, “lợi nhuận chắc chắn”', 'Khai thác lòng tham hoặc hy vọng'],
              ['“Đừng làm lớn chuyện”', 'Khai thác xấu hổ để ngăn báo cáo'],
            ] },
            'Khi một nội dung vừa giống thật vừa dùng nhiều mẫu ngôn ngữ thao túng, bạn không cần kết luận ngay đó là deepfake. Bạn chỉ cần kết luận rằng tình huống đủ rủi ro để dừng lại và xác minh.',
          ], [
            'Ngôn ngữ thao túng là dấu hiệu rủi ro mạnh, kể cả khi hình ảnh và giọng nói có vẻ thật.',
            'Không cần đoán đúng công nghệ; cần phát hiện đúng thời điểm phải dừng lại.',
          ]),
        ],
        checkpoint: null,
      },
      {
        title: '2.2 Case thực hành: Cuộc gọi lúc 22:47',
        lessons: [
          lesson('2.2.0', 'Bối cảnh', [
            '22:47. An chuẩn bị đi ngủ thì nhận cuộc gọi video từ tài khoản có tên Minh Anh, em họ của An. Hai người có liên lạc nhưng không thường xuyên gọi video.',
            'Màn hình hiện khuôn mặt giống Minh Anh. Hình hơi mờ, ánh sáng yếu, âm thanh có lúc vỡ. Người trong cuộc gọi nói nhanh: “Anh An, giúp em với. Em vừa va chạm xe. Em cần chuyển khoản gấp để xử lý. Điện thoại em sắp hết pin. Anh chuyển giúp em 5 triệu vào số tài khoản này được không?”.',
            'An hỏi: “Em đang ở đâu?”. Người kia trả lời vòng tránh: “Em không nói rõ được. Gấp lắm. Anh đừng gọi cho mẹ em, mẹ em sẽ hoảng. Anh chuyển trước đi rồi em nói sau”. Sau đó tài khoản gửi số tài khoản mang tên một người lạ.',
            { type: 'table', caption: 'Dữ kiện cần quan sát', headers: ['Dữ kiện', 'Đánh giá ban đầu'], rows: [
              ['Tài khoản có tên Minh Anh', 'Tạo cảm giác thân quen nhưng chưa đủ xác minh'],
              ['Hình và giọng khá giống', 'Có giá trị tham khảo, không phải kết luận'],
              ['Yêu cầu chuyển 5 triệu gấp', 'Rủi ro tài chính rõ ràng'],
              ['Yêu cầu không gọi người khác', 'Dấu hiệu cô lập nạn nhân'],
              ['Số tài khoản tên người lạ', 'Dấu hiệu bất thường mạnh'],
              ['Né câu hỏi về địa điểm', 'Tránh xác minh'],
            ] },
          ], [
            'Case này nguy hiểm vì kết hợp thân quen, khẩn cấp, sợ hãi, cô lập và tài chính.',
            'Dữ kiện kỹ thuật như hình mờ chỉ là một phần; hành vi yêu cầu mới là trọng tâm.',
          ]),
          lesson('2.2.1', 'Quyết định đầu tiên', [
            'Câu hỏi: An nên làm gì trước?',
            'A. Chuyển tiền ngay vì có thể Minh Anh đang nguy hiểm. B. Hỏi vài câu riêng tư, nếu trả lời đúng thì chuyển. C. Kết thúc cuộc gọi, gọi lại số điện thoại đã lưu của Minh Anh hoặc gọi người thân khác. D. Gửi trước một phần để “giúp tạm”.',
            { type: 'callout', variant: 'info', title: 'Đáp án khuyến nghị: C', text: 'Thoát khỏi kênh đang nghi vấn và xác minh qua kênh đã biết từ trước là lựa chọn an toàn nhất.' },
            'Hỏi câu riêng tư không đủ chắc. Thông tin cá nhân có thể bị lấy từ mạng xã hội, từ tin nhắn cũ hoặc từ tài khoản đã bị chiếm quyền. Gửi một phần tiền cũng vẫn là chuyển tiền trong tình huống chưa xác minh.',
            'Kỹ năng quan trọng không phải là tranh luận với người gọi. Kỹ năng quan trọng là rời khỏi kênh có nguy cơ bị kiểm soát và dùng một kênh độc lập.',
          ], [
            'Hành động an toàn nhất là xác minh qua số đã lưu hoặc người thân khác.',
            'Không chuyển tiền một phần trong tình huống chưa xác minh.',
          ]),
          lesson('2.2.2', 'Kênh độc lập là gì?', [
            'Kênh độc lập là kênh bạn đã biết từ trước và không do người đang bị nghi vấn cung cấp trong lúc khẩn cấp. Ví dụ: số điện thoại đã lưu từ trước, cuộc gọi cho người thân khác, hoặc kênh chính thức của tổ chức.',
            { type: 'table', caption: 'Xếp hạng kênh xác minh trong case 22:47', headers: ['Mức an toàn', 'Kênh'], rows: [
              ['Tốt nhất', 'Gọi số điện thoại đã lưu từ trước của Minh Anh'],
              ['Tốt', 'Gọi mẹ hoặc người thân của Minh Anh bằng số đã lưu'],
              ['Yếu', 'Nhắn lại trong chính tài khoản đang nghi vấn'],
              ['Nguy hiểm', 'Gọi số mới do người kia vừa gửi'],
              ['Rất nguy hiểm', 'Bấm link vị trí, link bệnh viện hoặc link thanh toán do người kia gửi'],
            ] },
            'Điểm cốt lõi: kênh xác minh không được phụ thuộc vào chính nguồn đang tạo áp lực. Nếu người gọi là giả, mọi thông tin họ cung cấp tiếp theo cũng có thể là một phần của kịch bản.',
          ], [
            'Kênh độc lập phải tồn tại trước tình huống khẩn cấp.',
            'Không dùng số điện thoại, link hoặc tài khoản mới do nguồn nghi vấn cung cấp.',
          ]),
          lesson('2.2.3', 'Nếu đã lỡ chuyển tiền', [
            'Nếu An đã chuyển tiền, mục tiêu không phải là tự trách. Mục tiêu là giảm thiệt hại và giữ bằng chứng.',
            'Các bước ưu tiên: liên hệ ngân hàng càng sớm càng tốt; lưu ảnh chụp màn hình, thời gian, số tài khoản, nội dung chat, đường link; báo cho người thân để tránh người khác bị lừa tiếp; báo cáo tài khoản nghi giả mạo trên nền tảng; nếu có dấu hiệu tội phạm, liên hệ cơ quan chức năng theo kênh phù hợp.',
            { type: 'callout', variant: 'warning', title: 'Không xóa bằng chứng', text: 'Xấu hổ là cảm xúc dễ hiểu, nhưng xóa tin nhắn và lịch sử giao dịch sẽ làm việc xử lý khó hơn.' },
            'Cũng không nên đăng thông tin cá nhân nghi phạm tràn lan lên các nhóm công khai khi chưa có xác minh. Việc đó có thể gây rủi ro pháp lý hoặc làm lộ thêm dữ liệu cá nhân. Báo cáo đúng kênh luôn tốt hơn phản ứng bốc đồng.',
          ], [
            'Nếu đã chuyển tiền: liên hệ ngân hàng, giữ bằng chứng, cảnh báo người thân, báo cáo đúng kênh.',
            'Không xóa bằng chứng và không công khai thông tin cá nhân chưa được xác minh.',
          ]),
          lesson('2.2.4', 'Kết luận Module 2', [
            'Bài học quan trọng nhất của Module 2 là: khi cảm xúc bị đẩy lên cao, khả năng kiểm chứng bị kéo xuống thấp. Đây không phải lỗi đạo đức hay trí tuệ của nạn nhân. Đây là cơ chế tâm lý bình thường bị khai thác có chủ đích.',
            'Phòng vệ tốt không đòi hỏi bạn trở thành chuyên gia phát hiện deepfake. Phòng vệ tốt bắt đầu từ một phản xạ rất thực tế: trước yêu cầu tiền, OTP, mật khẩu, cài ứng dụng, giữ bí mật hoặc chia sẻ gấp, hãy dừng lại và xác minh qua kênh độc lập.',
            { type: 'callout', variant: 'quote', title: 'Câu cần nhớ', text: 'Tôi chưa đủ dữ liệu để hành động. Tôi cần xác minh qua kênh độc lập.' },
            'Câu trả lời này không làm bạn chậm chạp. Nó làm bạn đáng tin hơn trong môi trường số, nơi hình ảnh và giọng nói không còn là bằng chứng tuyệt đối.',
          ], [
            'Cảm xúc cao làm kiểm chứng yếu đi; cần tạo khoảng dừng an toàn.',
            'Kênh độc lập là nền tảng của phản xạ phòng vệ trước deepfake và social engineering.',
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
    introVideo: {
      src: '/academy/media/module-intros/module-03/module%203.web.mp4',
    },
    duration: '75-90 phút', level: 'Foundation',
    scenario: 'Sau cuộc gọi lúc 22:47, An xem lại video đầu tư người nổi tiếng. Lần này An không hỏi ngay “thật hay giả?”, mà quan sát theo ba lớp: hình ảnh, âm thanh và ngữ cảnh.',
    outcomes: [
      'Biết quan sát nội dung nghi vấn theo ba lớp: hình ảnh/video, âm thanh/giọng nói và ngữ cảnh/hành vi.',
      'Hiểu vì sao một dấu hiệu kỹ thuật đơn lẻ không đủ để kết luận deepfake.',
      'Nhận diện các dấu hiệu rủi ro trong video đầu tư, cuộc gọi deepvoice và hình ảnh nhạy cảm.',
      'Biết dùng kết luận tạm thời: tin được, chưa đủ dữ liệu, hoặc rủi ro cao cần dừng lại.',
    ],
    sections: [
      {
        title: '3.0 Câu chuyện dẫn nhập',
        lessons: [
          lesson('3.0.0', 'An xem lại video đầu tư', [
            'Sau Module 2, An hiểu rằng cảm xúc có thể làm mình phản ứng vội. Sáng hôm sau, An mở lại video người nổi tiếng kêu gọi đầu tư. Gương mặt giống, giọng nói giống, bình luận rất tích cực. Nhưng lần này An không vội tin.',
            'An tự hỏi: video đến từ tài khoản nào? Người nổi tiếng này có đăng nội dung tương tự trên kênh chính thức không? Video có yêu cầu bấm link, nạp tiền hoặc hành động ngay không? Nếu video sai, ai có thể bị hại?',
            { type: 'callout', variant: 'info', title: 'Mục tiêu của Module 3', text: 'Không học để đoán thật giả trong vài giây. Học để biết khi nào một nội dung đủ rủi ro để dừng lại, kiểm chứng và không hành động vội.' },
            'Quan sát tốt không chỉ là nhìn mặt. Quan sát tốt là nhìn, nghe và đọc toàn bộ tình huống. Một video có thể rất mượt nhưng ngữ cảnh lừa đảo rõ ràng. Một video có thể hơi mờ nhưng vẫn là thật. Vì vậy, Module 3 dùng cách tiếp cận ba lớp.',
          ], [
            'Quan sát không chỉ là tìm lỗi trên khuôn mặt; cần nhìn cả nguồn, yêu cầu và hậu quả.',
            'Câu hỏi đúng: nội dung này có đủ đáng tin để mình hành động không?',
          ]),
        ],
        checkpoint: null,
      },
      {
        title: '3.1 Lớp hình ảnh và video',
        lessons: [
          lesson('3.1.0', 'Quan sát kỹ thuật nhưng không phán quyết vội', [
            'Lớp hình ảnh/video giúp người học phát hiện tín hiệu bất thường. Nhưng tín hiệu kỹ thuật chỉ là điểm bắt đầu, không phải bản án. Video thật vẫn có thể mờ, lệch tiếng hoặc ánh sáng xấu vì mạng yếu, nén file, quay lại màn hình hoặc điều kiện ghi hình kém.',
            { type: 'table', caption: 'Những điểm nên quan sát', headers: ['Khu vực', 'Câu hỏi quan sát'], rows: [
              ['Khuôn mặt', 'Rìa mặt có nhòe, rung hoặc biến dạng khi quay đầu không? Da mặt có khác bất thường so với cổ/tay không?'],
              ['Mắt', 'Ánh mắt và phản chiếu ánh sáng có hợp lý không? Biểu cảm mắt có khớp nội dung không?'],
              ['Miệng', 'Khẩu hình có khớp âm thanh không? Răng, môi có bị méo hoặc trễ bất thường không?'],
              ['Ánh sáng', 'Bóng trên mặt có hợp với nguồn sáng và nền không?'],
              ['Chi tiết nhỏ', 'Tóc, tai, kính, tay hoặc phụ kiện có biến dạng khi chuyển động không?'],
              ['Nền', 'Chữ, logo, đồ vật, địa điểm có khớp với câu chuyện được kể không?'],
            ] },
            'Một dấu hiệu đơn lẻ hiếm khi đủ. Nhưng nhiều dấu hiệu xuất hiện cùng lúc, nhất là khi đi kèm yêu cầu tiền, link lạ hoặc tài khoản không chính thức, sẽ làm mức rủi ro tăng lên rõ rệt.',
          ], [
            'Dấu hiệu kỹ thuật là tín hiệu để kiểm chứng thêm, không phải kết luận cuối cùng.',
            'Nhiều dấu hiệu cùng xuất hiện làm rủi ro tăng mạnh hơn một lỗi đơn lẻ.',
          ]),
          lesson('3.1.1', 'Giới hạn của mắt thường và detector', [
            'Mắt thường không được thiết kế để phát hiện nội dung AI hiện đại. Con người giỏi nhận diện khuôn mặt quen, nhưng không giỏi đánh giá một video đã bị nén, cắt ghép, tái đăng hoặc tạo bằng mô hình mới.',
            'Detector deepfake có thể hỗ trợ, nhưng cũng có giới hạn. Công cụ phụ thuộc vào dữ liệu huấn luyện, loại deepfake từng thấy, chất lượng file đầu vào và việc video có bị nén hay quay lại màn hình hay không. Kết quả “90% nghi vấn” là tín hiệu tham khảo. Kết quả “không phát hiện” cũng không chứng minh nội dung thật.',
            { type: 'table', caption: 'Ba mức kết luận an toàn', headers: ['Mức', 'Cách hiểu'], rows: [
              ['Có bằng chứng tốt', 'Có nguồn chính thức hoặc nhiều nguồn độc lập xác nhận.'],
              ['Chưa đủ dữ liệu', 'Có tín hiệu nghi vấn nhưng chưa đủ cơ sở kết luận. Không chia sẻ hoặc hành động vội.'],
              ['Rủi ro cao', 'Nội dung yêu cầu tiền, OTP, link, chia sẻ gấp hoặc gây hại danh dự. Cần dừng lại dù chưa chứng minh deepfake.'],
            ] },
            'Mục tiêu của người học không phải là thắng cuộc thi đoán video. Mục tiêu là tránh hành động nguy hiểm khi bằng chứng chưa đủ chắc.',
          ], [
            'Mắt thường và detector đều có giới hạn.',
            '“Chưa đủ dữ liệu” là một kết luận hợp lệ trong môi trường số.',
          ]),
        ],
        checkpoint: checkpoint('3.1', [
          q('Khẩu hình lệch trong video nên được hiểu thế nào?', ['Là tín hiệu cần kiểm chứng thêm, không phải kết luận chắc chắn', 'Chắc chắn là deepfake', 'Chắc chắn là video thật', 'Không bao giờ quan trọng'], 0),
          q('Kết quả detector deepfake nên được dùng ra sao?', ['Như một tín hiệu tham khảo trong quá trình đánh giá', 'Như phán quyết tuyệt đối', 'Để thay thế kiểm tra nguồn', 'Để quyết định chia sẻ ngay'], 0),
          q('Khi nào có thể xem một nội dung là rủi ro cao dù chưa chứng minh deepfake?', ['Khi nội dung yêu cầu tiền, OTP, link lạ, chia sẻ gấp hoặc gây hại danh dự', 'Khi video có độ phân giải thấp', 'Khi người nói nhìn nghiêm túc', 'Khi có ít bình luận'], 0),
        ]),
      },
      {
        title: '3.2 Lớp âm thanh và giọng nói',
        lessons: [
          lesson('3.2.0', 'Giọng nói là tín hiệu mạnh nhưng không tuyệt đối', [
            'Giọng nói quen thuộc tạo cảm giác tin cậy rất nhanh. Đó là lý do deepvoice nguy hiểm trong cuộc gọi khẩn cấp: người nghe có thể phản ứng theo quan hệ gia đình, bạn bè hoặc công việc trước khi nghĩ đến kiểm chứng.',
            'Dấu hiệu âm thanh cần chú ý gồm: nhịp nói đều bất thường, cảm xúc không khớp nội dung, âm thanh như đọc kịch bản, câu trả lời né tránh, tiếng nền thiếu tự nhiên hoặc chất lượng âm thanh thay đổi bất thường giữa các đoạn.',
            { type: 'callout', variant: 'warning', title: 'Nguyên tắc xác minh giọng nói', text: 'Nghe giống không đủ. Nếu cuộc gọi yêu cầu tiền, OTP, mật khẩu, cài app hoặc giữ bí mật, hãy xác minh qua kênh độc lập.' },
            'Một câu hỏi bất ngờ đôi khi giúp phát hiện kịch bản, nhưng không nên xem là biện pháp chắc chắn. Thông tin cá nhân có thể bị lấy từ mạng xã hội hoặc lịch sử tin nhắn. Kênh độc lập vẫn quan trọng hơn câu đố riêng tư.',
          ], [
            'Giọng quen tạo niềm tin nhanh, nhưng không đủ để hành động trong tình huống rủi ro cao.',
            'Kênh độc lập quan trọng hơn việc hỏi vài câu riêng tư trong cùng cuộc gọi.',
          ]),
          lesson('3.2.1', 'Checklist nghe an toàn', [
            'Khi gặp tin nhắn thoại hoặc cuộc gọi nghi vấn, hãy ghi nhận ba nhóm thông tin: âm thanh nghe như thế nào, nội dung yêu cầu gì và kênh xác minh nào an toàn.',
            { type: 'table', caption: 'Checklist nghe an toàn', headers: ['Câu hỏi', 'Ý nghĩa'], rows: [
              ['Giọng có giống nhưng nội dung có bất thường không?', 'Giọng quen không loại bỏ rủi ro nếu yêu cầu lạ.'],
              ['Người gọi có yêu cầu tiền, OTP, mật khẩu hoặc cài app không?', 'Đây là nhóm hành động rủi ro cao.'],
              ['Người gọi có bảo đừng gọi lại hoặc đừng nói với ai không?', 'Đây là dấu hiệu cô lập nạn nhân.'],
              ['Có thể gọi lại số đã lưu hoặc hỏi người thân/đồng nghiệp khác không?', 'Đó là kênh xác minh độc lập.'],
            ] },
            'Trong tình huống khẩn cấp thật, xác minh đúng cách giúp hỗ trợ đúng người. Trong tình huống giả, xác minh giúp ngăn thiệt hại. Vì vậy, xác minh không phải là thiếu tin tưởng; đó là trách nhiệm.',
          ], [
            'Âm thanh cần được đánh giá cùng nội dung yêu cầu và kênh xác minh.',
            'Xác minh là trách nhiệm, không phải thái độ nghi ngờ vô lý.',
          ]),
        ],
        checkpoint: checkpoint('3.2', [
          q('Vì sao deepvoice nguy hiểm trong cuộc gọi khẩn cấp?', ['Vì giọng quen có thể kích hoạt phản xạ tin và giúp ngay', 'Vì mọi deepvoice đều hoàn hảo', 'Vì chỉ chuyên gia mới nghe được', 'Vì không cần kiểm chứng nếu giọng giống'], 0),
          q('Dấu hiệu nào là rủi ro mạnh hơn việc giọng nghe hơi lạ?', ['Yêu cầu chuyển tiền, gửi OTP hoặc giữ bí mật', 'Âm lượng hơi nhỏ', 'Có tiếng ồn nền', 'Cuộc gọi ngắn'], 0),
          q('Kênh xác minh an toàn nhất khi nhận cuộc gọi giống người thân yêu cầu tiền là gì?', ['Gọi lại số đã lưu hoặc hỏi người thân khác', 'Hỏi tiếp trong cùng cuộc gọi', 'Gọi số mới người đó vừa gửi', 'Chuyển một khoản nhỏ trước'], 0),
        ]),
      },
      {
        title: '3.3 Lớp ngữ cảnh và hành vi',
        lessons: [
          lesson('3.3.0', 'Ngữ cảnh thường lộ rủi ro sớm hơn kỹ thuật', [
            'Nhiều nội dung giả mạo hiện nay đủ mượt để người xem không thấy lỗi rõ ràng. Nhưng kịch bản xung quanh nội dung thường để lộ rủi ro sớm: tài khoản không chính thức, link rút gọn, lời hứa lợi nhuận cao, yêu cầu giữ bí mật, bình luận giống seeding hoặc lời kêu gọi chia sẻ ngay.',
            { type: 'table', caption: 'Câu hỏi ngữ cảnh', headers: ['Câu hỏi', 'Tại sao quan trọng'], rows: [
              ['Ai đăng hoặc gửi nội dung?', 'Nguồn không rõ làm rủi ro tăng.'],
              ['Nội dung muốn mình làm gì?', 'Yêu cầu hành động là trọng tâm của lừa đảo.'],
              ['Có kênh chính thức hoặc nguồn độc lập xác nhận không?', 'Nguồn độc lập mạnh hơn cảm giác thật.'],
              ['Có áp lực thời gian, sợ hãi, xấu hổ hoặc lợi ích quá tốt không?', 'Đó là dấu hiệu thao túng cảm xúc.'],
              ['Ai có thể bị hại nếu nội dung sai?', 'Giúp chuyển từ tò mò sang trách nhiệm số.'],
            ] },
            'Câu hỏi mạnh nhất là: nội dung này đang muốn mình làm gì? Nếu câu trả lời là chuyển tiền, đọc mã, bấm link, chia sẻ gấp hoặc bêu tên ai đó, bạn cần dừng lại.',
          ], [
            'Ngữ cảnh thường quan trọng hơn lỗi kỹ thuật rõ ràng.',
            'Câu hỏi trọng tâm: nội dung này đang muốn mình làm gì?',
          ]),
          lesson('3.3.1', 'Bình luận, lượt xem và cảm giác số đông', [
            'Lượt xem cao, bình luận tích cực và nhiều người chia sẻ không chứng minh nội dung là thật. Chúng chỉ chứng minh nội dung đang lan truyền. Trong lừa đảo, bình luận có thể đến từ seeding, tài khoản giả hoặc người thật nhưng chưa kiểm chứng.',
            'Với video đầu tư, bình luận kiểu “tôi đã nhận tiền”, “uy tín lắm”, “cơ hội cuối” không phải bằng chứng tài chính. Với clip gây phẫn nộ, nhiều bình luận tức giận không chứng minh clip đúng bối cảnh. Với hình ảnh nhạy cảm, nhiều người bàn tán càng làm hại người liên quan hơn.',
            { type: 'callout', variant: 'quote', title: 'Câu cần nhớ', text: 'Đám đông có thể làm nội dung lan xa, nhưng không tự động làm nội dung đúng hơn.' },
          ], [
            'Tương tác cao không phải bằng chứng xác thực.',
            'Đám đông lan truyền nội dung; nguồn độc lập mới giúp xác minh nội dung.',
          ]),
        ],
        checkpoint: checkpoint('3.3', [
          q('Câu hỏi ngữ cảnh quan trọng nhất là gì?', ['Nội dung này đang muốn mình làm gì?', 'Video có dài không?', 'Có bao nhiêu bình luận?', 'Màu sắc có đẹp không?'], 0),
          q('Bình luận tích cực dưới video đầu tư có phải bằng chứng tin cậy không?', ['Không, có thể là seeding hoặc người chưa kiểm chứng', 'Có, vì nhiều người không thể sai', 'Có nếu bình luận dài', 'Có nếu có nhiều emoji'], 0),
          q('Vì sao cần hỏi ai có thể bị hại nếu nội dung sai?', ['Để chọn hành động có trách nhiệm và không làm tăng thiệt hại', 'Để biết có nên xem tiếp không', 'Để tranh luận thắng hơn', 'Để tăng lượt chia sẻ'], 0),
        ], {
          type: 'tag-the-trick',
          title: 'Tìm bẫy tâm lý trong tin nhắn',
          instruction: 'Nhấn vào các đoạn chứa kỹ thuật thao túng — có thể có nhiều hơn một',
          reward: 10,
          data: {
            message: 'Anh/chị ơi, [[đây là cơ hội CUỐI CÙNG|1]] để tham gia đầu tư với lãi 40%/tháng. [[Chỉ còn 2 suất|2]], [[hết hôm nay là đóng|3]]. [[Bạn bè anh/chị đã kiếm được hàng chục triệu rồi|4]] — anh/chị còn chần chừ gì nữa? [[Đừng để người thân biết vội|5]], mình sẽ chia sẻ sau khi đã có lợi nhuận nhé.',
            targets: [
              { id: 1, tag: '🔚 Khan hiếm giả', explanation: '"Cơ hội cuối cùng" là mồi FOMO — không có dự án đầu tư uy tín nào lại "hết hạn cuối cùng" với người lạ.' },
              { id: 2, tag: '🎯 Áp lực khan hiếm', explanation: '"Chỉ còn 2 suất" tạo cảm giác phải quyết định ngay — kỹ thuật scarcity cổ điển.' },
              { id: 3, tag: '⏰ Áp lực thời gian', explanation: 'Deadline "hết hôm nay" ép quyết định nhanh, không cho thời gian kiểm chứng.' },
              { id: 4, tag: '👥 Bằng chứng xã hội giả', explanation: '"bạn bè đã kiếm được hàng chục triệu" — không có nguồn xác minh, đây là social proof bịa.' },
              { id: 5, tag: '🔇 Cô lập', explanation: '"Đừng để người thân biết" là red flag tột độ — kẻ lừa muốn cô lập nạn nhân khỏi người có thể cảnh báo.' },
            ],
          },
        }),
      },
      {
        title: '3.4 Thực hành checklist 3 lớp',
        lessons: [
          lesson('3.4.0', 'Áp dụng vào ba tình huống', [
            'Checklist 3 lớp gồm: hình ảnh/video, âm thanh/giọng nói, ngữ cảnh/hành vi. Với mỗi tình huống, người học không cần chứng minh tuyệt đối. Người học cần xác định mức rủi ro và hành động an toàn tiếp theo.',
            { type: 'table', caption: 'Ba tình huống thực hành', headers: ['Tình huống', 'Đánh giá an toàn'], rows: [
              ['Video người nổi tiếng mời đầu tư từ tài khoản không chính thức, có link đăng ký', 'Rủi ro cao. Không bấm link, kiểm tra kênh chính thức và nguồn độc lập.'],
              ['Tin nhắn thoại giống người thân yêu cầu chuyển tiền vào tài khoản người lạ', 'Rủi ro cao. Gọi lại số đã lưu hoặc xác minh qua người thân khác.'],
              ['Hình ảnh nhạy cảm trong nhóm lớp, không rõ nguồn', 'Rủi ro gây hại cao. Không lưu, không chuyển tiếp, báo cáo và hỗ trợ người bị hại.'],
            ] },
            'Kết luận Module 3: đừng chỉ hỏi “nó có giả không?”. Hãy hỏi: “nó có đủ đáng tin để mình hành động không?”. Nếu câu trả lời là chưa, hành động đúng là dừng lại, kiểm chứng và giảm hại.',
          ], [
            'Checklist 3 lớp giúp quan sát đủ: nhìn gì, nghe gì, tình huống yêu cầu gì.',
            'Không cần chứng minh 100% deepfake để từ chối hành động rủi ro.',
          ]),
        ],
        checkpoint: checkpoint('3.4', [
          q('Trong tình huống video đầu tư, dấu hiệu ngữ cảnh nguy hiểm nhất là gì?', ['Tài khoản không chính thức kết hợp với link đăng ký và lời hứa lợi nhuận cao', 'Video hơi ngắn', 'Người nói mặc áo sáng màu', 'Bình luận có nhiều emoji'], 0),
          q('Với tin nhắn thoại giống người thân yêu cầu chuyển tiền, hành động an toàn nhất là gì?', ['Gọi lại số đã lưu hoặc xác minh qua người thân khác', 'Chuyển một khoản nhỏ trước', 'Hỏi tiếp trong cùng tài khoản', 'Tin vì giọng giống'], 0),
          q('Với hình ảnh nhạy cảm không rõ nguồn trong nhóm chat, hành động đúng là gì?', ['Không lưu, không chuyển tiếp, báo cáo và hỗ trợ người bị hại', 'Phân tích công khai để tìm thật giả', 'Chia sẻ để cảnh báo', 'Lưu lại để xem sau'], 0),
        ]),
      },
    ],
    quiz: [
      q('Module 3 dạy quan sát theo mấy lớp?', ['3 lớp: hình ảnh/video, âm thanh/giọng nói, ngữ cảnh/hành vi', '2 lớp: hình ảnh và âm thanh', '1 lớp: kỹ thuật hình ảnh', '5 lớp độc lập không liên quan'], 0),
      q('Dấu hiệu kỹ thuật đơn lẻ nên được hiểu thế nào?', ['Là tín hiệu cần kiểm chứng thêm', 'Là kết luận chắc chắn', 'Là bằng chứng không cần nguồn', 'Không có giá trị nào'], 0),
      q('Khi detector không phát hiện deepfake, điều đó có nghĩa gì?', ['Không chứng minh nội dung thật; vẫn cần kiểm tra nguồn và ngữ cảnh', 'Nội dung chắc chắn thật', 'Có thể chia sẻ ngay', 'Không cần kiểm chứng nữa'], 0),
      q('Khi nào giọng nói giống người quen vẫn cần xác minh?', ['Khi yêu cầu tiền, OTP, mật khẩu, cài app hoặc giữ bí mật', 'Chỉ khi gọi lúc nửa đêm', 'Chỉ khi có tiếng ồn nền', 'Không bao giờ cần nếu giọng giống'], 0),
      q('Câu hỏi ngữ cảnh mạnh nhất là gì?', ['Nội dung này đang muốn mình làm gì?', 'Video có đẹp không?', 'Người đăng có ảnh đại diện không?', 'Bình luận có vui không?'], 0),
      q('Tương tác cao dưới video chứng minh điều gì?', ['Nội dung đang lan truyền, không chứng minh nội dung đúng', 'Nội dung chắc chắn đúng', 'Nội dung được chuyên gia xác minh', 'Nội dung không thể là lừa đảo'], 0),
      q('Với hình ảnh nhạy cảm không rõ nguồn, ưu tiên là gì?', ['Giảm hại: không lưu, không chuyển tiếp, báo cáo và hỗ trợ người bị hại', 'Phân tích thật giả công khai', 'Chia sẻ để hỏi thêm', 'Đợi nhiều người bình luận hơn'], 0),
      q('Kết luận quan trọng nhất của Module 3 là gì?', ['Không chỉ hỏi có giả không; hãy hỏi có đủ đáng tin để hành động không', 'Luôn tin detector', 'Luôn tin video từ tài khoản nhiều follower', 'Chỉ quan sát khuôn mặt là đủ'], 0),
    ],
  },


  // ── MODULE 4 ─────────────────────────────────────────────────
  {
    id: 4, part: 'recognition',
    title: 'Quy trình Deepfense Check',
    introVideo: {
      src: '/academy/media/module-intros/module-04/module%204.web.mp4',
    },
    duration: '80-95 phút', level: 'Intermediate',
    scenario: 'An đã biết deepfake là gì, hiểu cơ chế cảm xúc và biết quan sát ba lớp. Nhưng khi nội dung thật sự xuất hiện, An vẫn cần một quy trình rõ để không phải ứng biến trong hoảng loạn.',
    outcomes: [
      'Ghi nhớ và áp dụng được quy trình 5 bước: Pause, Observe, Verify, Trace, Decide.',
      'Hiểu kênh độc lập là gì và vì sao nó quan trọng hơn việc hỏi lại trong cùng kênh nghi vấn.',
      'Biết truy nguồn cơ bản với hình ảnh, video, tài khoản, đường link và kênh chính thức.',
      'Biết chọn hành động an toàn khi chưa đủ bằng chứng tuyệt đối.',
    ],
    sections: [
      {
        title: '4.0 Vì cần một quy trình?',
        lessons: [
          lesson('4.0.0', 'Kiến thức rời rạc chưa đủ', [
            'Đến Module 4, An đã có nhiều mảnh kiến thức: deepfake có thể mạo danh người thật, cảm xúc có thể làm mình phản ứng vội, giọng nói quen không đủ để tin, và dấu hiệu kỹ thuật chỉ là tín hiệu tham khảo.',
            'Nhưng trong đời thật, nội dung nghi vấn không xuất hiện dưới dạng câu hỏi trắc nghiệm. Nó xuất hiện khi bạn đang bận, đang lo, đang giận, đang muốn giúp ai đó hoặc đang bị thúc ép phải quyết định nhanh.',
            { type: 'callout', variant: 'info', title: 'Vai trò của quy trình', text: 'Quy trình giúp người học không phải nghĩ lại từ đầu trong từng tình huống. Nó tạo một đường ray an toàn khi cảm xúc đang kéo mình đi nhanh.' },
            'Deepfense Check là quy trình cốt lõi của khóa học. Nó không biến người học thành chuyên gia pháp chứng số, nhưng giúp người học trở thành người dùng Internet khó bị kéo vào hành động vội.',
          ], [
            'Kiến thức chỉ hữu ích khi được chuyển thành quy trình có thể lặp lại.',
            'Deepfense Check giúp giữ nhịp kiểm chứng khi cảm xúc hoặc áp lực đang tăng.',
          ]),
        ],
        checkpoint: null,
      },
      {
        title: '4.1 Năm bước Deepfense Check',
        lessons: [
          lesson('4.1.0', 'Tổng quan 5 bước', [
            'Deepfense Check gồm 5 bước: Pause, Observe, Verify, Trace, Decide. Thứ tự này quan trọng vì mỗi bước bảo vệ người học khỏi một kiểu sai lầm khác nhau.',
            { type: 'table', caption: 'Quy trình Deepfense Check', headers: ['Bước', 'Câu hỏi chính', 'Mục tiêu'], rows: [
              ['Pause', 'Mình có đang bị thúc phải phản ứng ngay không?', 'Tạo khoảng dừng trước hành động rủi ro.'],
              ['Observe', 'Mình nhìn, nghe và đọc được tín hiệu gì?', 'Thu thập dấu hiệu ở ba lớp: hình ảnh, âm thanh, ngữ cảnh.'],
              ['Verify', 'Có kênh độc lập nào xác minh được không?', 'Kiểm tra người gửi, yêu cầu hoặc thông tin qua kênh đáng tin hơn.'],
              ['Trace', 'Nội dung này bắt nguồn từ đâu?', 'Tìm nguồn gốc, bản đầy đủ, kênh chính thức hoặc dấu hiệu giả mạo.'],
              ['Decide', 'Hành động ít gây hại nhất bây giờ là gì?', 'Từ chối, báo cáo, hỏi thêm, cảnh báo riêng hoặc không lan truyền.'],
            ] },
            'Trong tình huống rủi ro cao, bạn không cần hoàn tất mọi bước như một điều tra viên. Chỉ cần một bước xác minh đủ mạnh cũng có thể ngăn thiệt hại: gọi lại số đã lưu, không bấm link, không đọc OTP, không chia sẻ hình ảnh nhạy cảm.',
          ], [
            'Deepfense Check gồm Pause, Observe, Verify, Trace, Decide.',
            'Mục tiêu không phải điều tra hoàn hảo, mà là ngăn hành động nguy hiểm khi chưa đủ dữ liệu.',
          ]),
          lesson('4.1.1', 'Pause và Observe', [
            'Pause là bước đơn giản nhất nhưng thường khó nhất. Pause nghĩa là dừng trước khi chuyển tiền, gửi mã, bấm link, cài ứng dụng, chia sẻ clip, bình luận công kích hoặc lưu hình ảnh nhạy cảm. Pause không phải là thờ ơ; Pause là giành lại quyền kiểm soát tốc độ phản ứng.',
            'Observe là bước thu thập tín hiệu. Người học quan sát ba lớp đã học ở Module 3: hình ảnh/video, âm thanh/giọng nói, ngữ cảnh/hành vi. Ở bước này, không cần kết luận ngay. Chỉ cần ghi nhận: có dấu hiệu nào đáng chú ý và rủi ro chính nằm ở đâu?',
            { type: 'table', caption: 'Sai lầm thường gặp', headers: ['Sai lầm', 'Cách sửa'], rows: [
              ['Thấy giống người quen nên làm ngay', 'Pause trước, xác minh sau.'],
              ['Chỉ nhìn lỗi trên mặt, quên nguồn đăng', 'Observe cả ngữ cảnh và yêu cầu hành động.'],
              ['Không thấy lỗi kỹ thuật nên tin', 'Kiểm tra nguồn và kênh độc lập.'],
              ['Thấy một lỗi nhỏ rồi kết luận chắc chắn giả', 'Ghi nhận là tín hiệu, không phán quyết vội.'],
            ] },
          ], [
            'Pause tạo khoảng dừng trước hành động không thể rút lại.',
            'Observe là thu thập tín hiệu, không phải phán quyết ngay.',
          ]),
          lesson('4.1.2', 'Verify và Trace', [
            'Verify là xác minh qua kênh độc lập. Đây là bước quan trọng nhất khi nội dung liên quan đến người quen, tiền, OTP, tài khoản, giấy tờ, hình ảnh nhạy cảm hoặc yêu cầu giữ bí mật.',
            'Kênh độc lập là kênh bạn đã biết từ trước hoặc có thể tự tìm từ nguồn đáng tin, không phải kênh do người đang bị nghi vấn cung cấp ngay trong lúc khẩn cấp. Ví dụ: số điện thoại đã lưu, website chính thức tự gõ, app chính thức đã cài, tổng đài lấy từ nguồn công khai đáng tin, hoặc người thứ ba đáng tin cậy.',
            'Trace là truy nguồn. Bước này đặc biệt hữu ích với video, ảnh, bài đăng và đường link lan truyền. Trace hỏi: nội dung xuất hiện đầu tiên ở đâu, có bản đầy đủ không, kênh chính thức có xác nhận không, tên miền có giống giả mạo không, ảnh/video có từng xuất hiện trong sự kiện khác không?',
            { type: 'callout', variant: 'warning', title: 'Điểm phân biệt quan trọng', text: 'Verify kiểm tra con người hoặc yêu cầu. Trace kiểm tra nguồn gốc nội dung. Trong nhiều tình huống, bạn cần cả hai.' },
          ], [
            'Verify phải dùng kênh độc lập, không dùng kênh do nguồn nghi vấn vừa đưa.',
            'Trace giúp phát hiện nội dung cũ bị đặt sai bối cảnh, tài khoản nhái, link giả hoặc video bị cắt ghép.',
          ]),
          lesson('4.1.3', 'Decide: quyết định khi chưa chắc 100%', [
            'Decide là bước chọn hành động ít gây hại nhất dựa trên dữ liệu hiện có. Nhiều người nghĩ phải chứng minh 100% là deepfake mới được từ chối. Điều đó không đúng. Trong tình huống rủi ro cao, chưa đủ dữ liệu đã là lý do hợp lệ để không hành động.',
            { type: 'table', caption: 'Quyết định an toàn theo tình huống', headers: ['Tình huống', 'Quyết định an toàn'], rows: [
              ['Người quen yêu cầu chuyển tiền gấp', 'Không chuyển cho đến khi xác minh qua kênh độc lập.'],
              ['Video đầu tư từ tài khoản lạ', 'Không bấm link, không nạp tiền, kiểm tra kênh chính thức.'],
              ['Cuộc gọi tự xưng ngân hàng yêu cầu OTP', 'Không đọc OTP, tự liên hệ ngân hàng qua kênh chính thức.'],
              ['Hình ảnh nhạy cảm trong nhóm chat', 'Không lưu, không chuyển tiếp, báo cáo và hỗ trợ người bị hại.'],
              ['Clip gây phẫn nộ không rõ nguồn', 'Không chia sẻ, truy nguồn và chờ nguồn đáng tin.'],
            ] },
            'Quyết định an toàn không phải lúc nào cũng là “làm nhiều hơn”. Đôi khi hành động đúng nhất là không chia sẻ, không bấm, không chuyển, không bình luận và không tiếp tục lan truyền.',
          ], [
            'Không cần chứng minh 100% deepfake để từ chối hành động rủi ro.',
            'Hành động an toàn nhất đôi khi là không làm gì thêm cho đến khi có dữ liệu tốt hơn.',
          ]),
        ],
        checkpoint: checkpoint('4.1', [
          q('Deepfense Check gồm những bước nào?', ['Pause, Observe, Verify, Trace, Decide', 'Scan, Guess, Share, Delete, Report', 'Look, Like, Comment, Share, Save', 'Detect, Trust, Pay, Confirm, Finish'], 0),
          q('Pause có mục tiêu gì?', ['Tạo khoảng dừng trước hành động rủi ro', 'Bỏ qua vấn đề', 'Kết luận video là giả', 'Chờ người khác quyết định'], 0),
          q('Verify khác gì với hỏi lại trong cùng kênh nghi vấn?', ['Verify dùng kênh độc lập hoặc đáng tin hơn', 'Không khác gì', 'Verify chỉ dùng detector', 'Verify chỉ dùng bình luận'], 0),
          q('Decide cho phép điều gì khi chưa chắc 100%?', ['Chọn hành động an toàn nếu rủi ro cao và chưa đủ dữ liệu', 'Luôn phải chia sẻ để hỏi thêm', 'Luôn phải chứng minh deepfake trước', 'Luôn tin người gửi'], 0),
        ]),
      },
      {
        title: '4.2 Công cụ và kênh kiểm chứng',
        lessons: [
          lesson('4.2.0', 'Dùng công cụ đúng vai trò', [
            'Công cụ kiểm chứng rất hữu ích nếu dùng đúng vai trò. Nhưng công cụ không thay thế tư duy. Một kết quả tìm kiếm ngược, một detector deepfake, một ảnh chụp metadata hoặc một trang kiểm tra link chỉ là tín hiệu hỗ trợ.',
            { type: 'table', caption: 'Công cụ phổ thông và giới hạn', headers: ['Công cụ', 'Giúp gì', 'Giới hạn'], rows: [
              ['Tìm kiếm ngược bằng hình ảnh', 'Tìm ảnh đã từng xuất hiện ở đâu, có bị dùng sai bối cảnh không.', 'Không hiệu quả với ảnh AI hoàn toàn mới hoặc ảnh chưa từng được đăng.'],
              ['Kiểm tra kênh chính thức', 'Xác nhận người/tổ chức có thật sự đăng nội dung không.', 'Tài khoản nhái có thể đặt tên rất giống; cần kiểm tra kỹ URL/tay cầm.'],
              ['Kiểm tra link/tên miền', 'Phát hiện tên miền giả, link rút gọn, trang đăng nhập lạ.', 'Không chứng minh toàn bộ nội dung thật/giả.'],
              ['Detector deepfake', 'Cung cấp tín hiệu kỹ thuật tham khảo.', 'Có thể sai, đặc biệt với nội dung nén, cắt, quay lại màn hình hoặc kỹ thuật mới.'],
            ] },
            'Quy tắc học thuật: công cụ trả lời một câu hỏi hẹp. Người học phải đặt câu hỏi đúng trước khi dùng công cụ. Nếu vấn đề là “người thân có thật sự cần tiền không”, detector deepfake không quan trọng bằng gọi lại số đã lưu.',
          ], [
            'Công cụ hỗ trợ kiểm chứng, không thay thế phán đoán.',
            'Chọn công cụ theo câu hỏi cần trả lời, không dùng theo thói quen.',
          ]),
          lesson('4.2.1', 'Kênh độc lập trong các tình huống thường gặp', [
            'Kênh độc lập là một trong những khái niệm quan trọng nhất của khóa học. Nó giúp người học thoát khỏi kịch bản do nguồn nghi vấn kiểm soát.',
            { type: 'table', caption: 'Chọn kênh độc lập', headers: ['Tình huống', 'Kênh nên dùng'], rows: [
              ['Người thân gọi cần tiền', 'Số điện thoại đã lưu từ trước, người thân khác, family code nếu có.'],
              ['Sếp hoặc giáo viên yêu cầu xử lý gấp', 'Kênh nội bộ chính thức, gọi trực tiếp số đã biết, quy trình xác nhận của tổ chức.'],
              ['Ngân hàng hoặc cơ quan chức năng gọi', 'Tự gọi tổng đài/đầu mối chính thức từ nguồn công khai đáng tin.'],
              ['Video người nổi tiếng đầu tư', 'Kênh chính thức của người đó, website tổ chức được xác minh, nguồn báo chí đáng tin.'],
              ['Link hoặc QR được gửi qua chat', 'Tự mở app/website chính thức, không đi qua link vừa nhận.'],
            ] },
            'Một kênh do người nghi vấn vừa gửi trong lúc khẩn cấp không phải kênh độc lập. Một số điện thoại mới, link mới, nhóm chat mới hoặc tài khoản hỗ trợ mới đều có thể là phần tiếp theo của kịch bản.',
          ], [
            'Kênh độc lập phải nằm ngoài kịch bản đang gây áp lực.',
            'Tự tìm kênh chính thức tốt hơn dùng số/link do nguồn nghi vấn gửi.',
          ]),
        ],
        checkpoint: checkpoint('4.2', [
          q('Công cụ kiểm chứng nên được hiểu thế nào?', ['Là tín hiệu hỗ trợ, không thay thế tư duy', 'Là phán quyết tuyệt đối', 'Không bao giờ hữu ích', 'Chỉ dùng để chứng minh video giả'], 0),
          q('Reverse image search không hiệu quả nhất với trường hợp nào?', ['Ảnh AI hoàn toàn mới chưa từng xuất hiện trên Internet', 'Ảnh cũ bị dùng sai bối cảnh', 'Ảnh đại diện lấy từ nơi khác', 'Ảnh từng đăng công khai'], 0),
          q('Kênh nào là kênh độc lập tốt khi người thân nhắn cần tiền?', ['Số điện thoại đã lưu từ trước hoặc người thân khác', 'Số mới người đó vừa gửi', 'Link trong tin nhắn', 'Hỏi lại trong cùng tài khoản đang nghi vấn'], 0),
        ]),
      },
      {
        title: '4.3 Thực hành quy trình',
        lessons: [
          lesson('4.3.0', 'Ba hồ sơ tình huống', [
            'Phần này yêu cầu người học áp dụng đủ 5 bước Deepfense Check. Mục tiêu không phải viết câu trả lời dài, mà là ra quyết định rõ và có lý do.',
            { type: 'table', caption: 'Hồ sơ thực hành', headers: ['Hồ sơ', 'Cách áp dụng Deepfense Check'], rows: [
              ['Video đầu tư người nổi tiếng', 'Pause vì có tiền và link. Observe tài khoản không chính thức, lời hứa lợi nhuận cao. Verify kênh chính thức. Trace tên miền/video gốc. Decide không bấm link, không nạp tiền.'],
              ['Cuộc gọi giống người thân', 'Pause trước khi chuyển tiền. Observe khẩn cấp, cô lập, tài khoản lạ. Verify số đã lưu/người thân khác. Trace không cần ưu tiên hơn Verify. Decide không chuyển khi chưa xác minh.'],
              ['Hình ảnh nhạy cảm trong nhóm chat', 'Pause trước khi lưu/chuyển tiếp. Observe rủi ro danh dự. Verify qua người có trách nhiệm, không phân tích công khai. Trace nguồn nếu cần bởi người phù hợp. Decide không lan truyền, báo cáo và hỗ trợ.'],
            ] },
            'Nếu chỉ nhớ một điều từ Module 4, hãy nhớ: Deepfense Check không buộc bạn phải biết chắc thật giả. Nó giúp bạn không trở thành mắt xích tiếp theo trong chuỗi thiệt hại.',
          ], [
            'Áp dụng quy trình vào hành động cụ thể, không chỉ đọc thuộc 5 bước.',
            'Quyết định an toàn phải xét cả rủi ro cho bản thân và người khác.',
          ]),
        ],
        checkpoint: checkpoint('4.3', [
          q('Trong hồ sơ video đầu tư, bước Decide an toàn là gì?', ['Không bấm link, không nạp tiền, kiểm tra kênh chính thức', 'Bấm link để xem thử', 'Nạp ít tiền trước', 'Chia sẻ để hỏi bình luận'], 0),
          q('Trong hồ sơ người thân cần tiền, bước nào thường quan trọng nhất?', ['Verify qua kênh độc lập', 'Trace video gốc', 'Đọc bình luận', 'Dùng detector ngay'], 0),
          q('Với hình ảnh nhạy cảm, quyết định an toàn là gì?', ['Không lan truyền, báo cáo và hỗ trợ người bị hại', 'Lưu lại để phân tích', 'Gửi cho nhiều người kiểm tra', 'Đăng lên nhóm lớn để hỏi'], 0),
        ], {
          type: 'sort-cards',
          title: 'Dấu hiệu thật hay giả?',
          instruction: 'Kéo hoặc nhấn từng quan sát vào đúng nhóm',
          reward: 10,
          data: {
            buckets: [
              { id: 'deepfake', label: 'Dấu hiệu deepfake', icon: '⚠️' },
              { id: 'normal', label: 'Bình thường', icon: '✅' },
            ],
            cards: [
              { id: 'c1', text: 'Mí mắt không nháy trong suốt 30 giây', bucket: 'deepfake' },
              { id: 'c2', text: 'Răng dính liền thành một khối, mất viền răng cửa', bucket: 'deepfake' },
              { id: 'c3', text: 'Ánh sáng trên mặt khác với ánh sáng cảnh nền', bucket: 'deepfake' },
              { id: 'c4', text: 'Tai trái và tai phải có hình dạng khác nhau', bucket: 'deepfake' },
              { id: 'c5', text: 'Khuôn mặt có nốt ruồi, vết tàn nhang tự nhiên', bucket: 'normal' },
              { id: 'c6', text: 'Tóc bay theo gió, có vài sợi rối ngẫu nhiên', bucket: 'normal' },
              { id: 'c7', text: 'Bóng đổ trên mặt khớp với nguồn sáng phòng', bucket: 'normal' },
              { id: 'c8', text: 'Viền hàm dưới mờ, hoà lẫn vào cổ khi quay đầu', bucket: 'deepfake' },
            ],
          },
        }),
      },
    ],
    quiz: [
      q('Deepfense Check gồm mấy bước và theo thứ tự nào?', ['5 bước: Pause — Observe — Verify — Trace — Decide', '3 bước: Stop — Check — Share', '4 bước: Scan — Analyze — Report — Delete', '5 bước: Detect — Verify — Block — Report — Ignore'], 0),
      q('Khi nào cần Pause ngay lập tức?', ['Khi nội dung yêu cầu hành động gấp liên quan đến tiền, OTP, link, chia sẻ hoặc danh dự người khác', 'Khi video có độ phân giải thấp', 'Khi người gửi là người lạ hoàn toàn', 'Chỉ khi nội dung bằng tiếng nước ngoài'], 0),
      q('Kênh độc lập an toàn nhất để Verify là gì?', ['Số điện thoại hoặc kênh chính thức đã biết từ trước, không phải kênh nguồn nghi vấn vừa cung cấp', 'Link do người đang nhắn tin vừa gửi', 'Hỏi lại ngay trong cùng cuộc chat', 'Bình luận công khai trong video'], 0),
      q('Trace đặc biệt quan trọng trong tình huống nào?', ['Video lan truyền gây phẫn nộ không rõ nguồn gốc', 'Khi nhận OTP từ ngân hàng', 'Khi thay đổi hình nền điện thoại', 'Khi cài ứng dụng từ kho ứng dụng chính thức'], 0),
      q('Decide yêu cầu bạn phải làm gì?', ['Chọn hành động an toàn nhất dù chưa chứng minh được deepfake', 'Xác nhận 100% là deepfake trước khi từ chối', 'Hỏi ý kiến số đông trước khi quyết định', 'Đợi báo chí đưa tin rồi mới hành động'], 0),
      q('Công cụ kiểm chứng có vai trò gì?', ['Hỗ trợ bằng tín hiệu tham khảo, không thay thế phán đoán và kiểm tra nguồn', 'Luôn đưa ra kết luận cuối cùng', 'Chỉ dành cho chuyên gia nên không nên dùng', 'Dùng để bỏ qua Verify'], 0),
      q('Khi clip gây phẫn nộ xuất hiện trong nhóm chat, hành động nào đúng nhất?', ['Không chia sẻ thêm, không bêu tên, truy nguồn hoặc báo người có trách nhiệm', 'Chia sẻ ngay để cảnh báo mọi người', 'Phân tích công khai trong nhóm', 'Dùng detector để xác nhận rồi mới quyết định'], 0),
      q('Với QR/link/app được gửi trong chat, cách an toàn là gì?', ['Tự mở app hoặc website chính thức thay vì đi qua link vừa nhận', 'Bấm thử nếu người gửi quen', 'Quét QR trước rồi kiểm tra sau', 'Gửi cho bạn bè bấm hộ'], 0),
    ],
  },


  // ── MODULE 5 ─────────────────────────────────────────────────────
  {
    id: 5, part: 'recognition',
    title: 'Deepfake trong đời sống số',
    introVideo: {
      src: '/academy/media/module-intros/module-05/module%205.web.mp4',
    },
    duration: '90-105 phút', level: 'Intermediate',
    scenario: 'Sau khi đã có quy trình Deepfense Check, An nhận ra rủi ro không chỉ nằm trong một video giả. Một lời nhờ chuyển tiền, một ảnh nhạy cảm trong nhóm lớp, một clip gây phẫn nộ hoặc một lời mời học bổng đều có thể bị phủ lên bởi lớp mạo danh. Module này giúp người học nhìn deepfake như một vấn đề xã hội, không chỉ là một thủ thuật công nghệ.',
    outcomes: [
      'Nhận diện các kịch bản mạo danh thường gặp trong tài chính, học đường, truyền thông xã hội và quan hệ cá nhân.',
      'Biết phân biệt dấu hiệu kỹ thuật với dấu hiệu hành vi: gấp gáp, cô lập, đe dọa, hứa hẹn hoặc ép giữ bí mật.',
      'Áp dụng Deepfense Check để ra quyết định an toàn ngay cả khi chưa thể chứng minh nội dung là giả.',
      'Biết cách phản ứng có trách nhiệm với nội dung nhạy cảm, tin gây phẫn nộ và yêu cầu liên quan đến tiền hoặc dữ liệu cá nhân.',
    ],
    sections: [
      {
        title: '5.0 Khi deepfake đi vào đời sống',
        lessons: [
          lesson('5.0.0', 'Từ công nghệ sang hành vi', [
            'Deepfake nguy hiểm không chỉ vì hình ảnh hoặc giọng nói có thể bị làm giả. Nó nguy hiểm vì được đặt vào đúng hoàn cảnh khiến con người dễ phản ứng nhanh: lo cho người thân, sợ mất tiền, sợ bị bêu xấu, muốn có cơ hội tốt hoặc muốn bảo vệ quan điểm của mình.',
            'Trong thực tế, người học hiếm khi gặp một nội dung có nhãn “deepfake”. Thứ họ gặp là một yêu cầu: chuyển tiền, bấm link, gửi giấy tờ, chia sẻ clip, im lặng, giữ bí mật hoặc hành động ngay.',
            'Vì vậy, mục tiêu của Module 5 không phải là biến bạn thành chuyên gia giám định hình ảnh. Mục tiêu là giúp bạn nhận ra bối cảnh rủi ro và chọn hành động ít gây hại nhất.',
          ], [
            'Đừng chỉ hỏi “nội dung này có giả không?”. Hãy hỏi thêm: “Ai đang muốn mình làm gì, trong bao lâu, và hậu quả nếu mình làm sai là gì?”.',
          ]),
          lesson('5.0.1', 'Bốn tín hiệu hành vi cần nhớ', [
            'Gấp gáp: yêu cầu xử lý ngay, không cho thời gian kiểm tra, tạo cảm giác nếu chậm sẽ mất cơ hội hoặc gặp nguy hiểm.',
            'Cô lập: bảo bạn không nói với ai, không gọi lại, không hỏi người khác, chỉ làm theo một kênh duy nhất.',
            'Áp lực cảm xúc: đánh vào tình thân, nỗi sợ, lòng tham, sự xấu hổ hoặc cảm giác phải chứng minh mình tốt.',
            'Chuyển hướng kiểm soát: kéo bạn sang link, app, tài khoản nhận tiền, nhóm chat hoặc kênh liên lạc do họ kiểm soát.',
          ], [
            'Khi bốn tín hiệu này xuất hiện cùng nhau, rủi ro thường cao hơn bản thân chất lượng video hay giọng nói.',
          ]),
        ],
        checkpoint: null,
      },
      {
        title: '5.1 Tiền bạc và mạo danh',
        lessons: [
          lesson('5.1.0', 'Mạo danh người thân, cấp trên và cơ quan', [
            'Các vụ lừa đảo tài chính thường bắt đầu bằng một danh tính đáng tin: người thân, sếp, giáo viên, ngân hàng, cơ quan chức năng hoặc người nổi tiếng. Deepfake và deepvoice làm lớp danh tính này thuyết phục hơn, nhưng phần nguy hiểm nhất vẫn là yêu cầu đi kèm.',
            'Hãy đặc biệt thận trọng với yêu cầu chuyển tiền vào tài khoản lạ, đọc OTP, gửi mật khẩu, cài ứng dụng ngoài kho chính thức, quét QR thanh toán hoặc cung cấp giấy tờ cá nhân trong lúc bị thúc ép.',
            'Một nguyên tắc học thuật nhưng rất thực dụng: danh tính càng có vẻ đáng tin thì quy trình xác minh càng không được bỏ qua. Người thật sẽ hiểu vì sao bạn cần xác minh; kẻ lừa đảo thường muốn bạn bỏ qua bước đó.',
          ], [
            'Giọng giống, mặt giống hoặc tài khoản quen không đủ để hợp thức hóa yêu cầu tiền bạc. Tiền và mã xác thực luôn cần kênh xác minh độc lập.',
          ]),
          lesson('5.1.1', 'Quy trình xử lý yêu cầu tài chính', [
            'Pause: dừng lại trước khi chuyển tiền, đọc OTP hoặc bấm link. Cảm giác gấp là tín hiệu cần kiểm tra, không phải lý do để bỏ kiểm tra.',
            'Observe: ghi lại các dấu hiệu bất thường: tài khoản nhận tiền lạ, lý do mơ hồ, cấm gọi lại, yêu cầu giữ bí mật, thay đổi kênh liên lạc hoặc nói chuyện rất ngắn.',
            'Verify: tự gọi số đã lưu, liên hệ người thân khác, dùng kênh nội bộ chính thức, hoặc tự mở app/ngân hàng/trang web chính thức. Không dùng số điện thoại hoặc link do người đang yêu cầu cung cấp.',
            'Decide: nếu chưa xác minh được, không chuyển tiền, không đọc OTP, không cài app và không gửi giấy tờ. Từ chối trong rủi ro cao là một quyết định hợp lý.',
          ], [
            'Bạn không cần chứng minh chắc chắn đó là deepfake mới được quyền từ chối. Chưa xác minh được là đủ lý do để dừng.',
          ]),
        ],
        checkpoint: checkpoint('5.1 Kiểm tra nhanh: tiền bạc và mạo danh', [
          q('Một giọng nói giống người thân yêu cầu chuyển tiền ngay vào tài khoản tên người lạ. Hành động an toàn nhất là gì?', ['Chuyển ngay vì giọng giống.', 'Gọi lại số đã lưu hoặc xác minh qua người thân khác.', 'Gửi trước một khoản nhỏ để thử.', 'Hỏi thêm trong cùng cuộc gọi rồi chuyển.'], 1),
          q('Dấu hiệu nào đáng nghi nhất trong yêu cầu từ cấp trên?', ['Yêu cầu bỏ qua quy trình chuyển tiền vì đang gấp.', 'Tin nhắn ngắn gọn.', 'Giọng nói nghiêm túc.', 'Gửi vào giờ làm việc.'], 0),
          q('Người tự xưng ngân hàng yêu cầu đọc OTP để khóa giao dịch lạ. Bạn nên làm gì?', ['Đọc OTP nếu họ biết tên bạn.', 'Không đọc OTP, tự liên hệ kênh chính thức của ngân hàng.', 'Đọc một nửa mã.', 'Gửi OTP qua tin nhắn cho chắc.'], 1),
          q('Vì sao không nên bấm link đầu tư trong video người nổi tiếng từ tài khoản lạ?', ['Vì mọi video người nổi tiếng đều giả.', 'Vì video, bình luận và link có thể là một kịch bản mạo danh phối hợp.', 'Vì chỉ video dài mới đáng tin.', 'Vì tài khoản lạ luôn vô hại.'], 1),
        ], {
          type: 'shield-match',
          title: 'Ghép tình huống với hành động đúng',
          instruction: 'Nhấn một tình huống, rồi nhấn hành động phòng vệ phù hợp nhất',
          reward: 10,
          data: {
            rules: [
              { id: 'hangup', label: 'Cúp máy, gọi lại số chính thức', icon: '📵' },
              { id: 'verify', label: 'Gọi xác minh qua kênh khác', icon: '📞' },
              { id: 'change_pw', label: 'Đổi mật khẩu ngay lập tức', icon: '🔑' },
              { id: 'goto_store', label: 'Đến cửa hàng nhà mạng với CMND', icon: '🏪' },
              { id: 'delete_app', label: 'Gỡ app, cài lại từ CH Play', icon: '🗑️' },
            ],
            scenarios: [
              { id: 's1', text: 'Người tự xưng nhân viên ngân hàng gọi báo "phát hiện giao dịch lạ" và yêu cầu đọc OTP để khoá.', match: 'hangup' },
              { id: 's2', text: 'Sếp nhắn Telegram giọng giống thật, yêu cầu chuyển 50 triệu gấp vào tài khoản lạ.', match: 'verify' },
              { id: 's3', text: 'Bạn vừa lỡ đọc OTP rút tiền cho người gọi. Ngân hàng chưa khoá tài khoản.', match: 'change_pw' },
              { id: 's4', text: 'Điện thoại đột nhiên mất sóng và bạn không nhận được SMS — nghi bị tráo SIM.', match: 'goto_store' },
              { id: 's5', text: 'Một app "kiểm tra thuế" được gửi qua Zalo, sau khi cài thấy app yêu cầu quyền truy cập SMS và Accessibility.', match: 'delete_app' },
            ],
          },
        }),
      },
      {
        title: '5.2 Học đường, danh dự và nội dung nhạy cảm',
        lessons: [
          lesson('5.2.0', 'Tác hại không dừng ở màn hình', [
            'Trong môi trường học đường, deepfake có thể xuất hiện dưới dạng ảnh nhạy cảm, clip ghép mặt, tin đồn bằng giọng nói hoặc tài khoản giả. Ngay cả khi nội dung là giả, người bị nhắm đến vẫn có thể chịu tổn thương thật: xấu hổ, bị cô lập, bị bắt nạt hoặc mất cảm giác an toàn.',
            'Người xem thường nghĩ mình chỉ “xem cho biết” hoặc “gửi cho một người”. Nhưng mỗi lượt lưu, gửi lại, bình luận hoặc trêu đùa đều làm thiệt hại lan rộng hơn.',
            'Với nội dung nhạy cảm, câu hỏi đạo đức quan trọng hơn câu hỏi kỹ thuật: hành động của mình có làm người trong ảnh/clip bị hại thêm không?',
          ], [
            'Không lưu, không gửi tiếp, không bình luận chế giễu. Đó là phản ứng an toàn và có trách nhiệm nhất với nội dung nhạy cảm nghi vấn.',
          ]),
          lesson('5.2.1', 'Cách phản ứng khi thấy nội dung gây hại', [
            'Dừng lan truyền: không tải xuống, không chuyển tiếp, không đăng lại và không yêu cầu người khác gửi.',
            'Giữ bằng chứng phù hợp: nếu cần báo cáo, lưu thông tin nguồn phát tán, thời điểm, đường dẫn hoặc ảnh chụp màn hình ở mức cần thiết. Tránh lưu hoặc phát tán lại chính nội dung nhạy cảm.',
            'Báo người có trách nhiệm: giáo viên, phụ huynh, quản trị viên nhóm, bộ phận an toàn nền tảng hoặc cơ quan chức năng khi tình huống nghiêm trọng.',
            'Hỗ trợ nạn nhân: tránh đổ lỗi, tránh chất vấn gây xấu hổ, khuyến khích họ tìm hỗ trợ. Một phản ứng bình tĩnh có thể giảm thiệt hại rất nhiều.',
          ], [
            'Trong nhóm lớp, im lặng đôi khi chưa đủ. Hành động đúng là dừng lan truyền và đưa vấn đề đến người có trách nhiệm.',
          ]),
        ],
        checkpoint: checkpoint('5.2 Kiểm tra nhanh: danh dự và nội dung nhạy cảm', [
          q('Khi thấy ảnh nhạy cảm nghi là ghép của bạn học trong nhóm, việc đầu tiên nên làm là gì?', ['Gửi tiếp để hỏi thật giả.', 'Không lưu, không gửi tiếp và báo người có trách nhiệm.', 'Bình luận đùa cho nhẹ chuyện.', 'Tải về để phân tích kỹ thuật.'], 1),
          q('Vì sao nội dung giả vẫn có thể gây hại thật?', ['Vì người bị nhắm đến vẫn có thể bị xấu hổ, bắt nạt hoặc tổn thương danh dự.', 'Vì mọi người sẽ quên ngay.', 'Vì ảnh giả luôn dễ nhận ra.', 'Vì chỉ người nổi tiếng mới bị ảnh hưởng.'], 0),
          q('Cách giữ bằng chứng nào phù hợp hơn?', ['Phát tán lại nội dung để nhiều người biết.', 'Lưu thông tin nguồn, thời điểm và đường dẫn ở mức cần thiết để báo cáo.', 'Đăng lên trang cá nhân.', 'Gửi cho càng nhiều bạn càng tốt.'], 1),
        ]),
      },
      {
        title: '5.3 Tin giả xã hội và khủng hoảng niềm tin',
        lessons: [
          lesson('5.3.0', 'Khi nội dung đánh vào phẫn nộ', [
            'Một clip ngắn, một câu chú thích mạnh và vài bình luận kích động có thể đủ để khiến đám đông phản ứng trước khi kiểm chứng. Deepfake làm tình huống này khó hơn, nhưng clip thật bị cắt ngữ cảnh cũng nguy hiểm không kém.',
            'Tin giả xã hội thường không yêu cầu bạn chuyển tiền ngay. Nó yêu cầu bạn chia sẻ, lên án, bêu tên, tấn công hoặc đứng về một phía thật nhanh.',
            'Trong bối cảnh này, Deepfense Check giúp bạn chậm lại: tìm nguồn gốc, tìm bản đầy đủ, kiểm tra thời gian, địa điểm, người đăng và động cơ lan truyền.',
          ], [
            'Nội dung càng làm bạn tức giận, càng cần kiểm tra trước khi chia sẻ. Cảm xúc mạnh là nhiên liệu của lan truyền sai lệch.',
          ]),
          lesson('5.3.1', 'Nội dung giả và nội dung thật bị gọi là giả', [
            'Một rủi ro mới là “khủng hoảng niềm tin”: khi deepfake trở nên phổ biến, người ta có thể phủ nhận cả nội dung thật bằng câu “chắc là AI”. Điều này làm nạn nhân thật khó được tin, còn kẻ sai trái có thêm cách né trách nhiệm.',
            'Vì vậy, mục tiêu không phải là hoài nghi mọi thứ. Mục tiêu là hoài nghi có phương pháp: kiểm tra nguồn, bối cảnh, bằng chứng độc lập và mức độ rủi ro trước khi kết luận.',
            'Khi chưa đủ thông tin, cách nói tốt hơn là: “Tôi chưa xác minh được” thay vì “chắc chắn giả” hoặc “chắc chắn thật”.',
          ], [
            'Tư duy phòng vệ tốt không biến bạn thành người phủ nhận mọi thứ. Nó giúp bạn kết luận chậm hơn và có trách nhiệm hơn.',
          ]),
        ],
        checkpoint: null,
      },
      {
        title: '5.4 Quan hệ, việc làm và danh tính số',
        lessons: [
          lesson('5.4.0', 'Khi niềm tin được xây quá nhanh', [
            'Trong quan hệ online, lừa đảo thường bắt đầu bằng sự thân thiết bất thường: trò chuyện liên tục, tỏ ra thấu hiểu, hứa hẹn tương lai, nhưng né gặp trực tiếp hoặc chỉ gọi video rất ngắn.',
            'Sau giai đoạn tạo niềm tin, yêu cầu bắt đầu xuất hiện: gửi tiền vì sự cố, nhận hộ tiền, bấm link nhận quà, gửi ảnh nhạy cảm, gửi giấy tờ hoặc giữ bí mật với gia đình và bạn bè.',
            'Dấu hiệu cần chú ý không chỉ nằm ở khuôn mặt có thật hay không, mà ở nhịp quan hệ: quá nhanh, quá kín, quá nhiều lý do khẩn cấp và quá nhiều yêu cầu khiến bạn mất kiểm soát.',
          ], [
            'Người chỉ quen online nhưng yêu cầu tiền, ảnh nhạy cảm hoặc giấy tờ cá nhân là tình huống rủi ro cao.',
          ]),
          lesson('5.4.1', 'Việc làm, học bổng và cơ hội giả', [
            'AI có thể làm lời mời việc làm hoặc học bổng trông rất chuyên nghiệp: website đẹp, ảnh đại diện đáng tin, email giống tổ chức thật, giấy mời có logo và video giới thiệu được dựng kỹ.',
            'Dấu hiệu đỏ thường là việc nhẹ lương cao, học bổng quá dễ, phí giữ chỗ, phí xử lý hồ sơ, yêu cầu giấy tờ cá nhân quá sớm, email tên miền lạ hoặc chỉ liên hệ qua nhóm chat riêng.',
            'Cách kiểm chứng: tự tìm website chính thức của tổ chức, kiểm tra thông báo tuyển dụng/học bổng từ nguồn gốc, liên hệ qua email hoặc số điện thoại công khai, và không đóng phí vào tài khoản cá nhân lạ.',
          ], [
            'Cơ hội thật có thể cần hồ sơ. Nhưng cơ hội thật không ép bạn nộp phí hoặc gửi giấy tờ nhạy cảm trước khi tổ chức được xác minh.',
          ]),
          lesson('5.4.2', 'Bảo vệ danh tính số cá nhân', [
            'Danh tính số gồm ảnh, giọng nói, tên, số điện thoại, email, giấy tờ, lịch trình, mối quan hệ và thói quen công khai. Càng nhiều dữ liệu lộ ra, kẻ xấu càng dễ dựng một phiên bản thuyết phục của bạn.',
            'Bạn không cần biến mình thành vô hình. Bạn cần giảm dữ liệu dễ bị lạm dụng: hạn chế đăng giấy tờ, vé máy bay, lịch trình, số điện thoại, email chính; kiểm tra quyền riêng tư; bật xác thực hai lớp; dùng mật khẩu riêng cho tài khoản quan trọng.',
            'Nếu tài khoản bị chiếm quyền, hãy cảnh báo người thân và bạn bè qua kênh khác càng sớm càng tốt. Một lời cảnh báo sớm có thể chặn nhiều yêu cầu mạo danh tiếp theo.',
          ], [
            'Bảo vệ danh tính số là giảm vật liệu mà người khác có thể dùng để giả làm bạn.',
          ]),
        ],
        checkpoint: null,
      },
      {
        title: '5.5 Thực hành: bản đồ rủi ro đời sống số',
        lessons: [
          lesson('5.5.0', 'Cách làm bài thực hành', [
            'Với mỗi tình huống, hãy xác định bốn thành phần: vùng rủi ro chính, dấu hiệu đỏ, bước Deepfense Check quan trọng nhất và hành động an toàn.',
            'Bài thực hành này không yêu cầu bạn chứng minh nội dung là thật hay giả. Nó yêu cầu bạn chọn phản ứng làm giảm thiệt hại cho bản thân và người khác.',
          ], [
            'Trong đời sống số, phản ứng đúng thường bắt đầu bằng một câu rất ngắn: dừng lại trước đã.',
          ]),
          lesson('5.5.1', 'Năm tình huống luyện tập', [
            'Tình huống 1: Video người nổi tiếng kêu gọi đầu tư, đăng bởi tài khoản không chính thức, có link trong mô tả. Vùng rủi ro: tài chính. Hành động an toàn: không bấm link, kiểm tra kênh chính thức và thông tin pháp lý.',
            'Tình huống 2: Ảnh nhạy cảm được nói là của bạn học lan trong nhóm lớp. Vùng rủi ro: danh dự và an toàn cá nhân. Hành động an toàn: không lưu, không gửi tiếp, báo người có trách nhiệm.',
            'Tình huống 3: Clip 10 giây gây phẫn nộ, không có nguồn gốc, kêu gọi bêu tên. Vùng rủi ro: tin giả xã hội. Hành động an toàn: không chia sẻ, truy nguồn, không tham gia tấn công cá nhân.',
            'Tình huống 4: Người quen online hai tuần xin tiền vì sự cố và yêu cầu giữ bí mật. Vùng rủi ro: quan hệ và danh tính giả. Hành động an toàn: không chuyển tiền, trao đổi với người tin cậy, xác minh qua kênh độc lập.',
            'Tình huống 5: Lời mời việc nhẹ lương cao yêu cầu phí giữ chỗ và ảnh căn cước. Vùng rủi ro: việc làm giả và thu thập dữ liệu. Hành động an toàn: kiểm tra tổ chức chính thức, không nộp phí hoặc gửi giấy tờ khi chưa xác minh.',
          ], [
            'Điểm chung của năm tình huống là có người muốn bạn hành động nhanh trước khi kiểm tra đủ.',
          ]),
        ],
        checkpoint: checkpoint('5.5 Kiểm tra cuối module', [
          q('Một clip ngắn gây phẫn nộ không có nguồn gốc rõ ràng. Phản ứng phù hợp nhất là gì?', ['Chia sẻ ngay để cảnh báo mọi người.', 'Không chia sẻ, truy nguồn và tránh bêu tên.', 'Bình luận thật mạnh để gây chú ý.', 'Tải về rồi gửi vào nhiều nhóm.'], 1),
          q('Trong quan hệ online, dấu hiệu nào cho thấy rủi ro cao?', ['Người kia tôn trọng việc xác minh.', 'Người kia quen chưa lâu nhưng xin tiền và yêu cầu giữ bí mật.', 'Người kia không hỏi thông tin cá nhân.', 'Người kia đồng ý gặp ở nơi công cộng.'], 1),
          q('Lời mời việc làm nào đáng nghi nhất?', ['Có thông tin công khai trên website chính thức.', 'Yêu cầu phí giữ chỗ và ảnh căn cước trước khi xác minh tổ chức.', 'Có quy trình phỏng vấn rõ ràng.', 'Dùng email tên miền chính thức của tổ chức.'], 1),
          q('Câu nào thể hiện tư duy Deepfense tốt nhất?', ['Không tin bất kỳ nội dung nào trên Internet.', 'Chỉ tin khi video có nhiều lượt xem.', 'Kiểm tra nguồn, bối cảnh và yêu cầu hành động trước khi quyết định.', 'Thấy nghi thì kết luận ngay là AI.'], 2),
        ]),
      },
    ],
    quiz: [
      q('Trong Module 5, vì sao deepfake được xem là một rủi ro đời sống số?', ['Vì nó chỉ xuất hiện trong phim.', 'Vì nó có thể gắn với tiền bạc, danh dự, quan hệ, tin tức và danh tính cá nhân.', 'Vì nó luôn dễ nhận ra.', 'Vì nó không liên quan đến hành vi con người.'], 1),
      q('Bốn tín hiệu hành vi quan trọng cần chú ý là gì?', ['Màu sắc, âm lượng, độ dài, độ phân giải.', 'Gấp gáp, cô lập, áp lực cảm xúc, chuyển hướng kiểm soát.', 'Like, share, comment, follow.', 'Tên file, dung lượng, thiết bị, trình duyệt.'], 1),
      q('Khi có yêu cầu chuyển tiền từ người quen qua giọng nói hoặc video, bước quan trọng nhất là gì?', ['Verify qua kênh độc lập.', 'Tin vào cảm giác thân quen.', 'Hỏi thêm trong cùng cuộc gọi.', 'Chuyển khoản thử một ít.'], 0),
      q('Với nội dung nhạy cảm nghi là ghép của người khác, hành động nào đúng nhất?', ['Không lưu, không gửi tiếp, báo người có trách nhiệm.', 'Gửi cho bạn thân kiểm tra.', 'Đăng lại để hỏi cộng đồng.', 'Bình luận đùa để giảm căng thẳng.'], 0),
      q('Một nội dung gây phẫn nộ thường cần được xử lý thế nào?', ['Chia sẻ trước, kiểm tra sau.', 'Kiểm tra nguồn và bối cảnh trước khi chia sẻ.', 'Tin nếu nhiều người đang tức giận.', 'Bêu tên người trong clip ngay.'], 1),
      q('“Nội dung thật bị gọi là giả” nguy hiểm vì điều gì?', ['Vì nó làm suy yếu niềm tin và có thể giúp người sai né trách nhiệm.', 'Vì mọi nội dung thật đều vô hại.', 'Vì không ai cần bằng chứng.', 'Vì AI không thể tạo nội dung giả.'], 0),
      q('Trong lời mời học bổng hoặc việc làm, dấu hiệu đỏ là gì?', ['Thông tin minh bạch trên website chính thức.', 'Phí giữ chỗ, yêu cầu giấy tờ quá sớm và tên miền liên hệ lạ.', 'Quy trình xét duyệt rõ ràng.', 'Có người phụ trách công khai.'], 1),
      q('Bảo vệ danh tính số nghĩa là gì?', ['Xóa toàn bộ Internet.', 'Giảm dữ liệu dễ bị lạm dụng để mạo danh bạn.', 'Đăng càng nhiều càng tốt.', 'Chỉ đổi ảnh đại diện.'], 1),
    ],
  },

  {
    id: 6, part: 'protection',
    title: 'Phòng vệ cá nhân và cộng đồng',
    duration: '90-105 phút', level: 'Intermediate',
    scenario: 'Sau khi học cách nhận diện rủi ro, An nhận ra một điều quan trọng: an toàn số không thể chỉ là kiến thức nằm trong đầu. Nó cần trở thành quy tắc trước khi sự cố xảy ra, đặc biệt với gia đình, lớp học, nhóm làm việc và cộng đồng online. Module 6 giúp người học biến Deepfense Check thành thói quen phòng vệ có thể dùng ngay.',
    outcomes: [
      'Thiết lập được bộ quy tắc Deepfense Shield cho bản thân, gia đình hoặc nhóm làm việc.',
      'Biết giảm dữ liệu cá nhân dễ bị dùng để mạo danh: ảnh, giọng nói, giấy tờ, tài khoản và lịch trình.',
      'Biết lưu bằng chứng, báo cáo và hỗ trợ người bị hại mà không làm nội dung gây hại lan rộng hơn.',
      'Hoàn thành capstone tổng hợp trước khi bước sang bài kiểm tra cuối khóa.',
    ],
    sections: [
      {
        title: '6.0 Từ nhận diện sang phòng vệ',
        lessons: [
          lesson('6.0.0', 'Kiến thức chỉ hữu ích khi thành quy tắc', [
            'Một người biết kiểm tra deepfake có thể tự bảo vệ mình tốt hơn. Nhưng trong đời sống thật, rủi ro thường đi qua người thân, bạn bè, đồng nghiệp hoặc nhóm chat trước khi đến bạn.',
            'Nếu gia đình chưa có cách xác minh khi có cuộc gọi cầu cứu, nếu lớp học chưa có quy tắc dừng phát tán ảnh nhạy cảm, nếu nhóm làm việc vẫn cho phép chuyển tiền ngoài quy trình, kiến thức cá nhân chưa đủ để tạo an toàn chung.',
            'Module này chuyển trọng tâm từ “tôi nhận ra dấu hiệu gì” sang “chúng ta đã chuẩn bị quy tắc gì để không hoảng loạn khi sự cố xảy ra”.',
          ], [
            'Phòng vệ tốt không bắt đầu ở lúc hoảng. Phòng vệ tốt bắt đầu từ quy tắc đã thống nhất trước.',
          ]),
        ],
        checkpoint: null,
      },
      {
        title: '6.1 Deepfense Shield',
        lessons: [
          lesson('6.1.0', 'Năm quy tắc nền tảng', [
            'Deepfense Shield là bộ quy tắc ngắn để dùng trong đời sống hằng ngày: Family Code, Money Delay, Two-Channel Rule, No Shame Reporting và Evidence First.',
            'Family Code là câu xác minh riêng giữa những người tin cậy. Nó không nên là ngày sinh, tên thú cưng công khai, địa chỉ nhà hoặc thông tin có thể đoán từ mạng xã hội. Một Family Code tốt cần dễ nhớ, ít người biết, có thể đổi khi nghi bị lộ và được thống nhất trước.',
            'Money Delay là khoảng dừng bắt buộc trước yêu cầu tiền bạc bất thường. Với chuyển khoản, OTP, đầu tư, phí giữ chỗ hoặc tài khoản nhận tiền lạ, nguyên tắc là chậm lại để xác minh. Kẻ lừa đảo cần tốc độ; người an toàn cần quy trình.',
            'Two-Channel Rule yêu cầu kiểm tra qua kênh độc lập thứ hai khi tình huống liên quan đến tiền, tài khoản, giấy tờ, danh dự hoặc nội dung nhạy cảm. Tin nhắn có thể đi kèm cuộc gọi đến số đã lưu; email có thể được xác nhận qua kênh nội bộ; video đầu tư cần được đối chiếu với kênh chính thức.',
            'No Shame Reporting nghĩa là báo sớm mà không làm nạn nhân xấu hổ. Evidence First nghĩa là lưu thông tin cần thiết trước khi xóa, chặn hoặc báo cáo, nhưng không phát tán lại nội dung gây hại.',
          ], [
            'Deepfense Shield không làm cuộc sống phức tạp hơn. Nó giảm số quyết định phải đưa ra trong lúc căng thẳng.',
          ]),
          lesson('6.1.1', 'Áp dụng Shield trong bốn môi trường', [
            'Gia đình: thống nhất Family Code, lưu số điện thoại quan trọng, quy định mọi yêu cầu tiền gấp đều phải gọi lại số cũ hoặc xác minh qua người thân khác.',
            'Trường học: không lưu và không gửi tiếp ảnh nhạy cảm; báo giáo viên, phụ huynh hoặc người phụ trách; không bêu tên người trong clip chưa xác minh; khuyến khích báo sớm mà không đổ lỗi.',
            'Công việc: không chuyển tiền ngoài quy trình; không gửi dữ liệu nhạy cảm qua kênh lạ; xác nhận yêu cầu từ cấp trên bằng kênh nội bộ; báo bộ phận phụ trách khi nghi tài khoản bị chiếm quyền.',
            'Mạng xã hội: không chia sẻ clip gây sốc khi chưa rõ nguồn; không bấm link đầu tư, quà tặng hoặc đăng nhập từ video lạ; báo cáo tài khoản mạo danh; cảnh báo bạn bè bằng thông tin đã kiểm chứng.',
          ], [
            'Một quy tắc tốt phải đủ đơn giản để mọi người nhớ được khi đang bị thúc ép.',
          ]),
        ],
        checkpoint: checkpoint('6.1 Kiểm tra nhanh: Deepfense Shield', [
          q('Family Code dùng để làm gì?', ['Đăng công khai cho mọi người biết.', 'Xác minh nhanh trong tình huống khẩn cấp giữa những người tin cậy.', 'Thay thế hoàn toàn ngân hàng.', 'Tăng lượt thích trên mạng xã hội.'], 1),
          q('Money Delay nghĩa là gì?', ['Chuyển tiền càng nhanh càng tốt.', 'Trì hoãn bắt buộc để xác minh trước yêu cầu tiền bất thường.', 'Không bao giờ chuyển tiền cho ai.', 'Chỉ chuyển tiền vào ban đêm.'], 1),
          q('Tình huống nào cần Two-Channel Rule?', ['Người quen nhắn mượn tiền qua tài khoản có hành vi lạ.', 'Đổi hình nền điện thoại.', 'Đọc bài giải trí không yêu cầu hành động.', 'Xem ảnh minh họa được ghi rõ là AI.'], 0),
          q('No Shame Reporting nhấn mạnh điều gì?', ['Báo sớm, không đổ lỗi hoặc làm nạn nhân xấu hổ.', 'Im lặng vì sợ bị chê.', 'Đăng mọi thứ lên mạng để gây chú ý.', 'Chỉ báo cáo khi đã chắc chắn 100%.'], 0),
        ], {
          type: 'sort-cards',
          title: 'Phân loại đường link',
          instruction: 'Kéo hoặc nhấn từng URL vào đúng nhóm',
          reward: 10,
          data: {
            buckets: [
              { id: 'real', label: 'Thật', icon: '🔒' },
              { id: 'suspicious', label: 'Đáng nghi', icon: '🤔' },
              { id: 'fake', label: 'Giả mạo', icon: '🚫' },
            ],
            cards: [
              { id: 'u1', text: 'https://vietcombank.com.vn/login', bucket: 'real' },
              { id: 'u2', text: 'https://vietc0mbank-secure.com/login', bucket: 'fake' },
              { id: 'u3', text: 'https://momo.vn/khuyen-mai', bucket: 'real' },
              { id: 'u4', text: 'http://momo-uudai.tk/nhan-thuong', bucket: 'fake' },
              { id: 'u5', text: 'https://bit.ly/3xK9aZq (rút gọn — không rõ đích)', bucket: 'suspicious' },
              { id: 'u6', text: 'https://shopee.vn.security-update.net/account', bucket: 'fake' },
            ],
          },
        }),
      },
      {
        title: '6.2 Vệ sinh dữ liệu cá nhân',
        lessons: [
          lesson('6.2.0', 'Dữ liệu cá nhân là vật liệu của mạo danh', [
            'Kẻ xấu không cần biết tất cả về bạn. Chúng chỉ cần đủ mảnh ghép để dựng một câu chuyện đáng tin: ảnh khuôn mặt, đoạn giọng nói, tên người thân, trường học, nơi làm việc, lịch trình, giấy tờ, số điện thoại, email hoặc tài khoản đang dùng.',
            'Vệ sinh dữ liệu cá nhân không có nghĩa là biến mất khỏi Internet. Nó nghĩa là giảm những thông tin không cần thiết, đặc biệt là dữ liệu có thể dùng để mở tài khoản, khôi phục mật khẩu, giả danh bạn hoặc thuyết phục người thân của bạn.',
            'Hãy rà soát định kỳ: thông tin công khai trên mạng xã hội, ảnh giấy tờ, vé máy bay, lịch trình, số điện thoại, email chính, ảnh/video giọng nói dài, danh sách bạn bè và quyền riêng tư của bài đăng cũ.',
          ], [
            'Bảo vệ danh tính số là giảm vật liệu mà người khác có thể dùng để đóng vai bạn.',
          ]),
          lesson('6.2.1', 'Bảo vệ tài khoản và phản ứng khi bị chiếm quyền', [
            'Tài khoản bị chiếm quyền có thể được dùng để lừa người khác ngay cả khi không có deepfake. Vì vậy, bảo vệ tài khoản là một phần của phòng vệ trước mạo danh.',
            'Các bước cơ bản: dùng mật khẩu riêng cho tài khoản quan trọng, bật xác thực hai lớp, cập nhật email và số điện thoại khôi phục, kiểm tra thiết bị đăng nhập lạ, không nhập mật khẩu qua link trong tin nhắn, và cảnh giác với trang đăng nhập giả.',
            'Nếu tài khoản bị chiếm quyền, hãy khôi phục qua kênh chính thức, đổi mật khẩu email liên quan, đăng xuất thiết bị lạ nếu có thể, báo nền tảng, và cảnh báo người thân qua kênh khác rằng họ không nên tin các tin nhắn mượn tiền hoặc xin mã xác thực từ tài khoản đó.',
          ], [
            'Một cảnh báo sớm cho người thân có thể chặn nhiều vụ mạo danh tiếp theo.',
          ]),
        ],
        checkpoint: checkpoint('6.2 Kiểm tra nhanh: dữ liệu và tài khoản', [
          q('Điều nào KHÔNG nên dùng làm Family Code?', ['Một cụm từ riêng gia đình tự đặt.', 'Một câu xác minh không công khai.', 'Ngày sinh đã đăng công khai trên mạng xã hội.', 'Một quy ước gọi lại số cũ.'], 2),
          q('Vì sao cần hạn chế đăng giấy tờ hoặc lịch trình công khai?', ['Vì dữ liệu đó có thể bị dùng để mạo danh hoặc dựng kịch bản lừa đảo.', 'Vì mọi bài đăng công khai đều sai.', 'Vì Internet không cho đăng ảnh.', 'Vì deepfake chỉ cần màu ảnh.'], 0),
          q('Nếu tài khoản bị chiếm quyền, việc nên làm sớm là gì?', ['Im lặng chờ tự hết.', 'Cảnh báo người thân qua kênh khác và khôi phục qua kênh chính thức.', 'Chuyển thêm tiền cho tài khoản đó.', 'Đăng mật khẩu mới lên trang cá nhân.'], 1),
        ]),
      },
      {
        title: '6.3 Báo cáo, bằng chứng và hỗ trợ người bị hại',
        lessons: [
          lesson('6.3.0', 'Lưu bằng chứng để xử lý, không phải để lan truyền', [
            'Bằng chứng hữu ích có thể gồm đường link, tên tài khoản, số điện thoại, số tài khoản, thời gian, nội dung tin nhắn, ảnh chụp màn hình vừa đủ thông tin, mã giao dịch hoặc tên miền nghi vấn.',
            'Điểm quan trọng là mục đích. Lưu bằng chứng để báo nền tảng, liên hệ ngân hàng, trình báo khi cần hoặc cảnh báo nhóm nhỏ có liên quan. Không dùng bằng chứng để bêu tên, kích động đám đông hoặc phát tán lại nội dung nhạy cảm.',
            'Với ảnh hoặc video nhạy cảm, nếu bạn không phải người có trách nhiệm xử lý, hãy ưu tiên báo cáo nền tảng hoặc người phụ trách. Không lưu trữ thêm, không gửi cho bạn bè để “xác minh”, không biến nạn nhân thành chủ đề bàn tán.',
          ], [
            'Bằng chứng tốt giúp xử lý sự cố. Bằng chứng bị phát tán sai cách có thể trở thành một phần của sự cố.',
          ]),
          lesson('6.3.1', 'Ngôn ngữ hỗ trợ người bị hại', [
            'Cách bạn nói có thể quyết định người bị hại có dám báo sớm hay không. Thay vì “sao bạn dễ tin vậy?”, hãy nói “mình xử lý từng bước nhé”. Thay vì “có thật không?”, hãy nói “đừng gửi tiếp, mình tìm cách báo cáo”.',
            'Hỗ trợ tốt gồm ba việc: giúp người bị hại bình tĩnh, giảm lan truyền, và đưa sự việc đến đúng nơi xử lý. Hỗ trợ kém thường làm tăng xấu hổ, khiến nạn nhân im lặng hoặc làm nội dung lan rộng hơn.',
            'Trong cộng đồng an toàn, báo cáo sớm là hành động có trách nhiệm, không phải điều đáng xấu hổ.',
          ], [
            'Không đổ lỗi là một phần của an toàn số. Người bị hại càng ít xấu hổ, sự cố càng dễ được xử lý sớm.',
          ]),
        ],
        checkpoint: null,
      },
      {
        title: '6.4 Capstone: hồ sơ sự việc của An',
        lessons: [
          lesson('6.4.0', 'Bối cảnh hồ sơ', [
            'An nhận một video 18 giây: một người nổi tiếng nói đang hợp tác với nền tảng đầu tư mới. Tài khoản đăng có tên gần giống tài khoản chính thức, không có dấu xác minh, mô tả có link rút gọn.',
            'Một người bạn cũ nhắn: “Mình tham gia rồi, nhận tiền thật. Đăng ký nhanh đi”. Khi An hỏi gọi điện được không, người đó né tránh và bảo An cứ bấm link.',
            'Dưới video có nhiều bình luận khen nhận tiền, nhưng không có nguồn kiểm chứng. Một tin nhắn thoại nghe giống bạn cũ nói cơ hội chỉ còn trong tối nay. Công cụ phát hiện AI không báo dấu hiệu rõ ràng. Kênh chính thức của người nổi tiếng không nhắc gì đến nền tảng này, còn khi tìm tên nền tảng thì thấy vài cảnh báo lừa đảo.',
          ], [
            'Hồ sơ này tổng hợp gần như toàn khóa: mạo danh, deepvoice, social engineering, giới hạn detector, link lạ và áp lực thời gian.',
          ]),
          lesson('6.4.1', 'Cách phân tích capstone', [
            'Phân loại: video có thể là deepfake hoặc video mạo danh; tin nhắn bạn cũ có thể là tài khoản bị chiếm quyền; bình luận có thể là seeding; tin nhắn thoại có thể là deepvoice hoặc tài khoản bị lạm dụng; detector chỉ là tín hiệu tham khảo.',
            'Red flags: người nổi tiếng kêu gọi đầu tư, tài khoản không chính thức, link rút gọn, lời hứa thu nhập, bạn cũ né gọi điện, áp lực “chỉ còn tối nay”, bình luận không kiểm chứng, kênh chính thức im lặng, có cảnh báo lừa đảo từ nguồn khác.',
            'Deepfense Check: Pause vì liên quan đến tiền và áp lực thời gian. Observe các dấu hiệu bất thường. Verify qua kênh chính thức và liên hệ bạn cũ bằng kênh khác. Trace tên miền, nguồn video, tài khoản đăng và cảnh báo độc lập. Decide: không bấm link, không nạp tiền, cảnh báo người có liên quan và báo cáo nếu cần.',
          ], [
            'Không cần chứng minh chắc chắn video là deepfake mới được từ chối. Tổng rủi ro đã đủ cao để dừng lại.',
          ]),
          lesson('6.4.2', 'Kết luận khóa học', [
            'DEEPFENSE BASIC không dạy bạn sống trong nghi ngờ. Khóa học dạy bạn có phương pháp khi nội dung số cố làm bạn mất phương pháp.',
            'Sau khóa này, người học cần nhớ ba năng lực lõi: nhận diện tín hiệu rủi ro, xác minh qua kênh độc lập, và chọn hành động giảm thiệt hại cho bản thân lẫn người khác.',
            'Bài kiểm tra cuối khóa sẽ đánh giá khả năng áp dụng, không chỉ ghi nhớ thuật ngữ. Hãy ưu tiên tư duy: nguồn ở đâu, ai được lợi, mình bị yêu cầu làm gì, có kênh xác minh độc lập không, và hành động nào ít gây hại nhất.',
          ], [
            'An toàn số là một thói quen. Mỗi lần bạn chậm lại đúng lúc, bạn đang làm Internet khó bị lợi dụng hơn một chút.',
          ]),
        ],
        checkpoint: checkpoint('6.4 Kiểm tra cuối module', [
          q('Trong hồ sơ capstone, vì sao kết quả detector “không phát hiện rõ” chưa đủ để tin nội dung?', ['Vì detector chỉ là một tín hiệu tham khảo và ngữ cảnh vẫn có nhiều dấu hiệu lừa đảo.', 'Vì detector luôn sai.', 'Vì video ngắn luôn thật.', 'Vì bình luận tích cực đã đủ chứng minh.'], 0),
          q('Hành động phù hợp nhất với link đầu tư trong hồ sơ là gì?', ['Bấm link để kiểm tra nhanh.', 'Không bấm link, kiểm tra kênh chính thức và nguồn độc lập.', 'Nạp thử một khoản nhỏ.', 'Gửi link cho nhiều người cùng xem.'], 1),
          q('Điều gì thể hiện kết luận đúng của capstone?', ['Chắc chắn video thật vì không thấy lỗi kỹ thuật.', 'Không cần kết luận tuyệt đối về deepfake để chọn phương án an toàn.', 'Cứ tin nếu bạn cũ gửi.', 'Chỉ cần xem bình luận là đủ.'], 1),
        ]),
      },
      {
        title: '6.5 Bài kiểm tra cuối khóa',
        lessons: [
          {
            id: 'final-exam',
            title: 'DEEPFENSE BASIC — Bài kiểm tra cuối khóa',
            type: 'exam',
            paragraphs: [],
            takeaways: [],
          },
        ],
        checkpoint: null,
      },
    ],
    quiz: [
      q('Mục tiêu chính của Deepfense Shield là gì?', ['Làm người học sợ Internet.', 'Biến kiến thức thành quy tắc phòng vệ dễ áp dụng trong đời sống.', 'Dạy tạo deepfake.', 'Thay thế mọi cơ quan chức năng.'], 1),
      q('Family Code tốt nên có đặc điểm nào?', ['Dễ nhớ, không công khai, được thống nhất trước và có thể thay đổi khi nghi bị lộ.', 'Là ngày sinh đăng công khai.', 'Là tên trường học trên hồ sơ.', 'Là mật khẩu ngân hàng.'], 0),
      q('Money Delay giúp chống lại yếu tố nào của lừa đảo?', ['Tốc độ và áp lực hành động ngay.', 'Màu sắc của video.', 'Độ dài bình luận.', 'Dung lượng ảnh.'], 0),
      q('Two-Channel Rule phù hợp nhất khi nào?', ['Khi yêu cầu liên quan đến tiền, tài khoản, giấy tờ hoặc danh dự.', 'Khi đổi ảnh nền.', 'Khi đọc tin giải trí.', 'Khi xem video đã ghi rõ là minh họa.'], 0),
      q('Evidence First nghĩa là gì?', ['Lưu bằng chứng an toàn để xử lý, không phát tán lại nội dung gây hại.', 'Đăng bằng chứng lên mọi nhóm.', 'Xóa hết ngay không ghi nhận gì.', 'Chỉ kể lại bằng trí nhớ.'], 0),
      q('No Shame Reporting giúp điều gì?', ['Giảm xấu hổ để người bị hại dám báo sớm.', 'Tăng bình luận đổ lỗi.', 'Khiến nạn nhân im lặng hơn.', 'Biến sự cố thành trò đùa.'], 0),
      q('Vệ sinh dữ liệu cá nhân nhằm mục tiêu gì?', ['Giảm dữ liệu có thể bị dùng để mạo danh hoặc dựng kịch bản lừa đảo.', 'Xóa toàn bộ Internet.', 'Đăng nhiều thông tin hơn.', 'Chỉ đổi màu giao diện tài khoản.'], 0),
      q('Trong capstone, lựa chọn an toàn nhất là gì?', ['Không bấm link, không nạp tiền, xác minh qua kênh chính thức và nguồn độc lập.', 'Nạp thử một khoản nhỏ.', 'Tin vì có bình luận tích cực.', 'Chia sẻ video để hỏi thật giả.'], 0),
    ],
  },

];

// ── HELPERS FOR NAVIGATION ───────────────────────────────────────
export function buildLessonIndex() {
  const index = [];
  for (const mod of MODULES) {
    for (const sec of mod.sections) {
      for (const les of sec.lessons) {
        index.push({ moduleId: mod.id, module: mod, sectionTitle: sec.title, lesson: les, checkpoint: sec.checkpoint });
      }
    }
  }
  return index;
}
