# Book 1 Lesson 15 — Stage 7 Simulation A Final Rerun

**PR:** #69  
**Branch:** `book1-lesson15-source-a`  
**Simulation:** Stage 7 — Simulation A final rerun  
**Learner model:** strict prerequisite learner who knows exactly Book 1 through Unit 44 and nothing from Units 45–48 or Book 2 before starting  
**Result:** **FAIL — 0 BLOCKER / 2 MAJOR / 0 MINOR**

## Independence and scope

This rerun was performed from scratch against the current PR #69 learner-facing state. I did **not** open or read any historical Simulation-A report file before completing the independent rerun.

Reviewed for this rerun:
- `automation/book1/PROTOCOL.md` Stage 7 and severity rules;
- the frozen Lesson-15 curriculum/dependency/activity packet;
- current learner-facing `unit45.ts` → `unit48.ts`;
- current generated ownership index;
- `lesson15-simulation-a-rerun2-repair-conformance.md`;
- `lesson15-deterministic-qa-rerun3.md`.

The simulation was run in learner order: **Unit 45 → Unit 46 → Unit 47 → Unit 48**.

No repair was performed. No completion-state file was changed. Simulations B/C were not run.

---

## Final findings

### SIM-A-FINAL-01 — MAJOR — Unit-45 assessment exposes future NEW vocabulary `回家`

**Live path:** `u45-review-f1`

Current assessed payload:

- prompt: **Which question starts a health check by asking where the discomfort is?**
- options:
  - `哪裡不舒服？`
  - `大概多久了？`
  - `什麼時候回家？`

The exact lexical form **回家** is classified by the Lesson-15 dependency ledger as **B1L15-V043 NEW**, because the exact word is unowned at the Unit-44 baseline even though the component characters 回 and 家 are known. Its canonical teaching point is **Unit 48 / `u48-advice`**.

Therefore a strict Unit-44 learner is shown an exact future Lesson-15 lexical target inside an assessed distractor during the **Unit-45 review**, three units before its intended teaching point.

This is not a character false positive and not merely a substring/sense collision. The exact future lexical form is present.

The correct answer remains independently solvable from the health-inquiry material, so this is classified **MAJOR rather than BLOCKER**. It nevertheless violates the Stage-7 requirement to prevent later Lesson-15 vocabulary from appearing in assessed distractors before teaching.

**Upstream location:** this payload is also present in the frozen Unit-45 activity specification, so the smallest affected gate is the Unit-45 Gate-B activity specification rather than a production-only drift.

---

### SIM-A-FINAL-02 — MAJOR — Unit-47 full G003 source line is exposed before G003 is taught

**Live lesson:** `u47-vle-jiu`  
**Live first step:** `u47-g3-review`

The current first learner-visible card in the lesson is the full D2T02 line:

> 昨天晚上肚子很不舒服，吃了東西就吐，還吐了好幾次。

Its own note says **“Shown only after G003.”** The embedded `吃了東西就吐` is the Lesson-15 G003 integration being taught in this lesson.

The frozen Unit-47 activity specification requires:

1. a review card for prior Unit-39 completed-action 了, Unit-38 一…就…, and Unit-36 以後;
2. the `u47-vle-jiu` G003 grammar card;
3. controlled G003 checks;
4. only then the full `u47-d2t02-full` source line.

The frozen spec explicitly says the full D2T02 is **intentionally withheld until G003 is taught**. In the live implementation, it is displayed before the grammar card.

No G003 assessment occurs before the grammar explanation, so the path is not completely unsolvable. However, this is a material explain-before-use sequencing violation and a direct mismatch with the frozen learner order. It is therefore **MAJOR rather than BLOCKER**.

**Upstream location:** learner-facing Unit-47 implementation/conformance; the frozen Gate-B sequence itself is correct.

---

## Unit-by-unit strict-prerequisite simulation

### Unit 45 — FAIL because of SIM-A-FINAL-01

The main teaching sequence is otherwise learner-safe:

- all 12 Unit-45 NEW lexical items receive learner-facing meaning support before their controlled lexical checks;
- all 12 NEW characters receive lesson-local recognition plus the full handwriting lifecycle;
- `一直 / 直` are taught locally before productive use;
- symptom, throat, fever, and duration language is explained before its core assessments;
- the Unit-40 question-word + 都 retrieval is correctly identified as review rather than G001;
- D1T01–D1T05 are represented;
- review has **32 steps**, **3 listening items**, and complete handwriting retrieval for all 12 Unit-45 NEW characters.

