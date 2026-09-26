# Lesson 15 Activity Spec — Unit 45

Status: **Gate B PASS — frozen activity specification. Implementation pending.**

Frozen Gate-A identity: **Unit 45 — Symptoms and Feeling Sick**.  
Six teaching lessons plus review.  
Formal load: **12 NEW vocabulary, 12 NEW characters, 0 formal Lesson-15 grammar rules**.

## 1. Unit identity

Lessons:
- `u45-doctor` — At the Doctor
- `u45-runny-nose` — A Runny Nose
- `u45-head-appetite` — Head and Appetite
- `u45-throat` — Throat and Inflammation
- `u45-sick-fever` — Sick and Feverish
- `u45-how-long` — How Long Has It Been?
- `u45-review`

Source ownership:
- D1T01–D1T05;
- V001–V012;
- F001/F002 establishment;
- X002/X004 EXPANSION;
- X003/X005 REVIEW;
- X001 deferred contextual address handling.

No formal grammar is first-owned here. 生病 / 發炎 / 發燒 may be learned lexically, but G007 productive separable-verb insertion is not taught or inferred in Unit 45.

## 2. Canonical NEW vocabulary

| Text | Pinyin | Meaning | Lesson |
|---|---|---|---|
| 醫生 | yīshēng | doctor | u45-doctor |
| 一直 | yìzhí | continuously; all the way | u45-runny-nose |
| 流 | liú | to flow | u45-runny-nose |
| 鼻水 | bíshuǐ | nasal mucus; a runny nose | u45-runny-nose |
| 頭 | tóu | head | u45-head-appetite |
| 痛 | tòng | painful | u45-head-appetite |
| 胃口 | wèikǒu | appetite | u45-head-appetite |
| 差 | chā | poor; bad | u45-head-appetite |
| 喉嚨 | hóulóng | throat | u45-throat |
| 發炎 | fāyán | to be inflamed | u45-throat |
| 生病 | shēngbìng | to fall ill / be sick | u45-sick-fever |
| 發燒 | fāshāo | to have a fever | u45-sick-fever |

Pronunciation guardrail: 差 is **chā** here. Do not reuse a different familiar reading.

## 3. Exact phrase/support records

These records are learner-facing explanation/context cards and may be referenced by `phrase` / `order` steps.

### Meaning-first lexical EXPLAIN cards

These cards are mandatory learner-facing teaching, not answer-feedback. Each appears after any required NEW-character lifecycle for the words on the card and before the first assessed lexical select.

#### u45-doctor-lex
- **醫生 yīshēng** — doctor

#### u45-runny-lex
- **一直 yìzhí** — continuously; all the way
- **流 liú** — to flow
- **鼻水 bíshuǐ** — nasal mucus; a runny nose

#### u45-head-lex
- **頭 tóu** — head
- **痛 tòng** — painful; hurts
- **胃口 wèikǒu** — appetite
- **差 chā** — poor; bad in **胃口很差**

#### u45-throat-lex
- **喉嚨 hóulóng** — throat
- **發炎 fāyán** — to be inflamed

#### u45-sick-lex
- **生病 shēngbìng** — to fall ill / be sick
- **發燒 fāshāo** — to have a fever


### u45-health-inquiry
- text: **哪裡不舒服？**
- pinyin: **Nǎlǐ bù shūfu?**
- meaning: **Where do you feel unwell?**
- note: Health-condition use of known 哪裡 + 不舒服; this is X002/F001 expansion.

### u45-runny-source
- text: **我一直流鼻水。**
- pinyin: **Wǒ yìzhí liú bíshuǐ.**
- meaning: **I have continuously had a runny nose.**

### u45-head-appetite-source
- text: **頭很痛，胃口很差。**
- pinyin: **Tóu hěn tòng, wèikǒu hěn chā.**
- meaning: **My head hurts, and my appetite is poor.**

### u45-totality-review
- text: **什麼東西都不想吃。**
- pinyin: **Shénme dōngxi dōu bù xiǎng chī.**
- meaning: **I don't want to eat anything.**
- note: REVIEW of Unit-40 question-word + 都 totality; not a new Lesson-15 rule.

