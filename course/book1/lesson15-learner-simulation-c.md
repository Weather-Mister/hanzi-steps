# Book 1 Lesson 15 — Stage 7 Simulation C: Cumulative Learner

Status: **FAIL**

Reviewed PR: **#69**  
Repository: **Weather-Mister/hanzi-steps**  
Reviewed implementation head: **b71706e416676486284e38056143bb80ae2fc3f5**  
Simulation: **C — cumulative learner**  
Independence: Simulation A and Simulation B reports were not read.

## Verdict

- BLOCKER: **0**
- MAJOR: **2**
- MINOR: **0**
- Result: **FAIL**

PASS requires 0 open BLOCKER and 0 open MAJOR.

The sequential Units 45→46→47→48 teaching path, review layers, handwriting gating, Mega Challenge gating, and adaptive-practice gating are largely cumulative and coherent. Two Stage-7 acceptance failures remain: Pinyin Search exposes future canonical vocabulary before its owning lesson, and the Unit-47 designated integrated D2T01–D2T07 dialogue replay is miswired to D2T02 only.

## Findings

### SIM-C-01 — MAJOR — Pinyin Search exposes all future canonical vocabulary before learning

**Expected**

Stage-7 Simulation C requires all 42 Lesson-15 canonical NEW lexical forms to enter Search/Mega only at their intended owning lesson, remain available afterward, and requires Search/Mega/practice to expose nothing before learning.

**Actual**

The canonical ownership metadata itself is correct:

- Unit 45: 12 NEW forms
- Unit 46: 10 NEW forms
- Unit 47: 12 NEW forms
- Unit 48: 8 NEW forms
- Total: 42

Mega Challenge and adaptive practice respect lesson completion:

- eligibleMegaVocabulary(completed, mastered) delegates to learnedVocabulary(completed).
- learnedVocabulary(completed) requires completed.has(item.lessonId).
- learnedPracticeItems(completed) builds word/phrase/character pools only from completed lessons.

Pinyin Search does not use that gating for result visibility:

- vocabularyLookup is built from the complete canonical vocabulary registry.
- searchVocabulary(query) searches that complete registry without a completed-lessons argument or filter.
- PinyinSearch computes matches with searchVocabulary(query, 81).
- The completed set is used only to decide whether a result's handwriting-practice button is available; it does not hide the vocabulary result itself.
- The learner-facing component copy explicitly describes the feature as searching “all course vocabulary.”

Therefore a cumulative learner can reveal a Lesson-15 canonical form before its owning lesson simply by searching its pinyin. For example, before completing u45-doctor, searching yīshēng / yisheng can reveal 醫生, and before u48-advice, searching huíjiā / huijia can reveal 回家. The same structural issue applies to all 42 Lesson-15 canonical rows.

This is not a one-row ownership error. It is a progression mismatch between the current Stage-7 acceptance contract and the existing global Pinyin-Search design. Handwriting from Search remains correctly locked; the leak is the visible word/pinyin/meaning/result metadata itself.

**Impact**

The explicit Simulation-C invariant “Search/Mega/practice expose nothing before learning” is false. Mega and adaptive practice pass this invariant, but Search does not. This alone prevents Stage-7 PASS.

### SIM-C-02 — MAJOR — Unit-47 cumulative D2T01–D2T07 replay is not implemented as frozen

**Expected**

The frozen Unit-47 activity specification requires u47-refuse-help to contain, after u47-confirm-doctor, an **integrated D2T01–D2T07 source-sequence card using generic speaker roles**, followed by the sequence-comprehension check. This is the cumulative learner-facing closure for the first seven turns of Dialogue II and contributes to the requirement that all 25 Lesson-15 dialogue turns survive cumulatively.

**Actual**

Current production has:

- u47-refuse-p1 → phrase u47-confirm-doctor
- u47-integrated → phrase **u47-d2t02-full**
- u47-integrated-s1 → English sequence-comprehension select

u47-d2t02-full contains only D2T02:

> 昨天晚上肚子很不舒服，吃了東西就吐，還吐了好幾次。

So the designated integrated replay re-shows one turn instead of D2T01–D2T07. The following English sequence question checks the communicative arc but does not restore the missing seven-turn Chinese dialogue replay.

The individual Unit-47 teaching lessons preserve most of the episode's content in smaller records, but this does not satisfy the frozen cumulative integration step. In particular, the source D2T06 turn begins with a thank-you before the pharmacy preference; current u47-pharmacy-enough preserves the pharmacy-preference sentence but not that complete turn, and the missing integrated sequence card no longer supplies the full turn in cumulative context.

**Impact**

I cannot count all 25 source dialogue turns as cumulatively preserved under the frozen activity contract. The Unit-47 cumulative learner sees a semantic summary plus D2T02, not the required D2T01–D2T07 replay. This is a learner-facing frozen-spec divergence and prevents PASS.

## Cumulative progression checks

### Canonical vocabulary ownership and post-learning availability

Ownership metadata is correct at 12 + 10 + 12 + 8 = **42** NEW forms. No duplicate Lesson-15 canonical ownership was found for the two expansion words. Mega and adaptive-practice pools admit canonical words only after their owning lesson is complete and keep them available afterward. **PASS for Mega/adaptive; FAIL for Search because of SIM-C-01.**

### 幾 expansion

幾 remains canonically owned by Unit 7 with the interrogative “how many?” sense. Lesson 15 does not create a duplicate canonical Search/Mega row. Unit 46 explicitly teaches the negative/non-specific “a few / several” expansion before assessing it, Unit 47 uses it in 好幾次 only after that prerequisite, Unit-47 review retrieves the expansion, and Unit-48 review contrasts 好幾次 with 幾次？. **PASS.**

