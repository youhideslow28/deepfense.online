/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary:   '#1D6FE8',   // Ocean blue - màu chủ đạo
        secondary: '#FF2A6D',   // Red - cảnh báo / danger
        accent:    '#F59E0B',   // Amber - gamification / achievements
        success:   '#10B981',   // Green - correct / safe
        bgDark:    'var(--bg-dark)',   // Near-black blue-tinted bg
        surface:   'var(--bg-surface)',   // Dark navy surface
        border:    'var(--border-color)',   // Blue-tinted border
        slate: {
          50: 'var(--slate-50)',
          100: 'var(--slate-100)',
          200: 'var(--slate-200)',
          300: 'var(--slate-300)',
          400: 'var(--slate-400)',
          500: 'var(--slate-500)',
          600: 'var(--slate-600)',
          700: 'var(--slate-700)',
          800: 'var(--slate-800)',
          900: 'var(--slate-900)',
        },
      },
      fontFamily: {
        sans:  ['Inter', 'Be Vietnam Pro', 'Arial', 'Helvetica Neue', 'sans-serif'],
        display: ['Be Vietnam Pro', 'Inter', 'Arial', 'Helvetica Neue', 'sans-serif'],
        mono:  ['JetBrains Mono', 'Consolas', 'Liberation Mono', 'monospace'],
        serif: ['Be Vietnam Pro', 'Inter', 'Arial', 'Helvetica Neue', 'sans-serif'],
      },
      animation: {
        'float':       'float 4s ease-in-out infinite',
        'pulse-slow':  'pulse 3s cubic-bezier(0.4,0,0.6,1) infinite',
        'spin-slow':   'spin 10s linear infinite',
      },
    },
  },
  plugins: [],
};
