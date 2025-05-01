import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    port: 80,
    proxy: {
      '/api': {
        target: 'http://localhost:8080',
        rewrite: (path) => path.replace(/^\/api/, ''),
        changeOrigin: true,
      }
    }
  },
  plugins: [
    vue(),
    vueJsx(),
  ],
  resolve: {
    alias: {
      //转换为本地文件路径
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
