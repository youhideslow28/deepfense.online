import React, { useState } from 'react';
import { ShieldAlert, FileText, HeartHandshake, MapPin, Download, AlertTriangle, Send, CheckCircle2, Lock } from 'lucide-react';
import { Language } from '../types';
import { TRANSLATIONS } from '../data';

interface CrisisHubProps {
  lang: Language;
}

const CrisisHub: React.FC<CrisisHubProps> = ({ lang }) => {
  const t = TRANSLATIONS[lang];
  // Thay đổi tab mặc định thành 'first-aid' (Sơ cứu tâm lý) theo yêu cầu người dùng
  const [activeTab, setActiveTab] = useState<'report' | 'first-aid' | 'hotspot'>('first-aid');
  
  // State form
  const [formData, setFormData] = useState({
    fullName: '',
    victimName: '',
    incidentDate: '',
    lossAmount: '',
    description: '',
    scammerInfo: ''
  });

  const handlePrintPdf = () => {
    window.print();
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500 pb-16 print:m-0 print:p-0">
      
      <div className="print:hidden border-l-4 border-red-500 pl-4 mb-8">
        <h1 className="text-4xl font-black text-white uppercase tracking-wider mb-2 flex items-center gap-3">
          <ShieldAlert className="text-red-500" size={36} />
          {t.crisis_title}
        </h1>
        <p className="text-gray-400 max-w-2xl">
          {t.crisis_desc}
        </p>
      </div>

      {/* Tabs (chỉnh không in) - Thay đổi thứ tự tab theo yêu cầu: Sơ cứu -> Điểm nóng -> Tố giác */}
      <div className="print:hidden flex flex-wrap gap-4 border-b border-white/10 pb-4">
        <button
          onClick={() => setActiveTab('first-aid')}
          className={`px-6 py-3 rounded-xl font-bold uppercase tracking-widest text-sm transition-all focus:outline-none flex items-center gap-2 ${activeTab === 'first-aid' ? 'bg-blue-500/20 text-blue-500 border border-blue-500/50' : 'bg-black/40 text-gray-400 border border-white/10 hover:border-white/30'}`}
        >
          <HeartHandshake size={18} />
          {t.btn_first_aid}
        </button>
        <button
          onClick={() => setActiveTab('hotspot')}
          className={`px-6 py-3 rounded-xl font-bold uppercase tracking-widest text-sm transition-all focus:outline-none flex items-center gap-2 ${activeTab === 'hotspot' ? 'bg-orange-500/20 text-orange-500 border border-orange-500/50' : 'bg-black/40 text-gray-400 border border-white/10 hover:border-white/30'}`}
        >
          <MapPin size={18} />
          {t.btn_hotspot}
        </button>
        <button
          onClick={() => setActiveTab('report')}
          className={`px-6 py-3 rounded-xl font-bold uppercase tracking-widest text-sm transition-all focus:outline-none flex items-center gap-2 ${activeTab === 'report' ? 'bg-red-500/20 text-red-500 border border-red-500/50' : 'bg-black/40 text-gray-400 border border-white/10 hover:border-white/30'}`}
        >
          <FileText size={18} />
          {t.btn_report_pdf}
        </button>
      </div>

      <div className="mt-8">
        
        {/* TAB 1: PSYCHOLOGICAL FIRST AID / SƠ CỨU TÂM LÝ (Đưa lên đầu) */}
        {activeTab === 'first-aid' && (
           <div className="grid grid-cols-1 md:grid-cols-2 gap-8 print:hidden">
              <div className="bg-blue-900/20 border border-blue-500/30 p-8 rounded-2xl backdrop-blur-md">
                <HeartHandshake className="text-blue-400 mb-6" size={48} />
                <h2 className="text-2xl font-bold text-white mb-4">
                  {lang === 'vi' ? 'Bạn không đơn độc. Đây không phải lỗi của bạn.' : 'You are not alone. This is not your fault.'}
                </h2>
                <p className="text-gray-300 mb-6 leading-relaxed">
                  {lang === 'vi' 
                    ? 'Tội phạm công nghệ cao sử dụng các kỹ thuật thao túng tâm lý tinh vi (Deepfake, tống tiền nhân dạng) khiến bộ não con người không thể phản ứng kịp. Bị lừa đảo là một chấn thương tâm lý thực sự.'
                    : 'High-tech criminals use sophisticated psychological manipulation techniques (Deepfake, identity blackmail) that make it impossible for the human brain to react in time. Being scammed is a real psychological trauma.'}
                </p>
                
                <div className="space-y-4">
                   <div className="bg-black/50 p-4 rounded-xl border-l-4 border-blue-500">
                     <h3 className="font-bold text-blue-400 mb-1">{lang === 'vi' ? '1. Dừng mọi liên lạc' : '1. Stop all contact'}</h3>
                     <p className="text-sm text-gray-400">
                        {lang === 'vi' ? 'Không cố gắng tranh cãi hay đáp ứng yêu cầu chuyển thêm tiền. Block thủ phạm ngay lập tức.' : 'Do not try to argue or meet requests for more money. Block the perpetrator immediately.'}
                     </p>
                   </div>
                   <div className="bg-black/50 p-4 rounded-xl border-l-4 border-emerald-500">
                     <h3 className="font-bold text-emerald-400 mb-1">{lang === 'vi' ? '2. Bảo vệ tài sản còn lại' : '2. Protect remaining assets'}</h3>
                     <p className="text-sm text-gray-400">
                        {lang === 'vi' ? 'Khoá thẻ ngân hàng, đổi mật khẩu email và tài khoản MXH quan trọng từ thiết bị khác.' : 'Lock bank cards, change passwords for email and important social accounts from another device.'}
                     </p>
                   </div>
                   <div className="bg-black/50 p-4 rounded-xl border-l-4 border-purple-500">
                     <h3 className="font-bold text-purple-400 mb-1">{lang === 'vi' ? '3. Tìm điểm tựa an toàn' : '3. Find a safe support'}</h3>
                     <p className="text-sm text-gray-400">
                        {lang === 'vi' ? 'Hãy nói chuyện với người mà bạn tin tưởng nhất. Chia sẻ để giảm bớt gánh nặng cảm giác tội lỗi.' : 'Talk to the person you trust the most. Share to reduce the burden of guilt.'}
                     </p>
                   </div>
                </div>
              </div>
              
              <div className="bg-black/40 border border-white/10 p-8 rounded-2xl backdrop-blur-md flex flex-col justify-center">
                <h3 className="text-xl font-bold text-white mb-6 uppercase tracking-widest">{t.contact_support}</h3>
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="bg-red-500/20 p-3 rounded-full text-red-500 mt-1">
                      <AlertTriangle size={24} />
                    </div>
                    <div>
                      <h4 className="font-bold text-lg text-red-400">{t.police}</h4>
                      <p className="text-sm text-gray-400">
                        {lang === 'vi' ? 'Gọi ngay nếu bị đe dọa trực tiếp tới tính mạng hoặc danh dự trong thời gian thực.' : 'Call immediately if your life or honor is threatened in real-time.'}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="bg-green-500/20 p-3 rounded-full text-green-500 mt-1">
                      <ShieldAlert size={24} />
                    </div>
                    <div>
                      <h4 className="font-bold text-lg text-green-400">{t.cyber_security}</h4>
                      <p className="text-sm text-gray-400">
                        {lang === 'vi' ? 'Trực thuộc Công an cấp Tỉnh/TP để nộp đơn trình báo bản cứng (PDF ở Tab 1).' : 'Directly under Provincial/City Police to submit hard-copy reports (PDF in Tab 1).'}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
           </div>
        )}

        {/* TAB 2: HOTSPOT MAP / BẢN ĐỒ ĐIỂM NÓNG */}
        {activeTab === 'hotspot' && (
          <div className="print:hidden space-y-6">
            <div className="bg-orange-900/20 border border-orange-500/30 p-8 rounded-2xl backdrop-blur-md text-center">
              <div className="inline-flex bg-orange-500/20 text-orange-500 p-4 rounded-full mb-4 animate-pulse">
                <MapPin size={40} />
              </div>
              <h2 className="text-3xl font-bold text-white mb-4">{t.btn_hotspot}</h2>
              <p className="text-gray-300 max-w-3xl mx-auto mb-8">
                {lang === 'vi' 
                  ? 'Dữ liệu mô phỏng từ cộng đồng tình báo mối đe dọa của DEEPFENSE. Các khu vực màu đỏ thẫm là nơi đang bùng phát chiến dịch Lừa đảo Voice/Video Call Deepfake.'
                  : 'Simulated data from the DEEPFENSE threat intelligence community. Deep red areas indicate where Deepfake Voice/Video call scam campaigns are erupting.'}
              </p>
              
              <div className="aspect-[21/9] w-full bg-[#0a0f12] rounded-xl border border-white/10 relative overflow-hidden flex items-center justify-center">
                  <div className="absolute inset-0 bg-[url('https://upload.wikimedia.org/wikipedia/commons/e/e6/Vietnam_map_provinces.svg')] bg-contain bg-center bg-no-repeat opacity-20 filter invert"></div>
                  
                  {/* Fake Hotspots */}
                  <div className="absolute top-[30%] left-[45%] w-8 h-8 bg-red-500 rounded-full blur-[20px] animate-pulse"></div>
                  <div className="absolute top-[30%] left-[45%] bg-black/80 text-xs px-2 py-1 rounded border border-red-500 text-red-400 translate-x-4 -translate-y-4">Hà Nội (High)</div>

                  <div className="absolute top-[65%] left-[50%] w-12 h-12 bg-red-600 rounded-full blur-[25px] flex items-center justify-center animate-pulse animation-delay-500"></div>
                  <div className="absolute top-[65%] left-[50%] bg-black/80 text-xs px-2 py-1 rounded border border-red-500 text-red-500 translate-x-4 -translate-y-4">TP.HCM (Critical)</div>

                  <div className="absolute top-[45%] left-[55%] w-6 h-6 bg-orange-500 rounded-full blur-[15px] animate-pulse animation-delay-1000"></div>
                  <div className="absolute top-[45%] left-[55%] bg-black/80 text-xs px-2 py-1 rounded border border-orange-500 text-orange-400 translate-x-4 -translate-y-4">Đà Nẵng (Medium)</div>
                  
                  <div className="z-10 bg-black/50 backdrop-blur-sm px-6 py-3 rounded-xl border border-white/10 flex items-center gap-3">
                    <ShieldAlert className="text-yellow-500" />
                    <span className="font-mono text-sm tracking-widest text-gray-300">LIVE THREAT MAP ACTIVATED</span>
                  </div>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
               <div className="bg-black/40 border-t-2 border-red-500 p-6 rounded-xl">
                 <div className="text-4xl font-black text-white mb-2">1,245</div>
                 <div className="text-gray-400 text-sm uppercase tracking-wider">{lang === 'vi' ? 'Vụ lừa đảo báo cáo tuần này' : 'Scams reported this week'}</div>
               </div>
               <div className="bg-black/40 border-t-2 border-orange-500 p-6 rounded-xl">
                 <div className="text-4xl font-black text-white mb-2">Video/Voice</div>
                 <div className="text-gray-400 text-sm uppercase tracking-wider">{lang === 'vi' ? 'Hình thức phổ biến nhất' : 'Most common format'}</div>
               </div>
               <div className="bg-black/40 border-t-2 border-green-500 p-6 rounded-xl">
                 <div className="text-4xl font-black text-white mb-2">~150 {lang === 'vi' ? 'Tỉ' : 'Billion'}</div>
                 <div className="text-gray-400 text-sm uppercase tracking-wider">{lang === 'vi' ? 'Ước tính thiệt hại' : 'Estimated loss'}</div>
               </div>
            </div>
          </div>
        )}

        {/* TAB 3: REPORT PDF / ĐƠN TỐ GIÁC (Đẩy xuống cuối) */}
        {activeTab === 'report' && (
          <div className="relative">
            {/* Overlay Blur for English */}
            {lang === 'en' && (
              <div className="absolute inset-0 z-50 backdrop-blur-md bg-black/40 rounded-2xl flex items-center justify-center p-8 text-center border border-white/10">
                <div className="max-w-md">
                   <Lock className="mx-auto text-yellow-500 mb-4" size={48} />
                   <h3 className="text-2xl font-bold text-white mb-2 uppercase">{t.btn_report_pdf}</h3>
                   <p className="text-gray-300 font-medium">{t.report_locked}</p>
                </div>
              </div>
            )}
            
            <div className={`grid grid-cols-1 lg:grid-cols-2 gap-8 ${lang === 'en' ? 'pointer-events-none select-none blur-sm' : ''}`}>
              <div className="print:hidden bg-black/40 border border-white/10 p-6 md:p-8 rounded-2xl backdrop-blur-xl">
                <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                   <AlertTriangle className="text-yellow-500" />
                   {lang === 'vi' ? 'Nhập thông tin tố giác' : 'Enter incident details'}
                </h2>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-gray-400 text-sm mb-2 font-mono uppercase">Họ và tên người tố giác</label>
                    <input type="text" name="fullName" value={formData.fullName} onChange={handleInputChange} className="w-full bg-black/60 border border-white/10 rounded-xl p-3 text-white focus:outline-none focus:border-red-500 transition-colors" placeholder="Nguyễn Văn A" />
                  </div>
                  <div>
                    <label className="block text-gray-400 text-sm mb-2 font-mono uppercase">Tên nạn nhân (nếu làm thay)</label>
                    <input type="text" name="victimName" value={formData.victimName} onChange={handleInputChange} className="w-full bg-black/60 border border-white/10 rounded-xl p-3 text-white focus:outline-none focus:border-red-500 transition-colors" placeholder="Trần Thị B" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-gray-400 text-sm mb-2 font-mono uppercase">Ngày xảy ra sự việc</label>
                      <input type="date" name="incidentDate" value={formData.incidentDate} onChange={handleInputChange} className="w-full bg-black/60 border border-white/10 rounded-xl p-3 text-white focus:outline-none focus:border-red-500 transition-colors [color-scheme:dark]" />
                    </div>
                    <div>
                      <label className="block text-gray-400 text-sm mb-2 font-mono uppercase">Số tiền thiệt hại</label>
                      <input type="text" name="lossAmount" value={formData.lossAmount} onChange={handleInputChange} className="w-full bg-black/60 border border-white/10 rounded-xl p-3 text-white focus:outline-none focus:border-red-500 transition-colors" placeholder="Ví dụ: 50.000.000 VNĐ" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-gray-400 text-sm mb-2 font-mono uppercase">Thông tin kẻ lừa đảo</label>
                    <textarea name="scammerInfo" value={formData.scammerInfo} onChange={handleInputChange} rows={2} className="w-full bg-black/60 border border-white/10 rounded-xl p-3 text-white focus:outline-none focus:border-red-500 transition-colors resize-none" placeholder="Tài khoản ngân hàng, UID mạng xã hội, số điện thoại..."></textarea>
                  </div>
                  <div>
                    <label className="block text-gray-400 text-sm mb-2 font-mono uppercase">Tóm tắt sự việc</label>
                    <textarea name="description" value={formData.description} onChange={handleInputChange} rows={4} className="w-full bg-black/60 border border-white/10 rounded-xl p-3 text-white focus:outline-none focus:border-red-500 transition-colors resize-none" placeholder="Trình bày ngắn gọn quá trình bị lừa đảo..."></textarea>
                  </div>
                </div>

                <div className="mt-8 flex gap-4">
                  <button 
                    onClick={handlePrintPdf}
                    className="flex-1 bg-red-600 hover:bg-red-500 text-white p-4 rounded-xl font-bold uppercase tracking-widest transition-colors flex items-center justify-center gap-2"
                  >
                    <Download size={20} />
                    {lang === 'vi' ? 'TẢI PDF / IN BẢN CỨNG' : 'DOWNLOAD PDF / PRINT'}
                  </button>
                </div>
              </div>

              {/* PREVIEW BẢN IN PDF */}
              <div className="bg-white text-black p-8 md:p-12 print:p-0 min-h-[800px] shadow-2xl relative">
                {/* STYLE CHỈ DÙNG KHI IN */}
                <style dangerouslySetInnerHTML={{__html: `
                  @media print {
                    body * { visibility: hidden; }
                    .print-area, .print-area * { visibility: visible; }
                    .print-area { position: absolute; left: 0; top: 0; width: 100%; color: black; background: white; }
                    .page-break { page-break-before: always; }
                  }
                `}}/>
                
                <div className="print-area font-serif max-w-2xl mx-auto">
                  <div className="text-center font-bold mb-8">
                    <h2 className="text-xl uppercase">Cộng Hòa Xã Hội Chủ Nghĩa Việt Nam</h2>
                    <h3 className="text-lg underline underline-offset-4">Độc lập - Tự do - Hạnh phúc</h3>
                  </div>

                  <div className="text-center font-bold mb-8">
                    <h1 className="text-2xl uppercase">ĐƠN TRÌNH BÁO / TỐ GIÁC TỘI PHẠM</h1>
                    <p className="italic font-normal">(V/v: Lừa đảo chiếm đoạt tài sản trên không gian mạng)</p>
                  </div>

                  <div className="mb-6 font-bold">
                    <p>Kính gửi: Cơ quan Cảnh sát điều tra (PC02/PA05) - Công an ......................</p>
                  </div>

                  <div className="space-y-4 text-justify leading-relaxed">
                    <p>Tôi tên là: <span className="font-bold">{formData.fullName || '(Họ tên người làm đơn)'}</span></p>
                    <p>Làm đơn tố giác/trình báo sự việc xảy ra đối với nạn nhân: <span className="font-bold">{formData.victimName || formData.fullName || '(Tên nạn nhân)'}</span></p>
                    <p>Vào ngày: <span className="font-bold">{formData.incidentDate || '(Ngày xảy ra sự việc)'}</span></p>
                    <p>Nội dung sự việc như sau:</p>
                    <div className="border border-gray-300 p-4 min-h-[100px] whitespace-pre-wrap">
                      {formData.description || '(Chi tiết sự việc chưa được nhập...)'}
                    </div>
                    
                    <p className="mt-4">Tổng số tài sản bị chiếm đoạt (ước tính): <span className="font-bold text-red-600">{formData.lossAmount || '(Số tiền)'}</span></p>
                    
                    <p className="mt-4">Thông tin đối tượng lừa đảo (Tài khoản ngân hàng, UID, Số điện thoại...):</p>
                    <div className="border border-gray-300 p-4 min-h-[60px] whitespace-pre-wrap">
                      {formData.scammerInfo || '(Thông tin kẻ lừa đảo chưa được nhập...)'}
                    </div>
                    <p className="mt-8">Tôi cam đoan những sự việc trình bày trong đơn là hoàn toàn đúng sự thật và chịu trách nhiệm trước pháp luật về những lời trình bày đó.</p>
                  </div>

                  <div className="mt-12 flex justify-between px-8">
                    <div className="text-center">
                      <p>Nơi nhận:</p>
                      <p className="italic">- Như trên;</p>
                      <p className="italic">- Lưu: CSĐT.</p>
                    </div>
                    <div className="text-center">
                      <p>......, ngày ..... tháng ..... năm 20...</p>
                      <p className="font-bold mt-2">NGƯỜI LÀM ĐƠN</p>
                      <p className="italic">(Ký và ghi rõ họ tên)</p>
                      <div className="h-24"></div>
                    </div>
                  </div>
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
