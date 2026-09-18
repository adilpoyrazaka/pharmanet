<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

## Testing

- `npm test` — runs the Vitest logic tests.
- `npm run test:e2e` — builds a production Next.js server, then runs the
  Playwright end-to-end suite against it.
- Locally, the Playwright web server binds `::1`. Under WSL mirrored
  networking, a closed IPv4 port hangs instead of refusing a connection,
  which stalls the pre-start port check. CI sets `CI=1` and binds
  `127.0.0.1` instead, so this does not affect CI runs.
- Node 22 is required, as pinned in `.nvmrc` and `package.json#engines`.
