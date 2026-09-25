# Lesson 14 Activity Spec — Unit 43

Unit: **43 — How Long and What's About to Happen**

This file is normative for Gate B together with `lesson14-activity-spec.md`.

## 1. Unit identity

- unit ID: `unit-43`
- title: **How Long and What's About to Happen**
- formal NEW vocabulary: 7
- lexical EXPANSION: 想 / 快 / 要
- NEW characters: 6
- formal grammar: G001–G003

## 2. Exact grammar records

### u43-completed-duration
- title: **Completed duration with verbal 了**
- pattern: **Subject + V + 了 + Duration / Subject + V + Object + V + 了 + Duration**
- explanation: **Use verbal 了 followed by a duration when an activity is viewed as completed. If a transitive verb keeps its object before the duration, repeat the verb before 了 + Duration: 打網球打了兩個鐘頭. If the object or location is fronted as the topic, the repeated verb is not required: 中文我只學了五個月. This integrates earlier duration grammar, object-repeat duration, and completed-action 了.**
- examples:
  1. 我在臺灣住了一年。 / Wǒ zài Táiwān zhù le yì nián. / I lived in Taiwan for one year.
  2. 我打網球打了兩個鐘頭。 / Wǒ dǎ wǎngqiú dǎ le liǎng ge zhōngtóu. / I played tennis for two hours.
  3. 中文我只學了五個月。 / Zhōngwén wǒ zhǐ xué le wǔ ge yuè. / I studied Chinese for only five months.
- remember: **Completed duration: verbal 了 + duration. With an object before the duration, repeat the verb; fronting the object/location can avoid the repetition.**

### u43-duration-to-now
- title: **Duration accumulated up to now**
- pattern: **Subject + V + 了 + Duration + 了**
- explanation: **Use the double-了 pattern for a duration accumulated up to the time of speaking. The situation may continue or may stop depending on context. Do not treat this as automatically “still continuing.” Contrast it with u43-completed-duration, which presents the duration as completed. 多久了 asks for the accumulated duration; 已經 often appears in this context.**
- examples:
  1. 我在臺灣住了半年多了。 / Wǒ zài Táiwān zhù le bànnián duō le. / I have been in Taiwan for a little over half a year.
  2. 她已經工作了兩個月了。 / Tā yǐjīng gōngzuò le liǎng ge yuè le. / She has worked for two months up to now.
  3. 他學中文學了三個星期了。 / Tā xué Zhōngwén xué le sān ge xīngqí le. / He has studied Chinese for three weeks up to now.
- remember: **One 了 after the verb + duration can present a completed duration; final 了 adds the “up to now” duration frame. Continuation depends on context.**

### u43-imminent
- title: **Something is about to happen**
- pattern: **快…了 / 要…了 / 快要…了**
- explanation: **These patterns present an event or change as imminent. 快 here means “soon/about to,” and 要 is the source auxiliary “will / going to” in this imminent-event system. The source notes that Taiwan Mandarin prefers the disyllabic 快要 form. Under the textbook's Lesson-14 rule, do not combine an explicit time word such as 明天 directly with 快要: *他明天快要回來了. Use this pattern when the context shows that the event is close, not as a generic future marker.**
- examples:
  1. 快下雨了。 / Kuài xiàyǔ le. / It is about to rain.
  2. 比賽要開始了。 / Bǐsài yào kāishǐ le. / The game is about to start.
  3. 爸爸快要到家了。 / Bàba kuài yào dào jiā le. / Dad is about to get home.
- remember: **Imminence, not generic future: 快／要／快要…了. The source prefers 快要 in Taiwan Mandarin and blocks explicit-time + 快要 in this Lesson-14 rule.**

## 3. Exact phrase records

### u43-only-basic
- text: **我只喝茶。**
- pinyin: **Wǒ zhǐ hē chá.**
- meaning: **I only drink tea.**
- note: Simple meaning-first card for 只 before the completed-duration grammar.
- tokens: [`我只喝茶`]

