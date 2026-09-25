# Book 1 Lesson 15 — Activity Audit 2 Handoff: Question Correctness / Adversarial

Working repository: `Weather-Mister/hanzi-steps`  
Working draft PR: **#69**  
Working branch: `book1-lesson15-source-a`

Checkpoint: **Stage 4 activity engineering is complete; Gate B is pending.**

This audit must be run in a **fresh ChatGPT context**. Assume the learner-facing question packet contains subtle defects and actively try to break it.

## Independence rule

Before forming your own verdict, do **not** read any completed Lesson-15 teaching-quality or cross-unit audit verdict/reasoning. You may read the activity-engineering artifacts and frozen upstream artifacts listed below.

## Required reading

Read:
1. `automation/book1/PROTOCOL.md`, Stage 4 / Gate B.
2. `ADDING_A_UNIT.md`, especially activity payload and explain-before-test rules.
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
9. Targeted prior-unit/index evidence only when needed to dispute whether something is known.

## Mandatory adversarial question audit

Audit **every learner-facing assessed payload**: select, listen, order, match/handwriting retrieval, grammar checks, source-transfer checks, and capstone items.

For every question verify:
- exactly one defensible keyed answer;
- keyed answer is factually and linguistically correct;
- distractors are genuinely wrong under the prompt;
- no alternative answer is equally defensible;
- no accidental clue trivializes the intended target;
- no required answer uses untaught vocabulary/grammar/glyph;
- no question tests a target before explanation;
- Traditional Chinese only;
- Taiwan-appropriate Mandarin;
- pinyin is correct and tone-marked where expected;
- English glosses do not distort source meaning;
- `order` token multiplicity exactly reconstructs the intended phrase;
- listening prompt, audio, options, key, and explanation agree;
- question IDs are stable and non-duplicated within the packet.

Do not rely on validators to certify nuanced Chinese.

## High-risk semantic attacks

Specifically attack:

### Lexical/pronunciation
- 差 chā;
- 睡覺 shuìjiào;
- modal 得 děi vs complement 得 de;
- 幾 “a few/several” vs interrogative 幾;
- 跟 recipient “to” vs companionship “with”;
- 不用了 as pragmatic refusal, not literal “not use”;
- 最好 as advice, not compositional “most good.”

### G001
- answers must be negative non-specific declaratives;
- no accidental Unit-40 都/也 totality equivalence;
- prompts must not imply G001 can be affirmative.

### G002
- definite/referential-object bias;
- no source-rejected inward verb accidentally accepted;
- correct 沒/別 placement;
- source question forms;
- sentence-final 了 interpretation;
- no distractor is grammatical under a different construction in a way that makes the prompt ambiguous.

### G003
- completed event + immediate succession;
- 以後 compatibility;
- 一…就… contrast;
- no ordinary A-not-A;
- examples must not silently require deferred place-name glyphs.

### G004–G006
- Vs+一點 vs 有（一）點+Vs vs 一點+NP;
- G005 action comparison must use 得 correctly and apply verb repetition where required;
- 不 precedes 比;
- questions use 嗎/是不是;
- G006 一點 / 得多 / 多了 distinctions;
- A001 data arithmetic and every table-derived keyed comparison must be correct.

### G007
- insertion position is genuinely inside the separable verb;
- verbal-了 / recipient-object / duration examples are valid;
- do not accept an unsplit alternative when the prompt specifically tests insertion;
- only already-available lexical forms are required.

## Source-activity attacks

### A001
Recalculate all keyed answers from the exact table:
- 田中 兩碗 / 18,000 / 計程車 / 3.5h
- 如玉 1.5 bowls / 6,500 / 火車 / 4.5h
- 安同 2.5 bowls / 15,000 / 機車 / 8h
- 月美 0.5 bowl / 6,200 / 高鐵 / 1h40m
Confirm aliases do not distort the required source data and 臺南/name glyphs are not hidden answer requirements.

### A002
Ensure auto-graded questions do not invent details that belong only to the source illustrations. The three source visual role prompts must remain communicative visual inputs:
- prompt 1 acceptance;
- prompt 2 acceptance;
- prompt 3 rejection.
Task 2 must keep the vomiting-after-dinner upset-stomach scenario.

### A003
Verify:
- 一日4次 = 4/day;
- 3日份 = 3-day supply;
- 飯後 is selected;
- 飯後30分鐘 = 30 minutes after meals;
- 4×3 = 12 packets;
- 12 is arithmetic, not lexical ownership.

### A004
Verify the exact required outcomes:
1. 把這50個小籠包吃了
2. 把今天的功課寫了
3. 把我的西瓜吃了

### A005
Verify the packet genuinely supplies four defensible health-condition questions and no proper-name glyph is required.

## Deferred/support safety attack

No assessed answer may require:
- 妳、白、玉、安、田、李、陳、王、北、紐、約、烏、龍、診、拒、絕;
- support-only 您 or 份 as handwriting/Search/Mega ownership;
- contextual 臺南 as a vocabulary answer.

Contextual display is permitted only where frozen Gate A allows it.

## Findings and verdict

Record **BLOCKER / MAJOR / MINOR** findings with:
- file + exact step ID;
- bad prompt/options/key/explanation;
- why the current answer set fails;
- corrected exact payload;
- blast radius.

PASS requires:
- open BLOCKER = 0;
- open MAJOR = 0.

Repair the smallest activity-spec artifact when the defect is activity-level, then re-audit the affected questions. If a repair requires changing frozen curriculum/source ownership or unit boundaries, reopen the appropriate upstream gate instead of silently changing it.

Persist:
`course/book1/lesson15-activity-question-audit.md`

Update completion state for this audit only. Stop. Do **not** run Activity Audit 1 or 3 in this context, do not pass Gate B unless all three required audits separately pass, and do not implement Units 45–48.
