# Book 1 Lesson 15 — Activity Audit 2: Question Correctness / Adversarial

Working repository: `Weather-Mister/hanzi-steps`  
Working draft PR: **#69**  
Working branch: `book1-lesson15-source-a`

Audit scope: **Lesson 15 Activity Audit 2 only**.

## Independence and scope

This audit was performed from the Activity Audit 2 handoff, the Stage-4 protocol/rules, the frozen source/dependency/curriculum artifacts, the Lesson-15 activity-engineering specification, and the Unit 45–48 activity specifications.

The completed Lesson-15 teaching-quality audit and cross-unit audit reasoning/verdict artifacts were **not read** before or during this audit. The controller state necessarily revealed that Activity Audit 1 had already completed, but its audit reasoning was not used.

Audited learner-facing assessed payloads across Units 45–48:
- `select`;
- `listen`;
- `order`;
- NEW-character handwriting retrieval (`complete` review steps);
- grammar checks;
- source-transfer checks A001–A005;
- Lesson-15 capstone checks.

No implementation files were inspected or changed.

## Initial adversarial findings

### QCA-001 — premature future targets in Unit 45 assessments
**Initial severity:** BLOCKER  
**Blast radius:** LOCAL  
**File:** `course/book1/lesson15-unit45-activity-spec.md`

Affected steps and failures:
- `u45-runny-l1`: distractors exposed future Unit-45 NEW forms `發燒` and `胃口很差` before their explanation.
- `u45-head-s5`: distractor exposed future `喉嚨發炎` before Unit-45 throat/inflammation teaching.
- `u45-head-s6`: distractor explicitly previewed the not-yet-taught G001 “non-specific negative” distinction.
- `u45-review-f3`: the Unit-45 review directly tested future Unit-46 G001 examples `我沒買什麼東西` / `我沒有幾個朋友`, including the not-yet-taught Lesson-15 `幾` expansion.

Repairs:
- `u45-runny-l1` options → `流鼻水 / 不舒服 / 醫生`.
- `u45-head-s5` options → `胃口很差。 / 頭很痛。 / 我一直流鼻水。`.
- `u45-head-s6` future-G001 distractor → `a question asking which food the person wants`.
- `u45-review-f3` now asks only for the already-known Unit-40 `question-word + 都` totality pattern, with options `什麼東西都不想吃。 / 我一直流鼻水。 / 胃口很差。`.

**Status after re-audit:** RESOLVED.

### QCA-002 — premature Unit-47 vocabulary in Unit 46 assessments
**Initial severity:** BLOCKER  
**Blast radius:** LOCAL  
**File:** `course/book1/lesson15-unit46-activity-spec.md`

Affected steps:
- `u46-med-l1` and `u46-review-l2` used future NEW `健康中心` as a distractor.
- `u46-review-u45-1` used future NEW `保險` as a distractor.

Repairs:
- `健康中心` distractors → already-available `學校`.
- `發炎／保險` distractor → `發炎／感冒`.

**Status after re-audit:** RESOLVED.

### QCA-003 — premature Unit-48 vocabulary in Unit 47 assessments
**Initial severity:** BLOCKER  
**Blast radius:** LOCAL  
**File:** `course/book1/lesson15-unit47-activity-spec.md`

Affected steps:
- `u47-stomach-s5` used future NEW `小時` in `好幾個小時`.
- `u47-acc-l1` used future NEW `回家` in `回家休息`.

Repairs:
- `好幾個小時。` → `吐了一次。`.
- `回家休息` → `多休息`.

**Status after re-audit:** RESOLVED.

### QCA-004 — G006 tested before explanation in Unit 48
**Initial severity:** BLOCKER  
**Blast radius:** LOCAL  
**File:** `course/book1/lesson15-unit48-activity-spec.md`  
**Step:** `u48-a002-s3`

Bad distractor:
- `你的房租比我的貴得多。`

This assessed `得多` before G006 is taught in `u48-degree-compare`.

Repair:
- distractor → `我的房租很貴。`, which uses already-available language and remains clearly irrelevant to the health-advice prompt.

**Status after re-audit:** RESOLVED.

### QCA-005 — order payloads did not exactly reconstruct their bound phrases
**Initial severity:** BLOCKER  
**Blast radius:** LOCAL

Affected steps:
- Unit 46 `u46-med-o1`: bound phrase `你到藥局去拿藥。` but token bank omitted `你`.
- Unit 46 `u46-a004-o1`: lacked an explicit phrase binding and omitted `加油` from the bound A004 source phrase.
- Unit 46 `u46-a004-o2`: lacked an explicit phrase binding.
- Unit 46 `u46-a004-o3`: lacked an explicit phrase binding.
- Unit 46 `u46-review-a004-1`: bound A004 source phrase but omitted `加油`.
- Unit 47 `u47-acc-o1`: bound phrase `你這麼不舒服，我陪你去看病，好不好？` but token bank omitted `你這麼不舒服`.

