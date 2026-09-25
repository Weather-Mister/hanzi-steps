# Book 1 Lesson 14 — FR-001 fresh Activity Audit 2 handoff

PR: **#68**
Branch: `book1-lesson14-source-a`

## Why this fresh audit is required

Stage 9 hostile release audit found one real BLOCKER:

**FR-001 — B1L14-A001 The Four Seasons was modeled but never actually assigned as the source-required personal learner transfer.**

Gate A remains valid. Gate B is reopened at the activity layer.

The repaired candidate changes Unit 42 only:
- `u42-home-country-model` now contains an explicit learner-facing source-transfer instruction requiring the learner to:
  1. describe their **own home-country/place climate** in Chinese;
  2. name their **personally most-liked and least-liked seasons**;
  3. give **their own reason** using 因為…所以…;
  4. say it aloud or write it on paper rather than merely copying the fixed model.
- `u42-season-reason` explicitly reminds the learner that the fixed spring sentence is only a scaffold.
- `u42-seasons` now states that fixed-model recognition/order activities do not satisfy A001 on the learner's behalf.

No implementation file has been changed yet. Implementation is intentionally locked until Gate B re-freezes.

Same-context companion audits:
- `course/book1/lesson14-activity-teaching-quality-reaudit4.md` — PASS
- `course/book1/lesson14-activity-cross-unit-reaudit4.md` — PASS

Do not read those two reports before completing your own independent audit.

## Mandatory fresh audit

Use a new ChatGPT context.

Read:
- `automation/book1/PROTOCOL.md`, Stage 4 / Gate B;
- authoritative Lesson 14 source as needed for A001;
- `course/book1/lesson14-source-ledger.md`;
- `course/book1/lesson14-dependency-ledger.md`;
- frozen `course/book1/lesson14-curriculum-blueprint.md`;
- current repaired:
  - `course/book1/lesson14-activity-spec.md`
  - `course/book1/lesson14-unit42-activity-spec.md`
  - Unit 43/44 activity specs for cross-unit checks;
- `ADDING_A_UNIT.md`;
- targeted prior-unit/index evidence only where needed.

Do **not** read:
- the Stage-9 hostile audit verdict;
- earlier Activity Audit verdicts/re-audits;
- learner simulation verdicts;
- `lesson14-activity-teaching-quality-reaudit4.md`;
- `lesson14-activity-cross-unit-reaudit4.md`
until your independent question audit is complete.

Do not compare to current Unit-42 TypeScript before reaching the activity verdict; implementation is deliberately stale/locked.

## Attack the repaired A001 task

Verify independently that:
- the learner is actually instructed to perform A001, not merely recognize a model;
- the instruction covers **all** source-required components:
  - own home-country/place climate;
  - personally most-liked season;
  - personally least-liked season;
  - personal reason;
- 因為…所以… is available before the task;
- the task does not require untaught vocabulary/characters or force a specific country/climate;
- the fixed model cannot be mistaken as the learner's required answer;
- the instruction is on a learner-visible phrase-card field under the current product contract;
- A001 and A005 remain distinct;
- no new Gate-A curriculum decision has been smuggled into the repair.

Also rerun the normal Activity Audit 2 adversarial checks across Units 42–44:
- one defensible key;
- no future prerequisites;
- no broken listening/order payload;
- Traditional Chinese / pinyin correctness;
- explain-before-test;
- Search/Mega/practice timing contracts.

## Verdict and persistence

Return BLOCKER / MAJOR / MINOR and PASS/FAIL.

PASS requires zero open BLOCKER and zero open MAJOR.

If defects exist, repair only the activity layer unless Gate A truly needs reopening, then re-audit.

Persist as:
`course/book1/lesson14-activity-question-reaudit4.md`

After reaching the independent verdict, read the two re-audit4 companion reports.

If and only if:
- Gate A still PASS;
- Teaching Quality re-audit4 PASS;
- fresh Activity Audit 2 re-audit4 PASS;
- Cross-Unit re-audit4 PASS;
- zero open BLOCKER/MAJOR;

then update `course/book1/completion.json`:
- `artifacts.frozenActivitySpec = "course/book1/lesson14-activity-spec.md"`
- `artifacts.activityQuestionAudit = "course/book1/lesson14-activity-question-reaudit4.md"`
- `gates.activities = "pass"`
- `gates.implementation = "pending"`
- `currentStage = "implementation"`
- `stageStatus = "pending"`
- `humanReviewRequired = false`
- clear FR-001 from `openFindings`;
- record the re-audit4 artifact paths.

Then stop.

Do not edit Unit 42/43/44 TypeScript, runtime code, generated artifacts, traceability, or release files in the fresh audit context.
