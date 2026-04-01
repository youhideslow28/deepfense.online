
import React, { useState } from 'react';
import { Send, Phone, Mail, MapPin } from 'lucide-react';

const Contact: React.FC = () => {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '', phone: '', scamPhone: '', desc: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if(!formData.name || !formData.phone || !formData.desc) return;
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <div className="animate-in fade-in duration-500">
       <h2 className="text-2xl font-serif font-bold text-center mb-2">📞 BÁO CÁO SỰ CỐ</h2>
       <p className="text-gray-500 text-center mb-8">Liên hệ hỗ trợ hoặc báo cáo trường hợp lừa đảo Deepfake</p>

       <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* Info Column */}
          <div className="space-y-6">
              <div className="bg-surface border border-border rounded-lg p-6">
                  <div className="font-mono text-success text-sm font-bold mb-4">KÊNH HỖ TRỢ</div>
                  <div className="space-y-3 text-sm text-gray-300">
                      <div className="flex items-center gap-3"><Mail size={16} /> deepfense@gmail.com</div>
                      <div className="flex items-center gap-3"><Phone size={16} /> 0828250475</div>
                      <div className="flex items-center gap-3"><MapPin size={16} /> LỚP 25NS, VKU, DA NANG, VIET NAM</div>
                  </div>
              </div>

              <div className="bg-surface border border-border rounded-lg p-6">
                  <div className="font-mono text-secondary text-sm font-bold mb-4">ĐƯỜNG DÂY NÓNG</div>
                  <div className="space-y-3 text-sm text-gray-300">
                      <p>🚔 <strong>Cảnh sát phản ứng nhanh:</strong> 113</p>
                      <p>🛡️ <strong>Cục An ninh mạng:</strong> 069.219.4053</p>
                      <p>📱 <strong>Zalo OA:</strong> Cục An toàn thông tin</p>
                  </div>
              </div>
          </div>

          {/* Form Column */}
          <div className="bg-surface border border-border rounded-lg p-6 relative overflow-hidden">
              {submitted && (
                  <div className="absolute inset-0 bg-surface/95 backdrop-blur flex flex-col items-center justify-center z-10 animate-in fade-in">
                      <div className="text-5xl mb-4">🎉</div>
                      <h3 className="text-success font-bold text-xl">GỬI THÀNH CÔNG!</h3>
                      <p className="text-gray-400 text-sm mt-2">Chúng tôi sẽ liên hệ trong 24h.</p>
                  </div>
              )}
              
              <div className="font-mono text-primary text-sm font-bold mb-6">GỬI BÁO CÁO</div>
              <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                      <label className="block text-xs text-gray-500 mb-1">Họ và tên *</label>
                      <input 
                        type="text" 
                        className="w-full bg-black border border-border rounded p-2 text-white focus:border-primary outline-none transition-colors"
                        placeholder="Nguyễn Văn A"
                        value={formData.name}
                        onChange={e => setFormData({...formData, name: e.target.value})}
                      />
                  </div>
                  <div>
                      <label className="block text-xs text-gray-500 mb-1">Số điện thoại *</label>
                      <input 
                        type="text" 
                        className="w-full bg-black border border-border rounded p-2 text-white focus:border-primary outline-none transition-colors"
                        placeholder="0901234567"
                        value={formData.phone}
                        onChange={e => setFormData({...formData, phone: e.target.value})}
                      />
                  </div>
                  <div>
                      <label className="block text-xs text-gray-500 mb-1">SĐT đối tượng (nếu có)</label>
                      <input 
                        type="text" 
                        className="w-full bg-black border border-border rounded p-2 text-white focus:border-primary outline-none transition-colors"
                        placeholder="Số điện thoại kẻ lừa đảo"
                        value={formData.scamPhone}
                        onChange={e => setFormData({...formData, scamPhone: e.target.value})}
                      />
                  </div>
                  <div>
                      <label className="block text-xs text-gray-500 mb-1">Mô tả chi tiết *</label>
                      <textarea 
                        className="w-full bg-black border border-border rounded p-2 text-white focus:border-primary outline-none transition-colors h-32 resize-none"
                        placeholder="Mô tả cách thức lừa đảo, thời gian, thiệt hại..."
                        value={formData.desc}
                        onChange={e => setFormData({...formData, desc: e.target.value})}
                      ></textarea>
                  </div>
                  
                  <button type="submit" className="w-full bg-white text-black font-bold py-3 rounded flex items-center justify-center gap-2 hover:bg-primary transition-colors">
                      <Send size={16} /> GỬI BÁO CÁO
                  </button>
              </form>
          </div>
       </div>
    </div>
  );
};

export default Contact;
