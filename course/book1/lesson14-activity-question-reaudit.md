# Book 1 Lesson 14 — Activity Audit 2 Fresh Re-audit

Date: **2026-09-25**

PR: **#68**  
Branch: `book1-lesson14-source-a`

## Scope and independence

This is the mandatory fresh-context **Activity Audit 2 — Question Correctness / Adversarial re-audit** required by `course/book1/lesson14-activity-question-reaudit-handoff.md`.

The independent review was completed before reading:
- the prior Activity Audit 2 report;
- the original Activity Audit 1 / Activity Audit 3 reports;
- the repaired Activity Audit 1 / Activity Audit 3 re-audits;
- learner-simulation A/B/C reports.

Audited inputs:
- `automation/book1/PROTOCOL.md`, especially Stage 4 / Gate B;
- `course/book1/lesson14-source-ledger.md`;
- `course/book1/lesson14-dependency-ledger.md`;
- frozen `course/book1/lesson14-curriculum-blueprint.md`;
- repaired master activity spec;
- repaired Unit 42 / 43 / 44 activity specs;
- `ADDING_A_UNIT.md`;
- `course/index.json` for prerequisite verification.

The stale Unit 42–44 TypeScript implementation was not used as an audit input and was not edited.

## Initial findings

### MAJOR — A2-R01 — Search timing instruction contradicted frozen Gate A

**Blast radius:** ACTIVITY / CROSS_UNIT  
**Status:** RESOLVED

The repaired master activity spec said a canonical Pinyin Search result should become visible only after its owning lesson. The frozen Gate-A blueprint explicitly states that Pinyin Search is a **global canonical lookup**, while Mega eligibility is owning-lesson gated.

Leaving the repaired instruction unchanged would have silently redefined a frozen upstream architecture decision.

Repair:
- preserved global Pinyin Search lookup visibility exactly as frozen by Gate A;
- kept Mega/adaptive practice gated by owning-lesson completion;
- required the **Search writing-practice action** for Lesson-14-owned characters to remain locked until the owning lesson / character introduction is complete.

This closes the actual prerequisite bypass without reopening Gate A or changing lexical ownership.

### MINOR — A2-R02 — 怕冷 translation drift

**Status:** RESOLVED

Two English meanings paraphrased `怕冷` as “dislike the cold,” while the same packet elsewhere correctly presents it as sensitivity to cold.

Repair:
- normalized the Unit-42 reason line and Unit-44 capstone meaning to “Because I'm sensitive to the cold, I prefer spring.”

### MINOR — A2-R03 — Future return translated as present habitual

**Status:** RESOLVED

`因為我們只放十天的假，所以一月五號回來。` was glossed “we come back on January 5.”

Repair:
- changed the English meaning to “we'll come back on January 5.”

### MINOR — A2-R04 — Weather-condition English was unnatural

**Status:** RESOLVED

`風和雨都很大` was glossed as “the wind and rain are both strong.”

Repair:
- changed the English to “the wind is strong and the rain is heavy.”

### MINOR — A2-R05 — Completed-duration prompt could be more exact

**Status:** RESOLVED

The first Unit-43 G001 select asked which sentence “correctly keeps the object before the duration,” which was less precise than the taught target.

Repair:
- changed the prompt to ask specifically for the Lesson-14 completed-duration pattern **with verb repetition**.

### MINOR — A2-R06 — Weak cumulative distractors

**Status:** RESOLVED

Two cumulative distractors were semantically implausible enough to reduce adversarial value:
- `紅葉很冷。`
- `颱風來了兩個月。`

Repair:
- replaced them with natural, already-taught contrasts:
  - `冬天太冷了。`
  - `颱風已經來了。`

### MINOR — A2-R07 — Deictic 更 review wording

**Status:** RESOLVED

The Unit-44 review asked why 更 meant more than neutral “more” “here,” without a local sentence in the question.

Repair:
- made the prompt explicitly ask why Lesson 14 translates 更 as “even more” rather than neutral “more.”

## Final adversarial re-audit

