# Book 1 Lesson 15 — Activity Audit 3: Cross-Unit Coherence

Working repository: `Weather-Mister/hanzi-steps`  
Working draft PR: **#69**  
Working branch: `book1-lesson15-source-a`

Audited sequence: **Units 45 → 46 → 47 → 48 as one cumulative Lesson-15 packet**.

Upstream frozen curriculum:
- source gate: PASS;
- dependency gate: PASS;
- Gate A / curriculum: PASS;
- frozen blueprint: `course/book1/lesson15-curriculum-blueprint.md`.

Final frozen activity packet after this audit's status-only Gate-B transition:
- `course/book1/lesson15-activity-spec.md` — blob `7b9ab79b0c8f00b895570f999543f2c9ec93ee80`
- `course/book1/lesson15-unit45-activity-spec.md` — blob `66e38e7a7df5bf2a61a7a04ce416fe469908a2ba`
- `course/book1/lesson15-unit46-activity-spec.md` — blob `26a605e81ad543395923ed5a4a2b2528ddbf8772`
- `course/book1/lesson15-unit47-activity-spec.md` — blob `95e2c53329af46891f97a2e19e6f3c541cc3f379`
- `course/book1/lesson15-unit48-activity-spec.md` — blob `63e66992bfec030999c5e497136cb16594d0b52b`

The only activity-spec edits made in this audit context are Gate-B/frozen-status metadata. **No learner-facing activity payload required repair.**

## Independence and scope

The cross-unit audit was performed from:
- `automation/book1/PROTOCOL.md`, Stage 4 / Gate B;
- `ADDING_A_UNIT.md`;
- the validated Lesson-15 source and dependency ledgers;
- the frozen Gate-A blueprint;
- the complete Lesson-15 activity specification;
- all four Unit 45–48 activity specifications;
- the Book-1 completion controller;
- `course/index.json` through the current Unit-44 production baseline, with targeted ownership checks.

The completed Teaching Quality and Question Correctness audit reasoning was not used to form the cross-unit verdict. Their final verdicts were consulted only after the independent cross-unit pass was complete, as required for the Gate-B decision.

# Findings discovered in this audit

No cross-unit BLOCKER, MAJOR, or MINOR defect was found in the final repaired Stage-4 packet.

No activity-content repair was necessary.

---

# Final cross-unit audit

## 1. Canonical ownership chronology

### Lexical NEW ownership

Exact canonical NEW counts:
- Unit 45: **12**
- Unit 46: **10**
- Unit 47: **12**
- Unit 48: **8**
- total: **42**

The 42 exact forms are unique across the packet. No exact Lesson-15 NEW form is first-owned twice.

### Lexical EXPANSION ownership

There are exactly **2** formal lexical semantic expansions:
1. **幾 jǐ** — Lesson-15 “a few / several; non-specific” sense, taught in Unit 46;
2. **跟 gēn** — recipient/addressee “to” sense, taught in Unit 48.

Neither receives a second canonical NEW-vocabulary row.

### Formal grammar

Exactly **7** formal Lesson-15 grammar rules are owned once:
- G001–G002: Unit 46;
- G003: Unit 47;
- G004–G007: Unit 48.

### Formal characters

Exactly **30** NEW formal characters:
- Unit 45: **12**
- Unit 46: **9**
- Unit 47: **8**
- Unit 48: **1**

No NEW character is first-owned twice inside the Lesson-15 packet.

### 一直 / 直 migration

The current pre-implementation generated index still records:
- `一直` at Book 2 Unit 1;
- `直` at Book 2 Unit 1.

The frozen Lesson-15 architecture explicitly moves canonical first ownership earlier to Unit 45. This remains a **mandatory implementation migration**, not a Book-2 prerequisite. No Unit-45–48 learner activity depends on Book 2.

**Result: PASS.**

## 2. 幾 / 跟 expansion and Search / Mega behavior

### 幾
- canonical ownership remains Unit 7 with the global canonical gloss “how many”;
- Unit 46 explicitly teaches the Lesson-15 non-interrogative “a few / several” sense;
- Unit 47 retrieves that sense before and inside **好幾次**;
- Unit 48 contrasts **好幾次 = several times** with interrogative **幾次？ = how many times?**;
- no second Search row;
- no earlier-row gloss broadening;
- no second Mega ownership.

