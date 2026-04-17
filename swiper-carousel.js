// Initialize Swiper carousel for the collection section
const swiper = new Swiper('#collSwiper', {
  loop: true,
  autoplay: {
    delay: 3000,
    disableOnInteraction: false,
    pauseOnMouseEnter: true
  },
  speed: 600,
  pagination: {
    el: '.swiper-pagination',
    clickable: true,
    dynamicBullets: true
  },
  navigation: {
    nextEl: '#collNext',  
    prevEl: '#collPrev'   
  },
  slidesPerView: 1,
  spaceBetween: 16,
  breakpoints: {
    480:  { slidesPerView: 2, spaceBetween: 16 },
    768:  { slidesPerView: 3, spaceBetween: 20 },
    1024: { slidesPerView: 4, spaceBetween: 24 }
  }
});

// Initialize Swiper carousel for the video section
new Swiper('.video-swiper', {
  loop: true,
  centeredSlides: true,
  slidesPerView: 1.15,
  spaceBetween: 16,
  autoplay: {
    delay: 3200,
    disableOnInteraction: false,
    pauseOnMouseEnter: true
  },
  speed: 700,
  pagination: {
    el: '.swiper-pagination',
    clickable: true,
    dynamicBullets: true
  },
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev'
  },
  breakpoints: {
    480:  { slidesPerView: 1.4,  spaceBetween: 20 },
    768:  { slidesPerView: 2.2,  spaceBetween: 24 },
    1024: { slidesPerView: 2.8,  spaceBetween: 28 },
    1280: { slidesPerView: 3.2,  spaceBetween: 32 }
  }
});