### u43-finished-stay
- text: **我在臺灣住了一年。**
- pinyin: **Wǒ zài Táiwān zhù le yì nián.**
- meaning: **I lived in Taiwan for one year.**
- note: G001 completed duration.
- tokens: [`我在臺灣`, `住了一年`]
- grammarIds: [`u43-completed-duration`]

### u43-tennis-duration
- text: **我打網球打了兩個鐘頭。**
- pinyin: **Wǒ dǎ wǎngqiú dǎ le liǎng ge zhōngtóu.**
- meaning: **I played tennis for two hours.**
- note: The object remains before the duration, so the verb repeats.
- tokens: [`我打網球`, `打了兩個鐘頭`]
- grammarIds: [`u43-completed-duration`]

### u43-only-chinese
- text: **中文我只學了五個月。**
- pinyin: **Zhōngwén wǒ zhǐ xué le wǔ ge yuè.**
- meaning: **I studied Chinese for only five months.**
- note: Fronted object/topic; 只 means only.
- tokens: [`中文`, `我只學了五個月`]
- grammarIds: [`u43-completed-duration`]

### u43-confirm-bridge
- text: **你昨天看電視看了三個鐘頭，對不對？**
- pinyin: **Nǐ zuótiān kàn diànshì kàn le sān ge zhōngtóu, duì bú duì?**
- meaning: **You watched TV for three hours yesterday, right?**
- note: **Teaching bridge before assessment:** 對不對 is a transparent confirmation form here, “right or not / right?”. It checks a proposition. It is source support, not a new formal numbered grammar rule.
- tokens: [`你昨天看電視`, `看了三個鐘頭`, `對不對`]

### u43-duration-now-source
- text: **我在臺灣住了半年多了。有一點想家。**
- pinyin: **Wǒ zài Táiwān zhù le bànnián duō le. Yǒu yìdiǎn xiǎng jiā.**
- meaning: **I have been in Taiwan for a little over half a year. I miss home a little.**
- note: Source B1L14-D1T07. Here 想 means “miss,” not “want to.”
- tokens: [`我在臺灣住了半年多了`, `有一點想家`]
- grammarIds: [`u43-duration-to-now`]

### u43-a002-model
- text: **你以前住在哪裡？你在那裡住了多久？**
- pinyin: **Nǐ yǐqián zhù zài nǎlǐ? Nǐ zài nàlǐ zhù le duōjiǔ?**
- meaning: **Where did you live before? How long did you live there?**
- note: Learner-safe question pair for the source A002 interview task. **Transfer instruction:** ask a classmate (or rehearse with an imagined partner), record the place and duration on paper, then report one result in Chinese.
- tokens: [`你以前住在哪裡`, `你在那裡住了多久`]
- grammarIds: [`u43-completed-duration`]

### u43-approx-time
- text: **每年差不多十二月開始下雪。**
- pinyin: **Měinián chàbuduō shí'èr yuè kāishǐ xiàxuě.**
- meaning: **It starts snowing around December each year.**
- note: Source B1L14-D1T03 support. This explicitly transfers known 差不多 to approximate time; contrast with duration + 多 in 半年多.
- tokens: [`每年`, `差不多十二月`, `開始下雪`]

### u43-duration-question
- text: **你在臺灣住了多久了？**
- pinyin: **Nǐ zài Táiwān zhù le duōjiǔ le?**
- meaning: **How long have you been in Taiwan up to now?**
- note: 多久了 asks for accumulated duration to the speech point.
- tokens: [`你在臺灣`, `住了多久了`]
- grammarIds: [`u43-duration-to-now`]

### u43-kuai-sense
- text: **快**
- pinyin: **kuài**
- meaning: **soon / about to (Lesson-14 sense)**
- note: This card explicitly teaches the Lesson-14 sense before G003. Do not change the earlier canonical vocabulary gloss.
- tokens: [`快`]

