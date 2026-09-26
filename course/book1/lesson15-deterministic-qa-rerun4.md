# Book 1 Lesson 15 — Deterministic QA Rerun 4

Working repository: `Weather-Mister/hanzi-steps`  
Working PR: **#69**  
Branch: `book1-lesson15-source-a`

## Verdict

**PASS — 0 BLOCKER / 0 MAJOR / 0 MINOR**

This rerun validates the repairs for the two findings from the final strict-prerequisite Simulation A.

## Final authored code/test head

- `d1cd8a436e17aa9bb9124b44293542c7476ec6b1`
- Feature QA **#665**
- run id **36239036536**
- conclusion: **SUCCESS**

Full regression result:
- **201 tests**
- **200 pass**
- **0 fail**
- **1 intentional skip**

Also PASS:
- dependency install
- Traditional stroke hydration
- curriculum generation
- curriculum graph validation
- targeted Unit 45–48 and Book-2 Unit-1 tests
- character coverage
- TypeScript
- GitHub Pages build
- completion-state schema

## Final Simulation-A fixes

### SIM-A-FINAL-01

Unit-45 `u45-review-f1` no longer exposes future NEW vocabulary `回家`.

The corrected, re-frozen payload is:
- `哪裡不舒服？`
- `大概多久了？`
- `什麼東西都不想吃？`

Correct answer remains `哪裡不舒服？`.

### SIM-A-FINAL-02

Unit-47 G003 sequencing is now:

1. `u47-g3-review` → prerequisite review only
2. `u47-vle-jiu` → formal G003 teaching
3. `u47-g3-s1`–`u47-g3-s4`
4. `u47-g3-p1` → full D2T02 source line
5. `u47-g3-s5`
6. `u47-g3-l1`
7. `u47-g3-p2` → exact phrase needed for the final order task
8. `u47-g3-o1`

The full `吃了東西就吐` source integration is therefore withheld until after G003 teaching, and the order target is explicitly taught before ordering.

## Deterministic follow-up defect fixed during this rerun

The first final-head QA attempt correctly caught:
- `u47-g3-o1: phrase not taught`

That was caused by moving the old pre-order phrase card to the required full D2T02 slot.

The smallest repair added `u47-g3-p2` immediately before the order task and re-froze the Unit-47 activity spec accordingly. The regression guard now asserts this ordering.

## Regression guard

The named final Lesson-15 guard verifies:
- `回家` is absent from `u45-review-f1`;
- corrected Unit-45 options are exact;
- prerequisite review precedes G003;
- full D2T02 appears only after controlled G003 teaching;
- exact order target is taught before `u47-g3-o1`;
- the full D2T02 source sentence remains unchanged.

## Previously repaired paths

The complete suite continues to pass the existing Lesson-15 guards for:
- 20 learner-safe listening payloads;
- five protected semantic-listening items;
- A002 visuals;
- Unit-46 幾 explain-before-test path and Unit-7 ownership;
- Unit-47 好幾次 prerequisite;
- A003 source notation and support isolation;
- support-only 您;
- Search/Mega ownership;
- character coverage/handwriting;
- 一直 / 直 migration.

## Generated follow-up

Feature QA #665 pushed generated-only commit:
- `f946e01a6e75ff20dc65963e5f1c2744eb41cfca`
- message: **Generate curriculum artifacts**
- changed only `course/registry.generated.ts` by the generated representation of the repaired curriculum

Follow-up Feature QA #666 is `action_required` with no executable QA job, the expected bot-recursion/permission state and not a failing test run.

## Stage exit

Deterministic QA rerun 4: **PASS**.

Next:
- run a fresh strict-prerequisite Simulation A again;
- if it PASSes, run Simulation B and C in separate fresh contexts, in parallel;
- release remains locked until Stage 8+ completes;
- Book 1 remains incomplete.
