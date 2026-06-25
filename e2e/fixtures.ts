/**
 * Shared test fixtures.
 *
 * All content is discovered from the filesystem at test-collection time so
 * that adding a new .mdx file or dropping a media file into public/media
 * automatically adds it to every relevant test -- no manual list maintenance.
 */
import { existsSync, readdirSync, statSync } from 'node:fs';
import { join } from 'node:path';

const root = process.cwd();

function slugsFromDir(dir: string): string[] {
  return readdirSync(join(root, dir))
    .filter((f) => /\.mdx?$/.test(f))
    .map((f) => f.replace(/\.mdx?$/, ''));
}

function walkPublic(absDir: string, publicRoot: string): string[] {
  if (!existsSync(absDir)) return [];
  const results: string[] = [];
  for (const entry of readdirSync(absDir)) {
    if (entry.startsWith('.')) continue; // skip .gitkeep, .DS_Store, etc.
    const full = join(absDir, entry);
    if (statSync(full).isDirectory()) {
      results.push(...walkPublic(full, publicRoot));
    } else {
      results.push(full.replace(publicRoot, '').replace(/\\/g, '/'));
    }
  }
  return results;
}

/** All blog post slugs (published and draft -- we test pages exist, not visibility). */
export const blogSlugs = slugsFromDir('src/content/blog');

/** All project slugs. */
export const projectSlugs = slugsFromDir('src/content/projects');

/**
 * Every real file under public/media/ as a root-relative URL path.
 * Dot-files (.gitkeep, .DS_Store) are excluded automatically.
 * Dropping a new media file here automatically adds it to media tests.
 */
export const publicMediaFiles = walkPublic(
  join(root, 'public', 'media'),
  join(root, 'public'),
);
