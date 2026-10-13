Continue the Hanzi Steps Cloudflare migration for Weather-Mister/hanzi-steps. The main migration is already deployed; finish the remaining integration and device checks. Inspect current state first and proceed without asking me to repeat setup.

Completed on 13 October 2026:
- PR #160 merged. Production code commit: 78492d31717de3034f8fdf8ddaf253303b497808.
- Frontend: https://weather-mister.github.io/hanzi-steps/
- Backend: https://hanzi-steps-api.weatherisgood06.workers.dev
- D1: hanzi-steps-migration, ID eb12d6dd-e8f7-4636-b0e9-c6ba772896bb.
- GitHub repository secrets CLOUDFLARE_API_TOKEN and CLOUDFLARE_ACCOUNT_ID are configured. Repository variable HANZI_API_URL points to the Worker. Credentials stay in GitHub secrets; never ask me to paste them.
- The final frozen snapshot (2026-10-13T02:31:21.451189+00:00) was imported and compared field-for-field remotely across all eight Hanzi tables: 4 profiles, 1232 lesson metadata rows, 311 sessions, 169 mastered entries, 956 mastery states, 1950 practice events, 9 push subscriptions, 39 notification history rows.
- All 1218 current lesson bounds plus historical/retired bounds passed. Existing account IDs, completion dates, retry IDs and VAPID keys were preserved.
- Cloudflare readiness is active. Live saves/reloads, delayed-save protection, account isolation, completion study days, practice retry idempotency and WebSocket widget events passed using disposable probe profiles that were cleaned up.
- Cloudflare reminders are enabled. Original Supabase Hanzi cron is paused.
- Successful GitHub runs: final import 38337495649; activation 38337804912; production Worker 38338272886; Pages 38338272889; reminder activation 38338492704.
- 29 Cloudflare tests passed. Read docs/CLOUDFLARE_MIGRATION.md and scripts/cloudflare-migrate-live.mjs.

Important source state:
Supabase project evckshjtzikuusnkdnjn also serves schedule/mail/Engineering Materials. Do not delete or pause it. Only the eight Hanzi tables have hanzi_cloudflare_write_freeze triggers; only hanzi-push-hourly is paused. Keep source Hanzi writes frozen to prevent stale clients creating split progress. Never unfreeze or flip the frontend back without reconciling any new Cloudflare writes.

Continuation verification — 13 October 2026 (read before working further):
- GitHub-hosted Eren schedule integration is complete. Weather-Mister/ntu-mail-push PR #82 merged as 940f76f23ece63d892e78b94885ab400bcb7089e. Both the normal schedule (sites/eren/app.js) and skeuomorphic schedule (sites/eren/skeuo-runtime.js) now GET https://hanzi-steps-api.weatherisgood06.workers.dev/widget?username=eren directly. Unrelated paired schedule/mail APIs still use their existing backend and neither schedule design was changed.
- GitHub Pages deploy run 38339639812 passed. Its deployment job performed a live HTTP-200/v2 JSON widget check with Origin https://weather-mister.github.io and verified the Cloudflare CORS response; Pages deployment succeeded. Schedule PWA script/cache versions were bumped without changing the origin or deleting client storage.
- The user supplied the CURRENT Scriptable Hanzi widget source in conversation. It still references the old, blocked Supabase function. Only the URL and unneeded Supabase authorization need changing: CONFIG.DATA_URL = "https://hanzi-steps-api.weatherisgood06.workers.dev/widget?username=eren"; delete CONFIG.ANON_KEY and replace request.headers with { Accept: "application/json" }. Preserve all render code, existing hanzi-widget-cache-v4.json, palette, OpenHanzi shortcut and refresh policy. A one-time on-device Scriptable updater with backup was provided in conversation and passed a simulated-file dry run, but has NOT been run on the user's iPhone; its installation is not confirmed.
- The user explicitly removed Übersicht from scope. Do not work on Übersicht unless asked again. Do not use Hatchable for this project.
- Still requires actual iPhone confirmation: running Scriptable update, sign-in and previously imported progress inside published Hanzi PWA, installed-PWA refresh without storage deletion/reinstallation, and real notification receipt on a subscribed device. Current environment cannot inspect the device or its push receipt. Do not claim these passed.
- Source Supabase Hanzi writes remain frozen and the original Hanzi cron remains paused. Shared Supabase project must stay active for unrelated apps. Cloudflare data, account mapping, VAPID keys and push configuration remain unchanged.

