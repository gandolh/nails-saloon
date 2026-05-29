/**
 * Scheduler bot — schedule & publish posts (IG/FB/TikTok).
 * STUB (Phase 1). Phase 2 · Agent C implements this folder ONLY.
 *
 * Plan: ../../../scheduler/todo.md   Rules: ../../../COMPLIANCE.md
 * Publishing only (no engagement). Mock ContentPublisher in scaffold.
 */

import type { CoreDeps, BotModule, Config } from "../../core/index.ts";

export const createBot = (deps: CoreDeps): BotModule => {
  const log = deps.logger.child("scheduler");
  return {
    name: "scheduler",
    enabled: (config: Config) => config.enabled.scheduler,
    registerJobs(_scheduler) {
      // TODO(impl C): publish-runner job over due posts (IG create->poll->publish);
      // enforce per-platform caps (IG <=100/24h, TikTok <=25/day).
      log.debug("scheduler.registerJobs (stub)");
    },
  };
};
