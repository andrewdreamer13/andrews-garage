import Swiper from "swiper/bundle";
import "swiper/css/bundle";

export const initSliders = () => {
  autoBrandsSlider();
  toolBrandsSlider();
  gallerySliders();
  testimonialSlider();
};

const autoBrandsSlider = () => {
  const swiper = new Swiper(".auto-brands__slider", {
    loop: true,
    speed: 4000,
    slidesPerView: "auto",
    spaceBetween: 30,
    centeredSlides: false,

    autoplay: {
      delay: 0,
      disableOnInteraction: false,
    },

    // Если пагинация, стрелки и скроллбар не нужны для ленты брендов, их можно удалить.
    /*
    pagination: {
      el: ".swiper-pagination",
    },

    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },

    scrollbar: {
      el: ".swiper-scrollbar",
    },
    */
  });
};
const toolBrandsSlider = () => {
  const swiper = new Swiper(".tool-brands__slider", {
    loop: true,
    speed: 4000,
    slidesPerView: "auto",
    spaceBetween: 50,
    allowTouchMove: false,
    autoplay: {
      delay: 0,
      disableOnInteraction: false,
      reverseDirection: true,
    },
  });
};

const gallerySliders = () => {
  const sliders = document.querySelectorAll(".gallery__slider");

  sliders.forEach((sliderEl) => {
    let swiperInstance = null;

    const panel = sliderEl.closest(".tabs__panel");
    if (!panel) return;

    const initSwiper = () => {
      if (swiperInstance) return;

      const isDesktop = window.innerWidth >= 768;

      swiperInstance = new Swiper(sliderEl, {
        speed: 600,
        slidesPerView: 1,
        spaceBetween: 10,
        observer: true,
        observeParents: true,
       
        effect: isDesktop ? "fade" : "slide",
        fadeEffect: {
          crossFade: true,
        },
        navigation: {
          nextEl: ".gallery__button-next",
          prevEl: ".gallery__button-prev",
        },
        pagination: {
          el: sliderEl.querySelector(".gallery__pagination"),
          type: "fraction",
        },
      });
    };

    if (panel.classList.contains("tabs__panel--active")) {
      initSwiper();
    }

    panel.addEventListener("tab-switched", () => {
      initSwiper();
      if (swiperInstance) {
        swiperInstance.update();
      }
    });
  });
};

const testimonialSlider = () => {
  const container = document.querySelector(".testimonials__slider");
  if (!container) return;

  const currentEl = document.querySelector(".testimonials__pagination-current");
  const totalEl = document.querySelector(".testimonials__pagination-total");

  const swiper = new Swiper(container, {
    speed: 600,
    slidesPerView: 1,
    spaceBetween: 10,
    breakpoints: {
      576: {
        slidesPerView: 2,
      },
      1024: {
        slidesPerView: 3,
      },
    },
    navigation: {
      nextEl: ".testimonials__button-next",
      prevEl: ".testimonials__button-prev",
    },
    on: {
      init: (swiper) => updateRangeFraction(swiper, currentEl, totalEl),
      slideChange: (swiper) => updateRangeFraction(swiper, currentEl, totalEl),
      resize: (swiper) => updateRangeFraction(swiper, currentEl, totalEl),
    },
  });
};

function updateRangeFraction(swiper, currentEl, totalEl) {
  if (!currentEl || !totalEl) return;

  const currentIndex = swiper.realIndex + 1;
  const totalSlides = swiper.slides.length;

  const visibleCount =
    typeof swiper.slidesPerViewDynamic === "function"
      ? Math.floor(swiper.slidesPerViewDynamic())
      : 1;

  const endRange = Math.min(currentIndex + visibleCount - 1, totalSlides);
  if (visibleCount === 1) {
    currentEl.textContent = currentIndex;
  } else {
    currentEl.textContent = `${currentIndex}-${endRange}`;
  }

  totalEl.textContent = totalSlides;
}