### 跟
- canonical ownership remains Unit 24 with companionship “with”;
- Unit 48 explicitly contrasts **跟老師說** “say/tell it to the teacher” with prior **跟朋友去…** “go with a friend”;
- no second Search row;
- no earlier-row gloss broadening;
- no second Mega ownership.

### Support/deferred ownership
- **您** and **份** remain explicitly explained support only;
- **分鐘** remains support-only in its Lesson-15 use;
- deferred proper-name/source glyphs receive no Search, Mega, or handwriting ownership;
- canonical Lesson-15 NEW forms remain gated by their owning lesson for Mega;
- standalone handwriting/practice access for Lesson-15 NEW characters remains locked until first teaching.

**Result: PASS.**

## 3. Prerequisite direction

Every frozen critical edge remains backward-pointing.

Verified:
- 幾 expansion → G001;
- 幾 expansion + 次 → 好幾次;
- 把 + 別 + prior definite/negation/了/question support → G002;
- G002 → A004;
- prior verbal-了 + 一…就… + 以後 → G003;
- G004 → G006;
- G005 + G006 + bowl/time support → A001;
- 生病 + 睡覺 + 看病 + 回家 → productive G007;
- prescription supports → A003.

Unit-specific checks:
- Unit 45 does not test G001 or productive G007.
- Unit 46 teaches 幾 before G001 and 把/別 before G002.
- Unit 47 retrieves 幾 before 好幾次 and teaches G003 before full D2T02.
- Unit 48 teaches recipient 跟 before D2T08, advice vocabulary before D2T09, G004 before G006, G005/G006 before A001, and the full separable-verb system before full D2T13.

No later unit is required to solve an earlier assessed item.

**Result: PASS.**

## 4. All 25 dialogue turns

### Dialogue I — Unit 45
D1T01–D1T05 are represented only after their symptom, health-inquiry, duration, and throat/inflammation prerequisites are available.

- D1T01 health inquiry follows X002 explanation.
- D1T02 symptom report follows 一直 / 流 / 鼻水 / 頭 / 痛 / 胃口 / 差 teaching.
- D1T03–D1T04 follow the duration bridge.
- D1T05 follows 喉嚨 / 發炎 and reviewed 有一點 + state.
- 白 / 妳 / 玉 are never productive prerequisites; learner-facing dialogue uses generic roles / 你.

### Dialogue I — Unit 46
D1T06–D1T12 form the doctor-visit continuation.

- D1T06 is a fixed comprehensible source chunk and does not prematurely teach G007.
- D1T07 follows 感冒 + G001.
- D1T08 follows modal 得 děi support.
- D1T09 follows 藥 / 藥局 / 拿.
- D1T10 appears as the contextual source card **請問我的病什麼時候會好？**
- D1T11 follows G002 and health-advice support.
- D1T12 follows explicit 您 support.

### Dialogue II — Unit 47
D2T01–D2T07 are represented in prerequisite-safe order.

- D2T01 follows P001 + 怎麼了 / 臉色 / 難看.
- D2T02 is split safely: stomach/repeated-vomiting language is prepared first; the full turn appears only after G003.
- D2T03 follows 陪 / 看病 and reviewed 好不好.
- D2T04 follows 不用了 + 健康 / 保險.
- D2T05 is preserved across **我陪你去學校的健康中心。** and **那裡的醫生很好，對學生也很客氣。**, with X010 explained first.
- D2T06 follows X011 **V + 就好了** explanation.
- D2T07 closes the episode only after 看病/refusal language is available.

### Dialogue II — Unit 48
D2T08–D2T13 are represented in order.

- D2T08 follows recipient 跟 and 回家.
- D2T09 follows 油 / 冰 / 最好 and reviewed 別.
- D2T10 follows 關心.
- D2T11 follows G004.
- D2T12 follows 包 / 睡 / 小時 and G005.
- D2T13 is deliberately staged:
  1. **比早上好得多了** appears after G006;
  2. the full **睡了幾個小時的覺…好得多了** line appears only after G007.

All **25 / 25** source turns are represented with no future prerequisite.

**Result: PASS.**

## 5. Lifecycle continuity

The complete packet preserves the required lifecycle rather than treating units as isolated blocks.

