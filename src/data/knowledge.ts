/**
 * DEEPFENSE.ONLINE â€” Knowledge Base Data
 * @copyright 2025 H? Xuân Nguy?n & VKU Project Team
 */

import { Language } from '@/types';

export interface KnowledgeCategory {
  category: string;
  items: { title: string; content: string; }[];
}

export const KNOWLEDGE_BASE: Record<Language, KnowledgeCategory[]> = {
  vi: [
    {
      category: "AI & DEEPFAKE CÄ‚N Báº¢N",
      items: [
        { title: "Deepfake lÃ  gÃ¬?", content: "Sá»± káº¿t há»£p giá»¯a 'Deep learning' vÃ  'Fake'. AI sá»­ dá»¥ng dá»¯ liá»‡u hÃ¬nh áº£nh/giá»ng nÃ³i Ä‘á»ƒ táº¡o ra cÃ¡c ná»™i dung giáº£ máº¡o nhÆ°ng cá»±c ká»³ chÃ¢n thá»±c." },
        { title: "CÆ¡ cháº¿ GANs", content: "Sá»­ dá»¥ng hai máº¡ng AI Ä‘áº¥u vá»›i nhau: má»™t máº¡ng táº¡o giáº£ vÃ  má»™t máº¡ng kiá»ƒm Ä‘á»‹nh, giÃºp táº¡o ra sáº£n pháº©m hoÃ n háº£o nháº¥t." },
        { title: "Diffusion Models", content: "CÃ´ng nghá»‡ táº¡o áº£nh/video tá»« vÄƒn báº£n (Text-to-Video), ná»n táº£ng cho cÃ¡c cÃ´ng cá»¥ nhÆ° Sora vÃ  Midjourney hiá»‡n nay." }
      ]
    },
    {
      category: "Cáº¨M NANG PHÃ’NG CHá»NG",
      items: [
        { title: "Thiáº¿t láº­p Máº­t mÃ£ Gia Ä‘Ã¬nh", content: "Thá»a thuáº­n má»™t tá»« khÃ³a bÃ­ máº­t chá»‰ ngÆ°á»i thÃ¢n biáº¿t Ä‘á»ƒ xÃ¡c thá»±c danh tÃ­nh khi nháº­n cuá»™c gá»i yÃªu cáº§u chuyá»ƒn tiá»n gáº¥p." },
        { title: "Quy táº¯c 10 giÃ¢y", content: "Khi nháº­n cuá»™c gá»i video nghi váº¥n, hÃ£y yÃªu cáº§u Ä‘á»‘i phÆ°Æ¡ng váº«y tay trÆ°á»›c máº·t hoáº·c quay Ä‘áº§u sang trÃ¡i/pháº£i Ä‘á»ƒ kiá»ƒm tra lá»—i pixel." },
        { title: "XÃ¡c thá»±c Äa kÃªnh", content: "Khi nháº­n tin nháº¯n mÆ°á»£n tiá»n, hÃ£y gá»i trá»±c tiáº¿p qua sá»‘ SIM truyá»n thá»‘ng hoáº·c liÃªn láº¡c qua má»™t kÃªnh thá»© ba Ä‘á»ƒ kiá»ƒm tra giá»ng nÃ³i tháº­t." }
      ]
    },
    {
      category: "QUY TRÃŒNH á»¨NG Cá»¨U",
      items: [
        { title: "CÃ¡ch xá»­ lÃ½ tá»©c thÃ¬", content: "Ngáº¯t káº¿t ná»‘i, khÃ´ng chuyá»ƒn tiá»n, thÃ´ng bÃ¡o cho ngÆ°á»i thÃ¢n vÃ  bÃ¡o cÃ¡o ngay cho cÆ¡ quan chá»©c nÄƒng qua VNeID hoáº·c NCSC." },
        { title: "Báº£o vá»‡ báº±ng chá»©ng", content: "Chá»¥p áº£nh mÃ n hÃ¬nh, lÆ°u ghi Ã¢m cuá»™c gá»i vÃ  giá»¯ láº¡i cÃ¡c thÃ´ng tin tÃ i khoáº£n ngÃ¢n hÃ ng cá»§a káº» lá»«a Ä‘áº£o Ä‘á»ƒ phá»¥c vá»¥ Ä‘iá»u tra." },
        { title: "Thu tháº­p Log giao dá»‹ch", content: "LÆ°u láº¡i toÃ n bá»™ mÃ£ giao dá»‹ch ngÃ¢n hÃ ng vÃ  biÃªn lai Ä‘á»ƒ lÃ m cÆ¡ sá»Ÿ cho ngÃ¢n hÃ ng phong tá»a tÃ i khoáº£n lá»«a Ä‘áº£o ká»‹p thá»i." }
      ]
    },
    {
      category: "CÃ”NG NGHá»† GIÃM Äá»ŠNH AI",
      items: [
        { title: "rPPG (Nhá»‹p tim tá»« xa)", content: "Máº¯t ngÆ°á»i khÃ´ng tháº¥y Ä‘Æ°á»£c, nhÆ°ng AI cÃ³ thá»ƒ quÃ©t sá»± thay Ä‘á»•i mÃ u sáº¯c vi mÃ´ cá»§a da theo nhá»‹p tim Ä‘á»ƒ xÃ¡c Ä‘á»‹nh Ä‘Ã³ lÃ  ngÆ°á»i tháº­t." },
        { title: "C2PA (Há»™ chiáº¿u Ná»™i dung)", content: "TiÃªu chuáº©n toÃ n cáº§u giÃºp dÃ¡n nhÃ£n 'nguá»“n gá»‘c' cho hÃ¬nh áº£nh, giÃºp biáº¿t Ä‘Æ°á»£c áº£nh chá»¥p tá»« camera hay táº¡o ra tá»« AI." },
        { title: "PhÃ¢n tÃ­ch Phá»• Ã¢m", content: "AI lá»«a Ä‘áº£o thÆ°á»ng cÃ³ dáº£i táº§n sá»‘ Ã¢m thanh khÃ´ng Ä‘á»u, Ä‘á»ƒ láº¡i cÃ¡c váº¿t nhiá»…u Ä‘áº·c trÆ°ng khi biá»ƒu diá»…n trÃªn biá»ƒu Ä‘á»“ phá»• táº§n sá»‘ (Spectrogram)." }
      ]
    },
    {
      category: "PHÃP LUáº¬T VIá»†T NAM",
      items: [
        { title: "Nghá»‹ Ä‘á»‹nh 13/2023/NÄ-CP", content: "VÄƒn báº£n cao nháº¥t vá» báº£o vá»‡ dá»¯ liá»‡u cÃ¡ nhÃ¢n. Xá»­ lÃ½ dá»¯ liá»‡u sinh tráº¯c há»c trÃ¡i phÃ©p lÃ  hÃ nh vi vi pháº¡m phÃ¡p luáº­t Ä‘áº·c biá»‡t nghiÃªm trá»ng." },
        { title: "Äiá»u 174 Bá»™ luáº­t HÃ¬nh sá»±", content: "Tá»™i lá»«a Ä‘áº£o chiáº¿m Ä‘oáº¡t tÃ i sáº£n báº±ng cÃ´ng nghá»‡ cao cÃ³ khung hÃ¬nh pháº¡t lÃªn Ä‘áº¿n 20 nÄƒm tÃ¹ hoáº·c tÃ¹ chung thÃ¢n." },
        { title: "ThÃ´ng tÆ° 03/2024/TT", content: "Quy Ä‘á»‹nh má»›i vá» viá»‡c gá»¡ bá» thÃ´ng tin sai sá»± tháº­t trÃªn khÃ´ng gian máº¡ng trong vÃ²ng 24 giá» sau khi cÃ³ yÃªu cáº§u tá»« cÆ¡ quan chá»©c nÄƒng." }
      ]
    },
    {
      category: "LUáº¬T PHÃP QUá»C Táº¾",
      items: [
        { title: "Äáº¡o luáº­t AI cá»§a EU", content: "Luáº­t AI Ä‘áº§u tiÃªn tháº¿ giá»›i, yÃªu cáº§u má»i ná»™i dung do AI táº¡o ra (Deepfake) pháº£i Ä‘Æ°á»£c dÃ¡n nhÃ£n minh báº¡ch 'AI-generated'." },
        { title: "TiÃªu chuáº©n Trung Quá»‘c & Má»¹", content: "Cáº£ hai quá»‘c gia Ä‘á»u báº¯t buá»™c nhÃºng watermark (thá»§y vÃ¢n) áº©n vÃ o cÃ¡c sáº£n pháº©m cá»§a cÃ¡c mÃ´ hÃ¬nh AI lá»›n nhÆ° ChatGPT hay Sora." },
        { title: "TrÃ¡ch nhiá»‡m cá»§a Big Tech", content: "CÃ¡c ná»n táº£ng xuyÃªn biÃªn giá»›i (Facebook, TikTok) báº¯t buá»™c pháº£i cÃ³ há»‡ thá»‘ng lá»c tá»± Ä‘á»™ng Deepfake trÆ°á»›c khi chÃºng tiáº¿p cáº­n ngÆ°á»i dÃ¹ng." }
      ]
    },
    {
      category: "Äáº O Äá»¨C AI (UNESCO)",
      items: [
        { title: "Khung Äáº¡o Ä‘á»©c UNESCO", content: "Kháº³ng Ä‘á»‹nh AI pháº£i phá»¥c vá»¥ con ngÆ°á»i, khÃ´ng Ä‘Æ°á»£c xÃ¢m pháº¡m quyá»n riÃªng tÆ° vÃ  pháº£i chá»‹u sá»± kiá»ƒm soÃ¡t cá»§a con ngÆ°á»i (Human Agency)." },
        { title: "Quyá»n báº£o vá»‡ Danh tÃ­nh", content: "Coi khuÃ´n máº·t ká»¹ thuáº­t sá»‘ lÃ  má»™t pháº§n cá»§a nhÃ¢n pháº©m, má»i hÃ nh vi bÃ´i nhá» báº±ng AI lÃ  vi pháº¡m nhÃ¢n quyá»n nghiÃªm trá»ng." },
        { title: "Minh báº¡ch Thuáº­t toÃ¡n", content: "NgÆ°á»i dÃ¹ng cÃ³ quyá»n Ä‘Æ°á»£c biáº¿t táº¡i sao má»™t ná»™i dung AI Ä‘Æ°á»£c gá»£i Ã½ cho há» vÃ  má»¥c Ä‘Ã­ch Ä‘áº±ng sau cÃ¡c thuáº­t toÃ¡n Ä‘á»‹nh hÆ°á»›ng hÃ nh vi." }
      ]
    },
    {
      category: "XU HÆ¯á»šNG & TÆ¯Æ NG LAI",
      items: [
        { title: "Dá»± bÃ¡o 2027", content: "Thiá»‡t háº¡i do lá»«a Ä‘áº£o AI cÃ³ thá»ƒ vÆ°á»£t 40 tá»· USD toÃ n cáº§u. Tin táº·c sáº½ sá»­ dá»¥ng AI tá»± Ä‘á»™ng Ä‘á»ƒ 'táº¥n cÃ´ng theo dÃ¢y chuyá»n'." },
        { title: "Niá»m tin Ká»¹ thuáº­t sá»‘", content: "Xu hÆ°á»›ng chuyá»ƒn dá»‹ch sang cÃ¡c giáº£i phÃ¡p báº£o máº­t phi táº­p trung (Blockchain) Ä‘á»ƒ xÃ¡c thá»±c 'Con ngÆ°á»i tháº­t' thay vÃ¬ chá»‰ dÃ¹ng máº­t kháº©u." },
        { title: "Sá»± trá»—i dáº­y cá»§a AGI", content: "AI tÆ°Æ¡ng lai (AGI) sáº½ cÃ³ kháº£ nÄƒng tá»± tÆ° duy vÃ  láº­p káº¿ hoáº¡ch táº¥n cÃ´ng lá»«a Ä‘áº£o phá»©c táº¡p, Ä‘Ã²i há»i sá»± phÃ²ng thá»§ chá»§ Ä‘á»™ng hÆ¡n tá»« con ngÆ°á»i." }
      ]
    }
  ],
  en: [
    {
      category: "AI & DEEPFAKE BASICS",
      items: [
        { title: "What is Deepfake?", content: "A blend of 'Deep learning' and 'Fake'. AI uses audiovisual data to create highly realistic synthetic content." },
        { title: "How GANs Work", content: "Two AI networks (Generator & Discriminator) compete to create and verify images until they reach perfection." },
        { title: "Diffusion Models", content: "The core technology behind modern text-to-image and video systems like Sora, DALL-E and Midjourney." }
      ]
    },
    {
      category: "PREVENTION GUIDE",
      items: [
        { title: "Family Security Codeword", content: "Establish a secret word known only to your family to verify identities during urgent money requests." },
        { title: "The 10-Second Rule", content: "During suspicious video calls, ask the person to wave their hand or turn their head to check for pixel glitches." },
        { title: "Multi-channel Verification", content: "When receiving of loan requests, call directly via traditional SIM or contact through a third channel to check the real voice." }
      ]
    },
    {
      category: "RESPONSE PLAYBOOK",
      items: [
        { title: "Immediate Actions", content: "Disconnect, do not transfer money, notify relatives, and report via official channels like VNeID or NCSC." },
        { title: "Preserving Evidence", content: "Take screenshots, save call recordings, and keep the fraudster's bank account details for investigation." },
        { title: "Collect Transaction Logs", content: "Save all bank transaction codes and receipts as a basis for the bank to freeze the fraudster's account in time." }
      ]
    },
    {
      category: "FORENSICS TECHNOLOGY",
      items: [
        { title: "rPPG (Remote Heartbeat)", content: "Invisible to humans, AI can scan micro-skin color changes driven by heartbeats to verify real-life status." },
        { title: "C2PA Standards", content: "A global standard for media provenance, labeling whether content is camera-original or AI-generated." },
        { title: "Spectrogram Analysis", content: "Scam AI often has irregular frequency bands, leaving characteristic noise patterns on a spectrogram." }
      ]
    },
    {
      category: "VIETNAM LAW",
      items: [
        { title: "Decree 13/2023/ND-CP", content: "The core legal framework for personal data protection. Unauthorized biometric data processing is a severe violation." },
        { title: "Criminal Code Art 174", content: "Fraudulent property appropriation via high-tech carries penalties up to 20 years or life imprisonment." },
        { title: "Circular 03/2024/TT", content: "New regulation on removing false information online within 24 hours of a Request from authorities." }
      ]
    },
    {
      category: "INTERNATIONAL LAW",
      items: [
        { title: "EU AI Act", content: "The world's first AI law requiring all AI-generated content (Deepfakes) to be transparently labeled." },
        { title: "US & China Labeling Laws", content: "Both nations mandate embedding invisible watermarks into products from major AI models like ChatGPT or Sora." },
        { title: "Big Tech Responsibility", content: "Platforms like Facebook and TikTok are mandated to have automated Deepfake filtering systems before they reach users." }
      ]
    },
    {
      category: "AI ETHICS (UNESCO)",
      items: [
        { title: "UNESCO Framework", content: "Affirms that AI must serve humanity, respect privacy, and remain under human agency and oversight." },
        { title: "Identity Integrity Rights", content: "Treats the digital face as part of human dignity; AI defamation is seen as a major human rights violation." },
        { title: "Algorithm Transparency", content: "Users have the right to know why AI content is suggested to them and the purpose behind the behavioral targeting algorithms." }
      ]
    },
    {
      category: "FUTURE TRENDS",
      items: [
        { title: "2027 Projections", content: "AI fraud losses may exceed $40 billion globally. Hackers will use automated AI for 'chain-reaction' attacks." },
        { title: "Digital Trust Era", content: "A shift toward decentralized security (Blockchain) to verify 'Real Human' status instead of relying solely on passwords." },
        { title: "The Rise of AGI", content: "Future AI (AGI) will have autonomous reasoning and planning capabilities for complex scams, requiring more proactive defense." }
      ]
    }
  ]
};
