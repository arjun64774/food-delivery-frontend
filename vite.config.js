import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: './', // important for deployment

  server: {
    port: 5174,   // 🔥 always run frontend on 5174
  }
})
