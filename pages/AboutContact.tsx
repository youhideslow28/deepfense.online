
import React, { useState } from 'react';
import { Send, Phone, Mail, MapPin, ShieldCheck, Target, Globe, Heart, Zap, Users, GraduationCap, User, Fingerprint, Code } from 'lucide-react';
import { Language } from '../types';
import { TRANSLATIONS, PROJECT_METADATA } from '../data';
import { db } from '../firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

const AboutContact: React.FC<{ lang: Language }> = ({ lang }) => {
  const t = TRANSLATIONS[lang];
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({ name: '', phone: '', scamPhone: '', desc: '' });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if(!formData.name || !formData.phone || !formData.desc) return;
    
    try {
      // Gửi dữ liệu lên Firestore collection 'incident_reports'
      await addDoc(collection(db, "incident_reports"), {
        ...formData,
        submittedAt: serverTimestamp(), // Thời gian gửi
        lang: lang,
        status: 'new' // Trạng thái xử lý (để admin theo dõi sau này)
      });

      setSubmitted(true);
      setFormData({ name: '', phone: '', scamPhone: '', desc: '' }); // Reset form về rỗng
      setTimeout(() => setSubmitted(false), 3000);
    } catch (error) {
      console.error("Lỗi khi gửi báo cáo:", error);
      alert(lang === 'vi' ? 'Có lỗi xảy ra, vui lòng thử lại sau.' : 'An error occurred, please try again later.');
    }
  };

  return (
    <div className="animate-in fade-in duration-500 max-w-7xl mx-auto py-4">
       <div className="text-center mb-12">
          <h2 className="text-4xl font-black text-white uppercase italic tracking-tighter mb-2">{t.about_us}</h2>
          <div className="h-1.5 w-24 bg-primary mx-auto"></div>
       </div>

       <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 max-w-7xl mx-auto">
          {/* Main Info */}
          <div className="lg:col-span-7 space-y-8">
              <div className="bg-surface border border-white/5 rounded-3xl p-10 shadow-xl relative overflow-hidden group">
                  <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity"><Target size={120}/></div>
                  <h3 className="text-primary font-black text-sm uppercase tracking-widest mb-6 italic flex items-center gap-2"><Target size={18}/> {t.mission}</h3>
                  <p className="text-gray-400 text-md italic leading-relaxed">
                    {lang === 'vi' 
                      ? "Phổ cập kiến thức phòng chống Deepfake cho 100% cộng đồng người dùng số tại Việt Nam, xây dựng mạng lưới lá chắn niềm tin vững chắc trước sự bùng nổ của trí tuệ nhân tạo."
                      : "Popularizing Deepfake prevention knowledge for 100% of digital users in Vietnam, building a strong shield of trust in the AI era."}
                  </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Box 1: Tầm nhìn */}
                  <div className="bg-surface border border-white/5 rounded-3xl p-8 shadow-xl hover:border-primary/40 transition-all group/box">
                      <h3 className="font-black text-xs uppercase tracking-widest mb-4 italic flex items-center gap-2 text-primary group-hover/box:translate-x-1 transition-transform">
                        <Globe size={16}/> {lang === 'vi' ? 'TẦM NHÌN 2030' : 'VISION 2030'}
                      </h3>
                      <p className="text-gray-500 text-xs italic leading-relaxed">
                        {lang === 'vi' 
                          ? "Trở thành trung tâm dữ liệu và nhận diện Deepfake hàng đầu khu vực, hỗ trợ đắc lực cho các cơ quan chức năng trong việc xử lý tội phạm công nghệ cao."
                          : "Becoming the region's leading data and identification center for Deepfakes, effectively supporting authorities in high-tech crime processing."}
                      </p>
                  </div>
                  {/* Box 2: Bảo mật */}
                  <div className="bg-surface border border-white/5 rounded-3xl p-8 shadow-xl hover:border-success/40 transition-all group/box">
                      <h3 className="font-black text-xs uppercase tracking-widest mb-4 italic flex items-center gap-2 text-success group-hover/box:translate-x-1 transition-transform">
                        <ShieldCheck size={16}/> {lang === 'vi' ? 'BẢO MẬT TUYỆT ĐỐI' : 'ABSOLUTE PRIVACY'}
                      </h3>
                      <p className="text-gray-500 text-xs italic leading-relaxed">
                        {lang === 'vi' 
                          ? "Mọi thông tin báo cáo sự cố đều được mã hóa và bảo vệ nghiêm ngặt. Chúng tôi cam kết không tiết lộ danh tính người báo cáo trong mọi trường hợp."
                          : "All incident report information is encrypted and strictly protected. We commit to not disclosing reporters' identities under any circumstances."}
                      </p>
                  </div>
              </div>

              {/* SOLO AUTHOR SECTION */}
              <div className="bg-gradient-to-br from-purple-900/10 to-black border border-purple-500/30 rounded-3xl p-8 shadow-xl hover:border-purple-500 transition-all group/box relative overflow-hidden">
                  <div className="absolute -right-10 -bottom-10 opacity-10 rotate-12"><User size={200} /></div>
                  
                  <h3 className="font-black text-xs uppercase tracking-widest mb-6 italic flex items-center gap-2 text-purple-400 group-hover/box:translate-x-1 transition-transform">
                    <Code size={16}/> {t.team} (SOLO DEV)
                  </h3>
                  
                  <div className="flex flex-col gap-4 relative z-10">
                      {PROJECT_METADATA.authors.map((author, index) => (
                          <div key={index} className="flex gap-4 items-start">
                              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-500 to-blue-600 flex items-center justify-center text-white shadow-lg shrink-0">
                                  <span className="font-black text-xl">{author.name.charAt(0)}</span>
                              </div>
                              <div>
                                  <div className="text-white font-black text-xl uppercase italic tracking-tight mb-1">
                                      {author.name}
                                  </div>
                                  <div className="inline-block bg-purple-500/20 text-purple-300 text-[10px] font-mono px-2 py-1 rounded mb-2 border border-purple-500/30">
                                      ID: {author.id}
                                  </div>
                                  <div className="text-gray-400 text-xs italic">
                                      {author.role}
                                  </div>
                                  <div className="mt-3 h-0.5 w-12 bg-purple-500/50"></div>
                              </div>
                          </div>
                      ))}
                  </div>
                  
                  <div className="mt-8 pt-4 border-t border-white/5 flex flex-col sm:flex-row sm:items-center justify-between text-[10px] text-gray-500 font-mono gap-2">
                      <span>{PROJECT_METADATA.university}</span>
                      <span className="flex items-center gap-1 text-success"><Fingerprint size={10}/> VERIFIED AUTHOR</span>
                  </div>
              </div>

              <div className="bg-surface border border-white/5 rounded-3xl p-8 shadow-xl">
                  <h3 className="text-secondary font-black text-xs uppercase tracking-widest mb-6 italic">{t.contact_support}</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-gray-400 font-mono">
                      <div className="flex items-center gap-4 bg-black/40 p-4 rounded-xl border border-white/5 hover:border-primary/20 transition-colors cursor-pointer"><Mail size={20} className="text-primary shrink-0"/> support@deepfense.vn</div>
                      <div className="flex items-center gap-4 bg-black/40 p-4 rounded-xl border border-white/5 hover:border-primary/20 transition-colors cursor-pointer"><Phone size={20} className="text-primary shrink-0"/> {t.cyber_security}: 069.219.4053</div>
                      <div className="flex items-center gap-4 bg-black/40 p-4 rounded-xl border border-white/5 md:col-span-2"><MapPin size={20} className="text-primary shrink-0"/> VKU University Lab, Danang, Vietnam</div>
                  </div>
              </div>
          </div>

          {/* Form */}
          <div className="lg:col-span-5 bg-surface border border-white/5 rounded-[40px] p-10 relative overflow-hidden shadow-2xl h-fit">
              <div className="absolute top-0 left-0 w-full h-1.5 bg-primary"></div>
              {submitted && (
                  <div className="absolute inset-0 bg-surface/95 backdrop-blur flex flex-col items-center justify-center z-10 animate-in fade-in">
                      <div className="text-6xl mb-6 animate-bounce">✅</div>
                      <h3 className="text-success font-black text-2xl uppercase italic tracking-widest">{t.success_msg}</h3>
                      <p className="text-gray-500 text-xs mt-4 font-mono">ENCRYPTING_REPORT_DATA...</p>
                  </div>
              )}
              <h3 className="text-white text-2xl font-black mb-8 uppercase italic tracking-tighter flex items-center gap-3">
                <Send className="text-primary" size={24}/> {t.report_form}
              </h3>
              <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-1">
                      <label className="text-[10px] text-gray-500 font-mono uppercase tracking-[0.2em] ml-2">{t.label_name}</label>
                      <input type="text" className="w-full bg-black border border-white/10 rounded-2xl p-4 text-white focus:border-primary outline-none transition-all" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} />
                  </div>
                  <div className="space-y-1">
                      <label className="text-[10px] text-gray-500 font-mono uppercase tracking-[0.2em] ml-2">{t.label_phone}</label>
                      <input type="text" className="w-full bg-black border border-white/10 rounded-2xl p-4 text-white focus:border-primary outline-none transition-all" value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} />
                  </div>
                  <div className="space-y-1">
                      <label className="text-[10px] text-gray-500 font-mono uppercase tracking-[0.2em] ml-2">{t.label_desc}</label>
                      <textarea className="w-full bg-black border border-white/10 rounded-2xl p-4 text-white focus:border-primary outline-none h-40 resize-none transition-all" value={formData.desc} onChange={e => setFormData({...formData, desc: e.target.value})}></textarea>
                  </div>
                  <button type="submit" className="w-full bg-primary text-black font-black py-5 rounded-2xl hover:bg-white transition-all uppercase text-xs tracking-[0.3em] shadow-lg shadow-primary/20 mt-4">
                    {t.send_report}
                  </button>
              </form>
          </div>
       </div>
    </div>
  );
};

export default AboutContact;
