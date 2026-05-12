# 06. Roadmap

## Muc tieu tong the

Bien DPF thanh mot phuong tien trao doi noi bo cua Deepfense truoc, sau do moi mo rong sang Web3 automation. Roadmap uu tien trai nghiem hoc tap, reward, unlock va certificate hon la thi truong token.

## Phase 0: Chot nguyen tac va thong so

- Giu contract hien tai tren Polygon Amoy.
- Xac nhan contract: `0xFB5605c397257267C6E90C6224D5F4826A4A742D`.
- Giu total supply 2,014,000,000 DPF.
- Khong deploy lai neu khong can.
- Khong len mainnet chi vi logo token.
- Chot `1 web DPF = 1 on-chain DPF`.
- Chot DPF la utility/reward testnet, khong phai investment asset.

## Phase 1: DPF web/off-chain MVP

Muc tieu: user co the kiem va dung DPF trong web ma khong can vi crypto.

- Tao cac truong balance trong `users`.
- Tao `dpf_ledger`.
- Cong DPF khi user hoan thanh hoat dong hop le.
- Hien so du DPF web tren profile/dashboard.
- Hien lich su reward/debit cho user.
- Them idempotency key de chan claim lap.
- Them quota reward theo ngay.
- Them admin view de xem ledger.

Ket qua can dat: user dang nhap, lam nhiem vu, thay DPF tang trong web.

## Phase 2: Simulator reward va chong spam

Muc tieu: nhung DPF vao tab Mo phong lua dao.

- Gan reward vao kich ban Basic/Advanced/Expert.
- Moi scenario co `level`, `minScore`, `timeLimitSeconds`, `maxReward`.
- Gioi han reward/ngay:
  - Basic: 3 lan/ngay.
  - Advanced: 2 lan/ngay.
  - Expert: 1 lan/ngay.
- Giam reward khi lam lai cung scenario.
- Ghi nhan ket qua lam bai de phuc vu data/phan tich.
- Tao risk flags cho hanh vi spam.

Ket qua can dat: user co the lam simulator nhieu lan, nhung chi duoc thuong trong gioi han hop ly.

## Phase 3: Unlock bang DPF

Muc tieu: DPF co gia tri su dung ro rang trong web.

- Tao bang/cau truc `unlocks`.
- Tao danh sach noi dung co the mo khoa.
- Them cost cho Advanced starter pack, mini-lab, Advanced full course.
- Tru DPF web khi unlock.
- Quyen unlock la vinh vien.
- Hien noi dung mien phi va noi dung can DPF ro rang.
- Cho admin cap DPF bonus de user co the mo khoa noi dung.

Ket qua can dat: user hoan thanh Basic van chua du mo Advanced, can lam them thu thach de du DPF.

## Phase 4: Badges, leaderboard va certificate

Muc tieu: tang dong luc hoc tap va cong nhan thanh tich.

- Them badge Basic, Advanced, Expert tren profile.
- Tao leaderboard theo `seasonEarnedDpf`.
- Tao bang vinh danh certificate.
- Tao certificate ID doc nhat.
- Tao verify page: `/verify/[certificateId]`.
- Render PDF certificate.
- Luu PDF len Firebase Storage/Supabase Storage.
- Gan QR code vao PDF.

Ket qua can dat: user co certificate dep, verify duoc va co link doc nhat.

## Phase 5: MetaMask Amoy

Muc tieu: them trai nghiem Web3 tuy chon.

- Them nut Connect MetaMask.
- Yeu cau user dang nhap truoc khi lien ket vi.
- Kiem tra va goi y chuyen sang Polygon Amoy.
- Luu `walletAddress` vao profile.
- Doc DPF `balanceOf(walletAddress)`.
- Hien so du DPF web va DPF on-chain rieng nhau.
- Khong transfer token tu frontend.

Ket qua can dat: user Web3 thay so du token Amoy cua minh trong web.

## Phase 6: Withdrawal thu cong co dashboard

Muc tieu: cho phep rut DPF web sang DPF on-chain nhung van an toan trong giai doan test.

- Tao `withdrawal_requests`.
- Dieu kien:
  - Da dang nhap.
  - Da lien ket MetaMask Amoy.
  - Toi thieu 100 DPF.
  - Toi da 1 request/ngay.
- Khi request: tru tam `webBalance`, cong `pendingWithdrawal`.
- Admin dashboard hien danh sach request.
- Admin duyet/tu choi request.
- Admin gui token thu cong tu vi reward/admin.
- Admin nhap `txHash`.
- User xem link PolygonScan.

Ket qua can dat: co the rut token that tren Amoy ma chua can luu private key trong server.

## Phase 7: Withdrawal tu dong

Muc tieu: giam viec admin phai xu ly tay khi he thong da on dinh.

- Tao reward wallet rieng, khong dung vi chinh giu toan bo supply.
- Nap mot luong DPF va POL testnet vua du vao reward wallet.
- Luu private key reward wallet trong server environment variables.
- Them daily transfer cap.
- Backend goi `transfer(userWallet, amount)`.
- Tu dong luu `txHash`.
- Them retry/failed handling.
- Them alert neu reward wallet sap het DPF/POL.

Ket qua can dat: user tao request hop le va he thong tu dong gui DPF Amoy.

## Phase 8: On-chain sync/deposit nang cao

Muc tieu: ho tro user nhan DPF on-chain tu admin va dung trong web.

- Doc `balanceOf` dinh ky khi user lien ket wallet.
- Hien `onchainSyncedBalance`.
- Nghien cuu co che deposit DPF on-chain vao web:
  - User transfer DPF vao treasury/reward wallet.
  - Backend xac minh event Transfer.
  - Backend cong `webBalance`.
- Hoac dung `approve/transferFrom` ve sau.

MVP khong bat buoc phase nay, nhung day la cau tra loi cho viec admin gui token on-chain cho user truoc roi user van co the dung trong web ve sau.

## Phase 9: Mainnet sau cung

Chi can tinh mainnet khi:

- Reward policy da on dinh.
- Ledger va withdrawal da an toan.
- Certificate verify da chay tot.
- Co ngan sach gas va chinh sach phap ly ro rang.
- Co ly do that su de dua token ra moi truong san pham.

Hien tai uu tien dung Amoy testnet de hoc, test va chung minh utility.

## Checklist gan han

- [ ] Them DPF web balance vao user profile.
- [ ] Tao `dpf_ledger`.
- [ ] Gan reward vao tab Mo phong lua dao.
- [ ] Them quota reward/ngay.
- [ ] Tao unlock cost cho Advanced.
- [ ] Tao admin dashboard cho ledger va bonus.
- [ ] Tao certificate verify link.
- [ ] Them MetaMask Amoy.
- [ ] Tao withdrawal request thu cong.
- [ ] Tu dong hoa withdrawal khi MVP on dinh.
