# Hanzi Steps → Cloudflare Workers + D1

The GitHub Pages application can switch to a standalone Cloudflare backend.
The default build remains on Supabase until the verified cutover. Set the
GitHub Actions repository variable `HANZI_API_URL` to the deployed Worker URL
only after importing and comparing the latest data. Vite chooses separate
Cloudflare transport modules at build time; that build contains no Supabase
client, project URL, RPC requests or Realtime broadcasts. There is no automatic
fallback between providers and no split-brain dual-write path.

## Scope and preservation

Only these eight Hanzi tables move: `username_accounts`, `lesson_lengths`,
`hanzi_sessions`, `mastered_vocab`, `practice_skill_state`,
`practice_attempt_events`, `hanzi_push_subscriptions`, and `hanzi_push_log`.
All fields, historical rows, IDs, timestamp strings and reviewed old lesson
bounds are preserved. Unmapped historical sessions are retained but are not
assigned a guessed username. Supabase's schedule, mail and Engineering
Materials tables and services must remain intact.

Preserve the existing `hanzi_push_config` VAPID public/private key and subject
as Worker secrets (`VAPID_PUBLIC_KEY`, `VAPID_PRIVATE_KEY`, `VAPID_SUBJECT`).
Do not generate a new signing key: installed PWA subscriptions are tied to the
old key. Never place the private key, subscriptions, snapshots, imports or
learner records in plaintext Git files, Actions artifacts, client env values or logs.

Username-only profiles preserve the current access model. The Worker accepts
only existing account mappings, validates checkpoints against server metadata,
preserves the first completion time, rejects cross-account/lesson ID collisions,
and prevents position/completion regression. SQLite triggers atomically apply
practice events; duplicate IDs cannot count twice or be reused with a different
payload. Pending browser queues and retry IDs are unchanged.

Notifications use native Web Crypto (RFC 8291/8292), the current deployed
notification policy, a Taipei hourly schedule at minute 15 and per-recipient
Durable Object invocations. Daily notification slots are claimed before sending
so overlapping jobs cannot send twice. Failed/uncertain slots are not replayed
in that hour. Push requests accept only known browser push services and refuse
redirects. The scheduler is disabled by default. Ordinary clients cannot trigger
scheduled batches or publish widget messages.

## Provision and stage (free plan)

Use an existing Cloudflare account on **Workers Free**. Do not enable a paid
plan, R2 or any other billing service for this migration. A custom domain is
optional; the free `workers.dev` URL is sufficient.

1. Authenticate Wrangler securely. Create a D1 database named `hanzi-steps`.
2. Put its returned ID in `cloudflare/wrangler.jsonc`. Keep `PUSH_ENABLED=false`.
3. Apply `cloudflare/migrations/0001_hanzi.sql` to that empty database and deploy
   the Worker. Its schema starts with `migration_state.ready=false`, so progress
   endpoints fail closed until the import has been verified.
4. Transfer the existing VAPID settings via secrets, with private values supplied
   through stdin or Cloudflare's secret form. Never echo them or put them in
   command arguments, tracked files, frontend variables or logs.
5. Export only the eight Hanzi tables in a single read-only SQL statement. Keep
   that snapshot in ignored private working storage. Do not export other apps.
6. `node scripts/cloudflare-snapshot.mjs PRIVATE.json PRIVATE.sql` produces an
   empty-target-only D1 import. It disables the aggregate trigger while importing
   historical events and then restores it: aggregates are copied exactly,
   without counting imported events twice. It refuses a populated/active target.
7. `node scripts/verify-cloudflare-import.mjs PRIVATE.json` rehearses the import
   and compares every field in a real local Workers/D1 runtime. This is a local
   rehearsal; remote import still needs its own field comparison before cutover.

Wrangler commands must be checked against the installed CLI's `--help` before
running, especially for D1 file imports, secret upload and deployment. The
checked-in database ID is deliberately a placeholder until provisioning.

## Deployment when the shared browser cannot sign in

Use the prepared `Deploy Cloudflare staging backend` GitHub Actions workflow.
The user can configure this from their own authenticated browser:

1. Cloudflare → **My Profile → API Tokens → Create Token → Create Custom Token**.
   Name it `Hanzi Steps deployment`. Scope it to the intended Cloudflare account
   and grant **Account / Workers Scripts / Edit**, **Account / D1 / Edit**, and
   **Account / Account Settings / Read**. No zone, DNS, billing, global API key,
   mail or unrelated application permissions are needed. An expiry can be set
   after the migration window.
2. In `Weather-Mister/hanzi-steps` → **Settings → Secrets and variables → Actions**,
   add repository secrets `CLOUDFLARE_API_TOKEN` (the scoped token) and
   `CLOUDFLARE_ACCOUNT_ID` (the 32-character account ID from Cloudflare).
   Keep token values out of chats, code, logs and screenshots.
3. Once the workflow is on the default branch, trigger it. It creates/reuses
   only the dedicated `hanzi-steps-migration` staging D1, refuses unrelated or
   active databases, applies the schema and deploys the inactive Worker.
   Its summary reports the backend URL and D1 ID. It imports no learner data,
   leaves the readiness gate closed, disables push, and does not switch Pages.

This is provisioning only. Complete the final source freeze, private transfer,
remote field comparison and activation below before setting `HANZI_API_URL`.

