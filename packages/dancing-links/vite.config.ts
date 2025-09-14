import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';

export default defineConfig({
  plugins: [dts()],
  build: {
    minify: true,
    lib: {
      entry: 'src/index.ts',
      name: 'DancingLinks',
      fileName: 'index',
    },
    rollupOptions: {
      external: [],
      output: {
        globals: {},
      },
    },
  },
});
