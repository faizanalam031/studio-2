export type Call = {
  id: string;
  caller: string;
  type: 'Scam' | 'Safe' | 'AI-Handled';
  timestamp: string;
  duration?: string;
  transcript?: { speaker: 'AI' | 'Scammer' | 'User'; text: string }[];
  scamData?: {
    upiIds: string[];
    bankAccounts: string[];
    suspiciousLinks: string[];
    riskFactors: string[];
  };
  audioUrl?: string;
  explanation?: string;
  confidence?: number;
  timeSaved?: string;
  patternsLearned?: number;
};

export const callHistory: Call[] = [
  {
    id: '1',
    caller: '+91-9876543210',
    type: 'AI-Handled',
    timestamp: '2024-07-29T10:30:00Z',
    duration: '2m 45s',
    audioUrl: '/audio/placeholder.mp3',
    transcript: [
        { speaker: 'Scammer', text: 'Hello sir, I am calling from the bank rewards department. You have won a new car.' },
        { speaker: 'AI', text: 'That sounds exciting. A new car? Which bank are you calling from?' },
        { speaker: 'Scammer', text: 'Sir, it is from the National Bank. To claim your prize we need to verify your details. Please pay a small processing fee of 5000 rupees to this UPI ID: winner-rewards@okbank.' },
        { speaker: 'AI', text: 'I see. 5000 rupees. Could you please send me the details of this prize in an official email? I would like to review the terms and conditions.' },
        { speaker: 'Scammer', text: 'Sir, this is a limited time offer, you must pay now or the prize will go to someone else! Just send the money, it is a simple process.' },
        { speaker: 'AI', text: 'I understand the urgency, but for security reasons, I must insist on written confirmation. It\'s a standard procedure for such high-value prizes, isn\'t it?' }
    ],
    scamData: {
        upiIds: ['winner-rewards@okbank'],
        bankAccounts: [],
        suspiciousLinks: [],
        riskFactors: ['Urgency Tactic', 'Request for Advance Fee', 'Unsolicited Prize']
    },
    explanation: 'Detected urgency language and a request for an advance fee, which are common scam tactics.',
    confidence: 95,
  },
  {
    id: '2',
    caller: 'Unknown',
    type: 'Scam',
    timestamp: '2024-07-29T09:15:00Z',
    duration: '0m 12s',
    explanation: 'The number is not in contacts and matched a known spam prefix.',
    confidence: 80,
  },
  {
    id: '3',
    caller: 'Mom',
    type: 'Safe',
    timestamp: '2024-07-28T20:05:00Z',
    duration: '5m 32s',
    confidence: 10,
  },
    {
    id: '4',
    caller: '+91-8765432109',
    type: 'AI-Handled',
    timestamp: '2024-07-28T15:00:00Z',
    duration: '3m 10s',
    explanation: 'Voice pattern matched a previously identified scammer.',
    confidence: 98,
  },
  {
    id: '5',
    caller: 'Electricity Board',
    type: 'Safe',
    timestamp: '2024-07-28T11:45:00Z',
    duration: '1m 15s',
    confidence: 5,
  },
];
