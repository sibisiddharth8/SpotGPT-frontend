import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/SpotGPT-frontend/',
  server: {
    host: '0.0.0.0', 
    port: 5173,      
  }
})
