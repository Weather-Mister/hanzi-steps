# GitHub Pages + Supabase migration

## Current state (20 September 2026)

The original Sites snapshot is commit `41f57f7`. Its 23 units, 159 lessons,
235 taught characters, stroke geometry, CSS, and public assets are unchanged.
The Pages entry point uses the same `LearningApp` component. Only the account
panel, progress transport, and hosting entry point change. The original Sites
entry point and routes remain available for rollback; nothing was published
back to Sites.

Supabase project: `evckshjtzikuusnkdnjn` (`hanzi`). All 71 source records
across three account keys, including 64 completed attempts, were compared
field by field with the live Sites database and match exactly. No learner
records, emails, service keys, or OAuth secrets are stored in this repository.

**Not yet a completed cutover:** Google is currently disabled in Supabase and
GitHub Pages must be enabled. Actual Google sign-in, signed-in browser behavior,
and the published interface still need end-to-end verification after setup.
Keep using the existing site until those checks pass. If practice continues
there, reconcile its latest rows into Supabase again before cutting over.

## Application and database

`npm ci` then `npm run dev:pages` runs the Pages client. `npm run build:pages`
validates curriculum and character coverage, then produces `dist-pages/` with
the `/hanzi-steps/` asset base. `.github/workflows/pages.yml` builds and deploys
main. Original Sites scripts are retained.

`pages/supabase.ts` contains only the public URL and publishable key. Google
OAuth uses PKCE and returns to the root of the Pages application. Supabase's
client restores and refreshes sessions. An authenticated RPC links a verified
Google identity to the existing account hash using the original normalization
and namespace. Use the **same email address** used on the old site to recover
that account's progress. Different emails are separate accounts; do not merge
them automatically.

RLS limits reads to that verified account. Clients cannot insert or update
tables directly. The save RPC validates checkpoints and ownership, refuses
regression and account switching, and preserves first completion dates and
Taiwan-time streak days. Existing per-account draft queues and retry behavior
are reused.

Browser preferences and unsynced drafts belong to their original origin and
cannot automatically move to github.io. Sync pending practice on the old site
before switching; personal display preferences may need to be selected again.

`supabase/schema.sql` is a reproducible snapshot for a **new, empty** Supabase
project, not an instruction to reapply it over the live database.
`supabase/verify-progress.sql` tests synthetic accounts inside a transaction
and rolls all test data back. It passed against the deployed database, covering
verified identity, account isolation, checkpoint validation, retries, and dates.
The security advisor on the original staging project returned no findings; the new project has passed the same transactional security tests.

## Remaining configuration

1. GitHub repository Settings → Pages → Source: **GitHub Actions**.
2. In Google Cloud, create a Web application OAuth client for Hanzi Steps.
   - JavaScript origin: `https://weather-mister.github.io`
   - Redirect URI: `https://evckshjtzikuusnkdnjn.supabase.co/auth/v1/callback`
   - Configure the consent screen and audience; while in Testing, add the
     intended Google accounts as test users.
3. In this Supabase project's Authentication → Sign In / Providers → Google,
   enter that client ID and secret and enable Google. Keep secrets out of Git.
4. Completed: Authentication → URL Configuration:
   - Site URL: `https://weather-mister.github.io/hanzi-steps/`
   - Redirect allowlist: the exact same URL.
5. Rerun the Pages workflow if its initial deployment failed before enablement.
6. Verify Google sign-in using the original email, historical progress and
   streaks, a new checkpoint saved and reloaded, sign-out, mobile layout,
   handwriting, and unit selection. Reconcile any newly saved Sites records.

The new project schema and 413 lesson lengths are installed. Its transactional
security tests passed and rolled back all test data. The site URL and exact
redirect allowlist are configured for GitHub Pages.

## Widgets

The migrated read-only streak endpoint is:
`https://evckshjtzikuusnkdnjn.supabase.co/functions/v1/hanzi-widget?account=ACCOUNT_KEY`

It returns the original four fields (`current`, `practicedToday`, `day`,
`capturedAt`) and uses the original streak implementation. Existing widgets
must change their server URL to leave Sites completely. This deployed function
has platform JWT verification enabled: send `Authorization: Bearer <public
legacy anon JWT>` using the project's public anon key, never a service key or
Google credential. Unknown valid account identifiers return an empty summary;
invalid identifiers are rejected. The account hash identifies a public streak
summary; it grants no access to write progress or read detailed checkpoints.

## Verification completed

- Pages production build and TypeScript check.
- Unchanged curriculum/CSS/public assets/stroke-data comparison to `41f57f7`.
- All 413 current, historical, and character-practice lesson lengths match
  the deployed validation table.
- 29 existing progress, streak, widget, and curriculum tests passed; one old
  architecture migration test was already skipped.
- Live transactional Supabase integration test passed, with no test rows kept.
- All 71 imported rows matched the source in staging and were copied into the new project (71 records, three accounts, 64 completions).

Account-provider activation and publication are setup gates, not completed tests.
