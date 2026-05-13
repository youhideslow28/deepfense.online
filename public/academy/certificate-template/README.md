# DEEPFENSE certificate template

Bo file nay la mau certificate mac dinh de sau nay render tu database nguoi dung.

## Files

- `certificate-template.html`: template HTML/CSS/JS, co truong nhap ten hien thi tren certificate va nut `Download PDF` bang print dialog.
- `certificate-data.example.json`: du lieu mau, dung lam schema mac dinh cho Firestore/API.

## Data fields

Nhung field nen luu trong database hoac tao tu backend:

- `recipientName`
- `courseName`
- `credentialName`
- `issuedDate`
- `certificateId`
- `verificationUrl`
- `rewardAmount`
- `rewardSymbol`
- `preferredName`
- `completionHours`
- `issuerName`
- `issuerRole`
- `signatureName`

## Cach noi voi database

Trong React/Firebase, lay document certificate cua user tu Firestore, sau do dua vao component:

```ts
type CertificateData = {
  recipientName: string;
  courseName: string;
  credentialName: string;
  issuedDate: string;
  certificateId: string;
  verificationUrl: string;
  rewardAmount: number;
  rewardSymbol: "DPF coin";
  issuerName: string;
  issuerRole: string;
  signatureName: string;
};
```

Nen tao `certificateId` o backend/cloud function de tranh user tu sua ID.

## Chu ky va con dau

Cho capstone/demo, co the dung chu ky cua web:

- `signatureName`: `Deepfense.online`
- `issuerName`: `Deepfense.online Academic Board`
- `issuerRole`: `Authorized Issuer`

Neu muon nghiem tuc hon khi public/doi tac, nen co mot ca nhan dai dien ky:

- founder/project lead,
- academic advisor,
- program director,
- security training lead.

Cach tot nhat la dung ca hai: chu ky ca nhan + dau verified cua `Deepfense.online`.

## PDF

Mo `certificate-template.html` tren trinh duyet, bam `Export PDF`, chon `Save as PDF`.
Trong app thuc te co the dung browser print, `html2pdf`, hoac backend renderer nhu Playwright/Puppeteer.
