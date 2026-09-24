# Change Impact and Revalidation Rules

Every fix must declare a blast radius before it is applied.

| Blast radius | Typical example | Minimum revalidation |
|---|---|---|
| LOCAL | typo, one distractor wording | affected item + deterministic QA |
| ACTIVITY | replace/reorder an exercise | affected activity audit + deterministic QA |
| UNIT | change teaching order inside one unit | all activity audits for that unit + learner simulation for that unit + deterministic QA |
| CROSS_UNIT | move review/Search/Mega responsibility across units | cross-unit activity audit + all affected learner simulations + traceability + deterministic QA |
| CURRICULUM | move vocabulary/grammar/character ownership or change unit boundaries | reopen Gate A, rebuild affected activity specs, rerun downstream audits, traceability, deterministic QA |
| SOURCE | change interpretation/extraction of authoritative source | reopen source gate and every affected downstream gate |

## Non-negotiable rules

- A downstream PASS never survives an upstream change automatically.
- A fix cannot be labeled LOCAL merely to avoid revalidation.
- If the true blast radius is uncertain, use the larger category.
- Any source/curriculum ambiguity that changes learner-facing content requires human review rather than guessing.
- After the final code change, the complete deterministic QA suite must pass again.
