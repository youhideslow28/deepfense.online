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
  // ── M2-EXAM-E ──────────────────────────────────────────────────────────────

  // ── M3-EXAM-S ──────────────────────────────────────────────────────────────
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
