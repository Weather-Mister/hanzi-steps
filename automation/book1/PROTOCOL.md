# Hanzi Steps — Book 1 Completion Protocol

This is the zero-extra-cost, high-reliability curriculum pipeline used to finish Book 1.

The repository is the source of truth. Chat conversations are workers, not memory.

## Reliability target

The goal is not to force every run to finish. The goal is to prevent a release with a known BLOCKER or MAJOR defect.

A stage may stop at `human-review` rather than guess.

## Permanent rules

1. A Course in Contemporary Chinese Book 1 is the authoritative linguistic source.
2. Traditional Chinese as used in Taiwan is the learner-facing standard.
3. Pinyin uses tone marks.
4. No stage may silently redefine a frozen upstream artifact.
5. Deterministic claims are checked in code whenever possible.
6. Critical semantic audits are performed in fresh ChatGPT contexts.
7. BLOCKER and MAJOR findings must be resolved before a gate passes.
8. A curriculum-level change reopens every affected downstream gate.
9. The live application is not edited before Gate B passes.
10. Book 1 is not complete merely because Lesson 15 has units; it requires the final whole-book audit.

## Controller

The current state lives in:

`course/book1/completion.json`

Always read that file before continuing Book 1 work.

## Stages

### 0. Preflight

Confirm:
- latest main state
- highest complete Book 1 unit
- latest completely covered source lesson
- next source lesson
- no conflicting active curriculum work
- exact source boundaries
- existing curriculum registry is current

Exit only when the starting state is unambiguous.

### 1. Dual source extraction

Create Source Extraction A and Source Extraction B independently.

Each extracts:
- vocabulary
- grammar
- characters
- communicative functions
- dialogue requirements
- pragmatics
- culture
- learning objectives
- important example patterns

Neither extractor sees the other result.

Each source item receives a durable ID such as:
- B1L14-V001
- B1L14-G001
- B1L14-C001
- B1L14-F001

Every item must retain a source anchor.

Reconcile disagreements explicitly.

#### Source audit

A fresh-context auditor receives only the authoritative source and reconciled ledger.

Question: what is missing, duplicated, distorted, unsupported, or misclassified?

Gate condition:
- 0 BLOCKER
- 0 MAJOR
- all source disagreements resolved

### 2. Dependency ledger

Compare the source ledger with the generated cumulative production curriculum.

Every item receives exactly one disposition:
- NEW
- KNOWN
- REVIEW
- EXPANSION
- DEFERRED

DEFERRED requires an explicit reason and destination.

Build prerequisite edges and check for:
- future dependencies
- false KNOWN classifications
- duplicate NEW ownership
- circular dependencies
- hidden character/grammar prerequisites

A fresh dependency audit is mandatory.

### 3. Curriculum architecture

Three design passes:
1. rough split
2. refined split
3. final blueprint

Each proposed Hanzi Steps unit records:
- communicative goal
- new vocabulary
- review vocabulary
- grammar
- characters
- prerequisite IDs
- source IDs covered
- deliberate deferrals
- approximate cognitive load

Then run three independent audits:

#### Audit 1 — Source fidelity
Does every required source item have a justified home?

#### Audit 2 — Pedagogy
Check sequencing, load, prerequisites, coherence, review balance, character progression, and unit boundaries.

#### Audit 3 — Adversarial architecture
Assume the plan is flawed and actively search for omissions, duplication, premature material, overloaded units, thin units, bad deferrals, hidden prerequisites, and unjustified additions.

### Gate A — Curriculum freeze

Gate A passes only with:
- source gate PASS
- dependency gate PASS
- curriculum audits PASS
- 0 BLOCKER
- 0 MAJOR

After Gate A, moving source ownership or curriculum boundaries requires reopening Gate A.

### 4. Activity engineering

For every important new concept, specify a learning lifecycle:

EXPLAIN
→ RECOGNIZE
→ CONTROLLED PRACTICE
→ CONTEXTUAL USE
→ RETRIEVAL
→ DELAYED RETRIEVAL
→ CUMULATIVE MIXING

Relevant characters additionally require recognition, reading, handwriting, and later retrieval.

Applicable material must be intentionally represented in:
- unit review
- Pinyin Search
- Mega Challenge

Three mandatory audits:

#### Activity Audit 1 — Teaching quality
Can a learner actually learn the target from the sequence?

#### Activity Audit 2 — Question correctness
Attack every learner-facing question for:
- two defensible answers
- no defensible answer
- wrong key
- accidental clue
- untaught vocabulary
- untaught grammar
- bad pinyin
- Simplified contamination
- unnatural Taiwan Mandarin
- misleading English
- weak distractors

#### Activity Audit 3 — Cross-unit coherence
Look across the complete source-lesson batch for sequencing, ownership, cumulative review, Search, Mega, and character inconsistencies.

