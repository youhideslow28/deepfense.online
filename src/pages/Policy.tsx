import React from 'react';
import { Link } from 'react-router-dom';
import { Database, FileText, HelpCircle, Lock, Mail, Scale, ShieldCheck, UserCheck } from 'lucide-react';
import { Language } from '@/types';
import { PROJECT_METADATA } from '@/data';

interface PolicyProps {
  lang: Language;
}

const sections = [
  {
    id: 'privacy',
    icon: Lock,
    titleVi: 'Chinh sach bao mat va du lieu',
    titleEn: 'Privacy and Data Policy',
    bodyVi: [
      'Deepfense thu thap du lieu dung muc dich de van hanh academy, challenge, gamification, survey va Trung tam giup do.',
      'Du lieu co the gom email, ten hien thi, tien do hoc, ket qua challenge, cau tra loi survey, noi dung Help Center Case va mot so du lieu ky thuat nhu thoi gian truy cap, trinh duyet hoac log he thong.',
      'Deepfense khong ban du lieu ca nhan. Du lieu survey duoc uu tien xu ly o dang tong hop hoac an danh khi phuc vu nghien cuu/giao duc.',
    ],
    bodyEn: [
      'Deepfense collects data for clear purposes: academy operation, challenges, gamification, surveys, and Help Center support.',
      'Data may include email, display name, learning progress, challenge results, survey answers, Help Center submissions, and technical logs such as access time or browser information.',
      'Deepfense does not sell personal data. Survey data is prioritized for aggregate or anonymized education and research use.',
    ],
  },
  {
    id: 'terms',
    icon: Scale,
    titleVi: 'Dieu khoan su dung',
    titleEn: 'Terms of Use',
    bodyVi: [
      'Deepfense la nen tang giao duc nhan dien deepfake va AI scam. Ket qua quet, challenge va phan hoi chi co tinh chat tham khao, khong phai ket luan phap ly.',
      'Nguoi dung khong duoc gui noi dung vi pham quyen rieng tu, ban quyen, noi dung gay hai, hoac du lieu cua nguoi khac khi chua co quyen phu hop.',
      'He thong co the gioi han, khoa tai khoan hoac xoa noi dung neu phat hien spam, lam dung hoac hanh vi gay rui ro cho cong dong.',
    ],
    bodyEn: [
      'Deepfense is an educational platform for deepfake and AI scam awareness. Scans, challenges, and responses are informational and not legal conclusions.',
      'Users must not submit content that violates privacy, copyright, safety, or the rights of others.',
      'The system may limit, suspend, or remove accounts or content when spam, abuse, or community risk is detected.',
    ],
  },
  {
    id: 'help-center',
    icon: HelpCircle,
    titleVi: 'Chinh sach Trung tam giup do',
    titleEn: 'Help Center Policy',
    bodyVi: [
      'Deepfense ho tro phan loai dau hieu rui ro va dua ra khuyen nghi phong tranh. Deepfense khong phai co quan dieu tra, co quan phap ly hay don vi phan xu tranh chap.',
      'Phan hoi nen dung ngon ngu trung gian nhu co dau hieu can xac minh them, chua du du kien de ket luan, va khuyen nghi xac minh qua kenh khac.',
      'Trong truong hop co nguy co tai chinh, danh du, an toan ca nhan hoac lan truyen rong, nguoi dung nen lien he co quan/chuyen gia phu hop.',
    ],
    bodyEn: [
      'Deepfense helps classify risk signals and provide prevention guidance. Deepfense is not an investigative, legal, or dispute-resolution authority.',
      'Responses use neutral language such as risk signals need verification, evidence is insufficient, and users should verify through another channel.',
      'For financial, reputational, personal safety, or broad-publication risks, users should contact the appropriate authority or specialist.',
    ],
  },
  {
    id: 'security',
    icon: ShieldCheck,
    titleVi: 'Bao mat he thong',
    titleEn: 'Security',
    bodyVi: [
      'Deepfense ap dung phan quyen user/editor/admin, ghi activity log cho thao tac quan tri va tach security events cho hanh vi dang chu y.',
      'Cac su kien nhu permission denied, login failed, role changed, suspicious upload/link va high-frequency submission co the duoc ghi nhan de bao ve he thong.',
      'Khi trien khai production, nen bat HTTPS/HSTS, CSP, frame-ancestors, rate limit va upload validation.',
    ],
    bodyEn: [
      'Deepfense uses user/editor/admin access control, activity logs for administrative actions, and security events for notable behavior.',
      'Events such as permission denied, login failed, role changed, suspicious upload/link, and high-frequency submission may be logged for system protection.',
      'For production, HTTPS/HSTS, CSP, frame-ancestors, rate limiting, and upload validation should be enabled.',
    ],
  },
  {
    id: 'retention',
    icon: Database,
    titleVi: 'Luu tru va xoa du lieu',
    titleEn: 'Data Retention',
    bodyVi: [
      'Activity logs nen luu 90-180 ngay; security events 180 ngay; Help Center Cases 180-365 ngay tuy muc do; survey nen giu o dang tong hop/an danh.',
      'Nguoi dung co the yeu cau xem, sua hoac xoa du lieu ca nhan neu phu hop voi dieu kien ky thuat va phap ly.',
      'Khi xoa Help Center Case co attachment, can xoa ca document Firestore va file Storage lien quan.',
    ],
    bodyEn: [
      'Recommended retention: activity logs 90-180 days, security events 180 days, Help Center Cases 180-365 days by severity, and surveys in aggregate/anonymized form.',
      'Users may request access, correction, or deletion of personal data where technically and legally applicable.',
      'When deleting a Help Center Case with an attachment, both the Firestore document and related Storage file should be removed.',
    ],
  },
  {
    id: 'access',
    icon: UserCheck,
    titleVi: 'Quyen truy cap noi bo',
    titleEn: 'Internal Access',
    bodyVi: [
      'User chi xem du lieu va tien do cua chinh minh. Editor quan ly noi dung dao tao nhung khong doi role, ban user hay xoa log.',
      'Admin quan ly user, role, Help Center Cases, Content Studio, Activity Log va Security Events theo nguyen tac least privilege.',
      'Moi thay doi role, ban/unban, xoa case hoac xu ly du lieu quan trong nen duoc ghi activity log.',
    ],
    bodyEn: [
      'Users only access their own progress and data. Editors manage training content but cannot change roles, ban users, or delete logs.',
      'Admins manage users, roles, Help Center Cases, Content Studio, Activity Log, and Security Events under least-privilege principles.',
      'Role changes, bans/unbans, case deletion, and important data actions should be recorded in activity logs.',
    ],
  },
];

