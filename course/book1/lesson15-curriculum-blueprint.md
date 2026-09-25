# Book 1 Lesson 15 — Final Proposed Curriculum Blueprint

Authoritative source: A Course in Contemporary Chinese 1, Lesson 15 「我很不舒服」.

Upstream gates:
- source: PASS
- dependencies: PASS

Architecture history:
- Pass 1: course/book1/lesson15-curriculum-rough.md
- Pass 2: course/book1/lesson15-curriculum-refined.md

Status: **PROPOSED — NOT FROZEN**.

This file completes Stage 3 design Pass 3. Gate A remains PENDING until all three independent curriculum audits pass with 0 BLOCKER and 0 MAJOR. Activity engineering, implementation, merge, and publication remain locked.

---

# 1. Final proposed unit architecture

Lesson 15 is proposed across **four Hanzi Steps units: Units 45–48**.

| Unit | Working title | Core communicative goal | Formal NEW | Lexical EXPANSION | NEW formal chars | Formal grammar |
|---|---|---|---:|---:|---:|---|
| 45 | Symptoms and Feeling Sick | ask about discomfort, describe symptoms, say how long | 12 | 0 | 12 | none |
| 46 | Diagnosis, Medicine, and Treatment | identify illness, discuss medicine/recovery, use introductory 把 | 10 | 1 | 9 | G001–G002 |
| 47 | Stomach Trouble and Getting Help | describe stomach trouble, seek/decline help, sequence completed events | 12 | 0 | 8 | G003 |
| 48 | Advice, Comparisons, and Recovery | give/respond to advice, compare improvement/actions, use separable verbs, read a prescription | 8 | 1 | 1 | G004–G007 |

Totals:
- formal NEW lexical entries: **42 / 42**
- lexical EXPANSION entries: **2 / 2**
- formal lexical entries accounted for: **44 / 44**
- NEW formal characters: **30 / 30**
- KNOWN formal characters: **33 / 33 reused without re-ownership**
- formal grammar targets: **7 / 7**

Unit 48 is intentionally below the usual 10–13 lexical-target range because it carries four formal grammar expansions, dense comparison/separable-verb integration, three source transfer activities, prescription support, culture, and the cumulative Lesson-15 capstone. No transparent combination is promoted to fake novelty.

---

# 2. Cross-unit ownership and sequencing

## Dialogue ownership

- **Unit 45:** B1L15-D1T01–B1L15-D1T05
- **Unit 46:** B1L15-D1T06–B1L15-D1T12
- **Unit 47:** B1L15-D2T01–B1L15-D2T07
- **Unit 48:** B1L15-D2T08–B1L15-D2T13

The dialogue split follows coherent communicative arcs while allowing source-late prerequisite items to move earlier when required by the validated graph.

## Formal grammar ownership

| Source grammar | Unit | Planned stable grammar ID |
|---|---:|---|
| B1L15-G001 non-committal question-word declaratives | 46 | u46-noncommittal-question-words |
| B1L15-G002 introductory 把 disposal | 46 | u46-ba-disposal |
| B1L15-G003 V了…就… | 47 | u47-vle-jiu |
| B1L15-G004 一點 quantity/degree system | 48 | u48-a-little-degree |
| B1L15-G005 action comparison with 得 | 48 | u48-action-comparison-de |
| B1L15-G006 comparison degree complements | 48 | u48-comparison-degree |
| B1L15-G007 separable verbs / insertion behavior | 48 | u48-separable-verbs |

## Required prerequisite edges

These edges are part of the proposed architecture and may not be reversed during later activity engineering without reopening Gate A:

