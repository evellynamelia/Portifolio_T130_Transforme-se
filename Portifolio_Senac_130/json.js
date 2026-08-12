/* =========================================================
   TURMA 130 · PORTFOLIO — JS
   ========================================================= */

/* ---------- dados dos alunos ---------- */
/* categorias possíveis: designer, desenvolvimento, marketing, backend, frontend, uxui */
const STUDENTS = [
  { nome: "Evellyn Gomes",      cargo: "Designer UX/UI, Marketing Digital",              categorias: ["designer","uxui","marketing"] },
  { nome: "Dacyrrôse Pessoa",   cargo: "Desenvolvimento Full-Stack",                      categorias: ["desenvolvimento"] },
  { nome: "Sabrina Vitoria",    cargo: "Backend",                                         categorias: ["backend"] },
  { nome: "Andréa Verônica",    cargo: "Marketing Digital",                               categorias: ["marketing"] },
  { nome: "Lucas Leite",        cargo: "Desenvolvimento Full-Stack",                      categorias: ["desenvolvimento"] },
  { nome: "Maria Elisa",        cargo: "Front-End",                                       categorias: ["frontend"] },
  { nome: "Adrielly Alexandra", cargo: "Back-end Developer, Cybersegurança e Design",     categorias: ["backend","designer"] },
  { nome: "Caio Cesar",         cargo: "Desenvolvimento Front-End",                       categorias: ["desenvolvimento","frontend"] },
  { nome: "Carlos Henrique",    cargo: "Professor de DevOps",                             categorias: ["desenvolvimento"] },
  { nome: "Danilo de Freitas",  cargo: "Área a definir",                                  categorias: [] },
  { nome: "Edinaldo da Silva",  cargo: "Área a definir",                                  categorias: [] },
  { nome: "Ewerton Henrique",   cargo: "Área a definir",                                  categorias: [] },
  { nome: "Flávio Aureliano",   cargo: "Área a definir",                                  categorias: [] },
  { nome: "Isabely Cabral",     cargo: "Front-End",                                       categorias: ["frontend"] },
  { nome: "Joao Vitor",         cargo: "Área a definir",                                  categorias: [] },
  { nome: "Kawanne Ketllyn",    cargo: "Área a definir",                                  categorias: [] },
  { nome: "Márcio Eduardo",     cargo: "Hardware e Software",                             categorias: ["desenvolvimento"] },
  { nome: "Eduarda Sousa",      cargo: "Análise de Dados e Design Web",                   categorias: ["designer"] },
  { nome: "Eduarda Ferreira",   cargo: "Área a definir",                                  categorias: [] },
  { nome: "Maria Helena",       cargo: "Designer",                                        categorias: ["designer"] },
  { nome: "Matheus Marques",    cargo: "Backend",                                         categorias: ["backend"] },
  { nome: "Messias Kaynã",      cargo: "Cybersecurity, Desenvolvedor Full-Stack",         categorias: ["desenvolvimento"] },
  { nome: "Vitor Gabriel",      cargo: "Desenvolvimento Front-End",                       categorias: ["desenvolvimento","frontend"] },
  { nome: "Thamires Vitória",   cargo: "Fullstack",                                       categorias: ["desenvolvimento"] }
].map((s, i) => ({
  ...s,
  id: slugify(s.nome),
  iniciais: s.nome.split(" ").filter(Boolean).slice(0, 2).map(p => p[0]).join("").toUpperCase(),
  doodle: i % 2 === 0,
  linkedin: "https://www.linkedin.com/",
  github: "https://github.com/",
  instagram: "https://instagram.com/"
}));

const CATEGORIES = [
  { id: "todos",          label: "TODOS" },
  { id: "designer",       label: "DESIGNER" },
  { id: "desenvolvimento",label: "DESENVOLVIMENTO" },
  { id: "marketing",      label: "MARKETING" },
  { id: "backend",        label: "BACK-END" },
  { id: "frontend",       label: "FRONT-END" },
  { id: "uxui",           label: "UX/UI" }
];