### Gate B — Activity freeze

No implementation begins before:
- Gate A PASS
- all three activity audits PASS
- 0 BLOCKER
- 0 MAJOR

After Gate B, implementation should be transcription, not curriculum invention.

### 5. Implementation

Implement the frozen activity specification faithfully.

Any unavoidable deviation must be documented.

Run an implementation conformance audit comparing:
Frozen Activity Spec ↔ Actual learner-facing implementation.

Unexplained divergence is a BLOCKER.

### 6. Deterministic QA

Run the repository's existing quality system and expand it where necessary.

Required checks include:
- curriculum generation
- curriculum graph validation
- targeted changed-unit tests
- character coverage
- vocabulary lookup
- Mega Challenge
- practice engine/content
- TypeScript
- Pages build
- unit number uniqueness
- source/concept ID integrity
- ownership integrity
- prerequisite direction
- review coverage
- Search coverage
- Mega coverage
- migration integrity

The full deterministic suite must pass after the final code change.

### 7. Learner simulation

Use three fresh-context simulations.

#### Learner A — strict prerequisite learner
Knows exactly the previous published units and nothing later.

#### Learner B — adversarial test taker
Tries to break questions, answer keys, clues, and distractors.

#### Learner C — cumulative learner
Completes the new batch sequentially and focuses on retention, progression, review, Search, and Mega.

Any BLOCKER or MAJOR finding reopens the smallest affected upstream gate.

### 8. Bidirectional traceability

Direction 1:
TEXTBOOK → SOURCE LEDGER → BLUEPRINT → ACTIVITIES → PRODUCTION

Direction 2:
PRODUCTION → ACTIVITIES → BLUEPRINT → SOURCE / PREVIOUS CURRICULUM / EXPLICIT APPROVED ADDITION

Release conditions:
- unresolved source items = 0
- orphan production concepts = 0

### 9. Final hostile release audit

Use a fresh context.

Give it:
- source packet
- source ledger
- dependency ledger
- frozen blueprint
- frozen activity spec
- implementation
- deterministic QA results
- learner simulation findings
- traceability report

Do not give it previous reviewers' praise or reasoning.

Its job is to find evidence that the release should be blocked.

### Gate C — Release

Requires:
- Gate A PASS
- Gate B PASS
- implementation PASS
- deterministic QA PASS
- all learner simulations PASS
- traceability PASS
- hostile release audit PASS
- 0 BLOCKER
- 0 MAJOR

### 10. Production verification

After merge/deploy:
- new units visible
- lessons load
- answers work
- handwriting works
- progress saves and reloads
- Pinyin Search includes intended material
- Mega Challenge includes intended material
- no production-only error

### 11. Final whole-Book-1 audit

After Source Lesson 15 is released, do not immediately mark Book 1 complete.

Regenerate the entire Book 1 registry and verify:
- all 15 source lessons accounted for
- every source item resolved
- no unresolved DEFERRED items
- no orphan production concepts
- no duplicate NEW ownership
- no future prerequisites
- handwriting ownership valid
- Search coverage valid
- Mega coverage valid
- cumulative review valid
- full curriculum test suite passes
- production build passes

Then run one fresh whole-book adversarial audit.

Only then set:
`bookComplete: true`
`currentStage: "complete"`

## Finding severity

### BLOCKER
Factually wrong content, missing required source material, wrong answer, broken prerequisite, broken implementation, or release-safety failure.

### MAJOR
Pedagogically weak sequencing, inadequate teaching/practice, overloaded structure, unnatural examples that materially hurt learning, or serious cross-unit inconsistency.

### MINOR
Wording, polish, formatting, or harmless UX issue.

A gate may pass only with 0 BLOCKER and 0 MAJOR findings.

## Blast radius

Every fix is classified:
- LOCAL
- ACTIVITY
- UNIT
- CROSS_UNIT
- CURRICULUM
- SOURCE

Re-run only affected checks, but never skip a required upstream gate after a curriculum/source change.

## Uncertainty policy

Use:
- CLEAR
- AMBIGUOUS
- SOURCE_CONFLICT

AMBIGUOUS or SOURCE_CONFLICT findings that affect curriculum block automation and require human judgment.

## Fresh-context requirement

At minimum, these must be done in fresh ChatGPT chats:
- source audit
- dependency audit
- curriculum adversarial audit
- activity question/adversarial audit
- final hostile release audit

For maximum independence, use fresh chats for all nine substantive semantic audits.

## Zero-cost operating model

No OpenAI API is required.

GitHub:
- stores state and frozen artifacts
- performs deterministic tests
- provides version history and PR isolation

ChatGPT:
- performs source interpretation
- curriculum design
- semantic audits
- learner simulations
- implementation assistance

The tradeoff versus a paid autonomous pipeline is manual handoff between fresh ChatGPT contexts, not lower release standards.
