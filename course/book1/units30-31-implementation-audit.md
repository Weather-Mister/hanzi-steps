# Units 30–31 implementation audit

## Curriculum design

This batch follows the flexible pacing rule rather than mechanically splitting at textbook subheadings.

- Unit 30 finishes the supported fruit/taste language from Dialogue I, then moves into the first photo/clothing items from Dialogue II so the unit reaches a normal lexical load without padding.
- Unit 31 finishes the supported Dialogue II vocabulary and all remaining Lesson 10 grammar.
- No transparent combination is counted as a new word merely to inflate novelty.

## Honest novelty

### Unit 30
- 11 new vocabulary/forms.
- 8 new characters.
- 3 new grammar targets.
- 22 review activities, including 3 listening activities plus handwriting/component retrieval.

### Unit 31
- 14 new vocabulary/forms.
- 12 new characters.
- 3 new grammar targets.
- 22 review activities, including 3 listening activities plus handwriting/component retrieval.

## Teaching-quality checks

Unit 30:
- distinguishes guessing 吧 from suggestion 吧 before testing;
- teaches VV看 meaning, formation, tentativeness and the source restriction on following objects;
- teaches reduplicated state verbs with 的, explicitly rejects 很 + reduplication, and states that the pattern is lexically restricted;
- extends 塊 and 請 through source-supported uses rather than relabeling them as new vocabulary;
- reuses verb + 得 + description with 笑得很開心 rather than pretending that 得 is new grammar.

Unit 31:
- teaches clause modifiers with both affirmative and negative clauses;
- separates sentence-final 了 for changed situation from simple past tense and includes negative/question interpretation;
- teaches 因為…所以… as cause then effect and reviews the clause-modifier pattern inside the cause;
- contrasts 從 as starting point with 往 as direction.

All learner-facing phrases and grammar examples are checked against the cumulative character prerequisites through Unit 31.

## Handwriting and first-teaching

Declared Unit 30 Traditional targets:
芒、紅、瓜、拍、笑、心、穿、衣

Declared Unit 31 Traditional targets:
窗、戶、住、男、矮、弟、些、乾、淨、藍、往、因

Both stroke-source declarations prefer `graphicsZhHant.txt`. For 芒、窗、戶, AnimCJK lacks Hant rows, so the hydrator may fall back only to the identical Unicode character from `graphicsZhHans.txt`; no alternate Simplified codepoint is allowed.

First-teaching ownership is intentionally migrated:
- 紅: Book 2 Unit 3 -> Book 1 Unit 30.
- 往: Book 2 Unit 1 -> Book 1 Unit 31.

Book 2 lesson IDs and step sequences are left untouched.

## Source-gap closure

Lesson 10's former 芒果 / 窗戶 omissions are now closed, and Unit 31 uses the textbook's 從窗戶往外看，是藍色的大海 context. The former 逛 gap is closed in Unit 29. Earlier out-of-scope gaps remain 網路上, 臺南, 故宮博物院 and 臺東.

All restored characters keep their exact Traditional/same-form Unicode codepoints; fallback geometry never substitutes a different Simplified character.

## Required verification before merge

The exact final PR head must pass:
- curriculum generation and graph checks;
- separate targeted tests for Unit 30 and Unit 31;
- character/stroke validation;
- full regressions including vocabulary lookup, mega challenge, lossless/compatibility and quality tests;
- TypeScript;
- Pages build.

If Feature QA writes generated artifacts, the resulting head must receive another exact-head successful run before merge. After merge, both Pages build and deploy must succeed, followed by deployed-artifact verification.

## QA history and current gate

The original Units 30–31 release previously passed exact-head Feature QA using its then-current Hant-only character set. This source-completeness pass changes learner content and adds 芒、窗、戶, whose exact Traditional/same-form Unicode geometry is expected to hydrate via the declared same-codepoint fallback because AnimCJK has no Hant row for those characters. A fresh full Feature QA run on the exact final head is therefore required before merge; the earlier successful run does not certify this new state.
