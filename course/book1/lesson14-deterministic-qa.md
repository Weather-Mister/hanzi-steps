# Book 1 Lesson 14 — Deterministic QA Final Re-run after prerequisite repairs

Final authored implementation head tested: `6a94446ce76eeddc8086e56a9d3002baa2fdefa1`

Generated-artifact follow-up commit:
- `e01073f25f2da06917b9c265e9c84d860a36ea60`
- message: `Generate curriculum artifacts`
- generated-only change: `course/registry.generated.ts`

GitHub Actions:
- workflow: **Feature QA**
- run: **#478**
- run id: `36126675182`
- conclusion: **SUCCESS**

## Required checks

All deterministic checks succeeded on the final authored implementation head:

1. `npm ci` — PASS
2. Traditional stroke-source hydration — PASS
3. curriculum artifact generation — PASS
4. curriculum graph validation — PASS
5. targeted tests for changed unit modules — PASS
6. `npm run check:characters` — PASS
7. full regression suite — PASS
8. `npx tsc --noEmit` — PASS
9. `npm run build:pages` — PASS
10. generated curriculum artifacts committed successfully

## Final prerequisite repairs verified by QA

### Unit 43 future-vocabulary repair
`u43-a002-s2` no longer contains future-owned `明年`. Its third distractor is the already-available `你在臺灣住了半年嗎？`.

### Global standalone handwriting gate
`characterPracticeAvailable(char, completed)` is now the central first-teaching invariant.

Regression coverage verifies:
- 葉 is unavailable for standalone practice before `u43-next-year`;
- 葉 unlocks after `u43-next-year`;
- 更 is unavailable before `u44-even-more`;
- 更 unlocks after `u44-even-more`;
- Pinyin Search keeps canonical vocabulary globally visible while handwriting actions remain gated.

The application-level `start()` path enforces the same rule for every `practice-<character>` lesson, including character-library/detail shortcuts.

## Findings

- BLOCKER: **0**
- MAJOR: **0**
- MINOR: **0 open**

# Result: PASS

Stage 6 deterministic QA passes on the final prerequisite-repaired implementation.

Because learner-facing behavior changed after the previous final learner-simulation rerun, Stage 7 must be repeated on this final code before traceability/release.
