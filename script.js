
// ── Hero Slider ──
let hSlide = 0;
const hTotal = 3;
const heroSlides = document.getElementById('heroSlides');
const heroDots = document.querySelectorAll('.hero-dot');

function goSlide(n) {
  hSlide = (n + hTotal) % hTotal;
  heroSlides.style.transform = `translateX(-${hSlide * 100}%)`;
  heroDots.forEach((d, i) => d.classList.toggle('active', i === hSlide));
}

document.getElementById('heroNext').addEventListener('click', () => goSlide(hSlide + 1));
document.getElementById('heroPrev').addEventListener('click', () => goSlide(hSlide - 1));
heroDots.forEach((dot, i) => dot.addEventListener('click', () => goSlide(i)));

// Auto-advance hero every 5s; pause on hover
let heroTimer = setInterval(() => goSlide(hSlide + 1), 5000);
document.querySelector('.hero').addEventListener('mouseenter', () => clearInterval(heroTimer));
document.querySelector('.hero').addEventListener('mouseleave', () => {
  heroTimer = setInterval(() => goSlide(hSlide + 1), 5000);
});

// Touch/swipe support for hero
let hTouchX = null;
heroSlides.addEventListener('touchstart', e => { hTouchX = e.touches[0].clientX; }, { passive: true });
heroSlides.addEventListener('touchend', e => {
  if (hTouchX === null) return;
  const diff = hTouchX - e.changedTouches[0].clientX;
  if (Math.abs(diff) > 40) goSlide(diff > 0 ? hSlide + 1 : hSlide - 1);
  hTouchX = null;
});

// ── Mobile Navigation ──
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');

hamburger.addEventListener('click', () => {
  const open = navLinks.classList.toggle('open');
  hamburger.classList.toggle('open', open);
  hamburger.setAttribute('aria-expanded', open);
});

// Close nav when a link is clicked
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    hamburger.classList.remove('open');
    hamburger.setAttribute('aria-expanded', false);
  });
});

// Close nav when clicking outside
document.addEventListener('click', e => {
  if (!navLinks.contains(e.target) && !hamburger.contains(e.target)) {
    navLinks.classList.remove('open');
    hamburger.classList.remove('open');
  }
});