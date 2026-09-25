# Book 1 Lesson 14 — Bidirectional Traceability Report

Stage: **8 — Bidirectional traceability**  
PR: **#68**  
Branch: `book1-lesson14-source-a`

Final learner-facing implementation baseline for this trace:
`10c092d081910140fd6a76e8078b89acb7c5574d`

The current PR head is later only because the three independent final-rerun-2 learner-simulation reports were added. A repository comparison from the implementation baseline to the pre-traceability head found **only those three report files** and no learner-facing code change.

## Result

**PASS**

Release conditions:
- unresolved source items: **0**
- orphan production concepts: **0**
- open BLOCKER: **0**
- open MAJOR: **0**

---

# 1. Direction 1 — textbook → source ledger → blueprint → activities → production

## 1.1 Formal lexical inventory

Source ledger:
- B1L14-V001–V035 = **35 / 35** formal lexical entries.

Dependency resolution:
- **30 NEW**
- **3 EXPANSION**: 想 “miss”, 快 “soon/about to”, 要 imminent auxiliary
- **2 DEFERRED contextual Names**: 玉山, 紐約

Production verification:
- Units 42–44 contain exactly **30** canonical `newVocabulary` rows.
- Missing source-NEW rows: **0**
- Extra Lesson-14 canonical NEW rows: **0**
- Duplicate Lesson-14 canonical NEW rows: **0**

Unit ownership:
- Unit 42: **11**
- Unit 43: **7**
- Unit 44: **12**

The three EXPANSION forms retain their prior canonical ownership and receive explicit Lesson-14 sense teaching/retrieval:
- 想 → `u43-review-e1`
- 快 → `u43-review-e2`
- 要 → `u43-review-e3`

They create **0 duplicate canonical rows**.

The two formal Names remain non-productive:
- 玉山 — contextual/adapted only
- 紐約 — contextual/adapted only

Neither appears in Lesson-14 `newVocabulary`, handwriting ownership, or canonical Search/Mega ownership.

**Trace status: complete.**

## 1.2 Formal grammar

Source targets:
- B1L14-G001 — completed duration with verbal 了
- B1L14-G002 — duration accumulated to now / double 了
- B1L14-G003 — 快／要／快要…了 imminence
- B1L14-G004 — 比…更…
- B1L14-G005 — 沒有…那麼／這麼…

Frozen production owners:
- G001 → `u43-completed-duration`
- G002 → `u43-duration-to-now`
- G003 → `u43-imminent`
- G004 → `u44-even-more`
- G005 → `u44-not-as`

Production contains exactly these **5** Lesson-14 formal grammar records.

Prerequisite direction is preserved:
- G001 → G002
- 快 + 要 expansion teaching → G003
- 更 baseline → G004
- G004 before mixed G004/G005 comparison review
- G005 before D2T08 and productive 沒有…那麼 work

**Trace status: complete.**

## 1.3 Character ownership

Frozen non-deferred Lesson-14 NEW characters:
- Unit 42: 冷、滑、雪、春、冬、夏、秋、雨
- Unit 43: 只、父、母、停、底、葉
- Unit 44: 傘、颱、濕、討、厭、聞、更

Production:
- NEW characters: **21 / 21**
- duplicate ownership: **0**
- review handwriting retrieval: **21 / 21**
- missing review handwriting target: **0**

Deferred proper-name characters:
- 玉
- 紐
- 約

They remain outside Lesson-14 handwriting ownership.

The A003 support glyph 度 also remains outside character ownership under the frozen `°C` redesign.

**Trace status: complete.**

## 1.4 Dialogue routing

Frozen blueprint routing:
- D1T01–D1T05 → Unit 42
- D1T06–D1T11 → Unit 43
- D2T01–D2T11 → Unit 44

Production phrase provenance was checked against all **22** dialogue-turn IDs.

