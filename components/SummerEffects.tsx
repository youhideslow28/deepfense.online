import React, { useEffect, useState } from 'react';

const SummerEffects: React.FC = () => {
  const [petals, setPetals] = useState<any[]>([]);

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
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {/* Vệt nắng góc phải */}
      <div className="absolute -top-32 -right-32 w-96 h-96 bg-orange-500/20 rounded-full blur-[100px] pointer-events-none"></div>

      {petals.map((petal) => (
        <div
          key={petal.id}
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

      <style>{`
        @keyframes fall {
          0% {
            transform: translateY(-10vh) rotate(0deg) translateX(0);
          }
          100% {
            transform: translateY(110vh) rotate(360deg) translateX(50px);
          }
        }
      `}</style>
    </div>
  );
};

export default SummerEffects;