import type { Metadata } from "next";

// The canonical origin — feeds `metadataBase` (canonical + OG URLs),
// `sitemap.xml`, `robots.txt` and the redirect in next.config.ts.
//
// A *.vercel.app host may be named here ONLY because this one is verified to
// belong to this project. That namespace is global, and getting it wrong is not
// hypothetical: this file previously hardcoded henrique-dev.vercel.app, which is
// a live portfolio belonging to a different person, so every canonical link and
// sitemap entry pointed at their domain. Verify ownership before changing it.
//
// Not derived from VERCEL_PROJECT_PRODUCTION_URL: the project has more than one
// production alias and that variable resolves to the older generated one
// (see `legacyHosts`), which would put the wrong host in the sitemap.
const canonicalDomain = "https://henrique-neves.vercel.app";

// Set NEXT_PUBLIC_SITE_URL in Vercel when a custom domain lands — it overrides
// the constant above, so that migration needs no code change.
export const siteUrl = (
  process.env.NEXT_PUBLIC_SITE_URL ?? canonicalDomain
).replace(/\/+$/, "");

// Other hosts that serve this same deployment. They are 308-redirected to
// `siteUrl` (next.config.ts) so search engines see one copy of each page.
export const legacyHosts = ["portifolio-seven-eta-91.vercel.app"];

// Shown in the nav and as og:site_name. Deliberately NOT "henrique.dev": that
// domain is a live portfolio belonging to a different person — the same trap
// as the vercel.app host above. Only use a name this project actually owns.
export const siteName = "henrique-neves";

export const authorName = "Henrique Reis Neves";

export const githubUser = "NevesHenry";
export const githubUrl = `https://github.com/${githubUser}`;
export const linkedinUrl = "https://www.linkedin.com/in/henriquereisneves/";

export const defaultTitle = `${authorName} — Software Developer`;
export const defaultDescription =
  "Software developer focused on event-driven backends, full-stack apps, and cloud-native systems.";

export const ogImageSize = { width: 1200, height: 630 };

// Rendered by src/app/opengraph-image.tsx. Next attaches a file-based image
// only to its own segment and to children that set no `openGraph`; since every
// page here sets one, the image has to be named explicitly or nested pages
// lose their preview image.
const ogImage = {
  url: "/opengraph-image",
  ...ogImageSize,
  alt: defaultTitle,
  type: "image/png",
};

/**
 * Metadata for one page. Next merges metadata *shallowly*: a page that sets
 * only `title` inherits the root layout's entire `openGraph` object, so every
 * page used to share the home page's og:title, og:description and og:url.
 * Building each page's metadata here keeps <title>, the share card and the
 * canonical URL in agreement.
 *
 * Canonicals are per page on purpose — one set in the root layout would be
 * inherited by every route and point them all at "/".
 */
export function pageMetadata({
  title,
  description,
  path,
}: {
  /** Omit for the home page. Others get the "%s — name" template. */
  title?: string;
  description: string;
  path: string;
}): Metadata {
  return {
    title: title ?? { absolute: defaultTitle },
    description,
    alternates: { canonical: path },
    openGraph: {
      title: title ? `${title} — ${authorName}` : defaultTitle,
      description,
      url: path,
      siteName,
      locale: "en_US",
      type: "website",
      images: [ogImage],
    },
  };
}
