# Lesson 13 Phase 2 implementation blueprint — Units 37–41

Authoritative source: *A Course in Contemporary Chinese 1*, Lesson 13 「生日快樂」 / “Happy Birthday”.

This is the pre-implementation curriculum specification built on course/book1/lesson13-source-ledger.md. It freezes the **unit-level curriculum allocation** before any learner-facing Unit 37–41 TypeScript is written.

It is intentionally more specific than the Phase 1 source ledger: it assigns every source item, dialogue turn, grammar point, character obligation, special case, and end-of-lesson objective to a concrete unit and lesson arc.

## Phase 2 design principles

1. Preserve the source progression rather than divide the lesson into equal word counts.
2. Keep the five-unit architecture: Units 37–41.
3. Maintain the established Hanzi Steps shape of **six teaching lessons + one review lesson** per unit.
4. Teach source-listed fixed expressions as expressions when they have phrase-level meaning/use; do not invent extra standalone vocabulary merely to explain their internal characters.
5. Treat new senses/functions of already-known forms as review/new-sense teaching, not duplicate first ownership.
6. Never productively assess a grammar system before its formal unit, even if the source dialogue previews it.
7. No future-new learner character may appear in a phrase, grammar card, or assessment before its introduction unless the item is explicitly adapted.
8. Proper names do not automatically create handwriting/vocabulary obligations.
9. Every formal NEW vocabulary/expression must be independently retrieved in its unit review and participate in the normal Pinyin Search / Mega Challenge pipeline after its teaching lesson.
10. Grammar cards must include the source restrictions, not just the positive headline pattern.
11. Once implemented and published, lesson/activity topology should remain stable. Therefore the lesson IDs below should be treated as reserved implementation targets.
12. Lesson 13 is complete only when Unit 41's capstone covers all four textbook outcomes, not merely Grammar VI–VII.

---

# Locked cross-unit allocation

## Source dialogue ownership

### Dialogue I

- **Unit 37:** turns 1–6
- **Unit 38:** turns 7–14

Source proper-name adaptation:
- speaker names 怡君 / 安同 may be represented by romanized speaker labels rather than learner-facing Hanzi;
- source 妳 is normalized to 你;
- 花蓮 is not promoted to a one-off character obligation. The learner-facing sequence may preserve the discourse through an English/context note while teaching 好久不見 and 我剛從臺東回來 in Chinese. 蓮 must not leak into assessment.

### Dialogue II

- **Unit 39:** turns 1–6
- **Unit 40:** turns 7–9
- **Unit 41:** turns 10–13

This boundary is deliberate:
- Unit 39 may expose 我什麼都吃 and 多吃一點 for comprehension only;
- Unit 40 formally teaches those systems;
- Unit 40 may expose 是不是 in turn 7 for comprehension only;
- Unit 41 formally teaches 是不是;
- Unit 41 begins with 跟你們一樣，吃蛋糕 so the dialogue itself becomes the natural entry into Grammar VII.

## Grammar ownership

| Source grammar | Unit | Planned grammar ID |
| --- | --- | --- |
| I. 一…就… | 38 | u38-yi-jiu |
| II. completed-action verbal 了 | 39 | u39-verbal-le |
| III. 不 vs. 沒（有） | 39 | u39-bu-vs-mei |
| IV. question word + 都／也 totality | 40 | u40-questionword-totality |
| V. 多／少 + Verb | 40 | u40-more-less-verb |
| VI. 是不是 confirmation | 41 | u41-shibushi |
| VII. 跟…一樣 comparison | 41 | u41-gen-yiyang |

No formal numbered grammar is assigned to Unit 37.

## Source lexical allocation

### Unit 37

Ordinary source vocabulary:
- 生日 shēngrì
- 快樂 kuàilè
- 回來 huílái
- 啊 a
- 忘 wàng
- 記得 jìde
- 當然 dāngrán

Review / new sense:
- 怎麼 zěnme — Unit 24 form, Lesson 13 reaction sense “How come? / How could…?”

Canonical source expressions:
- 生日快樂 shēngrì kuàilè
- 我就是 wǒ jiù shì
- 好久不見 hǎojiǔ bújiàn

### Unit 38

Ordinary source vocabulary:
- 語言 yǔyán
- 交換 jiāohuàn
- 熱心 rèxīn
- 西班牙文 Xībānyá wén
- 一樣 yíyàng
- 過 guò — “celebrate” in 過生日; ownership migration from Book 2 Unit 3
- 左右 zuǒyòu
- 門口 ménkǒu

Review / new sense:
- 那麼 nàme — existing Unit 36 “then / in that case”; here also degree “so / that [state]”

Source Name support:
- 西班牙 Xībānyá — contextual Name entry, not a separate canonical challenge item

Canonical source expressions:
- 不必客氣 búbì kèqi
- 太客氣 tài kèqi

### Unit 39

Ordinary source vocabulary:
- 禮物 lǐwù
- 今年 jīnnián
- 訂 dìng
- 豬腳 zhūjiǎo
- 麵線 miànxiàn
- 蛋 dàn
- 一點 yìdiǎn

Review / new function:
- 了 le — completed-action verbal particle; do not create duplicate vocabulary ownership

Canonical source expression:
- 哪裡哪裡 nǎlǐ nǎlǐ

### Unit 40

Ordinary source vocabulary:
- 傳統 chuántǒng
- 年輕 niánqīng

Canonical source expression:
- 大部分 dàbùfēn