- **V026 幾 EXPANSION → G001.**
- ordinary question words + u40-questionword-totality + u39-bu-vs-mei + V026 where 幾 is used → G001.
- **V017 把 + V035 別 + X031 + u39-verbal-le + u39-bu-vs-mei + u31-sentential-le + u41-shibushi → G002.**
- G002 must explicitly distinguish source sentence-final 了 from the Unit-39 negated verbal-了 rule.
- u39-verbal-le + u38-yi-jiu + u36-yihou-after + source question support → G003.
- Unit-39 一點 + Unit-16 有一點 + u40-more-less-verb → G004.
- Unit-16 performance 得 + u25-bi-comparison / u25-bi-negation + u41-shibushi → G005.
- **G004 → G006.**
- u28-separable-duration + u39-verbal-le + **V011 生病 + V020 睡覺 + V029 看病 + V043 回家 → G007** before productive new insertion behavior.
- V026 + V027 → X008 好幾次.
- V044 + prior u27-yinggai → P004 / F003.
- G005 + G006 + V039 + X035 + X039 + contextual name handling → A001.
- X037 + X038 + X039 + V027 + V037 → A003.
- G002 + X040 + X041 + X042 + X043 → A004.

## Deliberate pull-forwards

- **B1L15-V026 幾** stays EXPANSION and is allocated to Unit 46 before its Dialogue-II occurrence because G001 requires the new non-specific/a-few value.
- **B1L15-V035 別** stays NEW and is allocated to Unit 46 before its Dialogue-II occurrence because G002 requires source imperative negation with 別 + 把.

These are topology decisions only. No validated source or dependency classification is changed.

## Outcome ownership

- **F001 ask how someone feels:** established in Unit 45; completed in Unit 47.
- **F002 describe symptoms:** established in Unit 45; completed across Units 46–47.
- **F003 give suggestions to someone sick:** established in Unit 46 with 多 + V / 早一點; completed in Unit 48 with 最好 / 應該 transfer.
- **F004 accept/reject suggestions:** established in Unit 47 with 不用了; completed in Unit 48 through A002 and concern-response pragmatics.
- **S001–S004:** cumulative retrieval in Unit 48 review/capstone.

## Classroom-activity ownership

- **A001 Let’s Compare:** Unit 48
- **A002 Who Is Taking Care of Me?:** Unit 48
- **A003 Taking Medication:** Unit 48
- **A004 Use 把 Construction:** Unit 46
- **A005 How Are You Feeling?:** Unit 47

## Culture ownership

- **CUL001 Wearing Surgical Masks:** Unit 48 as textbook-era source culture only. No present-day medical/policy claim is inferred from it.

---

# 3. Unit 45 blueprint — Symptoms and Feeling Sick

## Identity and load

Primary goals:
- ask where someone feels unwell;
- describe common symptoms;
- state how long the condition has lasted.

Approximate load:
- 12 NEW formal lexical entries
- 12 NEW formal characters
- 0 formal Lesson-15 grammar targets
- 3 important support integrations
- high character / moderate lexical / low formal-grammar load

## New vocabulary

- B1L15-V001 醫生 yīshēng
- B1L15-V002 一直 yìzhí
- B1L15-V003 流 liú
- B1L15-V004 鼻水 bíshuǐ
- B1L15-V005 頭 tóu
- B1L15-V006 痛 tòng
- B1L15-V007 胃口 wèikǒu
- B1L15-V008 差 chā
- B1L15-V009 喉嚨 hóulóng
- B1L15-V010 發炎 fāyán
- B1L15-V011 生病 shēngbìng
- B1L15-V012 發燒 fāshāo

## New characters

- B1L15-CH001 醫
- B1L15-CH004 直
- B1L15-CH005 流
- B1L15-CH006 鼻
- B1L15-CH009 痛
- B1L15-CH010 胃
- B1L15-CH013 喉
- B1L15-CH014 嚨
- B1L15-CH015 發
- B1L15-CH016 炎
- B1L15-CH017 病
- B1L15-CH018 燒

Important pronunciation/sense safeguards:
- 差 is taught as **chā** in this new lexical sense despite prior glyph familiarity.
- 一直 / 直 become the canonical earlier Book-1 ownership; the current Book-2 Unit 1 ownership must later migrate to review.

## Review vocabulary / prior language

