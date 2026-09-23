# Unit 35 deep implementation audit

## Audit scope

Unit 35 was re-audited against *A Course in Contemporary Chinese 1*, Lesson 12 Dialogue I, Vocabulary I, and Grammar II 是…的, then checked against cumulative Hanzi Steps ownership, teaching order, review retrieval, handwriting structure, exact stroke geometry, and repository validation behavior.

## Curriculum shape

- 9 formal NEW vocabulary items.
- 9 first-taught characters.
- 1 new grammar rule: 是…的 past-event focus.
- Six teaching lessons plus one review.
- Review now has 27 activities.
- 3 contextual listening tasks.
- 2 handwriting-memory tasks.
- Every formal NEW vocabulary item is retrieved in review.
- Earlier 又…又… remains REVIEW rather than being redeclared.

## Source coverage result

Dialogue I tail is complete:
- 我的學費是公司替我付的。
- 你打算學多久呢？
- 大概兩年，是公司決定的。
- 希望我以後也可以到這麼好的公司上班。
- 我又要上班，又要念書，真的很累。
- 我們一起加油吧！

Vocabulary I scope is clean: 學費、公司、替、希望、以後、上班、念書、累、加油 are taught here, while already-owned 到 remains review.

Standalone 以後 remains intentionally separate from deferred Grammar III Event + 以後.

## Defects found in the deep audit and repaired

### 1. Grammar II question coverage was incomplete

The first implementation explained that 是…的 supports questions, but active teaching did not represent the textbook's yes/no question pattern at all and only sampled part of the wh-question system.

Repair:
- added the source yes/no example 你的房租是自己付的嗎？;
- added explicit source examples for who/how/where questions;
- retained the existing when example;
- added independent review retrieval for yes/no and where-question formation.

### 2. Optional 是 had an unsupported extra condition

The first implementation answered that 是 can be omitted “when the focus remains recoverable.” The textbook only states that 是 can sometimes be omitted and gives examples; it does not state that extra condition in this lesson.

Repair:
- removed the added condition;
- now teaches the source statement directly;
- added the source omission example 我跟朋友一起來的。 and independent review retrieval.

### 3. Subject focus was under-demonstrated

The grammar explanation listed subject focus, but the clearest textbook subject-focus example was not explicitly taught.

Repair:
- added 是我打電話給房東的。 as an explicit subject-focus phrase;
- retained the Dialogue I tuition sentence, where the object is fronted and 公司 is the focused subject.

### 4. 替 was translated but its prepositional placement was not explicit enough

Vocabulary I identifies 替 as a preposition. The first implementation gave the gloss but did not make the learner-facing order sufficiently explicit.

Repair:
- character/vocabulary support now states 替 + person + action;
- 公司替我付 is explained as “the company pays for/on behalf of me.”

### 5. 替 character decomposition was structurally wrong

The original card labelled the lower four strokes 日 and used a self-referential label for the top. Taiwan-standard character data gives 替 as 㚘 + 曰.

Repair:
- top eight strokes: 㚘, described learner-safely as two 夫 shapes side by side;
- bottom four strokes: 曰;
- memory text updated accordingly;
- stroke geometry itself was already 12-stroke correct.

### 6. 班 character decomposition was too coarse

The original card treated all ten strokes as one undifferentiated whole despite the visible Taiwan-standard structure.

Repair:
- left 王 = strokes 0–3;
- narrow middle 丶丿 = strokes 4–5;
- right 王 = strokes 6–9;
- note now warns against confusing 班 with 斑.

The underlying ten-stroke geometry remains unchanged.

### 7. Two English meanings drifted from the textbook translations

The first implementation paraphrased:
- 大概兩年，是公司決定的。 as “It is the company that decides.”
- 學費是公司替我付的。 in the grammar example as “It is the company that pays my tuition for me.”

Repair:
- restored the textbook-aligned learner meanings “Probably two years. My company will decide.” and “My tuition is paid by my company for me.”

## Grammar II coverage after repair

The unit now actively teaches and tests:
- subject focus;
- time focus;
- place focus;
- manner focus;
- fronted object/topic;
- prohibition on object focus;
- 不是…的 negation;
- yes/no questions with 嗎;
- optional 是;
- who / when / how / where wh-questions;
- the restriction against “what” as object.

This is materially stronger than merely presenting the 是 + Focus + … + 的 frame.

## Teaching-order audit

After repair:
- no formal NEW Unit 35 word is assessed before its declared lesson;
- no first-taught Unit 35 character appears in assessment before its intro step;
- all newly explicit Grammar II source examples use previously taught characters/vocabulary or Unit 35 material already introduced;
- no deferred Dialogue II / Grammar III–IV target is silently promoted to NEW.

## Handwriting audit

All nine new characters have:
- exact target Unicode characters;
- matching metadata, stroke-path, and median counts;
- complete non-overlapping stroke grouping;
- character-specific notes and memory text.

Deep-audit regressions now pin the corrected 替 and 班 groupings so the earlier mistakes cannot silently return.

## Search / Mega Challenge / cumulative integration

Unit 35 vocabulary continues through the canonical generated course index, so the normal Pinyin Search and Mega Challenge regression suites cover the new vocabulary alongside targeted Unit 35 tests.

## Publication gate

Before merge, the final branch head must pass:
- stroke hydration;
- curriculum generation;
- curriculum graph validation;
- targeted Unit 35 test;
- character coverage;
- vocabulary lookup / Mega Challenge / practice regressions;
- all curriculum validation tests;
- TypeScript;
- GitHub Pages production build.

If Feature QA writes generated artifacts and advances the head, the generated head itself must receive a complete successful Feature QA pass before merge.