Repairs:
- `u46-med-o1` tokens → `你 / 到藥局去 / 拿藥`.
- `u46-a004-o1` explicitly binds `u46-a004-1`; tokens → `加油 / 我們今天一定要 / 把這50個小籠包 / 吃了`.
- `u46-a004-o2` explicitly binds `u46-a004-2`.
- `u46-a004-o3` explicitly binds `u46-a004-3`.
- `u46-review-a004-1` tokens now include `加油`.
- `u47-acc-o1` tokens → `你這麼不舒服 / 我陪你 / 去看病 / 好不好`.

Post-repair deterministic audit:
- order token/phrase mismatches: **0**;
- order steps without an explicit phrase binding: **0**.

**Status after re-audit:** RESOLVED.

### QCA-006 — G002 distractor was unnatural and tested multiple unrelated defects
**Initial severity:** MAJOR  
**Blast radius:** LOCAL  
**File:** `course/book1/lesson15-unit46-activity-spec.md`

Affected steps:
- `u46-g2-s1` used `我把一個手機買了。`, which contains an unnatural classifier choice for Taiwan Mandarin and simultaneously mixes the source's definiteness and inward-verb restrictions.
- `u46-review-g2` used an indefinite `一支手機` distractor while the prompt was specifically testing the outward/inward action restriction.

Repairs:
- `u46-g2-s1` now uses the source-faithful rejected example `我想把一支手機賣了。` and `我把中文學了。`, with the keyed model `我把這個小籠包吃了。`; the explanation explicitly identifies the definite/referential-object and outward-action requirements.
- `u46-review-g2` uses `我把這支手機買了。` so the object is definite/natural and the distractor isolates the source-rejected inward verb `買`.

**Status after re-audit:** RESOLVED.

### QCA-007 — G005 negation item had two defensible positional answers
**Initial severity:** BLOCKER  
**Blast radius:** LOCAL  
**File:** `course/book1/lesson15-unit48-activity-spec.md`  
**Step:** `u48-g5-s3`

Bad payload:
- prompt: “Where does 不 go for negation?”
- options: `before 比` / `after 得` / `after the state word`
- key: `before 比`

Failure:
- in a valid Pattern-2 form such as `…走得不比…`, `不` is both **before 比** and **after 得**, so two options were defensible.

Repair:
- prompt → **Which sequence gives the source negation order?**
- options → `不比` / `比不` / `比 + state + 不`
- key → `不比`
- explanation → `不` immediately precedes `比` in the comparison portion.

**Status after re-audit:** RESOLVED.

## High-risk lexical / pronunciation re-audit

- **差**: `胃口很差` is explicitly taught and retrieved as **chā**, not chà/chāi.
- **睡覺**: explicitly taught/retrieved as **shuìjiào**; `覺` is distinguished from `覺得 juéde`.
- **得**: modal **děi + V** is explicitly separated from complement **de**; Unit 48 action comparison uses complement `得 de`.
- **幾**: Lesson-15 `a few / several` sense is taught before `好幾次` and later contrasted with interrogative `幾次？`.
- **跟**: recipient/addressee `跟老師說` is explicitly contrasted with companionship `跟朋友去…`.
- **不用了**: assessed as pragmatic “No need / It’s not necessary,” not literal “don’t use.”
- **最好**: assessed as an advice frame (“it would be best / should”), not compositional “most good.”

Result: **PASS**.

## G001–G007 adversarial re-audit

### G001
- assessed G001 declaratives are negative;
- the packet explicitly distinguishes G001 from Unit-40 question-word + `都` totality;
- no affirmative G001 answer is accepted;
- Unit 45 no longer previews/tests G001 before Unit 46.

Result: **PASS**.

### G002
- definite/referential-object bias preserved;
- allowed introductory verbs are framed as source-compatible outward actions;
- inward `買 / 學` restrictions preserved without the repaired distractor introducing an unrelated classifier error;
- `沒 / 別` precedes `把`;
- source-style `了沒有 / 是不是` questions are tested;
- source sentence-final-`了` treatment is explicitly contrasted with prior negated verbal-`了`;
- A004 preserves the source-required disposal outcomes.

Result: **PASS**.

### G003
- first event is completed before immediate/very-soon `就` event;
- `以後` compatibility is assessed;
- contrast with prior `一…就…` is preserved;
- ordinary A-not-A is rejected in favor of `嗎 / 是不是`;
- no deferred place-name glyph is required in an answer.

Result: **PASS**.

