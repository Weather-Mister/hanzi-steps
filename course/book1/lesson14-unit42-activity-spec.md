# Lesson 14 Activity Spec — Unit 42

Unit: **42 — Weather and the Four Seasons**

This file is normative for Gate B together with `lesson14-activity-spec.md`.

## 1. Unit identity

- unit ID: `unit-42`
- title: **Weather and the Four Seasons**
- communicative goal: describe ordinary weather, name the four seasons, ask whether it snows/rains, and explain seasonal preferences.
- formal NEW vocabulary: 11
- NEW characters: 8
- formal new grammar: none
- support expansion: B1L14-X020 會不會 / 常不常

## 2. Exact phrase records

### u42-weather-cold
- text: **天氣很冷。**
- pinyin: **Tiānqì hěn lěng.**
- meaning: **The weather is cold.**
- note: 天氣 is weather; 冷 describes cold conditions.
- tokens: [`天氣`, `很冷`]

### u42-weather-source
- text: **外面風那麼大，我覺得今天比昨天冷。**
- pinyin: **Wàimiàn fēng nàme dà, wǒ juéde jīntiān bǐ zuótiān lěng.**
- meaning: **The wind outside is so strong; I think today is colder than yesterday.**
- note: This preserves the safe first clause of B1L14-D1T01. 比 is prior review.
- tokens: [`外面風那麼大`, `我覺得`, `今天比昨天冷`]

### u42-snow-mountain
- text: **很高的山會下雪。**
- pinyin: **Hěn gāo de shān huì xiàxuě.**
- meaning: **It can snow on very high mountains.**
- note: Learner-safe preservation of the weather claim in B1L14-D1T02 without requiring 玉山 or 美國.
- tokens: [`很高的山`, `會下雪`]

### u42-snow-when
- text: **下雪的時候，我常去山上滑雪。**
- pinyin: **Xiàxuě de shíhou, wǒ cháng qù shānshàng huáxuě.**
- meaning: **When it snows, I often go skiing in the mountains.**
- note: Source B1L14-D1T03; …的時候 is review.
- tokens: [`下雪的時候`, `我常去山上滑雪`]

### u42-snow-guess
- text: **開始下雪了吧？**
- pinyin: **Kāishǐ xiàxuě le ba?**
- meaning: **It has probably started snowing, right?**
- note: Review the inferential/guessing 吧 already taught earlier; no new particle rule.
- tokens: [`開始下雪了吧`]

### u42-spring-source
- text: **我怕冷。我比較喜歡春天。**
- pinyin: **Wǒ pà lěng. Wǒ bǐjiào xǐhuān chūntiān.**
- meaning: **I'm sensitive to the cold. I prefer spring.**
- note: Source B1L14-D1T04.
- tokens: [`我怕冷`, `我比較喜歡春天`]

### u42-spring-comfort
- text: **春天不錯，天氣很舒服。**
- pinyin: **Chūntiān búcuò, tiānqì hěn shūfu.**
- meaning: **Spring is nice; the weather is comfortable.**
- note: Exact B1L14-D1T05; all support is already known.
- tokens: [`春天不錯`, `天氣很舒服`]

### u42-winter-source
- text: **冬天太冷了。**
- pinyin: **Dōngtiān tài lěng le.**
- meaning: **Winter is too cold.**
- note: Source-supported seasonal comment; 太…了 is review.
- tokens: [`冬天`, `太冷了`]

### u42-four-seasons
- text: **春天、夏天、秋天、冬天。**
- pinyin: **Chūntiān, xiàtiān, qiūtiān, dōngtiān.**
- meaning: **spring, summer, autumn, winter**
- note: The complete four-season set.
- tokens: [`春天`, `夏天`, `秋天`, `冬天`]

### u42-season-most
- text: **我最喜歡秋天，最不喜歡冬天。**
- pinyin: **Wǒ zuì xǐhuān qiūtiān, zuì bù xǐhuān dōngtiān.**
- meaning: **I like autumn the most and winter the least.**
- note: Uses prior 最 to support the source A001 most/least preference task.
- tokens: [`我最喜歡秋天`, `最不喜歡冬天`]