Use only as already-known support:
- ordinary 哪裡 / 什麼 / 東西 / 想;
- Unit-40 question-word totality in X003;
- 大概 / 多久 / 已經 / day-duration foundations for X004;
- Unit-16 有一點 + state for X005;
- known body/context function words.

## Prerequisite/support IDs

- X001 DEFERRED contextual address handling
- X002 EXPANSION health-inquiry support
- X003 REVIEW
- X004 EXPANSION symptom-duration integration
- X005 REVIEW

## Planned six teaching lessons

### U45-L1 — At the Doctor
Reserved ID: u45-doctor

Targets:
- 醫生
- X002 哪裡不舒服

Source:
- D1T01
- F001 partial

Constraint:
- 白 / 妳 are contextual/deferred; no productive glyph requirement.

### U45-L2 — A Runny Nose
Reserved ID: u45-runny-nose

Targets:
- 一直
- 流
- 鼻水

Source:
- D1T02 partial

### U45-L3 — Head and Appetite
Reserved ID: u45-head-appetite

Targets:
- 頭
- 痛
- 胃口
- 差

Source:
- D1T02 completion

### U45-L4 — Throat and Inflammation
Reserved ID: u45-throat

Targets:
- 喉嚨
- 發炎
- REVIEW 有一點 + state

Source:
- D1T05 preparation

### U45-L5 — Sick and Feverish
Reserved ID: u45-sick-fever

Targets:
- 生病
- 發燒

Constraint:
- do not infer full G007 separable-verb insertion from 生病 yet.

### U45-L6 — How Long Has It Been?
Reserved ID: u45-how-long

Targets:
- X004 大概多久了 / 已經…天了
- integrated D1T01–D1T05

Outcomes:
- F001 established
- F002 established

## Unit 45 review

Reserved ID: u45-review

Required later activity-stage coverage:
- independent retrieval of all 12 NEW formal words;
- handwriting retrieval of all 12 NEW formal characters;
- distinguish symptom vocabulary rather than memorizing one dialogue;
- health-duration integration;
- no deferred name/orthography answer requirement.

## Source/support ownership

Owned/established:
- D1T01–D1T05
- V001–V012
- F001 partial
- F002 partial
- X002/X004 expansions

Reviewed:
- X003/X005

Deferred:
- X001 and source 妳 orthography

---

# 4. Unit 46 blueprint — Diagnosis, Medicine, and Treatment

## Identity and load

Primary goals:
- identify a simple illness;
- talk about medicine/pharmacy actions;
- give basic recovery advice;
- use source-accurate introductory 把.

Approximate load:
- 10 NEW formal lexical entries
- 1 lexical EXPANSION
- 9 NEW formal characters
- 2 formal grammar targets
- new modal 得 support and doctor-patient politeness support
- medium-high overall load

## New vocabulary

Formal NEW:
- B1L15-V013 感冒 gǎnmào
- B1L15-V014 藥 yào
- B1L15-V015 藥局 yàojú
- B1L15-V016 拿 ná
- B1L15-V017 把 bǎ
- B1L15-V018 水 shuǐ
- B1L15-V019 休息 xiūxí
- B1L15-V020 睡覺 shuìjiào
- B1L15-V021 早一點 zǎo yìdiǎn
- B1L15-V035 別 bié

Lexical EXPANSION:
- B1L15-V026 幾 jǐ — a few / several; non-specific branch

## New characters

- B1L15-CH019 感
- B1L15-CH020 冒
- B1L15-CH021 藥
- B1L15-CH022 局
- B1L15-CH023 拿
- B1L15-CH024 把
- B1L15-CH025 休
- B1L15-CH026 息
- B1L15-CH027 睡

Pronunciation safeguard:
- 覺 is already a KNOWN glyph, but 睡覺 introduces **jiào**, distinct from prior 覺得 juéde.

## Formal grammar

- G001 → u46-noncommittal-question-words
- G002 → u46-ba-disposal

## Review vocabulary / prior language

