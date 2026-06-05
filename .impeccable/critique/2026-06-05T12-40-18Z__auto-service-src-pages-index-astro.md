---
target: auto-service (BavAuto Gorj) homepage
total_score: 36
p0_count: 0
p1_count: 1
timestamp: 2026-06-05T12-40-18Z
slug: auto-service-src-pages-index-astro
---
## Design Health Score

| # | Heuristic | Score | Key Issue |
|---|-----------|-------|-----------|
| 1 | Visibility of System Status | 4 | Form now has submitting/spinner + success panel + form-level error; nav scroll-state flips at 8px. Verified in DOM and live. |
| 2 | Match System / Real World | 4 | Plain warm Romanian; "deviz", model codes (N47, VANOS, F30), "nu suntem dealer". Exact register match. |
| 3 | User Control and Freedom | 3 | Anchor nav, mobile menu close/esc, FAQ toggle all reversible. Success panel `.focus()` targets a `<div>` with no `tabindex` so focus move is unreliable. |
| 4 | Consistency and Standards | 3 | Token system rigorous. New ding: 3 of 9 service cards show "de la X lei", 6 show nothing — reads as missing data, not restraint. |
| 5 | Error Prevention | 4 | Tolerant RO phone validator, `inputmode="tel"`, blur-validate + live-clear, no-fetch fallback to native POST so a lead is never lost. |
| 6 | Recognition Rather Than Recall | 4 | Every action labelled, one-screen IA, model/year hint in the form placeholder. |
| 7 | Flexibility and Efficiency | 3 | Three contact paths one tap away. No click-to-copy phone for desktop; minor. |
| 8 | Aesthetic and Minimalist Design | 4 | Flat-by-default, one blue + M-stripe, no decorative clutter. Genuinely disciplined. |
| 9 | Error Recovery | 4 | Inline RO messages specific and kind ("Pare incomplet. Verifică numărul"), red border+halo, first-bad-field focus. |
| 10 | Help and Documentation | 3 | FAQ (9 Q&A) + 5-step Process + "nu ești sigur? sună-ne" prompts. No persistent help affordance; register doesn't need one. |
| **Total** | | **36/40** | **Good → top of band. Up from 30. Remaining items are launch-data + small consistency/a11y nits.** |

## Anti-Patterns Verdict

**Does this look AI-generated? No — it clears both altitudes of the category-reflex check.**

**LLM assessment**: First-order, the auto-service reflex (black/gunmetal hero, racing-red-or-orange accent, giant "10,000+ customers" hero-metric, 3 identical icon cards) is refused: cool daylit off-white base, one disciplined blue, M-stripe used nominatively, hero stats sit small in a `<dl>` not a gradient stat-block. Second-order, it also dodges the *anti-reflex* trap (the cold glassy corporate-dealer minimal landing): copy is specific and human ("lanț N47", "vorbești cu omul care repară", "te tratează ca pe un vecin, nu ca pe un număr de bon"), layout is deliberately asymmetric (WhyUs 0.85/1.15, FAQ 0.7/1.3), and eyebrows appear only on hero/contact, not above every section. The voice is the moat — it reads authored, not generated. Residual slop-adjacent risk: the TrustBand 4-cell row and the Services 3×3 icon grid are the most template-shaped sections, saved by distinct icons and specific copy.

**Deterministic scan**: `detect.mjs` over `index.astro` + all components + layouts returned **`[]` — zero findings**, exit 0. No gradient text, side-stripe borders, glassmorphism-as-default, hero-metric template, or eyebrow-on-every-section. Matches both the prior run and the LLM read.

**Browser evidence**: The MCP browser profile was locked by a live instance, so Assessment B substituted objective rendered-DOM checks (curl of the running dev server) plus Assessment A's verified live inspection (separate headless Chromium at 1440px + 390px). DOM confirms: form state machine present (success/spinner/form-error/field-error/aria-invalid all in markup), nav has exactly 5 `nav-link`s, hero ships `/images/real/hero.jpeg`, all 6 gallery tiles ship from `/images/real/`. No console errors reported at either breakpoint. No user-visible overlay is claimed (detect.js was not injected into the page).

