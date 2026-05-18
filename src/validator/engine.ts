import { readFileSync } from 'fs';
import { join, relative } from 'path';
import { glob } from 'glob';
import * as yaml from 'js-yaml';
import { ValidationResult, createResult } from './result.js';
import { SpecKind } from '../schemas/types.js';
import { validateFlow } from './rules/flow.js';
import { validateInterface } from './rules/interface.js';
import { validateArtifact } from './rules/artifact.js';
import { validatePolicy } from './rules/policy.js';
import { validateBehavior } from './rules/behavior.js';
import { validateWorkspace } from './rules/workspace.js';

export async function validateDirectory(dir: string): Promise<ValidationResult[]> {
  const pattern = join(dir, '**/*.yaml');
  const files = await glob(pattern, { nodir: true });

  const results: ValidationResult[] = [];

  for (const file of files) {
    results.push(validateFile(file));
  }

  return results.sort((a, b) => a.file.localeCompare(b.file));
}

export function validateFile(filePath: string): ValidationResult {
  try {
    const content = readFileSync(filePath, 'utf-8');
    const spec = yaml.load(content);

    const issues = validateSpec(spec);
    return createResult(filePath, issues);
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    return createResult(filePath, [
      {
        severity: 'error',
        message: `Failed to parse YAML: ${message}`,
      },
    ]);
  }
}

export function validateSpec(spec: unknown) {
  if (!spec || typeof spec !== 'object') {
    return [{ severity: 'error' as const, message: 'Spec must be a YAML object' }];
  }

  const obj = spec as Record<string, unknown>;
  const kind = obj.kind as SpecKind | undefined;

  switch (kind) {
    case 'flow':
      return validateFlow(spec);
    case 'interface':
      return validateInterface(spec);
    case 'artifact':
      return validateArtifact(spec);
    case 'policy':
      return validatePolicy(spec);
    case 'behavior':
      return validateBehavior(spec);
    case 'workspace':
      return validateWorkspace(spec);
    default:
      return [
        {
          severity: 'error' as const,
          message: `Unknown spec kind: "${kind}". Must be one of: flow, interface, artifact, policy, behavior, workspace`,
        },
      ];
  }
}

export function formatValidationResults(results: ValidationResult[]): string {
  const lines: string[] = [];

  lines.push('Architecto v0.1 — Validation\n');

  let errorCount = 0;
  let warningCount = 0;
  let validCount = 0;

  for (const result of results) {
    if (result.valid) {
      lines.push(`  ✓  ${result.file}`);
      validCount++;
    } else {
      lines.push(`  ✗  ${result.file}`);

      for (const issue of result.issues) {
        const icon = issue.severity === 'error' ? '[ERROR]' : '[WARN]';
        lines.push(`     ${icon} ${issue.message}`);

        if (issue.severity === 'error') {
          errorCount++;
        } else {
          warningCount++;
        }
      }
    }
  }

  // Add warnings for valid files
  for (const result of results) {
    if (result.valid && result.issues.length > 0) {
      lines[lines.indexOf(`  ✓  ${result.file}`)] = `  ⚠  ${result.file}`;
      for (const issue of result.issues) {
        if (issue.severity === 'warn') {
          lines.push(`     [WARN] ${issue.message}`);
          warningCount++;
        }
      }
    }
  }

  lines.push('');
  lines.push(
    `Summary: ${validCount} valid, ${errorCount} ${errorCount === 1 ? 'error' : 'errors'}, ${warningCount} ${warningCount === 1 ? 'warning' : 'warnings'}`
  );

  return lines.join('\n');
}
