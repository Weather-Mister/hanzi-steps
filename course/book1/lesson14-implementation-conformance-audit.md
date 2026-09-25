# Book 1 Lesson 14 — Implementation Conformance Re-audit after Gate-B repair

Scope:
- re-frozen repaired activity packet;
- actual `course/book1/unit42.ts`, `unit43.ts`, `unit44.ts`;
- Pinyin Search prerequisite-safety implementation.

Gate B status: **PASS / re-frozen**.

## Exact activity transcription

A deterministic spec-to-runtime comparison was performed for Units 42–44.

Compared fields:
- every phrase record: text, pinyin, meaning, note, tokens, grammarIds;
- every grammar record;
- every teaching-step ID/type/prompt/options/answer/explanation/grammarIds;
- every order target and token bank;
- every review/capstone step;
- lesson-local ordering.

Result:
- Unit 42 phrase diffs: **0**
- Unit 42 assessed-step diffs: **0**
- Unit 43 phrase diffs: **0**
- Unit 43 grammar diffs: **0**
- Unit 43 assessed-step diffs: **0**
- Unit 44 phrase diffs: **0**
- Unit 44 grammar diffs: **0**
- Unit 44 assessed-step diffs: **0**

Runtime-only `char` fields on listening steps are intentionally retained because the application listening renderer requires a character reference for its fallback/pinyin cue. These fields do not change the frozen learner-facing prompt, options, answer, explanation, or audio text.

## Stage-7 repairs now present in production modules

Verified in actual unit modules:
- Unit 42 spring listening no longer exposes untaught 秋天.
- Unit 42 weather-question distractors use taught, structurally plausible contrasts.
- Unit 42 source-transfer review now requires Chinese construction.
- Unit 43 A002 and cumulative review use actual Chinese interview language.
- Unit 44 G004 lesson contains no premature G005 distractor.
- Unit 44 A004 questions test actual Chinese.
- Unit 44 contains four explicit Unit-43 delayed-retrieval order items.
- Unit 44 final F/S001–004 capstone contains four Chinese order-production items.
- Unit 44 review contains **41** steps as frozen.

## Pinyin Search safety repair

Frozen Gate A requires:
- canonical Pinyin Search remains a **global lookup**;
- writing practice must not bypass character introduction;
- Mega/adaptive practice remains lesson-gated.

Implementation now does exactly that:
- `searchVocabulary()` remains unchanged/global;
- `searchPracticeCharacters(item, completed)` checks each glyph's first non-review teaching lesson;
- search results remain visible before that lesson;
- the Practice button is withheld until the character's first teaching lesson is complete;
- the UI reports “Writing practice unlocks after its lesson” when geometry exists but practice is still locked;
- `LearningApp` passes the transitive completed-lesson set into Pinyin Search.

A targeted regression test covers:
- future Unit-42 冷 remains searchable but has no practice action before `u42-weather`;
- practice unlocks after `u42-weather`;
- future Unit-44 颱風 remains searchable;
- 颱 writing unlocks only after `u44-typhoon`.

## Frozen upstream integrity

The repairs do **not** change:
- source ledger ownership;
- Gate-A unit boundaries;
- canonical NEW vocabulary ownership;
- formal grammar ownership;
- character ownership/order;
- deferred proper-name/support handling.

## Findings

- BLOCKER: **0**
- MAJOR: **0**
- MINOR: **0 open**

# Result: PASS

Implementation now conforms to the re-frozen Gate-B packet. Deterministic QA must run on this final implementation head before learner simulations are repeated.
