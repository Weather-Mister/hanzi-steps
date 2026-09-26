# Book 1 Lesson 15 — Learner Simulation A Rerun 2

Working repository: Weather-Mister/hanzi-steps  
Working PR: **#69**  
Working branch: **book1-lesson15-source-a**  
Simulated branch head: **a265072acafa80b7b84ebd23af12520b947e86e0**

## Verdict

**FAIL**

Fresh Simulation-A-rerun-2 severity:

- BLOCKER: **0**
- MAJOR: **1**
- MINOR: **0**

The latest repaired implementation passes the specifically repaired Unit-46 幾 path and the repaired Unit-48 A003 path, but a strict prerequisite learner still encounters untaught later vocabulary and, in several cases, untaught later formal characters inside learner-visible assessment distractors before those targets are introduced.

This is a cross-unit implementation-conformance defect. The frozen activity specification already supplies learner-safe semantic distractors at the affected listening IDs, so the smallest affected upstream gate is **Stage 5 implementation**, not the frozen curriculum or Gate-B activity design.

No implementation repair was performed. Simulations B/C, traceability, hostile release audit, Gate C, merge, publish, deploy, and Book-1 completion were not performed.

## Independence guard

This rerun was performed from scratch against the current repaired implementation and current frozen packet.

I did **not** read either historical Simulation-A report before completing this rerun:

- course/book1/lesson15-learner-simulation-a.md
- course/book1/lesson15-learner-simulation-a-rerun.md

The learner baseline used throughout was exactly:

- Book 1 through Unit 44 is known;
- Units 45–48 are unknown at the start;
- Book 2 is unknown and is never treated as a prerequisite.

## Audit basis

The fresh simulation used:

- automation/book1/PROTOCOL.md — Stage 7 / Learner A and severity rules
- course/book1/lesson15-curriculum-blueprint.md
- course/book1/lesson15-activity-spec.md
- course/book1/lesson15-unit45-activity-spec.md
- course/book1/lesson15-unit46-activity-spec.md
- course/book1/lesson15-unit47-activity-spec.md
- course/book1/lesson15-unit48-activity-spec.md
- course/book1/lesson15-simulation-a-rerun-repair-conformance.md
- course/book1/lesson15-deterministic-qa-rerun2.md
- course/book1/unit45.ts through unit48.ts
- course/index.json
- course/book1/unit07.ts
- course/book1/unit24.ts
- course/book2/unit01.ts
- lib/vocabulary-lookup.ts
- lib/mega-challenge.ts
- lib/practice-engine.ts
- lib/curriculum.ts

The prior conformance and deterministic reports were treated only as current-state evidence. Learner-facing sequencing and payloads were independently re-inspected in the current unit modules.

## Finding SIM-A-RERUN2-01 — Untaught later material appears in assessment distractors

**Severity: MAJOR**  
**Blast radius: CROSS_UNIT**  
**Smallest affected upstream gate: implementation**  
**Uncertainty: CLEAR**

A strict Unit-44 learner is shown later Lesson-15 material inside several assessment choices before that material has been explained or its NEW characters have completed their required handwriting lifecycle.

This is not merely a theoretical substring collision. Five assessed steps visibly expose **formal NEW Lesson-15 characters before their owning character introductions**:

1. **u45-sick-l1**
   - live distractors include **胃口很好，也休息了** and **去藥局拿藥**
   - this exposes Unit-46 NEW vocabulary **休息 / 藥局 / 拿 / 藥**
   - it visibly exposes future NEW characters **休 / 息 / 藥 / 局 / 拿**
   - the frozen Unit-45 activity spec instead uses semantic English distractors: “having a good appetite and resting” / “going to a pharmacy and taking medicine”

2. **u45-duration-l1**
   - live distractor: **請問我得吃藥嗎？**
   - this exposes future Unit-46 **藥** and the new modal **得 děi** support before their Unit-46 explanation
   - the frozen spec uses the semantic choice “how much medicine costs” rather than requiring the learner to read future Lesson-15 material

3. **u45-review-l2**
   - live distractor: **拿藥，多休息**
   - this again exposes future Unit-46 **拿 / 藥 / 休 / 息** before their formal introduction
   - the frozen review spec uses the learner-safe semantic distractor “medicine and rest”

4. **u46-rec-l1**
   - live distractor includes **吐了幾次**
   - this visibly exposes Unit-47 NEW character **吐** and Unit-47 NEW occurrence-counter vocabulary **次** before Unit 47
   - the same live listening item also includes **回家**, a Unit-48 NEW lexical form
   - the frozen Unit-46 spec uses semantic English distractors instead

