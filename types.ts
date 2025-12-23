export enum ReleaseStep {
  DEFINE_GOAL = 'DEFINE_GOAL',
  IDENTIFY_FEELING = 'IDENTIFY_FEELING',
  IDENTIFY_WANT = 'IDENTIFY_WANT',
  ALLOW_FEELING = 'ALLOW_FEELING',
  RELEASE_COULD = 'RELEASE_COULD',
  RELEASE_WOULD = 'RELEASE_WOULD',
  RELEASE_WHEN = 'RELEASE_WHEN',
  CHECK_STATUS = 'CHECK_STATUS',
  COMPLETION = 'COMPLETION'
}

export enum CoreWant {
  APPROVAL = 'APPROVAL',
  CONTROL = 'CONTROL',
  SECURITY = 'SECURITY',
  SEPARATION = 'SEPARATION',
  UNKNOWN = 'UNKNOWN'
}

export interface SessionState {
  goal: string;
  currentFeeling: string;
  intensity: number; // 0-10
  coreWant: CoreWant;
  history: Array<{
    step: string;
    timestamp: number;
  }>;
}

export type Language = 'zh' | 'en' | 'fr';
