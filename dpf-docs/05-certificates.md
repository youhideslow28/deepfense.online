# 05. Certificates

## Muc tieu

Deepfense can mot he thong chung chi nghiem tuc, co the verify, co lien ket doc nhat va gan voi thanh tich hoc tap cua nguoi dung. Certificate la phan thuong tinh than quan trong ben canh DPF.

Certificate khong nen chi la PDF tinh. Moi chung chi nen co:

- Certificate ID doc nhat.
- Link verify public.
- QR code.
- Cap do ro rang.
- Dieu kien cap minh bach.
- Huy hieu hien tren profile.
- Reward DPF khi hoan thanh.

## Ba cap chung chi

### 1. Deepfense Basic Awareness

- Doi tuong: nguoi dung pho thong, hoc sinh, sinh vien khong chuyen IT.
- Muc tieu: nhan dien lua dao, deepfake va rui ro social engineering co ban.
- Bai tap: quiz, chon dau hieu bat thuong, kich ban phishing/email/fake login.
- Dieu kien cap:
  - Hoan thanh khoa Basic.
  - Diem final >= 70.
  - Vuot it nhat 1 thu thach >= 70 diem.
  - Vuot it nhat 1 kich ban mo phong trong thoi gian yeu cau.
- Reward de xuat: 30 DPF khi cap certificate, ngoai reward khoa hoc.

### 2. Deepfense Advanced Analyst

- Doi tuong: sinh vien IT, nguoi quan tam phan tich ky thuat, creator can tu bao ve tai khoan.
- Muc tieu: phan tich metadata, audio, spectrogram, dau vet chinh sua va hanh vi lua dao phuc tap.
- Bai tap: mini-lab, case study, simulator Advanced.
- Dieu kien cap:
  - Da co Basic hoac unlock Advanced.
  - Hoan thanh Advanced course/lab.
  - Diem final >= 75.
  - Vuot it nhat 2 kich ban Advanced.
- Reward de xuat: 80 DPF.

### 3. Deepfense Forensic Expert

- Doi tuong: nguoi muon tiep can chuan Blue Team/SOC, dieu tra noi dung lua dao/deepfake.
- Muc tieu: dieu tra su co theo quy trinh, viet report, phan tich bang chung.
- Bai tap: capstone, incident ticket, video/audio/metadata, bao cao cuoi.
- Dieu kien cap:
  - Da co Advanced.
  - Hoan thanh capstone.
  - Diem report >= 80.
  - Vuot it nhat 1 kich ban Expert.
- Reward de xuat: 200 DPF.

## Certificate ID va link doc nhat

Moi certificate can co ID doc nhat de chong gia mao:

`DPF-CERT-[LEVEL]-[YYYY]-[SHORT_UID]-[RANDOM]`

Vi du:

`DPF-CERT-BASIC-2026-A91F-7KQ2`

Link verify:

`https://deepfense.online/verify/[certificateId]`

Trang verify nen hien:

- Trang thai hop le/khong hop le.
- Ten nguoi nhan.
- Cap chung chi.
- Ngay cap.
- Diem tong quan neu muon public.
- Badge level.
- TxHash reward neu da rut/tra on-chain.
- QR code hoac ma verify.

## Noi dung PDF chung chi

PDF nen co:

- Logo Deepfense.
- Ten nguoi nhan.
- Ten chung chi.
- Cap do chung chi.
- Mo ta ngan ve ky nang dat duoc.
- Ngay cap.
- Certificate ID.
- QR code verify.
- Chu ky dien tu founder/admin.
- Huy hieu level.
- Neu co on-chain reward: `txHash`.

Thiet ke nen tang dan theo level:

- Basic: sach, sang, de doc.
- Advanced: them chi tiet ky thuat, mau sac manh hon.
- Expert: trang trong, co cam giac forensic/SOC, co capstone/report summary.

## Database schema de xuat

### `certificates`

- `id`
- `certificateId`
- `uid`
- `level`: `basic`, `advanced`, `expert`
- `title`
- `holderName`
- `score`
- `requirements`
- `status`: `issued`, `revoked`
- `pdfUrl`
- `verifyUrl`
- `qrUrl`
- `rewardLedgerId`
- `txHash`
- `issuedAt`
- `revokedAt`
- `revokedReason`

## Reward certificate

Certificate nen duoc thuong DPF khi user hoan thanh, khong bat user tra phi de nhan chung chi co ban.

Co the co mot tuy chon nho:

- Certificate mac dinh: mien phi khi du dieu kien, co PDF va verify link.
- Certificate visual upgrade: ton 50 DPF, chi thay doi giao dien/huy hieu dep hon, khong thay doi gia tri hoc tap.

Dieu nay giu cong bang cho nguoi dung pho thong va van tao them utility cho DPF.

## Gan certificate vao leaderboard

Leaderboard nen lien ket certificate doc nhat:

- Khi user dat Basic, hien badge Basic tren profile.
- Khi dat Advanced/Expert, hien badge cao hon.
- Bang vinh danh nen co nut `Verify` tro den link certificate.
- DPF earned season va certificate level nen hien rieng de tranh nham lan giua hoc tap va so du.

## NFT/on-chain certificate ve sau

MVP chi can PDF + verify page. Neu ve sau muon Web3 hon, co the them:

- Mint NFT certificate tren testnet.
- Ghi hash certificate len chain.
- Luu metadata IPFS.

Khong nen lam NFT certificate truoc khi he thong PDF/verify va reward ledger on dinh.
