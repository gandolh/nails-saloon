/**
 * Responses bot — inbound auto-reply on Instagram + Facebook.
 * STUB (Phase 1). Phase 2 · Agent B implements this folder ONLY.
 *
 * Plan: ../../../responses/todo.md   Rules: ../../../COMPLIANCE.md
 * INBOUND-ONLY. No `comments`/engagement. Mock senders only in scaffold.
 */

import type { CoreDeps, BotModule, Config } from "../../core/index.ts";

export const createBot = (deps: CoreDeps): BotModule => {
  const log = deps.logger.child("responses");
  return {
    name: "responses",
    enabled: (config: Config) => config.enabled.responses,
    registerWebhooks(_router) {
      // TODO(impl B): inbound `messages` handler for IG + FB; FAQ keyword map;
      // route "Programare" -> WhatsApp link; away message; STOP.
      log.debug("responses.registerWebhooks (stub)");
    },
  };
};
