# Book 1 Lesson 14 — FR-001 learner-simulation rerun handoff

PR: **#68**
Branch: `book1-lesson14-source-a`

Current final learner-facing repair:
- Gate B: PASS after re-audit4
- implementation conformance: PASS
- deterministic QA: PASS on Feature QA #496
- release: LOCKED

The only learner-facing change after the previous final simulations is the FR-001 repair in Unit 42:
- `u42-home-country-model.note` now explicitly assigns B1L14-A001 as a personal transfer;
- `u42-season-reason.note` reinforces that the fixed spring sentence is only a scaffold.

Because this changes learner-visible instruction, Stage 7 must be rerun in **three separate fresh contexts**.

Do not read either of the other FR-001 rerun reports before completing your own simulation.

---

## Simulation A — strict prerequisite learner

Persist as:
`course/book1/lesson14-learner-simulation-a-final3.md`

Prompt:

> Use PR #68 and `course/book1/lesson14-learner-simulation-rerun3-handoff.md`. Perform final-rerun-3 Simulation A — strict prerequisite learner. Simulate Units 42→43→44 sequentially from the Unit-41 boundary, with special attention to whether the repaired A001 personal transfer asks only for language genuinely available at that point. Persist the report exactly as instructed and stop.

Mandatory checks:
- `u42-home-country-model` visibly assigns the learner their own climate task;
- the task asks for own climate, own most-liked season, own least-liked season, and own reason;
- all language needed for the task is available before `u42-seasons`;
- the learner is not forced to know an untaught country/place name;
- the instruction permits safe personal wording and does not require copying the model;
- A001 does not accidentally depend on Unit 43/44 material;
- previous prerequisite repairs remain intact:
  - no future 明年 in `u43-a002-s2`;
  - no early standalone handwriting;
  - G001→G002, 快/要→G003, G004→G005;
  - repaired cross-unit order targets remain taught earlier.

Return BLOCKER / MAJOR / MINOR and PASS/FAIL. PASS requires zero open BLOCKER/MAJOR.

---

## Simulation B — adversarial test taker

Persist as:
`course/book1/lesson14-learner-simulation-b-final3.md`

Prompt:

> Use PR #68 and `course/book1/lesson14-learner-simulation-rerun3-handoff.md`. Perform final-rerun-3 Simulation B — adversarial test taker. Attack all learner-facing Unit 42–44 activity payloads and especially the repaired A001 instruction for ambiguity, hidden requirements, misleading model behavior, unsupported production, or UI invisibility. Persist the report exactly as instructed and stop.

Mandatory checks:
- the A001 instruction is actually learner-visible through the phrase card;
- it cannot reasonably be read as “copy this model”;
- it covers both most-liked **and** least-liked seasons plus a reason;
- A001 is distinct from A005;
- the fixed model selections/order are correctly treated as controlled practice, not as the personal transfer itself;
- all existing select/listen/order/match correctness still holds;
- Unit-44 review remains 41;
- final capstone remains Chinese construction.

Return BLOCKER / MAJOR / MINOR and PASS/FAIL. PASS requires zero open BLOCKER/MAJOR.

---

## Simulation C — cumulative learner

Persist as:
`course/book1/lesson14-learner-simulation-c-final3.md`

Prompt:

> Use PR #68 and `course/book1/lesson14-learner-simulation-rerun3-handoff.md`. Perform final-rerun-3 Simulation C — cumulative learner. Complete Units 42→43→44 and evaluate whether the repaired A001 personal transfer meaningfully contributes to later F002 retention while all prior cumulative practice, Search, handwriting, Mega/adaptive, delayed retrieval, and capstone behavior remains intact. Persist the report exactly as instructed and stop.

Mandatory checks:
- A001 is genuinely performed in Unit 42 rather than only recognized;
- Unit-44 F002 capstone is delayed retrieval, not the first actual A001 production;
- A005 remains separately assigned;
- all 30 canonical NEW forms / 21 NEW characters / five grammar systems remain intact;
- delayed Unit-43 retrieval remains intact;
- Search remains global while writing is first-teaching gated;
- final capstone still covers all four Lesson-14 outcomes.

Return BLOCKER / MAJOR / MINOR and PASS/FAIL. PASS requires zero open BLOCKER/MAJOR.

---

## After all three

Return to the main development context with `done continue`.

The main context must verify all three final3 reports on the current PR history. Only if all three genuinely PASS may it rebuild Stage 8 traceability and then create a **new** Stage-9 hostile release audit handoff.
