# Book 1 Lesson 15 — Stage 7 Simulation B: Adversarial Test Taker

Working repository: `Weather-Mister/hanzi-steps`  
Working PR: **#69**  
Working branch: `book1-lesson15-source-a`  
Audited PR head: `b71706e416676486284e38056143bb80ae2fc3f5`

## Verdict

**FAIL — 0 BLOCKER / 3 MAJOR / 0 MINOR**

PASS requires 0 open BLOCKER and 0 open MAJOR. Three open MAJOR findings remain.

This review was performed independently against the current PR state and the frozen/current Unit 45–48 activity specifications. No Simulation A or Simulation C report was read before completing the review. No repair was performed.

## Scope and adversarial method

I attacked every learner-facing assessed payload in Units 45–48, including select, listen, order, character handwriting/retrieval, grammar checks, source-transfer checks, reviews, and the Unit-48 capstone. There are no Lesson-15 `match` steps in Units 45–48.

The current production contains **289 select/listen/order assessed payloads** across the four units:

- Unit 45: 49
- Unit 46: 63
- Unit 47: 64
- Unit 48: 113

The audit checked answer-key uniqueness, option duplication, order reconstruction, token multiplicity, future-target leakage, explain-before-test order, new-character lifecycle order, Traditional-character surfaces, pinyin/source consistency, semantic listening, source activities A001–A005, review/capstone coverage, and downstream Search/Mega/productive-practice implications.

Structural checks found:

- every select/listen answer occurs exactly once in its option bank;
- no assessed option bank has duplicate choices;
- every listening item has audio;
- every order item reconstructs its referenced target phrase using the production renderer's exact index-based token check;
- no order token bank has duplicate-token multiplicity that makes reconstruction ambiguous;
- cross-unit capstone phrase references resolve through the global phrase registry;
- no assessed Unit 45–48 option/distractor exposes a later Lesson-15 canonical vocabulary item or later formal NEW character before its teaching point;
- all 42 Lesson-15 NEW lexical forms are taught before first assessed use;
- all 30 NEW formal characters preserve recognition/read → intro → trace → build → complete → memory before assessed lexical use;
- no common Simplified-character form was found on the audited assessed surfaces;
- all 42 NEW lexical text/pinyin pairs match their frozen Unit specifications.

## Open findings

### SIM-B-01 — MAJOR — support-only/source-data phrases leak into productive adaptive/Mega practice

The lesson payloads correctly keep support-only material out of canonical `newVocabulary`, and A003 correctly marks `u48-prescription-support` and `u48-prescription-visual` with `practice:false`. However, the downstream practice engine defaults every completed lesson phrase into adaptive practice unless its phrase record explicitly has `practice:false`.

Current `lib/practice-engine.ts` behavior:

1. `phraseItems(completed)` walks every completed lesson step with a phrase.
2. It excludes a phrase only when `phrase.practice === false`.
3. Any remaining phrase with at least one known Hanzi becomes a `PracticeItem`.
4. Phrase items support productive sentence/input modes, and any item with known characters also advertises handwriting mode.
5. `makeMegaCheckpoint` consumes these learned practice items and deliberately forces productive input/handwriting rather than recognition.

Current Lesson-15 records that conflict with their own support/data status include:

- `u46-thanks-nin` — `好的，謝謝您。`; the note says 您 remains support-only, but the phrase lacks `practice:false`. It contains earlier learned characters such as 好, so the phrase is eligible for the practice pool while carrying the support-only 您.
- `u46-a004-support-sorry` — `對不起`; explicitly support-only in the frozen/current spec, but lacks `practice:false`.
- `u48-minute-support` — `分鐘`; explicitly says “Support only; no formal vocabulary/Search/Mega ownership,” but lacks `practice:false`.
- `u48-a001-table` — the entire four-row source data table is represented as a normal phrase with one giant token and lacks `practice:false`. It contains learned Hanzi (for example 學/生 from Unit 1), so the complete source-data table is eligible to become an adaptive/Mega phrase item even though the frozen A001 contract says the table values are contextual data rather than vocabulary ownership.