### u45-duration-question
- text: **大概多久了？**
- pinyin: **Dàgài duōjiǔ le?**
- meaning: **About how long has it been?**

### u45-duration-answer
- text: **已經四、五天了。**
- pinyin: **Yǐjīng sì, wǔ tiān le.**
- meaning: **It has already been four or five days.**

### u45-throat-source
- text: **喉嚨有一點發炎。**
- pinyin: **Hóulóng yǒu yìdiǎn fāyán.**
- meaning: **The throat is a little inflamed.**
- note: 有一點 + state is REVIEW from Unit 16.

### u45-sick-basic
- text: **我生病了。**
- pinyin: **Wǒ shēngbìng le.**
- meaning: **I am sick.**
- note: Lexical use only; no G007 separation.

### u45-fever-basic
- text: **我有一點發燒。**
- pinyin: **Wǒ yǒu yìdiǎn fāshāo.**
- meaning: **I have a slight fever.**

### u45-dialogue-1-5
Learner-facing adapted source dialogue:
- **醫生：你哪裡不舒服？**
- **病人：我一直流鼻水，頭很痛，胃口很差。什麼東西都不想吃。**
- **醫生：大概多久了？**
- **病人：已經四、五天了。**
- **醫生：我看看你的喉嚨。喉嚨有一點發炎。**

Pinyin:
- **Yīshēng: Nǐ nǎlǐ bù shūfu?**
- **Bìngrén: Wǒ yìzhí liú bíshuǐ, tóu hěn tòng, wèikǒu hěn chā. Shénme dōngxi dōu bù xiǎng chī.**
- **Yīshēng: Dàgài duōjiǔ le?**
- **Bìngrén: Yǐjīng sì, wǔ tiān le.**
- **Yīshēng: Wǒ kànkan nǐ de hóulóng. Hóulóng yǒu yìdiǎn fāyán.**

Source-safety note: 白小姐 / 白 and 妳 are not productive requirements. Direct address is normalized to known 你; speaker role labels replace proper-name glyphs.

## 4. Character lifecycle IDs

Each prefix expands to:
`<prefix>-intro → <prefix>-trace → <prefix>-build → <prefix>-complete → <prefix>-memory`.

| Lesson | Character | Prefix |
|---|---|---|
| u45-doctor | 醫 | u45-doctor-醫 |
| u45-runny-nose | 直 | u45-runny-nose-直 |
| u45-runny-nose | 流 | u45-runny-nose-流 |
| u45-runny-nose | 鼻 | u45-runny-nose-鼻 |
| u45-head-appetite | 痛 | u45-head-appetite-痛 |
| u45-head-appetite | 胃 | u45-head-appetite-胃 |
| u45-throat | 喉 | u45-throat-喉 |
| u45-throat | 嚨 | u45-throat-嚨 |
| u45-throat | 發 | u45-throat-發 |
| u45-throat | 炎 | u45-throat-炎 |
| u45-sick-fever | 病 | u45-sick-fever-病 |
| u45-sick-fever | 燒 | u45-sick-fever-燒 |

For each prefix, the character's recognition/reading card precedes `intro`, and the first vocabulary select requiring that character follows `memory`.

## 5. Teaching lessons — exact assessed payloads

### u45-doctor — At the Doctor

Order:
1. 醫 recognition/read card: 醫 **yī**, seen in 醫生.
2. 醫 lifecycle `u45-doctor-醫-*`.
**Mandatory before step 3:** EXPLAIN `u45-doctor-lex`.
3. select `u45-doctor-s1`
   - prompt: **醫生 means…**
   - options: [`doctor`, `pharmacy`, `medicine`]
   - answer: **doctor**
   - explanation: 醫生 yīshēng means “doctor.”
4. phrase `u45-health-inquiry` — EXPLAIN X002 health-condition use.
5. select `u45-doctor-s2`
   - prompt: **Which question asks where someone feels unwell?**
   - options: [`哪裡不舒服？`, `哪裡下雨？`, `你去哪裡？`]
   - answer: **哪裡不舒服？**
   - explanation: 哪裡不舒服？ is the Lesson-15 health inquiry.
