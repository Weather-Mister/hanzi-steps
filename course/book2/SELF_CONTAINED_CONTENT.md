# Book 2 learner-content contract

A learner uses Hanzi Steps on its own. They are not assumed to have the textbook,
its recordings, its dialogue, a map, a picture, or a teacher's explanation open.

- Keep new vocabulary and grammar within the assigned source lesson. Verify the
  actual supplied PDF, including Traditional text and pinyin; an earlier generated
  plan is not source evidence. Original practice sentences may combine taught
  material, but must not invent new required targets or pretend to quote the book.
- Put every required passage, exchange, scene description or diagram in the app.
  When a question depends on a passage, include the relevant Chinese evidence in
  that question as well. A filename, page reference or “in the dialogue” is not input.
- A vocabulary card must teach pronunciation, meaning and use. Translate and
  explain its example. Do not substitute “rebuild this source-aligned message” for
  a linguistic explanation. Sentence practice should use the lesson's target.
- Explain words, semantic expansions, grammar and characters before assessing
  them, including material in distractors. Known characters do not establish
  knowledge of a new word. Check across unit boundaries, not only within a unit.
- Teach positive, negative and question forms where the source teaches them.
  Include complete examples with pinyin and meanings before applying the forms.
- Paragraphs and multi-speaker exchanges are reading input, not standalone
  sentence-building practice: set their phrase records to `practice:false`.
- On a repair, preserve published activity IDs and positions. Append extra work
  and record historical completion bounds. A necessary sequence change requires
  an explicit migration; do not silently reinterpret saved progress.
- Run the Book 2 quality/self-containment tests, the full required curriculum and
  practice regression suite, TypeScript, and the Pages build. Structural passes
  supplement a manual reading of every prompt; they do not certify pedagogy.

## 2026-09-27 repair source boundary

Current production Book 2 consists of Lesson 1 / Units 1–4. Lesson 2 is not in the
published manifest. Reference: attached `book 2.pdf`, printed pp. 2–14 (PDF pp.
29–41). Vocabulary I and its names/phrases are pp. 4–5; Vocabulary II and its
phrases are pp. 7–8. The five grammar sections are pp. 8–14.

The 41 existing first-owned vocabulary entries all occur in those lists. Earlier
Book 1 ownership of 過, 本, 往, 應該, 附近, 便利商店 and 一直 remains unchanged.
過's crossing/passing sense is explicitly explained before its assessment. The
source's simultaneous-action sense of 一邊 is the target, not an extra “one side”
sense. 背包 remains bēibāo as visibly printed in this edition. The section label
一段 in 和平東路一段 is read yī duàn.

The repair removes the absent-dialogue dependency in the Unit 4 cumulative cash
withdrawal question and incidental invisible-reading references. All 41 word notes
now include useful explanations; duplicated model slots now practice their own
lesson's material. Four short in-app practice texts supply complete Chinese,
pinyin, translation and explanation. They are adaptations, not claims to reproduce
the source dialogue or its pictures. New grammar checks cover negatives/questions
and delayed retrieval. No external map/image is required by any current question.

Regression protection includes all 28 published lesson checkpoint prefixes,
source-listed targets, lexical teaching before assessment across all Book 2 units,
actual grammar-use order, visible input for comprehension questions, and isolation
of paragraph input from generated sentence practice.
