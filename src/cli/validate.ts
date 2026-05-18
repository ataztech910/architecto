import { existsSync } from 'fs';
import { resolve } from 'path';
import { validateDirectory, formatValidationResults } from '../validator/engine.js';

export async function runValidate(args: string[]) {
  let specsDir = './specs';
  let dirIndex = args.indexOf('--dir');
  if (dirIndex !== -1 && dirIndex + 1 < args.length) {
    specsDir = args[dirIndex + 1];
  }

  const specsDirPath = resolve(specsDir);

  if (!existsSync(specsDirPath)) {
    console.error(`Error: Directory not found: ${specsDirPath}`);
    process.exit(1);
  }

  const results = await validateDirectory(specsDirPath);

  const output = formatValidationResults(results);
  console.log(output);

  const hasErrors = results.some((r) => r.issues.some((i) => i.severity === 'error'));
  if (hasErrors) {
    process.exit(1);
  }
}
