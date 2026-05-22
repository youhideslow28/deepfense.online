import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      injectRegister: 'auto',

      manifest: {
        name: 'DEEPFENSE BASICS',
        short_name: 'DF Basics',
        description: 'Khóa học cơ bản về deepfake và phòng vệ trước nội dung giả mạo',
        theme_color: '#7c3aed',
        background_color: '#0a0a0a',
        display: 'standalone',
        orientation: 'any',
        start_url: '/academy/basics/',
        scope: '/academy/basics/',
        lang: 'vi',
        categories: ['education'],
        icons: [
          {
            src: 'icons/icon-32.png',
            sizes: '32x32',
            type: 'image/png',
          },
          {
            src: 'icons/icon-192.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: 'icons/icon-512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any',
          },
          {
            src: 'icons/icon-512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'maskable',
          },
          {
            src: 'icons/icon.svg',
            sizes: 'any',
            type: 'image/svg+xml',
          },
        ],
      },

      workbox: {
        // Precache all built assets
        globPatterns: ['**/*.{js,css,html,ico,png,svg,woff,woff2}'],
        // Cache-first for static assets
        runtimeCaching: [
          {
            // Google Fonts stylesheets
            urlPattern: /^https:\/\/fonts\.googleapis\.com\/.*/i,
            handler: 'CacheFirst',
            options: {
              cacheName: 'google-fonts-cache',
              expiration: { maxEntries: 10, maxAgeSeconds: 60 * 60 * 24 * 365 },
              cacheableResponse: { statuses: [0, 200] },
            },
          },
          {
            // Google Fonts files
            urlPattern: /^https:\/\/fonts\.gstatic\.com\/.*/i,
            handler: 'CacheFirst',
            options: {
              cacheName: 'gstatic-fonts-cache',
              expiration: { maxEntries: 10, maxAgeSeconds: 60 * 60 * 24 * 365 },
              cacheableResponse: { statuses: [0, 200] },
            },
          },
        ],
        // SPA fallback — any navigation within scope returns index.html
        navigateFallback: '/academy/basics/index.html',
        navigateFallbackDenylist: [
          // Don't intercept routes outside this app's scope
          /^\/(?!academy\/basics)/,
        ],
        // Skip waiting — activate new SW immediately
        skipWaiting: true,
        clientsClaim: true,
      },

      devOptions: {
        enabled: false, // Keep SW off during dev to avoid noise
      },
    }),
  ],

  base: '/academy/basics/',
  build: {
    outDir: path.resolve(__dirname, '../public/academy/basics'),
    emptyOutDir: true,
    target: 'esnext',
    minify: 'esbuild',
  },
});
