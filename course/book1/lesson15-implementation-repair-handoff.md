# Book 1 Lesson 15 — Implementation Repair Handoff

Working repository: `Weather-Mister/hanzi-steps`  
Working draft PR: **#69**  
Working branch: `book1-lesson15-source-a`

Current checkpoint: **Stage 5 implementation repair after failed conformance audit**.

## Gate state

- Source gate: **PASS**
- Dependency gate: **PASS**
- Gate A / curriculum: **PASS / frozen**
- Gate B / activities: **PASS / frozen**
- Implementation gate: **PENDING**
- Release gate: **LOCKED**
- Deterministic QA: **NOT READY**

The first implementation-conformance audit is persisted at:

- `course/book1/lesson15-implementation-conformance-audit.md`

Verdict: **FAIL**

Open findings:
- **IC-01 BLOCKER** — Unit 48 A002 exact source illustrations are missing as learner-facing visual inputs.
- **IC-02 MAJOR** — five R1 listening representations materially narrow the frozen semantic distinctions.
- **IC-03 MAJOR** — Unit 46 D1T12 honorific support changes 您 / 好的，謝謝您。 into a nonconformant representation.

Do not reopen Gate A or Gate B unless the repair proves the frozen requirement itself impossible or internally inconsistent. The audit already determined the smallest expected blast radius is implementation/schema.

## Required reading

Read:

1. `automation/book1/PROTOCOL.md`, especially Stage 5 and conformance requirements.
2. `ADDING_A_UNIT.md`.
3. Frozen `course/book1/lesson15-curriculum-blueprint.md`.
4. Frozen `course/book1/lesson15-activity-spec.md`.
5. Frozen unit specs:
   - `course/book1/lesson15-unit45-activity-spec.md`
   - `course/book1/lesson15-unit46-activity-spec.md`
   - `course/book1/lesson15-unit47-activity-spec.md`
   - `course/book1/lesson15-unit48-activity-spec.md`
6. `course/book1/lesson15-implementation-conformance-audit.md`.
7. Actual implementation `course/book1/unit45.ts` through `unit48.ts`.
8. `course/schema.ts`, learner-facing renderers/components, validators, and tests only as needed to implement the smallest compliant representation.
9. The authoritative Lesson-15 textbook pages for A002's three source illustrations when implementing IC-01.
10. `course/book1/completion.json`.

Treat the frozen Gate-B packet as normative. Do not weaken a frozen requirement merely to fit the current schema.

## Repair IC-01 — A002 visual source inputs

The frozen A002 requirement is not satisfied by text labels such as “Source illustration 1”.

Repair so the learner actually receives the three exact source illustrations from the source task, or a formally source-faithful visual representation that preserves the same source symptom/advice mapping.

Requirements:
- all three source visual prompts are learner-facing;
- prompt 1 remains an acceptance role;
- prompt 2 remains an acceptance role;
- prompt 3 remains a polite-rejection role;
- no invented replacement symptom mapping;
- deferred-glyph safety remains intact;
- do not promote source-only names/glyphs into vocabulary, Search, Mega, or handwriting ownership.

If the existing `Step` / `UnitData` schema lacks an image asset field, extend the schema/rendering path minimally and safely rather than deleting the visual requirement.

Use repository-owned/local assets appropriate for production. Preserve source attribution/provenance where required by the project.

## Repair IC-02 — R1 listening semantic fidelity

Repair the following exact frozen listening targets so they test the frozen semantic distinction rather than a narrowed surface-string match:

1. `u46-review-l1`
   - Must assess the heard 得 as **modal děi = must/have to**, contrasted against complement 得 and “obtain/get”.
2. `u46-review-l3`
   - Must assess which candidate is **NOT part of the complete three-part advice**, not merely match one positive chunk.
3. `u47-stomach-l1`
   - Must assess both problems together: **stomach discomfort + repeated vomiting**.
4. `u48-g7-l1`
   - Must assess the combined **G007 separable-duration + G006 degree-comparison** content.
5. `u48-review-l3`
   - Must again assess the combined cumulative separable-duration + “much better” comparison distinction.

The Chinese audio sentence itself may remain unchanged if correct.

Do not accept the old workaround merely because the current `listen` validator expects an answer literally present in `audioText`. Use the smallest implementation/schema representation that preserves the frozen educational objective. This may require a narrowly scoped schema/renderer/validator enhancement for semantic listening choices.

Keep all frozen step IDs stable.

## Repair IC-03 — D1T12 honorific support

Restore:
- `u46-honorific-nin` learner-facing text: **您**
- pinyin: **nín**
- meaning: **polite “you”**
- `u46-thanks-nin`: **好的，謝謝您。**

Requirements:
- 您 remains support-only;
- no canonical `newVocabulary` ownership;
- no Search/Mega ownership;
- no handwriting ownership;
- preserve the source honorific register;
- keep all frozen IDs stable.

## Regression constraints

Do not regress already-passing areas:
- 42 canonical NEW lexical forms;
- exactly two semantic expansions: 幾 and 跟;
- 30 NEW formal characters;
- 7 grammar rules;
- 一直 / 直 first ownership in Book 1 Unit 45;
- Book-2 Unit-1 saved-progress IDs/order;
- prerequisite direction;
- explain-before-test;
- handwriting locks;
- review floors;
- delayed retrieval;
- A001/A003/A004/A005;
- Search/Mega ownership;
- Unit-48 cumulative closure.

## Required verification during repair

Run the narrow checks necessary for any schema/renderer change and the changed units. Do not weaken tests or validators.

At minimum verify:
- TypeScript/schema validity;
- affected Unit 46/47/48 structure;
- visual rendering path for A002;
- listening payload validation for the five repaired R1 items;
- support-only 您 remains absent from canonical ownership;
- 一直 / 直 migration remains intact.

Full deterministic QA remains a later protocol stage and must not be declared complete here.

## Required output

After repairs:

1. Persist all implementation/schema/assets/tests needed to resolve IC-01, IC-02, IC-03.
2. Update `course/book1/completion.json`:
   - remain at Stage 5 implementation;
   - clear findings only if actually repaired;
   - keep implementation gate pending;
   - keep release locked.
3. Prepare:
   - `course/book1/lesson15-implementation-conformance-reaudit-handoff.md`
4. The re-audit handoff must instruct a fresh/independent comparison of the repaired production implementation against the unchanged frozen Gate-B packet, with explicit re-checks of IC-01/02/03 and regression checks of the previously passing conformance areas.

## Stop condition

Stop after repairs and the conformance re-audit handoff are persisted.

Do **not**:
- perform the re-audit in the repair context;
- advance to deterministic QA;
- run learner simulations;
- run traceability/release audit;
- pass Gate C;
- merge PR #69;
- publish/deploy;
- mark Book 1 complete.
