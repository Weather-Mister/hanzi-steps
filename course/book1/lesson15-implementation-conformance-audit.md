# Book 1 Lesson 15 — Implementation Conformance Audit

PR: #69  
Branch: `book1-lesson15-source-a`  
Scope: frozen Gate-B activity specification ↔ learner-facing Units 45–48 implementation  
Verdict: **FAIL**

## Severity summary

- BLOCKER: **1**
- MAJOR: **2**
- MINOR: **0**

Implementation must remain at Stage 5. Gate B remains frozen; deterministic QA is **not ready**.

## Audit basis

Compared:

- `automation/book1/PROTOCOL.md`
- `ADDING_A_UNIT.md`
- frozen Lesson-15 curriculum blueprint
- frozen Lesson-15 activity-spec packet, including Unit 45–48 specs
- Lesson-15 dependency ledger
- `course/book1/unit45.ts` through `unit48.ts`
- `course/book1/unit45.strokes.json` through `unit48.strokes.json`
- `course/book2/unit01.ts` and `course/book2/unit01.strokes.json`
- `course/manifest.json`
- generated `course/index.json` and the learner-practice ownership/gating path
- `course/book1/completion.json`

The audit did not run deterministic QA, learner simulations, hostile release audit, Gate C, merge, or publish.

## Conformance matrix

| Area | Result | Evidence / adjudication |
|---|---|---|
| Frozen lesson IDs | PASS | Six teaching lessons plus review are present in each Unit 45–48. |
| Frozen step IDs | PASS | Every frozen `u45-*`, `u46-*`, `u47-*`, and `u48-*` ID referenced by the activity specs is represented in production. Implementation-only EXPLAIN/support IDs do not replace frozen assessed IDs. |
| Canonical vocabulary ownership | PASS | Unit 45 owns 12 NEW forms, Unit 46 owns 10, Unit 47 owns 12, Unit 48 owns 8. 幾 and 跟 remain expansions with their earlier canonical owners. Support-only 您 / 對不起 / 份 / 分鐘 receive no canonical Search/Mega ownership. |
| Canonical character ownership | PASS | 30 Lesson-15 NEW characters are first-owned across Units 45–48 (12 + 9 + 8 + 1), with matching unit stroke files. |
| Prerequisite direction | PASS | Formal grammar introductions occur in the frozen order: G001/G002 in Unit 46, G003 in Unit 47, G004–G007 in Unit 48. No Book-2 prerequisite is introduced. |
| Explain-before-test | PASS, except findings below | Lexical/grammar/support EXPLAIN cards precede their assessed use. The failures below concern semantic fidelity of specific representations, not gross test-before-teach ordering. |
| Handwriting cycles | PASS | Each NEW character has owning-lesson recognition/read support plus intro → trace → build → complete → memory, later review handwriting retrieval, and stroke data. |
| Handwriting/Search lock behavior | PASS | Learned practice is generated only from completed owning lessons; canonical lookup ownership therefore does not expose Unit-45–48 NEW material before its owning lesson. |
| Review floors | PASS | Unit 45 = 32; Unit 46 = 34; Unit 47 = 34; Unit 48 = 58. |
| Delayed retrieval | PASS | U46 retrieves U45; U47 retrieves U45/U46; U48 contains delayed U45–U47, A004/A005, sense contrasts, and additional cumulative retrieval. |
| A001 | PASS | Exact source-table transfer IDs and four source checks are present before review reuse. |
| A002 | **BLOCKER** | Required visual input is missing; see IC-01. |
| A003 | PASS | Prescription support, exact source questions, and review transfer are present. |
| A004 | PASS | Three source outcomes, orders, transfer check, and later delayed retrieval are present. |
| A005 | PASS | Four source health-condition questions, source transfer, and later delayed retrieval are present. |
| Dialogue coverage | **MAJOR divergence** | Dialogue/support IDs are present, but the frozen honorific turn is altered; see IC-03. |
| R1 listening representation | **MAJOR divergence** | Many substitutions are equivalent, but several narrow the frozen semantic distinction; see IC-02. |
| Search / Mega ownership | PASS | Generated index first-owns 一直/直 in Unit 45, retains 幾 at Unit 7 and 跟 at Unit 24, and creates no canonical rows for the support-only items above. |
| Unit-48 cumulative closure | PASS structurally, blocked semantically | The 58-step review includes A001–A005, 12 cumulative retrieval checks, culture, and capstone `u48-review-cap1`–`cap4`. A002 and R1 defects prevent overall conformance. |
| 一直 / 直 migration | PASS | See dedicated migration section below. |

