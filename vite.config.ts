import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    host: "::",
    port: 8080,
    // Proxy для Laravel API
    proxy: {
      '/api': {
        target: 'http://localhost:8000',
        changeOrigin: true,
      },
    },
  },
  plugins: [
    react(),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  // Оптимизация для Laravel интеграции
  build: {
    manifest: true,
    outDir: 'dist',
    rollupOptions: {
      input: {
        main: path.resolve(__dirname, 'index.html'),
      },
    },
    // Генерация sourcemaps для отладки
    sourcemap: process.env.NODE_ENV === 'development',
  },
  // Base path для поддержки Laravel routes
  base: process.env.VITE_BASE_PATH || '/',
});
