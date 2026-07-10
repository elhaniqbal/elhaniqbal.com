/**
 * Link integrity tests.
 *
 * Checks all internal navigation links resolve to 200 and key site resources
 * (resume PDF) are accessible. Media asset tests live in media.spec.ts.
 */
import { test, expect } from '@playwright/test';

const PAGES = ['/', '/blog', '/projects', '/contact'] as const;

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
// Contact page
// ---------------------------------------------------------------------------

test('contact page: loads with form and contact links', async ({ page }) => {
  await page.goto('/contact');
  await expect(page.getByRole('heading', { level: 1 })).toBeVisible();

  // The Web3Forms contact form is present with its required fields
  const form = page.locator('form.contact-form');
  await expect(form).toBeVisible();
  await expect(form).toHaveAttribute('action', 'https://api.web3forms.com/submit');
  await expect(form.locator('input[name="access_key"]')).toHaveCount(1);
  await expect(form.locator('input[name="name"]')).toBeVisible();
  await expect(form.locator('input[name="email"]')).toBeVisible();
  await expect(form.locator('textarea[name="message"]')).toBeVisible();
  await expect(form.getByRole('button', { name: /send/i })).toBeVisible();
});

test('contact form renders the hCaptcha widget', async ({ page }) => {
  await page.goto('/contact');
  // The Web3Forms loader injects an hCaptcha iframe into the .h-captcha div.
  // If this fails, check the loader script tag in contact.astro and the
  // script-src/frame-src allowances in public/_headers.
  await expect(page.locator('.h-captcha iframe')).toBeVisible({ timeout: 15_000 });
});

test('thanks page: loads after form redirect target', async ({ page }) => {
  await page.goto('/thanks');
  await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
});
