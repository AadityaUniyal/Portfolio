/**
 * Aaditya Uniyal — curated portfolio content.
 * Project details are summarized from the linked public GitHub repositories.
 */
window.PORTFOLIO_DATA = {
  personal: {
    name: "Aaditya Uniyal",
    title: "Software Engineer",
    email: "aaditya.uniyal22@gmail.com",
    location: "Dehradun, India",
    bio: "Computer Science student at Graphic Era Deemed to be University. I build software across AI-assisted products, backend systems, cloud infrastructure, and applied machine learning.",
    social: {
      github: "https://github.com/AadityaUniyal",
      linkedin: "https://www.linkedin.com/in/aaditya-uniyal-48ab7b342/",
      leetcode: "https://leetcode.com/u/Aaditya_Cheeks/",
      email: "mailto:aaditya.uniyal22@gmail.com"
    },
    roles: ["AI-assisted products", "Backend systems", "Cloud infrastructure", "Applied machine learning"]
  },
  metrics: [
    { number: "05", label: "Selected projects", sub: "Source and implementation notes on GitHub" },
    { number: "03", label: "Live demos", sub: "BarrierLens · DarkStori · Quorum OS" },
    { number: "AI", label: "Applied across products", sub: "Computer vision · agents · forecasting" },
    { number: "AWS", label: "Student Builder Group", sub: "Graphic Era University" }
  ],
  projects: [
    {
      id: "barrier-lens", index: "01", featured: true, title: "BarrierLens",
      tagline: "Agentic web accessibility testing and code remediation",
      shortDesc: "Traverses live web apps under keyboard and assistive constraints, identifies behavioral accessibility barriers, and prepares source-level fixes with evidence.",
      description: "BarrierLens evaluates interactive web journeys rather than only inspecting static markup. Its traversal checks keyboard behavior, focus order, and whether dynamic interface changes are announced. Findings are connected to source-level remediation and a report that preserves the evidence behind each issue.",
      problem: "Static accessibility scans can miss issues that appear only after a person opens a menu, moves through a dialog, or completes a multi-step flow.",
      solution: "Run an agentic traversal against a target app, verify interactive behavior, and produce proposed code fixes and a traceable conformance report. The repository describes GitHub pull request generation and VPAT-style reporting; those are project capabilities, not independent legal certification.",
      impact: "Makes accessibility review more behavior-focused and connects findings to code changes developers can inspect.",
      architecture: "Target application → keyboard and assistive traversal → behavioral verification → source remediation → evidence report / GitHub PR",
      tech: ["Next.js 15", "React 19", "TypeScript", "Agentic Testing", "WCAG"],
      category: ["ai", "social"], color: "#f59e0b", colorDark: "#92400e", colorLight: "#fef3c7",
      github: "https://github.com/AadityaUniyal/BarrierLens", demo: "http://43.205.254.136",
      diagramNodes: [{ label: "Target App", type: "input" }, { label: "Traversal", type: "process", pulse: true }, { label: "Behavior Checks", type: "ai" }, { label: "Fix + Evidence", type: "output" }]
    },
    {
      id: "fitness-smarty", index: "02", featured: true, title: "Fitness_Smarty",
      tagline: "AI-assisted fitness, nutrition, and wellness platform",
      shortDesc: "A full-stack fitness product combining meal vision, AI coaching, workout planning, progress tracking, and wellness features.",
      description: "Fitness_Smarty pairs a React and TypeScript client with a FastAPI backend. Its product includes meal scanning, an AI coach, workout and nutrition planning, progress features, and wellness support. The repository describes 39 API routers, more than 100 endpoints, and 30+ dashboard views.",
      problem: "Fitness products often split meal tracking, workout plans, and progress feedback across disconnected tools and repetitive manual entry.",
      solution: "Bring those flows together behind a JWT-protected API and relational data model. The meal analysis flow uses YOLOv8 detection with Gemini vision reasoning; service features include coaching, nutrition calculations, progress tracking, and adaptive recommendations.",
      impact: "A broad end-to-end product that joins computer vision and language-model features with user, workout, and nutrition workflows.",
      architecture: "React + TypeScript client → FastAPI gateway → auth / service routers → Gemini and YOLO vision flows → SQLAlchemy models → PostgreSQL or SQLite",
      tech: ["Python", "FastAPI", "React", "TypeScript", "YOLOv8", "Gemini", "SQLAlchemy", "PostgreSQL"],
      category: ["ai", "ml"], color: "#10b981", colorDark: "#064e3b", colorLight: "#d1fae5",
      github: "https://github.com/AadityaUniyal/Fitness_Smarty", demo: null,
      diagramNodes: [{ label: "User Workflow", type: "input" }, { label: "FastAPI", type: "process" }, { label: "YOLO + Gemini", type: "ai", pulse: true }, { label: "Plans + Progress", type: "output" }]
    },
    {
      id: "quorum", index: "03", featured: true, title: "Quorum OS",
      tagline: "Document intelligence for financial and legal review",
      shortDesc: "A seven-agent document review platform that pairs model inference with deterministic arithmetic and spatial evidence provenance.",
      description: "Quorum OS analyzes financial and legal documents through a seven-agent consensus workflow. Groq and Gemini provide complementary inference; Python Decimal arithmetic checks numeric results deterministically, while spatial coordinates and a Merkle-based record preserve where evidence came from.",
      problem: "High-stakes document workflows need more than plausible language output: reviewers need verified arithmetic and traceable evidence locations.",
      solution: "Combine specialized agents and adversarial review with deterministic calculations and source-coordinate provenance, then present the results in a document-focused review interface.",
      impact: "Designed to make extracted findings easier to inspect, verify, and trace back to their source document.",
      architecture: "Document upload → extraction and coordinate grounding → seven-agent arbitration → Decimal / formal checks → provenance seal → review interface",
      tech: ["Next.js 16", "FastAPI", "Neon Postgres", "Groq", "Gemini 2.0 Flash", "Python Decimal", "Merkle Provenance"],
      category: ["ai", "distributed", "cloud"], color: "#6366f1", colorDark: "#312e81", colorLight: "#e0e7ff",
      github: "https://github.com/AadityaUniyal/Quorum-", demo: "https://quorum-os.vercel.app",
      diagramNodes: [{ label: "Documents", type: "input" }, { label: "7 Agents", type: "ai", pulse: true }, { label: "Deterministic Checks", type: "process" }, { label: "Evidence Trail", type: "output" }]
    },
    {
      id: "darkstori", index: "04", featured: true, title: "DarkStori",
      tagline: "Operating system for quick-commerce networks",
      shortDesc: "A deployed operations platform connecting site selection, demand forecasting, dark-store layout, picking, rider batching, and perishables planning.",
      description: "DarkStori brings together operational decisions for quick-commerce dark stores. The product covers candidate-site scoring, neighborhood demand forecasting, warehouse layout and pick-path optimization, order batching and dispatch, and perishable inventory planning. Its repository documents a React frontend, FastAPI services, PostgreSQL, and Redis.",
      problem: "Site selection, in-store picking, dispatch, and inventory are interdependent, yet operators often plan them in separate tools and workflows.",
      solution: "Connect the operational stages in one product and use purpose-matched algorithms: XGBoost / Prophet ensembles for demand, simulated annealing and 2-Opt for layout and routes, and Clarke–Wright savings for order batching.",
      impact: "A systems view of quick-commerce operations, from deciding where a store belongs to coordinating work after orders arrive.",
      architecture: "Network and demand data → site scoring / forecasting → store layout and pick routes → order batching / dispatch → inventory actions",
      tech: ["Python", "FastAPI", "React", "PostgreSQL", "Redis", "XGBoost", "Prophet", "Optimization"],
      category: ["ml", "data"], color: "#f97316", colorDark: "#7c2d12", colorLight: "#ffedd5",
      github: "https://github.com/AadityaUniyal/Darkstori", demo: "https://darkstori.vercel.app",
      diagramNodes: [{ label: "Store Network", type: "input" }, { label: "Forecast + Optimize", type: "ai", pulse: true }, { label: "Pick + Batch", type: "process" }, { label: "Ops Plan", type: "output" }]
    },
    {
      id: "mini-aws", index: "05", featured: true, title: "MiniCloud",
      tagline: "A local cloud platform built as a modular monolith",
      shortDesc: "A local simulation of core AWS workflows, including IAM, EC2, S3, Lambda, VPC, metrics, and a desktop UI / CLI.",
      description: "MiniCloud packages cloud-service simulations in a Java 17 and Spring Boot modular monolith. It includes IAM policy evaluation, EC2 lifecycle management, S3 object storage, Docker-backed Lambda execution and S3 event triggers, VPC networking, metrics, a Java Swing interface, REST APIs, and a Python CLI.",
      problem: "Learning and exercising cloud-service interactions can be expensive and credential-heavy when every experiment depends on a remote account.",
      solution: "Model core service APIs and connect their workflows locally, including an S3-to-Lambda event path and containerized function runtime. The repository also describes AWS-compatible S3 and CLI / SDK workflows.",
      impact: "A hands-on cloud systems project that makes service boundaries, event flow, identity checks, and runtime behavior inspectable on a local machine.",
      architecture: "Java Swing / Python CLI / REST → Spring Boot modules → IAM · EC2 · S3 · VPC · metrics → S3 events → Docker Lambda runtime",
      tech: ["Java 17", "Spring Boot", "Docker", "Java Swing", "H2 / PostgreSQL", "Python CLI"],
      category: ["cloud", "infrastructure"], color: "#0ea5e9", colorDark: "#0c4a6e", colorLight: "#e0f2fe",
      github: "https://github.com/AadityaUniyal/Mini-AWS", demo: null,
      diagramNodes: [{ label: "Desktop / CLI", type: "input" }, { label: "Spring Modules", type: "process" }, { label: "Cloud Services", type: "cloud", pulse: true }, { label: "Events + Metrics", type: "output" }]
    }
  ],
  experience: [
    {
      role: "AI Engineering Intern", company: "Cenlub Systems", type: "Internship", duration: "May 2026 – July 2026", location: "India",
      bullets: [
        "Worked on an AI-assisted document workflow for engineering RFQs, structuring source information for review.",
        "Built an extraction and validation flow with a human review step for fields that need confirmation.",
        "Focused on traceability from extracted values back to the source document."
      ],
      tech: ["Python", "LLM workflows", "Document processing", "Validation"]
    }
  ],
  education: [{
    institution: "Graphic Era Deemed to be University", degree: "B.Tech, Computer Science Engineering", duration: "2024 – 2028", location: "Dehradun, India"
  }],
  achievements: [
    { title: "Microsoft Certified: Azure Fundamentals", issuer: "Microsoft", category: "certification", year: "2025" },
    { title: "GitHub Copilot Fundamentals", issuer: "Microsoft", category: "training", year: "2025" },
    { title: "AWS Cloud Quest: Cloud Practitioner", issuer: "Amazon Web Services", category: "training badge", year: "2025" },
    { title: "AWS Knowledge: Cloud Essentials", issuer: "Amazon Web Services", category: "training badge", year: "2025" },
    { title: "Artificial Intelligence", issuer: "DeepLearning.AI", category: "course certificate", year: "2025" },
    { title: "Artificial Intelligence", issuer: "Teachnook", category: "course certificate", year: "2025" },
    { title: "Deloitte Australia Data Analytics Job Simulation", issuer: "Forage", category: "job simulation", year: "2025" },
    { title: "Google Play Academy: Store Listing Certificate", issuer: "Google Play Academy", category: "certificate", year: "2025" },
    { title: "DSA in Python Quiz", issuer: "Elite Coders", category: "certificate", year: "2025" },
    { title: "Elite Quiz 3.0", issuer: "Elite Coders", category: "certificate", year: "2025" }
  ],
  skills: {
    languages: { title: "Languages", icon: "⌘", color: "#00d4ff", items: ["Java", "Python", "C++", "JavaScript", "TypeScript", "SQL"] },
    ai: { title: "AI & Applied ML", icon: "✳", color: "#a855f7", items: ["Agentic workflows", "LLM applications", "YOLOv8", "Gemini", "Groq", "XGBoost"] },
    backend: { title: "Backend & Infrastructure", icon: "⌂", color: "#0ea5e9", items: ["Spring Boot", "FastAPI", "REST APIs", "Docker", "AWS service concepts"] },
    databases: { title: "Data", icon: "▤", color: "#10b981", items: ["PostgreSQL", "Neon", "Redis", "SQLAlchemy"] },
    frontend: { title: "Frontend", icon: "◫", color: "#f59e0b", items: ["Next.js", "React", "TypeScript", "Tailwind CSS"] },
    devops: { title: "Tools", icon: "⚙", color: "#f97316", items: ["Git / GitHub", "GitHub Actions", "Maven", "Docker Compose"] }
  },
  leetcode: { username: "Aaditya_Cheeks", profileUrl: "https://leetcode.com/u/Aaditya_Cheeks/" }
};
