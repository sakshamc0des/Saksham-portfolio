// Plain-data content for the Experience / Profile / Contact / Resume scenes.
// Entry fields: h (title), ic (icon kind), and one of dm | p | ul | ol | chips | kind.
export const EXP = [
  { h: 'Mastek Ltd.', ic: 'doc', dm: 'AI/ML and Full Stack Engineering Intern · May to Jul 2026', ul: [
    'Ambient Listening AI: healthcare platform for real-time doctor-patient conversations, SOAP notes and clinical summaries.',
    'Talent Nebula: AI recruiter platform with resume screening, JD generation, vector search, RAG and an AI voice interview bot.',
    'Deployed on Azure VM with Linux, Nginx, SSL and Systemd.'] },
  { h: 'SuperStable.io', ic: 'person', dm: 'Backend ML Intern · New York, remote · Jan to May 2026', ul: [
    'Backend services and REST APIs for loan assessment and credit risk (FastAPI, Python, SQL): 10,000+ evaluations.',
    'Credit-scoring models for real-time eligibility and underwriting; decision time down about 30%.',
    'Optimized ETL pipelines, wrote unit tests, shipped secure services; reliability up about 20%.'] },
  { h: 'Commune', ic: 'chat', dm: 'Student collaboration platform · Jan 2026', ul: ['React.js, Node.js, Express.js and MongoDB.', 'LLM chatbot and secure authentication.'] },
  { h: 'Education', ic: 'search', dm: 'JSS Academy of Technical Education, Noida', ul: ['B.Tech in Computer Science Engineering (AI and ML)', '2023 to 2027'] },
  { h: 'Leadership', ic: 'wave', dm: 'Beyond code', ul: [
    'Campus Technical Coordinator at Youth For A Cause (YFAC): led recruitment and coordinated cross-functional teams for events.',
    'Club leader at JSS: guided members and ran events.'] },
  { h: 'Problem solving', ic: 'doc', ul: ['250+ DSA problems solved on LeetCode', 'Core CS: DSA, OOP, DBMS, OS, CN', 'LLD and System Design'] },
];

export const PRO = [
  { h: 'About', ic: 'person', p: 'Computer Science Engineering student (AI and ML, 2023 to 2027) with industry experience building production-ready full-stack and healthcare AI applications, and a strong interest in AI-powered software engineering.' },
  { h: 'Gen AI', ic: 'wave', ul: ['RAG pipelines, vector search and an AI voice interview bot', 'LLM orchestration with LangChain, Azure OpenAI GPT-4o and Claude Sonnet', 'Real-time clinical summarization for healthcare'] },
  { h: 'AI / ML', ic: 'search', ul: ['TensorFlow', 'Soniox Speech-to-Text with speaker diarization', 'Embedding-based matching and vision-LLM extraction', 'Fine-tuning on scraped product data'] },
  { h: 'Full Stack', ic: 'doc', ul: ['React.js, HTML5, CSS3', 'FastAPI, Node.js, Express.js', 'REST APIs, WebSockets, JWT', 'MongoDB, PostgreSQL, MySQL, Redis', 'Deployed on Azure VM with Nginx'] },
  { h: 'Languages and frontend', ic: 'chat', chips: ['Java', 'Python', 'JavaScript', 'SQL', 'React.js', 'HTML5', 'CSS3'] },
  { h: 'Backend and databases', ic: 'doc', chips: ['FastAPI', 'Node.js', 'Express.js', 'REST APIs', 'WebSockets', 'MongoDB', 'PostgreSQL', 'MySQL', 'Redis', 'Vector databases'] },
  { h: 'AI and cloud', ic: 'search', chips: ['LLMs', 'LangChain', 'RAG', 'TensorFlow', 'Azure OpenAI', 'Claude Sonnet', 'Soniox AI', 'Azure VM', 'Linux', 'Nginx', 'Git', 'Postman', 'Putty'] },
  { h: 'Core', ic: 'person', chips: ['DSA', 'OOP', 'DBMS', 'OS', 'CN', 'LLD', 'System Design'] },
];

// kind: 'links' | 'form' | 'download' are rendered by Special.jsx (values come from .env)
export const CON = [
  { h: 'Say hello', ic: 'chat', kind: 'links' },
  { h: 'Write to me', ic: 'doc', kind: 'form' },
];
export const RES = [
  { h: 'Resume', ic: 'doc', kind: 'download' },
  { h: 'At a glance', ic: 'person', ul: [
    'B.Tech CSE (AI/ML), JSS Noida, 2023 to 2027',
    'Mastek: AI/ML and Full Stack Engineering Intern, May to Jul 2026',
    'Projects: Ambient Listening AI, Talent Nebula, M-Scan, AI Product Search, Commune',
    'Python, FastAPI, React.js, LangChain, RAG, MongoDB, Azure'] },
];

export const PAGES = {
  experience: { kicker: '02', title: 'Experience', sub: 'Internships, projects and learning', kind: 'doc', entries: EXP },
  profile: { kicker: '03', title: 'Profile', sub: 'Gen AI · AI/ML · Full Stack', kind: 'person', entries: PRO },
  contact: { kicker: '04', title: 'Contact', sub: 'Let’s build something', kind: 'chat', entries: CON },
  resume: { kicker: '05', title: 'Resume', sub: 'Take a copy with you', kind: 'doc', entries: RES },
};
