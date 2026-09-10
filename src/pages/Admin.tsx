import React, { useEffect, useMemo, useState } from 'react';
import { db, auth, storage } from '@/config/firebase';
import { signInWithEmailAndPassword, signOut, onAuthStateChanged, signInWithPopup } from 'firebase/auth';
import { googleProvider } from '@/config/firebase';
import { DEFAULT_SITE_CONFIG, type SiteConfig } from '@/config/siteConfig';
import {
  collection,
  addDoc,
  getDocs,
  getDoc,
  getCountFromServer,
  getAggregateFromServer,
  sum,
  query,
  where,
  orderBy,
  onSnapshot,
  runTransaction,
  updateDoc,
  setDoc,
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
  Crown,
  Globe2,
  MonitorCog,
  UserCog,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

type Role = 'user' | 'support' | 'editor' | 'admin' | 'owner';
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

const timeRangeOptions = ['Hôm nay', '7 ngày', '30 ngày', 'Tất cả'];

type AdminTab = 'overview' | 'users' | 'studio' | 'website' | 'cases' | 'dpf' | 'governance';
type WebsiteToggleKey = 'seasonalEnabled' | 'aiAgentEnabled' | 'leaderboardEnabled';

const consoleAccessRoles: Array<Exclude<Role, 'user'>> = ['owner', 'admin', 'editor', 'support'];

const canAccessAdminRole = (role?: string | null): role is Exclude<Role, 'user'> => (
  role === 'owner' || role === 'admin' || role === 'editor' || role === 'support'
);

const resolveConsoleRole = (email?: string | null, storedRole?: string | null): Exclude<Role, 'user'> | null => {
  if ((email || '').toLowerCase() === 'deepfense@gmail.com') return 'owner';
  return canAccessAdminRole(storedRole) ? storedRole : null;
};

const tabs: Array<{ id: AdminTab; label: string; description: string; icon: LucideIcon; roles: Exclude<Role, 'user'>[] }> = [
  { id: 'overview', label: 'Tổng quan', description: 'Sức khỏe vận hành', icon: Gauge, roles: consoleAccessRoles },
  { id: 'users', label: 'Người dùng', description: 'Hồ sơ, quyền, trạng thái', icon: Users, roles: ['owner', 'admin', 'support'] },
  { id: 'studio', label: 'Academy', description: 'Bài học và thử thách', icon: Layers, roles: ['owner', 'admin', 'editor'] },
  { id: 'website', label: 'Website', description: 'Nội dung hiển thị', icon: Globe2, roles: ['owner', 'admin', 'editor'] },
  { id: 'cases', label: 'Hỗ trợ', description: 'Hồ sơ tố giác và trợ giúp', icon: HelpCircle, roles: ['owner', 'admin', 'support'] },
  { id: 'dpf', label: 'DPF coin', description: 'Ví thưởng và sổ giao dịch', icon: Coins, roles: ['owner', 'admin'] },
  { id: 'governance', label: 'Quản trị', description: 'Nhật ký, bảo mật, dữ liệu', icon: Shield, roles: ['owner', 'admin'] },
];

const websiteToggleControls: Array<{ key: WebsiteToggleKey; label: string }> = [
  { key: 'seasonalEnabled', label: 'Hiệu ứng mùa đông' },
  { key: 'aiAgentEnabled', label: 'AI Agent' },
  { key: 'leaderboardEnabled', label: 'Bảng vinh danh' },
];

const roleLabels: Record<Role, string> = {
  user: 'Người học',
  support: 'Hỗ trợ người dùng',
  editor: 'Biên tập viên',
  admin: 'Quản trị viên',
  owner: 'Giám đốc / Owner',
};

const getRoleLabel = (role?: string | null) => {
  if (role === 'owner' || role === 'admin' || role === 'editor' || role === 'support' || role === 'user') {
    return roleLabels[role];
  }
  if (role === 'viewer') return 'Viewer - bị chặn';
  return 'Chưa phân quyền';
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
      return 'bg-black/10 dark:bg-white/10 text-slate-600 dark:text-gray-300 border-black/10 dark:border-white/10';
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
    <div className="rounded-lg border border-black/10 dark:border-white/10 bg-[#07111f]/90 p-4 shadow-xl shadow-black/20">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-[11px] font-bold uppercase tracking-[0.12em] text-slate-500 dark:text-slate-400">{label}</p>
          <div className="mt-3 text-3xl font-black text-slate-900 dark:text-white">{value}</div>
        </div>
        <div className={`rounded-lg border p-2 ${tones[tone]}`}>
          <Icon size={20} />
        </div>
      </div>
      <p className="mt-4 text-xs text-slate-600 dark:text-slate-300/85">{sub}</p>
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
  const [currentAdminRole, setCurrentAdminRole] = useState<Exclude<Role, 'user'> | null>(null);
  const [blockedUserEmail, setBlockedUserEmail] = useState('');
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
  const [websiteDraft, setWebsiteDraft] = useState<SiteConfig>(DEFAULT_SITE_CONFIG);
  const [dpfBusy, setDpfBusy] = useState(false);
  const [actionMessage, setActionMessage] = useState('');

  const visibleTabs = useMemo(() => {
    if (!currentAdminRole) return [];
    return tabs.filter((tab) => tab.roles.includes(currentAdminRole));
  }, [currentAdminRole]);

  const canManageUsers = currentAdminRole === 'owner' || currentAdminRole === 'admin';
  const canEditContent = currentAdminRole === 'owner' || currentAdminRole === 'admin' || currentAdminRole === 'editor';
  const canSupportCases = currentAdminRole === 'owner' || currentAdminRole === 'admin' || currentAdminRole === 'support';
  const canManageDpf = currentAdminRole === 'owner' || currentAdminRole === 'admin';
  const canUseDangerZone = currentAdminRole === 'owner';
  const canAssignRole = (role: Role) => role !== 'owner' || currentAdminRole === 'owner';

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      const verifyAdminAccess = async () => {
        if (!user) {
          setCurrentAdminRole(null);
          setBlockedUserEmail('');
          setIsAuthenticated(false);
          setIsAuthChecking(false);
          return;
        }

        const normalizedEmail = (user.email || '').toLowerCase();
        try {
          const userSnap = await getDoc(doc(db, 'users', user.uid));
          let storedRole = userSnap.exists() ? String(userSnap.data().role || '') : '';
          if (!storedRole && normalizedEmail) {
            const emailSnap = await getDocs(query(collection(db, 'users'), where('email', '==', normalizedEmail), limit(1)));
            storedRole = emailSnap.empty ? '' : String(emailSnap.docs[0].data().role || '');
          }
          const assignedRole = resolveConsoleRole(normalizedEmail, storedRole);

          if (!assignedRole) {
            setCurrentAdminRole(null);
            setBlockedUserEmail(user.email || normalizedEmail);
            setLoginError('Tài khoản này chưa được phân quyền truy cập Admin Dashboard.');
            setIsAuthenticated(false);
            setIsAuthChecking(false);
            return;
          }

          await setDoc(doc(db, 'users', user.uid), {
            uid: user.uid,
            email: user.email || '',
            displayName: user.displayName || '',
            photoURL: user.photoURL || '',
            role: assignedRole,
            canAccessAdmin: true,
            adminLastSeenAt: serverTimestamp(),
            updatedAt: serverTimestamp(),
          }, { merge: true });

          setCurrentAdminRole(assignedRole);
          setBlockedUserEmail('');
          setIsAuthenticated(true);
          setIsAuthChecking(false);
        } catch (error) {
          console.error('Admin role verification failed:', error);
          setCurrentAdminRole(null);
          setBlockedUserEmail(user.email || normalizedEmail);
          setLoginError('Không thể xác minh quyền quản trị. Vui lòng kiểm tra Firestore role của tài khoản.');
          setIsAuthenticated(false);
          setIsAuthChecking(false);
        }
      };

      setIsAuthChecking(true);
      void verifyAdminAccess();
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (!currentAdminRole) return;
    if (visibleTabs.some((tab) => tab.id === activeTab)) return;
    setActiveTab(visibleTabs[0]?.id || 'overview');
  }, [activeTab, currentAdminRole, visibleTabs]);

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
      onSnapshot(doc(db, 'site_config', 'main'), (snapshot) => {
        if (!snapshot.exists()) return;
        const data = snapshot.data() as Partial<SiteConfig>;
        setWebsiteDraft((current) => ({
          ...current,
          ...data,
          seasonalEnabled: typeof data.seasonalEnabled === 'boolean' ? data.seasonalEnabled : current.seasonalEnabled,
          aiAgentEnabled: typeof data.aiAgentEnabled === 'boolean' ? data.aiAgentEnabled : current.aiAgentEnabled,
          leaderboardEnabled: typeof data.leaderboardEnabled === 'boolean' ? data.leaderboardEnabled : current.leaderboardEnabled,
        }));
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
      setLoginError('Sai thông tin đăng nhập hoặc tài khoản chưa được cấp quyền.');
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
      actorRole: currentAdminRole || 'admin',
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
    if (!canManageDpf) {
      showActionMessage('Tài khoản hiện tại không có quyền quản lý DPF coin.');
      return;
    }

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
          role: currentAdminRole || 'admin',
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
    if (!canManageDpf) {
      showActionMessage('Tài khoản hiện tại không có quyền thu hồi DPF coin.');
      return;
    }

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
    if (!canSupportCases) {
      showActionMessage('Tài khoản hiện tại không có quyền xử lý hồ sơ hỗ trợ.');
      return;
    }

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
    if (!canSupportCases) {
      showActionMessage('Tài khoản hiện tại không có quyền lưu phản hồi hồ sơ.');
      return;
    }

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
    if (!(currentAdminRole === 'owner' || currentAdminRole === 'admin')) {
      showActionMessage('Chỉ Owner hoặc Admin được xóa hồ sơ hỗ trợ.');
      return;
    }

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
    if (!canManageUsers) {
      showActionMessage('Tài khoản hiện tại không có quyền đổi vai trò người dùng.');
      return;
    }
    if (!canAssignRole(role)) {
      showActionMessage('Chỉ Owner được gán quyền Owner.');
      return;
    }
    if ((user.uid || user.id) === auth.currentUser?.uid && role !== currentAdminRole) {
      showActionMessage('Không đổi quyền của chính tài khoản đang quản trị tại đây.');
      return;
    }

    const canAccessAdmin = canAccessAdminRole(role);
    await updateDoc(doc(db, 'users', user.uid || user.id), { role, canAccessAdmin });
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
      actorRole: currentAdminRole || 'admin',
      severity: 'notice',
      sourceIp: 'client',
      details: { targetUser: user.uid || user.id, role },
      createdAt: serverTimestamp(),
    });
    showActionMessage('Đã cập nhật vai trò và ghi sự kiện bảo mật.');
  };

  const resetAllUserProgress = async () => {
    if (!canUseDangerZone) {
      showActionMessage('Chỉ Owner được reset toàn bộ tiến độ người dùng.');
      return;
    }

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
        if (data.role === 'owner' || data.role === 'admin' || isAdminEmail(data.email)) return Promise.resolve();
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
    if (!canManageUsers) {
      showActionMessage('Tài khoản hiện tại không có quyền đổi trạng thái người dùng.');
      return;
    }

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
    if (!canManageUsers) {
      showActionMessage('Tài khoản hiện tại không có quyền xóa hồ sơ người dùng.');
      return;
    }

    const userId = user.uid || user.id;
    if (userId === auth.currentUser?.uid) {
      showActionMessage('Không xóa chính hồ sơ đang dùng để quản trị.');
      return;
    }

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
    if (!canManageDpf) {
      showActionMessage('Tài khoản hiện tại không có quyền xóa giao dịch DPF.');
      return;
    }

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
    if (!(currentAdminRole === 'owner' || currentAdminRole === 'admin')) {
      showActionMessage('Chỉ Owner hoặc Admin được xóa nhật ký hoạt động.');
      return;
    }

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
    if (!(currentAdminRole === 'owner' || currentAdminRole === 'admin')) {
      showActionMessage('Chỉ Owner hoặc Admin được xóa sự kiện bảo mật.');
      return;
    }

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
    if (!canManageUsers) {
      showActionMessage('Tài khoản hiện tại không có quyền tạo hồ sơ người dùng.');
      return;
    }
    if (!userForm.email.trim()) {
      showActionMessage('Cần nhập email để tạo hồ sơ người dùng.');
      return;
    }
    if (!canAssignRole(userForm.role as Role)) {
      showActionMessage('Chỉ Owner được tạo hồ sơ có quyền Owner.');
      return;
    }

    const docRef = await addDoc(collection(db, 'users'), {
      email: userForm.email.trim().toLowerCase(),
      displayName: userForm.displayName.trim() || userForm.email.trim(),
      role: userForm.role,
      canAccessAdmin: canAccessAdminRole(userForm.role),
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
      severity: userForm.role === 'admin' || userForm.role === 'owner' ? 'warning' : 'notice',
      metadata: { email: userForm.email, role: userForm.role, status: userForm.status },
    });

    setUserForm({ email: '', displayName: '', role: 'user', status: 'active' });
    showActionMessage('Đã tạo hồ sơ người dùng mới.');
  };

  const createChallenge = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!canEditContent) {
      showActionMessage('Tài khoản hiện tại không có quyền tạo nội dung Academy.');
      return;
    }
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
    if (!canEditContent) {
      showActionMessage('Tài khoản hiện tại không có quyền cập nhật nội dung Academy.');
      return;
    }

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
    if (!canEditContent) {
      showActionMessage('Tài khoản hiện tại không có quyền xóa nội dung Academy.');
      return;
    }

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
    if (!(currentAdminRole === 'owner' || currentAdminRole === 'admin')) {
      showActionMessage('Chỉ Owner hoặc Admin được tạo sự kiện bảo mật thủ công.');
      return;
    }

    await addDoc(collection(db, 'security_events'), {
      eventType: eventForm.eventType,
      actorId: eventForm.actorId || auth.currentUser?.uid || 'admin',
      actorRole: currentAdminRole || 'admin',
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

  const updateWebsiteDraftField = <Key extends keyof SiteConfig>(key: Key, value: SiteConfig[Key]) => {
    setWebsiteDraft((current) => ({ ...current, [key]: value }));
  };

  const saveWebsiteDraft = async (status: SiteConfig['status']) => {
    if (!canEditContent) {
      showActionMessage('Tài khoản hiện tại không có quyền chỉnh nội dung website.');
      return;
    }

    await setDoc(doc(db, 'site_config', 'main'), {
      ...websiteDraft,
      status,
      updatedBy: auth.currentUser?.email || auth.currentUser?.uid || 'admin',
      updatedAt: serverTimestamp(),
      ...(status === 'published' ? { publishedAt: serverTimestamp() } : {}),
    }, { merge: true });

    await writeActivityLog({
      action: status === 'published' ? 'editor.website_published' : 'editor.website_draft_saved',
      targetType: 'site_config',
      targetId: 'main',
      severity: status === 'published' ? 'notice' : 'info',
      metadata: { heroTitle: websiteDraft.heroTitle, marquee: websiteDraft.marquee },
    });

    showActionMessage(status === 'published' ? 'Đã xuất bản cấu hình website.' : 'Đã lưu nháp cấu hình website.');
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
        <div className="w-full max-w-sm rounded-lg border border-black/10 dark:border-white/10 bg-[#07111f] p-8 text-center shadow-2xl shadow-black/40">
          <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-lg border border-primary/30 bg-primary/10">
            <Lock className="text-primary" size={32} />
          </div>
          <p className="mb-2 text-xs font-bold uppercase tracking-[0.28em] text-primary">Trung tâm điều khiển Deepfense</p>
          <h2 className="mb-6 text-xl font-black text-slate-900 dark:text-white">Đăng nhập quản trị</h2>
          {blockedUserEmail && (
            <div className="mb-5 rounded-lg border border-amber-500/30 bg-amber-500/10 p-3 text-left text-xs leading-relaxed text-amber-100">
              <b>{blockedUserEmail}</b> đã đăng nhập nhưng chưa có quyền admin. Hãy phân quyền trong Firestore bằng một trong các role: owner, admin, editor, support.
            </div>
          )}
          
          <button onClick={handleGoogleLogin} className="mb-6 flex w-full items-center justify-center gap-2 rounded-lg border border-blue-500/30 bg-blue-500/10 py-3 text-sm font-bold text-blue-300 transition-colors hover:bg-blue-500 hover:text-slate-900 dark:text-white">
            <LogIn size={18} /> Đăng nhập bằng Google
          </button>

          <div className="mb-6 flex items-center gap-4 text-xs font-bold text-slate-500 dark:text-slate-400 before:h-px before:flex-1 before:bg-black/10 dark:bg-white/10 after:h-px after:flex-1 after:bg-black/10 dark:bg-white/10">
            HOẶC DÙNG EMAIL
          </div>

          <form onSubmit={handleLogin} className="text-left">
            <input
              type="email"
              placeholder="Email quản trị"
              className="mb-4 w-full rounded-lg border border-black/20 dark:border-white/20 bg-white dark:bg-black p-3 text-center text-slate-900 dark:text-white outline-none focus:border-primary"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />
            <input
              type="password"
              placeholder="Mật khẩu"
              className="mb-4 w-full rounded-lg border border-black/20 dark:border-white/20 bg-white dark:bg-black p-3 text-center text-slate-900 dark:text-white outline-none focus:border-primary"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
            {loginError && <div className="mb-4 text-xs font-bold text-red-400">{loginError}</div>}
            <button type="submit" className="w-full rounded-lg bg-primary py-3 font-bold text-slate-900 dark:text-white transition-colors hover:bg-blue-500">
              Truy cập bằng mật khẩu
            </button>
          </form>
        </div>
      </div>
    );
  }

  const renderOverview = () => {
    const urgentCases = dashboardCases
      .filter((item) => ['new', 'reviewing'].includes(item.status || 'new'))
      .slice(0, 5);
    const draftChallenges = dashboardChallenges
      .filter((item) => item.status === 'draft')
      .slice(0, 5);
    const notableLedger = canManageDpf
      ? dpfLedger.filter((entry) => (entry.amount || 0) >= 500).slice(0, 4)
      : [];
    const roleRows: Array<{ role: Exclude<Role, 'user'>; scope: string }> = [
      { role: 'owner', scope: 'Toàn quyền: người dùng, nội dung, DPF, bảo mật, reset hệ thống.' },
      { role: 'admin', scope: 'Vận hành chính: người dùng, hỗ trợ, nội dung, DPF, nhật ký.' },
      { role: 'editor', scope: 'Chỉ chỉnh Academy và cấu hình hiển thị website.' },
      { role: 'support', scope: 'Chỉ xem người dùng liên quan và xử lý hồ sơ hỗ trợ.' },
    ];

    return (
      <div className="space-y-6">
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          <StatCard label="Người học" value={stats.activeLearners} sub="Tài khoản không bị khóa trong collection users." icon={Users} tone="blue" />
          <StatCard label="Lượt luyện tập" value={trainingStats.isLoading ? '...' : trainingStats.totalAttempts} sub="Đọc trực tiếp từ game_results." icon={BarChart3} tone="green" />
          <StatCard label="Độ chính xác" value={trainingStats.isLoading ? '...' : `${trainingStats.averageAccuracy}%`} sub="Tổng score chia cho tổng lượt luyện tập." icon={Gauge} tone="green" />
          <StatCard label="Hồ sơ cần xử lý" value={stats.openCases} sub="Case mới hoặc đang xem xét." icon={HelpCircle} tone="amber" />
          <StatCard label="Rủi ro cao" value={stats.highRisk} sub="Hồ sơ high hoặc critical." icon={Flame} tone="red" />
          <StatCard label="Nội dung nháp" value={stats.reviewQueue} sub="Challenge chờ duyệt/xuất bản." icon={BookOpen} tone="blue" />
          <StatCard label="Vượt chuẩn" value={trainingStats.isLoading ? '...' : trainingStats.protectedUsers} sub="Lượt đạt score từ 9 trở lên." icon={CheckCircle} tone="green" />
          <StatCard label="Sổ DPF" value={dpfLedger.length} sub="Giao dịch DPF gần đây đã tải." icon={Coins} tone="amber" />
        </div>

        <div className="grid gap-4 xl:grid-cols-[1.15fr_0.85fr]">
          <section className="rounded-lg border border-black/10 bg-white/70 p-5 shadow-sm backdrop-blur-xl dark:border-white/10 dark:bg-[#07111f]/82">
            <div className="mb-5 flex flex-col justify-between gap-3 sm:flex-row sm:items-start">
              <div>
                <h3 className="font-black text-slate-900 dark:text-white">Hàng đợi điều hành</h3>
                <p className="mt-1 text-sm text-slate-600 dark:text-slate-300/85">Những việc cần nhìn trước khi chỉnh nội dung hoặc dữ liệu.</p>
              </div>
              <Pill className="border-primary/30 bg-primary/10 text-blue-200">Vai trò: {getRoleLabel(currentAdminRole)}</Pill>
            </div>

            <div className="space-y-3">
              {urgentCases.length === 0 && draftChallenges.length === 0 && notableLedger.length === 0 ? (
                <div className="rounded-lg border border-black/10 bg-black/5 p-4 text-sm text-slate-600 dark:border-white/10 dark:bg-white/5 dark:text-slate-300">
                  Chưa có hàng đợi ưu tiên trong dữ liệu hiện tại.
                </div>
              ) : null}

              {urgentCases.map((item) => (
                <button key={item.id} onClick={() => setActiveTab('cases')} className="flex w-full items-start gap-3 rounded-lg border border-amber-500/20 bg-amber-500/10 p-3 text-left transition-colors hover:border-amber-400/60">
                  <HelpCircle className="mt-0.5 text-amber-300" size={16} />
                  <span className="min-w-0 flex-1">
                    <span className="block truncate text-sm font-bold text-slate-900 dark:text-white">{item.title || item.description || item.desc || 'Hồ sơ cần xử lý'}</span>
                    <span className="mt-1 block text-xs text-slate-600 dark:text-slate-300/85">{item.email || 'Không có email'} / {caseStatusLabels[item.status || 'new']} / {severityLabels[item.severity || 'medium']}</span>
                  </span>
                </button>
              ))}

              {draftChallenges.map((item) => (
                <button key={item.id} onClick={() => setActiveTab('studio')} className="flex w-full items-start gap-3 rounded-lg border border-primary/20 bg-primary/10 p-3 text-left transition-colors hover:border-primary/60">
                  <BookOpen className="mt-0.5 text-primary" size={16} />
                  <span className="min-w-0 flex-1">
                    <span className="block truncate text-sm font-bold text-slate-900 dark:text-white">{item.title || 'Challenge chưa đặt tên'}</span>
                    <span className="mt-1 block text-xs text-slate-600 dark:text-slate-300/85">{challengeTypeLabels[item.type || ''] || item.type || 'Bài luyện tập'} / {difficultyLabels[item.difficulty || 'medium']}</span>
                  </span>
                </button>
              ))}

              {notableLedger.map((entry) => (
                <button key={entry.id} onClick={() => setActiveTab('dpf')} className="flex w-full items-start gap-3 rounded-lg border border-amber-400/20 bg-amber-400/10 p-3 text-left transition-colors hover:border-amber-300/60">
                  <Coins className="mt-0.5 text-amber-200" size={16} />
                  <span className="min-w-0 flex-1">
                    <span className="block truncate text-sm font-bold text-slate-900 dark:text-white">{entry.direction === 'debit' ? 'Thu hồi' : 'Cấp'} {(entry.amount || 0).toLocaleString('vi-VN')} DPF</span>
                    <span className="mt-1 block text-xs text-slate-600 dark:text-slate-300/85">{entry.uid || 'Không có UID'} / {formatDate(entry.createdAt)}</span>
                  </span>
                </button>
              ))}
            </div>
          </section>

          <section className="rounded-lg border border-black/10 bg-white/70 p-5 shadow-sm backdrop-blur-xl dark:border-white/10 dark:bg-[#07111f]/82">
            <div className="mb-5 flex items-center justify-between">
              <div>
                <h3 className="font-black text-slate-900 dark:text-white">Phân quyền truy cập</h3>
                <p className="mt-1 text-sm text-slate-600 dark:text-slate-300/85">Không có viewer. User thường không được vào dashboard.</p>
              </div>
              <Crown className="text-amber-300" size={20} />
            </div>
            <div className="space-y-3">
              {roleRows.map((row) => (
                <div key={row.role} className="rounded-lg border border-black/10 bg-black/5 p-3 dark:border-white/10 dark:bg-white/5">
                  <div className="mb-1 flex items-center justify-between gap-3">
                    <span className="text-sm font-black text-slate-900 dark:text-white">{getRoleLabel(row.role)}</span>
                    <Pill className="border-emerald-400/30 bg-emerald-400/10 text-emerald-200">Được phân quyền</Pill>
                  </div>
                  <p className="text-xs leading-relaxed text-slate-600 dark:text-slate-300/85">{row.scope}</p>
                </div>
              ))}
            </div>
          </section>
        </div>

        <section className="rounded-lg border border-black/10 bg-white/70 p-5 shadow-sm backdrop-blur-xl dark:border-white/10 dark:bg-[#07111f]/82">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <h3 className="font-black text-slate-900 dark:text-white">Nhật ký gần đây</h3>
              <p className="mt-1 text-sm text-slate-600 dark:text-slate-300/85">Các thao tác quản trị mới nhất để bạn truy vết nhanh.</p>
            </div>
            <Activity className="text-primary" size={20} />
          </div>
          <div className="grid gap-3 lg:grid-cols-2">
            {dashboardActivity.slice(0, 6).map((item) => (
              <div key={item.id} className="flex items-start gap-3 rounded-lg border border-black/10 bg-black/5 p-3 dark:border-white/10 dark:bg-white/5">
                <Radio className="mt-0.5 text-primary" size={16} />
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="font-mono text-sm text-slate-900 dark:text-white">{item.action || 'activity.event'}</span>
                    <Pill className={severityClass(item.severity)}>{severityLabels[item.severity || 'info']}</Pill>
                  </div>
                  <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">{getRoleLabel(item.actorRole)} / {item.targetType || 'system'} / {formatDate(item.createdAt)}</p>
                </div>
              </div>
            ))}
            {dashboardActivity.length === 0 && (
              <div className="rounded-lg border border-black/10 bg-black/5 p-4 text-sm text-slate-600 dark:border-white/10 dark:bg-white/5 dark:text-slate-300">
                Chưa có activity log.
              </div>
            )}
          </div>
        </section>
      </div>
    );
  };

  const renderUsers = () => (
    <div className="space-y-5">
      <form onSubmit={createUserRecord} className="rounded-lg border border-primary/20 bg-[#07111f]/90 p-5">
        <div className="mb-4 flex items-center justify-between gap-3">
          <div>
            <h3 className="font-black text-slate-900 dark:text-white">Tạo hồ sơ người dùng</h3>
            <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">Dùng để tạo hồ sơ quản trị trong Firestore khi tài khoản chưa tự đồng bộ.</p>
          </div>
          <button type="submit" disabled={!canManageUsers} className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-xs font-bold uppercase tracking-wide text-slate-900 dark:text-white hover:bg-blue-500 disabled:cursor-not-allowed disabled:opacity-50">
            <Plus size={15} /> Tạo hồ sơ
          </button>
        </div>
        {!canManageUsers && (
          <div className="mb-4 rounded-lg border border-amber-500/30 bg-amber-500/10 p-3 text-xs text-amber-100">
            Role hiện tại chỉ được xem dữ liệu người dùng. Tạo hồ sơ, đổi quyền, khóa hoặc xóa tài khoản cần Owner/Admin.
          </div>
        )}
        <div className="grid gap-3 md:grid-cols-4">
          <input disabled={!canManageUsers} value={userForm.email} onChange={(event) => setUserForm((current) => ({ ...current, email: event.target.value }))} placeholder="Email người dùng" className="rounded-lg border border-black/10 dark:border-white/10 bg-black/50 p-3 text-sm text-slate-900 dark:text-white outline-none focus:border-primary disabled:cursor-not-allowed disabled:opacity-50" />
          <input disabled={!canManageUsers} value={userForm.displayName} onChange={(event) => setUserForm((current) => ({ ...current, displayName: event.target.value }))} placeholder="Tên hiển thị" className="rounded-lg border border-black/10 dark:border-white/10 bg-black/50 p-3 text-sm text-slate-900 dark:text-white outline-none focus:border-primary disabled:cursor-not-allowed disabled:opacity-50" />
          <select disabled={!canManageUsers} value={userForm.role} onChange={(event) => setUserForm((current) => ({ ...current, role: event.target.value }))} className="rounded-lg border border-black/10 dark:border-white/10 bg-black/70 p-3 text-sm text-slate-900 dark:text-white outline-none focus:border-primary disabled:cursor-not-allowed disabled:opacity-50">
            <option value="user">Người học</option>
            <option value="support">Hỗ trợ người dùng</option>
            <option value="editor">Biên tập viên</option>
            <option value="admin">Quản trị viên</option>
            {currentAdminRole === 'owner' && <option value="owner">Giám đốc / Owner</option>}
          </select>
          <select disabled={!canManageUsers} value={userForm.status} onChange={(event) => setUserForm((current) => ({ ...current, status: event.target.value }))} className="rounded-lg border border-black/10 dark:border-white/10 bg-black/70 p-3 text-sm text-slate-900 dark:text-white outline-none focus:border-primary disabled:cursor-not-allowed disabled:opacity-50">
            <option value="active">Đang hoạt động</option>
            <option value="inactive">Ít hoạt động</option>
            <option value="flagged">Cần theo dõi</option>
            <option value="banned">Đã khóa</option>
          </select>
        </div>
      </form>

      <section className="rounded-lg border border-black/10 dark:border-white/10 bg-[#07111f]/90 p-5">
        <div className="mb-5 flex flex-col justify-between gap-3 lg:flex-row lg:items-center">
          <div>
            <h3 className="font-black text-slate-900 dark:text-white">Profile người dùng</h3>
            <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">Chọn một dòng trong bảng để xem hồ sơ, DPF coin, case liên quan và nhật ký thao tác.</p>
          </div>
          {selectedUser && (
            <div className="flex flex-wrap gap-2">
              {canManageUsers && (
                <>
                  <button onClick={() => changeUserStatus(selectedUser, selectedUser.status === 'flagged' ? 'active' : 'flagged')} className="inline-flex items-center gap-2 rounded-lg border border-amber-500/30 px-3 py-2 text-xs font-bold text-amber-200 hover:bg-amber-500/10">
                    <ShieldAlert size={14} /> {selectedUser.status === 'flagged' ? 'Bỏ theo dõi' : 'Theo dõi'}
                  </button>
                  <button onClick={() => changeUserStatus(selectedUser, selectedUser.status === 'banned' ? 'active' : 'banned')} className="inline-flex items-center gap-2 rounded-lg border border-red-500/30 px-3 py-2 text-xs font-bold text-red-300 hover:bg-red-500/10">
                    <Ban size={14} /> {selectedUser.status === 'banned' ? 'Mở khóa' : 'Khóa tài khoản'}
                  </button>
                  <button onClick={() => deleteUserRecord(selectedUser)} className="inline-flex items-center gap-2 rounded-lg border border-red-500/30 bg-red-500/10 px-3 py-2 text-xs font-bold text-red-300 hover:bg-red-500/20">
                    <Trash2 size={14} /> Xóa hồ sơ
                  </button>
                </>
              )}
              {canManageDpf && (
                <>
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
                </>
              )}
            </div>
          )}
        </div>

        {!selectedUser ? (
          <div className="rounded-lg border border-black/10 dark:border-white/10 bg-black/25 p-5 text-sm text-slate-500 dark:text-slate-400">
            Chưa có user thật trong Firestore. Hãy tạo hồ sơ hoặc để người dùng đăng nhập để dashboard đồng bộ.
          </div>
        ) : (
          <div className="grid gap-4 xl:grid-cols-[0.9fr_1.1fr]">
            <div className="rounded-lg border border-black/10 dark:border-white/10 bg-black/25 p-4">
              <div className="mb-4 flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <p className="truncate text-xl font-black text-slate-900 dark:text-white">{selectedUser.displayName || 'Chưa đặt tên'}</p>
                  <p className="truncate text-sm text-slate-600 dark:text-slate-300/85">{selectedUser.email || selectedUser.uid || selectedUser.id}</p>
                </div>
                <Pill className={statusClass(selectedUser.status)}>{userStatusLabels[selectedUser.status || 'active']}</Pill>
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                <div className="rounded border border-black/10 dark:border-white/5 bg-black/30 p-3">
                  <p className="text-xs text-slate-500 dark:text-slate-400">Vai trò</p>
                  <p className="mt-1 font-bold text-slate-900 dark:text-white">{getRoleLabel(selectedUser.role)}</p>
                </div>
                <div className="rounded border border-black/10 dark:border-white/5 bg-black/30 p-3">
                  <p className="text-xs text-slate-500 dark:text-slate-400">DPF webBalance</p>
                  <p className="mt-1 font-bold text-amber-200">{(selectedUser.webBalance || 0).toLocaleString('vi-VN')}</p>
                </div>
                <div className="rounded border border-black/10 dark:border-white/5 bg-black/30 p-3">
                  <p className="text-xs text-slate-500 dark:text-slate-400">Challenge</p>
                  <p className="mt-1 font-bold text-slate-900 dark:text-white">{selectedUser.totalChallenges || 0}</p>
                </div>
                <div className="rounded border border-black/10 dark:border-white/5 bg-black/30 p-3">
                  <p className="text-xs text-slate-500 dark:text-slate-400">Độ đúng</p>
                  <p className="mt-1 font-bold text-slate-900 dark:text-white">{selectedUser.accuracy || 0}%</p>
                </div>
                <div className="rounded border border-black/10 dark:border-white/5 bg-black/30 p-3">
                  <p className="text-xs text-slate-500 dark:text-slate-400">Tạo hồ sơ</p>
                  <p className="mt-1 text-xs text-slate-600 dark:text-gray-300">{formatDate(selectedUser.createdAt)}</p>
                </div>
                <div className="rounded border border-black/10 dark:border-white/5 bg-black/30 p-3">
                  <p className="text-xs text-slate-500 dark:text-slate-400">Hoạt động cuối</p>
                  <p className="mt-1 text-xs text-slate-600 dark:text-gray-300">{formatDate(selectedUser.lastActiveAt)}</p>
                </div>
              </div>
            </div>

            <div className="grid gap-3 md:grid-cols-3">
              <div className="rounded-lg border border-black/10 dark:border-white/10 bg-black/25 p-4">
                <p className="text-xs font-bold uppercase tracking-wide text-slate-500 dark:text-slate-400">Case liên quan</p>
                <p className="mt-2 text-2xl font-black text-slate-900 dark:text-white">{selectedUserCases.length}</p>
                <div className="mt-3 space-y-2">
                  {selectedUserCases.slice(0, 3).map((item) => (
                    <button key={item.id} onClick={() => setActiveTab('cases')} className="block w-full truncate rounded border border-black/10 dark:border-white/5 px-2 py-2 text-left text-xs text-slate-600 dark:text-gray-300 hover:border-primary">
                      {item.title || item.description || item.id}
                    </button>
                  ))}
                </div>
              </div>
              <div className="rounded-lg border border-black/10 dark:border-white/10 bg-black/25 p-4">
                <p className="text-xs font-bold uppercase tracking-wide text-slate-500 dark:text-slate-400">Nhật ký</p>
                <p className="mt-2 text-2xl font-black text-slate-900 dark:text-white">{selectedUserActivity.length}</p>
                <div className="mt-3 space-y-2">
                  {selectedUserActivity.slice(0, 3).map((item) => (
                    <button key={item.id} onClick={() => setActiveTab('governance')} className="block w-full truncate rounded border border-black/10 dark:border-white/5 px-2 py-2 text-left font-mono text-xs text-slate-600 dark:text-gray-300 hover:border-primary">
                      {item.action || item.id}
                    </button>
                  ))}
                </div>
              </div>
              <div className="rounded-lg border border-black/10 dark:border-white/10 bg-black/25 p-4">
                <p className="text-xs font-bold uppercase tracking-wide text-slate-500 dark:text-slate-400">DPF ledger</p>
                <p className="mt-2 text-2xl font-black text-slate-900 dark:text-white">{selectedUserLedger.length}</p>
                <div className="mt-3 space-y-2">
                  {selectedUserLedger.slice(0, 3).map((entry) => (
                    <button key={entry.id} onClick={() => setActiveTab('dpf')} className="block w-full truncate rounded border border-black/10 dark:border-white/5 px-2 py-2 text-left text-xs text-amber-200 hover:border-amber-400">
                      +{(entry.amount || 0).toLocaleString('vi-VN')} DPF
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </section>

      <section className="overflow-x-auto rounded-lg border border-black/10 dark:border-white/10 bg-[#07111f]/90">
        <div className="grid min-w-[1050px] grid-cols-[1.4fr_0.7fr_0.8fr_0.6fr_0.6fr_0.6fr_0.8fr_1.1fr] gap-3 border-b border-black/10 dark:border-white/10 px-4 py-3 text-[11px] font-bold uppercase tracking-[0.12em] text-slate-500 dark:text-slate-400">
          <span>Người dùng</span><span>Vai trò</span><span>Trạng thái</span><span>Challenge</span><span>Độ đúng</span><span>Điểm</span><span>Lần cuối</span><span>Điều khiển</span>
        </div>
        <div className="divide-y divide-white/5">
          {filteredUsers.length === 0 ? (
            <div className="px-4 py-6 text-sm text-slate-500 dark:text-slate-400">Không có user thật phù hợp bộ lọc hiện tại.</div>
          ) : filteredUsers.map((user) => (
            <div key={user.id} className="grid min-w-[1050px] grid-cols-[1.4fr_0.7fr_0.8fr_0.6fr_0.6fr_0.6fr_0.8fr_1.1fr] gap-3 px-4 py-4 text-sm">
              <div className="min-w-0">
                <p className="truncate font-bold text-slate-900 dark:text-white">{user.displayName || 'Chưa đặt tên'}</p>
                <p className="truncate text-xs text-slate-500 dark:text-slate-400">{user.email || user.uid || user.id}</p>
              </div>
              <Pill className="border-primary/30 bg-primary/10 text-blue-200">{getRoleLabel(user.role)}</Pill>
              <Pill className={statusClass(user.status)}>{userStatusLabels[user.status || 'active']}</Pill>
              <span className="text-slate-600 dark:text-gray-300">{user.totalChallenges || 0}</span>
              <span className="text-slate-600 dark:text-gray-300">{user.accuracy || 0}%</span>
              <span className="text-slate-600 dark:text-gray-300">{user.score || 0}</span>
              <span className="text-xs text-slate-500 dark:text-slate-400">{formatDate(user.lastActiveAt)}</span>
              <div className="flex flex-wrap gap-2">
                <button onClick={() => setSelectedUserId(user.uid || user.id)} className="rounded border border-primary/30 px-2 py-1 text-xs font-bold text-blue-200 hover:bg-primary/10">
                  Profile
                </button>
                {canManageUsers ? (
                  <>
                    <select value={user.role || 'user'} onChange={(event) => changeUserRole(user, event.target.value as Role)} className="rounded border border-black/10 dark:border-white/10 bg-white dark:bg-black px-2 py-1 text-xs text-slate-900 dark:text-white">
                      <option value="user">Người học</option>
                      <option value="support">Hỗ trợ</option>
                      <option value="editor">Biên tập</option>
                      <option value="admin">Admin</option>
                      {currentAdminRole === 'owner' && <option value="owner">Owner</option>}
                    </select>
                    <button onClick={() => changeUserStatus(user, user.status === 'flagged' ? 'active' : 'flagged')} className="rounded border border-black/10 dark:border-white/10 px-2 py-1 text-xs font-bold text-slate-600 dark:text-gray-300 hover:border-amber-400 hover:text-amber-200">
                      Theo dõi
                    </button>
                    <button onClick={() => changeUserStatus(user, user.status === 'banned' ? 'active' : 'banned')} className="inline-flex items-center gap-1 rounded border border-black/10 dark:border-white/10 px-2 py-1 text-xs font-bold text-slate-600 dark:text-gray-300 hover:border-red-400 hover:text-red-300">
                      <Ban size={12} /> {user.status === 'banned' ? 'Mở khóa' : 'Khóa'}
                    </button>
                    <button onClick={() => deleteUserRecord(user)} className="inline-flex items-center gap-1 rounded border border-red-500/20 bg-red-500/10 px-2 py-1 text-xs font-bold text-red-300 hover:bg-red-500/20">
                      <Trash2 size={12} /> Xóa
                    </button>
                  </>
                ) : (
                  <span className="rounded border border-black/10 px-2 py-1 text-xs font-bold text-slate-500 dark:border-white/10 dark:text-slate-400">Chỉ xem</span>
                )}
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
              <h3 className="font-black text-slate-900 dark:text-white">Cấp DPF coin cho người dùng</h3>
              <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                Nhập email hoặc UID. Coin sẽ được cộng vào webBalance và ghi lại trong dpf_ledger để kiểm tra.
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              <button
                type="submit"
                disabled={dpfBusy}
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-amber-500 px-4 py-2 text-xs font-black uppercase tracking-[0.12em] text-slate-900 dark:text-white hover:bg-amber-400 disabled:cursor-not-allowed disabled:opacity-60"
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
            <label className="text-xs font-bold uppercase tracking-wide text-slate-500 dark:text-slate-400">
              Email hoặc UID
              <input
                value={dpfForm.target}
                onChange={(event) => setDpfForm((current) => ({ ...current, target: event.target.value }))}
                placeholder="deepfense@gmail.com"
                className="mt-2 w-full rounded-lg border border-black/10 dark:border-white/10 bg-black/50 p-3 text-sm text-slate-900 dark:text-white outline-none focus:border-amber-400"
              />
            </label>
            <label className="text-xs font-bold uppercase tracking-wide text-slate-500 dark:text-slate-400">
              Số DPF coin
              <input
                value={dpfForm.amount}
                onChange={(event) => setDpfForm((current) => ({ ...current, amount: event.target.value }))}
                inputMode="numeric"
                placeholder="1000"
                className="mt-2 w-full rounded-lg border border-black/10 dark:border-white/10 bg-black/50 p-3 text-sm text-slate-900 dark:text-white outline-none focus:border-amber-400"
              />
            </label>
            <label className="text-xs font-bold uppercase tracking-wide text-slate-500 dark:text-slate-400">
              Lý do
              <input
                value={dpfForm.reason}
                onChange={(event) => setDpfForm((current) => ({ ...current, reason: event.target.value }))}
                placeholder="Admin bonus DPF coin"
                className="mt-2 w-full rounded-lg border border-black/10 dark:border-white/10 bg-black/50 p-3 text-sm text-slate-900 dark:text-white outline-none focus:border-amber-400"
              />
            </label>
          </div>
          <p className="mt-4 text-xs leading-relaxed text-slate-500 dark:text-slate-400">
            Nút cấp sẽ cộng vào webBalance. Nút thu hồi sẽ trừ khỏi webBalance, ghi debit ledger `admin_revoke` và không cho số dư âm.
          </p>
        </form>

        <section className="overflow-x-auto rounded-lg border border-black/10 dark:border-white/10 bg-[#07111f]/90">
          <div className="grid min-w-[1120px] grid-cols-[1.2fr_0.75fr_0.75fr_0.75fr_0.75fr_0.75fr_1.15fr] gap-3 border-b border-black/10 dark:border-white/10 px-4 py-3 text-[11px] font-bold uppercase tracking-[0.12em] text-slate-500 dark:text-slate-400">
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
              <div className="px-4 py-6 text-sm text-slate-500 dark:text-slate-400">
                Chưa có user thật trong collection users. Khi người dùng đăng nhập hoặc bạn tạo hồ sơ ở tab User, số dư DPF sẽ hiện tại đây.
              </div>
            ) : (
              dashboardUsers.map((user) => (
                <div key={user.id} className="grid min-w-[1120px] grid-cols-[1.2fr_0.75fr_0.75fr_0.75fr_0.75fr_0.75fr_1.15fr] gap-3 px-4 py-4 text-sm">
                  <div className="min-w-0">
                    <p className="truncate font-bold text-slate-900 dark:text-white">{user.displayName || user.email || user.uid || user.id}</p>
                    <p className="truncate text-xs text-slate-500 dark:text-slate-400">{user.email || user.uid || user.id}</p>
                  </div>
                  <span className="font-black text-amber-200">{(user.webBalance || 0).toLocaleString('vi-VN')}</span>
                  <span className="text-slate-600 dark:text-gray-300">{(user.earnedBalance || 0).toLocaleString('vi-VN')}</span>
                  <span className="text-slate-600 dark:text-gray-300">{(user.bonusBalance || 0).toLocaleString('vi-VN')}</span>
                  <span className="text-red-300">{(user.revokedBalance || 0).toLocaleString('vi-VN')}</span>
                  <span className="text-slate-600 dark:text-gray-300">{(user.spentBalance || 0).toLocaleString('vi-VN')}</span>
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

        <section className="overflow-x-auto rounded-lg border border-black/10 dark:border-white/10 bg-[#07111f]/90">
          <div className="grid min-w-[1080px] grid-cols-[0.9fr_0.7fr_0.8fr_0.9fr_1.2fr_0.9fr_0.6fr] gap-3 border-b border-black/10 dark:border-white/10 px-4 py-3 text-[11px] font-bold uppercase tracking-[0.12em] text-slate-500 dark:text-slate-400">
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
              <div className="px-4 py-6 text-sm text-slate-500 dark:text-slate-400">Chưa có giao dịch DPF coin nào trong dpf_ledger.</div>
            ) : (
              dpfLedger.map((entry) => {
                const targetEmail = typeof entry.metadata?.targetEmail === 'string' ? entry.metadata.targetEmail : '';
                return (
                  <div key={entry.id} className="grid min-w-[1080px] grid-cols-[0.9fr_0.7fr_0.8fr_0.9fr_1.2fr_0.9fr_0.6fr] gap-3 px-4 py-4 text-sm">
                    <span className="text-xs text-slate-500 dark:text-slate-400">{formatDate(entry.createdAt)}</span>
                    <Pill className={entry.direction === 'debit' ? 'border-red-500/30 bg-red-500/10 text-red-300' : 'border-emerald-500/30 bg-emerald-500/10 text-emerald-200'}>
                      {entry.direction || 'credit'}
                    </Pill>
                    <span className="font-black text-slate-900 dark:text-white">{(entry.amount || 0).toLocaleString('en-US')}</span>
                    <span className="text-slate-600 dark:text-gray-300">{(entry.balanceAfter || 0).toLocaleString('en-US')}</span>
                    <span className="truncate text-slate-600 dark:text-gray-300">{targetEmail || entry.uid || 'unknown'}</span>
                    <span className="truncate text-xs text-slate-500 dark:text-slate-400">{entry.source || entry.reason || 'admin_bonus'}</span>
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
        <section className="rounded-lg border border-black/10 dark:border-white/10 bg-[#07111f]/90 p-5 text-sm text-slate-500 dark:text-slate-400">
          Không có hồ sơ trợ giúp thật phù hợp bộ lọc hiện tại.
        </section>
      ) : filteredCases.map((item) => {
        const draft = caseDrafts[item.id] || {
          status: (item.status || 'new') as CaseStatus,
          severity: (item.severity || 'medium') as Severity,
          responseNote: item.responseNote || '',
        };

        return (
          <section key={`${item.caseType}-${item.id}`} className="rounded-lg border border-black/10 dark:border-white/10 bg-[#07111f]/90 p-5">
            <div className="flex flex-col justify-between gap-4 lg:flex-row">
              <div className="min-w-0 flex-1">
                <div className="mb-3 flex flex-wrap items-center gap-2">
                  <Pill className={statusClass(item.status)}>{caseStatusLabels[item.status || 'new']}</Pill>
                  <Pill className={severityClass(item.severity)}>{severityLabels[item.severity || 'medium']}</Pill>
                  <Pill className="border-black/10 dark:border-white/10 bg-black/5 dark:bg-white/5 text-slate-600 dark:text-gray-300">{item.caseType || 'other'}</Pill>
                  <span className="text-xs text-slate-500 dark:text-slate-400">{formatDate(item.submittedAt)}</span>
                </div>
                <h3 className="text-lg font-black text-slate-900 dark:text-white">{item.title || item.name || 'Hồ sơ trợ giúp'}</h3>
                <div className="mt-1 flex flex-wrap items-center gap-3 text-sm text-slate-600 dark:text-slate-300/85">
                  <span>{item.name || 'Ẩn danh'}</span>
                  {item.email && <a href={`mailto:${item.email}`} className="inline-flex items-center gap-1 text-primary hover:underline"><Mail size={14} />{item.email}</a>}
                </div>
                <p className="mt-4 rounded-lg border border-black/10 dark:border-white/5 bg-black/30 p-4 text-sm leading-relaxed text-slate-600 dark:text-gray-300">
                  {item.description || item.desc || 'Chưa có mô tả chi tiết.'}
                </p>
                <div className="mt-4 grid gap-3 md:grid-cols-2">
                  <label className="text-xs font-bold uppercase tracking-wide text-slate-500 dark:text-slate-400">
                    Trạng thái hồ sơ
                    <select value={draft.status} onChange={(event) => setCaseDrafts((current) => ({ ...current, [item.id]: { ...draft, status: event.target.value as CaseStatus } }))} className="mt-2 w-full rounded-lg border border-black/10 dark:border-white/10 bg-black/70 px-3 py-2 text-sm text-slate-900 dark:text-white">
                      <option value="new">Mới nhận</option>
                      <option value="reviewing">Đang xem xét</option>
                      <option value="replied">Đã phản hồi</option>
                      <option value="closed">Đã đóng</option>
                      <option value="archived">Lưu trữ</option>
                    </select>
                  </label>
                  <label className="text-xs font-bold uppercase tracking-wide text-slate-500 dark:text-slate-400">
                    Mức độ ưu tiên
                    <select value={draft.severity} onChange={(event) => setCaseDrafts((current) => ({ ...current, [item.id]: { ...draft, severity: event.target.value as Severity } }))} className="mt-2 w-full rounded-lg border border-black/10 dark:border-white/10 bg-black/70 px-3 py-2 text-sm text-slate-900 dark:text-white">
                      <option value="low">Thấp</option>
                      <option value="medium">Trung bình</option>
                      <option value="high">Cao</option>
                    </select>
                  </label>
                </div>
                <label className="mt-3 block text-xs font-bold uppercase tracking-wide text-slate-500 dark:text-slate-400">
                  Ghi chú phản hồi
                  <textarea value={draft.responseNote} onChange={(event) => setCaseDrafts((current) => ({ ...current, [item.id]: { ...draft, responseNote: event.target.value } }))} rows={3} placeholder="Nội dung có dấu hiệu cần xác minh thêm..." className="mt-2 w-full rounded-lg border border-black/10 dark:border-white/10 bg-black/50 p-3 text-sm text-slate-900 dark:text-white outline-none focus:border-primary" />
                </label>
                <div className="mt-4 flex flex-wrap gap-2">
                  {item.url && <a href={item.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded border border-black/10 dark:border-white/10 px-3 py-2 text-xs font-bold text-slate-600 dark:text-gray-300 hover:text-primary">Mở đường dẫn <ExternalLink size={13} /></a>}
                  {item.attachmentUrl && <a href={item.attachmentUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded border border-black/10 dark:border-white/10 px-3 py-2 text-xs font-bold text-slate-600 dark:text-gray-300 hover:text-primary"><Paperclip size={13} />Tệp đính kèm</a>}
                </div>
              </div>
              <div className="flex min-w-[220px] flex-col gap-2 border-t border-black/10 dark:border-white/10 pt-4 lg:border-l lg:border-t-0 lg:pl-4 lg:pt-0">
                <button onClick={() => saveCaseDraft(item)} className="inline-flex items-center justify-center gap-2 rounded-lg bg-primary px-3 py-3 text-xs font-bold text-slate-900 dark:text-white hover:bg-blue-500">
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
            <h3 className="font-black text-slate-900 dark:text-white">Tạo challenge mới</h3>
            <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">Tạo nội dung huấn luyện mới cho academy và challenge.</p>
          </div>
          <button type="submit" className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-xs font-bold uppercase tracking-wide text-slate-900 dark:text-white hover:bg-blue-500">
            <Plus size={15} /> Tạo mới
          </button>
        </div>
        <div className="grid gap-3 md:grid-cols-2">
          <input value={challengeForm.title} onChange={(event) => setChallengeForm((current) => ({ ...current, title: event.target.value }))} placeholder="Tiêu đề challenge" className="rounded-lg border border-black/10 dark:border-white/10 bg-black/50 p-3 text-sm text-slate-900 dark:text-white outline-none focus:border-primary" />
          <input value={challengeForm.videoUrl} onChange={(event) => setChallengeForm((current) => ({ ...current, videoUrl: event.target.value }))} placeholder="Link video hoặc YouTube" className="rounded-lg border border-black/10 dark:border-white/10 bg-black/50 p-3 text-sm text-slate-900 dark:text-white outline-none focus:border-primary" />
          <select value={challengeForm.type} onChange={(event) => setChallengeForm((current) => ({ ...current, type: event.target.value }))} className="rounded-lg border border-black/10 dark:border-white/10 bg-black/70 p-3 text-sm text-slate-900 dark:text-white outline-none focus:border-primary">
            <option value="compare_ab">So sánh A/B</option>
            <option value="single_video_detect">Nhận diện một video</option>
            <option value="scam_scenario">Tình huống lừa đảo</option>
            <option value="quiz">Câu hỏi kiến thức</option>
          </select>
          <input value={challengeForm.correctAnswer} onChange={(event) => setChallengeForm((current) => ({ ...current, correctAnswer: event.target.value }))} placeholder="Đáp án đúng" className="rounded-lg border border-black/10 dark:border-white/10 bg-black/50 p-3 text-sm text-slate-900 dark:text-white outline-none focus:border-primary" />
          <select value={challengeForm.difficulty} onChange={(event) => setChallengeForm((current) => ({ ...current, difficulty: event.target.value }))} className="rounded-lg border border-black/10 dark:border-white/10 bg-black/70 p-3 text-sm text-slate-900 dark:text-white outline-none focus:border-primary">
            <option value="easy">Dễ</option>
            <option value="medium">Trung bình</option>
            <option value="hard">Khó</option>
          </select>
          <select value={challengeForm.status} onChange={(event) => setChallengeForm((current) => ({ ...current, status: event.target.value }))} className="rounded-lg border border-black/10 dark:border-white/10 bg-black/70 p-3 text-sm text-slate-900 dark:text-white outline-none focus:border-primary">
            <option value="draft">Bản nháp</option>
            <option value="published">Xuất bản</option>
            <option value="archived">Lưu trữ</option>
          </select>
          <input value={challengeForm.skillTags} onChange={(event) => setChallengeForm((current) => ({ ...current, skillTags: event.target.value }))} placeholder="Skill tags: voice, verification" className="rounded-lg border border-black/10 dark:border-white/10 bg-black/50 p-3 text-sm text-slate-900 dark:text-white outline-none focus:border-primary md:col-span-2" />
          <textarea value={challengeForm.description} onChange={(event) => setChallengeForm((current) => ({ ...current, description: event.target.value }))} rows={3} placeholder="Mô tả tình huống" className="rounded-lg border border-black/10 dark:border-white/10 bg-black/50 p-3 text-sm text-slate-900 dark:text-white outline-none focus:border-primary" />
          <textarea value={challengeForm.explanation} onChange={(event) => setChallengeForm((current) => ({ ...current, explanation: event.target.value }))} rows={3} placeholder="Giải thích sau khi người dùng trả lời" className="rounded-lg border border-black/10 dark:border-white/10 bg-black/50 p-3 text-sm text-slate-900 dark:text-white outline-none focus:border-primary" />
        </div>
      </form>

      <div className="grid gap-4 lg:grid-cols-3">
        {dashboardChallenges.map((challenge) => (
          <section key={challenge.id} className="rounded-lg border border-black/10 dark:border-white/10 bg-[#07111f]/90 p-5">
            <div className="mb-4 flex items-center justify-between gap-3">
              <Pill className={statusClass(challenge.status)}>{challengeStatusLabels[challenge.status || 'draft']}</Pill>
              <Pill className={severityClass(challenge.difficulty === 'hard' ? 'high' : challenge.difficulty === 'medium' ? 'medium' : 'low')}>{difficultyLabels[challenge.difficulty || 'medium']}</Pill>
            </div>
            <h3 className="text-lg font-black text-slate-900 dark:text-white">{challenge.title || 'Challenge chưa đặt tên'}</h3>
            <p className="mt-2 font-mono text-xs text-primary">{challengeTypeLabels[challenge.type || 'single_video_detect'] || challenge.type}</p>
            <p className="mt-3 line-clamp-3 text-sm text-slate-600 dark:text-slate-300/85">{challenge.description || 'Chưa có mô tả.'}</p>
            <div className="mt-4 flex flex-wrap gap-2">
              {(challenge.skillTags || ['verification']).map((tag) => (
                <span key={tag} className="rounded bg-black/10 dark:bg-white/10 px-2 py-1 text-[11px] font-bold text-slate-600 dark:text-gray-300">{tag}</span>
              ))}
            </div>
            <div className="mt-5 grid grid-cols-2 gap-3 text-sm">
              <div className="rounded border border-black/10 dark:border-white/5 bg-black/25 p-3">
                <p className="text-xs text-slate-500 dark:text-slate-400">Lượt chơi</p>
                <p className="mt-1 font-black text-slate-900 dark:text-white">{challenge.totalPlays || 0}</p>
              </div>
              <div className="rounded border border-black/10 dark:border-white/5 bg-black/25 p-3">
                <p className="text-xs text-slate-500 dark:text-slate-400">Tỷ lệ đúng</p>
                <p className="mt-1 font-black text-slate-900 dark:text-white">{challenge.correctRate || 0}%</p>
              </div>
            </div>
            <div className="mt-4 grid grid-cols-3 gap-2">
              {(['draft', 'published', 'archived'] as ChallengeRecord['status'][]).map((status) => (
                <button key={status} onClick={() => updateChallengeStatus(challenge, status)} className="rounded border border-black/10 dark:border-white/10 px-2 py-2 text-[11px] font-bold text-slate-600 dark:text-gray-300 hover:border-primary hover:text-slate-900 dark:text-white">
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
    <section className="rounded-lg border border-black/10 dark:border-white/10 bg-[#07111f]/90">
      {dashboardActivity.length === 0 ? (
        <div className="px-5 py-6 text-sm text-slate-500 dark:text-slate-400">Chưa có activity log nào trong Firestore.</div>
      ) : dashboardActivity.map((item) => (
        <div key={item.id} className="grid gap-3 border-b border-black/10 dark:border-white/5 px-5 py-4 text-sm md:grid-cols-[1fr_0.5fr_0.8fr_0.8fr_0.35fr]">
          <div>
            <p className="font-mono font-bold text-slate-900 dark:text-white">{item.action || 'activity.event'}</p>
            <p className="text-xs text-slate-500 dark:text-slate-400">Tác nhân: {item.actorId || 'hệ thống'}</p>
          </div>
          <Pill className={severityClass(item.severity)}>{severityLabels[item.severity || 'info']}</Pill>
          <span className="text-slate-600 dark:text-slate-300/85">{item.targetType || 'system'} / {item.targetId || '-'}</span>
          <span className="text-xs text-slate-500 dark:text-slate-400">{formatDate(item.createdAt)}</span>
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
            <h3 className="font-black text-slate-900 dark:text-white">Tạo sự kiện bảo mật</h3>
            <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">Ghi nhận truy cập bị từ chối, link đáng ngờ, đổi vai trò hoặc gửi biểu mẫu bất thường.</p>
          </div>
          <button type="submit" className="inline-flex items-center gap-2 rounded-lg bg-amber-500 px-4 py-2 text-xs font-bold uppercase tracking-[0.12em] text-slate-900 dark:text-white hover:bg-amber-400">
            <Plus size={15} /> Ghi sự kiện
          </button>
        </div>
        <div className="grid gap-3 md:grid-cols-4">
          <select value={eventForm.eventType} onChange={(event) => setEventForm((current) => ({ ...current, eventType: event.target.value }))} className="rounded-lg border border-black/10 dark:border-white/10 bg-black/70 p-3 text-sm text-slate-900 dark:text-white outline-none focus:border-amber-400">
            <option value="login_failed">Đăng nhập thất bại</option>
            <option value="repeated_login_failed">Đăng nhập thất bại nhiều lần</option>
            <option value="permission_denied">Bị từ chối quyền truy cập</option>
            <option value="role_changed">Thay đổi vai trò</option>
            <option value="suspicious_help_case">Hồ sơ trợ giúp đáng ngờ</option>
            <option value="suspicious_upload_or_link">Upload/link đáng ngờ</option>
            <option value="high_frequency_submission">Gửi biểu mẫu tần suất cao</option>
          </select>
          <input value={eventForm.actorId} onChange={(event) => setEventForm((current) => ({ ...current, actorId: event.target.value }))} placeholder="ID người dùng/tác nhân" className="rounded-lg border border-black/10 dark:border-white/10 bg-black/50 p-3 text-sm text-slate-900 dark:text-white outline-none focus:border-amber-400" />
          <select value={eventForm.severity} onChange={(event) => setEventForm((current) => ({ ...current, severity: event.target.value }))} className="rounded-lg border border-black/10 dark:border-white/10 bg-black/70 p-3 text-sm text-slate-900 dark:text-white outline-none focus:border-amber-400">
            <option value="notice">Đáng chú ý</option>
            <option value="warning">Cảnh báo</option>
            <option value="high">Cao</option>
            <option value="critical">Nghiêm trọng</option>
          </select>
          <input value={eventForm.details} onChange={(event) => setEventForm((current) => ({ ...current, details: event.target.value }))} placeholder="Ghi chú chi tiết" className="rounded-lg border border-black/10 dark:border-white/10 bg-black/50 p-3 text-sm text-slate-900 dark:text-white outline-none focus:border-amber-400" />
        </div>
      </form>

      <section className="rounded-lg border border-black/10 dark:border-white/10 bg-[#07111f]/90">
        {dashboardSecurity.length === 0 ? (
          <div className="px-5 py-6 text-sm text-slate-500 dark:text-slate-400">Chưa có security event nào trong Firestore.</div>
        ) : dashboardSecurity.map((item) => (
          <div key={item.id} className="grid gap-3 border-b border-black/10 dark:border-white/5 px-5 py-4 text-sm md:grid-cols-[1fr_0.5fr_0.6fr_0.8fr_0.35fr]">
            <div>
              <p className="font-mono font-bold text-slate-900 dark:text-white">{item.eventType || 'security.event'}</p>
              <p className="text-xs text-slate-500 dark:text-slate-400">Tác nhân: {item.actorId || 'không rõ'} / IP: {item.sourceIp || 'ẩn'}</p>
            </div>
            <Pill className={severityClass(item.severity)}>{severityLabels[item.severity || 'notice']}</Pill>
            <span className="text-slate-600 dark:text-slate-300/85">{getRoleLabel(item.actorRole)}</span>
            <span className="text-xs text-slate-500 dark:text-slate-400">{formatDate(item.createdAt)}</span>
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
        ['site_config/main', 'marquee, heroTitle, heroSubtitle, academySummary, footerSummary, facts, feature toggles, status'],
      ].map(([collectionName, fields]) => (
        <section key={collectionName} className="rounded-lg border border-black/10 dark:border-white/10 bg-[#07111f]/90 p-5">
          <p className="font-mono text-sm font-black text-primary">{collectionName}</p>
          <p className="mt-3 text-sm leading-relaxed text-slate-600 dark:text-slate-300/85">{fields}</p>
        </section>
      ))}
    </div>
  );

  const renderWebsiteControl = () => (
    <div className="space-y-5">
      <section className="rounded-lg border border-black/10 bg-white/70 p-5 shadow-sm backdrop-blur-xl dark:border-white/10 dark:bg-[#07111f]/86">
        <div className="mb-5 flex flex-col justify-between gap-3 lg:flex-row lg:items-start">
          <div>
            <div className="mb-2 flex items-center gap-2 text-primary">
              <MonitorCog size={18} />
              <p className="text-xs font-bold uppercase tracking-[0.22em]">Điều khiển website</p>
            </div>
            <h3 className="text-xl font-black text-slate-900 dark:text-white">Chỉnh nội dung chính</h3>
            <p className="mt-2 max-w-3xl text-sm leading-relaxed text-slate-600 dark:text-slate-300/85">
              Khu vực này lưu cấu hình vào Firestore `site_config/main`. Nội dung live của trang có thể đọc từ cấu hình này để bạn chỉnh mà không cần sửa code.
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <button type="button" onClick={() => saveWebsiteDraft('draft')} disabled={!canEditContent} className="inline-flex items-center gap-2 rounded-lg border border-primary/30 px-4 py-2 text-xs font-bold uppercase tracking-wide text-blue-200 hover:bg-primary/10 disabled:cursor-not-allowed disabled:opacity-50">
              <Save size={15} /> Lưu nháp
            </button>
            <button type="button" onClick={() => saveWebsiteDraft('published')} disabled={!canEditContent} className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-xs font-bold uppercase tracking-wide text-slate-900 dark:text-white hover:bg-blue-500 disabled:cursor-not-allowed disabled:opacity-50">
              <Send size={15} /> Xuất bản
            </button>
          </div>
        </div>

        <div className="grid gap-3 md:grid-cols-3">
          {websiteToggleControls.map(({ key, label }) => (
            <label key={key} className="flex items-center justify-between rounded-lg border border-black/10 bg-black/5 p-3 text-sm font-bold text-slate-700 dark:border-white/10 dark:bg-white/5 dark:text-slate-200">
              <span>{label}</span>
              <input
                type="checkbox"
                checked={websiteDraft[key]}
                disabled={!canEditContent}
                onChange={(event) => updateWebsiteDraftField(key, event.target.checked)}
                className="h-5 w-5 accent-primary"
              />
            </label>
          ))}
        </div>
      </section>

      <div className="grid gap-5 xl:grid-cols-[1.15fr_0.85fr]">
        <section className="rounded-lg border border-black/10 bg-white/70 p-5 shadow-sm backdrop-blur-xl dark:border-white/10 dark:bg-[#07111f]/86">
          <div className="mb-4 flex items-center gap-2">
            <Globe2 className="text-primary" size={18} />
            <h3 className="font-black text-slate-900 dark:text-white">Nội dung trang chủ</h3>
          </div>
          <div className="grid gap-4">
            <label className="text-xs font-bold uppercase tracking-wide text-slate-500 dark:text-slate-400">
              Thanh chạy trên cùng
              <input value={websiteDraft.marquee} disabled={!canEditContent} onChange={(event) => updateWebsiteDraftField('marquee', event.target.value)} className="mt-2 w-full rounded-lg border border-black/10 bg-black/5 p-3 text-sm normal-case tracking-normal text-slate-900 outline-none focus:border-primary disabled:opacity-50 dark:border-white/10 dark:bg-black/40 dark:text-white" />
            </label>
            <label className="text-xs font-bold uppercase tracking-wide text-slate-500 dark:text-slate-400">
              Tiêu đề hero
              <input value={websiteDraft.heroTitle} disabled={!canEditContent} onChange={(event) => updateWebsiteDraftField('heroTitle', event.target.value)} className="mt-2 w-full rounded-lg border border-black/10 bg-black/5 p-3 text-sm normal-case tracking-normal text-slate-900 outline-none focus:border-primary disabled:opacity-50 dark:border-white/10 dark:bg-black/40 dark:text-white" />
            </label>
            <label className="text-xs font-bold uppercase tracking-wide text-slate-500 dark:text-slate-400">
              Mô tả hero
              <textarea value={websiteDraft.heroSubtitle} disabled={!canEditContent} onChange={(event) => updateWebsiteDraftField('heroSubtitle', event.target.value)} rows={3} className="mt-2 w-full rounded-lg border border-black/10 bg-black/5 p-3 text-sm normal-case tracking-normal text-slate-900 outline-none focus:border-primary disabled:opacity-50 dark:border-white/10 dark:bg-black/40 dark:text-white" />
            </label>
            <div className="grid gap-3 md:grid-cols-2">
              <label className="text-xs font-bold uppercase tracking-wide text-slate-500 dark:text-slate-400">
                CTA chính
                <input value={websiteDraft.primaryCta} disabled={!canEditContent} onChange={(event) => updateWebsiteDraftField('primaryCta', event.target.value)} className="mt-2 w-full rounded-lg border border-black/10 bg-black/5 p-3 text-sm normal-case tracking-normal text-slate-900 outline-none focus:border-primary disabled:opacity-50 dark:border-white/10 dark:bg-black/40 dark:text-white" />
              </label>
              <label className="text-xs font-bold uppercase tracking-wide text-slate-500 dark:text-slate-400">
                CTA phụ
                <input value={websiteDraft.secondaryCta} disabled={!canEditContent} onChange={(event) => updateWebsiteDraftField('secondaryCta', event.target.value)} className="mt-2 w-full rounded-lg border border-black/10 bg-black/5 p-3 text-sm normal-case tracking-normal text-slate-900 outline-none focus:border-primary disabled:opacity-50 dark:border-white/10 dark:bg-black/40 dark:text-white" />
              </label>
            </div>
          </div>
        </section>

        <section className="rounded-lg border border-black/10 bg-white/70 p-5 shadow-sm backdrop-blur-xl dark:border-white/10 dark:bg-[#07111f]/86">
          <div className="mb-4 flex items-center gap-2">
            <Sparkles className="text-amber-300" size={18} />
            <h3 className="font-black text-slate-900 dark:text-white">Academy, footer và facts</h3>
          </div>
          <div className="grid gap-4">
            <label className="text-xs font-bold uppercase tracking-wide text-slate-500 dark:text-slate-400">
              Tiêu đề Academy
              <input value={websiteDraft.academyTitle} disabled={!canEditContent} onChange={(event) => updateWebsiteDraftField('academyTitle', event.target.value)} className="mt-2 w-full rounded-lg border border-black/10 bg-black/5 p-3 text-sm normal-case tracking-normal text-slate-900 outline-none focus:border-primary disabled:opacity-50 dark:border-white/10 dark:bg-black/40 dark:text-white" />
            </label>
            <label className="text-xs font-bold uppercase tracking-wide text-slate-500 dark:text-slate-400">
              Mô tả Academy
              <textarea value={websiteDraft.academySummary} disabled={!canEditContent} onChange={(event) => updateWebsiteDraftField('academySummary', event.target.value)} rows={3} className="mt-2 w-full rounded-lg border border-black/10 bg-black/5 p-3 text-sm normal-case tracking-normal text-slate-900 outline-none focus:border-primary disabled:opacity-50 dark:border-white/10 dark:bg-black/40 dark:text-white" />
            </label>
            <label className="text-xs font-bold uppercase tracking-wide text-slate-500 dark:text-slate-400">
              Footer dự án
              <textarea value={websiteDraft.footerSummary} disabled={!canEditContent} onChange={(event) => updateWebsiteDraftField('footerSummary', event.target.value)} rows={3} className="mt-2 w-full rounded-lg border border-black/10 bg-black/5 p-3 text-sm normal-case tracking-normal text-slate-900 outline-none focus:border-primary disabled:opacity-50 dark:border-white/10 dark:bg-black/40 dark:text-white" />
            </label>
            {(['factOne', 'factTwo', 'factThree'] as const).map((key, index) => (
              <label key={key} className="text-xs font-bold uppercase tracking-wide text-slate-500 dark:text-slate-400">
                Fact {index + 1}
                <textarea value={websiteDraft[key]} disabled={!canEditContent} onChange={(event) => updateWebsiteDraftField(key, event.target.value)} rows={2} className="mt-2 w-full rounded-lg border border-black/10 bg-black/5 p-3 text-sm normal-case tracking-normal text-slate-900 outline-none focus:border-primary disabled:opacity-50 dark:border-white/10 dark:bg-black/40 dark:text-white" />
              </label>
            ))}
          </div>
        </section>
      </div>

      <section className="rounded-lg border border-primary/20 bg-primary/10 p-5">
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary">Preview nhanh</p>
        <h3 className="mt-3 text-2xl font-black text-slate-900 dark:text-white">{websiteDraft.heroTitle}</h3>
        <p className="mt-2 max-w-3xl text-sm leading-relaxed text-slate-600 dark:text-slate-300/85">{websiteDraft.heroSubtitle}</p>
        <div className="mt-4 flex flex-wrap gap-2">
          <Pill className="border-primary/30 bg-primary/10 text-blue-200">{websiteDraft.primaryCta}</Pill>
          <Pill className="border-white/20 bg-white/10 text-slate-200">{websiteDraft.secondaryCta}</Pill>
          <Pill className={websiteDraft.status === 'published' ? 'border-emerald-400/30 bg-emerald-400/10 text-emerald-200' : 'border-amber-400/30 bg-amber-400/10 text-amber-200'}>
            {websiteDraft.status === 'published' ? 'Đã xuất bản' : 'Bản nháp'}
          </Pill>
        </div>
      </section>
    </div>
  );

  const renderGovernance = () => (
    <div className="space-y-5">
      <section className="rounded-lg border border-black/10 bg-white/70 p-5 shadow-sm backdrop-blur-xl dark:border-white/10 dark:bg-[#07111f]/86">
        <div className="mb-4 flex items-center gap-2">
          <UserCog className="text-primary" size={18} />
          <h3 className="font-black text-slate-900 dark:text-white">Ma trận quyền</h3>
        </div>
        <div className="overflow-x-auto">
          <div className="grid min-w-[760px] grid-cols-[0.7fr_1.2fr_1fr_1fr] gap-3 border-b border-black/10 pb-3 text-xs font-bold uppercase tracking-wide text-slate-500 dark:border-white/10 dark:text-slate-400">
            <span>Role</span><span>Quyền chính</span><span>Được vào admin</span><span>Ghi chú</span>
          </div>
          {[
            ['owner', 'Toàn quyền, gồm reset hệ thống và gán Owner', 'Có', 'Dành cho tài khoản điều hành chính'],
            ['admin', 'Vận hành user, case, DPF, nội dung, log', 'Có', 'Không tự đổi quyền chính mình'],
            ['editor', 'Academy và Website', 'Có', 'Không xem DPF hoặc bảo mật'],
            ['support', 'Người dùng và hồ sơ hỗ trợ', 'Có', 'Không xóa dữ liệu nhạy cảm'],
            ['user', 'Học, làm thử thách, dùng profile', 'Không', 'Không truy cập dashboard'],
          ].map(([role, scope, access, note]) => (
            <div key={role} className="grid min-w-[760px] grid-cols-[0.7fr_1.2fr_1fr_1fr] gap-3 border-b border-black/10 py-3 text-sm dark:border-white/5">
              <span className="font-black text-slate-900 dark:text-white">{getRoleLabel(role)}</span>
              <span className="text-slate-600 dark:text-slate-300/85">{scope}</span>
              <span className={access === 'Có' ? 'font-bold text-emerald-300' : 'font-bold text-red-300'}>{access}</span>
              <span className="text-slate-500 dark:text-slate-400">{note}</span>
            </div>
          ))}
        </div>
      </section>

      <div className="grid gap-5 xl:grid-cols-2">
        <div>
          <div className="mb-3 flex items-center gap-2">
            <Activity className="text-primary" size={18} />
            <h3 className="font-black text-slate-900 dark:text-white">Nhật ký hoạt động</h3>
          </div>
          {renderActivity()}
        </div>
        <div>
          <div className="mb-3 flex items-center gap-2">
            <ShieldAlert className="text-amber-300" size={18} />
            <h3 className="font-black text-slate-900 dark:text-white">Sự kiện bảo mật</h3>
          </div>
          {renderSecurity()}
        </div>
      </div>

      <section className="rounded-lg border border-black/10 bg-white/70 p-5 shadow-sm backdrop-blur-xl dark:border-white/10 dark:bg-[#07111f]/86">
        <div className="mb-4 flex items-center gap-2">
          <Database className="text-primary" size={18} />
          <h3 className="font-black text-slate-900 dark:text-white">Mô hình dữ liệu</h3>
        </div>
        {renderDataModel()}
      </section>

      <section className="rounded-lg border border-red-500/25 bg-red-500/10 p-5">
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <h3 className="flex items-center gap-2 font-black text-red-300">
              <ShieldAlert size={18} /> Danger Zone: reset tiến độ toàn hệ thống
            </h3>
            <p className="mt-1 text-sm leading-relaxed text-slate-600 dark:text-slate-300/85">
              Chỉ Owner được đặt lại điểm số, coin và tiến độ học về 0 cho người dùng thường. Owner/Admin được giữ nguyên.
            </p>
          </div>
          <button onClick={resetAllUserProgress} disabled={!canUseDangerZone || loading} className="inline-flex items-center gap-2 rounded-lg border border-red-500/30 bg-red-600/20 px-4 py-2.5 text-xs font-bold uppercase tracking-wide text-red-300 transition-colors hover:bg-red-600/30 disabled:cursor-not-allowed disabled:opacity-50">
            <RefreshCw size={14} className={loading ? 'animate-spin' : ''} /> Reset người dùng
          </button>
        </div>
      </section>
    </div>
  );

  const renderActiveTab = () => {
    if (!visibleTabs.some((tab) => tab.id === activeTab)) return renderOverview();

    switch (activeTab) {
      case 'users':
        return renderUsers();
      case 'dpf':
        return renderDpfCoin();
      case 'cases':
        return renderCases();
      case 'studio':
        return renderStudio();
      case 'website':
        return renderWebsiteControl();
      case 'governance':
        return renderGovernance();
      default:
        return renderOverview();
    }
  };

  return (
    <div className="mx-auto max-w-7xl animate-in fade-in">
      <div className="mb-6 overflow-hidden rounded-lg border border-black/10 dark:border-white/10 bg-[#07111f]/90 shadow-2xl shadow-black/30">
        <div className="flex flex-col justify-between gap-4 border-b border-black/10 dark:border-white/10 p-5 lg:flex-row lg:items-center">
          <div>
            <div className="mb-2 flex items-center gap-2">
              <Shield className="text-primary" size={20} />
              <p className="text-xs font-bold uppercase tracking-[0.26em] text-primary">DEEPFENSE Command Center</p>
            </div>
            <h1 className="text-2xl font-black text-slate-900 dark:text-white md:text-3xl">Bảng điều hành hệ thống</h1>
            <p className="mt-2 max-w-3xl text-sm text-slate-600 dark:text-slate-300/85">
              Quản lý người học, Academy, nội dung website, hồ sơ hỗ trợ, DPF coin, quyền truy cập và nhật ký vận hành.
            </p>
            <Pill className="mt-3 border-emerald-400/30 bg-emerald-400/10 text-emerald-200">
              Quyền hiện tại: {getRoleLabel(currentAdminRole)}
            </Pill>
          </div>
          <div className="flex flex-wrap gap-2">
            <button onClick={exportDashboardJson} className="inline-flex items-center justify-center gap-2 rounded-lg border border-black/10 dark:border-white/10 px-4 py-3 text-xs font-bold uppercase tracking-wide text-slate-600 dark:text-gray-300 hover:border-primary hover:text-slate-900 dark:text-white">
              <Download size={16} /> Xuất JSON
            </button>
            <button onClick={exportCasesCsv} className="inline-flex items-center justify-center gap-2 rounded-lg border border-black/10 dark:border-white/10 px-4 py-3 text-xs font-bold uppercase tracking-wide text-slate-600 dark:text-gray-300 hover:border-primary hover:text-slate-900 dark:text-white">
              <Download size={16} /> Xuất Case CSV
            </button>
            <button onClick={() => signOut(auth)} className="inline-flex items-center justify-center gap-2 rounded-lg border border-black/10 dark:border-white/10 px-4 py-3 text-xs font-bold uppercase tracking-wide text-slate-600 dark:text-gray-300 hover:border-primary hover:text-slate-900 dark:text-white">
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
          <aside className="border-b border-black/10 dark:border-white/10 p-3 lg:border-b-0 lg:border-r">
            <div className="space-y-1">
              {visibleTabs.map((tab) => {
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
                    className={`flex w-full items-start gap-3 rounded-lg px-3 py-3 text-left text-sm font-bold transition-colors ${isActive ? 'bg-primary text-slate-900 dark:text-white' : 'text-slate-600 dark:text-slate-300/85 hover:bg-black/5 hover:text-slate-900 dark:hover:bg-white/5 dark:hover:text-white'}`}
                  >
                    <Icon className="mt-0.5 shrink-0" size={17} />
                    <span>
                      <span className="block">{tab.label}</span>
                      <span className="mt-0.5 block text-[11px] font-medium leading-snug opacity-70">{tab.description}</span>
                    </span>
                  </button>
                );
              })}
            </div>
          </aside>

          <div className="min-w-0 p-4 md:p-5">
            <div className="mb-5 flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
              <div className="flex flex-wrap gap-2">
                {timeRangeOptions.map((option) => (
                  <button key={option} onClick={() => setTimeRange(option)} className={`rounded-lg border px-3 py-2 text-xs font-bold ${timeRange === option ? 'border-primary bg-primary/15 text-blue-200' : 'border-black/10 dark:border-white/10 text-slate-600 dark:text-slate-300/85 hover:text-slate-900 dark:text-white'}`}>
                    {option}
                  </button>
                ))}
                <button onClick={resetControls} className="inline-flex items-center gap-2 rounded-lg border border-black/10 dark:border-white/10 px-3 py-2 text-xs font-bold text-slate-600 dark:text-slate-300/85 hover:text-slate-900 dark:text-white">
                  <RefreshCw size={14} /> Đặt lại
                </button>
              </div>

              {activeTab !== 'overview' && activeTab !== 'governance' && activeTab !== 'website' && (
                <div className="flex flex-col gap-2 sm:flex-row">
                  <label className="flex items-center gap-2 rounded-lg border border-black/10 dark:border-white/10 bg-black/30 px-3 py-2">
                    <Search size={16} className="text-slate-500 dark:text-slate-400" />
                    <input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Tìm kiếm..." className="w-full bg-transparent text-sm text-slate-900 dark:text-white outline-none placeholder:text-slate-600" />
                  </label>
                  {activeTab === 'users' && (
                    <select value={roleFilter} onChange={(event) => setRoleFilter(event.target.value as 'all' | Role)} className="rounded-lg border border-black/10 dark:border-white/10 bg-black/70 px-3 py-2 text-sm text-slate-900 dark:text-white">
                      <option value="all">Tất cả vai trò</option>
                      <option value="user">Người học</option>
                      <option value="support">Hỗ trợ người dùng</option>
                      <option value="editor">Biên tập viên</option>
                      <option value="admin">Quản trị viên</option>
                      <option value="owner">Giám đốc / Owner</option>
                    </select>
                  )}
                  {(activeTab === 'users' || activeTab === 'cases') && (
                    <label className="flex items-center gap-2 rounded-lg border border-black/10 dark:border-white/10 bg-black/70 px-3 py-2 text-sm text-slate-900 dark:text-white">
                      <Filter size={15} className="text-slate-500 dark:text-slate-400" />
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
                {[1, 2, 3].map((item) => <div key={item} className="h-40 animate-pulse rounded-lg border border-black/10 dark:border-white/5 bg-black/5 dark:bg-white/5" />)}
              </div>
            ) : renderActiveTab()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Admin;
