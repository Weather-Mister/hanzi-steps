# Book 1 Lesson 15 — Simulation A Blocker Repair Handoff

Working repository: `Weather-Mister/hanzi-steps`  
Working draft PR: **#69**  
Working branch: `book1-lesson15-source-a`

Current checkpoint: **Stage 7 Simulation A failed; smallest affected upstream area reopened at Stage 5 implementation for a narrow Unit-48 A003 repair**.

## Gate/state

- Source gate: **PASS**
- Dependency gate: **PASS**
- Gate A / curriculum: **PASS / frozen**
- Gate B / activities: **PASS / frozen**
- Previous implementation conformance: **PASS**, but the affected implementation path must be rechecked after this repair
- Previous deterministic QA: **PASS**, but will be invalidated by this learner-facing repair and must be rerun
- Simulation A: **FAIL — 1 BLOCKER / 0 MAJOR / 0 MINOR**
- Simulations B/C: **NOT RUN**
- Release: **LOCKED**
- Book 1 complete: **false**

Simulation A report:
- `course/book1/lesson15-learner-simulation-a.md`

Finding:
- **SIM-A-01 BLOCKER** — Unit 48 A003 replaced the frozen source prescription notation/support with English/sanitized labels, so a strict Unit-44 learner can answer without learning to parse the required source prescription.

## Frozen requirement remains correct

Do **not** modify Gate B.

The frozen Unit-48 activity specification already requires, before the A003 questions:

- **一日4次** — four times per day;
- **3日份** — three-day supply;
- **份 fèn** — support-only supply/portion unit;
- **飯前**;
- **飯後**;
- **飯後30分鐘**;
- the contextual prescription header **健康診所**, visibly glossed/non-assessed, with 診 deferred;
- a source-prescription visual/data representation containing the source notation.

`份` remains support-only:
- no canonical vocabulary ownership;
- no canonical NEW-character ownership;
- no Search ownership;
- no Mega ownership;
- no handwriting ownership.

`健康診所` / 診 remain contextual only:
- no required answer;
- no handwriting requirement;
- no canonical ownership.

## Current defect

Current production uses learner-facing records equivalent to:

- `u48-prescription-support`: `4 times/day／3-day supply／飯前／飯後／飯後30分鐘`
- `u48-prescription-visual`: `Health Clinic｜4 times/day｜3-day supply｜飯後｜飯後30分鐘`

The implementation explicitly withholds the source supply-count glyph.

That is nonconformant because it removes the required source-reading support instead of scaffolding it safely.

## Required repair

Repair only the Unit-48 A003 learner-facing support/source-prescription representation so a strict prerequisite learner actually sees and learns to parse the frozen source notation.

At minimum:

### `u48-prescription-support`
Learner-facing support must explicitly include and explain:

- **一日4次** — four times per day
- **3日份** — three-day supply
- **份 fèn** — supply/portion unit used here; support-only
- **飯前** — before meals
- **飯後** — after meals
- **飯後30分鐘** — 30 minutes after meals

The card must make the Chinese notation readable before `u48-a003-s1`–`s3`.

### `u48-prescription-visual`
The learner-facing prescription representation must preserve the source data/notation, including:

- **健康診所** as contextual source header, visibly glossed/non-assessed;
- **一日4次**;
- **3日份**;
- **飯後**;
- **飯後30分鐘**.

Do not replace those with English-only strings.

A structured learner-facing prescription card is acceptable if the existing renderer has no literal image field, provided the source notation remains visible and source-faithful.

## Preserve the assessed A003 questions

Do not change the frozen A003 answers unless a direct conformance defect is found:

1. `u48-a003-s1` → **四次**
2. `u48-a003-s2` → **飯後30分鐘**
3. `u48-a003-s3` → **十二包**

The 12-packet answer remains arithmetic from 4 doses/day × 3 days; it does not create lexical ownership for 十二.

## Do not regress

Preserve:

- source-faithful A002 visual repair;
- all five semantic-listening repairs;
- support-only 您 / 好的，謝謝您。;
- all frozen lesson/step IDs;
- 42 canonical NEW lexical forms;
- only 幾 / 跟 as semantic expansions;
- 30 NEW formal characters;
- seven grammar rules;
- prerequisite direction;
- explain-before-test;
- handwriting lifecycle/locks;
- all 25 dialogue turns;
- A001/A002/A004/A005;
- review floors;
- delayed retrieval;
- Search/Mega behavior;
- Unit-48 cumulative closure;
- 一直 / 直 first-ownership migration;
- Book-2 Unit-1 saved-progress IDs/order.

## Verification in repair context

Run narrow checks sufficient to prove the repair itself:

- Unit 48 schema/validation;
- phrase/source-card reconstruction;
- TypeScript if renderer/schema changes;
- confirm `份` and `診` do not enter canonical ownership/Search/Mega/handwriting;
- confirm A003 answer keys still match the displayed source data;
- confirm no frozen IDs changed.

Do not claim full deterministic QA from narrow checks.

## Required outputs

After repair:

1. Persist the smallest production/schema/renderer/test changes needed.
2. Update `course/book1/completion.json`:
   - current stage returns to implementation repair/conformance;
   - implementation gate remains pending until fresh affected-path conformance;
   - deterministic QA becomes pending because learner-facing code changed;
   - Simulation A remains recorded as failed historical evidence until rerun;
   - release remains locked.
3. Prepare:
   - `course/book1/lesson15-simulation-a-repair-conformance-handoff.md`

That handoff must require an independent recheck of the repaired A003 source-prescription path against the unchanged frozen Gate-B specification, while also spot-checking that A002, semantic listening, 您, ownership, Search/Mega, and 一直/直 did not regress.

## Stop condition

Stop after the repair and conformance handoff are persisted.

Do **not**:
- perform the fresh conformance check in the repair context;
- rerun full deterministic QA yet;
- rerun Simulation A yet;
- run Simulations B/C;
- perform traceability/release audit;
- pass Gate C;
- merge;
- publish/deploy;
- mark Book 1 complete.
