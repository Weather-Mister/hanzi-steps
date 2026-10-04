# Baseline regression repair

The 13 failures reproduced before controlled production was added. This repair
keeps the original historical fixtures intact and does not change lesson/step
IDs, answers, saved positions, completion mappings or learner state.

## Repairs

- Scope foundation-unit counts and teaching prerequisites to Book 1 using book
  membership, not `Unit.number`, which restarts in Book 2. Unit 5 now also checks
  prerequisites without importing future vocabulary.
- Keep the fixed first-eight-unit character counts, then independently derive
  every later unit's first-time characters from new vocabulary in book order.
  Existing negative coverage tests remain.
- Check palette definitions and neighbouring contrast instead of demanding a
  new colour for each of 48 units. Check independent book-start availability
  through the actual book registration instead of a retired lesson ID.
- Distinguish retired sequences from append-only extensions. Both still reject
  false completion bounds; only explicitly reviewed old bounds earn completion.
- Reading cards teach reading before sentence recall; Latin names/punctuation
  are not Hanzi writing targets. Handwriting still requires a prior character
  introduction, and sentence banks must include the full token multiplicity.
- Correct the guided-character denominator: 逛、芒、窗、戶、進 have character cards
  and independent practice but no guided introduction. They remain available
  without making the header's guided-course total unreachable. Geometry and
  real-recognizer tests now cover **all** character records, not just that total.
- Expand the short 丷 component explanation for 弟. Its narrow before/after
  amendment is chained to the unchanged migration snapshot. No glyph data or
  component stroke groups changed. The mixed-review gate checks that exact
  reviewed character record, restores only the old component description for
  comparison, then checks its unchanged whole-unit snapshot.
- Keep 子's dictionary reading `zǐ` distinct from its neutral suffix in `bāozi`;
  the regression now checks the contextual example and audio text too.

## Historical preservation scope

The old whole-course fixtures include the retired Book 2 prototype. Commit
`6107c5e` deliberately removed it for a clean rebuild; the two September 26
Supabase purge migrations deliberately removed its backend state. The current
backend contains none of those old lesson bounds. This repair does not revive
that prototype, reinterpret its checkpoints or undo those migrations.

The foundation gate continues hashing every original Book 1 record, following
the existing explicitly reviewed amendment chain. It additionally guards
retired lesson/rule/phrase IDs against reuse and preserves Book 3. Current
Book 2 remains protected by its published checkpoint fixture and quality gates.
Shared character records retained in the immutable migration snapshot also
follow the reviewed chain. Only the exact retired first-teaching inventory is
excluded from obsolete whole-course ownership expectations.

For geometry, all surviving original hashes stay fixed except 口 and 直, pinned
to their already-published canonical datasets in `9f593da`. The retired-only 銀
dataset stays removed. Mutation tests demonstrate that deleted words/cards,
changed lesson payloads or grammar, reused retired IDs, broken amendment chains
and unrelated geometry changes still fail.

No database migration, learner-data write, auth change or new grading exception
is needed for this repair.

## Verification

- All 450 registered tests are accounted for: **449 pass**, with the existing
  migration-only source-hash check intentionally skipped. The final rerun passed
  444 tests outside `unit-one.test.mjs` and all four lightweight Unit 1 tests.
  Its fifth test had already passed the full real-recognizer sweep of all 4,799
  strokes before the final test-only snapshot exception; that exception does
  not change curriculum or recognition code.
- TypeScript, the Pages production build and lint on every changed source/test
  file pass. The build retains its existing large-chunk advisory.
- Mobile (360/390 px) and desktop browser checks pass: the guided denominator
  reaches 481/481, Traditional Chinese IME composition is safe, authored answers
  grade deterministically, progressive help/fallback stays assisted, attempts
  deduplicate, reload retains progress, and mocked signed-in RPC transport uses
  the existing session/mastery IDs.
- Original foundation and migration snapshots, lesson/step payloads, stroke
  data, completion-length metadata and Supabase files remain unchanged, apart
  from the explicitly amended character explanation and runtime guided count.
