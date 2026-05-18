import { ValidationIssue, createIssue } from '../result.js';
import { Spec, SpecKind } from '../../schemas/types.js';

const VALID_KINDS: SpecKind[] = ['flow', 'interface', 'artifact', 'policy', 'behavior', 'workspace'];
const SEMVER_REGEX = /^\d+\.\d+\.\d+$/;

export function validateCommonFields(spec: unknown): ValidationIssue[] {
  const issues: ValidationIssue[] = [];

  if (!spec || typeof spec !== 'object') {
    issues.push(createIssue('error', 'Spec must be a valid YAML object'));
    return issues;
  }

  const obj = spec as Record<string, unknown>;

  // Check kind
  if (!obj.kind) {
    issues.push(createIssue('error', 'Field "kind" is required'));
  } else if (!VALID_KINDS.includes(obj.kind as SpecKind)) {
    issues.push(
      createIssue('error', `Field "kind" must be one of: ${VALID_KINDS.join(', ')}. Got: ${obj.kind}`)
    );
  }

  // Check name
  if (!obj.name) {
    issues.push(createIssue('error', 'Field "name" is required'));
  } else if (typeof obj.name !== 'string' || obj.name.trim() === '') {
    issues.push(createIssue('error', 'Field "name" must be a non-empty string'));
  }

  // Check version (optional, but if present must be valid)
  if (obj.version !== undefined) {
    if (typeof obj.version !== 'string' || !SEMVER_REGEX.test(obj.version)) {
      issues.push(
        createIssue('warn', `Field "version" should follow semver (x.y.z format). Got: ${obj.version}`)
      );
    }
  }

  // Check description (optional, but if present should be a string)
  if (obj.description !== undefined && typeof obj.description !== 'string') {
    issues.push(createIssue('warn', 'Field "description" should be a string'));
  }

  return issues;
}

export function validateRequiredArray(
  obj: Record<string, unknown>,
  fieldName: string,
  itemValidator?: (item: unknown, index: number) => string | null
): ValidationIssue[] {
  const issues: ValidationIssue[] = [];
  const value = obj[fieldName];

  if (value === undefined) {
    return issues; // optional
  }

  if (!Array.isArray(value)) {
    issues.push(createIssue('error', `Field "${fieldName}" must be an array`));
    return issues;
  }

  if (value.length === 0) {
    issues.push(createIssue('warn', `Field "${fieldName}" is empty`));
  }

  if (itemValidator) {
    value.forEach((item, idx) => {
      const error = itemValidator(item, idx);
      if (error) {
        issues.push(createIssue('error', `${fieldName}[${idx}]: ${error}`));
      }
    });
  }

  return issues;
}

export function validateRequiredObject(
  obj: Record<string, unknown>,
  fieldName: string,
  requiredKeys: string[]
): ValidationIssue[] {
  const issues: ValidationIssue[] = [];
  const value = obj[fieldName];

  if (value === undefined) {
    return issues; // optional
  }

  if (!value || typeof value !== 'object' || Array.isArray(value)) {
    issues.push(createIssue('error', `Field "${fieldName}" must be an object`));
    return issues;
  }

  const objValue = value as Record<string, unknown>;
  for (const key of requiredKeys) {
    if (!(key in objValue)) {
      issues.push(createIssue('error', `Field "${fieldName}.${key}" is required`));
    }
  }

  return issues;
}
