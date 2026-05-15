/**
 * DEEPFENSE.ONLINE â€” Lenis Smooth Scroll Provider
 * Táº¡o tráº£i nghiá»‡m cuá»™n mÆ°á»£t mÃ  kiá»ƒu Apple.com
 * TÃ­ch há»£p vá»›i GSAP ScrollTrigger Ä‘á»ƒ Ä‘á»“ng bá»™ animations.
 * @copyright 2025 H? Xuân Nguy?n & VKU Project Team
 */

import { useEffect } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const SmoothScroll: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  useEffect(() => {
    // Respect accessibility: khÃ´ng smooth scroll náº¿u user muá»‘n giáº£m motion
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    const lenis = new Lenis({
      lerp: 0.1,          // Tá»‘c Ä‘á»™ smoothing (0.05 = ráº¥t mÆ°á»£t, 0.2 = responsive hÆ¡n)
      duration: 1.4,       // Thá»i gian easing
      smoothWheel: true,
      syncTouch: false,    // Táº¯t trÃªn mobile touch Ä‘á»ƒ giá»¯ native feel
      prevent: (node: Element) => node.closest('[data-lenis-prevent]') !== null,
    } as any);

    // Äá»“ng bá»™ Lenis â†” GSAP ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update);

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });
    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
};

export default SmoothScroll;
