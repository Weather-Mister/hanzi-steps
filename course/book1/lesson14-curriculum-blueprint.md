# Book 1 Lesson 14 — Frozen Curriculum Blueprint

Authoritative source: *A Course in Contemporary Chinese 1*, Lesson 14 「天氣這麼冷！」.

Upstream gates:
- source: PASS
- dependencies: PASS

Architecture history:
- Pass 1: `lesson14-curriculum-rough.md`
- Pass 2: `lesson14-curriculum-refined.md`

This is the **Gate-A frozen unit-level curriculum blueprint**. Source and dependency gates are PASS, and all three required curriculum audits have passed with zero open BLOCKER or MAJOR findings after repair.

Activity engineering may proceed from this file. Learner-facing Unit 42 TypeScript, stroke files, manifest entries, or other implementation remain locked until Gate B passes.

---

# 1. Final unit architecture

Lesson 14 is allocated across **three Hanzi Steps units: Units 42–44**.

| Unit | Working title | Core communicative goal | Formal NEW lexical targets | Lexical EXPANSION | NEW formal chars | Formal grammar |
|---|---|---|---:|---:|---:|---|
| 42 | **Weather and the Four Seasons** | describe weather/seasons and explain preferences | 11 | 0 | 8 | none; X020 support bridge |
| 43 | **How Long and What's About to Happen** | talk about completed/ongoing duration, plans, homesickness and imminence | 7 | 3 | 6 | G001–G003 |
| 44 | **Typhoons and Comparisons** | discuss typhoons, caution, and compare conditions | 12 | 0 | 7 | G004–G005 |

Totals:
- formal NEW lexical entries: **30 / 30 non-deferred**
- lexical EXPANSION entries: **3 / 3**
- NEW formal characters: **21 / 21**
- formal grammar targets: **5 / 5**
- deferred formal Name entries: **2 / 2**, preserved contextually but not made productive targets

The three-unit choice balances the normal 10–13-word/form pacing target without padding or fragmenting the source.

---

# 2. Locked cross-unit source ownership

## Dialogue I

- **Unit 42:** B1L14-D1T01–B1L14-D1T05
- **Unit 43:** B1L14-D1T06–B1L14-D1T11

## Dialogue II

- **Unit 44:** B1L14-D2T01–B1L14-D2T11

This keeps Dialogue II intact as one typhoon episode after its weather and imminence prerequisites are already available.

## Formal grammar ownership

| Source grammar | Unit | Planned stable grammar ID |
|---|---:|---|
| B1L14-G001 completed duration with verbal 了 | 43 | `u43-completed-duration` |
| B1L14-G002 duration-to-now with double 了 | 43 | `u43-duration-to-now` |
| B1L14-G003 快／要／快要…了 imminence | 43 | `u43-imminent` |
| B1L14-G004 比…更… | 44 | `u44-even-more` |
| B1L14-G005 沒有…那麼／這麼… | 44 | `u44-not-as` |

B1L14-X020 會不會 / 常不常 receives an explicit support bridge in Unit 42, but does **not** become a sixth formal source grammar target.

## Frozen prerequisite edges

These edges are part of Gate A and may not be reordered away during activity engineering:

- **Unit 42:** teach B1L14-V017 下雪 and B1L14-V019/B1L14-V032 雨/下雨 before productive B1L14-X020 會不會下雪 / 常不常下雨 assessment.
- **Unit 43:** B1L14-G001 → B1L14-G002; B1L14-V008 快 + B1L14-V022 要 → B1L14-G003; the B1L14-X034 對不對 confirmation bridge must precede any DR001 prompt that uses 對不對.
- **Unit 44:** B1L14-V024 濕 → B1L14-X029 濕濕的; B1L14-V028 大家 + B1L14-V029 小心 + prior `u40-more-less-verb` → 請大家多小心; B1L14-V027 更 + B1L14-P001 → B1L14-G004 → full B1L14-D2T07; B1L14-G005 → B1L14-D2T08; B1L14-V029 小心 + B1L14-V035 慢走 → B1L14-P005 / 小心慢走.

