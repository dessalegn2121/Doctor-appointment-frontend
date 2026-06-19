import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5174,
    strictPort: true, // Don't auto-increment port, fail if 5174 is in use
    host: 'localhost',
  },
})
