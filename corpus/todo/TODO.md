# TODO

## Legal & Compliance — DONE (29 mai 2026)

Audit complet + implementare: vezi [corpus/LEGAL.md](../LEGAL.md).

- [x] **Business info in footer** — denumire, CUI, Reg. Com., capital social, sediu
  (Legea 365/2002 art. 5). Date mock în `src/content/site.ts › legal`.
- [x] **`/confidentialitate` page** — Politică de confidențialitate GDPR (art. 13):
  date colectate (nume, telefon), scop, temei juridic, destinatari (WhatsApp/Meta,
  Formspree), transfer SUA, retenție, drepturi, ANSPDCP.
- [x] **Booking form legal basis fixed** — bifa de consimțământ obligatorie ELIMINATĂ
  (temeiul corect e art. 6(1)(b), nu consimțământ). Înlocuită cu notă informativă +
  link la politică. Adăugată bifă opțională de marketing.
- [x] **Data retention decided** — 12 luni de la ultima programare (30 zile pentru
  solicitări nefinalizate). Documentat în Politica de confidențialitate.
- [x] **`/termeni`** — Termeni și condiții + politică de anulare/no-show.
- [x] **`/cookie-uri`** — Politică de cookie-uri.
- [x] **ANPC SAL** păstrat; **SOL/ODR eliminat** (platforma ODR închisă 20.07.2025).
- [x] **Fonturi auto-găzduite** (fără Google Fonts CDN) — `@fontsource`.
- [x] **Google Maps cu consimțământ** — se încarcă doar la click.

## De completat de proprietar (date reale)

- [ ] Înlocuiește datele mock din `src/content/site.ts`: `legal.*`, contact, `geo`,
  `formspreeEndpoint`.
- [ ] Semnează un **DPA cu Formspree** (GDPR art. 28) — acțiune offline.

## Backlog — conținut & conversie (din auditul competitiv, opțional)

- [ ] Prețuri vizibile pe serviciu (chiar „de la X lei").
- [ ] Secțiune **igienizare/sterilizare** (autoclav, instrumente, dezinfecție) — semnal de încredere important în RO.
- [ ] **FAQ** (durată gel, cum mă programez, produse folosite, anulare, plată).
- [ ] Galerie **înainte/după**; profil echipă; feed Instagram; voucher cadou.