5. **u47-what-l1**
   - live distractor: **有健康保險**
   - this occurs before the later Unit-47 health-center lesson introduces **健康 / 保險**
   - it visibly exposes future NEW characters **健 / 康 / 保 / 險** before their owning lifecycles
   - the same item contains **睡了八個小時**, exposing Unit-48 NEW **小時**
   - the frozen Unit-47 spec uses the semantic choices “the person slept eight hours” / “the person has insurance”

The same future-target leakage pattern also appears without a new-character violation in additional live listening choices, including:

- **u46-visit-l1** → **幾個小時** before Unit-48 小時
- **u47-a005-l1** → **睡了幾個小時** before Unit 48
- **u47-review-l1** → **去臺南** before the Unit-48 A001 contextual source bridge
- **u47-review-l2** → **八個小時** before Unit-48 小時
- **u47-review-l3** → **讀藥袋**; 袋 has no canonical vocabulary or character ownership in the current generated index
- **u48-advice-l1** → distractors using **包** and the later action-comparison material before the Unit-48 action-comparison lesson teaches them
- **u48-g4-l1** → **吃幾包藥** before the later Unit-48 lesson introduces 包

The frozen activity specs at these listening locations use semantic English choices precisely where the live implementation now uses Chinese distractors. Therefore the frozen pedagogy does not need redesign: the current learner-facing implementation has drifted from the frozen safe payloads.

### Why this is MAJOR rather than BLOCKER

The correct answers remain determinable from material already taught, and no wrong key was found. The defect does not make the source content factually wrong.

However, the strict prerequisite learner is repeatedly required to visually process choices containing characters and lexical material explicitly scheduled for later instruction. That violates explain-before-test / hidden-prerequisite discipline and creates a serious cross-unit sequencing inconsistency. Under the protocol severity definitions, this is **MAJOR**.

### Required next action

Reopen only the smallest affected implementation path and restore learner-safe distractors consistent with the already-frozen activity specification. Preserve frozen IDs, correct answers, semantic-listening intent, and all educational semantics.

No such repair was performed in this simulation.

---

## Sequential learner simulation

### Unit 45 — Symptoms and Feeling Sick

**Result: FAIL because SIM-A-RERUN2-01 first manifests here.**

The positive prerequisite path is otherwise sound:

- all 12 Unit-45 canonical NEW lexical forms are taught in their owning lessons;
- every lexical target has learner-facing explanation before its first intended lexical assessment;
- all 12 Unit-45 NEW characters follow intro → trace → build → complete → memory;
- lexical assessment involving those NEW characters follows the corresponding lifecycle;
- D1T01–D1T05 are integrated only after their symptom and duration dependencies;
- health inquiry and duration support are available before the integrated doctor visit;
- the Unit-45 review contains **32** steps and **3** listening items;
- all 12 NEW vocabulary items and all 12 NEW characters are independently retrieved.

The failure is the premature future-unit material in the listening distractors described above, including future Unit-46 formal characters in u45-sick-l1 and u45-review-l2.

### Unit 46 — Diagnosis, Medicine, and Treatment

**Result on intended teaching path: PASS, with the cross-unit distractor defect still active.**

The current implementation correctly teaches:

- 感冒 before its source diagnosis use;
- 藥 / 藥局 / 拿 before the medicine/pharmacy source sequence;
- modal 得 děi before its assessed medicine question;
- 把 and 別 before G002 assessment;
- G002 before A004;
- 水 / 休息 / 睡覺 / 早一點 before recovery retrieval;
- 您 before literal 好的，謝謝您。 use.

The Unit-46 review contains **34** steps and **3** listening items, retrieves all 10 canonical NEW lexical forms, all 9 NEW characters, both grammar targets, the 幾 expansion, modal/complement 得 distinction, A004, and delayed Unit-45 material.

SIM-A-RERUN2-01 is still present because u46-rec-l1 exposes Unit-47/48 targets and u46-visit-l1 exposes Unit-48 小時 before those later lessons.

## Repaired Unit-46 幾 path — PASS

The repaired path now works for the strict learner.

In u46-nonspecific, the order is exactly:

1. **u46-ji-explain**
2. **u46-ji-s1**
3. **u46-noncommittal-question-words** / G001

u46-ji-explain points to the learner-facing phrase record **u46-ji-expansion**, which explicitly teaches:

- **幾 jǐ**
- earlier Unit-7 sense: **“how many?”**
- Lesson-15 semantic expansion: **“a few / several”**
- the new sense occurs in a **statement / non-question context**
- this is a semantic expansion of the already-known Unit-7 word, not new canonical vocabulary.

