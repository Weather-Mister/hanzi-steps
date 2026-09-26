# Book 1 Lesson 15 — Stage 7 Final Rerun Handoff

Working PR: **#69**  
Branch: `book1-lesson15-source-a`

Current checkpoint: **Stage 7 ready after final Simulation-A repairs + deterministic QA rerun 4 PASS**.

Authoritative QA:
- Feature QA #665 / id 36239036536 / SUCCESS
- final authored code/test head: `d1cd8a436e17aa9bb9124b44293542c7476ec6b1`
- 201 tests / 200 pass / 0 fail / 1 intentional skip
- TypeScript PASS
- Pages build PASS
- generated-only follow-up `f946e01a6e75ff20dc65963e5f1c2744eb41cfca`
- follow-up #666 action_required / no executable QA job

Latest repairs:
- Unit-45 `u45-review-f1` no longer exposes future NEW `回家`;
- Unit-47 G003 now reviews prerequisites first, teaches G003, then shows full D2T02;
- `u47-g3-order` is explicitly taught before `u47-g3-o1`.

Release remains locked. Book 1 remains incomplete.

## Simulation A — final rerun

Run in a **fresh chat** and persist:
- `course/book1/lesson15-learner-simulation-a-final2.md`

Prompt:

> Use PR #69 and `course/book1/lesson15-stage7-final2-handoff.md`. Perform **Lesson 15 Stage 7 — Simulation A final rerun 2: strict prerequisite learner** independently from scratch.
>
> Assume the learner knows exactly Book 1 through Unit 44 and nothing from Units 45–48 or Book 2.
>
> Do not read any historical Simulation-A reports before completing the independent rerun.
>
> Read the frozen/current Lesson-15 packet, current Units 45–48, `course/book1/lesson15-final-simulation-a-repair-conformance.md`, and `course/book1/lesson15-deterministic-qa-rerun4.md`.
>
> Simulate Units 45→46→47→48 in order. Aggressively check hidden prerequisites, all learner-facing assessed distractors/options for future-target leakage, explain-before-use/test, vocabulary/character/grammar sequencing, handwriting timing, support-only material, A001–A005, A002 visual roles, A003 support/isolation, semantic listening, review floors, delayed retrieval, Search/Mega implications, and Unit-48 cumulative closure.
>
> Explicitly retest:
> - `u45-review-f1`: no future `回家`; options are learner-safe;
> - Unit-47 G003: `u47-g3-review` contains prerequisite review only; `u47-vle-jiu` teaches G003 before full `u47-d2t02-full`; full source appears only after `u47-g3-s4`; `u47-g3-order` is taught before `u47-g3-o1`;
> - the repaired Unit-46 幾 path and Unit-47 好幾次 dependency;
> - the 20 learner-safe listening repairs;
> - the five protected semantic-listening items;
> - repaired A003 notation / `practice:false` isolation;
> - A002 visuals;
> - support-only 您;
> - 42 NEW lexical forms, 30 NEW formal characters, seven grammar rules;
> - all 30 handwriting lifecycles/locks;
> - all 25 dialogue turns;
> - 一直 / 直 migration.
>
> Return BLOCKER / MAJOR / MINOR findings and PASS/FAIL. PASS requires 0 open BLOCKER and 0 open MAJOR.
>
> Persist only `course/book1/lesson15-learner-simulation-a-final2.md` and stop. Do not repair anything and do not run B/C.

## If A PASSes

Run Simulation B and C **in parallel in two separate fresh chats** using the B/C instructions from `course/book1/lesson15-stage7-final-handoff.md`.

Do not wait between B and C.

After all three PASS, return to the controller for Stage 8 traceability.
