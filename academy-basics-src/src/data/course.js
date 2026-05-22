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
        ]),
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
        ]),
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
    title: 'Deepfake len lỏi vào mọi vấn đề số',
    duration: '125-135 phút', level: 'Recognition',
    scenario: 'An đã có quy trình Deepfense Check, nhưng Internet không chỉ có một kiểu rủi ro. Từ video đầu tư của người nổi tiếng, tin nhắn mượn tiền từ bạn cũ, ảnh nhạy cảm trong nhóm lớp, đến clip gây phẫn nộ trong nhóm gia đình và tin nhắn từ tài khoản hẹn hò mới quen — mỗi tình huống trông khác nhau nhưng đều có chung một điểm: có người muốn An tin nhanh, hành động nhanh, và không kiểm chứng.',
    outcomes: [
      'Nhận diện được các kịch bản lừa đảo tài chính có sử dụng deepfake, deepvoice hoặc nội dung giả mạo.',
      'Biết áp dụng quy tắc an toàn khi gặp yêu cầu chuyển tiền, OTP, mật khẩu, giấy tờ hoặc cài ứng dụng.',
      'Hiểu rủi ro của deepfake trong học đường, danh dự cá nhân và hình ảnh nhạy cảm.',
      'Biết cách phản ứng có trách nhiệm khi gặp nội dung nhạy cảm hoặc nội dung có thể làm hại người khác.',
      'Hiểu vai trò của deepfake trong tin giả xã hội và hiện tượng "nội dung thật bị gọi là giả".',
      'Nhận diện rủi ro trong tình cảm, việc làm, học bổng, đầu tư và danh tính số.',
    ],
    sections: [
      {
        title: '5.0 Câu chuyện dẫn nhập: Một ngày của An chưa kết thúc',
        lessons: [
          lesson('5.0.0', 'Một ngày của An chưa kết thúc', [
            'An đã có quy trình Deepfense Check. Nhưng Internet không chỉ có một kiểu rủi ro.',
            'Một buổi sáng, An thấy video người nổi tiếng quảng cáo đầu tư. Buổi trưa, một người bạn cũ nhắn mượn tiền. Buổi chiều, nhóm lớp lan truyền hình ảnh nhạy cảm của một bạn học. Buổi tối, một clip xã hội gây phẫn nộ xuất hiện trong nhóm gia đình. Đêm muộn, An nhận tin nhắn từ một tài khoản hẹn hò mới quen.',
            'Mỗi tình huống trông khác nhau. Nhưng chúng có điểm chung: có người muốn An tin nhanh, có người muốn An hành động nhanh, có người được lợi nếu An không kiểm chứng, và có người có thể bị hại nếu An chia sẻ sai.',
            'Module 5 sẽ giúp bạn nhìn thấy deepfake không phải như một thủ thuật công nghệ, mà như một lớp rủi ro có thể len vào nhiều vấn đề số hằng ngày.',
          ], [
            'Deepfake không phải chỉ là một loại rủi ro. Nó có thể xuất hiện trong tiền bạc, danh dự, tình cảm, việc làm, tin tức và xã hội.',
            'Câu hỏi không phải là "tôi có gặp deepfake không?" mà là "tôi sẽ phản ứng thế nào khi gặp?"',
          ]),
        ],
        checkpoint: null,
      },
      {
        title: '5.1 Lừa đảo tài chính và mạo danh',
        lessons: [
          lesson('5.1.0', 'Mục tiêu bài học 5.1', [
            'Sau phần 5.1, bạn sẽ nhận diện được các kịch bản lừa đảo tài chính có dùng mạo danh bằng hình ảnh, giọng nói hoặc video.',
            'Bạn sẽ hiểu vì sao deepfake làm lừa đảo tài chính thuyết phục hơn, biết các dấu hiệu đỏ trong yêu cầu tiền, OTP, tài khoản và ứng dụng, và biết phản ứng an toàn trước khi thiệt hại xảy ra.',
          ], [
            'Mỗi kịch bản lừa đảo tài chính đều có dấu hiệu đỏ riêng. Nhận ra chúng là bước đầu tiên để không bị lừa.',
          ]),
          lesson('5.1.1', 'Kịch bản 1: Người thân cần tiền gấp', [
            'Đây là kịch bản rất phổ biến vì nó đánh vào tình cảm. Bạn có thể nhận cuộc gọi giống người thân, tin nhắn thoại giống người thân, cuộc gọi video ngắn hình mờ âm thanh vỡ, hoặc tin nhắn từ tài khoản thật của người thân nhưng đã bị chiếm quyền.',
            'Nội dung thường là: "Con đang gặp tai nạn.", "Mẹ đang cần tiền gấp.", "Em bị mất ví, chuyển giúp em.", "Đừng gọi cho ai khác.", "Chuyển vào tài khoản này trước."',
            'Dấu hiệu đỏ: yêu cầu chuyển tiền ngay, không cho gọi lại, không nói rõ địa điểm, tài khoản nhận tiền là tên người lạ, bảo giữ bí mật, dùng số mới hoặc tài khoản mới.',
            'Deepfense Check — Pause: dừng trước khi chuyển tiền. Observe: có khẩn cấp, thân quen, cô lập, tài khoản lạ không? Verify: gọi số đã lưu, gọi người thân khác, dùng family code nếu có. Decide: không chuyển tiền khi chưa xác minh.',
          ], [
            'Với yêu cầu tiền khẩn cấp từ người thân: gọi lại số đã lưu hoặc xác minh qua người thân khác trước khi chuyển.',
          ]),
          lesson('5.1.2', 'Kịch bản 2: Sếp, giáo viên hoặc người phụ trách yêu cầu xử lý gấp', [
            'Trong công việc hoặc trường học, kẻ xấu có thể giả danh người có thẩm quyền. Ví dụ: "Anh là sếp đây, chuyển khoản này trước 3 giờ.", "Cô cần em gửi danh sách thông tin cá nhân ngay.", "Phòng tài chính cần đổi tài khoản nhận tiền.", "Việc này gấp, bỏ qua quy trình hôm nay."',
            'Deepfake hoặc deepvoice làm kịch bản này nguy hiểm hơn vì giọng nói hoặc video có thể khiến người nghe tin đó đúng là sếp, giáo viên hoặc người phụ trách.',
            'Dấu hiệu đỏ: yêu cầu bỏ qua quy trình, dùng kênh lạ, chuyển tiền hoặc gửi dữ liệu nhạy cảm, không cho xác nhận với người khác, đổi tài khoản nhận tiền đột ngột, câu chữ tạo áp lực như "chịu trách nhiệm", "làm ngay", "đừng hỏi nhiều".',
            'Deepfense Check — Pause: việc gấp không tự động hợp lệ. Verify: xác minh qua kênh nội bộ chính thức. Trace: kiểm tra lịch sử yêu cầu, email gốc, tài khoản nhận tiền. Decide: không chuyển tiền hoặc gửi dữ liệu nếu chưa qua quy trình xác nhận.',
          ], [
            'Việc gấp không có nghĩa là được bỏ qua quy trình. Xác minh qua kênh nội bộ chính thức trước khi hành động.',
          ]),
          lesson('5.1.3', 'Kịch bản 3: Giả danh ngân hàng, công an, cơ quan chức năng', [
            'Kịch bản này đánh vào nỗi sợ và quyền lực. Người gọi có thể nói: "Tài khoản của bạn có giao dịch bất thường.", "Bạn liên quan đến một vụ án.", "Bạn cần chứng minh mình trong sạch.", "Cài ứng dụng này để làm việc với cơ quan chức năng.", "Đọc mã OTP để chúng tôi khóa giao dịch."',
            'Nếu có giọng nói, hình ảnh hoặc video trông đáng tin, nạn nhân càng dễ hoảng và làm theo yêu cầu.',
            'Dấu hiệu đỏ: yêu cầu OTP, mật khẩu hoặc mã xác minh; yêu cầu cài app qua link; yêu cầu chuyển tiền vào "tài khoản an toàn"; đe dọa pháp lý qua cuộc gọi; không cho tự gọi tổng đài chính thức; giữ cuộc gọi lâu không cho hỏi người khác.',
            'Deepfense Check — Pause: không xử lý tài khoản, pháp lý, OTP trong hoảng loạn. Verify: tự gọi tổng đài chính thức hoặc liên hệ trực tiếp cơ quan qua kênh công khai đáng tin. Decide: không đọc OTP, không cài app lạ, không chuyển tiền theo hướng dẫn cuộc gọi.',
          ], [
            'Ngân hàng, công an và cơ quan chức năng không yêu cầu OTP, mật khẩu hoặc cài app qua cuộc gọi.',
            'Nếu nghi ngờ, hãy tự gọi tổng đài chính thức — không dùng số họ cung cấp trong cuộc gọi.',
          ]),
          lesson('5.1.4', 'Kịch bản 4: Người nổi tiếng kêu gọi đầu tư', [
            'Đây là kịch bản dùng niềm tin vào danh tiếng. Video có thể cho thấy người nổi tiếng nói: "Tôi đang dùng nền tảng này.", "Tôi muốn chia sẻ cơ hội cho người theo dõi.", "Đầu tư ít, lợi nhuận ổn định.", "Số lượng có hạn."',
            'Kẻ xấu có thể kết hợp: video deepfake, giọng nói giả, trang web giả, bình luận seeding, ảnh chụp chuyển khoản giả và tài khoản nhái.',
            'Dấu hiệu đỏ: lợi nhuận cao rủi ro thấp hoặc chắc chắn, link đăng ký ngoài kênh chính thức, tài khoản đăng không xác minh, bình luận quá giống nhau, không có thông tin pháp lý rõ, thúc giục nạp tiền nhanh.',
            'Deepfense Check — Pause: lời hứa tài chính càng hấp dẫn càng cần chậm lại. Verify: kiểm tra kênh chính thức của người nổi tiếng hoặc tổ chức. Trace: tìm video gốc, tên miền, cảnh báo lừa đảo, lịch sử tài khoản. Decide: không nạp tiền, không gửi giấy tờ, không bấm link nếu chưa xác minh.',
          ], [
            'Video, giọng nói và bình luận không đủ để xác minh lời kêu gọi tài chính. Kiểm tra kênh chính thức trước khi hành động.',
          ]),
          lesson('5.1.5', 'Kịch bản 5: QR, link và app giả', [
            'Không phải deepfake nào cũng đứng một mình trong video. Nhiều nội dung giả chỉ là mồi nhử để kéo bạn đến: link đăng nhập giả, mã QR thanh toán, app cài ngoài, form thu thập thông tin, nhóm chat đầu tư, tài khoản hỗ trợ giả.',
            'Dấu hiệu đỏ: link rút gọn không rõ đích, tên miền gần giống thương hiệu thật, yêu cầu đăng nhập lại, yêu cầu cấp quyền lạ cho app, yêu cầu quét QR để nhận tiền hoặc quà, yêu cầu gửi ảnh căn cước hoặc khuôn mặt.',
            'Deepfense Check — Pause: không bấm, quét hoặc cài khi đang bị thúc ép. Verify: tự mở app chính thức hoặc website chính thức. Trace: kiểm tra nguồn link, tài khoản gửi, lịch sử cảnh báo. Decide: không nhập thông tin nhạy cảm qua link nghi vấn.',
          ], [
            'Link, QR và app từ nguồn nghi vấn có thể là bước đầu của một kịch bản lừa đảo phức tạp hơn.',
            'Luôn truy cập app và website chính thức qua kênh bạn tự tìm, không qua link được gửi trong chat.',
          ]),
        ],
        checkpoint: checkpoint('Quiz 5.1 — Lừa đảo tài chính và mạo danh', [
          q('Một giọng nói giống người thân yêu cầu bạn chuyển tiền ngay vào tài khoản tên người lạ. Hành động an toàn nhất là gì?', ['Chuyển ngay vì giọng giống.', 'Gọi lại số đã lưu hoặc xác minh qua người thân khác.', 'Gửi trước một khoản nhỏ.', 'Hỏi lại trong cùng cuộc gọi rồi chuyển.'], 1),
          q('Dấu hiệu nào đáng nghi nhất trong một yêu cầu từ "sếp"?', ['Sếp nói giọng nghiêm túc.', 'Yêu cầu bỏ qua quy trình chuyển tiền vì đang gấp.', 'Tin nhắn được gửi vào buổi sáng.', 'Câu chữ ngắn gọn.'], 1),
          q('Người tự xưng ngân hàng yêu cầu đọc OTP để khóa giao dịch lạ. Bạn nên làm gì?', ['Đọc OTP nếu họ biết tên bạn.', 'Không đọc OTP, tự liên hệ kênh chính thức của ngân hàng.', 'Đọc một nửa mã.', 'Gửi OTP qua tin nhắn cho chắc.'], 1),
          q('Một video người nổi tiếng kêu gọi đầu tư xuất hiện ở tài khoản lạ, có link đăng ký. Bạn nên đánh giá thế nào?', ['An toàn nếu video trông thật.', 'Rủi ro cao, cần kiểm tra kênh chính thức và không bấm link.', 'An toàn nếu nhiều bình luận khen.', 'Chỉ cần xem video đủ lâu.'], 1),
          q('Điều nào sau đây là dấu hiệu đỏ của app/link giả?', ['Yêu cầu tải app qua link chat và cấp quyền lạ.', 'Website chính thức do bạn tự nhập địa chỉ.', 'App ngân hàng đã cài từ store chính thức.', 'Tổng đài lấy từ mặt sau thẻ ngân hàng.'], 0),
          q('Câu nào đúng nhất?', ['Deepfake chỉ gây hại khi nạn nhân là người nổi tiếng.', 'Người bình thường cũng có thể bị mạo danh hoặc bị dùng giọng/hình ảnh để lừa người thân.', 'Nếu không đăng video công khai thì không bao giờ gặp rủi ro.', 'Lừa đảo tài chính không liên quan đến deepfake.'], 1),
          q('Một người tự xưng cơ quan chức năng yêu cầu bạn chuyển tiền vào "tài khoản an toàn". Bạn nên làm gì?', ['Chuyển để chứng minh trong sạch.', 'Không chuyển, dừng cuộc gọi và xác minh qua kênh chính thức.', 'Chuyển một nửa.', 'Làm theo vì họ có quyền lực.'], 1),
          q('Tại sao bình luận tích cực dưới video đầu tư không đủ đáng tin?', ['Vì bình luận có thể đến từ seeding, tài khoản giả hoặc người chưa kiểm chứng.', 'Vì mọi bình luận đều sai.', 'Vì bình luận không có dấu câu.', 'Vì chỉ video dài mới đáng tin.'], 0),
          q('Trong tình huống tài chính, bước nào thường quan trọng nhất khi có người quen yêu cầu tiền?', ['Verify qua kênh độc lập.', 'Chọn ảnh đại diện đẹp.', 'Xem bình luận.', 'Đổi nhạc chuông.'], 0),
          q('Bạn có cần chứng minh 100% một video là deepfake mới được từ chối bấm link đầu tư không?', ['Có.', 'Không. Nếu rủi ro cao và chưa xác minh, bạn có thể từ chối.', 'Có, nếu video nhiều lượt xem.', 'Không, nhưng nên bấm thử để biết.'], 1),
        ]),
      },
      // ── M5-511-S ─────────────────────────────────────────────────
      {
        title: '5.1.1 Quy tắc vàng về tiền',
        lessons: [
          lesson('5.1.1.0', 'Mục tiêu bài học 5.1.1', [
            'Sau phần 5.1.1, bạn sẽ ghi nhớ các quy tắc an toàn khi gặp yêu cầu tiền.',
            'Bạn sẽ biết cách xử lý yêu cầu chuyển khoản gấp, và biết làm gì nếu đã lỡ chuyển tiền hoặc lộ thông tin.',
          ], [
            'Năm quy tắc vàng: không chuyển khi bị ép thời gian, không gửi OTP, gọi lại số đã lưu, không xử lý một mình khi hoảng, hành động nhanh nếu đã lỡ.',
          ]),
          lesson('5.1.1.1', 'Quy tắc 1: Không chuyển tiền khi đang bị ép thời gian', [
            'Nếu ai đó nói "Chỉ còn 5 phút.", "Chuyển ngay.", "Không kịp giải thích.", "Nếu không chuyển bây giờ sẽ có chuyện." — hãy xem đó là tín hiệu cần dừng.',
            'Tình huống khẩn cấp thật vẫn có thể được xác minh. Nếu bạn cần giúp người thân, xác minh giúp bạn giúp đúng người.',
          ], [
            'Gấp không có nghĩa là bỏ kiểm chứng.',
          ]),
          lesson('5.1.1.2', 'Quy tắc 2: Không gửi OTP, mật khẩu, mã xác minh', [
            'OTP, mật khẩu, mã xác minh và mã khôi phục tài khoản là chìa khóa vào tài khoản của bạn.',
            'Không gửi các thông tin này qua cuộc gọi, tin nhắn, link lạ, form lạ, người tự xưng hỗ trợ, hoặc người quen đang nhắn từ tài khoản bất thường.',
            'Kể cả khi người yêu cầu nghe giống người quen, vẫn không gửi.',
          ], [
            'Người thật không cần OTP của bạn qua chat.',
          ]),
          lesson('5.1.1.3', 'Quy tắc 3: Gọi lại bằng số đã lưu', [
            'Nếu người thân, bạn bè, sếp, giáo viên hoặc đồng nghiệp yêu cầu tiền hoặc dữ liệu gấp, hãy thoát khỏi kênh nghi vấn.',
            'Nên: gọi số đã lưu từ trước, gọi người thân khác, dùng kênh nội bộ chính thức, gặp trực tiếp nếu có thể.',
            'Không nên: gọi số mới họ vừa gửi, bấm link xác minh họ vừa gửi, chuyển tiền chỉ vì ảnh đại diện đúng.',
          ], [
            'Xác minh danh tính qua kênh độc lập — không qua kênh mà người nghi vấn vừa cung cấp.',
          ]),
          lesson('5.1.1.4', 'Quy tắc 4: Không tự xử lý một mình khi hoảng', [
            'Kẻ xấu thường muốn bạn cô lập: "Đừng nói với ai.", "Đừng gọi người khác.", "Chuyện này xấu hổ lắm.", "Nếu nói ra sẽ rắc rối."',
            'Khi thấy các câu này, hãy tìm người tin cậy: người thân, giáo viên, bạn bè đáng tin, quản lý, bộ phận IT, ngân hàng, hoặc cơ quan có trách nhiệm.',
            'Không phải vì bạn yếu, mà vì kiểm chứng tốt thường cần người thứ hai.',
          ], [
            'Khi bị yêu cầu giữ bí mật trong tình huống tài chính, đó là dấu hiệu đỏ cần tìm người hỗ trợ.',
          ]),
          lesson('5.1.1.5', 'Quy tắc 5: Nếu đã lỡ chuyển tiền, hành động nhanh', [
            'Nếu bạn nghi mình vừa bị lừa: liên hệ ngân hàng càng sớm càng tốt; lưu bằng chứng gồm số tài khoản, nội dung chat, số điện thoại, link, thời gian, ảnh chụp màn hình.',
            'Báo người thân hoặc bạn bè nếu tài khoản của bạn hay người quen có thể bị lợi dụng tiếp. Đổi mật khẩu và bật xác thực hai lớp nếu tài khoản bị nghi lộ.',
            'Báo cáo tài khoản, bài đăng hoặc website giả mạo trên nền tảng. Trình báo hoặc liên hệ cơ quan có trách nhiệm khi cần.',
            'Không nên: xóa bằng chứng vì xấu hổ, im lặng nếu kẻ xấu có thể lừa thêm người khác, đăng thông tin cá nhân chưa kiểm chứng của nghi phạm lên mạng.',
          ], [
            'Tiền có thể chuyển trong vài giây, nhưng hậu quả có thể kéo dài rất lâu. Hãy xác minh trước khi chuyển.',
            'Nếu đã lỡ: hành động nhanh — ngân hàng, bằng chứng, báo cáo.',
          ]),
        ],
        checkpoint: null,
      },
      // ── M5-511-E ─────────────────────────────────────────────────
      // ── M5-52-S ──────────────────────────────────────────────────
      {
        title: '5.2 Học đường, danh dự và hình ảnh nhạy cảm',
        lessons: [
          lesson('5.2.0', 'Mục tiêu bài học 5.2', [
            'Sau phần 5.2, bạn sẽ hiểu vì sao deepfake nhạy cảm có thể gây hại nghiêm trọng dù "không phải ảnh thật".',
            'Bạn sẽ biết cách phản ứng khi thấy hình ảnh hoặc video nhạy cảm trong nhóm chat hoặc mạng xã hội, biết ưu tiên giảm lan truyền và bảo vệ người bị hại.',
            'Bạn cũng sẽ hiểu trách nhiệm của người xem, người chia sẻ và người quản trị nhóm.',
          ], [
            'Mục tiêu chính: giảm lan truyền, bảo vệ người bị hại, không đứng xem.',
          ]),
          lesson('5.2.1', '"Ảnh giả" vẫn có thể gây đau thật', [
            'Trong học đường hoặc cộng đồng trẻ, một hình ảnh nhạy cảm giả mạo có thể bị dùng để bắt nạt, bôi nhọ, trêu chọc, tống tiền, ép im lặng, làm người khác xấu hổ, hoặc phá hoại quan hệ bạn bè, gia đình, trường học.',
            'Một câu rất nguy hiểm là: "Có phải ảnh thật đâu mà nghiêm trọng." — Sai. Nếu hình ảnh khiến người khác bị xấu hổ, bị đe dọa, bị xa lánh hoặc bị tổn thương, hậu quả là thật.',
            'Người bị hại có thể: lo sợ, mất ngủ, không dám đến lớp, bị trêu chọc, bị gia đình hiểu lầm, bị ảnh hưởng danh dự, bị áp lực tâm lý nặng.',
          ], [
            'Không lan truyền nội dung nhạy cảm, dù bạn nghĩ nó thật hay giả.',
          ]),
          lesson('5.2.2', 'Nếu thấy hình ảnh nhạy cảm trong nhóm chat', [
            'Việc cần làm: không lưu về nếu không có lý do báo cáo an toàn; không chuyển tiếp; không bình luận đùa, chấm điểm, suy đoán hoặc bêu tên; báo cáo nội dung trên nền tảng nếu có thể.',
            'Báo cho người có trách nhiệm: giáo viên, phụ huynh, quản trị viên, cố vấn, người lớn đáng tin. Nếu bạn biết người bị hại, hãy hỗ trợ bằng cách bình tĩnh, không tra hỏi gây áp lực. Nếu bạn là quản trị nhóm, hãy xóa nội dung và nhắc quy tắc không lan truyền.',
            'Việc không nên làm: "Gửi mình xem với.", "Ai có bản gốc không?", "Không biết thật giả, lưu lại đã.", "Phóng to xem có lỗi AI không.", "Tag người đó vào cho vui.", "Đăng lên nhóm khác để cảnh báo." — những hành động này có thể làm tổn hại lan rộng hơn.',
          ], [
            'Khi thấy nội dung nhạy cảm trong nhóm: không lưu, không gửi, không bình luận — báo người có trách nhiệm.',
          ]),
          lesson('5.2.3', 'Deepfense Check trong hình ảnh nhạy cảm', [
            'Với hình ảnh nhạy cảm, thứ tự ưu tiên khác với video đầu tư. Bạn không cần phân tích công khai xem ảnh có phải deepfake không. Bạn cần giảm hại trước.',
            'Pause: dừng trước khi lưu, gửi, bình luận. Observe: đây là nội dung nhạy cảm, có thể làm hại người trong ảnh. Verify: không xác minh bằng cách lan truyền — nếu cần, báo người có trách nhiệm xử lý riêng tư.',
            'Trace: chỉ truy nguồn nếu bạn có vai trò phù hợp và làm theo quy trình an toàn. Decide: không lan truyền, báo cáo, hỗ trợ người bị hại.',
          ], [
            'Với nội dung nhạy cảm, giảm lan truyền quan trọng hơn thỏa mãn tò mò.',
          ]),
          lesson('5.2.4', 'Nếu bạn là người bị hại', [
            'Nếu hình ảnh hoặc video giả mạo hoặc nhạy cảm liên quan đến bạn bị lan truyền — bạn không đáng bị đổ lỗi.',
            'Bạn nên: tìm một người lớn hoặc người tin cậy để nói chuyện; không thương lượng một mình nếu bị tống tiền; lưu bằng chứng an toàn gồm ảnh chụp màn hình, link, tài khoản, thời gian; báo cáo nội dung trên nền tảng; yêu cầu quản trị viên nhóm xóa nội dung.',
            'Báo nhà trường, gia đình hoặc cơ quan có trách nhiệm khi cần. Chăm sóc sức khỏe tinh thần của mình — chuyện này không nên được xử lý một mình.',
            'Nếu bạn thấy quá căng thẳng, hãy tìm người ở cạnh mình ngay. Không cần đợi đến khi "có đủ bằng chứng" mới được tìm hỗ trợ.',
          ], [
            'Bạn không đáng bị đổ lỗi. Tìm người tin cậy, lưu bằng chứng, báo cáo — không xử lý một mình.',
          ]),
          lesson('5.2.5', 'Nếu bạn là bạn bè hoặc người chứng kiến', [
            'Bạn có thể giúp bằng cách: không xin xem, không gửi tiếp, không đùa, nhắc người khác dừng lan truyền, báo cáo nội dung, hỏi người bị hại cần hỗ trợ gì, báo người có trách nhiệm nếu người bị hại đang bị tấn công.',
            'Một câu đơn giản có thể rất có ích: "Đừng gửi tiếp nữa. Dù thật hay giả thì cũng đang làm hại người khác." — Đó là hành động bảo vệ cộng đồng.',
          ], [
            'Người tử tế không đứng xem. Người tử tế giúp giảm lan truyền.',
          ]),
          lesson('5.2.6', 'Nếu bạn là giáo viên, phụ huynh hoặc quản trị viên nhóm', [
            'Ưu tiên đầu tiên là an toàn và giảm lan truyền. Nên: gỡ nội dung khỏi nhóm hoặc kênh nếu có quyền; nhắc rõ quy tắc không chia sẻ tiếp; lưu bằng chứng ở mức cần thiết và an toàn; hỗ trợ người bị hại riêng tư; tránh chất vấn công khai; không biến nạn nhân thành người phải tự chứng minh.',
            'Không nên: chiếu nội dung cho nhiều người xem để "xác minh"; hỏi trước lớp; đổ lỗi người bị hại; yêu cầu người bị hại tự đi tìm từng người đã chia sẻ.',
            'Chuyển vụ việc đến người hoặc cơ quan phù hợp nếu nghiêm trọng.',
          ], [
            'Vai trò của người có trách nhiệm: gỡ nội dung, hỗ trợ riêng tư, không chất vấn công khai, không đổ lỗi nạn nhân.',
          ]),
        ],
        checkpoint: null,
      },
      // ── M5-52-E ──────────────────────────────────────────────────
      // ── M5-53-S ──────────────────────────────────────────────────
      {
        title: '5.3 Tin giả xã hội và "nội dung thật bị gọi là giả"',
        lessons: [
          lesson('5.3.0', 'Mục tiêu bài học 5.3', [
            'Sau phần 5.3, bạn sẽ hiểu cách deepfake và nội dung sai bối cảnh có thể tác động đến xã hội.',
            'Bạn sẽ biết vì sao clip ngắn gây phẫn nộ cần được kiểm chứng kỹ, hiểu hiện tượng "liar\'s dividend" — nội dung thật bị phủ nhận là giả — và biết cách chia sẻ có trách nhiệm trong các vấn đề xã hội.',
          ], [
            'Tin giả có thể dùng deepfake để thuyết phục hơn. Chia sẻ nhanh có thể làm sai lan nhanh hơn đúng.',
          ]),
          lesson('5.3.1', 'Tin giả không chỉ là thông tin sai', [
            'Tin giả có thể gây hậu quả thật: làm người vô tội bị tấn công, kích động đám đông, gây hoang mang trong thiên tai hoặc dịch bệnh, làm người dân mất tiền, làm giảm niềm tin vào nguồn tin chính thống, khiến cộng đồng chia rẽ.',
            'Deepfake có thể làm tin giả thuyết phục hơn vì người xem nghĩ: "Tôi thấy người đó nói mà." Nhưng như bạn đã học, thấy một đoạn clip không có nghĩa là hiểu toàn bộ sự việc.',
          ], [
            'Deepfake không chỉ lừa cá nhân — nó có thể ảnh hưởng đến cả cộng đồng và xã hội.',
          ]),
          lesson('5.3.2', 'Clip ngắn gây phẫn nộ', [
            'Clip ngắn là định dạng rất dễ lan truyền. Nó có thể: cắt mất phần trước và sau, thiếu bối cảnh, dùng phụ đề dẫn dắt, gắn chú thích sai, ghép âm thanh khác, được đăng lại từ sự kiện cũ.',
            'Khi clip làm bạn giận ngay lập tức, hãy Pause. Hãy hỏi: clip dài bao nhiêu? Có bản đầy đủ không? Ai đăng đầu tiên? Sự việc xảy ra ở đâu, khi nào? Có nguồn độc lập xác nhận không? Có ai đang kêu gọi tấn công hoặc bêu tên không?',
          ], [
            'Phẫn nộ là cảm xúc thật, nhưng chưa chắc dựa trên bối cảnh thật.',
          ]),
          lesson('5.3.3', 'Sai bối cảnh có thể nguy hiểm như giả', [
            'Một video thật đặt sai bối cảnh có thể gây hiểu nhầm rất mạnh. Ví dụ: video cũ được đăng như sự kiện mới, video ở quốc gia khác được nói là ở Việt Nam, clip hậu trường được nói là vụ việc thật, ảnh thiên tai cũ được dùng để kêu gọi quyên góp giả, video xung đột cũ được dùng để kích động nhóm người hiện tại.',
            'Trong các tình huống này, câu hỏi "có phải deepfake không?" chưa đủ. Câu hỏi đúng hơn là: nội dung này có đang kể đúng câu chuyện về thời gian, địa điểm và người liên quan không?',
          ], [
            'Video thật bị dùng sai bối cảnh có thể gây hại không kém video giả.',
          ]),
          lesson('5.3.4', 'Liar\'s dividend: khi sự thật bị gọi là deepfake', [
            'Deepfake còn tạo ra một rủi ro ngược. Khi mọi người biết rằng video và giọng nói có thể bị giả, một người có thể phủ nhận nội dung thật bằng cách nói: "Đó là deepfake." Hiện tượng này được gọi là liar\'s dividend.',
            'Điều này làm việc tìm sự thật khó hơn. Vì vậy, chúng ta không nên dùng từ "deepfake" như một cách phủ nhận mọi nội dung mình không thích.',
            'Nếu muốn nói có trách nhiệm, hãy dùng các câu: "Tôi chưa thấy nguồn gốc rõ.", "Cần kiểm chứng thêm.", "Chưa có đủ bằng chứng để kết luận.", "Cần xem bản đầy đủ.", "Cần nguồn độc lập xác nhận." — thay vì "Giả hết." hoặc "Thật 100%."',
          ], [
            'Liar\'s dividend: deepfake khiến người ta dễ phủ nhận cả nội dung thật. Không dùng "deepfake" như một cách phủ nhận mọi thứ mình không thích.',
          ]),
          lesson('5.3.5', 'Quy tắc chia sẻ có trách nhiệm', [
            'Trước khi chia sẻ một nội dung xã hội gây sốc, hãy hỏi: Mình có biết nguồn gốc không? Có nguồn độc lập xác nhận không? Nội dung có thể làm hại ai không? Có đang bêu tên, lộ mặt, lộ địa chỉ người chưa được xác minh không?',
            'Có lời kêu gọi tấn công, trả thù, xúc phạm không? Nếu nội dung sai, hậu quả là gì? Mình chia sẻ để giúp kiểm chứng hay để xả cảm xúc?',
            'Nếu chưa chắc, bạn có thể: không chia sẻ; chỉ gửi riêng cho người có chuyên môn hoặc người có trách nhiệm để hỏi; chia sẻ nguồn kiểm chứng thay vì clip gốc; viết rõ "chưa xác minh" nếu cần thảo luận — nhưng tốt nhất vẫn không lan truyền nội dung gây hại.',
          ], [
            'Trong vấn đề xã hội, chia sẻ nhanh có thể làm sai lan nhanh hơn đúng.',
            'Bảy câu hỏi trước khi chia sẻ: nguồn gốc, xác nhận độc lập, có gây hại không, có bêu tên không, có kêu gọi tấn công không, hậu quả nếu sai, chia sẻ để làm gì.',
          ]),
        ],
        checkpoint: null,
      },
      // ── M5-53-E ──────────────────────────────────────────────────
      // ── M5-54-S ──────────────────────────────────────────────────
      {
        title: '5.4 Tình cảm, việc làm, học bổng, đầu tư và danh tính số',
        lessons: [
          lesson('5.4.0', 'Mục tiêu bài học 5.4', [
            'Sau phần 5.4, bạn sẽ nhận diện rủi ro deepfake và AI trong tình cảm và danh tính giả.',
            'Bạn sẽ biết cảnh giác với hồ sơ việc làm, học bổng, tuyển dụng và đầu tư giả; biết kiểm tra danh tính số ở mức cơ bản; và biết bảo vệ dữ liệu cá nhân khi tương tác với người hoặc tổ chức mới trên mạng.',
          ], [
            'Rủi ro deepfake không dừng ở tiền bạc và tin tức — nó còn len vào tình cảm, việc làm và danh tính số.',
          ]),
          lesson('5.4.1', 'Tình cảm và danh tính giả', [
            'Không phải mọi người bạn gặp online đều là người họ nói. Kẻ xấu có thể dùng ảnh AI, video ngắn dựng sẵn, giọng nói giả, hồ sơ mạng xã hội giả, câu chuyện đời tư cảm động, hoặc tài khoản có vẻ hoạt động lâu nhưng thực ra được xây dựng để lừa.',
            'Kịch bản thường gặp: làm quen → tạo cảm giác thân thiết nhanh → tâm sự chuyện khó khăn → hứa hẹn tình cảm hoặc cơ hội → xin tiền, nhờ nhận hộ tiền, gửi link, yêu cầu ảnh nhạy cảm hoặc giấy tờ.',
            'Dấu hiệu đỏ: quá hoàn hảo, quá nhanh, quá bí mật; né gọi video thật hoặc chỉ gọi rất ngắn; có nhiều lý do không gặp trực tiếp; xin tiền vì sự cố liên tục; yêu cầu giữ bí mật; yêu cầu ảnh nhạy cảm; gửi link nhận quà hoặc phí hải quan.',
            'Phản ứng an toàn: không gửi tiền cho người chỉ quen online; không gửi ảnh nhạy cảm hoặc giấy tờ cá nhân; không bấm link nhận quà; nói chuyện với người tin cậy nếu bị gây áp lực; nếu bị tống tiền, lưu bằng chứng và tìm hỗ trợ — không tự xử lý một mình.',
          ], [
            'Mối quan hệ online phát triển quá nhanh, quá bí mật và kết thúc bằng yêu cầu tiền — là dấu hiệu đỏ rõ ràng.',
          ]),
          lesson('5.4.2', 'Việc làm và học bổng giả', [
            'AI có thể làm các lời mời việc làm hoặc học bổng trông chuyên nghiệp hơn: website đẹp, người tư vấn có ảnh đại diện AI, video giới thiệu giả, email trông giống tổ chức thật, giấy mời và logo bị làm giả.',
            'Kịch bản thường gặp: việc nhẹ lương cao, học bổng dễ nhận, phí giữ chỗ, phí xử lý hồ sơ, yêu cầu gửi giấy tờ cá nhân trước khi xác minh tổ chức, yêu cầu tải app hoặc tham gia nhóm riêng.',
            'Dấu hiệu đỏ: cam kết quá dễ; không có website hoặc tổ chức rõ ràng; email dùng tên miền lạ; không có địa chỉ, người phụ trách hoặc điều khoản minh bạch; yêu cầu phí trước; yêu cầu giấy tờ nhạy cảm quá sớm; gây áp lực "chỉ còn hôm nay".',
            'Phản ứng an toàn: kiểm tra website chính thức của tổ chức; tìm thông tin tuyển dụng từ nguồn chính thức; gọi hoặc email theo thông tin tự tìm được — không chỉ dùng thông tin trong tin nhắn; không gửi giấy tờ cá nhân khi chưa xác minh; không đóng phí qua tài khoản cá nhân lạ.',
          ], [
            'Việc nhẹ lương cao cộng với phí trước và giấy tờ cá nhân sớm — là bộ ba dấu hiệu đỏ của việc làm hoặc học bổng giả.',
          ]),
          lesson('5.4.3', 'Đầu tư, khóa học và "chuyên gia" AI', [
            'Deepfake có thể làm "chuyên gia" giả trông rất thật. Một người có thể xuất hiện trong video với gương mặt đáng tin, giọng nói tự tin, biểu đồ lợi nhuận, ảnh chụp tài khoản, học viên và bình luận khen ngợi, hoặc video người nổi tiếng "ủng hộ".',
            'Nhưng các dấu hiệu đỏ vẫn quen thuộc: lợi nhuận chắc chắn, không rủi ro, bảo mật công thức, không cho hỏi nhiều, ép nạp tiền, khoe kết quả quá tốt, tạo nhóm kín để thúc ép, dùng người nổi tiếng làm mồi.',
          ], [
            'Một video chuyên nghiệp không biến một lời hứa tài chính thành đáng tin.',
          ]),
          lesson('5.4.4', 'Bảo vệ danh tính số của bạn', [
            'Bạn không thể biến mình thành vô hình trên Internet. Nhưng bạn có thể giảm dữ liệu mà kẻ xấu dùng để mạo danh hoặc lừa người khác.',
            'Hãy cân nhắc: không công khai số điện thoại, email chính hoặc địa chỉ nhà; hạn chế đăng giấy tờ, thẻ học sinh hoặc sinh viên, vé máy bay, lịch trình; cẩn thận với video giọng nói dài công khai; kiểm tra quyền riêng tư của tài khoản mạng xã hội.',
            'Không chấp nhận kết bạn bừa bãi nếu tài khoản chứa nhiều thông tin cá nhân. Bật xác thực hai lớp cho tài khoản quan trọng. Dùng mật khẩu mạnh, không dùng lại mật khẩu. Cảnh báo người thân nếu tài khoản của bạn bị chiếm quyền.',
          ], [
            'Danh tính số của bạn là tài sản. Bảo vệ nó không phải vì sợ Internet, mà vì bạn muốn Internet khó bị dùng để chống lại mình.',
          ]),
        ],
        checkpoint: null,
      },
      // ── M5-54-E ──────────────────────────────────────────────────
      // ── M5-55-S ──────────────────────────────────────────────────
      {
        title: '5.5 Thực hành: Bản đồ rủi ro đời sống số',
        lessons: [
          lesson('5.5.0', 'Hướng dẫn thực hành', [
            'Bạn sẽ nhận 5 tình huống. Với mỗi tình huống, hãy xác định: vùng rủi ro chính, dấu hiệu đỏ, bước Deepfense Check quan trọng nhất, và hành động an toàn.',
            'Mục tiêu: giúp người học áp dụng Deepfense Check vào nhiều bối cảnh đời sống thực tế.',
          ], [
            'Deepfake không phải một vấn đề riêng lẻ. Nó là lớp mạo danh có thể phủ lên tiền bạc, danh dự, tình cảm, học tập, việc làm và niềm tin xã hội.',
          ]),
          lesson('5.5.1', 'Tình huống 1: Video đầu tư của người nổi tiếng', [
            'Tình huống: Một video người nổi tiếng kêu gọi tham gia ứng dụng đầu tư. Link đăng ký nằm trong mô tả. Tài khoản đăng không phải tài khoản chính thức.',
            'Vùng rủi ro: lừa đảo tài chính/đầu tư. Dấu hiệu đỏ: người nổi tiếng, link lạ, tài khoản không chính thức, lời hứa tài chính.',
            'Bước quan trọng nhất: Verify và Trace. Hành động an toàn: không bấm link, kiểm tra kênh chính thức, cảnh báo người thân nếu cần.',
          ], [
            'Video đầu tư từ tài khoản không chính thức: không bấm link, kiểm tra kênh chính thức trước.',
          ]),
          lesson('5.5.2', 'Tình huống 2: Ảnh nhạy cảm trong nhóm lớp', [
            'Tình huống: Một ảnh nhạy cảm được nói là của bạn học. Nhiều người đang xin ảnh và gửi tiếp.',
            'Vùng rủi ro: học đường/danh dự/hình ảnh nhạy cảm. Dấu hiệu đỏ: nội dung nhạy cảm, lan truyền trong nhóm, có thể gây hại người trong ảnh.',
            'Bước quan trọng nhất: Pause và Decide. Hành động an toàn: không lưu, không gửi tiếp, báo cáo, nhắc dừng lan truyền, tìm người có trách nhiệm.',
          ], [
            'Ảnh nhạy cảm trong nhóm: dừng ngay, không gửi tiếp, báo người có trách nhiệm.',
          ]),
          lesson('5.5.3', 'Tình huống 3: Clip gây phẫn nộ', [
            'Tình huống: Một clip 10 giây được chia sẻ với chú thích "vừa xảy ra ở thành phố mình". Không có nguồn gốc, nhưng nhiều người kêu gọi bêu tên người trong clip.',
            'Vùng rủi ro: tin giả xã hội/sai bối cảnh. Dấu hiệu đỏ: clip ngắn, không nguồn, gây phẫn nộ, kêu gọi bêu tên.',
            'Bước quan trọng nhất: Trace và Decide. Hành động an toàn: không chia sẻ, tìm nguồn và bản đầy đủ nếu cần, không bêu tên.',
          ], [
            'Clip ngắn gây phẫn nộ không rõ nguồn: không chia sẻ, không bêu tên — truy nguồn trước.',
          ]),
          lesson('5.5.4', 'Tình huống 4: Người quen online xin tiền', [
            'Tình huống: Một người quen qua mạng được 2 tuần nói đang gặp sự cố và cần bạn chuyển tiền. Hồ sơ của họ có ảnh đẹp, ít bạn bè thật và thường né gặp mặt.',
            'Vùng rủi ro: tình cảm/danh tính giả. Dấu hiệu đỏ: tạo thân thiết nhanh, xin tiền, né gặp, hồ sơ đáng nghi.',
            'Bước quan trọng nhất: Verify. Hành động an toàn: không chuyển tiền, không gửi thông tin nhạy cảm, trao đổi với người tin cậy.',
          ], [
            'Người quen online 2 tuần xin tiền: dừng lại, xác minh danh tính qua kênh độc lập trước khi làm bất cứ điều gì.',
          ]),
          lesson('5.5.5', 'Tình huống 5: Việc làm lương cao + Chấm điểm gợi ý', [
            'Tình huống: Một tài khoản tuyển dụng gửi lời mời việc nhẹ lương cao, yêu cầu nộp phí giữ chỗ và gửi ảnh căn cước.',
            'Vùng rủi ro: việc làm/hồ sơ giả/thu thập dữ liệu. Dấu hiệu đỏ: việc nhẹ lương cao, phí trước, giấy tờ cá nhân, tài khoản không rõ.',
            'Bước quan trọng nhất: Verify và Decide. Hành động an toàn: kiểm tra tổ chức chính thức, không nộp phí hoặc gửi giấy tờ khi chưa xác minh.',
            'Chấm điểm gợi ý — mỗi tình huống tối đa 4 điểm: xác định đúng vùng rủi ro (1đ), chọn được ít nhất 2 dấu hiệu đỏ (1đ), chọn bước Deepfense Check phù hợp (1đ), chọn hành động an toàn (1đ). Tổng điểm tối đa: 20.',
          ], [
            'Deepfake nguy hiểm không chỉ vì nó giả. Nó nguy hiểm vì nó xuất hiện trong những việc rất thật: tiền thật, danh dự thật, nỗi sợ thật, tình cảm thật và hậu quả thật.',
            'Module 6 tiếp theo: Deepfense Shield, family code, money delay, two-channel rule, no shame reporting, evidence first và capstone cuối khóa.',
          ]),
        ],
        checkpoint: null,
      },
      // ── M5-55-E ──────────────────────────────────────────────────
    ],
    quiz: [
      q('Một giọng nói giống người thân yêu cầu bạn chuyển tiền ngay vào tài khoản tên người lạ. Hành động an toàn nhất là gì?', ['Chuyển ngay vì giọng giống.', 'Gọi lại số đã lưu hoặc xác minh qua người thân khác.', 'Gửi trước một khoản nhỏ.', 'Hỏi lại trong cùng cuộc gọi rồi chuyển.'], 1),
      q('Dấu hiệu nào đáng nghi nhất trong một yêu cầu từ "sếp"?', ['Sếp nói giọng nghiêm túc.', 'Yêu cầu bỏ qua quy trình chuyển tiền vì đang gấp.', 'Tin nhắn được gửi vào buổi sáng.', 'Câu chữ ngắn gọn.'], 1),
      q('Người tự xưng ngân hàng yêu cầu đọc OTP để khóa giao dịch lạ. Bạn nên làm gì?', ['Đọc OTP nếu họ biết tên bạn.', 'Không đọc OTP, tự liên hệ kênh chính thức của ngân hàng.', 'Đọc một nửa mã.', 'Gửi OTP qua tin nhắn cho chắc.'], 1),
      q('Một video người nổi tiếng kêu gọi đầu tư xuất hiện ở tài khoản lạ, có link đăng ký. Bạn nên đánh giá thế nào?', ['An toàn nếu video trông thật.', 'Rủi ro cao, cần kiểm tra kênh chính thức và không bấm link.', 'An toàn nếu nhiều bình luận khen.', 'Chỉ cần xem video đủ lâu.'], 1),
      q('Điều nào sau đây là dấu hiệu đỏ của app/link giả?', ['Yêu cầu tải app qua link chat và cấp quyền lạ.', 'Website chính thức do bạn tự nhập địa chỉ.', 'App ngân hàng đã cài từ store chính thức.', 'Tổng đài lấy từ mặt sau thẻ ngân hàng.'], 0),
      q('Câu nào đúng nhất?', ['Deepfake chỉ gây hại khi nạn nhân là người nổi tiếng.', 'Người bình thường cũng có thể bị mạo danh hoặc bị dùng giọng/hình ảnh để lừa người thân.', 'Nếu không đăng video công khai thì không bao giờ gặp rủi ro.', 'Lừa đảo tài chính không liên quan đến deepfake.'], 1),
      q('Một người tự xưng cơ quan chức năng yêu cầu bạn chuyển tiền vào "tài khoản an toàn". Bạn nên làm gì?', ['Chuyển để chứng minh trong sạch.', 'Không chuyển, dừng cuộc gọi và xác minh qua kênh chính thức.', 'Chuyển một nửa.', 'Làm theo vì họ có quyền lực.'], 1),
      q('Tại sao bình luận tích cực dưới video đầu tư không đủ đáng tin?', ['Vì bình luận có thể đến từ seeding, tài khoản giả hoặc người chưa kiểm chứng.', 'Vì mọi bình luận đều sai.', 'Vì bình luận không có dấu câu.', 'Vì chỉ video dài mới đáng tin.'], 0),
      q('Trong tình huống tài chính, bước nào thường quan trọng nhất khi có người quen yêu cầu tiền?', ['Verify qua kênh độc lập.', 'Chọn ảnh đại diện đẹp.', 'Xem bình luận.', 'Đổi nhạc chuông.'], 0),
      q('Bạn có cần chứng minh 100% một video là deepfake mới được từ chối bấm link đầu tư không?', ['Có.', 'Không. Nếu rủi ro cao và chưa xác minh, bạn có thể từ chối.', 'Có, nếu video nhiều lượt xem.', 'Không, nhưng nên bấm thử để biết.'], 1),
    ],
  },

  // ── MODULE 6 ─────────────────────────────────────────────────────
  {
    id: 6, part: 'recognition',
    title: 'Phòng vệ cá nhân và cộng đồng',
    duration: '95-110 phút', level: 'Recognition',
    scenario: 'Sau 5 module, An đã thay đổi cách nhìn nhận nội dung số. Nhưng An nhận ra: nếu chỉ một mình An biết cách phòng vệ, rủi ro vẫn còn. Gia đình, bạn bè, đồng nghiệp và người thân vẫn có thể bị lừa. Phòng vệ trước deepfake không chỉ là kỹ năng cá nhân — đó là thói quen cộng đồng.',
    outcomes: [
      'Thiết lập được bộ quy tắc Deepfense Shield cho bản thân và gia đình hoặc nhóm của mình.',
      'Biết giảm rủi ro từ dữ liệu cá nhân, hình ảnh, giọng nói và tài khoản.',
      'Biết lưu bằng chứng và báo cáo khi gặp nội dung giả mạo hoặc lừa đảo.',
      'Biết hỗ trợ người khác mà không làm tăng lan truyền nội dung gây hại.',
      'Hoàn thành capstone tổng hợp bằng cách đánh giá một hồ sơ sự việc có nhiều tín hiệu.',
    ],
    sections: [
      {
        title: '6.0 Câu chuyện dẫn nhập: An không muốn chỉ học cho mình',
        lessons: [
          lesson('6.0.0', 'An không muốn chỉ học cho mình', [
            'Sau 5 module, An đã thay đổi. An không còn nhìn một video gây sốc như trước. An không còn nghe một giọng quen rồi lập tức tin. An không còn muốn chia sẻ ngay khi thấy một clip khiến mình phẫn nộ. An cũng biết rằng hình ảnh nhạy cảm, dù thật hay giả, có thể gây tổn thương thật.',
            'Nhưng An nhận ra một điều: nếu chỉ một mình An biết cách phòng vệ, rủi ro vẫn còn. Gia đình An vẫn có thể bị gọi điện giả giọng. Bạn bè An vẫn có thể chuyển tiền vì một tài khoản bị chiếm quyền. Nhóm lớp vẫn có thể lan truyền hình ảnh gây hại. Đồng nghiệp vẫn có thể bấm link từ một video giả mạo sếp.',
            'Phòng vệ trước deepfake không chỉ là kỹ năng cá nhân. Nó là thói quen cộng đồng.',
            'Module 6 sẽ giúp bạn biến những điều đã học thành bộ quy tắc Deepfense Shield đơn giản có thể áp dụng ngay: Family Code, Money Delay, Two-Channel Rule, No Shame Reporting và Evidence First.',
          ], [
            'Phòng vệ cá nhân là khởi đầu. Phòng vệ cộng đồng là mục tiêu.',
          ]),
        ],
        checkpoint: null,
      },
      {
        title: '6.1 Bộ quy tắc Deepfense Shield',
        lessons: [
          lesson('6.1.0', 'Mục tiêu bài học 6.1', [
            'Sau phần 6.1, bạn sẽ hiểu 5 quy tắc Deepfense Shield và biết áp dụng từng quy tắc vào gia đình, trường học, công việc và mạng xã hội.',
            'Bạn sẽ biết thiết kế phản xạ phòng vệ trước khi sự cố xảy ra và biết hỗ trợ người khác mà không làm họ xấu hổ.',
          ], [
            '5 quy tắc Deepfense Shield: Family Code, Money Delay, Two-Channel Rule, No Shame Reporting, Evidence First.',
          ]),
          lesson('6.1.1', 'Quy tắc 1: Family Code', [
            'Family Code là câu hoặc từ xác minh riêng giữa những người tin cậy. Nó dùng cho tình huống khẩn cấp, đặc biệt khi có giọng nói hoặc video giống người thân. Ví dụ: một câu hỏi gia đình tự đặt, một cụm từ chỉ người trong nhà hiểu, một quy ước "nếu cần tiền gấp, phải gọi lại số cũ và nói đúng câu xác minh".',
            'Family Code tốt nên: dễ nhớ, không đăng lên mạng, không dựa vào thông tin công khai, có thể thay đổi nếu nghi đã lộ, được thống nhất trước với người thân.',
            'Không nên dùng: ngày sinh, tên thú cưng đã đăng công khai, địa chỉ nhà, tên trường hoặc công ty, câu hỏi mà người ngoài có thể đoán từ mạng xã hội.',
            'Ví dụ ứng dụng: người gọi nói giống em bạn — "Anh ơi chuyển tiền gấp." Bạn có thể nói: "Anh sẽ gọi lại số cũ. Nếu đúng là em, mình dùng câu xác minh như đã thống nhất." Family Code không phải để làm khó người thân — nó giúp cả nhà an toàn hơn.',
          ], [
            'Family Code: câu xác minh riêng, dễ nhớ, không công khai, thống nhất trước với người thân.',
          ]),
          lesson('6.1.2', 'Quy tắc 2: Money Delay', [
            'Money Delay là quy tắc trì hoãn bắt buộc trước mọi yêu cầu tiền bất thường. Nói đơn giản: không chuyển tiền trong trạng thái bị thúc ép.',
            'Bạn có thể đặt quy tắc: mọi yêu cầu tiền bất thường phải chờ ít nhất 5-10 phút để xác minh; mọi yêu cầu chuyển vào tài khoản lạ phải gọi lại kênh độc lập; mọi yêu cầu tiền từ người quen online phải kiểm tra với người tin cậy; mọi yêu cầu đầu tư phải kiểm tra nguồn chính thức và không quyết định trong cùng ngày.',
            'Lừa đảo thường thắng nhờ tốc độ. Money Delay lấy lại tốc độ đó từ tay kẻ xấu. Nếu tình huống là thật, 5-10 phút xác minh giúp bạn giúp đúng người. Nếu tình huống là giả, 5-10 phút có thể cứu bạn khỏi mất tiền.',
          ], [
            'Tiền đi nhanh, khó quay lại. Hãy cho mình một khoảng dừng.',
          ]),
          lesson('6.1.3', 'Quy tắc 3: Two-Channel Rule', [
            'Two-Channel Rule nghĩa là với tình huống rủi ro cao, bạn cần xác minh qua ít nhất hai kênh hoặc hai tín hiệu đáng tin. Ví dụ: tin nhắn mượn tiền + gọi lại số đã lưu; video người nổi tiếng đầu tư + kiểm tra kênh chính thức; email đổi tài khoản nhận tiền + gọi xác nhận với người phụ trách; cuộc gọi từ "ngân hàng" + tự mở app hoặc gọi tổng đài chính thức.',
            'Cần Two-Channel Rule khi nội dung liên quan đến: tiền, OTP hoặc mật khẩu, tài khoản, giấy tờ cá nhân, hình ảnh nhạy cảm, danh dự người khác, tin tức xã hội gây phẫn nộ, yêu cầu cài app hoặc bấm link, yêu cầu giữ bí mật.',
          ], [
            'Một kênh có thể bị giả. Hai kênh độc lập làm kịch bản giả khó hơn nhiều.',
          ]),
          lesson('6.1.4', 'Quy tắc 4: No Shame Reporting', [
            'No Shame Reporting nghĩa là báo cáo sớm mà không làm người bị hại xấu hổ. Nhiều người im lặng sau khi bị lừa hoặc bị mạo danh vì: sợ bị chê ngốc, sợ gia đình mắng, sợ bạn bè cười, sợ bị đổ lỗi, sợ chuyện lan rộng hơn. Kẻ xấu rất thích sự im lặng đó.',
            'Nếu bạn thấy người khác bị lừa, đừng nói "Sao bạn dễ tin thế?" — hãy nói "Mình xử lý từng bước nhé. Lưu bằng chứng trước, rồi báo nền tảng, ngân hàng hoặc người có trách nhiệm."',
            'Nếu bạn thấy hình ảnh nhạy cảm của ai đó, đừng hỏi "Có thật không?" — hãy nói "Đừng gửi tiếp. Mình tìm cách báo cáo và hỗ trợ người đó."',
          ], [
            'Xấu hổ làm nạn nhân im lặng. Im lặng làm kẻ xấu mạnh hơn.',
          ]),
          lesson('6.1.5', 'Quy tắc 5: Evidence First', [
            'Evidence First nghĩa là ưu tiên lưu bằng chứng an toàn trước khi xóa, chặn hoặc tranh cãi. Bằng chứng có thể gồm: ảnh chụp màn hình, link bài đăng, tên tài khoản, số điện thoại, số tài khoản, thời gian, nội dung tin nhắn, mã giao dịch, website hoặc link nghi vấn.',
            'Bằng chứng giúp: báo cáo nền tảng, liên hệ ngân hàng, trình báo khi cần, chứng minh tài khoản bị mạo danh, ngăn người khác bị lừa tiếp.',
            'Nên: chụp màn hình vừa đủ thông tin, lưu link nếu có, ghi lại thời gian, không chỉnh sửa ảnh chụp màn hình. Không nên: đăng tràn lan thông tin cá nhân người khác, lưu hoặc phát tán hình ảnh nhạy cảm, tự điều tra công khai trong nhóm đông người, đối đầu với kẻ xấu khi đang hoảng.',
            'Với hình ảnh nhạy cảm, nếu bạn không phải người có trách nhiệm xử lý, ưu tiên báo cáo nền tảng hoặc người có trách nhiệm — không lưu trữ hoặc chia sẻ thêm.',
          ], [
            'Lưu bằng chứng để xử lý, không phải để lan truyền.',
          ]),
          lesson('6.1.6', 'Deepfense Shield trong 4 môi trường', [
            'Gia đình: thống nhất Family Code; dặn người lớn tuổi không chuyển tiền khi bị gọi gấp; lưu số điện thoại quan trọng; quy ước ai cần tiền gấp cũng phải chấp nhận gọi lại.',
            'Trường học: không lan truyền hình ảnh nhạy cảm; báo giáo viên hoặc người phụ trách khi có nội dung gây hại; không bêu tên người trong clip chưa xác minh; học sinh được khuyến khích báo sớm mà không sợ bị mắng.',
            'Công việc: không chuyển tiền ngoài quy trình; không gửi dữ liệu nhạy cảm qua kênh lạ; xác minh yêu cầu từ lãnh đạo qua kênh nội bộ; cảnh báo bộ phận IT hoặc an toàn thông tin khi có nghi vấn.',
            'Mạng xã hội: không chia sẻ clip gây sốc khi chưa rõ nguồn; không bấm link đầu tư, quà tặng hoặc tài khoản từ video lạ; báo cáo tài khoản mạo danh; cảnh báo bạn bè bằng thông tin đã kiểm chứng.',
          ], [
            'Phòng vệ tốt không bắt đầu khi sự cố xảy ra. Phòng vệ tốt bắt đầu từ quy tắc đã thống nhất trước.',
          ]),
        ],
        checkpoint: checkpoint('Quiz 6.1 — Quy tắc phòng vệ', [
          q('Family Code dùng để làm gì?', ['Tăng lượt thích trên mạng xã hội.', 'Xác minh nhanh trong tình huống khẩn cấp giữa những người tin cậy.', 'Thay thế hoàn toàn ngân hàng.', 'Đăng công khai để mọi người biết.'], 1),
          q('Money Delay nghĩa là gì?', ['Chuyển tiền càng nhanh càng tốt.', 'Trì hoãn bắt buộc để xác minh trước yêu cầu tiền bất thường.', 'Không bao giờ chuyển tiền cho ai.', 'Chỉ chuyển tiền vào ban đêm.'], 1),
          q('Tình huống nào cần Two-Channel Rule?', ['Xem ảnh minh họa được ghi rõ là AI.', 'Người quen nhắn mượn tiền qua tài khoản có hành vi lạ.', 'Đổi hình nền điện thoại.', 'Đọc bài viết giải trí không yêu cầu hành động.'], 1),
          q('No Shame Reporting nghĩa là gì?', ['Không báo cáo vì xấu hổ.', 'Báo cáo sớm, không đổ lỗi hoặc làm nạn nhân xấu hổ.', 'Đăng mọi thứ lên mạng để mọi người biết.', 'Chỉ báo cáo khi đã chắc chắn 100%.'], 1),
          q('Evidence First nghĩa là gì?', ['Lưu bằng chứng an toàn trước khi xóa, chặn hoặc tranh cãi.', 'Đăng bằng chứng lên mọi nhóm.', 'Xóa hết tin nhắn ngay.', 'Chỉ nhớ trong đầu.'], 0),
          q('Điều nào KHÔNG nên dùng làm Family Code?', ['Một cụm từ riêng gia đình tự đặt.', 'Một câu xác minh không công khai.', 'Ngày sinh đã đăng công khai trên mạng xã hội.', 'Một quy ước gọi lại số cũ.'], 2),
          q('Bạn thấy hình ảnh nhạy cảm của một bạn học trong nhóm chat. Theo Deepfense Shield, hành động đúng là gì?', ['Gửi tiếp để hỏi thật giả.', 'Không lan truyền, báo cáo và hỗ trợ người bị hại.', 'Bình luận đùa nếu nghĩ là AI.', 'Lưu lại để phân tích.'], 1),
          q('Nếu đã lỡ chuyển tiền cho kẻ lừa đảo, việc nào nên làm sớm?', ['Xóa hết vì xấu hổ.', 'Liên hệ ngân hàng, lưu bằng chứng và báo cáo.', 'Im lặng chờ may mắn.', 'Chuyển thêm để lấy lại khoản đầu.'], 1),
          q('Trong công việc, một "sếp" gửi tin nhắn yêu cầu bỏ qua quy trình chuyển tiền vì đang gấp. Quy tắc nào phù hợp nhất?', ['Two-Channel Rule và Money Delay.', 'Chia sẻ công khai lên mạng xã hội ngay.', 'Chuyển trước rồi hỏi sau.', 'Tin nếu ảnh đại diện đúng.'], 0),
          q('Mục tiêu của Deepfense Shield là gì?', ['Làm người học sợ Internet.', 'Biến kiến thức thành quy tắc phòng vệ dễ áp dụng trong đời sống.', 'Dạy tạo deepfake.', 'Thay thế mọi cơ quan chức năng.'], 1),
        ]),
      },
      // ── M6-611-S ─────────────────────────────────────────────────
      {
        title: '6.1.1 Vệ sinh dữ liệu cá nhân',
        lessons: [
          lesson('6.1.1.0', 'Mục tiêu bài học 6.1.1', [
            'Sau phần 6.1.1, bạn sẽ hiểu dữ liệu cá nhân có thể bị dùng để mạo danh hoặc dựng kịch bản lừa đảo.',
            'Bạn sẽ biết giảm thông tin công khai không cần thiết, bảo vệ tài khoản quan trọng bằng các thói quen cơ bản, và biết cách phản ứng nếu tài khoản bị chiếm quyền hoặc bị mạo danh.',
          ], [
            'Bạn không thể kiểm soát toàn bộ Internet, nhưng bạn có thể giảm nguyên liệu mà kẻ xấu dùng để mạo danh bạn.',
          ]),
          lesson('6.1.1.1', 'Dữ liệu cá nhân là nguyên liệu của kịch bản lừa đảo', [
            'Kẻ xấu không chỉ cần khuôn mặt hoặc giọng nói. Chúng có thể dùng nhiều mảnh dữ liệu nhỏ để dựng một câu chuyện đáng tin: tên người thân, trường học hoặc công ty, lịch đi chơi, ngày sinh, số điện thoại, ảnh giấy tờ, video có giọng nói, ảnh nhà, xe, thẻ, vé máy bay, thói quen sinh hoạt, bạn bè thường tương tác.',
            'Mỗi mảnh riêng lẻ có vẻ vô hại. Nhưng khi ghép lại, chúng có thể tạo thành bản đồ về bạn.',
            'Ví dụ: nếu một người công khai tên trường, tên lớp, tên giáo viên, lịch học và nhiều video nói chuyện, kẻ xấu có thể dùng thông tin đó để giả làm người quen trong môi trường học tập. Nếu một người thường xuyên đăng lịch đi vắng, địa điểm và số điện thoại, rủi ro không chỉ là deepfake mà còn là an toàn cá nhân.',
          ], [
            'Dữ liệu nhỏ lẻ tưởng vô hại — nhưng ghép lại có thể trở thành công cụ mạo danh.',
          ]),
          lesson('6.1.1.2', 'Những gì nên hạn chế công khai', [
            'Bạn không cần xóa hết cuộc sống khỏi Internet. Nhưng nên cân nhắc trước khi công khai: số điện thoại cá nhân, email chính, địa chỉ nhà, ảnh căn cước hoặc hộ chiếu hoặc thẻ học sinh hoặc thẻ sinh viên.',
            'Cũng nên cân nhắc: vé máy bay và mã đặt chỗ, thẻ ngân hàng và mã QR cá nhân, lịch trình chi tiết, ảnh hoặc video trẻ em kèm trường lớp cụ thể, video dài ghi rõ giọng nói trong bối cảnh riêng tư, thông tin về người thân không có sự đồng ý.',
          ], [
            'Không phải thứ gì đăng được cũng nên đăng công khai.',
          ]),
          lesson('6.1.1.3', 'Cài đặt riêng tư', [
            'Hãy kiểm tra định kỳ: ai có thể xem bài viết của bạn? Ai có thể xem danh sách bạn bè? Ai có thể tìm bạn bằng số điện thoại hoặc email? Ai có thể tải hoặc chia sẻ lại nội dung của bạn? Ứng dụng nào đang có quyền truy cập tài khoản? Tài khoản nào đang đăng nhập trên thiết bị lạ?',
            'Nên: giới hạn bài viết cá nhân cho bạn bè hoặc người tin cậy; tắt hiển thị thông tin nhạy cảm không cần thiết; gỡ quyền ứng dụng không còn dùng; đăng xuất khỏi thiết bị lạ; cẩn trọng với lời mời kết bạn từ tài khoản lạ.',
          ], [
            'Kiểm tra cài đặt riêng tư định kỳ — không chỉ một lần khi tạo tài khoản.',
          ]),
          lesson('6.1.1.4', 'Bảo vệ tài khoản', [
            'Tài khoản bị chiếm quyền có thể được dùng để lừa người khác. Hãy: dùng mật khẩu mạnh; không dùng lại mật khẩu cho nhiều dịch vụ; bật xác thực hai lớp; cẩn thận với link đăng nhập giả; không nhập mật khẩu qua link trong tin nhắn nghi vấn; cập nhật email và số điện thoại khôi phục; kiểm tra cảnh báo đăng nhập lạ.',
            'Nếu tài khoản bị chiếm quyền: thử khôi phục tài khoản qua kênh chính thức; đổi mật khẩu email liên quan; đăng xuất khỏi thiết bị lạ nếu có thể; báo bạn bè và người thân không tin tin nhắn mượn tiền từ tài khoản đó; báo cáo tài khoản bị chiếm quyền với nền tảng.',
          ], [
            'Mật khẩu mạnh + xác thực hai lớp là lớp bảo vệ đầu tiên và quan trọng nhất.',
          ]),
          lesson('6.1.1.5', 'Khi bị mạo danh', [
            'Nếu ai đó tạo tài khoản giả dùng tên, ảnh hoặc giọng và hình ảnh của bạn: chụp màn hình tài khoản hoặc bài đăng; lưu link; báo cáo tài khoản mạo danh trên nền tảng; cảnh báo người thân và bạn bè bằng kênh chính thức của bạn.',
            'Nếu liên quan đến lừa đảo, danh dự, hình ảnh nhạy cảm hoặc đe dọa, tìm hỗ trợ từ người hoặc cơ quan có trách nhiệm.',
            'Không nên: tranh cãi dài với tài khoản giả; đăng dữ liệu cá nhân của người bạn nghi ngờ nếu chưa chắc; tự xử lý một mình nếu vụ việc nghiêm trọng.',
          ], [
            'Khi bị mạo danh: chụp màn hình, lưu link, báo cáo nền tảng, cảnh báo người thân — không tranh cãi hay tự xử lý một mình.',
          ]),
        ],
        checkpoint: null,
      },
      // ── M6-611-E ─────────────────────────────────────────────────
      // ── M6-62-S ──────────────────────────────────────────────────
      {
        title: '6.2 Capstone: Hồ sơ sự việc của An',
        lessons: [
          lesson('6.2.0', 'Bối cảnh: Một chuỗi thông tin trong cùng một buổi tối', [
            'An nhận được một chuỗi thông tin trong cùng một buổi tối. Tài liệu A — Video ngắn: một video 18 giây cho thấy người nổi tiếng nói "Tôi đang hợp tác với nền tảng này để giúp mọi người có thêm thu nhập. Chỉ cần đăng ký hôm nay, bạn sẽ nhận được tài khoản ưu tiên." Video được đăng bởi tài khoản có tên gần giống tài khoản chính thức, không có dấu xác minh, mô tả có link rút gọn.',
            'Tài liệu B — Tin nhắn từ bạn cũ: "Mình vừa tham gia cái này, nhận tiền thật rồi. Cậu đăng ký nhanh đi, đừng bỏ lỡ." Tài khoản đúng ảnh đại diện nhưng An đã lâu không nói chuyện. Khi An hỏi gọi điện được không, người đó nói: "Mình đang bận, cứ bấm link đi."',
            'Tài liệu C — Ảnh chụp màn hình bình luận: nhiều bình luận như "Mình đã nhận 2 triệu", "Ban đầu tưởng lừa, ai ngờ thật", "Cơ hội này quá tốt". Không có link bài gốc trong ảnh chụp.',
            'Tài liệu D — Tin nhắn thoại: giọng nghe khá giống bạn cũ: "Tin mình đi, cơ hội này chỉ còn tối nay. Cậu nạp trước 1 triệu là được." Tài liệu E — Kết quả công cụ phát hiện AI: "Không phát hiện dấu hiệu deepfake rõ ràng." Tài liệu F — Dữ kiện bổ sung: kênh chính thức của người nổi tiếng không có thông tin về nền tảng này; tìm tên nền tảng thấy vài bài cảnh báo lừa đảo từ người dùng.',
          ], [
            'Capstone tổng hợp toàn bộ khóa học: deepfake, deepvoice, social engineering, sai bối cảnh, giới hạn detector và Deepfense Check.',
          ]),
          lesson('6.2.1', 'Nhiệm vụ: 5 phần phân tích', [
            'Bạn hãy hoàn thành 5 phần phân tích hồ sơ trên.',
            'Phần 1 — Phân loại nội dung: tài liệu nào có thể là deepfake, deepvoice, edited media, repurposed media, social engineering hoặc chưa đủ dữ liệu?',
            'Phần 2 — Đánh dấu red flags: chọn ít nhất 5 dấu hiệu đỏ từ hồ sơ.',
            'Phần 3 — Áp dụng Deepfense Check: điền Pause — Observe — Verify — Trace — Decide.',
            'Phần 4 — Đánh giá rủi ro: thấp, trung bình, cao hoặc khẩn cấp.',
            'Phần 5 — Kết luận và hành động: viết 3-5 câu — bạn sẽ làm gì và vì sao?',
          ], [
            'Capstone không yêu cầu chứng minh 100% video là deepfake. Mục tiêu là nhận ra tổng hợp các tín hiệu rủi ro và chọn hành động an toàn.',
          ]),
          lesson('6.2.2', 'Gợi ý phân tích', [
            'Phân loại nội dung: Tài liệu A — có thể là deepfake hoặc video mạo danh, chưa đủ dữ liệu kết luận tuyệt đối. Tài liệu B — có thể là tài khoản bị chiếm quyền hoặc social engineering. Tài liệu C — ảnh chụp bình luận không phải bằng chứng, có thể bị chọn lọc hoặc dàn dựng. Tài liệu D — có thể là deepvoice hoặc tin nhắn thoại thật từ tài khoản bị chiếm quyền, vẫn rủi ro cao. Tài liệu E — detector không phát hiện rõ không đồng nghĩa nội dung an toàn. Tài liệu F — kênh chính thức không xác nhận và có cảnh báo người dùng, làm rủi ro tăng.',
            'Red flags: người nổi tiếng kêu gọi đầu tư; tài khoản gần giống chính thức nhưng không xác minh; link rút gọn; yêu cầu đăng ký hoặc nạp tiền hôm nay; bạn cũ thúc giục nhưng né gọi điện; tin nhắn thoại tạo áp lực; bình luận tích cực không có nguồn gốc; kênh chính thức không có thông tin; có cảnh báo lừa đảo từ người dùng; lời hứa thu nhập dễ dàng.',
            'Deepfense Check — Pause: nội dung liên quan đến tiền, người nổi tiếng, link và áp lực thời gian. Observe: có nhiều dấu hiệu ngữ cảnh rủi ro — tài khoản không chính thức, link rút gọn, lời hứa lợi ích, bạn cũ né xác minh, giọng nói không đủ tin. Verify: kiểm tra kênh chính thức của người nổi tiếng, liên hệ bạn cũ qua số hoặc kênh khác, kiểm tra nền tảng qua nguồn đáng tin. Trace: tìm nguồn video gốc, kiểm tra tài khoản đăng đầu tiên, kiểm tra tên miền và link, tìm cảnh báo từ nguồn độc lập. Decide: không bấm link, không nạp tiền, cảnh báo bạn cũ và người thân nếu có nguy cơ, báo cáo tài khoản hoặc link nếu nghi lừa đảo.',
            'Đánh giá rủi ro: rủi ro cao. Không cần chứng minh chắc chắn video là deepfake để từ chối nạp tiền. Các tín hiệu ngữ cảnh đã đủ để không hành động theo yêu cầu.',
          ], [
            'Khi nhiều tín hiệu nhỏ cùng chỉ về một hướng rủi ro, bạn không cần đợi bằng chứng tuyệt đối mới chọn phương án an toàn.',
          ]),
          lesson('6.2.3', 'Rubric và phản hồi mẫu', [
            'Rubric capstone — tổng điểm đề xuất 20 điểm: phân loại nội dung (4đ) — nhận ra nhiều khả năng deepfake, deepvoice, social engineering hoặc chưa đủ dữ liệu; red flags (4đ) — nêu ít nhất 5 dấu hiệu đỏ phù hợp; Deepfense Check (5đ) — điền đủ 5 bước, hành động hợp lý; đánh giá rủi ro (3đ) — chọn mức cao hoặc khẩn cấp và giải thích được; kết luận và hành động (4đ) — không bấm link, không nạp tiền, xác minh kênh độc lập, báo cáo hoặc cảnh báo phù hợp.',
            'Điều kiện hoàn thành gợi ý: từ 14/20 điểm trở lên hoặc hoàn thành đầy đủ với phản hồi sửa lỗi.',
            'Phản hồi mẫu — nếu chọn không bấm link, không nạp tiền: đây là hướng xử lý an toàn. Bạn không cần chứng minh 100% video là deepfake. Khi nội dung liên quan đến tiền, người nổi tiếng, link rút gọn và áp lực thời gian, rủi ro đã đủ cao để dừng lại và xác minh.',
            'Nếu chọn nạp thử số tiền nhỏ: đây là lựa chọn rủi ro. Kẻ lừa đảo thường bắt đầu bằng số tiền nhỏ để tạo niềm tin hoặc mở đường cho yêu cầu lớn hơn. Nếu tin detector hoàn toàn: detector chỉ là một tín hiệu tham khảo — kết quả "không phát hiện deepfake rõ ràng" không có nghĩa là nội dung an toàn khi ngữ cảnh có nhiều dấu hiệu lừa đảo. Nếu muốn chia sẻ video để hỏi mọi người: chia sẻ lại video có thể giúp nội dung lừa đảo lan rộng hơn — cách tốt hơn là gửi riêng cho người có trách nhiệm.',
          ], [
            'Phòng vệ tốt không phải là sống trong nghi ngờ. Phòng vệ tốt là có quy tắc đủ rõ để bạn vẫn bình tĩnh khi nội dung trên màn hình cố làm bạn mất bình tĩnh.',
            'Sau Module 6, bạn đã sẵn sàng làm bài kiểm tra cuối khóa DEEPFENSE BASIC.',
          ]),
        ],
        checkpoint: null,
      },
      // ── M6-62-E ──────────────────────────────────────────────────
      {
        title: '6.3 Bài kiểm tra cuối khóa',
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
      q('Family Code dùng để làm gì?', ['Tăng lượt thích trên mạng xã hội.', 'Xác minh nhanh trong tình huống khẩn cấp giữa những người tin cậy.', 'Thay thế hoàn toàn ngân hàng.', 'Đăng công khai để mọi người biết.'], 1),
      q('Money Delay nghĩa là gì?', ['Chuyển tiền càng nhanh càng tốt.', 'Trì hoãn bắt buộc để xác minh trước yêu cầu tiền bất thường.', 'Không bao giờ chuyển tiền cho ai.', 'Chỉ chuyển tiền vào ban đêm.'], 1),
      q('Tình huống nào cần Two-Channel Rule?', ['Xem ảnh minh họa được ghi rõ là AI.', 'Người quen nhắn mượn tiền qua tài khoản có hành vi lạ.', 'Đổi hình nền điện thoại.', 'Đọc bài viết giải trí không yêu cầu hành động.'], 1),
      q('No Shame Reporting nghĩa là gì?', ['Không báo cáo vì xấu hổ.', 'Báo cáo sớm, không đổ lỗi hoặc làm nạn nhân xấu hổ.', 'Đăng mọi thứ lên mạng để mọi người biết.', 'Chỉ báo cáo khi đã chắc chắn 100%.'], 1),
      q('Evidence First nghĩa là gì?', ['Lưu bằng chứng an toàn trước khi xóa, chặn hoặc tranh cãi.', 'Đăng bằng chứng lên mọi nhóm.', 'Xóa hết tin nhắn ngay.', 'Chỉ nhớ trong đầu.'], 0),
      q('Điều nào KHÔNG nên dùng làm Family Code?', ['Một cụm từ riêng gia đình tự đặt.', 'Một câu xác minh không công khai.', 'Ngày sinh đã đăng công khai trên mạng xã hội.', 'Một quy ước gọi lại số cũ.'], 2),
      q('Bạn thấy hình ảnh nhạy cảm của một bạn học trong nhóm chat. Theo Deepfense Shield, hành động đúng là gì?', ['Gửi tiếp để hỏi thật giả.', 'Không lan truyền, báo cáo và hỗ trợ người bị hại.', 'Bình luận đùa nếu nghĩ là AI.', 'Lưu lại để phân tích.'], 1),
      q('Nếu đã lỡ chuyển tiền cho kẻ lừa đảo, việc nào nên làm sớm?', ['Xóa hết vì xấu hổ.', 'Liên hệ ngân hàng, lưu bằng chứng và báo cáo.', 'Im lặng chờ may mắn.', 'Chuyển thêm để lấy lại khoản đầu.'], 1),
      q('Trong công việc, một "sếp" gửi tin nhắn yêu cầu bỏ qua quy trình chuyển tiền vì đang gấp. Quy tắc nào phù hợp nhất?', ['Two-Channel Rule và Money Delay.', 'Chia sẻ công khai lên mạng xã hội ngay.', 'Chuyển trước rồi hỏi sau.', 'Tin nếu ảnh đại diện đúng.'], 0),
      q('Mục tiêu của Deepfense Shield là gì?', ['Làm người học sợ Internet.', 'Biến kiến thức thành quy tắc phòng vệ dễ áp dụng trong đời sống.', 'Dạy tạo deepfake.', 'Thay thế mọi cơ quan chức năng.'], 1),
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
