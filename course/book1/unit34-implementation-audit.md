# Unit 34 deep implementation audit

## Audit scope

Unit 34 was re-audited against *A Course in Contemporary Chinese 1*, Lesson 12 Dialogue I, Vocabulary I, and Grammar I 先…再…, then checked against the cumulative Hanzi Steps curriculum state, lesson sequencing, character ownership, handwriting metadata, review retrieval, and repository validation behavior.

## Curriculum shape

- 12 formal NEW vocabulary items.
- 13 first-taught characters.
- 1 new grammar rule: 先…再….
- Six teaching lessons plus one review.
- Review has 22 activities, including 3 contextual listening tasks and 2 handwriting-memory tasks.
- Every formal NEW vocabulary item is retrieved in the review.
- 先…再… is introduced before assessment and independently tested.
- The earlier 要是…就… rule is retrieved in the source scholarship sentence rather than redeclared.

## Source coverage result

Within its declared scope, Unit 34 covers the important source material correctly:

- 計畫、年、久、時間、先、念、大學、需要、花、獎學金、成績;
- source phrase 語言中心;
- the opening duration question;
- the one-year + four-year study sequence;
- the five-year total;
- the money reaction;
- the scholarship/grades exchange;
- Grammar I 先…再….

The source ledger now accounts for **all** Vocabulary I entries and both source phrases, rather than only the entries included in Unit 34. In particular, source-listed 到 is now explicitly recorded as already taught with its Lesson 12 workplace context deferred.

Unit 34 still intentionally defers the Dialogue I tail, Dialogue II, Vocabulary II, 是…的, 以後, 好/難 + verb, and Lesson 12’s past-action/experience objective.

## Defects found in the deep audit and repaired

### 1. Future vocabulary leaked into an early assessment
The first lesson used 成績 as a multiple-choice distractor even though 成績 is not formally introduced until the final teaching lesson. This was a genuine teach-before-test violation at the character/vocabulary level.

Repair:
- replaced the future-vocabulary distractor with already-introduced material;
- added regression coverage preventing Unit 34 assessments from using a formal NEW word before its declared lesson.

### 2. 獎 had an incorrect structural decomposition
The original card described the bottom as 大 and assigned the final dot to the upper 將 component. Structurally, 獎 is **將 + 犬**; the final dot belongs to 犬.

Repair:
- corrected memory text;
- corrected parts to 將 = strokes 0–10 and 犬 = strokes 11–14;
- updated the regression to require 犬 and reject the former 大 analysis.

The underlying 15-stroke geometry itself was already correct.

### 3. Vocabulary glosses drifted beyond the source
Several NEW vocabulary glosses had been broadened beyond Vocabulary I:
- 計畫: “to plan; plan” instead of source “to plan to”;
- 念: “to study; read” instead of source “to study” in this lesson;
- 需要: “to need; require” instead of source “to need”;
- 花: “spend/cost” instead of source “to spend (time or money)”.

Repair:
- formal NEW-vocabulary glosses now follow the source lesson sense;
- broader character-level meanings remain available only where pedagogically useful.

### 4. The 需要 translation lost the understood speaker
所以需要五年 was glossed “So five years are needed,” while the dialogue context and textbook translation are speaker-centered.

Repair:
- changed the learner meaning to “So I need five years.”

### 5. The scholarship line had been flattened
The unit reduced 「對，不過我有獎學金。」 to 「我有獎學金。」, losing the contrast with the preceding cost reaction.

Repair:
- restored 「對，不過我有獎學金。」;
- explicitly retrieves 不過 from Unit 33;
- listening review now uses the repaired source-faithful line.

### 6. One practice item tested arithmetic rather than Chinese
The 需要 lesson asked the learner to add one year and four years to select 五年. That was weak language assessment.

Repair:
- replaced it with a direct Chinese comprehension/selection task for 所以需要五年.

### 7. 大學 ownership did not match its actual first teaching
大學 was declared as new in u34-center, but the preceding 先…再… lesson already taught it in 「我先念中文，再念大學。」. This was not an assessment-before-teaching error, but it made the curriculum metadata dishonest about where the word first enters instruction.

