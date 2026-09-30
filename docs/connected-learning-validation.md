# Connected learning: review and verification record

Baseline: `abb1b992b67a310f52ca0140ae7d4beabb67ab8d`. Review date: 2026-09-30.

## Scope and semantic review limits

This is the implementation agent's editorial review, not an independent native-speaker sign-off. The fixture in `validation/fixtures/connected-materials-reviewed.json` records the exact reviewed payloads. Hashes detect changed content; they cannot prove correct pronunciation, natural translation or uniquely defensible answers. Do not refresh the fixture merely to make a failing test green.

The 14 existing readings retain their original Chinese, translations, pinyin, question keys, evidence and progress versions. They are authored supplementary course practice, not claimed textbook extracts. Reading contracts add segmentation and explicit grammar dependencies. The listening phrases and sense examples point directly to existing curriculum phrases; no editable copies of spoken text or canonical answers were introduced.

## Reading adjudication

Each row records the comprehension facts checked against the passage and its existing evidence. Full options and explanations remain in the single original `course/readings/checkpoints.json` payload and are included in the review fingerprint.

| Checkpoint | Supported answer facts | Important distinction |
| --- | --- | --- |
| Book 1 U10 | Exercise shared; siblings agree on basketball; dinner together; Vietnamese food shared | 不都 is not 都不. 可是 is locally glossed support, not a newly learned word. Speaker labels establish the siblings. |
| U13 | Two buns/one tea; microwave buns; thirty dollars change; takeaway | Quantities and payment are explicit. Change is simple inference from 100 minus 70. |
| U16 | Spicy broth; sister cooks tonight; skill quality rather than ability alone; learn desserts | Yesterday's restaurant and tonight's plan are distinct. Omitted object of 學 comes from the previous sentence. |
| U19 | Friend in library; visitor goes inside from outside; nearby shopping; dinner still proposed | An invitation is not an accepted plan. |
| U22 | Calligraphy blocks 2:30; game ongoing at 4; meet in front of library; 4 confirmed | 一點 is the taught clock composition, not the later lexical sense “a little.” |
| U25 | MRT faster; bus cheaper/nearby; no nearby MRT station; scooters tomorrow | 站/捷運站/公車站 are glossed support. Today's decision and tomorrow's proposal differ. |
| U28 | Two-day visit; train shorter; reading during class; outing plus quiet time | Visit duration differs from journey duration. |
| U31 | Sister and friend blue; brother dislikes photos; friend at window; colour insufficient | Shared colour requires a second identifying clue. |
| U34 | Chinese study first; five-minute walk; heater only suspected faulty; rental not agreed | 分鐘 is local support. 好像 and 還沒有決定 must not be translated as certainty/completion. |
| U37 | Self-funded tuition; arrival six; dinner location open; next-morning work limits evening | Class ending at five is not arrival time. |
| U40 | Pork/noodles ordered; B eats eggs; “eats everything” corrected; fruit only proposed | Completed purchase and suggestion are distinct. |
| U44 | Typhoon/wind changes plan; less cold but windier; umbrella insufficient; dinner after rain | 下 is the separated taught 下雨 construction; a future conditional 了 does not assert the rain has already stopped. |
| U48 | Nose improving but headache remains; medicine already collected; lunch/medicine/rest; evening visit | Advice, completed collection and planned sequence are distinct. This is fictional language practice, not medical guidance. |
| Book 2 U4 | Post-office start; forward/first right; lane behind store; call on arrival | Store is a landmark, not the destination. |

Unknown/support material remains non-productive. The three scene selections (U13, U31, Book 2 U4) contain no unfamiliar support glosses; a test rejects adding a supported scene until a pre-listening support interaction is designed. All scenes keep the original four questions and translations.

## Listening adjudication

Every correct interpretation comes from `resolveSentence(item.source).meaning`. The source's Traditional text is the actual TTS input; pinyin and feedback are resolved from that same record. Each distractor has an authored rationale in `course/listening/items.ts`.

| Item | Decisive meaning | Distractors rejected because |
| --- | --- | --- |
| identity | Speaker is a student | Question about listener / negation |
| two-books | Speaker has two books | One / none |
| swimming-opinion | Swimming is fun in speaker's opinion | Negated fun / wrong activity |
| buy-for-her | Buy one tea for tā | Wrong beneficiary / two cups |
| spicy-noodles | Delicious beef noodles, but a little spicy | Not spicy / price instead of spice |
| shop-location | Shop near school | Inside / far away |
| game-end | Game ends at 6:30 | Starts / wrong hour |
| mrt-faster | MRT faster than train | Reversed comparison / equal speed |
| last-month | Stayed at hotel last month | Next month / school instead of hotel |
| finished-dinner | Dinner action completed | Negative / wish |
| few-friends | Not many friends | How-many question / many |
| recipient | Say/tell to teacher | Teacher as topic / listen instead of speak |
| directions | Forward from here | Backward / right turn |
| simultaneous | Eat noodles while looking at map | Sequential / one action absent |

