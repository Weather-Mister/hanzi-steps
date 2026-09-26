# Book 1 Lesson 15 — Simulation B/C Repair + Conformance + QA

Working PR: **#69**  
Branch: `book1-lesson15-source-a`

## Verdict

**PASS — 0 BLOCKER / 0 MAJOR / 0 MINOR**

Simulation B reported three MAJOR findings and Simulation C reported two MAJOR findings. All five have been repaired, conformance-checked in the repair loop, regression-guarded, and validated by a complete Feature QA run.

## Repaired findings

### SIM-B-01 — support/source phrases leaking into productive practice

Added `practice:false` where required for:
- `u46-thanks-nin`
- `u46-a004-support-sorry`
- the three A004 response cards
- `u48-minute-support`
- `u48-a001-table`

Existing A003 support/source cards remain `practice:false`.

A regression guard verifies these support/source-data phrases never enter adaptive/Mega productive phrase practice.

### SIM-B-02 — A004 response outcomes missing

Restored all three frozen learner-visible response outcomes:
1. `好的，沒有問題。`
2. `太好了。`
3. `對不起，我不知道是你的。`

They are shown directly after their matching A004 stimulus/order items and remain source-transfer/contextual only, not productive practice ownership.

### SIM-B-03 — hidden grammar IDs / curriculum metadata in assessed prompts

Reworded affected assessed prompts in Units 46–48 to describe the actual Chinese pattern instead of requiring invisible codes such as G001/G003/G006/G007.

Also removed the curriculum-sequencing wording “lexically available before this grammar lesson” from assessment.

The frozen/current unit activity specs were updated to match the learner-facing wording without changing answer keys or educational semantics.

A regression guard rejects hidden G001–G007 identifiers or “lexically available before” wording on assessed surfaces.

### SIM-C-01 — Pinyin Search exposed future vocabulary

Learner-facing Pinyin Search now uses `searchLearnedVocabulary(query, completed)`, so canonical vocabulary appears only after its owning lesson is completed.

The underlying global `searchVocabulary` lookup remains available for internal/global lookup needs.

Search handwriting gating remains intact.

Regression checks confirm:
- 醫生 is hidden before `u45-doctor` and visible afterward;
- 回家 is hidden through Unit 47 and visible after `u48-advice`.

### SIM-C-02 — Unit 47 integrated D2T01–D2T07 replay miswired

`u47-integrated` now points to a dedicated `u47-d2t01-07-integrated` phrase rather than repeating D2T02.

The integrated card preserves all seven turns in sequence with generic speaker roles, omits proper-name glyph requirements, normalizes direct-address 妳 to learner-known 你, and is `practice:false`.

The Unit-47 activity specification was updated to explicitly freeze this integrated card.

## Deterministic QA

Authoritative authored head:
- `9d81abf144e06f60914be18f6b58bad7c8d6ad52`

Feature QA:
- run **#690**
- id **36243000967**
- conclusion: **SUCCESS**

Complete suite:
- **206 tests**
- **205 pass**
- **0 fail**
- **1 intentional skip**
- curriculum generation: PASS
- graph validation: PASS
- targeted changed-unit tests: PASS
- character coverage: PASS
- regression suite: PASS
- TypeScript: PASS
- GitHub Pages build: PASS

Generated-only follow-up:
- `f7f083c65ae616e3187c4a20e2708e1167561f4c`
- changes only generated `course/registry.generated.ts`
- follow-up Feature QA #691 is `action_required` with no executable QA job; this is not a test failure.

## Stage exit

The repair loop is complete.

Simulation B and Simulation C must now be rerun independently in fresh contexts against the latest PR state. They may run in parallel.

Release remains locked. Book 1 remains incomplete.
