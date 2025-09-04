import { defineConfig } from 'tsdown';

export default defineConfig({
  entry: ['src/index.ts'],
  format: ['cjs', 'esm'],
  dts: true,
  minify: true,
  sourcemap: true,
  clean: true,
  external: ['react', 'react-dom'],
});