The low lexical count is intentional. Unit 40 carries the full Grammar IV totality system and Grammar V 多／少 + Verb, both of which require productive transfer across many already-known question words and verbs.

### Unit 41

Ordinary source vocabulary:
- 蛋糕 dàngāo
- 祝 zhù

Review / new sense:
- 對 duì — productive prepositional “to / toward” in 對 + person

Canonical source expressions:
- 萬事如意 wànshì rúyì
- 心想事成 xīnxiǎng shìchéng

The low lexical count is intentional. Unit 41 carries Grammar VI, Grammar VII, fixed-wish pragmatics, Dialogue II closure, and the full Lesson 13 capstone.

## Canonical vocabulary/expression totals

Planned canonical NEW entries:

- Unit 37: 10
- Unit 38: 10
- Unit 39: 8
- Unit 40: 3
- Unit 41: 4

**Total: 35 canonical new words/expressions.**

This corresponds to:
- 26 learner-new ordinary vocabulary forms from the source;
- all 9 source-listed Phrase entries as explicit canonical expressions;
- the source Name 西班牙 remains contextual rather than a 36th challenge item.

Already-known forms 怎麼、那麼、了、對 are taught as new senses/functions without duplicate ownership.

---

# Character allocation

The Phase 1 chronological audit found 24 formal-source characters not yet taught by the end of Book 1 Unit 36. Phase 2 assigns all 24 exactly once:

## Unit 37 — 4 first-taught characters
- 忘
- 記
- 當
- 然

## Unit 38 — 7 first-taught characters
- 交
- 換
- 牙
- 必
- 氣
- 門
- 口

## Unit 39 — 6 first-taught characters
- 禮
- 物
- 訂
- 豬
- 腳
- 蛋

## Unit 40 — 4 first-taught characters
- 傳
- 統
- 輕
- 部

## Unit 41 — 3 first-taught characters
- 糕
- 祝
- 如

Total = **24 / 24**.

### Reading/ownership exceptions

- 樂 is already a known character with the reading **yuè** from 音樂. Unit 37 must explicitly teach **lè** in 快樂 without adding 樂 to newCharacters.
- 過 is already a Book 1 character from 不過, but its standalone vocabulary record is currently first-owned by Book 2 Unit 3. Unit 38 becomes vocabulary first ownership for 過 “celebrate”; Book 2 later teaches a new movement sense.
- 口 is currently first-owned as a character by Book 2 Unit 1. Unit 38 becomes the chronological first character teaching. Book 2 Unit 1 must be converted to review/reuse while preserving existing activity IDs/topology as far as possible.
- 對's character was already introduced in Unit 21; the Lesson 13 prepositional use is semantic/syntactic expansion, not character teaching.

---

# Unit 37 blueprint — Birthday Call

## Unit identity

Proposed label: **Birthday calls, returning & remembering**

Proposed title: **Tomorrow Is Your Birthday**

Primary goal:
- understand/open a friendly phone call;
- talk about a birthday;
- say someone came back;
- react to forgetting;
- say that one remembers.

Suggested banner:
- 生日快樂
- Shēngrì kuàilè

Suggested goal sentence:
- 啊，我怎麼忘了！謝謝你還記得。
- A, wǒ zěnme wàng le! Xièxie nǐ hái jìde.
- “How could I forget! Thanks for still remembering.”

No new formal grammar ID.

## Source coverage

Dialogue I turns 1–6:
1. 喂，安同嗎？
2. 是，我就是。怡君，好久不見，聽說妳去花蓮？
3. 我沒去花蓮，我剛從臺東回來。
4. 找我有什麼事？
5. 明天是你的生日，對不對？
6. 啊，我怎麼忘了！最近太忙了，謝謝妳還記得。

Learner-facing adaptation:
- normalize 妳 → 你;
- do not display 怡、君、安、蓮 as unscaffolded learner Hanzi;
- teach the usable Chinese core with romanized speaker labels and a context note for the Hualien correction;
- learner-facing Chinese should explicitly include 好久不見、我剛從臺東回來、生日、忘了、記得.

## Planned lessons

### u37-phone — “Hello, This Is Me”
Purpose:
- retrieve 喂;
- teach the phone formula 我就是;
- teach 好久不見;
- distinguish 我就是 on the phone from a broad invented grammar rule for 就是.

Core activities:
- phrase card 我就是;
- phrase card 好久不見;
- contextual choice: phone self-identification vs. ordinary 是;
- order task for 是，我就是;
- listening/meaning retrieval using 喂 and 好久不見.

No new characters.

### u37-birthday — “Happy Birthday”
Teach:
- 生日
- 快樂
- 生日快樂

Special reading:
- explicitly contrast 樂 yuè in 音樂 with lè in 快樂;
- do not reteach handwriting for 樂.

Core activities:
- meaning retrieval 生日 / 快樂;
- pinyin discrimination yuè vs. lè;
- phrase build 生日快樂;
- short birthday response context.

No new characters.

### u37-return — “I Just Came Back”
Teach:
- 回來

Retrieve:
- 剛
- 從
- 臺 / 東 as already-known characters

Core source phrase:
- 我剛從臺東回來。

The source's Hualien correction is explained in context without forcing 蓮 into the curriculum.

Core activities:
- 回來 vs. 回國 review;
- order sentence with 剛 + 從 + place + 回來;
- listening recognition.

No new characters.

### u37-forget — “How Could I Forget?”
Teach:
- 啊
- 忘

New character:
- 忘

New-sense review:
- 怎麼 in 我怎麼忘了！ = “How come / How could I…?”

