import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import svgr from 'vite-plugin-svgr';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
  plugins: [
    react(),
    svgr(),
    tsconfigPaths(),
  ],
  server: {
    port: 3000,
  },
  build: {
    outDir: 'dist',
  },
  define: {
    'process.env.VITE_FATHOM_ID': JSON.stringify(process.env.VITE_FATHOM_ID)
  }
});
