# Architecture migration verification

Baseline: live Sites version 23, commit
`a80f4c5304dc9da5f288e4734e65b99d6a543445` (11 September 2026).
No unit or educational content was added. No textbook files were consulted.

- Extracted 10 units, 68 lessons, 1,059 activities and all 12 activity types.
- All 104 vocabulary records, 125 retained character records, 72 explicit grammar
  rules, 147 phrases, unit metadata, ordering and correct answers compare exactly
  to the baseline. The 108 first-time character cards include the corrected 以.
- Preserved every lesson/activity ID, practice sequence, checkpoint bound and
  retired Unit 7/8 completion mapping. All old curriculum module exports match.
- Source hashes prove CSS, mobile layout, app rendering, login, saving, account
  handling, sounds, streaks, handwriting, navigation and hosting configuration
  are byte-for-byte unchanged. The app adapter now reads explicit character lists.
- The complete existing suite plus new validation tests passed: 72 passes; the
  migration-only source-hash gate passes separately with
  `COURSE_MIGRATION_CHECK=1`. Type checking and the production build pass.
- Browser checks cover Book 1 Units 1, 6, 7, 8 and Book 2 Units 1, 2, their character
  lists and Book 2 notes. A local 390-pixel iframe verifies mobile navigation and
  character cards. The temporary QA page is excluded from publication.
- The HTTP-only preview cannot start a new practice session because its browser
  does not expose `crypto.randomUUID`; that unchanged app call is available on the
  HTTPS production site. No production-code workaround was introduced.
- Existing persisted-D1 integration tests verify save/reload, account separation,
  retired checkpoints and streak dates; handwriting tests use the real matcher.
- Production still emits six JavaScript files, with no new per-unit fetches.
  Total compressed JS is approximately 371 KB versus 364 KB before (about 1.8%).
  Authoring-only metadata is excluded and repeated long strings share constants.
- Generated indexes contain 104 vocabulary, 108 character and 76 language-pattern
  records (72 grammar rules plus four existing Unit 1 phrase-note introductions).
- The Unit 9 context command returns the 82 words, 88 characters and 64 patterns
  introduced in Book 1 Units 1–8, excluding later Book 2 declarations.
- An in-memory registration fixture verifies inserting Unit 9 before Book 2
  without editing Units 1–8. No fixture unit was added to the source or manifest.

Future entry point: `ADDING_A_UNIT.md`. Normal manual edits: unit module, matching
stroke file, manifest entry; three generated outputs update automatically.
