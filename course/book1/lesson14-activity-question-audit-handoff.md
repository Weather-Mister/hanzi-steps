# Book 1 Lesson 14 — Fresh-context activity question audit handoff

Current production baseline: `main@caf8bef722d1bd43a0acaa48e1cc5dffc1010ffb`.

Current published endpoint: Book 1 Source Lesson 13 / Hanzi Steps Unit 41.

Working PR: #68 on branch `book1-lesson14-source-a`.

## Completed before this handoff

Upstream gates:
- source: **PASS**
- dependencies: **PASS**
- curriculum / Gate A: **PASS**

Frozen curriculum:
- `course/book1/lesson14-curriculum-blueprint.md`

Candidate activity-engineering packet:
- `course/book1/lesson14-activity-spec.md`
- `course/book1/lesson14-unit42-activity-spec.md`
- `course/book1/lesson14-unit43-activity-spec.md`
- `course/book1/lesson14-unit44-activity-spec.md`

Completed activity audits:
- Teaching Quality: `course/book1/lesson14-activity-teaching-quality-audit.md` — PASS
- Cross-Unit Coherence: `course/book1/lesson14-activity-cross-unit-audit.md` — PASS

Those previous audit verdicts are **not inputs** to the mandatory question-correctness audit. Do not read them before performing your own independent review.

Gate B remains **PENDING**.

No learner-facing Unit 42–44 TypeScript, strokes, manifest entries, or generated production curriculum files have been authored.

## Mandatory next action — fresh Activity Audit 2

Use a **new ChatGPT context**.

Read:
1. `automation/book1/PROTOCOL.md`, especially Stage 4 / Activity Engineering / Gate B.
2. `course/book1/lesson14-source-ledger.md`.
3. `course/book1/lesson14-dependency-ledger.md`.
4. frozen `course/book1/lesson14-curriculum-blueprint.md`.
5. candidate `course/book1/lesson14-activity-spec.md`.
6. candidate unit specs:
   - `course/book1/lesson14-unit42-activity-spec.md`
   - `course/book1/lesson14-unit43-activity-spec.md`
   - `course/book1/lesson14-unit44-activity-spec.md`
7. `ADDING_A_UNIT.md`, especially activity payload and explain-before-test rules.
8. `course/index.json` and targeted prior-unit files **only when necessary** to verify a claimed prerequisite, prior grammar, vocabulary meaning, or character ownership.

Do **not** read:
- `course/book1/lesson14-activity-teaching-quality-audit.md`
- `course/book1/lesson14-activity-cross-unit-audit.md`

until after your own independent question audit is complete.

Audit prompt:

> You did not author this Lesson-14 activity packet. Assume the learner-facing material contains subtle defects. Perform the mandatory fresh-context Activity Audit 2 — Question Correctness / Adversarial Audit.
>
> Attack every learner-facing phrase, grammar record, select question, listen question, order token bank, review item, pinyin line, English meaning, answer key, distractor, source adaptation, and prerequisite timing across Units 42–44.
>
> Search specifically for:
> - two defensible answers;
> - no defensible answer;
> - wrong answer keys;
> - accidental clues that trivialize a question;
> - weak or nonsensical distractors;
> - assessment before explanation;
> - untaught vocabulary or grammar;
> - hidden/deferred Hanzi in required answers;
> - future prerequisites;
> - wrong or inconsistent pinyin/tone marks;
> - Simplified Chinese contamination;
> - unnatural Taiwan Mandarin;
> - misleading English meanings/translations;
> - grammar explanations that overgeneralize or contradict the source;
> - order-token banks that cannot reconstruct the phrase exactly or lose repeated-token multiplicity;
> - source adaptations that distort required meaning;
> - duplicate activity IDs;
> - review items that claim retrieval without actually testing the intended target;
> - Search/Mega ownership leakage for 想 / 快 / 要 or contextual support items.
>
> Do not implement Unit 42–44 production files.
>
> Return BLOCKER / MAJOR / MINOR findings and PASS/FAIL. PASS requires zero open BLOCKER and zero open MAJOR.

If defects are found:
- fix only the candidate activity-spec files necessary to resolve them;
- preserve the frozen Gate-A curriculum;
- if a proposed fix would move source ownership, unit boundaries, formal grammar ownership, character ownership, or a frozen prerequisite edge, **do not silently change it** — reopen Gate A instead;
- re-audit the corrected activity packet until Activity Audit 2 genuinely passes;
- persist the final audit as `course/book1/lesson14-activity-question-audit.md`;
- commit all fixes/audit artifacts to the existing PR #68.

After your independent audit is complete, you may read:
- `lesson14-activity-teaching-quality-audit.md`
- `lesson14-activity-cross-unit-audit.md`

to verify that all three required activity audits are PASS on the same final activity-spec head.

## Gate-B completion

If and only if:
- Gate A remains PASS;
- Activity Audit 1 is PASS;
- Activity Audit 2 is PASS;
- Activity Audit 3 is PASS;
- open BLOCKER = 0;
- open MAJOR = 0;

then:
1. freeze the candidate activity packet by setting `course/book1/completion.json.artifacts.frozenActivitySpec` to `course/book1/lesson14-activity-spec.md`;
2. set `gates.activities` to `pass`;
3. set `gates.implementation` to `pending`;
4. set `currentStage` to `implementation`;
5. set `stageStatus` to `ready`;
6. set `humanReviewRequired` to `false`;
7. record `course/book1/lesson14-activity-question-audit.md` in the controller artifacts;
8. commit the controller update to PR #68;
9. stop.

Do **not** implement the unit modules, stroke JSON, manifest entries, or generated curriculum artifacts in the fresh audit context. Implementation starts only after Gate B is durably PASS.
