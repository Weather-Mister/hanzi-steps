# Book 1 Lesson 14 — Activity Audit 3: Cross-Unit Coherence

Audited packet:
- `course/book1/lesson14-activity-spec.md`
- `course/book1/lesson14-unit42-activity-spec.md`
- `course/book1/lesson14-unit43-activity-spec.md`
- `course/book1/lesson14-unit44-activity-spec.md`

Frozen curriculum:
- `course/book1/lesson14-curriculum-blueprint.md`

Scope: Units 42–44 as one source-lesson batch. This audit checks sequencing, ownership, cumulative review, dialogue integration, Search/Mega, support routing, character consistency, and whether any cross-unit prerequisite or source function disappears between unit files.

## Findings discovered and repaired before final verdict

### MAJOR — ACT-XU-001 — several source-dialogue functions were only nominally “owned” but not actually represented

The first candidate packet assigned all source dialogue turns in metadata, but some safe parts were not present in learner-facing context:

- B1L14-D1T02: very-high-mountain snow claim;
- B1L14-D1T05: 春天不錯，天氣很舒服;
- B1L14-D1T09: invitation function after the return plan;
- B1L14-D1T10: 對了，你什麼時候回來？;
- B1L14-D2T05: the full typhoon-condition clause with 做什麼都….

Repair:
- Unit 42 adds `u42-snow-mountain` and `u42-spring-comfort`.
- Unit 43 preserves the D1T09 invitation in `u43-return-plan` and adds `u43-return-question`.
- Unit 44 adds `u44-typhoon-conditions`.
- deferred proper names remain omitted/glossed exactly as Gate A allows.

Status: **resolved**.

### MAJOR — ACT-XU-002 — B1L14-X030 had a disposition but no explicit activity lifecycle

The dependency/blueprint stage classifies **差不多 + time / duration + 多** as EXPANSION in Unit 43.

The first activity candidate used 半年多 but did not explicitly teach/retrieve 差不多 + time.

Repair:
- Unit 43 adds `u43-approx-time`: 每年差不多十二月開始下雪。
- `u43-approx-s1` explicitly retrieves “around December.”
- 半年多 remains the duration + 多 side of the same support expansion.
- this also preserves a source-supported part of B1L14-D1T03 without prematurely teaching it in Unit 42.

Status: **resolved**.

### MAJOR — ACT-XU-003 — source A003 comparison toolkit was not fully cumulative

The initial Unit-44 capstone covered 比…更 / 跟…一樣 / 沒有…那麼 but did not intentionally retrieve plain 比 and 比較.

Repair:
- explicit Unit-44 review items now retrieve both plain 比 and 比較;
- the Taipei °C task applies equal, higher-degree, and lower-degree comparisons;
- no new ownership is created for the prior comparison systems.

Status: **resolved**.

### MINOR — ACT-XU-004 — source A001/A002/A004 task mechanics needed stronger cross-unit transfer

Repair:
- Unit 42 has an explicit home-country climate model.
- Unit 43 has a safe where/how-long interview model plus record/report instruction.
- Unit 44 has the exact seven-question weather interview card plus additional-information and record-results instructions.

Status: **resolved**.

---

# Final cross-unit audit

## 1. Ownership chronology

### Unit 42
Owns 11 NEW lexical entries:
天氣、冷、風、滑雪、下雪、春天、冬天、夏天、秋天、雨、下雨.

They are all explained and assessed before later-unit reuse.

### Unit 43
Owns 7 NEW:
只、新年、父母、停、十二月底、明年、紅葉.

Expands, without duplicate ownership:
想、快、要.

### Unit 44
Owns 12 NEW:
傘、颱風、濕、討厭、新聞、大家、小心、這次、上次、更、可怕、慢走.

No exact form receives two NEW owners.

PASS.

## 2. Cross-unit prerequisite direction

Verified ordering:
- Unit-42 雨/下雨 exists before Unit-43 雨快要停了.
- Unit-43 快/要/G003 exists before Unit-44 颱風快要來了.
- Unit-43 停 exists before D2T09 雨停了.
- Unit-42 weather/seasons exist before Unit-44 A003/A004.
- Unit-41 跟…一樣 and earlier 比/比較 remain prerequisites, not redeclared.
- Unit-40 多 + Verb exists before Unit-44 請大家多小心.
- Unit-30 state reduplication is explicitly extended, not assumed wholesale, before 濕濕的.

No future unit is needed to understand an assessed Lesson-14 item.

PASS.

## 3. Dialogue integration

### Dialogue I
- D1T01: comparison/weather in u42-weather; 會不會下雪 delayed until support bridge in u42-rain.
- D1T02: very-high-mountain snow + inferential 吧 preserved safely; 玉山/美國 remain contextual/deferred.
- D1T03: snow/ski source context in Unit 42; 差不多 + time support explicitly taught later in Unit 43 per the frozen support allocation.
- D1T04–D1T05: spring preference + comfortable-weather context represented.
- D1T06: completed trip represented with Gate-A-approved safe adaptation: no productive 紐約 and 好看 for untaught 漂亮.
- D1T07: double-了 + 想家 represented after teaching.
- D1T08: 新年快到了 only after 快/要/G003.
- D1T09: return plan + invitation preserved without productive 美國.
- D1T10: winter/next-year/red-leaf plan + return-timing question preserved; 妳 normalized to 你.
- D1T11: reason/date return line preserved.

