/* ==========================================================================
   AADITYA UNIYAL - INTERACTIVE DEVELOPER TERMINAL CONSOLE
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  const terminalBody = document.getElementById('terminal-body');
  const terminalInput = document.getElementById('terminal-input');
  if (!terminalBody || !terminalInput) return;

  const COMMANDS = {
    help: `Available commands:
  • <span class="cyan">projects</span>    : List top engineering projects with architecture briefs
  • <span class="cyan">experience</span>  : Overview of AI Engineering Internship at Cenlub Systems
  • <span class="cyan">skills</span>      : Technical arsenal, systems, databases, and AI tooling
  • <span class="cyan">leetcode</span>    : Competitive programming metrics (500+ solved)
  • <span class="cyan">education</span>   : University degree & developer leadership roles
  • <span class="cyan">contact</span>     : Direct email, LinkedIn, and GitHub links
  • <span class="cyan">sudo hire</span>   : Grant full engineering clearance
  • <span class="cyan">clear</span>       : Clean terminal buffer`,

    projects: `<span class="cyan">TOP 4 FEATURED PROJECTS:</span>
1. <strong class="emerald">Nexus</strong> [TypeScript / 3D GIS / LLaMA 3.3 + Gemini]
   Autonomous logistics & spatial intelligence platform with real-time 3D GIS & voice copilot.
2. <strong class="emerald">Quorum</strong> [FastAPI / RabbitMQ / ChromaDB / Redis / Next.js]
   Enterprise document intelligence & agentic RAG platform with async workers and SSE.
3. <strong class="emerald">Mini-AWS (MiniCloud)</strong> [Java / Spring Boot / Docker / CI/CD]
   Cloud-native platform with containerized Lambda execution, S3 events, and IAM isolation.
4. <strong class="emerald">LocalLens</strong> [JavaScript / Express / Vision AI / Smart City]
   Civic infrastructure engine: AI traffic management, blood donor matching & grievance resolution.`,

    experience: `<span class="cyan">AI ENGINEERING INTERN — CENLUB SYSTEMS (May 2026 – Jul 2026):</span>
▹ Engineered an agentic multi-agent LLM pipeline in Python automating conversion of 50+ RFQ PDFs into Annexure-I sheets.
▹ Achieved a <strong class="emerald">70% reduction in manual specification processing time</strong>.
▹ Built a self-correcting auditor agent that validates extracted RFQ fields against specs, reducing verification effort by 40%.`,

    skills: `<span class="cyan">TECHNICAL ARSENAL:</span>
▹ <strong class="emerald">Languages</strong>: Java, Python, C++, C, JavaScript, TypeScript, SQL, HTML/CSS
▹ <strong class="emerald">AI & LLMs</strong>: Multi-Agent Systems, RAG, ChromaDB Vector DB, Semantic Search, Prompt Eng.
▹ <strong class="emerald">Systems & Backend</strong>: Spring Boot, FastAPI, RabbitMQ, Docker, Microservices, REST APIs
▹ <strong class="emerald">Databases & Cache</strong>: PostgreSQL, Redis, MongoDB, ChromaDB
▹ <strong class="emerald">DevOps & Cloud</strong>: Docker, GitHub Actions, Maven, Linux`,

    leetcode: `<span class="cyan">LEETCODE & COMPETITIVE PROGRAMMING METRICS:</span>
▹ Handle: <a href="https://leetcode.com/u/Aaditya_Cheeks/" target="_blank" class="cyan">@Aaditya_Cheeks</a>
▹ Total Solved: <strong class="emerald">500+ Problems</strong> (Core focus on Graphs, DP, Trees & Concurrency)
▹ Goldman Sachs Hackathon 2026: <strong class="yellow">Top 19% nationwide</strong> out of 15,593 participants.`,

    education: `<span class="cyan">ACADEMIC BACKGROUND:</span>
▹ <strong class="emerald">Graphic Era Deemed to be University</strong>, Dehradun, India
▹ Degree: Bachelor of Technology in Computer Science Engineering (B.Tech CSE, 2024 - 2028)
▹ Leadership: <strong class="yellow">Google Developer Groups (GDG) Lead</strong>, Graphic Era Campus`,

    contact: `<span class="cyan">COMMUNICATION CHANNELS:</span>
▹ Email    : <a href="mailto:aaditya.uniyal22@gmail.com" class="emerald">aaditya.uniyal22@gmail.com</a>
▹ LinkedIn : <a href="https://www.linkedin.com/in/aaditya-uniyal-48ab7b342/" target="_blank" class="cyan">linkedin.com/in/aaditya-uniyal</a>
▹ GitHub   : <a href="https://github.com/AadityaUniyal" target="_blank" class="cyan">github.com/AadityaUniyal</a>
▹ Phone    : +91 7217347790`,

    'sudo hire': `<span class="yellow">[SYSTEM ALERT]</span> Authentication successful.
Aaditya Uniyal has been added to your shortlisted top engineering candidates!
Email dispatched to: <span class="emerald">aaditya.uniyal22@gmail.com</span>.`
  };

  function appendOutput(content, isCommand = false) {
    const line = document.createElement('div');
    line.className = 'terminal-output-line';
    if (isCommand) {
      line.innerHTML = `<span class="terminal-prompt-symbol">aaditya@portfolio:~$</span> ${content}`;
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
      if (window.soundEngine) {
        if (cmd === 'sudo hire') window.soundEngine.playSuccess();
        else window.soundEngine.playChime();
      }
    } else {
      appendOutput(`<span style="color: #ef4743;">Command not recognized: "${cmdRaw}". Type <span class="cyan">'help'</span> for supported commands.</span>`);
      if (window.soundEngine) window.soundEngine.playClick();
    }
  }

  terminalInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      const val = terminalInput.value;
      terminalInput.value = '';
      handleCommand(val);
    }
  });

  // Quick Action Buttons
  const quickButtons = document.querySelectorAll('.term-quick-btn');
  quickButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      const cmd = btn.getAttribute('data-cmd');
      if (cmd) {
        handleCommand(cmd);
        terminalInput.focus();
      }
    });
  });
});
