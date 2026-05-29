export type GalleryImage = {
  src: string;
  alt: string;
};

// Before/after pairs — a high-converting format for nail work. Uses placeholder
// SVGs (the existing gallery images) until real before/after photos land; the
// owner just swaps the `before`/`after` srcs (and matching alt text) per pair.
export type BeforeAfter = {
  before: GalleryImage;
  after: GalleryImage;
  caption: string;
};

export const beforeAfter: BeforeAfter[] = [
  {
    before: { src: "/images/gallery-06.svg", alt: "Unghii naturale, înainte de manichiură" },
    after: { src: "/images/gallery-02.svg", alt: "French clasic cu gel, după manichiură" },
    caption: "Manichiură cu gel — french clasic",
  },
  {
    before: { src: "/images/gallery-07.svg", alt: "Unghii scurte, înainte de construcție" },
    after: { src: "/images/gallery-08.svg", alt: "Construcție gel stiletto, după" },
    caption: "Construcție pe șablon — formă stiletto",
  },
  {
    before: { src: "/images/gallery-01.svg", alt: "Unghii simple, înainte de nail art" },
    after: { src: "/images/gallery-03.svg", alt: "Nail art floral pe fundal blush, după" },
    caption: "Nail art floral pe semipermanent",
  },
];

export const gallery: GalleryImage[] = [
  { src: "/images/gallery-01.svg", alt: "Manichiură semipermanentă nude" },
  { src: "/images/gallery-02.svg", alt: "Unghii cu gel french clasic" },
  { src: "/images/gallery-03.svg", alt: "Nail art floral pe fundal blush" },
  { src: "/images/gallery-04.svg", alt: "Babyboomer cu accent gold" },
  { src: "/images/gallery-05.svg", alt: "Ombre roz pal cu sclipici" },
  { src: "/images/gallery-06.svg", alt: "Manichiură roșie clasică" },
  { src: "/images/gallery-07.svg", alt: "Design minimal cu linii fine" },
  { src: "/images/gallery-08.svg", alt: "Unghii lungi stiletto" },
  { src: "/images/gallery-09.svg", alt: "Nail art geometric" },
];
