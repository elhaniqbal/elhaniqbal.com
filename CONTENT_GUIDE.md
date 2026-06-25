# Content Guide

How this site works and how to add new content without touching any code.

---

## How the site is built

This is an [Astro](https://astro.build/) static site. Pages are pre-rendered at build time into plain HTML files. The only runtime JavaScript is the theme toggle and the terminal animation on the homepage.

Content (blog posts, project case studies) lives in **MDX files** inside `src/content/`. Astro's Content Layer automatically picks up every file there using a `glob()` loader, so **adding content is just creating a file** -- no config changes, no imports to update.

---

## What is an MDX file?

MDX is Markdown with optional JSX components mixed in. The top of each file has a **frontmatter block** (between the `---` lines) that holds structured metadata. Everything below is the body of the page, written in Markdown.

```
---
title: 'My Post Title'       <- frontmatter (structured data)
date: '2026-06-01'
---

## This is the body           <- plain Markdown from here down
```

---

## What is a slug?

A **slug** is the URL-safe identifier for a piece of content. It is derived automatically from the filename:

```
src/content/blog/how-i-think-about-iam.mdx   ->   /blog/how-i-think-about-iam
src/content/projects/haven-shop-assistant.mdx ->   /projects/haven-shop-assistant
```

Rules:
- Use lowercase letters, numbers, and hyphens only.
- No spaces, no underscores, no dots.
- The slug is computed as `entry.id.replace(/\.mdx?$/, '')` at build time.

---

## What are props?

In Astro components (`.astro` files), **props** are the data passed into a component from its parent, similar to function arguments. For content pages, the `frontmatter` object from the MDX file is passed as props to the layout:

```astro
<!-- In BlogLayout.astro -->
const { frontmatter } = Astro.props;
// frontmatter.title, frontmatter.date, etc. are now available
```

For components like `ProjectCard.astro`:
```astro
<!-- In ProjectCard.astro -->
const { project } = Astro.props;
// project.data.title, project.data.stack, etc.
```

The `project.data` object matches exactly the frontmatter schema defined in `src/content.config.ts`.

---

## Adding a new blog post

1. Create a file: `src/content/blog/your-post-title.mdx`
2. Add the required frontmatter:

```mdx
---
title: 'Your Post Title'
description: 'One sentence about what this covers.'
date: '2026-07-01'
tags: ['Tag1', 'Tag2']
draft: false
---

Write your post here in Markdown.
```

3. Done. The post will appear on `/blog` and is accessible at `/blog/your-post-title`.

**To keep a post hidden while drafting:** set `draft: true`. It will not appear on the index but the URL still exists.

**Frontmatter fields:**

| Field | Type | Required | Notes |
|---|---|---|---|
| `title` | string | yes | Shown as the page heading |
| `description` | string | yes | Shown as subtitle and in `<meta>` tags |
| `date` | string | yes | Format: `YYYY-MM-DD` |
| `tags` | string[] | no | Shown as tag pills on the card |
| `draft` | boolean | no | Default `false`. Set `true` to hide from index |
| `lastUpdated` | string | no | Optional update date, shown separately |

---

## Adding a new project

1. Create a file: `src/content/projects/my-project.mdx`
2. Add the required frontmatter:

```mdx
---
title: 'My Project'
subtitle: 'One or two sentences. Shown on the card and as the page subtitle.'
date: '2026'
status: 'Personal · some label'
featured: false
impact:
  - 'First key result or capability -- shown as a bullet on the project card.'
  - 'Second key result.'
stack: ['Python', 'FastAPI', 'Docker']
links:
  - label: 'GitHub'
    href: 'https://github.com/elhaniqbal/my-project'
heroImage: ''
videoUrl: ''
---

Write the case study here in Markdown.
```

3. Done. The project appears on `/projects` and is accessible at `/projects/my-project`.

**To feature a project on the homepage:** set `featured: true`. The homepage shows the top 3 projects sorted by `featured: true` first, then by date descending. If more than 3 are featured, only the 3 most recent appear on the homepage (all still appear on `/projects`).

**Frontmatter fields:**

| Field | Type | Required | Notes |
|---|---|---|---|
| `title` | string | yes | |
| `subtitle` | string | yes | One or two sentences, shown on the card |
| `date` | string | yes | Year string, e.g. `'2026'` |
| `status` | string | yes | Shown as the category label, e.g. `'Co-op · infrastructure'` |
| `featured` | boolean | no | Default `false`. Set `true` to appear on homepage |
| `impact` | string[] | yes | Bullet points shown on the card (first 2) and project page |
| `stack` | string[] | yes | Tech tags shown on the card (first 5) and project page |
| `links` | `{label, href}[]` | no | External links (GitHub, demo, etc.) |
| `heroImage` | string | no | Currently unused in rendering |
| `videoUrl` | string | no | If set, embeds a video iframe on the project page |
| `lastUpdated` | string | no | Optional date string |

---

## Where to put media files

Put media in `public/media/<collection>/<slug>/`:

```
public/media/blog/my-post-slug/image.png
public/media/projects/my-project/demo.mp4
```

Reference them in MDX with a root-relative path:

```mdx
![Alt text](/media/projects/my-project/demo.mp4)

<video src="/media/projects/my-project/demo.mp4" controls muted playsinline />
```

Files in `public/` are served directly at their path with no processing.

---

## Site configuration

Global site metadata (name, email, GitHub URL, resume path, SEO keywords) lives in `src/site.config.ts`. Update it there -- every page that needs it imports from that single file.

---

## Running the site locally

```bash
npm run dev       # dev server with hot reload at localhost:4321
npm run build     # production build into dist/
npm run preview   # serve the production build locally
```

## Running tests

```bash
npm run test:e2e          # build + run all Playwright tests
npm run test:e2e:ui       # same, but with the interactive Playwright UI
```

Tests auto-discover all `.mdx` files -- no manual updates needed when you add content.

---

## Content schema

The schema for each collection is defined in `src/content.config.ts` using Zod. If you add a new frontmatter field that you want to use in templates, add it to the schema there. If you get a build error about a missing required field, the schema is what to check.

---

## Layouts

| File | Used for |
|---|---|
| `src/layouts/BaseLayout.astro` | Every page (header, footer, theme toggle) |
| `src/layouts/BlogLayout.astro` | Individual blog post pages |
| `src/layouts/ProjectLayout.astro` | Individual project pages |

Blog posts reference their layout via the `layout` frontmatter key (set automatically by the `[slug].astro` page). Project pages work the same way.

---

## Adding a page that isn't content

For one-off pages (like `/about`), create `src/pages/about.astro`. It will be available at `/about`. Use `BaseLayout` as the wrapper and follow the same `.container` / `.page-intro` / `.section` class conventions used by other pages.
