---
target: src/pages/index.astro
total_score: 36
p0_count: 0
p1_count: 1
timestamp: 2026-06-02T20-48-30Z
slug: src-pages-index-astro
---
# Critique (re-run) — Ana Saloon landing page (`src/pages/index.astro`)

## Design Health Score

| # | Heuristic | Score | Key Issue |
|---|-----------|-------|-----------|
| 1 | Visibility of System Status | 3 | Nav scroll-state + FAB reveal good; reframed banner now reads "live & reachable"; no post-tap confirmation (you leave to WhatsApp — acceptable) |
| 2 | Match System / Real World | 4 | Romanian, plain-spoken; "îți comunic adresa pe WhatsApp" matches how the trade works |
| 3 | User Control and Freedom | 4 | Esc + focus-trap in mobile menu; all WhatsApp opens in new tab with rel=noopener |
| 4 | Consistency and Standards | 4 | **Improved.** WhatsApp green is now one consistent "message me" signal across Hero/Booking/Contact/FAB |
| 5 | Error Prevention | n/a (3) | No forms; 24h cancellation expectation stated up front |
| 6 | Recognition Rather Than Recall | 4 | Per-service prefill carries the choice into the message; user recalls nothing |
| 7 | Flexibility and Efficiency | 4 | **Improved.** Hero CTA is one tap to send; per-service "Programează →" is a real accelerator; phone fallback for the WhatsApp-averse |
| 8 | Aesthetic and Minimalist Design | 4 | Restrained, on-brand, no decorative noise |
| 9 | Error Recovery | n/a | No destructive actions |
| 10 | Help and Documentation | 3 | FAQ + "Bun de știut" cover it; no explicit "what happens after I message" beyond "confirm în cel mai scurt timp" |
| **Total** | | **~36/40** (up from ~34) | **Good → upper Good** |

## Anti-Patterns Verdict

**PASS — low slop, now more distinctive.** Detector CLEAN (0 findings, exit 0) across 17 markup files; served HTML healthy (single h1, no skipped levels, 8/8 images with alt, 12/12 `target="_blank"` carry rel=noopener, `lang="ro"`, 2 JSON-LD blocks, no leaked brand hex — gold fully tokenized, 0 `#C9A961` in src). Removing the fake "100% / premium" stat was the single biggest slop reduction. The new "cu drag, Ana" signature reads as a genuine brand flourish (italic wordmark face, earned by the first-person prose above it, restrained 1.5px gold draw-in) rather than decoration — the most distinctive single element on the page. Last run's "competent but safe / cloneable" critique is now **partially answered**: content and voice are distinctive; the layout chassis (section order, two 3-up icon grids) is still conventional.

## Overall Impression

