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

- App Router; pages are **server components**. Client code lives only in small
  components (`Navbar`, `Footer`, `ContactButton`, `ContactModal`, `CopyButton`).
- `app/layout.tsx` renders the shared `Navbar` and `Footer` around every page.
- `app/page.tsx` — home: hero (name + `HeroEpisode`), projects, experience, skills, education.
- `app/projects/data.ts` — **single source of project data** (`PROJECTS`), used by
  the home page and the case studies.
- `app/projects/[id]/page.tsx` — case-study pages, prerendered via
  `generateStaticParams` with `dynamicParams = false`. `params` is a Promise.
- `app/demos/page.tsx` only redirects old `/demos?project=<id>` links to
  `/projects/<id>` (or `/#projects`).
- Contact: use `<ContactButton>`; it owns the native `<dialog>` (`ContactModal`)
  and portals it to `<body>`. Shared URLs/email live in `app/components/links.ts`.
- `HeroEpisode` (agent GIF + illustrative score/curiosity curves) and
  `Diagrams.tsx` (`RndSchematic`, `TrafficSchematic`) are the project visuals.
  The curves and schematics are labelled as illustrative — keep them honest;
  don't add numeric results that aren't from real training runs.
- Icons are Google **Material Symbols**, loaded in `app/layout.tsx` with an
  `icon_names=` allowlist (alphabetical). **Add a new icon's name there** or it
  renders as text. Fonts: **Newsreader** (display/headings) and **Manrope**
  (body), both via `next/font`.

## Styling

- **Tailwind v4** (CSS-first config via `@theme` in `app/globals.css`) — there is
  **no `tailwind.config.js`** and no `content` array. Theme color/font tokens live
  in `@theme`.
- Pages mix Tailwind utilities with **per-page CSS Modules** (`home.module.css`,
  `projects/[id]/project.module.css`, `navbar.module.css`, `layout.module.css`, plus the shared
  component modules). Keep both conventions.
- Current design system is **neutral/editorial and minimal**: warm near-black
  background (`--color-background: #121211`), hairline `--color-outline` rules,
  single brass accent `--color-primary: #c9a87c` (no per-project accent colors).
  Small radii (0.375rem controls, 0.625rem media), no pill tags, no card hover
  lifts, no section eyebrow labels. Body text weight 400.
- Every section uses the same frame: `width: calc(100% - 3rem); max-width: 73rem`
  so rules align with content; the navbar/footer match it.
- `:focus-visible` is styled globally; keep interactive elements keyboard-visible.

## Motion

- One vocabulary: **lines draw in left to right, things settle into place**
  (like a training run converging). Don't add unrelated effects (bounces, glows,
  parallax, generic fade-ups on everything).
- Scroll reveals: wrap in `<InView>` (sets `data-inview`) and use the global
  classes in `globals.css` — `.rule` (top hairline that draws), `.mask` (text
  rises from its baseline; needs a single child), `.reveal` (fade-rise). Stagger
  with an inline `--d` delay. Don't nest `InView`s: `[data-inview="true"]`
  matches any ancestor, so an outer one would trigger the inner content early.
- Hidden states apply only under `html.js` (set by an inline script in
  `layout.tsx`) and `prefers-reduced-motion: no-preference`. Keep both guards.
- Diagram animation (RND pulses via SVG SMIL, traffic scan/lock-on) lives in
  `diagrams.module.css`; pulses are `display: none` under reduced motion because
  SMIL ignores that media query.
- Route transitions use React `<ViewTransition>` (`experimental.viewTransition`
  in `next.config.ts`). Project titles share `name="project-title-<id>"`
  between the home row and the case-study `h1`. Links into a case study pass
  `transitionTypes={["nav-forward"]}`, links back pass `["nav-back"]`. The
  header has `viewTransitionName: "site-header"` so it never slides.
- The old `stitch_neural_rl_portfolio/*/DESIGN.md` files describe a superseded
  cyan "AI" theme and are **outdated** relative to the code — trust the live tokens.

## Gotchas

- `package.json` has two stray dependencies, `"20"` and `"node"`, that are not real
  imports — don't treat them as meaningful.
- `portfolio/.next/` contains stale committed build artifacts from before the app
  was moved to the repo root; ignore it. `stitch_neural_rl_portfolio/` and
  `next-env.d.ts` are gitignored.
