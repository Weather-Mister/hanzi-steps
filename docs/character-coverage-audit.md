# First-time character audit

> Historical coverage-fix record. Unit 7/8 pacing and counts were subsequently
> changed by the [unit rebalance](book-one-unit-seven-eight-rebalance.md); the
> first-time coverage invariant remains enforced for every current word.

Recomputed on 2026-09-10 from the live version 20 source. All ten implemented units were processed in `books[].unitIds` order: Book 1 Units 1-8, then Book 2 Units 1-2. Book 3 has no implemented units. Unit numbers alone cannot establish order because books reuse them.

## Cause and correction

The previous fix populated the Characters tab, but the Learn sidebar and counter still read `Unit.chars`, a smaller selection of guided writing targets. Its check only inspected the separate tab. It also allowed familiar characters to repeat in later libraries.

Both surfaces now share `unitLibraryCharacters(unit)`. It derives first introductions from vocabulary in actual course order, retaining guided card order before appending missing characters. A record existing globally or in a later book does not establish earlier teaching.

`Unit.chars`, lesson sequences, lesson/step IDs and indices, review steps, account storage, recognition, audio implementation, navigation and unit selection are unchanged. The header's guided-writing progress total is unchanged. Only the unit character counter reads the complete first-time list. Its numerator also recognizes already-existing completed independent practice sessions without changing progress formats or writes.

## Exact corrections

| Unit | Added to This unit’s characters | Removed from that section | Counter before → after |
|---|---|---|---|
| Book 1 Unit 7 | 兄 弟 漂 亮 子 老 師 週 做 電 影 籃 球 踢 游 還 | None | 9 → 25 |
| Book 1 Unit 8 | 天 上 覺 得 怎 樣 啊 吃 以 | None | 8 → 17 |
| Book 2 Unit 1 | None | 怎 (first in B1 U8), 師 (first in B1 U7) | 14 → 12 |

All 25 omitted sidebar characters already had records and independent practice in the live source. They are now connected to their first unit's sidebar, counter and full dialog. Each has contextual pinyin, specific component/shape explanations, unchanged geometry, and introduction, tracing, completion and recall practice.

Two examples now match the first Book 1 context: 師 uses 老師 lǎoshī; 怎 uses 怎麼樣 zěnmeyàng. Their shapes, pinyin and component descriptions are unchanged. Only those two metadata hashes were refreshed in historical fixtures; all lesson, vocabulary, grammar, unit, stroke and other hashes were retained. The mnemonic heading now names the character instead of saying “Remember the shape.”

The Characters tab now shows the same first-time list. Previously taught repeat cards removed from that tab:

| Unit | Repeat cards removed | Tab count before → after |
|---|---|---|
| Book 1 Unit 2 | 我 你 | 13 → 11 |
| Book 1 Unit 4 | 裡 學 | 15 → 13 |
| Book 1 Unit 5 | 好 | 10 → 9 |
| Book 1 Unit 6 | 人 | 11 → 10 |
| Book 1 Unit 7 | 姐 妹 好 看 照 是 | 31 → 25 |
| Book 1 Unit 8 | 好 一 麼 | 20 → 17 |
| Book 2 Unit 1 | 怎 師 請 麼 大 一 | 18 → 12 |

Book 1 Units 1 and 3 and Book 2 Unit 2 needed no corrections. No remaining new-character cards are duplicated or disconnected from vocabulary.

Final counts: Book 1 **7, 11, 13, 13, 9, 10, 25, 17**; Book 2 **12, 8**. Total: **125 unique first-time characters**.

## Content sources

The supplied Contemporary Chinese Book 1 scan was checked for affected words/pronunciations, including printed pages 26, 28, 46, 48 and 49 (PDF pages 53, 55, 73, 75 and 76). Book 2's opening lesson was checked separately. The source confirms 可以 kěyǐ, 老師 lǎoshī, 怎麼樣 zěnmeyàng, 房子 fángzi, 覺得 juéde and the relevant activity/time words. Neutral syllables retain unmarked pinyin; other syllables have tone marks. No vocabulary or grammar was added.

Existing geometry and source originals are retained, including Taiwan's five-stroke 以. Supplemental geometry comes from the previously bundled AnimCJK records in `public/stroke-source/character-coverage-*`; earlier characters keep their source records and licenses.

## Regression prevention and verification

`npm run check:characters` independently compares displayed teaching lists with current vocabulary in book order. It reports missing cards/records, missing pinyin/tone marks, empty/generic/repeated explanations, missing component explanations/geometry, duplicate cards, later reintroductions and disconnected cards. Punctuation, digits, Latin text and other non-Hanzi symbols are ignored. The production build runs this gate before compiling.

Failure-case tests remove 以, delete its record or pinyin, substitute generic text, add duplicate/later/disconnected cards, and mix punctuation/Latin/digits into repeated vocabulary. Existing geometry, independent checkpoint and real recognition checks remain.

All 49 existing and new tests passed, including real stroke recognition and persisted account-progress checks. TypeScript and the production build passed. Global lint reports the same eight pre-existing errors and six warnings: the modified app's diagnostics match the live-source baseline, other lint-error files are unchanged, and changed curriculum/check files lint cleanly. No lint rules were disabled.

Browser verification confirmed all seven affected unit counters and matching card counts, including B1 U7 0/25, B1 U8 0/17 with 以 yǐ and its five-stroke dialog, and B2 U1 0/12 without 師/怎. The Characters tabs checked for U8 and B2 U1 match their counters. 師's dialog uses the Book 1 老師 context. Practice generation and recognition pass automated checks. Starting practice in the HTTP-only preview is blocked by the existing crypto.randomUUID secure-context requirement; production uses HTTPS. Authentication and progress code were not changed to work around that preview limitation.
