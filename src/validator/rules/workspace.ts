import { ValidationIssue } from '../result.js';
import { validateCommonFields, validateRequiredArray } from './common.js';

export function validateWorkspace(spec: unknown): ValidationIssue[] {
  const issues: ValidationIssue[] = [];

  issues.push(...validateCommonFields(spec));

  if (!spec || typeof spec !== 'object') {
    return issues;
  }

  const workspace = spec as Record<string, unknown>;

  // Validate structure
  issues.push(
    ...validateRequiredArray(workspace, 'structure', (item, idx) => {
      if (!item || typeof item !== 'object' || Array.isArray(item)) {
        return 'must be an object';
      }
      const s = item as Record<string, unknown>;
      if (!s.path || typeof s.path !== 'string') {
        return `structure ${idx}: field "path" is required and must be a string`;
      }
      return null;
    })
  );

  return issues;
}
