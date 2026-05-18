import { describe, it, expect } from 'vitest';
import { validateFlow } from '../rules/flow.js';

describe('Flow validation', () => {
  it('should validate a simple flow', () => {
    const spec = {
      kind: 'flow',
      name: 'test-flow',
      inputs: ['data'],
      steps: [
        {
          id: 'step1',
          action: 'process',
          requires: ['data'],
          provides: ['result'],
        },
      ],
      outputs: ['result'],
    };

    const issues = validateFlow(spec);
    expect(issues.filter((i) => i.severity === 'error')).toHaveLength(0);
  });

  it('should error on missing required fields', () => {
    const spec = {
      kind: 'flow',
      // missing name
      steps: [
        {
          id: 'step1',
          action: 'process',
        },
      ],
    };

    const issues = validateFlow(spec);
    const errors = issues.filter((i) => i.severity === 'error');
    expect(errors.length).toBeGreaterThan(0);
    expect(errors.some((e) => e.message.includes('name'))).toBe(true);
  });

  it('should error on missing step id', () => {
    const spec = {
      kind: 'flow',
      name: 'test',
      steps: [
        {
          action: 'process',
        },
      ],
    };

    const issues = validateFlow(spec);
    const errors = issues.filter((i) => i.severity === 'error');
    expect(errors.length).toBeGreaterThan(0);
  });

  it('should error on unmet requirement', () => {
    const spec = {
      kind: 'flow',
      name: 'test',
      steps: [
        {
          id: 'step1',
          action: 'process',
          requires: ['missing_token'],
          provides: ['result'],
        },
      ],
    };

    const issues = validateFlow(spec);
    const errors = issues.filter((i) => i.severity === 'error');
    expect(errors.some((e) => e.message.includes('missing_token'))).toBe(true);
  });

  it('should warn on unused provide', () => {
    const spec = {
      kind: 'flow',
      name: 'test',
      steps: [
        {
          id: 'step1',
          action: 'process',
          provides: ['unused_result'],
        },
      ],
    };

    const issues = validateFlow(spec);
    const warnings = issues.filter((i) => i.severity === 'warn');
    expect(warnings.some((w) => w.message.includes('unused_result'))).toBe(true);
  });

  it('should error on critical step with non-fail onError', () => {
    const spec = {
      kind: 'flow',
      name: 'test',
      steps: [
        {
          id: 'critical',
          action: 'save',
          critical: true,
          onError: 'warn', // INVALID
        },
      ],
    };

    const issues = validateFlow(spec);
    const errors = issues.filter((i) => i.severity === 'error');
    expect(errors.some((e) => e.message.includes('critical'))).toBe(true);
  });

  it('should error when disabled step provides required token', () => {
    const spec = {
      kind: 'flow',
      name: 'test',
      steps: [
        {
          id: 'disabled-step',
          action: 'fetch',
          provides: ['data'],
          enabled: false,
        },
        {
          id: 'use-data',
          action: 'process',
          requires: ['data'],
        },
      ],
    };

    const issues = validateFlow(spec);
    const errors = issues.filter((i) => i.severity === 'error');
    expect(errors.some((e) => e.message.includes('disabled'))).toBe(true);
  });

  it('should validate complex pipeline', () => {
    const spec = {
      kind: 'flow',
      name: 'complex-flow',
      inputs: ['api_url'],
      outputs: ['count'],
      steps: [
        {
          id: 'fetch',
          action: 'http.get',
          requires: ['api_url'],
          provides: ['raw_data'],
          critical: true,
          onError: 'fail',
        },
        {
          id: 'transform',
          action: 'transform',
          requires: ['raw_data'],
          provides: ['processed_data'],
          critical: true,
          onError: 'fail',
        },
        {
          id: 'save',
          action: 'db.upsert',
          requires: ['processed_data'],
          provides: ['count'],
          critical: true,
          onError: 'fail',
        },
      ],
    };

    const issues = validateFlow(spec);
    const errors = issues.filter((i) => i.severity === 'error');
    expect(errors).toHaveLength(0);
  });

  it('should handle outputs correctly', () => {
    const spec = {
      kind: 'flow',
      name: 'output-test',
      outputs: ['result'],
      steps: [
        {
          id: 'step1',
          action: 'process',
          provides: ['intermediate'],
        },
        {
          id: 'step2',
          action: 'finalize',
          requires: ['intermediate'],
          provides: ['result'],
        },
      ],
    };

    const issues = validateFlow(spec);
    const errors = issues.filter((i) => i.severity === 'error');
    expect(errors).toHaveLength(0);
  });
});
