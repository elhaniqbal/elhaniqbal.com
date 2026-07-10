/**
 * Media asset tests.
 *
 * Media lives in src/assets/media and is served through the astro:assets
 * pipeline (hashed /_astro/ URLs), so the tests verify:
 *   1. Every file in src/assets/media is referenced by at least one source
 *      file (orphaned assets are caught immediately).
 *   2. Every <img> URL rendered on any page (src and srcset) returns HTTP 200.
 *   3. No page references the retired /media/ public directory.
 *
 * Adding a new file to src/assets/media adds it to the orphan check, and any
 * page that renders it adds its URLs to the 200 check -- zero test changes.
 */
import { readFileSync } from 'node:fs';
import { test, expect } from '@playwright/test';
import { assetMediaFiles, blogSlugs, projectSlugs, sourceFiles } from './fixtures';

const ALL_PAGES = [
  '/',
  '/blog',
  '/projects',
  '/contact',
  ...blogSlugs.map((s) => `/blog/${s}`),
  ...projectSlugs.map((s) => `/projects/${s}`),
];

// ---------------------------------------------------------------------------
// 1. Every asset file is referenced by at least one source file
//    (catches orphaned assets that exist on disk but aren't used anywhere)
// ---------------------------------------------------------------------------

test('all src/assets/media files are referenced by at least one source file', () => {
  if (assetMediaFiles.length === 0) return;

  const allSource = sourceFiles.map((f) => readFileSync(f, 'utf8')).join('\n');
  const orphaned = assetMediaFiles.filter((f) => !allSource.includes(f));
  expect(
    orphaned,
    `These files exist in src/assets/media but are not referenced by any source file:\n${orphaned.join('\n')}`,
  ).toEqual([]);
});

// ---------------------------------------------------------------------------
// 2. Every rendered image URL (src + srcset) returns HTTP 200,
//    and no page still points at the retired /media/ directory
// ---------------------------------------------------------------------------

test('all rendered image URLs return 200 and /media/ is gone', async ({ page }) => {
  const imageUrls = new Set<string>();
  const legacyRefs: string[] = [];

  for (const pagePath of ALL_PAGES) {
    // domcontentloaded: this test only reads attributes from the DOM, so
    // there's no need to wait for images/fonts/embeds on all ~11 pages.
    await page.goto(pagePath, { waitUntil: 'domcontentloaded' });

    const { urls, legacy } = await page.evaluate(() => {
      const urls: string[] = [];
      const legacy: string[] = [];
      for (const img of Array.from(document.querySelectorAll('img'))) {
        const src = img.getAttribute('src') ?? '';
        if (src) urls.push(src);
        const srcset = img.getAttribute('srcset') ?? '';
        for (const candidate of srcset.split(',')) {
          const url = candidate.trim().split(/\s+/)[0];
          if (url) urls.push(url);
        }
      }
      for (const el of Array.from(document.querySelectorAll('[src], [href], [poster]'))) {
        for (const attr of ['src', 'href', 'poster']) {
          const v = el.getAttribute(attr);
          if (v && v.startsWith('/media/')) legacy.push(v);
        }
      }
      return { urls, legacy };
    });

    urls.filter((u) => u.startsWith('/')).forEach((u) => imageUrls.add(u));
    legacyRefs.push(...legacy.map((l) => `${pagePath}: ${l}`));
  }

  expect(legacyRefs, `Pages still reference /media/:\n${legacyRefs.join('\n')}`).toEqual([]);
  expect(imageUrls.size, 'expected at least one rendered image across the site').toBeGreaterThan(0);

  for (const url of imageUrls) {
    const res = await page.request.get(url);
    expect.soft(res.status(), url).toBe(200);
  }
});
