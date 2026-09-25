# Book 1 Lesson 14 — Final learner-simulation rerun 2 handoff

PR: **#68**
Branch: `book1-lesson14-source-a`

Final repaired status:
- Source gate: PASS
- Dependency gate: PASS
- Gate A: PASS
- Gate B: PASS after fresh Activity Audit 2 re-audit 3
- Implementation conformance: PASS
- Deterministic QA: PASS on Feature QA #478
- Release: LOCKED

This is the **second and final Stage-7 rerun** after strict-prerequisite fixes.

The prior final learner-simulation reports are historical evidence only. They were produced before the current final code and must not serve as the final Stage-7 verdicts.

Run A, B, and C in **three separate fresh ChatGPT contexts**. Do not read either of the other rerun-2 reports before completing your own simulation.

---

## Simulation A — strict prerequisite learner

Persist as:
`course/book1/lesson14-learner-simulation-a-final2.md`

Prompt:

> Use PR #68 and `course/book1/lesson14-learner-simulation-rerun2-handoff.md`. Perform final-rerun-2 Simulation A — strict prerequisite learner. Treat Unit 41 as the exact prior-knowledge boundary and simulate Units 42→43→44 sequentially. Persist the report exactly as instructed and stop.

Mandatory checks:
- `u43-a002-s2` contains no future Lesson-14 NEW vocabulary/character/grammar;
- `你在臺灣住了半年嗎？` is prerequisite-safe and unambiguous as a distractor;
- no other assessed option exposes future Lesson-14 NEW material;
- no `practice-<character>` route can start before the character's first non-review teaching lesson;
- specifically verify direct character-library/detail practice for 葉 and 更;
- Pinyin Search remains globally visible while its writing actions obey the same gate;
- G001→G002, 快/要→G003, G004→G005 remain safe;
- repaired cross-unit order targets are still taught earlier.

Return BLOCKER / MAJOR / MINOR and PASS/FAIL. PASS requires zero open BLOCKER/MAJOR.

---

## Simulation B — adversarial test taker

Persist as:
`course/book1/lesson14-learner-simulation-b-final2.md`

Prompt:

> Use PR #68 and `course/book1/lesson14-learner-simulation-rerun2-handoff.md`. Perform final-rerun-2 Simulation B — adversarial test taker. Attack every learner-facing select/listen/order/match/review/capstone item in Units 42–44, including the repaired Unit-43 A002 item. Persist the report exactly as instructed and stop.

Mandatory checks:
- exactly one defensible answer per select/listen;
- no future NEW distractors;
- every listening answer is audible and uniquely represented;
- every order bank reconstructs its taught phrase exactly;
- no curriculum-metadata-only assessment;
- Unit-44 review remains exactly 41 steps;
- all final capstone items remain Chinese construction.

Return BLOCKER / MAJOR / MINOR and PASS/FAIL. PASS requires zero open BLOCKER/MAJOR.

---

## Simulation C — cumulative learner

Persist as:
`course/book1/lesson14-learner-simulation-c-final2.md`

Prompt:

> Use PR #68 and `course/book1/lesson14-learner-simulation-rerun2-handoff.md`. Perform final-rerun-2 Simulation C — cumulative learner. Complete Units 42→43→44, then exercise reviews, Pinyin Search, standalone handwriting, Mega Challenge, adaptive practice, delayed retrieval, and the final capstone. Persist the report exactly as instructed and stop.

Mandatory checks:
- all 30 canonical NEW forms remain globally searchable;
- Mega/adaptive practice remains lesson-gated;
- standalone handwriting cannot bypass first teaching through Search, unit character library/detail, or direct practice start;
- all 21 NEW characters receive later handwriting retrieval;
- Unit-43 duration/imminence and 想家, 新年/父母, 十二月底, 明年/紅葉 receive delayed retrieval;
- final capstone covers all four Lesson-14 outcomes.

Return BLOCKER / MAJOR / MINOR and PASS/FAIL. PASS requires zero open BLOCKER/MAJOR.

---

## After all three

Return to the main development context with `done continue`.

The main context must verify all three final2 reports on the current PR history. Only if all three PASS may it advance to Stage 8 bidirectional traceability.
