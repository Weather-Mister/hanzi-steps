# Book 1 Lesson 15 — Fresh-Context Adversarial Curriculum Audit

Scope: mandatory Gate-A adversarial review of the proposed Units 45–48 architecture for Lesson 15 「我很不舒服」.

Inputs read before the independent verdict:
- `automation/book1/PROTOCOL.md`, especially Stage 3 / Gate A;
- `ADDING_A_UNIT.md`;
- `course/book1/lesson15-source-ledger.md`;
- `course/book1/lesson15-dependency-ledger.md`;
- `course/book1/lesson15-dependency-audit.md`;
- `course/book1/lesson15-curriculum-blueprint.md`;
- `course/index.json` through the Unit-44 baseline;
- targeted current product behavior in `lib/vocabulary-lookup.ts` and `lib/mega-challenge.ts` only to verify Search/Mega leakage;
- `course/book1/completion.json`.

Independence rule observed: the Lesson-15 source-fidelity and pedagogy curriculum-audit verdict/reasoning files were not read until after this audit had independently attacked the architecture and reached its own finding set.

## Adversarial posture

The four-unit plan was treated as suspect. The audit attempted to prove Gate A should fail on:
- source omissions;
- duplicate ownership;
- hidden/future prerequisites;
- grammar before teaching;
- artificial splits;
- overloaded/thin units;
- bad deferrals;
- unsafe support/proper-name handling;
- character-order defects;
- unsupported additions;
- cross-unit inconsistencies;
- Search/Mega/handwriting leakage;
- dialogue/activity timing defects;
- upstream-classification drift;
- source activities/outcomes that were named but not actually supported.

## Finding discovered and repaired

### MAJOR — L15-ADV-001 — semantic-expansion Search/Mega leakage for 幾 / 跟

The dependency ledger correctly classifies:
- B1L15-V026 幾 as EXPANSION from Unit 7 interrogative “how many” to Lesson-15 “a few / several / non-specific” use;
- B1L15-V032 跟 as EXPANSION from Unit 24 companionship “with” to Lesson-15 recipient/addressee “to.”

The Unit-44 registry confirms those earlier canonical rows already exist. The pre-repair blueprint allocated the expansions correctly but deferred the formal NEW/EXPANSION Search/Mega inclusion strategy to activity engineering.

Targeted product verification showed that this was unsafe:
- Pinyin Search is a global canonical lookup and exposes each canonical row's meaning directly;
- Mega eligibility is derived from the canonical vocabulary item's original lesson;
- therefore broadening the old Unit-7 / Unit-24 row meanings would leak the Lesson-15 senses into already-unlocked earlier-unit Mega prompts;
- creating second canonical rows would break single chronological form ownership and would also expose duplicate sense rows in global Search.

Repair:
- froze a blueprint-level rule that Units 46/48 must not create second canonical NEW-vocabulary rows for 幾 / 跟;
- froze a rule that the earlier Unit-7 / Unit-24 canonical meanings must not be broadened with the Lesson-15 senses;
- limited sense-specific teaching/retrieval to Unit 46 for 幾 and Unit 48 for 跟 under the current form-level model;
- froze that these expansion senses receive no second Search/Mega ownership unless a future progress-gated sense model is deliberately introduced and the affected gate is reopened;
- clarified that NEW-support 您 / 份 remain support-only and do not acquire formal Search/Mega/handwriting ownership.

Blast radius: CROSS_UNIT / CURRICULUM, limited to ownership/exposure policy.

No unit boundary, lexical allocation, source disposition, grammar allocation, or prerequisite edge changed, so the rough/refined architecture files did not require amendment.

## Re-audit after repair

### Source coverage

PASS.
- all 44 formal lexical source entries have exactly one architecture allocation: 42 NEW + 2 EXPANSION;
- G001–G007 each have exactly one formal owner;
- F001–F004, P001–P009, X001–X044, DR001–DR007, A001–A005, CUL001, and S001–S004 have explicit homes;
- all 25 dialogue turns remain assigned in source order across coherent dialogue arcs.

### Duplicate ownership

PASS after repair.
- 42 formal NEW lexical entries are owned once;
- 幾 / 跟 remain earlier canonical forms with Lesson-15 sense expansion only;
- 30 NEW formal characters each have one Lesson-15 first owner;
- G001–G007 each have one owner;
- 一直 / 直 have an explicit earlier-source migration requirement from Book-2 Unit 1 rather than a future prerequisite.

### Hidden/future prerequisites

PASS.
- the Unit-44 learner is never required to know Book-2 material;
- 一直 / 直 are taught in Unit 45 before use;
- modal 得 is explicit NEW support before 得吃藥嗎 and is separated from complement 得;
- 您 is explicit support before literal doctor-patient use;
- 份 is explicit support before literal prescription reading;
- deferred name/place/header/instruction glyphs remain contextual, glossed, normalized, or non-assessed.

### Grammar-before-teaching

PASS.
- V026 expansion precedes G001;
- V035 precedes the 別 + 把 branch of G002;
- G002 preserves definite-reference bias, outward-transitive restriction, inward-verb rejection, sentence-final 了, negation placement, question forms, and the sentence-final-了 vs verbal-了 distinction;
- G003 follows verbal 了 / 一…就… / 以後 prerequisites and preserves the no-A-not-A rule;
- G004 precedes G006;
- G005 is explicitly taught as action comparison rather than assumed from old 比 + 得;
- 生病 / 睡覺 / 看病 / 回家 are lexically available before G007 productive generalization.

### Unit pacing and load

