import { ValidationIssue } from '../result.js';
import { validateCommonFields, validateRequiredArray } from './common.js';

export function validatePolicy(spec: unknown): ValidationIssue[] {
  const issues: ValidationIssue[] = [];

  issues.push(...validateCommonFields(spec));

  if (!spec || typeof spec !== 'object') {
    return issues;
  }

  const policy = spec as Record<string, unknown>;

  // Validate rules
  issues.push(
    ...validateRequiredArray(policy, 'rules', (rule, idx) => {
      if (!rule || typeof rule !== 'object' || Array.isArray(rule)) {
        return 'must be an object';
      }
      const r = rule as Record<string, unknown>;
      if (!r.id || typeof r.id !== 'string') {
        return `rule ${idx}: field "id" is required and must be a string`;
      }
      return null;
    })
  );

  return issues;
}
