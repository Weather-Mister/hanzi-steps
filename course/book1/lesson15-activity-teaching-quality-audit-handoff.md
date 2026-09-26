# Book 1 Lesson 15 — Activity Audit 1 Handoff: Teaching Quality

Working repository: `Weather-Mister/hanzi-steps`  
Working draft PR: **#69**  
Working branch: `book1-lesson15-source-a`

Checkpoint: **Stage 4 activity engineering is complete; Gate B is pending.**

This handoff starts **Activity Audit 1 — Teaching Quality**. Do not assume the engineered activity packet is pedagogically sound merely because Gate A passed.

## Required reading

Read:
1. `automation/book1/PROTOCOL.md`, especially Stage 4 / Gate B.
2. `ADDING_A_UNIT.md`, especially explain-before-test, activity payloads, review floors, Search/Mega behavior, and handwriting safeguards.
3. `course/book1/lesson15-source-ledger.md`.
4. `course/book1/lesson15-dependency-ledger.md`.
5. frozen `course/book1/lesson15-curriculum-blueprint.md`.
6. `course/book1/lesson15-activity-spec.md`.
7. all four unit specs:
   - `course/book1/lesson15-unit45-activity-spec.md`
   - `course/book1/lesson15-unit46-activity-spec.md`
   - `course/book1/lesson15-unit47-activity-spec.md`
   - `course/book1/lesson15-unit48-activity-spec.md`
8. `course/book1/completion.json`.
9. Targeted prior-unit files only when needed to verify a prerequisite, prior sense, or earlier grammar contract.

Do not treat the activity-engineering author's explanations as audit evidence. Verify the actual sequence.

## Audit objective

Determine whether a strict Unit-44 learner can genuinely learn the complete Lesson-15 material from these activities before being tested on it.

For every important NEW or EXPANSION target, verify the full lifecycle:

**EXPLAIN → RECOGNIZE → CONTROLLED PRACTICE → CONTEXTUAL USE → RETRIEVAL → DELAYED RETRIEVAL → CUMULATIVE MIXING**

For every NEW character, verify:
- recognition/reading before assessment;
- `intro → trace → build → complete → memory` before independent writing;
- contextual reading;
- review handwriting retrieval;
- no standalone handwriting practice before first teaching is complete.

## Required attacks

Audit especially for:

### Explain-before-test and sequencing
- any vocabulary, sense, grammar, support item, glyph, pronunciation, or pragmatic use assessed before explanation;
- any dialogue line exposed before all NEW/EXPANSION dependencies in that line;
- any activity task whose support is explained too late;
- any lesson whose internal order makes a later explanation necessary to solve an earlier question.

### Unit 45
- all 12 NEW words and 12 NEW characters actually learnable, not merely named;
- 差 = chā taught explicitly;
- X002 health inquiry and X004 duration integration taught before retrieval;
- Unit-40 totality is reviewed without accidentally teaching G001 early;
- 生病/發炎/發燒 do not imply untaught G007 insertion behavior;
- D1T01–D1T05 remain comprehensible without 白/妳/玉 as productive prerequisites.

### Unit 46
- 幾 “a few/several” taught before G001 and later 好幾次;
- G001 remains always negative and distinct from Unit-40 question-word totality;
- modal 得 děi is explicitly taught before 得吃藥;
- G002 teaches, rather than merely tests:
  - definite-reference bias;
  - outward-transitive restriction;
  - rejection of inward verbs;
  - sentence-final 了;
  - 沒/別 before 把;
  - source question routes;
  - final-了 vs Unit-39 verbal-了 distinction;
- 別 precedes G002 dependent use;
- 您 is explained before literal productive use;
- A004 support X040–X043 precedes all three required source outcomes;
- 睡覺 jiào pronunciation is taught.

### Unit 47
- 次 and prior 幾 expansion precede 好幾次;
- G003 is taught before full D2T02;
- G003 contrast with 一…就…, 以後 compatibility, and no ordinary A-not-A are all taught and practiced;
- P001 怎麼了 and P002 不用了 are taught pragmatically, not only translated;
- X010 / X011 are explained before literal dialogue use;
- A005 genuinely supports four health-condition questions and does not make 玉 a prerequisite.

### Unit 48
- 跟 recipient/addressee sense is explained before D2T08 and contrasted with companionship 跟;
- 油 / 冰 / 最好 / 別 support is available before P009;
- G004 fully distinguishes 一點+NP, Vs+一點, 有（一）點+Vs, 一點點;
- G004 precedes G006;
- G005 teaches both source patterns, verb repetition, 不比, and question routes;
- complement 得 de remains distinct from modal 得 děi;
- 分鐘 is explained before A001/A003 use;
- X035 fractional-bowl language is explained before A001;
- G005 + G006 are available before A001;
- G007 appears only after 生病 / 睡覺 / 看病 / 回家 are lexically available;
- all three separable-verb insertion types are actually taught;
- 份 / 一日4次 / 3日份 / 飯後 / 飯後30分鐘 are explained before A003 questions;
- A002 genuinely supports the three source visual role prompts and the doctor/patient task;
- culture remains source-era framed rather than current health advice.

### Retrieval quality
- every canonical NEW and important EXPANSION target has independent retrieval rather than only copied dialogue recognition;
- review questions require the intended knowledge rather than obvious elimination;
- delayed retrieval occurs in later Lesson-15 units;
- Unit 48 cumulative mixing genuinely integrates Units 45–47;
- S001–S004 require Chinese performance/selection appropriate to the outcomes, not curriculum-label recognition.

### Search / Mega / handwriting
- no duplicate canonical ownership for 幾 or 跟;
- no Search/Mega ownership for support-only 您 / 份 or deferred glyphs;
- 一直 / 直 migration remains a later implementation requirement, not a hidden prerequisite;
- no standalone handwriting route can unlock before the owning teaching lesson.

## Source activities and dialogue

Confirm that activity engineering really supports:
- A001 exact comparison table/data and fractional/time support;
- A002 three source illustration prompts, two acceptances + one rejection, and Task 2;
- A003 all three prescription questions;
- A004 all three required 把 outcomes;
- A005 four health-condition questions;
- all 25 dialogue turns with prerequisite-safe timing.

## Findings and verdict

Record findings as **BLOCKER / MAJOR / MINOR** with:
- exact file + lesson/step IDs;
- why the sequence fails or succeeds;
- smallest safe repair;
- blast radius: LOCAL / ACTIVITY / UNIT / CROSS_UNIT / CURRICULUM / SOURCE.

PASS requires:
- open BLOCKER = 0;
- open MAJOR = 0.

If you find an activity-level defect, repair the smallest affected activity-spec artifact and re-audit until the teaching-quality verdict is genuine. If a repair would change frozen curriculum/source ownership, stop and reopen the appropriate upstream gate instead of silently changing Gate A.

Persist the audit as:
`course/book1/lesson15-activity-teaching-quality-audit.md`

Update `course/book1/completion.json` only with this audit result/checkpoint. Do **not** run Activity Audit 2 or 3 in this context. Do not pass Gate B unless all three audits have separately passed. Do not implement Units 45–48.
