/**
 * main.js — Core orchestration for Aaditya Uniyal's Portfolio
 * Pure vanilla JS, IIFE pattern for file:// and offline compatibility.
 */
(function () {
  'use strict';

  // ═════════════════════════════════════════════════════════════════════════
  // 1. TYPEWRITER EFFECT
  // ═════════════════════════════════════════════════════════════════════════
  function initTypewriter() {
    const el = document.getElementById('dynamic-role');
    if (!el) return;

    const roles = [
      'AI-assisted products',
      'Backend systems',
      'Cloud infrastructure',
      'Applied machine learning'
    ];

    let roleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let delay = 100;

    function tick() {
      const current = roles[roleIndex];
      if (isDeleting) {
        el.textContent = current.substring(0, charIndex - 1);
        charIndex--;
        delay = 45;
      } else {
        el.textContent = current.substring(0, charIndex + 1);
        charIndex++;
        delay = 100;
      }

      if (!isDeleting && charIndex === current.length) {
        delay = 2400; // Pause on complete word
        isDeleting = true;
      } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        roleIndex = (roleIndex + 1) % roles.length;
        delay = 400;
      }

      setTimeout(tick, delay);
    }
    tick();
  }

  // ═════════════════════════════════════════════════════════════════════════
  // 2. 3D MAGNETIC TILT EFFECT ON CARDS
  // ═════════════════════════════════════════════════════════════════════════
  function init3DTilt() {
    const isTouch = window.matchMedia('(pointer: coarse)').matches;
    if (isTouch) return;

    const cards = document.querySelectorAll('.project-card, .portrait-frame, .desk-rig-frame');
    cards.forEach((card) => {
      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;

        const rotateX = -(y / (rect.height / 2)) * 5;
        const rotateY = (x / (rect.width / 2)) * 5;

        card.style.transform = `perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) translateY(-4px)`;
      });

      card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0)';
      });
    });
  }

  // ═════════════════════════════════════════════════════════════════════════
  // 3. PROJECT FILTERING
  // ═════════════════════════════════════════════════════════════════════════
  function initProjectFilters() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const cards = document.querySelectorAll('.project-card');
    if (!filterBtns.length || !cards.length) return;

    filterBtns.forEach((btn) => {
      btn.addEventListener('click', () => {
        filterBtns.forEach((b) => b.classList.remove('active'));
        btn.classList.add('active');

        const category = btn.getAttribute('data-filter');

        cards.forEach((card) => {
          const cardCat = card.getAttribute('data-category') || '';
          if (category === 'all' || cardCat.includes(category)) {
            card.style.display = 'flex';
          } else {
            card.style.display = 'none';
          }
        });

        if (window.AudioEngine) window.AudioEngine.playClick();
      });
    });
  }

  // ═════════════════════════════════════════════════════════════════════════
  // 4. PROJECT ARCHITECTURE DEEP-DIVE MODAL
  // ═════════════════════════════════════════════════════════════════════════
  function initProjectModal() {
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

    if (!modalBackdrop) return;

    function openModal(projectId) {
      if (!window.PORTFOLIO_DATA || !window.PORTFOLIO_DATA.projects) return;
      const project = window.PORTFOLIO_DATA.projects.find((p) => p.id === projectId);
      if (!project) return;

      modalTitle.textContent = project.title;
      modalSubtitle.textContent = project.tagline;
      modalProblem.textContent = project.problem;
      modalSolution.textContent = project.solution;
      modalArch.textContent = project.architecture;

      modalHighlights.innerHTML = '';
      if (project.description) {
        const li1 = document.createElement('li');
        li1.className = 'exp-bullet-item';
        li1.innerHTML = `<strong>Engineering Impact:</strong> ${project.impact}`;
        modalHighlights.appendChild(li1);

        const li2 = document.createElement('li');
        li2.className = 'exp-bullet-item';
        li2.innerHTML = `<strong>Core Stack:</strong> ${project.tech.join(' • ')}`;
        modalHighlights.appendChild(li2);
      }

      modalGithubLink.href = project.github || 'https://github.com/AadityaUniyal';
      if (project.demo) {
        modalDemoLink.style.display = 'inline-flex';
        modalDemoLink.href = project.demo;
      } else {
        modalDemoLink.style.display = 'none';
      }

      modalBackdrop.classList.add('open');
      if (window.AudioEngine) window.AudioEngine.playChime();
    }

    function closeModal() {
      modalBackdrop.classList.remove('open');
      if (window.AudioEngine) window.AudioEngine.playClick();
    }

    document.querySelectorAll('.project-inspect-btn').forEach((btn) => {
      btn.addEventListener('click', () => {
        const id = btn.getAttribute('data-project');
        openModal(id);
      });
    });

    if (modalCloseBtn) modalCloseBtn.addEventListener('click', closeModal);
    modalBackdrop.addEventListener('click', (e) => {
      if (e.target === modalBackdrop) closeModal();
    });

    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') closeModal();
    });

    window.openProjectModalById = openModal;
  }

  // ═════════════════════════════════════════════════════════════════════════
  // 5. COMMAND PALETTE (CTRL + K / CMD + K)
  // ═════════════════════════════════════════════════════════════════════════
  function initCommandPalette() {
    const cmdPalette = document.getElementById('cmd-palette');
    const cmdTrigger = document.getElementById('cmd-trigger');
    const cmdInput = document.getElementById('cmd-input');
    const cmdItems = document.querySelectorAll('.cmd-item');

    if (!cmdPalette) return;

    function openPalette() {
      cmdPalette.classList.add('open');
      if (cmdInput) {
        cmdInput.value = '';
        setTimeout(() => cmdInput.focus(), 60);
      }
      if (window.AudioEngine) window.AudioEngine.playChime();
    }

    function closePalette() {
      cmdPalette.classList.remove('open');
      if (window.AudioEngine) window.AudioEngine.playClick();
    }

    if (cmdTrigger) cmdTrigger.addEventListener('click', openPalette);

    window.addEventListener('keydown', (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        if (cmdPalette.classList.contains('open')) closePalette();
        else openPalette();
      }
      if (e.key === 'Escape' && cmdPalette.classList.contains('open')) {
        closePalette();
      }
    });

    cmdPalette.addEventListener('click', (e) => {
      if (e.target === cmdPalette) closePalette();
    });

    if (cmdInput) {
      cmdInput.addEventListener('input', () => {
        const query = cmdInput.value.toLowerCase().trim();
        cmdItems.forEach((item) => {
          const match = item.textContent.toLowerCase().includes(query);
          item.style.display = match ? 'flex' : 'none';
        });
      });
    }

    cmdItems.forEach((item) => {
      item.addEventListener('click', () => {
        const action = item.getAttribute('data-action');
        closePalette();
        handlePaletteAction(action);
      });
    });

    function handlePaletteAction(action) {
      if (!action) return;
      if (action.startsWith('#')) {
        const el = document.querySelector(action);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      } else if (action.startsWith('project-')) {
        const pId = action.replace('project-', '');
        if (window.openProjectModalById) window.openProjectModalById(pId);
      } else if (action === 'copy-email') {
        copyEmail();
      } else if (action === 'toggle-lofi') {
        if (window.AudioEngine) window.AudioEngine.toggleLoFi();
      } else if (action === 'github') {
        window.open('https://github.com/AadityaUniyal', '_blank');
      } else if (action === 'linkedin') {
        window.open('https://www.linkedin.com/in/aaditya-uniyal-48ab7b342/', '_blank');
      } else if (action === 'leetcode') {
        window.open('https://leetcode.com/u/Aaditya_Cheeks/', '_blank');
      }
    }
  }

  // ═════════════════════════════════════════════════════════════════════════
  // 6. 1-CLICK EMAIL CLIPBOARD COPY
  // ═════════════════════════════════════════════════════════════════════════
  function copyEmail() {
    const email = 'aaditya.uniyal22@gmail.com';
    const toast = document.getElementById('toast-notice');

    navigator.clipboard.writeText(email).then(() => {
      if (toast) {
        toast.textContent = `✓ Copied: ${email}`;
        toast.classList.add('show');
        if (window.AudioEngine) window.AudioEngine.playSuccess();
        setTimeout(() => toast.classList.remove('show'), 3500);
      }
    }).catch(() => {
      prompt('Copy email:', email);
    });
  }

  function initEmailCopy() {
    const btn = document.getElementById('copy-email-btn');
    if (btn) btn.addEventListener('click', copyEmail);
  }

  // ═════════════════════════════════════════════════════════════════════════
  // 7. MOBILE MENU TOGGLE
  // ═════════════════════════════════════════════════════════════════════════
  function initMobileMenu() {
    const toggle = document.getElementById('mobile-toggle');
    const links = document.getElementById('nav-links');
    if (!toggle || !links) return;

    toggle.addEventListener('click', () => {
      links.classList.toggle('mobile-open');
      if (window.AudioEngine) window.AudioEngine.playClick();
    });

    links.querySelectorAll('.nav-link').forEach((l) => {
      l.addEventListener('click', () => links.classList.remove('mobile-open'));
    });
  }

  // ═════════════════════════════════════════════════════════════════════════
  // 8. LIVE LEETCODE PROFILE SNAPSHOT
  // ═════════════════════════════════════════════════════════════════════════
  function initLeetCodeStats() {
    const status = document.getElementById('lc-sync-status');
    const fields = {
      total: document.getElementById('lc-total'),
      easy: document.getElementById('lc-easy'),
      medium: document.getElementById('lc-medium'),
      hard: document.getElementById('lc-hard'),
      rank: document.getElementById('lc-rank')
    };
    if (!status || !fields.total) return;
    const endpoint = 'https://leetcode-api-pied.vercel.app/user/Aaditya_Cheeks';
    const format = (value) => Number(value).toLocaleString('en-IN');
    const animateNumber = (el, value) => {
      if (!Number.isFinite(value)) { el.textContent = '—'; return; }
      const start = performance.now();
      const duration = 850;
      function tick(now) {
        const progress = Math.min(1, (now - start) / duration);
        const eased = 1 - Math.pow(1 - progress, 4);
        el.textContent = format(Math.round(value * eased));
        if (progress < 1) requestAnimationFrame(tick);
      }
      requestAnimationFrame(tick);
    };
    const render = (payload) => {
      const accepted = payload && payload.submitStats && payload.submitStats.acSubmissionNum;
      if (!Array.isArray(accepted)) throw new Error('Unexpected stats response');
      const find = (label) => accepted.find((entry) => entry.difficulty === label)?.count;
      const values = { total: find('All'), easy: find('Easy'), medium: find('Medium'), hard: find('Hard'), rank: payload.profile?.ranking };
      if (![values.total, values.easy, values.medium, values.hard].every(Number.isFinite)) throw new Error('Missing solved counts');
      Object.entries(fields).forEach(([key, el]) => animateNumber(el, Number(values[key])));
      const denominator = Math.max(1, values.total);
      [['easy', values.easy], ['medium', values.medium], ['hard', values.hard]].forEach(([key, count]) => {
        const bar = document.getElementById(`lc-${key}-bar`);
        if (bar) bar.style.width = `${Math.max(0, Math.min(100, count / denominator * 100))}%`;
      });
      status.classList.add('is-live');
      status.innerHTML = '<span class="lc-sync-dot"></span>LIVE PROFILE · UPDATED JUST NOW';
    };
    const load = () => fetch(endpoint, { headers: { Accept: 'application/json' }, cache: 'no-cache' })
      .then((response) => { if (!response.ok) throw new Error('Stats request failed'); return response.json(); })
      .then(render)
      .catch(() => {
        status.classList.remove('is-live');
        status.innerHTML = '<span class="lc-sync-dot"></span>LIVE STATS UNAVAILABLE · OPEN PROFILE';
      });
    load();
    window.setInterval(load, 30 * 60 * 1000);
  }

  // ═════════════════════════════════════════════════════════════════════════
  // INITIALIZATION
  // ═════════════════════════════════════════════════════════════════════════
  function initIntro() {
    const intro = document.getElementById('intro-sequence');
    const skip = document.getElementById('intro-skip');
    if (!intro) return;

    let finished = false;
    const finish = () => {
      if (finished) return;
      finished = true;
      intro.classList.add('is-done');
      document.documentElement.classList.add('intro-finished');
      window.setTimeout(() => intro.remove(), 1050);
    };

    if (skip) skip.addEventListener('click', finish);
    window.addEventListener('keydown', (event) => {
      if (event.key === 'Escape' && !finished) finish();
    }, { once: true });
    window.setTimeout(finish, 3100);
  }

  document.addEventListener('DOMContentLoaded', () => {
    initIntro();
    initTypewriter();
    init3DTilt();
    initProjectFilters();
    initProjectModal();
    initCommandPalette();
    initEmailCopy();
    initMobileMenu();
    initLeetCodeStats();
  });
})();
