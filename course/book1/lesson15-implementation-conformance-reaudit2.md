# Book 1 Lesson 15 — Implementation Conformance Re-audit 2

PR: #69  
Branch: `book1-lesson15-source-a`  
Scope: unchanged frozen Gate-B activity specification ↔ repaired learner-facing Units 45–48 implementation  
Verdict: **PASS**

## Severity summary

- BLOCKER: **0**
- MAJOR: **0**
- MINOR: **0**

The narrow Stage-5 IC-01 repair now conforms to the frozen A002 learner-input requirement. IC-02 semantic listening and IC-03 support-only 您 remain conformant. No regression was found in the previously passing Lesson-15 implementation areas.

## Audit basis

Freshly compared:

- `automation/book1/PROTOCOL.md` Stage 5 / implementation-conformance requirements;
- frozen `course/book1/lesson15-activity-spec.md`;
- frozen Unit 45–48 activity specs;
- `course/book1/lesson15-implementation-conformance-reaudit2-handoff.md`;
- repaired learner-facing `course/book1/unit45.ts` through `unit48.ts`;
- Unit 45–48 stroke-data files;
- `course/schema.ts` and the learner-facing visual/listening renderer in `components/learning-app.tsx`;
- generated `course/index.json`;
- Search/practice gating in `lib/vocabulary-lookup.ts`, `lib/practice-engine.ts`, and `lib/curriculum.ts`;
- current and main `course/book2/unit01.ts` for the 一直 / 直 ownership migration;
- `course/book1/completion.json`.

No deterministic QA, learner simulation, traceability/release audit, Gate C, merge, publish/deploy, or whole-Book-1 completion action was performed.

## IC-01 — PASS — A002 visual learner input is now source-specific and distinct

The frozen Gate-B contract requires three distinct learner-facing A002 source prompts, with two acceptance roles, one polite-rejection role, and the shared source suggestion inventory **看病 / 多休息 / 早一點睡覺 / 多喝水**. It forbids inventing a fixed symptom→advice mapping.

Current production satisfies that contract:

1. **`u48-a002-visual-1`**
   - role: 老李;
   - source scene: **restroom**;
   - learner-visible cue: a man hunched beside a men's restroom door with both hands at the lower abdomen;
   - response mode: **accept**;
   - closing: **好的。**

2. **`u48-a002-visual-2`**
   - role: 小陳;
   - source scene: **bed**;
   - learner-visible cue: a man lying in bed under a blanket with his head on a pillow;
   - response mode: **accept**;
   - closing: **謝謝你。**

3. **`u48-a002-visual-3`**
   - role: 王先生;
   - source scene: **throat**;
   - learner-visible cue: a man standing with one hand at the throat/neck;
   - response mode: **politely reject**;
   - closing begins **謝謝你的關心。** and remains open with an ellipsis for the learner to complete the rejection.

The renderer now draws separate restroom, bed, and throat/neck SVG scenes and also exposes the corresponding source-specific cue text. The cards are therefore not semantically interchangeable.

All three cards still expose the same four-item source suggestion bank. There is no card-specific advice field, no fixed symptom/advice sentence, and no implementation rule pairing one visual with one advice item. Therefore the repair preserves the source suggestion bank **without inventing a fixed symptom→advice mapping**.

Deferred-glyph safety remains intact: the learner is not required to read, select, type, or handwrite 拒 / 絕.

**Adjudication: PASS.**

## IC-02 — PASS — semantic listening remains repaired

All five required semantic listening items remain intact with `semanticAnswer: true`:

- `u46-review-l1`: modal 得 = **must/have to**, contrasted with complement 得 and obtain/get;
- `u46-review-l3`: identifies **去買房子** as not part of the complete advice;
- `u47-stomach-l1`: assesses **stomach discomfort and repeated vomiting** together;
- `u48-g7-l1`: assesses **separable-verb duration + degree comparison**;
- `u48-review-l3`: assesses **separable duration + much-better comparison**.

The learner renderer keeps the Chinese audio sentence intact and uses the semantic choices only for these explicit semantic-answer listening steps.

**Adjudication: PASS.**

## IC-03 — PASS — support-only 您 remains non-canonical

Production still contains:

- `u46-honorific-nin`: **您**, pinyin **nín**, polite “you”, explicitly marked support-only;
- `u46-thanks-nin`: **好的，謝謝您。**

Ownership remains correct:

- 您 is absent from Lesson-15 `newVocabulary`;
- 您 is absent from Lesson-15 NEW characters;
- `course/index.json` contains no canonical 您 entry;
- it therefore receives no canonical Search/Mega or handwriting ownership.

**Adjudication: PASS.**

## Regression conformance matrix

