# Book 1 Lesson 15 — Deterministic QA Rerun Handoff

Working repository: `Weather-Mister/hanzi-steps`  
Working draft PR: **#69**  
Working branch: `book1-lesson15-source-a`

Current checkpoint: **Stage 6 deterministic QA rerun required after SIM-A-01 learner-facing repair conformance PASS**.

## Gate state

- Source gate: **PASS**
- Dependency gate: **PASS**
- Gate A / curriculum: **PASS / frozen**
- Gate B / activities: **PASS / frozen**
- Implementation gate: **PASS**
- Fresh affected-path conformance: **PASS — 0 BLOCKER / 0 MAJOR / 0 MINOR**
- Deterministic QA: **PENDING RERUN**
- Simulation A: historical **FAIL**, not rerun after repair
- Simulations B/C: **NOT RUN**
- Release: **LOCKED**
- Book 1 complete: **false**

Authoritative new conformance evidence:

- `course/book1/lesson15-simulation-a-repair-conformance.md`

Historical deterministic evidence:

- `course/book1/lesson15-deterministic-qa.md`
- historical final authored PASS head: `b6fd19faff87bfe42e075cc94d95a7b1241b68f9`
- historical generated-only follow-up: `73ac28d0f09595bff45836dcea9351beb7a4c222`

The historical PASS is **not sufficient** after the learner-facing Unit-48 change. Require a complete deterministic suite on the current repaired authored head.

## Repair that invalidated the historical deterministic PASS

The narrow SIM-A-01 repair changed only the learner-facing phrase payloads for:

- `u48-prescription-support`
- `u48-prescription-visual`

It restored:

- **一日4次**
- **3日份**
- support-only **份 fèn**
- **飯前**
- **飯後**
- **飯後30分鐘**
- contextual/glossed/non-assessed **健康診所** with **診** deferred

Both records use `tokens: []` to stay visible in the lesson while opting out of productive phrase practice. A003 assessed answers remain **四次 / 飯後30分鐘 / 十二包**.

Fresh implementation conformance has already passed. Do not redesign or reopen Gate B during the QA rerun unless a deterministic failure proves a real semantic implementation defect.

## Required reading

Read:

1. `automation/book1/PROTOCOL.md`, Stage 6.
2. `ADDING_A_UNIT.md` deterministic/local/remote QA guidance.
3. `course/book1/completion.json`.
4. `course/book1/lesson15-simulation-a-repair-conformance.md`.
5. `course/book1/lesson15-deterministic-qa.md` as historical evidence only.
6. current PR #69 head and current GitHub Feature QA workflow configuration.
7. the Unit-48 repair diff and generated artifacts only as needed to adjudicate failures.

## Mandatory rerun

Require the complete deterministic suite after the final authored code change, including:

1. dependency install / repository setup;
2. traditional stroke-source hydration where used by the workflow;
3. `npm run course:generate`;
4. `npm run course:check`;
5. targeted validators/tests for Units **45, 46, 47, 48** and Book-2 Unit 1 migration;
6. `npm run check:characters`;
7. vocabulary lookup / Pinyin Search tests;
8. Mega Challenge tests;
9. practice-engine and practice-content regression tests;
10. full validation suite;
11. TypeScript: `npx tsc --noEmit`;
12. GitHub Pages build: `npm run build:pages`;
13. unit-number uniqueness;
14. source/concept/stable-ID integrity;
15. canonical ownership integrity;
16. prerequisite direction;
17. review coverage;
18. Search coverage;
19. Mega coverage;
20. A002 visual regression guards;
21. all five semantic-listening guards;
22. support-only 您 guard;
23. A003 repaired source-notation support and practice isolation;
24. `一直 / 直` migration integrity;
25. generated curriculum artifacts current and committed.

Specifically confirm the final generated/practice state does not accidentally promote **份** or **診** into canonical vocabulary, characters, Search, Mega, productive phrase practice, or handwriting.

## Workflow handling

Use the repository's supported Feature QA workflow if local shell execution is unavailable.

Inspect the exact run on the final authored head. If generation pushes a generated-only follow-up commit, distinguish:

1. the final authored head that ran the complete suite;
2. the generated-only follow-up head;
3. any expected bot-recursion/action-required state from an actual failed deterministic job.

Do not treat a partial, cancelled, superseded, or pre-repair run as PASS evidence.

## Failure handling

If any check fails:

- inspect the exact failing job/step/log;
- repair only the smallest real deterministic defect;
- do not weaken validators or tests to force green;
- regenerate artifacts when required;
- rerun the complete required suite after the final authored repair.

If a proposed fix changes learner-facing Chinese, frozen answer semantics, ownership, prerequisites, A002 visual meaning, semantic listening, support-only 您/份/診 behavior, handwriting lifecycle, or the A003 source notation, stop and reopen the smallest appropriate implementation-conformance/upstream area instead of silently changing frozen semantics.

## Required rerun output

Persist a fresh rerun record:

- `course/book1/lesson15-deterministic-qa-rerun.md`

Record:

- final authored head tested;
- workflow name/run number/run id/final conclusion;
- any generated-artifact follow-up commit;
- every mandatory check and result;
- any repair made during rerun;
- final BLOCKER / MAJOR / MINOR counts;
- overall PASS / FAIL.

Do not overwrite the historical `lesson15-deterministic-qa.md`; it documents the earlier pre-SIM-A-01-repair deterministic pass.

## State transition on genuine rerun PASS

Only if the complete current-head suite passes:

- mark deterministic QA rerun PASS in completion state;
- advance back to **Stage 7 learner-simulation readiness**;
- keep release locked;
- prepare a learner-simulation handoff that explicitly requires **Simulation A to be rerun from scratch first** before B/C;
- keep the historical Simulation-A failure artifact as evidence rather than deleting it.

## Stop condition

Stop after deterministic QA rerun evidence/state/handoff preparation.

Do **not** in the QA-rerun context:

- rerun Simulation A;
- run Simulations B/C;
- perform traceability/release audit;
- pass Gate C;
- merge;
- publish/deploy;
- mark Book 1 complete.
