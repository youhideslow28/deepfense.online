# 04. Reward System

## Muc tieu

He thong reward phai bien DPF thanh thu co gia tri su dung trong Deepfense, khong chi la con so tren blockchain. User can cam thay minh dang tich luy tien trinh hoc tap, mo khoa ky nang va nhan duoc cong nhan ro rang.

DPF nen duoc tra cho cac hanh vi co ich:

- Lam thu thach nhan dien lua dao.
- Vuot qua kich ban trong tab Mo phong lua dao.
- Hoan thanh bai hoc, quiz va bai tap nho.
- Dat nguong diem de nhan certificate.
- Dong gop du lieu/phan hoi co gia tri cho he thong.

## Nguyen tac reward

- Chi user da dang nhap moi duoc nhan DPF.
- Wallet khong bat buoc khi nhan DPF web.
- Reward phai duoc backend xac minh.
- Moi reward chi claim mot lan theo idempotency key.
- Mot so hoat dong co the lam lai de lay du lieu, nhung reward phai co gioi han/ngay.
- Hoan thanh Basic co thuong, nhung chua du de mo Advanced full.
- Reward nen giam theo season khi he thong lon hon.

## Loai reward

| Loai | Mo ta | Co lap lai? |
| --- | --- | --- |
| `course_completion` | Hoan thanh module/khoa | Khong |
| `quiz_pass` | Dat nguong quiz | Co, nhung chi thuong lan dau hoac theo season |
| `simulator_pass` | Vuot kich ban lua dao | Co gioi han |
| `challenge_pass` | Bai tap nho/mini-game/case | Co gioi han |
| `certificate_issued` | Du dieu kien cap chung chi | Khong |
| `admin_bonus` | Admin cap xu/campaign/hoc bong | Theo admin |
| `data_contribution` | Bao cao, gop y, gan nhan mau du lieu | Can duyet/risk check |

## Bang reward de xuat

| Hoat dong | Dieu kien | Reward |
| --- | --- | ---: |
| Hoan thanh 1 bai hoc Basic | Checkpoint hop le | 5 DPF |
| Quiz Basic | >= 70 diem | 15 DPF |
| Kich ban lua dao Basic | >= 70 diem va trong thoi gian yeu cau | 10 DPF |
| Kich ban lua dao Advanced | >= 75 diem va trong thoi gian yeu cau | 20 DPF |
| Kich ban lua dao Expert | >= 80 diem va trong thoi gian yeu cau | 40 DPF |
| Hoan thanh Basic | Pass final | 50 DPF |
| Certificate Basic | Du dieu kien cap | 30 DPF |
| Hoan thanh Advanced | Pass final/lab | 150 DPF |
| Certificate Advanced | Du dieu kien cap | 80 DPF |
| Certificate Expert | Du dieu kien capstone | 200 DPF |

## Quota chong spam

| Hoat dong | Gioi han |
| --- | --- |
| Simulator Basic | 3 reward/ngay |
| Simulator Advanced | 2 reward/ngay |
| Simulator Expert | 1 reward/ngay |
| Challenge nho | 3 reward/ngay |
| Quiz cung mot chuong | 1 reward/season |
| Course completion | 1 reward/khoa |
| Certificate | 1 reward/level |
| Withdrawal | 1 lan/ngay |

Co the cho user lam lai khong gioi han de luyen tap, nhung sau khi dat quota thi khong cong them DPF.

## Giam reward khi lam lai

Neu can thu thap data tu viec user lam lai kich ban, co the dung he so:

| Lan dat dieu kien trong 7 ngay | He so reward |
| --- | ---: |
| Lan 1 | 100% |
| Lan 2 | 30% |
| Lan 3 tro di | 0%, chi ghi nhan luyen tap/data |

Neu user lam mot kich ban bien the moi hoac season moi, co the reset reward.

## Dieu kien kich ban lua dao

Mot kich ban trong tab Mo phong lua dao nen co cac truong:

- `scenarioId`
- `level`: `basic`, `advanced`, `expert`
- `category`: `phishing_email`, `fake_login`, `romance_scam`, `investment_scam`, `deepfake_video`, `impersonation_chat`
- `minScore`
- `maxReward`
- `timeLimitSeconds`
- `dataQualityRequired`
- `rewardSeason`

Backend chi cong DPF neu:

- User da dang nhap.
- Scenario ton tai va dang active.
- Diem >= `minScore`.
- Thoi gian lam bai nam trong nguong hop ly.
- Chua vuot quota.
- Khong trung idempotency key.

## Leaderboard va bang vinh danh

Nen co hai loai bang xep hang:

1. Leaderboard theo DPF kiem duoc trong season.
2. Bang vinh danh theo certificate/huy hieu da dat.

Khong nen xep hang chi bang tong DPF hien co, vi user co the tieu DPF de unlock hoac rut ve vi. Nen dung `earnedBalance` hoac `seasonEarnedDpf`.

Leaderboard hien:

- Ten hien thi/avatar.
- Badge cao nhat: Basic, Advanced, Expert.
- Season DPF earned.
- So kich ban da vuot qua.
- Certificate link neu co.

## Unlock bang DPF

DPF dung de mo khoa mot so noi dung, khong khoa toan bo san pham.

| Noi dung | Cost | Ghi chu |
| --- | ---: | --- |
| Advanced starter pack | 250 DPF | User Basic can lam them thu thach moi du |
| Advanced full course | 600 DPF | Unlock vinh vien |
| 1 mini-lab Advanced | 80 DPF | Unlock vinh vien |
| Expert case study | 250 DPF | Unlock vinh vien |
| Certificate visual upgrade | 50 DPF | Khong bat buoc |

Quy tac tru so du:

1. Uu tien tru `webBalance`.
2. Neu ve sau ho tro deposit on-chain, user co the nap DPF on-chain vao web truoc khi unlock.
3. Da unlock thi giu quyen vinh vien.
4. Refund chi nen lam qua admin action co reason.

## Admin dashboard

Admin dashboard nen co cac module:

- Tong quan supply noi bo theo pool.
- Danh sach user va so du DPF.
- Reward ledger.
- Tao admin bonus.
- Tao/sua unlock cost.
- Duyet withdrawal.
- Nhap txHash cho giao dich thu cong.
- Xem risk flags: spam, multi-account, reward bat thuong.
- Quan ly certificate va leaderboard.

Admin bonus can co:

- `uid`
- `amount`
- `pool`
- `reason`
- `campaignId`
- `createdBy`
- `createdAt`

## Risk flag co ban

Nen canh bao admin khi:

- Mot user dat reward quota toi da nhieu ngay lien tiep.
- Nhieu account dung cung wallet.
- Nhieu account co hanh vi/cau tra loi trung bat thuong.
- User tao withdrawal ngay sau khi nhan admin bonus lon.
- Ket qua lam bai qua nhanh so voi thoi gian toi thieu hop ly.

## Lich su hien thi cho user

Khong nen hien ledger qua ky thuat. Nen hien don gian:

- `+10 DPF - Vuot qua kich ban Phishing Email Basic`
- `+50 DPF - Hoan thanh Deepfense Basic`
- `-250 DPF - Mo khoa Advanced Starter Pack`
- `-100 DPF - Yeu cau rut ve MetaMask`
- `Paid - Xem giao dich tren PolygonScan`

Voi on-chain transaction, hien link explorer khi co `txHash`.