### G004
- `Vs + 一點` comparative degree;
- `有（一）點 + Vs` slight non-comparative state;
- `一點 + NP` quantity;
- `一點點` tiny amount/degree.

Result: **PASS**.

### G005
- Pattern 1 is assessed;
- Pattern 2 verb repetition is assessed;
- complement `得 de` is distinguished from modal `得 děi`;
- negation is now tested unambiguously as `不比`;
- `嗎 / 是不是` question route preserved.

Result: **PASS**.

### G006
- `一點`, `得多`, and `多了` are separately keyed;
- G006 remains after G004;
- degree comparison is kept distinct from G005 action comparison.

Result: **PASS**.

### G007
- verbal-`了`, recipient/object, and duration material are inserted **inside** separable forms;
- unsplit alternatives are not accepted when insertion is the target;
- productive Lesson-15 forms are lexically available before G007;
- full D2T13 is delayed until G007.

Result: **PASS**.

## Source-activity verification

### A001 — exact data and arithmetic

Recalculated source table:

| Alias | Source participant | Bowls | Rent | Transport | Duration |
|---|---|---:|---:|---|---:|
| 學生一 | 田中 | 2 | NT$18,000 | 計程車 | 3.5 h = 210 min |
| 學生二 | 如玉 | 1.5 | NT$6,500 | 火車 | 4.5 h = 270 min |
| 學生三 | 安同 | 2.5 | NT$15,000 | 機車 | 8 h = 480 min |
| 學生四 | 月美 | 0.5 | NT$6,200 | 高鐵 | 1 h 40 min = 100 min |

Key checks:
- `u48-a001-s1`: 2.5 bowls > 2 bowls — correct.
- `u48-a001-s2`: NT$18,000 vs NT$6,200; difference NT$11,800 — keyed “貴得多” is supported.
- `u48-a001-s3`: 100 min < 480 min — 學生四 is much faster than 學生三.
- `u48-a001-s4`: 學生四 = exactly `一個小時四十分鐘`.

`臺南` and source participant names remain contextual/non-assessed.

Result: **PASS**.

### A002
Verified:
- three source visual role prompts remain required communicative visual inputs;
- prompts 1–2 are acceptance;
- prompt 3 is rejection;
- they are not converted into invented auto-graded picture-identification facts;
- Task 2 retains the vomiting-after-dinner / upset-stomach patient-doctor scenario.

Result: **PASS**.

### A003
Verified:
- `一日4次` = 4/day;
- `3日份` = 3-day supply;
- source selection = `飯後`;
- timing = `飯後30分鐘`;
- 4 × 3 = **12 packets**;
- 12 is treated as arithmetic inference, not lexical ownership;
- support-only `份` is not handwriting/Search/Mega ownership.

Result: **PASS**.

### A004
Exact required source outcomes preserved:
1. `把這50個小籠包吃了`
2. `把今天的功課寫了`
3. `把我的西瓜吃了`

Order payloads now bind and reconstruct the full source phrases exactly.

Result: **PASS**.

### A005
The packet supplies four defensible health-condition questions:
1. `哪裡不舒服？`
2. `有沒有發燒？`
3. `喉嚨怎麼樣？`
4. `胃口怎麼樣？`

`如玉 / 玉` remains contextual source support and is never a required answer glyph.

Result: **PASS**.

## Deferred/support safety

Post-repair keyed-answer scan found **0** required-answer uses of:
`妳、白、玉、安、田、李、陳、王、北、紐、約、烏、龍、診、拒、絕`.

Also verified:
- `您` remains support-only and is not handwriting/Search/Mega ownership;
- `份` remains support-only and is not handwriting/Search/Mega ownership;
- `臺南` remains contextual A001 source data, not a vocabulary answer;
- no Simplified-only contamination was found in the Unit 45–48 learner-facing activity specs.

Result: **PASS**.

## Structural re-audit

After all repairs:
- duplicate assessed question IDs: **0**;
- order token/phrase mismatches: **0**;
- order steps missing phrase binding: **0**;
- keyed deferred/proper-name glyph requirements: **0**;
- repaired future-prerequisite leakage checks: **0**.

Handwriting review steps cover only formally owned NEW characters for the respective units; no support/deferred character was promoted to standalone handwriting retrieval.

## Final verdict

**PASS — Activity Audit 2: Question Correctness / Adversarial**

Open findings:
- BLOCKER: **0**
- MAJOR: **0**
- MINOR: **0**

All defects found in this audit were activity-level/local and were repaired in the smallest affected Unit 45–48 activity-spec artifacts, then re-audited.

State guard:
- Activity Audit 1 was **not run in this context**.
- Activity Audit 3 was **not run in this context**.
- **Gate B remains pending.**
- `frozenActivitySpec` remains unset.
- implementation remains locked.
- Units 45–48 were **not implemented**.