Canonical vocabulary/Search ownership itself remains clean, and no dedicated handwriting lifecycle was created for 您 / 份 / 診. The failure is specifically **productive practice/Mega promotion** through the phrase pool. A003's `份` and deferred `診` path is correctly isolated because both prescription phrases are explicitly `practice:false`.

This violates the Stage-7 requirement that support-only/deferred material not become Mega/productive practice.

### SIM-B-02 — MAJOR — A004 production omits the frozen three response outcomes

The frozen Unit-46 A004 source records define three source stimulus/response outcomes:

1. `加油！我們今天一定要把這50個小籠包吃了。` → **`好的，沒有問題。`**
2. `要是你把今天的功課寫了，就可以去打籃球。` → **`太好了。`**
3. `誰把我的西瓜吃了？` → **`對不起，我不知道是你的。`**

Production preserves the three stimulus sentences and orders each of them in both the teaching lesson and review. It also shows a support card for `對不起`. But none of the three frozen response strings exists in `course/book1/unit46.ts`.

The runtime `Phrase` schema has no response field, and the learner-facing phrase renderer displays only `text / pinyin / meaning / note / tokens`. Consequently the fixed A004 responses from the frozen source-transfer record are not learner-visible or tested. The implemented A004 path therefore reduces the task to reconstructing the three 把 stimulus sentences plus a generic “what do these practice?” select.

This is a material frozen-source-transfer divergence under the explicit Stage-7 stress test “A004 all three source outcomes.”

### SIM-B-03 — MAJOR — multiple assessments depend on internal curriculum IDs the learner is never shown

The learner-facing `GrammarCard` renders a rule's title, pattern, explanation, examples, and “Keep in mind” text. It does **not** display internal IDs such as `G001`, `G003`, `G006`, or `G007`.

Nevertheless, multiple assessed prompts require the learner to interpret those hidden identifiers rather than naming the Chinese structure in learner-facing terms. Clear examples include:

- `u46-g1-s2` — “What restriction does the source give for **G001** statements?”
- `u46-review-g1` — “Which sentence is **G001** rather than Unit-40 totality?”
- `u46-review-g1b` — “What is mandatory in the source **G001** rule?”
- `u47-g3-s3` — “How should **G003** normally form a question in this lesson?”
- `u47-review-g3contrast` — “Which statement about **G003** is correct?”
- `u48-g7-s6` — “Which chunk in the same line is **G006 rather than G007**?”
- `u48-review-cum3` — “Which is Unit-46 **G001**?”
- `u48-review-cum6` — “Which sentence uses U47 **G003**?”

A related item, `u48-g7-s4`, asks which forms were “lexically available before this grammar lesson,” testing curriculum sequencing rather than the learner's Chinese.

Some of these can be guessed from immediate lesson context or from the Chinese options, but the identifier mapping itself is not learner-visible. In delayed review/cumulative use, the prompt is not self-contained. This is exactly an assessment of curriculum metadata rather than Chinese and affects required grammar/review coverage across Units 46–48.

The wording is frozen in the current activity specifications, so this is a frozen assessment-design defect rather than production drift.

## Explicit stress-test results

### Corrected Unit-45 review item

**PASS:** `u45-review-f1` contains:

- `哪裡不舒服？`
- `大概多久了？`
- `什麼東西都不想吃？`

Correct answer: `哪裡不舒服？`. There is no premature `回家`.

### Unit-47 G003 sequencing

**PASS.** Current production order in `u47-vle-jiu` is exactly:

1. `u47-g3-review` → `u47-g3-prereq-review` (`practice:false`)
2. grammar `u47-vle-jiu`
3. `u47-g3-s1`
4. `u47-g3-s2`
5. `u47-g3-s3`
6. `u47-g3-s4`
7. `u47-g3-p1` → full `u47-d2t02-full`
8. `u47-g3-s5`
9. `u47-g3-l1`
10. `u47-g3-p2` → explicit `u47-g3-order`
11. `u47-g3-o1`

The full source line is not exposed before G003 instruction.