### u43-yao-sense
- text: **要**
- pinyin: **yào**
- meaning: **will / going to in an imminent-event context (Lesson-14 sense)**
- note: This card explicitly teaches the Lesson-14 auxiliary sense before G003. Do not create a second canonical vocabulary row.
- tokens: [`要`]

### u43-newyear-basic
- text: **新年到了。我想回去看父母。**
- pinyin: **Xīnnián dào le. Wǒ xiǎng huíqù kàn fùmǔ.**
- meaning: **New Year has arrived. I want to go back to see my parents.**
- note: Meaning-first card for 新年 and 父母. It deliberately avoids the new imminence pattern until G003 is taught.
- tokens: [`新年到了`, `我想回去看父母`]

### u43-newyear-source
- text: **新年快到了。想回去看父母嗎？**
- pinyin: **Xīnnián kuài dào le. Xiǎng huíqù kàn fùmǔ ma?**
- meaning: **New Year is almost here. Do you want to go back to see your parents?**
- note: Source B1L14-D1T08, presented only after 快/要 and G003 have been explained.
- tokens: [`新年快到了`, `想回去看父母嗎`]
- grammarIds: [`u43-imminent`]

### u43-stopping
- text: **雨快要停了。**
- pinyin: **Yǔ kuài yào tíng le.**
- meaning: **The rain is about to stop.**
- note: Delayed retrieval of G003 with the new verb 停.
- tokens: [`雨`, `快要停了`]
- grammarIds: [`u43-imminent`]

### u43-return-plan
- text: **我打算十二月底回去。想跟我去玩嗎？**
- pinyin: **Wǒ dǎsuàn shí'èr yuè dǐ huíqù. Xiǎng gēn wǒ qù wán ma?**
- meaning: **I plan to go back at the end of December. Do you want to go travel/have fun with me?**
- note: Learner-safe preservation of B1L14-D1T09: the deferred country name is omitted, but the return plan and invitation are retained.
- tokens: [`我打算十二月底回去`, `想跟我去玩嗎`]

### u43-return-reason
- text: **因為我們只放十天的假，所以一月五號回來。**
- pinyin: **Yīnwèi wǒmen zhǐ fàng shí tiān de jià, suǒyǐ yī yuè wǔ hào huílái.**
- meaning: **Because we only have ten days off, we'll come back on January 5.**
- note: Source B1L14-D1T11; 因為…所以… is prior review.
- tokens: [`因為我們只放十天的假`, `所以一月五號回來`]

### u43-return-question
- text: **對了，你什麼時候回來？**
- pinyin: **Duì le, nǐ shénme shíhou huílái?**
- meaning: **By the way, when are you coming back?**
- note: Preserves the return-timing question in B1L14-D1T10 with 妳 normalized to 你.
- tokens: [`對了`, `你什麼時候回來`]

### u43-nextyear-source
- text: **冬天太冷了。不過，我想明年秋天去看紅葉。**
- pinyin: **Dōngtiān tài lěng le. Búguò, wǒ xiǎng míngnián qiūtiān qù kàn hóngyè.**
- meaning: **Winter is too cold. But I want to go see the red maple leaves next autumn.**
- note: Source B1L14-D1T10, preserving the travel-plan function without deferred speaker orthography.
- tokens: [`冬天太冷了`, `不過`, `我想明年秋天去看紅葉`]

### u43-trip-adapted
- text: **我去年五月出去玩了兩個星期。那個時候，風景很好看，我玩得非常開心。**
- pinyin: **Wǒ qùnián wǔ yuè chūqù wán le liǎng ge xīngqí. Nàge shíhou, fēngjǐng hěn hǎokàn, wǒ wán de fēicháng kāixīn.**
- meaning: **Last May I went away for two weeks. The scenery was nice, and I had a very good time.**
- note: Gate-A-approved learner-safe adaptation of B1L14-D1T06: no productive 紐約 and 好看 replaces untaught 漂亮.
- tokens: [`我去年五月出去玩了兩個星期`, `那個時候`, `風景很好看`, `我玩得非常開心`]
- grammarIds: [`u43-completed-duration`]

