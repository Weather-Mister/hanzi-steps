# Book 1 Lesson 15 — Activity Audit 1: Teaching Quality

Audited packet:
- `course/book1/lesson15-activity-spec.md`
- `course/book1/lesson15-unit45-activity-spec.md`
- `course/book1/lesson15-unit46-activity-spec.md`
- `course/book1/lesson15-unit47-activity-spec.md`
- `course/book1/lesson15-unit48-activity-spec.md`

Upstream frozen curriculum:
- `course/book1/lesson15-curriculum-blueprint.md` — Gate A PASS / frozen.

Baseline: a strict learner who has completed production Book 1 through Unit 44.

Scope: **Activity Audit 1 — Teaching Quality only.** This audit asks whether the engineered sequence actually teaches every important Lesson-15 NEW / EXPANSION target before assessment and carries it through the required learning lifecycle. It checks explain-before-test, character sequencing, dialogue/activity timing, grammar/support restrictions, delayed retrieval, cumulative mixing, Search/Mega ownership, deferred-glyph safety, and standalone handwriting locks. It does **not** perform Activity Audit 2 question-correctness/adversarial review or Activity Audit 3 cross-unit coherence.

Final repaired normative blob set:
- `lesson15-activity-spec.md` — `025b17bf8c970d9904dc2d88ca44bbf98285b3d9`
- `lesson15-unit45-activity-spec.md` — `3674ada69a06125fe74e84d3fd1ea8ee1a91b25a`
- `lesson15-unit46-activity-spec.md` — `a36468aee9cdcba43db40f6230d7b1d8ddf9547b`
- `lesson15-unit47-activity-spec.md` — `7440c2e7b4ac6ec91e24565b837979fffca03026`
- `lesson15-unit48-activity-spec.md` — `12f9acf0419a02b64312f08c5dd69b3dfb04c223`

## Findings found and repaired before final verdict

### MAJOR — ACT15-TQ-001 — exact NEW words were sometimes first semantically taught by answer feedback

**Blast radius: CROSS_UNIT**

The initial Stage-4 candidate correctly taught NEW character form before character assessment, but a number of exact NEW lexical items with known or partly known glyphs had no meaning-first learner-facing explanation before their first “X means…” select. The select explanation would therefore have become the first semantic teaching exposure, which violates explain-before-test for a strict Unit-44 learner.

Affected first-assessment paths included:
- Unit 45:
  - `u45-doctor-s1` — 醫生;
  - `u45-runny-s1`–`u45-runny-s3` — 一直 / 流 / 鼻水;
  - `u45-head-s1`–`u45-head-s3` — 頭 / 痛 / 胃口;
  - `u45-throat-s1`–`u45-throat-s2` — 喉嚨 / 發炎;
  - `u45-sick-s1`–`u45-sick-s2` — 生病 / 發燒.
- Unit 46:
  - `u46-cold-s1` — 感冒;
  - `u46-med-s1`–`u46-med-s3` — 藥 / 藥局 / 拿;
  - `u46-ba-v1` and the G002 path — 別 / 把;
  - `u46-rec-s1`–`u46-rec-s4` — 水 / 休息 / 睡覺 / 早一點.
- Unit 47:
  - `u47-what-s1`–`u47-what-s3` — 怎麼了 / 臉色 / 難看;
  - `u47-stomach-s1`–`u47-stomach-s3` — 肚子 / 吐 / 次;
  - `u47-acc-s1`–`u47-acc-s2` — 陪 / 看病;
  - `u47-health-s2`–`u47-health-s4` — 健康 / 保險 / 健康中心.
- Unit 48:
  - `u48-advice-v1`–`u48-advice-v5` — 回家 / 油 / 冰 / 關心 / 最好.

