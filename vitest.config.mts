import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    // Unit tests are *.test.ts; Playwright owns e2e/*.spec.ts.
    include: ['**/*.test.{ts,tsx}'],
    exclude: ['**/node_modules/**', 'e2e/**'],
  },
});
