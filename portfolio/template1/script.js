const root = document.documentElement;
const themeToggle = document.querySelector(".theme-toggle");
const siteHeader = document.querySelector(".site-header");
const storedTheme = localStorage.getItem("portfolio-theme");
const prefersLight = window.matchMedia("(prefers-color-scheme: light)").matches;
const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const motionSections = document.querySelectorAll(".motion-section");
const parallaxLayers = document.querySelectorAll(".parallax-layer");
const tiltTargets = document.querySelectorAll(
  ".hero-panel, .project-card, .case-study-grid article, .services-grid article, .timeline article, .process-list article, .proof-grid blockquote, .toolkit-grid span, .contact-form"
);

if (storedTheme === "light" || (!storedTheme && prefersLight)) {
  root.classList.add("light");
}

window.addEventListener("pointermove", (event) => {
  if (reducedMotion) return;

  root.style.setProperty("--pointer-x", String(event.clientX - window.innerWidth / 2));
  root.style.setProperty("--pointer-y", String(event.clientY - window.innerHeight / 2));
});

function clamp(value, min = 0, max = 1) {
  return Math.min(Math.max(value, min), max);
}

function updateScrollMotion() {
  const scrollTop = window.scrollY;
  const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
  const progress = maxScroll > 0 ? scrollTop / maxScroll : 0;

  root.style.setProperty("--scroll-progress", progress.toFixed(4));
  root.style.setProperty("--header-scale", scrollTop > 80 ? "0.985" : "1");
  root.style.setProperty("--header-offset", scrollTop > 80 ? "4" : "0");
  siteHeader.classList.toggle("scrolled", scrollTop > 40);

  motionSections.forEach((section) => {
    const rect = section.getBoundingClientRect();
    const sectionProgress = clamp((window.innerHeight - rect.top) / (window.innerHeight + rect.height));
    section.style.setProperty("--section-progress", sectionProgress.toFixed(4));
  });

  parallaxLayers.forEach((layer) => {
    const rect = layer.getBoundingClientRect();
    const speed = Number(layer.dataset.speed || 0);
    const centerDelta = rect.top + rect.height / 2 - window.innerHeight / 2;
    layer.style.setProperty("--parallax-y", (-centerDelta * speed).toFixed(2));
  });

  document.querySelectorAll(".project-card, .services-grid article, .proof-grid blockquote").forEach((card, index) => {
    const rect = card.getBoundingClientRect();
    const localProgress = clamp((window.innerHeight - rect.top) / (window.innerHeight + rect.height));
    const shift = (1 - localProgress) * (index % 2 === 0 ? 22 : 36);
    card.style.setProperty("--card-shift", shift.toFixed(2));
  });
}

let scrollFrame = null;

function requestScrollMotion() {
  if (reducedMotion || scrollFrame) return;

  scrollFrame = window.requestAnimationFrame(() => {
    updateScrollMotion();
    scrollFrame = null;
  });
}

if (!reducedMotion) {
  updateScrollMotion();
  window.addEventListener("scroll", requestScrollMotion, { passive: true });
  window.addEventListener("resize", requestScrollMotion);
}

tiltTargets.forEach((target) => {
  target.addEventListener("pointermove", (event) => {
    if (reducedMotion) return;

    const rect = target.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;

    target.classList.add("tilt-active");
    target.style.setProperty("--tilt-x", (x * 7).toFixed(2));
    target.style.setProperty("--tilt-y", (y * 7).toFixed(2));
  });

  target.addEventListener("pointerleave", () => {
    target.classList.remove("tilt-active");
    target.style.setProperty("--tilt-x", "0");
    target.style.setProperty("--tilt-y", "0");
  });
});

function updateThemeButton() {
  const isLight = root.classList.contains("light");
  themeToggle.setAttribute("aria-label", isLight ? "Switch to dark theme" : "Switch to light theme");
  themeToggle.setAttribute("aria-pressed", String(!isLight));
}

themeToggle.addEventListener("click", () => {
  root.classList.toggle("light");
  localStorage.setItem("portfolio-theme", root.classList.contains("light") ? "light" : "dark");
  updateThemeButton();
});