**Smallest safe repair:** add grouped, learner-facing meaning-first lexical EXPLAIN cards inside the owning lessons, after any required NEW-character lifecycle and before the first semantic select:
- Unit 45: `u45-doctor-lex`, `u45-runny-lex`, `u45-head-lex`, `u45-throat-lex`, `u45-sick-lex`;
- Unit 46: `u46-cold-lex`, `u46-medicine-lex`, `u46-ba-lex`, `u46-recover-lex`;
- Unit 47: `u47-what-lex`, `u47-stomach-lex`, `u47-accompany-lex`, `u47-health-lex`;
- Unit 48: `u48-advice-lex-a`, then the full 冰 character lifecycle, then `u48-advice-lex-b` before the first assessed 冰 / 關心 / 最好 item.

This repair does not change lexical ownership, unit boundaries, lesson ownership, source classification, or Gate-A prerequisite topology.

**Re-audit:** resolved.

### MAJOR — ACT15-TQ-002 — several earlier targets did not receive genuine positive delayed retrieval later in Lesson 15

**Blast radius: CROSS_UNIT**

The initial candidate had strong unit reviews and some cumulative reuse, but several earlier targets disappeared after their owning unit or survived only as distractors. That is insufficient for the required per-target DELAYED RETRIEVAL stage.

Materially affected targets included:
- Unit 45: 醫生 and 發炎 lacked a later positive retrieval check;
- Unit 46: 感冒 and 拿 lacked a later positive retrieval check;
- Unit 47: 難看, 陪, 保險, 健康中心 lacked later positive retrieval;
- important Unit-47 support expansions X010 `對 + person + 很客氣` and X011 `V + 就好了` lacked a later retrieval check.

**Smallest safe repair:** add six positive cumulative items to the Unit-48 review:
- `u48-review-cum7` — 醫生 + 喉嚨有一點發炎;
- `u48-review-cum8` — 感冒 + 去藥局拿藥;
- `u48-review-cum9` — 臉色很難看;
- `u48-review-cum10` — 我陪你去看病;
- `u48-review-cum11` — 健康保險 / 健康中心;
- `u48-review-cum12` — delayed X010 / X011 meaning retrieval.

The Unit-48 review/capstone therefore rises from 52 to **58** steps. The added items are targeted retrieval, not filler, and do not change curriculum ownership.

**Re-audit:** resolved.

### MAJOR — ACT15-TQ-003 — A002 instructional labels could expose deferred 拒 / 絕 as reading prerequisites

**Blast radius: ACTIVITY**

The initial Unit-48 A002 contract wrote the source role labels `同意建議` / `拒絕建議` directly into the learner-facing prompt specification. The frozen dependency/blueprint policy explicitly defers 拒 / 絕 and requires the accept/reject role to be expressed in learner-safe instructions rather than becoming a hidden character prerequisite.

**Smallest safe repair:** retain all three exact source illustrations and their role semantics, but render learner instructions as **accept the suggestion** for prompts 1–2 and **politely reject the suggestion** for prompt 3. The original Chinese role labels may remain only as inert source metadata or visibly glossed source material; the learner is never required to read, select, type, or handwrite 拒 / 絕.

The two acceptance prompts, one rejection prompt, exact source visuals, response endings, and Task 2 remain unchanged in source function.

**Re-audit:** resolved.

---

# Final lifecycle audit

## Unit 45 — Symptoms and Feeling Sick

### NEW vocabulary and X002/X004
All 12 canonical NEW words now have:
- meaning-first EXPLAIN;
- recognition/select practice;
- contextual use in D1T01–D1T05 only after dependencies are available;
- independent retrieval in `u45-review-v1`–`u45-review-v12`;
- later positive reuse/retrieval across Units 46–48;
- cumulative Unit-48 health/symptom mixing.