Remaining work:
1. Verify the published frontend sign-in and imported progress in a browser, and guide a normal refresh of the installed PWA. Preserve local queues, preferences, PWA origin and existing subscriptions; do not clear storage or reinstall it.
2. DONE for both GitHub-hosted Eren schedule variants via PR #82 and successful Pages deployment 38339639812. Still pending: run the supplied Scriptable update on the installed iPhone widget. Übersicht explicitly excluded by the user. Cloudflare direct JSON URL is /widget?username=eren; live WebSocket URL (if needed later) is wss://hanzi-steps-api.weatherisgood06.workers.dev/widgets/events?account=ACCOUNT_KEY.
3. The old Supabase hanzi-widget function was deployed as a read-only Cloudflare bridge, version 9, retaining verify_jwt=true. However, actual requests currently return HTTP 402 with exceed_cached_egress_quota. Therefore do not claim old URLs work; move integrations directly to Cloudflare without upgrading Supabase.
4. GitHub-hosted Eren schedule source was inspected and updated in PR #82, preserving its design. The user pasted their current Scriptable widget source in the subsequent conversation; its device installation update remains to be run. Übersicht is no longer in scope. No actual iPhone widget file was modified remotely.
5. Confirm actual notification delivery on the user's subscribed device if needed; backend encryption/scheduling checks passed, but physical delivery was not observed.

Do not rerun migration preparation/import, create a replacement database, regenerate VAPID keys, or migrate unrelated apps. The production workflow preserves reminder activation and updates curriculum bounds. Keep everything on free plans. Finish with a precise account of what works and any remaining user device steps.

## Follow-up — 13 October 2026: GitHub schedule widget cutover

- GitHub-hosted NTU schedule source is in `Weather-Mister/ntu-mail-push`, not this repository or the retired alternate schedule host.
- PR [#82](https://github.com/Weather-Mister/ntu-mail-push/pull/82) was **merged** as `940f76f23ece63d892e78b94885ab400bcb7089e`.
- Eren's **modern** `sites/eren/app.js` and **skeuomorphic** `sites/eren/skeuo-runtime.js` now fetch `https://hanzi-steps-api.weatherisgood06.workers.dev/widget?username=eren` **directly**, bypassing the quota-blocked Supabase bridge and the schedule's unrelated paired API. No schedule appearance changes; other mail, task, transfer and class API calls remain paired as before.
- GitHub Pages production [deploy run 38339639812](https://github.com/Weather-Mister/ntu-mail-push/actions/runs/38339639812) **succeeded**, including the **live Cloudflare widget response and GitHub Pages CORS smoke check** and existing application validation. The schedule PWA's asset and service-worker revisions were incremented; the origin/storage/registration are preserved.
- The **current Scriptable widget source** was provided by the user in chat. It uses `shortcuts://run-shortcut?name=OpenHanzi`, file cache `hanzi-widget-cache-v4.json`, and a Supabase JSON endpoint. A complete Cloudflare-adjusted JS replacement was created and syntax/mock-runtime-tested in that conversation. **It must still be copied into Scriptable on the user's device**; ChatGPT cannot edit locally installed Scriptable files remotely. To modify the original instead, change only `DATA_URL` to the Worker `/widget?username=eren` endpoint and remove the Supabase `ANON_KEY` and `Authorization`/`apikey` headers; preserve the cache name and widget designs.
- Per the user's latest instruction, **Übersicht is out of scope**; leave it unchanged.
- The remaining independent device checks are **published app sign-in and display of imported progress**, **installed Hanzi PWA refresh and queued offline-save reconciliation without clearing storage**, and **actual subscribed-device notification delivery**. Backend save/reload, imported account reads, preserved VAPID and reminder activation were already verified in the main migration, but physical device behavior cannot be claimed without observation.
- Do **not** unfreeze old Hanzi writes or restart the old Hanzi reminders. Do **not** stop the shared Supabase project, which other applications still use.
