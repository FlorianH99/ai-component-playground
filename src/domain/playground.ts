export type SessionStatus = 'draft' | 'generating' | 'ready' | 'failed' | 'archived';

export type ArtifactKind =
  | 'component'
  | 'example'
  | 'story'
  | 'test'
  | 'docs'
  | 'notes'
  | 'analysis';

export type ValidationType =
  | 'schema'
  | 'typescript'
  | 'eslint'
  | 'a11y'
  | 'design-system-rules'
  | 'runtime-preview';

export type ValidationStatus = 'pending' | 'passed' | 'warning' | 'failed';

export type FrameworkTarget = 'react';

export type StylingStrategy =
  | 'css-modules'
  | 'tailwind'
  | 'vanilla-extract'
  | 'styled-components'
  | 'emotion'
  | 'unstyled';

export interface PlaygroundSession {
  id: string;
  title: string;
  status: SessionStatus;
  createdAt: string;
  updatedAt: string;
}

export interface ComponentVariant {
  name: string;
  description?: string;
  values: string[];
}

export interface ComponentState {
  name: string;
  description?: string;
}

export interface ComponentSlot {
  name: string;
  required: boolean;
  description?: string;
}

export interface AccessibilityRequirement {
  rule: string;
  priority: 'required' | 'recommended';
  notes?: string;
}

export interface ComponentConstraint {
  rule: string;
  reason?: string;
}

export interface PropDefinition {
  name: string;
  type: string;
  required: boolean;
  description?: string;
  defaultValue?: string;
}

export interface ComponentSpec {
  id: string;
  sessionId: string;
  name: string;
  description: string;
  framework: FrameworkTarget;
  stylingStrategy: StylingStrategy;
  props: PropDefinition[];
  variants: ComponentVariant[];
  states: ComponentState[];
  slots: ComponentSlot[];
  accessibilityRequirements: AccessibilityRequirement[];
  constraints: ComponentConstraint[];
  outputTargets: ArtifactKind[];
  lockedFields: string[];
}

export interface Artifact {
  id: string;
  sessionId: string;
  versionId?: string;
  kind: ArtifactKind;
  path: string;
  language: string;
  content: string;
  source: 'generated' | 'edited' | 'system';
}

export interface ValidationResult {
  id: string;
  artifactId: string;
  type: ValidationType;
  status: ValidationStatus;
  summary: string;
  details?: string;
  createdAt: string;
}

export interface SessionVersion {
  id: string;
  sessionId: string;
  label: string;
  promptSnapshot: string;
  createdAt: string;
}

export interface GenerationRequest {
  sessionId: string;
  prompt: string;
  spec: ComponentSpec;
}

export interface GenerationResponse {
  sessionId: string;
  artifacts: Artifact[];
  validationResults: ValidationResult[];
}
