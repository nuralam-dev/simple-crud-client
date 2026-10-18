<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# Project

Next.js 16 (App Router) + React 19 client for the Express/MongoDB API in the sibling directory `../simple-crud-server`. This folder is its own git repo; sibling folders under `backend/` are unrelated projects.

## Commands

- `npm run dev` — dev server (it rewrites the agent-rules block above, so expect it in diffs)
- `npm run lint` — ESLint (flat config, `eslint-config-next`)
- `npm run typecheck` — `tsc --noEmit`
- `npm run format` — Prettier write
- **There is no test runner.** Verify changes with `npm run lint && npm run typecheck`.

## Backend dependency

- CRUD pages fetch `http://localhost:4000/user` (hardcoded, no env var, no proxy). Start the API before testing them: run `node index.js` in `../simple-crud-server` (needs that dir's `.env` with `DB_USER`/`DB_PASS` for MongoDB Atlas).
- User routes live under `app/usre/` — the misspelling is live in URLs and links (`/usre`). Don't "fix" the folder name without updating every link.

## Conventions & gotchas

- Prettier: no semicolons, double quotes, Tailwind class sorting via `prettier-plugin-tailwindcss`. Run `npm run format` before committing — but note it only matches `**/*.{ts,tsx}`, so `.jsx` files are not auto-formatted.
- Mixed languages: template files are `.tsx`; the CRUD feature code (`app/usre/**`, `components/UserCard.jsx`) is plain `.jsx` and is not typechecked (`allowJs` is on, `checkJs` is off).
- shadcn/ui with the `base-nova` style (Base UI components). Add components with `npx shadcn@latest add <name>`; they land in `components/ui/`. Shared helper is `cn()` in `lib/utils.ts`.
- Tailwind v4, CSS-first config in `app/globals.css` (no `tailwind.config`).
- Path alias: `@/*` → repo root.
- Dark mode toggles with the `d` key (custom hotkey in `components/theme-provider.tsx`, next-themes with `class` attribute).

## Known WIP issues — verify before building on these

- `app/usre/[slug]/page.jsx` destructures `userId` from `params`, but the param is named `slug` (so it fetches `/user/undefined`); it also calls `GET /user/:id` while the server only defines `GET /users/:id`.
- `app/usre/new/page.jsx` calls `redirect()` from `next/navigation` inside a client event handler after an `await`; in client components use `router.push` instead.
