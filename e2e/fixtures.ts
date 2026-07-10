/**
 * Shared test fixtures.
 *
 * All content is discovered from the filesystem at test-collection time so
 * that adding a new .mdx file or dropping a media file into src/assets/media
 * automatically adds it to every relevant test -- no manual list maintenance.
 */
import { existsSync, readdirSync, statSync } from 'node:fs';
import { join, relative } from 'node:path';

const root = process.cwd();

function slugsFromDir(dir: string): string[] {
  return readdirSync(join(root, dir))
    .filter((f) => /\.mdx?$/.test(f))
    .map((f) => f.replace(/\.mdx?$/, ''));
}

function walkDir(absDir: string): string[] {
  if (!existsSync(absDir)) return [];
  const results: string[] = [];
  for (const entry of readdirSync(absDir)) {
    if (entry.startsWith('.')) continue; // skip .gitkeep, .DS_Store, etc.
    const full = join(absDir, entry);
    if (statSync(full).isDirectory()) {
      results.push(...walkDir(full));
    } else {
      results.push(full);
    }
  }
  return results;
}

/** All blog post slugs (published and draft -- we test pages exist, not visibility). */
export const blogSlugs = slugsFromDir('src/content/blog');

/** All project slugs. */
export const projectSlugs = slugsFromDir('src/content/projects');

/**
 * Every media file under src/assets/media as a path relative to src/,
 * with forward slashes (e.g. "assets/media/projects/foo/bar.png").
 * These go through the astro:assets pipeline, so tests check that each
 * file is imported/referenced by some source file rather than served at
 * a fixed URL. Dot-files (.gitkeep, .DS_Store) are excluded automatically.
 */
export const assetMediaFiles = walkDir(join(root, 'src', 'assets', 'media')).map(
  (f) => relative(join(root, 'src'), f).replace(/\\/g, '/'),
);

/** Every source file that can reference an asset (content, components, layouts, pages). */
export const sourceFiles = walkDir(join(root, 'src')).filter((f) =>
  /\.(mdx?|astro|ts)$/.test(f),
);