## 4. Character lifecycle IDs

Each expands to ordered `intro → trace → build → complete → memory`.

| Lesson | Character | ID prefix |
|---|---|---|
| u43-finished-duration | 只 | u43-finished-duration-只 |
| u43-new-year | 父 | u43-new-year-父 |
| u43-new-year | 母 | u43-new-year-母 |
| u43-stopping | 停 | u43-stopping-停 |
| u43-return-plan | 底 | u43-return-plan-底 |
| u43-next-year | 葉 | u43-next-year-葉 |

## 5. Teaching lessons — exact assessed payloads

### u43-finished-duration — A Finished Stay

Order:
1. 只 character lifecycle.
2. phrase `u43-only-basic`.
3. select `u43-only-s1`
   - prompt: **只 means…**
   - options: [`only; merely`, `already`, `even more`]
   - answer: **only; merely**
   - explanation: 只 limits the amount or scope.
4. grammar `u43-completed-duration`.
5. phrase `u43-finished-stay`.
6. phrase `u43-tennis-duration`.
7. select `u43-duration-s1`
   - prompt: **Which sentence uses the Lesson-14 completed-duration pattern with verb repetition?**
   - options: [`我打網球打了兩個鐘頭。`, `我打網球了兩個鐘頭。`, `我打網球兩個鐘頭。`]
   - answer: **我打網球打了兩個鐘頭。**
   - explanation: With the object before the duration, repeat the verb.
   - grammarIds: [`u43-completed-duration`]
8. phrase `u43-only-chinese`.
9. select `u43-duration-s2`
   - prompt: **Why does 中文我只學了五個月 not repeat 學?**
   - options: [`中文 is fronted as the topic`, `了 removes the verb`, `只 forbids verb repetition`]
   - answer: **中文 is fronted as the topic**
   - explanation: Fronting the object/topic allows the source pattern without the repeated verb.
   - grammarIds: [`u43-completed-duration`]
10. phrase `u43-confirm-bridge` — EXPLAIN 對不對 before testing.
11. select `u43-confirm-s1`
   - prompt: **At the end of a statement, 對不對 is used to…**
   - options: [`seek confirmation of the statement`, `ask how many months`, `mean “only”`]
   - answer: **seek confirmation of the statement**
   - explanation: The bridge has already explained 對不對 as a confirmation form.
12. listen `u43-duration-l1`
   - audioText: **我打網球打了兩個鐘頭。**
   - prompt: **Which duration do you hear?**
   - options: [`兩個鐘頭`, `兩個月`, `兩年`]
   - answer: **兩個鐘頭**
   - explanation: The audio says 兩個鐘頭, “two hours.”
13. order `u43-duration-o1` using `u43-tennis-duration`
   - tokens: [`我打網球`, `打了兩個鐘頭`]

### u43-duration-now — How Long Up to Now?

Order:
1. grammar `u43-duration-to-now`.
2. phrase `u43-duration-now-source`.
3. select `u43-miss-s1`
   - prompt: **In 有一點想家, 想 means…**
   - options: [`miss`, `plan to`, `compare`]
   - answer: **miss**
   - explanation: Lesson 14 adds the state-verb sense “miss”; 想家 means miss home.
4. select `u43-duration-now-s1`
   - prompt: **Which sentence presents the six-month stay as duration accumulated up to now?**
   - options: [`我在臺灣住了半年了。`, `我在臺灣住了半年。`, `我在臺灣住半年。`]
   - answer: **我在臺灣住了半年了。**
   - explanation: Final 了 creates the duration-to-now frame.
   - grammarIds: [`u43-duration-to-now`]