The one failing assessment contaminant is the future exact lexical form **回家** in `u45-review-f1`.

### Unit 46 — PASS under the strict learner model

The repaired 幾 path is correct:

- `u46-ji-explain` precedes `u46-ji-s1`;
- it explicitly contrasts earlier Unit-7 interrogative **幾 = how many?** with the Lesson-15 non-interrogative **a few / several** sense;
- `她沒有幾個朋友。` supplies a statement/non-question example before assessment;
- canonical 幾 ownership remains Unit 7.

Other prerequisite checks also pass:

- G001 follows the local 幾 expansion and preserves the negative non-specific rule;
- 把 and 別 are explained before G002 assessment;
- modal 得 děi is explicitly separated from complement 得 de;
- 藥／藥局／拿 and the recovery vocabulary are taught before assessment;
- support-only **您** is explicitly explained before `好的，謝謝您。` and is not made canonical;
- A004's three source outcomes remain present;
- D1T06–D1T12 remain represented;
- review has **34 steps**, **3 listening items**, and complete handwriting retrieval for all 9 Unit-46 NEW characters.

### Unit 47 — FAIL because of SIM-A-FINAL-02

The Unit-46 → Unit-47 幾 dependency itself is correct:

- 次 is taught locally;
- the Unit-46 幾 expansion is explicitly retrieved;
- only then is **好幾次** assessed as “several times.”

Other Unit-47 paths pass:

- lexical EXPLAIN cards precede assessed vocabulary;
- all 8 NEW characters complete their handwriting lifecycle before review retrieval;
- P001/P002 support is taught before use;
- 陪／看病 and 健康／保險／健康中心 are taught before their assessed use;
- A005 preserves all four required health-condition questions;
- the repaired Unit-47 listening payloads are learner-safe;
- review has **34 steps**, **3 listening items**, and complete handwriting retrieval for all 8 Unit-47 NEW characters.

The failure is specifically the start of `u47-vle-jiu`, where the full G003-bearing source line appears one step before the G003 grammar explanation despite the frozen instruction to withhold it.

### Unit 48 — PASS under the strict learner model

The Unit-48 cumulative sequence is otherwise coherent:

- the 跟 recipient/addressee expansion is explained and contrasted with Unit-24 companionship before assessment;
- all 8 Unit-48 NEW lexical forms are taught before their controlled retrieval;
- 冰 completes its full NEW-character lifecycle before assessed lexical retrieval;
- G004 precedes the G006 comparison-degree work;
- G005 distinguishes complement 得 de from modal 得 děi;
- G007 is taught only after its required separable lexical forms are available;
- A001 retains the source table data and comparison tasks;
- A002 contains three distinct source-specific visual roles:
  - restroom/lower-abdomen scene — acceptance;
  - bed scene — acceptance;
  - throat/neck scene — polite rejection;
- A002 Task 2 retains the vomiting-after-dinner symptom scenario;
- A003 support appears before assessment with:
  - `一日4次`,
  - `3日份`,
  - support-only `份 fèn`,
  - `飯前`,
  - `飯後`,
  - `飯後30分鐘`,
  - contextual/glossed/non-assessed `健康診所`;
- `u48-prescription-support` and `u48-prescription-visual` remain `practice: false`;
- A003 answers remain exactly **四次 / 飯後30分鐘 / 十二包**;
- D2T08–D2T13 remain represented;
- review/capstone has **58 steps**, **3 listening items**, handwriting retrieval for 冰, A001–A005 retrieval, delayed Unit-45/46/47 retrieval, and final Lesson-15 closure.

---

## Full assessed-option / distractor rescan

I rescanned every learner-facing assessed `select`, `listen`, `order`, and `parts` step in Units 45–48, including all answer banks and order targets/tokens.

Live totals scanned:
- **289 assessed steps**
- **266 option-bearing banks**
- **34 listening steps**

The scan specifically checked:
- later Lesson-15 canonical vocabulary;
- later-owned formal NEW characters;
- later grammar/support dependencies;
- deferred/non-owned glyphs;
- source/support material becoming productive too early.

After manually adjudicating substring/sense collisions, only one genuine exact future multi-character canonical target remained in an earlier assessment: **回家** in `u45-review-f1`.

Apparent raw-string hits such as 水 inside 鼻水, 包 inside 小籠包, 睡 inside 睡覺, and 油 inside 加油 are not future-target leaks in those occurrences; they are earlier learned longer forms or earlier character/sense contexts.

