const views = [...document.querySelectorAll(".view")];
const navItems = [...document.querySelectorAll("[data-target]")];
const sidebarItems = [...document.querySelectorAll(".nav-item")];
const toast = document.querySelector("#toast");

const pretestQuestions = [
  ["Deepfake thường liên quan đến công nghệ nào?", ["AI hoặc học máy", "Nén file ZIP", "Sao lưu dữ liệu", "Tường lửa mạng"], 0],
  ["Một video nhìn thật có chắc chắn là thật không?", ["Không, cần kiểm chứng thêm", "Có, vì mắt người luôn chính xác", "Có, nếu độ phân giải cao", "Có, nếu được chia sẻ nhiều"], 0],
  ["Deepfake có thể xuất hiện ở dạng nào?", ["Video, hình ảnh, giọng nói", "Chỉ video", "Chỉ văn bản", "Chỉ ảnh tĩnh"], 0],
  ["Dấu hiệu nào có thể đáng nghi trong video khuôn mặt?", ["Chớp mắt, ánh sáng, viền mặt bất thường", "Âm lượng loa lớn", "File có tên dài", "Video có phụ đề"], 0],
  ["Khi thấy nội dung gây sốc, bước đầu nên làm gì?", ["Dừng lại và xác minh nguồn", "Chia sẻ ngay", "Bình luận kết luận", "Tải lại video"], 0],
  ["Deepfake nguy hiểm vì điều gì?", ["Có thể làm sai lệch niềm tin và danh tiếng", "Luôn làm máy tính hỏng", "Chỉ gây lỗi mạng", "Không có nguy hiểm"], 0],
  ["Voice deepfake là gì?", ["Giả mạo hoặc tổng hợp giọng nói", "Tăng âm lượng giọng thật", "Dịch phụ đề", "Cắt ghép nhạc nền"], 0],
  ["Một nguồn đáng tin hơn thường có đặc điểm nào?", ["Có ngữ cảnh, dẫn chứng, lịch sử uy tín", "Tiêu đề càng sốc càng tốt", "Không cần tác giả", "Chỉ đăng ở một trang lạ"], 0],
  ["Deepfake basics nên giúp người học điều gì?", ["Hiểu, nhận biết và phòng ngừa cơ bản", "Tạo deepfake nâng cao", "Hack tài khoản", "Vượt anti-cheat"], 0],
  ["Khi nghi ngờ bị deepfake tấn công, nên làm gì?", ["Lưu bằng chứng và báo người/cơ quan phù hợp", "Xóa hết mọi thứ ngay", "Im lặng hoàn toàn", "Chia sẻ để mọi người xem"], 0]
];

const subsections = [
  {
    id: "1.1.1",
    title: "Giới thiệu và định nghĩa",
    summary:
      "Deepfake là nội dung giả mạo hoặc tổng hợp bằng AI, thường mô phỏng khuôn mặt, biểu cảm, giọng nói hoặc hành vi của một người. Ở mức cơ bản, học viên cần hiểu deepfake không chỉ là trò kỹ thuật, mà là một rủi ro thông tin.",
    assets: ["Video: /courses/basics/module-1/1-1-1-intro.mp4", "Ảnh: ví dụ before/after", "Interactive: phân loại thật/giả"],
    quick: [
      "Deepfake khác chỉnh sửa ảnh thông thường ở điểm nào?",
      "Vì sao deepfake là vấn đề an toàn thông tin?",
      "Khi nào một nội dung nên được xem là cần kiểm chứng?"
    ]
  },
  {
    id: "1.1.2",
    title: "Khái niệm AI cơ bản",
    summary:
      "AI tạo sinh học từ dữ liệu mẫu để tạo nội dung mới. Người học không cần đi sâu toán học, nhưng cần nắm các ý: dữ liệu huấn luyện, mô hình, đầu vào, đầu ra, xác suất và lỗi sinh nội dung.",
    assets: ["Video: /courses/basics/module-1/1-1-2-ai-basics.mp4", "Infographic: data -> model -> output", "Ảnh: pipeline đơn giản"],
    quick: [
      "Mô hình AI học từ đâu?",
      "Vì sao AI có thể tạo nội dung nhìn thật nhưng vẫn sai?",
      "Đầu vào và đầu ra trong deepfake có thể là gì?"
    ]
  },
  {
    id: "1.1.3",
    title: "Ba dạng deepfake phổ biến",
    summary:
      "Ba dạng căn bản gồm Face Swap, Expression/Reenactment và Voice Deepfake. Mỗi dạng có cách tạo, rủi ro và dấu hiệu nhận biết khác nhau, nên người học cần gọi đúng tên vấn đề trước khi phân tích.",
    assets: ["Video: /courses/basics/module-1/1-1-3-types.mp4", "Audio: ví dụ voice clone", "Ảnh: bảng so sánh 3 dạng"],
    quick: [
      "Face Swap thường thay đổi phần nào?",
      "Voice deepfake nguy hiểm trong tình huống nào?",
      "Vì sao cần phân biệt dạng deepfake trước khi nhận diện?"
    ]
  },
  {
    id: "1.1.4",
    title: "Lịch sử và case studies",
    summary:
      "Deepfake phát triển từ nghiên cứu thị giác máy tính, công cụ mã nguồn mở và nền tảng tạo sinh. Các case thực tế cho thấy rủi ro trải rộng từ lừa đảo tài chính, thao túng dư luận đến xâm hại danh dự cá nhân.",
    assets: ["Video: /courses/basics/module-1/1-1-4-cases.mp4", "Timeline: mốc phát triển", "Case card: CEO fraud, celebrity hoax"],
    quick: [
      "Một case deepfake nên được phân tích theo những yếu tố nào?",
      "Deepfake ảnh hưởng đến cá nhân và tổ chức khác nhau ra sao?",
      "Vì sao tốc độ lan truyền làm rủi ro deepfake lớn hơn?"
    ]
  },
  {
    id: "1.1.5",
    title: "Tóm tắt và key takeaways",
    summary:
      "Kết thúc module, học viên cần nhớ: deepfake là rủi ro thông tin do AI hỗ trợ; không thể chỉ dựa vào cảm giác; cần kết hợp kiểm chứng nguồn, dấu hiệu kỹ thuật và bối cảnh trước khi tin hoặc chia sẻ.",
    assets: ["Video: /courses/basics/module-1/1-1-5-summary.mp4", "Cheat sheet: 5 bước kiểm chứng", "Download: module summary PDF"],
    quick: [
      "Ba ý quan trọng nhất của Module 1 là gì?",
      "Bạn sẽ làm gì trước khi chia sẻ video đáng ngờ?",
      "Điểm khác nhau giữa nghi ngờ hợp lý và kết luận vội là gì?"
    ]
  }
];

