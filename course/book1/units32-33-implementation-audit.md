# Units 32–33 implementation audit

## Curriculum design
- Unit 32: 13 formal NEW vocabulary items, 13 first-taught characters, 2 new grammar rules, six teaching lessons + review.
- Unit 33: 13 formal NEW vocabulary items, 15 first-taught characters, 3 new grammar rules, six teaching lessons + review.
- Each review contains 22 activities and at least three contextual listening items.
- Transparent source forms are documented instead of counted as fake NEW vocabulary.

## Content safeguards built in
- 空 is taught as **kōng “vacant; empty”** and explicitly contrasted with prior 有空 **kòng**.
- 來 + VP is contrasted with 去 + VP and teaches placement of 不 / 要 before 來.
- Lesson 11 就 is contrasted with conditional 要是…就….
- 會 is explicitly split into acquired skill vs likelihood/future event.
- Existential 有 requires an indefinite subject and uses 沒有 for negation.
- Zero-pronoun teaching covers both omitted subject and omitted object, with an ambiguity warning.
- 那 “then / in that case” and 不好意思 are retained through phrase-note teaching even though they are not padded into NEW vocabulary.
- 房租、房間、分鐘、回去、打電話 are retained as transparent combinations.

## First-teaching migration
Book 2 retains its lessons and activities, while 走、左、右、路、超、過、再 are reclassified there as previously taught characters. 再 is also reclassified as REVIEW vocabulary in Book 2 Unit 3.

## Validation still required
The PR must pass declared Traditional stroke hydration, curriculum generation/check, targeted Unit 32 and Unit 33 tests separately, character coverage, full regressions, TypeScript, and Pages build. After CI writes generated artifacts/strokes, the exact new head must pass again before merge.
