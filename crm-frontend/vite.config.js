import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    allowedHosts: [
      'localhost',
      'fb21-2804-d49-4945-4800-b9-9382-f9a8-687f.ngrok-free.app' // <== mantenha seu domínio
    ]
  }
})