## Outcome ownership

- **B1L14-F001 weather/typhoons:** established in Unit 42; completed in Unit 44.
- **B1L14-F002 seasons/preferences:** completed in Unit 42.
- **B1L14-F003 comparison:** completed in Unit 44.
- **B1L14-F004 experiences/trips:** completed in Unit 43.
- **B1L14-S001–S004:** cumulative retrieval in Unit 44 capstone/review.

## Classroom-activity ownership

- **B1L14-A001 The Four Seasons:** Unit 42
- **B1L14-A002 How Long Did You Live There?:** Unit 43
- **B1L14-A003 Temperature Comparison:** Unit 44
- **B1L14-A004 Same Weathers:** weather-question preparation in Unit 42; full comparative transfer in Unit 44
- **B1L14-A005 Summer in Taiwan:** Unit 42

## Culture ownership

- **B1L14-CUL001 Typhoon Days-Off:** Unit 44 as textbook-era/historical source culture, not current administrative advice.

---

# 3. Unit 42 blueprint — Weather and the Four Seasons

## Identity

Working title: **Weather and the Four Seasons**

Primary goal:
- describe ordinary weather;
- name all four seasons;
- ask whether it snows/rains;
- explain seasonal preferences.

Approximate load:
- 11 NEW formal lexical entries
- 8 NEW characters
- 0 formal new grammar rules
- 1 explicit support expansion (A-not-A weather questions)
- moderate lexical / low formal-grammar load

## New vocabulary

- B1L14-V001 天氣 tiānqì — weather
- B1L14-V002 冷 lěng — cold
- B1L14-V003 風 fēng — wind
- B1L14-V004 滑雪 huáxuě — ski
- B1L14-V005 春天 chūntiān — spring
- B1L14-V010 冬天 dōngtiān — winter
- B1L14-V012 秋天 qiūtiān — autumn
- B1L14-V017 下雪 xiàxuě — snow
- B1L14-V019 雨 yǔ — rain
- B1L14-V023 夏天 xiàtiān — summer
- B1L14-V032 下雨 xiàyǔ — rain / to rain

## New characters

- 冷
- 滑
- 雪
- 春
- 冬
- 夏
- 秋
- 雨

All other characters in the Unit-42 formal lexical set are already owned.

## Planned six teaching lessons

### U42-L1 — Weather Outside
Reserved lesson ID: `u42-weather`

Targets:
- 天氣
- 冷
- 風

Outcome:
- identify and describe cold/windy weather;
- reuse known 比 for simple weather comparison without introducing Lesson-14 comparison grammar yet.

Source:
- B1L14-D1T01
- B1L14-V001–V003
- B1L14-F001 partial

### U42-L2 — Snow and Skiing
Reserved lesson ID: `u42-snow`

Targets:
- 滑雪
- 下雪
- characters 滑、雪

Review/support:
- B1L14-X024 …的時候
- B1L14-P003 inferential 吧

Outcome:
- say whether/when it snows;
- say one skis when it snows.

Source:
- B1L14-D1T02–D1T03, adapted around deferred 玉山/美國
- B1L14-V004, V017

### U42-L3 — Spring and Winter
Reserved lesson ID: `u42-spring-winter`

Targets:
- 春天
- 冬天
- characters 春、冬

Review/support:
- 比較
- 怕
- 喜歡

Outcome:
- state a seasonal preference and simple reason.

Source:
- B1L14-D1T04–D1T05
- B1L14-V005, V010
- B1L14-F002 partial

### U42-L4 — Summer and Autumn
Reserved lesson ID: `u42-summer-autumn`

Targets:
- 夏天
- 秋天
- characters 夏、秋

Outcome:
- complete the four-season system and describe familiar seasonal conditions.

Source:
- B1L14-V012, V023
- B1L14-A001 preparation
- B1L14-A005 preparation

