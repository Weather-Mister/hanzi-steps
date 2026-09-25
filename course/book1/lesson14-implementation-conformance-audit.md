# Book 1 Lesson 14 — Implementation Conformance Re-audit 3

Gate B: **PASS / re-frozen after final strict-prerequisite Activity Audit 2 re-audit 3**.

Scope:
- final re-frozen Lesson-14 activity packet;
- actual Units 42–44;
- all standalone character-practice entry points;
- Pinyin Search / Mega / adaptive-practice prerequisite behavior.

## Final strict-prerequisite repairs

### A-01 — future NEW 明年 in Unit 43 assessment

Frozen repair:
- `u43-a002-s2` third distractor is now `你在臺灣住了半年嗎？`.

Actual `course/book1/unit43.ts` matches the frozen prompt, options, answer, and explanation exactly.

The repaired item uses only material available by `u43-duration-now` and no longer exposes future-owned `明年`.

Status: **resolved**.

### A-02 — standalone character practice bypass

The frozen activity contract now requires every learner-facing `practice-<character>` entry point to obey the character's first non-review teaching lesson.

Implementation now centralizes this invariant in:

`characterPracticeAvailable(char, completed)`

in `lib/curriculum.ts`.

The helper:
- resolves the first non-review lesson whose `chars` contains the character;
- requires that lesson to be completed before standalone practice is available.

Enforcement:
- `LearningApp.start()` now rejects **every** `practice-<character>` lesson whose first teaching lesson is incomplete. This is the central safety boundary, so future shortcuts cannot bypass it merely by calling `start()`.
- the unit character-detail dialog disables the Practice action and shows “Practice unlocks after its lesson” until the same boundary is satisfied;
- Pinyin Search uses the same central helper instead of maintaining a separate first-teaching map;
- Search vocabulary visibility remains global;
- Mega/adaptive vocabulary gating remains unchanged.

Targeted regression coverage verifies:
- 葉 cannot be practiced before `u43-next-year`;
- 葉 unlocks after `u43-next-year`;
- 更 cannot be practiced before `u44-even-more`;
- 更 unlocks after `u44-even-more`;
- 紅葉 remains globally searchable while its writing action obeys the same gate.

Status: **resolved**.

## Frozen upstream integrity

No repair changes:
- source ledger;
- dependency classifications;
- Gate-A unit boundaries;
- canonical NEW vocabulary ownership;
- formal grammar ownership;
- character ownership/order;
- Search visibility policy;
- Mega ownership;
- source deferrals.

## Findings

- BLOCKER: **0**
- MAJOR: **0**
- MINOR: **0 open**

# Result: PASS

The implementation conforms to the final re-frozen Gate-B packet. Deterministic QA must pass after these final code changes before learner simulation is repeated.
