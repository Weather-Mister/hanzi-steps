# Lesson 15 — Learner Simulation A Rerun

Status: **FAIL — 0 BLOCKER, 1 MAJOR, 0 MINOR**

Stage: **7 — Simulation A rerun: strict prerequisite learner**  
PR: **#69**  
Branch tested: **book1-lesson15-source-a**  
Starting PR head tested: **4e205195532659dae5195d6deca64370af530b8f**  
Learner baseline: **Book 1 through Unit 44 only; no Units 45–48 and no Book 2 knowledge**.

This rerun was performed independently from the current repaired implementation. The historical course/book1/lesson15-learner-simulation-a.md was not read before or during this rerun.

## 1. Verdict

Simulation A rerun **does not pass**.

The repaired A003 path now works for the strict learner, and every other requested Lesson-15 area checked below is learner-safe. However, Unit 46 still has one explain-before-test sequencing failure for the required 幾 semantic expansion:

- **SIM-A-RERUN-01 — MAJOR**
- In u46-nonspecific, step u46-ji-explain is named as the 幾 explanation step but its learner-facing payload is the phrase **沒有什麼關係。** with the meaning “It's nothing serious / It doesn't matter much.”
- That card contains no 幾 and does not explain the Lesson-15 non-interrogative sense “a few/several.”
- The immediately following assessed step u46-ji-s1 asks: **Which use of 幾 is the new Lesson-15 sense?**
- A fresh learner who knows only Unit 44 therefore receives the first assessment of the new 幾 sense before any learner-facing explanation of that sense.
- A scan of all Unit-45 content and all Unit-46 content preceding u46-ji-s1 found no prior explanation of 幾 = “a few/several.”
- The next formal G001 grammar card does contain an example with 幾, but it comes **after** u46-ji-s1 and therefore cannot satisfy explain-before-test for the expansion.

This is an implementation-sequencing defect, not a frozen-spec defect: the frozen Unit-46 activity specification requires the 幾 expansion to be explicitly explained before its first assessed use. The smallest affected gate is the Unit-46 implementation path. No repair was performed in this rerun.

Because Stage 7 Simulation A requires 0 BLOCKER and 0 MAJOR, Simulation B/C must not be run from this state.

## 2. Unit-by-unit strict learner simulation

### Unit 45 — Doctor Visit and Symptoms

Result: **PASS**

A Unit-44 learner can enter Unit 45 without Book-2 knowledge.

Verified:
- all 12 NEW lexical forms are locally taught before their first required assessment:
  - 醫生
  - 一直
  - 流
  - 鼻水
  - 頭
  - 痛
  - 胃口
  - 差
  - 喉嚨
  - 發炎
  - 生病
  - 發燒
- all 12 NEW characters complete their owning-lesson recognition/read plus intro → trace → build → complete → memory lifecycle before the associated first required vocabulary assessment:
  - 醫、直、流、鼻、痛、胃、喉、嚨、發、炎、病、燒
- 一直 and 直 are now first-owned here rather than requiring Book 2.
- D1T01–D1T05 are available only after their local lexical/character prerequisites are established.
- the Unit-45 review has **32 steps** and **3 listening items**, meeting the frozen floor.
- the review retrieves all 12 NEW lexical targets, all 12 NEW characters, health-inquiry functions, symptom reporting, duration-to-present, and the integrated doctor-patient sequence.

I specifically examined future Lesson-15 forms that appear only inside incorrect distractors. They are not correct answers, not required productive output, and the learner can solve the item from already-taught material; they do not create a prerequisite dependency.

### Unit 46 — Cold, Medicine, 把, and Recovery Advice

Result: **FAIL because of SIM-A-RERUN-01**

The rest of Unit 46 is correctly sequenced:

- all 10 NEW lexical forms are locally taught before required use:
  - 感冒、藥、藥局、拿、把、別、水、休息、睡覺、早一點
- all 9 NEW characters complete the full handwriting lifecycle:
  - 感、冒、藥、局、拿、把、休、息、睡