### U42-L5 — Rain and Weather Questions
Reserved lesson ID: `u42-rain`

Targets:
- 雨
- 下雨
- character 雨
- B1L14-X020 support expansion: 會不會 / 常不常

Explicit prerequisite bridge:
- learner already knows 是不是 and A-not-A-like patterns;
- teach only the source-required productive transfer to 會不會 and 常不常 before asking those questions.

Outcome:
- ask and answer 會不會下雪 / 常不常下雨;
- talk about recurring weather with known 每…都… / 常.

Source:
- B1L14-V019, V032
- B1L14-X020, X031
- B1L14-A004 preparation

### U42-L6 — My Seasons and Summer
Reserved lesson ID: `u42-seasons`

Targets:
- integrated retrieval, no artificial NEW padding

Review/support:
- B1L14-X021 因為…所以…
- B1L14-X016 特別
- known food/activity vocabulary

Transfer:
- B1L14-A001: describe one's home-country climate, identify the most- and least-liked seasons, and explain the reasons using known 因為…所以….
- B1L14-A005: discuss summer weather in Taiwan, distinctive features, commonly eaten fruit, and common activities, then **write the findings in Chinese** as required by the source.

Outcome:
- complete B1L14-F002.

## Unit 42 review

Reserved lesson ID: `u42-review`

Requirements:
- at least 18 useful activities;
- at least 3 listening tasks;
- direct independent retrieval of all 11 NEW formal lexical targets;
- handwriting retrieval for all 8 NEW characters;
- assess the 會不會 / 常不常 support bridge after explanation;
- meaningful season/weather transfer, not only copied dialogue lines;
- review B1L14-D1T01–D1T05 functions;
- no deferred proper-name glyph in an answer requirement.

## Unit 42 source/support routing

Owned:
- B1L14-D1T01–D1T05
- B1L14-V001–V005, V010, V012, V017, V019, V023, V032
- B1L14-F002
- B1L14-A001, A005
- B1L14-X020
- B1L14-P003 review

Reviewed support:
- B1L14-X018, X021, X024, X031, X016

Prepared but not completed:
- B1L14-F001
- B1L14-A004

Deferral constraints:
- 玉山 remains contextual/glossed;
- 美國 remains contextual/glossed;
- speaker-name glyphs are not productive targets.

---

# 4. Unit 43 blueprint — How Long and What's About to Happen

## Identity

Working title: **How Long and What's About to Happen**

Primary goal:
- distinguish a finished duration from duration accumulated to now;
- talk about missing home and return plans;
- describe something that is about to happen.

Approximate load:
- 7 NEW formal lexical entries
- 3 lexical EXPANSION targets
- 6 NEW characters
- 3 formal grammar targets, one of which is an integration/expansion
- high grammar / moderate lexical load

## New vocabulary

Formal NEW:
- B1L14-V007 新年 xīnnián
- B1L14-V009 父母 fùmǔ
- B1L14-V011 明年 míngnián
- B1L14-V013 紅葉 hóngyè
- B1L14-V014 只 zhǐ
- B1L14-V018 十二月底 shí'èr yuè dǐ
- B1L14-V031 停 tíng

Lexical EXPANSION:
- B1L14-V006 想 xiǎng — miss
- B1L14-V008 快 kuài — soon
- B1L14-V022 要 yào — will / going to in the source imminence system

No duplicate vocabulary ownership is created for 想 / 快 / 要.

## New characters

- 只
- 父
- 母
- 停
- 底
- 葉

## Formal grammar

### `u43-completed-duration` — B1L14-G001

Required teaching:
- verbal 了 + duration = duration of a completed activity;
- preserve transitive-object verb repetition;
- preserve fronted-object/location alternative;
- questions with 多久 / 幾個月 / 幾個鐘頭;
- source confirmation support with 吧 / 對不對;
- review 一共.

Prior ownership must be acknowledged:
- basic duration from Unit 27;
- object-repeat duration from Unit 28;
- verbal completed 了 from Unit 39.

