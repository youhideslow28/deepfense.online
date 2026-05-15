import type { Module } from '../basicsCourseData';
const q = (text: string, options: string[], answer: number, explanation?: string) => ({ text, options, answer, explanation });
const lesson = (id: string, title: string, paragraphs: string[], takeaways: string[]) => ({ id, title, paragraphs, takeaways, type: 'interactive' as const, duration: 5 });
const checkpoint = (label: string, questions: any[]) => ({ label, questions });

export const module0: Module = {
  id: 0, part: "foundation", title: "Má»™t ngÃ y bÃ¬nh thÆ°á»ng trÃªn khÃ´ng gian sá»‘",
  duration: "25-30 phÃºt", level: "Foundation",
  scenario: "Má»Ÿ Ä‘áº§u, táº¡o Ä‘á»™ng lá»±c, kiá»ƒm tra nháº­n thá»©c ban Ä‘áº§u. HÃ¬nh thá»©c: Tá»± há»c trÃªn deepfense.online. Äiá»u kiá»‡n hoÃ n thÃ nh: Xem háº¿t ná»™i dung, hoÃ n thÃ nh pre-check, Ä‘á»c káº¿t quáº£ pháº£n há»“i. Äiá»ƒm sá»‘: Pre-check khÃ´ng tÃ­nh vÃ o chá»©ng chá»‰.",
  outcomes: [
    "Hiá»ƒu vÃ¬ sao deepfake khÃ´ng cÃ²n lÃ  chuyá»‡n xa láº¡ cá»§a ngÆ°á»i ná»•i tiáº¿ng hay phim áº£nh.",
    "Nháº­n ra ráº±ng báº¥t ká»³ ngÆ°á»i dÃ¹ng Internet nÃ o cÅ©ng cÃ³ thá»ƒ gáº·p ná»™i dung giáº£ máº¡o, lá»«a Ä‘áº£o hoáº·c gÃ¢y hiá»ƒu nháº§m.",
    "LÃ m quen vá»›i cÃ¡ch há»c cá»§a DEEPFENSE BASIC: há»c qua cÃ¢u chuyá»‡n, tÃ¬nh huá»‘ng, quan sÃ¡t, quyáº¿t Ä‘á»‹nh vÃ  pháº£n há»“i.",
    "Tá»± kiá»ƒm tra pháº£n xáº¡ ban Ä‘áº§u cá»§a mÃ¬nh trÆ°á»›c cÃ¡c tÃ¬nh huá»‘ng nghi váº¥n trÃªn khÃ´ng gian sá»‘."
  ],
  sections: [
    {
      title: "0.0 ChÃ o má»«ng Ä‘áº¿n vá»›i DEEPFENSE BASIC",
      lessons: [
        lesson("0.0.1", "ChÃ o má»«ng Ä‘áº¿n vá»›i DEEPFENSE BASIC", [
          "ChÃ o má»«ng báº¡n Ä‘áº¿n vá»›i DEEPFENSE BASIC.",
          "ÄÃ¢y lÃ  khÃ³a há»c cÆ¡ báº£n vá» deepfake vÃ  phÃ²ng vá»‡ trÆ°á»›c ná»™i dung giáº£ máº¡o trÃªn khÃ´ng gian sá»‘. KhÃ³a há»c nÃ y khÃ´ng yÃªu cáº§u báº¡n biáº¿t láº­p trÃ¬nh, khÃ´ng yÃªu cáº§u báº¡n hiá»ƒu sÃ¢u vá» trÃ­ tuá»‡ nhÃ¢n táº¡o, cÅ©ng khÃ´ng yÃªu cáº§u báº¡n pháº£i lÃ  chuyÃªn gia an toÃ n thÃ´ng tin.",
          "Báº¡n chá»‰ cáº§n lÃ  má»™t ngÆ°á»i Ä‘ang sá»‘ng trong tháº¿ giá»›i sá»‘.",
          "Náº¿u báº¡n tá»«ng dÃ¹ng máº¡ng xÃ£ há»™i, tá»«ng nháº­n tin nháº¯n tá»« ngÆ°á»i láº¡, tá»«ng xem video ngáº¯n, tá»«ng nghe má»™t lá»i kÃªu gá»i chuyá»ƒn tiá»n, tá»«ng tháº¥y má»™t hÃ¬nh áº£nh gÃ¢y sá»‘c trong nhÃ³m chat, tá»«ng bÄƒn khoÄƒn \"cÃ¡i nÃ y cÃ³ tháº­t khÃ´ng?\", thÃ¬ khÃ³a há»c nÃ y dÃ nh cho báº¡n.",
          "Trong khÃ³a há»c nÃ y, chÃºng ta sáº½ khÃ´ng há»c cÃ¡ch táº¡o deepfake.",
          "ChÃºng ta há»c cÃ¡ch nháº­n ra rá»§i ro, kiá»ƒm chá»©ng thÃ´ng tin, báº£o vá»‡ báº£n thÃ¢n, báº£o vá»‡ ngÆ°á»i khÃ¡c vÃ  ra quyáº¿t Ä‘á»‹nh bÃ¬nh tÄ©nh hÆ¡n trÆ°á»›c nhá»¯ng ná»™i dung cÃ³ thá»ƒ Ä‘Ã¡nh lá»«a máº¯t, tai vÃ  cáº£m xÃºc cá»§a con ngÆ°á»i."
        ], []),
        lesson("0.0.2", "Äiá»u quan trá»ng Ä‘áº§u tiÃªn", [
          "Deepfake khÃ´ng chá»‰ lÃ  má»™t video giáº£.",
          "Deepfake lÃ  má»™t pháº§n cá»§a má»™t váº¥n Ä‘á» lá»›n hÆ¡n: niá»m tin cá»§a con ngÆ°á»i trÃªn khÃ´ng gian sá»‘ Ä‘ang bá»‹ thá»­ thÃ¡ch.",
          "TrÆ°á»›c Ä‘Ã¢y, nhiá»u ngÆ°á»i nghÄ©: \"CÃ³ hÃ¬nh thÃ¬ cháº¯c lÃ  tháº­t.\" Sau Ä‘Ã³, chÃºng ta há»c thÃªm: \"áº¢nh cÃ³ thá»ƒ bá»‹ chá»‰nh sá»­a.\" Rá»“i video trá»Ÿ thÃ nh báº±ng chá»©ng máº¡nh hÆ¡n: \"CÃ³ video thÃ¬ cháº¯c khÃ³ mÃ  giáº£.\"",
          "NhÆ°ng bÃ¢y giá», ngay cáº£ hÃ¬nh áº£nh, video vÃ  giá»ng nÃ³i cÅ©ng cÃ³ thá»ƒ Ä‘Æ°á»£c táº¡o ra hoáº·c chá»‰nh sá»­a báº±ng AI theo cÃ¡ch ráº¥t thuyáº¿t phá»¥c.",
          "Äiá»u Ä‘Ã³ khÃ´ng cÃ³ nghÄ©a lÃ  chÃºng ta pháº£i nghi ngá» má»i thá»©. Náº¿u cÃ¡i gÃ¬ cÅ©ng bá»‹ xem lÃ  giáº£, chÃºng ta sáº½ má»‡t má»i vÃ  máº¥t phÆ°Æ¡ng hÆ°á»›ng.",
          "Má»¥c tiÃªu cá»§a DEEPFENSE BASIC lÃ  giÃºp báº¡n cÃ³ má»™t cÃ¡ch tiáº¿p cáº­n cÃ¢n báº±ng:\n- KhÃ´ng hoáº£ng sá»£.\n- KhÃ´ng tin vá»™i.\n- KhÃ´ng chia sáº» vá»™i.\n- KhÃ´ng chuyá»ƒn tiá»n khi Ä‘ang bá»‹ gÃ¢y Ã¡p lá»±c.\n- Biáº¿t cÃ¡ch kiá»ƒm chá»©ng trÆ°á»›c khi hÃ nh Ä‘á»™ng."
        ], [])
      ]
    },
    {
      title: "0.1 CÃ¢u chuyá»‡n má»Ÿ Ä‘áº§u: Má»™t ngÃ y cá»§a An",
      lessons: [
        lesson("0.1.1", "Má»™t ngÃ y cá»§a An", [
          "Trong khÃ³a há»c nÃ y, báº¡n sáº½ Ä‘i cÃ¹ng má»™t nhÃ¢n váº­t tÃªn lÃ  An.",
          "An khÃ´ng pháº£i chuyÃªn gia cÃ´ng nghá»‡. An lÃ  má»™t ngÆ°á»i dÃ¹ng Internet bÃ¬nh thÆ°á»ng: cÃ³ Ä‘iá»‡n thoáº¡i, cÃ³ máº¡ng xÃ£ há»™i, cÃ³ tÃ i khoáº£n ngÃ¢n hÃ ng, cÃ³ gia Ä‘Ã¬nh, báº¡n bÃ¨, nhÃ³m lá»›p, nhÃ³m lÃ m viá»‡c vÃ  má»™t lá»‹ch sá»­ xem video khÃ¡ giá»‘ng chÃºng ta.",
          "Má»™t ngÃ y cá»§a An báº¯t Ä‘áº§u ráº¥t bÃ¬nh thÆ°á»ng.",
          "Buá»•i sÃ¡ng, An má»Ÿ Ä‘iá»‡n thoáº¡i vÃ  tháº¥y má»™t video cá»§a má»™t ngÆ°á»i ná»•i tiáº¿ng Ä‘ang giá»›i thiá»‡u má»™t kÃªnh Ä‘áº§u tÆ° \"lá»£i nhuáº­n cao, rá»§i ro tháº¥p\". GÆ°Æ¡ng máº·t Ä‘Ãºng lÃ  ngÆ°á»i Ä‘Ã³. Giá»ng nÃ³i cÅ©ng giá»‘ng. Video cÃ³ hÃ ng nghÃ¬n lÆ°á»£t xem, hÃ ng trÄƒm bÃ¬nh luáº­n.",
          "Äáº¿n trÆ°a, An nháº­n Ä‘Æ°á»£c tin nháº¯n tá»« má»™t ngÆ°á»i báº¡n cÅ©. NgÆ°á»i báº¡n nÃ³i Ä‘ang cáº§n mÆ°á»£n tiá»n gáº¥p vÃ¬ tÃ i khoáº£n ngÃ¢n hÃ ng bá»‹ khÃ³a. áº¢nh Ä‘áº¡i diá»‡n Ä‘Ãºng lÃ  báº¡n cá»§a An. CÃ¡ch nháº¯n tin thÃ¬ hÆ¡i khÃ¡c má»™t chÃºt, nhÆ°ng ngÆ°á»i kia báº£o Ä‘ang ráº¥t vá»™i.",
          "Chiá»u hÃ´m Ä‘Ã³, trong má»™t nhÃ³m chat, An tháº¥y má»™t hÃ¬nh áº£nh nháº¡y cáº£m Ä‘Æ°á»£c cho lÃ  cá»§a má»™t há»c sinh trong trÆ°á»ng. Má»™t sá»‘ ngÆ°á»i trong nhÃ³m cÆ°á»i cá»£t. Má»™t sá»‘ ngÆ°á»i nÃ³i Ä‘Ã³ lÃ  áº£nh AI. Má»™t sá»‘ ngÆ°á»i láº¡i báº£o \"khÃ´ng biáº¿t tháº­t giáº£ nhÆ°ng cá»© lÆ°u láº¡i Ä‘Ã£\".",
          "Buá»•i tá»‘i, An nháº­n má»™t cuá»™c gá»i video ngáº¯n. NgÆ°á»i gá»i trÃ´ng giá»‘ng ngÆ°á»i thÃ¢n cá»§a An vÃ  nÃ³i Ä‘ang gáº·p chuyá»‡n kháº©n cáº¥p. Cuá»™c gá»i hÆ¡i giáº­t, Ã¢m thanh khÃ´ng rÃµ láº¯m, nhÆ°ng giá»ng nghe ráº¥t quen.",
          "TrÆ°á»›c khi Ä‘i ngá»§, An tháº¥y má»™t Ä‘oáº¡n clip chÃ­nh trá»‹ - xÃ£ há»™i gÃ¢y pháº«n ná»™ Ä‘Æ°á»£c chia sáº» dÃ y Ä‘áº·c. Nhiá»u ngÆ°á»i kÃªu gá»i chia sáº» ngay Ä‘á»ƒ \"má»i ngÆ°á»i biáº¿t sá»± tháº­t\".",
          "Náº¿u lÃ  An, báº¡n sáº½ lÃ m gÃ¬? Báº¡n sáº½ tin video ngÆ°á»i ná»•i tiáº¿ng khÃ´ng? Báº¡n sáº½ chuyá»ƒn tiá»n cho ngÆ°á»i báº¡n cÅ© khÃ´ng? Báº¡n sáº½ xá»­ lÃ½ hÃ¬nh áº£nh nháº¡y cáº£m trong nhÃ³m chat ra sao? Báº¡n sáº½ lÃ m gÃ¬ vá»›i cuá»™c gá»i giá»‘ng ngÆ°á»i thÃ¢n? Báº¡n sáº½ chia sáº» Ä‘oáº¡n clip gÃ¢y pháº«n ná»™ khÃ´ng?",
          "KhÃ´ng cÃ³ cÃ¢u tráº£ lá»i nÃ o hoÃ n háº£o náº¿u chÃºng ta khÃ´ng cÃ³ phÆ°Æ¡ng phÃ¡p. VÃ¬ váº­y, khÃ³a há»c nÃ y sáº½ giÃºp báº¡n xÃ¢y dá»±ng má»™t phÆ°Æ¡ng phÃ¡p."
        ], []),
        lesson("0.1.2", "Deepfense Check", [
          "ChÃºng ta gá»i phÆ°Æ¡ng phÃ¡p Ä‘Ã³ lÃ : Deepfense Check.",
          "Trong cÃ¡c module sau, báº¡n sáº½ há»c tá»«ng pháº§n cá»§a quy trÃ¬nh nÃ y:\n1. Pause: Dá»«ng láº¡i trÆ°á»›c khi pháº£n á»©ng.\n2. Observe: Quan sÃ¡t dáº¥u hiá»‡u ká»¹ thuáº­t vÃ  ngá»¯ cáº£nh.\n3. Verify: XÃ¡c minh qua kÃªnh Ä‘á»™c láº­p.\n4. Trace: Truy nguá»“n ná»™i dung.\n5. Decide: Ra quyáº¿t Ä‘á»‹nh an toÃ n.",
          "á»ž Module 0, báº¡n chÆ°a cáº§n nhá»› háº¿t quy trÃ¬nh. Báº¡n chá»‰ cáº§n nhá»› má»™t cÃ¢u:",
          "Khi ná»™i dung khiáº¿n báº¡n sá»£, giáº­n, xáº¥u há»•, thÆ°Æ¡ng háº¡i hoáº·c muá»‘n hÃ nh Ä‘á»™ng ngay, Ä‘Ã³ lÃ  lÃºc báº¡n cáº§n cháº­m láº¡i."
        ], [
          "Pause, Observe, Verify, Trace, Decide lÃ  xÆ°Æ¡ng sá»‘ng cá»§a khÃ³a há»c.",
          "Khi ná»™i dung khiáº¿n báº¡n sá»£, giáº­n, xáº¥u há»•, thÆ°Æ¡ng háº¡i hoáº·c muá»‘n hÃ nh Ä‘á»™ng ngay, Ä‘Ã³ lÃ  lÃºc báº¡n cáº§n cháº­m láº¡i."
        ])
      ]
    },
    {
      title: "0.2 VÃ¬ sao khÃ³a há»c nÃ y cáº§n thiáº¿t?",
      lessons: [
        lesson("0.2.1", "VÃ¬ sao khÃ³a há»c nÃ y cáº§n thiáº¿t?", [
          "Deepfake nguy hiá»ƒm khÃ´ng pháº£i chá»‰ vÃ¬ nÃ³ \"giáº£\".",
          "NÃ³ nguy hiá»ƒm vÃ¬ nÃ³ cÃ³ thá»ƒ xuáº¥t hiá»‡n Ä‘Ãºng lÃºc con ngÆ°á»i Ã­t phÃ²ng bá»‹ nháº¥t:\n- Khi ta lo cho ngÆ°á»i thÃ¢n.\n- Khi ta sá»£ máº¥t tiá»n.\n- Khi ta xáº¥u há»•.\n- Khi ta giáº­n dá»¯.\n- Khi ta muá»‘n giÃºp ai Ä‘Ã³.\n- Khi ta tin ráº±ng mÃ¬nh Ä‘ang nhÃ¬n tháº¥y báº±ng chá»©ng.",
          "Deepfake cÅ©ng khÃ´ng hoáº¡t Ä‘á»™ng má»™t mÃ¬nh. NÃ³ thÆ°á»ng Ä‘i cÃ¹ng cÃ¡c yáº¿u tá»‘ khÃ¡c:\n- TÃ i khoáº£n máº¡ng xÃ£ há»™i bá»‹ chiáº¿m quyá»n.\n- Tin nháº¯n thÃºc Ã©p.\n- Link giáº£ máº¡o.\n- Trang web giáº£.\n- Giáº£ danh cÃ´ng an, ngÃ¢n hÃ ng, nhÃ  trÆ°á»ng, lÃ£nh Ä‘áº¡o, ngÆ°á»i ná»•i tiáº¿ng.\n- Sá»± lan truyá»n quÃ¡ nhanh trong nhÃ³m chat.",
          "VÃ¬ váº­y, há»c vá» deepfake khÃ´ng chá»‰ lÃ  há»c nhÃ¬n máº·t mÃ©o, máº¯t láº¡ hay giá»ng nÃ³i Ä‘á»u Ä‘á»u.",
          "Há»c vá» deepfake lÃ  há»c cÃ¡ch tá»± há»i:\n- Ai Ä‘ang gá»­i ná»™i dung nÃ y?\n- Há» muá»‘n mÃ¬nh lÃ m gÃ¬?\n- VÃ¬ sao mÃ¬nh pháº£i lÃ m ngay?\n- Náº¿u mÃ¬nh sai, ai sáº½ bá»‹ háº¡i?\n- CÃ³ cÃ¡ch nÃ o kiá»ƒm chá»©ng Ä‘á»™c láº­p khÃ´ng?",
          "ÄÃ¢y lÃ  khÃ³a há»c vá» nháº­n thá»©c, ká»¹ nÄƒng sá»‘ vÃ  trÃ¡ch nhiá»‡m sá»‘."
        ], [])
      ]
    },
    {
      title: "0.3 Báº¡n sáº½ há»c nhÆ° tháº¿ nÃ o?",
      lessons: [
        lesson("0.3.1", "Báº¡n sáº½ há»c nhÆ° tháº¿ nÃ o?", [
          "DEEPFENSE BASIC Ä‘Æ°á»£c thiáº¿t káº¿ theo kiá»ƒu há»c ngáº¯n, tÆ°Æ¡ng tÃ¡c vÃ  thá»±c táº¿.",
          "Má»—i pháº§n há»c thÆ°á»ng cÃ³ 5 thÃ nh pháº§n:\n1. CÃ¢u chuyá»‡n: Báº¡n gáº·p má»™t tÃ¬nh huá»‘ng giá»‘ng Ä‘á»i tháº­t.\n2. Kiáº¿n thá»©c: Báº¡n há»c khÃ¡i niá»‡m hoáº·c quy trÃ¬nh cáº§n thiáº¿t.\n3. Quan sÃ¡t: Báº¡n xem dáº¥u hiá»‡u, dá»¯ kiá»‡n, hÃ nh vi hoáº·c ngá»¯ cáº£nh.\n4. Quyáº¿t Ä‘á»‹nh: Báº¡n chá»n hÃ nh Ä‘á»™ng.\n5. Pháº£n há»“i: Há»‡ thá»‘ng giáº£i thÃ­ch vÃ¬ sao lá»±a chá»n Ä‘Ã³ an toÃ n hoáº·c rá»§i ro.",
          "Má»™t sá»‘ pháº§n sáº½ cÃ³ quiz ngáº¯n. Quiz khÃ´ng nháº±m \"báº¯t lá»—i\" báº¡n. Quiz giÃºp báº¡n kiá»ƒm tra xem mÃ¬nh Ä‘Ã£ hiá»ƒu Ä‘á»§ Ä‘á»ƒ dÃ¹ng kiáº¿n thá»©c trong Ä‘á»i tháº­t chÆ°a.",
          "Cuá»‘i khÃ³a, báº¡n sáº½ lÃ m bÃ i kiá»ƒm tra gá»“m 50 cÃ¢u há»i. Há»‡ thá»‘ng sáº½ láº¥y ngáº«u nhiÃªn tá»« ngÃ¢n hÃ ng 150 cÃ¢u. Náº¿u Ä‘áº¡t tá»« 70% trá»Ÿ lÃªn, báº¡n Ä‘á»§ Ä‘iá»u kiá»‡n nháº­n chá»©ng chá»‰ hoÃ n thÃ nh DEEPFENSE BASIC."
        ], [])
      ]
    },
    {
      title: "0.4 Pre-check: Pháº£n xáº¡ ban Ä‘áº§u cá»§a báº¡n",
      lessons: [
        lesson("0.4.1", "Pre-check: Pháº£n xáº¡ ban Ä‘áº§u", [
          "NgÆ°á»i há»c tráº£ lá»i 8 cÃ¢u há»i tÃ¬nh huá»‘ng. KhÃ´ng hiá»ƒn thá»‹ Ä‘Ã¡p Ã¡n Ä‘Ãºng/sai theo kiá»ƒu thi. Sau khi hoÃ n thÃ nh, há»‡ thá»‘ng hiá»ƒn thá»‹ nhÃ³m pháº£n xáº¡ vÃ  lá»i khuyÃªn há»c táº­p.",
          "Há»‡ thá»‘ng cÃ³ thá»ƒ phÃ¢n loáº¡i ngÆ°á»i há»c thÃ nh 3 nhÃ³m:\n\nNhÃ³m 1: Pháº£n xáº¡ nhanh, cáº§n thÃªm lá»›p phÃ²ng vá»‡ - Báº¡n cÃ³ xu hÆ°á»›ng hÃ nh Ä‘á»™ng nhanh khi gáº·p tÃ¬nh huá»‘ng kháº©n cáº¥p hoáº·c cáº£m xÃºc máº¡nh. KhÃ³a há»c nÃ y sáº½ giÃºp báº¡n thÃªm má»™t bÆ°á»›c \"dá»«ng láº¡i\" trÆ°á»›c khi quyáº¿t Ä‘á»‹nh.\n\nNhÃ³m 2: ÄÃ£ biáº¿t nghi ngá», cáº§n quy trÃ¬nh rÃµ hÆ¡n - Báº¡n Ä‘Ã£ cÃ³ cáº£m giÃ¡c cáº£nh giÃ¡c tá»‘t. BÆ°á»›c tiáº¿p theo lÃ  biáº¿n cáº£m giÃ¡c Ä‘Ã³ thÃ nh quy trÃ¬nh kiá»ƒm chá»©ng cÃ³ thá»ƒ láº·p láº¡i.\n\nNhÃ³m 3: Pháº£n xáº¡ phÃ²ng vá»‡ tá»‘t - Báº¡n Ä‘Ã£ chá»n nhiá»u hÃ nh Ä‘á»™ng an toÃ n. KhÃ³a há»c nÃ y sáº½ giÃºp báº¡n hiá»ƒu sÃ¢u hÆ¡n vÃ¬ sao cÃ¡c hÃ nh Ä‘á»™ng Ä‘Ã³ Ä‘Ãºng vÃ  cÃ¡ch hÆ°á»›ng dáº«n ngÆ°á»i khÃ¡c."
        ], [
          "Deepfake khÃ´ng Ä‘Ã¡ng sá»£ nháº¥t khi nÃ³ trÃ´ng hoÃ n háº£o. NÃ³ Ä‘Ã¡ng sá»£ nháº¥t khi nÃ³ xuáº¥t hiá»‡n Ä‘Ãºng lÃºc chÃºng ta Ä‘ang vá»™i, Ä‘ang sá»£, Ä‘ang giáº­n hoáº·c Ä‘ang thÆ°Æ¡ng ai Ä‘Ã³."
        ])
      ],
      checkpoint: checkpoint("0.4", [
        q("Báº¡n nháº­n Ä‘Æ°á»£c cuá»™c gá»i video tá»« má»™t ngÆ°á»i thÃ¢n. NgÆ°á»i Ä‘Ã³ nÃ³i Ä‘ang gáº·p tai náº¡n, cáº§n báº¡n chuyá»ƒn tiá»n ngay trong 5 phÃºt. HÃ¬nh áº£nh hÆ¡i má», giá»ng nÃ³i khÃ¡ giá»‘ng. Báº¡n nÃªn lÃ m gÃ¬ trÆ°á»›c tiÃªn?", ["Chuyá»ƒn tiá»n ngay vÃ¬ cÃ³ thá»ƒ ngÆ°á»i thÃ¢n Ä‘ang nguy hiá»ƒm", "Há»i sá»‘ tÃ i khoáº£n rá»“i chuyá»ƒn má»™t khoáº£n nhá» trÆ°á»›c", "Táº¯t cuá»™c gá»i vÃ  gá»i láº¡i báº±ng sá»‘ Ä‘iá»‡n thoáº¡i Ä‘Ã£ lÆ°u trÆ°á»›c Ä‘Ã³", "Gá»­i OTP ngÃ¢n hÃ ng Ä‘á»ƒ ngÆ°á»i Ä‘Ã³ tá»± xá»­ lÃ½ cho nhanh"], 2, "C lÃ  lá»±a chá»n an toÃ n nháº¥t. Khi cÃ³ yÃªu cáº§u tiá»n kháº©n cáº¥p, hÃ£y xÃ¡c minh qua kÃªnh Ä‘á»™c láº­p."),
        q("Báº¡n tháº¥y má»™t video ngÆ°á»i ná»•i tiáº¿ng kÃªu gá»i Ä‘áº§u tÆ°, cam káº¿t lá»£i nhuáº­n cao má»—i ngÃ y. Video cÃ³ gÆ°Æ¡ng máº·t vÃ  giá»ng nÃ³i ráº¥t giá»‘ng ngÆ°á»i tháº­t. Báº¡n nÃªn nghÄ© gÃ¬?", ["NgÆ°á»i ná»•i tiáº¿ng Ä‘Ã£ nÃ³i thÃ¬ cháº¯c Ä‘Ã¡ng tin", "Video cÃ³ thá»ƒ lÃ  tháº­t, giáº£ hoáº·c bá»‹ cáº¯t ghÃ©p; cáº§n kiá»ƒm chá»©ng nguá»“n chÃ­nh thá»©c", "Chá»‰ cáº§n Ä‘á»c bÃ¬nh luáº­n lÃ  biáº¿t tháº­t giáº£", "Náº¿u nhiá»u ngÆ°á»i chia sáº» thÃ¬ cháº¯c lÃ  tháº­t"], 1, "GÆ°Æ¡ng máº·t vÃ  giá»ng nÃ³i khÃ´ng Ä‘á»§ Ä‘á»ƒ xÃ¡c minh má»™t lá»i kÃªu gá»i tÃ i chÃ­nh."),
        q("Trong nhÃ³m lá»›p xuáº¥t hiá»‡n má»™t hÃ¬nh áº£nh nháº¡y cáº£m Ä‘Æ°á»£c cho lÃ  cá»§a má»™t báº¡n há»c. Má»™t ngÆ°á»i nÃ³i \"khÃ´ng biáº¿t tháº­t hay AI nhÆ°ng gá»­i tiáº¿p Ä‘i\". Báº¡n nÃªn lÃ m gÃ¬?", ["LÆ°u láº¡i Ä‘á»ƒ xem sau", "Chuyá»ƒn tiáº¿p cho báº¡n thÃ¢n Ä‘á»ƒ há»i Ã½ kiáº¿n", "KhÃ´ng lan truyá»n, bÃ¡o cÃ¡o ná»™i dung vÃ  tÃ¬m ngÆ°á»i cÃ³ trÃ¡ch nhiá»‡m há»— trá»£", "BÃ¬nh luáº­n Ä‘Ã¹a vÃ¬ cÃ³ thá»ƒ chá»‰ lÃ  áº£nh giáº£"], 2, "DÃ¹ tháº­t hay giáº£, viá»‡c lan truyá»n hÃ¬nh áº£nh nháº¡y cáº£m Ä‘á»u cÃ³ thá»ƒ gÃ¢y háº¡i nghiÃªm trá»ng."),
        q("Má»™t tÃ i khoáº£n giá»‘ng báº¡n cá»§a báº¡n nháº¯n tin mÆ°á»£n tiá»n. CÃ¡ch nháº¯n hÆ¡i láº¡, nhÆ°ng áº£nh Ä‘áº¡i diá»‡n Ä‘Ãºng vÃ  tÃ i khoáº£n Ä‘Ãºng tÃªn. Báº¡n nÃªn lÃ m gÃ¬?", ["Chuyá»ƒn tiá»n náº¿u sá»‘ tiá»n nhá»", "Gá»i xÃ¡c minh qua sá»‘ Ä‘iá»‡n thoáº¡i cÅ© hoáº·c kÃªnh khÃ¡c Ä‘Ã£ biáº¿t", "Há»i sá»‘ tÃ i khoáº£n rá»“i chuyá»ƒn sau", "Tin vÃ¬ tÃ i khoáº£n Ä‘Ãºng tÃªn"], 1, "TÃ i khoáº£n cÃ³ thá»ƒ bá»‹ chiáº¿m quyá»n."),
        q("Báº¡n tháº¥y má»™t Ä‘oáº¡n video gÃ¢y pháº«n ná»™ vÃ  dÃ²ng chá»¯ \"chia sáº» ngay trÆ°á»›c khi bá»‹ xÃ³a\". Báº¡n nÃªn lÃ m gÃ¬?", ["Chia sáº» ngay Ä‘á»ƒ cáº£nh bÃ¡o má»i ngÆ°á»i", "Chá» kiá»ƒm chá»©ng nguá»“n, thá»i gian, bá»‘i cáº£nh trÆ°á»›c khi chia sáº»", "Táº£i vá» vÃ  Ä‘Äƒng láº¡i á»Ÿ nhiá»u nÆ¡i", "BÃ¬nh luáº­n tháº­t máº¡nh Ä‘á»ƒ tÄƒng tÆ°Æ¡ng tÃ¡c"], 1, "Cáº£m xÃºc máº¡nh lÃ  má»™t tÃ­n hiá»‡u cáº§n cháº­m láº¡i."),
        q("Má»™t cÃ´ng cá»¥ online bÃ¡o video \"90% lÃ  deepfake\". Báº¡n nÃªn hiá»ƒu káº¿t quáº£ nÃ y tháº¿ nÃ o?", ["Video cháº¯c cháº¯n lÃ  giáº£", "CÃ´ng cá»¥ chá»‰ lÃ  má»™t tÃ­n hiá»‡u tham kháº£o, cáº§n thÃªm kiá»ƒm chá»©ng", "CÃ´ng cá»¥ luÃ´n chÃ­nh xÃ¡c hÆ¡n con ngÆ°á»i", "KhÃ´ng cáº§n xem nguá»“n ná»¯a"], 1, "CÃ´ng cá»¥ phÃ¡t hiá»‡n cÃ³ thá»ƒ sai, Ä‘áº·c biá»‡t trong mÃ´i trÆ°á»ng thá»±c táº¿."),
        q("Báº¡n nghi mÃ¬nh vá»«a bá»‹ lá»«a chuyá»ƒn tiá»n qua cuá»™c gá»i giáº£ máº¡o. Viá»‡c nÃ o nÃªn lÃ m sá»›m?", ["XÃ³a háº¿t tin nháº¯n vÃ¬ xáº¥u há»•", "Im láº·ng Ä‘á»ƒ trÃ¡nh bá»‹ ngÆ°á»i khÃ¡c biáº¿t", "LiÃªn há»‡ ngÃ¢n hÃ ng, lÆ°u báº±ng chá»©ng vÃ  bÃ¡o cÃ¡o", "ÄÄƒng toÃ n bá»™ thÃ´ng tin cÃ¡ nhÃ¢n cá»§a ngÆ°á»i nghi lá»«a Ä‘áº£o lÃªn máº¡ng"], 2, "Cáº§n hÃ nh Ä‘á»™ng nhanh, lÆ°u báº±ng chá»©ng vÃ  háº¡n cháº¿ gÃ¢y thÃªm rá»§i ro."),
        q("Báº¡n nghe má»™t báº£n ghi Ã¢m cÃ³ giá»ng nÃ³i giá»‘ng giÃ¡o viÃªn/lÃ£nh Ä‘áº¡o/ngÆ°á»i ná»•i tiáº¿ng nÃ³i má»™t Ä‘iá»u gÃ¢y sá»‘c. Báº¡n nÃªn káº¿t luáº­n tháº¿ nÃ o?", ["Giá»ng giá»‘ng thÃ¬ cháº¯c lÃ  tháº­t", "Giá»ng nÃ³i cÃ³ thá»ƒ bá»‹ giáº£ láº­p hoáº·c cáº¯t ghÃ©p; cáº§n kiá»ƒm chá»©ng nguá»“n vÃ  bá»‘i cáº£nh", "Náº¿u file Ã¢m thanh ngáº¯n thÃ¬ cháº¯c tháº­t", "Náº¿u nghe trÃªn Ä‘iá»‡n thoáº¡i thÃ¬ khÃ´ng thá»ƒ giáº£"], 1, "Giá»ng nÃ³i ngÃ y nay khÃ´ng cÃ²n lÃ  báº±ng chá»©ng tuyá»‡t Ä‘á»‘i.")
      ])
    }
  ],
  quiz: [
    q("Má»¥c tiÃªu chÃ­nh cá»§a DEEPFENSE BASIC lÃ  gÃ¬?", ["Há»c cÃ¡ch táº¡o deepfake", "Há»c cÃ¡ch nháº­n diá»‡n rá»§i ro vÃ  phÃ²ng vá»‡ an toÃ n trÆ°á»›c ná»™i dung giáº£ máº¡o", "Há»c máº¹o vÆ°á»£t detector", "TÄƒng lÆ°á»£t xem ná»™i dung"], 1),
    q("Deepfense Check gá»“m cÃ¡c bÆ°á»›c nÃ o?", ["Pause, Observe, Verify, Trace, Decide", "Post, Like, Share, Comment", "Copy, Paste, Upload", "Scan, Delete, Ignore"], 0),
    q("Khi nháº­n cuá»™c gá»i giá»‘ng ngÆ°á»i thÃ¢n yÃªu cáº§u chuyá»ƒn tiá»n gáº¥p, bÆ°á»›c an toÃ n nháº¥t lÃ  gÃ¬?", ["Chuyá»ƒn tiá»n ngay", "Ngáº¯t cuá»™c gá»i vÃ  xÃ¡c minh qua sá»‘/kÃªnh Ä‘Ã£ biáº¿t trÆ°á»›c", "Gá»­i OTP Ä‘á»ƒ há» xá»­ lÃ½", "Há»i sá»‘ tÃ i khoáº£n rá»“i chuyá»ƒn thá»­"], 1)
  ]
};
