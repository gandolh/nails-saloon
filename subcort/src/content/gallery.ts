// Gallery strip on the home page. Logical image names resolve via img() to the
// committed SVG mockups (empty/elegant tent interiors + setup scenes — neutral,
// occasion-agnostic, and they sidestep the "no real photos" problem).

export interface GalleryItem {
  /** Logical image base name (see src/content/images.ts). */
  name: string;
  /** Alt text / caption — descriptive, neutral. */
  alt: string;
}

export const gallery: GalleryItem[] = [
  { name: "gallery-01", alt: "Interior de cort pregătit cu mese aranjate" },
  { name: "gallery-02", alt: "Structura cortului montată în curte" },
  { name: "gallery-03", alt: "Iluminat cald în interiorul cortului, seara" },
  { name: "gallery-04", alt: "Pardoseală modulară și pereți laterali" },
  { name: "gallery-05", alt: "Cort de mari dimensiuni cu spațiu pentru invitați" },
  { name: "gallery-06", alt: "Detaliu de montaj: îmbinarea structurii" },
];