Every dialogue turn has at least one production phrase carrying its source provenance:
- D1T01 → `u42-weather-source`
- D1T02 → `u42-snow-mountain`
- D1T03 → `u42-snow-when` / `u43-approx-time`
- D1T04 → `u42-spring-source`
- D1T05 → `u42-spring-comfort`
- D1T06 → `u43-trip-adapted`
- D1T07 → `u43-duration-now-source`
- D1T08 → `u43-newyear-source`
- D1T09 → `u43-return-plan`
- D1T10 → `u43-return-question` / `u43-nextyear-source`
- D1T11 → `u43-return-reason`
- D2T01 → `u44-umbrella-source`
- D2T02 → `u44-umbrella-reply`
- D2T03 → `u44-typhoon-coming`
- D2T04 → `u44-heard`
- D2T05 → `u44-typhoon-summer` / `u44-typhoon-conditions`
- D2T06 → `u44-wet-source`
- D2T07 → `u44-caution` / `u44-comparison-source`
- D2T08 → `u44-not-as-source`
- D2T09 → `u44-rain-stopped`
- D2T10 → `u44-thanks`
- D2T11 → `u44-leave-source`

Approved adaptations remain explicit:
- deferred proper names are removed/glossed rather than promoted;
- D1T06 uses the learner-safe trip adaptation;
- 妳 is normalized to 你;
- D2T01 呢 remains comprehension-only;
- no adaptation creates new ownership.

**Trace status: 22 / 22 turns resolved.**

## 1.5 Pragmatics and support language

Required Lesson-14 pragmatic handling is accounted for:
- 更 “even more” baseline → G004 teaching/review
- 有沒有…那麼 salient-baseline implication → G005 teaching/review
- inferential 吧 → prior Unit-30 review in Unit 42
- D2T01 呢 → comprehension only, not generalized
- 慢走 / 小心慢走 → explicit conventional leave-taking teaching
- Taiwan preference for 快要 → G003 teaching

Support-only B1L14-X001–X037 is resolved through one of:
- prior curriculum;
- explicit Lesson-14 expansion;
- safe substitution/gloss;
- contextual-only use;
- frozen redesign.

Important redesign:
- B1L14-X015 度 is **not** made productive.
- A003 uses numeric **°C** and Latin-script **Taipei**.
- 度 / 北 acquire no vocabulary or handwriting ownership.

No support-only item silently becomes an orphan productive concept.

**Trace status: complete.**

## 1.6 Drill families

- DR001 → Unit 43 G001 teaching/review
- DR002 → Unit 43 G002 teaching/review
- DR003 → Unit 43 G003 teaching/review
- DR004 → Unit 44 G004 teaching/review
- DR005 → Unit 44 G005 teaching/review

The final reviews preserve independent assessment of all five systems.

**Trace status: 5 / 5 resolved.**

## 1.7 Classroom transfer activities

Frozen routing and production realization:
- A001 Four Seasons → Unit 42 `u42-seasons` + review
- A002 How Long Did You Live There? → Unit 43 `u43-duration-now` / `u43-a002-model` + review
- A003 Temperature Comparison → Unit 44 A003 numeric-°C review items
- A004 Same Weathers → Unit 42 weather-question preparation + Unit 44 `u44-weather-interview`
- A005 Summer in Taiwan → Unit 42 `u42-seasons` transfer cards/instructions

The transfer instructions that require recording/reporting/writing remain instructional requirements rather than being replaced by English curriculum-metadata questions.

**Trace status: 5 / 5 resolved.**

## 1.8 Culture

B1L14-CUL001 Typhoon Days-Off is represented in Unit 44.

Production frames its administrative details as **textbook-era / historical source content**, not current 2026 procedural advice.

**Trace status: resolved.**

## 1.9 Outcomes and self-assessment

Source outcomes:
- F001 / S001 — weather conditions including typhoons
- F002 / S002 — four seasons + preferences/reasons
- F003 / S003 — comparisons
- F004 / S004 — simple experience/trip statements

Final Unit-44 capstone:
- `u44-review-cap1` — weather/typhoon + comparison/caution
- `u44-review-cap2` — season preference + reason
- `u44-review-cap3` — inferior comparison
- `u44-review-cap4` — completed-duration experience

All four are Chinese `order` construction tasks using previously taught phrases.

**Trace status: F001–F004 and S001–S004 resolved.**

---

# 2. Direction 2 — production → activities → blueprint → source / prior curriculum / approved addition

## 2.1 Canonical Lesson-14 production ownership

Every Lesson-14 `newVocabulary` row maps to one B1L14-V NEW record.

Count:
- production canonical NEW = **30**
- source/dependency NEW = **30**
- production without source ownership = **0**

Every Lesson-14 formal grammar record maps to B1L14-G001–G005.

