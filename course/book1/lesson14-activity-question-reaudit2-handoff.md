# Book 1 Lesson 14 — Post-QA fresh Activity Audit 2 handoff

PR: **#68**
Branch: `book1-lesson14-source-a`

## Why this audit is required

After the previous Gate-B re-freeze, deterministic QA correctly failed the global explain-before-order regression test:

`u44-review-u43-1: phrase not taught`

The same structural problem affected several newly introduced delayed-retrieval/capstone alias phrase IDs. The activity packet has been repaired by **reusing already-taught phrase IDs** instead of defining new untaught aliases.

No Gate-A curriculum decision changed.

Current candidate:
- `course/book1/lesson14-activity-spec.md`
- `course/book1/lesson14-unit42-activity-spec.md`
- `course/book1/lesson14-unit43-activity-spec.md`
- `course/book1/lesson14-unit44-activity-spec.md`

Current same-context audits:
- `lesson14-activity-teaching-quality-reaudit2.md` — PASS
- `lesson14-activity-cross-unit-reaudit2.md` — PASS

Do not read those two reports until your independent question audit is complete.

## Fresh audit instructions

Use a new ChatGPT context.

Read:
- `automation/book1/PROTOCOL.md`, Stage 4 / Gate B;
- source ledger;
- dependency ledger;
- frozen Gate-A curriculum blueprint;
- current repaired activity master/unit specs;
- `ADDING_A_UNIT.md`;
- `course/index.json` and targeted prior unit files only as needed.

Do not read prior activity-audit verdicts or learner-simulation reports before completing your own review.

Perform the mandatory fresh-context Activity Audit 2 — Question Correctness / Adversarial Audit.

Audit every learner-facing phrase, grammar card, select, listen, order, match, review, capstone, pinyin line, translation, key, distractor, and prerequisite edge.

Pay special attention to the post-QA repair:
- every order target must have been taught earlier by phrase ID;
- cross-unit phrase references must exist in the global curriculum and precede the review;
- Unit-43 delayed retrieval must still test 想家, 新年/父母, 十二月底, 明年/紅葉;
- capstone must still genuinely retrieve all four Lesson-14 outcomes in Chinese;
- the replacement phrases must not introduce new future prerequisites or distort the frozen outcome;
- Unit-44 review remains coherent at 41 steps;
- Pinyin Search remains global lookup while writing actions are gated by first character teaching lesson.

Return BLOCKER / MAJOR / MINOR and PASS/FAIL. PASS requires zero open BLOCKER and zero open MAJOR.

If defects exist, repair only the activity layer unless Gate A truly needs reopening, then re-audit.

Persist as:
`course/book1/lesson14-activity-question-reaudit2.md`

If and only if:
- Gate A PASS;
- Activity Audit 1 re-audit 2 PASS;
- this fresh Activity Audit 2 PASS;
- Activity Audit 3 re-audit 2 PASS;
- zero open BLOCKER/MAJOR;

then update `course/book1/completion.json`:
- `artifacts.frozenActivitySpec = "course/book1/lesson14-activity-spec.md"`
- `artifacts.activityQuestionAudit = "course/book1/lesson14-activity-question-reaudit2.md"`
- `gates.activities = "pass"`
- `gates.implementation = "pending"`
- `currentStage = "implementation"`
- `stageStatus = "pending"`
- `humanReviewRequired = false`

Record the re-audit2 artifact paths and stop.

Do not edit Unit 42–44 TypeScript, Pinyin Search code, generated artifacts, or deterministic tests in the fresh audit context.
