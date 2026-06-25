/**
 * Link integrity tests.
 *
 * Checks all internal navigation links resolve to 200 and key site resources
 * (resume PDF) are accessible. Media asset tests live in media.spec.ts.
 */
import { test, expect } from '@playwright/test';

const PAGES = ['/', '/blog', '/projects', '/about'] as const;

// ---------------------------------------------------------------------------
// Internal links: no broken hrefs on main pages
// ---------------------------------------------------------------------------

for (const pagePath of PAGES) {
  test(`no broken internal links on ${pagePath}`, async ({ page }) => {
    await page.goto(pagePath);

    const hrefs: string[] = await page.evaluate(() =>
      Array.from(document.querySelectorAll<HTMLAnchorElement>('a[href]'))
        .map((a) => a.getAttribute('href') ?? '')
        .filter((h) => h.startsWith('/') && !h.startsWith('//')),
    );

    const broken: string[] = [];
    for (const href of [...new Set(hrefs)]) {
      const res = await page.request.get(href);
      if (!res.ok()) broken.push(`${href} -> ${res.status()}`);
    }

    expect(broken, `Broken links on ${pagePath}:\n${broken.join('\n')}`).toEqual([]);
  });
}

// ---------------------------------------------------------------------------
// Navigation
// ---------------------------------------------------------------------------

test('nav Resume link resolves to 200', async ({ page }) => {
  await page.goto('/');
  const resumeLink = page.getByRole('link', { name: 'Resume' }).first();
  await expect(resumeLink).toBeVisible();

  const href = await resumeLink.getAttribute('href');
  expect(href).toBeTruthy();
  const res = await page.request.get(href!);
  expect(res.status()).toBe(200);
});

test('header nav links all resolve without 404', async ({ page }) => {
  await page.goto('/');
  const navLinks = page.locator('nav a');
  const count = await navLinks.count();

  for (let i = 0; i < count; i++) {
    const href = await navLinks.nth(i).getAttribute('href');
    if (href && href.startsWith('/')) {
      const res = await page.request.get(href);
      expect.soft(res.status(), `nav link ${href}`).toBeLessThan(400);
    }
  }
});

// ---------------------------------------------------------------------------
// About page
// ---------------------------------------------------------------------------

test('about page: loads and contains contact info', async ({ page }) => {
  await page.goto('/about');
  await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
  // Contact section should have some link (email or LinkedIn or GitHub)
  const links = page.locator('.contact-list a');
  await expect(links.first()).toBeVisible();
});
