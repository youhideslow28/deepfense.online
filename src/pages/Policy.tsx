import React from 'react';
import { Link } from 'react-router-dom';
import {
  Database,
  FileText,
  HelpCircle,
  Lock,
  Mail,
  Scale,
  ShieldCheck,
  UserCheck,
} from 'lucide-react';
import { Language } from '@/types';
import { PROJECT_METADATA } from '@/data';

interface PolicyProps {
  lang: Language;
}

const policySections = [
  {
    id: 'scope',
    icon: FileText,
    title: 'Phạm Vi Và Cam Kết Minh Bạch',
    body: [
      'Deepfense là nền tảng giáo dục và huấn luyện cộng đồng về nhận diện deepfake, AI scam và các rủi ro thao túng bằng nội dung số. Website được xây dựng với mục tiêu nâng cao nhận thức, hỗ trợ người dùng tự vệ tốt hơn và cung cấp môi trường học tập có cấu trúc.',
      'Các tính năng như challenge, mô phỏng tình huống, khảo sát, Trung tâm trợ giúp và dashboard quản trị được thiết kế theo nguyên tắc minh bạch, thu thập dữ liệu có mục đích, hạn chế dữ liệu không cần thiết và ưu tiên an toàn cho người dùng.',
      'Deepfense không tự nhận là cơ quan điều tra, cơ quan pháp lý, đơn vị giám định tư pháp hoặc tổ chức có thẩm quyền kết luận tranh chấp. Mọi phân tích, điểm số, cảnh báo hoặc phản hồi từ hệ thống chỉ mang tính hỗ trợ giáo dục, tham khảo và khuyến nghị phòng tránh.',
    ],
  },
  {
    id: 'privacy',
    icon: Lock,
    title: 'Chính Sách Bảo Mật Và Dữ Liệu Cá Nhân',
    body: [
      'Deepfense có thể thu thập một số nhóm dữ liệu cần thiết để vận hành dịch vụ: thông tin tài khoản như email, tên hiển thị; dữ liệu học tập như điểm số, tiến độ, kết quả challenge; dữ liệu khảo sát nếu người dùng tự nguyện tham gia; dữ liệu Trung tâm trợ giúp như mô tả tình huống, đường dẫn, tệp đính kèm; và dữ liệu kỹ thuật như thời gian truy cập, trình duyệt, user agent hoặc log hệ thống.',
      'Dữ liệu được sử dụng để vận hành academy, hiển thị kết quả học tập, cải thiện nội dung đào tạo, phản hồi yêu cầu hỗ trợ, phát hiện spam/lạm dụng, bảo vệ hệ thống và tổng hợp hiểu biết cộng đồng về rủi ro deepfake hoặc AI scam.',
      'Deepfense không bán dữ liệu cá nhân của người dùng. Dữ liệu khảo sát và dữ liệu học tập khi dùng cho mục đích nghiên cứu, báo cáo hoặc cải thiện sản phẩm sẽ được ưu tiên xử lý ở dạng tổng hợp, ẩn danh hoặc giảm định danh khi phù hợp.',
      'Deepfense không sử dụng câu trả lời khảo sát để phân biệt đối xử với cá nhân người dùng. Các chỉ số học tập được dùng để phản hồi tiến độ, đề xuất nội dung phù hợp và đánh giá hiệu quả đào tạo, không nhằm gắn nhãn tiêu cực cho người học.',
    ],
  },
  {
    id: 'terms',
    icon: Scale,
    title: 'Điều Khoản Sử Dụng',
    body: [
      'Người dùng cần sử dụng Deepfense với mục đích học tập, tự bảo vệ và hỗ trợ nâng cao nhận thức an toàn số. Người dùng không được lợi dụng nền tảng để phát tán nội dung gây hại, nội dung xâm phạm quyền riêng tư, nội dung vi phạm bản quyền, dữ liệu cá nhân của người khác khi chưa có quyền phù hợp hoặc tài liệu có thể gây nguy hiểm cho cộng đồng.',
      'Kết quả challenge, mô phỏng, phân tích hoặc phản hồi từ Deepfense không phải là kết luận pháp lý. Người dùng nên tự xác minh qua nhiều nguồn, liên hệ trực tiếp người liên quan qua kênh độc lập và tìm đến cơ quan/chuyên gia phù hợp khi sự việc có rủi ro tài chính, danh dự, an toàn cá nhân hoặc pháp lý.',
      'Deepfense có quyền giới hạn tính năng, khóa tài khoản, ẩn nội dung, xóa nội dung hoặc ghi nhận sự kiện bảo mật khi phát hiện dấu hiệu spam, lạm dụng, truy cập trái phép, gửi liên kết/tệp đáng ngờ, hoặc hành vi có thể gây rủi ro cho hệ thống và cộng đồng.',
      'Khi sử dụng các biểu mẫu gửi thông tin, người dùng chịu trách nhiệm đảm bảo nội dung gửi lên không vi phạm quyền riêng tư, bản quyền, bí mật cá nhân hoặc quy định pháp luật hiện hành.',
    ],
  },
  {
    id: 'help-center',
    icon: HelpCircle,
    title: 'Chính Sách Trung Tâm Trợ Giúp',
    body: [
      'Trung tâm trợ giúp của Deepfense tiếp nhận tình huống nghi ngờ deepfake, AI voice scam, giả mạo danh tính, phishing, lừa đảo, quấy rối, tin sai lệch hoặc các trường hợp liên quan đến an toàn số. Mục tiêu là hỗ trợ người dùng nhận diện dấu hiệu rủi ro và đưa ra khuyến nghị phòng tránh thận trọng.',
      'Deepfense sử dụng ngôn ngữ trung lập khi phản hồi: “có dấu hiệu cần xác minh thêm”, “chưa đủ dữ kiện để kết luận”, “khuyến nghị liên hệ người liên quan qua kênh khác”, “không chuyển tiền hoặc chia sẻ mã OTP/thông tin cá nhân khi chưa xác minh”.',
      'Deepfense không kết luận một cá nhân/tổ chức là “đúng”, “sai”, “có tội” hoặc “lừa đảo” nếu không có thẩm quyền và căn cứ pháp lý phù hợp. Trong các trường hợp nghiêm trọng, người dùng nên lưu bằng chứng, hạn chế lan truyền nội dung nhạy cảm và liên hệ cơ quan chức năng hoặc chuyên gia pháp lý/an ninh mạng.',
      'Các case gửi qua Trung tâm trợ giúp có thể được phân loại theo loại sự việc, mức độ nghiêm trọng, trạng thái xử lý và ghi chú phản hồi. Việc phân loại nhằm ưu tiên xử lý và cải thiện chất lượng hỗ trợ, không nhằm phán xét người gửi hoặc người được nhắc đến trong nội dung.',
    ],
  },
  {
    id: 'security',
    icon: ShieldCheck,
    title: 'Bảo Mật Hệ Thống Và Vận Hành Tin Cậy',
    body: [
      'Deepfense áp dụng mô hình phân quyền user/editor/admin để tách biệt người học, người biên tập nội dung và người quản trị hệ thống. Nguyên tắc thiết kế là cấp quyền vừa đủ, hạn chế truy cập dữ liệu nhạy cảm và ghi nhận các thao tác quan trọng.',
      'Các thao tác như đăng nhập quản trị, đổi role, khóa/mở tài khoản, tạo/sửa challenge, xử lý case, xóa dữ liệu hoặc phản hồi người dùng nên được ghi vào activity log. Các sự kiện như đăng nhập thất bại, truy cập bị từ chối, thay đổi role, gửi liên kết/tệp đáng ngờ hoặc gửi quá nhiều lần trong thời gian ngắn nên được ghi vào security events.',
      'Khi triển khai production, Deepfense nên bật HTTPS/HSTS, cấu hình Content Security Policy, frame-ancestors hoặc X-Frame-Options, giới hạn tốc độ gửi form, kiểm tra tệp tải lên, giới hạn kích thước file và theo dõi các hành vi bất thường.',
      'Deepfense hướng tới mô hình privacy-by-design và security-by-design ở mức phù hợp với một nền tảng giáo dục: bảo vệ người dùng, giảm rủi ro vận hành và giúp người quản trị có đủ dấu vết để xử lý sự cố một cách có trách nhiệm.',
    ],
  },
  {
    id: 'retention',
    icon: Database,
    title: 'Lưu Trữ, Xóa Và Vòng Đời Dữ Liệu',
    body: [
      'Deepfense chỉ nên lưu dữ liệu trong thời gian cần thiết cho mục đích vận hành, học tập, hỗ trợ người dùng, thống kê tổng hợp và bảo vệ hệ thống. Việc lưu trữ không nên kéo dài chỉ vì “có thể cần sau này” nếu không có mục đích rõ ràng.',
      'Khuyến nghị lưu trữ: activity logs từ 90 đến 180 ngày; security events khoảng 180 ngày; Help Center Cases từ 180 đến 365 ngày tùy mức độ; dữ liệu khảo sát ưu tiên giữ ở dạng tổng hợp hoặc ẩn danh; kết quả challenge có thể giữ theo tài khoản để phục vụ tiến độ học tập.',
      'Khi xóa Help Center Case có tệp đính kèm, cần xóa cả document trong Firestore và file liên quan trong Storage để tránh rò rỉ dữ liệu. Khi xóa tài khoản hoặc dữ liệu cá nhân, hệ thống cần cân nhắc điều kiện kỹ thuật, yêu cầu bảo mật, nghĩa vụ pháp lý và quyền lợi chính đáng của người dùng.',
      'Người dùng có thể yêu cầu xem, chỉnh sửa hoặc xóa dữ liệu cá nhân của mình nếu phù hợp với điều kiện kỹ thuật và pháp lý. Deepfense sẽ xử lý yêu cầu theo khả năng vận hành thực tế và theo nguyên tắc tôn trọng quyền riêng tư.',
    ],
  },
  {
    id: 'access',
    icon: UserCheck,
    title: 'Phân Quyền Nội Bộ Và Trách Nhiệm Quản Trị',
    body: [
      'User là người học/người chơi bình thường, có quyền xem tiến độ, điểm số, kết quả của chính mình, tham gia challenge, gửi khảo sát nếu đồng ý và gửi yêu cầu qua Trung tâm trợ giúp.',
      'Editor là thành viên phụ trách nội dung, có thể tạo/sửa lesson, challenge, explanation, skill tags và difficulty. Editor không nên có quyền xóa user, đổi role, xem dữ liệu nhạy cảm không cần thiết hoặc xóa log hệ thống.',
      'Admin chịu trách nhiệm quản trị user, role, trạng thái tài khoản, Help Center Cases, Content Studio, Activity Log và Security Events. Mọi thao tác quản trị quan trọng nên có dấu vết rõ ràng để đảm bảo tính minh bạch và trách nhiệm giải trình.',
      'Deepfense ưu tiên mô hình least privilege: mỗi vai trò chỉ có quyền cần thiết để hoàn thành nhiệm vụ. Điều này giúp giảm rủi ro lộ dữ liệu, thao tác nhầm hoặc lạm quyền trong quá trình vận hành.',
    ],
  },
  {
    id: 'content',
    icon: FileText,
    title: 'Chính Sách Nội Dung Và Challenge',
    body: [
      'Nội dung đào tạo của Deepfense cần hướng tới giáo dục, phòng tránh và nâng cao năng lực xác minh thông tin. Challenge nên giải thích rõ dấu hiệu nhận diện, lý do đáp án và bước kiểm chứng an toàn sau khi người dùng trả lời.',
      'Deepfense không nên sử dụng hình ảnh, video, giọng nói hoặc dữ liệu cá nhân của người thật nếu chưa có quyền phù hợp. Nội dung nhạy cảm, nội dung có khả năng gây hiểu nhầm hoặc ảnh hưởng danh dự cá nhân cần được xem xét kỹ trước khi công bố.',
      'Các challenge có độ khó cao, liên quan đến tài chính, giả mạo danh tính, quấy rối, tin sai lệch hoặc nội dung dễ lan truyền nên được admin review trước khi chuyển sang trạng thái published.',
      'Ngôn ngữ trong nội dung cần tránh phán xét pháp lý. Thay vì khẳng định tuyệt đối, Deepfense ưu tiên cách diễn đạt như “dấu hiệu rủi ro”, “cần xác minh thêm”, “khuyến nghị kiểm tra nguồn gốc” và “không chia sẻ thông tin nhạy cảm khi chưa chắc chắn”.',
    ],
  },
];

