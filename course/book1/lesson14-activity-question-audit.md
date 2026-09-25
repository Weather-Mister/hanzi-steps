# Book 1 Lesson 14 — Activity Audit 2: Question Correctness / Adversarial Audit

Audit: **fresh-context independent Activity Audit 2**  
Source lesson: Lesson 14 「天氣這麼冷！」  
Gate: Stage 4 / Gate B  
Verdict: **PASS**

This audit was completed independently before reading:
- `course/book1/lesson14-activity-teaching-quality-audit.md`
- `course/book1/lesson14-activity-cross-unit-audit.md`

## Audited activity-spec head

PR #68 head at final independent re-audit:

`ed233ecd50029210d8c4afcc0376fa8ef52ff686`

Normative packet blob SHAs:

- `course/book1/lesson14-activity-spec.md` — `cd75e06073c189eb286c4fca8c463bcf18e13d82`
- `course/book1/lesson14-unit42-activity-spec.md` — `16e75013df33ca8abcd546bce5ddfcd31f1fbcd2`
- `course/book1/lesson14-unit43-activity-spec.md` — `8cbb44f72db4472d7eb2388c87f87c5efc95fd98`
- `course/book1/lesson14-unit44-activity-spec.md` — `619c83e0feccc0256ab75f91eac04eb0957465a2`

The frozen Gate-A blueprint was treated as immutable. No fix moved source ownership, unit boundaries, formal grammar ownership, character ownership, or a frozen prerequisite edge.

## Scope attacked

The review covered all learner-facing phrase records, grammar records, select/listen/order activities, review items, answer keys, distractors, pinyin lines, English meanings, source adaptations, prerequisite timing, character exposure, Search/Mega ownership notes, and cumulative retrieval claims across Units 42–44.

Specific adversarial checks included:
- multiple/no defensible answers;
- wrong keys and key/option mismatches;
- accidental clues;
- weak or nonsensical distractors;
- assessment before explanation;
- future/untaught vocabulary, grammar, and Hanzi;
- deferred/support glyph leakage;
- pinyin/tone-mark accuracy;
- Traditional-vs-Simplified orthography;
- Taiwan-Mandarin naturalness;
- misleading English;
- grammar overgeneralization/source contradiction;
- exact order-token reconstruction and multiplicity;
- source-adaptation fidelity;
- duplicate activity IDs;
- claimed retrieval that does not retrieve the intended target;
- Search/Mega leakage involving 想 / 快 / 要 or support-only items.

## Findings and repairs

### BLOCKER — AQ2-B001: future/untaught material leaked into assessed distractors

The candidate packet contained distractors that exposed later Lesson-14 material before its teaching point. Examples included:
- Unit 42 using 新年 / 新聞 before Units 43/44;
- Unit 42 using 下雨 before 雨/下雨 teaching and 夏天 before its character/lexical introduction;
- Unit 42 review using 停 before Unit 43;
- Unit 43 using later 十二月底 / 明年秋天 / 紅葉 before their lessons;
- Unit 43 using future Unit-44 更;
- Unit 43 using G003 快要 before G003 teaching;
- Unit 44 umbrella listening using 新聞 before the 新聞/聞 lesson.

**Resolution:** replaced those distractors with already-taught or already-introduced material while preserving the same tested target. No frozen prerequisite edge changed.

Status: **RESOLVED**.

### BLOCKER — AQ2-B002: ambiguous or incorrect answer keys

The most serious original ambiguity was Unit-43 review G002: the distractor `我兩個月不工作了。` can itself express a duration/current-state frame, so the prompt “Which presents duration accumulated up to now?” did not have a safely unique answer.

The final re-audit also caught two literal key/option mismatches:
- `u42-spring-l1` had English options after a repair but retained Chinese answer `春天`;
- `u44-umbrella-s3` retained its old answer wording after its option was strengthened.

**Resolution:** replaced the ambiguous G002 distractor and corrected both exact answer keys. A final mechanical key audit confirms every parsed select/listen/review answer matches exactly one option.

Status: **RESOLVED**.

### MAJOR — AQ2-M001: weak/nonsensical distractors materially reduced diagnostic value

Several questions used distractors such as semantically absurd season/typhoon equivalences, unrelated transport/birthday/French tasks, or impossible event descriptions. They made correct answers identifiable without retrieving the intended Lesson-14 target.

**Resolution:** strengthened affected distractors to target-adjacent alternatives while keeping one defensible answer. Repairs were local activity wording only.

Status: **RESOLVED**.

### MAJOR — AQ2-M002: one review item tested curriculum metadata instead of the learner target

`u43-review-g6` asked which form “must be explained before source DR001 uses it.” That checks knowledge of internal curriculum sequencing rather than retrieval of 對不對 as a confirmation form.

**Resolution:** changed it to a direct learner-facing confirmation-use question and explanation.

Status: **RESOLVED**.

### MINOR — AQ2-m001: stale Unit-44 review references and numbering

The Unit-44 lifecycle table referenced nonexistent/stale review IDs such as `review-v1`, `review-v3`, `review-v10`, `review-g1`–`g4`, and A004 ranges that were not present in the exact bank. The visible ordinal numbering also had gaps although the stable IDs and stated 37-step total were correct.

**Resolution:** aligned lifecycle references to the actual final review IDs, added explicit G004/G005 grammar tagging to the relevant review assessments, and normalized the visible review ordinals to 1–37.

Status: **RESOLVED**.

### MINOR — AQ2-m002: compact 慢走 review notation was ambiguous

The compact line `Take care / Bye / compare again / snow` used the same slash both inside the correct meaning and as the apparent option delimiter.

**Resolution:** expanded `u44-review-v12` into an explicit prompt/options/answer/explanation payload with `Take care / Bye` as one unambiguous option.

Status: **RESOLVED**.

## Final adversarial verification

Final packet checks:

- open BLOCKER: **0**
- open MAJOR: **0**
- open MINOR: **0**
- duplicate activity IDs: **0**
- order-token mismatches: **0**
- order banks preserve exact referenced phrase tokens/multiplicity: **PASS**
- parsed answer keys absent from options: **0**
- duplicate parsed options: **0**
- assessed future/untaught Hanzi detected by sequential lifecycle scan: **0**
- Simplified-character contamination detected in learner-facing payloads: **0**
- deferred 玉 / 紐 / 約 and hidden support glyphs in required answers: **0**
- A003 assessed 度 / 北 leakage: **0**
- 想 / 快 / 要 duplicate Search/Mega ownership: **0**
- support-only Search/Mega ownership leakage: **0**
- D1T06 adaptation still preserves the approved experience/duration meaning without 紐約 or 漂亮 production: **PASS**
- D2T01 呢 remains comprehension-only: **PASS**
- 濕濕的 remains a specific source-attested extension, not a generalized reduplication rule: **PASS**
- G001/G002 completed-vs-up-to-now distinction: **PASS**
- G003 imminence, Taiwan 快要 preference, and explicit-time restriction: **PASS**
- G004 更 “even more” baseline: **PASS**
- G005 沒有…那麼/這麼 and three-way comparison contrast: **PASS**
- learner-facing phrase/grammar pinyin and English meanings line-by-line: **PASS; no remaining material error found**
- Taiwan-Mandarin learner-facing usage: **PASS; no remaining material unnaturalness found**

## Blast radius

All repairs are **LOCAL / ACTIVITY** only.

Gate A does **not** reopen.

## Final verdict

**PASS — Activity Audit 2 / Question Correctness.**

The final independent packet has zero open BLOCKER and zero open MAJOR findings and is eligible for Gate B comparison with Activity Audits 1 and 3.
