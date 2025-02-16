import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import 'dotenv/config'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
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
  "redirects": [
    {
      "source": "/:path*",
      "destination": "/index.html",
      "permanent": true
    }
  ]
})