- ordinary question words;
- u40-questionword-totality as a contrast, not an equivalent;
- 不 / 沒（有）;
- u39-verbal-le and u31-sentential-le;
- u41-shibushi and 嗎;
- 這個 / 那個 / possessive 的;
- known outward verbs such as 吃 / 喝 / 寫;
- 請問.

## Required prerequisite/support IDs

- V026 → G001
- V017 + V035 + X031 + prior 了/negation/question nodes → G002
- X006 NEW modal 得
- X007 EXPANSION health-advice 多 + V
- P007 EXPANSION with NEW-support 您

## Planned six teaching lessons

### U46-L1 — It Is a Cold
Reserved ID: u46-cold

Targets:
- 感冒
- retrieve 生病 / 發燒

Source:
- D1T06–D1T07 preparation

### U46-L2 — Not Anything Specific
Reserved ID: u46-nonspecific

Targets:
- 幾 EXPANSION
- G001

Required distinctions:
- negative non-specific declarative;
- not Unit-40 都/也 totality;
- always negative under the source rule.

Source:
- D1T07
- DR001
- X019 REVIEW bundle

### U46-L3 — Medicine and the Pharmacy
Reserved ID: u46-medicine

Targets:
- 藥
- 藥局
- 拿
- X006 modal 得 děi + V

Source:
- D1T08–D1T09

### U46-L4 — The 把 Construction
Reserved ID: u46-ba

Targets:
- 把
- 別
- G002

Must teach:
- definite-reference bias;
- bare outward-transitive action-verb restriction;
- rejection of inward verbs;
- sentence-final 了 pattern;
- 沒 / 別 before 把;
- 了沒有 / 是不是 questions;
- sentence-final 了 vs negated verbal 了 distinction.

Source:
- DR002
- X020/X029/X031

### U46-L5 — Rest and Recover
Reserved ID: u46-recover

Targets:
- 水
- 休息
- 睡覺
- 早一點
- X007 多 + V health advice

Source:
- D1T11

### U46-L6 — The Doctor Visit
Reserved ID: u46-doctor-visit

Targets:
- integrated D1T06–D1T12
- NEW-support 您 under P007
- A004 after support X040–X043 is reviewed/explained

Outcomes:
- F002 completed for Dialogue I
- F003 established
- A004 completed

## Unit 46 review

Reserved ID: u46-review

Must later retrieve:
- 10 NEW + V026 expansion;
- 9 NEW characters;
- G001 vs Unit-40 totality;
- G002 restrictions, negation, questions, and 了 distinction;
- modal 得 děi vs complement 得 de;
- doctor-patient politeness without hidden source glyphs.

## Source/support ownership

Owned:
- D1T06–D1T12
- V013–V021
- V026 EXPANSION
- V035
- G001/G002
- DR001/DR002
- A004

Support:
- X006/X007/X019/X020/X029/X031/X040–X043
- P007

---

# 5. Unit 47 blueprint — Stomach Trouble and Getting Help

## Identity and load

Primary goals:
- describe stomach trouble and repeated vomiting;
- offer/acquire help and politely decline it;
- sequence one completed event immediately after another.

Approximate load:
- 12 NEW formal lexical entries
- 8 NEW formal characters
- 1 formal grammar target
- several pragmatic integrations
- high lexical / moderate grammar load

## New vocabulary

- B1L15-V022 臉色 liǎnsè
- B1L15-V023 難看 nánkàn
- B1L15-V024 肚子 dùzi
- B1L15-V025 吐 tù
- B1L15-V027 次 cì
- B1L15-V028 陪 péi
- B1L15-V029 看病 kànbìng
- B1L15-V030 健康 jiànkāng
- B1L15-V031 保險 bǎoxiǎn
- B1L15-V040 怎麼了 zěnme le
- B1L15-V041 不用了 búyòng le
- B1L15-V042 健康中心 jiànkāng zhōngxīn

## New characters

- B1L15-CH031 臉
- B1L15-CH035 肚
- B1L15-CH037 吐
- B1L15-CH040 陪
- B1L15-CH041 健
- B1L15-CH042 康
- B1L15-CH043 保
- B1L15-CH044 險

