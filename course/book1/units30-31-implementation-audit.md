# Units 30–31 implementation audit

## Curriculum design

This batch follows the flexible pacing rule rather than mechanically splitting at textbook subheadings.

- Unit 30 finishes the supported fruit/taste language from Dialogue I, then moves into the first photo/clothing items from Dialogue II so the unit reaches a normal lexical load without padding.
- Unit 31 finishes the supported Dialogue II vocabulary and all remaining Lesson 10 grammar.
- No transparent combination is counted as a new word merely to inflate novelty.

## Honest novelty

### Unit 30
- 10 new vocabulary/forms.
- 7 new characters.
- 3 new grammar targets.
- 22 review activities, including 3 listening activities plus handwriting/component retrieval.

### Unit 31
- 12 new vocabulary/forms.
- 10 new characters.
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
紅、瓜、拍、笑、心、穿、衣

Declared Unit 31 Traditional targets:
住、男、矮、弟、些、乾、淨、藍、往、因

Both stroke-source declarations require `graphicsZhHant.txt` only.

First-teaching ownership is intentionally migrated:
- 紅: Book 2 Unit 3 -> Book 1 Unit 30.
- 往: Book 2 Unit 1 -> Book 1 Unit 31.

Book 2 lesson IDs and step sequences are left untouched.

## Known source gaps

Still explicit:
- Lesson 10: 芒果, 窗戶.
- Earlier source: 網路上, 臺南, 故宮博物院, 逛, 臺東.

No Simplified/Japanese geometry is substituted to make those items pass.

## Required verification before merge

The exact final PR head must pass:
- curriculum generation and graph checks;
- separate targeted tests for Unit 30 and Unit 31;
- character/stroke validation;
- full regressions including vocabulary lookup, mega challenge, lossless/compatibility and quality tests;
- TypeScript;
- Pages build.

If Feature QA writes generated artifacts, the resulting head must receive another exact-head successful run before merge. After merge, both Pages build and deploy must succeed, followed by deployed-artifact verification.
