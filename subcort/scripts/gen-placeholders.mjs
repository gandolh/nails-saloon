// Generates illustrated SVG mock-ups for the hero, gallery, and OG image.
//
// These are stylized VECTOR scenes (not photos): a lit tent at blue hour, an
// empty prepared interior, the structure being raised, a string of lights. They
// are drawn in the brand palette (deep canopy green + warm off-white + clay
// lamp-glow) and are intentionally illustrative — occasion-neutral, never a
// celebration in progress — so the brand reads calm and dependable.
//
//   node scripts/gen-placeholders.mjs

import { writeFile, mkdir } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const outDir = join(__dirname, "..", "public", "images");

// Brand palette (matches src/styles/global.css; hex approximations of the OKLCH).
const C = {
  sky0: "#1c2f23", // deepest canopy (top of dusk sky / tent shadow)
  sky1: "#26412f", // deep canopy green (inverse-surface)
  sky2: "#33523e", // lifted canopy
  field: "#2c3a2c", // dark grassy field at dusk
  line: "#46604f", // structural lines
  canvasL: "#eef0e8", // warm off-white canvas highlight
  ink: "#f3f1e8", // warm near-white
  green: "#5a8c63", // brighter green
  greenD: "#3a6b46",
  clay: "#c87b4a", // warm clay (lamp glow)
  clayL: "#e6a877", // brighter clay glow
};

// Shared building blocks ----------------------------------------------------

function defs() {
  return `
  <defs>
    <linearGradient id="dusk" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="${C.sky0}"/>
      <stop offset="60%" stop-color="${C.sky1}"/>
      <stop offset="100%" stop-color="${C.field}"/>
    </linearGradient>
    <radialGradient id="lamp" cx="50%" cy="62%" r="42%">
      <stop offset="0%" stop-color="${C.clayL}" stop-opacity="0.5"/>
      <stop offset="55%" stop-color="${C.clay}" stop-opacity="0.12"/>
      <stop offset="100%" stop-color="${C.clay}" stop-opacity="0"/>
    </radialGradient>
    <linearGradient id="guyline" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%" stop-color="${C.green}"/>
      <stop offset="100%" stop-color="${C.clayL}"/>
    </linearGradient>
  </defs>`;
}

// The guy-line (signature) along the top edge.
function guyline(w, h = 5) {
  return `<rect x="0" y="0" width="${w}" height="${h}" fill="url(#guyline)"/>`;
}

// A peaked tent silhouette with a glowing interior, drawn at unit scale and
// translated/scaled by the caller. Two-peak marquee shape.
function tent(cx, baseY, scale = 1, glow = true) {
  const w = 360 * scale;
  const peak = 150 * scale;
  const eave = 80 * scale;
  const x0 = cx - w / 2;
  const x1 = cx + w / 2;
  const midL = cx - w * 0.18;
  const midR = cx + w * 0.18;
  // Roofline: eave → peak → dip → peak → eave (a two-bay marquee).
  const roof = `M${x0},${baseY - eave}
    L${midL},${baseY - peak}
    L${cx},${baseY - peak * 0.82}
    L${midR},${baseY - peak}
    L${x1},${baseY - eave}`;
  const body = `${roof}
    L${x1},${baseY}
    L${x0},${baseY} Z`;
  const opening = glow
    ? `<path d="M${cx - 46 * scale},${baseY}
         L${cx - 46 * scale},${baseY - eave * 0.92}
         Q${cx},${baseY - eave * 1.15} ${cx + 46 * scale},${baseY - eave * 0.92}
         L${cx + 46 * scale},${baseY} Z" fill="${C.clayL}" opacity="0.9"/>
       <path d="M${cx - 30 * scale},${baseY}
         L${cx - 30 * scale},${baseY - eave * 0.78}
         Q${cx},${baseY - eave * 0.95} ${cx + 30 * scale},${baseY - eave * 0.78}
         L${cx + 30 * scale},${baseY} Z" fill="${C.ink}" opacity="0.85"/>`
    : "";
  return `<g>
    <path d="${body}" fill="${C.canvasL}" opacity="0.95"/>
    <path d="${roof} L${x1},${baseY - eave}" fill="none" stroke="${C.greenD}" stroke-width="${2.5 * scale}" opacity="0.35"/>
    <line x1="${midL}" y1="${baseY - peak}" x2="${midL}" y2="${baseY}" stroke="${C.greenD}" stroke-width="${1.5 * scale}" opacity="0.25"/>
    <line x1="${midR}" y1="${baseY - peak}" x2="${midR}" y2="${baseY}" stroke="${C.greenD}" stroke-width="${1.5 * scale}" opacity="0.25"/>
    ${opening}
    <!-- guy ropes -->
    <line x1="${x0}" y1="${baseY - eave}" x2="${x0 - 34 * scale}" y2="${baseY}" stroke="${C.green}" stroke-width="${1.5 * scale}" opacity="0.6"/>
    <line x1="${x1}" y1="${baseY - eave}" x2="${x1 + 34 * scale}" y2="${baseY}" stroke="${C.green}" stroke-width="${1.5 * scale}" opacity="0.6"/>
  </g>`;
}

