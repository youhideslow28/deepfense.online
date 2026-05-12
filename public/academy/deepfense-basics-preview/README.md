# DEEPFENSE BASICS preview

Prototype tinh cho flow hoc tap `DEEPFENSE BASICS`.

## Chay local

Neu server 8765 dang chay tu thu muc goc workspace:

```txt
http://127.0.0.1:8765/deepfense-basics-preview/index.html
```

Neu can chay lai:

```powershell
python -m http.server 8765 --bind 127.0.0.1
```

## Sua o dau?

- `index.html`: cau truc man hinh va cac section chinh.
- `styles.css`: giao dien, mau sac, layout.
- `script.js`: noi dung pretest, noi dung Module 1, quick questions, quiz cuoi module, random quiz va anti-cheat preview.

## Flow hien tai

1. Intro/course overview.
2. Pre-assessment 10 cau.
3. Man cam on da dang ky.
4. Module 1: `Deepfake la gi?`
5. 5 sub-sections:
   - `1.1.1` Gioi thieu va dinh nghia
   - `1.1.2` Khai niem AI co ban
   - `1.1.3` Ba dang deepfake pho bien
   - `1.1.4` Lich su va case studies
   - `1.1.5` Tom tat va key takeaways
6. Quiz cuoi Module 1: 10 cau, random thu tu cau hoi va dap an.

## Ghi chu de dua vao React/Firebase sau nay

- Chuyen arrays trong `script.js` thanh Firestore collections/documents:
  - `courses`
  - `modules`
  - `subsections`
  - `questions`
  - `attempts`
- Anti-cheat hien tai moi la preview frontend. Ban production can ghi log vao database:
  - `copy_blocked`
  - `visibility_changed`
  - `quiz_started`
  - `quiz_submitted`
  - `question_order_seed`

