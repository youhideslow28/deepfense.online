/**
 * DEEPFENSE.ONLINE — GlowButton
 * Nút bấm chuyên nghiệp với neon glow, hover ripple, và magnetic effect.
 * @copyright 2025 Ho Xuan Nguyen (25NS039)
 */

import React, { useRef, useCallback } from 'react';

type ButtonColor = 'primary' | 'secondary' | 'success' | 'purple' | 'ghost';
type ButtonSize = 'sm' | 'md' | 'lg';

interface GlowButtonProps {
  children: React.ReactNode;
  color?: ButtonColor;
  size?: ButtonSize;
  icon?: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
  type?: 'button' | 'submit';
}

const COLOR_MAP: Record<ButtonColor, { base: string; glow: string }> = {
  primary: {
    base: 'bg-[#1D6FE8] text-white hover:bg-[#2D7FF9]',
    glow: 'shadow-[0_0_20px_rgba(29,111,232,0.35)] hover:shadow-[0_0_40px_rgba(29,111,232,0.6)]',
  },
  secondary: {
    base: 'bg-secondary text-white hover:bg-white hover:text-black',
    glow: 'shadow-[0_0_20px_rgba(255,42,109,0.3)] hover:shadow-[0_0_35px_rgba(255,42,109,0.5)]',
  },
  success: {
    base: 'bg-green-500 text-black hover:bg-green-400',
    glow: 'shadow-[0_0_20px_rgba(34,197,94,0.3)] hover:shadow-[0_0_35px_rgba(34,197,94,0.5)]',
  },
  purple: {
    base: 'bg-purple-600 text-white hover:bg-purple-500',
    glow: 'shadow-[0_0_20px_rgba(168,85,247,0.3)] hover:shadow-[0_0_35px_rgba(168,85,247,0.5)]',
  },
  ghost: {
    base: 'bg-transparent text-white border border-white/15 hover:bg-white/10 hover:border-white/30',
    glow: '',
  },
};

const SIZE_MAP: Record<ButtonSize, string> = {
  sm: 'px-5 py-2.5 text-[10px] rounded-lg gap-1.5',
  md: 'px-7 py-3.5 text-xs rounded-xl gap-2',
  lg: 'px-9 py-4.5 text-xs rounded-xl gap-2.5',
};

const GlowButton: React.FC<GlowButtonProps> = ({
  children,
  color = 'primary',
  size = 'md',
  icon,
  onClick,
  disabled = false,
  className = '',
  type = 'button',
}) => {
  const btnRef = useRef<HTMLButtonElement>(null);

  const handleClick = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
    // Ripple effect
    const btn = btnRef.current;
    if (!btn) return;
    const rect = btn.getBoundingClientRect();
    const ripple = document.createElement('span');
    const size = Math.max(rect.width, rect.height);
    ripple.style.cssText = `
      position:absolute; border-radius:50%; pointer-events:none;
      width:${size}px; height:${size}px;
      left:${e.clientX - rect.left - size / 2}px;
      top:${e.clientY - rect.top - size / 2}px;
      background:rgba(255,255,255,0.25);
      transform:scale(0); animation:ripple 0.6s ease-out forwards;
    `;
    btn.appendChild(ripple);
    setTimeout(() => ripple.remove(), 700);
    onClick?.();
  }, [onClick]);

  const { base, glow } = COLOR_MAP[color];
  const sizeClass = SIZE_MAP[size];

  return (
    <button
      ref={btnRef}
      type={type}
      onClick={handleClick}
      disabled={disabled}
      className={`
        relative overflow-hidden inline-flex items-center justify-center
        font-black uppercase tracking-widest
        transition-all duration-300 active:scale-95
        disabled:opacity-40 disabled:pointer-events-none
        ${base} ${glow} ${sizeClass} ${className}
      `}
    >
      {icon && <span className="shrink-0">{icon}</span>}
      {children}
    </button>
  );
};

export default GlowButton;
