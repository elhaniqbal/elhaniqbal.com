/**
 * Visual regression tests.
 *
 * Screenshots are compared against committed baselines in e2e/__snapshots__/.
 * The terminal widget is masked out since it animates. CSS animations are
 * frozen so keyframe-based elements (ongoing badge pulse, cursor blink) don't
 * cause false differences.
 *
 * SETUP — generate baselines before the first commit:
 *   npx playwright test e2e/visual.spec.ts --update-snapshots
 *   git add e2e/__snapshots__ && git commit -m "chore: add visual baselines"
 *
 * UPDATE BASELINES after intentional visual changes:
 *   npx playwright test e2e/visual.spec.ts --update-snapshots
 *
 * These tests are excluded from CI (see testIgnore in playwright.config.ts)
 * because font rendering differs between Windows and Linux. Run them locally
 * before pushing to catch regressions.
 */
import { test, expect } from '@playwright/test';

const SCREENSHOT_OPTS = {
  fullPage: true,
  animations: 'disabled' as const,
};

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

/** Set theme via localStorage before the page's inline script runs. */
async function setTheme(page: import('@playwright/test').Page, theme: 'light' | 'dark') {
  await page.addInitScript((t: string) => localStorage.setItem('theme', t), theme);
}

/**
 * Wait for every eager image to finish loading and decoding. Screenshots
 * taken mid-decode capture a page without the image's final height, which
 * makes fullPage baselines flaky.
 */
async function waitForImages(page: import('@playwright/test').Page) {
  await page.evaluate(() =>
    Promise.all(
      Array.from(document.querySelectorAll('img'))
        .filter((img) => img.loading !== 'lazy')
        .map((img) => (img.complete ? img.decode().catch(() => {}) : new Promise((resolve) => {
          img.addEventListener('load', () => img.decode().then(resolve, resolve), { once: true });
          img.addEventListener('error', resolve, { once: true });
        }))),
    ),
  );
}

// ---------------------------------------------------------------------------
// Homepage — light + dark
// ---------------------------------------------------------------------------

test('visual: homepage (light)', async ({ page }) => {
  await setTheme(page, 'light');
  await page.goto('/');
  await waitForImages(page);
  await expect(page).toHaveScreenshot('homepage-light.png', {
    ...SCREENSHOT_OPTS,
    mask: [page.locator('.terminal')],
  });
});

test('visual: homepage (dark)', async ({ page }) => {
  await setTheme(page, 'dark');
  await page.goto('/');
  await waitForImages(page);
  await expect(page).toHaveScreenshot('homepage-dark.png', {
    ...SCREENSHOT_OPTS,
    mask: [page.locator('.terminal')],
  });
});

// ---------------------------------------------------------------------------
// Key pages
// ---------------------------------------------------------------------------

test('visual: projects index', async ({ page }) => {
  await setTheme(page, 'light');
  await page.goto('/projects');
  await waitForImages(page);
  await expect(page).toHaveScreenshot('projects.png', SCREENSHOT_OPTS);
});

test('visual: blog index', async ({ page }) => {
  await setTheme(page, 'light');
  await page.goto('/blog');
  await waitForImages(page);
  await expect(page).toHaveScreenshot('blog.png', SCREENSHOT_OPTS);
});

test('visual: CogniShield project page', async ({ page }) => {
  await setTheme(page, 'light');
  await page.goto('/projects/cognishield');
  await waitForImages(page);
  await expect(page).toHaveScreenshot('project-cognishield.png', SCREENSHOT_OPTS);
});

// ---------------------------------------------------------------------------
// Mobile (375px — matches most small phones)
// ---------------------------------------------------------------------------

test('visual: homepage (mobile)', async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 812 });
  await setTheme(page, 'light');
  await page.goto('/');
  await waitForImages(page);
  await expect(page).toHaveScreenshot('homepage-mobile.png', {
    ...SCREENSHOT_OPTS,
    mask: [page.locator('.terminal')],
  });
});