const moduleQuiz = [
  ["Định nghĩa phù hợp nhất của deepfake là gì?", ["Nội dung giả mạo/tổng hợp bằng AI để mô phỏng người hoặc sự kiện", "Một loại virus máy tính", "Một cách nén video", "Một tiêu chuẩn mạng"], 0],
  ["Vì sao deepfake là vấn đề an toàn số?", ["Nó có thể làm sai lệch niềm tin, danh tính và quyết định", "Nó luôn xóa dữ liệu", "Nó chỉ làm giảm pin điện thoại", "Nó chỉ ảnh hưởng game"], 0],
  ["Face Swap chủ yếu liên quan đến điều gì?", ["Thay khuôn mặt người này bằng người khác", "Tạo mật khẩu mới", "Đổi màu nền website", "Tăng tốc mạng"], 0],
  ["Voice deepfake có thể dùng để làm gì?", ["Giả mạo giọng nói trong cuộc gọi hoặc bản ghi âm", "Chỉ chỉnh phụ đề", "Chỉ tạo ảnh đại diện", "Chỉ phát nhạc"], 0],
  ["Một video deepfake có thể trông rất thật vì sao?", ["AI học mẫu hình ảnh/âm thanh từ dữ liệu lớn", "Vì mọi video trên mạng đều thật", "Vì trình duyệt tự sửa lỗi", "Vì camera luôn xác thực danh tính"], 0],
  ["Khi gặp video gây sốc, hành động phù hợp là gì?", ["Kiểm tra nguồn, ngữ cảnh và dấu hiệu bất thường", "Chia sẻ ngay để cảnh báo", "Tin nếu nhiều người bình luận", "Tin nếu video dài"], 0],
  ["Yếu tố nào thuộc phân tích bối cảnh?", ["Nguồn đăng, thời điểm, mục đích lan truyền", "Độ sáng màn hình điện thoại", "Dung lượng RAM", "Tên wifi"], 0],
  ["Case study deepfake nên giúp học viên hiểu điều gì?", ["Tác động thực tế và cách rủi ro xảy ra", "Cách né học quiz", "Cách tăng lượt xem", "Cách đổi giao diện"], 0],
  ["Vì sao không nên chỉ dựa vào mắt thường?", ["Deepfake ngày càng tinh vi và cảm giác có thể sai", "Mắt thường luôn phát hiện được", "Video HD luôn thật", "AI không tạo được khuôn mặt"], 0],
  ["Kết quả học tập chính của Module 1 là gì?", ["Hiểu khái niệm, dạng phổ biến và cách tiếp cận kiểm chứng ban đầu", "Biết lập trình model deepfake", "Biết deploy token", "Biết cấu hình firewall"], 0]
];

