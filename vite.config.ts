import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react({
      babel: {
        plugins: [['babel-plugin-react-compiler']],
      },
    }),
  ],
  server: {
    proxy: {
      '/user': {
        target: 'http://localhost:8000',
        changeOrigin: true,
      },
      '/transaction': {
        target: 'http://localhost:8000',
        changeOrigin: true,
      },
      '/jars': {
        target: 'http://localhost:8000',
        changeOrigin: true,
      },
      '/goals': {
        target: 'http://localhost:8000',
        changeOrigin: true,
      }
    }
  }
})