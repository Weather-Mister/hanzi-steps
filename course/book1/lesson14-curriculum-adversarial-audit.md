# Book 1 Lesson 14 — Fresh-Context Adversarial Curriculum Audit

Scope: Gate A adversarial review of the proposed Units 42–44 architecture for Lesson 14 「天氣這麼冷！」.

Inputs read for this audit:
- `automation/book1/PROTOCOL.md`;
- `course/book1/lesson14-source-ledger.md`;
- `course/book1/lesson14-dependency-ledger.md`;
- `course/book1/lesson14-curriculum-blueprint.md`;
- `ADDING_A_UNIT.md`;
- targeted `course/index.json`, `lib/vocabulary-lookup.ts`, `lib/mega-challenge.ts`, and the rough/refined architecture only to verify disputed prerequisite/Search/Mega behavior and to propagate repairs.

Independence rule observed: the existing source-fidelity and pedagogy audit verdict files were not read before or during this adversarial review.

## Adversarial posture

The proposed three-unit plan was treated as suspect. The audit attempted to break it on source coverage, duplicate ownership, hidden/future prerequisites, grammar-before-teaching, artificial splits, load balance, deferrals, proper-name/support safety, character order, unsupported additions, cross-unit coherence, Search/Mega ownership, and whether named source activities/outcomes are actually supported.

## Findings found and repaired

### MAJOR — ADV-A-001 — X034 confirmation support regressed in the final blueprint

The dependency ledger classifies B1L14-X034 對不對 as EXPANSION and requires a brief explanation if the G001 confirmation prompts are retained. The refined architecture contained that bridge, but the final blueprint merely listed 吧 / 對不對 as support and did not guarantee explanation before use.

Risk: a DR001 prompt could test an unowned confirmation form before teaching it.

Repair:
- froze an explicit X034 bridge in U43-L1;
- required the bridge before any DR001 prompt or assessment using 對不對.

Blast radius: CURRICULUM, local to Unit 43 prerequisite sequencing.

### MAJOR — ADV-A-002 — unsafe Search/Mega handling for 想 / 快 / 要 expansions

The proposed blueprint allowed implementation to broaden the single canonical gloss for earlier-owned 想 / 快 / 要. Targeted product-code verification showed:
- Pinyin Search uses the canonical vocabulary rows directly and is not progress-gated;
- Mega Challenge eligibility is tied to the canonical row's original `lessonId`.

Therefore broadening the old Unit 4 / Unit 24 canonical rows with Lesson-14 senses would expose those senses before Unit 43 and would alter Mega prompts for already-unlocked vocabulary. A duplicate Lesson-14 row would instead violate single chronological ownership.

Repair:
- prohibited duplicate ownership rows;
- prohibited broadening the earlier canonical glosses during Lesson 14;
- froze Lesson-14 sense-specific retrieval to Unit 43 teaching/review and the Lesson-14 capstone under the current form-level Search/Mega model;
- clarified that all 30 non-deferred formal NEW items still receive one canonical ownership, while expansion senses receive no second Search/Mega ownership.

Blast radius: CROSS_UNIT / CURRICULUM.

### MAJOR — ADV-A-003 — same-unit prerequisite edges were not fully frozen

The dependency ledger requires lexical/support prerequisites before several Lesson-14 structures, but the final blueprint left some same-lesson order implicit, especially B1L14-V027 更 → B1L14-G004.

Risk: activity engineering could legally place an assessment before its prerequisite while still appearing to follow the unit allocation.

Repair:
- added a frozen prerequisite-edge contract covering Unit 42 weather-question support, Unit 43 G001→G002, 快/要→G003, X034→DR001, and Unit 44 濕→濕濕的, caution-formula prerequisites, 更/P001→G004→D2T07, G005→D2T08, and 慢走→小心慢走;
- propagated the G004 prerequisite into the rough/refined architecture.

Blast radius: CURRICULUM.

### MINOR — ADV-A-004 — character ownership order could be misread as teaching order

The Unit 42/43 character lists followed source-lexical order rather than the planned lesson introduction order.

Repair:
- froze learner-facing first-introduction order to match the lesson sequence;
- kept canonical B1L14-CH source IDs unchanged.

Blast radius: UNIT.

