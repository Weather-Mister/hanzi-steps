# Book 1 Lesson 14 — Final Learner Simulation A

PR: **#68**  
Branch: `book1-lesson14-source-a`  
Simulation: **A — strict prerequisite learner**  
Prior-knowledge boundary: **Book 1 Unit 41 exactly; nothing from Units 42–44 is assumed before it is taught**  
Analyzed PR head: `62e82ced46be0919da18df923acda659bc88286c`

I did **not** read the other final learner-simulation rerun reports before completing this simulation.

## Verdict

**FAIL**

Open findings:
- **BLOCKER: 2**
- **MAJOR: 0**
- **MINOR: 0**

PASS requires zero open BLOCKER and zero open MAJOR.

---

## BLOCKER A-01 — Unit 43 assesses future NEW vocabulary before teaching it

**Location:** `course/book1/unit43.ts`  
**Lesson:** `u43-duration-now`  
**Step:** `u43-a002-s2`

The assessed select item asks:

> Which question asks how long someone lived there?

Its distractors include:

> `你明年回來嗎？`

But **明年** is a formal Lesson-14 **NEW** vocabulary item whose first-teaching ownership is later in:

- `u43-next-year`
- step sequence beginning with `u43-next-year-p1`
- vocabulary ownership: `明年 / míngnián / next year`

A strict prerequisite learner in `u43-duration-now` has not yet learned 明年. Therefore the learner is exposed to and must process a future NEW lexical item inside an assessed question before its teaching lesson.

This is a direct prerequisite / explain-before-test violation.

**Severity:** BLOCKER  
**Blast radius:** LOCAL / ACTIVITY

The smallest repair is to replace that distractor with language already known by the end of Unit 42 / current Unit-43 lesson, then rerun the affected question-correctness and learner-simulation checks.

---

## BLOCKER A-02 — future character writing practice can bypass first teaching through the unit character library

**Location:** `components/learning-app.tsx`

The dedicated Pinyin Search route is correctly gated, but the ordinary unit character UI provides a separate ungated path into writing practice.

Observed implementation behavior:

1. The unit page exposes every `unitCharacters` entry in the character mini-grid and character library, including characters assigned to later lessons.
2. Clicking one calls `setDetail(c)`.
3. The character detail dialog always offers **Practice this character**.
4. That action resolves `findLesson(\`practice-${detail}\`)` and calls `start(lesson)`.
5. `start()` intentionally bypasses `lessonAvailable(...)` for every lesson whose ID starts with `practice-`:
   `if (loading || (!lesson.id.startsWith('practice-') && !lessonAvailable(lesson.id, completed))) return;`

Therefore a strict prerequisite learner can open a character from a later lesson and start its writing-practice lesson **before the character's first teaching lesson is completed**.

Concrete Lesson-14 examples include:
- Unit 43: practice **葉** before `u43-next-year`;
- Unit 44: practice **更** before `u44-even-more`;
- because locked units explicitly remain explorable, a learner can also reach later-unit character practice before completing the preceding unit.

This violates the handoff requirement that **future writing practice cannot bypass character introduction**.

**Severity:** BLOCKER  
**Blast radius:** CROSS_UNIT / implementation

A compliant implementation needs the general character-detail practice action to use the same first-teaching-lesson completion rule as Pinyin Search, or otherwise prevent `practice-*` from bypassing the owning character lesson.

---

## Mandatory key-check results

### Unit-42 spring listening does not expose future 秋天 — PASS

`u42-spring-l1` plays:

> `我比較喜歡春天。`

The answer options are:
- `春天`
- `冬天`
- `天氣`

Future `秋天` is not exposed in that listening item.

### No future character / word / grammar appears before teaching — FAIL

The linear lesson-content scan found the concrete future lexical exposure in **BLOCKER A-01**: `明年` appears in `u43-duration-now` before its `u43-next-year` teaching ownership.

The active writing-practice path also violates first-introduction order as described in **BLOCKER A-02**.

### G001 → G002 sequencing — PASS

- `u43-completed-duration` (G001) is explained in `u43-finished-duration`.
- `u43-duration-to-now` (G002) is not introduced until the following lesson, `u43-duration-now`.

The required G001-before-G002 order is intact.

### 快 / 要 expansions → G003 sequencing — PASS

Inside `u43-new-year`:
1. `u43-kuai-sense` teaches the Lesson-14 temporal sense of 快.
2. `u43-yao-sense` teaches the Lesson-14 imminent auxiliary sense of 要.
3. only afterward does the grammar step `u43-imminent` introduce G003.
4. source-style imminence assessment follows the grammar step.

The repaired explain-before-test order is intact.

### G004 → G005 sequencing — PASS

- `u44-even-more` teaches G004 in Unit-44 lesson 5.
- `u44-not-as` teaches G005 in Unit-44 lesson 6.

G004 is taught before G005.

### Unit-44 delayed retrieval references only phrases taught earlier — PASS

Every repaired Unit-44 delayed/cross-unit order target is taught earlier in the learner path before the review order item:

- `u44-review-u43-1` → `u43-duration-now-source` — taught earlier in `u43-duration-now`
- `u44-review-u43-2` → `u43-newyear-source` — taught earlier in `u43-new-year`
- `u44-review-u43-3` → `u43-return-plan` — taught earlier in `u43-return-plan`
- `u44-review-u43-4` → `u43-nextyear-source` — taught earlier in `u43-next-year`
- `u44-review-cap1` → `u44-comparison-source` — taught earlier in `u44-even-more`
- `u44-review-cap2` → `u42-season-reason` — taught earlier in `u42-seasons`
- `u44-review-cap3` → `u44-not-as-source` — taught earlier in `u44-not-as`
- `u44-review-cap4` → `u43-finished-stay` — taught earlier in `u43-finished-duration`

For all of these, the order token arrays exactly match the referenced phrase token arrays.

### Pinyin Search global visibility / writing gate — PARTIAL PASS, overall requirement FAILS

The Search implementation itself is correct:

- search results remain globally visible;
- `searchPracticeCharacters(item, completed)` uses `firstTeachingLessonByCharacter`;
- a handwriting button is returned only when the owning first-teaching lesson is in `completed`.

However the separate unit character-library path in **BLOCKER A-02** still allows future writing practice to bypass first teaching. Therefore the handoff requirement fails at the product level even though the Search-specific branch passes.

---

## Strict learner path summary

### Unit 42

The sequential lesson path is prerequisite-safe for the checked Lesson-14 NEW material. The repaired spring listening no longer exposes future 秋天.

### Unit 43

Core grammar sequencing is repaired and correct:
- G001 before G002;
- 快 / 要 sense teaching before G003;
- Unit-42 weather is retrieved only after teaching.

But the assessed distractor `你明年回來嗎？` in `u43-duration-now` breaks the strict prerequisite boundary because 明年 belongs to `u43-next-year`.

### Unit 44

G004 before G005 is intact. The repaired delayed-retrieval / cross-unit order targets are all genuinely taught earlier and reconstruct their referenced phrases exactly.

The global character-library writing route nevertheless permits later Unit-44 characters to be practiced before their introduction.

---

## Final Simulation-A decision

**FAIL — do not advance Stage 7 on the basis of Simulation A.**

Two open BLOCKER findings remain:
1. premature assessed use of **明年** in Unit 43;
2. ungated future-character writing practice through the general unit character library/detail route.

Stop here.