No distractor contrasts 他 with 她: they are indistinguishable in audio. English gender in feedback follows the source's written pronoun but is not separately assessed. No distractor introduces unfamiliar Hanzi. “Recipient” is intentionally a short course phrase, not misrepresented as a full recorded dialogue.

Typed pinyin deliberately preserves the existing Gauntlet policy: tone marks, numbers and toneless input are accepted; wrong supplied tones are also ignored. The UI calls this spelling practice and always displays canonical tones. Strict tone assessment is not implemented.

## Character adjudication and ownership

Fourteen gates reuse source examples for 好 (taste), 上 (class/previous time), 下 (class ending/rain), 了 (completion/change/duration continuing to now), 得 (complement), 在 (ongoing action), 幾 (small unspecified quantity), 跟 (recipient), 課 (class), 邊 (simultaneous pattern). The precise sense entry, source and gate are fingerprinted together. Unreviewed historical senses remain in storage but are not displayed as learned course enrichment.

Every learned-word row is derived from canonical vocabulary and its teaching lesson. No character/word owners, unit modules, lesson IDs, step order, stroke assets, Search entries or Mega inventories were added or reassigned. Existing family/usage comparisons are reused. No component history or etymology was authored.

## Automated checks

- `validation/connected-materials.test.mjs`: exact passage spans, classification, cumulative and sparse prerequisites, every lesson boundary, safe scene selection, character/word relations, sense gates, source resolution, pinyin parity, adaptive opt-in limits and semantic drift mutations.
- Existing reading tests: valid keys/evidence, known/support character coverage, storage corruption/version/profile handling, no support-only productive ownership.
- `tests/browser/connected-learning.cjs`: mobile/desktop paths and card words, natural audio, hidden transcript, disabled pre-audio grading, numbered pinyin, two-play challenge, missing voice and synthesis errors, slow-assisted results, namespaced mastery, scene submission/resume/replay, adaptive opt-in, fresh locks, no page errors.
- `tests/browser/readings.cjs`: all 14 entry points, hidden pinyin, word/character help, submission-before-breakdown, saved answers, revisit/reset, mobile/desktop overflow and fresh-state locks. Selectors were brought up to date with the existing combined book/unit picker.
- Browser speech is a deterministic mock. Real Taiwanese device voice availability, quality and browser TTS differences still require real-device checks. A failed/cancelled mock play cannot consume a replay or earn mastery.
- GitHub browser QA now runs both suites; curriculum CI discovers the new validation automatically.

Typecheck and Pages build pass. The curriculum suite passes (216 passed, one skipped). Focused connected-material checks pass (11). Both browser suites pass. The broad suite before the final two added checks completed with 313 passed, 13 failed and one skipped, including passing full-progression Daily 10/Mixed/Mega pool tests. The Pages build retains the existing large-bundle warning; no new dependency was added to the application.

All 13 broad-suite failures were reproduced in a detached untouched baseline checkout. `tests/first-time-characters.test.mjs` still expects only ten old units; `tests/character-coverage.test.mjs` requires every historical supplemental component description to exceed 50 characters. The other eleven are historical assertions in `rebalance` and `unit-one` through `unit-eight` tests (retired lengths, old counts/hashes, cross-book progression and old teach-before-test expectations). No canonical data or affected implementation was changed by this feature. These tests are not silently weakened or “fixed” by changing curriculum data. The existing feature/deploy CI uses the current `validation/` suite plus selected practice regressions, not these historical snapshots.

## Rollback and remaining scope

Revert the connected-learning commit to remove the new surfaces. Existing lesson/progress IDs and database schema are unchanged. Namespaced listening practice history and device-local scene answers can remain stored harmlessly; rollback does not need to delete learner data. Existing reading progress versions are unchanged.

Not included: all historical character-sense audits, new textbook passages, recorded audio, speech recognition, strict-tone grading, Listening/Mixed Mega, minimal per-sentence dependency inference or cross-device scene/reading sync. These are explicit next-stage decisions, not hidden half-implemented controls.
