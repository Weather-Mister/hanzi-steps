# Book 1 Units 10–11: curriculum audit

Checked against the supplied *A Course in Contemporary Chinese 1* textbook,
2026-09-12. Page numbers below are printed textbook pages; PDF page = printed
page + 27. Instructional sentences and exercises are original, controlled
applications of the textbook vocabulary and structures.

## Unit 10 — Routines & Common Ground

- Preserved its 7 lesson IDs, all 105 activity IDs in their original positions,
  and every existing checkpoint boundary. Completed lessons are not reset.
- Retained the five already-published vocabulary items: 早上, 晚上, 吃, 晚飯,
  好不好. Added 菜 (cài) and 越南 (Yuènán), from Lesson 3 p. 49.
- NEW vocabulary: 7 exact words/expressions. 越南菜 is a taught combination of
  越南 + 菜, not an extra counted vocabulary item.
- NEW characters: 早 上 晚 吃 飯 菜 越 南 (8 total). The three additions have
  full introduction, tracing, completion, memory, and standalone practice data.
- Replaced the repetitive middle exercises with food vocabulary, handwriting,
  and dinner-plan decisions, keeping supported group/adverb grammar.
- Reworked the final lesson into choosing food, understanding a refusal,
  checking the day/time, and suggesting an alternative meeting time.
- Fixed the all-negative challenge question: “not all” is logically compatible
  with “none,” so the question now explicitly asks for the strongest statement
  of “none.” The mixed-group contrast remains unambiguous.
- Source: vocabulary pp. 46, 48–49; time placement p. 49; adverb order and
  negative scope pp. 53–55; suggestion practice p. 59.
- This is not a claim that every word in Lesson 3 is covered. For example,
  棒球 and additional country names remain outside this addition.

## Unit 11 — A Drink to Go

- Six teaching lessons plus one review, 112 activities.
- NEW vocabulary: 杯 bēi, 熱 rè, 買 mǎi, 中 zhōng (medium), 外帶 wàidài,
  內用 nèiyòng, 好的 hǎo de (7 exact words/expressions).
- NEW characters: 杯 熱 買 外 帶 內 用 (7). 中 was already formally taught
  inside 中文; its medium-size meaning is new, not its character.
- Scope: count cups with 一/兩; order hot drinks; buy versus drink; large,
  medium and small cup sizes; takeout versus dine-in; acknowledge an order;
  combine these into a short counter conversation.
- Source: Lesson 4 Dialogue I pp. 66–68, vocabulary pp. 67–68, and measure-word
  structure pp. 70–71. All new words and tone marks checked against the page images.
- Reuses familiar 要, 想, 兩, 還是, 很, 謝謝 and other earlier material without
  counting them as new. Every new lexical/grammar point is explained before
  the first assessment; the final review introduces none.
- This is the ordering portion of Lesson 4, not its complete shopping syllabus.
  Prices, 一共/多少錢/塊, numbers, 幫, modifier 的, 太…了, 能, approximate
  quantities and phone shopping are deferred. Book 1 has not taught the full
  number foundation. In particular, 二 currently belongs to Book 2 Unit 3;
  any future earlier introduction must explicitly resolve that declaration.

## Handwriting and verification

- New geometry and source dictionary entries use AnimCJK `graphicsZhHant.txt`
  and `dictionaryZhHant.txt` from https://github.com/parsimonhi/animCJK.
  The exact 10 imported entries are retained in
  `public/stroke-source/units-ten-eleven-{graphics,dictionary}.txt` under the
  existing AnimCJK/Arphic attribution and licenses.
- Taiwan glyphs inspected as rendered outlines. Component groups cover each
  stroke once. 菜 uses the Taiwan four-stroke grass top (12 strokes total);
  熱 uses 15 strokes and 內 retains its Traditional form.
- Curriculum generation/check and the targeted gate passed: 15 tests pass,
  zero failures; one pre-existing architecture fingerprint test is skipped.
- Additional checks passed: all Unit 10 checkpoints, explanation before tests,
  new-character coverage in assessed Chinese, phrase-token correspondence,
  review prerequisites, and standalone character-practice availability.
- TypeScript checking passed. No UI, progress, saving, authentication, renderer,
  earlier-unit, Book 2, or hosting configuration source changed.
- No browser QA was requested or performed for this curriculum-only change.
