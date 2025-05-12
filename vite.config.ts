import { fileURLToPath, URL } from 'node:url'

import type { Plugin } from 'vite';
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import eslint from 'vite-plugin-eslint';
import svgLoaderPlugin from 'vite-svg-loader';
import vueDevTools from 'vite-plugin-vue-devtools';

function createSvgLoaderPlugin(): Plugin<any> {
  return svgLoaderPlugin({
    svgo: true,
    defaultImport: 'component',
  });
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    eslint({
      cache: false,
      emitWarning: true,
      failOnError: true,
    }),
    createSvgLoaderPlugin(),
    vueDevTools(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      'scss': fileURLToPath(new URL('./scss', import.meta.url)),
    },
  },
  test: {
    globals: true,
    environment: 'jsdom',
  },
})
