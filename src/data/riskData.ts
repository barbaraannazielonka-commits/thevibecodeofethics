export interface RiskTier {
  level: 'Lower' | 'Moderate' | 'Higher' | 'Very High';
  color: string;
  badgeBg: string;
  badgeBorder: string;
  badgeText: string;
  examples: string[];
  recommendedApproach: string;
  governanceRequirements: string[];
}

export const RISK_TIERS: Record<string, RiskTier> = {
  Lower: {
    level: 'Lower',
    color: 'emerald',
    badgeBg: 'bg-emerald-50 text-emerald-800 border-emerald-200 dark:bg-emerald-950/40 dark:text-emerald-300 dark:border-emerald-800',
    badgeBorder: 'border-emerald-300',
    badgeText: 'text-emerald-700 dark:text-emerald-300',
    examples: [
      'Static flashcard or vocabulary games',
      'Informational course or unit guide websites',
      'Simple interactive quizzes without any data storage or login accounts',
      'Client-side math or physics simulations without user tracking'
    ],
    recommendedApproach:
      'Review educational content, verify accessibility (contrast, keyboard navigation), inspect external script connections, and confirm basic alignment with school policies.',
    governanceRequirements: [
      'Teacher pedagogical and accessibility review',
      'Check against school acceptable-use guidance',
      'No formal DPIA typically required'
    ]
  },
  Moderate: {
    level: 'Moderate',
    color: 'amber',
    badgeBg: 'bg-amber-50 text-amber-800 border-amber-200 dark:bg-amber-950/40 dark:text-amber-300 dark:border-amber-800',
    badgeBorder: 'border-amber-300',
    badgeText: 'text-amber-700 dark:text-amber-300',
    examples: [
      'Student-submitted answers saved across browser sessions',
      'Formative feedback dashboards displaying past student attempts',
      'User accounts, logins, or student profile persistence',
      'Collaborative classroom pinboards or peer voting boards'
    ],
    recommendedApproach:
      'Conduct a more detailed privacy and security assessment; identify data storage location, verify encryption in transit/rest, and seek formal school approval.',
    governanceRequirements: [
      'School leadership or department head sign-off',
      'Data retention and deletion protocol defined',
      'Check if a Data Processing Agreement (DPA) is required for hosting provider'
    ]
  },
  Higher: {
    level: 'Higher',
    color: 'orange',
    badgeBg: 'bg-orange-50 text-orange-800 border-orange-200 dark:bg-orange-950/40 dark:text-orange-300 dark:border-orange-800',
    badgeBorder: 'border-orange-300',
    badgeText: 'text-orange-700 dark:text-orange-300',
    examples: [
      'AI chatbots or conversational agents processing free-text student input',
      'Databases containing linked student records, classes, or IDs',
      'Behavioral tracking, time-on-task telemetry, or automated attention metrics',
      'Automated formative performance analysis using external LLM APIs'
    ],
    recommendedApproach:
      'Formal review by school owner / district authorities, consultation with Data Protection Officer (DPO), and assessment of DPIA requirements. Inspect prompt boundaries and data residency.',
    governanceRequirements: [
      'Consultation with Data Protection Officer (personvernombud in Norway)',
      'Assessment of Data Protection Impact Assessment (DPIA) necessity',
      'Strict API vendor terms preventing model training on student prompts',
      'Prompt injection testing & safety guardrails'
    ]
  },
  'Very High': {
    level: 'Very High',
    color: 'rose',
    badgeBg: 'bg-rose-50 text-rose-800 border-rose-200 dark:bg-rose-950/40 dark:text-rose-300 dark:border-rose-800',
    badgeBorder: 'border-rose-300',
    badgeText: 'text-rose-700 dark:text-rose-300',
    examples: [
      'AI making consequential, autonomous decisions on official grades or course completion',
      'Automated profiling determining academic tracking, stream placement, or university admissions',
      'Automated behavioral risk scoring, discipline flagging, or psychological profiling',
      'Tools categorizing students into permanent ability tiers without human oversight'
    ],
    recommendedApproach:
      'DO NOT deploy independently! In educational contexts, autonomous consequential grading systems are strictly restricted under EU AI Act and national legislation, requiring specialist legal, pedagogical, and technical certification.',
    governanceRequirements: [
      'Do NOT deploy as an individual teacher project',
      'EU AI Act High-Risk AI System compliance requirements',
      'Human-in-the-loop teacher review is legally mandatory',
      'Full institutional audit, DPIA, and independent safety validation'
    ]
  }
};

export interface RiskFactor {
  id: string;
  label: string;
  category: 'data' | 'ai' | 'consequence' | 'storage';
  riskContribution: 'Lower' | 'Moderate' | 'Higher' | 'Very High';
  explanation: string;
}

export const RISK_FACTORS: RiskFactor[] = [
  {
    id: 'f_static',
    label: 'Tool only displays static learning content or client-side interactive widgets without saving input',
    category: 'storage',
    riskContribution: 'Lower',
    explanation: 'No personal data processed; lowest risk profile.'
  },
  {
    id: 'f_local_only',
    label: 'All user answers and progress remain 100% inside student browser (localStorage / sessionStorage)',
    category: 'storage',
    riskContribution: 'Lower',
    explanation: 'No data transmitted to external servers.'
  },
  {
    id: 'f_accounts',
    label: 'Requires user accounts, logins, or saves individual student profiles in a database',
    category: 'storage',
    riskContribution: 'Moderate',
    explanation: 'Introduces account security, password handling, and database authorization requirements.'
  },
  {
    id: 'f_cloud_db',
    label: 'Stores student answers or scores in a remote cloud database (e.g. Firebase, Supabase, SQL)',
    category: 'data',
    riskContribution: 'Moderate',
    explanation: 'Requires server-side security rules, DPA with cloud provider, and data retention procedures.'
  },
  {
    id: 'f_ai_chat',
    label: 'Integrates an AI chatbot, voice assistant, or conversational tutor processing free-text student input',
    category: 'ai',
    riskContribution: 'Higher',
    explanation: 'Risk of prompt injection, hallucinated guidance, inappropriate outputs, and third-party data processing.'
  },
  {
    id: 'f_telemetry',
    label: 'Tracks student behavioral metrics (click rates, time-on-task, mouse movements, or webcam engagement)',
    category: 'data',
    riskContribution: 'Higher',
    explanation: 'Behavioral profiling triggers elevated privacy scrutiny and DPIA warning signs.'
  },
  {
    id: 'f_unapproved_ai',
    label: 'Sends student-generated essays or work to a public/unvetted commercial AI model provider',
    category: 'ai',
    riskContribution: 'Higher',
    explanation: 'Severe risk of student IP or PII being stored or used for foundation model training.'
  },
  {
    id: 'f_auto_grade',
    label: 'AI independently computes official final grades or test scores without teacher verification',
    category: 'consequence',
    riskContribution: 'Very High',
    explanation: 'Consequential academic decisions made autonomously by AI are restricted and legally sensitive.'
  },
  {
    id: 'f_profiling',
    label: 'AI creates psychological profiles, predicts student potential, or determines academic track access',
    category: 'consequence',
    riskContribution: 'Very High',
    explanation: 'High-risk under EU AI Act and GDPR Article 22 (automated decision-making).'
  }
];
