/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary:   '#1D6FE8',   // Ocean blue - màu chủ đạo
        secondary: '#FF2A6D',   // Red - cảnh báo / danger
        accent:    '#F59E0B',   // Amber - gamification / achievements
        success:   '#10B981',   // Green - correct / safe
        bgDark:    '#03080F',   // Near-black blue-tinted bg
        surface:   '#0D1929',   // Dark navy surface
        border:    '#1E3A5F',   // Blue-tinted border
      },
      fontFamily: {
        sans:  ['Inter', 'Arial', 'Helvetica Neue', 'sans-serif'],
        mono:  ['JetBrains Mono', 'Consolas', 'Liberation Mono', 'monospace'],
        serif: ['Outfit', 'Inter', 'Arial', 'Helvetica Neue', 'sans-serif'],
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
