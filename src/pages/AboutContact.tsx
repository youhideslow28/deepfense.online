
import React, { useState, useRef, useEffect } from 'react';
import { Send, Phone, Mail, MapPin, ShieldCheck, Target, Globe, Heart, Zap, Users, GraduationCap, User, Fingerprint, Code, Paperclip, Loader2 } from 'lucide-react';
import { Language } from '@/types';
import { TRANSLATIONS, PROJECT_METADATA } from '@/data';
import { db, storage } from '@/config/firebase';
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
       <div className="mb-12 text-center">
          <h2 className="font-display mb-2 text-4xl font-black uppercase tracking-tight text-white">{t.about_us}</h2>
          <div className="mx-auto h-1.5 w-24 rounded-full bg-primary"></div>
       </div>

       <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 max-w-7xl mx-auto">
          {/* Main Info */}
          <div className="lg:col-span-7 space-y-8">
              <div className="group relative overflow-hidden rounded-3xl border border-white/10 bg-surface p-10 shadow-xl transition-all duration-500 hover:border-primary/40 hover:shadow-[0_0_40px_rgba(29,111,232,0.1)]">
                  <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-20 group-hover:scale-110 transition-all duration-500"><Target size={120}/></div>
                  <h3 className="mb-4 flex items-center gap-2 text-sm font-black uppercase tracking-[0.12em] text-blue-300 transition-transform duration-300 group-hover:translate-x-1"><Target size={18}/> {t.mission}</h3>
                  <p className="text-base leading-7 text-slate-300">
                    {lang === 'vi' 
                      ? "Phổ cập kiến thức phòng chống Deepfake cho 100% cộng đồng người dùng số tại Việt Nam, xây dựng mạng lưới lá chắn niềm tin vững chắc trước sự bùng nổ của trí tuệ nhân tạo."
                      : "Popularizing Deepfake prevention knowledge for 100% of digital users in Vietnam, building a strong shield of trust in the AI era."}
                  </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Box 1: Tầm nhìn */}
                  <div className="group/box rounded-3xl border border-white/10 bg-surface p-8 shadow-xl transition-all duration-500 hover:border-primary/40 hover:shadow-[0_0_40px_rgba(29,111,232,0.1)]">
                      <h3 className="mb-4 flex items-center gap-2 text-xs font-black uppercase tracking-[0.12em] text-blue-300 transition-transform duration-300 group-hover/box:translate-x-1">
                        <Globe size={16}/> {lang === 'vi' ? 'TẦM NHÌN 2030' : 'VISION 2030'}
                      </h3>
                      <p className="text-sm leading-7 text-slate-300/85">
                        {lang === 'vi' 
                          ? "Trở thành trung tâm dữ liệu và nhận diện Deepfake hàng đầu khu vực, hỗ trợ đắc lực cho các cơ quan chức năng trong việc xử lý tội phạm công nghệ cao."
                          : "Becoming the region's leading data and identification center for Deepfakes, effectively supporting authorities in high-tech crime processing."}
                      </p>
                  </div>
                  {/* Box 2: Bảo mật */}
                  <div className="group/box rounded-3xl border border-white/10 bg-surface p-8 shadow-xl transition-all hover:border-success/40">
                      <h3 className="mb-4 flex items-center gap-2 text-xs font-black uppercase tracking-[0.12em] text-success transition-transform group-hover/box:translate-x-1">
                        <ShieldCheck size={16}/> {lang === 'vi' ? 'BẢO MẬT TUYỆT ĐỐI' : 'ABSOLUTE PRIVACY'}
                      </h3>
                      <p className="text-sm leading-7 text-slate-300/85">
                        {lang === 'vi' 
                          ? "Mọi thông tin báo cáo sự cố đều được mã hóa và bảo vệ nghiêm ngặt. Chúng tôi cam kết không tiết lộ danh tính người báo cáo trong mọi trường hợp."
                          : "All incident report information is encrypted and strictly protected. We commit to not disclosing reporters' identities under any circumstances."}
                      </p>
                  </div>
              </div>

              {/* SOLO AUTHOR SECTION */}
              <div className="group/box relative overflow-hidden rounded-3xl border border-blue-400/20 bg-gradient-to-br from-blue-950/18 to-black p-8 shadow-xl transition-all hover:border-blue-400/45">
                  <div className="absolute -right-10 -bottom-10 opacity-10 rotate-12"><User size={200} /></div>
                  
                  <h3 className="mb-6 flex items-center gap-2 text-xs font-black uppercase tracking-[0.12em] text-blue-300 transition-transform group-hover/box:translate-x-1">
                    <Code size={16}/> {t.team}
                  </h3>
                  
                  <div className="flex flex-col gap-4 relative z-10">
                      {PROJECT_METADATA.authors.map((author, index) => (
                          <div key={index} className="flex gap-4 items-start">
                              <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-blue-500 text-white shadow-lg">
                                  <span className="font-black text-xl">{author.name.charAt(0)}</span>
                              </div>
                              <div>
                                  <div className="text-white font-black text-xl uppercase tracking-tight mb-1">
                                      {author.name}
                                  </div>
                                  <div className="mb-2 inline-block rounded border border-blue-400/25 bg-blue-400/10 px-2 py-1 font-mono text-[10px] text-blue-200">
                                      ID: {author.id}
                                  </div>
                                  <div className="text-sm text-slate-300/85">
                                      {author.role}
                                  </div>
                                  <div className="mt-3 h-0.5 w-12 bg-primary/55"></div>
                              </div>
                          </div>
                      ))}
                  </div>
                  
                  <div className="mt-8 flex flex-col justify-between gap-2 border-t border-white/10 pt-4 font-mono text-[10px] text-slate-400 sm:flex-row sm:items-center">
                      <span>{PROJECT_METADATA.university}</span>
                      <span className="flex items-center gap-1 text-success"><Fingerprint size={10}/> VERIFIED AUTHOR</span>
                  </div>
              </div>

              <div className="rounded-3xl border border-white/10 bg-surface p-8 shadow-xl">
                  <h3 className="mb-6 text-xs font-black uppercase tracking-[0.12em] text-red-300">{t.contact_support}</h3>
                  <div className="grid grid-cols-1 gap-6 text-sm font-medium text-slate-200 md:grid-cols-2">
                      <div className="flex cursor-pointer items-center gap-4 rounded-xl border border-white/12 bg-black/45 p-4 transition-colors hover:border-primary/35 hover:bg-primary/8 hover:text-white"><Mail size={20} className="shrink-0 text-blue-300"/> deepfense@gmail.com</div>
                      <div className="flex cursor-pointer items-center gap-4 rounded-xl border border-white/12 bg-black/45 p-4 transition-colors hover:border-primary/35 hover:bg-primary/8 hover:text-white"><Phone size={20} className="shrink-0 text-blue-300"/> 0828250475</div>
                      <div className="flex items-center gap-4 rounded-xl border border-white/12 bg-black/45 p-4 md:col-span-2"><MapPin size={20} className="shrink-0 text-blue-300"/> 25NS, VKU, DA NANG, VIET NAM</div>
                  </div>
              </div>
          </div>

          {/* Form */}
          <div className="relative h-fit overflow-hidden rounded-3xl border border-primary/25 bg-surface/95 p-8 shadow-[0_20px_70px_rgba(29,111,232,0.12)] md:p-10 lg:col-span-5">
              <div className="absolute top-0 left-0 w-full h-1.5 bg-primary"></div>
              {submitted && (
                  <div className="absolute inset-0 bg-surface/95 backdrop-blur flex flex-col items-center justify-center z-10 animate-in fade-in">
                      <div className="text-6xl mb-6 animate-bounce">✅</div>
                      <h3 className="text-success font-black text-2xl uppercase tracking-[0.12em]">{t.success_msg}</h3>
                      <p className="mt-4 text-xs font-bold tracking-[0.08em] text-slate-300">ENCRYPTING_REPORT_DATA...</p>
                  </div>
              )}
              <h3 className="font-display mb-8 flex items-center gap-3 text-2xl font-black uppercase tracking-tight text-white">
                <Send className="text-primary" size={24}/> {t.report_form}
              </h3>
              <form onSubmit={handleSubmit} className="space-y-6">
                  {errorMsg && (
                      <div className="bg-red-500/10 border border-red-500/50 text-red-500 text-sm p-4 rounded-xl animate-in fade-in">
                          ⚠ {errorMsg}
                      </div>
                  )}
                  <div className="space-y-1">
                      <label className="mb-1.5 ml-2 block text-xs font-bold uppercase tracking-[0.1em] text-slate-300">{t.label_name}</label>
                      <input type="text" disabled={isSubmitting} placeholder={lang === 'vi' ? 'VD: Anna' : 'Ex: Anna'} className="w-full rounded-2xl border border-white/12 bg-black/65 p-4 text-white outline-none transition-all placeholder:text-slate-500 focus:border-primary disabled:cursor-not-allowed disabled:opacity-50" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} />
                  </div>
                  <div className="space-y-1">
                      <label className="mb-1.5 ml-2 block text-xs font-bold uppercase tracking-[0.1em] text-slate-300">{t.label_email}</label>
                      <input type="email" disabled={isSubmitting} placeholder="email@example.com" className="w-full rounded-2xl border border-white/12 bg-black/65 p-4 text-white outline-none transition-all placeholder:text-slate-500 focus:border-primary disabled:cursor-not-allowed disabled:opacity-50" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} />
                  </div>
                  <div className="space-y-1">
                      <label className="mb-1.5 ml-2 block text-xs font-bold uppercase tracking-[0.1em] text-slate-300">{t.label_desc}</label>
                      <textarea disabled={isSubmitting} placeholder={lang === 'vi' ? 'Vui lòng mô tả chi tiết sự việc (đối tượng giả danh ai, qua nền tảng nào...)' : 'Please describe the incident in detail...'} className="h-32 w-full resize-none rounded-2xl border border-white/12 bg-black/65 p-4 text-white outline-none transition-all placeholder:text-slate-500 focus:border-primary disabled:cursor-not-allowed disabled:opacity-50" value={formData.desc} onChange={e => setFormData({...formData, desc: e.target.value})}></textarea>
                  </div>
                  <div className="space-y-1">
                      <label className="mb-1.5 ml-2 block text-xs font-bold uppercase tracking-[0.1em] text-slate-300">{t.label_attachment}</label>
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
                          <label htmlFor="file-upload" className={`flex w-full flex-col items-center justify-center gap-2 rounded-2xl border border-dashed border-white/12 bg-black/65 p-4 text-slate-300/85 transition-colors ${isSubmitting ? 'cursor-not-allowed opacity-50' : 'cursor-pointer hover:border-primary/50 hover:text-blue-200'}`}>
                              <Paperclip size={20} />
                              <span className="text-xs font-mono">{file ? file.name : (lang === 'vi' ? 'Nhấp để chọn tệp' : 'Click to select file')}</span>
                          </label>
                      </div>
                  </div>
                  <button type="submit" disabled={isSubmitting} className="mt-4 flex w-full items-center justify-center gap-2 rounded-2xl bg-primary py-5 text-xs font-black uppercase tracking-[0.12em] text-white shadow-lg shadow-primary/20 transition-all hover:bg-blue-500 disabled:cursor-not-allowed disabled:opacity-70">
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
