# Book 1 Lesson 15 — Deterministic QA Rerun 2 Handoff

Working repository: `Weather-Mister/hanzi-steps`  
Working draft PR: **#69**  
Working branch: `book1-lesson15-source-a`

Current checkpoint: **Stage 6 deterministic QA rerun required after SIM-A-RERUN-01 learner-facing 幾 repair conformance PASS**.

## Gate state

- Source gate: **PASS**
- Dependency gate: **PASS**
- Gate A / curriculum: **PASS / frozen**
- Gate B / activities: **PASS / frozen**
- Implementation gate: **PASS**
- Fresh affected-path conformance after 幾 repair: **PASS — 0 BLOCKER / 0 MAJOR / 0 MINOR**
- Deterministic QA: **PENDING RERUN**
- Historical Simulation A: **FAIL evidence preserved**
- Historical Simulation A rerun: **FAIL — 0 BLOCKER / 1 MAJOR / 0 MINOR**, not rerun after this repair
- Simulations B/C: **NOT RUN**
- Release: **LOCKED**
- Book 1 complete: **false**

Authoritative new conformance evidence:
- `course/book1/lesson15-simulation-a-rerun-repair-conformance.md`

Historical deterministic evidence:
- `course/book1/lesson15-deterministic-qa.md`
- `course/book1/lesson15-deterministic-qa-rerun.md`

Those historical PASS records are not sufficient after the latest learner-facing Unit-46 change.

## Latest repair that invalidated the prior deterministic PASS

The narrow SIM-A-RERUN-01 repair changed the learner-facing `u46-ji-explain` path so that it now points to the dedicated phrase record `u46-ji-expansion`.

The learner now sees, before `u46-ji-s1`:

- **幾 jǐ**
- earlier Unit-7 sense: **how many?**
- Lesson-15 expansion: **a few / several**
- statement/non-question framing
- source-safe example **她沒有幾個朋友。**
- intended interpretation: **she does not have many / has only a few friends**

Canonical 幾 ownership remains Unit 7; Unit 46 adds only the semantic expansion.

## Important recent workflow evidence

Affected-path conformance inspected Feature QA run:

- run **#631**
- id **36230154732**
- learner-facing repair head: `d4d5b4cd9f7a09082305c2644a556dc83bb2a315`

Run #631 showed:
- curriculum generation: PASS
- curriculum graph validation: PASS
- targeted changed-unit tests: PASS
- character coverage: PASS
- regression suite: FAIL only because the temporary completion state stored `openFindings[0]` as a string instead of the required finding object
- TypeScript / Pages build were skipped after that failure

The conformance/state transition normalized `openFindings` back to `[]` and restored implementation PASS.

Current PR head at this handoff's preparation is later than the learner-facing repair head and contains report/state artifacts. A workflow on a bot/report-only follow-up may be `action_required` with zero jobs. Do not treat that as deterministic PASS or failure. Require a complete executable deterministic run against the current repaired state.

## Required reading

Read:

1. `automation/book1/PROTOCOL.md`, Stage 6.
2. `ADDING_A_UNIT.md` deterministic/local/remote QA guidance.
3. `course/book1/completion.json`.
4. `course/book1/lesson15-simulation-a-rerun-repair-conformance.md`.
5. historical deterministic records only as comparison evidence.
6. current PR #69 head and Feature QA workflow/run history.
7. the Unit-46 repair diff and generated artifacts only as needed to adjudicate failures.

Do not redesign curriculum during deterministic QA.

## Mandatory complete rerun

Require the full deterministic suite after the final learner-facing code change, including:

1. dependency install / repository setup;
2. traditional stroke-source hydration where used;
3. `npm run course:generate`;
4. `npm run course:check`;
5. targeted validators/tests for Units **45, 46, 47, 48** and Book-2 Unit-1 migration;
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
20. A002 source-visual guards;
21. all five semantic-listening guards;
22. support-only 您 guard;
23. repaired A003 notation + `practice:false` isolation;
24. repaired `u46-ji-explain` explain-before-test path;
25. canonical 幾 ownership remains Unit 7 with no duplicate Search/Mega/handwriting ownership;
26. Unit-47 `好幾次` dependency remains valid after the Unit-46 explanation repair;
27. 一直 / 直 migration integrity;
28. generated curriculum artifacts current and committed;
29. completion-state schema validity.

## Failure handling

If any deterministic check fails:

- inspect the exact failing job/step/log;
- repair only the smallest real deterministic defect;
- do not weaken validators/tests to force green;
- regenerate artifacts if required;
- rerun the complete suite after the final authored fix.

If a proposed fix changes learner-facing Chinese, frozen semantics, ownership, prerequisites, A002 visual meaning, semantic listening, support-only 您/份/診 behavior, A003 notation, handwriting lifecycle, or the 幾 semantic expansion itself, stop and reopen the smallest affected implementation-conformance/upstream area rather than silently altering frozen behavior.

## Required output

Persist a new record:

- `course/book1/lesson15-deterministic-qa-rerun2.md`

Record:
- final authored head tested;
- workflow name / run number / run id / final conclusion;
- generated-only follow-up commit if any;
- every mandatory check and result;
- any repair made during this rerun;
- final BLOCKER / MAJOR / MINOR counts;
- overall PASS / FAIL.

Do not overwrite earlier deterministic records.

## State transition on genuine PASS

Only if the complete current repaired suite passes:

- mark deterministic QA rerun 2 PASS;
- advance back to Stage 7 learner-simulation readiness;
- keep release locked;
- prepare:
  - `course/book1/lesson15-learner-simulation-rerun2-handoff.md`
- require **Simulation A to be rerun from scratch again** against the latest repaired implementation before B/C;
- preserve both earlier Simulation-A failure artifacts as historical evidence.

## Stop condition

Stop after deterministic-QA rerun 2 evidence/state/handoff preparation.

Do **not**:
- rerun Simulation A in the QA context;
- run Simulations B/C;
- perform traceability or hostile release audit;
- pass Gate C;
- merge;
- publish/deploy;
- mark Book 1 complete.
