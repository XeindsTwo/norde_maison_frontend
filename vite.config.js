import {defineConfig} from 'vite';
import react from '@vitejs/plugin-react';
import svgr from 'vite-plugin-svgr';
import path from 'path';

export default defineConfig({
  plugins: [
    react(),
    svgr({svgrOptions: {}, include: '**/*.svg'}),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'), // @ → src
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `
          @use "@/assets/css/mixin" as *;
          @use "@/assets/css/vars" as *;
        `,
      },
    },
  },
});