## Overall Impression

This is a clean progress jump: **30 → 36**. Every issue from the 2026-06-05 critique was addressed:
- **P1 form states — fully resolved.** The quote form is now a complete, honest state machine: client-side RO validation with inline per-field messages, a tolerant phone validator, submitting/spinner state, an inline success panel that re-offers the phone, a form-level network-error fallback, and a no-`fetch` fallback to native POST so a lead is never silently lost.
- **P2 imagery — resolved at the pipeline level.** Real hero + 6 real gallery images now ship (`PUBLIC_IMAGE_SOURCE=real`, files present in `public/images/real/`). The remaining question is content-quality (are they genuinely BMW), not wiring.
- **P3 nav 6→5 — resolved.** "Despre" demoted to scroll-flow + footer; 5 highest-intent anchors remain.
- **P3 M-red stars — reframed, not broken.** DESIGN.md was revised (the M-Color Rule) to sanction M Racing Red as a deliberate single-element accent (rating stars, hot indicators), so the testimonial stars are now on-system. Moot in practice until real reviews exist (the section self-hides).

The biggest remaining opportunities are not design failures so much as **launch-readiness gaps** (placeholder phone, WIP banner) and two small consistency/a11y nits.

## What's Working

1. **The form is now the strongest converted-secondary on any small-business site I'd review.** Verified: empty submit yields three specific RO field errors and focuses the first bad field; garbage phone is caught kindly; double-submit is blocked; network failure routes to "sună-ne direct". The exact call-averse visitor it exists for is now caught, not lost.
2. **The voice is the anti-slop moat.** Trust is *shown* through specificity ("îți spunem sincer când o lucrare nu merită banii", "fără call-center"), never claimed through adjectives. No model defaults to this register.
3. **Disciplined color under pressure.** One blue carries all structure; the M-stripe stays in fixed band order as divider/tick/edge; M-red is confined to sanctioned accents. The cool daylit base is the single best decision that beats both the tuner and the dealer anti-references at once.

## Priority Issues

### [P1] Launch-data gaps make the primary CTA a dead link today
- **Why it matters**: `site.ts` still ships `07XX XXX XXX` and a placeholder email; the Formspree endpoint is `your-form-id`. A real visitor who taps "Sună acum" right now reaches nothing — the entire conversion architecture is wired to placeholders. The WIP banner is honest cover for this, but the moment it comes down (or a visitor lands anyway), every CTA must be real. This is the one thing that makes the otherwise-excellent page non-functional as a lead engine.
- **Fix**: Replace phone, email, and the Formspree form ID with real values; confirm `priceRange` in the AutoRepair JSON-LD or drop it. Treat this as launch-blocking, ahead of any further polish.
- **Suggested command**: (content/config, not a design command) — update `src/content/site.ts` + `Contact.astro` endpoint.

### [P2] Service pricing is shown on 3 of 9 cards
- **Why it matters**: Revizii / Frânare / Climatizare carry "de la X lei"; the other six (diagnoză, distribuție, suspensie, răcire-VANOS, electrică, pre-ITP) show nothing. To a visitor this reads as *missing* data, not deliberate restraint — and asymmetric price visibility quietly undercuts the "deviz clar, fără surprize" trust promise this audience is most anxious about.
- **Fix**: Be consistent. Either give every card a "de la …" floor or an explicit "preț la diagnoză", or remove all per-card prices and route pricing through the (already strong) deviz/process narrative.
- **Suggested command**: `/impeccable polish src/components/Services.astro`

### [P2] Gallery ships real images, but the "Lucrări reale, mașini reale" promise needs them to actually be BMW
- **Why it matters**: All 6 tiles now ship from `public/images/real/` (real progress over the prior stand-ins), but the section header promises "real work, real cars" for an independent BMW specialist. If any tile is a generic/non-BMW vehicle, the honesty gap a skeptic feels reintroduces the dealer-gloss anti-reference at the one mid-page moment trust can wobble.
- **Fix**: Audit the 6 gallery files (and hero) for marque fidelity. Any that aren't clearly BMW: replace with real BavAuto BMW shots, or soften the copy ("Așa arată atelierul") rather than asserting "reale, reale" over an anonymous photo.
- **Suggested command**: `/impeccable polish src/components/Gallery.astro` (after a marque audit of the assets)