This is an **integration/expansion**, not a duplicate invention.

### `u43-duration-to-now` — B1L14-G002

Required teaching:
- double-了 duration accumulated through now;
- action may or may not continue;
- direct contrast with G001;
- 多久了 / 已經 support.

G001 must precede G002.

### `u43-imminent` — B1L14-G003

Required teaching:
- 快…了 / 要…了 / 快要…了;
- imminence/change, not generic future;
- Taiwan source preference for 快要;
- explicit time word + 快要 restriction;
- infer from contextual evidence.

## Planned six teaching lessons

### U43-L1 — A Finished Stay
Reserved lesson ID: `u43-finished-duration`

Targets:
- 只
- `u43-completed-duration`
- character 只

Outcome:
- state how long a completed stay/activity lasted;
- preserve verb repetition where required.

Source:
- B1L14-D1T06
- B1L14-G001 / DR001
- B1L14-X002, X033, X034

Support prerequisite:
- B1L14-X034 對不對 is an EXPANSION, not assumed-known support. Briefly explain its transparent confirmation use before any DR001 prompt or assessment that uses it.

Adaptation:
- source 紐約 / 臺北 examples may be replaced or glossed so no deferred glyph becomes assessed.

### U43-L2 — How Long Up to Now?
Reserved lesson ID: `u43-duration-now`

Targets:
- 想 “miss”
- `u43-duration-to-now`

Support:
- 已經 / 還沒有
- duration + 多 transfer

Outcome:
- distinguish “I stayed for X” from “I have been staying for X”;
- understand and use 想家.

Source:
- B1L14-D1T07
- B1L14-G002 / DR002
- B1L14-X025, X030

Transfer:
- complete B1L14-A002 here, after both G001 and G002 have been taught: ask where a person/classmate lived and for how long, record the result, and report it. Use learner-safe place labels/substitutions so the duration contrast is assessed without deferred glyphs.

### U43-L3 — New Year Is Almost Here
Reserved lesson ID: `u43-new-year`

Targets:
- 新年
- 父母
- characters 父、母
- 快 “soon” expansion
- 要 auxiliary expansion
- `u43-imminent`

Required prerequisite order:
- teach the Lesson-14 快 and 要 expansions first;
- then explain `u43-imminent`;
- only then assess source-style imminence such as 新年快到了.

Outcome:
- understand and produce 新年快到了 only after the imminence pattern has been explained;
- connect a coming holiday with returning to see parents;
- distinguish imminent 快／要／快要…了 from generic future.

Required source constraints:
- Taiwan source preference for 快要;
- explicit time word + 快要 restriction;
- contextual evidence rather than generic future.

Source:
- B1L14-D1T08
- B1L14-V007–V009, V022
- B1L14-G003 / DR003
- B1L14-P006
- B1L14-X003, X004
- deferred X005 adapted out

### U43-L4 — The Rain Is About to Stop
Reserved lesson ID: `u43-stopping`

Targets:
- 停
- character 停

Review:
- `u43-imminent`
- Unit-42 rain/weather vocabulary

Outcome:
- retrieve imminence with safe weather-change examples such as 雨快要停了;
- learn 停 before it appears in Dialogue II.

Source:
- B1L14-V031

Do not use B1L14-D2T03 productively here because 颱風 is not taught until Unit 44.

### U43-L5 — The End of December
Reserved lesson ID: `u43-return-plan`

Targets:
- 十二月底
- character 底

Review:
- 打算
- 因為…所以…
- dates and return language

Outcome:
- state an end-of-month return plan and reason.

Source:
- B1L14-D1T09, D1T11
- B1L14-V018
- B1L14-X028

### U43-L6 — Next Year and Autumn Leaves
Reserved lesson ID: `u43-next-year`

Targets:
- 明年
- 紅葉
- character 葉

Transfer:
- integrate B1L14-D1T10;
- close Dialogue I;
- complete B1L14-F004.