Specific safeguards:
- 差 is explicitly taught as **chā** before pronunciation assessment.
- X002 哪裡不舒服 is explicitly explained as a health-condition inquiry before selection/listening/order use.
- X004 大概多久了 / 已經…天了 is explained before duration questions and full dialogue integration.
- `什麼東西都不想吃` is explicitly marked as Unit-40 question-word + 都 totality; G001 is not taught early.
- 生病 / 發炎 / 發燒 remain lexical; no Unit-48 G007 insertion behavior is inferred or assessed here.
- D1T01–D1T05 use generic role labels / 你, so 白 / 妳 / 玉 never become productive prerequisites.

**PASS.**

## Unit 46 — Diagnosis, Medicine, and Treatment

### 幾 expansion and G001
- 幾 “a few/several” is explicitly taught before G001.
- G001 is explicitly **always negative** under the source rule.
- G001 is contrasted with Unit-40 question-word totality rather than merged with it.
- controlled checks, D1T07 use, unit retrieval, U47 好幾次 transfer, and Unit-48 cumulative/sense retrieval complete the lifecycle.

**PASS.**

### Modal 得 and medicine
- 藥 / 藥局 / 拿 are meaning-first taught after character work.
- modal 得 is explicitly introduced as **děi + V = must/have to** before `得吃藥嗎`.
- complement 得 **de** is explicitly contrasted in the Unit-46 review and again in Unit 48.
- 感冒 and 拿 now receive later positive Unit-48 retrieval.

**PASS.**

### G002 把
Before productive G002 assessment:
- 把 and imperative 別 are explicitly taught;
- definite/referential-object bias is explained;
- the bare outward-transitive restriction is explained;
- inward 買 / 學 rejection is explained;
- source sentence-final 了 is distinguished from Unit-39 verbal-了;
- 沒 / 別 before 把 is taught;
- source question routes 了沒有 / 是不是 are taught;
- A004 support X040–X043 is reviewed/explained before the three source outcomes.

A004 preserves:
1. 把這50個小籠包吃了;
2. 把今天的功課寫了;
3. 把我的西瓜吃了.

**PASS.**

### Recovery / politeness
- 水 / 休息 / 睡覺 / 早一點 are meaning-first before assessment.
- 睡覺 explicitly teaches **jiào** for 覺.
- X007 多 + V health advice is taught before D1T11.
- 您 is explained before literal `謝謝您`; it remains support-only.
- D1T06–D1T12 are integrated only after all local dependencies are available.

**PASS.**

## Unit 47 — Stomach Trouble and Getting Help

### P001 / stomach vocabulary / 好幾次
- 怎麼了 is explicitly taught pragmatically as a concern/condition inquiry.
- 臉色 / 難看 and 肚子 / 吐 / 次 receive meaning-first teaching.
- Unit-46 幾 expansion is retrieved before X008 好幾次.
- full D2T02 is withheld until G003 has been taught.

**PASS.**

### G003
The grammar card and practice explicitly teach:
- completed event 1 followed immediately by event 2;
- contrast with prior 一…就…;
- 以後 compatibility;
- rejection of the source-incompatible 一 + V了…以後 combination;
- 嗎 / 是不是 rather than ordinary A-not-A.

D2T02 is then used contextually, followed by unit review and delayed Unit-48 retrieval.

**PASS.**

### Help/refusal/health-center episode
- 陪 / 看病 are meaning-first before D2T03.
- 不用了 is pragmatically explained as declining offered help/necessity before literal use.
- 健康 / 保險 / 健康中心 are meaning-first before D2T04–D2T06.
- X010 `對 + person + 很客氣` is explained before its literal dialogue card.
- X011 `V + 就好了` “doing X will be enough” is explained before its literal dialogue card.
- both X010 and X011 now receive delayed Unit-48 retrieval.

**PASS.**

### A005
The scenario remains source-faithful: 如玉 is sick at home, with the name contextual/non-assessed. The learner receives and is instructed to use four health-condition questions:
1. 哪裡不舒服？
2. 有沒有發燒？
3. 喉嚨怎麼樣？
4. 胃口怎麼樣？