const trustHighlights = [
  'Không bán dữ liệu cá nhân',
  'Thu thập dữ liệu có mục đích rõ ràng',
  'Ưu tiên tổng hợp hoặc ẩn danh khi phân tích',
  'Phân quyền user/editor/admin',
  'Ghi log thao tác quản trị quan trọng',
  'Phản hồi Help Center bằng ngôn ngữ trung lập',
];

const Policy: React.FC<PolicyProps> = ({ lang }) => {
  const isVi = lang === 'vi';

  return (
    <div className="mx-auto max-w-6xl animate-in fade-in">
      <section className="rounded-lg border border-white/10 bg-[#07111f]/95 p-6 shadow-2xl shadow-black/30 md:p-8">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-primary/25 bg-primary/10 px-3 py-1.5 text-xs font-bold uppercase tracking-[0.12em] text-blue-200">
              <FileText size={14} />
              Trung Tâm Chính Sách & Niềm Tin
            </div>
            <h1 className="font-display text-3xl font-black text-white md:text-5xl">
              {isVi ? 'Chính Sách Deepfense' : 'Deepfense Policies'}
            </h1>
            <p className="mt-4 max-w-3xl text-sm leading-7 text-slate-300/85 md:text-base">
              {isVi
                ? 'Deepfense công bố các chính sách này để người dùng hiểu rõ cách nền tảng thu thập dữ liệu, bảo vệ quyền riêng tư, xử lý yêu cầu hỗ trợ, quản trị nội dung và vận hành hệ thống một cách có trách nhiệm.'
                : 'Deepfense publishes these policies so users can understand how the platform handles privacy, data, support cases, content governance, and responsible operations.'}
            </p>
          </div>
          <div className="rounded-lg border border-white/10 bg-black/30 p-4 text-xs leading-relaxed text-slate-400">
            <p className="font-mono font-bold uppercase tracking-[0.12em] text-slate-200">{isVi ? 'Cập nhật' : 'Updated'}</p>
            <p className="mt-1">Tháng 5, 2026</p>
            <p className="mt-3 text-slate-300">{PROJECT_METADATA.university}</p>
          </div>
        </div>
      </section>

      <section className="mt-5 rounded-lg border border-primary/20 bg-primary/10 p-5">
        <h2 className="font-black text-white">Cam Kết Tin Cậy</h2>
        <div className="mt-4 grid gap-3 md:grid-cols-2 lg:grid-cols-3">
          {trustHighlights.map((item) => (
            <div key={item} className="flex items-center gap-3 rounded-lg border border-white/10 bg-black/30 p-3 text-sm font-bold text-slate-200">
              <ShieldCheck className="shrink-0 text-emerald-300" size={17} />
              {item}
            </div>
          ))}
        </div>
      </section>

      <div className="mt-5 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {policySections.map((section) => {
          const Icon = section.icon;
          return (
            <a key={section.id} href={`#${section.id}`} className="rounded-lg border border-white/10 bg-white/[0.035] p-4 text-sm font-bold text-slate-300 transition-colors hover:border-primary/40 hover:bg-white/[0.055] hover:text-white">
              <Icon className="mb-3 text-primary" size={20} />
              {section.title}
            </a>
          );
        })}
      </div>

      <div className="mt-6 space-y-5">
        {policySections.map((section) => {
          const Icon = section.icon;
          return (
            <section id={section.id} key={section.id} className="scroll-mt-28 rounded-lg border border-white/10 bg-[#07111f]/95 p-6">
              <div className="mb-4 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-primary/25 bg-primary/10 text-primary">
                  <Icon size={20} />
                </div>
                <h2 className="text-xl font-black text-white">{section.title}</h2>
              </div>
              <div className="space-y-3 text-sm leading-7 text-slate-300/85">
                {section.body.map((item) => <p key={item}>{item}</p>)}
              </div>
            </section>
          );
        })}
      </div>

      <section className="mt-6 rounded-lg border border-primary/20 bg-primary/10 p-6">
        <h2 className="font-black text-white">Liên Hệ Về Chính Sách</h2>
        <p className="mt-2 text-sm leading-7 text-slate-300">
          Mọi câu hỏi về dữ liệu cá nhân, bảo mật, quyền người dùng, Trung tâm trợ giúp hoặc yêu cầu xem/sửa/xóa dữ liệu có thể gửi qua kênh liên hệ chính thức của Deepfense. Khi gửi yêu cầu, người dùng nên cung cấp email tài khoản, nội dung yêu cầu và thông tin cần thiết để nhóm vận hành xác minh hợp lý.
        </p>
        <div className="mt-4 flex flex-wrap gap-3">
          <a href={`mailto:${PROJECT_METADATA.email}`} className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-3 text-sm font-bold text-white hover:bg-blue-500">
            <Mail size={16} /> {PROJECT_METADATA.email}
          </a>
          <Link to="/contact" className="inline-flex items-center gap-2 rounded-lg border border-white/10 px-4 py-3 text-sm font-bold text-slate-300 hover:border-primary hover:text-white">
            Mở trang liên hệ
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Policy;
