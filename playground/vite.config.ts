import { defineConfig } from 'vite';

export default defineConfig({
  server: {
    port: 3000,
  },
  define: {
    global: 'globalThis',
  },
  optimizeDeps: {
    include: ['monaco-editor']
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          monaco: ['monaco-editor']
        }
      }
    }
  }
});
