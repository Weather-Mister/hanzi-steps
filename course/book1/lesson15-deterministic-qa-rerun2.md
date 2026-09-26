# Book 1 Lesson 15 — Deterministic QA Rerun 2

Working repository: `Weather-Mister/hanzi-steps`  
Working PR: **#69**  
Branch: `book1-lesson15-source-a`

## Verdict

**PASS**

Final severity:
- BLOCKER: **0**
- MAJOR: **0**
- MINOR: **0 open**

The complete deterministic suite passed after the SIM-A-RERUN-01 learner-facing 幾 repair and after adding one narrow deterministic regression guard for that repaired path. No learner simulation, traceability, Gate C, merge, publish, deployment, or Book-1 completion was performed here.

## Authoritative final authored head and workflow

Final authored head tested:

- `686ea019eef9d4147dce410bad407fa31872666b`
- commit: **Add deterministic guard for Lesson 15 幾 expansion**

Authoritative workflow:

- workflow: **Feature QA**
- run: **#636**
- run id: **36233164058**
- QA job id: **108380024859**
- conclusion: **SUCCESS**

This is the authoritative complete rerun. Unlike Feature QA #631, it ran through and passed the combined regression suite, TypeScript, and the GitHub Pages build.

### Earlier current-head evidence

Feature QA **#635 / id 36231530459** also completed successfully on pre-guard head `1f405ddb3656f018a9b4841f104ea74b201e0c07`, including TypeScript and Pages. It was not used as the final rerun because the handoff specifically required a deterministic guard for the repaired `u46-ji-explain` path. The guard was added without changing learner-facing curriculum, and the complete suite was rerun again as #636.

## Deterministic strengthening made during this rerun

One test-only change was added:

- `validation/validator.test.mjs`
- test: **Lesson 15 幾 expansion is taught before testing without stealing Unit-7 ownership**

The guard verifies that:

- `u46-ji-explain` exists and precedes `u46-ji-s1`;
- `u46-ji-explain` points to `u46-ji-expansion`;
- the learner-facing example remains **她沒有幾個朋友。**;
- the phrase keeps **jǐ**, the intended “does not have many / has only a few friends” meaning, and the explicit Unit-7 “how many?” versus Lesson-15 “a few / several” semantic-expansion explanation;
- `u46-ji-s1` still assesses the new statement/non-question sense only after explanation;
- canonical vocabulary and character ownership of **幾** remains **Book 1 Unit 7**;
- Unit 46 does not re-add 幾 as NEW vocabulary, NEW character, or handwriting;
- Unit 47 does not claim 幾 / 好幾次 as new ownership;
- Unit-47 `u47-stomach-ji-review` precedes the retrieval check;
- `u47-several-times` remains **吐了好幾次。** with the explicit dependency note **Requires the Unit-46 幾 expansion.**;
- the Unit-47 retrieval answer remains **a few/several**.

The new guard passed in every targeted changed-unit invocation and in the full regression suite. No frozen educational semantics or learner-facing content were changed.

## Complete rerun matrix

