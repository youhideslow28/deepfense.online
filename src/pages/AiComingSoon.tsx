
import React from 'react';
import { Cpu, Fingerprint, ScanEye, Shield, Smartphone, FileSearch, ArrowRight, ArrowDown, Video, Mic, UploadCloud, Eye, BrainCircuit, Play, Map, GraduationCap, MonitorSmartphone, SmartphoneNfc, Rocket } from 'lucide-react';
import { Language } from '@/types';

interface AiComingSoonProps {
  lang: Language;
}

const AiComingSoon: React.FC<AiComingSoonProps> = ({ lang }) => {
  return (
    <div className="max-w-7xl mx-auto animate-in fade-in duration-500">
      
      {/* Header */}
      <div className="text-center mb-16 px-4">
        <div className="inline-flex items-center gap-2 bg-purple-500/10 text-purple-400 border border-purple-500/30 px-4 py-1 rounded-full text-xs font-bold mb-4 animate-pulse">
            <Cpu size={14} /> {lang === 'vi' ? 'Dá»° ÃN ÄANG PHÃT TRIá»‚N' : 'PROJECT UNDER DEVELOPMENT'}
        </div>
        <h1 className="text-4xl md:text-6xl font-black text-white mb-4 tracking-tight">
          DEEPFENSE<span className="text-purple-500"> AI</span>
        </h1>
        <p className="text-lg md:text-xl text-white font-mono mb-6 bg-surface inline-block px-4 py-2 rounded border border-gray-800">
             {lang === 'vi' ? '"Khi AI táº¥n cÃ´ng, hÃ£y dÃ¹ng AI Ä‘á»ƒ phÃ²ng thá»§."' : '"When AI attacks, use AI to defend."'}
        </p>
        <p className="text-gray-400 max-w-2xl mx-auto text-base md:text-lg">
          {lang === 'vi' 
            ? 'Há»‡ thá»‘ng phÃ²ng thá»§ chá»§ Ä‘á»™ng sá»­ dá»¥ng trÃ­ tuá»‡ nhÃ¢n táº¡o Ä‘á»ƒ quÃ©t, phÃ¢n tÃ­ch vÃ  ngÄƒn cháº·n cÃ¡c cuá»™c táº¥n cÃ´ng Deepfake theo thá»i gian thá»±c.'
            : 'Active defense system using artificial intelligence to scan, analyze and prevent Deepfake attacks in real-time.'}
        </p>
      </div>

      {/* Logic Flowchart Diagram (Responsive: Vertical on Mobile, Horizontal on Desktop) */}
      <div className="mb-24 px-4">
        <h3 className="text-center font-bold text-gray-500 mb-10 font-mono tracking-widest uppercase flex items-center justify-center gap-2">
             <BrainCircuit /> {lang === 'vi' ? 'CÆ  CHáº¾ HOáº T Äá»˜NG Tá»”NG THá»‚' : 'OVERALL OPERATING MECHANISM'}
        </h3>
        
        {/* Flex container for flow */}
        <div className="flex flex-col lg:flex-row items-center justify-center gap-6 md:gap-8">
            
            {/* STEP 1: INPUTS */}
            <div className="flex flex-col gap-4 w-full md:w-auto">
                <div className="text-xs font-bold text-gray-500 text-center mb-2 tracking-widest uppercase">{lang === 'vi' ? 'NGUá»’N Dá»® LIá»†U' : 'DATA SOURCES'}</div>
                
                <div className="bg-surface p-4 rounded-xl border border-gray-700 w-full md:w-56 hover:border-blue-500 transition-colors flex items-center gap-4 shadow-lg group">
                    <div className="bg-blue-500/20 p-3 rounded-lg text-blue-400 group-hover:scale-110 transition-transform"><Smartphone size={24}/></div>
                    <div className="flex flex-col">
                        <span className="text-sm font-bold text-white">VIDEO CALL</span>
                        <span className="text-[10px] text-gray-500">Zalo/Messenger/Tele</span>
                    </div>
                </div>

                <div className="bg-surface p-4 rounded-xl border border-gray-700 w-full md:w-56 hover:border-green-500 transition-colors flex items-center gap-4 shadow-lg group">
                    <div className="bg-green-500/20 p-3 rounded-lg text-green-400 group-hover:scale-110 transition-transform"><UploadCloud size={24}/></div>
                    <div className="flex flex-col">
                        <span className="text-sm font-bold text-white">VIDEO FILE</span>
                        <span className="text-[10px] text-gray-500">Upload MP4/MOV</span>
                    </div>
                </div>

                <div className="bg-surface p-4 rounded-xl border border-gray-700 w-full md:w-56 hover:border-yellow-500 transition-colors flex items-center gap-4 shadow-lg group">
                    <div className="bg-yellow-500/20 p-3 rounded-lg text-yellow-400 group-hover:scale-110 transition-transform"><Mic size={24}/></div>
                    <div className="flex flex-col">
                        <span className="text-sm font-bold text-white">{lang === 'vi' ? 'Ã‚M THANH' : 'AUDIO'}</span>
                        <span className="text-[10px] text-gray-500">Voice Chat/Ghi Ã¢m</span>
                    </div>
                </div>
            </div>

            {/* Connector 1 */}
            <div className="flex flex-col items-center justify-center">
                 {/* Show arrow right on Desktop, arrow down on Mobile */}
                 <div className="hidden lg:block w-12 h-1 bg-gradient-to-r from-gray-700 to-purple-500 rounded-full relative">
                    <div className="absolute -right-2 top-1/2 -translate-y-1/2 text-purple-500 animate-pulse"><ArrowRight /></div>
                 </div>
                 <div className="block lg:hidden h-12 w-1 bg-gradient-to-b from-gray-700 to-purple-500 rounded-full relative">
                    <div className="absolute bottom-[-10px] left-1/2 -translate-x-1/2 text-purple-500 animate-pulse"><ArrowDown /></div>
                 </div>
            </div>

            {/* STEP 2: AI PROCESSING CORE */}
            <div className="relative flex flex-col items-center w-full md:w-auto">
                <div className="text-xs font-bold text-purple-500 text-center mb-4 tracking-widest uppercase">DEEPFENSE CORE ENGINE</div>
                
                <div className="bg-black/80 backdrop-blur-xl p-1 rounded-2xl border-2 border-purple-500 shadow-[0_0_50px_rgba(168,85,247,0.2)] w-full md:w-auto">
                    <div className="bg-gray-900 rounded-xl p-6 w-full md:w-80 flex flex-col gap-4 relative overflow-hidden">
                        {/* Scan effect inside */}
                        <div className="absolute top-0 left-0 w-full h-1 bg-purple-500 shadow-[0_0_10px_#a855f7] animate-[scan_2s_ease-in-out_infinite]"></div>
                        
                        <div className="bg-black/60 p-3 rounded border border-purple-500/30 flex items-center gap-3">
                            <BrainCircuit className="text-purple-400" size={20} />
                            <div>
                                <div className="text-xs font-bold text-white">{lang === 'vi' ? 'PHÃ‚N TÃCH Máº NG NÆ -RON' : 'NEURAL DISCRIMINATOR'}</div>
                                <div className="text-[9px] text-gray-500">{lang === 'vi' ? 'QuÃ©t nhiá»…u khÃ´ng gian tiá»m áº©n (Latent Space)' : 'Detecting GAN & Diffusion artifacts'}</div>
                            </div>
                        </div>

                        <div className="bg-black/60 p-3 rounded border border-blue-500/30 flex items-center gap-3">
                            <Fingerprint className="text-blue-400" size={20} />
                            <div>
                                <div className="text-xs font-bold text-white">{lang === 'vi' ? 'XÃC THá»°C C2PA & WATERMARK' : 'C2PA & WATERMARK AUTH'}</div>
                                <div className="text-[9px] text-gray-500">{lang === 'vi' ? 'Truy xuáº¥t chá»¯ kÃ½ sá»‘ vÃ  nguá»“n gá»‘c tá»‡p' : 'Cryptographic provenance verification'}</div>
                            </div>
                        </div>

                        <div className="bg-black/60 p-3 rounded border border-green-500/30 flex items-center gap-3">
                            <ActivityIcon className="text-green-400" size={20} />
                            <div>
                                <div className="text-xs font-bold text-white">{lang === 'vi' ? 'BIá»‚U HIá»†N TRUNG THá»°C' : 'PHYSIOLOGICAL TRUTH'}</div>
                                <div className="text-[9px] text-gray-500">{lang === 'vi' ? 'QuÃ©t máº¡ch mÃ¡u rPPG & Vi rung Ä‘á»™ng' : 'rPPG heart-rate & Micro-vibrations'}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Connector 2 */}
             <div className="flex flex-col items-center justify-center">
                 {/* Show arrow right on Desktop, arrow down on Mobile */}
                 <div className="hidden lg:block w-12 h-1 bg-gradient-to-r from-purple-500 to-red-500 rounded-full relative">
                     <div className="absolute -right-2 top-1/2 -translate-y-1/2 text-red-500 animate-pulse"><ArrowRight /></div>
                 </div>
                 <div className="block lg:hidden h-12 w-1 bg-gradient-to-b from-purple-500 to-red-500 rounded-full relative">
                     <div className="absolute bottom-[-10px] left-1/2 -translate-x-1/2 text-red-500 animate-pulse"><ArrowDown /></div>
                 </div>
            </div>

            {/* STEP 3: OUTPUT */}
            <div className="flex flex-col gap-4 w-full md:w-auto items-center md:items-start">
                <div className="text-xs font-bold text-gray-500 text-center mb-2 tracking-widest uppercase">{lang === 'vi' ? 'Káº¾T QUáº¢ & HÃ€NH Äá»˜NG' : 'RESULTS & ACTIONS'}</div>
                
                <div className="bg-gradient-to-br from-gray-900 to-black p-6 rounded-2xl border-2 border-red-500/50 w-full md:w-64 text-center relative overflow-hidden shadow-[0_0_30px_rgba(255,0,0,0.15)] group">
                    <div className="absolute inset-0 bg-red-500/5 animate-pulse"></div>
                    
                    <div className="flex justify-center mb-4">
                        <div className="bg-red-500/10 p-4 rounded-full border border-red-500/50 group-hover:scale-110 transition-transform">
                             <Shield className="text-red-500" size={48} />
                        </div>
                    </div>
                    
                    <div className="text-4xl font-black text-white mb-1">99.9%</div>
                    <div className="text-xs font-bold text-red-400 tracking-wider mb-4">{lang === 'vi' ? 'PHÃT HIá»†N GIáº¢ Máº O' : 'FAKE DETECTION'}</div>
                    
                    <div className="flex flex-col gap-2 text-[10px] text-left bg-black/60 p-3 rounded border border-gray-800">
                        <div className="flex items-center gap-2 text-red-300"><ArrowRight size={10}/> {lang === 'vi' ? 'Cáº£nh bÃ¡o ngÆ°á»i dÃ¹ng ngay láº­p tá»©c' : 'Alert user immediately'}</div>
                        <div className="flex items-center gap-2 text-gray-400"><ArrowRight size={10}/> {lang === 'vi' ? 'Tá»± Ä‘á»™ng ngáº¯t káº¿t ná»‘i (TÃ¹y chá»n)' : 'Auto-disconnect (Optional)'}</div>
                    </div>
                </div>
            </div>

        </div>
      </div>

      {/* Hero Solutions Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20 px-4">
          
          {/* Solution 1: Assistive Touch */}
          <div className="bg-surface border border-gray-800 rounded-xl p-6 md:p-8 hover:border-purple-500 transition-colors group relative overflow-hidden">
              <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
                  <Smartphone size={150} />
              </div>
              <div className="flex items-center gap-4 mb-6">
                  <div className="bg-purple-500/20 p-3 rounded-full text-purple-400 shrink-0">
                      <ScanEye size={32} />
                  </div>
                  <div>
                      <h3 className="text-xl md:text-2xl font-bold text-white">DEEPFENSE TOUCH</h3>
                      <p className="text-xs text-purple-400 font-mono">ON-SCREEN SHIELD</p>
                  </div>
              </div>
              <p className="text-gray-300 mb-6 leading-relaxed text-sm md:text-base">
                  {lang === 'vi' 
                    ? 'Má»™t nÃºt áº£o (Assistive Touch) luÃ´n hiá»‡n diá»‡n trÃªn mÃ n hÃ¬nh Ä‘iá»‡n thoáº¡i cá»§a báº¡n. Khi cÃ³ cuá»™c gá»i video Ä‘áº¿n, chá»‰ cáº§n 1 cháº¡m, AI sáº½ quÃ©t toÃ n bá»™ mÃ n hÃ¬nh theo thá»i gian thá»±c Ä‘á»ƒ tÃ¬m kiáº¿m dáº¥u hiá»‡u giáº£ máº¡o mÃ  máº¯t thÆ°á»ng khÃ´ng tháº¥y.'
                    : 'A virtual button (Assistive Touch) always present on your phone screen. When a video call arrives, with just 1 tap, AI scans the entire screen in real-time to find deepfake signs invisible to the naked eye.'}
              </p>
              <ul className="space-y-3 text-sm text-gray-400">
                  <li className="flex gap-2 items-center"><span className="w-1.5 h-1.5 bg-purple-500 rounded-full shrink-0"></span> {lang === 'vi' ? 'Tá»± Ä‘á»™ng kÃ­ch hoáº¡t khi cÃ³ cuá»™c gá»i Zalo/Messenger' : 'Auto-activate for Zalo/Messenger calls'}</li>
                  <li className="flex gap-2 items-center"><span className="w-1.5 h-1.5 bg-purple-500 rounded-full shrink-0"></span> {lang === 'vi' ? 'PhÃ¢n tÃ­ch vi biá»ƒu cáº£m (Micro-expressions)' : 'Micro-expressions analysis'}</li>
                  <li className="flex gap-2 items-center"><span className="w-1.5 h-1.5 bg-purple-500 rounded-full shrink-0"></span> {lang === 'vi' ? 'Cáº£nh bÃ¡o Ä‘á» ngay trÃªn khuÃ´n máº·t giáº£' : 'Red alert directly on fake face'}</li>
              </ul>
          </div>

          {/* Solution 2: Browser Extension */}
          <div className="bg-surface border border-gray-800 rounded-xl p-6 md:p-8 hover:border-emerald-500 transition-colors group relative overflow-hidden">
              <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
                  <MonitorSmartphone size={150} />
              </div>
              <div className="flex items-center gap-4 mb-6">
                  <div className="bg-emerald-500/20 p-3 rounded-full text-emerald-400 shrink-0">
                      <MonitorSmartphone size={32} />
                  </div>
                  <div>
                      <h3 className="text-xl md:text-2xl font-bold text-white">DEEPFENSE EXTENSION</h3>
                      <p className="text-xs text-emerald-400 font-mono">{lang === 'vi' ? 'BROWSER GUARDIAN' : 'BROWSER GUARDIAN'}</p>
                  </div>
              </div>
              <p className="text-gray-300 mb-6 leading-relaxed text-sm md:text-base">
                  {lang === 'vi' 
                    ? 'Má»™t tiá»‡n Ã­ch má»Ÿ rá»™ng (Extension) máº¡nh máº½ dÃ nh cho Chrome, Edge vÃ  Safari. AI sáº½ hoáº¡t Ä‘á»™ng nhÆ° má»™t lá»›p mÃ ng lá»c báº£o vá»‡ trá»±c tiáº¿p trÃªn trÃ¬nh duyá»‡t cá»§a báº¡n, tá»± Ä‘á»™ng phÃ¢n tÃ­ch má»i ná»™i dung Ä‘a phÆ°Æ¡ng tiá»‡n khi báº¡n lÆ°á»›t web, giÃºp ngÄƒn cháº·n lá»«a Ä‘áº£o ngay tá»« nguá»“n phÃ¡t.'
                    : 'A powerful browser extension for Chrome, Edge, and Safari. AI acts as a direct filtering shield on your browser, automatically analyzing all multimedia content as you surf the web, stopping scams at the source.'}
              </p>
              <ul className="space-y-3 text-sm text-gray-400">
                  <li className="flex gap-2 items-center"><span className="w-1.5 h-1.5 bg-emerald-500 rounded-full shrink-0"></span> {lang === 'vi' ? 'QuÃ©t Deepfake thá»i gian thá»±c trÃªn YouTube, Facebook, X (Twitter)' : 'Real-time Deepfake scanning on YouTube, Facebook, X'}</li>
                  <li className="flex gap-2 items-center"><span className="w-1.5 h-1.5 bg-emerald-500 rounded-full shrink-0"></span> {lang === 'vi' ? 'Cáº£nh bÃ¡o Website giáº£ máº¡o cÆ¡ quan nhÃ  nÆ°á»›c & trang lá»«a Ä‘áº£o' : 'Anti-Phishing: Alerts for fake government & scam websites'}</li>
                  <li className="flex gap-2 items-center"><span className="w-1.5 h-1.5 bg-emerald-500 rounded-full shrink-0"></span> {lang === 'vi' ? 'TÃ­ch há»£p kiá»ƒm tra nguá»“n gá»‘c hÃ¬nh áº£nh qua chá»¯ kÃ½ sá»‘ C2PA' : 'Integrated provenance check via C2PA digital signatures'}</li>
              </ul>
          </div>
      </div>

      {/* Roadmap Section */}
      <div className="mb-24 max-w-[100vw] overflow-hidden">
        <h3 className="text-center font-bold text-gray-500 mb-8 md:mb-12 font-mono tracking-widest uppercase flex items-center justify-center gap-3 px-4">
             <Map size={24} className="text-purple-500" /> 
             {lang === 'vi' ? 'Lá»˜ TRÃŒNH PHÃT TRIá»‚N (Q4/2025 - Q4/2027)' : 'DEVELOPMENT ROADMAP (Q4/2025 - Q4/2027)'}
        </h3>
        
        {/* Responsive Container: Vertical on Mobile, Horizontal on Desktop */}
        <div 
            className="pb-12 pt-4 px-4 md:px-8"
        >
            <div className="flex flex-col md:flex-row gap-8 md:gap-5 relative items-stretch max-w-5xl mx-auto">
                {/* Continuous Connecting Line - Vertical on Mobile, Horizontal on Desktop */}
                <div className="absolute left-[90px] top-0 bottom-0 w-0.5 bg-gradient-to-b from-purple-500 via-yellow-500 to-green-500 opacity-40 md:hidden"></div>
                <div className="absolute top-[9px] left-[90px] right-[90px] h-0.5 bg-gradient-to-r from-purple-500 via-yellow-500 to-green-500 opacity-40 hidden md:block"></div>

                {[
                    {
                        time: "Q4/2025",
                        title: lang === 'vi' ? 'Dá»± Ã¡n GiÃ¡o dá»¥c' : 'Edu Project',
                        desc: lang === 'vi' ? 'Ra máº¯t dá»± Ã¡n & cÃ´ng cá»¥ kiá»ƒm tra rá»§i ro.' : 'Launch project & risk detection tools.',
                        icon: <GraduationCap size={16} className="text-purple-400"/>,
                        borderClass: "border-purple-500",
                        textClass: "text-purple-400",
                        hoverClass: "hover:border-purple-500/50",
                        hoverBg: "group-hover:bg-purple-500",
                        shadowHover: "group-hover:shadow-[0_0_15px_#a855f7]"
                    },
                    {
                        time: "Q1/2026",
                        title: lang === 'vi' ? 'Dá»¯ liá»‡u Thá»±c táº¿' : 'Real Dataset',
                        desc: lang === 'vi' ? 'XÃ¢y dá»±ng kho video Deepfake & cáº£nh bÃ¡o.' : 'Build Deepfake video library & alerts.',
                        icon: <Video size={16} className="text-blue-400"/>,
                        borderClass: "border-blue-500",
                        textClass: "text-blue-400",
                        hoverClass: "hover:border-blue-500/50",
                        hoverBg: "group-hover:bg-blue-500",
                        shadowHover: "group-hover:shadow-[0_0_15px_#3b82f6]"
                    },
                    {
                        time: "Q3/2026",
                        title: lang === 'vi' ? 'Huáº¥n luyá»‡n AI' : 'AI Training',
                        desc: lang === 'vi' ? 'Huáº¥n luyá»‡n Core Engine tá»‘i Æ°u Ä‘á»™ chÃ­nh xÃ¡c.' : 'Train Core Engine for high accuracy.',
                        icon: <BrainCircuit size={16} className="text-cyan-400"/>,
                        borderClass: "border-cyan-500",
                        textClass: "text-cyan-400",
                        hoverClass: "hover:border-cyan-500/50",
                        hoverBg: "group-hover:bg-cyan-500",
                        shadowHover: "group-hover:shadow-[0_0_15px_#06b6d4]"
                    },
                    {
                        time: "Q1/2027",
                        title: lang === 'vi' ? 'Tiá»‡n Ã­ch TrÃ¬nh duyá»‡t' : 'Browser Ext.',
                        desc: lang === 'vi' ? 'Extension quÃ©t video & cáº£nh bÃ¡o web áº£o.' : 'Browser extensions for quick scanning.',
                        icon: <MonitorSmartphone size={16} className="text-yellow-400"/>,
                        borderClass: "border-yellow-500",
                        textClass: "text-yellow-400",
                        hoverClass: "hover:border-yellow-500/50",
                        hoverBg: "group-hover:bg-yellow-500",
                        shadowHover: "group-hover:shadow-[0_0_15px_#eab308]"
                    },
                    {
                        time: "Q4/2027",
                        title: lang === 'vi' ? 'Há»‡ sinh thÃ¡i ToÃ n diá»‡n' : 'Complete Ecosystem',
                        desc: lang === 'vi' ? 'Káº¿t ná»‘i Deepfense trÃªn má»i thiáº¿t bá»‹ vÃ  ná»n táº£ng.' : 'Deepfense connected across all devices.',
                        icon: <SmartphoneNfc size={16} className="text-pink-400"/>,
                        borderClass: "border-pink-500",
                        textClass: "text-pink-400",
                        hoverClass: "hover:border-pink-500/50",
                        hoverBg: "group-hover:bg-pink-500",
                        shadowHover: "group-hover:shadow-[0_0_15px_#ec4899]"
                    }
                ].map((phase, index) => {
                    const isCurrent = index === 1; // Nháº¥n máº¡nh vÃ o Q1/2026
                    return (
                        <div key={index} className="w-full md:w-[220px] relative group flex flex-row md:flex-col items-center md:items-stretch gap-6 md:gap-0">
                            {/* Dot Point */}
                            <div className={`w-5 h-5 rounded-full bg-black border-4 ${phase.borderClass} absolute left-[81px] md:left-1/2 md:-translate-x-1/2 top-1/2 -translate-y-1/2 md:top-0 md:translate-y-0 z-10 ${phase.hoverBg} ${phase.shadowHover} transition-all duration-300 ${isCurrent ? '!w-6 !h-6 flex items-center justify-center' : ''}`}>
                                {isCurrent && <div className="w-1.5 h-1.5 bg-white rounded-full animate-ping"></div>}
                            </div>
                            
                            {/* Card Content - Fixed layout for mobile to not overlap line */}
                            <div className={`md:mt-8 ml-28 md:ml-0 bg-surface ${isCurrent ? 'border border-blue-500/30' : 'border border-gray-800'} p-4 md:p-6 rounded-2xl ${phase.hoverClass} transition-colors flex-1 md:h-full flex flex-col items-center text-center justify-center ${isCurrent ? 'relative overflow-hidden shadow-[0_0_30px_rgba(59,130,246,0.15)]' : ''}`}>
                                {isCurrent && (
                                    <div className="inline-flex bg-blue-500/20 text-blue-400 px-2 py-0.5 rounded-full text-[8px] font-black uppercase tracking-widest mb-2">
                                        {lang === 'vi' ? 'HIá»†N Táº I' : 'CURRENT'}
                                    </div>
                                )}
                                
                                <h4 className={`text-lg md:text-xl font-black text-white mb-2 tracking-tight ${isCurrent ? 'flex items-center gap-1.5' : ''}`}>
                                    {phase.time} {isCurrent && <Video className="text-blue-500" size={16}/>}
                                </h4>
                                
                                <h5 className={`text-[10px] md:text-[11px] font-bold ${phase.textClass} mb-3 uppercase tracking-widest flex items-center justify-center gap-1.5 leading-tight`}>
                                    {!isCurrent && phase.icon} {phase.title}
                                </h5>
                                
                                <p className={`text-gray-400 text-[10px] md:text-xs leading-relaxed text-balance ${isCurrent ? 'font-bold !text-gray-300' : ''}`}>
                                    {phase.desc}
                                </p>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
      </div>

      {/* Vision Statement */}
      <div className="text-center bg-gray-900/50 border border-gray-800 rounded-2xl p-6 md:p-10 backdrop-blur-sm mx-4">
         <Fingerprint className="mx-auto text-gray-600 mb-4" size={48} />
         <h2 className="text-2xl font-bold text-white mb-4">{lang === 'vi' ? 'Táº¦M NHÃŒN TÆ¯Æ NG LAI' : 'FUTURE VISION'}</h2>
         <p className="text-gray-400 max-w-3xl mx-auto italic text-sm md:text-base">
            {lang === 'vi' 
              ? '"Trong tÆ°Æ¡ng lai, Deepfense sáº½ khÃ´ng chá»‰ lÃ  má»™t website, mÃ  lÃ  má»™t tiÃªu chuáº©n an toÃ n báº¯t buá»™c trÃªn má»i thiáº¿t bá»‹ thÃ´ng minh, giá»‘ng nhÆ° dÃ¢y an toÃ n trÃªn xe hÆ¡i váº­y."'
              : '"In the future, Deepfense will not just be a website, but a mandatory safety standard on every smart device, just like seatbelts in cars."'}
         </p>
      </div>

    </div>
  );
};

const ActivityIcon = ({size, className}: {size?: number | string, className?: string}) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></svg>
)

export default AiComingSoon;
