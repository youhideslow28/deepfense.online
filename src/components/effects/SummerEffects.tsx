import React, { useEffect, useState } from 'react';

const SummerEffects: React.FC = () => {
  const [petals, setPetals] = useState<any[]>([]);
  const [cicadas, setCicadas] = useState<any[]>([]);

  useEffect(() => {
    // Generate petals
    const newPetals = Array.from({ length: 40 }).map((_, i) => ({
      id: i,
      left: Math.random() * 100,
      animationDuration: 5 + Math.random() * 5,
      animationDelay: Math.random() * 5,
      opacity: 0.5 + Math.random() * 0.5,
      size: 10 + Math.random() * 15,
      rotation: Math.random() * 360,
      color: Math.random() > 0.5 ? '#ff2a00' : '#ff5500' // Đỏ và Cam (màu của hoa phượng)
    }));
    setPetals(newPetals);

    // Generate cicadas (ve sầu)
    const newCicadas = Array.from({ length: 5 }).map((_, i) => ({
      id: i,
      top: 15 + Math.random() * 70, // 15% to 85% chiều cao
      animationDuration: 12 + Math.random() * 15, // Thời gian bay ngang
      animationDelay: Math.random() * 10,
      scale: 0.5 + Math.random() * 0.5,
    }));
    setCicadas(newCicadas);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {/* Vệt nắng góc phải */}
      <div className="absolute -top-32 -right-32 w-96 h-96 bg-orange-500/20 rounded-full blur-[100px] pointer-events-none"></div>

      {petals.map((petal) => (
        <div
          key={`petal-${petal.id}`}
          className="absolute top-[-10%]"
          style={{
            left: `${petal.left}%`,
            width: `${petal.size}px`,
            height: `${petal.size * 1.5}px`,
            backgroundColor: petal.color,
            borderRadius: '50% 0 50% 0', // Tạo hình dạng giống cánh hoa
            opacity: petal.opacity,
            animation: `fall ${petal.animationDuration}s linear infinite`,
            animationDelay: `${petal.animationDelay}s`,
            transform: `rotate(${petal.rotation}deg)`,
            boxShadow: '0 0 10px rgba(255,0,0,0.5)'
          }}
        />
      ))}

      {cicadas.map((cicada) => (
        <div
          key={`cicada-${cicada.id}`}
          className="absolute left-[-10%] flex flex-col items-center justify-center opacity-40"
          style={{
            top: `${cicada.top}%`,
            animation: `flyAcross ${cicada.animationDuration}s ease-in-out infinite`,
            animationDelay: `${cicada.animationDelay}s`,
            '--scale': cicada.scale,
            transform: `scale(${cicada.scale})`,
          } as React.CSSProperties}
        >
          {/* Icon con ve (SVG) xoay ngang 90 độ để bay từ trái sang phải */}
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-yellow-600 drop-shadow-[0_0_5px_rgba(202,138,4,0.6)] rotate-90">
            <path d="M12 3C10.5 3 9 4.5 9 6.5C9 8.5 10.5 10 12 10C13.5 10 15 8.5 15 6.5C15 4.5 13.5 3 12 3Z" fill="currentColor"/>
            <path d="M9 10C7.5 11.5 7 14 7 16C7 18 8 20 12 21C16 20 17 18 17 16C17 14 16.5 11.5 15 10L12 11L9 10Z" fill="currentColor"/>
            <path d="M9 7C6 6 3 8 2 12C1 16 3 18 6 18C7.5 18 9 17 9 17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" className="animate-[flutter_0.05s_linear_infinite] origin-right"/>
            <path d="M15 7C18 6 21 8 22 12C23 16 21 18 18 18C16.5 18 15 17 15 17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" className="animate-[flutter_0.05s_linear_infinite_reverse] origin-left"/>
          </svg>
          {/* Tiếng ve */}
          <span className="text-[10px] font-mono font-bold text-yellow-500/70 mt-2 animate-pulse whitespace-nowrap drop-shadow-sm">
            ve ve ve...
          </span>
        </div>
      ))}

      <style>{`
        @keyframes fall {
          0% {
            transform: translateY(-10vh) rotate(0deg) translateX(0);
          }
          100% {
            transform: translateY(110vh) rotate(360deg) translateX(50px);
          }
        }
        @keyframes flyAcross {
          0% {
            transform: translateX(-10vw) translateY(0) scale(var(--scale));
          }
          25% {
            transform: translateX(30vw) translateY(-25px) scale(var(--scale));
          }
          50% {
            transform: translateX(60vw) translateY(20px) scale(var(--scale));
          }
          75% {
            transform: translateX(90vw) translateY(-15px) scale(var(--scale));
          }
          100% {
            transform: translateX(120vw) translateY(0) scale(var(--scale));
          }
        }
        @keyframes flutter {
          0% { transform: scaleX(1); }
          50% { transform: scaleX(0.7); }
          100% { transform: scaleX(1); }
        }
      `}</style>
    </div>
  );
};

export default SummerEffects;