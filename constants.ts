
import { Alert, AlertType, RiskLevel, StatData, ScamPattern } from './types';

export const MOCK_ALERTS: Alert[] = [
  {
    id: '1',
    type: AlertType.CALL,
    riskLevel: RiskLevel.HIGH,
    source: '+33 6 12 34 56 78',
    description: 'Fake Bank Advisor',
    timestamp: '10 min ago',
    details: 'This number has been reported 145 times. The caller pretends to be from BNP Paribas asking for 2FA codes.',
    advice: 'Hang up immediately. Do not share any codes.'
  },
  {
    id: '2',
    type: AlertType.SMS,
    riskLevel: RiskLevel.MEDIUM,
    source: 'CPF-INFO',
    description: 'Phishing Link Detected',
    timestamp: '2 hours ago',
    details: 'Contains a suspicious link (bit.ly/claim-cpf) known for credential harvesting.',
    advice: 'Delete the message. Do not click the link.'
  },
  {
    id: '3',
    type: AlertType.SMS,
    riskLevel: RiskLevel.SAFE,
    source: 'Orange',
    description: 'Bill Notification',
    timestamp: 'Yesterday',
    details: 'Official communication verified by Orange Gardien.',
    advice: 'No action needed.'
  },
  {
    id: '4',
    type: AlertType.CALL,
    riskLevel: RiskLevel.HIGH,
    source: '+33 1 99 88 77 66',
    description: 'Tech Support Scam',
    timestamp: '2 days ago',
    details: 'Caller claims your computer is infected.',
    advice: 'Hang up.'
  }
];

export const WEEKLY_STATS: StatData[] = [
  { name: 'Mon', value: 2 },
  { name: 'Tue', value: 5 },
  { name: 'Wed', value: 3 },
  { name: 'Thu', value: 8 },
  { name: 'Fri', value: 4 },
  { name: 'Sat', value: 1 },
  { name: 'Sun', value: 2 },
];

export const THREAT_TYPES: StatData[] = [
  { name: 'Phishing', value: 45 },
  { name: 'Vishing', value: 30 },
  { name: 'Spam', value: 25 },
];

// F5: Risk Trend Data for Family View
export const RISK_TREND_DATA: StatData[] = [
  { name: 'Week 1', value: 20 },
  { name: 'Week 2', value: 35 },
  { name: 'Week 3', value: 15 }, // Intervention worked
  { name: 'Week 4', value: 10 },
];

// New Scam Database Data
export const SCAM_PATTERNS: ScamPattern[] = [
    {
        id: '1',
        title: 'Colissimo Delivery Fee',
        category: 'SMS',
        riskScore: 98,
        description: 'Fraudsters send SMS claiming a package delivery failed due to unpaid fees. The link leads to a fake payment page to steal credit card info.',
        source: 'Signal-Arnaques Forum',
        prevention: 'Check the tracking number on the official La Poste site manually. Never pay fees via SMS link.'
    },
    {
        id: '2',
        title: 'CPF Account Expiry',
        category: 'SMS',
        riskScore: 95,
        description: 'Urgent messages claiming your Training Rights (CPF) are about to expire. Links redirect to fake government sites.',
        source: 'Official Govt Alert',
        prevention: 'CPF rights never expire. Only log in via moncompteformation.gouv.fr.'
    },
    {
        id: '3',
        title: 'Fake Bank Advisor (Vishing)',
        category: 'CALL',
        riskScore: 99,
        description: 'Caller spoofs official bank number, claims suspicious transaction, and asks for 2FA validation code to "cancel" it.',
        source: 'Community Reports',
        prevention: 'Banks NEVER ask for validation codes or passwords over the phone.'
    },
    {
        id: '4',
        title: 'Crit\'Air Sticker Renewal',
        category: 'WEB',
        riskScore: 85,
        description: 'Fake websites selling environmental stickers at inflated prices or stealing data.',
        source: 'Auto-Moto News',
        prevention: 'Only use the official certificat-air.gouv.fr website.'
    }
];
