# Book 1 Lesson 15 — Deterministic QA Rerun

Working repository: `Weather-Mister/hanzi-steps`  
Working PR: **#69**  
Branch: `book1-lesson15-source-a`

## Verdict

**PASS**

Final severity:
- BLOCKER: **0**
- MAJOR: **0**
- MINOR: **0 open**

The complete deterministic suite passed after the final authored repair required by the SIM-A-01 learner-facing A003 change. Release remains locked. No learner simulation, traceability, Gate C, merge, publish, deployment, or Book-1 completion was performed here.

## Exact authored head and workflow evidence

### First repaired-head run — real deterministic failure

- authored head: `a585ea8fa41f3de9e2491b7c195bb6822d692574`
- workflow: **Feature QA**
- run: **#623**
- run id: **36226916026**
- conclusion: **FAILURE**

The failure was genuine, not a generated-only follow-up state. Dependency installation and Traditional stroke-source hydration passed, then `npm run course:generate` rejected:

- `u48-prescription-support` — `tokens: []`
- `u48-prescription-visual` — `tokens: []`

The structural validator requires phrase token arrays to contain nonempty strings, so all downstream jobs were correctly skipped.

### Narrow deterministic repair

Final authored repair commit:

- `8868d636607a74571b3d428b4aeeb5e789f45983`
- message: **Fix Lesson 15 A003 practice isolation for deterministic QA**

The repair was deliberately narrow:

1. `Phrase` gained optional `practice?: boolean`.
2. The two A003 support/source cards retain their exact learner-facing Chinese but use one lossless display token instead of an empty array.
3. Both cards set `practice: false`.
4. `phraseItems()` explicitly excludes `practice:false` phrases from productive/adaptive phrase practice.
5. New deterministic guards verify A003 notation, answers, canonical isolation, Search isolation, Mega isolation, phrase-practice isolation, and handwriting isolation.

No frozen learner-facing Chinese, assessed answer, lesson/step/phrase ID, canonical ownership, prerequisite, A002 visual meaning, semantic-listening payload, support-only 您 behavior, handwriting lifecycle, review floor, or `一直 / 直` migration semantics were changed.

### Final complete suite

- final authored head tested: `8868d636607a74571b3d428b4aeeb5e789f45983`
- workflow: **Feature QA**
- run: **#624**
- run id: **36227457460**
- conclusion: **SUCCESS**
- QA job conclusion: **SUCCESS**

### Generated-artifact follow-up

Successful run #624 generated and pushed:

- follow-up commit: `cba5aa8093deb6ebc6655873cb3ef9f667dd78be`
- message: **Generate curriculum artifacts**
- author: `github-actions[bot]`
- changed file only: `course/registry.generated.ts`

Automatic follow-up:

- workflow: **Feature QA**
- run: **#625**
- run id: **36227952707**
- conclusion: **action_required**
- jobs: **0**

This is the expected generated-only bot-recursion/permission state. It is **not** a failed deterministic job and does not invalidate the complete PASS on its authored parent.

## Mandatory rerun matrix

| Required check | Result | Evidence |
|---|---|---|
| Dependency install / repository setup | PASS | `npm ci` succeeded on run #624. |
| Traditional stroke-source hydration | PASS | Declared Traditional stroke sources hydrated successfully. |
| Curriculum generation | PASS | `npm run course:generate`: 51 units, 355 lessons. |
| Curriculum graph validation | PASS | `npm run course:check`: 51 units, 355 lessons valid. |
| Targeted Unit 45 | PASS | Rendering references, navigation, checkpoints, handwriting practice passed. |
| Targeted Unit 46 | PASS | Same targeted validator passed. |
| Targeted Unit 47 | PASS | Same targeted validator passed. |
| Targeted Unit 48 | PASS | Same targeted validator passed with repaired A003 path. |
| Book-2 Unit-1 migration target | PASS | Targeted validator passed. |
| Character coverage | PASS | 51 units, **471** unique first-time characters. |
| Pinyin Search / vocabulary lookup | PASS | Full regression suite passed canonical lookup, normalization, gating, uniqueness and stability tests. |
| Mega Challenge | PASS | Eligibility/mastery/queue regressions passed. |
| Practice engine/content | PASS | Adaptive, Daily 10, Revenge, Mixed Mastery, sentence reconstruction and new A003 isolation guard passed. |
| Full validation suite | PASS | **198 tests: 197 pass, 0 fail, 1 intentional skip**. |
| TypeScript | PASS | `npx tsc --noEmit`. |
| GitHub Pages build | PASS | `npm run build:pages`; generation/check/character coverage reran, Vite production build succeeded. |
| Unit-number uniqueness | PASS | Course validation passed manifest/module ordering and identity integrity. |
| Source/concept/stable-ID integrity | PASS | Structural validation and lossless regression suite passed; repair changed no frozen IDs. |
| Canonical ownership | PASS | First-teaching validation and generated index passed. |
| Prerequisite direction | PASS | Targeted/current-prior reference validation passed. |
| Review coverage | PASS | Full Lesson-15/current curriculum regressions passed; repair changed no review payload. |
| Search coverage | PASS | Canonical Pinyin Search suite passed. |
| Mega coverage | PASS | Full Mega suite passed. |
| A002 visual guards | PASS | Three distinct source-scene/role cards and shared suggestion-bank guards passed. |
| Five semantic-listening guards | PASS | All five explicit semantic-answer guards passed. |
| Support-only 您 | PASS | Deterministic honorific guard passed; no canonical promotion. |
| Repaired A003 notation + practice isolation | PASS | New validator/practice tests passed for visible notation, unchanged answers, and `practice:false` exclusion. |
| `一直 / 直` migration | PASS | Book-2 Unit-1 targeted validation and existing migration/lossless guards passed. |
| Generated artifacts current | PASS | Run #624 committed the current generated registry as generated-only follow-up `cba5aa8…`. |

## Explicit 份 / 診 isolation

Current generated and runtime state confirms both **份** and **診** remain non-canonical and non-productive:

- no exact canonical vocabulary key for 份 or 診 in generated `course/index.json`;
- no canonical character key for 份 or 診 in generated `course/index.json`;
- neither is a Unit-48 NEW vocabulary declaration;
- neither is a Unit-48 NEW character declaration;
- neither has a handwriting step/character record;
- canonical Pinyin Search contains neither glyph;
- Mega Challenge contains neither glyph;
- `learnedPracticeItems()` contains neither repaired A003 phrase and no productive practice target containing either glyph;
- both source/support cards remain learner-visible before A003 because `practice:false` excludes them from productive practice without hiding their lesson cards.

A003 assessed answers remain exactly:

- `u48-a003-s1` → **四次**
- `u48-a003-s2` → **飯後30分鐘**
- `u48-a003-s3` → **十二包**

## Stage transition

Stage 6 deterministic QA rerun is **PASS**.

Authorized next state:
- current stage: **learner-simulation**
- Simulation A: historical **FAIL** retained as evidence; **must be rerun from scratch**
- Simulations B/C: **must not start before the fresh Simulation-A rerun**
- release: **LOCKED**
- Book 1 complete: **false**

Use `course/book1/lesson15-learner-simulation-rerun-handoff.md` next.
