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
  | { ok: true; amount: number; balanceAfter: number; ledgerId: string; alreadyGranted?: boolean }
  | { ok: false; code?: string; message?: string };

interface TrainingStats {
  protectedUsers: number;
  totalAttempts: number;
  totalScore: number;
  averageAccuracy: number;
  isLoading: boolean;
}

type AdminTab = 'overview' | 'users' | 'dpf' | 'cases' | 'studio' | 'activity' | 'security' | 'data';

const timeRangeOptions = ['HÃ´m nay', '7 ngÃ y', '30 ngÃ y', 'Táº¥t cáº£'];

const tabs: Array<{ id: AdminTab; label: string; icon: LucideIcon }> = [
  { id: 'overview', label: 'Tá»•ng quan SOC', icon: Gauge },
  { id: 'users', label: 'GiÃ¡m sÃ¡t ngÆ°á»i dÃ¹ng', icon: Users },
  { id: 'dpf', label: 'DPF coin', icon: Coins },
  { id: 'cases', label: 'Há»“ sÆ¡ trá»£ giÃºp', icon: HelpCircle },
  { id: 'studio', label: 'XÆ°á»Ÿng ná»™i dung', icon: Layers },
  { id: 'activity', label: 'Nháº­t kÃ½ hoáº¡t Ä‘á»™ng', icon: Activity },
  { id: 'security', label: 'Sá»± kiá»‡n báº£o máº­t', icon: ShieldAlert },
  { id: 'data', label: 'MÃ´ hÃ¬nh dá»¯ liá»‡u', icon: Database },
];

const roleLabels: Record<Role, string> = {
  user: 'NgÆ°á»i há»c',
  editor: 'BiÃªn táº­p viÃªn',
  admin: 'Quáº£n trá»‹ viÃªn',
};

const userStatusLabels: Record<NonNullable<UserRecord['status']>, string> = {
  active: 'Äang hoáº¡t Ä‘á»™ng',
  inactive: 'Ãt hoáº¡t Ä‘á»™ng',
  flagged: 'Cáº§n theo dÃµi',
  banned: 'ÄÃ£ khÃ³a',
};

const caseStatusLabels: Record<CaseStatus, string> = {
  new: 'Má»›i nháº­n',
  reviewing: 'Äang xem xÃ©t',
  replied: 'ÄÃ£ pháº£n há»“i',
  closed: 'ÄÃ£ Ä‘Ã³ng',
  archived: 'LÆ°u trá»¯',
  processed: 'ÄÃ£ xá»­ lÃ½',
};

const severityLabels: Record<Severity, string> = {
  info: 'ThÃ´ng tin',
  notice: 'ÄÃ¡ng chÃº Ã½',
  low: 'Tháº¥p',
  medium: 'Trung bÃ¬nh',
  warning: 'Cáº£nh bÃ¡o',
  high: 'Cao',
  critical: 'NghiÃªm trá»ng',
};

const challengeStatusLabels: Record<NonNullable<ChallengeRecord['status']>, string> = {
  draft: 'Báº£n nhÃ¡p',
  published: 'ÄÃ£ xuáº¥t báº£n',
  archived: 'LÆ°u trá»¯',
};

const difficultyLabels: Record<NonNullable<ChallengeRecord['difficulty']>, string> = {
  easy: 'Dá»…',
  medium: 'Trung bÃ¬nh',
  hard: 'KhÃ³',
};

const challengeTypeLabels: Record<string, string> = {
  compare_ab: 'So sÃ¡nh A/B',
  single_video_detect: 'Nháº­n diá»‡n má»™t video',
  scam_scenario: 'TÃ¬nh huá»‘ng lá»«a Ä‘áº£o',
  quiz: 'CÃ¢u há»i kiáº¿n thá»©c',
};

