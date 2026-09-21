# Units 26–27 implementation audit

## Source boundary

- Unit 26 closes the two explicit Lesson 8 Vocabulary II deferrals from Unit 25: **古代** and **不行**.
- Unit 26 then covers the core Lesson 9 Dialogue I / Vocabulary I planning set and the time-when side of the textbook's time-expression contrast.
- Unit 27 continues Lesson 9 with **多久**, **有時候**, recommendation vocabulary, the basic time-duration frame, **…的時候**, paired **有時候…有時候…**, and **應該**.
- Lesson 9 is intentionally **not complete** after Unit 27.

## Honest novelty counts

### Unit 26
- New vocabulary/forms: 11
- New characters: 15
- Transparent combinations, not counted as new vocabulary: 下個星期, 星期六
- Reused earlier expression: 看電影

### Unit 27
- New vocabulary/forms: 10
- New characters: 11
- Review items reused from earlier units include 有名, 風景, 美, 有空, 時候.

## Deferred source material

Continue before leaving Lesson 9:
- Grammar II object + repeated verb + duration.
- Duration before negation.
- Duration inside separable verbs, with and without 的.
- 要是…就… condition/consequence, including negative conditions.
- Remaining Dialogue II / Vocabulary II items, including month/date language, 還, 逛, and 貓空.
- Proper names such as 臺東 only when introduced with explicit character support.

## Compatibility note: 行

Unit 26 is now the first Book 1 teaching of **行**, with the reading **xíng** in 不行. Book 2 Unit 2 previously first-taught the same character as **háng** in 銀行. To avoid duplicate first-teaching and conflicting stroke ownership, the Book 2 unit now treats 行 as an already known polyphonic character and retains its explicit lexical instruction that 銀行 is pronounced **yínháng**. The Book 2 bank lesson no longer presents a second handwriting card for 行.

## Pre-PR static audit

Before remote QA:
- Unit 26: 7 lessons, 20 review activities, 3 review listening activities.
- Unit 27: 7 lessons, 22 review activities, 3 review listening activities.
- Every new grammar target has an independent review assessment.
- All phrase and grammar-example Han characters resolve to previously taught characters or the current unit's new-character set.
- All character component groups cover each declared stroke index exactly once.
- No duplicate step IDs were found in either unit.
- Ordering banks use the exact phrase token multiplicities.

Feature QA hydrated all 26 newly introduced character geometries from `graphicsZhHant.txt` (no Simplified or Japanese fallback) and subsequently passed targeted unit tests, character coverage, regression tests, TypeScript, and the Pages build. A final exact-head QA run is still required after generated artifacts are committed. Browser/device rendering and deployment verification remain separate gates.
