# Book 1 grammar review — 2026-10-01

## Scope and sources

Reviewed the grammar explanations, examples, reminders and associated phrase notes throughout all 48 Book 1 units against the supplied *A Course in Contemporary Chinese*, Book 1. The source grammar sections inspected cover all 15 lessons (PDF pages 34–42, 56–62, 76–83, 98–104, 118–123, 136–150, 165–174, 192–201, 215–222, 235–244, 256–265, 280–289, 304–320, 333–341 and 358–371). The app's early units also introduce foundations ahead of the source's lesson divisions.

The review changes 205 prose, pattern, translation and pinyin fields across 36 units, including 56 grammar-rule records. All Chinese example texts, exercise answers, options, tokens, stable IDs, lesson order, vocabulary/character ownership and prerequisites remain unchanged. Book 2 is unchanged. These are editorial corrections, not a new curriculum release or a claim of independent native-speaker certification.

## Main corrections

| Area | Correction |
| --- | --- |
| 很 and adjective predicates | Explain that 很 is a degree adverb, not a linking verb; neutral and emphatic readings differ. |
| 不 and 沒; verbal and final 了 | Explain negation by meaning and distinguish realized events, changed situations and accumulated durations; avoid English past-tense shortcuts. |
| Context-dependent examples | Supply context for topic-first sentences, bare planned durations, dishes versus vegetables, travel comparisons and completed stays. |
| Comparisons | Preserve the difference between different heights, not as tall and not taller; explain the baseline for 更 and placement of degree phrases. |
| 會 | Separate acquired skills from predictions without automatically inserting “probably” in translations. |
| 是…的 | Explain focused event details, topic versus focus, questions, negation and omission; scope object restrictions to the taught construction. |
| 好/難, adjective reduplication | Avoid presenting the book's selected practice forms as universal restrictions; acknowledge natural 好不好看. |
| 把 and sequencing | Explain the restricted introductory frame, specific objects, negation placement and warning 了; avoid describing every sequence as past. |
| 一點, 得 and separable expressions | Explain placement-dependent meanings, de versus děi, action comparisons and word-specific insertion patterns. |
| English and pinyin | Correct the height translation, “cook herself,” awkward comparative English, a 地方 tone inconsistency and spacing in 書法課. |

## Second pass: specific consistency checks

A second pass compared grammar cards with reminders, examples, phrase notes and quiz feedback. It also compared repeated Chinese sentences for inconsistent pinyin after ignoring case, spacing and punctuation.

Additional repairs:

- Unit 43's duration question now supplies a completed-stay context and explicitly identifies the single-了 pattern. Its feedback no longer infers departure from particle count alone.
- Unit 46's non-specific-question-word quiz and feedback now restrict the negative requirement to the pattern practised in that lesson.
- Unit 39's review feedback explains realized events without implying that every possible result is finished.
- Unit 33's prediction feedback no longer treats a future time word alone as sufficient to exclude the acquired-skill reading.
- Unit 30's adjective-reduplication feedback scopes the excluded forms to the practice list.
- Several English translations and sentence-level notes were made more natural and specific.

## Historical records and connected material

Historical frozen lesson specifications, audit reports and completion records were not rewritten. This document records the editorial amendment; previous release reports describe their original snapshots. Current deterministic validation is recorded below and does not purport to rerun independent historical learner simulations.

`book1-grammar-clarity-amendment.json` extends the immutable lossless snapshot chain for seven grammar records and one phrase record protected by the original migration fixture. Before hashes identify the actual prior records; the original baselines remain intact. Structural comparison across all 48 units additionally confirmed that no IDs, Chinese texts, answers or token sequences changed.

The connected-material review fingerprints changed only because source notes changed for:

- listening `few-friends` and character sense `幾:0`: 她沒有幾個朋友 remains a small-quantity statement, with the same Chinese, pinyin, translation and listening distractors;
- listening `recipient` and character sense `跟:0`: 跟老師說 still identifies the addressee, with unchanged audio text, answer meaning and distractors;
- character sense `了:2`: the duration-to-now example still expresses the duration accumulated at the relevant time, with unchanged sentence and translation.

Those five note-only dependencies were reviewed before refreshing their fingerprints. The 幾 validator now checks the actual explanation of the expanded meaning and occurrence-counting use instead of requiring editorial terminology or an obsolete one-line note.

## Verification

- Curriculum generation, graph validation and character coverage: pass.
- Full validation suite: 218 passed, 1 migration-only check skipped.
- Order answers, vocabulary lookup, Mega Challenge, practice engine, exam study and stroke guidance: 46 passed.
- Focused practice-content checks (complete pool, ambiguous production, same-English variants, support-only isolation): 4 passed.
- Rendering references, navigation, saved checkpoints and handwriting lifecycle: pass for all 52 current units.
- TypeScript and GitHub Pages production build: pass.
- Whitespace/error check: pass.

The broad legacy test command is not claimed as passing: two pre-existing tests fail on unchanged main (an obsolete first-time-character count and a supplemental component-description length assertion). The exhaustive practice-content sweeps are slow locally; final completion status is tracked by CI rather than inferred from the focused checks. No test was disabled to hide a content failure.
