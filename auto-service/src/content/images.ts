// Single switch for where images load from.
//
//   "mock" (default) → committed SVG placeholders in  public/images/<name>.svg
//   "real"           → git-ignored real photos in     public/images/real/<name>.<ext>
//
// Components/data reference images by their logical base name (e.g. "hero",
// "gallery-01") via `img()`, so switching sources never requires editing paths
// or extensions across the codebase — just flip this constant (or set the
// PUBLIC_IMAGE_SOURCE env var at build time).
//
// Real photos are published on the live site; this only keeps them out of Git.
// See public/images/real/README.md.

import { withBase } from "./url";

export type ImageSource = "mock" | "real";

// Default = mockups. Override at build time without editing code:
//   PUBLIC_IMAGE_SOURCE=real npm run build
const envSource = import.meta.env.PUBLIC_IMAGE_SOURCE as string | undefined;
export const IMAGE_SOURCE: ImageSource = envSource === "real" ? "real" : "mock";

// File extension used for each source. Placeholders are SVG; real photos are
// the garage's JPEGs (change here if you drop in .webp/.avif instead).
const EXT: Record<ImageSource, string> = {
  mock: "svg",
  real: "jpeg",
};

// Logical names that actually have a real photo in public/images/real/.
// When IMAGE_SOURCE = "real", only these resolve to the real file; every other
// name falls back to its committed SVG mock so nothing 404s. Add a name here
// once you drop the matching real file in (e.g. "hero", "gallery-07").
const HAS_REAL = new Set<string>([
  "hero",
  "atelier",
  "gallery-01",
  "gallery-02",
  "gallery-03",
  "gallery-04",
  "gallery-05",
  "gallery-06",
]);

// Resolve a logical image name to its public URL.
//   img("gallery-01") → "/images/real/gallery-01.jpeg"  (real source, has photo)
//   img("hero")       → "/images/hero.svg"              (real source, no photo → mock fallback)
//                     → "/images/hero.svg"              (mock source)
export function img(name: string): string {
  if (IMAGE_SOURCE === "real" && HAS_REAL.has(name)) {
    return withBase(`/images/real/${name}.${EXT.real}`);
  }
  return withBase(`/images/${name}.${EXT.mock}`);
}