Preview boundary:
- 忘了 is taught as the source phrase meaning “forgot”;
- do **not** generalize completed-action verbal 了 yet;
- note that the general completed-action system is taught in Unit 39.

Core activities:
- full five-step handwriting sequence for 忘;
- phrase 我怎麼忘了;
- contrast 怎麼 + action “how?” with reaction 怎麼… “how come?”;
- no productive verbal-了 rule question.

### u37-remember — “I Remember”
Teach:
- 記得

New character:
- 記

Core activities:
- handwriting 記;
- 忘 vs. 記得 meaning contrast;
- source phrase 謝謝你還記得;
- listening / select.

### u37-of-course — “Of Course I Remember”
Teach:
- 當然

New characters:
- 當
- 然

Source phrase:
- 當然記得！

Integrated dialogue work:
- reconstruct turns 1–6 in learner-safe form;
- explicitly retrieve the short turn 找我有什麼事？ and birthday confirmation 對不對？;
- do not create 對不對 as new canonical vocabulary.

Core activities:
- handwriting 當 / 然;
- meaning/pinyin retrieval;
- short dialogue order;
- source listening-style comprehension.

### u37-review — Unit 37 Review

Must independently retrieve:
- all 10 canonical new entries;
- all 4 new characters;
- 怎麼 reaction sense;
- 樂 lè reading in 快樂;
- phone formula 我就是;
- the difference between 忘 and 記得;
- source dialogue sequence.

Suggested review composition:
- character match + one build + one memory;
- pinyin/meaning selects;
- expression-context selects;
- one dialogue reconstruction;
- one listening item;
- one transfer prompt: friend calls and reminds you of a birthday.

## Pinyin Search / Mega Challenge

Eligible after teaching:
- 生日
- 快樂
- 回來
- 啊
- 忘
- 記得
- 當然
- 生日快樂
- 我就是
- 好久不見

Not new challenge entries:
- 怎麼
- 臺東
- source proper names

---

# Unit 38 blueprint — Make the Plan

## Unit identity

Proposed label: **Language exchange, politeness & meeting plans**

Proposed title: **I'll See You After Class**

Primary goal:
- talk about a language exchange;
- respond politely;
- say “celebrate a birthday”;
- arrange when/where to meet;
- use 一…就… for an immediately following event.

Suggested banner:
- 一下課，就去找你
- Yí xiàkè, jiù qù zhǎo nǐ

Suggested goal:
- 明天我一下課，就去你們學校找你。
- Míngtiān wǒ yí xiàkè, jiù qù nǐmen xuéxiào zhǎo nǐ.
- “Tomorrow, as soon as class ends, I'll go to your school to find you.”

Grammar:
- u38-yi-jiu

## Source coverage

Dialogue I turns 7–14:
7. 當然記得！語言交換的時候，你那麼熱心教我西班牙文。
8. 不必客氣，妳也一樣。
9. 明天我想請你吃晚飯，給你過生日。
10. 妳太客氣了！我們在哪裡見面呢？
11. 明天我一下課，就去你們學校找你。
12. 大概幾點？
13. 五點左右。
14. 好，我會在學校門口等妳。

Normalize 妳 → 你.

## Planned lessons

### u38-exchange — “Language Exchange”
Teach:
- 語言
- 交換

New characters:
- 交
- 換

Source combination:
- 語言交換

Retrieve:
- 語言中心 from Unit 34 without treating 語言 as already canonical standalone vocabulary.

Core activities:
- handwriting 交 / 換;
- word/phrase meaning;
- 語言 vs. 語言中心 vs. 語言交換;
- source line reconstruction.

### u38-enthusiastic — “So Enthusiastic”
Teach:
- 熱心
- 西班牙文

New character:
- 牙

New-sense review:
- 那麼 + state verb/adjective = “so / that…”, as in 那麼熱心.

Name support:
- 西班牙 may appear after 牙 is taught;
- contextual Name only, not a separate challenge item.

Core activities:
- handwriting 牙;
- 那麼 “so” vs. earlier 那麼 “then/in that case”;
- language-name recognition;
- source phrase order.

### u38-polite — “No Need to Be So Polite”
Teach canonical expressions:
- 不必客氣
- 太客氣

Also teach ordinary vocabulary:
- 一樣

New characters:
- 必
- 氣

Do not invent standalone 客氣 as a source vocabulary item. It may be explained inside the expressions.

Core activities:
- handwriting 必 / 氣;
- context: response to thanks vs. response to an invitation;
- phrase-level meaning;
- 你也一樣;
- explicitly note that Unit 41 later expands 一樣 into full comparison grammar.

### u38-celebrate — “Celebrate Your Birthday”
Teach:
- 過 = celebrate, specifically productive in 過生日

Source phrase:
- 明天我想請你吃晚飯，給你過生日。

Ownership migration:
- this is the canonical first vocabulary teaching of 過;
- character 過 remains review because Unit 33 already taught it inside 不過;
- Book 2 Unit 3 must later teach movement “go past / cross” as a new sense rather than first lexical ownership.

Core activities:
- 過生日 meaning;
- contrast 過生日 with later/known 不過 without claiming they are the same lexical use;
- invitation phrase reconstruction.

### u38-as-soon — “As Soon As Class Ends”
Teach grammar u38-yi-jiu.

Required rule content:
- A then B immediately;
- 一 before Event A;
- 就 before Event B;
- both follow the subject;
- repeated subject may be omitted;
- affirmative or negative events are possible;
- ordinary A-not-A is unavailable;
- questions may use 嗎 or 是不是.

