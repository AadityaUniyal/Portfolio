/* Story motion, theme switching, and links to full project chapters. */
(() => {
  const root = document.documentElement;
  const picker = document.getElementById('theme-select');
  const savedTheme = localStorage.getItem('portfolio-theme') || 'studio';
  root.dataset.theme = savedTheme;
  if (picker) {
    picker.value = savedTheme;
    picker.addEventListener('change', () => {
      root.dataset.theme = picker.value;
      localStorage.setItem('portfolio-theme', picker.value);
    });
  }

  // Treat each major chapter as a distinct visual world while the reader moves.
  const sceneSections = [...document.querySelectorAll('[data-scene]')];
  const sceneNames = {
    gdg: 'GDG LEADERSHIP', systems: 'HOW I BUILD', impact: 'BUILDING IMPACT',
    projects: 'PROJECT WORLDS', leetcode: 'LEETCODE / PRACTICE', skills: 'ENGINEERING TOOLKIT',
    community: 'COMMUNITY & EXPERIENCE', credentials: 'CREDENTIALS / LEARNING', contact: 'LET’S BUILD TOGETHER'
  };
  const sceneName = document.getElementById('world-hud-name');
  const sceneCount = document.getElementById('world-hud-count');
  const sceneLinks = [...document.querySelectorAll('.world-rail a')];
  const activateScene = (section) => {
    const index = sceneSections.indexOf(section);
    if (index < 0) return;
    root.dataset.scene = section.dataset.scene;
    section.classList.add('scene-entered');
    if (sceneName) sceneName.textContent = sceneNames[section.dataset.scene] || section.dataset.scene.toUpperCase();
    if (sceneCount) sceneCount.textContent = `${String(index + 1).padStart(2, '0')} / ${String(sceneSections.length).padStart(2, '0')}`;
    sceneLinks.forEach((link) => {
      const current = link.getAttribute('href') === `#${section.id}`;
      link.classList.toggle('is-current', current);
      if (current) link.setAttribute('aria-current', 'location');
      else link.removeAttribute('aria-current');
    });
  };
  if (sceneSections.length && 'IntersectionObserver' in window) {
    const sceneObserver = new IntersectionObserver((entries) => {
      const visible = entries.filter((entry) => entry.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (visible) activateScene(visible.target);
    }, { rootMargin: '-37% 0px -37% 0px', threshold: [0, 0.2, 0.5, 0.8] });
    sceneSections.forEach((section) => sceneObserver.observe(section));
    activateScene(sceneSections[0]);
  }

  if (!matchMedia('(prefers-reduced-motion: reduce)').matches && !matchMedia('(pointer: coarse)').matches) {
    let pointerFrame = 0;
    addEventListener('pointermove', (event) => {
      if (pointerFrame) return;
      pointerFrame = requestAnimationFrame(() => {
        const x = event.clientX / innerWidth;
        const y = event.clientY / innerHeight;
        root.style.setProperty('--pointer-x', `${(x * 100).toFixed(1)}%`);
        root.style.setProperty('--pointer-y', `${(y * 100).toFixed(1)}%`);
        root.style.setProperty('--grid-x', `${((x - .5) * -12).toFixed(1)}px`);
        root.style.setProperty('--grid-y', `${((y - .5) * -12).toFixed(1)}px`);
        const heroStage = document.querySelector('.hero-image-wrapper');
        const sculpture = document.querySelector('.hero-sculpture-scene');
        if (heroStage && sculpture) {
          const bounds = heroStage.getBoundingClientRect();
          const localX = Math.max(0, Math.min(1, (event.clientX - bounds.left) / bounds.width));
          const localY = Math.max(0, Math.min(1, (event.clientY - bounds.top) / bounds.height));
          sculpture.style.setProperty('--sculpture-tilt-x', `${((localX - .5) * 7).toFixed(1)}deg`);
          sculpture.style.setProperty('--sculpture-tilt-y', `${((.5 - localY) * 5).toFixed(1)}deg`);
        }
        pointerFrame = 0;
      });
    }, { passive: true });
    const sculpture = document.querySelector('.hero-sculpture-scene');
    if (sculpture) sculpture.parentElement.addEventListener('pointerleave', () => {
      sculpture.style.setProperty('--sculpture-tilt-x', '0deg');
      sculpture.style.setProperty('--sculpture-tilt-y', '0deg');
    });
  }

  const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (!reduceMotion && 'IntersectionObserver' in window) {
    const reveal = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('story-visible');
          reveal.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    document.querySelectorAll('.section, .project-card, .experience-card, .edu-card, .contact-card').forEach((el) => {
      el.classList.add('story-reveal');
      reveal.observe(el);
    });
  }

  const scrollStory = document.querySelector('.scroll-story');
  if (scrollStory && 'IntersectionObserver' in window) {
    const chapters = [...scrollStory.querySelectorAll('.scroll-chapter')];
    const counter = document.getElementById('stage-counter');
    const stepReadout = document.getElementById('stage-step');
    const label = document.getElementById('stage-label');
    const project = document.getElementById('stage-project');
    const description = document.getElementById('stage-description');
    const stageCore = document.querySelector('.stage-core');
    const activate = (chapter) => {
      const step = Number(chapter.dataset.step);
      if (scrollStory.dataset.active === String(step)) return;
      scrollStory.dataset.active = String(step);
      scrollStory.style.setProperty('--chapter-progress', String((step + 1) / chapters.length));
      chapters.forEach((item) => item.classList.toggle('is-active', item === chapter));
      if (counter) counter.textContent = `0${step + 1} / 0${chapters.length}`;
      if (stepReadout) stepReadout.textContent = `0${step + 1}`;
      if (label) label.textContent = chapter.dataset.label;
      if (project) project.textContent = chapter.dataset.project;
      if (description) description.textContent = chapter.dataset.description;
      if (stageCore && !reduceMotion) {
        stageCore.classList.remove('stage-swap');
        void stageCore.offsetWidth;
        stageCore.classList.add('stage-swap');
      }
    };
    const chapterObserver = new IntersectionObserver((entries) => {
      const visible = entries.filter((entry) => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (visible) activate(visible.target);
    }, { rootMargin: '-42% 0px -42% 0px', threshold: [0, 0.2, 0.5, 0.8] });
    chapters.forEach((chapter) => chapterObserver.observe(chapter));
  }

  document.querySelectorAll('.project-card[data-project-id]').forEach((card) => {
    card.addEventListener('pointermove', (event) => {
      const bounds = card.getBoundingClientRect();
      card.style.setProperty('--card-x', `${event.clientX - bounds.left}px`);
      card.style.setProperty('--card-y', `${event.clientY - bounds.top}px`);
    });
    const id = card.dataset.projectId;
    const actions = card.querySelector('.project-actions');
    if (!actions) return;
    const link = document.createElement('a');
    link.className = 'case-study-link';
    link.href = `projects/${id}.html`;
    link.textContent = 'Read case study ↗';
    actions.prepend(link);
  });

  const progress = document.querySelector('.reading-progress');
  if (progress) {
    const update = () => {
      const max = document.documentElement.scrollHeight - innerHeight;
      progress.style.transform = `scaleX(${max > 0 ? scrollY / max : 0})`;
    };
    addEventListener('scroll', update, { passive: true });
    update();
  }
})();
