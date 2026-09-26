# Book 1 Lesson 15 — Stage 7 Learner Simulation A

Simulation: **A — strict prerequisite learner**  
Working PR: **#69**  
Branch reviewed: `book1-lesson15-source-a`  
PR head reviewed: `e89542e9d55576f58145d9e46aa6482b808db309`  
Baseline: learner knows **exactly Book 1 through Unit 44**, and knows nothing from Units 45–48 or Book 2 before starting this batch.  
Simulation order: **Unit 45 → Unit 46 → Unit 47 → Unit 48**.

## Verdict

**FAIL**

Open findings:
- **BLOCKER: 1**
- **MAJOR: 0**
- **MINOR: 0**

PASS requires zero open BLOCKER and zero open MAJOR. No implementation or frozen artifact was repaired in this simulation.

## BLOCKER findings

### SIM-A-01 — A003 no longer teaches/reads the frozen source prescription notation

**Severity:** BLOCKER  
**Smallest likely blast radius:** **ACTIVITY** — Unit 48 A003 prescription support / source-transfer path.

The frozen Unit-48 activity specification requires the strict learner, **before any A003 question**, to receive explicit learner-facing support for:

- `一日4次` — four times per day;
- `3日份` — a three-day supply;
- `份 fèn` — support-only supply/portion unit, with no canonical vocabulary, Search/Mega, or handwriting ownership;
- `飯前`;
- `飯後`;
- `飯後30分鐘`;
- the glossed, non-assessed `健康診所` prescription header, with `診` deferred.

The actual learner-facing implementation instead gives:

- `u48-prescription-support`: **“4 times/day／3-day supply／飯前／飯後／飯後30分鐘”**
- `u48-prescription-visual`: **“Health Clinic｜4 times/day｜3-day supply｜飯後｜飯後30分鐘”**

The implementation note explicitly says that the source supply-count glyph is **withheld from learner-facing Chinese**. Therefore the learner never receives the frozen local reading support for `3日份` / `份`, and the source clinic header is replaced by English rather than shown as the required glossed, non-assessed contextual header.

This does **not** create a hidden prerequisite in the multiple-choice arithmetic itself: the learner can still infer (4 × 3 = 12) because the implementation supplies the relevant values in English. The failure is that A003 ceases to be the frozen source-prescription reading task. A strict Unit-44 learner can answer the translated/sanitized implementation without ever learning to parse the required source notation. That is missing required frozen learner-facing source material rather than safe support-only handling.

No repair is performed here.

---

## Simulation evidence

### 1. Baseline and prerequisite direction

`course/book1/completion.json` confirms the production baseline is complete through **Unit 44**, with Units **45–48** as the active Lesson-15 batch.

The current curriculum registry confirms the important prerequisite grammar is owned before Unit 45:

- `u25-bi-comparison`, `u25-bi-negation`;
- `u28-separable-duration`;
- `u31-sentential-le`;
- `u36-yihou-after`;
- `u38-yi-jiu`;
- `u39-verbal-le`, `u39-bu-vs-mei`;
- `u40-questionword-totality`;
- `u41-shibushi`.

The seven Lesson-15 grammar rules are first-owned only in the intended later lessons:

- Unit 46: `u46-noncommittal-question-words`, `u46-ba-disposal`;
- Unit 47: `u47-vle-jiu`;
- Unit 48: `u48-a-little-degree`, `u48-action-comparison-de`, `u48-comparison-degree`, `u48-separable-verbs`.

No Book-2 grammar is required by Units 45–48.

### 2. Canonical lexical ownership — 42 / 42

The current `course/index.json` contains exactly **42** canonical NEW vocabulary rows owned by Units 45–48:

- Unit 45: **12**
- Unit 46: **10**
- Unit 47: **12**
- Unit 48: **8**

No missing or duplicate Lesson-15 canonical NEW row was found.

The two semantic expansions retain their earlier canonical ownership exactly as frozen:

- `幾` → Unit 7, canonical gloss **“how many”**;
- `跟` → Unit 24, canonical gloss **“with; together with”**.

