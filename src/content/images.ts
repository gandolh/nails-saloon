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

export type ImageSource = "mock" | "real";

// Default = mockups. Override at build time without editing code:
//   PUBLIC_IMAGE_SOURCE=real npm run build
const envSource = import.meta.env.PUBLIC_IMAGE_SOURCE as string | undefined;
export const IMAGE_SOURCE: ImageSource = envSource === "real" ? "real" : "mock";

// File extension used for each source. Placeholders are SVG; real photos are
// expected as WebP (change here if you drop in .jpg/.avif instead).
const EXT: Record<ImageSource, string> = {
  mock: "svg",
  real: "webp",
};

// Resolve a logical image name to its public URL for the active source.
//   img("hero")        → "/images/hero.svg"        (mock)
//                      → "/images/real/hero.webp"  (real)
//   img("gallery-01")  → …
export function img(name: string): string {
  const ext = EXT[IMAGE_SOURCE];
  return IMAGE_SOURCE === "real"
    ? `/images/real/${name}.${ext}`
    : `/images/${name}.${ext}`;
}
