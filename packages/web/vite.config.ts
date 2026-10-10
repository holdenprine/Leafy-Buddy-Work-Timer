import react from '@vitejs/plugin-react';
import { defaultClientConditions, defaultServerConditions } from 'vite';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  plugins: [react()],
  resolve: {
    conditions: ['@app/source', ...defaultClientConditions],
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