- G001 u46-noncommittal-question-words is introduced before its formal assessed grammar items.
- G002 u46-ba-disposal is introduced after 把 and 別 support and before productive 把 assessment.
- modal 得 děi is explicitly distinguished from complement 得 de before the doctor-visit medicine question.
- A004 appears after G002 and preserves all three source outcomes:
  1. 加油！我們今天一定要把這50個小籠包吃了。
  2. 要是你把今天的功課寫了，就可以去打籃球。
  3. 誰把我的西瓜吃了？
- support-only 您 is explained before the local source-register use **好的，謝謝您。**
- 您 has no canonical vocabulary ownership, Search/Mega ownership, or handwriting ownership.
- D1T06–D1T12 content is present with source-safe direct-address handling.
- the Unit-46 review has **34 steps** and **3 listening items**, including delayed Unit-45 retrieval and A004 retrieval.

The sole failure is the missing learner-facing explanation of the new 幾 = “a few/several” sense before u46-ji-s1.

### Unit 47 — Stomach Trouble and Getting Help

Result: **PASS conditional on repairing SIM-A-RERUN-01 upstream**

The Unit-47 path itself is internally safe:

- all 12 NEW lexical forms are explained before their first required assessment:
  - 怎麼了、臉色、難看、肚子、吐、次、陪、看病、不用了、健康、保險、健康中心
- all 8 NEW characters complete their full lifecycle:
  - 臉、肚、吐、陪、健、康、保、險
- G003 u47-vle-jiu is introduced after review of prior completed-action 了, 一…就…, and 以後; the formal G003 assessments come after the grammar card.
- the full D2T02 stomach/vomiting line is withheld until G003 is available.
- 好幾次 correctly depends on the Unit-46 幾 expansion plus Unit-47 次. This is why SIM-A-RERUN-01 is materially upstream: the Unit-47 path assumes the Unit-46 expansion was actually taught.
- 不用了 is explicitly framed as polite refusal rather than literal “not use.”
- health-insurance / health-center content is introduced after its lexical/character prerequisites.
- A005 preserves the four required source questions:
  - 哪裡不舒服？
  - 有沒有發燒？
  - 喉嚨怎麼樣？
  - 胃口怎麼樣？
- D2T01–D2T07 are covered in order through the learner-facing source sequence.
- the Unit-47 review has **34 steps** and **3 listening items**, including delayed U45/U46 retrieval, 幾 retrieval, G003 contrast, refusal, and A005.

### Unit 48 — Advice, Comparison, Source Activities, and Closure

Result: **PASS conditional on repairing SIM-A-RERUN-01 upstream**

Verified:
- all 8 NEW lexical forms are explained before required assessment:
  - 回家、油、冰、關心、最好、包、睡、小時
- the single NEW character 冰 completes read → intro → trace → build → complete → memory before its first assessed vocabulary item.
- 跟 recipient/addressee is explicitly contrasted with the older Unit-24 companionship sense before its first assessment.
- G004, G005, G006, and G007 are introduced before their new assessed behavior.
- the phrase 睡了八個小時的覺 appears immediately before the G007 card as a **review** of the already-published Unit-28 separable-duration pattern. Unit 28 explicitly taught duration insertion inside separable verbs. No new G007 separation type is assessed before the G007 explanation.
- D2T08–D2T13 are covered after the needed lexical/grammar support.
- the Unit-48 review has **58 steps** and **3 listening items**, exceeding the frozen floor and providing cumulative closure across Units 45–48.

## 3. Repaired A003 prescription path

Result: **PASS**

The learner now sees the required source notation before any A003 question.

### Support card

u48-prescription-support visibly teaches:

- **一日4次** — four times per day
- **3日份** — three-day supply
- **份 fèn** — support-only supply/portion unit
- **飯前** — before meals
- **飯後** — after meals
- **飯後30分鐘** — 30 minutes after meals

### Source-prescription representation

u48-prescription-visual visibly preserves:

- **健康診所**
- **一日4次**
- **3日份**
- **飯後**
- **飯後30分鐘**

健康診所 is explicitly contextual/glossed/non-assessed and 診 remains deferred.

### Frozen answers

The assessed answers remain exactly:

1. u48-a003-s1 → **四次**
2. u48-a003-s2 → **飯後30分鐘**
3. u48-a003-s3 → **十二包**

The third answer remains the source arithmetic inference: four doses/day × three days = 12 packets.

