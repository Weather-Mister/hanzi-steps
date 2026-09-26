# Book 1 Lesson 15 — Fresh-context learner simulation handoff

Working PR: **#69**  
Branch: `book1-lesson15-source-a`

Upstream status before simulation:
- Source gate: PASS
- Dependency gate: PASS
- Gate A: PASS
- Gate B: PASS
- Implementation conformance: PASS after re-audit2
- Deterministic QA: PASS on Feature QA run **#615** / final authored repair head `b6fd19faff87bfe42e075cc94d95a7b1241b68f9`
- Generated-artifact follow-up: `73ac28d0f09595bff45836dcea9351beb7a4c222`
- Release: LOCKED
- Book 1 complete: FALSE

Required Stage 7 simulations must be performed in **three separate fresh ChatGPT contexts**.

Each simulator:
- reads the current PR head and the frozen Lesson-15 artifacts;
- does not rely on this Stage-6 development context;
- does not read the other learner-simulation verdicts before completing its own independent review;
- does not repair curriculum/implementation in the simulation context;
- does not merge or publish;
- reports BLOCKER / MAJOR / MINOR findings plus PASS/FAIL;
- requires zero open BLOCKER and zero open MAJOR for PASS;
- persists only its own simulation report to PR #69.

If a simulator finds a BLOCKER or MAJOR, record the smallest likely blast radius (LOCAL / ACTIVITY / UNIT / CROSS_UNIT / CURRICULUM / SOURCE). Do not silently redefine a frozen upstream artifact.

---

## Simulation A — strict prerequisite learner

Artifact:
`course/book1/lesson15-learner-simulation-a.md`

Fresh-chat prompt:

> Use PR #69 and `course/book1/lesson15-learner-simulation-handoff.md`. Perform **Lesson 15 Stage 7 — Simulation A: strict prerequisite learner** exactly as instructed.
>
> You are a learner who knows **exactly the published production curriculum through Book 1 Unit 44 and nothing from Units 45–48 or Book 2 before beginning this batch**.
>
> Read:
> - `automation/book1/PROTOCOL.md`, Stage 7;
> - `course/book1/lesson15-curriculum-blueprint.md`;
> - frozen `course/book1/lesson15-activity-spec.md`;
> - frozen Unit 45, 46, 47 and 48 activity-spec files;
> - actual `course/book1/unit45.ts`, `unit46.ts`, `unit47.ts`, `unit48.ts`;
> - current `course/index.json`;
> - targeted earlier-unit files only when necessary to prove whether something was genuinely known by Unit 44.
>
> Do not read Simulation B or C reports before completing your independent review.
>
> Simulate Units **45 → 46 → 47 → 48** in order. Aggressively look for hidden prerequisites, vocabulary/characters/grammar used before explanation, support material becoming productive, handwriting before ownership, bad prerequisite direction, and source activities that a strict Unit-44 learner cannot perform.
>
> Explicitly check:
> - all **42** canonical NEW lexical forms;
> - all **30** NEW formal characters;
> - all seven new grammar rules;
> - `幾` and `跟` as expansions without re-ownership;
> - the `一直 / 直` migration without any Book-2 prerequisite;
> - support-only `您`, `對不起`, `份`, `分鐘`, prescription-header context, proper names and deferred glyphs;
> - A001–A005 timing and prerequisites;
> - A002's three distinct source visual inputs and acceptance/rejection roles;
> - the five semantic-listening items;
> - explain-before-test sequencing, review floors, delayed retrieval, and Unit-48 cumulative closure.
>
> Return BLOCKER / MAJOR / MINOR findings and PASS/FAIL. PASS requires zero open BLOCKER and zero open MAJOR.
>
> Persist the independent report as `course/book1/lesson15-learner-simulation-a.md` on existing PR #69 and stop.
>
> Do not repair implementation, do not run Simulation B/C, and do not perform traceability, release audit, Gate C, merge, publish, or Book-1 completion.

---

## Simulation B — adversarial test taker

Artifact:
`course/book1/lesson15-learner-simulation-b.md`

Fresh-chat prompt:

