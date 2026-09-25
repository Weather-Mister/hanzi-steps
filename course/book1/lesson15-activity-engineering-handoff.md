# Book 1 Lesson 15 — Activity Engineering Handoff

Working repository: `Weather-Mister/hanzi-steps`  
Working draft PR: **#69**  
Working branch: `book1-lesson15-source-a`  
Published Book-1 endpoint before Lesson 15: Unit 44

Current protocol checkpoint: **Stage 4 — Activity Engineering**.

## Upstream state

- Source gate: **PASS**
- Dependency gate: **PASS**
- Gate A / Curriculum: **PASS**
- Frozen Lesson-15 architecture: **Units 45–48**
- Frozen curriculum blueprint:
  - `course/book1/lesson15-curriculum-blueprint.md`
- Activity gate: **PENDING**
- Implementation gate: **LOCKED**
- Release gate: **LOCKED**

The final adversarial curriculum audit repaired the sense-expansion Search/Mega exposure risk for 幾 / 跟 without changing unit boundaries, source allocation, or prerequisite topology. Treat the frozen blueprint as normative.

## Required reading

Read:

1. `automation/book1/PROTOCOL.md`, especially Stage 4 / Gate B.
2. `ADDING_A_UNIT.md`, especially activity payloads, explain-before-test, review floors, Search/Mega ownership, and handwriting safeguards.
3. `course/book1/lesson15-source-ledger.md`.
4. `course/book1/lesson15-dependency-ledger.md`.
5. `course/book1/lesson15-curriculum-blueprint.md`.
6. `course/book1/completion.json`.
7. `course/index.json` through Book 1 Unit 44.
8. Targeted prior-unit files only where necessary to confirm a reused vocabulary/grammar/character contract.
9. `course/book1/lesson14-activity-spec.md` and its unit-specific specs only as a structural example, not as Lesson-15 content.

Do not reopen frozen curriculum ownership or unit boundaries unless a genuine upstream defect is discovered. Any curriculum/source change must reopen the affected upstream gate.

## Mandatory Stage-4 task

Engineer the complete learner-facing activity specification for Units 45–48.

For every important NEW or EXPANSION target, explicitly provide the lifecycle:

**EXPLAIN → RECOGNIZE → CONTROLLED PRACTICE → CONTEXTUAL USE → RETRIEVAL → DELAYED RETRIEVAL → CUMULATIVE MIXING**

For every NEW character, also provide:
- recognition;
- reading;
- guided trace/build;
- handwriting completion;
- contextual reading;
- later handwriting retrieval.

Preserve the frozen prerequisite order exactly. Nothing may be assessed before its required explanation/availability.

## Required activity-spec artifacts

Persist:

- `course/book1/lesson15-activity-spec.md`
- `course/book1/lesson15-unit45-activity-spec.md`
- `course/book1/lesson15-unit46-activity-spec.md`
- `course/book1/lesson15-unit47-activity-spec.md`
- `course/book1/lesson15-unit48-activity-spec.md`

Each unit spec must define:
- six teaching lessons plus one review;
- stable lesson IDs and stable step IDs;
- exact teaching sequence;
- NEW/EXPANSION vocabulary teaching points;
- review vocabulary;
- grammar explanations and assessments;
- dialogue coverage;
- source activity/capstone handling;
- new-character introduction and handwriting cycles;
- review/cumulative retrieval floors;
- Pinyin Search eligibility/behavior;
- Mega Challenge eligibility/behavior;
- standalone handwriting-practice locks;
- required support language;
- deferred/proper-name glyph handling;
- listening coverage;
- all learner-facing question payloads or precise enough specifications that implementation is transcription rather than invention.

## Frozen Lesson-15 constraints that activity engineering must preserve

Pay particular attention to:

