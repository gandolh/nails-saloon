// Generates SVG placeholders for the hero, gallery, and OG image.
// Industrial graphite gradients in the brand palette, with a thin BMW-"M"
// motorsport stripe motif and a small label. Replace with real workshop photos
// later (see public/images/real/README.md).
//
//   node scripts/gen-placeholders.mjs
import { writeFile, mkdir } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const outDir = join(__dirname, "..", "public", "images");

// M-stripe colours (light blue → indigo → red) + graphite base.
const M_BLUE = "#2e9ee3";
const M_INDIGO = "#3a2d7a";
const M_RED = "#e2231a";
const GRAPHITE_FROM = "#141d2b";
const GRAPHITE_TO = "#243348";
const INK = "#e6edf5";

function svg({ width, height, label }) {
  const stripeH = Math.max(6, Math.round(height * 0.02));
  const third = width / 3;
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}" width="${width}" height="${height}">
  <defs>
    <linearGradient id="g" gradientTransform="rotate(120)">
      <stop offset="0%" stop-color="${GRAPHITE_FROM}"/>
      <stop offset="100%" stop-color="${GRAPHITE_TO}"/>
    </linearGradient>
  </defs>
  <rect width="${width}" height="${height}" fill="url(#g)"/>
  <g opacity="0.07" stroke="${INK}" stroke-width="1">
    ${Array.from({ length: Math.ceil(width / 48) }, (_, i) => `<line x1="${i * 48}" y1="0" x2="${i * 48}" y2="${height}"/>`).join("")}
    ${Array.from({ length: Math.ceil(height / 48) }, (_, i) => `<line x1="0" y1="${i * 48}" x2="${width}" y2="${i * 48}"/>`).join("")}
  </g>
  <g>
    <rect x="0" y="0" width="${third}" height="${stripeH}" fill="${M_BLUE}"/>
    <rect x="${third}" y="0" width="${third}" height="${stripeH}" fill="${M_INDIGO}"/>
    <rect x="${third * 2}" y="0" width="${third}" height="${stripeH}" fill="${M_RED}"/>
  </g>
  <g font-family="Arial, Helvetica, sans-serif" fill="${INK}">
    <text x="50%" y="50%" text-anchor="middle" dominant-baseline="middle" font-size="${Math.round(Math.min(width, height) * 0.06)}" font-weight="700" opacity="0.55">${label}</text>
  </g>
</svg>`;
}

async function main() {
  await mkdir(outDir, { recursive: true });

  // Hero (wide)
  await writeFile(join(outDir, "hero.svg"), svg({ width: 1600, height: 1000, label: "Foto atelier" }));

  // OG / social preview (1200×630)
  await writeFile(join(outDir, "og-image.svg"), svg({ width: 1200, height: 630, label: "BavAuto Gorj · Service BMW" }));

  // Gallery (6 images), first is the large feature tile.
  const labels = [
    "BMW pe elevator",
    "Diagnoză",
    "Distribuție",
    "Frânare",
    "Detaliu motor",
    "Echipa",
  ];
  const sizes = [
    [1200, 900],
    [800, 600],
    [800, 600],
    [800, 600],
    [800, 600],
    [800, 600],
  ];
  for (let i = 0; i < labels.length; i++) {
    const [w, h] = sizes[i];
    await writeFile(
      join(outDir, `gallery-0${i + 1}.svg`),
      svg({ width: w, height: h, label: labels[i] }),
    );
  }

  // 'atelier' alias used by images.ts HAS_REAL list.
  await writeFile(join(outDir, "atelier.svg"), svg({ width: 1200, height: 800, label: "Atelier" }));

  console.log("Placeholder SVGs generated in public/images/");
}

main();