### 份 / 診 isolation

Verified on the current implementation:

- neither 份 nor 診 appears in canonical vocabulary ownership;
- neither appears in canonical character ownership;
- neither can enter Pinyin Search through the canonical vocabulary table;
- neither receives Mega ownership;
- neither receives handwriting ownership;
- 份 appears only in u48-prescription-support and u48-prescription-visual;
- 診 appears only in u48-prescription-visual inside 健康診所;
- both A003 support/source phrases have **practice: false**;
- the practice engine explicitly skips phrases whose practice flag is false, so these strings do not enter productive phrase practice.

This retest confirms the SIM-A-01 learner-facing A003 repair itself is successful.

## 4. A001 / A002 / A004 / A005

### A001 — PASS

The Unit-48 source table preserves all four participant rows and source data:

- 學生一 / Tiánzhōng: 兩碗; NT$18,000; 計程車; 三個半小時
- 學生二 / Rúyù: 一碗半; NT$6,500; 火車; 四個半小時
- 學生三 / Āntóng: 兩碗半; NT$15,000; 機車; 八個小時
- 學生四 / Yuèměi: 半碗; NT$6,200; 高鐵; 一個小時四十分鐘

The four assessed source transfers are consistent with those values. 臺南 remains contextual source data rather than new ownership.

### A002 — PASS

The three visual roles remain distinct and source-faithful:

1. **restroom / lower-abdomen scene** — accept suggestion — closes with **好的。**
2. **bed scene** — accept suggestion — closes with **謝謝你。**
3. **throat/neck scene** — politely reject — begins **謝謝你的關心。** and leaves completion open.

All three retain the shared source suggestion inventory:

- 看病
- 多休息
- 早一點睡覺
- 多喝水

The fixed Task-2 scenario remains:

**昨晚吃了晚飯以後吐了，肚子很不舒服。**

No deferred rejection glyph is required as learner output.

### A004 — PASS

All three source 把 outcomes are present after G002 and are retrieved again in Unit 46 review. Unit 48 also performs delayed A004 retrieval.

### A005 — PASS

The four health-condition questions are explicitly practiced in Unit 47, repeated in Unit-47 review, and delayed again in Unit-48 review.

## 5. Five semantic-listening repairs

Result: **PASS**

All five repaired items remain semantic rather than surface-string matching and carry semanticAnswer = true:

1. u46-review-l1 — 請問我得吃藥嗎？ → identifies modal 得 as **must / have to**.
2. u46-review-l3 — 多喝水，多休息，早一點睡覺。 → identifies what is **not** part of the advice.
3. u47-stomach-l1 — 肚子很不舒服，還吐了好幾次。 → identifies **stomach discomfort + repeated vomiting**.
4. u48-g7-l1 — full D2T13 line → identifies **separable-verb duration + degree comparison**.
5. u48-review-l3 — same combined line → retrieves **separable duration + much-better comparison**.

## 6. Counts and ownership

### 42 NEW lexical forms — PASS

Canonical first ownership across Units 45–48 is exactly 12 + 10 + 12 + 8 = **42**, with no duplicate NEW ownership inside the Lesson-15 range.

### Two semantic expansions

- **幾**: canonical owner remains Unit 7. Unit 46 is supposed to add the “a few/several” sense without a second canonical row. Ownership behavior is correct, but the learner-facing explain-before-test sequence **fails** at SIM-A-RERUN-01.
- **跟**: canonical owner remains Unit 24. Unit 48 correctly teaches recipient/addressee “to” as a local expansion before assessment, with no duplicate canonical row.

### 30 NEW characters / handwriting lifecycles — PASS

The exact split is:

- U45: 12 — 醫、直、流、鼻、痛、胃、喉、嚨、發、炎、病、燒
- U46: 9 — 感、冒、藥、局、拿、把、休、息、睡
- U47: 8 — 臉、肚、吐、陪、健、康、保、險
- U48: 1 — 冰

All **30/30** have the owning-lesson lifecycle:
recognition/read → intro → trace → build → complete → memory,
followed by later review complete retrieval.

The global standalone handwriting gate requires completion of the first non-review teaching lesson owning that character, so no practice-字 route can bypass the teaching lesson.

