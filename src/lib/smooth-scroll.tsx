/**
 * DEEPFENSE.ONLINE — Lenis Smooth Scroll Provider
 * Tạo trải nghiệm cuộn mượt mà kiểu Apple.com
 * Tích hợp với GSAP ScrollTrigger để đồng bộ animations.
 * @copyright 2025 Ho Xuan Nguyen (25NS039)
 */

import { useEffect } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const SmoothScroll: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  useEffect(() => {
    // Respect accessibility: không smooth scroll nếu user muốn giảm motion
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    const lenis = new Lenis({
      lerp: 0.1,          // Tốc độ smoothing (0.05 = rất mượt, 0.2 = responsive hơn)
      duration: 1.4,       // Thời gian easing
      smoothWheel: true,
      syncTouch: false,    // Tắt trên mobile touch để giữ native feel
      prevent: (node: Element) => node.closest('[data-lenis-prevent]') !== null,
    } as any);

    // Đồng bộ Lenis ↔ GSAP ScrollTrigger
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