Their Lesson-15 senses are taught locally without a second canonical vocabulary row.

### 3. Character ownership and handwriting timing — 30 / 30

The current registry contains exactly **30** NEW Lesson-15 character rows:

- Unit 45: **12**
- Unit 46: **9**
- Unit 47: **8**
- Unit 48: **1**

Within the learner-facing unit sequences, new characters are introduced with recognition/read support and the required:

`intro → trace → build → complete → memory`

cycle before the first lexical assessment that depends on the newly owned character. Each unit review then includes later `complete` handwriting retrieval:

- Unit 45: 12 characters;
- Unit 46: 9;
- Unit 47: 8;
- Unit 48: 冰.

No support-only item is added to canonical character ownership.

### 4. `一直 / 直` migration

The migration is learner-safe for this batch:

- canonical `一直` now first-owns in **Book 1 Unit 45 / u45-runny-nose**;
- canonical `直` now first-owns in **Book 1 Unit 45 / u45-runny-nose**;
- Book 2 Unit 1 lists `一直` under **reviewVocabulary**;
- Book 2 Unit 1 lists `直` under **reviewCharacters**;
- Book 2 Unit 1 does not own either as new canonical vocabulary/character.

Therefore Unit 45 has no Book-2 prerequisite.

### 5. Support-only and deferred material

Safe local support behavior verified for:

- `您`: explained before `好的，謝謝您。`; absent from canonical vocabulary/character registry;
- `對不起`: local support card; absent from canonical vocabulary/character registry;
- `分鐘`: explicitly explained as local support before A001/prescription timing; absent from canonical vocabulary/character registry;
- source/proper-name glyphs: contextual only and not given Lesson-15 canonical ownership or handwriting ownership.

`份` is also absent from canonical ownership, which is correct for support-only status, but **SIM-A-01** blocks because its required learner-facing local reading support is omitted altogether rather than safely scaffolded.

### 6. Unit 45 simulation

The strict learner can progress through Unit 45 without later knowledge:

- character cycles precede lexical tests;
- the five meaning-first lexical EXPLAIN cards precede assessed vocabulary;
- no Lesson-15 formal grammar is prematurely inferred from `生病` / `發炎` / `發燒`;
- D1T01–D1T05 integration occurs only after symptom and duration prerequisites are available.

Review floor is satisfied exactly:
- **32 review steps**
- **3 listening**
- all **12** NEW vocabulary items independently retrieved
- all **12** NEW characters handwriting-retrieved.

### 7. Unit 46 simulation

Prerequisite direction is learner-safe:

- `幾` “a few/several” is explicitly taught before G001;
- `藥` is taught before modal `得 děi` medicine use;
- `把` and `別` are taught before G002 assessment;
- G002 is taught before A004;
- `您` is explained before the literal `謝謝您` use;
- A004 follows the required grammar/support path.

Review floor:
- **34 review steps**
- **3 listening**
- all **10** canonical NEW vocabulary items
- `幾` Lesson-15 expansion
- all **9** NEW characters
- G001, G002, modal `得`, A004
- delayed Unit-45 retrieval.

### 8. Unit 47 simulation

Prerequisite direction is learner-safe:

- Unit-46 `幾` “a few/several” is retrieved before `好幾次`;
- `次` is taught before productive/retrieval use of `好幾次`;
- the full D2T02 `V了…就…` line is withheld until G003 is introduced;
- help/refusal and health-center vocabulary precede the relevant dialogue/source tasks;
- A005 occurs after the required Unit-45 health vocabulary and Unit-47 condition/help language.

A005 preserves all four required health-condition questions:
- `哪裡不舒服？`
- `有沒有發燒？`
- `喉嚨怎麼樣？`
- `胃口怎麼樣？`

Review floor:
- **34 review steps**
- **3 listening**
- all **12** NEW vocabulary items
- all **8** NEW characters
- G003
- `幾` expansion retrieval
- A005
- delayed Units 45–46 retrieval.

### 9. Unit 48 sequencing before the A003 blocker

The learner-facing order is otherwise prerequisite-safe:

