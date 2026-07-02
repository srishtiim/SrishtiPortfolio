// ─────────────────────────────────────────────────────────────────────────────
//  PORTFOLIO DATA  –  single source of truth
// ─────────────────────────────────────────────────────────────────────────────

export type SkillCategory = {
  label: string;
  skills: string[];
};

export type Certification = {
  title: string;
  issuer: string;
  link?: string;
};

export type EducationEntry = {
  institution: string;
  degree: string;
  period: string;
  detail?: string;
};

export type Project = {
  id: string;
  title: string;
  tagline: string;
  description: string;
  stack: string[];
  metrics?: string;
  githubUrl?: string;
  liveUrl?: string;
  paperUrl?: string;
  image?: string;
};

// ─── SKILLS ──────────────────────────────────────────────────────────────────

export const skillCategories: SkillCategory[] = [
  {
    label: "Languages",
    skills: ["Python", "C", "C++", "SQL", "R"],
  },
  {
    label: "Frameworks & Tech",
    skills: [
      "React.js", "FastAPI", "Node.js", "Flask",
      "TensorFlow", "MySQL", "MongoDB", "ChromaDB",
    ],
  },
  {
    label: "Core CS",
    skills: ["DSA", "OOP", "RDBMS", "REST APIs"],
  },
  {
    label: "ML / AI",
    skills: [
      "RAG", "Feature Engineering",
      "Model Evaluation", "Collaborative Filtering",
    ],
  },
  {
    label: "Tools",
    skills: [
      "Git", "GitHub", "Docker", "Excel",
      "Vercel", "Render", "Tesseract OCR", "joblib",
    ],
  },
];

// ─── CERTIFICATIONS ───────────────────────────────────────────────────────────

export const certifications: Certification[] = [
  {
    title: "Learn C: Pointers and Memory",
    issuer: "Codecademy",
    link: "https://surli.cc/cfsces",
  },
  {
    title: "Foundations: Data, Data, Everywhere",
    issuer: "Google / Coursera",
    link: "https://surl.li/cdoxss",
  },
  {
    title: "Generative AI Workshop",
    issuer: "IIT Delhi",
  },
  {
    title: "Artificial Intelligence Workshop",
    issuer: "IIT Delhi",
  },
  {
    title: "Technology Job Simulation",
    issuer: "Deloitte Virtual",
    link: "https://forage.com",
  },
];

// ─── EDUCATION ────────────────────────────────────────────────────────────────

export const education: EducationEntry[] = [
  {
    institution: "Manipal University Jaipur",
    degree: "B.Tech — Computer Science (Data Science)",
    period: "2023 – 2027",
    detail: "Currently pursuing third year · CGPA on track",
  },
  {
    institution: "Amity International School, Saket",
    degree: "CBSE — Science (PCM)",
    period: "2015 – 2019",
    detail: "Class XII board exams",
  },
];

// ─── PROJECTS ─────────────────────────────────────────────────────────────────

export const projects: Project[] = [
  {
    id: "clauseguard",
    title: "ClauseGuard",
    tagline: "AI Lease Agreement Analyzer",
    description:
      "Analyzes rental agreements using RAG + GPT-4/Claude API to detect predatory clauses. Achieved 85%+ classification accuracy with OCR fallback for scanned documents. Jurisdiction-aware for Indian Tenancy Laws.",
    stack: ["Python", "FastAPI", "React", "LangChain", "ChromaDB", "Tesseract OCR"],
    metrics: "85%+ classification accuracy · OCR fallback",
    githubUrl: "https://github.com/weblaze/clause-guard",
    liveUrl: "https://clause-guard-pi.vercel.app/",
    image: "/projects/clauseguard.png",
  },
  {
    id: "workflow-analyzer",
    title: "Enterprise Workflow Inefficiency Analyzer",
    tagline: "CSV Log Analytics Platform",
    description:
      "Ingests CSV workflow logs, runs Random Forest on 2,342 records to predict project delays at 84% accuracy. Features a live React dashboard with bottleneck identification and process-flow visualization.",
    stack: ["Python", "FastAPI", "React", "Scikit-learn", "Chart.js"],
    metrics: "84% delay-prediction accuracy · 2,342 records",
    githubUrl: "https://github.com/srishtiim/workflow-analyzer",
    liveUrl: "https://workflow-analyzer-beta.vercel.app/",
    image: "/projects/workflow.png",
  },
  {
    id: "landslide-mapping",
    title: "Landslide Susceptibility Mapping",
    tagline: "Remote-Sensing Research Paper",
    description:
      "Applied Random Forest on multi-source remote sensing data via Google Earth Engine to map landslide susceptibility. Published research achieving AUC-ROC of 0.896.",
    stack: ["Python", "Google Earth Engine", "Random Forest", "GIS", "Scikit-learn"],
    metrics: "AUC-ROC 0.896 · Published research",
    paperUrl: "/assets/landslide-paper.pdf",
    image: "/projects/landslide.png",
  },
  {
    id: "news-summarizer",
    title: "News Summarizer",
    tagline: "AI-Powered Daily Digest",
    description:
      "Leverages Hugging Face transformers and GNews API to generate exam-friendly summaries, explanations, and MCQs from 500+ daily headlines. ROUGE score 0.40–0.55.",
    stack: ["Python", "Hugging Face", "GNews API", "Streamlit", "TensorFlow"],
    metrics: "ROUGE 0.40–0.55 · 500+ articles/day",
    githubUrl: "https://github.com/srishtiim/news-summarizer",
    image: "/projects/news-summarizer.png",
  },
  {
    id: "book-recommender",
    title: "Book Recommendation System",
    tagline: "Collaborative Filtering at Scale",
    description:
      "Collaborative filtering model across 10,000+ books with real-time Streamlit UI. Features NLTK-powered text similarity and joblib-cached model serving.",
    stack: ["Python", "Flask", "NLTK", "Scikit-learn", "Streamlit", "joblib"],
    metrics: "10,000+ books · Real-time inference",
    githubUrl: "https://github.com/srishtiim/book-recommendation-app",
    liveUrl: "https://book-recommendation-app-wheat.vercel.app/library",
    image: "/projects/book-recommender.png",
  },
];
