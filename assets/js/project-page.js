(() => {
  document.documentElement.dataset.theme = localStorage.getItem('portfolio-theme') || 'studio';
  const id = document.body.dataset.project;
  const data = window.PORTFOLIO_DATA?.projects?.find((item) => item.id === id);
  const page = document.getElementById('case-content');
  if (!data || !page) { page.innerHTML = '<h1>Project not found</h1><a href="../index.html">Back to portfolio</a>'; return; }
  document.title = `${data.title} — Aaditya Uniyal`;
  const tags = data.tech.map((tag) => `<span>${tag}</span>`).join('');
  const demo = data.demo ? `<a class="btn btn-primary" href="${data.demo}" target="_blank" rel="noopener">Open live demo ↗</a>` : '';
  page.innerHTML = `
    <nav class="case-nav"><a class="case-back" href="../index.html#projects">← All projects</a><a href="../index.html">Aaditya Uniyal</a></nav>
    <header><div class="case-kicker">${data.index} / Project case study</div><h1>${data.title}</h1><p class="case-deck">${data.tagline}</p><p class="case-deck">${data.description}</p>
      <div class="case-links"><a class="btn btn-secondary" href="${data.github}" target="_blank" rel="noopener">View source on GitHub ↗</a>${demo}</div><div class="case-tags">${tags}</div></header>
    <div class="case-architecture"><div class="case-kicker">System flow</div><p>${data.architecture}</p></div>
    <section class="case-block"><h2>The problem</h2><p>${data.problem}</p></section>
    <section class="case-block"><h2>What I built</h2><p>${data.solution}</p></section>
    <section class="case-block"><h2>Engineering takeaway</h2><p>${data.impact}</p></section>
    <footer class="case-block"><a class="case-back" href="../index.html#projects">Back to selected work ↗</a></footer>`;
})();
