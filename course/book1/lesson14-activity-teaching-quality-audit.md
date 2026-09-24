# Book 1 Lesson 14 — Activity Audit 1: Teaching Quality

Audited packet:
- `course/book1/lesson14-activity-spec.md`
- `course/book1/lesson14-unit42-activity-spec.md`
- `course/book1/lesson14-unit43-activity-spec.md`
- `course/book1/lesson14-unit44-activity-spec.md`

Upstream frozen curriculum:
- `course/book1/lesson14-curriculum-blueprint.md`

Scope: can a learner who knows Units 1–41 actually learn the Lesson-14 targets from the specified sequence? This audit checks lifecycle quality, explain-before-test order, practice depth, transfer, character handling, and review balance. It does not substitute for the mandatory fresh-context question-correctness audit.

## Findings found during activity engineering and repaired before final verdict

### MAJOR — ACT-TQ-001 — several exact NEW words were initially tested before a meaning-first explanation

Initial candidate gaps included:
- Unit 42: 風;
- Unit 43: 只, 新年, 父母;
- Unit 44: 颱風, 討厭, 新聞, 大家, 小心, 這次, 上次, 可怕.

Some had known component characters, but component familiarity is not sufficient to assume the exact lexical item.

Repair:
- Unit 42 moves the source weather phrase before 風 assessment.
- Unit 43 adds `u43-only-basic` and `u43-newyear-basic`.
- Unit 44 adds meaning-first cards:
  - `u44-typhoon-basic`
  - `u44-annoy-basic`
  - `u44-news-basic`
  - `u44-everyone-basic`
  - `u44-careful-basic`
  - `u44-this-last-basic`
  - `u44-scary-basic`.
- all related selects now follow those cards.

Status: **resolved**.

### MAJOR — ACT-TQ-002 — source transfer was initially too meta in A001/A002/A004

The first candidate could name the textbook task without giving enough usable learner language to perform it.

Repair:
- A001 now has `u42-home-country-model` plus preference/reason models.
- A002 now has `u43-a002-model`: 你以前住在哪裡？你在那裡住了多久？, plus an explicit record-and-report instruction.
- A004 now has the complete `u44-weather-interview` question set and explicit additional-information + record-results instruction.
- A003 already uses actual numeric Taipei chart comparisons.
- A005 keeps an explicit discuss-and-write-in-Chinese instruction rather than pretending a multiple-choice item is equivalent to free writing.

Status: **resolved**.

### MAJOR — ACT-TQ-003 — full A003 comparison toolkit was underrepresented

The initial candidate emphasized 比…更 / 跟…一樣 / 沒有…那麼 but did not intentionally retrieve both prior 比 and 比較.

Repair:
- Unit-44 review now includes explicit retrieval for:
  - plain 比;
  - 比較;
  - 比…更;
  - 跟…一樣;
  - 沒有…那麼.
- the Taipei chart then applies the comparative systems in context.

Status: **resolved**.

### MINOR — ACT-TQ-004 — culture checks were initially implementation-meta rather than learner-facing culture comprehension

Repair:
- retained the historical/freshness warning in the explanatory card;
- changed assessed culture items to actual source comprehension, including the four-hour window and later regional-government decision making.

Status: **resolved**.

### MINOR — ACT-TQ-005 — Unit-44 capstone review became unnecessarily repetitive

The first expanded review reached 46 steps.

Repair:
- removed redundant generic comparison questions already assessed by A003;
- grouped direct retrieval of single-character lexical targets 傘 / 濕 / 更 into one match activity;
- removed redundant A004 spot-checks already supported by the exact interview card;
- removed a duplicated 想 retrieval already secured in Unit 43.
- final Unit-44 review is 37 total steps, including the A004 phrase step. Its larger size is justified by being both the Unit-44 review and the Lesson-14 capstone.

Status: **resolved**.

---

# Final lifecycle audit

## Unit 42

### 天氣 / 冷 / 風
- EXPLAIN: `u42-weather-cold`, `u42-weather-source`
- RECOGNIZE: weather s1–s3
- CONTROLLED: source comparison select/order
- CONTEXTUAL: D1T01-safe source wording
- RETRIEVAL: review v1–v3
- DELAYED: Unit-44 weather/capstone

PASS.

### 滑雪 / 下雪
- EXPLAIN: `u42-snow-when`
- RECOGNIZE: snow s1–s2
- CONTROLLED: order/listen
- CONTEXTUAL: source “when it snows, ski” line
- RETRIEVAL: review v4–v5
- DELAYED: Unit-44 A004

PASS.

### Four seasons
All 春天 / 冬天 / 夏天 / 秋天 receive:
- character teaching where needed;
- contextual season cards;
- individual meaning checks;
- preference transfer;
- direct review retrieval;
- delayed temperature/weather comparison in Unit 44.

PASS.

### 雨 / 下雨 and weather A-not-A support
- 雨 / 下雨 are explained and retrieved before 會不會下雪 / 常不常下雨.
- support cards explicitly explain 會不會 and 常不常 before assessment.
- Unit-44 A004 later retrieves the system.

PASS.

### A001 / A005
The learner receives:
- a home-country climate model;
- a most/least season model;
- 因為…所以… reason model;
- Taiwan-summer model;
- explicit write-findings-in-Chinese instruction.

