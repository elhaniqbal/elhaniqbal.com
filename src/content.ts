/**
 * Edit this file to customize your portfolio.
 *
 * - Put your CV PDF at: `public/assets/cv.pdf`
 * - Update `cvUrl` below if you prefer a different path.
 */

export const siteContent = {
  name: 'YOUR NAME',
  role: 'FULL-STACK / INFRA / EMBEDDED',
  location: 'Vancouver, BC',

  // GitHub Pages friendly: keep this a relative URL that points into /public
  cvUrl: './assets/cv.pdf',

  links: {
    github: 'https://github.com/YOUR_GITHUB',
    linkedin: 'https://www.linkedin.com/in/YOUR_LINKEDIN',
    email: 'mailto:you@example.com',
  },
} as const;
