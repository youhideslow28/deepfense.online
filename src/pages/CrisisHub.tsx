import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { ShieldAlert, FileText, HeartHandshake, Download, AlertTriangle, Send, CheckCircle2, Lock, ShieldCheck, Globe, Phone, ExternalLink, Search } from 'lucide-react';
import { Language } from '@/types';
import { TRANSLATIONS } from '@/data';

interface CrisisHubProps {
  lang: Language;
}

type CrisisTab = 'report' | 'first-aid';

const CrisisHub: React.FC<CrisisHubProps> = ({ lang }) => {
  const t = TRANSLATIONS[lang];
  const location = useLocation();
  // Thay Ä‘á»•i tab máº·c Ä‘á»‹nh thÃ nh 'first-aid' (SÆ¡ cá»©u tÃ¢m lÃ½) theo yÃªu cáº§u ngÆ°á»i dÃ¹ng
  const [activeTab, setActiveTab] = useState<CrisisTab>('first-aid');

  useEffect(() => {
    if (location.state?.subTab === 'report' || location.state?.subTab === 'first-aid') {
      setActiveTab(location.state.subTab);
    }
  }, [location.state]);
  
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

      {/* Tabs */}
      <div className="print:hidden flex flex-wrap gap-4 border-b border-white/10 pb-4">
        <button
          onClick={() => setActiveTab('first-aid')}
          className={`px-6 py-3 rounded-xl font-bold uppercase tracking-widest text-sm transition-all focus:outline-none flex items-center gap-2 ${activeTab === 'first-aid' ? 'bg-blue-500/20 text-blue-500 border border-blue-500/50' : 'bg-black/40 text-gray-400 border border-white/10 hover:border-white/30'}`}
        >
          <HeartHandshake size={18} />
          {t.btn_first_aid}
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
        
        {/* TAB 1: PSYCHOLOGICAL FIRST AID / SÆ  Cá»¨U TÃ‚M LÃ (ÄÆ°a lÃªn Ä‘áº§u) */}
        {activeTab === 'first-aid' && (
           <div className="grid grid-cols-1 md:grid-cols-2 gap-8 print:hidden">
              <div className="bg-blue-900/20 border border-blue-500/30 p-8 rounded-2xl backdrop-blur-md">
                <HeartHandshake className="text-blue-400 mb-6" size={48} />
                <h2 className="text-2xl font-bold text-white mb-4">
                  {lang === 'vi' ? 'Báº¡n khÃ´ng Ä‘Æ¡n Ä‘á»™c. ÄÃ¢y khÃ´ng pháº£i lá»—i cá»§a báº¡n.' : 'You are not alone. This is not your fault.'}
                </h2>
                <p className="text-gray-300 mb-6 leading-relaxed">
                  {lang === 'vi' 
                    ? 'Tá»™i pháº¡m cÃ´ng nghá»‡ cao sá»­ dá»¥ng cÃ¡c ká»¹ thuáº­t thao tÃºng tÃ¢m lÃ½ tinh vi (Deepfake, tá»‘ng tiá»n nhÃ¢n dáº¡ng) khiáº¿n bá»™ nÃ£o con ngÆ°á»i khÃ´ng thá»ƒ pháº£n á»©ng ká»‹p. Bá»‹ lá»«a Ä‘áº£o lÃ  má»™t cháº¥n thÆ°Æ¡ng tÃ¢m lÃ½ thá»±c sá»±.'
                    : 'High-tech criminals use sophisticated psychological manipulation techniques (Deepfake, identity blackmail) that make it impossible for the human brain to react in time. Being scammed is a real psychological trauma.'}
                </p>
                
                <div className="space-y-4">
                   <div className="bg-black/50 p-4 rounded-xl border-l-4 border-blue-500">
                     <h3 className="font-bold text-blue-400 mb-1">{lang === 'vi' ? '1. Dá»«ng má»i liÃªn láº¡c' : '1. Stop all contact'}</h3>
                     <p className="text-sm text-gray-400">
                        {lang === 'vi' ? 'KhÃ´ng cá»‘ gáº¯ng tranh cÃ£i hay Ä‘Ã¡p á»©ng yÃªu cáº§u chuyá»ƒn thÃªm tiá»n. Block thá»§ pháº¡m ngay láº­p tá»©c.' : 'Do not try to argue or meet requests for more money. Block the perpetrator immediately.'}
                     </p>
                   </div>
                   <div className="bg-black/50 p-4 rounded-xl border-l-4 border-emerald-500">
                     <h3 className="font-bold text-emerald-400 mb-1">{lang === 'vi' ? '2. Báº£o vá»‡ tÃ i sáº£n cÃ²n láº¡i' : '2. Protect remaining assets'}</h3>
                     <p className="text-sm text-gray-400">
                        {lang === 'vi' ? 'KhoÃ¡ tháº» ngÃ¢n hÃ ng, Ä‘á»•i máº­t kháº©u email vÃ  tÃ i khoáº£n MXH quan trá»ng tá»« thiáº¿t bá»‹ khÃ¡c.' : 'Lock bank cards, change passwords for email and important social accounts from another device.'}
                     </p>
                   </div>
                   <div className="bg-black/50 p-4 rounded-xl border-l-4 border-purple-500">
                     <h3 className="font-bold text-purple-400 mb-1">{lang === 'vi' ? '3. TÃ¬m Ä‘iá»ƒm tá»±a an toÃ n' : '3. Find a safe support'}</h3>
                     <p className="text-sm text-gray-400">
                        {lang === 'vi' ? 'HÃ£y nÃ³i chuyá»‡n vá»›i ngÆ°á»i mÃ  báº¡n tin tÆ°á»Ÿng nháº¥t. Chia sáº» Ä‘á»ƒ giáº£m bá»›t gÃ¡nh náº·ng cáº£m giÃ¡c tá»™i lá»—i.' : 'Talk to the person you trust the most. Share to reduce the burden of guilt.'}
                     </p>
                   </div>
                </div>
              </div>
              

               <div className="space-y-6">
                 <h3 className="text-xl font-bold text-white uppercase tracking-widest flex items-center gap-2">
                   <ShieldCheck className="text-primary" size={24} />
                   {t.contact_support}
                 </h3>
                 
                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                   {/* NCSC Report */}
                   <a href="https://canhbao.ncsc.gov.vn" target="_blank" rel="noopener noreferrer" className="bg-blue-500/10 border border-blue-500/20 p-5 rounded-2xl hover:bg-blue-500/20 transition-all group">
                      <div className="flex items-center justify-between mb-3">
                         <div className="flex items-center gap-3">
                            <div className="bg-blue-500/20 p-2 rounded-lg text-blue-500">
                               <ShieldAlert size={20} />
                            </div>
                            <h4 className="font-bold text-blue-400 text-sm uppercase">{t.btn_ncsc_report}</h4>
                         </div>
                         <ExternalLink size={14} className="text-gray-600 group-hover:text-blue-500" />
                      </div>
                      <p className="text-xs text-gray-400">{lang === 'vi' ? 'Cá»•ng cáº£nh bÃ¡o an toÃ n thÃ´ng tin Viá»‡t Nam (NCSC Viá»‡t Nam).' : 'Vietnam Information Security Warning Portal (NCSC Vietnam).'}</p>
                   </a>

                   {/* ChongLuaDao */}
                   <a href="https://chongluadao.vn" target="_blank" rel="noopener noreferrer" className="bg-green-500/10 border border-green-500/20 p-5 rounded-2xl hover:bg-green-500/20 transition-all group">
                      <div className="flex items-center justify-between mb-3">
                         <div className="flex items-center gap-3">
                            <div className="bg-green-500/20 p-2 rounded-lg text-green-500">
                               <ShieldCheck size={20} />
                            </div>
                            <h4 className="font-bold text-green-400 text-sm uppercase">{t.btn_chongluadao_report}</h4>
                         </div>
                         <ExternalLink size={14} className="text-gray-600 group-hover:text-green-500" />
                      </div>
                      <p className="text-xs text-gray-400">{lang === 'vi' ? 'Dá»± Ã¡n cá»™ng Ä‘á»“ng báº£o vá»‡ ngÆ°á»i dÃ¹ng khá»i website Ä‘á»™c háº¡i vÃ  lá»«a Ä‘áº£o.' : 'Community project protecting users from malicious and scam websites.'}</p>
                   </a>

                   {/* A05 Hotline */}
                   <div className="bg-red-500/10 border border-red-500/30 p-5 rounded-2xl hover:bg-red-500/20 transition-all">
                      <div className="flex items-center gap-3 mb-3">
                         <div className="bg-red-500/20 p-2 rounded-lg text-red-600">
                            <Phone size={20} />
                         </div>
                         <h4 className="font-bold text-red-500 text-sm uppercase">{t.btn_a05_hotline}</h4>
                      </div>
                      <p className="text-xs text-gray-400 mb-4">{lang === 'vi' ? 'ÄÆ°á»ng dÃ¢y nÃ³ng Cá»¥c An ninh máº¡ng & PhÃ²ng chá»‘ng tá»™i pháº¡m cÃ´ng nghá»‡ cao.' : 'Hotline of the Cyber Security and High-Tech Crime Prevention Department.'}</p>
                      <a href="tel:0692194053" className="text-white font-black text-lg tracking-widest hover:text-red-500 transition-colors">069.219.4053</a>
                   </div>

                   {/* Safe Browsing */}
                   <a href="https://safebrowsing.google.com/safebrowsing/report_phish/" target="_blank" rel="noopener noreferrer" className="bg-white/5 border border-white/20 p-5 rounded-2xl hover:bg-white/10 transition-all group">
                      <div className="flex items-center justify-between mb-3">
                         <div className="flex items-center gap-3">
                            <div className="bg-white/20 p-2 rounded-lg text-white">
                               <Globe size={20} />
                            </div>
                            <h4 className="font-bold text-gray-200 text-sm uppercase">{t.btn_safebrowsing_report}</h4>
                         </div>
                         <ExternalLink size={14} className="text-gray-400 group-hover:text-white" />
                      </div>
                      <p className="text-xs text-gray-400">{lang === 'vi' ? 'BÃ¡o cÃ¡o website lá»«a Ä‘áº£o trá»±c tiáº¿p cho Google Ä‘á»ƒ báº£o vá»‡ ngÆ°á»i dÃ¹ng toÃ n cáº§u.' : 'Report phishing sites directly to Google to protect global users.'}</p>
                   </a>

                   {/* VNeID (Now with Link) */}
                   <a href="https://vneid.gov.vn/" target="_blank" rel="noopener noreferrer" className="bg-yellow-500/10 border border-yellow-500/20 p-5 rounded-2xl hover:bg-yellow-500/20 transition-all group">
                      <div className="flex items-center justify-between mb-3">
                         <div className="flex items-center gap-3">
                            <div className="bg-yellow-500/20 p-2 rounded-lg text-yellow-500">
                               <FileText size={20} />
                            </div>
                            <h4 className="font-bold text-yellow-400 text-sm uppercase">VNeID PORTAL</h4>
                         </div>
                         <ExternalLink size={14} className="text-gray-600 group-hover:text-yellow-500" />
                      </div>
                      <p className="text-xs text-gray-500 italic">{t.vneid_desc}</p>
                   </a>

                   {/* Zalo OA (Now with Link) */}
                   <a href="https://zalo.me/ncscvn" target="_blank" rel="noopener noreferrer" className="bg-cyan-500/10 border border-cyan-500/20 p-5 rounded-2xl hover:bg-cyan-500/20 transition-all group">
                      <div className="flex items-center justify-between mb-3">
                         <div className="flex items-center gap-3">
                            <div className="bg-cyan-500/20 p-2 rounded-lg text-cyan-500">
                               <Search size={20} />
                            </div>
                            <h4 className="font-bold text-cyan-400 text-sm uppercase">ZALO OA NCSC</h4>
                         </div>
                         <ExternalLink size={14} className="text-gray-600 group-hover:text-cyan-500" />
                      </div>
                      <p className="text-xs text-gray-500 italic">{t.zalo_oa_desc}</p>
                   </a>

                   {/* FBI IC3 */}
                   <a href="https://www.ic3.gov/" target="_blank" rel="noopener noreferrer" className="bg-gray-800/40 border border-white/30 p-5 rounded-2xl hover:border-primary transition-all group sm:col-span-2">
                      <div className="flex items-center justify-between mb-3">
                         <div className="flex items-center gap-3">
                            <div className="bg-gray-700 p-2 rounded-lg text-white">
                               <Search size={20} />
                            </div>
                            <h4 className="font-bold text-white text-sm uppercase">{t.btn_ic3_report}</h4>
                         </div>
                         <ExternalLink size={14} className="text-white group-hover:text-primary" />
                      </div>
                      <p className="text-xs text-gray-300 font-medium">{lang === 'vi' ? 'Trung tÃ¢m Khiáº¿u náº¡i Tá»™i pháº¡m Internet cá»§a FBI. ChuyÃªn tiáº¿p nháº­n cÃ¡c vá»¥ lá»«a Ä‘áº£o xuyÃªn biÃªn giá»›i quy mÃ´ lá»›n.' : 'FBI Internet Crime Complaint Center. Specialized in large-scale cross-border fraud.'}</p>
                   </a>
                 </div>
               </div>
           </div>
        )}

        {/* TAB 2: REPORT PDF / ÄÆ N Tá» GIÃC */}
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
                   {lang === 'vi' ? 'Nháº­p thÃ´ng tin tá»‘ giÃ¡c' : 'Enter incident details'}
                </h2>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-gray-400 text-sm mb-2 font-mono uppercase">Há» vÃ  tÃªn ngÆ°á»i tá»‘ giÃ¡c</label>
                    <input type="text" name="fullName" value={formData.fullName} onChange={handleInputChange} className="w-full bg-black/60 border border-white/10 rounded-xl p-3 text-white focus:outline-none focus:border-red-500 transition-colors" placeholder="Nguyá»…n VÄƒn A" />
                  </div>
                  <div>
                    <label className="block text-gray-400 text-sm mb-2 font-mono uppercase">TÃªn náº¡n nhÃ¢n (náº¿u lÃ m thay)</label>
                    <input type="text" name="victimName" value={formData.victimName} onChange={handleInputChange} className="w-full bg-black/60 border border-white/10 rounded-xl p-3 text-white focus:outline-none focus:border-red-500 transition-colors" placeholder="Tráº§n Thá»‹ B" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-gray-400 text-sm mb-2 font-mono uppercase">NgÃ y xáº£y ra sá»± viá»‡c</label>
                      <input type="date" name="incidentDate" value={formData.incidentDate} onChange={handleInputChange} className="w-full bg-black/60 border border-white/10 rounded-xl p-3 text-white focus:outline-none focus:border-red-500 transition-colors [color-scheme:dark]" />
                    </div>
                    <div>
                      <label className="block text-gray-400 text-sm mb-2 font-mono uppercase">Sá»‘ tiá»n thiá»‡t háº¡i</label>
                      <input type="text" name="lossAmount" value={formData.lossAmount} onChange={handleInputChange} className="w-full bg-black/60 border border-white/10 rounded-xl p-3 text-white focus:outline-none focus:border-red-500 transition-colors" placeholder="VÃ­ dá»¥: 50.000.000 VNÄ" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-gray-400 text-sm mb-2 font-mono uppercase">ThÃ´ng tin káº» lá»«a Ä‘áº£o</label>
                    <textarea name="scammerInfo" value={formData.scammerInfo} onChange={handleInputChange} rows={2} className="w-full bg-black/60 border border-white/10 rounded-xl p-3 text-white focus:outline-none focus:border-red-500 transition-colors resize-none" placeholder="TÃ i khoáº£n ngÃ¢n hÃ ng, UID máº¡ng xÃ£ há»™i, sá»‘ Ä‘iá»‡n thoáº¡i..."></textarea>
                  </div>
                  <div>
                    <label className="block text-gray-400 text-sm mb-2 font-mono uppercase">TÃ³m táº¯t sá»± viá»‡c</label>
                    <textarea name="description" value={formData.description} onChange={handleInputChange} rows={4} className="w-full bg-black/60 border border-white/10 rounded-xl p-3 text-white focus:outline-none focus:border-red-500 transition-colors resize-none" placeholder="TrÃ¬nh bÃ y ngáº¯n gá»n quÃ¡ trÃ¬nh bá»‹ lá»«a Ä‘áº£o..."></textarea>
                  </div>
                </div>

                <div className="mt-8 flex gap-4">
                  <button 
                    onClick={handlePrintPdf}
                    className="flex-1 bg-red-600 hover:bg-red-500 text-white p-4 rounded-xl font-bold uppercase tracking-widest transition-colors flex items-center justify-center gap-2"
                  >
                    <Download size={20} />
                    {lang === 'vi' ? 'Táº¢I PDF / IN Báº¢N Cá»¨NG' : 'DOWNLOAD PDF / PRINT'}
                  </button>
                </div>
              </div>

              {/* PREVIEW Báº¢N IN PDF */}
              <div className="bg-white text-black p-8 md:p-12 print:p-0 min-h-[800px] shadow-2xl relative">
                {/* STYLE CHá»ˆ DÃ™NG KHI IN */}
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
                    <h2 className="text-xl uppercase">Cá»™ng HÃ²a XÃ£ Há»™i Chá»§ NghÄ©a Viá»‡t Nam</h2>
                    <h3 className="text-lg underline underline-offset-4">Äá»™c láº­p - Tá»± do - Háº¡nh phÃºc</h3>
                  </div>

                  <div className="text-center font-bold mb-8">
                    <h1 className="text-2xl uppercase">ÄÆ N TRÃŒNH BÃO / Tá» GIÃC Tá»˜I PHáº M</h1>
                    <p className="italic font-normal">(V/v: Lá»«a Ä‘áº£o chiáº¿m Ä‘oáº¡t tÃ i sáº£n trÃªn khÃ´ng gian máº¡ng)</p>
                  </div>

                  <div className="mb-6 font-bold">
                    <p>KÃ­nh gá»­i: CÆ¡ quan Cáº£nh sÃ¡t Ä‘iá»u tra (PC02/PA05) - CÃ´ng an ......................</p>
                  </div>

                  <div className="space-y-4 text-justify leading-relaxed">
                    <p>TÃ´i tÃªn lÃ : <span className="font-bold">{formData.fullName || '(Há» tÃªn ngÆ°á»i lÃ m Ä‘Æ¡n)'}</span></p>
                    <p>LÃ m Ä‘Æ¡n tá»‘ giÃ¡c/trÃ¬nh bÃ¡o sá»± viá»‡c xáº£y ra Ä‘á»‘i vá»›i náº¡n nhÃ¢n: <span className="font-bold">{formData.victimName || formData.fullName || '(TÃªn náº¡n nhÃ¢n)'}</span></p>
                    <p>VÃ o ngÃ y: <span className="font-bold">{formData.incidentDate || '(NgÃ y xáº£y ra sá»± viá»‡c)'}</span></p>
                    <p>Ná»™i dung sá»± viá»‡c nhÆ° sau:</p>
                    <div className="border border-gray-300 p-4 min-h-[100px] whitespace-pre-wrap">
                      {formData.description || '(Chi tiáº¿t sá»± viá»‡c chÆ°a Ä‘Æ°á»£c nháº­p...)'}
                    </div>
                    
                    <p className="mt-4">Tá»•ng sá»‘ tÃ i sáº£n bá»‹ chiáº¿m Ä‘oáº¡t (Æ°á»›c tÃ­nh): <span className="font-bold text-red-600">{formData.lossAmount || '(Sá»‘ tiá»n)'}</span></p>
                    
                    <p className="mt-4">ThÃ´ng tin Ä‘á»‘i tÆ°á»£ng lá»«a Ä‘áº£o (TÃ i khoáº£n ngÃ¢n hÃ ng, UID, Sá»‘ Ä‘iá»‡n thoáº¡i...):</p>
                    <div className="border border-gray-300 p-4 min-h-[60px] whitespace-pre-wrap">
                      {formData.scammerInfo || '(ThÃ´ng tin káº» lá»«a Ä‘áº£o chÆ°a Ä‘Æ°á»£c nháº­p...)'}
                    </div>
                    <p className="mt-8">TÃ´i cam Ä‘oan nhá»¯ng sá»± viá»‡c trÃ¬nh bÃ y trong Ä‘Æ¡n lÃ  hoÃ n toÃ n Ä‘Ãºng sá»± tháº­t vÃ  chá»‹u trÃ¡ch nhiá»‡m trÆ°á»›c phÃ¡p luáº­t vá» nhá»¯ng lá»i trÃ¬nh bÃ y Ä‘Ã³.</p>
                  </div>

                  <div className="mt-12 flex justify-between px-8">
                    <div className="text-center">
                      <p>NÆ¡i nháº­n:</p>
                      <p className="italic">- NhÆ° trÃªn;</p>
                      <p className="italic">- LÆ°u: CSÄT.</p>
                    </div>
                    <div className="text-center">
                      <p>......, ngÃ y ..... thÃ¡ng ..... nÄƒm 20...</p>
                      <p className="font-bold mt-2">NGÆ¯á»œI LÃ€M ÄÆ N</p>
                      <p className="italic">(KÃ½ vÃ  ghi rÃµ há» tÃªn)</p>
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
