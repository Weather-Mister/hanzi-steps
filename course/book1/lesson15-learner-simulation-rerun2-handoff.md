# Book 1 Lesson 15 — Learner Simulation Rerun 2 Handoff

Working repository: `Weather-Mister/hanzi-steps`  
Working PR: **#69**  
Working branch: `book1-lesson15-source-a`

Current checkpoint: **Stage 7 learner-simulation readiness after deterministic QA rerun 2 PASS**.

## Upstream state

- Source gate: **PASS**
- Dependency gate: **PASS**
- Gate A / curriculum: **PASS / frozen**
- Gate B / activities: **PASS / frozen**
- Implementation gate: **PASS**
- Fresh affected-path conformance after SIM-A-RERUN-01 幾 repair: **PASS — 0 BLOCKER / 0 MAJOR / 0 MINOR**
- Deterministic QA rerun 2: **PASS — 0 BLOCKER / 0 MAJOR / 0 MINOR**
- final authored QA head: `686ea019eef9d4147dce410bad407fa31872666b`
- Feature QA: **#636 / id 36233164058 / SUCCESS**
- full regression result: **199 tests / 198 pass / 0 fail / 1 intentional skip**
- TypeScript: **PASS**
- Pages build: **PASS**
- generated artifacts: **already current; no generated-only follow-up commit**
- Historical Simulation A: **FAIL evidence retained**
- Historical Simulation A rerun: **FAIL — 0 BLOCKER / 1 MAJOR / 0 MINOR evidence retained**
- Simulation A rerun 2: **REQUIRED FROM SCRATCH**
- Simulations B/C: **NOT RUN**
- Release: **LOCKED**
- Book 1 complete: **false**

Authoritative latest evidence:

- `course/book1/lesson15-simulation-a-rerun-repair-conformance.md`
- `course/book1/lesson15-deterministic-qa-rerun2.md`

## Mandatory ordering and independence

**Run Simulation A from scratch again first. Do not run Simulation B or C until this fresh Simulation-A rerun 2 genuinely PASSes with 0 BLOCKER and 0 MAJOR.**

Preserve both earlier failure artifacts unchanged:

- `course/book1/lesson15-learner-simulation-a.md`
- `course/book1/lesson15-learner-simulation-a-rerun.md`

For independence, the fresh simulator must **not read either earlier Simulation-A report before completing its own rerun**. It may read the current repair conformance and deterministic-QA-rerun-2 records because those define the current repaired state.

Persist the new independent result as:

- `course/book1/lesson15-learner-simulation-a-rerun2.md`

## Simulation A rerun 2 — strict prerequisite learner

Fresh-chat prompt:

> Use PR #69 and `course/book1/lesson15-learner-simulation-rerun2-handoff.md`. Perform **Lesson 15 Stage 7 — Simulation A rerun 2: strict prerequisite learner** exactly as instructed.
>
> Rerun Simulation A **from scratch** against the latest repaired implementation. Assume the learner knows **exactly Book 1 through Unit 44 and nothing from Units 45–48 or Book 2** before starting.
>
> Do **not** read `course/book1/lesson15-learner-simulation-a.md` or `course/book1/lesson15-learner-simulation-a-rerun.md` before completing the independent rerun. Both are historical failure evidence and must remain unchanged.
>
> Read:
> - `automation/book1/PROTOCOL.md`, Stage 7;
> - `course/book1/lesson15-curriculum-blueprint.md`;
> - frozen `course/book1/lesson15-activity-spec.md`;
> - frozen Unit 45, 46, 47 and 48 activity-spec files;
> - `course/book1/lesson15-simulation-a-rerun-repair-conformance.md`;
> - `course/book1/lesson15-deterministic-qa-rerun2.md`;
> - actual `course/book1/unit45.ts`, `unit46.ts`, `unit47.ts`, `unit48.ts`;
> - current `course/index.json`;
> - targeted earlier-unit files only when necessary to prove whether something was genuinely known by Unit 44.
>
> Simulate Units **45 → 46 → 47 → 48** in order and aggressively check hidden prerequisites, vocabulary/characters/grammar before explanation, support-only material becoming productive, handwriting timing, prerequisite direction, A001–A005, A002 visual roles, semantic listening, review floors, delayed retrieval, Search/Mega implications, and Unit-48 cumulative closure.
>
> **Explicitly retest the repaired Unit-46 幾 path before any Unit-47 use:**
> - `u46-ji-explain` must occur before `u46-ji-s1`;
> - it must explicitly teach **幾 jǐ** as the Lesson-15 semantic expansion **“a few / several”** in a statement/non-question context;
> - it must contrast the earlier Unit-7 interrogative **“how many?”** sense;
> - it must visibly teach **她沒有幾個朋友。** with the intended **does not have many / has only a few friends** interpretation;
> - `u46-ji-s1` must assess only after that explanation;
> - canonical 幾 vocabulary/character ownership must remain **Unit 7**;
> - no duplicate Search/Mega/handwriting ownership may appear;
> - Unit-47 **好幾次** must now have a genuinely taught prerequisite and must retrieve the **a few/several** sense rather than introduce it cold.
>
> **Explicitly retest the repaired A003 path:**
> - `u48-prescription-support` teaches **一日4次**, **3日份**, support-only **份 fèn**, **飯前**, **飯後**, and **飯後30分鐘** before assessment;
> - `u48-prescription-visual` visibly preserves **健康診所**, **一日4次**, **3日份**, **飯後**, and **飯後30分鐘**;
> - **健康診所** remains contextual/glossed/non-assessed and **診** deferred;
> - **份** and **診** remain outside canonical vocabulary/character ownership, Pinyin Search, Mega, productive phrase practice, and handwriting;
> - A003 answers remain exactly **四次**, **飯後30分鐘**, **十二包**.
>
> Also reconfirm:
> - all **42** canonical NEW lexical forms;
> - the **幾 / 跟** expansion model without re-ownership;
> - all **30** NEW formal characters;
> - all seven grammar rules;
> - prerequisites and explain-before-test;
> - all 30 handwriting lifecycles/locks;
> - all 25 dialogue turns;
> - A001/A002/A004/A005;
> - A002's three distinct source visual roles and shared suggestion bank;
> - all five semantic-listening repairs;
> - support-only **您** / **好的，謝謝您。**;
> - review floors and delayed retrieval;
> - Search/Mega behavior;
> - Unit-48 cumulative closure;
> - the **一直 / 直** migration without a Book-2 prerequisite.
>
> Return BLOCKER / MAJOR / MINOR findings and PASS/FAIL. PASS requires **0 open BLOCKER and 0 open MAJOR**.
>
> Persist only `course/book1/lesson15-learner-simulation-a-rerun2.md` on PR #69 and stop.
>
> Do not repair implementation, do not run Simulation B/C, and do not perform traceability, hostile release audit, Gate C, merge, publish, deploy, or Book-1 completion.

## After Simulation A rerun 2

If and only if the fresh Simulation-A rerun 2 genuinely PASSes:

1. return to a fresh controller context;
2. preserve both historical failure artifacts and the new rerun-2 report;
3. prepare/run Simulation B in a separate fresh context;
4. then prepare/run Simulation C in a separate fresh context.

If the fresh Simulation-A rerun 2 finds any BLOCKER or MAJOR, reopen only the smallest affected upstream gate. Do not proceed to B/C.

## Stop condition

This handoff authorizes **Simulation A rerun 2 only** as the next action.
