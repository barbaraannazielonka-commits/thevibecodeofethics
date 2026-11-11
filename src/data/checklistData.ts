import { ChecklistItem } from '../types/course';

export const CHECKLIST_CATEGORIES = [
  'A. Pedagogical readiness',
  'B. Privacy and data protection',
  'C. Security',
  'D. AI responsibility',
  'E. Accessibility and inclusion',
  'F. Assessment and student rights',
  'G. Deployment and maintenance'
] as const;

export const PRE_DEPLOYMENT_CHECKLIST: ChecklistItem[] = [
  // A. Pedagogical readiness
  {
    id: 'chk-a1',
    category: 'A. Pedagogical readiness',
    text: 'I have identified a genuine educational need.',
    guidance: 'The tool addresses a concrete classroom challenge, not just an urge to play with code.'
  },
  {
    id: 'chk-a2',
    category: 'A. Pedagogical readiness',
    text: 'The application supports clearly defined learning objectives.',
    guidance: 'Directly aligned with curriculum standards and student competency progression.'
  },
  {
    id: 'chk-a3',
    category: 'A. Pedagogical readiness',
    text: 'Its features have pedagogical justifications.',
    guidance: 'Every button, visual element, or animation serves learning rather than extraneous distraction.'
  },
  {
    id: 'chk-a4',
    category: 'A. Pedagogical readiness',
    text: 'It promotes active learning and student thinking.',
    guidance: 'Requires retrieval, explanation, or synthesis—not passive clicking or spoon-fed answers.'
  },
  {
    id: 'chk-a5',
    category: 'A. Pedagogical readiness',
    text: 'Feedback is educationally meaningful.',
    guidance: 'Explains why an answer is wrong and offers constructive pathways to improve.'
  },
  {
    id: 'chk-a6',
    category: 'A. Pedagogical readiness',
    text: 'I have considered alternative, non-digital approaches.',
    guidance: 'Verified that a discussion, paper cards, or lab demonstration wouldn’t achieve this better.'
  },
  {
    id: 'chk-a7',
    category: 'A. Pedagogical readiness',
    text: 'The application is appropriate for the intended age group.',
    guidance: 'Language, cognitive demands, and interaction models fit students’ developmental stage.'
  },

  // B. Privacy and data protection
  {
    id: 'chk-b1',
    category: 'B. Privacy and data protection',
    text: 'I know what information the application collects.',
    guidance: 'Full audit of inputs, device metadata, IPs, and telemetry.'
  },
  {
    id: 'chk-b2',
    category: 'B. Privacy and data protection',
    text: 'I have minimised data collection.',
    guidance: 'Zero names, emails, or student IDs gathered if the learning objective can be met without them.'
  },
  {
    id: 'chk-b3',
    category: 'B. Privacy and data protection',
    text: 'I understand where information is stored.',
    guidance: 'Identified whether answers stay purely in local browser memory or touch cloud servers.'
  },
  {
    id: 'chk-b4',
    category: 'B. Privacy and data protection',
    text: 'I have identified all external services.',
    guidance: 'Mapped hosting providers, API endpoints, analytics scripts, and cloud models.'
  },
  {
    id: 'chk-b5',
    category: 'B. Privacy and data protection',
    text: 'I have checked relevant privacy policies.',
    guidance: 'Confirmed providers do not retain or monetize student submissions.'
  },
  {
    id: 'chk-b6',
    category: 'B. Privacy and data protection',
    text: 'I have not entered real student information into unapproved development services.',
    guidance: 'All testing and prompting used synthetic, fictional data.'
  },
  {
    id: 'chk-b7',
    category: 'B. Privacy and data protection',
    text: 'I have consulted the appropriate school authorities.',
    guidance: 'Engaged school management, IT lead, and DPO before introducing to students.'
  },
  {
    id: 'chk-b8',
    category: 'B. Privacy and data protection',
    text: 'Required privacy assessments and agreements (DPA/DPIA) have been addressed.',
    guidance: 'Ensured high-risk processing has a formal Data Protection Impact Assessment.'
  },
  {
    id: 'chk-b9',
    category: 'B. Privacy and data protection',
    text: 'Retention and deletion arrangements are understood.',
    guidance: 'Clear process exists to permanently wipe student records when the unit concludes.'
  },

  // C. Security
  {
    id: 'chk-c1',
    category: 'C. Security',
    text: 'API keys and credentials are protected.',
    guidance: 'Never embedded in client-side React code or public repositories.'
  },
  {
    id: 'chk-c2',
    category: 'C. Security',
    text: 'No confidential information is exposed in public repositories.',
    guidance: '.env files excluded from Git and secrets kept in environment secret vaults.'
  },
  {
    id: 'chk-c3',
    category: 'C. Security',
    text: 'Database permissions and rules have been checked.',
    guidance: 'Students cannot query, tamper with, or delete records belonging to peers.'
  },
  {
    id: 'chk-c4',
    category: 'C. Security',
    text: 'Authentication and authorisation are implemented appropriately.',
    guidance: 'Enforced securely on the server-side, not via easily bypassed frontend checks.'
  },
  {
    id: 'chk-c5',
    category: 'C. Security',
    text: 'User input is validated and sanitized.',
    guidance: 'Defended against Cross-Site Scripting (XSS) and code injection.'
  },
  {
    id: 'chk-c6',
    category: 'C. Security',
    text: 'External dependencies have been reviewed.',
    guidance: 'No outdated, unmaintained npm packages with known security exploits.'
  },
  {
    id: 'chk-c7',
    category: 'C. Security',
    text: 'AI features have been tested for misuse and prompt injection.',
    guidance: 'Tested with adversarial inputs to ensure the bot maintains educational safety.'
  },
  {
    id: 'chk-c8',
    category: 'C. Security',
    text: 'Unauthorised access has been tested.',
    guidance: 'Attempted logging in as other users or tampering with URLs to verify defenses.'
  },
  {
    id: 'chk-c9',
    category: 'C. Security',
    text: 'A response plan exists for technical or security incidents.',
    guidance: 'Know who to contact immediately and how to take the app offline if compromised.'
  },

  // D. AI responsibility
  {
    id: 'chk-d1',
    category: 'D. AI responsibility',
    text: 'AI-generated information has been verified.',
    guidance: 'Fact-checked for curriculum accuracy, correct dates, math formulas, and citations.'
  },
  {
    id: 'chk-d2',
    category: 'D. AI responsibility',
    text: 'AI limitations are communicated clearly to learners.',
    guidance: 'Students know the AI can make mistakes and are taught to verify outputs.'
  },
  {
    id: 'chk-d3',
    category: 'D. AI responsibility',
    text: 'Students understand when they are interacting with AI.',
    guidance: 'Clear labeling; never masquerades as a real human teacher.'
  },
  {
    id: 'chk-d4',
    category: 'D. AI responsibility',
    text: 'The AI has limited permissions (least privilege).',
    guidance: 'No unchecked rights to delete records, send emails, or modify databases.'
  },
  {
    id: 'chk-d5',
    category: 'D. AI responsibility',
    text: 'Prompt injection and inappropriate output risks have been considered.',
    guidance: 'Safety guardrails prevent the AI from generating inappropriate or harmful responses.'
  },
  {
    id: 'chk-d6',
    category: 'D. AI responsibility',
    text: 'AI does not make consequential educational decisions independently.',
    guidance: 'Official grades, track placements, or disciplinary flags require human teacher review.'
  },
  {
    id: 'chk-d7',
    category: 'D. AI responsibility',
    text: 'External AI processing has been appropriately assessed.',
    guidance: 'Confirmed model vendor terms comply with institutional privacy mandates.'
  },

  // E. Accessibility and inclusion
  {
    id: 'chk-e1',
    category: 'E. Accessibility and inclusion',
    text: 'Text is readable and contrast is sufficient (WCAG 2.2 AA).',
    guidance: 'High contrast ratios tested for dark/light themes, readable font sizes.'
  },
  {
    id: 'chk-e2',
    category: 'E. Accessibility and inclusion',
    text: 'Navigation is fully keyboard-accessible with visible focus states.',
    guidance: 'Can complete the entire activity using only Tab, Enter, and arrow keys.'
  },
  {
    id: 'chk-e3',
    category: 'E. Accessibility and inclusion',
    text: 'Images have descriptive alternative text.',
    guidance: 'Informational diagrams include alt text explaining the core visual concepts.'
  },
  {
    id: 'chk-e4',
    category: 'E. Accessibility and inclusion',
    text: 'Multimedia has captions or transcripts where appropriate.',
    guidance: 'Audio and video clips provide textual alternatives for hard-of-hearing learners.'
  },
  {
    id: 'chk-e5',
    category: 'E. Accessibility and inclusion',
    text: 'Application does not disadvantage students with additional needs.',
    guidance: 'Language is plain, directions are chunked into manageable steps.'
  },
  {
    id: 'chk-e6',
    category: 'E. Accessibility and inclusion',
    text: 'I have tested the application on different devices (tablets, phones, laptops).',
    guidance: 'Layout responds smoothly across various screen sizes and resolutions.'
  },
  {
    id: 'chk-e7',
    category: 'E. Accessibility and inclusion',
    text: 'Alternative ways of participating are available.',
    guidance: 'Students who struggle with fast typing or camera requirements have non-digital options.'
  },

  // F. Assessment and student rights
  {
    id: 'chk-f1',
    category: 'F. Assessment and student rights',
    text: 'Automated feedback is not presented as infallible.',
    guidance: 'Framed as suggestions; students can explain their thinking and ask questions.'
  },
  {
    id: 'chk-f2',
    category: 'F. Assessment and student rights',
    text: 'Important assessment decisions remain under human teacher oversight.',
    guidance: 'Teachers validate all marks before they influence official records.'
  },
  {
    id: 'chk-f3',
    category: 'F. Assessment and student rights',
    text: 'Students know what happens to their submissions.',
    guidance: 'Transparent explanation of retention, visibility, and review.'
  },
  {
    id: 'chk-f4',
    category: 'F. Assessment and student rights',
    text: 'The application does not unnecessarily monitor or rank students.',
    guidance: 'No public leaderboards exposing individual struggle or causing peer embarrassment.'
  },
  {
    id: 'chk-f5',
    category: 'F. Assessment and student rights',
    text: 'Students can report problems or inaccurate feedback.',
    guidance: 'Simple reporting button or direct line to raise concerns with the teacher.'
  },

  // G. Deployment and maintenance
  {
    id: 'chk-g1',
    category: 'G. Deployment and maintenance',
    text: 'The relevant school approval has been obtained.',
    guidance: 'Management and IT have signed off on classroom usage.'
  },
  {
    id: 'chk-g2',
    category: 'G. Deployment and maintenance',
    text: 'Thorough testing has been completed before students test.',
    guidance: 'Ran through stages 1-4 with pilot colleagues and synthetic data.'
  },
  {
    id: 'chk-g3',
    category: 'G. Deployment and maintenance',
    text: 'Clear documentation is available (purpose, data flows, contacts).',
    guidance: 'Project README prepared for colleagues and administrators.'
  },
  {
    id: 'chk-g4',
    category: 'G. Deployment and maintenance',
    text: 'A responsible maintainer has been identified.',
    guidance: 'Designated teacher or department responsible for bugs and questions.'
  },
  {
    id: 'chk-g5',
    category: 'G. Deployment and maintenance',
    text: 'A plan exists for technical failure during class.',
    guidance: 'Non-digital backup activity ready if servers go down or Wi-Fi drops.'
  },
  {
    id: 'chk-g6',
    category: 'G. Deployment and maintenance',
    text: 'There is a plan for discontinuing and wiping the tool safely.',
    guidance: 'Decommissioning protocol in place when the unit ends or creator leaves.'
  }
];
