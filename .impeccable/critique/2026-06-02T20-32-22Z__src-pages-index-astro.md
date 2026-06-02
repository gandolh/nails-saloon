---
target: src/pages/index.astro
total_score: 34
p0_count: 1
p1_count: 1
timestamp: 2026-06-02T20-32-22Z
slug: src-pages-index-astro
---
# Critique — Ana Saloon landing page (`src/pages/index.astro`)

## Design Health Score

| # | Heuristic | Score | Key Issue |
|---|-----------|-------|-----------|
| 1 | Visibility of System Status | 3 | Nav scroll-state, FAB show/hide, FAQ rotate all give feedback; external WhatsApp/phone hand-off is OS-handled |
| 2 | Match System / Real World | 4 | Romanian reads like a person, not a CMS; WhatsApp is the audience's real channel |
| 3 | User Control and Freedom | 3 | Mobile menu has Esc + focus-trap; no "back to top"; FAB suppressed at footer |
| 4 | Consistency and Standards | 3 | Disciplined tokens, but the WhatsApp action renders in 3 different visual treatments |
| 5 | Error Prevention | n/a (3) | No forms; "Bun de știut" box pre-empts the cancellation-policy confusion |
| 6 | Recognition Rather Than Recall | 4 | Prices, hours, policy all inline; nothing to remember across sections |
| 7 | Flexibility and Efficiency | 3 | Multiple fast paths, but per-service CTAs throw away service context that `waLink()` supports |
| 8 | Aesthetic and Minimalist Design | 4 | Restrained palette, generous whitespace, no decorative noise |
| 9 | Error Recovery | n/a | No error states exist |
| 10 | Help and Documentation | 3 | FAQ + "Bun de știut" + inline T&C cover it well |
| **Total** | | **~34/40** (8 applicable ≈ 27/32) | **Good — high competence, ceiling held by distinctiveness + trust-tax** |

## Anti-Patterns Verdict

**PASS — not AI slop.** Deterministic detector: CLEAN (0 findings, exit 0) across 17 markup files. No side-stripe borders, no gradient text, no decorative glassmorphism (the one nav blur is scroll-gated), no numbered markers, no per-section eyebrows (sub-labels only), no nested cards, no bounce easing, no em dashes in rendered copy. Fraunces is reflex-reject but a committed brand identity, executed well (SOFT/opsz axes, warm weights). Served HTML is healthy: single valid h1, no skipped heading levels, 8/8 images with alt + width/height, 8/8 `target="_blank"` carry `rel=noopener`, full meta/OG/canonical/JSON-LD, `lang="ro"`.

The real risk is **distinctiveness, not authenticity**: every section is the textbook-correct layout. Competent but cloneable. Ana's voice in the About copy is the only thing a competitor couldn't copy in a weekend, and it's buried below the fold.

## Overall Impression

A genuinely well-built, warm, on-brand boutique site with exemplary progressive enhancement. It clears the slop bar comfortably. Two things hold it back, and neither is a craft problem: (1) the WIP "site unfinished / info provisional" banner levies a trust tax at second zero, before a single nail is seen, contradicting the whole hygiene/professionalism narrative; (2) placeholder business data (fake phone, `CUI: RO00000000`) is one missing config file away from shipping as "real," which in the RO market reads as a scam. Biggest opportunity: protect the first impression (kill/reframe the banner) and guarantee real data ships.

## What's Working

1. **Ana's first-person voice.** "Pun suflet în fiecare set," "te aștept în Iezureni," "Ne ținem evidența, tu te bucuri." Sounds like one specific woman talking to one client — the hardest thing to fake and the brand's real moat.
2. **Booking conversion psychology.** Single dominant green WhatsApp card + reassurance subtitle, phone demoted to "sau, dacă preferi," and a "Bun de știut" box that pre-empts the three first-timer anxieties before they appear. Textbook one-action design.
3. **Engineering-grade progressive enhancement.** Reveal system visible-by-default, hide-then-animate only when JS + IO + no-reduced-motion hold, 2.5s failsafe against blank social-card captures; no-JS-visible FAB; banner publishes its own height as a CSS var. Survives the real world (crawlers, no-JS, reduced-motion).

## Priority Issues

**[P0] The WIP banner imposes a trust tax at the worst moment.**
- Why it matters: the audience decides "is this my salon?" in seconds from a phone, arriving from a polished Instagram grid. The first rendered frame is a pulsing-dot admission that the business's own info is "provizorii" — it inverts the trust strategy and invites "if she can't finish her site, can she finish my nails?" The `role="status" aria-live="polite"` also announces the disclaimer to screen readers on load.
- Fix: remove once real content lands, or reframe from apology to invitation ("Tocmai am lansat — scrie-mi pe WhatsApp pentru programări"), kill the pulse, drop the aria-live, and consider moving it below the hero or making it dismissible.
- Command: `/impeccable clarify` (copy/reframe) or `/impeccable polish`.

