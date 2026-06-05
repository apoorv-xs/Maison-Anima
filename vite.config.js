import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 8724,
    mimeTypes: {
      'jsx': 'text/javascript',
      'js': 'text/javascript'
    }
  }
})