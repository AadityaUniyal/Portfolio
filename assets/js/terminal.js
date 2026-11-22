/**
 * terminal.js — Interactive Developer Terminal Console
 * Allows recruiters to run CLI commands, explore projects, test architecture, and trigger easter eggs.
 */
(function () {
  'use strict';

  document.addEventListener('DOMContentLoaded', () => {
    const terminalBody = document.getElementById('terminal-body');
    const terminalInput = document.getElementById('terminal-input');
    if (!terminalBody || !terminalInput) return;

    const COMMANDS = {
      help: `Supported commands:
  • <span style="color:#00d4ff;">projects</span>    : Top 5 engineering projects with architecture briefs
  • <span style="color:#00d4ff;">barrierlens</span> : Multimodal AI accessibility tool (Google Gemma 2B)
  • <span style="color:#00d4ff;">fitness</span>     : Hybrid YOLOv8 × Gemini 1.5 Flash meal analyzer
  • <span style="color:#00d4ff;">quorum</span>      : Distributed RAG with RabbitMQ & ChromaDB
  • <span style="color:#00d4ff;">darkstori</span>   : Geospatial demand forecasting (XGBoost)
  • <span style="color:#00d4ff;">miniaws</span>     : Self-hosted AWS simulation (Docker Lambda)
  • <span style="color:#00d4ff;">experience</span>  : AI Engineering Internship at Cenlub Systems
  • <span style="color:#00d4ff;">skills</span>      : Technical competencies, languages & infrastructure
  • <span style="color:#00d4ff;">leetcode</span>    : Live competitive programming metrics (581+ solved)
  • <span style="color:#00d4ff;">education</span>   : Graphic Era University & campus leadership
  • <span style="color:#00d4ff;">contact</span>     : Direct email, LinkedIn & GitHub channels
  • <span style="color:#00d4ff;">sudo hire</span>   : Grant full engineering clearance & fast-track
  • <span style="color:#00d4ff;">clear</span>       : Clean the console buffer`,

      projects: `<span style="color:#00d4ff; font-weight:700;">TOP 5 ENGINEERING PROJECTS:</span>
1. <strong style="color:#f59e0b;">BarrierLens</strong> [Google Gemma / Vision AI / FastAPI]
   Multimodal accessibility barrier detection & compliance tool for public infrastructure.
2. <strong style="color:#10b981;">Fitness_Smarty</strong> [YOLOv8 / Gemini 1.5 Flash / Python]
   Real-time meal segmentation & instant nutritional analysis hybrid pipeline.
3. <strong style="color:#6366f1;">Quorum</strong> [FastAPI / RabbitMQ / ChromaDB / Redis / SSE]
   Distributed document intelligence & agentic RAG with asynchronous workers.
4. <strong style="color:#f97316;">Darkstori</strong> [XGBoost / FastAPI / PostgreSQL / Redis]
   Geospatial demand forecasting and store location viability ranking engine.
5. <strong style="color:#0ea5e9;">Mini-AWS</strong> [Java / Spring Boot / Docker API / IAM / CI/CD]
   Self-hosted cloud engine with isolated containerized Lambda execution.`,

      barrierlens: `<span style="color:#f59e0b; font-weight:700;">BarrierLens // Multimodal Accessibility AI</span>
• Stack: Google Gemma, Vision API, FastAPI, Structured JSON
• Purpose: Evaluates field photos of public infrastructure (ramps, tactile paving, curb cuts).
• Output: Generates structured compliance diagnostics with risk severity (1-10) and remediation specifications for municipal engineers.`,

      fitness: `<span style="color:#10b981; font-weight:700;">Fitness_Smarty // Hybrid AI Nutrition Assistant</span>
• Stack: YOLOv8 (Ultralytics), Gemini 1.5 Flash, Streamlit, Python
• Architecture: YOLOv8 segments foods in real time → passes bounding boxes to Gemini Flash for reasoning, calories & macro breakdown (protein/carbs/fat).`,

      quorum: `<span style="color:#6366f1; font-weight:700;">Quorum // Distributed Document Intelligence</span>
• Stack: FastAPI, RabbitMQ, ChromaDB, Redis, Next.js, SSE
• Architecture: Decouples heavy OCR into background RabbitMQ consumer workers.
• Safety: Auditor agent validates extractions before DB write. Streams tokens in real time via SSE.`,

      darkstori: `<span style="color:#f97316; font-weight:700;">Darkstori // Geospatial Demand Forecasting</span>
• Stack: Python, FastAPI, XGBoost, PostgreSQL, Redis, Streamlit
• Accuracy: 85%+ on holdout test set using competitor density radius and temporal lag features.`,

      miniaws: `<span style="color:#0ea5e9; font-weight:700;">Mini-AWS // Self-Hosted Cloud Platform</span>
• Stack: Java, Spring Boot, Docker Engine API, S3, IAM, GitHub Actions
• Innovation: Real containerized Lambda execution in isolated Docker containers triggered by S3 events with zero cloud cost.`,

      experience: `<span style="color:#00d4ff; font-weight:700;">CENLUB SYSTEMS — AI ENGINEERING INTERN (May 2026 – Jul 2026)</span>
• Built a multi-agent Python LLM pipeline automating conversion of 50+ monthly RFQ PDFs into Annexure-I sheets.
• <strong style="color:#34d399;">70% reduction in manual specification processing time</strong>.
• Built a self-correcting auditor agent that validates fields against engineering specs, cutting manual check effort by 40%.`,

      skills: `<span style="color:#00d4ff; font-weight:700;">TECHNICAL ARSENAL:</span>
• <strong style="color:#38bdf8;">Languages</strong>: Java, Python, C++, C, JavaScript, TypeScript, SQL, HTML/CSS
• <strong style="color:#a855f7;">AI & LLMs</strong>: Multi-Agent Systems, RAG, ChromaDB Vector DB, Semantic Search, YOLOv8, Gemini API
• <strong style="color:#0ea5e9;">Backend & Cloud</strong>: Spring Boot, FastAPI, RabbitMQ, Docker Engine API, Microservices, SSE
• <strong style="color:#10b981;">Databases</strong>: PostgreSQL, Redis (Caching + Queues), MongoDB, ChromaDB`,

      leetcode: `<span style="color:#ffa116; font-weight:700;">LEETCODE METRICS (@Aaditya_Cheeks):</span>
• Solved: <strong style="color:#34d399;">581+ Total</strong> (209 Easy, 307 Medium, 65 Hard)
• Current Streak: <strong style="color:#ffa116;">84 Days Active 🔥</strong> (324 Total Active Days)
• Global Ranking: 159,727 | Goldman Sachs Hackathon: <strong style="color:#38bdf8;">Top 19% nationwide</strong> (15,593 participants)`,

      education: `<span style="color:#00d4ff; font-weight:700;">ACADEMIC BACKGROUND & LEADERSHIP:</span>
• <strong style="color:#34d399;">Graphic Era Deemed to be University</strong>, Dehradun, India
• Degree: Bachelor of Technology in Computer Science Engineering (B.Tech CSE, 2024–2028)
• <strong style="color:#4285f4;">Google Developer Groups (GDG) Lead</strong>, Graphic Era Campus
• <strong style="color:#ff9900;">AWS Student Builder Group (SBG)</strong>, Core Team Associate
• <strong style="color:#10b981;">GSSoC 2026 Contributor</strong> (2,100+ points)`,

      contact: `<span style="color:#00d4ff; font-weight:700;">COMMUNICATION CHANNELS:</span>
• Email    : <a href="mailto:aaditya.uniyal22@gmail.com" style="color:#34d399;">aaditya.uniyal22@gmail.com</a>
• Phone    : +91 7217347790
• LinkedIn : <a href="https://www.linkedin.com/in/aaditya-uniyal-48ab7b342/" target="_blank" style="color:#00d4ff;">in/aaditya-uniyal</a>
• GitHub   : <a href="https://github.com/AadityaUniyal" target="_blank" style="color:#00d4ff;">github.com/AadityaUniyal</a>
• LeetCode : <a href="https://leetcode.com/u/Aaditya_Cheeks/" target="_blank" style="color:#ffa116;">leetcode.com/u/Aaditya_Cheeks</a>`,

      'sudo hire': `<span style="color:#ffa116;">[SYSTEM AUTHORIZATION GRANTED]</span>
Aaditya Uniyal has been added to your shortlisted top engineering candidates!
Email notification dispatched to: <span style="color:#34d399;">aaditya.uniyal22@gmail.com</span>.`
    };

    function appendOutput(content, isCommand = false) {
      const line = document.createElement('div');
      line.className = 'terminal-output-line';
      if (isCommand) {
        line.innerHTML = `<span style="color:#34d399; font-weight:700;">aaditya@uniyal-system:~$</span> ${content}`;
      } else {
        line.innerHTML = content;
      }
      terminalBody.appendChild(line);
      terminalBody.scrollTop = terminalBody.scrollHeight;
    }

    function handleCommand(cmdRaw) {
      const cmd = cmdRaw.trim().toLowerCase();
      if (!cmd) return;

      appendOutput(cmdRaw, true);

      if (cmd === 'clear') {
        terminalBody.innerHTML = '';
        return;
      }

      if (COMMANDS[cmd]) {
        appendOutput(COMMANDS[cmd]);
        if (window.AudioEngine) {
          if (cmd === 'sudo hire') window.AudioEngine.playSuccess();
          else window.AudioEngine.playChime();
        }
      } else {
        appendOutput(`<span style="color: #ef4444;">Command not recognized: "${cmdRaw}". Type <span style="color:#00d4ff;">'help'</span> for list of commands.</span>`);
        if (window.AudioEngine) window.AudioEngine.playClick();
      }
    }

    terminalInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        const val = terminalInput.value;
        terminalInput.value = '';
        handleCommand(val);
      }
    });

    document.querySelectorAll('.term-quick-btn').forEach((btn) => {
      btn.addEventListener('click', () => {
        const cmd = btn.getAttribute('data-cmd');
        if (cmd) {
          handleCommand(cmd);
          terminalInput.focus();
        }
      });
    });
  });
})();