**[P1] Placeholder business data is one config flag from shipping as "real."**
- Why it matters: defaults render `07XX XXX XXX`, `Str. Exemplu nr. X`, `CUI: RO00000000`. Combined with the WIP "live but unfinished" signal, a visible fake CUI in the legal footer reads as a scam in the RO market and destroys the legitimacy the footer is meant to build.
- Fix: build-time guard that fails the production build if `site.local.ts` is absent or `cui`/`phone` still match the placeholder pattern; at minimum a release-blocker check in the deploy script.
- Command: `/impeccable harden`.

**[P2] Conversion context is discarded at every CTA; "100% premium" wastes a hierarchy slot.**
- Why it matters: `waLink(message?)` supports a tailored opener but every CTA calls it bare, so all produce the generic "Aș dori o programare." A client tapping "Programează →" on the gel card has signaled intent that's thrown away. Separately, the About stat block pairs a real "3+ ani" with a non-stat "100% premium" (a buzzword wearing a number's clothes).
- Fix: pass `waLink(\`Bună, Ana! Aș dori o programare pentru ${s.title}...\`)` on service cards; replace "100% premium" with a real second stat or drop to one centered stat.
- Command: `/impeccable clarify` (CTAs + stat copy).

**[P3] One WhatsApp action, three visual treatments.**
- Why it matters: Booking (large green card), Contact (small pill), mobile FAB (full pill) sit close together; the user re-learns the action's appearance. Contact's pill looks like a downgrade of the card shown one section earlier.
- Fix: make Booking's card the canonical "message me" component; promote or simplify Contact's treatment.
- Command: `/impeccable polish`.

**[P3] "Competent but safe" composition.**
- Why it matters: distinctiveness is the brief ("design IS the product"); nothing is a memorable signature.
- Fix: push one signature moment (Ana's handwritten signature after the About copy; an asymmetric hero-image-plus-grid gallery instead of uniform masonry). One gesture, not ten.
- Command: `/impeccable delight` or `/impeccable bolder`.

## Persona Red Flags

**Târgu-Jiu woman, Instagram link, phone, deciding in seconds (decisive persona):** First frame is the WIP banner, not a beautiful nail — a record-scratch after a polished IG grid (P0). If mocks are live, a fake-looking phone or placeholder gallery ends the visit (P1). What works: past the banner, the hero portrait + warm tagline + first-person About are perfectly calibrated to "is this my kind of person?"; the Gallery's "Urmărește-mă pe Instagram" gives the social-proof escape hatch she trusts most.

**Jordan (first-timer):** WIP "informații provizorii" makes him wonder if the prices are real. Address-withheld-until-WhatsApp + placeholder CUI + WIP cluster into red flags together. Otherwise well-served — FAQ answers his exact questions.

**Casey (distracted mobile):** Strong overall — persistent FAB, one-tap WhatsApp, 44–52px targets. Friction: FAB is suppressed at the footer where people instinctively look for contact, costing Casey her muscle-memory tap exactly where she's likely to act. WIP banner eats vertical space, pushing the hero CTA down on first paint.

**Riley (stress tester):** Reduced-motion fully honored; keyboard focus-trap + Esc + skip-link present; no-JS genuinely hard to break; `rel=noopener` consistent. One tone bug: the banner's `aria-live` announces the "unfinished" disclaimer to AT users on load.

## Minor Observations

- Footer hardcodes `const year = 2026;` — will go stale; use `new Date().getFullYear()`.
- Brand presents under two names: visible wordmark "Unghii by Ana" vs page title / OG / `legalName` "Ana Saloon". A social card says "Ana Saloon" while the page says "Unghii by Ana" — identity blur. Pick one and make OG/title agree with the wordmark.
- Gallery "Fiecare unghie este o mică operă de artă" is the one template-marketing line; replace with Ana's voice.
- Two slightly different gold-blob recipes for the same motif (Hero opacity 0.35 vs Loyalty opacity-30); 2 inline `#C9A961` hexes instead of the `var(--color-gold)` token used everywhere else.
- "3+ ani exp." — "exp." is the only abbreviation in otherwise warm, unabbreviated copy; reads terse.
- Sterilization is correctly differentiated (borderless rows, not cards) but is the least Ana-voiced section (third-person clinical) — acceptable trade for the trust signal.

## Questions to Consider

1. If a sent WhatsApp message is the only success metric, why does the hero's primary button scroll to a section ("Programează-te acum") instead of opening WhatsApp directly in one tap?
2. Is the WIP banner protecting Ana (managing expectations) or harming her (signaling unreliability)? Whose anxiety does it serve?
3. The privacy posture (address withheld) and the trust posture (placeholder CUI showing) pull in opposite directions for a wary stranger. Which wins?
4. The brand has two names. Which is the salon — warm "Unghii by Ana" or formal "Ana Saloon"? Picking one sharpens identity more than any visual change.
5. Everything is correct. What here is unforgettable? If a competitor cloned the layout tomorrow, what stays unmistakably Ana's? (Today: only the About copy.)
