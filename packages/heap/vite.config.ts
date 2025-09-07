import { defineConfig } from "vite";

export default defineConfig({
  build: {
    lib: {
      entry: "src/heap.js",
      name: "Heap",
      fileName: "index",
    },
    rollupOptions: {
      external: [],
      output: {
        globals: {},
      },
    },
  },
});
