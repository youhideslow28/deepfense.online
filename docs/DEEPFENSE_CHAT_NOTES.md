# DEEPFENSE chat notes

Nguon: Claude share `https://claude.ai/share/1b53d6dc-386b-41c7-b36f-535734490031`

## Boi canh du an

- `deepfense.online` la DEEPFENSE 1.0: nen tang hoc tap/tuong tac ve nhan dien deepfake.
- Stack da duoc nhac den: React + TypeScript + Tailwind CSS, Firebase, Gemini 2.5 Flash API.
- Huong 2.0 khong chi nang UI/UX ma phai sau hon, gan voi Network Security, SOC va GRC.
- Cac truc nang cap 2.0: SOC operations, security engineering, GRC/compliance, market/ecosystem.
- Capstone nen co learning path, forensic analysis, academy/certification, reward/gamification.

## DEEPFENSE Academy

Y tuong tong: bien DEEPFENSE thanh nen tang dao tao va chung nhan, tuong tu tinh than Cisco/CCNA nhung tap trung vao deepfake awareness va security.

### Certification program du kien

- Level 1: `DEEPFENSE AWARE` / basics, 8-10 gio, tap trung visual artifact awareness, pass 70% quiz + 70% capstone, certificate 2 nam.
- Level 2: `DEEPFENSE FORENSIC ANALYST`, 10-12 gio, yeu cau Level 1, metadata, evidence chain, attribution, incident response, pass 75%, certificate 2 nam.
- Level 3: `DEEPFENSE SECURITY EXPERT`, 12-15 gio, yeu cau Level 2, detection tech, organizational defense, legal/ethics, research trends, pass 80% + advanced challenges, certificate 3 nam.

### Implementation strategy

- Khong can san xuat toan bo video content ngay cho capstone.
- Nen xay duoc ha tang platform day du: course, progress, quiz, certificate generation, verification, grading.
- Co the tao 1 sample module that chi tiet de chung minh chat luong, cac module con lai document curriculum truoc.

## DEEPFENSE BASICS

Ten khoa hoc hien tai: `DEEPFENSE BASICS`.

Da tao prototype local tai `deepfense-basics-preview/` de mường tượng flow hoc tap:

- Intro/course overview.
- Pre-assessment 10 cau.
- Man cam on da dang ky.
- Module 1: `Deepfake la gi?`
- Scenario truoc module.
- 5 sub-sections, moi sub-section co asset placeholders va 3 cau hoi key.
- Quiz cuoi Module 1 gom 10 cau, giu nguyen ngan hang cau hoi nhung random thu tu cau hoi/dap an.
- Anti-cheat preview: chong copy van ban va canh bao tab switching.

Muc tieu: khoa hoc co ban cho moi lua tuoi nhung van co tinh hoc thuat. Sau khi hoc xong, nguoi dung hieu:

- Deepfake la gi.
- Deepfake tac dong nhu the nao.
- Deepfake nguy hiem ra sao.
- Cach phong ngua co ban.
- Cac khoa sau se di sau hon ve qua trinh hinh thanh, qua trinh tao ra, nhan biet bang may hoc, forensic nang cao.

Khong can tao cau hoi quiz luc nay, truoc mat can muc luc/chuong trinh chi tiet.

### Cau truc tong quat

- 3 phan chinh:
  - `FUNDAMENTALS` 3-4 gio: hieu deepfake la gi, tac dong, nguy hiem.
  - `RECOGNITION` 3-4 gio: nhan biet visual/audio/behavioral artifacts.
  - `PREVENTION & RESPONSE` 2-3 gio: phong ngua va ung pho.
- Tong: 9 modules + 3 mid-term tests + 1 final exam 50 cau.
- Moi module co:
  - vi tri dat video lecture,
  - vi tri dat hinh anh minh hoa,
  - text/interactive content,
  - quiz 8-10 cau o cuoi module.
