import { defineConfig } from 'vitest/config';
import path from 'node:path';

export default defineConfig({
  test: {
    environment: 'node',
    include: ['src/**/*.test.ts'],
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      'collections/server': path.resolve(__dirname, './.source/server.ts'),
      'collections/browser': path.resolve(__dirname, './.source/browser.ts'),
    },
  },
});
