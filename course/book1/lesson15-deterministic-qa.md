# Book 1 Lesson 15 — Stage 6 Deterministic QA

Working PR: **#69**  
Branch: `book1-lesson15-source-a`

## Result

**PASS**

Severity at Stage-6 exit:
- BLOCKER: **0**
- MAJOR: **0**
- MINOR: **0 open**

The complete deterministic suite passed after the final authored code/test repair. Release remains locked; this report does not run learner simulations, traceability, release audit, Gate C, merge, publish, or whole-Book-1 completion.

## Authoritative heads and workflow runs

### Earlier implementation run requested by handoff

- implementation head: `2b815fe6bd5db73b48f854f5d9543d63d26b571f`
- Feature QA run: **#612**
- run id: **36220445206**
- conclusion: **CANCELLED**

Run #612 successfully completed dependency installation, curriculum generation, curriculum graph validation, targeted Unit 45/46/47/48 and Book-2 Unit-1 tests, and character coverage before the workflow was cancelled while the long regression step was running because newer branch commits superseded that head. It therefore did **not** establish a deterministic PASS.

### Fresh exact-head failure used for repair

- authored head: `d9b4c9f63262df9215e213fb8c1175650e6aece9`
- Feature QA run: **#614**
- run id: **36220621352**
- conclusion: **FAILURE**

The exact failing job/log was inspected. Generation, graph validation, targeted changed-unit tests, and character coverage passed. The combined regression/validation command failed 4 of 196 tests:

1. three `tests/practice-content.test.mjs` failures all had the same root cause: phrase `u48-a002-explain` displayed `你怎麼了？／我……／你應該／最好……`, but its token array omitted the first two `／` separators, so sentence/practice reconstruction was not lossless;
2. `validation/units21-25-quality.test.mjs` incorrectly applied its legacy “Repaired phrase and grammar examples” test to every Book-1 unit from Unit 21 onward, so it treated frozen support-only `您` in Unit 46 as if it had to be a formally owned NEW character.

### Narrow deterministic repairs

Two minimal repairs were made without changing frozen educational semantics:

1. `course/book1/unit48.ts`
   - kept the learner-visible A002 explanatory text unchanged;
   - changed only the first two token boundaries to retain the displayed `／` separators;
   - this restores exact practice/sentence-builder reconstruction.

2. `validation/units21-25-quality.test.mjs`
   - restored the legacy regression to its stated/fixture scope, Units **21–25**, instead of unintentionally extending it to all later Book-1 units;
   - the intended Units-21–25 coverage is unchanged;
   - Lesson-15 coverage is not removed: global course validation, targeted Unit 45–48 tests, full practice/content regressions, and the explicit validator test **“Lesson 15 repair preserves semantic listening targets and support-only honorifics”** still enforce the frozen support-only `您` behavior.

No test assertion was weakened for the Lesson-15 frozen semantics, and no learner-facing Chinese, answer key, ownership rule, prerequisite, review floor, Search/Mega rule, A001–A005 behavior, A002 visual meaning, semantic-listening distinction, or handwriting lifecycle was changed by the repair.

### Final authored head

- final authored repair head: `b6fd19faff87bfe42e075cc94d95a7b1241b68f9`
- Feature QA run: **#615**
- run id: **36221331734**
- conclusion: **SUCCESS**

This is the head on which the complete deterministic suite ran after the final authored code/test change.

### Generated-artifact follow-up

Run #615 generated and pushed:

- commit: `73ac28d0f09595bff45836dcea9351beb7a4c222`
- message: `Generate curriculum artifacts`
- author: `github-actions[bot]`
- changed file only: `course/registry.generated.ts`

The automatic follow-up Feature QA run:

- run: **#616**
- run id: **36221636634**
- conclusion: **action_required**
- jobs: **0**

This is the expected bot-recursion/permission behavior for the generated-only follow-up commit, not a failing deterministic job. The full suite already passed on the authored parent that produced this artifact.

## Required deterministic suite

