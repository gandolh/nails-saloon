# presentation-sites

A monorepo for presentation/marketing sites. Each site is a self-contained
project in its own top-level directory.

## Sites

- **[saloon/](saloon/)** — Ana Saloon, a boutique nail salon in Târgu-Jiu
  (Astro + React + Tailwind v4, static). Includes its own docs (`corpus/`),
  the `deploy/` tool (Caddy, sub-path `/saloon`), and the `marketing/bots/`
  automation service. See [saloon/README.md](saloon/README.md) and
  [saloon/corpus/STATUS.md](saloon/corpus/STATUS.md) to get oriented.

> Everything currently in the repo lives under `saloon/` — it is the only site
> implemented so far. New sites get their own sibling directory.

## Working on a site

Each site directory is its own project root (its own `package.json`,
`node_modules`, build, and deploy) — there is no dependency hoisting. Either
`cd` into the site, or use the root passthrough scripts.

```bash
# From the site directory
cd saloon && npm install && npm run dev

# Or from the repo root (passthrough scripts)
npm run saloon:install
npm run saloon:dev
npm run saloon:build
npm run saloon:deploy        # → saloon's deploy:push
npm run saloon -- preview    # run any of saloon's own scripts
```

## Adding a new site

Keep each site self-contained so the repo can hold many without coupling:

1. Create a sibling directory (e.g. `studio/`) with its own `package.json`,
   `node_modules`, and build/deploy — mirror `saloon/`'s layout.
2. Add `<site>:*` passthrough scripts to the root `package.json`, following the
   `saloon:*` pattern (`npm --prefix <site> run <script>`).
3. Add a `<site>: dev server` entry to `.vscode/launch.json` with
   `"cwd": "${workspaceFolder}/<site>"`.
4. List it under **Sites** above, and prefix any of its repo-root-anchored
   `.gitignore` rules with `<site>/`.