- Dau Phan I nen co pre-assessment nho 10 cau de do nang luc dau vao, khong nen dung de danh rot.
- Sau pre-assessment co man cam on da dang ky vao hoc, gioi thieu ngan ve lo trinh va gia tri cua `DEEPFENSE BASICS`.
- Truoc moi module nen co mot kich ban dat van de ngan, lay cam hung tu Cisco/CCNA, de dua nguoi hoc vao tinh huong thuc te truoc khi hoc ly thuyet.
- Sau moi muc hoc cap `1.1`, `1.2`, `1.3` trong module co 3 cau trac nghiem nhanh de nam key knowledge.
- Cac muc con cap `1.1.1`, `1.1.2`, ... la raw lesson content/giao an chi tiet: co the gom video, anh, text, vi du, hoat dong tuong tac, nhung khong dat quiz rieng sau tung muc con.
- Cac cau trac nghiem nho sau muc cap `1.1`, `1.2`, `1.3` giu nguyen noi dung; khong can random/change cau hoi.
- Quiz cuoi module lon giu nguyen ngan hang cau hoi, chi random/doi thu tu cau hoi va dap an khi lam bai.
- Sau moi 3 module lon co 1 bai kiem tra trung binh 20-30 cau.
- Final exam la 3 bai kiem tra thay phien/random. Tong ngan hang 150 cau, moi lan hoc vien nhan 1 de 50 cau.

### Exam rules

- Final exam neu sai/rot se bi khoa theo cap:
  - lan 1: 1 gio,
  - lan 2: 24 gio,
  - lan 3: 3 ngay,
  - lan 4: 1 tuan,
  - sau do reset, khong khoa vinh vien.
- Anti-cheat chi la mot tinh nang trong chuong trinh, chua phai trong tam luc nay.
- Anti-cheat y tuong: tab switching detection, randomization, time limit, no copy-paste/chong copy van ban.

## UI/UX direction

- Lay cam hung tu Cisco/CCNA ve cau truc hoc, scenario-led learning va assessment flow.
- Giao dien nen hien dai hon Cisco mot chut, nhung van don gian, sach, de nhin, de doc va khong gay roi.
- Uu tien trai nghiem hoc tap ro rang: module roadmap, progress, scenario card, video/image area, text content, quick questions, quiz, certificate progress.
- Khong nen qua mau me hay qua marketing; can cam giac nghiem tuc, hoc thuat, security-focused va than thien voi nguoi moi.

### Certificate & rewards

- Hoan thanh `DEEPFENSE BASICS` nhan `DEEPFENSE AWARE` certificate.
- Certificate co the share len LinkedIn.
- Hoan thanh co the nhan 500 DPF tokens.
- Hoan thanh co the unlock intermediate course.

### Detail da thong nhat cho Phan I

Phan I co 3 modules:

#### Module 1: Deepfake la gi?

Muc tieu hoc tap:

- Hieu deepfake theo cach co ban nhung dung hoc thuat.
- Phan biet deepfake voi chinh sua noi dung thong thuong.
- Hieu vai tro cua AI/hoc may/AI tao sinh trong qua trinh tao noi dung gia mao.
- Goi ten duoc cac dang deepfake pho bien.
- Nhan thuc duoc vi sao deepfake la van de an toan thong tin, khong chi la van de hinh anh/video.

Kich ban dat van de truoc module:

- Hoc vien thay mot video nguoi noi tieng phat ngon gay soc dang lan truyen tren mang xa hoi.
- Nhieu nguoi chia se lai, binh luan cang thang, mot vai trang tin nho dang lai.
- Cau hoi mo dau: "Ban co nen tin va chia se ngay khong? Neu nghi ngo la deepfake, ban se bat dau kiem tra tu dau?"

##### 1.1 Gioi thieu va dinh nghia

Muc tieu cua muc 1.1:

- Tao nen tang khai niem cho toan bo khoa hoc.
- Giup hoc vien hieu deepfake la mot dang synthetic media/noi dung tong hop, co the tac dong den niem tin, danh tinh va quyet dinh cua con nguoi.
- Dat ranh gioi giua "noi dung bi chinh sua" va "noi dung duoc tao/gia mao bang AI".

###### 1.1.1 Gioi thieu van de deepfake

Noi dung can co:

- Vi sao deepfake tro thanh van de trong thoi dai AI tao sinh.
- Deepfake xuat hien trong cac moi truong nao: mang xa hoi, tin tuc, cuoc goi video, am thanh, anh ca nhan.
- Deepfake khong chi lien quan den nguoi noi tieng; nguoi binh thuong, hoc sinh, nhan vien, doanh nghiep deu co the bi anh huong.
- Khai niem niem tin so: nguoi dung thuong tin vao hinh anh/video/am thanh vi chung "co ve that".
- Tam quan trong cua viec hoc deepfake basics truoc khi hoc cac ky thuat nhan dien nang cao.

Hoc lieu nen co:

- Video tieng Viet, phu de tieng Anh.
- Hinh anh minh hoa mot dong thong tin lan truyen tren mang.
- Scenario card: "Mot video viral co phai bang chung tuyet doi khong?"

