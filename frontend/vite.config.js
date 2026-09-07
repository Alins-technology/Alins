import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    open: true,
  },
  build: {
    chunkSizeWarningLimit: 1200,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom', 'react-router-dom', 'framer-motion'],
          // three.js + R3F/drei are only pulled in by the lazily-loaded
          // HeroOrb/PageOrb scenes, but split them into their own chunk
          // anyway so they never bleed into the main vendor bundle even if
          // a future import changes the load order.
          three: ['three', '@react-three/fiber', '@react-three/drei'],
        },
      },
    },
  },
})
