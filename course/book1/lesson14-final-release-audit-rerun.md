# Book 1 Lesson 14 — Stage 9 hostile release audit rerun

PR: **#68**  
Branch: `book1-lesson14-source-a`  
Audited release-candidate head: `64f12efadc5ad18a70f37c16d55e60619dd2b79e`  
Audit date: **2026-09-25**

## Verdict

- **BLOCKER:** none
- **MAJOR:** none
- **MINOR:** none
- **PASS**

The mandatory fresh Stage 9 hostile release audit rerun passes with zero open BLOCKER and zero open MAJOR findings. Release remains locked. This report does not merge or publish the branch and does not finalize Gate C; it advances the controller only to Gate C pending verification in the main development context.

## Fresh-context independence

Before reaching this verdict, this audit did **not** read the historical `lesson14-final-release-audit.md`, prior Activity Audit verdicts, prior implementation-conformance verdicts, pre-final3 learner simulations, or PR discussion. The verdict was rebuilt from the authoritative Lesson 14 source, current ledgers/blueprint/frozen activity packet, actual production/runtime, deterministic QA, final3 simulations, traceability, and controller state.

## Scope attacked

The audit actively rechecked:

- source coverage and dialogue/function preservation against Book 1 Lesson 14, printed pp. 299–321 / PDF pp. 326–348;
- NEW / EXPANSION / DEFERRED ownership and hidden/future prerequisites;
- grammar sequencing, restrictions, and source-specific caveats;
- dialogue adaptations and source-transfer activity fidelity;
- select/listen/order/match correctness and reference integrity;
- Traditional Chinese and pinyin completeness;
- handwriting ownership, first-teaching order, and stroke geometry;
- global Search visibility and Search/Mega/adaptive/standalone-practice gating;
- manifest/generated-runtime applicability and registry freshness;
- deterministic-QA and final3-simulation freshness;
- Stage-8 traceability claims;
- historical culture framing;
- progress/session compatibility and release/build/runtime evidence.

## Source and ownership findings

The authoritative source inventory remains represented without a release-blocking omission or distortion.

- Formal lexical inventory: **35** source records.
- Dependency dispositions: **30 NEW / 3 EXPANSION / 2 DEFERRED**.
- Production canonical NEW ownership: **30 unique forms**, exactly matching the 30 NEW dispositions.
- EXPANSION items remain single canonical ownerships: 想 “miss”, 快 “soon/about to”, 要 “will/going to” in the imminent-event system.
- Deferred names 玉山 and 紐約 do not leak into Lesson-14 canonical NEW vocabulary, productive assessment, Mega ownership, or handwriting ownership.
- Production NEW characters: **21 unique** across Units 42–44.
- Formal Lesson-14 grammar systems: **5**, all present once in the intended owning units.

No future-only proper name or deferred glyph is forced in a required learner answer.

## Grammar / prerequisite findings

No hidden or future prerequisite was found in the release candidate.

- G001 completed duration is taught before its assessed uses.
- G002 duration-to-now follows G001 and explicitly preserves the source distinction that continuation depends on context.
- 想 “miss”, 快 “soon/about to”, and 要 “will/going to” receive explicit new-sense teaching before dependent assessment.
- G003 is framed as imminence rather than generic future, teaches the Taiwan-Mandarin 快要 preference, and explicitly blocks the source-rejected explicit-time + 快要 construction.
- Unit 43 A002 contains no premature 明年 exposure.
- G004 teaches 更 as “even more” against a baseline before the full D2T07 comparison.
- G005 follows G004, preserves the equality / lower-degree / higher-degree contrast, and keeps the source 有沒有-question caveat.
- 呢 in D2T01 remains comprehension-only rather than becoming an unsupported productive grammar rule.
- 濕濕的 is explicitly constrained as the source-attested extension rather than generalized to arbitrary state verbs.

## Activity fidelity

All five source classroom activities remain meaningfully represented.

- **A001:** actual personal climate/season/reason transfer is assigned in Unit 42.
- **A002:** learner asks where someone lived and for how long, records the result, and reports it.
- **A003:** Taipei comparison task uses numeric °C, preserving the comparison toolkit without forcing untaught 度 or 北.
- **A004:** learner asks all four seasonal weather questions plus typhoon/rain/snow questions, asks for additional information, compares with their own home-country climate, and records results.
- **A005:** remains a distinct Taiwan-summer transfer requiring discussion plus written Chinese findings.

The Unit-44 F/S001–004 capstone is cumulative reconstruction, not a substitute for earlier source-transfer assignment.

## Mandatory FR-001 retest

**PASS.** All required conditions are independently satisfied in actual production.

1. `u42-home-country-model.note` is learner-visible: the phrase renderer displays `phrase.note` under **How the phrase works**.
2. The note explicitly instructs the learner to describe the climate of their **own home country/place** in Chinese.
3. It explicitly asks which season the learner **personally likes most and least**.
4. It explicitly requires the learner's **own reason with 因為…所以…**.
5. It permits a personal response spoken aloud or written on paper; no untaught proper name is required.
6. The fixed sentence is explicitly labeled **only a model**, and the learner is told not to copy it unless genuinely true.
7. `u42-season-reason.note` explicitly says the fixed spring sentence is practice/scaffold, not a substitute for the personal response.
8. A005 remains separately assigned through `u42-summer-write`, including discussion and written findings in Chinese.
9. `u44-review-cap2` is genuinely delayed retrieval, not first production: the A001 assignment occurs in Unit 42 and the F002 capstone occurs **287 learner steps later**.

