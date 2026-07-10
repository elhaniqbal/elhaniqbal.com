import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './e2e',
  // Visual tests are skipped in CI: font rendering differs between Windows and
  // Linux, making cross-platform baseline comparison unreliable. Run locally
  // with --update-snapshots to regenerate baselines, then commit __snapshots__/.
  testIgnore: process.env.CI ? ['**/visual.spec.ts'] : [],
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'list',
  use: {
    // Port 4322, not 4321: the dev server defaults to 4321, and with
    // reuseExistingServer Playwright would silently test against `astro dev`
    // (dev toolbar, unoptimized output) instead of the production build.
    baseURL: 'http://localhost:4322',
    trace: 'on-first-retry',
    // Signals prefers-reduced-motion: reduce to every page. The terminal widget
    // on the homepage respects this and skips its setTimeout animation loop,
    // keeping the JS event loop free during tests and preventing race conditions
    // between the animation and click-event handlers in parallel test runs.
    contextOptions: { reducedMotion: 'reduce' },
  },
  expect: {
    toHaveScreenshot: {
      maxDiffPixelRatio: 0.05,
    },
  },
  snapshotDir: './e2e/__snapshots__',
  snapshotPathTemplate: '{snapshotDir}/{testFilePath}/{arg}-{browserName}{ext}',
  projects: [
    { name: 'chromium', use: { ...devices['Desktop Chrome'] } },
  ],
  webServer: {
    command: 'npm run build && npm run preview -- --port 4322',
    url: 'http://localhost:4322',
    reuseExistingServer: !process.env.CI,
    // The build encodes ~100 responsive AVIF variants; on CI's 2-core runners
    // that alone can take several minutes, so 180s starves the webServer.
    timeout: 600_000,
  },
});
