# Daily streak

Added only after the Unit 7/8 rebalance passed all 53 checks and was published
successfully (rebalance commit `07b93435dd91fd0c583a9362adee78b71f6a8945`).

## Rules

- Complete a lesson, unit review, or independent character-practice session to
  record a study day. Merely opening the app or starting a lesson does not count.
- One or many completions on the same Taiwan calendar day count as one day.
- Days use Asia/Taipei, UTC+8, regardless of device/server timezone.
- If the most recent day is yesterday, retain the streak while today remains
  available. Missing a full day breaks the current streak; the next completion
  starts at one. The best historical streak is retained.
- A flame counter in the header opens a weekly Monday–Sunday calendar, today's
  status, best streak, and a short explanation. No streak freezes, reminders,
  rewards, leaderboards, or new sign-in system are introduced.

## Persistence and compatibility

The existing account-owned `practice_sessions` table gains one nullable
`completed_at` column and an index on user/completion state/completion time.
Generated migration `0001_tricky_boomer.sql` is additive, with no data rewrite.
The first completion timestamp is immutable through retries or stale writes.
Previously completed rows use the already stored `updated_at` timestamp when no
completion-specific time exists; a retry freezes that earlier value before
updating the checkpoint's ordinary timestamp.

The study-day query examines all completed attempts, not the latest-per-lesson
subset returned for progress. Repeat practice across multiple days therefore
counts correctly. Ownership comes from the same verified server identity as
progress; no identity in the request body can select another person's streak.

The original completion time is preserved when offline work later syncs. A
future device timestamp is clamped to the receipt time, preventing future awards.
Confirmed day sets merge monotonically within the same account to avoid an older
GET response overwriting a just-confirmed completion. Old checkpoint formats,
retired lesson IDs, earlier course content, and character recognition are intact.

The signed-in counter updates after a successful save. Loading and failures are
not shown as a reset to zero. Guest completions are provisional until sign-in;
account state remains stored server-side. Existing pending-checkpoint recovery
handles interrupted syncing. Calendar state refreshes on focus/visibility and
every 30 seconds while the app is open.

## Checks

Pure tests cover Taiwan midnight, duplicate/unordered/invalid/future dates,
first day, yesterday's grace period, missed-day resets, best streak, week layout,
leap years, year boundaries, and offline clock handling. Real Workers/D1 tests
cover empty accounts, partial sessions, lesson and character completions, repeated
attempts, ownership isolation, legacy timestamps, retries, stale writes, offline
completion, and future-clock bounds. The complete existing suite and build must
still pass; the content rebalancing remains a separate already-published commit.
