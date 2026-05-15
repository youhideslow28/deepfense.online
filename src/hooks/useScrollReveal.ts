/**
 * DEEPFENSE.ONLINE — useScrollReveal Hook
 * Custom hook để áp dụng GSAP scroll-triggered reveal animations
 * vào bất kỳ container nào. Tự cleanup khi unmount.
 * @copyright 2025 Ho Xuan Nguyen (25NS039)
 */

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

type RevealPreset = 'fade-up' | 'fade-left' | 'fade-right' | 'scale-in' | 'blur-in';

interface UseScrollRevealOptions {
  /** Selector of elements inside the container to animate */
  selector?: string;
  /** Animation preset */
  preset?: RevealPreset;
  /** Stagger delay between elements (seconds) */
  stagger?: number;
  /** Animation duration (seconds) */
  duration?: number;
  /** ScrollTrigger start position */
  start?: string;
  /** Disable on mobile */
  disableMobile?: boolean;
}

const PRESET_MAP: Record<RevealPreset, gsap.TweenVars> = {
  'fade-up': { y: 60, opacity: 0 },
  'fade-left': { x: -60, opacity: 0 },
  'fade-right': { x: 60, opacity: 0 },
  'scale-in': { scale: 0.85, opacity: 0 },
  'blur-in': { opacity: 0, filter: 'blur(12px)' },
};

export function useScrollReveal<T extends HTMLElement = HTMLDivElement>(
  options: UseScrollRevealOptions = {}
) {
  const containerRef = useRef<T>(null);
  const {
    selector = '[data-reveal]',
    preset = 'fade-up',
    stagger = 0.12,
    duration = 0.8,
    start = 'top 85%',
    disableMobile = false,
  } = options;

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Respect accessibility
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    if (disableMobile && window.innerWidth < 768) return;

    const elements = container.querySelectorAll(selector);
    if (elements.length === 0) return;

    const fromVars = PRESET_MAP[preset];
    const ctx = gsap.context(() => {
      elements.forEach((el, index) => {
        gsap.from(el, {
          ...fromVars,
          duration,
          delay: index * stagger * 0.5, // Reduced stagger since they trigger individually
          ease: 'power3.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 92%',
            toggleActions: 'play reverse play reverse',
          },
        });
      });
    }, container);

    return () => ctx.revert();
  }, [selector, preset, stagger, duration, start, disableMobile]);

  return containerRef;
}

/**
 * Hook đơn giản hơn: áp dụng animation cho 1 element duy nhất
 */
export function useRevealOnce<T extends HTMLElement = HTMLDivElement>(
  fromVars: gsap.TweenVars = { y: 40, opacity: 0 },
  triggerOptions: { start?: string; duration?: number } = {}
) {
  const ref = useRef<T>(null);
  const { start = 'top 85%', duration = 0.7 } = triggerOptions;

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    const ctx = gsap.context(() => {
      gsap.from(el, {
        ...fromVars,
        duration,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: el,
          start,
          toggleActions: 'play none none none',
        },
      });
    });

    return () => ctx.revert();
  }, [start, duration]);

  return ref;
}