function showToast(message) {
  toast.textContent = message;
  toast.classList.add("show");
  setTimeout(() => toast.classList.remove("show"), 2600);
}

function shuffle(items) {
  return [...items].sort(() => Math.random() - 0.5);
}

function setView(id) {
  views.forEach((view) => view.classList.toggle("active", view.id === id));
  sidebarItems.forEach((item) => item.classList.toggle("active", item.dataset.target === id));
  const progress = { intro: 18, pretest: 26, welcome: 34, module1: 62, moduleQuiz: 78 }[id] || 18;
  document.querySelector("#progressText").textContent = `${progress}%`;
  document.querySelector("#progressBar").style.width = `${progress}%`;
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function renderQuestions(container, questions, name) {
  container.innerHTML = "";
  questions.forEach((question, index) => {
    const [text, options] = question;
    const mapped = options.map((option, optionIndex) => ({ option, optionIndex }));
    const randomized = name === "moduleQuiz" ? shuffle(mapped) : mapped;

    const card = document.createElement("article");
    card.className = "question-card";
    card.innerHTML = `
      <strong>${index + 1}. ${text}</strong>
      <div class="option-list">
        ${randomized
          .map(
            ({ option, optionIndex }) => `
              <label>
                <input type="radio" name="${name}-${index}" value="${optionIndex}" />
                <span>${option}</span>
              </label>`
          )
          .join("")}
      </div>
    `;
    container.appendChild(card);
  });
}

function scoreQuestions(questions, name) {
  let score = 0;
  questions.forEach((question, index) => {
    const selected = document.querySelector(`input[name="${name}-${index}"]:checked`);
    if (selected && Number(selected.value) === question[2]) score += 1;
  });
  return score;
}

function renderSubsections() {
  const container = document.querySelector("#subsections");
  container.innerHTML = "";
  subsections.forEach((section) => {
    const node = document.createElement("article");
    node.className = "subsection";
    node.innerHTML = `
      <div class="subsection-body">
        <div>
          <p class="eyebrow">${section.id}</p>
          <h3>${section.title}</h3>
          <p>${section.summary}</p>
          <div class="sub-meta">
            <span>Video</span>
            <span>Image</span>
            <span>Interactive</span>
            <span>3 câu hỏi nhanh</span>
          </div>
        </div>
        <div class="asset-box">
          <strong>Asset placeholders</strong>
          <ul>
            ${section.assets.map((asset) => `<li>${asset}</li>`).join("")}
          </ul>
        </div>
      </div>
      <div class="quick-check">
        <h4>3 câu hỏi nắm key</h4>
        <ol>${section.quick.map((item) => `<li>${item}</li>`).join("")}</ol>
      </div>
    `;
    container.appendChild(node);
  });
}

navItems.forEach((item) => {
  item.addEventListener("click", () => setView(item.dataset.target));
});

document.addEventListener("copy", (event) => {
  event.preventDefault();
  showToast("Anti-cheat: thao tác copy văn bản đã bị chặn trong khu vực học.");
});

document.addEventListener("visibilitychange", () => {
  if (document.hidden) return;
  showToast("Anti-cheat preview: hệ thống có thể ghi nhận chuyển tab khi làm quiz.");
});

document.querySelector("#scorePretest").addEventListener("click", () => {
  const score = scoreQuestions(pretestQuestions, "pretest");
  const level = score <= 4 ? "Beginner" : score <= 7 ? "Aware" : "Ready";
  document.querySelector("#pretestResult").textContent = `Kết quả mẫu: ${score}/10 - mức ${level}.`;
});

document.querySelector("#scoreModuleQuiz").addEventListener("click", () => {
  const score = scoreQuestions(currentModuleQuiz, "moduleQuiz");
  const percent = Math.round((score / currentModuleQuiz.length) * 100);
  document.querySelector("#moduleQuizResult").textContent =
    percent >= 70 ? `Đạt: ${score}/10 (${percent}%).` : `Chưa đạt: ${score}/10 (${percent}%). Hãy học lại key takeaways.`;
});

let currentModuleQuiz = shuffle(moduleQuiz);
document.querySelector("#rerollQuiz").addEventListener("click", () => {
  currentModuleQuiz = shuffle(moduleQuiz);
  renderQuestions(document.querySelector("#moduleQuizQuestions"), currentModuleQuiz, "moduleQuiz");
  document.querySelector("#moduleQuizResult").textContent = "";
  showToast("Đã random lại thứ tự câu hỏi và đáp án.");
});

renderQuestions(document.querySelector("#pretestQuestions"), pretestQuestions, "pretest");
renderSubsections();
renderQuestions(document.querySelector("#moduleQuizQuestions"), currentModuleQuiz, "moduleQuiz");