- recipient/addressee `跟` is explained and contrasted with Unit-24 companionship `跟` before assessment;
- `冰` completes its character lifecycle before lexical assessment;
- advice vocabulary precedes D2T08–D2T10 and A002;
- G004 is taught before G006;
- `包`, `睡`, `小時`, and support-only `分鐘` precede the comparison/source-table work;
- G005 and G006 precede A001;
- `生病 / 睡覺 / 看病 / 回家` are all lexically available before G007 productive splitting;
- the full D2T13 line appears after G007.

### 10. A001–A005

- **A001:** PASS for strict prerequisite progression. Exact source values are present, comparison grammar is already taught, fractional-bowl support is provided, and `分鐘` is introduced before the source duration check.
- **A002:** PASS. The three learner-facing source visual inputs are distinct:
  1. lower-abdomen/restroom scene — acceptance — closes `好的。`;
  2. bed scene — acceptance — closes `謝謝你。`;
  3. throat/neck scene — polite rejection — begins `謝謝你的關心。……`.
  
  All three retain the shared suggestion bank rather than inventing fixed symptom/advice mappings. Task 2 retains the vomiting-after-dinner / stomach-discomfort scenario.
- **A003:** **BLOCKED by SIM-A-01.** The numerical questions remain solvable, but the frozen source prescription notation/support has been replaced with English.
- **A004:** PASS for strict prerequisite progression. G002 precedes the activity and all three frozen outcomes are present.
- **A005:** PASS for strict prerequisite progression. All four required condition questions are available from already-taught material.

### 11. Five semantic-listening checks

All five designated semantic-listening items preserve full-meaning distinctions rather than reducing the answer to surface-string matching:

1. `u46-review-l1` — modal `得` means **must / have to**.
2. `u46-review-l3` — complete recovery advice; **去買房子** is correctly the item not present.
3. `u47-stomach-l1` — **stomach discomfort and repeated vomiting**.
4. `u48-g7-l1` — **separable-verb duration + degree comparison**.
5. `u48-review-l3` — **separable duration + much-better comparison**.

No semantic-listening prerequisite failure was found.

### 12. Review floors, delayed retrieval, and cumulative closure

Actual review counts satisfy the frozen minimums:

| Unit | Actual review steps | Listening | Frozen floor |
|---|---:|---:|---:|
| 45 | 32 | 3 | ≥30 / ≥3 listening |
| 46 | 34 | 3 | ≥30 / ≥3 listening |
| 47 | 34 | 3 | ≥30 / ≥3 listening |
| 48 | 58 | 3 | ≥40 / ≥3 listening |

Delayed retrieval is present in the required direction:

- Unit 45 material → Unit 46 review;
- Units 45–46 → Unit 47 review;
- Units 45–47 → Unit 48 cumulative review.

Unit 48 contains delayed A004/A005 retrieval, twelve earlier-unit cumulative checks, culture framing, and four final S001–S004/F001–F004 capstone checks. Apart from the A003 blocker, the cumulative closure is structurally complete.

### 13. Search / Mega implications

The current canonical registry is consistent with the frozen ownership model:

- all 42 NEW forms have one Unit-45–48 canonical owner;
- `幾` and `跟` retain earlier form ownership rather than receiving duplicate rows;
- `一直 / 直` first-own in Unit 45;
- `您`, `對不起`, `份`, and `分鐘` do not leak into canonical vocabulary/character ownership.

This Simulation A did not run Simulation C's separate practice/Search/Mega progression exercise. For the strict-prerequisite path itself, no registry-level future dependency or support-only canonical leak was found.

---

## Final Stage-7 Simulation A state

**FAIL — 1 open BLOCKER / 0 open MAJOR / 0 open MINOR.**

The smallest likely affected upstream area is the **Unit-48 A003 activity implementation/support path**. This report does not repair it and does not redefine any frozen upstream artifact.

Stopped here as required:
- no implementation repair;
- no Simulation B;
- no Simulation C;
- no traceability;
- no release audit;
- no Gate C;
- no merge;
- no publish;
- no Book-1 completion.
