# Book 1 Lesson 15 — Implementation Handoff

Working repository: `Weather-Mister/hanzi-steps`  
Working draft PR: **#69**  
Working branch: `book1-lesson15-source-a`  
Published Book-1 endpoint before Lesson 15: Unit 44

Current checkpoint: **Stage 5 — Implementation**.

## Gate state

- Source gate: **PASS**
- Dependency gate: **PASS**
- Gate A / curriculum: **PASS / frozen**
- Gate B / activities: **PASS / frozen**
- Implementation gate: **PENDING**
- Release gate: **LOCKED**

Frozen architecture: **Units 45–48**.

Frozen normative activity packet:
- `course/book1/lesson15-activity-spec.md`
- `course/book1/lesson15-unit45-activity-spec.md`
- `course/book1/lesson15-unit46-activity-spec.md`
- `course/book1/lesson15-unit47-activity-spec.md`
- `course/book1/lesson15-unit48-activity-spec.md`

All three activity audits separately PASS with 0 open BLOCKER / 0 open MAJOR.

## Required reading

Read:
1. `automation/book1/PROTOCOL.md`, especially Stage 5 and the downstream Stage 6 requirements.
2. `ADDING_A_UNIT.md`.
3. frozen `course/book1/lesson15-curriculum-blueprint.md`.
4. frozen overall and unit-specific Lesson-15 activity specs listed above.
5. `course/book1/lesson15-dependency-ledger.md`.
6. `course/book1/completion.json`.
7. `course/index.json`.
8. `course/schema.ts`.
9. The immediately preceding production unit(s) only as implementation-pattern references when necessary.
10. Existing Book-2 Unit-1 ownership declarations only where required for the explicit 一直 / 直 migration.

Do not redesign the curriculum or invent activity content. Implementation should be faithful transcription of the frozen packet.

## Mandatory implementation task

Implement **Book 1 Units 45, 46, 47, and 48** exactly from the frozen activity specification.

Create/update the normal production artifacts required by `ADDING_A_UNIT.md`, including:
- `course/book1/unit45.ts`
- `course/book1/unit46.ts`
- `course/book1/unit47.ts`
- `course/book1/unit48.ts`
- the matching `unit45.strokes.json` through `unit48.strokes.json`
- `course/manifest.json`
- generated curriculum artifacts via the repository generator
- any minimal ownership/provenance integration required by the frozen specification.

Do not hand-edit generated outputs where the repository requires generation.

## Non-negotiable frozen behavior

Preserve exactly:
- six teaching lessons + one review per unit;
- stable lesson/step IDs from the frozen activity specs;
- all canonical NEW vocabulary ownership;
- only the two semantic expansions 幾 and 跟, with earlier canonical Search/Mega ownership preserved;
- exactly 30 NEW formal characters across Units 45–48;
- exactly 7 formal grammar rules;
- explain-before-test;
- handwriting first-teaching locks;
- Search/Mega ownership rules;
- all source-dialogue coverage and adaptations;
- A001–A005 source-task behavior;
- deferred/support-glyph safety;
- review floors;
- delayed retrieval and Unit-48 cumulative closure;
- source-era framing for culture content.

No implementation convenience may silently change these contracts.

## Required ownership migration

This implementation must explicitly resolve the frozen first-ownership migration for:

- `一直`
- `直`

At the Unit-44 baseline they are NEW in Lesson 15 / Unit 45.

The current later Book-2 Unit-1 declaration must therefore become REVIEW/non-first-ownership as appropriate under the existing product model. Book 2 must not remain the canonical first owner.

Make the smallest repository-consistent change necessary. Do not broaden the migration into an unrelated Book-2 refactor.

## Conformance rule

If the production schema cannot represent an exact frozen activity payload without changing its educational meaning, do **not** silently improvise.

Instead:
- document the implementation constraint;
- make the smallest semantics-preserving representation if one clearly exists;
- otherwise stop and mark the issue for the implementation-conformance audit / upstream reopening.

Any change to frozen source ownership, curriculum boundaries, prerequisite topology, or activity semantics reopens the affected gate.

## Deterministic work during implementation

Use the supported repository workflow from `ADDING_A_UNIT.md`.

When local shell execution is available, run generation and the relevant checks while implementing. At minimum after the final code change the repository must be positioned for Stage 6 deterministic QA.

Do not weaken validators/tests to force a pass.

## Required output before stopping

After implementing Units 45–48:

1. Persist all production implementation changes on PR #69.
2. Generate required derived curriculum artifacts.
3. Update `course/book1/completion.json` to the **implementation-conformance-audit checkpoint**.
4. Keep implementation gate **pending** until conformance is independently verified.
5. Keep release **locked**.
6. Prepare:
   - `course/book1/lesson15-implementation-conformance-audit-handoff.md`
7. Record any documented implementation deviations explicitly. The expected count is zero.

## Stop condition

Stop after implementation is complete and the implementation-conformance audit handoff is persisted.

Do **not**:
- perform the implementation-conformance audit in the implementation context;
- declare implementation PASS before conformance review;
- run learner simulations;
- pass release Gate C;
- merge PR #69;
- publish/deploy;
- mark Book 1 complete.

The final whole-Book-1 audit remains mandatory after Lesson 15 is released.
