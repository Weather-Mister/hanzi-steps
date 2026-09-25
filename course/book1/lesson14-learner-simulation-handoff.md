# Book 1 Lesson 14 — Fresh-context learner simulation handoff

Working PR: **#68**
Branch: `book1-lesson14-source-a`

Upstream status before simulation:
- Source gate: PASS
- Dependency gate: PASS
- Gate A: PASS
- Gate B: PASS
- Implementation conformance: PASS
- Deterministic QA: PASS on Feature QA run #418 / implementation head `206bb9d90f2a06d9b9f0f1aceda69fe0198e3673`

Required Stage 7 simulations must be performed in **three separate fresh ChatGPT contexts**.

Each simulator:
- reads the current PR head;
- does not rely on this development chat;
- does not read the other learner-simulation verdicts before completing its own independent review;
- does not merge or publish;
- returns BLOCKER / MAJOR / MINOR findings plus PASS/FAIL;
- PASS requires zero open BLOCKER and zero open MAJOR;
- persists only its own simulation report to PR #68 unless a later controller explicitly requests repair work.

If a simulator finds a BLOCKER or MAJOR, do not silently redefine a frozen upstream artifact. Record the smallest likely blast radius (LOCAL / ACTIVITY / UNIT / CROSS_UNIT / CURRICULUM / SOURCE) so the main development context can reopen the correct gate.

---

## Simulation A — strict prerequisite learner

Artifact:
`course/book1/lesson14-learner-simulation-a.md`

Fresh-chat prompt:

> Continue the Hanzi Steps Book 1 completion process from repository `Weather-Mister/hanzi-steps`, using draft PR #68.
>
> Perform **Stage 7 Learner Simulation A — strict prerequisite learner** for Book 1 Lesson 14 / Units 42–44.
>
> You are a learner who knows **exactly the published curriculum through Unit 41 and nothing from Unit 42 onward before beginning the batch**.
>
> Read:
> - `automation/book1/PROTOCOL.md`, Stage 7;
> - `course/book1/lesson14-curriculum-blueprint.md`;
> - frozen `course/book1/lesson14-activity-spec.md`;
> - `course/book1/lesson14-unit42-activity-spec.md`;
> - `course/book1/lesson14-unit43-activity-spec.md`;
> - `course/book1/lesson14-unit44-activity-spec.md`;
> - actual implementations `course/book1/unit42.ts`, `unit43.ts`, `unit44.ts`;
> - `course/index.json` and targeted earlier unit files only when necessary to verify whether something was genuinely known before Unit 42.
>
> Do not read any existing learner-simulation report before completing your own review.
>
> Simulate completing Units 42 → 43 → 44 in order. Search aggressively for:
> - vocabulary assumed known when it is not;
> - characters exposed or required before introduction;
> - grammar used before explanation;
> - support-language hidden prerequisites;
> - deferred proper names/glyphs becoming productive;
> - explanations that require future knowledge;
> - handwriting introduced too late;
> - dialogue/source adaptations that are incomprehensible with the actual prerequisite set;
> - review questions whose prerequisites were never taught.
>
> Return BLOCKER / MAJOR / MINOR findings and PASS/FAIL. PASS requires zero open BLOCKER and zero open MAJOR.
>
> Persist your independent report as `course/book1/lesson14-learner-simulation-a.md` and commit it to existing PR #68.
>
> Do not repair curriculum or implementation in this simulation context. Stop after persisting the independent report.

---

## Simulation B — adversarial test taker

Artifact:
`course/book1/lesson14-learner-simulation-b.md`

Fresh-chat prompt:

> Continue the Hanzi Steps Book 1 completion process from repository `Weather-Mister/hanzi-steps`, using draft PR #68.
>
> Perform **Stage 7 Learner Simulation B — adversarial test taker** for Book 1 Lesson 14 / Units 42–44.
>
> Read:
> - `automation/book1/PROTOCOL.md`, Stage 7;
> - frozen Lesson-14 activity packet;
> - actual `course/book1/unit42.ts`, `unit43.ts`, `unit44.ts`;
> - generated `course/index.json` only as needed.
>
> Do not read learner-simulation A or C reports before completing your own review.
>
> Act like a learner trying to break every question. For every select/listen/order/match/handwriting/review item, look for:
> - two defensible answers;
> - no defensible answer;
> - wrong answer key;
> - clues that reveal the answer without understanding Chinese;
> - implausible or malformed distractors;
> - contextual listening where multiple options are audible;
> - listening key not actually audible;
> - order tokens that cannot reconstruct the target exactly;
> - wording that tests curriculum metadata rather than Chinese;
> - misleading English;
> - pinyin/Traditional-character errors;
> - answer choices that rely on untaught material;
> - mismatch between the frozen spec and runtime implementation.
>
> Include the Unit-42, Unit-43 and Unit-44 reviews and the Lesson-14 capstone.
>
> Return BLOCKER / MAJOR / MINOR findings and PASS/FAIL. PASS requires zero open BLOCKER and zero open MAJOR.
>
> Persist your independent report as `course/book1/lesson14-learner-simulation-b.md` and commit it to existing PR #68.
>
> Do not repair curriculum or implementation in this simulation context. Stop after persisting the independent report.

---

## Simulation C — cumulative learner

Artifact:
`course/book1/lesson14-learner-simulation-c.md`

Fresh-chat prompt:

> Continue the Hanzi Steps Book 1 completion process from repository `Weather-Mister/hanzi-steps`, using draft PR #68.
>
> Perform **Stage 7 Learner Simulation C — cumulative learner** for Book 1 Lesson 14 / Units 42–44.
>
> Read:
> - `automation/book1/PROTOCOL.md`, Stage 7;
> - frozen Lesson-14 blueprint and activity packet;
> - actual Units 42–44;
> - `course/index.json`;
> - Pinyin Search / Mega Challenge / practice-engine implementation or tests only as necessary to verify learner progression.
>
> Do not read learner-simulation A or B reports before completing your own review.
>
> Simulate a learner completing the entire batch sequentially and then using review/practice systems. Focus on:
> - whether Unit 42 material is retrieved in Units 43/44;
> - whether Unit 43 duration/imminence survives into Unit 44;
> - whether all 30 canonical NEW vocabulary items enter Search/Mega at the correct time;
> - whether 想 / 快 / 要 retain prior ownership while their Lesson-14 senses are actually practiced;
> - whether reviews are balanced rather than redundant;
> - whether all 21 NEW characters receive meaningful later retrieval;
> - whether the final capstone really samples all four Lesson-14 outcomes;
> - whether cumulative comparison mixes 比 / 比較 / 更 / 跟…一樣 / 沒有…那麼 coherently;
> - whether practice systems expose anything before it is learned or fail to include intended material afterward.
>
> Return BLOCKER / MAJOR / MINOR findings and PASS/FAIL. PASS requires zero open BLOCKER and zero open MAJOR.
>
> Persist your independent report as `course/book1/lesson14-learner-simulation-c.md` and commit it to existing PR #68.
>
> Do not repair curriculum or implementation in this simulation context. Stop after persisting the independent report.

---

## After all three

Return to the main development context.

The main context must:
1. verify all three reports exist on the same current PR history;
2. triage every finding;
3. reopen the smallest affected gate for any BLOCKER/MAJOR;
4. fix and rerun affected deterministic QA if necessary;
5. if all three PASS, advance to Stage 8 bidirectional traceability.
