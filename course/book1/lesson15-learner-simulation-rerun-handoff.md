# Book 1 Lesson 15 — Learner Simulation Rerun Handoff

Working repository: `Weather-Mister/hanzi-steps`  
Working PR: **#69**  
Working branch: `book1-lesson15-source-a`

Current checkpoint: **Stage 7 learner-simulation readiness after deterministic QA rerun PASS**.

## Upstream state

- Source gate: **PASS**
- Dependency gate: **PASS**
- Gate A / curriculum: **PASS / frozen**
- Gate B / activities: **PASS / frozen**
- Implementation gate: **PASS**
- SIM-A-01 repair conformance: **PASS — 0 BLOCKER / 0 MAJOR / 0 MINOR**
- Deterministic QA rerun: **PASS**
- final authored QA head: `8868d636607a74571b3d428b4aeeb5e789f45983`
- Feature QA: **#624 / id 36227457460 / SUCCESS**
- generated-only follow-up: `cba5aa8093deb6ebc6655873cb3ef9f667dd78be`
- generated-only follow-up run: **#625 / id 36227952707 / action_required / 0 jobs**
- Historical Simulation A: **FAIL** — retained as evidence, not valid after repair
- Simulation A rerun: **REQUIRED FROM SCRATCH**
- Simulations B/C: **NOT RUN**
- Release: **LOCKED**
- Book 1 complete: **false**

Authoritative deterministic record:

- `course/book1/lesson15-deterministic-qa-rerun.md`

## Mandatory ordering

**Run Simulation A from scratch first. Do not run Simulation B or C until the fresh Simulation-A rerun has genuinely PASSed with 0 BLOCKER and 0 MAJOR.**

The historical failure artifact:

- `course/book1/lesson15-learner-simulation-a.md`

must remain unchanged as historical evidence. The fresh rerun must use a new artifact:

- `course/book1/lesson15-learner-simulation-a-rerun.md`

For independence, the fresh simulator must **not read the historical Simulation-A report before completing its own rerun**. It may read the repair conformance and deterministic-QA-rerun records because those define the current repaired state.

## Simulation A rerun — strict prerequisite learner

Fresh-chat prompt:

> Use PR #69 and `course/book1/lesson15-learner-simulation-rerun-handoff.md`. Perform **Lesson 15 Stage 7 — Simulation A rerun: strict prerequisite learner** exactly as instructed.
>
> Rerun Simulation A **from scratch** against the current repaired implementation. Assume the learner knows **exactly Book 1 through Unit 44 and nothing from Units 45–48 or Book 2** before starting.
>
> Do **not** read `course/book1/lesson15-learner-simulation-a.md` before completing your independent rerun; that is the historical pre-repair failure artifact and must remain unchanged.
>
> Read:
> - `automation/book1/PROTOCOL.md`, Stage 7;
> - `course/book1/lesson15-curriculum-blueprint.md`;
> - frozen `course/book1/lesson15-activity-spec.md`;
> - frozen Unit 45, 46, 47 and 48 activity-spec files;
> - `course/book1/lesson15-simulation-a-repair-conformance.md`;
> - `course/book1/lesson15-deterministic-qa-rerun.md`;
> - actual `course/book1/unit45.ts`, `unit46.ts`, `unit47.ts`, `unit48.ts`;
> - current `course/index.json`;
> - targeted earlier-unit files only when necessary to prove whether something was genuinely known by Unit 44.
>
> Simulate Units **45 → 46 → 47 → 48** in order and aggressively check hidden prerequisites, vocabulary/characters/grammar before explanation, support-only material becoming productive, handwriting timing, prerequisite direction, A001–A005, A002 visual roles, semantic listening, review floors, delayed retrieval, Search/Mega implications, and Unit-48 cumulative closure.
>
> Explicitly re-test the repaired A003 path as a strict Unit-44 learner:
> - `u48-prescription-support` must teach **一日4次**, **3日份**, support-only **份 fèn**, **飯前**, **飯後**, and **飯後30分鐘** before assessment;
> - `u48-prescription-visual` must visibly preserve **健康診所**, **一日4次**, **3日份**, **飯後**, and **飯後30分鐘**;
> - **健康診所** must remain contextual/glossed/non-assessed and **診** deferred;
> - **份** and **診** must remain outside canonical vocabulary/character ownership, Pinyin Search, Mega, productive phrase practice, and handwriting;
> - A003 answers must remain exactly **四次**, **飯後30分鐘**, **十二包**.
>
> Also reconfirm:
> - all **42** canonical NEW lexical forms;
> - `幾` / `跟` expansions without re-ownership;
> - all **30** NEW formal characters;
> - all seven grammar rules;
> - prerequisites and explain-before-test;
> - all 30 handwriting lifecycles/locks;
> - all 25 dialogue turns;
> - A001/A002/A004/A005;
> - all five semantic-listening repairs;
> - support-only `您`;
> - review floors and delayed retrieval;
> - Search/Mega behavior;
> - Unit-48 cumulative closure;
> - the `一直 / 直` migration without a Book-2 prerequisite.
>
> Return BLOCKER / MAJOR / MINOR findings and PASS/FAIL. PASS requires **0 open BLOCKER and 0 open MAJOR**.
>
> Persist only `course/book1/lesson15-learner-simulation-a-rerun.md` on PR #69 and stop.
>
> Do not repair implementation, do not run Simulation B/C, and do not perform traceability, release audit, Gate C, merge, publish, deploy, or Book-1 completion.

## After the Simulation-A rerun

If and only if the fresh Simulation-A rerun genuinely PASSes:

1. return to a fresh controller context;
2. preserve both the historical failure and the new rerun report;
3. prepare/run Simulation B in a separate fresh context;
4. then prepare/run Simulation C in a separate fresh context.

If the fresh Simulation-A rerun finds any BLOCKER or MAJOR, reopen only the smallest affected upstream gate. Do not proceed to B/C.

## Stop condition

This handoff authorizes **Simulation A rerun only** as the next action.
