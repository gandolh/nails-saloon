/**
 * Service entrypoint — FROZEN-ish (Phase 1; Phase 3 finalizes wiring).
 *
 * Boots config -> logger -> db -> senders, builds every bot via its
 * `createBot`, registers the ENABLED ones' webhooks + jobs. `buildApp` is
 * exported (no side effects) so the shared-tests harness can boot the whole
 * thing in mock mode.
 *
 * Scaffold ALWAYS runs in mock mode: no real HTTP server, no live API calls.
 */

import {
  loadConfig,
  createLogger,
  createInMemoryDb,
  createMockSenders,
  createWebhookRouter,
  createScheduler,
  type CoreDeps,
  type BotModule,
  type Config,
} from "./core/index.ts";

import { createBot as createWhatsApp } from "./bots/whatsapp/index.ts";
import { createBot as createResponses } from "./bots/responses/index.ts";
import { createBot as createScheduling } from "./bots/scheduler/index.ts";
import { createBot as createCampaigns } from "./bots/campaigns/index.ts";

/** Factories for every bot. Phase 3 keeps this the single registration point. */
const BOT_FACTORIES = [createWhatsApp, createResponses, createScheduling, createCampaigns];

export interface App {
  config: Config;
  bots: BotModule[];
  router: ReturnType<typeof createWebhookRouter>;
  scheduler: ReturnType<typeof createScheduler>;
  sentLog: ReturnType<typeof createMockSenders>["log"];
  deps: CoreDeps;
}

/**
 * Build the app graph without starting any server. In the scaffold this always
 * uses in-memory db + mock senders. Real db/senders swap in here later, gated
 * on `config.mockMode`.
 */
export function buildApp(config: Config = loadConfig()): App {
  const logger = createLogger(config.logLevel, "bots");
  const db = createInMemoryDb();
  const { senders, log: sentLog } = createMockSenders();
  const deps: CoreDeps = { config, logger, db, senders };

  const router = createWebhookRouter();
  const scheduler = createScheduler();

  const bots = BOT_FACTORIES.map((make) => make(deps));
  for (const bot of bots) {
    if (!bot.enabled(config)) {
      logger.info("bot disabled", { bot: bot.name });
      continue;
    }
    bot.registerWebhooks?.(router);
    bot.registerJobs?.(scheduler);
    logger.info("bot registered", { bot: bot.name });
  }

  return { config, bots, router, scheduler, sentLog, deps };
}

/** Entrypoint. Scaffold: build the graph and report; do not open a port. */
async function main(): Promise<void> {
  const app = buildApp();
  app.deps.logger.info("ana-saloon-bots booted (mock scaffold)", {
    mockMode: app.config.mockMode,
    enabledBots: app.bots.filter((b) => b.enabled(app.config)).map((b) => b.name),
    jobs: app.scheduler.jobNames(),
  });
  // TODO(real-impl): if !mockMode, assertSecretsForLive, open HTTP server on
  // config.port at config.basePath, swap in SQLite db + real senders, start
  // timer-driven scheduler.
}

// Run only when executed directly (not when imported by tests).
if (import.meta.url === `file://${process.argv[1]}`) {
  main().catch((err) => {
    console.error(JSON.stringify({ level: "error", msg: "boot failed", err: String(err) }));
    process.exit(1);
  });
}
