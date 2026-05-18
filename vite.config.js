import { defineConfig } from 'vite'
import { resolve } from 'path'
import { viteStaticCopy } from 'vite-plugin-static-copy'

export default defineConfig({
  base: '/photos/',
  plugins: [
    viteStaticCopy({
      targets: [
        { src: 'photos_webp',       dest: '.' },
        { src: 'photos_webp_small', dest: '.' },
      ]
    })
  ],
  build: {
    rollupOptions: {
      input: {
        main:        resolve(__dirname, 'index.html'),
        portrait:    resolve(__dirname, 'portrait/index.html'),
        events:      resolve(__dirname, 'events/index.html'),
        products:    resolve(__dirname, 'products/index.html'),
        photopicker: resolve(__dirname, 'photo-picker.html'),
      }
    }
  }
})
