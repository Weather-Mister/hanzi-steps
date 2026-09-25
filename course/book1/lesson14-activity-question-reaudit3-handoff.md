# Book 1 Lesson 14 — Final prerequisite repair Activity Audit 2 handoff

PR: **#68**
Branch: `book1-lesson14-source-a`

## Why Gate B is reopened

Final Learner Simulation A found two BLOCKER prerequisite defects:

1. `u43-a002-s2` used future NEW vocabulary `明年` before its owning lesson.
2. the general unit character-library/detail route could launch standalone `practice-<character>` before the character's first teaching lesson, bypassing the same prerequisite boundary already enforced in Pinyin Search.

The activity candidate is repaired:
- `u43-a002-s2` now uses `你在臺灣住了半年嗎？` as its third distractor.
- the master activity spec now requires **every** standalone handwriting-practice entry point to remain locked until the character's first non-review teaching lesson is complete.

No Gate-A curriculum ownership or unit boundary changed.

Same-context repaired audits:
- `course/book1/lesson14-activity-teaching-quality-reaudit3.md` — PASS
- `course/book1/lesson14-activity-cross-unit-reaudit3.md` — PASS

Do not read those verdicts before completing your independent audit.

## Mandatory fresh audit

Use a new ChatGPT context.

Read:
- `automation/book1/PROTOCOL.md`, Stage 4 / Gate B;
- source ledger;
- dependency ledger;
- frozen Gate-A curriculum blueprint;
- current repaired `lesson14-activity-spec.md`;
- current Unit 42/43/44 activity specs;
- `ADDING_A_UNIT.md`;
- `course/index.json` and targeted prior-unit files only when necessary.

Do **not** read:
- previous Activity Audit 2 reports;
- learner Simulation A/B/C reports;
- re-audit3 Teaching Quality or Cross-Unit reports
until your own independent question audit is complete.

Audit every learner-facing question and prerequisite edge, with special attention to:
- `u43-a002-s2`: no future NEW vocabulary/character/grammar in any option;
- whether `你在臺灣住了半年嗎？` is grammatical, natural, and clearly not a valid answer to “how long?”;
- all other Unit-43 distractors for later Lesson-14 NEW material;
- all Unit-42/44 assessment prerequisite boundaries;
- the new global handwriting-practice rule: it must be coherent with Gate A, Search visibility, character ownership, unit exploration, and the existing lifecycle;
- the rule must gate **practice action**, not globally hide canonical Search results or alter curriculum ownership;
- no activity-level repair may silently move a Gate-A boundary.

Return BLOCKER / MAJOR / MINOR and PASS/FAIL. PASS requires zero open BLOCKER and zero open MAJOR.

If defects are found, repair only the activity layer unless Gate A truly needs reopening, then re-audit.

Persist the report as:
`course/book1/lesson14-activity-question-reaudit3.md`

After your independent verdict, you may read:
- `lesson14-activity-teaching-quality-reaudit3.md`
- `lesson14-activity-cross-unit-reaudit3.md`

If and only if all three Activity audits PASS with zero open BLOCKER/MAJOR and Gate A remains PASS, update `course/book1/completion.json`:
- `gates.activities = "pass"`
- `gates.implementation = "pending"`
- `artifacts.frozenActivitySpec = "course/book1/lesson14-activity-spec.md"`
- `artifacts.activityQuestionAudit = "course/book1/lesson14-activity-question-reaudit3.md"`
- `currentStage = "implementation"`
- `stageStatus = "pending"`
- `humanReviewRequired = false`

Record the re-audit3 artifact paths and stop.

Do not edit implementation files in this fresh audit context.