function slugify(str) {
  return str
    .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

const ICONS = {
  linkedin: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M4.98 3.5C4.98 4.88 3.87 6 2.5 6S0 4.88 0 3.5 1.11 1 2.48 1 4.98 2.12 4.98 3.5zM.4 8.75h4.16V23H.4V8.75zM8.34 8.75h3.99v1.95h.06c.56-1.02 1.92-2.1 3.95-2.1 4.22 0 5 2.7 5 6.22V23h-4.16v-6.75c0-1.61-.03-3.68-2.25-3.68-2.25 0-2.6 1.75-2.6 3.56V23H8.34V8.75z"/></svg>',
  github: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 .5C5.73.5.5 5.74.5 12.03c0 5.03 3.27 9.3 7.8 10.8.57.1.78-.25.78-.55v-2.15c-3.17.69-3.84-1.36-3.84-1.36-.52-1.32-1.27-1.67-1.27-1.67-1.04-.71.08-.7.08-.7 1.15.08 1.75 1.18 1.75 1.18 1.02 1.75 2.68 1.25 3.34.96.1-.74.4-1.25.72-1.54-2.53-.29-5.19-1.27-5.19-5.63 0-1.24.44-2.26 1.17-3.05-.12-.29-.51-1.46.11-3.04 0 0 .96-.31 3.14 1.16a10.9 10.9 0 015.72 0c2.18-1.47 3.14-1.16 3.14-1.16.62 1.58.23 2.75.11 3.04.73.79 1.17 1.81 1.17 3.05 0 4.37-2.67 5.34-5.21 5.62.41.36.77 1.06.77 2.14v3.17c0 .3.21.66.79.55A10.53 10.53 0 0023.5 12.03C23.5 5.74 18.27.5 12 .5z"/></svg>',
  instagram: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.16c3.2 0 3.58.01 4.85.07 1.17.05 1.8.24 2.23.41.56.21.96.47 1.38.89.42.42.68.82.89 1.38.17.42.36 1.06.41 2.23.06 1.27.07 1.65.07 4.85s-.01 3.58-.07 4.85c-.05 1.17-.24 1.8-.41 2.23-.21.56-.47.96-.89 1.38-.42.42-.82.68-1.38.89-.42.17-1.06.36-2.23.41-1.27.06-1.65.07-4.85.07s-3.58-.01-4.85-.07c-1.17-.05-1.8-.24-2.23-.41a3.72 3.72 0 01-1.38-.89 3.72 3.72 0 01-.89-1.38c-.17-.42-.36-1.06-.41-2.23-.06-1.27-.07-1.65-.07-4.85s.01-3.58.07-4.85c.05-1.17.24-1.8.41-2.23.21-.56.47-.96.89-1.38.42-.42.82-.68 1.38-.89.42-.17 1.06-.36 2.23-.41C8.42 2.17 8.8 2.16 12 2.16zm0 5.35a4.49 4.49 0 100 8.98 4.49 4.49 0 000-8.98zm0 7.41a2.92 2.92 0 110-5.84 2.92 2.92 0 010 5.84zm5.72-7.59a1.05 1.05 0 11-2.1 0 1.05 1.05 0 012.1 0z"/></svg>'
};

function doodleSVG() {
  return `
    <svg class="doodle doodle-aluno" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <circle cx="50" cy="50" r="38" fill="none" stroke="#ffffff" stroke-width="1.5" stroke-dasharray="3 5"/>
      <path d="M34 42c3-11 29-11 32 0" stroke="#ffffff" stroke-width="1.5" fill="none"/>
    </svg>`;
}

/* card usado na Home (carrossel) e na página Alunos (grade + filtro)
   Nunca é um <a> de verdade (evita link dentro de link, por causa dos
   ícones sociais) — quando precisa navegar, usa data-href + clique
   delegado em initCardNavigation(). */
function studentCard(s, { asLink = true } = {}) {
  const idAttr = asLink ? "" : `id="${s.id}"`;
  const hrefAttr = asLink ? `data-href="alunos.html#${s.id}"` : "";
  const clickable = asLink ? "aluno-card-clickable" : "";
  return `
    <div class="aluno-card ${clickable}" ${idAttr} ${hrefAttr} data-categorias="${s.categorias.join(" ")}" data-nome="${s.nome.toLowerCase()}" tabindex="${asLink ? "0" : "-1"}">
      ${s.doodle ? doodleSVG() : ""}
      <div class="aluno-photo">${s.iniciais}</div>
      <h3 class="aluno-nome">${s.nome}</h3>
      <p class="aluno-cargo">${s.cargo}</p>
      <div class="aluno-social">
        <a href="${s.linkedin}" target="_blank" rel="noopener" aria-label="LinkedIn de ${s.nome}">${ICONS.linkedin}</a>
        <a href="${s.github}" target="_blank" rel="noopener" aria-label="GitHub de ${s.nome}">${ICONS.github}</a>
        <a href="${s.instagram}" target="_blank" rel="noopener" aria-label="Instagram de ${s.nome}">${ICONS.instagram}</a>
      </div>
    </div>
  `;
}

/* navega para data-href ao clicar/Enter no card, exceto quando o clique
   foi em um dos ícones sociais (esses já navegam sozinhos) */
function initCardNavigation() {
  document.addEventListener("click", (e) => {
    const social = e.target.closest(".aluno-social");
    if (social) return;
    const card = e.target.closest(".aluno-card-clickable");
    if (card && card.dataset.href) {
      window.location.href = card.dataset.href;
    }
  });
  document.addEventListener("keydown", (e) => {
    if (e.key !== "Enter") return;
    const card = e.target.closest?.(".aluno-card-clickable");
    if (card && card.dataset.href) {
      window.location.href = card.dataset.href;
    }
  });
}

/* ---------- Home: carrossel de alunos (máx. 8 cards, só para já deixar a animação pronta) ---------- */
function renderHomeCarousel() {
  const track = document.getElementById("alunosCarouselTrack");
  if (!track) return;
  const featured = STUDENTS.slice(0, 8);
  track.innerHTML = featured.map(s => `<div class="carousel-slide">${studentCard(s)}</div>`).join("");
  initCarousel(track.closest(".carousel"));
}

/* ---------- Página Alunos: grade completa + filtro ---------- */
function renderFilterBar() {
  const bar = document.getElementById("filterBar");
  if (!bar) return;
  bar.innerHTML = CATEGORIES.map((c, i) =>
    `<button class="filter-pill${i === 0 ? " active" : ""}" data-filter="${c.id}">${c.label}</button>`
  ).join("") + `<input type="text" class="filter-search" id="filterSearch" placeholder="BUSCAR ALUNO...">`;

  bar.querySelectorAll(".filter-pill").forEach(btn => {
    btn.addEventListener("click", () => {
      bar.querySelectorAll(".filter-pill").forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      applyStudentFilters();
    });
  });
  document.getElementById("filterSearch").addEventListener("input", applyStudentFilters);
}

function applyStudentFilters() {
  const bar = document.getElementById("filterBar");
  const grid = document.getElementById("alunosFullGrid");
  if (!bar || !grid) return;
  const activeFilter = bar.querySelector(".filter-pill.active")?.dataset.filter || "todos";
  const search = (document.getElementById("filterSearch")?.value || "").toLowerCase().trim();

  grid.querySelectorAll(".aluno-card").forEach(card => {
    const categorias = card.dataset.categorias.split(" ");
    const nome = card.dataset.nome;
    const matchesFilter = activeFilter === "todos" || categorias.includes(activeFilter);
    const matchesSearch = !search || nome.includes(search);
    card.style.display = matchesFilter && matchesSearch ? "" : "none";
  });
}

function renderAlunosGrid() {
  const grid = document.getElementById("alunosFullGrid");
  if (!grid) return;
  grid.innerHTML = STUDENTS.map(s => studentCard(s, { asLink: false })).join("");
}

/* rola até o card do aluno quando a URL chega com #slug-do-nome */
function highlightStudentFromHash() {
  if (!location.hash) return;
  const target = document.querySelector(location.hash);
  if (!target || !target.classList.contains("aluno-card")) return;
  setTimeout(() => {
    target.scrollIntoView({ behavior: "smooth", block: "center" });
    target.classList.add("aluno-highlight");
    setTimeout(() => target.classList.remove("aluno-highlight"), 2200);
  }, 150);
}

/* =========================================================
   CARROSSEL GENÉRICO
   (usado na Home e nas seções com placeholders da página Quem Somos)
   ========================================================= */
function initCarousel(root) {
  if (!root || root.dataset.carouselInit) return;
  root.dataset.carouselInit = "true";

  const track = root.querySelector(".carousel-track");
  const dotsWrap = root.querySelector(".carousel-dots");
  const prevBtn = root.querySelector(".carousel-prev");
  const nextBtn = root.querySelector(".carousel-next");
  if (!track) return;

  const slides = Array.from(track.children);
  if (!slides.length) return;

  if (dotsWrap) {
    dotsWrap.innerHTML = slides.map((_, i) => `<button class="carousel-dot${i === 0 ? " active" : ""}" aria-label="Ir para o item ${i + 1}"></button>`).join("");
  }
  const dots = dotsWrap ? Array.from(dotsWrap.children) : [];

  function scrollToSlide(i) {
    const slide = slides[i];
    if (!slide) return;
    track.scrollTo({ left: slide.offsetLeft - track.offsetLeft, behavior: "smooth" });
  }

  dots.forEach((dot, i) => dot.addEventListener("click", () => scrollToSlide(i)));

  prevBtn?.addEventListener("click", () => {
    const i = Math.max(0, currentIndex() - 1);
    scrollToSlide(i);
  });
  nextBtn?.addEventListener("click", () => {
    const i = Math.min(slides.length - 1, currentIndex() + 1);
    scrollToSlide(i);
  });

  function currentIndex() {
    let closest = 0, min = Infinity;
    slides.forEach((s, i) => {
      const diff = Math.abs(s.offsetLeft - track.offsetLeft - track.scrollLeft);
      if (diff < min) { min = diff; closest = i; }
    });
    return closest;
  }

  let ticking = false;
  track.addEventListener("scroll", () => {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(() => {
      const i = currentIndex();
      dots.forEach((d, di) => d.classList.toggle("active", di === i));
      ticking = false;
    });
  });
}

function initAllCarousels() {
  document.querySelectorAll(".carousel").forEach(initCarousel);
}

/* ---------- menu mobile + página ativa ---------- */
function initNav() {
  const toggle = document.getElementById("navToggle");
  const links = document.getElementById("navLinks");
  if (!toggle || !links) return;

  toggle.addEventListener("click", () => {
    const isOpen = links.classList.toggle("open");
    toggle.classList.toggle("open", isOpen);
    toggle.setAttribute("aria-expanded", String(isOpen));
  });

  links.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", () => {
      links.classList.remove("open");
      toggle.classList.remove("open");
      toggle.setAttribute("aria-expanded", "false");
    });
  });

  const currentPage = location.pathname.split("/").pop() || "index.html";
  links.querySelectorAll("a").forEach(a => {
    const page = a.getAttribute("href").split("#")[0];
    a.classList.toggle("active", page === currentPage);
  });
}

document.addEventListener("DOMContentLoaded", () => {
  initNav();
  initCardNavigation();
  renderHomeCarousel();
  renderAlunosGrid();
  renderFilterBar();
  applyStudentFilters();
  initAllCarousels();
  highlightStudentFromHash();
});
