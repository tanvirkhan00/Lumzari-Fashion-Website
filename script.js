
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
 /* Scroll shadow on navbar */
  window.addEventListener('scroll', () => {
    document.getElementById('mainNav').classList.toggle('scrolled', window.scrollY > 10);
  });
 
  /* Hamburger / mobile menu toggle */
  function toggleMenu() {
    document.getElementById('hamburger').classList.toggle('open');
    document.getElementById('mobileMenu').classList.toggle('open');
  }
 
  /* Close mobile menu when clicking outside nav area */
  document.addEventListener('click', e => {
    const nav  = document.getElementById('mainNav');
    const menu = document.getElementById('mobileMenu');
    if (!nav.contains(e.target) && !menu.contains(e.target)) {
      document.getElementById('hamburger').classList.remove('open');
      menu.classList.remove('open');
    }
  });