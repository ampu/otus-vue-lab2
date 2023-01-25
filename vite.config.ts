import {fileURLToPath, URL} from 'node:url'

import {defineConfig} from 'vite'
import vue from '@vitejs/plugin-vue'

console.log(process.env.BASE_URL)

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  build: {
    outDir: `build`,
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: '@import "@/assets/mixins";',
      },
    },
  },
})