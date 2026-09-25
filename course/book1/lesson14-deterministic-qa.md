# Book 1 Lesson 14 — Deterministic QA Re-run after FR-001 repair

Final authored implementation head tested: `f0fed1858b2205752164b709e077b91c71a501d0`

Generated-artifact follow-up commit:
- `83911f87205c9c86284181ff4a92849ad09c71a1`
- message: `Generate curriculum artifacts`
- generated-only change: `course/registry.generated.ts`

GitHub Actions:
- workflow: **Feature QA**
- run: **#496**
- run id: `36133132593`
- conclusion: **SUCCESS**

The automatic workflow on the generated-only follow-up head is `action_required`; this is the expected recursion/permission behavior for the bot-generated artifact commit and is not a failing test run.

## Required deterministic checks

All checks on the final authored implementation head passed:

1. `npm ci` — PASS
2. Traditional stroke-source hydration — PASS
3. curriculum artifact generation — PASS
4. curriculum graph validation — PASS
5. targeted tests for changed unit modules — PASS
6. `npm run check:characters` — PASS
7. full regression suite — PASS
8. `npx tsc --noEmit` — PASS
9. `npm run build:pages` — PASS
10. generated curriculum artifacts committed — PASS

## FR-001 implementation under test

The learner-visible change is limited to two Unit-42 phrase notes:
- `u42-home-country-model.note`
- `u42-season-reason.note`

The repaired first note explicitly requires the learner to:
- describe their own home-country/place climate in Chinese;
- identify their own most- and least-liked seasons;
- give their own reason with 因為…所以…;
- say or write the response instead of merely copying the fixed model.

The second note reinforces that the fixed spring sentence is only a scaffold.

No lesson topology, assessed question payload, review count, ownership, grammar, Search/Mega behavior, or handwriting timing changed.

## Findings

- BLOCKER: **0**
- MAJOR: **0**
- MINOR: **0 open**

# Result: PASS

Stage 6 deterministic QA passes after the FR-001 implementation repair.

Because the repair changes learner-visible instructional behavior, Stage 7 must be rerun in three independent fresh contexts before traceability/release evidence can be rebuilt.