> Use PR #69 and `course/book1/lesson15-learner-simulation-handoff.md`. Perform **Lesson 15 Stage 7 — Simulation B: adversarial test taker** exactly as instructed.
>
> Read:
> - `automation/book1/PROTOCOL.md`, Stage 7;
> - frozen Lesson-15 blueprint/activity packet and Unit 45–48 activity specs;
> - actual `course/book1/unit45.ts` through `unit48.ts`;
> - `course/index.json` only as needed.
>
> Do not read Simulation A or C reports before completing your independent review.
>
> Attack every learner-facing assessed payload across Units 45–48: select, listen, order, match, handwriting/retrieval, grammar checks, source-transfer checks, reviews and capstones.
>
> Search for:
> - two defensible answers or no defensible answer;
> - wrong keys, accidental clues, malformed distractors or token multiplicity errors;
> - pinyin/Traditional-character mistakes;
> - semantic-listening choices that do not match the full audio meaning;
> - sentence/order tokens that cannot reconstruct the taught phrase;
> - unsupported or untaught answer material;
> - wording that tests internal curriculum metadata instead of Chinese;
> - divergence from the frozen activity specification.
>
> Explicitly stress-test A001 arithmetic/source-table data, A002 three distinct visual prompts and shared suggestion bank, A003 prescription arithmetic/data, A004 all three source outcomes, A005 four health-condition questions, the five semantic-listening items, the `u48-a002-explain` reconstruction repaired in Stage 6, and Unit-48 cumulative/capstone items.
>
> Return BLOCKER / MAJOR / MINOR findings and PASS/FAIL. PASS requires zero open BLOCKER and zero open MAJOR.
>
> Persist the independent report as `course/book1/lesson15-learner-simulation-b.md` on existing PR #69 and stop.
>
> Do not repair implementation, do not run Simulation A/C, and do not perform traceability, release audit, Gate C, merge, publish, or Book-1 completion.

---

## Simulation C — cumulative learner

Artifact:
`course/book1/lesson15-learner-simulation-c.md`

Fresh-chat prompt:

> Use PR #69 and `course/book1/lesson15-learner-simulation-handoff.md`. Perform **Lesson 15 Stage 7 — Simulation C: cumulative learner** exactly as instructed.
>
> Read:
> - `automation/book1/PROTOCOL.md`, Stage 7;
> - frozen Lesson-15 blueprint and activity packet;
> - actual Units 45–48;
> - current `course/index.json`;
> - Pinyin Search / Mega Challenge / practice-engine implementation or tests only as needed to verify learner progression.
>
> Do not read Simulation A or B reports before completing your independent review.
>
> Simulate a learner completing **45 → 46 → 47 → 48**, then using review, Pinyin Search, adaptive practice and Mega Challenge.
>
> Focus on:
> - whether all **42** canonical NEW forms enter Search/Mega at the intended owning lesson and not before;
> - whether `幾` and `跟` retain prior canonical ownership while their Lesson-15 expansions are actually taught/practiced;
> - whether `一直 / 直` now correctly first-own in Unit 45 while Book-2 Unit-1 still works as later review;
> - whether support-only `您`, `對不起`, `份`, `分鐘`, names and deferred glyphs stay out of canonical ownership;
> - whether all **30** NEW characters receive meaningful recognition/handwriting/retrieval and their locks hold;
> - whether Unit-45 material is delayed into Units 46–48, Unit-46 material into 47–48, and Unit-47 material into 48;
> - whether A001–A005 and all 25 dialogue turns survive cumulatively;
> - whether the Unit-48 review genuinely closes Lesson 15 rather than over-repeating recent material;
> - whether Search/Mega/practice expose nothing before learning and omit nothing intended afterward.
>
> Return BLOCKER / MAJOR / MINOR findings and PASS/FAIL. PASS requires zero open BLOCKER and zero open MAJOR.
>
> Persist the independent report as `course/book1/lesson15-learner-simulation-c.md` on existing PR #69 and stop.
>
> Do not repair implementation, do not run Simulation A/B, and do not perform traceability, release audit, Gate C, merge, publish, or Book-1 completion.

---

## Controller action after all three simulations

Return to the main development context only after all three reports exist on the same PR history.

The controller must:
1. verify all three independent reports exist;
2. triage every finding;
3. reopen the smallest affected upstream gate for any BLOCKER/MAJOR;
4. repair and rerun affected deterministic QA if necessary;
5. advance to Stage 8 bidirectional traceability **only if all three simulations genuinely PASS**.

Do not merge or publish at Stage 7.
