# Cumulative learning

Hanzi now reuses taught grammar, word behaviour and character relationships across the existing learning surfaces. No new mode or canonical curriculum owner is introduced.

## Architecture and coverage

- `lib/cumulative-knowledge.ts` builds a read-only relationship index over the existing curriculum. Every one of the current 260 grammar rules has a retrieval path. Most use existing tagged phrases; a small set uses explicitly segmented examples from the original rule.
- `course/enrichment/knowledge.ts` contains eight reviewed usage relationships, four character comparisons, explicit cross-unit grammar links, and line-specific reading links. It is deliberately small and editable. It never contributes entries to vocabulary, characters, Search ownership, or either challenge queue.
- `KnowledgeNotes` uses that same index for collapsed sections in Search, word cards, character cards, lessons, and post-comprehension reading explanations. Pinyin respects the surrounding surface's reveal setting.
- Daily 10 and Mixed Mastery interleave up to three connection questions with the existing adaptive picker. Grammar, usage and character relationships share the same eligibility, scheduler, UI and persistence. A due family is not required if none is eligible.

All 52 units / 362 lessons retain their authored step IDs, order, lengths, ownership and generated artifacts. The nine legacy rule-example gaps are filled by references to existing explanations, not rewritten units. Book 2 uses the same index immediately, including review of earlier verbal 了 and counting structures in its newer sentences.

## Gates and teaching

Grammar requires a completed lesson containing its explicit grammar teaching step. Phrases require a completed teaching/order lesson, all attached grammar teaching, and previously introduced canonical Hanzi. Unknown and support-only glyphs are excluded from productive connection questions. `practice:false` remains a hard exclusion.

A character relationship requires **every member** to have been introduced through its owning unit's character introduction or owned vocabulary. Components named in an explanation are not new vocabulary or handwriting targets. The current course does not contain enough of 清/晴/情/請 to add a 青-family exercise safely, so none was manufactured.

Usage requires the canonical words, its additional grammar prerequisites, and a safe example. The later 幾 statement sense requires Unit 46; the recipient use of 跟 requires Unit 48. Their canonical owners remain Units 7 and 24. Search and independent handwriting remain unlocked; only progressive enrichment and automatic assessment use these gates.

First connection attempts begin with a short explanation. That attempt is assisted. Subsequent questions hide the explanation behind a reminder; using it counts as assistance. Word usages with an authored cloze progress from reconstruction to unaided contextual input after clean retrieval. Character comparisons progress from recognition to memory handwriting. Grammar reconstruction stops announcing the required pattern after the initial reminder. Answer feedback always provides the Chinese/pinyin and explanation. Passive card or reading views do not award mastery.

## Adaptive state and compatibility

The existing `PracticeSkillState` already distinguishes recognition, pinyin, input, sentence, context and handwriting. It is retained unchanged. New item IDs (`grammar:…`, `usage:…`, `family:…`) use existing modes and the existing local cache, offline pending queue, idempotent Supabase RPC and account scoping. Example IDs track exposure separately so a concept can return in a different taught sentence.

No schema migration, storage-key change, sign-in change or state reset is needed. An absent relationship row means no evidence about that ability; it does not erase or downgrade existing word skills. Completed lessons, streaks, sessions, word mastery and handwriting state are untouched. The main and reverse Mega Challenge retain their queue, skip, give-up, mastery and pinyin semantics.

The existing lexical picker supplies recent material. The connection picker adds delayed concepts, unresolved mistakes and a small boost for reviewed contrast pairs. Due dates are respected, with a ten-minute repetition cooldown. Recent example exposure favours another eligible context. Families and usages share this policy instead of separate review systems. Answer duplicates are removed when interleaving. The UI presents no new mastery dashboard.

## Source review

Curriculum authority remains the supplied *A Course in Contemporary Chinese* PDFs and the repository's reviewed unit data.

- Book 1 Lesson 5, grammar II: 幫 introduces the beneficiary; the source gives requests to microwave buns or buy a cup of coffee. The usage link reuses existing Unit 13 examples.
- Books/cups, clothing descriptions, Unit 46 幾, Unit 48 跟 and separable 睡覺 use existing reviewed textbook-aligned teaching and phrase records. Enrichment does not import all possible dictionary collocations. In particular, 一件衣服 and 洗衣服 were not added merely to fill a list.
- Book 2 Lesson 1, printed page 8: 從 marks a starting point and 往 marks direction. Its examples and the existing Unit 1 model ground the route usage link.
- The phonetic distinction for 媽/嗎 was checked against CUHK's [媽 entry](https://humanum.arts.cuhk.edu.hk/Lexis/lexi-mf/search.php?word=媽) and [嗎 entry](https://humanum.arts.cuhk.edu.hk/Lexis/lexi-mf/search.php?word=嗎): both use 馬 as a sound component. The description explicitly says that tones can differ.
- 他/她, 大/太 and 問/間 use the already reviewed Traditional character and stroke records. Only 他/她 is labelled a semantic distinction. The other two are labelled visual comparisons, without historical or phonetic claims.

## Adding a relationship

1. Reuse canonical words/characters and existing source phrase IDs. Add prerequisite grammar IDs for a later meaning or behaviour. Never declare a new owner for an expansion.
2. Check all words, glyphs, meanings, pinyin and segmentation. A new phrase is not inferred from character shapes or generated collocation combinations.
3. Add cross-unit grammar links explicitly; substring matching is not grammatical analysis.
4. For a cloze, author one unique blank and its accepted answers. Do not demand one exact free translation when alternatives would be natural.
5. Add reading links to reviewed lines only. Notes remain after the comprehension questions, with no passive skill credit.
6. Run `node --experimental-strip-types --test validation/cumulative-knowledge.test.mjs`, the normal feature regression suite, TypeScript and the Pages build.

## Validation

The focused suite checks source references, segmentation, all 260 grammar paths, all 362 lesson boundaries, expansion gates, Book 2 prerequisite isolation, support-only exclusions, scaffolding, due dates, independent skill dimensions, example rotation, queue bounds, reading gates, and unchanged challenge eligibility.

Validated locally:

- Curriculum generation/check and character coverage: pass (52 units, 362 lessons).
- TypeScript and GitHub Pages production build: pass.
- Feature/curriculum regression suite: 242 passed, one existing skip; the additional first-lesson evidence guard also passes.
- Focused cumulative tests: 11 passed, including all 260 grammar paths and every lesson boundary.
- Mobile (390 px) and desktop (1365 px) browser flow: discovery, assessment, answer feedback, independent local state, collapsed Search enrichment, reading comprehension gate, hidden reading pinyin, no passive mastery credit, no horizontal overflow, and no page errors. Screenshots were inspected using a CJK font.
- Broad historical suite: 293 passed, 13 failed, one skipped. All 13 named failures reproduce on unchanged base `484d5eb`; they involve old frozen unit/character snapshots, description-length expectations, retired checkpoint bounds and historical progression/teaching checks. The current feature/curriculum gate passes. These historical failures are reported rather than weakening their assertions.

`tests/browser/cumulative.cjs` starts its own local Vite server. Run with Playwright available; optional `CHROMIUM_PATH` and `CJK_FONT_DIR` support minimal headless environments. Browser results are temporary and are not part of the application bundle.
