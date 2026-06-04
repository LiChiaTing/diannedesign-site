# diannedesign.me

Personal portfolio site for Dianne Ting — product designer, photographer, AI collaborator.

## What it is

A bilingual (English / 繁體中文) portfolio built with [Astro](https://astro.build) and
Tailwind CSS, deployed on Vercel. Case studies live as Markdown content collections, and a
"Now" widget shows current status, updated via a scheduled GitHub Action.

## Tech stack

- **Astro 4** — static-first pages with a few server API routes
- **Tailwind CSS** — styling
- **Vercel** — hosting and serverless functions (`@astrojs/vercel`)
- **TypeScript** — config and API routes

## Project structure

```
src/
  components/      Reusable UI (home sections, layout: header/footer/base)
  content/work/    Case studies as Markdown (one file per project)
  pages/           Routes — work/, creative/, about, resume, contact, api/
  data/now.json    "Now" status data (drives the home Now widget)
  i18n/            English + 繁中 strings
  styles/          Global CSS
public/            Static assets served as-is (images, resume PDF)
scripts/           Build helpers (OG image, Spotify/Google auth)
_docs/             Internal notes & wireframes (gitignored, not published)
_assets/           Local design source files (gitignored, not published)
```

## How to run

```
npm install      # first time only
npm run dev      # local preview at http://localhost:4321
npm run build    # production build
npm run preview  # preview the production build
```

## Updating content

- **Add a case study**: create `src/content/work/<slug>.md` and a matching
  `src/pages/work/<slug>.astro`, with images under `public/images/projects/<slug>/`.
- **Update the Now widget**: edit `src/data/now.json` — this triggers a Vercel redeploy.

## Credits

Designed and maintained by Dianne Ting. Engineering assistance via Claude.
