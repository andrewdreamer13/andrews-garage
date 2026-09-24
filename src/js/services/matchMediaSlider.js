

import Swiper from "swiper";
import { Navigation, Pagination, Autoplay, EffectFade } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-fade";

Swiper.use([Navigation, Pagination, Autoplay, EffectFade]);

const createResizableSwiper = (
  breakpointString,
  selector,
  settings,
  callback,
) => {
  const mediaQuery = window.matchMedia(breakpointString);
  let swiperInstance;

  const checker = () => {
    const elementExists = document.querySelector(selector);

    if (mediaQuery.matches) {
      if (swiperInstance === undefined && elementExists) {
        swiperInstance = new Swiper(selector, settings);
        if (callback) callback(swiperInstance);
      }
    } else {
      if (swiperInstance !== undefined) {
        swiperInstance.destroy(true, true);
        swiperInstance = undefined;
      }
    }
  };

  mediaQuery.addEventListener("change", checker);
  checker();
};

export const initResizableServicesSwiper = () => {
  const container = document.querySelector(".services__slider");
  if (!container) return;

  const currentEl = document.querySelector(".services__pagination-current");
  const totalEl = document.querySelector(".services__pagination-total");

  createResizableSwiper("(max-width: 1240px)", ".services__slider", {
    spaceBetween: 18,
    slidesPerView: "auto",
    speed: 500,
    navigation: {
      nextEl: ".services__button-next",
      prevEl: ".services__button-prev",
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

  let visibleCount = 1;
  if (typeof swiper.slidesPerViewDynamic === "function") {
    visibleCount = Math.ceil(swiper.slidesPerViewDynamic());
  }

  const endRange = Math.min(currentIndex + visibleCount - 1, totalSlides);
  if (visibleCount === 1) {
    currentEl.textContent = currentIndex;
  } else {
    currentEl.textContent = `${currentIndex}-${endRange}`;
  }

  totalEl.textContent = totalSlides;
}

export const initResizableWorkflowSwiper = () => {
  createResizableSwiper("(max-width: 1230px)", ".workflow__slider", {
    spaceBetween: 10,
    slidesPerView: "auto",
    speed: 4000,
    loop: true,
    autoplay: {
      delay: 0,
      disableOnInteraction: false,
    },
  });
};
