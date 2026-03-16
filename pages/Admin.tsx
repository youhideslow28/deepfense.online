import React, { useState } from 'react';
import { db, auth } from '../firebase';
import { signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { collection, query, orderBy, getDocs, updateDoc, doc, deleteDoc } from 'firebase/firestore';
import { ShieldAlert, CheckCircle, Trash2, Lock, Eye, Mail, Paperclip, ExternalLink, LogOut } from 'lucide-react';

const Admin: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [email, setEmail] = useState('deepfense@gmail.com');
  const [password, setPassword] = useState('');
  const [reports, setReports] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      setIsAuthenticated(true);
      fetchReports();
    } catch (error) {
      alert("Sai thông tin đăng nhập hoặc tài khoản không tồn tại!");
    }
  };

  const fetchReports = async () => {
    setLoading(true);
    try {
      const q = query(collection(db, "incident_reports"), orderBy("submittedAt", "desc"));
      const querySnapshot = await getDocs(q);
      const data = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setReports(data);
    } catch (error) {
      console.error("Error fetching reports:", error);
    }
    setLoading(false);
  };

  const toggleStatus = async (id: string, currentStatus: string) => {
    const newStatus = currentStatus === 'new' ? 'processed' : 'new';
    try {
        await updateDoc(doc(db, "incident_reports", id), {
            status: newStatus
        });
        // Cập nhật state local
        setReports(reports.map(r => r.id === id ? { ...r, status: newStatus } : r));
    } catch (error) {
        console.error("Error updating status:", error);
    }
  };

  const handleDelete = async (id: string) => {
      if(!window.confirm("Bạn chắc chắn muốn xóa báo cáo này?")) return;
      try {
          await deleteDoc(doc(db, "incident_reports", id));
          setReports(reports.filter(r => r.id !== id));
      } catch (error) {
          console.error("Error deleting:", error);
      }
  }

  if (!isAuthenticated) {
    return (
      <div className="flex items-center justify-center min-h-[60vh] animate-in fade-in">
        <form onSubmit={handleLogin} className="bg-surface border border-white/10 p-8 rounded-2xl w-full max-w-sm text-center">
            <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <Lock className="text-primary" size={32} />
            </div>
            <h2 className="text-white font-bold text-xl mb-6">QUẢN TRỊ VIÊN</h2>
            <input 
                type="email" 
                placeholder="Email quản trị..." 
                className="w-full bg-black border border-white/20 rounded-lg p-3 text-white mb-4 focus:border-primary outline-none text-center"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <input 
                type="password" 
                placeholder="Nhập mật mã..." 
                className="w-full bg-black border border-white/20 rounded-lg p-3 text-white mb-4 focus:border-primary outline-none text-center tracking-widest"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <button type="submit" className="w-full bg-primary text-black font-bold py-3 rounded-lg hover:bg-white transition-colors">
                TRUY CẬP
            </button>
        </form>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-4 animate-in fade-in">
        <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-black text-white flex items-center gap-3">
                <ShieldAlert className="text-red-500"/> DANH SÁCH BÁO CÁO ({reports.length})
            </h2>
            <div className="flex gap-4">
                <button onClick={fetchReports} className="text-primary text-xs font-bold uppercase hover:underline">
                    Làm mới dữ liệu
                </button>
                <button onClick={() => {signOut(auth); setIsAuthenticated(false);}} className="text-gray-500 text-xs font-bold uppercase hover:text-white flex items-center gap-1">
                    <LogOut size={14}/> Đăng xuất
                </button>
            </div>
        </div>

        {loading ? (
            <div className="space-y-4">
                {[1, 2, 3].map((i) => (
                    <div key={i} className="p-6 rounded-xl border border-white/5 bg-surface animate-pulse flex flex-col gap-4">
                        <div className="h-4 bg-white/10 rounded w-1/4"></div>
                        <div className="h-6 bg-white/10 rounded w-1/2"></div>
                        <div className="h-16 bg-white/5 rounded-xl w-full"></div>
                    </div>
                ))}
            </div>
        ) : (
            <div className="grid gap-4">
                {reports.map((report) => (
                    <div key={report.id} className={`p-6 rounded-xl border transition-all ${report.status === 'processed' ? 'bg-white/5 border-white/5 opacity-70' : 'bg-surface border-red-500/30'}`}>
                        <div className="flex flex-col md:flex-row justify-between gap-4">
                            <div className="flex-1">
                                <div className="flex items-center gap-3 mb-2">
                                    <span className={`text-[10px] font-black px-2 py-0.5 rounded uppercase ${report.status === 'processed' ? 'bg-green-500/20 text-green-500' : 'bg-red-500/20 text-red-500 animate-pulse'}`}>
                                        {report.status === 'processed' ? 'ĐÃ XỬ LÝ' : 'MỚI NHẬN'}
                                    </span>
                                    <span className="text-gray-500 text-xs font-mono">
                                        {report.submittedAt?.seconds ? new Date(report.submittedAt.seconds * 1000).toLocaleString('vi-VN') : 'Vừa xong'}
                                    </span>
                                </div>
                                <h3 className="text-white font-bold text-lg mb-1">{report.name}</h3>
                                <div className="text-primary text-sm mb-3 flex items-center gap-2 font-mono">
                                    <Mail size={14}/> <a href={`mailto:${report.email}`} className="hover:underline">{report.email}</a>
                                </div>
                                <div className="text-gray-300 text-sm bg-black/40 p-4 rounded-xl border border-white/5 mt-2 leading-relaxed">
                                    "{report.desc}"
                                </div>
                                {report.attachmentUrl && (
                                    <div className="mt-4">
                                        <a href={report.attachmentUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 bg-white/10 hover:bg-primary/20 hover:text-primary transition-colors border border-white/10 px-3 py-1.5 rounded-lg text-xs font-bold text-gray-300">
                                            <Paperclip size={14}/> Xem tệp đính kèm <ExternalLink size={12}/>
                                        </a>
                                    </div>
                                )}
                            </div>
                            <div className="flex md:flex-col gap-2 justify-center border-t md:border-t-0 md:border-l border-white/10 pt-4 md:pt-0 md:pl-4 min-w-[140px]">
                                <a 
                                    href={`https://mail.google.com/mail/u/0/?view=cm&fs=1&to=${encodeURIComponent(report.email)}&su=${encodeURIComponent("Phản hồi báo cáo sự cố từ DEEPFENSE.ONLINE")}&body=${encodeURIComponent(`Chào ${report.name},\n\nChúng tôi đã nhận được báo cáo của bạn về sự việc: "${report.desc}".\n\nĐội ngũ chuyên gia của chúng tôi đang tiến hành phân tích thông tin và sẽ phản hồi tư vấn chi tiết cho bạn trong thời gian sớm nhất.\n\nTrân trọng,\nĐội ngũ Hỗ trợ DEEPFENSE.ONLINE`)}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="p-3 rounded-lg flex items-center gap-2 text-xs font-bold w-full justify-center transition-colors bg-blue-600/20 text-blue-400 hover:bg-blue-600/40"
                                >
                                    <Mail size={16}/> Gửi Email
                                </a>
                                <button 
                                    onClick={() => toggleStatus(report.id, report.status)}
                                    className={`p-3 rounded-lg flex items-center gap-2 text-xs font-bold w-full justify-center transition-colors ${report.status === 'processed' ? 'bg-gray-800 text-gray-400' : 'bg-green-600 text-white hover:bg-green-500'}`}
                                >
                                    {report.status === 'processed' ? <Eye size={16}/> : <CheckCircle size={16}/>}
                                    {report.status === 'processed' ? 'Mở lại' : 'Hoàn tất'}
                                </button>
                                <button 
                                    onClick={() => handleDelete(report.id)}
                                    className="p-3 rounded-lg bg-red-900/20 text-red-500 hover:bg-red-900/40 flex items-center gap-2 text-xs font-bold w-full justify-center"
                                >
                                    <Trash2 size={16}/> Xóa
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
                {reports.length === 0 && <div className="text-center text-gray-500 py-20 italic">Chưa có báo cáo nào.</div>}
            </div>
        )}
    </div>
  );
};

export default Admin;