/**
 * DEEPFENSE.ONLINE â€” Error Boundary Component
 * Báº¯t lá»—i React fatal errors vÃ  hiá»ƒn thá»‹ UI recovery thay vÃ¬ crash tráº¯ng mÃ n hÃ¬nh.
 * @copyright 2025 H? Xuân Nguy?n & VKU Project Team
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
    // PhÃ¢n biá»‡t rÃµ giá»¯a lá»—i táº£i máº¡ng (Chunk) vÃ  lá»—i sáº­p code (Crash)
    const isChunkError = error.name === 'ChunkLoadError' || error.message.includes('dynamically imported module');
    return { hasError: true, errorMsg: error.message, isChunkError };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error("ðŸ”¥ REACT FATAL ERROR CAUGHT:", error, errorInfo);
    
    // Tá»± Ä‘á»™ng táº£i láº¡i trang náº¿u lá»—i lÃ  do Chunk Load Failed (thÆ°á»ng do cáº­p nháº­t phiÃªn báº£n má»›i)
    if (this.state.isChunkError) {
      // DÃ¹ng sessionStorage Ä‘á»ƒ trÃ¡nh láº·p vÃ´ táº­n náº¿u thá»±c sá»± file bá»‹ lá»—i 404 vÄ©nh viá»…n
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
            {this.state.isChunkError ? "âš ï¸ Lá»–I Äá»’NG Bá»˜ PHIÃŠN Báº¢N" : "âš ï¸ ÄÃƒ Xáº¢Y RA Lá»–I Há»† THá»NG (CRASH)"}
          </div>
          <p className="text-gray-400 text-sm mb-8 max-w-md">
            {this.state.isChunkError 
              ? "Há»‡ thá»‘ng vá»«a nháº­n Ä‘Æ°á»£c má»™t báº£n cáº­p nháº­t má»›i hoáº·c káº¿t ná»‘i máº¡ng cá»§a báº¡n bá»‹ giÃ¡n Ä‘oáº¡n. Vui lÃ²ng táº£i láº¡i trang Ä‘á»ƒ tiáº¿p tá»¥c." 
              : `Chi tiáº¿t lá»—i: ${this.state.errorMsg}`}
          </p>
          <button 
            onClick={() => { sessionStorage.removeItem('chunk_reload_count'); window.location.reload(); }}
            className="bg-primary text-black px-8 py-3 rounded-xl font-bold uppercase tracking-widest hover:bg-white transition-colors"
          >
            Táº¢I Láº I TRANG
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
