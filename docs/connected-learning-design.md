# Hanzi Steps: connected reading, listening, and character intelligence

Design baseline: `Weather-Mister/hanzi-steps`, main `abb1b992b67a310f52ca0140ae7d4beabb67ab8d` (PR #98). Inspected 30 September 2026. The subsequent implementation is authorized by the user's follow-up. This document separates the first coherent release from later expansion.

## 1. Current-state findings

### What already exists

| Area | Current implementation | Consequence |
| --- | --- | --- |
| Canonical curriculum | `course/schema.ts`, 52 unit modules, `course/manifest.json`, generated registry/index, `course/runtime.ts` | Extend through references; do not add another word/character registry. There are 48 Book-1 and four Book-2 units, 362 lessons, 546 lexical entries, 489 character records and 872 phrases at this baseline. |
| Ownership | `newVocabulary`, `newCharacters`, grammar introductions; `validation/course-io.mjs` and unit-specific validation | Preserve all owners, lesson IDs and authored step positions. Unit modules own canonical data, not the new relationship layer. |
| Reading | 14 original checkpoints at Book-1 U10,13,16,19,22,25,28,31,34,37,40,44,48 and Book-2 U4 | Most proposed reading UX is already implemented. Reuse content, stable IDs, questions, local saved answers and inline entry points. |
| Reading interactions | `components/reading-checkpoint.tsx`; hidden pinyin, word popovers, separate pronunciation reveal, four questions, submit-before-breakdown, per-line explanations, evidence links | Preserve. Add an overview path, explicit dependency contracts, connected explanations and a full translation assembled from existing translations. |
| Reading persistence | `hanzi-reading:<profile>:<id>:v<version>` local storage; not cloud lesson sessions | Do not manufacture lesson completion or claim these answers sync. Do not erase attempts for metadata-only changes. |
| Cumulative relationships | `course/enrichment/knowledge.ts`, `lib/cumulative-knowledge.ts` | Already has eight usage links, four character families, cross-unit grammar references, reading links and grammar-example adapters. Extend this rather than inventing a graph database. |
| Adaptive practice | `lib/practice-engine.ts`, `components/smart-practice.tsx`, practice mastery hook | Daily 10/Mixed Mastery already interleave up to three grammar/usage/family tasks and schedule skill-specific attempts. |
| Mega | Original Mega is pinyin/meaning → handwriting, not Hanzi → meaning. Reverse Mega is now named **Pinyin Gauntlet** | Preserve both queues, skip/give-up/mastered behaviour, IDs and independent modes. New listening must not share their mastered exclusions. |
| Pinyin | Search normalization in `lib/vocabulary-lookup.ts`; Reverse Mega compares compact normalized strings | Already accepts tone marks, digits, toneless input and ü/v/u:. It also discards incorrectly supplied tones. Make that explicit as a tolerant spelling policy and centralize it; do not silently turn existing Gauntlet into a tone exam. |
| Cards | Existing primary meaning, stroke/part information, memory aid, 244 supplementary-character entries, and learned relationship notes | Rich cards are partly built. Avoid replacing the `Character` type with arrays of copied words/examples. |
| Search / handwriting | Search is globally available; `characterPracticeAvailable` returns true for any existing character record | This is intentional user-requested behaviour. An outdated comment in vocabulary lookup still describes a lock that no longer exists. Browsing/writing is not proof of curriculum learning. |
| Listening | 271 authored `listen` steps and `useSpeech` device TTS, Taiwan Mandarin voice, rates .85/.65 | There is useful source material but no dedicated listening path. These steps are not all automatically safe for reuse as full-sentence meaning questions. |
| Audio validation | General shape/subsequence checks plus frozen semantic-listening payload regressions for affected units | Reuse existing tests. `semanticAnswer:true` is not semantic proof. A new semantic corpus needs explicit editorial review tied to its complete payload. |
| Deployment | Static Vite/GitHub Pages; Supabase progress RPCs; `push-sw.js` handles notifications | No general offline application-cache implementation was found. Preserve push/PWA configuration; do not promise offline cold starts or guaranteed offline TTS. |

### Weaknesses that change this plan

1. **Global reference access is not learned status.** Neither opening Search nor finishing `practice-字` may unlock sentences, comparisons or later senses.
2. **Reading dictionary fallback is too broad.** It inserts every character record even at early checkpoints. Existing content tests catch several cases, but the runtime itself should be boundary-safe.
3. **A review completion alone currently unlocks a reading.** This is insufficient for sparse/imported state or learners entering Book 2 directly. Require the cumulative prerequisite boundary, not a numerically high unit or a single review flag.
4. **Character supplementary examples can expose future/uncurated language.** A collapsed section is not an eligibility check. Retain the reference data, but default cards need an explicit reviewed sense gate, not automatic approval based on familiar glyphs.
5. **Known characters do not imply a known word or sense.** The existing cumulative phrase gate checks grammar and glyph introduction but cannot prove lexical/semantic completeness. New shared materials must carry reviewed token boundaries and usage dependencies.
6. **There is duplicated representation, not simply duplicated ownership.** Reading lines store their own sentences, pinyin, translation and local gloss overrides; phrase/rule examples sometimes represent the same text. Keep these original sources, address them by references, and do not merge sentences solely because their visible text matches. Different contexts can change meaning.
7. **The brief overstates deterministic semantic validation.** Code can verify one keyed option, referential integrity, payload freshness and agreed evidence; it cannot establish that an English distractor is indefensible in natural language. Editorial adjudication plus drift detection is required.
8. **Lines are not sentences.** Most current readings have five lines but multiple clauses/sentences per line. Count characters, clauses, support density and inference demand; do not pad readings to hit line targets.

The attached textbooks were inspected via local text extraction for their overview, Book-2 contents and first-lesson material. They support a functional, communicative progression and Book-2 directions/discourse. No new passage is claimed to be a textbook quotation; no unseen source image, dialogue recording or external page is required. OCR is unsuitable as an unquestioned pinyin source.

## 2. Refined learner experience

### Reading

Keep optional checkpoints after unit challenges; they do not block the next canonical lesson. Add a **Reading Path** entry in Practice showing the existing checkpoints in book order, including locked, available, in-progress and completed states. Keep the existing inline stages and revisit links.

The passage opens in Traditional Chinese without pinyin or translation. Known words remain ordinary text; support-only spans get dotted underlines. Tapping reveals a compact meaning; pronunciation remains a separate action. A support-only word never opens unrestricted future-character help or a writing action. Known constituent help is permitted only within the same boundary.

The learner answers all questions, submits once, then sees score, evidence and **Break It Down**. A perfect score is not necessary. Show the full natural translation assembled from the line translations, sentence-level notes, optional pinyin, learned grammar/usage connections and reading tips. No hidden translation in accessibility labels or pre-submit DOM. Replaying resets the attempt deliberately; closing/reopening resumes it. Help after submission does not retroactively change the attempt's support label.

Progression: retain the existing 14 placements and genres for the first release. U10–16 focus on preference/order/detail across roughly five short turns; U19–28 introduce location, time and comparative decisions; U31–44 require reference resolution, omitted arguments, explanations and changed plans; U48/Book-2 U4 integrate longer multi-clause turns. Later expansion adds a menu/notice and a longer Book-2 narrative only after its vocabulary/grammar exists. Vary information structure, not merely the title of the same template.

### Listening

Add **Listening Path** in Practice with short sessions from reviewed existing phrases and a few existing reading scenes. Group by prerequisite unit and expose available/locked stages. Start with three useful interactions:

- **Hear the meaning:** play an existing complete phrase/sentence; choose among reviewed English interpretations. The full meaning, not a single matching word, determines the answer.
- **Hear and type pinyin:** reuse that sentence's canonical display pinyin and the shared tolerant matcher. This checks sound-to-spelling, not semantic understanding, and is labelled accordingly.
- **Listen to a scene:** play an existing short reading in line order; answer its supported comprehension questions before revealing the transcript/breakdown. This reuses the passage and questions, not copies.

Normal practice has unlimited replay and natural-rate TTS. Slow playback is optional help, never automatic. Challenge mode offers two successful plays per item, no slow button and no early transcript. A failed or cancelled play does not consume a replay or produce a listening score. If a Taiwan voice is unavailable, offer an unscored transcript fallback/skip; never call silent text study listening success.

After a response, always show canonical Traditional text, tone-marked pinyin, natural meaning and explanation. Default to no automatic playback: user gesture is reliable on mobile and avoids surprise audio. Do not speak answers before submission through aria labels. A scene need not use artificial speaker voices; preserve line order with short boundaries.

Adaptive integration is **opt-in** in Practice because sound may be inappropriate in the user's surroundings. Add at most one eligible, due, reviewed listening item to Daily 10; retain the round size and cumulative knowledge questions. Store it under a listening-specific item ID using an existing compatible practice mode. Listening recognition must not increase handwriting, Gauntlet or canonical lesson mastery. Dedicated listening and adaptive practice use the same task and recording code.

Do not build seven modes, speech recognition, recorded-voice infrastructure, or Listening/Mixed Mega in this release. Hanzi-selection is easily dominated by reading; sentence reconstruction duplicates existing order activities. Add them only if a specific learning gap justifies them.

### Character intelligence

Preserve the primary definition, pinyin, stroke diagram and current parts information. Add collapsed **Seen in learned words** from a reverse index of canonical vocabulary; include every eligible word containing the character, with no arbitrary truncation. Source ownership labels come from canonical units.

Keep **Other common meanings** collapsed, but show only reviewed senses with explicit teaching/reference gates and safe examples. Existing supplementary data remains reference data, never vocabulary. Familiar glyphs alone do not unlock a new use. Unreviewed supplementary entries remain stored but are withheld from default course cards until audited.

Use the existing **Connections you have learned** for visual/phonetic/usage comparisons. Show a family only after every member is introduced. For usage, require the actual teaching of that sense (not just the oldest owner of 幾 or 跟). Keep examples linked to existing phrases. No new etymology or automatically inferred phonetic/semantic claims. No all-homophones list.

Search and standalone writing remain globally accessible. Enrichment inside those surfaces still observes learned-context gates. The selected future character itself is an intentional reference lookup; that is not permission to reveal all future compounds.

## 3. Data and module ownership

Use a small static relationship layer built once from the imported unit registry, plus hand-authored reviewed contracts. No graph database, network requests, runtime AI, or duplicate canonical declarations.

| Concept | Owner | Generated/derived versus authored |
| --- | --- | --- |
| Canonical words, characters, grammar, lesson order | Existing unit modules/schema | Authored as today; generated registry/index unchanged |
| Character/word owner and teaching maps, words-by-character, cumulative prerequisite sets | New `lib/curriculum-relations.ts` | Derived deterministically from unit declarations and lessons |
| Supplementary sense gates | New `course/enrichment/character-sense-gates.ts` | Reviewed references to existing supplementary entries plus teaching lessons; no copied meanings |
| Sentence address | New `course/materials/schema.ts` | Discriminated reference: phrase ID or reading ID + line; do not deduplicate by raw text |
| Reading token/grammar contract | New `course/readings/contracts.json` | Explicit reviewed segmentation, grammar references, local support classification and origin; existing line text remains in checkpoints |
| Sentence resolution and payload validation | New `lib/learning-materials.ts` | Resolve text/pinyin/meaning at source; derive dependencies and relations |
| Listening activities | New `course/listening/items.ts` | Phrase references, reviewed English distractors, mode eligibility and rationale; scenes reference existing reading IDs |
| Reading/listening paths | New focused components and small additions to Practice | Selectors use completed canonical lessons, not browse availability |
| Pinyin grading | New `lib/pinyin.ts` | Extract current normalization and tolerant matching, re-export old Search API for compatibility |
| Semantic drift checks | New `validation/materials*.test.mjs` and reviewed payload fixture | Build deterministically rejects changed source/answer payload until it is re-reviewed |

Implemented first-release type contracts (unit schemas remain unchanged):

```ts
type SentenceRef =
  | {kind: 'phrase'; id: string}
  | {kind: 'reading-line'; readingId: string; line: number};
type ReadingContract = {
  origin: {kind: 'authored-supplement'; note: string};
  segments: string[][]; // exact concatenation per line; punctuation retained
  grammarIds: string[]; // explicit curriculum prerequisites, not inferred grammar
  contextualForms?: Record<string, {sourceWords: string[]; note: string}>;
};
type TokenStatus = 'learned' | 'recent-target' | 'support-only'
  | 'contextual' | 'forbidden-future' | 'unclassified' | 'punctuation';
type ListeningItem = {
  id: string; source: SentenceRef;
  distractors: {text: string; rationale: string}[];
  reason: string; // correct interpretation is resolved from source.meaning
  modes: ('meaning' | 'pinyin')[];
};
type CharacterSenseGate = {
  char: string; sense: number; // current array index, guarded by payload fixture
  exampleRef: SentenceRef; // derives cumulative teaching and grammar prerequisites
};
```

`source` points to the semantic truth: phrase text is both Hanzi and TTS input; reading scenes speak their lines. Do not introduce editable `audioText` copies for new materials. When a future recorded asset is added, require a manifest hash/transcript contract instead.

Deferred and review-only are existing authoring/ownership policies, not new token enum values: deferred occurrences fail unless explicitly supported, and review-only occurrences resolve to the earlier canonical owner. Initial scenes have no unfamiliar support words; adding a supported scene requires a pre-listening gloss design, enforced by validation. The first release includes 14 listening phrases, three scenes and 14 audited character-sense gates. Source-derived textbook content is not re-authored here.

Existing reading gloss overrides are necessary for contextual senses, numbers and supported compounds; retain them, but mark support explicitly. They do not create new canonical records. Validate exact segmentation rather than relying on a global longest-match dictionary to decide the meaning of Chinese. A globally known word may be a different contextual composition (e.g. 一點 at a clock time). Record the contextual gloss and teaching dependency explicitly.

### Migration

1. Snapshot owners, IDs, lesson lengths, Search/Mega inventories and current generated artifacts.
2. Introduce derived selectors without changing schemas consumed by saved lesson sessions.
3. Extract pinyin functions and retain compatible exports and Gauntlet behaviour.
4. Add contracts to all 14 readings without copying passage text. Keep reading version/answer keys unchanged unless actual assessed content changes.
5. Add reviewed gates for a small set of useful supplementary senses. Do not bulk-approve the entire historical reference dataset based on character coverage.
6. Add a small listening inventory using reviewed phrase references; do not harvest every `listen` step automatically.
7. Use existing practice persistence with distinct listening item IDs. No SQL/auth changes are required. Reading and scene-comprehension summaries remain device/profile scoped and labelled accurately.

## 4. Precise safety rules

- **Canonical:** one original lexical/character owner. A later sense is a relationship/teaching reference. 幾 stays U7; 跟 stays U24; 一直/直 stays U45. Existing `v1:` word IDs and `practice-` lesson IDs are unchanged.
- **Support-only:** occurrence-local, glossed before reliance, excluded from productive item selection, Search insertion, handwriting ownership and mastery. It can support understanding a passage; a question may ask about the event described but may not require unsupported recall of the form.
- **Deferred:** not taught at this boundary. Exclude entirely unless the specific occurrence is explicitly designated support with a gloss. A roadmap item or editor note is not a learner prerequisite.
- **Review-only:** references an earlier canonical owner; never a second owner. A learner who skipped that earlier teaching does not gain knowledge merely by entering a later book.
- **Recent target:** already explicitly taught and completed by the material's boundary. It is a pedagogical label, not a relaxed safety class.
- **Future target:** reject unmarked future lexical forms, senses, glyphs and grammar in passages, prompts, options, feedback/examples or pre-answer controls. All distractors are learner-facing content. Exact reviewed contextual/support exceptions are required; no blanket function-word whitelist.
- **Sense safety:** character meanings and examples require explicit reviewed gates. A word containing familiar characters is not automatically learned. Later pronunciation must not overwrite canonical pronunciation.
- **Confusables:** all endpoints exist and are learned. Symmetric visual groups use one group, not manually duplicated reciprocal links. Directional usage explanations need not be reciprocal. Existing component records describe shapes/mnemonics, not proof of historical etymology.
- **Reading prerequisite:** current checkpoint review plus completed canonical teaching boundary through its unit. This conservative first version avoids sparse-state and Book-2 bypass; show the next missing prerequisite. Later minimize dependency sets only with complete sentence-level annotation.
- **Listening prerequisite:** source phrase actually taught; cumulative canonical teaching boundary through that source plus attached grammar. A phrase's `practice:false` is an absolute exclusion from typed/retrieval listening. Reading-only support stays in scene comprehension, never typed pinyin.
- **Passive exposure:** reading a card, hearing a replay, seeing feedback or using Search does not mark a word/lesson mastered.
- **State isolation:** listening attempt IDs are namespaced independently from word/handwriting/Gauntlet IDs; existing server-supported mode values remain unchanged. Do not infer skill mastery from one correct round.

## 5. Validation plan

Deterministic tests before content growth:

1. Exact source references, unique activity IDs, valid owners, unchanged canonical inventory and no support leakage into productive pools.
2. At every cumulative teaching boundary and selected sparse-state scenarios, future words/characters/grammar are absent from new material eligibility, card words, senses and comparisons.
3. Every reading contract reconstructs every line exactly. Every Han span has a canonical or explicit local classification; unknown/future spans fail. Grammar IDs exist and are taught by the boundary. Support-only character help cannot expose future records.
4. All reading question keys are in range, options distinct and evidence lines valid. Four answers required before breakdown. Wrong answers still unlock review. Old valid progress resumes; corrupt values fail closed; accounts remain isolated.
5. Listening source resolution returns identical Hanzi and spoken text. Canonical pinyin/translation are resolved, not copied. Phrase `practice:false` and missing prerequisites reject eligibility. No future Hanzi in distractors; initial distractors are English.
6. Every semantic option has a rationale and exactly one declared correct answer. Store reviewed full payloads/hashes so changing the sentence, pinyin, meaning, options or key invalidates approval. Human review adjudicates translation, ambiguity and inference; tests preserve it rather than claim to discover it.
7. Pinyin regression cases include tone marks/numbers/toneless, compact/spaced forms, case, ü/v/u:, punctuation, empty input and wrong syllables. Preserve tolerant tone behaviour explicitly. Never make canonical display depend on what the learner typed.
8. Character relations include only actual containing words. Every canonical character retains its card and stroke entry. Supplementary gates resolve existing entries and teaching lessons; no ownership mutations or new productive items.
9. Listening UI tests: no transcript/pinyin before response, successful-play prerequisite, failed-play skip without score, replay limit, normal unlimited replay, optional slow counted as help, scene submission gate, profile isolation, revisit/replay, mobile overflow and keyboard controls.
10. Adaptive opt-in test: zero listening by default; at most one when enabled; bounded round length; no duplication or borrowing of handwriting mastery.
11. Run all existing curriculum/character/practice/progress tests, `course:check`, typecheck, Pages build and focused browser QA. Generated artifacts must be current and unit/step IDs unchanged.

A full-content linguistic review remains necessary when expanding. Structural passing tests alone are not a claim of perfect Chinese or unique natural-language answers.

## 6. Implementation stages

| Stage | Goal / likely files | Required checks / completion criterion | Risk and rollback |
| --- | --- | --- | --- |
| 0 | Preserve baseline and this design | Existing focused suite passes; clean source checkout; owner/lesson snapshot | No production change |
| 1 | Derived relation and pinyin foundation: `lib/curriculum-relations.ts`, `lib/pinyin.ts`, lookup/Gauntlet adapters | Parity tests; sparse-state fixtures; no changed canonical files | Pure selectors; revert callers without data migration |
| 2 | Safe cards: sense gates, `character-meanings.tsx`, new learned-word component, current detail/search/lesson entry points | All gates valid; future examples hidden; all learned compounds present; mobile layout | Some historic unreviewed examples become hidden; reference source remains intact |
| 3 | Reading contracts and overview: readings library, contract JSON, reading/path components | All 14 contracts classified; stronger prerequisites; existing interaction/storage browser regression | Metadata-only update preserves saved answers; readers with incomplete prerequisites see a lock |
| 4 | Reviewed listening: item references, shared task component, path/scene UI, audio hook options | Meaning/pinyin/scene tests, playback lifecycle, disabled failure grading, drift fixture | Additive entry point; no lesson schema migration; synthetic TTS varies by device |
| 5 | Optional adaptive listening through the same task | At most one opt-in item, independent IDs, existing round/mode compatibility | Preference can be disabled; no backend schema changes |
| 6 | Full verification and reviewable delivery | Full regression, typecheck, Pages build, mobile/desktop browser checks; record limitations | Keep isolated branch/commit; removal of new path does not delete old state |

## 7. Open decisions and recommended defaults

| Decision | Default and reason |
| --- | --- |
| Wrong supplied tones in tolerant pinyin | Preserve existing acceptance and always show canonical tones. A strict tone mode is a separate later product decision requiring syllable-aware parsing and sandhi policy. |
| Reading lock with sparse progress | Require cumulative teaching prerequisites, even if a lone unit review is complete. Accurate safety is preferable to silently assuming earlier books. Do not revoke saved answers. |
| Supplementary senses not yet audited | Hide from default enrichment; retain data for subsequent review. Do not use familiar-glyph heuristics as semantic approval. |
| Listening audio source | Use existing device Taiwan TTS with explicit failure handling. Recorded voices require additional source/licensing/performance work and are not needed for the initial release. |
| Cross-device reading/listening scenes | Keep current local, profile-scoped checkpoint model for now; continue using existing sync for scored practice attempts. A unified event-store migration is unnecessary to connect curriculum data. |
| Listening inside Daily 10 | Opt in, at most one item; never require audio unexpectedly. |
| Reference exposure | Keep global Search and writing access; gate enrichment and assessment separately. |

## 8. First release and expansion

**Smallest worthwhile release:** a shared static relationship/prerequisite layer; centralized tolerant pinyin; learned-word character links and audited sense gates; all 14 existing readings with explicit contracts, safe help and a Reading Path; a Listening Path with a small reviewed phrase inventory in meaning/pinyin modes and representative scene comprehension; optional one-item adaptive listening; independent evidence and robust audio failure handling. Preserve canonical curriculum and both Mega challenges.

**Next expansion:** audit more supplementary senses; add a Taiwan menu/notice and a longer Book-2 reading after the corresponding teaching exists; increase the reviewed listening inventory; add sentence-level minimal prerequisite sets; then consider a listening challenge rotation with its own mastery and cross-device checkpoint sync. Do not expand merely to fill a mode list.