### 跟 expansion

跟 remains canonically owned by Unit 24 with the companionship “with” sense. Unit 48 locally teaches 跟老師說 as recipient/addressee “to,” contrasts it with 跟朋友去看電影, uses the new sense in D2T08, and retrieves both senses in Unit-48 review. No second canonical row is introduced. **PASS.**

### 一直 / 直 migration

Unit 45 first-owns 一直 and formal character 直. Book-2 Unit 1 lists 一直 in reviewVocabulary and 直 in reviewCharacters rather than NEW ownership. **PASS.**

### Support-only and deferred material

The reviewed state keeps support/deferred material out of canonical Lesson-15 ownership as intended:

- 您 is taught as support before literal use and has no Lesson-15 canonical vocabulary/Search/Mega/handwriting ownership.
- 對不起 remains support-only.
- 份 and 診 are absent from canonical vocabulary/character ownership; u48-prescription-support and u48-prescription-visual are practice:false.
- 分鐘 is local support rather than a formal Lesson-15 canonical vocabulary row.
- A001 source participants are rendered with assessment aliases plus romanized names, avoiding required untaught name glyphs.
- A003 健康診所 / 診 remains contextual/non-assessed.
- Existing practice-content guards explicitly isolate 份 and 診 from Search, Mega, phrase practice, and handwriting.

**PASS.**

### 30 NEW formal characters

The Unit-45–48 totals are 12 + 9 + 8 + 1 = **30** NEW formal characters.

Every one of the 30 has, in its owning teaching lesson:

1. intro
2. trace
3. build
4. complete
5. memory

Every one is later retrieved with a complete step in its owning unit review. Standalone character practice is gated by characterPracticeAvailable(), which requires completion of the first non-review owning lesson. No missing build, lifecycle, review-complete, or standalone-practice lock was found. **PASS.**

### Delayed retrieval across units

The review chain is genuinely delayed rather than unit-local only:

- Unit-46 review retrieves Unit-45 symptom and duration material.
- Unit-47 review retrieves Unit-45 duration and Unit-46 modal 得 / 把 material, plus the 幾 expansion.
- Unit-48 review retrieves Unit-45 symptoms/duration/doctor targets, Unit-46 G001/G002/illness/pharmacy material, and Unit-47 好幾次/G003/help/medical-setting material.

**PASS.**

### Dialogue survival

Dialogue I and most Dialogue-II turns are taught across the sequential units, and Unit 45 correctly includes its D1T01–D1T05 integrated card. Unit 46 walks D1T06–D1T12 through its doctor-visit lesson. Unit 48 carries D2T08–D2T13 through the remaining lessons.

Unit 47 fails the frozen integrated D2T01–D2T07 replay as described in SIM-C-02. **FAIL.**

### A001–A005

- A001 source table/data survives into Unit 48 and is rechecked by four final-review items.
- A002 preserves three distinct learner-facing visual scenes/roles, with two acceptance paths and one polite-rejection path, plus the shared suggestion bank; final review retrieves the functions.
- A003 exposes the Chinese prescription support before the three source questions, keeps the support/visual records practice:false, and rechecks 四次 / 飯後30分鐘 / 十二包 in final review.
- A004 retains all three source 把 outcomes in Unit 46 and is retrieved again in Unit-48 review.
- A005 retains the four health-condition questions in Unit 47 and is retrieved again in Unit-48 review.

**PASS.**

### Listening distractors and u45-review-f1

The repaired learner-facing listening options checked across Units 45–48 do not introduce a semantic future Lesson-15 target. Apparent character-substring matches such as 水 inside 鼻水, 睡 inside 睡覺, or 油/包 inside 加油/小籠包 are not future lexical-target exposure.

The current u45-review-f1 is:

- prompt: Which question starts a health check by asking where the discomfort is?
- options: 哪裡不舒服？ / 大概多久了？ / 什麼東西都不想吃？
- answer: 哪裡不舒服？

It contains no premature 回家 and is learner-safe. **PASS.**

### Unit-47 G003 retention

The repaired G003 sequence is cumulative and prerequisite-safe:

1. prerequisite review
2. G003 teaching
3. controlled checks
4. u47-d2t02-full only after G003 teaching
5. explicit order/reconstruction practice

Unit-47 review retrieves G003 and its contrast constraints, and Unit-48 cumulative review retrieves it again with 他吃了藥就睡覺。. **PASS.**

### A002 visuals and A003 isolation

A002's three production visual records remain distinct:

- restroom/lower-abdomen scene, acceptance
- bed scene, acceptance
- throat/neck scene, polite rejection

A003 retains its support-only notation and source-prescription visual with practice:false; 份 and 診 remain isolated from canonical/practice ownership. **PASS.**

### Unit-48 cumulative closure

Current u48-review has **58 steps**, not a Unit-48-only recap. It includes:

- Unit-48 listening, character and all 8 NEW lexical targets
- 跟 and 幾 sense contrasts
- modal/complement 得 contrast
- G004–G007
- A001–A005
- A003 prescription retrieval
- delayed Unit-45/46/47 material
- culture/source-era check
- four capstone/S001–S004 closures

The final review genuinely closes Lesson 15. **PASS.**

## Final adjudication

Simulation C is **FAIL** with **0 BLOCKER / 2 MAJOR / 0 MINOR**.

The main cumulative curriculum path is strong, but Stage 7 cannot pass while:

1. Pinyin Search reveals future canonical Lesson-15 vocabulary before its owning lesson; and
2. Unit 47's frozen integrated D2T01–D2T07 cumulative replay is replaced by a repeat of D2T02 only.

No implementation, specification, test, release, deployment, merge, Gate-C, traceability, or Book-1-completion changes were made in this simulation.
