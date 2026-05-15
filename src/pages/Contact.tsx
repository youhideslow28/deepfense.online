
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
       <h2 className="text-2xl font-serif font-bold text-center mb-2">ðŸ“ž BÃO CÃO Sá»° Cá»</h2>
       <p className="text-gray-500 text-center mb-8">LiÃªn há»‡ há»— trá»£ hoáº·c bÃ¡o cÃ¡o trÆ°á»ng há»£p lá»«a Ä‘áº£o Deepfake</p>

       <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* Info Column */}
          <div className="space-y-6">
              <div className="bg-surface border border-border rounded-lg p-6">
                  <div className="font-mono text-success text-sm font-bold mb-4">KÃŠNH Há»– TRá»¢</div>
                  <div className="space-y-3 text-sm text-gray-300">
                      <div className="flex items-center gap-3"><Mail size={16} /> deepfense@gmail.com</div>
                      <div className="flex items-center gap-3"><Phone size={16} /> 0828250475</div>
                      <div className="flex items-center gap-3"><MapPin size={16} /> 25NS, VKU, DA NANG, VIET NAM</div>
                  </div>
              </div>

              <div className="bg-surface border border-border rounded-lg p-6">
                  <div className="font-mono text-secondary text-sm font-bold mb-4">ÄÆ¯á»œNG DÃ‚Y NÃ“NG</div>
                  <div className="space-y-3 text-sm text-gray-300">
                      <p>ðŸš” <strong>Cáº£nh sÃ¡t pháº£n á»©ng nhanh:</strong> 113</p>
                      <p>ðŸ›¡ï¸ <strong>Cá»¥c An ninh máº¡ng:</strong> 069.219.4053</p>
                      <p>ðŸ“± <strong>Zalo OA:</strong> Cá»¥c An toÃ n thÃ´ng tin</p>
                  </div>
              </div>
          </div>

          {/* Form Column */}
          <div className="bg-surface border border-border rounded-lg p-6 relative overflow-hidden">
              {submitted && (
                  <div className="absolute inset-0 bg-surface/95 backdrop-blur flex flex-col items-center justify-center z-10 animate-in fade-in">
                      <div className="text-5xl mb-4">ðŸŽ‰</div>
                      <h3 className="text-success font-bold text-xl">Gá»¬I THÃ€NH CÃ”NG!</h3>
                      <p className="text-gray-400 text-sm mt-2">ChÃºng tÃ´i sáº½ liÃªn há»‡ trong 24h.</p>
                  </div>
              )}
              
              <div className="font-mono text-primary text-sm font-bold mb-6">Gá»¬I BÃO CÃO</div>
              <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                      <label className="block text-xs text-gray-500 mb-1">Há» vÃ  tÃªn *</label>
                      <input 
                        type="text" 
                        className="w-full bg-black border border-border rounded p-2 text-white focus:border-primary outline-none transition-colors"
                        placeholder="Nguyá»…n VÄƒn A"
                        value={formData.name}
                        onChange={e => setFormData({...formData, name: e.target.value})}
                      />
                  </div>
                  <div>
                      <label className="block text-xs text-gray-500 mb-1">Sá»‘ Ä‘iá»‡n thoáº¡i *</label>
                      <input 
                        type="text" 
                        className="w-full bg-black border border-border rounded p-2 text-white focus:border-primary outline-none transition-colors"
                        placeholder="0901234567"
                        value={formData.phone}
                        onChange={e => setFormData({...formData, phone: e.target.value})}
                      />
                  </div>
                  <div>
                      <label className="block text-xs text-gray-500 mb-1">SÄT Ä‘á»‘i tÆ°á»£ng (náº¿u cÃ³)</label>
                      <input 
                        type="text" 
                        className="w-full bg-black border border-border rounded p-2 text-white focus:border-primary outline-none transition-colors"
                        placeholder="Sá»‘ Ä‘iá»‡n thoáº¡i káº» lá»«a Ä‘áº£o"
                        value={formData.scamPhone}
                        onChange={e => setFormData({...formData, scamPhone: e.target.value})}
                      />
                  </div>
                  <div>
                      <label className="block text-xs text-gray-500 mb-1">MÃ´ táº£ chi tiáº¿t *</label>
                      <textarea 
                        className="w-full bg-black border border-border rounded p-2 text-white focus:border-primary outline-none transition-colors h-32 resize-none"
                        placeholder="MÃ´ táº£ cÃ¡ch thá»©c lá»«a Ä‘áº£o, thá»i gian, thiá»‡t háº¡i..."
                        value={formData.desc}
                        onChange={e => setFormData({...formData, desc: e.target.value})}
                      ></textarea>
                  </div>
                  
                  <button type="submit" className="w-full bg-white text-black font-bold py-3 rounded flex items-center justify-center gap-2 hover:bg-primary transition-colors">
                      <Send size={16} /> Gá»¬I BÃO CÃO
                  </button>
              </form>
          </div>
       </div>
    </div>
  );
};

export default Contact;
