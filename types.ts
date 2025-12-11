
export enum Screen {
  ONBOARDING = 'ONBOARDING',
  HOME = 'HOME',
  STATS = 'STATS',
  SETTINGS = 'SETTINGS',
  SIMULATION = 'SIMULATION', // hearU Demo Mode
  ALERT_DETAIL = 'ALERT_DETAIL',
  ACCESSIBILITY = 'ACCESSIBILITY', // New Senior Mode
  SCAM_DB = 'SCAM_DB', // New Knowledge Base
  SENIOR_CONTACTS = 'SENIOR_CONTACTS',
  SENIOR_CALLING = 'SENIOR_CALLING',
  SENIOR_ALERTS = 'SENIOR_ALERTS'
}

export enum UserRole {
  GUARDIAN = 'GUARDIAN',
  SENIOR = 'SENIOR',
  ACTIVE_SENIOR = 'ACTIVE_SENIOR'
}

export enum AlertType {
  CALL = 'CALL',
  SMS = 'SMS',
  WEB = 'WEB'
}

export enum RiskLevel {
  LOW = 'LOW',
  MEDIUM = 'MEDIUM',
  HIGH = 'HIGH',
  SAFE = 'SAFE'
}

export interface Alert {
  id: string;
  type: AlertType;
  riskLevel: RiskLevel;
  source: string; // Phone number or URL
  description: string;
  timestamp: string;
  details?: string;
  advice?: string;
}

export interface StatData {
  name: string;
  value: number;
  [key: string]: any;
}

export interface UserSettings {
  autoBlock: boolean;
  callProtection: boolean;
  smsProtection: boolean;
  notifications: boolean;
  familyAlerts: boolean;
  dataSharing: boolean;
}

export interface ScamPattern {
    id: string;
    title: string;
    category: 'SMS' | 'CALL' | 'WEB';
    riskScore: number; // 0-100
    description: string;
    source: string; // e.g., "Community Report", "Official Police Alert"
    prevention: string;
}
