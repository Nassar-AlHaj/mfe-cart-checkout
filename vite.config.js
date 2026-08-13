import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: './',

  server: {
    port: 5174,
    open: true,
  },

  preview: {
    port: 4174,
  },

  build: {
    outDir: 'dist',
    sourcemap: true,

    rollupOptions: {
      input: {
        app: 'index.html',
        'cart-element': 'src/cart-checkout-element.jsx',
      },

      output: {
        entryFileNames: (chunkInfo) => {
          if (chunkInfo.name === 'cart-element') {
            return 'assets/cart-element.js';
          }
          return 'assets/[name]-[hash].js';
        },

        manualChunks: {
          'react-vendor': ['react', 'react-dom', 'react-router-dom'],
          'mui-vendor': [
            '@mui/material',
            '@mui/icons-material',
            '@emotion/react',
            '@emotion/styled',
          ],
          'form-vendor': ['react-hook-form'],
        },
      },
    },
  },
});