/**
 * DEEPFENSE.ONLINE — usePerfMode
 * Quản lý chế độ hiệu năng: 'lite' (tắt 3D background, smooth scroll, summer effects)
 * hoặc 'full' (đầy đủ hiệu ứng). Auto-default 'lite' trên mobile.
 */

import { useCallback, useEffect, useState } from 'react';

export type PerfMode = 'lite' | 'full';

const STORAGE_KEY = 'df_perf_mode';

const detectInitial = (): PerfMode => {
  if (typeof window === 'undefined') return 'full';
  try {
    const saved = window.localStorage.getItem(STORAGE_KEY);
    if (saved === 'lite' || saved === 'full') return saved;
  } catch {
    /* localStorage có thể bị chặn */
  }
  // Auto-detect mobile / low-end
  const isCoarsePointer = window.matchMedia?.('(pointer: coarse)').matches;
  const isNarrow = window.innerWidth < 768;
  const isReducedMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
  const isLowConcurrency = (navigator as any).hardwareConcurrency && (navigator as any).hardwareConcurrency <= 4;
  const isSaveData = (navigator as any).connection?.saveData === true;
  if (isCoarsePointer || isNarrow || isReducedMotion || isLowConcurrency || isSaveData) return 'lite';
  return 'full';
};

export function usePerfMode() {
  const [mode, setModeState] = useState<PerfMode>(() => detectInitial());

  const setMode = useCallback((next: PerfMode) => {
    setModeState(next);
    try {
      window.localStorage.setItem(STORAGE_KEY, next);
    } catch {
      /* ignore */
    }
  }, []);

  const toggle = useCallback(() => {
    setMode(mode === 'lite' ? 'full' : 'lite');
  }, [mode, setMode]);

  // Cross-tab sync
  useEffect(() => {
    const onStorage = (e: StorageEvent) => {
      if (e.key !== STORAGE_KEY) return;
      if (e.newValue === 'lite' || e.newValue === 'full') setModeState(e.newValue);
    };
    window.addEventListener('storage', onStorage);
    return () => window.removeEventListener('storage', onStorage);
  }, []);

  return { mode, setMode, toggle, isLite: mode === 'lite' } as const;
}