| Required check | Result | Evidence |
|---|---|---|
| Curriculum generation | PASS | `npm run course:generate`: **51 units, 355 lessons**; NEW vocabulary, character coverage, IDs, references, answers, grammar and handwriting checked. |
| Curriculum graph validation | PASS | `npm run course:check`: **Curriculum valid: 51 units, 355 lessons**. |
| Targeted Unit 45 | PASS | `unit-45: rendering references, navigation, checkpoints and handwriting practice passed.` |
| Targeted Unit 46 | PASS | Same targeted validator passed. |
| Targeted Unit 47 | PASS | Same targeted validator passed. |
| Targeted Unit 48 | PASS | Same targeted validator passed. |
| Book-2 Unit-1 migration target | PASS | Targeted validator passed after the `一直 / 直` first-ownership migration. |
| Character coverage | PASS | **51 units, 471 unique first-time characters**. |
| Vocabulary lookup | PASS | Included in the full regression command; canonical lookup and Search tests passed. |
| Mega Challenge | PASS | Included in the full regression command; lesson-gated eligibility/mastery tests passed. |
| Practice engine/content | PASS | The previously failing A002 reconstruction checks now pass, including all progression pools and sentence builders. |
| Full validation suite | PASS | `node --experimental-strip-types --test tests/vocabulary-lookup.test.mjs tests/mega-challenge.test.mjs tests/practice-engine.test.mjs tests/practice-content.test.mjs validation/*.test.mjs`: **196 tests, 195 pass, 0 fail, 1 intentionally skipped migration-only source guard**. |
| TypeScript | PASS | `npx tsc --noEmit`. |
| GitHub Pages build | PASS | `npm run build:pages`; build re-ran generation, graph validation and character coverage successfully before Vite build. |
| Current generated artifacts | PASS | Workflow generated and committed current `course/registry.generated.ts` as generated-only commit `73ac28d…`. |

## Integrity checks required by Stage 6

### Unit-number uniqueness — PASS

The manifest/course validator enforces manifest order and module identity/order agreement. Current generated `course/index.json` has no duplicate within-book unit-number key. Lesson 15 remains exactly Unit 45 → 46 → 47 → 48.

### Source / concept / stable-ID integrity — PASS

The deterministic course validator maintains uniqueness sets for book, unit, lesson, activity, phrase, grammar, word, character and concept identities; it rejects duplicate declarations and missing references. The full validation suite and targeted Unit 45–48 tests passed. Lossless validation also retained the approved Lesson-15 amendment history for migrated prior content.

### Canonical ownership — PASS

The course validator rejects duplicate first-teaching declarations and requires REVIEW vocabulary/characters to have earlier formal ownership. The generated index is current after the final repair.

Lesson-15 canonical counts remain:
- Unit 45: 12 NEW lexical forms
- Unit 46: 10
- Unit 47: 12
- Unit 48: 8
- total: **42**

Formal NEW characters remain:
- 12 + 9 + 8 + 1 = **30**

Support-only `您` remains non-canonical; the explicit Lesson-15 validator for support-only honorifics passed.

### Prerequisite direction — PASS

Review vocabulary and characters are deterministically required to point backward to earlier formal teaching; references must resolve to current/prior content. Targeted validation for Units 45–48 and Book-2 Unit-1 passed. No Book-2 unit is introduced as a prerequisite for the Lesson-15 batch.

### Review / Search / Mega coverage — PASS

The full regression suite passed:
- canonical vocabulary lookup remains unique/stable;
- Pinyin Search gating tests pass;
- Mega eligibility remains lesson-completion-gated;
- content-safe Daily 10, Revenge, Mixed Mastery and Mega pools pass across progression checkpoints;
- support-only Lesson-15 material remains outside canonical Search/Mega ownership as frozen.

Implementation-conformance evidence retained the frozen review floors:
- Unit 45: 32
- Unit 46: 34
- Unit 47: 34
- Unit 48: 58

No Stage-6 repair changed those review payloads.

### `一直 / 直` migration — PASS

Current generated `course/index.json` confirms:
- `一直` → `book-1 / unit-45 / u45-runny-nose`
- `直` → `book-1 / unit-45 / u45-runny-nose`
- exactly one canonical `一直` vocabulary row;
- exactly one canonical `直` character row.

Book-2 Unit-1 targeted validation passed on the same authored head, and the lossless Lesson-15 amendment fixture preserves Book-2 topology/saved-progress identity while moving first ownership earlier.

## Lesson-15 deterministic semantic regression checks

The full validation suite also passed the explicit Lesson-15 guards for:
- A002 required learner-facing visual metadata;
- the three distinct A002 source visual transcriptions: restroom/lower abdomen, bed, throat/neck;
- shared suggestion-bank preservation;
- semantic-listening distinctions;
- support-only `您`.

These deterministic guards complement the already-passed implementation-conformance re-audit; Stage 6 does not reopen or redesign the frozen curriculum.

# Stage-6 exit

Stage 6 deterministic QA is **PASS**.

Advance only to **Stage 7 — learner-simulation readiness**. Run the three required simulations in independent fresh contexts. Release stays locked and Book 1 is not complete.
