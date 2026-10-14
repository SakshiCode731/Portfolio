// Typing effect
const phrases = [
  "full-stack MERN applications.",
  "responsive, modern user interfaces.",
  "AI-powered features with LLM APIs.",
  "clean, scalable back-end APIs."
];
const typedEl = document.getElementById("typed");
let p = 0, c = 0, deleting = false;

function type() {
  const word = phrases[p];
  typedEl.textContent = word.slice(0, c);
  if (!deleting && c < word.length) { c++; setTimeout(type, 55); }
  else if (!deleting) { deleting = true; setTimeout(type, 1500); }
  else if (c > 0) { c--; setTimeout(type, 28); }
  else { deleting = false; p = (p + 1) % phrases.length; setTimeout(type, 300); }
}
type();

// Mobile menu
const navToggle = document.getElementById("navToggle");
const siteNav = document.getElementById("siteNav");
navToggle.addEventListener("click", () => {
  const open = siteNav.classList.toggle("open");
  navToggle.setAttribute("aria-expanded", open);
});
siteNav.querySelectorAll("a").forEach(a =>
  a.addEventListener("click", () => siteNav.classList.remove("open"))
);

// Scroll: progress bar, header, back-to-top
const progress = document.getElementById("scrollProgress");
const header = document.getElementById("siteHeader");
const toTop = document.getElementById("toTop");

window.addEventListener("scroll", () => {
  const h = document.documentElement;
  const pct = (h.scrollTop / (h.scrollHeight - h.clientHeight)) * 100;
  progress.style.width = pct + "%";
  header.classList.toggle("scrolled", h.scrollTop > 40);
  toTop.classList.toggle("show", h.scrollTop > 600);
});

// Reveal on scroll
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add("visible");
      revealObserver.unobserve(e.target);
    }
  });
}, { threshold: 0.12 });
document.querySelectorAll(".reveal").forEach(el => revealObserver.observe(el));

// Active nav link
const links = document.querySelectorAll(".site-nav a");
const sections = [...links].map(a => document.querySelector(a.getAttribute("href")));
const navObserver = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      links.forEach(l => l.classList.toggle("active", l.getAttribute("href") === "#" + e.target.id));
    }
  });
}, { rootMargin: "-45% 0px -50% 0px" });
sections.forEach(s => s && navObserver.observe(s));

document.getElementById("year").textContent = new Date().getFullYear();