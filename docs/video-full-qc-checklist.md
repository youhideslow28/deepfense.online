# DEEPFENSE Video - Full QC Checklist

## Mục Đích

Checklist này dùng để test video từ đầu đến cuối trước khi export. Mục tiêu là không bị lỗi mạch truyện, thiếu thoại, lệch nhạc, thiếu SFX, chữ sai, cảnh chuyển vô cớ, hoặc quên giới thiệu 2HAND/Deepfense.

**Thời lượng mục tiêu sau khi thêm prologue:** khoảng 5:00-5:20.  
**Style:** cinematic motion-comic, hoạt hình Nhật vẽ tay, Đà Nẵng đời thường, Deepfense cyan glow, AN là companion hướng dẫn.

## 1. Checklist Tổng Quan Trước Khi Dựng

- [ ] Có đủ file/ảnh 4 thành viên 2HAND, mỗi người ít nhất 1 ảnh mặt rõ.
- [ ] Có asset/ảnh tham chiếu AN hoặc prompt tạo AN thống nhất.
- [ ] Có logo/text `2HAND`.
- [ ] Có logo/text `DEEPFENSE.ONLINE`.
- [ ] Có font tiếng Việt rõ, dễ đọc: Be Vietnam Pro, Inter, Montserrat hoặc SVN-Gilroy.
- [ ] Tất cả chữ trong video được thêm bằng edit, không dùng chữ AI generate trực tiếp trong ảnh.
- [ ] Mỗi part có màu chủ đạo nhất quán:
  - Prologue/Part 1: ấm, đời thường.
  - Part 2: lạnh dần, có glitch.
  - Part 3-4: cyan sạch + vàng ấm.
  - Part 5: cyan training + nhịp nhanh.
  - Part 6-7: phân tích, thực dụng, cyan ổn định.
  - Part 8: ấm trở lại, hy vọng.
- [ ] Không có cảnh nào chuyển sang tính năng web mà không có lý do trong câu chuyện.
- [ ] 2HAND xuất hiện ở đầu và cuối video.
- [ ] 4 thành viên xuất hiện trong câu chuyện như người dùng bình thường.
- [ ] AN xuất hiện từ Deepfense Emergency Guide, không xuất hiện đột ngột.

## 2. Dòng Nhạc Xuyên Suốt

### Style Nhạc Chính

```text
cinematic lo-fi orchestral / warm anime film score / soft piano + gentle strings + light electronic pulse
```

Mô tả dễ tìm:

```text
warm emotional Japanese animated film score, soft piano motif, gentle strings, subtle lo-fi texture, light electronic pulse, cinematic but intimate, hopeful, with small digital glitch accents during suspense moments
```

### Motif Chính

- [ ] Có một motif piano 4-5 nốt lặp lại xuyên suốt video.
- [ ] Motif ở đầu nghe ấm và đời thường.
- [ ] Motif ở đoạn deepfake bị méo nhẹ bằng synth/glitch.
- [ ] Motif khi AN xuất hiện trở lại sạch hơn, có bell/celesta nhẹ.
- [ ] Motif ở đoạn kết đầy đủ và ấm hơn.

### Timeline Nhạc

```text
0:00-0:18   Prologue 2HAND: piano motif rất nhẹ, ấm, mở đầu tinh tế
0:18-0:58   Part 1 Đà Nẵng đời thường: piano + pad ấm + ambience thành phố
0:58-1:38   Part 2 cuộc gọi: thêm low drone, pulse thấp, ringtone/glitch
1:38-2:40   Part 3-4 AN/Academy: piano sạch, bell/celesta, strings nhẹ
2:40-3:25   Part 5 Challenge: thêm beat nhẹ, tick/check, nhịp montage
3:25-4:35   Part 6-7 Tools/AI/Crisis: pulse điều tra, căng có kiểm soát
4:35-5:20   Part 8 payoff/kết: piano + strings ấm, motif hoàn chỉnh
```

### Checklist Nhạc

