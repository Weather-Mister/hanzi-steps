# Book 1 Lesson 15 — Simulation A Rerun MAJOR Repair Handoff

Working repository: `Weather-Mister/hanzi-steps`  
Working draft PR: **#69**  
Working branch: `book1-lesson15-source-a`

Current checkpoint: **Stage 7 Simulation A rerun failed; smallest affected upstream area reopened at Stage 5 implementation for a narrow Unit-46 幾-expansion explain-before-test repair**.

## Gate/state

- Source gate: **PASS**
- Dependency gate: **PASS**
- Gate A / curriculum: **PASS / frozen**
- Gate B / activities: **PASS / frozen**
- Implementation gate: **REOPENED / PENDING**
- Latest deterministic QA rerun: **historical PASS only; must be rerun after learner-facing repair**
- Historical Simulation A: **FAIL** retained
- Simulation A rerun: **FAIL — 0 BLOCKER / 1 MAJOR / 0 MINOR**
- Simulations B/C: **NOT RUN**
- Release: **LOCKED**
- Book 1 complete: **false**

Simulation A rerun report:
- `course/book1/lesson15-learner-simulation-a-rerun.md`

Open finding:
- **SIM-A-RERUN-01 MAJOR** — `u46-ji-explain` does not actually explain the frozen Unit-46 幾 expansion before `u46-ji-s1` assesses it.

## Frozen requirement remains correct

Do **not** modify Gate B.

The frozen Unit-46 activity specification explicitly requires, in `u46-nonspecific`:

1. EXPLAIN the 幾 expansion:
   - earlier known sense: interrogative **“how many?”**
   - Lesson-15 expansion: **“a few / several”** in a non-question/declarative context
2. then assess `u46-ji-s1`
3. then teach formal G001.

The canonical ownership model remains:
- 幾 canonical vocabulary ownership stays at **Unit 7**
- Unit 46 adds only the local semantic EXPANSION
- no second canonical Search/Mega row

## Current defect

Current learner sequence has:

- `u46-ji-explain`
  - type: phrase
  - phrase: `u46-g1-source`

The learner-facing payload behind `u46-g1-source` is **沒有什麼關係。** / “It's nothing serious / It doesn't matter much.”

That card:
- contains no 幾;
- does not explain **幾 = a few / several**;
- therefore cannot satisfy the frozen EXPLAIN requirement.

Immediately afterward:

- `u46-ji-s1` asks: **Which use of 幾 is the new Lesson-15 sense?**

So the expansion is tested before it is taught.

## Required repair

Repair only the narrow Unit-46 learner-facing explanation path.

### Preserve the frozen step ID

Keep:
- `u46-ji-explain`

Do not rename or delete it.

### Make `u46-ji-explain` genuinely teach the expansion

The learner-facing card must explicitly explain, before `u46-ji-s1`:

- **幾 jǐ**
- earlier known sense: **how many?**
- Lesson-15 expansion: **a few / several**
- this new sense occurs in a **statement / non-question context**
- canonical ownership remains the earlier Unit-7 form; this is a sense expansion, not a new word

Use a natural learner-facing example that is already source-safe under the frozen packet, such as:

- **她沒有幾個朋友。**
- interpretation: **She does not have many / has only a few friends.**

Do not introduce future vocabulary or grammar beyond what the frozen Unit-46 packet already permits.

### Preserve the assessment

Keep `u46-ji-s1` unchanged unless a direct deterministic defect is discovered:

- prompt: **Which use of 幾 is the new Lesson-15 sense?**
- correct answer: **幾 = a few/several in a statement**

### Preserve G001 sequencing

Formal `u46-noncommittal-question-words` still follows the 幾 expansion explanation/recognition step.

Do not collapse the expansion explanation into G001 or move the assessment after G001 as a workaround unless required by the frozen spec; the frozen sequence is already explicit and valid.

## Do not regress

Preserve all repaired/currently passing behavior:

- repaired A003 source prescription notation and practice isolation;
- source-faithful A002 visual roles;
- five semantic-listening repairs;
- support-only 您 / 好的，謝謝您。;
- 42 canonical NEW lexical forms;
- exactly two Lesson-15 semantic expansions: 幾 and 跟;
- 30 NEW formal characters;
- seven grammar rules;
- all frozen lesson/step IDs;
- prerequisite direction;
- handwriting lifecycle/locks;
- all 25 dialogue turns;
- A001/A002/A003/A004/A005;
- review floors;
- delayed retrieval;
- Search/Mega ownership behavior;
- Unit-48 cumulative closure;
- 一直 / 直 first-ownership migration;
- Book-2 Unit-1 saved-progress IDs/order.

## Narrow verification required in repair context

Verify:

1. `u46-ji-explain` is learner-facing and explicitly contains 幾 with the “a few / several” expansion.
2. It occurs before `u46-ji-s1`.
3. `u46-ji-s1` remains answerable from the immediately preceding explanation.
4. 幾 is not re-added to canonical NEW vocabulary ownership.
5. Search/Mega canonical ownership remains Unit 7.
6. Unit 47 `好幾次` now has a genuinely taught Unit-46 semantic prerequisite.
7. No frozen ID changes.
8. Unit-46 validation/TypeScript checks still pass as appropriate.

Do not claim full deterministic QA from these narrow checks.

## Required outputs

After repair:

1. Persist the minimal Unit-46 implementation/phrase/test changes.
2. Update `course/book1/completion.json`:
   - implementation gate remains pending until fresh affected-path conformance;
   - deterministic QA becomes pending;
   - preserve both historical Simulation-A reports as evidence;
   - Simulations B/C remain not run;
   - release remains locked.
3. Prepare:
   - `course/book1/lesson15-simulation-a-rerun-repair-conformance-handoff.md`

That conformance handoff must independently verify the repaired `u46-ji-explain` path against the unchanged frozen Unit-46 activity spec, plus regression spot-check A003, A002, semantic listening, 您, ownership, handwriting, review floors, Search/Mega, cumulative closure, and 一直/直.

## Stop condition

Stop after the repair and fresh affected-path conformance handoff are persisted.

Do **not**:
- perform the fresh conformance check in the repair context;
- run full deterministic QA;
- rerun Simulation A again;
- run Simulations B/C;
- perform traceability or hostile release audit;
- pass Gate C;
- merge;
- publish/deploy;
- mark Book 1 complete.