### u42-rain-basic
- text: **夏天常下雨。**
- pinyin: **Xiàtiān cháng xiàyǔ.**
- meaning: **It often rains in summer.**
- note: Weather-frequency model using known 常.
- tokens: [`夏天`, `常下雨`]

### u42-q-snow
- text: **臺灣會不會下雪？**
- pinyin: **Táiwān huì bú huì xiàxuě?**
- meaning: **Does it snow in Taiwan?**
- note: 會不會 is the A-not-A form of 會. Here it asks whether the weather event occurs. This explanation must appear before assessment.
- tokens: [`臺灣`, `會不會下雪`]

### u42-q-rain
- text: **這裡常不常下雨？**
- pinyin: **Zhèlǐ cháng bù cháng xiàyǔ?**
- meaning: **Does it often rain here?**
- note: 常不常 is the A-not-A form of 常. This explanation must appear before assessment.
- tokens: [`這裡`, `常不常下雨`]

### u42-home-country-model
- text: **我的國家夏天很熱，冬天很冷。**
- pinyin: **Wǒ de guójiā xiàtiān hěn rè, dōngtiān hěn lěng.**
- meaning: **In my country, summers are hot and winters are cold.**
- note: **Source-transfer instruction (A001):** This sentence is only a model. Before continuing, describe the climate of **your own home country/place** in Chinese using the seasons you know. Then say which season **you personally like most and least**, and explain **your own reason** with 因為…所以…. Say the answer aloud or write it on paper; do not copy the model unless it is genuinely true for you.
- tokens: [`我的國家`, `夏天很熱`, `冬天很冷`]

### u42-season-reason
- text: **因為我怕冷，所以我比較喜歡春天。**
- pinyin: **Yīnwèi wǒ pà lěng, suǒyǐ wǒ bǐjiào xǐhuān chūntiān.**
- meaning: **Because I'm sensitive to the cold, I prefer spring.**
- note: **A001 personal-transfer reminder:** The model shows how to give a reason with 因為…所以…. Your own transfer answer must name your most- and least-liked seasons and give your own reason; the fixed spring sentence is practice, not a substitute for your personal response.
- tokens: [`因為我怕冷`, `所以我比較喜歡春天`]

### u42-summer-model
- text: **臺灣夏天天氣很熱。**
- pinyin: **Táiwān xiàtiān tiānqì hěn rè.**
- meaning: **Taiwan's summer weather is hot.**
- note: Source A005 weather model.
- tokens: [`臺灣夏天`, `天氣很熱`]

### u42-summer-write
- text: **夏天我常吃水果，也常出去玩。**
- pinyin: **Xiàtiān wǒ cháng chī shuǐguǒ, yě cháng chūqù wán.**
- meaning: **In summer I often eat fruit and also often go out.**
- note: **Source-transfer instruction:** discuss summer weather, one distinctive feature, common fruit/food, and a common activity; then write your findings in Chinese on paper. This card is a model, not the only acceptable content.
- tokens: [`夏天`, `我常吃水果`, `也常出去玩`]

## 3. Character lifecycle IDs

Each row expands to ordered `intro → trace → build → complete → memory`.

| Lesson | Character | ID prefix |
|---|---|---|
| u42-weather | 冷 | u42-weather-冷 |
| u42-snow | 滑 | u42-snow-滑 |
| u42-snow | 雪 | u42-snow-雪 |
| u42-spring-winter | 春 | u42-spring-winter-春 |
| u42-spring-winter | 冬 | u42-spring-winter-冬 |
| u42-summer-autumn | 夏 | u42-summer-autumn-夏 |
| u42-summer-autumn | 秋 | u42-summer-autumn-秋 |
| u42-rain | 雨 | u42-rain-雨 |

No independent assessed step containing the character may precede its cycle.

## 4. Teaching lessons — exact assessed payloads