- [ ] Nhạc không có vocal lấn thoại.
- [ ] Nhạc không quá EDM/trailer, không làm mất chất ấm.
- [ ] Nhạc giảm volume khi nhân vật/AN nói.
- [ ] Đoạn Part 2 có căng thẳng nhưng không biến thành horror.
- [ ] Đoạn Part 5 có nhịp nhưng không biến thành game combat.
- [ ] Đoạn kết mở sáng, không kết cụt.
- [ ] Âm lượng nhạc nền thấp hơn thoại khoảng 10-16 dB.
- [ ] Không có đoạn nhạc bị cắt cụt/chuyển quá đột ngột.
- [ ] Nếu đổi nhạc theo part, vẫn giữ cùng key/mood/motif để không rời rạc.

## 3. SFX Xuyên Suốt

### Bộ SFX Cần Có

- [ ] City ambience Đà Nẵng: xe máy xa, gió sông Hàn.
- [ ] Cafe ambience: ly chạm bàn, tiếng nền rất nhẹ.
- [ ] Rain room tone: mưa nhỏ ngoài cửa sổ.
- [ ] Notification ping: một âm thống nhất từ Part 1 sang Part 2.
- [ ] Phone vibration: dùng ở cuộc gọi đến.
- [ ] Ringtone: bình thường lúc đầu, méo nhẹ khi nghi vấn.
- [ ] Deepfake glitch: ngắn, tiết chế.
- [ ] AN shimmer: bell/cyan mềm khi AN xuất hiện hoặc kích hoạt guide.
- [ ] UI scan: soft beep, tick, card slide.
- [ ] Challenge feedback: check sound, rewind sound, soft wrong marker.
- [ ] End call beep.
- [ ] Normal call tone khi gọi lại số chính.
- [ ] Ending ambience: sông Hàn/xe máy xa quay lại để khép vòng.

### Checklist SFX

- [ ] SFX không lấn lời thoại.
- [ ] Glitch chỉ dùng ở cảnh cuộc gọi/deepfake, không dùng lung tung.
- [ ] AN có âm riêng dễ nhận biết.
- [ ] Notification ping ở Part 1 tạo cảm giác 4 người dần được kéo vào cùng tình huống.
- [ ] End call beep ở Part 8 rõ và có cảm giác giải tỏa.
- [ ] Không có SFX stock quá hài/hoạt hình làm lệch tone.

## 4. Voice-over Và Lời Thoại Theo Timeline

### Prologue 2HAND - 0:00-0:18

Voice-over:

```text
Ở Đà Nẵng, có một nhóm sinh viên tên là 2HAND.
Bọn mình bắt đầu Deepfense từ một câu hỏi rất đơn giản:
Nếu một ngày khuôn mặt của người mình tin tưởng bị làm giả, mình sẽ nhận ra bằng cách nào?
```

Text:

```text
2HAND giới thiệu
DEEPFENSE.ONLINE
```

Checklist:

- [ ] Có logo/text 2HAND.
- [ ] Có đủ 4 thành viên xuất hiện.
- [ ] Câu hỏi khởi nguồn rõ và nối sang chủ đề deepfake.
- [ ] Không giới thiệu role từng người quá dài.

### Part 1 - 0:18-0:58

Voice-over:

```text
Đà Nẵng về đêm vẫn dịu như mọi ngày.
Mỗi người một góc thành phố. Một chiếc laptop, một ly cà phê, vài tin nhắn chưa kịp trả lời.
Không ai nghĩ một buổi tối bình thường lại bắt đầu bằng một khuôn mặt... quá quen.
Và một yêu cầu... quá gấp.
```

Text cần có:

```text
Có cuộc gọi lạ. Vào giúp mình với.
Đợi đó. Mở call nhóm đi.
Cuộc gọi video đến...
```

Checklist:

- [ ] Có Đà Nẵng rõ: Cầu Rồng hoặc sông Hàn.
- [ ] 4 thành viên xuất hiện riêng từng người.
- [ ] Character 4 có laptop/Deepfense glow.
- [ ] Group chat là lý do kết nối cả nhóm.
- [ ] Part kết bằng cuộc gọi đến.

### Part 2 - 0:58-1:38

Voice-over:

