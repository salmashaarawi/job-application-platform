import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'https://useraccountmanagement.azurewebsites.net',
        changeOrigin: true,
        secure: true,               // If the server uses HTTPS, set this to true
        rewrite: (path) => path.replace(/^\/api/, ''), // Rewrite the API path
      },
    },
  },
});