玉 is never a productive glyph prerequisite.

**PASS.**

## Unit 48 — Advice, Comparisons, and Recovery

### Recipient 跟 / advice / A002
- recipient/addressee 跟 is explicitly contrasted with prior companionship 跟 before D2T08.
- 回家 / 油 are meaning-first before assessment.
- 冰 follows recognition + `intro → trace → build → complete → memory`; only then are 冰 / 關心 / 最好 meaning-first taught and assessed.
- P009 occurs only after 油 / 冰 / 最好 and reviewed 別 are available.
- A002 retains the three exact source visual prompts, two acceptance roles, one rejection role, and Task 2.
- deferred 拒 / 絕 are no longer required instructional reading.

**PASS.**

### G004
Before D2T11 and G006, the learner is explicitly taught:
- 一點 + NP = small quantity;
- Vs + 一點 = comparative/slightly different degree;
- 有（一）點 + Vs = slight state, not comparison;
- 一點點 = tiny amount/degree.

The health-improvement scale is taught and retrieved.

**PASS.**

### G005
Before D2T12 / A001:
- 包 / 睡 / 小時 are explicitly explained before lexical selection;
- 分鐘 is explained as support before later source tasks;
- both source G005 patterns are taught;
- verb repetition is taught;
- 不 before 比 is taught;
- 嗎 / 是不是 question routes are taught;
- complement 得 **de** is explicitly kept distinct from modal 得 **děi**.

**PASS.**

### G006 and A001
- G004 precedes G006.
- G006 explicitly distinguishes 一點 / 得多 / 多了.
- X035 fractional-bowl expressions are explained before A001.
- 小時 / 分鐘 support is available before A001.
- G005 and G006 are both available before A001.
- the exact source A001 participant table, bowl counts, rents, transport modes, travel durations, and 臺南 are preserved.
- source name glyphs remain contextual/non-assessed.

**PASS.**

### G007
G007 appears only after lexical availability of:
- 生病 (U45);
- 睡覺 (U46);
- 看病 (U47);
- 回家 (U48-L1).

It teaches all three required insertion types:
1. verbal-了 insertion;
2. recipient/object insertion;
3. duration insertion, explicitly as expansion of prior Unit-28 duration behavior.

The full D2T13 is withheld until this point.

**PASS.**

### A003 and culture
Before any A003 question, the learner receives:
- 份 support;
- 一日4次;
- 3日份;
- 飯前 / 飯後, with 飯後 marked;
- 飯後30分鐘;
- previously explained 分鐘;
- a glossed/non-assessed 健康診所 header.

Only then are the three source questions asked, including the 4 × 3 = 12 packet inference.

CUL001 is explicitly framed as **textbook-era source content**, not present-day medical or policy advice.

**PASS.**

---

# Dialogue timing audit

All 25 source dialogue turns have prerequisite-safe homes.

- D1T01–D1T05: integrated in Unit 45 only after the symptom lexicon and X002/X004 are available.
- D1T06–D1T12: integrated in Unit 46 only after G001, modal 得, medicine language, G002, recovery advice, and 您 support are available. D1T06 is a fixed comprehensible source chunk and does not prematurely teach G007.
- D2T01–D2T07: integrated in Unit 47 only after P001, stomach vocabulary, G003, help/refusal vocabulary, X010, and X011 are available.
- D2T08–D2T10: Unit 48 L1 after recipient 跟 and advice vocabulary.
- D2T11: after G004.
- D2T12: after 包 / 睡 / 小時 and G005.
- D2T13: degree branch after G006; full line only after G007.

Deferred source-name/orthography glyphs never become required answers.

**PASS.**

# Character-learning and handwriting audit

All **30 NEW formal Lesson-15 characters** preserve the required order:

**recognition/read → intro → trace → build → complete → memory → first assessed vocabulary use → contextual reading → review complete retrieval**

