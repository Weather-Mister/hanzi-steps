# Book 1 Lesson 14 — Final hostile release audit rerun handoff

PR: **#68**
Branch: `book1-lesson14-source-a`

This is the mandatory **Stage 9 fresh-context hostile release audit rerun** after the FR-001 repair.

## Current release-candidate status

- source gate: PASS
- dependency gate: PASS
- Gate A: PASS
- Gate B: PASS after fresh re-audit4
- implementation conformance: PASS
- deterministic QA: PASS on Feature QA #496
- final-rerun-3 learner Simulation A: PASS
- final-rerun-3 learner Simulation B: PASS
- final-rerun-3 learner Simulation C: PASS
- rebuilt Stage-8 traceability: PASS
- release: LOCKED

The previous hostile release audit is historical failure evidence only. It found FR-001. Do not reuse its verdict.

## Fresh-context rule

Use a brand-new ChatGPT context.

Before reaching your own verdict, do **not** read:
- the previous `course/book1/lesson14-final-release-audit.md`;
- prior Activity Audit verdicts;
- prior implementation-conformance verdicts;
- earlier learner-simulation reports before final3;
- PR discussion.

## Read

1. `automation/book1/PROTOCOL.md` — Stage 9 / Gate C.
2. Authoritative Book 1 Lesson 14 source, printed pp. 299–321 / PDF pp. 326–348.
3. `course/book1/lesson14-source-ledger.md`
4. `course/book1/lesson14-dependency-ledger.md`
5. `course/book1/lesson14-curriculum-blueprint.md`
6. Current frozen activity packet:
   - `course/book1/lesson14-activity-spec.md`
   - `course/book1/lesson14-unit42-activity-spec.md`
   - `course/book1/lesson14-unit43-activity-spec.md`
   - `course/book1/lesson14-unit44-activity-spec.md`
7. Actual production:
   - `course/book1/unit42.ts`
   - `course/book1/unit43.ts`
   - `course/book1/unit44.ts`
   - relevant runtime/Search/practice code as needed
8. `course/book1/lesson14-deterministic-qa.md`
9. Final-rerun-3 learner reports:
   - `course/book1/lesson14-learner-simulation-a-final3.md`
   - `course/book1/lesson14-learner-simulation-b-final3.md`
   - `course/book1/lesson14-learner-simulation-c-final3.md`
10. `course/book1/lesson14-traceability.md`
11. `course/book1/completion.json`

## Attack surface

Assume a subtle release blocker remains and try to prove it.

Recheck the full release, including:
- source omissions/distortions;
- NEW / EXPANSION / DEFERRED ownership;
- hidden/future prerequisites;
- grammar sequencing/restrictions;
- dialogue adaptations;
- activity fidelity;
- answer correctness;
- listening audibility;
- order-token/reference correctness;
- Traditional Chinese / pinyin;
- handwriting geometry/ownership;
- Search / Mega / adaptive / standalone-practice gating;
- generated index/registry consistency;
- stale QA or stale learner-simulation applicability;
- traceability claims;
- culture framing;
- migration/progress compatibility;
- release/build/runtime risks.

### Mandatory FR-001 retest

Independently verify that B1L14-A001 is now genuinely assigned to the learner in actual production.

Specifically confirm:
- `u42-home-country-model.note` is learner-visible in the phrase renderer;
- it explicitly asks for the learner's **own** home-country/place climate;
- it explicitly asks for the learner's **own most-liked and least-liked seasons**;
- it explicitly requires the learner's **own reason** using 因為…所以…;
- it allows a personal spoken/written response rather than forcing an untaught proper name;
- it clearly marks the fixed sentence as a model rather than the required personal answer;
- `u42-season-reason.note` reinforces that the fixed spring answer is only a scaffold;
- A005 remains a separate source-transfer task;
- the Unit-44 F002 capstone is delayed retrieval, not the first actual A001 production.

Also recheck the prior prerequisite repairs:
- no premature 明年 in Unit 43 A002;
- no standalone character-practice bypass;
- Search remains globally visible;
- writing remains first-teaching gated;
- Unit-44 cross-unit order targets were taught earlier.

## Required output

Return:
- BLOCKER
- MAJOR
- MINOR
- PASS or FAIL

PASS requires zero open BLOCKER and zero open MAJOR.

If you find a BLOCKER or MAJOR:
- persist it;
- reopen the smallest affected upstream gate in `completion.json`;
- keep release locked;
- do not merge/publish;
- stop.

If the hostile audit genuinely passes:
- persist as:
  `course/book1/lesson14-final-release-audit-rerun.md`
- update `course/book1/completion.json`:
  - `artifacts.releaseReport = "course/book1/lesson14-final-release-audit-rerun.md"`
  - `currentStage = "gate-c"`
  - `stageStatus = "pending"`
  - keep `gates.release = "locked"`
  - keep `humanReviewRequired = false`
  - record zero open BLOCKER/MAJOR
- **do not merge or publish**
- stop.

Gate C is finalized only in the main development context after this independent report is verified.
