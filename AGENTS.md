# AGENTS.md

## Next.js 16 — not the Next.js you know

This project uses **Next.js 16.2.4** and **React 19.2.4**, which have breaking
changes vs. older versions. Before writing any route/layout/component code, read
the relevant guide in `node_modules/next/dist/docs/` (`01-app`, `02-pages`,
`03-architecture`). Heed deprecation notices; do not copy pre-16 patterns from
memory.

## Commands

- `pnpm dev` / `pnpm build` / `pnpm start` — Next dev/build/serve (pnpm, lockfile v9)
- `pnpm lint` — ESLint flat config (`eslint.config.mjs`, next core-web-vitals + typescript)
- There is **no typecheck script**; `lint` is the only verification step.

## Architecture

- Two-page App Router app, both pages are `"use client"`:
  - `app/page.tsx` — home (hero, skills, work, experience, footer)
  - `app/demos/page.tsx` — project showcase; project data is **hardcoded** in the
    `DEFAULT_PROJECTS` array (4 entries: `dave-rl`, `rag-llm`, `traffic-opt`, `maze-runner`).
- Shared components live in `app/components/`: `Navbar.tsx`, `Footer.tsx`, and
  `ContactModal.tsx` (with `*module.css` files). Use these instead of duplicating
  footer/modal markup on a page.
- The demos page treats the URL as source of truth: it reads the `project` query
  param via `useSearchParams()` and updates it with `router.replace(...)` on
  selection. That component is wrapped in a `<Suspense>` boundary (required for
  static prerender). Don't reintroduce `setState`-inside-`useEffect` to read the URL.
- Icons are Google **Material Symbols**: `<span className="material-symbols-outlined">icon_name</span>`
  (loaded in `app/layout.tsx`). Fonts: **Space Grotesk** (display/headline) and
  **Manrope** (body/label), both via `next/font`.

## Styling

- **Tailwind v4** (CSS-first config via `@theme` in `app/globals.css`) — there is
  **no `tailwind.config.js`** and no `content` array. Theme color/font tokens live
  in `@theme`.
- Pages mix Tailwind utilities with **per-page CSS Modules** (`home.module.css`,
  `demos.module.css`, `navbar.module.css`, `layout.module.css`, plus the shared
  component modules). Keep both conventions.
- Current design system is **neutral/editorial**: warm near-black backgrounds
  (`--color-background: #121211`), layered neutrals, single brass accent
  `--color-primary: #c9a87c`. No cyan, no glow/scanline/CRT effects, no monospace
  labels, no blanket `text-transform: uppercase` — use normal casing and Manrope.
- The old `stitch_neural_rl_portfolio/*/DESIGN.md` files describe a superseded
  cyan "AI" theme and are **outdated** relative to the code — trust the live tokens.

## Gotchas

- `package.json` has two stray dependencies, `"20"` and `"node"`, that are not real
  imports — don't treat them as meaningful.
- `portfolio/.next/` contains stale committed build artifacts from before the app
  was moved to the repo root; ignore it. `stitch_neural_rl_portfolio/` and
  `next-env.d.ts` are gitignored.