6. listen `u45-doctor-l1`
   - audioText: **你哪裡不舒服？**
   - prompt: **What is the speaker asking about?**
   - options: [`where the person feels unwell`, `where the person lives`, `what the weather is like`]
   - answer: **where the person feels unwell**
   - explanation: The question asks about the location of discomfort.
7. order `u45-doctor-o1` using `u45-health-inquiry`
   - tokens: [`哪裡`, `不舒服`]

### u45-runny-nose — A Runny Nose

Order:
1. 直 recognition/read card: 直 **zhí**; 一直 **yìzhí**.
2. 直 lifecycle.
3. 流 recognition/read card: 流 **liú**.
4. 流 lifecycle.
5. 鼻 recognition/read card: 鼻 **bí**; 鼻水 **bíshuǐ**.
6. 鼻 lifecycle.
**Mandatory before step 7:** EXPLAIN `u45-runny-lex`.
7. select `u45-runny-s1`
   - prompt: **一直 means…**
   - options: [`continuously`, `only once`, `a little`]
   - answer: **continuously**
   - explanation: 一直 describes something continuing without interruption in this symptom report.
8. select `u45-runny-s2`
   - prompt: **流 means…**
   - options: [`to flow`, `to rest`, `to hurt`]
   - answer: **to flow**
   - explanation: 流 liú means “to flow.”
9. select `u45-runny-s3`
   - prompt: **鼻水 means…**
   - options: [`a runny nose / nasal mucus`, `a sore throat`, `a fever`]
   - answer: **a runny nose / nasal mucus**
   - explanation: 鼻水 bíshuǐ is nasal mucus; 流鼻水 describes having a runny nose.
10. phrase `u45-runny-source`.
11. listen `u45-runny-l1`
   - audioText: **我一直流鼻水。**
   - prompt: **Which symptom do you hear?**
   - options: [`流鼻水`, `不舒服`, `醫生`]
   - answer: **流鼻水**
   - explanation: The audio says the speaker continuously has a runny nose.
12. order `u45-runny-o1` using `u45-runny-source`
   - tokens: [`我`, `一直`, `流鼻水`]

### u45-head-appetite — Head and Appetite

Order:
1. note card: 頭 **tóu** is a NEW standalone vocabulary item “head”; its character is already known and is not re-owned.
2. 痛 recognition/read card: 痛 **tòng**.
3. 痛 lifecycle.
4. 胃 recognition/read card: 胃 **wèi**; 胃口 **wèikǒu**.
5. 胃 lifecycle.
**Mandatory before step 6:** EXPLAIN `u45-head-lex`.
6. select `u45-head-s1`
   - prompt: **頭 means…**
   - options: [`head`, `throat`, `stomach/appetite`]
   - answer: **head**
   - explanation: 頭 tóu means “head.”
7. select `u45-head-s2`
   - prompt: **痛 means…**
   - options: [`painful / hurts`, `healthy`, `oily`]
   - answer: **painful / hurts**
   - explanation: 痛 tòng describes pain.
8. select `u45-head-s3`
   - prompt: **胃口 means…**
   - options: [`appetite`, `head`, `medicine`]
   - answer: **appetite**
   - explanation: 胃口 wèikǒu means “appetite.”
9. pronunciation card: 差 in 胃口很差 is **chā**, “poor/bad.”
10. select `u45-head-s4`
   - prompt: **In 胃口很差, 差 is pronounced…**
   - options: [`chā`, `chà`, `chāi`]
   - answer: **chā**
   - explanation: The Lesson-15 source gives 差 chā for “poor/bad” in this expression.
11. phrase `u45-head-appetite-source`.
12. select `u45-head-s5`
   - prompt: **Which sentence says the speaker's appetite is poor?**
   - options: [`胃口很差。`, `頭很痛。`, `我一直流鼻水。`]
   - answer: **胃口很差。**
   - explanation: 胃口很差 means “the appetite is poor.”
