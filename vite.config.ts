import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// Dev-only plugin that disables browser caching so every refresh is fresh.
const noCacheInDev = () => ({
  name: 'no-cache-in-dev',
  apply: 'serve' as const,
  configureServer(server: import('vite').ViteDevServer) {
    server.middlewares.use((_req, res, next) => {
      res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, max-age=0')
      res.setHeader('Pragma', 'no-cache')
      res.setHeader('Expires', '0')
      next()
    })
  },
})

export default defineConfig(({ command }) => ({
  plugins: [react(), tailwindcss(), noCacheInDev()],
  base: process.env.VITE_BASE_URL ?? '/',
  // Force dependency re-optimization during dev so the cache is always rebuilt.
  optimizeDeps: command === 'serve' ? { force: true } : {},
}))
