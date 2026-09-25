# Book 1 Lesson 14 — final-rerun-3 Simulation B

Simulation: **B — adversarial test taker**  
PR: **#68**  
Branch: `book1-lesson14-source-a`  
Scope: learner-facing Units 42 → 43 → 44, with special focus on the repaired A001 personal-transfer instruction and adversarial correctness of select/listen/order/match payloads.

## Verdict

- **BLOCKER: 0**
- **MAJOR: 0**
- **MINOR: 0**
- **PASS**

PASS criterion is satisfied: there are zero open BLOCKER and zero open MAJOR findings.

## Adversarial findings

No blocking or major defect survived the attack.

### A001 repair

**PASS — learner-visible.**  
`u42-home-country-model` is reached as a normal `phrase` step in `u42-seasons`. The live phrase renderer displays `phrase.note` directly in the learner-facing “How the phrase works” panel, so the repaired instruction is not metadata-only or hidden.

**PASS — cannot reasonably be read as “copy this model.”**  
The visible note explicitly says the sentence is only a model, instructs the learner to describe their own home country/place, and says not to copy the model unless it is genuinely true for them. `u42-season-reason` then explicitly states that the fixed spring sentence is practice and not a substitute for the personal response.

**PASS — required personal content is complete.**  
The A001 instruction requires:
- the learner’s own climate;
- the season they personally like most;
- the season they personally like least;
- their own reason using 因為…所以….

The controlled steps that follow do not erase or replace this requirement.

**PASS — personal production is distinct from controlled practice.**  
The fixed `u42-seasons-home`, `u42-seasons-s1`, `u42-seasons-s2`, and `u42-seasons-o1` items assess comprehension/reconstruction of supplied models. The phrase-card notes explicitly classify those sentences as models/scaffolds while separately assigning the learner’s own spoken or paper response.

**PASS — A001 is distinct from A005.**  
A001 asks for home-country/place climate plus most-/least-liked seasons and a reason. A005 is separately represented by `u42-summer-model` / `u42-summer-write` and asks for Taiwan summer weather, one distinctive feature, common fruit/food, a common activity, and written findings in Chinese. Their learner-facing instructions, content, and output requirements do not collapse into one task.

## Question / answer attack

All learner-facing select, listen, order, and match payloads in Units 42–44 were attacked for:
- answer not present in options;
- duplicate options;
- multiple defensible answers;
- prompt/answer mismatch;
- misleading lexical or grammar cues;
- order-token mismatch;
- missing phrase/grammar references;
- answer leakage that changes the intended construct;
- cross-unit reference breakage.

No incorrect answer key or ambiguous multiple-correct-answer case was found.

Mechanical integrity check:
- Unit 42: 36 select, 8 listen, 7 order — no payload integrity failures.
- Unit 43: 41 select, 9 listen, 8 order — no payload integrity failures.
- Unit 44: 46 select, 9 listen, 14 order, 1 match — no payload integrity failures.

Unit 44’s delayed-retrieval/capstone order items intentionally reference earlier-unit phrase IDs. These are valid at runtime because the global curriculum registry merges phrase dictionaries across all course modules.

The Unit-44 match step is also sound: 傘 / 濕 / 更 resolve to the distinct lexical meanings **umbrella / wet / even more** used by the matching UI.

## Mandatory final checks

- **A001 instruction visible through phrase card:** PASS.
- **A001 cannot reasonably mean “copy the model”:** PASS.
- **A001 covers most-liked + least-liked + reason:** PASS.
- **A001 distinct from A005:** PASS.
- **Fixed model selections/orders remain controlled practice, not the personal transfer itself:** PASS.
- **Existing select correctness:** PASS.
- **Existing listen correctness:** PASS.
- **Existing order correctness:** PASS.
- **Existing match correctness:** PASS.
- **Unit-44 review remains 41 steps:** PASS — exact sequence count is 41.
- **Final capstone remains Chinese construction:** PASS — steps 38–41 are `order` tasks requiring reconstruction of previously taught Chinese for weather/typhoon, seasons/preference, comparison, and experience outcomes.

## Adversarial conclusion

The FR-001 repair closes the prior ambiguity without introducing a new learner-facing defect. The personal A001 transfer is explicitly assigned, visibly rendered, materially different from the fixed scaffold, and kept separate from A005. The remaining Unit 42–44 assessment payloads retain correct answer logic, and the Unit-44 review/capstone structure remains intact.

**Final result: PASS — 0 BLOCKER, 0 MAJOR, 0 MINOR.**
