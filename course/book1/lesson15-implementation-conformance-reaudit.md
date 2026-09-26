# Book 1 Lesson 15 — Implementation Conformance Re-audit

PR: #69  
Branch: `book1-lesson15-source-a`  
Scope: unchanged frozen Gate-B activity specification ↔ repaired learner-facing Units 45–48 implementation  
Verdict: **FAIL**

## Severity summary

- BLOCKER: **1**
- MAJOR: **0**
- MINOR: **0**

The Stage-5 repair resolves IC-02 and IC-03, but IC-01 remains materially nonconformant. The implementation gate therefore remains pending and deterministic QA is **not ready**.

## Audit basis

Independently compared:

- `automation/book1/PROTOCOL.md` (Stage 5 / implementation conformance);
- `ADDING_A_UNIT.md`;
- frozen `course/book1/lesson15-curriculum-blueprint.md`;
- frozen `course/book1/lesson15-activity-spec.md`;
- frozen Unit 45–48 activity specs;
- the previous implementation-conformance audit only to identify IC-01/02/03 after reading the normative packet;
- repaired `course/book1/unit45.ts` through `unit48.ts`;
- matching Unit 45–48 stroke files;
- `course/schema.ts`, `components/learning-app.tsx`, `validation/validate.mjs`, and `validation/validator.test.mjs`;
- `course/index.json`, practice ownership/gating code, `course/book2/unit01.ts`, and the pre-migration Book-2 Unit-1 ID order;
- `course/book1/completion.json`.

No deterministic QA, learner simulation, traceability/release audit, Gate C, merge, publish/deploy, or whole-book completion action was performed.

## Re-audit of the three repaired findings

### IC-01 — BLOCKER — A002 still lacks the frozen source-specific visual information

**Frozen requirement**

The Unit-48 Gate-B contract requires all three A002 source illustrations from printed pp. 346–347 / PDF pp. 373–374 as required learner input. It explicitly states that:

- `u48-a002-visual-1`, `-2`, and `-3` preserve the three source illustration prompts;
- the first two are acceptance roles and the third is a polite-rejection role;
- the source suggestion inventory is 看病 / 多休息 / 早一點睡覺 / 多喝水;
- the **visual symptom/advice mapping must be transcribed from the source illustrations**;
- the symptom/advice information supplied by those illustrations remains required visual input rather than fixed printed wording;
- invented replacement image meaning is forbidden.

**Current production**

The new `visual` step type and renderer are real learner-facing UI, and they correctly preserve:

- role shells 老李 / 小陳 / 王先生;
- closings 好的。 / 謝謝你。 / 謝謝你的關心。……;
- acceptance / rejection instructions;
- the four-item source suggestion inventory;
- contextual-only names and deferred-glyph safety.

However, the learner-facing cards render the same generic human figure plus a dialogue skeleton containing `我……` and the same four suggestion choices. The three step payloads contain no source-specific symptom depiction, symptom transcription, card-specific advice cue, or other representation of the symptom/advice information supplied by the original illustrations. `visualSource: "A002 source prompt N"` is provenance/label text, not the missing visual information.

The renderer therefore distinguishes the cards by role, response mode, and closing, but not by the source illustration content that drives the role-play.

**Adjudication**

**FAIL / BLOCKER.** This is an improvement over the original literal “Source illustration N” placeholder, but it still omits the educational input the frozen contract requires. A generic silhouette and blank `我……` line cannot substitute for the source-specific symptom/advice information.

The new validator only requires generic visual metadata and a nonempty suggestion list; its test likewise proves schema completeness, not source-semantic fidelity. The validator therefore does not cure the conformance defect.

Smallest affected gate remains **Stage 5 implementation/schema**. Gate A and Gate B stay frozen.

### IC-02 — PASS — five semantic listening distinctions restored

All five disputed IDs now preserve the frozen semantic objective while keeping the Chinese audio sentence intact:

1. `u46-review-l1` — asks which meaning of 得 is heard; correct answer **must/have to**, contrasted with performance-complement 得 and obtain/get.
2. `u46-review-l3` — asks which item is **NOT** part of the complete advice; correct answer **去買房子**.
3. `u47-stomach-l1` — assesses both problems together: **stomach discomfort and repeated vomiting**.
4. `u48-g7-l1` — assesses **separable-verb duration + degree comparison**.
5. `u48-review-l3` — assesses **separable duration + much-better comparison**.

Each is explicitly marked `semanticAnswer: true`. The schema exposes this only on steps, and the validator rejects it unless it is exactly `true` on a listening exercise. The literal-audio-answer constraint is relaxed only for that explicit listening opt-in. The learner renderer presents the semantic choices and, when text support is requested, shows the Chinese `audioText`.

**Adjudication: PASS.** IC-02 is resolved without weakening the frozen objective.

### IC-03 — PASS — support-only 您 restored

Current production restores:

