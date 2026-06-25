/**
 * Content coverage tests.
 *
 * Verifies that every MDX file in the content directories is reachable and
 * that index pages reflect the correct number of entries. Content lists are
 * discovered from the filesystem -- adding a new .mdx file automatically
 * extends coverage without editing this file.
 */
import { test, expect } from '@playwright/test';
import { blogSlugs, projectSlugs } from './fixtures';

// ---------------------------------------------------------------------------
// Blog index
// ---------------------------------------------------------------------------

test('blog index: page loads with correct heading', async ({ page }) => {
  await page.goto('/blog');
  await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
});

test(`blog index: lists ${blogSlugs.length} posts (matches MDX file count)`, async ({ page }) => {
  await page.goto('/blog');
  // .blog-entry covers both the list layout (index page) and card layout (homepage)
  const entries = page.locator('.blog-entry, .blog-card');
  await expect(entries).toHaveCount(blogSlugs.length);
});

for (const slug of blogSlugs) {
  test(`blog/${slug}: page renders with h1`, async ({ page }) => {
    const res = await page.goto(`/blog/${slug}`);
    expect.soft(res?.status(), `${slug} HTTP status`).toBe(200);
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
  });
}

// ---------------------------------------------------------------------------
// Projects index
// ---------------------------------------------------------------------------

test('projects index: page loads with correct heading', async ({ page }) => {
  await page.goto('/projects');
  await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
});

test(`projects index: lists ${projectSlugs.length} projects (matches MDX file count)`, async ({
  page,
}) => {
  await page.goto('/projects');
  const cards = page.locator('.project-card');
  await expect(cards).toHaveCount(projectSlugs.length);
});

for (const slug of projectSlugs) {
  test(`projects/${slug}: page renders with h1`, async ({ page }) => {
    const res = await page.goto(`/projects/${slug}`);
    expect.soft(res?.status(), `${slug} HTTP status`).toBe(200);
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
  });
}

// ---------------------------------------------------------------------------
// Homepage
// ---------------------------------------------------------------------------

test('homepage: loads with hero heading', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
});

test('homepage: project showcase section exists and has at least one card', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('.project-card').first()).toBeVisible();
});

test('homepage: experience timeline has exactly 6 work entries', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('.tl-item')).toHaveCount(6);
});

test('homepage: Samsung appears in experience timeline', async ({ page }) => {
  await page.goto('/');
  const timeline = page.locator('.timeline');
  await expect(timeline.getByText('Samsung', { exact: false }).first()).toBeVisible();
});

test('homepage: recent blog posts section exists', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('.blog-card').first()).toBeVisible();
});