```text
Một cuộc gọi video. Một giọng nói quen. Một vẻ mặt đủ thật để khiến mọi người quên mất phải nghi ngờ.
Khi nỗi sợ bắt đầu quyết định thay lý trí, chỉ cần một người kịp dừng lại.
```

Thoại:

```text
Character 1: Khoan... hình như là người quen của mình.
Người trong video: Chuyển giúp anh ngay. Không kịp giải thích đâu.
Character 2: Giống thật quá... giọng cũng giống.
Character 3: Nhưng sao ánh sáng trên mặt lạ vậy?
Character 1 hoặc 2: Nếu là thật mà mình chậm thì sao?
Character 4: Đừng chuyển vội. Mở Deepfense ra đã.
```

Text:

```text
DEEPFENSE // Đang kích hoạt hướng dẫn khẩn cấp...
```

Checklist:

- [ ] Character 1 nhận cuộc gọi từ Part 1.
- [ ] 4 người vào cùng tình huống qua group call.
- [ ] Mỗi người có phản ứng khác nhau: tin, nghi, hoảng, tìm giải pháp.
- [ ] Người trong video tạo áp lực rõ.
- [ ] Character 4 mở Deepfense, tạo lý do cho AN.

### Part 3 - 1:38-2:18

Thoại AN:

```text
Dừng lại.
Trước khi hỏi "đó có phải người quen không", hãy hỏi: mình đã có đủ bằng chứng chưa?
Deepfake không cần hoàn hảo. Nó chỉ cần bạn vội.
Muốn kiểm chứng, đừng nhìn một thứ. Hãy nhìn ba lớp: khuôn mặt, hành vi, và cách xác minh.
Các bạn chưa cần đoán ngay. Trước hết, học cách nhìn lại.
```

Thoại nhóm:

```text
Character 2: Vậy... giờ tụi mình phải tin hay không tin?
Character 3: Mình thấy sai sai, nhưng không biết sai ở đâu.
Character 4: AN, giúp tụi mình kiểm chứng.
```

Text:

```text
Khuôn mặt
Hành vi
Xác minh
DEEPFENSE ACADEMY
```

Checklist:

- [ ] AN xuất hiện từ laptop/Deepfense glow.
- [ ] Ringtone/cuộc gọi bị “pause”.
- [ ] AN nói “Dừng lại” trước khi giải thích.
- [ ] Cuộc gọi ban đầu được đóng băng để phân tích.
- [ ] 3 lớp kiểm chứng hiện rõ.
- [ ] Cuối part mở cánh cửa Academy.

### Part 4 - 2:18-2:58

Thoại AN:

```text
Đây là Deepfense Academy. Không phải để các bạn học cho biết, mà để kịp bình tĩnh khi cần.
Một khuôn mặt quen không phải bằng chứng. Một giọng nói quen cũng chưa phải bằng chứng.
Hãy nhìn những chi tiết nhỏ: khẩu hình, ánh sáng, viền mặt, chuyển động, và âm thanh.
Nhưng lỗi nguy hiểm nhất không nằm trên màn hình. Nó nằm ở cảm giác bị ép phải hành động ngay.
Biết dấu hiệu là bước đầu. Muốn phản xạ đúng, các bạn cần luyện.
```

Thoại nhóm:

```text
Character 1: Trước giờ mình cứ nghĩ thấy tận mắt là thật.
Character 2: Vậy deepfake không chỉ giả khuôn mặt, mà còn giả cả tình huống?
Character 3: Nếu chỉ học lý thuyết thì lúc gặp thật liệu có nhớ nổi không?
AN: Vì vậy mới có thử thách.
```

Text:

```text
Thấy ≠ Tin ngay
Khẩu hình
Ánh sáng
Viền mặt
Chuyển động
Âm thanh
THỬ THÁCH THÁM TỬ DEEPFAKE
```

Checklist:

- [ ] Academy xuất hiện từ Part 3, không nhảy cảnh.
- [ ] Có bài học “mặt/giọng chưa đủ”.
- [ ] Có dấu hiệu hình ảnh/âm thanh.
- [ ] Có bài học áp lực tâm lý.
- [ ] Cuối part dẫn tự nhiên sang Challenge.