Counts:
- Unit 45: 12 / 12;
- Unit 46: 9 / 9;
- Unit 47: 8 / 8;
- Unit 48: 1 / 1.

The repaired lexical cards do not move any assessment ahead of character `memory`; in Unit 48, the 冰 meaning card is explicitly placed after its full character lifecycle.

Every NEW character has later unit-review `complete` handwriting retrieval.

The global activity contract continues to lock every standalone `practice-字` route—including Search, character grid/library, dialogs, previews, and shortcuts—until the owning non-review teaching lesson is complete.

**PASS.**

# Source-activity audit

- **A001:** exact source table/data preserved; fractional bowls and 小時 / 分鐘 support precede use; G005 + G006 precede comparison transfer.
- **A002:** all three exact source illustration prompts retained; two acceptance roles + one rejection role retained; Task 2 retained; advice/refusal language is available first; deferred 拒 / 絕 are not prerequisites.
- **A003:** all three source questions occur after complete prescription support.
- **A004:** all three required source 把 outcomes occur only after G002 and X040–X043 support.
- **A005:** four health-condition questions are explicitly supported; 如玉 / 玉 remains contextual.

**PASS.**

# Retrieval / cumulative mixing audit

Unit review floors after repair:
- Unit 45: **32** steps, 3 listening;
- Unit 46: **34** steps, 3 listening;
- Unit 47: **34** steps, 3 listening;
- Unit 48: **58** steps, 3 listening.

Every canonical NEW lexical target has independent owning-unit retrieval. Important EXPANSION targets receive explicit local retrieval:
- 幾 “a few/several” in Unit 46 and again through 好幾次 / final contrast;
- 跟 recipient/addressee in Unit 48 and final sense contrast.

The repaired Unit-48 positive delayed block closes the previously missing later retrieval for 醫生 / 發炎 / 感冒 / 拿 / 難看 / 陪 / 保險 / 健康中心 and X010/X011.

Unit 48 also mixes:
- Unit-45 symptoms and duration;
- Unit-46 G001 / G002 / modal 得 and medicine;
- Unit-47 好幾次 / G003 / help language;
- A004 / A005;
- modal 得 vs complement 得;
- 幾 and 跟 sense contrasts;
- G004–G007;
- A001–A003;
- S001–S004.

S001–S004 are learner-facing Chinese performance/selection tasks, not curriculum-label recognition:
- S001: order 哪裡不舒服？
- S002: order a symptom report;
- S003: order health advice;
- S004: select the Chinese polite rejection in context.

**PASS.**

# Search / Mega / ownership audit

- canonical Lesson-15 NEW vocabulary remains singly owned by its frozen owning lesson;
- Mega eligibility remains gated by owning-lesson completion;
- 幾 and 跟 receive no duplicate canonical row, no second Mega ownership, and no retroactive broadening of their earlier Search glosses;
- 您 / 份 remain support-only with no Search, Mega, or handwriting ownership;
- deferred 妳、白、玉、安、田、李、陳、王、北、紐、約、烏、龍、診、拒、絕 remain non-productive/non-owned;
- 一直 / 直 remain a later implementation migration requirement from Book-2 first ownership to Unit 45, not a prerequisite for the Unit-44 learner.

No Search/Mega policy repair requires reopening Gate A.

**PASS.**

# Final findings

Open findings after repair:
- BLOCKER: **0**
- MAJOR: **0**
- MINOR: **0**

Resolved during this audit:
- MAJOR: **3**
- BLOCKER: **0**
- MINOR: **0**

# Result: PASS

**Activity Audit 1 — Teaching Quality passes.**

Gate B remains **PENDING**. Activity Audit 2 — Question Correctness / Adversarial Audit and Activity Audit 3 — Cross-Unit Coherence have **not** been run in this context. The activity packet is therefore **not frozen**, `frozenActivitySpec` remains null, and Units 45–48 remain unimplemented.
