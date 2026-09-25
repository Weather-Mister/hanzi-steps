# Book 1 Lesson 14 — Activity Audit 1 Re-audit 2

Reason: deterministic QA exposed a structural explain-before-order failure after the first Stage-7 repair: several Unit-44 review order activities referenced newly defined phrase IDs that had never appeared in a prior phrase-teaching step.

Repair made only in `lesson14-unit44-activity-spec.md`:
- removed seven redundant Unit-44 alias phrase records;
- delayed-retrieval order items now reuse the already-taught Unit-43 phrase IDs:
  - `u43-duration-now-source`
  - `u43-newyear-source`
  - `u43-return-plan`
  - `u43-nextyear-source`
- the four capstone order items now reuse already-taught phrases:
  - `u44-comparison-source`
  - `u42-season-reason`
  - `u44-not-as-source`
  - `u43-finished-stay`

This preserves the repaired communicative targets while restoring the repository's global invariant that an order activity retrieves a phrase the learner has already encountered.

No source ownership, unit boundary, grammar ownership, canonical vocabulary ownership, or character ownership changed.

## Learning-quality check

- delayed retrieval remains genuinely delayed because the Unit-43 phrases were taught in Unit 43, not re-explained immediately before the Unit-44 order step;
- the capstone still requires Chinese construction for all four Lesson-14 outcomes;
- the weather/typhoon capstone uses a previously taught source line combining typhoon comparison and caution;
- the season/preference capstone uses the previously taught 因為…所以… preference line;
- the comparison capstone uses the previously taught source 沒有…那麼 line;
- the experience capstone uses the previously taught completed-duration stay line;
- review length remains 41 steps.

Findings:
- BLOCKER: 0
- MAJOR: 0
- MINOR: 0 open

# PASS

Activity Audit 1 passes on the post-QA repaired candidate. Gate B still requires a fresh-context Activity Audit 2 re-audit before re-freezing.
