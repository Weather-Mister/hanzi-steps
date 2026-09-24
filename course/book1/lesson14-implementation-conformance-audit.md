# Book 1 Lesson 14 — Implementation Conformance Audit

Frozen inputs:
- `course/book1/lesson14-curriculum-blueprint.md`
- `course/book1/lesson14-activity-spec.md`
- `course/book1/lesson14-unit42-activity-spec.md`
- `course/book1/lesson14-unit43-activity-spec.md`
- `course/book1/lesson14-unit44-activity-spec.md`

Implemented learner-facing files:
- `course/book1/unit42.ts`
- `course/book1/unit43.ts`
- `course/book1/unit44.ts`
- `course/book1/unit42.strokes.json`
- `course/book1/unit43.strokes.json`
- `course/book1/unit44.strokes.json`
- `course/book1/unit42.stroke-source.json`
- `course/book1/unit43.stroke-source.json`
- `course/book1/unit44.stroke-source.json`
- `course/manifest.json`

Scope: Frozen Activity Spec ↔ authored implementation before generated artifacts and deterministic QA.

## 1. Unit topology

PASS.

- Unit 42: 6 teaching lessons + review; review = 25 steps.
- Unit 43: 6 teaching lessons + review; review = 28 steps.
- Unit 44: 6 teaching lessons + review/capstone; review = 37 steps.
- Manifest registers Units 42, 43, and 44 in chronological order after Unit 41.
- No existing published unit ID, lesson ID, or position is renumbered.

## 2. Canonical vocabulary ownership

PASS.

Exact canonical NEW forms:

- Unit 42 — 11 / 11:
  天氣、冷、風、滑雪、下雪、春天、冬天、夏天、秋天、雨、下雨.
- Unit 43 — 7 / 7:
  只、新年、父母、停、十二月底、明年、紅葉.
- Unit 44 — 12 / 12:
  傘、颱風、濕、討厭、新聞、大家、小心、這次、上次、更、可怕、慢走.

Total = **30 / 30**.

想 / 快 / 要 remain REVIEW vocabulary owned by earlier lessons. No duplicate canonical NEW row and no broadening of their earlier global glosses was introduced.

## 3. Character ownership and handwriting

PASS after one local implementation repair.

Exact NEW character order:

- Unit 42: 冷、滑、雪、春、冬、夏、秋、雨
- Unit 43: 只、父、母、停、底、葉
- Unit 44: 傘、颱、濕、討、厭、聞、更

All 21 handwriting files now:
- contain exactly the NEW-character keys in frozen order;
- contain matching stroke/median geometry;
- match each character record's stroke count;
- preserve exact Traditional codepoints.

A local implementation check found that the initial 葉 metadata used 12 while the selected Taiwan/Arphic geometry has 13 strokes. The implementation metadata was corrected to 13; this does not alter curriculum ownership or activity sequencing.

Stroke provenance:
- all three units use exact-codepoint Hanzi Writer Data / Make Me A Hanzi geometry under the Arphic Public License already stored at `public/licenses/arphic.txt`;
- this was chosen for the final committed geometry so 颱 is available and cross-locale AnimCJK fallbacks are not required;
- no Simplified substitute such as 台/台风 is used.

## 4. Formal grammar

PASS.

Exact formal grammar ownership:

Unit 43:
- `u43-completed-duration`
- `u43-duration-to-now`
- `u43-imminent`

Unit 44:
- `u44-even-more`
- `u44-not-as`

Grammar introduction records point to the actual grammar-card steps. Unit 42 creates no extra numbered grammar rule for the support-only 會不會 / 常不常 bridge.

## 5. Phrase transcription

PASS.

Frozen phrase-record parity:
- Unit 42: 17 / 17 exact records
- Unit 43: 19 / 19 exact records
- Unit 44: 28 / 28 exact records

For every phrase record, implementation matches the frozen:
- Traditional text;
- tone-marked pinyin;
- English meaning;
- note;
- ordered token bank;
- grammar references.

All order activities use token banks identical to their phrase's frozen correct token sequence; no repeated-token multiplicity is lost.

## 6. Activity IDs and review coverage

PASS.

Static conformance checks found:
- duplicate activity IDs: 0
- missing frozen phrase IDs: 0
- order-token mismatches: 0
- missing NEW vocabulary ownership: 0
- missing NEW character ownership: 0
- grammar-ID ownership mismatches: 0

The implemented review sizes remain exactly 25 / 28 / 37.

## 7. Documented runtime-schema deviations

These are LOCAL implementation adaptations, not curriculum changes.

### DEV-001 — listen activities require a `char`

The repository runtime schema requires every `listen` step to reference one existing character. The frozen activity packet specified the semantic listening payload but did not always include this runtime-only field.

Implementation adds a relevant already-taught/current character to every listening step.

Effect on curriculum: none.

### DEV-002 — contextual listening requires the keyed answer to be literally audible

The validator requires:
- `audioText.includes(answer)`;
- exactly one answer option to occur literally in the audio.

Several frozen listening questions used English semantic answer options even though the audio is Chinese. The implementation converts only those listening answer/option surfaces to semantically equivalent Chinese substrings while preserving the same listening target.

Examples:
- “Which season is preferred?” now keys **春天** from the same audio.
- completed-duration listening keys **兩個鐘頭** from the same audio.
- typhoon listening keys **颱風** from the same audio.
- the G005 listening keys **沒有上次的那麼可怕** from the same audio.

The explanation remains explicit about the intended meaning. No grammar target, prerequisite, source ownership, correct semantic interpretation, or lesson position changes.

Effect on curriculum: none.
Blast radius: LOCAL / implementation payload only.

### DEV-003 — stroke source differs from the initial hydration preference

The authoring convention normally permits AnimCJK hydration. AnimCJK lacked exact Traditional **颱**, and fallback files for a few other exact codepoints came from non-Taiwan locale datasets. Final implementation therefore pre-seeds all Lesson-14 NEW-character geometry from Hanzi Writer Data / Make Me A Hanzi using the already-included Arphic license.

Effect on curriculum: none.
Blast radius: LOCAL / handwriting geometry provenance only.

## 8. Explain-before-test and prerequisite preservation

PASS.

Implementation order preserves the frozen edges:
- 下雪 / 雨 / 下雨 before weather A-not-A assessment;
- G001 before G002;
- 對不對 bridge before its assessed use;
- 快 / 要 sense cards before G003;
- G003 before 新年快到了 and later typhoon retrieval;
- 濕 before 濕濕的;
- 大家 + 小心 + prior 多+Verb before 請大家多小心;
- 更 baseline before G004 and full D2T07;
- G005 before D2T08;
- 慢走 before assessed 小心慢走.

## 9. Search / Mega ownership

PASS at authored-module level.

- all 30 canonical NEW forms have exactly one newVocabulary row at their owning lesson;
- 想 / 快 / 要 receive no second row;
- contextual proper names/support items receive no canonical row;
- 度 receives no row;
- 玉山 / 紐約 receive no row.

Generated Search/Mega artifacts remain a deterministic-QA concern in Stage 6.

## 10. Conformance result

Open BLOCKER: **0**

Open MAJOR: **0**

Open MINOR: **0**

# Result: PASS

The learner-facing Unit 42–44 authored implementation conforms to the frozen Gate-B packet, with the three documented runtime/provenance adaptations above. None changes frozen curriculum ownership or pedagogy.

Implementation gate may pass. The repository must now complete deterministic QA on the final implementation head before learner simulation begins.