Source:
- B1L14-D1T10
- B1L14-V011, V013

## Unit 43 review

Reserved lesson ID: `u43-review`

Requirements:
- at least 18 useful activities;
- at least 3 listening tasks;
- independent retrieval of all 7 NEW lexical targets;
- explicit assessment of all three expansion senses/forms;
- independent assessment of G001, G002 and G003;
- at least one direct G001 vs G002 contrast;
- handwriting retrieval for all 6 NEW characters;
- at least one transfer item requiring verb repetition for completed duration;
- at least one imminence item checking the explicit-time restriction;
- B1L14-A002-style experience transfer.

## Unit 43 source/support routing

Owned:
- B1L14-D1T06–D1T11
- B1L14-V006–V009, V011, V013, V014, V018, V022, V031
- B1L14-G001–G003
- B1L14-P006
- B1L14-DR001–DR003
- B1L14-A002
- B1L14-F004

Reviewed/expanded support:
- B1L14-X002–X005
- B1L14-X025, X026, X028, X030, X033, X034

Deferral/adaptation:
- 紐約 / 美國 / country/place support remain contextual;
- 漂亮 in D1T06 is not assessed; adapted learner practice uses known 好看 or a gloss;
- 妳 normalizes to 你 in learner-facing material.

---

# 5. Unit 44 blueprint — Typhoons and Comparisons

## Identity

Working title: **Typhoons and Comparisons**

Primary goal:
- understand and discuss a typhoon episode;
- give caution;
- say one condition is even more X;
- say one condition is not as X as another;
- integrate the complete Lesson-14 outcome set.

Approximate load:
- 12 NEW formal lexical entries
- 7 NEW formal characters
- 2 formal grammar targets
- one source-attested reduplication expansion
- culture + cumulative capstone
- high but coherent load within lexical pacing target

## New vocabulary

- B1L14-V020 傘 sǎn
- B1L14-V021 颱風 táifēng
- B1L14-V024 濕 shī
- B1L14-V025 討厭 tǎoyàn
- B1L14-V026 新聞 xīnwén
- B1L14-V027 更 gèng
- B1L14-V028 大家 dàjiā
- B1L14-V029 小心 xiǎoxīn
- B1L14-V030 可怕 kěpà
- B1L14-V033 這次 zhè cì
- B1L14-V034 上次 shàng cì
- B1L14-V035 慢走 màn zǒu

## New characters

- 傘
- 颱
- 濕
- 討
- 厭
- 聞
- 更

## Formal grammar

### `u44-even-more` — B1L14-G004

Required teaching:
- 更 = “even more” relative to an established/understood baseline;
- 更 before a state verb;
- standalone baseline idea from 星期天我更忙;
- formal Lesson-14 use in 比…更…;
- source-style 是不是 confirmation question.

Do not reduce 更 to ordinary “more.”

### `u44-not-as` — B1L14-G005

Required teaching:
- A 沒有 B 那麼／這麼 + State Verb;
- normally negative;
- 那麼/這麼 may be omitted;
- positive A 有 B 那麼/這麼 + State Verb rare except source-described 嗎 questions;
- 有沒有 question behavior;
- source baseline implication;
- explicit three-way comparison:
  - 跟…一樣
  - 沒有…那麼
  - 比

Do not collapse this into Unit-25 不比.

## Planned six teaching lessons

### U44-L1 — Where's Your Umbrella?
Reserved lesson ID: `u44-umbrella`

Targets:
- 傘
- character 傘

Review:
- B1L14-X022 V 得 + degree
- completed-action 了

Source:
- B1L14-D2T01–D2T02
- B1L14-V020

Constraint:
- 呢 in D2T01 remains comprehension-only under B1L14-P004.

### U44-L2 — A Typhoon Is Coming
Reserved lesson ID: `u44-typhoon`

Targets:
- 颱風
- character 颱

Review:
- Unit-43 imminence
- weather vocabulary from Unit 42