5. select `u43-duration-now-s2`
   - prompt: **Does the double-了 pattern by itself guarantee that the action will continue?**
   - options: [`No; continuation depends on context.`, `Yes; it always continues.`, `No; it always stopped already.`]
   - answer: **No; continuation depends on context.**
   - explanation: This is the source distinction.
   - grammarIds: [`u43-duration-to-now`]
6. phrase `u43-approx-time`.
7. select `u43-approx-s1`
   - prompt: **Which means “around December”?**
   - options: [`差不多十二月`, `差不多兩個月`, `十二月開始`]
   - answer: **差不多十二月**
   - explanation: 差不多 before a time expression means approximately/around that time.
8. phrase `u43-duration-question`.
9. phrase `u43-a002-model`.
10. select `u43-duration-contrast`
   - prompt: **Which sentence presents a completed one-year stay?**
   - options: [`我在臺灣住了一年。`, `我在臺灣住了一年了。`, `我在臺灣住一年。`]
   - answer: **我在臺灣住了一年。**
   - explanation: G001 presents the duration as completed; the final 了 in G002 shifts to accumulated duration up to now.
11. select `u43-a002-s1`
   - prompt: **Which question asks where someone lived before?**
   - options: [`你以前住在哪裡？`, `你在那裡住了多久？`, `你什麼時候回來？`]
   - answer: **你以前住在哪裡？**
   - explanation: 哪裡 asks for the place where the person lived.
12. select `u43-a002-s2`
   - prompt: **Which question asks how long someone lived there?**
   - options: [`你在那裡住了多久？`, `你以前住在哪裡？`, `你在臺灣住了半年嗎？`]
   - answer: **你在那裡住了多久？**
   - explanation: 多久 asks for an unknown duration. 你在臺灣住了半年嗎？ is a yes/no question about a stated six-month duration, not a request for how long.
13. listen `u43-duration-now-l1`
   - audioText: **我在臺灣住了半年多了。**
   - prompt: **Which duration phrase do you hear?**
   - options: [`半年多`, `兩個月`, `兩個鐘頭`]
   - answer: **半年多**
   - explanation: The audio says 半年多, a little over half a year.
14. order `u43-duration-now-o1` using `u43-duration-now-source`
   - tokens: [`我在臺灣住了半年多了`, `有一點想家`]

### u43-new-year — New Year Is Almost Here

Order:
1. 父 lifecycle.
2. 母 lifecycle.
3. phrase `u43-newyear-basic`.
4. select `u43-newyear-s1`
   - prompt: **新年 means…**
   - options: [`New Year`, `next year`, `last year`]
   - answer: **New Year**
   - explanation: 新年 means New Year.
5. select `u43-parents-s1`
   - prompt: **父母 means…**
   - options: [`parents`, `classmates`, `everyone`]
   - answer: **parents**
   - explanation: 父母 means parents.
6. phrase `u43-kuai-sense` — EXPLAIN the Lesson-14 快 sense.
7. phrase `u43-yao-sense` — EXPLAIN the Lesson-14 要 sense.
8. grammar `u43-imminent`.
9. phrase `u43-newyear-source`.
10. select `u43-imminent-s1`
   - prompt: **In 新年快到了, 快 means…**
   - options: [`soon / almost`, `fast in speed`, `only`]
   - answer: **soon / almost**
   - explanation: This is the Lesson-14 temporal sense of 快.
11. select `u43-imminent-s2`
   - prompt: **In 比賽要開始了, 要 means…**
   - options: [`is about to / is going to`, `wants an object`, `misses someone`]
   - answer: **is about to / is going to**
   - explanation: This is the Lesson-14 imminent-event auxiliary sense.
12. select `u43-imminent-s3`
   - prompt: **According to the textbook's Lesson-14 rule, which sentence is rejected?**
   - options: [`他明天快要回來了。`, `他快要回來了。`, `快下雨了。`]
   - answer: **他明天快要回來了。**
   - explanation: The source blocks explicit time word + 快要 in this construction.
   - grammarIds: [`u43-imminent`]
