# CLAUDE.md — kemalakin.github.io

Personal site of Kemal Akın. Astro 7 + Tailwind v4 + MDX, deployed to GitHub Pages by
`.github/workflows/deploy.yml` on every push to `main`. Global working rules live in
`~/.claude/CLAUDE.md`; this file holds repo specifics only.

## Accounts
- Repo: `KemalAkin/kemalakin.github.io` (personal account). Push over SSH via the
  `github-personal` alias: `git@github-personal:KemalAkin/kemalakin.github.io.git`.
- The `gh` CLI on this Mac is a different account; it can read but not change this repo.
  Repo settings and Pages are changed in the GitHub web UI.
- The old Jekyll site is `KemalAkin/kemalakin.github.io-legacy` (local:
  `~/Desktop/personal-projects/kemalakin.github.io-legacy`). Read-only reference.

## Commands
- `npm run dev` — dev server on :4321
- `npm run build` — `astro check` + `astro build` (CI runs the same)
- `npx astro preview` — serve `dist/` (Astro 7 runs it as a daemon; `npx astro preview stop`)
- `node scripts/og.mjs` — regenerate `public/og.png` (social preview) after a design change

## Layout
- `src/site.ts` — name, tagline, social links, nav.
- `src/content.config.ts` — collections: `writing` and `work` (MDX in `src/content/`),
  `talks` / `publications` / `teaching` (YAML in `src/data/`).
- `src/styles/global.css` — design tokens (light/dark), shared classes, prose, Expressive Code dots.
- `src/scripts/` — canvas code: `instrument.ts` (hero, 4 scenes), `thumbs.ts` (work-card
  sketches), `sir.ts` (RK4), `canvas.ts` (colors from tokens, HiDPI, theme subscription).
- `src/components/mdx/` — `Callout`, `Figure`, `Gallery`, `Embed` for use inside MDX.
- `public/images/`, `public/files/` — kept at the legacy paths so old image/PDF links still work.

## Conventions
- Site copy is English. Never name the current employer; keep it generic
  ("financial data, crypto markets"). Do not use the org's Paribu design system here.
- Tokens are CSS variables on `:root`; canvas code reads them through `readColors()`, so new
  colors go in `global.css`, never hard-coded in scripts.
- Client scripts run under `ClientRouter`: initialise on `astro:page-load`, clean up on
  `astro:before-swap`. Respect `prefers-reduced-motion`.
- Math: `remark-math` + `rehype-katex` through the unified processor
  (`@astrojs/markdown-remark`), because Astro 7's default Sätteri processor has no plugin hook.
  Use `aligned` (not `align`) and add row spacing (`\\[1ex]`) for stacked fractions.
- Code blocks: Expressive Code, terminal frame by default; give a `title="file.py"`.
- Old academicpages URLs are mapped in `astro.config.mjs` (`legacyRedirects`). Never remove an entry.
- Drafts: `draft: true` shows a note in `npm run dev` only. Name unpublished files `<slug>.draft.mdx`
  with `slug: <slug>` in front matter; that pattern is gitignored so draft text never reaches the public repo.
- KaTeX CSS is imported in `Article.astro` only; pages with math must use that layout.
- A new note: `src/content/writing/<slug>.mdx`; a project: `src/content/work/<slug>.mdx`
  (`featured: true` + `thumb` puts it on the home grid).
