/**
 * Media asset tests.
 *
 * Automatically discovers every real file under public/media/ and verifies:
 *   1. The file is served at its expected URL (HTTP 200).
 *   2. The file is actually referenced by at least one page in the site
 *      (orphaned assets are caught immediately).
 *
 * Adding a new file to public/media/ adds it to both checks with zero test changes.
 */
import { test, expect } from '@playwright/test';
import { blogSlugs, projectSlugs, publicMediaFiles } from './fixtures';

const ALL_PAGES = [
  '/',
  '/blog',
  '/projects',
  '/about',
  ...blogSlugs.map((s) => `/blog/${s}`),
  ...projectSlugs.map((s) => `/projects/${s}`),
];

// ---------------------------------------------------------------------------
// 1. Every media file is served with HTTP 200
// ---------------------------------------------------------------------------

test('all public/media files return 200', async ({ page }) => {
  if (publicMediaFiles.length === 0) return; // nothing to check yet

  for (const mediaPath of publicMediaFiles) {
    const res = await page.request.get(mediaPath);
    expect.soft(res.status(), mediaPath).toBe(200);
  }
});

// ---------------------------------------------------------------------------
// 2. Every media file is referenced somewhere in the site
//    (catches orphaned assets that exist on disk but aren't used anywhere)
// ---------------------------------------------------------------------------

test('all public/media files are referenced by at least one page', async ({ page }) => {
  if (publicMediaFiles.length === 0) return;

  // Crawl every page and collect all attribute values that start with /media/
  const referenced = new Set<string>();
  const checkAttrs = ['src', 'href', 'poster', 'data-src'];

  for (const pagePath of ALL_PAGES) {
    await page.goto(pagePath);

    const refs: string[] = await page.evaluate((attrs: string[]) => {
      return attrs.flatMap((attr) =>
        Array.from(document.querySelectorAll<Element>(`[${attr}]`))
          .map((el) => el.getAttribute(attr) ?? ''),
      ).filter((s) => s.startsWith('/media/'));
    }, checkAttrs);

    refs.forEach((r) => referenced.add(r));
  }

  const orphaned = publicMediaFiles.filter((f) => !referenced.has(f));
  expect(
    orphaned,
    `These files exist in public/media but are not referenced by any page:\n${orphaned.join('\n')}`,
  ).toEqual([]);
});
