export interface ApaSource {
  id: string;
  author: string;
  year: string;
  title: string;
  source: string;
  url: string;
  category: 
    | 'Learning Sciences & Cognitive Evidence'
    | 'Norwegian Guidance' 
    | 'International Technical & Legal' 
    | 'Accessibility & Ethical Standards'
    | 'Children’s Digital Rights & AI Ethics';
  annotation?: string;
  rawApa: string;
}

export const APA_SOURCES: ApaSource[] = [
  // --- Learning Sciences & Cognitive Evidence ---
  {
    id: 'sweller-cognitive-load',
    author: 'Sweller, J.',
    year: '2020',
    title: 'Cognitive load theory and educational technology',
    source: 'Educational Technology Research and Development, 68(1), 1–16',
    url: 'https://doi.org/10.1007/s11423-019-09701-3',
    category: 'Learning Sciences & Cognitive Evidence',
    annotation: 'Seminal empirical research demonstrating why digital learning environments must minimize extraneous cognitive load—such as non-essential decorative animations, audio alerts, and competing visual widgets—to avoid overwhelming student working memory (Framework Section 3).',
    rawApa: 'Sweller, J. (2020). Cognitive load theory and educational technology. Educational Technology Research and Development, 68(1), 1–16. https://doi.org/10.1007/s11423-019-09701-3'
  },
  {
    id: 'mayer-multimedia-learning',
    author: 'Mayer, R. E.',
    year: '2021',
    title: 'Multimedia learning (3rd ed.)',
    source: 'Cambridge University Press',
    url: 'https://doi.org/10.1017/9781316941355',
    category: 'Learning Sciences & Cognitive Evidence',
    annotation: 'Comprehensive meta-analytic principles (coherence, signaling, redundancy, and spatial contiguity) proving that extraneous digital bells and whistles actively depress deep conceptual retention and transfer.',
    rawApa: 'Mayer, R. E. (2021). Multimedia learning (3rd ed.). Cambridge University Press. https://doi.org/10.1017/9781316941355'
  },
  {
    id: 'roediger-retrieval-practice',
    author: 'Roediger, H. L., & Karpicke, J. D.',
    year: '2006',
    title: 'The power of testing memory: Basic research and implications for educational practice',
    source: 'Perspectives on Psychological Science, 1(3), 181–210',
    url: 'https://doi.org/10.1111/j.1745-6916.2006.00012.x',
    category: 'Learning Sciences & Cognitive Evidence',
    annotation: 'Groundbreaking experimental evidence demonstrating the "testing effect": active retrieval practice produces dramatically superior long-term retention compared to passive reading or watching automated AI explanations (Framework Section 3).',
    rawApa: 'Roediger, H. L., & Karpicke, J. D. (2006). The power of testing memory: Basic research and implications for educational practice. Perspectives on Psychological Science, 1(3), 181–210. https://doi.org/10.1111/j.1745-6916.2006.00012.x'
  },
  {
    id: 'kapur-productive-failure',
    author: 'Kapur, M.',
    year: '2016',
    title: 'Examining productive failure, productive success, unproductive failure, and unproductive success in learning',
    source: 'Educational Psychologist, 51(2), 289–299',
    url: 'https://doi.org/10.1080/00461520.2016.1155457',
    category: 'Learning Sciences & Cognitive Evidence',
    annotation: 'Empirical evidence that student struggle with complex, novel problems prior to direct instruction activates deeper cognitive schema. Directly supports Framework Section 4: never let AI tools eliminate students\' productive struggle.',
    rawApa: 'Kapur, M. (2016). Examining productive failure, productive success, unproductive failure, and unproductive success in learning. Educational Psychologist, 51(2), 289–299. https://doi.org/10.1080/00461520.2016.1155457'
  },
  {
    id: 'hattie-timperley-feedback',
    author: 'Hattie, J., & Timperley, H.',
    year: '2007',
    title: 'The power of feedback',
    source: 'Review of Educational Research, 77(1), 81–112',
    url: 'https://doi.org/10.3102/003465430298487',
    category: 'Learning Sciences & Cognitive Evidence',
    annotation: 'Meta-analysis across thousands of classroom studies establishing that effective formative feedback must answer three cues (Where am I going? How am I going? Where to next?) rather than delivering punitive grading or empty praise (Framework Section 3 & 14).',
    rawApa: 'Hattie, J., & Timperley, H. (2007). The power of feedback. Review of Educational Research, 77(1), 81–112. https://doi.org/10.3102/003465430298487'
  },
  {
    id: 'ryan-deci-motivation',
    author: 'Ryan, R. M., & Deci, E. L.',
    year: '2000',
    title: 'Self-determination theory and the facilitation of intrinsic motivation, social development, and well-being',
    source: 'American Psychologist, 55(1), 68–78',
    url: 'https://doi.org/10.1037/0003-066X.55.1.68',
    category: 'Learning Sciences & Cognitive Evidence',
    annotation: 'Foundational psychological theory showing that competence, autonomy, and relatedness drive learning. Provides empirical justification for banning public shaming leaderboards and toxic competitive ranking mechanics (Framework Section 13).',
    rawApa: 'Ryan, R. M., & Deci, E. L. (2000). Self-determination theory and the facilitation of intrinsic motivation, social development, and well-being. American Psychologist, 55(1), 68–78. https://doi.org/10.1037/0003-066X.55.1.68'
  },

  // --- Children’s Digital Rights & AI Ethics ---
  {
    id: 'baker-hawn-algorithmic-bias',
    author: 'Baker, R. S., & Hawn, A.',
    year: '2022',
    title: 'Algorithmic bias in education',
    source: 'International Journal of Artificial Intelligence in Education, 32(4), 1052–1092',
    url: 'https://doi.org/10.1007/s40593-021-00285-9',
    category: 'Children’s Digital Rights & AI Ethics',
    annotation: 'Empirical investigation documenting how machine learning models and NLP graders systematically disadvantage non-native language speakers, neurodivergent students, and minority backgrounds (Framework Section 12).',
    rawApa: 'Baker, R. S., & Hawn, A. (2022). Algorithmic bias in education. International Journal of Artificial Intelligence in Education, 32(4), 1052–1092. https://doi.org/10.1007/s40593-021-00285-9'
  },
  {
    id: 'unesco-genai-guidance',
    author: 'UNESCO',
    year: '2023',
    title: 'Guidance for generative AI in education and research',
    source: 'United Nations Educational, Scientific and Cultural Organization',
    url: 'https://unesdoc.unesco.org/ark:/48223/pf0000386693',
    category: 'Children’s Digital Rights & AI Ethics',
    annotation: 'Global statutory framework mandating human agency, age restrictions, intellectual property safeguards, and strict prohibitions against autonomous high-stakes educational decision-making (Framework Section 4, 14, & 20).',
    rawApa: 'UNESCO. (2023). Guidance for generative AI in education and research. United Nations Educational, Scientific and Cultural Organization. https://unesdoc.unesco.org/ark:/48223/pf0000386693'
  },
  {
    id: 'ico-childrens-code',
    author: 'Information Commissioner’s Office',
    year: '2020',
    title: 'Age appropriate design: A code of practice for online services (The Children’s Code)',
    source: 'Information Commissioner’s Office (ICO)',
    url: 'https://ico.org.uk/for-organisations/uk-gdpr-guidance-and-resources/childrens-information/childrens-code-guidance-and-resources/age-appropriate-design-a-code-of-practice-for-online-services/?search=neutral',
    category: 'Children’s Digital Rights & AI Ethics',
    annotation: 'Statutory design standard enforcing high privacy by default, zero tracking of minor behaviors without explicit necessity, and stringent data minimisation for digital learning applications (Framework Section 5 & 6).',
    rawApa: 'Information Commissioner’s Office. (2020). Age appropriate design: A code of practice for online services (The Children’s Code). ICO. https://ico.org.uk/for-organisations/uk-gdpr-guidance-and-resources/childrens-information/childrens-code-guidance-and-resources/age-appropriate-design-a-code-of-practice-for-online-services/?search=neutral'
  },

  // --- Norwegian Guidance ---
  {
    id: 'udir-ai-advice',
    author: 'Utdanningsdirektoratet',
    year: '2024',
    title: 'Råd om kunstig intelligens (KI) i skolen [Advice on artificial intelligence in schools]',
    source: 'Utdanningsdirektoratet',
    url: 'https://www.udir.no/kvalitet-og-kompetanse/digitalisering-skole/kunstig-intelligens-i-skolen/rad-om-kunstig-intelligens-skolen/',
    category: 'Norwegian Guidance',
    annotation: 'Statutory pedagogical recommendations on artificial intelligence usage, curriculum integration, and student competence development in Norwegian primary and secondary schools.',
    rawApa: 'Utdanningsdirektoratet. (2024). Råd om kunstig intelligens (KI) i skolen [Advice on artificial intelligence in schools]. https://www.udir.no/kvalitet-og-kompetanse/digitalisering-skole/kunstig-intelligens-i-skolen/rad-om-kunstig-intelligens-skolen/'
  },
  {
    id: 'udir-privacy-ai',
    author: 'Utdanningsdirektoratet',
    year: '2024',
    title: 'Personvern ved bruk av kunstig intelligens (KI) [Privacy considerations when using artificial intelligence]',
    source: 'Utdanningsdirektoratet',
    url: 'https://www.udir.no/kvalitet-og-kompetanse/digitalisering-skole/kunstig-intelligens-i-skolen/personvern-ki/',
    category: 'Norwegian Guidance',
    annotation: 'Guidance detailing data controller responsibilities, why individual teachers cannot independently approve cloud software, and legal compliance under GDPR.',
    rawApa: 'Utdanningsdirektoratet. (2024). Personvern ved bruk av kunstig intelligens (KI) [Privacy considerations when using artificial intelligence]. https://www.udir.no/kvalitet-og-kompetanse/digitalisering-skole/kunstig-intelligens-i-skolen/personvern-ki/'
  },
  {
    id: 'udir-practice-safe',
    author: 'Utdanningsdirektoratet',
    year: '2024',
    title: 'Hvordan skoler kan bruke KI trygt: Eksempler fra praksis [How schools can use AI safely: Examples from practice]',
    source: 'Utdanningsdirektoratet',
    url: 'https://www.udir.no/kvalitet-og-kompetanse/digitalisering-skole/kunstig-intelligens-i-skolen/eksempler-fra-praksis/',
    category: 'Norwegian Guidance',
    annotation: 'Empirical classroom case studies illustrating safe, teacher-directed deployments of conversational AI and generative tools.',
    rawApa: 'Utdanningsdirektoratet. (2024). Hvordan skoler kan bruke KI trygt: Eksempler fra praksis [How schools can use AI safely: Examples from practice]. https://www.udir.no/kvalitet-og-kompetanse/digitalisering-skole/kunstig-intelligens-i-skolen/eksempler-fra-praksis/'
  },
  {
    id: 'datatilsynet-digital-tools',
    author: 'Datatilsynet',
    year: 'n.d.',
    title: 'Bruk av digitale læringsmidler i skolen [Use of digital learning tools in schools]',
    source: 'Datatilsynet',
    url: 'https://www.datatilsynet.no/personvern-pa-ulike-omrader/skole-barn-unge/bruk-av-digitale-hjelpemidler/',
    category: 'Norwegian Guidance',
    annotation: 'Regulatory guidance on children\'s privacy rights, school owner obligations, and processing boundaries for educational software.',
    rawApa: 'Datatilsynet. (n.d.). Bruk av digitale læringsmidler i skolen [Use of digital learning tools in schools]. https://www.datatilsynet.no/personvern-pa-ulike-omrader/skole-barn-unge/bruk-av-digitale-hjelpemidler/'
  },
  {
    id: 'datatilsynet-free-services',
    author: 'Datatilsynet',
    year: '2026',
    title: 'Personvern i skolen: Funn om gratis nettjenester [Privacy in schools: Findings concerning free online services]',
    source: 'Datatilsynet',
    url: 'https://www.datatilsynet.no/aktuelt/aktuelle-nyheter-2026/personvern-i-skolen--funn-om-gratis-nettjenester/',
    category: 'Norwegian Guidance',
    annotation: 'Audit report exposing how "free" third-party apps secretly collect telemetry, harvest device fingerprints, and leak student information without data processing agreements.',
    rawApa: 'Datatilsynet. (2026). Personvern i skolen: Funn om gratis nettjenester [Privacy in schools: Findings concerning free online services]. https://www.datatilsynet.no/aktuelt/aktuelle-nyheter-2026/personvern-i-skolen--funn-om-gratis-nettjenester/'
  },
  {
    id: 'datatilsynet-dpia',
    author: 'Datatilsynet',
    year: 'n.d.',
    title: 'Vurdering av personvernkonsekvenser (DPIA) [Data Protection Impact Assessments (DPIA)]',
    source: 'Datatilsynet',
    url: 'https://www.datatilsynet.no/rettigheter-og-plikter/virksomhetenes-plikter/vurdering-av-personvernkonsekvenser/',
    category: 'Norwegian Guidance',
    annotation: 'Guidelines defining when educational technology triggers mandatory impact assessments under GDPR Article 35.',
    rawApa: 'Datatilsynet. (n.d.). Vurdering av personvernkonsekvenser (DPIA) [Data Protection Impact Assessments (DPIA)]. https://www.datatilsynet.no/rettigheter-og-plikter/virksomhetenes-plikter/vurdering-av-personvernkonsekvenser/'
  },
  {
    id: 'nsm-security',
    author: 'Nasjonal sikkerhetsmyndighet',
    year: 'n.d.',
    title: 'NSMs grunnprinsipper for IKT-sikkerhet: Råd og veiledning [NSM’s ICT security principles: Advice and guidance]',
    source: 'NSM',
    url: 'https://nsm.no/advice-and-guidance/publications/nsm-ict-security-principles',
    category: 'Norwegian Guidance',
    annotation: 'Fundamental cybersecurity architecture benchmarks including access control, network segregation, and credential management.',
    rawApa: 'Nasjonal sikkerhetsmyndighet. (n.d.). NSMs grunnprinsipper for IKT-sikkerhet: Råd og veiledning [NSM’s ICT security principles: Advice and guidance]. https://nsm.no/advice-and-guidance/publications/nsm-ict-security-principles'
  },

  // --- International Technical & Legal ---
  {
    id: 'eu-ai-act',
    author: 'European Parliament and Council of the European Union',
    year: '2024',
    title: 'Regulation (EU) 2024/1689 laying down harmonised rules on artificial intelligence (Artificial Intelligence Act)',
    source: 'Official Journal of the European Union, L 2024/1689',
    url: 'https://eur-lex.europa.eu/eli/reg/2024/1689/oj',
    category: 'International Technical & Legal',
    annotation: 'Comprehensive European legislative framework classifying educational assessment and grading AI systems under High-Risk categories requiring strict oversight.',
    rawApa: 'European Parliament and Council of the European Union. (2024). Regulation (EU) 2024/1689 of the European Parliament and of the Council of 13 June 2024 laying down harmonised rules on artificial intelligence (Artificial Intelligence Act). Official Journal of the European Union, L 2024/1689. https://eur-lex.europa.eu/eli/reg/2024/1689/oj'
  },
  {
    id: 'owasp-llm-top10',
    author: 'Open Web Application Security Project',
    year: '2026',
    title: 'OWASP top 10 for large language model applications (Version 2026)',
    source: 'OWASP GenAI Security Project',
    url: 'https://github.com/GenAI-Security-Project/GenAI-LLM-Top10',
    category: 'International Technical & Legal',
    annotation: 'Industry security benchmark identifying critical vulnerabilities in LLM applications, including prompt injection (LLM01), sensitive information disclosure (LLM02), and excessive agency (LLM06).',
    rawApa: 'Open Web Application Security Project. (2026). OWASP top 10 for large language model applications (Version 2026). OWASP GenAI Security Project. https://github.com/GenAI-Security-Project/GenAI-LLM-Top10'
  },

  // --- Accessibility & Ethical Standards ---
  {
    id: 'cast-udl-guidelines',
    author: 'CAST',
    year: '2024',
    title: 'Universal Design for Learning Guidelines version 3.0',
    source: 'CAST, Inc.',
    url: 'https://udlguidelines.cast.org/',
    category: 'Accessibility & Ethical Standards',
    annotation: 'Research-based framework providing multiple means of engagement, representation, and action/expression, ensuring educational tools proactively dismantle barriers for diverse learners (Framework Section 11).',
    rawApa: 'CAST. (2024). Universal Design for Learning Guidelines version 3.0. CAST, Inc. https://udlguidelines.cast.org/'
  },
  {
    id: 'w3c-wcag22',
    author: 'World Wide Web Consortium',
    year: '2023',
    title: 'Web content accessibility guidelines (WCAG) 2.2',
    source: 'W3C Recommendation',
    url: 'https://www.w3.org/WAI/standards-guidelines/wcag/',
    category: 'Accessibility & Ethical Standards',
    annotation: 'International web accessibility standards establishing minimum contrast, keyboard navigability, cognitive load controls, and assistive technology compatibility.',
    rawApa: 'World Wide Web Consortium. (2023). Web content accessibility guidelines (WCAG) 2.2 (W3C Recommendation). https://www.w3.org/WAI/standards-guidelines/wcag/'
  },
  {
    id: 'vibe-code-framework',
    author: 'The Vibe-Code of Ethics Working Group',
    year: '2026',
    title: 'The Vibe-Code of Ethics: A responsible creation framework for educators building AI-powered educational tools',
    source: 'Educational Resource Publication',
    url: '/assets/aistudio/THE_VIBE-CODE_OF_ETHICS__1__302ae484.pdf',
    category: 'Accessibility & Ethical Standards',
    annotation: 'The primary 27-page foundational framework establishing principles, the 23-point pre-deployment checklist gate, risk classification, and ethical commitments for educator-creators.',
    rawApa: 'The Vibe-Code of Ethics Working Group. (2026). The Vibe-Code of Ethics: A responsible creation framework for educators building AI-powered educational tools. https://ais-dev-glfo6exoaxaymudgikccah-384708544970.europe-west2.run.app/assets/aistudio/THE_VIBE-CODE_OF_ETHICS__1__302ae484.pdf'
  }
];
