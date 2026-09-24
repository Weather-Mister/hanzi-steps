import { readFile } from "node:fs/promises";
import { validateBook1CompletionState } from "../automation/book1/validate-state.mjs";

async function readJson(relativePath) {
  return JSON.parse(
    await readFile(new URL(relativePath, import.meta.url), "utf8")
  );
}

const state = await readJson("../course/book1/completion.json");
const manifest = await readJson("../course/manifest.json");
const errors = validateBook1CompletionState(state, manifest);

if (errors.length) {
  console.error("Book 1 controller state is INVALID:");
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

console.log(
  JSON.stringify(
    {
      book: state.book,
      completedThroughSourceLesson: state.completedThroughSourceLesson,
      completedThroughUnit: state.completedThroughUnit,
      currentSourceLesson: state.currentSourceLesson,
      currentStage: state.currentStage,
      stageStatus: state.stageStatus,
      bookComplete: state.bookComplete,
      humanReviewRequired: state.humanReviewRequired,
      workingUnitRange: state.workingUnitRange,
      gates: state.gates,
      openFindingCount: state.openFindings.length
    },
    null,
    2
  )
);