- `u46-honorific-nin`: text **您**, pinyin **nín**, meaning **polite “you”**;
- `u46-thanks-nin`: text **好的，謝謝您。**.

Ownership checks also pass:

- 您 is absent from canonical `newVocabulary`;
- 您 is absent from canonical NEW characters;
- `course/index.json` has no 您 vocabulary/character ownership row;
- therefore it receives no canonical Search/Mega or handwriting ownership.

**Adjudication: PASS.** IC-03 is resolved.

## Regression conformance matrix

| Area | Result | Re-audit evidence |
|---|---|---|
| Frozen IDs | PASS | Every Unit-45–48 identifier referenced by the four frozen unit activity specs is present in repaired production; no frozen referenced ID is missing. |
| 42 canonical NEW lexical forms | PASS | Per-unit counts remain 12 + 10 + 12 + 8 = **42**. |
| 幾 / 跟 expansions | PASS | Neither is re-owned as NEW. Generated index still first-owns 幾 in Unit 7 and 跟 in Unit 24; Lesson 15 uses their frozen expansion senses only. |
| 30 NEW formal characters | PASS | Counts remain 12 + 9 + 8 + 1 = **30**. Each unit stroke file has exactly the corresponding NEW-character key set. |
| Seven grammar rules | PASS | Unit 46 owns G001/G002, Unit 47 owns G003, Unit 48 owns G004–G007 = **7** total, with valid grammar-introduction references. |
| Prerequisite direction | PASS | Formal grammar order remains G001/G002 → G003 → G004/G005/G006/G007, with no Book-2 prerequisite introduced. |
| Explain-before-test | PASS | Frozen teaching/support IDs remain before their assessed uses; grammar introductions reference their actual teaching steps. The IC-02/03 repairs do not move assessment ahead of teaching. |
| Handwriting lifecycle | PASS | All 30 NEW characters retain intro → trace → build → complete → memory plus later review retrieval; each owning unit has matching stroke geometry. |
| Handwriting locks | PASS | Adaptive/handwriting practice is generated from completed owning lessons; Lesson-15 ownership changes do not expose NEW characters before the owning lesson is completed. |
| 25 dialogue turns | PASS | Frozen dialogue coverage remains represented across Units 45–48, including split phrase records where the frozen activity spec deliberately decomposes a source turn. No dialogue-associated frozen ID was removed by repair. |
| A001 | PASS | Exact comparison-table transfer checks and four review transfers remain present, including 臺南 and source values. |
| A003 | PASS | Prescription support and the exact source answers remain 四次 / 飯後30分鐘 / 十二包, with review transfer preserved. |
| A004 | PASS | Three Unit-46 source 把 outcomes remain, with Unit-46 retrieval and delayed Unit-48 transfer. |
| A005 | PASS | Four health-condition questions remain and are repeated in Unit-47 review and delayed Unit-48 transfer. |
| Review floors | PASS | Unit 45 = **32**, Unit 46 = **34**, Unit 47 = **34**, Unit 48 = **58**. |
| Delayed retrieval | PASS | U46 retrieves U45; U47 retrieves earlier Lesson-15 material; U48 retains delayed A004/A005, cumulative U45–U47 retrieval, sense contrasts, and capstone closure. |
| Search / Mega | PASS | Canonical generated ownership remains lesson-gated; no second 幾/跟 owner and no support-only 您/份/分鐘 ownership. |
| Unit-48 cumulative closure | PASS except IC-01 input | Review remains 58 steps with A001–A005 transfer and `u48-review-cap1`–`cap4`. The structure is intact, but overall implementation cannot pass while the required A002 input is absent. |
| 一直 / 直 migration | PASS | Generated index first-owns 一直 and 直 in Book-1 Unit 45. Book-2 Unit 1 has 一直 in REVIEW vocabulary and 直 in REVIEW characters, not NEW ownership. All **138** existing Book-2 Unit-1 lesson/step IDs remain in the same order as main. Book 2 is not a prerequisite for Book 1. |

## Final verdict

**FAIL**

Re-audit severity:

- **1 BLOCKER** — IC-01 remains open because the repaired A002 cards still omit the source-specific visual symptom/advice information required by frozen Gate B.
- **0 MAJOR**
- **0 MINOR**

IC-02 and IC-03 are genuinely resolved, and the previously passing regression areas remain conformant.

Therefore:

- Source gate: **PASS**
- Dependency gate: **PASS**
- Gate A / curriculum: **PASS / frozen**
- Gate B / activities: **PASS / frozen**
- Implementation gate: **PENDING**
- Deterministic QA readiness: **NOT REACHED**
- Release gate: **LOCKED**

Next valid action is the smallest Stage-5 repair of IC-01 only, preserving the frozen Gate-B A002 requirement, followed by another fresh implementation-conformance re-audit.

## Stop condition observed

Stopped at the implementation-conformance re-audit. Deterministic QA, learner simulations, traceability/release audit, Gate C, merge, publish/deploy, and Book-1 completion were not performed.
