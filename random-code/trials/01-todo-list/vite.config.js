import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import path from './path';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(import.meta.dirName, './src'),
      '@assets': path.resolve(import.meta.dirName, './src/assets'),
      '@components': path.resolve(import.meta.dirName, './src/components'),
    }
  }
})
