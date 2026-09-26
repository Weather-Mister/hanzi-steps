# Book 1 Lesson 15 — Simulation A Repair Conformance

Working repository: `Weather-Mister/hanzi-steps`  
Working draft PR: **#69**  
Working branch: `book1-lesson15-source-a`

## Verdict

**PASS**

Fresh affected-path severity:

- BLOCKER: **0**
- MAJOR: **0**
- MINOR: **0**

The SIM-A-01 Unit-48 A003 repair conforms to the unchanged frozen Gate-B specification. The implementation gate may return to **PASS**. Deterministic QA is **PENDING** and must be rerun because learner-facing production code changed after the historical deterministic PASS.

Simulation A remains historical **FAIL** until it is actually rerun. Simulations B/C remain not run. Release remains locked. Book 1 remains incomplete.

## Audit basis

Freshly checked against current PR #69 production:

- frozen `course/book1/lesson15-unit48-activity-spec.md`;
- frozen `course/book1/lesson15-activity-spec.md`;
- `course/book1/unit45.ts` through `unit48.ts`;
- `course/book1/unit45.strokes.json` through `unit48.strokes.json` where ownership/lifecycle matters;
- `components/learning-app.tsx` phrase rendering;
- `lib/practice-engine.ts` phrase-practice eligibility;
- `lib/vocabulary-lookup.ts` canonical Search source;
- generated `course/index.json`;
- `course/book2/unit01.ts`;
- current completion state;
- repair commit `4ef295f3234550e3bd89f35b2ca28e34fa8acb7a` and its parent diff.

The repair commit changes learner-facing curriculum only in the two Unit-48 A003 phrase records `u48-prescription-support` and `u48-prescription-visual`; the other changed files are completion/handoff state. No frozen lesson/step ID is edited by the repair patch.

## A003 affected-path conformance

### 1. `u48-prescription-support` — PASS

The Unit-48 prescription lesson presents `u48-prescription-support` before the source visual and before any A003 assessed step.

Current learner-facing record:

- **一日4次** — `yí rì sì cì` — four times per day
- **3日份** — `sān rì fèn` — three-day supply
- **份 fèn** — support-only supply/portion unit
- **飯前** — `fànqián` — before meals
- **飯後** — `fànhòu` — after meals
- **飯後30分鐘** — `fànhòu sānshí fēnzhōng` — 30 minutes after meals

This matches the frozen A003 support contract.

### 2. `u48-prescription-visual` — PASS

The next learner-facing card visibly preserves:

- **健康診所**
- **一日4次**
- **3日份**
- **飯後**
- **飯後30分鐘**

Its meaning explicitly glosses **健康診所** as **Health Clinic (context only; not assessed)**. Its note explicitly states that **診 is deferred and non-assessed** and that **份 remains support-only**.

The learner therefore sees the frozen source notation rather than English-only replacement labels.

### 3. Learner visibility with practice isolation — PASS

The production phrase renderer displays `phrase.text`, pinyin, meaning, note, and audio for a phrase step independently of the token array. Therefore the two repaired cards remain fully learner-visible with `tokens: []`.

The practice engine separately requires `phrase.tokens.length > 0` before adding a phrase to adaptive/Mixed/Mega-style phrase practice. Empty tokens are therefore a valid practice opt-out and do not hide the lesson card.

### 4. 份 / 診 ownership isolation — PASS

Fresh current-state checks:

- neither **份** nor **診** appears as a canonical NEW vocabulary entry in Units 45–48;
- neither appears as a NEW formal character;
- neither has any learner handwriting step with `char: "份"` or `char: "診"`;
- generated `course/index.json` contains no exact canonical word/character object for **份** or **診**;
- Pinyin Search is built from canonical `vocabulary`, so these support/context glyphs are not Search-owned;
- both repaired A003 support/source phrases use `tokens: []`, so they are excluded from phrase practice/Mega-style productive pools;
- no handwriting ownership is introduced.

This preserves the frozen distinction: **份** is local support only; **診** is deferred/contextual.

### 5. A003 assessed answers and sequence — PASS

Current lesson order is:

1. `u48-prescription-support`
2. `u48-prescription-visual`
3. `u48-a003-s1`
4. `u48-a003-s2`
5. `u48-a003-s3`

Frozen answers remain exactly:

- `u48-a003-s1` → **四次**
- `u48-a003-s2` → **飯後30分鐘**
- `u48-a003-s3` → **十二包**

The third answer still follows the source inference **4 doses/day × 3 days = 12 packets**. No lexical ownership for 十二 is created.

### 6. Frozen IDs — PASS

The repair patch modifies only the phrase payloads for `u48-prescription-support` and `u48-prescription-visual`. It changes no lesson ID, step ID, grammar ID, phrase ID, character lifecycle ID, or assessed A003 ID.

## Required regression spot-checks

### A002 visual roles/scenes — PASS

