# Book 1 Lesson 15 — Implementation Conformance Re-audit Handoff

Working repository: `Weather-Mister/hanzi-steps`  
Working draft PR: **#69**  
Working branch: `book1-lesson15-source-a`

Current checkpoint: **Implementation Conformance Re-audit — READY after Stage-5 repair**.

## Gate state

- Source gate: **PASS**
- Dependency gate: **PASS**
- Gate A / curriculum: **PASS / frozen**
- Gate B / activities: **PASS / frozen**
- Implementation gate: **PENDING**
- Release gate: **LOCKED**
- Deterministic QA: **NOT STARTED in this repair context**

Frozen architecture remains **Units 45–48**. The frozen Gate-B packet was not changed.

## Required independent reading

Read, in this order:

1. `automation/book1/PROTOCOL.md`, especially Stage 5 / implementation conformance.
2. `ADDING_A_UNIT.md`.
3. Frozen `course/book1/lesson15-curriculum-blueprint.md`.
4. Frozen `course/book1/lesson15-activity-spec.md`.
5. Frozen unit activity specs for Units 45–48.
6. `course/book1/lesson15-implementation-conformance-audit.md` only to identify the three failed findings that must be rechecked.
7. Repaired production:
   - `course/book1/unit45.ts`
   - `course/book1/unit46.ts`
   - `course/book1/unit47.ts`
   - `course/book1/unit48.ts`
   - matching stroke files
   - `course/schema.ts`
   - `components/learning-app.tsx`
   - `app/globals.css`
   - `validation/validate.mjs`
   - `validation/validator.test.mjs`
8. `course/book1/completion.json`.
9. The narrow Book-2 Unit-1 ownership-migration files when checking 一直 / 直.

Do not change the frozen activity requirements merely to make production pass.

## Repair summary to verify independently

### IC-01 — A002 learner-facing source visual inputs

The former text-only phrase placeholders for:
- `u48-a002-visual-1`
- `u48-a002-visual-2`
- `u48-a002-visual-3`

were replaced with a dedicated learner-facing `visual` step path.

The new runtime path:
- renders an actual visual role card rather than the string “Source illustration N”;
- preserves the source role shells **老李 / 小陳 / 王先生**;
- preserves prompt 1 acceptance ending **好的。**;
- preserves prompt 2 acceptance ending **謝謝你。**;
- preserves prompt 3 polite-rejection opening **謝謝你的關心。** with the completion left open;
- shows the source suggestion inventory **看病 / 多休息 / 早一點睡覺 / 多喝水**;
- keeps source-only names contextual;
- does not introduce a fixed invented symptom/advice mapping;
- does not promote deferred/source-only glyphs into vocabulary, Search, Mega, or handwriting ownership.

No external bitmap/image asset was added; the repair uses a structured source-role visual representation in the learner renderer. Re-audit whether that representation is semantically faithful to the frozen A002 visual-input requirement rather than silently accepting it.

### IC-02 — semantic listening fidelity

A narrowly scoped `semanticAnswer: true` listening representation was added to the schema/validator/renderer. It allows a listening answer to test the heard semantic distinction without requiring the English answer string to appear literally in the Chinese `audioText`.

Recheck these exact IDs against the frozen spec:

1. `u46-review-l1`
   - answer: **must/have to**
   - contrast: modal 得 vs complement 得 vs obtain/get.
2. `u46-review-l3`
   - asks which candidate is **NOT** part of the complete advice.
3. `u47-stomach-l1`
   - answer: **stomach discomfort and repeated vomiting**.
4. `u48-g7-l1`
   - answer: **separable-verb duration + degree comparison**.
5. `u48-review-l3`
   - answer: **separable duration + much-better comparison**.

The Chinese audio sentences remain unchanged. Verify that the repaired learner-facing prompt/options genuinely restore the frozen semantic distinctions and that the validator relaxation is limited to explicitly marked listening items.

### IC-03 — support-only 您

Recheck:
- `u46-honorific-nin` text = **您**
- pinyin = **nín**
- meaning = **polite “you”**
- `u46-thanks-nin` text = **好的，謝謝您。**

Also verify 您 remains absent from:
- canonical `newVocabulary`;
- canonical NEW character ownership;
- Search ownership;
- Mega ownership;
- handwriting ownership.

## Regression checks

Reconfirm all areas that passed the first conformance audit:

- every frozen lesson/step ID remains stable;
- 42 canonical NEW lexical forms;
- exactly two semantic expansions: 幾 and 跟;
- 30 NEW formal characters;
- seven frozen grammar rules;
- prerequisite direction;
- explain-before-test sequencing;
- handwriting lifecycle and standalone locks;
- all 25 dialogue turns;
- A001/A003/A004/A005 source tasks;
- Unit review floors;
- delayed retrieval;
- Search/Mega behavior;
- Unit-48 cumulative closure;
- 一直 / 直 canonical first ownership in Book-1 Unit 45;
- Book-2 Unit-1 saved-progress IDs/order unchanged;
- Book 2 is not a prerequisite for Book 1.

## Verdict

Perform a fresh implementation-conformance comparison of the unchanged frozen Gate-B packet against the repaired learner-facing implementation.

Persist:
- `course/book1/lesson15-implementation-conformance-reaudit.md`

PASS requires:
- **0 BLOCKER**
- **0 MAJOR**
- no unexplained frozen-spec divergence.

If and only if the re-audit genuinely passes, update completion state to **deterministic-QA readiness**.

## Stop condition

Stop after the conformance re-audit and state update.

Do **not** in the re-audit context:
- run deterministic QA;
- run learner simulations;
- run traceability or hostile release audit;
- pass Gate C;
- merge PR #69;
- publish/deploy;
- mark Book 1 complete.
