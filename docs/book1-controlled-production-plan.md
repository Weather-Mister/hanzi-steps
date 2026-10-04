# Controlled production for Book 1

Status: implemented after prototype verification and selective content audit. Baseline: main 3fc810f.

## Decisions

- Add `produce` to the existing Step model. Each task references an existing productive phrase (the exact sentence may be a new transfer composition of already taught words and patterns), stores its canonical answer, and carries an explicitly authored list of alternative full answers. No AI, fuzzy matching, character conversion, synonym substitution, word deletion, or inferred permutations.
- Preserve all glyphs (even NFC folds some compatibility Han); remove only whitespace and common sentence punctuation. Simplified glyphs, missing words, wrong order, extra words, and grammar changes remain significant.
- Show an English prompt with visible constraints before any Chinese answer material. Early tasks use narrow translation; middle tasks supply a situation and required construction; later tasks allow explicitly stated choices or clause orders. Avoid pretending finite grading understands unrestricted communication.
- First help reveals an English grammar hint; Chinese vocabulary or builder material requires the learner to have entered at least some Chinese in this visit. Second help reveals a small vocabulary list; third uses the existing sentence-builder rendering/checker against the canonical phrase. Every help action is immediately and permanently assisted for this step, even after retrying. A per-session sessionStorage help receipt prevents refresh/pause laundering; it is a temporary UI flag, not a second mastery or progress record. Wrong attempts are recorded, and subsequent success is assisted under the existing lesson policy.
- Only after checking show canonical Chinese, pronunciation, and a short explanation. On an unlisted response say it did not match the reviewed forms, rather than asserting that all other Chinese is ungrammatical. Keep retry and fallback available, with no forced typing dead end.
- Reuse `phrase:<existing phrase id>` / `sentence` mastery and linked grammar/usage attempts. No new practice mode, learner table/state, canonical vocabulary owner, or separate production streak. The pre-existing birthday greeting targets its canonical vocabulary/input skill to avoid an unreachable duplicate phrase skill. Guided success does not become clean mastery.
- Append only; capture each newly extended lesson's exact pre-change length in additionalPreviousLessonLengths without overwriting older bounds. Preserve complete flags, unlocks, IDs, and every old partial index. Old completed lessons remain complete; replay exposes the additions. Unfinished lessons naturally reach the new tail.
- Supabase validates checkpoints against private curriculum metadata. Add reviewed historical completion bounds to that metadata, update current lengths, and accept an old completed bound or an unfinished position below the new length. A stale partial upload cannot reopen a completed session; completion timestamps and existing auth/RPC permissions stay intact. No learner records are rewritten. Apply the tested migration before publishing the frontend.
- Do not expose pattern cards beside an unanswered production item. They would bypass progressive help. IME composition must never trigger checking; use a labeled 16px+ textarea, explicit Check button, no auto-focus keyboard opening, and no Enter-to-submit from the editor.

## Prototype gate

1. Unit 11: one tight cup-order translation, testing measure word and modifier recall.
2. Unit 29: two visit-condition responses, covering both taught subject placements and the negative condition.
3. Unit 48: three short tasks distributed over later lessons/review: recipient request, sleep quality comparison, and an explicitly bounded recovery suggestion.
4. Require exact-grading negative fixtures, accepted variants, ordered progressive help, sticky assistance, sentence fallback, mobile/desktop layout, IME, one record per check, old completed and unfinished progress, reload, existing mastery persistence/merge tests, full curriculum validation, TypeScript and Pages build before expansion.

## Expansion gate and audit

Audit every unit 1–48 individually. Units 1–7 get no production. Add one short recall opportunity where it helps in early units; choose around two useful situations in middle units and up to three in later units. Counts are a ceiling-oriented guide, not a quota. Reuse only taught productive vocabulary/grammar; reject support-only cards, lexical labels, dialogue role notation, cultural metadata, and unbounded personal answers. Prefer review or later lessons; enforce at least three intervening steps after the last display of the same full answer. Do not put two production tasks back-to-back: distribute across later lessons where necessary.

Each selected task needs a reviewed prompt, canonical phrase, legitimate alternatives, English grammar hint, vocabulary hints, and a rationale. Verify all assessed answer glyphs and grammar have been taught before placement. Retain a per-unit audit showing additions and intentional omissions. If a task cannot bound legitimate answers fairly, narrow the prompt or omit it.

## Verification limits

Automated browser checks cover layout and composition event behavior, not the feel of every real iOS Chinese keyboard. Existing backend contracts and offline queues can be regression-tested without sending synthetic attempts to the learner's live account. Classroom difficulty and time burden remain provisional until learner feedback; do not increase density merely because tests pass.
