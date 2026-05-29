/**
 * WhatsApp bot — booking confirmations & reminders.
 * STUB (Phase 1). Phase 2 · Agent A implements this folder ONLY.
 *
 * Plan: ../../../whatsapp/todo.md   Rules: ../../../COMPLIANCE.md
 * Code against core interfaces + mock senders. No real API calls in scaffold.
 */

import type { CoreDeps, BotModule, Config } from "../../core/index.ts";

export const createBot = (deps: CoreDeps): BotModule => {
  const log = deps.logger.child("whatsapp");
  return {
    name: "whatsapp",
    enabled: (config: Config) => config.enabled.whatsapp,
    registerJobs(_scheduler) {
      // TODO(impl A): register reminder + confirmation jobs (utility templates).
      log.debug("whatsapp.registerJobs (stub)");
    },
    registerWebhooks(_router) {
      // TODO(impl A): inbound booking-keyword handler + STOP handling.
      log.debug("whatsapp.registerWebhooks (stub)");
    },
  };
};
