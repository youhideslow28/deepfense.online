/**
 * DEEPFENSE.ONLINE â€” MagneticWrapper
 * Wrap báº¥t ká»³ element nÃ o Ä‘á»ƒ táº¡o hiá»‡u á»©ng "hÃºt" theo cursor khi hover.
 * Láº¥y cáº£m há»©ng tá»«: Linear.app, Vercel buttons.
 * @copyright 2025 H? Xuân Nguy?n & VKU Project Team
 */

import React, { useRef, useCallback } from 'react';
import gsap from 'gsap';

interface MagneticWrapperProps {
  children: React.ReactNode;
  /** CÆ°á»ng Ä‘á»™ hÃºt (px). Máº·c Ä‘á»‹nh 12 */
  strength?: number;
  className?: string;
}

const MagneticWrapper: React.FC<MagneticWrapperProps> = ({
  children,
  strength = 12,
  className = '',
}) => {
  const ref = useRef<HTMLDivElement>(null);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;

    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    gsap.to(el, {
      x: x * (strength / rect.width) * 2,
      y: y * (strength / rect.height) * 2,
      duration: 0.3,
      ease: 'power2.out',
    });
  }, [strength]);

  const handleMouseLeave = useCallback(() => {
    const el = ref.current;
    if (!el) return;
    gsap.to(el, { x: 0, y: 0, duration: 0.5, ease: 'elastic.out(1, 0.5)' });
  }, []);

  return (
    <div
      ref={ref}
      className={`inline-block ${className}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {children}
    </div>
  );
};

export default MagneticWrapper;
