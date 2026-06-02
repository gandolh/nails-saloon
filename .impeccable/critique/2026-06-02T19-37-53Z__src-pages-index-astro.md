---
target: src/pages/index.astro
total_score: 30
p0_count: 1
p1_count: 3
timestamp: 2026-06-02T19-37-53Z
slug: src-pages-index-astro
---
## Design Health Score

| # | Heuristic | Score | Key Issue |
|---|-----------|-------|-----------|
| 1 | Visibility of System Status | 3 | FAQ accordion + nav scroll state work; Booking WhatsApp/Telefon "buttons" give no pressed/interactive affordance. |
| 2 | Match System / Real World | 4 | RO-native, WhatsApp-first; "îți comunic adresa pe WhatsApp" matches how a solo home studio actually operates. |
| 3 | User Control and Freedom | 3 | Smooth-scroll anchors + Esc-closable mobile menu; no "back to top", external links open new tabs silently. |
| 4 | Consistency and Standards | 2 | The Booking primary action is a bordered card, not a `.btn` like every other CTA; eyebrow appears on some sections, not others. |
| 5 | Error Prevention | 3 | Cancellation policy + "fermă după confirmare" set expectations; no form, few error surfaces. |
| 6 | Recognition Rather Than Recall | 4 | Prices, hours, policy, services all visible inline; nothing to remember. |
| 7 | Flexibility and Efficiency | 2 | No persistent/sticky WhatsApp CTA on mobile; nav booking button is display:none on mobile, so the success action is never one tap away on phones. |
| 8 | Aesthetic and Minimalist Design | 3 | Restrained and clean, but the saturated-yellow WIP banner and busy neon/rhinestone gallery photos fight the refined register. |
| 9 | Error Recovery | 2 | Content-reveal gates visibility on IntersectionObserver (35/37 sections blank for JS clients that don't scroll); WhatsApp deep-link still points at placeholder 40700000000. |
| 10 | Help and Documentation | 4 | FAQ genuinely answers the real booking/payment/duration questions. |
| **Total** | | **30/40** | **Good — solid foundation, ships with fixes** |

## Anti-Patterns Verdict

**LLM assessment:** Mixed, better than most, but does not fully escape the trap DESIGN.md set for it. The brand is the second-order reflex: "nail salon" -> warm blush-cream + Playfair serif + thin gold accent is exactly the palette+font a model picks for an upscale beauty brand. Executed with restraint, but a stranger shown this logo-hidden would guess "beauty/nails, pink, serif" on the first try — the category-reflex test fails. Specific tells: (1) Playfair Display, on the project's own reflex-reject list, as the entire display voice; (2) uppercase tracked eyebrow on most major sections (Hero, Services, Booking, Contact) while Gallery/Sterilization/Testimonials/Loyalty/FAQ omit it — proving it's inconsistent scaffolding, not a deliberate named kicker; (3) two decorative gold radial-gradient circles (Hero, Loyalty) — the floating-accent-blob move; (4) the hero-metric template in About ("3+ ani exp." / "100% premium"; "100% premium" is a hollow AI stat). Rescued from instant "AI made this" by the masonry gallery, genuinely warm first-person RO copy, the WhatsApp-only booking model, and real personality in About/Loyalty.

**Deterministic scan:** Source-AST detector (`detect.mjs` over src/pages/index.astro + components + layouts): exit 0, zero findings — clean markup. Runtime DOM overlay (detect.js injected into the live page): 16 findings — line-length x7 (RO body copy ~96-144 ch/line), image-hover-transform x6 (gallery hover zoom), cramped-padding x2, clipped-overflow-container x2, text-overflow x1, tight-leading x1 (1.30 vs >=1.30, borderline), all-caps-body x1 (the uppercase eyebrows, 42 chars), cream-palette x1 (rgb(255,248,246) — the documented brand bg). False positives to discount: cream-palette (intentional brand), text-overflow on the .sr-only skip link (measured in its hidden state), tight-leading (at threshold). Real signals worth keeping: line-length (body copy exceeds 75ch), all-caps-body (eyebrow scaffolding), image-hover-transform.

**Content-reveal defect (caught via browser, NOT the detector):** On load, 35 of 37 `.reveal` elements render at opacity:0; they only fade in when IntersectionObserver fires on scroll. This degrades correctly for no-JS and reduced-motion (CSS default leaves content visible), but for a JS-capable client where the observer never fires — headless renderers, link-preview/screenshot bots, social-card crawlers that run JS — 35/37 sections ship blank. This is exactly the failure mode DESIGN.md warns against ("transitions pause on hidden tabs and headless renderers, so the reveal never fires and the section ships blank"). Reproduced live: first full-page screenshot showed a large blank cream band between hero and footer; only after a real scroll-through did content appear.

## Overall Impression

A competent, on-brief boutique salon site with genuine warmth in its copy and a thoughtful trust architecture (Sterilization, "Bun de știut", FAQ). What works is the human voice; what holds it back is that the *visual* identity plays the most obvious move for the category, and the single most important interaction — sending a WhatsApp message — has the weakest affordance and isn't persistently reachable on mobile, the device the entire audience uses. The biggest opportunity: make the WhatsApp CTA the unmistakable, always-reachable hero of the page, and stop the design from leaking the trust the copy builds (WIP banner, labeled-fake testimonials, content-reveal blank-out).

## What's Working

1. **Booking expectation-setting copy ("Bun de știut" + FAQ).** Answers the exact anxieties of a first-time solo-studio client (Is it confirmed? Where is it? Cancellation? Payment?) in plain, warm Romanian. The most genuinely on-brand, non-generic part of the build — reads like Ana, not a template.
2. **Masonry gallery + content-visible-without-JS architecture.** The columns masonry breaks the identical-card-grid reflex; the reveal system keeps content visible for no-JS/crawlers/reduced-motion by CSS default — a thoughtful accessible baseline (the JS-but-no-scroll gap below is the exception, not the rule).
3. **Disciplined, accessible color system.** Body text contrast is excellent (on-surface-variant #4f4442 clears 8.5-9.4:1 everywhere); the team already caught gold-as-text failing AA and added --color-gold-ink #806619 (5.48:1 on white). Mature restraint; ≤10% gold budget respected.

## Priority Issues

### [P0] Primary CTA (WhatsApp) is not styled as a button at the booking moment
- **Why it matters:** In Booking.astro the WhatsApp and Telefon links are bordered white cards, visually identical, no fill, no button affordance. The declared success metric — "a WhatsApp message sent" — is the least button-like element on the page. A distracted mobile visitor scanning for "where do I tap to message her" sees two equal grey boxes. Inverted hierarchy at the one conversion point directly costs bookings.
- **Fix:** Make WhatsApp the dominant filled CTA (WhatsApp green or a solid brand fill), demote Telefon to secondary/outline, give WhatsApp clear primacy in size/weight, and reuse the `.btn` system so affordance matches what users learned elsewhere.
- **Suggested command:** /impeccable layout (or /impeccable craft for a booking-CTA redesign)

### [P1] No persistent booking CTA on mobile
- **Why it matters:** The nav booking button is `hidden md:inline-flex` (display:none at 390px), there's no sticky/floating WhatsApp FAB, and the first in-flow CTA sits below the hero. The entire audience is "usually on a phone," yet on the primary device there is no one-tap path to booking at any scroll position. Contradicts the project's own "booking is one tap away" principle.
- **Fix:** Add a fixed bottom or bottom-right WhatsApp button on mobile (respecting the existing WIP-banner offset var), or surface a compact booking button in the mobile nav bar itself.
- **Suggested command:** /impeccable adapt

### [P1] Content-reveal gates visibility; blank for JS-capable non-scrolling clients
- **Why it matters:** 35/37 sections render at opacity:0 until IntersectionObserver fires on scroll. No-JS and reduced-motion paths are handled, but JS-capable headless renderers, link-preview bots, and social-card crawlers that execute JS but never scroll will capture a blank page (reproduced: large blank cream band between hero and footer). The reveal enhances nothing here — it gates the default. DESIGN.md explicitly bans this.
- **Fix:** Don't hide-then-reveal the whole page. Either (a) only apply the hidden state to elements currently below the fold at load and reveal the rest immediately, or (b) add a short failsafe timeout (e.g. 1500ms after load, force `.is-visible` on all remaining `.reveal`s), or (c) reveal on first scroll/interaction OR timeout, whichever fires first. Keep the no-JS/reduced-motion CSS defaults as-is.
- **Suggested command:** /impeccable animate (rework the reveal trigger) then /impeccable audit

### [P1] Fake-testimonials section advertises that it's fake
- **Why it matters:** Three invented quotes ship with a visible "(Exemple ilustrative…)" disclaimer and an "Exemplu" tag on every card. Social proof is the trust mechanism a from-Instagram visitor leans on; explicitly labeling it fabricated is worse than absence — it signals the business has no real reviews and is padding. Credibility hit at the exact moment she decides to trust.
- **Fix:** Hide the section until real testimonials exist (one real Instagram-DM screenshot beats three labeled fakes), or replace with verifiable proof (IG follower count, "X cliente mulțumite", embedded real posts).
- **Suggested command:** /impeccable clarify (content) or remove the section pending real data

### [P2] WIP banner undercuts the premium first impression
- **Why it matters:** WipBanner is a fixed full-width saturated-gold (#ffdc8e) bar with a pulsing dot — the loudest, highest-contrast, first-seen element, ~3 lines tall on mobile. Opens the experience on "provisional/unfinished" in the brand's off-palette color and stays fixed down the whole scroll. Restraint = quality is the brand thesis; this is the least restrained element.
- **Fix:** Tone to a blush/cream surface with gold-ink text (drop the yellow + pulsing dot), make it slim and dismissible, or retire it before launch.
- **Suggested command:** /impeccable quieter

## Persona Red Flags

**Jordan (first-timer):** Lands on a yellow "under construction" bar -> mild distrust before any content. Reaches Testimonials, reads "(Exemple ilustrative)" -> "so there are no real clients?" At Booking, can't tell which grey card is the action. Trust built by About/Sterilization leaks back out.

**Casey (distracted mobile user):** The killer. WIP banner steals ~3 lines above the fold; no sticky CTA; nav booking button hidden at 390px; must hunt by scrolling or open the hamburger. High chance of leaving without ever finding the one-tap WhatsApp path. (Compounded for any client that doesn't scroll: blank reveal sections.)

**Riley (stress tester):** Taps WhatsApp -> wa.me/40700000000 placeholder (dead). Instagram CTA -> placeholder. Footer shows mock CUI/Reg.Com. Reduced-motion + no-JS paths correctly handled (genuine pass). But a JS-capable headless capture sees a blank middle band — the reveal failsafe gap.

**Local Târgu-Jiu woman ("is this *my* salon?"):** Gallery photos work against the verdict — neon-dot nails, blue rhinestones, a visible CHANEL-logo shirt read loud/busy, contradicting the "refined, restrained" promise the typography and palette make. She may conclude the work doesn't match the vibe. "Te aștept în Iezureni" + "Târgu-Jiu, Gorj" land local trust well.

## Minor Observations

- About metric "100% premium" is a hollow AI-stat; pair "3+ ani exp." with something concrete ("200+ cliente") or drop the metric pair.
- Placeholder contact data is live on the rendered build (wa.me/40700000000, contact@anasaloon.ro, CUI RO00000000) — likely a local-build artifact (site.local.ts not merged); add a build-time guard that fails if whatsappE164 is still the placeholder.
- External links use target="_blank" rel="noopener" but no visible "opens in new tab" cue.
- Nav uses bare `#acasa` (smooth in-page scroll); Footer uses `/#acasa` via withBase (full-path navigation) — inconsistent anchor behavior.
- Two near-duplicate contact blocks (Booking + Contact) both present phone/WhatsApp — mild redundancy.
- Line-length: several RO body copy blocks run ~96-144 ch/line, past the 65-75ch cap; cap prose width.
- Hero/gallery alt text is descriptive, correct Romanian — accessibility done right.

## Questions to Consider

1. If the brand thesis is "restraint reads as quality," why is the single loudest, first-seen, always-fixed element a saturated yellow construction banner — would the site feel more finished and premium without it entirely?
2. The success metric is "a WhatsApp message sent," yet on the device 90% of visitors use there is no persistent way to send one. Should everything else yield to a single sticky WhatsApp button?
3. Three testimonials labeled "Exemplu" — are you building trust or confessing you have none yet? What would one real Instagram-DM screenshot do that three polished fakes can't?
4. The palette+font is the exact answer a model gives for "elegant nail salon." What is the one unexpected choice (a real texture, Ana's handwriting, a single saturated signature color, an asymmetric layout) that would make a Târgu-Jiu woman think "this is hers, not a template"?
5. The gallery photos are louder and busier than the entire rest of the design — is the brand built around the wrong nail work, or are the wrong photos chosen to represent it?