const formatDate = (value?: Timestamp) => {
  if (!value?.seconds) return 'ChÆ°a ghi nháº­n';
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
          <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-gray-500">{label}</p>
          <div className="mt-3 text-3xl font-black text-white">{value}</div>
        </div>
        <div className={`rounded-lg border p-2 ${tones[tone]}`}>
          <Icon size={20} />
        </div>
      </div>
      <p className="mt-4 text-xs text-gray-400">{sub}</p>
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
    showActionMessage('ÄÃ£ xuáº¥t dá»¯ liá»‡u dashboard dáº¡ng JSON.');
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
    showActionMessage('ÄÃ£ xuáº¥t danh sÃ¡ch há»“ sÆ¡ trá»£ giÃºp dáº¡ng CSV.');
  };

  const resetControls = () => {
    setSearch('');
    setRoleFilter('all');
    setStatusFilter('all');
    setTimeRange(timeRangeOptions[1]);
    showActionMessage('ÄÃ£ Ä‘áº·t láº¡i bá»™ lá»c vÃ  vÃ¹ng thá»i gian.');
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

  const grantDpfCoin = async (event: React.FormEvent) => {
    event.preventDefault();
    if (dpfBusy) return;

    const target = dpfForm.target.trim();
    const normalizedEmail = target.toLowerCase();
    const amount = Number(dpfForm.amount);

    if (!target) {
      showActionMessage('Cáº§n nháº­p email hoáº·c UID ngÆ°á»i nháº­n DPF coin.');
      return;
    }

    if (!Number.isFinite(amount) || amount <= 0 || amount > 1_000_000) {
      showActionMessage('Sá»‘ DPF coin pháº£i náº±m trong khoáº£ng 1 Ä‘áº¿n 1.000.000.');
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
        showActionMessage('KhÃ´ng tÃ¬m tháº¥y user. HÃ£y Ä‘á»ƒ ngÆ°á»i dÃ¹ng Ä‘Äƒng nháº­p Google trÆ°á»›c, hoáº·c nháº­p UID.');
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

      showActionMessage(`ÄÃ£ cá»™ng ${amount.toLocaleString('vi-VN')} DPF coin cho ${targetUser.email || uid}.`);
    } catch (error) {
      console.error('DPF coin grant failed:', error);
      const message = error instanceof Error ? error.message : '';
      showActionMessage(message || 'Khong the cong DPF coin. Hay kiem tra cau hinh Firebase Admin.');
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
    showActionMessage('ÄÃ£ cáº­p nháº­t tráº¡ng thÃ¡i há»“ sÆ¡.');
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
    showActionMessage('ÄÃ£ lÆ°u phÃ¢n loáº¡i vÃ  ghi chÃº pháº£n há»“i cho há»“ sÆ¡.');
  };

  const deleteCase = async (item: HelpCenterCase) => {
    if (!window.confirm('Báº¡n cháº¯c cháº¯n muá»‘n xÃ³a há»“ sÆ¡ nÃ y?')) return;
    try {
      if (item.attachmentUrl) {
        try {
          await deleteObject(ref(storage, item.attachmentUrl));
        } catch (storageError) {
          console.warn('KhÃ´ng thá»ƒ xÃ³a tá»‡p Ä‘Ã­nh kÃ¨m hoáº·c tá»‡p khÃ´ng tá»“n táº¡i:', storageError);
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
      showActionMessage('ÄÃ£ xÃ³a há»“ sÆ¡ vÃ  tá»‡p Ä‘Ã­nh kÃ¨m náº¿u cÃ³.');
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
    showActionMessage('ÄÃ£ cáº­p nháº­t vai trÃ² vÃ  ghi sá»± kiá»‡n báº£o máº­t.');
  };

  const resetAllUserProgress = async () => {
    const isAdminEmail = (email?: string) => email?.toLowerCase() === 'deepfense@gmail.com';
    const adminUid = auth.currentUser?.uid;

    if (!window.confirm('Cáº¢NH BÃO NGUY HIá»‚M: Thao tÃ¡c nÃ y sáº½ Ä‘áº·t láº¡i TOÃ€N Bá»˜ tiáº¿n Ä‘á»™ há»c táº­p, Ä‘iá»ƒm sá»‘ vÃ  DPF coin cá»§a táº¥t cáº£ ngÆ°á»i dÃ¹ng. TÃ i khoáº£n Admin (deepfense@gmail.com) sáº½ Ä‘Æ°á»£c giá»¯ nguyÃªn. Báº¡n cÃ³ cháº¯c cháº¯n muá»‘n tiáº¿p tá»¥c?')) return;
    
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

      showActionMessage('ÄÃ£ Ä‘áº·t láº¡i toÃ n bá»™ tiáº¿n Ä‘á»™ ngÆ°á»i dÃ¹ng thÃ nh cÃ´ng (Trá»« Admin).');
    } catch (error) {
      console.error('Reset failed:', error);
      showActionMessage('Lá»—i khi Ä‘áº·t láº¡i tiáº¿n Ä‘á»™. HÃ£y kiá»ƒm tra Console.');
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
    showActionMessage('ÄÃ£ cáº­p nháº­t tráº¡ng thÃ¡i ngÆ°á»i dÃ¹ng.');
  };

  const deleteUserRecord = async (user: UserRecord) => {
    const userId = user.uid || user.id;
    if (!window.confirm(`Báº¡n cháº¯c cháº¯n muá»‘n xÃ³a há»“ sÆ¡ user "${user.email || user.displayName || userId}"? TÃ i khoáº£n Ä‘Äƒng nháº­p Firebase Auth sáº½ khÃ´ng bá»‹ xÃ³a.`)) return;

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
    showActionMessage('ÄÃ£ xÃ³a há»“ sÆ¡ user khá»i collection users.');
  };

  const deleteDpfLedgerEntry = async (entry: DpfLedgerRecord) => {
    if (!window.confirm(`Báº¡n cháº¯c cháº¯n muá»‘n xÃ³a giao dá»‹ch DPF "${entry.id}"? Thao tÃ¡c nÃ y khÃ´ng tá»± tÃ­nh láº¡i sá»‘ dÆ° user.`)) return;

    await deleteDoc(doc(db, 'dpf_ledger', entry.id));
    await writeActivityLog({
      action: 'admin.dpf_ledger_deleted',
      targetType: 'dpf_ledger',
      targetId: entry.id,
      severity: 'warning',
      metadata: { uid: entry.uid || '', amount: entry.amount || 0 },
    });
    showActionMessage('ÄÃ£ xÃ³a giao dá»‹ch DPF khá»i dpf_ledger.');
  };

  const deleteActivityLog = async (item: ActivityLog) => {
    if (!window.confirm(`Báº¡n cháº¯c cháº¯n muá»‘n xÃ³a activity log "${item.action || item.id}"?`)) return;

    await deleteDoc(doc(db, 'activity_logs', item.id));
    await writeActivityLog({
      action: 'admin.activity_log_deleted',
      targetType: 'activity_logs',
      targetId: item.id,
      severity: 'warning',
      metadata: { deletedAction: item.action || '' },
    });
    showActionMessage('ÄÃ£ xÃ³a activity log.');
  };

  const deleteSecurityEvent = async (item: SecurityEvent) => {
    if (!window.confirm(`Báº¡n cháº¯c cháº¯n muá»‘n xÃ³a security event "${item.eventType || item.id}"?`)) return;

    await deleteDoc(doc(db, 'security_events', item.id));
    await writeActivityLog({
      action: 'admin.security_event_deleted',
      targetType: 'security_events',
      targetId: item.id,
      severity: 'critical',
      metadata: { eventType: item.eventType || '', actorId: item.actorId || '' },
    });
    showActionMessage('ÄÃ£ xÃ³a security event.');
  };

  const createUserRecord = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!userForm.email.trim()) {
      showActionMessage('Cáº§n nháº­p email Ä‘á»ƒ táº¡o há»“ sÆ¡ ngÆ°á»i dÃ¹ng.');
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
    showActionMessage('ÄÃ£ táº¡o há»“ sÆ¡ ngÆ°á»i dÃ¹ng má»›i.');
  };

  const createChallenge = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!challengeForm.title.trim()) {
      showActionMessage('Cáº§n nháº­p tiÃªu Ä‘á» challenge.');
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
    showActionMessage('ÄÃ£ táº¡o challenge má»›i trong xÆ°á»Ÿng ná»™i dung.');
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
    showActionMessage('ÄÃ£ cáº­p nháº­t tráº¡ng thÃ¡i challenge.');
  };

  const deleteChallenge = async (challenge: ChallengeRecord) => {
    if (!window.confirm(`Báº¡n cháº¯c cháº¯n muá»‘n xÃ³a challenge "${challenge.title || challenge.id}"?`)) return;
    await deleteDoc(doc(db, 'challenges', challenge.id));
    await writeActivityLog({
      action: 'editor.challenge_deleted',
      targetType: 'challenges',
      targetId: challenge.id,
      severity: 'warning',
      metadata: { title: challenge.title || '' },
    });
    showActionMessage('ÄÃ£ xÃ³a challenge.');
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
    showActionMessage('ÄÃ£ táº¡o sá»± kiá»‡n báº£o máº­t thá»§ cÃ´ng.');
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
      setLoginError(`Lá»—i Ä‘Äƒng nháº­p Google [${code}]`);
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center animate-in fade-in">
        <div className="w-full max-w-sm rounded-lg border border-white/10 bg-[#07111f] p-8 text-center shadow-2xl shadow-black/40">
          <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-lg border border-primary/30 bg-primary/10">
            <Lock className="text-primary" size={32} />
          </div>
          <p className="mb-2 text-xs font-bold uppercase tracking-[0.28em] text-primary">Trung tÃ¢m Ä‘iá»u khiá»ƒn Deepfense</p>
          <h2 className="mb-6 text-xl font-black text-white">ÄÄƒng nháº­p quáº£n trá»‹</h2>
          
          <button onClick={handleGoogleLogin} className="mb-6 flex w-full items-center justify-center gap-2 rounded-lg border border-blue-500/30 bg-blue-500/10 py-3 text-sm font-bold text-blue-300 transition-colors hover:bg-blue-500 hover:text-white">
            <LogIn size={18} /> ÄÄƒng nháº­p báº±ng Google
          </button>

          <div className="mb-6 flex items-center gap-4 text-xs text-gray-500 before:h-px before:flex-1 before:bg-white/10 after:h-px after:flex-1 after:bg-white/10">
            HOáº¶C DÃ™NG EMAIL
          </div>

          <form onSubmit={handleLogin} className="text-left">
            <input
              type="email"
              placeholder="Email quáº£n trá»‹"
              className="mb-4 w-full rounded-lg border border-white/20 bg-black p-3 text-center text-white outline-none focus:border-primary"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />
            <input
              type="password"
              placeholder="Máº­t kháº©u"
              className="mb-4 w-full rounded-lg border border-white/20 bg-black p-3 text-center text-white outline-none focus:border-primary"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
            {loginError && <div className="mb-4 text-xs font-bold text-red-400">{loginError}</div>}
            <button type="submit" className="w-full rounded-lg bg-primary py-3 font-bold text-white transition-colors hover:bg-blue-500">
              Truy cáº­p báº±ng máº­t kháº©u
            </button>
          </form>
        </div>
      </div>
    );
  }

  const renderOverview = () => (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        <StatCard label="NgÆ°á»i há»c hoáº¡t Ä‘á»™ng" value={stats.activeLearners} sub="TÃ i khoáº£n tháº­t trong users, khÃ´ng cÃ²n há»“ sÆ¡ máº«u" icon={Users} tone="blue" />
        <StatCard label="LÆ°á»£t luyá»‡n táº­p" value={trainingStats.isLoading ? '...' : trainingStats.totalAttempts} sub="Äá»“ng bá»™ trá»±c tiáº¿p tá»« collection game_results nhÆ° trang chá»§" icon={BarChart3} tone="green" />
        <StatCard label="Äá»™ chÃ­nh xÃ¡c" value={trainingStats.isLoading ? '...' : `${trainingStats.averageAccuracy}%`} sub="TÃ­nh báº±ng tá»•ng score / tá»•ng lÆ°á»£t luyá»‡n táº­p tá»« database" icon={Gauge} tone="green" />
        <StatCard label="LÆ°á»£t vÆ°á»£t chuáº©n" value={trainingStats.isLoading ? '...' : trainingStats.protectedUsers} sub="Sá»‘ lÆ°á»£t cÃ³ score tá»« 9 trá»Ÿ lÃªn, cÃ¹ng logic vá»›i trang chá»§" icon={CheckCircle} tone="green" />
        <StatCard label="Há»“ sÆ¡ trá»£ giÃºp" value={stats.openCases} sub="Há»“ sÆ¡ má»›i hoáº·c Ä‘ang xem xÃ©t" icon={HelpCircle} tone="amber" />
        <StatCard label="TÃ­n hiá»‡u rá»§i ro cao" value={stats.highRisk} sub="TÃ¬nh huá»‘ng cáº§n Æ°u tiÃªn kiá»ƒm tra" icon={Flame} tone="red" />
        <StatCard label="HÃ ng Ä‘á»£i ná»™i dung" value={stats.reviewQueue} sub="Challenge hoáº·c lesson Ä‘ang á»Ÿ báº£n nhÃ¡p" icon={BookOpen} tone="blue" />
      </div>

      <div className="grid gap-4 xl:grid-cols-[1.2fr_0.8fr]">
        <section className="rounded-lg border border-white/10 bg-[#07111f]/90 p-5">
          <div className="mb-5 flex items-center justify-between">
            <div>
              <h3 className="font-bold text-white">TÃ­n hiá»‡u gáº§n Ä‘Ã¢y</h3>
              <p className="text-xs text-gray-500">DÃ²ng thá»i gian hoáº¡t Ä‘á»™ng vÃ  thao tÃ¡c quáº£n trá»‹ má»›i nháº¥t</p>
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
                  <p className="mt-1 text-xs text-gray-500">{item.actorRole || 'user'} / {item.targetType || 'system'} / {formatDate(item.createdAt)}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="rounded-lg border border-white/10 bg-[#07111f]/90 p-5">
          <div className="mb-5 flex items-center justify-between">
            <div>
              <h3 className="font-bold text-white">Ká»¹ nÄƒng cÃ²n yáº¿u</h3>
              <p className="text-xs text-gray-500">Gá»£i Ã½ Æ°u tiÃªn ná»™i dung Ä‘Ã o táº¡o tiáº¿p theo</p>
            </div>
            <Sparkles className="text-amber-300" size={20} />
          </div>
          {['Giá»ng nÃ³i', 'XÃ¡c minh', 'Chuyá»ƒn Ä‘á»™ng', 'Ngá»¯ cáº£nh', 'Ãnh sÃ¡ng'].map((skill, index) => (
            <div key={skill} className="mb-4">
              <div className="mb-1 flex justify-between text-xs">
                <span className="font-bold uppercase tracking-wide text-gray-300">{skill}</span>
                <span className="text-gray-500">{68 - index * 7}% rá»§i ro</span>
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
            <h3 className="font-black text-white">Táº¡o há»“ sÆ¡ ngÆ°á»i dÃ¹ng</h3>
            <p className="mt-1 text-xs text-gray-500">DÃ¹ng Ä‘á»ƒ táº¡o há»“ sÆ¡ quáº£n trá»‹ trong Firestore khi tÃ i khoáº£n chÆ°a tá»± Ä‘á»“ng bá»™.</p>
          </div>
          <button type="submit" className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-xs font-bold uppercase tracking-wide text-white hover:bg-blue-500">
            <Plus size={15} /> Táº¡o há»“ sÆ¡
          </button>
        </div>
        <div className="grid gap-3 md:grid-cols-4">
          <input value={userForm.email} onChange={(event) => setUserForm((current) => ({ ...current, email: event.target.value }))} placeholder="Email ngÆ°á»i dÃ¹ng" className="rounded-lg border border-white/10 bg-black/50 p-3 text-sm text-white outline-none focus:border-primary" />
          <input value={userForm.displayName} onChange={(event) => setUserForm((current) => ({ ...current, displayName: event.target.value }))} placeholder="TÃªn hiá»ƒn thá»‹" className="rounded-lg border border-white/10 bg-black/50 p-3 text-sm text-white outline-none focus:border-primary" />
          <select value={userForm.role} onChange={(event) => setUserForm((current) => ({ ...current, role: event.target.value }))} className="rounded-lg border border-white/10 bg-black/70 p-3 text-sm text-white outline-none focus:border-primary">
            <option value="user">NgÆ°á»i há»c</option>
            <option value="editor">BiÃªn táº­p viÃªn</option>
            <option value="admin">Quáº£n trá»‹ viÃªn</option>
          </select>
          <select value={userForm.status} onChange={(event) => setUserForm((current) => ({ ...current, status: event.target.value }))} className="rounded-lg border border-white/10 bg-black/70 p-3 text-sm text-white outline-none focus:border-primary">
            <option value="active">Äang hoáº¡t Ä‘á»™ng</option>
            <option value="inactive">Ãt hoáº¡t Ä‘á»™ng</option>
            <option value="flagged">Cáº§n theo dÃµi</option>
            <option value="banned">ÄÃ£ khÃ³a</option>
          </select>
        </div>
      </form>

      <div className="rounded-lg border border-red-500/20 bg-red-500/5 p-5">
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <h3 className="flex items-center gap-2 font-black text-red-300">
              <ShieldAlert size={18} /> Danger Zone: Reset toÃ n bá»™ tiáº¿n Ä‘á»™
            </h3>
            <p className="mt-1 text-xs text-gray-500">Äáº·t láº¡i Ä‘iá»ƒm sá»‘, coin vÃ  tiáº¿n Ä‘á»™ há»c vá» 0 cho táº¥t cáº£ ngÆ°á»i dÃ¹ng (Trá»« Admin).</p>
          </div>
          <button onClick={resetAllUserProgress} disabled={loading} className="inline-flex items-center gap-2 rounded-lg bg-red-600/20 px-4 py-2.5 text-xs font-bold uppercase tracking-wide text-red-300 border border-red-500/30 hover:bg-red-600/30 transition-colors">
            <RefreshCw size={14} className={loading ? 'animate-spin' : ''} /> Reset All Users
          </button>
        </div>
      </div>

      <section className="rounded-lg border border-white/10 bg-[#07111f]/90 p-5">
        <div className="mb-5 flex flex-col justify-between gap-3 lg:flex-row lg:items-center">
          <div>
            <h3 className="font-black text-white">Profile ngÆ°á»i dÃ¹ng</h3>
            <p className="mt-1 text-xs text-gray-500">Chá»n má»™t dÃ²ng trong báº£ng Ä‘á»ƒ xem há»“ sÆ¡, DPF coin, case liÃªn quan vÃ  nháº­t kÃ½ thao tÃ¡c.</p>
          </div>
          {selectedUser && (
            <div className="flex flex-wrap gap-2">
              <button onClick={() => changeUserStatus(selectedUser, selectedUser.status === 'flagged' ? 'active' : 'flagged')} className="inline-flex items-center gap-2 rounded-lg border border-amber-500/30 px-3 py-2 text-xs font-bold text-amber-200 hover:bg-amber-500/10">
                <ShieldAlert size={14} /> {selectedUser.status === 'flagged' ? 'Bá» theo dÃµi' : 'Theo dÃµi'}
              </button>
              <button onClick={() => changeUserStatus(selectedUser, selectedUser.status === 'banned' ? 'active' : 'banned')} className="inline-flex items-center gap-2 rounded-lg border border-red-500/30 px-3 py-2 text-xs font-bold text-red-300 hover:bg-red-500/10">
                <Ban size={14} /> {selectedUser.status === 'banned' ? 'Má»Ÿ khÃ³a' : 'KhÃ³a tÃ i khoáº£n'}
              </button>
              <button onClick={() => deleteUserRecord(selectedUser)} className="inline-flex items-center gap-2 rounded-lg border border-red-500/30 bg-red-500/10 px-3 py-2 text-xs font-bold text-red-300 hover:bg-red-500/20">
                <Trash2 size={14} /> XÃ³a há»“ sÆ¡
              </button>
              <button
                onClick={() => {
                  setDpfForm((current) => ({ ...current, target: selectedUser.email || selectedUser.uid || selectedUser.id, amount: current.amount || '1000' }));
                  setActiveTab('dpf');
                }}
                className="inline-flex items-center gap-2 rounded-lg border border-amber-400/30 px-3 py-2 text-xs font-bold text-amber-200 hover:bg-amber-400/10"
              >
                <Coins size={14} /> Cáº¥p DPF
              </button>
            </div>
          )}
        </div>

        {!selectedUser ? (
          <div className="rounded-lg border border-white/10 bg-black/25 p-5 text-sm text-gray-500">
            ChÆ°a cÃ³ user tháº­t trong Firestore. HÃ£y táº¡o há»“ sÆ¡ hoáº·c Ä‘á»ƒ ngÆ°á»i dÃ¹ng Ä‘Äƒng nháº­p Ä‘á»ƒ dashboard Ä‘á»“ng bá»™.
          </div>
        ) : (
          <div className="grid gap-4 xl:grid-cols-[0.9fr_1.1fr]">
            <div className="rounded-lg border border-white/10 bg-black/25 p-4">
              <div className="mb-4 flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <p className="truncate text-xl font-black text-white">{selectedUser.displayName || 'ChÆ°a Ä‘áº·t tÃªn'}</p>
                  <p className="truncate text-sm text-gray-400">{selectedUser.email || selectedUser.uid || selectedUser.id}</p>
                </div>
                <Pill className={statusClass(selectedUser.status)}>{userStatusLabels[selectedUser.status || 'active']}</Pill>
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                <div className="rounded border border-white/5 bg-black/30 p-3">
                  <p className="text-xs text-gray-500">Vai trÃ²</p>
                  <p className="mt-1 font-bold text-white">{roleLabels[selectedUser.role || 'user']}</p>
                </div>
                <div className="rounded border border-white/5 bg-black/30 p-3">
                  <p className="text-xs text-gray-500">DPF webBalance</p>
                  <p className="mt-1 font-bold text-amber-200">{(selectedUser.webBalance || 0).toLocaleString('vi-VN')}</p>
                </div>
                <div className="rounded border border-white/5 bg-black/30 p-3">
                  <p className="text-xs text-gray-500">Challenge</p>
                  <p className="mt-1 font-bold text-white">{selectedUser.totalChallenges || 0}</p>
                </div>
                <div className="rounded border border-white/5 bg-black/30 p-3">
                  <p className="text-xs text-gray-500">Äá»™ Ä‘Ãºng</p>
                  <p className="mt-1 font-bold text-white">{selectedUser.accuracy || 0}%</p>
                </div>
                <div className="rounded border border-white/5 bg-black/30 p-3">
                  <p className="text-xs text-gray-500">Táº¡o há»“ sÆ¡</p>
                  <p className="mt-1 text-xs text-gray-300">{formatDate(selectedUser.createdAt)}</p>
                </div>
                <div className="rounded border border-white/5 bg-black/30 p-3">
                  <p className="text-xs text-gray-500">Hoáº¡t Ä‘á»™ng cuá»‘i</p>
                  <p className="mt-1 text-xs text-gray-300">{formatDate(selectedUser.lastActiveAt)}</p>
                </div>
              </div>
            </div>

            <div className="grid gap-3 md:grid-cols-3">
              <div className="rounded-lg border border-white/10 bg-black/25 p-4">
                <p className="text-xs font-bold uppercase tracking-wide text-gray-500">Case liÃªn quan</p>
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
                <p className="text-xs font-bold uppercase tracking-wide text-gray-500">Nháº­t kÃ½</p>
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
                <p className="text-xs font-bold uppercase tracking-wide text-gray-500">DPF ledger</p>
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
        <div className="grid min-w-[1050px] grid-cols-[1.4fr_0.7fr_0.8fr_0.6fr_0.6fr_0.6fr_0.8fr_1.1fr] gap-3 border-b border-white/10 px-4 py-3 text-[11px] font-bold uppercase tracking-wider text-gray-500">
          <span>NgÆ°á»i dÃ¹ng</span><span>Vai trÃ²</span><span>Tráº¡ng thÃ¡i</span><span>Challenge</span><span>Äá»™ Ä‘Ãºng</span><span>Äiá»ƒm</span><span>Láº§n cuá»‘i</span><span>Äiá»u khiá»ƒn</span>
        </div>
        <div className="divide-y divide-white/5">
          {filteredUsers.length === 0 ? (
            <div className="px-4 py-6 text-sm text-gray-500">KhÃ´ng cÃ³ user tháº­t phÃ¹ há»£p bá»™ lá»c hiá»‡n táº¡i.</div>
          ) : filteredUsers.map((user) => (
            <div key={user.id} className="grid min-w-[1050px] grid-cols-[1.4fr_0.7fr_0.8fr_0.6fr_0.6fr_0.6fr_0.8fr_1.1fr] gap-3 px-4 py-4 text-sm">
              <div className="min-w-0">
                <p className="truncate font-bold text-white">{user.displayName || 'ChÆ°a Ä‘áº·t tÃªn'}</p>
                <p className="truncate text-xs text-gray-500">{user.email || user.uid || user.id}</p>
              </div>
              <Pill className="border-primary/30 bg-primary/10 text-blue-200">{roleLabels[user.role || 'user']}</Pill>
              <Pill className={statusClass(user.status)}>{userStatusLabels[user.status || 'active']}</Pill>
              <span className="text-gray-300">{user.totalChallenges || 0}</span>
              <span className="text-gray-300">{user.accuracy || 0}%</span>
              <span className="text-gray-300">{user.score || 0}</span>
              <span className="text-xs text-gray-500">{formatDate(user.lastActiveAt)}</span>
              <div className="flex flex-wrap gap-2">
                <button onClick={() => setSelectedUserId(user.uid || user.id)} className="rounded border border-primary/30 px-2 py-1 text-xs font-bold text-blue-200 hover:bg-primary/10">
                  Profile
                </button>
                <select value={user.role || 'user'} onChange={(event) => changeUserRole(user, event.target.value as Role)} className="rounded border border-white/10 bg-black px-2 py-1 text-xs text-white">
                  <option value="user">NgÆ°á»i há»c</option>
                  <option value="editor">BiÃªn táº­p</option>
                  <option value="admin">Admin</option>
                </select>
                <button onClick={() => changeUserStatus(user, user.status === 'flagged' ? 'active' : 'flagged')} className="rounded border border-white/10 px-2 py-1 text-xs font-bold text-gray-300 hover:border-amber-400 hover:text-amber-200">
                  Theo dÃµi
                </button>
                <button onClick={() => changeUserStatus(user, user.status === 'banned' ? 'active' : 'banned')} className="inline-flex items-center gap-1 rounded border border-white/10 px-2 py-1 text-xs font-bold text-gray-300 hover:border-red-400 hover:text-red-300">
                  <Ban size={12} /> {user.status === 'banned' ? 'Má»Ÿ khÃ³a' : 'KhÃ³a'}
                </button>
                <button onClick={() => deleteUserRecord(user)} className="inline-flex items-center gap-1 rounded border border-red-500/20 bg-red-500/10 px-2 py-1 text-xs font-bold text-red-300 hover:bg-red-500/20">
                  <Trash2 size={12} /> XÃ³a
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

    return (
      <div className="space-y-5">
        <div className="grid gap-4 md:grid-cols-3">
          <StatCard
            label="Sá»‘ dÆ° DPF trÃªn web"
            value={totalWebBalance.toLocaleString('vi-VN')}
            sub="Tá»•ng DPF coin áº£o Ä‘ang náº±m trong users.webBalance."
            icon={Coins}
            tone="amber"
          />
          <StatCard
            label="ThÆ°á»Ÿng tá»« admin"
            value={totalBonusBalance.toLocaleString('vi-VN')}
            sub="Tá»•ng DPF coin Ä‘Ã£ cáº¥p thá»§ cÃ´ng qua dashboard."
            icon={Sparkles}
            tone="green"
          />
          <StatCard
            label="Sá»• giao dá»‹ch gáº§n Ä‘Ã¢y"
            value={dpfLedger.length}
            sub="Sá»‘ giao dá»‹ch DPF coin gáº§n Ä‘Ã¢y Ä‘Ã£ táº£i tá»« dpf_ledger."
            icon={Database}
            tone="blue"
          />
        </div>

        <form onSubmit={grantDpfCoin} className="rounded-lg border border-amber-500/20 bg-[#07111f]/90 p-5">
          <div className="mb-4 flex flex-col justify-between gap-3 lg:flex-row lg:items-center">
            <div>
              <h3 className="font-black text-white">Cáº¥p DPF coin cho ngÆ°á»i dÃ¹ng</h3>
              <p className="mt-1 text-xs text-gray-500">
                Nháº­p email hoáº·c UID. Coin sáº½ Ä‘Æ°á»£c cá»™ng vÃ o webBalance vÃ  ghi láº¡i trong dpf_ledger Ä‘á»ƒ kiá»ƒm tra.
              </p>
            </div>
            <button
              type="submit"
              disabled={dpfBusy}
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-amber-400 px-4 py-2 text-xs font-black uppercase tracking-wide text-black hover:bg-amber-300 disabled:cursor-not-allowed disabled:opacity-60"
            >
              <Coins size={15} /> {dpfBusy ? 'Äang cáº¥p...' : 'Cáº¥p DPF coin'}
            </button>
          </div>
          <div className="grid gap-3 lg:grid-cols-[1.2fr_0.55fr_1.4fr]">
            <label className="text-xs font-bold uppercase tracking-wide text-gray-500">
              Email hoáº·c UID
              <input
                value={dpfForm.target}
                onChange={(event) => setDpfForm((current) => ({ ...current, target: event.target.value }))}
                placeholder="deepfense@gmail.com"
                className="mt-2 w-full rounded-lg border border-white/10 bg-black/50 p-3 text-sm text-white outline-none focus:border-amber-400"
              />
            </label>
            <label className="text-xs font-bold uppercase tracking-wide text-gray-500">
              Sá»‘ DPF coin
              <input
                value={dpfForm.amount}
                onChange={(event) => setDpfForm((current) => ({ ...current, amount: event.target.value }))}
                inputMode="numeric"
                placeholder="1000"
                className="mt-2 w-full rounded-lg border border-white/10 bg-black/50 p-3 text-sm text-white outline-none focus:border-amber-400"
              />
            </label>
            <label className="text-xs font-bold uppercase tracking-wide text-gray-500">
              LÃ½ do
              <input
                value={dpfForm.reason}
                onChange={(event) => setDpfForm((current) => ({ ...current, reason: event.target.value }))}
                placeholder="Admin bonus DPF coin"
                className="mt-2 w-full rounded-lg border border-white/10 bg-black/50 p-3 text-sm text-white outline-none focus:border-amber-400"
              />
            </label>
          </div>
          <p className="mt-4 text-xs leading-relaxed text-gray-500">
            Báº¡n cÃ³ thá»ƒ dÃ¹ng form nÃ y Ä‘á»ƒ cáº¥p 1.000 DPF coin cho admin deepfense@gmail.com. Ban Ä‘áº§u Ä‘Ã¢y lÃ  coin áº£o trong database web;
            khi cáº§n rÃºt ra vÃ­ Amoy thÃ¬ sáº½ Ä‘i qua luá»“ng withdraw/duyá»‡t riÃªng.
          </p>
        </form>

        <section className="overflow-x-auto rounded-lg border border-white/10 bg-[#07111f]/90">
          <div className="grid min-w-[1020px] grid-cols-[1.2fr_0.8fr_0.8fr_0.8fr_0.8fr_1fr] gap-3 border-b border-white/10 px-4 py-3 text-[11px] font-bold uppercase tracking-wider text-gray-500">
            <span>NgÆ°á»i dÃ¹ng</span>
            <span>Web balance</span>
            <span>ÄÃ£ kiáº¿m</span>
            <span>Admin bonus</span>
            <span>ÄÃ£ dÃ¹ng</span>
            <span>Äiá»u khiá»ƒn</span>
          </div>
          <div className="divide-y divide-white/5">
            {dashboardUsers.length === 0 ? (
              <div className="px-4 py-6 text-sm text-gray-500">
                ChÆ°a cÃ³ user tháº­t trong collection users. Khi ngÆ°á»i dÃ¹ng Ä‘Äƒng nháº­p hoáº·c báº¡n táº¡o há»“ sÆ¡ á»Ÿ tab User, sá»‘ dÆ° DPF sáº½ hiá»‡n táº¡i Ä‘Ã¢y.
              </div>
            ) : (
              dashboardUsers.map((user) => (
                <div key={user.id} className="grid min-w-[1020px] grid-cols-[1.2fr_0.8fr_0.8fr_0.8fr_0.8fr_1fr] gap-3 px-4 py-4 text-sm">
                  <div className="min-w-0">
                    <p className="truncate font-bold text-white">{user.displayName || user.email || user.uid || user.id}</p>
                    <p className="truncate text-xs text-gray-500">{user.email || user.uid || user.id}</p>
                  </div>
                  <span className="font-black text-amber-200">{(user.webBalance || 0).toLocaleString('vi-VN')}</span>
                  <span className="text-gray-300">{(user.earnedBalance || 0).toLocaleString('vi-VN')}</span>
                  <span className="text-gray-300">{(user.bonusBalance || 0).toLocaleString('vi-VN')}</span>
                  <span className="text-gray-300">{(user.spentBalance || 0).toLocaleString('vi-VN')}</span>
                  <div className="flex flex-wrap gap-2">
                    <button onClick={() => { setSelectedUserId(user.uid || user.id); setActiveTab('users'); }} className="rounded border border-primary/30 px-2 py-1 text-xs font-bold text-blue-200 hover:bg-primary/10">
                      Má»Ÿ profile
                    </button>
                    <button onClick={() => setDpfForm((current) => ({ ...current, target: user.email || user.uid || user.id }))} className="rounded border border-amber-400/30 px-2 py-1 text-xs font-bold text-amber-200 hover:bg-amber-400/10">
                      Chá»n cáº¥p coin
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </section>

        <section className="overflow-x-auto rounded-lg border border-white/10 bg-[#07111f]/90">
          <div className="grid min-w-[1080px] grid-cols-[0.9fr_0.7fr_0.8fr_0.9fr_1.2fr_0.9fr_0.6fr] gap-3 border-b border-white/10 px-4 py-3 text-[11px] font-bold uppercase tracking-wider text-gray-500">
            <span>Thá»i gian</span>
            <span>Loáº¡i</span>
            <span>Sá»‘ lÆ°á»£ng</span>
            <span>Sá»‘ dÆ° sau</span>
            <span>NgÆ°á»i nháº­n</span>
            <span>Nguá»“n</span>
            <span>XÃ³a</span>
          </div>
          <div className="divide-y divide-white/5">
            {dpfLedger.length === 0 ? (
              <div className="px-4 py-6 text-sm text-gray-500">ChÆ°a cÃ³ giao dá»‹ch DPF coin nÃ o trong dpf_ledger.</div>
            ) : (
              dpfLedger.map((entry) => {
                const targetEmail = typeof entry.metadata?.targetEmail === 'string' ? entry.metadata.targetEmail : '';
                return (
                  <div key={entry.id} className="grid min-w-[1080px] grid-cols-[0.9fr_0.7fr_0.8fr_0.9fr_1.2fr_0.9fr_0.6fr] gap-3 px-4 py-4 text-sm">
                    <span className="text-xs text-gray-500">{formatDate(entry.createdAt)}</span>
                    <Pill className={entry.direction === 'debit' ? 'border-red-500/30 bg-red-500/10 text-red-300' : 'border-emerald-500/30 bg-emerald-500/10 text-emerald-200'}>
                      {entry.direction || 'credit'}
                    </Pill>
                    <span className="font-black text-white">{(entry.amount || 0).toLocaleString('en-US')}</span>
                    <span className="text-gray-300">{(entry.balanceAfter || 0).toLocaleString('en-US')}</span>
                    <span className="truncate text-gray-300">{targetEmail || entry.uid || 'unknown'}</span>
                    <span className="truncate text-xs text-gray-500">{entry.source || entry.reason || 'admin_bonus'}</span>
                    <button onClick={() => deleteDpfLedgerEntry(entry)} className="inline-flex w-fit items-center gap-1 rounded border border-red-500/20 bg-red-500/10 px-2 py-1 text-xs font-bold text-red-300 hover:bg-red-500/20">
                      <Trash2 size={12} /> XÃ³a
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
        <section className="rounded-lg border border-white/10 bg-[#07111f]/90 p-5 text-sm text-gray-500">
          KhÃ´ng cÃ³ há»“ sÆ¡ trá»£ giÃºp tháº­t phÃ¹ há»£p bá»™ lá»c hiá»‡n táº¡i.
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
                  <span className="text-xs text-gray-500">{formatDate(item.submittedAt)}</span>
                </div>
                <h3 className="text-lg font-black text-white">{item.title || item.name || 'Há»“ sÆ¡ trá»£ giÃºp'}</h3>
                <div className="mt-1 flex flex-wrap items-center gap-3 text-sm text-gray-400">
                  <span>{item.name || 'áº¨n danh'}</span>
                  {item.email && <a href={`mailto:${item.email}`} className="inline-flex items-center gap-1 text-primary hover:underline"><Mail size={14} />{item.email}</a>}
                </div>
                <p className="mt-4 rounded-lg border border-white/5 bg-black/30 p-4 text-sm leading-relaxed text-gray-300">
                  {item.description || item.desc || 'ChÆ°a cÃ³ mÃ´ táº£ chi tiáº¿t.'}
                </p>
                <div className="mt-4 grid gap-3 md:grid-cols-2">
                  <label className="text-xs font-bold uppercase tracking-wide text-gray-500">
                    Tráº¡ng thÃ¡i há»“ sÆ¡
                    <select value={draft.status} onChange={(event) => setCaseDrafts((current) => ({ ...current, [item.id]: { ...draft, status: event.target.value as CaseStatus } }))} className="mt-2 w-full rounded-lg border border-white/10 bg-black/70 px-3 py-2 text-sm text-white">
                      <option value="new">Má»›i nháº­n</option>
                      <option value="reviewing">Äang xem xÃ©t</option>
                      <option value="replied">ÄÃ£ pháº£n há»“i</option>
                      <option value="closed">ÄÃ£ Ä‘Ã³ng</option>
                      <option value="archived">LÆ°u trá»¯</option>
                    </select>
                  </label>
                  <label className="text-xs font-bold uppercase tracking-wide text-gray-500">
                    Má»©c Ä‘á»™ Æ°u tiÃªn
                    <select value={draft.severity} onChange={(event) => setCaseDrafts((current) => ({ ...current, [item.id]: { ...draft, severity: event.target.value as Severity } }))} className="mt-2 w-full rounded-lg border border-white/10 bg-black/70 px-3 py-2 text-sm text-white">
                      <option value="low">Tháº¥p</option>
                      <option value="medium">Trung bÃ¬nh</option>
                      <option value="high">Cao</option>
                    </select>
                  </label>
                </div>
                <label className="mt-3 block text-xs font-bold uppercase tracking-wide text-gray-500">
                  Ghi chÃº pháº£n há»“i
                  <textarea value={draft.responseNote} onChange={(event) => setCaseDrafts((current) => ({ ...current, [item.id]: { ...draft, responseNote: event.target.value } }))} rows={3} placeholder="Ná»™i dung cÃ³ dáº¥u hiá»‡u cáº§n xÃ¡c minh thÃªm..." className="mt-2 w-full rounded-lg border border-white/10 bg-black/50 p-3 text-sm text-white outline-none focus:border-primary" />
                </label>
                <div className="mt-4 flex flex-wrap gap-2">
                  {item.url && <a href={item.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded border border-white/10 px-3 py-2 text-xs font-bold text-gray-300 hover:text-primary">Má»Ÿ Ä‘Æ°á»ng dáº«n <ExternalLink size={13} /></a>}
                  {item.attachmentUrl && <a href={item.attachmentUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded border border-white/10 px-3 py-2 text-xs font-bold text-gray-300 hover:text-primary"><Paperclip size={13} />Tá»‡p Ä‘Ã­nh kÃ¨m</a>}
                </div>
              </div>
              <div className="flex min-w-[220px] flex-col gap-2 border-t border-white/10 pt-4 lg:border-l lg:border-t-0 lg:pl-4 lg:pt-0">
                <button onClick={() => saveCaseDraft(item)} className="inline-flex items-center justify-center gap-2 rounded-lg bg-primary px-3 py-3 text-xs font-bold text-white hover:bg-blue-500">
                  <Save size={16} /> LÆ°u há»“ sÆ¡
                </button>
                <a
                  href={`https://mail.google.com/mail/u/0/?view=cm&fs=1&to=${encodeURIComponent(item.email || '')}&su=${encodeURIComponent('Pháº£n há»“i tá»« Trung tÃ¢m trá»£ giÃºp Deepfense')}&body=${encodeURIComponent(`ChÃ o ${item.name || 'báº¡n'},\n\n${draft.responseNote || 'Ná»™i dung báº¡n gá»­i cÃ³ má»™t sá»‘ dáº¥u hiá»‡u cáº§n xÃ¡c minh thÃªm. Deepfense khuyáº¿n nghá»‹ khÃ´ng chuyá»ƒn tiá»n, khÃ´ng chia sáº» OTP/thÃ´ng tin cÃ¡ nhÃ¢n vÃ  liÃªn há»‡ ngÆ°á»i liÃªn quan qua kÃªnh khÃ¡c trÆ°á»›c khi hÃ nh Ä‘á»™ng.'}\n\nDeepfense chá»‰ há»— trá»£ giÃ¡o dá»¥c vÃ  nháº­n diá»‡n rá»§i ro, khÃ´ng thay tháº¿ káº¿t luáº­n phÃ¡p lÃ½.\n\nTrÃ¢n trá»ng,\nDeepfense Help Center`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-lg bg-blue-600/20 px-3 py-3 text-xs font-bold text-blue-200 hover:bg-blue-600/30"
                >
                  <Send size={16} /> Gá»­i email
                </a>
                <button onClick={() => updateCaseStatus(item, item.status === 'reviewing' ? 'closed' : 'reviewing')} className="inline-flex items-center justify-center gap-2 rounded-lg bg-emerald-600/20 px-3 py-3 text-xs font-bold text-emerald-200 hover:bg-emerald-600/30">
                  <CheckCircle size={16} /> {item.status === 'reviewing' ? 'ÄÃ³ng há»“ sÆ¡' : 'ÄÃ¡nh dáº¥u Ä‘ang xem'}
                </button>
                <button onClick={() => deleteCase(item)} className="inline-flex items-center justify-center gap-2 rounded-lg bg-red-600/15 px-3 py-3 text-xs font-bold text-red-300 hover:bg-red-600/25">
                  <Trash2 size={16} /> XÃ³a
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
            <h3 className="font-black text-white">Táº¡o challenge má»›i</h3>
            <p className="mt-1 text-xs text-gray-500">Táº¡o ná»™i dung huáº¥n luyá»‡n má»›i cho academy vÃ  challenge.</p>
          </div>
          <button type="submit" className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-xs font-bold uppercase tracking-wide text-white hover:bg-blue-500">
            <Plus size={15} /> Táº¡o má»›i
          </button>
        </div>
        <div className="grid gap-3 md:grid-cols-2">
          <input value={challengeForm.title} onChange={(event) => setChallengeForm((current) => ({ ...current, title: event.target.value }))} placeholder="TiÃªu Ä‘á» challenge" className="rounded-lg border border-white/10 bg-black/50 p-3 text-sm text-white outline-none focus:border-primary" />
          <input value={challengeForm.videoUrl} onChange={(event) => setChallengeForm((current) => ({ ...current, videoUrl: event.target.value }))} placeholder="Link video hoáº·c YouTube" className="rounded-lg border border-white/10 bg-black/50 p-3 text-sm text-white outline-none focus:border-primary" />
          <select value={challengeForm.type} onChange={(event) => setChallengeForm((current) => ({ ...current, type: event.target.value }))} className="rounded-lg border border-white/10 bg-black/70 p-3 text-sm text-white outline-none focus:border-primary">
            <option value="compare_ab">So sÃ¡nh A/B</option>
            <option value="single_video_detect">Nháº­n diá»‡n má»™t video</option>
            <option value="scam_scenario">TÃ¬nh huá»‘ng lá»«a Ä‘áº£o</option>
            <option value="quiz">CÃ¢u há»i kiáº¿n thá»©c</option>
          </select>
          <input value={challengeForm.correctAnswer} onChange={(event) => setChallengeForm((current) => ({ ...current, correctAnswer: event.target.value }))} placeholder="ÄÃ¡p Ã¡n Ä‘Ãºng" className="rounded-lg border border-white/10 bg-black/50 p-3 text-sm text-white outline-none focus:border-primary" />
          <select value={challengeForm.difficulty} onChange={(event) => setChallengeForm((current) => ({ ...current, difficulty: event.target.value }))} className="rounded-lg border border-white/10 bg-black/70 p-3 text-sm text-white outline-none focus:border-primary">
            <option value="easy">Dá»…</option>
            <option value="medium">Trung bÃ¬nh</option>
            <option value="hard">KhÃ³</option>
          </select>
          <select value={challengeForm.status} onChange={(event) => setChallengeForm((current) => ({ ...current, status: event.target.value }))} className="rounded-lg border border-white/10 bg-black/70 p-3 text-sm text-white outline-none focus:border-primary">
            <option value="draft">Báº£n nhÃ¡p</option>
            <option value="published">Xuáº¥t báº£n</option>
            <option value="archived">LÆ°u trá»¯</option>
          </select>
          <input value={challengeForm.skillTags} onChange={(event) => setChallengeForm((current) => ({ ...current, skillTags: event.target.value }))} placeholder="Skill tags: voice, verification" className="rounded-lg border border-white/10 bg-black/50 p-3 text-sm text-white outline-none focus:border-primary md:col-span-2" />
          <textarea value={challengeForm.description} onChange={(event) => setChallengeForm((current) => ({ ...current, description: event.target.value }))} rows={3} placeholder="MÃ´ táº£ tÃ¬nh huá»‘ng" className="rounded-lg border border-white/10 bg-black/50 p-3 text-sm text-white outline-none focus:border-primary" />
          <textarea value={challengeForm.explanation} onChange={(event) => setChallengeForm((current) => ({ ...current, explanation: event.target.value }))} rows={3} placeholder="Giáº£i thÃ­ch sau khi ngÆ°á»i dÃ¹ng tráº£ lá»i" className="rounded-lg border border-white/10 bg-black/50 p-3 text-sm text-white outline-none focus:border-primary" />
        </div>
      </form>

      <div className="grid gap-4 lg:grid-cols-3">
        {dashboardChallenges.map((challenge) => (
          <section key={challenge.id} className="rounded-lg border border-white/10 bg-[#07111f]/90 p-5">
            <div className="mb-4 flex items-center justify-between gap-3">
              <Pill className={statusClass(challenge.status)}>{challengeStatusLabels[challenge.status || 'draft']}</Pill>
              <Pill className={severityClass(challenge.difficulty === 'hard' ? 'high' : challenge.difficulty === 'medium' ? 'medium' : 'low')}>{difficultyLabels[challenge.difficulty || 'medium']}</Pill>
            </div>
            <h3 className="text-lg font-black text-white">{challenge.title || 'Challenge chÆ°a Ä‘áº·t tÃªn'}</h3>
            <p className="mt-2 font-mono text-xs text-primary">{challengeTypeLabels[challenge.type || 'single_video_detect'] || challenge.type}</p>
            <p className="mt-3 line-clamp-3 text-sm text-gray-400">{challenge.description || 'ChÆ°a cÃ³ mÃ´ táº£.'}</p>
            <div className="mt-4 flex flex-wrap gap-2">
              {(challenge.skillTags || ['verification']).map((tag) => (
                <span key={tag} className="rounded bg-white/10 px-2 py-1 text-[11px] font-bold text-gray-300">{tag}</span>
              ))}
            </div>
            <div className="mt-5 grid grid-cols-2 gap-3 text-sm">
              <div className="rounded border border-white/5 bg-black/25 p-3">
                <p className="text-xs text-gray-500">LÆ°á»£t chÆ¡i</p>
                <p className="mt-1 font-black text-white">{challenge.totalPlays || 0}</p>
              </div>
              <div className="rounded border border-white/5 bg-black/25 p-3">
                <p className="text-xs text-gray-500">Tá»· lá»‡ Ä‘Ãºng</p>
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
                <Trash2 size={13} /> XÃ³a challenge
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
        <div className="px-5 py-6 text-sm text-gray-500">ChÆ°a cÃ³ activity log nÃ o trong Firestore.</div>
      ) : dashboardActivity.map((item) => (
        <div key={item.id} className="grid gap-3 border-b border-white/5 px-5 py-4 text-sm md:grid-cols-[1fr_0.5fr_0.8fr_0.8fr_0.35fr]">
          <div>
            <p className="font-mono font-bold text-white">{item.action || 'activity.event'}</p>
            <p className="text-xs text-gray-500">TÃ¡c nhÃ¢n: {item.actorId || 'há»‡ thá»‘ng'}</p>
          </div>
          <Pill className={severityClass(item.severity)}>{severityLabels[item.severity || 'info']}</Pill>
          <span className="text-gray-400">{item.targetType || 'system'} / {item.targetId || '-'}</span>
          <span className="text-xs text-gray-500">{formatDate(item.createdAt)}</span>
          <button onClick={() => deleteActivityLog(item)} className="inline-flex w-fit items-center gap-1 rounded border border-red-500/20 bg-red-500/10 px-2 py-1 text-xs font-bold text-red-300 hover:bg-red-500/20">
            <Trash2 size={12} /> XÃ³a
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
            <h3 className="font-black text-white">Táº¡o sá»± kiá»‡n báº£o máº­t</h3>
            <p className="mt-1 text-xs text-gray-500">Ghi nháº­n truy cáº­p bá»‹ tá»« chá»‘i, link Ä‘Ã¡ng ngá», Ä‘á»•i vai trÃ² hoáº·c gá»­i biá»ƒu máº«u báº¥t thÆ°á»ng.</p>
          </div>
          <button type="submit" className="inline-flex items-center gap-2 rounded-lg bg-amber-500 px-4 py-2 text-xs font-bold uppercase tracking-wide text-black hover:bg-amber-300">
            <Plus size={15} /> Ghi sá»± kiá»‡n
          </button>
        </div>
        <div className="grid gap-3 md:grid-cols-4">
          <select value={eventForm.eventType} onChange={(event) => setEventForm((current) => ({ ...current, eventType: event.target.value }))} className="rounded-lg border border-white/10 bg-black/70 p-3 text-sm text-white outline-none focus:border-amber-400">
            <option value="login_failed">ÄÄƒng nháº­p tháº¥t báº¡i</option>
            <option value="repeated_login_failed">ÄÄƒng nháº­p tháº¥t báº¡i nhiá»u láº§n</option>
            <option value="permission_denied">Bá»‹ tá»« chá»‘i quyá»n truy cáº­p</option>
            <option value="role_changed">Thay Ä‘á»•i vai trÃ²</option>
            <option value="suspicious_help_case">Há»“ sÆ¡ trá»£ giÃºp Ä‘Ã¡ng ngá»</option>
            <option value="suspicious_upload_or_link">Upload/link Ä‘Ã¡ng ngá»</option>
            <option value="high_frequency_submission">Gá»­i biá»ƒu máº«u táº§n suáº¥t cao</option>
          </select>
          <input value={eventForm.actorId} onChange={(event) => setEventForm((current) => ({ ...current, actorId: event.target.value }))} placeholder="ID ngÆ°á»i dÃ¹ng/tÃ¡c nhÃ¢n" className="rounded-lg border border-white/10 bg-black/50 p-3 text-sm text-white outline-none focus:border-amber-400" />
          <select value={eventForm.severity} onChange={(event) => setEventForm((current) => ({ ...current, severity: event.target.value }))} className="rounded-lg border border-white/10 bg-black/70 p-3 text-sm text-white outline-none focus:border-amber-400">
            <option value="notice">ÄÃ¡ng chÃº Ã½</option>
            <option value="warning">Cáº£nh bÃ¡o</option>
            <option value="high">Cao</option>
            <option value="critical">NghiÃªm trá»ng</option>
          </select>
          <input value={eventForm.details} onChange={(event) => setEventForm((current) => ({ ...current, details: event.target.value }))} placeholder="Ghi chÃº chi tiáº¿t" className="rounded-lg border border-white/10 bg-black/50 p-3 text-sm text-white outline-none focus:border-amber-400" />
        </div>
      </form>

      <section className="rounded-lg border border-white/10 bg-[#07111f]/90">
        {dashboardSecurity.length === 0 ? (
          <div className="px-5 py-6 text-sm text-gray-500">ChÆ°a cÃ³ security event nÃ o trong Firestore.</div>
        ) : dashboardSecurity.map((item) => (
          <div key={item.id} className="grid gap-3 border-b border-white/5 px-5 py-4 text-sm md:grid-cols-[1fr_0.5fr_0.6fr_0.8fr_0.35fr]">
            <div>
              <p className="font-mono font-bold text-white">{item.eventType || 'security.event'}</p>
              <p className="text-xs text-gray-500">TÃ¡c nhÃ¢n: {item.actorId || 'khÃ´ng rÃµ'} / IP: {item.sourceIp || 'áº©n'}</p>
            </div>
            <Pill className={severityClass(item.severity)}>{severityLabels[item.severity || 'notice']}</Pill>
            <span className="text-gray-400">{roleLabels[item.actorRole || 'user']}</span>
            <span className="text-xs text-gray-500">{formatDate(item.createdAt)}</span>
            <button onClick={() => deleteSecurityEvent(item)} className="inline-flex w-fit items-center gap-1 rounded border border-red-500/20 bg-red-500/10 px-2 py-1 text-xs font-bold text-red-300 hover:bg-red-500/20">
              <Trash2 size={12} /> XÃ³a
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
          <p className="mt-3 text-sm leading-relaxed text-gray-400">{fields}</p>
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
              <p className="text-xs font-bold uppercase tracking-[0.26em] text-primary">Trung tÃ¢m Ä‘iá»u khiá»ƒn Deepfense</p>
            </div>
            <h1 className="text-2xl font-black text-white md:text-3xl">Báº£ng quáº£n trá»‹ Academy kiá»ƒu SOC</h1>
            <p className="mt-2 max-w-3xl text-sm text-gray-400">
              Quáº£n trá»‹ ngÆ°á»i dÃ¹ng, biÃªn táº­p viÃªn, quáº£n trá»‹ viÃªn, há»“ sÆ¡ trá»£ giÃºp, xÆ°á»Ÿng ná»™i dung, nháº­t kÃ½ hoáº¡t Ä‘á»™ng vÃ  sá»± kiá»‡n báº£o máº­t.
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <button onClick={exportDashboardJson} className="inline-flex items-center justify-center gap-2 rounded-lg border border-white/10 px-4 py-3 text-xs font-bold uppercase tracking-wide text-gray-300 hover:border-primary hover:text-white">
              <Download size={16} /> Xuáº¥t JSON
            </button>
            <button onClick={exportCasesCsv} className="inline-flex items-center justify-center gap-2 rounded-lg border border-white/10 px-4 py-3 text-xs font-bold uppercase tracking-wide text-gray-300 hover:border-primary hover:text-white">
              <Download size={16} /> Xuáº¥t Case CSV
            </button>
            <button onClick={() => signOut(auth)} className="inline-flex items-center justify-center gap-2 rounded-lg border border-white/10 px-4 py-3 text-xs font-bold uppercase tracking-wide text-gray-300 hover:border-primary hover:text-white">
              <LogOut size={16} /> ÄÄƒng xuáº¥t
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
                    className={`flex w-full items-center gap-3 rounded-lg px-3 py-3 text-left text-sm font-bold transition-colors ${isActive ? 'bg-primary text-white' : 'text-gray-400 hover:bg-white/5 hover:text-white'}`}
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
                  <button key={option} onClick={() => setTimeRange(option)} className={`rounded-lg border px-3 py-2 text-xs font-bold ${timeRange === option ? 'border-primary bg-primary/15 text-blue-200' : 'border-white/10 text-gray-400 hover:text-white'}`}>
                    {option}
                  </button>
                ))}
                <button onClick={resetControls} className="inline-flex items-center gap-2 rounded-lg border border-white/10 px-3 py-2 text-xs font-bold text-gray-400 hover:text-white">
                  <RefreshCw size={14} /> Äáº·t láº¡i
                </button>
              </div>

              {activeTab !== 'overview' && activeTab !== 'data' && (
                <div className="flex flex-col gap-2 sm:flex-row">
                  <label className="flex items-center gap-2 rounded-lg border border-white/10 bg-black/30 px-3 py-2">
                    <Search size={16} className="text-gray-500" />
                    <input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="TÃ¬m kiáº¿m..." className="w-full bg-transparent text-sm text-white outline-none placeholder:text-gray-600" />
                  </label>
                  {activeTab === 'users' && (
                    <select value={roleFilter} onChange={(event) => setRoleFilter(event.target.value as 'all' | Role)} className="rounded-lg border border-white/10 bg-black/70 px-3 py-2 text-sm text-white">
                      <option value="all">Táº¥t cáº£ vai trÃ²</option>
                      <option value="user">NgÆ°á»i há»c</option>
                      <option value="editor">BiÃªn táº­p viÃªn</option>
                      <option value="admin">Quáº£n trá»‹ viÃªn</option>
                    </select>
                  )}
                  {(activeTab === 'users' || activeTab === 'cases') && (
                    <label className="flex items-center gap-2 rounded-lg border border-white/10 bg-black/70 px-3 py-2 text-sm text-white">
                      <Filter size={15} className="text-gray-500" />
                      <select value={statusFilter} onChange={(event) => setStatusFilter(event.target.value)} className="bg-transparent outline-none">
                        <option value="all">Táº¥t cáº£ tráº¡ng thÃ¡i</option>
                        {activeTab === 'users' ? (
                          <>
                            <option value="active">Äang hoáº¡t Ä‘á»™ng</option>
                            <option value="inactive">Ãt hoáº¡t Ä‘á»™ng</option>
                            <option value="flagged">Cáº§n theo dÃµi</option>
                            <option value="banned">ÄÃ£ khÃ³a</option>
                          </>
                        ) : (
                          <>
                            <option value="new">Má»›i nháº­n</option>
                            <option value="reviewing">Äang xem xÃ©t</option>
                            <option value="replied">ÄÃ£ pháº£n há»“i</option>
                            <option value="closed">ÄÃ£ Ä‘Ã³ng</option>
                            <option value="archived">LÆ°u trá»¯</option>
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
