# Book 1 Lesson 14 — Final learner-simulation rerun handoff

PR: **#68**
Branch: `book1-lesson14-source-a`

Final repaired status before Stage 7:
- Source gate: PASS
- Dependency gate: PASS
- Gate A: PASS
- Gate B: PASS after post-QA fresh Activity Audit 2 re-audit
- Implementation conformance: PASS
- Deterministic QA: PASS on Feature QA #459
- release: LOCKED

The earlier learner simulations are historical failure evidence and must **not** be reused as the final Stage-7 verdicts because the learner-facing packet changed afterward.

Run the following three simulations in **three separate fresh ChatGPT contexts**.

Do not read the other final learner-simulation rerun reports before completing your own independent simulation.

---

## Simulation A — strict prerequisite learner

Persist as:
`course/book1/lesson14-learner-simulation-a-final.md`

Prompt:

> Use PR #68 and `course/book1/lesson14-learner-simulation-rerun-handoff.md`. Perform the final Simulation A — strict prerequisite learner. Treat Unit 41 as the exact prior-knowledge boundary, simulate Units 42→43→44 in order, attack every prerequisite and explain-before-test edge, verify the repaired cross-unit order targets are actually taught earlier, persist the report as instructed, and stop. Do not read the other final simulation reports before finishing your own.

Key checks:
- Unit-42 spring listening does not expose future 秋天;
- no future character/word/grammar appears before teaching;
- G001→G002, 快/要→G003, G004→G005 sequencing is intact;
- Unit-44 delayed retrieval only references phrases actually taught earlier;
- Search results may be globally visible, but future writing practice cannot bypass character introduction.

Return BLOCKER / MAJOR / MINOR and PASS/FAIL. PASS requires zero open BLOCKER/MAJOR.

---

## Simulation B — adversarial test taker

Persist as:
`course/book1/lesson14-learner-simulation-b-final.md`

Prompt:

> Use PR #68 and `course/book1/lesson14-learner-simulation-rerun-handoff.md`. Perform the final Simulation B — adversarial test taker. Attack every learner-facing select/listen/order/match/review/capstone item in Units 42–44 for ambiguous keys, weak distractors, inaudible answers, broken order tokens, metadata-only questions, misleading English, bad pinyin/Traditional Chinese, or mismatch with the frozen activity packet. Persist the report as instructed and stop. Do not read the other final simulation reports before finishing your own.

Key checks:
- every contextual listening item has exactly one audible answer option;
- every order token bank reconstructs the referenced phrase exactly;
- every cross-unit order phrase was taught earlier;
- the final capstone requires Chinese construction rather than English curriculum metadata;
- Unit-44 review is exactly 41 steps.

Return BLOCKER / MAJOR / MINOR and PASS/FAIL. PASS requires zero open BLOCKER/MAJOR.

---

## Simulation C — cumulative learner

Persist as:
`course/book1/lesson14-learner-simulation-c-final.md`

Prompt:

> Use PR #68 and `course/book1/lesson14-learner-simulation-rerun-handoff.md`. Perform the final Simulation C — cumulative learner. Simulate completing Units 42→43→44 and then using Pinyin Search, handwriting practice, Mega Challenge, adaptive practice, reviews, delayed retrieval, and the final Lesson-14 capstone. Persist the report as instructed and stop. Do not read the other final simulation reports before finishing your own.

Key checks:
- Unit-42 material survives into Unit 44;
- Unit-43 duration/imminence and 想 “miss”, 新年/父母, 十二月底, 明年/紅葉 all receive meaningful delayed retrieval;
- all 30 canonical NEW forms enter Search globally and Mega at the correct lesson boundary;
- Search writing practice stays locked until the character's first teaching lesson;
- 想 / 快 / 要 keep earlier canonical ownership while Lesson-14 senses are practiced;
- all 21 NEW characters receive later retrieval;
- the four final capstone orders genuinely cover the four Lesson-14 outcomes.

Return BLOCKER / MAJOR / MINOR and PASS/FAIL. PASS requires zero open BLOCKER/MAJOR.

---

## After all three

Return to the main development context and say `done continue`.

The main context must verify all three final reports on the actual PR head, triage findings, rerun affected QA if necessary, then proceed to Stage 8 bidirectional traceability only if all three genuinely PASS.
