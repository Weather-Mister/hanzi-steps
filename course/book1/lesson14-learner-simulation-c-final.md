# Book 1 Lesson 14 — Final Learner Simulation C

Simulation: **C — cumulative learner**  
PR: **#68**  
Branch: `book1-lesson14-source-a`  
Learner-facing head audited: `62e82ced46be0919da18df923acda659bc88286c`

## Independence and scope

This simulation was performed independently from the other final learner-simulation reruns. The other final Simulation A/B reports were not read.

The simulated learner completes Units **42 → 43 → 44** in order, then uses:

- Unit reviews and delayed retrieval;
- Pinyin Search;
- handwriting practice;
- Mega Challenge;
- adaptive practice / Daily 10 / Mixed Mastery;
- the final Lesson-14 capstone.

Pass rule from the rerun handoff: **PASS requires zero open BLOCKER and zero open MAJOR findings.**

## Cumulative simulation

### 1. Unit 42 survives into Unit 44 — PASS

Unit 42 is not isolated after completion.

- Unit 43 review already retrieves earlier weather through `u43-review-cum1`.
- Unit 44 review returns to Unit-42 seasons/weather repeatedly:
  - A003 seasonal temperature comparisons use 夏天 / 秋天 / 冬天;
  - A004 weather interview covers all four seasons plus rain/snow/typhoon questions;
  - `u44-review-cap2` reconstructs the already-taught Unit-42 phrase `u42-season-reason`:  
    `因為我怕冷，所以我比較喜歡春天。`
- Unit-42 forms also remain available to the adaptive practice pool after their owning lessons are complete.

The cumulative learner therefore has meaningful later retrieval of the Unit-42 weather/seasons material in both recognition/comparison work and productive Chinese construction.

### 2. Unit 43 duration, imminence, and delayed lexical retrieval — PASS

The Unit-43 targets receive multiple later retrieval routes in Unit 44.

Duration:
- `u44-review-cum2` directly contrasts accumulated-to-now duration with completed duration.
- `u44-review-u43-1` reconstructs `u43-duration-now-source`:  
  `我在臺灣住了半年多了。有一點想家。`
- `u44-review-cap4` reconstructs `u43-finished-stay`:  
  `我在臺灣住了一年。`

Imminence:
- Unit 44 reuses `快要…了` in typhoon context.
- `u44-review-cum3` independently identifies `颱風快要來了。` as imminence.
- `u44-review-u43-2` reconstructs `u43-newyear-source`, retaining the earlier G003 teaching.

Required delayed lexical retrieval:
- 想 “miss” → `u44-review-u43-1` through `想家`;
- 新年 / 父母 → `u44-review-u43-2`;
- 十二月底 → `u44-review-u43-3`;
- 明年 / 紅葉 → `u44-review-u43-4`.

These are productive order tasks using phrases already taught in Unit 43, not English curriculum-metadata questions.

### 3. All 30 canonical NEW forms reach Search and Mega at the correct boundary — PASS

Canonical Lesson-14 NEW forms in production:

- Unit 42: **11**
- Unit 43: **7**
- Unit 44: **12**
- Total: **30**

The generated curriculum index gives every one of these 30 forms the expected Unit-42/43/44 owning lesson; no ownership mismatch was found.

Pinyin Search:
- Search reads the global runtime `vocabulary` through `vocabularyLookup`.
- Units 42–44 are registered in the Book-1 manifest.
- Search itself is intentionally global rather than progress-filtered, so all 30 canonical forms are discoverable.

Mega Challenge:
- `learnedVocabulary(completed)` admits a vocabulary item only when `completed.has(item.lessonId)`.
- Mega Challenge builds its learned pool from `learnedVocabulary(completed)`.
- Therefore each Lesson-14 NEW form enters Mega only after its own canonical teaching lesson has been completed, not merely because the form exists globally in Search.

Adaptive practice uses the same completed-lesson learned pool, so future Lesson-14 vocabulary does not leak into Daily 10 / Mixed Mastery before learning.

### 4. Search handwriting remains locked until first character teaching — PASS

Search separates lookup visibility from writing eligibility.

`searchPracticeCharacters`:

