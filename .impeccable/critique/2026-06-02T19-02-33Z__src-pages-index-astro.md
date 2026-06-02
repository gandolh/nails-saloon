---
target: Ana Saloon landing page (index.astro)
total_score: 34
p0_count: 0
p1_count: 2
timestamp: 2026-06-02T19-02-33Z
slug: src-pages-index-astro
---
# Critique — Ana Saloon landing page (`src/pages/index.astro`)

## Design Health Score

| # | Heuristic | Score | Key Issue |
|---|-----------|-------|-----------|
| 1 | Visibility of System Status | 3 | Nav scroll state + FAQ open/close are clear; no booking-submit feedback (by design — booking is off-site WhatsApp) |
| 2 | Match System / Real World | 4 | Fluent, natural Romanian; WhatsApp-first matches local habits |
| 3 | User Control and Freedom | 3 | Mobile menu has Esc + close; no focus trap; anchor nav easy to escape |
| 4 | Consistency and Standards | 4 | Token system applied consistently; eyebrow+divider pattern uniform across sections |
| 5 | Error Prevention | 3 | No forms to err in; booking rules ("Bun de știut") pre-empt confusion well |
| 6 | Recognition Rather Than Recall | 4 | All nav labelled, services/prices visible, no hidden state |
| 7 | Flexibility and Efficiency | 3 | Sticky CTA in nav; no skip-to-book floating affordance on long scroll |
| 8 | Aesthetic and Minimalist Design | 3 | Clean and warm; three identical 3-card grids in a row reduce distinctiveness |
| 9 | Error Recovery | 3 | n/a for static content; legal/booking edge cases addressed in copy |
| 10 | Help and Documentation | 4 | FAQ with structured data, booking rules, hours, multiple contact paths |
| **Total** | | **34/40** | **Good — solid foundation, targeted polish** |

## Anti-Patterns Verdict

**Does this look AI-generated? Mostly no — it reads as a real small business, but two AI-grammar tells are present.**

**LLM assessment:** The site avoids the worst slop. Real photography carries it, the voice is genuinely Romanian and personal, the palette is a committed warm system rather than the cream-default. Two tells remain: (1) the **tiny uppercase tracked eyebrow above every section** ("DESPRE MINE", "SERVICIILE MELE", "PORTOFOLIU", "PROGRAM DE FIDELITATE", "ÎNTREBĂRI FRECVENTE", "VINO LA MINE") — an eyebrow on 8/8 sections is AI scaffolding, not voice; (2) **three consecutive identical 3-card grids** (Services, Sterilization, Testimonials) — same icon-circle + heading + body structure stacked back-to-back-to-back.

**Deterministic scan:** `detect.mjs` over `src/components src/pages src/layouts` returned `[]` — zero rule hits. The detector's eyebrow/card heuristics didn't fire (the eyebrows are `<span>` labels, not a flagged structure), so the two tells above are LLM-judgment findings the scanner missed, not false positives.

**Visual overlays:** Browser inspection was done by scroll-and-screenshot across desktop (1440) and mobile (390) plus a full-page in-DOM contrast audit; no persistent overlay was injected (evidence gathered via direct `getComputedStyle` measurement instead).

## Overall Impression

This is a genuinely good small-business landing page that's about four targeted fixes away from excellent. It does the most important thing right: real photos lead, the voice is warm and human, and every section funnels to WhatsApp. The biggest single opportunity is **breaking the structural monotony** of three identical card grids and the every-section eyebrow — that's most of what separates "real salon" from "AI made a salon site." The one concrete defect is the **gold price text failing contrast**.

## What's Working

1. **Photography-first, on-brand.** The hero and About lead with real images; the blush/cream/gold system is a committed warm palette, not the AI cream-default. The Loyalty panel (blush surface, gold radial motif, meaningful "5" badge) is the strongest composition on the page.
2. **Trust is built the right way — warm, not clinical.** Sterilization, the loyalty program, hours, legal footer (CUI, ANPC SAL), and FAQ structured data all earn confidence without feeling like a clinic. Exactly on-brief.
3. **Solid technical baseline.** Skip link, no-JS-safe reveals (content visible without scripts), `prefers-reduced-motion` paths, self-hosted fonts (GDPR), JSON-LD `BeautySalon`, 44px tap targets, accessible mobile dialog with Esc + scroll-lock.

## Priority Issues

- **[P1] Gold price text fails WCAG AA contrast (2.25:1, needs 4.5:1).** The price — the single most important number on each Services card — is the least readable text on the page. Gold `#c9a961` on white card. Measured live across all three cards.
  - **Why it matters:** Prices are decision-critical and this is your stated AA target. Low-vision and even ordinary users squint at the exact thing they came to read.
  - **Fix:** Use `--color-on-surface` (or a darker gold ~`oklch(0.5 0.09 85)`) for the price text; keep gold for the *non-text* accents (divider, focus ring, stars) where it's fine. Weight 600 + dark ink reads as "premium price" better than pale gold anyway.
  - **Suggested command:** `/impeccable colorize` (or fold into `/impeccable audit` fixes)

