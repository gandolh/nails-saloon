# Ana Saloon

Presentation site for **Ana Saloon** — a boutique nail salon in Târgu-Jiu, Gorj, România.

Built with **Astro + React + Tailwind v4**. Pure static output, hostable on any web server (nginx, Caddy, etc.).

## Stack

- **Astro 6** — static site generator
- **React 19** — interactive islands (mobile menu, booking form)
- **Tailwind CSS v4** — design tokens defined in `src/styles/global.css` via `@theme`
- **Playfair Display** + **Manrope** — loaded from Google Fonts CDN
- **Formspree** + **WhatsApp deep-link** — appointment booking

## Project structure

```
.
├── ADR.md                    # Architecture decisions & spec
├── corpus/DESIGN.md          # Design system (color, typography, tokens)
├── public/
│   ├── favicon.svg
│   └── images/               # SVG placeholders (to be replaced by photos)
├── scripts/
│   └── gen-placeholders.mjs  # Re-generate SVG placeholders
└── src/
    ├── components/           # Section components (.astro) + React islands (.tsx)
    ├── content/              # Hardcoded data (services, testimonials, site config)
    ├── layouts/Base.astro    # Document shell, fonts, SEO, JSON-LD
    ├── pages/index.astro     # Single-page site
    └── styles/global.css     # Tailwind import + design tokens + components
```

## Commands

| Command            | Action                                           |
| ------------------ | ------------------------------------------------ |
| `npm install`      | Install dependencies                             |
| `npm run dev`      | Dev server at http://localhost:4321              |
| `npm run build`    | Build to `./dist/`                               |
| `npm run preview`  | Preview the production build locally             |

## Deploy

Build produces a fully static `dist/` directory. Copy it to any VPS and serve with nginx:

```nginx
server {
    listen 80;
    server_name anasaloon.ro;
    root /var/www/anasaloon/dist;
    index index.html;
}
```

## Replacing placeholders

Before going live, replace these in `src/content/site.ts`:

- `phone` / `phoneE164` / `whatsappE164` — real number
- `email`, `address`, `postalCode`
- `social.instagram` / `facebook` / `tiktok` — real handles
- `geo.lat` / `geo.lng` — exact salon coordinates
- `formspreeEndpoint` — create a free form at https://formspree.io and paste the URL

Images in `public/images/` are SVG placeholders. Drop in real JPG/WebP photos with the same filenames, then update extensions in `src/content/gallery.ts` and the `<img src>` in `Hero.astro` / `About.astro`.

## Design system

See [corpus/DESIGN.md](corpus/DESIGN.md) for tokens and [ADR.md](ADR.md) for decisions.
