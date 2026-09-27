export type RiskLevel = 'critical' | 'high' | 'medium' | 'low' | 'minimal';

export interface RiskSignalItem {
  id: string;
  name: string;
  category: 'Velocity' | 'Obfuscation' | 'Proximity' | 'Sanctions' | 'Behavioral';
  level: 'High' | 'Medium' | 'Low' | 'Negligible';
  score: number;
  metricValue: string;
  benchmark: string;
  description: string;
  forensicObservation: string;
  investigatorGuidance: string;
}

export interface RiskProfile {
  overallScore: number;
  overallLevel: RiskLevel;
  methodologyVersion: string;
  evaluatedAt: string;
  signals: RiskSignalItem[];
  analyticalSummary: string;
  fatfTravelRuleFlags: string[];
  recommendedLawEnforcementSteps: string[];
}
