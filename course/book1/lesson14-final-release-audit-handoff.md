# Book 1 Lesson 14 — Final hostile release audit handoff

PR: **#68**
Branch: `book1-lesson14-source-a`

This is the mandatory **Stage 9 fresh-context hostile release audit**.

Use a brand-new ChatGPT context. Assume the release contains a subtle defect and try to prove it must be blocked.

## Read these artifacts

1. `automation/book1/PROTOCOL.md` — Stage 9 / Gate C.
2. Authoritative Book 1 Lesson 14 source, printed pp. 299–321 / PDF pp. 326–348.
3. `course/book1/lesson14-source-ledger.md`
4. `course/book1/lesson14-dependency-ledger.md`
5. `course/book1/lesson14-curriculum-blueprint.md`
6. Frozen activity packet:
   - `course/book1/lesson14-activity-spec.md`
   - `course/book1/lesson14-unit42-activity-spec.md`
   - `course/book1/lesson14-unit43-activity-spec.md`
   - `course/book1/lesson14-unit44-activity-spec.md`
7. Actual production implementation:
   - `course/book1/unit42.ts`
   - `course/book1/unit43.ts`
   - `course/book1/unit44.ts`
   - relevant current runtime/Search/practice code where needed to verify a release claim
8. `course/book1/lesson14-deterministic-qa.md`
9. Final-rerun-2 learner simulation findings:
   - `course/book1/lesson14-learner-simulation-a-final2.md`
   - `course/book1/lesson14-learner-simulation-b-final2.md`
   - `course/book1/lesson14-learner-simulation-c-final2.md`
10. `course/book1/lesson14-traceability.md`
11. `course/book1/completion.json`

## Independence rule

Do **not** read earlier semantic-review verdicts or PR discussion before completing your own hostile audit, including:
- source-audit verdict;
- dependency-audit verdict;
- curriculum source-fidelity/pedagogy/adversarial verdicts;
- Activity Audit 1/2/3 verdicts and their re-audits;
- implementation-conformance verdicts;
- earlier pre-final learner simulations.

The artifacts explicitly required above may contain factual status/results, but do not treat any prior PASS statement as evidence. Recheck the release yourself.

## Attack surface

Try to find evidence that Gate C must not pass.

Search specifically for:
- source item omitted or materially distorted;
- formal NEW ownership mismatch;
- duplicate ownership;
- source EXPANSION accidentally duplicated as NEW;
- improper deferral;
- hidden/future vocabulary or character prerequisite;
- grammar used before explanation;
- source restriction lost or overgeneralized;
- unsupported learner-facing rule;
- dialogue adaptation that changes a required communicative function;
- activity/capstone claiming an outcome it does not actually test;
- ambiguous/wrong answer;
- weak distractor that makes the test meaningless;
- listening key not uniquely audible;
- broken order tokens or phrase references;
- pinyin or Traditional-character errors;
- Simplified contamination;
- handwriting ownership/geometry issue;
- Search visibility/practice gating inconsistency;
- Mega/adaptive-practice timing error;
- a direct `practice-<character>` bypass;
- generated index/registry mismatch;
- stale deterministic-QA claim after code changes;
- traceability claim unsupported by production;
- orphan production concept;
- unresolved source item;
- culture material presented as current when it is only textbook-era history;
- migration/progress compatibility risk;
- release-only or build/runtime defect.

Explicitly retest the two last strict-prerequisite repairs:
1. `u43-a002-s2` must contain no future-owned Lesson-14 material.
2. every standalone `practice-<character>` route must be blocked until first teaching, while Pinyin Search lookup itself remains global.

## Required output

Return findings grouped by:
- BLOCKER
- MAJOR
- MINOR

Then give **PASS or FAIL**.

PASS requires:
- zero open BLOCKER;
- zero open MAJOR;
- source/dependency/Gate A/Gate B/implementation/deterministic QA still valid;
- all three final-rerun-2 learner simulations still applicable;
- traceability still valid;
- no reason to block release.

If you find a BLOCKER or MAJOR:
- do **not** merge;
- persist the finding and smallest blast radius;
- reopen the appropriate upstream gate in `completion.json`;
- stop.

If the hostile audit genuinely passes:
- persist the report as:
  `course/book1/lesson14-final-release-audit.md`
- update `course/book1/completion.json`:
  - `artifacts.releaseReport = "course/book1/lesson14-final-release-audit.md"`
  - `currentStage = "gate-c"`
  - `stageStatus = "pending"`
  - keep `gates.release = "locked"`
  - keep `humanReviewRequired = false`
  - record zero open BLOCKER/MAJOR
- **do not merge or publish**
- stop.

Gate C is finalized only in the main development context after the independent hostile report is verified.