### Unit-45 symptom/duration family
- explained and controlled in Unit 45;
- independently retrieved in the Unit-45 review;
- resurfaced in Unit 46 diagnosis, Unit 47 A005/health checks, and Unit 48 cumulative retrieval/capstone.

### Unit-46 幾 / G001 / G002 / modal 得
- 幾 expansion is explained and retrieved in Unit 46;
- reused in Unit 47 **好幾次**;
- contrasted again in Unit 48.
- G001 has owning-unit retrieval and Unit-48 cumulative retrieval.
- G002 feeds A004, is delayed-retrieved in Units 47/48, and remains distinct from later grammar.
- modal 得 děi is retrieved in Unit 46, delayed in Unit 47, and contrasted with complement 得 de in Unit 48.

### Unit-47 G003 and health-help pragmatics
- G003 is explicitly taught before D2T02, retrieved in Unit 47, and delayed in Unit 48.
- P001/P002/help language feeds A005 and then Unit-48 A002/capstone.
- X010 / X011 receive positive delayed retrieval in Unit 48.

### Unit-48 grammar chain
- G004 is taught before G006 and reused inside the later degree-comparison sequence.
- G005 and G006 are both available before A001.
- earlier separable lexical forms 生病 / 睡覺 / 看病 / 回家 are all available before G007.

**Result: PASS.**

## 6. Character continuity

NEW formal characters:
- Unit 45: 醫、直、流、鼻、痛、胃、喉、嚨、發、炎、病、燒
- Unit 46: 感、冒、藥、局、拿、把、休、息、睡
- Unit 47: 臉、肚、吐、陪、健、康、保、險
- Unit 48: 冰

For all **30**:
- one owning lesson is declared;
- recognition/read precedes the standard character lifecycle;
- `intro → trace → build → complete → memory` occurs before independent assessed vocabulary use;
- the owning-unit review contains a `complete` handwriting retrieval;
- later units never require handwriting before first teaching.

Known components/glyphs such as 頭、水、差、覺、幾、次、跟、油、別、關、心、包、時、回、家、最、好 are not accidentally re-owned as NEW characters.

Deferred name/support glyphs do not become handwriting requirements.

**Result: PASS.**

## 7. Source activities A001–A005

### A004 — Unit 46
Occurs only after G002 and required source support. All three required source outcomes are preserved:
1. 把這50個小籠包吃了
2. 把今天的功課寫了
3. 把我的西瓜吃了

### A005 — Unit 47
Occurs after health-inquiry and symptom language. The source scenario remains: 如玉 is sick at home and the learner asks four condition questions:
1. 哪裡不舒服？
2. 有沒有發燒？
3. 喉嚨怎麼樣？
4. 胃口怎麼樣？

The name is contextual/non-assessed.

### A002 — Unit 48
Occurs after advice, refusal, and concern language. The packet preserves:
- all three source illustration inputs;
- two acceptance roles;
- one polite-rejection role;
- source advice inventory;
- the vomiting-after-dinner doctor/patient Task 2.

The source labels containing deferred 拒 / 絕 are never required learner reading/production.

### A001 — Unit 48
Occurs after G005, G006, fractional-bowl support, 小時, and 分鐘 support.

Exact source data are preserved:
- 田中: 2 bowls / NT$18,000 / taxi / 3.5 h;
- 如玉: 1.5 bowls / NT$6,500 / train / 4.5 h;
- 安同: 2.5 bowls / NT$15,000 / scooter / 8 h;
- 月美: 0.5 bowl / NT$6,200 / HSR / 1 h 40 min.

臺南 remains exact, contextual, and glossed rather than promoted to vocabulary.

### A003 — Unit 48
Occurs only after:
- 一日4次;
- 3日份;
- support-only 份;
- 飯前 / 飯後;
- 飯後30分鐘;
- 分鐘 support.

The required answers remain:
- four times per day;
- 30 minutes after meals;
- 12 packets from 4 × 3.

The arithmetic does not create lexical ownership.

### Cumulative revisit
Unit 48 review explicitly revisits A004 and A005 rather than dropping the earlier source tasks.

**Result: PASS.**

## 8. Review floors and delayed retrieval

Verified review sizes:
- Unit 45: **32** steps, **3** listening;
- Unit 46: **34** steps, **3** listening;
- Unit 47: **34** steps, **3** listening;
- Unit 48: **58** steps, **3** listening.

