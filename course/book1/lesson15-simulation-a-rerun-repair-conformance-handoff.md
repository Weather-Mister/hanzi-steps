# Book 1 Lesson 15 — Simulation A Rerun Repair Conformance Handoff

Working repository: `Weather-Mister/hanzi-steps`  
Working draft PR: **#69**  
Working branch: `book1-lesson15-source-a`

Current checkpoint: **SIM-A-RERUN-01 narrow Unit-46 learner-facing repair applied; fresh affected-path implementation conformance required before deterministic QA can be rerun**.

## Gate/state

- Source gate: **PASS**
- Dependency gate: **PASS**
- Gate A / curriculum: **PASS / frozen**
- Gate B / activities: **PASS / frozen and unchanged**
- Implementation: **PENDING fresh affected-path conformance**
- Deterministic QA: **PENDING**; the latest rerun PASS is historical only because learner-facing code changed
- Historical Simulation A: **FAIL evidence preserved**
- Simulation A rerun: **historical FAIL — 0 BLOCKER / 1 MAJOR / 0 MINOR; not rerun after this repair**
- Simulations B/C: **NOT RUN**
- Release: **LOCKED**
- Book 1 complete: **false**

Repair source:
- `course/book1/lesson15-simulation-a-rerun-repair-handoff.md`

Frozen references:
- `course/book1/lesson15-unit46-activity-spec.md`
- `course/book1/lesson15-activity-spec.md`

Historical learner evidence:
- `course/book1/lesson15-learner-simulation-a.md`
- `course/book1/lesson15-learner-simulation-a-rerun.md`

Narrow implementation repair commit:
- `29c694c2385be730e11fee2bfbbcf481ca1b11bf`

## Repair applied

The frozen Unit-46 activity specification was not changed.

### `u46-ji-explain`

The frozen step ID remains exactly:
- `u46-ji-explain`

It now points to a dedicated learner-facing phrase record:
- `u46-ji-expansion`

That card explicitly teaches before `u46-ji-s1`:

- **幾 jǐ**
- earlier Unit-7 interrogative sense: **how many?**
- Lesson-15 semantic expansion: **a few / several**
- the expanded sense occurs in a **statement / non-question context**
- this is a semantic expansion of the already-owned Unit-7 word, not new canonical vocabulary

Learner-facing source-safe example:
- **她沒有幾個朋友。**
- `Tā méiyǒu jǐ ge péngyǒu.`
- **She does not have many friends / has only a few friends.**

### `u46-ji-s1`

The assessment remains unchanged:
- prompt: **Which use of 幾 is the new Lesson-15 sense?**
- answer: **幾 = a few/several in a statement**

The order remains:
1. `u46-ji-explain`
2. `u46-ji-s1`
3. formal `u46-noncommittal-question-words` / G001

Do not collapse the expansion explanation into G001 or move the assessment after G001.

## Ownership constraints that must remain true

Independently verify:
- 幾 canonical vocabulary ownership remains **Unit 7**
- Unit 46 adds only the local semantic **EXPANSION**
- no second canonical Search row is created
- no second Mega ownership is created
- no new Unit-46 handwriting ownership for 幾 is created
- the Unit-7 interrogative sense remains intact
- Unit 47 `好幾次` now has a genuinely taught Unit-46 semantic prerequisite

## Required fresh conformance check

Independently compare the repaired learner-facing implementation against the unchanged frozen Gate-B Unit-46 specification. Do not accept this handoff as proof.

Verify at minimum:

1. `u46-ji-explain` is learner-facing and explicitly contains **幾 jǐ**.
2. It explicitly contrasts earlier **how many?** with Lesson-15 **a few / several**.
3. It explicitly identifies the expanded use as statement/non-question usage.
4. The source-safe example **她沒有幾個朋友。** carries the intended only-a-few interpretation.
5. `u46-ji-explain` occurs before unchanged `u46-ji-s1`.
6. `u46-ji-s1` is answerable directly from the immediately preceding explanation.
7. Formal G001 still follows the expansion explanation/recognition step.
8. 幾 is not re-added as canonical NEW vocabulary, Search ownership, Mega ownership, or handwriting ownership.
9. Unit 47 `好幾次` has the intended prerequisite direction through the Unit-46 expansion.
10. No frozen lesson/step IDs changed.

## Required regression spot-checks

Spot-check that the narrow Unit-46 repair did not regress:

- repaired A003 source notation and practice isolation:
  - 一日4次
  - 3日份
  - support-only 份 fèn
  - 飯前 / 飯後 / 飯後30分鐘
  - contextual/glossed/non-assessed 健康診所
  - deferred 診
  - answers 四次 / 飯後30分鐘 / 十二包
- the three distinct source-faithful A002 visual roles/scenes;
- all five semantic-listening repairs;
- support-only 您 / 好的，謝謝您。;
- 42 canonical NEW lexical forms;
- exactly the Lesson-15 幾 / 跟 semantic expansion model;
- 30 NEW formal characters;
- seven grammar rules;
- prerequisite direction and explain-before-test;
- handwriting lifecycle/locks;
- all 25 dialogue turns;
- A001/A002/A003/A004/A005;
- review floors and delayed retrieval;
- Search/Mega ownership behavior;
- Unit-48 cumulative closure;
- 一直 / 直 first-ownership migration to Book 1 Unit 45 and Book-2 Unit-1 review-only/saved-progress behavior.

## Narrow technical verification

Confirm the repaired Unit-46 module remains structurally valid and that the targeted Unit-46 validation / TypeScript checks pass if available in the affected-path conformance context.

Do **not** treat any narrow check as the full deterministic suite. Full deterministic QA remains a separate later stage.

## Conformance output/state

Persist:
- `course/book1/lesson15-simulation-a-rerun-repair-conformance.md`

If and only if fresh affected-path conformance genuinely passes with **0 BLOCKER / 0 MAJOR**:
- set implementation gate back to **PASS**;
- keep deterministic QA **pending**;
- advance only to deterministic-QA rerun readiness;
- prepare the next deterministic-QA rerun handoff;
- keep both historical Simulation-A reports as evidence;
- do not rerun Simulation A in the conformance context;
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
- perform traceability or hostile release audit;
- pass Gate C;
- merge;
- publish/deploy;
- mark Book 1 complete.
