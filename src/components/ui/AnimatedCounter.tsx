/**
 * DEEPFENSE.ONLINE — AnimatedCounter
 * Số đếm tăng dần từ 0 → target khi element xuất hiện trong viewport.
 * @copyright 2025 Ho Xuan Nguyen (25NS039)
 */

import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface AnimatedCounterProps {
  target: number;
  duration?: number;
  suffix?: string;
  prefix?: string;
  className?: string;
}

const AnimatedCounter: React.FC<AnimatedCounterProps> = ({
  target,
  duration = 2,
  suffix = '',
  prefix = '',
  className = '',
}) => {
  const [display, setDisplay] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || target <= 0) return;

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: el,
        start: 'top 90%',
        once: true,
        onEnter: () => {
          if (hasAnimated.current) return;
          hasAnimated.current = true;

          const counter = { val: 0 };
          gsap.to(counter, {
            val: target,
            duration,
            ease: 'power2.out',
            onUpdate: () => setDisplay(Math.round(counter.val)),
          });
        },
      });
    });

    return () => ctx.revert();
  }, [target, duration]);

  return (
    <span ref={ref} className={className}>
      {prefix}{display.toLocaleString()}{suffix}
    </span>
  );
};

export default AnimatedCounter;
