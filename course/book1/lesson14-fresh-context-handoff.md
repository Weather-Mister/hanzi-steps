# Book 1 Lesson 14 — Fresh-context handoff

Current production baseline: `main` at `caf8bef722d1bd43a0acaa48e1cc5dffc1010ffb`.
Current published endpoint: Book 1 Source Lesson 13 / Hanzi Steps Unit 41.
Working PR: #68 on branch `book1-lesson14-source-a`.

The next protocol action is **not implementation**. The source gate is still pending.

## Handoff A — independent Source Extraction B

Use a fresh ChatGPT context with the authoritative Book 1 textbook available.

Before extracting, read:
- `automation/book1/PROTOCOL.md`
- `course/book1/completion.json`

Then read **only** the authoritative textbook source for Lesson 14:
- 「天氣這麼冷！」
- printed pp. 299–321
- PDF pp. 326–348

Do **not** read any of these before finishing the independent extraction:
- `course/book1/lesson14-source-extraction-a.md`
- `course/book1/lesson14-source-extraction-b.md`
- `course/book1/lesson14-source-reconciliation.md`
- `course/book1/lesson14-source-ledger.md`

Independently extract:
- vocabulary / names / phrases;
- grammar, including restrictions, negatives, questions, contrasts, and source usage notes;
- dialogue requirements;
- characters;
- communicative functions;
- pragmatics;
- culture;
- learning objectives;
- classroom activities;
- important example/drill patterns and any support language that could become a hidden prerequisite.

Use durable IDs compatible with the existing Lesson-14 scheme.

Only after the blind extraction is complete may that fresh context read Extraction A and the provisional artifacts. Replace the provisional `lesson14-source-extraction-b.md` with the truly independent result, reconcile A ↔ B explicitly, and regenerate `lesson14-source-reconciliation.md` and `lesson14-source-ledger.md`.

If the independent B disagrees materially with A, resolve the discrepancy from the textbook rather than voting by majority.

## Handoff B — fresh source audit

After Handoff A and reconciliation are complete, use **another fresh ChatGPT context**.

Give that auditor only:
- the authoritative Lesson-14 textbook range (printed pp. 299–321 / PDF pp. 326–348);
- the final reconciled `course/book1/lesson14-source-ledger.md`;
- the source-stage rules in `automation/book1/PROTOCOL.md`.

Do not give it previous reviewers' praise or reasoning.

Audit prompt:

> Independently audit this ledger against the authoritative source. Find omissions, duplicates, distortions, unsupported additions, bad source anchors, and misclassifications. Do not redesign the curriculum. Return BLOCKER/MAJOR/MINOR findings and a pass/fail verdict. Pass requires zero BLOCKER and zero MAJOR.

Persist the audit result in the repository. The source gate may pass only with:
- independent Extraction B satisfied;
- reconciliation refreshed;
- 0 unresolved source disagreements;
- fresh source audit PASS;
- 0 BLOCKER;
- 0 MAJOR.

Only then advance to the dependency ledger. Do not create Unit 42 or later units before Gate B eventually passes.
