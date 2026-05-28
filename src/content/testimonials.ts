export type Testimonial = {
  quote: string;
  author: string;
  rating: number;
};

export const testimonials: Testimonial[] = [
  {
    quote:
      "Ana e o profesionistă desăvârșită. De fiecare dată ies din salon cu unghii perfecte și un zâmbet pe față.",
    author: "Andreea M.",
    rating: 5,
  },
  {
    quote:
      "Atmosferă caldă, atenție la detalii și unghii care chiar durează 3 săptămâni. Recomand cu drag!",
    author: "Maria P.",
    rating: 5,
  },
  {
    quote:
      "Cel mai bun salon din Târgu-Jiu. Ana ascultă ce vrei și livrează exact asta — și încă ceva în plus.",
    author: "Ioana R.",
    rating: 5,
  },
];
