/**
 * DEEPFENSE.ONLINE — ShimmerBorder
 * Animated gradient border chạy vòng quanh bất kỳ element nào.
 * @copyright 2025 Ho Xuan Nguyen (25NS039)
 */

import React from 'react';

interface ShimmerBorderProps {
  children: React.ReactNode;
  /** Border radius (px) */
  radius?: number;
  /** Gradient colors */
  colors?: string[];
  /** Animation duration (seconds) */
  duration?: number;
  /** Border width (px) */
  borderWidth?: number;
  className?: string;
}

const ShimmerBorder: React.FC<ShimmerBorderProps> = ({
  children,
  radius = 16,
  colors = ['#00F0FF', '#A855F7', '#FF2A6D', '#00F0FF'],
  duration = 3,
  borderWidth = 1,
  className = '',
}) => {
  const gradientStr = colors.join(', ');

  return (
    <div
      className={`relative ${className}`}
      style={{ borderRadius: `${radius}px` }}
    >
      {/* Animated spinning gradient */}
      <div
        className="absolute -inset-px pointer-events-none"
        style={{
          borderRadius: `${radius}px`,
          padding: `${borderWidth}px`,
          background: `conic-gradient(from 0deg, ${gradientStr})`,
          animation: `spin ${duration}s linear infinite`,
          WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
          WebkitMaskComposite: 'xor',
          maskComposite: 'exclude',
        }}
      />
      {/* Content */}
      <div className="relative z-10" style={{ borderRadius: `${radius}px` }}>
        {children}
      </div>
    </div>
  );
};

export default ShimmerBorder;
