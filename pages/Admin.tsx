import React, { useState } from 'react';
import { db } from '../firebase';
import { collection, query, orderBy, getDocs, updateDoc, doc, deleteDoc } from 'firebase/firestore';
import { ShieldAlert, CheckCircle, Trash2, Lock, Eye, Loader2 } from 'lucide-react';

const Admin: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [reports, setReports] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  // Mật khẩu cứng (Lưu ý: Chỉ dùng cho demo/đồ án cá nhân)
  const SECRET_PASS = "admin123"; 

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === SECRET_PASS) {
      setIsAuthenticated(true);
      fetchReports();
    } else {
      alert("Sai mật khẩu!");
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
            <button onClick={fetchReports} className="text-primary text-xs font-bold uppercase hover:underline">
                Làm mới dữ liệu
            </button>
        </div>

        {loading ? (
            <div className="flex justify-center py-20"><Loader2 className="animate-spin text-primary" size={40}/></div>
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
                                <h3 className="text-white font-bold text-lg mb-1">{report.name} <span className="text-gray-500 font-normal text-sm">({report.phone})</span></h3>
                                {report.scamPhone && <div className="text-red-400 text-sm mb-2 font-mono">SĐT Lừa đảo: {report.scamPhone}</div>}
                                <p className="text-gray-300 text-sm bg-black/40 p-3 rounded border border-white/5 mt-2">
                                    "{report.desc}"
                                </p>
                            </div>
                            <div className="flex md:flex-col gap-2 justify-center border-t md:border-t-0 md:border-l border-white/10 pt-4 md:pt-0 md:pl-4">
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