# Project Charter — curated companion

<!--
This file is a hand-authored, display-only companion to the authoritative
`.kittify/charter/charter.yaml`. It holds the human *rationale* behind your
project's governance and doctrine.

It is NEVER a charter-resolving input, and `charter generate` NEVER overwrites
it — this starter was written only because the file was absent. Edit it freely.
-->

## Project intent

This repository is a personal technical blog and static content site. Governance
applies to future work; it does not retroactively change completed missions.
Priorities are readable articles, maintainable code, and reliable releases.

## Technology and deployment

- Astro 6, TypeScript, Node.js 22.12+, and Vitest.
- Static deployment target: GitHub Pages.

## Quality and testing

- Run tests relevant to the change.
- For routine code changes, run `npm test` and `npm run check`.
- For changes affecting page rendering, content collections, or static output,
  also run `npm run build`.
- Do not impose a coverage threshold. `frontmatter:check` has known baseline
  drift and must not be the sole acceptance criterion.

## Review and publishing

- Implement on a feature branch.
- Before merging to `main`, obtain an independent review or explicit user
  approval.
- Do not push branches or operate production deployment without explicit user
  authorization.

## Performance

Prefer static generation and avoid unnecessary client-side JavaScript or
runtime network requests. Set numeric performance targets in the relevant
feature scope when needed.