Productive boundary:
- 嗎 question formation may be actively tested here;
- 是不是 may be shown as a source-permitted comprehension example with an explicit “formal confirmation questions come in Unit 41” note;
- do not test independent 是不是 production yet.

Safe source examples:
- 我一下課，就回來。
- 他一回國，就找工作。
- 我妹妹一回去，就給媽媽打電話。
- 我一下課，就去吃晚飯。
- 老闆今天早上一到公司，就不開心。

Exercise model:
- complete short dialogues from situational prompts;
- include at least one negative event and one independent transfer example.

### u38-meet — “Around Five at the Gate”
Teach:
- 左右
- 門口

New characters:
- 門
- 口

Source lines:
- 大概幾點？
- 五點左右。
- 好，我會在學校門口等你。

Important contrast:
- 大概 normally precedes an approximate amount/time;
- 左右 follows the number/time: 五點左右.

Character migration:
- 口 must become Book 1 first ownership here;
- Book 2 Unit 1 changes 口 to review while keeping its existing lesson/activity IDs/topology where possible.

This lesson also reconstructs Dialogue I turns 7–14.

### u38-review — Unit 38 Review

Must retrieve:
- all 10 canonical new entries;
- all 7 new characters;
- 那麼 degree sense;
- 西班牙 as contextual Name support;
- 過生日;
- 一樣 lexical “same/likewise”;
- 一…就… positive, negative, subject omission, and question restriction;
- 左右 placement;
- complete Dialogue I closure.

Suggested review:
- two character matches/builds;
- lexical pinyin/meaning;
- politeness-context choices;
- one 一…就… dialogue completion;
- one invalid A-not-A recognition;
- one source dialogue ordering;
- one appointment transfer task.

## Pinyin Search / Mega Challenge

Canonical entries:
- 語言
- 交換
- 熱心
- 西班牙文
- 一樣
- 過
- 左右
- 門口
- 不必客氣
- 太客氣

No duplicate entries:
- 那麼
- 西班牙

---

# Unit 39 blueprint — The Birthday Dinner

## Unit identity

Proposed label: **Gifts, birthday food & completed actions**

Proposed title: **What Did You Order?**

Primary goal:
- handle the opening of the birthday meal;
- ask about food restrictions/preferences;
- talk about completed actions;
- choose 不 vs. 沒（有） correctly.

Suggested banner:
- 我已經訂了豬腳麵線和蛋
- Wǒ yǐjīng dìng le zhūjiǎo miànxiàn hé dàn

Suggested goal:
- 我已經訂了豬腳麵線和蛋。
- “I already ordered pork knuckles, fine noodles, and an egg.”

Grammar:
- u39-verbal-le
- u39-bu-vs-mei

## Source coverage

Dialogue II turns 1–6:
1. 謝謝你請我到這麼有名的餐廳吃飯。
2. 哪裡，哪裡！這是我給你的禮物。
3. 謝謝！真開心，今年有臺灣朋友給我過生日。
4. 你想吃什麼？有沒有不吃的東西？
5. 我什麼都吃。
6. 我已經訂了豬腳麵線和蛋。等一下你多吃一點。

Preview boundaries:
- 我什麼都吃 is comprehension-only preview of Unit 40 Grammar IV;
- 多吃一點 is comprehension-only preview of Unit 40 Grammar V.

## Planned lessons

### u39-gift — “A Birthday Gift”
Teach:
- 禮物
- 哪裡哪裡

New characters:
- 禮
- 物

Source context:
- thanking someone for the meal;
- idiomatic 哪裡，哪裡 response.

Core activities:
- handwriting 禮 / 物;
- contrast literal 哪裡 “where” with fixed 哪裡，哪裡 “don't mention it / my pleasure”;
- source turn reconstruction.

### u39-this-year — “This Year's Birthday”
Teach:
- 今年

Retrieve:
- 過生日 from Unit 38
- 開心
- 臺灣朋友

Communicative source pattern:
- 你想吃什麼？
- 有沒有不吃的東西？

This dietary-preference language should be productively practiced even though it is not a numbered grammar section.

Preview:
- 我什麼都吃 may be glossed as “I eat anything/everything” without asking the learner to generate new totality sentences yet.

### u39-ordered — “I Already Ordered It”
Teach:
- 訂

New character:
- 訂

Teach grammar u39-verbal-le.

Required grammar content:
- V + 了 marks a completed/taken-place event;
- compare completed vs. intended/future;
- negation is 沒（有） + V with **no verbal 了**;
- source yes/no question may use completed clause + 沒有?;
- do not translate verbal 了 as a simple past-tense suffix;
- explicitly distinguish this function from sentence-final changed-situation 了.

Contrast:
- 訂 = order/reserve in advance;
- 點 = order/select food in a restaurant.

Safe examples:
- 我買了三張車票。
- 今天早上我喝了一杯咖啡。
- 我昨天吃了很多東西。
- 他租了一個套房。 (adapted from source 漂亮 example to avoid untaught 漂/亮)

### u39-food — “Pork Knuckles, Noodles and Egg”
Teach:
- 豬腳
- 麵線
- 蛋

New characters:
- 豬
- 腳
- 蛋

Source phrase:
- 我已經訂了豬腳麵線和蛋。

Core activities:
- handwriting;
- food matching;
- verbal-了 retrieval through 訂了;
- listening.

### u39-a-little — “Eat a Little More”
Teach:
- 一點

