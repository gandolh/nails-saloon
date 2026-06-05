// Prefix a root-relative path with Astro's configured `base` so links and
// public/ assets resolve correctly when the site is served under a sub-path
// (e.g. http://HOST/auto-service). For local dev (base "/") this is a no-op.
//
// Use for hand-written internal links and public/ asset references:
//   withBase("/")            → "/auto-service/"            (build) | "/" (dev)
//   withBase("/termeni/")    → "/auto-service/termeni/"
//   withBase("/favicon.svg") → "/auto-service/favicon.svg"
//
// Astro already prefixes bundled assets (imported CSS/JS) automatically — this
// is only needed for paths written by hand or built as plain strings.
export function withBase(path: string): string {
  const base = import.meta.env.BASE_URL; // trailing slash, e.g. "/auto-service/" or "/"
  const clean = path.startsWith("/") ? path.slice(1) : path;
  return base.endsWith("/") ? `${base}${clean}` : `${base}/${clean}`;
}
