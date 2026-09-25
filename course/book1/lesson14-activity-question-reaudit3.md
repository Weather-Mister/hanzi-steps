# Book 1 Lesson 14 — Final Prerequisite Repair Activity Audit 2 Re-audit 3

Audit: **Activity Audit 2 — Question Correctness / Adversarial Audit**  
Stage: **4 / Gate B final prerequisite repair re-freeze**  
PR: **#68**  
Branch: `book1-lesson14-source-a`

## Independence

This audit was completed in a fresh context from:
`course/book1/lesson14-activity-question-reaudit3-handoff.md`.

Before reaching the independent verdict, the audit read only the permitted Gate-B inputs:
- `automation/book1/PROTOCOL.md`, Stage 4 / Gate B;
- `course/book1/lesson14-source-ledger.md`;
- `course/book1/lesson14-dependency-ledger.md`;
- frozen `course/book1/lesson14-curriculum-blueprint.md`;
- current repaired `course/book1/lesson14-activity-spec.md`;
- current Unit 42 / 43 / 44 activity specs;
- `ADDING_A_UNIT.md`;
- `course/index.json` and the dependency evidence carried from the frozen ledger where prerequisite identity needed confirmation.

It did **not** read previous Activity Audit 2 reports, learner Simulation A/B/C reports, or the re-audit3 Teaching Quality / Cross-Unit verdicts before completing the independent question audit.

The independent verdict below was reached first. Only afterward were the two companion re-audit3 reports read.

## Adversarial scope

Every learner-facing question family and prerequisite edge in Units 42–44 was attacked for:
- multiple defensible answers;
- no defensible answer;
- wrong keys;
- accidental clues or weak distractors;
- untaught or future vocabulary / characters;
- untaught grammar;
- explain-before-test violations;
- pinyin errors;
- Simplified-Chinese contamination;
- unnatural Taiwan Mandarin;
- misleading English;
- broken character-practice timing;
- silent movement of a Gate-A ownership or unit boundary.

Special attention was given to the two prerequisite repairs named in the handoff.

## Special repair check 1 — `u43-a002-s2`

Current item:

- prompt: **Which question asks how long someone lived there?**
- answer: `你在那裡住了多久？`
- distractors:
  - `你以前住在哪裡？`
  - `你在臺灣住了半年嗎？`

### Future-material check

PASS.

The repaired third distractor contains no later Lesson-14 NEW vocabulary, character, or grammar.

By `u43-duration-now`:
- 臺灣 is prior-known;
- 住 is prior-known;
- 半年 is already available duration language;
- 嗎 is prior-known;
- verbal 了 + stated duration has already been explained through G001.

The former future-owned `明年` exposure is absent.

### Grammar / naturalness check

PASS.

`你在臺灣住了半年嗎？` is grammatical and natural as a yes/no question asking whether the person's stay lasted six months.

It is not a defensible answer to a prompt asking **how long** because it supplies a fixed duration and requests confirmation rather than requesting an unknown duration.

The three options therefore cleanly contrast:
- place: `你以前住在哪裡？`;
- unknown duration: `你在那裡住了多久？`;
- yes/no confirmation of a stated duration: `你在臺灣住了半年嗎？`.

Exactly one option answers the prompt.

## Unit 43 later-NEW distractor scan

PASS.

The remaining Unit-43 assessed options do not leak later Lesson-14 NEW ownership across lesson boundaries.

Notable checks:
- the duration lessons do not expose `明年` or `紅葉` before `u43-next-year`;
- the imminent restriction uses prior-known `明天`, not future-owned `明年`;
- `新年` / `父母` are taught before their assessment;
- `停` is introduced only after G003 is available;
- `十二月底` is taught in its owning lesson before assessment;
- `明年` / `紅葉` are introduced in `u43-next-year` before their selects, listening, and order activity.

No future Unit-44 NEW item is required by a Unit-43 answer.

## Unit 42 prerequisite boundary scan

PASS.

The frozen Gate-A order remains intact:
- snow vocabulary is taught before `會不會下雪` is assessed;
- rain vocabulary is taught before `常不常下雨` is assessed;
- inferential `吧`, 比較, 因為…所以…, …的時候, and recurring-weather support are used only as prior review or after an explicit support bridge;
- no deferred proper-name glyph becomes a required answer.

Every Unit-42 select/listen item has one defensible keyed answer.

## Unit 44 prerequisite boundary scan

PASS.

The frozen Gate-A edges remain intact:
- `濕` precedes `濕濕的`;
- `大家` and `小心`, plus prior 多 + Verb retrieval, precede `請大家多小心`;
- 更 is explained with its baseline meaning before G004;
- G004 precedes the full D2T07 comparison;
- G005 precedes D2T08;
- 慢走 is explained as a conventional leave-taking formula before `小心慢走` assessment.

The A003 temperature items preserve the locked `°C` / Latin-script Taipei redesign and do not require 度 or 北.

No deferred source-support glyph becomes a required answer.

## Global standalone handwriting-practice rule

Current repaired rule:

> no learner-facing entry point may start a `practice-<character>` lesson before that character's first non-review teaching lesson is complete.

PASS.

The rule is coherent with the frozen curriculum and product lifecycle because it:
- gates the **practice action**, not canonical lookup visibility;
- leaves Pinyin Search canonical results globally visible;
- does not move character ownership;
- does not change the owning lesson or first-introduction order;
- keeps Mega eligibility owning-lesson gated;
- applies consistently to Pinyin Search, unit character mini-grid/library, character-detail dialogs, locked-but-explorable units, and future standalone-practice shortcuts;
- still allows future characters to be visually listed or previewed without launching independent writing practice.

This is an activity/product-access invariant, not a Gate-A curriculum-boundary change.

## Question correctness and language checks

PASS.

Across the current Unit 42–44 activity specs:
- keyed select/listen answers are defensible and unique under their prompts;
- order activities reconstruct phrases already explained earlier in the learner path;
- Traditional Chinese is preserved;
- phrase/grammar pinyin is tone-marked;
- Lesson-14 想 / 快 / 要 expansion senses are explained before assessment;
- G001 completed duration and G002 duration-to-now remain distinct;
- the textbook's explicit-time + 快要 restriction is tested only after G003 teaching;
- 更 retains its source “even more” baseline;
- 呢 in D2T01 remains comprehension-only;
- 慢走 retains its conventional leave-taking value;
- culture questions are explicitly framed as textbook-era historical/source comprehension, not current administrative guidance.

No question-level repair is required.

## Gate-A boundary check

PASS.

No activity repair in the current candidate:
- moves vocabulary ownership;
- changes character ownership;
- changes Unit 42/43/44 boundaries;
- changes formal grammar ownership;
- promotes a deferred proper name/support item;
- changes Search visibility policy.

Gate A remains PASS and does not need reopening.

## Findings

- **BLOCKER:** 0
- **MAJOR:** 0
- **MINOR:** 0 open

# PASS

The repaired Lesson-14 activity packet passes the mandatory fresh Activity Audit 2 re-audit 3.

After reaching this independent verdict, the required companion reports were checked:
- `course/book1/lesson14-activity-teaching-quality-reaudit3.md` — **PASS**, 0 open BLOCKER / MAJOR;
- `course/book1/lesson14-activity-cross-unit-reaudit3.md` — **PASS**, 0 open BLOCKER / MAJOR.

All three mandatory Activity audits therefore PASS on the same repaired candidate, Gate A remains PASS, and Gate B may be re-frozen.

The controller may advance to **implementation**. This audit does not authorize any curriculum invention or implementation-file edit beyond the frozen activity specification.
