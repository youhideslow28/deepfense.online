/**
 * DEEPFENSE.ONLINE — GlassCard
 * Card component với glassmorphism effect + shimmer border.
 * @copyright 2025 Ho Xuan Nguyen (25NS039)
 */

import React from 'react';

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  /** Bật/tắt shimmer border animation */
  shimmer?: boolean;
  /** Padding override */
  padding?: string;
  onClick?: () => void;
  as?: 'div' | 'a';
  href?: string;
}

const GlassCard: React.FC<GlassCardProps> = ({
  children,
  className = '',
  shimmer = false,
  padding = 'p-6 md:p-8',
  onClick,
  as = 'div',
  href,
}) => {
  const baseClass = `
    relative rounded-2xl overflow-hidden
    bg-white/[0.03] backdrop-blur-md
    border border-white/[0.06]
    hover:border-white/[0.12] hover:bg-white/[0.05]
    transition-all duration-500
    shadow-[0_8px_32px_rgba(0,0,0,0.4)]
    group
    ${padding} ${className}
  `;

  const shimmerBorder = shimmer ? (
    <div className="absolute inset-0 rounded-2xl pointer-events-none overflow-hidden">
      <div
        className="absolute -inset-[1px] rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"
        style={{
          background: 'conic-gradient(from 0deg, transparent, #00F0FF, transparent, #A855F7, transparent)',
          animation: 'spin 4s linear infinite',
        }}
      />
      <div className="absolute inset-[1px] rounded-2xl bg-[#0a0a0a]" />
    </div>
  ) : null;

  const Tag = as;
  const extraProps = as === 'a' ? { href, target: '_blank', rel: 'noopener noreferrer' } : {};

  return (
    <Tag
      className={baseClass}
      onClick={onClick}
      {...extraProps}
    >
      {shimmerBorder}
      <div className="relative z-10">{children}</div>
    </Tag>
  );
};

export default GlassCard;
