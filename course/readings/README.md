# Optional reading checkpoints

Original, self-contained reading practice after Book 1 Units 10, 13, 16, 19,
22, 25, 28, 31, 34, 37, 40, 44, 48 and Book 2 Unit 4. These are supplementary
stages, not new canonical lessons or vocabulary owners. Existing completion
positions and sequential unlock rules are unchanged. Existing learners can open
any checkpoint whose unit challenge they have completed.

Each passage includes four comprehension questions with explicit evidence-line
references, a full translation and structural explanation for every line, and
transferable reading tips. Genres alternate among dialogues, messages, a schedule,
a photo description, and stories. Questions cover detail, inference, chronology,
reference, and distinctions between facts, suggestions, and pending decisions.

## Language audit

The authoritative prerequisite boundary is `course/index.json`, plus taught
compositional patterns. Book 1 Lesson 3 vocabulary, activity suggestions, grouping
with 都, and choice questions were cross-checked with the supplied Book 1 PDF.
The supplied Book 2 Lesson 1 was checked for directions, landmarks, 地圖, 著,
一邊…一邊…, and 離. All passages here are original, not textbook quotations.
No book page, unseen illustration, source dialogue, or audio is required.

Explicit support is limited to 可是 (Unit 10), 站 in 捷運站/公車站 (Unit 25),
and 分鐘 (Unit 34). Each is dotted and glossed. Only Unit 25 introduces an
unfamiliar formal character, 站; the other supported forms use known characters.
They remain reading-only and do not alter Search, Mega, handwriting, or ownership.
Contextual glosses also disambiguate known forms, e.g. Unit 22 一點 means one
o’clock, and Unit 44 下 is the already-taught verb in 下雨, not Book 2's directional
下. Questions and options are in English to avoid introducing extra tested Chinese.

## Interaction and persistence

Pinyin defaults to hidden independently of global preferences, including after
reopening or replaying. Tap a word for meaning; pronunciation needs a separate
reveal. Compound-word help includes buttons for its constituent characters.
Translations and structural explanations are rendered only after all four answers
are submitted. The passage remains available during questions. Incorrect answers
receive evidence and explanation; no perfect score is required to see the lesson.

Reading progress is versioned and stored locally per profile. The UI explicitly
says it is saved on this device. Storage failures are surfaced. Existing cloud
lesson sessions are untouched. Replays deliberately reset the current reading's
answers and hide pinyin. Help used after submission does not retroactively change
the attempt's support label.

## Validation

`node --experimental-strip-types --test validation/reading-checkpoints.test.mjs`
checks placement, all Han text having dictionary help, unfamiliar-character bounds,
canonical ownership isolation, question/evidence integrity, unit-review unlocks,
score calculation, malformed/old progress, and profile separation.

`tests/browser/readings.cjs` exercises all 14 entry points, mobile/desktop overflow,
pinyin and pronunciation reveal, character help, the submission gate, hidden
walkthrough, partial resume, completed reopening, replay, and a new learner lock.
The Reading browser QA workflow runs this against a local preview with synthetic
progress, without signing into or modifying any real account. Screenshots are
uploaded as CI artifacts.
