# Lesson 13 Phase 2 pre-implementation audit

Scope: final audit of the approved pre-implementation blueprints for Book 1 Lesson 13, planned Hanzi Steps Units 37–41.

This audit is intentionally separate from learner-facing implementation. It checks the Phase 2 plans against:
- the three-pass Lesson 13 source ledger;
- the chronological curriculum state after Book 1 Unit 36;
- ADDING_A_UNIT.md;
- course/schema.ts;
- the established Units 34–36 planning/implementation shape;
- the Book 1 completion quality guardrails.

## Final mechanical coverage result

- Source-listed Lesson 13 entries: **40 / 40 assigned exactly once**
- Missing source entries: **0**
- Duplicate source assignments: **0**
- Dialogue I turns: **14 / 14 assigned**
- Dialogue II turns: **13 / 13 assigned**
- Formal grammar sections: **7 / 7 assigned**
- End-of-lesson learning objectives: **4 / 4 represented**
- Formal-source chronological new characters after Unit 36: **24**
- Planned first-character assignments: **24 / 24, exactly once**
- Planned unit lesson topology: **7 lessons per unit = six teaching lessons + one review**
- Reserved Lesson 13 grammar IDs: **7**

## Final lexical-accounting correction

The final pass distinguishes implementation indexing from honest pacing.

Planned exact first-taught vocabulary/expression forms indexed for practice:
- **35 total**
- **26 ordinary Vocabulary I/II forms**
- **9 textbook Phrase forms**

The nine Phrase forms remain explicit teaching targets because the source lists them and they need phrase-level pragmatic treatment. They must be reported separately and must **not** be used to inflate the ordinary/new-word pacing count.

Already-known exact forms receiving a new sense/function:
- 怎麼
- 那麼
- 了
- 對

Contextual Name support:
- 西班牙

## Pacing audit

Unit-level ordinary lexical load:
- Unit 37: 7 ordinary + 3 source Phrase forms
- Unit 38: 8 ordinary + 2 source Phrase forms
- Unit 39: 7 ordinary + 1 source Phrase form
- Unit 40: 2 ordinary + 1 source Phrase form
- Unit 41: 2 ordinary + 2 source Phrase forms

Units 40–41 are intentionally below the usual lexical target. This was re-audited rather than accepted merely because Lesson 13 ends there.

Rebalancing into Lesson 14 is rejected because:
- Unit 40 already carries the full question-word totality system, negative total exclusion, its question restriction, 多／少 + Verb, source birthday-custom integration, and the sentence-final-了 contrast;
- Unit 41 carries 是不是 pragmatics, the complete 跟…一樣 comparison system including two negation scopes/questions, wishes, Dialogue II closure, and the four-objective Lesson 13 capstone;
- moving Unit 39 food vocabulary later would weaken the source 訂了 → completed-action 了 anchor and/or expose untaught characters;
- beginning the unrelated weather topic before Lesson 13's comparison/wishes capstone would reduce coherence rather than improve learning load.

## Character / ownership audit

The 24 chronological new characters are fully allocated:

- Unit 37: 忘、記、當、然
- Unit 38: 交、換、牙、必、氣、門、口
- Unit 39: 禮、物、訂、豬、腳、蛋
- Unit 40: 傳、統、輕、部
- Unit 41: 糕、祝、如

Special ownership cases remain explicit:
- 樂: existing character, new reading lè in 快樂;
- 過: existing Book 1 character, vocabulary first-ownership moves from Book 2 Unit 3 to Unit 38;
- 口: character first-ownership moves from Book 2 Unit 1 to Unit 38;
- 對: existing character/semantic hint, productive 對 + person use formalized in Unit 41.

## Preview / prerequisite audit

Comprehension-only before formal teaching:
- 忘了 → completed-action 了 formalized in Unit 39
- 我什麼都吃 → totality formalized in Unit 40
- 多吃一點 → 多／少 + Verb formalized in Unit 40
- 是不是 → confirmation formalized in Unit 41
- 跟…一樣 → comparison formalized in Unit 41

No productive assessment is planned before the owning grammar unit.

Proper-name and source-example glyph risks remain bounded:
- dialogue/name risks: 怡、君、安、蓮、妳
- grammar/example risks: 漂、亮、玉、田、李、冷、銀、王

The plans either normalize, romanize, omit as a learner target, or adapt these examples rather than silently creating new handwriting obligations.

## Review-quality gate

Every Unit 37–41 implementation must keep:
- six teaching lessons + one review;
- roughly **18–22 useful review activities**;
- **at least 3 listening activities** in review;
- independent assessment of every unit-owned grammar target;
- fair retrieval of indexed vocabulary/expressions;
- writing/character retrieval;
- transfer beyond exact source-sentence repetition.

These are quality floors, not filler quotas.

## Final Phase 2 status

The blueprint is internally consistent with the source ledger and repository authoring rules.

Frozen sequence:
- Unit 37 — phone/birthday foundation
- Unit 38 — language exchange + appointment + 一…就…
- Unit 39 — birthday dinner + completed-action 了 + 不 vs. 沒（有）
- Unit 40 — totality + 多／少 + birthday customs
- Unit 41 — 是不是 + 跟…一樣 + wishes + Lesson 13 capstone

No learner-facing Unit 37–41 code is implemented in Phase 2.

Next step: implement Unit 37 from unit37-source-plan.md and lesson13-phase2-blueprint.md without redesigning the curriculum during coding unless a concrete source-backed defect is discovered.
