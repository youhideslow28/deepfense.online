import { BookOpen, ShieldCheck, Target, Award, Brain, Zap, AlertTriangle, Clock, CheckCircle2 } from 'lucide-react';

export interface Lesson {
  id: string;
  title: string;
  paragraphs: string[];
  takeaways: string[];
  type?: 'video' | 'interactive' | 'lab';
  duration?: number;
}

export interface Checkpoint {
  label: string;
  questions: {
    text: string;
    options: string[];
    answer: number;
    explanation?: string;
  }[];
}

export interface Section {
  title: string;
  lessons: Lesson[];
  checkpoint?: Checkpoint;
}

export interface Module {
  id: number;
  part: string;
  title: string;
  duration: string;
  level: string;
  scenario: string;
  outcomes: string[];
  sections: Section[];
  quiz: {
    text: string;
    options: string[];
    answer: number;
    explanation?: string;
  }[];
  locked?: boolean;
}

const lesson = (id: string, title: string, paragraphs: string[], takeaways: string[]): Lesson => ({
  id, title, paragraphs, takeaways, type: 'interactive', duration: 5
});

const q = (text: string, options: string[], answer: number, explanation?: string) => ({ text, options, answer, explanation });

const checkpoint = (label: string, questions: any[]): Checkpoint => ({ label, questions });