PASS.
- Unit 45: 12 NEW words + 12 NEW characters is high but acceptable because no formal Lesson-15 grammar system is added; the load is distributed across six lessons and the heaviest character work is not stacked with a new grammar system.
- Unit 46: 10 NEW + 1 EXPANSION, 9 NEW characters, and G001/G002 is dense but coherently staged by prerequisite order.
- Unit 47: 12 NEW, 8 NEW characters, and one grammar expansion is balanced.
- Unit 48: 8 NEW + 1 EXPANSION is intentionally below the lexical target because it carries four formal grammar systems, three source transfer activities, prescription support, culture, and the Lesson-15 capstone. It is conceptually heavy but not artificially padded or split.

No fifth unit is justified; splitting Unit 48 would create an artificial boundary across the source's comparison/recovery capstone, while moving its grammar earlier would increase hidden-prerequisite pressure.

### Deferrals / proper names / support

PASS.
- 白、妳、玉、安、田、李、陳、王、烏、龍、北、紐、約、診、拒、絕 remain non-productive support/deferred glyphs;
- 臺南 is preserved exactly in Activity I while remaining contextual/non-assessed;
- 健康診所 remains a non-assessed prescription header;
- 您 / 份 are explained before literal use without becoming formal ownership;
- no deferred/support-only glyph is promoted merely to make a unit appear fuller.

### Character progression

PASS.
- the 30 NEW formal characters are assigned once across Units 45–48;
- character first ownership follows lexical availability;
- Unit 45 is the canonical first ownership of 直;
- known glyphs such as 差、油、別、包、頭、水 remain known characters while their Lesson-15 lexical senses/forms are still explicitly taught.

### Search / Mega / handwriting

PASS after L15-ADV-001 repair.
- no deferred/support-only item gains canonical Search/Mega/handwriting ownership;
- 幾 / 跟 expansion senses cannot leak through earlier canonical meanings;
- no duplicate canonical form row is created for those expansions;
- 一直 / 直 migration remains explicit;
- handwriting remains limited to the 30 formal NEW character owners, not source-only glyphs.

### Dialogue timing

PASS.
- D1T01–D1T05 follow Unit-45 symptom/support teaching;
- D1T06–D1T12 follow G001/G002, modal 得, health-advice support, and 您 support in Unit 46;
- D2T01–D2T07 follow stomach/refusal/G003 prerequisites in Unit 47;
- D2T08–D2T13 follow recipient 跟, advice language, G004/G005/G006, and then G007 as required in Unit 48;
- D2T13's separable-duration form may reuse the already-owned Unit-28 duration pattern before the broader G007 generalization, but the complete turn is integrated after G007.

### Source activities / outcomes

PASS.
- A001 preserves the exact comparison table, contextual 臺南, participant labels, half-bowl quantities, 小時 and 分鐘; it follows G005/G006 and X035/X039.
- A002 follows advice and acceptance/rejection support.
- A003 follows 一日4次 / 3日份 / 飯後30分鐘 support; the 12-packet result remains arithmetic only.
- A004 follows G002 and preserves all three required 把 outcomes.
- A005 remains the at-home illness call and requires four condition questions only after cumulative health-inquiry language is available.
- F001–F004 are established/completed across the planned units and retrieved in S001–S004.

### Hostile special checks

PASS.
1. Unit 45's 12-word / 12-character load is justified by zero formal new grammar.
2. 幾 is pulled forward only as a prerequisite-bearing EXPANSION and is not redefined as merely interrogative.
3. 別 is available before the G002 negation branch and remains coherent for later advice.
4. G001 remains distinct from Unit-40 question-word + 都/也 totality.
5. G002 retains every source restriction and the 了 distinction.
6. G003 retains 一…就… contrast, 以後 compatibility, and no-A-not-A.
7. G004 precedes G006 and the 一點 meanings remain separated.
8. G005 explicitly teaches the combined action-comparison system.
9. G007 follows lexical availability of all Lesson-15 forms used productively.
10. Activity I preserves its exact source table/context.
11. Activity III support precedes its questions and 12 packets remains arithmetic.
12. Activity IV retains all source 把 outcomes.
13. Activity V supports four health-condition questions.
14. Deferred glyphs do not leak into productive testing.
15. 您 / 份 receive explicit support before literal productive reading/use.
16. 一直 / 直 are Lesson-15 first ownership, not Book-2 prerequisites.
17. Unit 48 remains coherent despite very high conceptual load because lexical/handwriting load is intentionally low and the six-lesson sequencing orders its systems.
18. all 42 NEW + 2 EXPANSION formal lexical targets, 30 NEW formal characters, and 7 formal grammar targets have non-duplicated architecture ownership.

## Prior required audit verification after independent verdict

Only after completing the independent adversarial review above, the existing curriculum audit reports were opened:
- Independent Curriculum Audit 1 — Source Fidelity: PASS, 0 open BLOCKER / 0 open MAJOR.
- Independent Curriculum Audit 2 — Pedagogy: PASS, 0 open BLOCKER / 0 open MAJOR.
- Source gate: PASS.
- Dependency gate: PASS.

The L15-ADV-001 repair is additive: it tightens cross-unit Search/Mega exposure without changing source coverage, unit boundaries, load, lesson ordering, or prerequisite topology. It therefore does not invalidate the source-fidelity or pedagogy pass conditions.

## Final findings

Open BLOCKER: **0**

Open MAJOR: **0**

Open MINOR: **0**

## Verdict

**PASS — Gate A passes and the Lesson-15 curriculum blueprint is frozen.**

The next controller stage is activity engineering. This audit does not design activity payloads, implement Units 45–48, modify live application code, merge PR #69, or publish anything.
