# Book 1 Lesson 14 — Candidate Activity Specification

Status: **Gate-B candidate, not frozen yet**.

Upstream:
- source gate: PASS
- dependency gate: PASS
- Gate A / curriculum: PASS
- frozen curriculum blueprint: `course/book1/lesson14-curriculum-blueprint.md`

Normative activity-spec packet:
- this file;
- `course/book1/lesson14-unit42-activity-spec.md`;
- `course/book1/lesson14-unit43-activity-spec.md`;
- `course/book1/lesson14-unit44-activity-spec.md`.

No learner-facing TypeScript, strokes, manifest entries, or generated curriculum files may be authored until Gate B passes.

## 1. Activity-engineering rules

For each important target the implementation must preserve:

**EXPLAIN → RECOGNIZE → CONTROLLED PRACTICE → CONTEXTUAL USE → RETRIEVAL → DELAYED RETRIEVAL → CUMULATIVE MIXING**

New characters additionally require:
- recognition;
- guided tracing/building;
- handwriting completion;
- contextual reading;
- later handwriting retrieval.

Question correctness contract:
- exactly one defensible keyed answer;
- no assessment before the required explanation;
- no untaught/deferred Hanzi in a required answer;
- Traditional Chinese only;
- Taiwan-appropriate usage;
- tone-marked pinyin on phrase/grammar records;
- order-token multiplicity must exactly reconstruct the phrase;
- no distractor may accidentally be an equally valid answer under the prompt.

## 2. Unit files and stable lesson IDs

### Unit 42 — Weather and the Four Seasons
- `u42-weather`
- `u42-snow`
- `u42-spring-winter`
- `u42-summer-autumn`
- `u42-rain`
- `u42-seasons`
- `u42-review`

### Unit 43 — How Long and What's About to Happen
- `u43-finished-duration`
- `u43-duration-now`
- `u43-new-year`
- `u43-stopping`
- `u43-return-plan`
- `u43-next-year`
- `u43-review`

### Unit 44 — Typhoons and Comparisons
- `u44-umbrella`
- `u44-typhoon`
- `u44-wet`
- `u44-news`
- `u44-even-more`
- `u44-not-as`
- `u44-review`

Every unit retains six teaching lessons plus one review.

## 3. Canonical NEW vocabulary ownership

These exact forms receive one canonical first-teaching row and normal Search/Mega eligibility after their owning lesson.

### Unit 42
| Text | Pinyin | Meaning | Lesson |
|---|---|---|---|
| 天氣 | tiānqì | weather | u42-weather |
| 冷 | lěng | cold | u42-weather |
| 風 | fēng | wind | u42-weather |
| 滑雪 | huáxuě | to ski | u42-snow |
| 下雪 | xiàxuě | to snow | u42-snow |
| 春天 | chūntiān | spring | u42-spring-winter |
| 冬天 | dōngtiān | winter | u42-spring-winter |
| 夏天 | xiàtiān | summer | u42-summer-autumn |
| 秋天 | qiūntiān | autumn | u42-summer-autumn |
| 雨 | yǔ | rain | u42-rain |
| 下雨 | xiàyǔ | to rain | u42-rain |

### Unit 43
| Text | Pinyin | Meaning | Lesson |
|---|---|---|---|
| 只 | zhǐ | only; merely | u43-finished-duration |
| 新年 | xīnnián | New Year | u43-new-year |
| 父母 | fùmǔ | parents | u43-new-year |
| 停 | tíng | to stop | u43-stopping |
| 十二月底 | shí'èr yuè dǐ | the end of December | u43-return-plan |
| 明年 | míngnián | next year | u43-next-year |
| 紅葉 | hóngyè | red maple leaves | u43-next-year |

### Unit 44
| Text | Pinyin | Meaning | Lesson |
|---|---|---|---|
| 傘 | sǎn | umbrella | u44-umbrella |
| 颱風 | táifēng | typhoon | u44-typhoon |
| 濕 | shī | wet | u44-wet |
| 討厭 | tǎoyàn | annoying | u44-wet |
| 新聞 | xīnwén | news | u44-news |
| 大家 | dàjiā | everyone | u44-news |
| 小心 | xiǎoxīn | be careful; take care | u44-news |
| 這次 | zhè cì | this time | u44-even-more |
| 上次 | shàng cì | last time | u44-even-more |
| 更 | gèng | even more / even less | u44-even-more |
| 可怕 | kěpà | scary | u44-not-as |
| 慢走 | màn zǒu | Take care / Bye | u44-not-as |

Total canonical NEW: **30**.

## 4. Expansion forms — no duplicate Search/Mega ownership

The exact forms 想 / 快 / 要 remain owned by earlier units.

Lesson-14 sense-specific teaching:
- 想 = “miss (someone/home)” → u43-duration-now
- 快 = “soon / about to” → u43-new-year
- 要 = future/imminence auxiliary “will / going to” → u43-new-year

Rules:
- do not add second `newVocabulary` rows;
- do not broaden earlier canonical glosses;
- include 想 / 快 / 要 in Unit-43 `reviewVocabulary`;
- assess the Lesson-14 senses only through Unit-43 teaching/review and Unit-44 cumulative review;
- Search/Mega continue using their earlier canonical rows under the current product model.

