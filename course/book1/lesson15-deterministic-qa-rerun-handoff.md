# Book 1 Lesson 15 — Deterministic QA Rerun Handoff

Working repository: `Weather-Mister/hanzi-steps`  
Working draft PR: **#69**  
Working branch: `book1-lesson15-source-a`

Current checkpoint: **fresh affected-path conformance after SIM-A-RERUN-01 PASSED; Stage 6 deterministic QA must now be rerun on the final authored head**.

## Gate state

- Source gate: **PASS**
- Dependency gate: **PASS**
- Gate A / curriculum: **PASS / frozen**
- Gate B / activities: **PASS / frozen**
- Implementation gate: **PASS**
- Fresh SIM-A-RERUN-01 affected-path conformance: **PASS — 0 BLOCKER / 0 MAJOR / 0 MINOR**
- Deterministic QA: **PENDING RERUN**
- Historical Simulation A: **FAIL evidence preserved**
- Historical Simulation A rerun: **FAIL — 0 BLOCKER / 1 MAJOR / 0 MINOR; not rerun after repair**
- Simulations B/C: **NOT RUN**
- Release: **LOCKED**
- Book 1 complete: **false**

Authoritative new conformance evidence:

- `course/book1/lesson15-simulation-a-rerun-repair-conformance.md`

Historical deterministic evidence remains historical only:

- `course/book1/lesson15-deterministic-qa.md`
- `course/book1/lesson15-deterministic-qa-rerun.md`

Neither historical deterministic PASS is sufficient after the latest learner-facing Unit-46 repair.

## Latest learner-facing repair

Repair commit:

- `29c694c2385be730e11fee2bfbbcf481ca1b11bf`

The unchanged frozen `u46-ji-explain` step now points to dedicated `u46-ji-expansion`, which explicitly teaches:

- **幾 jǐ**
- earlier Unit-7 interrogative **“how many?”**
- Lesson-15 expansion **“a few / several”**
- statement / non-question usage
- **她沒有幾個朋友。**
- interpretation: **she does not have many friends / has only a few friends**

The order remains:

1. `u46-ji-explain`
2. unchanged `u46-ji-s1`
3. formal `u46-noncommittal-question-words` / G001

Canonical ownership remains Unit 7. Unit 46 creates no second canonical vocabulary/Search/Mega-word/handwriting ownership. Unit 47 `好幾次` now has the intended genuinely taught semantic prerequisite.

All previously repaired Lesson-15 paths were spot-checked and remain conformant, including A003 notation/practice isolation, A002 visuals, five semantic-listening repairs, support-only 您, totals/ownership, handwriting, A001–A005, cumulative closure, and the 一直 / 直 migration.

## Pre-rerun workflow evidence — do not mistake for PASS

Feature QA run **#631** / id **36230154732** ran on pre-conformance-state head `d4d5b4cd9f7a09082305c2644a556dc83bb2a315`.

It reached:

- generation: PASS
- curriculum graph validation: PASS
- targeted changed-unit tests: PASS
- character coverage: PASS

It then failed one regression assertion because the temporary completion state represented `openFindings[0]` as a string instead of the controller-required finding object. TypeScript and Pages build were therefore skipped.

The conformance state transition removes that resolved pending note and normalizes `openFindings` to `[]`.

**Run #631 is not final deterministic evidence.** Require a complete fresh run on the final authored head containing the conformance report/state/handoff.

## Required reading

Before rerunning QA, read:

1. `automation/book1/PROTOCOL.md`, Stage 6.
2. `ADDING_A_UNIT.md` deterministic/local/remote QA guidance.
3. `course/book1/completion.json`.
4. `course/book1/lesson15-simulation-a-rerun-repair-conformance.md`.
5. `course/book1/lesson15-deterministic-qa-rerun.md` as historical evidence only.
6. current PR #69 head and Feature QA workflow configuration.
7. the latest Unit-46 repair diff and generated artifacts as needed to adjudicate failures.

## Mandatory full rerun

Require the complete deterministic suite after the final authored state commit, including:

1. dependency install / repository setup;
2. Traditional stroke-source hydration where required;
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
16. prerequisite direction and explain-before-test;
17. review and delayed-retrieval coverage;
18. Search coverage;
19. Mega coverage;
20. A002 visual regression guards;
21. all five semantic-listening guards;
22. support-only 您 guard;
23. A003 repaired source notation and `practice: false` isolation;
24. latest `u46-ji-explain` semantic-expansion guard:
    - 幾 jǐ
    - Unit-7 “how many?” contrast
    - Lesson-15 “a few / several”
    - statement/non-question context
    - 她沒有幾個朋友。 only-a-few interpretation
    - unchanged `u46-ji-s1` immediately after
    - G001 after explanation/recognition
25. Unit-47 `好幾次` dependency on the taught Unit-46 expansion;
26. no duplicate 幾/跟 canonical vocabulary/Search/Mega-word/handwriting ownership;
27. 42 NEW lexical forms, 30 NEW characters, and seven grammar rules;
28. all 25 dialogue turns and A001–A005;
29. review floors, Unit-48 cumulative closure, and handwriting lifecycle/locks;
30. `一直 / 直` Book-1 Unit-45 first-ownership migration and Book-2 Unit-1 review/saved-progress integrity;
31. generated curriculum artifacts current and committed.

Specifically reconfirm that **份** and **診** do not enter canonical vocabulary/characters, Pinyin Search, Mega Challenge vocabulary, productive phrase practice, or handwriting.

## Workflow handling

Use the repository-supported Feature QA workflow if local shell execution is unavailable.

Inspect the exact run on the **final authored head containing this handoff**. Record that exact SHA at QA start.

If generation creates a generated-only follow-up commit, distinguish:

1. final authored head that ran the complete suite;
2. generated-only follow-up head;
3. any expected bot/action-recursion state from an actual failed deterministic job.

Do not treat a partial, cancelled, superseded, pre-repair, or pre-conformance-state run as PASS evidence.

## Failure handling

If any deterministic check fails:

- inspect the exact failing job/step/log;
- repair only the smallest real deterministic defect;
- do not weaken tests or validators;
- regenerate artifacts when required;
- rerun the complete required suite after the final authored repair.

If a proposed fix changes frozen learner-facing Chinese, answer semantics, ownership, prerequisites, A002 visual meaning, semantic listening, support-only 您/份/診 behavior, handwriting lifecycle, A003 source notation, or the repaired 幾 expansion, stop and reopen the smallest appropriate implementation-conformance/upstream area rather than silently changing frozen semantics.

## Required output

Persist a fresh deterministic rerun record:

- `course/book1/lesson15-deterministic-qa-rerun.md`

Record:

- final authored head tested;
- workflow name/run number/run id/final conclusion;
- any generated-only follow-up commit;
- every mandatory check and result;
- any repair made during rerun;
- final BLOCKER / MAJOR / MINOR counts;
- overall PASS / FAIL.

Do not overwrite the historical rationale; update the rerun record with the new current-head evidence.

## State transition on genuine rerun PASS

Only if the complete current-head suite genuinely passes:

- mark deterministic QA rerun PASS in completion state;
- advance to **Stage 7 learner-simulation readiness**;
- keep release locked;
- prepare the next learner-simulation handoff requiring **Simulation A to be rerun from scratch first** before B/C;
- retain both historical Simulation-A failure artifacts.

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