### u42-weather — Weather Outside

Order:
1. 冷 character lifecycle.
2. phrase `u42-weather-cold`.
3. phrase `u42-weather-source` — this contextual card explains 風 as wind before any 風 assessment.
4. select `u42-weather-s1`
   - prompt: **天氣 means…**
   - options: [`weather`, `season`, `news`]
   - answer: **weather**
   - explanation: 天氣 means weather.
5. select `u42-weather-s2`
   - prompt: **冷 means…**
   - options: [`cold`, `wet`, `windy`]
   - answer: **cold**
   - explanation: 冷 describes cold temperature.
6. select `u42-weather-s3`
   - prompt: **風 means…**
   - options: [`wind`, `rain`, `snow`]
   - answer: **wind**
   - explanation: 風 is wind.
7. select `u42-weather-s4`
   - prompt: **Which sentence says today is colder than yesterday?**
   - options: [`今天比昨天冷。`, `今天跟昨天一樣冷。`, `昨天比今天冷。`]
   - answer: **今天比昨天冷。**
   - explanation: A 比 B + property compares A as more of that property than B.
8. listen `u42-weather-l1`
   - audioText: **天氣很冷。**
   - prompt: **Listen for the weather word.**
   - options: [`天氣`, `風景`, `國家`]
   - answer: **天氣**
   - explanation: The audio begins with 天氣.
9. order `u42-weather-o1` using `u42-weather-source`
   - tokens: [`外面風那麼大`, `我覺得`, `今天比昨天冷`]

D1T01 weather comparison is covered here; its 會不會下雪 clause is intentionally delayed to u42-rain.

### u42-snow — Snow and Skiing

Order:
1. 滑 lifecycle.
2. 雪 lifecycle.
3. phrase `u42-snow-mountain`.
4. phrase `u42-snow-when`.
5. select `u42-snow-s1`
   - prompt: **滑雪 means…**
   - options: [`to ski`, `to rain`, `to walk slowly`]
   - answer: **to ski**
   - explanation: 滑雪 means to ski.
6. select `u42-snow-s2`
   - prompt: **下雪 means…**
   - options: [`to snow`, `to rain`, `to stop`]
   - answer: **to snow**
   - explanation: 下雪 means to snow.
7. phrase `u42-snow-guess` — this is the EXPLAIN/CONTEXT card for inferential 吧 review.
8. select `u42-snow-s3`
   - prompt: **In 開始下雪了吧？, what is the speaker doing?**
   - options: [`making a likely guess and seeking confirmation`, `giving a command to ski`, `asking how long it snowed`]
   - answer: **making a likely guess and seeking confirmation**
   - explanation: This is the already-taught inferential/guessing use of 吧.
9. listen `u42-snow-l1`
   - audioText: **下雪的時候，我常去山上滑雪。**
   - prompt: **Which activity do you hear?**
   - options: [`滑雪`, `打網球`, `上網`]
   - answer: **滑雪**
   - explanation: The sentence says the speaker often goes skiing.
10. order `u42-snow-o1` using `u42-snow-when`
   - tokens: [`下雪的時候`, `我常去山上滑雪`]

B1L14-D1T02 is represented by its weather/inferential functions; 玉山 / 美國 remain contextual only and are not assessed.

### u42-spring-winter — Spring and Winter

Order:
1. 春 lifecycle.
2. 冬 lifecycle.
3. phrase `u42-spring-source`.
4. phrase `u42-spring-comfort`.
5. select `u42-spring-s1`
   - prompt: **春天 means…**
   - options: [`spring`, `summer`, `winter`]
   - answer: **spring**
   - explanation: 春天 is spring.
6. select `u42-winter-s1`
   - prompt: **冬天 means…**
   - options: [`winter`, `autumn`, `spring`]
   - answer: **winter**
   - explanation: 冬天 is winter.
