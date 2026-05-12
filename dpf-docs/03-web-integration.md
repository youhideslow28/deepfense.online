# 03. Web Integration

## Muc tieu

Nhung DPF vao website Deepfense de nguoi dung co the:

- Dang nhap bang Gmail/tai khoan web.
- Xem so du DPF web.
- Lam thu thach va kich ban mo phong lua dao de nhan DPF.
- Dung DPF web de mo khoa mot so khoa hoc/lab nang cao.
- Nhan huy hieu, leaderboard va certificate.
- Tuy chon lien ket MetaMask tren Polygon Amoy.
- Rut DPF web sang DPF on-chain khi co nhu cau.

## Nguyen tac tich hop

- Auth web luon di truoc wallet. User phai co tai khoan truoc khi lien ket vi.
- MetaMask khong bat buoc cho nguoi dung pho thong.
- DPF web/off-chain la nguon trai nghiem chinh.
- DPF on-chain la lop nang cao, dung de rut token hoac verify so du Web3.
- Moi cong/tru so du phai ghi vao ledger.
- Private key admin/reward wallet chi nam tren server.

## Stack de xuat

- Frontend: website Deepfense hien tai tren Vercel.
- Auth/admin: Firebase Auth.
- Database: Firestore.
- Storage certificate: Firebase Storage hoac Supabase Storage.
- Web3 library: `ethers.js` hoac `wagmi`.
- Chain: Polygon Amoy testnet.
- Contract: ERC-20 DPF tai `0xFB5605c397257267C6E90C6224D5F4826A4A742D`.
- Backend: Firebase Functions hoac Vercel Serverless API.

## Luong dang nhap va lien ket vi

1. User dang nhap bang Gmail/tai khoan web.
2. Web tao/lay profile `users/{uid}`.
3. User bam Connect MetaMask neu muon dung Web3.
4. Frontend yeu cau MetaMask chuyen sang Polygon Amoy.
5. Frontend lay wallet address va gui len backend.
6. Backend luu `walletAddress`, `walletLinkedAt`, `walletNetwork`.
7. Frontend doc `balanceOf(walletAddress)` va hien so du on-chain ben canh so du web.

Neu user khong ket noi vi, web van hien DPF web va van cho unlock bang DPF web.

## Doc so du on-chain

Frontend chi duoc goi cac ham read-only:

- `name()`
- `symbol()`
- `decimals()`
- `balanceOf(walletAddress)`

Khong co private key nao o frontend. Moi hanh dong transfer token tu vi admin/reward wallet phai di qua backend hoac admin ky thu cong.

## Database schema de xuat

### `users`

- `uid`
- `email`
- `displayName`
- `photoURL`
- `role`: `user`, `admin`
- `walletAddress`
- `walletLinkedAt`
- `webBalance`
- `earnedBalance`
- `bonusBalance`
- `spentBalance`
- `pendingWithdrawal`
- `withdrawnBalance`
- `onchainSyncedBalance`
- `badges`
- `createdAt`
- `updatedAt`

### `dpf_ledger`

- `id`
- `uid`
- `direction`: `credit`, `debit`
- `source`: `course`, `simulator`, `challenge`, `certificate`, `admin_bonus`, `unlock`, `withdrawal`, `sync`
- `amount`
- `balanceBefore`
- `balanceAfter`
- `status`: `pending`, `confirmed`, `failed`, `cancelled`
- `reason`
- `metadata`
- `idempotencyKey`
- `createdAt`
- `confirmedAt`

### `withdrawal_requests`

- `id`
- `uid`
- `walletAddress`
- `amount`
- `status`: `requested`, `admin_approved`, `processing`, `paid`, `rejected`, `failed`
- `reviewedBy`
- `reviewNote`
- `txHash`
- `createdAt`
- `reviewedAt`
- `paidAt`

### `unlocks`

- `id`
- `uid`
- `itemType`: `course`, `lab`, `case_study`, `certificate_upgrade`
- `itemId`
- `cost`
- `ledgerId`
- `unlockedAt`

### `wallet_sync_events`

- `id`
- `uid`
- `walletAddress`
- `onchainBalance`
- `contractAddress`
- `network`
- `syncedAt`

## Luong reward off-chain

1. User hoan thanh thu thach, quiz, simulator hoac certificate.
2. Frontend gui ket qua len backend.
3. Backend xac minh dieu kien: diem, thoi gian, quota, idempotency key.
4. Backend tao ban ghi `dpf_ledger` dang `credit`.
5. Backend cong `webBalance`.
6. Frontend hien lich su: `+20 DPF - Vuot qua kich ban lua dao Advanced`.

## Luong unlock bang DPF web

1. User chon khoa/lab can mo khoa.
2. Backend kiem tra user da dang nhap va `webBalance >= cost`.
3. Backend tao ledger `debit` voi source `unlock`.
4. Backend tru `webBalance`, cong `spentBalance`.
5. Backend tao ban ghi `unlocks`.
6. Frontend cap quyen truy cap vinh vien.

Unlock nen la mua vinh vien, khong phai thue theo thoi gian.

## Luong withdrawal ban dau: admin duyet thu cong

1. User dang nhap va lien ket MetaMask Amoy.
2. User tao request rut, toi thieu 100 DPF, toi da 1 lan/ngay.
3. Backend tru tam `webBalance` va cong `pendingWithdrawal`.
4. Admin xem request trong dashboard.
5. Admin chuyen DPF thu cong bang MetaMask hoac tool rieng.
6. Admin nhap `txHash`.
7. Backend cap nhat request thanh `paid`, tru `pendingWithdrawal`, cong `withdrawnBalance`.

Neu request bi tu choi, backend hoan DPF tu `pendingWithdrawal` ve `webBalance`.

## Luong withdrawal tu dong ve sau

1. Admin cau hinh reward wallet private key trong server environment variables.
2. Backend chi chap nhan request hop le da qua quota va risk check.
3. Backend goi `transfer(userWallet, amount)` tren DPF contract.
4. Backend luu `txHash`, block explorer URL va status.
5. Neu giao dich fail, request chuyen `failed` va co co che retry/hoan so du.

Can co daily cap cho vi reward de neu backend loi thi thiet hai bi gioi han.

## Sync DPF on-chain de unlock

Viec admin gui DPF on-chain truc tiep cho user co the duoc web nhan dien bang cach:

1. User lien ket wallet voi tai khoan.
2. Frontend/backend doc `balanceOf(walletAddress)`.
3. Backend luu `onchainSyncedBalance`.
4. Khi user unlock, he thong co the cho phep dung:
   - DPF web truoc.
   - Neu thieu, user co the nap/convert DPF on-chain vao web trong phien ban sau.

Khuyen nghi MVP: chi doc va hien on-chain balance, chua tu dong tru token on-chain de unlock. Phien ban sau co the them `deposit` hoac `permit/transferFrom` neu can.

## Bao mat

- Moi endpoint reward/unlock/withdrawal phai kiem tra auth token.
- Moi reward co idempotency key: `uid:activityType:activityId:season`.
- Khong tin diem so gui tu frontend neu backend co the tu tinh lai.
- Withdrawal can kiem tra wallet da lien ket voi user.
- Admin actions phai ghi `reviewedBy`, `reason`, `ip/userAgent` neu co.
- Khong luu private key trong Firestore, frontend, repo hay localStorage.
