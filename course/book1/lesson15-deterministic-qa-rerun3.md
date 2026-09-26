# Book 1 Lesson 15 — Deterministic QA Rerun 3

Working repository: `Weather-Mister/hanzi-steps`  
Working PR: **#69**  
Branch: `book1-lesson15-source-a`

## Verdict

**PASS — 0 BLOCKER / 0 MAJOR / 0 MINOR**

This rerun validates the final learner-facing repair for SIM-A-RERUN2-01: the restored learner-safe listening distractors across Units 45–48, plus the required semantic-listening metadata.

## Final authored learner/state head tested

- `579a62bb75ff69acc01a847dfbbf1236eb13309f`
- Feature QA **#654**
- run id **36236868785**
- conclusion: **SUCCESS**

Full regression result:
- **200 tests**
- **199 pass**
- **0 fail**
- **1 intentional skip**

Additional deterministic stages:
- dependency install: PASS
- Traditional stroke hydration: PASS
- curriculum generation: PASS
- curriculum graph validation: PASS
- targeted changed-unit tests: PASS
- character coverage: PASS
- TypeScript `npx tsc --noEmit`: PASS
- GitHub Pages build: PASS
- completion-state schema: PASS

## Repair-loop evidence

### Feature QA #649

The initial exact frozen-payload restoration correctly failed curriculum generation because semantic English listening choices need explicit semantic-listening metadata.

### Metadata repair

The 20 restored listening items were marked `semanticAnswer: true`. This is non-learner-facing validator metadata only; prompt/options/answer/explanation/audioText remained frozen and unchanged.

### Feature QA #652

After the semantic metadata repair:
- generation: PASS
- graph validation: PASS
- targeted unit tests: PASS
- character coverage: PASS
- all Lesson-15 repaired-path guards: PASS

The regression suite then failed only because the temporary controller value `currentStage: "implementation-conformance"` was not a valid state enum. The learner-facing curriculum had no failing assertion.

### State correction and final rerun

The state was advanced to the valid `deterministic-qa` stage. Feature QA #654 then passed the complete suite.

## Frozen-payload protection

The regression suite pins 20 restored learner-safe listening payloads across Units 45–48 to their frozen:
- audioText
- prompt
- options
- answer
- explanation

It also preserves the five designated semantic-listening repairs:
- `u46-review-l1`
- `u46-review-l3`
- `u47-stomach-l1`
- `u48-g7-l1`
- `u48-review-l3`

## Previously repaired paths revalidated

The full suite also passes:
- A002 three distinct source-faithful visuals;
- repaired Unit-46 幾 explain-before-test path;
- canonical 幾 ownership at Unit 7;
- Unit-47 好幾次 dependency;
- repaired A003 source notation;
- `practice:false` isolation for A003 support/source cards;
- support-only 您;
- canonical ownership / Pinyin Search / Mega behavior;
- 30 NEW-character ownership and handwriting coverage;
- 一直 / 直 migration to Book-1 Unit 45;
- Book-2 Unit-1 review-only migration;
- source/concept/stable-ID integrity;
- generated curriculum consistency.

## Generated-only follow-up

Feature QA #654 pushed:
- `8c0f9a7505404dba1e02425f59cac28eabba6feb`
- message: **Generate curriculum artifacts**
- changed only `course/registry.generated.ts`

Follow-up Feature QA **#655** is `action_required` with no executable QA job, the expected bot-recursion/permission state. It is not a deterministic failure.

## Stage exit

Deterministic QA rerun 3: **PASS**.

Authorized next stage:
- Stage 7 learner simulations;
- rerun strict-prerequisite Simulation A from scratch on the latest repaired implementation;
- only if A passes, run B and C in separate fresh contexts;
- release remains locked;
- Book 1 remains incomplete.
