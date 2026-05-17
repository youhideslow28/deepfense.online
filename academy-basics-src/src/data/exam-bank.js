// ── HELPERS ──────────────────────────────────────────────────────────────────
// eq(id, module, category, text, options, answer, explanation)
//   id          : 'Q001' … 'Q150'
//   module      : 1 … 6
//   category    : 'concept' | 'red_flags' | 'verification' | 'response' | 'ethics'
//   text        : question string
//   options     : [A, B, C, D]
//   answer      : 0-based index (0=A 1=B 2=C 3=D)
//   explanation : shown after submission
export const eq = (id, module, category, text, options, answer, explanation) => ({
  id, module, category, text, options, answer, explanation,
});

// ── EXAM CONFIG ───────────────────────────────────────────────────────────────
export const EXAM_CONFIG = {
  totalQuestions: 150,
  questionsPerAttempt: 50,
  passingScore: 35,        // 35/50 = 70%
  passingPercent: 70,
  maxAttempts: 3,
  // Target category distribution for each 50-question draw
  distribution: {
    concept:      10,  // 20% — khái niệm & phân loại
    red_flags:    12,  // 24% — nhận diện red flags
    verification: 13,  // 26% — quy trình kiểm chứng
    response:     10,  // 20% — ứng xử tình huống
    ethics:        5,  // 10% — đạo đức, pháp lý, trách nhiệm số
  },
  // Minimum questions per module in each draw
  moduleMinimums: { 1: 7, 2: 7, 3: 8, 4: 10, 5: 10, 6: 8 },
};