### Part 5 - 2:58-3:43

Thoại AN:

```text
Chào mừng đến Deepfake Detective Challenge.
Luật đầu tiên: đừng đoán vì cảm giác. Hãy quan sát trước, kết luận sau.
Sai không sao. Quan trọng là biết mình đã bỏ qua dấu hiệu nào.
Tốt. Khẩu hình không đi cùng nhịp âm thanh, và ánh sáng trên mặt không khớp nền.
Chính xác. Khi người gọi ép bạn quyết định ngay, đó cũng là một dấu hiệu rủi ro.
Bây giờ, dùng mắt đã luyện để nhìn lại vụ việc thật.
```

Thoại nhóm:

```text
Character 1: Mình chọn bên trái... khoan, sai rồi à?
Character 2: Miệng nói nhanh hơn tiếng một nhịp.
Character 3: Không chỉ hình ảnh. Cách họ thúc ép cũng đáng ngờ.
Character 4: Tụi mình quay lại cuộc gọi ban đầu được chưa?
```

Text:

```text
Quan sát
So sánh
Xác minh
Observation +1 / Quan sát tốt hơn
DPF Reward
Tiến độ chứng nhận
```

Checklist:

- [ ] Challenge có nhịp nhanh hơn Academy.
- [ ] Có một lần đoán sai và được AN sửa.
- [ ] Có một lần nhận ra lỗi hình ảnh/âm thanh.
- [ ] Có một lần nhận ra áp lực hành vi.
- [ ] DPF/certificate chỉ xuất hiện ngắn, không chiếm trọng tâm.
- [ ] Cuối part quay lại cuộc gọi ban đầu.

### Part 6 - 3:43-4:23

Thoại AN:

```text
Quay lại vụ việc thật. Lần này, đừng phản ứng. Hãy thu bằng chứng.
Đưa vào Tools: nội dung cuộc gọi, yêu cầu của đối phương, và những dấu hiệu các bạn vừa thấy.
Rủi ro không chỉ nằm ở khuôn mặt. Nó nằm ở kịch bản: gấp, tiền, dữ liệu, và không cho xác minh.
Media Scan giúp nhìn lại hình ảnh và âm thanh. Nhưng kết quả chỉ là một phần của quyết định.
Mức rủi ro cao. Không chuyển tiền. Không gửi dữ liệu. Chuyển sang xác minh an toàn.
```

Thoại nhóm:

```text
Character 1: Cuộc gọi vẫn còn đó... nhưng giờ nhìn nó khác hẳn.
Character 2: Ở đây có yêu cầu chuyển tiền, lại còn bắt làm ngay.
Character 3: Nếu hệ thống cũng không chắc 100% thì mình phải làm gì?
Character 4: Hỏi AI Assistant đi. Mình cần một quy trình hành động.
```

Text:

```text
Risk Scan
Bằng chứng
Ngữ cảnh
Media
Gấp
Tiền/Dữ liệu
Từ chối xác minh
Áp lực cảm xúc
Khẩu hình
Ánh sáng
Viền mặt
Âm thanh
RỦI RO CAO
Không chuyển tiền
Không gửi dữ liệu
Xác minh kênh khác
```

Checklist:

- [ ] Tools mở vì cần phân tích cuộc gọi thật.
- [ ] Có trạng thái máy quét đang khóa/chờ AI train, không demo scan thật.
- [ ] Có Media/Forensics Scan.
- [ ] Kết luận là “rủi ro cao”, không nói chắc chắn 100%.
- [ ] Có 3 hành động khuyến nghị rõ.
- [ ] Cuối part mở sang AI Assistant.

### Part 7 - 4:23-4:53

Thoại AI Assistant / AN:

```text
Khi chưa chắc, đừng chọn tin hay không tin. Hãy chọn xác minh an toàn.
Bốn bước: không chuyển tiền, cúp máy, gọi lại số chính, hỏi câu xác minh riêng.
Nếu đối phương thật, họ sẽ hiểu vì sao bạn cần kiểm chứng. Nếu là lừa đảo, áp lực sẽ lộ ra.
Nếu đã lỡ gửi tiền hoặc dữ liệu, vào Crisis Hub: dừng liên lạc, khóa tài khoản, lưu bằng chứng, báo cáo.
```