## Prior repair retest

- **No premature 明年 in Unit 43 A002:** PASS. The A002 duration question distractor is `你在臺灣住了半年嗎？`, not a future-only item.
- **No standalone character-practice bypass:** PASS. `start()` rejects `practice-<char>` unless `characterPracticeAvailable()` confirms the first non-review owning lesson is completed.
- **Search globally visible:** PASS. Pinyin Search is built from the global canonical vocabulary lookup and does not hide unlearned lexical results.
- **Writing first-teaching gated:** PASS. Search practice actions filter through `searchPracticeCharacters(..., completed)` → `characterPracticeAvailable`; the start path independently rechecks the same invariant.
- **Unit-44 cross-unit orders taught earlier:** PASS. All cross-unit order references resolve to Unit-42/43 phrase records whose owning lessons precede the Unit-44 review.

## Question / listening / order integrity

A fresh mechanical audit of the actual Unit 42–44 payload found:

- **123** select items;
- **26** listen items;
- **29** order items;
- **1** match item;
- **61** phrase steps;
- **5** grammar steps.

Results:

- every select/listen answer occurs exactly once in its option set;
- no duplicate answer-option defect was found;
- every order references an existing phrase;
- every order token list exactly matches the referenced phrase token list;
- no cross-unit order references a future owner;
- every phrase and formal grammar reference resolves;
- no Lesson-14 grammar-tagged use precedes that grammar's introduction.

No answer-correctness, audibility-text, or reference-integrity blocker was found.

## Traditional Chinese / pinyin

The current Unit 42–44 production payload contains no hit from the audited unambiguous Simplified-only variant set for the Lesson-14 content. All NEW vocabulary records, phrase records, and formal grammar examples checked have nonempty pinyin. Production uses the intended Traditional forms such as 天氣, 風, 紅葉, 傘, 颱風, 濕, 討厭, 新聞, 這次, and 臺灣.

## Handwriting / ownership

Character ownership is unique across the 21 Lesson-14 NEW characters:

- Unit 42: 8
- Unit 43: 6
- Unit 44: 7

For every owner, the production lifecycle is ordered **intro → trace → build → complete → memory**, and no audited character assessment precedes its intro.

All 21 Lesson-14 stroke records have nonempty stroke paths and nonempty median geometry, with stroke/median counts agreeing per character. Deferred proper-name characters do not gain handwriting ownership.

## Search / Mega / adaptive practice

Runtime gating remains release-safe:

- Search lookup is global over canonical vocabulary.
- Search handwriting is progress-gated by the owning lesson.
- Direct standalone `practice-<char>` start is independently gated.
- Mega Challenge draws from `learnedVocabulary(completed)`, so canonical vocabulary is eligible only after its owning lesson is complete.
- Adaptive practice draws from `learnedPracticeItems(completed)`; fallback character items also require a completed non-review owner lesson.
- EXPANSION senses do not create duplicate canonical vocabulary rows.

## Generated registry, QA, simulations, build/runtime

The deterministic QA report covers authored implementation commit `f0fed1858b2205752164b709e077b91c71a501d0` and generated follow-up `83911f87205c9c86284181ff4a92849ad09c71a1`; Feature QA #496 passed the required install, generation, graph, character, regression, typecheck, and Pages-build checks.

Fresh applicability checks found:

- from generated commit `83911f...` to the audited head, only audit/controller/report artifacts changed; no learner-facing unit/runtime/generated-registry input changed;
- from final3 simulation baseline `9a1d510e...` to the audited head, only completion/audit/simulation/traceability artifacts changed;
- current audited head `64f12e...` also has Feature QA **#503 SUCCESS**.

Therefore neither deterministic QA nor the final3 learner simulations are stale for the learner-facing release candidate.

## Generated index / progress compatibility

- Book 1 manifest remains append-only through Units 42, 43, and 44 with contiguous orders.
- The generated grammar index contains the three Unit-43 grammar records and two Unit-44 grammar records with their owning lesson/step IDs.
- Existing prior-unit source files are not rewritten by the Lesson-14 implementation.
- Session validation retains historical-length compatibility, while new Lesson-14 lessons use the current lengths.
- The controller validation test remains present, and current-head Feature QA passes.

No migration/progress incompatibility was found.

## Culture framing

The typhoon-day reading is explicitly labeled **Textbook-era culture, not current advice**. Its review question repeats that it is historical/source context and not current 2026 administrative guidance. No unsupported current-procedure claim was introduced.

## Traceability cross-check

Stage-8 traceability claims checked against current production remain accurate for the audited attack surface:

- 30 NEW / 3 EXPANSION / 2 DEFERRED lexical disposition;
- 5 grammar systems;
- 21 NEW character owners;
- all five source activities represented;
- A001 repaired as actual Unit-42 transfer;
- A005 distinct;
- Unit-44 cumulative F/S capstone delayed;
- global Search and progress-gated writing;
- review sizes **25 / 28 / 41** for Units 42 / 43 / 44.

No stale traceability claim that changes release eligibility was found.

## Findings

### BLOCKER

None.

### MAJOR

None.

### MINOR

None.

## Gate result

**PASS**

Stage 9 passes with zero open BLOCKER and zero open MAJOR findings. Advance only to **Gate C pending**. Keep `gates.release = "locked"`, keep `humanReviewRequired = false`, do not merge, and do not publish.
