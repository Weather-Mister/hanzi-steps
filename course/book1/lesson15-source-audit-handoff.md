# Book 1 Lesson 15 — Fresh Source Audit Handoff

Working repository: `Weather-Mister/hanzi-steps`

Working draft PR: **#69**

Working branch: `book1-lesson15-source-a`

Production baseline: `main` at `680ed5753382fb72151a1532095bca0a227c0658`.

Current published endpoint: Book 1 Source Lesson 14 / Hanzi Steps Unit 44.

Current protocol stage: **Stage 1 — mandatory fresh source audit**.

## What is complete

- Stage 0 preflight: **PASS**
- independent Source Extraction A is persisted:
  - `course/book1/lesson15-source-extraction-a.md`
- Source Extraction B is persisted:
  - `course/book1/lesson15-source-extraction-b.md`
- A ↔ B reconciliation is complete:
  - `course/book1/lesson15-source-reconciliation.md`
- final reconciled source ledger is persisted:
  - `course/book1/lesson15-source-ledger.md`
- controller state is advanced to:
  - `currentStage: "source-audit"`
  - `stageStatus: "pending"`
- source gate remains **pending**
- all downstream gates remain **locked**
- no Lesson-15 Hanzi Steps unit boundaries have been designed.

## Authoritative source

Use *A Course in Contemporary Chinese 1* only.

Lesson 15:
- title: **「我很不舒服」**
- English: **“I Don’t Feel Well”**
- printed pp. **323–350**
- PDF pp. **350–377**

Appendix begins at printed p. 351 / PDF p. 378 and is outside Lesson 15.

## CRITICAL fresh-context audit rule

Before completing your own source audit, read only:

- `automation/book1/PROTOCOL.md`, especially Stage 1 / Source audit;
- `course/book1/lesson15-source-ledger.md`;
- this handoff;
- the authoritative Lesson-15 textbook range itself.

Do **not** read before completing the independent audit:

- `course/book1/lesson15-source-extraction-a.md`
- `course/book1/lesson15-source-extraction-b.md`
- `course/book1/lesson15-source-reconciliation.md`
- any future Lesson-15 dependency, blueprint, activity, implementation, or audit artifact.

The audit must test the reconciled ledger independently rather than inheriting the extractors’ assumptions.

## Mandatory audit question

Against the authoritative textbook, what is:

- missing;
- duplicated;
- distorted;
- unsupported;
- misanchored;
- misclassified as formal vs support-only;
- incompletely preserved in restrictions, contrasts, negation, questions, pragmatics, drills, activities, visuals, culture, or self-assessment?

Search specifically for:

- omitted formal vocabulary / phrases;
- omitted dialogue turns or scene markers;
- wrong pinyin, source class, or gloss;
- grammar restrictions softened or generalized beyond the source;
- source examples/drills named without preserving the requirement they instantiate;
- hidden task-support vocabulary or structures missing from the X-ledger;
- prescription-image support omissions;
- activity goals or required outcomes incompletely preserved;
- culture claims broadened beyond textbook wording;
- character inventory count/order errors;
- unsupported extra source items;
- source-anchor/page errors;
- pragmatic claims that exceed what the source itself establishes.

## Audit result format

Return findings by severity:

- **BLOCKER**
- **MAJOR**
- **MINOR**

Then return **PASS / FAIL**.

PASS requires:

- BLOCKER = 0
- MAJOR = 0
- unresolved source disagreements = 0

## If defects are found

Repair `course/book1/lesson15-source-ledger.md` only as needed to restore source fidelity.

Then re-audit the corrected ledger against the textbook until the source stage genuinely satisfies the gate.

Persist the audit artifact at:

- `course/book1/lesson15-source-audit.md`

Update `course/book1/completion.json` accordingly.

Only if the final audit is a genuine PASS:

- set source gate to **pass**;
- advance the controller to the dependency-ledger stage;
- keep curriculum/activity/implementation/release gates locked;
- prepare the repository for the separate dependency-ledger worker.

If the audit does not genuinely pass:

- keep the source gate pending/failed as appropriate;
- record open findings;
- do not advance.

## Stop condition

Stop after the source audit artifact and controller update are persisted.

Do **not**:

- create the dependency ledger in this audit chat;
- classify items NEW / KNOWN / REVIEW / EXPANSION / DEFERRED;
- design Unit 45 or any Lesson-15 unit boundary;
- create learner-facing activities;
- edit the live application;
- merge PR #69;
- publish anything.
