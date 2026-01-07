# Repository Guidelines

## Project Structure & Module Organization
- `app/`: Next.js App Router entry (`app/page.tsx`, `app/layout.tsx`) and global styles (`app/globals.css`).
- `components/`: Feature components; `components/ui/` contains shared UI primitives (shadcn-style).
- `hooks/`: Reusable React hooks (e.g., `use-toast`, `use-mobile`).
- `lib/`: Utilities and helpers (e.g., `lib/utils.ts`).
- `public/`: Static assets (icons, placeholders).
- `styles/`: Additional global styles (`styles/globals.css`).
- Config: `next.config.mjs`, `postcss.config.mjs`, `tsconfig.json`, `components.json`.

## Build, Test, and Development Commands
- `pnpm install` — install dependencies.
- `pnpm dev` — run Next.js dev server at `http://localhost:3000`.
- `pnpm build` — production build (`.next/`).
- `pnpm start` — start built app.
- `pnpm lint` — run ESLint across the repo.

Tip: Use Node 18+ and pnpm. Example: `corepack enable && pnpm -v`.

## Coding Style & Naming Conventions
- Language: TypeScript (strict); Next.js (App Router); React.
- Indentation: 2 spaces; prefer no semicolons; single quotes in TS where practical.
- Components: PascalCase in `components/` (e.g., `Header.tsx`, `Editor.tsx`).
- Hooks: `useX` naming in `hooks/` (e.g., `use-toast.ts`).
- Utilities: camelCase in `lib/` (e.g., `cn` in `lib/utils.ts`).
- Paths: use alias `@/*` per `tsconfig.json`.
- Styles: Tailwind CSS v4; compose classes via `cn(...)` when dynamic.

## Testing Guidelines
- No formal test setup yet. For new core logic, add tests using Jest or Vitest + React Testing Library.
- Place tests alongside files (`Component.test.tsx`) or under `__tests__/`.
- Cover critical behaviors: editor interactions, form validation, and utilities.
- When added, expose `pnpm test` to run the suite.

## Commit & Pull Request Guidelines
- Commits: follow Conventional Commits (e.g., `feat:`, `fix:`, `chore:`). Keep changes focused.
- PRs: include a clear description, linked issue(s), screenshots/GIFs for UI, and test steps. Note breaking changes.
- Keep PRs small; update docs when adding components, hooks, or config.

## Security & Configuration Tips
- Do not commit secrets. Use `.env.local` for future runtime config.
- `next.config.mjs` uses `images.unoptimized` and ignores TS build errors; ensure your code type-checks locally even if CI allows builds.
- Optimize assets in `public/` and prefer Next Image where possible.

