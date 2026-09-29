# Supplementary character meanings — 2026-09-29

Reviewed the 489 runtime character records in all 52 published units (Book 1 Units 1–48 and Book 2 Units 1–4), including primary glosses, notes and the character-card rendering paths. Added 333 supplementary senses/uses for 244 characters. This is an everyday reference selection, not an exhaustive historical dictionary.

## Content decisions

- Preserve every original primary meaning and pronunciation verbatim, including the deliberately narrow first-teaching glosses for 了 and 上.
- Keep supplements in `lib/character-meanings.ts`, outside curriculum assembly. They cannot change questions, answer keys, word ownership, Search/Mega eligibility, handwriting scheduling, saved sessions or completion state.
- Give every added use its pronunciation, a Traditional Chinese example, example pinyin, and English translation. Different readings are explicitly distinguished.
- Broaden compound-only descriptions where useful (for example 照, 片, 上, 得, 還, 飯, 多, 少, 包, 為); distinguish grammatical functions (了, 在, 得, 地, 過, 著) and common polyphonic uses (樂, 行, 種, 空, 背, 當, 教 and others).
- Keep unchanged cards whose primary wording already covers the relevant everyday senses, whose other senses are too rare for this reference, or whose common use is genuinely a compound component. Do not invent independent meanings for transliteration syllables such as 啡.
- Preserve Traditional orthography: do not import 隻 into 只, 髮 into 發, 幹 into 乾, or 遊 into 游. Include Taiwan's hàn reading of 和 alongside the unchanged primary hé.
- Examples are optional reference, not new assigned vocabulary or prerequisites. Multi-character words must be read as whole words, not inferred by adding their characters' definitions.

## Display

- Character library keeps the primary heading and adds a count of supplementary uses.
- Character detail opens the supplement section under its primary heading.
- Lesson introductions provide a collapsed supplement section.
- Pinyin Search provides collapsed sections for each character in a result, with the character's original gloss identified separately from the word's meaning.
- Supplement pinyin follows the existing preference in lessons and card details. Search continues to display pinyin as before.

## Sources consulted

- Attached *A Course in Contemporary Chinese*, Book 1: grammar index plus the completed-action, change-of-situation, duration/double-了 and verbal-complement sections.
- Attached Book 2: Lesson 1 reading and ongoing-action 著 section, including 背包 and 正好 context.
- Taiwan Ministry of Education dictionaries, used for pronunciation-sensitive spot checks and Traditional distinctions:
  - [了](https://dict.concised.moe.edu.tw/dictView.jsp?ID=14406&la=1&powerMode=0)
  - [得](https://dict.revised.moe.edu.tw/dictView.jsp?ID=1959&q=1&word=%E5%BE%97)
  - [著](https://dict.mini.moe.edu.tw/SearchIndex/word_detail?breadcrumbs=Search_%E8%91%97_one&dictSearchField=%E8%91%97&wordID=D0003789)
  - [和](https://dict.concised.moe.edu.tw/dictView.jsp?ID=19725&la=0&powerMode=0)
  - [什錦](https://dict.concised.moe.edu.tw/dictView.jsp?ID=33293&la=0&powerMode=0)

All English explanations and examples are authored for these cards; this is not a copied dictionary dataset.

## Validation

`validation/character-meanings.test.mjs` checks every supplement's existing-card ownership, complete example fields, target-glyph presence, duplicate senses, important alternate readings, and Traditional non-mergers. It also verifies that the entire runtime character registry, vocabulary and assessed steps still equal the authored course records and specifically guards the original 了/上 glosses.

Verification completed: TypeScript; GitHub Pages build including course graph and character coverage; focused card/Search/Mega tests; full curriculum validation; server-rendered component checks for expanded/collapsed sections, pinyin preference, and cards without supplements. A browser screenshot check was unavailable because the Chromium download returned a truncated archive. Broad practice-engine/content tests were attempted but did not finish locally; no practice-engine or course payload was edited.
