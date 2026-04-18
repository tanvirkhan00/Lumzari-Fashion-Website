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

const videoSwiper = new Swiper('.video-swiper', {
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
    el: '.video-swiper .swiper-pagination',
    clickable: true,
    dynamicBullets: true
  },
  // navigation: {
  //   nextEl: '.video-swiper .swiper-button-next',
  //   prevEl: '.video-swiper .swiper-button-prev'
  // },
  breakpoints: {
    480:  { slidesPerView: 1.4,  spaceBetween: 20 },
    768:  { slidesPerView: 2.2,  spaceBetween: 24 },
    1024: { slidesPerView: 2.8,  spaceBetween: 28 },
    1280: { slidesPerView: 4,  spaceBetween: 32 }
  }
});

// Helper: play only the active slide's video, pause all others
function syncVideos(swiper) {
  swiper.slides.forEach((slide) => {
    const video = slide.querySelector('video');
    if (!video) return;
    if (slide.classList.contains('swiper-slide-active')) {
      video.play().catch(() => {}); // catch autoplay policy errors silently
    } else {
      video.pause();
    }
  });
}

// Run on slide change and on first load
videoSwiper.on('slideChange', () => syncVideos(videoSwiper));
videoSwiper.on('init', () => syncVideos(videoSwiper));

// Trigger init manually since Swiper fires 'init' before .on() in some versions
syncVideos(videoSwiper);