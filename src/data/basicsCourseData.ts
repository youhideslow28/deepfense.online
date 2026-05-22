import { BookOpen, ShieldCheck, Target, Award, Brain, Zap, AlertTriangle, Clock, CheckCircle2 } from 'lucide-react';

// ── CONTENT BLOCK TYPES ──────────────────────────────────────────────

export interface TextBlock {
  type: 'text';
  content: { vi: string; en: string };
  variant?: 'normal' | 'lead' | 'caption';
}

export interface ImageBlock {
  type: 'image';
  src: string;
  alt: { vi: string; en: string };
  caption?: { vi: string; en: string };
  width?: 'full' | 'wide' | 'medium';
}

export interface CompareBlock {
  type: 'compare';
  before: { src: string; label: { vi: string; en: string } };
  after: { src: string; label: { vi: string; en: string } };
  caption?: { vi: string; en: string };
  mode?: 'slider' | 'side-by-side';
}

export interface CalloutBlock {
  type: 'callout';
  variant: 'tip' | 'warning' | 'danger' | 'info';
  icon?: string;
  title?: { vi: string; en: string };
  content: { vi: string; en: string };
}

export interface AudioBlock {
  type: 'audio';
  src: string;
  title: { vi: string; en: string };
  description?: { vi: string; en: string };
  duration?: string;
}

export interface TableBlock {
  type: 'table';
  caption?: { vi: string; en: string };
  headers: { vi: string; en: string }[];
  rows: { vi: string; en: string }[][];
}

export interface ExerciseBlock {
  type: 'exercise';
  variant: 'fill-blank' | 'single-choice';
  question: { vi: string; en: string };
  template?: { vi: string; en: string };
  options: { vi: string; en: string }[];
  correctIndex: number;
  explanation: { vi: string; en: string };
  reward?: number;
}

export interface SandboxTurn {
  speaker: 'scammer' | 'system';
  message: { vi: string; en: string };
  choices?: {
    label: { vi: string; en: string };
    outcome: 'good' | 'bad' | 'neutral';
    feedback: { vi: string; en: string };
  }[];
}

export interface SandboxBlock {
  type: 'sandbox';
  title: { vi: string; en: string };
  description?: { vi: string; en: string };
  turns: SandboxTurn[];
  reward?: number;
}

export interface AnnotateTarget {
  id: number;
  x: number;
  y: number;
  radius: number;
  label: { vi: string; en: string };
  explanation: { vi: string; en: string };
}

export interface AnnotateBlock {
  type: 'annotate';
  src: string;
  alt: { vi: string; en: string };
  instruction: { vi: string; en: string };
  targets: AnnotateTarget[];
  reward?: number;
}

export type ContentBlock =
  | TextBlock
  | ImageBlock
  | CompareBlock
  | CalloutBlock
  | AudioBlock
  | TableBlock
  | ExerciseBlock
  | SandboxBlock
  | AnnotateBlock;

// ─────────────────────────────────────────────────────────────────────

export interface Lesson {
  id: string;
  title: string;
  paragraphs: string[];
  takeaways: string[];
  type?: 'video' | 'interactive' | 'lab';
  duration?: number;
  blocks?: ContentBlock[];
}

// ── MINI-GAME TYPES ──────────────────────────────────────────────────

export type MiniGameType = 'tag-the-trick' | 'sort-cards' | 'order-steps' | 'shield-match' | 'risk-meter';

/** tag-the-trick: message contains [[phrase|id]] markers */
export interface TagTheTrickData {
  message: { vi: string; en: string };
  targets: { id: number; tag: { vi: string; en: string }; explanation: { vi: string; en: string } }[];
}

export interface SortCardsData {
  buckets: { id: string; label: { vi: string; en: string }; icon: string }[];
  cards: { id: number; text: { vi: string; en: string }; correctBucket: string; explanation: { vi: string; en: string } }[];
}

export interface OrderStepsData {
  steps: { id: number; label: { vi: string; en: string }; icon: string; description: { vi: string; en: string } }[];
}

export interface ShieldMatchData {
  rules: { id: string; label: { vi: string; en: string }; icon: string }[];
  scenarios: { id: number; text: { vi: string; en: string }; correctRule: string; explanation: { vi: string; en: string } }[];
}

export interface RiskMeterData {
  scenarios: { id: number; text: { vi: string; en: string }; expertRating: number; explanation: { vi: string; en: string } }[];
}

export interface MiniGameConfig {
  type: MiniGameType;
  title: { vi: string; en: string };
  instruction: { vi: string; en: string };
  reward: number;
  data: TagTheTrickData | SortCardsData | OrderStepsData | ShieldMatchData | RiskMeterData;
}

// ─────────────────────────────────────────────────────────────────────

