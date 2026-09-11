import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { useLocation } from 'react-router-dom';
import {
  ShieldAlert,
  FileText,
  HeartHandshake,
  AlertTriangle,
  CheckCircle2,
  Lock,
  ShieldCheck,
  Globe,
  Phone,
  ExternalLink,
  Search,
  Scale,
  UserRound,
  Building2,
  ReceiptText,
  Copy,
  RotateCcw,
  Sparkles,
  Printer
} from 'lucide-react';
import { Language } from '@/types';
import { TRANSLATIONS } from '@/data';

interface CrisisHubProps {
  lang: Language;
}

type CrisisTab = 'report' | 'first-aid';

export type ReportFormData = {
  fullName: string;
  birthYear: string;
  gender: string;
  idNumber: string;
  idDate: string;
  idPlace: string;
  permanentAddress: string;
  currentAddress: string;
  phone: string;
  email: string;
  authority: string;
  reportPlace: string;
  reportDate: string;
  suspectInfo: string;
  bankAccount: string;
  lossAmount: string;
  lossAmountWords: string;
  description: string;
  evidenceList: string;
};

// Chuyển đổi số tiền VND sang chữ chuẩn hành chính Việt Nam
const digits = ['không', 'một', 'hai', 'ba', 'bốn', 'năm', 'sáu', 'bảy', 'tám', 'chín'];

function readThreeDigits(n: number, readZeroHundreds: boolean): string {
  const h = Math.floor(n / 100);
  const t = Math.floor((n % 100) / 10);
  const u = n % 10;
  let res = '';
  if (h > 0 || readZeroHundreds) {
    res += digits[h] + ' trăm ';
  }
  if (t > 1) {
    res += digits[t] + ' mươi ';
    if (u === 1) res += 'mốt ';
    else if (u === 5) res += 'lăm ';
    else if (u > 0) res += digits[u] + ' ';
  } else if (t === 1) {
    res += 'mười ';
    if (u === 5) res += 'lăm ';
    else if (u > 0) res += digits[u] + ' ';
  } else if (u > 0) {
    if (h > 0 || readZeroHundreds) res += 'lẻ ';
    if (u === 5 && (h > 0 || readZeroHundreds)) res += 'năm ';
    else res += digits[u] + ' ';
  }
  return res.trim();
}

function convertVNDToWords(amountInput: string): string {
  const clean = String(amountInput).replace(/\D/g, '');
  const n = parseInt(clean, 10);
  if (isNaN(n) || n === 0) return '';
  const units = ['', 'nghìn', 'triệu', 'tỷ', 'nghìn tỷ', 'triệu tỷ'];
  const groups: number[] = [];
  let temp = n;
  while (temp > 0) {
    groups.push(temp % 1000);
    temp = Math.floor(temp / 1000);
  }
  const parts: string[] = [];
  for (let i = groups.length - 1; i >= 0; i--) {
    const grp = groups[i];
    if (grp > 0) {
      const read = readThreeDigits(grp, i < groups.length - 1);
      parts.push(read + ' ' + units[i]);
    }
  }
  const result = parts.join(' ').trim().replace(/\s+/g, ' ');
  if (!result) return '';
  return result.charAt(0).toUpperCase() + result.slice(1) + ' đồng chẵn';
}

function getTodayVietnameseDate(): { place: string; dateStr: string } {
  const now = new Date();
  const day = String(now.getDate()).padStart(2, '0');
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const year = now.getFullYear();
  return {
    place: 'Hà Nội',
    dateStr: `ngày ${day} tháng ${month} năm ${year}`
  };
}

const todayInfo = getTodayVietnameseDate();

const initialReportForm: ReportFormData = {
  fullName: '',
  birthYear: '',
  gender: 'Nam',
  idNumber: '',
  idDate: '',
  idPlace: 'Cục Cảnh sát QLHC về TTXH',
  permanentAddress: '',
  currentAddress: '',
  phone: '',
  email: '',
  authority: 'Công an xã/phường nơi cư trú hoặc nơi xảy ra sự việc',
  reportPlace: todayInfo.place,
  reportDate: todayInfo.dateStr,
  suspectInfo: '',
  bankAccount: '',
  lossAmount: '',
  lossAmountWords: '',
  description: '',
  evidenceList: '1. Bản sao Căn cước công dân của người làm đơn (01 bản);\n2. Bản in sao kê tài khoản ngân hàng thể hiện các giao dịch chuyển tiền;\n3. Bản in ảnh chụp tin nhắn, thông tin liên lạc với đối tượng lừa đảo;\n4. Các tài liệu, chứng cứ điện tử liên quan khác.'
};

const sampleReportForm: ReportFormData = {
  fullName: 'TRẦN THỊ MAI',
  birthYear: '15/08/1988',
  gender: 'Nữ',
  idNumber: '001188012345',
  idDate: '12/04/2021',
  idPlace: 'Cục Cảnh sát QLHC về TTXH',
  permanentAddress: 'Số 12, ngõ 45 đường Trần Hưng Đạo, phường Hàng Bài, TP. Hà Nội',
  currentAddress: 'Số 12, ngõ 45 đường Trần Hưng Đạo, phường Hàng Bài, TP. Hà Nội',
  phone: '0912 345 678',
  email: 'tranmai88@gmail.com',
  authority: 'Công an phường Hàng Bài, Công an thành phố Hà Nội',
  reportPlace: 'Hà Nội',
  reportDate: todayInfo.dateStr,
  suspectInfo: 'Đối tượng sử dụng tài khoản Zalo "Trần Quốc Tuấn (Tuyển Dụng)", số điện thoại: 0868 912 345, nhóm Telegram "Xử lý đơn hàng Shopee 2026"',
  bankAccount: 'STK 1029384756 tại Ngân hàng TMCP Quân Đội (MB Bank), Chủ tài khoản: NGUYEN VAN THANG',
  lossAmount: '68.500.000',
  lossAmountWords: 'Sáu mươi tám triệu năm trăm nghìn đồng chẵn',
  description: 'Vào ngày 05/09/2026, đối tượng sử dụng tài khoản Zalo tự xưng là nhân viên tuyển dụng, mời tôi tham gia làm cộng tác viên xử lý đơn hàng online nhận hoa hồng 10-15%. Ban đầu, đối tượng yêu cầu chuyển các đơn nhỏ (500.000đ và 2.000.000đ) và đã hoàn trả cả gốc lẫn hoa hồng để tạo sự tin tưởng.\n\nĐến ngày 06/09/2026, đối tượng yêu cầu tôi làm đơn nhiệm vụ VIP với số tiền lớn hơn. Tôi đã thực hiện liên tiếp 3 giao dịch chuyển khoản với tổng số tiền 68.500.000 đồng vào tài khoản MB Bank số 1029384756 mang tên NGUYEN VAN THANG. Sau khi chuyển đủ tiền, đối tượng viện lý do "sai cú pháp" và tiếp tục yêu cầu tôi nộp thêm 50.000.000 đồng để mở khóa tài khoản. Nhận thấy có dấu hiệu lừa đảo chiếm đoạt tài sản, tôi đã dừng chuyển tiền và làm đơn này tố giác.',
  evidenceList: '1. Bản sao Căn cước công dân của người làm đơn (01 bản);\n2. Bản in sao kê ngân hàng thể hiện 03 giao dịch chuyển khoản tổng 68.500.000đ (03 trang);\n3. Bản in ảnh chụp toàn bộ tin nhắn Zalo trao đổi với đối tượng (15 trang);\n4. Thông tin tài khoản ngân hàng và số điện thoại đối tượng sử dụng.'
};

