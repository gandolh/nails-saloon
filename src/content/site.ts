// Public defaults — safe to commit. Real values (phone, address, CUI, social
// handles, geo) live in the git-ignored `site.local.ts`, which is
// deep-merged on top of these at build time. See `site.local.example.ts`.
//
// Note: whatever ends up here is baked into the static HTML and is therefore
// PUBLIC on the deployed site. Git-ignoring `site.local.ts` only keeps the real
// values out of the repo/GitHub history — not off the live page.

const defaults = {
  name: "Unghii by Ana",
  tagline: "Unghii care vorbesc despre tine",
  description:
    "Manichiură personalizată lângă Târgu-Jiu, dedicată fiecărei cliente în parte.",
  city: "Târgu-Jiu",
  county: "Gorj",
  country: "România",

  // Contact (placeholders — overridden in site.local.ts)
  phone: "07XX XXX XXX",
  phoneE164: "40700000000",
  whatsappE164: "40700000000",
  email: "contact@anasaloon.ro",
  address: "Str. Exemplu nr. X",
  postalCode: "210000",

  // Legal / business identification (Legea 365/2002 art. 5) — MOCK placeholders.
  // Owner provides real data in site.local.ts. For a PFA, set form: "PFA",
  // legalName e.g. "Ana Exemplu PFA", and regNumber to the ONRC F-number
  // (e.g. "F18/123/2024"). For an SRL, keep form: "SRL", set the J-number and
  // capital social.
  legal: {
    form: "SRL" as "SRL" | "PFA" | "II", // tip entitate
    legalName: "Ana Saloon S.R.L.", // denumirea exactă din actul constitutiv
    cui: "RO00000000", // CUI / CIF de la ANAF
    regNumber: "J18/000/2024", // nr. Registrul Comerțului (J… pentru SRL, F… pentru PFA)
    shareCapital: "200 RON", // capital social (doar SRL; gol pentru PFA)
    // Data Protection Officer / responsabil date — optional for a micro business.
    dpoEmail: "contact@anasaloon.ro",
    // Last review date of the legal documents (update when content changes).
    documentsUpdated: "29 mai 2026",
    // Retention chosen per the legal audit (see ana_saloon_legal memory).
    dataRetention:
      "12 luni de la ultima programare (30 de zile pentru solicitările care nu se finalizează)",
  },

  // Hours
  hours: [
    { day: "Luni – Vineri", value: "09:00 – 19:00" },
    { day: "Sâmbătă", value: "10:00 – 16:00" },
    { day: "Duminică", value: "Închis" },
  ],

  // Social (placeholders — overridden in site.local.ts)
  social: {
    instagram: "https://instagram.com/anasaloon",
    facebook: "https://facebook.com/anasaloon",
    tiktok: "https://tiktok.com/@anasaloon",
  },

  // Stats (placeholder)
  stats: {
    years: "3+",
  },

  // Map (Târgu-Jiu center coordinates as placeholder — overridden in site.local.ts)
  geo: {
    lat: 45.0357,
    lng: 23.2748,
  },
};

// Pre-filled WhatsApp deep-link. A booked message is the site's success metric,
// so every primary CTA opens WhatsApp with a friendly Romanian opener already
// typed — the client just hits send (PRODUCT.md: "booking is one tap away").
// Pass a service name to tailor the opener; omit for the generic greeting.
export function waLink(message?: string): string {
  const text =
    message ?? "Bună, Ana! Aș dori o programare. Când ai un loc liber?";
  return `https://wa.me/${site.whatsappE164}?text=${encodeURIComponent(text)}`;
}

// Placeholder sentinels that must NEVER reach a production build. If any of
// these survive into `dist/`, the live site shows a fake phone number and a
// fake CUI in the legal footer — which, on a Romanian small-business site,
// reads as a scam and destroys the trust the page works to build.
const PLACEHOLDERS = {
  phone: "07XX XXX XXX",
  phoneE164: "40700000000",
  cui: "RO00000000",
  regNumber: "J18/000/2024",
  address: "Str. Exemplu nr. X",
} as const;

// The shape of the real-data file. Every field is optional, so the local file
// only needs to specify what it overrides.
export type SiteOverrides = {
  [K in keyof typeof defaults]?: (typeof defaults)[K] extends object
    ? Partial<(typeof defaults)[K]>
    : (typeof defaults)[K];
};

// Eagerly glob the optional local file. `import.meta.glob` resolves to {} when
// the file is absent, so a fresh clone / CI without secrets falls back cleanly
// to the placeholders above. The path is a literal so Vite can statically
// analyse it.
const localModules = import.meta.glob<{ siteOverrides: SiteOverrides }>(
  "./site.local.ts",
  { eager: true },
);
const overrides: SiteOverrides =
  Object.values(localModules)[0]?.siteOverrides ?? {};

// Shallow merge for top-level scalars/arrays, one level of nested merge for the
// object groups (legal / social / stats / geo) so a local file can override a
// single nested field without restating the whole block.
export const site = {
  ...defaults,
  ...overrides,
  legal: { ...defaults.legal, ...overrides.legal },
  social: { ...defaults.social, ...overrides.social },
  stats: { ...defaults.stats, ...overrides.stats },
  geo: { ...defaults.geo, ...overrides.geo },
} as const;

// Production data guard. `astro build` bakes these values into static HTML, so
// a missing/incomplete `site.local.ts` would ship placeholders as if real — a
// fake phone and a fake CUI in the legal footer, which on a Romanian
// small-business site reads as a scam. Fail the build loudly instead.
//
// This lives in `site.ts` (not the Astro config) on purpose: Vite transforms
// this module, so both `import.meta.glob` above and `import.meta.env.PROD` here
// resolve correctly. `PROD` is true only for `astro build`; `astro dev` and the
// mock workflow stay permissive so the placeholders remain usable locally.
if (import.meta.env.PROD) {
  const stillPlaceholder: string[] = [];
  if (site.phone === PLACEHOLDERS.phone) stillPlaceholder.push("phone");
  if (site.phoneE164 === PLACEHOLDERS.phoneE164)
    stillPlaceholder.push("phoneE164");
  if (site.whatsappE164 === PLACEHOLDERS.phoneE164)
    stillPlaceholder.push("whatsappE164");
  if (site.address === PLACEHOLDERS.address) stillPlaceholder.push("address");
  if (site.legal.cui === PLACEHOLDERS.cui) stillPlaceholder.push("legal.cui");
  if (site.legal.regNumber === PLACEHOLDERS.regNumber)
    stillPlaceholder.push("legal.regNumber");

  if (stillPlaceholder.length > 0) {
    throw new Error(
      `Production build blocked: real business data is missing. ` +
        `These fields still hold placeholder values: ${stillPlaceholder.join(", ")}. ` +
        `Fill them in src/content/site.local.ts (copy site.local.example.ts). ` +
        `Shipping a fake phone/CUI to the live site reads as a scam.`,
    );
  }
}