7. phrase `u42-winter-source`.
8. select `u42-spring-s2`
   - prompt: **Why does the source speaker prefer spring?**
   - options: [`because the speaker is sensitive to cold`, `because the speaker prefers cold winter weather`, `because the speaker goes skiing every spring`]
   - answer: **because the speaker is sensitive to cold**
   - explanation: 我怕冷 gives the reason for preferring spring.
9. listen `u42-spring-l1`
   - audioText: **我比較喜歡春天。**
   - prompt: **Which season is preferred?**
   - options: [`春天`, `冬天`, `天氣`]
   - answer: **春天**
   - explanation: The audio says 春天, “spring.”
10. order `u42-spring-o1` using `u42-spring-source`
   - tokens: [`我怕冷`, `我比較喜歡春天`]

### u42-summer-autumn — Summer and Autumn

Order:
1. 夏 lifecycle.
2. 秋 lifecycle.
3. phrase `u42-four-seasons`.
4. select `u42-summer-s1`
   - prompt: **夏天 means…**
   - options: [`summer`, `autumn`, `winter`]
   - answer: **summer**
   - explanation: 夏天 is summer.
5. select `u42-autumn-s1`
   - prompt: **秋天 means…**
   - options: [`autumn`, `spring`, `summer`]
   - answer: **autumn**
   - explanation: 秋天 is autumn.
6. phrase `u42-season-most`.
7. select `u42-season-s1`
   - prompt: **Which season does the model like least?**
   - options: [`冬天`, `秋天`, `春天`]
   - answer: **冬天**
   - explanation: 最不喜歡冬天 means “like winter the least.”
8. listen `u42-season-l1`
   - audioText: **春天、夏天、秋天、冬天。**
   - prompt: **Which season word do you hear?**
   - options: [`春天`, `天氣`, `水果`]
   - answer: **春天**
   - explanation: The audio includes 春天 in the four-season sequence.
9. order `u42-season-o1` using `u42-season-most`
   - tokens: [`我最喜歡秋天`, `最不喜歡冬天`]

### u42-rain — Rain and Weather Questions

Order:
1. 雨 lifecycle.
2. phrase `u42-rain-basic`.
3. select `u42-rain-s1`
   - prompt: **雨 means…**
   - options: [`rain`, `wind`, `snow`]
   - answer: **rain**
   - explanation: 雨 is rain.
4. select `u42-rain-s2`
   - prompt: **下雨 means…**
   - options: [`to rain`, `to snow`, `to ski`]
   - answer: **to rain**
   - explanation: 下雨 means to rain.
5. phrase `u42-q-snow` — EXPLAIN 會不會 before testing it.
6. phrase `u42-q-rain` — EXPLAIN 常不常 before testing it.
7. select `u42-rain-s3`
   - prompt: **Which asks whether snow occurs in Taiwan, without asking about frequency?**
   - options: [`臺灣會不會下雪？`, `臺灣常不常下雪？`, `臺灣會不會下雨？`]
   - answer: **臺灣會不會下雪？**
   - explanation: 會不會 asks whether the snow event occurs; 常不常 would ask about frequency.
8. select `u42-rain-s4`
   - prompt: **Which asks whether rain is frequent here?**
   - options: [`這裡常不常下雨？`, `這裡會不會下雨？`, `這裡常不常下雪？`]
   - answer: **這裡常不常下雨？**
   - explanation: 常不常 asks about frequency; 下雨 identifies rain.
9. listen `u42-rain-l1`
   - audioText: **夏天常下雨。**
   - prompt: **What weather event do you hear?**
   - options: [`下雨`, `下雪`, `滑雪`]
   - answer: **下雨**
   - explanation: The audio says it often rains in summer.
10. order `u42-rain-o1` using `u42-q-rain`
   - tokens: [`這裡`, `常不常下雨`]

### u42-seasons — My Seasons and Summer

A001 transfer requirement:
- the learner-facing note on `u42-home-country-model` must explicitly instruct the learner to perform the source task with **their own** information before continuing;
- the response must cover: (1) own home-country/place climate, (2) personally most-liked and least-liked seasons, and (3) a personal reason using 因為…所以…;
- the fixed sentences below are models/controlled practice only and must not be treated as satisfying the personal transfer on the learner's behalf.