1. finds the first non-review lesson that teaches each character;
2. requires that first teaching lesson to be present in the learner's completed set;
3. exposes the Search result regardless, but withholds the handwriting action until that requirement is met.

Thus a learner may see a future word in global Search, but Search cannot use it to bypass first character teaching.

After the cumulative learner has completed Units 42–44, the relevant writing actions unlock normally.

### 5. 想 / 快 / 要 retain earlier canonical ownership while Lesson-14 senses are practiced — PASS

The cumulative index keeps the original owners:

- 想 → Unit 4, `u4-want`, canonical gloss “want to; think”;
- 快 → Unit 24, `u24-degree`, canonical gloss “fast; quick”;
- 要 → Unit 4, `u4-want`, canonical gloss “want; intend to”.

None is duplicated in Unit-43 `newVocabulary`.

Lesson 14 instead teaches the expansions locally:

- 想 = “miss” is explicitly taught and tested in the duration-to-now lesson, then retrieved in Unit-43 review and again in Unit 44 through `想家`.
- 快 = “soon/about to” and 要 = imminent-event auxiliary are explicitly presented before `u43-imminent`.
- Unit-43 review separately retrieves the Lesson-14 senses of 想 / 快 / 要.

This preserves canonical Search/Mega ownership while still giving the new Lesson-14 senses explicit teaching and cumulative retrieval.

### 6. All 21 NEW characters receive later handwriting retrieval — PASS

NEW character totals:

- Unit 42: **8** — 冷、滑、雪、春、冬、夏、秋、雨
- Unit 43: **6** — 只、父、母、停、底、葉
- Unit 44: **7** — 傘、颱、濕、討、厭、聞、更

Total: **21 / 21**.

Every NEW character appears again in its unit review as a later handwriting-retrieval step. No Lesson-14 NEW character is missing from later review.

The curriculum index also assigns all 21 to the expected first teaching lesson, which is the same boundary used by Search handwriting gating.

### 7. Unit 44 review and final capstone — PASS

The implemented Unit-44 review contains exactly **41 steps**.

Its four final order tasks are genuine Chinese-construction checks and collectively cover the four Lesson-14 end-state outcomes:

- `u44-review-cap1` → `這次的颱風會比上次的更大，請大家多小心。`  
  covers weather/typhoon language and supplies a full event-comparison context;
- `u44-review-cap2` → `因為我怕冷，所以我比較喜歡春天。`  
  covers four-seasons preference/reason language;
- `u44-review-cap3` → `希望這次的沒有上次的那麼可怕。`  
  independently constructs the Lesson-14 comparison outcome with 沒有…那麼;
- `u44-review-cap4` → `我在臺灣住了一年。`  
  covers simple experience/trip-style completed-duration reporting.

This maps the capstone to:

- S001 / F001 — weather conditions including typhoons;
- S002 / F002 — seasons and preferences;
- S003 / F003 — comparisons;
- S004 / F004 — experiences/trips.

The learner must construct Chinese from ordered token banks; the capstone does not reduce the end-state outcomes to recognition of English curriculum labels.

## Practice-surface result

After sequentially completing Units 42–44:

- unit reviews preserve immediate and delayed retrieval;
- Search contains the complete Lesson-14 canonical vocabulary while respecting handwriting unlock boundaries;
- direct handwriting practice is available for the characters already taught;
- Mega Challenge receives Lesson-14 canonical words at their owning-lesson completion boundary;
- adaptive practice receives only already-completed material and can continue resurfacing earlier units;
- Mixed Mastery uses completed-unit checkpoint logic and productive modes;
- Unit-44 delayed retrieval explicitly returns to important Unit-42 and Unit-43 material;
- the final capstone reconstructs Chinese for all four Lesson-14 outcome areas.

## Findings

### BLOCKER

None.

### MAJOR

None.

### MINOR

None.

## Verdict

**PASS**

Open BLOCKER: **0**  
Open MAJOR: **0**  
Open MINOR: **0**

Simulation C finds no cumulative-learning defect that requires reopening an upstream gate. Stop here; the main development context must verify all three final simulation reports on the actual PR head before proceeding to Stage 8.
