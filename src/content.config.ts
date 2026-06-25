import { defineCollection} from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod'
const projects = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/projects' }),
  schema: z.object({
    title: z.string(),
    subtitle: z.string(),
    date: z.string(),
    lastUpdated: z.string().optional(),
    status: z.string(),
    featured: z.boolean().default(false),
    impact: z.array(z.string()),
    stack: z.array(z.string()),
    links: z.array(z.object({ label: z.string(), href: z.string() })).default([]),
    heroImage: z.string().optional(),
    videoUrl: z.string().optional()
  })
});

const blog = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/blog' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.string(),
    lastUpdated: z.string().optional(),
    tags: z.array(z.string()).default([]),
    draft: z.boolean().default(false)
  })
});

export const collections = { projects, blog };
