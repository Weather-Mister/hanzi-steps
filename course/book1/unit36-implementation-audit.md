# Unit 36 implementation audit

## Curriculum shape

- 8 genuinely new lexical items; no padding with transparent 試試看 or 做生意.
- 4 first-taught characters: 工、作、試、難.
- 2 new grammar rules: Event/Time + 以後 and special 好/難 + verbs.
- Six teaching lessons plus one review.
- Review has 27 activities, including 3 contextual listening tasks and 4 handwriting-memory tasks.
- Every formal NEW vocabulary item is retrieved in review.
- Unit 35 是…的 and earlier 要是…就… are review grammar, not redeclared.

## Source coverage

The implementation covers all Lesson 12 Dialogue II content needed to complete the lesson and maps every Vocabulary II item to NEW, REVIEW, new grammatical use, or transparent source phrase.

Grammar III explicitly contrasts Unit 35's standalone 以後 'in the future' with post-event/post-time 以後 'after/later'.

Grammar IV preserves the textbook split between perception combinations and action-verb ease/difficulty, plus degree modification, negation, and question forms.

## Defects found in the deep audit and repaired

### 1. Three Dialogue II turns were initially underrepresented
The first pass jumped from the arrival/work exchange to the business explanation, and later from the company reaction directly to Yue-mei's answer.

Repair:
- restored 為什麼你們公司要替你付學費？;
- restored 我覺得你們公司真好。;
- restored 對了，你回國以後，打算做什麼？ before the answer;
- targeted regression coverage now pins these turns.

### 2. The first QA pass exposed schema metadata defects
The initial listening activities lacked the required `char` field, and grammar-introduction IDs did not match the formal grammar rule IDs expected by the generator.

Repair:
- all three listening activities now carry explicit focal characters and prompts;
- grammar introduction IDs now match `u36-yihou-after` and `u36-hao-nan-verb`.

### 3. 難 was exposed before its formal character lesson
The first implementation used the source grammar example 好工作很難找 in the 好/難 grammar lesson but had scheduled the 難 character card two lessons later.

Repair:
- moved 難 character teaching and formal vocabulary ownership into `u36-job`, before the grammar card and all assessments;
- the final dialogue lesson now reinforces 難 rather than first-teaching it.

### 4. Source-faithful dialogue needed explicit character-boundary handling
The textbook opens the first turn with the vocative 田中, but 田 is not yet a formally taught Hanzi Steps character. It also prints sex-specific 妳 when Tianzhong addresses Yue-mei, while 妳 is not in the cumulative taught-character inventory.

Repair:
- omit only the proper-name vocative 田中 from the learner-facing opening question;
- normalize source 妳 to already-taught general 你 in the return-home question;
- document both adaptations explicitly in the source plan and phrase notes instead of silently leaking untaught characters.

### 5. Exercise coverage overused the same action-verb examples
The published pass was source-correct, but several checks repeatedly reused 好找 / 難找 / 難學 while the textbook's Grammar IV explicitly develops both perception and action branches with broader examples.

Repair:
- restored the exact source perception example 日本菜好吃也好看 in the first branch-identification check;
- added retrieval of the source perception negative 便宜的咖啡不好喝;
- added the source 難不難學 question with 老師今天教的甜點;
- diversified the review so 好喝/難喝 and the 難 + action-verb A-not-A pattern are independently retrieved;
- replaced a low-value repeated 老闆 recognition item with retrieval of 希望 from the source dialogue.

These changes do not introduce new grammar or vocabulary; they increase retrieval breadth for material already present in Lesson 12 (Grammar IV, printed pp. 257–258).

### 6. Grammar IV A-not-A handling was too compressed
The first published rule correctly taught 好/難 + verb, but its question summary treated A-not-A forms as though the two branches behaved identically. The textbook separates them more carefully: its perception example is 好看不好看, while its action examples are 好不好賣 and 難不難學.

Repair:
- the grammar explanation and memory note now state the branch-specific A-not-A patterns;
- one teaching check now retrieves the source perception question 你覺得那個電影好看不好看？;
- the review separately retains the action pattern 老師今天教的甜點難不難學？;
- the dessert prompt/explanation now reflects the source meaning “hard to learn to make,” rather than the awkward “hard to learn a dessert.”

### 7. A review explanation mismatched its own answer
The repaired perception-negative question used 便宜的咖啡不好喝, but its explanation still said to put 不 before a 難 + verb predicate.

Repair:
- the explanation now correctly describes 不 before the whole 好/難 + verb expression and identifies 不好喝 as the source perception negative.

### 8. 難 component guidance was structurally too opaque
The original card grouped the left eleven strokes under the rare label 𦰩 and described them only as a “dense left-side component.” AnimCJK’s Traditional decomposition is ⿰⿱廿⿻口夫隹.