Important contrast:
- 有一點 + description from Unit 16 = “a little/somewhat [state]”
- 一點 here = a small amount/some, as in 多吃一點.

Preview boundary:
- explain 多吃一點 as a source chunk;
- formal 多／少 + Verb production waits for Unit 40.

Verbal-了 question retrieval:
- completed-action + 沒有? pattern should be practiced with already-known vocabulary.

### u39-negation — “Not Doing vs. Didn't Do”
Teach grammar u39-bu-vs-mei.

Required source distinctions:

Action verbs:
- 不 = habitual non-action;
- 不 = intention not to act;
- 沒（有） = past non-occurrence.

State verbs:
- 不 only in the source system.

Process verbs:
- 沒（有） only in the source system.

Taiwan usage:
- preserve source note that 沒有 + V is more common in Taiwan than bare 沒 + V.

Critical 了 scope:
- verbal completed-action 了 disappears under 沒;
- this does **not** mean every negative clause forbids sentence-final 了;
- explicitly prepare for Unit 40 source sentence 現在大部分年輕人…不吃這些東西了.

Exercise model:
- choose 不 / 沒（有） and explain the reason/category;
- include action/state/process examples;
- no ambiguous distractors.

### u39-review — Unit 39 Review

Must retrieve:
- all 8 canonical new entries;
- all 6 new characters;
- 訂 vs. 點;
- 一點 vs. 有一點;
- verbal 了 vs. sentence-final 了;
- 沒 + V with no verbal 了;
- 不 vs. 沒 by verb type/meaning;
- dietary preference question;
- Dialogue II turns 1–6.

Suggested review:
- character writing/match;
- food listening;
- completed vs. intended action;
- correct/incorrect negative-了 item;
- 不/沒 reasoning;
- short birthday-meal dialogue;
- one transfer question asking a friend what they do not eat.

## Pinyin Search / Mega Challenge

Canonical entries:
- 禮物
- 今年
- 訂
- 豬腳
- 麵線
- 蛋
- 一點
- 哪裡哪裡

No new canonical entry:
- 了

---

# Unit 40 blueprint — Food and Birthday Customs

## Unit identity

Proposed label: **Food preferences, totality & birthday customs**

Proposed title: **What Does Everyone Eat?**

Primary goal:
- say everyone/everything/everywhere and nobody/nothing/nowhere;
- say do more / do less;
- discuss Taiwanese birthday-food customs.

Suggested banner:
- 我什麼都吃
- Wǒ shénme dōu chī

Suggested goal:
- 我什麼都吃。你多吃一點。
- “I eat anything. Have a little more.”

Grammar:
- u40-questionword-totality
- u40-more-less-verb

## Source coverage

Dialogue II turns 7–9:
7. 臺灣人過生日是不是都吃這些東西？
8. 對啊！這是傳統，不過，現在大部分年輕人過生日不吃這些東西了。
9. 那麼，你們過生日吃什麼呢？

Unit 40 also formally retrieves previews from Unit 39:
- 我什麼都吃;
- 多吃一點.

Preview boundary:
- 是不是 in turn 7 remains comprehension-only until Unit 41.

## Planned lessons

### u40-everything — “Everything and Everyone”
Teach grammar u40-questionword-totality, affirmative branch.

Required forms:
- 誰都…
- 哪裡都…
- 什麼都…
- 什麼時候都…
- 怎麼 + V + 都…

Core source anchor:
- 我什麼都吃。

Teach the conceptual shift:
- the question word is not asking a question here;
- with 都 it denotes total inclusion.

Exercise model:
- transform ordinary lists/generalizations into totality patterns;
- include all five source question-word categories across Unit 40, not only 什麼.

### u40-nothing — “Nobody, Nothing, Nowhere”
Continue u40-questionword-totality, negative/question branch.

Required:
- question word + 都 or 也 + 不 / 沒;
- negative marker comes after 都 / 也;
- total exclusion;
- questions with this pattern use 嗎 according to the source.

Source-style examples:
- 誰也不…
- 哪裡都沒…
- 什麼也不…
- 什麼時候都不…
- 怎麼做都不好吃.

Core activities:
- choose 都 vs. 也 where both source-valid;
- position 不 / 沒;
- rewrite into all-exclusive patterns;
- reject invalid word order.

### u40-tradition — “Birthday Tradition”
Teach:
- 傳統

New characters:
- 傳
- 統

Source turn:
- 這是傳統。

Retrieve:
- 臺灣人
- 過生日
- 豬腳麵線

Cultural context may briefly explain that the source identifies pork knuckles/fine noodles/egg as traditional birthday food, without importing unrelated new vocabulary.

### u40-most-young — “Most Young People”
Teach:
- 大部分
- 年輕

New characters:
- 部
- 輕

Source line:
- 現在大部分年輕人過生日不吃這些東西了。

Critical retrieval:
- explicitly contrast sentence-final changed-situation 了 here with Unit 39's verbal completed-action 了;
- this sentence is the best source proof that “negative sentences cannot contain 了” is false.

Core activities:
- phrase meaning;
- handwriting;
- changed-situation comprehension;
- turn 7–8 dialogue reconstruction.

### u40-more-less — “Do More, Do Less”
Teach grammar u40-more-less-verb.

Required:
- pre-verbal 多 = do more than planned/usual;
- pre-verbal 少 = do less/fewer than planned/usual;
- may refer to past or future;
- 一點 often modifies the object.

Retrieve:
- 一點 from Unit 39;
- 多 / 少 earlier quantity meanings.

