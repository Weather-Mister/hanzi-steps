# Book 1 Lesson 14 — Learner Simulation A Final Rerun 2

Simulation: **A — strict prerequisite learner**  
PR: **#68**  
Branch: `book1-lesson14-source-a`  
Prior-knowledge boundary: **Book 1 Unit 41 exactly**  
Sequence simulated: **Unit 42 → Unit 43 → Unit 44**

Learner-facing implementation analyzed at `10c092d081910140fd6a76e8078b89acb7c5574d`. Before persistence, PR head had advanced to `a479bb9dab5695cb55701ca278f2b7933b39f37e` only by adding another final2 simulation report; no learner-facing code changed. That other report was not read.

## Result

**PASS**

Open findings:
- **BLOCKER:** 0
- **MAJOR:** 0
- **MINOR:** 0

PASS criterion is satisfied: zero open BLOCKER and zero open MAJOR findings.

## Simulation method

I treated Unit 41 as the complete and exact prior-knowledge boundary and walked the Lesson-14 implementation in production order. I checked teaching steps before each assessed use, new-character introduction order, formal grammar introduction order, standalone handwriting entry points, Pinyin Search behavior, and all learner-facing select/listen/order/match payloads for future Lesson-14 leakage.

Across Units 42–44 there are **179** select/listen/order/match assessment steps. A direct scan found:
- **0** assessed occurrences of a canonical Lesson-14 NEW Chinese form before its owning lesson;
- **0** future Lesson-14 grammar-form exposures before the relevant grammar introduction;
- **0** assessed Hanzi outside the Unit-41 cumulative character boundary plus characters introduced earlier in the simulated Lesson-14 sequence.

## Mandatory checks

### 1. `u43-a002-s2` is prerequisite-safe

Current item:

- prompt: **Which question asks how long someone lived there?**
- answer: `你在那裡住了多久？`
- distractors:
  - `你以前住在哪裡？`
  - `你在臺灣住了半年嗎？`

**PASS.**

The repaired third distractor contains no future Lesson-14 NEW vocabulary, character, or grammar. By this point:
- the learner already knows the words and characters in the sentence from Unit 41 or earlier;
- G001 completed duration has already been taught in `u43-finished-duration`;
- `嗎` is prior knowledge.

The distractor is also unambiguous: `你在臺灣住了半年嗎？` is a yes/no question about a stated six-month duration, whereas `你在那裡住了多久？` asks for the unknown duration itself. A strict-prerequisite learner has one defensible answer.

### 2. No other assessed option exposes future Lesson-14 NEW material

**PASS.**

I checked the Unit 42 → 43 → 44 assessment sequence against all 30 canonical Lesson-14 NEW vocabulary forms and all 21 NEW character owners. No select/listen/order/match payload introduces a later-owned Lesson-14 NEW Chinese form before first teaching.

The previously repaired Unit-42 spring listening item is also safe: `u42-spring-l1` offers `春天 / 冬天 / 天氣` and no premature `秋`/秋天 exposure.

### 3. No `practice-<character>` route can start before first non-review teaching

**PASS.**

The central production guard is `characterPracticeAvailable(char, completed)`. It finds the first non-review lesson whose `chars` owns that character and requires that lesson to be complete.

`LearningApp.start()` rechecks this invariant for every `practice-<character>` lesson before creating or resuming a session. This means a caller cannot bypass the prerequisite merely by obtaining a synthetic standalone practice lesson.

The same helper is used by the character-detail Practice button, which stays disabled and displays **“Practice unlocks after its lesson”** until first teaching is complete.

#### Required direct checks

- **葉**
  - first non-review teaching owner: `u43-next-year`
  - standalone `practice-葉` before completion of `u43-next-year`: **blocked**
  - after completion of `u43-next-year`: **unlocked**

- **更**
  - first non-review teaching owner: `u44-even-more`
  - standalone `practice-更` before completion of `u44-even-more`: **blocked**
  - after completion of `u44-even-more`: **unlocked**

The character mini-grid/library may visually preview future characters, but it cannot start their standalone writing practice early.

