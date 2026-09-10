/**
 * DEEPFENSE.ONLINE - useTheme
 * Quan ly light/dark mode that, co luu lua chon nguoi dung.
 */

import { useCallback, useEffect, useState } from 'react';

export type ThemeMode = 'light' | 'dark';

const STORAGE_KEY = 'df_theme';

const isThemeMode = (value: string | null): value is ThemeMode => (
  value === 'light' || value === 'dark'
);

const getInitialTheme = (): ThemeMode => {
  if (typeof window === 'undefined') return 'dark';

  try {
    const saved = window.localStorage.getItem(STORAGE_KEY);
    if (isThemeMode(saved)) return saved;
  } catch {
    /* localStorage co the bi chan */
  }

  return window.matchMedia?.('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
};

const applyTheme = (theme: ThemeMode) => {
  if (typeof window === 'undefined') return;

  const root = window.document.documentElement;
  root.classList.toggle('light', theme === 'light');
  root.classList.toggle('dark', theme === 'dark');
  root.setAttribute('data-theme', theme);

  try {
    window.localStorage.setItem(STORAGE_KEY, theme);
  } catch {
    /* ignore */
  }
};

export function useTheme() {
  const [theme, setThemeState] = useState<ThemeMode>(() => getInitialTheme());

  useEffect(() => {
    applyTheme(theme);
  }, [theme]);

  const setTheme = useCallback((next: ThemeMode) => {
    setThemeState(next);
  }, []);

  const toggleTheme = useCallback(() => {
    setThemeState((current) => (current === 'dark' ? 'light' : 'dark'));
  }, []);

  return { theme, setTheme, toggleTheme } as const;
}
