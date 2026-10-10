import { defaultServerConditions } from 'vite';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  resolve: {
    conditions: ['@app/source', ...defaultServerConditions],
  },
  ssr: {
    resolve: {
      conditions: ['@app/source', ...defaultServerConditions],
    },
  },
  test: {
    environment: 'node',
  },
});
