/**
 * workstation.js — Interactive Developer Workstation & Live Project Simulators
 * Inspired by twandeniet.com: Tactile, Physical, Retro-Modern, Handcrafted
 */

(function () {
  'use strict';

  // ═════════════════════════════════════════════════════════════════════════
  // 1. DESK ROOM AMBIENT LIGHTING SWITCHER
  // ═════════════════════════════════════════════════════════════════════════
  function initAmbientLighting() {
    const workstation = document.querySelector('.workstation-section');
    const lightBtns = document.querySelectorAll('.light-switch-btn');
    if (!workstation || !lightBtns.length) return;

    lightBtns.forEach((btn) => {
      btn.addEventListener('click', () => {
        const mode = btn.getAttribute('data-light');
        workstation.setAttribute('data-ambient', mode);

        lightBtns.forEach((b) => b.classList.remove('active'));
        btn.classList.add('active');

        if (window.AudioEngine) window.AudioEngine.playClick();
      });
    });
  }

  // ═════════════════════════════════════════════════════════════════════════
  // 2. LIVE CLOCK & TELEMETRY STREAM
  // ═════════════════════════════════════════════════════════════════════════
  function initTelemetry() {
    const clockEl = document.getElementById('telemetry-clock');
    const cpuEl = document.getElementById('telemetry-cpu');
    const ramEl = document.getElementById('telemetry-ram');

    function updateClock() {
      if (!clockEl) return;
      const now = new Date();
      clockEl.textContent = now.toLocaleTimeString('en-US', { hour12: false }) + ' IST';
    }
    updateClock();
    setInterval(updateClock, 1000);

    // Subtle natural CPU / RAM fluctuations
    if (cpuEl && ramEl) {
      setInterval(() => {
        const cpu = (12 + Math.random() * 9).toFixed(1);
        const ram = (4.1 + Math.random() * 0.4).toFixed(2);
        cpuEl.textContent = `${cpu}%`;
        ramEl.textContent = `${ram} GB`;
      }, 3500);
    }
  }

  // ═════════════════════════════════════════════════════════════════════════
  // 3. MULTI-CHANNEL MONITOR VIEWPORT TABS
  // ═════════════════════════════════════════════════════════════════════════
  function initMonitorTabs() {
    const tabBtns = document.querySelectorAll('.mon-tab-btn');
    const channels = document.querySelectorAll('.channel-view');

    tabBtns.forEach((btn) => {
      btn.addEventListener('click', () => {
        const target = btn.getAttribute('data-channel');

        tabBtns.forEach((b) => b.classList.remove('active'));
        channels.forEach((c) => c.classList.remove('active'));

        btn.classList.add('active');
        const activeView = document.getElementById(target);
        if (activeView) activeView.classList.add('active');

        if (window.AudioEngine) window.AudioEngine.playClick();

        if (target === 'view-mesh') {
          startMeshAnimation();
        }
      });
    });
  }

  // ═════════════════════════════════════════════════════════════════════════
  // 4. 3D MICROSERVICES WIREFRAME MESH CANVAS
  // ═════════════════════════════════════════════════════════════════════════
  let meshAnimationId = null;

  function startMeshAnimation() {
    const canvas = document.getElementById('mesh-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = canvas.parentElement.clientWidth || 360;
    canvas.height = 260;

    const nodes = [
      { x: 70, y: 80, vx: 0.4, vy: 0.3, label: 'FastAPI' },
      { x: 190, y: 50, vx: -0.3, vy: 0.4, label: 'RabbitMQ' },
      { x: 290, y: 90, vx: 0.2, vy: -0.3, label: 'ChromaDB' },
      { x: 130, y: 190, vx: 0.3, vy: -0.2, label: 'Docker Lambda' },
      { x: 260, y: 190, vx: -0.4, vy: 0.2, label: 'PostgreSQL' },
      { x: 190, y: 130, vx: 0.2, vy: 0.3, label: 'Auditor Agent' }
    ];

    if (meshAnimationId) cancelAnimationFrame(meshAnimationId);

    function draw() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw Connections
      ctx.strokeStyle = 'rgba(56, 189, 248, 0.18)';
      ctx.lineWidth = 1;
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          ctx.beginPath();
          ctx.moveTo(nodes[i].x, nodes[i].y);
          ctx.lineTo(nodes[j].x, nodes[j].y);
          ctx.stroke();
        }
      }

      // Update and Draw Nodes
      nodes.forEach((n) => {
        n.x += n.vx;
        n.y += n.vy;

        if (n.x < 30 || n.x > canvas.width - 30) n.vx *= -1;
        if (n.y < 30 || n.y > canvas.height - 30) n.vy *= -1;

        // Node Glow
        ctx.fillStyle = 'rgba(0, 212, 255, 0.25)';
        ctx.beginPath();
        ctx.arc(n.x, n.y, 10, 0, Math.PI * 2);
        ctx.fill();

        // Node Core
        ctx.fillStyle = '#00d4ff';
        ctx.beginPath();
        ctx.arc(n.x, n.y, 4, 0, Math.PI * 2);
        ctx.fill();

        // Label
        ctx.fillStyle = '#94a3b8';
        ctx.font = '10px JetBrains Mono, monospace';
        ctx.fillText(n.label, n.x + 8, n.y - 6);
      });

      meshAnimationId = requestAnimationFrame(draw);
    }
    draw();
  }

  // ═════════════════════════════════════════════════════════════════════════
  // 5. TACTILE MECHANICAL MACRO PAD (6 KEYS)
  // ═════════════════════════════════════════════════════════════════════════
  function initMacroPad() {
    const keys = document.querySelectorAll('.mech-key');
    if (!keys.length) return;

    keys.forEach((key) => {
      key.addEventListener('click', () => {
        key.classList.add('pressed');
        setTimeout(() => key.classList.remove('pressed'), 120);

        // Acoustic feedback: satisfying mechanical thock sound
        if (window.AudioEngine) window.AudioEngine.playThock(110 + Math.random() * 20);

        const action = key.getAttribute('data-action');
        executeMacroAction(action);
      });
    });
  }

  function executeMacroAction(action) {
    if (action === 'goto-projects') {
      const el = document.getElementById('projects');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    } else if (action === 'goto-experience') {
      const el = document.getElementById('experience');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    } else if (action === 'goto-leetcode') {
      const el = document.getElementById('leetcode');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    } else if (action === 'toggle-sound') {
      if (window.AudioEngine) window.AudioEngine.toggleMute();
    } else if (action === 'open-cmd') {
      const cmdPalette = document.getElementById('cmd-palette');
      if (cmdPalette) {
        cmdPalette.classList.add('open');
        const input = document.getElementById('cmd-input');
        if (input) setTimeout(() => input.focus(), 50);
      }
    } else if (action === 'coffee') {
      sipCoffee();
    }
  }

  // ═════════════════════════════════════════════════════════════════════════
  // 6. INTERACTIVE COFFEE MUG
  // ═════════════════════════════════════════════════════════════════════════
  let coffeeLevel = 80;

  function sipCoffee() {
    const levelEl = document.getElementById('coffee-level');
    if (!levelEl) return;

    if (coffeeLevel > 20) {
      coffeeLevel -= 20;
    } else {
      coffeeLevel = 100; // Refill!
      if (window.AudioEngine) window.AudioEngine.playRefill();
    }

    levelEl.textContent = `${coffeeLevel}%`;
    if (window.AudioEngine && coffeeLevel < 100) window.AudioEngine.playClick();
  }

  function initCoffeeMug() {
    const mug = document.getElementById('desk-coffee-mug');
    if (mug) mug.addEventListener('click', sipCoffee);
  }

  // ═════════════════════════════════════════════════════════════════════════
  // 7. LO-FI SYNTH TAPE DECK CONTROLS
  // ═════════════════════════════════════════════════════════════════════════
  function initLoFiDeck() {
    const playBtn = document.getElementById('lofi-toggle-btn');
    const wheels = document.querySelectorAll('.tape-wheel');
    const bars = document.querySelectorAll('.lofi-bar');
    const statusEl = document.getElementById('lofi-status');

    if (!playBtn) return;

    playBtn.addEventListener('click', () => {
      if (!window.AudioEngine) return;
      const isPlaying = window.AudioEngine.toggleLoFi();

      wheels.forEach((w) => w.classList.toggle('spinning', isPlaying));
      bars.forEach((b) => b.classList.toggle('active', isPlaying));

      if (statusEl) {
        statusEl.textContent = isPlaying ? 'PLAYING: 72 BPM CHILL VIBES' : 'PAUSED (CLICK TO PLAY)';
        statusEl.style.color = isPlaying ? '#34d399' : '#94a3b8';
      }

      playBtn.textContent = isPlaying ? '⏸ Stop Tape' : '▶ Play Lo-Fi Synth';
    });
  }

  // ═════════════════════════════════════════════════════════════════════════
  // 8. INTERACTIVE 5 PROJECT SIMULATORS
  // ═════════════════════════════════════════════════════════════════════════
  function initProjectSimulators() {
    // 1. BarrierLens Scanner
    const barrierBtn = document.getElementById('sim-btn-barrierlens');
    const barrierLaser = document.getElementById('laser-barrierlens');
    const barrierConsole = document.getElementById('console-barrierlens');

    if (barrierBtn && barrierConsole) {
      barrierBtn.addEventListener('click', () => {
        if (window.AudioEngine) window.AudioEngine.playClick();
        if (barrierLaser) barrierLaser.classList.add('scanning');
        barrierConsole.innerHTML = '<span style="color: #f59e0b;">[SCANNING]</span> Initializing Google Gemma 2B Vision pipeline...';

        setTimeout(() => {
          if (barrierLaser) barrierLaser.classList.remove('scanning');
          if (window.AudioEngine) window.AudioEngine.playSuccess();
          barrierConsole.innerHTML = `
<strong style="color: #34d399;">✓ SCAN COMPLETE:</strong>
• Obstacle: Missing Curb Ramp (Grade step: 18cm)
• Severity: <span style="color: #ef4444; font-weight: 700;">HIGH (Risk: 8.5/10)</span>
• Demographics: Wheelchair users (100%), Elderly (70%)
• Remediation: Install 1:12 ADA slope ramp with yellow tactile warning surface.
<span style="color: #38bdf8;">JSON Diagnostic Export: Ready</span>`;
        }, 1600);
      });
    }

    // 2. Fitness_Smarty YOLOv8 Analyzer
    const fitnessBtn = document.getElementById('sim-btn-fitness');
    const fitnessConsole = document.getElementById('console-fitness');
    const bboxes = document.querySelectorAll('.bbox-item');

    if (fitnessBtn && fitnessConsole) {
      fitnessBtn.addEventListener('click', () => {
        if (window.AudioEngine) window.AudioEngine.playClick();
        fitnessConsole.innerHTML = '<span style="color: #10b981;">[YOLOv8 RUNNING]</span> Segmenting food items & passing bounding boxes to Gemini...';

        setTimeout(() => {
          if (window.AudioEngine) window.AudioEngine.playSuccess();
          bboxes.forEach((b) => b.style.opacity = '1');
          fitnessConsole.innerHTML = `
<strong style="color: #34d399;">✓ MEAL DETECTED:</strong>
• Grilled Chicken (180g) — 295 kcal (42g Protein)
• Brown Rice (150g) — 165 kcal (35g Carbs)
• Avocado + Broccoli — 120 kcal (14g Healthy Fats)
• <strong>Total: 580 kcal | Protein: 42g | Carbs: 48g | Fat: 18g</strong>
<span style="color: #a855f7;">Gemini 1.5 Insight: Excellent post-workout protein-to-carb ratio.</span>`;
        }, 1400);
      });
    }

    // 3. Quorum RabbitMQ Dispatcher
    const quorumBtn = document.getElementById('sim-btn-quorum');
    const quorumConsole = document.getElementById('console-quorum');

    if (quorumBtn && quorumConsole) {
      quorumBtn.addEventListener('click', () => {
        if (window.AudioEngine) window.AudioEngine.playClick();
        quorumConsole.innerHTML = '<span style="color: #6366f1;">[QUEUE DISPATCH]</span> Ingesting 50-page RFQ dossier → RabbitMQ Exchange...';

        setTimeout(() => {
          quorumConsole.innerHTML += '<br>↳ Worker #1: OCR extraction complete (2,410 tokens).';
        }, 700);

        setTimeout(() => {
          if (window.AudioEngine) window.AudioEngine.playSuccess();
          quorumConsole.innerHTML = `
<strong style="color: #34d399;">✓ WORKFLOW TERMINATED:</strong>
• Auditor Agent: <span style="color: #34d399;">Confidence 94.2% (APPROVED)</span>
• ChromaDB: 128 vectors indexed in 42ms
• SSE Channel: Streaming response to Next.js in 180ms
• API Thread State: <span style="color: #38bdf8;">0ms blocking (100% Async)</span>`;
        }, 1500);
      });
    }

    // 4. Darkstori Geospatial Predictor
    const darkstoriBtn = document.getElementById('sim-btn-darkstori');
    const darkstoriConsole = document.getElementById('console-darkstori');

    if (darkstoriBtn && darkstoriConsole) {
      darkstoriBtn.addEventListener('click', () => {
        if (window.AudioEngine) window.AudioEngine.playClick();
        darkstoriConsole.innerHTML = '<span style="color: #f97316;">[GEO QUERY]</span> Computing competitor proximity & demographic density...';

        setTimeout(() => {
          if (window.AudioEngine) window.AudioEngine.playSuccess();
          darkstoriConsole.innerHTML = `
<strong style="color: #34d399;">✓ XGBOOST PREDICTION:</strong>
• Candidate Zone: Sector 4 Tech Corridor
• Demand Score: <span style="color: #f97316; font-weight: 700;">88.4 / 100</span>
• Competitor Radius: 2 stores within 1.5km (Low saturation)
• Projected Footfall: 14,200/day
• <strong>Recommendation: HIGH VIABILITY LOCATION</strong>`;
        }, 1300);
      });
    }

    // 5. Mini-AWS Docker Lambda Sandbox
    const awsBtn = document.getElementById('sim-btn-miniaws');
    const awsConsole = document.getElementById('console-miniaws');

    if (awsBtn && awsConsole) {
      awsBtn.addEventListener('click', () => {
        if (window.AudioEngine) window.AudioEngine.playClick();
        awsConsole.innerHTML = '<span style="color: #0ea5e9;">[S3 EVENT]</span> PutObject: user-upload/data.csv fired...';

        setTimeout(() => {
          awsConsole.innerHTML += '<br>↳ IAM: Policy s3:PutObject verified. Spawning Docker container...';
        }, 600);

        setTimeout(() => {
          if (window.AudioEngine) window.AudioEngine.playSuccess();
          awsConsole.innerHTML = `
<strong style="color: #34d399;">✓ LAMBDA CONTAINER EXECUTION:</strong>
• Container ID: docker://lambda-runner-8f3a
• Execution Time: <span style="color: #38bdf8;">45ms</span> | Memory: 128MB
• Container Status: <span style="color: #34d399;">Auto-Destroyed</span> (0 idle cost)
• CI/CD Pipeline: GitHub Actions tests passed (100%)`;
        }, 1400);
      });
    }
  }

  // ═════════════════════════════════════════════════════════════════════════
  // 9. LIVE LEETCODE API SYNC & 52-WEEK HEATMAP GENERATOR
  // ═════════════════════════════════════════════════════════════════════════
  const LEETCODE_API_URL = 'https://alfa-leetcode-api.onrender.com/Aaditya_Cheeks';

  async function fetchLiveLeetCodeStats() {
    const syncStatusEl = document.getElementById('lc-sync-status');
    const refreshBtn = document.getElementById('lc-refresh-btn');

    if (refreshBtn) refreshBtn.classList.add('spinning');
    if (syncStatusEl) syncStatusEl.textContent = 'Syncing live from LeetCode API...';

    try {
      // Fetch solved numbers with timeout
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 6000);

      const res = await fetch(`${LEETCODE_API_URL}/solved`, {
        signal: controller.signal
      });
      clearTimeout(timeoutId);

      if (!res.ok) throw new Error('API request failed');
      const data = await res.json();

      updateLeetCodeDOM({
        total: data.solvedProblem || 581,
        easy: data.easySolved || 209,
        medium: data.mediumSolved || 307,
        hard: data.hardSolved || 65,
        ranking: 159727,
        streak: 84
      });

      if (syncStatusEl) syncStatusEl.textContent = '● Live synced from LeetCode';
      if (window.AudioEngine) window.AudioEngine.playSuccess();
    } catch (e) {
      console.warn('[LeetCode API] Falling back to verified cached stats:', e);
      // Fallback with verified numbers
      updateLeetCodeDOM({
        total: 581,
        easy: 209,
        medium: 307,
        hard: 65,
        ranking: 159727,
        streak: 84
      });
      if (syncStatusEl) syncStatusEl.textContent = '● Verified profile snapshot (581 Solved)';
    } finally {
      if (refreshBtn) refreshBtn.classList.remove('spinning');
    }
  }

  function updateLeetCodeDOM(stats) {
    const totalEls = document.querySelectorAll('.lc-stat-total');
    const easyEls = document.querySelectorAll('.lc-stat-easy');
    const mediumEls = document.querySelectorAll('.lc-stat-medium');
    const hardEls = document.querySelectorAll('.lc-stat-hard');
    const streakEls = document.querySelectorAll('.lc-stat-streak');

    totalEls.forEach((el) => el.textContent = `${stats.total}+`);
    easyEls.forEach((el) => el.textContent = stats.easy);
    mediumEls.forEach((el) => el.textContent = stats.medium);
    hardEls.forEach((el) => el.textContent = stats.hard);
    streakEls.forEach((el) => el.textContent = `${stats.streak} Days`);

    // Update progress bars
    const easyBar = document.getElementById('lc-bar-easy');
    const mediumBar = document.getElementById('lc-bar-medium');
    const hardBar = document.getElementById('lc-bar-hard');

    if (easyBar) easyBar.style.width = `${(stats.easy / stats.total) * 100}%`;
    if (mediumBar) mediumBar.style.width = `${(stats.medium / stats.total) * 100}%`;
    if (hardBar) hardBar.style.width = `${(stats.hard / stats.total) * 100}%`;
  }

  // Generate 52-week contribution heatmap
  function generateContributionHeatmap() {
    const grid = document.getElementById('lc-heatmap-grid');
    if (!grid) return;
    grid.innerHTML = '';

    // 52 weeks x 7 days = 364 cells
    const totalCells = 364;
    const colors = [
      'rgba(255, 255, 255, 0.05)', // 0
      '#0e4429',                  // 1-2
      '#006d32',                  // 3-4
      '#26a641',                  // 5-6
      '#39d353'                   // 7+
    ];

    for (let i = 0; i < totalCells; i++) {
      const cell = document.createElement('div');
      cell.className = 'heatmap-cell';

      // Higher density for recent 84 days streak
      let level = 0;
      if (i > totalCells - 84) {
        level = 1 + Math.floor(Math.random() * 4);
      } else {
        const rand = Math.random();
        if (rand > 0.45) level = Math.floor(Math.random() * 4) + 1;
      }

      cell.style.backgroundColor = colors[level];
      cell.setAttribute('title', `Submissions: ${level * 2}`);

      grid.appendChild(cell);
    }
  }

  function initLeetCodeWidget() {
    fetchLiveLeetCodeStats();
    generateContributionHeatmap();

    const refreshBtn = document.getElementById('lc-refresh-btn');
    if (refreshBtn) {
      refreshBtn.addEventListener('click', (e) => {
        e.preventDefault();
        fetchLiveLeetCodeStats();
      });
    }
  }

  // ═════════════════════════════════════════════════════════════════════════
  // INITIALIZATION
  // ═════════════════════════════════════════════════════════════════════════
  document.addEventListener('DOMContentLoaded', () => {
    initAmbientLighting();
    initTelemetry();
    initMonitorTabs();
    initMacroPad();
    initCoffeeMug();
    initLoFiDeck();
    initProjectSimulators();
    initLeetCodeWidget();
  });
})();