export const basicsCourse = {
  title: "DEEPFENSE BASICS",
  credential: "DEEPFENSE AWARE",
  reward: "500 DPF coin",
  modules: [
    {
      id: 0,
      part: "foundation",
      title: "Má»™t ngÃ y bÃ¬nh thÆ°á»ng trÃªn khÃ´ng gian sá»‘",
      duration: "75 phÃºt",
      level: "Foundation",
      scenario: "Má»™t ngÃ y cá»§a An báº¯t Ä‘áº§u ráº¥t bÃ¬nh thÆ°á»ng: má»™t video Ä‘áº§u tÆ° cÃ³ ngÆ°á»i ná»•i tiáº¿ng, má»™t tin nháº¯n mÆ°á»£n tiá»n gáº¥p, má»™t hÃ¬nh áº£nh nháº¡y cáº£m trong nhÃ³m chat, rá»“i má»™t cuá»™c gá»i video giá»‘ng ngÆ°á»i thÃ¢n. KhÃ´ng tÃ¬nh huá»‘ng nÃ o tá»± nháº­n mÃ¬nh lÃ  deepfake. Táº¥t cáº£ Ä‘á»u chá»‰ yÃªu cáº§u An pháº£n á»©ng tháº­t nhanh.",
      outcomes: [
        "Hiá»ƒu vÃ¬ sao deepfake khÃ´ng cÃ²n lÃ  chuyá»‡n xa láº¡ cá»§a ngÆ°á»i ná»•i tiáº¿ng hay phim áº£nh.",
        "Nháº­n ra báº¥t ká»³ ngÆ°á»i dÃ¹ng Internet nÃ o cÅ©ng cÃ³ thá»ƒ gáº·p ná»™i dung giáº£ máº¡o, lá»«a Ä‘áº£o hoáº·c gÃ¢y hiá»ƒu nháº§m.",
        "LÃ m quen vá»›i cÃ¡ch há»c cá»§a DEEPFENSE BASIC: cÃ¢u chuyá»‡n, quan sÃ¡t, quyáº¿t Ä‘á»‹nh vÃ  pháº£n há»“i.",
        "Náº¯m quy trÃ¬nh Deepfense Check: Pause, Observe, Verify, Trace, Decide."
      ],
      sections: [
        {
          title: "0.1 ChÃ o má»«ng vÃ  Ä‘áº·t váº¥n Ä‘á»",
          lessons: [
            lesson("0.1.1", "ChÃ o má»«ng Ä‘áº¿n vá»›i DEEPFENSE BASIC", [
              "ChÃ o má»«ng báº¡n Ä‘áº¿n vá»›i DEEPFENSE BASIC. ÄÃ¢y lÃ  khÃ³a há»c ná»n táº£ng vá» deepfake vÃ  phÃ²ng vá»‡ trÆ°á»›c ná»™i dung giáº£ máº¡o trÃªn khÃ´ng gian sá»‘. Báº¡n khÃ´ng cáº§n biáº¿t láº­p trÃ¬nh, khÃ´ng cáº§n hiá»ƒu sÃ¢u vá» trÃ­ tuá»‡ nhÃ¢n táº¡o, cÅ©ng khÃ´ng cáº§n lÃ  chuyÃªn gia an toÃ n thÃ´ng tin.",
              "Báº¡n chá»‰ cáº§n lÃ  má»™t ngÆ°á»i Ä‘ang sá»‘ng trong tháº¿ giá»›i sá»‘: cÃ³ Ä‘iá»‡n thoáº¡i, dÃ¹ng máº¡ng xÃ£ há»™i, xem video ngáº¯n, nháº­n tin nháº¯n, nghe cuá»™c gá»i, tham gia nhÃ³m chat vÃ  Ä‘Ã´i khi tá»± há»i: ná»™i dung nÃ y cÃ³ tháº­t khÃ´ng?",
              "Trong khÃ³a há»c nÃ y, chÃºng ta khÃ´ng há»c cÃ¡ch táº¡o deepfake. ChÃºng ta há»c cÃ¡ch nháº­n ra rá»§i ro, kiá»ƒm chá»©ng thÃ´ng tin, báº£o vá»‡ báº£n thÃ¢n, báº£o vá»‡ ngÆ°á»i khÃ¡c vÃ  ra quyáº¿t Ä‘á»‹nh bÃ¬nh tÄ©nh hÆ¡n trÆ°á»›c nhá»¯ng ná»™i dung cÃ³ thá»ƒ Ä‘Ã¡nh lá»«a máº¯t, tai vÃ  cáº£m xÃºc."
            ], [
              "Deepfake lÃ  váº¥n Ä‘á» cá»§a niá»m tin sá»‘, khÃ´ng chá»‰ lÃ  má»™t video giáº£.",
              "Má»¥c tiÃªu cá»§a khÃ³a há»c lÃ  giÃºp báº¡n khÃ´ng hoáº£ng sá»£, khÃ´ng tin vá»™i vÃ  khÃ´ng chia sáº» vá»™i."
            ]),
            lesson("0.1.2", "Tá»« 'cÃ³ hÃ¬nh lÃ  tháº­t' Ä‘áº¿n thá»i Ä‘áº¡i cáº§n kiá»ƒm chá»©ng", [
              "TrÆ°á»›c Ä‘Ã¢y, nhiá»u ngÆ°á»i nghÄ©: cÃ³ hÃ¬nh thÃ¬ cháº¯c lÃ  tháº­t. Sau Ä‘Ã³, chÃºng ta há»c ráº±ng áº£nh cÃ³ thá»ƒ bá»‹ chá»‰nh sá»­a. Rá»“i video trá»Ÿ thÃ nh báº±ng chá»©ng máº¡nh hÆ¡n: cÃ³ video thÃ¬ cháº¯c khÃ³ mÃ  giáº£.",
              "BÃ¢y giá», hÃ¬nh áº£nh, video vÃ  giá»ng nÃ³i Ä‘á»u cÃ³ thá»ƒ Ä‘Æ°á»£c táº¡o ra hoáº·c biáº¿n Ä‘á»•i báº±ng AI theo cÃ¡ch ráº¥t thuyáº¿t phá»¥c. Má»™t gÆ°Æ¡ng máº·t quen, má»™t giá»ng nÃ³i Ä‘Ãºng tÃ´ng, má»™t biá»ƒu cáº£m cÃ³ váº» tá»± nhiÃªn váº«n chÆ°a Ä‘á»§ Ä‘á»ƒ káº¿t luáº­n.",
              "Äiá»u Ä‘Ã³ khÃ´ng cÃ³ nghÄ©a lÃ  pháº£i nghi ngá» má»i thá»©. Náº¿u cÃ¡i gÃ¬ cÅ©ng bá»‹ xem lÃ  giáº£, chÃºng ta sáº½ má»‡t má»i vÃ  máº¥t phÆ°Æ¡ng hÆ°á»›ng. Äiá»u cáº§n há»c lÃ  cÃ¡ch nghi ngá» há»£p lÃ½: biáº¿t khi nÃ o nÃªn dá»«ng láº¡i, há»i thÃªm vÃ  kiá»ƒm chá»©ng."
            ], [
              "KhÃ´ng tin vá»™i khÃ´ng cÃ³ nghÄ©a lÃ  phá»§ nháº­n táº¥t cáº£.",
              "NgÆ°á»i an toÃ n lÃ  ngÆ°á»i biáº¿t kiá»ƒm chá»©ng trÆ°á»›c khi hÃ nh Ä‘á»™ng."
            ]),
            lesson("0.1.3", "Má»™t ngÃ y cá»§a An", [
              "Buá»•i sÃ¡ng, An tháº¥y má»™t video ngÆ°á»i ná»•i tiáº¿ng giá»›i thiá»‡u kÃªnh Ä‘áº§u tÆ° lá»£i nhuáº­n cao. GÆ°Æ¡ng máº·t Ä‘Ãºng lÃ  ngÆ°á»i Ä‘Ã³. Giá»ng nÃ³i cÅ©ng giá»‘ng. Video cÃ³ nhiá»u lÆ°á»£t xem vÃ  bÃ¬nh luáº­n á»§ng há»™.",
              "Äáº¿n trÆ°a, An nháº­n tin nháº¯n tá»« má»™t ngÆ°á»i báº¡n cÅ© nÃ³i cáº§n mÆ°á»£n tiá»n gáº¥p vÃ¬ tÃ i khoáº£n ngÃ¢n hÃ ng bá»‹ khÃ³a. áº¢nh Ä‘áº¡i diá»‡n Ä‘Ãºng lÃ  báº¡n cá»§a An, tÃ i khoáº£n cÅ©ng Ä‘Ãºng tÃªn, chá»‰ cÃ³ cÃ¡ch nháº¯n hÆ¡i khÃ¡c má»i ngÃ y.",
              "Chiá»u hÃ´m Ä‘Ã³, trong nhÃ³m chat xuáº¥t hiá»‡n má»™t hÃ¬nh áº£nh nháº¡y cáº£m Ä‘Æ°á»£c cho lÃ  cá»§a má»™t há»c sinh trong trÆ°á»ng. CÃ³ ngÆ°á»i nÃ³i Ä‘Ã³ lÃ  áº£nh AI, cÃ³ ngÆ°á»i láº¡i báº£o cá»© lÆ°u láº¡i Ä‘Ã£. Buá»•i tá»‘i, An nháº­n cuá»™c gá»i video ngáº¯n tá»« ngÆ°á»i thÃ¢n nÃ³i Ä‘ang gáº·p chuyá»‡n kháº©n cáº¥p. HÃ¬nh hÆ¡i má», Ã¢m thanh khÃ´ng rÃµ, nhÆ°ng giá»ng nghe ráº¥t quen."
            ], [
              "Deepfake thÆ°á»ng xuáº¥t hiá»‡n trong bá»‘i cáº£nh Ä‘á»i thÆ°á»ng, khÃ´ng pháº£i trong phÃ²ng thÃ­ nghiá»‡m.",
              "Ãp lá»±c pháº£i hÃ nh Ä‘á»™ng ngay lÃ  tÃ­n hiá»‡u cáº§n cháº­m láº¡i."
            ])
          ]
        },
        {
          title: "0.2 VÃ¬ sao khÃ³a há»c nÃ y cáº§n thiáº¿t?",
          lessons: [
            lesson("0.2.1", "VÃ¬ sao khÃ³a há»c nÃ y cáº§n thiáº¿t?", [
              "Deepfake nguy hiá»ƒm khÃ´ng chá»‰ vÃ¬ nÃ³ giáº£. NÃ³ nguy hiá»ƒm vÃ¬ nÃ³ xuáº¥t hiá»‡n Ä‘Ãºng lÃºc con ngÆ°á»i Ã­t phÃ²ng bá»‹ nháº¥t: khi lo cho ngÆ°á»i thÃ¢n, sá»£ máº¥t tiá»n, xáº¥u há»•, giáº­n dá»¯, muá»‘n giÃºp ai Ä‘Ã³ hoáº·c tin ráº±ng mÃ¬nh Ä‘ang nhÃ¬n tháº¥y báº±ng chá»©ng.",
              "Deepfake cÅ©ng hiáº¿m khi hoáº¡t Ä‘á»™ng má»™t mÃ¬nh. NÃ³ thÆ°á»ng Ä‘i cÃ¹ng tÃ i khoáº£n bá»‹ chiáº¿m quyá»n, tin nháº¯n thÃºc Ã©p, link giáº£ máº¡o, website giáº£, danh tÃ­nh giáº£ vÃ  sá»± lan truyá»n quÃ¡ nhanh trong nhÃ³m chat.",
              "VÃ¬ váº­y, há»c vá» deepfake khÃ´ng chá»‰ lÃ  há»c nhÃ¬n máº·t mÃ©o, máº¯t láº¡ hay giá»ng Ä‘á»u Ä‘á»u. Há»c vá» deepfake lÃ  há»c cÃ¡ch tá»± há»i: ai gá»­i ná»™i dung nÃ y, há» muá»‘n mÃ¬nh lÃ m gÃ¬, vÃ¬ sao pháº£i lÃ m ngay, náº¿u mÃ¬nh sai ai sáº½ bá»‹ háº¡i, vÃ  cÃ³ cÃ¡ch nÃ o kiá»ƒm chá»©ng Ä‘á»™c láº­p khÃ´ng?"
            ], [
              "Deepfake lÃ  rá»§i ro truyá»n thÃ´ng, tÃ¢m lÃ½, tÃ i chÃ­nh vÃ  danh tÃ­nh.",
              "CÃ¢u há»i Ä‘Ãºng thÆ°á»ng quan trá»ng hÆ¡n cáº£m giÃ¡c 'trÃ´ng tháº­t hay trÃ´ng giáº£'."
            ]),
            lesson("0.2.2", "Báº¡n sáº½ há»c nhÆ° tháº¿ nÃ o?", [
              "Má»—i pháº§n há»c thÆ°á»ng báº¯t Ä‘áº§u báº±ng má»™t tÃ¬nh huá»‘ng giá»‘ng Ä‘á»i tháº­t. Sau Ä‘Ã³ báº¡n há»c khÃ¡i niá»‡m, quan sÃ¡t dáº¥u hiá»‡u, chá»n hÃ nh Ä‘á»™ng vÃ  nháº­n pháº£n há»“i.",
              "Quiz trong khÃ³a há»c khÃ´ng nháº±m báº¯t lá»—i báº¡n. Quiz giÃºp báº¡n kiá»ƒm tra xem mÃ¬nh Ä‘Ã£ hiá»ƒu Ä‘á»§ Ä‘á»ƒ dÃ¹ng kiáº¿n thá»©c trong Ä‘á»i tháº­t chÆ°a.",
              "Cuá»‘i khÃ³a, há»‡ thá»‘ng chá»n 50 cÃ¢u tá»« ngÃ¢n hÃ ng cÃ¢u há»i lá»›n hÆ¡n. Báº¡n cáº§n Ä‘áº¡t tá»« 70% trá»Ÿ lÃªn, hoÃ n thÃ nh Ä‘Ã¡nh giÃ¡ khÃ³a há»c vÃ  Ä‘á»§ tiáº¿n Ä‘á»™ Ä‘á»ƒ má»Ÿ certificate DEEPFENSE AWARE."
            ], [
              "KhÃ³a há»c Æ°u tiÃªn pháº£n xáº¡ an toÃ n, khÃ´ng há»c váº¹t thuáº­t ngá»¯.",
              "HoÃ n thÃ nh khÃ³a há»c nghÄ©a lÃ  biáº¿t dÃ¹ng kiáº¿n thá»©c trong tÃ¬nh huá»‘ng thá»±c táº¿."
            ])
          ]
        },
        {
          title: "0.3 Deepfense Check",
          lessons: [
            lesson("0.3.1", "NÄƒm bÆ°á»›c kiá»ƒm chá»©ng cÆ¡ báº£n", [
              "DEEPFENSE BASIC dÃ¹ng má»™t quy trÃ¬nh ngáº¯n gá»i lÃ  Deepfense Check. Báº¡n chÆ°a cáº§n thuá»™c lÃ²ng má»i chi tiáº¿t, nhÆ°ng cáº§n nhá»› logic: Ä‘á»«ng Ä‘á»ƒ cáº£m xÃºc quyáº¿t Ä‘á»‹nh thay báº¡n.",
              "Pause: dá»«ng láº¡i trÆ°á»›c khi pháº£n á»©ng. Observe: quan sÃ¡t dáº¥u hiá»‡u ká»¹ thuáº­t vÃ  ngá»¯ cáº£nh. Verify: xÃ¡c minh qua kÃªnh Ä‘á»™c láº­p. Trace: truy nguá»“n ná»™i dung. Decide: ra quyáº¿t Ä‘á»‹nh Ã­t gÃ¢y háº¡i nháº¥t.",
              "Quy trÃ¬nh nÃ y khÃ´ng biáº¿n báº¡n thÃ nh chuyÃªn gia phÃ¡p chá»©ng. NÃ³ giÃºp báº¡n cÃ³ má»™t khoáº£ng dá»«ng Ä‘á»§ tá»‘t Ä‘á»ƒ trÃ¡nh chuyá»ƒn tiá»n, chia sáº», káº¿t luáº­n hoáº·c lÃ m tá»•n thÆ°Æ¡ng ngÆ°á»i khÃ¡c khi chÆ°a cÃ³ báº±ng chá»©ng."
            ], [
              "Pause, Observe, Verify, Trace, Decide lÃ  xÆ°Æ¡ng sá»‘ng cá»§a khÃ³a há»c.",
              "Má»™t khoáº£ng dá»«ng Ä‘Ãºng lÃºc cÃ³ thá»ƒ ngÄƒn má»™t thiá»‡t háº¡i lá»›n."
            ])
          ],
          checkpoint: checkpoint("0.3", [
            q("Má»¥c tiÃªu chÃ­nh cá»§a DEEPFENSE BASIC lÃ  gÃ¬?", ["Há»c cÃ¡ch táº¡o deepfake", "Há»c cÃ¡ch nháº­n diá»‡n vÃ  phÃ²ng vá»‡ an toÃ n", "Há»c máº¹o vÆ°á»£t detector", "TÄƒng lÆ°á»£t xem ná»™i dung"], 1),
            q("Trong Deepfense Check, 'Verify' cÃ³ nghÄ©a lÃ  gÃ¬?", ["XÃ¡c minh qua kÃªnh Ä‘á»™c láº­p", "Tin náº¿u video rÃµ nÃ©t", "Táº£i video vá» ngay", "Chia sáº» Ä‘á»ƒ há»i cá»™ng Ä‘á»“ng"], 0)
          ])
        },
        {
          title: "0.4 Pre-check (ÄÃ¡nh giÃ¡ ban Ä‘áº§u)",
          lessons: [
            lesson("0.4.1", "Tá»± Ä‘Ã¡nh giÃ¡ kiáº¿n thá»©c ná»n táº£ng", [
              "TrÆ°á»›c khi báº¯t Ä‘áº§u cÃ¡c module chuyÃªn sÃ¢u, hÃ£y cÃ¹ng thá»±c hiá»‡n má»™t bÃ i kiá»ƒm tra ngáº¯n. BÃ i thi nÃ y khÃ´ng tÃ­nh vÃ o káº¿t quáº£ cuá»‘i khÃ³a, nhÆ°ng sáº½ giÃºp báº¡n nháº­n ra mÃ¬nh Ä‘ang á»Ÿ Ä‘Ã¢u trÃªn báº£n Ä‘á»“ an toÃ n sá»‘.",
              "Báº¡n sáº½ gáº·p 8 cÃ¢u há»i vá» cÃ¡c tÃ¬nh huá»‘ng giáº£ Ä‘á»‹nh. HÃ£y chá»n Ä‘Ã¡p Ã¡n mÃ  báº¡n cho lÃ  an toÃ n nháº¥t."
            ], [
              "Pre-check giÃºp báº¡n nháº­n diá»‡n cÃ¡c lá»— há»•ng kiáº¿n thá»©c hiá»‡n cÃ³.",
              "Káº¿t quáº£ nÃ y lÃ  Ä‘iá»ƒm má»‘c Ä‘á»ƒ so sÃ¡nh sau khi hoÃ n thÃ nh khÃ³a há»c."
            ])
          ],
          checkpoint: checkpoint("0.4", [
            q("Báº¡n nháº­n video gá»i trá»±c tiáº¿p tá»« ngÆ°á»i thÃ¢n nÃ³i Ä‘ang bá»‹ tai náº¡n vÃ  cáº§n tiá»n gáº¥p. HÃ¬nh áº£nh hÆ¡i má», tiáº¿ng bá»‹ giáº­t. Báº¡n lÃ m gÃ¬?", ["Chuyá»ƒn tiá»n ngay", "Há»i tÃ i khoáº£n rá»“i chuyá»ƒn", "Dá»«ng cuá»™c gá»i, gá»i láº¡i sá»‘ Ä‘iá»‡n thoáº¡i Ä‘Ã£ lÆ°u", "Báº¥m vÃ o link 'vá»‹ trÃ­' há» gá»­i"], 2),
            q("Tháº¥y video ngÆ°á»i ná»•i tiáº¿ng quáº£ng cÃ¡o á»©ng dá»¥ng Ä‘áº§u tÆ° 'cháº¯c cháº¯n sinh lá»i 100%', báº¡n nÃªn lÃ m gÃ¬?", ["ÄÄƒng kÃ½ ngay", "Náº¡p thá»­ má»™t Ã­t", "Kiá»ƒm tra kÃªnh chÃ­nh thá»©c cá»§a ngÆ°á»i Ä‘Ã³", "Chia sáº» cho báº¡n bÃ¨"], 2),
            q("Má»™t hÃ¬nh áº£nh nháº¡y cáº£m nghi lÃ  cá»§a má»™t ngÆ°á»i quen bá»‹ lan truyá»n trong nhÃ³m. Báº¡n lÃ m gÃ¬?", ["LÆ°u láº¡i Ä‘á»ƒ lÃ m báº±ng chá»©ng", "Gá»­i cho ngÆ°á»i khÃ¡c há»i tháº­t giáº£", "KhÃ´ng lan truyá»n vÃ  bÃ¡o cÃ¡o ná»™i dung", "BÃ¬nh luáº­n trÃªu Ä‘Ã¹a"], 2),
            q("Báº¡n nháº­n email tá»« 'NgÃ¢n hÃ ng' yÃªu cáº§u Ä‘Äƒng nháº­p qua link Ä‘á»ƒ 'xÃ¡c minh tÃ i khoáº£n'. Báº¡n lÃ m gÃ¬?", ["Báº¥m link Ä‘Äƒng nháº­p ngay", "Tá»± má»Ÿ á»©ng dá»¥ng ngÃ¢n hÃ ng hoáº·c gÃµ Ä‘Ãºng Ä‘á»‹a chá»‰ web cá»§a ngÃ¢n hÃ ng", "Gá»­i mÃ£ OTP cho há»", "CÃ i á»©ng dá»¥ng Ä‘Ã­nh kÃ¨m"], 1),
            q("Ai cÃ³ thá»ƒ lÃ  náº¡n nhÃ¢n cá»§a Deepfake?", ["Chá»‰ ngÆ°á»i ná»•i tiáº¿ng", "Chá»‰ ngÆ°á»i giÃ u", "Báº¥t ká»³ ai sá»­ dá»¥ng Internet", "Chá»‰ ngÆ°á»i khÃ´ng biáº¿t cÃ´ng nghá»‡"], 2),
            q("Deepfake cÃ³ thá»ƒ giáº£ máº¡o nhá»¯ng gÃ¬?", ["HÃ¬nh áº£nh vÃ  video", "Giá»ng nÃ³i", "Cáº£ hÃ¬nh áº£nh, video vÃ  giá»ng nÃ³i", "Chá»‰ vÄƒn báº£n"], 2),
            q("Dáº¥u hiá»‡u nÃ o ÄÃNG NGHI nháº¥t trong má»™t yÃªu cáº§u chuyá»ƒn tiá»n?", ["NgÆ°á»i Ä‘Ã³ nÃ³i Ä‘ang ráº¥t gáº¥p vÃ  báº£o Ä‘á»«ng nÃ³i vá»›i ai", "Video cÃ³ mÃ u sáº¯c Ä‘áº¹p", "Tin nháº¯n cÃ³ dáº¥u cÃ¢u Ä‘Ãºng", "Gá»­i vÃ o buá»•i sÃ¡ng"], 0),
            q("Khi má»™t ná»™i dung lÃ m báº¡n ráº¥t giáº­n hoáº·c ráº¥t sá»£, báº¡n nÃªn lÃ m gÃ¬ Ä‘áº§u tiÃªn?", ["Chia sáº» Ä‘á»ƒ cáº£nh bÃ¡o", "BÃ¬nh luáº­n pháº£n Ä‘á»‘i", "Dá»«ng láº¡i 30 giÃ¢y Ä‘á»ƒ kiá»ƒm chá»©ng", "Táº£i video vá» mÃ¡y"], 2)
          ])
        }
      ],
      quiz: [
        q("Khi nháº­n cuá»™c gá»i giá»‘ng ngÆ°á»i thÃ¢n yÃªu cáº§u chuyá»ƒn tiá»n gáº¥p, bÆ°á»›c an toÃ n nháº¥t lÃ  gÃ¬?", ["Ngáº¯t cuá»™c gá»i vÃ  xÃ¡c minh qua sá»‘/kÃªnh Ä‘Ã£ biáº¿t trÆ°á»›c", "Chuyá»ƒn tiá»n ngay", "Gá»­i OTP Ä‘á»ƒ há» xá»­ lÃ½", "Há»i sá»‘ tÃ i khoáº£n rá»“i chuyá»ƒn thá»­"], 0),
        q("Deepfense Check gá»“m cÃ¡c bÆ°á»›c nÃ o?", ["Pause, Observe, Verify, Trace, Decide", "Post, Like, Share, Comment", "Copy, Paste, Upload", "Scan, Delete, Ignore"], 0),
        q("VÃ¬ sao ná»™i dung gÃ¢y pháº«n ná»™ cáº§n Ä‘Æ°á»£c kiá»ƒm chá»©ng ká»¹?", ["VÃ¬ cáº£m xÃºc máº¡nh thÆ°á»ng lÃ m ngÆ°á»i xem pháº£n á»©ng nhanh vÃ  chia sáº» vá»™i", "VÃ¬ video gÃ¢y pháº«n ná»™ luÃ´n giáº£", "VÃ¬ chá»‰ ná»™i dung chÃ­nh trá»‹ má»›i nguy hiá»ƒm", "VÃ¬ bÃ¬nh luáº­n nhiá»u lÃ  báº±ng chá»©ng tháº­t"], 0),
        q("Deepfake cÃ³ thá»ƒ xuáº¥t hiá»‡n á»Ÿ dáº¡ng nÃ o?", ["HÃ¬nh áº£nh, video, giá»ng nÃ³i hoáº·c avatar", "Chá»‰ video", "Chá»‰ vÄƒn báº£n", "Chá»‰ áº£nh tÄ©nh"], 0),
        q("Äiá»u gÃ¬ KHÃ”NG nÃªn lÃ m with hÃ¬nh áº£nh nháº¡y cáº£m nghi bá»‹ AI táº¡o hoáº·c ghÃ©p?", ["LÆ°u vÃ  chuyá»ƒn tiáº¿p Ä‘á»ƒ há»i Ã½ kiáº¿n nhÃ³m", "KhÃ´ng lan truyá»n", "BÃ¡o cÃ¡o ná»™i dung", "TÃ¬m ngÆ°á»i cÃ³ trÃ¡ch nhiá»‡m há»— trá»£"], 0)
      ]
    },
    {
      id: 1,
      part: "foundation",
      title: "Deepfake lÃ  gÃ¬?",
      duration: "80-90 phÃºt",
      level: "Foundation",
      scenario: "Module 1 giÃºp báº¡n hiá»ƒu deepfake vÃ  cÃ¡c loáº¡i ná»™i dung giáº£ máº¡o khÃ¡c. Báº¡n sáº½ biáº¿t vÃ¬ sao chÃºng ngÃ y cÃ ng khÃ³ nháº­n ra vÃ  giá»›i háº¡n cá»§a máº¯t thÆ°á»ng lÃ  á»Ÿ Ä‘Ã¢u.",
      outcomes: [
        "PhÃ¢n biá»‡t Ä‘Æ°á»£c Deepfake, Deepvoice, Synthetic Media vÃ  cÃ¡c loáº¡i ná»™i dung chá»‰nh sá»­a.",
        "Hiá»ƒu 4 lÃ½ do khiáº¿n ná»™i dung giáº£ máº¡o ngÃ y cÃ ng thuyáº¿t phá»¥c.",
        "Nháº­n diá»‡n Ä‘Æ°á»£c giá»›i háº¡n cá»§a máº¯t thÆ°á»ng vÃ  cÃ´ng cá»¥ phÃ¡t hiá»‡n AI.",
        "Biáº¿t cÃ¡ch phÃ¢n loáº¡i rá»§i ro dá»±a trÃªn má»¥c Ä‘Ã­ch vÃ  bá»‘i cáº£nh sá»­ dá»¥ng."
      ],
      sections: [
        {
          title: "1.1 Deepfake vÃ  cÃ¡c 'há» hÃ ng'",
          lessons: [
            lesson("1.1.1", "KhÃ¡i niá»‡m vÃ  phÃ¢n loáº¡i", [
              "Deepfake lÃ  ná»™i dung hÃ¬nh áº£nh, video hoáº·c Ã¢m thanh Ä‘Æ°á»£c táº¡o ra hoáº·c chá»‰nh sá»­a báº±ng cÃ´ng nghá»‡ sá»‘, thÆ°á»ng cÃ³ sá»­ dá»¥ng AI, Ä‘á»ƒ khiáº¿n ngÆ°á»i xem tin ráº±ng má»™t ngÆ°á»i Ä‘Ã£ nÃ³i hoáº·c lÃ m Ä‘iá»u mÃ  há» khÃ´ng thá»±c sá»± nÃ³i hoáº·c lÃ m. Deepfake khÃ´ng nháº¥t thiáº¿t pháº£i hoÃ n háº£o má»›i nguy hiá»ƒm. Trong nhiá»u vá»¥ lá»«a Ä‘áº£o, káº» xáº¥u chá»‰ cáº§n táº¡o ra Ä‘á»§ giá»‘ng trong vÃ i giÃ¢y, káº¿t há»£p vá»›i sá»± kháº©n cáº¥p, sá»£ hÃ£i hoáº·c tin tÆ°á»Ÿng, Ä‘á»ƒ náº¡n nhÃ¢n hÃ nh Ä‘á»™ng trÆ°á»›c khi ká»‹p suy nghÄ©.",
              "Synthetic media lÃ  ná»™i dung Ä‘Æ°á»£c táº¡o ra hoÃ n toÃ n hoáº·c má»™t pháº§n báº±ng cÃ´ng nghá»‡ sá»‘, Ä‘áº·c biá»‡t lÃ  AI. Táº¥t cáº£ deepfake Ä‘á»u cÃ³ thá»ƒ Ä‘Æ°á»£c xem lÃ  má»™t dáº¡ng synthetic hoáº·c manipulated media, nhÆ°ng khÃ´ng pháº£i má»i synthetic media Ä‘á»u lÃ  deepfake. VÃ­ dá»¥: Má»™t bá»©c tranh phong cáº£nh do AI táº¡o ra khÃ´ng pháº£i deepfake. NhÆ°ng má»™t video giáº£ máº¡o má»™t ngÆ°á»i tháº­t Ä‘ang nÃ³i Ä‘iá»u há» chÆ°a tá»«ng nÃ³i thÃ¬ cÃ³ thá»ƒ lÃ  deepfake.",
              "Deepvoice lÃ  dáº¡ng giáº£ láº­p hoáº·c chá»‰nh sá»­a giá»ng nÃ³i báº±ng AI, khiáº¿n Ã¢m thanh nghe giá»‘ng má»™t ngÆ°á»i tháº­t. Deepvoice Ä‘áº·c biá»‡t nguy hiá»ƒm trong cÃ¡c tÃ¬nh huá»‘ng cÃ³ Ã¡p lá»±c thá»i gian, vÃ­ dá»¥: 'Con Ä‘ang bá»‹ tai náº¡n, chuyá»ƒn tiá»n ngay', 'Anh lÃ  sáº¿p Ä‘Ã¢y, xá»­ lÃ½ khoáº£n nÃ y trÆ°á»›c 3 giá»'. Má»™t Ä‘oáº¡n giá»ng nÃ³i ngáº¯n khÃ´ng cÃ²n Ä‘á»§ Ä‘á»ƒ xÃ¡c minh danh tÃ­nh.",
              "Face swap lÃ  ká»¹ thuáº­t thay khuÃ´n máº·t cá»§a má»™t ngÆ°á»i vÃ o hÃ¬nh áº£nh hoáº·c video cá»§a ngÆ°á»i khÃ¡c. KhÃ´ng nÃªn Ä‘Ã¡nh giÃ¡ má»©c Ä‘á»™ nghiÃªm trá»ng chá»‰ dá»±a trÃªn cÃ¢u 'Ä‘Ã³ chá»‰ lÃ  áº£nh giáº£'. Má»™t hÃ¬nh áº£nh giáº£ váº«n cÃ³ thá»ƒ gÃ¢y tá»•n thÆ°Æ¡ng tháº­t. Má»™t ngÆ°á»i bá»‹ gÃ¡n máº·t vÃ o ná»™i dung nháº¡y cáº£m váº«n cÃ³ thá»ƒ bá»‹ áº£nh hÆ°á»Ÿng danh dá»±, tÃ¢m lÃ½, há»c táº­p, cÃ´ng viá»‡c vÃ  cÃ¡c má»‘i quan há»‡.",
              "Lip sync lÃ  ká»¹ thuáº­t lÃ m cho chuyá»ƒn Ä‘á»™ng mÃ´i trong video khá»›p vá»›i má»™t Ä‘oáº¡n Ã¢m thanh khÃ¡c. Dáº¥u hiá»‡u cÃ³ thá»ƒ nghi ngá»: Kháº©u hÃ¬nh khÃ´ng khá»›p hoÃ n toÃ n vá»›i Ã¢m thanh, cá»­ Ä‘á»™ng mÃ´i hÆ¡i cá»©ng hoáº·c trá»…, biá»ƒu cáº£m khuÃ´n máº·t khÃ´ng phÃ¹ há»£p vá»›i ná»™i dung lá»i nÃ³i, Ã¢m thanh quÃ¡ sáº¡ch hoáº·c quÃ¡ Ä‘á»u so vá»›i mÃ´i trÆ°á»ng xung quanh.",
              "Edited media lÃ  ná»™i dung Ä‘Ã£ bá»‹ chá»‰nh sá»­a báº±ng cÃ¡c cÃ´ng cá»¥ truyá»n thá»‘ng hoáº·c cÃ´ng cá»¥ AI. VÃ­ dá»¥: Cáº¯t má»™t cÃ¢u nÃ³i ra khá»i pháº§n giáº£i thÃ­ch phÃ­a sau, ghÃ©p hai Ä‘oáº¡n video tá»« hai thá»i Ä‘iá»ƒm khÃ¡c nhau Ä‘á»ƒ táº¡o cáº£m giÃ¡c liÃªn quan, thÃªm phá»¥ Ä‘á» sai, lÃ m má» hoáº·c che pháº§n quan trá»ng.",
              "Repurposed media lÃ  ná»™i dung tháº­t nhÆ°ng bá»‹ Ä‘áº·t sai bá»‘i cáº£nh. VÃ­ dá»¥: Má»™t video lÅ© lá»¥t á»Ÿ nÆ°á»›c khÃ¡c tá»« nhiá»u nÄƒm trÆ°á»›c Ä‘Æ°á»£c Ä‘Äƒng láº¡i nhÆ° thá»ƒ vá»«a xáº£y ra táº¡i Viá»‡t Nam. Repurposed media nguy hiá»ƒm vÃ¬ nÃ³ dÃ¹ng 'cháº¥t liá»‡u tháº­t' Ä‘á»ƒ táº¡o ra káº¿t luáº­n sai.",
              "AI-generated image lÃ  hÃ¬nh áº£nh do AI táº¡o ra tá»« mÃ´ táº£, dá»¯ liá»‡u máº«u hoáº·c yÃªu cáº§u cá»§a ngÆ°á»i dÃ¹ng. Khi nhÃ¬n má»™t hÃ¬nh áº£nh, Ä‘á»«ng chá»‰ há»i: 'áº¢nh nÃ y cÃ³ bá»‹ AI táº¡o khÃ´ng?' HÃ£y há»i thÃªm: 'áº¢nh nÃ y Ä‘ang Ä‘Æ°á»£c dÃ¹ng Ä‘á»ƒ khiáº¿n mÃ¬nh tin Ä‘iá»u gÃ¬?' Má»™t hÃ¬nh áº£nh AI cÃ³ thá»ƒ vÃ´ háº¡i náº¿u nÃ³ lÃ  minh há»a rÃµ rÃ ng. NhÆ°ng cÅ©ng hÃ¬nh áº£nh Ä‘Ã³ cÃ³ thá»ƒ nguy hiá»ƒm náº¿u nÃ³ Ä‘Æ°á»£c trÃ¬nh bÃ y nhÆ° báº±ng chá»©ng tháº­t."
            ], [
              "Deepfake thÆ°á»ng máº¡o danh danh tÃ­nh tháº­t.",
              "KhÃ´ng pháº£i má»i ná»™i dung AI Ä‘á»u lÃ  deepfake.",
              "Ná»™i dung tháº­t bá»‹ Ä‘áº·t sai bá»‘i cáº£nh váº«n cÃ³ thá»ƒ gÃ¢y lá»«a dá»‘i.",
              "Nghe giá»‘ng khÃ´ng cÃ³ nghÄ©a lÃ  Ä‘Ãºng ngÆ°á»i.",
              "Ná»™i dung tháº­t Ä‘áº·t sai bá»‘i cáº£nh váº«n cÃ³ thá»ƒ dáº«n Ä‘áº¿n niá»m tin sai."
            ]),
            lesson("1.1.2", "VÃ¬ sao deepfake ngÃ y cÃ ng khÃ³ nháº­n ra?", [
              "CÃ´ng nghá»‡ tá»‘t hÆ¡n, chi phÃ­ tháº¥p hÆ¡n: TrÆ°á»›c Ä‘Ã¢y, Ä‘á»ƒ táº¡o má»™t video giáº£ thuyáº¿t phá»¥c, ngÆ°á»i ta cáº§n nhiá»u ká»¹ nÄƒng, thiáº¿t bá»‹ vÃ  thá»i gian. BÃ¢y giá», nhiá»u cÃ´ng cá»¥ AI Ä‘Ã£ lÃ m cho viá»‡c táº¡o áº£nh, giá»ng nÃ³i vÃ  video trá»Ÿ nÃªn dá»… tiáº¿p cáº­n hÆ¡n. Khi cÃ´ng cá»¥ máº¡nh hÆ¡n vÃ  ráº» hÆ¡n, ká»¹ nÄƒng phÃ²ng vá»‡ cá»§a ngÆ°á»i dÃ¹ng cÅ©ng cáº§n tá»‘t hÆ¡n.",
              "Dá»¯ liá»‡u cÃ¡ nhÃ¢n cá»§a chÃºng ta quÃ¡ dá»… tÃ¬m: AI cáº§n dá»¯ liá»‡u Ä‘á»ƒ mÃ´ phá»ng. Trong Ä‘á»i sá»‘ng sá»‘, nhiá»u ngÆ°á»i vÃ´ tÃ¬nh Ä‘á»ƒ láº¡i ráº¥t nhiá»u dá»¯ liá»‡u: áº£nh chÃ¢n dung, video nÃ³i chuyá»‡n, livestream, story háº±ng ngÃ y, giá»ng nÃ³i trong clip, thÃ´ng tin gia Ä‘Ã¬nh, trÆ°á»ng há»c, cÃ´ng viá»‡c. Khi dá»¯ liá»‡u cÃ¡ nhÃ¢n quÃ¡ cÃ´ng khai, káº» xáº¥u cÃ³ nhiá»u nguyÃªn liá»‡u hÆ¡n Ä‘á»ƒ táº¡o tÃ i khoáº£n giáº£, giáº£ giá»ng nÃ³i, dá»±ng ká»‹ch báº£n lá»«a Ä‘áº£o cÃ³ váº» ráº¥t riÃªng tÆ°.",
              "Ná»™i dung lan nhanh hÆ¡n kháº£ nÄƒng kiá»ƒm chá»©ng: Chá»‰ cáº§n vÃ i phÃºt, má»™t video cÃ³ thá»ƒ xuáº¥t hiá»‡n trong nhÃ³m gia Ä‘Ã¬nh, nhÃ³m lá»›p, nhÃ³m cÃ´ng viá»‡c, trang cÃ¡ nhÃ¢n. Trong khi Ä‘Ã³, kiá»ƒm chá»©ng cáº§n thá»i gian. Káº» xáº¥u hiá»ƒu Ä‘iá»u Ä‘Ã³ vÃ  thÆ°á»ng thÃªm vÃ o cÃ¡c cÃ¢u nhÆ°: 'Chia sáº» ngay trÆ°á»›c khi bá»‹ xÃ³a', 'CÆ¡ há»™i chá»‰ cÃ²n hÃ´m nay', 'Ai khÃ´ng chia sáº» lÃ  vÃ´ cáº£m'.",
              "Máº¯t thÆ°á»ng cÃ³ giá»›i háº¡n: Má»™t video tháº­t cÅ©ng cÃ³ thá»ƒ trÃ´ng láº¡ vÃ¬ máº¡ng yáº¿u, camera kÃ©m, Ã¡nh sÃ¡ng xáº¥u, video bá»‹ nÃ©n, ngÆ°á»i nÃ³i má»‡t hoáº·c cÄƒng tháº³ng. NgÆ°á»£c láº¡i, má»™t video giáº£ cÃ³ thá»ƒ trÃ´ng ráº¥t mÆ°á»£t. Náº¿u báº¡n chá»‰ dá»±a vÃ o cáº£m giÃ¡c 'trÃ´ng tháº­t' hoáº·c 'trÃ´ng giáº£', báº¡n cÃ³ thá»ƒ bá»‹ sai theo cáº£ hai hÆ°á»›ng: tin nháº§m ná»™i dung giáº£, hoáº·c phá»§ nháº­n nháº§m ná»™i dung tháº­t.",
              "CÃ´ng cá»¥ phÃ¡t hiá»‡n cÅ©ng cÃ³ giá»›i háº¡n: Káº¿t quáº£ tá»« detector nÃªn Ä‘Æ°á»£c xem lÃ  má»™t tÃ­n hiá»‡u, khÃ´ng pháº£i káº¿t luáº­n cuá»‘i cÃ¹ng. Náº¿u cÃ´ng cá»¥ nÃ³i 'cÃ³ thá»ƒ lÃ  deepfake', báº¡n cáº§n kiá»ƒm chá»©ng thÃªm. Náº¿u cÃ´ng cá»¥ nÃ³i 'khÃ´ng phÃ¡t hiá»‡n deepfake', báº¡n váº«n cáº§n kiá»ƒm chá»©ng thÃªm náº¿u ná»™i dung cÃ³ rá»§i ro cao.",
              "Váº¥n Ä‘á» khÃ´ng chá»‰ lÃ  tháº­t hay giáº£: Trong thá»±c táº¿, cÃ³ nhiá»u tráº¡ng thÃ¡i hÆ¡n: cÃ³ báº±ng chá»©ng tá»‘t cho tháº¥y ná»™i dung lÃ  tháº­t, cÃ³ báº±ng chá»©ng tá»‘t cho tháº¥y ná»™i dung lÃ  giáº£, ná»™i dung tháº­t nhÆ°ng bá»‹ Ä‘áº·t sai bá»‘i cáº£nh, ná»™i dung bá»‹ cáº¯t ghÃ©p lÃ m Ä‘á»•i nghÄ©a, ná»™i dung cÃ³ má»™t pháº§n tháº­t má»™t pháº§n chÆ°a rÃµ, chÆ°a Ä‘á»§ dá»¯ liá»‡u Ä‘á»ƒ káº¿t luáº­n.",
              "Má»™t rá»§i ro ngÆ°á»£c - Liar's dividend: Deepfake khÃ´ng chá»‰ lÃ m ngÆ°á»i ta tin vÃ o Ä‘iá»u giáº£. NÃ³ cÃ²n cÃ³ thá»ƒ lÃ m ngÆ°á»i ta nghi ngá» Ä‘iá»u tháº­t. Khi cÃ´ng chÃºng biáº¿t ráº±ng video vÃ  Ã¢m thanh cÃ³ thá»ƒ bá»‹ giáº£, má»™t ngÆ°á»i cÃ³ thá»ƒ phá»§ nháº­n ná»™i dung tháº­t báº±ng cÃ¡ch nÃ³i 'ÄÃ³ lÃ  deepfake'. Má»¥c tiÃªu lÃ  kiá»ƒm chá»©ng tá»‘t hÆ¡n, khÃ´ng pháº£i nghi ngá» táº¥t cáº£."
            ], [
              "Deepfake khÃ´ng chá»‰ dÃ¹ng hÃ¬nh áº£nh cá»§a báº¡n. NÃ³ cÃ³ thá»ƒ dÃ¹ng cáº£ thÃ³i quen, quan há»‡ vÃ  thÃ´ng tin báº¡n Ä‘á»ƒ lá»™.",
              "Dá»¯ liá»‡u cÃ¡ nhÃ¢n cá»§a báº¡n lÃ  nguyÃªn liá»‡u cá»§a deepfake.",
              "Ãp lá»±c thá»i gian lÃ  Ä‘á»“ng minh cá»§a káº» lá»«a Ä‘áº£o.",
              "Trong thá»i Ä‘áº¡i deepfake, ngÆ°á»i an toÃ n khÃ´ng pháº£i ngÆ°á»i Ä‘oÃ¡n nhanh nháº¥t. NgÆ°á»i an toÃ n lÃ  ngÆ°á»i biáº¿t kiá»ƒm chá»©ng trÆ°á»›c khi hÃ nh Ä‘á»™ng."
            ])
          ]
        },
        {
          title: "1.2 Thá»±c hÃ nh: PhÃ¢n loáº¡i ná»™i dung",
          lessons: [
            lesson("1.2.1", "TÃ¬nh huá»‘ng thá»±c táº¿", [
              "Báº¡n sáº½ gáº·p 12 loáº¡i ná»™i dung thÆ°á»ng tháº¥y trÃªn máº¡ng. HÃ£y thá»­ phÃ¢n loáº¡i chÃºng:",
              "1. Video ngÆ°á»i ná»•i tiáº¿ng kÃªu gá»i Ä‘áº§u tÆ° tÃ i chÃ­nh láº¡.\n2. áº¢nh chÃ¢n dung chuyÃªn gia khÃ´ng cÃ³ tháº­t trÃªn máº¡ng.\n3. Tin nháº¯n thoáº¡i gá»ng giá»‘ng ngÆ°á»i thÃ¢n mÆ°á»£n tiá»n.",
              "4. Clip 10 giÃ¢y cáº¯t tá»« bÃ i phat biá»ƒu 1 tiáº¿ng lÃ m Ä‘á»•i nghÄ©a.\n5. Video tai náº¡n cÅ© Ä‘Æ°á»£c chia sáº» nhÆ° má»›i xáº£y ra.\n6. áº¢nh minh há»a AI ghi rÃµ 'Ä‘Ã¢y lÃ  áº£nh AI'.",
              "7. Video call bá»‹ lag, ngÆ°á»i gá»i yÃªu cáº§u Ä‘á»c OTP.\n8. áº¢nh há»c sinh bá»‹ ghÃ©p máº·t vÃ o ná»™i dung nháº¡y cáº£m.\n9. Video ngÆ°á»i tháº­t nÃ³i tháº­t nhÆ°ng phá»¥ Ä‘á» bá»‹ dá»‹ch sai hoÃ n toÃ n.\n10. TÃ i khoáº£n má»›i dÃ¹ng áº£nh AI Ä‘áº¹p Ä‘á»ƒ káº¿t báº¡n lá»«a Ä‘áº£o.\n11. NhÃ¢n váº­t áº£o (Virtual Influencer) trÃ² chuyá»‡n vá»›i fan.\n12. Clip sá»± kiá»‡n nÃ³ng khÃ´ng rÃµ nguá»“n gá»‘c, gá»ng thuyáº¿t minh AI."
            ], [
              "Nháº­n diá»‡n Ä‘Ãºng loáº¡i rá»§i ro giÃºp báº¡n chá»n cÃ¡ch kiá»ƒm chá»©ng Ä‘Ãºng.",
              "Ná»™i dung minh báº¡ch (cÃ³ ghi rÃµ AI) thÆ°á»ng cÃ³ rá»§i ro tháº¥p nháº¥t.",
              "YÃªu cáº§u vá» tiá»n vÃ  OTP luÃ´n lÃ  rá»§i ro cao nháº¥t."
            ])
          ],
          checkpoint: checkpoint("1.1", [
            q("Deepfake lÃ  gÃ¬?", ["Má»i ná»™i dung sai trÃªn Internet", "Ná»™i dung hÃ¬nh áº£nh, video hoáº·c Ã¢m thanh Ä‘Æ°á»£c táº¡o/chá»‰nh sá»­a Ä‘á»ƒ khiáº¿n ngÆ°á»i xem tin má»™t ngÆ°á»i Ä‘Ã£ nÃ³i hoáº·c lÃ m Ä‘iá»u há» khÃ´ng thá»±c sá»± nÃ³i/lÃ m", "Chá»‰ lÃ  áº£nh chá»‰nh mÃ u", "Chá»‰ lÃ  tin nháº¯n lá»«a Ä‘áº£o khÃ´ng cÃ³ hÃ¬nh áº£nh"], 1, "Deepfake thÆ°á»ng liÃªn quan Ä‘áº¿n viá»‡c máº¡o danh hoáº·c lÃ m sai lá»‡ch hÃ nh Ä‘á»™ng/lá»i nÃ³i cá»§a má»™t ngÆ°á»i."),
            q("Äiá»u nÃ o sau Ä‘Ã¢y lÃ  vÃ­ dá»¥ vá» deepvoice?", ["Má»™t áº£nh phong cáº£nh do AI táº¡o", "Má»™t Ä‘oáº¡n giá»ng nÃ³i giáº£ giá»‘ng ngÆ°á»i thÃ¢n yÃªu cáº§u chuyá»ƒn tiá»n", "Má»™t bÃ i viáº¿t sai chÃ­nh táº£", "Má»™t video tháº­t Ä‘Æ°á»£c Ä‘Äƒng láº¡i tá»« nÄƒm trÆ°á»›c"], 1, "Deepvoice liÃªn quan Ä‘áº¿n giáº£ láº­p hoáº·c chá»‰nh sá»­a giá»ng nÃ³i."),
            q("Repurposed media lÃ  gÃ¬?", ["Ná»™i dung tháº­t nhÆ°ng bá»‹ Ä‘áº·t sai bá»‘i cáº£nh", "Ná»™i dung luÃ´n do AI táº¡o ra", "Ná»™i dung khÃ´ng cÃ³ Ã¢m thanh", "Ná»™i dung Ä‘Æ°á»£c Ä‘Äƒng bá»Ÿi tÃ i khoáº£n chÃ­nh thá»©c"], 0, "Ná»™i dung cÃ³ thá»ƒ tháº­t, nhÆ°ng chÃº thÃ­ch, thá»i gian, Ä‘á»‹a Ä‘iá»ƒm hoáº·c Ã½ nghÄ©a Ä‘i kÃ¨m cÃ³ thá»ƒ sai."),
            q("Táº¥t cáº£ synthetic media Ä‘á»u lÃ  deepfake. ÄÃºng hay sai?", ["ÄÃºng", "Sai"], 1, "Synthetic media cÃ³ thá»ƒ dÃ¹ng cho má»¥c Ä‘Ã­ch sÃ¡ng táº¡o, giÃ¡o dá»¥c hoáº·c minh há»a. NÃ³ trá»Ÿ thÃ nh váº¥n Ä‘á» khi bá»‹ dÃ¹ng Ä‘á»ƒ máº¡o danh, Ä‘Ã¡nh lá»«a hoáº·c gÃ¢y háº¡i."),
            q("Má»™t video bá»‹ cáº¯t ngáº¯n lÃ m thay Ä‘á»•i Ã½ nghÄ©a cÃ¢u nÃ³i ban Ä‘áº§u. ÄÃ¢y phÃ¹ há»£p nháº¥t lÃ :", ["Edited media", "Deepvoice", "MÃ£ Ä‘á»™c", "Máº­t kháº©u yáº¿u"], 0, "Cáº¯t ghÃ©p hoáº·c biÃªn táº­p gÃ¢y hiá»ƒu nháº§m lÃ  má»™t dáº¡ng edited media."),
            q("Má»™t hÃ¬nh áº£nh ngÆ°á»i khÃ´ng tá»“n táº¡i do AI táº¡o ra, Ä‘Æ°á»£c dÃ¹ng lÃ m áº£nh Ä‘áº¡i diá»‡n cho tÃ i khoáº£n lá»«a Ä‘áº£o. Rá»§i ro chÃ­nh lÃ  gÃ¬?", ["áº¢nh quÃ¡ Ä‘áº¹p", "NgÆ°á»i xem cÃ³ thá»ƒ tin vÃ o má»™t danh tÃ­nh giáº£", "áº¢nh khÃ´ng cÃ³ Ã¢m thanh", "áº¢nh táº£i cháº­m"], 1, "HÃ¬nh áº£nh AI cÃ³ thá»ƒ Ä‘Æ°á»£c dÃ¹ng Ä‘á»ƒ dá»±ng há»“ sÆ¡ hoáº·c danh tÃ­nh giáº£."),
            q("VÃ¬ sao khÃ´ng nÃªn káº¿t luáº­n 'video tháº­t' chá»‰ vÃ¬ gÆ°Æ¡ng máº·t vÃ  giá»ng nÃ³i giá»‘ng?", ["VÃ¬ gÆ°Æ¡ng máº·t vÃ  giá»ng nÃ³i cÃ³ thá»ƒ bá»‹ táº¡o hoáº·c chá»‰nh sá»­a báº±ng AI", "VÃ¬ video nÃ o trÃªn máº¡ng cÅ©ng giáº£", "VÃ¬ chá»‰ áº£nh má»›i cÃ³ thá»ƒ bá»‹ giáº£", "VÃ¬ Ã¢m thanh luÃ´n Ä‘Ã¡ng tin hÆ¡n hÃ¬nh áº£nh"], 0, "Deepfake vÃ  deepvoice cÃ³ thá»ƒ máº¡o phá»ng cáº£ khuÃ´n máº·t láº«n giá»ng nÃ³i."),
            q("Má»™t video tháº­t tá»« quá»‘c gia khÃ¡c Ä‘Æ°á»£c Ä‘Äƒng vá»›i chÃº thÃ­ch 'Ä‘ang xáº£y ra táº¡i thÃ nh phá»‘ cá»§a báº¡n'. Báº¡n nÃªn nghi ngá» Ä‘iá»u gÃ¬?", ["Sai bá»‘i cáº£nh", "MÃ¡y tÃ­nh bá»‹ virus", "Máº­t kháº©u bá»‹ lá»™", "Äiá»‡n thoáº¡i bá»‹ há»ng"], 0, "ÄÃ¢y lÃ  dáº¥u hiá»‡u cá»§a repurposed media."),
            q("Äiá»u nÃ o Ä‘Ãºng nháº¥t?", ["Deepfake chá»‰ nguy hiá»ƒm náº¿u hoÃ n háº£o 100%", "Deepfake cÃ³ thá»ƒ nguy hiá»ƒm ngay cáº£ khi chá»‰ Ä‘á»§ giá»‘ng trong vÃ i giÃ¢y vÃ  Ä‘i kÃ¨m Ã¡p lá»±c kháº©n cáº¥p", "Deepfake chá»‰ xuáº¥t hiá»‡n trong phim", "NgÆ°á»i bÃ¬nh thÆ°á»ng khÃ´ng bao giá» lÃ  má»¥c tiÃªu cá»§a deepfake"], 1, "Trong lá»«a Ä‘áº£o, káº» xáº¥u thÆ°á»ng káº¿t há»£p máº¡o danh vá»›i cáº£m xÃºc vÃ  thá»i gian gáº¥p."),
            q("CÃ¢u há»i nÃ o há»¯u Ã­ch nháº¥t khi xem má»™t hÃ¬nh áº£nh nghi do AI táº¡o?", ["áº¢nh nÃ y cÃ³ nhiá»u mÃ u khÃ´ng?", "áº¢nh nÃ y Ä‘ang Ä‘Æ°á»£c dÃ¹ng Ä‘á»ƒ khiáº¿n mÃ¬nh tin Ä‘iá»u gÃ¬?", "áº¢nh nÃ y cÃ³ kÃ­ch thÆ°á»›c bao nhiÃªu?", "áº¢nh nÃ y cÃ³ Ä‘Æ°á»£c Ä‘Äƒng buá»•i sÃ¡ng khÃ´ng?"], 1, "Má»¥c Ä‘Ã­ch sá»­ dá»¥ng vÃ  ngá»¯ cáº£nh quyáº¿t Ä‘á»‹nh má»©c Ä‘á»™ rá»§i ro cá»§a ná»™i dung.")
          ])
        }
      ],
      quiz: [
        q("Deepfake lÃ  gÃ¬?", ["Má»i ná»™i dung sai trÃªn máº¡ng", "Ná»™i dung dÃ¹ng AI Ä‘á»ƒ khiáº¿n ngÆ°á»i ta tin má»™t ngÆ°á»i lÃ m/nÃ³i Ä‘iá»u há» khÃ´ng thá»±c sá»± lÃ m/nÃ³i", "Chá»‰ lÃ  áº£nh chá»‰nh mÃ u", "Má»™t loáº¡i mÃ£ Ä‘á»™c"], 1),
        q("Synthetic media lÃ  gÃ¬?", ["Ná»™i dung Ä‘Æ°á»£c táº¡o hoÃ n toÃ n hoáº·c má»™t pháº§n báº±ng cÃ´ng nghá»‡ sá»‘/AI", "Ná»™i dung báº¯t buá»™c lÃ  lá»«a Ä‘áº£o", "Ná»™i dung chá»‰ cÃ³ vÄƒn báº£n", "Chá»‰ lÃ  áº£nh chá»¥p"], 0),
        q("VÃ¬ sao deepfake ngÃ y cÃ ng thuyáº¿t phá»¥c?", ["Dá»¯ liá»‡u cÃ¡ nhÃ¢n cÃ´ng khai quÃ¡ nhiá»u lÃ m nguyÃªn liá»‡u", "Má»i video Ä‘á»u sáº¯c nÃ©t", "Internet ngÃ y cÃ ng cháº­m", "AI luÃ´n thÃ´ng minh hÆ¡n ngÆ°á»i"], 0),
        q("Ná»™i dung tháº­t nhÆ°ng chÃº thÃ­ch sai Ä‘á»‹a Ä‘iá»ƒm/thá»i gian lÃ  gÃ¬?", ["Deepvoice", "Edited media", "Repurposed media", "Metadata"], 2),
        q("Detector AI bÃ¡o '80% kháº£ nÄƒng lÃ  AI' cÃ³ nghÄ©a lÃ  gÃ¬?", ["Cháº¯c cháº¯n giáº£", "Cháº¯c cháº¯n tháº­t", "Má»™t tÃ­n hiá»‡u cáº§n tham kháº£o cÃ¹ng vá»›i nguá»“n vÃ  bá»‘i cáº£nh", "NÃªn chia sáº» ngay"], 2)
      ]
    },
    {
      id: 2,
      part: "foundation",
      title: "VÃ¬ sao con ngÆ°á»i dá»… bá»‹ lá»«a?",
      duration: "85-95 phÃºt",
      level: "Foundation",
      scenario: "Káº» xáº¥u khÃ´ng táº¥n cÃ´ng mÃ¡y tÃ­nh cá»§a báº¡n, chÃºng táº¥n cÃ´ng cáº£m xÃºc cá»§a báº¡n. Module nÃ y giÃºp báº¡n nháº­n diá»‡n cÃ¡c 'nÃºt báº¥m' tÃ¢m lÃ½ trong lá»«a Ä‘áº£o.",
      outcomes: [
        "Nháº­n diá»‡n 4 nhÃ³m cáº£m xÃºc bá»‹ lá»£i dá»¥ng: Kháº©n cáº¥p, ThÃ¢n quen, Quyá»n lá»±c, Lá»£i Ã­ch.",
        "Hiá»ƒu vá» hiá»‡u á»©ng 'Tháº¥y táº­n máº¯t' vÃ  giá»›i háº¡n cá»§a nÃ³.",
        "PhÃ¡t hiá»‡n 6 dáº¥u hiá»‡u ngÃ´n ngá»¯ thao tÃºng trong tin nháº¯n/cuá»™c gá»i.",
        "Biáº¿t cÃ¡ch lÃ m chá»§ cáº£m xÃºc khi Ä‘á»‘i diá»‡n vá»›i ná»™i dung gÃ¢y sá»‘c."
      ],
      sections: [
        {
          title: "2.1 Bá»‘n nÃºt báº¥m cáº£m xÃºc",
          lessons: [
            lesson("2.1.1", "Kháº©n cáº¥p vÃ  ThÃ¢n quen", [
              "Kháº©n cáº¥p: Táº¡o Ã¡p lá»±c thá»i gian (Ngay bÃ¢y giá», Chá»‰ cÃ²n 5 phÃºt, Gáº¥p láº¯m...). Khi báº¡n vá»™i, nÃ£o bá»™ sáº½ bá» qua cÃ¡c bÆ°á»›c kiá»ƒm chá»©ng logic.",
              "ThÃ¢n quen: Lá»£i dá»¥ng niá»m tin cá»§a báº¡n vÃ o ngÆ°á»i thÃ¢n, báº¡n bÃ¨. Báº¡n thÆ°á»ng háº¡ tháº¥p cáº£nh giÃ¡c khi tháº¥y má»™t gÆ°Æ¡ng máº·t quen thuá»™c hoáº·c gá»ng nÃ³i giá»‘ng ngÆ°á»i nhÃ ."
            ], [
              "CÃ ng vá»™i vÃ ng, cÃ ng dá»… máº¯c sai láº§m.",
              "Niá»m tin cÃ¡ nhÃ¢n lÃ  'lá»— há»•ng' mÃ  deepfake khai thÃ¡c triá»‡t Ä‘á»ƒ."
            ]),
            lesson("2.1.2", "Quyá»n lá»±c vÃ  Lá»£i Ã­ch", [
              "Quyá»n lá»±c: Giáº£ danh cÃ´ng an, bÃ¡c sÄ©, sáº¿p, cÃ¡n bá»™ ngÃ¢n hÃ ng... Ä‘á»ƒ Ä‘e dá»a hoáº·c yÃªu cáº§u báº¡n lÃ m Ä‘iá»u sai quy trÃ¬nh.",
              "Lá»£i Ã­ch: Há»©a háº¹n quÃ  táº·ng, lá»£i nhuáº­n cao, há»c bá»•ng... Ä‘á»ƒ Ä‘Ã¡nh vÃ o sá»± ham muá»‘n hoáº·c hy vá»ng cá»§a báº¡n."
            ], [
              "Quy trÃ¬nh tháº­t khÃ´ng bao giá» yÃªu cáº§u báº¡n bá» qua cÃ¡c bÆ°á»›c an toÃ n.",
              "Lá»i há»©a 'quÃ¡ tá»‘t Ä‘á»ƒ lÃ  tháº­t' thÆ°á»ng lÃ  lá»«a Ä‘áº£o."
            ])
          ]
        },
        {
          title: "2.2 NgÃ´n ngá»¯ thao tÃºng",
          lessons: [
            lesson("2.2.1", "Dáº¥u hiá»‡u trong cÃ¢u chá»¯", [
              "Káº» lá»«a Ä‘áº£o thÆ°á»ng dÃ¹ng cÃ¡c cá»¥m tá»« thiáº¿t káº¿ sáºµn:\n- 'LÃ m ngay': Ãp lá»±c.\n- 'Náº¿u khÃ´ng thÃ¬...': Äe dá»a.\n- 'Chá»‰ mÃ¬nh báº¡n biáº¿t': CÃ´ láº­p.",
              "- 'Cháº¯c cháº¯n 100%': Cam káº¿t áº£o.\n- 'QuÃ¡ tá»‘t Ä‘á»ƒ bá» lá»¡': Dá»¥ dá»—.\n- 'VÃ¬ sá»± an toÃ n cá»§a báº¡n': Giáº£ nhÃ¢n nghÄ©a."
            ], [
              "NgÃ´n ngá»¯ thao tÃºng luÃ´n hÆ°á»›ng báº¡n Ä‘áº¿n hÃ nh Ä‘á»™ng vá»™i vÃ ng.",
              "Nháº­n diá»‡n ngÃ´n ngá»¯ lÃ  bÆ°á»›c quan trá»ng cá»§a Observe."
            ])
          ],
          checkpoint: checkpoint("2.1", [
            q("Káº» xáº¥u nÃ³i 'Äá»«ng nÃ³i vá»›i ai, Ä‘Ã¢y lÃ  bÃ­ máº­t' nháº±m má»¥c Ä‘Ã­ch gÃ¬?", ["Báº£o vá»‡ báº¡n", "CÃ´ láº­p báº¡n khá»i sá»± giÃºp Ä‘á»¡ vÃ  kiá»ƒm chá»©ng", "Táº¡o sá»± báº¥t ngá»", "TuÃ¢n thá»§ phÃ¡p luáº­t"], 1),
            q("Cá»¥m tá»« nÃ o lÃ  dáº¥u hiá»‡u cá»§a sá»± Ä‘e dá»a?", ["Báº¡n cÃ³ thá»ƒ suy nghÄ© thÃªm", "Náº¿u khÃ´ng chuyá»ƒn tiá»n, tÃ i khoáº£n sáº½ bá»‹ khÃ³a vÄ©nh viá»…n", "HÃ£y gá»i láº¡i khi ráº£nh", "Kiá»ƒm tra ká»¹ thÃ´ng tin nhÃ©"], 1)
          ])
        }
      ],
      quiz: [
        q("VÃ¬ sao deepfake káº¿t há»£p vá»›i Social Engineering láº¡i nguy hiá»ƒm?", ["VÃ¬ nÃ³ Ä‘Ã¡nh vÃ o cáº£ máº¯t, tai vÃ  cáº£m xÃºc cá»§a náº¡n nhÃ¢n", "VÃ¬ nÃ³ lÃ m video nÃ©t hÆ¡n", "VÃ¬ nÃ³ lÃ m tÄƒng dung lÆ°á»£ng file", "VÃ¬ nÃ³ lÃ m video cÃ³ phá»¥ Ä‘á»"], 0),
        q("Khi nháº­n Ä‘Æ°á»£c tin nháº¯n mÆ°á»£n tiá»n tá»« ngÆ°á»i quen, Ä‘iá»u Ä‘áº§u tiÃªn nÃªn lÃ m lÃ  gÃ¬?", ["Chuyá»ƒn ngay", "Dá»«ng láº¡i vÃ  xÃ¡c minh qua kÃªnh Ä‘á»™c láº­p (nhÆ° gá»i Ä‘iá»‡n trá»±c tiáº¿p)", "Gá»­i mÃ£ OTP cho há»", "Chia sáº» cho ngÆ°á»i khÃ¡c"], 1),
        q("NÃºt báº¥m 'Quyá»n lá»±c' thÆ°á»ng Ä‘i kÃ¨m vá»›i cáº£m xÃºc nÃ o?", ["Sá»£ hÃ£i vÃ  phá»¥c tÃ¹ng", "Vui váº»", "HÃ o há»©ng", "Buá»“n bÃ£"], 0),
        q("Liar's dividend lÃ  rá»§i ro gÃ¬?", ["Ná»™i dung tháº­t bá»‹ phá»§ nháº­n báº±ng cÃ¡ch gá»i nÃ³ lÃ  deepfake", "Lá»£i nhuáº­n tá»« viá»‡c nÃ³i dá»‘i", "QuÃ  táº·ng tá»« AI", "PhÃ­ Ä‘Äƒng kÃ½ khÃ³a há»c"], 0),
        q("Má»¥c tiÃªu cá»§a Module 2 lÃ  gÃ¬?", ["Dáº¡y cÃ¡ch lá»«a ngÆ°á»i khÃ¡c", "GiÃºp nháº­n diá»‡n cÃ¡c báº«y cáº£m xÃºc Ä‘á»ƒ pháº£n á»©ng bÃ¬nh tÄ©nh hÆ¡n", "Dáº¡y láº­p trÃ¬nh AI", "Dáº¡y cÃ¡ch xÃ³a áº£nh trÃªn máº¡ng"], 1)
      ]
    },
    {
      id: 3,
      part: "foundation",
      title: "NhÃ¬n, Nghe, Äá»c: Dáº¥u hiá»‡u nghi váº¥n",
      duration: "100-110 phÃºt",
      level: "Foundation",
      scenario: "Module 3 cung cáº¥p cho báº¡n 'kÃ­nh hiá»ƒn vi' Ä‘á»ƒ soi cÃ¡c lá»—i ká»¹ thuáº­t vÃ  sá»± phi lÃ½ trong ná»™i dung. Báº¡n sáº½ há»c cÃ¡ch quan sÃ¡t tá»« chi tiáº¿t Ä‘áº¿n bá»‘i cáº£nh tá»•ng thá»ƒ.",
      outcomes: [
        "Sá»­ dá»¥ng Checklist 3 lá»›p: HÃ¬nh áº£nh - Ã‚m thanh - Ngá»¯ cáº£nh.",
        "PhÃ¡t hiá»‡n lá»—i ká»¹ thuáº­t á»Ÿ máº¯t, miá»‡ng, Ã¡nh sÃ¡ng vÃ  vÃ¹ng biÃªn.",
        "Nháº­n diá»‡n dáº¥u hiá»‡u cá»§a Deepvoice vÃ  Ã¢m thanh AI.",
        "Biáº¿t cÃ¡ch Ä‘Ã¡nh giÃ¡ sá»± phÃ¹ há»£p cá»§a bá»‘i cáº£nh ná»™i dung."
      ],
      sections: [
        {
          title: "3.1 Dáº¥u hiá»‡u HÃ¬nh áº£nh vÃ  Video",
          lessons: [
            lesson("3.1.1", "Soi lá»—i khuÃ´n máº·t vÃ  chuyá»ƒn Ä‘á»™ng", [
              "KhuÃ´n máº·t: Da quÃ¡ má»‹n, vÃ¹ng rÃ¬a máº·t bá»‹ nhÃ²e hoáº·c rung khi ngÆ°á»i Ä‘Ã³ quay Ä‘áº§u nhanh.",
              "Máº¯t vÃ  Miá»‡ng: Nhá»‹p nhÃ¡y máº¯t khÃ´ng tá»± nhiÃªn, Ã¡nh máº¯t khÃ´ng khá»›p hÆ°á»›ng nhÃ¬n, rÄƒng bá»‹ má» hoáº·c mÃ©o khi nÃ³i.",
              "Váº­t thá»ƒ che máº·t: Khi tay hoáº·c váº­t thá»ƒ Ä‘i ngang qua máº·t, khuÃ´n máº·t cÃ³ thá»ƒ bá»‹ biáº¿n dáº¡ng hoáº·c Ä‘á»ƒ lá»™ 'máº·t tháº­t' bÃªn dÆ°á»›i trong khoáº£nh kháº¯c."
            ], [
              "Táº­p trung vÃ o nhá»¯ng chi tiáº¿t AI khÃ³ xá»­ lÃ½: tÃ³c, tai, káº½ rÄƒng vÃ  vÃ¹ng biÃªn.",
              "Lá»—i ká»¹ thuáº­t lÃ  tÃ­n hiá»‡u, khÃ´ng pháº£i káº¿t luáº­n duy nháº¥t."
            ]),
            lesson("3.1.2", "Ãnh sÃ¡ng vÃ  Ná»n", [
              "Ãnh sÃ¡ng: BÃ³ng trÃªn máº·t khÃ´ng khá»›p vá»›i nguá»“n sÃ¡ng trong ná»n. Da máº·t cÃ³ Ä‘á»™ sÃ¡ng khÃ¡c háº³n vá»›i cá»•.",
              "Ná»n: CÃ¡c Ä‘Æ°á»ng tháº³ng (cáº¡nh tÆ°á»ng, báº£ng hiá»‡u) bá»‹ mÃ©o, logo bá»‹ sai chÃ­nh táº£, hoáº·c váº­t thá»ƒ á»Ÿ ná»n thay Ä‘á»•i ká»³ láº¡ khi video phÃ¡t."
            ], [
              "Quan sÃ¡t sá»± nháº¥t quÃ¡n giá»¯a ngÆ°á»i vÃ  cáº£nh.",
              "Logo vÃ  chá»¯ viáº¿t thÆ°á»ng lÃ  Ä‘iá»ƒm yáº¿u cá»§a cÃ¡c mÃ´ hÃ¬nh AI táº¡o hÃ¬nh."
            ])
          ]
        },
        {
          title: "3.2 Dáº¥u hiá»‡u Ã‚m thanh vÃ  Ngá»¯ cáº£nh",
          lessons: [
            lesson("3.2.1", "Nghe ra Deepvoice", [
              "Giá»ng nÃ³i Ä‘á»u Ä‘á»u: Thiáº¿u nhá»‹p thá»Ÿ tá»± nhiÃªn, thiáº¿u cáº£m xÃºc hoáº·c cÃ¡c Ã¢m Ä‘iá»‡u Ä‘áº·c trÆ°ng cá»§a ngÆ°á»i Ä‘Ã³.",
              "PhÃ¡t Ã¢m láº¡: Sai tÃªn riÃªng, Ä‘á»‹a danh, hoáº·c cÃ³ cÃ¡c Ã¢m thanh nhiá»…u ká»¹ thuáº­t khÃ´ng giá»‘ng tiáº¿ng á»“n mÃ´i trÆ°á»ng.",
              "Tiáº¿ng ná»n: Ã‚m thanh ná»n quÃ¡ sáº¡ch hoáº·c bá»‹ ngáº¯t quÃ£ng Ä‘á»™t ngá»™t."
            ], [
              "Giá»ng nÃ³i giá»‘ng khÃ´ng Ä‘á»§ Ä‘á»ƒ tin danh tÃ­nh.",
              "Há»i nhá»¯ng cÃ¢u há»i báº¥t ngá» Ä‘á»ƒ kiá»ƒm tra pháº£n á»©ng cá»§a ngÆ°á»i gá»i."
            ]),
            lesson("3.2.2", "ÄÃ¡nh giÃ¡ Ngá»¯ cáº£nh", [
              "Sá»± phÃ¹ há»£p: Ná»™i dung cÃ³ khá»›p vá»›i tÃ­nh cÃ¡ch, thÃ³i quen vÃ  Ä‘á»‹a Ä‘iá»ƒm thÆ°á»ng tháº¥y cá»§a ngÆ°á»i Ä‘Ã³ khÃ´ng?",
              "Nguá»“n gá»­i: TÃ i khoáº£n gá»­i cÃ³ dáº¥u xÃ¡c minh khÃ´ng? CÃ³ pháº£i tÃ i khoáº£n báº¡n Ä‘Ã£ káº¿t báº¡n tá»« lÃ¢u khÃ´ng?",
              "HÃ nh Ä‘á»™ng yÃªu cáº§u: CÃ³ yÃªu cáº§u tiá»n, OTP, máº­t kháº©u, hay giá»¯ bÃ­ máº­t khÃ´ng?"
            ], [
              "Ngá»¯ cáº£nh rá»§i ro cao quan trá»ng hÆ¡n cáº£ lá»—i ká»¹ thuáº­t.",
              "Báº¡n khÃ´ng cáº§n chá»©ng minh deepfake má»›i cÃ³ quyá»n tá»« chá»‘i yÃªu cáº§u Ä‘Ã¡ng nghi."
            ])
          ],
          checkpoint: checkpoint("3.1", [
            q("Dáº¥u hiá»‡u nÃ o thÆ°á»ng tháº¥y á»Ÿ máº¯t trong video deepfake?", ["Máº¯t chá»›p quÃ¡ nhiá»u", "Nhá»‹p nhÃ¡y máº¯t khÃ´ng tá»± nhiÃªn hoáº·c Ã¡nh máº¯t khÃ´ng khá»›p hÆ°á»›ng Ä‘áº§u", "Máº¯t luÃ´n nháº¯m", "Máº¯t cÃ³ mÃ u láº¡"], 1),
            q("Äiá»u gÃ¬ ÄÃNG NGHI nháº¥t trong má»™t tin nháº¯n thoáº¡i?", ["Tiáº¿ng chim hÃ³t á»Ÿ ná»n", "Giá»ng nÃ³i Ä‘á»u Ä‘á»u thiáº¿u nhá»‹p thá»Ÿ tá»± nhiÃªn vÃ  yÃªu cáº§u tiá»n gáº¥p", "NÃ³i tiáº¿ng Viá»‡t chuáº©n", "NÃ³i nhanh"], 1)
          ])
        }
      ],
      quiz: [
        q("BÆ°á»›c Ä‘áº§u tiÃªn khi xem má»™t video gÃ¢y sá»‘c lÃ  gÃ¬?", ["Chia sáº» ngay", "Dá»«ng láº¡i vÃ  quan sÃ¡t cháº­m hÆ¡n", "Káº¿t luáº­n lÃ  giáº£", "Táº£i vá» mÃ¡y"], 1),
        q("Checklist 3 lá»›p quan sÃ¡t gá»“m nhá»¯ng gÃ¬?", ["HÃ¬nh áº£nh, Ã‚m thanh, Ngá»¯ cáº£nh", "SÃ¡ng, TrÆ°a, Tá»‘i", "TÃªn, Tuá»•i, Äá»‹a chá»‰", "Like, Share, Comment"], 0),
        q("Táº¡i sao video tháº­t cÅ©ng cÃ³ thá»ƒ trÃ´ng giá»‘ng deepfake?", ["Do máº¡ng yáº¿u, nÃ©n video hoáº·c dÃ¹ng filter lÃ m Ä‘áº¹p", "VÃ¬ AI luÃ´n sao chÃ©p video tháº­t", "VÃ¬ má»i video Ä‘á»u lÃ  AI", "VÃ¬ mÃ n hÃ¬nh bá»‹ há»ng"], 0),
        q("Dáº¥u hiá»‡u nÃ o thuá»™c lá»›p 'Ngá»¯ cáº£nh'?", ["Máº¯t chá»›p láº¡", "YÃªu cáº§u chuyá»ƒn tiá»n vÃ o tÃ i khoáº£n láº¡ vÃ  giá»¯ bÃ­ máº­t", "Giá»ng nÃ³i Ä‘á»u Ä‘á»u", "Ná»n bá»‹ mÃ©o"], 1),
        q("Má»¥c tiÃªu cá»§a quan sÃ¡t lÃ  Ä‘á»ƒ lÃ m gÃ¬?", ["Äá»ƒ káº¿t luáº­n ngay tháº­t giáº£", "Äá»ƒ thu tháº­p tÃ­n hiá»‡u xem cÃ³ cáº§n kiá»ƒm chá»©ng thÃªm khÃ´ng", "Äá»ƒ tÃ¬m cÃ¡ch táº¡o video tÆ°Æ¡ng tá»±", "Äá»ƒ bÃ¡o cÃ¡o má»i video"], 1)
      ]
    },
    {
      id: 4,
      part: "recognition",
      title: "Quy trÃ¬nh Deepfense Check",
      duration: "115-125 phÃºt",
      level: "Recognition",
      scenario: "DÃ¹ video trÃ´ng tháº­t Ä‘áº¿n Ä‘Ã¢u, báº¡n váº«n cáº§n má»™t quy trÃ¬nh an toÃ n Ä‘á»ƒ ra quyáº¿t Ä‘á»‹nh. Deepfense Check lÃ  5 bÆ°á»›c báº£o vá»‡ báº¡n trÆ°á»›c má»i ná»™i dung nghi váº¥n.",
      outcomes: [
        "Thá»±c hÃ nh thÃ nh tháº¡o 5 bÆ°á»›c: Pause - Observe - Verify - Trace - Decide.",
        "Biáº¿t cÃ¡ch sá»­ dá»¥ng KÃªnh Ä‘á»™c láº­p Ä‘á»ƒ xÃ¡c minh thÃ´ng tin.",
        "Sá»­ dá»¥ng cÃ¡c cÃ´ng cá»¥ kiá»ƒm chá»©ng (Reverse search, Detector) Ä‘Ãºng cÃ¡ch.",
        "XÃ¢y dá»±ng thÃ³i quen 'kiá»ƒm tra trÆ°á»›c khi tin'."
      ],
      sections: [
        {
          title: "4.1 NÄƒm bÆ°á»›c kiá»ƒm chá»©ng",
          lessons: [
            lesson("4.1.1", "Pause vÃ  Observe", [
              "Pause: Dá»«ng láº¡i 30 giÃ¢y. Äá»«ng Ä‘á»ƒ cáº£m xÃºc (sá»£, lo, hÆ°ng pháº¥n) Ä‘iá»u khiá»ƒn ngÃ³n tay báº¡n.",
              "Observe: Sá»­ dá»¥ng checklist 3 lá»›p Ä‘Ã£ há»c á»Ÿ Module 3. Ghi nháº­n cÃ¡c tÃ­n hiá»‡u nghi váº¥n vá» ká»¹ thuáº­t vÃ  hÃ nh vi."
            ], [
              "Dá»«ng láº¡i lÃ  ká»¹ nÄƒng quan trá»ng nháº¥t.",
              "Quan sÃ¡t khÃ´ng chá»‰ lÃ  tÃ¬m lá»—i, mÃ  lÃ  thu tháº­p dá»¯ kiá»‡n."
            ]),
            lesson("4.1.2", "Verify vÃ  Trace", [
              "Verify: XÃ¡c minh qua KÃŠNH Äá»˜C Láº¬P. Náº¿u ngÆ°á»i thÃ¢n nháº¯n tin, hÃ£y gá»i vÃ o sá»‘ Ä‘iá»‡n thoáº¡i báº¡n Ä‘Ã£ lÆ°u. Náº¿u ngÃ¢n hÃ ng gá»i, hÃ£y tá»± má»Ÿ app chÃ­nh thá»©c.",
              "Trace: Truy tÃ¬m nguá»“n gá»‘c. Ai Ä‘Äƒng Ä‘áº§u tiÃªn? Video nÃ y cÃ³ tá»« bao giá»? CÃ³ nguá»“n tin chÃ­nh thá»‘ng nÃ o xÃ¡c nháº­n khÃ´ng?"
            ], [
              "KÃªnh Ä‘á»™c láº­p pháº£i lÃ  kÃªnh báº¡n Ä‘Ã£ biáº¿t vÃ  tin tÆ°á»Ÿng tá»« trÆ°á»›c.",
              "KhÃ´ng dÃ¹ng link hoáº·c sá»‘ Ä‘iá»‡n thoáº¡i má»›i Ä‘Æ°á»£c cung cáº¥p trong chÃ­nh tin nháº¯n nghi váº¥n."
            ]),
            lesson("4.1.3", "Decide", [
              "Decide: Ra quyáº¿t Ä‘á»‹nh. CÃ³ 3 hÆ°á»›ng: 1. Tin vÃ  hÃ nh Ä‘á»™ng (náº¿u Ä‘Ã£ xÃ¡c minh 100%). 2. KhÃ´ng tin vÃ  bá» qua. 3. Cáº£nh bÃ¡o vÃ  bÃ¡o cÃ¡o (náº¿u tháº¥y dáº¥u hiá»‡u lá»«a Ä‘áº£o rÃµ rÃ ng)."
            ], [
              "An toÃ n lÃ  Æ°u tiÃªn sá»‘ 1.",
              "Náº¿u khÃ´ng cháº¯c cháº¯n, hÃ£y chá»n phÆ°Æ¡ng Ã¡n khÃ´ng hÃ nh Ä‘á»™ng."
            ])
          ]
        },
        {
          title: "4.2 CÃ´ng cá»¥ há»— trá»£",
          lessons: [
            lesson("4.2.1", "Reverse Search vÃ  Detector", [
              "Reverse Image Search: GiÃºp tÃ¬m xem áº£nh nÃ y Ä‘Ã£ tá»«ng xuáº¥t hiá»‡n á»Ÿ Ä‘Ã¢u, cÃ³ bá»‹ láº¥y tá»« má»™t sá»± kiá»‡n cÅ© khÃ´ng.",
              "AI Detector: CÃ´ng cá»¥ giÃºp dá»± Ä‘oÃ¡n kháº£ nÄƒng can thiá»‡p cá»§a AI. LÆ°u Ã½: Káº¿t quáº£ chá»‰ mang tÃ­nh tham kháº£o, khÃ´ng pháº£i phÃ¡n quyáº¿t cuá»‘i cÃ¹ng.",
              "Provenance (Content Credentials): Má»™t sá»‘ ná»™i dung sá»‘ hiá»‡n nay cÃ³ Ä‘Ã­nh kÃ¨m 'giáº¥y khai sinh' ghi láº¡i lá»‹ch sá»­ táº¡o vÃ  chá»‰nh sá»­a."
            ], [
              "CÃ´ng cá»¥ há»— trá»£ tÆ° duy, khÃ´ng thay tháº¿ tÆ° duy.",
              "LuÃ´n káº¿t há»£p káº¿t quáº£ cÃ´ng cá»¥ vá»›i phÃ¢n tÃ­ch bá»‘i cáº£nh."
            ])
          ],
          checkpoint: checkpoint("4.1", [
            q("Trong Deepfense Check, 'Verify' cÃ³ nghÄ©a lÃ  gÃ¬?", ["Há»i láº¡i chÃ­nh ngÆ°á»i gá»­i", "XÃ¡c minh qua má»™t kÃªnh Ä‘á»™c láº­p mÃ  báº¡n Ä‘Ã£ biáº¿t tá»« trÆ°á»›c", "Tin vÃ o cáº£m giÃ¡c", "Chá» 1 ngÃ y"], 1),
            q("Äiá»u nÃ o ÄÃšNG vá» AI Detector?", ["LuÃ´n chÃ­nh xÃ¡c 100%", "Chá»‰ lÃ  má»™t tÃ­n hiá»‡u tham kháº£o, cÃ³ thá»ƒ sai", "DÃ¹ng Ä‘á»ƒ thay tháº¿ má»i bÆ°á»›c kiá»ƒm tra khÃ¡c", "Chá»‰ dÃ¹ng Ä‘Æ°á»£c cho áº£nh"], 1)
          ])
        }
      ],
      quiz: [
        q("Thá»© tá»± Ä‘Ãºng cá»§a Deepfense Check lÃ  gÃ¬?", ["Pause, Observe, Verify, Trace, Decide", "Observe, Pause, Trace, Verify, Decide", "Verify, Trace, Observe, Pause, Decide", "Like, Share, Comment, Post"], 0),
        q("KÃªnh nÃ o lÃ  KÃŠNH Äá»˜C Láº¬P an toÃ n?", ["Link ngÆ°á»i láº¡ gá»­i", "Sá»‘ Ä‘iá»‡n thoáº¡i báº¡n Ä‘Ã£ lÆ°u tá»« trÆ°á»›c trong danh báº¡", "Sá»‘ Ä‘iá»‡n thoáº¡i má»›i trong tin nháº¯n mÆ°á»£n tiá»n", "PhÃ²ng chat mÃ  báº¡n vá»«a Ä‘Æ°á»£c má»i vÃ o"], 1),
        q("Táº¡i sao cáº§n Trace (Truy nguá»“n)?", ["Äá»ƒ biáº¿t video Ä‘áº¹p khÃ´ng", "Äá»ƒ tÃ¬m bá»‘i cáº£nh thá»±c sá»± vÃ  nguá»“n gá»‘c Ä‘áº§u tiÃªn cá»§a ná»™i dung", "Äá»ƒ tÄƒng lÆ°á»£t xem", "Äá»ƒ táº£i video nhanh hÆ¡n"], 1),
        q("Khi nÃ o báº¡n cÃ³ thá»ƒ bá» qua bÆ°á»›c Verify?", ["Khi video ráº¥t nÃ©t", "Khi ngÆ°á»i gá»­i nÃ³i Ä‘ang ráº¥t gáº¥p", "Khi báº¡n Ä‘Ã£ xÃ¡c minh cháº¯c cháº¯n 100% qua kÃªnh Ä‘á»™c láº­p khÃ¡c", "KhÃ´ng bao giá»"], 2),
        q("Quyáº¿t Ä‘á»‹nh an toÃ n nháº¥t khi chÆ°a cháº¯c cháº¯n lÃ  gÃ¬?", ["Cá»© lÃ m theo yÃªu cáº§u", "KhÃ´ng hÃ nh Ä‘á»™ng, khÃ´ng chuyá»ƒn tiá»n, khÃ´ng chia sáº»", "Há»i Ã½ kiáº¿n cá»™ng Ä‘á»“ng máº¡ng", "Chia sáº» link Ä‘á»ƒ má»i ngÆ°á»i kiá»ƒm tra giÃºp"], 1)
      ]
    },
    {
      id: 5,
      part: "recognition",
      title: "Deepfake len lá»i vÃ o má»i váº¥n Ä‘á» sá»‘",
      duration: "125-135 phÃºt",
      level: "Recognition",
      scenario: "Deepfake khÃ´ng Ä‘á»©ng má»™t mÃ¬nh. NÃ³ len lá»i vÃ o tÃ i chÃ­nh, danh dá»±, tin tá»©c vÃ  cÃ¡c má»‘i quan há»‡ xÃ£ há»™i. Module nÃ y giÃºp báº¡n á»©ng phÃ³ vá»›i cÃ¡c ká»‹ch báº£n thá»±c táº¿.",
      outcomes: [
        "Nháº­n diá»‡n 5 ká»‹ch báº£n lá»«a Ä‘áº£o tÃ i chÃ­nh dÃ¹ng Deepfake.",
        "Biáº¿t cÃ¡ch xá»­ lÃ½ Ä‘Ãºng khi gáº·p ná»™i dung nháº¡y cáº£m hoáº·c máº¡o danh.",
        "Hiá»ƒu vá» rá»§i ro cá»§a tin giáº£ vÃ  sai bá»‘i cáº£nh trong xÃ£ há»™i.",
        "XÃ¢y dá»±ng pháº£n xáº¡ báº£o vá»‡ náº¡n nhÃ¢n vÃ  cá»™ng Ä‘á»“ng sá»‘."
      ],
      sections: [
        {
          title: "5.1 TÃ i chÃ­nh vÃ  Máº¡o danh",
          lessons: [
            lesson("5.1.1", "Ká»‹ch báº£n mÆ°á»£n tiá»n vÃ  giáº£ danh sáº¿p", [
              "NgÆ°á»i thÃ¢n cáº§n tiá»n gáº¥p: Video call má», tiáº¿ng giáº­t, cÃ¢u chuyá»‡n cáº£m Ä‘á»™ng/kháº©n cáº¥p. YÃªu cáº§u chuyá»ƒn tiá»n vÃ o tÃ i khoáº£n láº¡.",
              "Giáº£ danh sáº¿p/lÃ£nh Ä‘áº¡o: YÃªu cáº§u chuyá»ƒn khoáº£n gáº¥p ngoÃ i quy trÃ¬nh, yÃªu cáº§u giá»¯ bÃ­ máº­t, dÃ¹ng gá»ng nÃ³i/video giá»‘ng sáº¿p Ä‘á»ƒ táº¡o Ã¡p lá»±c."
            ], [
              "Tiá»n Ä‘i lÃ  khÃ³ quay láº¡i. HÃ£y cháº­m láº¡i Ä‘á»ƒ xÃ¡c minh.",
              "Quy trÃ¬nh chuyá»ƒn tiá»n cá»§a cÃ´ng ty pháº£i luÃ´n Ä‘Æ°á»£c tÃ´n trá»ng."
            ]),
            lesson("5.1.2", "Giáº£ danh cÆ¡ quan chá»©c nÄƒng vÃ  Ä‘áº§u tÆ°", [
              "CÃ´ng an/TÃ²a Ã¡n giáº£: Gá»i video call Ä‘e dá»a, yÃªu cáº§u Ä‘á»c OTP hoáº·c chuyá»ƒn tiá»n 'Ä‘á»ƒ Ä‘iá»u tra'.",
              "NgÆ°á»i ná»•i tiáº¿ng quáº£ng cÃ¡o Ä‘áº§u tÆ°: DÃ¹ng deepfake Ä‘á»ƒ giáº£ máº¡o ngÆ°á»i ná»•i tiáº¿ng há»©a háº¹n lá»£i nhuáº­n cao. Má»¥c tiÃªu lÃ  dá»¥ báº¡n náº¡p tiá»n hoáº·c báº¥m vÃ o link lá»«a Ä‘áº£o."
            ], [
              "CÆ¡ quan chá»©c nÄƒng khÃ´ng lÃ m viá»‡c qua video call yÃªu cáº§u tiá»n/OTP.",
              "Lá»£i nhuáº­n 'trÃªn trá»i' thÆ°á»ng Ä‘i kÃ¨m vá»›i báº«y lá»«a Ä‘áº£o."
            ])
          ]
        },
        {
          title: "5.2 Danh dá»± vÃ  TrÃ¡ch nhiá»‡m xÃ£ há»™i",
          lessons: [
            lesson("5.2.1", "Xá»­ lÃ½ ná»™i dung nháº¡y cáº£m vÃ  máº¡o danh", [
              "Náº¿u tháº¥y áº£nh/video nháº¡y cáº£m nghi bá»‹ ghÃ©p: KhÃ´ng xem thÃªm, khÃ´ng lan truyá»n, bÃ¡o cÃ¡o ná»n táº£ng vÃ  há»— trá»£ náº¡n nhÃ¢n.",
              "Náº¿u bá»‹ máº¡o danh: ThÃ´ng bÃ¡o cho báº¡n bÃ¨ qua kÃªnh chÃ­nh thá»©c, lÆ°u báº±ng chá»©ng vÃ  bÃ¡o cÃ¡o tÃ i khoáº£n giáº£."
            ], [
              "Sá»± im láº·ng cá»§a cá»™ng Ä‘á»“ng trÆ°á»›c cÃ¡i xáº¥u giÃºp náº¡n nhÃ¢n bá»›t Ä‘au thÆ°Æ¡ng.",
              "Báº£o vá»‡ ngÆ°á»i khÃ¡c cÅ©ng lÃ  báº£o vá»‡ chÃ­nh mÃ¬nh."
            ]),
            lesson("5.2.2", "Tin giáº£ vÃ  TrÃ¡ch nhiá»‡m chia sáº»", [
              "Video gÃ¢y pháº«n ná»™: ThÆ°á»ng bá»‹ cáº¯t gá»t bá»‘i cáº£nh Ä‘á»ƒ Ä‘á»‹nh hÆ°á»›ng dÆ° luáº­n. HÃ£y tÃ¬m báº£n Ä‘áº§y Ä‘á»§.",
              "TrÃ¡ch nhiá»‡m sá»‘: TrÆ°á»›c khi nháº¥n 'Share', hÃ£y tá»± há»i: Náº¿u thÃ´ng tin nÃ y sai, ai sáº½ bá»‹ háº¡i?"
            ], [
              "Cáº£m xÃºc máº¡nh lÃ  káº» thÃ¹ cá»§a sá»± tháº­t.",
              "Chia sáº» cÃ³ trÃ¡ch nhiá»‡m lÃ  gÃ³p pháº§n xÃ¢y dá»±ng máº¡ng lÆ°á»›i an toÃ n."
            ])
          ],
          checkpoint: checkpoint("5.1", [
            q("Dáº¥u hiá»‡u Ä‘á» máº¡nh nháº¥t trong má»™t cuá»™c gá»i mÆ°á»£n tiá»n lÃ  gÃ¬?", ["Video bá»‹ lag", "YÃªu cáº§u chuyá»ƒn tiá»n vÃ o má»™t tÃ i khoáº£n khÃ´ng pháº£i tÃªn ngÆ°á»i thÃ¢n vÃ  báº£o giá»¯ bÃ­ máº­t", "NÃ³i chuyá»‡n lÃ¢u", "ChÃ o há»i thÃ¢n máº­t"], 1),
            q("Liar's dividend gÃ¢y háº¡i gÃ¬?", ["GiÃºp káº» xáº¥u phá»§ nháº­n nhá»¯ng sá»± tháº­t hiá»ƒn nhiÃªn báº±ng cÃ¡ch gá»i nÃ³ lÃ  deepfake", "LÃ m tÄƒng giÃ¡ trá»‹ Ä‘á»“ng tiá»n", "LÃ m Ä‘áº¹p video", "LÃ m tÄƒng tá»‘c Ä‘á»™ máº¡ng"], 0)
          ])
        }
      ],
      quiz: [
        q("NgÃ¢n hÃ ng yÃªu cáº§u Ä‘á»c OTP qua video call Ä‘á»ƒ 'xÃ¡c minh', báº¡n lÃ m gÃ¬?", ["Äá»c ngay", "Tá»« chá»‘i vÃ  tá»± gá»i tá»•ng Ä‘Ã i chÃ­nh thá»©c cá»§a ngÃ¢n hÃ ng", "Gá»­i qua tin nháº¯n", "Cung cáº¥p máº­t kháº©u thay tháº¿"], 1),
        q("Quy táº¯c vÃ ng vá» tiá»n trong thá»i Ä‘áº¡i deepfake lÃ  gÃ¬?", ["Chuyá»ƒn trÆ°á»›c há»i sau", "KhÃ´ng chuyá»ƒn tiá»n/Ä‘á»c OTP khi Ä‘ang bá»‹ Ã©p thá»i gian; luÃ´n xÃ¡c minh qua kÃªnh Ä‘á»™c láº­p", "Chá»‰ chuyá»ƒn vÃ o buá»•i sÃ¡ng", "Tin vÃ o máº·t gá»ng giá»‘ng"], 1),
        q("Náº¿u lá»¡ chuyá»ƒn tiá»n cho káº» lá»«a Ä‘áº£o, báº¡n nÃªn lÃ m gÃ¬ sá»›m nháº¥t?", ["XÃ³a háº¿t dáº¥u váº¿t", "LiÃªn há»‡ ngÃ¢n hÃ ng, lÆ°u báº±ng chá»©ng vÃ  bÃ¡o cÃ¡o cÆ¡ quan chá»©c nÄƒng", "Im láº·ng chá» may máº¯n", "Náº¡p thÃªm Ä‘á»ƒ láº¥y láº¡i"], 1),
        q("Má»¥c tiÃªu cá»§a káº» xáº¥u khi giáº£ danh sáº¿p lÃ  gÃ¬?", ["Ã‰p báº¡n bá» qua quy trÃ¬nh an toÃ n cá»§a tá»• chá»©c", "Äá»ƒ lÃ m quen vá»›i báº¡n", "Äá»ƒ dáº¡y báº¡n cÃ¡ch dÃ¹ng AI", "Äá»ƒ kiá»ƒm tra tá»‘c Ä‘á»™ lÃ m viá»‡c"], 0),
        q("Táº¡i sao khÃ´ng nÃªn chia sáº» video gÃ¢y sá»‘c khi chÆ°a rÃµ nguá»“n?", ["VÃ¬ nÃ³ lÃ m tá»‘n bÄƒng thÃ´ng", "VÃ¬ báº¡n cÃ³ thá»ƒ Ä‘ang lan truyá»n tin giáº£ hoáº·c gÃ¢y háº¡i cho náº¡n nhÃ¢n", "VÃ¬ nÃ³ lÃ m náº·ng mÃ¡y", "VÃ¬ nÃ³ khÃ´ng cÃ³ nháº¡c"], 1)
      ]
    },
    {
      id: 6,
      part: "response",
      title: "PhÃ²ng vá»‡ cÃ¡ nhÃ¢n vÃ  cá»™ng Ä‘á»“ng",
      duration: "95-110 phÃºt",
      level: "Response",
      scenario: "Sau 5 module, An nháº­n ra phÃ²ng vá»‡ khÃ´ng chá»‰ lÃ  ká»¹ nÄƒng cÃ¡ nhÃ¢n, mÃ  lÃ  thÃ³i quen cá»™ng Ä‘á»“ng. HÃ£y thiáº¿t láº­p 'lÃ¡ cháº¯n' cho báº¡n vÃ  nhá»¯ng ngÆ°á»i thÃ¢n yÃªu.",
      outcomes: [
        "Thiáº¿t láº­p Ä‘Æ°á»£c bá»™ quy táº¯c Deepfense Shield cho báº£n thÃ¢n vÃ  gia Ä‘Ã¬nh.",
        "Biáº¿t cÃ¡ch vá»‡ sinh dá»¯ liá»‡u cÃ¡ nhÃ¢n Ä‘á»ƒ giáº£m rá»§i ro bá»‹ máº¡o danh.",
        "Biáº¿t cÃ¡ch lÆ°u báº±ng chá»©ng vÃ  bÃ¡o cÃ¡o sá»± cá»‘ Ä‘Ãºng quy trÃ¬nh.",
        "HoÃ n thÃ nh Capstone tá»•ng há»£p Ä‘á»ƒ Ä‘áº¡t chá»©ng chá»‰."
      ],
      sections: [
        {
          title: "6.1 Bá»™ quy táº¯c Deepfense Shield",
          lessons: [
            lesson("6.1.1", "NÄƒm lá»›p báº£o vá»‡ (Deepfense Shield)", [
              "1. Family Code: CÃ³ cÃ¢u xÃ¡c minh riÃªng cho gia Ä‘Ã¬nh.\n2. Money Delay: TrÃ¬ hoÃ£n báº¯t buá»™c trÆ°á»›c má»i yÃªu cáº§u tiá»n báº¥t thÆ°á»ng.\n3. Two-Channel Rule: XÃ¡c minh qua Ã­t nháº¥t hai kÃªnh Ä‘á»™c láº­p.",
              "4. No Shame Reporting: BÃ¡o cÃ¡o sá»›m mÃ  khÃ´ng lÃ m náº¡n nhÃ¢n xáº¥u há»•.\n5. Evidence First: Æ¯u tiÃªn lÆ°u báº±ng chá»©ng an toÃ n trÆ°á»›c khi xÃ³a/cháº·n."
            ], [
              "PhÃ²ng vá»‡ tá»‘t nháº¥t lÃ  cÃ³ quy táº¯c Ä‘Ã£ thá»‘ng nháº¥t trÆ°á»›c.",
              "Gia Ä‘Ã¬nh lÃ  phÃ¡o Ä‘Ã i Ä‘áº§u tiÃªn chá»‘ng láº¡i lá»«a Ä‘áº£o."
            ]),
            lesson("6.1.2", "Vá»‡ sinh dá»¯ liá»‡u cÃ¡ nhÃ¢n", [
              "Háº¡n cháº¿ cÃ´ng khai: Sá»‘ Ä‘iá»‡n thoáº¡i, Ä‘á»‹a chá»‰, áº£nh giáº¥y tá», lá»‹ch trÃ¬nh chi tiáº¿t, video riÃªng tÆ° ghi rÃµ giá»ng nÃ³i.",
              "CÃ i Ä‘áº·t riÃªng tÆ°: Giá»›i háº¡n ngÆ°á»i xem bÃ i viáº¿t, kiá»ƒm tra quyá»n á»©ng dá»¥ng, báº­t xÃ¡c thá»±c 2 lá»›p (2FA) cho má»i tÃ i khoáº£n."
            ], [
              "Báº¡n khÃ´ng cáº§n xÃ³a háº¿t cuá»™c sá»‘ng online, nhÆ°ng hÃ£y Ä‘Äƒng cÃ³ chá»n lá»c.",
              "TÃ i khoáº£n máº¡nh báº£o vá»‡ cáº£ danh dá»± cá»§a báº¡n."
            ])
          ]
        },
        {
          title: "6.2 Capstone: Há»“ sÆ¡ sá»± viá»‡c cá»§a An",
          lessons: [
            lesson("6.2.1", "Capstone: PhÃ¢n tÃ­ch tÃ¬nh huá»‘ng tá»•ng há»£p", [
              "TÃ¬nh huá»‘ng: An nháº­n video ngÆ°á»i ná»•i tiáº¿ng Ä‘áº§u tÆ° (link láº¡), tin nháº¯n báº¡n cÅ© dá»¥ dá»— (nÃ© gá»i Ä‘iá»‡n), áº£nh chá»¥p bÃ¬nh luáº­n khen ngá»£i, tin nháº¯n thoáº¡i giá»ng giá»‘ng.",
              "Nhiá»‡m vá»¥: PhÃ¢n loáº¡i rá»§i ro, chá»‰ ra cÃ¡c Red Flags, Ã¡p dá»¥ng Deepfense Check vÃ  Ä‘Æ°a ra káº¿t luáº­n hÃ nh Ä‘á»™ng.",
              "Gá»£i Ã½: Rá»§i ro CAO. HÃ nh Ä‘á»™ng: KhÃ´ng báº¥m link, khÃ´ng náº¡p tiá»n, xÃ¡c minh qua kÃªnh chÃ­nh thá»©c, bÃ¡o cÃ¡o tÃ i khoáº£n giáº£."
            ], [
              "Khi nhiá»u tÃ­n hiá»‡u nhá» cÃ¹ng chá»‰ vá» rá»§i ro, hÃ£y tin vÃ o quy trÃ¬nh an toÃ n.",
              "KhÃ´ng cáº§n chá»©ng minh deepfake 100% Ä‘á»ƒ báº£o vá»‡ tiá»n cá»§a mÃ¬nh."
            ])
          ],
          checkpoint: checkpoint("6.1", [
            q("Family Code nÃªn dá»±a trÃªn thÃ´ng tin nÃ o?", ["NgÃ y sinh", "TÃªn trÆ°á»ng há»c", "Má»™t cá»¥m tá»« riÃªng tÆ°, dá»… nhá»› vá»›i ngÆ°á»i nhÃ  nhÆ°ng khÃ´ng cÃ³ trÃªn máº¡ng", "Äá»‹a chá»‰ nhÃ "], 2),
            q("Trong Capstone, tÃ­n hiá»‡u nÃ o lÃ  Red Flag máº¡nh nháº¥t?", ["Video cÃ³ Ä‘á»™ phÃ¢n giáº£i tháº¥p", "YÃªu cáº§u náº¡p tiá»n ngay hÃ´m nay kÃ¨m link rÃºt gá»n vÃ  nÃ© xÃ¡c minh trá»±c tiáº¿p", "Báº¡n cÅ© nháº¯n tin vÃ o buá»•i tá»‘i", "CÃ³ nhiá»u bÃ¬nh luáº­n khen"], 1)
          ])
        }
      ],
      quiz: [
        q("Family Code dÃ¹ng Ä‘á»ƒ lÃ m gÃ¬?", ["XÃ¡c minh danh tÃ­nh trong tÃ¬nh huá»‘ng kháº©n cáº¥p giá»¯a nhá»¯ng ngÆ°á»i tin cáº­y", "Äá»ƒ Ä‘Äƒng lÃªn Facebook", "Thay tháº¿ máº­t kháº©u ngÃ¢n hÃ ng", "TÄƒng lÆ°á»£t xem"], 0),
        q("Money Delay nghÄ©a lÃ  gÃ¬?", ["Chuyá»ƒn tiá»n cÃ ng nhanh cÃ ng tá»‘t", "TrÃ¬ hoÃ£n báº¯t buá»™c Ä‘á»ƒ xÃ¡c minh trÆ°á»›c yÃªu cáº§u tiá»n báº¥t thÆ°á»ng", "KhÃ´ng bao giá» chuyá»ƒn tiá»n cho ai", "Chá»‰ chuyá»ƒn tiá»n vÃ o ban Ä‘Ãªm"], 1),
        q("Khi tháº¥y báº¡n bÃ¨ bá»‹ lá»«a, cÃ¢u nÃ³i nÃ o thá»ƒ hiá»‡n tinh tháº§n No Shame Reporting?", ["'Sao báº¡n dá»… tin tháº¿?'", "'Äá»ƒ mÃ¬nh cÃ¹ng báº¡n lÆ°u báº±ng chá»©ng vÃ  bÃ¡o cÃ¡o nhÃ©, chuyá»‡n nÃ y ai cÅ©ng cÃ³ thá»ƒ gáº·p.'", "'Báº¡n tháº­t ngá»‘c.'", "'Äá»«ng nÃ³i vá»›i ai nhÃ©.'"], 1),
        q("Evidence First Æ°u tiÃªn Ä‘iá»u gÃ¬?", ["LÆ°u báº±ng chá»©ng an toÃ n trÆ°á»›c khi xÃ³a, cháº·n hoáº·c tranh cÃ£i", "XÃ³a háº¿t tin nháº¯n ngay", "ÄÄƒng báº±ng chá»©ng lÃªn má»i nhÃ³m", "CÃ£i nhau vá»›i káº» lá»«a Ä‘áº£o"], 0),
        q("PhÃ²ng vá»‡ tá»‘t nháº¥t báº¯t Ä‘áº§u tá»« Ä‘Ã¢u?", ["Tá»« khi sá»± cá»‘ xáº£y ra", "Tá»« quy táº¯c Ä‘Ã£ thá»‘ng nháº¥t trÆ°á»›c vÃ  thÃ³i quen kiá»ƒm chá»©ng", "Tá»« viá»‡c mua mÃ¡y tÃ­nh Ä‘áº¯t tiá»n", "Tá»« viá»‡c khÃ´ng dÃ¹ng Internet"], 1)
      ]
    },
    {
      id: 99,
      part: "final",
      title: "BÃ€I THI CUá»I KHÃ“A (FINAL EXAM)",
      duration: "45-60 phÃºt",
      level: "Assessment",
      scenario: "BÃ i kiá»ƒm tra tá»•ng há»£p kiáº¿n thá»©c tá»« Module 0 Ä‘áº¿n Module 6. Báº¡n cáº§n Ä‘áº¡t Ã­t nháº¥t 70% (35/50 cÃ¢u Ä‘Ãºng) Ä‘á»ƒ nháº­n chá»©ng chá»‰ DEEPFENSE AWARE.",
      outcomes: [
        "Chá»©ng minh kháº£ nÄƒng nháº­n diá»‡n rá»§i ro Deepfake.",
        "Ãp dá»¥ng thÃ nh tháº¡o quy trÃ¬nh Deepfense Check.",
        "Má»Ÿ khÃ³a chá»©ng chá»‰ vÃ  pháº§n thÆ°á»Ÿng DPF.",
        "Trá»Ÿ thÃ nh má»™t pháº§n cá»§a cá»™ng Ä‘á»“ng phÃ²ng vá»‡ sá»‘."
      ],
      sections: [],
      quiz: [
        q("Deepfake lÃ  gÃ¬?", ["Má»i ná»™i dung sai trÃªn máº¡ng", "Ná»™i dung dÃ¹ng AI Ä‘á»ƒ khiáº¿n ngÆ°á»i ta tin má»™t ngÆ°á»i lÃ m/nÃ³i Ä‘iá»u há» khÃ´ng thá»±c sá»± lÃ m/nÃ³i", "Chá»‰ lÃ  áº£nh chá»‰nh mÃ u", "Má»™t loáº¡i mÃ£ Ä‘á»™c"], 1, "Deepfake lÃ  ná»™i dung giáº£ máº¡o danh tÃ­nh báº±ng AI."),
        q("Deepvoice lÃ  gÃ¬?", ["Giá»ng nÃ³i Ã¢m lÆ°á»£ng lá»›n", "Giá»ng nÃ³i Ä‘Æ°á»£c giáº£ láº­p/chá»‰nh sá»­a báº±ng AI Ä‘á»ƒ giá»‘ng ngÆ°á»i tháº­t", "Tin nháº¯n khÃ´ng Ã¢m thanh", "Video khÃ´ng máº·t"], 1, "Deepvoice lÃ  giáº£ máº¡o giá»ng nÃ³i báº±ng AI."),
        q("Synthetic media lÃ  gÃ¬?", ["Ná»™i dung Ä‘Æ°á»£c táº¡o hoÃ n toÃ n hoáº·c má»™t pháº§n báº±ng cÃ´ng nghá»‡ sá»‘/AI", "Ná»™i dung báº¯t buá»™c lÃ  lá»«a Ä‘áº£o", "Ná»™i dung chá»‰ cÃ³ vÄƒn báº£n", "Chá»‰ lÃ  áº£nh chá»¥p"], 0, "Ná»™i dung do AI táº¡o ra nÃ³i chung."),
        q("Táº¥t cáº£ synthetic media Ä‘á»u lÃ  deepfake. ÄÃºng hay Sai?", ["ÄÃºng", "Sai", "Chá»‰ Ä‘Ãºng vá»›i video", "Chá»‰ Ä‘Ãºng vá»›i áº£nh"], 1, "Nhiá»u ná»™i dung AI mang tÃ­nh minh báº¡ch, khÃ´ng máº¡o danh."),
        q("Video tháº­t tá»« 5 nÄƒm trÆ°á»›c bá»‹ Ä‘Äƒng láº¡i vá»›i chÃº thÃ­ch 'vá»«a xáº£y ra' lÃ  gÃ¬?", ["Deepfake", "Repurposed media", "Edited media", "Deepvoice"], 1, "Ná»™i dung tháº­t nhÆ°ng bá»‹ Ä‘áº·t sai bá»‘i cáº£nh."),
        q("Cáº¯t má»™t Ä‘oáº¡n ngáº¯n tá»« bÃ i phÃ¡t biá»ƒu dÃ i lÃ m Ä‘á»•i nghÄ©a lÃ  gÃ¬?", ["Edited media", "Deepfake", "Metadata", "Family Code"], 0, "Chá»‰nh sá»­a ná»™i dung gá»‘c gÃ¢y hiá»ƒu láº§m."),
        q("Thay máº·t ngÆ°á»i nÃ y vÃ o áº£nh ngÆ°á»i kia báº±ng AI gá»i lÃ  gÃ¬?", ["Face swap / Deepfake image", "Metadata", "Edited media", "Reverse search"], 0, "ÄÃ¢y lÃ  má»™t dáº¡ng phá»• biáº¿n cá»§a deepfake hÃ¬nh áº£nh."),
        q("VÃ¬ sao deepfake nguy hiá»ƒm ká»ƒ cáº£ khi khÃ´ng hoÃ n háº£o?", ["VÃ¬ nÃ³ Ä‘Ã¡nh vÃ o cáº£m xÃºc vÃ  Ã¡p lá»±c thá»i gian cá»§a náº¡n nhÃ¢n", "VÃ¬ nÃ³ luÃ´n nÃ©t", "VÃ¬ nÃ³ miá»…n phÃ­", "VÃ¬ nÃ³ cÃ³ nháº¡c"], 0, "Yáº¿u tá»‘ tÃ¢m lÃ½ vÃ  ngá»¯ cáº£nh lÃ m tÄƒng Ä‘á»™ tin cáº­y."),
        q("Dá»¯ liá»‡u cÃ¡ nhÃ¢n cÃ´ng khai lÃ m tÄƒng rá»§i ro deepfake nhÆ° tháº¿ nÃ o?", ["LÃ m mÃ¡y tÃ­nh cháº¡y cháº­m", "Cung cáº¥p nguyÃªn liá»‡u Ä‘á»ƒ AI mÃ´ phá»ng báº¡n chÃ­nh xÃ¡c hÆ¡n", "LÃ m video má» Ä‘i", "KhÃ´ng cÃ³ rá»§i ro"], 1, "CÃ ng nhiá»u áº£nh/video cá»§a báº¡n, AI cÃ ng dá»… báº¯t chÆ°á»›c."),
        q("Liar's dividend lÃ  rá»§i ro gÃ¬?", ["GiÃºp káº» xáº¥u phá»§ nháº­n sá»± tháº­t báº±ng cÃ¡ch gá»i nÃ³ lÃ  deepfake", "Lá»£i nhuáº­n tá»« viá»‡c nÃ³i dá»‘i", "QuÃ  táº·ng AI", "PhÃ­ Ä‘Äƒng kÃ½ máº¡ng"], 0, "Lá»£i dá»¥ng sá»± tá»“n táº¡i cá»§a deepfake Ä‘á»ƒ gieo ráº¯c sá»± nghi ngá» sá»± tháº­t."),
        q("Khi nháº­n Ä‘Æ°á»£c yÃªu cáº§u tiá»n 'gáº¥p' tá»« ngÆ°á»i thÃ¢n, bÆ°á»›c Ä‘áº§u tiÃªn lÃ  gÃ¬?", ["Chuyá»ƒn ngay", "Dá»«ng láº¡i vÃ  xÃ¡c minh qua kÃªnh Ä‘á»™c láº­p (gá»i Ä‘iá»‡n sá»‘ cÅ©)", "Gá»­i mÃ£ OTP", "Há»i tÃ i khoáº£n"], 1, "Pause vÃ  Verify lÃ  quy trÃ¬nh an toÃ n."),
        q("'Money Delay' nghÄ©a lÃ  gÃ¬?", ["Chuyá»ƒn tiá»n tháº­t nhanh", "TrÃ¬ hoÃ£n báº¯t buá»™c Ä‘á»ƒ kiá»ƒm chá»©ng cÃ¡c yÃªu cáº§u tiá»n báº¥t thÆ°á»ng", "KhÃ´ng bao giá» dÃ¹ng tiá»n", "Chá»‰ dÃ¹ng tiá»n máº·t"], 1, "Khoáº£ng dá»«ng giÃºp báº¡n trÃ¡nh hÃ nh Ä‘á»™ng theo cáº£m xÃºc."),
        q("NÃºt báº¥m cáº£m xÃºc 'Kháº©n cáº¥p' khai thÃ¡c Ä‘iá»u gÃ¬?", ["Kháº£ nÄƒng ghi nhá»›", "Pháº£n xáº¡ báº£n nÄƒng bá» qua logic khi bá»‹ Ã©p thá»i gian", "Thá»‹ lá»±c", "LÃ²ng tá»‘t"], 1, "Ãp lá»±c thá»i gian lÃ m giáº£m kháº£ nÄƒng kiá»ƒm chá»©ng."),
        q("VÃ¬ sao káº» xáº¥u dáº·n báº¡n 'Ä‘á»«ng nÃ³i vá»›i ai'?", ["Äá»ƒ báº£o vá»‡ báº¡n", "Äá»ƒ cÃ´ láº­p báº¡n khá»i sá»± giÃºp Ä‘á»¡ vÃ  kiá»ƒm chá»©ng", "Äá»ƒ táº¡o báº¥t ngá»", "Vi quy Ä‘á»‹nh ngÃ¢n hÃ ng"], 1, "CÃ´ láº­p náº¡n nhÃ¢n lÃ  ká»¹ thuáº­t thao tÃºng tÃ¢m lÃ½."),
        q("'Tháº¥y táº­n máº¯t' trÃªn máº¡ng hiá»‡n nay cÃ²n Ä‘á»§ tin cáº­y khÃ´ng?", ["LuÃ´n Ä‘á»§", "KhÃ´ng Ä‘á»§, vÃ¬ hÃ¬nh áº£nh vÃ  video cÃ³ thá»ƒ bá»‹ AI táº¡o hoáº·c chá»‰nh sá»­a", "Chá»‰ Ä‘á»§ vá»›i video dÃ i", "Chá»‰ Ä‘á»§ vá»›i ngÆ°á»i ná»•i tiáº¿ng"], 1, "CÃ´ng nghá»‡ AI Ä‘Ã£ lÃ m thay Ä‘á»•i niá»m tin vÃ o hÃ¬nh áº£nh."),
        q("Dáº¥u hiá»‡u ká»¹ thuáº­t nÃ o nghi lÃ  deepfake?", ["RÃ¬a khuÃ´n máº·t bá»‹ nhÃ²e khi quay Ä‘áº§u, nhÃ¡y máº¯t láº¡, rÄƒng bá»‹ má»", "MÃ u Ã¡o xanh", "Video cÃ³ phá»¥ Ä‘á»", "Ã‚m thanh quÃ¡ lá»›n"], 0, "CÃ¡c lá»—i pixel vÃ  chuyá»ƒn Ä‘á»™ng lÃ  tÃ­n hiá»‡u nghi váº¥n."),
        q("Quan sÃ¡t Ã¡nh sÃ¡ng giÃºp phÃ¡t hiá»‡n Ä‘iá»u gÃ¬?", ["MÃ u sáº¯c Ä‘áº¹p khÃ´ng", "Sá»± khÃ´ng nháº¥t quÃ¡n giá»¯a máº·t ngÆ°á»i vÃ  bá»‘i cáº£nh xung quanh", "Äá»™ phÃ¢n giáº£i video", "Thá»i tiáº¿t"], 1, "Sá»± khÃ´ng Ä‘á»“ng nháº¥t vá» Ã¡nh sÃ¡ng thÆ°á»ng lá»™ dáº¥u hiá»‡u chá»‰nh sá»­a."),
        q("Checklist 3 lá»›p quan sÃ¡t lÃ  gÃ¬?", ["HÃ¬nh áº£nh, Ã‚m thanh, Ngá»¯ cáº£nh", "SÃ¡ng, TrÆ°a, Tá»‘i", "TÃªn, Tuá»•i, Äá»‹a chá»‰", "Like, Share, Follow"], 0, "PhÃ¢n tÃ­ch Ä‘a chiá»u giÃºp Ä‘Ã¡nh giÃ¡ rá»§i ro tá»‘t hÆ¡n."),
        q("KÃªnh Ä‘á»™c láº­p an toÃ n lÃ  kÃªnh nÃ o?", ["Sá»‘ Ä‘iá»‡n thoáº¡i ngÆ°á»i láº¡ má»›i gá»i", "Link trong email kháº©n cáº¥p", "Sá»‘ Ä‘iá»‡n thoáº¡i Ä‘Ã£ lÆ°u tá»« lÃ¢u trong danh báº¡ cá»§a báº¡n", "NhÃ³m chat láº¡"], 2, "KÃªnh Ä‘á»™c láº­p pháº£i lÃ  kÃªnh tin cáº­y cÃ³ tá»« trÆ°á»›c."),
        q("Trace (Truy nguá»“n) giÃºp báº¡n biáº¿t Ä‘iá»u gÃ¬?", ["Máº­t kháº©u ngÆ°á»i gá»­i", "Nguá»“n gá»‘c Ä‘áº§u tiÃªn vÃ  bá»‘i cáº£nh thá»±c sá»± cá»§a ná»™i dung", "Video cÃ³ bao nhiÃªu like", "Äá»‹a chá»‰ nhÃ  náº¡n nhÃ¢n"], 1, "Truy nguá»“n giÃºp phÃ¡t hiá»‡n tin giáº£ vÃ  ná»™i dung sai bá»‘i cáº£nh."),
        q("Detector AI nÃªn Ä‘Æ°á»£c dÃ¹ng nhÆ° tháº¿ nÃ o?", ["TÃ­n hiá»‡u tham kháº£o, khÃ´ng pháº£i phÃ¡n quyáº¿t cuá»‘i cÃ¹ng", "PhÃ¡n quyáº¿t tuyá»‡t Ä‘á»‘i", "Äá»ƒ bÃ´i nhá» ngÆ°á»i khÃ¡c", "Thay tháº¿ má»i bÆ°á»›c kiá»ƒm chá»©ng"], 0, "Detector cÃ³ thá»ƒ sai vÃ  cáº§n káº¿t há»£p vá»›i tÆ° duy con ngÆ°á»i."),
        q("Family Code lÃ  gÃ¬?", ["MÃ£ vÃ¹ng Ä‘iá»‡n thoáº¡i", "CÃ¢u xÃ¡c minh bÃ­ máº­t chá»‰ gia Ä‘Ã¬nh biáº¿t Ä‘á»ƒ dÃ¹ng khi kháº©n cáº¥p", "MÃ£ giáº£m giÃ¡ mua sáº¯m", "Sá»‘ thá»© tá»± thÃ nh viÃªn"], 1, "Máº­t kháº©u gia Ä‘Ã¬nh giÃºp xÃ¡c minh nhanh trong video call/ghi Ã¢m."),
        q("Khi tháº¥y video ngÆ°á»i ná»•i tiáº¿ng quáº£ng cÃ¡o Ä‘áº§u tÆ° 'lá»£i nhuáº­n 100%', báº¡n nÃªn lÃ m gÃ¬?", ["ÄÄƒng kÃ½ ngay", "Kiá»ƒm tra kÃªnh chÃ­nh thá»©c cá»§a há», khÃ´ng báº¥m link láº¡", "Náº¡p thá»­ Ã­t tiá»n", "Chia sáº» cho báº¡n bÃ¨"], 1, "Cáº©n trá»ng vá»›i cÃ¡c lá»i há»©a lá»£i Ã­ch báº¥t thÆ°á»ng."),
        q("TrÃ¡ch nhiá»‡m cá»§a ngÆ°á»i chá»©ng kiáº¿n khi tháº¥y áº£nh nháº¡y cáº£m phÃ¡t tÃ¡n?", ["LÆ°u láº¡i xem", "KhÃ´ng lan truyá»n, bÃ¡o cÃ¡o vÃ  há»— trá»£ náº¡n nhÃ¢n", "Gá»­i cho nhÃ³m khÃ¡c há»i tháº­t giáº£", "BÃ¬nh luáº­n trÃªu Ä‘Ã¹a"], 1, "Giáº£m háº¡i lÃ  Æ°u tiÃªn hÃ ng Ä‘áº§u."),
        q("Táº¡i sao khÃ´ng nÃªn chia sáº» clip gÃ¢y pháº«n ná»™ khi chÆ°a rÃµ nguá»“n?", ["LÃ m tá»‘n pin", "CÃ³ thá»ƒ Ä‘ang tiáº¿p tay cho tin giáº£ hoáº·c ká»‹ch báº£n thao tÃºng", "LÃ m video bá»‹ má»", "KhÃ´ng cÃ³ nháº¡c"], 1, "Cáº£m xÃºc pháº«n ná»™ thÆ°á»ng bá»‹ lá»£i dá»¥ng Ä‘á»ƒ lan truyá»n ná»™i dung sai."),
        q("Má»¥c tiÃªu cuá»‘i cÃ¹ng cá»§a Deepfense Shield lÃ  gÃ¬?", ["LÃ m báº¡n sá»£ Internet", "Biáº¿n kiáº¿n thá»©c thÃ nh thÃ³i quen phÃ²ng vá»‡ an toÃ n cho báº¡n vÃ  cá»™ng Ä‘á»“ng", "Dáº¡y táº¡o AI", "TÄƒng tá»‘c Ä‘á»™ máº¡ng"], 1, "XÃ¢y dá»±ng cá»™ng Ä‘á»“ng sá»‘ an toÃ n."),
        q("Ná»™i dung AI cÃ³ ghi rÃµ 'Ä‘Ã¢y lÃ  áº£nh minh há»a' Ä‘Æ°á»£c Ä‘Ã¡nh giÃ¡ rá»§i ro tháº¿ nÃ o?", ["Rá»§i ro cao", "Rá»§i ro tháº¥p vÃ¬ tÃ­nh minh báº¡ch cao", "LuÃ´n lÃ  lá»«a Ä‘áº£o", "Cháº¯c cháº¯n lÃ  tháº­t"], 1, "Sá»± minh báº¡ch lÃ m giáº£m kháº£ nÄƒng lá»«a dá»‘i."),
        q("Báº¡n nháº­n email tá»« ngÃ¢n hÃ ng yÃªu cáº§u Ä‘á»c OTP Ä‘á»ƒ khÃ³a tháº». Báº¡n lÃ m gÃ¬?", ["Äá»c ngay", "Tá»« chá»‘i vÃ  tá»± gá»i hotline ngÃ¢n hÃ ng hoáº·c dÃ¹ng app chÃ­nh thá»©c", "Gá»­i qua SMS", "Gá»­i máº­t kháº©u thay tháº¿"], 1, "XÃ¡c minh qua kÃªnh chÃ­nh thá»©c Ä‘á»™c láº­p."),
        q("Náº¿u tÃ i khoáº£n máº¡ng xÃ£ há»™i cá»§a báº¡n bá»‹ máº¡o danh, báº¡n nÃªn lÃ m gÃ¬?", ["Tranh cÃ£i vá»›i nÃ³", "Cáº£nh bÃ¡o báº¡n bÃ¨ qua kÃªnh chÃ­nh thá»©c, lÆ°u báº±ng chá»©ng vÃ  bÃ¡o cÃ¡o", "Im láº·ng", "XÃ³a tÃ i khoáº£n tháº­t"], 1, "ThÃ´ng bÃ¡o rá»™ng rÃ£i Ä‘á»ƒ ngÄƒn cháº·n lá»«a Ä‘áº£o báº¡n bÃ¨."),
        q("Chá»©ng chá»‰ DEEPFENSE AWARE chá»©ng nháº­n Ä‘iá»u gÃ¬?", ["Báº¡n lÃ  láº­p trÃ¬nh viÃªn AI", "Báº¡n Ä‘Ã£ náº¯m vá»¯ng kiáº¿n thá»©c ná»n táº£ng vÃ  cÃ³ pháº£n xáº¡ phÃ²ng vá»‡ deepfake", "Báº¡n cÃ³ thá»ƒ hack tÃ i khoáº£n", "Báº¡n Ä‘Ã£ Ä‘Ã³ng tiá»n há»c"], 1, "XÃ¡c nháº­n nÄƒng lá»±c phÃ²ng vá»‡ sá»‘ cÆ¡ báº£n."),
        q("Lip sync (khá»›p lá»‡nh miá»‡ng) AI thÆ°á»ng gáº·p khÃ³ khÄƒn nháº¥t á»Ÿ chi tiáº¿t nÃ o?", ["MÃ u mÃ´i", "RÄƒng bá»‹ má» hoáº·c mÃ©o khi nÃ³i nhanh", "Äá»™ dÃ i cá»§a tÃ³c", "MÃ u Ã¡o"], 1, "Chi tiáº¿t nhá» bÃªn trong miá»‡ng thÆ°á»ng bá»‹ lá»—i ká»¹ thuáº­t."),
        q("Reverse image search Ä‘áº·c biá»‡t hiá»‡u Ã­ch Ä‘á»ƒ phÃ¡t hiá»‡n loáº¡i ná»™i dung nÃ o?", ["Deepvoice", "Repurposed media (ná»™i dung tháº­t Ä‘Äƒng sai bá»‘i cáº£nh)", "Tin nháº¯n vÄƒn báº£n", "Máº­t kháº©u"], 1, "TÃ¬m ra nguá»“n gá»‘c vÃ  thá»i Ä‘iá»ƒm xuáº¥t hiá»‡n Ä‘áº§u tiÃªn cá»§a áº£nh."),
        q("CÃ¢u nÃ³i nÃ o lÃ  'nÃºt báº¥m' ThÃ¢n quen?", ["'Máº¹ Æ¡i, con Ä‘ang gáº·p náº¡n, Ä‘á»«ng bÃ¡o bá»‘ nhÃ©.'", "'Chuyá»ƒn tiá»n trong 2 phÃºt.'", "'Äá»c mÃ£ OTP cho tÃ´i.'", "'Báº¡n trÃºng thÆ°á»Ÿng 1 tá»·.'"], 0, "Lá»£i dá»¥ng tÃ¬nh cáº£m gia Ä‘Ã¬nh Ä‘á»ƒ gÃ¢y Ã¡p lá»±c."),
        q("Cá»¥m tá»« 'Chá»‰ mÃ¬nh báº¡n Ä‘Æ°á»£c nháº­n cÆ¡ há»™i nÃ y' thuá»™c nhÃ³m nÃ o?", ["Kháº©n cáº¥p", "Lá»£i Ã­ch vÃ  Ä‘Ã¡nh vÃ o cáº£m giÃ¡c Ä‘áº·c biá»‡t", "Quyá»n lá»±c", "ThÃ¢n quen"], 1, "DÃ¹ng lá»£i Ã­ch riÃªng biá»‡t Ä‘á»ƒ dá»¥ dá»— náº¡n nhÃ¢n."),
        q("Táº¡i sao khÃ´ng nÃªn há»i 'CÃ³ pháº£i AI khÃ´ng?' trong cÃ¹ng cuá»™c gá»i Ä‘Ã¡ng nghi?", ["Káº» xáº¥u cÃ³ thá»ƒ dÃ¹ng AI tráº£ lá»i ráº¥t thuyáº¿t phá»¥c Ä‘á»ƒ tráº¥n an báº¡n", "VÃ¬ nÃ³ tá»‘n tiá»n Ä‘iá»‡n thoáº¡i", "VÃ¬ nÃ³ lÃ m video nÃ©t hÆ¡n", "VÃ¬ quy Ä‘á»‹nh phÃ¡p luáº­t"], 0, "Pháº£i xÃ¡c minh qua kÃªnh hoÃ n toÃ n khÃ¡c biá»‡t."),
        q("Dáº¥u hiá»‡u nÃ o nghi váº¥n vá» Ã¢m thanh?", ["Tiáº¿ng á»“n mÃ´i trÆ°á»ng tá»± nhiÃªn", "Giá»ng nÃ³i Ä‘á»u Ä‘á»u thiáº¿u nhá»‹p thá»Ÿ vÃ  Ã¢m Ä‘iá»‡u cÃ¡ nhÃ¢n", "NÃ³i tiáº¿ng Viá»‡t chuáº©n", "NÃ³i to rÃµ"], 1, "Ã‚m thanh AI thÆ°á»ng thiáº¿u sá»± sá»‘ng Ä‘á»™ng tá»± nhiÃªn."),
        q("Má»™t video video call cÃ³ hÃ¬nh áº£nh ngÆ°á»i thÃ¢n nhÆ°ng chá»‰ hiá»‡n 5 giÃ¢y rá»“i táº¯t lÃ  dáº¥u hiá»‡u gÃ¬?", ["Máº¡ng yáº¿u bÃ¬nh thÆ°á»ng", "CÃ³ thá»ƒ lÃ  deepfake ngáº¯n dÃ¹ng Ä‘á»ƒ lá»«a báº¡n tin rá»“i chuyá»ƒn sang nháº¯n tin", "MÃ¡y háº¿t pin tháº­t", "NgÆ°á»i Ä‘Ã³ báº­n"], 1, "Ká»¹ thuáº­t 'má»“i nhá»­' Ä‘á»ƒ táº¡o niá»m tin."),
        q("Provenance giÃºp gÃ¬ cho viá»‡c kiá»ƒm chá»©ng?", ["LÆ°u váº¿t lá»‹ch sá»­ táº¡o vÃ  chá»‰nh sá»­a cá»§a file", "XÃ³a deepfake tá»± Ä‘á»™ng", "TÄƒng Ä‘á»™ sÃ¡ng áº£nh", "Chá»n filter Ä‘áº¹p"], 0, "GiÃºp truy tÃ¬m nguá»“n gá»‘c ká»¹ thuáº­t cá»§a ná»™i dung."),
        q("HÃ nh Ä‘á»™ng 'No Shame Reporting' cÃ³ Ã½ nghÄ©a gÃ¬?", ["Náº¡n nhÃ¢n bÃ¡o cÃ¡o sá»›m mÃ  khÃ´ng sá»£ bá»‹ máº¯ng hay cÆ°á»i chÃª", "KhÃ´ng bÃ¡o cÃ¡o vÃ¬ sá»£", "BÃ¡o cÃ¡o náº·c danh", "BÃ¡o cÃ¡o sau 1 thÃ¡ng"], 0, "Táº¡o mÃ´i trÆ°á»ng há»— trá»£ Ä‘á»ƒ xá»­ lÃ½ sá»± cá»‘ nhanh nháº¥t."),
        q("Evidence First yÃªu cáº§u báº¡n lÆ°u nhá»¯ng gÃ¬?", ["Link, áº£nh chá»¥p mÃ n hÃ¬nh, sá»‘ tÃ i khoáº£n, thá»i gian, tÃªn tÃ i khoáº£n Ä‘Äƒng", "Chá»‰ lÆ°u link", "Chá»‰ nhá»› trong Ä‘áº§u", "Chá»‰ lÆ°u áº£nh Ä‘áº¡i diá»‡n"], 0, "Cung cáº¥p Ä‘áº§y Ä‘á»§ báº±ng chá»©ng cho cÆ¡ quan chá»©c nÄƒng/ná»n táº£ng."),
        q("Trong Deepfense Check, Decide dá»±a trÃªn nguyÃªn táº¯c nÃ o?", ["Tin má»i video mÆ°á»£t", "Chá»n hÃ nh Ä‘á»™ng Ã­t gÃ¢y háº¡i nháº¥t cho báº£n thÃ¢n vÃ  cá»™ng Ä‘á»“ng", "Chia sáº» trÆ°á»›c rá»“i tÃ­nh sau", "LÃ m theo Ä‘Ã¡m Ä‘Ã´ng"], 1, "ÄÃ¡nh giÃ¡ tÃ¡c Ä‘á»™ng trÆ°á»›c khi quyáº¿t Ä‘á»‹nh."),
        q("CÆ¡ quan cÃ´ng an cÃ³ yÃªu cáº§u chuyá»ƒn tiá»n 'táº¡m giá»¯' qua Ä‘iá»‡n thoáº¡i khÃ´ng?", ["CÃ³, Ä‘á»ƒ báº£o máº­t", "KhÃ´ng bao giá»", "Chá»‰ vá»›i sá»‘ tiá»n lá»›n", "Chá»‰ vá»›i ngÆ°á»i á»Ÿ xa"], 1, "Má»i yÃªu cáº§u tÃ i chÃ­nh tá»« 'cÃ´ng an' qua máº¡ng Ä‘á»u lÃ  lá»«a Ä‘áº£o."),
        q("Táº¡i sao cáº§n vá»‡ sinh dá»¯ liá»‡u cÃ¡ nhÃ¢n (Data Hygiene)?", ["Äá»ƒ mÃ¡y tÃ­nh sáº¡ch hÆ¡n", "Äá»ƒ giáº£m bá»›t 'nguyÃªn liá»‡u' mÃ  AI cÃ³ thá»ƒ dÃ¹ng Ä‘á»ƒ máº¡o danh báº¡n", "Äá»ƒ tÄƒng lÆ°á»£t theo dÃµi", "Äá»ƒ tiáº¿t kiá»‡m dung lÆ°á»£ng"], 1, "Báº£o vá»‡ danh tÃ­nh sá»‘ ngay tá»« Ä‘áº§u."),
        q("2FA (XÃ¡c thá»±c 2 lá»›p) giÃºp Ã­ch gÃ¬?", ["LÃ m video Ä‘áº¹p hÆ¡n", "NgÄƒn káº» xáº¥u chiáº¿m quyá»n tÃ i khoáº£n ká»ƒ cáº£ khi há» cÃ³ máº­t kháº©u", "TÄƒng tá»‘c Ä‘á»™ táº£i trang", "KhÃ´ng cÃ³ tÃ¡c dá»¥ng"], 1, "ThÃªm má»™t lá»›p báº£o vá»‡ vá»¯ng cháº¯c cho tÃ i khoáº£n."),
        q("Náº¿u video mÆ°á»£t nhÆ°ng gá»ng nÃ³i vÃ  ngá»¯ cáº£nh Ä‘Ã¡ng nghi, báº¡n tin vÃ o Ä‘Ã¢u?", ["Tin hÃ¬nh áº£nh", "Tin vÃ o sá»± nghi ngá» tá»« ngá»¯ cáº£nh vÃ  gá»ng nÃ³i (Verify ngay)", "Tin vÃ o sá»‘ lÆ°á»£t like", "Tin vÃ o bÃ¬nh luáº­n"], 1, "Sá»± mÆ°á»£t mÃ  cá»§a hÃ¬nh áº£nh khÃ´ng Ä‘áº£m báº£o tÃ­nh xÃ¡c thá»±c."),
        q("Má»¥c tiÃªu cá»§a Capstone An lÃ  gÃ¬?", ["Dáº¡y An cÃ¡ch kiáº¿m tiá»n", "Tá»•ng há»£p toÃ n bá»™ ká»¹ nÄƒng Ä‘á»ƒ xá»­ lÃ½ má»™t tÃ¬nh huá»‘ng Ä‘a diá»‡n nhÆ° Ä‘á»i tháº­t", "Dáº¡y An cÃ¡ch dÃ¹ng TikTok", "Dáº¡y An cÃ¡ch mua sáº¯m"], 1, "Thá»±c hÃ nh pháº£n xáº¡ phÃ²ng vá»‡ tá»•ng há»£p."),
        q("Ná»™i dung deepfake nÃ o gÃ¢y tá»•n háº¡i danh dá»± nháº¥t hiá»‡n nay?", ["Deepfake máº¡o danh kÃªu gá»i tá»« thiá»‡n", "Deepfake khiÃªu dÃ¢m/nháº¡y cáº£m máº¡o danh (NCII)", "Deepfake Ä‘á»c truyá»‡n", "Deepfake chÆ¡i game"], 1, "GÃ¢y áº£nh hÆ°á»Ÿng nghiÃªm trá»ng Ä‘áº¿n tÃ¢m lÃ½ vÃ  Ä‘á»i sá»‘ng náº¡n nhÃ¢n."),
        q("Khi tháº¥y lá»—i á»Ÿ rÄƒng hoáº·c tÃ³c trong video, báº¡n káº¿t luáº­n gÃ¬?", ["Giáº£ 100%", "LÃ  má»™t tÃ­n hiá»‡u nghi váº¥n máº¡nh, cáº§n kiá»ƒm chá»©ng bá»‘i cáº£nh vÃ  nguá»“n", "Tháº­t 100%", "Video bá»‹ lá»—i máº¡ng"], 1, "Dáº¥u hiá»‡u ká»¹ thuáº­t cáº§n Ä‘i kÃ¨m vá»›i phÃ¢n tÃ­ch ngá»¯ cáº£nh."),
        q("Táº¡i sao 'Pause' 30 giÃ¢y láº¡i quan trá»ng?", ["Äá»ƒ chá» mÃ¡y nguá»™i", "Äá»ƒ nhÆ°á»ng chá»— cho lÃ½ trÃ­ thay vÃ¬ hÃ nh Ä‘á»™ng theo cáº£m xÃºc vá»™i vÃ ng", "Äá»ƒ tÄƒng lÆ°á»£t xem", "Äá»ƒ ngÆ°á»i gá»­i chá» lÃ¢u"], 1, "Khoáº£ng dá»«ng giÃºp kÃ­ch hoáº¡t tÆ° duy pháº£n biá»‡n."),
        q("KhÃ³a há»c DEEPFENSE BASIC dÃ nh cho ai?", ["Chá»‰ láº­p trÃ¬nh viÃªn", "Báº¥t ká»³ ngÆ°á»i dÃ¹ng Internet nÃ o muá»‘n báº£o vá»‡ mÃ¬nh trÃªn khÃ´ng gian sá»‘", "Chá»‰ ngÆ°á»i giÃ ", "Chá»‰ tráº» em"], 1, "Ká»¹ nÄƒng an toÃ n sá»‘ lÃ  cáº§n thiáº¿t cho táº¥t cáº£ má»i ngÆ°á»i.")
      ]
    }
  ]
};