The `Migrate Hanzi data to Cloudflare` workflow supports a sealed transfer when
credentials remain exclusively in GitHub secrets. Its `prepare` step creates
a 3072-bit RSA key pair in the inactive D1 and emits only the public manifest.
`scripts/cloudflare-sealed-transfer.mjs` encrypts the final Hanzi snapshot and
existing VAPID settings with RSA-OAEP-SHA256 plus AES-256-GCM, bound to that
specific database, Worker URL and key. Only the encrypted envelope may be
committed as `cloudflare/migration-transfer.sealed.json`; plaintext stays in
ignored private working storage. The private decryption key remains in D1.

The `import` step refuses unfrozen/stale sources, decrypts in memory, imports
using transactional chunks with resumable cursors, compares every field,
tests an imported historical attempt retry, validates current/historical lesson
bounds and uploads the original signing settings through stdin. It logs only
table counts and validation results. `activate` opens readiness and checks all
imported profiles, progress, mastery and widget responses, closes readiness
if those checks fail, and removes the temporary private decryption key after
success. `enable-push` is a separate step after cutover; the original source
scheduler remains disabled. The encrypted envelope can then be removed from
the current tree. Do not add plaintext transfers or private key artifacts.

## Final cutover

Complete these steps as one controlled handoff; a preliminary snapshot alone
is insufficient while the source can still receive writes.

1. Save the existing Hanzi SQL function definitions and scheduler state privately
   for rollback. Briefly freeze **only Hanzi mutations** on the source, and
   pause only `hanzi-push-hourly`. Reads remain available; lesson/practice drafts
   remain on each device for retry. Keep existing usernames resolvable while
   refusing new profile creation during the freeze.
2. Capture a final consistent snapshot after the freeze. If staging already has
   an older import, use a fresh D1 staging database rather than bypassing the
   import guard. Transfer the existing VAPID secrets.
3. Import, compare every field remotely, and run read/username/practice/widget
   checks. Include imported historical attempt retries; aggregates must stay
   unchanged. Keep the source paused if comparison fails; restore the source
   functions to roll back promptly instead of leaving saves blocked.
4. Run `npm run cloudflare:generate` and apply `cloudflare/lesson-lengths.sql`.
   Validate every current core, optional and character-practice bound; retain
   retired and historical bounds. This generated update is separate from the
   exact source-data comparison.
5. Set D1's `migration_state.ready=true` only after validation. Verify a staging
   checkpoint save/reload, account separation, an imported historical completion,
   Taipei streak days, a practice retry, widget JSON and a widget WebSocket.
6. Set repository variable `HANZI_API_URL` to the actual Worker URL, merge the
   migration PR and deploy GitHub Pages. Confirm the live asset loads from the
   new build and all saves/reads go to Cloudflare. Test on an installed PWA and
   another device, including reconnecting pending offline drafts. Never switch
   origins: keeping GitHub Pages preserves local recovery queues and PWA scope.
7. Send an explicitly authorized test notification on a selected subscribed
   device. Verify delivery, then set `PUSH_ENABLED=true` and redeploy. Keep the
   old Hanzi scheduler disabled to avoid duplicate notifications.
8. Point external widgets at the new Worker. Leave old Supabase Hanzi writes
   frozen/read-only during the transition so cached clients cannot fork progress.
   Retain the source data and rollback definitions; do not delete or pause this
   shared Supabase project.

## Widget compatibility

Both `/widget?username=NAME` and `/functions/v1/hanzi-widget?username=NAME`
return the existing v2 JSON payload: streak, today progress/goal, current unit,
colors and next two characters. `?account=ACCOUNT_KEY` remains supported for
existing mapped profiles. No Supabase API key is needed.

Desktop live updates use `wss://WORKER_HOST/widgets/events?account=ACCOUNT_KEY`.
Messages have `{event:'progress',topic:'hanzi-progress:ACCOUNT_KEY',payload:{}}`.
WebSockets are read-only and hibernate; use a reconnecting listener and refresh
widget data on each event. A `ping` message receives `pong`.

Installed Übersicht/Scriptable files need their backend URL updated; they cannot
be changed on a user's desktop by updating this repository. The schedule's
`hanzi-widget` proxy must also be pointed at the Worker to keep its display
current. `cloudflare/compat/hanzi-widget-bridge.ts` provides a transitional
read-only bridge under the existing Supabase function URL: substitute the
verified Worker URL before deploying it, and retain the current platform JWT
setting. It lets old widgets and both schedule versions keep reading current
progress while their URLs are updated. Its old Realtime channel no longer
receives writes; upgrade desktop listeners to the Cloudflare WebSocket for
instant updates. Preserve the schedule's workspace access controls and styling.

## Validation

- `npm run cloudflare:check` — Worker types.
- `npm run cloudflare:test` — real Workers runtime/D1 behavior, concurrent saves,
  retry idempotency, account separation, historical/offline completions, mastery,
  widget updates, encrypted push and scheduling.
- `npm run cloudflare:build` — deploy dry-run and bundle size.
- `VITE_HANZI_API_URL=https://hanzi-api.example.test npm run build:pages` — new
  client build; confirm it contains no Supabase URL/client.
- `npx tsc --noEmit` plus existing progress, practice, streak, widget and notification
  regression tests.
- `scripts/verify-cloudflare-import.mjs` — full snapshot field comparison, no
  imported-event double counting, overwrite guard and readiness gate.

## Rollback

Before any Cloudflare writes, restore the privately saved source function
bodies and scheduler, clear `HANZI_API_URL`, and redeploy Pages. After Cloudflare
has received new writes, first freeze it and reconcile those writes back into
Supabase, preserving IDs and first completion dates, before restoring source
writes. Simply flipping the URL back would lose new progress. Keep offline draft
queues; do not clear caches or browser storage as part of migration.