## Findings

### IC-01 — BLOCKER — R2 A002 source illustrations are not implemented as required visual inputs

**Frozen requirement**

The Unit-48 A002 contract explicitly requires:

- the three exact source illustrations from printed pp. 346–347 / PDF pp. 373–374;
- those illustrations as **required visual input** to the role play;
- the source visual symptom/advice mapping to be transcribed rather than invented or omitted;
- two acceptance roles and one polite-rejection role;
- deferred-glyph safety.

**Actual implementation**

`u48-a002-visual-1`, `u48-a002-visual-2`, and `u48-a002-visual-3` are phrase cards whose learner-facing content is only:

- “Source illustration 1 — 好的。”
- “Source illustration 2 — 謝謝你。”
- “Source illustration 3 — 謝謝你的關心。不用了。”

The notes state that the illustration identity is “preserved textually because UnitData has no image field,” but no source image, source visual description, or transcribed visual symptom/advice mapping is actually available to the learner.

**Adjudication**

This is **not semantically conformant**. A label saying “Source illustration 1” is not the visual input required by the frozen task and does not let the learner perform the source role play from the picture. The missing visual is source-task content, not cosmetic presentation.

**Blast radius / smallest reopening**

- Blast radius: **IMPLEMENTATION / SCHEMA**
- Gate A: remains frozen
- Gate B: remains frozen
- Stage 5 implementation: must remain/reopen for repair
- Deterministic QA: locked

The smallest valid repair is to add an implementation/schema/rendering representation that actually supplies the three exact source illustrations (or a formally approved source-faithful visual representation that preserves the same source mapping). Do not rewrite the frozen A002 educational requirement to fit the current schema.

### IC-02 — MAJOR — R1 listening substitutions are not uniformly semantics-preserving

The implementation keeps the frozen Chinese `audioText` for the audited listening items. Many Chinese audio-contained substitutions preserve the same distinction and are acceptable, including straightforward phrase equivalents such as `u45-doctor-l1`, `u45-sick-l1`, `u45-duration-l1`, `u46-rec-l1`, `u47-what-l1`, and the G004/G005/G006 phrase equivalents.

However, the following frozen semantic tests are materially narrowed:

1. **`u46-review-l1`**
   - Frozen: identify the **meaning of 得** heard (“must/have to” vs complement marker vs obtain).
   - Implementation: identify the literal audio-contained phrase `得吃藥`.
   - Result: semantic-sense discrimination becomes surface phrase recognition.

2. **`u46-review-l3`**
   - Frozen: identify which candidate is **NOT part of the three-part advice**.
   - Implementation: identify one literal advice chunk `多休息`.
   - Result: the frozen whole-advice exclusion/comprehension check is replaced by a simpler positive match.

3. **`u47-stomach-l1`**
   - Frozen: identify **two problems**: stomach discomfort + repeated vomiting.
   - Implementation: identify only `吐了好幾次`.
   - Result: one half of the frozen listening distinction disappears.

4. **`u48-g7-l1`**
   - Frozen: identify the **combined G007 separable-duration + G006 degree-comparison systems**.
   - Implementation: identify only `睡了幾個小時的覺`.
   - Result: the G006 half of the combined listening target is no longer assessed.

