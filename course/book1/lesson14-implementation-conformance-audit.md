# Book 1 Lesson 14 — Implementation Conformance Re-audit 4

Gate B: **PASS / re-frozen after FR-001 fresh Activity Audit 2 re-audit4**.

Scope:
- final re-frozen Lesson-14 activity packet after FR-001;
- production Unit 42 learner-facing A001 transfer;
- unchanged Units 43–44 and prerequisite/practice behavior.

## FR-001 implementation

Frozen repair requires the Unit-42 A001 phrase card to explicitly tell the learner to:
1. describe the climate of their own home country/place in Chinese;
2. name their own most-liked and least-liked seasons;
3. give their own reason with 因為…所以…;
4. say the response aloud or write it rather than merely copy the model.

Production `course/book1/unit42.ts` now implements this in the learner-visible `u42-home-country-model.note`.

The adjacent `u42-season-reason.note` explicitly reminds the learner that the fixed spring-preference sentence is only a scaffold and cannot substitute for the learner's own response.

The application already renders `phrase.note` on phrase steps under the learner-facing “How the phrase works” block, so the repaired instruction is actually visible during `u42-seasons`.

Markdown emphasis delimiters from the specification are intentionally not emitted into the plain-text runtime note; the learner-facing wording and required semantics are otherwise faithfully transcribed.

## Blast-radius check

Repository comparison from the re-frozen Gate-B head `3d7d88b9074c433640283bd309e884cc16773127` to the implementation head shows only two changed lines in `course/book1/unit42.ts`:
- `u42-home-country-model.note`
- `u42-season-reason.note`

No lesson order, question payload, phrase text, pinyin, meaning, token bank, review count, vocabulary ownership, grammar ownership, character ownership, Search behavior, Mega/adaptive behavior, or standalone handwriting gating changed.

## Existing invariants retained

- canonical NEW vocabulary: 30
- NEW characters: 21
- formal Lesson-14 grammar: 5
- Unit review sizes: 25 / 28 / 41
- global Pinyin Search lookup preserved
- standalone writing practice remains first-teaching gated
- Mega/adaptive eligibility remains lesson-gated
- Unit-43 future-vocabulary repair remains intact
- Unit-44 explain-before-order repair remains intact

## Findings

- BLOCKER: **0**
- MAJOR: **0**
- MINOR: **0 open**

# Result: PASS

Implementation conforms to the final FR-001-repaired Gate-B packet.

Deterministic QA must rerun because learner-visible production copy changed.
