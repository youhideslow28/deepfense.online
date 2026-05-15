/**
 * DEEPFENSE.ONLINE — ThreatPulse
 * Hiệu ứng radar sweep + threat markers đỏ nhấp nháy cho Hero section.
 * Pure CSS — không cần Three.js, zero bundle impact.
 * @copyright 2025 Ho Xuan Nguyen (25NS039)
 */

import React, { useEffect, useRef } from 'react';

interface ThreatMarker {
  id: number;
  x: number;  // percent
  y: number;  // percent
  delay: number;
}

// Threat markers ở vị trí cố định — hiệu ứng "mối đe dọa được phát hiện"
const MARKERS: ThreatMarker[] = [
  { id: 1, x: 18, y: 28, delay: 0 },
  { id: 2, x: 72, y: 15, delay: 0.8 },
  { id: 3, x: 85, y: 62, delay: 1.6 },
  { id: 4, x: 32, y: 75, delay: 2.4 },
  { id: 5, x: 58, y: 40, delay: 3.2 },
];

const ThreatPulse: React.FC<{ className?: string }> = ({ className = '' }) => {
  return (
    <div className={`absolute inset-0 pointer-events-none overflow-hidden ${className}`}>
      {/* Radar sweep — conic gradient quay liên tục */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          background: 'conic-gradient(from 0deg, transparent 0deg, #1D6FE8 2deg, transparent 4deg)',
          animation: 'spin 6s linear infinite',
          transformOrigin: 'center',
        }}
      />

      {/* Outer glow ring */}
      <div
        className="absolute inset-4 rounded-full border border-primary/10"
        style={{
          boxShadow: '0 0 40px rgba(29,111,232,0.07), inset 0 0 40px rgba(29,111,232,0.04)',
          animation: 'pulse 4s ease-in-out infinite',
        }}
      />

      {/* Threat markers */}
      {MARKERS.map((m) => (
        <div
          key={m.id}
          className="absolute"
          style={{ left: `${m.x}%`, top: `${m.y}%`, animationDelay: `${m.delay}s` }}
        >
          {/* Ping ring */}
          <span className="absolute -inset-2 rounded-full border border-secondary/50 animate-ping opacity-60" />
          {/* Center dot */}
          <span
            className="relative block w-1.5 h-1.5 rounded-full bg-secondary"
            style={{
              boxShadow: '0 0 6px rgba(255,42,109,0.9)',
              animation: `pulse 2s ease-in-out infinite`,
              animationDelay: `${m.delay}s`,
            }}
          />
        </div>
      ))}

      {/* Corner brackets — cyber HUD feel */}
      <div className="absolute top-0 left-0 w-12 h-12 border-t-2 border-l-2 border-[#1D6FE8]/20 rounded-tl-lg" />
      <div className="absolute top-0 right-0 w-12 h-12 border-t-2 border-r-2 border-[#1D6FE8]/20 rounded-tr-lg" />
      <div className="absolute bottom-0 left-0 w-12 h-12 border-b-2 border-l-2 border-[#1D6FE8]/20 rounded-bl-lg" />
      <div className="absolute bottom-0 right-0 w-12 h-12 border-b-2 border-r-2 border-[#1D6FE8]/20 rounded-br-lg" />
    </div>
  );
};

export default ThreatPulse;
