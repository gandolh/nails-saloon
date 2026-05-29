# Roadmap — ce a mai rămas de făcut

Listă unificată a lucrurilor deschise pe tot proiectul (site + serviciul de
bots), la **29 mai 2026**. Împărțită în două:

- **Partea A — poate fi făcută de un agent**: cod / conținut / config pe care un
  agent îl poate scrie și **verifica local** (typecheck, teste, build) fără
  secrete reale, fără bani, fără decizii din lumea reală.
- **Partea B — trebuie făcută de un om**: orice cere credențiale, cheltuială,
  semnături legale, date reale ale firmei, deținerea conturilor sau judecată de
  business. Un agent **nu** poate (și nu trebuie să) facă aceste lucruri.

Multe sarcini de tip „cablare reală" au o **față A și o față B**: agentul scrie
codul + testele cu mock-uri; omul aduce token-ul/credențialul și aprobă pornirea.
Acolo unde e cazul, e notat cu „(pereche cu B-x)".

> Referințe: deciziile în [../MARKETING.md](../MARKETING.md) și [../LEGAL.md](../LEGAL.md);
> regulile boților în `marketing/bots/COMPLIANCE.md`; planurile detaliate în
> `marketing/`. Markerele din cod: caută `TODO(impl)` în `marketing/bots/src`.

---

## Partea A — poate fi făcută de un agent

