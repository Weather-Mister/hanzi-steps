# Book 1 Lesson 14 — Activity Audit 1 Re-audit 4

Reason: Stage 9 hostile release audit found FR-001, a genuine source-transfer omission in B1L14-A001. Unit 42 modeled home-country climate and seasonal preferences but did not explicitly require the learner to perform the personal transfer task.

## Repaired activity-layer behavior

The repaired Unit-42 packet now makes A001 learner-facing through the existing `u42-home-country-model` phrase card.

Its note explicitly instructs the learner, before continuing, to:
1. describe the climate of **their own home country/place** in Chinese;
2. state which season **they personally like most and least**;
3. explain **their own reason** with 因為…所以…;
4. say the answer aloud or write it on paper rather than merely copying the model.

The `u42-season-reason` card now reinforces that the fixed spring sentence is a model and cannot substitute for the learner's own response.

The lesson specification explicitly states that fixed-model selects/order tasks are controlled practice only and do not satisfy A001 by themselves.

## Teaching-quality review

### Source-transfer authenticity
PASS.

The repaired task is now genuinely personalized rather than recognition-only. It preserves the source activity's communicative purpose without inventing new vocabulary or grammar.

### Explain-before-transfer
PASS.

Before the personal task, the learner has already received:
- all four season words;
- ordinary weather language;
- 比較 preference support;
- 因為…所以… as prior review;
- model sentences for home-country climate and preference/reason.

The task therefore asks for recombination of taught material, not unsupported free production.

### Learner-facing visibility
PASS at the activity-spec level.

Phrase notes are rendered by the production `phrase` card as visible “How the phrase works” learner text. The repaired instruction is therefore designed for an existing visible learner surface, not hidden curriculum metadata.

### Scope
PASS.

No new formal vocabulary, grammar, character, unit boundary, or source allocation is introduced. The change is limited to restoring the source-required transfer action.

### A005 separation
PASS.

A005 retains its separate learner-facing “discuss and write findings in Chinese” instruction. A001 and A005 are no longer conflated.

## Findings

- BLOCKER: **0**
- MAJOR: **0**
- MINOR: **0 open**

# Result: PASS

Activity Audit 1 passes on the FR-001 repaired candidate. Gate B remains pending the mandatory fresh-context Activity Audit 2 re-audit.
