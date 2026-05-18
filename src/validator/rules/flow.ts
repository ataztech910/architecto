import { ValidationIssue, createIssue } from '../result.js';
import { FlowSpec } from '../../schemas/types.js';
import { validateCommonFields, validateRequiredArray } from './common.js';

export function validateFlow(spec: unknown): ValidationIssue[] {
  const issues: ValidationIssue[] = [];

  // Validate common fields
  issues.push(...validateCommonFields(spec));

  if (!spec || typeof spec !== 'object') {
    return issues;
  }

  const flow = spec as Record<string, unknown>;

  // Validate steps array
  issues.push(
    ...validateRequiredArray(flow, 'steps', (step, idx) => {
      if (!step || typeof step !== 'object' || Array.isArray(step)) {
        return 'must be an object';
      }
      const s = step as Record<string, unknown>;
      if (!s.id || typeof s.id !== 'string') {
        return `step ${idx}: field "id" is required and must be a string`;
      }
      if (!s.action || typeof s.action !== 'string') {
        return `step ${idx} (${s.id}): field "action" is required and must be a string`;
      }
      return null;
    })
  );

  // Perform flow-specific validation (dependencies, critical rules, etc)
  issues.push(...validateFlowDependencies(flow));

  return issues;
}

function validateFlowDependencies(flow: Record<string, unknown>): ValidationIssue[] {
  const issues: ValidationIssue[] = [];

  const steps = flow.steps;
  if (!Array.isArray(steps)) {
    return issues; // Already reported in validateRequiredArray
  }

  const flowInputs = new Set<string>();
  if (Array.isArray(flow.inputs)) {
    (flow.inputs as string[]).forEach((i) => flowInputs.add(String(i)));
  }

  const flowOutputs = new Set<string>();
  if (Array.isArray(flow.outputs)) {
    (flow.outputs as string[]).forEach((o) => flowOutputs.add(String(o)));
  }

  // Build availability map: track which tokens are available at each step
  let availableTokens = new Set(flowInputs);
  const providedTokens = new Map<string, string>(); // token -> stepId that provides it
  const usedTokens = new Set<string>();
  const disabledSteps = new Set<string>();

  // First pass: check step requirements and build maps
  for (const step of steps) {
    if (!step || typeof step !== 'object' || Array.isArray(step)) continue;

    const s = step as Record<string, unknown>;
    const stepId = String(s.id || '');
    const enabled = s.enabled !== false; // default true

    if (!enabled) {
      disabledSteps.add(stepId);
    }

    // Check requires
    if (Array.isArray(s.requires)) {
      for (const req of s.requires) {
        const reqStr = String(req);
        usedTokens.add(reqStr);

        if (enabled && !availableTokens.has(reqStr)) {
          issues.push(
            createIssue(
              'error',
              `step '${stepId}': requires '${reqStr}' which is not available (only available: ${Array.from(availableTokens).join(', ')})`
            )
          );
        }
      }
    }

    // Check provides
    if (Array.isArray(s.provides)) {
      for (const prov of s.provides) {
        const provStr = String(prov);
        providedTokens.set(provStr, stepId);
        if (enabled) {
          availableTokens.add(provStr);
        }
      }
    }

    // Check critical + onError rules
    if (s.critical === true) {
      const onError = s.onError;
      if (onError === 'warn' || onError === 'skip') {
        issues.push(
          createIssue(
            'error',
            `step '${stepId}': critical steps must not use onError: ${onError} (must be "fail")`
          )
        );
      }
    }
  }

  // Second pass: check for unused provides
  for (const [token, stepId] of providedTokens.entries()) {
    const isUsed = usedTokens.has(token) || flowOutputs.has(token);
    if (!isUsed) {
      issues.push(
        createIssue('warn', `step '${stepId}': provides '${token}' which is never used and not in outputs`)
      );
    }
  }

  // Third pass: check disabled steps don't break downstream
  for (const disabledStepId of disabledSteps) {
    const disabledStep = steps.find((s) => {
      if (!s || typeof s !== 'object' || Array.isArray(s)) return false;
      return (s as Record<string, unknown>).id === disabledStepId;
    }) as Record<string, unknown> | undefined;

    if (!disabledStep) continue;

    const disabledProvides = Array.isArray(disabledStep.provides)
      ? (disabledStep.provides as string[])
      : [];

    // Find if any enabled step requires what this disabled step provides
    for (const step of steps) {
      if (!step || typeof step !== 'object' || Array.isArray(step)) continue;

      const s = step as Record<string, unknown>;
      if (s.id === disabledStepId || s.enabled === false) continue; // skip disabled steps

      const requires = Array.isArray(s.requires) ? (s.requires as string[]) : [];
      for (const req of requires) {
        if (disabledProvides.includes(req)) {
          issues.push(
            createIssue(
              'error',
              `disabled step '${disabledStepId}': provides '${req}' which is required by enabled step '${s.id}'`
            )
          );
        }
      }
    }
  }

  return issues;
}
