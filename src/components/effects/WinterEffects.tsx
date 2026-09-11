import React from 'react';

type SnowParticle = {
  id: number;
  left: number;
  size: number;
  duration: number;
  delay: number;
  drift: number;
  opacity: number;
};

interface WinterEffectsProps {
  isLite: boolean;
}

// 40 bông tuyết được phân bổ đều khắp toàn màn hình từ 2% đến 98% chiều rộng
// Độ mờ từ 0.58 - 0.85 giúp tuyết rơi rõ ràng, chân thực trên cả light và dark mode.
const snowParticles: SnowParticle[] = [
  { id: 1, left: 2, size: 16, duration: 11, delay: -2, drift: -25, opacity: 0.75 },
  { id: 2, left: 6, size: 12, duration: 9, delay: -7, drift: 18, opacity: 0.65 },
  { id: 3, left: 10, size: 22, duration: 14, delay: -11, drift: -30, opacity: 0.82 },
  { id: 4, left: 14, size: 14, duration: 10, delay: -4, drift: 22, opacity: 0.70 },
  { id: 5, left: 18, size: 18, duration: 13, delay: -9, drift: -15, opacity: 0.78 },
  { id: 6, left: 22, size: 10, duration: 8, delay: -1, drift: 12, opacity: 0.60 },
  { id: 7, left: 26, size: 24, duration: 15, delay: -13, drift: -28, opacity: 0.85 },
  { id: 8, left: 30, size: 13, duration: 11, delay: -6, drift: 20, opacity: 0.68 },
  { id: 9, left: 34, size: 19, duration: 12, delay: -10, drift: -18, opacity: 0.76 },
  { id: 10, left: 38, size: 11, duration: 9, delay: -3, drift: 16, opacity: 0.62 },
  { id: 11, left: 42, size: 20, duration: 14, delay: -8, drift: -24, opacity: 0.80 },
  { id: 12, left: 46, size: 15, duration: 10, delay: -12, drift: 25, opacity: 0.72 },
  { id: 13, left: 50, size: 26, duration: 16, delay: -5, drift: -32, opacity: 0.85 },
  { id: 14, left: 54, size: 12, duration: 9, delay: -14, drift: 15, opacity: 0.64 },
  { id: 15, left: 58, size: 17, duration: 12, delay: -2, drift: -20, opacity: 0.75 },
  { id: 16, left: 62, size: 14, duration: 10, delay: -9, drift: 22, opacity: 0.68 },
  { id: 17, left: 66, size: 23, duration: 15, delay: -6, drift: -28, opacity: 0.82 },
  { id: 18, left: 70, size: 11, duration: 8, delay: -11, drift: 14, opacity: 0.60 },
  { id: 19, left: 74, size: 18, duration: 13, delay: -4, drift: -16, opacity: 0.78 },
  { id: 20, left: 78, size: 13, duration: 10, delay: -13, drift: 19, opacity: 0.70 },
  { id: 21, left: 82, size: 25, duration: 16, delay: -7, drift: -30, opacity: 0.85 },
  { id: 22, left: 86, size: 10, duration: 8, delay: -1, drift: 12, opacity: 0.58 },
  { id: 23, left: 90, size: 19, duration: 13, delay: -10, drift: -22, opacity: 0.76 },
  { id: 24, left: 94, size: 14, duration: 11, delay: -5, drift: 18, opacity: 0.70 },
  { id: 25, left: 97, size: 21, duration: 14, delay: -12, drift: -26, opacity: 0.80 },
  { id: 26, left: 4, size: 15, duration: 12, delay: -8, drift: 20, opacity: 0.72 },
  { id: 27, left: 12, size: 11, duration: 9, delay: -15, drift: -14, opacity: 0.62 },
  { id: 28, left: 20, size: 22, duration: 15, delay: -3, drift: 26, opacity: 0.82 },
  { id: 29, left: 28, size: 13, duration: 10, delay: -10, drift: -18, opacity: 0.68 },
  { id: 30, left: 36, size: 17, duration: 13, delay: -5, drift: 22, opacity: 0.75 },
  { id: 31, left: 44, size: 10, duration: 8, delay: -12, drift: -12, opacity: 0.58 },
  { id: 32, left: 52, size: 24, duration: 16, delay: -2, drift: 28, opacity: 0.85 },
  { id: 33, left: 60, size: 14, duration: 11, delay: -9, drift: -20, opacity: 0.70 },
  { id: 34, left: 68, size: 18, duration: 13, delay: -14, drift: 24, opacity: 0.78 },
  { id: 35, left: 76, size: 12, duration: 9, delay: -4, drift: -15, opacity: 0.65 },
  { id: 36, left: 84, size: 20, duration: 14, delay: -11, drift: 25, opacity: 0.80 },
  { id: 37, left: 88, size: 15, duration: 10, delay: -6, drift: -18, opacity: 0.72 },
  { id: 38, left: 92, size: 22, duration: 15, delay: -13, drift: 22, opacity: 0.82 },
  { id: 39, left: 96, size: 11, duration: 8, delay: -1, drift: -14, opacity: 0.60 },
  { id: 40, left: 48, size: 16, duration: 12, delay: -7, drift: 16, opacity: 0.74 },
];

const WinterEffects: React.FC<WinterEffectsProps> = ({ isLite }) => (
  <div className="winter-signal fixed inset-0 z-[6] overflow-hidden pointer-events-none" aria-hidden="true">
    {!isLite && snowParticles.map((particle) => (
      <img
        key={particle.id}
        className="winter-signal-snow"
        src="/assets/winter/snowflake-winter.svg"
        alt=""
        draggable={false}
        style={{
          '--winter-signal-left': `${particle.left}%`,
          '--winter-signal-size': `${particle.size}px`,
          '--winter-signal-duration': `${particle.duration}s`,
          '--winter-signal-delay': `${particle.delay}s`,
          '--winter-signal-drift': `${particle.drift}px`,
          '--winter-signal-opacity': particle.opacity,
        } as React.CSSProperties}
      />
    ))}
  </div>
);

export default WinterEffects;

