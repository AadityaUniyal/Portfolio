/* ==========================================================================
   AADITYA UNIYAL - CORE APPLICATION SCRIPT
   ========================================================================== */

// Project Architecture Database for Interactive Modals
const PROJECT_DETAILS = {
  nexus: {
    title: "Nexus — Autonomous Logistics & Spatial Intelligence",
    subtitle: "Real-time 3D GIS with Groq LLaMA 3.3 + Gemini Dual Engine",
    github: "https://github.com/AadityaUniyal/Nexus",
    demo: "https://github.com/AadityaUniyal/Nexus",
    tags: ["TypeScript", "3D GIS", "Groq LLaMA 3.3", "Gemini 1.5", "Physics Engine", "Web Audio"],
    problem: "Modern supply chain networks suffer from fragmented spatial awareness and high-latency simulation rendering, leading to multi-hour delays in rerouting fleets under dynamic weather or road disruptions.",
    solution: "Engineered an autonomous spatial intelligence platform combining high-frequency 3D GIS rendering with a deterministic physics simulation engine. Integrated a tactical voice copilot powered by Groq's ultra-low-latency LLaMA 3.3 for sub-200ms responses, backed by automatic failover to Google Gemini 1.5.",
    architecture: `[ Fleet Sensor Stream ] ──► [ Spatial Ingestion Engine ]
                                │
                                ▼
[ 3D GIS Viewport (Deck.gl) ] ◄── [ Deterministic Physics Solver ]
                                ▲
                                │ Sub-200ms Tactical Queries
[ Voice / Tactical Prompt ] ──► [ Groq LLaMA 3.3 (Fallback: Gemini 1.5) ]`,
    highlights: [
      "Sub-200ms voice copilot latency using Groq LLaMA 3.3 streaming",
      "Deterministic What-If simulations for real-time fleet bottleneck prevention",
      "Full 3D GIS spatial visualization with dynamic multi-layer telemetry"
    ]
  },

  quorum: {
    title: "Quorum — Distributed Document Intelligence Platform",
    subtitle: "Event-Driven Asynchronous RAG with RabbitMQ, ChromaDB & SSE",
    github: "https://github.com/AadityaUniyal",
    demo: "https://github.com/AadityaUniyal",
    tags: ["FastAPI", "Next.js", "RabbitMQ", "ChromaDB", "PostgreSQL", "Redis", "SSE"],
    problem: "Processing hundreds of dense, heterogeneous enterprise PDFs locks standard synchronous HTTP request cycles, causing server timeouts, connection drops, and erratic response latency.",
    solution: "Architected an event-driven document pipeline decoupling compute-heavy OCR and embedding generation into background RabbitMQ consumer workers. Implemented semantic chunking indexed in ChromaDB vector store, Redis caching for repetitive queries, human-in-the-loop review routing for low-confidence extractions, and real-time SSE response streaming to a Next.js interface.",
    architecture: `[ User PDF Upload ] ──► [ FastAPI Gateway ] ──► [ RabbitMQ Exchange ]
                                                      │
         ┌────────────────────────────────────────────┴─────────────────┐
         ▼                                                              ▼
[ Worker: OCR & Parser ]                                     [ Worker: Confidence Auditor ]
         │                                                              │ (Flag < 85%)
         ▼                                                              ▼
[ ChromaDB Embeddings ] ◄── [ Semantic Search / RAG ]        [ Human Review Queue ]
         │
         ▼
[ Redis Cache ] ──► [ Server-Sent Events (SSE) Stream ] ──► [ Next.js UI ]`,
    highlights: [
      "Zero API thread blocking through asynchronous RabbitMQ task offloading",
      "Human-in-the-loop confidence scoring preventing dirty data ingestion",
      "Real-time token streaming with Server-Sent Events (SSE) and Redis caching"
    ]
  },

  miniaws: {
    title: "Mini-AWS (MiniCloud) — Self-Hosted Cloud Platform",
    subtitle: "Modular Cloud Infrastructure Engine in Java, Spring Boot & Docker",
    github: "https://github.com/AadityaUniyal/Mini-AWS",
    demo: "https://github.com/AadityaUniyal/Mini-AWS",
    tags: ["Java", "Spring Boot", "Docker API", "S3 Engine", "IAM RBAC", "GitHub Actions"],
    problem: "Developing and testing cloud-native distributed microservices against live cloud providers introduces steep recurring billing, network jitter, and credential exposure risks for local testing teams.",
    solution: "Built a production-grade, self-hosted simulation of core AWS services as a modular monolith using Spring Boot. Implemented custom IAM role-based access control, a serverless Lambda execution engine that spins up and tears down isolated Docker containers triggered by S3 file events, and automated instance self-healing.",
    architecture: `[ Client CLI / GUI ] ──► [ Spring Boot Cloud Gateway ]
                                   │
               ┌───────────────────┼───────────────────┐
               ▼                   ▼                   ▼
        [ IAM Access RBAC ]  [ S3 Object Store ]  [ EC2 Instance Mgr ]
                                   │
                           S3 Event Trigger
                                   ▼
                    [ Docker Lambda Runner Daemon ]
                    (Isolated Container Execution & Auto-Recovery)`,
    highlights: [
      "Containerized serverless Lambda execution via Docker Engine integration",
      "Event-driven architecture triggering functions directly on simulated S3 uploads",
      "Full unit & integration test coverage automated via GitHub Actions CI/CD"
    ]
  },

  locallens: {
    title: "LocalLens — AI-Powered Smart City Infrastructure",
    subtitle: "Emergency Dispatch, Real-Time Vision Traffic & Grievance AI",
    github: "https://github.com/AadityaUniyal/LocalLens",
    demo: "https://github.com/AadityaUniyal/LocalLens",
    tags: ["JavaScript", "Node.js", "Computer Vision AI", "Spatial Dispatch", "GeoJSON"],
    problem: "Municipal emergency response systems, blood donor coordination, and civic grievances operate in isolated silos, causing critical dispatch delays during urban emergencies.",
    solution: "Engineered a unified civic platform integrating computer-vision-based traffic congestion analytics, an intelligent donor-recipient matching algorithm with real-time location radius computation, and an automated government complaint triage pipeline.",
    architecture: `[ Traffic Camera Feeds ] ──► [ Vision AI Analysis ] ──► [ Congestion Matrix ]
                                                                 │
[ Blood Donation Need ]  ──► [ Geo Radius Matcher ]  ──► [ Dispatch Alert Engine ]
                                                                 ▲
[ Citizen Grievance ]    ──► [ NLP Category Triage ] ────────────┘`,
    highlights: [
      "Automated emergency blood donor proximity matching algorithm",
      "Real-time congestion assessment pipeline for dynamic city traffic flow",
      "Intelligent complaint routing engine cutting resolution cycle times"
    ]
  }
};

