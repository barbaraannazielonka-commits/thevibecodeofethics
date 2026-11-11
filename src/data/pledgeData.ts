export interface EthicalCommitment {
  number: number;
  title: string;
  statement: string;
  elaboration: string;
}

export const ETHICAL_PLEDGE_COMMITMENTS: EthicalCommitment[] = [
  {
    number: 1,
    title: 'Putting pedagogy first',
    statement: 'We build to address real learning needs, not simply to experiment with technology.',
    elaboration: 'Every tool we create starts from an unmet classroom challenge or curriculum objective, never novelty alone.'
  },
  {
    number: 2,
    title: 'Protecting students',
    statement: 'We treat student privacy, security and dignity as non-negotiable priorities.',
    elaboration: 'We will never sacrifice a student’s emotional safety, psychological dignity, or personal data for technical convenience.'
  },
  {
    number: 3,
    title: 'Minimising data',
    statement: 'We collect only what is necessary and avoid unnecessary monitoring.',
    elaboration: 'The best tool often does not need to know who the student is. Zero-login and zero-retention are our preferred defaults.'
  },
  {
    number: 4,
    title: 'Taking responsibility',
    statement: 'We do not assume that AI-generated code is correct, secure or legally compliant.',
    elaboration: 'A working demo is never proof of security. We audit secrets, dependencies, and permissions before students touch code.'
  },
  {
    number: 5,
    title: 'Keeping humans in control',
    statement: 'We preserve professional judgement and meaningful human oversight.',
    elaboration: 'AI can assist formative feedback, but teachers retain sole authority over final assessment, grading, and student trajectory.'
  },
  {
    number: 6,
    title: 'Designing for inclusion',
    statement: 'We consider accessibility, different learning needs and diverse student experiences.',
    elaboration: 'We engineer universal accessibility (WCAG 2.2 AA) from day one so no student is excluded by vision, motor, or cognitive differences.'
  },
  {
    number: 7,
    title: 'Being transparent',
    statement: 'We explain how our tools work, what information they process and where their limitations lie.',
    elaboration: 'We never disguise an AI bot as a human teacher or deceive students about how their submissions are evaluated.'
  },
  {
    number: 8,
    title: 'Respecting intellectual property',
    statement: 'We use content, code and resources responsibly.',
    elaboration: 'We do not upload copyrighted textbooks to commercial LLMs, and we honor open-source licensing and attributions.'
  },
  {
    number: 9,
    title: 'Testing before deployment',
    statement: 'We review, challenge and evaluate our applications before students use them.',
    elaboration: 'Students are never beta testers. We adhere to a structured 6-stage development process and test with synthetic data.'
  },
  {
    number: 10,
    title: 'Learning continuously',
    statement: 'We update our knowledge, review our tools and respond to emerging risks.',
    elaboration: 'AI technology and legal norms evolve rapidly. We commit to continuous professional learning and regular tool updates.'
  },
  {
    number: 11,
    title: 'Collaborating responsibly',
    statement: 'We involve colleagues, school leaders and relevant specialists when decisions exceed our expertise.',
    elaboration: 'We honor school governance, work alongside IT and Data Protection Officers, and share our work responsibly.'
  },
  {
    number: 12,
    title: 'Knowing when not to build',
    statement: 'We recognise that some educational problems require human relationships, professional expertise or institutional solutions rather than another application.',
    elaboration: 'Technology cannot heal every classroom struggle. Empathy, human conversation, and pedagogic presence often triumph over code.'
  }
];
