import { defineConfig, devices } from '@playwright/test';

const port = 3100;
// Locally use IPv6 loopback: under WSL mirrored networking a closed IPv4 port
// hangs instead of refusing, which stalls Playwright's pre-start port check.
// CI containers may lack IPv6, so CI stays on IPv4.
const host = process.env.CI ? '127.0.0.1' : '::1';
const origin = `http://${host.includes(':') ? `[${host}]` : host}:${port}`;

export default defineConfig({
  testDir: './e2e',
  // Run against the production server: redirects and cache headers differ in dev.
  // Call the Next binary directly so no npm on PATH (e.g. a Windows one) is involved.
  webServer: {
    command: `node node_modules/next/dist/bin/next start --hostname ${host} --port ${port}`,
    url: `${origin}/tr`,
    reuseExistingServer: !process.env.CI,
    timeout: 60_000,
    stdout: 'pipe',
    stderr: 'pipe',
  },
  use: {
    baseURL: origin,
  },
  projects: [{ name: 'chromium', use: { ...devices['Desktop Chrome'] } }],
});
