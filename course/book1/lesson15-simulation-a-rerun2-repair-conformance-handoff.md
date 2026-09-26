# Book 1 Lesson 15 — Simulation A Rerun 2 Repair Conformance Handoff

Working repository: `Weather-Mister/hanzi-steps`  
Working draft PR: **#69**  
Working branch: `book1-lesson15-source-a`

Current checkpoint: **SIM-A-RERUN2-01 cross-unit learner-facing assessment drift repaired; fresh affected-path implementation conformance is required before deterministic QA can be rerun**.

## Gate/state

- Source gate: **PASS**
- Dependency gate: **PASS**
- Gate A / curriculum: **PASS / frozen**
- Gate B / activities: **PASS / frozen and unchanged**
- Implementation: **PENDING fresh affected-path conformance**
- Deterministic QA: **PENDING**; the prior deterministic QA rerun 2 PASS is historical only because learner-facing production changed
- Historical Simulation A: **FAIL evidence preserved**
- Historical Simulation A rerun: **FAIL evidence preserved**
- Historical Simulation A rerun 2: **FAIL — 0 BLOCKER / 1 MAJOR / 0 MINOR; evidence preserved**
- Simulations B/C: **NOT RUN**
- Release: **LOCKED**
- Book 1 complete: **false**

Repair source:
- `course/book1/lesson15-simulation-a-rerun2-repair-handoff.md`

Frozen references:
- `course/book1/lesson15-activity-spec.md`
- `course/book1/lesson15-unit45-activity-spec.md`
- `course/book1/lesson15-unit46-activity-spec.md`
- `course/book1/lesson15-unit47-activity-spec.md`
- `course/book1/lesson15-unit48-activity-spec.md`

Historical learner evidence:
- `course/book1/lesson15-learner-simulation-a.md`
- `course/book1/lesson15-learner-simulation-a-rerun.md`
- `course/book1/lesson15-learner-simulation-a-rerun2.md`

Repair commits:
- Unit 45 payload restoration: `253cd3ca8e8a9aceab65776dab9b4179dd52c0f6`
- Unit 46 payload restoration: `809c464c6c97718b68c5709c55e7ec8fc6b6b7e2`
- Unit 47 payload restoration: `d59328d1d9a48f5276826d52d030457cad64b207`
- Unit 48 payload restoration: `97249a0e5c9daffee100660bf908ca5411c1c00d`
- Regression guard: `93751de67bb143e7e13185d23a4ee34f0df86f0b`
- Completion-state checkpoint: `477aa8ec6da3e79f8651855fb7cf1fcd2ef32a62`

## Repair applied

Gate B and every frozen activity specification remain unchanged.

The production repair restores the exact frozen learner-facing **prompt / options / answer / explanation** for assessed listening items that had drifted. Existing source-correct `audioText`, lesson/step IDs, source intent, and educational semantics were preserved.

### Unit 45

Restored:
- `u45-doctor-l1`
- `u45-sick-l1`
- `u45-duration-l1`
- `u45-review-l2`

### Unit 46

Restored:
- `u46-ba-l1`
- `u46-rec-l1`
- `u46-visit-l1`

### Unit 47

Restored:
- `u47-what-l1`
- `u47-g3-l1`
- `u47-a005-l1`
- `u47-review-l1`
- `u47-review-l2`
- `u47-review-l3`

### Unit 48

Restored:
- `u48-advice-l1`
- `u48-g4-l1`
- `u48-g5-l1`
- `u48-g6-l1`
- `u48-prescription-l1`
- `u48-review-l1`
- `u48-review-l2`

The minimum handoff list was therefore repaired, and the broader scan found/restored these additional drifted assessed listening payloads:
- `u45-doctor-l1`
- `u46-ba-l1`
- `u47-g3-l1`
- `u48-g5-l1`
- `u48-g6-l1`
- `u48-prescription-l1`
- `u48-review-l1`
- `u48-review-l2`

## Broader assessed-payload scan

Every learner-facing assessed option bank in Units 45–48 was compared against its frozen Unit activity specification.

After the repair:
- no remaining non-designated assessed **prompt/options/answer/audioText** drift was found;
- all repaired listening `audioText` values still match the frozen source-correct audio;
- no substitute distractors were invented;
- no frozen lesson or step IDs were changed.

The five designated semantic-listening repairs were explicitly excluded from replacement and remain intact:
- `u46-review-l1` — answer `must/have to`, `semanticAnswer: true`
- `u46-review-l3` — answer `去買房子`, `semanticAnswer: true`
- `u47-stomach-l1` — answer `stomach discomfort and repeated vomiting`, `semanticAnswer: true`
- `u48-g7-l1` — answer `separable-verb duration + degree comparison`, `semanticAnswer: true`
- `u48-review-l3` — answer `separable duration + much-better comparison`, `semanticAnswer: true`

## Deterministic regression protection

`validation/validator.test.mjs` now contains a narrow Lesson-15 regression test that pins all 20 repaired listening payloads to their frozen learner-safe:
- `audioText`
- prompt
- options
- answer
- explanation

This guard is intentionally scoped to the affected assessed listening payloads. It does **not** ban Chinese distractors globally and does not weaken the existing semantic-listening validation or any other test.

## Narrow repair-context verification already performed