Count:
- production Lesson-14 grammar = **5**
- source formal grammar = **5**
- orphan formal grammar = **0**

Every Lesson-14 new-character owner maps to the frozen character-ownership set.

Count:
- production NEW characters = **21**
- frozen non-deferred NEW characters = **21**
- orphan character ownership = **0**

## 2.2 Production phrases

Production phrase records fall into supported classes:
1. direct or split dialogue preservation;
2. Gate-A-approved dialogue adaptation;
3. source classroom-activity model/scaffold;
4. source grammar model;
5. prior-curriculum review/support used to bridge a source requirement.

No production phrase was found that creates an unapproved new Lesson-14 grammar system or canonical vocabulary owner.

Cross-unit order references were checked:
- order activities: **29**
- unresolved phrase refs: **0**
- token/phrase mismatches: **0**

## 2.3 Production assessment / review additions

Review scaffolds, contrast questions, and capstone steps map to:
- frozen review floors;
- source drill families;
- source outcomes/activities;
- explicitly approved cumulative retrieval.

Unit-review sizes remain:
- Unit 42: **25**
- Unit 43: **28**
- Unit 44: **41**

These are activity-engineering realizations of frozen curriculum, not orphan source claims.

## 2.4 Search, Mega, adaptive practice, and standalone handwriting

These are product/practice surfaces rather than textbook concepts.

Their provenance is the frozen activity/prerequisite contract:
- Pinyin Search keeps canonical lookup global.
- Mega/adaptive canonical vocabulary eligibility uses owning-lesson completion.
- standalone `practice-<character>` is gated by first non-review character teaching.
- all 21 Lesson-14 NEW characters receive later handwriting retrieval.

The helper `characterPracticeAvailable` is therefore an approved implementation of a prerequisite-safety rule, not an orphan curriculum concept.

## 2.5 Approved adaptations are not orphan production

The following non-literal production choices have explicit upstream authorization:
- 玉山 / 紐約 not made productive;
- proper-name/speaker glyph normalization;
- 漂亮 → learner-safe known wording in the adapted trip line;
- country/place drill substitutions;
- 呢 comprehension-only;
- A003 `°C` / `Taipei` redesign;
- typhoon administrative content historical/source framing.

Each maps to the dependency ledger and frozen blueprint's adaptation/deferral policy.

---

# 3. Deterministic cross-checks used in this trace

Repository-level checks performed while constructing this report:

- dependency NEW lexical records: **30**
- production Lesson-14 canonical NEW rows: **30**
- missing NEW rows: **0**
- extra NEW rows: **0**
- duplicate NEW rows: **0**
- lexical EXPANSION rows duplicated in Unit 43: **0**
- deferred 玉山 / 紐約 / 度 canonical rows: **0**
- production NEW characters: **21**
- duplicate NEW characters: **0**
- review handwriting retrieval: **21 / 21**
- formal grammar records: **5 / 5**
- dialogue provenance IDs represented: **22 / 22**
- Unit-43 expansion-sense review checks: **3 / 3**
- Unit-44 required delayed Unit-43 retrieval items: **4 / 4**
- final capstone construction items: **4 / 4**
- order phrase/token mismatches: **0**

Final-rerun-2 learner simulations were also verified on the PR history:
- Simulation A: PASS, 0 BLOCKER / 0 MAJOR
- Simulation B: PASS, 0 BLOCKER / 0 MAJOR
- Simulation C: PASS, 0 BLOCKER / 0 MAJOR

No learner-facing code changed between the final implementation baseline and those three reports.

---

# 4. Unresolved-source and orphan-production ledger

## Unresolved source items

**0**

Every pedagogically relevant Lesson-14 source record is:
- productively taught;
- intentionally reviewed from prior curriculum;
- explicitly expanded;
- explicitly deferred/adapted; or
- represented as required activity/culture/outcome content.

## Orphan production concepts

**0**

No Lesson-14 production vocabulary owner, grammar owner, character owner, phrase family, transfer activity, culture claim, review target, or prerequisite-safety feature lacks a path to:
- the Lesson-14 source;
- prior published curriculum; or
- an explicit Gate-A/Gate-B approved adaptation or implementation invariant.

# Stage-8 verdict: PASS

Bidirectional traceability is complete.

Release remains locked pending the mandatory **fresh-context final hostile release audit** and Gate C.