13. phrase `u45-totality-review` — REVIEW Unit-40 totality.
14. select `u45-head-s6`
   - prompt: **In 什麼東西都不想吃, what does 什麼東西…都 express?**
   - options: [`totality under negation: not wanting to eat anything`, `a question asking which food the person wants`, `a duration question`]
   - answer: **totality under negation: not wanting to eat anything**
   - explanation: This retrieves the earlier question-word + 都 pattern; G001 is not taught until Unit 46.

### u45-throat — Throat and Inflammation

Order:
1. 喉 recognition/read card: 喉 **hóu**.
2. 喉 lifecycle.
3. 嚨 recognition/read card: 嚨 **lóng** in 喉嚨.
4. 嚨 lifecycle.
5. 發 recognition/read card: 發 **fā** in 發炎 / 發燒.
6. 發 lifecycle.
7. 炎 recognition/read card: 炎 **yán**.
8. 炎 lifecycle.
**Mandatory before step 9:** EXPLAIN `u45-throat-lex`.
9. select `u45-throat-s1`
   - prompt: **喉嚨 means…**
   - options: [`throat`, `appetite`, `head`]
   - answer: **throat**
   - explanation: 喉嚨 hóulóng means “throat.”
10. select `u45-throat-s2`
    - prompt: **發炎 means…**
    - options: [`to be inflamed`, `to have a fever`, `to rest`]
    - answer: **to be inflamed**
    - explanation: 發炎 fāyán means “to be inflamed.”
11. review card: **有一點 + state** = slight degree; this is known Unit-16 language.
12. phrase `u45-throat-source`.
13. select `u45-throat-s3`
    - prompt: **Which best matches 喉嚨有一點發炎？**
    - options: [`The throat is a little inflamed.`, `The throat is much better.`, `The throat has been sore for four days.`]
    - answer: **The throat is a little inflamed.**
    - explanation: 有一點 gives a slight degree here.
14. listen `u45-throat-l1`
    - audioText: **喉嚨有一點發炎。**
    - prompt: **What body part do you hear?**
    - options: [`喉嚨`, `頭`, `胃口`]
    - answer: **喉嚨**
    - explanation: The audio describes the throat.
15. order `u45-throat-o1` using `u45-throat-source`
    - tokens: [`喉嚨`, `有一點`, `發炎`]

### u45-sick-fever — Sick and Feverish

Order:
1. 病 recognition/read card: 病 **bìng**.
2. 病 lifecycle.
3. 燒 recognition/read card: 燒 **shāo** in 發燒.
4. 燒 lifecycle.
**Mandatory before step 5:** EXPLAIN `u45-sick-lex`.
5. select `u45-sick-s1`
   - prompt: **生病 means…**
   - options: [`to be/fall sick`, `to see a doctor`, `to recover`]
   - answer: **to be/fall sick**
   - explanation: 生病 shēngbìng means “to fall ill / be sick.”
6. phrase `u45-sick-basic`.
7. select `u45-sick-s2`
   - prompt: **發燒 means…**
   - options: [`to have a fever`, `to have a runny nose`, `to have a good appetite`]
   - answer: **to have a fever**
   - explanation: 發燒 fāshāo means “to have a fever.”
8. phrase `u45-fever-basic`.
9. select `u45-sick-s3`
   - prompt: **Which sentence reports a fever?**
   - options: [`我有一點發燒。`, `我一直流鼻水。`, `胃口很差。`]
   - answer: **我有一點發燒。**
   - explanation: 發燒 is the fever expression.
10. listen `u45-sick-l1`
    - audioText: **我生病了，還有一點發燒。**
    - prompt: **Which two ideas are stated?**
    - options: [`being sick and having a slight fever`, `having a good appetite and resting`, `going to a pharmacy and taking medicine`]
    - answer: **being sick and having a slight fever**
    - explanation: 生病 and 發燒 are both present.
11. safety card: 生病 is learned as a lexical item only. Do not split it productively yet; G007 comes in Unit 48.

### u45-how-long — How Long Has It Been?