Current Unit 48 still has three distinct source-faithful learner-facing visual prompts with the shared suggestion bank **看病 / 多休息 / 早一點睡覺 / 多喝水**:

- `u48-a002-visual-1`: 老李; restroom/lower-abdomen scene; **accept**; closes **好的。**
- `u48-a002-visual-2`: 小陳; bed scene; **accept**; closes **謝謝你。**
- `u48-a002-visual-3`: 王先生; throat/neck scene; **politely reject**; begins/closes with **謝謝你的關心。……**

No fixed symptom→advice mapping was introduced.

### Five semantic-listening repairs — PASS

All five repaired items still carry the intended semantic audio/prompt/answer distinctions and `semanticAnswer: true`:

- `u46-review-l1` — modal **得 děi = must/have to**
- `u46-review-l3` — complete advice bundle; identify what is **not** included
- `u47-stomach-l1` — stomach discomfort + repeated vomiting
- `u48-g7-l1` — separable-verb duration + degree comparison
- `u48-review-l3` — separable duration + much-better comparison

### Support-only 您 — PASS

Unit 46 still teaches:

- `u46-honorific-nin` → **您 nín**, explicitly support-only with no canonical vocabulary/Search/Mega/handwriting ownership;
- `u46-thanks-nin` → **好的，謝謝您。**

The A003 repair does not touch this path.

### Canonical lexical/character/grammar totals — PASS

Fresh current counts:

- Unit 45 NEW lexical forms: **12**
- Unit 46: **10**
- Unit 47: **12**
- Unit 48: **8**
- total: **42**

Formal lexical semantic expansions remain only:

- **幾** — Unit-7 interrogative base → Lesson-15 non-interrogative “a few/several”
- **跟** — Unit-24 companionship base → Lesson-15 recipient/addressee “to”

Fresh NEW-character counts:

- Unit 45: **12**
- Unit 46: **9**
- Unit 47: **8**
- Unit 48: **1**
- total: **30**

Grammar introductions remain:

- Unit 46: G001/G002 = **2**
- Unit 47: G003 = **1**
- Unit 48: G004–G007 = **4**
- total: **7**

### Prerequisites / explain-before-test / handwriting — PASS

The repair changes no grammar introduction, lexical ownership, prerequisite edge, character lifecycle, handwriting step, or lock/gating code. Current review counts remain **32 / 34 / 34 / 58** for Units 45–48, and all 30 NEW characters retain their existing intro → trace → build → complete → memory lifecycle with later retrieval.

### All 25 dialogue turns — PASS

The established frozen distribution remains intact and is untouched by the repair:

- Unit 45: D1T01–D1T05 = **5**
- Unit 46: D1T06–D1T12 = **7**
- Unit 47: D2T01–D2T07 = **7**
- Unit 48: D2T08–D2T13 = **6**
- total: **25**

Current Unit 45–47 production files are untouched by the repair commit; the Unit-48 patch changes only the two A003 support/source phrase records, not any D2T08–D2T13 dialogue record.

### A001 / A004 / A005 — PASS

Current production retains:

- A001 exact four-row source table and the four Unit-48 transfer checks;
- A004 all three 把 source outcomes with controlled order practice and Unit-48 delayed review transfer;
- A005 all four health-condition questions and later review transfer.

No A001/A004/A005 payload is touched by the A003 repair.

### Review floors / delayed retrieval / Search-Mega behavior — PASS

Review floors remain:

- Unit 45 = **32**
- Unit 46 = **34**
- Unit 47 = **34**
- Unit 48 = **58**

Delayed Lesson-15 retrieval remains in later reviews. Canonical Search and Mega/practice ownership remain unchanged outside the intended empty-token isolation of the two A003 support/source cards.

### Unit-48 cumulative closure — PASS

`u48-review-cap1` through `u48-review-cap4` remain present, alongside the cumulative A001–A005 transfer, grammar/sense contrasts, and retrieval of earlier Lesson-15 material.

### 一直 / 直 migration — PASS

Current production still first-owns:

- **一直** as NEW vocabulary in Book-1 Unit 45;
- **直** as a NEW formal character in Book-1 Unit 45.

Book-2 Unit 1 still lists **一直** under review vocabulary and **直** under review characters; it does not reclaim canonical first ownership. The A003 repair does not alter Book-2 Unit-1 topology or saved-progress IDs/order.

## Final state decision

**PASS — 0 BLOCKER / 0 MAJOR / 0 MINOR.**

State transition authorized:

- Source gate: **PASS**
- Dependency gate: **PASS**
- Gate A / curriculum: **PASS / frozen**
- Gate B / activities: **PASS / frozen**
- Implementation gate: **PASS**
- Deterministic QA: **PENDING RERUN**
- Simulation A: historical **FAIL**, not rerun
- Simulations B/C: **NOT RUN**
- Release: **LOCKED**
- Book 1 complete: **false**

Next valid action: rerun Stage 6 deterministic QA against the current repaired PR head. Do not reuse the historical deterministic PASS as release evidence.
