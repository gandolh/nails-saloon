# STATUS — unde suntem (citește asta întâi)

> Punct de reluare a lucrului după o pauză. Ultima actualizare: **29 mai 2026**.
> Dacă revii la proiect, citește acest fișier, apoi `corpus/todo/ROADMAP.md`
> pentru lista exactă de acțiuni.

## Pe scurt

Proiectul are **două părți**:

1. **Site-ul de prezentare** (`/` — Astro, static) — **gata de cod**. Rămân doar
   date reale + acțiuni de om (vezi mai jos).
2. **Serviciul de automatizare „bots"** (`marketing/bots/` — Node/TS) — **rulează
   complet în mock mode**; codul real (SQLite + sender-e + server webhook) e scris
   în spatele acelorași interfețe. Mai rămâne o **trecere finală de cablare live**
   care se poate face **doar după** ce omul creează conturile/credențialele.

Niciun apel real, niciun token, nicio cheltuială până când cineva pune
`BOTS_MOCK_MODE=false` cu secrete reale.

## Stare verificată (la data de mai sus)

| Componentă | Stare | Verificare |
|---|---|---|
| Site Astro | ✅ cod complet (+ secțiuni igienă, FAQ+JSON-LD, înainte/după, voucher) | `npm run build` → exit 0, 4 pagini |
| Site legal/GDPR | ✅ implementat (vezi `LEGAL.md`) | — |
| Bots — scaffold + 4 boți | ✅ `core/` înghețat + whatsapp/responses/scheduler/campaigns | — |
| Bots — impl real (SQLite, sender-e, server HTTP) | ✅ în spatele interfețelor, doar în afara mock mode | `cd marketing/bots && npm run check` → 66 teste, 0 fail |
| Bots — live | ⛔ neactivat (mock mode) — necesită pașii de om B1–B5 | boot fără secrete eșuează rapid (corect) |

## Cum verifici rapid că totul e ok

```bash
# Site (din rădăcina repo)
npm run build                      # exit 0 = ok

# Bots
cd marketing/bots
npm install                        # @types/node + typescript
npm run check                      # typecheck strict + 66 teste
node --experimental-strip-types src/server.ts   # boot mock: toți boții OFF implicit
```

## Ce a mai rămas (rezumat — detalii în ROADMAP.md)

### Doar date + acțiuni de om (NU cod)
- Înlocuiește placeholder-ele din `src/content/site.ts`: contact real, `legal.*`
  (CUI/J-number de la ANAF/ONRC), `geo`, `formspreeEndpoint`. (`07XX…`,
  `RO00000000`, `REPLACE_ME`, `40700000000` sunt mock.)
- DPA cu Formspree; fotografii reale; recenzii reale; VPS + domeniu;
  Google Business Profile; conturi Meta/TikTok + plată reclame.

### Cod, dar BLOCAT pe acțiunile de om (trecerea finală de cablare live)
Se face **după** ce conturile există, ca să poată fi testat pe ceva real:
- `senders-live.ts` — în `createPausedCampaign`, partea de **ad set + creative + ad**
  (rămasă `TODO(impl)`; are nevoie de un cont de reclame real + ID de creativ).
- `Notifier` — alege canalul (email/WhatsApp) și trimite efectiv (acum doar loghează).
- `whatsapp/handler.ts` — persistă programarea „requested" + notifică Ana;
  template utility/away în afara ferestrei de 24h.
- `scheduler/index.ts` — alertă la eșec de publicare + retry.

> Toate sunt marcate în cod cu `// TODO(impl):` — caută acel șir în
> `marketing/bots/src`. Fiecare e „pereche" cu un pas B din ROADMAP.

## Hărți rapide (unde e ce)

- **Decizii marketing + arhitectura boților**: `corpus/MARKETING.md`
- **Decizii legale/GDPR**: `corpus/LEGAL.md`
- **Design system**: `corpus/DESIGN.md`
- **Listă de acțiuni (agent vs om)**: `corpus/todo/ROADMAP.md`
- **Istoricul a ce s-a rezolvat**: `corpus/todo/TODO.md`
- **Regulile dure ale boților (ToS/GDPR/bani)**: `marketing/bots/COMPLIANCE.md`
- **Planurile pe bot** (ce face fiecare): `marketing/bots/<bot>/todo.md`
- **Cum a fost construit serviciul** (multi-agent): `marketing/bots/SCAFFOLD_PLAN.md`

## Ordinea recomandată la reluare

1. Site live: completează datele reale în `site.ts` → `npm run build` → deploy pe VPS.
2. Primul bot util = **WhatsApp** (remindere = cel mai mare câștig, mai puține
   no-show-uri): fă pașii B1 (cont + token + template-uri aprobate), apoi trecerea
   finală de cod pentru WhatsApp, apoi `BOTS_MOCK_MODE=false` controlat.
3. Apoi responses (B2) → scheduler (B3) → campaigns (B4 + aprobare buget).