### Seven grammar rules — PASS

All seven formal grammar records exist at the frozen owner:

- U46 G001 — u46-noncommittal-question-words
- U46 G002 — u46-ba-disposal
- U47 G003 — u47-vle-jiu
- U48 G004 — u48-a-little-degree
- U48 G005 — u48-action-comparison-de
- U48 G006 — u48-comparison-degree
- U48 G007 — u48-separable-verbs

Their learner-facing grammar cards precede the new assessed grammar behavior. The sole sequencing failure is the separate **幾 semantic expansion**, not one of the seven formal grammar-card placements.

## 7. Dialogue coverage

Result: **PASS**

All **25 source dialogue turns** are represented in the intended Unit 45→48 progression:

- D1T01–D1T05 — Unit 45
- D1T06–D1T12 — Unit 46
- D2T01–D2T07 — Unit 47
- D2T08–D2T13 — Unit 48

Source-only names / deferred direct-address glyphs are normalized or contextual where required rather than becoming learner-owned prerequisites. The communicative content, including the doctor-visit, medicine, health-center, advice, and recovery arcs, remains present.

## 8. Review floors, delayed retrieval, and cumulative closure

Result: **PASS, subject to the upstream 幾 teaching repair**

Review counts are:

- U45: **32** steps / **3** listening
- U46: **34** steps / **3** listening
- U47: **34** steps / **3** listening
- U48: **58** steps / **3** listening

Delayed retrieval is present:

- U46 retrieves Unit-45 material.
- U47 retrieves prior Lesson-15 material including the intended 幾 expansion and source health functions.
- U48 retrieves U45–U47 vocabulary, grammar, A004/A005, 幾/跟 distinctions, modal-vs-complement 得, A001–A003, and source-era culture handling.

Unit-48 capstone closure remains explicit:

- S001/F001 — 哪裡不舒服？
- S002/F002 — 我一直流鼻水，頭很痛。
- S003/F003 — 多喝水，多休息，早一點睡覺。
- S004/F004 — 謝謝你的關心。不用了。

The closure content is structurally present and well sequenced, but the cumulative path cannot be declared fully learner-safe until the missing Unit-46 幾 explanation is restored.

## 9. Search / Mega / prerequisite implications

Result: **PASS except for SIM-A-RERUN-01**

Verified:

- Search is built from canonical vocabulary ownership.
- learned vocabulary becomes practice-eligible only after the owning lesson is completed.
- Mega draws from learned practice items / completed units rather than granting future ownership.
- 幾 and 跟 do not receive duplicate canonical ownership for their Lesson-15 expansions.
- 份, 診, and 您 do not receive canonical Search/Mega ownership.
- A003 support/source strings are explicitly excluded from productive phrase practice.
- the standalone character-practice gate is tied to the owning teaching lesson.
- no Book-2 unit is required as a prerequisite for Units 45–48.

The only material prerequisite break is pedagogical: Unit 47's 好幾次 legitimately depends on the new Unit-46 幾 sense, but Unit 46 currently tests that sense before teaching it.

## 10. 一直 / 直 migration

Result: **PASS**

Current canonical ownership is Book 1 Unit 45:

- 一直 is canonically owned by Unit 45.
- 直 is a Unit-45 NEW character.

Book-2 Unit 1 now treats them as review:

- 一直 appears in reviewVocabulary, not newVocabulary.
- 直 appears in reviewCharacters, not newCharacters.
- Book-2 directional practice may reuse them, but it no longer supplies first ownership.

Therefore Book 2 is not a prerequisite for Lesson 15.

## 11. Final Stage-7 disposition

**Simulation A rerun: FAIL — 0 BLOCKER / 1 MAJOR / 0 MINOR.**

Open finding:

| ID | Severity | Area | Finding | Smallest affected gate |
|---|---|---|---|---|
| SIM-A-RERUN-01 | MAJOR | U46 幾 expansion | u46-ji-explain does not teach 幾 = “a few/several”; u46-ji-s1 tests that new sense immediately afterward | Stage 5 implementation, Unit 46 u46-nonspecific path |

No implementation was changed. No Simulation B/C, traceability, release audit, Gate C, merge, publish, deploy, or Book-1 completion work was performed.
