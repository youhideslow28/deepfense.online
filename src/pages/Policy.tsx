import React from 'react';
import { Link } from 'react-router-dom';
import {
  Database,
  FileText,
  HelpCircle,
  Lock,
  Mail,
  Scale,
  ShieldCheck,
  UserCheck,
} from 'lucide-react';
import { Language } from '@/types';
import { PROJECT_METADATA } from '@/data';

interface PolicyProps {
  lang: Language;
}

const policySections = [
  {
    id: 'scope',
    icon: FileText,
    title: 'Pháº¡m Vi VÃ  Cam Káº¿t Minh Báº¡ch',
    body: [
      'Deepfense lÃ  ná»n táº£ng giÃ¡o dá»¥c vÃ  huáº¥n luyá»‡n cá»™ng Ä‘á»“ng vá» nháº­n diá»‡n deepfake, AI scam vÃ  cÃ¡c rá»§i ro thao tÃºng báº±ng ná»™i dung sá»‘. Website Ä‘Æ°á»£c xÃ¢y dá»±ng vá»›i má»¥c tiÃªu nÃ¢ng cao nháº­n thá»©c, há»— trá»£ ngÆ°á»i dÃ¹ng tá»± vá»‡ tá»‘t hÆ¡n vÃ  cung cáº¥p mÃ´i trÆ°á»ng há»c táº­p cÃ³ cáº¥u trÃºc.',
      'CÃ¡c tÃ­nh nÄƒng nhÆ° challenge, mÃ´ phá»ng tÃ¬nh huá»‘ng, kháº£o sÃ¡t, Trung tÃ¢m trá»£ giÃºp vÃ  dashboard quáº£n trá»‹ Ä‘Æ°á»£c thiáº¿t káº¿ theo nguyÃªn táº¯c minh báº¡ch, thu tháº­p dá»¯ liá»‡u cÃ³ má»¥c Ä‘Ã­ch, háº¡n cháº¿ dá»¯ liá»‡u khÃ´ng cáº§n thiáº¿t vÃ  Æ°u tiÃªn an toÃ n cho ngÆ°á»i dÃ¹ng.',
      'Deepfense khÃ´ng tá»± nháº­n lÃ  cÆ¡ quan Ä‘iá»u tra, cÆ¡ quan phÃ¡p lÃ½, Ä‘Æ¡n vá»‹ giÃ¡m Ä‘á»‹nh tÆ° phÃ¡p hoáº·c tá»• chá»©c cÃ³ tháº©m quyá»n káº¿t luáº­n tranh cháº¥p. Má»i phÃ¢n tÃ­ch, Ä‘iá»ƒm sá»‘, cáº£nh bÃ¡o hoáº·c pháº£n há»“i tá»« há»‡ thá»‘ng chá»‰ mang tÃ­nh há»— trá»£ giÃ¡o dá»¥c, tham kháº£o vÃ  khuyáº¿n nghá»‹ phÃ²ng trÃ¡nh.',
    ],
  },
  {
    id: 'privacy',
    icon: Lock,
    title: 'ChÃ­nh SÃ¡ch Báº£o Máº­t VÃ  Dá»¯ Liá»‡u CÃ¡ NhÃ¢n',
    body: [
      'Deepfense cÃ³ thá»ƒ thu tháº­p má»™t sá»‘ nhÃ³m dá»¯ liá»‡u cáº§n thiáº¿t Ä‘á»ƒ váº­n hÃ nh dá»‹ch vá»¥: thÃ´ng tin tÃ i khoáº£n nhÆ° email, tÃªn hiá»ƒn thá»‹; dá»¯ liá»‡u há»c táº­p nhÆ° Ä‘iá»ƒm sá»‘, tiáº¿n Ä‘á»™, káº¿t quáº£ challenge; dá»¯ liá»‡u kháº£o sÃ¡t náº¿u ngÆ°á»i dÃ¹ng tá»± nguyá»‡n tham gia; dá»¯ liá»‡u Trung tÃ¢m trá»£ giÃºp nhÆ° mÃ´ táº£ tÃ¬nh huá»‘ng, Ä‘Æ°á»ng dáº«n, tá»‡p Ä‘Ã­nh kÃ¨m; vÃ  dá»¯ liá»‡u ká»¹ thuáº­t nhÆ° thá»i gian truy cáº­p, trÃ¬nh duyá»‡t, user agent hoáº·c log há»‡ thá»‘ng.',
      'Dá»¯ liá»‡u Ä‘Æ°á»£c sá»­ dá»¥ng Ä‘á»ƒ váº­n hÃ nh academy, hiá»ƒn thá»‹ káº¿t quáº£ há»c táº­p, cáº£i thiá»‡n ná»™i dung Ä‘Ã o táº¡o, pháº£n há»“i yÃªu cáº§u há»— trá»£, phÃ¡t hiá»‡n spam/láº¡m dá»¥ng, báº£o vá»‡ há»‡ thá»‘ng vÃ  tá»•ng há»£p hiá»ƒu biáº¿t cá»™ng Ä‘á»“ng vá» rá»§i ro deepfake hoáº·c AI scam.',
      'Deepfense khÃ´ng bÃ¡n dá»¯ liá»‡u cÃ¡ nhÃ¢n cá»§a ngÆ°á»i dÃ¹ng. Dá»¯ liá»‡u kháº£o sÃ¡t vÃ  dá»¯ liá»‡u há»c táº­p khi dÃ¹ng cho má»¥c Ä‘Ã­ch nghiÃªn cá»©u, bÃ¡o cÃ¡o hoáº·c cáº£i thiá»‡n sáº£n pháº©m sáº½ Ä‘Æ°á»£c Æ°u tiÃªn xá»­ lÃ½ á»Ÿ dáº¡ng tá»•ng há»£p, áº©n danh hoáº·c giáº£m Ä‘á»‹nh danh khi phÃ¹ há»£p.',
      'Deepfense khÃ´ng sá»­ dá»¥ng cÃ¢u tráº£ lá»i kháº£o sÃ¡t Ä‘á»ƒ phÃ¢n biá»‡t Ä‘á»‘i xá»­ vá»›i cÃ¡ nhÃ¢n ngÆ°á»i dÃ¹ng. CÃ¡c chá»‰ sá»‘ há»c táº­p Ä‘Æ°á»£c dÃ¹ng Ä‘á»ƒ pháº£n há»“i tiáº¿n Ä‘á»™, Ä‘á» xuáº¥t ná»™i dung phÃ¹ há»£p vÃ  Ä‘Ã¡nh giÃ¡ hiá»‡u quáº£ Ä‘Ã o táº¡o, khÃ´ng nháº±m gáº¯n nhÃ£n tiÃªu cá»±c cho ngÆ°á»i há»c.',
    ],
  },
  {
    id: 'terms',
    icon: Scale,
    title: 'Äiá»u Khoáº£n Sá»­ Dá»¥ng',
    body: [
      'NgÆ°á»i dÃ¹ng cáº§n sá»­ dá»¥ng Deepfense vá»›i má»¥c Ä‘Ã­ch há»c táº­p, tá»± báº£o vá»‡ vÃ  há»— trá»£ nÃ¢ng cao nháº­n thá»©c an toÃ n sá»‘. NgÆ°á»i dÃ¹ng khÃ´ng Ä‘Æ°á»£c lá»£i dá»¥ng ná»n táº£ng Ä‘á»ƒ phÃ¡t tÃ¡n ná»™i dung gÃ¢y háº¡i, ná»™i dung xÃ¢m pháº¡m quyá»n riÃªng tÆ°, ná»™i dung vi pháº¡m báº£n quyá»n, dá»¯ liá»‡u cÃ¡ nhÃ¢n cá»§a ngÆ°á»i khÃ¡c khi chÆ°a cÃ³ quyá»n phÃ¹ há»£p hoáº·c tÃ i liá»‡u cÃ³ thá»ƒ gÃ¢y nguy hiá»ƒm cho cá»™ng Ä‘á»“ng.',
      'Káº¿t quáº£ challenge, mÃ´ phá»ng, phÃ¢n tÃ­ch hoáº·c pháº£n há»“i tá»« Deepfense khÃ´ng pháº£i lÃ  káº¿t luáº­n phÃ¡p lÃ½. NgÆ°á»i dÃ¹ng nÃªn tá»± xÃ¡c minh qua nhiá»u nguá»“n, liÃªn há»‡ trá»±c tiáº¿p ngÆ°á»i liÃªn quan qua kÃªnh Ä‘á»™c láº­p vÃ  tÃ¬m Ä‘áº¿n cÆ¡ quan/chuyÃªn gia phÃ¹ há»£p khi sá»± viá»‡c cÃ³ rá»§i ro tÃ i chÃ­nh, danh dá»±, an toÃ n cÃ¡ nhÃ¢n hoáº·c phÃ¡p lÃ½.',
      'Deepfense cÃ³ quyá»n giá»›i háº¡n tÃ­nh nÄƒng, khÃ³a tÃ i khoáº£n, áº©n ná»™i dung, xÃ³a ná»™i dung hoáº·c ghi nháº­n sá»± kiá»‡n báº£o máº­t khi phÃ¡t hiá»‡n dáº¥u hiá»‡u spam, láº¡m dá»¥ng, truy cáº­p trÃ¡i phÃ©p, gá»­i liÃªn káº¿t/tá»‡p Ä‘Ã¡ng ngá», hoáº·c hÃ nh vi cÃ³ thá»ƒ gÃ¢y rá»§i ro cho há»‡ thá»‘ng vÃ  cá»™ng Ä‘á»“ng.',
      'Khi sá»­ dá»¥ng cÃ¡c biá»ƒu máº«u gá»­i thÃ´ng tin, ngÆ°á»i dÃ¹ng chá»‹u trÃ¡ch nhiá»‡m Ä‘áº£m báº£o ná»™i dung gá»­i lÃªn khÃ´ng vi pháº¡m quyá»n riÃªng tÆ°, báº£n quyá»n, bÃ­ máº­t cÃ¡ nhÃ¢n hoáº·c quy Ä‘á»‹nh phÃ¡p luáº­t hiá»‡n hÃ nh.',
    ],
  },
  {
    id: 'help-center',
    icon: HelpCircle,
    title: 'ChÃ­nh SÃ¡ch Trung TÃ¢m Trá»£ GiÃºp',
    body: [
      'Trung tÃ¢m trá»£ giÃºp cá»§a Deepfense tiáº¿p nháº­n tÃ¬nh huá»‘ng nghi ngá» deepfake, AI voice scam, giáº£ máº¡o danh tÃ­nh, phishing, lá»«a Ä‘áº£o, quáº¥y rá»‘i, tin sai lá»‡ch hoáº·c cÃ¡c trÆ°á»ng há»£p liÃªn quan Ä‘áº¿n an toÃ n sá»‘. Má»¥c tiÃªu lÃ  há»— trá»£ ngÆ°á»i dÃ¹ng nháº­n diá»‡n dáº¥u hiá»‡u rá»§i ro vÃ  Ä‘Æ°a ra khuyáº¿n nghá»‹ phÃ²ng trÃ¡nh tháº­n trá»ng.',
      'Deepfense sá»­ dá»¥ng ngÃ´n ngá»¯ trung láº­p khi pháº£n há»“i: â€œcÃ³ dáº¥u hiá»‡u cáº§n xÃ¡c minh thÃªmâ€, â€œchÆ°a Ä‘á»§ dá»¯ kiá»‡n Ä‘á»ƒ káº¿t luáº­nâ€, â€œkhuyáº¿n nghá»‹ liÃªn há»‡ ngÆ°á»i liÃªn quan qua kÃªnh khÃ¡câ€, â€œkhÃ´ng chuyá»ƒn tiá»n hoáº·c chia sáº» mÃ£ OTP/thÃ´ng tin cÃ¡ nhÃ¢n khi chÆ°a xÃ¡c minhâ€.',
      'Deepfense khÃ´ng káº¿t luáº­n má»™t cÃ¡ nhÃ¢n/tá»• chá»©c lÃ  â€œÄ‘Ãºngâ€, â€œsaiâ€, â€œcÃ³ tá»™iâ€ hoáº·c â€œlá»«a Ä‘áº£oâ€ náº¿u khÃ´ng cÃ³ tháº©m quyá»n vÃ  cÄƒn cá»© phÃ¡p lÃ½ phÃ¹ há»£p. Trong cÃ¡c trÆ°á»ng há»£p nghiÃªm trá»ng, ngÆ°á»i dÃ¹ng nÃªn lÆ°u báº±ng chá»©ng, háº¡n cháº¿ lan truyá»n ná»™i dung nháº¡y cáº£m vÃ  liÃªn há»‡ cÆ¡ quan chá»©c nÄƒng hoáº·c chuyÃªn gia phÃ¡p lÃ½/an ninh máº¡ng.',
      'CÃ¡c case gá»­i qua Trung tÃ¢m trá»£ giÃºp cÃ³ thá»ƒ Ä‘Æ°á»£c phÃ¢n loáº¡i theo loáº¡i sá»± viá»‡c, má»©c Ä‘á»™ nghiÃªm trá»ng, tráº¡ng thÃ¡i xá»­ lÃ½ vÃ  ghi chÃº pháº£n há»“i. Viá»‡c phÃ¢n loáº¡i nháº±m Æ°u tiÃªn xá»­ lÃ½ vÃ  cáº£i thiá»‡n cháº¥t lÆ°á»£ng há»— trá»£, khÃ´ng nháº±m phÃ¡n xÃ©t ngÆ°á»i gá»­i hoáº·c ngÆ°á»i Ä‘Æ°á»£c nháº¯c Ä‘áº¿n trong ná»™i dung.',
    ],
  },
  {
    id: 'security',
    icon: ShieldCheck,
    title: 'Báº£o Máº­t Há»‡ Thá»‘ng VÃ  Váº­n HÃ nh Tin Cáº­y',
    body: [
      'Deepfense Ã¡p dá»¥ng mÃ´ hÃ¬nh phÃ¢n quyá»n user/editor/admin Ä‘á»ƒ tÃ¡ch biá»‡t ngÆ°á»i há»c, ngÆ°á»i biÃªn táº­p ná»™i dung vÃ  ngÆ°á»i quáº£n trá»‹ há»‡ thá»‘ng. NguyÃªn táº¯c thiáº¿t káº¿ lÃ  cáº¥p quyá»n vá»«a Ä‘á»§, háº¡n cháº¿ truy cáº­p dá»¯ liá»‡u nháº¡y cáº£m vÃ  ghi nháº­n cÃ¡c thao tÃ¡c quan trá»ng.',
      'CÃ¡c thao tÃ¡c nhÆ° Ä‘Äƒng nháº­p quáº£n trá»‹, Ä‘á»•i role, khÃ³a/má»Ÿ tÃ i khoáº£n, táº¡o/sá»­a challenge, xá»­ lÃ½ case, xÃ³a dá»¯ liá»‡u hoáº·c pháº£n há»“i ngÆ°á»i dÃ¹ng nÃªn Ä‘Æ°á»£c ghi vÃ o activity log. CÃ¡c sá»± kiá»‡n nhÆ° Ä‘Äƒng nháº­p tháº¥t báº¡i, truy cáº­p bá»‹ tá»« chá»‘i, thay Ä‘á»•i role, gá»­i liÃªn káº¿t/tá»‡p Ä‘Ã¡ng ngá» hoáº·c gá»­i quÃ¡ nhiá»u láº§n trong thá»i gian ngáº¯n nÃªn Ä‘Æ°á»£c ghi vÃ o security events.',
      'Khi triá»ƒn khai production, Deepfense nÃªn báº­t HTTPS/HSTS, cáº¥u hÃ¬nh Content Security Policy, frame-ancestors hoáº·c X-Frame-Options, giá»›i háº¡n tá»‘c Ä‘á»™ gá»­i form, kiá»ƒm tra tá»‡p táº£i lÃªn, giá»›i háº¡n kÃ­ch thÆ°á»›c file vÃ  theo dÃµi cÃ¡c hÃ nh vi báº¥t thÆ°á»ng.',
      'Deepfense hÆ°á»›ng tá»›i mÃ´ hÃ¬nh privacy-by-design vÃ  security-by-design á»Ÿ má»©c phÃ¹ há»£p vá»›i má»™t ná»n táº£ng giÃ¡o dá»¥c: báº£o vá»‡ ngÆ°á»i dÃ¹ng, giáº£m rá»§i ro váº­n hÃ nh vÃ  giÃºp ngÆ°á»i quáº£n trá»‹ cÃ³ Ä‘á»§ dáº¥u váº¿t Ä‘á»ƒ xá»­ lÃ½ sá»± cá»‘ má»™t cÃ¡ch cÃ³ trÃ¡ch nhiá»‡m.',
    ],
  },
  {
    id: 'retention',
    icon: Database,
    title: 'LÆ°u Trá»¯, XÃ³a VÃ  VÃ²ng Äá»i Dá»¯ Liá»‡u',
    body: [
      'Deepfense chá»‰ nÃªn lÆ°u dá»¯ liá»‡u trong thá»i gian cáº§n thiáº¿t cho má»¥c Ä‘Ã­ch váº­n hÃ nh, há»c táº­p, há»— trá»£ ngÆ°á»i dÃ¹ng, thá»‘ng kÃª tá»•ng há»£p vÃ  báº£o vá»‡ há»‡ thá»‘ng. Viá»‡c lÆ°u trá»¯ khÃ´ng nÃªn kÃ©o dÃ i chá»‰ vÃ¬ â€œcÃ³ thá»ƒ cáº§n sau nÃ yâ€ náº¿u khÃ´ng cÃ³ má»¥c Ä‘Ã­ch rÃµ rÃ ng.',
      'Khuyáº¿n nghá»‹ lÆ°u trá»¯: activity logs tá»« 90 Ä‘áº¿n 180 ngÃ y; security events khoáº£ng 180 ngÃ y; Help Center Cases tá»« 180 Ä‘áº¿n 365 ngÃ y tÃ¹y má»©c Ä‘á»™; dá»¯ liá»‡u kháº£o sÃ¡t Æ°u tiÃªn giá»¯ á»Ÿ dáº¡ng tá»•ng há»£p hoáº·c áº©n danh; káº¿t quáº£ challenge cÃ³ thá»ƒ giá»¯ theo tÃ i khoáº£n Ä‘á»ƒ phá»¥c vá»¥ tiáº¿n Ä‘á»™ há»c táº­p.',
      'Khi xÃ³a Help Center Case cÃ³ tá»‡p Ä‘Ã­nh kÃ¨m, cáº§n xÃ³a cáº£ document trong Firestore vÃ  file liÃªn quan trong Storage Ä‘á»ƒ trÃ¡nh rÃ² rá»‰ dá»¯ liá»‡u. Khi xÃ³a tÃ i khoáº£n hoáº·c dá»¯ liá»‡u cÃ¡ nhÃ¢n, há»‡ thá»‘ng cáº§n cÃ¢n nháº¯c Ä‘iá»u kiá»‡n ká»¹ thuáº­t, yÃªu cáº§u báº£o máº­t, nghÄ©a vá»¥ phÃ¡p lÃ½ vÃ  quyá»n lá»£i chÃ­nh Ä‘Ã¡ng cá»§a ngÆ°á»i dÃ¹ng.',
      'NgÆ°á»i dÃ¹ng cÃ³ thá»ƒ yÃªu cáº§u xem, chá»‰nh sá»­a hoáº·c xÃ³a dá»¯ liá»‡u cÃ¡ nhÃ¢n cá»§a mÃ¬nh náº¿u phÃ¹ há»£p vá»›i Ä‘iá»u kiá»‡n ká»¹ thuáº­t vÃ  phÃ¡p lÃ½. Deepfense sáº½ xá»­ lÃ½ yÃªu cáº§u theo kháº£ nÄƒng váº­n hÃ nh thá»±c táº¿ vÃ  theo nguyÃªn táº¯c tÃ´n trá»ng quyá»n riÃªng tÆ°.',
    ],
  },
  {
    id: 'access',
    icon: UserCheck,
    title: 'PhÃ¢n Quyá»n Ná»™i Bá»™ VÃ  TrÃ¡ch Nhiá»‡m Quáº£n Trá»‹',
    body: [
      'User lÃ  ngÆ°á»i há»c/ngÆ°á»i chÆ¡i bÃ¬nh thÆ°á»ng, cÃ³ quyá»n xem tiáº¿n Ä‘á»™, Ä‘iá»ƒm sá»‘, káº¿t quáº£ cá»§a chÃ­nh mÃ¬nh, tham gia challenge, gá»­i kháº£o sÃ¡t náº¿u Ä‘á»“ng Ã½ vÃ  gá»­i yÃªu cáº§u qua Trung tÃ¢m trá»£ giÃºp.',
      'Editor lÃ  thÃ nh viÃªn phá»¥ trÃ¡ch ná»™i dung, cÃ³ thá»ƒ táº¡o/sá»­a lesson, challenge, explanation, skill tags vÃ  difficulty. Editor khÃ´ng nÃªn cÃ³ quyá»n xÃ³a user, Ä‘á»•i role, xem dá»¯ liá»‡u nháº¡y cáº£m khÃ´ng cáº§n thiáº¿t hoáº·c xÃ³a log há»‡ thá»‘ng.',
      'Admin chá»‹u trÃ¡ch nhiá»‡m quáº£n trá»‹ user, role, tráº¡ng thÃ¡i tÃ i khoáº£n, Help Center Cases, Content Studio, Activity Log vÃ  Security Events. Má»i thao tÃ¡c quáº£n trá»‹ quan trá»ng nÃªn cÃ³ dáº¥u váº¿t rÃµ rÃ ng Ä‘á»ƒ Ä‘áº£m báº£o tÃ­nh minh báº¡ch vÃ  trÃ¡ch nhiá»‡m giáº£i trÃ¬nh.',
      'Deepfense Æ°u tiÃªn mÃ´ hÃ¬nh least privilege: má»—i vai trÃ² chá»‰ cÃ³ quyá»n cáº§n thiáº¿t Ä‘á»ƒ hoÃ n thÃ nh nhiá»‡m vá»¥. Äiá»u nÃ y giÃºp giáº£m rá»§i ro lá»™ dá»¯ liá»‡u, thao tÃ¡c nháº§m hoáº·c láº¡m quyá»n trong quÃ¡ trÃ¬nh váº­n hÃ nh.',
    ],
  },
  {
    id: 'content',
    icon: FileText,
    title: 'ChÃ­nh SÃ¡ch Ná»™i Dung VÃ  Challenge',
    body: [
      'Ná»™i dung Ä‘Ã o táº¡o cá»§a Deepfense cáº§n hÆ°á»›ng tá»›i giÃ¡o dá»¥c, phÃ²ng trÃ¡nh vÃ  nÃ¢ng cao nÄƒng lá»±c xÃ¡c minh thÃ´ng tin. Challenge nÃªn giáº£i thÃ­ch rÃµ dáº¥u hiá»‡u nháº­n diá»‡n, lÃ½ do Ä‘Ã¡p Ã¡n vÃ  bÆ°á»›c kiá»ƒm chá»©ng an toÃ n sau khi ngÆ°á»i dÃ¹ng tráº£ lá»i.',
      'Deepfense khÃ´ng nÃªn sá»­ dá»¥ng hÃ¬nh áº£nh, video, giá»ng nÃ³i hoáº·c dá»¯ liá»‡u cÃ¡ nhÃ¢n cá»§a ngÆ°á»i tháº­t náº¿u chÆ°a cÃ³ quyá»n phÃ¹ há»£p. Ná»™i dung nháº¡y cáº£m, ná»™i dung cÃ³ kháº£ nÄƒng gÃ¢y hiá»ƒu nháº§m hoáº·c áº£nh hÆ°á»Ÿng danh dá»± cÃ¡ nhÃ¢n cáº§n Ä‘Æ°á»£c xem xÃ©t ká»¹ trÆ°á»›c khi cÃ´ng bá»‘.',
      'CÃ¡c challenge cÃ³ Ä‘á»™ khÃ³ cao, liÃªn quan Ä‘áº¿n tÃ i chÃ­nh, giáº£ máº¡o danh tÃ­nh, quáº¥y rá»‘i, tin sai lá»‡ch hoáº·c ná»™i dung dá»… lan truyá»n nÃªn Ä‘Æ°á»£c admin review trÆ°á»›c khi chuyá»ƒn sang tráº¡ng thÃ¡i published.',
      'NgÃ´n ngá»¯ trong ná»™i dung cáº§n trÃ¡nh phÃ¡n xÃ©t phÃ¡p lÃ½. Thay vÃ¬ kháº³ng Ä‘á»‹nh tuyá»‡t Ä‘á»‘i, Deepfense Æ°u tiÃªn cÃ¡ch diá»…n Ä‘áº¡t nhÆ° â€œdáº¥u hiá»‡u rá»§i roâ€, â€œcáº§n xÃ¡c minh thÃªmâ€, â€œkhuyáº¿n nghá»‹ kiá»ƒm tra nguá»“n gá»‘câ€ vÃ  â€œkhÃ´ng chia sáº» thÃ´ng tin nháº¡y cáº£m khi chÆ°a cháº¯c cháº¯nâ€.',
    ],
  },
];