document.addEventListener('DOMContentLoaded', () => {
  // 1. Dynamic Typing Role Text
  const dynamicRoleEl = document.getElementById('dynamic-role');
  if (dynamicRoleEl) {
    const roles = [
      "AI Systems Engineer",
      "Distributed Backend Architect",
      "RAG & Multi-Agent Builder",
      "500+ LeetCode Solver",
      "Cloud & Container Enthusiast"
    ];
    let roleIdx = 0;
    let charIdx = 0;
    let isDeleting = false;
    let typeDelay = 100;

    function typeLoop() {
      const currentRole = roles[roleIdx];
      if (isDeleting) {
        dynamicRoleEl.textContent = currentRole.substring(0, charIdx - 1);
        charIdx--;
        typeDelay = 45;
      } else {
        dynamicRoleEl.textContent = currentRole.substring(0, charIdx + 1);
        charIdx++;
        typeDelay = 110;
      }

      if (!isDeleting && charIdx === currentRole.length) {
        typeDelay = 2200; // Pause when word complete
        isDeleting = true;
      } else if (isDeleting && charIdx === 0) {
        isDeleting = false;
        roleIdx = (roleIdx + 1) % roles.length;
        typeDelay = 400;
      }

      setTimeout(typeLoop, typeDelay);
    }
    typeLoop();
  }

  // 2. Sound Toggle Button
  const soundToggleBtn = document.getElementById('sound-toggle');
  if (soundToggleBtn && window.soundEngine) {
    function updateSoundBtnIcon() {
      const muted = window.soundEngine.isMuted();
      soundToggleBtn.innerHTML = muted 
        ? '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M11 5L6 9H2v6h4l5 4V5z"/><line x1="23" y1="9" x2="17" y2="15"/><line x1="17" y1="9" x2="23" y2="15"/></svg>'
        : '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon><path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"></path></svg>';
      soundToggleBtn.setAttribute('title', muted ? 'Unmute Audio Feedback' : 'Mute Audio Feedback');
    }
    updateSoundBtnIcon();

    soundToggleBtn.addEventListener('click', () => {
      window.soundEngine.toggleMute();
      updateSoundBtnIcon();
      if (!window.soundEngine.isMuted()) window.soundEngine.playSuccess();
    });
  }

  // 3. 3D Tilt Effect on Project Cards
  const cards = document.querySelectorAll('.project-card, .portrait-frame');
  cards.forEach((card) => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      const rotateX = -(y / (rect.height / 2)) * 6;
      const rotateY = (x / (rect.width / 2)) * 6;
      card.style.transform = `perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) translateY(-4px)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0)';
    });
  });

  // 4. Project Architecture Modal
  const modalBackdrop = document.getElementById('project-modal');
  const modalCloseBtn = document.getElementById('modal-close-btn');
  const modalTitle = document.getElementById('modal-title');
  const modalSubtitle = document.getElementById('modal-subtitle');
  const modalProblem = document.getElementById('modal-problem');
  const modalSolution = document.getElementById('modal-solution');
  const modalArch = document.getElementById('modal-arch');
  const modalHighlights = document.getElementById('modal-highlights');
  const modalGithubLink = document.getElementById('modal-github-link');
  const modalDemoLink = document.getElementById('modal-demo-link');

  function openProjectModal(projectId) {
    const data = PROJECT_DETAILS[projectId];
    if (!data) return;

    modalTitle.textContent = data.title;
    modalSubtitle.textContent = data.subtitle;
    modalProblem.textContent = data.problem;
    modalSolution.textContent = data.solution;
    modalArch.textContent = data.architecture;

    modalHighlights.innerHTML = '';
    data.highlights.forEach((item) => {
      const li = document.createElement('li');
      li.className = 'exp-bullet-item';
      li.textContent = item;
      modalHighlights.appendChild(li);
    });

    modalGithubLink.href = data.github;
    modalDemoLink.href = data.demo;

    modalBackdrop.classList.add('open');
    if (window.soundEngine) window.soundEngine.playChime();
  }

  function closeProjectModal() {
    if (modalBackdrop) {
      modalBackdrop.classList.remove('open');
      if (window.soundEngine) window.soundEngine.playClick();
    }
  }

  document.querySelectorAll('.project-inspect-btn').forEach((btn) => {
    btn.addEventListener('click', () => {
      const id = btn.getAttribute('data-project');
      openProjectModal(id);
    });
  });

  if (modalCloseBtn) modalCloseBtn.addEventListener('click', closeProjectModal);
  if (modalBackdrop) {
    modalBackdrop.addEventListener('click', (e) => {
      if (e.target === modalBackdrop) closeProjectModal();
    });
  }

  // 5. Project Filtering Logic
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  filterBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      filterBtns.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');

      const category = btn.getAttribute('data-filter');
      projectCards.forEach((card) => {
        const cat = card.getAttribute('data-category');
        if (category === 'all' || cat.includes(category)) {
          card.style.display = 'flex';
        } else {
          card.style.display = 'none';
        }
      });

      if (window.soundEngine) window.soundEngine.playClick();
    });
  });

  // 6. Command Palette (Cmd + K / Ctrl + K)
  const cmdPalette = document.getElementById('cmd-palette');
  const cmdTrigger = document.getElementById('cmd-trigger');
  const cmdInput = document.getElementById('cmd-input');
  const cmdItems = document.querySelectorAll('.cmd-item');

  function openCmdPalette() {
    if (cmdPalette) {
      cmdPalette.classList.add('open');
      if (cmdInput) {
        cmdInput.value = '';
        setTimeout(() => cmdInput.focus(), 50);
      }
      if (window.soundEngine) window.soundEngine.playChime();
    }
  }

  function closeCmdPalette() {
    if (cmdPalette) {
      cmdPalette.classList.remove('open');
      if (window.soundEngine) window.soundEngine.playClick();
    }
  }

  if (cmdTrigger) cmdTrigger.addEventListener('click', openCmdPalette);

  window.addEventListener('keydown', (e) => {
    if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
      e.preventDefault();
      if (cmdPalette.classList.contains('open')) closeCmdPalette();
      else openCmdPalette();
    }
    if (e.key === 'Escape') {
      closeCmdPalette();
      closeProjectModal();
    }
  });

  if (cmdPalette) {
    cmdPalette.addEventListener('click', (e) => {
      if (e.target === cmdPalette) closeCmdPalette();
    });
  }

  if (cmdInput) {
    cmdInput.addEventListener('input', () => {
      const q = cmdInput.value.toLowerCase().trim();
      cmdItems.forEach((item) => {
        const text = item.textContent.toLowerCase();
        if (text.includes(q)) {
          item.style.display = 'flex';
        } else {
          item.style.display = 'none';
        }
      });
    });
  }

  cmdItems.forEach((item) => {
    item.addEventListener('click', () => {
      const action = item.getAttribute('data-action');
      closeCmdPalette();
      executePaletteAction(action);
    });
  });

  function executePaletteAction(action) {
    if (action.startsWith('#')) {
      const target = document.querySelector(action);
      if (target) target.scrollIntoView({ behavior: 'smooth' });
    } else if (action === 'copy-email') {
      copyEmailToClipboard();
    } else if (action === 'project-nexus') {
      openProjectModal('nexus');
    } else if (action === 'project-quorum') {
      openProjectModal('quorum');
    } else if (action === 'project-miniaws') {
      openProjectModal('miniaws');
    } else if (action === 'project-locallens') {
      openProjectModal('locallens');
    } else if (action === 'github') {
      window.open('https://github.com/AadityaUniyal', '_blank');
    } else if (action === 'linkedin') {
      window.open('https://www.linkedin.com/in/aaditya-uniyal-48ab7b342/', '_blank');
    } else if (action === 'leetcode') {
      window.open('https://leetcode.com/u/Aaditya_Cheeks/', '_blank');
    }
  }

  // 7. 1-Click Clipboard Email Copy
  const copyBtn = document.getElementById('copy-email-btn');
  const toast = document.getElementById('toast-notice');

  function copyEmailToClipboard() {
    const email = "aaditya.uniyal22@gmail.com";
    navigator.clipboard.writeText(email).then(() => {
      if (toast) {
        toast.textContent = "✓ Email copied to clipboard: " + email;
        toast.classList.add('show');
        if (window.soundEngine) window.soundEngine.playSuccess();
        setTimeout(() => toast.classList.remove('show'), 3500);
      }
    }).catch(() => {
      prompt("Copy email address:", email);
    });
  }

  if (copyBtn) copyBtn.addEventListener('click', copyEmailToClipboard);

  // 8. Mobile Menu Toggle
  const mobileToggle = document.getElementById('mobile-toggle');
  const navLinks = document.getElementById('nav-links');
  if (mobileToggle && navLinks) {
    mobileToggle.addEventListener('click', () => {
      navLinks.classList.toggle('mobile-open');
      if (window.soundEngine) window.soundEngine.playClick();
    });

    navLinks.querySelectorAll('.nav-link').forEach((link) => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('mobile-open');
      });
    });
  }
});
