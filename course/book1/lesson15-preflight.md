# Book 1 Lesson 15 — Preflight

Authoritative source lesson: **Lesson 15 「我很不舒服」 / “I Don’t Feel Well”** from *A Course in Contemporary Chinese 1*.

Protocol: `automation/book1/PROTOCOL.md`.

## Baseline

- production branch: `main`
- production baseline commit: `680ed5753382fb72151a1532095bca0a227c0658`
- baseline commit message: `Complete Lesson 14 production verification`
- Book 1 is complete through source Lesson 14 / Hanzi Steps Unit 44
- next source lesson: **Lesson 15**
- active conflicting Book 1 curriculum PRs at preflight: **none**
- working branch: `book1-lesson15-source-a`

## Controller state at preflight

`course/book1/completion.json` records:

- `completedThroughSourceLesson: 14`
- `completedThroughUnit: 44`
- `currentSourceLesson: 15`
- `currentStage: "preflight"`
- `bookComplete: false`
- source gate pending; all downstream gates locked

This is consistent with the merged Lesson-14 release and production verification.

## Exact source boundary

Lesson 15 is the final source lesson in Book 1.

- lesson title + objectives: printed p. **323** / PDF p. **350**
- Dialogue I + Vocabulary I: printed pp. **324–327** / PDF pp. **351–354**
- Dialogue II + Vocabulary II: printed pp. **327–331** / PDF pp. **354–358**
- Grammar I–VII, including the English grammar translation/reference pages: printed pp. **331–344** / PDF pp. **358–371**
- Classroom Activities I–V: printed pp. **345–348** / PDF pp. **372–375**
- Bits of Chinese Culture — “Wearing Surgical Masks”: printed p. **349** / PDF p. **376**
- self-assessment: printed p. **350** / PDF p. **377**
- Appendix begins on printed p. **351** / PDF p. **378**, so it is outside Lesson 15.

## Preflight verdict

**PASS.**

The starting state is unambiguous:

1. Lesson 14 is fully released and production-verified.
2. Unit 44 is the current published endpoint.
3. Lesson 15 is the sole next source lesson.
4. No conflicting active curriculum work exists.
5. The authoritative source boundary is fixed at printed pp. 323–350 / PDF pp. 350–377.
6. No Lesson-15 unit boundaries are chosen at preflight.

The pipeline may advance to Stage 1 — dual source extraction.
