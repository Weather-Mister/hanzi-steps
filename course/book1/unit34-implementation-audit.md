# Unit 34 implementation audit

## Curriculum and pedagogy
- 12 formal NEW vocabulary items.
- 13 first-taught characters.
- 1 new grammar rule: 先…再….
- Six teaching lessons plus one review.
- Review has 22 activities, including 3 listening tasks and 2 handwriting-memory tasks.
- Every NEW vocabulary item is retrieved in the review.
- 先…再… is taught before assessment and independently tested.
- The prior 要是…就… rule is retrieved in the source scholarship sentence rather than redeclared.

## Source checks
The unit was designed from Lesson 12’s learning objectives, Dialogue I opening, Vocabulary I, and Grammar I. It intentionally stops after the scholarship/grades exchange and does not claim the remaining Dialogue I tail or later grammar.

Important distinctions preserved:
- 計畫 is taught as the Lesson 12 planning verb and explicitly compared with earlier 打算.
- 念 is taught in its Taiwan Mandarin “study” sense.
- 花 is taught as “spend/cost” in 這得花不少錢, not as the noun “flower.”
- 得 in that source line is identified as děi “must / have to,” already encountered in Unit 33.
- 再 is not relabelled as new vocabulary; its role inside the new 先…再… construction is taught.
- 成績 is used with the earlier 要是…就… conditional in the source scholarship warning.

## Character coverage
The unit closes the previously unsupported 臺灣 prerequisite by formally teaching 臺 and 灣 before using the place name in assessed content. Every Han character newly required by Unit 34 NEW vocabulary has a character record and a declared stroke source.

Component groupings cover every stroke exactly once. 獎 explicitly records the source geometry’s interleaving: the final dot belonging to the upper 將 component is written after the three 大 strokes.

## Remaining work
Unit 34 does not mark Lesson 12 complete. The source plan records the deferred Vocabulary I tail, Dialogue II, and Grammar II onward.

## Required exact-head QA
Before merge, the PR head must pass the repository Feature QA workflow: stroke hydration, curriculum generation/check, targeted Unit 34 test, character coverage, regression suite, TypeScript, and Pages build. If CI commits generated artifacts/strokes and advances the head, the resulting head requires another successful Feature QA pass before merge.