Source-style examples:
- 少買東西
- 多看書，少看電視
- 多穿衣服
- 多學一點中文
- 多做了一點菜
- 少做一點功課

Exercise model:
- give suggestions from situations;
- one past-event item and one future item;
- contrast quantity 多/少 with pre-verbal action-modifying 多/少.

### u40-customs — “What Do You Eat on Birthdays?”
Integrate:
- Dialogue II turns 7–9;
- question-word totality;
- birthday-food vocabulary from Unit 39;
- tradition / younger-generation change;
- 多／少 + Verb.

Source turn:
- 那麼，你們過生日吃什麼呢？

This lesson prepares cultural comparison but does not yet productively teach 跟…一樣.

Integrated Activity II preparation:
- learner states what people in one context do/eat;
- learner notices same/different ideas, with full comparison grammar deferred.

### u40-review — Unit 40 Review

Must retrieve:
- 傳統
- 年輕
- 大部分
- 4 new characters;
- all five affirmative totality question-word patterns;
- negative 都/也 + 不/沒;
- 嗎 question restriction;
- 多/少 pre-verbal meaning;
- 一點 combination;
- sentence-final 了 contrast;
- Dialogue II turns 7–9.

Suggested review:
- character match/build;
- totality transformations;
- negative word order;
- source dialogue reconstruction;
- one more/less recommendation task;
- birthday-custom transfer.

## Pinyin Search / Mega Challenge

Canonical entries:
- 傳統
- 年輕
- 大部分

No duplicate entries:
- 都
- 也
- 多
- 少
- 那麼
- 是不是 (not yet formally taught)

---

# Unit 41 blueprint — Same, Different and Best Wishes

## Unit identity

Proposed label: **Confirmation, comparison & birthday wishes**

Proposed title: **Happy Birthday and Best Wishes**

Primary goal:
- ask for confirmation with 是不是;
- compare people/things with 跟…一樣;
- use 對 + person;
- give and respond to birthday wishes;
- complete all Lesson 13 outcomes.

Suggested banner:
- 祝你生日快樂
- Zhù nǐ shēngrì kuàilè

Suggested goal:
- 祝你生日快樂、萬事如意、心想事成。
- “Happy birthday; may everything go your way and all your wishes come true.”

Grammar:
- u41-shibushi
- u41-gen-yiyang

## Source coverage

Dialogue II turns 10–13:
10. 跟你們一樣，吃蛋糕。今天我也訂了一個生日蛋糕。
11. 妳對我真好。
12. 安同，祝你生日快樂、萬事如意、心想事成。
13. 謝謝！謝謝！

Adapt:
- 妳 → 你;
- speaker name may be omitted in learner Chinese or represented in romanization.

Unit 41 also retrieves turn 7's 是不是 question after formal teaching.

## Planned lessons

### u41-cake — “The Same Birthday Food”
Teach:
- 蛋糕

New character:
- 糕

Source line:
- 跟你們一樣，吃蛋糕。
- 今天我也訂了一個生日蛋糕。

Boundary:
- the first source line may be understood as “same as you” here;
- full productive 跟…一樣 is taught after 是不是 to preserve textbook Grammar VI → VII order.

Core activities:
- handwriting 糕;
- cake vocabulary;
- retrieve 訂了;
- comprehension of the comparison line without yet asking learners to generate novel comparisons.

### u41-confirm — “You're Confirming, Right?”
Teach grammar u41-shibushi.

Required function:
- seeks confirmation of information already known/apparent;
- not simply a neutral substitute for every 嗎 or A-not-A question.

Core structure:
- Subject + 是不是 + VP?

Required contrasts:
- neutral 嗎 question;
- ordinary A-not-A question;
- 是不是 confirmation.

Use learner-safe adaptation of source bank example:
- 你有錢嗎？
- 你有沒有錢？
- 你是不是有錢？

Source restrictions/examples:
- 你是不是比他高？
- 你是不是最近太忙了？
- ordinary A-not-A is unavailable in the source's 比 / 太…了 examples.

Retrieve Dialogue II:
- 臺灣人過生日是不是都吃這些東西？

Exercise model:
- insert 是不是 in the correct position;
- choose whether the context calls for neutral new information or confirmation.

### u41-same — “The Same as…”
Teach grammar u41-gen-yiyang, positive/basic branch.

Required structures:
- A 跟 B 一樣
- A 跟 B 一樣 + property/state
- same object/result;
- equal degree;
- same preference/activity.

Safe examples:
- 我的生日跟她的生日一樣。
- 我跟我妹妹一樣高。
- 我跟我朋友一樣喜歡看電視。
- 跟你們一樣，吃蛋糕。

Retrieve:
- 一樣 from Unit 38;
- 跟 from Unit 24.

### u41-different — “Same or Different?”
Continue u41-gen-yiyang, negation/questions.

Required scope distinction:
1. A 跟 B **不一樣** … = the two differ in the relevant quality.
2. A **不跟 B 一樣** … = B is not the comparison target; another target may follow.

Adapt source 小王 example to avoid 王:
- 他不跟我一樣高，跟弟弟一樣高。

Questions:
- 一樣不一樣？
- 是不是一樣？
- 是不是跟…一樣 + property?

Exercise model:
- positive vs. negative scope;
- question formation;
- comparison writing/ordering;
- cultural comparison prompt.

### u41-wishes — “Kind to Me, Best Wishes”
Teach:
- 對 + person prepositional use (review word, new productive sense)
- 祝
- 萬事如意
- 心想事成

