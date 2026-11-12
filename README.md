# Henrique Reis Neves — portfolio

Personal site: who I am, where I've worked, and case studies of the projects I
build. Live at **[henrique-neves.vercel.app](https://henrique-neves.vercel.app/)**.

Built with Next.js 16 (App Router), React 19, TypeScript and Tailwind CSS 4.
Every route is prerendered at build time.

## Running it

```bash
npm install
npm run dev        # http://localhost:3000
```

| Script              | What it does                                              |
| ------------------- | --------------------------------------------------------- |
| `npm run dev`       | Development server                                        |
| `npm run build`     | Production build (also type-checks)                       |
| `npm run start`     | Serve the production build                                |
| `npm run lint`      | ESLint                                                    |
| `npm run typecheck` | Generate route types, then `tsc --noEmit` without a build |

## Layout

```
src/
  app/                  routes: /, /about, /experience, /projects, /contact
    projects/[slug]/    one case study per project
    opengraph-image.tsx share-card image, rendered at build time
    sitemap.ts robots.ts not-found.tsx
  components/           Nav, Footer, ProjectCard, Tag, StatusFlag, …
  lib/
    site.ts             canonical URL, site name, links, per-page metadata helper
    projects.ts         project + case-study content (typed)
resume/resume.html      source of public/resume.pdf
```

Adding a project means adding one entry to `src/lib/projects.ts`; the card, the
case-study page and the sitemap entry all come from it.

## Metadata and domains

- The canonical origin lives in `src/lib/site.ts`. Set `NEXT_PUBLIC_SITE_URL`
  in Vercel to move to a custom domain without a code change.
- Every page builds its metadata with `pageMetadata()`, which sets the title,
  the canonical URL and a complete Open Graph block. Next merges metadata
  shallowly, so a page that sets only a title would inherit the home page's
  share card.
- The older generated alias (`legacyHosts` in `site.ts`) is 308-redirected to
  the canonical origin by `next.config.ts`.

## Résumé

`public/resume.pdf` is generated from `resume/resume.html`. After editing the
HTML, regenerate the PDF with any Chromium-based browser:

```bash
google-chrome --headless --no-pdf-header-footer --virtual-time-budget=10000 \
  --print-to-pdf=public/resume.pdf "file://$PWD/resume/resume.html"
```

(`chromium` works the same way; `--virtual-time-budget` gives the web fonts
time to load.) Or open the HTML in Chrome and use Print → Save as PDF with
margins set to "Default" and headers/footers off.

## Deployment

Deployed on Vercel from `master`; every push to another branch gets a preview
deployment.
