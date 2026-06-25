import { defineConfig } from 'astro/config';
import expressiveCode from 'astro-expressive-code';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://elhaniqbal.com',

  // Clean canonical URLs: /about not /about/
  // Cloudflare Pages automatically 301-redirects the trailing-slash form.
  trailingSlash: 'never',

  // Hard-fail the build when two routes produce the same output URL.
  // Default is 'warn', which lets routing bugs reach production silently.
  prerenderConflictBehavior: 'error',

  // expressiveCode must come before mdx so it can process code blocks in .mdx files.
  // It outputs CSS classes (not inline styles), making it fully CSP-compatible.
  integrations: [
    expressiveCode({
      themes: ['github-light', 'github-dark'],
      // Map themes to the site's data-theme attribute so they switch with the toggle.
      themeCssSelector: (theme) => `[data-theme="${theme.type}"]`,
      // Don't auto-inject a dark mode media query — the site controls theme explicitly.
      useDarkModeMediaQuery: false,
    }),
    mdx(),
    sitemap(),
  ],

  build: {
    // Emit /about.html rather than /about/index.html — pairs with trailingSlash:'never'.
    format: 'file',
    // Inline stylesheets under ~4 kB (Vite's assetsInlineLimit); larger files
    // stay as external resources so the browser can cache them across pages.
    inlineStylesheets: 'auto',
  },

  // Prefetch all internal links on hover. The site is small enough that the
  // bandwidth cost is negligible and navigation feels instant.
  prefetch: {
    prefetchAll: true,
    defaultStrategy: 'hover',
  },

  // Turn off Astro's built-in Shiki highlighter — expressive-code above handles
  // all code blocks in both .md and .mdx files, so we don't need the default pipeline.
  // This also eliminates the Shiki/CSP incompatibility warning.
  markdown: {
    syntaxHighlight: false,
  },

  image: {
    // Sharp is the default service; listed explicitly so future changes are visible.
    service: { entrypoint: 'astro/assets/services/sharp' },
    // Reject remote image optimisation requests unless the domain is listed here.
    // Add entries when you embed images from a CDN or CMS.
    domains: [],
    remotePatterns: [],
  },

  // Security headers served by the dev and preview servers.
  // Production equivalents (plus HSTS) live in public/_headers for Cloudflare Pages.
  server: {
    headers: {
      'X-Frame-Options': 'DENY',
      'X-Content-Type-Options': 'nosniff',
      'Referrer-Policy': 'strict-origin-when-cross-origin',
      'Permissions-Policy': 'camera=(), microphone=(), geolocation=()',
    },
  },

  security: {
    // Astro computes a SHA-256 hash for every <script is:inline> and inline <style>
    // block at build time and injects a <meta http-equiv="Content-Security-Policy">
    // on each page. This eliminates 'unsafe-inline' without manual hash management.
    //
    // Important limitations of meta-tag CSP (vs an HTTP header):
    //   • frame-ancestors is silently ignored in <meta> tags — framing protection
    //     is handled by X-Frame-Options in public/_headers instead.
    //   • Only applies to HTML documents, not standalone .css/.js responses.
    //
    // Extending later:
    //   • Video embeds (YouTube/Vimeo): add "frame-src https://www.youtube.com"
    //   • External images: extend img-src with the source domain
    //   • Analytics/fonts from other CDNs: extend the relevant src directive
    csp: {
      algorithm: 'SHA-256',
      directives: [
        // Block everything not explicitly allowed below.
        "default-src 'none'",
        // Same-origin images and inline data: URIs (used by SVG/favicon).
        "img-src 'self' data:",
        // Google Fonts files are served from gstatic.com.
        "font-src 'self' https://fonts.gstatic.com",
        // No fetch/XHR/WebSocket — this site makes no API calls.
        "connect-src 'none'",
        // Prevent <base> tag injection attacks.
        "base-uri 'self'",
        // No form submissions off-origin (no forms exist, but belt-and-suspenders).
        "form-action 'self'",
        // Tell browsers to upgrade any accidental http:// sub-resource to https://.
        "upgrade-insecure-requests",
      ],
      styleDirective: {
        // 'self' covers Astro-bundled CSS in /_astro/.
        // googleapis.com serves the Google Fonts @import stylesheet.
        // Astro automatically appends hashes for all remaining inline <style> blocks.
        resources: ["'self'", 'https://fonts.googleapis.com'],
      },
      scriptDirective: {
        // 'self' covers Astro-bundled module scripts served from /_astro/.
        // Astro automatically appends hashes for all <script is:inline> blocks
        // (the FOUC-prevention theme read and the theme-toggle handler in BaseLayout).
        resources: ["'self'"],
      },
    },
  },
});
