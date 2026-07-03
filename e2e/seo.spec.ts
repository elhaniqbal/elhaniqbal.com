/**
 * Site integrity tests.
 *
 * Covers SEO meta requirements on every page, infrastructure (404, sitemap,
 * robots.txt), the dark-mode toggle, and the ongoing badge. All pages are
 * discovered from the filesystem so adding a new MDX file extends coverage
 * automatically.
 */
import { test, expect } from '@playwright/test';
import { blogSlugs, projectSlugs } from './fixtures';

const ALL_PAGES = [
  '/',
  '/blog',
  '/projects',
  '/about',
  ...blogSlugs.map((s) => `/blog/${s}`),
  ...projectSlugs.map((s) => `/projects/${s}`),
];

// ---------------------------------------------------------------------------
// SEO: title, description, canonical, og:title on every page
// ---------------------------------------------------------------------------

for (const pagePath of ALL_PAGES) {
  test(`seo: ${pagePath}`, async ({ page }) => {
    await page.goto(pagePath);

    const title = await page.title();
    expect.soft(title, 'title non-empty').toBeTruthy();
    expect.soft(title, 'title contains site name').toContain('Elhan Iqbal');

    const desc = await page.locator('meta[name="description"]').getAttribute('content');
    expect.soft(desc, 'meta description present').toBeTruthy();
    expect.soft(desc?.length ?? 0, 'meta description > 10 chars').toBeGreaterThan(10);

    const canonical = await page.locator('link[rel="canonical"]').getAttribute('href');
    expect.soft(canonical, 'canonical link present').toBeTruthy();

    const ogTitle = await page.locator('meta[property="og:title"]').getAttribute('content');
    expect.soft(ogTitle, 'og:title present').toBeTruthy();
  });
}

// ---------------------------------------------------------------------------
// 404 page
// ---------------------------------------------------------------------------

test('404: unknown route shows not-found content and home link', async ({ page }) => {
  await page.goto('/this-route-does-not-exist');
  await expect(page.locator('.not-found')).toBeVisible();
  await expect(page.getByRole('link', { name: /go home/i })).toBeVisible();
});

// ---------------------------------------------------------------------------
// Sitemap + robots.txt
// ---------------------------------------------------------------------------

test('sitemap-index.xml: returns 200 and is a sitemapindex document', async ({ page }) => {
  const res = await page.request.get('/sitemap-index.xml');
  expect(res.status()).toBe(200);
  expect(await res.text()).toContain('<sitemapindex');
});

test('robots.txt: returns 200 and contains Allow directive', async ({ page }) => {
  const res = await page.request.get('/robots.txt');
  expect(res.status()).toBe(200);
  expect(await res.text()).toContain('Allow: /');
});

// ---------------------------------------------------------------------------
// Dark mode toggle
// ---------------------------------------------------------------------------

test('dark mode: theme toggle switches data-theme between light and dark', async ({ page }) => {
  await page.goto('/');

  // Force a known starting state regardless of system preference
  await page.evaluate(() => {
    localStorage.setItem('theme', 'light');
    document.documentElement.dataset.theme = 'light';
  });

  const html = page.locator('html');
  await expect(html).toHaveAttribute('data-theme', 'light');

  await page.click('#theme-toggle');
  await expect(html).toHaveAttribute('data-theme', 'dark');

  await page.click('#theme-toggle');
  await expect(html).toHaveAttribute('data-theme', 'light');
});

// ---------------------------------------------------------------------------
// Ongoing badge (CogniShield)
// ---------------------------------------------------------------------------

test('ongoing badge: visible on CogniShield card in project grid', async ({ page }) => {
  await page.goto('/projects');
  const card = page.locator('.project-card').filter({ hasText: 'CogniShield' });
  await expect(card.locator('.ongoing-badge')).toBeVisible();
});

test('ongoing badge: visible on CogniShield project detail page', async ({ page }) => {
  await page.goto('/projects/cognishield');
  await expect(page.locator('.ongoing-badge')).toBeVisible();
});
