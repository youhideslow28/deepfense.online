import React, { useEffect, useMemo, useState } from 'react';
import { db, auth, storage } from '@/config/firebase';
import { signInWithEmailAndPassword, signOut, onAuthStateChanged, signInWithPopup } from 'firebase/auth';
import { googleProvider } from '@/config/firebase';
import {
  collection,
  addDoc,
  getDocs,
  getCountFromServer,
  getAggregateFromServer,
  sum,
  query,
  where,
  orderBy,
  onSnapshot,
  runTransaction,
  updateDoc,
  doc,
  deleteDoc,
  limit,
  Timestamp,
  serverTimestamp,
} from 'firebase/firestore';
import { ref, deleteObject } from 'firebase/storage';
import {
  Activity,
  BarChart3,
  BookOpen,
  CheckCircle,
  Coins,
  Database,
  ExternalLink,
  Filter,
  Flame,
  Gauge,
  HelpCircle,
  Layers,
  Lock,
  LogIn,
  LogOut,
  Mail,
  Paperclip,
  Radio,
  Search,
  Shield,
  ShieldAlert,
  Sparkles,
  Trash2,
  Users,
  Plus,
  Save,
  Send,
  Download,
  RefreshCw,
  Ban,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

type Role = 'user' | 'editor' | 'admin';
type CaseStatus = 'new' | 'reviewing' | 'replied' | 'closed' | 'archived' | 'processed';
type Severity = 'info' | 'notice' | 'low' | 'medium' | 'warning' | 'high' | 'critical';

interface HelpCenterCase {
  id: string;
  userId?: string;
  name?: string;
  email?: string;
  title?: string;
  description?: string;
  desc?: string;
  caseType?: string;
  severity?: Severity;
  status?: CaseStatus;
  url?: string;
  attachmentUrl?: string;
  assignedTo?: string;
  responseNote?: string;
  submittedAt?: Timestamp;
  updatedAt?: Timestamp;
}

interface UserRecord {
  id: string;
  uid?: string;
  email?: string;
  displayName?: string;
  role?: Role;
  status?: 'active' | 'inactive' | 'flagged' | 'banned';
  score?: number;
  totalChallenges?: number;
  correctAnswers?: number;
  accuracy?: number;
  flags?: number;
  webBalance?: number;
  earnedBalance?: number;
  bonusBalance?: number;
  spentBalance?: number;
  revokedBalance?: number;
  lastActiveAt?: Timestamp;
  createdAt?: Timestamp;
}

interface ChallengeRecord {
  id: string;
  title?: string;
  description?: string;
  videoUrl?: string;
  correctAnswer?: string;
  explanation?: string;
  type?: string;
  difficulty?: 'easy' | 'medium' | 'hard';
  status?: 'draft' | 'published' | 'archived';
  skillTags?: string[];
  totalPlays?: number;
  correctRate?: number;
  updatedAt?: Timestamp;
}

interface ActivityLog {
  id: string;
  actorId?: string;
  actorRole?: Role;
  action?: string;
  targetType?: string;
  targetId?: string;
  severity?: Severity;
  createdAt?: Timestamp;
  metadata?: Record<string, unknown>;
}

interface SecurityEvent {
  id: string;
  eventType?: string;
  actorId?: string;
  actorRole?: Role;
  severity?: Severity;
  sourceIp?: string;
  createdAt?: Timestamp;
  details?: string | Record<string, unknown>;
}

interface DpfLedgerRecord {
  id: string;
  uid?: string;
  direction?: 'credit' | 'debit';
  source?: string;
  amount?: number;
  balanceBefore?: number;
  balanceAfter?: number;
  reason?: string;
  status?: string;
  createdAt?: Timestamp;
  metadata?: Record<string, unknown>;
}

type AdminDpfGrantResult =
  | { ok: true; amount: number; balanceAfter: number; ledgerId: string; alreadyGranted?: boolean; alreadyRevoked?: boolean }
  | { ok: false; code?: string; message?: string };

interface TrainingStats {
  protectedUsers: number;
  totalAttempts: number;
  totalScore: number;
  averageAccuracy: number;
  isLoading: boolean;
}

type AdminTab = 'overview' | 'users' | 'dpf' | 'cases' | 'studio' | 'activity' | 'security' | 'data';

const timeRangeOptions = ['Hôm nay', '7 ngày', '30 ngày', 'Tất cả'];

const tabs: Array<{ id: AdminTab; label: string; icon: LucideIcon }> = [
  { id: 'overview', label: 'Tổng quan SOC', icon: Gauge },
  { id: 'users', label: 'Giám sát người dùng', icon: Users },
  { id: 'dpf', label: 'DPF coin', icon: Coins },
  { id: 'cases', label: 'Hồ sơ trợ giúp', icon: HelpCircle },
  { id: 'studio', label: 'Xưởng nội dung', icon: Layers },
  { id: 'activity', label: 'Nhật ký hoạt động', icon: Activity },
  { id: 'security', label: 'Sự kiện bảo mật', icon: ShieldAlert },
  { id: 'data', label: 'Mô hình dữ liệu', icon: Database },
];

const roleLabels: Record<Role, string> = {
  user: 'Người học',
  editor: 'Biên tập viên',
  admin: 'Quản trị viên',
};

const userStatusLabels: Record<NonNullable<UserRecord['status']>, string> = {
  active: 'Đang hoạt động',
  inactive: 'Ít hoạt động',
  flagged: 'Cần theo dõi',
  banned: 'Đã khóa',
};

const caseStatusLabels: Record<CaseStatus, string> = {
  new: 'Mới nhận',
  reviewing: 'Đang xem xét',
  replied: 'Đã phản hồi',
  closed: 'Đã đóng',
  archived: 'Lưu trữ',
  processed: 'Đã xử lý',
};

const severityLabels: Record<Severity, string> = {
  info: 'Thông tin',
  notice: 'Đáng chú ý',
  low: 'Thấp',
  medium: 'Trung bình',
  warning: 'Cảnh báo',
  high: 'Cao',
  critical: 'Nghiêm trọng',
};

const challengeStatusLabels: Record<NonNullable<ChallengeRecord['status']>, string> = {
  draft: 'Bản nháp',
  published: 'Đã xuất bản',
  archived: 'Lưu trữ',
};

const difficultyLabels: Record<NonNullable<ChallengeRecord['difficulty']>, string> = {
  easy: 'Dễ',
  medium: 'Trung bình',
  hard: 'Khó',
};

const challengeTypeLabels: Record<string, string> = {
  compare_ab: 'So sánh A/B',
  single_video_detect: 'Nhận diện một video',
  scam_scenario: 'Tình huống lừa đảo',
  quiz: 'Câu hỏi kiến thức',
};

const formatDate = (value?: Timestamp) => {
  if (!value?.seconds) return 'Chưa ghi nhận';
  return new Date(value.seconds * 1000).toLocaleString('vi-VN');
};

const severityClass = (severity?: Severity) => {
  switch (severity) {
    case 'critical':
    case 'high':
      return 'bg-red-500/15 text-red-300 border-red-500/30';
    case 'warning':
    case 'medium':
      return 'bg-amber-500/15 text-amber-200 border-amber-500/30';
    case 'notice':
    case 'low':
      return 'bg-blue-500/15 text-blue-200 border-blue-500/30';
    default:
      return 'bg-emerald-500/15 text-emerald-200 border-emerald-500/30';
  }
};

const statusClass = (status?: string) => {
  switch (status) {
    case 'new':
    case 'flagged':
    case 'draft':
      return 'bg-amber-500/15 text-amber-200 border-amber-500/30';
    case 'reviewing':
    case 'active':
    case 'published':
      return 'bg-blue-500/15 text-blue-200 border-blue-500/30';
    case 'closed':
    case 'replied':
    case 'processed':
      return 'bg-emerald-500/15 text-emerald-200 border-emerald-500/30';
    case 'banned':
    case 'archived':
      return 'bg-red-500/15 text-red-300 border-red-500/30';
    default:
      return 'bg-white/10 text-gray-300 border-white/10';
  }
};

const StatCard = ({
  label,
  value,
  sub,
  icon: Icon,
  tone = 'blue',
}: {
  label: string;
  value: string | number;
  sub: string;
  icon: LucideIcon;
  tone?: 'blue' | 'green' | 'amber' | 'red';
}) => {
  const tones = {
    blue: 'text-blue-300 bg-blue-500/15 border-blue-500/20',
    green: 'text-emerald-300 bg-emerald-500/15 border-emerald-500/20',
    amber: 'text-amber-200 bg-amber-500/15 border-amber-500/20',
    red: 'text-red-300 bg-red-500/15 border-red-500/20',
  };

  return (
    <div className="rounded-lg border border-white/10 bg-[#07111f]/90 p-4 shadow-xl shadow-black/20">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-[11px] font-bold uppercase tracking-[0.12em] text-slate-400">{label}</p>
          <div className="mt-3 text-3xl font-black text-white">{value}</div>
        </div>
        <div className={`rounded-lg border p-2 ${tones[tone]}`}>
          <Icon size={20} />
        </div>
      </div>
      <p className="mt-4 text-xs text-slate-300/85">{sub}</p>
    </div>
  );
};

const Pill = ({ children, className = '' }: { children: React.ReactNode; className?: string }) => (
  <span className={`inline-flex items-center rounded-full border px-2.5 py-1 text-[11px] font-bold uppercase tracking-wide ${className}`}>
    {children}
  </span>
);

const Admin: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAuthChecking, setIsAuthChecking] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<AdminTab>('overview');
  const [timeRange, setTimeRange] = useState(timeRangeOptions[1]);
  const [search, setSearch] = useState('');
  const [roleFilter, setRoleFilter] = useState<'all' | Role>('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [cases, setCases] = useState<HelpCenterCase[]>([]);
  const [legacyReports, setLegacyReports] = useState<HelpCenterCase[]>([]);
  const [users, setUsers] = useState<UserRecord[]>([]);
  const [dpfLedger, setDpfLedger] = useState<DpfLedgerRecord[]>([]);
  const [challenges, setChallenges] = useState<ChallengeRecord[]>([]);
  const [activityLogs, setActivityLogs] = useState<ActivityLog[]>([]);
  const [securityEvents, setSecurityEvents] = useState<SecurityEvent[]>([]);
  const [selectedUserId, setSelectedUserId] = useState('');
  const [trainingStats, setTrainingStats] = useState<TrainingStats>({
    protectedUsers: 0,
    totalAttempts: 0,
    totalScore: 0,
    averageAccuracy: 0,
    isLoading: true,
  });
  const [caseDrafts, setCaseDrafts] = useState<Record<string, { status: CaseStatus; severity: Severity; responseNote: string }>>({});
  const [challengeForm, setChallengeForm] = useState({
    title: '',
    description: '',
    type: 'single_video_detect',
    videoUrl: '',
    correctAnswer: '',
    explanation: '',
    skillTags: 'verification, context',
    difficulty: 'medium',
    status: 'draft',
  });
  const [eventForm, setEventForm] = useState({
    eventType: 'permission_denied',
    actorId: '',
    severity: 'warning',
    details: '',
  });
  const [userForm, setUserForm] = useState({
    email: '',
    displayName: '',
    role: 'user',
    status: 'active',
  });
  const [dpfForm, setDpfForm] = useState({
    target: 'deepfense@gmail.com',
    amount: '1000',
    reason: 'Admin bonus DPF coin',
  });
  const [dpfBusy, setDpfBusy] = useState(false);
  const [actionMessage, setActionMessage] = useState('');

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setIsAuthenticated(!!user);
      setIsAuthChecking(false);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (!isAuthenticated) return;
    setLoading(true);

    const unsubscribers = [
      onSnapshot(query(collection(db, 'help_center_cases'), orderBy('submittedAt', 'desc'), limit(100)), (snapshot) => {
        setCases(snapshot.docs.map((item) => ({ id: item.id, ...item.data() })) as HelpCenterCase[]);
        setLoading(false);
      }, () => setLoading(false)),
      onSnapshot(query(collection(db, 'incident_reports'), orderBy('submittedAt', 'desc'), limit(100)), (snapshot) => {
        setLegacyReports(snapshot.docs.map((item) => ({ id: item.id, ...item.data(), caseType: 'legacy_incident' })) as HelpCenterCase[]);
      }),
      onSnapshot(query(collection(db, 'users'), limit(100)), (snapshot) => {
        setUsers(snapshot.docs.map((item) => ({ id: item.id, ...item.data() })) as UserRecord[]);
      }),
      onSnapshot(query(collection(db, 'dpf_ledger'), orderBy('createdAt', 'desc'), limit(80)), (snapshot) => {
        setDpfLedger(snapshot.docs.map((item) => ({ id: item.id, ...item.data() })) as DpfLedgerRecord[]);
      }),
      onSnapshot(query(collection(db, 'challenges'), limit(100)), (snapshot) => {
        setChallenges(snapshot.docs.map((item) => ({ id: item.id, ...item.data() })) as ChallengeRecord[]);
      }),
      onSnapshot(query(collection(db, 'activity_logs'), orderBy('createdAt', 'desc'), limit(80)), (snapshot) => {
        setActivityLogs(snapshot.docs.map((item) => ({ id: item.id, ...item.data() })) as ActivityLog[]);
      }),
      onSnapshot(query(collection(db, 'security_events'), orderBy('createdAt', 'desc'), limit(80)), (snapshot) => {
        setSecurityEvents(snapshot.docs.map((item) => ({ id: item.id, ...item.data() })) as SecurityEvent[]);
      }),
    ];

    return () => unsubscribers.forEach((unsubscribe) => unsubscribe());
  }, [isAuthenticated]);

  useEffect(() => {
    if (!isAuthenticated) return;
    let isMounted = true;

    const loadTrainingStats = async () => {
      try {
        const gameRef = collection(db, 'game_results');
        const passedQuery = query(gameRef, where('score', '>=', 9));
        const [passedSnapshot, attemptsSnapshot, scoreSnapshot] = await Promise.all([
          getCountFromServer(passedQuery),
          getCountFromServer(gameRef),
          getAggregateFromServer(gameRef, { totalScore: sum('score') }),
        ]);

        if (!isMounted) return;
        const totalAttempts = attemptsSnapshot.data().count;
        const totalScore = Number(scoreSnapshot.data().totalScore || 0);

        setTrainingStats({
          protectedUsers: passedSnapshot.data().count,
          totalAttempts,
          totalScore,
          averageAccuracy: totalAttempts > 0 ? Math.round((totalScore / (totalAttempts * 10)) * 100) : 0,
          isLoading: false,
        });
      } catch (error) {
        console.error('Could not load admin training stats:', error);
        if (isMounted) {
          setTrainingStats((current) => ({ ...current, isLoading: false }));
        }
      }
    };

    loadTrainingStats();
    return () => {
      isMounted = false;
    };
  }, [isAuthenticated]);

  const mergedCases = useMemo(() => {
    const normalizedLegacy = legacyReports.map((report) => ({
      ...report,
      title: report.title || 'Legacy incident report',
      description: report.description || report.desc,
      status: report.status === 'processed' ? 'closed' : report.status || 'new',
      severity: report.severity || 'medium',
    }));
    return [...cases, ...normalizedLegacy];
  }, [cases, legacyReports]);

  const dashboardUsers = users;
  const dashboardCases = mergedCases;
  const dashboardChallenges = challenges;
  const dashboardActivity = activityLogs;
  const dashboardSecurity = securityEvents;

  const stats = useMemo(() => {
    const activeLearners = dashboardUsers.filter((user) => user.status !== 'banned').length;
    const openCases = dashboardCases.filter((item) => ['new', 'reviewing'].includes(item.status || 'new')).length;
    const highRisk = dashboardCases.filter((item) => ['high', 'critical'].includes(item.severity || '')).length;
    const reviewQueue = dashboardChallenges.filter((item) => item.status === 'draft').length;
    return { activeLearners, openCases, highRisk, reviewQueue };
  }, [dashboardCases, dashboardChallenges, dashboardUsers]);

  const filteredUsers = dashboardUsers.filter((user) => {
    const haystack = `${user.displayName || ''} ${user.email || ''} ${user.uid || user.id}`.toLowerCase();
    const matchesSearch = haystack.includes(search.toLowerCase());
    const matchesRole = roleFilter === 'all' || user.role === roleFilter;
    const matchesStatus = statusFilter === 'all' || user.status === statusFilter;
    return matchesSearch && matchesRole && matchesStatus;
  });

  const filteredCases = dashboardCases.filter((item) => {
    const haystack = `${item.title || ''} ${item.name || ''} ${item.email || ''} ${item.description || item.desc || ''}`.toLowerCase();
    const matchesSearch = haystack.includes(search.toLowerCase());
    const matchesStatus = statusFilter === 'all' || item.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const selectedUser = useMemo(() => {
    if (!selectedUserId) return filteredUsers[0] || dashboardUsers[0];
    return dashboardUsers.find((user) => user.id === selectedUserId || user.uid === selectedUserId) || filteredUsers[0] || dashboardUsers[0];
  }, [dashboardUsers, filteredUsers, selectedUserId]);

  const selectedUserKey = selectedUser?.uid || selectedUser?.id || '';
  const selectedUserEmail = (selectedUser?.email || '').toLowerCase();
  const selectedUserCases = dashboardCases.filter((item) =>
    item.email?.toLowerCase() === selectedUserEmail || item.userId === selectedUserKey,
  );
  const selectedUserActivity = dashboardActivity.filter((item) =>
    item.actorId === selectedUserKey || item.targetId === selectedUserKey,
  );
  const selectedUserLedger = dpfLedger.filter((entry) =>
    entry.uid === selectedUserKey || (typeof entry.metadata?.targetEmail === 'string' && entry.metadata.targetEmail.toLowerCase() === selectedUserEmail),
  );

  const handleLogin = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      setLoginError('');
    } catch (error) {
      setLoginError('Sai thong tin dang nhap hoac tai khoan chua duoc cap quyen.');
    }
  };

  const showActionMessage = (message: string) => {
    setActionMessage(message);
    window.setTimeout(() => setActionMessage(''), 3200);
  };

  const downloadTextFile = (filename: string, content: string, type = 'application/json') => {
    const blob = new Blob([content], { type });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    link.click();
    URL.revokeObjectURL(url);
  };

  const exportDashboardJson = () => {
    downloadTextFile(`deepfense-admin-export-${Date.now()}.json`, JSON.stringify({
      exportedAt: new Date().toISOString(),
      users: dashboardUsers,
      cases: dashboardCases,
      challenges: dashboardChallenges,
      activityLogs: dashboardActivity,
      securityEvents: dashboardSecurity,
    }, null, 2));
    showActionMessage('Đã xuất dữ liệu dashboard dạng JSON.');
  };

  const exportCasesCsv = () => {
    const header = ['id', 'ten', 'email', 'tieu_de', 'loai_case', 'muc_do', 'trang_thai', 'ngay_gui'];
    const rows = dashboardCases.map((item) => [
      item.id,
      item.name || '',
      item.email || '',
      item.title || item.description || item.desc || '',
      item.caseType || '',
      item.severity || '',
      item.status || '',
      formatDate(item.submittedAt),
    ]);
    const csv = [header, ...rows]
      .map((row) => row.map((cell) => `"${String(cell).replace(/"/g, '""')}"`).join(','))
      .join('\n');
    downloadTextFile(`deepfense-help-center-cases-${Date.now()}.csv`, csv, 'text/csv;charset=utf-8');
    showActionMessage('Đã xuất danh sách hồ sơ trợ giúp dạng CSV.');
  };

  const resetControls = () => {
    setSearch('');
    setRoleFilter('all');
    setStatusFilter('all');
    setTimeRange(timeRangeOptions[1]);
    showActionMessage('Đã đặt lại bộ lọc và vùng thời gian.');
  };

  const writeActivityLog = async (payload: Omit<ActivityLog, 'id' | 'createdAt'>) => {
    await addDoc(collection(db, 'activity_logs'), {
      actorId: auth.currentUser?.uid || 'admin',
      actorRole: 'admin',
      ...payload,
      createdAt: serverTimestamp(),
    });
  };

  const safeLedgerId = (value: string) => value.replace(/[^a-zA-Z0-9_-]/g, '_').slice(0, 180);

  const grantDpfCoinOnServer = async (payload: { target: string; amount: number; reason: string }) => {
    const user = auth.currentUser;
    if (!user) {
      throw new Error('Ban can dang nhap admin truoc khi cap DPF coin.');
    }

    const token = await user.getIdToken();
    const response = await fetch('/api/dpf', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        action: 'adminGrant',
        payload: {
          ...payload,
          grantId: `${payload.target.toLowerCase()}:admin_bonus:${payload.amount}:${Date.now()}`,
        },
      }),
    });

    const data = await response.json().catch(() => null) as AdminDpfGrantResult | null;
    if (!response.ok || !data || data.ok !== true) {
      const message = data && 'message' in data ? data.message : '';
      throw new Error(message || `DPF admin grant API failed with ${response.status}.`);
    }

    return data;
  };

  const revokeDpfCoinOnServer = async (payload: { target: string; amount: number; reason: string }) => {
    const user = auth.currentUser;
    if (!user) {
      throw new Error('Ban can dang nhap admin truoc khi thu hoi DPF coin.');
    }

    const token = await user.getIdToken();
    const response = await fetch('/api/dpf', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        action: 'adminRevoke',
        payload: {
          ...payload,
          revokeId: `${payload.target.toLowerCase()}:admin_revoke:${payload.amount}:${Date.now()}`,
        },
      }),
    });

    const data = await response.json().catch(() => null) as AdminDpfGrantResult | null;
    if (!response.ok || !data || data.ok !== true) {
      const message = data && 'message' in data ? data.message : '';
      throw new Error(message || `DPF admin revoke API failed with ${response.status}.`);
    }

    return data;
  };

  const grantDpfCoin = async (event: React.FormEvent) => {
    event.preventDefault();
    if (dpfBusy) return;

    const target = dpfForm.target.trim();
    const normalizedEmail = target.toLowerCase();
    const amount = Number(dpfForm.amount);

    if (!target) {
      showActionMessage('Cần nhập email hoặc UID người nhận DPF coin.');
      return;
    }

    if (!Number.isFinite(amount) || amount <= 0 || amount > 1_000_000) {
      showActionMessage('Số DPF coin phải nằm trong khoảng 1 đến 1.000.000.');
      return;
    }

    setDpfBusy(true);
    try {
      const serverResult = await grantDpfCoinOnServer({
        target,
        amount,
        reason: dpfForm.reason.trim() || 'Admin bonus DPF coin',
      });

      if (serverResult?.ok) {
        showActionMessage(`Da cong ${amount.toLocaleString('en-US')} DPF coin cho ${target}. So du moi: ${serverResult.balanceAfter.toLocaleString('en-US')}.`);
        return;
      }

      let targetUser = dashboardUsers.find((item) =>
        (item.email || '').toLowerCase() === normalizedEmail || item.uid === target || item.id === target,
      );

      if (!targetUser && target.includes('@')) {
        const snapshot = await getDocs(query(collection(db, 'users'), where('email', '==', normalizedEmail), limit(1)));
        if (!snapshot.empty) {
          const found = snapshot.docs[0];
          targetUser = { id: found.id, ...found.data() } as UserRecord;
        }
      }

      if (!targetUser && auth.currentUser?.email?.toLowerCase() === normalizedEmail) {
        targetUser = {
          id: auth.currentUser.uid,
          uid: auth.currentUser.uid,
          email: auth.currentUser.email || normalizedEmail,
          displayName: auth.currentUser.displayName || 'Admin',
          role: 'admin',
          status: 'active',
        };
      }

      if (!targetUser) {
        showActionMessage('Không tìm thấy user. Hãy để người dùng đăng nhập Google trước, hoặc nhập UID.');
        return;
      }

      const uid = targetUser.uid || targetUser.id;
      const userRef = doc(db, 'users', uid);
      const idempotencyKey = `${uid}:admin_bonus:${amount}:${Date.now()}`;
      const ledgerRef = doc(db, 'dpf_ledger', safeLedgerId(idempotencyKey));
      const reason = dpfForm.reason.trim() || 'Admin bonus DPF coin';

      await runTransaction(db, async (transaction) => {
        const userSnap = await transaction.get(userRef);
        const userData = userSnap.exists() ? userSnap.data() : {};
        const balanceBefore = typeof userData.webBalance === 'number' ? userData.webBalance : 0;
        const bonusBefore = typeof userData.bonusBalance === 'number' ? userData.bonusBalance : 0;
        const balanceAfter = balanceBefore + amount;

        transaction.set(userRef, {
          uid,
          email: targetUser.email || normalizedEmail,
          displayName: targetUser.displayName || targetUser.email || uid,
          role: targetUser.role || 'user',
          status: targetUser.status || 'active',
          webBalance: balanceAfter,
          bonusBalance: bonusBefore + amount,
          updatedAt: serverTimestamp(),
          createdAt: userSnap.exists() ? userData.createdAt : serverTimestamp(),
        }, { merge: true });

        transaction.set(ledgerRef, {
          uid,
          direction: 'credit',
          source: 'admin_bonus',
          amount,
          balanceBefore,
          balanceAfter,
          status: 'confirmed',
          reason,
          metadata: {
            targetEmail: targetUser.email || normalizedEmail,
            grantedBy: auth.currentUser?.email || auth.currentUser?.uid || 'admin',
          },
          idempotencyKey,
          createdAt: serverTimestamp(),
          confirmedAt: serverTimestamp(),
        });
      });

      await writeActivityLog({
        action: 'admin.dpf_coin_granted',
        targetType: 'users',
        targetId: uid,
        severity: amount >= 1000 ? 'warning' : 'notice',
        metadata: { amount, reason, target: targetUser.email || uid },
      });

      showActionMessage(`Đã cộng ${amount.toLocaleString('vi-VN')} DPF coin cho ${targetUser.email || uid}.`);
    } catch (error) {
      console.error('DPF coin grant failed:', error);
      const message = error instanceof Error ? error.message : '';
      showActionMessage(message || 'Khong the cong DPF coin. Hay kiem tra cau hinh Firebase Admin.');
    } finally {
      setDpfBusy(false);
    }
  };

  const revokeDpfCoin = async () => {
    if (dpfBusy) return;

    const target = dpfForm.target.trim();
    const amount = Number(dpfForm.amount);

    if (!target) {
      showActionMessage('Cần nhập email hoặc UID người bị thu hồi DPF coin.');
      return;
    }

    if (!Number.isFinite(amount) || amount <= 0 || amount > 1_000_000) {
      showActionMessage('Số DPF coin thu hồi phải nằm trong khoảng 1 đến 1.000.000.');
      return;
    }

    if (!window.confirm(`Thu hồi ${amount.toLocaleString('vi-VN')} DPF coin từ ${target}? Thao tác này sẽ ghi ledger debit và không cho số dư âm.`)) {
      return;
    }

    setDpfBusy(true);
    try {
      const serverResult = await revokeDpfCoinOnServer({
        target,
        amount,
        reason: dpfForm.reason.trim() || 'Admin revoked DPF coin',
      });

      showActionMessage(`Đã thu hồi ${amount.toLocaleString('vi-VN')} DPF coin từ ${target}. Số dư mới: ${serverResult.balanceAfter.toLocaleString('vi-VN')}.`);
    } catch (error) {
      console.error('DPF coin revoke failed:', error);
      const message = error instanceof Error ? error.message : '';
      showActionMessage(message || 'Không thể thu hồi DPF coin. Hãy kiểm tra quyền admin hoặc số dư người dùng.');
    } finally {
      setDpfBusy(false);
    }
  };

  const updateCaseStatus = async (item: HelpCenterCase, status: CaseStatus) => {
    const collectionName = item.caseType === 'legacy_incident' ? 'incident_reports' : 'help_center_cases';
    const nextStatus = item.caseType === 'legacy_incident' && status === 'closed' ? 'processed' : status;
    await updateDoc(doc(db, collectionName, item.id), { status: nextStatus });
    await writeActivityLog({
      action: 'admin.case_status_changed',
      targetType: collectionName,
      targetId: item.id,
      severity: status === 'closed' ? 'notice' : 'info',
      metadata: { status: nextStatus },
    });
    showActionMessage('Đã cập nhật trạng thái hồ sơ.');
  };

  const saveCaseDraft = async (item: HelpCenterCase) => {
    const draft = caseDrafts[item.id];
    if (!draft) return;
    const collectionName = item.caseType === 'legacy_incident' ? 'incident_reports' : 'help_center_cases';
    await updateDoc(doc(db, collectionName, item.id), {
      status: item.caseType === 'legacy_incident' && draft.status === 'closed' ? 'processed' : draft.status,
      severity: draft.severity,
      responseNote: draft.responseNote,
      updatedAt: serverTimestamp(),
    });
    await writeActivityLog({
      action: 'admin.case_replied',
      targetType: collectionName,
      targetId: item.id,
      severity: draft.severity === 'high' || draft.severity === 'critical' ? 'warning' : 'notice',
      metadata: { status: draft.status, severity: draft.severity },
    });
    showActionMessage('Đã lưu phân loại và ghi chú phản hồi cho hồ sơ.');
  };

  const deleteCase = async (item: HelpCenterCase) => {
    if (!window.confirm('Bạn chắc chắn muốn xóa hồ sơ này?')) return;
    try {
      if (item.attachmentUrl) {
        try {
          await deleteObject(ref(storage, item.attachmentUrl));
        } catch (storageError) {
          console.warn('Không thể xóa tệp đính kèm hoặc tệp không tồn tại:', storageError);
        }
      }
      const collectionName = item.caseType === 'legacy_incident' ? 'incident_reports' : 'help_center_cases';
      await deleteDoc(doc(db, collectionName, item.id));
      await writeActivityLog({
        action: 'admin.data_deleted',
        targetType: collectionName,
        targetId: item.id,
        severity: 'critical',
        metadata: { attachmentDeleted: !!item.attachmentUrl },
      });
      showActionMessage('Đã xóa hồ sơ và tệp đính kèm nếu có.');
    } catch (error) {
      console.error('Error deleting case:', error);
    }
  };

  const changeUserRole = async (user: UserRecord, role: Role) => {
    await updateDoc(doc(db, 'users', user.uid || user.id), { role });
    await writeActivityLog({
      action: 'admin.role_changed',
      targetType: 'users',
      targetId: user.uid || user.id,
      severity: 'notice',
      metadata: { role },
    });
    await addDoc(collection(db, 'security_events'), {
      eventType: 'role_changed',
      actorId: auth.currentUser?.uid || 'admin',
      actorRole: 'admin',
      severity: 'notice',
      sourceIp: 'client',
      details: { targetUser: user.uid || user.id, role },
      createdAt: serverTimestamp(),
    });
    showActionMessage('Đã cập nhật vai trò và ghi sự kiện bảo mật.');
  };

  const resetAllUserProgress = async () => {
    const isAdminEmail = (email?: string) => email?.toLowerCase() === 'deepfense@gmail.com';
    const adminUid = auth.currentUser?.uid;

    if (!window.confirm('CẢNH BÁO NGUY HIỂM: Thao tác này sẽ đặt lại TOÀN BỘ tiến độ học tập, điểm số và DPF coin của tất cả người dùng. Tài khoản Admin (deepfense@gmail.com) sẽ được giữ nguyên. Bạn có chắc chắn muốn tiếp tục?')) return;
    
    setLoading(true);
    try {
      // 1. Reset users collection (non-admins)
      const userSnaps = await getDocs(collection(db, 'users'));
      const resetStats = {
        score: 0,
        totalChallenges: 0,
        correctAnswers: 0,
        accuracy: 0,
        flags: 0,
        webBalance: 0,
        earnedBalance: 0,
        bonusBalance: 0,
        spentBalance: 0,
        updatedAt: serverTimestamp(),
      };

      const userPromises = userSnaps.docs.map(userDoc => {
        const data = userDoc.data();
        if (data.role === 'admin' || isAdminEmail(data.email)) return Promise.resolve();
        return updateDoc(doc(db, 'users', userDoc.id), resetStats);
      });

      // 2. Reset academy_learners (non-admins)
      const learnerSnaps = await getDocs(collection(db, 'academy_learners'));
      const learnerPromises = learnerSnaps.docs.map(learnerDoc => {
        const data = learnerDoc.data();
        if (isAdminEmail(data.email) || data.uid === adminUid) return Promise.resolve();

        return updateDoc(doc(db, 'academy_learners', learnerDoc.id), {
          status: 'signed_in',
          progressPercent: 0,
          completedModules: [],
          courseEvaluationSubmitted: false,
          finalExam: null,
          certificateUnlocked: false,
          certificateId: '',
          completedAt: null,
          updatedAt: serverTimestamp(),
        });
      });

      // 3. Delete progress/ledger collections (non-admins)
      const clearCollection = async (name: string) => {
        const snaps = await getDocs(collection(db, name));
        return Promise.all(snaps.docs.map(d => {
          const data = d.data();
          const uid = data.userId || data.uid || data.actorId;
          if (uid === adminUid || (data.email && isAdminEmail(data.email))) return Promise.resolve();
          return deleteDoc(doc(db, name, d.id));
        }));
      };

      await Promise.all([
        ...userPromises,
        ...learnerPromises,
        clearCollection('challenge_submissions'),
        clearCollection('game_results'),
        clearCollection('dpf_ledger'),
        clearCollection('dpf_daily_quotas'),
        clearCollection('user_profiles'),
      ]);

      await writeActivityLog({
        action: 'admin.global_reset',
        targetType: 'system',
        targetId: 'all_users',
        severity: 'critical',
        metadata: { resetBy: auth.currentUser?.email || 'admin' },
      });

      showActionMessage('Đã đặt lại toàn bộ tiến độ người dùng thành công (Trừ Admin).');
    } catch (error) {
      console.error('Reset failed:', error);
      showActionMessage('Lỗi khi đặt lại tiến độ. Hãy kiểm tra Console.');
    } finally {
      setLoading(false);
    }
  };

  const changeUserStatus = async (user: UserRecord, status: UserRecord['status']) => {
    await updateDoc(doc(db, 'users', user.uid || user.id), { status });
    await writeActivityLog({
      action: status === 'banned' ? 'admin.user_banned' : 'admin.user_unbanned',
      targetType: 'users',
      targetId: user.uid || user.id,
      severity: status === 'banned' ? 'warning' : 'notice',
      metadata: { status },
    });
    showActionMessage('Đã cập nhật trạng thái người dùng.');
  };

  const deleteUserRecord = async (user: UserRecord) => {
    const userId = user.uid || user.id;
    if (!window.confirm(`Bạn chắc chắn muốn xóa hồ sơ user "${user.email || user.displayName || userId}"? Tài khoản đăng nhập Firebase Auth sẽ không bị xóa.`)) return;

    await deleteDoc(doc(db, 'users', userId));
    await writeActivityLog({
      action: 'admin.user_deleted',
      targetType: 'users',
      targetId: userId,
      severity: 'critical',
      metadata: { email: user.email || '', displayName: user.displayName || '' },
    });

    if (selectedUserId === userId || selectedUserId === user.id) {
      setSelectedUserId('');
    }
    showActionMessage('Đã xóa hồ sơ user khỏi collection users.');
  };

  const deleteDpfLedgerEntry = async (entry: DpfLedgerRecord) => {
    if (!window.confirm(`Bạn chắc chắn muốn xóa giao dịch DPF "${entry.id}"? Thao tác này không tự tính lại số dư user.`)) return;

    await deleteDoc(doc(db, 'dpf_ledger', entry.id));
    await writeActivityLog({
      action: 'admin.dpf_ledger_deleted',
      targetType: 'dpf_ledger',
      targetId: entry.id,
      severity: 'warning',
      metadata: { uid: entry.uid || '', amount: entry.amount || 0 },
    });
    showActionMessage('Đã xóa giao dịch DPF khỏi dpf_ledger.');
  };

  const deleteActivityLog = async (item: ActivityLog) => {
    if (!window.confirm(`Bạn chắc chắn muốn xóa activity log "${item.action || item.id}"?`)) return;

    await deleteDoc(doc(db, 'activity_logs', item.id));
    await writeActivityLog({
      action: 'admin.activity_log_deleted',
      targetType: 'activity_logs',
      targetId: item.id,
      severity: 'warning',
      metadata: { deletedAction: item.action || '' },
    });
    showActionMessage('Đã xóa activity log.');
  };

  const deleteSecurityEvent = async (item: SecurityEvent) => {
    if (!window.confirm(`Bạn chắc chắn muốn xóa security event "${item.eventType || item.id}"?`)) return;

    await deleteDoc(doc(db, 'security_events', item.id));
    await writeActivityLog({
      action: 'admin.security_event_deleted',
      targetType: 'security_events',
      targetId: item.id,
      severity: 'critical',
      metadata: { eventType: item.eventType || '', actorId: item.actorId || '' },
    });
    showActionMessage('Đã xóa security event.');
  };

  const createUserRecord = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!userForm.email.trim()) {
      showActionMessage('Cần nhập email để tạo hồ sơ người dùng.');
      return;
    }

    const docRef = await addDoc(collection(db, 'users'), {
      email: userForm.email.trim().toLowerCase(),
      displayName: userForm.displayName.trim() || userForm.email.trim(),
      role: userForm.role,
      status: userForm.status,
      score: 0,
      totalChallenges: 0,
      correctAnswers: 0,
      accuracy: 0,
      flags: 0,
      createdAt: serverTimestamp(),
      lastActiveAt: null,
    });

    await writeActivityLog({
      action: 'admin.user_created',
      targetType: 'users',
      targetId: docRef.id,
      severity: userForm.role === 'admin' ? 'warning' : 'notice',
      metadata: { email: userForm.email, role: userForm.role, status: userForm.status },
    });

    setUserForm({ email: '', displayName: '', role: 'user', status: 'active' });
    showActionMessage('Đã tạo hồ sơ người dùng mới.');
  };

  const createChallenge = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!challengeForm.title.trim()) {
      showActionMessage('Cần nhập tiêu đề challenge.');
      return;
    }

    const skillTags = challengeForm.skillTags
      .split(',')
      .map((tag) => tag.trim())
      .filter(Boolean);

    const docRef = await addDoc(collection(db, 'challenges'), {
      ...challengeForm,
      skillTags,
      totalPlays: 0,
      correctRate: 0,
      createdBy: auth.currentUser?.uid || 'admin',
      updatedBy: auth.currentUser?.uid || 'admin',
      publishedAt: challengeForm.status === 'published' ? serverTimestamp() : null,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    });

    await writeActivityLog({
      action: 'editor.challenge_created',
      targetType: 'challenges',
      targetId: docRef.id,
      severity: challengeForm.status === 'published' ? 'notice' : 'info',
      metadata: { title: challengeForm.title, status: challengeForm.status },
    });

    setChallengeForm({
      title: '',
      description: '',
      type: 'single_video_detect',
      videoUrl: '',
      correctAnswer: '',
      explanation: '',
      skillTags: 'verification, context',
      difficulty: 'medium',
      status: 'draft',
    });
    showActionMessage('Đã tạo challenge mới trong xưởng nội dung.');
  };

  const updateChallengeStatus = async (challenge: ChallengeRecord, status: ChallengeRecord['status']) => {
    await updateDoc(doc(db, 'challenges', challenge.id), {
      status,
      publishedAt: status === 'published' ? serverTimestamp() : challenge.updatedAt || null,
      updatedBy: auth.currentUser?.uid || 'admin',
      updatedAt: serverTimestamp(),
    });
    await writeActivityLog({
      action: 'editor.challenge_updated',
      targetType: 'challenges',
      targetId: challenge.id,
      severity: status === 'published' ? 'notice' : 'info',
      metadata: { status },
    });
    showActionMessage('Đã cập nhật trạng thái challenge.');
  };

  const deleteChallenge = async (challenge: ChallengeRecord) => {
    if (!window.confirm(`Bạn chắc chắn muốn xóa challenge "${challenge.title || challenge.id}"?`)) return;
    await deleteDoc(doc(db, 'challenges', challenge.id));
    await writeActivityLog({
      action: 'editor.challenge_deleted',
      targetType: 'challenges',
      targetId: challenge.id,
      severity: 'warning',
      metadata: { title: challenge.title || '' },
    });
    showActionMessage('Đã xóa challenge.');
  };

  const createSecurityEvent = async (event: React.FormEvent) => {
    event.preventDefault();
    await addDoc(collection(db, 'security_events'), {
      eventType: eventForm.eventType,
      actorId: eventForm.actorId || auth.currentUser?.uid || 'admin',
      actorRole: 'admin',
      severity: eventForm.severity,
      sourceIp: 'client',
      userAgent: navigator.userAgent,
      details: eventForm.details || 'Manual admin event',
      createdAt: serverTimestamp(),
    });
    await writeActivityLog({
      action: 'admin.security_event_created',
      targetType: 'security_events',
      targetId: eventForm.eventType,
      severity: eventForm.severity as Severity,
      metadata: { manual: true },
    });
    setEventForm({ eventType: 'permission_denied', actorId: '', severity: 'warning', details: '' });
    showActionMessage('Đã tạo sự kiện bảo mật thủ công.');
  };

  if (isAuthChecking) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-primary/20 border-t-primary" />
      </div>
    );
  }

  const handleGoogleLogin = async () => {
    try {
      setLoginError('');
      await signInWithPopup(auth, googleProvider);
    } catch (error) {
      const code = typeof error === 'object' && error && 'code' in error ? String((error as { code?: unknown }).code) : '';
      setLoginError(`Lỗi đăng nhập Google [${code}]`);
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center animate-in fade-in">
        <div className="w-full max-w-sm rounded-lg border border-white/10 bg-[#07111f] p-8 text-center shadow-2xl shadow-black/40">
          <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-lg border border-primary/30 bg-primary/10">
            <Lock className="text-primary" size={32} />
          </div>
          <p className="mb-2 text-xs font-bold uppercase tracking-[0.28em] text-primary">Trung tâm điều khiển Deepfense</p>
          <h2 className="mb-6 text-xl font-black text-white">Đăng nhập quản trị</h2>
          
          <button onClick={handleGoogleLogin} className="mb-6 flex w-full items-center justify-center gap-2 rounded-lg border border-blue-500/30 bg-blue-500/10 py-3 text-sm font-bold text-blue-300 transition-colors hover:bg-blue-500 hover:text-white">
            <LogIn size={18} /> Đăng nhập bằng Google
          </button>

          <div className="mb-6 flex items-center gap-4 text-xs font-bold text-slate-400 before:h-px before:flex-1 before:bg-white/10 after:h-px after:flex-1 after:bg-white/10">
            HOẶC DÙNG EMAIL
          </div>

          <form onSubmit={handleLogin} className="text-left">
            <input
              type="email"
              placeholder="Email quản trị"
              className="mb-4 w-full rounded-lg border border-white/20 bg-black p-3 text-center text-white outline-none focus:border-primary"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />
            <input
              type="password"
              placeholder="Mật khẩu"
              className="mb-4 w-full rounded-lg border border-white/20 bg-black p-3 text-center text-white outline-none focus:border-primary"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
            {loginError && <div className="mb-4 text-xs font-bold text-red-400">{loginError}</div>}
            <button type="submit" className="w-full rounded-lg bg-primary py-3 font-bold text-white transition-colors hover:bg-blue-500">
              Truy cập bằng mật khẩu
            </button>
          </form>
        </div>
      </div>
    );
  }

  const renderOverview = () => (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        <StatCard label="Người học hoạt động" value={stats.activeLearners} sub="Tài khoản thật trong users, không còn hồ sơ mẫu" icon={Users} tone="blue" />
        <StatCard label="Lượt luyện tập" value={trainingStats.isLoading ? '...' : trainingStats.totalAttempts} sub="Đồng bộ trực tiếp từ collection game_results như trang chủ" icon={BarChart3} tone="green" />
        <StatCard label="Độ chính xác" value={trainingStats.isLoading ? '...' : `${trainingStats.averageAccuracy}%`} sub="Tính bằng tổng score / tổng lượt luyện tập từ database" icon={Gauge} tone="green" />
        <StatCard label="Lượt vượt chuẩn" value={trainingStats.isLoading ? '...' : trainingStats.protectedUsers} sub="Số lượt có score từ 9 trở lên, cùng logic với trang chủ" icon={CheckCircle} tone="green" />
        <StatCard label="Hồ sơ trợ giúp" value={stats.openCases} sub="Hồ sơ mới hoặc đang xem xét" icon={HelpCircle} tone="amber" />
        <StatCard label="Tín hiệu rủi ro cao" value={stats.highRisk} sub="Tình huống cần ưu tiên kiểm tra" icon={Flame} tone="red" />
        <StatCard label="Hàng đợi nội dung" value={stats.reviewQueue} sub="Challenge hoặc lesson đang ở bản nháp" icon={BookOpen} tone="blue" />
      </div>

      <div className="grid gap-4 xl:grid-cols-[1.2fr_0.8fr]">
        <section className="rounded-lg border border-white/10 bg-[#07111f]/90 p-5">
          <div className="mb-5 flex items-center justify-between">
            <div>
              <h3 className="font-bold text-white">Tín hiệu gần đây</h3>
              <p className="text-xs text-slate-400">Dòng thời gian hoạt động và thao tác quản trị mới nhất</p>
            </div>
            <Activity className="text-primary" size={20} />
          </div>
          <div className="space-y-3">
            {dashboardActivity.slice(0, 6).map((item) => (
              <div key={item.id} className="flex items-start gap-3 rounded-lg border border-white/5 bg-black/20 p-3">
                <Radio className="mt-0.5 text-primary" size={16} />
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="font-mono text-sm text-white">{item.action || 'activity.event'}</span>
                    <Pill className={severityClass(item.severity)}>{item.severity || 'info'}</Pill>
                  </div>
                  <p className="mt-1 text-xs text-slate-400">{item.actorRole || 'user'} / {item.targetType || 'system'} / {formatDate(item.createdAt)}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="rounded-lg border border-white/10 bg-[#07111f]/90 p-5">
          <div className="mb-5 flex items-center justify-between">
            <div>
              <h3 className="font-bold text-white">Kỹ năng còn yếu</h3>
              <p className="text-xs text-slate-400">Gợi ý ưu tiên nội dung đào tạo tiếp theo</p>
            </div>
            <Sparkles className="text-amber-300" size={20} />
          </div>
          {['Giọng nói', 'Xác minh', 'Chuyển động', 'Ngữ cảnh', 'Ánh sáng'].map((skill, index) => (
            <div key={skill} className="mb-4">
              <div className="mb-1 flex justify-between text-xs">
                <span className="font-bold uppercase tracking-wide text-gray-300">{skill}</span>
                <span className="text-slate-400">{68 - index * 7}% rủi ro</span>
              </div>
              <div className="h-2 rounded-full bg-white/10">
                <div className="h-2 rounded-full bg-gradient-to-r from-red-500 via-amber-400 to-primary" style={{ width: `${68 - index * 7}%` }} />
              </div>
            </div>
          ))}
        </section>
      </div>
    </div>
  );

  const renderUsers = () => (
    <div className="space-y-5">
      <form onSubmit={createUserRecord} className="rounded-lg border border-primary/20 bg-[#07111f]/90 p-5">
        <div className="mb-4 flex items-center justify-between gap-3">
          <div>
            <h3 className="font-black text-white">Tạo hồ sơ người dùng</h3>
            <p className="mt-1 text-xs text-slate-400">Dùng để tạo hồ sơ quản trị trong Firestore khi tài khoản chưa tự đồng bộ.</p>
          </div>
          <button type="submit" className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-xs font-bold uppercase tracking-wide text-white hover:bg-blue-500">
            <Plus size={15} /> Tạo hồ sơ
          </button>
        </div>
        <div className="grid gap-3 md:grid-cols-4">
          <input value={userForm.email} onChange={(event) => setUserForm((current) => ({ ...current, email: event.target.value }))} placeholder="Email người dùng" className="rounded-lg border border-white/10 bg-black/50 p-3 text-sm text-white outline-none focus:border-primary" />
          <input value={userForm.displayName} onChange={(event) => setUserForm((current) => ({ ...current, displayName: event.target.value }))} placeholder="Tên hiển thị" className="rounded-lg border border-white/10 bg-black/50 p-3 text-sm text-white outline-none focus:border-primary" />
          <select value={userForm.role} onChange={(event) => setUserForm((current) => ({ ...current, role: event.target.value }))} className="rounded-lg border border-white/10 bg-black/70 p-3 text-sm text-white outline-none focus:border-primary">
            <option value="user">Người học</option>
            <option value="editor">Biên tập viên</option>
            <option value="admin">Quản trị viên</option>
          </select>
          <select value={userForm.status} onChange={(event) => setUserForm((current) => ({ ...current, status: event.target.value }))} className="rounded-lg border border-white/10 bg-black/70 p-3 text-sm text-white outline-none focus:border-primary">
            <option value="active">Đang hoạt động</option>
            <option value="inactive">Ít hoạt động</option>
            <option value="flagged">Cần theo dõi</option>
            <option value="banned">Đã khóa</option>
          </select>
        </div>
      </form>

      <div className="rounded-lg border border-red-500/20 bg-red-500/5 p-5">
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <h3 className="flex items-center gap-2 font-black text-red-300">
              <ShieldAlert size={18} /> Danger Zone: Reset toàn bộ tiến độ
            </h3>
            <p className="mt-1 text-xs text-slate-400">Đặt lại điểm số, coin và tiến độ học về 0 cho tất cả người dùng (Trừ Admin).</p>
          </div>
          <button onClick={resetAllUserProgress} disabled={loading} className="inline-flex items-center gap-2 rounded-lg bg-red-600/20 px-4 py-2.5 text-xs font-bold uppercase tracking-wide text-red-300 border border-red-500/30 hover:bg-red-600/30 transition-colors">
            <RefreshCw size={14} className={loading ? 'animate-spin' : ''} /> Reset All Users
          </button>
        </div>
      </div>

      <section className="rounded-lg border border-white/10 bg-[#07111f]/90 p-5">
        <div className="mb-5 flex flex-col justify-between gap-3 lg:flex-row lg:items-center">
          <div>
            <h3 className="font-black text-white">Profile người dùng</h3>
            <p className="mt-1 text-xs text-slate-400">Chọn một dòng trong bảng để xem hồ sơ, DPF coin, case liên quan và nhật ký thao tác.</p>
          </div>
          {selectedUser && (
            <div className="flex flex-wrap gap-2">
              <button onClick={() => changeUserStatus(selectedUser, selectedUser.status === 'flagged' ? 'active' : 'flagged')} className="inline-flex items-center gap-2 rounded-lg border border-amber-500/30 px-3 py-2 text-xs font-bold text-amber-200 hover:bg-amber-500/10">
                <ShieldAlert size={14} /> {selectedUser.status === 'flagged' ? 'Bỏ theo dõi' : 'Theo dõi'}
              </button>
              <button onClick={() => changeUserStatus(selectedUser, selectedUser.status === 'banned' ? 'active' : 'banned')} className="inline-flex items-center gap-2 rounded-lg border border-red-500/30 px-3 py-2 text-xs font-bold text-red-300 hover:bg-red-500/10">
                <Ban size={14} /> {selectedUser.status === 'banned' ? 'Mở khóa' : 'Khóa tài khoản'}
              </button>
              <button onClick={() => deleteUserRecord(selectedUser)} className="inline-flex items-center gap-2 rounded-lg border border-red-500/30 bg-red-500/10 px-3 py-2 text-xs font-bold text-red-300 hover:bg-red-500/20">
                <Trash2 size={14} /> Xóa hồ sơ
              </button>
              <button
                onClick={() => {
                  setDpfForm((current) => ({ ...current, target: selectedUser.email || selectedUser.uid || selectedUser.id, amount: current.amount || '1000' }));
                  setActiveTab('dpf');
                }}
                className="inline-flex items-center gap-2 rounded-lg border border-amber-400/30 px-3 py-2 text-xs font-bold text-amber-200 hover:bg-amber-400/10"
              >
                <Coins size={14} /> Cấp DPF
              </button>
              <button
                onClick={() => {
                  setDpfForm((current) => ({ ...current, target: selectedUser.email || selectedUser.uid || selectedUser.id, amount: current.amount || '100' }));
                  setActiveTab('dpf');
                }}
                className="inline-flex items-center gap-2 rounded-lg border border-red-400/30 px-3 py-2 text-xs font-bold text-red-300 hover:bg-red-400/10"
              >
                <Trash2 size={14} /> Thu hồi DPF
              </button>
            </div>
          )}
        </div>

        {!selectedUser ? (
          <div className="rounded-lg border border-white/10 bg-black/25 p-5 text-sm text-slate-400">
            Chưa có user thật trong Firestore. Hãy tạo hồ sơ hoặc để người dùng đăng nhập để dashboard đồng bộ.
          </div>
        ) : (
          <div className="grid gap-4 xl:grid-cols-[0.9fr_1.1fr]">
            <div className="rounded-lg border border-white/10 bg-black/25 p-4">
              <div className="mb-4 flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <p className="truncate text-xl font-black text-white">{selectedUser.displayName || 'Chưa đặt tên'}</p>
                  <p className="truncate text-sm text-slate-300/85">{selectedUser.email || selectedUser.uid || selectedUser.id}</p>
                </div>
                <Pill className={statusClass(selectedUser.status)}>{userStatusLabels[selectedUser.status || 'active']}</Pill>
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                <div className="rounded border border-white/5 bg-black/30 p-3">
                  <p className="text-xs text-slate-400">Vai trò</p>
                  <p className="mt-1 font-bold text-white">{roleLabels[selectedUser.role || 'user']}</p>
                </div>
                <div className="rounded border border-white/5 bg-black/30 p-3">
                  <p className="text-xs text-slate-400">DPF webBalance</p>
                  <p className="mt-1 font-bold text-amber-200">{(selectedUser.webBalance || 0).toLocaleString('vi-VN')}</p>
                </div>
                <div className="rounded border border-white/5 bg-black/30 p-3">
                  <p className="text-xs text-slate-400">Challenge</p>
                  <p className="mt-1 font-bold text-white">{selectedUser.totalChallenges || 0}</p>
                </div>
                <div className="rounded border border-white/5 bg-black/30 p-3">
                  <p className="text-xs text-slate-400">Độ đúng</p>
                  <p className="mt-1 font-bold text-white">{selectedUser.accuracy || 0}%</p>
                </div>
                <div className="rounded border border-white/5 bg-black/30 p-3">
                  <p className="text-xs text-slate-400">Tạo hồ sơ</p>
                  <p className="mt-1 text-xs text-gray-300">{formatDate(selectedUser.createdAt)}</p>
                </div>
                <div className="rounded border border-white/5 bg-black/30 p-3">
                  <p className="text-xs text-slate-400">Hoạt động cuối</p>
                  <p className="mt-1 text-xs text-gray-300">{formatDate(selectedUser.lastActiveAt)}</p>
                </div>
              </div>
            </div>

            <div className="grid gap-3 md:grid-cols-3">
              <div className="rounded-lg border border-white/10 bg-black/25 p-4">
                <p className="text-xs font-bold uppercase tracking-wide text-slate-400">Case liên quan</p>
                <p className="mt-2 text-2xl font-black text-white">{selectedUserCases.length}</p>
                <div className="mt-3 space-y-2">
                  {selectedUserCases.slice(0, 3).map((item) => (
                    <button key={item.id} onClick={() => setActiveTab('cases')} className="block w-full truncate rounded border border-white/5 px-2 py-2 text-left text-xs text-gray-300 hover:border-primary">
                      {item.title || item.description || item.id}
                    </button>
                  ))}
                </div>
              </div>
              <div className="rounded-lg border border-white/10 bg-black/25 p-4">
                <p className="text-xs font-bold uppercase tracking-wide text-slate-400">Nhật ký</p>
                <p className="mt-2 text-2xl font-black text-white">{selectedUserActivity.length}</p>
                <div className="mt-3 space-y-2">
                  {selectedUserActivity.slice(0, 3).map((item) => (
                    <button key={item.id} onClick={() => setActiveTab('activity')} className="block w-full truncate rounded border border-white/5 px-2 py-2 text-left font-mono text-xs text-gray-300 hover:border-primary">
                      {item.action || item.id}
                    </button>
                  ))}
                </div>
              </div>
              <div className="rounded-lg border border-white/10 bg-black/25 p-4">
                <p className="text-xs font-bold uppercase tracking-wide text-slate-400">DPF ledger</p>
                <p className="mt-2 text-2xl font-black text-white">{selectedUserLedger.length}</p>
                <div className="mt-3 space-y-2">
                  {selectedUserLedger.slice(0, 3).map((entry) => (
                    <button key={entry.id} onClick={() => setActiveTab('dpf')} className="block w-full truncate rounded border border-white/5 px-2 py-2 text-left text-xs text-amber-200 hover:border-amber-400">
                      +{(entry.amount || 0).toLocaleString('vi-VN')} DPF
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </section>

      <section className="overflow-x-auto rounded-lg border border-white/10 bg-[#07111f]/90">
        <div className="grid min-w-[1050px] grid-cols-[1.4fr_0.7fr_0.8fr_0.6fr_0.6fr_0.6fr_0.8fr_1.1fr] gap-3 border-b border-white/10 px-4 py-3 text-[11px] font-bold uppercase tracking-[0.12em] text-slate-400">
          <span>Người dùng</span><span>Vai trò</span><span>Trạng thái</span><span>Challenge</span><span>Độ đúng</span><span>Điểm</span><span>Lần cuối</span><span>Điều khiển</span>
        </div>
        <div className="divide-y divide-white/5">
          {filteredUsers.length === 0 ? (
            <div className="px-4 py-6 text-sm text-slate-400">Không có user thật phù hợp bộ lọc hiện tại.</div>
          ) : filteredUsers.map((user) => (
            <div key={user.id} className="grid min-w-[1050px] grid-cols-[1.4fr_0.7fr_0.8fr_0.6fr_0.6fr_0.6fr_0.8fr_1.1fr] gap-3 px-4 py-4 text-sm">
              <div className="min-w-0">
                <p className="truncate font-bold text-white">{user.displayName || 'Chưa đặt tên'}</p>
                <p className="truncate text-xs text-slate-400">{user.email || user.uid || user.id}</p>
              </div>
              <Pill className="border-primary/30 bg-primary/10 text-blue-200">{roleLabels[user.role || 'user']}</Pill>
              <Pill className={statusClass(user.status)}>{userStatusLabels[user.status || 'active']}</Pill>
              <span className="text-gray-300">{user.totalChallenges || 0}</span>
              <span className="text-gray-300">{user.accuracy || 0}%</span>
              <span className="text-gray-300">{user.score || 0}</span>
              <span className="text-xs text-slate-400">{formatDate(user.lastActiveAt)}</span>
              <div className="flex flex-wrap gap-2">
                <button onClick={() => setSelectedUserId(user.uid || user.id)} className="rounded border border-primary/30 px-2 py-1 text-xs font-bold text-blue-200 hover:bg-primary/10">
                  Profile
                </button>
                <select value={user.role || 'user'} onChange={(event) => changeUserRole(user, event.target.value as Role)} className="rounded border border-white/10 bg-black px-2 py-1 text-xs text-white">
                  <option value="user">Người học</option>
                  <option value="editor">Biên tập</option>
                  <option value="admin">Admin</option>
                </select>
                <button onClick={() => changeUserStatus(user, user.status === 'flagged' ? 'active' : 'flagged')} className="rounded border border-white/10 px-2 py-1 text-xs font-bold text-gray-300 hover:border-amber-400 hover:text-amber-200">
                  Theo dõi
                </button>
                <button onClick={() => changeUserStatus(user, user.status === 'banned' ? 'active' : 'banned')} className="inline-flex items-center gap-1 rounded border border-white/10 px-2 py-1 text-xs font-bold text-gray-300 hover:border-red-400 hover:text-red-300">
                  <Ban size={12} /> {user.status === 'banned' ? 'Mở khóa' : 'Khóa'}
                </button>
                <button onClick={() => deleteUserRecord(user)} className="inline-flex items-center gap-1 rounded border border-red-500/20 bg-red-500/10 px-2 py-1 text-xs font-bold text-red-300 hover:bg-red-500/20">
                  <Trash2 size={12} /> Xóa
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );

  const renderDpfCoin = () => {
    const totalWebBalance = dashboardUsers.reduce((sum, user) => sum + (user.webBalance || 0), 0);
    const totalBonusBalance = dashboardUsers.reduce((sum, user) => sum + (user.bonusBalance || 0), 0);
    const totalRevokedBalance = dashboardUsers.reduce((sum, user) => sum + (user.revokedBalance || 0), 0);

    return (
      <div className="space-y-5">
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          <StatCard
            label="Số dư DPF trên web"
            value={totalWebBalance.toLocaleString('vi-VN')}
            sub="Tổng DPF coin ảo đang nằm trong users.webBalance."
            icon={Coins}
            tone="amber"
          />
          <StatCard
            label="Thưởng từ admin"
            value={totalBonusBalance.toLocaleString('vi-VN')}
            sub="Tổng DPF coin đã cấp thủ công qua dashboard."
            icon={Sparkles}
            tone="green"
          />
          <StatCard
            label="Đã thu hồi"
            value={totalRevokedBalance.toLocaleString('vi-VN')}
            sub="Tổng DPF coin đã bị admin thu hồi khỏi ví web."
            icon={Trash2}
            tone="red"
          />
          <StatCard
            label="Sổ giao dịch gần đây"
            value={dpfLedger.length}
            sub="Số giao dịch DPF coin gần đây đã tải từ dpf_ledger."
            icon={Database}
            tone="blue"
          />
        </div>

        <form onSubmit={grantDpfCoin} className="rounded-lg border border-amber-500/20 bg-[#07111f]/90 p-5">
          <div className="mb-4 flex flex-col justify-between gap-3 lg:flex-row lg:items-center">
            <div>
              <h3 className="font-black text-white">Cấp DPF coin cho người dùng</h3>
              <p className="mt-1 text-xs text-slate-400">
                Nhập email hoặc UID. Coin sẽ được cộng vào webBalance và ghi lại trong dpf_ledger để kiểm tra.
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              <button
                type="submit"
                disabled={dpfBusy}
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-amber-500 px-4 py-2 text-xs font-black uppercase tracking-[0.12em] text-white hover:bg-amber-400 disabled:cursor-not-allowed disabled:opacity-60"
              >
                <Coins size={15} /> {dpfBusy ? 'Đang xử lý...' : 'Cấp DPF coin'}
              </button>
              <button
                type="button"
                onClick={revokeDpfCoin}
                disabled={dpfBusy}
                className="inline-flex items-center justify-center gap-2 rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-2 text-xs font-black uppercase tracking-wide text-red-300 hover:bg-red-500/20 disabled:cursor-not-allowed disabled:opacity-60"
              >
                <Trash2 size={15} /> Thu hồi coin
              </button>
            </div>
          </div>
          <div className="grid gap-3 lg:grid-cols-[1.2fr_0.55fr_1.4fr]">
            <label className="text-xs font-bold uppercase tracking-wide text-slate-400">
              Email hoặc UID
              <input
                value={dpfForm.target}
                onChange={(event) => setDpfForm((current) => ({ ...current, target: event.target.value }))}
                placeholder="deepfense@gmail.com"
                className="mt-2 w-full rounded-lg border border-white/10 bg-black/50 p-3 text-sm text-white outline-none focus:border-amber-400"
              />
            </label>
            <label className="text-xs font-bold uppercase tracking-wide text-slate-400">
              Số DPF coin
              <input
                value={dpfForm.amount}
                onChange={(event) => setDpfForm((current) => ({ ...current, amount: event.target.value }))}
                inputMode="numeric"
                placeholder="1000"
                className="mt-2 w-full rounded-lg border border-white/10 bg-black/50 p-3 text-sm text-white outline-none focus:border-amber-400"
              />
            </label>
            <label className="text-xs font-bold uppercase tracking-wide text-slate-400">
              Lý do
              <input
                value={dpfForm.reason}
                onChange={(event) => setDpfForm((current) => ({ ...current, reason: event.target.value }))}
                placeholder="Admin bonus DPF coin"
                className="mt-2 w-full rounded-lg border border-white/10 bg-black/50 p-3 text-sm text-white outline-none focus:border-amber-400"
              />
            </label>
          </div>
          <p className="mt-4 text-xs leading-relaxed text-slate-400">
            Nút cấp sẽ cộng vào webBalance. Nút thu hồi sẽ trừ khỏi webBalance, ghi debit ledger `admin_revoke` và không cho số dư âm.
          </p>
        </form>

        <section className="overflow-x-auto rounded-lg border border-white/10 bg-[#07111f]/90">
          <div className="grid min-w-[1120px] grid-cols-[1.2fr_0.75fr_0.75fr_0.75fr_0.75fr_0.75fr_1.15fr] gap-3 border-b border-white/10 px-4 py-3 text-[11px] font-bold uppercase tracking-[0.12em] text-slate-400">
            <span>Người dùng</span>
            <span>Web balance</span>
            <span>Đã kiếm</span>
            <span>Admin bonus</span>
            <span>Đã thu hồi</span>
            <span>Đã dùng</span>
            <span>Điều khiển</span>
          </div>
          <div className="divide-y divide-white/5">
            {dashboardUsers.length === 0 ? (
              <div className="px-4 py-6 text-sm text-slate-400">
                Chưa có user thật trong collection users. Khi người dùng đăng nhập hoặc bạn tạo hồ sơ ở tab User, số dư DPF sẽ hiện tại đây.
              </div>
            ) : (
              dashboardUsers.map((user) => (
                <div key={user.id} className="grid min-w-[1120px] grid-cols-[1.2fr_0.75fr_0.75fr_0.75fr_0.75fr_0.75fr_1.15fr] gap-3 px-4 py-4 text-sm">
                  <div className="min-w-0">
                    <p className="truncate font-bold text-white">{user.displayName || user.email || user.uid || user.id}</p>
                    <p className="truncate text-xs text-slate-400">{user.email || user.uid || user.id}</p>
                  </div>
                  <span className="font-black text-amber-200">{(user.webBalance || 0).toLocaleString('vi-VN')}</span>
                  <span className="text-gray-300">{(user.earnedBalance || 0).toLocaleString('vi-VN')}</span>
                  <span className="text-gray-300">{(user.bonusBalance || 0).toLocaleString('vi-VN')}</span>
                  <span className="text-red-300">{(user.revokedBalance || 0).toLocaleString('vi-VN')}</span>
                  <span className="text-gray-300">{(user.spentBalance || 0).toLocaleString('vi-VN')}</span>
                  <div className="flex flex-wrap gap-2">
                    <button onClick={() => { setSelectedUserId(user.uid || user.id); setActiveTab('users'); }} className="rounded border border-primary/30 px-2 py-1 text-xs font-bold text-blue-200 hover:bg-primary/10">
                      Mở profile
                    </button>
                    <button onClick={() => setDpfForm((current) => ({ ...current, target: user.email || user.uid || user.id }))} className="rounded border border-amber-400/30 px-2 py-1 text-xs font-bold text-amber-200 hover:bg-amber-400/10">
                      Chọn cấp coin
                    </button>
                    <button onClick={() => setDpfForm((current) => ({ ...current, target: user.email || user.uid || user.id, amount: current.amount || '100', reason: 'Admin revoked DPF coin' }))} className="rounded border border-red-400/30 px-2 py-1 text-xs font-bold text-red-300 hover:bg-red-400/10">
                      Chọn thu hồi
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </section>

        <section className="overflow-x-auto rounded-lg border border-white/10 bg-[#07111f]/90">
          <div className="grid min-w-[1080px] grid-cols-[0.9fr_0.7fr_0.8fr_0.9fr_1.2fr_0.9fr_0.6fr] gap-3 border-b border-white/10 px-4 py-3 text-[11px] font-bold uppercase tracking-[0.12em] text-slate-400">
            <span>Thời gian</span>
            <span>Loại</span>
            <span>Số lượng</span>
            <span>Số dư sau</span>
            <span>Người nhận</span>
            <span>Nguồn</span>
            <span>Xóa</span>
          </div>
          <div className="divide-y divide-white/5">
            {dpfLedger.length === 0 ? (
              <div className="px-4 py-6 text-sm text-slate-400">Chưa có giao dịch DPF coin nào trong dpf_ledger.</div>
            ) : (
              dpfLedger.map((entry) => {
                const targetEmail = typeof entry.metadata?.targetEmail === 'string' ? entry.metadata.targetEmail : '';
                return (
                  <div key={entry.id} className="grid min-w-[1080px] grid-cols-[0.9fr_0.7fr_0.8fr_0.9fr_1.2fr_0.9fr_0.6fr] gap-3 px-4 py-4 text-sm">
                    <span className="text-xs text-slate-400">{formatDate(entry.createdAt)}</span>
                    <Pill className={entry.direction === 'debit' ? 'border-red-500/30 bg-red-500/10 text-red-300' : 'border-emerald-500/30 bg-emerald-500/10 text-emerald-200'}>
                      {entry.direction || 'credit'}
                    </Pill>
                    <span className="font-black text-white">{(entry.amount || 0).toLocaleString('en-US')}</span>
                    <span className="text-gray-300">{(entry.balanceAfter || 0).toLocaleString('en-US')}</span>
                    <span className="truncate text-gray-300">{targetEmail || entry.uid || 'unknown'}</span>
                    <span className="truncate text-xs text-slate-400">{entry.source || entry.reason || 'admin_bonus'}</span>
                    <button onClick={() => deleteDpfLedgerEntry(entry)} className="inline-flex w-fit items-center gap-1 rounded border border-red-500/20 bg-red-500/10 px-2 py-1 text-xs font-bold text-red-300 hover:bg-red-500/20">
                      <Trash2 size={12} /> Xóa
                    </button>
                  </div>
                );
              })
            )}
          </div>
        </section>
      </div>
    );
  };

  const renderCases = () => (
    <div className="grid gap-4">
      {filteredCases.length === 0 ? (
        <section className="rounded-lg border border-white/10 bg-[#07111f]/90 p-5 text-sm text-slate-400">
          Không có hồ sơ trợ giúp thật phù hợp bộ lọc hiện tại.
        </section>
      ) : filteredCases.map((item) => {
        const draft = caseDrafts[item.id] || {
          status: (item.status || 'new') as CaseStatus,
          severity: (item.severity || 'medium') as Severity,
          responseNote: item.responseNote || '',
        };

        return (
          <section key={`${item.caseType}-${item.id}`} className="rounded-lg border border-white/10 bg-[#07111f]/90 p-5">
            <div className="flex flex-col justify-between gap-4 lg:flex-row">
              <div className="min-w-0 flex-1">
                <div className="mb-3 flex flex-wrap items-center gap-2">
                  <Pill className={statusClass(item.status)}>{caseStatusLabels[item.status || 'new']}</Pill>
                  <Pill className={severityClass(item.severity)}>{severityLabels[item.severity || 'medium']}</Pill>
                  <Pill className="border-white/10 bg-white/5 text-gray-300">{item.caseType || 'other'}</Pill>
                  <span className="text-xs text-slate-400">{formatDate(item.submittedAt)}</span>
                </div>
                <h3 className="text-lg font-black text-white">{item.title || item.name || 'Hồ sơ trợ giúp'}</h3>
                <div className="mt-1 flex flex-wrap items-center gap-3 text-sm text-slate-300/85">
                  <span>{item.name || 'Ẩn danh'}</span>
                  {item.email && <a href={`mailto:${item.email}`} className="inline-flex items-center gap-1 text-primary hover:underline"><Mail size={14} />{item.email}</a>}
                </div>
                <p className="mt-4 rounded-lg border border-white/5 bg-black/30 p-4 text-sm leading-relaxed text-gray-300">
                  {item.description || item.desc || 'Chưa có mô tả chi tiết.'}
                </p>
                <div className="mt-4 grid gap-3 md:grid-cols-2">
                  <label className="text-xs font-bold uppercase tracking-wide text-slate-400">
                    Trạng thái hồ sơ
                    <select value={draft.status} onChange={(event) => setCaseDrafts((current) => ({ ...current, [item.id]: { ...draft, status: event.target.value as CaseStatus } }))} className="mt-2 w-full rounded-lg border border-white/10 bg-black/70 px-3 py-2 text-sm text-white">
                      <option value="new">Mới nhận</option>
                      <option value="reviewing">Đang xem xét</option>
                      <option value="replied">Đã phản hồi</option>
                      <option value="closed">Đã đóng</option>
                      <option value="archived">Lưu trữ</option>
                    </select>
                  </label>
                  <label className="text-xs font-bold uppercase tracking-wide text-slate-400">
                    Mức độ ưu tiên
                    <select value={draft.severity} onChange={(event) => setCaseDrafts((current) => ({ ...current, [item.id]: { ...draft, severity: event.target.value as Severity } }))} className="mt-2 w-full rounded-lg border border-white/10 bg-black/70 px-3 py-2 text-sm text-white">
                      <option value="low">Thấp</option>
                      <option value="medium">Trung bình</option>
                      <option value="high">Cao</option>
                    </select>
                  </label>
                </div>
                <label className="mt-3 block text-xs font-bold uppercase tracking-wide text-slate-400">
                  Ghi chú phản hồi
                  <textarea value={draft.responseNote} onChange={(event) => setCaseDrafts((current) => ({ ...current, [item.id]: { ...draft, responseNote: event.target.value } }))} rows={3} placeholder="Nội dung có dấu hiệu cần xác minh thêm..." className="mt-2 w-full rounded-lg border border-white/10 bg-black/50 p-3 text-sm text-white outline-none focus:border-primary" />
                </label>
                <div className="mt-4 flex flex-wrap gap-2">
                  {item.url && <a href={item.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded border border-white/10 px-3 py-2 text-xs font-bold text-gray-300 hover:text-primary">Mở đường dẫn <ExternalLink size={13} /></a>}
                  {item.attachmentUrl && <a href={item.attachmentUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded border border-white/10 px-3 py-2 text-xs font-bold text-gray-300 hover:text-primary"><Paperclip size={13} />Tệp đính kèm</a>}
                </div>
              </div>
              <div className="flex min-w-[220px] flex-col gap-2 border-t border-white/10 pt-4 lg:border-l lg:border-t-0 lg:pl-4 lg:pt-0">
                <button onClick={() => saveCaseDraft(item)} className="inline-flex items-center justify-center gap-2 rounded-lg bg-primary px-3 py-3 text-xs font-bold text-white hover:bg-blue-500">
                  <Save size={16} /> Lưu hồ sơ
                </button>
                <a
                  href={`https://mail.google.com/mail/u/0/?view=cm&fs=1&to=${encodeURIComponent(item.email || '')}&su=${encodeURIComponent('Phản hồi từ Trung tâm trợ giúp Deepfense')}&body=${encodeURIComponent(`Chào ${item.name || 'bạn'},\n\n${draft.responseNote || 'Nội dung bạn gửi có một số dấu hiệu cần xác minh thêm. Deepfense khuyến nghị không chuyển tiền, không chia sẻ OTP/thông tin cá nhân và liên hệ người liên quan qua kênh khác trước khi hành động.'}\n\nDeepfense chỉ hỗ trợ giáo dục và nhận diện rủi ro, không thay thế kết luận pháp lý.\n\nTrân trọng,\nDeepfense Help Center`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-lg bg-blue-600/20 px-3 py-3 text-xs font-bold text-blue-200 hover:bg-blue-600/30"
                >
                  <Send size={16} /> Gửi email
                </a>
                <button onClick={() => updateCaseStatus(item, item.status === 'reviewing' ? 'closed' : 'reviewing')} className="inline-flex items-center justify-center gap-2 rounded-lg bg-emerald-600/20 px-3 py-3 text-xs font-bold text-emerald-200 hover:bg-emerald-600/30">
                  <CheckCircle size={16} /> {item.status === 'reviewing' ? 'Đóng hồ sơ' : 'Đánh dấu đang xem'}
                </button>
                <button onClick={() => deleteCase(item)} className="inline-flex items-center justify-center gap-2 rounded-lg bg-red-600/15 px-3 py-3 text-xs font-bold text-red-300 hover:bg-red-600/25">
                  <Trash2 size={16} /> Xóa
                </button>
              </div>
            </div>
          </section>
        );
      })}
    </div>
  );

  const renderStudio = () => (
    <div className="space-y-5">
      <form onSubmit={createChallenge} className="rounded-lg border border-primary/20 bg-[#07111f]/90 p-5">
        <div className="mb-5 flex items-center justify-between gap-3">
          <div>
            <h3 className="font-black text-white">Tạo challenge mới</h3>
            <p className="mt-1 text-xs text-slate-400">Tạo nội dung huấn luyện mới cho academy và challenge.</p>
          </div>
          <button type="submit" className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-xs font-bold uppercase tracking-wide text-white hover:bg-blue-500">
            <Plus size={15} /> Tạo mới
          </button>
        </div>
        <div className="grid gap-3 md:grid-cols-2">
          <input value={challengeForm.title} onChange={(event) => setChallengeForm((current) => ({ ...current, title: event.target.value }))} placeholder="Tiêu đề challenge" className="rounded-lg border border-white/10 bg-black/50 p-3 text-sm text-white outline-none focus:border-primary" />
          <input value={challengeForm.videoUrl} onChange={(event) => setChallengeForm((current) => ({ ...current, videoUrl: event.target.value }))} placeholder="Link video hoặc YouTube" className="rounded-lg border border-white/10 bg-black/50 p-3 text-sm text-white outline-none focus:border-primary" />
          <select value={challengeForm.type} onChange={(event) => setChallengeForm((current) => ({ ...current, type: event.target.value }))} className="rounded-lg border border-white/10 bg-black/70 p-3 text-sm text-white outline-none focus:border-primary">
            <option value="compare_ab">So sánh A/B</option>
            <option value="single_video_detect">Nhận diện một video</option>
            <option value="scam_scenario">Tình huống lừa đảo</option>
            <option value="quiz">Câu hỏi kiến thức</option>
          </select>
          <input value={challengeForm.correctAnswer} onChange={(event) => setChallengeForm((current) => ({ ...current, correctAnswer: event.target.value }))} placeholder="Đáp án đúng" className="rounded-lg border border-white/10 bg-black/50 p-3 text-sm text-white outline-none focus:border-primary" />
          <select value={challengeForm.difficulty} onChange={(event) => setChallengeForm((current) => ({ ...current, difficulty: event.target.value }))} className="rounded-lg border border-white/10 bg-black/70 p-3 text-sm text-white outline-none focus:border-primary">
            <option value="easy">Dễ</option>
            <option value="medium">Trung bình</option>
            <option value="hard">Khó</option>
          </select>
          <select value={challengeForm.status} onChange={(event) => setChallengeForm((current) => ({ ...current, status: event.target.value }))} className="rounded-lg border border-white/10 bg-black/70 p-3 text-sm text-white outline-none focus:border-primary">
            <option value="draft">Bản nháp</option>
            <option value="published">Xuất bản</option>
            <option value="archived">Lưu trữ</option>
          </select>
          <input value={challengeForm.skillTags} onChange={(event) => setChallengeForm((current) => ({ ...current, skillTags: event.target.value }))} placeholder="Skill tags: voice, verification" className="rounded-lg border border-white/10 bg-black/50 p-3 text-sm text-white outline-none focus:border-primary md:col-span-2" />
          <textarea value={challengeForm.description} onChange={(event) => setChallengeForm((current) => ({ ...current, description: event.target.value }))} rows={3} placeholder="Mô tả tình huống" className="rounded-lg border border-white/10 bg-black/50 p-3 text-sm text-white outline-none focus:border-primary" />
          <textarea value={challengeForm.explanation} onChange={(event) => setChallengeForm((current) => ({ ...current, explanation: event.target.value }))} rows={3} placeholder="Giải thích sau khi người dùng trả lời" className="rounded-lg border border-white/10 bg-black/50 p-3 text-sm text-white outline-none focus:border-primary" />
        </div>
      </form>

      <div className="grid gap-4 lg:grid-cols-3">
        {dashboardChallenges.map((challenge) => (
          <section key={challenge.id} className="rounded-lg border border-white/10 bg-[#07111f]/90 p-5">
            <div className="mb-4 flex items-center justify-between gap-3">
              <Pill className={statusClass(challenge.status)}>{challengeStatusLabels[challenge.status || 'draft']}</Pill>
              <Pill className={severityClass(challenge.difficulty === 'hard' ? 'high' : challenge.difficulty === 'medium' ? 'medium' : 'low')}>{difficultyLabels[challenge.difficulty || 'medium']}</Pill>
            </div>
            <h3 className="text-lg font-black text-white">{challenge.title || 'Challenge chưa đặt tên'}</h3>
            <p className="mt-2 font-mono text-xs text-primary">{challengeTypeLabels[challenge.type || 'single_video_detect'] || challenge.type}</p>
            <p className="mt-3 line-clamp-3 text-sm text-slate-300/85">{challenge.description || 'Chưa có mô tả.'}</p>
            <div className="mt-4 flex flex-wrap gap-2">
              {(challenge.skillTags || ['verification']).map((tag) => (
                <span key={tag} className="rounded bg-white/10 px-2 py-1 text-[11px] font-bold text-gray-300">{tag}</span>
              ))}
            </div>
            <div className="mt-5 grid grid-cols-2 gap-3 text-sm">
              <div className="rounded border border-white/5 bg-black/25 p-3">
                <p className="text-xs text-slate-400">Lượt chơi</p>
                <p className="mt-1 font-black text-white">{challenge.totalPlays || 0}</p>
              </div>
              <div className="rounded border border-white/5 bg-black/25 p-3">
                <p className="text-xs text-slate-400">Tỷ lệ đúng</p>
                <p className="mt-1 font-black text-white">{challenge.correctRate || 0}%</p>
              </div>
            </div>
            <div className="mt-4 grid grid-cols-3 gap-2">
              {(['draft', 'published', 'archived'] as ChallengeRecord['status'][]).map((status) => (
                <button key={status} onClick={() => updateChallengeStatus(challenge, status)} className="rounded border border-white/10 px-2 py-2 text-[11px] font-bold text-gray-300 hover:border-primary hover:text-white">
                  {challengeStatusLabels[status || 'draft']}
                </button>
              ))}
              <button onClick={() => deleteChallenge(challenge)} className="col-span-3 inline-flex items-center justify-center gap-2 rounded border border-red-500/20 bg-red-500/10 px-2 py-2 text-[11px] font-bold text-red-300 hover:bg-red-500/20">
                <Trash2 size={13} /> Xóa challenge
              </button>
            </div>
          </section>
        ))}
      </div>
    </div>
  );

  const renderActivity = () => (
    <section className="rounded-lg border border-white/10 bg-[#07111f]/90">
      {dashboardActivity.length === 0 ? (
        <div className="px-5 py-6 text-sm text-slate-400">Chưa có activity log nào trong Firestore.</div>
      ) : dashboardActivity.map((item) => (
        <div key={item.id} className="grid gap-3 border-b border-white/5 px-5 py-4 text-sm md:grid-cols-[1fr_0.5fr_0.8fr_0.8fr_0.35fr]">
          <div>
            <p className="font-mono font-bold text-white">{item.action || 'activity.event'}</p>
            <p className="text-xs text-slate-400">Tác nhân: {item.actorId || 'hệ thống'}</p>
          </div>
          <Pill className={severityClass(item.severity)}>{severityLabels[item.severity || 'info']}</Pill>
          <span className="text-slate-300/85">{item.targetType || 'system'} / {item.targetId || '-'}</span>
          <span className="text-xs text-slate-400">{formatDate(item.createdAt)}</span>
          <button onClick={() => deleteActivityLog(item)} className="inline-flex w-fit items-center gap-1 rounded border border-red-500/20 bg-red-500/10 px-2 py-1 text-xs font-bold text-red-300 hover:bg-red-500/20">
            <Trash2 size={12} /> Xóa
          </button>
        </div>
      ))}
    </section>
  );

  const renderSecurity = () => (
    <div className="space-y-5">
      <form onSubmit={createSecurityEvent} className="rounded-lg border border-amber-500/20 bg-[#07111f]/90 p-5">
        <div className="mb-4 flex items-center justify-between gap-3">
          <div>
            <h3 className="font-black text-white">Tạo sự kiện bảo mật</h3>
            <p className="mt-1 text-xs text-slate-400">Ghi nhận truy cập bị từ chối, link đáng ngờ, đổi vai trò hoặc gửi biểu mẫu bất thường.</p>
          </div>
          <button type="submit" className="inline-flex items-center gap-2 rounded-lg bg-amber-500 px-4 py-2 text-xs font-bold uppercase tracking-[0.12em] text-white hover:bg-amber-400">
            <Plus size={15} /> Ghi sự kiện
          </button>
        </div>
        <div className="grid gap-3 md:grid-cols-4">
          <select value={eventForm.eventType} onChange={(event) => setEventForm((current) => ({ ...current, eventType: event.target.value }))} className="rounded-lg border border-white/10 bg-black/70 p-3 text-sm text-white outline-none focus:border-amber-400">
            <option value="login_failed">Đăng nhập thất bại</option>
            <option value="repeated_login_failed">Đăng nhập thất bại nhiều lần</option>
            <option value="permission_denied">Bị từ chối quyền truy cập</option>
            <option value="role_changed">Thay đổi vai trò</option>
            <option value="suspicious_help_case">Hồ sơ trợ giúp đáng ngờ</option>
            <option value="suspicious_upload_or_link">Upload/link đáng ngờ</option>
            <option value="high_frequency_submission">Gửi biểu mẫu tần suất cao</option>
          </select>
          <input value={eventForm.actorId} onChange={(event) => setEventForm((current) => ({ ...current, actorId: event.target.value }))} placeholder="ID người dùng/tác nhân" className="rounded-lg border border-white/10 bg-black/50 p-3 text-sm text-white outline-none focus:border-amber-400" />
          <select value={eventForm.severity} onChange={(event) => setEventForm((current) => ({ ...current, severity: event.target.value }))} className="rounded-lg border border-white/10 bg-black/70 p-3 text-sm text-white outline-none focus:border-amber-400">
            <option value="notice">Đáng chú ý</option>
            <option value="warning">Cảnh báo</option>
            <option value="high">Cao</option>
            <option value="critical">Nghiêm trọng</option>
          </select>
          <input value={eventForm.details} onChange={(event) => setEventForm((current) => ({ ...current, details: event.target.value }))} placeholder="Ghi chú chi tiết" className="rounded-lg border border-white/10 bg-black/50 p-3 text-sm text-white outline-none focus:border-amber-400" />
        </div>
      </form>

      <section className="rounded-lg border border-white/10 bg-[#07111f]/90">
        {dashboardSecurity.length === 0 ? (
          <div className="px-5 py-6 text-sm text-slate-400">Chưa có security event nào trong Firestore.</div>
        ) : dashboardSecurity.map((item) => (
          <div key={item.id} className="grid gap-3 border-b border-white/5 px-5 py-4 text-sm md:grid-cols-[1fr_0.5fr_0.6fr_0.8fr_0.35fr]">
            <div>
              <p className="font-mono font-bold text-white">{item.eventType || 'security.event'}</p>
              <p className="text-xs text-slate-400">Tác nhân: {item.actorId || 'không rõ'} / IP: {item.sourceIp || 'ẩn'}</p>
            </div>
            <Pill className={severityClass(item.severity)}>{severityLabels[item.severity || 'notice']}</Pill>
            <span className="text-slate-300/85">{roleLabels[item.actorRole || 'user']}</span>
            <span className="text-xs text-slate-400">{formatDate(item.createdAt)}</span>
            <button onClick={() => deleteSecurityEvent(item)} className="inline-flex w-fit items-center gap-1 rounded border border-red-500/20 bg-red-500/10 px-2 py-1 text-xs font-bold text-red-300 hover:bg-red-500/20">
              <Trash2 size={12} /> Xóa
            </button>
          </div>
        ))}
      </section>
    </div>
  );

  const renderDataModel = () => (
    <div className="grid gap-4 lg:grid-cols-2">
      {[
        ['users', 'uid, email, displayName, role, status, score, createdAt, lastActiveAt'],
        ['user_profiles', 'uid, ageGroup, totalChallenges, correctAnswers, accuracy, badges, consentVersion'],
        ['challenges', 'title, description, type, videoUrl, correctAnswer, explanation, skillTags, difficulty, status'],
        ['challenge_submissions', 'userId, challengeId, answer, isCorrect, score, completionTime, createdAt'],
        ['help_center_cases', 'name, email, userId, title, caseType, severity, status, responseNote, submittedAt'],
        ['dpf_ledger', 'uid, direction, source, amount, balanceBefore, balanceAfter, reason, status, metadata, createdAt'],
        ['dpf_daily_quotas', 'uid, rewardDate, source, count, amount, updatedAt'],
        ['activity_logs', 'actorId, actorRole, action, targetType, targetId, severity, metadata, createdAt'],
        ['security_events', 'eventType, actorId, actorRole, severity, sourceIp, userAgent, details, createdAt'],
        ['content_lessons', 'title, slug, body, category, status, createdBy, updatedBy, createdAt, updatedAt'],
      ].map(([collectionName, fields]) => (
        <section key={collectionName} className="rounded-lg border border-white/10 bg-[#07111f]/90 p-5">
          <p className="font-mono text-sm font-black text-primary">{collectionName}</p>
          <p className="mt-3 text-sm leading-relaxed text-slate-300/85">{fields}</p>
        </section>
      ))}
    </div>
  );

  const renderActiveTab = () => {
    switch (activeTab) {
      case 'users':
        return renderUsers();
      case 'dpf':
        return renderDpfCoin();
      case 'cases':
        return renderCases();
      case 'studio':
        return renderStudio();
      case 'activity':
        return renderActivity();
      case 'security':
        return renderSecurity();
      case 'data':
        return renderDataModel();
      default:
        return renderOverview();
    }
  };

  return (
    <div className="mx-auto max-w-7xl animate-in fade-in">
      <div className="mb-6 overflow-hidden rounded-lg border border-white/10 bg-[#07111f]/90 shadow-2xl shadow-black/30">
        <div className="flex flex-col justify-between gap-4 border-b border-white/10 p-5 lg:flex-row lg:items-center">
          <div>
            <div className="mb-2 flex items-center gap-2">
              <Shield className="text-primary" size={20} />
              <p className="text-xs font-bold uppercase tracking-[0.26em] text-primary">Trung tâm điều khiển Deepfense</p>
            </div>
            <h1 className="text-2xl font-black text-white md:text-3xl">Bảng quản trị Academy kiểu SOC</h1>
            <p className="mt-2 max-w-3xl text-sm text-slate-300/85">
              Quản trị người dùng, biên tập viên, quản trị viên, hồ sơ trợ giúp, xưởng nội dung, nhật ký hoạt động và sự kiện bảo mật.
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <button onClick={exportDashboardJson} className="inline-flex items-center justify-center gap-2 rounded-lg border border-white/10 px-4 py-3 text-xs font-bold uppercase tracking-wide text-gray-300 hover:border-primary hover:text-white">
              <Download size={16} /> Xuất JSON
            </button>
            <button onClick={exportCasesCsv} className="inline-flex items-center justify-center gap-2 rounded-lg border border-white/10 px-4 py-3 text-xs font-bold uppercase tracking-wide text-gray-300 hover:border-primary hover:text-white">
              <Download size={16} /> Xuất Case CSV
            </button>
            <button onClick={() => signOut(auth)} className="inline-flex items-center justify-center gap-2 rounded-lg border border-white/10 px-4 py-3 text-xs font-bold uppercase tracking-wide text-gray-300 hover:border-primary hover:text-white">
              <LogOut size={16} /> Đăng xuất
            </button>
          </div>
        </div>
        {actionMessage && (
          <div className="border-b border-emerald-500/20 bg-emerald-500/10 px-5 py-3 text-sm font-bold text-emerald-200">
            {actionMessage}
          </div>
        )}

        <div className="grid gap-0 lg:grid-cols-[250px_1fr]">
          <aside className="border-b border-white/10 p-3 lg:border-b-0 lg:border-r">
            <div className="space-y-1">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => {
                      setActiveTab(tab.id);
                      setStatusFilter('all');
                      setRoleFilter('all');
                      setSearch('');
                    }}
                    className={`flex w-full items-center gap-3 rounded-lg px-3 py-3 text-left text-sm font-bold transition-colors ${isActive ? 'bg-primary text-white' : 'text-slate-300/85 hover:bg-white/5 hover:text-white'}`}
                  >
                    <Icon size={17} />
                    {tab.label}
                  </button>
                );
              })}
            </div>
          </aside>

          <div className="min-w-0 p-4 md:p-5">
            <div className="mb-5 flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
              <div className="flex flex-wrap gap-2">
                {timeRangeOptions.map((option) => (
                  <button key={option} onClick={() => setTimeRange(option)} className={`rounded-lg border px-3 py-2 text-xs font-bold ${timeRange === option ? 'border-primary bg-primary/15 text-blue-200' : 'border-white/10 text-slate-300/85 hover:text-white'}`}>
                    {option}
                  </button>
                ))}
                <button onClick={resetControls} className="inline-flex items-center gap-2 rounded-lg border border-white/10 px-3 py-2 text-xs font-bold text-slate-300/85 hover:text-white">
                  <RefreshCw size={14} /> Đặt lại
                </button>
              </div>

              {activeTab !== 'overview' && activeTab !== 'data' && (
                <div className="flex flex-col gap-2 sm:flex-row">
                  <label className="flex items-center gap-2 rounded-lg border border-white/10 bg-black/30 px-3 py-2">
                    <Search size={16} className="text-slate-400" />
                    <input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Tìm kiếm..." className="w-full bg-transparent text-sm text-white outline-none placeholder:text-slate-600" />
                  </label>
                  {activeTab === 'users' && (
                    <select value={roleFilter} onChange={(event) => setRoleFilter(event.target.value as 'all' | Role)} className="rounded-lg border border-white/10 bg-black/70 px-3 py-2 text-sm text-white">
                      <option value="all">Tất cả vai trò</option>
                      <option value="user">Người học</option>
                      <option value="editor">Biên tập viên</option>
                      <option value="admin">Quản trị viên</option>
                    </select>
                  )}
                  {(activeTab === 'users' || activeTab === 'cases') && (
                    <label className="flex items-center gap-2 rounded-lg border border-white/10 bg-black/70 px-3 py-2 text-sm text-white">
                      <Filter size={15} className="text-slate-400" />
                      <select value={statusFilter} onChange={(event) => setStatusFilter(event.target.value)} className="bg-transparent outline-none">
                        <option value="all">Tất cả trạng thái</option>
                        {activeTab === 'users' ? (
                          <>
                            <option value="active">Đang hoạt động</option>
                            <option value="inactive">Ít hoạt động</option>
                            <option value="flagged">Cần theo dõi</option>
                            <option value="banned">Đã khóa</option>
                          </>
                        ) : (
                          <>
                            <option value="new">Mới nhận</option>
                            <option value="reviewing">Đang xem xét</option>
                            <option value="replied">Đã phản hồi</option>
                            <option value="closed">Đã đóng</option>
                            <option value="archived">Lưu trữ</option>
                          </>
                        )}
                      </select>
                    </label>
                  )}
                </div>
              )}
            </div>

            {loading ? (
              <div className="grid gap-4 md:grid-cols-3">
                {[1, 2, 3].map((item) => <div key={item} className="h-40 animate-pulse rounded-lg border border-white/5 bg-white/5" />)}
              </div>
            ) : renderActiveTab()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Admin;