The two launch-hygiene problems from last run are resolved: the WIP banner no longer levies a first-paint trust tax (apology → invitation, pulse + aria-live removed), and a production build guard makes fake business data impossible to ship. On top of that, the WhatsApp conversion system is now coherent end-to-end (one green token, prefilled per-service openers, one-tap hero CTA, a FAB that yields only where a full CTA exists), and the page gained a real emotional beat with the signature. Score moved 34 → 36, with the gains landing exactly where the changes targeted (#4 Consistency, #7 Efficiency). What remains is lower-stakes: a residual CTA-treatment duplication, a structural-distinctiveness ceiling, and one verb ("Programează-te") that still scrolls in some places while opening WhatsApp in others.

## What's Working

1. **Coherent WhatsApp system.** One green token, prefilled openers carrying per-service context, a sticky FAB that intelligently yields only at Booking/Contact, and a deliberately quieter phone fallback. The single success metric is one tap from almost any scroll position.
2. **The signature gesture, done with discipline.** Wordmark face, earned by the prose, no-JS-safe and reduced-motion-safe via the same `background-size` contract as the reveal system. Distinctive without being precious.
3. **Honest trust engineering.** Parked fake testimonials, removed the fake stat, build-blocks placeholder data, self-hosts fonts (GDPR), states the cancellation/confirmation contract plainly. Earns trust by not overclaiming — correct for this market.

## Priority Issues

**[P1] `site.local.ts` still holds placeholder values; the guard protects prod but not dev/preview.**
- Why it matters: the guard is the right net, but a dev/preview build (or a screenshot of one) still shows a fake CUI/phone — the exact scam-signal to avoid. The trust story is only as good as the real data, which doesn't exist in the repo yet.
- Fix: enter Ana's real phone/phoneE164/whatsappE164/cui/regNumber/address in `site.local.ts` (build is blocked until then). Optionally surface a dev-only "DATE DEMO" marker so a dev screenshot isn't mistaken for live. Known/build-blocked → P1 not P0.

**[P2] Two WhatsApp CTA treatments (pill vs card) slightly dilute the "one unmistakable action."**
- Why it matters: `.btn-whatsapp` appears as a pill (Hero/Contact/FAB) and as a large bordered card with sub-text (Booking). Same green, two shapes; a returning eye re-parses "same thing?" The card (with reassurance copy) is the better treatment.
- Fix: treat the card as the canonical primary booking CTA and the pill as an explicit compact variant — one component, two sizes — so it reads as system, not drift.

**[P2] Layout chassis is still conventional; distinctiveness lives in voice, not structure.**
- Why it matters: a competitor could lift the section order + two 3-up icon grids in an afternoon. Voice is now distinctive; the visual skeleton isn't.
- Fix (low urgency): one structural signature move — full-bleed Gallery band, or an asymmetric/editorial Services layout instead of three equal cards — so the shape also says "Ana." The content distinctiveness may already be enough for the goal.

**[P3] Contact section is largely redundant after Booking.**
- Why it matters: Contact repeats WhatsApp + phone + a third "Scrie-mi pe WhatsApp" right after Booking did it with more care — mild peak-end dilution; the last full beat before the footer is a weaker echo of the strongest one.
- Fix: slim Contact to the genuinely-new info (hours, zonă, email, social), drop the duplicate CTA pair, or merge Booking + Contact.

**[P3] FAB-over-footer may cover the last legal line on short viewports.**
- Why it matters: the FAB now (correctly) stays over the footer, but its fixed bar covers ~bottom 60px; the legal/ANPC line sits at the very bottom.
- Fix: verify at 360×640; if covered, add footer bottom padding equal to the FAB height, or suppress the FAB once the legal block is fully in view.

## Persona Red Flags

**Decisive Târgu-Jiu woman from Instagram (mobile, seconds):** Green. Lands past the reframed banner on a personal Hero with one green "message Ana" button; per-service prefill sends the exact service she wants; signature + "1 la 1" say "a person, not a chain." No red flags.

**Casey (mobile):** Improved by FAB-over-footer — the one-tap CTA now persists exactly where mobile users hunt for contact. Tap targets honored (44px+; FAB 52px). Watch item: the P3 footer-coverage check.

**Riley (stress tester):** No-JS PASSES (reveals, signature underline, FAB all default visible; banner static). Reduced-motion PASSES (reveal, signature draw, FAB transform, smooth-scroll all guarded). One nit: Gallery hover `scale-[1.02]` is the lone transform outside a reduced-motion guard (hover-only, tiny — low concern).

## Minor Observations

- The WIP banner's gold dot no longer pulses; static, it's now vestigial ornament — consider whether it still earns its place.
- "Programează-te" scrolls to `#programari` in Nav/Services/Loyalty/Menu but opens WhatsApp directly in Hero/FAB/Contact — same verb, two destinations. Intentional (scroll for undecided, WhatsApp for decided) but confirm it's deliberate.
- Contact's "Telefon · WhatsApp" label sits over a `tel:` link while the WhatsApp button is separate — mild label ambiguity.
- Loyalty quotes specific percentages (20%/10%) and Services claims "rezistent până la 3 săptămâni" — same trust surface as the now-guarded phone/CUI, but no guard protects these *promises* from being aspirational.

## Questions to Consider

1. If a message sent is the only success metric, why do the Nav/Loyalty/Menu "Programează-te" buttons still scroll to a section instead of opening WhatsApp, now that the Hero is one tap?
2. The signature says "cu drag, Ana" but the wordmark says "Unghii by Ana." Is the brand "Ana" or "Unghii by Ana"? The signature is strongest if person and brand share a name.
3. The build guard protects the phone/CUI from being fake — what protects the *promises* (loyalty %, wear claims) from being aspirational placeholders?
4. Is the fixed WIP banner still needed now that its message is covered by the Hero CTA + FAB, or is it a launch-week artifact that should have a removal date?
