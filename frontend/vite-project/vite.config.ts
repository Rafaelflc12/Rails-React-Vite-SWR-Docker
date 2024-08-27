import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      // Redireciona todas as requisições que começam com /api para o backend
      '/api': {
        target: 'http://web:3000', // URL do backend
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''), // Remove o /api da URL
      },
      // Redireciona a rota raiz ("/") para o backend
      '^/$': {
        target: 'http://web:3000', // URL do backend
        changeOrigin: true,
      },
    },
  },
});