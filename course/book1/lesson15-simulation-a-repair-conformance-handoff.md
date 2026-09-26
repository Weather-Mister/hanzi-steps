# Book 1 Lesson 15 — Simulation A Repair Conformance Handoff

Working repository: `Weather-Mister/hanzi-steps`  
Working draft PR: **#69**  
Working branch: `book1-lesson15-source-a`

Current checkpoint: **SIM-A-01 narrow implementation repair applied; fresh affected-path implementation conformance required before deterministic QA can be rerun**.

## Gate/state

- Source gate: **PASS**
- Dependency gate: **PASS**
- Gate A / curriculum: **PASS / frozen**
- Gate B / activities: **PASS / frozen and unchanged**
- Implementation: **PENDING fresh affected-path conformance**
- Previous deterministic QA: **historical PASS only; now pending because learner-facing code changed**
- Simulation A: **historical FAIL — 1 BLOCKER / 0 MAJOR / 0 MINOR; not rerun**
- Simulations B/C: **NOT RUN**
- Release: **LOCKED**
- Book 1 complete: **false**

Repair source:
- `course/book1/lesson15-simulation-a-repair-handoff.md`

Frozen reference:
- `course/book1/lesson15-unit48-activity-spec.md`
- `course/book1/lesson15-activity-spec.md`

Historical Simulation A evidence:
- `course/book1/lesson15-learner-simulation-a.md`

## Repair applied

The repair is intentionally narrow and touches only the learner-facing Unit-48 A003 support/source representation plus completion/handoff state.

### `u48-prescription-support`

Now explicitly presents before A003:

- **一日4次** — yí rì sì cì — four times per day
- **3日份** — sān rì fèn — three-day supply
- **份 fèn** — support-only supply/portion unit
- **飯前** — fànqián — before meals
- **飯後** — fànhòu — after meals
- **飯後30分鐘** — fànhòu sānshí fēnzhōng — 30 minutes after meals

The card explicitly states that 份 has no canonical vocabulary, Search, Mega, or handwriting ownership.

### `u48-prescription-visual`

Now preserves the learner-facing source prescription notation:

- **健康診所** — contextual source header; visibly glossed as Health Clinic, non-assessed; 診 deferred
- **一日4次**
- **3日份**
- **飯後**
- **飯後30分鐘**

The source notation is no longer replaced by English-only labels.

### Practice isolation

Both support/source phrase records use the existing empty-token practice opt-out. They remain learner-visible lesson cards but do not enter adaptive/Mega phrase practice. This keeps support-only **份** and deferred **診** from becoming productive practice targets.

No schema or renderer change was made.

## A003 assessed answers remain frozen

Do not change:

1. `u48-a003-s1` → **四次**
2. `u48-a003-s2` → **飯後30分鐘**
3. `u48-a003-s3` → **十二包**

The third answer remains the source arithmetic **4 doses/day × 3 days = 12 packets** and does not create lexical ownership for 十二.

## Required fresh conformance check

Independently compare the repaired production path against the unchanged frozen Gate-B specification. Do not accept the repair merely because this handoff describes it.

You must verify:

1. `u48-prescription-support` teaches the exact frozen Chinese prescription notation before any A003 assessed item.
2. `u48-prescription-visual` visibly preserves **健康診所 / 一日4次 / 3日份 / 飯後 / 飯後30分鐘** and visibly glosses 健康診所 as contextual/non-assessed with 診 deferred.
3. **份** is support-only and **診** is deferred/contextual:
   - neither is canonical NEW vocabulary;
   - neither is canonical NEW character ownership;
   - neither is Search-owned;
   - neither is Mega-owned/productively practiced;
   - neither receives handwriting ownership.
4. The existing A003 answers remain exactly **四次 / 飯後30分鐘 / 十二包** and match the displayed source data.
5. The learner sees the support/source cards before `u48-a003-s1`–`s3`.
6. No frozen lesson/step IDs changed.

## Required regression spot-checks

Spot-check that this narrow repair did not regress:

- the three distinct source-faithful A002 visual roles/scenes and shared suggestion bank;
- all five semantic-listening repairs;
- support-only 您 / 好的，謝謝您。;
- 42 canonical NEW lexical forms and only 幾 / 跟 as semantic expansions;
- 30 NEW formal characters;
- seven grammar rules;
- prerequisite direction and explain-before-test;
- handwriting lifecycle/locks;
- all 25 dialogue turns;
- A001/A004/A005;
- review floors and delayed retrieval;
- Search/Mega ownership behavior outside the intended support-card practice isolation;
- Unit-48 cumulative closure;
- 一直 / 直 first-ownership migration to Book 1 Unit 45 and Book-2 Unit-1 review-only status / saved-progress IDs/order.

## Conformance output/state

Persist:
- `course/book1/lesson15-simulation-a-repair-conformance.md`

If and only if the fresh conformance genuinely passes with **0 BLOCKER / 0 MAJOR**:
- set implementation gate back to **PASS**;
- keep deterministic QA **pending**;
- advance only to deterministic-QA rerun readiness;
- prepare the next deterministic-QA rerun handoff;
- keep Simulation A historical FAIL until it is actually rerun;
- keep release locked.

If any BLOCKER or MAJOR remains:
- keep implementation pending;
- reopen only the smallest affected implementation area;
- do not weaken Gate B.

## Stop condition

Stop after the fresh affected-path conformance report/state/handoff update.

Do **not**:
- run full deterministic QA in the conformance context;
- rerun Simulation A;
- run Simulations B/C;
- perform traceability/release audit;
- pass Gate C;
- merge;
- publish/deploy;
- mark Book 1 complete.
