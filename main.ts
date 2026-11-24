// The Funniest Toaster Error Message — make.fun entry.
// Writes one funny toaster error message to /output/entry.txt.
// Deterministic: the same exact bytes on every run. Node 22,
// stdlib only, no network, no other files read.
import { chmodSync, mkdirSync, writeFileSync } from "node:fs";
import { dirname } from "node:path";

const LINE = "Error: toast stuck. The bread has unionised.";

// Output path: $OUTPUT_PATH when set, else an optional first argument
// (used for local verification); the grader runs `node main.ts`
// with no arguments, so it writes to /output/entry.txt.
const outPath =
  process.env.OUTPUT_PATH ?? process.argv[2] ?? "/output/entry.txt";

function validateLine(line: string): void {
  if (line.length < 1 || line.length > 120) {
    throw new Error(
      `Line is ${line.length} characters, outside the 1-120 character gate.`,
    );
  }
  if (line.trim().length === 0) {
    throw new Error("Line must not be empty or only whitespace.");
  }
  if (line.includes("\n") || line.includes("\r")) {
    throw new Error("Line must be a single line.");
  }
  // eslint-disable-next-line no-control-regex
  if (/[\u0000-\u001F\u007F]/.test(line)) {
    throw new Error("Line must not contain control characters.");
  }
  if (!/[A-Za-z]/.test(line)) {
    throw new Error("Line must contain letters.");
  }
}

function main(): void {
  validateLine(LINE);
  mkdirSync(dirname(outPath), { recursive: true });
  writeFileSync(outPath, LINE, "utf8");
  chmodSync(outPath, 0o644);
}

main();
