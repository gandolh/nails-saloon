/**
 * Campaigns bot — prepare PAUSED ad drafts for human approval.
 * STUB (Phase 1). Phase 2 · Agent D implements this folder ONLY.
 *
 * Plan: ../../../campaigns/todo.md   Rules: ../../../COMPLIANCE.md (money safety)
 * NEVER creates ACTIVE campaigns. Budget ceilings + spend kill-switch enforced.
 * Mock MarketingClient + Notifier in scaffold.
 */

import type { CoreDeps, BotModule, Config } from "../../core/index.ts";

export const createBot = (deps: CoreDeps): BotModule => {
  const log = deps.logger.child("campaigns");
  return {
    name: "campaigns",
    enabled: (config: Config) => config.enabled.campaigns && config.adsSpendEnabled,
    registerJobs(_scheduler) {
      // TODO(impl D): recurring preset -> PAUSED CampaignDraft (budget-capped) ->
      // human-approval notification + audit log; auto-pause-on-full-calendar.
      log.debug("campaigns.registerJobs (stub)");
    },
  };
};
