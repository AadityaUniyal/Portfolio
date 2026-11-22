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