Order:
1. phrase `u42-home-country-model` — this card carries the explicit learner-facing A001 personal-transfer instruction.
2. select `u42-seasons-home`
   - prompt: **Which sentence describes the climate where the speaker is from?**
   - options: [`我的國家夏天很熱，冬天很冷。`, `我最喜歡秋天，最不喜歡冬天。`, `臺灣夏天天氣很熱。`]
   - answer: **我的國家夏天很熱，冬天很冷。**
   - explanation: 我的國家… describes the speaker's home-country climate.
3. phrase `u42-season-reason`.
4. select `u42-seasons-s1`
   - prompt: **Which answer gives both a season preference and a reason?**
   - options: [`因為我怕冷，所以我比較喜歡春天。`, `春天、夏天、秋天、冬天。`, `今天比昨天冷。`]
   - answer: **因為我怕冷，所以我比較喜歡春天。**
   - explanation: The sentence states a preference and explains why.
5. select `u42-seasons-s2`
   - prompt: **Which sentence says “I like autumn the most and winter the least”?**
   - options: [`我最喜歡秋天，最不喜歡冬天。`, `我比較喜歡春天。`, `冬天太冷了。`]
   - answer: **我最喜歡秋天，最不喜歡冬天。**
   - explanation: 最喜歡… / 最不喜歡… gives the most- and least-liked seasons.
6. phrase `u42-summer-model`.
7. select `u42-summer-s2`
   - prompt: **Which statement describes Taiwan summer weather?**
   - options: [`臺灣夏天天氣很熱。`, `臺灣夏天天氣很冷。`, `臺灣冬天天氣很熱。`]
   - answer: **臺灣夏天天氣很熱。**
   - explanation: This is a weather statement about summer.
8. phrase `u42-summer-write`.
9. select `u42-summer-s3`
   - prompt: **Which sentence reports both a summer food habit and a common activity?**
   - options: [`夏天我常吃水果，也常出去玩。`, `臺灣夏天天氣很熱。`, `冬天太冷了。`]
   - answer: **夏天我常吃水果，也常出去玩。**
   - explanation: The sentence gives both a summer fruit/food habit and an activity.
10. select `u42-summer-s4`
   - prompt: **Which sentence reports Taiwan summer weather?**
   - options: [`臺灣夏天天氣很熱。`, `夏天我常吃水果，也常出去玩。`, `我最喜歡秋天。`]
   - answer: **臺灣夏天天氣很熱。**
   - explanation: This sentence directly reports Taiwan summer weather. The preceding source-transfer card still instructs the learner to write the full findings in Chinese.
11. order `u42-seasons-o1` using `u42-season-reason`
   - tokens: [`因為我怕冷`, `所以我比較喜歡春天`]

## 5. Unit 42 review — exact step bank

Review must use these steps in this order unless a question-correctness fix requires a local reorder.

### Listening
1. `u42-review-l1`
   - audioText: **天氣很冷。**
   - prompt: **Listen for “weather.”**
   - options: [`天氣`, `風景`, `國家`]
   - answer: **天氣**
   - explanation: 天氣 means weather.
2. `u42-review-l2`
   - audioText: **下雪的時候，我常去山上滑雪。**
   - prompt: **Which activity do you hear?**
   - options: [`滑雪`, `打網球`, `上網`]
   - answer: **滑雪**
   - explanation: The speaker says 滑雪.
3. `u42-review-l3`
   - audioText: **這裡常不常下雨？**
   - prompt: **Which question pattern do you hear?**
   - options: [`常不常`, `會不會`, `有沒有`]
   - answer: **常不常**
   - explanation: The audio uses 常不常 to ask about frequency.
