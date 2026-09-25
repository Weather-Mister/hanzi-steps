# Book 1 Lesson 14 — Production Verification

Stage: **10 — Production verification**  
Production merge: `53b676b6d3491d1c2beb9baf5e27f03e579bb0e6`  
PR: **#68**  
Date: **2026-09-25**

## Verdict

**PASS**

No production-only blocker or major defect was found in the deployed Lesson-14 release.

## Deployment

GitHub Pages workflow:
- workflow: **Deploy Hanzi Steps to GitHub Pages**
- run: **#160**
- run id: `36140446640`
- merge SHA deployed: `53b676b6d3491d1c2beb9baf5e27f03e579bb0e6`
- build job: **SUCCESS**
- deploy job: **SUCCESS**
- Pages deployment status: **success**
- production URL reported by GitHub Pages: `https://weather-mister.github.io/hanzi-steps/`

The deployment action created the Pages deployment from artifact id `10865873780` and reported success.

## Exact deployed artifact verification

The exact `github-pages` artifact from production run #160 was downloaded and inspected.

Artifact SHA-256:
`5f3bd0cb1e22480e576f1d2ae4be384af856e25a608f3afc51efac486a3f686b`

The deployed bundle contains:
- Unit 42 title: **Weather and the Four Seasons**
- Unit 43 title: **How Long and What's About to Happen**
- Unit 44 title: **Typhoons and Comparisons**
- `u42-review`, `u43-review`, and `u44-review`
- final capstone IDs through `u44-review-cap4`
- the repaired A001 learner instruction
- the separate A005 learner instruction
- the repaired Unit-43 duration distractor
- Pinyin-search UI/runtime content
- Mega Challenge UI/runtime content
- the standalone-writing unlock message
- Lesson-14 vocabulary including 天氣, 紅葉, and 颱風

The repaired A001 production text in the deployed bundle explicitly requires the learner's own home-country/place climate, personally most- and least-liked seasons, and own reason.

## Lessons / answers / curriculum integrity

The production Pages build runs `npm run test:curriculum` before packaging.

Production run #160:
- tests: **150**
- pass: **149**
- fail: **0**
- skipped: **1**
- curriculum generated: **47 units / 327 lessons**
- character coverage: **442 unique first-time characters**
- curriculum graph/check: **PASS**
- Pages production build: **PASS**

The skipped migration-source comparison test is the existing explicitly skipped architecture migration test, not a Lesson-14 failure.

The production build also confirms current answer/reference integrity through the repository's curriculum validators, including:
- keyed answer presence;
- phrase/grammar references;
- prerequisite direction;
- handwriting metadata/geometry;
- review coverage.

## Handwriting

Production artifact generation and character validation pass.

Lesson 14's 21 NEW characters remain present with validated handwriting metadata and geometry. The final hostile audit also independently verified nonempty stroke paths/medians and matching stroke/median counts before Gate C.

Standalone `practice-<character>` remains first-teaching gated in the deployed bundle.

## Progress / reload compatibility

The production regression suite passes the compatibility check:
**Original complete and partial progress checkpoints remain valid.**

No prior unit source file was rewritten by the Lesson-14 release, and the hostile release audit found no migration/progress incompatibility.

The persistence/runtime source is unchanged by the final A001 repair; that repair changes only two learner-visible phrase-note strings.

## Pinyin Search / Mega / adaptive practice

The deployed bundle contains the current Search, Mega, adaptive-practice, and standalone-writing runtime.

Release evidence remains applicable:
- all 30 Lesson-14 canonical NEW forms are present;
- Search remains global canonical lookup;
- Search/standalone handwriting remains first-teaching gated;
- Mega/adaptive vocabulary remains owning-lesson gated;
- 想 / 快 / 要 retain prior canonical ownership without duplicate rows.

## Production-only error check

- Pages build: SUCCESS
- Pages deploy: SUCCESS
- deployment status: SUCCESS
- exact deployed artifact contains the intended Lesson-14 production payload
- no post-Gate-C learner-facing code divergence exists

No production-only release error was found.

## Verification method note

The execution environment used for this verification could not directly operate the public Pages site in an interactive external browser session. Production verification therefore used GitHub's successful Pages deployment record, the exact artifact actually deployed to production, production-build regression output, and the already-passed current-runtime release evidence rather than manual browser clicks.

This limitation is recorded explicitly; no manual interaction is being claimed.

## Stage-10 result

**PASS**

Lesson 14 / Hanzi Steps Units 42–44 are released.

The Book-1 controller may advance to:
- `completedThroughSourceLesson: 14`
- `completedThroughUnit: 44`
- `currentSourceLesson: 15`
- `currentStage: "preflight"`

Book 1 is **not** complete. Source Lesson 15 and the mandatory final whole-Book-1 audit still remain.
