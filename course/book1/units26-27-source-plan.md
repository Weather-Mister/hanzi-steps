# Book 1 Units 26–27 source plan

Status: Units 26–27 are published. This source plan has been corrected after the Units 26–29 teaching-quality audit so it matches the authoritative Lesson 9 vocabulary and the implemented first-teaching ownership.

## Production boundary

At the time of authoring, Unit 25 explicitly deferred **古代** and **不行** from Lesson 8 Vocabulary II. Unit 26 now owns those two items before continuing into Lesson 9.

## Authoritative source coverage

### Lesson 8 tail (printed pp. 163–171)

Carry forward the two explicitly deferred items before advancing:

- 古代 gǔdài — ancient times / ancient; Vocabulary II.
- 不行 bùxíng — won't work / not feasible; Vocabulary II phrase. In the dialogue it rejects taking the MRT because there is no MRT to the Palace Museum.

Do not re-teach the rest of Lesson 8 Vocabulary II or 比 as new: Unit 25 already owns that material. Keep the pragmatic distinction for 不行: it rejects feasibility/acceptability in context; it is not simply the ordinary negator 不 plus 行 in every use.

### Lesson 9 Dialogue I / Vocabulary I (printed pp. 183–184)

Source items recovered from the textbook:

- 星期 xīngqí — week
- 回國 huíguó — return to one's country
- 打算 dǎsuàn — plan/intend to
- 電視 diànshì — television
- 影片 yǐngpiàn — film; video. This is the Lesson 9 Vocabulary I source item. Earlier 看電影 remains review language, but 電影 is not a substitute for the textbook's 影片 entry.
- 旅行 lǚxíng — travel
- 功課 gōngkè — homework
- 出去 chūqù — go out
- 大概 dàgài — approximately / probably
- 放假 fàngjià — have a holiday / be on break
- 下個星期 xià ge xīngqí — next week
- 有時候 yǒu shíhou — sometimes
- 多久 duōjiǔ — how long
- 臺東 Táidōng — Taitung

Unit 26 closes the Lesson 8 tail and establishes the core Lesson 9 holiday/planning vocabulary. 下個星期 is a transparent phrase once 星期 is taught. 影片 was intentionally left for Unit 28, while earlier 看電影 remains review language.

### Lesson 9 Dialogue II / Vocabulary II (printed pp. 185 onward)

Dialogue II establishes the recommendation/travel context:

田中's girlfriend is coming to Taiwan; Minghua recommends Taiwan night markets, tea houses and Maokong; the dialogue uses 建議, 夜市, 有名, 應該, 逛, 特別, 茶館, 風景, 美, 決定, and the condition 要是…就… .

Candidate Unit 27 lexical set, subject to exact cumulative-index classification before authoring:

- 女朋友 nǚpéngyou — girlfriend
- 帶 dài — take/bring someone
- 建議 jiànyì — suggestion / suggest
- 夜市 yèshì — night market
- 有名 yǒumíng — famous
- 應該 yīnggāi — should
- 逛 guàng — stroll/browse/visit shops
- 特別 tèbié — special
- 茶館 cháguǎn — tea house
- 風景 fēngjǐng — scenery
- 美 měi — beautiful
- 決定 juédìng — decide
- 貓空 Māokōng — Maokong (proper name; introduce/support if used in assessed content)

Do not force all candidates into Unit 27 if the resulting genuinely-new load or new-character load is too high. Defer a coherent remainder explicitly.

## Lesson 9 grammar coverage map

The textbook's Lesson 9 grammar sequence must be covered across this and following batches without gaps. Verified source points include:

1. **…的時候** — marks the time when an event takes/took/will take place. Textbook examples include 在山上看風景的時候…, 放假的時候…, 有空的時候… .
2. **有時候…，有時候…** — alternating possibilities within a situation. This is not the same as a single English filler 'sometimes'; teach the paired discourse pattern explicitly.
3. **要是…就…** — condition → consequence. 要是 may occur before or after the first-clause subject; 就 begins the predicate of the consequence clause. Include affirmative and negative conditions (e.g. 要是沒空…).
4. Lesson 9 later introduces **time duration** ('for a period of time'); do not silently skip it when advancing beyond this lesson.

