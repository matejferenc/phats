import { defineConfig } from 'vite'
import { resolve } from 'path'

export default defineConfig({
  base: '/phats/',
  build: {
    rollupOptions: {
      input: {
        main:     resolve(__dirname, 'index.html'),
        portrait: resolve(__dirname, 'portrait/index.html'),
        events:   resolve(__dirname, 'events/index.html'),
        products: resolve(__dirname, 'products/index.html'),
      }
    }
  }
})