const commonAuthorities = [
  'Công an xã/phường nơi cư trú hoặc xảy ra sự việc',
  'Cơ quan Cảnh sát điều tra - Công an cấp tỉnh',
  'Phòng An ninh mạng & Phòng chống tội phạm công nghệ cao (PA05) - Công an cấp tỉnh'
];

const fieldClass = 'w-full bg-white dark:bg-black/60 border border-black/15 dark:border-white/15 rounded-lg px-3 py-2 text-sm text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 transition-colors';
const textAreaClass = `${fieldClass} leading-relaxed resize-y`;

const FieldLabel: React.FC<{ children: React.ReactNode; required?: boolean; hint?: string }> = ({ children, required, hint }) => (
  <label className="block text-slate-700 dark:text-slate-300 text-xs font-bold uppercase tracking-wider mb-1">
    {children} {required && <span className="text-red-500 font-bold">*</span>}
    {hint && <span className="block normal-case tracking-normal font-normal text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">{hint}</span>}
  </label>
);

const DocumentBody: React.FC<{ formData: ReportFormData }> = ({ formData }) => (
  <div className="text-black font-serif text-[11pt] sm:text-[11.5pt] leading-[1.32]">
    {/* QUỐC HIỆU & TIÊU NGỮ */}
    <div className="text-center print-avoid-break mb-2">
      <h2 className="text-[12pt] font-bold uppercase tracking-wider text-black">
        CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM
      </h2>
      <h3 className="text-[12.5pt] font-bold text-black mt-0.5">
        Độc lập - Tự do - Hạnh phúc
      </h3>
      <div className="w-32 mx-auto border-b border-black mt-1" />
    </div>

    {/* ĐỊA DANH & NGÀY THÁNG */}
    <div className="text-right italic print-avoid-break mb-1.5 text-[11pt] text-black">
      {formData.reportPlace || '...'}, {formData.reportDate || 'ngày ... tháng ... năm 20...'}
    </div>

    {/* TIÊU ĐỀ ĐƠN */}
    <div className="text-center print-avoid-break mb-2">
      <h1 className="text-[14pt] font-bold uppercase text-black">
        ĐƠN TỐ GIÁC TỘI PHẠM
      </h1>
      <p className="italic text-[11pt] text-black mt-0.5">
        (V/v: Hành vi lừa đảo chiếm đoạt tài sản trên không gian mạng)
      </p>
    </div>

    {/* KÍNH GỬI */}
    <div className="mb-2 font-bold print-avoid-break pl-4 text-black">
      <p>Kính gửi: <span className="uppercase">{formData.authority || 'CÔNG AN CẤP XÃ / CƠ QUAN CẢNH SÁT ĐIỀU TRA CÔNG AN CẤP TỈNH'}</span></p>
    </div>

    {/* THÂN ĐƠN */}
    <div className="space-y-1.5 text-justify">
      {/* I. NGƯỜI TỐ GIÁC */}
      <div className="print-avoid-break">
        <p className="font-bold uppercase text-black mb-1">I. THÔNG TIN NGƯỜI TỐ GIÁC:</p>
        <div className="space-y-0.5 pl-4">
          <p>Họ và tên: <span className="font-bold uppercase">{formData.fullName || '...........................................................................'}</span></p>
          <p>
            Sinh ngày: {formData.birthYear || '........................'} &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            Giới tính: {formData.gender || '.........'}
          </p>
          <p>
            CCCD/CMND số: <span className="font-bold">{formData.idNumber || '............................'}</span> &nbsp;&nbsp;&nbsp;
            Cấp ngày: {formData.idDate || '..../..../........'} &nbsp;&nbsp;&nbsp;
            Nơi cấp: {formData.idPlace || '...................................'}
          </p>
          <p>Nơi đăng ký hộ khẩu thường trú: {formData.permanentAddress || '....................................................................................................'}</p>
          <p>Nơi ở hiện nay (nơi liên hệ): {formData.currentAddress || '....................................................................................................'}</p>
          <p>
            Số điện thoại liên hệ: <span className="font-bold">{formData.phone || '................................'}</span> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            Email (nếu có): {formData.email || '................................'}
          </p>
        </div>
      </div>

      {/* II. ĐỐI TƯỢNG BỊ TỐ GIÁC */}
      <div className="print-avoid-break pt-1">
        <p className="font-bold uppercase text-black mb-1">II. THÔNG TIN ĐỐI TƯỢNG BỊ TỐ GIÁC:</p>
        <p className="indent-6 leading-relaxed">
          Tôi làm đơn này tố giác hành vi có dấu hiệu tội phạm "Lừa đảo chiếm đoạt tài sản" (theo quy định tại Điều 174 Bộ luật Hình sự nước Cộng hòa xã hội chủ nghĩa Việt Nam) của đối tượng/các đối tượng sau:
        </p>
        <div className="space-y-0.5 pl-4 mt-0.5">
          <p>
            - <span className="font-semibold">Thông tin nhận diện đối tượng:</span> {formData.suspectInfo || '(Tên tài khoản Zalo, Facebook, Telegram, SĐT hoặc đặc điểm nhận diện)'}
          </p>
          <p>
            - <span className="font-semibold">Tài khoản ngân hàng nhận tiền:</span> {formData.bankAccount || '(Số tài khoản, Tên ngân hàng, Họ tên chủ tài khoản thụ hưởng)'}
          </p>
        </div>
      </div>

      {/* III. NỘI DUNG SỰ VIỆC */}
      <div className="pt-1">
        <p className="font-bold uppercase text-black mb-1">III. NỘI DUNG SỰ VIỆC VÀ HÀNH VI VI PHẠM:</p>
        <div className="whitespace-pre-line indent-6 leading-relaxed text-slate-800">
          {formData.description || 'Vào thời gian từ ngày ... đến ngày ..., đối tượng nêu trên đã chủ động tiếp cận tôi qua phương tiện không gian mạng và sử dụng các thủ đoạn gian dối nhằm chiếm đoạt tài sản... (Nội dung chi tiết do người làm đơn tự điền)'}
        </div>
      </div>

      {/* IV. HẬU QUẢ THIỆT HẠI */}
      <div className="print-avoid-break pt-1">
        <p className="font-bold uppercase text-black mb-1">IV. HẬU QUẢ THIỆT HẠI:</p>
        <div className="pl-4 space-y-0.5">
          <p>
            Tổng số tiền bị các đối tượng lừa đảo chiếm đoạt là: <span className="font-bold">{formData.lossAmount || '........................'}</span> đồng.
          </p>
          <p className="italic">
            (Bằng chữ: {formData.lossAmountWords || '....................................................................................................'}).
          </p>
        </div>
      </div>

      {/* V. YÊU CẦU GIẢI QUYẾT */}
      <div className="print-avoid-break pt-1">
        <p className="font-bold uppercase text-black mb-1">V. YÊU CẦU GIẢI QUYẾT:</p>
        <p className="indent-6 leading-relaxed mb-0.5">
          Căn cứ quy định tại Điều 144, Điều 145 Bộ luật Tố tụng hình sự năm 2015 và các quy định pháp luật liên quan, nhằm bảo vệ quyền và lợi ích hợp pháp của công dân, tôi kính đề nghị Quý Cơ quan:
        </p>
        <div className="pl-4 space-y-0.5 text-slate-900">
          <p>1. Tiếp nhận đơn tố giác tội phạm, tiến hành kiểm tra, xác minh nguồn tin và khởi tố vụ án hình sự để điều tra theo đúng thẩm quyền;</p>
          <p>2. Kịp thời áp dụng các biện pháp ngăn chặn, phối hợp với các tổ chức tín dụng phong tỏa tài khoản ngân hàng thụ hưởng nêu trên nhằm ngăn chặn tẩu tán tài sản và thu hồi tiền bị chiếm đoạt trả lại cho người bị hại;</p>
          <p>3. Xác minh, truy tìm và xử lý nghiêm minh các đối tượng vi phạm theo đúng quy định của pháp luật;</p>
          <p>4. Giữ bí mật thông tin cá nhân của người làm đơn theo quy định pháp luật.</p>
        </div>
      </div>

      {/* VI. CHỨNG CỨ GỬI KÈM */}
      <div className="print-avoid-break pt-1">
        <p className="font-bold uppercase text-black mb-1">VI. TÀI LIỆU, CHỨNG CỨ GỬI KÈM ĐƠN:</p>
        <div className="whitespace-pre-line pl-4 text-slate-900 leading-relaxed">
          {formData.evidenceList || '1. Bản sao CCCD của người làm đơn;\n2. Sao kê giao dịch ngân hàng;\n3. Ảnh chụp tin nhắn chứng cứ.'}
        </div>
      </div>

      {/* LỜI CAM ĐOAN VÀ CHỮ KÝ (LIỀN MẠCH, KHÔNG BỊ TÁCH TRANG) */}
      <div className="print-avoid-break pt-2">
        <p className="indent-6 leading-relaxed">
          Tôi xin cam đoan toàn bộ nội dung trình bày trên đây và các tài liệu chứng cứ kèm theo là hoàn toàn đúng sự thật. Tôi không cố ý vu khống hay báo tin sai sự thật và xin chịu hoàn toàn mọi trách nhiệm trước pháp luật về nội dung tố giác này.
        </p>
        <p className="indent-6 leading-relaxed mt-0.5">
          Kính mong Quý Cơ quan sớm xem xét và giải quyết theo đúng trình tự luật định. Tôi xin chân thành cảm ơn!
        </p>

        {/* PHẦN CHỮ KÝ */}
        <div className="pt-2 flex justify-end">
          <div className="text-center min-w-[220px]">
            <p className="font-bold uppercase text-black text-[11.5pt]">NGƯỜI LÀM ĐƠN</p>
            <p className="italic text-[10.5pt] text-slate-600 mt-0.5">(Ký và ghi rõ họ tên)</p>
            <div className="h-8" />
            <p className="font-bold uppercase text-black text-[11.5pt]">
              {formData.fullName || ''}
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
);

