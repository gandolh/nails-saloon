// Single switch for where images load from.
//
//   "mock" (default) → committed SVG placeholders in  public/images/<name>.svg
//   "real"           → git-ignored real photos in     public/images/real/<name>.<ext>
//
// Components/data reference images by their logical base name (e.g. "hero",
// "gallery-01") via `img()`, so switching sources never requires editing paths
// across the codebase — just flip this constant (or set PUBLIC_IMAGE_SOURCE).
//
// Subcort is a DEMO site: it ships the illustrative SVG mockups by default.
// There are no real photos (see public/images/real/README.md).

import { withBase } from "./url";

export type ImageSource = "mock" | "real";

// Default = mockups. Override at build time without editing code:
//   PUBLIC_IMAGE_SOURCE=real npm run build
const envSource = import.meta.env.PUBLIC_IMAGE_SOURCE as string | undefined;
export const IMAGE_SOURCE: ImageSource = envSource === "real" ? "real" : "mock";

// File extension used for each source. Placeholders are SVG; real photos JPEG.
const EXT: Record<ImageSource, string> = {
  mock: "svg",
  real: "jpeg",
};

// Logical names that actually have a real photo in public/images/real/.
// Empty for now (demo) — add a name here once a matching real file is dropped
// in, so `real` builds use it while everything else falls back to the SVG mock.
const HAS_REAL = new Set<string>([]);

// Resolve a logical image name to its public URL.
//   img("hero") → "/images/hero.svg"  (mock, or real fallback when no real file)
export function img(name: string): string {
  if (IMAGE_SOURCE === "real" && HAS_REAL.has(name)) {
    return withBase(`/images/real/${name}.${EXT.real}`);
  }
  return withBase(`/images/${name}.${EXT.mock}`);
}
