import type { CollectionEntry } from 'astro:content';

type Project = CollectionEntry<'projects'>;

// A project is "ongoing" when its status says so (e.g. "Personal project · ongoing").
const isOngoing = (p: Project) => /ongoing/i.test(p.data.status);

/**
 * Ordering for the projects listing and homepage showcase:
 *   1. ongoing projects always ahead of completed ones,
 *   2. then featured ahead of the rest,
 *   3. then newest by date.
 * Returns a new array; does not mutate the input.
 */
export function sortProjects(projects: Project[]): Project[] {
  return [...projects].sort((a, b) => {
    if (isOngoing(a) !== isOngoing(b)) return isOngoing(a) ? -1 : 1;
    if (a.data.featured !== b.data.featured) return a.data.featured ? -1 : 1;
    return a.data.date < b.data.date ? 1 : -1;
  });
}