// A string of warm bulbs across the frame.
function lights(w, y, n = 9) {
  let s = `<path d="M0,${y} Q${w / 2},${y + 28} ${w},${y}" fill="none" stroke="${C.line}" stroke-width="1.5" opacity="0.5"/>`;
  for (let i = 0; i <= n; i++) {
    const t = i / n;
    const x = t * w;
    const yy = y + Math.sin(Math.PI * t) * 28;
    s += `<circle cx="${x.toFixed(1)}" cy="${yy.toFixed(1)}" r="3.5" fill="${C.clayL}" opacity="0.9"/>`;
  }
  return s;
}

function caption(w, h, label) {
  const fs = Math.max(13, Math.round(Math.min(w, h) * 0.04));
  return `<g font-family="Georgia, 'Times New Roman', serif">
    <text x="50%" y="${h - fs * 1.1}" text-anchor="middle" font-size="${fs}" font-weight="700" fill="${C.ink}" opacity="0.9">${label}</text>
  </g>`;
}

function frame(w, h, inner, label) {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" width="${w}" height="${h}">
  ${defs()}
  <rect width="${w}" height="${h}" fill="url(#dusk)"/>
  <rect width="${w}" height="${h}" fill="url(#lamp)"/>
  ${inner}
  ${guyline(w)}
  ${label ? caption(w, h, label) : ""}
</svg>`;
}

// Scenes --------------------------------------------------------------------

// Hero: a lit tent on a field at blue hour, string lights above.
function sceneHero(w, h, label) {
  const baseY = h * 0.82;
  const inner = `
  <line x1="0" y1="${baseY}" x2="${w}" y2="${baseY}" stroke="${C.line}" stroke-width="2" opacity="0.4"/>
  ${lights(w, h * 0.2)}
  ${tent(w * 0.5, baseY, Math.min(w, h) / 520, true)}`;
  return frame(w, h, inner, label);
}

// Empty prepared interior: a row of tables under the canopy, warm light.
function sceneInterior(w, h, label) {
  const baseY = h * 0.84;
  let tables = "";
  const rows = 2, cols = 3;
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const x = w * (0.22 + c * 0.28);
      const y = baseY - r * h * 0.22 - h * 0.04;
      const sc = 1 - r * 0.18;
      tables += `<ellipse cx="${x}" cy="${y}" rx="${42 * sc}" ry="${14 * sc}" fill="${C.canvasL}" opacity="${0.92 - r * 0.15}"/>
        <rect x="${x - 4}" y="${y}" width="8" height="${22 * sc}" fill="${C.line}" opacity="0.5"/>`;
    }
  }
  const inner = `
  <!-- canopy ceiling lines -->
  <path d="M0,${h * 0.16} L${w * 0.5},${h * 0.06} L${w},${h * 0.16}" fill="none" stroke="${C.line}" stroke-width="2" opacity="0.4"/>
  <rect x="0" y="${h * 0.16}" width="${w}" height="${h * 0.04}" fill="${C.sky2}" opacity="0.4"/>
  ${lights(w, h * 0.24, 7)}
  <line x1="0" y1="${baseY}" x2="${w}" y2="${baseY}" stroke="${C.line}" stroke-width="2" opacity="0.45"/>
  ${tables}`;
  return frame(w, h, inner, label);
}

// Setup: the structure half-raised, frame visible.
function sceneSetup(w, h, label) {
  const baseY = h * 0.82;
  const cx = w * 0.5;
  const ww = w * 0.62, peak = h * 0.42;
  const x0 = cx - ww / 2, x1 = cx + ww / 2;
  const inner = `
  <line x1="0" y1="${baseY}" x2="${w}" y2="${baseY}" stroke="${C.line}" stroke-width="2" opacity="0.4"/>
  <!-- frame -->
  <g stroke="${C.green}" stroke-width="4" fill="none" opacity="0.85" stroke-linecap="round">
    <line x1="${x0}" y1="${baseY}" x2="${x0}" y2="${baseY - peak * 0.5}"/>
    <line x1="${x1}" y1="${baseY}" x2="${x1}" y2="${baseY - peak * 0.5}"/>
    <line x1="${cx}" y1="${baseY}" x2="${cx}" y2="${baseY - peak}"/>
    <line x1="${x0}" y1="${baseY - peak * 0.5}" x2="${cx}" y2="${baseY - peak}"/>
    <line x1="${x1}" y1="${baseY - peak * 0.5}" x2="${cx}" y2="${baseY - peak}"/>
  </g>
  <!-- canvas being pulled over one side -->
  <path d="M${x0},${baseY - peak * 0.5} L${cx},${baseY - peak} L${cx},${baseY} L${x0},${baseY} Z" fill="${C.canvasL}" opacity="0.9"/>
  <line x1="${x0}" y1="${baseY - peak * 0.5}" x2="${x0 - 30}" y2="${baseY}" stroke="${C.clay}" stroke-width="2" opacity="0.7"/>`;
  return frame(w, h, inner, label);
}

// A small tent row (coverage / gallery filler).
function sceneField(w, h, label) {
  const baseY = h * 0.8;
  const inner = `
  <line x1="0" y1="${baseY}" x2="${w}" y2="${baseY}" stroke="${C.line}" stroke-width="2" opacity="0.4"/>
  ${tent(w * 0.3, baseY, Math.min(w, h) / 900, false)}
  ${tent(w * 0.62, baseY - h * 0.02, Math.min(w, h) / 620, true)}`;
  return frame(w, h, inner, label);
}

// String-lights detail.
function sceneLights(w, h, label) {
  const inner = `
  ${lights(w, h * 0.34, 6)}
  ${lights(w, h * 0.54, 5)}
  ${tent(w * 0.5, h * 0.86, Math.min(w, h) / 760, true)}`;
  return frame(w, h, inner, label);
}

async function main() {
  await mkdir(outDir, { recursive: true });

  await writeFile(join(outDir, "hero.svg"), sceneHero(1600, 1000, "Subcort · corturi pentru evenimente"));
  await writeFile(join(outDir, "og-image.svg"), sceneHero(1200, 630, "Subcort · corturi pentru evenimente"));

  await writeFile(join(outDir, "gallery-01.svg"), sceneInterior(1000, 750, "Interior pregătit"));
  await writeFile(join(outDir, "gallery-02.svg"), sceneSetup(1000, 750, "Montaj la fața locului"));
  await writeFile(join(outDir, "gallery-03.svg"), sceneLights(1000, 750, "Iluminat cald, seara"));
  await writeFile(join(outDir, "gallery-04.svg"), sceneInterior(1000, 750, "Pardoseală și pereți"));
  await writeFile(join(outDir, "gallery-05.svg"), sceneField(1000, 750, "Cort pe teren deschis"));
  await writeFile(join(outDir, "gallery-06.svg"), sceneSetup(1000, 750, "Detaliu de structură"));

  // Favicon: a tiny tent peak mark.
  const favicon = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="32" height="32">
  <rect width="32" height="32" rx="7" fill="${C.sky1}"/>
  <path d="M6,23 L13,9 L16,13 L19,9 L26,23 Z" fill="${C.canvasL}"/>
  <path d="M13,23 L13,16 Q16,14 19,16 L19,23 Z" fill="${C.clayL}"/>
</svg>`;
  await writeFile(join(outDir, "favicon.svg"), favicon);

  console.log("Illustrated placeholder SVGs generated in public/images/");
}

main();
