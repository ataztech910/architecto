import { ValidationIssue } from '../result.js';
import { validateCommonFields, validateRequiredArray } from './common.js';

export function validateArtifact(spec: unknown): ValidationIssue[] {
  const issues: ValidationIssue[] = [];

  issues.push(...validateCommonFields(spec));

  if (!spec || typeof spec !== 'object') {
    return issues;
  }

  const artifact = spec as Record<string, unknown>;

  // Validate fields
  issues.push(
    ...validateRequiredArray(artifact, 'fields', (field, idx) => {
      if (!field || typeof field !== 'object' || Array.isArray(field)) {
        return 'must be an object';
      }
      const f = field as Record<string, unknown>;
      if (!f.name || typeof f.name !== 'string') {
        return `field ${idx}: field "name" is required and must be a string`;
      }
      if (!f.type || typeof f.type !== 'string') {
        return `field ${idx} (${f.name}): field "type" is required and must be a string`;
      }
      return null;
    })
  );

  return issues;
}
