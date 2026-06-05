/**
 * DEEPFENSE.ONLINE — Error Boundary Component
 * Bắt lỗi React fatal errors và hiển thị UI recovery thay vì crash trắng màn hình.
 * @copyright 2025 Ho Xuan Nguyen (25NS039)
 */

import React from 'react';

interface ErrorBoundaryProps {
  children: React.ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  errorMsg: string;
  isChunkError: boolean;
}

class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, errorMsg: '', isChunkError: false };
  }

  static getDerivedStateFromError(error: Error) {
    // Phân biệt rõ giữa lỗi tải mạng (Chunk) và lỗi sập code (Crash)
    const isChunkError = error.name === 'ChunkLoadError' || error.message.includes('dynamically imported module');
    return { hasError: true, errorMsg: error.message, isChunkError };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error("🔥 REACT FATAL ERROR CAUGHT:", error, errorInfo);
    
    // Tự động tải lại trang nếu lỗi là do Chunk Load Failed (thường do cập nhật phiên bản mới)
    if (this.state.isChunkError) {
      // Dùng sessionStorage để tránh lặp vô tận nếu thực sự file bị lỗi 404 vĩnh viễn
      const reloadCount = parseInt(sessionStorage.getItem('chunk_reload_count') || '0', 10);
      if (reloadCount < 1) {
        sessionStorage.setItem('chunk_reload_count', '1');
        window.location.reload();
      }
    }
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex flex-col items-center justify-center py-20 font-mono text-center px-4 animate-in fade-in">
          <div className="text-red-500 text-xl font-bold mb-4">
            {this.state.isChunkError ? "⚠️ LỖI ĐỒNG BỘ PHIÊN BẢN" : "⚠️ ĐÃ XẢY RA LỖI HỆ THỐNG (CRASH)"}
          </div>
          <p className="text-slate-300/85 text-sm mb-8 max-w-md">
            {this.state.isChunkError 
              ? "Hệ thống vừa nhận được một bản cập nhật mới hoặc kết nối mạng của bạn bị gián đoạn. Vui lòng tải lại trang để tiếp tục." 
              : `Chi tiết lỗi: ${this.state.errorMsg}`}
          </p>
          <button 
            onClick={() => { sessionStorage.removeItem('chunk_reload_count'); window.location.reload(); }}
            className="bg-primary text-white px-8 py-3 rounded-xl font-bold uppercase tracking-[0.12em] hover:bg-blue-500 transition-colors"
          >
            TẢI LẠI TRANG
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