The learner-facing example is:

- **她沒有幾個朋友。**
- **Tā méiyǒu jǐ ge péngyǒu.**
- **She does not have many friends / has only a few friends.**

u46-ji-s1 then asks for the new Lesson-15 sense and keys **“幾 = a few/several in a statement.”**

This is now genuine explain-before-test rather than an answer that depends on untaught semantics.

Canonical ownership remains correct:

- 幾 canonical vocabulary owner: **Unit 7**
- 幾 canonical character owner: **Unit 7**
- Unit 46 does not add a NEW vocabulary row for 幾
- Unit 46 does not add NEW-character or standalone handwriting ownership for 幾
- the global index retains the Unit-7 canonical “how many” row only.

## Unit 47 好幾次 retrieval — PASS

The Unit-47 stomach lesson now genuinely retrieves the repaired Unit-46 expansion.

After 肚子 / 吐 / 次 are taught, the sequence includes:

- **u47-stomach-ji-review**
- **u47-stomach-x008**
- **u47-stomach-s4** → In 好幾次, 幾 means **a few/several**
- **u47-several-times** → **吐了好幾次。**
- subsequent recognition and semantic listening.

Therefore 好幾次 is downstream retrieval of a meaning the learner has actually been taught, not an asserted prerequisite.

### Unit 47 — Stomach Trouble and Getting Help

**Result on intended teaching path: PASS, with SIM-A-RERUN2-01 still active in distractors.**

The current implementation correctly preserves:

- 次 only after the Unit-46 幾 expansion;
- 好幾次 only after 次 and the prior 幾 expansion;
- G003 after its prerequisite review and before the full D2T02 productive path;
- 陪 / 看病 before the offer-to-accompany source turn;
- 不用了 before refusal use;
- 健康 / 保險 / 健康中心 before their intended source sequence;
- A005 only after the health-condition language is available.

The Unit-47 review has **34** steps and **3** listening items, retrieves all 12 canonical NEW lexical forms and all 8 NEW characters, G003, 幾 several-times retrieval, refusal pragmatics, A005, and delayed Unit-45/46 material.

The unit still participates in SIM-A-RERUN2-01 because earlier/later listening distractors expose 健康保險 and Unit-48 小時 before their intended teaching point.

### Unit 48 — Advice, Comparisons, and Recovery

**Result on intended teaching/cumulative path: PASS, with the same distractor-pattern defect appearing in early Unit-48 listening.**

Correct sequencing remains present for:

- 跟 recipient/addressee expansion before D2T08;
- 回家 / 油 / 冰 / 關心 / 最好 before their intended dialogue/advice uses;
- G004 before G006;
- 包 / 睡 / 小時 and 分鐘 support before D2T12 / A001;
- G005 before A001;
- G006 before A001 and before the degree branch of D2T13;
- G007 before the full D2T13 separable-verb line;
- prescription support before A003.

The Unit-48 review/capstone contains **58** steps and **3** listening items.

It includes:

- all 8 Unit-48 canonical NEW lexical items;
- 冰 handwriting retrieval;
- 跟 recipient vs companionship contrast;
- 幾 several vs interrogative contrast;
- modal 得 děi vs complement 得 de;
- independent G004–G007 retrieval;
- A001/A002/A003;
- cumulative A004/A005;
- twelve cumulative Unit-45–47 retrieval checks;
- four final capstone checks;
- source-era culture framing.

The early Unit-48 listening distractors in u48-advice-l1 / u48-g4-l1 nevertheless continue the same premature-target pattern noted in SIM-A-RERUN2-01.

---

## Canonical totals and target coverage — PASS

Fresh counts from the current four unit modules:

- Unit 45 NEW lexical forms: **12**
- Unit 46 NEW lexical forms: **10**
- Unit 47 NEW lexical forms: **12**
- Unit 48 NEW lexical forms: **8**
- total canonical NEW lexical forms: **42**

NEW formal characters:

- Unit 45: **12**
- Unit 46: **9**
- Unit 47: **8**
- Unit 48: **1**
- total: **30**

Formal grammar introductions:

- Unit 46: **2**
- Unit 47: **1**
- Unit 48: **4**
- total: **7**

No canonical target is missing from its owning unit review.

## All 30 handwriting lifecycles — PASS

Every NEW Lesson-15 character in the current implementation has the required owning-lesson order:

**intro → trace → build → complete → memory**

All 30 lifecycles are ordered correctly.

Each NEW character is also retrieved with a review complete step in its owning unit review.

The global standalone-practice lock remains correct:

