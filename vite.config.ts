import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  base: './',
  server: {
    proxy: {
      '/8001/api': {
        target: 'http://120.46.87.126:8001',
        changeOrigin: true,
        rewrite: path => path.replace(/^\/8001/, ''),
      },
      '/8081/api': {
        target: 'http://120.46.87.126:8081/',
        changeOrigin: true,
        rewrite: path => path.replace(/^\/8081/, ''),
      },
      '/8080/api': {
        target: 'http://192.168.10.129:8080/',
        changeOrigin: true,
        rewrite: path => path.replace(/^\/8080/, ''),
      },

    },
  },
})
