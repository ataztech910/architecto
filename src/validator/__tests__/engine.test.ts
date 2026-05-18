import { describe, it, expect } from 'vitest';
import { validateFile, validateSpec } from '../engine.js';

describe('Validator engine', () => {
  it('should validate flow spec', () => {
    const spec = {
      kind: 'flow',
      name: 'test-flow',
      steps: [
        {
          id: 'step1',
          action: 'process',
          provides: ['result'],
        },
      ],
      outputs: ['result'],
    };

    const issues = validateSpec(spec);
    const errors = issues.filter((i) => i.severity === 'error');
    expect(errors).toHaveLength(0);
  });

  it('should validate interface spec', () => {
    const spec = {
      kind: 'interface',
      name: 'homepage',
      route: '/',
      states: [
        { id: 'loading' },
        { id: 'loaded' },
      ],
      actions: [
        { id: 'filter' },
      ],
      components: [
        { id: 'table', type: 'table' },
      ],
    };

    const issues = validateSpec(spec);
    const errors = issues.filter((i) => i.severity === 'error');
    expect(errors).toHaveLength(0);
  });

  it('should validate artifact spec', () => {
    const spec = {
      kind: 'artifact',
      name: 'user',
      fields: [
        { name: 'id', type: 'uuid', required: true },
        { name: 'email', type: 'string', required: true },
      ],
    };

    const issues = validateSpec(spec);
    const errors = issues.filter((i) => i.severity === 'error');
    expect(errors).toHaveLength(0);
  });

  it('should validate policy spec', () => {
    const spec = {
      kind: 'policy',
      name: 'cache',
      rules: [
        { id: 'rule1', action: 'cache-response' },
      ],
    };

    const issues = validateSpec(spec);
    const errors = issues.filter((i) => i.severity === 'error');
    expect(errors).toHaveLength(0);
  });

  it('should validate behavior spec', () => {
    const spec = {
      kind: 'behavior',
      name: 'homepage',
      scenarios: [
        {
          id: 'loads',
          given: 'data exists',
          when: 'user visits',
          then: 'page shows data',
        },
      ],
    };

    const issues = validateSpec(spec);
    const errors = issues.filter((i) => i.severity === 'error');
    expect(errors).toHaveLength(0);
  });

  it('should validate workspace spec', () => {
    const spec = {
      kind: 'workspace',
      name: 'my-app',
      structure: [
        { path: 'src/app.tsx', generated_from: 'app.interface.yaml' },
      ],
    };

    const issues = validateSpec(spec);
    const errors = issues.filter((i) => i.severity === 'error');
    expect(errors).toHaveLength(0);
  });

  it('should error on unknown kind', () => {
    const spec = {
      kind: 'unknown',
      name: 'test',
    };

    const issues = validateSpec(spec);
    const errors = issues.filter((i) => i.severity === 'error');
    expect(errors.length).toBeGreaterThan(0);
    expect(errors.some((e) => e.message.includes('Unknown spec kind'))).toBe(true);
  });

  it('should error on invalid YAML object', () => {
    const spec = null;
    const issues = validateSpec(spec);
    expect(issues.length).toBeGreaterThan(0);
  });

  it('should require name field', () => {
    const spec = {
      kind: 'flow',
    };

    const issues = validateSpec(spec);
    const errors = issues.filter((i) => i.severity === 'error');
    expect(errors.some((e) => e.message.includes('name'))).toBe(true);
  });

  it('should handle artifact with enum field', () => {
    const spec = {
      kind: 'artifact',
      name: 'market',
      fields: [
        {
          name: 'status',
          type: 'enum',
          values: ['open', 'closed'],
          required: true,
        },
      ],
    };

    const issues = validateSpec(spec);
    const errors = issues.filter((i) => i.severity === 'error');
    expect(errors).toHaveLength(0);
  });

  it('should handle flow with optional fields', () => {
    const spec = {
      kind: 'flow',
      name: 'minimal-flow',
      version: '0.1.0',
      steps: [
        {
          id: 'step1',
          action: 'do-something',
        },
      ],
    };

    const issues = validateSpec(spec);
    const errors = issues.filter((i) => i.severity === 'error');
    expect(errors).toHaveLength(0);
  });
});
