// ── HELPERS ────────────────────────────────────────────────────
export const lesson = (id, title, paragraphs, takeaways) => ({ id, title, paragraphs, takeaways });
export const q = (text, options, answer) => ({ text, options, answer });
export const checkpoint = (label, questions) => ({ label, questions });

// ── COURSE META ─────────────────────────────────────────────────
export const COURSE = {
  title: 'DEEPFENSE BASICS',
  subtitle: 'Nhận diện & phòng ngừa deepfake',
  totalModules: 10,
};

// ── MODULES ─────────────────────────────────────────────────────
export const MODULES = [
  // ── MODULE 0 ─────────────────────────────────────────────────
  {
    id: 0, part: 'intro',
    title: 'Khởi động: Trước khi bắt đầu',
    duration: '20-25 phút', level: 'Intro',
    scenario: 'Bạn sắp bắt đầu khoá học. Hãy cùng khám phá tại sao deepfake lại là vấn đề quan trọng ngay hôm nay.',
    outcomes: [
      'Hiểu mục tiêu và cấu trúc của DEEPFENSE BASICS.',
      'Biết tại sao học về deepfake là kỹ năng sống thiết yếu hiện nay.',
      'Xác định được mức độ nhận thức hiện tại của bản thân.',
    ],
    sections: [
      {
        title: '0.1 Tại sao khoá học này tồn tại',
        lessons: [
          lesson('0.0.0', 'Câu chuyện mở đầu: Video đầu tư lúc 6 giờ sáng', [
            'An, 24 tuổi, thức dậy lúc 6 giờ sáng và lướt điện thoại. Một video xuất hiện trong feed: người nổi tiếng đang nói về một ứng dụng đầu tư mới. Giọng nói tự tin, khuôn mặt quen thuộc, lời hứa hẹn hấp dẫn.',
            'An dừng lại. Thứ gì đó cảm giác không ổn — nhưng An không biết đó là gì. Video trông rất thật. Nhưng thật sự có thật không?',
            'Deepfake không phải chỉ là công nghệ Hollywood nữa. Chúng đang ở trong điện thoại của chúng ta, trong feed mạng xã hội, trong các cuộc gọi video và tin nhắn thoại hàng ngày. DEEPFENSE BASICS giúp bạn phát triển khả năng nhận diện và ứng phó.',
          ], [
            'Deepfake đang xuất hiện trong cuộc sống hàng ngày, không chỉ trong phim ảnh.',
            'Cảm giác "không ổn" là điểm khởi đầu — khoá học này giúp bạn phân tích nó.',
          ]),
          lesson('0.1.1', 'Mục tiêu của khoá học', [
            'DEEPFENSE BASICS không dạy bạn cách tạo deepfake. Khoá học dạy bạn cách sống và làm việc an toàn trong thế giới mà deepfake tồn tại.',
            'Sau khi hoàn thành, bạn sẽ: Hiểu deepfake là gì và tại sao chúng nguy hiểm. Nhận diện các dấu hiệu nghi vấn trong hình ảnh, video và âm thanh. Kiểm chứng thông tin trước khi tin và chia sẻ. Bảo vệ bản thân và người thân trước các kịch bản lừa đảo phổ biến.',
          ], [
            '4 kỹ năng cốt lõi: hiểu, nhận diện, kiểm chứng, bảo vệ.',
            'Không học cách tạo deepfake — học cách sống an toàn khi chúng tồn tại.',
          ]),
          lesson('0.1.2', 'Cấu trúc 9 module', [
            'Khoá học gồm 9 module chia thành 3 phần: Nền tảng (Module 1-3): Deepfake là gì, tại sao con người dễ bị lừa, và cách quan sát có hệ thống. Nhận diện (Module 4-6): Dấu hiệu hình ảnh/video, giọng nói, và kiểm chứng nguồn tin. Ứng phó (Module 7-9): Phòng ngừa cá nhân, xử lý khi gặp sự cố, và góc nhìn tổ chức.',
            'Mỗi module có: Câu chuyện tình huống thực tế, các bài học ngắn (5-10 phút/bài), checkpoint kiểm tra cuối section, và quiz tổng kết cuối module.',
          ], [
            '9 module, 3 phần: Nền tảng → Nhận diện → Ứng phó.',
            'Mỗi module gồm: tình huống, bài học, checkpoint, quiz.',
          ]),
        ],
        checkpoint: null,
      },
      {
        title: '0.2 Bài kiểm tra đầu vào',
        lessons: [
          lesson('0.2.0', 'Pre-test: Bạn đang ở đâu?', [
            'Trước khi bắt đầu, hãy trả lời 10 câu hỏi ngắn để xác định mức độ nhận thức hiện tại. Không có câu trả lời đúng hay sai hoàn toàn ở giai đoạn này — mục tiêu là để bạn tự biết mình đang ở điểm nào.',
            'Pre-test không ảnh hưởng đến kết quả học tập. Đây là công cụ để bạn so sánh trước và sau khoá học.',
          ], [
            'Pre-test giúp bạn biết điểm xuất phát, không phải để chấm điểm.',
          ]),
        ],
        checkpoint: checkpoint('0.2', [
          q('Deepfake thường liên quan đến công nghệ nào?', ['AI hoặc học máy', 'Nén file ZIP', 'Sao lưu dữ liệu', 'Tường lửa mạng'], 0),
          q('Một video nhìn thật có chắc chắn là thật không?', ['Không, cần kiểm chứng thêm', 'Có, vì mắt người luôn chính xác', 'Có, nếu độ phân giải cao', 'Có, nếu được chia sẻ nhiều'], 0),
          q('Deepfake có thể xuất hiện ở dạng nào?', ['Video, hình ảnh, giọng nói', 'Chỉ video', 'Chỉ văn bản', 'Chỉ ảnh tĩnh'], 0),
          q('Dấu hiệu nào có thể đáng nghi trong video khuôn mặt?', ['Chớp mắt, ánh sáng, viền mặt bất thường', 'Âm lượng loa lớn', 'File có tên dài', 'Video có phụ đề'], 0),
          q('Khi thấy nội dung gây sốc, bước đầu nên làm gì?', ['Dừng lại và xác minh nguồn', 'Chia sẻ ngay', 'Bình luận kết luận', 'Tải lại video'], 0),
          q('Deepfake nguy hiểm vì điều gì?', ['Có thể làm sai lệch niềm tin và danh tiếng', 'Luôn làm máy tính hỏng', 'Chỉ gây lỗi mạng', 'Không có nguy hiểm'], 0),
          q('Voice deepfake là gì?', ['Giả mạo hoặc tổng hợp giọng nói', 'Tăng âm lượng giọng thật', 'Dịch phụ đề', 'Cắt ghép nhạc nền'], 0),
          q('Nguồn đáng tin hơn thường có đặc điểm nào?', ['Có ngữ cảnh, dẫn chứng, lịch sử uy tín', 'Tiêu đề càng sốc càng tốt', 'Không cần tác giả', 'Chỉ đăng ở một trang lạ'], 0),
          q('DEEPFENSE BASICS giúp người học điều gì?', ['Hiểu, nhận biết và phòng ngừa cơ bản', 'Tạo deepfake nâng cao', 'Hack tài khoản', 'Vượt bài kiểm tra'], 0),
          q('Khi nghi ngờ bị deepfake tấn công, nên làm gì?', ['Lưu bằng chứng và báo người/cơ quan phù hợp', 'Xóa hết mọi thứ ngay', 'Im lặng hoàn toàn', 'Chia sẻ để mọi người xem'], 0),
        ]),
      },
    ],
    quiz: [
      q('Deepfake thường liên quan đến công nghệ nào?', ['AI hoặc học máy', 'Nén file ZIP', 'Sao lưu dữ liệu', 'Tường lửa mạng'], 0),
      q('Mục tiêu chính của DEEPFENSE BASICS là gì?', ['Học cách nhận diện và phòng ngừa deepfake', 'Học cách tạo deepfake', 'Học lập trình AI', 'Học thiết kế đồ họa'], 0),
      q('Khoá học chia thành mấy phần lớn?', ['3 phần: Nền tảng, Nhận diện, Ứng phó', '2 phần: Lý thuyết và Thực hành', '4 phần theo chủ đề', 'Không chia phần'], 0),
    ],
  },

  // ── MODULE 1 ─────────────────────────────────────────────────
  {
    id: 1, part: 'foundation',
    title: 'Deepfake là gì?',
    duration: '80-90 phút', level: 'Foundation',
    scenario: 'An đang ăn sáng và lướt điện thoại. Một video người nổi tiếng kêu gọi đầu tư xuất hiện trong feed. Video trông rất thật...',
    outcomes: [
      'Định nghĩa được deepfake và phân biệt với các loại nội dung giả mạo khác.',
      'Liệt kê được ít nhất 6 loại nội dung AI/chỉnh sửa.',
      'Giải thích được tại sao deepfake ngày càng khó nhận ra.',
      'Phân loại được một nội dung số vào đúng danh mục.',
    ],
    sections: [
      {
        title: '1.1 Deepfake và các họ hàng của nó',
        lessons: [
          lesson('1.0.0', 'Câu chuyện dẫn nhập: Video đầu tư của người nổi tiếng', [
            'An, 24 tuổi, đang ăn sáng và lướt Facebook. Một video xuất hiện trong feed: người nổi tiếng nói về một ứng dụng đầu tư mới, hứa lợi nhuận 30%/tháng.',
            'An dừng lại. Video trông thật — khuôn mặt quen thuộc, giọng nói tự tin. Nhưng người này có bao giờ nói về đầu tư không? Link bên dưới dẫn đến trang web lạ.',
            'Đây không phải video thật. Đây là deepfake — và An cần biết tại sao nó nguy hiểm.',
          ], [
            'Deepfake có thể xuất hiện ngay trong feed mạng xã hội hàng ngày của bạn.',
            'Câu hỏi quan trọng: người này có thật sự nói điều này không?',
          ]),
          lesson('1.1.1', 'Khái niệm 1: Deepfake là gì?', [
            'Deepfake là nội dung hình ảnh, video hoặc âm thanh được tạo ra hoặc chỉnh sửa bằng AI để khiến người xem tin rằng ai đó đã nói hoặc làm điều họ không bao giờ nói hoặc làm.',
            'Thuật ngữ "deepfake" ghép từ "deep learning" (học sâu — một nhánh của AI) và "fake" (giả mạo). Công nghệ này dùng mạng nơ-ron để học cách người thật trông như thế nào, nói như thế nào, rồi tạo ra phiên bản giả mạo.',
            'Deepfake không phải là photoshop thủ công. Nó là quá trình AI tự động, có thể tạo ra nội dung mới hoàn toàn hoặc biến đổi nội dung có sẵn một cách thuyết phục.',
          ], [
            'Deepfake = AI tạo ra hoặc chỉnh sửa nội dung để người thật trông như làm/nói điều họ không làm.',
            'Khác với photoshop: deepfake tự động hóa bằng AI, không phải chỉnh sửa thủ công.',
          ]),
          lesson('1.1.2', 'Khái niệm 2: Synthetic media là gì?', [
            'Synthetic media (nội dung tổng hợp) là thuật ngữ rộng hơn, bao gồm mọi nội dung được tạo ra hoàn toàn hoặc một phần bởi AI — không nhất thiết phải mạo danh ai cụ thể.',
            'Ví dụ: Một khuôn mặt người không có thật, được AI tạo ra từ đầu. Giọng nói của một nhân vật ảo hoàn toàn. Hình ảnh phong cảnh không có thật.',
            'Deepfake là một tập con của synthetic media: nó cụ thể hóa việc mạo danh người thật có thật.',
          ], [
            'Synthetic media = nội dung AI tạo ra, không nhất thiết mạo danh ai.',
            'Deepfake là tập con của synthetic media: có mạo danh người thật cụ thể.',
          ]),
          lesson('1.1.3', 'Khái niệm 3: Deepvoice là gì?', [
            'Deepvoice (còn gọi là voice cloning) là công nghệ AI nhân bản giọng nói của người thật. Chỉ cần vài giây âm thanh, AI có thể học cách người đó nói và tạo ra giọng nói mới nói bất kỳ điều gì.',
            'Deepvoice đặc biệt nguy hiểm vì: Không cần hình ảnh — chỉ cần audio. Rất khó phát hiện bằng tai thường. Có thể dùng trong cuộc gọi điện thoại thời gian thực.',
            'Kịch bản phổ biến: Kẻ tấn công clone giọng sếp của bạn và gọi điện yêu cầu chuyển tiền khẩn cấp.',
          ], [
            'Deepvoice = AI nhân bản giọng nói từ vài giây audio.',
            'Nguy hiểm vì dùng được qua điện thoại, không cần hình ảnh.',
          ]),
          lesson('1.1.4', 'Khái niệm 4: Face swap là gì?', [
            'Face swap là kỹ thuật hoán đổi khuôn mặt trong video hoặc ảnh — thay khuôn mặt người này bằng khuôn mặt người khác, trong khi giữ nguyên cơ thể và chuyển động.',
            'Face swap ban đầu là tính năng vui vẻ trong app ảnh. Nhưng khi được dùng để đặt khuôn mặt người nổi tiếng vào nội dung không phù hợp, nó trở thành công cụ lạm dụng.',
            'Dấu hiệu thường gặp: rìa khuôn mặt bị nhòe, ánh sáng không khớp giữa mặt và cơ thể, biểu cảm không tự nhiên.',
          ], [
            'Face swap = hoán đổi khuôn mặt người này sang video của người khác.',
            'Nhận ra: rìa mặt nhòe, ánh sáng lạ, biểu cảm không khớp.',
          ]),
          lesson('1.1.5', 'Khái niệm 5: Lip sync là gì?', [
            'Lip sync deepfake (còn gọi là talking head) là kỹ thuật thay đổi chuyển động miệng trong video để khớp với âm thanh mới — khiến người trong video "nói" những gì kẻ tấn công muốn.',
            'Khác với face swap (thay cả khuôn mặt), lip sync chỉ thay đổi vùng miệng. Video gốc có thể là thật — chỉ có lời nói là bịa đặt.',
            'Đây là kỹ thuật thường dùng để tạo video chính khách "nói" điều họ không bao giờ nói.',
          ], [
            'Lip sync = chỉ thay đổi chuyển động miệng để người thật "nói" điều giả.',
            'Nguy hiểm: dùng video thật, chỉ thay lời — khó phát hiện hơn.',
          ]),
          lesson('1.1.6', 'Khái niệm 6: Edited media là gì?', [
            'Edited media là nội dung thật bị chỉnh sửa bằng công cụ thông thường (không nhất thiết là AI) để thay đổi nghĩa hoặc bối cảnh — cắt, ghép, xoay màu, thêm phụ đề sai.',
            'Ví dụ: Video một chính khách bị cắt chỉ giữ lại phần có vẻ gây sốc, bỏ đi phần giải thích. Hoặc clip tốc độ chậm hơn để trông như người đó say xỉn.',
            'Edited media không cần AI nhưng cũng rất nguy hiểm — và thực ra phổ biến hơn deepfake trong các chiến dịch thông tin sai.',
          ], [
            'Edited media = nội dung thật bị cắt/ghép/sửa để thay đổi nghĩa.',
            'Phổ biến hơn deepfake nhưng ít được chú ý hơn — cần cảnh giác tương đương.',
          ]),
          lesson('1.1.7', 'Khái niệm 7: Repurposed media là gì?', [
            'Repurposed media là nội dung hoàn toàn thật, nhưng bị dùng sai bối cảnh. Video/ảnh thật được đăng kèm chú thích sai — sai ngày, sai địa điểm, sai sự kiện.',
            'Ví dụ: Ảnh từ một vụ lũ lụt năm 2015 ở quốc gia khác, được đăng lại với chú thích "lũ lụt ngay hôm nay tại Việt Nam".',
            'Đây là dạng thông tin sai phổ biến nhất, vì nội dung gốc là thật và không thể phát hiện bằng công cụ phát hiện deepfake.',
          ], [
            'Repurposed media = nội dung thật, bối cảnh sai — nguy hiểm vì không có lỗi kỹ thuật.',
            'Kiểm tra ngày, địa điểm và nguồn gốc, không chỉ kiểm tra kỹ thuật.',
          ]),
          lesson('1.1.8', 'Khái niệm 8: AI-generated image là gì?', [
            'AI-generated image là hình ảnh được tạo ra hoàn toàn bởi AI — không có người thật, địa điểm thật hoặc sự kiện thật đằng sau. Công cụ như Midjourney, DALL-E, Stable Diffusion có thể tạo ra hình ảnh siêu thực.',
            'Nguy hiểm khi: Khuôn mặt người không có thật được dùng để tạo tài khoản giả mạo. Hình ảnh bạo lực hoặc thảm họa giả được đăng như sự kiện thật. Chân dung giả mạo được dùng để mạo danh.',
            'Dấu hiệu nhận biết: da quá hoàn hảo, tay/ngón tay bất thường, chữ trên bảng hiệu méo, đồ trang sức kỳ lạ.',
          ], [
            'AI-generated image = hình ảnh AI tạo ra hoàn toàn, không có thật đằng sau.',
            'Dấu hiệu: da quá mịn, tay lạ, chữ méo, chi tiết nhỏ không nhất quán.',
          ]),
        ],
        checkpoint: checkpoint('1.1', [
          q('Deepfake khác gì so với photoshop thủ công?', ['Deepfake dùng AI tự động, photoshop chỉnh sửa thủ công', 'Deepfake chỉ dùng cho video, photoshop chỉ dùng cho ảnh', 'Photoshop mới hơn deepfake', 'Không có sự khác biệt'], 0),
          q('Deepvoice nguy hiểm nhất ở điểm nào?', ['Có thể dùng trong cuộc gọi điện thoại thời gian thực', 'Cần rất nhiều âm thanh mẫu', 'Chỉ hoạt động qua video', 'Dễ phát hiện bằng tai thường'], 0),
          q('Lip sync deepfake thay đổi gì trong video?', ['Chỉ thay đổi chuyển động miệng', 'Thay toàn bộ khuôn mặt', 'Thay toàn bộ cơ thể', 'Thay âm thanh nền'], 0),
          q('Repurposed media là gì?', ['Nội dung thật dùng sai bối cảnh', 'Video AI tạo hoàn toàn', 'Giọng nói bị nhân bản', 'Ảnh photoshop'], 0),
          q('Dấu hiệu nào gợi ý một AI-generated image?', ['Tay/ngón tay bất thường, chữ méo', 'Màu sắc quá nhạt', 'File quá lớn', 'Hình ảnh quá mờ'], 0),
          q('Synthetic media khác deepfake như thế nào?', ['Synthetic media rộng hơn, deepfake là tập con có mạo danh người thật', 'Synthetic media chỉ là deepfake chất lượng cao', 'Deepfake rộng hơn synthetic media', 'Chúng hoàn toàn giống nhau'], 0),
          q('Face swap thường lộ lỗi ở đâu?', ['Rìa khuôn mặt và ánh sáng không khớp', 'Màu quần áo', 'Cỡ file video', 'Độ phân giải âm thanh'], 0),
          q('Edited media phổ biến như thế nào so với deepfake?', ['Phổ biến hơn deepfake nhưng ít được chú ý', 'Hiếm hơn deepfake', 'Hoàn toàn không nguy hiểm', 'Chỉ dùng trong chiến tranh thông tin'], 0),
          q('Một video người chính khách bị cắt bỏ phần giải thích là loại nội dung gì?', ['Edited media', 'Deepfake', 'AI-generated', 'Synthetic media hoàn chỉnh'], 0),
          q('Để phát hiện repurposed media, cần kiểm tra điều gì?', ['Ngày, địa điểm và nguồn gốc của nội dung', 'Lỗi kỹ thuật trên khuôn mặt', 'Chất lượng âm thanh', 'Số lượng like'], 0),
        ]),
      },
      {
        title: '1.1.1 Vì sao deepfake ngày càng khó nhận ra?',
        lessons: [
          lesson('1.1.1.1', 'Công nghệ tốt hơn, chi phí thấp hơn', [
            'Năm 2017, tạo một deepfake thuyết phục cần server đắt tiền và hàng giờ xử lý. Năm 2024, có thể tạo deepfake chất lượng cao chỉ với điện thoại thông minh, trong vài phút, hoàn toàn miễn phí.',
            'Barrier to entry (rào cản gia nhập) đã gần như biến mất. Bất kỳ ai cũng có thể tạo deepfake, không cần kỹ năng kỹ thuật đặc biệt.',
          ], [
            'Chi phí và kỹ năng cần thiết để tạo deepfake đã giảm mạnh trong vài năm qua.',
            'Barrier to entry thấp = nhiều người có thể tạo, nhiều nội dung giả hơn.',
          ]),
          lesson('1.1.1.2', 'Dữ liệu cá nhân của chúng ta quá dễ tìm', [
            'AI cần dữ liệu để học. Dữ liệu về khuôn mặt và giọng nói của người nổi tiếng — và ngay cả người thường — đang ngày càng dễ lấy: ảnh và video công khai trên mạng xã hội, phỏng vấn và talk show trên YouTube, podcast và video TikTok.',
            'Chỉ vài phút video hay vài trăm ảnh đã đủ để tạo một deepfake đáng tin. Nhiều người trong chúng ta đã cung cấp đủ dữ liệu mà không biết.',
          ], [
            'Dữ liệu công khai trên mạng xã hội của chúng ta là nguyên liệu cho deepfake.',
            'Ít dữ liệu công khai hơn = ít nguyên liệu hơn cho kẻ tấn công.',
          ]),
          lesson('1.1.1.3', 'Nội dung lan nhanh hơn khả năng kiểm chứng', [
            'Một video deepfake có thể lan tới hàng triệu người trong vài giờ. Trong khi đó, kiểm chứng thực tế — tìm nguồn gốc, liên hệ chuyên gia, phân tích kỹ thuật — mất nhiều thời gian hơn.',
            'Đến khi sự thật được làm rõ, thông tin sai đã ăn sâu vào nhận thức của nhiều người. Não người có xu hướng nhớ thứ gì đó đã thấy, dù sau đó được đính chính.',
          ], [
            'Tốc độ lan truyền của deepfake nhanh hơn nhiều so với tốc độ kiểm chứng.',
            'Ngay cả sau đính chính, ấn tượng ban đầu thường vẫn còn lại.',
          ]),
          lesson('1.1.1.4', 'Mắt thường có giới hạn', [
            'Con người không được tiến hóa để phát hiện nội dung AI. Chúng ta tin vào điều mắt thấy và tai nghe vì trong hàng triệu năm tiến hóa, đó là dấu hiệu đáng tin cậy.',
            'Nhưng khi AI có thể tái tạo hình ảnh và âm thanh ở mức độ pixel, bộ não người không có "sensor" đặc biệt để phân biệt.',
            'Không phải bạn ngu hoặc thiếu tinh ý. Đây là giới hạn sinh học của nhận thức con người.',
          ], [
            'Não người không có "sensor" phát hiện AI — đây là giới hạn tiến hóa, không phải lỗi cá nhân.',
            'Nhận thức giới hạn này giúp bạn cẩn thận hơn thay vì tự tin thái quá.',
          ]),
          lesson('1.1.1.5', 'Công cụ phát hiện cũng có giới hạn', [
            'Các công cụ phát hiện deepfake tốt nhất hiện nay vẫn không hoàn hảo. Chúng có thể bỏ qua deepfake chất lượng cao, và đôi khi báo nhầm video thật là deepfake.',
            'Nguyên nhân: AI tạo deepfake và AI phát hiện deepfake đang trong cuộc đua liên tục. Mỗi khi có công cụ phát hiện tốt hơn, người tạo deepfake cũng nâng cấp kỹ thuật.',
            'Công cụ là hỗ trợ, không phải giải pháp duy nhất. Kỹ năng tư duy phê phán vẫn là quan trọng nhất.',
          ], [
            'Công cụ phát hiện deepfake không hoàn hảo và đang trong cuộc đua với kỹ thuật tạo.',
            'Tư duy phê phán quan trọng hơn bất kỳ công cụ nào.',
          ]),
          lesson('1.1.1.6', 'Vấn đề không chỉ là thật hay giả', [
            'Một trong những tác động nguy hiểm nhất của deepfake không phải là người bị lừa bởi nội dung giả. Đó là người ta bắt đầu nghi ngờ mọi thứ thật.',
            '"Liar\'s dividend" — kẻ xấu có thể nói bất kỳ video thật nào là deepfake để thoát khỏi trách nhiệm. Chính trị gia bị quay video làm điều xấu có thể tuyên bố đó là deepfake.',
            'Điều này xói mòn niềm tin vào bằng chứng nói chung — một tác hại lâu dài của kỷ nguyên deepfake.',
          ], [
            'Deepfake gây ra hai vấn đề: tin cái giả và không tin cái thật.',
            'Liar\'s dividend: nội dung thật có thể bị phủ nhận bằng cách gọi nó là deepfake.',
          ]),
          lesson('1.1.1.7', 'Một rủi ro ngược: Khi sự thật bị gọi là deepfake', [
            'Hãy nhớ rằng nghi ngờ thái quá cũng có hại. Nếu bạn gọi mọi thứ là deepfake mà không có căn cứ, bạn đang lan truyền thông tin sai theo chiều ngược lại.',
            'Mục tiêu không phải là nghi ngờ tất cả. Mục tiêu là kiểm chứng đúng cách trước khi kết luận và hành động.',
          ], [
            'Nghi ngờ thái quá cũng nguy hiểm — gọi mọi thứ là deepfake mà không kiểm chứng.',
            'Mục tiêu: kiểm chứng có hệ thống, không phải hoang mang toàn diện.',
          ]),
          lesson('1.1.1.8', 'Bài học lớn: Tại sao deepfake ngày càng khó nhận ra', [
            'Tổng kết 7 lý do: (1) Công nghệ tiến bộ nhanh, chi phí giảm. (2) Dữ liệu cá nhân công khai dồi dào. (3) Nội dung lan nhanh hơn kiểm chứng. (4) Não người có giới hạn nhận thức. (5) Công cụ phát hiện không hoàn hảo. (6) Ranh giới thật/giả ngày càng mờ. (7) Áp lực cảm xúc làm giảm khả năng phán đoán.',
            'Hiểu những nguyên nhân này giúp bạn không tự trách mình khi bị lừa, và xây dựng thói quen kiểm chứng có ý thức thay vì phụ thuộc vào cảm giác.',
          ], [
            '7 lý do tổng hợp giải thích tại sao deepfake ngày càng khó nhận ra.',
            'Hiểu nguyên nhân → không tự trách mình → xây dựng thói quen đúng.',
          ]),
        ],
        checkpoint: null,
      },
      {
        title: '1.2 Thực hành: Phân loại nội dung số',
        lessons: [
          lesson('1.2.0', 'Hướng dẫn thực hành', [
            'Bạn sẽ xem qua 12 thẻ tình huống mô tả các loại nội dung số khác nhau. Nhiệm vụ của bạn: phân loại mỗi nội dung vào đúng danh mục đã học.',
            'Danh mục: Deepfake | Deepvoice | Face swap | Lip sync | Edited media | Repurposed media | AI-generated image | Synthetic media (khác) | Nội dung thật.',
            'Không có bẫy — mỗi tình huống có một đáp án hợp lý nhất. Mục tiêu là luyện tập tư duy phân loại, không phải kiểm tra kiến thức kỹ thuật sâu.',
          ], [
            'Thực hành phân loại giúp biến kiến thức lý thuyết thành phản xạ nhận diện.',
          ]),
          lesson('1.2.1', 'Thẻ tình huống 1–6', [
            'Tình huống 1: Một video người nổi tiếng "tuyên bố từ chức" nhưng khẩu hình hơi lệch và xuất phát từ tài khoản lạ. → Khả năng cao là: Lip sync deepfake.',
            'Tình huống 2: Ảnh một "ngôi làng đang bốc cháy" nhưng chữ trên biển báo bị méo và bầu trời có viền lạ. → Khả năng cao là: AI-generated image.',
            'Tình huống 3: Cuộc gọi điện thoại từ "người thân" yêu cầu tiền, giọng nghe giống nhưng né gọi video. → Khả năng cao là: Deepvoice.',
            'Tình huống 4: Video biểu tình năm 2019 ở nước khác được đăng lại với caption "biểu tình hôm nay tại TP.HCM". → Đây là: Repurposed media.',
            'Tình huống 5: Hình ảnh CEO công ty trong trang phục không phù hợp, khuôn mặt hơi mượt, cổ có màu khác. → Khả năng cao là: Face swap.',
            'Tình huống 6: Clip phỏng vấn chính khách bị cắt bỏ 2/3 để chỉ còn câu nghe sốc. → Đây là: Edited media.',
          ], [
            'Phân loại nội dung giúp bạn chọn đúng cách kiểm chứng tiếp theo.',
            'Nhiều dấu hiệu cùng lúc tăng độ tin cậy của phán đoán.',
          ]),
          lesson('1.2.2', 'Thẻ tình huống 7–12', [
            'Tình huống 7: Tài khoản mạng xã hội với ảnh đại diện quá hoàn hảo, mắt không nhìn vào ống kính, tai hơi kỳ lạ. → Khả năng cao là: AI-generated image (thefake face).',
            'Tình huống 8: Video TikTok người dùng filter làm mặt hoàn toàn khác, rõ ràng là nghịch ngợm. → Đây là: Nội dung thật (filter công khai, không lừa đảo).',
            'Tình huống 9: Podcast bị lồng giọng AI, nhưng nội dung và thông tin đều trung thực. → Đây là: Synthetic media (không lừa đảo nếu được công khai).',
            'Tình huống 10: Video người nổi tiếng "kêu gọi đầu tư" từ kênh chính thức của họ, đã được xác nhận là thật. → Đây là: Nội dung thật (cần kiểm tra kênh chính thức).',
            'Tình huống 11: Ảnh "hiện trường vụ nổ" với chi tiết không nhất quán, không có cơ quan báo chí nào đưa tin. → Khả năng cao là: AI-generated image hoặc Edited media.',
            'Tình huống 12: Tin nhắn WhatsApp "chuyển tiếp từ bạn" kèm ảnh chụp màn hình tin tức, không có link gốc. → Rủi ro cao, cần kiểm chứng nguồn gốc.',
          ], [
            'Nội dung "thật" nhưng đặt sai bối cảnh cũng nguy hiểm như deepfake.',
            'Kênh chính thức được xác minh là điểm kiểm tra quan trọng nhất.',
          ]),
          lesson('1.2.3', 'Phản hồi tổng kết', [
            'Nhìn lại 12 tình huống: Bạn phân loại đúng bao nhiêu? Tình huống nào khó nhất? Tại sao?',
            'Điểm quan trọng: Phân loại chính xác không phải mục tiêu cuối cùng. Mục tiêu là nhận ra khi nào cần kiểm chứng thêm. Dù bạn không chắc chắn đây là loại nào, bạn vẫn có thể quyết định: không hành động theo yêu cầu rủi ro cho đến khi kiểm chứng.',
          ], [
            'Phân loại đúng không phải mục tiêu cuối — nhận ra khi nào cần kiểm chứng mới là mục tiêu.',
            'Không chắc phân loại → vẫn có thể quyết định an toàn.',
          ]),
        ],
        checkpoint: null,
      },
    ],
    quiz: [
      q('Deepfake khác với photoshop ở điểm nào?', ['Dùng AI tự động, không phải chỉnh sửa thủ công', 'Chỉ dùng cho video, không dùng cho ảnh', 'Không tạo ra được hình ảnh', 'Không nguy hiểm'], 0),
      q('Deepvoice nguy hiểm nhất ở điểm nào?', ['Có thể dùng trong cuộc gọi thời gian thực', 'Cần hàng nghìn giờ dữ liệu', 'Chỉ dùng trong phim ảnh', 'Dễ phát hiện bằng tai'], 0),
      q('Repurposed media là gì?', ['Nội dung thật dùng sai bối cảnh', 'Video AI tạo hoàn toàn', 'Ảnh photoshop', 'Giọng nói nhân bản'], 0),
      q('Tại sao mắt thường khó phát hiện deepfake?', ['Con người không tiến hóa để phát hiện nội dung AI', 'Deepfake luôn có chất lượng 8K', 'Mắt người quá tốt', 'Deepfake luôn phát sáng'], 0),
      q('"Liar\'s dividend" là gì?', ['Dùng khái niệm deepfake để phủ nhận bằng chứng thật', 'Lợi nhuận từ việc tạo deepfake', 'Tiền thưởng phát hiện deepfake', 'Thuật ngữ marketing'], 0),
      q('Lip sync deepfake thay đổi gì?', ['Chỉ chuyển động miệng', 'Toàn bộ khuôn mặt', 'Toàn bộ cơ thể', 'Chỉ màu da'], 0),
      q('Dấu hiệu nào gợi ý AI-generated image?', ['Tay/ngón tay bất thường', 'Màu sắc quá nhạt', 'File quá lớn', 'Video quá dài'], 0),
      q('Công cụ phát hiện deepfake hiện nay như thế nào?', ['Hữu ích nhưng không hoàn hảo', 'Hoàn toàn chính xác 100%', 'Không tồn tại', 'Chỉ dùng được bởi chuyên gia'], 0),
      q('Tại sao dữ liệu công khai trên mạng xã hội là rủi ro?', ['Là nguyên liệu để tạo deepfake về bạn', 'Làm chậm điện thoại', 'Bị tính phí', 'Làm giảm follower'], 0),
      q('Mục tiêu đúng khi học phân loại nội dung số là gì?', ['Biết khi nào cần kiểm chứng', 'Phân loại chính xác 100%', 'Tạo được deepfake', 'Nhớ được tất cả thuật ngữ'], 0),
    ],
  },

  // ── MODULE 2 ─────────────────────────────────────────────────
  {
    id: 2, part: 'foundation',
    title: 'Vì sao con người dễ bị lừa?',
    duration: '85-95 phút', level: 'Foundation',
    scenario: 'An đã biết deepfake là gì sau Module 1. Nhưng tại sao người thông minh vẫn bị lừa? An tìm hiểu tâm lý học đằng sau...',
    outcomes: [
      'Nhận diện 4 nút bấm cảm xúc thường bị khai thác.',
      'Hiểu hiệu ứng "tôi thấy tận mắt" và giới hạn của nó.',
      'Phân tích được một kịch bản lừa đảo thực tế.',
      'Biết phản ứng an toàn khi gặp yêu cầu khẩn cấp qua deepfake.',
    ],
    sections: [
      {
        title: '2.1 Bốn nút bấm cảm xúc',
        lessons: [
          lesson('2.0.0', 'Câu chuyện dẫn nhập: An nghĩ mình đủ tỉnh táo', [
            'Sau Module 1, An tự tin: "Mình biết deepfake rồi, mình sẽ không bị lừa." Một tuần sau, An nhận cuộc gọi từ "em gái": giọng y hệt, nói đang trong bệnh viện, cần chuyển tiền gấp.',
            'An run tay. Não An không nghĩ đến deepfake nữa — chỉ nghĩ đến em gái. An gần như chuyển tiền trước khi nhớ ra mình vừa học một điều gì đó về loại kịch bản này.',
            'Biết về deepfake chưa đủ. Cần hiểu tại sao não người phản ứng theo cách đó — và cách xây dựng phản xạ an toàn dù đang cảm xúc cao.',
          ], [
            'Kiến thức về deepfake không tự động ngăn bạn bị lừa trong lúc cảm xúc.',
            'Cần hiểu cơ chế tâm lý để xây dựng phản xạ an toàn.',
          ]),
          lesson('2.1.1', 'Nút bấm 1: Khẩn cấp', [
            'Khẩn cấp là nút bấm mạnh nhất. Khi não nhận tín hiệu "nguy hiểm ngay bây giờ", nó chuyển sang chế độ phản xạ — hành động nhanh, không phân tích.',
            'Kẻ lừa đảo tạo khẩn cấp bằng: giới hạn thời gian ("5 phút nữa hết hạn"), hậu quả ngay lập tức ("tài khoản sẽ bị khóa"), áp lực xã hội ("mọi người đã làm rồi, chỉ còn bạn chưa").',
            'Quy tắc an toàn: Bất cứ khi nào cảm thấy phải làm ngay — đó là lúc cần dừng lại nhiều nhất.',
          ], [
            'Khẩn cấp tắt khả năng phân tích của não — đây là mục tiêu của kẻ lừa đảo.',
            'Quy tắc: cảm thấy phải làm ngay → đó là lúc cần dừng lại nhất.',
          ]),
          lesson('2.1.2', 'Nút bấm 2: Thân quen', [
            'Não người tự động tin tưởng những gì quen thuộc. Khuôn mặt quen, giọng nói quen, tên quen trong địa chỉ email — tất cả kích hoạt niềm tin.',
            'Deepfake khai thác điều này hoàn hảo: dùng khuôn mặt người thân, sếp, bạn bè, người nổi tiếng quen thuộc để kích hoạt niềm tin tự động.',
            'Nhận ra: "Giọng này giống em gái mình" không bằng chứng đó là em gái mình. Sự quen thuộc không phải xác minh.',
          ], [
            'Quen thuộc kích hoạt niềm tin tự động — deepfake lợi dụng điều này.',
            'Quen thuộc ≠ xác minh danh tính. Cần kiểm tra qua kênh độc lập.',
          ]),
          lesson('2.1.3', 'Nút bấm 3: Quyền lực', [
            'Con người có xu hướng tuân thủ quyền lực — sếp, cơ quan nhà nước, ngân hàng, chuyên gia. Đây là hành vi tiến hóa hợp lý trong xã hội có cấu trúc.',
            'Kẻ lừa đảo giả mạo quyền lực: "Tôi là giám đốc công an", "Đây là ngân hàng gọi", "Theo lệnh của CEO". Áo khoác quyền lực làm mờ khả năng đặt câu hỏi.',
            'Nhận ra: Quyền lực thật không cần bạn hành động gấp mà không có thời gian xác minh.',
          ], [
            'Não người tiến hóa để tuân thủ quyền lực — lừa đảo khai thác xu hướng này.',
            'Quyền lực thật cho bạn thời gian xác minh. Quyền lực giả thúc ép khẩn cấp.',
          ]),
          lesson('2.1.4', 'Nút bấm 4: Lợi ích', [
            'Hứa hẹn lợi nhuận cao, phần thưởng, cơ hội hiếm kích hoạt vùng não phần thưởng — gây ra trạng thái hưng phấn giống hứng thú đánh bạc.',
            'Trong trạng thái này, người ta đánh giá thấp rủi ro và đánh giá cao phần thưởng. "Lợi nhuận 30% mỗi tháng" nghe vô lý khi bình tĩnh, nhưng hấp dẫn khi não đang trong chế độ phần thưởng.',
            'Nhận ra: Nếu một cơ hội nghe có vẻ quá tốt để là thật — nó thường là thật rằng nó quá tốt.',
          ], [
            'Hứa lợi nhuận cao kích hoạt vùng não phần thưởng, giảm khả năng đánh giá rủi ro.',
            'Quá tốt để là thật = thường là thật rằng nó quá tốt.',
          ]),
          lesson('2.1.5', 'Deepfake thường không đi một mình', [
            'Kẻ tấn công thường kết hợp nhiều nút bấm cùng lúc: Deepfake mặt sếp (thân quen + quyền lực) + yêu cầu chuyển tiền gấp (khẩn cấp) + thưởng nếu làm được (lợi ích).',
            'Sự kết hợp này làm tăng hiệu quả tấn công theo cấp số nhân. Mỗi nút bấm một mình đã mạnh — ba bốn nút cùng lúc có thể vượt qua hầu hết người.',
            'Khi thấy nhiều nút bấm cùng lúc trong một tình huống, đó là dấu hiệu cảnh báo mạnh nhất.',
          ], [
            'Lừa đảo hiệu quả nhất kết hợp nhiều nút bấm cùng lúc.',
            'Nhiều nút bấm cùng lúc = dấu hiệu cảnh báo mạnh nhất.',
          ]),
          lesson('2.1.6', 'Sáu dấu hiệu ngôn ngữ cần cảnh giác', [
            'Bất kể kênh nào (tin nhắn, cuộc gọi, video), có 6 mẫu ngôn ngữ thường xuất hiện trong lừa đảo: (1) Gấp: "ngay bây giờ", "không còn thời gian". (2) Bí mật: "đừng nói với ai", "chỉ mình em biết". (3) Đe dọa: "sẽ bị khóa", "hậu quả nghiêm trọng". (4) Quá tốt: "chắc chắn", "không rủi ro", "100% lợi nhuận". (5) Vượt quy trình: "bỏ qua quy trình thông thường vì gấp". (6) Yêu cầu bí mật cụ thể: OTP, mật khẩu, số thẻ, chuyển khoản.',
          ], [
            '6 mẫu ngôn ngữ cảnh báo: gấp, bí mật, đe dọa, quá tốt, vượt quy trình, yêu cầu bí mật.',
            'Một hoặc nhiều mẫu này → dừng lại và kiểm chứng trước.',
          ]),
        ],
        checkpoint: checkpoint('2.1', [
          q('Nút bấm cảm xúc nào mạnh nhất theo bài học?', ['Khẩn cấp', 'Lợi ích', 'Quyền lực', 'Thân quen'], 0),
          q('Khi cảm thấy phải hành động ngay lập tức, bạn nên làm gì?', ['Dừng lại và kiểm chứng', 'Hành động ngay vì đúng là gấp', 'Bỏ qua hoàn toàn', 'Hỏi người khác cùng hành động'], 0),
          q('"Quen thuộc kích hoạt niềm tin tự động" có nghĩa gì trong bối cảnh deepfake?', ['Khuôn mặt/giọng quen có thể làm bạn tin mà không cần kiểm chứng', 'Chỉ tin người lạ, không tin người quen', 'Người quen không bao giờ bị mạo danh', 'Niềm tin là không thể thay đổi'], 0),
          q('Quyền lực thật khác quyền lực giả ở điểm nào?', ['Quyền lực thật cho bạn thời gian xác minh', 'Quyền lực thật luôn gọi điện', 'Quyền lực giả luôn dùng email', 'Không có sự khác biệt'], 0),
          q('Tại sao "lợi nhuận 30%/tháng" nghe hấp dẫn dù vô lý?', ['Kích hoạt vùng não phần thưởng, giảm khả năng đánh giá rủi ro', 'Vì 30% thực sự là con số bình thường', 'Vì não người luôn tính toán chính xác', 'Không có lý do'], 0),
          q('Deepfake nguy hiểm nhất khi kết hợp với gì?', ['Nhiều nút bấm cảm xúc cùng lúc', 'Chỉ một nút bấm thôi', 'Không cần nút bấm cảm xúc', 'Chỉ khi chất lượng video rất cao'], 0),
          q('Câu nào là dấu hiệu cảnh báo ngôn ngữ?', ['"Đừng nói với ai, chuyển ngay bây giờ"', '"Xem xét khi bạn có thời gian"', '"Có thể xác minh qua kênh chính thức"', '"Không gấp, chỉ khi bạn sẵn sàng"'], 0),
          q('An gần như chuyển tiền vì điều gì?', ['Cảm xúc lo lắng cho em gái vượt qua kiến thức về deepfake', 'Vì không học Module 1', 'Vì cuộc gọi có video rõ nét', 'Vì đã xác minh kỹ rồi'], 0),
          q('Điều gì xảy ra khi não nhận tín hiệu "nguy hiểm ngay bây giờ"?', ['Chuyển sang chế độ phản xạ, giảm phân tích', 'Phân tích kỹ hơn bình thường', 'Tự động từ chối mọi yêu cầu', 'Không có ảnh hưởng'], 0),
          q('Mục tiêu thực sự của Module 2 là gì?', ['Hiểu cơ chế tâm lý để xây dựng phản xạ an toàn', 'Học cách không bao giờ cảm xúc', 'Nghi ngờ tất cả mọi người', 'Không bao giờ chuyển tiền'], 0),
        ]),
      },
      {
        title: '2.1.1 Hiệu ứng "tôi thấy tận mắt"',
        lessons: [
          lesson('2.1.1.1', 'Vì sao chúng ta tin thứ mình nhìn thấy?', [
            'Não người xử lý hình ảnh nhanh hơn ngôn ngữ 60.000 lần. Khi bạn thấy một video, não xử lý nó như thực tế trước khi lý trí có cơ hội phân tích.',
            'Điều này đã giúp tổ tiên chúng ta sống sót — nhìn thấy sư tử phải chạy ngay, không có thời gian phân tích. Nhưng trong thế giới deepfake, phản xạ này bị khai thác.',
          ], [
            'Não xử lý hình ảnh như thực tế trước khi lý trí có thể phân tích.',
            'Phản xạ tiến hóa giúp sống sót → bị khai thác bởi nội dung AI.',
          ]),
          lesson('2.1.1.2', 'Video có sức nặng cảm xúc', [
            'Video không chỉ truyền thông tin — nó truyền cảm xúc. Khi bạn thấy một video người thân đang khóc, não của bạn kích hoạt phản ứng cảm xúc tương đương.',
            'Deepfake video của người thân trong cảnh hoảng loạn kích hoạt cả lý trí và cảm xúc. Khi cảm xúc đủ mạnh, khả năng phân tích giảm xuống đáng kể.',
          ], [
            'Video truyền cảm xúc trực tiếp, không qua lý trí.',
            'Cảm xúc mạnh → khả năng phân tích giảm → dễ bị lừa hơn.',
          ]),
          lesson('2.1.1.3', 'Giọng nói chạm vào niềm tin cá nhân', [
            'Giọng nói của người thân có một vị trí đặc biệt trong não — được liên kết với ký ức, tình cảm và an toàn. Đây là lý do deepvoice đặc biệt nguy hiểm.',
            'Khi nghe giọng của mẹ hoặc bạn thân, não không chỉ nhận dạng giọng — nó kích hoạt toàn bộ mạng lưới cảm xúc và ký ức liên quan.',
          ], [
            'Giọng người thân được liên kết với cảm xúc và ký ức trong não.',
            'Deepvoice khai thác kết nối sâu này để vượt qua lý trí.',
          ]),
          lesson('2.1.1.4', 'Niềm tin nhóm có thể làm nội dung trông thật hơn', [
            'Khi bạn thấy nhiều người bình luận tích cực về một video, não bạn xử lý điều đó như bằng chứng xã hội — "nhiều người tin thì có lẽ là thật". Đây là social proof.',
            'Kẻ lừa đảo biết điều này — họ mua bình luận, dùng bot, hoặc seed nhóm để tạo cảm giác nhiều người đã tin. Một video deepfake có 500 bình luận tích cực trông thuyết phục hơn nhiều.',
          ], [
            'Bình luận tích cực tạo social proof giả — não xử lý đó như bằng chứng.',
            'Số lượng bình luận không phải xác nhận sự thật.',
          ]),
          lesson('2.1.1.5', 'Khi nào cần nghiêm túc kiểm chứng?', [
            'Không phải mọi video đều cần kiểm chứng sâu. Nhưng có những tình huống bắt buộc: khi video đi kèm yêu cầu hành động rủi ro (chuyển tiền, cung cấp thông tin, cài app), khi nội dung gây ra cảm xúc mạnh bất thường, khi nguồn gốc không rõ ràng hoặc là tài khoản không chính thức.',
          ], [
            '3 tình huống bắt buộc kiểm chứng: yêu cầu rủi ro, cảm xúc mạnh bất thường, nguồn không rõ.',
          ]),
          lesson('2.1.1.6', 'Câu trả lời trưởng thành: "Tôi chưa đủ dữ liệu"', [
            'Một trong những phản xạ khó nhất nhưng quan trọng nhất: thay vì tin ngay hoặc từ chối ngay, hãy nói "Tôi chưa đủ dữ liệu để kết luận — tôi cần kiểm chứng thêm."',
            'Điều này không phải nghi ngờ cực đoan hay tin ngây thơ. Đây là tư duy khoa học áp dụng vào cuộc sống hàng ngày: không kết luận trước khi có đủ bằng chứng.',
          ], [
            '"Tôi chưa đủ dữ liệu" là câu trả lời trưởng thành và an toàn nhất.',
            'Không phải tin ngây thơ, không phải nghi ngờ cực đoan — mà là tư duy khoa học.',
          ]),
        ],
        checkpoint: null,
      },
      {
        title: '2.2 Case tương tác: Cuộc gọi lúc 22:47',
        lessons: [
          lesson('2.2.0', 'Bối cảnh: An nhận cuộc gọi nghi vấn', [
            'Đêm muộn, 22:47. An đang sắp ngủ thì điện thoại reo. Màn hình hiện: "Em Linh gọi".',
            'An nghe máy. Giọng nghe giống em gái — nhưng hoảng loạn: "Anh ơi em đang ở bệnh viện, bạn em bị tai nạn. Anh chuyển cho em 15 triệu vào số tài khoản này nhé, em trả sau. Đừng gọi lại vì em đang vào phòng mổ với bạn."',
            'An có 30 giây để quyết định. Bạn sẽ làm gì?',
          ], [
            '22:47, cuộc gọi khẩn cấp, yêu cầu tiền, đừng gọi lại — bao nhiêu nút bấm bạn nhận ra?',
          ]),
          lesson('2.2.1', 'Phân tích tình huống và các lựa chọn', [
            'Phân tích các nút bấm: Khẩn cấp (bệnh viện, phòng mổ, bạn tai nạn). Thân quen (giọng em gái). Bí mật (đừng gọi lại). Áp lực cảm xúc (lo lắng cho em và bạn em).',
            'Lựa chọn 1 — Chuyển tiền ngay: Rủi ro cao. Nếu đây là deepvoice, bạn mất tiền. Không thể thu hồi.',
            'Lựa chọn 2 — Gọi lại số đã lưu của em: An toàn. Nếu em thật sự đang bận, cô ấy sẽ nhắn lại. Nếu không bắt máy, gọi cho bố mẹ hoặc người thân khác.',
            'Lựa chọn 3 — Nhắn tin qua kênh khác (Zalo, Messenger) hỏi: An toàn. Kẻ tấn công không kiểm soát tài khoản mạng xã hội của em gái bạn.',
            'Không bao giờ: chuyển tiền vào số tài khoản do người gọi cung cấp mà không xác minh qua kênh độc lập.',
          ], [
            '4 nút bấm trong 30 giây: khẩn cấp, thân quen, bí mật, cảm xúc.',
            'Luôn xác minh qua kênh độc lập trước khi chuyển tiền.',
          ]),
          lesson('2.2.2', 'Nếu đã lỡ chuyển tiền và bài học rút ra', [
            'Nếu đã chuyển: Gọi ngay ngân hàng để yêu cầu freeze giao dịch. Lưu lại toàn bộ thông tin (số tài khoản, nội dung cuộc gọi, thời gian). Báo cáo với ngân hàng và cơ quan có thẩm quyền. Không tự trách mình — đây là tấn công có thiết kế tâm lý, không phải lỗi ngây thơ.',
            'Bài học: Quy trình xác minh phải được thiết lập TRƯỚC khi có sự kiện. Gia đình hoặc nhóm thân thiết nên có một "mã an toàn" — câu hoặc từ đặc biệt chỉ người thật biết.',
          ], [
            '4 bước nếu đã chuyển: freeze ngân hàng, lưu bằng chứng, báo cáo, không tự trách.',
            'Thiết lập mã an toàn với gia đình TRƯỚC khi cần dùng đến.',
          ]),
          lesson('2.2.3', 'Checklist sau case và tổng kết Module 2', [
            'Checklist phản ứng khi nhận yêu cầu khẩn cấp: ① Dừng lại 5 giây trước khi hành động. ② Đếm số nút bấm cảm xúc trong tình huống. ③ Xác minh qua kênh độc lập (gọi lại số đã lưu, nhắn qua app khác). ④ Không chuyển tiền trước khi xác minh được danh tính. ⑤ Nếu không xác minh được → báo người thân hoặc trì hoãn.',
            'Tổng kết Module 2: Kiến thức về deepfake không đủ — cần phản xạ. Cảm xúc mạnh làm giảm khả năng phân tích. Bốn nút bấm (khẩn cấp, thân quen, quyền lực, lợi ích) là vũ khí của kẻ tấn công. Xác minh qua kênh độc lập là phản xạ an toàn duy nhất.',
          ], [
            '5 bước checklist phản ứng khẩn cấp: dừng, đếm nút bấm, xác minh, không chuyển trước, trì hoãn nếu nghi.',
            'Tổng kết: kiến thức + phản xạ + xác minh qua kênh độc lập = bộ ba phòng ngừa.',
          ]),
        ],
        checkpoint: null,
      },
    ],
    quiz: [
      q('Nút bấm cảm xúc nào mạnh nhất?', ['Khẩn cấp', 'Lợi ích', 'Quyền lực', 'Thân quen'], 0),
      q('Khi cảm thấy phải hành động ngay, nên làm gì?', ['Dừng lại và kiểm chứng', 'Hành động ngay', 'Bỏ qua', 'Hỏi nhiều người cùng lúc'], 0),
      q('Điều gì làm deepvoice đặc biệt nguy hiểm?', ['Giọng người thân kết nối với cảm xúc và ký ức', 'Chất lượng âm thanh quá tốt', 'Chỉ hoạt động ban đêm', 'Không thể phát hiện được'], 0),
      q('Social proof giả trong lừa đảo là gì?', ['Bình luận/bot giả tạo cảm giác nhiều người đã tin', 'Người thật xác nhận', 'Cơ quan nhà nước xác nhận', 'Báo chí đưa tin'], 0),
      q('Câu trả lời trưởng thành khi chưa đủ dữ liệu là gì?', ['"Tôi chưa đủ dữ liệu, cần kiểm chứng thêm"', '"Tôi tin"', '"Tôi không tin gì cả"', '"Tôi sẽ hỏi 10 người"'], 0),
      q('Trong case 22:47, lựa chọn an toàn nhất là gì?', ['Gọi lại số đã lưu của em gái', 'Chuyển tiền ngay', 'Bỏ máy', 'Tin vào giọng nói'], 0),
      q('"Đừng gọi lại" trong cuộc gọi khẩn cấp là dấu hiệu gì?', ['Dấu hiệu cảnh báo bí mật rõ ràng', 'Bình thường trong bệnh viện', 'An toàn nếu giọng nghe quen', 'Không quan trọng'], 0),
      q('Deepfake hiệu quả nhất khi kết hợp điều gì?', ['Nhiều nút bấm cảm xúc cùng lúc', 'Chỉ một nút bấm', 'Không cần nút bấm', 'Chỉ cần chất lượng video cao'], 0),
      q('Nếu đã chuyển tiền nhầm, bước đầu tiên là gì?', ['Gọi ngân hàng yêu cầu freeze giao dịch', 'Im lặng', 'Xóa bằng chứng', 'Chờ ngân hàng tự phát hiện'], 0),
      q('Mã an toàn gia đình là gì?', ['Câu/từ đặc biệt để xác minh danh tính trong tình huống khẩn cấp', 'Mật khẩu ngân hàng', 'Số điện thoại dự phòng', 'Email bí mật'], 0),
    ],
  },

  // ── MODULE 3 ─────────────────────────────────────────────────
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


  // ── MODULE 4 ─────────────────────────────────────────────────
  {
    id: 4, part: 'recognition',
    title: 'Quy trình Deepfense Check',
    duration: '115-125 phút', level: 'Intermediate',
    scenario: 'An đã học được nhiều điều: deepfake là gì, kẻ xấu dùng cảm xúc và áp lực như thế nào, cách quan sát hình ảnh và âm thanh. Nhưng khi nội dung thật sự xuất hiện trên màn hình, An vẫn bối rối. Một video đầu tư thì làm gì trước? Một cuộc gọi giống người thân thì kiểm tra thế nào? An cần một quy trình.',
    outcomes: [
      'Ghi nhớ và áp dụng quy trình 5 bước: Pause — Observe — Verify — Trace — Decide.',
      'Biết xác minh qua kênh độc lập trong các tình huống rủi ro.',
      'Biết truy nguồn cơ bản với hình ảnh, video, bài đăng và tài khoản.',
      'Biết dùng công cụ kiểm chứng ở mức phổ thông và hiểu giới hạn của chúng.',
    ],
    sections: [
      {
        title: '4.0 Câu chuyện dẫn nhập',
        lessons: [
          lesson('4.0.0', 'An cần một quy trình', [
            'Đến lúc này, An đã học được khá nhiều điều. An biết deepfake là gì. An biết kẻ xấu thường dùng cảm xúc và áp lực. An biết cách quan sát hình ảnh, âm thanh và ngữ cảnh. An cũng biết rằng mắt thường và công cụ phát hiện đều có giới hạn.',
            'Nhưng khi nội dung thật sự xuất hiện trên màn hình, An vẫn có thể bối rối. Một video đầu tư thì cần làm gì trước? Một cuộc gọi giống người thân thì kiểm tra thế nào? Một hình ảnh trong nhóm lớp thì có nên phân tích không? Một clip xã hội gây phẫn nộ thì có nên chia sẻ để cảnh báo không?',
            'Kiến thức rời rạc chưa đủ. An cần một quy trình. Một quy trình tốt giúp bạn không phải nghĩ lại từ đầu trong từng tình huống. Nó giống như dây an toàn: bạn dùng trước khi tai nạn xảy ra, không phải sau đó mới tìm.',
          ], null),
          lesson('4.0.1', 'Deepfense Check: 5 bước tổng quan', [
            'Trong DEEPFENSE BASIC, quy trình kiểm chứng cốt lõi là Deepfense Check, gồm 5 bước: (1) Pause — Dừng lại. (2) Observe — Quan sát. (3) Verify — Xác minh. (4) Trace — Truy nguồn. (5) Decide — Quyết định.',
            'Năm bước này không biến bạn thành chuyên gia pháp y số. Nhưng chúng giúp bạn trở thành người dùng Internet khó bị kéo đi bởi cảm xúc, áp lực và nội dung giả mạo.',
            'Module 4 sẽ đi sâu vào từng bước, giải thích kênh độc lập là gì, hướng dẫn các công cụ kiểm chứng phổ thông, và cho bạn thực hành qua các hồ sơ tình huống thực tế.',
          ], null),
        ],
        checkpoint: null,
      },
      {
        title: '4.1 Quy trình 5 bước Deepfense Check',
        lessons: [
          lesson('4.1.0', 'Bước 1 — Pause: Dừng lại', [
            'Pause là bước đơn giản nhất, nhưng thường khó nhất. Pause nghĩa là bạn tạm dừng trước khi: chuyển tiền, bấm link, gửi OTP, cài ứng dụng, chia sẻ bài đăng, bình luận tấn công ai đó, lưu hoặc chuyển tiếp hình ảnh nhạy cảm, hay tin một kết luận gây sốc.',
            'Pause không có nghĩa là bạn thờ ơ. Pause có nghĩa là bạn không để người khác điều khiển tốc độ phản ứng của mình. Hãy Pause ngay khi nội dung gây sợ hãi, gây phẫn nộ, khiến bạn thương hại và muốn giúp ngay, hứa lợi ích quá tốt, yêu cầu hành động gấp, hoặc liên quan đến tiền, tài khoản, danh dự, pháp lý hoặc an toàn.',
            'Câu lệnh tự nhắc: <em>Dừng 30 giây trước khi làm điều không thể rút lại.</em> Khi An nhận cuộc gọi giống Minh Anh yêu cầu chuyển tiền, việc đầu tiên không phải là phân tích khuôn mặt — việc đầu tiên là dừng lại. Nếu An không dừng, các bước sau không có cơ hội xảy ra.',
          ], null),
          lesson('4.1.1', 'Bước 2 — Observe: Quan sát', [
            'Observe nghĩa là xem xét nội dung theo ba lớp: (1) Hình ảnh/video, (2) Âm thanh/giọng nói, (3) Ngữ cảnh/hành vi. Bạn đã học ba lớp này ở Module 3. Trong bước Observe, bạn không cố kết luận ngay — bạn chỉ thu thập tín hiệu.',
            'Với hình ảnh/video: khuôn mặt, miệng, mắt, ánh sáng, tay, nền có gì lạ không? Video có bị cắt quá ngắn không? Với âm thanh: giọng có tự nhiên không? Có né trả lời câu hỏi bất ngờ không? Với ngữ cảnh: ai gửi? Gửi từ tài khoản nào? Nội dung muốn mình làm gì? Có link lạ, yêu cầu OTP hoặc chuyển tiền không?',
            'Bốn lỗi phổ biến khi Observe: (1) Chỉ nhìn mặt, quên nhìn nguồn. (2) Thấy một lỗi kỹ thuật rồi kết luận ngay là giả. (3) Không thấy lỗi kỹ thuật rồi tin ngay là thật. (4) Quên rằng ngữ cảnh có thể nguy hiểm hơn hình ảnh. Câu lệnh tự nhắc: <em>Quan sát để tìm tín hiệu, không phải để phán quyết vội.</em>',
          ], null),
          lesson('4.1.2', 'Bước 3 — Verify: Xác minh', [
            'Verify nghĩa là kiểm tra thông tin bằng một kênh đáng tin hơn hoặc độc lập hơn. Đây là bước quan trọng nhất trong các tình huống liên quan đến người quen, tiền bạc, tài khoản, OTP hoặc danh dự cá nhân.',
            'Xác minh không phải là hỏi lại trong cùng kênh đang nghi vấn. Nếu một tài khoản đang bị nghi mạo danh nhắn tin mượn tiền, hỏi lại chính tài khoản đó không đủ an toàn — vì nếu kẻ xấu đang điều khiển tài khoản, chúng sẽ trả lời ngay rằng đúng rồi.',
            'Xác minh tốt hơn là dùng kênh độc lập: gọi số điện thoại đã lưu từ trước, gọi người thân khác, kiểm tra website chính thức, gọi tổng đài chính thức tự tìm từ nguồn đáng tin, hỏi trực tiếp nếu có thể. Câu lệnh tự nhắc: <em>Xác minh bằng kênh mình đã biết, không phải kênh kẻ nghi vấn vừa đưa.</em>',
          ], null),
          lesson('4.1.3', 'Bước 4 — Trace: Truy nguồn', [
            'Trace nghĩa là tìm nguồn gốc và bối cảnh của nội dung. Bước này đặc biệt hữu ích với: video gây phẫn nộ, ảnh sự kiện, bài đăng lan truyền, lời kêu gọi đầu tư, ảnh chụp màn hình, nội dung liên quan người nổi tiếng, xã hội, chính trị, thiên tai, tai nạn.',
            'Truy nguồn là hỏi: Nội dung này xuất hiện lần đầu ở đâu? Ai đăng đầu tiên? Đăng khi nào? Có bản đầy đủ không? Có nguồn chính thức không? Có dấu hiệu bị đăng lại từ sự kiện cũ không? Có bị cắt khỏi bối cảnh không?',
            'Ví dụ: Một clip ghi "vừa xảy ra hôm nay" có thể đã xuất hiện từ nhiều năm trước. Một câu nói gây sốc có thể được cắt từ bài phát biểu dài. Một ảnh hiện trường có thể là ảnh AI hoặc ảnh từ quốc gia khác. Trace giúp bạn phát hiện các trường hợp nội dung thật nhưng chú thích sai. Câu lệnh tự nhắc: <em>Trước khi tin câu chuyện đi kèm, hãy tìm nguồn của nội dung.</em>',
          ], null),
          lesson('4.1.4', 'Bước 5 — Decide: Quyết định', [
            'Decide nghĩa là chọn hành động an toàn dựa trên những gì bạn đã quan sát, xác minh và truy nguồn. Kết quả không nhất thiết phải là "thật" hoặc "giả". Bạn có thể quyết định: tin ở mức thận trọng, chưa đủ dữ liệu, không chia sẻ, không chuyển tiền, không bấm link, báo cáo nội dung, cảnh báo người thân, lưu bằng chứng.',
            'Ba mức quyết định: Mức 1 — Rủi ro thấp: nội dung rõ ràng là minh họa, parody hoặc có nguồn minh bạch. Mức 2 — Chưa đủ dữ liệu: không có đủ cơ sở để tin hoặc bác bỏ, hành động an toàn là không chia sẻ và kiểm chứng thêm. Mức 3 — Rủi ro cao: nội dung yêu cầu tiền, OTP, mật khẩu, cài app, lan truyền hình ảnh nhạy cảm, hoặc kích động hành động gây hại.',
            'Câu lệnh tự nhắc: <em>Không cần biết chắc 100% mới được chọn phương án an toàn.</em>',
          ], null),
          lesson('4.1.5', 'Tóm tắt Deepfense Check và lưu ý thực tế', [
            'Bảng tóm tắt 5 bước: Pause — Nội dung có đang đẩy mình hành động nhanh không? Dừng lại trước khi bấm, chuyển, gửi, chia sẻ. Observe — Mình thấy/nghe/đọc được tín hiệu gì? Quan sát hình ảnh, âm thanh, ngữ cảnh. Verify — Có kênh độc lập nào để xác minh không? Gọi số đã lưu, kiểm tra kênh chính thức. Trace — Nguồn gốc nội dung ở đâu? Tìm bài gốc, nguồn đầu tiên, bản đầy đủ. Decide — Hành động an toàn nhất là gì? Không chia sẻ, báo cáo, lưu bằng chứng.',
            'Lưu ý quan trọng: Không phải tình huống nào cũng cần đủ 5 bước theo thứ tự cứng nhắc. Nếu ai đó yêu cầu OTP, bạn có thể quyết định ngay: không gửi. Nếu một video người nổi tiếng quảng cáo đầu tư, bạn cần Pause, Observe, Verify và Trace trước khi Decide. Nếu tin nhắn từ người thân yêu cầu chuyển tiền, Verify có thể quan trọng hơn Trace.',
            'Quy trình là bản đồ, không phải cái còng tay. Mục tiêu là giúp bạn không bỏ qua bước quan trọng nhất trong từng tình huống.',
          ], [
            'Deepfense Check: Pause → Observe → Verify → Trace → Decide.',
            'Pause là bước khó nhất vì cảm xúc và áp lực luôn muốn bạn hành động ngay.',
            'Decide không cần chắc 100% thật/giả — chỉ cần chọn hành động an toàn nhất.',
          ]),
        ],
        checkpoint: checkpoint('4.1', [
          q('Thứ tự đúng của Deepfense Check là gì?', ['Pause — Observe — Verify — Trace — Decide', 'Decide — Trace — Verify — Observe — Pause', 'Observe — Share — Believe — Delete — Decide', 'Trace — Pay — Verify — Pause — Share'], 0),
          q('Mục tiêu chính của bước Pause là gì?', ['Không để cảm xúc và áp lực khiến bạn hành động vội', 'Kéo dài thời gian cho vui', 'Kết luận nội dung là giả', 'Tìm lỗi trong khuôn mặt'], 0),
          q('Trong bước Observe, điều nào đúng?', ['Quan sát hình ảnh/video, âm thanh và ngữ cảnh', 'Chỉ cần nhìn mặt', 'Chỉ cần nghe giọng', 'Không cần xem người gửi'], 0),
          q('Một tài khoản quen nhắn mượn tiền. Cách Verify an toàn nhất là gì?', ['Gọi số điện thoại đã lưu từ trước hoặc dùng kênh độc lập đã biết', 'Hỏi lại trong cùng tài khoản đang nhắn', 'Chuyển khoản nhỏ trước để thử', 'Tin vì ảnh đại diện đúng'], 0),
          q('Trace đặc biệt hữu ích trong tình huống nào?', ['Kiểm tra nguồn gốc một video lan truyền gây phẫn nộ', 'Gửi OTP cho ngân hàng', 'Đổi hình nền điện thoại', 'Chọn nhạc chuông'], 0),
          q('Nếu một nội dung yêu cầu OTP, bạn nên quyết định thế nào?', ['Không gửi OTP qua cuộc gọi hoặc tin nhắn', 'Gửi nếu giọng nói giống người quen', 'Gửi nếu người gọi nói gấp', 'Gửi một nửa mã'], 0),
          q('Câu nào thể hiện đúng tinh thần Decide?', ['Nếu rủi ro cao, có thể chọn không hành động dù chưa chứng minh được deepfake', 'Phải biết chắc 100% thật/giả mới được hành động an toàn', 'Nếu video trông thật thì luôn chia sẻ được', 'Nếu nhiều người bình luận tích cực thì không cần kiểm chứng'], 0),
          q('Kênh nào KHÔNG phải kênh độc lập an toàn?', ['Link do người đang yêu cầu chuyển tiền vừa gửi', 'Số điện thoại đã lưu từ trước', 'Website chính thức tự tìm từ nguồn đáng tin', 'Người thân khác mà bạn đã biết'], 0),
          q('Một hình ảnh nhạy cảm nghi là của bạn học xuất hiện trong nhóm chat. Bạn nên làm gì?', ['Không lan truyền, báo cáo và tìm người có trách nhiệm hỗ trợ', 'Lưu lại và gửi cho nhiều người để hỏi thật giả', 'Bình luận đùa nếu có thể là ảnh AI', 'Phóng to phân tích công khai'], 0),
          q('Điều nào đúng nhất về Deepfense Check?', ['Là quy trình giúp giảm rủi ro khi gặp nội dung nghi vấn', 'Là công cụ đảm bảo phát hiện mọi deepfake', 'Chỉ dùng cho chuyên gia công nghệ', 'Chỉ dùng khi có video, không dùng cho âm thanh hoặc tin nhắn'], 0),
        ]),
      },
      {
        title: '4.2 Kênh độc lập là gì?',
        lessons: [
          lesson('4.2.0', 'Vì sao cần kênh độc lập?', [
            'Khi một kênh đang bị nghi vấn, bạn không nên dùng chính kênh đó làm bằng chứng duy nhất. Ví dụ: bạn nhận tin nhắn từ tài khoản Facebook của bạn thân nhắn mượn tiền gấp. Nếu bạn hỏi lại trong cùng cuộc chat và nhận được câu xác nhận, bạn vẫn chưa xác minh được.',
            'Vì nếu tài khoản đã bị chiếm quyền, kẻ xấu cũng đang đọc và trả lời tin nhắn đó. Kênh độc lập giúp bạn thoát khỏi vùng mà kẻ xấu có thể kiểm soát.',
            'Đây là lý do tại sao Verify yêu cầu một kênh khác — không phải kênh đang bị nghi vấn.',
          ], null),
          lesson('4.2.1', 'Kênh độc lập tốt là gì?', [
            'Một kênh độc lập tốt thường có 3 đặc điểm: (1) Bạn đã biết nó từ trước. (2) Nó không được cung cấp bởi người đang bị nghi vấn trong lúc khẩn cấp. (3) Nó cho phép bạn xác minh với người thật, tổ chức thật hoặc nguồn chính thức.',
            'Ví dụ kênh độc lập tốt: số điện thoại người thân đã lưu từ lâu, gặp trực tiếp, gọi người thân khác, email nội bộ công ty đã biết, hệ thống phê duyệt chuyển khoản của công ty, website chính thức tự tìm qua nguồn đáng tin, tổng đài ngân hàng lấy từ thẻ hoặc app chính thức.',
            'Kênh mạng xã hội có dấu xác minh và lịch sử rõ ràng cũng có thể là kênh độc lập — nhưng chỉ khi bạn tự tìm đến, không phải click từ link do người nghi vấn gửi.',
          ], null),
          lesson('4.2.2', 'Kênh không nên tin ngay', [
            'Hãy cẩn trọng với: số điện thoại mới được gửi trong tin nhắn khẩn cấp, link xác minh do người lạ gửi, website có tên miền gần giống trang thật, tài khoản mới lập, tài khoản quen nhưng hành vi bất thường, ảnh chụp màn hình không có link gốc, mã QR không rõ nguồn, file cài đặt gửi qua chat, nhóm chat vừa được tạo để xử lý việc gấp.',
            'Những kênh này không phải lúc nào cũng xấu. Nhưng chúng không nên là cơ sở duy nhất để bạn chuyển tiền, gửi OTP hoặc chia sẻ thông tin nhạy cảm.',
          ], null),
          lesson('4.2.3', 'Family code — mật khẩu gia đình', [
            'Một cách đơn giản để phòng trường hợp giả giọng người thân là tạo family code: một câu hoặc từ khóa bí mật chỉ các thành viên thân thiết biết, dùng trong tình huống khẩn cấp để xác minh nhanh. Ví dụ: một câu hỏi riêng mà người ngoài khó biết, một cụm từ gia đình tự đặt, hoặc một quy tắc gọi lại trước khi chuyển tiền.',
            'Family code nên: dễ nhớ với người trong gia đình, không đăng lên mạng, không dựa vào thông tin công khai như ngày sinh hay tên thú cưng đã đăng, và được cập nhật nếu nghi đã lộ.',
            'Lưu ý: Family code hữu ích nhưng không thay thế hoàn toàn kênh độc lập. Nếu tình huống liên quan đến tiền lớn hoặc rủi ro an toàn, vẫn nên gọi lại bằng số đã lưu hoặc xác minh qua người thân khác.',
          ], null),
          lesson('4.2.4', 'Quy tắc xác minh cho công việc và trường học', [
            'Trong công việc và trường học, xác minh không nên phụ thuộc vào cảm giác cá nhân. Nên có quy trình rõ: yêu cầu chuyển tiền phải qua kênh phê duyệt chính thức, yêu cầu thay đổi tài khoản nhận tiền phải xác minh bằng cuộc gọi hoặc văn bản chính thức, yêu cầu dữ liệu nhạy cảm phải có người phụ trách xác nhận.',
            'Trong trường học: giáo viên và học sinh không xử lý hình ảnh nhạy cảm trong nhóm chat công khai. Khi có nội dung nghi xâm hại, ưu tiên báo người có trách nhiệm và giảm lan truyền.',
            'Nếu một sếp hoặc giáo viên yêu cầu bỏ qua quy trình vì đang gấp, đó là dấu hiệu cần cảnh giác — không phải lý do để tuân theo. Kẻ tấn công thường dùng áp lực thời gian để vô hiệu hóa quy trình xác minh.',
          ], [
            'Kênh độc lập là kênh bạn đã biết từ trước — không phải kênh do người nghi vấn vừa cung cấp.',
            'Family code là lớp xác minh nhanh cho gia đình, không thay thế kênh độc lập trong rủi ro lớn.',
            'Áp lực gấp là dấu hiệu cảnh giác, không phải lý do để bỏ qua quy trình xác minh.',
          ]),
        ],
        checkpoint: null,
      },
      {
        title: '4.3 Công cụ kiểm chứng cơ bản',
        lessons: [
          lesson('4.3.0', 'Nguyên tắc trước khi dùng công cụ', [
            'Công cụ kiểm chứng có thể hữu ích, nhưng trước khi dùng hãy nhớ: (1) Không tải lên hình ảnh nhạy cảm của người khác vào công cụ lạ. (2) Không tải lên giấy tờ cá nhân, ảnh riêng tư, dữ liệu công ty hoặc thông tin mật. (3) Không tin tuyệt đối vào một kết quả tự động. (4) Không cài extension hoặc app lạ chỉ vì một bài viết hướng dẫn. (5) Ưu tiên công cụ và nguồn có uy tín.',
            'Với nội dung nghi xâm hại, mục tiêu đầu tiên là giảm lan truyền và báo cáo an toàn — không phải phân tích công khai.',
            'Câu cần nhớ: <em>Kiểm chứng không được tạo thêm rủi ro cho nạn nhân hoặc chính bạn.</em>',
          ], null),
          lesson('4.3.1', 'Reverse image search — tìm kiếm ngược bằng hình ảnh', [
            'Reverse image search là tìm kiếm ngược bằng hình ảnh: thay vì nhập từ khóa, bạn dùng một hình ảnh để tìm xem nó đã từng xuất hiện ở đâu. Phương pháp này hữu ích khi bạn muốn biết: ảnh có cũ không, ảnh có bị gán sai địa điểm không, ảnh đại diện có bị lấy từ nơi khác không.',
            'Các bước cơ bản: (1) Lưu ảnh hoặc chụp màn hình phần cần kiểm tra. (2) Dùng tính năng tìm kiếm bằng hình ảnh trên các công cụ tìm kiếm phổ biến. (3) Xem các kết quả cũ hơn. (4) So sánh ngày đăng, nguồn đăng và bối cảnh. (5) Không chỉ xem một kết quả đầu tiên; hãy so sánh nhiều nguồn.',
            'Giới hạn: Reverse image search có thể không tìm được nếu ảnh mới hoàn toàn, đã bị cắt/làm mờ/lật ngang, hoặc là ảnh AI chưa từng xuất hiện trước đó. Vì vậy, không tìm thấy kết quả không có nghĩa là ảnh thật.',
          ], null),
          lesson('4.3.2', 'Cắt frame từ video để truy nguồn', [
            'Video khó tìm kiếm hơn ảnh, nhưng bạn có thể kiểm tra bằng cách lấy một hoặc vài khung hình đặc trưng: khung hình có mặt người, có bảng hiệu, có địa điểm, có logo, hoặc có vật thể đặc biệt. Sau đó dùng reverse image search với khung hình đó.',
            'Cách làm: (1) Tạm dừng video tại một khung hình rõ. (2) Chụp màn hình. (3) Cắt bớt phần giao diện nền tảng nếu cần. (4) Tìm kiếm bằng hình ảnh. (5) So sánh kết quả với chú thích hiện tại.',
            'Ví dụ: Một video được đăng với chú thích "Vụ việc vừa xảy ra tối nay" — nhưng khi tìm khung hình, bạn thấy video đã xuất hiện từ 2 năm trước ở một quốc gia khác. Khi đó vấn đề có thể không phải deepfake — mà là sai bối cảnh.',
          ], null),
          lesson('4.3.3', 'Kiểm tra kênh chính thức và tài khoản nhái', [
            'Với người nổi tiếng, cơ quan, trường học, ngân hàng hoặc doanh nghiệp, hãy kiểm tra kênh chính thức: Nội dung này có trên website chính thức không? Có trên fanpage hoặc kênh đã xác minh không? Có thông báo từ app chính thức không? Có báo chí uy tín hoặc nguồn độc lập xác nhận không?',
            'Tài khoản nhái có thể: dùng ảnh đại diện giống, dùng tên gần giống, thêm dấu chấm hoặc ký tự lạ, mua tương tác hoặc bình luận, ghim bài viết giả tạo uy tín.',
            'Nếu một video đầu tư chỉ xuất hiện ở tài khoản lạ mà không có trên kênh chính thức, rủi ro rất cao — dù khuôn mặt và giọng nói trong video trông có vẻ thật đến đâu.',
          ], null),
          lesson('4.3.4', 'Kiểm tra website, đường link và metadata', [
            'Nhiều vụ lừa đảo dùng website giả. Hãy chú ý: tên miền có gần giống trang thật không, có ký tự lạ không, có yêu cầu đăng nhập hoặc OTP không. Nguyên tắc: không đăng nhập tài khoản quan trọng qua link được gửi trong tin nhắn nghi vấn. Nếu cần kiểm tra ngân hàng, hãy tự mở app chính thức hoặc tự nhập địa chỉ website đã biết.',
            'Một số nội dung số có thể chứa metadata: thông tin về thời gian tạo, thiết bị, phần mềm hoặc quá trình chỉnh sửa. Nếu một nội dung có thông tin provenance rõ ràng, đó là tín hiệu tốt. Nhưng nếu không có metadata, không thể kết luận ngay là giả — vì metadata có thể bị xóa khi đăng lên mạng xã hội hoặc khi chụp màn hình.',
            'Provenance là một lớp hỗ trợ niềm tin, không phải phép màu.',
          ], null),
          lesson('4.3.5', 'Detector deepfake — dùng như thế nào cho đúng?', [
            'Detector là công cụ cố gắng phát hiện nội dung do AI tạo hoặc bị chỉnh sửa. Nên dùng detector như thế nào: dùng như một tín hiệu phụ, đọc kỹ mức độ chắc chắn và giới hạn của công cụ, không tải nội dung nhạy cảm lên công cụ không rõ chính sách dữ liệu, kết hợp với nguồn, ngữ cảnh và xác minh độc lập.',
            'Không nên dùng detector như thế nào: không xem "AI 90%" là phán quyết cuối cùng, không xem "không phát hiện AI" là chứng nhận thật, không dùng để phân tích hình ảnh nhạy cảm của người khác trong nhóm chat.',
            'Câu cần nhớ: <em>Detector có thể giúp bạn nghi ngờ có cơ sở hơn, nhưng không thay bạn chịu trách nhiệm cho quyết định.</em>',
          ], [
            'Reverse image search giúp phát hiện ảnh cũ bị gán sai bối cảnh — nhưng không tìm thấy không có nghĩa là thật.',
            'Kiểm tra kênh chính thức: nếu nội dung không xuất hiện trên kênh chính thức, rủi ro rất cao.',
            'Detector deepfake chỉ là tín hiệu hỗ trợ, không phải phán quyết cuối cùng.',
          ]),
        ],
        checkpoint: checkpoint('4.3', [
          q('Reverse image search không thể phát hiện điều gì?', ['Ảnh AI hoàn toàn mới chưa từng xuất hiện trước đó', 'Ảnh bị lấy từ sự kiện cũ', 'Ảnh bị gán sai địa điểm', 'Ảnh đại diện bị lấy từ nơi khác'], 0),
          q('Khi nghi ngờ một tài khoản mạo danh người nổi tiếng, bước kiểm tra đầu tiên nên là gì?', ['Tìm kênh chính thức của người đó và xem có cùng nội dung không', 'Bấm vào link trong video để xem sản phẩm', 'Hỏi bình luận trong video', 'Dùng detector deepfake ngay'], 0),
          q('Điều nào đúng về detector deepfake?', ['Kết quả là tín hiệu hỗ trợ, không phải phán quyết cuối cùng', 'Kết quả AI 90% chứng minh chắc chắn nội dung là giả', 'Không phát hiện AI nghĩa là nội dung thật 100%', 'Nên dùng để phân tích hình ảnh nhạy cảm trong nhóm chat'], 0),
        ]),
      },
      {
        title: '4.4 Thực hành: Deepfense Check',
        lessons: [
          lesson('4.4.0', 'Hướng dẫn điền mẫu Deepfense Check', [
            'Trong phần thực hành này, bạn sẽ áp dụng quy trình Pause — Observe — Verify — Trace — Decide vào 3 hồ sơ tình huống thực tế. Với mỗi hồ sơ, hãy suy nghĩ: Điều gì khiến bạn cần Pause? Bạn Observe được tín hiệu gì? Bạn sẽ Verify qua kênh nào? Bạn sẽ Trace nguồn gì? Hành động Decide an toàn nhất là gì?',
            'Không phải hồ sơ nào cũng cần tất cả các bước ở mức độ như nhau. Hãy chọn bước phù hợp với rủi ro của từng tình huống.',
            'Câu cần nhớ: <em>Một quy trình tốt không cần làm bạn chậm mãi. Nó chỉ cần làm bạn chậm đúng lúc.</em>',
          ], null),
          lesson('4.4.1', 'Hồ sơ 1: Người nổi tiếng và ứng dụng đầu tư', [
            'Tình huống: Bạn thấy một video người nổi tiếng nói rằng đang dùng một ứng dụng đầu tư. Video được đăng bởi tài khoản tên gần giống tài khoản chính thức. Mô tả có link đăng ký. Bình luận rất tích cực. Kênh chính thức của người nổi tiếng không có video này.',
            'Phân tích: Pause — nội dung liên quan đến đầu tư, tiền, link đăng ký và người nổi tiếng. Observe — tài khoản không chính thức, lời hứa tài chính, bình luận có thể là seeding. Verify — kiểm tra kênh chính thức của người nổi tiếng, nguồn báo chí uy tín. Trace — tìm video gốc, kiểm tra tài khoản đăng đầu tiên, kiểm tra tên miền của link.',
            'Decide: Không bấm link, không chuyển tiền, không đăng ký. Cảnh báo người thân nếu họ đang định tham gia. Đây là kịch bản lừa đảo đầu tư deepfake phổ biến nhất hiện nay tại Việt Nam.',
          ], null),
          lesson('4.4.2', 'Hồ sơ 2: Tin nhắn thoại từ người thân', [
            'Tình huống: Tài khoản của người thân gửi tin nhắn thoại nghe giống giọng thật: "Chuyển giúp 3 triệu vào tài khoản này ngay, đừng gọi lại, đang rối lắm." Số tài khoản nhận tiền là tên người lạ.',
            'Phân tích: Pause — có yêu cầu chuyển tiền gấp và yêu cầu không gọi lại — đây là hai dấu hiệu áp lực cổ điển. Observe — giọng giống nhưng hành vi bất thường; tài khoản nhận tiền lạ; có dấu hiệu cô lập (đừng gọi lại). Verify — gọi số điện thoại đã lưu, gọi người thân khác, dùng family code nếu có.',
            'Decide: Không chuyển tiền khi chưa xác minh qua kênh độc lập. Lưu ý: yêu cầu không gọi lại là dấu hiệu rất mạnh của lừa đảo — người thân thật không cần bạn tránh xác minh.',
          ], null),
          lesson('4.4.3', 'Hồ sơ 3: Clip gây phẫn nộ trong nhóm chat', [
            'Tình huống: Một clip 12 giây được chia sẻ trong nhóm chat với chú thích "Vừa xảy ra ở gần trường mình, chia sẻ để mọi người biết." Clip gây phẫn nộ. Không có link gốc. Có người trong nhóm kêu gọi tìm danh tính người trong clip.',
            'Phân tích: Pause — nội dung gây phẫn nộ, kêu gọi chia sẻ và có nguy cơ làm hại người trong clip. Observe — clip rất ngắn, thiếu bối cảnh, không có nguồn gốc rõ, có lời kêu gọi hành động tập thể. Trace — tìm nguồn đầu tiên, kiểm tra clip có cũ hoặc sai địa điểm không.',
            'Decide: Không chia sẻ thêm, không truy tìm hoặc bêu tên cá nhân, báo người có trách nhiệm nếu có rủi ro thật. Lưu ý quan trọng: dù clip thật hay deepfake, lan truyền và truy tìm danh tính đều có thể gây hại nghiêm trọng cho nạn nhân.',
          ], [
            'Hồ sơ 1: Video đầu tư người nổi tiếng trên tài khoản không chính thức — không bấm link, không chuyển tiền.',
            'Hồ sơ 2: Yêu cầu không gọi lại là dấu hiệu lừa đảo mạnh — luôn xác minh qua kênh độc lập.',
            'Hồ sơ 3: Clip ngắn gây phẫn nộ không rõ nguồn — không chia sẻ, không truy tìm danh tính.',
          ]),
        ],
        checkpoint: checkpoint('4.4', [
          q('Trong Hồ sơ 1, dấu hiệu nghi vấn quan trọng nhất là gì?', ['Video chỉ xuất hiện ở tài khoản không chính thức, không có trên kênh chính thức', 'Bình luận quá tích cực', 'Video có chất lượng cao', 'Người nổi tiếng nói chậm'], 0),
          q('Trong Hồ sơ 2, tại sao yêu cầu đừng gọi lại là dấu hiệu cảnh giác mạnh?', ['Người thân thật không cần bạn tránh xác minh — chỉ kẻ xấu mới muốn bạn không kiểm tra', 'Vì gọi lại tốn tiền', 'Vì người thân đang bận', 'Vì cuộc gọi có thể bị nghe lén'], 0),
          q('Trong Hồ sơ 3, tại sao không nên chia sẻ hoặc truy tìm danh tính ngay cả khi nghi là deepfake?', ['Dù thật hay giả, hành động đó vẫn có thể gây hại nghiêm trọng cho người trong clip', 'Vì deepfake không vi phạm pháp luật', 'Vì chỉ nên chia sẻ khi clip đã xác nhận là thật', 'Vì truy tìm danh tính cần kỹ năng chuyên gia'], 0),
        ]),
      },
    ],
    quiz: [
      q('Deepfense Check gồm mấy bước và theo thứ tự nào?', ['5 bước: Pause — Observe — Verify — Trace — Decide', '3 bước: Stop — Check — Share', '4 bước: Scan — Analyze — Report — Delete', '5 bước: Detect — Verify — Block — Report — Ignore'], 0),
      q('Khi nào cần Pause ngay lập tức?', ['Khi nội dung yêu cầu hành động gấp liên quan đến tiền, OTP hoặc chia sẻ', 'Khi video có độ phân giải thấp', 'Khi người gửi là người lạ hoàn toàn', 'Chỉ khi nội dung bằng tiếng nước ngoài'], 0),
      q('Kênh độc lập an toàn nhất để Verify là gì?', ['Số điện thoại người thân đã lưu từ trước — không phải kênh do người nghi vấn vừa cung cấp', 'Link do người đang nhắn tin vừa gửi', 'Hỏi lại ngay trong cùng cuộc chat', 'Bình luận công khai trong video'], 0),
      q('Trace đặc biệt quan trọng trong tình huống nào?', ['Video lan truyền gây phẫn nộ không rõ nguồn gốc', 'Khi nhận OTP từ ngân hàng', 'Khi thay đổi hình nền điện thoại', 'Khi cài ứng dụng từ kho ứng dụng chính thức'], 0),
      q('Decide yêu cầu bạn phải làm gì?', ['Chọn hành động an toàn nhất dù chưa chứng minh được deepfake', 'Xác nhận 100% là deepfake trước khi từ chối', 'Hỏi ý kiến số đông trước khi quyết định', 'Đợi báo chí đưa tin rồi mới hành động'], 0),
      q('Family code nên có đặc điểm nào?', ['Dễ nhớ với gia đình, không đăng công khai, không dựa vào thông tin có thể tra được', 'Càng phức tạp càng tốt', 'Nên dùng ngày sinh để dễ nhớ', 'Nên chia sẻ rộng để nhiều người biết'], 0),
      q('Reverse image search không giúp phát hiện điều gì?', ['Ảnh AI mới hoàn toàn chưa từng xuất hiện trên internet', 'Ảnh bị tái sử dụng từ sự kiện cũ', 'Ảnh bị gán sai bối cảnh', 'Ảnh đại diện bị lấy từ nguồn khác'], 0),
      q('Khi clip gây phẫn nộ xuất hiện trong nhóm chat, hành động nào đúng nhất?', ['Không chia sẻ thêm, không truy tìm danh tính, báo người có trách nhiệm', 'Chia sẻ ngay để cảnh báo mọi người', 'Phân tích công khai trong nhóm', 'Dùng detector để xác nhận thật giả rồi mới quyết định'], 0),
    ],
  },


  // ── MODULES 5–9: Placeholder ──────────────────────────────────
  ...[5, 6, 7, 8, 9].map(id => ({
    id, part: id <= 6 ? 'recognition' : 'response',
    title: [
      'Nhận diện giọng nói và âm thanh giả mạo',
      'Kiểm chứng bối cảnh, nguồn tin và metadata',
      'Phòng ngừa deepfake cho cá nhân',
      'Ứng phó khi gặp hoặc trở thành nạn nhân',
      'Deepfake trong tổ chức: SOC, GRC và security awareness',
    ][id - 5],
    duration: '90-100 phút', level: id <= 6 ? 'Recognition' : 'Response',
    scenario: 'Nội dung đang được xây dựng. Sẽ cập nhật sớm.',
    outcomes: ['Nội dung đang được phát triển.'],
    sections: [
      {
        title: `${id}.1 Nội dung đang được xây dựng`,
        lessons: [
          lesson(`${id}.0.0`, 'Module đang được phát triển', [
            `Module ${id} đang trong quá trình xây dựng. Nội dung sẽ được cập nhật sớm.`,
            'Bạn có thể tiếp tục với các module đã hoàn thành và quay lại đây sau.',
          ], ['Nội dung module này sẽ sớm được cập nhật.']),
        ],
        checkpoint: null,
      },
    ],
    quiz: [q('Module này đang được xây dựng.', ['OK', 'Hiểu rồi', 'Sẽ quay lại', 'Cảm ơn'], 0)],
  })),
];

// ── HELPERS FOR NAVIGATION ───────────────────────────────────────
export function buildLessonIndex() {
  const index = [];
  for (const mod of MODULES) {
    for (const sec of mod.sections) {
      for (const les of sec.lessons) {
        index.push({ moduleId: mod.id, sectionTitle: sec.title, lesson: les, checkpoint: sec.checkpoint });
      }
    }
  }
  return index;
}
