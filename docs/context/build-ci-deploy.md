# Build, CI and deploy

## Commands (package.json)

- `npm run dev`: Vite dev server (client only, no prerender).
- `npm run build`: three steps: client build, SSR build of `src/entry-server.jsx` into `dist-ssr`, then `node scripts/prerender.mjs`, which writes `dist/<route>.html`, `404.html` and `sitemap.xml` and deletes `dist-ssr`.
- `npm run lint`: ESLint (flat config in `eslint.config.js`).
- `npm run test:seo`: `scripts/check-seo.mjs` over `dist/` after a build.
- Node 22.22 or newer is required (`engines`, `.nvmrc`).

## SEO check

`scripts/check-seo.mjs` reads routes from the built sitemap and fails if any page lacks exactly one `<h1>`, a unique title, a meta description, an on-site canonical, an absolute `og:image`, or has invalid JSON-LD or banned review markup. It also requires `robots.txt`, `llms.txt` and a `noindex` `404.html`. When changing the site's public address, update `SITE_URL` in `src/data/site.js` and `SITE` in this script together.

## CI

`.github/workflows/ci.yml` runs on pull requests and pushes to `main`: `npm ci`, lint, build, `test:seo` on Node 22. A second job runs only on pull requests and audits the diff with the pinned `fallow` tool; `.fallowrc.json` ignores the `tailwindcss` dependency.

## Dependencies

`.github/dependabot.yml` opens weekly npm and Actions updates. Major bumps are ignored (do them by hand), ESLint packages are grouped, and minor/patch updates are grouped. `package.json` `overrides` pin `minimatch` under ESLint to resolve a security advisory; keep them when upgrading ESLint.

## Deploy

The hosting platform builds and serves the site from `main`. `vercel.json` sets clean URLs, no trailing slash, long-lived immutable caching for `/assets/`, a plain-text content type for `llms.txt`, and permanent redirects from the platform's default preview domain to the canonical domain. Prerender output gives unknown URLs a real 404 via `404.html`.
