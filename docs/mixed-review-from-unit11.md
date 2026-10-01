# Light cumulative questions from Unit 11

Reviewed production base `ab143fd50097804d6d5816a7b7f75cdda1f19346` on 2026-10-01. Scope: every published teaching lesson from Book 1 Unit 11 through Unit 48, plus the four published Book 2 units.

## Result

57 contextual checks replace selected direct questions in 57 lessons across 34 units. Each affected lesson receives **one** mixed check, after the relevant teaching. No lesson gains steps. First-teaching cards, vocabulary ownership, phrase records, reviews, handwriting, IDs, step order, completion bounds and navigation remain unchanged.

Most changes combine the current target with nearby material: drink orders and group preferences; prices and takeout; shops and food; locations and visits; schedules and transport; plans and durations; housing and comparisons. Occasional older retrieval includes siblings, 都/不都, measure words, 得 descriptions and polite requests. These are original recombinations of already taught material, not additional textbook targets.

## Review decisions

| Units | Changes | Existing combinations retained |
| --- | ---: | --- |
| Book 1 11 | 6; one in each teaching lesson | Cup and size building, choice questions and complete ordering remain. Early checks now require interpreting 都/不都 and connecting an order with a plan. |
| 12–15 | 12; three per unit | Existing whole-order totals, help requests, phone capabilities and food ordering remain. Isolated review questions become contextual retrieval. |
| 16 | 0 | Already combines restaurant visits with 昨天晚上; price/taste with 可是; ordering with 怕辣; preferences with 甜點; ability with 得 performance. |
| 17–20 | 7 | Preserve recommendations, invitation building and campus-location sentence tasks. Add light interpretation of quantity contrasts, destinations and nearby places. |
| 21–25 | 7 | Preserve prior quality repairs, grammar transfer, negative comparisons and cumulative reviews. Add context to clocks, waits and travel choices. |
| 26–33 | 12 | Preserve the duration, condition and housing sequences; select questions now connect plans with old transport, place, color, cause and contrast language. |
| 34–41 | 8; one per unit | Preserve focused grammar and cumulative birthday tasks. Add one small transfer opportunity per unit. |
| 42–48 | 0 | Existing material already combines new topics with multiple earlier patterns; avoid increasing the load. Examples below. |
| Book 2 1–4 | 5 | Preserve direction, listening, grammar and contextual-dialogue repairs. Add earlier existence, comparison of route positions, clause modification and sequencing in selected application checks. |

Concrete reasons to retain the late Book 1 combinations:
- Unit 42: `u42-weather-o1` (weather + 比), `u42-snow-o1` (snow/skiing + 的時候/常), `u42-seasons-o1` (season choice + 因為/所以).
- Unit 43: `u43-plan-o1` (holiday duration + cause/result + dates), `u43-nextyear-o1` (season plans + 不過).
- Unit 44: `u44-umbrella-o1` (new umbrella + verbal 了/forgetting/contrast), `u44-g4-o1` (typhoon comparison + future 會), `u44-g5-o1` (hope + lower-degree comparison).
- Unit 45: `u45-head-s6` (new symptoms with negative totality), `u45-throat-s3` (inflammation + 有一點), duration dialogue.
- Unit 46: `u46-rec-p1` and `u46-a004-s1` already combine 把 with earlier food, homework, permission and conditional material.
- Unit 47: `u47-g3-s5`, `u47-acc-s4` and `u47-integrated-s1` combine symptom vocabulary with event order, earlier polite proposals and help/refusal context.
- Unit 48: `u48-g5-o1`, `u48-a001-s1`–`s4`, and `u48-g7-s6` already combine recovery with earlier duration, 得, comparisons, rent and travel.

## Author review and corrections

Every replacement was reviewed for one defensible answer, natural Traditional Chinese, a taught current target, earlier review material, and useful feedback. Distractors change a specific known detail instead of introducing harder Chinese.

The authoring pass removed several draft-only hidden prerequisites before implementation: 不行 before Unit 26, 寫字 before its Unit 23 lesson, the lower-degree 沒有…那麼 comparison before Unit 44, and an unnecessary result-complement expression. It also kept the original lexical purpose when strengthening questions for 差不多, 電視 and 特別. No new word was introduced just to make a question harder.

The exact item inventory is in `validation/fixtures/mixed-review.json`. It records each unit/lesson/step, current targets, earlier retrieval and grammar references.

## Verification

- Local focused tests: unchanged teaching/canonical data and checkpoint topology; at most two replacements per lesson (actual: one); answer uniqueness; feedback presence; earlier teaching of target/review words, every Han character in prompts/options/feedback, and referenced grammar.
- The tests check prerequisite evidence and preserved content. They do not claim to prove natural Chinese or semantic answer uniqueness; those were manually reviewed.
- Full generation, curriculum checks, targeted changed-unit checks, regression suite, TypeScript and Pages build are required through Feature QA before release.
- No browser layout or device audio behavior changed; no device-audio check claimed.

