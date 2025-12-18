import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    tailwindcss(),
    react()
  ],
  server: {
    host: '127.0.0.1',   // force IPv4
    port: 3000,          // avoid blocked 5173
    strictPort: true
  }
  
})
