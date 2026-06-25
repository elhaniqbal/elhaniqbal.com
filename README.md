# Elhan Portfolio Site

A fast Astro portfolio + engineering blog designed for recruiter-friendly project storytelling.

## Run locally

```bash
npm install
npm run dev
```

Then open the local URL Astro prints, usually `http://localhost:4321`.

## Edit content

- Project case studies live in `src/content/projects/*.mdx`
- Blog posts live in `src/content/blog/*.mdx`
- Site-wide copy/config lives in `src/site.config.ts`
- Styling lives in `src/styles/global.css`
- Drop real images/videos into `public/media/` and update the `heroImage`, `gallery`, and `videoUrl` fields in each MDX file.

## Deploy

Cloudflare Pages, Netlify, or Vercel all work. Build command: `npm run build`. Output directory: `dist`.
