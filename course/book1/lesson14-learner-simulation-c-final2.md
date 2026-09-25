# Book 1 Lesson 14 — Final learner simulation C, rerun 2

PR: **#68**  
Branch: `book1-lesson14-source-a`  
Simulation: **C — cumulative learner**  
Stage: **7 — learner simulation, final rerun 2**

## Independence

This simulation was performed from the current PR implementation and the final-rerun-2 handoff. I did **not** read either rerun-2 Simulation A or Simulation B report before completing this simulation, and I did not use historical learner-simulation verdicts as evidence.

## Cumulative learner path exercised

Simulated a learner who completes Units **42 → 43 → 44** sequentially, including each unit review, then exercises global Pinyin Search, standalone handwriting, adaptive practice, Mega Challenge, delayed retrieval, and the Lesson-14 final capstone.

Implementation reviewed on the current PR branch:
- `course/book1/unit42.ts`
- `course/book1/unit43.ts`
- `course/book1/unit44.ts`
- `course/book1/lesson14-dependency-ledger.md`
- `course/book1/lesson14-curriculum-blueprint.md`
- `course/book1/lesson14-unit42-activity-spec.md`
- `course/book1/lesson14-unit43-activity-spec.md`
- `course/book1/lesson14-unit44-activity-spec.md`
- `lib/curriculum.ts`
- `lib/vocabulary-lookup.ts`
- `lib/practice-engine.ts`
- `components/learning-app.tsx`
- `components/pinyin-search.tsx`
- `components/smart-practice.tsx`
- `components/mega-challenge.tsx`
- `course/manifest.json`
- `course/index.json`

## Mandatory checks

### 1. All 30 canonical NEW forms remain globally searchable — PASS

The dependency ledger requires exactly **30 NEW canonical forms**. The implementation owns exactly **30** Lesson-14 `newVocabulary` rows across the three units:

- Unit 42: 11
- Unit 43: 7
- Unit 44: 12

All 30 ledger forms are present exactly once in the Unit 42–44 canonical vocabulary ownership set, with no missing or extra Lesson-14 canonical row. `course/index.json` contains the same Unit 42–44 ownership rows.

Global Search is built from the runtime `vocabulary` collection, and `vocabularyLookup` indexes those canonical rows without filtering by learner progress. Exact pinyin remains searchable globally. Search visibility is intentionally global; only writing actions are gated.

### 2. Mega/adaptive practice remains lesson-gated — PASS

Adaptive practice is built from `learnedPracticeItems(completed)`.

- canonical word items come from `learnedVocabulary(completed)`, which requires the owning `lessonId` to be complete;
- phrase items are included only from completed lessons;
- fallback character items require a completed non-review lesson that owns the character;
- `adaptivePracticeItems` only filters that already-gated learned pool further;
- Smart Practice uses this completed-lesson pool;
- the standalone Mega Challenge also derives its active queue from `learnedVocabulary(completed)`.

A Unit-42/43/44 item therefore cannot enter adaptive or Mega practice before its owning lesson is completed.

### 3. Standalone handwriting cannot bypass first teaching — PASS

The shared gate is `characterPracticeAvailable(char, completed)`. It identifies the character's first non-review owning lesson and requires that lesson to be completed.

All relevant learner entry paths obey that gate:

- **Pinyin Search:** `searchPracticeCharacters(..., completed)` filters writing actions through `characterPracticeAvailable`.
- **Unit character library/detail:** the detail view may expose reference information, but its Practice button is disabled until `characterPracticeAvailable` is true.
- **Direct practice start:** `start()` rejects any `practice-<character>` lesson when `characterPracticeAvailable` is false.

This remains true for characters introduced late in their units, including **葉** (`u43-next-year`) and **更** (`u44-even-more`).

### 4. All 21 NEW characters receive later handwriting retrieval — PASS

The ledger requires 21 NEW characters. The implemented review lessons contain later `complete` handwriting retrieval for all 21, with no omission:

- Unit 42 review: 冷、滑、雪、春、冬、夏、秋、雨
- Unit 43 review: 只、父、母、停、底、葉
- Unit 44 review: 傘、颱、濕、討、厭、聞、更

Each retrieval occurs after the character's first teaching lesson.

### 5. Unit-43 material receives delayed retrieval — PASS

Unit 44 review explicitly retrieves the required Unit-43 material after Unit 43 is complete:

- duration-to-now: `u44-review-cum2`
- imminence: `u44-review-cum3`
- duration + 想家: `u44-review-u43-1`
- 新年 / 父母: `u44-review-u43-2`
- 十二月底: `u44-review-u43-3`
- 明年 / 紅葉: `u44-review-u43-4`

Completed-duration production is additionally retrieved again in the final capstone through `u44-review-cap4`.

### 6. Reviews remain cumulative and reachable in sequence — PASS

The implemented review sizes are:

- Unit 42 review: **25** steps
- Unit 43 review: **28** steps
- Unit 44 review/capstone: **41** steps

Unit 43 review contains cumulative Unit-42 weather retrieval, and Unit 44 review contains both Unit-42 weather/seasons retrieval and the required Unit-43 delayed retrieval. Sequential lesson availability continues to require the previous lesson/review boundary before advancing.

### 7. Final capstone covers all four Lesson-14 outcomes — PASS

The four final capstone steps are Chinese construction tasks using previously taught phrase IDs:

1. `u44-review-cap1` — typhoon/weather + caution/comparison: **F001**
2. `u44-review-cap2` — seasons + preference/reason: **F002**
3. `u44-review-cap3` — comparison with 沒有…那麼: **F003**
4. `u44-review-cap4` — completed-duration experience: **F004**

The capstone therefore closes all four Lesson-14 communicative outcomes through Chinese reconstruction, not curriculum-metadata recognition.

## Findings

### BLOCKER

None.

### MAJOR

None.

### MINOR

None.

## Verdict

**PASS**

Final-rerun-2 Simulation C has **0 open BLOCKER, 0 open MAJOR, and 0 MINOR findings**. The cumulative learner can complete Units 42→43→44, revisit all required Lesson-14 vocabulary and characters through gated practice, receive the required delayed Unit-43 retrieval, and complete a four-outcome final capstone without bypassing first teaching.