const CrisisHub: React.FC<CrisisHubProps> = ({ lang }) => {
  const t = TRANSLATIONS[lang];
  const location = useLocation();
  const [activeTab, setActiveTab] = useState<CrisisTab>('first-aid');
  const [formData, setFormData] = useState<ReportFormData>(initialReportForm);
  const [copied, setCopied] = useState(false);

  const handleTabChange = (tab: CrisisTab) => {
    setActiveTab(tab);
    requestAnimationFrame(() => {
      window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
    });
  };

  useEffect(() => {
    if (location.state?.subTab === 'report' || location.state?.subTab === 'first-aid') {
      handleTabChange(location.state.subTab);
    }
  }, [location.state]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    if (name === 'lossAmount') {
      const words = convertVNDToWords(value);
      setFormData((prev) => ({
        ...prev,
        lossAmount: value,
        lossAmountWords: words || prev.lossAmountWords
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleApplySample = () => {
    setFormData(sampleReportForm);
  };

  const handleResetForm = () => {
    setFormData(initialReportForm);
  };

  const handlePrintPdf = () => {
    const originalTitle = document.title;
    document.title = ' ';
    const restore = () => {
      document.title = originalTitle;
      window.removeEventListener('afterprint', restore);
    };
    window.addEventListener('afterprint', restore);
    window.print();
    setTimeout(restore, 1500);
  };

  const generatePlainTextReport = (): string => {
    return `CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM
Độc lập - Tự do - Hạnh phúc
---------------------------
${formData.reportPlace || '...'}, ${formData.reportDate || 'ngày ... tháng ... năm ...'}

ĐƠN TỐ GIÁC TỘI PHẠM
(V/v: Hành vi lừa đảo chiếm đoạt tài sản trên không gian mạng)

Kính gửi: ${formData.authority || 'Công an cấp xã / Cơ quan Cảnh sát điều tra Công an cấp tỉnh'}

I. THÔNG TIN NGƯỜI TỐ GIÁC:
- Họ và tên: ${formData.fullName.toUpperCase() || '...................................................'}
- Sinh ngày / Năm sinh: ${formData.birthYear || '................'}    Giới tính: ${formData.gender || '......'}
- Số CCCD/CMND: ${formData.idNumber || '........................'}    Ngày cấp: ${formData.idDate || '..../..../........'}    Nơi cấp: ${formData.idPlace || '........................'}
- Nơi đăng ký thường trú: ${formData.permanentAddress || '...........................................................................'}
- Nơi ở hiện nay: ${formData.currentAddress || '...........................................................................'}
- Điện thoại liên hệ: ${formData.phone || '........................'}    Email: ${formData.email || '........................'}

II. THÔNG TIN ĐỐI TƯỢNG BỊ TỐ GIÁC:
- Thông tin nhận diện/Tài khoản đối tượng: ${formData.suspectInfo || '...........................................................................'}
- Tài khoản ngân hàng nhận tiền: ${formData.bankAccount || '...........................................................................'}

III. NỘI DUNG SỰ VIỆC VÀ HÀNH VI VI PHẠM:
${formData.description || '(Trình bày diễn biến vụ việc theo thời gian, thủ đoạn lừa đảo và các lần chuyển tiền)'}

IV. HẬU QUẢ THIỆT HẠI:
Tổng số tiền bị chiếm đoạt: ${formData.lossAmount || '................'} đồng
(Bằng chữ: ${formData.lossAmountWords || '...........................................................................'}).

V. YÊU CẦU GIẢI QUYẾT:
Căn cứ các quy định của Bộ luật Tố tụng hình sự và Bộ luật Hình sự nước Cộng hòa xã hội chủ nghĩa Việt Nam, tôi làm đơn này kính đề nghị Quý Cơ quan:
1. Tiếp nhận đơn tố giác tội phạm, tiến hành kiểm tra, xác minh và khởi tố vụ án hình sự theo quy định của pháp luật;
2. Kịp thời áp dụng các biện pháp ngăn chặn, phối hợp với các tổ chức tín dụng phong tỏa tài khoản thụ hưởng để thu hồi tài sản bị chiếm đoạt;
3. Điều tra, truy tìm và xử lý nghiêm minh các đối tượng có hành vi lừa đảo chiếm đoạt tài sản;
4. Bảo vệ bí mật thông tin cá nhân của người làm đơn theo quy định pháp luật.

VI. TÀI LIỆU, CHỨNG CỨ KÈM THEO:
${formData.evidenceList || '1. Bản sao CCCD của người làm đơn;\n2. Sao kê giao dịch ngân hàng;\n3. Ảnh chụp tin nhắn với đối tượng.'}

LỜI CAM ĐOAN:
Tôi xin cam đoan những nội dung trình bày trên là hoàn toàn đúng sự thật và xin chịu trách nhiệm trước pháp luật về những thông tin, tài liệu đã cung cấp.

Kính mong Quý Cơ quan sớm xem xét, giải quyết.
Tôi xin chân thành cảm ơn!

                                                                 NGƯỜI LÀM ĐƠN
                                                              (Ký và ghi rõ họ tên)


                                                                 ${formData.fullName.toUpperCase() || ''}
`;
  };

  const handleCopyText = async () => {
    try {
      const text = generatePlainTextReport();
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      // ignore
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500 pb-16">
      {/* GLOBAL PRINT STYLESHEET (DIRECT BODY PORTAL ISOLATION) */}
      <style dangerouslySetInnerHTML={{__html: `
        @page {
          size: A4 portrait;
          margin: 0 !important;
        }
        @media screen {
          #deepfense-print-root {
            display: none !important;
          }
        }
        @media print {
          html, body {
            background: #ffffff !important;
            color: #000000 !important;
            margin: 0 !important;
            padding: 0 !important;
            height: auto !important;
            overflow: visible !important;
          }
          #root {
            display: none !important;
          }
          #deepfense-print-root {
            display: block !important;
            position: static !important;
            width: 100% !important;
            margin: 0 !important;
            padding: 14mm 15mm 14mm 20mm !important; /* Top Right Bottom Left chuẩn Nghị định 30/2020/NĐ-CP */
            box-sizing: border-box !important;
            background: #ffffff !important;
            color: #000000 !important;
            font-family: "Times New Roman", Times, "Liberation Serif", serif !important;
            font-size: 11pt !important;
            line-height: 1.3 !important;
          }
          #deepfense-print-root * {
            visibility: visible !important;
          }
          .print-avoid-break {
            break-inside: avoid !important;
            page-break-inside: avoid !important;
          }
        }
      `}}/>

      {/* DIRECT BODY PRINT PORTAL: Completely bypasses #root padding, navbar, transforms */}
      {typeof document !== 'undefined' && createPortal(
        <div id="deepfense-print-root">
          <DocumentBody formData={formData} />
        </div>,
        document.body
      )}

      {/* HEADER TỔNG */}
      <div className="border-l-4 border-red-500 pl-4 mb-8">
        <h1 className="text-3xl md:text-4xl font-black text-slate-900 dark:text-white uppercase tracking-wider mb-2 flex items-center gap-3">
          <ShieldAlert className="text-red-500 shrink-0" size={36} />
          {t.crisis_title}
        </h1>
        <p className="text-slate-600 dark:text-slate-300 max-w-2xl text-sm leading-relaxed">
          {t.crisis_desc}
        </p>
      </div>

      {/* TABS CONTROLLER */}
      <div className="flex flex-wrap gap-4 border-b border-black/10 dark:border-white/10 pb-4">
        <button
          onClick={() => handleTabChange('first-aid')}
          className={`px-6 py-3 rounded-xl font-bold uppercase tracking-[0.12em] text-sm transition-all focus:outline-none flex items-center gap-2 ${activeTab === 'first-aid' ? 'bg-blue-500/20 text-blue-600 dark:text-blue-200 border border-blue-500/50 shadow-sm' : 'bg-white/70 dark:bg-black/40 text-slate-600 dark:text-slate-300 border border-black/10 dark:border-white/10 hover:border-white/30 hover:text-slate-900 dark:text-white'}`}
        >
          <HeartHandshake size={18} />
          {t.btn_first_aid}
        </button>
        <button
          onClick={() => handleTabChange('report')}
          className={`px-6 py-3 rounded-xl font-bold uppercase tracking-[0.12em] text-sm transition-all focus:outline-none flex items-center gap-2 ${activeTab === 'report' ? 'bg-red-500/20 text-red-600 dark:text-red-200 border border-red-500/50 shadow-sm' : 'bg-white/70 dark:bg-black/40 text-slate-600 dark:text-slate-300 border border-black/10 dark:border-white/10 hover:border-white/30 hover:text-slate-900 dark:text-white'}`}
        >
          <FileText size={18} />
          {t.btn_report_pdf}
        </button>
      </div>

      <div key={activeTab} className="tab-panel-reveal tab-copy-reveal mt-8">
        {/* TAB 1: SƠ CỨU TÂM LÝ & ĐƯỜNG DÂY NÓNG */}
        {activeTab === 'first-aid' && (
           <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-blue-50/80 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-500/30 p-8 rounded-2xl backdrop-blur-md shadow-sm">
                <HeartHandshake className="text-blue-600 dark:text-blue-400 mb-6" size={48} />
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
                  {lang === 'vi' ? 'Bạn không đơn độc. Đây không phải lỗi của bạn.' : 'You are not alone. This is not your fault.'}
                </h2>
                <p className="text-slate-700 dark:text-gray-300 mb-6 leading-relaxed">
                  {lang === 'vi'
                    ? 'Tội phạm lừa đảo công nghệ cao sử dụng những kịch bản tâm lý tinh vi, công nghệ Deepfake và thủ đoạn dồn ép khiến nạn nhân hoảng loạn. Bị lừa đảo là một sự cố ngoài ý muốn, điều quan trọng nhất bây giờ là bình tĩnh và thực hiện ngay các biện pháp giảm thiểu thiệt hại.'
                    : 'Cyber criminals use sophisticated psychological manipulation, Deepfake technology, and urgency traps to induce panic. Being scammed is an accident; what matters most now is staying calm and acting immediately to minimize loss.'}
                </p>

                <div className="space-y-4">
                   <div className="bg-white dark:bg-black/50 p-4 rounded-xl border-l-4 border-blue-500 shadow-sm border border-black/5 dark:border-white/5">
                     <h3 className="font-bold text-blue-600 dark:text-blue-400 mb-1">{lang === 'vi' ? '1. Dừng mọi liên lạc ngay lập tức' : '1. Stop all contact immediately'}</h3>
                     <p className="text-sm text-slate-600 dark:text-slate-300/85">
                        {lang === 'vi' ? 'Tuyệt đối không tranh cãi và không chuyển thêm bất kỳ khoản tiền nào với lý do "mở khóa", "nộp phạt", "thuế" hay "phí bảo hiểm". Cắt đứt liên lạc với đối tượng.' : 'Do not argue and do not transfer any more money for "unlock fees" or "taxes". Cut off contact immediately.'}
                     </p>
                   </div>
                   <div className="bg-white dark:bg-black/50 p-4 rounded-xl border-l-4 border-emerald-500 shadow-sm border border-black/5 dark:border-white/5">
                     <h3 className="font-bold text-emerald-600 dark:text-emerald-400 mb-1">{lang === 'vi' ? '2. Bảo vệ tài sản và tài khoản còn lại' : '2. Secure remaining accounts and funds'}</h3>
                     <p className="text-sm text-slate-600 dark:text-slate-300/85">
                        {lang === 'vi' ? 'Gọi ngay tổng đài ngân hàng để yêu cầu khóa thẻ/tài khoản và tra soát khẩn cấp giao dịch. Đổi mật khẩu ngân hàng điện tử, email và mạng xã hội từ một thiết bị an toàn.' : 'Immediately call your bank helpline to lock cards/accounts and request an emergency trace. Change credentials from a clean device.'}
                     </p>
                   </div>
                   <div className="bg-white dark:bg-black/50 p-4 rounded-xl border-l-4 border-yellow-500 shadow-sm border border-black/5 dark:border-white/5">
                     <h3 className="font-bold text-amber-600 dark:text-yellow-400 mb-1">{lang === 'vi' ? '3. Lưu giữ chứng cứ và làm đơn tố giác' : '3. Preserve evidence & file complaint'}</h3>
                     <p className="text-sm text-slate-600 dark:text-slate-300/85">
                        {lang === 'vi' ? 'Chụp ảnh màn hình toàn bộ tin nhắn, sao kê ngân hàng, lưu lại số tài khoản thụ hưởng. Chuyển sang tab "Đơn Tố Giác" bên cạnh để xuất đơn nộp cơ quan Công an.' : 'Screenshot chat logs, bank receipts, and recipient account numbers. Switch to the "Crime Report" tab to generate a formal document.'}
                     </p>
                   </div>
                </div>
              </div>

               <div className="space-y-6">
                 <h3 className="text-xl font-bold text-slate-900 dark:text-white uppercase tracking-[0.12em] flex items-center gap-2">
                   <ShieldCheck className="text-primary" size={24} />
                   {t.contact_support}
                 </h3>

                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                   <a href="https://canhbao.ncsc.gov.vn" target="_blank" rel="noopener noreferrer" className="bg-blue-500/10 border border-blue-500/20 p-5 rounded-2xl hover:bg-blue-500/20 transition-all group">
                      <div className="flex items-center justify-between mb-3">
                         <div className="flex items-center gap-3">
                            <div className="bg-blue-500/20 p-2 rounded-lg text-blue-500">
                               <ShieldAlert size={20} />
                            </div>
                            <h4 className="font-bold text-blue-600 dark:text-blue-400 text-sm uppercase">{t.btn_ncsc_report}</h4>
                         </div>
                         <ExternalLink size={14} className="text-slate-500 group-hover:text-blue-500" />
                      </div>
                      <p className="text-xs text-slate-600 dark:text-slate-300/85">{lang === 'vi' ? 'Cổng cảnh báo an toàn thông tin Việt Nam (NCSC Việt Nam).' : 'Vietnam Information Security Warning Portal (NCSC Vietnam).'}</p>
                   </a>

                   <a href="https://chongluadao.vn" target="_blank" rel="noopener noreferrer" className="bg-green-500/10 border border-green-500/20 p-5 rounded-2xl hover:bg-green-500/20 transition-all group">
                      <div className="flex items-center justify-between mb-3">
                         <div className="flex items-center gap-3">
                            <div className="bg-green-500/20 p-2 rounded-lg text-green-500">
                               <ShieldCheck size={20} />
                            </div>
                            <h4 className="font-bold text-green-600 dark:text-green-400 text-sm uppercase">{t.btn_chongluadao_report}</h4>
                         </div>
                         <ExternalLink size={14} className="text-slate-500 group-hover:text-green-500" />
                      </div>
                      <p className="text-xs text-slate-600 dark:text-slate-300/85">{lang === 'vi' ? 'Dự án cộng đồng bảo vệ người dùng khỏi website độc hại và lừa đảo.' : 'Community project protecting users from malicious and scam websites.'}</p>
                   </a>

                   <div className="bg-red-500/10 border border-red-500/30 p-5 rounded-2xl hover:bg-red-500/20 transition-all">
                      <div className="flex items-center gap-3 mb-3">
                         <div className="bg-red-500/20 p-2 rounded-lg text-red-600">
                            <Phone size={20} />
                         </div>
                         <h4 className="font-bold text-red-600 dark:text-red-500 text-sm uppercase">{t.btn_a05_hotline}</h4>
                      </div>
                      <p className="text-xs text-slate-600 dark:text-slate-300/85 mb-4">{lang === 'vi' ? 'Đường dây nóng Cục An ninh mạng & Phòng chống tội phạm công nghệ cao (A05).' : 'Hotline of the Cyber Security and High-Tech Crime Prevention Department.'}</p>
                      <a href="tel:0692194053" className="text-slate-900 dark:text-white font-black text-lg tracking-[0.12em] hover:text-red-500 transition-colors">069.219.4053</a>
                   </div>

                   <a href="https://vneid.gov.vn/" target="_blank" rel="noopener noreferrer" className="bg-yellow-500/10 border border-yellow-500/20 p-5 rounded-2xl hover:bg-yellow-500/20 transition-all group">
                      <div className="flex items-center justify-between mb-3">
                         <div className="flex items-center gap-3">
                            <div className="bg-yellow-500/20 p-2 rounded-lg text-yellow-500">
                               <FileText size={20} />
                            </div>
                            <h4 className="font-bold text-amber-600 dark:text-yellow-400 text-sm uppercase">VNeID PORTAL</h4>
                         </div>
                         <ExternalLink size={14} className="text-slate-500 group-hover:text-yellow-500" />
                      </div>
                      <p className="text-xs text-slate-500 dark:text-slate-400 italic">{t.vneid_desc}</p>
                   </a>

                   <a href="https://safebrowsing.google.com/safebrowsing/report_phish/" target="_blank" rel="noopener noreferrer" className="bg-white dark:bg-white/5 border border-black/10 dark:border-white/20 p-5 rounded-2xl hover:bg-slate-50 dark:hover:bg-white/10 transition-all group shadow-sm">
                      <div className="flex items-center justify-between mb-3">
                         <div className="flex items-center gap-3">
                            <div className="bg-black/10 dark:bg-white/20 p-2 rounded-lg text-slate-900 dark:text-white">
                               <Globe size={20} />
                            </div>
                            <h4 className="font-bold text-slate-800 dark:text-gray-200 text-sm uppercase">{t.btn_safebrowsing_report}</h4>
                         </div>
                         <ExternalLink size={14} className="text-slate-600 dark:text-slate-300/85 group-hover:text-slate-900 dark:text-white" />
                      </div>
                      <p className="text-xs text-slate-600 dark:text-slate-300/85">{lang === 'vi' ? 'Báo cáo website lừa đảo trực tiếp cho Google để bảo vệ người dùng toàn cầu.' : 'Report phishing sites directly to Google to protect global users.'}</p>
                   </a>

                   <a href="https://zalo.me/ncscvn" target="_blank" rel="noopener noreferrer" className="bg-cyan-500/10 border border-cyan-500/20 p-5 rounded-2xl hover:bg-cyan-500/20 transition-all group">
                      <div className="flex items-center justify-between mb-3">
                         <div className="flex items-center gap-3">
                            <div className="bg-cyan-500/20 p-2 rounded-lg text-cyan-500">
                               <Search size={20} />
                            </div>
                            <h4 className="font-bold text-cyan-600 dark:text-cyan-400 text-sm uppercase">ZALO OA NCSC</h4>
                         </div>
                         <ExternalLink size={14} className="text-slate-500 group-hover:text-cyan-500" />
                      </div>
                      <p className="text-xs text-slate-500 dark:text-slate-400 italic">{t.zalo_oa_desc}</p>
                   </a>
                 </div>
               </div>
           </div>
        )}

        {/* TAB 2: ĐƠN TỐ GIÁC TỘI PHẠM CHUẨN QUY PHẠM PHÁP LUẬT VIỆT NAM */}
        {activeTab === 'report' && (
          <div className="relative">
            {lang === 'en' && (
              <div className="absolute inset-0 z-50 backdrop-blur-md bg-white/80 dark:bg-black/80 rounded-2xl flex items-center justify-center p-8 text-center border border-black/10 dark:border-white/10">
                <div className="max-w-md">
                   <Lock className="mx-auto text-yellow-500 mb-4" size={48} />
                   <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2 uppercase">Criminal Complaint Generator</h3>
                   <p className="text-slate-600 dark:text-gray-300 font-medium leading-relaxed">
                     This formal crime complaint document is configured strictly according to the Vietnamese Criminal Procedure Code 2015 and Decree 30/2020/NĐ-CP for submission to local Vietnamese Police investigation agencies.
                   </p>
                </div>
              </div>
            )}

            <div className={`mx-auto grid max-w-7xl grid-cols-1 lg:grid-cols-12 gap-6 ${lang === 'en' ? 'pointer-events-none select-none blur-sm' : ''}`}>
              {/* CỘT TRÁI: BIỂU MẪU ĐIỀN THÔNG TIN (GỌN GÀNG, HỖ TRỢ CÔNG DÂN) */}
              <div className="lg:col-span-6 xl:col-span-5 bg-white/80 dark:bg-black/40 border border-black/10 dark:border-white/10 p-5 md:p-6 rounded-2xl backdrop-blur-xl shadow-lg space-y-6">
                <div className="flex flex-col gap-2">
                  <div className="flex items-center justify-between">
                    <h2 className="text-lg font-black text-slate-900 dark:text-white flex items-center gap-2 uppercase tracking-wide">
                      <Scale className="text-red-500 shrink-0" size={20} />
                      Hỗ trợ soạn đơn tố giác
                    </h2>
                    <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded bg-red-500/10 text-red-600 border border-red-500/20">
                      Chuẩn BLTTHS
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                    Hệ thống chỉ hỗ trợ bạn định dạng văn bản đúng quy chuẩn pháp luật. Mọi thông tin do bạn tự cung cấp và chịu trách nhiệm trước cơ quan điều tra.
                  </p>
                </div>

                {/* HÀNH ĐỘNG NHANH */}
                <div className="flex flex-wrap items-center gap-2 p-3 bg-slate-100 dark:bg-white/5 rounded-xl border border-black/5 dark:border-white/10 text-xs">
                  <span className="font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1">
                    <Sparkles size={14} className="text-yellow-500" />
                    Thao tác nhanh:
                  </span>
                  <button
                    type="button"
                    onClick={handleApplySample}
                    className="px-2.5 py-1 rounded bg-blue-500/15 hover:bg-blue-500/25 text-blue-600 dark:text-blue-300 font-semibold transition-colors"
                  >
                    Điền mẫu tham khảo
                  </button>
                  <button
                    type="button"
                    onClick={handleResetForm}
                    className="px-2.5 py-1 rounded bg-slate-200 dark:bg-white/10 hover:bg-slate-300 dark:hover:bg-white/15 text-slate-700 dark:text-slate-300 font-semibold transition-colors flex items-center gap-1"
                  >
                    <RotateCcw size={12} />
                    Làm mới
                  </button>
                </div>

                {/* KHỐI 1: THÔNG TIN NGƯỜI LÀM ĐƠN */}
                <div className="space-y-3 pt-2 border-t border-black/10 dark:border-white/10">
                  <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-slate-900 dark:text-white">
                    <UserRound className="text-primary" size={16} />
                    1. Người làm đơn (Người tố giác)
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="sm:col-span-2">
                      <FieldLabel required hint="Họ và tên viết hoa có dấu theo Căn cước công dân">Họ và tên</FieldLabel>
                      <input
                        type="text"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleInputChange}
                        className={fieldClass}
                        placeholder="Ví dụ: NGUYỄN VĂN A"
                      />
                    </div>
                    <div>
                      <FieldLabel required>Ngày sinh / Năm sinh</FieldLabel>
                      <input
                        type="text"
                        name="birthYear"
                        value={formData.birthYear}
                        onChange={handleInputChange}
                        className={fieldClass}
                        placeholder="Ví dụ: 15/08/1988 hoặc 1988"
                      />
                    </div>
                    <div>
                      <FieldLabel required>Giới tính</FieldLabel>
                      <select
                        name="gender"
                        value={formData.gender}
                        onChange={handleInputChange}
                        className={fieldClass}
                      >
                        <option value="Nam">Nam</option>
                        <option value="Nữ">Nữ</option>
                      </select>
                    </div>
                    <div>
                      <FieldLabel required>Số CCCD / CMND</FieldLabel>
                      <input
                        type="text"
                        name="idNumber"
                        value={formData.idNumber}
                        onChange={handleInputChange}
                        className={fieldClass}
                        placeholder="12 chữ số trên CCCD gắn chip"
                      />
                    </div>
                    <div>
                      <FieldLabel required>Ngày cấp</FieldLabel>
                      <input
                        type="text"
                        name="idDate"
                        value={formData.idDate}
                        onChange={handleInputChange}
                        className={fieldClass}
                        placeholder="dd/mm/yyyy"
                      />
                    </div>
                    <div className="sm:col-span-2">
                      <FieldLabel required>Nơi cấp</FieldLabel>
                      <input
                        type="text"
                        name="idPlace"
                        value={formData.idPlace}
                        onChange={handleInputChange}
                        className={fieldClass}
                        placeholder="Cục Cảnh sát QLHC về TTXH"
                      />
                    </div>
                    <div className="sm:col-span-2">
                      <FieldLabel required hint="Ghi đầy đủ: Thôn/Xóm/Số nhà, Xã/Phường, Tỉnh/TP">Nơi đăng ký thường trú (theo CCCD)</FieldLabel>
                      <input
                        type="text"
                        name="permanentAddress"
                        value={formData.permanentAddress}
                        onChange={handleInputChange}
                        className={fieldClass}
                        placeholder="Số nhà, đường, phường/xã, tỉnh/TP"
                      />
                    </div>
                    <div className="sm:col-span-2">
                      <div className="flex items-center justify-between">
                        <FieldLabel required>Chỗ ở hiện nay</FieldLabel>
                        <button
                          type="button"
                          onClick={() => setFormData((prev) => ({ ...prev, currentAddress: prev.permanentAddress }))}
                          className="text-[11px] text-blue-500 hover:underline"
                        >
                          Giống thường trú
                        </button>
                      </div>
                      <input
                        type="text"
                        name="currentAddress"
                        value={formData.currentAddress}
                        onChange={handleInputChange}
                        className={fieldClass}
                        placeholder="Địa chỉ nơi bạn đang sinh sống thực tế"
                      />
                    </div>
                    <div>
                      <FieldLabel required>Số điện thoại liên hệ</FieldLabel>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className={fieldClass}
                        placeholder="Số điện thoại đang dùng"
                      />
                    </div>
                    <div>
                      <FieldLabel>Email (nếu có)</FieldLabel>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className={fieldClass}
                        placeholder="email@example.com"
                      />
                    </div>
                  </div>
                </div>

                {/* KHỐI 2: CƠ QUAN TIẾP NHẬN & ĐỊA DANH (2 CẤP: TỈNH VÀ XÃ) */}
                <div className="space-y-3 pt-4 border-t border-black/10 dark:border-white/10">
                  <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-slate-900 dark:text-white">
                    <Building2 className="text-yellow-500" size={16} />
                    2. Cơ quan tiếp nhận & Địa danh làm đơn
                  </div>
                  <div>
                    <FieldLabel required hint="Nộp tại Công an cấp xã (xã/phường) nơi cư trú hoặc Cơ quan CSĐT Công an cấp tỉnh">
                      Cơ quan kính gửi (Cấp Tỉnh hoặc Cấp Xã)
                    </FieldLabel>
                    <input
                      type="text"
                      name="authority"
                      value={formData.authority}
                      onChange={handleInputChange}
                      className={fieldClass}
                      placeholder="Ví dụ: Công an xã/phường... hoặc Cơ quan CSĐT Công an tỉnh/TP..."
                    />
                    <div className="flex flex-wrap gap-1.5 mt-2">
                      {commonAuthorities.map((auth, idx) => (
                        <button
                          key={idx}
                          type="button"
                          onClick={() => setFormData((prev) => ({ ...prev, authority: auth }))}
                          className="text-[11px] px-2.5 py-1 rounded-md bg-slate-200/90 dark:bg-white/10 text-slate-800 dark:text-slate-200 hover:bg-red-500/20 hover:text-red-500 font-medium transition-colors"
                        >
                          {auth}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <FieldLabel required>Địa danh viết đơn</FieldLabel>
                      <input
                        type="text"
                        name="reportPlace"
                        value={formData.reportPlace}
                        onChange={handleInputChange}
                        className={fieldClass}
                        placeholder="Ví dụ: Hà Nội"
                      />
                    </div>
                    <div>
                      <FieldLabel required>Ngày lập đơn</FieldLabel>
                      <input
                        type="text"
                        name="reportDate"
                        value={formData.reportDate}
                        onChange={handleInputChange}
                        className={fieldClass}
                        placeholder="ngày ... tháng ... năm ..."
                      />
                    </div>
                  </div>
                </div>

                {/* KHỐI 3: ĐỐI TƯỢNG BỊ TỐ GIÁC & THIỆT HẠI */}
                <div className="space-y-3 pt-4 border-t border-black/10 dark:border-white/10">
                  <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-slate-900 dark:text-white">
                    <ReceiptText className="text-emerald-500" size={16} />
                    3. Đối tượng lừa đảo & Thiệt hại
                  </div>
                  <div>
                    <FieldLabel required hint="Tên hiển thị, Nick Zalo, Facebook, Telegram, SĐT hoặc link hồ sơ của kẻ lừa đảo">
                      Thông tin nhận diện đối tượng
                    </FieldLabel>
                    <textarea
                      name="suspectInfo"
                      value={formData.suspectInfo}
                      onChange={handleInputChange}
                      rows={2}
                      className={textAreaClass}
                      placeholder="Ví dụ: Tài khoản Zalo 'Trần Tuấn', SĐT: 0868xxx, tự xưng là cán bộ công an / nhân viên tuyển dụng..."
                    />
                  </div>
                  <div>
                    <FieldLabel required hint="Số tài khoản, Tên ngân hàng và Tên chủ tài khoản đã nhận tiền của bạn">
                      Tài khoản ngân hàng thụ hưởng của đối tượng
                    </FieldLabel>
                    <textarea
                      name="bankAccount"
                      value={formData.bankAccount}
                      onChange={handleInputChange}
                      rows={2}
                      className={textAreaClass}
                      placeholder="Ví dụ: STK 1903xxx tại Techcombank, chủ tài khoản: NGUYEN VAN A"
                    />
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <FieldLabel required>Số tiền thiệt hại (VNĐ)</FieldLabel>
                      <input
                        type="text"
                        name="lossAmount"
                        value={formData.lossAmount}
                        onChange={handleInputChange}
                        className={fieldClass}
                        placeholder="Ví dụ: 50.000.000"
                      />
                    </div>
                    <div>
                      <FieldLabel required>Bằng chữ (Tự động chuyển)</FieldLabel>
                      <input
                        type="text"
                        name="lossAmountWords"
                        value={formData.lossAmountWords}
                        onChange={handleInputChange}
                        className={fieldClass}
                        placeholder="Ví dụ: Năm mươi triệu đồng chẵn"
                      />
                    </div>
                  </div>
                </div>

                {/* KHỐI 4: DIỄN BIẾN VÀ CHỨNG CỨ */}
                <div className="space-y-3 pt-4 border-t border-black/10 dark:border-white/10">
                  <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-slate-900 dark:text-white">
                    <AlertTriangle className="text-yellow-500" size={16} />
                    4. Diễn biến sự việc & Chứng cứ nộp kèm
                  </div>
                  <div>
                    <FieldLabel required hint="Trình bày mạch lạc theo trình tự thời gian: thời điểm tiếp cận, lời nói dụ dỗ/đe dọa, các giao dịch chuyển khoản và khi phát hiện bị lừa">
                      Nội dung diễn biến sự việc
                    </FieldLabel>
                    <textarea
                      name="description"
                      value={formData.description}
                      onChange={handleInputChange}
                      rows={6}
                      className={textAreaClass}
                      placeholder="Vào ngày... đối tượng sử dụng tài khoản... liên hệ qua... và hứa hẹn/yêu cầu... Tôi đã chuyển số tiền... vào số tài khoản... Sau đó đối tượng..."
                    />
                  </div>
                  <div>
                    <FieldLabel hint="Liệt kê danh mục tài liệu, bản in sao kê, ảnh chụp màn hình gửi kèm đơn">
                      Danh mục tài liệu, chứng cứ gửi kèm
                    </FieldLabel>
                    <textarea
                      name="evidenceList"
                      value={formData.evidenceList}
                      onChange={handleInputChange}
                      rows={4}
                      className={textAreaClass}
                      placeholder="1. Bản sao CCCD của tôi;&#10;2. Bản in sao kê ngân hàng xác nhận giao dịch;&#10;3. Ảnh chụp tin nhắn trao đổi với đối tượng..."
                    />
                  </div>
                </div>

                {/* THANH THAO TÁC XUẤT ĐƠN */}
                <div className="pt-4 border-t border-black/10 dark:border-white/10 flex flex-col sm:flex-row gap-3">
                  <button
                    type="button"
                    onClick={handlePrintPdf}
                    className="flex-1 bg-red-600 hover:bg-red-500 active:scale-[0.99] text-white px-5 py-3.5 rounded-xl font-bold uppercase tracking-wider text-sm transition-all flex items-center justify-center gap-2 shadow-lg shadow-red-600/30"
                  >
                    <Printer size={18} />
                    In đơn / Xuất PDF
                  </button>
                  <button
                    type="button"
                    onClick={handleCopyText}
                    className="bg-slate-200 dark:bg-white/10 hover:bg-slate-300 dark:hover:bg-white/20 active:scale-[0.99] text-slate-900 dark:text-white px-4 py-3.5 rounded-xl font-bold uppercase tracking-wider text-xs transition-all flex items-center justify-center gap-2"
                    title="Sao chép toàn bộ văn bản để dán vào Microsoft Word hoặc VNeID"
                  >
                    {copied ? <CheckCircle2 size={16} className="text-emerald-500" /> : <Copy size={16} />}
                    {copied ? 'Đã sao chép!' : 'Sao chép văn bản'}
                  </button>
                </div>
                {/* MẸO IN SẠCH SẼ */}
                <p className="mt-2.5 text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed">
                  💡 <strong>Lưu ý khi in:</strong> Hệ thống đã tự động định dạng chuẩn A4. Nếu hộp thoại in vẫn hiển thị ngày giờ hoặc URL ở mép giấy, vui lòng bỏ chọn ô <em>&ldquo;Đầu trang và chân trang&rdquo;</em> (Headers and footers) trong phần cài đặt in.
                </p>
              </div>

              {/* CỘT PHẢI: BẢN XEM TRƯỚC VĂN BẢN (A4 TRANG TRỌNG THEO NGHỊ ĐỊNH 30/2020/NĐ-CP) */}
              <div className="lg:col-span-6 xl:col-span-7 flex flex-col items-center">
                {/* THANH THÔNG TIN PREVIEW TRÊN MÀN HÌNH */}
                <div className="w-full mb-3 px-3 py-2 rounded-xl bg-slate-200/80 dark:bg-white/5 border border-black/5 dark:border-white/10 flex items-center justify-between text-xs text-slate-600 dark:text-slate-300">
                  <span className="font-semibold flex items-center gap-1.5">
                    <FileText size={14} className="text-red-500" />
                    Bản xem trước A4 (Nghị định 30/2020/NĐ-CP)
                  </span>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={handlePrintPdf}
                      className="text-red-600 dark:text-red-400 font-bold hover:underline flex items-center gap-1"
                    >
                      <Printer size={12} />
                      In ngay
                    </button>
                  </div>
                </div>

                {/* TỜ GIẤY A4 TRẮNG TINH THEO QUY PHẠM PHÁP LUẬT */}
                <div className="w-full bg-white text-slate-900 p-8 md:p-12 shadow-2xl rounded-sm border border-slate-200 min-h-[1000px]">
                  <DocumentBody formData={formData} />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CrisisHub;
