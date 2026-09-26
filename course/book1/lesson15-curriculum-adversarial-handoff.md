# Book 1 Lesson 15 — Fresh-context Adversarial Curriculum-Audit Handoff

Working repository: Weather-Mister/hanzi-steps  
Working draft PR: #69  
Working branch: book1-lesson15-source-a  
Published Book-1 endpoint before Lesson 15: Unit 44

Current checkpoint: Stage 3 rough split, refined split, and final proposed blueprint are complete. Proposed architecture is Units 45–48. Gate A remains PENDING.

## Mandatory fresh-context rule

Use a **new ChatGPT context** for this audit.

Read:
1. automation/book1/PROTOCOL.md, especially Stage 3 / Curriculum architecture and Gate A.
2. ADDING_A_UNIT.md, especially pacing and prerequisite-before-test rules.
3. course/book1/lesson15-source-ledger.md.
4. course/book1/lesson15-dependency-ledger.md.
5. course/book1/lesson15-dependency-audit.md.
6. course/book1/lesson15-curriculum-blueprint.md.
7. course/index.json through Book 1 Unit 44.
8. Targeted prior unit files only when needed to verify a disputed prerequisite.
9. course/book1/completion.json.

If source-fidelity or pedagogy audit artifacts already exist, **do not read their verdicts or reasoning before completing your own independent adversarial review**.

## Audit posture

You did not create this Units 45–48 plan. Assume it contains subtle flaws. Try to prove it should not pass Gate A.

Search specifically for:
- source omissions;
- duplicate ownership;
- hidden or future prerequisites;
- grammar used before teaching;
- artificial unit splits;
- overloaded or thin units;
- bad deferrals;
- unsafe proper-name/support handling;
- character-order problems;
- unsupported additions;
- cross-unit inconsistencies;
- Search/Mega/handwriting ownership leakage;
- source activities/outcomes that are only named rather than actually supported;
- upstream classifications silently altered by architecture;
- dialogue turns placed before every NEW/EXPANSION dependency is available;
- source support whose literal wording exposes untaught glyphs;
- a unit that only appears balanced because support items were counted as formal novelty.

Hostile checks that deserve special attention:

1. **Unit 45** — 12 NEW words and 12 NEW characters. Prove whether the no-formal-grammar choice actually makes that load safe.
2. **V026 幾 pull-forward** — verify G001 really needs the expansion before ownership and that the plan does not accidentally redefine interrogative 幾.
3. **V035 別 pull-forward** — verify G002 cannot expose its negation branch before 別 and that the later advice use remains coherent.
4. **G001** — do not allow it to collapse into Unit-40 question-word + 都/也 totality.
5. **G002** — attack the definite-object bias, outward-transitive restriction, inward-verb rejection, sentence-final 了, negation, and question-form prerequisites. Check the verbal-了 vs sentence-final-了 distinction explicitly.
6. **G003** — attack the 一…就… contrast, 以後 branch, and no-A-not-A rule.
7. **G004/G006** — verify G004 precedes G006 and the 一點 meanings remain separated.
8. **G005** — verify action comparison is not merely old 比 + old 得 juxtaposed without explicit teaching.
9. **G007** — verify all new separable forms used productively are lexically available first.
10. **Activity I** — preserve the exact source table, 臺南, names contextually, fractional bowls, 小時 and 分鐘. No unsafe substitution.
11. **Activity III** — 一日4次 / 3日份 / 飯後30分鐘 must be available before the questions; 12 packets must remain arithmetic only.
12. **Activity IV** — source-required 把 outcomes must remain intact.
13. **Activity V** — must genuinely support four health-condition questions.
14. **Deferred glyphs** — no 白、妳、玉、安、田、李、陳、王、烏、龍、北、紐、約、診、拒、絕 leakage into productive testing.
15. **您 / 份** — verify explicit support appears before literal productive use.
16. **一直 / 直** — verify Unit 45 is canonical first ownership and Book 2 is not treated as a prerequisite.
17. **Unit 48** — verify 9 lexical learning targets + four formal grammar systems + three activities + culture/capstone is pedagogically coherent rather than overloaded.
18. Verify every formal NEW/EXPANSION item is owned exactly once and every 30 NEW formal character has one first owner.

## Required output

Return:
- BLOCKER findings
- MAJOR findings
- MINOR findings
- PASS / FAIL

PASS requires:
- BLOCKER = 0
- MAJOR = 0

If defects are found:
- repair the smallest affected curriculum artifact;
- update rough/refined files if a boundary/allocation/prerequisite decision changes;
- re-audit the corrected final blueprint until the adversarial audit genuinely satisfies the protocol;
- do not silently change upstream source/dependency classifications; reopen the affected upstream gate if a genuine upstream defect is discovered.

Persist the final audit as:
- course/book1/lesson15-curriculum-adversarial-audit.md

Update course/book1/completion.json accordingly.

Gate A may pass only if:
- source gate PASS;
- dependency gate PASS;
- source-fidelity curriculum audit PASS;
- pedagogy curriculum audit PASS;
- adversarial curriculum audit PASS;
- open BLOCKER = 0;
- open MAJOR = 0.

Only then may the blueprint be marked frozen and the controller advance to activity engineering.

## Stop condition

Do not:
- design learner-facing activity payloads;
- implement Units 45–48;
- modify live application code;
- merge PR #69;
- publish anything.

Stop after the adversarial curriculum-audit artifact/controller update, or after Gate A freeze only if all three audits have genuinely passed.
