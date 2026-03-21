
import React, { useState, useRef, useEffect } from 'react';
import { Send, Phone, Mail, MapPin, ShieldCheck, Target, Globe, Heart, Zap, Users, GraduationCap, User, Fingerprint, Code, Paperclip, Loader2 } from 'lucide-react';
import { Language } from '../types';
import { TRANSLATIONS, PROJECT_METADATA } from '../data';
import { db, storage } from '../firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

const AboutContact: React.FC<{ lang: Language }> = ({ lang }) => {
  const t = TRANSLATIONS[lang];
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [formData, setFormData] = useState({ name: '', email: '', desc: '' });
  const [file, setFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
      return () => { if (timeoutRef.current) clearTimeout(timeoutRef.current); };
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    
    // --- VALIDATION: Bắt buộc điền đúng ---
    if (formData.name.trim().length < 2) {
        setErrorMsg(lang === 'vi' ? 'Tên gọi quá ngắn (tối thiểu 2 ký tự).' : 'Name must be at least 2 characters.');
        return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
        setErrorMsg(lang === 'vi' ? 'Địa chỉ email không hợp lệ.' : 'Invalid email address.');
        return;
    }
    if (formData.desc.trim().length < 20) {
        setErrorMsg(lang === 'vi' ? 'Mô tả sự cố quá ngắn. Vui lòng nhập chi tiết hơn (ít nhất 20 ký tự).' : 'Description too short, please provide more details (at least 20 chars).');
        return;
    }
    
    // --- ANTI-XSS (Cross-Site Scripting) VALIDATION ---
    // Quét cụ thể các thẻ có khả năng gây hại thay vì cấm mọi dấu ngoặc nhọn
    const xssRegex = /<(script|iframe|object|embed|form|svg|math|base|html|body|link|meta|style|title|applet)[^>]*>/i;
    if (xssRegex.test(formData.desc.toLowerCase()) || xssRegex.test(formData.name.toLowerCase())) {
        setErrorMsg(lang === 'vi' ? 'LỖI BẢO MẬT: Chứa thẻ HTML không hợp lệ.' : 'SECURITY ERROR: Invalid HTML tags detected.');
        return;
    }

    setIsSubmitting(true);
    try {
      let attachmentUrl = '';
      if (file) {
          // --- FILE VALIDATION (CHỐNG SPAM STORAGE VÀ MÃ ĐỘC) ---
          const MAX_SIZE = 5 * 1024 * 1024; // Giới hạn cứng 5MB
          if (file.size > MAX_SIZE) {
              setErrorMsg(lang === 'vi' ? 'LỖI: Tệp đính kèm vượt quá 5MB. Giới hạn dung lượng để bảo vệ hệ thống.' : 'ERROR: File exceeds 5MB limit.');
              setIsSubmitting(false);
              return;
          }
          const allowedTypes = ['image/jpeg', 'image/png', 'image/webp', 'video/mp4'];
          if (!allowedTypes.includes(file.type)) {
              setErrorMsg(lang === 'vi' ? 'LỖI: Chỉ chấp nhận ảnh (JPG, PNG, WEBP) hoặc Video MP4.' : 'ERROR: Invalid file format. Only JPG, PNG, WEBP, MP4 allowed.');
              setIsSubmitting(false);
              return;
          }

          // BẢO MẬT LAYER 2: Không chỉ tin tưởng MIME Type, phải kiểm tra gắt gao Đuôi tệp (Extension)
          const fileExtension = file.name.split('.').pop()?.toLowerCase();
          const safeExtensions = ['jpg', 'jpeg', 'png', 'webp', 'mp4'];
          if (!fileExtension || !safeExtensions.includes(fileExtension)) {
              setErrorMsg(lang === 'vi' ? 'LỖI BẢO MẬT: Định dạng tệp không được phép.' : 'SECURITY ERROR: File extension not allowed.');
              setIsSubmitting(false);
              return;
          }

          // Xử lý sanitize tên file: chỉ giữ lại chữ cái, số và dấu chấm, cắt độ dài
          const parts = file.name.split('.');
          const ext = parts.length > 1 ? '.' + parts.pop()?.toLowerCase() : '';
          const safeFileName = parts.join('_').replace(/[^a-zA-Z0-9.-]/g, '_').substring(0, 40) + ext;
          const fileRef = ref(storage, `reports/${Date.now()}_${safeFileName}`);
          await uploadBytes(fileRef, file);
          attachmentUrl = await getDownloadURL(fileRef);
      }

      // Gửi dữ liệu lên Firestore collection 'incident_reports'
      await addDoc(collection(db, "incident_reports"), {
        name: formData.name.trim(),
        email: formData.email.trim(),
        desc: formData.desc.trim(),
        attachmentUrl: attachmentUrl,
        submittedAt: serverTimestamp(), // Thời gian gửi
        lang: lang,
        status: 'new' // Trạng thái xử lý (để admin theo dõi sau này)
      });

      setSubmitted(true);
      setFormData({ name: '', email: '', desc: '' }); // Reset form về rỗng
      setFile(null);
      if (fileInputRef.current) fileInputRef.current.value = '';
      timeoutRef.current = setTimeout(() => setSubmitted(false), 3000);
    } catch (error) {
      console.error("Lỗi khi gửi báo cáo:", error);
      alert(lang === 'vi' ? 'Có lỗi xảy ra, vui lòng thử lại sau.' : 'An error occurred, please try again later.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="animate-in fade-in duration-500 max-w-7xl mx-auto py-4">
       <div className="text-center mb-12">
          <h2 className="text-4xl font-black text-white uppercase tracking-tighter mb-2">{t.about_us}</h2>
          <div className="h-1.5 w-24 bg-primary mx-auto"></div>
       </div>

       <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 max-w-7xl mx-auto">
          {/* Main Info */}
          <div className="lg:col-span-7 space-y-8">
              <div className="bg-surface border border-white/5 rounded-3xl p-10 shadow-xl relative overflow-hidden group">
                  <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity"><Target size={120}/></div>
                  <h3 className="text-primary font-black text-sm uppercase tracking-widest mb-4 flex items-center gap-2"><Target size={18}/> {t.mission}</h3>
                  <p className="text-gray-300 text-base leading-relaxed">
                    {lang === 'vi' 
                      ? "Phổ cập kiến thức phòng chống Deepfake cho 100% cộng đồng người dùng số tại Việt Nam, xây dựng mạng lưới lá chắn niềm tin vững chắc trước sự bùng nổ của trí tuệ nhân tạo."
                      : "Popularizing Deepfake prevention knowledge for 100% of digital users in Vietnam, building a strong shield of trust in the AI era."}
                  </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Box 1: Tầm nhìn */}
                  <div className="bg-surface border border-white/5 rounded-3xl p-8 shadow-xl hover:border-primary/40 transition-all group/box">
                      <h3 className="font-black text-xs uppercase tracking-widest mb-4 flex items-center gap-2 text-primary group-hover/box:translate-x-1 transition-transform">
                        <Globe size={16}/> {lang === 'vi' ? 'TẦM NHÌN 2030' : 'VISION 2030'}
                      </h3>
                      <p className="text-gray-400 text-sm leading-relaxed">
                        {lang === 'vi' 
                          ? "Trở thành trung tâm dữ liệu và nhận diện Deepfake hàng đầu khu vực, hỗ trợ đắc lực cho các cơ quan chức năng trong việc xử lý tội phạm công nghệ cao."
                          : "Becoming the region's leading data and identification center for Deepfakes, effectively supporting authorities in high-tech crime processing."}
                      </p>
                  </div>
                  {/* Box 2: Bảo mật */}
                  <div className="bg-surface border border-white/5 rounded-3xl p-8 shadow-xl hover:border-success/40 transition-all group/box">
                      <h3 className="font-black text-xs uppercase tracking-widest mb-4 flex items-center gap-2 text-success group-hover/box:translate-x-1 transition-transform">
                        <ShieldCheck size={16}/> {lang === 'vi' ? 'BẢO MẬT TUYỆT ĐỐI' : 'ABSOLUTE PRIVACY'}
                      </h3>
                      <p className="text-gray-400 text-sm leading-relaxed">
                        {lang === 'vi' 
                          ? "Mọi thông tin báo cáo sự cố đều được mã hóa và bảo vệ nghiêm ngặt. Chúng tôi cam kết không tiết lộ danh tính người báo cáo trong mọi trường hợp."
                          : "All incident report information is encrypted and strictly protected. We commit to not disclosing reporters' identities under any circumstances."}
                      </p>
                  </div>
              </div>

              {/* SOLO AUTHOR SECTION */}
              <div className="bg-gradient-to-br from-purple-900/10 to-black border border-purple-500/30 rounded-3xl p-8 shadow-xl hover:border-purple-500 transition-all group/box relative overflow-hidden">
                  <div className="absolute -right-10 -bottom-10 opacity-10 rotate-12"><User size={200} /></div>
                  
                  <h3 className="font-black text-xs uppercase tracking-widest mb-6 flex items-center gap-2 text-purple-400 group-hover/box:translate-x-1 transition-transform">
                    <Code size={16}/> {t.team} (SOLO DEV)
                  </h3>
                  
                  <div className="flex flex-col gap-4 relative z-10">
                      {PROJECT_METADATA.authors.map((author, index) => (
                          <div key={index} className="flex gap-4 items-start">
                              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-500 to-blue-600 flex items-center justify-center text-white shadow-lg shrink-0">
                                  <span className="font-black text-xl">{author.name.charAt(0)}</span>
                              </div>
                              <div>
                                  <div className="text-white font-black text-xl uppercase tracking-tight mb-1">
                                      {author.name}
                                  </div>
                                  <div className="inline-block bg-purple-500/20 text-purple-300 text-[10px] font-mono px-2 py-1 rounded mb-2 border border-purple-500/30">
                                      ID: {author.id}
                                  </div>
                                  <div className="text-gray-400 text-sm">
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
                  <h3 className="text-secondary font-black text-xs uppercase tracking-widest mb-6">{t.contact_support}</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-gray-400 font-mono">
                      <div className="flex items-center gap-4 bg-black/40 p-4 rounded-xl border border-white/5 hover:border-primary/20 transition-colors cursor-pointer"><Mail size={20} className="text-primary shrink-0"/> deepfense@gmail.com</div>
                      <div className="flex items-center gap-4 bg-black/40 p-4 rounded-xl border border-white/5 hover:border-primary/20 transition-colors cursor-pointer"><Phone size={20} className="text-primary shrink-0"/> {t.cyber_security}: 0123456789</div>
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
                      <h3 className="text-success font-black text-2xl uppercase tracking-widest">{t.success_msg}</h3>
                      <p className="text-gray-500 text-xs mt-4 font-mono">ENCRYPTING_REPORT_DATA...</p>
                  </div>
              )}
              <h3 className="text-white text-2xl font-black mb-8 uppercase tracking-tighter flex items-center gap-3">
                <Send className="text-primary" size={24}/> {t.report_form}
              </h3>
              <form onSubmit={handleSubmit} className="space-y-6">
                  {errorMsg && (
                      <div className="bg-red-500/10 border border-red-500/50 text-red-500 text-sm p-4 rounded-xl animate-in fade-in">
                          ⚠ {errorMsg}
                      </div>
                  )}
                  <div className="space-y-1">
                      <label className="text-xs text-gray-400 font-mono uppercase tracking-widest ml-2 mb-1 block">{t.label_name}</label>
                      <input type="text" disabled={isSubmitting} placeholder={lang === 'vi' ? 'VD: Anna' : 'Ex: Anna'} className="w-full bg-black border border-white/10 rounded-2xl p-4 text-white focus:border-primary outline-none transition-all disabled:opacity-50 disabled:cursor-not-allowed" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} />
                  </div>
                  <div className="space-y-1">
                      <label className="text-xs text-gray-400 font-mono uppercase tracking-widest ml-2 mb-1 block">{t.label_email}</label>
                      <input type="email" disabled={isSubmitting} placeholder="email@example.com" className="w-full bg-black border border-white/10 rounded-2xl p-4 text-white focus:border-primary outline-none transition-all disabled:opacity-50 disabled:cursor-not-allowed" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} />
                  </div>
                  <div className="space-y-1">
                      <label className="text-xs text-gray-400 font-mono uppercase tracking-widest ml-2 mb-1 block">{t.label_desc}</label>
                      <textarea disabled={isSubmitting} placeholder={lang === 'vi' ? 'Vui lòng mô tả chi tiết sự việc (đối tượng giả danh ai, qua nền tảng nào...)' : 'Please describe the incident in detail...'} className="w-full bg-black border border-white/10 rounded-2xl p-4 text-white focus:border-primary outline-none h-32 resize-none transition-all disabled:opacity-50 disabled:cursor-not-allowed" value={formData.desc} onChange={e => setFormData({...formData, desc: e.target.value})}></textarea>
                  </div>
                  <div className="space-y-1">
                      <label className="text-xs text-gray-400 font-mono uppercase tracking-widest ml-2 mb-1 block">{t.label_attachment}</label>
                      <div className="relative">
                          <input 
                              ref={fileInputRef} 
                              type="file" 
                              disabled={isSubmitting} 
                              id="file-upload" 
                              accept="image/*,video/*" 
                              className="hidden" 
                              onChange={e => setFile(e.target.files?.[0] || null)} 
                          />
                          <label htmlFor="file-upload" className={`w-full bg-black border border-white/10 border-dashed rounded-2xl p-4 flex flex-col items-center justify-center gap-2 transition-colors text-gray-500 ${isSubmitting ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer hover:border-primary/50 hover:text-primary'}`}>
                              <Paperclip size={20} />
                              <span className="text-xs font-mono">{file ? file.name : (lang === 'vi' ? 'Nhấp để chọn tệp' : 'Click to select file')}</span>
                          </label>
                      </div>
                  </div>
                  <button type="submit" disabled={isSubmitting} className="w-full bg-primary text-black font-black py-5 rounded-2xl hover:bg-white transition-all uppercase text-xs tracking-[0.3em] shadow-lg shadow-primary/20 mt-4 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed">
                    {isSubmitting ? <Loader2 className="animate-spin" size={18} /> : <Send size={18} />}
                    {isSubmitting ? (lang === 'vi' ? 'ĐANG XỬ LÝ...' : 'SENDING...') : t.send_report}
                  </button>
              </form>
          </div>
       </div>
    </div>
  );
};

export default AboutContact;
