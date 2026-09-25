# Book 1 Lesson 14 — Post-QA Fresh Activity Audit 2 Re-audit 2

Audit: **Activity Audit 2 — Question Correctness / Adversarial Audit**  
Stage: **4 / Gate B post-QA re-freeze**  
PR: **#68**  
Branch: `book1-lesson14-source-a`

## Independence

This audit was completed in a fresh context from the post-QA handoff.

Before reaching the independent verdict, the audit read:
- `automation/book1/PROTOCOL.md` Stage 4 / Gate B;
- `course/book1/lesson14-source-ledger.md`;
- `course/book1/lesson14-dependency-ledger.md`;
- frozen `course/book1/lesson14-curriculum-blueprint.md`;
- current repaired master/unit activity specs;
- `ADDING_A_UNIT.md`;
- `course/index.json` and targeted prior-curriculum entries as needed.

It did **not** read prior Activity Audit 2 verdicts, learner-simulation reports, or the post-QA Activity Audit 1/3 re-audit verdicts before completing the independent question audit. The required Activity Audit 1/3 re-audit2 reports were read only after this audit had independently reached PASS.

## Adversarial scope

Every learner-facing activity class in Units 42–44 was attacked for:
- multiple defensible answers;
- no defensible answer;
- wrong keys;
- accidental clues and weak distractors;
- untaught vocabulary or grammar;
- explain-before-test violations;
- bad pinyin;
- Simplified-Chinese contamination;
- unnatural Taiwan Mandarin;
- misleading English;
- invalid prerequisite direction;
- review/capstone phrase references that were not previously taught.

The post-QA alias-phrase repair received special scrutiny.

## Post-QA structural checks

### Order / phrase teaching invariant

All **29** order activities across Units 42–44 resolve to phrase IDs that have an earlier phrase-teaching occurrence in the learner's chronological path.

The repaired Unit-44 delayed-retrieval orders correctly reuse:
- `u43-duration-now-source`;
- `u43-newyear-source`;
- `u43-return-plan`;
- `u43-nextyear-source`.

The four capstone construction orders correctly reuse:
- `u44-comparison-source`;
- `u42-season-reason`;
- `u44-not-as-source`;
- `u43-finished-stay`.

No order target is first introduced by the order activity itself. No new alias phrase ID is required.

### Explicit option/key integrity

A structural pass over the current specs checked **123** explicit select/listen option blocks. Every keyed answer appears exactly once in its option set; no duplicate option set produced an extra exact key match.

Manual semantic review found no second defensible keyed option and no key with no defensible answer.

### Required delayed retrieval

Unit 44 still productively retrieves all four required Unit-43 targets in Chinese:
- 想家 through `u43-duration-now-source`;
- 新年 / 父母 through `u43-newyear-source`;
- 十二月底 through `u43-return-plan`;
- 明年 / 紅葉 through `u43-nextyear-source`.

The repair therefore restores explain-before-order without weakening the delayed-retrieval contract.

### Lesson-14 capstone

The four final construction steps still retrieve all four Lesson-14 outcomes:
- weather / typhoons;
- four seasons + preference/reason;
- comparison;
- simple experience / trip-duration statement.

They require reconstruction of previously taught Chinese rather than English outcome-label recognition.

### Unit-44 review size

The repaired Unit-44 review remains **41 steps** total, including the A004 phrase step, with the required listening, handwriting, independent lexical retrieval, comparison mixing, delayed retrieval, culture, and capstone coverage intact.

### Pinyin Search / writing-practice timing

The activity packet preserves frozen Gate-A behavior:
- canonical Pinyin Search entries remain globally visible as lookup;
- a writing-practice action for a Lesson-14-owned character is gated until that character's owning lesson / first character teaching;
- Mega Challenge eligibility remains owning-lesson gated.

No progress-gated Search-visibility rule is introduced.

## Language correctness

The inspected learner-facing material remains:
- Traditional Chinese;
- tone-marked pinyin;
- consistent with the source's Taiwan-Mandarin usage constraints;
- free of a new productive 呢 rule;
- explicit about the Lesson-14 想 / 快 / 要 expansion senses;
- explicit about 更 as an “even more” baseline;
- explicit about the completed-duration vs. duration-to-now distinction;
- explicit about the source's 快要 restriction;
- explicit about 慢走 as a conventional leave-taking formula.

No source-deferred proper-name glyph, `度`, or other future prerequisite becomes a required learner answer.

## Findings

- **BLOCKER:** 0
- **MAJOR:** 0
- **MINOR:** 0 open

No activity-layer repair is required by this audit. Gate A does not need to reopen.

# PASS

The post-QA repaired activity packet passes the mandatory fresh Activity Audit 2 re-audit.

After this independent verdict, the required companion reports were checked:
- `course/book1/lesson14-activity-teaching-quality-reaudit2.md` — PASS;
- `course/book1/lesson14-activity-cross-unit-reaudit2.md` — PASS.

With Gate A already PASS and zero open BLOCKER/MAJOR findings, Gate B may be re-frozen and the controller may advance to implementation.