// ── EXAM BANK ─────────────────────────────────────────────────────────────────
export const EXAM_BANK = [
  // ── M1-EXAM-S ──────────────────────────────────────────────────────────────
  // MODULE 1 — Deepfake là gì? (Q001–Q025)
  eq('Q001', 1, 'concept', 'Deepfake là gì?', [
    'Mọi nội dung sai trên Internet.',
    'Nội dung hình ảnh, video hoặc âm thanh được tạo/chỉnh sửa để khiến người xem tin một người đã nói/làm điều họ không thật sự nói/làm.',
    'Chỉ là ảnh chỉnh màu.',
    'Một loại mật khẩu ngân hàng.',
  ], 1, 'Deepfake thường liên quan đến việc mạo danh hoặc làm sai lệch lời nói/hành động của một người.'),

  eq('Q002', 1, 'concept', 'Deepvoice là gì?', [
    'Giọng nói được tăng âm lượng.',
    'Giọng nói được giả lập hoặc chỉnh sửa bằng AI để nghe giống một người thật.',
    'Tin nhắn không có âm thanh.',
    'Video không có khuôn mặt.',
  ], 1, 'Deepvoice liên quan đến giả lập hoặc chỉnh sửa giọng nói.'),

  eq('Q003', 1, 'concept', 'Synthetic media là gì?', [
    'Nội dung được tạo hoàn toàn hoặc một phần bằng công nghệ số/AI.',
    'Nội dung bắt buộc là lừa đảo.',
    'Nội dung chỉ có văn bản.',
    'Nội dung chỉ tồn tại trên báo in.',
  ], 0, 'Synthetic media có thể dùng cho mục đích tốt hoặc xấu tùy bối cảnh và mục đích.'),

  eq('Q004', 1, 'concept', 'Tất cả synthetic media đều là deepfake. Đúng hay sai?', [
    'Đúng.',
    'Sai.',
    'Chỉ đúng với ảnh màu.',
    'Chỉ đúng với video dài.',
  ], 1, 'Ảnh minh họa AI có thể là synthetic media nhưng không phải deepfake nếu không mạo danh/gây lừa dối.'),

  eq('Q005', 1, 'concept', 'Video thật từ 5 năm trước bị đăng lại với chú thích "vừa xảy ra hôm nay" thuộc nhóm nào phù hợp nhất?', [
    'Repurposed media.',
    'Deepvoice.',
    'Mật khẩu yếu.',
    'Phần mềm diệt virus.',
  ], 0, 'Nội dung có thể thật nhưng bị đặt sai thời gian/bối cảnh.'),

  eq('Q006', 1, 'concept', 'Cắt một đoạn 8 giây từ bài phát biểu dài làm đổi nghĩa thuộc nhóm nào?', [
    'Edited media.',
    'Deepvoice.',
    'Family code.',
    'Two-channel rule.',
  ], 0, 'Cắt ghép có thể làm sai lệch ý nghĩa mà không cần AI.'),

  eq('Q007', 1, 'concept', 'Thay mặt một học sinh vào một ảnh nhạy cảm là ví dụ của gì?', [
    'Face swap/deepfake image.',
    'Reverse image search.',
    'Content credentials.',
    'Money delay.',
  ], 0, 'Face swap có thể gây hại nghiêm trọng nếu không có đồng thuận.'),

  eq('Q008', 1, 'concept', 'Lip sync trong deepfake thường liên quan đến điều gì?', [
    'Làm khẩu hình khớp với âm thanh khác.',
    'Đổi mật khẩu tài khoản.',
    'Nén file ảnh nhỏ hơn.',
    'Tắt bình luận.',
  ], 0, 'Lip sync có thể làm người xem tin rằng một người đã nói câu họ không nói.'),

  eq('Q009', 1, 'concept', 'Vì sao deepfake không cần hoàn hảo 100% vẫn nguy hiểm?', [
    'Vì nó có thể đủ giống trong vài giây và kết hợp với áp lực khẩn cấp.',
    'Vì mọi video mờ đều là deepfake.',
    'Vì chỉ chuyên gia mới xem video.',
    'Vì video dài hơn thì luôn giả.',
  ], 0, 'Lừa đảo thường thắng bằng cảm xúc và tốc độ, không chỉ bằng chất lượng kỹ thuật.'),

  eq('Q010', 1, 'concept', 'AI-generated image là gì?', [
    'Hình ảnh do AI tạo ra.',
    'Hình ảnh bắt buộc là ảnh thật.',
    'Hình ảnh chỉ chụp bằng máy film.',
    'Hình ảnh không thể dùng để lừa đảo.',
  ], 0, 'Ảnh AI có thể vô hại nếu minh bạch, nhưng có thể nguy hiểm nếu dùng làm bằng chứng/danh tính giả.'),

  eq('Q011', 1, 'concept', 'Ảnh chân dung "chuyên gia tài chính" không tồn tại, dùng để quảng cáo đầu tư, là rủi ro gì?', [
    'Danh tính giả bằng AI-generated image.',
    'Video bị lệch tiếng.',
    'Family code bị lộ.',
    'Dữ liệu metadata đầy đủ.',
  ], 0, 'Ảnh AI có thể dùng để tạo hồ sơ giả.'),

  eq('Q012', 1, 'concept', 'Câu hỏi hữu ích khi xem một ảnh nghi do AI tạo là gì?', [
    'Ảnh này đang được dùng để khiến mình tin điều gì?',
    'Ảnh này có nhiều màu không?',
    'Ảnh này có được đăng vào buổi sáng không?',
    'Ảnh này có kích thước bao nhiêu pixel?',
  ], 0, 'Mục đích sử dụng và bối cảnh quyết định rủi ro.'),

  eq('Q013', 1, 'concept', 'Nội dung thật nhưng chú thích sai có thể gây hại không?', [
    'Có.',
    'Không, vì nội dung gốc là thật.',
    'Chỉ khi có AI.',
    'Chỉ khi có âm thanh.',
  ], 0, 'Nội dung thật đặt sai bối cảnh vẫn có thể dẫn đến niềm tin sai.'),

  eq('Q014', 1, 'concept', 'Phân biệt đúng nhất giữa deepfake và edited media là gì?', [
    'Deepfake thường mạo danh người thật bằng AI/kỹ thuật số; edited media có thể chỉ là cắt ghép/chỉnh sửa gây đổi nghĩa.',
    'Edited media luôn an toàn.',
    'Deepfake chỉ là văn bản.',
    'Hai khái niệm hoàn toàn không liên quan đến nội dung số.',
  ], 0, 'Cả hai có thể gây hiểu nhầm, nhưng có cơ chế và mục đích khác nhau.'),

  eq('Q015', 1, 'concept', 'Vì sao dữ liệu cá nhân công khai làm deepfake/lừa đảo nguy hiểm hơn?', [
    'Kẻ xấu có nhiều nguyên liệu để mạo danh và dựng kịch bản riêng tư hơn.',
    'Vì mạng xã hội sẽ nhanh hơn.',
    'Vì điện thoại hết pin.',
    'Vì ảnh công khai không bao giờ bị dùng lại.',
  ], 0, 'Thông tin cá nhân giúp kịch bản lừa đảo trông đáng tin hơn.'),

  eq('Q016', 1, 'verification', 'Công cụ detector báo "không phát hiện deepfake" có nghĩa là gì?', [
    'Nội dung chắc chắn thật.',
    'Đây chỉ là một tín hiệu, vẫn cần xem nguồn và bối cảnh.',
    'Có thể bỏ qua mọi red flag.',
    'Nên chia sẻ ngay.',
  ], 1, 'Detector có giới hạn và không thay thế quy trình kiểm chứng.'),

  eq('Q017', 1, 'concept', 'Một bản ghi âm giọng giám đốc yêu cầu chuyển tiền gấp phù hợp nhất với rủi ro nào?', [
    'Deepvoice/mạo danh bằng giọng nói.',
    'Repurposed image.',
    'Content credentials.',
    'Ảnh minh họa AI vô hại.',
  ], 0, 'Giọng nói giống không đủ để xác minh danh tính.'),

  eq('Q018', 1, 'concept', 'Khi nào synthetic media có thể được xem là rủi ro thấp?', [
    'Khi được ghi rõ là minh họa/AI và không dùng để lừa dối.',
    'Khi che giấu là bằng chứng thật.',
    'Khi dùng để mạo danh người thật.',
    'Khi dùng để tống tiền.',
  ], 0, 'Minh bạch và mục đích sử dụng là yếu tố quan trọng.'),

  eq('Q019', 1, 'concept', 'Trạng thái "chưa đủ dữ liệu để kết luận" có ý nghĩa gì?', [
    'Không nên tin/chia sẻ/hành động như thể đã chắc chắn.',
    'Chắc chắn giả.',
    'Chắc chắn thật.',
    'Không cần kiểm tra nữa.',
  ], 0, 'Biết nói "chưa đủ dữ liệu" là kỹ năng quan trọng.'),

  eq('Q020', 1, 'concept', 'Một video thật được ghép phụ đề sai để làm người nói có vẻ chê giễu nạn nhân thuộc nhóm nào?', [
    'Edited media.',
    'Family code.',
    'Metadata.',
    '2FA.',
  ], 0, 'Phụ đề sai có thể làm sai lệch nội dung.'),

  eq('Q021', 1, 'concept', '"Provenance" trong bối cảnh nội dung số gắn với điều gì?', [
    'Nguồn gốc và lịch sử tạo/chỉnh sửa/xuất bản nội dung.',
    'Mật khẩu Wi-Fi.',
    'Tốc độ mạng.',
    'Số lượng bình luận.',
  ], 0, 'Provenance giúp hiểu nguồn gốc nội dung, nhưng không phải phép màu.'),

  eq('Q022', 1, 'concept', 'Vì sao không nên chỉ hỏi "có phải AI không"?', [
    'Vì mục đích, nguồn và hành động nội dung yêu cầu mới quyết định rủi ro.',
    'Vì AI luôn an toàn.',
    'Vì AI luôn xấu.',
    'Vì câu hỏi đó quá dài.',
  ], 0, 'Nội dung có thể không phải AI nhưng vẫn lừa đảo hoặc gây hiểu nhầm.'),

  eq('Q023', 1, 'concept', 'Tài khoản mới dùng ảnh AI của người không tồn tại để xin việc/học bổng có rủi ro chính là gì?', [
    'Danh tính giả.',
    'Video bị nén.',
    'Mất âm thanh.',
    'Không có dấu hiệu nào.',
  ], 0, 'Ảnh AI có thể dùng để tạo danh tính giả phục vụ lừa đảo.'),

  eq('Q024', 1, 'concept', 'Deepfake là một phần của vấn đề lớn hơn nào?', [
    'Niềm tin và xác minh nội dung trên không gian số.',
    'Chỉ là vấn đề độ phân giải màn hình.',
    'Chỉ là vấn đề dùng bàn phím.',
    'Chỉ là vấn đề thiết kế logo.',
  ], 0, 'Deepfake thách thức cách con người tin vào hình ảnh, video và âm thanh.'),

  eq('Q025', 1, 'response', 'Bạn thấy video người nổi tiếng nói về sản phẩm tài chính nhưng không có trên kênh chính thức. Kết luận tốt nhất là gì?', [
    'Chưa đủ dữ liệu để tin, cần kiểm chứng thêm và không bấm link.',
    'Chắc chắn thật vì giống mặt.',
    'Chắc chắn an toàn vì có bình luận.',
    'Nên nạp thử tiền nhỏ.',
  ], 0, 'Không cần chứng minh deepfake mới có quyền không hành động theo yêu cầu rủi ro.'),
  // ── M1-EXAM-E ──────────────────────────────────────────────────────────────

  // ── M2-EXAM-S ──────────────────────────────────────────────────────────────
  // MODULE 2 — Vì sao con người dễ bị lừa? (Q026–Q050)
  eq('Q026', 2, 'red_flags', '"Chuyển tiền trong 5 phút nếu không sẽ có chuyện" khai thác nút bấm nào?', [
    'Khẩn cấp.',
    'Giải trí.',
    'Trang trí.',
    'Kỷ niệm.',
  ], 0, 'Áp lực thời gian làm người học dễ hành động trước khi xác minh.'),

  eq('Q027', 2, 'red_flags', 'Tài khoản quen nhắn tin mượn tiền nhưng cách nhắn là lạ. Rủi ro chính là gì?', [
    'Tài khoản có thể bị chiếm quyền hoặc giả mạo.',
    'Mạng nhà bạn quá nhanh.',
    'Tin ngắn luôn an toàn.',
    'Không có rủi ro nếu ảnh đại diện đúng.',
  ], 0, 'Tài khoản quen không đảm bảo đúng người đang điều khiển.'),

  eq('Q028', 2, 'red_flags', '"Đây là yêu cầu từ cơ quan chức năng, không được nói với ai" khai thác gì?', [
    'Quyền lực và cô lập.',
    'Giải trí.',
    'Tự học.',
    'Thời tiết.',
  ], 0, 'Giả danh quyền lực và cô lập nạn nhân là kỹ thuật lừa đảo phổ biến.'),

  eq('Q029', 2, 'red_flags', 'Video hứa "lợi nhuận chắc chắn, không rủi ro" khai thác nút bấm nào?', [
    'Lợi ích.',
    'Đạo đức.',
    'Âm nhạc.',
    'Chính tả.',
  ], 0, 'Lời hứa quá tốt để tin là dấu hiệu cần cảnh giác.'),

  eq('Q030', 2, 'red_flags', 'Vì sao kẻ xấu hay nói "đừng nói với ai"?', [
    'Để cô lập nạn nhân khỏi người có thể giúp kiểm chứng.',
    'Để bảo vệ bạn hoàn toàn.',
    'Vì mọi giao dịch hợp pháp đều bí mật.',
    'Để tăng chất lượng âm thanh.',
  ], 0, 'Cô lập làm nạn nhân dễ bị điều khiển hơn.'),

  eq('Q031', 2, 'concept', '"Tôi thấy tận mắt" trong môi trường số chưa đủ vì sao?', [
    'Vì bạn chỉ thấy một nội dung trên màn hình, chưa chắc sự việc đúng như vậy.',
    'Vì mắt người không nhìn được video.',
    'Vì mọi video đều giả.',
    'Vì âm thanh luôn thật.',
  ], 0, 'Nội dung trên màn hình có thể bị cắt ghép, giả mạo hoặc sai bối cảnh.'),

  eq('Q032', 2, 'concept', 'Video ngắn gây phẫn nộ có rủi ro gì?', [
    'Thiếu bối cảnh và dễ kích hoạt cảm xúc mạnh.',
    'Luôn đầy đủ thông tin.',
    'Luôn được kiểm chứng.',
    'Không bao giờ bị cắt ghép.',
  ], 0, 'Clip ngắn dễ cắt mất phần trước/sau làm đổi nghĩa.'),

  eq('Q033', 2, 'verification', 'Với yêu cầu chuyển tiền qua giọng nói quen, câu hỏi tốt nhất là gì?', [
    'Yêu cầu này có cần xác minh độc lập không?',
    'Giọng có hay không?',
    'Âm lượng có lớn không?',
    'Tin nhắn có dài không?',
  ], 0, 'Nếu liên quan tiền/OTP/thông tin nhạy cảm, cần xác minh độc lập.'),

  eq('Q034', 2, 'concept', 'Nhiều lượt thích và bình luận có phải bằng chứng nội dung đúng không?', [
    'Không.',
    'Có, luôn đúng.',
    'Chỉ đúng nếu bình luận ngắn.',
    'Chỉ đúng vào buổi tối.',
  ], 0, 'Tương tác có thể đến từ người chưa kiểm chứng, tài khoản giả hoặc seeding.'),

  eq('Q035', 2, 'red_flags', 'Câu nào là dấu hiệu đe dọa?', [
    '"Nếu không hợp tác, bạn sẽ gặp rắc rối."',
    '"Bạn có thể kiểm tra thêm."',
    '"Hãy gọi tổng đài chính thức."',
    '"Bạn có thể suy nghĩ."',
  ], 0, 'Đe dọa là một cách tạo áp lực hành động.'),

  eq('Q036', 2, 'red_flags', 'Câu nào là dấu hiệu đánh vào cảm giác đặc biệt?', [
    '"Chỉ bạn được chọn."',
    '"Cần kiểm chứng thêm."',
    '"Hãy hỏi người thân."',
    '"Đừng chia sẻ khi chưa rõ."',
  ], 0, 'Cảm giác "được chọn riêng" thường dùng trong lừa đảo lợi ích.'),

  eq('Q037', 2, 'red_flags', 'Câu nào đánh vào xấu hổ/tống tiền?', [
    '"Nếu không muốn ảnh này lan ra thì làm theo."',
    '"Hãy báo cáo nền tảng."',
    '"Đừng gửi tiếp."',
    '"Hãy lưu bằng chứng an toàn."',
  ], 0, 'Đây là dấu hiệu ép buộc bằng xấu hổ.'),

  eq('Q038', 2, 'concept', 'Deepfake thường nguy hiểm hơn khi kết hợp với điều gì?', [
    'Social engineering: áp lực, mạo danh, lợi ích, đe dọa.',
    'Nhạc nền nhẹ.',
    'Màu sắc đẹp.',
    'Màn hình lớn.',
  ], 0, 'Kỹ thuật giả mạo thường là một phần trong kịch bản tấn công lớn hơn.'),

  eq('Q039', 2, 'response', 'Người gọi giống người thân nói "máy sắp hết pin, đừng gọi ai khác". Bạn nên nhận diện dấu hiệu nào?', [
    'Khẩn cấp và cô lập.',
    'Nội dung giải trí.',
    'Tin an toàn.',
    'Không có rủi ro.',
  ], 0, 'Đây là hai dấu hiệu đỏ mạnh trong lừa đảo.'),

  eq('Q040', 2, 'response', 'Khi nội dung làm bạn sợ, giận hoặc muốn hành động ngay, phản xạ an toàn nhất là gì?', [
    'Dừng lại và kiểm chứng.',
    'Chia sẻ ngay.',
    'Chuyển tiền trước.',
    'Bình luận mạnh.',
  ], 0, 'Cảm xúc mạnh là tín hiệu cần Pause.'),

  eq('Q041', 2, 'concept', '"Video ngắn có thể tạo cảm xúc dài" nghĩa là gì?', [
    'Video ngắn có thể tác động mạnh dù thiếu bối cảnh.',
    'Video ngắn luôn đúng.',
    'Video ngắn không thể giả.',
    'Video ngắn không cần nguồn.',
  ], 0, 'Định dạng ngắn dễ lan truyền và kích hoạt phản ứng nhanh.'),

  eq('Q042', 2, 'verification', 'Khi nào cần kiểm chứng nghiêm túc hơn?', [
    'Khi nội dung liên quan tiền, OTP, danh dự, pháp lý, sức khỏe, an toàn.',
    'Khi nội dung là ảnh minh họa rõ ràng.',
    'Khi đọc truyện cười.',
    'Khi xem sticker.',
  ], 0, 'Rủi ro càng cao, bằng chứng cần càng chắc.'),

  eq('Q043', 2, 'ethics', 'Câu trả lời trưởng thành khi chưa đủ bằng chứng là gì?', [
    '"Tôi chưa đủ dữ liệu để kết luận."',
    '"Thật 100%."',
    '"Giả hết."',
    '"Cứ chia sẻ đi."',
  ], 0, 'Nói chưa đủ dữ liệu giúp tránh tin sai và phủ nhận sai.'),

  eq('Q044', 2, 'ethics', '"Liar's dividend" là rủi ro nào?', [
    'Nội dung thật có thể bị phủ nhận bằng cách gọi là deepfake.',
    'Lợi nhuận đầu tư cao.',
    'Ưu đãi ngân hàng.',
    'Giảm giá sản phẩm.',
  ], 0, 'Biết deepfake tồn tại có thể bị lợi dụng để phủ nhận sự thật.'),

  eq('Q045', 2, 'response', 'Một người tự xưng là ngân hàng biết tên bạn và tạo áp lực đọc OTP. Yếu tố "biết tên" có đủ tin không?', [
    'Không, thông tin cá nhân có thể bị lộ/thu thập.',
    'Có, chắc chắn là ngân hàng.',
    'Có, nếu nói nhanh.',
    'Không cần xác minh.',
  ], 0, 'Biết một vài thông tin không chứng minh danh tính.'),

  eq('Q046', 2, 'red_flags', 'Dấu hiệu nào thuộc nhóm "lợi ích"?', [
    '"Lợi nhuận đảm bảo, không rủi ro."',
    '"Đừng gửi OTP."',
    '"Kiểm tra nguồn gốc."',
    '"Báo cáo nền tảng."',
  ], 0, 'Lời hứa quá tốt là một dấu hiệu lừa đảo.'),

  eq('Q047', 2, 'verification', 'Vì sao hỏi câu riêng tư không phải lúc nào cũng đủ?', [
    'Kẻ xấu có thể biết thông tin từ mạng xã hội hoặc tài khoản bị chiếm quyền.',
    'Vì câu hỏi riêng tư luôn vô nghĩa.',
    'Vì người thật không bao giờ trả lời.',
    'Vì câu hỏi dài hơn 10 từ.',
  ], 0, 'Xác minh qua kênh độc lập vẫn an toàn hơn.'),

  eq('Q048', 2, 'response', 'Bạn nhận video giống giáo viên yêu cầu nộp thông tin cá nhân qua link lạ. Nên làm gì?', [
    'Xác minh qua kênh nhà trường/giáo viên đã biết, không bấm link vội.',
    'Điền ngay vì video giống.',
    'Gửi cho cả lớp để điền.',
    'Đăng nhập thử bằng tài khoản chính.',
  ], 0, 'Yêu cầu dữ liệu qua link lạ cần kiểm chứng độc lập.'),

  eq('Q049', 2, 'concept', 'Bốn nút bấm cảm xúc chính trong Module 2 là gì?', [
    'Khẩn cấp, thân quen, quyền lực, lợi ích.',
    'Màu sắc, âm thanh, tốc độ, kích thước.',
    'Ảnh, video, chữ, link.',
    'Sáng, trưa, chiều, tối.',
  ], 0, 'Bốn nhóm này thường được dùng để thao túng phản ứng.'),

  eq('Q050', 2, 'ethics', 'Mục tiêu của Module 2 không phải là gì?', [
    'Hiểu tâm lý bị lừa để chống lại phản ứng vội.',
    'Tự do lỗi nạn nhân vì bị lừa.',
    'Nhận diện áp lực và cô lập.',
    'Biết dừng lại khi cảm xúc mạnh.',
  ], 1, 'Khóa học hướng tới phòng vệ và hỗ trợ, không đổ lỗi nạn nhân.'),
  // ── M2-EXAM-E ──────────────────────────────────────────────────────────────

  // ── M3-EXAM-S ──────────────────────────────────────────────────────────────
  // MODULE 3 — Dấu hiệu nghi vấn (Q051–Q075)
  eq('Q051', 3, 'response', 'Bước đầu tiên khi xem video gây sốc là gì?', [
    'Dừng lại và quan sát chậm hơn.',
    'Chia sẻ ngay.',
    'Kết luận giả.',
    'Chuyển tiền nếu có link.',
  ], 0, 'Pause giúp bạn không bị cảm xúc kéo đi.'),

  eq('Q052', 3, 'red_flags', 'Rìa khuôn mặt bị nhòe khi quay đầu là gì?', [
    'Một tín hiệu cần chú ý, không phải kết luận cuối cùng.',
    'Chứng minh chắc chắn giả.',
    'Chứng minh chắc chắn thật.',
    'Không bao giờ liên quan.',
  ], 0, 'Video thật cũng có thể nhòe do nén, ánh sáng hoặc mạng.'),

  eq('Q053', 3, 'red_flags', 'Chớp mắt lạ có đủ kết luận deepfake không?', [
    'Không, chỉ là một vùng quan sát.',
    'Có, luôn đủ.',
    'Có, nếu video ngắn.',
    'Không cần quan sát mắt.',
  ], 0, 'Một dấu hiệu đơn lẻ không đủ.'),

  eq('Q054', 3, 'verification', 'Khẩu hình lệch có thể do nguyên nhân nào ngoài deepfake?', [
    'Mạng yếu, nén video, lỗi phát.',
    'Family code.',
    'OTP.',
    'Chứng chỉ.',
  ], 0, 'Lệch tiếng không luôn đồng nghĩa giả.'),

  eq('Q055', 3, 'red_flags', 'Vì sao cần quan sát ánh sáng và bóng?', [
    'Để xem có sự không nhất quán giữa mặt, cổ, nền và nguồn sáng.',
    'Để chọn màu đẹp.',
    'Để tăng lượt xem.',
    'Để đổi mật khẩu.',
  ], 0, 'Ánh sáng không khớp có thể là tín hiệu chỉnh sửa.'),

  eq('Q056', 3, 'red_flags', 'Chi tiết nào thường cần quan sát ngoài khuôn mặt?', [
    'Tóc, tai, kính, tay, phụ kiện, nền.',
    'Chỉ số pin.',
    'Tên nhà mạng.',
    'Độ sáng màn hình của bạn.',
  ], 0, 'Chi tiết nhỏ và nền có thể lộ dấu hiệu hoặc sai bối cảnh.'),

  eq('Q057', 3, 'red_flags', 'Khi tay đi qua mặt và vùng mặt bị méo, nên hiểu thế nào?', [
    'Là dấu hiệu cần kiểm tra thêm.',
    'Chắc chắn thật.',
    'Luôn vô hại.',
    'Phải chia sẻ ngay.',
  ], 0, 'Một số video giả dễ lỗi khi vật thể che mặt, nhưng cần kiểm chứng thêm.'),

  eq('Q058', 3, 'red_flags', 'Nền video có bảng hiệu không khớp địa điểm được chú thích có thể gợi ý điều gì?', [
    'Sai bối cảnh/repurposed media.',
    'OTP bị lộ.',
    'Mật khẩu mạnh.',
    'Family code tốt.',
  ], 0, 'Nền giúp phát hiện địa điểm/thời gian không khớp.'),

  eq('Q059', 3, 'verification', 'Video thật có thể trông lạ vì lý do nào?', [
    'Camera kém, mạng yếu, bộ lọc, nén video.',
    'Vì mọi video thật đều hoàn hảo.',
    'Vì chỉ deepfake mới bị mờ.',
    'Vì bình luận nhiều.',
  ], 0, 'Chất lượng kỹ thuật thấp không đồng nghĩa giả.'),

  eq('Q060', 3, 'verification', 'Video giả có thể trông rất thật. Điều này nhắc bạn điều gì?', [
    'Không thấy lỗi kỹ thuật chưa đủ để tin.',
    'Cứ thấy mượt là thật.',
    'Không cần kiểm tra nguồn.',
    'Detector luôn đúng.',
  ], 0, 'Cần kết hợp nguồn, ngữ cảnh và xác minh.'),

  eq('Q061', 3, 'verification', 'Detector nên được xem là gì?', [
    'Một tín hiệu hỗ trợ.',
    'Phán quyết cuối cùng.',
    'Chứng chỉ thật.',
    'Thay thế kênh độc lập.',
  ], 0, 'Detector có thể sai và có giới hạn.'),

  eq('Q062', 3, 'verification', 'Mức kết luận an toàn khi có vài dấu hiệu nghi vấn là gì?', [
    'Có dấu hiệu nghi vấn, cần kiểm chứng thêm.',
    'Chắc chắn thật.',
    'Chắc chắn giả và bêu tên ngay.',
    'Không cần làm gì.',
  ], 0, 'Kết luận thận trọng giúp tránh sai cả hai hướng.'),

  eq('Q063', 3, 'red_flags', 'Giọng nói giống người thân có đủ để chuyển tiền không?', [
    'Không, cần xác minh khi yêu cầu rủi ro cao.',
    'Có, nếu giống 80%.',
    'Có, nếu tin nhắn ngắn.',
    'Có, nếu buổi tối.',
  ], 0, 'Giọng giống không đủ cho tiền/OTP/thông tin nhạy cảm.'),

  eq('Q064', 3, 'red_flags', 'Dấu hiệu âm thanh nào cần chú ý?', [
    'Ngắt nghỉ kỳ lạ, giọng đều, né câu hỏi bất ngờ, cảm xúc không khớp.',
    'Âm lượng vừa phải.',
    'Tin nhắn có emoji.',
    'Cuộc gọi dưới 1 phút luôn an toàn.',
  ], 0, 'Các tín hiệu âm thanh chỉ là dấu hiệu, cần đi cùng xác minh.'),

  eq('Q065', 3, 'response', 'Cách an toàn khi nhận giọng nói giống sếp yêu cầu chuyển khoản là gì?', [
    'Xác minh qua quy trình/kênh nội bộ chính thức.',
    'Chuyển ngay.',
    'Gửi OTP cho sếp.',
    'Hỏi lại đúng không trong cùng cuộc gọi rồi chuyển.',
  ], 0, 'Yêu cầu tài chính cần quy trình xác nhận độc lập.'),

  eq('Q066', 3, 'concept', 'Ngữ cảnh bao gồm điều gì?', [
    'Ai gửi, gửi ở đâu, muốn bạn tin/làm gì, ai có thể bị hại.',
    'Chỉ màu sắc video.',
    'Chỉ độ phân giải.',
    'Chỉ âm lượng.',
  ], 0, 'Ngữ cảnh thường quyết định mức rủi ro.'),

  eq('Q067', 3, 'red_flags', 'Nội dung yêu cầu OTP qua link lạ thuộc lớp dấu hiệu nào mạnh nhất?', [
    'Ngữ cảnh/hành vi rủi ro.',
    'Tóc.',
    'Ánh sáng.',
    'Nền.',
  ], 0, 'Yêu cầu OTP là red flag mạnh dù hình ảnh trông thật.'),

  eq('Q068', 3, 'concept', 'Bình luận "mình nhận tiền rồi" dưới video đầu tư có phải bằng chứng chắc chắn không?', [
    'Không.',
    'Có.',
    'Chỉ nếu viết hoa.',
    'Chỉ nếu có nhiều dấu chấm than.',
  ], 0, 'Bình luận có thể là seeding hoặc người chưa kiểm chứng.'),

  eq('Q069', 3, 'ethics', 'Trước khi chia sẻ nội dung nghi vấn, câu hỏi quan trọng là gì?', [
    'Nếu nội dung sai, ai có thể bị hại?',
    'Mình có được nhiều like không?',
    'Video có nhạc hay không?',
    'Nền có màu gì?',
  ], 0, 'Trách nhiệm số bắt đầu từ đánh giá hậu quả.'),

  eq('Q070', 3, 'ethics', 'Với hình ảnh nhạy cảm trong nhóm lớp, điều không nên làm là gì?', [
    'Lưu/gửi tiếp/phóng to phân tích công khai.',
    'Báo cáo.',
    'Không lan truyền.',
    'Tìm người có trách nhiệm hỗ trợ.',
  ], 0, 'Phân tích công khai có thể làm tăng tổn hại.'),

  eq('Q071', 3, 'verification', 'Checklist 3 lớp gồm gì?', [
    'Hình ảnh/video, âm thanh/giọng nói, ngữ cảnh/hành vi.',
    'Sáng, trưa, tối.',
    'Tên, tuổi, màu áo.',
    'Like, share, follow.',
  ], 0, 'Ba lớp giúp quan sát toàn diện hơn.'),

  eq('Q072', 3, 'red_flags', 'Một dấu hiệu yếu trở nên đáng lo hơn khi nào?', [
    'Khi đi cùng nhiều dấu hiệu khác và ngữ cảnh rủi ro.',
    'Khi đứng một mình.',
    'Khi video có nhạc nền.',
    'Khi màn hình sáng.',
  ], 0, 'Tập hợp tín hiệu làm mức rủi ro tăng.'),

  eq('Q073', 3, 'response', 'Nếu video người nổi tiếng đầu tư trông mượt nhưng tài khoản/link đáng nghi, nên làm gì?', [
    'Không bấm link, kiểm tra kênh chính thức.',
    'Tin vì video mượt.',
    'Nạp thử.',
    'Chỉ xem mắt chớp.',
  ], 0, 'Ngữ cảnh rủi ro cao có thể quan trọng hơn lỗi kỹ thuật.'),

  eq('Q074', 3, 'verification', 'Hỏi câu riêng tư qua cuộc gọi nghi deepvoice có đủ không?', [
    'Có thể hữu ích nhưng chưa đủ; vẫn nên xác minh kênh độc lập.',
    'Luôn đủ.',
    'Không bao giờ được hỏi.',
    'Chỉ cần hỏi một câu là chuyển tiền được.',
  ], 0, 'Thông tin riêng có thể bị thu thập hoặc đoán.'),

  eq('Q075', 3, 'verification', 'Mục tiêu đúng của quan sát là gì?', [
    'Tìm tín hiệu để biết có cần kiểm chứng thêm không.',
    'Phán quyết thật/giả trong 3 giây.',
    'Thay thế hoàn toàn nguồn chính thức.',
    'Chỉ tìm lỗi ở mắt.',
  ], 0, 'Quan sát là một bước trong quy trình, không phải toàn bộ xác minh.'),
  // ── M3-EXAM-E ──────────────────────────────────────────────────────────────

  // ── M4-EXAM-S ──────────────────────────────────────────────────────────────
  // ── M4-EXAM-E ──────────────────────────────────────────────────────────────

  // ── M5-EXAM-S ──────────────────────────────────────────────────────────────
  // ── M5-EXAM-E ──────────────────────────────────────────────────────────────

  // ── M6-EXAM-S ──────────────────────────────────────────────────────────────
  // ── M6-EXAM-E ──────────────────────────────────────────────────────────────
];