After repair, the complete candidate packet was re-audited.

### Question correctness

PASS.

No open case was found with:
- two defensible keyed answers;
- no defensible answer;
- wrong key;
- accidental clue that defeats the intended target;
- a malformed answer bank that changes the target.

### Prerequisites and explain-before-test

PASS.

Verified:
- Unit-42 spring listening does not expose `秋天` before its lesson;
- weather-question production waits until `下雪` / `下雨` are available;
- Unit-43 G001 precedes G002;
- `對不對` is explained before assessment;
- the Lesson-14 快 / 要 senses precede G003;
- G003 precedes assessed imminence and later typhoon retrieval;
- Unit-44 G004 teaching does not expose G005;
- G005 precedes productive `沒有…那麼…`;
- no referenced learner-facing phrase requires a later Lesson-14 character before its owning lifecycle.

### Deferred / hidden glyphs

PASS.

No required learner answer introduces deferred proper-name/support glyphs such as:
- 玉 / 紐 / 約;
- 漂 / 亮;
- 妳;
- 度 / 北;
- 飛 / 故 / 宮 / 烏 / 龍 / 蓮.

The numeric °C / Latin-script Taipei architecture remains intact.

### Traditional Chinese / pinyin / Taiwan Mandarin

PASS.

No Simplified-character contamination or clear tone-mark/pinyin defect was found in the audited phrase/grammar records.

The Taiwan-specific/source-specific constraints remain explicit:
- 快要 preference;
- explicit-time + 快要 restriction under the Lesson-14 source rule;
- inferential 吧 only as prior review;
- 呢 comprehension-only;
- 慢走 as conventional leave-taking;
- 濕濕的 as a source-attested limited extension.

### Order-token integrity

PASS.

All audited order activities reconstruct their referenced phrase token sequence exactly, including token multiplicity.

### Activity-ID integrity

PASS.

No duplicate explicit assessed activity ID was found in the Unit 42–44 packet.

### Delayed retrieval

PASS.

Unit 44 explicitly contains all four repaired Unit-43 delayed-retrieval commitments:
- `u44-review-u43-1` — duration-to-now + 想家;
- `u44-review-u43-2` — 新年 / 父母 + imminence;
- `u44-review-u43-3` — 十二月底;
- `u44-review-u43-4` — 明年 / 紅葉.

### Source-transfer / capstone

PASS.

The repaired assessed tasks use Chinese rather than curriculum metadata, while explanatory record/report/write instructions remain instructions.

The final four capstone steps require Chinese construction for:
- weather / typhoon + caution;
- season preference + reason;
- comparison;
- completed-duration experience.

Unit 44 remains **41 total review steps** including the A004 phrase card.

### Search / Mega timing

PASS after repair.

The activity packet now matches frozen Gate A:
- Pinyin Search remains a global canonical lookup;
- Search cannot open Lesson-14-owned writing practice before the owning lesson / character introduction;
- Mega/adaptive practice remains owning-lesson gated.

No Gate-A ownership, boundary, grammar, character, or source-allocation decision was changed.

## Companion Gate-B audit check

Only after the independent Activity Audit 2 review was complete, the repaired Activity Audit 1 and Activity Audit 3 reports were read.

Their Search sections were found to repeat the same progress-gated-visibility mistake and were corrected with focused re-checks. Their substantive teaching-quality and cross-unit conclusions remain PASS.

Current companion reports:
- `course/book1/lesson14-activity-teaching-quality-reaudit.md` — PASS
- `course/book1/lesson14-activity-cross-unit-reaudit.md` — PASS

## Findings summary

- BLOCKER: **0 open**
- MAJOR: **0 open**
- MINOR: **0 open**

## Result

# PASS

The repaired activity packet genuinely satisfies Activity Audit 2 after the repairs above.

Gate A remains PASS. Activity Audits 1, 2, and 3 are PASS with zero open BLOCKER and zero open MAJOR. Gate B may therefore be re-frozen and the controller may advance to **implementation**.

No learner-facing implementation was edited in this audit context.
