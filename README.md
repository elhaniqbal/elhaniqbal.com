
# Portfolio Site (Vite + React)

This repo is set up to be **dead simple to customize** and deploy to **GitHub Pages**.

## Customize

1) Update text/links in:
- `src/content.ts`

2) Add your CV PDF:
- put your file at: `public/assets/cv.pdf`
- the "Download CV" button uses `siteContent.cvUrl` (default: `./assets/cv.pdf`)

## Run locally

```bash
npm install
npm run dev
```

Open: `http://localhost:5173`

## Deploy to GitHub Pages

This repo includes a GitHub Actions workflow:
- `.github/workflows/deploy.yml`

Steps:
1) Push this repo to GitHub
2) In your GitHub repo: **Settings → Pages**
3) Under **Build and deployment**, select **GitHub Actions**
4) Push to the `main` branch → it builds and deploys automatically

If you use a custom domain, you can add it in GitHub Pages settings.
  