### Twenty repaired learner-safe listening payloads

**PASS on payload/key semantics and future-target safety.** The repaired set was independently retested:

- Unit 45: `u45-doctor-l1`, `u45-sick-l1`, `u45-duration-l1`, `u45-review-l2`
- Unit 46: `u46-ba-l1`, `u46-rec-l1`, `u46-visit-l1`
- Unit 47: `u47-what-l1`, `u47-g3-l1`, `u47-a005-l1`, `u47-review-l1`, `u47-review-l2`, `u47-review-l3`
- Unit 48: `u48-advice-l1`, `u48-g4-l1`, `u48-g5-l1`, `u48-g6-l1`, `u48-prescription-l1`, `u48-review-l1`, `u48-review-l2`

No repaired item has two defensible answer choices, a wrong key, or later-target distractor leakage.

### Five protected semantic-listening items

**PASS:** `u46-review-l1`, `u46-review-l3`, `u47-stomach-l1`, `u48-g7-l1`, and `u48-review-l3` all match the full audio meaning and have a single defensible answer.

### A001 exact source table

**PASS.** Current table preserves the four aliased rows and values:

- 學生一: 兩碗 / NT$18,000 / 計程車 / 三個半小時
- 學生二: 一碗半 / NT$6,500 / 火車 / 四個半小時
- 學生三: 兩碗半 / NT$15,000 / 機車 / 八個小時
- 學生四: 半碗 / NT$6,200 / 高鐵 / 一個小時四十分鐘

The four A001 keyed questions are arithmetically/source-data correct. The separate downstream practice-pool problem with the table is covered by SIM-B-01.

### A002 visual role prompts

**PASS.** The three prompts are distinct:

- restroom/lower-abdomen scene — acceptance — `好的。`
- bed scene — acceptance — `謝謝你。`
- throat/neck scene — polite rejection — `謝謝你的關心。……`

All three expose the same frozen suggestion bank: `看病 / 多休息 / 早一點睡覺 / 多喝水`. Deferred rejection glyphs are not required as assessed answers.

### A003 prescription

**PASS.** Before the questions, production shows:

- `一日4次`
- `3日份`
- support-only `份 fèn`
- `飯前`
- `飯後`
- `飯後30分鐘`
- contextual/glossed `健康診所` with deferred `診`

Both prescription support records are `practice:false`.

Exact answers remain:

- `四次`
- `飯後30分鐘`
- `十二包`

The arithmetic 4 doses/day × 3 days = 12 packets is correct.

### A004

**FAIL:** see SIM-B-02. The three 把 stimulus/order paths exist, but the three frozen response outcomes are absent from production.

### A005

**PASS.** All four required health-condition questions are learner-visible and independently assessed:

- `哪裡不舒服？`
- `有沒有發燒？`
- `喉嚨怎麼樣？`
- `胃口怎麼樣？`

The contextual proper name remains romanized/non-assessed.

### Unit-48 cumulative/capstone

The four direct capstone items are structurally and semantically valid:

- `u48-review-cap1` reconstructs `哪裡不舒服？` through the global Unit-45 phrase reference;
- `u48-review-cap2` reconstructs `我一直流鼻水，頭很痛。`;
- `u48-review-cap3` reconstructs `多喝水，多休息，早一點睡覺。`;
- `u48-review-cap4` correctly keys `謝謝你的關心。不用了。`.

The wider Unit-48 cumulative review is **not fully clean** because of SIM-B-03's internal-ID prompts, including `u48-review-cum3` and `u48-review-cum6`.

## Gate decision

Simulation B: **FAIL**

- BLOCKER: **0**
- MAJOR: **3**
- MINOR: **0**

Open MAJOR findings:

1. SIM-B-01 — support-only/source-data phrases leak into adaptive/Mega productive practice.
2. SIM-B-02 — A004 omits the frozen three response outcomes.
3. SIM-B-03 — assessed prompts rely on learner-invisible curriculum IDs/metadata.

No repair was made. Simulation A/C, traceability/release audit, Gate C, merge, publish, deploy, and Book-1 completion were not performed.
