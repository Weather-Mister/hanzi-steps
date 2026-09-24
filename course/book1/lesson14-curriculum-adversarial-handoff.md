# Book 1 Lesson 14 — Fresh-context adversarial curriculum-audit handoff

Current production baseline: `main` at `caf8bef722d1bd43a0acaa48e1cc5dffc1010ffb`.

Current published endpoint: Book 1 Source Lesson 13 / Hanzi Steps Unit 41.

Working PR: #68 on branch `book1-lesson14-source-a`.

## Completed before this handoff

Upstream gates:
- source: **PASS**
- dependencies: **PASS**

Curriculum architecture design passes:
- `course/book1/lesson14-curriculum-rough.md`
- `course/book1/lesson14-curriculum-refined.md`
- `course/book1/lesson14-curriculum-blueprint.md`

The final proposed architecture is **Units 42–44**.

Two curriculum audit lenses have already passed on the final proposed blueprint:
- source fidelity: `lesson14-curriculum-source-fidelity-audit.md`
- pedagogy: `lesson14-curriculum-pedagogy-audit.md`

Those prior audit verdicts are **not** inputs to the adversarial audit. Do not rely on their praise or reasoning.

Gate A remains **PENDING**.

## Mandatory next action — fresh adversarial architecture audit

Use a **new ChatGPT context**.

Read:
1. `automation/book1/PROTOCOL.md`, especially curriculum architecture / Gate A rules;
2. `course/book1/lesson14-source-ledger.md`;
3. `course/book1/lesson14-dependency-ledger.md`;
4. `course/book1/lesson14-curriculum-blueprint.md`;
5. Hanzi Steps unit/pacing rules from `ADDING_A_UNIT.md`.

Do **not** read the source-fidelity or pedagogy audit verdicts before doing your own adversarial pass.

Audit prompt:

> You did not create this Lesson-14 Units 42–44 plan. Assume it contains subtle flaws. Try to prove it should not pass Gate A. Look specifically for source omissions, duplicate ownership, hidden prerequisites, future prerequisites, artificial unit splits, overloaded or thin units, bad deferrals, unsafe proper-name/support handling, character-order problems, grammar taught after use, unsupported additions, cross-unit inconsistencies, Search/Mega ownership problems, and source activities/outcomes that are only named rather than actually supported. Do not implement units or design activity questions. Return BLOCKER / MAJOR / MINOR findings and PASS/FAIL. PASS requires zero BLOCKER and zero MAJOR.

If defects are found:
- fix `course/book1/lesson14-curriculum-blueprint.md`;
- if the fix changes a unit boundary, source ownership, prerequisite, vocabulary allocation, grammar allocation, or character allocation, update the rough/refined architecture artifacts as needed;
- re-audit the corrected final blueprint until the adversarial audit genuinely passes;
- persist the audit as `course/book1/lesson14-curriculum-adversarial-audit.md`;
- update `course/book1/completion.json`;
- commit everything to existing PR #68.

Gate A may pass only when:
- source gate PASS;
- dependency gate PASS;
- curriculum source-fidelity audit PASS;
- curriculum pedagogy audit PASS;
- fresh adversarial curriculum audit PASS;
- BLOCKER = 0;
- MAJOR = 0.

If and only if those conditions are satisfied:
- set the final blueprint as the frozen blueprint in `completion.json`;
- set the curriculum gate to PASS;
- advance the controller to the **activity-engineering** stage;
- stop there.

Do not create Unit 42 TypeScript, strokes, manifest entries, or learner-facing implementation in this audit context.
