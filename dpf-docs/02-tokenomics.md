# 02. Tokenomics

## Thong tin token

- Name: Deepfense Network
- Symbol: DPF
- Total supply: 2,014,000,000 DPF
- Network: Polygon Amoy testnet
- Contract: `0xFB5605c397257267C6E90C6224D5F4826A4A742D`
- Ty le quy doi noi bo: `1 web DPF = 1 on-chain DPF`

Tong cung 2.014 ty DPF lay y nghia tu nam 2014, gan voi su phat trien cua GAN va nen tang cong nghe deepfake hien dai.

## Phan bo quy de xuat

Vi admin hien giu 100% supply, nen can tach supply thanh cac quy logic trong tai lieu va dashboard de tranh phan phoi qua tay.

| Quy | Ty le | So luong | Muc dich |
| --- | ---: | ---: | --- |
| Learning Rewards | 35% | 704,900,000 DPF | Thuong khoa hoc, quiz, simulator, certificate |
| Challenge & Data Pool | 20% | 402,800,000 DPF | Thuong kich ban lua dao, thu thach lap lai co kiem soat, dong gop du lieu |
| Ecosystem Unlock Reserve | 20% | 402,800,000 DPF | Bao dam thanh khoan noi bo cho unlock, campaign, partner |
| Web3 Experience Pool | 10% | 201,400,000 DPF | Withdrawal Amoy, thu nghiem vi, su kien Web3 |
| Admin Campaign & Scholarship | 10% | 201,400,000 DPF | Cap token cho user, mentor, bug bounty, hoc bong |
| Operation & Development | 5% | 100,700,000 DPF | Van hanh, test, treasury dai han |

Day la phan bo noi bo, khong can deploy lai contract. Dashboard admin nen hien cac pool nay nhu han muc ke toan.

## So du nen phan biet

Nen phan biet cac loai so du de he thong ben vung:

| Truong | Y nghia |
| --- | --- |
| `webBalance` | DPF kha dung trong web de unlock |
| `earnedBalance` | Tong DPF kiem duoc tu hoc tap/thu thach |
| `bonusBalance` | DPF admin/campaign cap |
| `spentBalance` | DPF da dung de unlock |
| `pendingWithdrawal` | DPF dang cho rut |
| `withdrawnBalance` | DPF da rut on-chain |
| `onchainSyncedBalance` | DPF on-chain da doc tu vi lien ket |

Khi unlock noi dung, mac dinh tru `webBalance`. Khi rut token, tru `webBalance` va tao `pendingWithdrawal`. Sau khi tx thanh cong, chuyen sang `withdrawnBalance`.

## Chinh sach reward de xuat

Muc tieu: hoan thanh Basic co thuong dang ke, nhung chua du mo khoa Advanced. User phai lam them simulator/thu thach de co du DPF.

### Reward Basic

| Hoat dong | Dieu kien | Reward |
| --- | --- | ---: |
| Hoan thanh module nhap mon | Xem/doc va pass check nho | 10 DPF |
| Quiz chuong | Diem >= 70% | 15 DPF |
| Thu thach nhan dien link/email | Diem >= 70% | 20 DPF |
| Vuot qua 1 kich ban lua dao Basic | Dung nguong diem va thoi gian | 25 DPF |
| Hoan thanh khoa Basic | Pass final | 50 DPF |
| Nhan certificate Basic | Du dieu kien cap | 30 DPF |
| Tong Basic uoc tinh |  | 150 DPF |

### Unlock cost de xuat

| Noi dung | Cost |
| --- | ---: |
| Advanced starter pack | 250 DPF |
| 1 mini-lab Advanced | 80 DPF |
| Advanced full course | 600 DPF |
| Expert case study | 250 DPF |
| Certificate visual upgrade | 50 DPF |

Voi cach nay, user hoan thanh Basic nhan khoang 150 DPF, van can lam them simulator/thu thach de mo Advanced starter pack 250 DPF.

## Reward cho Mo phong lua dao

| Cap do | Dieu kien | Reward co ban | Gioi han |
| --- | --- | ---: | --- |
| Basic | >= 70 diem | 10 DPF | 3 lan/ngay |
| Advanced | >= 75 diem | 20 DPF | 2 lan/ngay |
| Expert | >= 80 diem | 40 DPF | 1 lan/ngay |

Neu user lam lai cung mot kich ban, reward giam:

- Lan dau dat dieu kien: 100% reward.
- Lan thu 2 trong 7 ngay: 30% reward.
- Tu lan thu 3 trong 7 ngay: khong thuong, chi ghi nhan du lieu/luyen tap.

## Chinh sach giam phat va duy tri dai han

Co the ap dung reward season thay vi halving cung nhac:

| Season | Dieu kien | He so reward |
| --- | --- | ---: |
| Genesis | 10,000 user dau tien | 100% |
| Growth | User 10,001 den 50,000 | 70% |
| Scale | User 50,001 den 200,000 | 50% |
| Mature | Sau 200,000 user | 30% hoac theo quy con lai |

Ngoai moc user, dashboard nen co canh bao neu `Learning Rewards` da dung qua 25%, 50%, 75% de admin dieu chinh reward/cost.

## Withdrawal policy de xuat

- Rut token la tuy chon, khong bat buoc.
- User phai dang nhap web va lien ket MetaMask tren Polygon Amoy.
- Ti le rut mac dinh: 1 web DPF = 1 on-chain DPF.
- Gioi han rut: 1 lan/ngay/user.
- Muc rut toi thieu de tranh spam: 100 DPF.
- Muc rut toi da giai doan test: 1,000 DPF/ngay/user.
- Giai doan dau: admin duyet thu cong.
- Giai doan sau: backend tu dong transfer tu reward wallet.
- Gas: neu admin/reward wallet la nguoi transfer, he thong tra gas. Neu thiet ke claim contract ve sau, user co the tu tra gas.

## Chinh sach chong dau co

- Khong tao liquidity pool.
- Khong khuyen khich mua ban DPF.
- Khong truyen thong DPF nhu tai san tang gia.
- Neu can, co the dung blacklist/router guard trong phien ban contract sau.
- DPF nen duoc coi la reward/utility token trong moi tai lieu public.
