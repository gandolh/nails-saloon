export const site = {
  name: "Ana Saloon",
  tagline: "Unghii care vorbesc despre tine",
  description:
    "Salon de manichiură în Târgu-Jiu, dedicat fiecărei cliente în parte.",
  city: "Târgu-Jiu",
  county: "Gorj",
  country: "România",

  // Contact (placeholders — to be replaced)
  phone: "07XX XXX XXX",
  phoneE164: "40700000000",
  whatsappE164: "40700000000",
  email: "contact@anasaloon.ro",
  address: "Str. Exemplu nr. X",
  postalCode: "210000",

  // Legal / business identification (Legea 365/2002 art. 5) — MOCK placeholders.
  // Owner provides real data later. For a PFA, set form: "PFA", legalName e.g.
  // "Ana Exemplu PFA", and regNumber to the ONRC F-number (e.g. "F18/123/2024").
  // For an SRL, keep form: "SRL", set the J-number and capital social.
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
    dataRetention: "12 luni de la ultima programare (30 de zile pentru solicitările care nu se finalizează)",
  },

  // Hours
  hours: [
    { day: "Luni – Vineri", value: "09:00 – 19:00" },
    { day: "Sâmbătă", value: "10:00 – 16:00" },
    { day: "Duminică", value: "Închis" },
  ],

  // Social (placeholders)
  social: {
    instagram: "https://instagram.com/anasaloon",
    facebook: "https://facebook.com/anasaloon",
    tiktok: "https://tiktok.com/@anasaloon",
  },

  // Stats (placeholder)
  stats: {
    years: "5+",
    clients: "500+",
    rating: "5.0",
  },

  // Map (Târgu-Jiu center coordinates as placeholder)
  geo: {
    lat: 45.0357,
    lng: 23.2748,
  },

  // Formspree endpoint (placeholder — to be replaced with real ID)
  formspreeEndpoint: "https://formspree.io/f/REPLACE_ME",
} as const;