Thoại nhóm:

```text
Character 1: Vậy việc đúng không phải là đoán thật giả ngay...
Character 2: Mà là xác minh theo cách an toàn.
Character 3: Nếu lỡ bấm chuyển rồi thì vẫn còn bước xử lý?
Character 4: Mình cúp máy và gọi lại số chính.
AN: Đúng. Bình tĩnh là lớp phòng vệ đầu tiên.
```

Text:

```text
1. Không chuyển tiền
2. Cúp máy
3. Gọi lại số chính
4. Hỏi câu xác minh riêng
Crisis Hub
Dừng liên lạc
Khóa tài khoản
Lưu bằng chứng
Báo cáo
```

Checklist:

- [ ] 4 bước an toàn hiện rõ nhất video.
- [ ] Nhóm thực sự chuẩn bị cúp máy/gọi lại.
- [ ] Crisis Hub xuất hiện như phòng trú ẩn, không đáng sợ.
- [ ] Không đổ lỗi nạn nhân.
- [ ] Cuối part nối trực tiếp sang gọi lại người thật.

### Part 8 - 4:53-5:20

Thoại:

```text
Character 4: Mình gọi lại số chính nhé.
Người thật trong điện thoại: Không, anh đâu có gọi. May mà em kiểm tra lại.
Character 1: Vậy cuộc gọi vừa rồi là giả...
AN: Các bạn không thắng vì đoán đúng. Các bạn thắng vì đã dừng lại để kiểm chứng.
```

Voice-over kết:

```text
Deepfense không chỉ giúp phát hiện deepfake.
Deepfense giúp người dùng dừng lại, học cách quan sát, luyện phản xạ, kiểm tra rủi ro, hỏi khi bối rối, và biết ứng cứu khi sự cố xảy ra.

Với 2HAND, Deepfense bắt đầu từ một điều rất đơn giản:
giúp người bình thường bình tĩnh hơn trước một điều quá giống thật.
```

Text journey:

```text
Academy - Học cách nhận diện
Challenge - Luyện phản xạ
Tools - Kiểm tra rủi ro
AI Assistant - Hỏi khi bối rối
Crisis Hub - Ứng cứu sự cố
DPF/Certificate - Ghi nhận hành trình
```

Text cuối:

```text
2HAND Team
DEEPFENSE.ONLINE
Khi khuôn mặt có thể bị làm giả, bình tĩnh kiểm chứng là lớp phòng vệ thật nhất.
```

Checklist:

- [ ] Cúp cuộc gọi đáng ngờ.
- [ ] Gọi lại số chính.
- [ ] Người thật xác nhận không hề gọi.
- [ ] Nhóm nhẹ nhõm, glitch biến mất.
- [ ] Journey sản phẩm hiện đúng thứ tự câu chuyện.
- [ ] Có 2HAND Team ở kết.
- [ ] Có DEEPFENSE.ONLINE.
- [ ] Có câu chốt cuối.
- [ ] Đà Nẵng/Cầu Rồng/sông Hàn xuất hiện ở shot cuối.

## 5. Checklist Hiệu Ứng Hình Ảnh

### Motion-Comic Cơ Bản

- [ ] Mỗi ảnh tĩnh có ít nhất một chuyển động nhẹ: push-in, pan, parallax hoặc glow.
- [ ] Không có ảnh đứng yên quá 4 giây nếu không có thoại mạnh.
- [ ] Cảnh character có screen glow phù hợp hướng ánh sáng.
- [ ] Điện thoại/laptop có glow layer riêng ở các cảnh quan trọng.
- [ ] Glitch chỉ xuất hiện khi có cuộc gọi/deepfake/risk.
- [ ] AN shimmer/glow thống nhất.
- [ ] Text bubble/chat bubble tự animate bằng edit.
- [ ] Risk cards/action cards xuất hiện theo nhịp thoại.
- [ ] Shot cuối camera pull-back nhẹ.

