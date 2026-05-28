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
