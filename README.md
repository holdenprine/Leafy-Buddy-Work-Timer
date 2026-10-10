# Leafy Buddy

pnpm workspace TypeScript monorepo.

## Packages

| Package       | Path              | Description                          |
| ------------- | ----------------- | ------------------------------------ |
| `@app/shared` | `packages/shared` | Code shared by `api` and `web`       |
| `@app/api`    | `packages/api`    | Node service, run with `tsx` in dev  |
| `@app/web`    | `packages/web`    | Vite + React + TypeScript web client |

## Requirements

- Node.js 24 or newer
- pnpm 12 (`npm install -g pnpm`, or `corepack enable pnpm`)

## Setup

```sh
pnpm install
cp .env.example .env
```

## Scripts

Run from the repo root to target every package:

| Command          | What it does                              |
| ---------------- | ----------------------------------------- |
| `pnpm dev`       | Runs `web` and `api` in parallel          |
| `pnpm build`     | Builds all packages in dependency order   |
| `pnpm typecheck` | Type-checks all packages                  |
| `pnpm lint`      | Lints the whole repo with ESLint          |
| `pnpm test`      | Runs Vitest in every package              |
| `pnpm format`    | Formats the repo with Prettier            |

Run any script in a single package with `--filter`:

```sh
pnpm --filter @app/web dev
pnpm --filter @app/api test
```

## How `@app/shared` is linked

`api` and `web` depend on `@app/shared` via `workspace:*`. Its `package.json` exposes a custom
`@app/source` export condition that points at `src/index.ts`, so dev, tests, and type-checking use
the TypeScript source directly with no build step. Production builds ignore that condition and use
the compiled `dist/` output, which `pnpm build` produces first.
