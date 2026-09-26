# Book 1 character quality repair — 2026-09-26

Base: `fd6f50f` (global Pinyin Search and unlocked standalone handwriting).

## Verified defects and repairs

- **122 misaligned handwriting datasets in Units 26–36.** The source hydrator inverted and clamped median Y coordinates while leaving outlines unchanged. Restored original AnimCJK medians by matching every character's existing outline paths exactly; no glyph outlines or stroke ordering changed. The hydrator now preserves source coordinates. Character coverage validation rejects misaligned guides, and regression tests reject the old inverted 國 data while accepting every bundled glyph.
- **70 boilerplate character cards in Units 38–48.** Replaced metadata-like notes, generic memory text and whole-character placeholders with character-specific usage, visual mnemonics and component explanations. Components cover every stroke once. Inspected color-coded renderings of all affected characters. Kept the already substantive 口 card.
- **42 Lesson-15 vocabulary entries without usage notes.** Added practical explanations, including 吃藥, the contextual meaning of 難看, 把, separable verbs and measure words. Checked Lesson-15 vocabulary against the supplied Book-1 PDF, printed pages 326–327 and 330–331.

## Compatibility

All 355 authored lesson payloads are byte-equivalent as serialized objects to the base; no lesson step IDs, order, answer keys, ownership or vocabulary IDs changed. Every character's standalone practice step IDs and types remain unchanged. `practiceBuild` separates display layout from the decision to insert a build step, preserving saved five-step practice sessions while improving component diagrams. Existing independent Search/handwriting access remains intact.

The immutable migration snapshot remains untouched. A narrow chained amendment records the improved 直 character record and added 一直 usage note, which are the only changed records present in that snapshot.

## Validation

- Curriculum generation and validation, all 471 formal character records, TypeScript and GitHub Pages production build passed locally.
- 165 curriculum/geometry tests passed; the migration-only environment gate was intentionally skipped as before.
- Targeted rendering/navigation/checkpoint/handwriting checks passed for all eleven edited units (38–48).
- 36 vocabulary lookup, Mega Challenge and practice-engine regressions passed.
- The exhaustive `practice-content` regression remained CPU-bound after twelve minutes and was stopped; it is not counted as a pass. The full Feature QA workflow must pass before release.
- Automatic approval review blocked the GitHub push because publishing requires explicit user authorization. Changes are committed locally; the live site has not been updated.

This maintenance pass repairs the demonstrated defects. It is not a new independent linguistic audit of every Book-1 assessment.
