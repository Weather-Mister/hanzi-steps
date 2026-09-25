# Book 1 Lesson 14 — Fresh-context dependency-audit handoff

Current production baseline: `main` at `caf8bef722d1bd43a0acaa48e1cc5dffc1010ffb`.

Current published endpoint: Book 1 Source Lesson 13 / Hanzi Steps Unit 41.

Working PR: #68 on branch `book1-lesson14-source-a`.

## Completed before this handoff

The Lesson-14 source gate has passed.

The dependency-builder pass has now created:

- `course/book1/lesson14-dependency-ledger.md`

The ledger compares the validated Lesson-14 source against the cumulative production curriculum through Unit 41 and classifies source items as NEW / KNOWN / REVIEW / EXPANSION / DEFERRED.

The builder pass also checked:
- false-known classifications;
- duplicate NEW ownership;
- future dependencies;
- hidden character prerequisites;
- circular dependencies;
- source-support language;
- prior grammar ownership.

Builder status:
- open BLOCKER: 0
- open MAJOR: 0
- dependency gate: **still pending**

No Unit 42+ curriculum architecture has begun.

## Mandatory next action — fresh dependency audit

Use a **new ChatGPT context**.

Read only the material needed to audit dependencies:

1. `automation/book1/PROTOCOL.md`, especially Stage 2 / dependency rules.
2. `course/book1/lesson14-source-ledger.md`.
3. `course/book1/lesson14-dependency-ledger.md`.
4. The cumulative production curriculum evidence through Unit 41:
   - `course/index.json`;
   - targeted prior unit files only when needed to verify a disputed semantic/grammar classification.

Do not redesign unit boundaries and do not create Unit 42.

Audit prompt:

> Audit NEW/KNOWN/REVIEW/EXPANSION/DEFERRED classifications and prerequisite ordering for Book 1 Lesson 14. Search for false-known items, hidden prerequisites, future dependencies, duplicate NEW ownership, bad deferrals, and circularity. Check formal vocabulary, grammar, characters, source-support records, dialogue dependencies, and any learner-facing character risks. Do not design unit boundaries. Return BLOCKER / MAJOR / MINOR findings and PASS/FAIL. PASS requires zero BLOCKER and zero MAJOR.

If defects are found:
- fix `course/book1/lesson14-dependency-ledger.md`;
- re-audit until the dependency stage genuinely passes;
- persist the audit as `course/book1/lesson14-dependency-audit.md`;
- update `course/book1/completion.json`;
- commit everything to the existing PR #68.

The dependency gate may pass only when:
- BLOCKER = 0;
- MAJOR = 0;
- classifications are internally consistent;
- no future prerequisite remains;
- no duplicate NEW ownership remains;
- no bad DEFERRED item silently loses source coverage;
- no circular dependency remains.

If and only if the dependency gate passes, stop with the repository ready for **curriculum architecture**.

Do not begin rough unit splitting, Unit 42 design, activity engineering, or implementation in the dependency-audit context.