## 5. New-character ownership and first-introduction order

### Unit 42
冷、滑、雪、春、冬、夏、秋、雨

### Unit 43
只、父、母、停、底、葉

### Unit 44
傘、颱、濕、討、厭、聞、更

Each character receives its standard lesson-local:
`intro → trace → build → complete → memory`
cycle before any independent question requiring that character.

Every review contains a `complete` handwriting retrieval for every NEW character in that unit.

Deferred 玉 / 紐 / 約 and hidden support glyphs never become handwriting targets.

## 6. Formal grammar ownership

New grammar records:
- `u43-completed-duration` — B1L14-G001
- `u43-duration-to-now` — B1L14-G002
- `u43-imminent` — B1L14-G003
- `u44-even-more` — B1L14-G004
- `u44-not-as` — B1L14-G005

Support bridges that are **not** extra formal grammar ownership:
- Unit 42: 會不會 / 常不常 weather-question transfer;
- Unit 43: 對不對 confirmation bridge;
- Unit 44: source-attested 濕濕的 extension.

## 7. Locked prerequisite sequence

Activity order must preserve the Gate-A edges exactly.

Unit 42:
- 下雪 and 雨/下雨 are taught before 會不會下雪 / 常不常下雨 production.

Unit 43:
- G001 before G002;
- the 對不對 explanation before any assessed 對不對 item;
- 快/要 Lesson-14 senses before G003;
- G003 before assessed 新年快到了;
- 停 after G003 so it can retrieve imminence safely.

Unit 44:
- 濕 before 濕濕的;
- 大家 + 小心 + prior 多+Verb before 請大家多小心;
- 更 baseline explanation before G004;
- G004 before full D2T07;
- G005 before D2T08;
- 慢走 before assessed 小心慢走.

## 8. Dialogue coverage contract

All 22 source turns remain represented by exact source wording where safe or by the Gate-A-approved adaptation when a source form is deferred.

- D1T01 is split: weather/comparison clause in u42-weather; 會不會下雪 is delayed to u42-rain.
- D1T02 omits productive 玉山 / 美國; the weather/inferential-吧 functions remain.
- D1T03–D1T05 are represented in Units 42 lessons 2–3.
- D1T06 uses a learner-safe trip adaptation with 好看 instead of untaught 漂亮 and no productive 紐約.
- D1T07–D1T08 are represented after G002/G003 teaching.
- D1T09 omits productive 美國 but keeps the return plan.
- D1T10 normalizes 妳→你 and retains winter/next-year/autumn-leaf functions.
- D1T11 is retained with known date/reason language.
- D2T01 normalizes 妳→你; 呢 remains comprehension-only.
- D2T02–D2T06 are represented after prerequisites.
- D2T07 full comparison waits until G004.
- D2T08 waits until G005.
- D2T09 uses pre-taught 停.
- D2T10–D2T11 close the episode; 慢走 is taught as a conventional formula.

## 9. Source transfer/capstone contract

Unit 42:
- A001: home-country climate; most/least preferred seasons; reasons.
- A005: Taiwan summer weather, distinctive features, fruit, common activities, plus an explicit instruction to write findings in Chinese outside the app.

Unit 43:
- A002: ask where/how long, record result, report it; the app uses learner-safe place labels.

Unit 44:
- A003: compare Taipei seasonal temperatures with numeric °C; no productive 度 or 北.
- A004: all four seasons + typhoon/rain/snow questions, additional-information request, and record-results instruction.
- CUL001: textbook-era typhoon-day content, clearly historical/source-framed.
- final capstone retrieves F/S001–004.

## 10. Review floors

Unit 42 review:
- ≥18 steps;
- ≥3 listening;
- all 11 NEW forms independently retrieved;
- all 8 NEW characters handwriting-retrieved;
- weather-question bridge assessed.

Unit 43 review:
- ≥18 steps;
- ≥3 listening;
- all 7 NEW forms independently retrieved;
- 想 / 快 / 要 Lesson-14 senses explicitly retrieved;
- G001/G002/G003 independently assessed;
- direct G001 vs G002 contrast;
- verb-repetition item;
- explicit-time 快要 restriction item;
- all 6 NEW characters handwriting-retrieved;
- delayed Unit-42 weather retrieval.

Unit 44 review:
- ≥20 steps;
- ≥3 listening;
- all 12 NEW forms independently retrieved;
- G004/G005 independently assessed;
- all 7 NEW characters handwriting-retrieved;
- cumulative 比 / 比較 / 更 / 跟…一樣 / 沒有…那麼 mixing;
- delayed Unit-42 and Unit-43 retrieval;
- A003/A004 transfer;
- explicit F/S001–004 capstone checks.

## 11. Gate-B status

This packet is the activity-engineering candidate.

Before it may be frozen:
1. Activity Audit 1 — teaching quality must PASS.
2. A **fresh-context** Activity Audit 2 — question correctness/adversarial audit must PASS.
3. Activity Audit 3 — cross-unit coherence must PASS.
4. Open BLOCKER = 0.
5. Open MAJOR = 0.

Until then:
- `completion.json.artifacts.frozenActivitySpec` remains null;
- implementation remains locked.
