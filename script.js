
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

// ── Collection Slider (Infinite Auto-scroll) ──
const AUTO_DELAY  = 3000;

const track  = document.getElementById('collTrack');
const wrap   = document.getElementById('collWrap');
const dotsEl = document.getElementById('collDots');

// Read the original cards written in HTML
const originalCards = Array.from(track.querySelectorAll('.collection-card'));
const TOTAL = originalCards.length;

// Clone before and after for infinite loop
const clonesBefore = originalCards.map(c => c.cloneNode(true));
const clonesAfter  = originalCards.map(c => c.cloneNode(true));

// Clear track, then insert: [clones-before] + [originals] + [clones-after]
track.innerHTML = '';
clonesBefore.forEach(c => track.appendChild(c));
originalCards.forEach(c => track.appendChild(c));
clonesAfter.forEach(c  => track.appendChild(c));

// Build dot indicators
originalCards.forEach((_, i) => {
  const dot = document.createElement('button');
  dot.className = 'slider-dot' + (i === 0 ? ' active' : '');
  dot.setAttribute('aria-label', `Go to slide ${i + 1}`);
  dot.addEventListener('click', () => { goTo(i); resetAuto(); });
  dotsEl.appendChild(dot);
});

let current   = 0;
let autoTimer = null;
let isJumping = false;

function getCardWidth() {
  const card = track.querySelector('.collection-card');
  return card ? card.offsetWidth + 24 : 344;
}

function getPaddingLeft() { return 60; }

function setOffset(idx, animate) {
  const offset = (TOTAL + idx) * getCardWidth() - getPaddingLeft();
  if (!animate) {
    track.classList.add('no-transition');
    track.style.transform = `translateX(-${offset}px)`;
    requestAnimationFrame(() => requestAnimationFrame(() => track.classList.remove('no-transition')));
  } else {
    track.classList.remove('no-transition');
    track.style.transform = `translateX(-${offset}px)`;
  }
  dotsEl.querySelectorAll('.slider-dot').forEach((d, i) => d.classList.toggle('active', i === idx));
}

function goTo(idx) {
  current = ((idx % TOTAL) + TOTAL) % TOTAL;
  setOffset(current, true);
}

function step(dir) {
  if (isJumping) return;
  const next = current + dir;

  if (next >= TOTAL) {
    isJumping = true;
    current = TOTAL;
    const offset = (TOTAL + current) * getCardWidth() - getPaddingLeft();
    track.classList.remove('no-transition');
    track.style.transform = `translateX(-${offset}px)`;
    dotsEl.querySelectorAll('.slider-dot').forEach((d, i) => d.classList.toggle('active', i === 0));
    setTimeout(() => { current = 0; setOffset(0, false); isJumping = false; }, 620);

  } else if (next < 0) {
    isJumping = true;
    current = -1;
    const offset = (TOTAL + current) * getCardWidth() - getPaddingLeft();
    track.classList.remove('no-transition');
    track.style.transform = `translateX(-${offset}px)`;
    dotsEl.querySelectorAll('.slider-dot').forEach((d, i) => d.classList.toggle('active', i === TOTAL - 1));
    setTimeout(() => { current = TOTAL - 1; setOffset(TOTAL - 1, false); isJumping = false; }, 620);

  } else {
    current = next;
    setOffset(current, true);
  }
}

// Auto-scroll
function startAuto() { autoTimer = setInterval(() => step(1), AUTO_DELAY); }
function stopAuto()  { clearInterval(autoTimer); autoTimer = null; }
function resetAuto() { stopAuto(); startAuto(); }

wrap.addEventListener('mouseenter', stopAuto);
wrap.addEventListener('mouseleave', startAuto);

document.getElementById('collNext').addEventListener('click', () => { step(1);  resetAuto(); });
document.getElementById('collPrev').addEventListener('click', () => { step(-1); resetAuto(); });

// Touch swipe
let touchStartX = null, touchStartY = null;
wrap.addEventListener('touchstart', e => {
  touchStartX = e.touches[0].clientX;
  touchStartY = e.touches[0].clientY;
}, { passive: true });
wrap.addEventListener('touchmove', e => {
  if (!touchStartX || !touchStartY) return;
  if (Math.abs(e.touches[0].clientX - touchStartX) > Math.abs(e.touches[0].clientY - touchStartY)) {
    e.preventDefault();
  }
}, { passive: false });
wrap.addEventListener('touchend', e => {
  if (touchStartX === null) return;
  const diff = touchStartX - e.changedTouches[0].clientX;
  if (Math.abs(diff) > 40) { step(diff > 0 ? 1 : -1); resetAuto(); }
  touchStartX = null; touchStartY = null;
});

// Mouse drag
let dragStartX = null, dragDelta = 0;
wrap.addEventListener('mousedown', e => { dragStartX = e.clientX; stopAuto(); });
window.addEventListener('mousemove', e => { if (dragStartX !== null) dragDelta = dragStartX - e.clientX; });
window.addEventListener('mouseup', () => {
  if (dragStartX === null) return;
  if (Math.abs(dragDelta) > 60) step(dragDelta > 0 ? 1 : -1);
  dragStartX = null; dragDelta = 0;
  startAuto();
});

window.addEventListener('resize', () => setOffset(current, false));

// Init
setOffset(0, false);
startAuto();

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