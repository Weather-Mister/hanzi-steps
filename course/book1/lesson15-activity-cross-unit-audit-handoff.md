# Book 1 Lesson 15 — Activity Audit 3 Handoff: Cross-Unit Coherence

Working repository: `Weather-Mister/hanzi-steps`  
Working draft PR: **#69**  
Working branch: `book1-lesson15-source-a`

Checkpoint: **Stage 4 activity engineering is complete; Gate B is pending.**

This audit tests the complete Units 45–48 packet as one learning sequence. Do not judge units in isolation.

## Required reading

Read:
1. `automation/book1/PROTOCOL.md`, Stage 4 / Gate B.
2. `ADDING_A_UNIT.md`.
3. `course/book1/lesson15-source-ledger.md`.
4. `course/book1/lesson15-dependency-ledger.md`.
5. frozen `course/book1/lesson15-curriculum-blueprint.md`.
6. `course/book1/lesson15-activity-spec.md`.
7. all four unit specs:
   - `course/book1/lesson15-unit45-activity-spec.md`
   - `course/book1/lesson15-unit46-activity-spec.md`
   - `course/book1/lesson15-unit47-activity-spec.md`
   - `course/book1/lesson15-unit48-activity-spec.md`
8. `course/book1/completion.json`.
9. `course/index.json` through Book 1 Unit 44 and targeted prior units only when needed.

## Audit objective

Determine whether Units 45→46→47→48 form one coherent, cumulative Lesson-15 progression with no ownership leaks, hidden prerequisites, missing delayed retrieval, duplicated first teaching, or cross-unit contradiction.

## Mandatory cross-unit checks

### Ownership
- exactly 42 canonical NEW lexical forms across the batch;
- only 2 lexical semantic EXPANSION records: 幾 and 跟;
- exactly 30 NEW formal characters;
- exactly 7 formal grammar rules;
- no duplicate first ownership for known characters or earlier lexical forms;
- 一直 / 直 migration to Lesson 15 is explicitly preserved as an implementation requirement, never treated as Book-2 prior knowledge.

### Expansion/Search/Mega behavior
- 幾 remains canonically Unit 7 “how many”; Lesson-15 few/several sense does not leak into earlier Search/Mega.
- 跟 remains canonically Unit 24 “with”; Lesson-15 recipient sense does not leak into earlier Search/Mega.
- neither receives a second canonical NEW row or second Mega ownership;
- support-only 您 / 份 and deferred source glyphs never gain canonical Search/Mega ownership;
- owning-lesson completion gates Mega and standalone handwriting access for new Lesson-15 material.

### Prerequisite direction
Verify every frozen edge remains backward-pointing:
- 幾 expansion → G001;
- 幾 + 次 → 好幾次;
- 把 + 別 + prior support → G002;
- G002 → A004;
- prior verbal-了 / 一…就… / 以後 → G003;
- G004 → G006;
- G005 + G006 + support → A001;
- 生病 / 睡覺 / 看病 / 回家 → G007;
- prescription supports → A003.

No later unit may be needed to solve an earlier unit question.

### Dialogue timing
Trace all 25 source turns:
- D1T01–D1T05 Unit 45;
- D1T06–D1T12 Unit 46;
- D2T01–D2T07 Unit 47;
- D2T08–D2T13 Unit 48.
Confirm every turn appears only after its lexical/grammar/support prerequisites. Confirm D2T13 is staged so the G006 branch can appear before the full G007 line without treating G007 as already known.

### Lifecycle continuity
For every important target, check:
- owning-unit explanation and controlled/contextual practice;
- owning-unit retrieval;
- later-unit delayed retrieval;
- Unit-48 cumulative mixing where appropriate.

Pay special attention to:
- Unit-45 symptom/duration language resurfacing in Units 46–48;
- Unit-46 幾 expansion resurfacing in 好幾次 and final sense contrast;
- Unit-46 G001/G002/modal 得 resurfacing later;
- Unit-47 G003 and health-help pragmatics resurfacing in Unit 48;
- G004 reused before/inside G006;
- G005/G006 reused in A001;
- earlier separable lexical items feeding G007.

### Character continuity
- all 30 NEW characters have one first teaching lesson;
- all are handwriting-retrieved in owning-unit reviews;
- no later unit assumes handwriting before first teaching;
- known component characters are not accidentally re-owned;
- deferred proper-name/support glyphs never become handwriting requirements.

### Source activities
Confirm all five source activities have complete cross-unit support:
- A004 in Unit 46 after G002;
- A005 in Unit 47 after health inquiry/symptom language;
- A002 in Unit 48 after advice/refusal/concern language;
- A001 after G005/G006 and bowl/time support;
- A003 after prescription support.

Confirm Unit 48 capstone revisits A004/A005 functions rather than treating them as forgotten earlier-unit tasks.

### Review/cumulative floors
Verify each unit review meets its declared floor without filler:
- U45 ≥30, ≥3 listening, all 12 NEW words + 12 chars;
- U46 ≥30, ≥3 listening, all 10 NEW + 幾 expansion + 9 chars + G001/G002;
- U47 ≥30, ≥3 listening, all 12 NEW + 8 chars + G003;
- U48 ≥40, ≥3 listening, all 8 NEW + 跟 expansion + 冰 + G004–G007 + source transfers/capstone.

Check that retrieval is independent enough to count and that duplicated/reused items are intentionally delayed/cumulative rather than accidental repetition.

### Pragmatics/outcomes
Trace F001–F004:
- F001 established U45, completed U47, capstoned U48;
- F002 established U45, completed U46/U47, capstoned U48;
- F003 established U46, completed U48;
- F004 established U47, completed U48.
Verify S001–S004 in the final review actually exercise those functions.

### Deferred/source-context safety
Across all units, verify:
- names/place labels may be contextual where frozen Gate A permits;
- no deferred glyph silently becomes required because it appears in a later order/select/listen answer;
- A001 preserves 臺南 and exact source data without promoting names to vocabulary;
- A002 preserves source visual ownership without invented fixed picture content;
- culture is explicitly source-era.

## Findings and verdict

Record **BLOCKER / MAJOR / MINOR** findings with:
- exact files and cross-unit path;
- earliest point where the inconsistency appears;
- smallest safe repair;
- blast radius.

PASS requires:
- open BLOCKER = 0;
- open MAJOR = 0.

If a defect is local to activity engineering, repair the smallest affected activity-spec artifact and re-audit the relevant cross-unit path. If the correction moves source ownership, changes unit boundaries, or changes frozen prerequisites, reopen Gate A instead.

Persist:
`course/book1/lesson15-activity-cross-unit-audit.md`

Update completion state for this audit only. Do not run the other activity audits in this context. Do not pass Gate B unless all three required audits separately pass. Do not implement Units 45–48.
