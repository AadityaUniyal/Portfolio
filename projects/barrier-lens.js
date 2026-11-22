(() => {
  const progress = document.querySelector('.reading-progress');
  const sections = [...document.querySelectorAll('.case-section[id]')];
  const links = [...document.querySelectorAll('.case-index a[href^="#"]')];
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const updateProgress = () => {
    if (!progress) return;
    const range = document.documentElement.scrollHeight - window.innerHeight;
    const amount = range > 0 ? window.scrollY / range : 0;
    progress.style.transform = `scaleX(${Math.min(1, Math.max(0, amount))})`;
  };
  window.addEventListener('scroll', updateProgress, { passive: true });
  window.addEventListener('resize', updateProgress);
  updateProgress();

  if (!('IntersectionObserver' in window) || reduceMotion) {
    document.querySelectorAll('.reveal').forEach((section) => section.classList.add('is-visible'));
    return;
  }

  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.14, rootMargin: '0px 0px -7% 0px' });
  document.querySelectorAll('.reveal').forEach((section) => revealObserver.observe(section));

  const activeObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      links.forEach((link) => link.classList.toggle('is-active', link.hash === `#${entry.target.id}`));
    });
  }, { rootMargin: '-20% 0px -65% 0px' });
  sections.forEach((section) => activeObserver.observe(section));
})();
