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

// Expose lenis instance globally so ScrollToTop can call scrollTo(0)
let lenisInstance: Lenis | null = null;
export const getLenis = () => lenisInstance;

const SmoothScroll: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  useEffect(() => {
    // Respect accessibility: không smooth scroll nếu user muốn giảm motion
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    const lenis = new Lenis({
      lerp: 0.1,          // Smoothing velocity chuẩn mực từ phiên bản trước
      duration: 1.4,       // Easing mượt mà nguyên bản
      smoothWheel: true,
      syncTouch: false,    // Tắt trên mobile touch để giữ 100% native feel
      prevent: (node: Element) => node.closest('[data-lenis-prevent]') !== null,
    } as any);

    lenisInstance = lenis;

    // Đồng bộ Lenis ↔ GSAP ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update);

    const tickerCallback = (time: number) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(tickerCallback);
    gsap.ticker.lagSmoothing(0);

    // =========================================================================
    // NATIVE SCROLLBAR DRAG / HOLD PROTECTION
    // Khắc phục lỗi đè chuột vào thanh cuộn bên phải:
    // Khi nhấn chuột vào vùng thanh cuộn mép phải, tạm dừng Lenis để trình duyệt
    // xử lý kéo thanh cuộn native 100% mượt, thả chuột thì tiếp tục Lenis.
    // (Không gán listener vào 'scroll' event vì scrollTo() sẽ bị ngắt làm khựng con lăn)
    // =========================================================================
    let isScrollbarActive = false;

    const handlePointerDown = (e: MouseEvent | PointerEvent) => {
      const isRightScrollbar = e.clientX >= document.documentElement.clientWidth - 8;
      const isBottomScrollbar = e.clientY >= document.documentElement.clientHeight - 8;

      if (isRightScrollbar || isBottomScrollbar) {
        isScrollbarActive = true;
        lenis.stop();
      }
    };

    const handlePointerUp = () => {
      if (isScrollbarActive || lenis.isStopped) {
        isScrollbarActive = false;
        lenis.start();
      }
    };

    window.addEventListener('pointerdown', handlePointerDown, { capture: true, passive: true });
    window.addEventListener('mousedown', handlePointerDown, { capture: true, passive: true });
    window.addEventListener('pointerup', handlePointerUp, { passive: true });
    window.addEventListener('mouseup', handlePointerUp, { passive: true });
    window.addEventListener('pointercancel', handlePointerUp, { passive: true });
    window.addEventListener('blur', handlePointerUp, { passive: true });

    return () => {
      window.removeEventListener('pointerdown', handlePointerDown, { capture: true });
      window.removeEventListener('mousedown', handlePointerDown, { capture: true });
      window.removeEventListener('pointerup', handlePointerUp);
      window.removeEventListener('mouseup', handlePointerUp);
      window.removeEventListener('pointercancel', handlePointerUp);
      window.removeEventListener('blur', handlePointerUp);

      gsap.ticker.remove(tickerCallback);
      lenis.destroy();
      lenisInstance = null;
    };
  }, []);

  return <>{children}</>;
};

export default SmoothScroll;

