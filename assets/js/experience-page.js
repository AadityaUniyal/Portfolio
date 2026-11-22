(function () {
  'use strict';
  const progress = document.querySelector('.reading-progress');
  const toggle = document.getElementById('mobile-toggle');
  const links = document.getElementById('nav-links');
  const updateProgress = () => {
    if (!progress) return;
    const max = document.documentElement.scrollHeight - window.innerHeight;
    progress.style.transform = `scaleX(${max > 0 ? window.scrollY / max : 0})`;
  };
  window.addEventListener('scroll', updateProgress, { passive: true });
  window.addEventListener('resize', updateProgress);
  updateProgress();
  if (toggle && links) {
    toggle.addEventListener('click', () => links.classList.toggle('mobile-open'));
    links.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => links.classList.remove('mobile-open')));
  }
})();
