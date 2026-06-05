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
`node_modules`, build, and deploy). `cd` into it first:

```bash
cd saloon
npm install
npm run dev
```
