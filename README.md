# Elhan Portfolio Site

[![CI](https://github.com/e31iqbal/YOUR_REPO_NAME/actions/workflows/ci.yml/badge.svg)](https://github.com/e31iqbal/YOUR_REPO_NAME/actions/workflows/ci.yml)
[![Uptime](https://img.shields.io/uptimerobot/ratio/YOUR_MONITOR_ID?label=uptime&style=flat-square)](https://elhaniqbal.com)

> **CI badge** — replace `YOUR_REPO_NAME` with this repo's name on GitHub (e.g. `portfolio-site`).
> **Uptime badge** — after launch: sign up at [uptimerobot.com](https://uptimerobot.com), add an HTTPS monitor for `https://elhaniqbal.com`, copy the monitor ID (format: `m1234567`), and replace `YOUR_MONITOR_ID` above.

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