## Formal grammar

- G003 → u47-vle-jiu

## Review vocabulary / prior language

- Unit-46 幾 expansion;
- yesterday/night and known food vocabulary;
- prior 好不好 proposal/agreement;
- 嗎 / 是不是;
- u38-yi-jiu contrast;
- u36-yihou-after;
- school/student and ordinary purchase vocabulary.

## Required prerequisite/support IDs

- V026 + V027 → X008 好幾次
- u39-verbal-le + u38-yi-jiu + u36-yihou-after → G003
- P001/P002 new pragmatics
- P003 review

## Planned six teaching lessons

### U47-L1 — What Is Wrong?
Reserved ID: u47-whats-wrong

Targets:
- 怎麼了
- 臉色
- 難看
- P001

Source:
- D2T01
- F001 completion path

### U47-L2 — Stomach Trouble
Reserved ID: u47-stomach

Targets:
- 肚子
- 吐
- 次
- X008 好幾次 after V026/V027

Source:
- D2T02 lexical preparation

### U47-L3 — Right After Doing It
Reserved ID: u47-vle-jiu

Targets:
- G003

Must preserve:
- immediate succession after completion;
- contrast with 一…就…;
- 以後 compatibility;
- no ordinary A-not-A;
- 嗎 / 是不是 question route.

Source:
- D2T02
- DR003
- X021/X022 adapted support
- X030 REVIEW contrast

### U47-L4 — I Will Go With You
Reserved ID: u47-accompany

Targets:
- 陪
- 看病
- P003 REVIEW 好不好

Source:
- D2T03

### U47-L5 — Health Insurance and the Health Center
Reserved ID: u47-health-center

Targets:
- 健康
- 保險
- 健康中心

Support:
- X010
- X011

Source:
- D2T04–D2T06

### U47-L6 — No Need, Thanks
Reserved ID: u47-refuse-help

Targets:
- 不用了
- P002
- integrated D2T01–D2T07
- A005 cumulative health call

Outcomes:
- F001 completed
- F004 established
- A005 completed

## Unit 47 review

Reserved ID: u47-review

Must later retrieve:
- 12 NEW words;
- 8 NEW characters;
- G003 contrast with 一…就…;
- good several-times phrase without reverting 幾 to only “how many”;
- agreement/refusal pragmatics;
- health inquiry across Units 45–47.

## Source/support ownership

Owned:
- D2T01–D2T07
- V022–V025, V027–V031, V040–V042
- G003
- DR003
- P001/P002
- A005

Reviewed/adapted:
- P003
- X008–X011
- X014
- X021/X022
- X029/X030

---

# 6. Unit 48 blueprint — Advice, Comparisons, and Recovery

## Identity and load

Primary goals:
- report illness to another person and give health advice;
- accept/reject advice politely;
- describe improvement by degree;
- compare actions using 得;
- generalize separable-verb insertion behavior;
- read the source prescription;
- complete Lesson-15 source transfers and culture.

Approximate load:
- 8 NEW formal lexical entries
- 1 lexical EXPANSION
- 1 NEW formal character
- 4 formal grammar targets
- 3 source classroom activities
- prescription support + culture + cumulative capstone
- very high conceptual / low handwriting load

## New vocabulary

Formal NEW:
- B1L15-V033 油 yóu
- B1L15-V034 冰 bīng
- B1L15-V036 關心 guānxīn
- B1L15-V037 包 bāo
- B1L15-V038 睡 shuì
- B1L15-V039 小時 xiǎoshí
- B1L15-V043 回家 huí jiā
- B1L15-V044 最好 zuìhǎo

Lexical EXPANSION:
- B1L15-V032 跟 gēn — recipient/addressee “to”

## New character

- B1L15-CH047 冰

All other formal glyphs in Unit 48 are KNOWN characters but may still carry NEW lexical senses/forms. No new character ownership is invented for 差、油、別、包、跟、頭、水 or other familiar glyphs.

