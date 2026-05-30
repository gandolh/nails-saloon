import { img } from "./images";

export type GalleryImage = {
  src: string;
  alt: string;
};

// Before/after pairs — a high-converting format for nail work. Image sources
// resolve through `img()`, so they follow the active source (mock SVGs by
// default, real photos when IMAGE_SOURCE = "real"); the owner just drops
// matching files into public/images/real/ and never touches these paths.
export type BeforeAfter = {
  before: GalleryImage;
  after: GalleryImage;
  caption: string;
};

export const beforeAfter: BeforeAfter[] = [
  {
    before: { src: img("gallery-06"), alt: "Unghii naturale, înainte de manichiură" },
    after: { src: img("gallery-02"), alt: "French clasic cu gel, după manichiură" },
    caption: "Manichiură cu gel — french clasic",
  },
  {
    before: { src: img("gallery-07"), alt: "Unghii scurte, înainte de construcție" },
    after: { src: img("gallery-08"), alt: "Construcție gel stiletto, după" },
    caption: "Construcție pe șablon — formă stiletto",
  },
  {
    before: { src: img("gallery-01"), alt: "Unghii simple, înainte de nail art" },
    after: { src: img("gallery-03"), alt: "Nail art floral pe fundal blush, după" },
    caption: "Nail art floral pe semipermanent",
  },
];

export const gallery: GalleryImage[] = [
  { src: img("gallery-01"), alt: "Manichiură semipermanentă nude" },
  { src: img("gallery-02"), alt: "Unghii cu gel french clasic" },
  { src: img("gallery-03"), alt: "Nail art floral pe fundal blush" },
  { src: img("gallery-04"), alt: "Babyboomer cu accent gold" },
  { src: img("gallery-05"), alt: "Ombre roz pal cu sclipici" },
  { src: img("gallery-06"), alt: "Manichiură roșie clasică" },
  { src: img("gallery-07"), alt: "Design minimal cu linii fine" },
  { src: img("gallery-08"), alt: "Unghii lungi stiletto" },
  { src: img("gallery-09"), alt: "Nail art geometric" },
];
