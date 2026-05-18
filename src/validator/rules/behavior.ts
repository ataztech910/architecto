import { ValidationIssue, createIssue } from '../result.js';
import { validateCommonFields, validateRequiredArray } from './common.js';

export function validateBehavior(spec: unknown): ValidationIssue[] {
  const issues: ValidationIssue[] = [];

  issues.push(...validateCommonFields(spec));

  if (!spec || typeof spec !== 'object') {
    return issues;
  }

  const behavior = spec as Record<string, unknown>;

  // Validate scenarios
  issues.push(
    ...validateRequiredArray(behavior, 'scenarios', (scenario, idx) => {
      if (!scenario || typeof scenario !== 'object' || Array.isArray(scenario)) {
        return 'must be an object';
      }
      const s = scenario as Record<string, unknown>;

      if (!s.id || typeof s.id !== 'string') {
        return `scenario ${idx}: field "id" is required and must be a string`;
      }

      if (!s.given || typeof s.given !== 'string') {
        return `scenario ${idx} (${s.id}): field "given" is required and must be a string`;
      }

      if (!s.when || typeof s.when !== 'string') {
        return `scenario ${idx} (${s.id}): field "when" is required and must be a string`;
      }

      if (!s.then || typeof s.then !== 'string') {
        return `scenario ${idx} (${s.id}): field "then" is required and must be a string`;
      }

      return null;
    })
  );

  return issues;
}
