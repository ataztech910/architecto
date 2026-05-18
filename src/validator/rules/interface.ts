import { ValidationIssue } from '../result.js';
import { validateCommonFields, validateRequiredArray } from './common.js';

export function validateInterface(spec: unknown): ValidationIssue[] {
  const issues: ValidationIssue[] = [];

  issues.push(...validateCommonFields(spec));

  if (!spec || typeof spec !== 'object') {
    return issues;
  }

  const iface = spec as Record<string, unknown>;

  // Validate states
  issues.push(
    ...validateRequiredArray(iface, 'states', (state, idx) => {
      if (!state || typeof state !== 'object' || Array.isArray(state)) {
        return 'must be an object';
      }
      const s = state as Record<string, unknown>;
      if (!s.id || typeof s.id !== 'string') {
        return `state ${idx}: field "id" is required and must be a string`;
      }
      return null;
    })
  );

  // Validate actions
  issues.push(
    ...validateRequiredArray(iface, 'actions', (action, idx) => {
      if (!action || typeof action !== 'object' || Array.isArray(action)) {
        return 'must be an object';
      }
      const a = action as Record<string, unknown>;
      if (!a.id || typeof a.id !== 'string') {
        return `action ${idx}: field "id" is required and must be a string`;
      }
      return null;
    })
  );

  // Validate components
  issues.push(
    ...validateRequiredArray(iface, 'components', (component, idx) => {
      if (!component || typeof component !== 'object' || Array.isArray(component)) {
        return 'must be an object';
      }
      const c = component as Record<string, unknown>;
      if (!c.id || typeof c.id !== 'string') {
        return `component ${idx}: field "id" is required and must be a string`;
      }
      return null;
    })
  );

  return issues;
}
