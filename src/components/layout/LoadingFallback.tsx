/**
 * DEEPFENSE.ONLINE — Loading Fallback Component
 * Hiển thị khi lazy-loaded pages đang được tải.
 * @copyright 2025 Ho Xuan Nguyen (25NS039)
 */

import React from 'react';
import { Shield } from 'lucide-react';

const LoadingFallback: React.FC = () => (
  <div className="flex items-center justify-center min-h-[60vh]">
    <div className="flex flex-col items-center gap-4">
       <Shield className="text-primary animate-pulse" size={48} />
       <div className="text-primary font-mono text-xs tracking-widest uppercase">Initializing System...</div>
    </div>
  </div>
);

export default LoadingFallback;
