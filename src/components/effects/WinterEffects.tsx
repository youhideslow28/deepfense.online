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

// A fixed, deliberately small field keeps the seasonal cue quiet and predictable.
const snowParticles: SnowParticle[] = [
  { id: 1, left: 5, size: 16, duration: 25, delay: -5, drift: -18, opacity: 0.34 },
  { id: 2, left: 16, size: 11, duration: 22, delay: -12, drift: 13, opacity: 0.28 },
  { id: 3, left: 29, size: 21, duration: 28, delay: -17, drift: -16, opacity: 0.32 },
  { id: 4, left: 42, size: 13, duration: 24, delay: -7, drift: 15, opacity: 0.26 },
  { id: 5, left: 55, size: 18, duration: 27, delay: -20, drift: -12, opacity: 0.33 },
  { id: 6, left: 68, size: 12, duration: 23, delay: -3, drift: 14, opacity: 0.24 },
  { id: 7, left: 79, size: 24, duration: 29, delay: -11, drift: -15, opacity: 0.29 },
  { id: 8, left: 92, size: 14, duration: 24, delay: -16, drift: 11, opacity: 0.27 },
];

const WinterEffects: React.FC<WinterEffectsProps> = ({ isLite }) => (
  <div className="winter-signal absolute inset-x-0 top-0 z-0 h-[min(44rem,100vh)] overflow-hidden pointer-events-none" aria-hidden="true">
    <div className="winter-signal-frost" />
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
