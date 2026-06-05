---
name: BavAuto Gorj
description: Independent family BMW specialist in Târgu-Jiu — phone-first, mechanically restrained, lit by one confident blue.
colors:
  primary: "oklch(52% 0.16 252)"
  primary-hover: "oklch(46% 0.155 252)"
  primary-bright: "oklch(72% 0.13 245)"
  primary-container: "oklch(93% 0.04 250)"
  on-primary-container: "oklch(38% 0.12 252)"
  m-blue: "oklch(62% 0.16 245)"
  m-indigo: "oklch(36% 0.13 285)"
  m-red: "oklch(55% 0.21 27)"
  whatsapp: "oklch(57% 0.14 153)"
  whatsapp-hover: "oklch(51% 0.13 153)"
  success: "oklch(58% 0.13 150)"
  error: "oklch(55% 0.2 27)"
  background: "oklch(98.4% 0.004 250)"
  surface-container-lowest: "oklch(100% 0 0)"
  surface-container-low: "oklch(97% 0.006 250)"
  surface-container: "oklch(95.3% 0.008 250)"
  surface-container-high: "oklch(93% 0.01 250)"
  surface-container-highest: "oklch(90.5% 0.012 250)"
  on-surface: "oklch(24% 0.03 255)"
  on-surface-variant: "oklch(43% 0.025 255)"
  outline: "oklch(62% 0.02 255)"
  outline-variant: "oklch(89% 0.012 255)"
  inverse-surface: "oklch(24% 0.035 257)"
  inverse-surface-2: "oklch(28% 0.04 257)"
  inverse-on-surface: "oklch(96% 0.006 250)"
  inverse-on-surface-variant: "oklch(78% 0.015 255)"
typography:
  display:
    fontFamily: "Archivo Variable, Arial Narrow, system-ui, sans-serif"
    fontSize: "clamp(2.4rem, 6vw, 4.25rem)"
    fontWeight: 800
    lineHeight: 1.02
    letterSpacing: "-0.03em"
  headline:
    fontFamily: "Archivo Variable, Arial Narrow, system-ui, sans-serif"
    fontSize: "clamp(1.9rem, 4vw, 2.9rem)"
    fontWeight: 750
    lineHeight: 1.06
    letterSpacing: "-0.025em"
  title:
    fontFamily: "Archivo Variable, Arial Narrow, system-ui, sans-serif"
    fontSize: "clamp(1.35rem, 2.6vw, 1.8rem)"
    fontWeight: 700
    lineHeight: 1.12
    letterSpacing: "-0.015em"
  body:
    fontFamily: "Hanken Grotesk Variable, system-ui, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.55
    letterSpacing: "normal"
  label:
    fontFamily: "Hanken Grotesk Variable, system-ui, sans-serif"
    fontSize: "0.78rem"
    fontWeight: 700
    lineHeight: 1.2
    letterSpacing: "0.14em"
rounded:
  sm: "0.25rem"
  md: "0.5rem"
  lg: "0.75rem"
  xl: "1rem"
  full: "9999px"
components:
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.surface-container-lowest}"
    rounded: "{rounded.md}"
    padding: "0.9rem 1.6rem"
  button-primary-hover:
    backgroundColor: "{colors.primary-hover}"
    textColor: "{colors.surface-container-lowest}"
  button-whatsapp:
    backgroundColor: "{colors.whatsapp}"
    textColor: "{colors.surface-container-lowest}"
    rounded: "{rounded.md}"
    padding: "0.9rem 1.6rem"
  button-outline:
    backgroundColor: "{colors.background}"
    textColor: "{colors.on-surface}"
    rounded: "{rounded.md}"
    padding: "0.9rem 1.6rem"
  card:
    backgroundColor: "{colors.surface-container-lowest}"
    textColor: "{colors.on-surface}"
    rounded: "{rounded.lg}"
    padding: "1.75rem"
  input:
    backgroundColor: "{colors.surface-container-lowest}"
    textColor: "{colors.on-surface}"
    rounded: "{rounded.md}"
    padding: "0.8rem 1rem"
---

# Design System: BavAuto Gorj

## 1. Overview

**Creative North Star: "The Daylit Workshop"**

This is the clean, well-lit bay run by people who genuinely love these cars, with the doors up and an M-stripe across the wall. The palette is the light of that bay: true off-whites with the faintest cool tint, graphite-blue ink the colour of cured metal, and one confident BavAuto blue that does the work of the welding spark. The M motorsport tri-color is no longer kept under glass: it carries real energy across the page, the enthusiast heart worn openly. Depth comes from how surfaces stack in that light, sharpened by confident accent. The system is built to make a BMW owner think "these are my people, and they won't take me for a ride": the passion is visible, the estimate is on the table, and the work happens where you can see it.

