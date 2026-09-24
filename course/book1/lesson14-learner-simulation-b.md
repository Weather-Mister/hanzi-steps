# Book 1 Lesson 14 — Learner Simulation B

Simulation: **Stage 7 Learner B — adversarial test taker**  
Scope: **Book 1 Lesson 14 / Units 42–44**  
Working PR: **#68**  
Branch: `book1-lesson14-source-a`

## Independence

This simulation was performed from the current PR head using:
- `automation/book1/PROTOCOL.md`, especially Stage 7 and the question-correctness / implementation-conformance rules;
- frozen Lesson-14 activity packet:
  - `course/book1/lesson14-activity-spec.md`
  - `course/book1/lesson14-unit42-activity-spec.md`
  - `course/book1/lesson14-unit43-activity-spec.md`
  - `course/book1/lesson14-unit44-activity-spec.md`
- actual implementations:
  - `course/book1/unit42.ts`
  - `course/book1/unit43.ts`
  - `course/book1/unit44.ts`

Learner Simulation A and Learner Simulation C reports were **not read**.

## Verdict

**FAIL**

PASS requires zero open BLOCKER and zero open MAJOR.

Open findings:
- **BLOCKER: 1**
- **MAJOR: 1**
- **MINOR: 1**

---

## BLOCKER

### B1 — Frozen assessed listening payloads do not match runtime implementation

**Blast radius: CROSS_UNIT**

The frozen activity packet defines exact learner-facing assessed payloads, but the runtime changes prompts, options, and/or answers for **18 listening items** across all three units.

#### Unit 42
- `u42-season-l1`
  - frozen: “Which set do you hear?” with semantic English set choices;
  - runtime: “Which season word do you hear?” with `春天 / 天氣 / 水果`.
- `u42-review-l3`
  - frozen: asks what is being asked, with semantic English choices;
  - runtime: asks which question pattern is heard, with `常不常 / 會不會 / 有沒有`.

#### Unit 43
- `u43-duration-l1`
- `u43-duration-now-l1`
- `u43-newyear-l1`
- `u43-plan-l1`
- `u43-nextyear-l1`
- `u43-review-l1`
- `u43-review-l2`
- `u43-review-l3`

These frozen items use the specified semantic/comprehension prompts and answer choices; runtime replaces them with different form-recognition prompts and/or Chinese-string choices.

#### Unit 44
- `u44-typhoon-l1`
- `u44-wet-l1`
- `u44-news-l1`
- `u44-g4-l1`
- `u44-g5-l1`
- `u44-review-l1`
- `u44-review-l2`
- `u44-review-l3`

Again, runtime changes the frozen prompt/choice payloads. The most consequential example is `u44-g4-l1`: the frozen choices are `上次 / 這次 / 明年`, so both comparison sides are audible and the learner must understand which is the baseline. Runtime changes the choices to `上次 / 明年 / 去年`, making `上次` the only option actually heard and allowing the item to be solved by surface audio-option matching without understanding the comparison.

This is not merely copy polish. The frozen packet is normative and the protocol states that unexplained Frozen Activity Spec ↔ learner-facing implementation divergence is a BLOCKER. Several changed runtime items also materially lower the adversarial difficulty by converting semantic listening into direct form matching.

**Smallest gate to reopen:** Gate B / implementation conformance for the affected cross-unit assessed payloads.

---

## MAJOR

### M1 — Source-transfer and final-capstone assessment can be passed by reading English curriculum/task metadata instead of using Chinese

**Blast radius: CROSS_UNIT**

A repeated assessed pattern asks the learner to identify what the source task/outcome requires rather than perform or interpret the Chinese target. The learner can answer these items from English descriptions alone.

Affected examples include:

#### Unit 42
- `u42-seasons-home`
- `u42-seasons-s2`
- `u42-summer-s3`
- `u42-summer-s4`
- `u42-review-t1`

These ask which fields the source Four Seasons / Summer in Taiwan tasks require, rather than requiring the learner to supply or interpret the corresponding Chinese.

#### Unit 43
- `u43-a002-s1`
- `u43-a002-s2`
- `u43-review-cum2`

These test the workflow metadata of A002 (“where/how long”, then “record and report”) rather than the learner actually asking/reporting the experience in Chinese.

#### Unit 44
- `u44-review-a004-1`
- `u44-review-a004-2`
- `u44-review-cap1`
- `u44-review-cap2`
- `u44-review-cap3`
- `u44-review-cap4`

The four explicit Lesson-14 capstone checks are especially serious. They ask **which task demonstrates an outcome**. A learner can answer all four by reading the English outcome descriptions; the questions do not themselves require demonstrating the weather/typhoon, seasons/preference, comparison, or experience outcomes in Chinese.

That means the final capstone can report success without actually testing the four Lesson-14 outcomes it claims to retrieve.

This is a Stage-7 adversarial failure under the explicit check for wording that tests curriculum metadata rather than Chinese.

**Smallest gate to reopen:** Gate B activity engineering across the affected transfer/capstone items.

---

## MINOR

### m1 — Some distractors are malformed or too obviously non-competitive

**Blast radius: LOCAL**

Examples:
- `u42-rain-s3`: `臺灣下雪的時候？` is a fragment rather than a plausible competing yes/no weather question.
- `u42-rain-s4`: `這裡比昨天冷？` is structurally and semantically far from the target frequency question.

These do not create a wrong key, but they weaken adversarial discrimination and make the correct choice easier than necessary.

---

## Adversarial checks that did not reveal additional blockers

Across Units 42–44:
- no keyed select/listen answer was missing from its option set;
- no duplicate answer choices were found;
- every order item had a valid referenced phrase;
- every order token sequence reconstructs its target phrase after punctuation/spacing normalization;
- no order-token multiplicity defect was found;
- all NEW-character teaching lifecycles preserve `intro → trace → build → complete → memory`;
- every NEW character is handwriting-retrieved again in its unit review;
- the Unit-44 match retrieval for `傘 / 濕 / 更` resolves to the intended lexical meanings `umbrella / wet / even more`;
- no additional wrong answer key, two-answer ambiguity, missing-audible-key defect, Simplified-character contamination, or clear pinyin error was found in the reviewed Lesson-14 question/phrase payloads.

## Final status

**Simulation B: FAIL**

Reason:
- **1 open BLOCKER**
- **1 open MAJOR**

No curriculum or implementation repair was performed in this simulation context.
