# Book 1 Lesson 14 — Final Learner Simulation B

Simulation: **B — adversarial test taker**

PR: **#68**  
Branch: `book1-lesson14-source-a`  
Reviewed learner-facing head before this report commit: `47ce52a3987b39fa66b6cb16b3046514d101b084`

## Independence

This simulation was performed from the final rerun handoff in a fresh context.

I did **not** read either of the other final learner-simulation rerun reports before completing this simulation.

The historical pre-repair learner-simulation reports were not used as the final verdict.

## Scope

I attacked the current frozen activity packet and learner-facing implementation for Units 42–44:

- `course/book1/lesson14-activity-spec.md`
- `course/book1/lesson14-unit42-activity-spec.md`
- `course/book1/lesson14-unit43-activity-spec.md`
- `course/book1/lesson14-unit44-activity-spec.md`
- `course/book1/unit42.ts`
- `course/book1/unit43.ts`
- `course/book1/unit44.ts`

I also inspected the relevant runtime behavior in:

- `course/runtime.ts`
- `components/learning-app.tsx`

The adversarial pass covered every learner-facing `select`, `listen`, `order`, and `match` item in Units 42–44, plus every review item and all four final capstone constructions.

Current assessed payload totals:

- **123 select**
- **26 listen**
- **29 order**
- **1 match**
- **179 assessed select/listen/order/match items total**

Actual review lengths:

- Unit 42 review: **25**
- Unit 43 review: **28**
- Unit 44 review: **41**

## Verdict

**PASS**

- BLOCKER: **0**
- MAJOR: **0**
- MINOR: **0**

PASS criterion is satisfied: there are zero open BLOCKER and zero open MAJOR findings.

## Adversarial results

### 1. Select questions

I checked the implemented select banks for:

- two defensible answers;
- no defensible answer;
- wrong key;
- duplicate answer options;
- accidental clues that overturn the intended key;
- misleading English;
- untaught/future material in required answers;
- bad Traditional Chinese;
- mismatch with the frozen activity packet.

Result: **PASS**.

Every select answer occurs exactly once in its option bank. No alternate option is defensible under the actual prompt/context strongly enough to create an ambiguous key, and no keyed answer is absent.

The grammar contrasts remain distinguishable under the prompts, including:

- completed duration vs duration-to-now;
- verb repetition for object + duration;
- 想 “miss” vs earlier senses;
- 快 / 要 imminence senses;
- explicit-time restriction with 快要;
- 更 as “even more” relative to a baseline;
- 跟…一樣 / 沒有…那麼 / 比;
- A003 numeric temperature comparisons;
- A004 weather-question forms.

No actionable weak-distractor defect was found. Some beginner lexical checks are intentionally easy, but none creates ambiguity, a false key, or a metadata shortcut that defeats the target being assessed.

### 2. Listening questions

Result: **PASS**.

All **26** listening items satisfy the key audible-answer invariant:

- the keyed option is present in the actual `audioText`;
- exactly **one** answer option is literally present in that audio text;
- no listening item contains two answer options in the spoken sentence;
- every keyed answer is one of the displayed choices.

This includes all contextual listening items in the three reviews.

Examples of the repaired/important contrasts are sound:

- `這裡常不常下雨？` → only **常不常** is an offered audible pattern;
- `我在臺灣住了半年多了。有一點想家。` → only **想家** is an offered audible target;
- `電視新聞說，請大家多小心。` → only **多小心** is an offered audible caution target;
- `希望這次的沒有上次的那麼可怕。` → only **沒有上次的那麼可怕** is an offered audible comparison target.

No inaudible keyed answer or multi-audible-option ambiguity was found.

### 3. Order questions

Result: **PASS**.

For all **29** order steps:

- the referenced phrase resolves in the global phrase registry;
- the step token bank is exactly equal to the referenced phrase record's token array;
- token multiplicity is preserved;
- no token is missing or added;
- every order target is introduced as a phrase before the learner is asked to reconstruct it.

The runtime assembles `phrases` globally across unit modules, so the Unit-44 delayed-retrieval/capstone references to Unit-42/43 phrase IDs are valid learner-facing references rather than unresolved local IDs.

The important cross-unit Unit-44 orders all point backward to material already taught:

- `u44-review-u43-1` → `u43-duration-now-source`
- `u44-review-u43-2` → `u43-newyear-source`
- `u44-review-u43-3` → `u43-return-plan`
- `u44-review-u43-4` → `u43-nextyear-source`
- `u44-review-cap2` → `u42-season-reason`
- `u44-review-cap4` → `u43-finished-stay`

No broken order token bank or premature cross-unit order target remains.

### 4. Match question

Result: **PASS**.

`u44-review-vmatch` contains three unique characters with three unique lexical meanings:

- 傘 → umbrella
- 濕 → wet
- 更 → even more

The runtime displays those meanings from the character records, so the learner receives a one-to-one match set with no duplicate meaning collision.

### 5. Frozen-packet conformance

Result: **PASS**.

The implemented select/listen/order/match IDs, prompts, choices, answers, audio text, and order tokens are represented by the frozen Unit-42/43/44 activity specifications.

All **30** canonical NEW vocabulary text/pinyin/meaning values remain consistent with the frozen master activity specification.

No learner-facing assessed payload drift from the frozen packet was found.

### 6. Traditional Chinese / pinyin / English wording

Result: **PASS**.

I found no Simplified-Chinese contamination in the assessed Unit-42–44 select/listen/order/match payloads.

The inspected canonical vocabulary and linked phrase records retain tone-marked pinyin consistent with the frozen packet. No malformed or misleading pinyin defect surfaced in the tested material.

The English prompts/translations preserve the intended distinctions rather than changing the answer key. In particular:

- `慢走` is treated as the conventional leave-taking “Take care / Bye” formula in this context;
- `想家` tests the Lesson-14 “miss home” sense;
- `更` is not flattened to a neutral “more” in the targeted source rule;
- culture questions remain explicitly framed as textbook/historical content rather than current policy.

### 7. Unit-44 review count

Result: **PASS**.

The implemented `u44-review` contains exactly **41 steps**, matching the frozen final packet.

The 41-step bank includes:

- 3 listening items;
- 7 handwriting retrievals;
- direct retrieval of all 12 Unit-44 NEW vocabulary targets;
- comparison/grammar retrieval;
- A003/A004 transfer;
- delayed Unit-42/43 retrieval;
- historical culture retrieval;
- 4 final capstone orders.

### 8. Final capstone

Result: **PASS**.

The four final capstone items are all `order` construction tasks. They require the learner to reconstruct Chinese from previously taught material; they do not ask the learner to identify English curriculum labels or outcome metadata.

The implemented capstone is:

1. `u44-review-cap1` — reconstruct `這次的颱風會比上次的更大，請大家多小心。`
2. `u44-review-cap2` — reconstruct `因為我怕冷，所以我比較喜歡春天。`
3. `u44-review-cap3` — reconstruct `希望這次的沒有上次的那麼可怕。`
4. `u44-review-cap4` — reconstruct `我在臺灣住了一年。`

Together they cover the frozen Lesson-14 closure areas of weather/typhoon language, seasonal preference/reasoning, comparison, and experience/duration.

## Final result

**PASS — zero BLOCKER, zero MAJOR, zero MINOR.**

Simulation B found no learner-facing defect that requires reopening Gate B, implementation, or deterministic QA.
