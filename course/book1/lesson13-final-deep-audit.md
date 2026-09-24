# Book 1 Lesson 13 — final post-implementation deep audit

Scope: the published Lesson 13 sequence in Hanzi Steps, Units 37–41, checked independently after implementation against *A Course in Contemporary Chinese 1*, Lesson 13 「生日快樂」.

Baseline production commit audited: `b0007938a0b0f6b901f5fbb335a67c77f4e08ee5`.

## Source re-read

The final audit re-read the complete Lesson 13 source range, including:
- Dialogue I and Vocabulary I / Name / Phrases;
- Dialogue II and Vocabulary II / Phrases;
- Grammar I–VII, including negation, question restrictions, scope distinctions, and usage notes;
- the grammar follow-up exercises;
- all four integrated activities;
- the congratulatory-expression and Taiwanese-birthday culture readings;
- the four end-of-lesson self-assessment outcomes.

Source accounting remains:
- Dialogue I: **14 / 14 turns**
- Dialogue II: **13 / 13 turns**
- source-listed lexical/name/phrase entries: **40 / 40**
- formal grammar sections: **7 / 7**
- end-of-lesson objectives: **4 / 4**

## Implementation accounting

Current Lesson 13 implementation contains:
- **5 units**
- **35 lessons** = six teaching lessons + one review per unit
- **35 indexed first-taught vocabulary/expression forms**
- **24 chronological first-taught characters**
- **7 formal grammar rules**
- review lengths of **19 / 20 / 21 / 20 / 22** activities for Units 37–41
- **3 review listening activities in every unit**

Static structure was checked across all five units for duplicate lesson/step IDs, lesson ordering, review placement, phrase-token reconstruction, missing phrase/grammar references, single-answer option integrity, character-card presence, guided introduction/practice, and component stroke coverage. No structural defect was found in that pass.

## Source-faithfulness result

The seven grammar systems remain aligned with the textbook:

1. `一…就…`: immediate sequence, subject placement/omission, positive/negative events, and the source question restriction.
2. verbal completed-action `了`: completion rather than a generic past tense, with `沒（有）` removing verbal `了`.
3. `不` vs. `沒（有）`: action/state/process distinctions and the Taiwan `沒有 + V` preference.
4. question-word totality: affirmative `都`, negative `都／也 + 不／沒`, and `嗎` questions.
5. pre-verbal `多／少 + Verb`: more/less than planned or usual, including past/future contexts.
6. `是不是`: confirmation rather than neutral information-seeking.
7. `跟…一樣`: equality, the two different negation scopes, and both source-supported question forms.

The implementation also preserves the critical contrast between completed-action verbal `了` and sentence-final changed-situation `了` in `不吃這些東西了`.

## Defects found in this final pass and repaired

### 1. Unit 39 review had two false-positive retrievals

The previous regression counted a vocabulary item as “reviewed” if its text appeared anywhere in serialized review data, including a distractor option. That allowed `豬腳` and `一點` to pass without being independently targeted.

Fix:
- `豬腳` now has a direct meaning retrieval item.
- `一點` now has a direct quantity-meaning retrieval item.
- the regression now checks target fields rather than distractors/explanations.

### 2. Unit 39 missed the source's completed-action listening demand

The source Grammar II follow-up listening distinguishes completed vs. not-completed actions. Unit 39 had three review listening activities, but all were lexical listening.

Fix:
- one review listening item now uses `我今天沒吃蛋。` and tests the non-occurrence/completed-action contrast while still retrieving `蛋`.
- the item is tagged to both the verbal-`了` and `不／沒` grammar systems.

### 3. Unit 40's first-birthday culture item taught project metadata instead of culture

The source explains the first-birthday zhuāzhōu “grabbing” custom. The implementation instead asked the learner how that custom should be treated by the curriculum (“not an assessed new Hanzi target”), which is authoring metadata rather than learning content.

Fix:
- the learner now learns what happens in the custom: objects are placed around the child, the child grabs/chooses one, and the selection is traditionally interpreted as a clue to future character/profession.
- the term is kept in romanization so culture-only `抓週` is not silently turned into a handwriting target.
- the adjacent meta question about which later unit teaches comparison was replaced with the actual modern Gregorian-calendar birthday point from the source.

### 4. Unit 41 had an English comparison-scope mistranslation

`他不跟我一樣高，跟你一樣高。` was glossed as “He isn't as tall as me,” which can imply “he is shorter than me.” The source point is comparison-target scope, not a directional height comparison.

Fix:
- gloss changed to **“He isn't the same height as me; he's the same height as you.”**

### 5. Several learner activities exposed internal curriculum sequencing

A handful of checks asked learners about “Unit 40,” “formal grammar here,” or when a later unit would teach a rule. Those statements were useful implementation notes but weak learner-facing pedagogy.

Fix:
- replaced them with direct comprehension/concept questions in Units 37, 39, 40, and 41.
- added regression guards against explicit curriculum-planning jargon in learner activities.

### 6. Unit 41 cultural-comparison capstone wording was overly elliptical

The capstone used `我的跟你的一樣。` for a birthday-custom comparison. It is recoverable in context, but it is weaker as a model sentence for a learner.

Fix:
- replaced it with the clearer `我們跟你們一樣吃蛋糕。` in a concrete birthday-practice scenario.

## Ownership and compatibility recheck

The final audit reconfirmed the two Lesson 13 ownership migrations:
- `過` first lexical ownership is Unit 38 for “celebrate (a birthday)”; Book 2 Unit 3 retains the later movement sense as review.
- `口` first character ownership is Unit 38 through `門口`; Book 2 Unit 1 reuses the earlier character while preserving its existing saved-progress step IDs.

No lesson IDs, step IDs, or step positions were added, removed, or reordered by the final fixes. The changes are content-level corrections inside the existing published topology.

## Final-head QA note

Feature QA refreshes generated curriculum artifacts on the PR branch when source modules change. After that generated-artifact commit, this audit requires a fresh human-triggered Feature QA run on the resulting final head before merge; the bot-generated commit alone is not treated as sufficient evidence.

## Verification contract

The final branch must pass Feature QA on its exact final head:
- curriculum generation/check
- targeted tests for each changed unit
- character coverage
- vocabulary / Mega Challenge / practice regressions
- all validation tests
- TypeScript typecheck
- GitHub Pages build

The production Pages workflow is also tightened in this audit so future main-branch deployments run the curriculum regression suite before deployment. This closes the prior gap where a successful Pages build did not itself prove the Lesson 13 quality tests passed on the exact production commit.

## Remaining manual limitation

Automated validation can verify source accounting, data integrity, sequencing, search/challenge registration, answers, and many handwriting metadata properties. It does not substitute for physically hearing device TTS/audio or manually using every handwriting interaction on an iPhone. Those device-level checks should not be claimed unless actually exercised.
