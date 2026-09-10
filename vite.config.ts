
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { fileURLToPath } from 'node:url';

const projectRoot = fileURLToPath(new URL('.', import.meta.url));

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(projectRoot, './src'),
    },
  },
  build: {
    target: 'esnext',
    minify: 'esbuild',
    chunkSizeWarningLimit: 1000,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (!id.includes('node_modules')) return undefined;

          if (/[\\/]node_modules[\\/](react|react-dom|scheduler)[\\/]/.test(id)) {
            return 'vendor-react';
          }

          if (/[\\/]node_modules[\\/](react-router-dom|@remix-run|react-helmet-async)[\\/]/.test(id)) {
            return 'vendor-router';
          }

          if (/[\\/]node_modules[\\/](firebase|@firebase)[\\/]/.test(id)) {
            return 'vendor-firebase';
          }

          if (/[\\/]node_modules[\\/](gsap|@gsap|lenis)[\\/]/.test(id)) {
            return 'vendor-motion';
          }

          if (/[\\/]node_modules[\\/](@react-three|three|@use-gesture|zustand|maath|troika-three-text)[\\/]/.test(id)) {
            return 'vendor-three';
          }

          if (/[\\/]node_modules[\\/](react-markdown|remark-gfm|react-syntax-highlighter|prismjs|lowlight|hast-util|mdast-util|micromark|unified|unist-util|vfile)[\\/]/.test(id)) {
            return 'vendor-markdown';
          }

          if (/[\\/]node_modules[\\/](lucide-react)[\\/]/.test(id)) {
            return 'vendor-ui';
          }

          if (/[\\/]node_modules[\\/](@google|@vercel)[\\/]/.test(id)) {
            return 'vendor-services';
          }

          return undefined;
        },
      },
    },
  }
});
