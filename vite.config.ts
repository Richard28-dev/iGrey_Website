import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    {
      name: 'rewrite-properties-to-spa',
      configureServer(server) {
        server.middlewares.use((req, _res, next) => {
          const rawUrl = req.url || '';
          const pathname = rawUrl.split('?')[0];
          if (
            pathname === '/properties' ||
            pathname === '/properties/' ||
            pathname === '/properties.html'
          ) {
            req.url = '/index.html' + (rawUrl.includes('?') ? rawUrl.slice(rawUrl.indexOf('?')) : '');
          }
          next();
        });
      },
    },
  ],
  base: process.env.NODE_ENV === 'production' ? '/iGrey_Website/' : '/',
})
