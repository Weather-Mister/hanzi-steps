# Book 1 Lesson 15 — IC-01 Visual Repair Handoff

Working repository: `Weather-Mister/hanzi-steps`  
Working draft PR: **#69**  
Working branch: `book1-lesson15-source-a`

Current checkpoint: **Stage 5 — second implementation repair, IC-01 only**.

## Gate state

- Source gate: **PASS**
- Dependency gate: **PASS**
- Gate A / curriculum: **PASS / frozen**
- Gate B / activities: **PASS / frozen**
- Implementation gate: **PENDING**
- Release gate: **LOCKED**
- Deterministic QA: **NOT READY**

The fresh implementation-conformance re-audit is persisted at:

- `course/book1/lesson15-implementation-conformance-reaudit.md`

Re-audit verdict: **FAIL — 1 BLOCKER / 0 MAJOR / 0 MINOR**.

Resolved findings:
- IC-02 semantic listening: **PASS**
- IC-03 support-only 您: **PASS**

Only IC-01 remains open.

## IC-01 — exact remaining defect

The current A002 visual-role cards are real visual UI, but they remain generic. They preserve role labels, acceptance/rejection mode, closings, and the common suggestion inventory, yet they do **not** preserve the source-specific symptom/advice information carried by each of the three textbook illustrations.

The frozen Gate-B requirement is unchanged:

- `u48-a002-visual-1`
- `u48-a002-visual-2`
- `u48-a002-visual-3`

must each provide the learner with the **source-specific visual information** needed to perform that role.

A generic silhouette, blank `我……`, generic suggestion list, or provenance label such as “A002 source prompt 1” does not satisfy this requirement.

## Required authoritative source

Use *A Course in Contemporary Chinese 1*, Lesson 15, Classroom Activity II “Who Is Taking Care of Me?”, printed pp. **346–347** / local PDF pp. **373–374**.

Read the actual three source illustrations before editing production.

Do **not** invent a symptom/advice mapping from memory, inference, or the existing generic cards.

Transcribe the information that the source illustrations themselves communicate.

## Mandatory repair

Repair IC-01 at the smallest Stage-5 implementation/schema/rendering blast radius.

For each of the three frozen IDs:

### `u48-a002-visual-1`
- preserve the exact source illustration/prompt information;
- preserve its source role shell;
- learner instruction remains **accept the suggestion**;
- response still closes with **好的。**.

### `u48-a002-visual-2`
- preserve the exact source illustration/prompt information;
- preserve its source role shell;
- learner instruction remains **accept the suggestion**;
- response still closes with **謝謝你。**.

### `u48-a002-visual-3`
- preserve the exact source illustration/prompt information;
- preserve its source role shell;
- learner instruction remains **politely reject the suggestion**;
- response still begins **謝謝你的關心。** and leaves the rejection completion open.

The shared source suggestion inventory remains:

- 看病
- 多休息
- 早一點睡覺
- 多喝水

But the implementation must now also expose the **card-specific source symptom/advice cues or equivalent source-faithful visual information** rather than presenting all three cards as the same generic prompt.

## Representation rule

Preferred order:

1. If repository/licensing/provenance rules permit and the source images can be safely packaged, use the exact source illustration assets.
2. Otherwise create a **source-faithful structured visual transcription** that preserves the same card-specific information communicated by the illustration.

A structured visual transcription is acceptable only if it is genuinely visual/learner-facing and source-specific. It must not collapse back to a paragraph label or generic silhouette.

Do not add details absent from the textbook.

## Deferred-glyph and ownership safeguards

Preserve the existing frozen safety rules:

- source role names may be contextual only;
- deferred/source-only glyphs must not become required answers;
- no source-only glyph gains canonical vocabulary ownership;
- no source-only glyph gains Search ownership;
- no source-only glyph gains Mega ownership;
- no source-only glyph gains handwriting ownership;
- do not make the learner type/recognize deferred **拒 / 絕** as a requirement.

## Regression constraints

Do not modify or regress:

- IC-02 repaired semantic listening behavior;
- IC-03 您 / 好的，謝謝您。 support;
- all frozen lesson/step IDs;
- 42 canonical NEW lexical forms;
- exactly two expansions 幾 / 跟;
- 30 NEW formal characters;
- 7 grammar rules;
- prerequisite direction;
- explain-before-test;
- handwriting lifecycle and locks;
- all 25 dialogue turns;
- A001/A003/A004/A005;
- review floors;
- delayed retrieval;
- Search/Mega behavior;
- Unit-48 cumulative closure;
- 一直 / 直 first-ownership migration;
- Book-2 Unit-1 saved-progress IDs/order.

## Verification required in the repair context

Before stopping, verify at least:

- each A002 visual ID carries distinct source-specific information;
- the three cards are not semantically interchangeable;
- no card contains invented textbook content;
- acceptance/rejection roles remain correct;
- deferred-glyph safety remains intact;
- any schema/renderer changes type-check locally where available;
- validator/test coverage checks the presence of **source-specific card content**, not merely nonempty generic visual metadata.

Full deterministic QA is still a later protocol stage.

## Required outputs

After the repair:

1. Persist the minimal implementation/schema/renderer/assets/tests changes.
2. Update `course/book1/completion.json`:
   - remain at Stage 5 implementation;
   - clear IC-01 only if genuinely repaired;
   - implementation gate stays pending;
   - release stays locked.
3. Prepare:
   - `course/book1/lesson15-implementation-conformance-reaudit2-handoff.md`

That re-audit handoff must require an independent comparison against the unchanged frozen Gate-B packet, explicitly rechecking:
- IC-01 source-specific A002 visual information;
- IC-02 semantic listening remains repaired;
- IC-03 honorific support remains repaired;
- all previously passing regression areas.

## Stop condition

Stop after the IC-01 repair and re-audit2 handoff are persisted.

Do **not**:
- perform the re-audit in the repair context;
- advance to deterministic QA;
- run learner simulations;
- run traceability/release audit;
- pass Gate C;
- merge PR #69;
- publish/deploy;
- mark Book 1 complete.
