'use strict';
const fs = require('fs');
const path = require('path');

const fp = path.join(__dirname, 'src', 'data', 'course.js');
let src = fs.readFileSync(fp, 'utf8');

const START = '  // ── MODULES 5–9: Placeholder ──────────────────────────────';
const si = src.indexOf(START);
if (si === -1) throw new Error('Start marker not found: ' + START);

const before = src.slice(0, si);

const newContent = `  // ── MODULE 5 ─────────────────────────────────────────────────────
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
      { title: '5.1.1 Quy tắc vàng về tiền', lessons: [lesson('5.1.1.ph', 'Đang xây dựng', ['Nội dung phần 5.1.1 sẽ được cập nhật ở Phiên 2.'], ['Sắp có.'])], checkpoint: null },
      // ── M5-511-E ─────────────────────────────────────────────────
      // ── M5-52-S ──────────────────────────────────────────────────
      { title: '5.2 Học đường, danh dự và hình ảnh nhạy cảm', lessons: [lesson('5.2.ph', 'Đang xây dựng', ['Nội dung phần 5.2 sẽ được cập nhật ở Phiên 3.'], ['Sắp có.'])], checkpoint: null },
      // ── M5-52-E ──────────────────────────────────────────────────
      // ── M5-53-S ──────────────────────────────────────────────────
      { title: '5.3 Tin giả xã hội và "nội dung thật bị gọi là giả"', lessons: [lesson('5.3.ph', 'Đang xây dựng', ['Nội dung phần 5.3 sẽ được cập nhật ở Phiên 4.'], ['Sắp có.'])], checkpoint: null },
      // ── M5-53-E ──────────────────────────────────────────────────
      // ── M5-54-S ──────────────────────────────────────────────────
      { title: '5.4 Tình cảm, việc làm, học bổng, đầu tư và danh tính số', lessons: [lesson('5.4.ph', 'Đang xây dựng', ['Nội dung phần 5.4 sẽ được cập nhật ở Phiên 5.'], ['Sắp có.'])], checkpoint: null },
      // ── M5-54-E ──────────────────────────────────────────────────
      // ── M5-55-S ──────────────────────────────────────────────────
      { title: '5.5 Thực hành: Bản đồ rủi ro đời sống số', lessons: [lesson('5.5.ph', 'Đang xây dựng', ['Nội dung phần 5.5 sẽ được cập nhật ở Phiên 6.'], ['Sắp có.'])], checkpoint: null },
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

  // ── MODULES 6–9: Placeholder ──────────────────────────────
  ...[6, 7, 8, 9].map(id => ({
    id, part: id <= 6 ? 'recognition' : 'response',
    title: [
      'Kiểm chứng bối cảnh, nguồn tin và metadata',
      'Phòng ngừa deepfake cho cá nhân',
      'Ứng phó khi gặp hoặc trở thành nạn nhân',
      'Deepfake trong tổ chức: SOC, GRC và security awareness',
    ][id - 6],
    duration: '90-100 phút', level: id <= 6 ? 'Recognition' : 'Response',
    scenario: 'Nội dung đang được xây dựng. Sẽ cập nhật sớm.',
    outcomes: ['Nội dung đang được phát triển.'],
    sections: [
      {
        title: \`\${id}.1 Nội dung đang được xây dựng\`,
        lessons: [
          lesson(\`\${id}.0.0\`, 'Module đang được phát triển', [
            \`Module \${id} đang trong quá trình xây dựng. Nội dung sẽ được cập nhật sớm.\`,
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
}`;

fs.writeFileSync(fp, before + newContent, 'utf8');
console.log('Done. File length:', (before + newContent).length);
