# Teaching quality review — 2026-10-01

Reviewed the current 52-unit course (48 Book 1 units and four Book 2 units), comprising 362 lessons and 6,020 activities. The four Book 2 units cover the first source lesson, not the entire second textbook.

This pass examined sentence explanations, grammar and comprehension questions, answer choices, first-use vocabulary support, and feedback/grading behavior. It used the supplied Book 1 and Book 2 PDFs, current teaching sequences, and the existing grammar review. Structural checks cover every activity; this is not a claim that every possible linguistic omission has been eliminated or that every stroke activity received a new manual review.

## Concrete changes

- Revised 291 phrase records across a total of 38 changed units; filled all 156 previously blank phrase notes. Replaced later-unit recognition and vocabulary placeholders with actual explanations, retaining brief notes where they already teach the relevant point.
- Corrected 35 activity records, including context, misleading generalizations, vocabulary trivia, and equivalent distractors. Most changes preserve the original target answer; explicitly revised choices and answers stay together.
- Improved five character records and one formal grammar explanation. Added 房東, 語言交換 and 麵線 explanations before the relevant questions, and clarified day-duration counting and 紅葉.
- Show sentence notes after order exercises even when no grammar tag is attached. Semantic listening defaults to a meaning question.
- Use the lesson word-order grader for practice keyboard and button submissions. Explicitly accept both simultaneous-action orders in the two authored 他們一邊吃麵，一邊看地圖 examples. Alternatives reuse the exact token inventory; strict questions still require their specified order.
- Reject empty phrase explanations during course validation. Added regression tests for explanations, choice feedback, alternative answers, feedback visibility and the medicine-packet premise.

## Important adjudications

| Problem | Correction |
| --- | --- |
| 是…的 questions sounded like universal bans on object/why constructions | Tie the questions to the actual sentence role or location correction. The supplied Book 1 event-focus section teaches a narrower pattern; other Mandarin constructions are not declared impossible. |
| 把 quiz distractors included another grammatical sentence | Ask which sentence conveys the specified action, eating the particular dumpling. Explain meaning without banning every other verb after 把. |
| A duration sentence was treated as proof that a stay had ended | State the finished-stay context. Explain that a single 了 does not independently establish departure. |
| 不跟 comparison correction lacked its second clause | Supply the complete rejection and replacement, so the learner can identify what is corrected. |
| 不能 was always labeled prohibition | Supply a blocked-route context and explain inability in that situation. |
| 著 explanation lacked its relationship to 在 | Explain maintained state/background action versus an action presented as in progress; do not teach automatic interchangeability. |
| Medicine packet arithmetic lacked a premise | Explicitly state one packet per dose in the practice label before asking for the total. This is a language exercise using a hypothetical label. |
| Two shopping distractors expressed the same quantity | Replace the duplicate meaning with a different pen/notebook quantity. |
| 紅葉 was glossed exclusively as maple leaves | Use red autumn leaves; the word is not restricted to maple trees. |

The Book 1 focus construction was checked against PDF pages 280–282 (printed 253–255). Book 2 directions and its five grammar targets were checked against its first-lesson vocabulary/grammar pages. These references document editorial provenance; learners receive the explanations directly in the app.

## Connected materials review

Six note-dependent fingerprints changed. Their Chinese, pinyin, translations, answer targets and eligibility did not change:

| Connected record | Semantic check |
| --- | --- |
| Listening `buy-for-her` | 請幫她買一杯茶 still requests one cup for her; distractors change beneficiary or quantity. |
| Listening `spicy-noodles` | The noodles are tasty but slightly spicy; distractors deny spice or substitute price. |
| Listening `shop-location` | 附近 still means near the school, not inside or far away. |
| Sense `好:0` | 好吃 evaluates the bun as tasty; 好喝 contrasts drink usage. |
| Sense `上:2` | 上課 remains attend/have class; the note explains time and location. |
| Sense `得:0` | 得 introduces performance after the repeated verb; neutral de is distinguished from děi. |

Only these reviewed fingerprints were refreshed. No reading contracts or listening eligibility were relaxed.

## Preservation and verification

Compared all 52 units against the pinned pre-edit snapshot: every lesson ID, activity ID, checkpoint sequence, first-owned character list and vocabulary ownership location is unchanged. The immutable migration baseline is preserved through a separate before/after amendment.

Course generation and character coverage pass for all 52 units and 486 first-owned characters. New teaching-quality tests pass, including malformed-alternative rejection and both input paths using the shared grader. The pull request's Feature QA runs targeted unit tests, the full curriculum/regression suite, TypeScript checking and the Pages production build; those checks are the release gate.

Residual limits: automated checks can detect missing explanations and invalid answer structure, but cannot prove pedagogical completeness, naturalness or pronunciation. This pass does not re-record or manually audition every audio item, and does not certify the remainder of Book 2.
