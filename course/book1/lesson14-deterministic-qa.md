# Book 1 Lesson 14 — Deterministic QA Report

Final implementation head tested: `206bb9d90f2a06d9b9f0f1aceda69fe0198e3673`

GitHub Actions:
- workflow: **Feature QA**
- run: **#418**
- run id: `36029456796`
- conclusion: **SUCCESS**
- generated-artifact step: **already current** (no follow-up bot commit)

## Required checks

All required deterministic checks completed successfully on the same implementation head:

1. `npm ci` — PASS
2. declared Traditional stroke-source hydration — PASS
3. curriculum artifact generation — PASS
4. curriculum graph validation — PASS
5. targeted changed-unit tests — PASS
6. `npm run check:characters` — PASS
7. full regression suite, including vocabulary lookup, Mega Challenge, practice engine/content, and validation tests — PASS
8. `npx tsc --noEmit` — PASS
9. `npm run build:pages` — PASS
10. generated curriculum artifact freshness check — PASS; files already current

## Generated curriculum result

The Pages build regenerated and revalidated the full curriculum:
- **47 units**
- **327 lessons**
- NEW vocabulary, character coverage, IDs, references, answers, grammar, and handwriting all validated.

Character coverage specifically reports:
- Unit 42: **8** NEW — 冷滑雪春冬夏秋雨
- Unit 43: **6** NEW — 只父母停底葉
- Unit 44: **7** NEW — 傘颱濕討厭聞更
- full corpus: **442 unique first-time characters**

## Practice / Search / Mega regression

The full regression suite passed the progression-checkpoint practice tests, including:
- vocabulary lookup;
- Pinyin normalization/search;
- canonical vocabulary uniqueness;
- Mega Challenge eligibility and deduplication;
- Daily 10 / Revenge / Mixed Mastery practice pools;
- learned-content safety across progression checkpoints;
- lesson assessment-to-mastery mapping.

This verifies the newly generated Unit 42–44 canonical vocabulary is integrated into the same production registries and practice systems used by existing units.

## Build note

Vite emitted the existing non-blocking chunk-size warning for the main bundle (>500 kB). The build itself succeeded. This is a performance warning, not a Lesson-14 correctness or release blocker.

## Findings

- BLOCKER: **0**
- MAJOR: **0**
- MINOR: **0 open for Lesson 14**

# Result: PASS

Stage 6 deterministic QA passes on the final learner-facing implementation head.

The release pipeline may advance to Stage 7 learner simulation. Release remains locked until all three required fresh-context learner simulations, traceability, fresh hostile release audit, and Gate C pass.