Ghi chu giao an:

- `1.1.1` la kien thuc raw, khong co quiz rieng.
- Noi dung co the trinh bay bang video, anh mo ta, text ngan, scenario card va vi du minh hoa.

###### 1.1.2 Dinh nghia deepfake

Noi dung can co:

- Dinh nghia ngan gon: deepfake la noi dung hinh anh, video hoac am thanh duoc tao, bien doi hoac tong hop bang AI de lam nguoi xem/nghe tin rang mot nguoi da noi/lam dieu nao do.
- Dinh nghia hoc thuat mo rong: deepfake la mot dang synthetic media su dung cac ky thuat hoc may/deep learning de mo phong danh tinh, khuon mat, giong noi, bieu cam hoac hanh vi.
- Giai thich thanh phan cua dinh nghia:
  - `noi dung`: video, anh, am thanh, livestream, avatar.
  - `gia mao/tong hop`: khong nhat thiet 100% gia; co the la noi dung that bi bien doi.
  - `AI/hoc may`: cong nghe tao ra hoac dieu khien noi dung.
  - `danh tinh`: nguoi bi mo phong, bi gan loi noi/hanh dong.
  - `ngu canh`: noi dung co the nguy hiem hon khi gan voi su kien, thoi diem, nguoi noi tieng, doanh nghiep.
- Phan biet:
  - chinh sua anh/video thong thuong,
  - cat ghep thu cong,
  - filter/beauty app,
  - synthetic media,
  - deepfake.

Hoc lieu nen co:

- Bang so sanh "editing thuong" vs "AI-generated manipulation" vs "deepfake".
- Vi du minh hoa nhung khong huong dan tao deepfake.
- Glossary nho: synthetic media, generative AI, identity manipulation.

Ghi chu giao an:

- `1.1.2` la kien thuc raw, khong co quiz rieng.
- Nen co bang so sanh va vi du minh hoa de hoc vien hieu ro dinh nghia.

###### 1.1.3 Deepfake va AI tao sinh

Noi dung can co:

- Gioi thieu muc co ban ve AI tao sinh: mo hinh hoc tu du lieu mau de tao dau ra moi.
- Vai tro cua du lieu huan luyen: hinh anh, video, giong noi, bieu cam.
- Giai thich don gian ve "mau hinh" ma AI hoc duoc: khuon mat, anh sang, chuyen dong moi, am sac giong noi.
- Vi sao AI co the tao noi dung trong rat that nhung van co loi.
- Gioi han can giu: khong day cach tao deepfake chi tiet trong khoa basics.

Hoc lieu nen co:

- Infographic: du lieu mau -> mo hinh -> noi dung tong hop -> nguoi xem kiem chung.
- Video tieng Viet, phu de tieng Anh.
- Hinh minh hoa pipeline don gian, khong dua tool tao deepfake cu the.

Ghi chu giao an:

- `1.1.3` la kien thuc raw, khong co quiz rieng.
- Nen giai thich o muc nhap mon, khong day cach tao deepfake.

###### 1.1.4 Cac dang deepfake pho bien

Noi dung can co:

- Face Swap: thay khuon mat nguoi nay bang nguoi khac.
- Face Reenactment/Expression Manipulation: dieu khien bieu cam, mieng, huong mat, chuyen dong khuon mat.
- Voice Deepfake/Voice Cloning: gia lap giong noi cua mot nguoi.
- Full-body/Avatar Deepfake: mo phong than nguoi, dang di, cu chi, avatar ao.
- Text-to-video hoac AI video generation: tao canh/video moi tu prompt, co the ket hop voi gia mao danh tinh.
- Muc dich cua viec phan loai: moi dang co rui ro va dau hieu nhan dien khac nhau.

Hoc lieu nen co:

- Bang so sanh cac dang deepfake theo dau vao, dau ra, rui ro, dau hieu nghi ngo.
- Hinh minh hoa an toan, khong dung noi dung nhay cam.
- Audio sample hop phap/duoc tao rieng cho minh hoa voice deepfake.

Ghi chu giao an:

- `1.1.4` la kien thuc raw, khong co quiz rieng.
- Nen dung bang so sanh, video/anh/audio minh hoa an toan va khong nhay cam.

###### 1.1.5 Pham vi va gioi han cua khoa basics

Noi dung can co:

- Khoa basics tap trung vao nhan thuc, nhan dien co ban, phong ngua va ung pho.
- Khoa basics khong day tao deepfake, khong day bypass detector, khong di sau vao mo hinh may hoc.
- Cac khoa sau co the nang cao hon:
  - qua trinh hinh thanh deepfake theo huong hoc thuat,
  - forensic analysis,
  - machine learning-based detection,
  - chain of custody,
  - SOC/GRC response.
