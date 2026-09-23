# Unit 35 implementation audit

## Curriculum
- 9 formal NEW vocabulary items.
- 9 first-taught characters.
- 1 new grammar rule: 是…的 past-event focus.
- Six teaching lessons plus one review.
- 24 review activities.
- 3 contextual listening tasks.
- 2 handwriting-memory tasks.
- Every NEW vocabulary item is retrieved in review.

## Pedagogy
The unit completes Dialogue I before moving to Dialogue II. The reduced vocabulary count is intentional because 是…的 is one of the denser Lesson 12 grammar systems.

The grammar is not reduced to a simple form-recognition exercise. Teaching and review explicitly cover:
- focus on subject/time/place/manner;
- fronted object/topic;
- prohibition on object focus;
- 不是…的 negation;
- wh-question use;
- optional 是.

Standalone 以後 is taught only in the Dialogue I sense “in the future”; Event + 以後 remains deferred.

## Compatibility
No existing Unit 34 IDs are changed. Unit 35 adds new IDs only.

## Publication gate
Before merge, exact-head Feature QA must pass stroke hydration, course generation/check, targeted Unit 35 testing, character coverage, repository regressions, TypeScript, and Pages build. If CI creates generated artifacts and advances the branch head, rerun Feature QA on the resulting head before merge.


## Generated-artifact exact-head recheck

Feature QA hydrated Unit 35 handwriting geometry and refreshed generated curriculum artifacts on commit `2990a2816dbc03e11c550ca0afd514ca1beb8ab3`. This audit-only follow-up makes no learner-facing curriculum change; it exists to trigger one complete Feature QA run on the generated state before merge.