Repair:
- the highlighted stroke grouping remains unchanged and complete;
- the learner-facing label is now 廿＋口／夫;
- the description explains 廿 above an interwoven 口 and 夫, followed by 隹;
- the memory cue now mirrors the verified Traditional structure.

### 9. The duration note made an unnecessary claim outside Lesson 12
The line 去年，我已經在臺灣工作一年了。 is source Dialogue II, but the prior note justified not teaching it by referring to a later “double-了” grammar point.

Repair:
- removed the unsupported forward claim;
- the note now simply says the source line is retained for dialogue comprehension without inventing an extra Unit 36 grammar rule.

### 10. End-of-lesson activities were checked explicitly
The deep audit extended past Dialogue II and Grammar IV through the Lesson 12 integrated activities and self-assessment. Those pages reinforce study/future plans, 先…再…, 是…的, and work-experience discussion; they do not add a fifth formal grammar point or an unaccounted Vocabulary I/II item.

### 11. Review breadth was still too repetitive
The first repair improved Grammar IV coverage, but the review still repeated the same event-anchor explanation for 以後 and repeated the bare 好找 meaning instead of retrieving two source details that had only appeared in explanatory prose.

Repair:
- `u36-review-g2` now retrieves the time-expression use 半年以後 = “half a year later”;
- `u36-review-g4` now retrieves the source degree-adverb example 我媽媽做的菜很好吃;
- the perception-negative review now uses the separate source sentence 學校餐廳的菜不難吃 instead of duplicating the teaching item 便宜的咖啡不好喝.

### 12. Two distractors were not strict enough for an unambiguous key
The earlier A-not-A checks used forms with 有沒有 that can occur colloquially enough to make them poor “wrong answer” choices even though they do not match the textbook pattern being taught.

Repair:
- replaced those distractors with structurally misplaced forms that cannot reasonably compete with the source pattern;
- preserved the same step IDs and positions.

### 13. Learner-facing notes leaked the very glyphs the adaptation was meant to avoid
The target phrases correctly omitted 田 from the proper-name vocative and normalized 妳 to 你, but the runtime phrase notes still printed 田中 and 妳. Those notes are learner-facing content, so the character boundary was not actually clean.

Repair:
- runtime notes now describe the adaptation without displaying 田 or 妳;
- authoring-only source/audit documents retain the exact source forms for traceability;
- a regression test now rejects either glyph anywhere in the Unit 36 runtime module.

### 14. Pinyin spacing needed one cleanup
The business line wrote 臺灣人 as `Táiwānrén`, although the source phrase is 臺灣 人 and the project normally spaces lexical words in phrase pinyin.

Repair:
- changed it to `Táiwān rén`;
- added a regression assertion for the full line.

### 15. Pinyin Search and Mega Challenge were explicitly checked
The general repository tests exercise both systems, but the deep audit added Unit 36-specific guarantees:
- each of the eight new vocabulary entries resolves through normalized Pinyin Search to its canonical curriculum item;
- after its declared teaching lesson is complete, each entry becomes eligible for Mega Challenge;
- transparent 試試看 and 做生意 remain contextual phrases rather than duplicate canonical vocabulary entries.

### 16. Saved-progress topology is unchanged
The audit compared published `main` against the repair branch:
- all seven lesson IDs are unchanged;
- every activity ID remains in the same position;
- lesson step counts remain 15 / 7 / 8 / 12 / 9 / 8 / 27;
- no step was inserted, deleted, or reordered.

Therefore these repairs require no lesson-length compatibility migration and do not invalidate existing complete or partial Unit 36 checkpoints.
## Pedagogy and sequencing

- 工 and 作 are introduced before 工作 is assessed.
- 試 is introduced before 試試看 is assessed.
- 難 is introduced before 難找 / 難學 assessments.
- Event + 以後 receives a grammar card before its assessments.
- 好/難 + verb receives a grammar card before its assessments.
- The Dialogue II opening deliberately retrieves the already-taught 是…的 question system.
- Review independently assesses both new grammar rules and all eight new lexical items.

## Handwriting

Declared stroke/component models:
- 工: 3 strokes, whole simple form.
- 作: 亻 + 乍, 7 strokes.
- 試: 言 + 式, 13 strokes.
- 難: 11-stroke left structural component + 隹, 19 strokes.

Feature QA hydration confirmed all four Unit 36 characters from AnimCJK `graphicsZhHant.txt` using their exact Unicode targets: 工、作、試、難. The hydration job did not use a Hans or Japanese fallback for this unit. The AnimCJK master revision audited here is `ec5e17cca76c87587790bcbce5ea0b4d4fb753d6`.

## Publication gate

Before merge, the exact final PR head must pass Feature QA: stroke hydration, course generation/check, targeted Unit 36 testing, character coverage, vocabulary lookup/Mega Challenge regressions, all validation tests, TypeScript, and GitHub Pages build. If CI commits generated artifacts, the new head must receive a fresh successful QA run before merge. After merge, require the GitHub Pages build and deploy jobs to succeed.
