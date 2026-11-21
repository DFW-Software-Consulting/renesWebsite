# App architecture

Marketing site for a lawn-care business. React 19, React Router 8 (library mode), Vite 8, Tailwind CSS 4, `motion` for animation, `sonner` for toasts. The package name is `top-flight-lawn-services`. [README.md](../../README.md) is a stub.

## Rendering model

Every route is prerendered to static HTML at build time and hydrated on the client. There is no server runtime.

- `src/main.jsx`: client entry. If `#root` has children it preloads that route's lazy chunk (`pageFor` in `src/pages/index.js`) and calls `hydrateRoot`; otherwise `createRoot`.
- `src/entry-server.jsx`: SSR entry. Exports `render(url)` (preloads all pages, then `renderToString` inside `StaticRouter`) and re-exports `getPageMeta`, `renderHead`, `routes` and site data.
- `index.html`: template with `<!--app-head-->` and `<!--app-html-->` placeholders. `scripts/prerender.mjs` throws if either is missing.
- `src/App.jsx`: routes `/`, `/services`, `/services/:slug`, `/about`, `/contact`, and a not-found route. Pages other than Home are lazy (`src/lib/lazyPage.jsx`, `src/pages/index.js`).

## Content and SEO

- `src/data/site.js`: single source for business details, services, steps, testimonials, FAQs and nav links. Service pages are generated from the `services` array.
- `src/seo.js`: per-route title, description, canonical and JSON-LD. `routes` is built from the services list. Used at build time for the head and on the client by `applyHead` after navigation.
- `public/robots.txt` and `public/llms.txt` ship as-is. The sitemap is generated at build.

## Layout

`src/pages/` (route components), `src/components/` (shared UI), `src/components/home/` (home sections), `src/components/services/`, `src/lib/` (`hooks.js`, `motion.js`, `lazyPage.jsx`), `src/index.css` (Tailwind and theme).

## Gotchas

- Prerendered HTML must match the first client render or hydration warns. Browser-only values belong behind `useMounted` (`src/lib/hooks.js`).
- Motion entrance states hide content without JS; `index.html` has a `<noscript>` style block that restores it. Keep it when changing animations.
- Structured data must not contain `AggregateRating`, `Review` or `Rating` types (the SEO check fails the build on them).