const Policy: React.FC<PolicyProps> = ({ lang }) => {
  const isVi = lang === 'vi';

  return (
    <div className="mx-auto max-w-6xl animate-in fade-in">
      <section className="rounded-lg border border-white/10 bg-[#07111f]/90 p-6 shadow-2xl shadow-black/30 md:p-8">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-primary/25 bg-primary/10 px-3 py-1.5 text-xs font-bold uppercase tracking-[0.2em] text-blue-200">
              <FileText size={14} />
              Legal & Trust Center
            </div>
            <h1 className="text-3xl font-black text-white md:text-5xl">
              {isVi ? 'Chinh sach Deepfense' : 'Deepfense Policies'}
            </h1>
            <p className="mt-4 max-w-3xl text-sm leading-relaxed text-gray-400 md:text-base">
              {isVi
                ? 'Day la bo chinh sach cong khai ve bao mat, du lieu, dieu khoan su dung, Trung tam giup do va phan quyen noi bo cua Deepfense.'
                : 'This public policy center covers Deepfense privacy, data handling, terms of use, Help Center handling, and internal access controls.'}
            </p>
          </div>
          <div className="rounded-lg border border-white/10 bg-black/25 p-4 text-xs leading-relaxed text-gray-500">
            <p className="font-mono font-bold uppercase tracking-widest text-gray-300">{isVi ? 'Cap nhat' : 'Updated'}</p>
            <p className="mt-1">May 2026</p>
            <p className="mt-3">{PROJECT_METADATA.university}</p>
          </div>
        </div>
      </section>

      <div className="mt-5 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {sections.map((section) => {
          const Icon = section.icon;
          return (
            <a key={section.id} href={`#${section.id}`} className="rounded-lg border border-white/10 bg-white/[0.03] p-4 text-sm font-bold text-gray-300 transition-colors hover:border-primary/40 hover:text-white">
              <Icon className="mb-3 text-primary" size={20} />
              {isVi ? section.titleVi : section.titleEn}
            </a>
          );
        })}
      </div>

      <div className="mt-6 space-y-5">
        {sections.map((section) => {
          const Icon = section.icon;
          const body = isVi ? section.bodyVi : section.bodyEn;
          return (
            <section id={section.id} key={section.id} className="scroll-mt-28 rounded-lg border border-white/10 bg-[#07111f]/90 p-6">
              <div className="mb-4 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-primary/25 bg-primary/10 text-primary">
                  <Icon size={20} />
                </div>
                <h2 className="text-xl font-black text-white">{isVi ? section.titleVi : section.titleEn}</h2>
              </div>
              <div className="space-y-3 text-sm leading-relaxed text-gray-400">
                {body.map((item) => <p key={item}>{item}</p>)}
              </div>
            </section>
          );
        })}
      </div>

      <section className="mt-6 rounded-lg border border-primary/20 bg-primary/10 p-6">
        <h2 className="font-black text-white">{isVi ? 'Lien he ve chinh sach' : 'Policy Contact'}</h2>
        <p className="mt-2 text-sm leading-relaxed text-gray-300">
          {isVi
            ? 'Moi cau hoi ve du lieu ca nhan, bao mat, Help Center Case hoac yeu cau xoa/sua du lieu co the gui qua kenh lien he chinh thuc cua Deepfense.'
            : 'Questions about personal data, security, Help Center Cases, or data access/deletion requests can be sent through the official Deepfense contact channel.'}
        </p>
        <div className="mt-4 flex flex-wrap gap-3">
          <a href={`mailto:${PROJECT_METADATA.email}`} className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-3 text-sm font-bold text-white hover:bg-blue-500">
            <Mail size={16} /> {PROJECT_METADATA.email}
          </a>
          <Link to="/contact" className="inline-flex items-center gap-2 rounded-lg border border-white/10 px-4 py-3 text-sm font-bold text-gray-300 hover:border-primary hover:text-white">
            {isVi ? 'Mo trang lien he' : 'Open contact page'}
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Policy;