## Formal grammar

- G004 → u48-a-little-degree
- G005 → u48-action-comparison-de
- G006 → u48-comparison-degree
- G007 → u48-separable-verbs

## Review vocabulary / prior language

- 應該;
- Unit-46 別;
- 不能 + V;
- 自己;
- 以後;
- 比 and 不比;
- performance 得 / object-repeat pattern;
- 是不是 / 嗎;
- 房租;
- Unit-24/25 transport;
- 碗 / 半 / numbers;
- known separable verbs and u28-separable-duration.

## Required prerequisite/support IDs

- G004 before G006.
- G005 before A001.
- V011/V020/V029/V043 before G007 productive use.
- V039 + X039 before A001.
- X035 before A001.
- X037/X038/X039 + V027/V037 before A003.
- V044 + prior 應該 before P004/F003.
- V033/V034 + prior 別 + V044 before P009.

## Planned six teaching lessons

### U48-L1 — Advice and Concern
Reserved ID: u48-advice

Targets:
- 跟 recipient/addressee EXPANSION
- 油
- 冰
- 關心
- 最好
- P004/P005/P006/P009

Review:
- 應該
- 別
- 不能
- 自己

Source:
- D2T08–D2T10
- A002 after advice acceptance/rejection support is available

### U48-L2 — A Little Better
Reserved ID: u48-a-little

Targets:
- G004
- P008 improvement scale
- X017

Required contrast:
- Vs + 一點 = comparison;
- 有（一）點 + Vs = slight degree, not comparison;
- 一點 + NP remains quantity;
- 一點點 remains tiny degree/amount.

Source:
- D2T11
- DR004

### U48-L3 — Comparing Actions
Reserved ID: u48-action-compare

Targets:
- 睡
- 小時
- X039 分鐘 support
- G005

Review:
- performance 得
- 比 / 不比
- question frames

Source:
- D2T12
- DR005

### U48-L4 — How Much Better?
Reserved ID: u48-degree-compare

Targets:
- G006 after G004
- X035 fractional bowl bridge
- A001 exact source table after X039 and contextual labels are safe

Source:
- D2T13 degree branch
- DR006
- A001

Context rules:
- preserve 臺南 exactly;
- source participant names are contextual/non-assessed;
- no hidden name glyph becomes handwriting/Search/Mega ownership.

### U48-L5 — Separable Verbs
Reserved ID: u48-separable

Targets:
- 回家
- G007

Required availability:
- 生病 from Unit 45
- 睡覺 from Unit 46
- 看病 from Unit 47
- 回家 before productive separation here

Teach:
- verbal 了 insertion;
- recipient/object insertion;
- duration insertion as EXPANSION of prior u28-separable-duration.

Source:
- D2T13
- DR007
- X026 REVIEW bundle

### U48-L6 — Reading a Prescription
Reserved ID: u48-prescription

Targets:
- 包
- X037 一日4次 / 3日份
- NEW-support 份
- X038 飯前 / 飯後
- X039 飯後30分鐘 retrieval

Transfer:
- A003 only after support is available;
- 12 packets is an arithmetic inference, not lexical ownership;
- CUL001 source-era culture reading after the prescription task.

## Unit 48 review + Lesson-15 capstone

Reserved ID: u48-review

Required later activity-stage coverage:
- retrieve all Unit-48 lexical targets and 冰 handwriting;
- retrieve G004–G007 independently, not only through copied dialogue lines;
- cumulative F001–F004 self-assessment via S001–S004;
- revisit A001–A005 functions across the four-unit batch;
- distinguish modal 得 děi from complement 得 de;
- distinguish 幾 “a few” from interrogative 幾;
- distinguish recipient 跟 from companionship 跟;
- no deferred source-only glyph becomes an answer/handwriting/Search/Mega requirement.

## Source/support ownership

Owned:
- D2T08–D2T13
- V032 EXPANSION
- V033/V034/V036–V039/V043/V044
- G004–G007
- DR004–DR007
- P004–P006/P008/P009
- A001/A002/A003
- CUL001
- S001–S004 capstone

