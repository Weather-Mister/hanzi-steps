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
- New vocabulary is introduced in teaching lessons before review.
- A later quality pass found that two appended review questions were not enough to sample all rebalanced vocabulary and that the reviews lacked handwriting/component retrieval. The 22 existing review positions are now redistributed in place: Unit 28 explicitly retrieves 中國 and the 便 pronunciation contrast, while both units include handwriting/component retrieval and listening that reaches the rebalanced character set.

## Saved progress

A pre-rebalance step-ID fixture records every published Unit 28–29 lesson prefix.

`lib/lesson-revisions.ts` preserves two published completion generations for Units 28–29 rather than one overwritable number:
- original Unit 28 bounds: 5, 14, 13, 5, 5, 6, 20;
- rebalanced Unit 28 bounds: 16, 21, 19, 13, 12, 8, 22;
- original Unit 29 bounds: 16, 5, 9, 10, 4, 6, 20;
- rebalanced Unit 29 bounds: 27, 17, 16, 17, 6, 8, 22.

Regression tests require every original step ID to remain at the same position, every old partial checkpoint to remain valid, and completed sessions at every recorded historical bound to retain completion credit. The current quality pass keeps the rebalanced lengths unchanged.

## Handwriting

New Unit 28 handwriting targets:
**非、但、站、或、利、汽**.

New Unit 29 handwriting targets:
**水、果、黃、色、給、香**.

The stroke-source declarations require **graphicsZhHant.txt only**. Feature QA must hydrate these entries and validate stroke/path/median counts before merge. No Simplified/Japanese fallback is declared for this repair.

The later Units 26–31 audit corrected 非: its four-stroke left and right groups are consecutive, not interleaved. It now uses two accurate visual groups. 或 retains whole-character grouping for its interleaved structure.

## Remaining source gaps

Still explicitly open: 網路上, 臺南, 故宮博物院, 逛, 臺東. These are tracked in the source plan with the specific character/provenance or first-teaching issue rather than silently omitted.

## Verification status

The first rebalance previously passed exact-head Feature QA and Pages deployment. This later teaching-quality repair must receive a fresh exact-head Feature QA run because it changes learner-facing wording, review activity types, and progress-compatibility code. Required checks remain curriculum generation/check, separate Unit 28 and Unit 29 targeted tests, character coverage, full regressions, TypeScript and Pages build, followed by a successful Pages build/deployment for the merge commit.


## 2026-09-21 teaching-quality findings and fixes

The cross-unit audit of Units 26–29 found no major conflict in the Lesson 9 grammar progression, but it found four repairable quality issues in Units 28–29:

1. **Lesson coherence:** appended vocabulary had produced titles such as “September 30 — and Fruit” and “Maokong — and Giving.” Examples and titles are now rewritten around coherent travel/visit contexts without moving persisted steps.
2. **Polyphonic 便:** Unit 28 used 便利商店 after the learner already knew 便宜, but did not explicitly contrast **biàn** with **pián**. The lesson, vocabulary note and review now teach that contrast directly.
3. **Review coverage:** Unit 28 did not retrieve 中國 at all, and both rebalanced reviews lacked handwriting/component retrieval. Review positions are now reassigned in place so all new vocabulary appears in review and both reviews contain handwriting/component retrieval plus at least three listening activities.
4. **Source-document conflicts:** the older Units 26–27 source plan incorrectly called Lesson 9's source item 電影 and later wrote 作業. The authoritative source has **影片** and **功課**. The source plan is corrected; the learner-facing units were already using the correct 功課 and Unit 28 owns 影片.

The quality pass also replaces several obviously nonsensical multiple-choice distractors with plausible Chinese alternatives while keeping one defensible answer.


## Quality-pass QA follow-up

Feature QA run 89 passed curriculum generation/check, targeted changed-unit tests, character validation, the full regression suite (including multi-bound saved-progress coverage), TypeScript, and the Pages build. CI then committed regenerated curriculum artifacts to the branch. This documentation-only follow-up changes no learner content; its purpose is to require Feature QA once more on the exact final PR head after generated artifacts are present. Merge remains blocked unless that exact-head run is green.
