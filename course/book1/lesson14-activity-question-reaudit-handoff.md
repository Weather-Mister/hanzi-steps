# Book 1 Lesson 14 — Fresh-context Activity Audit 2 re-audit handoff

Working PR: **#68**
Branch: `book1-lesson14-source-a`

## Why Gate B was reopened

Stage-7 learner simulations found defects in the previously frozen activity packet and implementation. The activity layer has now been repaired without changing Gate-A curriculum ownership, unit boundaries, grammar ownership, character ownership, or source allocation.

Repaired candidate packet:
- `course/book1/lesson14-activity-spec.md`
- `course/book1/lesson14-unit42-activity-spec.md`
- `course/book1/lesson14-unit43-activity-spec.md`
- `course/book1/lesson14-unit44-activity-spec.md`

Current same-context re-audits:
- `course/book1/lesson14-activity-teaching-quality-reaudit.md` — PASS
- `course/book1/lesson14-activity-cross-unit-reaudit.md` — PASS

Those verdicts are **not inputs** to the mandatory fresh Activity Audit 2. Do not read them before completing your own independent review.

The learner-facing implementation is intentionally still stale/locked. Do **not** compare against Unit 42–44 TypeScript until Gate B re-freezes; this audit is of the repaired activity packet itself.

## Mandatory fresh audit

Use a **new ChatGPT context**.

Read:
1. `automation/book1/PROTOCOL.md`, especially Stage 4 / Gate B.
2. `course/book1/lesson14-source-ledger.md`.
3. `course/book1/lesson14-dependency-ledger.md`.
4. frozen Gate-A blueprint `course/book1/lesson14-curriculum-blueprint.md`.
5. repaired `course/book1/lesson14-activity-spec.md`.
6. repaired:
   - `course/book1/lesson14-unit42-activity-spec.md`
   - `course/book1/lesson14-unit43-activity-spec.md`
   - `course/book1/lesson14-unit44-activity-spec.md`
7. `ADDING_A_UNIT.md`.
8. `course/index.json` and targeted prior units only when needed to verify a prerequisite.

Do **not** read before your independent review:
- `course/book1/lesson14-activity-question-audit.md`
- `course/book1/lesson14-activity-teaching-quality-audit.md`
- `course/book1/lesson14-activity-cross-unit-audit.md`
- `course/book1/lesson14-activity-teaching-quality-reaudit.md`
- `course/book1/lesson14-activity-cross-unit-reaudit.md`
- learner simulation A/B/C reports.

Audit the repaired candidate as if you did not author it.

Attack every learner-facing:
- phrase;
- grammar record;
- select;
- listen;
- order;
- match;
- review item;
- capstone item;
- pinyin line;
- translation;
- answer key;
- distractor;
- prerequisite edge.

Search specifically for:
- two defensible answers;
- no defensible answer;
- wrong key;
- accidental clue;
- malformed/weak distractors;
- assessment before explanation;
- future vocabulary, grammar, or character prerequisites;
- deferred/hidden Hanzi in required answers;
- Simplified contamination;
- bad pinyin/tone marks;
- unnatural Taiwan Mandarin;
- misleading English;
- source distortion;
- order-token banks that do not reconstruct the exact phrase;
- repeated-token multiplicity loss;
- duplicate activity IDs;
- review items that claim retrieval without actually retrieving;
- capstone items that test curriculum metadata instead of Chinese;
- delayed-retrieval promises that are not actually represented;
- Search/Mega timing requirements that are internally inconsistent.

Important repaired design constraints that must be evaluated, not assumed correct:
- Unit-42 spring listening must not expose 秋天 before teaching.
- G004 lesson must not expose G005.
- source-transfer assessment should use Chinese, while record/report/write instructions may remain explanatory instructions.
- Unit-44 review now has 41 total steps because four Unit-43 delayed-retrieval commitments were added.
- final F/S001–004 capstone uses Chinese order production.
- Pinyin Search contract requires canonical vocabulary visibility only after the owning lesson is complete.

Return:
- BLOCKER / MAJOR / MINOR findings;
- PASS/FAIL;
- PASS requires zero open BLOCKER and zero open MAJOR.

If defects are found:
- repair only the activity-spec files necessary;
- do not change Gate-A curriculum ownership/boundaries/prerequisites without reopening Gate A;
- re-audit until genuinely PASS.

Persist the final independent report as:
`course/book1/lesson14-activity-question-reaudit.md`

Commit all audit/spec repairs to existing PR #68.

## Gate-B re-freeze

After the independent audit is complete, you may read the two repaired Audit-1/Audit-3 reports.

If and only if:
- Gate A still PASS;
- repaired Activity Audit 1 PASS;
- this fresh Activity Audit 2 PASS;
- repaired Activity Audit 3 PASS;
- open BLOCKER = 0;
- open MAJOR = 0;

then update `course/book1/completion.json`:
- `artifacts.frozenActivitySpec = "course/book1/lesson14-activity-spec.md"`
- `artifacts.activityQuestionAudit = "course/book1/lesson14-activity-question-reaudit.md"`
- `gates.activities = "pass"`
- `gates.implementation = "pending"`
- `currentStage = "implementation"`
- `stageStatus = "pending"`
- `humanReviewRequired = false`

Record the repaired Audit-1/Audit-3 artifact paths as well.

Then stop.

Do **not** edit:
- `course/book1/unit42.ts`
- `course/book1/unit43.ts`
- `course/book1/unit44.ts`
- Pinyin Search code
- generated curriculum artifacts

in the fresh audit context. Implementation repair begins only after Gate B has re-frozen.