export interface Checkpoint {
  label: string;
  questions: {
    text: string;
    options: string[];
    answer: number;
    explanation?: string;
  }[];
  miniGame?: MiniGameConfig;
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

const lesson = (id: string, title: string, paragraphs: string[], takeaways: string[], blocks?: ContentBlock[]): Lesson => ({
  id, title, paragraphs, takeaways, type: 'interactive', duration: 5, ...(blocks ? { blocks } : {})
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
          checkpoint: {
            label: "0.3",
            questions: [
              q("Mục tiêu chính của DEEPFENSE BASIC là gì?", ["Học cách tạo deepfake", "Học cách nhận diện và phòng vệ an toàn", "Học mẹo vượt detector", "Tăng lượt xem nội dung"], 1),
              q("Trong Deepfense Check, 'Verify' có nghĩa là gì?", ["Xác minh qua kênh độc lập", "Tin nếu video rõ nét", "Tải video về ngay", "Chia sẻ để hỏi cộng đồng"], 0),
            ],
            miniGame: {
              type: 'order-steps' as MiniGameType,
              title: { vi: '🔢 Sắp xếp quy trình Deepfense Check', en: '🔢 Order the Deepfense Check Steps' },
              instruction: {
                vi: 'Nhấn vào từng bước theo đúng thứ tự của quy trình Deepfense Check. Có 5 bước cần sắp xếp từ đầu tiên đến cuối cùng.',
                en: 'Tap each step in the correct order of the Deepfense Check process. There are 5 steps to arrange from first to last.',
              },
              reward: 1,
              data: {
                steps: [
                  {
                    id: 1,
                    icon: '⏸️',
                    label: { vi: 'Pause', en: 'Pause' },
                    description: {
                      vi: 'Dừng lại trước khi phản ứng. Không chuyển tiền, không chia sẻ, không kết luận khi còn đang xúc động.',
                      en: 'Stop before reacting. Don\'t transfer money, share, or conclude while still emotionally triggered.',
                    },
                  },
                  {
                    id: 2,
                    icon: '👁️',
                    label: { vi: 'Observe', en: 'Observe' },
                    description: {
                      vi: 'Quan sát dấu hiệu kỹ thuật (hình ảnh, âm thanh) và bối cảnh (ai gửi, yêu cầu gì, vì sao khẩn cấp).',
                      en: 'Observe technical signals (image, audio) and context (who sent it, what they want, why so urgent).',
                    },
                  },
                  {
                    id: 3,
                    icon: '✅',
                    label: { vi: 'Verify', en: 'Verify' },
                    description: {
                      vi: 'Xác minh qua kênh độc lập: gọi lại số đã lưu, kiểm tra website chính thức, hỏi người thứ ba đáng tin.',
                      en: 'Verify through an independent channel: call back a saved number, check the official website, ask a trusted third party.',
                    },
                  },
                  {
                    id: 4,
                    icon: '🔍',
                    label: { vi: 'Trace', en: 'Trace' },
                    description: {
                      vi: 'Truy nguồn nội dung: tìm bài gốc, kiểm tra lịch đăng, dùng công cụ tìm ảnh ngược hoặc kiểm tra URL.',
                      en: 'Trace the content\'s origin: find the original post, check the upload date, use reverse image search or URL verification.',
                    },
                  },
                  {
                    id: 5,
                    icon: '🎯',
                    label: { vi: 'Decide', en: 'Decide' },
                    description: {
                      vi: 'Ra quyết định ít gây hại nhất: từ chối, báo cáo, hỗ trợ nạn nhân hoặc không hành động thêm.',
                      en: 'Make the least-harmful decision: decline, report, support victims, or take no further action.',
                    },
                  },
                ],
              } as OrderStepsData,
            },
          }
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
          checkpoint: {
            label: "0.4",
            questions: [
              q("Bạn nhận video gọi trực tiếp từ người thân nói đang bị tai nạn và cần tiền gấp. Hình ảnh hơi mờ, tiếng bị giật. Bạn làm gì?", ["Chuyển tiền ngay", "Hỏi tài khoản rồi chuyển", "Dừng cuộc gọi, gọi lại số điện thoại đã lưu", "Bấm vào link 'vị trí' họ gửi"], 2),
              q("Thấy video người nổi tiếng quảng cáo ứng dụng đầu tư 'chắc chắn sinh lời 100%', bạn nên làm gì?", ["Đăng ký ngay", "Nạp thử một ít", "Kiểm tra kênh chính thức của người đó", "Chia sẻ cho bạn bè"], 2),
              q("Một hình ảnh nhạy cảm nghi là của một người quen bị lan truyền trong nhóm. Bạn làm gì?", ["Lưu lại để làm bằng chứng", "Gửi cho người khác hỏi thật giả", "Không lan truyền và báo cáo nội dung", "Bình luận trêu đùa"], 2),
              q("Bạn nhận email từ 'Ngân hàng' yêu cầu đăng nhập qua link để 'xác minh tài khoản'. Bạn làm gì?", ["Bấm link đăng nhập ngay", "Tự mở ứng dụng ngân hàng hoặc gõ đúng địa chỉ web của ngân hàng", "Gửi mã OTP cho họ", "Cài ứng dụng đính kèm"], 1),
              q("Ai có thể là nạn nhân của Deepfake?", ["Chỉ người nổi tiếng", "Chỉ người giàu", "Bất kỳ ai sử dụng Internet", "Chỉ người không biết công nghệ"], 2),
              q("Deepfake có thể giả mạo những gì?", ["Hình ảnh và video", "Giọng nói", "Cả hình ảnh, video và giọng nói", "Chỉ văn bản"], 2),
              q("Dấu hiệu nào ĐÁNG NGHI nhất trong một yêu cầu chuyển tiền?", ["Người đó nói đang rất gấp và bảo đừng nói với ai", "Video có màu sắc đẹp", "Tin nhắn có dấu câu đúng", "Gửi vào buổi sáng"], 0),
              q("Khi một nội dung làm bạn rất giận hoặc rất sợ, bạn nên làm gì đầu tiên?", ["Chia sẻ để cảnh báo", "Bình luận phản đối", "Dừng lại 30 giây để kiểm chứng", "Tải video về máy"], 2),
            ],
            miniGame: {
              type: 'sort-cards' as MiniGameType,
              title: { vi: '🗂️ Giúp An phân loại tình huống', en: '🗂️ Help An Sort the Situations' },
              instruction: {
                vi: 'An đã gặp 6 tình huống trong ngày hôm đó. Kéo hoặc nhấn từng thẻ vào đúng nhóm: Bình thường, Cần kiểm tra, hoặc Nguy hiểm.',
                en: 'An encountered 6 situations today. Drag or tap each card into the right group: Normal, Check First, or Dangerous.',
              },
              reward: 1,
              data: {
                buckets: [
                  { id: 'normal', icon: '🟢', label: { vi: 'Bình thường', en: 'Normal' } },
                  { id: 'check',  icon: '🟡', label: { vi: 'Cần kiểm tra', en: 'Check First' } },
                  { id: 'danger', icon: '🔴', label: { vi: 'Nguy hiểm', en: 'Dangerous' } },
                ],
                cards: [
                  {
                    id: 1,
                    text: {
                      vi: 'Buổi sáng, An thấy video người nổi tiếng giới thiệu kênh đầu tư lợi nhuận cao. Gương mặt và giọng đúng là người đó.',
                      en: 'In the morning, An sees a video of a celebrity promoting a high-profit investment channel. The face and voice match perfectly.',
                    },
                    correctBucket: 'danger',
                    explanation: {
                      vi: 'Deepfake thường dùng khuôn mặt và giọng nói của người nổi tiếng để tạo độ tin cậy. Không đầu tư trước khi xác minh qua kênh chính thức.',
                      en: 'Deepfakes often use celebrity faces and voices to appear credible. Never invest before verifying through official channels.',
                    },
                  },
                  {
                    id: 2,
                    text: {
                      vi: 'Chiều hôm đó, An nhận cuộc gọi video từ người thân. Hình hơi mờ, âm thanh không rõ dù sóng mạng đang tốt.',
                      en: 'That afternoon, An receives a video call from a relative. The image is blurry and audio unclear despite a strong network signal.',
                    },
                    correctBucket: 'check',
                    explanation: {
                      vi: 'Chất lượng thấp bất thường trong điều kiện mạng tốt cần được xác minh — có thể là deepfake hoặc tài khoản bị chiếm quyền.',
                      en: 'Unusually poor quality despite a good connection warrants verification — could be deepfake or an account takeover.',
                    },
                  },
                  {
                    id: 3,
                    text: {
                      vi: 'An nhận tin nhắn từ số lạ: "Chúc mừng! Bạn trúng iPhone 15. Nhấp vào link này để nhận thưởng!"',
                      en: 'An receives a message from an unknown number: "Congratulations! You\'ve won an iPhone 15. Click this link to claim your prize!"',
                    },
                    correctBucket: 'danger',
                    explanation: {
                      vi: 'Thông báo trúng thưởng từ số lạ kèm link là lừa đảo cổ điển. Không bao giờ nhấp vào.',
                      en: 'Prize notifications from unknown senders with links are a classic scam. Never click.',
                    },
                  },
                  {
                    id: 4,
                    text: {
                      vi: 'Đến trưa, tài khoản Facebook của bạn cũ An nhắn xin mượn tiền gấp. Ảnh đại diện đúng nhưng cách nhắn hơi lạ hơn bình thường.',
                      en: 'At noon, a Facebook account that looks like An\'s old friend messages asking to borrow money urgently. Profile photo matches but the writing style is slightly off.',
                    },
                    correctBucket: 'check',
                    explanation: {
                      vi: 'Tài khoản mạng xã hội có thể bị chiếm quyền. Xác minh qua số điện thoại hoặc kênh liên lạc đã biết trước.',
                      en: 'Social media accounts can be hijacked. Verify through a known phone number or other communication channel.',
                    },
                  },
                  {
                    id: 5,
                    text: {
                      vi: 'Trong nhóm chat xuất hiện clip viral: "Nghệ sĩ X thừa nhận scandal lớn" — không thấy báo chí hay trang tin chính thống nào đưa.',
                      en: 'A viral clip appears in the group chat: "Celebrity X admits major scandal" — no mainstream news outlet is reporting it.',
                    },
                    correctBucket: 'danger',
                    explanation: {
                      vi: 'Nội dung chấn động không có nguồn báo chí chính thống thường là deepfake hoặc tin giả. Không chia sẻ trước khi kiểm chứng.',
                      en: 'Shocking content with no mainstream source is typically deepfake or fake news. Don\'t share before verifying.',
                    },
                  },
                  {
                    id: 6,
                    text: {
                      vi: 'An nhận email từ trường đại học thông báo lịch thi cuối kỳ. Địa chỉ gửi đúng domain chính thức, không kèm link lạ.',
                      en: 'An receives an email from university announcing the final exam schedule. Sent from the official domain, no suspicious links.',
                    },
                    correctBucket: 'normal',
                    explanation: {
                      vi: 'Email từ domain hợp lệ với nội dung thường lệ và không yêu cầu hành động nhạy cảm — đáng tin.',
                      en: 'Email from a valid domain with routine content and no sensitive requests — trustworthy.',
                    },
                  },
                ],
              } as SortCardsData,
            },
          }
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
            ], [
              // ── CONTENT BLOCKS — Phiên 1 sample ──────────────────────
              {
                type: 'callout',
                variant: 'warning',
                icon: '⚠️',
                title: { vi: 'Con số đáng lo ngại', en: 'A worrying number' },
                content: {
                  vi: 'Năm 2023, số lượng deepfake được phát hiện trên internet tăng hơn 900% so với 2019. Phần lớn nạn nhân không biết mình đã bị nhắm mục tiêu cho đến khi thiệt hại đã xảy ra.',
                  en: 'In 2023, detected deepfakes on the internet increased by over 900% compared to 2019. Most victims didn\'t realise they had been targeted until the damage was already done.'
                }
              } as CalloutBlock,
              {
                type: 'image',
                src: 'https://picsum.photos/seed/deepfake-demo/800/420',
                alt: { vi: 'Minh họa kỹ thuật face-swap trong deepfake', en: 'Illustration of face-swap technique in deepfake' },
                caption: { vi: '🔬 Ảnh minh họa — gương mặt bên phải được ghép bằng AI. Trong thực tế, chất lượng ngày càng khó phân biệt bằng mắt thường.', en: '🔬 Illustration only — the face on the right was AI-composited. In practice, quality is increasingly hard to distinguish with the naked eye.' }
              } as ImageBlock,
              {
                type: 'compare',
                mode: 'side-by-side',
                before: {
                  src: 'https://picsum.photos/seed/original-face/400/320',
                  label: { vi: '🎥 Video gốc', en: '🎥 Original video' }
                },
                after: {
                  src: 'https://picsum.photos/seed/deepfake-face/400/320',
                  label: { vi: '🤖 Sau khi áp dụng deepfake', en: '🤖 After deepfake applied' }
                },
                caption: { vi: 'Hãy chú ý viền tóc, vùng tai và da cổ — đây là những khu vực thường bị lỗi kỹ thuật nhất trong deepfake.', en: 'Pay attention to the hairline, ear area and neck skin — these are the zones most prone to technical artefacts in deepfakes.' }
              } as CompareBlock
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
            ], [
              {
                type: 'callout',
                variant: 'danger',
                icon: '🚨',
                title: { vi: 'Dữ liệu của bạn là nguyên liệu deepfake', en: 'Your Data Is Deepfake Raw Material' },
                content: { vi: 'Mỗi bức ảnh, đoạn video, clip giọng nói bạn đăng công khai lên mạng xã hội đều có thể được thu thập và dùng để huấn luyện AI giả mạo bạn. Ngay cả một bài đăng bình thường cũng đủ để kẻ xấu hiểu phong cách nói chuyện, mối quan hệ và thói quen hằng ngày của bạn.', en: 'Every photo, video, and voice clip you post publicly on social media can be harvested and used to train AI to impersonate you. Even a casual post gives bad actors enough to understand your speech patterns, relationships, and daily habits.' }
              } as CalloutBlock,
              {
                type: 'callout',
                variant: 'tip',
                icon: '🛡️',
                title: { vi: 'Kiểm soát dấu chân kỹ thuật số', en: 'Control Your Digital Footprint' },
                content: { vi: 'Bước đơn giản nhất để giảm rủi ro:\n• Kiểm tra lại quyền riêng tư trên Facebook, TikTok, Zalo.\n• Hạn chế đăng ảnh/video chất lượng cao kèm tiêu đề đầy đủ tên, ngày sinh, địa chỉ.\n• Dùng tính năng Khiên AI (Fawkes) của DEEPFENSE để tiêm nhiễu tàng hình vào ảnh trước khi đăng.', en: 'Simplest steps to reduce risk:\n• Review your privacy settings on social media.\n• Avoid posting high-quality photos/videos with your full name, birthdate, and address.\n• Use the DEEPFENSE AI Shield (Fawkes) feature to inject invisible noise into photos before posting.' }
              } as CalloutBlock
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
          checkpoint: { label: "1.1", questions: [], miniGame: {
            type: 'sort-cards' as MiniGameType,
            title: { vi: '🗂️ Phân loại nội dung giả mạo', en: '🗂️ Classify Manipulated Media' },
            instruction: { vi: 'Kéo (hoặc nhấn) mỗi tình huống vào đúng loại nội dung. Áp dụng những gì bạn vừa học về Deepfake, Deepvoice, Edited Media và Repurposed Media.', en: 'Tap each scenario card and assign it to the correct media type. Apply what you just learned about Deepfake, Deepvoice, Edited Media and Repurposed Media.' },
            reward: 2,
            data: {
              buckets: [
                { id: 'deepfake', label: { vi: 'Deepfake / Face Swap', en: 'Deepfake / Face Swap' }, icon: '🎭' },
                { id: 'deepvoice', label: { vi: 'Deepvoice', en: 'Deepvoice' }, icon: '🔊' },
                { id: 'edited', label: { vi: 'Edited / Repurposed', en: 'Edited / Repurposed' }, icon: '✂️' },
                { id: 'aigenerated', label: { vi: 'AI-Generated', en: 'AI-Generated' }, icon: '🤖' },
              ],
              cards: [
                { id: 1, text: { vi: 'Video người nổi tiếng kêu gọi đầu tư crypto — gương mặt và giọng đúng nhưng họ chưa từng phát biểu điều này.', en: 'A celebrity appears to promote a crypto investment — face and voice match but they never said this.' }, correctBucket: 'deepfake', explanation: { vi: 'Mạo danh gương mặt và lời nói người thật → Deepfake.', en: 'Face and speech impersonation of a real person → Deepfake.' } },
                { id: 2, text: { vi: 'Cuộc gọi thoại giống sếp yêu cầu chuyển tiền gấp — chỉ có âm thanh, không có video.', en: 'Voice call mimicking your boss asking for urgent transfer — audio only, no video.' }, correctBucket: 'deepvoice', explanation: { vi: 'Giả lập giọng nói mà không có hình → Deepvoice.', en: 'Voice-only impersonation → Deepvoice.' } },
                { id: 3, text: { vi: 'Clip bài phát biểu 1 tiếng bị cắt còn 10 giây, đổi hẳn ý nghĩa câu nói.', en: 'A 1-hour speech clipped to 10 seconds, completely changing the meaning.' }, correctBucket: 'edited', explanation: { vi: 'Nội dung thật bị cắt ghép làm thay đổi ý nghĩa → Edited Media.', en: 'Real content edited to distort meaning → Edited Media.' } },
                { id: 4, text: { vi: 'Video lũ lụt từ năm 2020 ở nước ngoài được chia sẻ như đang xảy ra hôm nay tại Việt Nam.', en: 'A 2020 flood video from abroad shared as if happening today in Vietnam.' }, correctBucket: 'edited', explanation: { vi: 'Nội dung thật đặt sai bối cảnh → Repurposed Media.', en: 'Real content placed in false context → Repurposed Media.' } },
                { id: 5, text: { vi: 'Ảnh đại diện "chuyên gia tư vấn tài chính" trên Zalo — không ai biết người này là ai ngoài đời thật.', en: 'A "financial advisor" profile photo on Zalo — no one knows this person in real life.' }, correctBucket: 'aigenerated', explanation: { vi: 'Gương mặt người không tồn tại được tạo bằng AI → AI-Generated Image.', en: 'Face of a non-existent person made by AI → AI-Generated Image.' } },
                { id: 6, text: { vi: 'Video call học sinh bị ghép mặt vào nội dung nhạy cảm không phải của người đó.', en: 'A student\'s face swapped onto sensitive content they did not create.' }, correctBucket: 'deepfake', explanation: { vi: 'Ghép khuôn mặt người thật vào nội dung khác → Deepfake / Face Swap.', en: 'Real person\'s face swapped onto other content → Deepfake / Face Swap.' } },
                { id: 7, text: { vi: 'Tin nhắn thoại ngắn giả giọng người mẹ: "Con ơi, mẹ đang kẹt tiền, con chuyển cho mẹ đi."', en: 'Short voice message mimicking a mother: "Honey, I\'m stuck, please send me money."' }, correctBucket: 'deepvoice', explanation: { vi: 'Giả lập giọng người thân để mượn tiền → Deepvoice.', en: 'Voice clone of a family member to request money → Deepvoice.' } },
                { id: 8, text: { vi: 'Ảnh minh họa AI "robot y tế" được dùng trong bài báo khoa học với ghi chú rõ ràng.', en: 'AI-generated "medical robot" illustration used in a science article, clearly labeled.' }, correctBucket: 'aigenerated', explanation: { vi: 'Ảnh AI minh bạch, có ghi chú rõ → AI-Generated Image (rủi ro thấp).', en: 'Transparent AI image, clearly labeled → AI-Generated Image (low risk).' } },
              ]
            } as SortCardsData
          } }
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
            ], [
              // ── CONTENT BLOCKS — Phiên 2 audio sample ────────────────
              {
                type: 'callout',
                variant: 'danger',
                icon: '🎙️',
                title: { vi: 'Nghe thử — giọng nói deepvoice thực tế', en: 'Listen — a real deepvoice sample' },
                content: {
                  vi: 'Đoạn âm thanh bên dưới mô phỏng kiểu giọng nói deepvoice thường dùng trong lừa đảo qua điện thoại. Hãy chú ý đến sự đều đều bất thường, thiếu nhịp thở và các âm thanh xung quanh.',
                  en: 'The audio below simulates the type of deepvoice commonly used in phone scams. Notice the unusual uniformity, lack of natural breathing, and absence of background sounds.'
                }
              } as CalloutBlock,
              {
                type: 'audio',
                src: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
                title: { vi: '🔊 Mô phỏng cuộc gọi deepvoice — "sếp" yêu cầu chuyển tiền', en: '🔊 Simulated deepvoice call — "boss" requesting transfer' },
                description: {
                  vi: '"Anh ơi, chuyển gấp 200 triệu cho đối tác Hà Nội. Anh đang bận họp, xử lý trước đi, đừng hỏi kế toán..."',
                  en: '"Hey, transfer 200M urgently to the Hanoi partner. I\'m in a meeting, handle it first, don\'t ask accounting..."'
                },
                duration: '0:28'
              } as AudioBlock,
              {
                type: 'callout',
                variant: 'tip',
                icon: '💡',
                title: { vi: '3 dấu hiệu âm thanh cần chú ý', en: '3 audio red flags to notice' },
                content: {
                  vi: '**1. Giọng quá đều:** Thiếu nhịp ngắt, hơi thở, âm điệu lên xuống tự nhiên. **2. Không có tạp âm nền:** Cuộc gọi thật từ cuộc họp luôn có tiếng môi trường. **3. Phát âm cứng:** Các từ địa phương hoặc tên riêng thường bị phát âm lạ.',
                  en: '**1. Too uniform:** Missing natural pauses, breathing, and intonation variations. **2. No background noise:** A real call from a meeting always has ambient sounds. **3. Stiff pronunciation:** Local words or proper names are often mispronounced.'
                }
              } as CalloutBlock
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
            ], [
              // ── CONTENT BLOCKS — Phiên 3 ExerciseBlock ────────────────
              {
                type: 'exercise',
                variant: 'single-choice',
                question: {
                  vi: 'Kẻ lừa đảo nhắn: "Chuyển tiền ngay, đừng nói với ai, chỉ còn 10 phút!" — Đây là kết hợp của những kỹ thuật nào?',
                  en: 'The scammer messages: "Transfer now, don\'t tell anyone, only 10 minutes left!" — This combines which techniques?'
                },
                options: [
                  { vi: 'Tạo lòng tin dài hạn + Hứa hẹn lợi nhuận', en: 'Building long-term trust + Profit promises' },
                  { vi: 'Áp lực thời gian + Cô lập + Đe dọa ngầm', en: 'Time pressure + Isolation + Implicit threat' },
                  { vi: 'Giả nhân nghĩa + Cam kết ảo', en: 'False goodwill + Fake commitment' },
                  { vi: 'Dụ dỗ lợi ích + Khen ngợi', en: 'Benefit lure + Flattery' }
                ],
                correctIndex: 1,
                explanation: {
                  vi: '"Chuyển ngay" = áp lực thời gian. "Đừng nói với ai" = cô lập nạn nhân khỏi nguồn hỗ trợ. "Chỉ còn 10 phút" = deadline giả để bạn hành động trước khi kịp suy nghĩ. Cả 3 cùng lúc là dấu hiệu lừa đảo rõ ràng nhất.',
                  en: '"Transfer now" = time pressure. "Don\'t tell anyone" = isolates victim from support. "Only 10 minutes" = fake deadline to force action before thinking. All 3 together is the clearest scam indicator.'
                },
                reward: 2
              } as ExerciseBlock,
              {
                type: 'exercise',
                variant: 'fill-blank',
                question: {
                  vi: 'Hoàn thành câu sau:',
                  en: 'Complete the sentence:'
                },
                template: {
                  vi: 'Khi ai đó yêu cầu bạn "đừng nói với ai", đây là kỹ thuật [[BLANK]] — nhằm ngăn bạn xác minh với người khác.',
                  en: 'When someone asks you to "don\'t tell anyone", this is the [[BLANK]] technique — designed to prevent you from verifying with others.'
                },
                options: [
                  { vi: 'cô lập', en: 'isolation' },
                  { vi: 'áp lực thời gian', en: 'time pressure' },
                  { vi: 'giả nhân nghĩa', en: 'false goodwill' }
                ],
                correctIndex: 0,
                explanation: {
                  vi: 'Cô lập là kỹ thuật tách nạn nhân ra khỏi mạng lưới hỗ trợ — gia đình, bạn bè, đồng nghiệp. Kẻ lừa đảo biết rằng nếu bạn hỏi thêm người khác, khả năng lừa thành công sẽ giảm mạnh.',
                  en: 'Isolation separates the victim from their support network — family, friends, colleagues. Scammers know that if you consult others, the chance of success drops drastically.'
                },
                reward: 1
              } as ExerciseBlock
            ])
          ],
          checkpoint: { label: "2.1", questions: [], miniGame: {
            type: 'tag-the-trick' as MiniGameType,
            title: { vi: '🎯 Nhận diện ngôn ngữ thao túng', en: '🎯 Tag the Manipulation Trick' },
            instruction: { vi: 'Nhấn vào các cụm từ đáng ngờ trong tin nhắn bên dưới. Tìm tất cả 5 thủ thuật thao túng mà kẻ xấu đang dùng.', en: 'Tap the suspicious phrases in the message below. Find all 5 manipulation tricks the scammer is using.' },
            reward: 3,
            data: {
              message: {
                vi: 'Mẹ ơi, con đang bị tai nạn nặng lắm, đang ở bệnh viện. Bác sĩ bảo phải [[mổ ngay không thì nguy hiểm tính mạng|1]]. Mẹ chuyển [[NGAY|2]] 20 triệu vào STK này đi, [[đừng nói cho ai biết|3]] nha mẹ, con [[xấu hổ lắm|4]]. Nhanh lên mẹ ơi, [[chỉ còn 30 phút|5]]!',
                en: 'Mom, I was in a terrible accident, I\'m at the hospital. The doctor says I need [[emergency surgery or my life is at risk|1]]. Please transfer [[IMMEDIATELY|2]] 20 million to this account, [[don\'t tell anyone|3]] okay mom, [[I\'m so ashamed|4]]. Hurry mom, [[only 30 minutes left|5]]!'
              },
              targets: [
                { id: 1, tag: { vi: '🚨 Đe dọa', en: '🚨 Threat' }, explanation: { vi: '"Mổ ngay không thì nguy hiểm tính mạng" — đẩy cảm xúc sợ hãi lên mức tối đa để não bộ bỏ qua kiểm chứng.', en: '"Emergency surgery or life is at risk" — maximises fear to bypass rational thinking.' } },
                { id: 2, tag: { vi: '⏰ Áp lực thời gian', en: '⏰ Time Pressure' }, explanation: { vi: '"NGAY" (viết hoa) — chữ hoa tạo cảm giác khẩn cấp giả tạo, kích hoạt hành động vội vàng.', en: '"IMMEDIATELY" (caps) — capitalisation creates artificial urgency, triggering hasty action.' } },
                { id: 3, tag: { vi: '🔇 Cô lập', en: '🔇 Isolation' }, explanation: { vi: '"Đừng nói cho ai biết" — ngăn bạn xác minh với người khác, cô lập nạn nhân với nguồn trợ giúp.', en: '"Don\'t tell anyone" — prevents you from verifying with others, isolating the victim from help.' } },
                { id: 4, tag: { vi: '💔 Thao túng cảm xúc', en: '💔 Emotional Manipulation' }, explanation: { vi: '"Xấu hổ lắm" — khai thác cảm xúc xấu hổ để bạn không muốn thảo luận với ai khác.', en: '"I\'m so ashamed" — exploits shame so you won\'t discuss the situation with others.' } },
                { id: 5, tag: { vi: '⏰ Đếm ngược giả', en: '⏰ Fake Countdown' }, explanation: { vi: '"Chỉ còn 30 phút" — deadline đếm ngược bịa đặt để ép bạn hành động trước khi kịp suy nghĩ.', en: '"Only 30 minutes left" — fabricated countdown deadline to force action before you can think clearly.' } }
              ]
            } as TagTheTrickData
          } }
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
            ], [
              // ── CONTENT BLOCKS — Phiên 2 table sample ────────────────
              {
                type: 'callout',
                variant: 'info',
                icon: '🔬',
                title: { vi: 'Bảng tham chiếu nhanh', en: 'Quick reference table' },
                content: {
                  vi: 'Bảng dưới tổng hợp các khu vực thường xuất hiện lỗi kỹ thuật trong deepfake, mức độ nguy hiểm và cách nhận biết. Dùng làm checklist khi xem nội dung nghi vấn.',
                  en: 'The table below summarises common artefact zones in deepfakes, their risk level, and how to spot them. Use as a checklist when reviewing suspicious content.'
                }
              } as CalloutBlock,
              {
                type: 'table',
                caption: { vi: 'Dấu hiệu kỹ thuật thường gặp trong deepfake video', en: 'Common technical artefacts in deepfake video' },
                headers: [
                  { vi: 'Khu vực', en: 'Zone' },
                  { vi: 'Dấu hiệu nghi vấn', en: 'Suspicious artefact' },
                  { vi: 'Mức rủi ro', en: 'Risk level' },
                  { vi: 'Cách kiểm tra', en: 'How to check' }
                ],
                rows: [
                  [
                    { vi: '💇 Tóc / Viền đầu', en: '💇 Hair / Hairline' },
                    { vi: 'Mờ, nhòe, pixel lạ ở rìa', en: 'Blur, smear, odd pixels at edge' },
                    { vi: '🔴 Cao', en: '🔴 High' },
                    { vi: 'Tua chậm đoạn người quay đầu', en: 'Slow-scrub head-turn moments' }
                  ],
                  [
                    { vi: '👁️ Mắt', en: '👁️ Eyes' },
                    { vi: 'Không chớp, phản chiếu ánh sáng bất thường', en: 'No blinking, odd light reflection' },
                    { vi: '🔴 Cao', en: '🔴 High' },
                    { vi: 'Đếm số lần chớp mắt trong 10 giây', en: 'Count blinks over 10 seconds' }
                  ],
                  [
                    { vi: '👂 Tai / Cổ', en: '👂 Ears / Neck' },
                    { vi: 'Biến dạng khi quay đầu', en: 'Distorts when head turns' },
                    { vi: '🟡 Trung bình', en: '🟡 Medium' },
                    { vi: 'Quan sát tai khi nhân vật quay sang bên', en: 'Watch ears during profile turns' }
                  ],
                  [
                    { vi: '💡 Ánh sáng / Bóng đổ', en: '💡 Lighting / Shadow' },
                    { vi: 'Bóng trên mặt không khớp nguồn sáng nền', en: 'Face shadow mismatches background light' },
                    { vi: '🟡 Trung bình', en: '🟡 Medium' },
                    { vi: 'So sánh hướng bóng đổ trên mặt vs. nền', en: 'Compare shadow direction on face vs. background' }
                  ],
                  [
                    { vi: '🦷 Răng / Miệng', en: '🦷 Teeth / Mouth' },
                    { vi: 'Răng mờ, méo khi nói nhanh', en: 'Teeth blur or warp during fast speech' },
                    { vi: '🟡 Trung bình', en: '🟡 Medium' },
                    { vi: 'Xem frame-by-frame đoạn nói nhanh', en: 'Step frame-by-frame through fast speech' }
                  ],
                  [
                    { vi: '🖼️ Nền video', en: '🖼️ Background' },
                    { vi: 'Nhòe, flicker, đường thẳng bị méo', en: 'Blur, flicker, warped straight lines' },
                    { vi: '🟢 Thấp', en: '🟢 Low' },
                    { vi: 'Nhìn vào cạnh tường, bảng hiệu, khung cửa', en: 'Look at wall edges, signs, door frames' }
                  ]
                ]
              } as TableBlock,
              {
                type: 'callout',
                variant: 'warning',
                icon: '⚠️',
                content: {
                  vi: 'Không có lỗi kỹ thuật **không đồng nghĩa** với "video thật". Các mô hình deepfake thế hệ mới ngày càng ít lỗi hơn. Luôn kết hợp phân tích kỹ thuật với kiểm chứng nguồn gốc và bối cảnh.',
                  en: 'No artefacts found does **not** mean "real video". Newer deepfake models produce fewer visible errors. Always combine technical analysis with source and context verification.'
                }
              } as CalloutBlock
            ]),
            lesson("3.1.2", "Ánh sáng và Nền", [
              "Ánh sáng: Bóng trên mặt không khớp với nguồn sáng trong nền. Da mặt có độ sáng khác hẳn với cổ.",
              "Nền: Các đường thẳng (cạnh tường, bảng hiệu) bị méo, logo bị sai chính tả, hoặc vật thể ở nền thay đổi kỳ lạ khi video phát."
            ], [
              "Quan sát sự nhất quán giữa người và cảnh.",
              "Logo và chữ viết thường là điểm yếu của các mô hình AI tạo hình."
            ], [
              // ── CONTENT BLOCKS — Phiên 3 AnnotateBlock ────────────────
              {
                type: 'callout',
                variant: 'info',
                icon: '🔍',
                title: { vi: 'Thực hành quan sát', en: 'Observation practice' },
                content: {
                  vi: 'Ảnh dưới đây mô phỏng một khuôn mặt deepfake điển hình. Nhấn vào các vùng bạn thấy bất thường, sau đó nhấn "Phân tích" để xem kết quả.',
                  en: 'The image below simulates a typical deepfake face. Tap the areas you find suspicious, then press "Analyse" to see the results.'
                }
              } as CalloutBlock,
              {
                type: 'annotate',
                src: 'https://picsum.photos/seed/deepface/600/400',
                alt: {
                  vi: 'Ảnh chân dung mô phỏng deepfake để luyện tập nhận diện',
                  en: 'Portrait image simulating a deepfake for recognition training'
                },
                instruction: {
                  vi: 'Nhấn vào các vùng bạn nghi là có lỗi deepfake (viền tóc, mắt, tai, cổ, nền...)',
                  en: 'Tap the areas you suspect contain deepfake artifacts (hairline, eyes, ears, neck, background...)'
                },
                targets: [
                  {
                    id: 1,
                    x: 50,
                    y: 12,
                    radius: 8,
                    label: { vi: 'Viền tóc', en: 'Hairline' },
                    explanation: {
                      vi: 'Viền tóc thường bị nhòe hoặc có pixel lạ — AI khó xử lý vùng chuyển tiếp giữa tóc và da.',
                      en: 'The hairline is often blurred or has strange pixels — AI struggles with the transition between hair and skin.'
                    }
                  },
                  {
                    id: 2,
                    x: 38,
                    y: 38,
                    radius: 7,
                    label: { vi: 'Mắt trái', en: 'Left eye' },
                    explanation: {
                      vi: 'Ánh sáng phản chiếu trong mắt (catchlight) bất thường hoặc không khớp giữa hai mắt là dấu hiệu deepfake phổ biến.',
                      en: 'Abnormal or asymmetric catchlights (reflections in the eyes) are a common deepfake indicator.'
                    }
                  },
                  {
                    id: 3,
                    x: 15,
                    y: 50,
                    radius: 6,
                    label: { vi: 'Vùng tai', en: 'Ear area' },
                    explanation: {
                      vi: 'Tai và vùng cạnh mặt thường bị biến dạng khi người quay đầu — AI khó duy trì hình học 3D chính xác.',
                      en: 'Ears and face edges often distort when the person turns their head — AI struggles to maintain accurate 3D geometry.'
                    }
                  }
                ],
                reward: 3
              } as AnnotateBlock
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
          checkpoint: {
            label: "3.1",
            questions: [
              q("Dấu hiệu nào thường thấy ở mắt trong video deepfake?", ["Mắt chớp quá nhiều", "Nhịp nháy mắt không tự nhiên hoặc ánh mắt không khớp hướng đầu", "Mắt luôn nhắm", "Mắt có màu lạ"], 1),
              q("Điều gì ĐÁNG NGHI nhất trong một tin nhắn thoại?", ["Tiếng chim hót ở nền", "Giọng nói đều đều thiếu nhịp thở tự nhiên và yêu cầu tiền gấp", "Nói tiếng Việt chuẩn", "Nói nhanh"], 1),
            ],
            miniGame: {
              type: 'risk-meter' as MiniGameType,
              title: { vi: '🔬 Mắt Chuyên Gia', en: '🔬 Expert Eye Test' },
              instruction: {
                vi: 'Dựa trên những dấu hiệu kỹ thuật vừa học, hãy đánh giá mức độ đáng ngờ (1 = Bình thường, 5 = Cực kỳ đáng ngờ) cho từng mô tả dưới đây. Sau đó so sánh với nhận định của chuyên gia.',
                en: 'Based on the technical signals you just learned, rate the suspiciousness (1 = Normal, 5 = Highly suspicious) of each description below. Then compare with the expert\'s assessment.',
              },
              reward: 2,
              data: {
                scenarios: [
                  {
                    id: 1,
                    text: {
                      vi: 'Video phỏng vấn: Gương mặt phát ngôn rõ nét, ánh mắt di chuyển tự nhiên, ánh sáng đồng đều từ một nguồn, khẩu hình miệng khớp hoàn toàn với âm thanh.',
                      en: 'Interview video: Speaker\'s face is sharp, eyes move naturally, lighting is consistent from one source, and lip movement matches the audio perfectly.',
                    },
                    expertRating: 1,
                    explanation: {
                      vi: 'Không có dấu hiệu kỹ thuật nào đáng ngờ. Gương mặt rõ, mắt tự nhiên, ánh sáng đồng đều và khẩu hình khớp là các chỉ số của nội dung thật được quay đúng chuẩn.',
                      en: 'No suspicious technical signals. Sharp face, natural eye movement, consistent lighting and perfect lip-sync are all indicators of authentic, properly recorded content.',
                    },
                  },
                  {
                    id: 2,
                    text: {
                      vi: 'Clip người nổi tiếng phát biểu: Viền tóc bị mờ và nhòa bất thường, da mặt quá mịn không tự nhiên, ánh mắt không di chuyển theo hướng ống kính khi đang nói.',
                      en: 'Celebrity speech clip: Hairline is unusually blurry and soft, facial skin is unnaturally smooth, and eyes do not track the camera lens while speaking.',
                    },
                    expertRating: 5,
                    explanation: {
                      vi: 'Ba dấu hiệu deepfake cổ điển cùng xuất hiện: viền tóc nhòa, da mịn bất thường, mắt không khớp hướng nhìn. Bất kỳ một trong ba đã đáng ngờ — cả ba cùng lúc là mức nguy hiểm tối đa.',
                      en: 'Three classic deepfake signs appear together: blurry hairline, unnaturally smooth skin, and misaligned gaze. Any one alone is suspicious — all three at once means maximum risk.',
                    },
                  },
                  {
                    id: 3,
                    text: {
                      vi: 'Tin nhắn thoại: Giọng nói đều đặn hoàn toàn không có ngắt nghỉ, thiếu âm tiếng thở tự nhiên giữa các câu, chất lượng âm thanh quá sạch như studio trong một cuộc trò chuyện thông thường.',
                      en: 'Voice message: Perfectly even tone with absolutely no pauses, no natural breathing sounds between sentences, and studio-clean audio quality in what is supposed to be a casual conversation.',
                    },
                    expertRating: 4,
                    explanation: {
                      vi: 'Thiếu nhịp thở, giọng đều đặn bất thường và âm thanh quá sạch là ba dấu hiệu điển hình của deepvoice. Nội dung yêu cầu hành động tài chính sẽ đẩy mức rủi ro lên 5.',
                      en: 'No breathing rhythm, abnormally flat tone, and studio-clean audio are three classic deepvoice signals. Any request for financial action would push this to a 5.',
                    },
                  },
                  {
                    id: 4,
                    text: {
                      vi: 'Ảnh chụp lãnh đạo công ty đang ký hợp đồng: Bàn tay hơi biến dạng với 6 ngón, nền phòng họp phía sau bị méo nhẹ ở góc ảnh.',
                      en: 'Photo of a company executive signing a contract: Hands appear slightly deformed with 6 fingers, and the meeting room background is subtly warped at the corner of the image.',
                    },
                    expertRating: 5,
                    explanation: {
                      vi: 'Số ngón tay sai và nền bị méo là hai lỗi AI generation phổ biến nhất — AI vẫn gặp khó khăn với chi tiết bàn tay và đường thẳng. Đây gần như chắc chắn là ảnh AI-Generated.',
                      en: 'Wrong finger count and a warped background are two of the most common AI generation errors — AI still struggles with hand details and straight lines. This is almost certainly an AI-generated image.',
                    },
                  },
                ],
              } as RiskMeterData,
            },
          }
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
            ], [
              // ── CONTENT BLOCKS — Phiên 3 SandboxBlock ────────────────
              {
                type: 'sandbox',
                title: { vi: '🎭 Thực hành: Nhận diện kịch bản ngân hàng giả', en: '🎭 Practice: Spot the Fake Bank Scenario' },
                description: {
                  vi: 'Bạn nhận được một tin nhắn. Hãy vận dụng bước Verify đã học để phản ứng đúng.',
                  en: 'You receive a message. Apply the Verify step you just learned to respond correctly.'
                },
                turns: [
                  {
                    speaker: 'scammer',
                    message: {
                      vi: '🏦 [Ngân hàng VCB - Thông báo khẩn]\n\nTài khoản của bạn vừa bị đăng nhập từ thiết bị lạ tại Hà Nội. Để bảo vệ tài khoản, hãy xác minh ngay tại:\n\n🔗 bit.ly/vcb-secure-2024\n\nNếu không xác minh trong 30 phút, tài khoản sẽ bị khóa.',
                      en: '🏦 [VCB Bank - Urgent Notice]\n\nYour account was just accessed from an unknown device in Hanoi. To protect your account, verify immediately at:\n\n🔗 bit.ly/vcb-secure-2024\n\nIf not verified within 30 minutes, your account will be locked.'
                    },
                    choices: [
                      {
                        label: { vi: 'A. Nhấp vào link để xác minh nhanh', en: 'A. Click the link to verify quickly' },
                        outcome: 'bad',
                        feedback: {
                          vi: '❌ Nguy hiểm! Link rút gọn che giấu URL thật. Đây là kỹ thuật phishing cổ điển — trang giả sẽ thu thập thông tin đăng nhập của bạn. Ngân hàng thật KHÔNG BAO GIỜ gửi link rút gọn.',
                          en: '❌ Dangerous! Short links hide the real URL. This is classic phishing — the fake page will steal your login credentials. Real banks NEVER send shortened links.'
                        }
                      },
                      {
                        label: { vi: 'B. Tự mở app VCB chính thức để kiểm tra', en: 'B. Open the official VCB app yourself to check' },
                        outcome: 'good',
                        feedback: {
                          vi: '✅ Đúng! Đây là kênh độc lập an toàn nhất. Bạn tự điều hướng đến nguồn đã biết thay vì đi theo link người lạ cung cấp. Nếu tài khoản thật sự bị vấn đề, app sẽ thông báo.',
                          en: '✅ Correct! This is the safest independent channel. You navigate to a known source instead of following a stranger\'s link. If there\'s a real issue, the app will notify you.'
                        }
                      },
                      {
                        label: { vi: 'C. Gọi số điện thoại ghi trong tin nhắn', en: 'C. Call the phone number listed in the message' },
                        outcome: 'bad',
                        feedback: {
                          vi: '❌ Cẩn thận! Số điện thoại trong tin nhắn nghi vấn có thể là số của kẻ lừa đảo. Hãy tìm số hotline chính thức trên mặt sau thẻ ngân hàng hoặc website chính thống.',
                          en: '❌ Careful! The phone number in a suspicious message may belong to the scammer. Find the official hotline on the back of your bank card or the official website.'
                        }
                      }
                    ]
                  },
                  {
                    speaker: 'system',
                    message: {
                      vi: '📱 Bạn mở app VCB. Không có thông báo bất thường nào. Tài khoản hoàn toàn bình thường.',
                      en: '📱 You open the VCB app. No unusual notifications. Account is completely normal.'
                    },
                    choices: [
                      {
                        label: { vi: 'Báo cáo tin nhắn lừa đảo cho ngân hàng', en: 'Report the scam message to the bank' },
                        outcome: 'good',
                        feedback: {
                          vi: '✅ Xuất sắc! Báo cáo giúp ngân hàng cảnh báo những người dùng khác. Bạn đã hoàn thành đầy đủ quy trình: Verify → phát hiện giả → Decide → báo cáo.',
                          en: '✅ Excellent! Reporting helps the bank warn other users. You completed the full process: Verify → detected fake → Decide → report.'
                        }
                      },
                      {
                        label: { vi: 'Xóa tin nhắn và bỏ qua', en: 'Delete the message and ignore it' },
                        outcome: 'neutral',
                        feedback: {
                          vi: '⚠️ Ổn. Bạn đã tự bảo vệ được mình, nhưng bỏ lỡ cơ hội giúp người khác. Báo cáo tin nhắn lừa đảo giúp ngăn những nạn nhân tiếp theo.',
                          en: '⚠️ Okay. You protected yourself, but missed a chance to help others. Reporting scam messages prevents future victims.'
                        }
                      }
                    ]
                  }
                ]
              } as SandboxBlock
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
          checkpoint: { label: "4.1", questions: [], miniGame: {
            type: 'order-steps' as MiniGameType,
            title: { vi: '🔢 Sắp xếp quy trình Deepfense Check', en: '🔢 Order the Deepfense Check Steps' },
            instruction: { vi: 'Nhấn vào từng bước theo đúng thứ tự của quy trình Deepfense Check. Có 5 bước cần sắp xếp.', en: 'Tap each step in the correct order of the Deepfense Check process. There are 5 steps to arrange.' },
            reward: 3,
            data: {
              steps: [
                { id: 1, label: { vi: 'Pause', en: 'Pause' }, icon: '⏸️', description: { vi: 'Dừng lại 30 giây. Không làm gì ngay — kể cả không chia sẻ, không chuyển tiền, không trả lời.', en: 'Stop for 30 seconds. Do nothing immediately — no sharing, no transfers, no replies.' } },
                { id: 2, label: { vi: 'Observe', en: 'Observe' }, icon: '👁️', description: { vi: 'Quan sát kỹ nội dung: dấu hiệu kỹ thuật, ngôn ngữ thao túng, bối cảnh bất thường.', en: 'Examine carefully: technical artifacts, manipulation language, unusual context.' } },
                { id: 3, label: { vi: 'Verify', en: 'Verify' }, icon: '✅', description: { vi: 'Xác minh danh tính qua kênh độc lập bạn đã biết từ trước — không dùng link hay số trong tin nhắn.', en: 'Verify identity via an independent channel you already know — not links or numbers from the message.' } },
                { id: 4, label: { vi: 'Trace', en: 'Trace' }, icon: '🔍', description: { vi: 'Truy tìm nguồn gốc đầu tiên của nội dung — ai đăng đầu tiên, khi nào, ở đâu.', en: 'Trace the original source — who posted first, when, and where.' } },
                { id: 5, label: { vi: 'Decide', en: 'Decide' }, icon: '🎯', description: { vi: 'Đưa ra quyết định dựa trên thông tin đã kiểm chứng, không dựa trên cảm xúc vội vàng.', en: 'Make a decision based on verified information, not rushed emotions.' } }
              ]
            } as OrderStepsData
          } }
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
          checkpoint: { label: "5.1", questions: [], miniGame: {
            type: 'risk-meter' as MiniGameType,
            title: { vi: '📊 Đánh giá mức độ rủi ro', en: '📊 Risk Meter' },
            instruction: { vi: 'Đọc từng kịch bản và kéo thanh trượt để đánh giá mức rủi ro (1 = Rất thấp → 5 = Rất cao). Sau đó so sánh với đánh giá của chuyên gia.', en: 'Read each scenario and drag the slider to rate the risk level (1 = Very Low → 5 = Very High). Then compare with the expert\'s rating.' },
            reward: 2,
            data: {
              scenarios: [
                {
                  id: 1,
                  text: { vi: 'Video call từ "sếp" yêu cầu chuyển gấp 200 triệu cho đối tác, bảo sẽ giải thích sau, không cần báo kế toán.', en: 'Video call from your "CEO" urgently requesting a 200M VND transfer to a partner, says they\'ll explain later, no need to notify accounting.' },
                  expertRating: 5,
                  explanation: { vi: 'Mức nguy hiểm tối đa: giả danh quyền lực + áp lực thời gian + né quy trình tổ chức + số tiền lớn = dấu hiệu lừa đảo điển hình.', en: 'Maximum risk: authority impersonation + time pressure + bypassing organisational process + large sum = classic scam indicators.' }
                },
                {
                  id: 2,
                  text: { vi: 'Người yêu quen qua mạng 6 tháng (chưa gặp mặt) đột nhiên xin tiền giải quyết "khẩn cấp gia đình".', en: 'An online romantic partner of 6 months (never met in person) suddenly asks for money to handle a "family emergency".' },
                  expertRating: 5,
                  explanation: { vi: 'Đây là "pig butchering scam" — xây dựng niềm tin dài hạn rồi mới ra đòn. Chưa gặp mặt + xin tiền = cờ đỏ cực lớn.', en: 'This is "pig butchering scam" — long-term trust building then the strike. Never met + money request = major red flag.' }
                },
                {
                  id: 3,
                  text: { vi: 'Bạn thân nhờ share link bài viết về sự kiện âm nhạc miễn phí cuối tuần.', en: 'A close friend asks you to share a link about a free music event this weekend.' },
                  expertRating: 2,
                  explanation: { vi: 'Rủi ro thấp hơn nhưng không phải không có: link có thể là phishing, tài khoản bạn bè có thể đã bị hack. Nên kiểm tra link trước khi share.', en: 'Lower risk but not zero: link may be phishing, friend\'s account may be compromised. Still worth checking the link before sharing.' }
                }
              ]
            } as RiskMeterData
          } }
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
          checkpoint: { label: "6.1", questions: [], miniGame: {
            type: 'shield-match' as MiniGameType,
            title: { vi: '🛡️ Ghép lá chắn với tình huống', en: '🛡️ Shield Match' },
            instruction: { vi: 'Nhấn vào một tình huống, sau đó nhấn vào quy tắc phòng vệ phù hợp nhất để ghép đôi. Ghép đúng cả 5 cặp.', en: 'Tap a scenario, then tap the best matching defence rule to pair them. Match all 5 pairs correctly.' },
            reward: 3,
            data: {
              rules: [
                { id: 'family-code', label: { vi: 'Mật mã gia đình', en: 'Family Code' }, icon: '🔑' },
                { id: 'money-delay', label: { vi: 'Trì hoãn 24h', en: 'Money Delay' }, icon: '⏳' },
                { id: 'dual-channel', label: { vi: 'Hai kênh xác minh', en: 'Dual Channel' }, icon: '📱' },
                { id: 'no-shame', label: { vi: 'Báo cáo không xấu hổ', en: 'No Shame Reporting' }, icon: '🗣️' },
                { id: 'evidence-first', label: { vi: 'Lưu bằng chứng trước', en: 'Evidence First' }, icon: '📸' }
              ],
              scenarios: [
                { id: 1, text: { vi: '"Con" gọi video báo bị tai nạn, yêu cầu chuyển tiền gấp mà không để hỏi thêm.', en: 'Your "child" video calls about an accident and demands urgent money before you can ask questions.' }, correctRule: 'family-code', explanation: { vi: 'Hỏi mật mã gia đình đã thỏa thuận trước — kẻ giả mạo không biết đáp án và sẽ bị lộ.', en: 'Ask for the pre-agreed family code — the impostor won\'t know the answer and will be exposed.' } },
                { id: 2, text: { vi: 'Sếp nhắn tin yêu cầu chuyển 50 triệu cho đối tác ngay trước cuộc họp quan trọng.', en: 'Your boss messages asking for a 50M VND transfer to a partner right before an important meeting.' }, correctRule: 'money-delay', explanation: { vi: 'Trì hoãn và xác minh qua kênh khác — áp lực "ngay bây giờ" là dấu hiệu lừa đảo điển hình.', en: 'Delay and verify via another channel — "right now" pressure is a classic scam indicator.' } },
                { id: 3, text: { vi: 'Ngân hàng gửi SMS kèm link "đăng nhập khẩn cấp để bảo vệ tài khoản".', en: 'Your bank sends an SMS with a link to "urgently log in to protect your account".' }, correctRule: 'dual-channel', explanation: { vi: 'Tự gọi tổng đài chính thức của ngân hàng — không dùng link hay số điện thoại từ trong SMS.', en: 'Call the bank\'s official hotline yourself — never use links or phone numbers from the SMS.' } },
                { id: 4, text: { vi: 'Bạn phát hiện ảnh cá nhân của mình bị ghép vào nội dung xấu và lan truyền.', en: 'You discover your personal photo has been placed in inappropriate content and is spreading online.' }, correctRule: 'evidence-first', explanation: { vi: 'Chụp màn hình lưu bằng chứng trước khi báo cáo, chặn kẻ xấu hoặc xóa nội dung — bằng chứng rất quan trọng cho cơ quan chức năng.', en: 'Screenshot and save evidence before reporting, blocking, or deleting — evidence is crucial for authorities.' } },
                { id: 5, text: { vi: 'Người thân bị lừa mất tiền, cảm thấy xấu hổ và muốn im lặng, không muốn ai biết.', en: 'A family member was scammed, feels ashamed and wants to stay silent rather than tell anyone.' }, correctRule: 'no-shame', explanation: { vi: 'Khuyến khích họ báo cáo với ngân hàng và cơ quan chức năng — lừa đảo không phải lỗi của nạn nhân.', en: 'Encourage them to report to the bank and authorities — being scammed is not the victim\'s fault.' } }
              ]
            } as ShieldMatchData
          } }
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