| Area | Result | Fresh evidence |
|---|---|---|
| Frozen lesson/step IDs | PASS | All exact frozen Unit-45–48 identifiers checked against production are present. The Unit-48 `u48-advice-冰` lifecycle prefix expands correctly to intro → trace → build → complete → memory rather than being a literal standalone step ID. |
| 42 canonical NEW lexical forms | PASS | Counts remain Unit 45 = 12, Unit 46 = 10, Unit 47 = 12, Unit 48 = 8; total **42**. |
| 幾 / 跟 expansion behavior | PASS | Neither is re-owned as NEW. Generated canonical ownership remains 幾 → Book-1 Unit 7 and 跟 → Book-1 Unit 24; Lesson 15 supplies only the frozen expansion senses. |
| 30 NEW formal characters | PASS | Counts remain 12 + 9 + 8 + 1 = **30**. Stroke-file key sets exactly match each unit's NEW-character set. |
| Seven grammar rules | PASS | Unit 46 = G001/G002, Unit 47 = G003, Unit 48 = G004–G007; total **7**. |
| Prerequisites | PASS | Grammar progression remains G001/G002 → G003 → G004/G005/G006/G007 with no Book-2 prerequisite. Unit ordering preserves the frozen lexical/support prerequisites. |
| Explain-before-test | PASS | Every grammar introduction precedes all assessed uses carrying that grammar ID. The A002 source prompts remain explanatory/communicative visual inputs, not auto-graded picture-identification tests. |
| Handwriting lifecycle | PASS | Every one of the 30 NEW characters has intro → trace → build → complete → memory and later review retrieval. |
| Handwriting locks | PASS | Standalone character practice still resolves the first non-review owning lesson and requires that lesson to be completed; Pinyin Search writing actions use the same gate. |
| 25 dialogue turns | PASS | Frozen ownership remains D1T01–05 in Unit 45, D1T06–12 in Unit 46, D2T01–07 in Unit 47, and D2T08–13 in Unit 48. Integrated/split phrase records preserve all 25 source turns while maintaining the frozen sequencing safeguards. |
| A001 | PASS | Exact source table remains present: four participant rows, bowl quantities, rents, travel modes, travel durations, and 臺南; four transfer checks plus four review transfers remain. |
| A003 | PASS | Exact answers remain **四次 / 飯後30分鐘 / 十二包**, with the 4 × 3 = 12 inference preserved and review transfer retained. |
| A004 | PASS | All three required 把 source outcomes remain, with Unit-46 controlled ordering and review retrieval. |
| A005 | PASS | The four health-condition questions remain **哪裡不舒服？ / 有沒有發燒？ / 喉嚨怎麼樣？ / 胃口怎麼樣？**, with review retrieval preserved. |
| Review floors | PASS | Unit 45 = **32**, Unit 46 = **34**, Unit 47 = **34**, Unit 48 = **58**. |
| Delayed retrieval | PASS | Cross-unit Lesson-15 retrieval remains in later reviews, including delayed A004/A005 transfer and Unit-48 cumulative mixing. |
| Search / Mega behavior | PASS | Canonical vocabulary/practice items remain lesson-owned and completion-gated. Support-only 您/份/分鐘 have no canonical ownership; 幾/跟 are not duplicated. |
| Unit-48 cumulative closure | PASS | `u48-review-cap1` through `u48-review-cap4` remain present, alongside A001–A005 transfer, grammar/sense contrasts, and cumulative U45–U47 retrieval. |
| 一直 / 直 migration | PASS | Generated ownership now first-owns 一直 and 直 in Book-1 Unit 45. Book-2 Unit 1 moves 一直 to review vocabulary and 直 to review characters. Its existing **138 unit/lesson/step identifiers** remain in the same order as main, preserving saved-progress identity/order. |

## Frozen-ID and sequencing notes

The four frozen Unit activity specs were checked against the current modules. No frozen lesson or assessed-step identifier was removed or replaced by the IC-01 repair.

The only apparent mismatch from a literal backtick-ID scan is `u48-advice-冰`, which the frozen spec explicitly defines as a **prefix**, not a standalone ID. Current production correctly contains:

- `u48-advice-冰-intro`
- `u48-advice-冰-trace`
- `u48-advice-冰-build`
- `u48-advice-冰-complete`
- `u48-advice-冰-memory`

No blocker is present.

## Final verdict

**PASS**

Fresh re-audit severity:

- **0 BLOCKER**
- **0 MAJOR**
- **0 MINOR**

Gate state after this audit:

- Source gate: **PASS**
- Dependency gate: **PASS**
- Gate A / curriculum: **PASS / frozen**
- Gate B / activities: **PASS / frozen**
- Implementation gate: **PASS**
- Deterministic QA: **READY, NOT RUN**
- Release gate: **LOCKED**

The next valid protocol stage is **Stage 6 — Deterministic QA**.

## Stop condition observed

Stopped after persisting this implementation-conformance re-audit and advancing state to deterministic-QA readiness. Deterministic QA, learner simulations, traceability/release audit, Gate C, merge, publish/deploy, and Book-1 completion were not performed.