13. select `u43-imminent-s4`
   - prompt: **Which form does the source identify as especially preferred in Taiwan Mandarin?**
   - options: [`快要`, `快`, `要`]
   - answer: **快要**
   - explanation: The textbook explicitly notes the Taiwan preference for disyllabic 快要.
14. listen `u43-newyear-l1`
   - audioText: **新年快到了。**
   - prompt: **What is about to arrive?**
   - options: [`新年`, `臺灣`, `比賽`]
   - answer: **新年**
   - explanation: The audio says 新年, “New Year.”
15. order `u43-newyear-o1` using `u43-newyear-source`
   - tokens: [`新年快到了`, `想回去看父母嗎`]

### u43-stopping — The Rain Is About to Stop

Order:
1. 停 lifecycle.
2. select `u43-stop-s1`
   - prompt: **停 means…**
   - options: [`to stop`, `to rain`, `to miss`]
   - answer: **to stop**
   - explanation: 停 means to stop.
3. phrase `u43-stopping`.
4. select `u43-stop-s2`
   - prompt: **雨快要停了 means…**
   - options: [`The rain is about to stop.`, `The rain has already stopped.`, `The rain often stops.`]
   - answer: **The rain is about to stop.**
   - explanation: 快要…了 marks imminence and 停 means stop.
5. listen `u43-stop-l1`
   - audioText: **雨快要停了。**
   - prompt: **Which verb do you hear?**
   - options: [`停`, `滑雪`, `想`]
   - answer: **停**
   - explanation: The audio ends with 停了.
6. order `u43-stop-o1` using `u43-stopping`
   - tokens: [`雨`, `快要停了`]

### u43-return-plan — The End of December

Order:
1. 底 lifecycle.
2. phrase `u43-return-plan`.
3. select `u43-endmonth-s1`
   - prompt: **十二月底 means…**
   - options: [`the end of December`, `the beginning of December`, `December last year`]
   - answer: **the end of December**
   - explanation: 月底 means the end of a month.
4. phrase `u43-return-reason`.
5. select `u43-plan-s1`
   - prompt: **Which sentence states an end-of-December plan?**
   - options: [`我打算十二月底回去。`, `我在臺灣住了半年多了。`, `雨快要停了。`]
   - answer: **我打算十二月底回去。**
   - explanation: 打算 marks the plan and 十二月底 gives the time.
6. listen `u43-plan-l1`
   - audioText: **我打算十二月底回去。**
   - prompt: **When is the planned return?**
   - options: [`十二月底`, `明天`, `今年`]
   - answer: **十二月底**
   - explanation: The audio says 十二月底, “the end of December.”
7. order `u43-plan-o1` using `u43-return-reason`
   - tokens: [`因為我們只放十天的假`, `所以一月五號回來`]

### u43-next-year — Next Year and Autumn Leaves

Order:
1. 葉 lifecycle.
2. phrase `u43-nextyear-source`.
3. phrase `u43-return-question`.
4. select `u43-nextyear-s1`
   - prompt: **明年 means…**
   - options: [`next year`, `New Year`, `last year`]
   - answer: **next year**
   - explanation: 明年 means next year.
5. select `u43-leaves-s1`
   - prompt: **紅葉 means…**
   - options: [`red maple leaves`, `rain`, `news`]
   - answer: **red maple leaves**
   - explanation: 紅葉 is the source word for red maple leaves.
6. phrase `u43-trip-adapted`.
7. select `u43-trip-s1`
   - prompt: **Which line is an experience statement with a completed duration?**
   - options: [`我去年五月出去玩了兩個星期。`, `新年快到了。`, `雨快要停了。`]
   - answer: **我去年五月出去玩了兩個星期。**
   - explanation: It reports a completed trip lasting two weeks.
   - grammarIds: [`u43-completed-duration`]
