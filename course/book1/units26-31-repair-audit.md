# Units 26–31 source and learner audit — 2026-09-21

Baseline: production `1e773806c3abfc3220c38279245db22a4a766fec`; no open PRs at preflight. Scope: the six existing Book 1 units, without adding units or changing the app/backend.

## Source verification

Read the attached Book 1 PDF directly. Relevant Lesson 9 material: printed pp. 182–193 (PDF pp. 209–220), including dialogues, both vocabulary lists, the time table, all duration patterns, 的時候, alternating 有時候, and 要是…就…. Lesson 10: printed pp. 202–213 (PDF pp. 229–240), vocabulary, dialogues, VV看, expressive reduplication, clause modifiers, change-of-state 了 and cause/effect. Visually inspected printed pp. 207 and 210 because extracted pinyin/table layout was insufficient. Book 2 is not the source for these units.

## Findings and corrections

- **U26:** weekday identification was assessed before the teaching card explained the weekday convention. Added that explanation. Expanded 打算 with negative and question forms, and made its review discriminate lack of a plan from inability. Removed the displayed 不行 answer from the listening prompts.
- **U26–27 and U29:** exact-string ordering rejected valid placements of time phrases or equivalent orders of alternating activities. Replaced affected movable-clause tasks with meaning-specific choices, or bound subject/time into a single token. IDs, positions and lengths stay stable. The renderer still accepts exact strings; no new acceptance behavior is claimed.
- **All six units:** the renderer presents authored ordering banks directly, and every bank was already in answer order. Reordered each bank while preserving the exact answer-token multiset; added a regression check against pre-solved banks.
- **U27:** contextual 應該 audio now disambiguates 應. Explained 女朋友/決定/帶 in the actual teaching phrase; added transfer using different activities and durations.
- **U28:** the old day-unit question was underspecified because year/hour words also express duration. Made the requested unit explicit. Taught and assessed both permitted separable-duration forms, with and without 的, and clarified prospective negative duration. Added a new repeated-verb transfer assessment.
- **U29:** explained the food-piece sense of 塊 at its first lesson use rather than calling it familiar before U30. Removed untaught 紅色 as a distractor. Added a different date and a different conditional sentence in review.
- **U30, substantive source error:** 美 was wrongly placed in the forbidden reduplication list. Printed p.210 explicitly puts 美 in the YES column. Corrected the explanation and assessment; included the subjective-impression vs. factual-ordering restriction and prohibition on degree adverbs, not just 很. Added the habitual-VV vs. tentative-VV看 distinction.
- **U30–31, pronunciation:** textbook p.207 gives 衣服 **yīfú**. Corrected vocabulary, character examples, grammar examples and phrases consistently. Other listed neutral tones (太太, 弟弟) follow the source.
- **U31, historical Chinese/pinyin mismatch:** an earlier invented route phrase and 往 character example ended in Chinese 去 but pinyin zǒu; that repair aligned them to qù. The later source-completeness pass replaces the invented route with the textbook window scene 從窗戶往外看，是藍色的大海。
- **U31, ambiguous assessment:** 人不去的夜市 is a possible negative relative clause with a different head noun, not inherently malformed. The prompt now asks specifically for “people who do not go to the night market.” The cause/effect question now states the intended cause explicitly; the reversed sentence is not called structurally invalid.
- **U31, retrieval:** 弟弟 previously appeared only as a distractor in review. It now receives a positive meaning assessment together with 高. A new relative-clause transfer uses clothes instead of repeating the photo demonstration. The first 這些 phrase explicitly explains plurality.

## Handwriting inspection

Rendered all **63 unit-owned character geometries**, colored by existing component membership; additionally rendered individual highlighted strokes for 出、非、果、乾、黃、心. Kept all licensed paths and medians unchanged.

Corrections:
- 出: strokes 2–3 form the **upper**, not lower, open bowl.
- 非: the left four strokes and right four strokes are consecutive, not interleaved. Replaced the misleading whole-character explanation with two accurate visual groups.
- 果: the first four strokes make a 日-shaped box, not a complete five-stroke 田; the later vertical creates the final 田-like appearance.
- 黃: accurately names the lower long horizontal, 田-like middle and final two strokes.
- 心: the first stroke is the left dot; corrected the description of its three dots and curved hook.

## Pacing and compatibility

| Unit | Declared new words/forms | New characters | Review activities |
|---|---:|---:|---:|
| 26 | 11 | 15 | 20 |
| 27 | 10 | 11 | 22 |
| 28 | 12 | 10 | 22 |
| 29 | 12 | 10 | 22 |
| 30 | 10 | 7 | 22 |
| 31 | 12 | 10 | 22 |

Counts are not increased by these repairs. Each unit keeps six teaching lessons plus review, at least three review listening activities and handwriting/component retrieval. Existing step IDs, order and lesson lengths are preserved and covered by a baseline fixture plus exhaustive current-position checkpoint tests. Historical compatibility tests remain in place.

The shared 往 record's earlier pinyin correction remains documented in its chained amendment, preserving prior immutable migration snapshots. The current regression now verifies the textbook 從窗戶往外看 source sentence and wǎng wài kàn reading instead of the retired route example.

## Source coverage after the later closure pass

The later Units 29–31 closure pass resolves **逛、芒果、窗戶** with exact-codepoint handwriting provenance and explicit teaching. The older out-of-scope deferrals that remain are **網路上、臺南、故宮博物院、臺東**.

## Verification

Local gates passed: generation/check, character coverage, separate targeted test for each of six units, vocabulary lookup and Mega Challenge regressions, all curriculum validation tests (56 passed; one architecture-migration-only check intentionally skipped), TypeScript and Pages build. The PR must pass Feature QA on its final head before merge; Pages build/deploy must pass for the merge commit. Live notes/character checks follow deployment. Physical-device speech and handwriting input are not certified by this audit.


## Remote QA follow-up

Feature QA run 120 passed all gates and committed the generated curriculum outputs as `70c751272706b6672cd80853bf419c018a47dd84`. This documentation update requests QA on the final head containing those outputs; merge still requires that run to pass.

The source cross-check also confirmed the Lesson 8 carryover against printed pp. 163–166 (PDF pp. 190–193): 古代, 不行 and 公共汽車 match the dialogue/vocabulary context.