- Unit 45: symptoms/illness arc; 12 NEW words + 12 NEW characters; no formal grammar ownership.
- Unit 46: diagnosis/medicine; G001 and G002; 幾 and 別 pull-forwards must occur before dependent grammar.
- Unit 47: stomach trouble/help; G003; 好幾次 must not appear before 幾 expansion + 次.
- Unit 48: advice/comparisons/separable verbs/prescription/capstone; G004–G007.
- G001 must remain negative/non-specific and distinct from Unit-40 question-word + 都/也 totality.
- G002 must preserve definite-reference bias, outward-transitive restriction, inward-verb rejection, negation before 把, source question forms, and sentence-final 了 behavior.
- G003 must preserve contrast with 一…就…, 以後 compatibility, and no ordinary A-not-A branch.
- G004 must preserve Vs + 一點 vs 有（一）點 + Vs.
- G005 must explicitly teach action comparison with 得 rather than assuming old 比 + 得 is enough.
- G006 must preserve 一點 / 得多 / 多了 distinctions and follow G004.
- G007 must preserve all three source separation types and only use separable forms that are already lexically available.
- Modal 得 `děi` support must remain distinct from complement 得 `de`.
- `一直 / 直` are first-owned in Lesson 15; Book 2 is not a prerequisite.
- 幾 / 跟 are Lesson-15 semantic expansions. Do not create duplicate canonical Search/Mega NEW ownership.
- Deferred source-only glyphs/proper names must not become required answer, handwriting, Search, or Mega prerequisites.
- 您 / 份 support must be available before literal productive use.
- Activity I must preserve its source-required table/data and fractional bowl/time support.
- Activity III must expose 一日4次 / 3日份 / 飯後30分鐘 before its questions; 12 packets remains arithmetic rather than a lexical target.
- Activity IV must preserve the source-required 把 outcomes.
- Activity V must genuinely support the four health-condition questions.
- Culture must remain explicitly textbook-era/source-framed rather than silently becoming present-day medical or policy guidance.

## Question-correctness contract

Every learner-facing question must satisfy:
- exactly one defensible keyed answer;
- no assessment before explanation;
- no untaught vocabulary/grammar/glyph required for the answer;
- Traditional Chinese only;
- Taiwan-appropriate usage;
- tone-marked pinyin where the product schema expects pinyin;
- no accidental clue that trivializes the target;
- no weak distractor that becomes equally valid;
- order-token multiplicity exactly reconstructs the intended phrase;
- source-required meaning/restriction remains intact.

Do not rely on deterministic validators to catch nuanced Chinese errors.

## Review/Search/Mega expectations

Intentionally plan:
- unit review retrieval of every important NEW/EXPANSION target;
- delayed retrieval in later Lesson-15 units;
- cumulative mixing by Unit 48;
- Pinyin Search exposure only according to canonical ownership and the frozen 幾/跟 expansion rules;
- Mega Challenge eligibility only after owning teaching is complete;
- no standalone handwriting practice before the character's first teaching lesson is complete.

Do not use support-only items to inflate novelty or review counts.

## Mandatory activity audits after engineering

After the complete spec packet is persisted, prepare three separate audit handoffs:

1. `course/book1/lesson15-activity-teaching-quality-audit-handoff.md`
2. `course/book1/lesson15-activity-question-audit-handoff.md`
3. `course/book1/lesson15-activity-cross-unit-audit-handoff.md`

The question/adversarial audit must run in a **fresh context**.

Gate B may pass only after:
- Activity Audit 1 — Teaching Quality: PASS
- Activity Audit 2 — Question Correctness / Adversarial: PASS
- Activity Audit 3 — Cross-unit Coherence: PASS
- open BLOCKER = 0
- open MAJOR = 0

## Controller update

After activity engineering is complete but before audits:
- keep `gates.activities = "pending"`;
- keep implementation and release locked;
- set the controller to the activity-audit checkpoint;
- record the new spec files and audit handoffs in `artifacts`;
- do not set `frozenActivitySpec` until Gate B genuinely passes.

## Stop condition

Stop after:
- the complete Lesson-15 activity-spec packet is persisted;
- the controller is moved to the activity-audit checkpoint;
- the three audit handoffs are prepared.

Do **not**:
- run the activity audits in the same engineering context;
- pass Gate B;
- implement Units 45–48;
- edit live application code;
- merge PR #69;
- publish anything.