Order:
1. EXPLAIN X004: known 大概 / 多久 / 已經 / day-duration language is integrated into a symptom-duration exchange.
2. phrase `u45-duration-question`.
3. phrase `u45-duration-answer`.
4. select `u45-duration-s1`
   - prompt: **Which question asks about how long a current condition has lasted?**
   - options: [`大概多久了？`, `哪裡不舒服？`, `什麼東西都不想吃？`]
   - answer: **大概多久了？**
   - explanation: 多久 asks duration; the final 了 fits the current-condition context.
5. select `u45-duration-s2`
   - prompt: **Which answer fits 大概多久了？**
   - options: [`已經四、五天了。`, `喉嚨有一點發炎。`, `我一直流鼻水。`]
   - answer: **已經四、五天了。**
   - explanation: The answer gives the duration up to now.
6. phrase `u45-dialogue-1-5` — full integrated D1T01–D1T05 after all dependencies.
7. listen `u45-duration-l1`
   - audioText: **大概多久了？已經四、五天了。**
   - prompt: **What information is being exchanged?**
   - options: [`duration of the condition`, `where the pharmacy is`, `how much medicine costs`]
   - answer: **duration of the condition**
   - explanation: The question and answer concern how long the condition has lasted.
8. order `u45-duration-o1` using `u45-duration-answer`
   - tokens: [`已經`, `四、五天`, `了`]
9. select `u45-dialogue-s1`
   - prompt: **Which sequence best matches the doctor visit so far?**
   - options: [
     `ask where it hurts → describe symptoms → ask duration → examine throat`,
     `compare rent → ask duration → buy medicine → discuss weather`,
     `ask about insurance → reject help → examine throat → compare actions`
     ]
   - answer: **ask where it hurts → describe symptoms → ask duration → examine throat**
   - explanation: That is the D1T01–D1T05 communicative arc.

## 6. Unit 45 review — exact step bank

### Listening
1. `u45-review-l1`
   - audioText: **我一直流鼻水。**
   - prompt: **Which symptom do you hear?**
   - options: [`流鼻水`, `發燒`, `胃口很好`]
   - answer: **流鼻水**
   - explanation: 流鼻水 is the runny-nose symptom.
2. `u45-review-l2`
   - audioText: **頭很痛，胃口很差。**
   - prompt: **Which two problems are mentioned?**
   - options: [`head pain and poor appetite`, `throat inflammation and fever`, `medicine and rest`]
   - answer: **head pain and poor appetite**
   - explanation: 頭很痛 + 胃口很差.
3. `u45-review-l3`
   - audioText: **喉嚨有一點發炎。**
   - prompt: **What is slightly inflamed?**
   - options: [`喉嚨`, `頭`, `鼻水`]
   - answer: **喉嚨**
   - explanation: The audio names the throat.

### Handwriting retrieval
4. `u45-review-醫` — complete 醫
5. `u45-review-直` — complete 直
6. `u45-review-流` — complete 流
7. `u45-review-鼻` — complete 鼻
8. `u45-review-痛` — complete 痛
9. `u45-review-胃` — complete 胃
10. `u45-review-喉` — complete 喉
11. `u45-review-嚨` — complete 嚨
12. `u45-review-發` — complete 發
13. `u45-review-炎` — complete 炎
14. `u45-review-病` — complete 病
15. `u45-review-燒` — complete 燒

### Independent NEW vocabulary retrieval
16. `u45-review-v1`: 醫生 → doctor / patient / pharmacy → **doctor**
17. `u45-review-v2`: 一直 → continuously / once / immediately after → **continuously**
18. `u45-review-v3`: 流 → flow / rest / sleep → **flow**
19. `u45-review-v4`: 鼻水 → runny nose / sore throat / appetite → **runny nose**
20. `u45-review-v5`: 頭 → head / throat / stomach → **head**
21. `u45-review-v6`: 痛 → painful / healthy / oily → **painful**
22. `u45-review-v7`: 胃口 → appetite / medicine / insurance → **appetite**
23. `u45-review-v8`
    - prompt: **Which reading/meaning pair is correct for Lesson-15 差?**
    - options: [`chā — poor/bad`, `chà — several`, `chāi — doctor`]
    - answer: **chā — poor/bad**
    - explanation: 胃口很差 uses chā.
