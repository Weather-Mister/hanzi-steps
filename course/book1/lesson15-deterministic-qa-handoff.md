# Book 1 Lesson 15 — Stage 6 Deterministic QA Handoff

Working repository: `Weather-Mister/hanzi-steps`  
Working draft PR: **#69**  
Working branch: `book1-lesson15-source-a`

Current checkpoint: **Stage 6 — Deterministic QA**.

## Gate state

- Source gate: **PASS**
- Dependency gate: **PASS**
- Gate A / curriculum: **PASS / frozen**
- Gate B / activities: **PASS / frozen**
- Implementation gate: **PASS**
- Deterministic QA: **PENDING**
- Release gate: **LOCKED**
- Book 1 complete: **false**

Final implementation-conformance evidence:
- `course/book1/lesson15-implementation-conformance-reaudit2.md`
- verdict: **PASS**
- open BLOCKER: **0**
- open MAJOR: **0**
- open MINOR: **0**

The repaired implementation is now authorized for deterministic QA.

## Current PR head and CI

At handoff creation, PR #69 head is:

- `2b815fe6bd5db73b48f854f5d9543d63d26b571f`

GitHub Actions Feature QA run:
- run number: **#612**
- run id: **36220445206**
- status at handoff creation: **in_progress**

Do not assume the run passes merely because it started. Inspect the final conclusion and all required jobs/steps.

If the workflow creates a generated-artifact follow-up commit, identify:
1. the final authored implementation head that actually ran the full QA suite;
2. the generated-only follow-up head, if any;
3. whether any follow-up `action_required` / skipped recursion state is the repository's expected bot-recursion behavior rather than a failed test run.

## Required reading

Read:

1. `automation/book1/PROTOCOL.md`, especially Stage 6.
2. `ADDING_A_UNIT.md`, especially the local/manual and remote/autonomous QA paths.
3. `course/book1/completion.json`.
4. `course/book1/lesson15-implementation-conformance-reaudit2.md`.
5. Changed production files for Units 45–48, the narrow schema/renderer/validator changes, and the 一直 / 直 Book-2 migration only as needed to interpret QA failures.
6. PR #69 current head, workflow run(s), jobs, and logs.

Do not redesign curriculum during deterministic QA.

## Mandatory deterministic checks

The final implementation must pass the repository's complete quality system after the final authored code change.

Verify all required Stage-6 checks, including:

1. dependency install / repository setup;
2. traditional stroke-source hydration, where the workflow uses it;
3. `npm run course:generate`;
4. `npm run course:check`;
5. targeted tests for **each changed unit**:
   - Unit 45
   - Unit 46
   - Unit 47
   - Unit 48
6. `npm run check:characters`;
7. vocabulary lookup tests;
8. Mega Challenge tests;
9. practice engine/content tests;
10. the full relevant validation/regression suite;
11. `npx tsc --noEmit`;
12. `npm run build:pages`;
13. unit-number uniqueness;
14. source/concept ID integrity;
15. canonical ownership integrity;
16. prerequisite direction;
17. review coverage;
18. Search coverage;
19. Mega coverage;
20. 一直 / 直 migration integrity;
21. generated curriculum artifacts are current and committed.

Use the existing Feature QA workflow as the supported remote execution path when local shell execution is unavailable.

## Failure handling

If any deterministic check fails:

- inspect the exact failing job/step/log;
- repair the smallest real deterministic defect on the same PR branch;
- do not weaken validators or tests merely to force green;
- regenerate artifacts when required;
- run/re-run the affected checks and then require the final authored head to have a complete successful deterministic suite.

If a proposed fix changes learner-facing Chinese, question semantics, frozen activity behavior, ownership, prerequisites, or the A002/semantic-listening/honorific repairs, do **not** silently fix it as a mechanical QA change. Reopen the appropriate implementation-conformance or upstream gate under the protocol.

Mechanical/generated/build fixes that do not alter educational semantics may remain within Stage 6.

## Required deterministic-QA artifact

Persist:

- `course/book1/lesson15-deterministic-qa.md`

Record at minimum:

- final authored implementation head tested;
- any generated-artifact follow-up commit;
- workflow name, run number, run id, and final conclusion;
- every mandatory check and PASS/FAIL result;
- any fixes made during Stage 6;
- final open BLOCKER / MAJOR / MINOR counts;
- overall PASS / FAIL.

PASS requires the complete deterministic suite to be green after the final code change.

## State transition on PASS

Only if deterministic QA genuinely passes:

- set Stage 6 deterministic QA to PASS in the completion state;
- advance to **Stage 7 learner simulation readiness**;
- keep release locked;
- prepare:
  - `course/book1/lesson15-learner-simulation-handoff.md`

The simulation handoff must specify three independent fresh-context simulations:
- Simulation A — strict prerequisite learner;
- Simulation B — adversarial test taker;
- Simulation C — cumulative learner.

Do not perform those simulations in the deterministic-QA context.

## Stop condition

Stop after:
- deterministic QA is genuinely complete;
- `lesson15-deterministic-qa.md` is persisted;
- completion state is updated;
- the learner-simulation handoff is prepared on PASS.

Do **not**:
- run learner simulations in this context;
- build traceability;
- run hostile release audit;
- pass Gate C;
- merge PR #69;
- publish/deploy;
- mark Book 1 complete.

The final whole-Book-1 audit remains mandatory after Lesson 15 release.
