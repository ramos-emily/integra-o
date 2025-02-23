import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite'


export default defineConfig({
  plugins: [react(), tailwindcss(),],
  server: {
    proxy: {
      '/api': {  // Redireciona requisições que começam com /api
        target: 'http://localhost:8000',  // URL do back-end (Django)
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),  // Remove o /api da URL
      },
    },
  },
});