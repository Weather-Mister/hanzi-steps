# Dense reading QA — 2026-10-03

Baseline: `6f18834`. Twenty-five added readings: 13 extended scenes and 12 mini
readings, totaling 152 connected lines and 76 questions. **69 readings total**.
Every Book 1 unit from 11–48 has at least one reading with at least two questions.
All original 44 payloads and every existing lesson step are unchanged; the mini
follow-up also preserves the earlier 57 payloads and their contracts exactly.

## Passed

- Feature QA's exact regression selection: **372 passed, 0 failed, 1 pre-existing
  skipped test** (373 total). Includes the full curriculum validation suite,
  reading contracts, cumulative progression, Search, Mega, practice and new guards.
- Persisted progress integration tests: **11 passed**, including saves, retries,
  stale checkpoints, account separation and offline recovery. This exercises the
  legacy local worker backend; it is not a live Supabase production write test.
- Reading browser suite: **all 69 entry points**; four dense formats on mobile and
  desktop; no overflow; pinyin initially hidden, hidden again on reopening/replay;
  word/character help; complete-answer submission gate; evidence links;
  translation/notes only after submission; resume, replay and fresh-learner locks.
  The two-question mini format additionally verifies partial resume, the second
  answer submission gate, four-line walkthrough, replay and lesson-draft isolation.
- Configured Supabase transport boundary tested through browser RPC interception:
  an existing offline lesson checkpoint is sent and confirmed; completing and
  reopening a new reading sends no lesson save and leaves remote lesson data intact.
  Only synthetic data and mocked RPCs were used; no real learner account was touched.
- Reading/profile key isolation, legacy payload fingerprint, entire lesson-step
  fingerprint, all existing completion shapes, and removal of each required lesson
  from each new reading's prerequisites.
- TypeScript (`npx tsc --noEmit`), Pages production build, course generation/check,
  character coverage, generation freshness and `git diff --check`.
- Visual review of message, schedule and notice layouts at 390px; desktop screenshots
  also captured. Local QA font configuration supplies Traditional Chinese glyphs
  because the container lacks CJK fonts; this is not an app font/dependency change.

## Existing unrelated failures

The follow-up environment restricts Node test subprocesses. The final 373-test
selection ran with `--test-isolation=none`. Generator freshness now exposes a
read-only callable check, so its regression no longer needs a child process.
This changes the authoring/test tool only, not the runtime or learner data.

The broad historical `tests/*.test.mjs` selection has 13 assertion failures, all
reproduced on unchanged `6f18834`. They concern old unit-size/ownership/checkpoint
fixtures and are outside this change. The current Feature QA workflow excludes
those old tests and its exact selected suite passes. The whole baseline sweep also
hit a time limit in the exhaustive Unit 1 handwriting test; its prerequisite
assertion was rerun separately on both revisions and reproduced unchanged.

## Compatibility boundaries

No changes to `supabase/`, `pages/`, authentication, RPC contracts, sync hooks,
lesson schemas, canonical course modules or generated curriculum ownership.
No database migration or server state-schema refresh is required. Reading answers
remain per-profile/device local, just as in the existing engine; this work does not
add cross-device reading-answer sync. No live production database mutation or
production-account test was performed.