Coverage:
- U45: all 12 NEW + all 12 NEW characters;
- U46: all 10 NEW + 幾 expansion + all 9 characters + G001/G002 + modal 得 + A004 + delayed U45;
- U47: all 12 NEW + all 8 characters + G003 + 幾 delayed retrieval + A005 + delayed U45/U46;
- U48: all 8 NEW + 跟 expansion + 冰 + G004–G007 + A001–A005 functions + prescription + culture + U45–U47 delayed retrieval + final capstone.

The Unit-48 positive delayed-retrieval block explicitly recovers earlier targets that could otherwise survive only as distractors:
- 醫生 / 發炎;
- 感冒 / 拿;
- 臉色 / 難看;
- 陪 / 看病;
- 健康保險 / 健康中心;
- X010 / X011.

The review growth reflects cumulative responsibility, not filler.

**Result: PASS.**

## 9. Pragmatic outcomes and S001–S004

Outcome progression:
- **F001** ask how someone feels: established U45 → completed U47 → capstoned U48.
- **F002** describe symptoms: established U45 → completed U46/U47 → capstoned U48.
- **F003** give health suggestions: established U46 → completed U48 → capstoned U48.
- **F004** accept/reject suggestions: established U47 → completed U48 → capstoned U48.

Final Chinese learner-facing capstone:
- S001/F001: construct **哪裡不舒服？**
- S002/F002: construct a symptom report;
- S003/F003: construct health advice;
- S004/F004: choose the polite rejection **謝謝你的關心。不用了。**

These are performance/selection tasks, not curriculum-label recognition.

**Result: PASS.**

## 10. Deferred/source-context safety

Verified across the packet:
- 妳 / 白 / 玉 / 安 / 田 / 李 / 陳 / 王 / 北 / 紐 / 約 / 烏 / 龍 / 診 / 拒 / 絕 are never required keyed-answer/handwriting targets;
- 您 and 份 remain support-only;
- contextual source names may appear only where Gate A permits them;
- 臺南 is preserved exactly in A001 without vocabulary promotion;
- A002 requires the actual source illustrations and does not invent fixed picture content;
- 健康診所 / 診 remains glossed non-assessed prescription-header context;
- CUL001 is explicitly framed as **textbook-era source content**, not current medical/policy guidance.

A direct keyed-answer/token/options scan of the final Unit 45–48 activity specifications found **0** required-answer occurrences of the deferred glyph set above.

**Result: PASS.**

## 11. Unit-48 cumulative closure

Unit 48 genuinely closes the four-unit sequence.

It cumulatively mixes:
- Unit-45 symptoms and duration;
- Unit-46 medicine, G001, G002, modal 得, and 幾;
- Unit-47 stomach/help language, G003, refusal, health-center language, and 好幾次;
- 跟 recipient vs companionship;
- modal 得 děi vs complement 得 de;
- G004–G007;
- A001–A003;
- delayed A004/A005;
- source-era culture;
- S001–S004.

The final unit therefore functions as cumulative Lesson-15 closure rather than only a fourth isolated unit.

**Result: PASS.**

---

# Gate-B decision

After completing the independent Cross-Unit Coherence audit, the two separately persisted required audit verdicts were checked:

- Activity Audit 1 — Teaching Quality: **PASS**, 0 open BLOCKER / 0 open MAJOR / 0 open MINOR.
- Activity Audit 2 — Question Correctness / Adversarial: **PASS**, 0 open BLOCKER / 0 open MAJOR / 0 open MINOR.
- Activity Audit 3 — Cross-Unit Coherence: **PASS**, 0 open BLOCKER / 0 open MAJOR / 0 open MINOR.

Gate A is already PASS.

Therefore the Stage-4 Gate-B condition is satisfied.

# Final findings

Open findings:
- BLOCKER: **0**
- MAJOR: **0**
- MINOR: **0**

Repairs in this audit context:
- learner-facing activity-content repairs: **0**
- Gate-B status/freeze metadata updates: **yes**

# Result: PASS

**Activity Audit 3 — Cross-Unit Coherence passes.**

**Gate B: PASS / FROZEN.**

The Lesson-15 activity specification is frozen and the controller may advance to **implementation readiness**.

Implementation is **not performed in this audit context**. Units 45–48 remain unimplemented, unmerged, and unpublished.
