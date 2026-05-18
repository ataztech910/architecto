export type Severity = 'error' | 'warn';

export interface ValidationIssue {
  severity: Severity;
  message: string;
}

export interface ValidationResult {
  file: string;
  issues: ValidationIssue[];
  valid: boolean;
}

export interface ValidationReport {
  results: ValidationResult[];
  summary: {
    total: number;
    valid: number;
    errors: number;
    warnings: number;
  };
}

export function createIssue(severity: Severity, message: string): ValidationIssue {
  return { severity, message };
}

export function createResult(file: string, issues: ValidationIssue[]): ValidationResult {
  return {
    file,
    issues,
    valid: issues.every((i) => i.severity !== 'error'),
  };
}