New characters:
- 祝
- 如

Source lines:
- 你對我真好。
- 祝你生日快樂、萬事如意、心想事成。
- 謝謝！謝謝！

Do not create a fake numbered grammar section for 祝. Teach a small lexical-syntactic frame:
- 祝 + person + wish

Do not decompose 萬事如意 / 心想事成 into invented productive grammar. Teach them as conventional fixed wishes.

Core activities:
- handwriting 祝 / 如;
- expression matching;
- appropriate response to a wish;
- write/build a short birthday-card line.

### u41-capstone — “Birthday Across Cultures”
This is the Lesson 13 integration lesson.

It must independently practice all four source outcomes:

1. **Phone appointment**
   - open a call;
   - explain the birthday purpose;
   - arrange when/where/how to meet;
   - use 一…就… naturally.

2. **Dietary preferences**
   - ask 你想吃什麼？
   - ask 有沒有不吃的東西？
   - answer with totality where appropriate.

3. **Compare cultures**
   - use 跟…一樣 / 不一樣;
   - compare birthday food/customs;
   - retrieve 傳統 / 大部分 / 年輕.

4. **Give/respond to wishes**
   - 祝你生日快樂;
   - one fixed four-character wish;
   - appropriate 謝謝 response.

The capstone should use newly composed scenarios rather than only replaying the source dialogue.

### u41-review — Unit 41 + Lesson 13 Review

This review is broader than a normal unit review.

Unit 41 retrieval:
- 蛋糕
- 祝
- 萬事如意
- 心想事成
- 3 new characters
- 對 + person
- 是不是
- 跟…一樣 positive/negative/questions

Lesson 13 cumulative retrieval:
- representative vocabulary from Units 37–40;
- all seven formal grammar sections;
- phone language;
- dietary-preference language;
- birthday-custom language;
- wishes;
- source dialogue arc.

The review should not attempt to repeat all 35 canonical entries mechanically in one giant quiz. Every entry must already be reviewed within its owning unit. Unit 41's cumulative section should sample earlier material to prove integrated mastery.

## Pinyin Search / Mega Challenge

Canonical entries:
- 蛋糕
- 祝
- 萬事如意
- 心想事成

No duplicate canonical entry:
- 對

---

# Cross-unit source ledger audit

## Vocabulary I / Name / Phrase accounting

| Source item | Final treatment |
| --- | --- |
| 生日 | U37 NEW |
| 快樂 | U37 NEW; 樂 new reading lè |
| 回來 | U37 NEW |
| 啊 | U37 NEW exact word; character review |
| 怎麼 | U37 REVIEW/new reaction sense |
| 忘（了） | U37 NEW 忘; 了 only phrase preview |
| 記得 | U37 NEW |
| 當然 | U37 NEW |
| 語言 | U38 NEW standalone word |
| 交換 | U38 NEW |
| 那麼 | U38 REVIEW/new degree sense |
| 熱心 | U38 NEW |
| 西班牙文 | U38 NEW |
| 一樣 | U38 NEW lexical; Grammar VII later |
| 過 | U38 NEW lexical ownership, celebrate |
| 左右 | U38 NEW |
| 門口 | U38 NEW |
| 西班牙 | U38 contextual Name support |
| 生日快樂 | U37 canonical expression |
| 我就是 | U37 canonical phone expression |
| 好久不見 | U37 canonical expression |
| 不必客氣 | U38 canonical expression |
| 太客氣 | U38 canonical expression |

All 23 Vocabulary I / Name / Phrase entries are assigned.

## Vocabulary II / Phrase accounting

| Source item | Final treatment |
| --- | --- |
| 禮物 | U39 NEW |
| 今年 | U39 NEW |
| 訂 | U39 NEW |
| 了 | U39 REVIEW/new grammar function |
| 豬腳 | U39 NEW |
| 麵線 | U39 NEW |
| 蛋 | U39 NEW |
| 一點 | U39 NEW exact expression |
| 傳統 | U40 NEW |
| 年輕 | U40 NEW |
| 蛋糕 | U41 NEW |
| 對 | U41 REVIEW/new prepositional use |
| 祝 | U41 NEW |
| 哪裡哪裡 | U39 canonical expression |
| 大部分 | U40 canonical expression |
| 萬事如意 | U41 canonical expression |
| 心想事成 | U41 canonical expression |

All 17 Vocabulary II / Phrase entries are assigned.

Total source-listed entries = 23 + 17 = **40 / 40**.

## Dialogue accounting

- Dialogue I = **14 / 14** turns assigned.
- Dialogue II = **13 / 13** turns assigned.

No short reply is intentionally dropped.

## Grammar accounting

- Grammar I → U38
- Grammar II → U39
- Grammar III → U39
- Grammar IV → U40
- Grammar V → U40
- Grammar VI → U41
- Grammar VII → U41

Total = **7 / 7**.

## Activity demand accounting

- Grammar I dialogue completion → U38 productive 一…就…
- Grammar II 做了 / 沒做 listening → U39 completed-action listening
- Grammar III choose/explain 不 / 沒 → U39 reasoning items
- Grammar IV all-inclusive rewrite → U40 transformation items
- Grammar V situational 多/少 suggestions → U40 productive suggestions
- Grammar VI 是不是 insertion → U41 placement/confirmation items
- Grammar VII comparison writing → U41 comparison production

Integrated activities:
- Night Market / preferences → U39–40
- Birthday culture comparison → U40–41
- Calling a Friend → U37–38 + U41 capstone
- Congratulatory Words → U41

