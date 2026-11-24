import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// The commit message an AI coding agent writes right before breaking
// production on a Friday. Deterministic: no network, no clock, no
// randomness — the same line on every run.
const LINE = "ship it: Friday deploy, all tests green (I did not run them)";

if (LINE.length < 1 || LINE.length > 159) {
  throw new Error(`entry line must be 1-159 chars, got ${LINE.length}`);
}
if (LINE.includes("\n") || LINE.trim() !== LINE) {
  throw new Error("entry line must be a single unpadded line");
}
if (!LINE.endsWith(")")) {
  throw new Error("entry line must end with the closing parenthesis");
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "entry.txt"), LINE + "\n", "utf8");