The signature is the M motorsport tri-color stripe (light blue → indigo → red): the headline mark of the brand, used as a divider, the tick beside the wordmark, an edge on the hero, and now a confident energy accent where the page needs lift. It stays disciplined (it is never a fake-carbon texture or a tuner decal), but it is allowed to be loud. BavAuto is an **independent specialist**, so the visual language is enthusiast, never dealer: the blue and the stripe carry the heritage nominatively, the BMW roundel never appears.

This system explicitly rejects the **cold corporate dealership** (glossy showroom gloss, distant stock photography), the **cheap roadside garage** (clutter, clip-art, neon, all-caps "OFERTE"), the **generic SaaS landing** (hero-metric template, identical icon-card grids, gradient blobs, buzzword copy), and the **generic aftermarket tuner** (flame decals, fake carbon fiber, neon underglow). Energy here is motorsport-precise, not chaotic: small radii, firm buttons, sharp accents, the M-color used with intent.

**Key Characteristics:**
- One committed brand blue on a clean daylit-neutral base; the M tri-color as a confident, motorsport-energy accent (not a single hairline).
- Graphite-blue near-black ink carrying the brand hue, clearing WCAG AA on every surface.
- Display type set tight and confident (Archivo); body set open and legible (Hanken Grotesk).
- Flat at rest, sharpened by colored accent and glow on interactive elements; depth via the surface tonal ramp.
- Mechanical radii (0.25–1rem), never pill-soft. Mobile-first, phone-call-first.

## 2. Colors

A clean daylit-workshop neutral base carrying one committed saturated blue, with the BMW-M tri-color reserved as a precise signature accent.