### Màu Sắc

- [ ] Warm amber = đời thật/an toàn.
- [ ] Dirty cyan/red glitch = cuộc gọi đáng ngờ.
- [ ] Clean cyan = Deepfense/AN/Tools.
- [ ] Gold/cyan = Academy/learning.
- [ ] Ending quay lại warm + clean cyan.

### Chữ/Subtitles

- [ ] Font đồng nhất toàn video.
- [ ] Chữ tiếng Việt có dấu đầy đủ.
- [ ] Không có lỗi chính tả.
- [ ] Text không che mặt nhân vật.
- [ ] Text không nằm quá sát mép nếu xuất bản dọc/ngang.
- [ ] Mỗi subtitle không quá 2 dòng.
- [ ] Các thuật ngữ nhất quán: `Deepfense`, `2HAND`, `AN`, `Risk Scan`, `Crisis Hub`, `AI Assistant`.

## 6. Checklist Mạch Truyện

- [ ] Prologue giải thích 2HAND tạo Deepfense từ một câu hỏi.
- [ ] Part 1 giới thiệu Đà Nẵng và 4 người.
- [ ] Cuộc gọi là sự kiện kéo mọi người vào câu chuyện.
- [ ] AN xuất hiện vì Deepfense được mở.
- [ ] Academy xuất hiện vì nhóm chưa đủ kiến thức.
- [ ] Challenge xuất hiện vì học lý thuyết chưa đủ.
- [ ] Tools xuất hiện vì cần phân tích vụ việc thật.
- [ ] AI Assistant xuất hiện vì cần quy trình hành động.
- [ ] Crisis Hub xuất hiện vì có khả năng người dùng đã lỡ bị hại.
- [ ] Part 8 giải quyết đúng vụ việc ban đầu.
- [ ] Kết quả sản phẩm được tổng kết bằng hành trình đã xem.
- [ ] Bài học cuối có 2HAND.

## 7. Checklist Âm Lượng Và Mix

- [ ] Dialogue/voice-over nghe rõ trên điện thoại.
- [ ] Nhạc nền không lấn thoại.
- [ ] SFX glitch không chói.
- [ ] Ringtone không gây khó chịu quá lâu.
- [ ] Bass pulse Part 2/6 đủ căng nhưng không ù.
- [ ] Ending không bị nhỏ hơn phần giữa.
- [ ] Không có clip âm thanh bị vỡ/peak đỏ.
- [ ] Export nghe thử bằng tai nghe và loa điện thoại.

## 8. Checklist Export

- [ ] Xuất bản ngang 16:9 nếu dùng cho trình chiếu/YouTube.
- [ ] Nếu đăng Reels/TikTok, kiểm lại bản crop 9:16 để không mất text/mặt.
- [ ] Độ phân giải tối thiểu 1080p.
- [ ] Frame rate thống nhất: 24fps hoặc 30fps.
- [ ] Không có watermark của app dựng.
- [ ] Không có ảnh AI lỗi tay/mặt quá rõ.
- [ ] Không có chữ AI sai nằm trong ảnh nền.
- [ ] Xem lại full video một lần không pause.
- [ ] Xem lại lần hai chỉ để bắt lỗi chữ/subtitle.
- [ ] Xem lại lần ba chỉ để bắt lỗi âm thanh.

## 9. Checklist Bản Rút Gọn Nếu Thiếu Thời Gian

Nếu không đủ thời gian, ưu tiên giữ những thứ sau:

- [ ] Prologue 2HAND 10-12 giây.
- [ ] Part 1 đủ 4 người + cuộc gọi đến.
- [ ] Part 2 Character 4 mở Deepfense.
- [ ] Part 3 AN nói `Dừng lại`.
- [ ] Part 4 có bài học `mặt/giọng chưa đủ`.
- [ ] Part 5 có 1 cảnh Challenge montage.
- [ ] Part 6 có `RỦI RO CAO`.
- [ ] Part 7 có 4 bước an toàn.
- [ ] Part 8 gọi lại người thật + kết 2HAND/Deepfense.