24. `u45-review-v9`: 喉嚨 → throat / head / fever → **throat**
25. `u45-review-v10`: 發炎 → be inflamed / have a fever / vomit → **be inflamed**
26. `u45-review-v11`: 生病 → be sick / see a doctor / go home → **be sick**
27. `u45-review-v12`: 發燒 → have a fever / be inflamed / have poor appetite → **have a fever**

For simple rows 16–22 and 24–27, prompt is **“X means…”** and explanation is **“X means <answer>.”**

### Health inquiry / duration retrieval
28. `u45-review-f1`
    - prompt: **Which question starts a health check by asking where the discomfort is?**
    - options: [`哪裡不舒服？`, `大概多久了？`, `什麼東西都不想吃？`]
    - answer: **哪裡不舒服？**
    - explanation: This retrieves F001/X002.
29. `u45-review-f2`
    - prompt: **Which pair forms a natural duration exchange?**
    - options: [
      `大概多久了？／已經四、五天了。`,
      `哪裡不舒服？／大概多久了。`,
      `胃口怎麼樣？／我一直。`
      ]
    - answer: **大概多久了？／已經四、五天了。**
    - explanation: X004 integrates the question and duration-to-now answer.
30. `u45-review-f3`
    - prompt: **Which sentence uses the earlier Unit-40 question-word + 都 totality pattern?**
    - options: [`什麼東西都不想吃。`, `我一直流鼻水。`, `胃口很差。`]
    - answer: **什麼東西都不想吃。**
    - explanation: 什麼東西 + 都 expresses the earlier totality pattern under negation.

### Contextual reconstruction
31. order `u45-review-o1` using `u45-head-appetite-source`
    - tokens: [`頭很痛`, `胃口很差`]
32. order `u45-review-o2` using `u45-throat-source`
    - tokens: [`喉嚨`, `有一點`, `發炎`]

Review count: **32**. Listening: **3**. Every canonical NEW vocabulary item and every NEW character is independently retrieved.

## 7. Lifecycle coverage

| Target | Explain/recognize | Controlled practice | Contextual use | Retrieval | Delayed retrieval | Cumulative mixing |
|---|---|---|---|---|---|---|
| 醫生 + health inquiry | L1 char/meaning + X002 card | doctor-s1/s2 | D1T01 | review-v1/f1 | U46 doctor visit | U48 capstone |
| 一直/流/鼻水 | L2 char/lexical cards | runny-s1–s3 | D1T02 | review-v2–v4 | U46/U47 symptom recall | U48 health mix |
| 頭/痛/胃口/差 | L3 | head-s1–s6 | D1T02 | review-v5–v8 | U47 A005 prep | U48 A002/capstone |
| 喉嚨/發炎 | L4 | throat-s1–s3 | D1T05 | review-v9/v10 | U48 advice role-play | U48 capstone |
| 生病/發燒 | L5 | sick-s1–s3 | D1T06/D1T07 bridge later | review-v11/v12 | U46 cold lesson | U48 G007/advice |
| X004 duration | L6 explanation | duration-s1/s2 | D1T03–D1T04 | review-f2 | U47 health check | U48 capstone |

All 12 characters receive lesson-local recognition + lifecycle and review handwriting retrieval.

## 8. Search / Mega / deferred handling

- All 12 canonical NEW vocabulary forms get one Unit-45 ownership row and normal Mega eligibility only after the owning lesson is complete.
- Pinyin Search follows the existing global canonical lookup model; any writing-practice launch for Unit-45 NEW characters is locked until the owning lesson is complete.
- 一直 / 直 must later replace the Book-2 Unit-1 NEW ownership with review; do not leave duplicate ownership.
- 白 / 妳 / 玉 are not required in answers, handwriting, Search, or Mega. Learner-facing dialogue uses 你 and generic role labels.
- No productive G007 separation of 生病/發炎/發燒 occurs here.
- Standalone `practice-字` remains locked before first teaching for every Unit-45 NEW character.
