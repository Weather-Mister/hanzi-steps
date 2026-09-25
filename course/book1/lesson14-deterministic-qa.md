# Book 1 Lesson 14 — Deterministic QA Re-run after final Gate-B repair

Final learner-facing implementation head tested: `26b982412a05da2adcbf99727ec72dbe3dba79d4`

Generated-artifact follow-up commit:
- `151bae5d541fcfe60cef6a0b79d945a6479c0da6`
- message: `Generate curriculum artifacts`
- generated-only change: `course/registry.generated.ts`

GitHub Actions:
- workflow: **Feature QA**
- run: **#459**
- run id: `36114550736`
- conclusion: **SUCCESS**

## Required checks

All deterministic checks succeeded on the final learner-facing implementation head:

1. `npm ci` — PASS
2. declared Traditional stroke-source hydration — PASS
3. curriculum artifact generation — PASS
4. curriculum graph validation — PASS
5. targeted tests for changed unit modules — PASS
6. `npm run check:characters` — PASS
7. full regression suite — PASS
8. `npx tsc --noEmit` — PASS
9. `npm run build:pages` — PASS
10. generated curriculum artifacts committed successfully

The regression suite now includes the global explain-before-order invariant that previously failed Feature QA #451. The repaired Unit-44 delayed retrieval and capstone order steps pass that invariant by reusing phrases taught earlier in Units 42–44.

## Pinyin Search / practice regression

The final implementation preserves the frozen Gate-A product model:
- future canonical vocabulary remains visible in Pinyin Search;
- writing-practice actions are hidden until the character's first teaching lesson is complete;
- Mega/adaptive practice remains owning-lesson gated.

Targeted regression coverage verifies this behavior for Lesson-14 material.

## Findings

- BLOCKER: **0**
- MAJOR: **0**
- MINOR: **0 open**

# Result: PASS

Stage 6 deterministic QA passes on the final repaired learner-facing implementation.

Stage 7 must now be rerun in three independent fresh contexts because the learner-facing activity packet changed after the earlier learner simulations.