### A1. Site (Astro) — conținut & conversie
- [ ] **Prețuri pe serviciu** („de la X lei") în `src/content/services.ts` + UI.
  (Valorile reale le dă omul — B7; agentul pregătește structura + afișarea.)
- [ ] **Secțiune igienizare/sterilizare** (autoclav, instrumentar, dezinfecție) —
  componentă nouă + text RO. Semnal de încredere important în RO.
- [ ] **FAQ** (durată gel, cum mă programez, produse, anulare, plată) — componentă
  + conținut, cu `FAQPage` JSON-LD pentru SEO.
- [ ] **Galerie înainte/după** — structură în `src/content/gallery.ts` + UI
  (folosește placeholder-ele până vin pozele reale — B8).
- [ ] **Voucher cadou** — secțiune/mențiune (leagă de secțiunea de loialitate).
- [ ] **Feed/embed Instagram** — doar dacă se poate fără cookie-uri terțe (altfel
  rămâne link); respectă postura din `LEGAL.md` (fără banner de cookie-uri).

### A2. Serviciul de bots — cod care duce scaffold-ul spre „gata de producție"
Toate au mock-uri; agentul scrie impl-ul real **în spatele aceleiași interfețe**
și îl ține testabil. (Pornirea live e B1–B5.)
- [ ] **db pe SQLite** — implementează interfața `Db` peste SQLite (`node:sqlite`
  sau `better-sqlite3`), inclusiv migrațiile și `purgeExpired`. Înlocuiește
  in-memory în spatele `config.mockMode`. (`core/db.ts`)
- [ ] **`isCalendarFull` real** — acum întoarce mereu `false` (`core/db.ts:86`);
  logica de sloturi libere pe baza programărilor.
- [ ] **Server HTTP / webhook** — `server.ts:77 TODO(real-impl)`: dacă `!mockMode`,
  `assertSecretsForLive`, deschide portul pe `config.basePath`, montează
  routerul de webhook (GET handshake + POST cu verificare semnătură).
- [ ] **Sender real WhatsApp Cloud API** — în spatele `WhatsAppSender`
  (mesaj în fereastra 24h + `sendTemplate`). (pereche cu B1)
- [ ] **Sender real Meta Messaging** — `MetaMessagingSender.sendReply` +
  `setIceBreakers` (Messenger / IG Messaging). (pereche cu B2)
- [ ] **ContentPublisher real** — pipeline IG create→poll→publish, FB Page,
  TikTok Content Posting. (`scheduler/index.ts:138`) (pereche cu B3)
- [ ] **MarketingClient real** — preset → params Meta Marketing API, campanie
  `PAUSED`, `special_ad_categories: []`, deep-link Ads Manager în notificare.
  (`campaigns/index.ts:95,117,191`) (pereche cu B4)
- [ ] **Notifier real** — canalul de notificare către om (email/WhatsApp) pentru
  aprobarea campaniilor + alerte de eșec la publicare (`scheduler/index.ts:160`).
- [ ] **Idempotență** confirmări/remindere — flag-uri `reminderSentAt` /
  `confirmationSentAt` ca să nu se retrimită (`whatsapp/jobs.ts:71,100`).
- [ ] **Sursă config pentru linkul WhatsApp** din responses — acum e placeholder
  hardcodat (`responses/replies.ts:15`); ia-l din `config`/site.
- [ ] **Scheduler bazat pe timere reale** — variantă cu systemd-timer/cron în
  spatele aceleiași interfețe `Scheduler` (acum e trigger manual, determinist).
- [ ] **`.env.example` ↔ `config.ts`** — păstrează-le sincronizate când apar
  variabile noi din task-urile de mai sus.
- [ ] **CI** (opțional) — workflow care rulează `npm run check` pe `marketing/bots/`.

### A3. Documentație & igienă
- [ ] **Actualizează `/confidentialitate`** când un bot intră live cu un nou
  flux/împuternicit (Meta/TikTok), conform `LEGAL.md` + `COMPLIANCE.md #11`.
  (Agentul scrie textul; omul confirmă datele firmei.)
- [ ] La fiecare bot care ajunge live, **bifează** elementele din
  `marketing/bots/<bot>/todo.md` și mută în corpus ce devine „decizie".

---

## Partea B — trebuie făcută de un om

### B0. Pre-publicare site (din `LEGAL.md` → „De completat de proprietar")
- [ ] **Date reale ale firmei** în `src/content/site.ts › legal`: `legalName`,
  `cui`, `regNumber`, `shareCapital`, `form`. (Date oficiale ANAF/ONRC.)
- [ ] **Date reale de contact**: `phone`, `phoneE164`, `whatsappE164`, `email`,
  `address`, `postalCode`. (Acum sunt placeholder „07XX…", `REPLACE_ME`.)
- [ ] **`geo.lat` / `geo.lng`** reale pentru hartă.
- [ ] **Formspree**: creează formularul, pune `formspreeEndpoint` real, și
  **semnează DPA cu Formspree** (GDPR art. 28) — acțiune offline.

### B1–B5. Conturi, credențiale & app review (necesare pentru orice bot live)
- [ ] **B1 — WhatsApp**: număr WhatsApp Business + Meta app + WhatsApp product;
  token permanent + phone number ID; **submit template-uri** spre aprobare
  (`confirmare_programare`, `reminder_programare`, `multumire_recenzie`).
- [ ] **B2 — Instagram/Facebook**: cont IG **Business/Creator** legat de o
  **Pagină** Facebook; permisiuni Messaging pe Meta app (eventual app review).
- [ ] **B3 — publicare**: permisiuni Content Publishing (IG/FB) + cont **TikTok
  for Developers** cu acces Content Posting API (necesită aprobare TikTok).
- [ ] **B4 — reclame**: Business Manager + cont de reclame + permisiune
  `ads_management`; **metodă de plată** atașată.
- [ ] **B5 — secrete în `.env`** pe VPS (niciodată în git): app secret, token-uri,
  phone/ad-account IDs, `NOTIFY_TO`. Apoi `BOTS_MOCK_MODE=false` + flag-urile
  `BOT_*_ENABLED` / `ADS_SPEND_ENABLED` pornite controlat.

### B6. Operare reclame (judecată de business + bani)
- [ ] **Aprobă fiecare campanie** pregătită de bot (PAUSED → live în Ads Manager).
  Boții nu pornesc niciodată singuri cheltuiala (decizie de proprietar).
- [ ] **Plafon de buget lunar** + radius real al zonei de acoperire + oferta de
  primă vizită (intră în `config` / presets, dar **decizia** e a omului).
- [ ] **Review săptămânal**: cost pe programare, ce creativ/ofertă a mers,
  oprește campaniile de lead când agenda e plină.

### B7. Conținut & date reale
- [ ] **Prețurile reale** pe serviciu (pentru A1).
- [ ] **Fotografii reale** ale lucrărilor + ale Anei (înlocuiesc placeholder-ele
  SVG din `public/images/`) — pentru galerie, hero, înainte/după.
- [ ] **Recenzii reale** (acum sunt mostre hardcodate în `testimonials.ts`).
- [ ] **Clipuri/Reels** pentru motorul organic + creative pentru reclame.

### B8. Infrastructură & legal de operare
- [ ] **VPS + domeniu** (`anasaloon.ro`), nginx/Caddy, TLS; deploy `dist/` +
  procesul de bots pe subpath `/bots`.
- [ ] **Google Business Profile** creat & verificat (cel mai bun ROI local) —
  cere acces la afacere și verificare.
- [ ] **Deținerea conturilor** (Ana vs Cristian) pentru Meta Business + TikTok.

---

## Notă de prioritizare (sugerată)

1. **B0** (date reale) + **A1** (prețuri/FAQ/sterilizare) → site gata de publicat.
2. **A2 WhatsApp sender + SQLite + server** ⟂ **B1** → primul bot util (remindere
   = cel mai mare câștig: mai puține no-show-uri).
3. **A2 responses** ⟂ **B2** → auto-reply IG/FB pe lead-urile din reclame.
4. **A2 scheduler** ⟂ **B3**, apoi **campaigns** ⟂ **B4 + B6**.

Ordinea respectă fazarea din `marketing/README.md` (ads/organic → WhatsApp →
orchestrator → responses → scheduler → campaigns).
