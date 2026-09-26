# Book 1 Lesson 15 — Simulation A Rerun 2 Repair Conformance

Working repository: `Weather-Mister/hanzi-steps`  
Working PR: **#69**  
Working branch: `book1-lesson15-source-a`

## Verdict

**PASS — 0 BLOCKER / 0 MAJOR / 0 MINOR**

The SIM-A-RERUN2-01 cross-unit assessment-distractor repair conforms to the unchanged frozen Gate-B activity specifications. The implementation gate may return to **PASS**. Deterministic QA remains pending until a complete workflow run passes on the final authored state.

## Conformance evidence

The repair restored the exact frozen learner-facing listening payloads for 20 drifted assessed items across Units 45–48. For each repaired item, the current production payload is pinned by `validation/validator.test.mjs` to the frozen:
- `audioText`
- prompt
- options
- answer
- explanation

The pinned IDs are:

### Unit 45
- `u45-doctor-l1`
- `u45-sick-l1`
- `u45-duration-l1`
- `u45-review-l2`

### Unit 46
- `u46-ba-l1`
- `u46-rec-l1`
- `u46-visit-l1`

### Unit 47
- `u47-what-l1`
- `u47-g3-l1`
- `u47-a005-l1`
- `u47-review-l1`
- `u47-review-l2`
- `u47-review-l3`

### Unit 48
- `u48-advice-l1`
- `u48-g4-l1`
- `u48-g5-l1`
- `u48-g6-l1`
- `u48-prescription-l1`
- `u48-review-l1`
- `u48-review-l2`

The broader repair scan compared every learner-facing assessed option bank in Units 45–48 against its frozen Unit activity specification and found no remaining non-designated assessed prompt/options/answer/audioText drift.

## Semantic-listening metadata correction

After restoring the frozen semantic English distractors, Feature QA #649 correctly rejected the restored listening items because contextual audio with semantic choices requires explicit `semanticAnswer: true`.

A narrow non-learner-facing metadata correction therefore added `semanticAnswer: true` to the 20 restored listening items. This does not change their prompt, options, answer, explanation, audioText, source intent, or educational semantics. It only tells the validator that the correct choice is semantic rather than a literal audio substring.

Feature QA #652 then passed:
- dependency install
- stroke hydration
- curriculum generation
- curriculum graph validation
- targeted changed-unit tests
- character coverage
- all Lesson-15 frozen-payload guards
- A002 visual guards
- 幾 repair guard
- A003 isolation guard
- protected semantic-listening guards

Its regression phase found only one controller-state defect: `currentStage: "implementation-conformance"` is not a valid controller stage. That state label is corrected separately to the valid `deterministic-qa` stage for the final deterministic rerun. The learner-facing repair itself had no failing assertion.

## Strict-prerequisite conformance

The repaired distractors no longer require a learner to read later Lesson-15 canonical vocabulary or later formal NEW characters before their teaching point.

The repaired payloads use the exact frozen semantic alternatives where the frozen packet designed them that way. No substitute distractors were invented and Chinese distractors that are already known/frozen-safe were not globally prohibited.

## Protected repairs remain intact

The following previously repaired paths remain conformant:

- five designated semantic listening items:
  - `u46-review-l1`
  - `u46-review-l3`
  - `u47-stomach-l1`
  - `u48-g7-l1`
  - `u48-review-l3`
- `u46-ji-explain` before `u46-ji-s1`;
- 幾 Lesson-15 “a few / several” expansion with canonical ownership remaining Unit 7;
- Unit-47 `好幾次` as downstream retrieval;
- A003 source notation and `practice:false` isolation;
- A002 three distinct source-faithful visual roles and shared suggestion bank;
- support-only 您 / 好的，謝謝您。;
- 42 canonical NEW lexical forms;
- 幾 / 跟 expansion model;
- 30 NEW formal characters and handwriting lifecycles/locks;
- seven grammar rules;
- all 25 source dialogue turns;
- A001–A005;
- review floors and delayed retrieval;
- Search/Mega ownership behavior;
- Unit-48 cumulative closure;
- 一直 / 直 first ownership in Book-1 Unit 45 and Book-2 Unit-1 review-only migration.

## Gate decision

Implementation conformance: **PASS**

- BLOCKER: 0
- MAJOR: 0
- MINOR: 0

Next stage: **complete deterministic QA rerun on the final authored state**.

Release remains locked. Simulations B/C have not run. Book 1 remains incomplete.