Culture:
- introduce B1L14-CUL001 as **textbook-era Taiwanese typhoon-day culture**;
- preserve the reading's historical content at an appropriate learner level: the source-era wind/gust thresholds, the four-hour forecast window, school/work suspension, and the described shift from central-personnel-agency to regional-government decision making;
- then-current URLs/phone details may be summarized as dated source material rather than reproduced as live guidance;
- do not present the textbook's old administrative thresholds/agencies/contact information as current 2026 guidance unless separately verified at release time;
- the culture explanation must use English or already-known Chinese where necessary so it cannot introduce hidden vocabulary/character prerequisites.

Source:
- B1L14-D2T03–D2T05 partial
- B1L14-V021
- B1L14-CUL001

### U44-L3 — Wet and Annoying
Reserved lesson ID: `u44-wet`

Targets:
- 濕
- 討厭
- characters 濕、討、厭
- B1L14-X029 濕濕的 expansion

Required explanation:
- teach B1L14-V024 濕 before exposing or assessing 濕濕的;
- Unit 30 taught a restricted reduplication set;
- Lesson 14 explicitly licenses 濕濕的;
- this is a source-attested extension, not permission to double every state verb.

Source:
- B1L14-D2T05–D2T06
- B1L14-V024–V025
- B1L14-X023, X029, X031 review/expansion

### U44-L4 — News and Take Care
Reserved lesson ID: `u44-news`

Targets:
- 新聞
- 大家
- 小心
- character 聞

Review:
- question-word + 都
- 多 + Verb

Required prerequisite order:
- 大家 and 小心 taught before 請大家多小心;
- `u40-more-less-verb` explicitly retrieved before productive 多小心.

Source:
- B1L14-D2T04–D2T06
- the caution clause 請大家多小心 from B1L14-D2T07, without exposing its comparison clause before G004
- B1L14-V026, V028, V029
- B1L14-X032 caution branch

### U44-L5 — This Time Is Even Bigger
Reserved lesson ID: `u44-even-more`

Targets:
- 這次
- 上次
- 更
- character 更
- `u44-even-more`
- B1L14-P001

Required prerequisite order:
- teach 更 with its “even more” baseline meaning and B1L14-P001 first;
- then teach `u44-even-more`;
- only then present or assess the full B1L14-D2T07 comparison clause.

Source:
- the full B1L14-D2T07, now that G004 is taught
- B1L14-V027, V033, V034
- B1L14-G004 / DR004
- B1L14-X006–X009, X017, X018, X035 as safe/review comparison support

Deferred source-example nouns are replaced or glossed, not productively assessed.

### U44-L6 — Not as Scary — Take Care
Reserved lesson ID: `u44-not-as`

Targets:
- 可怕
- 慢走
- `u44-not-as`
- B1L14-P002
- B1L14-P005

Required prerequisite order:
- teach `u44-not-as` before productive B1L14-D2T08;
- teach 慢走 before the conventional 小心慢走 formula is assessed.

Outcome:
- say a typhoon/event is not as scary as another;
- use 小心慢走 as a conventional leave-taking/care expression.

Source:
- B1L14-D2T08–D2T11
- B1L14-V030, V035
- B1L14-G005 / DR005
- B1L14-X010–X013, X019, X032, X036, X037

## Unit 44 review + Lesson-14 capstone

Reserved lesson ID: `u44-review`

Requirements:
- at least 20 useful activities because this is also the Lesson-14 capstone;
- at least 3 listening tasks;
- direct independent retrieval of all 12 NEW formal lexical targets;
- independent assessment of G004 and G005;
- cumulative comparison mixing across 比 / 比較 / 更 / 跟…一樣 / 沒有…那麼;
- handwriting retrieval for all 7 NEW characters;
- retrieve Unit-43 imminence through typhoon/weather context;
- retrieve Unit-42 seasons/weather;
- cover B1L14-A003 with equal and unequal seasonal-temperature comparisons across last year/this year using the complete comparison toolkit;
- cover B1L14-A004 across all four seasons plus typhoon, rain-frequency and snow questions; require asking for additional information and recording results in the comparison chart;
- sample all four B1L14-F outcomes;
- map B1L14-S001–S004 to explicit capstone checks.

