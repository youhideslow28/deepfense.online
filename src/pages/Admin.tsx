import React, { useEffect, useMemo, useState } from 'react';
import { db, auth, storage } from '@/config/firebase';
import { signInWithEmailAndPassword, signOut, onAuthStateChanged } from 'firebase/auth';
import {
  collection,
  addDoc,
  query,
  orderBy,
  onSnapshot,
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
  AlertTriangle,
  BarChart3,
  BookOpen,
  CheckCircle,
  Clock,
  Database,
  ExternalLink,
  FileText,
  Filter,
  Flame,
  Gauge,
  HelpCircle,
  Layers,
  Lock,
  LogOut,
  Mail,
  Paperclip,
  Radio,
  Search,
  Shield,
  ShieldAlert,
  Sparkles,
  Trash2,
  UserCog,
  Users,
  Plus,
  Save,
  Send,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

type Role = 'user' | 'editor' | 'admin';
type CaseStatus = 'new' | 'reviewing' | 'replied' | 'closed' | 'archived' | 'processed';
type Severity = 'info' | 'notice' | 'low' | 'medium' | 'warning' | 'high' | 'critical';

interface HelpCenterCase {
  id: string;
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

type AdminTab = 'overview' | 'users' | 'cases' | 'studio' | 'activity' | 'security' | 'policy' | 'data';

const timeRangeOptions = ['Today', '7 days', '30 days', 'All time'];

const tabs: Array<{ id: AdminTab; label: string; icon: LucideIcon }> = [
  { id: 'overview', label: 'SOC Overview', icon: Gauge },
  { id: 'users', label: 'User Monitoring', icon: Users },
  { id: 'cases', label: 'Help Center Cases', icon: HelpCircle },
  { id: 'studio', label: 'Content Studio', icon: Layers },
  { id: 'activity', label: 'Activity Log', icon: Activity },
  { id: 'security', label: 'Security Events', icon: ShieldAlert },
  { id: 'policy', label: 'Policy', icon: FileText },
  { id: 'data', label: 'Firestore Model', icon: Database },
];

const fallbackUsers: UserRecord[] = [
  { id: 'u-001', email: 'learner@deepfense.local', displayName: 'Academy Learner', role: 'user', status: 'active', score: 820, totalChallenges: 24, correctAnswers: 19, accuracy: 79, flags: 0 },
  { id: 'u-002', email: 'editor@deepfense.local', displayName: 'Content Editor', role: 'editor', status: 'active', score: 0, totalChallenges: 0, correctAnswers: 0, accuracy: 0, flags: 1 },
  { id: 'u-003', email: 'admin@deepfense.local', displayName: 'SOC Admin', role: 'admin', status: 'active', score: 0, totalChallenges: 0, correctAnswers: 0, accuracy: 0, flags: 0 },
];

const fallbackCases: HelpCenterCase[] = [
  {
    id: 'case-preview-1',
    name: 'Nguoi dung mau',
    email: 'user@example.com',
    title: 'Nghi ngo video deepfake',
    description: 'Can xac minh them truoc khi chia se video trong nhom lop.',
    caseType: 'deepfake_video',
    severity: 'medium',
    status: 'new',
  },
  {
    id: 'case-preview-2',
    name: 'Thanh vien cong dong',
    email: 'community@example.com',
    title: 'Cuoc goi AI voice scam',
    description: 'Nguoi goi tao ap luc chuyen tien va yeu cau giu bi mat.',
    caseType: 'ai_voice_scam',
    severity: 'high',
    status: 'reviewing',
  },
];

const fallbackChallenges: ChallengeRecord[] = [
  { id: 'challenge-1', title: 'Face artifact triage', type: 'single_video_detect', difficulty: 'easy', status: 'published', skillTags: ['face_artifacts', 'lighting'], totalPlays: 138, correctRate: 76 },
  { id: 'challenge-2', title: 'Voice clone pressure call', type: 'scam_scenario', difficulty: 'hard', status: 'draft', skillTags: ['voice', 'behavior', 'verification'], totalPlays: 42, correctRate: 58 },
  { id: 'challenge-3', title: 'A/B synthetic motion', type: 'compare_ab', difficulty: 'medium', status: 'published', skillTags: ['motion', 'context'], totalPlays: 91, correctRate: 69 },
];

const fallbackActivity: ActivityLog[] = [
  { id: 'log-1', actorId: 'system', actorRole: 'admin', action: 'admin.role_changed', targetType: 'users', targetId: 'u-002', severity: 'notice' },
  { id: 'log-2', actorId: 'learner', actorRole: 'user', action: 'user.help_case_submitted', targetType: 'help_center_cases', targetId: 'case-preview-1', severity: 'warning' },
  { id: 'log-3', actorId: 'editor', actorRole: 'editor', action: 'editor.challenge_updated', targetType: 'challenges', targetId: 'challenge-2', severity: 'info' },
];

const fallbackSecurity: SecurityEvent[] = [
  { id: 'sec-1', eventType: 'permission_denied', actorId: 'unknown', actorRole: 'user', severity: 'warning', sourceIp: 'masked' },
  { id: 'sec-2', eventType: 'high_frequency_submission', actorId: 'u-001', actorRole: 'user', severity: 'high', sourceIp: 'masked' },
  { id: 'sec-3', eventType: 'admin_session_expired', actorId: 'admin', actorRole: 'admin', severity: 'notice', sourceIp: 'masked' },
];

const formatDate = (value?: Timestamp) => {
  if (!value?.seconds) return 'Not recorded';
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
  const [challenges, setChallenges] = useState<ChallengeRecord[]>([]);
  const [activityLogs, setActivityLogs] = useState<ActivityLog[]>([]);
  const [securityEvents, setSecurityEvents] = useState<SecurityEvent[]>([]);
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

  const dashboardUsers = users.length ? users : fallbackUsers;
  const dashboardCases = mergedCases.length ? mergedCases : fallbackCases;
  const dashboardChallenges = challenges.length ? challenges : fallbackChallenges;
  const dashboardActivity = activityLogs.length ? activityLogs : fallbackActivity;
  const dashboardSecurity = securityEvents.length ? securityEvents : fallbackSecurity;

  const stats = useMemo(() => {
    const activeLearners = dashboardUsers.filter((user) => user.status !== 'banned').length;
    const totalChallengeRuns = dashboardUsers.reduce((sum, user) => sum + (user.totalChallenges || 0), 0);
    const averageAccuracy = dashboardUsers.length
      ? Math.round(dashboardUsers.reduce((sum, user) => sum + (user.accuracy || 0), 0) / dashboardUsers.length)
      : 0;
    const openCases = dashboardCases.filter((item) => ['new', 'reviewing'].includes(item.status || 'new')).length;
    const highRisk = dashboardCases.filter((item) => ['high', 'critical'].includes(item.severity || '')).length;
    const reviewQueue = dashboardChallenges.filter((item) => item.status === 'draft').length;
    return { activeLearners, totalChallengeRuns, averageAccuracy, openCases, highRisk, reviewQueue };
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

  const writeActivityLog = async (payload: Omit<ActivityLog, 'id' | 'createdAt'>) => {
    await addDoc(collection(db, 'activity_logs'), {
      actorId: auth.currentUser?.uid || 'admin',
      actorRole: 'admin',
      ...payload,
      createdAt: serverTimestamp(),
    });
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
    showActionMessage('Da cap nhat trang thai case.');
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
    showActionMessage('Da luu phan loai va response note cho case.');
  };

  const deleteCase = async (item: HelpCenterCase) => {
    if (!window.confirm('Ban chac chan muon xoa case nay?')) return;
    try {
      if (item.attachmentUrl) {
        try {
          await deleteObject(ref(storage, item.attachmentUrl));
        } catch (storageError) {
          console.warn('Khong the xoa tep dinh kem hoac tep khong ton tai:', storageError);
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
      showActionMessage('Da xoa case va tep dinh kem neu co.');
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
    showActionMessage('Da cap nhat role va ghi security event.');
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
    showActionMessage('Da cap nhat trang thai user.');
  };

  const createChallenge = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!challengeForm.title.trim()) {
      showActionMessage('Can nhap title challenge.');
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
    showActionMessage('Da tao challenge moi trong Content Studio.');
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
    showActionMessage('Da cap nhat trang thai challenge.');
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
    showActionMessage('Da tao security event thu cong.');
  };

  if (isAuthChecking) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-primary/20 border-t-primary" />
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center animate-in fade-in">
        <form onSubmit={handleLogin} className="w-full max-w-sm rounded-lg border border-white/10 bg-[#07111f] p-8 text-center shadow-2xl shadow-black/40">
          <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-lg border border-primary/30 bg-primary/10">
            <Lock className="text-primary" size={32} />
          </div>
          <p className="mb-2 text-xs font-bold uppercase tracking-[0.28em] text-primary">Deepfense Control Center</p>
          <h2 className="mb-6 text-xl font-black text-white">Admin / Editor Sign In</h2>
          <input
            type="email"
            placeholder="Email quan tri"
            className="mb-4 w-full rounded-lg border border-white/20 bg-black p-3 text-center text-white outline-none focus:border-primary"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
          <input
            type="password"
            placeholder="Mat khau"
            className="mb-4 w-full rounded-lg border border-white/20 bg-black p-3 text-center text-white outline-none focus:border-primary"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
          {loginError && <div className="mb-4 text-xs font-bold text-red-400">{loginError}</div>}
          <button type="submit" className="w-full rounded-lg bg-primary py-3 font-bold text-white transition-colors hover:bg-blue-500">
            Truy cap SOC Console
          </button>
        </form>
      </div>
    );
  }

  const renderOverview = () => (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        <StatCard label="Active Learners" value={stats.activeLearners} sub="User dang hoc hoac co tai khoan hoat dong" icon={Users} tone="blue" />
        <StatCard label="Training Events" value={stats.totalChallengeRuns || dashboardChallenges.reduce((sum, item) => sum + (item.totalPlays || 0), 0)} sub="Luot lam challenge va mo phong" icon={BarChart3} tone="green" />
        <StatCard label="Detection Accuracy" value={`${stats.averageAccuracy || 72}%`} sub="Ty le dung trung binh tren du lieu hien co" icon={Gauge} tone="green" />
        <StatCard label="Help Center Cases" value={stats.openCases} sub="Case moi hoac dang review" icon={HelpCircle} tone="amber" />
        <StatCard label="High-Risk Misjudgments" value={stats.highRisk} sub="Tin hieu can uu tien kiem tra" icon={Flame} tone="red" />
        <StatCard label="Content Review Queue" value={stats.reviewQueue} sub="Challenge/lesson dang draft" icon={BookOpen} tone="blue" />
      </div>

      <div className="grid gap-4 xl:grid-cols-[1.2fr_0.8fr]">
        <section className="rounded-lg border border-white/10 bg-[#07111f]/90 p-5">
          <div className="mb-5 flex items-center justify-between">
            <div>
              <h3 className="font-bold text-white">Recent Signals</h3>
              <p className="text-xs text-gray-500">Activity timeline va thao tac quan tri gan day</p>
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
              <h3 className="font-bold text-white">Top Weak Skills</h3>
              <p className="text-xs text-gray-500">Goi y uu tien noi dung dao tao tiep theo</p>
            </div>
            <Sparkles className="text-amber-300" size={20} />
          </div>
          {['voice', 'verification', 'motion', 'context', 'lighting'].map((skill, index) => (
            <div key={skill} className="mb-4">
              <div className="mb-1 flex justify-between text-xs">
                <span className="font-bold uppercase tracking-wide text-gray-300">{skill}</span>
                <span className="text-gray-500">{68 - index * 7}% risk</span>
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
    <section className="rounded-lg border border-white/10 bg-[#07111f]/90">
      <div className="grid grid-cols-[1.4fr_0.7fr_0.7fr_0.6fr_0.6fr_0.7fr_0.8fr_0.9fr] gap-3 border-b border-white/10 px-4 py-3 text-[11px] font-bold uppercase tracking-wider text-gray-500">
        <span>User</span><span>Role</span><span>Status</span><span>Challenges</span><span>Accuracy</span><span>Score</span><span>Last Active</span><span>Actions</span>
      </div>
      <div className="divide-y divide-white/5">
        {filteredUsers.map((user) => (
          <div key={user.id} className="grid grid-cols-[1.4fr_0.7fr_0.7fr_0.6fr_0.6fr_0.7fr_0.8fr_0.9fr] gap-3 px-4 py-4 text-sm">
            <div className="min-w-0">
              <p className="truncate font-bold text-white">{user.displayName || 'Unnamed user'}</p>
              <p className="truncate text-xs text-gray-500">{user.email || user.uid || user.id}</p>
            </div>
            <Pill className="border-primary/30 bg-primary/10 text-blue-200">{user.role || 'user'}</Pill>
            <Pill className={statusClass(user.status)}>{user.status || 'active'}</Pill>
            <span className="text-gray-300">{user.totalChallenges || 0}</span>
            <span className="text-gray-300">{user.accuracy || 0}%</span>
            <span className="text-gray-300">{user.score || 0}</span>
            <span className="text-xs text-gray-500">{formatDate(user.lastActiveAt)}</span>
            <div className="flex flex-wrap gap-2">
              <select value={user.role || 'user'} onChange={(event) => changeUserRole(user, event.target.value as Role)} className="rounded border border-white/10 bg-black px-2 py-1 text-xs text-white">
                <option value="user">user</option>
                <option value="editor">editor</option>
                <option value="admin">admin</option>
              </select>
              <button onClick={() => changeUserStatus(user, user.status === 'banned' ? 'active' : 'banned')} className="rounded border border-white/10 px-2 py-1 text-xs font-bold text-gray-300 hover:border-red-400 hover:text-red-300">
                {user.status === 'banned' ? 'Unban' : 'Ban'}
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );

  const renderCases = () => (
    <div className="grid gap-4">
      {filteredCases.map((item) => {
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
                  <Pill className={statusClass(item.status)}>{item.status || 'new'}</Pill>
                  <Pill className={severityClass(item.severity)}>{item.severity || 'medium'}</Pill>
                  <Pill className="border-white/10 bg-white/5 text-gray-300">{item.caseType || 'other'}</Pill>
                  <span className="text-xs text-gray-500">{formatDate(item.submittedAt)}</span>
                </div>
                <h3 className="text-lg font-black text-white">{item.title || item.name || 'Help center case'}</h3>
                <div className="mt-1 flex flex-wrap items-center gap-3 text-sm text-gray-400">
                  <span>{item.name || 'Anonymous'}</span>
                  {item.email && <a href={`mailto:${item.email}`} className="inline-flex items-center gap-1 text-primary hover:underline"><Mail size={14} />{item.email}</a>}
                </div>
                <p className="mt-4 rounded-lg border border-white/5 bg-black/30 p-4 text-sm leading-relaxed text-gray-300">
                  {item.description || item.desc || 'Chua co mo ta chi tiet.'}
                </p>
                <div className="mt-4 grid gap-3 md:grid-cols-2">
                  <label className="text-xs font-bold uppercase tracking-wide text-gray-500">
                    Case status
                    <select value={draft.status} onChange={(event) => setCaseDrafts((current) => ({ ...current, [item.id]: { ...draft, status: event.target.value as CaseStatus } }))} className="mt-2 w-full rounded-lg border border-white/10 bg-black/70 px-3 py-2 text-sm text-white">
                      <option value="new">new</option>
                      <option value="reviewing">reviewing</option>
                      <option value="replied">replied</option>
                      <option value="closed">closed</option>
                      <option value="archived">archived</option>
                    </select>
                  </label>
                  <label className="text-xs font-bold uppercase tracking-wide text-gray-500">
                    Severity
                    <select value={draft.severity} onChange={(event) => setCaseDrafts((current) => ({ ...current, [item.id]: { ...draft, severity: event.target.value as Severity } }))} className="mt-2 w-full rounded-lg border border-white/10 bg-black/70 px-3 py-2 text-sm text-white">
                      <option value="low">low</option>
                      <option value="medium">medium</option>
                      <option value="high">high</option>
                    </select>
                  </label>
                </div>
                <label className="mt-3 block text-xs font-bold uppercase tracking-wide text-gray-500">
                  Response note
                  <textarea value={draft.responseNote} onChange={(event) => setCaseDrafts((current) => ({ ...current, [item.id]: { ...draft, responseNote: event.target.value } }))} rows={3} placeholder="Noi dung co dau hieu can xac minh them..." className="mt-2 w-full rounded-lg border border-white/10 bg-black/50 p-3 text-sm text-white outline-none focus:border-primary" />
                </label>
                <div className="mt-4 flex flex-wrap gap-2">
                  {item.url && <a href={item.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded border border-white/10 px-3 py-2 text-xs font-bold text-gray-300 hover:text-primary">Open URL <ExternalLink size={13} /></a>}
                  {item.attachmentUrl && <a href={item.attachmentUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded border border-white/10 px-3 py-2 text-xs font-bold text-gray-300 hover:text-primary"><Paperclip size={13} />Attachment</a>}
                </div>
              </div>
              <div className="flex min-w-[220px] flex-col gap-2 border-t border-white/10 pt-4 lg:border-l lg:border-t-0 lg:pl-4 lg:pt-0">
                <button onClick={() => saveCaseDraft(item)} className="inline-flex items-center justify-center gap-2 rounded-lg bg-primary px-3 py-3 text-xs font-bold text-white hover:bg-blue-500">
                  <Save size={16} /> Save Case
                </button>
                <a
                  href={`https://mail.google.com/mail/u/0/?view=cm&fs=1&to=${encodeURIComponent(item.email || '')}&su=${encodeURIComponent('Deepfense Help Center response')}&body=${encodeURIComponent(`Chao ${item.name || 'ban'},\n\n${draft.responseNote || 'Noi dung ban gui co mot so dau hieu can xac minh them. Deepfense khuyen nghi khong chuyen tien, khong chia se OTP/thong tin ca nhan va lien he nguoi lien quan qua kenh khac truoc khi hanh dong.'}\n\nDeepfense chi ho tro giao duc va nhan dien rui ro, khong thay the ket luan phap ly.\n\nTran trong,\nDeepfense Help Center`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-lg bg-blue-600/20 px-3 py-3 text-xs font-bold text-blue-200 hover:bg-blue-600/30"
                >
                  <Send size={16} /> Reply Email
                </a>
                <button onClick={() => updateCaseStatus(item, item.status === 'reviewing' ? 'closed' : 'reviewing')} className="inline-flex items-center justify-center gap-2 rounded-lg bg-emerald-600/20 px-3 py-3 text-xs font-bold text-emerald-200 hover:bg-emerald-600/30">
                  <CheckCircle size={16} /> {item.status === 'reviewing' ? 'Close Case' : 'Mark Reviewing'}
                </button>
                <button onClick={() => deleteCase(item)} className="inline-flex items-center justify-center gap-2 rounded-lg bg-red-600/15 px-3 py-3 text-xs font-bold text-red-300 hover:bg-red-600/25">
                  <Trash2 size={16} /> Delete
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
            <h3 className="font-black text-white">Create Challenge</h3>
            <p className="mt-1 text-xs text-gray-500">Tao noi dung moi cho academy/challenge pipeline.</p>
          </div>
          <button type="submit" className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-xs font-bold uppercase tracking-wide text-white hover:bg-blue-500">
            <Plus size={15} /> Create
          </button>
        </div>
        <div className="grid gap-3 md:grid-cols-2">
          <input value={challengeForm.title} onChange={(event) => setChallengeForm((current) => ({ ...current, title: event.target.value }))} placeholder="Title" className="rounded-lg border border-white/10 bg-black/50 p-3 text-sm text-white outline-none focus:border-primary" />
          <input value={challengeForm.videoUrl} onChange={(event) => setChallengeForm((current) => ({ ...current, videoUrl: event.target.value }))} placeholder="Video or YouTube URL" className="rounded-lg border border-white/10 bg-black/50 p-3 text-sm text-white outline-none focus:border-primary" />
          <select value={challengeForm.type} onChange={(event) => setChallengeForm((current) => ({ ...current, type: event.target.value }))} className="rounded-lg border border-white/10 bg-black/70 p-3 text-sm text-white outline-none focus:border-primary">
            <option value="compare_ab">compare_ab</option>
            <option value="single_video_detect">single_video_detect</option>
            <option value="scam_scenario">scam_scenario</option>
            <option value="quiz">quiz</option>
          </select>
          <input value={challengeForm.correctAnswer} onChange={(event) => setChallengeForm((current) => ({ ...current, correctAnswer: event.target.value }))} placeholder="Correct answer" className="rounded-lg border border-white/10 bg-black/50 p-3 text-sm text-white outline-none focus:border-primary" />
          <select value={challengeForm.difficulty} onChange={(event) => setChallengeForm((current) => ({ ...current, difficulty: event.target.value }))} className="rounded-lg border border-white/10 bg-black/70 p-3 text-sm text-white outline-none focus:border-primary">
            <option value="easy">easy</option>
            <option value="medium">medium</option>
            <option value="hard">hard</option>
          </select>
          <select value={challengeForm.status} onChange={(event) => setChallengeForm((current) => ({ ...current, status: event.target.value }))} className="rounded-lg border border-white/10 bg-black/70 p-3 text-sm text-white outline-none focus:border-primary">
            <option value="draft">draft</option>
            <option value="published">published</option>
            <option value="archived">archived</option>
          </select>
          <input value={challengeForm.skillTags} onChange={(event) => setChallengeForm((current) => ({ ...current, skillTags: event.target.value }))} placeholder="Skill tags: voice, verification" className="rounded-lg border border-white/10 bg-black/50 p-3 text-sm text-white outline-none focus:border-primary md:col-span-2" />
          <textarea value={challengeForm.description} onChange={(event) => setChallengeForm((current) => ({ ...current, description: event.target.value }))} rows={3} placeholder="Description" className="rounded-lg border border-white/10 bg-black/50 p-3 text-sm text-white outline-none focus:border-primary" />
          <textarea value={challengeForm.explanation} onChange={(event) => setChallengeForm((current) => ({ ...current, explanation: event.target.value }))} rows={3} placeholder="Explanation after answer" className="rounded-lg border border-white/10 bg-black/50 p-3 text-sm text-white outline-none focus:border-primary" />
        </div>
      </form>

      <div className="grid gap-4 lg:grid-cols-3">
        {dashboardChallenges.map((challenge) => (
          <section key={challenge.id} className="rounded-lg border border-white/10 bg-[#07111f]/90 p-5">
            <div className="mb-4 flex items-center justify-between gap-3">
              <Pill className={statusClass(challenge.status)}>{challenge.status || 'draft'}</Pill>
              <Pill className={severityClass(challenge.difficulty === 'hard' ? 'high' : challenge.difficulty === 'medium' ? 'medium' : 'low')}>{challenge.difficulty || 'medium'}</Pill>
            </div>
            <h3 className="text-lg font-black text-white">{challenge.title || 'Untitled challenge'}</h3>
            <p className="mt-2 font-mono text-xs text-primary">{challenge.type || 'single_video_detect'}</p>
            <p className="mt-3 line-clamp-3 text-sm text-gray-400">{challenge.description || 'Chua co description.'}</p>
            <div className="mt-4 flex flex-wrap gap-2">
              {(challenge.skillTags || ['verification']).map((tag) => (
                <span key={tag} className="rounded bg-white/10 px-2 py-1 text-[11px] font-bold text-gray-300">{tag}</span>
              ))}
            </div>
            <div className="mt-5 grid grid-cols-2 gap-3 text-sm">
              <div className="rounded border border-white/5 bg-black/25 p-3">
                <p className="text-xs text-gray-500">Total plays</p>
                <p className="mt-1 font-black text-white">{challenge.totalPlays || 0}</p>
              </div>
              <div className="rounded border border-white/5 bg-black/25 p-3">
                <p className="text-xs text-gray-500">Correct rate</p>
                <p className="mt-1 font-black text-white">{challenge.correctRate || 0}%</p>
              </div>
            </div>
            <div className="mt-4 grid grid-cols-3 gap-2">
              {(['draft', 'published', 'archived'] as ChallengeRecord['status'][]).map((status) => (
                <button key={status} onClick={() => updateChallengeStatus(challenge, status)} className="rounded border border-white/10 px-2 py-2 text-[11px] font-bold text-gray-300 hover:border-primary hover:text-white">
                  {status}
                </button>
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );

  const renderActivity = () => (
    <section className="rounded-lg border border-white/10 bg-[#07111f]/90">
      {dashboardActivity.map((item) => (
        <div key={item.id} className="grid gap-3 border-b border-white/5 px-5 py-4 text-sm md:grid-cols-[1fr_0.5fr_0.8fr_0.8fr]">
          <div>
            <p className="font-mono font-bold text-white">{item.action || 'activity.event'}</p>
            <p className="text-xs text-gray-500">Actor: {item.actorId || 'system'}</p>
          </div>
          <Pill className={severityClass(item.severity)}>{item.severity || 'info'}</Pill>
          <span className="text-gray-400">{item.targetType || 'system'} / {item.targetId || '-'}</span>
          <span className="text-xs text-gray-500">{formatDate(item.createdAt)}</span>
        </div>
      ))}
    </section>
  );

  const renderSecurity = () => (
    <div className="space-y-5">
      <form onSubmit={createSecurityEvent} className="rounded-lg border border-amber-500/20 bg-[#07111f]/90 p-5">
        <div className="mb-4 flex items-center justify-between gap-3">
          <div>
            <h3 className="font-black text-white">Create Security Event</h3>
            <p className="mt-1 text-xs text-gray-500">Ghi nhan permission denied, suspicious link, role change hoac submission bat thuong.</p>
          </div>
          <button type="submit" className="inline-flex items-center gap-2 rounded-lg bg-amber-500 px-4 py-2 text-xs font-bold uppercase tracking-wide text-black hover:bg-amber-300">
            <Plus size={15} /> Log Event
          </button>
        </div>
        <div className="grid gap-3 md:grid-cols-4">
          <select value={eventForm.eventType} onChange={(event) => setEventForm((current) => ({ ...current, eventType: event.target.value }))} className="rounded-lg border border-white/10 bg-black/70 p-3 text-sm text-white outline-none focus:border-amber-400">
            <option value="login_failed">login_failed</option>
            <option value="repeated_login_failed">repeated_login_failed</option>
            <option value="permission_denied">permission_denied</option>
            <option value="role_changed">role_changed</option>
            <option value="suspicious_help_case">suspicious_help_case</option>
            <option value="suspicious_upload_or_link">suspicious_upload_or_link</option>
            <option value="high_frequency_submission">high_frequency_submission</option>
          </select>
          <input value={eventForm.actorId} onChange={(event) => setEventForm((current) => ({ ...current, actorId: event.target.value }))} placeholder="Actor/User ID" className="rounded-lg border border-white/10 bg-black/50 p-3 text-sm text-white outline-none focus:border-amber-400" />
          <select value={eventForm.severity} onChange={(event) => setEventForm((current) => ({ ...current, severity: event.target.value }))} className="rounded-lg border border-white/10 bg-black/70 p-3 text-sm text-white outline-none focus:border-amber-400">
            <option value="notice">notice</option>
            <option value="warning">warning</option>
            <option value="high">high</option>
            <option value="critical">critical</option>
          </select>
          <input value={eventForm.details} onChange={(event) => setEventForm((current) => ({ ...current, details: event.target.value }))} placeholder="Details" className="rounded-lg border border-white/10 bg-black/50 p-3 text-sm text-white outline-none focus:border-amber-400" />
        </div>
      </form>

      <section className="rounded-lg border border-white/10 bg-[#07111f]/90">
        {dashboardSecurity.map((item) => (
          <div key={item.id} className="grid gap-3 border-b border-white/5 px-5 py-4 text-sm md:grid-cols-[1fr_0.5fr_0.6fr_0.8fr]">
            <div>
              <p className="font-mono font-bold text-white">{item.eventType || 'security.event'}</p>
              <p className="text-xs text-gray-500">Actor: {item.actorId || 'unknown'} / IP: {item.sourceIp || 'masked'}</p>
            </div>
            <Pill className={severityClass(item.severity)}>{item.severity || 'notice'}</Pill>
            <span className="text-gray-400">{item.actorRole || 'user'}</span>
            <span className="text-xs text-gray-500">{formatDate(item.createdAt)}</span>
          </div>
        ))}
      </section>
    </div>
  );

  const renderPolicy = () => (
    <div className="grid gap-4 lg:grid-cols-2">
      {[
        ['Privacy & Data Handling', 'Thu thap dung muc dich, uu tien du lieu tong hop/an danh, khong ban du lieu ca nhan.'],
        ['RBAC Policy', 'user/editor/admin voi nguyen tac least privilege; editor khong xem du lieu nhay cam khong can thiet.'],
        ['Help Center Handling', 'Deepfense chi ho tro giao duc va nhan dien rui ro, khong thay the ket luan phap ly.'],
        ['Activity Logging', 'Ghi lai dang nhap, doi role, ban/unban, tao/sua challenge, xu ly case va xoa du lieu.'],
        ['Security Event Policy', 'Tach login_failed, permission_denied, suspicious submission va role_changed thanh security_events.'],
        ['Retention Policy', 'Activity log 90-180 ngay; security events 180 ngay; help center 180-365 ngay tuy muc do.'],
      ].map(([title, body]) => (
        <section key={title} className="rounded-lg border border-white/10 bg-[#07111f]/90 p-5">
          <h3 className="font-black text-white">{title}</h3>
          <p className="mt-3 text-sm leading-relaxed text-gray-400">{body}</p>
        </section>
      ))}
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
      case 'cases':
        return renderCases();
      case 'studio':
        return renderStudio();
      case 'activity':
        return renderActivity();
      case 'security':
        return renderSecurity();
      case 'policy':
        return renderPolicy();
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
              <p className="text-xs font-bold uppercase tracking-[0.26em] text-primary">Deepfense Control Center</p>
            </div>
            <h1 className="text-2xl font-black text-white md:text-3xl">SOC-Style Academy Dashboard</h1>
            <p className="mt-2 max-w-3xl text-sm text-gray-400">
              Quan tri user/editor/admin, Help Center Cases, Content Studio, Activity Log va Security Events theo huong academy co tu duy SOC.
            </p>
          </div>
          <button onClick={() => signOut(auth)} className="inline-flex items-center justify-center gap-2 rounded-lg border border-white/10 px-4 py-3 text-xs font-bold uppercase tracking-wide text-gray-300 hover:border-primary hover:text-white">
            <LogOut size={16} /> Dang xuat
          </button>
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
              </div>

              {activeTab !== 'overview' && activeTab !== 'policy' && activeTab !== 'data' && (
                <div className="flex flex-col gap-2 sm:flex-row">
                  <label className="flex items-center gap-2 rounded-lg border border-white/10 bg-black/30 px-3 py-2">
                    <Search size={16} className="text-gray-500" />
                    <input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search..." className="w-full bg-transparent text-sm text-white outline-none placeholder:text-gray-600" />
                  </label>
                  {activeTab === 'users' && (
                    <select value={roleFilter} onChange={(event) => setRoleFilter(event.target.value as 'all' | Role)} className="rounded-lg border border-white/10 bg-black/70 px-3 py-2 text-sm text-white">
                      <option value="all">All roles</option>
                      <option value="user">user</option>
                      <option value="editor">editor</option>
                      <option value="admin">admin</option>
                    </select>
                  )}
                  {(activeTab === 'users' || activeTab === 'cases') && (
                    <label className="flex items-center gap-2 rounded-lg border border-white/10 bg-black/70 px-3 py-2 text-sm text-white">
                      <Filter size={15} className="text-gray-500" />
                      <select value={statusFilter} onChange={(event) => setStatusFilter(event.target.value)} className="bg-transparent outline-none">
                        <option value="all">All status</option>
                        {activeTab === 'users' ? (
                          <>
                            <option value="active">active</option>
                            <option value="inactive">inactive</option>
                            <option value="flagged">flagged</option>
                            <option value="banned">banned</option>
                          </>
                        ) : (
                          <>
                            <option value="new">new</option>
                            <option value="reviewing">reviewing</option>
                            <option value="replied">replied</option>
                            <option value="closed">closed</option>
                            <option value="archived">archived</option>
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