### Handwriting retrieval
4. `u42-review-cold` — complete 冷
5. `u42-review-hua` — complete 滑
6. `u42-review-xue` — complete 雪
7. `u42-review-chun` — complete 春
8. `u42-review-dong` — complete 冬
9. `u42-review-xia` — complete 夏
10. `u42-review-qiu` — complete 秋
11. `u42-review-yu` — complete 雨

### Independent vocabulary retrieval
12. `u42-review-v1` 天氣 → weather / season / news → **weather**
13. `u42-review-v2` 冷 → cold / wet / fast → **cold**
14. `u42-review-v3` 風 → wind / snow / umbrella → **wind**
15. `u42-review-v4` 滑雪 → to ski / to rain / to stop → **to ski**
16. `u42-review-v5` 下雪 → to snow / to ski / to rain → **to snow**
17. `u42-review-v6` 春天 → spring / autumn / winter → **spring**
18. `u42-review-v7` 冬天 → winter / summer / spring → **winter**
19. `u42-review-v8` 夏天 → summer / winter / autumn → **summer**
20. `u42-review-v9` 秋天 → autumn / spring / summer → **autumn**
21. `u42-review-v10` 雨 → rain / wind / snow → **rain**
22. `u42-review-v11` 下雨 → to rain / to snow / to ski → **to rain**

Every vocabulary item above uses prompt format **“X means…”** and explanation **“X means <answer>.”**

### Support/transfer retrieval
23. `u42-review-q1`
   - prompt: Which asks whether it snows?
   - options: [會不會下雪？, 常不常下雨？, 下雪的時候？]
   - answer: 會不會下雪？
   - explanation: 會不會 asks whether the event occurs.
24. `u42-review-q2`
   - prompt: Which asks whether rain is frequent?
   - options: [常不常下雨？, 會不會下雪？, 下雨了嗎？]
   - answer: 常不常下雨？
   - explanation: 常不常 asks about frequency.
25. `u42-review-t1` order `u42-season-reason`
   - tokens: [`因為我怕冷`, `所以我比較喜歡春天`]

Review count: **25**. Listening count: **3**. All 11 NEW forms and all 8 NEW characters are independently retrieved.

## 6. Lifecycle coverage

| Target | Explain/context | Controlled | Retrieval | Delayed/cumulative |
|---|---|---|---|---|
| 天氣/冷/風 | u42-weather-cold/source | u42-weather-s1–s4 | u42-review-v1–v3 | Unit 44 capstone weather |
| 滑雪/下雪 | u42-snow-when/guess | u42-snow-s1–s3/o1 | u42-review-v4–v5 | Unit 44 A004 snow question |
| 春天/冬天 | u42-spring-source/winter-source | u42-spring-s1–s2/o1 | u42-review-v6–v7 | Unit 44 seasonal comparison |
| 夏天/秋天 | u42-four-seasons/season-most | u42-summer/autumn selects | u42-review-v8–v9 | Unit 44 seasonal comparison |
| 雨/下雨 | u42-rain-basic | u42-rain-s1–s4/o1 | u42-review-v10–v11 | Unit 43 停 + Unit 44 typhoon |
| 會不會/常不常 | u42-q-snow/q-rain notes | u42-rain-s3–s4 | u42-review-q1–q2 | Unit 44 A004 |
| A001/A005 | u42-home-country-model personal-transfer instruction + u42-season-reason + u42-summer-write | lesson-6 personal response + selects/order | u42-review-t1 | Unit 44 capstone F002 |

## 7. Search/Mega and deferral rules

- All 11 canonical NEW forms receive one canonical row at their owning lesson. Per frozen Gate A, Pinyin Search remains a global lookup; Search writing practice for a Lesson-14-owned character stays locked until that owning lesson/character introduction is complete. Mega eligibility remains gated by owning-lesson completion.
- inferential 吧, 比較, 因為…所以…, …的時候, 每…都… / 常 are review only.
- 玉山 / 美國 are not answer options, new vocabulary, Search, Mega, or handwriting.
- No assessed step requires 玉 / 紐 / 約 / 漂 / 亮 / 妳 / 北 or any other deferred glyph.