## Final learning-objective accounting

1. phone appointments → Units 37–38; capstone U41
2. dietary preferences → Units 39–40; capstone U41
3. compare cultures → Units 40–41; capstone U41
4. give/respond to wishes → Unit 41

Total = **4 / 4**.

---

# Special-case implementation contract

## 1. 妳
Normalize to 你 in learner-facing Chinese.

## 2. Speaker names
Do not create handwriting/vocabulary obligations for 怡君 / 安同. Romanized speaker labels are acceptable.

## 3. 花蓮
Do not leak 蓮. Preserve the source discourse in notes/context, but learner Chinese should avoid unscaffolded 花蓮 unless a later implementation deliberately teaches 蓮—which this blueprint does not recommend.

## 4. 西班牙
Contextual proper Name support only. 西班牙文 is the canonical lexical target.

## 5. 樂
Keep existing character ownership; teach the new reading lè in 快樂.

## 6. 怎麼
Keep Unit 24 lexical ownership. Unit 37 teaches reaction “How come / How could…?” through examples.

## 7. 那麼
Keep Unit 36 ownership. Unit 38 adds degree “so/that”; Unit 40 retrieves the earlier connective “then/in that case”.

## 8. 了
No new lexical ownership. Unit 39 teaches completed-action verbal 了 as grammar and contrasts it with sentence-final changed-situation 了.

Never teach:
- “了 = past tense”
- “negative sentences cannot contain 了”

Teach instead:
- completed verbal 了 disappears under 沒（有）;
- sentence-final 了 is an independent function and may occur after a negative clause.

## 9. 對
No duplicate canonical vocabulary. Unit 41 formalizes 對 + person “to/toward”.

## 10. 過
Migrate canonical vocabulary ownership from Book 2 Unit 3 to Unit 38:
- U38 meaning: celebrate, especially 過生日;
- B2 U3: later movement sense “go past / cross”, treated as new sense/review.

Preserve Book 2 existing lesson/activity IDs and step topology when reclassifying.

## 11. 口
Migrate chronological character ownership from Book 2 Unit 1 to Unit 38:
- U38 first teaches 口 through 門口;
- B2 U1 reuses 口 in 路口 as review.

Preserve Book 2 activity IDs/topology where possible; reword the existing 口 sequence as review rather than deleting steps.

## 12. 一點
Teach exact quantity expression in Unit 39. Contrast with prior 有一點 + description.

## 13. 訂 vs. 點
Direct contrast required in Unit 39:
- 訂 = order/reserve in advance;
- 點 = order/select food.

## 14. 一樣
Teach lexically in Unit 38. Grammar VII waits until Unit 41.

## 15. Grammar previews
Comprehension-only before formal teaching:
- 忘了 → general verbal 了 waits U39
- 我什麼都吃 → Grammar IV waits U40
- 多吃一點 → Grammar V waits U40
- 是不是 → Grammar VI waits U41
- 跟…一樣 → Grammar VII waits U41

No productive assessment before formal introduction.

## 16. Source-example glyph leakage
Do not blindly copy source examples containing untaught non-target glyphs:
- 漂、亮
- 玉、田
- 李
- 冷
- 銀
- 王

Use learner-safe adaptations listed in the unit blueprints.

---

# Technical pre-implementation requirements

Before coding Unit 37:

1. Read this Phase 2 blueprint and the Phase 1 source ledger; do not reread all previous units.
2. Read the generated cumulative index through Unit 36.
3. Read only the target unit's section of this blueprint plus the immediately preceding unit as needed.
4. Reserve the lesson IDs specified here.
5. Preserve the 35-entry canonical lexical allocation and 24-character allocation unless a source-backed defect is found.
6. If a defect is found, update this blueprint before silently implementing a different curriculum.

During implementation:

- introduce each NEW character before any learner-facing assessed use;
- use exact Traditional codepoints;
- hydrate stroke data using repository policy;
- no Simplified substitution;
- every answer key appears exactly once in its choices;
- every phrase token list reconstructs its displayed Traditional Chinese exactly;
- every formal new vocabulary/expression receives review retrieval;
- grammar review includes independent transfer, not only repetition of the teaching example;
- Pinyin Search normalization must resolve every canonical new entry;
- Mega Challenge eligibility starts only after the owning lesson is complete.

Book 2 migrations:
- apply the 過 lexical ownership repair and 口 character ownership repair no later than the Unit 38 implementation PR;
- retain Book 2 learner progress topology where possible.

---

# Phase 2 freeze decision

The five-unit structure is now frozen as:

- **Unit 37:** phone/birthday foundation
- **Unit 38:** language exchange + appointment + 一…就…
- **Unit 39:** birthday dinner + completed 了 + 不 vs. 沒（有）
- **Unit 40:** totality + 多／少 + birthday customs
- **Unit 41:** 是不是 + 跟…一樣 + wishes + Lesson 13 capstone

Vocabulary/expression allocation: **35 canonical NEW entries**.

Character allocation: **24 / 24 chronological new characters**.

Dialogue coverage: **27 / 27 turns**.

Formal grammar coverage: **7 / 7 sections**.

End-of-lesson outcomes: **4 / 4**.

Canonical-text normalization: the source display 「哪裡，哪裡！」 should be stored as canonical vocabulary text 哪裡哪裡 (no punctuation) for Pinyin Search / Mega Challenge consistency; learner-facing phrase cards may display source punctuation.

No learner-facing Unit 37–41 implementation is part of Phase 2.
