import { defineConfig } from "vite";

// Vite config for building this package as a small library
export default defineConfig({
  build: {
    lib: {
      entry: "src/index.ts",
      name: "BaseError",
      formats: ["es", "cjs"],
      fileName: (format) => `index.${format}.js`,
    },
    sourcemap: true,
    outDir: "dist",
    rollupOptions: {
      // No externals for this tiny library
      external: [],
    },
    target: "es2018",
    emptyOutDir: true,
  },
});