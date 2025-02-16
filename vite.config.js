import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import 'dotenv/config'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/Socket-Game-App/',
  define:{
    'process.env.VITE_BACKEND_API':JSON.stringify(process.env.VITE_BACKEND_API)
  },
  optimizeDeps: {
    include: ['linked-dep']
  },
  build: {
    commonjsOptions: {
      include: [/linked-dep/, /node_modules/]
    }
  },
})