### 4. Pinyin Search stays global while writing obeys the same gate

**PASS.**

Pinyin Search calls the global `searchVocabulary()` lookup without filtering results by learner progress, so canonical entries remain visible globally.

Writing actions are separately gated:
- `searchPracticeCharacters()` filters every practice glyph through `characterPracticeAvailable()`;
- unavailable entries display **“Writing practice unlocks after its lesson”**;
- `practiceFromSearch()` ultimately calls `start()`, which independently rechecks the same gate.

Therefore a searchable future word such as `紅葉` can remain visible without allowing early `葉` handwriting practice.

### 5. Formal prerequisite directions remain safe

**PASS.**

#### G001 → G002

`u43-finished-duration` teaches **G001 completed duration with verbal 了** before `u43-duration-now` teaches **G002 duration accumulated up to now / double 了**.

The learner receives G001 explanation and controlled examples before the G002 contrast and assessment.

#### 快 / 要 expansions → G003

Inside `u43-new-year`:
1. `u43-new-year-p2` explicitly teaches the Lesson-14 temporal sense of **快**;
2. `u43-new-year-p3` explicitly teaches the imminent-event auxiliary sense of **要**;
3. only then does `u43-imminent` teach **G003 快／要／快要…了**;
4. assessed G003 items follow afterward.

No G003 assessment precedes the two required expansion-sense teaching cards.

#### G004 → G005

Inside `u44-even-more`, **更** receives its character lifecycle and baseline lexical teaching before **G004 比…更…** is introduced and assessed.

`u44-not-as` comes later and teaches **G005 沒有…那麼／這麼…** before its productive assessment.

The G004 lesson contains no premature G005 form, and all mixed comparison review/capstone work comes after both rules are taught.

### 6. Repaired cross-unit order targets remain downstream of teaching

**PASS.**

The cross-unit prerequisite targets remain in the correct direction:

- Unit-42 `雨 / 下雨` is taught before Unit-43 `雨快要停了`;
- Unit-43 `停` is taught before Unit-44 `雨停了`;
- Unit-43 快/要 + G003 is taught before Unit-44 `颱風快要來了`;
- Unit-42 weather/seasons are taught before Unit-44 A003/A004 comparison/weather transfer;
- prior `多 + Verb` is available before Unit-44 `請大家多小心`;
- Unit-43 delayed-retrieval order targets in Unit-44 review all occur after their source teaching:
  - `u44-review-u43-1` after duration-to-now + 想家;
  - `u44-review-u43-2` after 新年 + 父母 + G003;
  - `u44-review-u43-3` after 十二月底;
  - `u44-review-u43-4` after 明年 + 紅葉.

Support bridges are likewise ordered before assessment: 對不對 is bridged before its check, 差不多 + time is modeled before retrieval, and 濕 is taught before the 濕濕的 extension.

## Sequential learner verdict

### Unit 42

A learner starting with exactly Unit-41 knowledge can complete Unit 42 without later Lesson-14 material being required by an assessment. Weather, snow/skiing, seasons, and rain are introduced before their assessed uses, and the repaired spring listening item no longer leaks 秋.

**Unit 42: PASS.**

### Unit 43

G001 precedes G002; the repaired A002 distractor is safe; 想 “miss” is modeled before its sense check; 快 and 要 expansions precede G003; 停 and 十二月底 are introduced before use; 葉/紅葉 and 明年 remain deferred until `u43-next-year`; standalone 葉 practice cannot start early.

**Unit 43: PASS.**

### Unit 44

Typhoon vocabulary and caution language are introduced before assessed use; 更 is taught before G004; G004 precedes G005; later comparison/review/capstone items use only already-taught Lesson-14 material; standalone 更 practice cannot start early.

**Unit 44: PASS.**

## Final verdict

**PASS — final-rerun-2 Simulation A.**

There are **0 open BLOCKER**, **0 open MAJOR**, and **0 open MINOR** findings. The strict-prerequisite learner can proceed Unit 42 → Unit 43 → Unit 44 on the current learner-facing implementation without encountering an assessed future Lesson-14 prerequisite or an early standalone handwriting-practice bypass.
