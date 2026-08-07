import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Standalone Vite config for the Cart & Checkout microfrontend.
// This app is built and deployed independently of the other microfrontends.
// `base: './'` keeps asset paths relative so the built bundle can be hosted
// at any path/subdomain and later embedded by the shell app.
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
      output: {
        manualChunks: {
          'react-vendor': ['react', 'react-dom', 'react-router-dom'],
          'mui-vendor': ['@mui/material', '@mui/icons-material', '@emotion/react', '@emotion/styled'],
          'form-vendor': ['react-hook-form'],
        },
      },
    },
  },
});
