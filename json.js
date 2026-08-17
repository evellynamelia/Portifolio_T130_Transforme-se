/* =========================================================
   TURMA 130 · PORTFOLIO — JS
   =========================================================
   Este arquivo só cuida de COMPORTAMENTO (filtro, carrossel,
   menu). Ele NÃO guarda fotos, emojis, nomes nem links de
   ninguém — tudo isso agora está direto nos arquivos .html
   (index.html, quem-somos.html, alunos.html), para ser fácil
   de editar sem mexer em código JavaScript.
   ========================================================= */

/* =========================================================
   FILTRO DE ALUNOS (página alunos.html)
   As categorias mostradas aqui são só os botões do filtro.
   Cada aluno já tem sua(s) categoria(s) marcada(s) no HTML,
   no atributo data-categorias do card dele.
   ========================================================= */
const CATEGORIES = [
  { id: "todos",           label: "TODOS" },
  { id: "designer",        label: "DESIGNER" },
  { id: "desenvolvimento", label: "DESENVOLVIMENTO" },
  { id: "marketing",       label: "MARKETING" },
  { id: "backend",         label: "BACK-END" },
  { id: "frontend",        label: "FRONT-END" },
  { id: "uxui",            label: "UX/UI" }
];

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
    const categorias = (card.dataset.categorias || "").split(" ");
    const nome = card.dataset.nome || "";
    const matchesFilter = activeFilter === "todos" || categorias.includes(activeFilter);
    const matchesSearch = !search || nome.includes(search);
    card.style.display = matchesFilter && matchesSearch ? "" : "none";
  });
}

/* rola até o card do aluno quando a URL chega com #slug-do-nome
   (o slug é o id="..." que já está em cada card, no HTML) */
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

/* clique num card com data-href (usado no carrossel da Home) leva
   até a página Alunos, na posição daquele aluno — exceto quando o
   clique foi em um dos ícones de rede social, que já navegam sozinhos */
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

/* =========================================================
   CARROSSEL GENÉRICO
   Funciona em cima de qualquer ".carousel" que já exista no
   HTML (os slides são fixos no HTML, o JS só cuida de mover
   a faixa, das setas e das bolinhas).
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
  renderFilterBar();
  applyStudentFilters();
  initAllCarousels();
  highlightStudentFromHash();
});