### MINOR — ADV-A-005 — A003 wording permitted unnecessary location substitution

The blueprint allowed the source Taipei temperature task to use “another learner-safe label.” That could weaken source fidelity or mismatch the source chart values.

Repair:
- locked the location label to Latin-script **Taipei** while retaining °C and avoiding untaught 北/度.

Blast radius: LOCAL.

## Decisions challenged but upheld

### Three units rather than two or four — upheld

- Two units would exceed the established lexical/character load while stacking multiple grammar systems.
- Four units would create thin/artificial boundaries or split Dialogue II.
- The repaired three-unit plan remains coherent: Unit 42 weather/seasons, Unit 43 duration/imminence, Unit 44 typhoon/comparison/capstone.

### B1L14-V031 停 in Unit 43 — upheld

This is a cross-dialogue preteach, but it is not padding. It provides a natural G003 weather-change retrieval target (雨快要停了) and removes a hidden prerequisite before D2T09 while Dialogue II itself remains wholly owned by Unit 44.

### Deferred 玉山 / 紐約 and other support names — upheld

Their destination is explicit contextual/glossed support, not productive vocabulary, Search/Mega, or handwriting. No source outcome requires productive mastery of those one-off proper-name characters.

### 度 redesign — upheld

Using numeric °C with Latin-script Taipei preserves the source A003 comparison task without creating a one-off support-character ownership. Any later assessed 度 would reopen Gate A.

## Re-audit after repairs

### Source coverage

PASS.
- 35 formal lexical entries: 30 NEW owned once, 3 EXPANSION retained at prior ownership with Lesson-14 sense teaching, 2 formal Names explicitly contextual/deferred.
- G001–G005 all have homes and frozen prerequisite order.
- P001–P006, X001–X037, DR001–DR005, A001–A005, CUL001, F001–F004, and S001–S004 have explicit teaching/review/adaptation routes.
- all 22 dialogue turns remain assigned.

### Duplicate ownership

PASS.
- no duplicate NEW lexical ownership;
- no duplicate grammar ownership;
- 想 / 快 / 要 remain earlier canonical entries;
- deferred support does not create fake NEW rows.

### Hidden/future prerequisites

PASS after repair.
- all same-unit edges required by the dependency ledger are frozen;
- deferred glyphs remain non-assessed;
- no Book 2 or unpublished Book 1 prerequisite is introduced.

### Grammar-before-teaching

PASS after repair.
- G001 precedes G002;
- 快/要 expansions precede G003;
- 更/P001 precede G004 and D2T07;
- G005 precedes D2T08;
- X034 is explained before confirmation-form assessment.

### Unit boundaries/load

PASS.
- no unit is thin solely to satisfy a textbook boundary;
- no extra fourth unit is justified;
- Unit 44 is high-load but internally staged across six lessons plus capstone rather than concentrated in one lesson.

### Deferrals/proper names/support

PASS.
- no deferred name/glyph is required in a learner answer;
- culture is explicitly textbook-era, not current-2026 administrative advice;
- Taipei/°C handling is source-faithful and character-safe.

### Character progression

PASS after repair.
- 21/21 non-deferred NEW formal characters are owned once;
- learner-facing first-introduction order now matches lesson sequence;
- 玉/紐/約 remain deferred with their proper names.

### Search/Mega ownership

PASS after repair.
- 30 formal NEW items have one canonical ownership;
- Pinyin Search does not gain duplicate rows;
- Mega lesson gating remains tied to canonical first teaching;
- Lesson-14 expansion senses cannot leak into earlier canonical glosses.

### Source activities/outcomes

PASS.
- A001 and A005 have Unit 42 transfer;
- A002 follows both duration systems in Unit 43;
- A003 and A004 receive full comparison transfer in Unit 44;
- all four F/S outcomes are explicitly completed/retrieved by the Unit 44 capstone.

## Final findings

Open BLOCKER: **0**

Open MAJOR: **0**

Open MINOR: **0**

## Verdict

**PASS — Gate A may pass.**

The repaired `course/book1/lesson14-curriculum-blueprint.md` is the frozen blueprint. The controller may advance to `activity-engineering`.

Do not create Unit 42 TypeScript, stroke files, manifest entries, or other learner-facing implementation until Gate B passes.