8. listen `u43-nextyear-l1`
   - audioText: **我想明年秋天去看紅葉。**
   - prompt: **What does the speaker want to see?**
   - options: [`紅葉`, `春天`, `下雪`]
   - answer: **紅葉**
   - explanation: The audio says 紅葉, “red maple leaves.”
9. order `u43-nextyear-o1` using `u43-nextyear-source`
   - tokens: [`冬天太冷了`, `不過`, `我想明年秋天去看紅葉`]

## 6. Unit 43 review — exact step bank

### Listening
1. `u43-review-l1`
   - audioText: **我打網球打了兩個鐘頭。**
   - prompt: **Which duration do you hear?**
   - options: [`兩個鐘頭`, `兩個月`, `兩年`]
   - answer: **兩個鐘頭**
   - explanation: The audio says 兩個鐘頭, “two hours.”
2. `u43-review-l2`
   - audioText: **我在臺灣住了半年多了。有一點想家。**
   - prompt: **Which expression do you hear for “miss home”?**
   - options: [`想家`, `想買`, `打算`]
   - answer: **想家**
   - explanation: The audio says 想家, “miss home.”
3. `u43-review-l3`
   - audioText: **雨快要停了。**
   - prompt: **Which imminent phrase do you hear?**
   - options: [`快要停了`, `已經停了`, `常下雨`]
   - answer: **快要停了**
   - explanation: The audio says 快要停了, “is about to stop.”
### Handwriting retrieval
4. `u43-review-zhi` — complete 只
5. `u43-review-fu` — complete 父
6. `u43-review-mu` — complete 母
7. `u43-review-ting` — complete 停
8. `u43-review-di` — complete 底
9. `u43-review-ye` — complete 葉

### Independent NEW vocabulary retrieval
10. `u43-review-v1` 只 → only; merely / already / even more → **only; merely**
11. `u43-review-v2` 新年 → New Year / next year / last year → **New Year**
12. `u43-review-v3` 父母 → parents / classmates / everyone → **parents**
13. `u43-review-v4` 停 → stop / rain / compare → **stop**
14. `u43-review-v5` 十二月底 → end of December / beginning of December / December last year → **end of December**
15. `u43-review-v6` 明年 → next year / New Year / this year → **next year**
16. `u43-review-v7` 紅葉 → red maple leaves / rain / umbrella → **red maple leaves**

Prompt format: **“X means…”**; explanation: **“X means <answer>.”**

### Expansion-sense retrieval
17. `u43-review-e1`
   - prompt: In 想家, 想 means…
   - options: [miss, want to buy, compare]
   - answer: miss
   - explanation: Lesson 14 adds the “miss” sense.
18. `u43-review-e2`
   - prompt: In 新年快到了, 快 means…
   - options: [soon / almost, fast in speed, only]
   - answer: soon / almost
   - explanation: This is the Lesson-14 temporal sense.
19. `u43-review-e3`
   - prompt: In 比賽要開始了, 要 means…
   - options: [is about to / is going to, wants an object, misses someone]
   - answer: is about to / is going to
   - explanation: This is the source auxiliary sense.

### Grammar retrieval
20. `u43-review-g1`
   - prompt: Which correctly expresses a completed two-hour tennis activity?
   - options: [我打網球打了兩個鐘頭。, 我打網球兩個鐘頭了。, 我打網球兩個鐘頭。]
   - answer: 我打網球打了兩個鐘頭。
   - explanation: Object before duration requires verb repetition.
   - grammarIds: [u43-completed-duration]
21. `u43-review-g2`
   - prompt: Which presents duration accumulated up to now?
   - options: [我工作了兩個月了。, 我工作了兩個月。, 我快要工作了。]
   - answer: 我工作了兩個月了。
   - explanation: Final 了 creates the duration-to-now frame.
   - grammarIds: [u43-duration-to-now]
22. `u43-review-g3`
   - prompt: Which means “The game is about to start”?
   - options: [比賽要開始了。, 比賽已經開始了。, 比賽明天開始。]
   - answer: 比賽要開始了。
   - explanation: 要…了 marks imminence here.
   - grammarIds: [u43-imminent]