updateThemeButton();

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.16 }
);

document.querySelectorAll("[data-reveal]").forEach((element) => revealObserver.observe(element));

const filterButtons = document.querySelectorAll(".filter-button");
const projectCards = document.querySelectorAll(".project-card");

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const filter = button.dataset.filter;

    filterButtons.forEach((item) => item.classList.remove("active"));
    button.classList.add("active");

    projectCards.forEach((card) => {
      const shouldShow = filter === "all" || card.dataset.category === filter;
      card.classList.toggle("hidden", !shouldShow);
    });
  });
});

const contactForm = document.querySelector(".contact-form");
const formStatus = document.querySelector(".form-status");

contactForm.addEventListener("submit", (event) => {
  event.preventDefault();
  formStatus.textContent = "Inquiry drafted. Connect this form to your preferred email or CRM endpoint.";
  contactForm.reset();
});

const showcaseData = {
  systems: {
    title: "Spatial product systems",
    description:
      "A selected direction for teams that need confident structure, stronger interaction states, and a visual system that can scale past the first launch.",
    status: "Strategy mode",
    featureOne: "Prototype fidelity",
    featureOneValue: 92,
    featureTwo: "Design system readiness",
    featureTwoValue: 86,
    accent: "#3b82f6",
  },
  launch: {
    title: "Launch-ready interface motion",
    description:
      "A sharper presentation mode for portfolios, campaign pages, and product stories that need depth without sacrificing performance.",
    status: "Launch mode",
    featureOne: "Narrative clarity",
    featureOneValue: 88,
    featureTwo: "Interaction polish",
    featureTwoValue: 94,
    accent: "#14b8a6",
  },
};

const showcaseElements = {
  title: document.querySelector("[data-showcase-title]"),
  description: document.querySelector("[data-showcase-description]"),
  status: document.querySelector("[data-showcase-status]"),
  statusDot: document.querySelector("[data-showcase-status-dot]"),
  featureOne: document.querySelector("[data-showcase-feature-one]"),
  featureOneValue: document.querySelector("[data-showcase-feature-one-value]"),
  featureTwo: document.querySelector("[data-showcase-feature-two]"),
  featureTwoValue: document.querySelector("[data-showcase-feature-two-value]"),
  meterOne: document.querySelector("[data-meter-one]"),
  meterTwo: document.querySelector("[data-meter-two]"),
  visual: document.querySelector("[data-showcase-visual]"),
};

function animateTextSwap(element) {
  element.classList.remove("content-swap");
  void element.offsetWidth;
  element.classList.add("content-swap");
}

function setShowcaseMode(mode) {
  const data = showcaseData[mode];

  showcaseElements.title.textContent = data.title;
  showcaseElements.description.textContent = data.description;
  showcaseElements.status.textContent = data.status;
  showcaseElements.featureOne.textContent = data.featureOne;
  showcaseElements.featureOneValue.textContent = `${data.featureOneValue}%`;
  showcaseElements.featureTwo.textContent = data.featureTwo;
  showcaseElements.featureTwoValue.textContent = `${data.featureTwoValue}%`;
  showcaseElements.meterOne.style.width = `${data.featureOneValue}%`;
  showcaseElements.meterTwo.style.width = `${data.featureTwoValue}%`;
  showcaseElements.statusDot.style.background = data.accent;
  root.style.setProperty("--accent", data.accent);

  Object.values(showcaseElements).forEach((element) => {
    if (element instanceof HTMLElement) animateTextSwap(element);
  });

  showcaseElements.visual.classList.add("is-switching");
  window.setTimeout(() => showcaseElements.visual.classList.remove("is-switching"), 260);
}

document.querySelectorAll(".showcase-tab").forEach((tab) => {
  tab.addEventListener("click", () => {
    document.querySelectorAll(".showcase-tab").forEach((item) => {
      item.classList.remove("active");
      item.setAttribute("aria-selected", "false");
    });

    tab.classList.add("active");
    tab.setAttribute("aria-selected", "true");
    setShowcaseMode(tab.dataset.showcaseTab);
  });
});
