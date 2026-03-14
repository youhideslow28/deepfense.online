import React from 'react';
import { Download, Image } from 'lucide-react';

const Poster: React.FC = () => {
  return (
    <div className="max-w-3xl mx-auto text-center animate-in fade-in duration-500">
      <h2 className="text-2xl font-serif font-bold mb-2">🖼️ POSTER TRUYỀN THÔNG</h2>
      <p className="text-gray-500 mb-8">Tài liệu tuyên truyền phòng chống Deepfake</p>

      <div className="bg-black border-2 border-dashed border-border rounded-xl p-12 mb-8 flex flex-col items-center justify-center">
        <Image size={64} className="text-gray-700 mb-4" />
        <div className="font-mono text-gray-400 mb-2">POSTER_DEEPFENSE_V1.JPG</div>
        <p className="text-xs text-gray-600">Khuyến nghị: 1080x1920px (9:16)</p>
        
        <div className="mt-8 pt-8 border-t border-border w-full">
             <p className="text-gray-500 text-xs">
                📁 Asset Placeholder: <code className="bg-surface px-1 py-0.5 rounded">/assets/poster.jpg</code>
             </p>
        </div>
      </div>

      <div className="bg-surface border border-border rounded-lg p-6 hover:border-primary transition-colors cursor-default">
         <h3 className="text-white font-bold mb-2 flex items-center justify-center gap-2">
            <Download size={18} className="text-primary" /> TẢI POSTER
         </h3>
         <p className="text-sm text-gray-400 mb-4">Tải về để in ấn hoặc chia sẻ mạng xã hội</p>
         <div className="flex justify-center gap-3">
             {['PDF', 'PNG', 'JPG'].map(fmt => (
                 <span key={fmt} className="px-3 py-1 bg-primary/10 text-primary text-xs font-bold rounded-full border border-primary/20 cursor-pointer hover:bg-primary hover:text-black transition-colors">
                    {fmt}
                 </span>
             ))}
         </div>
      </div>
    </div>
  );
};

export default Poster;