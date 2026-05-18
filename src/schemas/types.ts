export type SpecKind = 'flow' | 'interface' | 'artifact' | 'policy' | 'behavior' | 'workspace';

export interface BaseSpec {
  kind: SpecKind;
  name: string;
  version?: string;
  description?: string;
}

// Flow Spec
export interface FlowStep {
  id: string;
  action: string;
  requires?: string[];
  provides?: string[];
  enabled?: boolean;
  critical?: boolean;
  onError?: 'fail' | 'warn' | 'skip';
}

export interface FlowSpec extends BaseSpec {
  kind: 'flow';
  inputs?: string[];
  outputs?: string[];
  steps?: FlowStep[];
}

// Interface Spec
export interface InterfaceState {
  id: string;
  description?: string;
}

export interface InterfaceAction {
  id: string;
  description?: string;
  triggers?: string;
}

export interface InterfaceComponent {
  id: string;
  type?: string;
  description?: string;
}

export interface InterfaceSpec extends BaseSpec {
  kind: 'interface';
  route?: string;
  states?: InterfaceState[];
  actions?: InterfaceAction[];
  components?: InterfaceComponent[];
}

// Artifact Spec
export interface ArtifactField {
  name: string;
  type: string;
  required?: boolean;
  description?: string;
  references?: string;
  values?: string[];
}

export interface ArtifactSpec extends BaseSpec {
  kind: 'artifact';
  fields?: ArtifactField[];
}

// Policy Spec
export interface PolicyRule {
  id: string;
  description?: string;
  applies_to?: string;
  condition?: string;
  action?: string;
}

export interface PolicySpec extends BaseSpec {
  kind: 'policy';
  rules?: PolicyRule[];
}

// Behavior Spec
export interface BehaviorScenario {
  id: string;
  given: string;
  when: string;
  then: string;
}

export interface BehaviorSpec extends BaseSpec {
  kind: 'behavior';
  scenarios?: BehaviorScenario[];
}

// Workspace Spec
export interface WorkspaceStructureItem {
  path: string;
  description?: string;
  generated_from?: string;
  generate_with?: string;
}

export interface WorkspaceSpec extends BaseSpec {
  kind: 'workspace';
  structure?: WorkspaceStructureItem[];
}

// Union type for all specs
export type Spec = FlowSpec | InterfaceSpec | ArtifactSpec | PolicySpec | BehaviorSpec | WorkspaceSpec;