const trustHighlights = [
  'KhÃ´ng bÃ¡n dá»¯ liá»‡u cÃ¡ nhÃ¢n',
  'Thu tháº­p dá»¯ liá»‡u cÃ³ má»¥c Ä‘Ã­ch rÃµ rÃ ng',
  'Æ¯u tiÃªn tá»•ng há»£p hoáº·c áº©n danh khi phÃ¢n tÃ­ch',
  'PhÃ¢n quyá»n user/editor/admin',
  'Ghi log thao tÃ¡c quáº£n trá»‹ quan trá»ng',
  'Pháº£n há»“i Help Center báº±ng ngÃ´n ngá»¯ trung láº­p',
];

const Policy: React.FC<PolicyProps> = ({ lang }) => {
  const isVi = lang === 'vi';

  return (
    <div className="mx-auto max-w-6xl animate-in fade-in">
      <section className="rounded-lg border border-white/10 bg-[#07111f]/90 p-6 shadow-2xl shadow-black/30 md:p-8">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-primary/25 bg-primary/10 px-3 py-1.5 text-xs font-bold uppercase tracking-[0.2em] text-blue-200">
              <FileText size={14} />
              Trung TÃ¢m ChÃ­nh SÃ¡ch & Niá»m Tin
            </div>
            <h1 className="text-3xl font-black text-white md:text-5xl">
              {isVi ? 'ChÃ­nh SÃ¡ch Deepfense' : 'Deepfense Policies'}
            </h1>
            <p className="mt-4 max-w-3xl text-sm leading-relaxed text-gray-400 md:text-base">
              {isVi
                ? 'Deepfense cÃ´ng bá»‘ cÃ¡c chÃ­nh sÃ¡ch nÃ y Ä‘á»ƒ ngÆ°á»i dÃ¹ng hiá»ƒu rÃµ cÃ¡ch ná»n táº£ng thu tháº­p dá»¯ liá»‡u, báº£o vá»‡ quyá»n riÃªng tÆ°, xá»­ lÃ½ yÃªu cáº§u há»— trá»£, quáº£n trá»‹ ná»™i dung vÃ  váº­n hÃ nh há»‡ thá»‘ng má»™t cÃ¡ch cÃ³ trÃ¡ch nhiá»‡m.'
                : 'Deepfense publishes these policies so users can understand how the platform handles privacy, data, support cases, content governance, and responsible operations.'}
            </p>
          </div>
          <div className="rounded-lg border border-white/10 bg-black/25 p-4 text-xs leading-relaxed text-gray-500">
            <p className="font-mono font-bold uppercase tracking-widest text-gray-300">{isVi ? 'Cáº­p nháº­t' : 'Updated'}</p>
            <p className="mt-1">ThÃ¡ng 5, 2026</p>
            <p className="mt-3">{PROJECT_METADATA.university}</p>
          </div>
        </div>
      </section>

      <section className="mt-5 rounded-lg border border-primary/20 bg-primary/10 p-5">
        <h2 className="font-black text-white">Cam Káº¿t Tin Cáº­y</h2>
        <div className="mt-4 grid gap-3 md:grid-cols-2 lg:grid-cols-3">
          {trustHighlights.map((item) => (
            <div key={item} className="flex items-center gap-3 rounded-lg border border-white/10 bg-black/25 p-3 text-sm font-bold text-gray-200">
              <ShieldCheck className="shrink-0 text-emerald-300" size={17} />
              {item}
            </div>
          ))}
        </div>
      </section>

      <div className="mt-5 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {policySections.map((section) => {
          const Icon = section.icon;
          return (
            <a key={section.id} href={`#${section.id}`} className="rounded-lg border border-white/10 bg-white/[0.03] p-4 text-sm font-bold text-gray-300 transition-colors hover:border-primary/40 hover:text-white">
              <Icon className="mb-3 text-primary" size={20} />
              {section.title}
            </a>
          );
        })}
      </div>

      <div className="mt-6 space-y-5">
        {policySections.map((section) => {
          const Icon = section.icon;
          return (
            <section id={section.id} key={section.id} className="scroll-mt-28 rounded-lg border border-white/10 bg-[#07111f]/90 p-6">
              <div className="mb-4 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-primary/25 bg-primary/10 text-primary">
                  <Icon size={20} />
                </div>
                <h2 className="text-xl font-black text-white">{section.title}</h2>
              </div>
              <div className="space-y-3 text-sm leading-relaxed text-gray-400">
                {section.body.map((item) => <p key={item}>{item}</p>)}
              </div>
            </section>
          );
        })}
      </div>

      <section className="mt-6 rounded-lg border border-primary/20 bg-primary/10 p-6">
        <h2 className="font-black text-white">LiÃªn Há»‡ Vá» ChÃ­nh SÃ¡ch</h2>
        <p className="mt-2 text-sm leading-relaxed text-gray-300">
          Má»i cÃ¢u há»i vá» dá»¯ liá»‡u cÃ¡ nhÃ¢n, báº£o máº­t, quyá»n ngÆ°á»i dÃ¹ng, Trung tÃ¢m trá»£ giÃºp hoáº·c yÃªu cáº§u xem/sá»­a/xÃ³a dá»¯ liá»‡u cÃ³ thá»ƒ gá»­i qua kÃªnh liÃªn há»‡ chÃ­nh thá»©c cá»§a Deepfense. Khi gá»­i yÃªu cáº§u, ngÆ°á»i dÃ¹ng nÃªn cung cáº¥p email tÃ i khoáº£n, ná»™i dung yÃªu cáº§u vÃ  thÃ´ng tin cáº§n thiáº¿t Ä‘á»ƒ nhÃ³m váº­n hÃ nh xÃ¡c minh há»£p lÃ½.
        </p>
        <div className="mt-4 flex flex-wrap gap-3">
          <a href={`mailto:${PROJECT_METADATA.email}`} className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-3 text-sm font-bold text-white hover:bg-blue-500">
            <Mail size={16} /> {PROJECT_METADATA.email}
          </a>
          <Link to="/contact" className="inline-flex items-center gap-2 rounded-lg border border-white/10 px-4 py-3 text-sm font-bold text-gray-300 hover:border-primary hover:text-white">
            Má»Ÿ trang liÃªn há»‡
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Policy;