### [P3] Success-panel focus management is not robust for keyboard / screen-reader users
- **Why it matters**: On submit success the script calls `success.focus()` on a `<div role="status">` that has no `tabindex`, so the focus move can silently fail and a keyboard/SR user may be left on the now-hidden form. The `role="status"` text will be announced, but focus placement is unreliable.
- **Fix**: Add `tabindex="-1"` to `#quote-success` (and ensure the heading reads first). Small change, real correctness win for Sam.
- **Suggested command**: `/impeccable harden src/components/Contact.astro`

### [P3] WIP banner taxes the first impression on the phone-first surface
- **Why it matters**: A persistent dark "site în lucru" banner above the hero consumes the top of the first viewport (worst on mobile, where vertical space is scarcest) and signals "unfinished" at the exact moment of first impression — counter to "the call is the product" and "phone-first, friction-last". Defensible during soft-launch; costly once content is real.
- **Fix**: Keep it a single thin strip, consider an auto-dismiss-after-first-view (localStorage), and flip `site.wip.show` to `false` the moment real content lands. Also: the banner's pulse dot uses `--color-success` (green) right next to the WhatsApp green — an info/neutral or brand-blue tint would read less like a "live/open" status.
- **Suggested command**: `/impeccable quieter src/components/WipBanner.astro`

## Persona Red Flags

**Jordan (Confused First-Timer)**: Walks the call path cleanly — hero CTA is obvious in 5s, all nav is text-labelled, terminology is plain, and the form now confirms success ("Am primit cererea ta"). The only flags are launch-data: the placeholder phone is a dead CTA today, and the WIP banner + any non-BMW gallery tile plant a faint "is this place finished/real?" doubt.

**Casey (Distracted Mobile User)**: Strong. Sticky bottom bar keeps call + WhatsApp pinned in the thumb zone (honors `env(safe-area-inset-bottom)`); call target is a fat ~304×51px. Two flags: the WhatsApp neighbor is a narrow ~54px-wide icon target right beside the call button (fat-finger risk), and the WIP banner steals first-viewport height.

**Riley (Deliberate Stress Tester)**: The form survives the probing — empty submit → 3 correct RO errors + focus to first bad field; "123" phone → caught; rapid double-submit → blocked; network failure → "sună-ne direct" fallback. The only functional gap is the success-focus a11y nit (P3). The remaining UI-promises-vs-reality risk is the "reale, reale" gallery copy over any anonymous photo.

## Minor Observations

- Nav scroll-flip verified at the spec'd 8px threshold (transparent over hero → glass `oklch(.984 .004 250/.82)` + blur(10px) saturate(140%) + hairline; text flips graphite). Clean.
- No console errors at either breakpoint.
- Testimonials correctly render nothing with no real reviews; the M-red star code (filled red / muted-outline empty) is now within the sanctioned M-Color Rule.
- Hero JPEG is eager-loaded and fairly heavy for a phone-first audience on mobile data; consider AVIF/WebP (README already notes this).
- Hero stat row mixes a non-numeric "Familie / aceiași oameni" item into a `<dl>` of numeric stats; fine, slightly weakens the row rhythm.

## Questions to Consider

- The #1 goal is a phone call, yet the largest, most polished single component on the page is the quote form (the tertiary path). Is the form's visual weight quietly competing with the call?
- "Trust is shown, not claimed" — does a gallery of plausible-but-anonymous photos under a "reale, reale" headline build more trust than shipping with fewer, verified-BMW tiles (or none) until real shop photos exist?
- For a buyer choosing who touches an expensive car, does advertising "site în lucru" cost more conversions than the honest charm it buys?