- lib/curriculum.ts characterPracticeAvailable finds the first non-review owning lesson and permits practice only after that lesson is completed;
- Pinyin Search handwriting actions call the same characterPracticeAvailable guard;
- adaptive character fallback practice also requires a completed non-review owner lesson.

Therefore no standalone handwriting path was found that bypasses the owning-lesson completion lock.

The MAJOR finding concerns characters being shown prematurely inside assessment distractor text, not the standalone handwriting lock itself.

## Seven grammar rules and prerequisite direction — PASS

The seven formal Lesson-15 rules remain exactly:

1. u46-noncommittal-question-words — G001
2. u46-ba-disposal — G002
3. u47-vle-jiu — G003
4. u48-a-little-degree — G004
5. u48-action-comparison-de — G005
6. u48-comparison-degree — G006
7. u48-separable-verbs — G007

The implementation introduces each rule before its intended rule-tagged assessment.

No grammarIds reference was found before its grammar introduction.

The key direction constraints remain intact, including:

- 幾 expansion before G001;
- G002 before A004;
- G004 before G006;
- G005/G006 before A001;
- G007 before full D2T13.

## All 25 source dialogue turns — PASS

Current learner-facing source coverage preserves the complete Lesson-15 dialogue sequence:

- D1T01–D1T05 in Unit 45;
- D1T06–D1T12 in Unit 46;
- D2T01–D2T07 in Unit 47;
- D2T08–D2T13 in Unit 48.

Total source turns covered: **25**.

Deferred source-name/address glyphs are not required learner answers. D2T13 remains correctly staged so the degree branch appears before the later full G007 line.

## A001 — PASS

The Unit-48 source table preserves all four source rows and exact values, including:

- dinner-bowl quantities;
- rent values;
- travel methods;
- travel durations;
- contextual **臺南**.

The assessed comparisons and exact Student-4 duration remain present. Source participant glyphs are not required answers.

## A002 — PASS

All three learner-facing visual roles remain distinct:

1. **u48-a002-visual-1**
   - restroom / lower-abdomen scene
   - acceptance
   - closes with **好的。**

2. **u48-a002-visual-2**
   - bed scene
   - acceptance
   - closes with **謝謝你。**

3. **u48-a002-visual-3**
   - throat/neck scene
   - polite rejection
   - begins/closes with **謝謝你的關心。……**

All three retain the shared source suggestion bank:

- 看病
- 多休息
- 早一點睡覺
- 多喝水

No fixed invented symptom→advice mapping was introduced.

A002 Task 2 also remains present for the vomiting-after-dinner / stomach-discomfort doctor-patient scenario.

## A003 repaired path — PASS

Before any A003 assessment, the learner sees the repaired Chinese prescription support:

- **一日4次** — yí rì sì cì — four times per day
- **3日份** — sān rì fèn — a three-day supply
- **份 fèn** — support-only supply/portion unit
- **飯前**
- **飯後**
- **飯後30分鐘**

The source-prescription representation then visibly preserves:

- **健康診所**
- **一日4次**
- **3日份**
- **飯後**
- **飯後30分鐘**

健康診所 is explicitly contextual/glossed/non-assessed and 診 remains deferred.

The A003 answers remain exactly:

- **四次**
- **飯後30分鐘**
- **十二包**

The arithmetic inference is still 4 doses/day × 3 days = 12 packets.

Both prescription support/source cards have **practice: false**.

The generated canonical index contains no entry for 份 or 診, and neither has canonical vocabulary/character ownership, Search ownership, Mega ownership, or handwriting ownership.

The practice engine excludes phrase records whose practice flag is false, so these support cards do not become productive phrase-practice items.

## A004 — PASS

All three frozen 把 source outcomes remain present and retrieved:

1. 把這50個小籠包吃了
2. 把今天的功課寫了
3. 把我的西瓜吃了

They occur only after G002 and required support. Unit-48 cumulative review later retrieves A004 again.

## A005 — PASS

The source scenario remains a sick-at-home health call with four required condition questions:

1. 哪裡不舒服？
2. 有沒有發燒？
3. 喉嚨怎麼樣？
4. 胃口怎麼樣？

The contextual name glyph is not a required answer. Unit-48 cumulative review later retrieves the four-question function.

## Five repaired semantic-listening guards — PASS

All five required semantic-listening repairs remain present with semanticAnswer: true and the intended semantic key:

- **u46-review-l1** → modal 得 **must/have to**
- **u46-review-l3** → identify the item absent from the complete advice bundle
- **u47-stomach-l1** → stomach discomfort + repeated vomiting
- **u48-g7-l1** → separable-verb duration + degree comparison
- **u48-review-l3** → separable duration + much-better comparison