- **[P1] Eyebrow on every section is AI grammar.** All 8 sections open with a tiny uppercase tracked label + gold divider. One named kicker is voice; eight is scaffolding.
  - **Why it matters:** It's the single strongest "AI made this" tell on the page and flattens the rhythm — every section announces itself the same way.
  - **Fix:** Keep the eyebrow on 2–3 sections where it adds orientation (e.g. Services, Contact); drop it elsewhere and let the Playfair H2 + divider carry the section. Vary the section openings.
  - **Suggested command:** `/impeccable typeset`

- **[P2] Three identical card grids in a row.** Services, Sterilization, and Testimonials are all `md:grid-cols-3` of `.card` with icon-circle + heading + body. Back-to-back-to-back, the structure reads as a template.
  - **Why it matters:** Identical card grids are a listed anti-pattern; three in sequence is the lazy-layout reflex and erodes the boutique feel.
  - **Fix:** Differentiate at least one. Sterilization could be a horizontal trust strip (icon + label inline) or a single reassuring statement; Testimonials could be a single large featured quote or an offset 2-up. Let Services keep the card grid since price comparison genuinely benefits from it.
  - **Suggested command:** `/impeccable layout`

- **[P2] Em dashes throughout user-visible Romanian copy.** Testimonials, FAQ, Gallery, Contact, Sterilization, Loyalty, Services, and the legal pages all use `—` in visible copy (e.g. "Voucher cadou — surprinde…", "unghii frumoase — …").
  - **Why it matters:** Em dash is a hard copy ban in this design system; it's also a subtle AI-writing tell. Romanian punctuation typically prefers a comma, colon, or parentheses here.
  - **Fix:** Replace visible-copy em dashes with commas, colons, or periods (leave code comments alone). Mechanical, low-risk.
  - **Suggested command:** `/impeccable clarify`

- **[P2] Services card #3 price/CTA wraps awkwardly on desktop.** "de la 20 lei / unghie" is long enough that "PROGRAMEAZĂ →" wraps to a second line, breaking the baseline-aligned row the other two cards keep.
  - **Why it matters:** Misaligned, wrapped CTA looks unfinished next to the two clean cards.
  - **Fix:** Allow the price to wrap while pinning the CTA (`flex-wrap` with the CTA `shrink-0`), shorten to "de la 20 lei/unghie", or stack price-over-CTA consistently across all three.
  - **Suggested command:** `/impeccable layout`

## Persona Red Flags

**Jordan (Confused First-Timer):** Mostly served well — clear nav, visible prices, FAQ, booking rules. One snag: the WhatsApp CTAs (`wa.me/{number}`) do **not** pre-fill a message, so a hesitant first-timer lands in a blank chat unsure what to type, despite PRODUCT.md's "booking is one tap away, pre-filled message" principle. Pre-filling "Bună, aș dori o programare pentru [serviciu]" would remove the last hesitation.

**Casey (Distracted Mobile User):** Well served. Image-first hero, single-column stacking, 44px targets, sticky nav CTA, WhatsApp is the native path. On a long scroll the only path back to booking is scrolling up to the nav; a persistent thumb-zone "Programează-te" button would help, but the in-section CTAs are frequent enough that this is minor.

**Riley (Deliberate Stress Tester):** Notices the gallery still shows a placeholder tile ("Galerie 7") and testimonials are openly labeled "Exemplu / Exemple ilustrative". Honest, but a stranger may read placeholders as "not a real business yet." Acceptable while the WIP banner is up; prioritize real photos + one real testimonial before launch.

## Minor Observations

- Mobile menu dialog has Esc + scroll-lock + `aria-modal` but no focus trap; focus can tab out behind the overlay (Sam/keyboard users).
- "100% premium" stat in About is a vague claim; a concrete number (clients served, years, services) would carry more weight.
- Testimonials' uppercase "Exemplu" tag in each card's footer repeats the placeholder disclaimer already shown above the grid.
- Footer is strong (legal, ANPC, socials); the 4-column layout is the one place a card-free grid is used well.

## Questions to Consider

- What if only **one** section used the eyebrow — would the page feel more like Ana and less like a template?
- The three card grids are structurally identical; which one genuinely *needs* to be cards, and what would the other two look like as something else entirely?
- If the price were the boldest, darkest text on the card instead of the palest, would it read as *more* premium, not less?
- What's the very first thing a hesitant client should see typed into WhatsApp when they tap "Programează-te"?
