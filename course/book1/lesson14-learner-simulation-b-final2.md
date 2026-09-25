# Book 1 Lesson 14 — Final Learner Simulation B (Rerun 2)

Simulation: **B — adversarial test taker**

PR: **#68**  
Branch: `book1-lesson14-source-a`  
Reviewed learner-facing head before this report commit: `10c092d081910140fd6a76e8078b89acb7c5574d`

## Independence

This simulation was performed from `course/book1/lesson14-learner-simulation-rerun2-handoff.md` in a fresh context.

I did **not** read either of the other rerun-2 learner-simulation reports before completing this simulation.

The earlier final Simulation B report was historical evidence only. The adversarial checks and verdict below were completed independently against the current rerun-2 implementation before consulting that historical report for report-format continuity.

## Scope

I attacked the current learner-facing activity payload and runtime behavior for Units 42–44 using:

- `course/book1/lesson14-unit42-activity-spec.md`
- `course/book1/lesson14-unit43-activity-spec.md`
- `course/book1/lesson14-unit44-activity-spec.md`
- `course/book1/unit42.ts`
- `course/book1/unit43.ts`
- `course/book1/unit44.ts`
- `components/learning-app.tsx`
- `course/runtime.ts`
- `lib/curriculum.ts`

The pass covered every learner-facing `select`, `listen`, `order`, and `match` item, every review step, and all four final capstone constructions.

Current assessed payload totals:

- **123 select**
- **26 listen**
- **29 order**
- **1 match**
- **179 select/listen/order/match items total**

Review lengths:

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

### 1. Exactly one defensible answer per select/listen

Result: **PASS**.

Every select/listen item was attacked for missing keys, duplicate options, multiple defensible answers, misleading wording, and answer-key mismatch.

Structural verification found:

- every stored answer appears exactly once in its displayed option bank;
- no option bank contains duplicates;
- no keyed answer is absent;
- the prompt/context leaves one defensible displayed answer for every select/listen item.

The grammar contrasts remain distinguishable, including completed duration vs duration-to-now, verb repetition, 想 “miss,” 快/要 imminence, 更, 跟…一樣 / 沒有…那麼 / 比, and the A003/A004 transfer items.

### 2. Repaired Unit-43 A002 item

Result: **PASS**.

`u43-a002-s2` now asks:

> Which question asks how long someone lived there?

with:

- `你在那裡住了多久？` — keyed answer;
- `你以前住在哪裡？` — location-before question;
- `你在臺灣住了半年嗎？` — yes/no confirmation of a stated duration.

`你在臺灣住了半年嗎？` is prerequisite-safe and is not defensible as an answer to “how long”; it asks whether the six-month proposition is true. It contains no future Lesson-14 NEW vocabulary, character, or grammar.

### 3. No future NEW distractors

Result: **PASS**.

I compared every select/listen option against the sequential Unit 42→43→44 NEW vocabulary/character ownership and manually checked the Lesson-14 NEW grammar progression.

No assessed option exposes a later Lesson-14 NEW vocabulary item, NEW character, or future Lesson-14 grammar construction before its teaching point.

The repaired A002 item remains clean, and the later G004/G005 material does not leak backward into earlier assessed Chinese distractors.

### 4. Listening audibility and unique representation

Result: **PASS**.

All **26** listening items satisfy the required invariant:

- the keyed answer is literally audible in `audioText`;
- exactly one displayed option is represented in that audio;
- no item has two displayed choices simultaneously present in the spoken text.

No inaudible key or multi-option listening ambiguity was found.

### 5. Order banks reconstruct taught phrases exactly

Result: **PASS**.

All **29** order items were checked against the global phrase registry.

For every order step:

- the referenced phrase resolves;
- the order step's `tokens` array exactly equals the referenced phrase's canonical `tokens` array;
- concatenated tokens reconstruct the taught Chinese phrase;
- the referenced phrase is taught earlier than the order step.

This includes all cross-unit delayed-retrieval orders and all four final capstone orders. No missing, added, reordered-source, or premature phrase target was found.

Runtime verification also confirms that order checking resolves `phrases[step.phrase]` through the globally assembled phrase registry.

### 6. Match item

Result: **PASS**.

`u44-review-vmatch` is a one-to-one learner-facing match among:

- 傘 → umbrella
- 濕 → wet
- 更 → even more

All three characters were taught before the review, and the three meanings are distinct. The runtime shuffles the meanings while preserving the character identity used for correctness, so there is no duplicate-meaning ambiguity.

### 7. Review integrity

Result: **PASS**.

All review steps were checked, not only the select/listen/order subset.

- Unit 42 review has **25** steps.
- Unit 43 review has **28** steps.
- Unit 44 review has **41** steps.
- Every review handwriting `complete` target is a character taught earlier.
- Review phrase references resolve.
- Review select/listen/order/match items remain learner-facing and prerequisite-safe.

The mandatory Unit-44 count is exactly **41**.

### 8. No curriculum-metadata-only assessment

Result: **PASS**.

No item asks the learner to identify internal IDs such as G001/G002/G003/G004/G005, activity IDs, ownership labels, gate names, or curriculum bookkeeping.

Some prompts explicitly frame a rule or fact as coming from the textbook/source, but the learner must still judge actual Chinese grammar, meaning, or historical reading content. Those are content assessments, not metadata-only shortcuts.

### 9. Final capstone remains Chinese construction

Result: **PASS**.

All four final capstone items are `order` construction tasks with Chinese-only token banks:

1. `u44-review-cap1` → `這次的颱風 / 會比上次的更大 / 請大家多小心`
2. `u44-review-cap2` → `因為我怕冷 / 所以我比較喜歡春天`
3. `u44-review-cap3` → `希望 / 這次的沒有上次的那麼可怕`
4. `u44-review-cap4` → `我在臺灣 / 住了一年`

Each token bank exactly matches its taught phrase record. None contains English curriculum labels or asks for outcome identification.

### 10. Activity-spec coverage

Result: **PASS**.

Every implemented select/listen/order/match ID is represented in its current Unit-42/43/44 activity specification:

- Unit 42: **51 / 51**
- Unit 43: **58 / 58**
- Unit 44: **70 / 70**

No assessed implementation item is orphaned from the frozen unit activity packet.

## Final result

**PASS — zero BLOCKER, zero MAJOR, zero MINOR.**

Final-rerun-2 Simulation B found no learner-facing adversarial-test-taker defect that requires reopening Gate B, implementation, or deterministic QA.