23. `u43-review-g4`
   - prompt: Which presents the stay as completed rather than accumulated-to-now?
   - options: [我在臺灣住了一年。, 我在臺灣住了一年了。, 我在臺灣住一年。]
   - answer: 我在臺灣住了一年。
   - explanation: G001 completed duration lacks the final sentence 了.
24. `u43-review-g5`
   - prompt: According to the textbook's Lesson-14 rule, which is rejected?
   - options: [他明天快要回來了。, 他快要回來了。, 快下雨了。]
   - answer: 他明天快要回來了。
   - explanation: The source blocks explicit-time + 快要.
25. `u43-review-g6`
   - prompt: Which ending asks for confirmation of a statement?
   - options: [對不對, 多久, 十二月底]
   - answer: 對不對
   - explanation: 對不對 asks whether the preceding statement is correct, functioning as a confirmation check.

### Delayed/cumulative transfer
26. `u43-review-cum1`
   - prompt: Which earlier weather sentence says it often rains in summer?
   - options: [夏天常下雨。, 新年快到了。, 冬天太冷了。]
   - answer: 夏天常下雨。
   - explanation: This retrieves Unit-42 weather before Unit 44.
27. `u43-review-cum2` order `u43-a002-model`
   - tokens: [`你以前住在哪裡`, `你在那裡住了多久`]
28. `u43-review-o1` order `u43-tennis-duration`
   - tokens: [`我打網球`, `打了兩個鐘頭`]

Review count: **28**. Listening: **3**. All 7 NEW lexical targets, all 3 expansion senses, all 3 grammar systems, and all 6 NEW characters are independently retrieved.

## 7. Lifecycle coverage

| Target | Explain/context | Controlled | Retrieval | Delayed/cumulative |
|---|---|---|---|---|
| 只 | char + u43-only-chinese | u43-only-s1 | review-v1 | later reason/plan lines |
| G001 | grammar + finished/tennis phrases | duration-s1/s2/order | review-g1/g4/o1 | trip-adapted + Unit44 completed-action review |
| G002 | grammar + duration-now-source | duration-now-s1/s2/contrast | review-g2/g4 | Unit44 review-cum2 + review-u43-1 |
| 想 “miss” | duration-now-source note | miss-s1 | review-e1 | Unit44 review-u43-1 |
| 新年/父母 | character + newyear source | newyear/parents selects | review-v2/v3 | Unit44 review-u43-2 |
| 快/要 senses + G003 | sense cards → grammar → source phrase | imminent-s1–s4 | review-e2/e3/g3/g5 | u43-stopping + Unit44 typhoon/capstone |
| 停 | char + u43-stopping | stop-s1/s2 | review-v4 | D2T09 Unit44 |
| 十二月底 | char + return-plan | endmonth/plan selects | review-v5 | Unit44 review-u43-3 |
| 明年/紅葉 | char + nextyear source | nextyear/leaves/trip selects | review-v6/v7 | Unit44 review-u43-4 |
| A002 | lesson-2 selects | duration questions/order | review-cum2 | F004 capstone |

## 8. Search/Mega and deferral rules

- 7 canonical NEW forms receive one canonical ownership row at their owning lesson. Per frozen Gate A, Pinyin Search remains a global lookup; Search writing practice for a Lesson-14-owned character stays locked until that owning lesson/character introduction is complete. Mega eligibility remains gated by owning-lesson completion.
- 想 / 快 / 要 receive **no** new canonical row and no altered old gloss.
- 紐約 / 美國 / 臺北 / 法國 / 西班牙 / 上海 are never required answers.
- B1L14-D1T06 uses the safe adaptation in `u43-trip-adapted`.
- No learner answer requires 漂 / 亮 / 妳 / 北 / 紐 / 約.
- D2T03 颱風 is not exposed in Unit 43; G003 examples use already-known words until Unit 44.
