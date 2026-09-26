# Book 1 Lesson 15 — Dependency-Ledger Handoff

Working repository: `Weather-Mister/hanzi-steps`

Working draft PR: **#69**

Working branch: `book1-lesson15-source-a`

Production baseline: `main` at `680ed5753382fb72151a1532095bca0a227c0658`.

Current published endpoint: Book 1 Source Lesson 14 / Hanzi Steps Unit 44.

Current protocol stage: **Stage 2 — dependency ledger**.

## What is complete

- Stage 0 preflight: **PASS**
- independent Source Extraction A: complete
- independent Source Extraction B: complete
- A ↔ B reconciliation: complete
- reconciled source ledger: `course/book1/lesson15-source-ledger.md`
- mandatory fresh-context source audit: **PASS**
  - `course/book1/lesson15-source-audit.md`
  - final findings: **0 BLOCKER / 0 MAJOR / 0 MINOR**
  - unresolved source disagreements: **0**
- source gate: **PASS**
- dependency gate: **pending**
- curriculum, activity, implementation, and release gates: **locked**
- no Lesson-15 Hanzi Steps unit boundaries have been designed.

The source audit repaired incomplete classroom-task preservation, dependency-facing source support, and minor source-detail fidelity before the source gate passed.

## Authoritative dependency input

Treat `course/book1/lesson15-source-ledger.md` as the canonical Lesson-15 source truth.

The source lesson remains:

- title: **「我很不舒服」**
- English: **“I Don’t Feel Well”**
- printed pp. **323–350**
- PDF pp. **350–377**

Do not silently redefine, drop, merge, or broaden source items during dependency classification.

## Required reading

Read:

- `automation/book1/PROTOCOL.md`, especially Stage 2 / Dependency ledger;
- `course/book1/completion.json`;
- `course/book1/lesson15-source-ledger.md`;
- `course/book1/lesson15-source-audit.md`;
- `course/index.json`;
- the generated cumulative production curriculum / registry needed to determine what the learner has actually been taught through Unit 44.

Inspect targeted prior Book-1 unit files only when needed to verify a disputed item, character, grammar pattern, phrase, pragmatic function, or prerequisite.

## Mandatory dependency task

For every source-ledger item that requires dependency disposition, assign exactly one:

- **NEW**
- **KNOWN**
- **REVIEW**
- **EXPANSION**
- **DEFERRED**

Rules:

1. **KNOWN** requires evidence that the actual cumulative production curriculum through Unit 44 taught the same learner-usable item/function, not merely a superficially similar string.
2. **REVIEW** requires genuine previous teaching plus an intentional Lesson-15 reuse role.
3. **EXPANSION** requires a clearly identified previously taught base and the exact new semantic/structural/pragmatic extension.
4. **NEW** must have one unambiguous Lesson-15 ownership record; do not duplicate NEW ownership.
5. **DEFERRED** requires an explicit source-grounded reason and an explicit destination/condition. Do not use DEFERRED to hide a prerequisite problem.
6. Support-only X items remain source inputs. Do not promote them to formal Lesson-15 vocabulary merely because they occur in a drill/activity.
7. Check the 63 formal-lexical characters plus dialogue/grammar/activity-only glyphs against the cumulative learner state; do not assume a character is known because the word is familiar.
8. Preserve all source grammar restrictions and contrasts when deciding equivalence. In particular, do not flatten:
   - non-committal question-word declaratives under negation;
   - the source’s introductory 把 restrictions;
   - V了…就… vs Lesson-13 一…就…;
   - Vs + 一點 vs 有（一）點 + Vs;
   - action comparison with 得;
   - 一點 / 得多 / 多了 degree complements;
   - separable-verb insertion behavior.
9. Treat the Activity-III prescription text and other activity/drill support as dependency inputs where assessed reuse could otherwise expose untaught material.
10. Build prerequisite edges explicitly and verify they point only backward to genuinely available knowledge.

## Mandatory checks before leaving the ledger stage

Search specifically for:

- false KNOWN classifications;
- semantic lookalikes incorrectly treated as equivalent;
- hidden vocabulary prerequisites;
- hidden character prerequisites;
- hidden grammar/pragmatics prerequisites;
- future dependencies;
- duplicate NEW ownership;
- circular prerequisite edges;
- unsupported deferrals;
- support language that would leak untaught material;
- formal-vs-support classification drift;
- source items with no disposition;
- dispositions with no evidence.

Do not design unit boundaries while performing this task.

## Required outputs

Persist:

- `course/book1/lesson15-dependency-ledger.md`

Then update `course/book1/completion.json` to the dependency-audit checkpoint without passing the dependency gate.

Prepare the separate fresh-context dependency-audit handoff:

- `course/book1/lesson15-dependency-audit-handoff.md`

The dependency gate may pass only after that mandatory fresh dependency audit returns:

- BLOCKER = 0
- MAJOR = 0

## Stop condition

Stop after the dependency ledger, controller checkpoint, and dependency-audit handoff are persisted.

Do **not**:

- perform the fresh dependency audit in the same dependency-ledger chat;
- design Lesson-15 Hanzi Steps unit boundaries;
- create a curriculum blueprint;
- create learner-facing activities;
- edit the live application;
- merge PR #69;
- publish anything.
