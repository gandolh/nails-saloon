# ana-saloon-bots

Compliant automation service for Ana Saloon: **prepare ad campaigns**
(human-approved spend), **automate inbound responses**, and **schedule posts** —
all via official platform APIs. No engagement automation. See
[COMPLIANCE.md](COMPLIANCE.md) and [SCAFFOLD_PLAN.md](SCAFFOLD_PLAN.md).

> Separate package from the Astro site (this is a long-running Node server; the
> site is static). It is **not** part of `astro build`.

## Status: scaffold (Phase 1 done)

Frozen `core/` contracts + stub bots. **Mock mode only** — no real API calls, no
tokens, no spend. Phase 2 fills in the bots; Phase 3 integrates.

## Stack

- Node ≥22 (repo uses 24), ESM, TypeScript 6 strict.
- Runs `.ts` directly via Node's `--experimental-strip-types` — no build step.
- In-memory state + mock senders in the scaffold; SQLite + real APIs come later.

## Commands

```bash
cd marketing/bots
npm install        # @types/node + typescript only
npm run typecheck  # tsc --noEmit (strict)
npm run test       # node --test (mock-mode unit + smoke tests)
npm run dev        # boots the mock graph (no port opened in scaffold)
```

## Layout

```
src/
├── core/      FROZEN shared contracts (config, types, senders, db, webhook, scheduler)
│   └── index.ts  ← the BotModule contract + barrel; bots import from here
├── server.ts  buildApp() wires enabled bots; mock-mode entrypoint
└── bots/
    ├── whatsapp/    confirmations & reminders        (Phase 2 · Agent A)
    ├── responses/   IG/FB inbound auto-reply          (Phase 2 · Agent B)
    ├── scheduler/   post queue + publish runner       (Phase 2 · Agent C)
    ├── campaigns/   prepare PAUSED ad drafts          (Phase 2 · Agent D)
    └── shared-tests/ mocks, fixtures, smoke test      (Phase 2 · Agent E)
```

## The bot contract (frozen)

Each bot folder exports `createBot(deps: CoreDeps): BotModule`:

```ts
interface BotModule {
  name: BotName;
  enabled(config: Config): boolean;            // its BOT_*_ENABLED kill-switch
  registerWebhooks?(router: WebhookRouter): void;  // INBOUND messages only
  registerJobs?(scheduler: Scheduler): void;       // cron-like jobs
}
```

Phase 2 agents code **only** against `core/` interfaces + `createMockSenders()` /
`createInMemoryDb()`, touch **only** their own `bots/<name>/` folder, and never
edit `core/`. Real API wiring (swap mocks for live senders behind
`config.mockMode`) is a separate task after the scaffold.

## Deploy (later)

One Node process behind the site's existing nginx/Caddy at `BASE_PATH` (e.g.
`/bots`), SQLite file on the VPS, scheduler via systemd timer. No new paid
service. Secrets in `.env` (gitignored); see `.env.example`.
