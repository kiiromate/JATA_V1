import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist', // Matches your Vercel output directory
    rollupOptions: {
      input: {
        main: 'index.html', // Explicitly set the entry point
      },
    },
  },
});