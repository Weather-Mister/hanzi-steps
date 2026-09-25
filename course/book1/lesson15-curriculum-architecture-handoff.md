# Book 1 Lesson 15 — Curriculum-Architecture Readiness Handoff

Working repository: `Weather-Mister/hanzi-steps`  
Working draft PR: **#69**  
Working branch: `book1-lesson15-source-a`  
Production baseline: `main@680ed5753382fb72151a1532095bca0a227c0658`  
Published endpoint: Book 1 Source Lesson 14 / Hanzi Steps Unit 44

Current protocol checkpoint: **curriculum architecture ready; no unit design started**.

## Gates

- Source gate: **PASS**
- Dependency gate: **PASS**
- Curriculum gate: **PENDING**
- Activity gate: **LOCKED**
- Implementation gate: **LOCKED**
- Release gate: **LOCKED**

Fresh dependency-audit result:

- open BLOCKER: **0**
- open MAJOR: **0**
- open MINOR: **0**

Audit artifact:

- `course/book1/lesson15-dependency-audit.md`

Final dependency ledger:

- `course/book1/lesson15-dependency-ledger.md`

## Mandatory next action

Begin **Stage 3 — Curriculum architecture** from `automation/book1/PROTOCOL.md`.

The next context should read:

1. `automation/book1/PROTOCOL.md`, especially Stage 3 / Curriculum architecture and Gate A.
2. `course/book1/lesson15-source-ledger.md`.
3. `course/book1/lesson15-dependency-ledger.md`.
4. `course/book1/lesson15-dependency-audit.md`.
5. `course/book1/completion.json`.
6. `course/index.json`.
7. Targeted prior Book-1 unit files only when needed to verify a disputed curriculum prerequisite.

Do not reopen or silently change the validated source ledger or dependency classifications unless a genuine upstream defect is discovered. Any upstream change must reopen the affected gate under the protocol.

## Dependency constraints the architecture must preserve

- B1L15-V026 幾 is **EXPANSION**, not KNOWN: Lesson 15 adds “a few / several” and indefinite/non-specific uses.
- B1L15-V032 跟 is **EXPANSION**, not KNOWN: Lesson 15 adds addressee/recipient “to.”
- Modal 得 `děi + V` is **NEW support** and must remain distinct from complement 得 `de`.
- G001 negative non-committal question-word declaratives are distinct from Unit-40 都/也 totality.
- G002 把 requires the repaired prerequisite chain, including 別, definite-reference support, prior verbal/final-了 distinctions, negation, and source confirmation-question support.
- G003 V了…就… must preserve its contrast with 一…就… and its 以後 compatibility.
- G004–G007 remain **EXPANSION**, not wholesale review.
- New Lesson-15 separable forms must be lexically available before productive splitting under G007.
- The formal character state is **30 NEW / 33 KNOWN**; KNOWN glyph status does not imply known Lesson-15 lexical sense or pronunciation.
- `一直 / 直` are NEW at the Unit-44 baseline. Lesson 15 must become their canonical first ownership; Book-2 Unit 1 must later become review rather than a duplicate NEW owner.
- Hidden source-only glyphs remain explicitly supported/deferred; no proper name or source orthography may become a silent handwriting/Search/Mega prerequisite.
- Activity I must preserve the source-required 臺南 table and has explicit 小時 / 分鐘 / participant-label dependencies.
- Activity III must make `一日4次 / 3日份 / 飯後30分鐘` available before the prescription questions; the 12-packet result is arithmetic, not a lexical target.

## Stage-3 process

Perform the protocol's three design passes in order:

1. rough split;
2. refined split;
3. final curriculum blueprint.

Then run the three independent curriculum audits required by the protocol before Gate A may pass.

## Stop condition for this handoff

This handoff itself authorizes **readiness only**. No rough split, unit boundary, unit number, curriculum blueprint, learner-facing activity, application edit, merge, or publication has been created in the dependency-audit context.