// ── DRAW 50 QUESTIONS ─────────────────────────────────────────────────────────
// Returns a shuffled array of exactly 50 questions meeting the distribution
// and module-minimum constraints defined in EXAM_CONFIG.
export function drawExam() {
  const { distribution, moduleMinimums, questionsPerAttempt } = EXAM_CONFIG;

  // Shuffle source bank
  const pool = [...EXAM_BANK].sort(() => Math.random() - 0.5);

  // Build fast lookup: id → question
  const byId = Object.fromEntries(pool.map(q => [q.id, q]));

  // Group shuffled questions by module and category
  const byModule   = {};
  const byCategory = {};
  for (const q of pool) {
    (byModule[q.module]   = byModule[q.module]   || []).push(q);
    (byCategory[q.category] = byCategory[q.category] || []).push(q);
  }

  const selected = new Set();

  const pick = (list) => {
    for (const q of list) {
      if (!selected.has(q.id)) { selected.add(q.id); return; }
    }
  };

  // Phase 1 — meet module minimums (pick from each module's shuffled pool)
  for (const [mod, min] of Object.entries(moduleMinimums)) {
    const list = byModule[+mod] || [];
    let picked = 0;
    for (const q of list) {
      if (picked >= min) break;
      if (!selected.has(q.id)) { selected.add(q.id); picked++; }
    }
  }

  // Phase 2 — meet category targets
  for (const [cat, target] of Object.entries(distribution)) {
    const list = byCategory[cat] || [];
    // Count already selected in this category
    let have = [...selected].filter(id => byId[id]?.category === cat).length;
    for (const q of list) {
      if (have >= target) break;
      if (!selected.has(q.id)) { selected.add(q.id); have++; }
    }
  }

  // Phase 3 — fill remaining slots randomly
  for (const q of pool) {
    if (selected.size >= questionsPerAttempt) break;
    if (!selected.has(q.id)) selected.add(q.id);
  }

  // Return in shuffled order, capped at questionsPerAttempt
  return pool.filter(q => selected.has(q.id)).slice(0, questionsPerAttempt);
}