### Dialogue II
- D2T01: umbrella question with 呢 comprehension-only.
- D2T02: forgot-umbrella reply.
- D2T03: typhoon imminence only after G003.
- D2T04: 已經聽說了.
- D2T05: annual typhoon + conditions + question-word 都.
- D2T06: 濕濕的/討厭 only after explicit extension.
- D2T07: caution branch may appear earlier; full 比…更 clause only after G004.
- D2T08: only after G005.
- D2T09: reuses pre-taught 停.
- D2T10: umbrella thanks/leave.
- D2T11: 慢走 formula only after teaching.

All 22 turns have actual activity/context support rather than metadata-only ownership.

PASS.

## 4. Grammar lifecycle across units

- G001: Unit 43 teaching → same-unit controlled practice → review → trip transfer.
- G002: follows G001 → direct contrast → review → Unit-44 cumulative retrieval.
- G003: follows 快/要 sense cards → same-unit restriction practice → 停 retrieval → Unit-44 typhoon retrieval.
- G004: 更 baseline → grammar → full D2T07 → A003/capstone.
- G005: grammar → D2T08 → comparison toolkit/A003/capstone.

No grammar appears productively before its teaching activity.

PASS.

## 5. Support-record coherence

Key expansions/reviews:
- X020 weather A-not-A → Unit 42 teach/review → A004 Unit 44.
- X029 濕濕的 → Unit 44 after 濕.
- X030 差不多 + time / duration + 多 → Unit 43 explicit lifecycle.
- X032 caution/leave-taking → Unit 44 after all lexical/grammar prerequisites.
- X034 對不對 → Unit 43 bridge before use.
- P003 inferential 吧 → prior review in Unit 42.
- P004 呢 → comprehension-only.
- P006 快要 Taiwan preference → Unit 43 G003.
- X015 度 → remains out of productive content through °C redesign.

Deferred support never becomes accidental NEW ownership.

PASS.

## 6. Search / Mega coherence

Canonical NEW ownership:
- Unit 42: 11
- Unit 43: 7
- Unit 44: 12
- total: 30

All have:
- one first-teaching lesson;
- direct unit review retrieval;
- normal Search/Mega eligibility through the standard canonical row.

Expansion forms:
- 想 / 快 / 要 retain earlier canonical rows;
- no second ownership;
- no broadening of earlier global glosses;
- Lesson-14 senses are retrieved in Unit 43 and cumulative review only.

Not promoted:
- 玉山 / 紐約
- 度
- contextual country/place labels
- source drill-only nouns
- adapted support forms.

PASS.

## 7. Character coherence

NEW first-introduction order remains:
- Unit 42: 冷、滑、雪、春、冬、夏、秋、雨
- Unit 43: 只、父、母、停、底、葉
- Unit 44: 傘、颱、濕、討、厭、聞、更

Every later use is downstream of first teaching.

A static character scan of all phrase/question/audio payload lines found no assessed Hanzi outside:
- the cumulative Unit-41 character baseline;
- the 21 planned Lesson-14 NEW characters.

Deferred/hidden glyphs only occur in non-assessed explanatory metadata.

PASS.

## 8. Delayed retrieval

- Unit 43 review retrieves Unit-42 weather.
- Unit 44 review retrieves Unit-42 weather questions and Unit-43 duration/imminence.
- Unit 44 A003 retrieves earlier 比 / 比較 / 跟…一樣 while mixing G004/G005.
- Unit 44 A004 retrieves Unit-42 seasons + weather-question bridge.
- Unit 44 capstone maps explicitly to all four F/S outcomes.

No unit is isolated from cumulative retention.

PASS.

## 9. Source activity coherence

- A001: model + preference/reason + source task requirements.
- A002: actual interview language + record/report instruction.
- A003: Latin-script Taipei + numeric °C; full comparison toolkit; no 度/北 prerequisite.
- A004: exact season/weather interview card; additional-info + record-results requirement.
- A005: Taiwan-summer model + explicit write-findings-in-Chinese instruction.

The app schema has no free-text activity type. The specification therefore uses explicit outside-app writing/recording instructions where the source requires productive recording, rather than falsely claiming a select/order item is equivalent.

PASS.

## 10. Unit-review consistency

- Unit 42 review: 25 steps, 3 listening, all 11 NEW, all 8 NEW characters.
- Unit 43 review: 28 steps, 3 listening, all 7 NEW + 3 expansion senses + all grammar + all 6 NEW characters.
- Unit 44 review/capstone: 37 total steps, 3 listening, all 12 NEW + all 7 NEW characters + G004/G005 + A003/A004 + culture + delayed review + four outcomes.

The increasing review size follows cumulative responsibility rather than arbitrary padding.

PASS.

# Final findings

- BLOCKER: **0**
- MAJOR: **0**
- MINOR: **0 open**

# Result: PASS

Activity Audit 3 — Cross-Unit Coherence passes.

Gate B remains pending only on the mandatory **fresh-context Activity Audit 2 — Question Correctness / Adversarial Audit**.