Before final authoring, recover and map every earlier Lesson 9 grammar section that precedes …的時候 from the actual textbook pages; do not infer headings from memory. The final coverage map must include all Lesson 9 grammar, negatives, questions and usage restrictions.

## Proposed split

### Unit 26 — Holidays & Plans

Goal: close the Lesson 8 tail, then let the learner talk about holiday plans and going out/travelling.

Implemented new vocabulary: 古代, 不行, 星期, 回國, 打算, 電視, 旅行, 功課, 出去, 大概, 放假. Use 下個星期 as a transparent combination after 星期. The textbook item 影片 is not replaced by 電影; it is first-taught in Unit 28.

Six teaching lessons + review. Suggested pedagogical progression:

1. 古代 + 不行 in their verified Lesson 8 contexts.
2. 星期 / 放假 / 下個星期.
3. 回國 / 出去.
4. 打算 + planning sentences; teach its actual textbook grammar/usage before assessing it.
5. 電視 / 功課, while earlier 看電影 stays review-only and textbook 影片 is deferred to Unit 28.
6. 旅行 / 大概 + integrated holiday planning.
7. Review: 18–22 meaningful activities, >=3 listening, independent assessment of every new grammar target.

### Unit 27 — Recommendations in Taiwan

Goal: recommend places/activities and respond to suggestions using Dialogue II material.

Use a coherent 10–13-new-item subset from the candidate Dialogue II vocabulary after cumulative-index classification. Likely anchors: 女朋友, 帶, 建議, 夜市, 有名, 應該, 逛, 特別, 茶館, 風景, 美, 決定.

Teach the relevant recommendation grammar before assessment. If …的時候 / 有時候…有時候… / 要是…就… fit pedagogically only after the lexical foundation, place them here or explicitly defer them to Unit 28 with a recorded source boundary. Do not cram them merely to finish Lesson 9 in two units.

## Implementation gates

- Re-run cumulative context immediately before classifying new/review vocabulary and characters.
- Every untaught Han character in NEW vocabulary must have a first-teaching character record and licensed Taiwan Traditional geometry.
- Extract geometry from the repository's licensed Taiwan Traditional source (`public/stroke-source/graphicsZhHant.txt` and associated dictionary/provenance), not fabricated paths or Simplified/Japanese substitutions.
- Character notes, memories and parts must be character-specific; component stroke groups must cover every stroke exactly once.
- Every assessed phrase must contain only taught/supported characters and vocabulary.
- Ordering tasks must have exact token multiplicity and no unhandled alternative valid orders.
- Reviews independently assess all new grammar and sample vocabulary fairly.
- Run `course:generate`, `course:check`, `course:test -- unit-26`, `course:test -- unit-27`, `check:characters`, vocabulary/mega/validation tests, TypeScript, and `build:pages`.
- Require Feature QA green on the exact final PR head; inspect diff; merge; require Pages build+deploy green; verify live content.

## Implemented boundary and deferred source material

Unit 26 closes the Lesson 8 tail with 古代 and 不行, then covers the core Lesson 9 Dialogue I planning vocabulary. It treats 下個星期 as a transparent combination after 星期. The exact textbook Vocabulary I item **影片** is first-taught in Unit 28; earlier **看電影** remains review language rather than being misreported as the source item.

Unit 27 adds 多久, 有時候, 建議, 應該, 夜市, 特別, 茶館, 女朋友, 帶, and 決定. It teaches the basic Verb + Duration frame, …的時候, the paired 有時候…有時候… pattern, and 應該 suggestions.

Explicitly deferred to Unit 28 or later Lesson 9 continuation:
- the full object-repeat, duration-before-negation, and separable-verb duration subpatterns from Grammar II;
- 要是…就… including affirmative and negative conditions;
- remaining Vocabulary II items not yet first-taught, including month/date language, 還, 逛, and 貓空;
- 臺東 and other proper-name material only when it can be introduced and supported without an unnecessary character spike.

The current split is therefore a source-continuation boundary, not a claim that Lesson 9 is complete.

## Current continuation

Units 26–27 have completed their publication gates. Units 28–29 continue the Lesson 9 duration/date/condition material and then begin Lesson 10. Remaining source gaps are tracked in the later coverage plan rather than being treated as complete.