Support:
- X012–X018
- X023–X028
- X032–X039
- X044

---

# 7. Complete support-record routing

Every B1L15-X record has an architecture home:

| X IDs | Unit/home |
|---|---|
| X001 | U45 contextual/deferred address handling |
| X002–X005 | U45 health inquiry, duration, and REVIEW support |
| X006–X007 | U46 modal 得 and health-advice support |
| X008–X011 | U47 repeated-event/help/refusal support |
| X012–X018 | U48 advice/improvement support |
| X019–X020 | U46 G001/G002 drill/example support |
| X021–X022 | U47 G003 contextual/deferred drill support |
| X023–X028 | U48 G004–G007 support |
| X029 | first retrieved in U46; cumulative question support in U47/U48 |
| X030 | U47 G003 contrast |
| X031 | U46 G002 definite-reference support |
| X032–X035 | U48 Activity-I/II contextual and quantity support |
| X036–X039 | U48 prescription support; X039 introduced before A001 |
| X040–X043 | U46 A004 support |
| X044 | U48 source-era culture only |

No DEFERRED support record is promoted to formal vocabulary merely by appearing in an activity.

---

# 8. Deferral and hidden-character policy

The validated dependency decisions remain unchanged:

- **妳** — preserve in source artifacts; productive learner-facing text may normalize to 你. No handwriting/Search/Mega obligation.
- **白、玉、安、田、李、陳、王** — contextual proper-name glyphs only.
- **北、紐、約、烏、龍** — contextual/glossed or permitted substitutions in source examples/drills, never productive hidden prerequisites.
- **診** — prescription-header glyph only; 健康診所 remains non-assessed/glossed.
- **拒、絕** — instructional role labels are expressed in learner-safe instructions rather than turned into character targets.
- **您** — explicit NEW support in Unit 46 before literal productive doctor-patient use.
- **份** — explicit NEW support in Unit 48 before literal prescription reading.
- **臺南** — preserved exactly in A001 as contextual/glossed source data; no substitution and no productive vocabulary ownership.

Search/Mega/handwriting ownership for DEFERRED support is prohibited. Formal NEW/EXPANSION inclusion strategy is deferred to activity engineering after Gate A.

---

# 9. Book-2 ownership migration requirement

At the Unit-44 learner baseline:
- B1L15-V002 一直 is NEW;
- B1L15-CH004 直 is NEW.

The current generated registry later first-owns both in Book-2 Unit 1. This blueprint assigns canonical first ownership to **Unit 45**. Before production release, implementation/migration must convert the Book-2 occurrence to review rather than leave duplicate NEW ownership.

Book 2 is not a prerequisite for Lesson 15.

---

# 10. Source coverage summary

All validated source categories have explicit proposed homes:

- F001–F004: Units 45–48 as mapped above
- D1T01–D1T12: Units 45–46
- D2T01–D2T13: Units 47–48
- V001–V044: exactly one formal allocation each
- G001–G007: exactly one formal owner each
- P001–P009: Units 46–48
- X001–X044: all routed in Section 7
- DR001–DR007: Units 46–48
- A001–A005: Units 46–48
- CUL001: Unit 48
- S001–S004: Unit 48 capstone
- CH001–CH063: 30 NEW ownership assignments + 33 KNOWN reuse only

No validated source item is intentionally discarded. No upstream classification has been silently changed.

---

# 11. Gate state and next action

This blueprint is **not frozen**.

Current Gate A state:
- source gate: PASS
- dependency gate: PASS
- curriculum source-fidelity audit: PENDING
- curriculum pedagogy audit: PENDING
- curriculum adversarial audit: PENDING
- curriculum gate: PENDING

Required next work is three independent curriculum audits. Only after all three pass with 0 BLOCKER and 0 MAJOR may this blueprint be frozen and Gate A pass.

Do not begin activity engineering or implementation from this proposed blueprint yet.
