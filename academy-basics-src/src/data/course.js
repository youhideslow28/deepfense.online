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
    title: 'Nhìn, nghe, đọc: Dấu hiệu nghi vấn',
    duration: '100-110 phút', level: 'Foundation',
    scenario: 'An nhìn lại video đầu tư từ Module 1 — lần này với ba lớp quan sát: hình ảnh, âm thanh, ngữ cảnh.',
    outcomes: [
      'Biết quan sát các dấu hiệu nghi vấn trong hình ảnh và video.',
      'Nhận diện dấu hiệu thường gặp của deepvoice.',
      'Phân biệt dấu hiệu kỹ thuật với dấu hiệu ngữ cảnh.',
      'Sử dụng được checklist 3 lớp: hình ảnh - âm thanh - ngữ cảnh.',
    ],
    sections: [
      {
        title: '3.1 Dấu hiệu hình ảnh và video',
        lessons: [
          lesson('3.0.0', 'Câu chuyện dẫn nhập: An xem lại video đầu tư', [
            'Sáng hôm sau, An mở lại video người nổi tiếng kêu gọi đầu tư đã thấy ở Module 1. Lần này, An không vội tin.',
            'An bật video chậm lại và tự hỏi từng lớp: Khuôn mặt có gì lạ? Khẩu hình có khớp? Ánh sáng hợp lý không? Giọng tự nhiên không? Video từ tài khoản chính thức chưa?',
            'Module 3 dạy bạn cách quan sát theo ba lớp: hình ảnh, âm thanh, và ngữ cảnh.',
          ], [
            'Quan sát không phải chỉ nhìn mặt — là xem toàn bộ tình huống theo ba lớp.',
          ]),
          lesson('3.1.0', 'Nguyên tắc đầu tiên: Chậm lại', [
            'Khi video gây sốc, não phản ứng trước khi quan sát. Bước đầu tiên không phải tìm lỗi kỹ thuật — mà là chậm lại và nhắc bản thân: "Mình đang xem nội dung trên màn hình, chưa cần kết luận ngay."',
            'Sau đó quan sát theo vòng: (1) Tổng thể, (2) Khuôn mặt, (3) Miệng và âm thanh, (4) Ánh sáng, (5) Chi tiết nhỏ, (6) Nền và vật thể, (7) Nguồn đăng.',
          ], [
            'Bước 1 luôn là: chậm lại. Cảm xúc mạnh = lúc cần cẩn thận nhất.',
            'Quan sát theo vòng từ tổng thể đến chi tiết.',
          ]),
          lesson('3.1.2', 'Vùng quan sát 2: Khuôn mặt', [
            'Chú ý: Da mặt có quá mịn so với cổ/tay không? Rìa khuôn mặt có bị nhòe khi quay đầu không? Biểu cảm có khớp với nội dung lời nói không?',
            'Nhớ: một dấu hiệu lạ chưa đủ để kết luận. Video chất lượng thấp, ánh sáng yếu cũng tạo hiện tượng nhòe. Ghi nhận, không kết luận vội.',
          ], [
            'Khuôn mặt quan trọng nhưng không phải vùng duy nhất cần quan sát.',
            'Ghi nhận dấu hiệu — không kết luận từ một dấu hiệu duy nhất.',
          ]),
          lesson('3.1.4', 'Vùng quan sát 4: Miệng và khẩu hình', [
            'Khẩu hình có khớp với âm thanh không? Có độ trễ giữa môi và tiếng không? Răng/lưỡi có chuyển động tự nhiên không?',
            'Lưu ý: video thật cũng có thể lệch tiếng do đường truyền kém, file bị nén. Khẩu hình lệch là tín hiệu, không phải kết luận.',
          ], [
            'Khẩu hình không khớp = tín hiệu cần chú ý, không phải bằng chứng chắc chắn.',
          ]),
          lesson('3.1.9', 'Dấu hiệu tổng hợp', [
            'Một dấu hiệu đơn lẻ hiếm khi đủ. Nhưng nhiều dấu hiệu cùng lúc — video từ tài khoản lạ, người nổi tiếng kêu gọi chuyển tiền, khẩu hình lệch, không trên kênh chính thức, link dẫn đến trang lạ — thì rủi ro tăng cao.',
            'Không cần kết luận 100% deepfake. Chỉ cần: rủi ro đủ cao để không hành động theo.',
          ], [
            'Nhiều tín hiệu cùng lúc mới đủ nặng.',
            'Không cần chứng minh deepfake — chỉ cần đánh giá rủi ro đủ cao để dừng lại.',
          ]),
        ],
        checkpoint: checkpoint('3.1', [
          q('Bước đầu tiên khi xem video gây sốc là gì?', ['Dừng lại và quan sát chậm hơn', 'Chia sẻ ngay', 'Kết luận ngay là deepfake', 'Tin nếu có nhiều lượt thích'], 0),
          q('Khẩu hình lệch trong video có nghĩa là gì?', ['Là tín hiệu cần chú ý, nhưng cần thêm kiểm chứng', 'Chắc chắn deepfake', 'Chắc chắn thật', 'Không quan trọng'], 0),
          q('Dấu hiệu nào thuộc lớp hình ảnh?', ['Rìa khuôn mặt nhòe khi quay đầu', 'Yêu cầu chuyển tiền gấp', 'Người gửi bảo không nói với ai', 'Link dẫn trang lạ'], 0),
          q('Một dấu hiệu đơn lẻ như video mờ nên được hiểu thế nào?', ['Chưa đủ để kết luận', 'Chắc chắn giả', 'Chắc chắn thật', 'Không cần quan tâm nguồn'], 2),
          q('Video nghi vấn nên được đánh giá thế nào khi có nhiều tín hiệu cùng lúc?', ['Rủi ro tăng lên đáng kể, cần kiểm chứng', 'Một tín hiệu đã đủ', 'Không quan trọng số lượng tín hiệu', 'Chỉ quan trọng nếu thấy lỗi kỹ thuật'], 0),
          q('Vì sao cần quan sát nền và vật thể xung quanh?', ['Nền có thể tiết lộ sai bối cảnh, chữ méo, logo sai', 'Khuôn mặt luôn đáng tin', 'Deepfake chỉ lỗi ở nền', 'Vật thể trong nền không bao giờ bị sửa'], 0),
          q('Mục tiêu đúng của quan sát hình ảnh là gì?', ['Tìm tín hiệu để quyết định có cần kiểm chứng thêm', 'Kết luận thật giả trong 3 giây', 'Tin vào cảm giác đầu tiên', 'Thay thế hoàn toàn kiểm tra nguồn'], 0),
          q('Khi tay đi qua mặt và khuôn mặt bị biến dạng, đây là gì?', ['Dấu hiệu hình ảnh cần chú ý', 'Bằng chứng chắc chắn deepfake', 'Không liên quan', 'Dấu hiệu video luôn an toàn'], 0),
          q('Quy tắc quan sát hình ảnh theo vòng là gì?', ['Tổng thể trước, chi tiết sau', 'Chi tiết trước, tổng thể sau', 'Chỉ nhìn khuôn mặt', 'Không có thứ tự'], 0),
          q('Khi thấy khuôn mặt sáng khác hẳn cổ và nền, nên làm gì?', ['Ghi nhận là dấu hiệu cần kiểm tra thêm', 'Kết luận ngay là giả', 'Bỏ qua', 'Chia sẻ để người khác tự kiểm tra'], 0),
        ]),
      },
      {
        title: '3.2 Dấu hiệu âm thanh và ngữ cảnh',
        lessons: [
          lesson('3.2.1', 'Giọng nói là tín hiệu mạnh nhưng không tuyệt đối', [
            'Ta thường nhận ra người quen qua giọng. Nhưng trong thời đại deepvoice, giọng nói không còn là bằng chứng tuyệt đối.',
            'Điều này không có nghĩa nghi ngờ mọi cuộc gọi. Nó có nghĩa: nếu cuộc gọi yêu cầu điều rủi ro — chuyển tiền, gửi OTP, cung cấp mật khẩu — bạn cần xác minh qua kênh độc lập.',
          ], [
            'Giọng quen thuộc kích hoạt niềm tin — deepvoice lợi dụng điều này.',
            'Yêu cầu rủi ro qua giọng nói → xác minh qua kênh độc lập.',
          ]),
          lesson('3.2.2', 'Dấu hiệu âm thanh cần chú ý', [
            'Giọng đều đều, thiếu nhịp thở tự nhiên. Cảm xúc không khớp tình huống. Ngắt nghỉ kỳ lạ. Phát âm sai tên riêng hoặc biệt danh. Né gọi lại. Âm thanh quá sạch so với môi trường được mô tả.',
            'Một dấu hiệu đơn lẻ chưa đủ — phải đặt trong bức tranh tổng thể.',
          ], [
            '6 dấu hiệu âm thanh cần chú ý — đặt trong bức tranh tổng thể.',
          ]),
          lesson('3.3.1', 'Ngữ cảnh thường quan trọng hơn lỗi kỹ thuật', [
            'Ngữ cảnh = ai gửi, qua kênh nào, muốn bạn làm gì, ai được lợi, ai có thể bị hại.',
            'Ví dụ: Video người nổi tiếng kêu gọi đầu tư trông rất thật. Nhưng nếu đăng từ tài khoản mới lập, dẫn đến website lạ, hứa lợi nhuận cao — rủi ro đã rất cao dù video trông thật.',
            'Không cần chứng minh deepfake mới có quyền từ chối bấm link.',
          ], [
            'Ngữ cảnh = ai gửi, muốn làm gì, ai được lợi, ai bị hại.',
            'Không cần chứng minh deepfake để từ chối yêu cầu rủi ro.',
          ]),
          lesson('3.3.7', 'Checklist ngữ cảnh và tổng kết', [
            '10 câu trước khi tin/chia sẻ/hành động: (1) Ai gửi? (2) Kênh gửi đáng tin không? (3) Có nguồn gốc rõ không? (4) Có nguồn độc lập xác nhận không? (5) Yêu cầu tiền/OTP/mật khẩu không? (6) Tạo áp lực khẩn cấp/sợ hãi không? (7) Ai được lợi nếu mình tin? (8) Ai bị hại nếu sai? (9) Mình đủ dữ liệu để kết luận chưa? (10) Hành động an toàn nhất bây giờ là gì?',
          ], [
            '10 câu checklist ngữ cảnh — dùng trước mọi hành động rủi ro.',
            'Lỗi kỹ thuật giúp nghi ngờ — ngữ cảnh giúp quyết định.',
          ]),
        ],
        checkpoint: null,
      },
    ],
    quiz: [
      q('Ba lớp quan sát trong Module 3 là gì?', ['Hình ảnh, âm thanh, ngữ cảnh', 'Kỹ thuật, cảm xúc, logic', 'Nguồn, nội dung, người gửi', 'Ngắn, trung, dài hạn'], 0),
      q('Giọng nói quen thuộc chứng minh điều gì?', ['Chưa chứng minh danh tính — cần xác minh qua kênh độc lập', 'Chắc chắn người thật gọi', 'Không bao giờ cần xác minh thêm', 'Chứng minh không có lừa đảo'], 0),
      q('Ngữ cảnh thường quan trọng hơn lỗi kỹ thuật vì?', ['Nhiều nội dung giả không có lỗi kỹ thuật rõ ràng', 'Lỗi kỹ thuật luôn dễ thấy', 'Ngữ cảnh không liên quan đến deepfake', 'Chỉ chuyên gia mới biết ngữ cảnh'], 0),
      q('Khi không thấy lỗi kỹ thuật trong video, điều đó có nghĩa là?', ['Không chắc thật — cần xem ngữ cảnh và yêu cầu', 'Chắc chắn thật', 'Không cần kiểm tra thêm', 'Deepfake luôn có lỗi kỹ thuật rõ'], 1),
      q('Câu nào trong checklist ngữ cảnh quan trọng nhất?', ['Nội dung yêu cầu tôi làm gì?', 'Video có độ phân giải cao không?', 'Có nhiều bình luận tích cực không?', 'Người đăng có nhiều follower không?'], 0),
      q('Dấu hiệu âm thanh nào đáng chú ý nhất?', ['Giọng đều đều + né gọi lại + câu trả lời lặp', 'Âm lượng quá to', 'Có nhạc nền', 'Nói quá nhanh'], 0),
      q('Bình luận tích cực dưới video có phải bằng chứng tin cậy không?', ['Không — có thể là seeding hoặc bot', 'Có — nhiều người tin là đáng tin', 'Có nếu trên 500 bình luận', 'Tùy thuộc vào nền tảng'], 0),
      q('Khi video có nhiều tín hiệu nghi vấn cùng lúc, nên làm gì?', ['Đánh giá rủi ro cao và kiểm chứng trước khi hành động', 'Chắc chắn deepfake và đăng cảnh báo', 'Tin nếu khuôn mặt trông ổn', 'Chờ người khác báo trước'], 0),
      q('Nguồn đầu tiên của nội dung có thể tiết lộ điều gì?', ['Bối cảnh gốc và tính xác thực', 'Chỉ cho biết nội dung cũ hay mới', 'Không quan trọng', 'Số lượt xem thực sự'], 0),
      q('Mục tiêu của quan sát 3 lớp là gì?', ['Đánh giá rủi ro để quyết định có cần kiểm chứng thêm', 'Kết luận đây là deepfake', 'Tìm lỗi kỹ thuật nhỏ nhất', 'Thay thế kiểm chứng nguồn'], 0),
    ],
  },

  // ── MODULE 4 ─────────────────────────────────────────────────
  {
    id: 4, part: 'recognition',
    title: 'Nhận diện dấu hiệu hình ảnh và video',
    duration: '90-100 phút', level: 'Trung cấp',
    scenario: 'Minh, 31 tuổi, làm truyền thông. Đồng nghiệp gửi vào nhóm chat một video: lãnh đạo cấp cao đang phát biểu điều gì gây tranh cãi. Mọi người đang phản ứng. Minh nhìn video — chất lượng tốt, khuôn mặt quen thuộc, âm thanh rõ. Nhưng có gì đó không ổn. Làm thế nào Minh biết phải nhìn vào đâu?',
    outcomes: [
      'Nhận diện ít nhất 10 dấu hiệu nghi vấn cụ thể trong hình ảnh và video.',
      'Áp dụng phương pháp SCAN để quan sát có hệ thống từ khuôn mặt đến bối cảnh.',
      'Hiểu giới hạn của quan sát bằng mắt thường và khi nào cần công cụ hỗ trợ.',
    ],
    sections: [
      {
        title: '4.1 Khuôn mặt — vùng trọng tâm của deepfake',
        lessons: [
          lesson('4.1.0', 'Tại sao deepfake tập trung vào khuôn mặt', [
            'Deepfake video thuong thay the khuon mat cua mot nguoi bang khuon mat cua nguoi khac, hoac tong hop hoan toan mot khuon mat moi. Khuon mat la trung tam vi do la thu nao nguoi tap trung khi nhan dien danh tinh.',
            'Hau het cac mo hinh deepfake duoc huan luyen de tai tao vung tu tran den cam — tuc la vung oval cua khuon mat. Vung ngoai vung nay (toc, tai, co) thuong kem chinh xac hon vi khong phai la uu tien huan luyen.',
            'Dieu nay co nghia la: khi ban nghi ngo mot video, hay bat dau bang cach quan sat khuon mat — nhung khong chi khuon mat. Ranh gioi giua khuon mat va phan con lai thuong la noi de lo dau vet dau tien.',
          ], null),
          lesson('4.1.1', 'Viền mặt, tóc và ranh giới da', [
            'Mot trong nhung diem yeu pho bien nhat cua deepfake la vien khuon mat — dac biet o vung tiep giap giua da va toc, hoac giua da va nen. Dau hieu dang chu y: vien mat bi mo hoac nhoe bat thuong, toc trong phang va thieu chi tiet soi toc rieng le, co su chenh lech mau sac hoac anh sang giua khuon mat va toc.',
            'Voi deepfake chat luong thap, ban co the thay mot duong vien mo bao quanh khuon mat — nhu the khuon mat duoc dan len tren phan con lai cua video. Voi deepfake chat luong cao hon, ranh gioi nay tinh te hon nhung thuong van de lo o nhung khung hinh co chuyen dong nhanh.',
            'Cach kiem tra: Tam dung video o nhieu diem khac nhau va phong to vung toc va vien mat. Toc that co hang nghin soi rieng le bat sang theo nhieu huong khac nhau. Toc trong deepfake thuong thieu chi tiet nay va trong nhu mot khoi dong nhat.',
          ], null),
          lesson('4.1.2', 'Kết cấu da: lỗ chân lông, nếp nhăn, chi tiết nhỏ', [
            'Da nguoi that co ket cau phuc tap: lo chan long, nep nhan nho, tan nhang, seo, long min, su thay doi mau sac tinh te theo do day cua da. Cac mo hinh deepfake, du ngay cang tien tien, van thuong tao ra da trong qua min mang — nhu da nhua hoac da duoc chinh anh nang.',
            'Dac biet chu y den: vung quanh mieng va mui (noi nhieu nep nhan dong khi noi), vung duoi mat (nep nhan khi cuoi), va vung tran khi nhan vat thay doi bieu cam. Trong video deepfake, nhung vung nay thuong thieu su bien doi nho tu nhien.',
            'Mot dau hieu tinh te khac: long may. Long may that co cac soi long rieng le, bi bong toi va anh sang chieu theo nhieu huong. Long may trong deepfake thuong trong phang va thieu chieu sau.',
          ], null),
          lesson('4.1.3', 'Màu sắc da và ánh sáng không nhất quán', [
            'Mau sac da trong deepfake thuong khong khop hoan hao voi phan con lai cua co the. Ban co the thay: khuon mat trong sang hon hoac toi hon so voi co va vai, tong mau da thay doi bat thuong giua cac khung hinh, va su thieu nhat quan trong cach anh sang chieu len khuon mat so voi boi canh.',
            'Anh sang la mot trong nhung thu kho gia nhat. Anh sang that chieu len khuon mat tu mot nguon cu the trong moi truong cu the. Deepfake thuong ghep khuon mat tu mot nguon anh sang khac vao video co nguon anh sang khac — tao ra su mau thuan tinh te: bong do sai huong, anh phan chieu trong mat khong khop voi bong tren mat.',
            'Cach kiem tra: Nhin vao bong do duoi mui va cam. So sanh huong bong tren khuon mat voi huong bong tren cac vat the xung quanh trong cung khung hinh. Neu chung mau thuan nhau, day la dau hieu dang nghi.',
          ], [
            'Deepfake tập trung vào vùng oval khuôn mặt — viền và tóc thường kém chính xác hơn.',
            'Da deepfake thường quá mịn: thiếu lỗ chân lông, nếp nhăn và chi tiết nhỏ tự nhiên.',
            'Ánh sáng và màu sắc da không nhất quán giữa khuôn mặt và cổ/vai là dấu hiệu đáng chú ý.',
          ]),
        ],
        checkpoint: checkpoint('4.1', [
          q('Vùng nào của deepfake thường kém chính xác nhất?', ['Viền mặt, tóc và vùng ngoài oval khuôn mặt', 'Trung tâm khuôn mặt (mũi)', 'Màu sắc nền', 'Phụ đề video'], 0),
          q('Da trong deepfake thường có đặc điểm gì?', ['Quá mịn, thiếu lỗ chân lông và chi tiết tự nhiên', 'Quá thô và nhiều đốm', 'Có màu xanh lá', 'Luôn trông rất thật'], 0),
          q('Khi kiểm tra ánh sáng trong video, nên so sánh điều gì?', ['Hướng bóng trên khuôn mặt với bóng trên vật thể xung quanh', 'Âm lượng âm thanh với độ sáng màn hình', 'Tốc độ chuyển động với tốc độ audio', 'Màu tóc với màu nền'], 0),
          q('Tóc trong deepfake thường có vấn đề gì?', ['Thiếu chi tiết sợi tóc riêng lẻ, trông như một khối đồng nhất', 'Màu quá tối', 'Di chuyển quá nhanh', 'Luôn bị che khuất'], 0),
        ]),
      },
      {
        title: '4.2 Mắt, miệng và biểu cảm',
        lessons: [
          lesson('4.2.0', 'Chuyển động mắt và chớp mắt bất thường', [
            'Mat nguoi thuong chop tu 15 den 20 lan moi phut — khong deu dan, khong may moc. Cac mo hinh deepfake the he dau thuong khong chop mat hoac chop mat theo nhip deu bat tu nhien. Cac mo hinh hien dai da cai thien dieu nay, nhung van co nhung dau hieu tinh te.',
            'Dau hieu dang chu y o mat: Chop mat qua nhanh hoac qua cham so voi tinh huong cam xuc. Chuyen dong mat thieu tu nhien — mat nguoi that luon co nhung chuyen dong nho (saccade) ngay ca khi nhin thang. Anh phan chieu trong mat khong khop voi nguon sang trong canh quay. Ca hai mat khong chop hoan toan dong bo — mot mat co the chop truoc mot phan nho giay.',
            'Quan sat dac biet: vung duoi mat khi nhan vat cuoi. Nu cuoi that tao ra cac nep nhan nho o duoi mat (chan chim). Nu cuoi deepfake thuong thieu phan nay, hoac phan nay khong dong bo voi chuyen dong mieng.',
          ], null),
          lesson('4.2.1', 'Đồng bộ môi — âm thanh (lip sync)', [
            'Lip sync — su dong bo giua chuyen dong moi va am thanh — la mot trong nhung diem de kiem tra nhat. Mac du cac mo hinh hien dai da cai thien dang ke, van con nhung dau hieu dac trung.',
            'Dau hieu lip sync bat thuong: Do tre — moi chuyen dong truoc hoac sau am thanh tu 1-3 khung hinh. Chuyen dong moi khong khop chinh xac voi am thanh phu am cu the (dac biet cac phu am nhu B, P, M yeu cau hai moi cham nhau). Vung quanh mieng trong cung hoac thieu tu nhien khi cac am tiet thay doi nhanh. Hinh dang mieng khong khop voi nguyen am dang phat am.',
            'Cach kiem tra thuc te: Xem video khong co am thanh trong 10-15 giay, sau do xem lai voi am thanh. Nao ban se de phat hien su khong khop hon khi da quen voi chuyen dong moi truoc. Hoac tua cham video o nhung doan noi nhanh — day la noi lip sync thuong bi lo nhat.',
          ], null),
          lesson('4.2.2', 'Biểu cảm cảm xúc: tự nhiên hay máy móc?', [
            'Bieu cam khuon mat that la qua trinh phuc tap lien quan den hon 40 co mat hoat dong theo cach khong hoan toan doi xung va khong hoan toan co the kiem soat. Deepfake thuong tai tao bieu cam chi theo phan trung tam khuon mat — mieng va mat — nhung bo qua cac vi chuyen dong co mat nho hon.',
            'Dau hieu bieu cam bat tu nhien: Bieu cam qua doi xung — khuon mat that co su bat doi xung nho tu nhien. Chuyen dong co mat qua tron tru va thieu cac micro-expression (vi bieu cam thoang qua). Su chuyen tiep giua cac bieu cam qua nhanh hoac qua cham. Cam xuc vung mat khong khop voi cam xuc vung mieng.',
            'Diem cuoi quan trong: Nao nguoi rat gioi phat hien su bat tu nhien trong bieu cam — day la ly do tai sao ban co the cam thay mot video trong la ma khong giai thich duoc nguyen nhan. Tin vao cam giac do va bat dau phan tich co he thong.',
          ], [
            'Mắt: chú ý chớp mắt bất thường và ánh phản chiếu không khớp với nguồn sáng.',
            'Lip sync: xem không tiếng trước, sau đó xem lại có tiếng để phát hiện độ trễ.',
            'Biểu cảm deepfake thường quá đối xứng và thiếu vi chuyển động cơ mặt nhỏ.',
          ]),
        ],
        checkpoint: checkpoint('4.2', [
          q('Tần suất chớp mắt bình thường của người là bao nhiêu?', ['15-20 lần mỗi phút, không đều đặn', '1-2 lần mỗi phút, đều đặn', '50 lần mỗi phút', 'Mỗi 5 giây chính xác'], 0),
          q('Cách nào giúp phát hiện lip sync bất thường hiệu quả?', ['Xem không tiếng trước, sau đó xem lại có tiếng', 'Tắt màn hình và chỉ nghe', 'Tăng tốc video lên 2x', 'Xem trên điện thoại thay vì máy tính'], 0),
          q('Biểu cảm khuôn mặt thật thường có đặc điểm gì?', ['Bất đối xứng nhỏ và có vi chuyển động cơ mặt', 'Hoàn toàn đối xứng và trơn tru', 'Không bao giờ thay đổi nhanh', 'Luôn cân đối hai bên'], 0),
          q('Ánh phản chiếu trong mắt của deepfake thường có vấn đề gì?', ['Không khớp với nguồn sáng thực trong cảnh quay', 'Quá sáng', 'Quá tối', 'Không tồn tại ánh phản chiếu'], 0),
        ]),
      },
      {
        title: '4.3 Chuyển động, artifact và thời gian',
        lessons: [
          lesson('4.3.0', 'Chuyển động đầu, cổ và cơ thể', [
            'Deepfake thuong chi xu ly vung khuon mat, de lai phan co, vai va co the nguyen goc. Dieu nay tao ra su bat nhat giua chuyen dong khuon mat va chuyen dong co the — dac biet ro rang khi nhan vat quay dau hoac nghieng nguoi.',
            'Dau hieu dang chu y: Khuon mat va co khong chuyen dong lien tuc va nhat quan khi dau quay. Vung cam va co co the bi bien dang hoac nhoe khi nghieng dau. Chuyen dong dau trong thieu quan tinh — dau nguoi that co trong luc va quan tinh, khong the chuyen huong tuc thoi.',
            'Voi video toan than: Khi nhan vat gio tay hoac cham vao mat, day la thoi diem deepfake thuong bi lo ro nhat. Khu vuc giao thoa giua tay va khuon mat rat kho de mo hinh deepfake xu ly chinh xac.',
          ], null),
          lesson('4.3.1', 'Artifact, nhòe và méo ở vùng biên', [
            'Artifact la cac loi hinh anh xuat hien khi thuat toan deepfake khong xu ly duoc mot vung nhat dinh. Chung co the trong nhu: diem anh bi meo hoac nhoe xung quanh vien khuon mat, mau sac khong khop tai ranh gioi giua khuon mat va nen, vung da bi vo hat hoac co hoa van ky la khi nhan vat chuyen dong.',
            'Artifact thuong xuat hien o nhung khung hinh cu the — khong lien tuc. Day la ly do tai sao viec tua cham video rat quan trong. Mot video deepfake co the trong hoan hao o toc do binh thuong nhung lo ro artifact o 0.25x hoac 0.5x toc do.',
            'Vung tai la mot vi du dien hinh. Tai nguoi co cau truc 3D phuc tap va thuong bi deepfake xu ly kem — dac biet o nhung goc nhin nghieng. Neu tai trong phang, bi cat bot hoac co hinh dang bat thuong, day la dau hieu dang chu y.',
          ], null),
          lesson('4.3.2', 'Sự nhất quán theo thời gian trong video', [
            'Mot video that co su nhat quan theo thoi gian: anh sang thay doi nhat quan theo thoi gian thuc, chuyen dong la lien tuc va khong gian doan, va cac chi tiet nho (nhu mot soi toc lac, mot vet nuoc tren da) duy tri nhat quan qua cac khung hinh.',
            'Deepfake thuong thieu su nhat quan nay: Chi tiet nho tren khuon mat co the bien mat hoac xuat hien giua cac khung hinh. Mau sac da co the thay doi nhe theo cach khong tu nhien. Artifact xuat hien o mot khung hinh roi bien mat o khung tiep theo.',
            'Phuong phap kiem tra: Neu ban co the tai video ve, chay no o toc do cham (0.25x) va chu y den vung khuon mat. Dac biet theo doi mot diem co dinh — vi du mot not ruoi hoac mot chi tiet cu the — va xem no co duy tri nhat quan khong.',
          ], [
            'Chuyển động đầu và cổ không nhất quán, đặc biệt khi tay chạm vào mặt, là dấu hiệu mạnh.',
            'Artifact thường xuất hiện ở vùng biên khuôn mặt và tai — rõ nhất khi tua chậm video.',
            'Sự thiếu nhất quán theo thời gian (chi tiết biến mất/xuất hiện) là lỗi đặc trưng của deepfake.',
          ]),
        ],
        checkpoint: checkpoint('4.3', [
          q('Khi nào deepfake video thường bị lộ rõ nhất?', ['Khi tay nhân vật chạm vào khuôn mặt', 'Khi nhân vật đứng yên', 'Khi video có âm nhạc nền', 'Khi video có phụ đề'], 0),
          q('Vì sao artifact thường không thấy ở tốc độ bình thường?', ['Chúng xuất hiện không liên tục và chỉ rõ khi tua chậm', 'Chúng bị ẩn bởi âm thanh', 'Màn hình độ phân giải thấp che đi', 'Chúng chỉ xuất hiện ở định dạng .mp4'], 0),
          q('Vùng nào của khuôn mặt thường bị deepfake xử lý kém nhất?', ['Tai — do cấu trúc 3D phức tạp', 'Mũi — do màu sắc', 'Trán — do thiếu dữ liệu huấn luyện', 'Môi — do chuyển động'], 0),
        ]),
      },
      {
        title: '4.4 Ánh sáng, nền và bối cảnh',
        lessons: [
          lesson('4.4.0', 'Ánh sáng và bóng tối mâu thuẫn', [
            'Anh sang la bang chung vat ly. Trong the gioi that, anh sang chieu tu nguon cu the tao ra bong do theo huong nhat quan cho tat ca moi vat trong cung mot canh. Khi deepfake ghep khuon mat tu mot moi truong anh sang khac vao canh quay, su mau thuan nay thuong de lo dau vet.',
            'Kiem tra ba thu dong thoi: Huong bong do duoi mui cua nhan vat. Huong bong do cua cac vat the trong nen. Vi tri cua anh phan chieu (catchlight) trong mat nhan vat. Trong video that, ca ba thu nay se nhat quan voi nhau.',
            'Dau hieu cu the: Khuon mat duoc chieu sang deu tu phia truoc trong khi nen co anh sang ben canh. Vung cam khong co bong trong khi mui co bong ro rang. Hai ben khuon mat cung muc do sang du anh sang den tu mot phia.',
          ], null),
          lesson('4.4.1', 'Nền bị méo, biến dạng hoặc lặp', [
            'Khi thuat toan deepfake khong hoan hao, no co the anh huong den vung nen xung quanh khuon mat. Dau hieu bao gom: cac duong thang trong nen (nhu tuong, cua, ke sach) bi cong hoac meo o vung gan khuon mat, cac hoa van lap lai bat thuong, vung nen bi nhoe tap trung xung quanh vien dau nhan vat.',
            'Mot truong hop dac biet: deepfake trong cac cuoc goi video voi nen ao (virtual background). Neu nen ao bi cat xen bat thuong xung quanh toc hoac vien dau — hoac neu toc bien mat vao nen mot cach ky la — day la dau hieu dang nghi.',
            'Cung chu y den su nhat quan cua nen theo thoi gian. Nen that co nhung thay doi nho tu nhien (bui ban, anh sang thay doi cham). Nen duoc xu ly boi deepfake doi khi co su lap lai hoac dong bang bat thuong o nhung vung nhat dinh.',
          ], null),
          lesson('4.4.2', 'Chi tiết phụ: tai, cổ, vai và phụ kiện', [
            'Ngoai khuon mat trung tam, cac chi tiet phu thuong la noi deepfake de lo ro nhat vi chung it duoc mo hinh chu y xu ly. Tai da de cap o phan truoc. Them vao do, hay chu y den: co va vung tiep giap giua cam va co, vai va vung tiep giap voi toc, kinh (neu nhan vat deo) — gong kinh va phan chieu trong kinh rat kho de deepfake xu ly chinh xac, bong tai va do trang suc khac.',
            'Kinh la vi du dien hinh. Kinh that phan chieu anh sang tu moi truong xung quanh — ban co the thay phong, cua so, den trong phan chieu. Kinh trong deepfake thuong co phan chieu don gian hoac bat nhat voi moi truong trong video.',
            'Bong tai va do trang suc co hinh dang 3D phuc tap thay doi theo goc nhin. Deepfake thuong lam phang nhung chi tiet nay hoac lam chung bien dang khi dau quay. Day la diem kiem tra nhanh va hieu qua.',
          ], [
            'Ánh sáng là bằng chứng vật lý: bóng mũi, bóng nền và catchlight trong mắt phải nhất quán.',
            'Nền bị méo xung quanh viền đầu là dấu hiệu của deepfake xử lý kém.',
            'Kính mắt, bông tai và đồ trang sức là điểm kiểm tra nhanh — deepfake thường xử lý những thứ này kém nhất.',
          ]),
        ],
        checkpoint: checkpoint('4.4', [
          q('Khi kiểm tra ánh sáng, cần so sánh đồng thời những gì?', ['Bóng đổ dưới mũi, bóng vật thể xung quanh và catchlight trong mắt', 'Âm lượng và độ sáng màn hình', 'Màu tóc và màu nền', 'Tốc độ chuyển động và tốc độ nói'], 0),
          q('Tại sao kính mắt là điểm kiểm tra hữu ích?', ['Phản chiếu trong kính phải khớp với môi trường thực — deepfake thường xử lý sai điều này', 'Kính luôn bị deepfake bỏ qua hoàn toàn', 'Kính làm lộ màu mắt thật', 'Deepfake không thể tái tạo gọng kính'], 0),
          q('Nền bị méo xung quanh đầu nhân vật thường gợi ý điều gì?', ['Thuật toán deepfake đang xử lý vùng đó không hoàn hảo', 'Camera có vấn đề', 'Video được quay ở độ phân giải thấp', 'Ánh sáng quá mạnh'], 0),
        ]),
      },
      {
        title: '4.5 Quy trình SCAN và giới hạn quan sát',
        lessons: [
          lesson('4.5.0', 'Phương pháp SCAN: 4 bước quan sát có hệ thống', [
            'SCAN la quy trinh 4 buoc de quan sat video nghi van mot cach co he thong. S — Surface (Be mat): Nhin tong the lan dau. Cam giac ban dau co gi khong on? Vien mat, mau sac tong the, anh sang chung. C — Close-up (Chi tiet): Tap trung vao cac vung cu the: mat, moi, tai, toc, co. Tua cham neu co the. A — Action (Chuyen dong): Chu y den chuyen dong — chop mat, lip sync, chuyen dong dau, tay cham mat. N — Narrative (Ngu canh): Ngu canh co hop ly khong? Tai sao video nay ton tai? Ai muon ban tin dieu nay?',
            'SCAN khong phai la quy trinh tuyen tinh cung nhac. Trong thuc te, ban thuong lam nhieu buoc dong thoi. Nhung khuon kho nay giup ban khong bo sot cac lop quan sat quan trong.',
            'Quan trong: SCAN khong thay the kiem chung nguon. No la buoc dau tien trong quy trinh danh gia. Neu SCAN cho ket qua nghi van cao, buoc tiep theo la kiem chung nguon (Module 6) va trong truong hop nghiem trong, su dung cong cu phan tich.',
          ], null),
          lesson('4.5.1', 'Checklist nhanh khi gặp nội dung nghi vấn', [
            'Duoi day la checklist 10 diem de kiem tra nhanh khi ban gap video nghi van: (1) Vien khuon mat co bi nhoe hoac co duong vien la khong? (2) Toc co thieu chi tiet soi toc rieng le khong? (3) Da co qua min, thieu lo chan long khong? (4) Mau sac da co khop voi co va vai khong? (5) Chop mat co bat thuong khong? (6) Lip sync co khop chinh xac khong? (7) Bieu cam co qua doi xung hoac thieu tu nhien khong? (8) Anh sang tren mat va tren nen co nhat quan khong? (9) Tai, kinh, trang suc co binh thuong khong? (10) Co artifact hoac meo o vung bien khuon mat khong?',
            'Moi cau tra loi duong tinh (co dau hieu) tang muc do nghi van. Khong can tat ca 10 diem deu duong tinh. Tu 3-4 diem duong tinh tro len la muc nghi van cao va can kiem chung tiep.',
            'Luu y quan trong: Checklist nay khong the thay the cong cu phan tich chuyen nghiep. No la bo loc dau tien — giup ban quyet dinh noi dung nao can dau tu thoi gian kiem chung ky hon.',
          ], null),
          lesson('4.5.2', 'Giới hạn của mắt thường và khi nào dùng công cụ', [
            'Quan sat bang mat thuong co gioi han ro rang: Deepfake chat luong cao ngay cang kho phat hien bang mat thuong. Dieu kien xem (man hinh nho, anh sang moi truong, chat luong video bi nen) anh huong den kha nang phat hien. Nao nguoi co xu huong tin vao khuon mat quen thuoc — hieu ung nay lam giam kha nang phat hien su bat thuong.',
            'Khi nao nen dung cong cu: Khi noi dung co tac dong lon — quyet dinh tai chinh, thong tin y te, tin tuc chinh tri quan trong. Khi nhieu diem trong checklist cho ket qua nghi van. Khi noi dung dang duoc lan truyen rong va ban dang can nhac chia se. Cong cu phan tich deepfake phan tich cac dac diem ky thuat ma mat thuong khong the thay.',
            'Ket luan module: Mat thuong la buoc dau tien, khong phai buoc cuoi cung. Ky nang quan sat giup ban dat cau hoi dung va quyet dinh khi nao can leo thang len cong cu. Module 5 se mo rong sang nhan dien giong noi va am thanh gia mao.',
          ], [
            'SCAN — Surface, Close-up, Action, Narrative — là 4 bước quan sát có hệ thống.',
            'Checklist 10 điểm: 3-4 dấu hiệu dương tính trở lên là mức nghi vấn cần kiểm chứng thêm.',
            'Mắt thường có giới hạn — dùng công cụ khi nội dung có tác động lớn hoặc nghi vấn cao.',
          ]),
        ],
        checkpoint: checkpoint('4.5', [
          q('SCAN là viết tắt của gì?', ['Surface, Close-up, Action, Narrative', 'Scan, Check, Analyze, Note', 'See, Compare, Ask, Next', 'Source, Content, Audio, Network'], 0),
          q('Bao nhiêu điểm dương tính trong checklist 10 điểm là mức nghi vấn cao?', ['3-4 điểm trở lên', '10/10 điểm', 'Chỉ cần 1 điểm', 'Ít nhất 8 điểm'], 0),
          q('Giới hạn quan trọng nhất của quan sát mắt thường là gì?', ['Deepfake chất lượng cao ngày càng khó phát hiện và điều kiện xem ảnh hưởng lớn', 'Mắt người không thể nhìn màu sắc chính xác', 'Mắt người chỉ phát hiện được chuyển động', 'Mắt người không thể so sánh hai video cùng lúc'], 0),
          q('Nên dùng công cụ phân tích khi nào?', ['Khi nội dung có tác động lớn hoặc nhiều điểm checklist cho kết quả nghi vấn', 'Luôn luôn dùng công cụ, không cần quan sát bằng mắt', 'Chỉ khi nội dung liên quan đến chính trị', 'Chỉ khi bạn là chuyên gia bảo mật'], 0),
        ]),
      },
    ],
    quiz: [
      q('Vùng nào của deepfake video thường kém chính xác nhất?', ['Viền mặt, tóc và các chi tiết ngoài oval khuôn mặt', 'Trung tâm khuôn mặt', 'Màu sắc tổng thể video', 'Chất lượng âm thanh'], 0),
      q('Da trong deepfake thường có đặc điểm gì nổi bật?', ['Qua min, thieu lo chan long va chi tiet ket cau tu nhien', 'Có nhiều đốm và vết bẩn', 'Màu xanh lá đặc trưng', 'Luôn trông rất thật và không thể phân biệt'], 0),
      q('Cách nào giúp phát hiện lip sync bất thường hiệu quả nhất?', ['Xem video không tiếng trước để quen với chuyển động môi, sau đó xem lại có tiếng', 'Tắt màn hình và chỉ nghe âm thanh', 'Tăng tốc độ phát lên 3x', 'So sánh với video khác của cùng người'], 0),
      q('SCAN trong quy trình quan sát là viết tắt của gì?', ['Surface, Close-up, Action, Narrative', 'Scan, Check, Analyze, Note', 'See, Compare, Ask, Next', 'Source, Content, Audio, Network'], 0),
      q('Tại sao tai là vùng hữu ích để kiểm tra deepfake?', ['Cấu trúc 3D phức tạp khiến deepfake thường xử lý tai kém', 'Tai không bao giờ xuất hiện trong deepfake', 'Tai có màu sắc đặc biệt dễ phát hiện', 'Deepfake luôn xóa tai khỏi video'], 0),
      q('Khi nào artifact trong deepfake thường rõ nhất?', ['Khi tua chậm video (0.25x hoặc 0.5x)', 'Khi xem ở tốc độ bình thường', 'Khi tăng âm lượng', 'Khi đổi sang màn hình lớn hơn'], 0),
      q('Checklist 10 điểm được dùng để làm gì?', ['Đánh giá nhanh mức độ nghi vấn và quyết định có cần kiểm chứng thêm không', 'Kết luận chắc chắn video là deepfake', 'Thay thế hoàn toàn công cụ phân tích', 'Báo cáo video lên cơ quan chức năng'], 0),
      q('Khi nào nên dùng công cụ phân tích deepfake thay vì chỉ dùng mắt thường?', ['Khi nội dung có tác động lớn và nhiều điểm nghi vấn trong checklist', 'Chỉ khi là chuyên gia bảo mật', 'Luôn luôn, mắt thường không có giá trị', 'Chỉ khi video dài hơn 10 phút'], 0),
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