| Required check | Result | Evidence |
|---|---|---|
| Dependency install / repository setup | PASS | #636 `npm ci` completed successfully. |
| Traditional stroke-source hydration | PASS | #636 hydration step completed successfully. |
| Curriculum generation | PASS | #636 `npm run course:generate` completed successfully. |
| Curriculum graph validation | PASS | **51 units, 355 lessons** valid; NEW vocabulary, character coverage, IDs, references, answers, grammar and handwriting checked. |
| Targeted Unit 45 | PASS | Rendering references, navigation, checkpoints and handwriting practice passed. |
| Targeted Unit 46 | PASS | Same targeted validator passed, including the new 幾 guard. |
| Targeted Unit 47 | PASS | Same targeted validator passed, including the 好幾次 dependency guard. |
| Targeted Unit 48 | PASS | Same targeted validator passed. |
| Book-2 Unit-1 migration target | PASS | Rendering references, navigation, checkpoints and handwriting practice passed. |
| Character coverage | PASS | **51 units, 471 unique first-time characters**. |
| Pinyin Search / vocabulary lookup | PASS | Full regression suite passed canonical lookup/uniqueness and Pinyin Search coverage checks. |
| Mega Challenge | PASS | Eligibility, mastery exclusion, progression-pool and all-form coverage tests passed. |
| Practice engine/content | PASS | Adaptive/practice/content regressions passed, including A003 isolation. |
| Full validation suite | PASS | **199 tests: 198 pass, 0 fail, 1 intentional skip**. |
| TypeScript | PASS | `npx tsc --noEmit`. |
| GitHub Pages build | PASS | `npm run build:pages`; build succeeded after generation/check/character coverage reran. |
| Unit-number uniqueness | PASS | Structural/course validation passed manifest/module identity and ordering checks. |
| Source / concept / stable-ID integrity | PASS | Structural validation passed IDs/references and the lossless migration/amendment fixtures. |
| Canonical ownership integrity | PASS | Structural validation and generated index passed; the new 幾 guard additionally fixes Unit-7 ownership as an explicit invariant. |
| Prerequisite direction | PASS | Targeted current/prior references passed; Unit-47 好幾次 remains downstream of the Unit-46 幾 expansion. |
| Review coverage | PASS | Full Lesson-15 validation/practice regressions passed; no review payload was changed. |
| Search coverage | PASS | Canonical lookup/Pinyin Search regressions passed; support-only material remains excluded. |
| Mega coverage | PASS | Mega progression and all-form eligibility tests passed; support-only material remains excluded. |
| A002 source-visual guards | PASS | Named visual metadata and three-distinct-source-transcription tests passed. |
| Five semantic-listening guards | PASS | Named Lesson-15 semantic-listening/honorific regression passed with the five frozen answers. |
| Support-only 您 | PASS | Named honorific guard passed; 您 remains non-canonical. |
| A003 notation + `practice:false` isolation | PASS | Named A003 notation guard and Search/Mega/phrase-practice/handwriting isolation test passed. |
| `u46-ji-explain` explain-before-test path | PASS | New named deterministic guard passed. |
| Canonical 幾 ownership remains Unit 7 | PASS | New guard asserts both vocabulary and character ownership at Unit 7 and no Unit-46/47 re-ownership. |
| Unit-47 好幾次 prerequisite integrity | PASS | New guard asserts Unit-46 dependency note, review-before-test order, exact phrase, and retrieval answer. |
| `一直 / 直` migration integrity | PASS | Book-2 Unit-1 targeted validation plus existing ownership/lossless migration checks passed. |
| Generated curriculum artifacts current | PASS | #636 ended with **Generated curriculum artifacts already current.** No generated-only follow-up commit was needed. |
| Completion-state schema validity | PASS | Named test **Book 1 completion controller state is internally valid** passed. |

## Explicit Lesson-15 repaired-path evidence

### 幾 semantic expansion

Current Unit 46 teaches before testing:

- earlier sense: **幾 jǐ = how many?** from Unit 7;
- Lesson-15 semantic expansion: **a few / several** in a statement/non-question context;
- learner-facing example: **她沒有幾個朋友。**;
- intended interpretation: **She does not have many friends / has only a few friends.**

Canonical ownership remains Unit 7. Unit 46 adds only the semantic expansion, and Unit 47 retrieves it through **好幾次**.

### A003 source notation and support isolation

The existing named deterministic guards still pass for:

- **一日4次**
- **3日份**
- support-only **份**
- **飯前**
- **飯後**
- **飯後30分鐘**
- contextual **健康診所**
- deferred **診**
- A003 answers exactly **四次 / 飯後30分鐘 / 十二包**
- `practice:false` exclusion from productive phrase practice
- exclusion of support-only 份/診 from canonical Search, Mega, and handwriting ownership

### A002 / semantic listening / 您

The full suite also re-passed:

- required learner-facing A002 visual metadata;
- three distinct A002 source scenes/roles;
- all five repaired semantic-listening answer distinctions;
- support-only **您** and **好的，謝謝您。** without canonical promotion.

## Generated artifacts

No generated-only follow-up commit was created by #636.

The final workflow commit step reported:

> Generated curriculum artifacts already current.

Therefore there is no bot-generated child commit to distinguish from the final authored head for this rerun.

## Stage-6 exit

Deterministic QA rerun 2 is **PASS — 0 BLOCKER / 0 MAJOR / 0 MINOR**.

Authorized next state:

- Stage 7 learner-simulation readiness;
- historical Simulation A failure remains preserved;
- historical first Simulation-A rerun failure remains preserved;
- **Simulation A must be rerun from scratch again** against the latest repaired implementation;
- Simulations B/C must not start before that fresh rerun passes;
- release remains **LOCKED**;
- Book 1 remains **incomplete**.

Next handoff:

- `course/book1/lesson15-learner-simulation-rerun2-handoff.md`