- Quy tac hoc tap an toan: hoc de bao ve ban than, cong dong va to chuc.

Hoc lieu nen co:

- Learning contract/ethics note.
- Roadmap tu Basics -> Forensic Analyst -> Security Expert.
- Checklist "hoc xong module 1 ban nen nam gi".

Ghi chu giao an:

- `1.1.5` la kien thuc raw, khong co quiz rieng.
- Ket thuc `1.1` moi co checkpoint 3 cau trac nghiem nam key cho toan bo muc `1.1`.

Cuoi 1.1:

- 3 cau trac nghiem nam key, bao phu cac y: vi sao deepfake la van de, dinh nghia deepfake, phan biet deepfake voi chinh sua thong thuong, AI tao sinh o muc co ban, cac dang deepfake pho bien.

##### 1.2 Tac dong cua deepfake

Muc tieu cua muc 1.2:

- Hieu deepfake tac dong den ca nhan, to chuc va xa hoi.
- Phan tich tac dong theo linh vuc: chinh tri, tai chinh, quyen rieng tu, giao duc, giai tri, doanh nghiep.
- Nhan ra deepfake la rui ro ve niem tin, danh tieng, tai chinh, phap ly va tam ly.

Goi y mo rong chi tiet sau:

- 1.2.1 Tac dong tong quat den niem tin so.
- 1.2.2 Tac dong den ca nhan: danh du, quyen rieng tu, tam ly.
- 1.2.3 Tac dong den doanh nghiep: lua dao CEO, social engineering, brand damage.
- 1.2.4 Tac dong den xa hoi: tin gia, thao tung du luan, khung hoang niem tin.
- 1.2.5 Thong ke, xu huong va case studies an toan.

Moi muc con `1.2.x` la raw lesson content, khong co quiz rieng. Cuoi `1.2` moi co checkpoint 3 cau trac nghiem nam key cho toan bo muc `1.2`.

##### 1.3 Rui ro va tu duy phong ve ban dau

Muc tieu cua muc 1.3:

- Nhan dien cac nhom rui ro co ban do deepfake gay ra.
- Hieu cach tiep can phong ve: khong hoang mang, khong ket luan voi, luu bang chung, xac minh nguon.
- Lien ket voi cac khoa nang cao ve forensics, SOC va GRC sau nay.

Goi y mo rong chi tiet sau:

- 1.3.1 Rui ro ca nhan: sextortion, danh tieng, gia mao danh tinh.
- 1.3.2 Rui ro to chuc: lua dao noi bo, gia mao lanh dao, khung hoang truyen thong.
- 1.3.3 Rui ro xa hoi: epistemic crisis, thao tung chinh tri, chien tranh thong tin.
- 1.3.4 He qua phap ly va dao duc: Viet Nam, EU, US o muc tong quan.
- 1.3.5 Nguyen tac ung pho ban dau: pause, verify, preserve, report.

Moi muc con `1.3.x` la raw lesson content, khong co quiz rieng. Cuoi `1.3` moi co checkpoint 3 cau trac nghiem nam key cho toan bo muc `1.3`.

Moi sub-section nen co:

- Video location/path.
- Image location/path.
- Audio files neu co vi du voice.
- Infographics/charts.
- Text explanations.
- Interactive exercises.
- 3 cau trac nghiem nhanh sau muc cap `1.1`, `1.2`, `1.3` de chot key knowledge.
- Muc con cap `1.1.1`, `1.1.2`, ... chi la giao an/raw lesson content: video, anh, audio neu can, infographic, text explanation, vi du, hoat dong tuong tac.
- Quiz chinh van nam o cuoi module lon.

## DPF token/reward context

- Coin cua web la `DPF`, khong phai DFS.
- User da deploy va verify contract DPF tren Polygon Amoy testnet.
- Tong cung da nhac: `2104000000`.
- Amoy la testnet: dung tot cho capstone demo, khong co gia tri that.
- Huong nen lam bay gio: tich hop DPF vao DEEPFENSE platform de user thay duoc earn/spend:
  - user pass challenge/course -> nhan DPF,
  - user xem DPF balance trong profile,
  - user spend DPF trong shop de unlock premium content/badge/certificate frame/donate.
- Mainnet de sau tot nghiep neu can; capstone nen giu testnet de an toan va it ton chi phi.
