# Book 1 Lesson 15 — Final Simulation-A Repair Conformance

Working PR: **#69**  
Branch: `book1-lesson15-source-a`

## Verdict

**PASS — 0 BLOCKER / 0 MAJOR / 0 MINOR**

This combined repair/conformance pass resolves both findings from `lesson15-learner-simulation-a-final.md`.

## SIM-A-FINAL-01 — PASS

The Unit-45 Gate-B payload for `u45-review-f1` was narrowly corrected and re-frozen.

Old future-target distractor:
- `什麼時候回家？`

New learner-safe distractor:
- `什麼東西都不想吃？`

The production Unit-45 payload now exactly matches the corrected Unit-45 activity specification:
- `哪裡不舒服？`
- `大概多久了？`
- `什麼東西都不想吃？`

Correct answer remains `哪裡不舒服？`. No ID, ownership, source routing, review count, or educational objective changed.

The replacement is already available by Unit 45 through the earlier Unit-40 totality pattern and is already retrieved elsewhere in Unit 45.

## SIM-A-FINAL-02 — PASS

The frozen Unit-47 Gate-B sequence was already correct and production was repaired to match it.

`u47-g3-review` now points to `u47-g3-prereq-review`, a non-productive review card covering:
- Unit-39 completed-action 了;
- Unit-38 一…就…;
- Unit-36 以後.

Then:
1. `u47-vle-jiu` teaches G003;
2. `u47-g3-s1`–`u47-g3-s4` provide controlled checks;
3. existing step `u47-g3-p1` now displays `u47-d2t02-full`;
4. only afterward do `u47-g3-s5`, listening, and ordering continue.

Thus the full source line containing `吃了東西就吐` is no longer shown before G003 instruction.

The review phrase has `practice:false` and does not create new ownership or productive practice.

## Regression protection

A deterministic guard now enforces:
- `u45-review-f1` contains no `回家` and uses the corrected safe options;
- `u47-g3-review` precedes G003 and points to the prerequisite review card;
- G003 precedes its assessments;
- the full D2T02 phrase appears only after `u47-g3-s4`;
- the full D2T02 phrase remains unchanged;
- the prerequisite review card cannot accidentally contain `吃了東西就吐`.

## Non-regression

The repair does not change:
- 42 canonical NEW lexical forms;
- 30 NEW formal characters;
- seven grammar rules;
- 幾 / 跟 expansion ownership;
- 一直 / 直 migration;
- A001–A005;
- A002 visuals;
- A003 support/isolation;
- semantic-listening repairs;
- support-only 您;
- handwriting lifecycle/locks;
- review floors;
- Search/Mega behavior;
- Unit-48 cumulative closure.

Gate decision:
- activities: **PASS / re-frozen after the one-item Unit-45 correction**
- implementation: **PASS**
- deterministic QA: **REQUIRED on final authored state**
- release: **LOCKED**
