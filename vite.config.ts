import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

const configuredBasePath = process.env.VITE_BASE_PATH || '/'
const base = configuredBasePath.endsWith('/')
  ? configuredBasePath
  : `${configuredBasePath}/`

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
  base,
  optimizeDeps: {
    exclude: ['maplibre-gl'],
  },
  server: {
    port: 5173,
    proxy: {
      '/api': {
        target: 'http://localhost:5000',
        changeOrigin: true,
        secure: false,
      },
    },
  },
})