Content-level checks in the repair context passed for:
- all 20 repaired listening payloads against the frozen Unit 45–48 specs;
- zero remaining non-designated assessed prompt/options/answer/audioText drift in the broader Unit 45–48 scan;
- preservation of the five `semanticAnswer: true` listening repairs;
- `u46-ji-explain` still preceding `u46-ji-s1`;
- learner-facing 幾 expansion example `她沒有幾個朋友。` and the only-a-few interpretation;
- A003 support/source strings `一日4次`, `3日份`, `份`, `飯前`, `飯後`, `飯後30分鐘`, and `健康診所`;
- `u48-prescription-support` and `u48-prescription-visual` remaining `practice:false`;
- all three A002 source visual scenes still present: restroom, bed, throat;
- support-only `您` and `好的，謝謝您。`.

These are narrow repair checks only. **No full deterministic QA was run or claimed in this repair context.**

## Required fresh affected-path conformance

Independently compare current production against the unchanged frozen Gate-B activity specifications. Do not accept this handoff as proof.

### 1. Repaired assessed payloads

For every repaired ID listed above:
- verify prompt/options/answer/explanation exactly match the frozen Unit spec;
- verify `audioText` remains source-correct and unchanged;
- verify the semantic correct answer did not change;
- verify no future Lesson-15 target is exposed before its teaching point;
- verify no later-owned formal NEW character appears learner-visibly before its lifecycle.

### 2. Broader no-future-target condition

Re-scan **every learner-facing assessed option/distractor across Units 45–48**, not only the 20 repaired IDs.

Reject any assessed option that prematurely exposes:
- later-unit canonical NEW vocabulary;
- a later-owned formal NEW character;
- later grammar/support before explanation;
- unsupported/deferred glyphs as assessed learner-readable material.

Do not reject Chinese merely for being Chinese. Previously taught/frozen-safe Chinese options are valid.

### 3. Protected semantic listening

Reconfirm unchanged:
- `u46-review-l1`
- `u46-review-l3`
- `u47-stomach-l1`
- `u48-g7-l1`
- `u48-review-l3`

Each must retain its intended `semanticAnswer: true` behavior and educational semantics.

### 4. 幾 expansion path

Reconfirm:
- `u46-ji-explain` precedes `u46-ji-s1`;
- 幾 is explicitly taught as **a few / several** in statement/non-question use;
- the earlier Unit-7 **how many?** sense is contrasted;
- canonical ownership remains Unit 7;
- no duplicate Search/Mega/handwriting ownership is created;
- Unit-47 `好幾次` depends on the Unit-46 expansion.

### 5. A003 repair/isolation

Reconfirm:
- `一日4次`
- `3日份`
- support-only `份 fèn`
- `飯前`
- `飯後`
- `飯後30分鐘`
- contextual/glossed/non-assessed `健康診所`
- deferred `診`
- answers exactly `四次` / `飯後30分鐘` / `十二包`
- `practice:false` isolation
- 份 / 診 remain outside canonical vocabulary, characters, Search, Mega, productive phrase practice, and handwriting.

### 6. A002 visuals and 您

Reconfirm:
- three distinct source-faithful A002 scenes/roles remain intact;
- shared source suggestion bank remains intact;
- support-only `您` / `好的，謝謝您。` remain learner-visible but non-canonical.

### 7. Ownership / characters / handwriting

Reconfirm:
- 42 canonical NEW lexical forms;
- exactly the frozen 幾 / 跟 semantic expansion model;
- 30 NEW formal characters;
- seven grammar rules;
- all 30 handwriting lifecycles and locks;
- no premature formal character exposure was introduced by assessed distractors.

### 8. Sequence / source / review / closure

Reconfirm:
- prerequisite direction and explain-before-test;
- all 25 dialogue turns;
- A001–A005;
- review floors;
- delayed retrieval;
- Search/Mega behavior;
- Unit-48 cumulative closure;
- 一直 / 直 canonical first-ownership migration to Book 1 Unit 45;
- Book-2 Unit-1 saved-progress IDs/order remain valid and review-only for migrated ownership.

## Narrow technical verification in conformance context

Run the affected-path Unit 45–48 structural/validation checks appropriate to this conformance stage. Confirm the new regression guard is syntactically valid and passes.

Do **not** count this as the full deterministic suite. Full deterministic QA remains the next separate stage only after conformance passes.

## Conformance output/state

Persist:
- `course/book1/lesson15-simulation-a-rerun2-repair-conformance.md`

If and only if fresh affected-path conformance genuinely passes with **0 BLOCKER / 0 MAJOR**:
- set implementation gate back to **PASS**;
- keep deterministic QA **pending**;
- advance only to deterministic-QA rerun readiness;
- prepare the next deterministic-QA handoff;
- preserve all three historical Simulation-A failure reports;
- do not rerun Simulation A in the conformance context;
- keep release locked.

If any BLOCKER or MAJOR remains:
- keep implementation pending;
- reopen only the smallest affected implementation area;
- do not weaken Gate B.

## Stop condition

Stop after the fresh affected-path conformance report/state/handoff update.

Do **not**:
- run full deterministic QA in the conformance context;
- rerun Simulation A;
- run Simulations B/C;
- perform traceability or hostile release audit;
- pass Gate C;
- merge;
- publish/deploy;
- mark Book 1 complete.
