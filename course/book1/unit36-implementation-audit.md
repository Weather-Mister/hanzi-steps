# Unit 36 implementation audit

## Curriculum shape

- 8 genuinely new lexical items; no padding with transparent 試試看 or 做生意.
- 4 first-taught characters: 工、作、試、難.
- 2 new grammar rules: Event/Time + 以後 and special 好/難 + verbs.
- Six teaching lessons plus one review.
- Review has 26 activities, including 3 contextual listening tasks and 4 handwriting-memory tasks.
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

Feature QA hydration on the implementation head confirmed the declared Traditional stroke sources and generated the checked stroke artifact. Exact Unicode targets remain mandatory; never substitute a different Simplified/Japanese codepoint.

## Publication gate

Before merge, the exact final PR head must pass Feature QA: stroke hydration, course generation/check, targeted Unit 36 testing, character coverage, vocabulary lookup/Mega Challenge regressions, all validation tests, TypeScript, and GitHub Pages build. If CI commits generated artifacts, the new head must receive a fresh successful QA run before merge. After merge, require the GitHub Pages build and deploy jobs to succeed.