Repair:
- moved 大學 vocabulary ownership to u34-sequence, where it is actually first taught;
- u34-center now reinforces 大學 while introducing 語言中心.

### 8. A few distractors/prompts were weaker than the course standard
The opening duration question included an obviously unrelated landlord distractor, and several review prompts used awkward English.

Repair:
- replaced the weak distractors with plausible study-plan alternatives;
- tightened review wording without changing any existing step IDs.

### 9. Two short Dialogue I turns were only implicit

The prior audit treated 五年。 as covered indirectly by later duration material and dropped the turn-final 你呢？ entirely. That made the unit linguistically usable, but it did not actually preserve the complete dialogue handoff into Unit 35.

Repair:
- the opening comprehension item now retrieves the exact source reply 五年。;
- the scholarship/grades phrase now ends with 你呢？;
- the review order item reconstructs the complete 要是…就… + 你呢？ turn;
- Unit 35's opening tuition note explicitly identifies itself as the answer to that handoff.

### 10. Grammar I review leaned too heavily on the unit's simplified future sequence

The rule explanation correctly stated that 先…再… works for past and future events, but the review only tested the simplified study-plan sequence.

Repair:
- restored the source past example 我昨天晚上先寫功課，再看電視。 as independent review;
- restored the source future example 我想先吃晚飯，再給媽媽打電話。 on the grammar card;
- kept the learner-friendly 我先念中文，再念大學。 phrase for scaffolded production.

## Grammar audit

The 先…再… rule now stays closer to the textbook:
- it is explicitly the temporal order of **two consecutive events**;
- source usage covers past and future sequences;
- textbook drills also support habitual sequences such as 每天…;
- 先 marks Event 1 and 再 marks Event 2;
- when the subject remains the same, the textbook examples normally leave it understood before 再;
- the unit distinguishes this sequential 再 “then/next” from the already-known “again” sense.

The review tests 先…再… independently and also keeps 要是…就… as review rather than falsely relabelling it as new grammar.

## Character and handwriting audit

All 13 new characters have:
- a character record;
- exact declared Unicode source;
- matching stroke and median counts;
- complete non-overlapping part coverage;
- no Simplified-codepoint substitution.

Current exact-codepoint fallbacks remain:
- 臺 from AnimCJK Hans;
- 灣 from AnimCJK Ja;
- 獎 from AnimCJK Ja.

The fallback is only a dataset source fallback; the learner character remains the exact Traditional codepoint.

## Sequencing and assessment audit

After repair:
- no assessment step uses a formal NEW Unit 34 word before its declared lesson;
- all Han characters in assessed learner-facing content are either previously taught or already introduced locally;
- all review answers are present in their options;
- contextual listening items contain only one answer option in the audio;
- phrase/order tokens reconstruct their phrases;
- review introduces no new grammar.

## Search / Mega Challenge / cumulative integration

Unit 34 vocabulary is generated through the same canonical curriculum index used by Pinyin Search and Mega Challenge. Existing repository-wide lookup and Mega Challenge regressions remain part of Feature QA, alongside targeted Unit 34 validation.

## Publication gate

The audit branch must pass the full Feature QA workflow on its final head:
- declared stroke hydration;
- curriculum generation;
- curriculum graph validation;
- targeted Unit 34 test;
- character coverage;
- vocabulary lookup / Mega Challenge / practice regressions;
- all curriculum validation tests;
- TypeScript;
- GitHub Pages production build.

If Feature QA writes generated artifacts and advances the branch head, the resulting generated head must itself receive a complete successful Feature QA pass before merge.


## Generated-artifact exact-head recheck

Feature QA refreshed generated curriculum artifacts on commit `9e890ebe44626cdcc861d1758e497e5703fbe266`. This audit-only follow-up makes no learner-facing curriculum change; it exists to trigger and require one final complete Feature QA run over the generated state before merge.
