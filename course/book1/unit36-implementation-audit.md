# Unit 36 implementation audit

## Curriculum shape

- 8 genuinely new lexical items; no padding with transparent 試試看 or 做生意.
- 4 first-taught characters: 工、作、試、難.
- 2 new grammar rules: Event/Time + 以後 and special 好/難 + verbs.
- Six teaching lessons plus one review.
- Review has 26 activities, including 3 contextual listening tasks and 4 handwriting-memory tasks.
- Every formal NEW vocabulary item is retrieved in review.
- Unit 35 是…的 and earlier 要是…就… are review grammar, not redeclared.

## Source coverage

The implementation covers all Lesson 12 Dialogue II content needed to complete the lesson and maps every Vocabulary II item to NEW, REVIEW, new grammatical use, or transparent source phrase.

Grammar III explicitly contrasts Unit 35's standalone 以後 'in the future' with post-event/post-time 以後 'after/later'.

Grammar IV preserves the textbook split between perception combinations and action-verb ease/difficulty, plus degree modification, negation, and question forms.

## Pedagogy and sequencing

- 工 and 作 are introduced before 工作 is assessed.
- 試 is introduced before 試試看 is assessed.
- 難 is introduced before 難找 / 難學 assessments.
- Event + 以後 receives a grammar card before its assessments.
- 好/難 + verb receives a grammar card before its assessments.
- The Dialogue II opening deliberately retrieves the already-taught 是…的 question system.
- Review independently assesses both new grammar rules and all eight new lexical items.

## Handwriting

Declared stroke/component models:
- 工: 3 strokes, whole simple form.
- 作: 亻 + 乍, 7 strokes.
- 試: 言 + 式, 13 strokes.
- 難: 11-stroke left structural component + 隹, 19 strokes.

The Feature QA hydrator must confirm actual path/median counts against the exact Unicode targets. If a declared count/grouping disagrees with licensed geometry, fix the curriculum metadata rather than weakening validation.

## Publication gate

Before merge, the exact final PR head must pass Feature QA: stroke hydration, course generation/check, targeted Unit 36 testing, character coverage, vocabulary lookup/Mega Challenge regressions, all validation tests, TypeScript, and GitHub Pages build. If CI commits generated artifacts, the new head must receive a fresh successful QA run before merge. After merge, require the GitHub Pages build and deploy jobs to succeed.