No later-owned formal NEW character was found in an earlier assessed option bank after adjudication.

---

## Listening retest

All 20 repaired listener-safe payloads remain safe on the current learner-facing state:

- Unit 45:
  - `u45-doctor-l1`
  - `u45-sick-l1`
  - `u45-duration-l1`
  - `u45-review-l2`
- Unit 46:
  - `u46-ba-l1`
  - `u46-rec-l1`
  - `u46-visit-l1`
- Unit 47:
  - `u47-what-l1`
  - `u47-g3-l1`
  - `u47-a005-l1`
  - `u47-review-l1`
  - `u47-review-l2`
  - `u47-review-l3`
- Unit 48:
  - `u48-advice-l1`
  - `u48-g4-l1`
  - `u48-g5-l1`
  - `u48-g6-l1`
  - `u48-prescription-l1`
  - `u48-review-l1`
  - `u48-review-l2`

The five protected semantic-listening paths also remain semantically correct and learner-safe:

- `u46-review-l1`
- `u46-review-l3`
- `u47-stomach-l1`
- `u48-g7-l1`
- `u48-review-l3`

No finding is reopened against those listening repairs.

---

## Ownership, handwriting, Search/Mega, and support isolation

Current canonical totals across Units 45–48 are correct:

| Unit | NEW vocabulary | NEW characters | Formal grammar |
|---|---:|---:|---:|
| 45 | 12 | 12 | 0 |
| 46 | 10 | 9 | 2 |
| 47 | 12 | 8 | 1 |
| 48 | 8 | 1 | 4 |
| **Total** | **42** | **30** | **7** |

Canonical ownership remains correct:

- 幾 — Unit 7 canonical ownership; Lesson-15 semantic expansion only;
- 跟 — Unit 24 canonical ownership; Unit-48 recipient/addressee expansion only;
- 一直 — Unit 45;
- 直 — Unit 45;
- 您 — no canonical vocabulary/character ownership;
- 份 — no canonical vocabulary/character ownership;
- 診 — no canonical vocabulary/character ownership.

All 30 Lesson-15 NEW formal characters retain their full owning-lesson handwriting lifecycle plus review retrieval. The review counts/floors remain satisfied:

- Unit 45: 32 review steps / 3 listens;
- Unit 46: 34 / 3;
- Unit 47: 34 / 3;
- Unit 48: 58 / 3.

The repaired A003 support-only `份`, deferred `診`, and support-only `您` remain outside canonical ownership; nothing in this rerun indicates Search/Mega or handwriting promotion for them.

The canonical `一直 / 直` first-ownership migration is present at Unit 45 in the generated ownership index.

---

## Source activities, dialogue, delayed retrieval, and closure

The required source activities remain represented:

- **A001** — Unit-48 source table and four comparison/data checks;
- **A002** — three distinct visual roles plus Task-2 health scenario;
- **A003** — prescription notation/support and three exact answers;
- **A004** — all three 把 transfer outcomes in Unit 46, with later retrieval;
- **A005** — all four health-condition questions in Unit 47, with later retrieval.

The required Lesson-15 dialogue coverage remains represented across Units 45–48, including the 25-turn D1/D2 source sequence.

Delayed retrieval remains present across later reviews and Unit-48 cumulative closure: Unit-45 symptom/duration material, Unit-46 G001/G002/modal 得 and medicine/recovery material, Unit-47 幾/好幾次, G003, health/help material, and Unit-48 grammar/activity synthesis are all revisited.

Neither of the two MAJOR findings changes the fact that the repaired A002, A003, listening, support-only, ownership, handwriting, review-floor, and cumulative-closure paths remain intact.

---

## Gate decision

**Simulation A final rerun: FAIL.**

Severity count:
- **BLOCKER: 0**
- **MAJOR: 2**
- **MINOR: 0**

PASS requires **0 BLOCKER and 0 MAJOR**, so Stage 7 cannot pass on this state.

Smallest affected upstream locations:
1. **Gate B / Unit-45 activity specification** for the future-target `回家` distractor in `u45-review-f1`;
2. **Unit-47 implementation/conformance** for the premature `u47-d2t02-full` exposure in `u47-g3-review`.

Per the requested stop condition, this report records the findings only:
- **no repair performed**;
- **no completion-state update**;
- **no Simulation B/C**;
- **no traceability/release audit**;
- **no Gate C / merge / publish / Book-1 completion**.
