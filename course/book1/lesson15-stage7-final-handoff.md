# Book 1 Lesson 15 — Stage 7 Final Learner-Simulation Handoff

Working repository: `Weather-Mister/hanzi-steps`  
Working PR: **#69**  
Working branch: `book1-lesson15-source-a`

Current checkpoint: **Stage 7 ready after deterministic QA rerun 3 PASS**.

## Upstream state

- Source gate: PASS
- Dependency gate: PASS
- Gate A / curriculum: PASS / frozen
- Gate B / activities: PASS / frozen
- Implementation gate: PASS
- latest repair conformance: PASS
- deterministic QA rerun 3: PASS — 0 BLOCKER / 0 MAJOR / 0 MINOR
- authoritative QA run: Feature QA #654 / id 36236868785 / SUCCESS
- regression suite: 200 tests / 199 pass / 0 fail / 1 intentional skip
- generated-only follow-up: 8c0f9a7505404dba1e02425f59cac28eabba6feb
- follow-up #655: action_required / no executable QA job
- release: LOCKED
- Book 1 complete: false

Historical Simulation-A failure reports remain evidence only:
- `lesson15-learner-simulation-a.md`
- `lesson15-learner-simulation-a-rerun.md`
- `lesson15-learner-simulation-a-rerun2.md`

Do not read them before the new independent Simulation A.

## Fast Stage-7 execution

1. Run **Simulation A final rerun** in a fresh chat.
2. If and only if A PASSes with 0 BLOCKER / 0 MAJOR, launch **Simulation B and Simulation C in parallel in two separate fresh chats**.
3. B and C must not read A or each other's reports before completing their independent reviews.
4. Return to the controller only after A, B, and C all exist.

## Simulation A final rerun — strict prerequisite learner

Persist:
- `course/book1/lesson15-learner-simulation-a-final.md`

Fresh-chat instruction:

> Use PR #69 and `course/book1/lesson15-stage7-final-handoff.md`. Perform **Lesson 15 Stage 7 — Simulation A final rerun: strict prerequisite learner** from scratch.
>
> Assume the learner knows exactly Book 1 through Unit 44 and nothing from Units 45–48 or Book 2 before starting.
>
> Do not read any historical Simulation-A report before completing the independent rerun.
>
> Read the protocol Stage 7, frozen Lesson-15 curriculum/activity packet, current Units 45–48, `course/book1/lesson15-simulation-a-rerun2-repair-conformance.md`, and `course/book1/lesson15-deterministic-qa-rerun3.md`.
>
> Simulate Units 45→46→47→48 in order. Aggressively check hidden prerequisites, vocabulary/characters/grammar before explanation, support-only material becoming productive, handwriting timing, assessment distractors exposing future targets, prerequisite direction, A001–A005, A002 visual roles, semantic listening, review floors, delayed retrieval, Search/Mega implications, and Unit-48 cumulative closure.
>
> Explicitly re-scan every learner-facing assessed option/distractor for future Lesson-15 vocabulary, later-owned formal characters, later grammar/support, or unsupported/deferred glyph leakage. Verify the 20 repaired listening payloads remain learner-safe and match the frozen intended semantics.
>
> Reconfirm the repaired Unit-46 幾 path, Unit-47 好幾次 dependency, repaired A003 source notation/isolation, A002 visuals, five protected semantic-listening items, support-only 您, 42 canonical NEW lexical forms, 30 NEW formal characters, seven grammar rules, all handwriting lifecycles/locks, all 25 dialogue turns, A001–A005, review/delayed retrieval, Search/Mega behavior, Unit-48 closure, and 一直/直 migration.
>
> Return BLOCKER / MAJOR / MINOR findings and PASS/FAIL. PASS requires 0 open BLOCKER and 0 open MAJOR.
>
> Persist only `course/book1/lesson15-learner-simulation-a-final.md` and stop. Do not repair anything or run B/C.

## Simulation B — adversarial test taker

Run only after Simulation A final PASS. Use a separate fresh chat.

Persist:
- `course/book1/lesson15-learner-simulation-b.md`

Fresh-chat instruction:

> Use PR #69 and `course/book1/lesson15-stage7-final-handoff.md`. Perform **Lesson 15 Stage 7 — Simulation B: adversarial test taker** independently.
>
> Do not read Simulation A or C reports before completing the review.
>
> Attack every learner-facing assessed payload across Units 45–48: select, listen, order, match, handwriting/retrieval, grammar checks, source-transfer checks, reviews and capstones.
>
> Search for two defensible answers, no defensible answer, wrong keys, accidental clues, malformed distractors, token multiplicity errors, pinyin/Traditional-character mistakes, semantic-listening mismatches, order tokens that cannot reconstruct the taught phrase, unsupported/untaught material, future-target distractor leakage, metadata being tested instead of Chinese, or divergence from the frozen activity spec.
>
> Explicitly stress-test A001 arithmetic/source-table data, A002 three distinct visual prompts and shared suggestion bank, A003 prescription arithmetic/data, A004 all three source outcomes, A005 four health-condition questions, all semantic listening, the repaired learner-safe listening distractors, `u48-a002-explain`, and Unit-48 cumulative/capstone items.
>
> Return BLOCKER / MAJOR / MINOR findings and PASS/FAIL. PASS requires 0 open BLOCKER and 0 open MAJOR.
>
> Persist only `course/book1/lesson15-learner-simulation-b.md` and stop. Do not repair anything.

## Simulation C — cumulative learner

Run only after Simulation A final PASS. May run in parallel with B, but in a different fresh chat.

Persist:
- `course/book1/lesson15-learner-simulation-c.md`

Fresh-chat instruction:

> Use PR #69 and `course/book1/lesson15-stage7-final-handoff.md`. Perform **Lesson 15 Stage 7 — Simulation C: cumulative learner** independently.
>
> Do not read Simulation A or B reports before completing the review.
>
> Simulate completing Units 45→46→47→48, then using review, Pinyin Search, adaptive practice and Mega Challenge.
>
> Verify all 42 canonical NEW forms enter Search/Mega at intended ownership and not before; 幾 and 跟 retain earlier canonical ownership while their Lesson-15 expansions are actually taught/practiced; 一直/直 first-own in Unit 45 while Book-2 Unit-1 remains later review; support-only 您/對不起/份/分鐘/names/deferred glyphs stay non-canonical; all 30 NEW characters receive meaningful recognition/handwriting/retrieval with locks; delayed retrieval works across units; all 25 dialogue turns and A001–A005 survive cumulatively; repaired listening distractors do not leak future targets; Unit-48 review genuinely closes Lesson 15; and Search/Mega/practice expose nothing before learning and omit nothing intended afterward.
>
> Return BLOCKER / MAJOR / MINOR findings and PASS/FAIL. PASS requires 0 open BLOCKER and 0 open MAJOR.
>
> Persist only `course/book1/lesson15-learner-simulation-c.md` and stop. Do not repair anything.

## Controller after A/B/C

If all three genuinely PASS:
- advance immediately to Stage 8 bidirectional traceability;
- do not add another learner-simulation repair loop;
- keep release locked until traceability + hostile release audit + Gate C.

If any finds BLOCKER/MAJOR:
- reopen only the smallest affected gate;
- repair in one combined repair → conformance → deterministic-QA loop.
