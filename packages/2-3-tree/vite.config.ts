import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';

export default defineConfig({
  plugins: [dts({ exclude: ['**/*.spec.ts', '**/*.test.ts'] })],
  build: {
    minify: 'esbuild',
    lib: {
      entry: 'src/index.ts',
      name: 'Tree23',
      fileName: 'index',
      formats: ['es', 'cjs', 'umd', 'iife', 'system'],
    },
    rollupOptions: {
      external: [],
      output: {
        globals: {},
      },
    },
  },
});
