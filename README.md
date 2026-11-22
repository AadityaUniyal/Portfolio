# Aaditya Uniyal — Portfolio

A static portfolio for Aaditya Uniyal, a Computer Science student at Graphic Era Deemed to be University. It presents selected project case studies, his approach to product building, community involvement, education, certifications, skills, and links to GitHub, LinkedIn, and LeetCode.

The landing page uses a scroll-led story layout with three selectable themes: Studio, Hero, and Voxel. The About page explains the builder behind the projects, and each featured project has its own case-study page under `projects/`. The visual themes are original interpretations, with no franchise artwork or assets.

## Featured projects

- **BarrierLens** — agentic web accessibility testing and code remediation.
- **Fitness_Smarty** — AI-assisted fitness, nutrition, and wellness platform.
- **Quorum OS** — document intelligence with agent consensus, deterministic arithmetic, and evidence provenance.
- **DarkStori** — operations platform for quick-commerce networks.
- **MiniCloud** — a local simulation of core AWS workflows.

## Run locally

Open `index.html` in a browser, or serve the folder over HTTP:

```bash
python -m http.server 3000
```

Then visit `http://localhost:3000`.

## Project structure

```text
Portfolio/
├── index.html
├── about.html
├── projects/                  # Individual project case studies
├── assets/
│   ├── css/
│   │   ├── style.css
│   │   ├── components.css
│   │   ├── animations.css
│   │   ├── portfolio-polish.css
│   │   └── experience.css
│   ├── js/
│   │   ├── main.js
│   │   ├── portfolio-data.js
│   │   ├── experience.js
│   │   └── project-page.js
│   └── images/
│       └── aaditya.jpg
└── README.md
```

## Deployment

The site has no build step. It can be served from GitHub Pages, Netlify, or Vercel as a static site. Update the project and profile links in `index.html` and `assets/js/portfolio-data.js` when those destinations change.
