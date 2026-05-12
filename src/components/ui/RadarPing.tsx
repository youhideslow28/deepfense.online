/**
 * DEEPFENSE.ONLINE — RadarPing
 * Pulse animation cho alerts / threat indicators.
 * Giống hiệu ứng sonar ping trên màn hình radar.
 * @copyright 2025 Ho Xuan Nguyen (25NS039)
 */

import React from 'react';

interface RadarPingProps {
  size?: number;
  color?: 'primary' | 'secondary' | 'success' | 'warning';
  speed?: 'slow' | 'normal' | 'fast';
  className?: string;
  label?: string;
}

const COLOR_MAP = {
  primary:   { ring: 'border-[#1D6FE8]', dot: 'bg-[#1D6FE8]', glow: 'shadow-[0_0_8px_rgba(29,111,232,0.8)]' },
  secondary: { ring: 'border-[#FF2A6D]', dot: 'bg-[#FF2A6D]', glow: 'shadow-[0_0_8px_rgba(255,42,109,0.8)]' },
  success:   { ring: 'border-[#22C55E]', dot: 'bg-[#22C55E]', glow: 'shadow-[0_0_8px_rgba(34,197,94,0.8)]' },
  warning:   { ring: 'border-[#EAB308]', dot: 'bg-[#EAB308]', glow: 'shadow-[0_0_8px_rgba(234,179,8,0.8)]' },
};

const SPEED_MAP = {
  slow:   'animate-[ping_2s_cubic-bezier(0,0,0.2,1)_infinite]',
  normal: 'animate-ping',
  fast:   'animate-[ping_0.7s_cubic-bezier(0,0,0.2,1)_infinite]',
};

const RadarPing: React.FC<RadarPingProps> = ({
  size = 10,
  color = 'primary',
  speed = 'normal',
  className = '',
  label,
}) => {
  const c = COLOR_MAP[color];
  const s = SPEED_MAP[speed];

  return (
    <span className={`inline-flex items-center gap-2 ${className}`}>
      <span className="relative flex" style={{ width: size, height: size }}>
        {/* Ping ring */}
        <span
          className={`${s} absolute inline-flex h-full w-full rounded-full border-2 ${c.ring} opacity-60`}
        />
        {/* Center dot */}
        <span
          className={`relative inline-flex rounded-full ${c.dot} ${c.glow}`}
          style={{ width: size, height: size }}
        />
      </span>
      {label && (
        <span className="text-[10px] font-mono tracking-wider uppercase text-gray-400">
          {label}
        </span>
      )}
    </span>
  );
};

export default RadarPing;