### Primary
- **BavAuto Blue** (`oklch(52% 0.16 252)`, ~#1f5fd0): The committed brand colour. Carries the primary CTA (the phone call), the wordmark energy, focus rings, and link emphasis. Deep enough that white text on it clears AA (~5.8:1). **Hover** deepens to `oklch(46% 0.155 252)`.
- **Sky Blue** (`oklch(72% 0.13 245)`, ~#5aa0ef): The lighter blue used for links and accents **on dark surfaces only** (hero, footer), where the base blue would fail contrast.
- **Blue Tint** (`oklch(93% 0.04 250)`): A pale primary-container wash for chips and quiet panels; pairs with `oklch(38% 0.12 252)` ink.

### Secondary
- **M Light Blue** (`oklch(62% 0.16 245)`, ~#2e9ee3), **M Indigo** (`oklch(36% 0.13 285)`, ~#3a2d7a), **M Racing Red** (`oklch(55% 0.21 27)`, ~#e2231a): The motorsport tri-color. The three together always appear in that fixed order as the `.m-stripe` signature. **M Racing Red additionally serves as the sanctioned enthusiast accent** (rating stars, hot/active indicators, a highlighted stat, a hover edge), per the M-Color Rule; light blue and indigo stay inside the stripe.
- **WhatsApp Green** (`oklch(57% 0.14 153)`, ~#1a9e52): The secondary contact CTA, deepened from brand #25D366 so white label text clears AA. **Hover** `oklch(51% 0.13 153)`.

### Neutral
- **Daylit Base** (`oklch(98.4% 0.004 250)`, ~#f7f8fa): Page background and default surface. A true near-white with the faintest cool tint toward the brand blue so white cards lift off it. Cool, not cream, this is the auto register, not the beauty register.
- **Pure White** (`oklch(100% 0 0)`): Card and input fill, lifting off the tinted base.
- **Surface Ramp** (`oklch(97% → 90.5%`, low → highest): Tonal layering for panels and nested surfaces; this ramp does the work shadows would.
- **Graphite Ink** (`oklch(24% 0.03 255)`, ~#16202e): Body text and headings. Graphite-blue near-black, carrying the brand hue without going pure-black-cold. **Secondary ink** `oklch(43% 0.025 255)` (~#4a586a).
- **Outline** (`oklch(62% 0.02 255)`) and **Hairline** (`oklch(89% 0.012 255)`): Borders and dividers.
- **Graphite Navy** (`oklch(24% 0.035 257)`, ~#141d2b): The inverse surface for dark sections (hero, footer, mobile menu); near-white ink reverses onto it.

### Named Rules
**The M-Color Rule.** The M tri-color is the brand's motorsport signature and carries real energy. The full stripe (light blue → indigo → red, in that fixed order) remains the headline mark: dividers, the wordmark tick, hero and section edges. Beyond the stripe, **M Racing Red may be used as a deliberate single-element accent** where the page wants enthusiast lift, rating stars, a highlighted stat, an active/hot indicator, a hover edge. The discipline is intent, not scarcity: red is for genuine motorsport energy, never a fake-carbon texture, a tuner decal, or a body-copy colour. Never reorder the stripe's bands, and never let red drop below AA where it carries text.

**The One Blue Rule.** A single committed blue carries the structural identity (CTAs, links, focus, primary surfaces). On light surfaces use BavAuto Blue; on dark surfaces switch to Sky Blue for contrast. The M tri-color is the *one* sanctioned companion to the blue; introduce no other accent hue to "balance" them. Blue carries the structure, the M-color carries the passion, neutrals carry everything else.

## 3. Typography

**Display Font:** Archivo Variable (with Arial Narrow, system-ui fallback)
**Body Font:** Hanken Grotesk Variable (with system-ui fallback)

**Character:** A contrast pairing on the grotesque axis. Archivo is a tight, confident, slightly condensed grotesque, set heavy and negatively tracked it reads as machined, stamped-metal headlines. Hanken Grotesk is open, humanist, and calm, the reassuring voice that explains the estimate. Both are self-hosted (no Google Fonts CDN) and carry latin-ext for Romanian diacritics (ă â î ș ț).

### Hierarchy
- **Display** (`heading-xl`, weight 800, `clamp(2.4rem, 6vw, 4.25rem)`, line-height 1.02, tracking -0.03em): The hero headline only. One per page.
- **Headline** (`heading-lg`, weight 750, `clamp(1.9rem, 4vw, 2.9rem)`, line-height 1.06, tracking -0.025em): Section headings.
- **Title** (`heading-md`, weight 700, `clamp(1.35rem, 2.6vw, 1.8rem)`, line-height 1.12, tracking -0.015em): Card and sub-section titles.
- **Body** (Hanken, weight 400, 1rem / 16px, line-height 1.55): All running copy. Cap measure at 65–75ch; the hero intro is held to `max-w-xl`.
- **Label / Eyebrow** (Hanken, weight 700, 0.78rem, tracking 0.14em, UPPERCASE): Short kickers paired with the M stripe. Used sparingly, not above every section.

### Named Rules
**The Tight-Head, Open-Body Rule.** Headings are tracked negative (down to -0.03em) and set heavy for machined confidence; body stays at normal tracking and 1.55 line-height for calm legibility. Never tighten body tracking to match the headline, and never loosen heading tracking past -0.015em, the contrast between the two voices is the system.

**The Sparing Eyebrow Rule.** The uppercase tracked eyebrow is reserved for the hero and at most one or two key sections, always paired with the M stripe. An eyebrow above every section is forbidden; it is AI scaffolding, not voice.

## 4. Elevation

Flat by default, lit by the accent. Surfaces are flat at rest and depth is built from the neutral surface tonal ramp (`surface-container-low` through `highest`) and 1px hairlines, not from resting drop shadows. Shadow appears only as a soft, colored, diffuse glow tied to **state or to the brand**: a blue lift under the primary CTA, a blue focus ring on inputs, a graphite lift under the open mobile menu. There is no generic gray drop shadow anywhere; every shadow is tinted to its own element's hue.

### Shadow Vocabulary
- **CTA Lift** (`box-shadow: 0 10px 28px -14px oklch(52% 0.16 252 / 0.7)`): A soft blue glow under the primary button, so the single most important action feels lifted toward the visitor.
- **Focus Ring** (`box-shadow: 0 0 0 3px oklch(52% 0.16 252 / 0.15)` + blue border): The input focus treatment; a blue halo, not a browser outline.
- **Menu Lift** (`box-shadow: 0 8px 50px -12px oklch(20% 0.03 257 / 0.6)`): A deep graphite drop under the dark mobile-menu overlay, the one place a large surface lifts off the page.

### Named Rules
**The Flat-By-Default, Lit-By-State Rule.** A card or panel at rest has a border and a tonal background, never a resting shadow. If a surface has a drop shadow, it must be earning it through state (hover, focus) or through being the primary CTA, and the shadow must be tinted to that element's own hue. A gray ambient shadow on a flat card is forbidden; it reads as a 2014 app.

## 5. Components

The component feel is **firm and motorsport-confident**: small radii, confident weight, precise edges, the snap of a well-engineered control. Nothing pill-soft; energy is welcome where it earns lift (an M-red accent, a sharp hover), but it stays precise, never chaotic.

### Buttons
- **Shape:** Mechanical, small radius (`rounded.md` = 0.5rem). 1.5px transparent border baked in so outline and filled variants share geometry.
- **Primary** (`.btn-primary`): BavAuto Blue fill, white label, the CTA Lift glow. This is the phone call, the single most important action on the site. Padding `0.9rem 1.6rem`; `.btn-lg` bumps to `1.05rem 2rem`.
- **WhatsApp** (`.btn-whatsapp`): WhatsApp Green fill, white label. The strong secondary contact.
- **Outline** (`.btn-outline`): Transparent, graphite text, outline border; hover firms the border to ink and tints the background. An **inverse** variant (`.btn-outline-inverse`) adapts to dark hero/footer surfaces via translucent white borders.
- **Hover / Focus:** 180ms `cubic-bezier(0.22, 1, 0.36, 1)` ease-out on color and transform; `:active` presses down 1px (`translateY(1px)`). Global `:focus-visible` is a 2px blue outline at 2px offset.

### Cards / Containers
- **Corner Style:** `rounded.lg` (0.75rem).
- **Background:** Pure White (`surface-container-lowest`) lifting off the tinted Daylit Base.
- **Shadow Strategy:** None at rest (see Elevation, Flat-By-Default).
- **Border:** 1px Hairline (`outline-variant`).
- **Internal Padding:** 1.75rem.
- Used deliberately, not as the default container, testimonials are the canonical card use; most sections compose with grid and dividers instead.

### Inputs / Fields
- **Style:** Pure White fill, 1.5px Hairline border, `rounded.md`, 1rem text. Placeholder at secondary-ink colour and 0.85 opacity (still AA, never light gray).
- **Focus:** Border shifts to BavAuto Blue with the blue Focus Ring halo; browser outline removed in favour of the halo.
- **Textarea:** vertical resize only, min-height 6.5rem. **Select:** native appearance stripped.

### Navigation
- **Style:** Sticky top bar. **At rest over the hero** it is transparent with near-white wordmark and links (sitting on the dark hero). **Once scrolled** (`data-scrolled="true"`, past 8px) it gains a light glass backdrop (`oklch(98.4% 0.004 250 / 0.82)` + `backdrop-filter: blur(10px) saturate(140%)`) and a bottom hairline, and text flips to graphite ink. The wordmark carries a small M-stripe tick beside it.
- **Mobile:** A burger opens a dark graphite-navy overlay (React island) with a blue radial wash and staggered link entrance (45ms apart), honouring reduced-motion.

### The M Stripe (signature component)
A thin three-band bar, light blue → indigo → red in fixed proportion (33.33% each), `rounded.full`. Default 4px × 64px as a divider or wordmark tick; `--full` variant becomes a full-width square-edged section break. This is the one piece of motorsport heritage the brand wears, never the roundel.

### Scroll Reveal (signature behavior)
Content is visible by default; JS opts into a hidden start (`opacity:0`, `translateY(12px)`) and reveals on scroll via IntersectionObserver, with a 2.5s hard failsafe that force-reveals everything so the page never ships blank to crawlers, link-preview bots, or throttled tabs. Fully suppressed under `prefers-reduced-motion`.

## 6. Do's and Don'ts

### Do:
- **Do** make the phone call the visual priority. The primary blue button with its CTA Lift glow is the single loudest element; every section should funnel toward it.
- **Do** keep the M tri-color stripe in its fixed band order (light blue → indigo → red), and **do** let M Racing Red carry enthusiast energy as a single-element accent (rating stars, hot/active indicators, a highlighted stat) per the M-Color Rule.
- **Do** carry brand energy through the blue, the M-color, the graphite ink, and real BMW imagery, never through a warm/cream background. The base is a cool-tinted off-white.
- **Do** keep surfaces flat at rest with hairline borders and the tonal ramp for depth; reserve shadows for state and the CTA (the Flat-By-Default Rule).
- **Do** set headings tight and heavy (Archivo, tracking to -0.03em) against open calm body (Hanken, 1.55), and cap body measure at 65–75ch.
- **Do** keep all contact actions (call, WhatsApp) one tap away on mobile, and hold WCAG 2.2 AA: body ≥4.5:1, large text ≥3:1, visible focus rings.

### Don't:
- **Don't** look like a **cold corporate dealership**: no glossy showroom gloss, no distant stock photography, no BMW roundel. BavAuto is an independent family workshop.
- **Don't** look like a **cheap roadside garage**: no clutter, clip-art, neon, or all-caps "OFERTE". Restraint is the trust signal.
- **Don't** look like a **generic SaaS landing**: no hero-metric template (giant number + label + gradient accent), no identical icon-card grids repeated endlessly, no gradient blobs, no buzzword copy ("seamless", "world-class", "transform").
- **Don't** reorder the M stripe's bands, turn it into a fake-carbon texture or tuner decal, or use M Racing Red for body copy or large fills; energy comes from intent, not volume.
- **Don't** introduce a third accent hue beyond the blue and the M-color (the One Blue Rule), and never use the base blue as text on a dark surface (use Sky Blue).
- **Don't** put a gray ambient drop shadow on a flat card, and don't add an uppercase tracked eyebrow above every section.
- **Don't** use light-gray body text for "elegance"; the graphite ink and AA-deepened CTAs are chosen so nothing falls below contrast.
