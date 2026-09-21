# Units 28–29 rebalance implementation audit

## Reason for the repair

The first published version passed structural QA but was too sparse:
- Unit 28: 5 new vocabulary/forms.
- Unit 29: 6 new vocabulary/forms.

The repair keeps every published lesson ID and step prefix intact, then appends source-backed teaching. It does not renumber, reorder, or reinterpret an existing checkpoint.

## Honest novelty after rebalance

### Unit 28
- 12 new vocabulary/forms.
- 10 new characters.
- 4 new grammar targets.
- 22 review activities, including 3 listening activities.

Added source-backed vocabulary:
**非常, 但是, 站, 或是, 便利商店, 公共汽車, 中國**.

These come from Lesson 8 vocabulary/dialogues and close real earlier coverage gaps.

### Unit 29
- 12 new vocabulary/forms.
- 10 new characters.
- 2 new grammar targets.
- 22 review activities, including 3 listening activities.

Added source-backed vocabulary:
**水果, 黃色, 給, 香, 甜, 以前**.

These are the supported opening items of Lesson 10 Vocabulary I. They are introduced only after Unit 29's Lesson 9 date/condition content.

## Pedagogy

- Unit 28 still explains the full Lesson 9 time-duration system before assessing it.
- The restored Lesson 8 vocabulary is attached to transport/ticket contexts rather than dumped into a detached word list.
- Unit 29 retains month/date and 要是…就… teaching, then transitions into concrete fruit-description vocabulary.
- No Lesson 10 grammar is pulled forward prematurely.
- New vocabulary is introduced in teaching lessons before the two appended review activities sample it.
- Existing review questions and grammar checks remain unchanged; the repair adds coverage rather than replacing prior assessments.

## Saved progress

A pre-rebalance step-ID fixture records every published Unit 28–29 lesson prefix.

`lib/lesson-revisions.ts` records the old completion lengths:
- Unit 28: 5, 14, 13, 5, 5, 6, 20.
- Unit 29: 16, 5, 9, 10, 4, 6, 20.

Regression tests require:
- every old step ID to remain at the same position,
- every old partial checkpoint to remain valid,
- every old completed checkpoint to retain completion credit,
- and the new full lesson lengths to remain valid.

## Handwriting

New Unit 28 handwriting targets:
**非、但、站、或、利、汽**.

New Unit 29 handwriting targets:
**水、果、黃、色、給、香**.

The stroke-source declarations require **graphicsZhHant.txt only**. Feature QA must hydrate these entries and validate stroke/path/median counts before merge. No Simplified/Japanese fallback is declared for this repair.

For 非 and 或, the character records explicitly use justified whole-character grouping because their visual structure and stroke sequence interleave; they are not mislabeled as simple left/right compounds.

## Remaining source gaps

Still explicitly open: 網路上, 臺南, 故宮博物院, 逛, 臺東. These are tracked in the source plan with the specific character/provenance or first-teaching issue rather than silently omitted.

## Gates still required

Before merge, the exact final PR head must pass:
- curriculum generation and check,
- separate targeted tests for Unit 28 and Unit 29,
- character coverage,
- full regression tests,
- TypeScript,
- Pages build,
- generated artifact commit if needed,
- and a second exact-head QA run if CI changes the branch.

After merge, both GitHub Pages build and deploy must succeed and the deployed artifact must contain the rebalanced vocabulary.

## Exact-head QA trigger after generated artifacts

Feature QA hydrated all twelve newly added handwriting targets from `graphicsZhHant.txt` and committed the generated curriculum artifacts. This documentation-only follow-up commit changes no learner content; it exists so the exact final PR head receives a normal Feature QA run after those generated artifacts are present.