Given the current app schema lacks free-text composition, the external writing instruction is the honest source-faithful solution rather than silently replacing writing with recognition only.

PASS.

## Unit 43

### G001 completed duration
Lifecycle:
- prior-system connection in grammar explanation;
- safe examples;
- object-repeat practice;
- fronted-object contrast;
- source confirmation bridge 對不對 taught before tested;
- listening/order practice;
- independent review;
- later trip experience retrieval.

PASS.

### G002 duration-to-now
Lifecycle:
- taught only after G001;
- source line provides contextual use;
- direct semantic contrast G001 vs G002;
- continuation caveat explicitly taught;
- A002 immediately consolidates where/how-long interviewing;
- independent review;
- Unit-44 cumulative retrieval.

PASS.

### 想 “miss”
- contextual source line explicitly explains new sense;
- immediate recognition;
- independent Unit-43 review;
- no duplicate Search/Mega ownership.

PASS.

### 快 / 要 expansion + G003
- new senses have dedicated meaning-first cards;
- grammar follows those cards;
- source New-Year line comes only after grammar explanation;
- textbook restriction and Taiwan 快要 preference are practiced;
- 停 provides delayed same-unit retrieval;
- Unit-44 颱風快要來了 gives cross-unit retrieval.

PASS.

### New vocabulary / plans
新年 / 父母 / 停 / 十二月底 / 明年 / 紅葉 all receive meaning-first context, controlled questions, and independent review.

PASS.

### A002
Actual interview language is provided, plus explicit recording/reporting instruction.

PASS.

## Unit 44

### 傘
- character + source context;
- direct recognition;
- source dialogue;
- listening/order;
- review.

PASS.

### 颱風
- meaning-first card;
- Unit-43 imminence retrieval;
- habitual summer context;
- culture context;
- review;
- comparison/capstone reuse.

PASS.

### 濕 / 討厭 / 濕濕的
- 濕 taught before reduplication;
- 討厭 meaning-first card before assessment;
- source-attested 濕濕的 is explicitly framed as a specific extension, not a free generalization;
- contextual/listening/order use;
- review.

PASS.

### 新聞 / 大家 / 小心 / caution formula
Each exact NEW word is explained before testing.
The sequence explicitly retrieves prior 多 + Verb before 請大家多小心.

PASS.

### 更 / G004
- 這次 / 上次 have a meaning-first paired card;
- 更 baseline meaning is taught before grammar;
- G004 explanation follows;
- full D2T07 appears only after G004;
- controlled, listening and order practice;
- review/A003 cumulative comparison.

PASS.

### 可怕 / 慢走 / G005
- 可怕 and 慢走 are both explained before testing;
- 慢走's conventional pragmatic value is explicit;
- G005 is taught before D2T08;
- source baseline implication and three-way comparison are practiced;
- D2T09–D2T11 close the source episode;
- review/A003/capstone retrieve the system.

PASS.

### Culture
The learner sees the source-era facts before being asked about them. All administrative material is explicitly historical/source-framed, not current advice.

PASS.

### A003 / A004
- A003 uses actual numeric °C data, Latin-script Taipei, and comparison production without 度/北.
- A004 provides the exact season/weather interview prompts, an additional-information instruction, and a record-results instruction.

PASS.

---

# Character-learning audit

Every one of the 21 NEW formal characters has:
- a lesson-local lifecycle;
- first exposure before independent use;
- contextual reading through its owning vocabulary;
- a `complete` handwriting retrieval in the unit review.

Counts:
- Unit 42: 8 / 8
- Unit 43: 6 / 6
- Unit 44: 7 / 7

Deferred 玉 / 紐 / 約 and hidden support glyphs are never converted into writing requirements.

PASS.

# Review/load audit

## Unit 42
- 25 review steps
- 3 listening
- 8 handwriting completions
- all 11 lexical targets
- support bridge + transfer

Load: appropriate for a lexical unit.

## Unit 43
- 28 review steps
- 3 listening
- 6 handwriting completions
- all 7 NEW lexical targets
- all 3 expansion senses
- all 3 grammar systems
- direct G001/G002 contrast
- delayed Unit-42 retrieval

Load: appropriate for a grammar-dense unit.

## Unit 44
- 37 total review/capstone steps
- 3 listening
- 7 handwriting completions
- all 12 NEW lexical targets
- G004/G005
- full A003 toolkit
- A004
- culture
- delayed Units 42–43
- F/S001–004 capstone

This is longer than an ordinary unit review, but the activity mix is mostly short recognition/retrieval plus seven handwriting completions, and it replaces a separate Lesson-14 capstone lesson. No additional unit or duplicate capstone is needed.

Load: high but justified; not a MAJOR overload.

# Search / Mega teaching coherence

- all 30 canonical NEW forms have exactly one first-teaching lesson;
- their in-unit teaching precedes review;
- normal Search/Mega inclusion follows canonical ownership;
- 想 / 快 / 要 Lesson-14 senses remain activity-level expansions only, avoiding premature global Search/Mega leakage;
- no contextual proper name/support item is accidentally promoted.

PASS.

# Final findings

- BLOCKER: **0**
- MAJOR: **0**
- MINOR: **0 open**

# Result: PASS

Activity Audit 1 — Teaching Quality passes.

Gate B remains pending. The mandatory fresh-context question-correctness/adversarial audit and the cross-unit coherence audit are still required.
