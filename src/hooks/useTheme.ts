/**
 * DEEPFENSE.ONLINE - useTheme
 * Quan ly light/dark mode that, co luu lua chon nguoi dung.
 */

import { useCallback, useEffect, useState } from 'react';

export type ThemeMode = 'light' | 'dark';

const STORAGE_KEY = 'df_theme';
const DEFAULT_VERSION_KEY = 'df_theme_default_v2';
const DEFAULT_VERSION = 'dark-primary';

const isThemeMode = (value: string | null): value is ThemeMode => (
  value === 'light' || value === 'dark'
);

const getInitialTheme = (): ThemeMode => {
  if (typeof window === 'undefined') return 'dark';

  try {
    if (window.localStorage.getItem(DEFAULT_VERSION_KEY) !== DEFAULT_VERSION) {
      window.localStorage.setItem(STORAGE_KEY, 'dark');
      window.localStorage.setItem(DEFAULT_VERSION_KEY, DEFAULT_VERSION);
      return 'dark';
    }

    const saved = window.localStorage.getItem(STORAGE_KEY);
    if (isThemeMode(saved)) return saved;
  } catch {
    /* localStorage co the bi chan */
  }

  return 'dark';
};

const applyTheme = (theme: ThemeMode) => {
  if (typeof window === 'undefined') return;

  const root = window.document.documentElement;
  root.classList.toggle('light', theme === 'light');
  root.classList.toggle('dark', theme === 'dark');
  root.setAttribute('data-theme', theme);

  if (window.document.body) {
    window.document.body.classList.toggle('light', theme === 'light');
    window.document.body.classList.toggle('dark', theme === 'dark');
    window.document.body.setAttribute('data-theme', theme);
  }

  try {
    window.localStorage.setItem(STORAGE_KEY, theme);
    window.localStorage.setItem('dfb_theme_v1', theme);
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