### B1L14-A003 temperature handling

The dependency ledger explicitly allows redesign instead of teaching support character 度.

Locked architecture decision:
- display temperatures as numeric values with **°C**;
- preserve the source activity's location as Latin-script **Taipei** rather than introducing untaught 北;
- do not require the learner to read/write 度;
- preserve the actual comparison task and all required comparison structures;
- do not add 度 to vocabulary, Search, Mega, or handwriting;
- if a later activity specification wants assessed 度, that is an upstream architecture change and must reopen Gate A.

## Unit 44 source/support routing

Owned:
- B1L14-D2T01–D2T11
- B1L14-V020–V021, V024–V030, V033–V035
- B1L14-G004–G005
- B1L14-P001, P002, P005
- B1L14-DR004–DR005
- B1L14-A003–A004
- B1L14-CUL001
- completion of B1L14-F001 and B1L14-F003
- B1L14-S001–S004 capstone retrieval

Support:
- B1L14-X006–X013, X015, X017–X019, X022–X023, X027, X029, X031–X032, X035–X037

Deferral/adaptation:
- P004 / the D2T01 呢 occurrence remains comprehension-only;
- untaught support glyphs are replaced/glossed according to the dependency ledger;
- X015 度 uses the °C redesign.

---

# 6. Character ownership

## Unit 42
冷、滑、雪、春、冬、夏、秋、雨

## Unit 43
只、父、母、停、底、葉

## Unit 44
傘、颱、濕、討、厭、聞、更

Total: **21 / 21 non-deferred formal NEW characters**.

These are the frozen **learner-facing first-introduction orders**, aligned with the six-lesson sequence. Canonical B1L14-CH source IDs retain their original source-ledger order; ownership is unchanged.

Deferred proper-name characters:
- 玉
- 紐
- 約

They remain outside handwriting ownership.

No hidden support glyph may be added to `newCharacters` without reopening the relevant upstream decision.

---

# 7. Formal lexical ownership and Search/Mega policy

## Chronological NEW ownership

All 30 non-deferred formal NEW lexical entries receive exactly one first-teaching unit:
- Unit 42: 11
- Unit 43: 7
- Unit 44: 12

Each receives exactly one canonical first-teaching row at its owning lesson. Under the current product behavior, Pinyin Search is a global canonical lookup rather than a progress-gated assessment, while Mega Challenge eligibility is gated by the canonical row's lesson completion. No second ownership row may be created.

## Expansion forms

- 想
- 快
- 要

remain earlier vocabulary ownerships. Lesson 14 teaches new senses/functions without creating duplicate NEW rows.

Activity engineering must still assess:
- 想 = miss;
- 快 = soon;
- 要 = future/imminence auxiliary.

Do **not** broaden the existing pre-Unit-43 canonical glosses for 想 / 快 / 要 during Lesson-14 implementation. Their canonical rows are owned by earlier lessons, so broadening those rows would expose the Lesson-14 senses before Unit 43 and would also change Mega prompts for already-learned entries. Under the current form-level Search/Mega model, the Lesson-14 senses therefore receive **no second Search/Mega ownership** and no duplicate row; their required sense-specific retrieval lives in Unit 43 teaching/review and the Lesson-14 capstone. A future product feature for progress-gated sense metadata would be a separate architecture change, not part of this Gate-A freeze.

## Formal Names

- 玉山
- 紐約

are source-covered contextual Names, not canonical Search/Mega targets.

## Support-only items

Do not promote source drill support to Search/Mega just because it appears in examples. In particular:
- 度 remains non-canonical under the °C redesign;
- contextual countries/places remain support;
- adapted source-example words do not acquire ownership.

---

# 8. Explicit deferrals and adaptations

These are curriculum decisions, not source deletions.