5. **`u48-review-l3`**
   - Frozen: again identify the combined separable-duration + much-better comparison.
   - Implementation: again asks only for the separable chunk.
   - Result: the cumulative combined-system listening check is narrowed to one system.

These are documented representation workarounds, but documentation alone does not make them equivalent.

**Blast radius / smallest reopening**

- Blast radius: **IMPLEMENTATION**
- Gate B does not need to reopen: the frozen requirements are clear.
- Repair the learner-facing representation so each frozen semantic distinction remains assessed. If the current `listen` validator cannot encode the semantics directly, use the smallest implementation-level representation that preserves the frozen listening objective rather than silently simplifying it.

### IC-03 — MAJOR — Frozen D1T12 honorific support is altered

**Frozen records**

- `u46-honorific-nin`: text **您**, pinyin **nín**, meaning “polite you.”
- `u46-thanks-nin`: text **好的，謝謝您。**

The spec marks 您 as support-only: no vocabulary/Search/Mega/handwriting ownership is required.

**Actual implementation**

- `u46-honorific-nin` displays **nín** as the text instead of 您.
- `u46-thanks-nin` displays **好的，謝謝你。** instead of **好的，謝謝您。**
- A later assessed prompt nevertheless displays `謝謝您` and asks what 您 means.

**Adjudication**

The implementation changes the frozen source/pragmatic register and the D1T12 learner-facing turn. The stated “do not expose the untaught glyph” rationale is also internally inconsistent because the same lesson exposes 您 in the select prompt. Support-only status already prevents canonical ownership without requiring the source honorific to be rewritten.

**Blast radius / smallest reopening**

- Blast radius: **IMPLEMENTATION**
- Restore the frozen support/display behavior while keeping 您 out of canonical vocabulary, Search/Mega ownership, and handwriting.
- Gate B remains frozen.

## R1 overall adjudication

**FAIL / material divergence.**

The validator constraint explains why a representation change was attempted, and several replacements are semantics-preserving. It does not justify the narrowed cases listed in IC-02. The smallest affected gate is implementation, not curriculum/activity design.

## R2 overall adjudication

**FAIL / material divergence.**

The exact source illustrations are educational inputs to A002. Textual labels that merely name “Source illustration 1/2/3” do not preserve the frozen task. This requires an implementation/schema representation repair; the frozen activity requirement itself should not be weakened.

## 一直 / 直 canonical migration audit

Migration is conformant:

- Unit 45 canonically owns `一直` in `u45-runny-nose`.
- Unit 45 canonically owns character `直` in `u45-runny-nose`.
- Generated `course/index.json` points both first-ownership rows to Book 1 Unit 45.
- Book-2 Unit 1 no longer declares `一直` as NEW; it is in `reviewVocabulary`.
- Book-2 Unit 1 no longer declares `直` as NEW; it is in `reviewCharacters`.
- Book-2 Unit-1 stroke data no longer contains `直`; Unit 45 contains its stroke data.
- All **138** existing Book-2 Unit-1 lesson/step IDs are unchanged and remain in the same order relative to the pre-migration version.
- Book-2 direction lessons continue to use `一直 / 直` as REVIEW without becoming a prerequisite for Book 1.

## Final verdict

**FAIL**

The audit cannot pass because it has:

- 1 BLOCKER: missing A002 required visual inputs;
- 2 MAJOR findings: narrowed R1 semantic listening assessment and altered D1T12 honorific support.

Therefore:

- Implementation gate remains **pending**.
- Gate A remains **pass / frozen**.
- Gate B remains **pass / frozen**.
- Release gate remains **locked**.
- Deterministic-QA readiness is **not reached**.
- No learner simulations, hostile release audit, Gate C, merge, publish/deploy, or Book-1 completion action is permitted from this checkpoint.

Next valid action: repair the three implementation findings at the smallest implementation/schema blast radius, then rerun this implementation-conformance audit from the frozen Gate-B packet.
