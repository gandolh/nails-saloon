import { img } from "./images";

export type GalleryImage = {
  src: string;
  alt: string;
};

// Logical image names resolve to SVG mockups now and to real photos later (just
// drop files in public/images/real/ and list them in images.ts › HAS_REAL).
// For an auto service the strongest gallery is REAL shots: lift cu BMW ridicat,
// diagnoză pe laptop, motor desfăcut, before/after. Alt text is in Romanian.
export const gallery: GalleryImage[] = [
  { src: img("gallery-01"), alt: "BMW ridicat pe elevator în atelier" },
  { src: img("gallery-02"), alt: "Diagnoză computerizată conectată la BMW" },
  { src: img("gallery-03"), alt: "Schimb de distribuție pe motor BMW" },
  { src: img("gallery-04"), alt: "Sistem de frânare BMW în timpul reviziei" },
  { src: img("gallery-05"), alt: "Detaliu motor BMW după intervenție" },
  { src: img("gallery-06"), alt: "Echipa atelierului lângă un BMW" },
];