These five repaired semantic items themselves are correct.

SIM-A-RERUN2-01 concerns other learner-visible distractor payloads and does not invalidate the correctness of these five repaired semantic answers.

## Support-only 您 — PASS

Unit 46 explicitly explains:

- **您**
- pinyin **nín**
- polite “you”
- support-only status

before the literal source phrase:

- **好的，謝謝您。**

您 remains absent from canonical NEW vocabulary, the canonical generated index, Search ownership, Mega ownership, and handwriting ownership.

## 幾 / 跟 expansion ownership — PASS

### 幾

- canonical vocabulary/character ownership remains Unit 7;
- Unit-7 canonical meaning remains “how many”;
- Unit 46 teaches only the local Lesson-15 statement/non-question “a few / several” expansion;
- no duplicate canonical Search row;
- no second Mega ownership;
- no second handwriting ownership.

### 跟

- canonical vocabulary/character ownership remains Unit 24;
- Unit-24 sense remains companionship “with”;
- Unit 48 teaches recipient/addressee “to” locally;
- no duplicate canonical Search row;
- no second Mega ownership;
- no second handwriting ownership.

The Unit-48 review explicitly contrasts both senses.

## Search / Mega behavior — PASS

Current runtime behavior remains consistent with the frozen ownership model:

- course/runtime.ts builds canonical vocabulary from unit newVocabulary;
- lib/vocabulary-lookup.ts builds Pinyin Search lookup rows from that canonical vocabulary;
- learnedVocabulary requires the owning lesson to be completed;
- lib/mega-challenge.ts derives Mega eligibility from learnedVocabulary;
- Lesson-15 semantic expansions therefore do not create duplicate form ownership;
- support-only 份 / 診 / 您 are absent from canonical lookup ownership.

The current generated index confirms:

- 幾 → Unit 7 canonical owner;
- 跟 → Unit 24 canonical owner;
- 一直 → Unit 45 canonical owner;
- 直 → Unit 45 canonical character owner;
- 份 / 診 / 您 → no canonical index row.

## 一直 / 直 migration — PASS

At the strict Unit-44 baseline, 一直 / 直 are correctly NEW in Unit 45.

Current Book-2 Unit 1 has:

- **一直** in reviewVocabulary, not newVocabulary;
- **直** in reviewCharacters, not newCharacters.

Book 2 is not used as a Lesson-15 prerequisite.

The migration therefore preserves Unit 45 as canonical first ownership without requiring later Book-2 knowledge.

## Review floors and delayed retrieval — PASS

Current review counts:

- Unit 45: **32 steps / 3 listening**
- Unit 46: **34 / 3**
- Unit 47: **34 / 3**
- Unit 48: **58 / 3**

All four floors are met.

Delayed retrieval remains explicit:

- Unit 46 retrieves Unit-45 symptoms/duration;
- Unit 47 retrieves Unit-45 duration and Unit-46 modal/把 material;
- Unit 48 retrieves Unit-45 symptoms/duration, Unit-46 G001/G002/illness/pharmacy material, and Unit-47 several-times/G003/help/medical-setting material.

## Unit-48 cumulative closure — PASS

The current Unit-48 review/capstone retains:

- u48-review-cum1 through u48-review-cum12;
- u48-review-cap1 through u48-review-cap4;
- A001–A005 cumulative function checks;
- 幾 and 跟 semantic contrasts;
- 得 pronunciation/function contrast;
- G004–G007 retrieval;
- source-era culture framing;
- delayed Unit-45–47 retrieval.

The final capstone therefore closes the intended Lesson-15 target families.

## Final Simulation-A decision

**FAIL — 0 BLOCKER / 1 MAJOR / 0 MINOR.**

The two repaired paths requested for this rerun are now genuine:

- Unit-46 幾 explanation/retrieval: **PASS**
- Unit-48 A003 prescription support/isolation: **PASS**

The full strict-prerequisite learner simulation nevertheless cannot pass while SIM-A-RERUN2-01 remains open.

The current learner-facing implementation exposes future Lesson-15 vocabulary and formal characters inside assessment distractors before their intended teaching point, despite the frozen activity specification already providing learner-safe semantic alternatives.

Required state implication:

- Simulation A rerun 2: **FAIL**
- smallest gate to reopen: **implementation**
- Gate B frozen semantics need not change for this finding
- Simulations B/C: **DO NOT RUN**
- traceability/release audit/Gate C: **DO NOT RUN**
- release: **LOCKED**
- Book 1 complete: **false**

No repair or later-stage work was performed in this run.