1. **玉山 / 紐約** — preserve source context by English/pinyin/glossed name; if 玉山 is shown contextually, preserve the source identification of Yushan/Mount Jade as the tallest mountain in central Taiwan; no productive Hanzi assessment.
2. **妳** — learner-facing normalization to 你; source artifact preserves 妳.
3. **speaker/proper-name glyphs 華 / 安 / etc.** — romanized/generic speaker labels or glossed context.
4. **漂亮** — source-turn meaning preserved, but productive practice uses known 好看 or a gloss because 漂/亮 are untaught.
5. **臺北 / 臺南 / 法國 / 日本 / 美國 / 西班牙 / 上海 / 花蓮** — use known-place substitutions or contextual labels unless all required characters are already safe; no new lexical ownership.
6. **飛機票 / 故宮 / 烏龍茶** — replace/gloss in drills to avoid untaught 飛/故/宮/烏/龍.
7. **呢 in D2T01** — comprehension-only; no new rule or productive assessment.
8. **度** — source temperature capability preserved with °C; no character ownership.
9. **typhoon-day administrative specifics** — taught as textbook-era culture only unless current facts are separately verified.

No deferral removes a formal Lesson-14 grammar system or communicative outcome.

---

# 9. Review and learner-quality contract

For every unit:
- six teaching lessons + one review;
- explain before assessment;
- every NEW formal lexical item gets independent review retrieval;
- all assigned grammar targets are independently assessed;
- at least 18 review activities;
- at least 3 review listening activities;
- handwriting retrieval for every NEW character;
- ordering tokens preserve exact multiplicity;
- every select/listen question has exactly one defensible answer;
- no untaught/deferred glyph in a required answer;
- Traditional Chinese, Taiwan usage, and tone-marked pinyin throughout.

Delayed/cumulative retrieval:
- Unit 43 review retrieves weather/seasons from Unit 42.
- Unit 44 review retrieves duration/imminence from Unit 43 and weather/seasons from Unit 42.
- Unit 44 capstone explicitly mixes all four lesson outcomes.

---

# 10. Gate-A traceability summary

## Formal lexical source
- B1L14-V001–V035: all have a unit or explicit contextual-name deferral.

## Grammar
- B1L14-G001–G005: all assigned to Unit 43 or 44 with prerequisite order fixed.

## Pragmatics
- P001/P002/P005/P006: explicitly taught with owning grammar/phrase.
- P003: prior inferential-吧 review in Unit 42.
- P004: dialogue comprehension only, no unsupported rule.

## Support
- B1L14-X001–X037: routed to review, explicit expansion, safe substitution/gloss, or the locked °C redesign.

## Dialogue
- all 22 turns assigned:
  - D1T01–05 → Unit 42
  - D1T06–11 → Unit 43
  - D2T01–11 → Unit 44

## Drill families
- DR001–DR003 → Unit 43
- DR004–DR005 → Unit 44

## Activities
- A001, A005 → Unit 42
- A002 → Unit 43
- A003, A004 → Unit 44

## Culture
- CUL001 → Unit 44

## Outcomes/self-assessment
- F001–F004 all completed by Unit 44;
- S001–S004 explicitly retrieved in Unit-44 capstone.

## Characters
- 21 / 21 non-deferred NEW formal characters assigned exactly once;
- 3 deferred proper-name characters remain non-productive.

---

# 11. Gate-A freeze status

Architecture design passes 1–3: **complete**.

Curriculum audits:
1. source fidelity — recorded PASS;
2. pedagogy — recorded PASS;
3. fresh-context adversarial architecture — **PASS after the repairs frozen in this file**.

Final Gate-A condition:
- source gate PASS;
- dependency gate PASS;
- curriculum audits PASS;
- open BLOCKER: 0;
- open MAJOR: 0.

**Gate A: PASS. This file is the frozen blueprint.**

The controller may advance to **activity-engineering**. No learner-facing Unit 42 implementation is authorized until Gate B passes.
