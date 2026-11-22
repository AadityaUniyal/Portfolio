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
